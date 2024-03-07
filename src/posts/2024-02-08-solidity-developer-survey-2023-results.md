---
layout: post
published: true
title: 'Solidity Developer Survey 2023 Results'
date: '2024-03-10'
author: Vishwa Mehta
category: Announcements
---

The [Solidity Developer Survey 2023](https://blog.soliditylang.org/2023/12/08/solidity-developer-survey-2023-announcement/) results are in! In this post, we will be summarizing and analyzing them.

First of all, a big thank you to everybody who took the time and participated and to everybody who helped us spread the word about it!

We received a smashing 474 responses.

Your input is invaluable to us and plays a crucial role in helping to continuously improve the Solidity as an open source project.

Before we get started, here are a few useful links:

- In the spirit of open source, you can find all raw data of the survey results [here]() and all graphs [here]().
- Since this is already our third time conducting a yearly survey, it may be interesting for you to compare the outcome to the previous surveys. The results from the previous developer surveys are available below:
    - [2022](https://soliditylang.org/blog/2023/03/10/solidity-developer-survey-2022-results/)
    - [2021](https://blog.soliditylang.org/2022/02/07/solidity-developer-survey-2021-results/)
    - [2020](https://blog.soliditylang.org/2021/01/26/solidity-developer-survey-2020-results/)

Without further ado, let’s dig into the 2023 results!

## Summary & Notable Insights

- **Survey Audience**: In total, 474 developers from 74 different countries participated in the 2023 survey. About 18.5% stated to be residing in the US, followed by India (10.5%) and Nigeria (6.1%). This remains consistent with last year's insights except for Nigeria replacing France as the 3rd country where the highest respondents live.
- **Developer Profiles**: The level of coding experience remains at a medium to a high level, with the majority (26%) of respondents having coded professionally for 3+ years, with 9% of the respondents for even 15+ years.
- **Solidity Experience**: More than half of all respondents have been using Solidity for more than 2 years. 42% use Solidity daily and 30% weekly.
- **Solidity Expertise**: Many deem themselves Solidity experts, with a self-rating in the expertise of 7 or higher (out of 10). 7.8% rate their expertise as a 10 out of 10.
- **Developer Experience**: The majority (~72%) believe that the Solidity developer experience improved in the last year. 1.4% are of the opinion it got worse. Debugging issues remain to be the frequently encountered issues as last year, followed by stack-too-deep errors and bytecode size limitations.
- **Future Features**: Support for Generics, `Require` with custom error types, Transient Storage were mentioned most often as the “most anticipated Solidity features”.
- **Liked & Dreaded Features**: Respondents most like Solidity's syntax, the simplicity of learning, reading, coding, and compiling, and the static typing. The most significant pain point is “stack-too-deep”, with 33.6% of all votes, followed by missing memory optimizations (waste of memory) (24.4%) and redundant checks (e.g. in checked arithmetic) (11.8%). 9.9% say that compiler performance is their biggest issue.

<img width="1024" alt="1  Demographics" src="https://github.com/ethereum/solidity-website/assets/32997409/adbae4f6-b49d-4628-86e3-b4bbd44e6dad">

## Demographics

_⚠️ Be aware that this survey has only been shared in English when interpreting results regarding the distribution of countries of residency and language preferences._

As usual, we begin by looking at the developers who participated in this survey: In this first chapter, we cover general information on the survey audience, which includes residency and spoken languages.

In total, 474 developers from 74 different countries participated in the 2023 survey. 

The coverage of different geographies increased from 73 countries in 2021 to 100 countries in 2022 and back to 74 in 2023.

### Residency

Roughly 18.5% of respondents stated to be residing in the US, followed by India (10.5%), Nigeria (6.1%), and Germany (5.5%).

![Survey Participants World Map]()

![Survey Participants List of Countries with 20+]()

### Language

In total, 60 different languages were mentioned as their native languages in 2023.

31.85% stated English as their native language, followed by Indian languages (14.5%), Spanish (7.3%), French (6.3%), Chinese languages (4.8%), and German (4.6%).

_ℹ️ Hindi, Bengali, Telugu, Gujarati, Marathi, Odia, Punjabi, Tamil were clustered as “Indian languages”. Chinese, Cantonese, and Mandarin were clustered as “Chinese languages”. Runyankole, Swahili, Yoruba, Igbo, Kinyarwanda, and Kiswahili were clustered as African languages._ 

![Survey Participants Native Language]()

A majority of 96.8% respondents reported that they predominantly speak English at work.

Other languages that are spoken at work are French (0.9%), Russian (0.9%), Italian, Spanish, and Indonesian.

![Survey Participants Work Language](/img/2023/02/lang_work.png)

Out of all the respondents, 73.4% are okay with reading the Solidity documentation in English and 26.6% would prefer to read it in their native language. The number of respondents who would prefer it in their native language are higher this year than the previous year.

![Preferred Documentation Language](/img/2023/02/lang_docs.png)

![Preferred Documentation Language Breakdown](/img/2023/02/lang_docs_integrated.png)

_ℹ️ Note: This survey has only been conducted in English, which may have impacted the outcome of this question. We still believe internationalization of resources like the Solidity documentation is a crucial factor in lowering the barriers of entry, and we aim to support by helping coordinate the community-driven [translation efforts](https://github.com/solidity-docs)._

<img width="1021" alt="2  Dev   User Profile" src="https://github.com/ethereum/solidity-website/assets/32997409/f70abfce-6628-4626-b2a9-9be1a1345b5f">

## Dev & User Profile

In the second section of the Solidity Developer Survey, we learn more about the professional experience and coding preferences of the survey audience.

#### Work Experience & Employment

65.2% of respondents were employed at the time of the survey, while 13.4% stated they were students, and 21.4% said they were currently not working professionally.

Compared to the previous survey, there is a slight increase in both the number of students and currently unemployed developers.

![Employment Status](/img/2023/02/employment.png)

The employed respondents predominantly work in the “crypto” (69.6.2%), technology (14.7%) and financial services (4.5%) sector. This trend is quite comparable to the results from the previous year with just a slight change in the individual precentages.

![Industry Sector Breakdown](/img/2023/02/sector.png)

36% of all respondents are seniors and have been coding professionally for 6 years or more, 9.7% of them even for 15+ years.

On the other side, roughly 9.2% are coding newbies and have only coded professionally for less than a year.

With approximately 28.1%, the biggest group sits in the middle of the distribution and has professional coding experience of 3-5 years.

Overall, the level of coding experience is medium to high with the majority of respondents (64.1%) having coded professionally for 3 or more years.

And 6.5% have never coded as part of their job.

![Professional Coding Experience](/img/2023/02/coding_xp.png)

### Touch Points with Solidity

The majority of respondents (75.3%) still use Solidity either at work or personal projects. Almost 25% said that they use Solidity for their personal projects only.

![Survey Participants Touch Points with Solidity](/img/2023/02/touchpoints.png)

Only 32% of respondents contribute to open-source projects written in Solidity on a daily or weekly basis. The rest states to do so monthly (27.1%) or never (40.9%). The number of users who never contribute has slightly lowered this year with a small increase in those who contribute daily or weekly.

![Survey Participants Open Source Contributions](/img/2023/02/open_source.png)

### Programming Language Preferences

Solidity marks the most used programming language for the survey audience (42.9%), closely followed by JavaScript (15.4%) and TypeScript (16.7%).

Other less frequently mentioned languages are Python (9.5%), Rust (3.5%), and C# (2.4%).

![Most Used Programming Language](/img/2023/02/progr_lang_use.png)

Similar to the previous year, the respondents' favorite programming languages are as follows:

Solidity is the most popular, scoring 29.1% of all entries, followed by Python (15.6%), JavaScript (12.4%), TypeScript (12%), and Rust (10%).

![Favorite Programming Language](/img/2023/02/progr_lang_fav.png)

### Operating System

Most respondents use MacOS as their primary Operating System (40.5%). Windows and Linux are equally popular, with 29.7 and 29.9% respectively.

![Operating System](/img/2023/02/os.png)

<img width="1022" alt="3  Solidity Background" src="https://github.com/ethereum/solidity-website/assets/32997409/c537f263-0fe9-41d3-91d5-30b7801ed2bc">

## Solidity Background

In this section of the survey, we asked respondents about their Solidity-specific development experience and usage habits.

### Solidity Experience

Almost 50% of all respondents deem themselves Solidity experts, with a self rating in expertise of 7 or higher (scale of 10).

4.6% rate their expertise as a 10 out of 10, and 70% of those have been using Solidity for 2-3 years, or longer.

Roughly 23% can be considered beginners or low-frequency users with a self-rated expertise level of 4 or lower.

The distribution of self rating remained similar to the previous survey, even though the survey audience tripled in size.

![Solidity Expertise Level](/img/2023/02/sol_expertise.png)

Roughly 50% of all respondents have been using Solidity for less than a year, with 13% having just started their Solidity journey (less than three months of experience).

13.83% have been using Solidity for more than 3 years and can thus be considered “Solidity seniors''.
To put years into perspective: [“Version 0.1.1”](https://github.com/ethereum/solidity/commits/15dc5954c3a2e2a9ce96f2f77d41adef98a4cced), the oldest version of Solidity on `solc-bin`, is from August 2015 and thus roughly 7.5 year old.
The language is still relatively young and continues to evolve. We may add more granular selection options for “more than 3 years” of Solidity experience to distinguish this better in the next survey.

![Solidity Experience Level](/img/2023/02/sol_experience.png)

As in previous years, Solidity appears rather easy to learn, with 21.2% of respondents feeling productive in less than a month and 39.3% in less than half a year.

8.1% needed more than a year to feel comfortable with the language.

17.8% don't feel productive yet, out of which more than 74.2% are beginners and have been using Solidity for 6 months or less, and 47% even less than three months.

![Time to Productiveness](/img/2023/02/sol_productivity.png)

### Solidity User Profile and Usage Habits

With regards to usage frequency, more than 40% of respondents use Solidity on a daily basis!

37.3% use it weekly, and 13.9% on a monthly basis.

Roughly 8% indicated to be using Solidity "rarely" or "never".

Most of them indicated before that they use Solidity for personal projects and code in a different programming language at work.

![Solidity Usage Frequency](/img/2023/02/sol_frequency.png)

A striking 81.8% of all respondents use Visual Studio Code as their editor when writing Solidity code.
Vim and IntelliJ follow in the second and third ranks with 3.7 and 3.4% usage, respectively.

Compared to the previous survey in 2021, Visual Studio code gained significantly in popularity (from roughly 50% to 81.8%).

![Editor Overview](/img/2023/02/editor.png)

Depending on the chosen IDE, we also asked respondents which Solidity-related plugins they use, if any.

“HardHat VSCode” by Nomic Foundation and the “Solidity” extension by Juan Blanco (both for Visual Studio Code) are the most popular.

![Editor Plugins Overview](/img/2023/02/editor_plugins.png)

Hardhat remains the most popular Ethereum-specific development environment, with roughly 75% of all respondents using Hardhat.

Remix follows with 42%. Foundry has significantly increased its share from 1.6% in 2021 to 30% in 2022.

Truffle continues to move more into the background, with 17% of respondents indicating that they use it.

Rather "niche" Ethereum-specific development environments are Brownie (6.7%), Ape (3.3%), Dapptools (2.3%), and Embark (0.8%).

4.4% of respondents are not using any Ethereum-specific development environment.

It’s worth noting that this question was a checkbox question, allowing respondents to select multiple answers.

_⚠️ Comparing the results from 2020, 2021, to 2022 may offer some insights like Truffle losing a significant share (2020: 59.3% -> 2021: 26.2% -> 2022: 17%), while Hardhat, and newcomers like Foundry increased their share in users. However, it's important to consider that the previous surveys had significantly fewer responses (2020: 194, 2021: 435, 2022: 1401). A year-on-year comparison can only be interpreted as a loose trend and it’s not the intent of this study to analyze user splits between IDEs in detail._

![Ethereum IDE Overview](/img/2023/02/eth_ide.png)

With roughly 90%, 0.8.x Solidity versions remain to be the by far most used ones. The usage share of both the 0.7.x (10.2%) and the 0.6.x (7.7%) series continues to decrease since the previous survey. Everything older than that is hardly in use anymore.

![Used Solidity Versions](/img/2023/02/versions.png)

_⚠️ Reminder: Please make sure to frequently update your code (and compiler) to the latest Solidity version. [Several important bug fixes and security improvements](https://github.com/ethereum/solidity/blob/develop/docs/bugs_by_version.json) are added in the newer versions!_

### Solidity Usage Details

Just like last year, we also asked our users specific questions about Solidity usage trends.

For charts and figures on those, please refer to the [presentation with all graphs](https://docs.google.com/presentation/d/1xH5pGZ6rrAP_jzRQobf0Mn1XYquyg8bD17DBQyrErMo/edit?usp=sharing) and the [raw data file](https://docs.google.com/spreadsheets/d/1A5iF3aKhFv9wTTJ10ko_uxgoflc8oEpVe3gqAAWoC2w/edit?usp=sharing).

To summarize:

- CLI: Roughly 60% of respondents do not use the Solidity compiler directly via the command line, while 40.1% do. This is quite consistent with last year.
- CLI: When using the compiler on the command line, 58.9% still use Standard JSON.
- CLI: When asked how disruptive are changes in CLI options and outputs for respondents, 64.1% responded with "okay" and 26.5% with "Not disruptive at all". Only 9.4% deem these changes as disruptive.
- Old EVM versions: 28.8% of the overall respondents still rely on old EVM versions, among which 11.1% rely on deprecated EVM versions.
- Unoptimised code: 20.8% said that they never use unoptimised code. 27.9% use unoptimised code only because of their framework's defauly settings, whereas 20.1% do so due to debugging or unit testing (19.4%).
- ABIEncoderV1: While 63.9% do not use ABIEncoderV1, only 6.5% know about it and use it. 29.6$ do not know about it at all.
- SMTChecker: 74.5% of all respondents never use the SMTChecker. 20.1% have tried it and 5.4% use it frequently. You can learn more about the SMTChecker [here](https://docs.soliditylang.org/en/latest/smtchecker.html). The number of users who have tried it has increased this year.
- `via-IR` compilation pipeline: 51.9% do not know what `via-IR` is. This number has significantly reduced from last year. 25.9% use the `via-IR` pipeline already. In the following weeks, we intend to write a blog post about what `via-IR` is and why you should switch from the legacy compilation pipeline to `via-IR`. When asked what users are most concerned about regarding the use of `via-IR`, 27.4% said compilation times, 21.4% said not enough knowledge, 17.9% said stability/security concerns, and 13.5% said lack of tooling.
- Metadata publication: 55.2% publish the metadata of their smart contracts which has slightly increased from last year. 30.3.5% don’t, while 14.5% don’t know what this means and both these numbers have significantly improved from last year.
- Sourcify: 14.2% of all respondents use Sourcify for smart contract verification (increased from last year), while 30.7% claim to not need it. 55% don’t know what Sourcify is, which has reduced from last year. A staggering 79% users use Sourcify via Foundry and 16.1% use it via Sourcify directly. If you want to learn more about Sourcify, visit [sourcify.dev](https://sourcify.dev/).
- `appendCBOR: false` or `bytecodeHash: none`: 55% users do not know what that is, whereas 30.8% know but do not need it. Only about 13.7% either use it frequently or sometimes.
- Flattening contracts: 53.9% of total respondents do not flatten their contracts, whereas only 22.5% do. 23.6% do not know what that is or how to do it. Most of the users who flatten their contracts mentioned that they do so for the purpose of verification.

### Other EVM Networks

More than half of all respondents (65.1%) use Solidity outside of [Ethereum Mainnet](https://ethereum.org/en/glossary/#mainnet) and [testnets](https://ethereum.org/en/glossary/#testnet).

When asked which other networks they deploy their smart contracts on, 20.8% responded with Polygon (formerly Matic Network).

Other often mentioned blockchains including Arbitrum (15.6%), Optimism (13.2%),  Binance Smart Chain (10.6%), and Avalanche (8.1%).

![Deployment To Other Chains](/img/2023/02/solidity_other_chains.png)

![Deployment To Other Chains Breakdown](/img/2023/02/solidity_other_chains_breakdown.png)

### Other Smart Contract Languages

The most used other smart contract language is [Yul](https://docs.soliditylang.org/en/latest/yul.html), an intermediate language for Solidity, with 23.9% which got increased from the previous year, followed by [Vyper](https://docs.vyperlang.org), a pythonic EVM language, with 11.9%.

[Huff](https://docs.huff.sh) (9.3%), a low-level assembly language for the EVM and [Cairo](https://www.cairo-lang.org/docs/) (5.8%), a STARK based language targeting StarkNet are also mentioned several times.

Other “newcomers” like [Sway](https://fuellabs.github.io/sway/) (2.1%) and [Fe](https://fe-lang.org/docs/) (1.8%) also make it into the chart.

![Other Smart Contract Languages](/img/2023/02/smart_contr_langs.png)

<img width="1022" alt="4  Solidity Developer Experience" src="https://github.com/ethereum/solidity-website/assets/32997409/b48d2bed-9c16-4f1b-a6d4-7b4a96d5a3c0">

## Solidity Developer Experience

77% of all respondents believe that the Solidity developer experience generally improved throughout the last year. 20.2% are of the opinion that they noticed a big improvement compared to the previous year.

10.3% say that nothing has changed in their experience, while 1.6% of the respondents think it got worse.

Compared to the previous year’s results, the share of “got worse” and “no change” slightly increased. Overall, the picture is very comparable.

![Solidity Developer Experience](/img/2023/02/dev_ex.png)

When getting stuck on a Solidity problem, most respondents visit Ethereum StackExchange / StackOverflow for help or search for a solution on the Internet.
Many also ask their coworkers for help or watch tutorial videos.

![Solving Problems](/img/2023/02/solidity_problem.png)

### Recurring Issues

53.3% of respondents don't encounter the same or similar issues multiple times when developing in Solidity.

Among the 46.7% that do, "Stack too deep" issues are encountered most frequently, followed by bytecode size limitations and debugging issues.

_ℹ️On the topic of debugging issues, we'd like to use the opportunity to highlight a new initiative aimed at defining a common debugging data format for languages built on top of the EVM: [ethdebug](https://github.com/ethdebug/format/). The end result will be a specification that will allow debuggers, analyzers, and other tools to reliably map between the EVM bytecode produced by compilers and the high-level language features. This has been a common pain point across the ecosystem for years and is becoming more pressing with the introduction of the new IR-based code generator (i.e. the `via-IR` pipeline) in Solidity, which often breaks implicit assumptions tools made based on how the legacy pipeline worked. We encourage all developers working on such tools to join the working group. The group has regular bi-weekly meetings and coordinates via the [ethdebug channel](https://matrix.to/#/#ethdebug:matrix.org) on Matrix._

![Recurring Issues](/img/2023/02/recurring_issues.png)

![Recurring Issues](/img/2023/02/recurring_issues_breakdown.png)

### Getting Started & Documentation

Most respondents considered it very easy (44.8%) or “okay” (50.9%) to get started using the Solidity compiler.
4.3% (19 people) stated that it was difficult for them. When asked what made it difficult to get started, some mentioned lack of good docs and examples.

![Getting Started]()

Almost 68% of survey respondents consider the Solidity documentation helpful, followed by 29.1% who deem it “somewhat” useful. Only 2.9% don’t find it useful at all.

Ideas for improvement most prominently ask for more code examples but also a better high-level overview of syntax, better in-docs search, and overall better UI/UX.

![Solidity Documentation Usefulness]()

### Biggest Pain Points

The biggest pain point is “stack-too-deep”, with 41.7% of all votes, followed by missing memory optimizations (waste of memory) (21%) and compiler performance 13.1%.

8.6% say that redundant checks (e.g. in checked arithmetic) is their biggest issue.

11% selected “other” and were able to specify their most significant pain point in a free text field. Most prominently mentioned: Bytecode and contract size limit and errors.
![Solidity Pain Points]()

### High-Impact Compiler Bugs

We were curious to find out whether Solidity developers had been affected by any of the high-impact compiler bugs (codegen bugs that are announced with [Security Alerts](https://blog.soliditylang.org/category/security-alerts/) on the Solidity blog).

While 95.7% said they haven't been affected, 4.3% said yes. 

When asked which one they were affected by, here's what we found out:

(double check if reported bugs are genuine and list accordingly)

<img width="1021" alt="5  Language Design" src="https://github.com/ethereum/solidity-website/assets/32997409/12a70766-1ac1-4ca3-bcdd-782cfcde6ef7">

## Language Design & Upcoming Features

### Most Anticipated Feature(s)

Support for generics (23.2%) and `Require` with custom error types (17.4%) was mentioned most often as the “most anticipated Solidity feature”.

_⚠️ Similar to the previous year, we noted that respondents were using various different terms like "floats", "floating point arithmetic", "floating point number", "fixed point numbers", and "fixed point math". We categorized those as "decimal numbers"._

Most mentioned anticipated features in descending order:

- Generics
- Require with custom error types
- Transient storage
- Solving stack-too-deep errors
- Better gas optimizations & debugging tools
- Support for decimal numbers (fixed point types / floating points) & Dynamic Memory Arrays

### Feedback on New Features/Improvements

We asked a few questions about how the respondents feel about postfix types and functional elements in Solidity. Here's what we found out:

- While 72.5% explicitly said that they either don't like postfix types or don't care, only 27.5% said that they like them.
- Almost 60% users said that they like the idea of more functional elements in Solidity such as Lamda functions. 15.4% said they don't like them and 24.7% are indifferent towards it.

### EIP Support

We also wanted to know what Solidity-related EIPs the survey respondents know about or look forward to using and why.

- EIP-1153 “Transient Storage”: Roughly 46.2% respondents know about it, whereas 53.8% do not know about the Transient Storage EIP. More than 40% said that they would need complex types in Transient Storage, such as mappings and arrays. 
- EIP-3540 “EOF - EVM Object Format”: It was interesting to see that only 28.7% respondents know about EOF in contrast to the 71.3% majority that doesn't know about it. Out of which, 65.4% feel positively about it and only 4.5% feel negatively about the EOF.

### Restrictiveness

Regarding language restrictiveness, roughly 44.7% of respondents wish that Solidity stays “as is” which is comparable to last year's results. 24% tend towards more restrictive/explicit which got reduced compared to last year, while approximately 10% would like Solidity to be less restrictive.

![Solidity Restrictiveness Ranking]()

![Solidity Developer Community Header](/img/2023/02/header6.png)

### Language Design Related Efforts

When asked whether the respondents have or continue to participate in the language design efforts, here's what we found:
- A majority of almost 68% respondents said that they do not participate because they are either too busy to do so or do not know how to participate.
- About 14.5% said that they regularly participate in language design efforts either by joining the calls, the forum discussions, or by proposing new features or language changes on GitHub.
- 18.5% said that they are either not interested or do not feel that they are qualified to participate in these efforts.

At Solidity, we have and would like to continue to make it easier to our community to participate more actively in these discussions and feel empowered enough to contribute to the language design decisions.

<img width="1010" alt="6  Solidity Developer Community" src="https://github.com/ethereum/solidity-website/assets/32997409/bd59f1b9-64e3-4412-978b-3200d45fedcc">

## Solidity Developer Community

### Community Participation in Language Design Discussions

Less than 10% of all respondents ever participated in Solidity language design related efforts.

The distribution between participating in forum discussion and proposing features or language changes as a Github issue is fairly similar,
while language design discussions and feedback calls have slightly less participation (all between 80 - 108 people, multiple selections possible).

Of the roughly 90% that did not participate in language design, most state they don’t know how, followed by being “too busy with work or other things”.
Roughly 30% say that they are not interested in or qualified for the discussions.

![Language Design Participation]()

### Staying up-to-date

A slightly new trend from previous years is that this year, most people reported that they like to stay up-to-date about Solidity versions, security alerts, and announcements by following the [Solidity GitHub Releases page](https://github.com/ethereum/solidity/releases), followed by Solidity [Twitter](https://twitter.com/solidity_lang) or [Mastodon](https://fosstodon.org/@solidity).

Other often used means of information is the [Solidity blog](https://blog.soliditylang.org/).

Interestingly, about 21.2% claim to not be doing any of the above.

As part of “other”, respondents specified several community based means to stay up-to-date:

- YouTube
- Crypto Twitter / Community chats
- [Solidity docs](https://docs.soliditylang.org/en/latest/)
- ["Week in Ethereum News" Newsletter](https://www.weekinethereumnews.com/)
- "Crypto influencers" / Popular Solidity developers
- Updating [RemixIDE](https://remix.ethereum.org/) / [Hardhat](https://hardhat.org/) / [VS Code](https://code.visualstudio.com/)
- Coworkers
- Google
- Newsletters
- Conferences / Meetups
- [OpenZeppelin forum](https://forum.openzeppelin.com/)
- [Solidity website](https://soliditylang.org/)
- Reddit

![Means To Stay Up-To-Date]()

### Interaction with Other Solidity Developers

More than half of respondents (56.8%) interact with other Solidity developers.

17.5% don’t interact with other Solidity developers at all.

![Developer Interaction]()

Like in the previous years, as the last part of the survey, we wanted to hear how many participants agree or disagree with several statements regarding the Solidity community and the work of the Solidity team.

- 46.8% of respondents feel welcome in the Solidity developer community.
- Roughly 80% agree or somewhat agree that they feel confident in the work of the Solidity team.
- About 46.9% feel welcome to contribute to Solidity and understand clearly how to do so. However, 25% aren't clear.
- Roughly 68% are (fully or somewaht) confident that the Solidity team understands their needs as a developer, while approximately 9% disagree or strongly disagree.
- About 40% respondents are satisfied with the feedback and inputs they get from the Solidity team regarding their contributions. Whereas 10% disagree or strongly disagree to this.

The results of this “community and Solidity team confidence ranking” are quite consistent with the results from the previous year.

One can derive that while the community seems confident in the competency/qualification of the Solidity team, the communications around ways to contribute as well as understanding of the community’s needs, can be improved.

Those are things that we have been working on improving throughout the last years and will continue to do so.

![Community and Solidity Team Confidence Ranking]()

## Thank You!

Lastly, we want to take the opportunity to thank you for all your survey responses and feedbacka. We hope to continue this tradition annualy!

We hope that the insights from this survey continue to be valuable to the Solidity ecosystem and community as they are to us!

To stay up-to-date with all Solidity related announcements and updates, make sure to:

- Follow Solidity on [Twitter](https://twitter.com/solidity_lang) or [Mastodon](https://fosstodon.org/@solidity).
- Join the language design discussions in the [Solidity forum](https://forum.soliditylang.org/) or provide us feedback there.
- Follow announcements and security alerts on the [Solidity blog](https://blog.soliditylang.org/).
- Follow and ⭐ the [Solidity repo on Github](https://github.com/ethereum/solidity).

---

_All graphs can be found [here](https://docs.google.com/presentation/d/1W49GWlhdxC_I1dxqzFIf1e9bFf8O_QH2kT_T_nfenA0/edit?usp=sharing). The raw and analyzed data can be found [here](https://docs.google.com/spreadsheets/d/1R8EBUryePhiJwl14IXNm2RDwqA8sEBdxrKuFKvfj0wY/edit?usp=sharing)._
