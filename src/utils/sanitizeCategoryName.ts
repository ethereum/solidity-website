export const sanitizeCategoryName = (category: string) => {
  const lowercased = category.toLowerCase()
  const singalurized = lowercased.endsWith('s')
    ? lowercased.slice(0, lowercased.length - 1)
    : lowercased
  return singalurized
}
