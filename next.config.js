/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {source: '/posts/:slug', destination: '/blog/:slug', permanent: true},
      // 舊的 vercel.app 網址 301 轉到正式網域
      {
        source: '/:path*',
        has: [{type: 'host', value: 'lasttiom-official-website.vercel.app'}],
        destination: 'https://www.stilltimebaby.com/:path*',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

module.exports = nextConfig
