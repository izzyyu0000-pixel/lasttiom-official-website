import './globals.css'
import type {Metadata} from 'next'
import Link from 'next/link'
import {getSiteUrl} from '@/lib/site'

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '輕奢彌月金飾',
    template: '%s | 輕奢彌月金飾',
  },
  description: '母嬰送禮情境的輕奢金飾官網，結合內容導購與商品展示。',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '輕奢彌月金飾',
    description: '母嬰送禮情境的輕奢金飾官網，結合內容導購與商品展示。',
    url: siteUrl,
    siteName: '輕奢彌月金飾',
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '輕奢彌月金飾',
    description: '母嬰送禮情境的輕奢金飾官網，結合內容導購與商品展示。',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body>
        <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/90 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
            <Link href="/" className="shrink-0 text-sm font-semibold tracking-[0.12em] text-[var(--ink)]">
              止時
            </Link>
            <nav className="-mx-1 flex min-w-0 flex-1 items-center justify-end gap-1 overflow-x-auto px-1 text-sm">
              <Link href="/" className="shrink-0 rounded-full px-3 py-2 text-[var(--muted)] hover:bg-[var(--sand)] hover:text-[var(--ink)]">
                首頁
              </Link>
              <a
                href="https://shopee.tw/kiyone"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-full px-3 py-2 text-[var(--muted)] hover:bg-[var(--sand)] hover:text-[var(--ink)]"
              >
                商品
              </a>
              <Link href="/blog" className="shrink-0 rounded-full px-3 py-2 text-[var(--muted)] hover:bg-[var(--sand)] hover:text-[var(--ink)]">
                專欄
              </Link>
              <Link
                href="/about"
                className="shrink-0 rounded-full px-3 py-2 text-[var(--muted)] hover:bg-[var(--sand)] hover:text-[var(--ink)]"
              >
                品牌故事
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
