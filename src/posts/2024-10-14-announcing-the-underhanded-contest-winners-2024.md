---
layout: post
published: true
title: 'Announcing the Winners of the Underhanded Solidity Contest 2022'
date: '2024-10-14'
author: Vishwa Mehta & USC Judges
category: Announcements
---

If you have been waiting for the results of the [Underhanded Solidity Contest 2024](https://underhanded.soliditylang.org/), the countdown is over!

But before we share our insights from this year and declare the results, let's recap the most important aspects of the USC:

In essence, the Underhanded Solidity Contest is about writing seemingly innocent code that has malicious mechanisms or hidden backdoors. It is aimed at:

* Raising awareness about smart contract security
* Uncovering language design faults
* Battle-testing newly introduced language features and restrictions
* Highlighting anti-patterns in smart contact development
* Establishing new best practices for secure smart contract development.

Each year, the contest has a unique theme or challenge. The challenge for USC 2024 was to develop smart contracts that leverage the recently introduced transient storage ([EIP-1153](https://eips.ethereum.org/EIPS/eip-1153)).

In total, we received 8 submissions, out of which, 4 qualified as valid submissions that are up for winning. You can find all 4 qualified submissions in [this repository](https://github.com/ethereum/solidity-underhanded-contest/tree/master/2024/submissions_2024). A huge kudos to all participants for participating this year!

As every year, the judges were presented with anonymized submissions during the evaluation process and the identities of the participants were disclosed only after the judging process was concluded.

However, the USC 2024 announcement is a bit different than the previous years: After the evaluation process, which was followed by a discussion with all our judges, we came to the conclusion to only declare one winner this year.

USC’s primary aim is to uncover interesting anti-patterns from the submissions The aim of this year’s theme was for participants to leverage transient storage to implement malicious mechanisms or hidden vulnerabilities in their code. Very few of the submissions contained a bug that arose as a result of using transient storage. This left the judges with few high-quality submissions to choose from.

It seemed only fair to give away a single prize this year to the only submission that came close to our judges’ expectations.

With that being said, let’s look at the winning submission and our takeaways from this year.

## Underhanded Solidity Contest 2024 Winner 🥇: [Gerard Persoon](https://github.com/ethereum/solidity-underhanded-contest/tree/master/2024/submissions_2024/submission4_Gerard_Persoon)
*commentary by [Hari Mulackal](https://twitter.com/_hrkrshnn)*

In recent years, the number of Layer-2 blockchains and other L1s has exploded. This has led to subtle yet important differences in the execution environment (EVM) than the Ethereum mainnet. One such difference is in the EVM version, specifically, which EVM changes are included in the chain. Here are some examples of such differences:
Chains that take longer to support the newest mainnet-EVM updates, for example several L2s didn’t support push0 for a long time, despite it being a trivial instruction to implement.
Chains that proactively add upcoming changes to the mainnet-EVM
Chains that cannot support specific instructions or precompiles due to technical limitations, such as traditional hashing algorithms, are hard to implement in zkEVMs.

Writing Solidity code that works across multiple chains while using specific EVM features is challenging. The submission highlighted one such challenge in transient storage. 

Imagine writing a smart contract designed to be deployable across chains regardless of whether it supports transient storage. In such cases, one may be tempted to use storage instead of transient storage, because storage is generally cheaper for L2s than mainnet. The submission highlights a simple but plausible bug when storage is used as a backup for transient storage.

## 💐 Honorary Mention: [William Bowling](https://github.com/ethereum/solidity-underhanded-contest/tree/master/2024/submissions_2024/submission3_William_Bowling)
*commentary by [Patrick Collins](https://x.com/PatrickAlphaC)*

Oftentimes you’ll read code and say “the architectural choices made here are completely bizarre and senseless”. Sometimes, it’s because the developers are doing something truly unique, and you learn something niche about the language or the platform.

However, more often than not, it’s because the architectural choices made are completely bizarre and senseless. The hard part however, is knowing when it’s a clever optimization and when it's a bizarre choice. 

As smart contract developers and security researchers, bizarre choices are usually the first clue to a bug being hidden in the code. This submission highlights an example where a novice security researcher could be fooled into thinking the codebase is a clever optimization, when in fact, it has a nasty bug hidden inside. The submission makes use of a documented, but relatively unknown, [bug](https://github.com/ethereum/solidity/issues/14021) that will surprise a number of security professionals that this bug even exists in Solidity.

It doesn’t use `TSTORE` at the heart of the bug, but it’s a fun submission in any case!

## Our Takeaways

*commentary by [Anton Permenev](https://twitter.com/a_permenev)*

The goal of Underhanded Solidity Contest is to make "hidden in plain sight" vulnerabilities more known to the community.

The 2024 edition had transient storage as a requirement, though it was not central to many of the submissions.

Submissions had to rely on inline assembly and this created an extra barrier for the contestants.
I believe, with support for transient storage codegen and more real-world projects utilizing this feature, the challenge could be repeated again with greater success.

*commentary by [Goncalo Magalhaes](https://x.com/realgmhacker)*

After reviewing this year's contest submissions, it appears we can draw several conclusions, particularly since no one encountered any significant issues. First, transient storage remains largely unknown and unused by the broader developer community, likely due to its exclusive use in assembly. Second, its restricted access through low-level code seems to minimize opportunities for tampering with its expected behavior. While some submissions hinted at potential risks or pitfalls, none successfully identified any concrete problems with transient storage.

*commentary by [Gonçalo Sá](https://twitter.com/GNSPS)*

Since the developer ecosystem is clearly growing around all the EVM-compatible chains, the low number of submissions for USC this year is a testament to the maturity and stability of the Solidity compiler.
It is good to see Solidity and the ecosystem as a whole closing the gaps from an extremely nascent dev tooling landscape and transforming into a way more secure version of itself. 🚀

*commentary by [Hadrien Croubois](https://x.com/amxx)*

When asked to judge the Underhanded Solidity Context, I expected clean, seemingly harmless pieces of code that hide a subtle yet nasty bug that would be challenging to find. I expected great findings would emerge from this contest and shine some light on the quirks of transient storage (and the EVM).

This 2024 edition was disappointing, to say the least. There were very few, low-quality, contributions. Is transient storage inherently safe, or did the developer censor themselves?

## Big Thanks!

We would like to take a moment to thank all our lovely judges for taking the time to encourage participation, support the contest and its vision, and evaluate the submissions. 👏

The USC would not be what it is without their help! Big appreciation for our judges:

* [aleph_v](https://x.com/alpeh_v) - Independent Security Researcher
* [Anton Permenev](https://twitter.com/a_permenev) - Senior Engineer at ChainSecurity
* [Goncalo Magalhaes](https://x.com/realgmhacker) - Head of Security at Immunefi
* [Gonçalo Sá](https://twitter.com/GNSPS) - Co-founder, ConsenSys Diligence & Creed
* [Hadrien Croubois](https://x.com/amxx) - Smart Contract Engineer at OpenZeppelin
* [Harikrishnan Mulackal](https://x.com/_hrkrshnn) - Co-founder, Spearbit
* [Patrick Collins](https://x.com/PatrickAlphaC) - Co-founder, Cyfrin Audits
* [samczsun](https://twitter.com/samczsun) - Research Partner at Paradigm

## Trick us at the next Underhanded Solidity Contest, anon!

Although not a typical outcome for our Underhanded Solidity Contest, we hope that we can see more participation and higher quality submissions come out of the future editions again. These are pivotal in helping the Solidity team draw useful insights to support important language design decisions.

We would love to continue finding interesting anti-patterns and ways to embed malicious exploits into smart contract systems in order to battletest the language and help the ecosystem build more resilient systems. We can't wait to see what you come up with next time!

If you’re interested in proposing a topic for the next Underhanded Solidity Contest, providing feedback, or helping with judging the next time, feel free to reach out to us at sol_underhanded@ethereum.org.

*We will be in touch with all participants and winners shortly with details on how to claim their prizes/tokens of appreciation.*
