export const formatBigNumber = (num: number): string => {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    minimumSignificantDigits: 2,
    maximumSignificantDigits: 2,
  }).format(num)
}
