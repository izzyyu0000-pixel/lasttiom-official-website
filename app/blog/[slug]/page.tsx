import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {PortableText} from '@portabletext/react'

import Breadcrumbs from '@/components/Breadcrumbs'
import {toJsonLd} from '@/lib/json-ld'
import {portableTextComponents} from '@/lib/portable-text'
import {getPostBySlug} from '@/lib/sanity/fetch'
import {urlForImage} from '@/lib/sanity/image'
import {defaultOgImage, getSiteUrl} from '@/lib/site'

interface PostPageProps {
  params: {slug: string}
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({params}: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) {
    return {
      title: '文章不存在',
      description: '您查看的文章目前不存在或已下架。',
    }
  }

  const title = post.seoTitle || post.title
  const description = post.seoDescription || '彌月送禮與母嬰選品內容。'
  const ogImage = post.mainImage?.asset
    ? urlForImage(post.mainImage).width(1200).height(630).url()
    : undefined

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
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

export default async function PostDetailPage({params}: PostPageProps) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()
  const faqItems = Array.isArray(post.faq)
    ? post.faq.filter((item) => item.question?.trim() && item.answer?.trim())
    : []
  const relatedProducts = Array.isArray(post.relatedProducts) ? post.relatedProducts : []
  const siteUrl = getSiteUrl()
  const canonicalUrl = `${siteUrl}/blog/${post.slug}`
  const articleImage = post.mainImage?.asset ? urlForImage(post.mainImage).width(1200).height(630).url() : null
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.seoTitle || post.title,
    description: post.seoDescription || '彌月送禮與母嬰選品內容。',
    url: canonicalUrl,
    ...(articleImage ? {image: [articleImage]} : {}),
    datePublished: post._createdAt,
    dateModified: post._updatedAt,
    inLanguage: 'zh-TW',
    author: {'@type': 'Person', name: '止時雙寶媽', url: `${siteUrl}/about`},
    publisher: {'@id': `${siteUrl}/#organization`},
    mainEntityOfPage: {'@type': 'WebPage', '@id': canonicalUrl},
  }
  const faqSchema =
    faqItems.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null

  return (
    <div className="min-h-screen bg-warmwhite text-textmain antialiased">
      <main className="mx-auto w-full max-w-3xl px-5 py-10 pb-32 md:py-16 md:pb-20">
        <Breadcrumbs
          className="mb-8"
          items={[
            {name: '首頁', href: '/'},
            {name: '專欄', href: '/blog'},
            {name: post.title, href: `/blog/${post.slug}`},
          ]}
        />
        <article>
          <script type="application/ld+json" dangerouslySetInnerHTML={{__html: toJsonLd(articleSchema)}} />
          {faqSchema ? (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{__html: toJsonLd(faqSchema)}}
            />
          ) : null}
          <header className="mb-10 text-center">
            <h1 className="mb-6 text-3xl font-bold leading-tight text-milktea md:text-4xl">{post.title}</h1>
            {post.seoDescription ? <p className="mx-auto max-w-2xl text-sm text-textlight">{post.seoDescription}</p> : null}
          </header>

          {post.mainImage?.asset ? (
            <div className="relative mt-2 aspect-[16/9] overflow-hidden rounded-2xl bg-[var(--sand)]">
              <Image
                src={urlForImage(post.mainImage).width(1280).height(720).url()}
                alt={post.mainImage.alt || post.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          ) : null}

          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-5 md:p-8">
            <PortableText value={post.body} components={portableTextComponents} />
          </section>

          {faqItems.length > 0 ? (
            <section className="mt-12 space-y-4">
              <h2 className="text-2xl">常見問題</h2>
              <div className="space-y-3">
                {faqItems.map((item) => (
                  <article key={item.question} className="rounded-2xl border border-[var(--line)] bg-white p-5">
                    <h3 className="text-lg font-semibold leading-relaxed text-textmain">{item.question}</h3>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-textlight">{item.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {relatedProducts.length > 0 ? (
            <section className="mt-12 space-y-3">
              <h2 className="text-2xl">精選關聯商品</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {relatedProducts.map((product) => (
                  <article key={product._id} className="rounded-2xl border border-[var(--line)] bg-white p-4">
                    <h3 className="font-semibold">{product.title}</h3>
                    <p className="mt-1 text-sm text-[var(--muted)]">建議在禮盒中搭配此款作為主題祝福。</p>
                    <div className="mt-3 flex gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex min-h-10 items-center rounded-full border border-[var(--line)] px-4 text-sm"
                      >
                        看詳情
                      </Link>
                      {product.shopeeUrl ? (
                        <a
                          href={product.shopeeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-10 items-center rounded-full bg-[var(--accent)] px-4 text-sm text-white"
                        >
                          蝦皮購買
                        </a>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </main>
    </div>
  )
}
