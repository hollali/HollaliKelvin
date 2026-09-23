export function sanityImageUrl(url: string, width: number, quality = 75): string {
  if (!url || !url.startsWith('https://cdn.sanity.io/images/')) return url
  const sep = url.includes('?') ? '&' : '?'
  return `${url}${sep}w=${width}&q=${quality}&auto=format`
}