---
layout: post
published: true
title: "Pattern Matching in Core Solidity"
date: "2026-xx-xx"
author: Solidity Team
category: Announcements
---

As we described in our
[Core Solidity deep dive](https://soliditylang.org/blog/2025/11/14/core-solidity-deep-dive/),
Core Solidity introduces algebraic data types (ADTs) and pattern matching as
first-class language features. This post digs into why these features matter for
smart contract safety, and how the pattern matching compiler in the Core
Solidity prototype is implemented.

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
        address to;
        uint256 amount;
        uint256 tokenId;
    }

    function processPayment(Payment calldata payment) external {
        if (payment.paymentType == PaymentType.NATIVE) {
            require(payment.token == address(0), "Native: no token");
            require(payment.amount > 0, "Native: amount required");
            require(payment.tokenId == 0, "Native: no tokenId");
            payable(payment.to).call{value: payment.amount}("");
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

This code has several safety problems that the language cannot help us with.

**Invalid states are representable.** The `Payment` struct can be constructed
with contradictory fields: a `NATIVE` payment with a non-zero `token` address,
or an `ERC721` payment with no `tokenId`. The struct has enough fields to
represent any of the three payment variants, but nothing in the type prevents us
from filling those fields with incoherent values. The `require` calls in
`processPayment` are our only defense, and they have to be repeated in every
function that receives a `Payment`.

**No compile-time totality guarantee.** If we add a new variant, say `ERC1155`,
to the `PaymentType` enum, the compiler will not tell us where the dispatch
logic needs to be updated. `processPayment` will silently do nothing for
`ERC1155` payments. `calculateFee` will silently return 0. Every function that
dispatches on `PaymentType` is a potential silent failure waiting to happen.

**Redundant runtime validation.** Because the type system cannot express the
constraint that, e.g., a `NATIVE` payment has no `token`, each function must
repeat those structural checks. This is both verbose and error-prone: a
developer might add a new function and forget to validate one of the fields.

## Algebraic Data Types Make Invalid States Unrepresentable

Core Solidity lets us define a `Payment` type that expresses these three
variants precisely:

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
will cause the compiler to immediately report every match expression that does
not handle the new case. No function can silently miss the new variant.

## Totality: Exhaustiveness as a Safety Property

The example above hints at the most important safety property that pattern
matching brings to smart contracts: **exhaustiveness checking**, also called
totality. A pattern match is exhaustive if every possible value of the scrutinee
type is handled by at least one branch. The Core Solidity compiler enforces this
statically and rejects any program that contains an incomplete match.

Why does this matter so much for smart contracts in particular? Smart contract
bugs are extremely costly to fix. Once a contract is deployed, its logic is
immutable (absent an upgradeable proxy pattern), and any ether or tokens locked
by a buggy contract may be permanently inaccessible. In the Classic Solidity
`calculateFee` function above, the final `return 0` is dead code that exists
only because the compiler cannot verify that the if-else chain covers all
variants. If a future developer adds a fourth `PaymentType` and forgets to
update `calculateFee`, the function silently returns zero, a potentially
expensive mistake that will not be caught until it is too late.

Exhaustiveness checking transforms this category of bug into a compile-time
error. Consider the following incomplete match:

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

```
Non-exhaustive pattern match. Missing case: Ended($v0, $v1)
  in function processBid
  in match (state)
```

The compiler names a concrete missing pattern, a _witness_, so the programmer
knows exactly what case has been overlooked. This error must be resolved before
the program can compile. The developer might add explicit branches for `Ended`
and `Cancelled`, or add a wildcard default (`| _ =>`), but in either case the
decision is deliberate and visible in the source code.

Redundancy checking is the complementary property: the compiler also warns when
a pattern branch can never be reached because an earlier branch already covers
its inputs. Redundant branches are often symptoms of copy-paste errors or of
code that was not updated after a refactor. Having the compiler detect them
avoids the subtle class of bugs where a developer believes they are modifying
one case of a dispatch but are actually modifying code that never executes.

## The Pattern Match Compiler

Exhaustiveness and redundancy checking, together with the translation of nested
patterns into efficient runtime dispatch, are handled by a dedicated compilation
pass in the Core Solidity prototype:
[`DecisionTreeCompiler.hs`](https://github.com/argotorg/solcore/blob/main/src/Solcore/Desugarer/DecisionTreeCompiler.hs).

This pass runs after type inference and before specialization. Its job is to
transform `match` expressions over arbitrary nested patterns into a _decision
tree_, a form where each node tests exactly one scrutinee against flat
constructor patterns, with no nesting. The resulting tree is then converted back
into a simplified `match` statement that later passes (specialization and Yul
emission) can handle directly.

### The Pattern Matrix

The compiler's input is a _pattern matrix_: one row per match arm, one column
per scrutinee expression, with the arm's body as its action. Consider this
function from the payment example:

```js
function processPayment(payment : Payment) {
    match payment {
    | Native(to, amount)           => transfer(to, amount);
    | ERC20(token, from, to, amt)  => transferFromERC20(token, from, to, amt);
    | ERC721(token, from, to, tid) => transferFromERC721(token, from, to, tid);
    }
}
```

The matrix here has three rows and one column:

```
Column 0 (payment)                  Action
---------------------------------------
Native(to, amount)           →  transfer(to, amount)
ERC20(token, from, to, amt)  →  transferFromERC20(...)
ERC721(token, from, to, tid) →  transferFromERC721(...)
```

Multi-scrutinee matches naturally produce multi-column matrices. This match
function, which computes whether a state transition is permitted in an auction:

```js
data Phase = Early | Late

function discount(state : AuctionState, phase : Phase) -> uint256 {
    match state, phase {
    | Active(bid, _), Early => return bid / 10;
    | Active(bid, _), Late  => return bid / 20;
    | _, _                  => return 0;
    }
}
```

produces a 3×2 matrix:

```
Column 0 (state)      Column 1 (phase)    Action
-------------------------------------------------
Active(bid, _)        Early          →  return bid / 10
Active(bid, _)        Late           →  return bid / 20
$v0                   $v1            →  return 0
```

(Wildcards have been replaced with fresh variables `$v0`, `$v1` by an earlier
desugaring pass.)

### Column Selection

When the matrix has more than one column, the algorithm must decide which column
to test first. The compiler uses the _necessity heuristic_: it counts the number
of non-variable patterns in each column and selects the column with the highest
score. Columns with more constructor or literal patterns carry more information
and prune the matrix faster.

For the `discount` matrix above:

```
Column 0 (state) necessity: 2  (Active, Active — two non-variable patterns)
Column 1 (phase) necessity: 2  (Early, Late — two non-variable patterns)
```

Both columns score equally. When scores tie the compiler prefers the shallowest
scrutinee, the one that requires the fewest field accesses to reach from the
top-level value, so column 0 is selected first.

For a matrix that is more clearly asymmetric, consider:

```js
function canFinalize(state : AuctionState, approved : Bool) -> Bool {
    match state, approved {
    | Ended(_, _),    True  => return True;
    | Cancelled(_, _), True => return True;
    | _,              _     => return False;
    }
}
```

```
Column 0 (state)    Column 1 (approved)   Action
-------------------------------------------------
Ended(_, _)         True           →  return True
Cancelled(_, _)     True           →  return True
$v0                 $v1            →  return False
```

Here column 0 has necessity score 2, column 1 has score 1, so column 0 is
selected and the compiler emits a single `switch` on the auction state tag
before ever looking at `approved`.

### Specialization and the Default Matrix

Once a column is selected, the compiler processes each constructor head found in
that column. For each constructor `K` it builds a _specialized sub-matrix_ by:

- Keeping rows that begin with `K(...)` and prepending their field patterns to
  the remaining columns.
- Replacing rows that begin with a variable `$v` with fresh variable patterns
  for `K`'s fields (and recording that `$v` is bound to the whole scrutinee at
  this node).
- Discarding rows whose first pattern is a different constructor.

Going back to the `discount` example and specializing for `Active`:

```
// Specialized matrix for Active(bid, _) in column 0:
// The two Active rows survive; the wildcard row goes to the default matrix.

Field: bid    Field: _    Column 1 (phase)    Action
-----------------------------------------------------
$bid          $pad        Early          →  return bid / 10
$bid          $pad        Late           →  return bid / 20
```

The wildcard row from the original matrix becomes the _default matrix_ — the
sub-matrix to compile when the scrutinee does not match any of the listed
constructors:

```
// Default matrix (wildcard row from column 0):
Column 1 (phase)   Action
--------------------------
$v1          →  return 0
```

### Recursion and the Decision Tree

After specialization, the compiler recurses into each sub-matrix. For the
`Active` specialization above, it now needs to compile:

```
Field: bid    Field: _    Column 1 (phase)    Action
-----------------------------------------------------
$bid          $pad        Early          →  return bid / 10
$bid          $pad        Late           →  return bid / 20
```

The necessity scores are now: bid=0, _=0, phase=2. Column `phase` is selected.
Specializing for `Early`:

```
// Early specialization: one row, all variables → Leaf
$bid $pad → return bid / 10
```

And for `Late`:

```
// Late specialization: one row, all variables → Leaf
$bid $pad → return bid / 20
```

`Phase` has exactly two constructors and both are covered: the match on phase is
complete, so no default is needed at this level.

Back at the top level, the compiler checks whether `Active` alone covers all of
`AuctionState`. It does not: `NotStarted`, `Ended`, and `Cancelled` are missing.
The default matrix (the wildcard row) provides coverage, so it is compiled to a
`Leaf` for `return 0`.

The full decision tree is:

```
Switch on state:
  case Active(bid, _):
    Switch on phase:
      case Early: Leaf → return bid / 10
      case Late:  Leaf → return bid / 20
  default:        Leaf → return 0
```

### Exhaustiveness and Redundancy Errors

Two properties are checked during this process.

**Exhaustiveness.** When the set of constructors found in a column is incomplete
and the default matrix is also empty, there is no branch to fall through to. The
compiler emits a `NonExhaustive` error and names a _witness_, a concrete set of
patterns that would reach the missing case. For example, if the wildcard row
were removed from `discount`:

```js
function discount(state : AuctionState, phase : Phase) -> uint256 {
    match state, phase {
    | Active(bid, _), Early => return bid / 10;
    | Active(bid, _), Late  => return bid / 20;
    // missing: all non-Active states
    }
}
```

the compiler reports the following error message:

```
Non-exhaustive pattern match. Missing case: NotStarted($v0), $v1
  in function discount
  in match (state, phase)
```

The witness `NotStarted($v0), $v1` identifies the first uncovered case: any
`NotStarted` state paired with any phase value. The compiler produces this
witness by looking up the siblings of `Active` in the type environment (finding
`NotStarted`, `Ended`, `Cancelled`) and taking the first one that is absent from
the column.

**Redundancy.** Before building the decision tree, the compiler runs a separate
pre-pass that checks each row for _usefulness_ (Maranget's algorithm): a row is
useful if it covers at least one input that no earlier row already handles. A
row that is not useful is dead code and triggers a `RedundantClause` warning.
For example:

```js
function f(x : Bool) -> Bool {
    match x {
    | z    => return z;    // catches everything
    | True => return True; // unreachable: z above already covers True
    }
}
```

```
Warning: Clause (True → return True) is redundant.
  in function f
  in match (x)
```

Unlike non-exhaustive matches, redundant-clause warnings do not prevent
compilation: they are surfaced as warnings to assist developers during
refactoring.

### Converting the Decision Tree Back to Core Solidity

Once the decision tree is built it is converted back into a simplified `match`:
one where each node tests a single expression against flat constructor patterns,
with no nesting. For the `discount` function the result looks like this:

```js
// After decision tree compilation: one level of match per scrutinee
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

All nested constructor patterns have been flattened. Each variable introduced by
the flattening (`$bid`, `$pad`) has been substituted into the arm body. The
compiler carries an _occurrence map_ that tracks which sub-expression each
variable is bound to, and applies a single substitution pass over every arm body
to install those bindings before emitting code.

### Lowering to Yul

After pattern compilation, the program goes through specialization
(monomorphization of generic functions and type class instances) and is emitted
as Hull: a first-order functional intermediate representation with sum and
product types. The separate `yule` binary, implemented in
[`Translate.hs`](https://github.com/argotorg/solcore/blob/main/yule/Translate.hs),
then translates Hull into Yul.

#### Runtime Representation of Sum Types

The central challenge for the Yul backend is that Yul has no algebraic types,
only 256-bit words and flat sequences of those words. Every sum type must
therefore be _flattened_ onto the EVM stack.

The compiler represents a sum type as a sequence of EVM stack slots whose length
is:

```
1 (tag) + max(size of each constructor's payload)
```

The tag is a single word that identifies which constructor is active (starting
at 0). The payload slots hold the fields of the active constructor, padded with
unused words to fill the maximum payload size across all constructors.

**Binary sums (`A | B`).** A type with two constructors is represented as a
single word: 0 (`false` in Yul) for the first constructor, 1 (`true` in Yul) for
the second. Because both `unit` payload fields are zero-sized, no payload slot
is needed beyond the tag. So `Bool = False
| True` occupies exactly one stack
slot.

**N-ary sums.** A type with more than two constructors gets an integer tag (0,
1, 2, …) and as many payload slots as the widest constructor requires.

For `AuctionState`:

```js
data AuctionState =
    NotStarted(uint256)       // payload: 1 word (reserve)
  | Active(uint256, address)  // payload: 2 words (bid, bidder)
  | Ended(uint256, address)   // payload: 2 words
  | Cancelled(uint256, address); // payload: 2 words
```

The widest payload is 2 words, so every `AuctionState` value occupies **3 stack
slots**:

```
slot 0  tag   (0=NotStarted, 1=Active, 2=Ended, 3=Cancelled)
slot 1  field 0  (reserve for NotStarted; currentBid for Active/Ended/Cancelled)
slot 2  field 1  (unused for NotStarted; bidder for Active/Ended/Cancelled)
```

A `NotStarted(1000)` value is represented as `(0, 1000, <unused>)` on the stack.
An `Active(500, 0xABCD)` value is `(1, 500, 0xABCD)`.

#### Translating `match` to `switch`

The `yule` translator handles a match statement by extracting the tag from the
scrutinee's location and emitting a Yul `switch` on that tag. Each arm binds the
payload to a local variable and then generates its body.

For **binary sums**, the tag is the entire value (a single word) and the two
branches use `case false` and `case true`. Consider `not`, which inverts a
boolean condition:

```js
function not(b : Bool) -> Bool {
    match b {
    | False => return True;
    | True  => return False;
    }
}
```

```yul
function usr$not(_v0) -> _result {
  switch _v0
    case false { _result := true;  leave }
    case true  { _result := false; leave }
}
```

The `Bool` value is a single word. `false` (0) is the tag for the first
constructor `False`; `true` (1) is the tag for `True`. Each match arm becomes a
`switch` case, and no payload slot is needed because both constructors are
nullary (they carry no fields).

## Conclusion
