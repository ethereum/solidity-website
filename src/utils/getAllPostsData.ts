import path from 'path'
import matter from 'gray-matter'
import { getPostParamsFromFilename, getSlicedContent } from '@/utils'
import { BLOG_POSTS_DIR, MATTER_OPTIONS, BLOG_PATH } from '@/constants'
import type { BlogPostProps } from '@/interfaces'

export const getAllPostsData = (files: string[], fs: any): BlogPostProps[] => {
  return files.map((file) => {
    // Read markdown file as string
    const fullPath = path.join(BLOG_POSTS_DIR, file)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    // Use gray-matter to parse the post metadata section
    const { data: frontmatter, content } = matter(fileContents, MATTER_OPTIONS)
    const params = getPostParamsFromFilename(file)
    const url = params
      ? `${BLOG_PATH}/${params.YYYY}/${params.MM}/${params.DD}/${params.post}`
      : ''
    return {
      frontmatter,
      content: getSlicedContent(content),
      url,
    } as BlogPostProps
  })
}
