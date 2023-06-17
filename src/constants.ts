import type { NavLink, SocialLink } from './types'
import { FaGithub, FaGitter, FaMastodon, FaTwitter } from 'react-icons/fa'
import { SiMatrix } from 'react-icons/si'

export const DEFAULT_IMAGE_PATH = '/assets/siteicon.png'
export const SITE_NAME = 'Solidity Programming Language'
export const SITE_URL = 'https://soliditylang.org/'
export const TWITTER_HANDLE = '@solidity_lang'

// Page paths
export const BLOG_URL = 'https://blog.soliditylang.org/'
export const DOCS_URL = 'https://docs.soliditylang.org/'
export const FORUM_URL = 'https://forum.soliditylang.org/'
export const GITHUB_URL = 'https://github.com/ethereum/solidity'
export const GITTER_URL = 'https://gitter.im/ethereum/solidity'
export const USE_CASES_PATH = '/use-cases/'
export const CONTRIBUTE_PATH = '/contribute/'
export const ABOUT_PATH = '/about/'
export const TWITTER_URL = `https://twitter.com/${TWITTER_HANDLE.split('@')[1]}`
export const MASTODON_URL = 'https://fosstodon.org/@solidity'
export const MATRIX_URL = 'https://matrix.to/#/#ethereum_solidity:gitter.im'

export const NAV_HEIGHT = '4.5rem'
export const NAV_LINKS: NavLink[] = [
  { name: 'Blog', href: BLOG_URL },
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
