![](./public/assets/solidity-logo.svg)

# Solidity Lang Website

Welcome to the codebase for the Solidity Lang website!

Homepage: [https://soliditylang.org](https://soliditylang.org)

Note: This is the codebase for the Solidity **website** only. For the Solidity Lang codebase please see [ethereum/solidity](https://github.com/ethereum/solidity).

## Soliditylang.org website stack

- [Node.js](https://nodejs.org/)
- [Yarn package manager](https://yarnpkg.com/cli/install)
- [React](https://reactjs.org/) - A JavaScript library for building component-based user interfaces
- [Typescript](https://www.typescriptlang.org/) - TypeScript is a strongly typed programming language that builds on JavaScript
- [Chakra UI](https://chakra-ui.com/) - A UI library
- [GitHub Actions](https://github.com/features/actions) - Manages CI/CD, and issue tracking

## Local environment setup

Ensure you're using the correct version of Node.js:

```bash
nvm use
```

Or see [.nvmrc](.nvmrc) for correct version.

Install dependencies:

```bash
yarn
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

## API keys (optional)

This site uses a read-only API key to fetch the latest version of the Solidity compiler, and the GitHub star count for the `ethereum/solidity` repo from the GitHub API. To enable this functionality locally, first create your `.env` file:

```bash
cp .env.example .env
```

Go to [GitHub Personal Access Tokens](https://github.com/settings/tokens?type=beta) and generate a "fine-grained" personal access token, with "Public Repositories (read-only)" selected and nothing else. Copy the token and paste it into your `.env` file for `GITHUB_TOKEN_READ_ONLY`.

## Code structure

| Folder                   | Primary use                                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| `/src`                   | Main source folder for development                                                              |
| `/src/components`        | React components that do not function as standalone pages                                       |
| `/src/events`            | Markdown files for **events**                                                                   |
| `/src/hooks`             | Custom React hooks                                                                              |
| `/src/pages`             | React components that function as standalone pages and will create URL paths                    |
| `/src/posts`             | Markdown files for **blog posts**                                                               |
| `/src/styles`            | Custom style declarations                                                                       |
| `/src/theme`             | Declares site color themes, breakpoints and other constants (try to utilize these colors first) |
| `/src/theme/foundations` | Theme foundations imported by theme config at `/src/theme`                                      |
| `/src/utils`             | Custom utility scripts                                                                          |
| `/src/constants.ts`      | Declares all constants that are used throughout the site.                                       |
| `/src/interfaces.ts`     | Declared interfaces and types for to be used throughout the site                                |
| `/public`                | Storage for assets that will be available at URL path after build                               |
| `/public/assets`         | General image assets                                                                            |
| `/public/img`            | Image assets used in blog posts                                                                 |

## Events

Front matter from markdown files contained within `/src/events` is used to populate event cards, using the following interface:

```ts
export interface EventFrontmatter {
  title: string
  location: string
  startDate: string
  endDate: string
  imageSrc?: string
  links?: EventLink[]
}
```

(See [src/interfaces.ts](src/interfaces.ts) for canonical `EventFrontmatter` interface.)

The date properties are used to display recent events and next upcoming events on the homepage.

### Event example

```md
---
title: Solidity Summit 2023
location: Istanbul, Turkey
startDate: 2023-11-16
endDate: 2023-11-16
imageSrc: /assets/solidity-summit-2023.png
links:
  - label: Join us
    href: https://summit.soliditylang.org
---

Intro text

## First header as h2

...
```

## Blog entries

- Blog posts should be markdown files, stored in the `/src/posts` folder
- Filename must take the pattern of `YYYY-MM-DD-chosen-post-title.md`
- Front matter should take the shape of the following interface:

  ```ts
  export interface BlogPostFrontmatter {
    layout?: string
    title: string
    date: string
    author: string
    category: Category
  }
  ```

  (See [src/interfaces.ts](src/interfaces.ts) for canonical `BlogPostFrontmatter` interface.)

- `Category` must take one of the following values:

  - `Releases`
  - `Security Alerts`
  - `Announcements`
  - `Explainers`

  (See [src/constants.ts](src/constants.ts) and [src/interfaces.ts](src/interfaces.ts) for canonical `Category` enum.)

- `title` property will be displayed automatically as an `<h1>` (`#` in markdown), and should not be included in the markdown body—start document header levels from `<h2>` (`##`)
- `date` property should be in `YYYY-MM-DD` format
- MDX/JSX is not currently supported
- Images can be placed in a corresponding folder within `/public/img` and references using `![alt text](/img/chosen-folder/image-name.png)`

### Blog post example

```md
---
title: 'Solidity 0.8.20 Release Announcement'
date: '2023-05-10'
author: Solidity Team
category: Releases
---

Intro text

## First header as h2

...
```

## Adding internal links

When linking to content internal to this repo, relative paths should be used instead of absolute paths. This ensures proper routing with Next.js, and avoids unintentional page refreshes.

This includes links to blog posts, which now live under https://soliditylang.org/blog/ and should be referenced using `/blog/YYYY/MM-DD/post-name/`, _without_ `https://soliditylang.org`.

This does NOT include links to the docs, which are located at a different subdomain of https://docs.soliditylang.org. These should be referenced using their full URL, including `https://docs.soliditylang.org`.

## Learn more about the stack

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Chakra UI Documentation](https://chakra-ui.com/docs/getting-started) - learn about Chakra UI features and API.
