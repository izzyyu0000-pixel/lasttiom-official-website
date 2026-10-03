import fs from 'node:fs'
import path from 'node:path'

import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'

import Breadcrumbs from '@/components/Breadcrumbs'
import {toJsonLd} from '@/lib/json-ld'
import {defaultOgImage, getSiteUrl} from '@/lib/site'

// ─────────────────────────────────────────────
// 這一頁要更新的資料都集中在這裡
// ─────────────────────────────────────────────

const PAGE_PATH = '/products/prosperity-gold-pin'
const SHOPEE_URL = 'https://shopee.tw/product/6680857/18460051173'
const SHOP_URL = 'https://shopee.tw/kiyone'

const product = {
  name: '吃穿不愁・財富自由 彌月金飾別針禮盒',
  shortName: '吃穿不愁',
  price: 790,
  // 這款商品在蝦皮的數字(2026/10/03 蝦皮商品頁)，更新時改這裡
  rating: '5.0',
  reviewCount: 215,
  soldCount: 834,
}

// 商品照片：把照片存進 public/products/chi-chuan/ 資料夾，檔名照下面的 file 命名。
// 還沒放照片時，頁面會自動顯示「照片準備中」，不會壞掉。
const photos = {
  hero: {file: '01-main.jpg', alt: '止時吃穿不愁彌月金飾別針，裝在布絨禮盒中，旁邊是大理石紋禮物袋'},
  detail: {file: '02-detail.jpg', alt: '吃穿不愁男寶款與女寶款別針，下排為雙鈴鐺、金縷衣、小金帽、金湯匙'},
  box: {file: '03-box.jpg', alt: '止時包裝三件組：古法布絨禮盒、手寫祝福卡、大理石紋禮物袋'},
  custom: {file: '05-zodiac.jpg', alt: '十二生肖琺瑯鍍金綴飾，可客製換到別針上排'},
}

// 蝦皮買家評價附的照片
const buyerPhotos = [
  {file: 'buyer-1.jpg', alt: '買家實拍：吃穿不愁別針放在傳承禮盒上'},
  {file: 'buyer-2.jpg', alt: '買家實拍：別針與禮盒、祝福卡'},
  {file: 'buyer-3.jpg', alt: '買家實拍：打開禮盒的樣子'},
  {file: 'buyer-4.jpg', alt: '買家實拍：女寶款別針與彌月卡'},
]

// ─────────────────────────────────────────────

const priceText = `NT$${product.price}`

export const metadata: Metadata = {
  title: {absolute: '吃穿不愁彌月禮盒｜十二生肖・生辰花客製鍍金別針｜止時'},
  description: `彌月禮包多少才不失禮？止時「吃穿不愁」鍍金別針禮盒，雙鈴鐺、金縷衣、小金帽、金湯匙四個吉祥綴飾，可換寶寶生肖或生辰花，${priceText}，蝦皮 ${product.rating} 顆星、${product.reviewCount} 則評價。`,
  alternates: {canonical: PAGE_PATH},
  openGraph: {
    title: '吃穿不愁彌月禮盒｜止時',
    description: `比禮金更有心意的彌月禮。四個吉祥綴飾＋寶寶生肖或生辰花客製，${priceText}。`,
    type: 'website',
    images: [defaultOgImage],
  },
}

function hasPhoto(file: string): boolean {
  return fs.existsSync(path.join(process.cwd(), 'public', 'products', 'chi-chuan', file))
}

function Photo({
  photo,
  priority = false,
  className = '',
}: {
  photo: {file: string; alt: string}
  priority?: boolean
  className?: string
}) {
  return (
    <div className={`relative aspect-square overflow-hidden rounded-3xl bg-[var(--sand)] ${className}`}>
      {hasPhoto(photo.file) ? (
        <Image
          src={`/products/chi-chuan/${photo.file}`}
          alt={photo.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 560px"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center p-6 text-center text-sm text-[var(--muted)]">
          照片準備中
        </div>
      )}
    </div>
  )
}

function ShopeeButton({label = `到蝦皮選購 ${priceText}`, className = ''}: {label?: string; className?: string}) {
  return (
    <a
      href={SHOPEE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold tracking-wide text-white transition hover:opacity-90 ${className}`}
    >
      {label}
    </a>
  )
}

const charms = [
  {name: '雙鈴鐺', text: '鈴鐺一響，好運和財富跟著來。'},
  {name: '金縷衣', text: '錦衣玉食，一輩子穿的都是最好的。'},
  {name: '小金帽', text: '從頭到腳體體面面，穿戴不愁。'},
  {name: '金湯匙', text: '衣食無虞，湯匙上還刻著小小的 BABY 字樣。'},
]

const birthFlowers = [
  '一月 水仙花',
  '二月 迎春花',
  '三月 桃花',
  '四月 牡丹',
  '五月 石榴花',
  '六月 荷花',
  '七月 蘭花',
  '八月 桂花',
  '九月 菊花',
  '十月 芙蓉花',
  '十一月 月季花',
  '十二月 梅花',
]

// 蝦皮商品頁上的真實買家評價(帳號依蝦皮顯示方式隱藏部分字元)
const reviews = [
  {
    user: 'z*****9',
    date: '2023-08-24',
    spec: '女寶・一月生辰花',
    text: '一打開看真的非常喜歡，整體搭配起來的內容物都很有質感，別針本人也是非常漂亮。送禮真的不怕失禮，雖然不是真的金子，但他看起來就跟金子一樣美。',
  },
  {
    user: 'c*****1',
    date: '2025-03-26',
    spec: '男寶・生肖蛇',
    text: '非常有質感，做工精細，很喜歡金湯匙上的 BABY 字樣。體會到其他評論說捨不得送人的心情。賣家出貨快速，包裝嚴實還有淡淡香味。',
  },
  {
    user: '7*****9',
    date: '2024-08-16',
    spec: '女寶・六月生辰花',
    text: '金橙橙的小別針，重量實足，心意滿分，超級好看又美麗的彌月禮物。',
  },
  {
    user: 'c*****n',
    date: '2024-04-18',
    spec: '男寶・生肖馬',
    text: '出貨速度超迅速，週一下單週三收到。包裝也好美，送人超有誠意，是很有寓意的禮物。',
  },
  {
    user: 'cab3313',
    date: '2023-04-16',
    spec: '男寶・一月生辰花',
    text: '選擇很多，寓意很好。我選錯扣環部分，馬上用聊聊，賣家就立刻幫忙處理，非常好的賣家。',
  },
  {
    user: 'c*****y',
    date: '2024-09-10',
    spec: '女寶・生肖龍',
    text: '送貨快速，包裝良好，品項超古典優質，一定是會讓新生兒父母很喜歡的彌月小禮物！',
  },
]

const faqs = [
  {
    q: '是純金的嗎？',
    a: '不是。止時的別針是真空鍍真金，表面是真金，但不是純金或足金，所以價格比金飾店的純金彌月禮親民很多，外觀一樣金澄澄、有份量。',
  },
  {
    q: '可以換成寶寶的生肖或生辰花嗎？',
    a: '可以。上排綴飾可以換成寶寶的十二生肖或十二月生辰花。下單時在規格選擇想要的款式；選單裡沒有的生肖(例如 2027 年 2 月 6 日之後出生的羊寶寶)，請選「其他十二生肖」，再用聊聊告訴我們。',
  },
  {
    q: '下單後多久會收到？',
    a: '24 小時內出貨，7-11、全家、蝦皮店到店都免運。選 7-11 或全家最快兩天就能取貨，滿月酒或探望寶寶前才想到也來得及。',
  },
  {
    q: '可以直接寄給朋友嗎？',
    a: '可以。禮盒、禮物袋都已經包好，也可以幫你代寫手寫祝福卡，直接寄到朋友家或指定門市。',
  },
  {
    q: '男寶款和女寶款差在哪裡？',
    a: '下排的雙鈴鐺、金縷衣、小金帽、金湯匙是一樣的，差別在上排的綴飾與配色。實際樣式可以到蝦皮商品頁看照片比較。',
  },
  {
    q: '寶寶要怎麼配戴？安全嗎？',
    a: '請別在寶寶最外層的衣服，最好是揹巾或外套；不常出門的寶寶，可以別在小毛巾上，掛在嬰兒床附近看得到、但寶寶拿不到的地方。別針附紅色防戳套，別好後再套回去。請勿讓寶寶拿在手上把玩。',
  },
  {
    q: '彌月禮送多少錢比較適當？',
    a: '沒有標準答案，主要看交情和家裡習慣。很多人覺得包禮金不知道包多少才好，或對方不方便收，這時送一份有寓意、可以留作紀念的禮物，反而更不容易失禮。',
  },
  {
    q: '診所、月子中心或公司想大量訂購？',
    a: '可以，我們有長期配合的診所客戶。請參考企業合作頁面，或來信洽詢。',
  },
]

export default function ProsperityGoldPinPage() {
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}${PAGE_PATH}`
  const schemaImages = Object.values(photos)
    .filter((photo) => hasPhoto(photo.file))
    .map((photo) => `${siteUrl}/products/chi-chuan/${photo.file}`)

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    url: pageUrl,
    description:
      '彌月、收涎、週歲用的真空鍍真金別針禮盒，下排為雙鈴鐺、金縷衣、小金帽、金湯匙，上排綴飾可換十二生肖或十二月生辰花。',
    brand: {'@type': 'Brand', name: '止時 LAST·TIME'},
    ...(schemaImages.length > 0 ? {image: schemaImages} : {}),
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'TWD',
      availability: 'https://schema.org/InStock',
      url: SHOPEE_URL,
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {'@type': 'Answer', text: item.a},
    })),
  }

  return (
    <main className="bg-[var(--bg)] pb-28 text-[var(--ink)] sm:pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: toJsonLd(productSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: toJsonLd(faqSchema)}} />

      <div className="mx-auto w-full max-w-5xl px-5 pt-6 sm:px-8">
        <Breadcrumbs
          items={[
            {name: '首頁', href: '/'},
            {name: '商品系列', href: '/products'},
            {name: product.shortName, href: PAGE_PATH},
          ]}
        />
      </div>

      {/* 主視覺 */}
      <section className="mx-auto grid w-full max-w-5xl gap-8 px-5 pb-12 pt-6 sm:px-8 md:grid-cols-2 md:items-center">
        <Photo photo={photos.hero} priority />
        <div>
          <p className="inline-flex rounded-full border border-[var(--line)] bg-white/80 px-4 py-1 text-xs tracking-[0.2em] text-[var(--muted)]">
            止時人氣款
          </p>
          <h1 className="mt-4 text-3xl leading-tight sm:text-4xl">
            「吃穿不愁」彌月金飾別針禮盒
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
            雙鈴鐺、金縷衣、小金帽、金湯匙，把「一輩子吃穿不愁」的祝福別在寶寶身上。上排可換成寶寶的生肖或生辰花，彌月、收涎、週歲都適合。
          </p>
          <p className="mt-5 text-3xl font-semibold text-[var(--rose)]">{priceText}</p>
          <ul className="mt-4 space-y-1 text-sm text-[var(--muted)]">
            <li>・真空鍍真金(非純金)</li>
            <li>・24 小時內出貨，超商取貨免運</li>
            <li>・禮盒包好，可代寫祝福卡直接寄出</li>
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ShopeeButton />
          </div>
          <p className="mt-4 text-xs text-[var(--muted)]">
            蝦皮 {product.rating} 顆星・{product.reviewCount} 則評價・{product.soldCount} 件已售出
          </p>
        </div>
      </section>

      {/* 情境 */}
      <section className="px-5 pb-12 sm:px-8">
        <div className="mx-auto w-full max-w-5xl rounded-3xl border border-[var(--line)] bg-white/90 p-6 sm:p-10">
          <h2 className="text-2xl sm:text-3xl">彌月禮金包多少？很多人都卡在這裡</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            <p>朋友送來彌月蛋糕，想回一份心意。包 $1,000 怕太少，包 $2,000 又有點多；對方收了不好意思，不收你也尷尬。空手去看寶寶，更說不過去。</p>
            <p>
              一份有寓意、能留作紀念的金飾別針，正好解決這個難題。打開禮盒金澄澄的，每個綴飾都有吉祥的意思，對方一看就知道是你特地挑的，不是隨便應付。
            </p>
          </div>
        </div>
      </section>

      {/* 寓意 */}
      <section className="mx-auto grid w-full max-w-5xl gap-8 px-5 pb-12 sm:px-8 md:grid-cols-2 md:items-center">
        <div className="md:order-2">
          <p className="text-xs tracking-[0.18em] text-[var(--muted)]">MEANING</p>
          <h2 className="mt-2 text-2xl sm:text-3xl">垂手可得華衣珍饈，鈴鐺敲來財富自由</h2>
          <dl className="mt-6 space-y-3">
            {charms.map((charm) => (
              <div key={charm.name} className="rounded-2xl border border-[var(--line)] bg-white p-4">
                <dt className="font-semibold">{charm.name}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{charm.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Photo photo={photos.detail} className="md:order-1" />
      </section>

      {/* 客製 */}
      <section className="px-5 pb-12 sm:px-8">
        <div className="mx-auto w-full max-w-5xl rounded-3xl border border-[var(--line)] bg-white/90 p-6 sm:p-10">
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <div>
              <p className="text-xs tracking-[0.18em] text-[var(--muted)]">CUSTOM</p>
              <h2 className="mt-2 text-2xl sm:text-3xl">換上寶寶的生肖或生辰花，就是專屬於他的禮物</h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                有男寶款和女寶款。上排綴飾可以換成寶寶的十二生肖，或出生月份的生辰花，讓爸媽知道你有把寶寶放在心上。
              </p>
              <h3 className="mt-6 text-lg">十二月生辰花</h3>
              <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-[var(--muted)] sm:grid-cols-3">
                {birthFlowers.map((flower) => (
                  <li key={flower} className="rounded-xl bg-[var(--sand)] px-3 py-2">
                    {flower}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                十二生肖都可以做。2027 年 2 月 6 日之後出生的寶寶屬羊，下單時選「其他十二生肖」並用聊聊告訴我們即可。
              </p>
            </div>
            <Photo photo={photos.custom} />
          </div>
        </div>
      </section>

      {/* 包裝與出貨 */}
      <section className="mx-auto grid w-full max-w-5xl gap-8 px-5 pb-12 sm:px-8 md:grid-cols-2 md:items-center">
        <div className="md:order-2">
          <p className="text-xs tracking-[0.18em] text-[var(--muted)]">GIFT READY</p>
          <h2 className="mt-2 text-2xl sm:text-3xl">不用自己包裝，收到就能送</h2>
          <ul className="mt-6 space-y-2 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            <li className="rounded-xl bg-white px-4 py-3">典雅古法布絨傳承禮盒</li>
            <li className="rounded-xl bg-white px-4 py-3">大理石紋禮物袋</li>
            <li className="rounded-xl bg-white px-4 py-3">手寫祝福小卡，可代寫並直接寄給朋友</li>
            <li className="rounded-xl bg-white px-4 py-3">24 小時內出貨，7-11、全家最快兩天取貨</li>
          </ul>
        </div>
        <Photo photo={photos.box} className="md:order-1" />
      </section>

      {/* 評價 */}
      <section className="px-5 pb-12 sm:px-8">
        <div className="mx-auto w-full max-w-5xl">
          <div className="text-center">
            <p className="text-xs tracking-[0.18em] text-[var(--muted)]">REVIEWS</p>
            <h2 className="mt-2 text-2xl sm:text-3xl">買過的人怎麼說</h2>
            <p className="mt-3 text-sm text-[var(--muted)]">
              這款在蝦皮有 {product.reviewCount} 則評價，平均 {product.rating} 顆星。以下摘自蝦皮商品頁的買家評價。
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <figure key={review.user + review.date} className="rounded-3xl border border-[var(--line)] bg-white p-5">
                <p aria-hidden="true" className="text-sm tracking-widest text-[var(--accent)]">
                  ★★★★★
                </p>
                <blockquote className="mt-3 text-sm leading-relaxed text-[var(--ink)]">{review.text}</blockquote>
                <figcaption className="mt-4 text-xs text-[var(--muted)]">
                  {review.user}・{review.spec}・{review.date}
                </figcaption>
              </figure>
            ))}
          </div>
          {buyerPhotos.some((photo) => hasPhoto(photo.file)) ? (
            <div className="mt-8">
              <h3 className="text-center text-lg">買家實拍</h3>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {buyerPhotos
                  .filter((photo) => hasPhoto(photo.file))
                  .map((photo) => (
                    <Photo key={photo.file} photo={photo} className="rounded-2xl" />
                  ))}
              </div>
              <p className="mt-3 text-center text-xs text-[var(--muted)]">照片來自蝦皮買家評價</p>
            </div>
          ) : null}
          <div className="mt-6 text-center">
            <a
              href={SHOPEE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center text-sm text-[#a35843] underline underline-offset-4"
            >
              到蝦皮看全部 {product.reviewCount} 則評價
            </a>
          </div>
        </div>
      </section>

      {/* 規格 */}
      <section className="px-5 pb-12 sm:px-8">
        <div className="mx-auto w-full max-w-5xl rounded-3xl border border-[var(--line)] bg-white/90 p-6 sm:p-10">
          <h2 className="text-2xl sm:text-3xl">商品規格</h2>
          <dl className="mt-6 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2 sm:text-base">
            {[
              ['材質', '真空鍍真金(非純金、非足金)'],
              ['別針長度', '約 5.5 公分'],
              ['綴飾大小', '約 0.5 至 2 公分'],
              ['下排綴飾', '雙鈴鐺、金縷衣、小金帽、金湯匙'],
              ['上排綴飾', '男寶款/女寶款，可換十二生肖或十二月生辰花'],
              ['包裝', '古法布絨禮盒、大理石紋禮物袋、手寫祝福卡'],
              ['出貨', '24 小時內出貨，超商取貨免運'],
              ['購買方式', '透過蝦皮賣場「止時」下單，享蝦皮購物保障'],
            ].map(([label, value]) => (
              <div key={label} className="border-b border-[var(--line)] pb-3">
                <dt className="text-xs text-[var(--muted)]">{label}</dt>
                <dd className="mt-1">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 常見問題 */}
      <section className="px-5 pb-12 sm:px-8">
        <div className="mx-auto w-full max-w-3xl">
          <h2 className="text-center text-2xl sm:text-3xl">常見問題</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((item) => (
              <details key={item.q} className="group rounded-2xl border border-[var(--line)] bg-white p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {item.q}
                  <span aria-hidden="true" className="text-[var(--muted)] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  {item.a}
                  {item.q.includes('大量訂購') ? (
                    <>
                      {' '}
                      <Link href="/business" className="text-[#a35843] underline underline-offset-4">
                        看企業合作方案
                      </Link>
                    </>
                  ) : null}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 結尾 */}
      <section className="px-5 pb-8 sm:px-8">
        <div className="mx-auto w-full max-w-5xl rounded-3xl border border-[var(--line)] bg-white p-6 text-center sm:p-10">
          <h2 className="text-2xl sm:text-3xl">把「一輩子吃穿不愁」的祝福，送給剛來到世上的寶寶</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            {priceText}，24 小時內出貨，禮盒包好直接送。
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <ShopeeButton />
            <a
              href={SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--line)] bg-white px-6 text-sm font-semibold text-[var(--ink)]"
            >
              看賣場其他款式
            </a>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-[var(--muted)]">
            有任何問題，歡迎在蝦皮聊聊詢問，或來信{' '}
            <a href="mailto:izzyyu0000@gmail.com" className="underline underline-offset-4">
              izzyyu0000@gmail.com
            </a>
            。想多了解我們，可以看{' '}
            <Link href="/about" className="underline underline-offset-4">
              止時品牌故事
            </Link>
            。
          </p>
        </div>
      </section>

      {/* 手機版固定購買按鈕 */}
      <div className="fixed bottom-0 left-0 z-40 w-full border-t border-[var(--line)] bg-white/95 p-3 backdrop-blur sm:hidden">
        <ShopeeButton className="w-full" />
      </div>
    </main>
  )
}
