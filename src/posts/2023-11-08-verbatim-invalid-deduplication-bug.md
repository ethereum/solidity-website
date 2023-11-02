---
layout: post
published: true
title: 'Bug in Deduplication of Verbatim Blocks'
date: '2023-11-08'
author: Solidity Team
category: Security Alerts
---

On October 24, Ori Pomerantz [reported a bug](https://github.com/ethereum/solidity/issues/14640) affecting the use of [`verbatim`
builtin](https://docs.soliditylang.org/en/v0.8.23/yul.html#verbatim) in Yul code. After investigating, the team was able to confirm the problem
and locate its origin.
The bug existed in the Block Deduplicator optimizer step, wherein equivalent
assembly blocks are identified and merged.
`verbatim` assembly items surrounded by identical opcodes were incorrectly considered identical
and unified.

The bug existed since version `0.8.5`, which introduced `verbatim`, and only affected pure Yul
compilation with optimization enabled.
Solidity code or Yul used in inline assembly blocks would not trigger it.

The use of `verbatim` is uncommon and the conditions which trigger
the bug (two or more `verbatim` items surrounded by identical opcodes) are very specific.
Also, to the extent of the investigations made by the team, there is no evidence
that this could be used as an exploit or attack vector.
While, if present, the impact of the bug is severe, its likelihood is very low.
Considering that, the team assigned the bug an overall score of `low`.

## Which Contracts Are Affected?

The conditions under which the bug might be triggered are as follows:

1. Compilation of pure Yul code.
1. Multiple calls to `verbatim` builtins with different data.
1. Block Deduplicator optimizer step being in use.

Note that the Block Deduplicator is enabled by default when the optimizer is enabled.

If your project does not include contracts written purely in Yul or does not use ``verbatim``,
then there is no risk of it being impacted.

## Technical Details

Yul code that uses `verbatim` such as the following example is prone to the bug:

`verbatim.yul`
```yul
{
    let special := 0xFFFFFFFFFFFF
    let input := sload(0)
    let output

    switch input
    case 0x00 {
        output := verbatim_1i_1o(hex"506000", special)
    }
    case 0x01 {
        output := 1
    }
    case 0x02 {
        output := verbatim_1i_1o(hex"506002", special)
    }
    case 0x03 {
        output := 3
    }

    sstore(0, output)
}
```

In this case, the block deduplicator incorrectly considered that the blocks
of cases `0x00` and `0x02` are identical and thus could be merged into a single one.

The deduplication step is part of the [opcode-based optimizer](https://docs.soliditylang.org/en/v0.8.23/internals/optimizer.html#opcode-based-optimizer-module)
which operates on assembly code. It splits the sequence of instructions into
blocks usually separated by `JUMPS` and `JUMPDEST`s. The blocks are analyzed
and a series of optimization steps are performed.
During the deduplication step, the optimizer maps which tags can be replaced by one
another, because they refer to blocks of identical sequences of opcodes. The blocks
are considered identical if both have the same opcodes in the same order.

The block deduplicator identifies blocks of assembly opcodes which are
sequentially executed until reaching an opcode capable of
altering the control flow, such as  `JUMP`, `RETURN` or `REVERT`.
The optimizer then checks if there are two blocks formed by identical
sequences of assembly opcodes. In case such blocks exist, the
optimizer replaces the label referring to one block by the label of the
other, which means that later one block will be unused and can then be erased.

The bug manifested when checking two blocks for equality. The comparison for `verbatim` assembly items incorrectly considers all such items to be identical regardless of their data. So if `verbatim` instructions with different data appeared in blocks that are otherwise fully identical, they got deduplicated despite the difference in the `verbatim` data.

For example, when the Yul code snippet shown before is compiled **without**
optimizations, it will include the assembly code fragment shown below:

```bash
solc --strict-assembly verbatim.yul --asm
```

```
tag_2:
  dup4
  verbatimbytecode_506000
  swap2
  pop
  jump(tag_1)
tag_3:
  0x01
  swap2
  pop
  jump(tag_1)
tag_4:
  dup4
  verbatimbytecode_506002
  swap2
  pop
  jump(tag_1)
```

Notice that the blocks referred to by `tag_2` and `tag_4` are almost identical.
As a result of the bug, the deduplication step of the optimizer would consider the `verbatim` items as equal despite their different contents. The optimizer would then _incorrectly_ map `tag_4`
as a replacement for `tag_2` which would further cause the
block referred to by `tag_2` to be erased later.

The result of the bug can be
seen in the output of the optimized code below:


```bash
solc --strict-assembly verbatim.yul --asm --optimize
```

```
  0x00
  dup1
  sload
  dup1
  iszero
  tag_5
  jumpi
  dup1
  0x01
  eq
  tag_3
  jumpi
  dup1
  0x02
  eq
  tag_5
  jumpi
  0x03
  eq
  tag_7
  jumpi
  0x00
  sstore
  stop
tag_7:
  pop
  0x03
  0x00
  sstore
  stop
tag_5:
  pop
  pop
  0xaabbccddeeff
  verbatimbytecode_506002
  0x00
  sstore
  stop
tag_3:
  pop
  pop
  0x01
  0x00
  sstore
  stop
```

Note the two jumps to the block starting at `tag_5`. The block replaced both instances of the `verbatimbytecode` item, despite their content being different.
