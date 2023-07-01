import path from 'path'
import matter from 'gray-matter'
import { getPostParamsFromFilename, sanitizePostPreviewContent } from '@/utils'
import {
  BLOG_POSTS_DIR,
  MATTER_OPTIONS,
  BLOG_PATH,
  POSTS_PER_PAGE,
  FEATURED_POSTS,
} from '@/constants'
import type { BlogPostProps } from '@/interfaces'

export const getPostsDataForPage = (
  sortedFiles: string[],
  page: number,
  fs: any
): BlogPostProps[] => {
  const sliceFrom =
    page === 1 ? 0 : (page - 1) * POSTS_PER_PAGE + FEATURED_POSTS
  const sliceTo = page * POSTS_PER_PAGE + FEATURED_POSTS
  return sortedFiles.slice(sliceFrom, sliceTo).map((file) => {
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
      content: sanitizePostPreviewContent(content),
      url,
    } as BlogPostProps
  })
}
