import type { NavLink, SocialLink } from './types'
import { FaGithub, FaGitter, FaMastodon, FaTwitter } from 'react-icons/fa'
import { SiMatrix } from 'react-icons/si'

export const DEFAULT_IMAGE_PATH = '/assets/siteicon.png'
export const SITE_NAME = 'Solidity Programming Language'
export const SITE_URL = 'https://soliditylang.org/'
export const TWITTER_HANDLE = '@solidity_lang'

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: 'https://blog.soliditylang.org/' },
  { name: 'Documentation', href: 'https://docs.soliditylang.org/' },
  { name: 'Use cases', href: '/use-cases/' },
  { name: 'Contribute', href: '/contribute/' },
  { name: 'Forum', href: 'https://forum.soliditylang.org/' },
  { name: 'Chat', href: 'https://gitter.im/ethereum/solidity' },
  { name: 'About', href: '/about/' },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/ethereum/solidity-portal',
    Icon: FaGithub,
  },
  {
    name: 'Twitter',
    href: `https://twitter.com/${TWITTER_HANDLE.split('@').at(-1)}`,
    Icon: FaTwitter,
  },
  {
    name: 'Mastodon',
    href: '#', // TODO: add mastodon link
    Icon: FaMastodon,
  },
  {
    name: 'Matrix',
    href: '#', // TODO: add matrix link
    Icon: SiMatrix,
  },
  {
    name: 'Gitter',
    href: 'https://gitter.im/ethereum/solidity',
    Icon: FaGitter,
  },
]
