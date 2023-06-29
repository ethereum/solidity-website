import path from 'path'
import matter from 'gray-matter'
import { getSlicedContent, sanitizePostPreviewContent } from '@/utils'
import { MATTER_OPTIONS, EVENTS_DIR, EVENTS_PATH } from '@/constants'
import type { EventPost } from '@/interfaces'

export const getAllEvents = (fs: any): EventPost[] => {
  const eventFiles: string[] = fs.readdirSync(EVENTS_DIR)
  return eventFiles.map((file) => {
    // Read markdown file as string
    const fullPath = path.join(EVENTS_DIR, file)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    // Use gray-matter to parse the post metadata section
    const { data: frontmatter, content } = matter(fileContents, MATTER_OPTIONS)
    const url: string = `${EVENTS_PATH}/${file.replace(/\.md$/, '')}`
    return {
      frontmatter,
      content: sanitizePostPreviewContent(getSlicedContent(content)),
      url,
    } as EventPost
  })
}
