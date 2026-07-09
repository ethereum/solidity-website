---
layout: post
published: true
title: "Unsound Spill In Mutual Recursion Bug"
date: "2026-07-08"
author: Solidity Team
category: Security Alerts
---

On May 11, 2026, [clonker](https://github.com/clonker) from the Solidity team discovered a bug in the Yul optimizer's call graph analysis.
The bug resulted in mutually recursive functions being sometimes misclassified as non-recursive, and therefore not being excluded from the memory spilling mechanism that is incompatible with recursive functions.
The mechanism relocates local variables to fixed memory offsets to work around the EVM's stack depth limit and would cause the spilled variables to be shared between all invocations of the same function.

We assign this bug a severity of _medium_ on our internal scale. 
The bug only affects the IR pipeline; the legacy evmasm pipeline is not affected. 
The `--via-ir` flag is not enabled by default, so projects that have not explicitly opted into it are not affected.

The affected code has been reachable since Solidity 0.7.2, though the precise conditions required to trigger it change across the affected range (see [Affected versions](#affected-versions) below).
All versions from 0.7.2 through 0.8.35 are affected. 
The bug is fixed in Solidity 0.8.36.

A scan of all `--via-ir` contracts in the [Sourcify](https://sourcify.dev/) database (roughly 207,000 contracts) found 272 contracts (about 0.1%) containing a function that the analysis misclassifies. 
None of these contracts relocate variables to memory inside the misclassified function, so no deployed contract is known to be affected.

## Which Contracts Are Affected?

A contract is only affected if **all** of the following conditions are met:

1. it is compiled with `--via-ir` (or `settings.viaIR` in Standard JSON),
2. it contains mutually recursive internal functions, 
3. the recursive calls form two or more **intersecting cycles** sharing at least one function in the call graph (see technical details),
4. the processing order of the functions does not mitigate the issue--whether the misclassification occurs depends on the order in which the cycle-detection traversal visits the functions, which is determined by the hashes of their internal Yul names--,
5. at least one of the functions wrongly classified as non-recursive is complex enough (uses enough simultaneously-live local variables) that the compiler relocates some of those variables to memory to satisfy the EVM's stack-depth limit, and
6. a corrupted variable influences an observable result.

These conditions are narrow and must all coincide, which is why the affected pattern is very uncommon in practice.

**If your contract has no mutual recursion, it is not affected.**

On Solidity 0.8.21 and later, the bug is independent of whether the optimizer is enabled.
The stack-to-memory relocation is a distinct stage of the IR pipeline that runs regardless of the optimizer setting, so disabling the optimizer does not avoid it.
On earlier affected versions (0.7.2–0.8.20), however, the Yul optimizer - and with it the stack-to-memory mover - only runs when `--optimize` is passed, so reaching the bug there requires both `--via-ir` and `--optimize`.

## Technical Details

This section describes the compiler internals behind the bug for readers interested in the implementation-level root cause.

### Affected versions

The single 0.7.2-0.8.35 range in the summary glosses over some detail.

The faulty cycle detection was first introduced in a refactor in 0.6.12.
At that point, the code had only one consumer, the `SideEffectsPropagator`, where a misclassification has no observable effect.

The first consumer where the misclassification actually matters was in 0.7.2 with the `StackLimitEvader`, which is therefore treated as the first affected version.
In practice, we could only reproduce the miscompilation from 0.8.8 onward, or from 0.8.10 through the experimental `--experimental-via-ir` entry point.
On earlier versions our reproducer hits Stack-Too-Deep before the incorrect behavior can surface.
We could not construct a working reproducer below 0.8.8, but we also cannot prove that the bug is unreachable there, so we conservatively consider the entire range 0.7.2-0.8.35 to be affected.

Two further caveats about when the affected code can be reached:

- The IR pipeline was experimental until 0.8.13; before that, using it required the experimental opt-in.
- Before 0.8.21, the Yul optimizer and with it the stack-to-memory mover did not run unless `--optimize` was passed.
  The bug is therefore only independent of the optimizer on 0.8.21 and later.

### Recursion and the stack-to-memory mover

The EVM can only directly access the topmost 16 stack slots. 
A function with many simultaneously-live local variables can exceed this limit, which historically reported as the "Stack too deep" error. 
To reduce how often this happens, the IR pipeline includes a stack-to-memory mover (aka the "stack limit evader"): 
when a function cannot fit its variables on the stack, the compiler moves some of them to **fixed** memory offsets and replaces the stack accesses with `mstore`/`mload` to those offsets.

This relocation is only sound for functions that are **not** recursive. 
A fixed memory offset is shared by every activation of the function, so if a function holds a value in a fixed slot across a call and that call re-enters the same function (directly or through a cycle), the inner activation overwrites the slot and the outer activation reads back a corrupted value. 
For this reason the mover must never relocate the variables of a function that is part of a recursive call chain.

To determine which functions these are, the compiler constructs a Yul call graph and runs a cycle detection algorithm on it.

### The cycle-detection bug

A function is recursive precisely when it is contained in a cycle in the call graph: either it calls itself directly, or it is part of a group of functions that can all reach one another (a strongly connected component).

The previous implementation in `CallGraphGenerator` computed this with a path-based depth-first search. 
While traversing, it kept the current path on a stack;
upon reaching an invocation of a function already present on the stack, it marked that function and every other function called between the two invocations as "contained in a cycle".
Once all calls in the function had been fully explored, it was popped from the path and added to a set reflecting visited nodes (`visited`), and any later visit to it short-circuited immediately.

This short-circuit is unsound in the presence of intersecting cycles.
The traversal only records a cycle when it walks an edge back to a function still on the current path, and once a function has been fully explored it is marked visited and never re-entered.
So if a function's cycle can only be closed by passing through a node that was already finished as part of an earlier cycle, the traversal stops at that finished node before the second cycle closes.
The function is then reported as non-recursive - even though it was fully explored, and even though it genuinely is part of a cycle.

Consider three functions:

```solidity
function a() { b(); c(); }
function b() { a(); }
function c() { b(); }
```

All three belong to a single strongly connected component: 
`a` reaches `c` directly, and `c` reaches `a` through `c -> b -> a`, so every function can reach every other. 
All three are recursive.

The traversal, however, can miss `c`:

1. Start at `a`. Current path `[a]`.
2. Descend into `b`. Current path `[a, b]`.
3. `b` calls `a`, which is on the current path - mark `{a, b}` as contained in a cycle. Return, pop `b`, add `b` to `visited`.
4. Back in `a`, descend into `c`. Current path `[a, c]`.
5. `c` calls `b`, but `b` is already in `visited` - short-circuit and return without inspecting it.
6. Pop `c`, pop `a`. The result is `{a, b}`. **`c` was never marked.**

`c` is reported as non-recursive even though it lies on the cycle `c -> b -> a -> c`.

Whether this happens depends on traversal order.
The cycle through `c` is only missed because `b` was discovered and marked as visited via the `a -> b` edge _before_ the traversal reached it again through `c`. 
The order in which callees are visited follows the ordering of the call graph's internal data structures, which is determined by the functions' Yul name hashes.
A different set of names - and therefore a different ordering - may allow the algorithm to detect all three correctly, which is why the bug depends on the exact shape of and naming in the call graph.

### Effect on the generated code

A misclassification only matters when the mover acts on the function the analysis got wrong.
If `c` above is simple, nothing is relocated and the code is correct. If it is complex enough to exceed the stack limit, the mover relocates its locals to fixed offsets, treating it as non-recursive. 
Because `c` is recursive, the re-entry through `c -> b -> a -> c` overwrites those offsets as described above, and the outer activation reads back a corrupted value.

## Example

The following contract demonstrates the bug. 
It is a minimal reproducer, arranged to meet the conditions above. 
A full reproducer can be found [here](https://github.com/argotorg/solidity/blob/89f03eac005d2eacd50818851ac9b289bf5d410a/test/cmdlineTests/standard_via_ir_intersecting_recursive_cycles_stack_too_deep/in.sol#L8).


```solidity
contract C {
    uint256[26] public seed;

    function init() external {
        for (uint256 i = 0; i < 26; ++i) 
            seed[i] = (i + 1) * 0x1111;
    }

    function trigger() external returns (uint256 storedAt3) {
        a(3);
        storedAt3 = seed[3];
    }

    function a(uint256 m) internal {
        if (m == 0) return;
        b(m);
        c(m);
    }
    function b(uint256 m) internal {
        if (m == 0) return;
        a(m - 1);
    }
    function c(uint256 m) internal {
        if (m == 0) return;
        uint256 v1  = seed[0] ^ m;
        uint256 v2  = seed[1] ^ m;
        // ... v3 .. v24 ...
        uint256 v25 = seed[24] ^ m;

        b(m - 1);

        // Reads m back from its (relocated) memory slot.
        seed[m] = m;
        // Keep v1..v25 alive across the b(m - 1) call.
        seed[25] = v1 + v2 + /* ... */ + v25;
    }
}
```

This is the `a`/`b`/`c` graph from the trace above, so `c` is the function wrongly marked non-recursive. 
Because `c` keeps 25 values live while the call into `b(m - 1)` is being executed, we run out of addressable stack slots and `m` gets relocated to memory and overwritten by the recursive invocation of `c` from within `a` before `seed[m] = m` reads it back.

**Observed behavior:**

```solidity
C target = new C();
target.init();
assert(target.seed(3) == 0x4444);          // seed[3] initialized to 4 * 0x1111

uint256 result = target.trigger();          // a(3) should run seed[3] = 3
assert(result == 3);                         // value the source code asks for
// actual: result == 0x4444 - seed[3] was never correctly set to 3
```

With the bug, `trigger()` returns `0x4444` (the untouched initial value) instead of `3`, because the corrupted `m` caused `seed[m] = m` to operate on the wrong index and value.

## Severity Assessment

The compiler emits no warning, and the generated code does not revert at runtime. 
The corruption manifests as an unexpected result rather than a failure, which can make it difficult to diagnose. 
However, projects that run their test suite with `--via-ir` before deployment are likely to observe the incorrect behavior, even if the root cause may not be immediately obvious.

Unlike many past compiler bugs, this one can be triggered without inline assembly.

In practice the likelihood is very low. 
The narrow conditions listed under "Which Contracts Are Affected?" must all coincide, and the [Sourcify](https://sourcify.dev/) scan found no deployed contract that relocates variables inside a misclassified function.

## The Fix

The fix replaces the path-based depth-first search with a standard algorithm for finding strongly connected components: [Tarjan's algorithm](https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm).

A function is now classified as recursive if and only if:

- it belongs to a strongly connected component containing more than one function (mutual recursion of any cycle length), or
- it calls itself directly.

Tarjan's algorithm partitions the call graph into strongly connected components in a single pass and does not depend on traversal order, so it reliably determines for every function whether it is contained in a cycle. 
With the fix, all of `a`, `b`, and `c` in the example above are classified as recursive, and the mover leaves their variables on the stack.

### "Stack too deep" after the fix

Because the previous behavior was to (incorrectly) relocate variables of a recursive function, some contracts that compiled before the fix did so only by performing an unsound relocation. 
Once those variables are kept on the stack, the function may exceed the 16-slot access limit, and the compiler will now report a "Stack too deep" error.

This is the correct behavior: 
the recursion in question cannot be safely compiled by spilling to a fixed-size memory area. 
For the reproducer above, the expected result after the fix is a "Stack too deep" error. 
A contract that newly fails to compile after upgrading to 0.8.36 in this way was miscompiled before, and the fix reports the underlying problem instead of silently generating incorrect code.

## Recommended Actions

- Upgrade to Solidity 0.8.36 or later before deploying contracts compiled via IR, particularly if they use mutual recursion.
- If a previously-compiling contract now reports "Stack too deep" after the upgrade, the recursive function involved was being miscompiled.

## Acknowledgements

This bug was found and fixed internally by the Solidity team in the course of ongoing work on the IR pipeline's stack handling.
