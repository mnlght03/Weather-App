export const isObjectEmpty = (obj: Object): boolean => {
  return !(Object.keys(obj).length > 0)
}

export const capitalize = (text: string): string => {
  if (text.length === 0) return text

  return text
    .split(' ')
    .map((word) => word.charAt(0).toLocaleUpperCase() + word.substring(1).toLocaleLowerCase())
    .join(' ')
}
