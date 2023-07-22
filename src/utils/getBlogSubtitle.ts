import { formatDate } from '@/utils'

export const getBlogSubtitle = (author: string, date: Date | string) =>
  `Posted by ${author} on ${formatDate(date, true)}`
