export const getLanguageFromCodeProperties = (properties: any): string => {
  const hasLanguageNameProperty = Object.keys(properties).length > 0

  return hasLanguageNameProperty
    ? properties.className[0].split('-')[1]
    : 'bash'
}
