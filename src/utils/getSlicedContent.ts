export const getSlicedContent = (content: string, maxLength: number = 125) => {
  const SLICED_TEXT = content.split(' ').slice(0, maxLength).join(' ')

  if (content.includes('\n#') && content.indexOf('\n#') >= 0)
    return content
      .slice(0, content.indexOf('\n#'))
      .split(' ')
      .slice(0, maxLength)
      .join(' ')
  if (content.includes('<h') && content.indexOf('<h') >= 0)
    return content
      .slice(0, content.indexOf('<h'))
      .split(' ')
      .slice(0, maxLength)
      .join(' ')

  // if content has no headings, cut the text to 125 words max (END = 125 by default)
  return SLICED_TEXT
}
