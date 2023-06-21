import fs from 'fs'
import matter from 'gray-matter'
import { Text } from '@chakra-ui/react'
import { ParsedUrlQuery } from 'querystring'
import type { GetStaticPaths, GetStaticProps } from 'next/types'
import {
  BlogPost,
  Hero,
  Link,
  PageMetadata,
  PostNavigation,
} from '@/components'
import { BLOG_DIR, CATEGORIES_URL_MAP, MATTER_OPTIONS } from '@/constants'
import { getPostParamsFromFilename, getPostURL } from '@/utils'
import type { PostPath, BlogPostProps } from '@/types'

// Generate the paths for each event
export const getStaticPaths: GetStaticPaths = () => {
  // Check if any .md post file exists, don't generate the paths otherwise
  if (!fs.existsSync(BLOG_DIR)) return { paths: [], fallback: false }

  const paths: PostPath[] = []

  // Get list of all files from our blog posts directory
  const files = fs.readdirSync(BLOG_DIR)
  // Generate a path for each one
  files.forEach((file) => {
    if (!file.endsWith('.md')) return
    const params = getPostParamsFromFilename(file)
    if (params) {
      paths.push({ params })
    }
  })
  // Return list of paths
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { YYYY, MM, DD, post } = context.params as ParsedUrlQuery
  const files = fs.readdirSync(BLOG_DIR).sort().reverse()
  const filePath = `${BLOG_DIR}/${YYYY}-${MM}-${DD}-${post}.md`
  const file = fs.readFileSync(filePath, 'utf-8')
  const { data: frontmatter, content } = matter(file, MATTER_OPTIONS)
  return {
    props: {
      frontmatter,
      content,
      availableURLs: files.map((file) => getPostURL(file)),
    },
  }
}

const BlogPostPage: React.FC<BlogPostProps> = ({
  frontmatter,
  content,
  availableURLs = [],
}) => {
  const { title, date, author, category } = frontmatter
  const subtitle = `Posted by ${author} on ${new Date(
    date
  ).toLocaleDateString()}`
  return (
    <>
      <PageMetadata title={title} description={subtitle} />
      <main>
        <Hero header={title}>
          <Text>{subtitle}</Text>
          <Link href={CATEGORIES_URL_MAP[category]}>{category}</Link>
        </Hero>
        <BlogPost content={content} />
        <PostNavigation availableURLs={availableURLs} />
      </main>
    </>
  )
}

export default BlogPostPage
