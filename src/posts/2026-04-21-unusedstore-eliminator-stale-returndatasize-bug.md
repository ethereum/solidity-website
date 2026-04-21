---
layout: post
published: true
title: 'UnusedStoreEliminator Stale Return Data Size Bug'
date: '2026-04-21'
author: Solidity Team
category: Security Alerts
---

On January 17, 2026, a bug in the Yul optimizer was reported by **Carl Andersen** from [Spearbit](https://spearbit.com). The bug could cause `returndatacopy` operations to be incorrectly removed. It has been assigned identifier **SOL-2026-2** and name **UnusedStoreEliminatorStaleReturnDataSize**.

The bug is fixed in Solidity **0.8.35**.

## Summary

The Yul optimizer's `UnusedStoreEliminator` pass could incorrectly remove `returndatacopy(...)` operations when the length argument was supplied from a `returndatasize()` value that had become stale due to an intervening call opcode. Because `returndatacopy` reverts on out-of-bounds access, removing it in this case silently suppresses a revert that should have occurred, allowing execution to continue past a point where it should have stopped.

The bug only affects **handwritten Yul or inline assembly** code. High-level Solidity code was never affected. The severity is rated **very low**.

## Technical Background

The `UnusedStoreEliminator` is an optimizer step in the Yul pipeline that removes write operations (to memory or storage) whose results are provably never read. Eligible operations include `mstore`, `mstore8`, `codecopy`, `calldatacopy`, `extcodecopy`, and — since version 0.8.13 — `returndatacopy`.

The `returndatacopy` instruction is special among memory-copying opcodes: unlike `calldatacopy` or `codecopy`, it **reverts** when accessing bytes beyond the bounds of the return data buffer. Since reverts are a side effect the optimizer must preserve, a `returndatacopy` can only be removed when it is certain that it will never access out-of-bounds memory.

The only pattern where this can be guaranteed statically is `returndatacopy(0, 0, returndatasize())` — copying the entire return data buffer from the beginning. This is also the exact pattern emitted by the Solidity code generator for handling return data from external calls. Starting in 0.8.13, the optimizer was special-cased to recognize and remove only this pattern.

## The Bug

The special-case check introduced in 0.8.13 was incomplete. It correctly identified calls of the form:

```yul
let s := returndatasize()
returndatacopy(0, 0, s)
```

as equivalent to `returndatacopy(0, 0, returndatasize())` and allowed them to be removed. However, it **did not account for the possibility that the variable `s` could become stale**. The return data buffer — and therefore the valid range for `returndatasize()` — is reset by any of the following opcodes: `call`, `staticcall`, `delegatecall`, and `callcode`. If any such opcode appears between the assignment of `s` and the `returndatacopy`, the stored size no longer reflects the current return buffer, and the check is no longer sound.

Consider the following Yul snippet:

```yul
{
    let s := returndatasize()   // capture size before first call
    pop(call(gas(), addr, 0, 0, 0, 0, 0))  // this resets the return data buffer!
    returndatacopy(0, 0, s)    // s is now stale — buffer may be smaller
}
```

Before the fix, the optimizer would recognize the `returndatacopy(0, 0, s)` pattern — `s` is a variable holding a `returndatasize()` value and the start offset is zero — and allow the entire `returndatacopy` to be removed as if it were safe. In reality, since the `call` in between may have changed the return data buffer to a size smaller than `s`, the `returndatacopy` would revert with an out-of-bounds access. Removing it suppresses that revert, allowing execution to continue incorrectly.

The analogous inline assembly pattern in Solidity is:

```solidity
contract C {
    function f(address addr) external {
        assembly {
            let s := returndatasize()
            pop(call(gas(), addr, 0, 0, 0, 0, 0))
            // Bug: this returndatacopy was incorrectly removed by the optimizer
            returndatacopy(0, 0, s)
        }
    }
}
```

## Impact

**Affected versions:** 0.8.13 – 0.8.34

**Required conditions for the bug to trigger:**
- The Yul optimizer must be enabled (this is the default in production compilations with `--optimize`).
- The EVM version must be at least Byzantium (the first version to introduce `returndatacopy` and `returndatasize`).
- The affected code pattern must appear in **inline assembly or handwritten Yul**. The Solidity code generator itself never produces code interleaving multiple external calls with access to a previous call's return data, so high-level Solidity code is not affected.
- The memory region written by `returndatacopy` must **not be read afterward**. The `UnusedStoreEliminator` only removes a write operation when it can prove the written memory is never subsequently read. If any later instruction reads from the same memory region, the store is kept regardless of the pattern match.

**Effect:** A `returndatacopy` that would have reverted due to an out-of-bounds access is silently removed, causing execution to continue when it should have stopped. The memory region targeted by the copy is never written; the program proceeds with stale memory contents and no revert occurs. The practical impact depends on how that memory is used afterward, but given the specific conditions required to trigger the bug, real-world impact is expected to be minimal.

The severity is rated **very low** because the pattern that triggers it only arises in manually written assembly and is highly unlikely to appear in typical production code.

## Workaround

If you are using a version between 0.8.13 and 0.8.34 and your code uses `returndatacopy` in inline assembly or Yul following an external call, avoid storing the result of `returndatasize()` in a variable before the call and using it as the length argument afterward. Instead, call `returndatasize()` fresh at the point of `returndatacopy`:

```solidity
// Safe: always reads the current return data size
assembly {
    pop(call(gas(), addr, 0, 0, 0, 0, 0))
    returndatacopy(0, 0, returndatasize())
}
```

## The Fix

The fix, implemented in [PR #16508](https://github.com/argotorg/solidity/pull/16508), takes the conservative approach of **removing the `returndatacopy` optimization entirely** from the `UnusedStoreEliminator`. The `RETURNDATACOPY` instruction is now unconditionally blacklisted from removal alongside `MCOPY`.

An alternative fix ([PR #16436](https://github.com/argotorg/solidity/pull/16436)) was considered that would have tracked `returndatasize()` values and invalidated them whenever an intervening call opcode was encountered. This approach would have preserved the optimization for the safe case but was ultimately rejected because the optimization has minimal practical impact on generated code size or performance, while the additional tracking logic made the `UnusedStoreEliminator` implementation more complicated and fragile.

The relevant change in `UnusedStoreEliminator.cpp` is:

```cpp
// Before (0.8.13–0.8.34): RETURNDATACOPY was a candidate for removal
// with a special-case check for the (0, 0, returndatasize()) pattern.

// After (0.8.35): RETURNDATACOPY is blacklisted unconditionally.
bool const isBlacklisted =
    *instruction == Instruction::MCOPY ||
    *instruction == Instruction::RETURNDATACOPY;
bool const isCandidateForRemoval =
    !isBlacklisted &&
    SemanticInformation::otherState(*instruction) != SemanticInformation::Write && (
        SemanticInformation::storage(*instruction) == SemanticInformation::Write ||
        (!m_ignoreMemory && SemanticInformation::memory(*instruction) == SemanticInformation::Write)
    );
```

## Timeline

| Date | Event |
|------|-------|
| 2022-05-17 | Optimization first introduced in 0.8.13 (partial fix for out-of-bounds revert preservation) |
| 2026-01-17 | Bug reported by Carl Andersen from Spearbit |
| 2026-04-17 | Fix committed in PR #16508 |
| 2026-XX-XX | Fixed in Solidity 0.8.35 |

## Credits

The bug was reported by **Carl Andersen** from [Spearbit](https://spearbit.com). The fix was implemented by the Solidity compiler team. Special thanks to the reviewers on PR #16508 for the discussion that led to the simpler and safer removal-based approach.

---

*If you believe you have found a security-relevant bug in the Solidity compiler, please follow the [responsible disclosure process](https://github.com/ethereum/solidity/blob/develop/SECURITY.md).*
