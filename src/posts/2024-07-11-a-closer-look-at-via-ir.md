---
title: 'A Closer Look at Via-IR'
date: '2024-07-11'
author: Solidity Team
category: Releases
---

In its current default settings, the Solidity compiler does not transform the code into any intermediate representation (IR) for generating EVM bytecode but does it in a direct fashion. There is, however, the more recently developed via-IR compilation pipeline , which employs the Yul programming language as an intermediate representation.

On a high level, the compilation steps of the two pipelines look like the following:

![compilation-pipelines](/img/2024/compilation-pipelines.png)

In this blog post, we will be taking a closer look at the details of via-IR, understand each of the above compilation steps better, and discuss the plans for making via-IR default.

## A quick refresher

Let’s first break down what via-IR stands for.

**Via:** through or by means of
**IR:** Intermediate Representation (Yul or Inline assembly in Solidity)

It is a new compilation pipeline in Solidity that introduces an intermediate step by first translating the Solidity code into an intermediate representation (Yul) instead of directly compiling Solidity code into EVM bytecode.
This intermediate code can then be further optimized before being converted into final EVM bytecode.

The IR-based pipeline was introduced with the aim to not only allow code generation to be more transparent and auditable but also to enable more powerful optimization passes that span across functions and complex control flows.

## Motivation & characteristics

Before we dive into how via-IR works, it may be useful to understand the motivation behind developing Yul and the resultant IR pipeline.

As briefly introduced above, the goal of an intermediate representation language is to generate code that lies somewhere between the source code and the target machine code. This code is supposed to be more conducive for further processing and optimisations before it is finally ready for bytecode generation from assembly.
The concept of an intermediate representation is rather common in various language compilers such as Java bytecode for Java and LLVM IR for Clang (a compiler for C++). 

Yul (previously also called JULIA or IULIA) is an intermediate language that was developed as an IR for various backends.
The compiler uses Yul as an intermediate language in the via-IR code generator.

Yul was designed with the following goals in mind:
* To enable simpler and more regular code generation for Solidity
* To maintain the readability of code produced by the IR code generator
* To enable more efficient manual inspection, formal verification and optimization of the code.
* To make the Yul to EVM transformation as straightforward as possible.
* To be suitable for whole-program and high-level optimizations.
* To serve as a backend for various compilers, for instance, for [Fe](https://fe-lang.org/).

To conclude, the core motivation of designing an IR for the Solidity compiler is to generate a more optimized bytecode and reduce gas costs as well as enable better security audits.

Let’s look at some important characteristics of both Yul as an IR and the new via-IR pipeline:
* The Yul optimizer operates across arbitrary control flows and does not only perform optimizations within basic control flow blocks such as branches and loops. In certain cases, Yul can also retain knowledge about memory/storage over complex control flows.
* Yul provides more opportunities for inlining. This method allows to improve the runtime performance of a compiled language by replacing the function call with the machine code of the function itself, thus eliminating the function call overhead.
* Yul is an IR that targets multiple backends, initially EVM and EWASM. Currently, it additionally serves as the IR for the legacy EVM and [Ethereum Object Format (EOF)](https://evmobjectformat.org/) upgrade.
* The ease of complex adjustments for various layer 2 extensions makes the via-IR code generator more flexible.
* And last but not least, as mentioned in the design motivations, Yul is designed to be human-readable. Both unoptimized and optimized Yul output can be considered a lower-level target for better auditing and verification.

## Deep dive into via-IR

### Legacy Compilation

It helps to understand how the default compilation works without via-IR.

The default compilation pipeline for Solidity source code currently consists of the following steps:
1. The compiler takes each Solidity smart contract source code as input and parses the source files.
2. The compiler then analyzes the source code and generates the EVM assembly directly using the legacy codegen.
3. It then runs the optimizer on the code until the code is considered sufficiently optimized.
4. Finally, the compiler generates bytecode for each contract.

### Compilation via IR

In order to enable the via-IR pipeline for compilation, you can turn it on the command-line using ``--via-ir``  or with the option ``{"viaIR": true}`` in standard-json.

The compilation via intermediate representation (Yul) happens in the following steps:
1. The compiler parses the Solidity source files.
2. Instead of compiling Solidity source code directly to EVM assembly, the new IR code generator will first transform the Solidity code into Yul code.
3. The Yul optimizer will repeatedly perform optimizations on the Yul code.
4. The optimized Yul code is then transformed into EVM assembly using Yul→evmasm code transform.
5. This code is very close to the actual bytecode, but is still suitable for further optimizations by the evmasm optimizer. Hence, the default optimizer is run as in the legacy pipeline steps until the code is sufficiently optimized.
6. Finally, the EVM bytecode is generated as in the legacy pipeline.

### Challenges and considerations

While there are a lot of advantages to choosing an IR, it does not come without its own set of problems. One of the main challenges of via-IR are longer compilation times as a result of the extra optimization steps that are run on the Yul code.

Additionally, the via-IR code generation unconditionally generates code for every expression without codegen shortcuts.
Although, it is considered to be less error-prone than the Solidity source files, this also makes the unoptimized IR code more verbose and inefficient. The Yul optimizer which comprises individual, easy-to-verify, and modular steps can be used to compensate for this.
The Yul optimizer can be enabled using ``--via-ir --optimize`` on the command line and ``viaIR: true, optimize: {enabled: true}`` using the standard JSON interface.

Apart from this, there are also some important semantic changes. You can read more about these changes in [official Solidity docs](https://docs.soliditylang.org/en/v0.8.26/ir-breaking-changes.html#semantic-only-changes).

## Making via-IR default

We shared our plan of making the new via-IR pipeline the default compilation pipeline for Solidity at the [Solidity Summit 2023]((https://www.youtube.com/watch?v=jX5VJ4wcJXM&list=PLX8x7Zj6VeznJuVkZtRyKwseJdrr4mNsE&index=18)). Making via-IR default would make the current default pipeline the legacy pipeline.

via-IR is thoroughly tested and is considered to be at par in terms of security with the legacy compilation pipeline.
The IR pipeline is good at running optimizations and eliminating stack too deep errors in most cases.
It also generates better gas-optimized code than the default pipeline. Further optimizations are possible after stabilizing the performance. This can make the resultant EVM code more gas-efficient in the longer term.

In order to make via-IR the default, we are dedicated to reducing the compilation time while keeping the optimization quality high, i.e., achieving low gas costs, and removing additional cases of stack-too-deep errors by making the transformation from Yul to EVM code more efficient.

The original plan was to make via-IR the default pipeline in June 2024.
However, we believe that it makes most sense to tie the via-IR-default update to the EOF upgrade for two main reasons:
1. The unlimited swaps and dups in EOF make the Yul to EVM transformation significantly simpler and more efficient. This will help us in removing additional cases of stack-too-deep errors.
2. Since both the via-IR and the EOF upgrade involve minor semantic changes, the update will require it to be a breaking change. Combining the release of both features will help us reduce the effort and upgrade burden for Solidity developers.

## What’s next?

The long-term aim for the via-IR pipeline is to allow moving from a less flexible underlying model to a standard library in the next iteration of Solidity and make the new compilation pipeline including the optimiser as future-proof and efficient as possible. This would enable the compiler to graciously encompass the rapid changes in the language requirements and EVM architecture.

Stay tuned for more updates regarding via-IR by [following us on Twitter](https://x.com/solidity_lang) and participating in the community discussions on the official [Solidity forum](https://forum.soliditylang.org/).
