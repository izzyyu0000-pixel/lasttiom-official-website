import {permanentRedirect} from 'next/navigation'

// 舊網址 /posts/:slug 永久轉到 /blog/:slug，避免重複內容
export default function LegacyPostRedirect({params}: {params: {slug: string}}) {
  permanentRedirect(`/blog/${params.slug}`)
}
