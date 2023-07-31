import { Box, type BoxProps } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { MDStyles } from '@/styles'

interface BlogPostProps extends BoxProps {
  content: string
}
export const BlogPost: React.FC<BlogPostProps> = ({ content, ...boxProps }) => (
  <>
    <Box as="article" {...boxProps}>
      <ReactMarkdown
        components={ChakraUIRenderer(MDStyles)}
        remarkPlugins={[gfm]}
      >
        {content}
      </ReactMarkdown>
    </Box>
  </>
)
