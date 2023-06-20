export const formatBigNumber = (num: number): string => {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    minimumSignificantDigits: 3,
    maximumSignificantDigits: 3,
  }).format(num)
}
