import { Flex, Text } from '@chakra-ui/react'
import type { FlexProps } from '@chakra-ui/react'
import { Link } from '@/components'
import type { BlogPost } from '@/types'

interface BlogCardProps extends FlexProps {
  blogPost: BlogPost
}
export const BlogCard: React.FC<BlogCardProps> = ({ blogPost, ...props }) => {
  const { title, author, date, content, href } = blogPost
  const dateString = new Date(date).toLocaleString('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  return (
    <Flex direction="column" px={6} py={8} gap={8} bg="gray.200" {...props}>
      <Text fontSize="xl">{title}</Text>
      <Text>
        Posted {author ? `by ${author}` : ``} on {dateString}
      </Text>
      <Flex direction="column" gap={2}>
        {typeof content === 'string' ? <Text>{content}</Text> : content}
      </Flex>
      <Link href={href}>Read more</Link>
    </Flex>
  )
}
