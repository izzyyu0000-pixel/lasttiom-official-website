import {createClient} from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const hasSanityConfig = Boolean(projectId)

type FallbackClient = {
  fetch: <T>(query: string, params?: Record<string, string>) => Promise<T>
}

const fallbackClient: FallbackClient = {
  async fetch<T>() {
    throw new Error('Sanity client is not configured. Please set NEXT_PUBLIC_SANITY_PROJECT_ID.')
  },
}

export const client = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    })
  : fallbackClient
