import type {Metadata} from 'next'
import Link from 'next/link'

import {getAllPosts} from '@/lib/sanity/fetch'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '品牌專欄',
  description: '閱讀彌月送禮、母嬰祝福與金飾挑選內容。',
  openGraph: {
    title: '品牌專欄 | 輕奢彌月金飾',
    description: '閱讀彌月送禮、母嬰祝福與金飾挑選內容。',
    type: 'website',
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen bg-[var(--bg)] px-5 py-10 text-[var(--ink)] sm:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-3xl sm:text-4xl">品牌專欄</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">用內容陪伴新手爸媽，讓祝福更有意義。</p>

        {posts.length > 0 ? (
          <div className="mt-8 space-y-3">
            {posts.map((post) => {
              const relatedProducts = Array.isArray(post.relatedProducts) ? post.relatedProducts : []

              return (
                <article key={post._id} className="rounded-2xl border border-[var(--line)] bg-white p-5">
                  <h2 className="text-xl">{post.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {post.seoDescription || '閱讀更多彌月送禮與育兒情境內容。'}
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
                </article>
              )
            })}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-[var(--line)] bg-white/70 p-8 text-center text-sm text-[var(--muted)]">
            尚未取得文章資料，請先在 Sanity 新增文章。
          </div>
        )}
      </div>
    </main>
  )
}
