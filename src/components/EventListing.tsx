import { Box, Text } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import type { EventFrontmatter } from '@/types'
import { MDXStyles } from '../styles/MDXStyles'

interface EventListingProps {
  frontmatter: EventFrontmatter
  content: string
}
export const EventListing: React.FC<EventListingProps> = ({
  frontmatter,
  content,
}) => {
  const { startDate, endDate } = frontmatter
  const isMultiDay =
    new Date(startDate).toLocaleDateString() !==
    new Date(endDate).toLocaleDateString()
  return (
    <>
      <Box as="article" px={6} maxW="container.sm" mx="auto">
        <Box as="aside" fontSize="xl" textAlign="center">
          {isMultiDay ? (
            <Text>
              Dates: {new Date(startDate).toLocaleDateString()} -{' '}
              {new Date(endDate).toLocaleDateString()}
            </Text>
          ) : (
            <Text>Date: {new Date(startDate).toLocaleDateString()}</Text>
          )}
        </Box>
        <ReactMarkdown
          components={ChakraUIRenderer(MDXStyles)}
          remarkPlugins={[gfm]}
        >
          {content}
        </ReactMarkdown>
      </Box>
    </>
  )
}
