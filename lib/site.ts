export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL
  const base = configured ? (configured.startsWith('http') ? configured : `https://${configured}`) : 'http://localhost:3000'
  return base.replace(/\/+$/, '')
}
