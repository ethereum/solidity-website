---
layout: post
published: true
title: 'Solidity Developer Survey 2024 Results'
date: '2025-04-25'
author: Vishwa Mehta
category: Announcements
---

We are thrilled to share the [Solidity Developer Survey 2024](https://docs.google.com/spreadsheets/d/1ptivw3pC-IMJ9Bhl6lViyKd-NTEDZGhE3-bwBFtMwtE/edit?usp=sharing) results with you! In this blog post, we will be going over key insights and a detailed analysis of the various sections of the survey.

Before diving in, we would like to thank everyone who submitted a response to the survey and helped us reach the right audience for it. Your inputs are invaluable to us and are pivotal in driving important language design decisions and improving Solidity as an open-source project.

This year, we received a total of 684 responses. Let's start with some useful links:

- In the spirit of open source, you can find all raw data of the survey results [here]([link](https://docs.google.com/spreadsheets/d/1ptivw3pC-IMJ9Bhl6lViyKd-NTEDZGhE3-bwBFtMwtE/edit?usp=sharing)) and all graphs [here](https://docs.google.com/presentation/d/16eAwMso-t8fJma-4sxUglD5Xkqrj7uO_aoIbFVwfojs/edit?usp=sharing).
- This is our fifth annual survey. You can compare the 2024 results with the previous years by checking our blog posts below:
    - [2023](https://soliditylang.org/blog/2024/04/03/solidity-developer-survey-2023-results/)
    - [2022](https://soliditylang.org/blog/2023/03/10/solidity-developer-survey-2022-results/)
    - [2021](https://blog.soliditylang.org/2022/02/07/solidity-developer-survey-2021-results/)
    - [2020](https://blog.soliditylang.org/2021/01/26/solidity-developer-survey-2020-results/)

Without further ado, let’s dig into the 2024 results!

## Summary & Notable Insights

The survey consists of 6 sections, namely: **[1]** Demographics, **[2]** Dev & User Profiles, **[3]** Solidity Background, **[4]** Solidity Developer Experience, **[5]** Language Design, and **[6]** Solidity Developer Community.

Let's look at some key insights from the summary of these various sections from the 2024 survey.

- **Demographics**: In total, 684 developers from 91 different countries participated in the 2024 survey. The highest number of respondents hail from the **USA (10.8%)**, followed by **India and Nigeria at 7.8% each**. This remains consistent with last year's insights, except for Nigeria sharing the second place alongside India this year.
- **Dev & User Profiles**: Solidity continues to be the most used language by the respondents, followed by TypeScript and JavaScript.
A majority of Solidity experts (self-rating of 10) have been using the language for 5+ years.
- **Solidity Background**: 76.6% of users use Solidity as regularly as daily or weekly. Additionally, Foundry climbs to the highest used Ethereum IDEs this year with 51.1% votes.
- **Solidity Developer Experience**: With a majority of 66.8%, the survey participants feel that the Solidity developer experience has generally improved in the last year.
Mappings (21.8%), contracts as objects (20.4%), and modifiers (15%) continue to be the most liked Solidity features two years in a row in the exact order.
- **Language Design**: Elimination of stack-too-deep (18.2%), better debugging tools (16.9%), and gas optimisations (13.2%) rank the highest in that order among the most anticipated features/updates this year.
- **Solidity Developer Community**: Solidity Twitter/Mastodon replaces GitHub Releases as the most popular source used for staying up-to-date with Solidity announcements.

![header 1](/img/2024/survey/header1.png)

## Demographics

_⚠️ FYI - this survey has only been shared in English. Take this into account when interpreting results regarding the distribution of countries of residency and language preferences._

We will begin by going through the results of the first section of the survey, which covers the demographics of the survey respondents.

In total, 684 participants from 90 different countries participated in the 2024 survey. 

The coverage of different geographies increased from 73 countries in 2021, to 100 countries in 2022, and then back to 71 in 2023, it has now increased to 90 countries this year. It is interesting to note a spike in the geographic diversity of the survey audience this year compared to 2023.

### Residency

A majority of 10.8% of respondents mentioned that they live in the USA, followed by India and Nigeria at 7.8% each, and France taking over Germany this year with 3.8% votes.

Except for France ranking higher than Germany this year, the order of the top 5 countries of residence remains similar to 2023. However, there has been a shift in individual numbers. For instance, there's a drop in USA residents among the survey participants, whereas Nigeria has seen a spike.

For reference, see the world map and chart with a list of countries of residence with 13+ responses.

![Participants World Map](/img/2025/survey/Slide3.png)

![List of Countries with 13+ responses](/img/2025/survey/Slide4.png)


### Language

In the 2024 survey, a total of 75 languages were submitted as the native languages of the respondents.

26% of the total participants speak English as their native language, 9.3% speak Indian languages, 8.3% speak Spanish, 6.5% speak Russian, 6.1% speak French, Portuguese, and African languages at 4.4% each, 3.7% speak German, and 2.8% speak Chinese languages.

Note that this year, Russian has climbed up the ranks to 4th position, African languages also climbing up a bit higher than last year, whereas Chinese languages have fallen back in votes compared to 2023.

_ℹ️ **Note:** Hindi, Urdu, Bengali, Telugu, Kannada, Tamil, Gujarati, Malayalam, and Marathi are clustered as “Indian languages”. Swahili, Hausa, Igbo, Yoruba, Luganda, Afrikaans, Kamba, Kiswahili, Malagasy, Mina, Shona, and Siswati are clustered as "African languages". And Cantonese, Chinese, and Mandarin are clustered as “Chinese languages”._

It is interesting to note that even more African languages have entered the survey results this year.

![Participants Native Languages](/img/2025/survey/Slide5.png)

Although an almost equal distribution this year, the percentage of participants who speak a language other than their native language at work (50.6%) is slightly higher than those who speak their native language at work (49.4%). This trend has changed compared to last year.

A total of 76.7% of respondents reported that they predominantly speak English at work, followed by Indian languages, French, Chinese languages, Russian, Spanish, Portuguese, and more. All of these, except English, are ranked close behind each other in that order, as seen in the chart below.

![Participants Work Language: Native or Other](/img/2025/survey/Slide6.png)

![Participants Work Language](/img/2025/survey/Slide7.png)

A total of 88% of participants stated that they are okay with reading the Solidity documentation in English. This number is slightly higher than [last year](https://soliditylang.org/img/2024/survey/Slide8.png).

However, 12% of participants prefer to read the documentation in their native language.

![Preferred Language for Docs](/img/2025/survey/Slide8.png)

![Preferred Language for Docs Breakdown](/img/2025/survey/Slide9.png)

_ℹ️ Note: This survey has only been conducted in English, which may have impacted the outcome of this question. We still believe internationalization of resources like the Solidity documentation is a crucial factor in lowering the barrier of entry, and we aim to support this by helping coordinate the community-driven [translation efforts](https://github.com/solidity-docs)._

![header 2](/img/2024/survey/header2.png)

## Dev & User Profile

In this next section of the survey, we present insights about the professional background of our developers and users and share their preferences about coding languages, open source contributions, operating systems, & more.

### Employment & Work Experience

66.6% of respondents were employed at the time of the survey, while 14% stated that they were students. 19.4% reported that they were not employed at the time of the survey.

[Compared to the previous survey](https://soliditylang.org/img/2024/survey/Slide12.png), the overall distribution remains almost identical.

![Employment Status](/img/2025/survey/Slide12.png)

71% of the total participants who were employed at the time work in the “crypto”, whereas 16.4% work in technology in general, and 5.1% work in financial services. A very small portion works in Education/Academics and Media/Gaming (1.9% each).

Yet again, this trend is almost identical to [the results from the previous year](https://soliditylang.org/img/2024/survey/Slide13.png) with a slight change in the individual percentages.

![Industry Sector Breakdown](/img/2025/survey/Slide13.png)

While a total of 41.5% of respondents are considered seniors in their field with more than 6 years of professional coding experience, 7% have never coded at work. Among the 41.5% seniors, 13.4% have even been coding for 15+ years.

With 27% votes, a majority of respondents are mid-level programmers with 3-5 years of experience, whereas 8.8% have only coded professionally for less than a year.

Overall, the level of professional coding experience is medium to high, with the majority of respondents (68.6%) having coded professionally for 3+ years.

Although the chart maintains its shape [compared to last year](https://soliditylang.org/img/2024/survey/Slide14.png), the individual data is slightly different for various years of experience. For instance, the percentage of respondents with 15+ years of experience is higher than last year.

![Professional Coding Experience](/img/2025/survey/Slide14.png)

### Developer Profiles

When asked which developer profile best describes the participants, the majority identified as full-stack developers, a choice we newly added this year to allow participants to indicate their technical background more accurately.

With a [different distribution](https://soliditylang.org/img/2024/survey/Slide15.png) emerging this year, 24.1% of the respondents were found to be auditor/security experts, closely followed by 22.6% smart contract developers, 11.5% academic researchers, and only 5.2% tooling developers.

![Dev Profiles](/img/2025/survey/Slide15.png)

A majority of 45.5% of the participants use Solidity both at work and for personal projects. The rest of the respondents are almost equally distributed between using Solidity at work (27%) and using Solidity for personal projects (27.6%). This trend is similar to last year, except for small shifts in individual numbers.

![Solidity usage](/img/2025/survey/Slide16.png)

A total of 25.8% of users contribute to open source projects written in Solidity regularly (daily and weekly), whereas 28.4% only contribute monthly.

On the other hand, 45.7% of users reported that they have never contributed to open-source projects written in Solidity.

[Compared to previous years](https://soliditylang.org/img/2024/survey/Slide17.png), we are unfortunately seeing a downtrend of users who contribute to open-source projects written in Solidity.

![Open Source Contributions](/img/2025/survey/Slide17.png)

### Programming Language Preferences

Like previous years, Solidity ranks as the most used programming language among the participants (42.4%), [a number almost identical to last year's](https://soliditylang.org/img/2024/survey/Slide18.png), followed by TypeScript (21.5%), and JavaScript (15%).

The order of the top 3 most used languages remains the same as last year.

Other less frequently mentioned languages are Python (10.3%), Rust (4.4%), Go (2%), C# (1.7%), and Java (1.7%).

Since Go was specified as an "Other" response, almost as many times as Java last year, it was introduced as a choice in the list of languages and ranked higher than C# and Java.

Please note that there are missing labels of other languages that did not show up in the chart due to space constraints. You can find the [full list in the analysis sheet](https://docs.google.com/spreadsheets/d/1ptivw3pC-IMJ9Bhl6lViyKd-NTEDZGhE3-bwBFtMwtE/edit?usp=sharing).

![Most Used Programming Language](/img/2025/survey/Slide18.png)

When asked about the favourite language of the participants, Solidity ranks the highest with 32.7% of the votes, a bit higher than last year, followed by Python (13.9%), TypeScript (12.8%), Rust (11.3%), and  JavaScript (9.9%). JavaScript has fallen back by a few ranks this year in the list.

However, the order by popularity of other lesser mentioned languages in the list remains consistent with [last year](https://soliditylang.org/img/2024/survey/Slide19.png), with Go at 5.2%, C++ at 3.7%, Java at 3.2%, C# at 2.3%, and C at 1.4%.

![Favorite Programming Language](/img/2025/survey/Slide19.png)

### Preferred Operating System

The majority of the participants use macOS as their primary Operating System (43%), followed by Windows (29.2%) and Linux (27.8%).

Linux and Windows were found to be equally popular [last year](https://soliditylang.org/img/2024/survey/Slide20.png).

![Operating System](/img/2025/survey/Slide20.png)

![header 3](/img/2024/survey/header3.png)

## Solidity Background

In the next section of the survey, we collected information regarding Solidity-specific development experience and usage habits of the participants.

### Solidity Expertise

Almost 60% of all respondents deem themselves Solidity experts, with a self-rating in expertise of 7 or higher (scale of 10), out of which participants with a self-rating of 8 are the highest in number.

23.4% rated themselves 10 in Solidity expertise, and roughly 84% of those have been using Solidity for 2+ years.

About 20% of all who responded are still at the beginning of their Solidity journey with a self-rating of 4 or less.

![Solidity Expertise](/img/2025/survey/Slide22.png)

We asked the participants about how long they have been using Solidity. Almost 30% of all respondents have been using Solidity for less than a year, with 10% with less than three months of experience using Solidity.

The highest number of respondents (24.5%) are users who have 2-3 years of experience in Solidity.

About 24% of users can be considered seniors in the ecosystem since they stated that they have been using Solidity for 3+ years.

![Solidity Experience Level](/img/2025/survey/Slide23.png)

When asked how long it took the respondents to start feeling productive with Solidity, the majority of them (36.7%) reported that it took them less than 6 months.

17.8% even said that it only took them less than a month.

12.7% needed more than a year to feel comfortable with the language. This number is slightly higher than the [last year](https://soliditylang.org/img/2024/survey/Slide24.png).

17.4% don't feel productive yet, out of which 76.7% are still in the beginning of their Solidity journey (=<6 months), and 45% have even less than three months.

![Time to Productiveness](/img/2025/survey/Slide24.png)

### Solidity User Profile & Usage Habits

43.7% of respondents use Solidity daily, followed by 32.9% who use it weekly and only 14.5% who use it every month. These numbers have seen a [slight shift since last year](https://docs.google.com/presentation/d/17TeWEvaVGgSHYYxIoLiTjLSf0QvbmOr3n3GJuHnSdHs/edit?slide=id.g1d6f2fd2b78_0_134#slide=id.g1d6f2fd2b78_0_134), but the order (daily > weekly > monthly) remains the same.

As low as 0.9% said that they never use Solidity, decreasing further 1% since last year. 8.1% of users stated that they use it rarely.

![Solidity Usage Frequency](/img/2025/survey/Slide25.png)

Like previous years, we asked the survey audience how they get the Solidity binaries. The most mentioned sources were, in the order of highest to lowest:

- via a framework / IDE (38.5%) -0.3%📉 
- using npm (16.1%) -2.5%📉
- GitHub Releases (11.1%) -1.5%📉
- solc-select (7.5%) that we added as a choice this year
- Build from source (7.1%) -2.2%📉
- Homebrew (5.7%) -0.4%📉
- solc-bin (5.5%) -1.3%📉

Other lesser prominent sources were Ethereum PPA for Ubuntu, Package Managers for Linux Distros, Dockerhub, and svm-rs.

![Sources for Solidity Binaries](/img/2025/survey/Slide26.png)

90.1% of all respondents use Visual Studio Code as their editor when writing Solidity code, increasing almost 20% this year.

[Swapping positions since last year](https://soliditylang.org/img/2024/survey/Slide27.png), IntelliJ and Vim follow in the second and third ranks with 3.9% and 2.4% users, respectively.

Atom and Visual Studio continue to rank the lowest in this chart, as seen below.

![Editor Overview](/img/2025/survey/Slide27.png)

Depending on the chosen editor, we also asked respondents which Solidity-related plugins they use, if any.

[Just like last year](https://soliditylang.org/img/2024/survey/Slide28.png), “HardHat VSCode” by Nomic Foundation and the “Solidity” extension by Juan Blanco were found to be the most popular among Solidity developers.

![Editor Plugins Overview](/img/2025/survey/Slide28.png)

We wanted to know which Ethereum-specific development environment our survey participants use.

This year, Foundry takes over Hardhat as the most popular Ethereum-specific IDE with the highest percentage of users (51.1%). After rising in popularity from 1.6% in 2021 to 30% in 2022 and 32% in 2023, Foundry has been gaining more users within the Solidity community and Ethereum ecosystem in general.

Hardhat falls behind this year with 32.9% users, still [comparable to last year](https://soliditylang.org/img/2024/survey/Slide29.png). The percentage of Hardhat users has been on a downtrend since the 2022 results, when roughly 75% of respondents reported that they used Hardhat.

Another interesting find this year is that while Remix followed both Hardhat and Foundry closely last year with 25.8% votes and continues to be the third most popular choice this year, it has only earned 8% of the total votes.

Truffle ranks lower in this list with only 2.4% of respondents indicating its usage, closely followed by Wake with 2.1% votes.

Ape, Brownie, and Dapp share the same percentage of users this year (0.6%), marking them as the lesser-known/used choices among others in the list.

As low as 1.3% of respondents do not use any Ethereum-specific development environment at all.

![Ethereum IDE Overview](/img/2025/survey/Slide29.png)

This year, we introduced a few follow-up questions to understand the usage patterns of these tools.

When asked whether the survey participants use these tools independently or at work, the majority (62%) indicated that they use them independently, whereas 38% stated that they use them at work.

![Tool Usage Pattern](/img/2025/survey/Slide30.png)

We also asked them to choose what purpose they use the tools for among a list of options. Here's what we found:

Most participants use them for testing (28.3%), closely followed by production deployment (24.6%), quick prototyping (18.6%), gas optimisation (15.5%), and CI/CD testnet (12%).

![Tool Usage Purpose](/img/2025/survey/Slide31.png)

Out of the 30.9% of respondents who indicated that they also use other IDEs, 45.5% voted for Remix, followed by Hardhat (24.5%) and Foundry (18.8%) as their secondary choice.

Only 2.9% voted for Truffle and 1.9% for Ape.

![Other IDE](/img/2025/survey/Slide32.png)

![Secondary IDE](/img/2025/survey/Slide33.png)

Similar to last year, the 0.8.x Solidity versions remain the most used versions. However, 88.9% respondents this year indicated that they use v0.8.x of the compiler, a significant increase [since last year (81.85%)](https://soliditylang.org/img/2024/survey/Slide30.png).

Please note that this is a multiple-response type question allowing participants to choose more than one version series.

While the usage share of the 0.7.x (4.8%) version series has more or less remained the same this year, the 0.6.x (2.63%) series continues to decrease consistently since the previous surveys. The rest of the older versions are rarely in use.

![Used Solidity Versions](/img/2025/survey/Slide34.png)

_⚠️ **Important Reminder:** Please make sure to frequently update your code (and compiler) to the latest Solidity version. [Several important bug fixes and security improvements](https://github.com/ethereum/solidity/blob/develop/docs/bugs_by_version.json) are added in the newer versions!_

### Solidity Usage Details

Each year, we learn more about how our community uses Solidity by analyzing responses to our survey on Solidity usage trends:

#### CLI

We asked the participants whether they invoke the compiler binary directly on the command line, and 76.6% denied it ([almost a 17% increase since last year](https://soliditylang.org/img/2024/survey/Slide31.png)), whereas 23.4% confirmed that they do. This distribution has had a major shift this year.

![Using the compiler directly](/img/2025/survey/Slide35.png)

When using the compiler on the command line, 67.1% prefer the CLI over Standard JSON for scripting. This number is [8.2% greater than last year](https://soliditylang.org/img/2024/survey/Slide32.png).

![Standard JSON vs CLI](/img/2025/survey/Slide36.png)

When asked how disruptive changes in CLI options and outputs would be for respondents, 64.7% responded with "okay" ([almost identical to last year](https://soliditylang.org/img/2024/survey/Slide33.png)) and 16.3% with "Not disruptive at all".

However, 19% deem these changes as disruptive, increasing almost 10% compared to last year.

![Disruptiveness of CLI changes](/img/2025/survey/Slide37.png)

#### Old EVM versions

While 26.3% of the overall respondents still rely on old EVM versions, a majority of 73.7% claim that they do not need compiler support for older EVM versions anymore, [increasing ever so slightly since last year](https://soliditylang.org/img/2024/survey/Slide34.png).

![Support for older EVM versions](/img/2025/survey/Slide38.png)

Among those who rely on older versions, 8% still rely on deprecated EVM versions. This number is on a desired [downward trend since last year](https://soliditylang.org/img/2024/survey/Slide35.png).

![EVM version usage breakdown](/img/2025/survey/Slide39.png)

#### ABIEncoderV1

While 61.7% do not use ABIEncoderV1, only 3.8% know about it and use it. 34.5% do not seem to be aware of its existence or what it does, [increasing slightly compared to the previous year](https://soliditylang.org/img/2024/survey/Slide37.png).

![Usage of ABIEncoderV1](/img/2025/survey/Slide40.png)

#### SMTChecker

74.1% of total respondents have never used the SMTChecker. 19.5% have tried it, and 6.4% use it frequently. You can learn more about the SMTChecker [here](https://docs.soliditylang.org/en/latest/smtchecker.html).

Although the overall usage pattern remains the same across the previous years, the percentage of users who use it frequently has increased slightly this year.

![Usage of SMTChecker](/img/2025/survey/Slide41.png)

#### The IR compilation pipeline

We asked the participants again this year whether they use the new IR pipeline for compilation, and although slightly lower than last year, 46.4% still do not know what `via-IR` is. This number is on a downtrend over the years, implying a rise in awareness about the IR pipeline in the user community.

24.4% use the IR pipeline already, whereas 29.2% are yet to try it. Last year, we wrote [an explainer blog post on `via-ir`](https://soliditylang.org/blog/2024/07/12/a-closer-look-at-via-ir/). Give it a read to learn more about what it is and why you should be using it to compile your contracts.

![Usage of via-IR](/img/2025/survey/Slide42.png)

When asked which issues are hindering the users from compiling their contracts `via-IR`, 19.3% marked the long compilation times as the reason, and 18.9% claimed that there is no need or real use-cases for it yet.

While 13% are still waiting for the IR pipeline to become the default, 11.5% aren't yet sure about what's keeping them from using it.

Some more issues include stability/security concerns (9%, almost half compared to last year), verification/compilation failures (6.8%), and insufficient docs (5.6%).

![via-IR concerns](/img/2025/survey/Slide43.png)

When asked about the time taken to compile the contract's code using the via-IR pipeline, the majority of the respondents indicated that it takes anywhere between 1 to 10 minutes, [just like last year](https://soliditylang.org/img/2024/survey/Slide40.png).

Some users also reported that it can take anywhere from 15 minutes to up to 50 minutes.

Please note that while analysing this data, it should be taken into account that the data also depends on the users' hardware capabilities and specifications.

![Compilation times using via-IR](/img/2025/survey/Slide44.png)

#### Metadata publication

When asked whether participants publish their metadata output on IPFS, we have marked a [huge change in the results compared to last year](https://soliditylang.org/img/2024/survey/Slide42.png).

67.1% of respondents stated that they do not publish the metadata of their smart contracts, which has gone up significantly from 30.3% last year.

The percentage of users who publish their metadata went down from 55.2% to 14.9% this year. 18.1% still don’t know what this means.

![Metadata publication](/img/2025/survey/Slide45.png)

#### Sourcify

When asked about Sourcify usage, 17.4% of all respondents use Sourcify for smart contract verification ([slight increase compared to last year](https://soliditylang.org/img/2024/survey/Slide43.png)), while 26.9% claim to not use it.

55.7% don’t know what Sourcify is, which is quite similar to last year.

![Sourcify](/img/2025/survey/Slide46.png)

This year, there was [a significant increase since last year](https://soliditylang.org/img/2024/survey/Slide44.png) in users who use Sourcify via Foundry (35%), followed by 34.2% via Hardhat, and 14.5% via Remix. 12.8% use it via Sourcify directly. To learn more about Sourcify, visit [sourcify.dev](https://sourcify.dev/).

![Main way of using Sourcify](/img/2025/survey/Slide47.png)

#### `appendCBOR: false` or `bytecodeHash: none`

60.9% of users do not know what `appendCBOR: false` or `bytecodeHash: none` is, whereas 27.9% know but do not use it. A small portion, equal to 11.2%, uses it either frequently or sometimes.

The usage pattern is [similar to last year](https://soliditylang.org/img/2024/survey/Slide45.png).

![appendCBOR or bytecodeHash](/img/2025/survey/Slide48.png)

#### Flattening contracts

48.8% of total respondents do not flatten their contracts, whereas 25% do. 26.2% do not know what that is.

Most of the users who flatten their contracts mentioned that they do so for the ease of verification (50%), followed by manual reviews (27%), and ease of debugging (16.5%).

![Flattening of contracts](/img/2025/survey/Slide49.png)

![Purpose of flattening](/img/2025/survey/Slide50.png)

### Other EVM Networks

More than half of all respondents (62.3%) use Solidity outside of [Ethereum Mainnet](https://ethereum.org/en/glossary/#mainnet) and [testnets](https://ethereum.org/en/glossary/#testnet).

When asked which other networks they deploy their smart contracts on, an equal number of participants (14.6%) responded with Base and Polygon (formerly Matic Network).

Other often mentioned blockchains include Arbitrum (14.3%), Optimism (12.0%),  Binance (8.4%), zkSync (7.1%), Avalanche (6.5%), and more, as shown in the chart below.

![Deployment To Other Chains](/img/2025/survey/Slide51.png)

![Deployment To Other Chains Breakdown](/img/2025/survey/Slide52.png)

### Other Smart Contract Languages

We were curious to know which other smart contract languages Solidity users and devs prefer, and here's what we found:

A majority of 37.9% of respondents stated that they don't use any languages other than Solidity.

[Yul](https://docs.soliditylang.org/en/latest/yul.html), an intermediate language for Solidity, continues to rank as the most used smart contract language other than Solidity with 18.5% voters; [a slight decrease compared to last year](https://soliditylang.org/img/2024/survey/Slide49.png).

[Vyper](https://docs.vyperlang.org), a Python-based EVM language, ranks as the second most used language other than Solidity with 14.4%.

This trend is similar to last year, except for a slight increase.

[Cairo](https://www.cairo-lang.org/docs/) (8.8%) and [Huff](https://docs.huff.sh) (8.1%) have almost an equal number of users among the survey audience.

We added a new choice to the list this year, [Noir](https://noir-lang.org/), that was opted for by 4.3% of the respondents.

[Sway](https://fuellabs.github.io/sway/) (1.4%) and [Fe](https://fe-lang.org/docs/) (1.4%) share a place in the list.

![Other Smart Contract Languages](/img/2025/survey/Slide53.png)

![header 4](/img/2024/survey/header4.png)

## Solidity Developer Experience

In this section of the survey, we will be going through the developer experience of our user community.

We asked about the overall improvement in the Solidity developer experience.

66.8% of all respondents generally believe that it has improved in the last year, with 24.2% even believing it was a major improvement.

Only 1.5% of the respondents believe that the developer experience has gotten worse.

![Solidity Developer Experience](/img/2025/survey/Slide55.png)

### Recurring Issues

When asked if the participants encounter recurring issues, 60.7% of the total respondents said that they do not come across the same or similar issues multiple times when developing in Solidity.

Among the 39.3% that encounter recurring issues, Stack too deep issues are encountered most frequently, followed by debugging issues, bytecode size limit, and optimiser-related issues.

![Recurring issues](/img/2025/survey/Slide56.png)

![Recurring issues breakdown](/img/2025/survey/Slide57.png)

_ℹ️ **Note:** On the topic of debugging issues, we would like to remind you about the ethdebug standards development working group, an initiative aimed at defining a common debugging data format for languages built on top of the EVM: [ethdebug](https://github.com/ethdebug/format/).

We encourage all developers working on such tools to join the working group. The group has regular bi-weekly meetings and coordinates via the [ethdebug Matrix channel](https://matrix.to/#/#ethdebug:matrix.org)._

### Getting Started with the Compiler

53.8% of respondents find it "okay" to get started with the Solidity compiler, whereas 43.6% find it very easy.

As low as 2.6% voted getting started with the compiler as "difficult". When asked what made it difficult to get started, some mentioned the docs as an issue.

![Getting Started](/img/2025/survey/Slide58.png)

### Most liked Aspects/Features & Pain Points

25% of respondents most like Solidity's similarity to other programming languages. This option is known to rank highest from [last year's results](https://soliditylang.org/img/2024/survey/Slide55.png) as well.

Other most liked aspects include its simplicity (20.5%), ease of learning the language (18.3%), and its syntax (11.6%).

Some also consider static typing (10.9%) and the ease of reading (10.4%) as the most likable aspects.

![Most liked aspect](/img/2025/survey/Slide59.png)

This year, 21.8% of the respondents opted for mappings as their most liked feature, followed by 20.4% for contracts as objects. Although these features have ranked as most liked in the same order two years in a row, this year's percentages are quite [lower in comparison to last year](https://soliditylang.org/img/2024/survey/Slide56.png).

Modifiers (15.1%), `require` with custom errors (13.7%), and Inline Assembly (9.8%) were often mentioned as well.

Some users reported user-defined types (5.8%), dynamic arrays (3.9%), transient storage (3.4%), and `using for` (2.6%) as their most liked features. 

![Most liked feature](/img/2025/survey/Slide60.png)

We asked the participants once again about their biggest pain points with Solidity, and here's what we found:

Stack-too-deep errors ranked the highest again this year with 31.9%% % of all votes, albeit at a much lower percentage than [last year](https://soliditylang.org/img/2024/survey/Slide57.png), followed by bytecode size limit (19.6%), a new addition, missing memory optimizations (19.6%), and compiler performance (10%).

8.3% of respondents said that redundant checks (e.g., in checked arithmetic) are their biggest issue.

A little over 9% selected “OTHER” and specified some of their most significant pain points, such as error reporting and a lack of a better debugging tool.

![Solidity Pain Points](/img/2025/survey/Slide61.png)

### Documentation

When asked if the participants found the official documentation helpful, there was a rise in the survey respondents who stated that the Solidity documentation was helpful (79.8%), followed by 17.7% who considered it somewhat useful.

As low as 2.5% voted that they do not find the docs useful at all, reducing ever so slightly compared to the past year.

Ideas for improvement most prominently ask for more code examples but also more in-depth docs for Yul and assembly, better in-docs search and navigation, and overall better UI/UX.

![Solidity Documentation Usefulness](/img/2025/survey/Slide62.png)

### High-Impact Compiler Bugs

Like previous years, we were curious to find out whether Solidity developers had been affected by any of the high-impact compiler bugs (codegen bugs that are announced with [Security Alerts](https://blog.soliditylang.org/category/security-alerts/) on the Solidity blog).

While 94.7%, quite similar to last year, said they haven't been affected, 5.3% claimed that they were. 

Below is the distribution of the bugs (and the corresponding number of users impacted) reported by the 34 participants who were impacted by high-impact compiler bugs:

- AbiEncodeCallLiteralAsFixedBytesBug: 6
- VerbatimInvalidDeduplication: 6
- MissingSideEffectsOnSelectorAccess:	6
- InlineAssemblyMemorySideEffects	6
- KeccakCaching:	5
- StorageWriteRemovalBeforeConditionalTermination:	5
- DirtyBytesArrayToStorage:	4
- SignedImmutables:	4
- AbiReencodingHeadOverflowWithStaticArrayCleanup	4
- FullInlinerNonExpressionSplitArgumentEvaluationOrder	3
- DataLocationChangeInInternalOverride	3
- NestedCalldataArrayAbiReencodingSizeValidation	3
- ABIDecodeTwoDimensionalArrayMemory	3
- UserDefinedValueTypesBug	2
- I don't remember.	9
- OTHER: 1 ("In solidity 0.8.16, I had an issue when removing an item from mapping. It didn't remove the position, just zero it out.")

Please note that the above follow-up question about the name of the high-impact compiler bugs was a multiple-choice question. 

### External Libraries

With a slight bump compared to the past years, the majority of the survey respondents (45.5%) stated that they use external libraries for purposes such as proxy pattern, contract splitting, and in order of most to least mentioned use case.

44.2% have reported that they do not use them at all, whereas 10.3% remain unaware of what they are or what they are being used for.

![External libraries](/img/2025/survey/Slide64.png)

![External libraries: use cases](/img/2025/survey/Slide65.png)

![header 5](/img/2024/survey/header5.png)

## Language Design & Upcoming Features

In the following section of the survey, we will take you through the insights we drew from asking our participants about their thoughts on and involvement in the Solidity language design updates and efforts.

### Most Anticipated Feature(s)

There seems to have been a [major shift since last year](https://soliditylang.org/img/2024/survey/Slide63.png) in the most anticipated feature, with generics going down from 23.2% to 7.6% this year.

With that, the most anticipated update this year is the elimination of stack-too-deep(18.2%), followed by 16.9% reporting that they look forward to better debugging tools.

Other features most anticipated by survey respondents in their descending order are:

- Gas optimisations (13.2%)
- Support for decimal numbers & Dynamic Memory Arrays (12.2%)
- Resizable dynamic memory arrays (8.7%)
- EVM Object Format (7.7%)

...and more as shown in the chart below.

![Most anticipated features](/img/2025/survey/Slide67.png)

### Feedback on New Features/Improvements

Like the previous two years, we asked the participants about their thoughts on functional elements in Solidity, and the overall feedback remains similar, with a small change in the individual numbers:

While a majority of 51.7% of users believe that functional elements in Solidity, such as Lambda functions, are great, 14.6% maintain their position against them, and 33.6% are indifferent towards them.

![Functional Elements](/img/2025/survey/Slide68.png)

Last year, [we asked the participants about their thoughts on the EIP-1153: "Transient Storage"](https://soliditylang.org/img/2024/survey/Slide67.png), and the results were enlightening.

This year, we asked once again whether they need complex types in transient storage. The number of respondents who want the feature has halved from 40.4% [last year](https://soliditylang.org/img/2024/survey/Slide68.png) to 20.2%. However, we saw a rise to 48.1% in those who stated their indifference, while 31.7% asserted that they do not need complex types.
    
![Transient Storage: complex types](/img/2025/survey/Slide69.png)

We also introduced a few new questions to this section for the 2024 survey. Let's see what we found out.
    
When asked about the preference between traits/typeclasses and inheritance, a majority (37.8%) of the survey audience reported that they aren't familiar with the concept, whereas only 25.9% voted for traits/typeclasses, and the rest (36.3%) asserted that they prefer inheritance.

![Traits/typeclasses](/img/2025/survey/Slide70.png)

We followed up with how difficult the respondents deem the process of rewriting the codebase with a traits-style system on a scale of 1-10.

39.4% of respondents assigned it a medium difficulty level of 5. A total of 20.6% of the audience have assigned it a high difficulty, anywhere between 8-10. On the contrary, as low as 7.7% of people marked it as a low-difficulty task to replace the usage of inheritance with a traits style system.

It is fair to conclude that the majority considers this either as a non-trivial or a highly difficult and involving process.

![Inheritance vs. traits difficulty](/img/2025/survey/Slide71.png)

Moving on, we tried gauging the interest in having algebraic datatypes. While more than half (51.4%) of the audience expressed their interest in having such datatypes, only 22.3% remain uninterested. However, as high as 26.3% have no clue what algebraic datatypes are. This allows the team to consider writing more about them on the blog.

![Algebraic Datatypes](/img/2025/survey/Slide71.png)

We were also curious about whether our users have ever tried a language that uses pattern matching, and/or if they would be interested in having this in Solidity.

34% reported that they have used pattern matching before and are interested in having the feature in Solidity. However, 26.4% of users stated that they haven't used it, followed by 20.9% who have used it but do not require the feature, and lastly, 18.8% who do not understand the question.

![Pattern Matching](/img/2025/survey/Slide73.png)

We asked the respondents about the importance of maintaining CREATE2 compatibility for salted creates in Solidity between EOF and legacy EVM.

While a majority of 42.6% affirm that it does not impact their work, 23.1% still deem it as pivotal to the work that they do. 34.3%, however, state that they are not familiar with the concept.

![CREATE2 Compatibility](/img/2025/survey/Slide74.png)

As a follow-up, we enquired about the extent of annoyance around providing an explicit salt on each contract creation.

47.3% confirmed that they are neutral to this possible change, followed by 26.4% assuring that it would not be annoying at all. However, 20.3% of respondents asserted that it would be quite annoying for them to have to provide an explicit salt on each contract creation. 6.1% of the audience remains unsure.

![Specifying Salt on Contract Creation](/img/2025/survey/Slide75.png)

### Language Design Related Efforts

Once again, we checked with the respondents whether they have or continue to participate in the language design efforts, and here's what we found:

- More than 85% of respondents stated that they do not participate because they are either too busy, uninterested/underqualified, or do not know how to participate.
- 14.8% of the respondents said that they regularly participate in language design efforts either by joining the calls, the forum discussions, or by proposing new features or language changes on GitHub.

At Solidity, we have and would like to continue to make it easier for our community to participate more actively in these discussions and feel empowered enough to contribute to the language design decisions.

![Language design efforts](/img/2025/survey/Slide76.png)

![header 6](/img/2024/survey/header6.png)

## Solidity Developer Community

### Staying up-to-date

A slightly new trend from the previous years is that this year, most people reported that they like to stay up-to-date about Solidity versions, security alerts, and announcements by following the Solidity [Twitter](https://twitter.com/solidity_lang) or [Mastodon](https://fosstodon.org/@solidity), followed by the [Solidity blog](https://blog.soliditylang.org/).

Another often mentioned means of information is the [Solidity GitHub Releases page](https://github.com/ethereum/solidity/releases).

Interestingly, about 21.2% claim not to be doing any of the above.

As part of “other”, respondents specified several community-based means to stay up-to-date:

- Cyfrin Updraft course on Solidity
- "Crypto influencers" / Popular Solidity developers
- Discord servers
- Google
- Crypto Twitter / Community chats / Farcaster channels
- Newsletters
- Crypto blogs
- [Solidity docs](https://docs.soliditylang.org/en/latest/)
- [Solidity website](https://soliditylang.org/)
- Tutorials on YouTube
- Reddit
- VSCode Notifications
- "Week in Ethereum News" Newsletter

![Means To Stay Up-To-Date](/img/2025/survey/Slide78.png)

### Interaction with Other Solidity Developers

More than half of respondents (53.8%) interact with other Solidity developers, whereas 31.1%  admitted that they rarely interact with other Solidity devs.

With a slight increase from last year, a smaller portion of that chart (17.5%) does not interact with other Solidity developers at all.

![Developer Interaction](/img/2025/survey/Slide79.png)

Similar to previous years, we wanted to conclude the survey with a question that helps us understand the community's confidence in the work of the Solidity team. We asked the participants whether they agree or disagree with the following statements:

**Statement 1:** I feel welcome in the Solidity developer community.

A majority of 42.6% of respondents agree that they feel welcome in the Solidity developer community, and 26% somewhat agree with the statement. However, over 6% still feel unwelcome in the community, whereas 25% aren't sure about how they feel.

**Statement 2:** I am confident in the work of the Solidity core team.

About 78.3% either fully or somewhat agree that they feel confident in the work of the Solidity team. However, 7% of the survey audience does not agree with this statement. As many as 14.6% remain unsure.

**Statement 3:** The Solidity team understands my needs as a developer.

A majority of 64.8% either agree or somewhat agree with the above statement. While 27.4% do not know how they feel about this, 77.3% of the audience generally disagrees.

**Statement 4:** The options for how to contribute ideas or feedback to Solidity are clear to me.

This year, as high as 28.4% have stated that they "don't know," meaning that the ways to contribute ideas and feedback aren't clear to them.

Almost 47% of the survey audience generally agrees that the options for how to contribute ideas or feedback to the team are clear to them. However, quite a significant portion of the audience (24.6%) also disagrees with the statement.

**Statement 5:** I am receiving adequate feedback from the Solidity team on issues raised on GitHub and/or forum posts.

As high as 50.3% of the audience does not know how to feel about this statement.

While 40.8% of respondents are generally satisfied with the feedback and inputs they get from the Solidity team regarding their contributions, a total of 8.8% remain in disagreement with this statement.

The results of this “community and Solidity team confidence ranking” are quite consistent with the results from 2023.

![Community and Solidity Team Confidence Ranking](/img/2025/survey/Slide80.png)

We added another question at the end of the survey, albeit a little later into the response collection process, about affiliation with projects with significant usage and/or TVL. We surveyed about 480 participants on the following questions:

**Do you work on a project with significant usage and/or with a significant amount of funds handled or locked by it?**
Out of 480, 417 participants responded to it, out of which a majority of 45% reported that they do not work on such a project, almost 30% did not want to share, and roughly 25% confirmed their association with a high usage/TVL project.

![Projects with usage/TVL](/img/2025/survey/Slide81.png)

## Kudos to you!

Last but not least, we would like to extend a big thanks to all of you for completing the survey and giving us feedback. We hope that our survey results continue to be just as valuable to the Solidity ecosystem and community as they are to us.

We aim to continue collecting your inputs and improving Solidity as an open-source project.

To stay up-to-date with all Solidity-related announcements and updates, make sure to:

- Follow Solidity on [Twitter](https://twitter.com/solidity_lang) or [Mastodon](https://fosstodon.org/@solidity).
- Join the language design discussions in the [Solidity forum](https://forum.soliditylang.org/) or provide us feedback there.
- Follow announcements and security alerts on the [Solidity blog](https://blog.soliditylang.org/).
- Follow and ⭐ the [Solidity repo on Github](https://github.com/ethereum/solidity).

---

_All graphs can be found [here](https://docs.google.com/presentation/d/16eAwMso-t8fJma-4sxUglD5Xkqrj7uO_aoIbFVwfojs/edit?usp=sharing). The raw and analyzed data can be found [here](https://docs.google.com/spreadsheets/d/1ptivw3pC-IMJ9Bhl6lViyKd-NTEDZGhE3-bwBFtMwtE/edit?usp=sharing)._
