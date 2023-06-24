import type { NavLink, SocialLink } from '@/interfaces'
import { FaGithub, FaGitter, FaMastodon, FaTwitter } from 'react-icons/fa'
import { SiMatrix } from 'react-icons/si'
import yaml from 'js-yaml'

export const FAVICON_IMAGE_PATH = '/assets/favicon.ico'
export const DEFAULT_IMAGE_PATH = '/assets/siteicon.svg'
export const SITE_NAME = 'Solidity Programming Language'
export const SITE_URL = 'https://soliditylang.org/'
export const TWITTER_HANDLE = '@solidity_lang'

// Page paths
export const BLOG_PATH = '/blog'
export const PAGE_PATH = '/page'
export const CATEGORY_PATH = '/category'
export const BLOG_CATEGORY_PATH = `${BLOG_PATH}${CATEGORY_PATH}`
export const BLOG_PAGE_PATH = `${BLOG_PATH}${PAGE_PATH}`
export const DOCS_URL = 'https://solidity-docs-dev.readthedocs.io' // TODO: Revert back to 'https://docs.soliditylang.org/' for production launch
export const FORUM_URL = 'https://forum.soliditylang.org/'
export const GITHUB_URL = 'https://github.com/ethereum/solidity'
export const GITTER_URL = 'https://gitter.im/ethereum/solidity'
export const USE_CASES_PATH = '/use-cases'
export const CONTRIBUTE_PATH = `${DOCS_URL}/en/latest/contributing.html`
export const ABOUT_PATH = '/about/'
export const TWITTER_URL = `https://twitter.com/${TWITTER_HANDLE.split('@')[1]}`
export const MASTODON_URL = 'https://fosstodon.org/@solidity'
export const MATRIX_URL = 'https://matrix.to/#/#ethereum_solidity:gitter.im'

export const NAV_HEIGHT = 72
export const FULL_LOGO_HEIGHT = 176
export const NAV_LINKS: NavLink[] = [
  { name: 'Blog', href: BLOG_PATH },
  { name: 'Documentation', href: DOCS_URL },
  { name: 'Use cases', href: USE_CASES_PATH },
  { name: 'Contribute', href: CONTRIBUTE_PATH },
  { name: 'About', href: ABOUT_PATH },
  { name: 'Forum', href: FORUM_URL },
]

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', href: GITHUB_URL, Icon: FaGithub },
  { name: 'Twitter', href: TWITTER_URL, Icon: FaTwitter },
  { name: 'Mastodon', href: MASTODON_URL, Icon: FaMastodon },
  { name: 'Matrix', href: MATRIX_URL, Icon: SiMatrix },
  { name: 'Gitter', href: GITTER_URL, Icon: FaGitter },
]

export const LATEST_SOLIDITY_RELEASE_URL =
  'https://api.github.com/repos/ethereum/solidity/releases/latest'
export const SOLIDITY_REPO_STARGAZERS_URL =
  'https://api.github.com/repos/ethereum/solidity'

export const EVENTS_DIR = 'src/events'
export const BLOG_DIR = 'src/posts'

export const MATTER_OPTIONS = {
  engines: {
    yaml: (s: any) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
  },
}

const RELEASES = 'Releases' as const
const SECURITY_ALERTS = 'Security Alerts' as const
const ANNOUNCEMENTS = 'Announcements' as const
const EXPLAINERS = 'Explainers' as const

export const CATEGORIES_URL_MAP = {
  [RELEASES]: `${BLOG_CATEGORY_PATH}/releases`,
  [SECURITY_ALERTS]: `${BLOG_CATEGORY_PATH}/security-alerts`,
  [ANNOUNCEMENTS]: `${BLOG_CATEGORY_PATH}/announcements`,
  [EXPLAINERS]: `${BLOG_CATEGORY_PATH}/explainers`,
}

export const CATEGORY_URLS = [
  'releases',
  'security-alerts',
  'announcements',
  'explainers',
]

export const URL_CATEGORIES_MAP = {
  releases: RELEASES,
  'security-alerts': SECURITY_ALERTS,
  announcements: ANNOUNCEMENTS,
  explainers: EXPLAINERS,
}

export const MAX_POSTS_PER_PAGE = 10 as const
export const FEATURED_POSTS = 1 as const
