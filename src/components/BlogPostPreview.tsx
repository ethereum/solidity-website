import { Box, Text } from '@chakra-ui/react'
import { CategoryPill, Link } from '@/components'
import { MAX_WORDS_PER_POST_PREVIEW } from '@/constants'
import { BlogPostProps } from '@/interfaces'
import removeMd from 'remove-markdown'
import { formatDateString } from '@/utils'

export const BlogPostPreview: React.FC<BlogPostProps> = ({
  frontmatter,
  content,
  url,
  ...boxProps
}) => {
  const { title, date, author, category } = frontmatter
  const wordArray: string[] = removeMd(content).split(' ')
  const isTooLong: boolean = wordArray.length > MAX_WORDS_PER_POST_PREVIEW
  const sliceEnd: number = isTooLong
    ? MAX_WORDS_PER_POST_PREVIEW
    : wordArray.length
  const sanitizedContent: string =
    wordArray.slice(0, sliceEnd).join(' ') + (isTooLong ? '...' : '')
  return (
    <Box {...boxProps}>
      <Link href={url} textDecoration="none">
        <Text as="h2" textStyle="h4-mono" color="text" mb={1}>
          {title}
        </Text>
      </Link>
      <Text color="primary" mb={6}>
        Posted by {author} on {formatDateString(date)}
      </Text>
      <CategoryPill category={category} />
      <Text mb={2}>{sanitizedContent}</Text>
      <Link href={url} mb={1}>
        [Read More]
      </Link>
    </Box>
  )
}
