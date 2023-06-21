import fs from 'fs'
import type { GetStaticPaths, GetStaticProps } from 'next/types'
import { Hero, PageMetadata, BlogPostListSection } from '@/components'
import { BLOG_DIR, MAX_POSTS_PER_PAGE, PAGE_PATH } from '@/constants'
import { getAllPostsData, getTotalPages } from '@/utils'
import type { BlogProps, PageParams } from '@/interfaces'
import { ParsedUrlQuery } from 'querystring'

// Generate the paths for each page
export const getStaticPaths: GetStaticPaths = () => {
  // Check if any .md post file exists, don't generate the paths otherwise
  if (!fs.existsSync(BLOG_DIR)) return { paths: [], fallback: false }

  const paths: PageParams[] = []

  // Get list of all files from our blog posts directory
  const files = fs.readdirSync(BLOG_DIR)
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
  // get list of all files from our posts directory
  const files = fs.readdirSync(BLOG_DIR)
  const totalPages = getTotalPages(files)
  const sortedFiles = files.sort().reverse()
  const allPostsData = getAllPostsData(sortedFiles, fs)

  if (!page) return { props: { allPostsData, page: 1 } }
  const pageNumber = parseInt(page as string)
  return { props: { allPostsData, page: pageNumber, totalPages } }
}

const Blog: React.FC<BlogProps> = ({ allPostsData, page, totalPages }) => (
  <>
    <PageMetadata
      title="Blog"
      description="Solidity Lang blog: latest news & announcements" />
    <main>
      <Hero header="Blog">Latest News & Announcements</Hero>
      <BlogPostListSection
        allPostsData={allPostsData}
        page={page}
        totalPages={totalPages} />
    </main>
  </>
)

export default Blog
