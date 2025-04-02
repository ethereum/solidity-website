---
title: 'The Case for EOF'
date: '2025-03-27'
author: Kamil Śliwak
category: Explainers
---

[The EVM Object Format](https://evmobjectformat.org) is a long awaited upgrade that modernizes
the EVM and removes obstacles that have wide-ranging effects on the entire language, tooling and
application ecosystem on Ethereum.
Solidity is in full support of the proposal and in this post we would like to explain why.
We will address the benefits it brings and the reasons why alternatives proposed so far fall short
of achieving its goals.

## Benefits of EOF

### Tooling
Development tooling is the area where the benefits of EOF are the most evident.
The biggest flaw of the current EVM in that regard is that the bytecode is not structured enough to be
effectively analyzed.
This makes developing tools harder and EOF is a significant step towards lowering the entry barrier.

#### Formal verification and static analysis
Exposing more structure is critical for formal verification and static analysis tools,
which are becoming ever more indispensable.
As soon as the contract gets compiled, it loses a lot useful of high-level information
that cannot be perfectly reconstructed.
For example, something as conceptually simple as distinguishing functions from loops becomes non-trivial
without additional debugging information that is not present on chain.
Dynamic jumps and lack of clear separation between data and code are also obstacles to correct analysis.

#### Transpilation
The ability to execute EVM code outside of its native environment has many applications.
An obvious one is running it on a chain that uses a completely different virtual machine.
Or in a SNARK.
For a long time a [zkEVM](https://ethereum.org/developers/docs/scaling/zk-rollups/#zk-rollups-and-evm-compatibility)
was the holy grail of L2s and is just such an application.

Full emulation of the EVM within another VM, even when possible, comes with a considerable overhead in terms of performance.
Bytecode transpilation, i.e. direct translation to a different underlying set of instructions,
while preserving the same semantics can be a better solution and one of EOF's ambitious goals
is to make it easier to achieve.

The fact that contracts can currently inspect their own implementation details, such as the
exact amount of gas spent or their byte-level structure means that these details have to be
simulated on the target architecture as well, making the translation much harder if not impossible.
Banning code and gas introspection means that EOF contracts will be much more amenable to transpilation.

Having only static jumps is another important simplifying restriction, and makes it feasible
to predetermine and validate all code paths through the contract.

#### Code verification
The bytecode emitted by Solidity and existing compilers already has a well defined internal
structure, but lacking a proper container, it is unmarked, which means that it is not
discoverable on its own.
This fact makes it harder for tools to take advantage of that structure than it could otherwise be.
For example source code verification requires identifying locations of immutables and [metadata](https://docs.soliditylang.org/en/develop/metadata.html)
in the bytecode.
While metadata is appended at the end of the runtime code to be easily identifiable,
contract bytecode can be nested, which makes [reliably finding it is a much bigger challenge](https://docs.sourcify.dev/blog/finding-auxdatas-in-bytecode/).

This particular problem is actually solvable by having the compiler emit additional information,
but the solution has to be implemented separately for every language.
A universal container format makes the tool much more independent of the workings of the compiler.

### Compilers and languages
EVM, as it exists today, is not the easiest platform to develop for, which over the years has severely
stunted the diversity of available languages.
The ecosystem is dominated by Solidity with [Vyper](https://vyperlang.org) still being a distant
second despite being a mature and full-featured language.
While [Fe](https://fe-lang.org) is shaping up to be another contender, and new languages
and compilers pop up from time to time, the truth is that hardly anything else is seeing
serious production use.
Most of them die off relatively quickly and [the space is a graveyard of abandoned projects](https://github.com/s-tikhomirov/smart-contract-languages/?tab=readme-ov-file#ethereum)
rather than a thriving ecosystem.
Despite the success of Solidity, this is not something we are happy about.
Having a healthy competition in this space is very important as no language can be one-size-fits-all.

#### Why is it so hard?
Why is it so hard for new languages to catch on in this space?
We think it has a lot to do with the EVM itself.
Gas optimization is a major factor.
The existing compilers already have complex optimizers built up and while advanced developers can
still easily beat them with hand-crafted assembly, the fact of the matter is that getting
to an adequate level of optimization in a new compiler is still a big engineering task.

A major example of this is inlining.
Creating good inlining heuristics is a challenge due to two conflicting pressures.
On the one hand, jump instructions are relatively expensive, making it imperative to inline as
much as possible.
On the other hand, inlining functions increases the number of local variables and the required
stack space, so it cannot always be done.
This is a fine line to tread and EOF with its cheaper relative jumps simply provides
much more leeway to a fresh compiler.

The limited stack is another big obstacle that every new project runs into.
Optimal stack scheduling under constrained access to stack space is an unsolved problem.
We fund long-standing research projects on that topic, but this should not be a prerequisite
to even start.
Removing the limitation would go a long way towards making naive initial approaches viable.

Another example are [immutables](https://docs.soliditylang.org/en/develop/contracts.html#immutable).
The desire to lower the gas cost often leads to unintuitive solutions and one of them is using
contract's bytecode to store values, rather than using storage or memory.
Currently this requires ad-hoc editing of the bytecode during deployment and quickly gets
complicated when one wants to support anything more than value types of fixed size.
These days such mechanisms are taken for granted, but have to be reinvented by new compilers.
EOF's dedicated data section makes that trivial.
The compiler can simply put a tuple of values in the data section instead of having to hack it into the code.

This is just the tip of the iceberg.
There are also many smaller and indirect benefits of EOF's features.
For example, the up-front validation provides some guardrails against generating invalid code.
And EOF's functions make translation from a high-level language much more straightforward.
While a mature compiler will already have its own mechanisms in place to deal with those,
the option not to have them in the early stages of a project to simplify development should not be underestimated.

Finally, a major upside for a compiler is that it only needs to compile contracts into a form that
can be executed, not generate every possible form of bytecode there is.
It can easily decide to only support EOF without hurting its users, which is why we expect
new projects to do just that.
Solidity is also looking forward to dropping support for legacy EVM as soon as possible,
taking advantage of the new mechanisms and reducing the overall maintenance burden.
Tooling and applications will likely follow.

### Applications
dApps will primarily benefit indirectly, from improved compilers and tooling, however, there are
still some smaller directly observable improvements in store for them.

#### Relaxing bytecode size limits
One of them is the potential for lifting bytecode size limits ([EIP-7830](https://eips.ethereum.org/EIPS/eip-7830)).
The fact that the size of deployed bytecode cannot exceed ~24 kB has led to multiple complicated
patterns for contract splitting, such as the diamond proxy, which will become unnecessary.

#### Gas savings
As our current EOF prototype shows, contracts compiled to EOF are generally a little smaller
and cheaper.
For example one of the early benchmarks ([Measurable benefits of EOF](https://notes.ethereum.org/@ipsilon/solidity_eof_poc))
indicates an improvement in the range of 10-15% for some real contracts.

While this may seem underwhelming, note that these values come from an incomplete prototype,
with most components of the opcode-based optimizer still unimplemented on EOF.
With block deduplicator, `EXCHANGE` for stack shuffling, tail-call optimization, relaxed inlining,
and the ability to remove unused `RETURNDATACOPY`, there is potential for higher savings.

We also want to emphasize that gas savings are not the main point of EOF.
In the design, emphasis was simply on ensuring that existing contracts do not become more expensive,
as any increase in cost would have posed a major disincentive to adoption.
EOF already exceeded our expectations in that regard and any gains are just the icing on the top.

### L2s
A common argument is that [layer 2](https://ethereum.org/developers/docs/scaling/) is the place
where innovation like EOF should be taking place since L2s are much more free to experiment with
the execution layer.
Unfortunately, this not really what is currently happening.
The high value placed on EVM compatibility means that L2s closely follow L1, and more often lag
behind it than extend it.
It is still the Ethereum mainnet that drives EVM evolution.

We strongly believe that waiting for L2s to take the lead will result in complete stagnation of the execution layer.
EOF must be first adopted on the mainnet, which will make it very likely to be eventually picked
up by L2s at their own pace.

And the important aspect is that, like compilers, L2s can be satisfied with a sensible and self-contained subset
of the EVM rather than its entirety with all the legacy and quirks, as long as such a subset exists.
That subset being a part of L1 will mean that they are still EVM-compatible.
And they are less burdened by backwards-compatibility at the bytecode level, as it is
reasonable to require contracts to be recompiled before deployment.

The potential for easy transpilation is also a feature that may be helpful to L2s that are not EVM-based.

### Clients
It is undeniable that the Ethereum clients bear most of the maintenance burden of this change
as they will have to support both EOF and the legacy EVM for the foreseeable future.
The benefits to clients of adopting EOF are also much less obvious.
For example performance gains in bytecode execution can easily be overshadowed by other factors.

However, we suspect that the burden is largely overstated.
EOF is not a completely new VM design.
It shares a lot more with the legacy EVM than it differs.

Long-term, the maintenance burden to the clients and, more generally, the importance of the legacy EVM will decrease.
There will be no reason to target it in EIPs that add new features other than to make sure
it is still sound and preserves the behavior of existing contracts.
When nearly all contracts are deployed to EOF, the number of contracts
that can be meaningfully broken by network upgrades will at least stop growing.

Ultimately, this is the cost of bad design choices in a system that demands strong backwards-compatibility.
The question is if the cost is justified.
For the ecosystem above the clients, EOF is an improvement across the board.
Universal adoption will make the legacy EVM irrelevant there.

### Too early to ossify the execution layer
One of the complaints leveled against EOF is that it is unnecessary, because Ethereum
should focus only on improving its consensus layer.
That scaling is the only thing that matters and we will still survive regardless of what kind of
warts the current EVM has.
This seems very short-sighted to me and ignores the relative scale of things.
Execution layer is vastly underserved and has received only minimal face lifts in recent years in
the form of single opcodes, like [`PUSH0`](https://eips.ethereum.org/EIPS/eip-3855) or [`MCOPY`](https://eips.ethereum.org/EIPS/eip-5656).
While scaling is tremendously important, it is, deservedly, getting the lion's share of attention already.
However, bad developer and user experience is not completely irrelevant.
EOF is still only a comparatively small concession to that.
Adopting it hardly means switching all focus to the execution layer and is well worth the things it unlocks.

If the argument is that there should be no changes on the execution layer at all, our opinion
is that it is way too early to ossify it.
The major share of this work is to be done in the parts of the stack above the clients anyway.
EOF is an essential prerequisite to a lot of this work and blocks improvements
that can be happening completely independently, without obstructing the consensus layer in any way
once we finally get it out.
It of course enables future changes on the EVM level as well, but those will be much more
incremental thanks to it.

We believe the changes included in EOF to be fundamental enough that, if rejected, they they will
surely come back sooner or later, in one form or another.
Arguing over them over and over again will be a massive waste that will take away more of the core
dev time than just merging EOF would.
EOF is simply the most efficient way to just get done with it already.

## Is EOF the only way?
EOF is a coherent set of changes that build on each other.
The versioned container format enables code validation and separation of data from code.
Code validation allows for safe introduction of new opcodes with immediate arguments.
Immediate arguments are necessary for static jumps, functions and better stack opcodes.
Static jumps make `JUMPDEST` removal safe.
Banning code and gas introspection also depends on several of these changes.
In essence, it is a package of tightly related EIPs that are all necessary and make perfect sense bundled together.

These features are not new.
Over the years most of them have been proposed in one way or another.
They were never adopted, often due to significant and unresolved shortcomings and the
fact that addressing these shortcomings really requires work on the order of what has
been done in EOF.

EOF is well thought out and solves these problems right now, in a single step.
It is extremely well tested compared to other EIPs, having accumulated thousands of
[EEST tests](https://eest.ethereum.org) by now.
It already has a compiler implementation showing that it's feasible.
In theory it can be done differently, but it is not likely that the other approaches,
when perfected, will yield something that is in any way less complex than EOF.

### Can we solve "Stack Too Deep" without EOF?
As Solidity, we have been so vocal about the need to solve the "Stack Too Deep" issue that
one thing needs clarifying.
While it is an important problem, it is largely incidental to EOF and not one of its explicit goals.
[EIP-663](https://eips.ethereum.org/EIPS/eip-663) predates EOF and is simply one of the EIPs
that were always held back by the inability to safely add opcodes with immediates.
We asked the Ipsilon team to include it in EOF for three reasons: EIP-663 depends on EOF, is
extremely simple and its quick delivery directly translates to a lot of saved engineering effort.
We would still be in full support of EOF if the EIP was not a part of it, but we see no downsides,
while the upside is huge.

Why do we want it so badly?
It has been suggested that solving "Stack Too Deep"
[is merely a compiler design challenge](https://hackmd.io/@pcaversaccio/eof-when-complexity-outweighs-necessity#Compiler-Complexity-Reduction)
and can be solved without modifying the EVM.
Or that it can be done simpler by adjusting the memory pricing.
Is this true?

First of all, `SWAPN`/`DUPN` is not the only solution.
It is simply an expedient approach to a problem that has already eaten countless engineering
hours and is yet to be solved adequately.
The simplified solutions are not good enough to solve it in full generality and more complex ones
require  serious research (that we are currently doing by the way).
All the while users of the language are demanding other features that we could be spending time
on instead.
We are exploring multiple paths to our goal and EIP-663 is frankly just the simplest one.

### The 16-slot limit is an artificial limitation
The thing is... the challenge is largely artificial.
The 16-slot limit does not come from any inherent limitation of the EVM,
and potential downsides to increasing this limit are unproven and highly speculative.
As far as we are aware, the limit is simply an arbitrary trade-off between the number of
addressable stack items and the number of possible 1-byte opcodes (there can be only 256).
`DUP1`..`DUP16` and `SWAP1`..`SWAP16` took up 32 spots and that had been deemed enough.
After all, more can always be added if necessary, removing them would be much harder.

We can spend years engineering around it in the EVM or in the compiler and slowly solve it just for
the challenge of it.
Or we can be pragmatic, finally remove the unnecessary handicap by raising the limit
(with minimal, if any, consequences) and focus on more important things.

#### Memory model differences
Still, why does Solidity have to solve this problem and Vyper is seemingly unaffected?
The difference lies in the memory model.
Solidity uses stack for all function parameters and local variables,
while Vyper stores them at fixed locations in memory.
Vyper's approach significantly decreases stack pressure and makes the access to only
16 top elements more than sufficient.
However, this approach does not come without restrictions.
Using fixed locations means that a function can only be present once on the call stack, effectively
preventing recursion (other than via an expensive external call) and requires
every variable to have the upper bound on its size declared up front.
Variables need to be loaded from memory for every operation, which is an extra cost.
Setting a large upper bound can also push their locations into high addresses, incurring
the quadratic memory expansion cost.
This happens even if the function is never called in the current transaction, since it must be
possible for all
function frames to coexist in memory at the same time.

Vyper is simply affected by different limitations - it trades stack issues for being much more
sensitive to the memory pricing model, which is not ideal either.
Neither approach is really more correct than the other.
It is an opinionated choice with trade-offs.
Vyper decides to limit its expressivity in certain ways, but there is no good reason why
EVM should not allow languages more expressive than that.

In fact, we are not at all opposed to changing memory pricing.
Cheaper memory would benefit Solidity as well, and even if it did not, there is no reason to
oppose it as long as it is not detrimental to the network.
EIP-663 is just an extremely simple change with very clear upsides and no real downsides.
Repricing memory, on the other hand, requires much more careful evaluation and is not likely
to arrive quickly.
It is a fine solution, but not to the same problem.

### Why not EIP-615/EIP-2315?
[EIP-2315](https://eips.ethereum.org/EIPS/eip-2315) was a simplified version of [EIP-615](https://eips.ethereum.org/EIPS/eip-615)
and was [loudly rejected for very good reasons](https://github.com/ethereum/pm/issues/263#issuecomment-790423785).
Follow the link for details, but the main issues were that it was using
dynamic jumps (i.e. not only not solving the same problem EOF does but aggravating it)
and that it did not provide any protection against jumping inside or across functions.
The issue with dynamic jumps was eventually addressed by making the instructions use immediate arguments
but still without fixing the inherent `JUMPDEST` problem.

It has to be stated that EIP-2315 was not rejected due to ["insufficient gas benefits"](https://hackmd.io/@pcaversaccio/eof-when-complexity-outweighs-necessity#Static-Analysis-Improvement).
The supposed gas benefits were stated by the EIP's author to be its main goal and we simply showed
that it does not even achieve it.
This may have been enough to make its adoption unlikely, but the reasons for the eventual
rejection were much more fundamental.

### Do we really need immediate arguments?
Immediates are a natural solution to some types of problems.
The value is embedded directly in the code and known ahead of time, unlike values placed on the stack.
- Jumping to static locations is exactly such a problem.
    - Referencing functions or containers inside the bytecode is pretty much the same use case.
- The `DUPN`/`SWAPN` EIP stumbled into this problem long before EOF was even a thing.
- Outside of EOF, even EIP-615/EIP-2315 did this.
- `ADDMODX`, `SUBMODX` and `MULMODX` opcodes in EVMMAX ([EIP-6690](https://eips.ethereum.org/EIPS/eip-6690))
 require 7 constant arguments, all of which are realized as immediates.

Introduction of immediates has been a known problem for a long time now.
Arguing that there are few proposals that require them is confusing the cause with the effect, given that doing this would require solving that problem first.
EOF provides great value by turning that so far unsolvable dependency into a non-issue.

#### The `JUMPDEST` problem
[The problem with multi-byte opcodes](https://ethereum-magicians.org/t/eip-663-unlimited-swap-and-dup-instructions/3346/10)
is essentially that they may contain the value of the `JUMPDEST` opcode.
If such sequences already appeared in existing contracts, the upgrade will change their behavior.
Safe solutions to this problem usually hinge on  introducing some kind of account versioning.

Even [the proposed introduction of `BEGINDATA`](https://hackmd.io/@pcaversaccio/eof-when-complexity-outweighs-necessity#Enabling-Opcodes-With-Immediates)
comes with the problem of how to safely introduce the opcode itself, as it is essentially
equivalent to an opcode with a huge immediate argument of variable length and subject to that problem itself.
EOF already provides a very elegant solution to versioning.

Block-number-based versioning is of course superior when possible, because it ensures same
semantics for all contracts.
The problem is that it being the *only* solution means that many EIPs can never land
becuse there are always some contracts that would break under the new semantics.
EOF does not preclude it, it simply provides an alternative.

#### The `PUSH` hack
There actually is one way to safely hack around the `JUMPDEST` problem: using a forced `PUSH` opcode.
If, instead of adding an immediate, we require that the opcode is always preceded by pushing a
value to the stack, we avoid the `JUMPDEST` problem and guarantee that the value is known and constant, just like an immediate.
Essentially, we simulate opcodes like this:
```
RJUMP 0x42
```
with this:
```
PUSH1 0x42
RJUMP
```

Hacks of this kind were already proposed in the past and never taken seriously so far.

One of the downsides is that the sequence is 50% longer, which may be an acceptable trade-off for
rarely used opcodes, but would only aggravate the problem if used e.g. with jumps, which are
already overpriced.
It is also much more complicated to implement instructions with a variable number of immediate
arguments, such as `RJUMPV`.

Overall, while this is a feasible one-off workaround, it is untenable as a general solution to
the problem.
It completely misses the point and aims to patch a single issue in the short-term, while
degrading the design of the EVM in the long term.

## Summary
EOF will benefit the whole stack that depends on the execution layer: compilers, tooling,
applications, even L2s.
It simplifies the surface of contact with the EVM while also providing the necessary prerequisites
to make future extensions easier to implement.
We can't completely get rid of legacy EVM, but a large part of the ecosystem will still be able to
more or less forget about it.

Theoretically it is not our only choice, but it is here, it is ready, it is coherent and in our opinion it is absolutely necessary.
