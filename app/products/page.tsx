import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'

import {getFeaturedProducts} from '@/lib/sanity/fetch'
import {urlForImage} from '@/lib/sanity/image'

export const metadata: Metadata = {
  title: '商品列表',
  description: '瀏覽彌月金飾禮盒與可客製化款式。',
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
          <div className="mt-8 rounded-2xl border border-dashed border-[var(--line)] bg-white/70 p-8 text-center text-sm text-[var(--muted)]">
            尚未取得商品資料，請先在 Sanity 新增商品。
          </div>
        )}
      </div>
    </main>
  )
}
