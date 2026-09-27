import type {PortableTextComponents} from '@portabletext/react'

// 文章與商品介紹共用的 PortableText 樣式
export const portableTextComponents: PortableTextComponents = {
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
