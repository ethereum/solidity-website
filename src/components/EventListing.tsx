import { Box, Text } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import type { Event } from '@/types'
import { EventTheme } from './styles/EventTheme'

interface EventListingProps {
  frontmatter: Event
  content: string
}
export const EventListing: React.FC<EventListingProps> = ({ frontmatter, content }) => {
  const { startDate, endDate } = frontmatter
  const isMultiDay = new Date(startDate).toLocaleDateString() !== new Date(endDate).toLocaleDateString()
  return (
    <>
      <Box as="article">
        <Box as="aside" fontSize="xl" textAlign="center">
          {isMultiDay ? (
            <Text>
              Dates: {new Date(startDate).toLocaleDateString()} -{' '}
              {new Date(endDate).toLocaleDateString()}
            </Text>
          ) : (
            <Text>
              Date: {new Date(startDate).toLocaleDateString()}
            </Text>
          )}
        </Box>
        <ReactMarkdown
          components={ChakraUIRenderer(EventTheme)}
          remarkPlugins={[gfm]}
        >
          {content}
        </ReactMarkdown>
      </Box>
    </>
  )
}