---
layout: post
published: true
title: "Inheritance Order Reversal On Storage End Warning Bug"
date: "2026-07-09"
author: Solidity Team
category: Security Alerts
---

On June 8, 2026, [clonker](https://github.com/clonker) from the Solidity team discovered a bug in the analysis phase of the Solidity compiler.
The bug manifests when the compiler emits Warning 3495 about a custom storage layout being placed too close to the end of storage.
The implementation of said warning reverses the [C3-linearized](https://docs.soliditylang.org/en/v0.8.36/contracts.html#multiple-inheritance-and-linearization) list of base contracts on the contract being checked.
Because this linearization drives inheritance-dependent decisions throughout the rest of the compiler, the reversal can lead to miscompilations as well as internal compiler errors.

We assign this bug a severity of _medium_ on our internal scale.
The bug is in the language frontend's analysis, so it is independent of the chosen compilation pipeline; both the IR and the evmasm pipelines are affected.
Pure Yul code is unaffected, and transient storage is unaffected because custom storage layouts are only implemented for persistent storage.

The bug was introduced in Solidity 0.8.29, the version that added the storage-end warning.
All versions from 0.8.29 through 0.8.35 are affected.
The bug is fixed in Solidity 0.8.36.

A GitHub search for Foundry configs suppressing Warning 3495 yielded no results, suggesting that intentionally placing storage variables at high addresses is not a common practice.
This is strenghtened by a [Sourcify](https://sourcify.dev/) scan for affected contracts yielding no results.

## Which Contracts Are Affected?

A contract is only affected if **all** of the following conditions are met:

1. it declares a custom storage layout via a `layout at` clause, and
2. the resulting storage layout overlaps the last `2**64` slots of storage, which is precisely the condition that triggers the storage-end warning, and
3. the reversed inheritance order actually changes an observable result during resolution across the inheritance hierarchy (see technical details).

Custom layouts placed near the end of storage are very uncommon, and the compiler already warns about them, so the affected pattern is unusual in practice.

**If your contract does not use a custom storage layout or inheritance, it is not affected.**

## Technical Details

This section describes the compiler internals behind the bug for readers interested in the implementation-level root cause.

### Affected versions

The storage-end warning was first shipped in Solidity 0.8.29.
The faulty helper has existed unchanged since then, so every release from 0.8.29 onward is affected until the fix.
Because the bug lives in the analysis code shared by both pipelines, neither `--via-ir` nor `--optimize` has any influence on whether it manifests.

### The storage-end warning

Solidity allows a contract to place its storage variables at a custom base slot with a `layout at` clause.
When the static part of that layout comes too close to the end of the `2**256`-slot storage space, the compiler emits a warning the user is limiting themselves in terms of upgradability of the contract.
An upgrade may cause the layout to become too large to fit into the remaining slots, which is then rejected by the compiler.
The exact trigger of the warning is that the number of free slots after the layout is at most `2**64`.

It being triggered by a hash-based layout expression such as `erc7201()` therefore has vanishing probability, comparable to a mapping element landing on any particular slot.

### The inheritance-order reversal bug

The root cause of the bug is the reversal of the list stored in the `linearizedBaseContracts` AST annotation.
The code responsible for issuing the warning walks the list in reversed order to identify the variable closest to the storage end.
Instead of using a copy, it unwittingly performed the reversal in place, permanently modifying the value seen by the rest of the compiler.

In implementation terms, this was the effect of using the `actions::reverse` helper from the [ranges-v3](https://github.com/ericniebler/range-v3) library in place of the intended `views::reverse`.
The `actions` variant mutates the underlying container in place rather than producing a reversed view.
Unfortunately, both helpers have identical signatures, which allowed the problem to go undetected.

The helper is only ever called from the function that emits the warning, so the corruption only happens for contracts that trigger it.
A contributing factor was also the underlying design of the annotation system - annotations are always mutable, violating the principles of const-correctness, which is why the C++ compiler did not flag the call to `actions::reverse` as invalid.

### Effect on the rest of the compiler

The `linearizedBaseContracts` annotation encodes the C3 linearization of the inheritance hierarchy and is consulted throughout analysis and code generation.
With the list reversed, any resolution that depends on inheritance order can produce the wrong answer.
Confirmed effects include reversed state-variable initialization order, wrong constructor invocation order, incorrect `super` and virtual-function resolution, incorrect virtual modifier resolution, and incorrect virtual `fallback`/`receive` resolution, as well as the reversed order appearing directly in the AST JSON export.
Some of these manifest as silent miscompilations while others surface as internal compiler errors or invalid IR during compilation.

## Example

The following contract demonstrates the bug.
It is a minimal reproducer, arranged to meet the conditions above.

```solidity
contract A { uint public x; constructor() { x = 1; } }
contract B is A { constructor() { x = x * 10; } }
contract C is B layout at 2**256 - 2**40 { constructor() { x = x + 5; } }
```

The inheritance hierarchy is `A -> B -> C`, whose constructors run left-to-right, so deploying `C` should set `x` to `(1 * 10) + 5 == 15`.
The `layout at 2**256 - 2**40` clause places the layout within the last `2**64` slots, triggering the storage-end warning and, with it, the reversal.

**Observed behavior:**

With the bug, deploying `C` yields `x == 5`, because the reversed linearization runs the constructors in the wrong order.
Without the layout clause (and therefore without the warning), the same contracts correctly yield `x == 15`.

## Severity Assessment

If the bug is triggered, the potential impact is high: a reversed inheritance order can silently miscompile inheritance-dependent behavior such as state-variable initialization and constructor invocation order.
In practice, however, the likelihood of running into it is very low, for several reasons.

The bug only occurs in the cases that the storage-end warning already discourages, namely a custom storage layout overlapping with the last `2**64` slots of storage.
We are not aware of any practical use case for placing variables there, and a [Sourcify](https://sourcify.dev/) scan found no contract actually doing so.
A contract that does not use inheritance is unaffected regardless.

The corruption is also not always a silent miscompilation.
In non-trivial hierarchies, i.e., involving `super`, constructor parameters, or dependencies between storage variables, the reversed order is fairly likely to produce an internal compiler error or invalid IR rather than a wrong result, which surfaces the problem at compile time instead of letting it reach a deployed contract.

## The Fix

The fix replaces `ranges::actions::reverse` with `ranges::views::reverse` so that the helper iterates over a reversed view without mutating the annotation.

## Recommended Actions

- Upgrade to Solidity 0.8.36 or later.
- If your contract uses a custom storage layout placed near the end of storage, recompile with a fixed version and verify that inheritance-dependent behavior (initialization order, `super`, virtual functions, virtual modifiers) is as expected.

## Acknowledgements

This bug was found and fixed internally by the Solidity team.
