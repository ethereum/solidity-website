import type { BlogParams } from '@/interfaces'

export const getPostParamsFromFilename = (filename: string): BlogParams => {
  if (!filename.endsWith('.md'))
    throw new Error(
      `Invalid blog post filename: ${filename}. Must end in ".md"`
    )

  const path = filename.replace('.md', '')
  if (path.length < 12)
    throw new Error(
      `Invalid blog post filename: ${filename}. Must follow YYYY-MM-DD-name.md format.`
    )
  const YYYY = path.slice(0, 4)
  const MM = path.slice(5, 7)
  const DD = path.slice(8, 10)
  const post = path.slice(11)
  return { YYYY, MM, DD, post }
}
