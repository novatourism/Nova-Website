// nova-tourism/src/assets/imageMap.ts
declare global {
  interface ImportMeta {
    glob<T>(pattern: string, options?: { eager?: boolean }): Record<string, T>
  }
}

// ─── Regular images from /images/ ─────────────────────────
const modules = import.meta.glob<{ default: string }>(
  './images/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP,gif}',
  { eager: true }
)

export const imageMap: Record<string, string> = {}

for (const [path, mod] of Object.entries(modules)) {
  const filename = path.replace('./images/', '')
  if (mod?.default) imageMap[filename] = mod.default
}

// ─── Service folder images from /Services/ ─────────────────
const serviceModules = import.meta.glob<{ default: string }>(
  './Services/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP,gif}',
  { eager: true }
)

export const serviceImageMap: Record<string, string[]> = {}

for (const [path, mod] of Object.entries(serviceModules)) {
  if (!mod?.default) continue
  // path = './Services/Adventure Tours & Weekend Getaways/img1.jpg'
  const relativePath = path.replace('./Services/', '')
  const folder = relativePath.split('/')[0]   // 'Adventure Tours & Weekend Getaways'
  if (!serviceImageMap[folder]) serviceImageMap[folder] = []
  serviceImageMap[folder].push(mod.default)
}

// Get all images for a specific service folder (used in ServiceCard)
export function getServiceImages(folderName: string): string[] {
  return serviceImageMap[folderName] || []
}

// Get ALL service images with folder info (used in Gallery)
export function getAllServiceImages(): Array<{ url: string; folder: string }> {
  return Object.entries(serviceImageMap).flatMap(([folder, urls]) =>
    urls.map(url => ({ url, folder }))
  )
}

// ─── Existing utility functions ─────────────────────────────
export function img(filename: string, fallback = ''): string {
  return imageMap[filename] || fallback
}

export function imgByPrefix(prefix: string, fallback = ''): string {
  const extensions = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP']
  for (const ext of extensions) {
    const exact = imageMap[prefix + ext]
    if (exact) return exact
  }
  const prefixLower = prefix.toLowerCase()
  const keys = Object.keys(imageMap).sort()
  const match = keys.find(k => k.toLowerCase().startsWith(prefixLower))
  if (match) return imageMap[match]
  return fallback
}

export function imgsByPrefix(prefix: string): string[] {
  const prefixLower = prefix.toLowerCase()
  return Object.entries(imageMap)
    .filter(([k]) => k.toLowerCase().startsWith(prefixLower))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, v]) => v)
}