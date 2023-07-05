import { IconButton } from '@chakra-ui/react'
import { FaRss } from 'react-icons/fa'
import { sanitizeCategoryName } from '@/utils'
import { CATEGORIES_URL_MAP } from '@/constants'
import type { Category, CategoryUrl } from '@/interfaces'

export const RssFeedLinkIcon: React.FC<{ category?: Category }> = ({
  category,
}) => {
  const categoryUrl: CategoryUrl | null = category
    ? CATEGORIES_URL_MAP[category]
    : null
  const href = `${category ? '/' + categoryUrl : ''}/feed.xml`
  const ariaLabel = `Subscribe to RSS feed for ${
    category ? sanitizeCategoryName(category as string) : 'all blog'
  } posts`
  return (
    <IconButton
      as="a"
      target="_blank"
      aria-label={ariaLabel}
      title={ariaLabel}
      icon={<FaRss />}
      variant="ghost"
      href={href}
      borderRadius="none"
      color="secondary"
      _hover={{
        bg: 'none',
        color: 'primary',
      }}
    />
  )
}
