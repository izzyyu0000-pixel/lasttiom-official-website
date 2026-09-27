import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {PortableText, toPlainText} from '@portabletext/react'

import Breadcrumbs from '@/components/Breadcrumbs'
import {toJsonLd} from '@/lib/json-ld'
import {portableTextComponents} from '@/lib/portable-text'
import {getProductBySlug, type ProductData} from '@/lib/sanity/fetch'
import {urlForImage} from '@/lib/sanity/image'
import {defaultOgImage, getSiteUrl} from '@/lib/site'

interface ProductPageProps {
  params: {slug: string}
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    maximumFractionDigits: 0,
  }).format(price)
}

function ProductImageCarousel({product}: {product: ProductData}) {
  const images = product.images.length > 0 ? product.images : []

  return (
    <section aria-label="商品圖片" className="space-y-3">
      {images.length > 0 ? (
        <div className="flex snap-x snap-mandatory overflow-x-auto rounded-2xl bg-stone-100">
          {images.map((image, index) => (
            <figure
              key={`${image.asset?._ref || 'img'}-${index}`}
              className="relative aspect-square w-full shrink-0 snap-center"
            >
              {image.asset ? (
                <Image
                  src={urlForImage(image).width(1200).height(1200).url()}
                  alt={image.alt || `${product.title} 商品圖 ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 720px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-stone-500">
                  圖片準備中
                </div>
              )}
            </figure>
          ))}
        </div>
      ) : (
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-100">
          <div className="flex h-full items-center justify-center text-sm text-stone-500">
            圖片準備中
          </div>
        </div>
      )}

      {images.length > 1 ? (
        <div className="flex items-center justify-center gap-2">
          {images.map((image, index) => (
            <span
              key={`${image.asset?._ref || 'img'}-${index}`}
              className="h-1.5 w-6 rounded-full bg-stone-300 first:bg-amber-500"
              aria-hidden="true"
            >
              <span className="sr-only">第 {index + 1} 張商品圖</span>
            </span>
          ))}
        </div>
      ) : null}

      {images.length > 1 ? (
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {images.map((image, index) => (
            <div
              key={`${image.asset?._ref || 'thumb'}-${index}`}
              className="relative block h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-stone-200 bg-stone-100"
            >
              {image.asset ? (
                <Image
                  src={urlForImage(image).width(240).height(240).url()}
                  alt={image.alt || `${product.title} 商品圖 ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </section>
  )
}

function ProductOptions({product}: {product: ProductData}) {
  if (!product.customOptions?.length) return null

  return (
    <section aria-label="客製化選項" className="space-y-6">
      {product.customOptions.map((group) => (
        <div key={group.groupName} className="space-y-3">
          <h2 className="text-sm font-medium tracking-wide text-stone-800">{group.groupName}</h2>
          <div className="flex flex-wrap gap-2">
            {group.choices.map((choice) => (
              <button
                key={`${group.groupName}-${choice}`}
                type="button"
                className="min-h-11 min-w-11 rounded-full border border-stone-300 bg-white px-4 text-sm leading-relaxed tracking-wide text-stone-700 transition hover:border-amber-400 hover:text-amber-700"
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

function ProductDescription({body}: {body: ProductData['body']}) {
  return (
    <section aria-label="商品介紹" className="space-y-3">
      <h2 className="text-lg font-medium tracking-wide text-stone-900">商品介紹</h2>
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-100">
        {Array.isArray(body) && body.length > 0 ? (
          <PortableText value={body} components={portableTextComponents} />
        ) : (
          <p className="text-sm text-stone-500">內容準備中</p>
        )}
      </div>
    </section>
  )
}

function StickyShopeeCTA({product}: {product: ProductData}) {
  const hasShopeeUrl = Boolean(product.shopeeUrl)

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-stone-200 bg-white/95 p-3 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto w-full max-w-3xl">
        {hasShopeeUrl ? (
          <a
            href={product.shopeeUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 w-full items-center justify-center rounded-xl bg-amber-600 px-4 text-base font-semibold tracking-wide text-white transition hover:bg-amber-700"
          >
            前往蝦皮結帳 (享免運)
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-xl bg-stone-300 px-4 text-base font-semibold tracking-wide text-stone-600"
          >
            商品準備中
          </button>
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({params}: ProductPageProps): Promise<Metadata> {
  const {slug} = params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: '商品不存在',
      description: '您查看的商品目前不存在或已下架。',
    }
  }

  const title = product.title
  const description = `${product.title}，${formatPrice(product.price)}，可選客製化款式，立即查看商品細節。`
  const ogImage = product.images[0]?.asset
    ? urlForImage(product.images[0]).width(1200).height(630).url()
    : undefined

  return {
    title,
    description,
    alternates: {canonical: `/products/${product.slug}`},
    openGraph: {
      title,
      description,
      type: 'website',
      images: ogImage ? [{url: ogImage}] : [defaultOgImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

export default async function ProductDetailPage({params}: ProductPageProps) {
  const {slug} = params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const siteUrl = getSiteUrl()
  const plainBody = Array.isArray(product.body) ? toPlainText(product.body).replace(/\s+/g, ' ').trim() : ''
  const chars = Array.from(plainBody)
  const schemaDescription = chars.length > 160 ? `${chars.slice(0, 159).join('')}…` : plainBody
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    url: `${siteUrl}/products/${product.slug}`,
    ...(schemaDescription ? {description: schemaDescription} : {}),
    brand: {'@type': 'Brand', name: '止時 LAST·TIME'},
    image: product.images
      .filter((image) => image.asset)
      .slice(0, 3)
      .map((image) => urlForImage(image).width(1200).height(1200).url()),
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'TWD',
      availability: 'https://schema.org/InStock',
      url: product.shopeeUrl || `${siteUrl}/products/${product.slug}`,
    },
  }

  return (
    <main className="min-h-screen bg-stone-50 pb-28 text-stone-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: toJsonLd(productSchema)}} />
      <article className="mx-auto w-full max-w-3xl space-y-8 px-4 py-6 sm:px-6 sm:py-8">
        <Breadcrumbs
          items={[
            {name: '首頁', href: '/'},
            {name: '商品系列', href: '/products'},
            {name: product.title, href: `/products/${product.slug}`},
          ]}
        />
        <ProductImageCarousel product={product} />

        <section aria-label="商品資訊" className="space-y-3">
          <h1 className="text-2xl font-semibold leading-relaxed tracking-wide text-stone-900">
            {product.title}
          </h1>
          <p className="text-3xl font-bold leading-tight tracking-wide text-amber-600">
            {formatPrice(product.price)}
          </p>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-5">
          <p className="text-xs tracking-[0.18em] text-stone-500">止時 品牌承諾</p>
          <p className="mt-2 text-sm leading-relaxed tracking-wide text-stone-700">
            止時相信，比黃金更珍貴的是你的心意。我們把吉祥寓意與鍍金工藝結合，讓彌月禮不只好看，也能成為被家庭長久珍藏的祝福。
          </p>
          <Link
            href="/about"
            className="mt-4 inline-flex min-h-11 items-center rounded-full border border-stone-300 px-4 text-sm font-medium text-stone-800"
          >
            了解品牌故事
          </Link>
        </section>

        <ProductOptions product={product} />

        <ProductDescription body={product.body} />
      </article>

      <StickyShopeeCTA product={product} />
    </main>
  )
}
