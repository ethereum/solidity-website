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
