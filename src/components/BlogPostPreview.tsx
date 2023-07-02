import { Box, Text } from '@chakra-ui/react'
import { ButtonLink, CategoryPill, Link } from '@/components'
import { BlogPostProps } from '@/interfaces'
import { formatDateString } from '@/utils'

interface BlogPostPreviewProps extends BlogPostProps {
  isCategoryPage?: boolean
  isFeatured?: boolean
}
export const BlogPostPreview: React.FC<BlogPostPreviewProps> = ({
  frontmatter,
  content,
  url,
  isCategoryPage,
  isFeatured,
  ...boxProps
}) => {
  const { title, date, author, category } = frontmatter
  return (
    <Box {...boxProps}>
      <Link href={url} textDecoration="none" _hover={{ textDecoration: "underline" }}>
        <Text as="h2" textStyle={isFeatured ? "h3-mono" : "h5-mono"} color="text" mb={1}>
          {title}
        </Text>
      </Link>
      <Text color="primary" mb={6}>
        Posted by {author} on {formatDateString(date)}
      </Text>
      <CategoryPill category={category} skipLink={isCategoryPage} />
      <Text mb={6} maxW="container.md">{content}</Text>
      <ButtonLink href={url} variant="outline" w="fit-content">
        Read more
      </ButtonLink>
    </Box>
  )
}
