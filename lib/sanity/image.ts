import type {SanityImage} from './fetch'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const hasSanityConfig = Boolean(projectId && dataset)
const cdnBase = hasSanityConfig ? `https://cdn.sanity.io/images/${projectId}/${dataset}` : ''
const fallbackImage =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 1200%22%3E%3Crect width=%221200%22 height=%221200%22 fill=%22%23f5f5f4%22/%3E%3C/svg%3E'

function toAssetPath(ref: string): string | null {
  const match = ref.match(/^image-([a-zA-Z0-9]+)-(\d+x\d+)-([a-z0-9]+)$/)
  if (!match) return null

  const [, id, dimensions, format] = match
  return `${id}-${dimensions}.${format}`
}

export function urlForImage(image: SanityImage) {
  const ref = image.asset?._ref
  const assetPath = ref ? toAssetPath(ref) : null
  const baseUrl = assetPath && hasSanityConfig ? `${cdnBase}/${assetPath}` : fallbackImage

  let width: number | null = null
  let height: number | null = null

  return {
    width(value: number) {
      width = value
      return this
    },
    height(value: number) {
      height = value
      return this
    },
    url() {
      if (!assetPath || !hasSanityConfig) return baseUrl
      const params = new URLSearchParams()
      if (width) params.set('w', String(width))
      if (height) params.set('h', String(height))
      params.set('fit', 'crop')
      params.set('auto', 'format')
      const query = params.toString()
      return query ? `${baseUrl}?${query}` : baseUrl
    },
  }
}
