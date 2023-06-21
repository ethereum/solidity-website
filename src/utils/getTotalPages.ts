import { MAX_POSTS_PER_PAGE } from '@/constants'

export const getTotalPages = (files: string[]): number => {
  const markdownFileCount = files.filter((file) => file.endsWith('.md')).length
  const totalPages = Math.ceil(markdownFileCount / MAX_POSTS_PER_PAGE)
  console.log({ markdownFileCount, totalPages, type: typeof totalPages })
  return totalPages
}
