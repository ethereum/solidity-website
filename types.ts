import type { IconType } from 'react-icons'

export interface NavLink {
  name: string
  href: string
}

export interface SocialLink {
  name: string
  href: string
  Icon: IconType
}

export interface UseCase {
  imageSrc: string
  title: string
  description: string | React.ReactNode
  href?: string
}

export interface BlogPost {
  title: string
  author?: string
  date: string
  content: string | React.ReactNode
  href: string
}
