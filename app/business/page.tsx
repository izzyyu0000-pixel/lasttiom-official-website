import type {Metadata} from 'next'

const shopeeUrl = 'https://shopee.tw/kiyone'

export const metadata: Metadata = {
  title: '企業合作｜彌月禮盒批量採購',
  description:
    '止時提供診所、月子中心與企業客製化彌月、收涎、週歲禮盒批量採購服務，支援十二生肖與生辰花客製、批量出貨與專屬報價。',
  alternates: {
    canonical: '/business',
  },
  openGraph: {
    title: '止時企業合作｜客製化彌月禮盒批量採購',
    description: '為診所、月子中心與企業提供具紀念意義的客製化母嬰送禮方案。',
    type: 'website',
  },
}

const specifications = [
  ['材質', '銅鍍真金'],
  ['尺寸', '別針長度約 5.5 公分；所附金飾墜約 0.5–2 公分'],
  ['內容物', '上排：可依款式更換十二生肖或生辰花；下排：雙鈴鐺、金瓢蟲、小金帽、金湯匙'],
  ['包裝', '古法布絨禮盒＋手寫祝福小卡＋大理石紋禮物袋（三層包裝）'],
  ['出貨', '24 小時內快速出貨，7-11／全家／蝦皮全程免運'],
  ['適用性別', '男寶款、女寶款皆有對應設計'],
]

const zodiacSigns = '鼠、牛、虎、兔、龍、蛇、馬、羊、猴、雞、狗、豬'
const birthFlowers =
  '一月水仙花、二月迎春花、三月桃花、四月牡丹、五月石榴花、六月荷花、七月蘭花、八月桂花、九月菊花、十月芙蓉花、十一月月季花、十二月梅花'

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] px-5 py-10 text-[var(--ink)] sm:px-8 sm:py-16">
      <article className="mx-auto w-full max-w-5xl space-y-12">
        <header className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white px-6 py-12 text-center sm:px-12 sm:py-20">
          <div className="hero-glow hero-glow-top" />
          <div className="hero-glow hero-glow-bottom" />
          <div className="relative">
            <p className="inline-flex rounded-full border border-[var(--line)] bg-[var(--sand)] px-4 py-1 text-xs tracking-[0.2em] text-[var(--muted)]">
              STOP TIME FOR A LIFETIME MEMORY
            </p>
            <h1 className="mx-auto mt-5 max-w-3xl text-3xl leading-tight sm:text-5xl">
              止時彌月禮盒<br />
              企業與機構客製化送禮方案
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              為診所、月子中心與企業打造有紀念意義的母嬰贈禮，讓每一份祝福都有專屬的故事。
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] px-7 text-sm font-semibold text-white transition hover:bg-[var(--rose)]"
            >
              洽詢批量採購方案
            </a>
          </div>
        </header>

        <section className="grid gap-5 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div className="rounded-3xl border border-[var(--line)] bg-white p-6 sm:p-8">
            <p className="text-xs tracking-[0.18em] text-[var(--rose)]">PRODUCT POSITIONING</p>
            <h2 className="mt-3 text-2xl">專為母嬰送禮情境打造</h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              <p>
                止時是專注母嬰送禮情境的客製化金飾禮品品牌，主力商品為彌月／收涎／週歲禮盒。
              </p>
              <p>
                商品已於蝦皮平台累積 832 件銷售、213 則評價、5.0 顆星（212 則五星），並已與生殖醫學機構建立長期批量採購合作。
              </p>
              <p>
                適合作為診所、月子中心、企業贈禮的客製化紀念禮供應選項，可依採購方需求提供十二生肖、生辰花等客製化款式，並支援批量出貨。
              </p>
            </div>
          </div>
          <aside className="rounded-3xl bg-[var(--ink)] p-6 text-white sm:p-8">
            <p className="text-xs tracking-[0.18em] text-white/60">TRUSTED BY GIFT GIVERS</p>
            <dl className="mt-6 grid grid-cols-2 gap-5">
              <div>
                <dt className="text-3xl font-semibold">832</dt>
                <dd className="mt-1 text-sm text-white/70">累積銷售件數</dd>
              </div>
              <div>
                <dt className="text-3xl font-semibold">5.0</dt>
                <dd className="mt-1 text-sm text-white/70">商品評價星等</dd>
              </div>
              <div>
                <dt className="text-3xl font-semibold">213</dt>
                <dd className="mt-1 text-sm text-white/70">商品評價數</dd>
              </div>
              <div>
                <dt className="text-3xl font-semibold">30+</dt>
                <dd className="mt-1 text-sm text-white/70">單次合作訂購量</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className="rounded-3xl border border-[var(--line)] bg-white p-6 sm:p-8">
          <p className="text-xs tracking-[0.18em] text-[var(--rose)]">PRODUCT SPECIFICATIONS</p>
          <h2 className="mt-3 text-2xl">產品規格</h2>
          <dl className="mt-6 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {specifications.map(([label, value]) => (
              <div key={label} className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr] sm:gap-8">
                <dt className="text-sm font-semibold">{label}</dt>
                <dd className="text-sm leading-relaxed text-[var(--muted)]">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rounded-3xl border border-[var(--line)] bg-[var(--sand)] p-6 sm:p-8">
          <p className="text-xs tracking-[0.18em] text-[var(--rose)]">CUSTOMIZATION</p>
          <h2 className="mt-3 text-2xl">客製化選項</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-5">
              <h3 className="text-lg">款式</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">男寶款、女寶款</p>
            </div>
            <div className="rounded-2xl bg-white p-5">
              <h3 className="text-lg">選擇方式</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">十二生肖與生辰花可擇一客製。</p>
            </div>
            <div className="rounded-2xl bg-white p-5 md:col-span-2">
              <h3 className="text-lg">十二生肖</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{zodiacSigns}</p>
              <h3 className="mt-5 text-lg">生辰花（依出生月份對應）</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{birthFlowers}</p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-[var(--muted)]">
            企業／機構採購可統一指定款式，或由院方將客製選項提供給個別收禮家庭選擇。
          </p>
        </section>

        <section>
          <p className="text-xs tracking-[0.18em] text-[var(--rose)]">WHY STOP TIME</p>
          <h2 className="mt-3 text-2xl">合作信任佐證</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              '該款式評價 5.0／5（213 則評價，212 則五星），已售出 832 件',
              '蝦皮賣場營運滿 10 年，累積 1,403 位追蹤者',
              '賣場整體回覆率 78%，平均回覆速度為數小時內',
              '交易受蝦皮官方「蝦皮放心買・蝦皮安心退」機制保障',
            ].map((item, index) => (
              <div key={item} className="flex gap-4 rounded-2xl border border-[var(--line)] bg-white p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--sand)] text-sm font-semibold text-[var(--rose)]">
                  0{index + 1}
                </span>
                <p className="text-sm leading-relaxed text-[var(--muted)]">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="rounded-[2rem] bg-[var(--ink)] p-7 text-center text-white sm:p-12">
          <p className="text-xs tracking-[0.18em] text-white/60">BULK ORDER &amp; PARTNERSHIP</p>
          <h2 className="mt-3 text-2xl sm:text-3xl">大量採購與合作洽詢</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
            止時已與生殖醫學機構建立長期採購關係，歡迎診所、月子中心、企業及其他機構洽詢客製化批量採購方案。我們可協調批量出貨時程，並提供專屬報價與合作條件。
          </p>
          <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-white/15 bg-white/10 p-5 text-left text-sm leading-relaxed text-white/85">
            <p>服務內容</p>
            <ul className="mt-3 space-y-2 text-white/70">
              <li>統一款式，或依收禮對象客製化十二生肖／生辰花</li>
              <li>批量出貨時程協調</li>
              <li>專屬報價與合作條件</li>
            </ul>
          </div>
          <p className="mt-6 text-sm text-white/70">
            採購洽詢窗口：{' '}
            <a href="mailto:izzyyu0000@gmail.com" className="font-medium text-white underline underline-offset-4">
              izzyyu0000@gmail.com
            </a>
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="mailto:izzyyu0000@gmail.com"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--sand)]"
            >
              寄信洽詢合作
            </a>
            <a
              href={shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-7 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              前往蝦皮聊聊
            </a>
          </div>
        </section>
      </article>
    </main>
  )
}
