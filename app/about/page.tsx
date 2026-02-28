import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: '品牌故事',
  description:
    '止時品牌故事：把老祖先的吉祥寓意，用現代工藝重新詮釋，為每個寶寶打造被珍藏的彌月心意。',
  openGraph: {
    title: '品牌故事 | 輕奢彌月金飾',
    description: '止時品牌故事：把老祖先的吉祥寓意，用現代工藝重新詮釋，為每個寶寶打造被珍藏的彌月心意。',
    type: 'website',
  },
}

const meaningItems = [
  {symbol: '🥄', name: '金湯匙', text: '一輩子衣食無虞，從出生就含著金湯匙'},
  {symbol: '👘', name: '金縷衣', text: '錦衣玉食，一生穿的都是最好的'},
  {symbol: '🍚', name: '小金碗', text: '豐衣足食，碗裡永遠滿滿的福氣'},
  {symbol: '🪷', name: '小蓮藕', text: '連年有餘，節節高升'},
  {symbol: '👑', name: '金官帽', text: '事業有成，前途無量（男寶專屬）'},
  {symbol: '🐰', name: '兔寶公主', text: '活潑可愛，備受寵愛（女寶專屬）'},
]

const serviceItems = [
  '24 小時內快速出貨，趕時間也來得及',
  '7-11、全家、蝦皮全程免運',
  '古法布絨禮盒＋大理石紋禮物袋三層包裝',
  '代寫手寫祝福小卡，可直接寄給朋友',
  '上排綴飾可客製為十二生肖或十二月生辰花',
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] px-5 py-10 text-[var(--ink)] sm:px-8">
      <article className="mx-auto w-full max-w-4xl space-y-10">
        <header className="space-y-4 text-center">
          <p className="inline-flex rounded-full border border-[var(--line)] bg-white px-4 py-1 text-xs tracking-[0.2em] text-[var(--muted)]">
            止時 品牌故事
          </p>
          <h1 className="text-3xl leading-tight sm:text-5xl">
            止時，為寶寶出生那一刻，做一份會被珍藏的祝福。
          </h1>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            「止時」取自時間靜止的那一刻。我們希望每份彌月禮都不只是一件禮物，而是能被家庭長久收藏的心意。
          </p>
        </header>

        <section className="rounded-3xl border border-[var(--line)] bg-white p-6 sm:p-8">
          <h2 className="text-2xl">止時的故事</h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            <p>
              當初創立止時，是因為我們發現：市面上的彌月禮不是價格高得驚人，就是缺乏寓意與儀式感。朋友想送一份「有意思、有面子、有祝福」的禮，反而很難。
            </p>
            <p>
              於是我們把老祖先的吉祥寓意，用現代鍍金工藝重新詮釋，做出更貼近當代送禮需求的彌月別針禮盒。
            </p>
            <p>
              我們始終相信，比黃金更珍貴的是你的心意。每一份禮都應該讓收禮的人在打開瞬間就感受到：你真的有放在心上。
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl">寓意對照</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {meaningItems.map((item) => (
              <div key={item.name} className="rounded-2xl border border-[var(--line)] bg-white p-4">
                <p className="text-base font-semibold">
                  {item.symbol} {item.name}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-[var(--line)] bg-white p-6 sm:p-8">
          <h2 className="text-2xl">服務承諾</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            {serviceItems.map((item) => (
              <li key={item} className="rounded-xl bg-[var(--sand)] px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-[var(--line)] bg-white p-6 text-center sm:p-8">
          <h2 className="text-2xl">每一份止時彌月禮，都是被好好準備的心意。</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            希望它能帶給你，跟我們每位客戶一樣的感動。
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="https://shopee.tw/kiyone?categoryId=100632&entryPoint=ShopByPDP&itemId=20665457659"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--line)] bg-white px-6 text-sm font-semibold text-[var(--ink)]"
            >
              前往蝦皮賣場
            </a>
          </div>
        </section>
      </article>
    </main>
  )
}
