import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {PortableText, type PortableTextComponents} from '@portabletext/react'

import {getPostBySlug} from '@/lib/sanity/fetch'
import {urlForImage} from '@/lib/sanity/image'

interface PostPageProps {
  params: {slug: string}
}

export const dynamic = 'force-dynamic'

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({children}) => <p className="mb-4 text-lg leading-relaxed text-textmain">{children}</p>,
    h2: ({children}) => (
      <h2 className="mb-6 mt-12 border-b-2 border-morandipink pb-2 text-2xl font-bold text-milktea">
        {children}
      </h2>
    ),
    h3: ({children}) => <h3 className="mb-2 mt-8 text-xl font-bold text-morandipink">{children}</h3>,
    blockquote: ({children}) => (
      <blockquote className="my-6 border-l-4 border-morandipink/70 bg-white px-4 py-3 text-textmain">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}) => <ul className="mb-6 list-none space-y-4 pl-0 text-lg leading-relaxed">{children}</ul>,
    number: ({children}) => <ol className="mb-6 list-decimal space-y-2 pl-6 text-lg leading-relaxed">{children}</ol>,
  },
  listItem: {
    bullet: ({children}) => (
      <li className="flex items-start">
        <span className="mr-2 shrink-0 text-milktea">✿</span>
        <div className="text-textmain">{children}</div>
      </li>
    ),
    number: ({children}) => <li className="text-textmain">{children}</li>,
  },
  marks: {
    strong: ({children}) => <strong className="font-semibold text-milktea">{children}</strong>,
    link: ({children, value}) => {
      const href = typeof value?.href === 'string' ? value.href : '#'
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-morandipink">
          {children}
        </a>
      )
    },
  },
}

export async function generateMetadata({params}: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) {
    return {
      title: '文章不存在',
      description: '您查看的文章目前不存在或已下架。',
    }
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || '彌月送禮與母嬰選品內容。',
  }
}

export default async function PostDetailPage({params}: PostPageProps) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()
  const relatedProducts = Array.isArray(post.relatedProducts) ? post.relatedProducts : []

  return (
    <div className="min-h-screen bg-warmwhite text-textmain antialiased">
      <main className="mx-auto w-full max-w-3xl px-5 py-10 pb-32 md:py-16 md:pb-20">
        <article>
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
