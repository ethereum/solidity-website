import { Flex, type FlexProps, Text } from '@chakra-ui/react'
import { Link } from '@/components'
import type { BlogPostProps } from '@/interfaces'
import { getBlogSubtitle } from '@/utils'

interface BlogCardProps extends FlexProps {
  blogPost: BlogPostProps
}
export const BlogCard: React.FC<BlogCardProps> = ({
  blogPost,
  ...flexProps
}) => {
  const { frontmatter, content, url } = blogPost
  const { title, author, date } = frontmatter
  return (
    <Flex direction="column" {...flexProps}>
      <Link href={url} textDecoration="none" data-group>
        <Text
          textStyle="h5-mono"
          color="text"
          mb={1}
          _groupHover={{ color: 'primary', textDecoration: 'underline' }}
        >
          {title}
        </Text>
      </Link>
      <Text color="primary" mb={6}>
        {getBlogSubtitle(author, date)}
      </Text>
      <Text mb={4}>{content}</Text>
      <Link href={url}>Read more</Link>
    </Flex>
  )
}
