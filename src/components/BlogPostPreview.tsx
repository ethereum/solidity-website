import { Box, Text } from '@chakra-ui/react'
import { Link } from '@/components'
import { CATEGORIES_URL_MAP } from '@/constants'
import { BlogPostProps } from '@/interfaces'
import removeMd from 'remove-markdown'

export const BlogPostPreview: React.FC<BlogPostProps> = ({
  frontmatter,
  content,
  url,
  ...boxProps
}) => {
  const { title, date, author, category } = frontmatter
  return (
    <Box {...boxProps}>
      {url ? (
        <Link href={url}>
          <Text as="h2" textStyle="h2" fontFamily="mono">
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
      <Link
        href={CATEGORIES_URL_MAP[category]}
        textDecoration="none!important"
        data-group
      >
        <Box
          borderRadius="full"
          px={3}
          w="fit-content"
          border="1px"
          borderColor="primary"
          color="primary"
          fontSize="xs"
          fontFamily="mono"
          fontWeight="bold"
          textTransform="uppercase"
          _groupHover={{
            bg: 'primary',
            color: 'bg',
          }}
        >
          {category}
        </Box>
      </Link>
      <Text>{removeMd(content)}</Text>
    </Box>
  )
}
