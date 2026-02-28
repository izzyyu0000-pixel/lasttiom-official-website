import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--bg)] px-5 py-16 text-[var(--ink)] sm:px-8">
      <section className="mx-auto w-full max-w-3xl rounded-3xl border border-[var(--line)] bg-white/90 p-8 text-center sm:p-10">
        <p className="text-xs tracking-[0.2em] text-[var(--muted)]">404 NOT FOUND</p>
        <h1 className="mt-3 text-3xl sm:text-4xl">這個頁面目前不存在</h1>
        <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
          可能網址有誤，或內容已下架。你可以回首頁、逛品牌專欄，或直接前往蝦皮賣場。
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--line)] px-6 text-sm font-semibold"
          >
            回首頁
          </Link>
          <Link
            href="/blog"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--line)] px-6 text-sm font-semibold"
          >
            看品牌專欄
          </Link>
          <a
            href="https://shopee.tw/kiyone"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-white"
          >
            前往蝦皮賣場
          </a>
        </div>
      </section>
    </main>
  )
}
