import { formatDateString } from '@/utils'

export const getBlogSubtitle = (author: string, date: Date | string) =>
  `Posted by ${author} on ${formatDateString(date)}`
