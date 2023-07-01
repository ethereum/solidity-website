import path from 'path'
import matter from 'gray-matter'
import { getPostParamsFromFilename, sanitizePostPreviewContent } from '@/utils'
import { BLOG_POSTS_DIR, MATTER_OPTIONS, BLOG_PATH } from '@/constants'
import type { BlogPostProps } from '@/interfaces'

interface SliceRange {
  from: number
  to: number
}
export const getPostsDataForRange = (
  sortedFiles: string[],
  sliceRange: SliceRange,
  fs: any
): BlogPostProps[] => {
  const { from, to } = sliceRange
  return sortedFiles.slice(from, to).map((file) => {
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
