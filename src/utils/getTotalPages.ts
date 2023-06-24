import { POSTS_PER_PAGE } from '@/constants'

export const getTotalPages = (files: string[]): number => {
  const markdownFileCount = files.filter((file) => file.endsWith('.md')).length
  const totalPages = Math.ceil(markdownFileCount / POSTS_PER_PAGE)
  return totalPages
}
