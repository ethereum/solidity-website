import { Flex, type FlexProps, Text } from '@chakra-ui/react'
import { ButtonLink } from '@/components'
import type { BlogPostProps } from '@/interfaces'
import { formatDateString } from '@/utils'

interface BlogCardProps extends FlexProps {
  blogPost: BlogPostProps
}
export const BlogCard: React.FC<BlogCardProps> = ({ blogPost, ...flexProps }) => {
  const { frontmatter, content, url } = blogPost
  const { title, author, date } = frontmatter
  return (
    <Flex direction="column" px={6} py={8} {...flexProps}>
      <Text textStyle="h4-mono" color="text" mb={1}>
        {title}
      </Text>
      <Text color="primary">
        Posted by {author} on {formatDateString(date)}
      </Text>
      <Text my={6}>{content}</Text>
      <ButtonLink href={url} variant="outline">Read more</ButtonLink>
    </Flex>
  )
}
