import { Box } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { MDXStyles } from '@/styles'

interface BlogPostProps {
  content: string
}
export const BlogPost: React.FC<BlogPostProps> = ({ content }) => (
  <>
    <Box as="article" px={6} maxW="container.md" mx="auto">
      <ReactMarkdown
        components={ChakraUIRenderer(MDXStyles)}
        remarkPlugins={[gfm]}
      >
        {content}
      </ReactMarkdown>
    </Box>
  </>
)
