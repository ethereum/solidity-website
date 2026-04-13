---
layout: post
published: true
title: 'Solidity Developer Survey 2025 Results'
date: '2026-04-15'
author: 'Solidity Team'
category: 'Announcements'
---

The Solidity Developer Survey 2025 collected 1,095 responses from developers across 87 countries. This post covers the key findings. For the complete data, see the [interactive results page](/survey-2025/).

## Who responded

70% of respondents are smart contract developers. 12% are auditors or security experts. 18% identified as students. Half of all respondents have two years or less of Solidity experience, and 49% use Solidity daily.

The top three countries are India (205), Nigeria (148), and the United States (83). 74% of respondents are between 18 and 34 years old.

## Tooling

Foundry is the most used primary framework at 57%, up from 51% in 2024. Hardhat accounts for 33% combined (v3 at 18%, v2 at 15%). Truffle, which was at 2.4% in 2024, no longer appears in the results. Remix is the most used secondary framework at 41%.

ethers.js is the most used Ethereum SDK (70%), followed by viem (39%) and wagmi (33%).

![Primary development framework](/img/2025/survey/primary_framework.png)

## Pain points

<!-- TODO: Link to SSA-CFG blog post / work that addresses stack-too-deep for users -->
Stack too deep errors are the most reported recurring issue (47%), followed by bytecode size limits (33%) and debugging (33%). 23% of respondents report no recurring issues.

These issues correlate with experience level. Stack too deep is reported by 25% of beginners (self-rated 1-4) compared to 65% of experts (self-rated 8-10). Bytecode size limits follow a similar pattern at 17% vs 47%. Debugging is consistent across all levels at 29-35%.

![Recurring issues by expertise level](/img/2025/survey/expertise_vs_pain_points.png)

The most requested near-term feature is better gas optimizations (44%), followed by EIP-712 typehash support (29%) and reference types in transient storage (23%).

## AI adoption

88% of respondents use AI tools at least monthly. 58% use them daily. 4% don't use AI and don't plan to.

However, trust in AI output is mixed. 49% somewhat trust it, 30% somewhat distrust it, and 15% highly distrust it. Among daily AI users specifically, 36% express distrust in the output.

The most common AI use cases are testing (61%), documenting code (59%), and learning about codebases (58%). Writing code (49%) and reviewing code (49%) are lower.

![Do you use AI tools?](/img/2025/survey/ai_usage.png)

## Core Solidity

<!-- TODO: Link to Core Solidity article/page - only 30% awareness, good opportunity to drive traffic -->
204 respondents (30% of those who reached this question) are familiar with Core Solidity. Among them, the most selected features are better error handling / try-catch replacement (43%) and better delegatecall / library replacement (41%).

63% say removing inheritance would cause challenges for their projects. 44% estimate rewriting their codebase to use type classes or traits would be somewhat difficult, 21% very difficult.

Feedback on Core Solidity is mixed. 33% of free-text responses are supportive, 21% are cautious, and 16% express concern about language fragmentation.

## Year-over-year changes

Compared to the 2024 survey (684 responses):

- Foundry usage increased from 51% to 57%
- Truffle disappeared from the results
- Windows overtook MacOS as the most used OS (38% vs 31%, compared to 29% vs 43% in 2024)
- Sourcify usage grew from 17% to 24%
- DX sentiment improved slightly: 73% report improvement vs 67% in 2024

Recurring issue percentages decreased across the board (stack too deep from 68% to 47%, debugging from 55% to 33%), though the question format changed between years (single multi-select field in 2024 vs separate checkboxes in 2025), which may account for some of the difference.

## Full results

The complete interactive report covers all survey questions including compilation and verification, chain deployment, alternative languages, documentation feedback, and detailed free-text analysis with respondent quotes.

- [Interactive results with all 60 charts](/survey-2025/)

Thank you to everyone who participated.
