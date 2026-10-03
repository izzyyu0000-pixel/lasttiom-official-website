import {readFile} from 'node:fs/promises'
import {join} from 'node:path'
import {ImageResponse} from 'next/og'

export const alt = '止時 STILL·TIME｜彌月・收涎・週歲的第一份金飾祝福'
export const size = {width: 1200, height: 630}
export const contentType = 'image/png'

// 字型只包含圖上用到的字（Noto Serif TC 子集）。修改下面的文字時，要重新下載包含新字的子集：
// https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@600&text=（要用到的字）
export default async function OpengraphImage() {
  const font = await readFile(join(process.cwd(), 'lib/fonts/og-noto-serif-tc.ttf'))

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FAF7F2',
          color: '#2f2523',
          fontFamily: 'Noto Serif TC',
        }}
      >
        <div style={{fontSize: 96, letterSpacing: 8}}>止時 STILL·TIME</div>
        <div style={{width: 120, height: 2, margin: '36px 0', background: '#b9875d'}} />
        <div style={{fontSize: 44, color: '#7a6965', letterSpacing: 4}}>彌月・收涎・週歲的第一份金飾祝福</div>
      </div>
    ),
    {...size, fonts: [{name: 'Noto Serif TC', data: font, weight: 600, style: 'normal'}]},
  )
}
