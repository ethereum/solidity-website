---
layout: post
published: false
title: 'Underhanded Solidity Contest 2024'
date: '2024-07-31'
author: Vishwa Mehta
category: Announcements
---

The [Underhanded Solidity Contest](https://underhanded.soliditylang.org/) is back with a bang in 2024!

After two successful seasons of the contest in [2020](https://underhanded.soliditylang.org/2020) and [2022](https://underhanded.soliditylang.org/2022/) inspired by the first edition in [2017](https://weka.medium.com/announcing-the-winners-of-the-first-underhanded-solidity-coding-contest-282563a87079), we’re back with an exciting challenge for this year.

Before we dive into the 2024 theme, let's do a quick refresher on what the Underhanded Solidity Contest is.

The Underhanded Solidity Contest is about writing seemingly innocent code that has malicious mechanisms or hidden backdoors. Through this contest, we aim to:

- Raise awareness about smart contract security
- Uncover language design faults
- Battle-test recently introduced language features and restrictions
- Highlight anti-patterns in smart contact development
- Establish new best practices for secure smart contract development

With that said, let's dive head first into this year’s contest info, coding brief, deadlines, judges, prizes and more!

## Theme: Transient Storage 💾

Based on this year’s theme, the participants are tasked with the challenge to develop smart contracts that leverage transient storage ([EIP-1153](https://eips.ethereum.org/EIPS/eip-1153)), i.e. the `TSTORE` and `TLOAD` opcodes.

Transient storage is as cheap as warm storage access with both reads and writes priced at 100 gas. It is well-suited for use-cases such as cheap re-entrancy locks.

The aim of USC 2024 is to showcase a transient storage use-case in a way that looks legitimate but contains a hidden vulnerability or manipulation mechanism in the implementation that is exposed because of transient Storage.

*Note:* The compiler does not yet allow using transient as a data location in high-level Solidity code. For the time being, data stored in this location can only be accessed using the `TSTORE` and `TLOAD` opcodes in inline assembly.

## The Judges ⚖️

Like every year, judges will be presented with anonymised submissions. This year, the submissions will be assessed by:

* [Anton Permenev](https://twitter.com/a_permenev), Senior Engineer at ChainSecurity
* [Goncalo Magalhaes](https://x.com/realgmhacker) - Head of Security at Immunefi
* [Gonçalo Sá](https://twitter.com/GNSPS), Co-founder, ConsenSys Diligence & Creed
* [Hadrien Croubois](https://x.com/amxx) - Smart Contract Engineer at OpenZeppelin
* [Harikrishnan Mulackal](https://x.com/_hrkrshnn) - Co-founder, Spearbit
* [Patrick Collins](https://x.com/PatrickAlphaC) - Co-founder, Cyfrin Audits
* [samczsun](https://twitter.com/samczsun) - Research Partner at Paradigm
* [aleph_v](https://x.com/alpeh_v) - Independent Security Researcher

### Judging Criteria ☑️

Our judges award scores to the submissions that especially shine in the following aspects of the contest:

- **Simplicity & Conciseness**: Since it's much easier to hide a vulnerability in complex and poorly written code, short and clean submissions will be scored higher than those that are lengthy and complicated.
- **Plausibility**: Code that contains backdoors without any clear reason why will look immediately suspicious, no matter how cleverly written the flaw is. Consider using creative yet realistic scenarios.
- **Originality**: We value uniqueness and originality. Truly original ideas will receive more points than making use of already well known vulnerabilities.

## The Prizes 🏆

As a token of appreciation for the hard work and creativity that goes into the submissions, we have prepared a few prizes for the winners and participants:
The first place will receive a ticket to [Devcon SEA 2024](https://devcon.org/en/).
The top 3 submissions will receive a ticket to the next Solidity Summit (date & location TBA).
Furthermore, the three winners will be added to the Board of Fame.
The winners and all qualified submissions receive a custom USC 2024 t-shirt.

## The Submission 📨

Before submitting your code ensure that:

- The entirety of your submission is licensed under an open-source license.
- In your submission you use Solidity v0.8.24 or newer.
- You have carefully read the [Coding Brief](https://underhanded.soliditylang.org/#coding-brief).

Please email your submissions before the deadline [2024-08-31, 11:59PM UTC] to `sol_underhanded@ethereum.org`. Entries should consist of a ZIP file containing a README describing your submission and how it works, a separate file for spoilers, and one or more Solidity files.

Each person can only enter one submission. If you want to make a team submission, nominate a single person to submit on your team's behalf. Since entries will be forwarded to the judges and assessed anonymously, please do not include identifying information in the ZIP file.

## Contest Timeline ⏳

- Submissions open: 2024-07-31
- Submissions close: 2024-08-31

Winners will be announced in time before [Devcon South-east Asia 2024](https://devcon.org/en/).

## The Board of Fame ⭐

We maintain a [Board of Fame](https://underhanded.soliditylang.org/#board-of-fame) in order to honor all our winners of previous Underhanded Solidity Contests. Consider checking out previous submissions (especially the top 3) for inspiration and submission best practices.

## The Supporters 💖

Last but not least, we'd like to extend our thanks to all the judges for their support in organizing this contest!

Should you have any questions or encounter problems please feel free to reach out to us via `sol_underhanded@ethereum.org` or join the Solidity [Matrix](https://matrix.to/#/#ethereum_solidity:gitter.im) / [Gitter](https://gitter.im/ethereum/solidity) channel.
