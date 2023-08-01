import fs from 'fs'
import matter from 'gray-matter'
import gfm from 'remark-gfm'
import { ParsedUrlQuery } from 'querystring'
import ReactMarkdown from 'react-markdown'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import type { GetStaticPaths, GetStaticProps } from 'next/types'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { ButtonLink, Map, PageMetadata, YouTube } from '@/components'
import { EVENTS_DIR, MAIN_CONTENT_ID, MATTER_OPTIONS } from '@/constants'
import { EventMDStyles } from '@/styles'
import type { EventPost } from '@/interfaces'
import { formatDate } from '@/utils'

// Generate the paths for each event
export const getStaticPaths: GetStaticPaths = () => {
  // Check if any .md events file exists, don't generate the paths otherwise
  if (!fs.existsSync(EVENTS_DIR)) return { paths: [], fallback: false }

  interface EventPath {
    params: { event: string }
  }
  const paths: EventPath[] = []

  // Get list of all files from our events directory
  const files = fs.readdirSync(EVENTS_DIR)
  // Generate a path for each one
  files.forEach((file) => {
    const fileName = file.replace('.md', '')
    paths.push({ params: { event: fileName } })
  })

  // Return list of paths
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { event } = context.params as ParsedUrlQuery
  const filePath = `${EVENTS_DIR}/${event}.md`
  const file = fs.readFileSync(filePath, 'utf-8')
  const { data: frontmatter, content } = matter(file, MATTER_OPTIONS)
  return { props: { frontmatter, content } }
}

const EventPage: React.FC<EventPost> = ({ frontmatter, content }) => {
  const {
    title,
    location,
    startDate,
    endDate,
    imageSrc,
    youtube,
    coordsOverride,
    registrationLink,
  } = frontmatter
  const [lat, lng] = coordsOverride || [0, 0]
  const description = `${location} - ${formatDate(startDate)} - ${formatDate(
    endDate
  )}`
  const isMultiDay = formatDate(startDate) !== formatDate(endDate)

  return (
    <>
      <PageMetadata title={title} description={description} />
      <Box as="main" id={MAIN_CONTENT_ID}>
        {/* Hero image */}
        <Image
          src={imageSrc}
          alt="Event hero image"
          maxH="450px"
          w="full"
          objectFit="cover"
          mx="auto"
        />
        {/* Event hero */}
        <Box textAlign="center" mt={8} mb={24}>
          <Text>
            {isMultiDay
              ? `${formatDate(startDate)} - ${formatDate(endDate)}`
              : formatDate(startDate, true)}
          </Text>
          <Text as="h1" textStyle="h2-mono" textAlign="center" mt={2} mb={4}>
            {title}
          </Text>
          <Text textStyle="h5" color="text">
            {location}
          </Text>
        </Box>
        {/* Embedded YouTube video */}
        {youtube && (
          <Box bg="#44C2" py={{ base: 4, md: 16 }}>
            <YouTube url={youtube} />
          </Box>
        )}
        {/* Markdown content */}
        <Box
          as="article"
          maxW="container.lg"
          mx="auto"
          mb={12}
          px={{ base: 4, md: 8 }}
        >
          <ReactMarkdown
            components={ChakraUIRenderer(EventMDStyles)}
            remarkPlugins={[gfm]}
          >
            {content}
          </ReactMarkdown>
        </Box>
      </Box>
      {/* Registration button */}
      {registrationLink && (
        <Flex mb={12} justify="center" px={4}>
          <ButtonLink href={registrationLink}>Register</ButtonLink>
        </Flex>
      )}
      {/* Embedded OpenStreetMap view */}
      <Flex
        bg="highlight"
        direction={{ base: 'column', md: 'row' }}
        mb={12}
      >
        <Flex flex={1} justify="center" alignItems="center" px={{ base: 4, md: 8 }} py={16}>
          <Text textStyle="h5" color="text">
            {location}
          </Text>
        </Flex>
        <Map
          location={location}
          coordsOverride={coordsOverride ? { lat, lng } : null}
          h="full"
          w="full"
          flex={1}
        />
      </Flex>
    </>
  )
}

export default EventPage
