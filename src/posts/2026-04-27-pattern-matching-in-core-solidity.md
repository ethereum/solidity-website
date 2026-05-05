---
layout: post
published: true
title: 'Pattern Matching in Core Solidity'
date: '2026-05-05'
author: Solidity Team
category: Announcements
---

Smart contracts often need to handle values that come in several variants: a
payment might be native ETH, an ERC20 transfer, or an NFT transfer; an auction
can be not-started, active, ended, or cancelled. Each variant needs different
handling, and the logic for that handling tends to be scattered across many
functions. When a developer adds a new variant and forgets to update one of
those functions, the compiler says nothing. Once deployed, that oversight can
cost real money to find and fix.

Core Solidity's algebraic data types (ADTs) and pattern matching, introduced in
[our deep dive post](https://soliditylang.org/blog/2025/11/14/core-solidity-deep-dive/),
eliminate this class of bug at compile time. This post explains why that matters
for contract safety and how the feature holds up in practice.

## Why Classic Solidity Needs Better Data Modeling

Smart contracts often deal with data that exists in one of several mutually
exclusive states. A natural example is a multi-asset payment processor that can
handle native ETH transfers, ERC20 token transfers, and ERC721 NFT transfers.

Here is a representative implementation in Classic Solidity:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentHandler {
    enum PaymentType { NATIVE, ERC20, ERC721 }

    struct Payment {
        PaymentType paymentType;
        address token;
        address from;
        address payable to;
        uint256 amount;
        uint256 tokenId;
    }

    function processPayment(Payment calldata payment) external {
        if (payment.paymentType == PaymentType.NATIVE) {
            require(payment.token == address(0), "Native: no token");
            require(payment.amount > 0, "Native: amount required");
            require(payment.tokenId == 0, "Native: no tokenId");
            (bool success, ) = payment.to.call{value: payment.amount}("");
            require(success, "Native: transfer failed");
        } else if (payment.paymentType == PaymentType.ERC20) {
            require(payment.token != address(0), "ERC20: token required");
            require(payment.amount > 0, "ERC20: amount required");
            require(payment.tokenId == 0, "ERC20: no tokenId");
            IERC20(payment.token).transferFrom(payment.from, payment.to, payment.amount);
        } else if (payment.paymentType == PaymentType.ERC721) {
            require(payment.token != address(0), "ERC721: token required");
            require(payment.amount == 1, "ERC721: amount must be 1");
            require(payment.tokenId > 0, "ERC721: tokenId required");
            IERC721(payment.token).transferFrom(payment.from, payment.to, payment.tokenId);
        }
    }

    function calculateFee(Payment calldata payment) external pure returns (uint256) {
        if (payment.paymentType == PaymentType.NATIVE) {
            return payment.amount / 20;
        } else if (payment.paymentType == PaymentType.ERC20) {
            return payment.amount / 10;
        } else if (payment.paymentType == PaymentType.ERC721) {
            return 0.01 ether;
        }
        return 0; // unreachable, but the compiler requires it
    }
}
```

This code has several safety problems the compiler cannot catch.

**Invalid states are representable.** The `Payment` struct can be constructed
with contradictory fields: a `NATIVE` payment with a non-zero `token` address,
or an `ERC721` payment with no `tokenId`. The struct has enough fields to
represent any of the three payment variants, but nothing in the type prevents us
from filling those fields with incoherent values. The `require` calls in
`processPayment` are the only check we have, and they have to be repeated in
every function that receives a `Payment`.

**No compile-time totality guarantee.** If we add a new variant, say `ERC1155`,
to the `PaymentType` enum, the compiler will not tell us where the dispatch
logic needs to be updated. `processPayment` will silently do nothing for
`ERC1155` payments. `calculateFee` will silently return 0. Every function that
dispatches on `PaymentType` can silently fail.

**Redundant runtime validation.** Because the type system cannot express the
constraint that, e.g., a `NATIVE` payment has no `token`, each function must
repeat those structural checks. This is both verbose and error-prone: a
developer might add a new function and forget to validate one of the fields.
These checks also have a runtime cost: every `require` executes on-chain and
consumes gas, whereas invariants enforced by the type system are verified at
compile time and vanish entirely from the deployed bytecode. There is also a
subtler issue of data cohesion. Because the `Payment` struct separates the tag
(`paymentType`) from its fields, nothing prevents a caller from pairing them
incorrectly. ADTs bundle the constructor and its payload into a single,
inseparable unit, so that kind of mismatch cannot be expressed in the type and
no `require` check can fully substitute for that guarantee.

## Algebraic Data Types Make Invalid States Unrepresentable

Core Solidity lets us define a `Payment` type that expresses these three
variants precisely. `word` is Core Solidity's primitive 256-bit type, equivalent
to an untyped Yul variable.

```js
data address = address(word);
data tokenid = tokenid(word);

data Payment =
    Native(address, word)
  | ERC20(address, address, address, word)
  | ERC721(address, address, address, tokenid);
```

Each constructor carries exactly the data it needs: no more, no less. A `Native`
payment holds a recipient and an amount. An `ERC20` payment holds a token
contract address, a sender, a recipient, and an amount. An `ERC721` payment
holds a token contract, a sender, a recipient, and a token identifier. There is
no `Payment` value that carries an `ERC721` token identifier while claiming to
be a `Native` payment: the type simply does not allow it.

Now the `processPayment` function becomes declarative and self-documenting:

```js
function processPayment(payment : Payment) {
    match payment {
    | Native(to, amount) =>
        transfer(to, amount);
    | ERC20(token, from, to, amount) =>
        transferFromERC20(token, from, to, amount);
    | ERC721(token, from, to, tokenId) =>
        transferFromERC721(token, from, to, tokenId);
    }
}
```

The pattern match binds exactly the fields that are relevant to each variant.
There are no `require` calls to check structural invariants, the type system has
already done that job. The `amount` field on a `Native` payment and the
`tokenId` field on an `ERC721` payment cannot be confused, because they live in
separate constructors.

Adding a new variant, say `ERC1155(address, address, address, tokenid, word)`,
will cause the compiler to immediately report every match statement that does
not handle the new case. No function can silently miss the new variant.

## Totality: Exhaustiveness as a Safety Property

The example above shows the safety property that matters most: **exhaustiveness
checking** (also called totality). A pattern match is exhaustive if every
possible value of the scrutinee (the value being matched on) is handled by at
least one branch. The Core Solidity compiler enforces this statically and
rejects any program that contains an incomplete match.

Smart contract bugs are extremely costly to fix. Once a contract is deployed,
its logic is immutable (absent an upgradeable proxy pattern), and any ether or
tokens locked by a buggy contract may be permanently inaccessible. In the
Classic Solidity `calculateFee` function above, the final `return 0` is dead
code that exists only because the compiler cannot verify that the if-else chain
covers all variants. If a future developer adds a fourth `PaymentType` and
forgets to update `calculateFee`, the function silently returns zero. That is a
potentially expensive mistake that will not be caught until it is too late.

Exhaustiveness checking turns these bugs into compile-time errors. Consider the
following incomplete match:

```js
data AuctionState =
    NotStarted(uint256)
  | Active(uint256, address)
  | Ended(uint256, address)
  | Cancelled(uint256, address);

function processBid(state : AuctionState) -> AuctionState {
    match state {
    | NotStarted(reserve) =>
        require(msg.value >= reserve);
        return Active(msg.value, msg.sender);
    | Active(currentBid, bidder) =>
        require(msg.value > currentBid);
        transferFunds(bidder, currentBid);
        return Active(msg.value, msg.sender);
    }
}
```

The `Ended` and `Cancelled` variants are not handled. The Core Solidity compiler
will report a compile-time error similar to the following:

```text
Non-exhaustive pattern match. Missing case: Ended($v0, $v1)
  in function processBid
  in match (state)
```

The compiler names a missing pattern, a _witness_, so the developer knows
exactly what to fix. This error must be resolved before the program can compile.
The developer might add explicit branches for `Ended` and `Cancelled`, or add a
wildcard default (`| _ =>`), but in either case the decision is deliberate and
visible in the source code.

Redundancy checking is the complementary property: the compiler also warns when
a pattern branch can never be reached because an earlier branch already covers
its inputs. Redundant branches are often symptoms of copy-paste errors or of
code that was not updated after a refactor.

### What This Means for Audits

Smart contract security audits are expensive. On enum-heavy contracts, auditors
spend real time verifying that every function that dispatches on a type covers
all cases, manually tracing if-else chains and checking that no variant falls
through to a silent default. This is tedious, error-prone work that scales with
the number of functions and variants in a codebase.

Pattern matching with exhaustiveness checking makes that entire category of
audit finding disappear. When the compiler rejects incomplete matches, an
auditor does not need to check whether `calculateFee` handles `ERC1155`: if it
compiled, it does. The time auditors previously spent tracing dispatch logic can
be spent on higher-value findings. For projects paying five or six figures for
an audit, that is a real saving.

### What About Existing Validation Patterns?

A reasonable question from developers who already write defensive code: "I
already use `require` checks and careful enum handling. What does this buy me?"

Your existing practices aren't wrong, they just don't scale. Today, the
discipline of "update every dispatch function when you add a variant" relies on
memory, code review checklists, and audit reports. It is not enforced by the
compiler, so it can fail. When a team member adds `ERC1155` support under
deadline pressure and misses one function, the compiler says nothing. Pattern
matching moves that discipline into the toolchain, where it cannot be forgotten.

## The Pattern Match Compiler

Exhaustiveness and redundancy checking, together with the translation of nested
patterns into efficient code, are handled by a dedicated compilation pass in the
Core Solidity prototype, which follows the ideas described in
[Compiling Pattern Matching to Good Decision Trees](http://moscova.inria.fr/~maranget/papers/ml05e-maranget.pdf).

A key motivation for this design is to make exhaustiveness checking tractable.
Pattern matching algorithms based on backtracking automata are effective at
generating efficient code, but they are notoriously difficult to extend with
exhaustiveness analysis: the automaton construction does not naturally expose
which inputs remain uncovered. Decision-tree-based approaches, by contrast,
produce exhaustiveness and redundancy information as natural byproducts of the
compilation process itself, without requiring a separate analysis pass.

This pass runs after type inference and before code generation. Its job is to
transform `match` statements over arbitrary nested patterns into a _decision
tree_, a form where each node tests exactly one scrutinee against flat
constructor patterns. The resulting tree is then converted back into simplified
`match` statements that the Yul backend can handle directly.

The algorithm works by treating the match arms as a _pattern matrix_ (one row
per arm, one column per scrutinee), selecting the most informative column to
test first using a necessity heuristic, and recursively building sub-matrices
for each constructor case. Exhaustiveness and redundancy are both detected as
natural byproducts of this construction: a missing case surfaces when the matrix
has no row to cover a particular input, and a redundant arm surfaces when its
row is already subsumed by earlier rows.

The practical output of this pass is straightforward. For example, the following
function:

```js
data Phase = Early | Late;

function discount(state : AuctionState, phase : Phase) -> uint256 {
    match state, phase {
    | Active(bid, _), Early => return bid / 10;
    | Active(bid, _), Late  => return bid / 20;
    | _, _                  => return 0;
    }
}
```

is compiled into a nested sequence of single-level matches:

```js
function discount(state : AuctionState, phase : Phase) -> uint256 {
    match state {
    | Active($bid, $pad) =>
        match phase {
        | Early => return $bid / 10;
        | Late  => return $bid / 20;
        }
    | $v0 => return 0;
    }
}
```

All nested constructor patterns have been flattened, and each variable
introduced by the flattening has been substituted into the arm body.

### Exhaustiveness and Redundancy Errors

The compiler produces concrete, actionable error messages. An incomplete match:

```js
function discount(state : AuctionState, phase : Phase) -> uint256 {
    match state, phase {
    | Active(bid, _), Early => return bid / 10;
    | Active(bid, _), Late  => return bid / 20;
    // missing: all non-Active states
    }
}
```

produces:

```text
Non-exhaustive pattern match. Missing case: NotStarted($v0), $v1
  in function discount
  in match (state, phase)
```

The witness `NotStarted($v0), $v1` identifies the first uncovered case: any
`NotStarted` state paired with any phase value, giving the developer a concrete
starting point for completing the match.

A redundant arm:

```js
function f(x : Bool) -> Bool {
    match x {
    | z    => return z;    // catches everything
    | True => return True; // unreachable: z above already covers True
    }
}
```

produces:

```text
Warning: Clause (True → return True) is redundant.
  in function f
  in match (x)
```

Unlike non-exhaustive matches, redundant-clause warnings do not prevent
compilation: they are reported as warnings to assist developers during
refactoring.

## Lowering to Yul: Why There Is No Overhead

A common concern when adding type-level machinery is that it comes with a
runtime cost. Pattern matching over algebraic data types does not. The generated
Yul is the same `switch` statement a careful developer would write by hand.

After pattern compilation, the program goes through specialization
(monomorphization of generic functions and type class instances) and is emitted
as Hull: a first-order functional intermediate representation with sum and
product types. The separate `yule` backend, implemented in
[`Translate.hs`](https://github.com/argotorg/solcore/blob/main/yule/Translate.hs),
then translates Hull into Yul. The intermediate languages used throughout the
Core Solidity compilation pipeline will be the subject of future posts.

### Runtime Representation of Sum Types

Yul has no algebraic types, only 256-bit words. Every sum type is therefore
flattened onto the EVM stack as:

```text
1 (tag word) + max(payload size across all constructors)
```

The tag identifies which constructor is active. The payload slots hold the
fields of the active constructor, padded with unused words to reach the maximum
payload size.

**Binary sums (`A | B`)** use `false` (0) for the first constructor and `true`
(1) for the second. `Bool = False | True` occupies exactly one stack slot
because both constructors are nullary.

**N-ary sums** get an integer tag (0, 1, 2, …). For `AuctionState`:

```js
data AuctionState =
    NotStarted(uint256)          // payload: 1 word
  | Active(uint256, address)     // payload: 2 words
  | Ended(uint256, address)      // payload: 2 words
  | Cancelled(uint256, address); // payload: 2 words
```

The widest payload is 2 words, so every `AuctionState` value occupies **3 stack
slots**: a tag and two payload words. `NotStarted(1000)` is
`(0, 1000, <unused>)` on the stack; `Active(500, 0xABCD)` is `(1, 500, 0xABCD)`.

**Single-constructor types** (wrapper newtypes) have no tag at all: the
constructor is erased entirely. As an example, `data uint256 = uint256(word)` is
just one stack slot, with zero overhead compared to using a raw `word`.

### Match Compiles to Switch

The Yul backend emits a `switch` on the tag word, with one `case` per
constructor. The output is minimal and readable.

For `not`, a nullary binary sum:

```js
function not(b : Bool) -> Bool {
    match b {
    | False => return True;
    | True  => return False;
    }
}
```

```js
function usr$not(_v0) -> _result {
    switch _v0
        case false { _result := true }
        case true  { _result := false }
}
```

For `require`, a match arm with an empty body:

```js
function require(cond : Bool, msg : word) {
    match cond {
    | True  =>
    | False => myrevert(msg);
    }
}
```

```js
function usr$require(cond, msg) {
    switch cond
        case true  {}
        case false { usr$myrevert(msg) }
}
```

Empty `{}` blocks are valid Yul. The `case true` arm does nothing.

For `tryWithdraw`, a binary sum with a payload (`Option(uint256)`):

```js
data Option(a) = None | Some(a);

function tryWithdraw(balance : uint256, amount : uint256) -> Option(uint256) {
    match balance >= amount {
    | False => return None;
    | True  => return Some(balance - amount);
    }
}
```

`None` is `(false, <unused>)` and `Some(x)` is `(true, x)`, occupying two stack
slots. The function returns both:

```js
function usr$tryWithdraw(balance, amount) -> _result_tag, _result_payload {
    let cond
    cond := iszero(lt(balance, amount))    // balance >= amount
    switch cond
        case false {
            _result_tag := false
        }
        case true {
            _result_tag     := true
            _result_payload := sub(balance, amount)
        }
}
```

For `isFinished`, an N-ary sum with four constructors:

```js
function isFinished(state : AuctionState) -> Bool {
    match state {
    | NotStarted(_)    => return False;
    | Active(_, _)     => return False;
    | Ended(_, _)      => return True;
    | Cancelled(_, _)  => return True;
    }
}
```

```js
function usr$isFinished(state_tag, state_f0, state_f1) -> _result {
    switch state_tag
        case 0 { _result := false }   // NotStarted
        case 1 { _result := false }   // Active
        case 2 { _result := true  }   // Ended
        case 3 { _result := true  }   // Cancelled
}
```

This is the same code you would write by hand if you were implementing a tagged
union in Yul directly. This machinery (the ADT definition, the exhaustiveness
check, the pattern matrix compilation) adds zero instructions to the final
bytecode.

## Conclusion

Core Solidity's algebraic data types and pattern matching address a class of
smart contract bugs that Classic Solidity has no good defense against: the
silent handling of missing or newly-added cases.

The problems are structural. When a contract's logic depends on a set of
alternatives such as payment types, auction phases, token standards, and vote
outcomes, Classic Solidity provides enums and structs, but it cannot enforce
that every function that dispatches on that type handles all cases, or that
every variant carries the right fields and no others. Developers fill the gap
with runtime `require` checks and a discipline of adding cases everywhere. That
discipline is not enforced by the compiler, so it can and does fail, usually at
the worst possible moment.

Algebraic data types fix the representation: each constructor carries exactly
its own fields, and a value of the sum type cannot be in an incoherent state.
Pattern matching fixes the dispatch: the compiler verifies statically that every
case is covered and that no branch is dead code.

The result is better safety at no runtime cost. The generated Yul is the same
`switch` on a tag word that a careful developer would write by hand. The
exhaustiveness and redundancy checks happen entirely at compile time and
disappear from the bytecode. And the entire category of "did you handle the new
enum case everywhere?" becomes a compiler error rather than an audit finding.
