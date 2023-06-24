export const formatDateString = (date: Date | string): string =>
  new Date(date).toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
