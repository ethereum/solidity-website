---
layout: post
published: true
title: 'Solidity Developer Survey 2025 Results'
date: '2026-04-15'
author: 'Solidity Team'
category: 'Announcements'
---

The Solidity Developer Survey 2025, our sixth annual survey, collected 1,095 responses from developers across 87 countries. Thank you to everyone who participated. This post covers the key findings. For the complete data, see the [interactive results page](/survey-2025/).

## Who responded

![Where do you live?](/img/2026/survey/countries_map.png)

70% of respondents are smart contract developers. 12% are auditors or security experts. 18% identified as students. Half of all respondents have two years or less of Solidity experience, and 49% use Solidity daily.

The top three countries are India (205), Nigeria (148), and the United States (83). 74% of respondents are between 18 and 34 years old.

## Tooling

Foundry is the most used primary framework at 57%, up from 51% in 2024. Hardhat accounts for 33% combined (v3 at 18%, v2 at 15%). Truffle dropped from 2.4% in 2024 to a single remaining user. Remix is the most used secondary framework at 41%.

ethers.js is the most used Ethereum SDK (70%), followed by viem (39%) and wagmi (33%).

![Primary development framework](/img/2026/survey/primary_framework.png)

## Pain points

Stack-too-deep errors are the most reported recurring issue (47%), followed by bytecode size limits (33%) and debugging (33%). 23% of respondents report no recurring issues.

These issues correlate with experience level. Stack-too-deep is reported by 25% of beginners (self-rated 1-4) compared to 65% of experts (self-rated 8-10). Bytecode size limits follow a similar pattern at 17% vs 47%. Debugging is consistent across all levels at 29-35%.

![Recurring issues by expertise level](/img/2026/survey/expertise_vs_pain_points.png)

The most requested near-term feature is better gas optimizations (44%), followed by EIP-712 typehash support (29%) and reference types in transient storage (23%).

## AI adoption

88% use AI tools at least monthly, 58% daily. But 45% express distrust in the output. Developers are adopting AI faster than they are learning to trust it.

![Do you use AI tools?](/img/2026/survey/ai_usage.png)

The most common AI use cases are testing (61%), documenting code (59%), and learning about codebases (58%). Writing code (49%) and reviewing code (49%) are lower.

49% somewhat trust AI output, 30% somewhat distrust it, 15% highly distrust it, and only 6% highly trust it. Among daily AI users specifically, 36% express distrust.

![How much do you trust AI-generated code?](/img/2026/survey/ai_trust.png)

## Core Solidity

Only 30% of respondents who answered this question are familiar with Core Solidity. If you're new to it, [The Road to Core Solidity](/blog/2025/10/21/the-road-to-core-solidity/) provides an introduction, and the [Core Solidity Deep Dive](/blog/2025/11/14/core-solidity-deep-dive/) goes into the technical details.

![Are you familiar with Core Solidity?](/img/2026/survey/core_solidity_familiar.png)

Among those who are, the most selected features are better error handling / try-catch replacement (43%) and better delegatecall / library replacement (41%).

63% say removing inheritance would cause challenges for their projects. 44% estimate rewriting their codebase to use type classes or traits would be somewhat difficult, 21% very difficult.

In free-text responses, 21% are supportive, 23% are cautious, and 21% express concern about language fragmentation.

## Year-over-year changes

Compared to the 2024 survey (684 responses):

- Foundry usage increased from 51% to 57%
- Sourcify usage grew from 17% to 24%, and awareness improved (48% don't know about it, down from 56%)
- IR pipeline awareness improved: 35% don't know what it is, down from 46%
- DevEx sentiment improved: 73% report improvement, up from 67% in 2024

Recurring issue percentages decreased across the board (stack-too-deep from 68% to 47%, debugging from 55% to 33%), though the question format changed between years (single multi-select field in 2024 vs separate checkboxes in 2025), which may account for some of the difference.

## Key takeaways

**Stack-too-deep and bytecode size limits hit experienced developers hardest.** 65% of experts report stack-too-deep vs 25% of beginners. Bytecode size follows the same pattern at 47% vs 17%. These aren't beginner complaints - they're the ceiling that experienced developers hit when their codebases grow.

**The optimizer forces developers to write worse code.** Free-text responses consistently describe how gas optimization incentivizes bad patterns: inlining instead of abstracting, reusing variables instead of naming them clearly, recalculating values instead of storing them. The language pushes developers away from clean code.

**Developers adopt AI faster than they trust it.** 88% use AI tools at least monthly, but 36% of daily users express distrust in the output. For a language securing billions in value, the gap between adoption and trust in AI-generated code is worth paying attention to.

**Core Solidity has a visibility and communication problem.** 70% of respondents who answered this question don't know what it is. Among those who do, feedback is genuinely split: support alongside real concerns about fragmentation, backward compatibility, and the language becoming too abstract. The conversation hasn't reached enough people yet.

**Debugging is universally painful regardless of experience or tooling.** It's the one pain point that doesn't improve with experience (29-35% across all levels). Foundry is at 57% and growing, but better frameworks haven't solved the debugging problem.

## What we're doing about it


**Stack-too-deep**: This remains the top pain point. The [v0.8.35-pre.1 pre-release](https://github.com/argotorg/solidity/releases/tag/v0.8.35-pre.1) introduces the SSA CFG codegen behind the new `--experimental` flag, which eliminates stack-too-deep errors. A stable release will follow.

**Core Solidity awareness**: Only 30% of respondents who answered this question are familiar with Core Solidity. We're ramping up communication: a blog post on pattern matching is coming next week, and a Core Solidity Playground will be available before the end of summer. We're also ramping up our presence at conferences, engagement with ecosystem players, and collaboration with the community to define the Standard Library for Core Solidity.

**Debugging**: Debugging was reported as painful across all experience levels. Work on [ethdebug](https://github.com/ethdebug/), a standard debugging data format for smart contracts on EVM-compatible networks, is actively in progress.

**Bytecode size limit**: The second most common pain point among experienced developers. There is an EIP in progress to increase the contract size limit.

**Documentation**: The survey responses helped prioritize what to focus on next in the docs. We plan to add more practical examples, particularly around proxies, storage layout, and gas optimization. Translating the documentation to more languages will also be a priority.

## Full results

The interactive report covers all 60 survey questions with charts, descriptions, and respondent quotes.

- [Interactive results with all 60 charts](/survey-2025/)
- [Download the raw data (CSV)](/data/solidity-survey-2025-results.csv)
- [2024 survey results](/blog/2025/04/25/solidity-developer-survey-2024-results/)
- [2023 survey results](/blog/2024/04/03/solidity-developer-survey-2023-results/)

Thank you to everyone who participated, and to the projects and community members who helped spread the word and increase the survey's reach. As a reminder, we put up a Devcon 8 ticket for a random draw among survey participants. The winner can expect an email from us soon. Please verify the sender address matches an @argot.org email.

If you have additional feedback, the best place to share it is the [Solidity Forum](https://forum.soliditylang.org/).
