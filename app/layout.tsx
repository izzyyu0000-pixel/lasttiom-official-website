import './globals.css'
import type {Metadata} from 'next'
import Link from 'next/link'
import Script from 'next/script'
import {brandStats} from '@/lib/brand'
import {toJsonLd} from '@/lib/json-ld'
import {getSiteUrl} from '@/lib/site'

const siteUrl = getSiteUrl()

const siteName = '止時 LAST·TIME'
const defaultTitle = '止時｜彌月禮盒・十二生肖與生辰花客製鍍金飾品'
const defaultDescription =
  `止時是專注彌月、收涎、週歲送禮的鍍金飾品品牌，提供十二生肖與生辰花客製款式，蝦皮累積 ${brandStats.soldLabel} 件銷售、${brandStats.rating} 顆星好評。`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: '%s｜止時',
  },
  description: defaultDescription,
  applicationName: siteName,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName,
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
  },
}

const gaId = process.env.NEXT_PUBLIC_GA_ID

const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: siteName,
      alternateName: ['止時', 'LAST TIME'],
      url: siteUrl,
      email: 'izzyyu0000@gmail.com',
      sameAs: ['https://shopee.tw/kiyone'],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: siteName,
      url: siteUrl,
      inLanguage: 'zh-TW',
      publisher: {'@id': `${siteUrl}/#organization`},
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: toJsonLd(siteSchema)}} />
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        ) : null}
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
              <Link
                href="/business"
                className="shrink-0 rounded-full px-3 py-2 text-[var(--muted)] hover:bg-[var(--sand)] hover:text-[var(--ink)]"
              >
                企業合作
              </Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t border-[var(--line)] bg-white/80">
          <div className="mx-auto grid w-full max-w-6xl gap-6 px-5 py-10 text-sm text-[var(--muted)] sm:grid-cols-3 sm:px-8">
            <div>
              <p className="font-semibold tracking-[0.12em] text-[var(--ink)]">止時 LAST·TIME</p>
              <p className="mt-2 leading-relaxed">彌月、收涎、週歲的第一份金飾祝福。十二生肖與生辰花客製鍍金飾品。</p>
            </div>
            <nav aria-label="頁尾導覽" className="flex flex-col gap-1">
              <Link href="/blog" className="inline-flex min-h-8 items-center self-start hover:text-[var(--ink)]">育兒送禮專欄</Link>
              <Link href="/about" className="inline-flex min-h-8 items-center self-start hover:text-[var(--ink)]">品牌故事</Link>
              <Link href="/business" className="inline-flex min-h-8 items-center self-start hover:text-[var(--ink)]">診所・月子中心・企業合作</Link>
            </nav>
            <div className="flex flex-col gap-1">
              <a href="https://shopee.tw/kiyone" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center self-start hover:text-[var(--ink)]">
                蝦皮賣場：止時
              </a>
              <a href="mailto:izzyyu0000@gmail.com" className="inline-flex min-h-8 items-center self-start break-all hover:text-[var(--ink)]">合作洽詢：izzyyu0000@gmail.com</a>
              <p className="mt-2 text-xs">© {new Date().getFullYear()} 止時 LAST·TIME</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
