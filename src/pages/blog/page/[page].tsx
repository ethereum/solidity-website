import fs from 'fs'
import type { GetStaticPaths, GetStaticProps } from 'next/types'
import { ParsedUrlQuery } from 'querystring'
import {
  Hero,
  PageMetadata,
  BlogPostListSection,
  BlogHeroChild,
} from '@/components'
import { getPostsDataForPage, getTotalPages } from '@/utils'
import { BLOG_POSTS_DIR, BLOG_TITLE, MAIN_CONTENT_ID } from '@/constants'
import type { BlogProps, PageParams } from '@/interfaces'
import { Box } from '@chakra-ui/react'

// Generate the paths for each page
export const getStaticPaths: GetStaticPaths = () => {
  // Check if any .md post file exists, don't generate the paths otherwise
  if (!fs.existsSync(BLOG_POSTS_DIR)) return { paths: [], fallback: false }

  const paths: PageParams[] = []

  // Get list of all files from our blog posts directory
  const files = fs.readdirSync(BLOG_POSTS_DIR)
  // Calculate how many pages will be needed
  const totalPages = getTotalPages(files)
  Array(totalPages)
    .fill(0)
    .forEach((_, i) => {
      paths.push({ params: { page: (i + 1).toString() } })
    })
  // Return list of paths
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { page } = context.params as ParsedUrlQuery
  const pageNumber = parseInt(page as string)
  // get list of all files from our posts directory
  const files = fs.readdirSync(BLOG_POSTS_DIR)
  const totalPages = getTotalPages(files)
  const sortedFiles = files.sort().reverse()
  const allPostsData = getPostsDataForPage(sortedFiles, pageNumber, fs)
  if (!page) return { props: { allPostsData, page: 1 } }
  return { props: { allPostsData, page: pageNumber, totalPages } }
}

const Blog: React.FC<BlogProps> = ({ allPostsData, page, totalPages }) => (
  <>
    <PageMetadata
      title="Solidity Blog"
      description="Solidity Lang blog: latest news & announcements"
    />
    <Box as="main" id={MAIN_CONTENT_ID}>
      <Hero header={BLOG_TITLE}>
        <BlogHeroChild>Latest News & Announcements</BlogHeroChild>
      </Hero>
      <BlogPostListSection
        allPostsData={allPostsData}
        page={page}
        totalPages={totalPages}
      />
    </Box>
  </>
)

export default Blog
