export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL
  const base = configured ? (configured.startsWith('http') ? configured : `https://${configured}`) : 'http://localhost:3000'
  return base.replace(/\/+$/, '')
}

// 預設分享圖（app/opengraph-image.tsx 產生）。頁面自訂 openGraph 時不會繼承，要自己帶上
export const defaultOgImage = {url: '/opengraph-image', width: 1200, height: 630, alt: '止時 STILL·TIME'}
