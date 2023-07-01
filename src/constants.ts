import type { NavLink, SocialLink, UseCase } from '@/interfaces'
import { FaGithub, FaGitter, FaMastodon, FaTwitter } from 'react-icons/fa'
import { SiMatrix } from 'react-icons/si'
import yaml from 'js-yaml'

// Site constants
export const SITE_NAME = 'Solidity Programming Language' as const
export const SITE_URL = 'https://soliditylang.org/' as const
export const DEFAULT_IMAGE_PATH = '/assets/siteicon.svg' as const
export const FAVICON_IMAGE_PATH = '/assets/favicon.ico' as const
export const TWITTER_HANDLE = '@solidity_lang' as const

// Navigation constants
export const NAV_HEIGHT = 72 as const
export const BLOG_PATH = '/blog' as const
export const DOCS_URL = 'https://solidity-docs-dev.readthedocs.io' as const // TODO: Revert back to 'https://docs.soliditylang.org/' for production launch
export const USE_CASES_PATH = '/use-cases' as const
export const ABOUT_PATH = '/about' as const
export const EVENTS_PATH = '/events' as const
export const CONTRIBUTE_PATH =
  `${DOCS_URL}/en/latest/contributing.html` as const
export const FORUM_URL = 'https://forum.soliditylang.org/' as const
export const NAV_LINKS: NavLink[] = [
  { name: 'Blog', href: BLOG_PATH },
  { name: 'Documentation', href: DOCS_URL },
  { name: 'Use cases', href: USE_CASES_PATH },
  { name: 'Contribute', href: CONTRIBUTE_PATH },
  { name: 'About', href: ABOUT_PATH },
  { name: 'Forum', href: FORUM_URL },
]

// Social links
export const GITHUB_URL = 'https://github.com/ethereum/solidity' as const
export const TWITTER_URL = `https://twitter.com/${
  TWITTER_HANDLE.split('@')[1]
}` as const
export const MASTODON_URL = 'https://fosstodon.org/@solidity' as const
export const MATRIX_URL =
  'https://matrix.to/#/#ethereum_solidity:gitter.im' as const
export const GITTER_URL = 'https://gitter.im/ethereum/solidity' as const
export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', href: GITHUB_URL, Icon: FaGithub },
  { name: 'Twitter', href: TWITTER_URL, Icon: FaTwitter },
  { name: 'Mastodon', href: MASTODON_URL, Icon: FaMastodon },
  { name: 'Matrix', href: MATRIX_URL, Icon: SiMatrix },
  { name: 'Gitter', href: GITTER_URL, Icon: FaGitter },
]

// Data fetching constants
export const LATEST_SOLIDITY_RELEASE_URL =
  'https://api.github.com/repos/ethereum/solidity/releases/latest' as const
export const SOLIDITY_REPO_STARGAZERS_URL =
  'https://api.github.com/repos/ethereum/solidity' as const

// Markdown parsing
export const MATTER_OPTIONS = {
  engines: {
    yaml: (s: any) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
  },
} as const

// Events related constants
export const EVENTS_DIR = 'src/events' as const

/**
 * Blog related constants
 */
export const BLOG_TITLE = 'Solidity:​log' as const
export const BLOG_POSTS_DIR = 'src/posts' as const
export const PAGE_PATH = '/page' as const
export const BLOG_PAGE_PATH = `${BLOG_PATH}${PAGE_PATH}` as const
export const CATEGORY_PATH = '/category' as const
export const BLOG_CATEGORY_PATH = `${BLOG_PATH}${CATEGORY_PATH}` as const

// Blog categories and mappings
export const RELEASES = 'Releases' as const
export const SECURITY_ALERTS = 'Security Alerts' as const
export const ANNOUNCEMENTS = 'Announcements' as const
export const EXPLAINERS = 'Explainers' as const
export const CATEGORIES_URL_MAP = {
  [RELEASES]: `${BLOG_CATEGORY_PATH}/releases`,
  [SECURITY_ALERTS]: `${BLOG_CATEGORY_PATH}/security-alerts`,
  [ANNOUNCEMENTS]: `${BLOG_CATEGORY_PATH}/announcements`,
  [EXPLAINERS]: `${BLOG_CATEGORY_PATH}/explainers`,
} as const
export const URL_CATEGORIES_MAP = {
  releases: RELEASES,
  'security-alerts': SECURITY_ALERTS,
  announcements: ANNOUNCEMENTS,
  explainers: EXPLAINERS,
} as const

// Displaying blog posts
export const POSTS_PER_PAGE = 10 as const
export const FEATURED_POSTS = 1 as const
export const MAX_WORDS_PER_POST_PREVIEW = 80 as const
export const MAX_POSTS_TO_PREVIEW = 3 as const

export const ETHEREUM_ORG_URL = 'https://ethereum.org' as const
export const USE_CASES: UseCase[] = [
  {
    title: 'Decentralized Finance (DeFi)',
    description:
      'Solidity has played a pivotal role in the rise of DeFi applications built on the Ethereum blockchain. Projects such as Uniswap (decentralized exchange protocol), Aave (decentralized lending platform), and Compound (algorithmic money markets) have extensively used Solidity to create smart contracts that enable various financial services and functionalities.',
    imageSrc: '/assets/use-case-glyph-1.svg',
    learnMoreLink: `${ETHEREUM_ORG_URL}/defi`,
  },
  {
    title: 'Non-Fungible Tokens (NFTs)',
    description:
      'Solidity has been instrumental in the development of NFTs, which have gained significant popularity for digital collectibles, artwork, and unique virtual assets. Projects like CryptoKitties, CryptoPunks, and Rarible have used Solidity to create the smart contracts that power the creation, ownership, and transfer of these one-of-a-kind digital assets.',
    imageSrc: '/assets/use-case-glyph-2.svg',
    learnMoreLink: `${ETHEREUM_ORG_URL}/nft`,
  },
  {
    title: 'Decentralized Autonomous Organizations (DAOs)',
    description:
      'Solidity has enabled the creation of DAOs, which are self-governing organizations that operate on smart contracts. Projects like Aragon and DAOstack have utilized Solidity to build frameworks and tools for creating and managing decentralized organizations, allowing for transparent decision-making and governance.',
    imageSrc: '/assets/use-case-glyph-3.svg',
    learnMoreLink: `${ETHEREUM_ORG_URL}/dao`,
  },
  {
    title: 'Gaming and Virtual Worlds',
    description:
      'Solidity has been employed to develop blockchain-based games and virtual worlds with features like asset ownership, in-game economies, and provable scarcity. Projects like Axie Infinity, Decentraland, and Gods Unchained have leveraged Solidity to create immersive gaming experiences with unique digital assets and player interactions.',
    imageSrc: '/assets/use-case-glyph-4.svg',
  },
  {
    title: 'Supply Chain and Traceability',
    description:
      'Solidity can be used to create smart contracts that enhance transparency and traceability in supply chain management. By recording transactions and verifying the authenticity of products, Solidity-powered smart contracts can help prevent counterfeiting and improve trust in supply chain processes.',
    imageSrc: '/assets/use-case-glyph-5.svg',
  },
]
