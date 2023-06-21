import { getPostParamsFromFilename } from '@/utils'

export const getPostURL = (file: string) => {
  const { YYYY, MM, DD, post } = getPostParamsFromFilename(file)
  return `/${YYYY}/${MM}/${DD}/${post}`
}
