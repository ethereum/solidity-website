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
interface EventFrontmatter {
  title: string
  location: string
  startDate: string
  endDate: string
  imageSrc?: string
  previewLinks?: Link[]
  ctaLinks?: Link[]
  youtube?: string
  coordsOverride?: [Lat, Long]
  mapLabel?: string
}

// where...
interface Link {
  label: string
  href: string
}
type Lat = number
type Long = number
```

(See [src/interfaces.ts](src/interfaces.ts) for canonical `EventFrontmatter` interface.)

The date properties `startDate` and `endDate` are used to display recent events and next upcoming events on the homepage.

### Optional front matter properties for events

- `imageSrc` is the relative path to the image asset to be used as the hero banner.
- `previewLinks` are used to display button links on the event _preview_ cards shown on the homepage. It accepts a list of `Link` objects, each with a `label` and `href`.
- `ctaLinks` are call-to-action button links displayed in the hero and bottom of an event _page_. The first one listed will be styled as a primary solid button; any additional will be styled as a secondary outline button. It accepts a list of `Link` objects, each with a `label` and `href`.
- `youtube` accepts a YouTube video link or video ID, and embeds it below the hero of the event page. It accepts any of the following formats:
  - Standard format: `https://youtube.com/watch?v=1234567890`
  - Embed format: `https://www.youtube.com/embed/1234567890`
  - Shortened format: `https://youtu.be/1234567890`
  - Just the video ID: `1234567890`
- `coordsOverride` can be used to provide a latitude and longitude to override the map location being rendered. See below for more info.
- `mapLabel` can be provided to customize the `<h2>` label shown before an embedded map.

### Location and embedded map

The `location` property is used to display a map on the event page, fetched from [OpenStreetMap](https://www.openstreetmap.org/). If the resulting location is inaccurate or not precise enough, `coordsOverride` can optionally be provided to override this result. If no results are found, the map will not be displayed.

For virtual/remote events, use `location: Remote`, and the map will not be displayed.

_Note: Package `leaflet-geosearch` is being used for geocoding. Using older version `3.6.1` intentionally to avoid the addition of an unnecessary Google dependency added in later versions._

### Event example

```md
---
title: Solidity Summit 2023
location: Istanbul, Turkey
startDate: 2023-11-16
endDate: 2023-11-16
imageSrc: /assets/solidity_summit_2023.png
ctaLinks:
  - label: Speak
    href: https://link.to.speaker.application
  - label: Attend
    href: https://link.to.attendee.application
previewLinks:
  - label: Join us
    href: /event/solidity-summit-2023/
---

Intro text

## First header as h2

...
```

### Event example using `coordsOverride`

```md
---
title: Solidity Summit 2023
location: Istanbul, Turkey
startDate: 2023-11-16
endDate: 2023-11-16
imageSrc: /assets/solidity_summit_2023.png
ctaLinks:
  - label: Speak
    href: https://link.to.speaker.application
  - label: Attend
    href: https://link.to.attendee.application
previewLinks:
  - label: Join us
    href: /event/solidity-summit-2023/
coordsOverride:
  - 41.0082
  - 28.9784
---

Intro text

## First header as h2

...
```

Note that `coordsOverride` is a tuple of two numbers, representing latitude and longitude, respectively. Positive numbers represent north and east, while negative represent south and west.

## Blog entries

- Blog posts should be markdown files, stored in the `/src/posts` folder
- Filename must take the pattern of `YYYY-MM-DD-chosen-post-title.md`
- Front matter should take the shape of the following interface:

  ```ts
  interface BlogPostFrontmatter {
    layout?: string
    title: string
    date: string
    author: string
    category: Category
    image?: string
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
- A custom Open Graph (OG) image can be provided for share links using one of two methods (Note: `.svg` files are not supported for OG images):
  1. Locally hosted image:
    - Save the image to the `/public/assets/` directory
    - Add `image: /assets/filename.png` to the front matter of your blog post
  2. External image:
    - Add `image: https://doma.in/path/to/image.png` to the front matter of your blog post


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
