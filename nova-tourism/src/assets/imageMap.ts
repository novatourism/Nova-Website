// nova-tourism/src/assets/imageMap.ts
declare global {
  interface ImportMeta {
    glob<T>(pattern: string, options?: { eager?: boolean }): Record<string, T>
  }
}

// nova-tourism/src/assets/imageMap.ts

const modules = import.meta.glob<{ default: string }>(
  './images/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP,gif}',
  { eager: true }
)

export const imageMap: Record<string, string> = {}

for (const [path, mod] of Object.entries(modules)) {
  const filename = path.replace('./images/', '')
  if (mod?.default) {
    imageMap[filename] = mod.default
  }
}

console.log("IMAGE KEYS:", Object.keys(imageMap).sort())

// ─── Exact filename match ─────────────────────────────────
// img('school-trip.jpg') or img('school-trip1.jpg')
export function img(filename: string, fallback = ''): string {
  return imageMap[filename] || fallback
}

// ─── Prefix match — finds school-trip1.jpg, school-trip2.jpg etc ──
// imgByPrefix('school-trip') → returns first matching image URL
export function imgByPrefix(prefix: string, fallback = ''): string {
  // 1. Try exact match first (school-trip.jpg)
  const extensions = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP']
  for (const ext of extensions) {
    const exact = imageMap[prefix + ext]
    if (exact) return exact
  }

  // 2. Try prefix match (school-trip1.jpg, school-trip2.jpg, school-trip_01.jpg etc.)
  const prefixLower = prefix.toLowerCase()
  const keys = Object.keys(imageMap).sort() // sort for consistent ordering
  const match = keys.find(k => k.toLowerCase().startsWith(prefixLower))
  if (match) return imageMap[match]

  // 3. Return fallback if nothing found
  return fallback
}

// ─── Get ALL images matching a prefix, sorted ─────────────
// imgsByPrefix('school-trip') → [url1, url2, url3, ...]
// Useful for slideshows
export function imgsByPrefix(prefix: string): string[] {
  const prefixLower = prefix.toLowerCase()
  return Object.entries(imageMap)
    .filter(([k]) => k.toLowerCase().startsWith(prefixLower))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, v]) => v)
}