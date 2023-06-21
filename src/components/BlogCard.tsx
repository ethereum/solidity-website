import { Flex, type FlexProps, Text } from '@chakra-ui/react'
import { Link } from '@/components'
import type { BlogCardInfo } from '@/interfaces'

interface BlogCardProps extends FlexProps {
  blogPost: BlogCardInfo
}
export const BlogCard: React.FC<BlogCardProps> = ({ blogPost, ...props }) => {
  const { title, author, date, content, href } = blogPost
  const dateString = new Date(date).toLocaleString('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  return (
    <Flex direction="column" px={6} py={8} gap={4} {...props}>
      <Text fontSize="xl" fontFamily="mono" fontWeight="bold">
        {title}
      </Text>
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
