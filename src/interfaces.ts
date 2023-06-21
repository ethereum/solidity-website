import type { IconType } from 'react-icons'
import { CATEGORIES_URL_MAP } from '@/constants'

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

export interface BlogCardInfo {
  title: string
  author?: string
  date: string
  content: string | React.ReactNode
  href: string
}

export interface EventLink {
  label: string
  href: string
}

export interface EventFrontmatter {
  title: string
  location: string
  startDate: string
  endDate: string
  imageSrc?: string
  content?: string | React.ReactNode
  links?: EventLink[]
}

export interface EventPost {
  frontmatter: EventFrontmatter
  content: string
}

export type Category = keyof typeof CATEGORIES_URL_MAP

export interface BlogPostFrontmatter {
  layout: string
  published: string
  title: string
  date: string
  author: string
  category: Category
}

export interface BlogPostProps {
  frontmatter: BlogPostFrontmatter
  content: string
  availableURLs?: string[]
  url?: string
}

export interface BlogParams {
  YYYY: string
  MM: string
  DD: string
  post: string
}

export interface CategoryPath {
  params: { category: string }
}

export interface PostPath {
  params: { YYYY: string; MM: string; DD: string; post: string }
}

export interface PageParams {
  params: { page: string }
}

export interface BlogProps {
  allPostsData: BlogPostProps[]
  page: number
  totalPages: number
}
