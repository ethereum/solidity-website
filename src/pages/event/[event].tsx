import fs from 'fs'
import matter from 'gray-matter'
import type { GetStaticPaths, GetStaticProps } from 'next/types'
import { EVENTS_DIR, MAIN_CONTENT_ID, MATTER_OPTIONS } from '@/constants'
import { ParsedUrlQuery } from 'querystring'
import type { EventPost } from '@/interfaces'
import { EventListing, Hero, PageMetadata } from '@/components'
import { Box } from '@chakra-ui/react'

// Generate the paths for each event
export const getStaticPaths: GetStaticPaths = () => {
  // Check if any .md events file exists, don't generate the paths otherwise
  if (!fs.existsSync(EVENTS_DIR)) return { paths: [], fallback: false }

  interface EventPath {
    params: { event: string }
  }
  const paths: EventPath[] = []

  // TODO: Uncomment when ready to build these paths as markdown pages
  // // Get list of all files from our events directory
  // const files = fs.readdirSync(EVENTS_DIR)
  // // Generate a path for each one
  // files.forEach((file) => {
  //   const fileName = file.replace('.md', '')
  //   paths.push({ params: { event: fileName } })
  // })

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
  const { title, location, startDate, endDate } = frontmatter
  const description = `${location} - ${new Date(
    startDate
  ).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`
  return (
    <>
      <PageMetadata title={title} description={description} />
      <Box as="main" id={MAIN_CONTENT_ID}>
        <Hero header={title}>{location}</Hero>
        <EventListing frontmatter={frontmatter} content={content} />
      </Box>
    </>
  )
}

export default EventPage
