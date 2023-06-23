import path from 'path'
import matter from 'gray-matter'
import { getPostParamsFromFilename, getSlicedContent } from '@/utils'
import { BLOG_DIR, MATTER_OPTIONS, BLOG_PATH } from '@/constants'
import type { BlogPostProps } from '@/interfaces'

export const getPostsDataForPage = (
  sortedFiles: string[],
  page: number,
  fs: any
): BlogPostProps[] =>
  sortedFiles.slice((page - 1) * 10, page * 10).map((file) => {
    // Read markdown file as string
    const fullPath = path.join(BLOG_DIR, file)
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
