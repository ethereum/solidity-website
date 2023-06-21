import { Box, Text } from '@chakra-ui/react'
import { Link } from '@/components'
import { CATEGORIES_COLOR_MAP } from '@/constants'
import { BlogPostProps } from '@/interfaces'

export const BlogPostPreview: React.FC<BlogPostProps> = ({
  frontmatter,
  content,
  url,
}) => {
  const { title, date, author, category } = frontmatter
  return (
    <Box>
      {url ? (
        <Link href={url}>
          <Text as="h2" textStyle="h2">
            {title}
          </Text>
        </Link>
      ) : (
        <Text as="h2" textStyle="h2">
          {title}
        </Text>
      )}
      <Text>
        Posted by {author} on {new Date(date).toLocaleDateString()}
      </Text>
      <Box
        borderRadius="full"
        bg={CATEGORIES_COLOR_MAP[category]}
        px={4}
        w="fit-content"
      >
        {category}
      </Box>
      <Text>{content}</Text>
    </Box>
  )
}
