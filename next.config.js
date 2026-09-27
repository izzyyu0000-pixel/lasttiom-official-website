/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {source: '/posts/:slug', destination: '/blog/:slug', permanent: true},
      // 綁定自訂網域後，取消下面註解並換成你的網域，舊的 vercel.app 網址就會 301 轉過去
      // {
      //   source: '/:path*',
      //   has: [{type: 'host', value: 'lasttiom-official-website.vercel.app'}],
      //   destination: 'https://你的網域.com/:path*',
      //   permanent: true,
      // },
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
