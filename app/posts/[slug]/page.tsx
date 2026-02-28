import {permanentRedirect} from 'next/navigation'

interface LegacyPostPageProps {
  params: {slug: string}
}

export const dynamic = 'force-dynamic'

export default function LegacyPostPage({params}: LegacyPostPageProps) {
  permanentRedirect(`/blog/${params.slug}`)
}
