import fs from 'fs'
import { GetStaticProps } from 'next/types'
import { Hero, PageMetadata, BlogPostListSection } from '@/components'
import { BLOG_POSTS_DIR, BLOG_TITLE } from '@/constants'
import { getPostsDataForPage, getTotalPages } from '@/utils'
import type { BlogProps } from '@/interfaces'

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
    <main>
      <Hero header={BLOG_TITLE}>Latest News & Announcements</Hero>
      <BlogPostListSection
        allPostsData={allPostsData}
        page={1}
        totalPages={totalPages}
      />
    </main>
  </>
)

export default Blog
