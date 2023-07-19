---
layout: post
published: true
title: 'FullInliner Non-Expression-Split Argument Evaluation Order Bug'
date: '2023-07-19'
author: Solidity Team
category: Security Alerts
---

On July 4, 2023, Robert Chen from OtterSec discovered a bug in the Yul optimizer.

The earliest affected version of the compiler is 0.6.7, which introduced the ability to modify the
optimizer step sequence.
[Solidity version 0.8.21](https://github.com/ethereum/solidity/releases/tag/v0.8.21), released on July 19, 2023, provides a fix.

We assigned the bug an overall score of "low".
The bug has "high" severity in affected cases, but we deem the likelihood of it actually affecting deployed contracts as "very low".

## Which Contracts are Affected?

The prerequisite to trigger the bug is to meet **all** of the following conditions:
1. The use of [Yul optimizer](https://docs.soliditylang.org/en/v0.8.21/internals/optimizer.html#yul-based-optimizer-module).
2. The use of a custom optimizer step sequence.
3. Presence of the [`FullInliner` step](https://docs.soliditylang.org/en/v0.8.21/internals/optimizer.html#full-inliner) (`i`) in the sequence.
4. Code in non-expression-split form being able to reach the `FullInliner` step.

    It is not generally possible for the user to precisely control whether the code coming out of the
    code generator is or is not in this form.
    However, it is guaranteed that the code passed through the
    [`ExpressionSplitter` step](https://docs.soliditylang.org/en/v0.8.21/internals/optimizer.html#expression-splitter) (`x`)
    is expression-split, and the opposite is true for code that is run through the
    [`ExpressionJoiner` step](https://docs.soliditylang.org/en/v0.8.21/internals/optimizer.html#expression-joiner) (`j`).
    Therefore sequences where `i` is always preceded by `x` with no intervening occurrences of `j` are safe.
    Other sequences may or may not be affected depending on their exact structure.

Lack of user-provided Yul code (in the form of inline assembly or pure Yul input) significantly
decreases the chances of triggering the bug.

The bug affects both the legacy and the IR-based compilation pipeline.
This is primarily due to the fact that inline assembly is passed through the Yul optimizer
regardless of which pipeline is used.
Also, certain language features are compiled from internal Yul code, even by the legacy code generator.

## Technical Details

The immediate cause of the buggy behavior is the fact that `FullInliner` does not preserve the
evaluation order of arguments in function calls it inlines.
When the arguments are themselves function calls with side effects, a change in the order may alter
the results of contract execution.

The evaluation order was initially assumed not to pose any problems since function calls
where it matters should never have been subject to inlining.
The step was designed to follow `ExpressionSplitter`, which converts the code into the
expression-split form, where all call arguments are simple identifiers.
Any non-expression-split call appearing in the input was supposed to be ignored, which was not
actually the case as it turned out.

Despite these flaws, the problem did not affect the compiler in practice because the default optimizer
sequence was carefully chosen to always run `ExpressionSplitter` before `FullInliner`.
However, the later introduction of a mechanism that allowed users to supply a custom sequence
made it possible to trigger the bug.

### Optimizer Step Sequence

Yul optimizer works by refining the unoptimized IR produced by the code generator in
[discrete steps](https://docs.soliditylang.org/en/v0.8.21/internals/optimizer.html#optimizer-steps),
each one receiving the output of the previous one.
The order of steps is determined by the step sequence.

Initially, the sequence was hard-coded in compiler's source code.
Version 0.6.7 introduced options that allow the user to
[customize the steps to be executed and their order](https://docs.soliditylang.org/en/v0.8.21/internals/optimizer.html#selecting-optimizations).
This is done via `settings.optimizer.details.yulDetails.optimizerSteps` in Standard JSON or `--yul-optimizations` on the CLI.

Choosing a good sequence is a challenging task.
It requires awareness of both how individual steps work and which other steps transform the code in ways
that are beneficial or detrimental to their operation.
For example, many steps benefit from code being in the [SSA form](https://en.wikipedia.org/wiki/Static_single-assignment_form).
The [`SSATransform` step](https://docs.soliditylang.org/en/v0.8.21/internals/optimizer.html#ssa-transform) (`a`)
provides that form, but also introduces redundant assignments, which is why it is usually combined with
[`RedundantAssignEliminator`](https://docs.soliditylang.org/en/v0.8.21/internals/optimizer.html#redundant-assign-eliminator) (`r`).
[`ConditionalSimplifier`](https://docs.soliditylang.org/en/v0.8.21/internals/optimizer.html#conditional-simplifier)
is a step that works best when the code is in the SSA form, but it destroys this property,
which can affect the effectiveness of steps executed later in the sequence.

The [default sequence](https://github.com/ethereum/solidity/blob/v0.8.21/libsolidity/interface/OptimiserSettings.h#L44-L62)
was carefully chosen and refined over time to provide well-optimized code.
While it still has room for improvement (especially in terms of performance), it ensures
that prerequisites of all steps are met.

### Argument Evaluation Order in Yul

In Yul, the order in which function arguments are evaluated is always right to left.
For example:

```yul
f(add(mload(0), mload(x)), mload(1))
```

The expression above would be evaluated in the following order:
- `mload(1)`
- `mload(x)`
- `mload(0)`
- `add(...)`
- `f(...)`

Note that the order does not matter when the expressions have no side effects.
Even if `mload(0)` was evaluated before `mload(x)`, the behavior of this code fragment would not change.

However, the introduction of expressions with side effects changes this:
```yul
function store(x, y) -> r {
    sstore(x, y)
    r := y
}

add(sload(0), store(0, k))
```

Evaluating `store()` after `sload()` in the code above would change the result.

### Expression-Split Form

The job of the expression splitter is to transform the code into a simpler form that is
easier for some other optimizer steps to work with and not affected by the choice of evaluation order.
This transformation involves evaluating call arguments first and storing the results in new variables.
Then those variables are passed to the call instead.

For example:

```yul
add(sload(0), store(0, k))
```

Would be transformed into:

```yul
let _a := k
let _b := 0
let _x := store(_b, _a)
let _c := 0
let _y := sload(_c)
let _z := add(_y, _x)
```

Note that in the transformed code, there is no ambiguity as to the order of side effects
and evaluating function arguments in a different order would not affect it.

### `FullInliner` and Inlining of Function Calls

`FullInliner` uses heuristics to determine which function calls would be better off replaced by
instructions from the function body, and performs the replacement.
By itself, this makes the code less optimal in most cases, because it increases the code size and
does not have a significant effect on the cost of execution.
However, the benefit of this step is that it enables other steps (which usually do not work across
function boundaries) to better optimize the resulting code.

When inlining a function, the inliner needs to ensure that its arguments will be evaluated the same
way as in the call.
This involves replacing them with local variables at the point of inlining, and renaming them to
avoid clashes with identifiers used in the surrounding code.

Yul has three kinds of expressions that can be used as call arguments:
- Literals (e.g. `0x42` or `0`)
- Identifiers (e.g. `k` or `ret`)
- Function calls (e.g. `f(x)` or `sstore(0, sload(x))`)

Let's consider a function `f()` defined as follows:

```yul
function f(a, b) -> r {
    let c := mul(a, 4)
    let r := add(c, b)
}
```

When called with a literal or an identifier, inlining is straightforward:

```yul
let k := 0x42
f(24, k)
```

The call can be simply replaced with the body of the function as long as we take care to rename
variables to avoid name clashes:

```yul
let k := 0x42
let _q := 24
let _p := k
let _c := mul(_q, 4)
let _r := add(_c, _p)
```

Introducing function calls as arguments, however, requires paying more attention to the evaluation order.
Let's now consider two functions with side effects:

```yul
function rev() -> r { revert(0, 0) }
function ret() -> r { return(0, 0) }
```

In the call below, the evaluation order determines whether the transaction will revert or terminate successfully.
In this case it should revert:

```yul
f(ret(), rev())
```

When faced with code like this, `FullInliner` was supposed to refrain from inlining.
This would not decrease the effectiveness of the optimizer under normal circumstances because the inliner
was meant to be paired with `ExpressionSplitter`, which ensures that arguments are always simple identifiers.

As a result of the bug, `FullInliner` would inline such a call regardless, doing it as if the
arguments were identifiers, and putting the argument expressions in an order different from the usual
Yul evaluation order:

```yul
_q := ret()
_p := rev()
let _c := mul(_q, 4)
let _r := add(_c, _p)
```

The inlined code above would now (incorrectly) terminate successfully instead of reverting.

## Effects of the Bug

The bug has the potential to alter the behavior of a contract in a very significant way.
Reordering reverts or returns may lead to storage writes, memory writes, or event emissions not being performed.
It may also lead to the contract not reverting (and therefore not rolling back some operations) when
it should or vice-versa.

It is important to note that high-level Solidity code is unlikely to be affected unless the used optimizer
sequence explicitly includes a step that actively transforms the code into the non-expression-split form
(i.e. `ExpressionJoiner`) before `FullInliner`.

In the absence of this, triggering the bug would likely require inline assembly or a contract written in pure Yul.
This is because nested function calls in Solidity code are not directly transformed to nested calls
in generated Yul.
The code generated by the IR pipeline is mainly in the expression-split form, where each expression
is assigned to a separate variable because code in this form is very easy to generate.
The compiler does generate calls in the non-expression-split form in its own helper functions, but these
rarely have side effects other than simple reverts.

## Impact

The complex set of conditions required to trigger the bug makes it unlikely to occur in actually deployed contracts.

The use of custom optimizer sequences in the first place is uncommon.
The feature is intentionally not widely advertised.
Using it in a way that provides actual benefits is not easy.
Anyone with enough knowledge to use it would also be likely to avoid inefficient sequences necessary
to trigger this bug.

Moreover, the bug will not affect the vast majority of Solidity code.
The code most likely to be broken by it is inline assembly, which usually constitutes a small
portion of the whole contract.
The code also has to actually contain nested function calls with side effects.

Therefore, while the bug can have severe consequences, the overall impact on real
projects is low.
