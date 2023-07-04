import { Flex, type FlexProps, Text } from '@chakra-ui/react'
import { Link } from '@/components'
import type { BlogPostProps } from '@/interfaces'
import { formatDateString } from '@/utils'

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
      <Text textStyle="h5-mono" color="text" mb={1}>
        {title}
      </Text>
      <Text color="primary" mb={6}>
        Posted by {author} on {formatDateString(date)}
      </Text>
      <Text mb={4}>{content}</Text>
      <Link href={url}>
        Read more
      </Link>
    </Flex>
  )
}
