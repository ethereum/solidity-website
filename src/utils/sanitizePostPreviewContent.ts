import { MAX_WORDS_PER_POST_PREVIEW } from '@/constants'
import removeMd from 'remove-markdown'

export const sanitizePostPreviewContent = (content: string): string => {
  const wordArray: string[] = removeMd(content).split(' ')
  const isTooLong: boolean = wordArray.length > MAX_WORDS_PER_POST_PREVIEW
  const sliceEnd: number = isTooLong
    ? MAX_WORDS_PER_POST_PREVIEW
    : wordArray.length
  return wordArray.slice(0, sliceEnd).join(' ') + (isTooLong ? '...' : '')
}
