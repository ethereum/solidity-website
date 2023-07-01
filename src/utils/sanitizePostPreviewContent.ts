import removeMd from 'remove-markdown'
import { MAX_WORDS_PER_POST_PREVIEW } from '@/constants'
import { getSlicedContent } from '@/utils'

export const sanitizePostPreviewContent = (content: string): string => {
  const mdRemoved = removeMd(content)
  const truncatedContent = getSlicedContent(mdRemoved)
  const wordArray: string[] = truncatedContent.split(' ')
  const isTooLong: boolean = wordArray.length > MAX_WORDS_PER_POST_PREVIEW
  const sliceEnd: number = isTooLong
    ? MAX_WORDS_PER_POST_PREVIEW
    : wordArray.length
  return wordArray.slice(0, sliceEnd).join(' ') + (isTooLong ? '...' : '')
}
