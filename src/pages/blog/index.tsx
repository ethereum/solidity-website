import fs from 'fs'
import { GetStaticProps } from 'next/types'
import { Hero, PageMetadata, BlogPostListSection } from '@/components'
import { BLOG_DIR } from '@/constants'
import { getPostsDataForPage, getTotalPages } from '@/utils'
import type { BlogProps } from '@/interfaces'

export const getStaticProps: GetStaticProps = async () => {
  // get list of all files from our posts directory
  const files = fs.readdirSync(BLOG_DIR)
  const totalPages = getTotalPages(files)
  const sortedFiles = files.sort().reverse()
  const allPostsData = getPostsDataForPage(sortedFiles, 1, fs)
  // TODO: generate RSS feed
  // const feed = await generateRssFeed(allPostsData)
  // const directory = `./public/${locale}/`
  // fs.mkdirSync(directory, { recursive: true })
  // fs.writeFileSync(`${directory}/feed.xml`, feed.rss2())

  return { props: { allPostsData, totalPages } }
}

const Blog: React.FC<BlogProps> = ({ allPostsData, totalPages }) => (
  <>
    <PageMetadata
      title="Blog"
      description="Solidity Lang blog: latest news & announcements"
    />
    <main>
      <Hero header="Blog">Latest News & Announcements</Hero>
      <BlogPostListSection
        allPostsData={allPostsData}
        page={1}
        totalPages={totalPages}
      />
    </main>
  </>
)

export default Blog
