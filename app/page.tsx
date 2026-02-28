import type {Metadata} from 'next'
import Link from 'next/link'

import {getFeaturedPosts} from '@/lib/sanity/fetch'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '輕奢彌月金飾 | 溫暖祝福的第一份禮',
  description:
    '專注母嬰送禮場景的輕奢金飾品牌，提供彌月禮盒、十二生肖與生辰花客製款式，兼具質感與心意。',
}

export default async function HomePage() {
  const posts = await getFeaturedPosts()

  return (
    <main className="bg-[var(--bg)] text-[var(--ink)]">
      <section className="relative isolate overflow-hidden px-5 pb-14 pt-12 sm:px-8 sm:pt-16">
        <div className="hero-glow hero-glow-top" />
        <div className="hero-glow hero-glow-bottom" />
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-4 inline-flex rounded-full border border-[var(--line)] bg-white/80 px-4 py-1 text-xs tracking-[0.2em] text-[var(--muted)]">
            LUXURY BABY GIFT
          </p>
          <h1 className="max-w-2xl text-4xl leading-tight text-[var(--ink)] sm:text-6xl">
            彌月的第一份金飾祝福，
            <span className="block text-[var(--rose)]">要溫柔，也要有份量。</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            以母嬰送禮情境打造的輕奢金飾品牌，結合十二生肖與生辰花客製，讓每一份禮都能被記住。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://shopee.tw/kiyone"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold tracking-wide text-white"
            >
              逛商品系列
            </a>
            <Link
              href="/blog"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--line)] bg-white/90 px-6 text-sm font-semibold tracking-wide text-[var(--ink)]"
            >
              讀育兒專欄
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--line)] bg-white/90 px-6 text-sm font-semibold tracking-wide text-[var(--ink)]"
            >
              品牌故事
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 pb-8 sm:px-8">
        <div className="mx-auto w-full max-w-6xl rounded-3xl border border-[var(--line)] bg-white/90 p-6 sm:p-8">
          <p className="text-xs tracking-[0.18em] text-[var(--muted)]">BRAND STORY</p>
          <h2 className="mt-2 text-2xl sm:text-3xl">止時，讓祝福停留在最珍貴的那一刻。</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            我們發現，彌月禮不是太昂貴就是少了寓意。止時把傳統吉祥意象用現代鍍金工藝重新詮釋，讓每份禮物都能同時擁有體面、溫度與可被珍藏的故事。
          </p>
          <Link
            href="/about"
            className="mt-5 inline-flex min-h-11 items-center rounded-full border border-[var(--line)] px-5 text-sm font-semibold text-[var(--ink)]"
          >
            了解完整品牌故事
          </Link>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8">
        <div className="mx-auto w-full max-w-6xl rounded-3xl border border-[var(--line)] bg-white/80 p-5 sm:p-8">
          <div className="mb-5 flex items-end justify-between">
            <h2 className="text-2xl sm:text-3xl">品牌專欄</h2>
            <Link href="/blog" className="text-sm font-medium text-[var(--rose)]">
              查看全部
            </Link>
          </div>
          {posts.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {posts.map((post) => (
                <article key={post._id} className="rounded-2xl border border-[var(--line)] bg-white p-4">
                  {(() => {
                    const relatedProducts = Array.isArray(post.relatedProducts) ? post.relatedProducts : []
                    return (
                      <>
                  <h3 className="text-base font-semibold leading-relaxed">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-[var(--muted)]">
                    {post.seoDescription || '閱讀彌月送禮指南、寶寶祝福寓意與挑選建議。'}
                  </p>
                  <p className="mt-3 text-xs text-[var(--muted)]">
                    關聯商品：{relatedProducts.length > 0 ? relatedProducts[0].title : '尚未設定'}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-flex min-h-10 items-center rounded-full border border-[var(--line)] px-4 text-sm font-medium"
                  >
                    閱讀文章
                  </Link>
                      </>
                    )
                  })()}
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--muted)]">尚未取得文章資料，完成內容上架後會自動顯示。</p>
          )}
        </div>
      </section>
    </main>
  )
}
