export const formatDate = (
  date: Date | string,
  isLong: boolean = false
): string =>
  new Date(date).toLocaleDateString(
    'en',
    isLong
      ? {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'UTC',
        }
      : {}
  )
