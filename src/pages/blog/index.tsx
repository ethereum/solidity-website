import fs from 'fs'
import { GetStaticProps } from 'next/types'
import {
  BlogHeroChild,
  BlogPostListSection,
  Hero,
  PageMetadata,
} from '@/components'
import { BLOG_POSTS_DIR, BLOG_TITLE, MAIN_CONTENT_ID } from '@/constants'
import { getPostsDataForPage, getTotalPages } from '@/utils'
import type { BlogProps } from '@/interfaces'
import { Box } from '@chakra-ui/react'

export const getStaticProps: GetStaticProps = async () => {
  // get list of all files from our posts directory
  const files = fs.readdirSync(BLOG_POSTS_DIR)
  const totalPages = getTotalPages(files)
  const sortedFiles = files.sort().reverse()
  const allPostsData = getPostsDataForPage(sortedFiles, 1, fs)
  return { props: { allPostsData, totalPages } }
}

const Blog: React.FC<BlogProps> = ({ allPostsData, totalPages }) => (
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
        page={1}
        totalPages={totalPages}
      />
    </Box>
  </>
)

export default Blog
