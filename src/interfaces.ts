import type { BoxProps } from '@chakra-ui/react'
import type { IconType } from 'react-icons'
import {
  CATEGORIES_URL_MAP,
  TRIANGLE_VARIANTS,
  URL_CATEGORIES_MAP,
} from '@/constants'

export interface NavLink {
  name: string
  href: string
}

export interface SocialLink {
  name: string
  href: string
  Icon: IconType
}

export interface BlogCardInfo {
  title: string
  author?: string
  date: string
  content: string | React.ReactNode
  href: string
}

export interface Link {
  label: string
  href?: string
}

type Lat = number
type Long = number

export interface EventFrontmatter {
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

export interface EventPost {
  frontmatter: EventFrontmatter
  content: string
  url: string
}

export interface Coordinates {
  lat: Lat
  lng: Long
}

export type Category = keyof typeof CATEGORIES_URL_MAP
export type CategoryUrl = keyof typeof URL_CATEGORIES_MAP

export interface BlogPostFrontmatter {
  layout?: string
  title: string
  date: string
  author: string
  category: Category
}

export interface BlogPostProps extends BoxProps {
  frontmatter: BlogPostFrontmatter
  content: string
  availableURLs?: string[]
  url: string
}

export interface BlogParams {
  YYYY: string
  MM: string
  DD: string
  post: string
}

export interface CategoryPath {
  params: { category: CategoryUrl }
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

export type TriangleCoord = [number, number, number, string]
export type Variant = TriangleCoord[]
export interface TriangleVariants {
  [key: string]: Variant
}
export interface TrianglePlacementProps {
  left: string
  top: string
  rotate: string
  color: string
}
export type VariantProps = TrianglePlacementProps[]
export type VariantName = keyof typeof TRIANGLE_VARIANTS

export interface UseCase {
  imageSrc: string
  title: string
  description: string | React.ReactNode
  learnMoreLink?: string
  exampleLink?: string
  triangleVariant: VariantName
  mobileTriangleVariant?: VariantName
}
