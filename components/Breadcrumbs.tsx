import Link from 'next/link'

import {toJsonLd} from '@/lib/json-ld'
import {getSiteUrl} from '@/lib/site'

export interface BreadcrumbItem {
  name: string
  href: string
}

// 麵包屑：畫面導覽 + BreadcrumbList schema；最後一項視為目前頁面
export default function Breadcrumbs({items, className = ''}: {items: BreadcrumbItem[]; className?: string}) {
  const siteUrl = getSiteUrl()
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.href}`,
    })),
  }

  return (
    <nav aria-label="麵包屑" className={className}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: toJsonLd(schema)}} />
      <ol className="flex flex-wrap items-center gap-x-1 text-sm text-[var(--muted)]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.href} className="flex min-w-0 items-center gap-x-1">
              {isLast ? (
                <span aria-current="page" className="line-clamp-1 text-[var(--ink)]">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="inline-flex min-h-6 items-center hover:text-[var(--ink)]">
                    {item.name}
                  </Link>
                  <span aria-hidden="true">›</span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
