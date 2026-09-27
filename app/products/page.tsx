import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'

import {getFeaturedProducts} from '@/lib/sanity/fetch'
import {urlForImage} from '@/lib/sanity/image'

export const metadata: Metadata = {
  title: '彌月禮盒商品｜十二生肖・生辰花客製',
  description: '止時彌月鍍金別針禮盒，可選十二生肖或生辰花客製，NT$790 起，適合彌月、收涎、週歲送禮。',
  alternates: {canonical: '/products'},
  openGraph: {
    title: '彌月禮盒商品｜十二生肖・生辰花客製｜止時',
    description: '止時彌月鍍金別針禮盒，可選十二生肖或生辰花客製，NT$790 起。',
    type: 'website',
  },
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    maximumFractionDigits: 0,
  }).format(price)
}

export default async function ProductsPage() {
  const products = await getFeaturedProducts()

  return (
    <main className="min-h-screen bg-[var(--bg)] px-5 py-10 text-[var(--ink)] sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-3xl sm:text-4xl">商品系列</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">可依寶寶生肖與生辰花挑選專屬祝福。</p>

        {products.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
            {products.map((product) => (
              <article key={product._id} className="overflow-hidden rounded-3xl border border-[var(--line)] bg-white">
                <div className="relative aspect-[4/5] bg-[var(--sand)]">
                  {product.mainImage?.asset ? (
                    <Image
                      src={urlForImage(product.mainImage).width(800).height(1000).url()}
                      alt={product.mainImage.alt || product.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-[var(--muted)]">商品圖準備中</div>
                  )}
                </div>
                <div className="space-y-2 p-4">
                  <h2 className="line-clamp-2 text-base font-semibold">{product.title}</h2>
                  <p className="text-lg font-semibold text-[var(--rose)]">{formatPrice(product.price)}</p>
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[var(--accent)] px-4 text-sm font-medium text-white"
                  >
                    查看商品
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {name: '十二生肖客製款', text: '依寶寶生肖挑選專屬圖騰，寓意平安長大。'},
                {name: '生辰花客製款', text: '以寶寶出生月份的誕生花為主題，溫柔有紀念意義。'},
                {name: '彌月鍍金別針禮盒', text: '銅鍍真金別針搭配禮盒包裝，送禮體面、可長久珍藏。'},
              ].map((item) => (
                <article key={item.name} className="rounded-3xl border border-[var(--line)] bg-white p-5">
                  <h2 className="text-base font-semibold">{item.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.text}</p>
                  <p className="mt-3 text-lg font-semibold text-[var(--rose)]">NT$790</p>
                </article>
              ))}
            </div>
            <a
              href="https://shopee.tw/kiyone"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-white sm:w-auto"
            >
              到蝦皮賣場看全部款式
            </a>
          </div>
        )}
      </div>
    </main>
  )
}
