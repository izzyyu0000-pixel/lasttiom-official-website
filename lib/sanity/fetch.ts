import {groq} from 'next-sanity'
import type {PortableTextBlock} from '@portabletext/types'

import {client} from './client'

export interface SanityImageAssetRef {
  _ref: string
  _type: 'reference'
}

export interface SanityImage {
  _type: 'image'
  asset?: SanityImageAssetRef
  alt?: string
  crop?: {
    _type: 'sanity.imageCrop'
    top: number
    bottom: number
    left: number
    right: number
  }
  hotspot?: {
    _type: 'sanity.imageHotspot'
    x: number
    y: number
    height: number
    width: number
  }
}

export interface ProductCustomOption {
  groupName: string
  choices: string[]
}

export interface ProductData {
  _id: string
  _createdAt: string
  _updatedAt: string
  title: string
  slug: string
  price: number
  shopeeUrl: string | null
  images: SanityImage[]
  customOptions: ProductCustomOption[]
  body: PortableTextBlock[]
}

export interface RelatedProductData {
  _id: string
  title: string
  slug: string
  price: number
  mainImage: SanityImage | null
  shopeeUrl: string | null
}

export interface ProductCardData {
  _id: string
  title: string
  slug: string
  price: number
  mainImage: SanityImage | null
  shopeeUrl: string | null
}

export interface PostCardData {
  _id: string
  title: string
  slug: string
  mainImage: SanityImage | null
  seoTitle: string | null
  seoDescription: string | null
  relatedProducts: ProductCardData[]
}

export interface PostData {
  _id: string
  _createdAt: string
  _updatedAt: string
  title: string
  slug: string
  mainImage: SanityImage | null
  seoTitle: string | null
  seoDescription: string | null
  body: PortableTextBlock[]
  relatedProducts: RelatedProductData[]
}

const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0]{
    _id,
    _createdAt,
    _updatedAt,
    title,
    "slug": slug.current,
    price,
    shopeeUrl,
    images[]{
      ...,
      alt
    },
    customOptions[]{
      groupName,
      choices
    },
    body
  }
`

const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    _updatedAt,
    title,
    "slug": slug.current,
    mainImage{
      ...,
      alt
    },
    seoTitle,
    seoDescription,
    body,
    "relatedProducts": coalesce(
      relatedProducts[]->{
        _id,
        title,
        "slug": slug.current,
        price,
        "mainImage": images[0]{
          ...,
          alt
        },
        shopeeUrl
      },
      []
    )
  }
`

const featuredProductsQuery = groq`
  *[_type == "product" && defined(slug.current)] | order(_updatedAt desc)[0...6]{
    _id,
    title,
    "slug": slug.current,
    price,
    "mainImage": images[0]{
      ...,
      alt
    },
    shopeeUrl
  }
`

const featuredPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(_updatedAt desc)[0...2]{
    _id,
    title,
    "slug": slug.current,
    mainImage{
      ...,
      alt
    },
    seoTitle,
    seoDescription,
    "relatedProducts": coalesce(
      relatedProducts[]->{
        _id,
        title,
        "slug": slug.current,
        price,
        "mainImage": images[0]{
          ...,
          alt
        },
        shopeeUrl
      },
      []
    )
  }
`

const allPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(_updatedAt desc){
    _id,
    title,
    "slug": slug.current,
    mainImage{
      ...,
      alt
    },
    seoTitle,
    seoDescription,
    "relatedProducts": coalesce(
      relatedProducts[]->{
        _id,
        title,
        "slug": slug.current,
        price,
        "mainImage": images[0]{
          ...,
          alt
        },
        shopeeUrl
      },
      []
    )
  }
`

async function safeFetch<T>(query: string, params?: Record<string, string>): Promise<T | null> {
  try {
    if (params) {
      return await client.fetch<T>(query, params)
    }
    return await client.fetch<T>(query)
  } catch (error) {
    console.error('[sanity] fetch failed', {
      params,
      message: error instanceof Error ? error.message : 'Unknown error',
    })
    return null
  }
}

export async function getProductBySlug(slug: string): Promise<ProductData | null> {
  const normalizedSlug = slug.trim()
  if (!normalizedSlug) return null

  return safeFetch<ProductData | null>(productBySlugQuery, {slug: normalizedSlug})
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  const normalizedSlug = slug.trim()
  if (!normalizedSlug) return null

  return safeFetch<PostData | null>(postBySlugQuery, {slug: normalizedSlug})
}

export async function getFeaturedProducts(): Promise<ProductCardData[]> {
  const result = await safeFetch<ProductCardData[]>(featuredProductsQuery)
  return Array.isArray(result) ? result : []
}

export async function getFeaturedPosts(): Promise<PostCardData[]> {
  const result = await safeFetch<PostCardData[]>(featuredPostsQuery)
  return Array.isArray(result) ? result : []
}

export async function getAllPosts(): Promise<PostCardData[]> {
  const result = await safeFetch<PostCardData[]>(allPostsQuery)
  return Array.isArray(result) ? result : []
}
