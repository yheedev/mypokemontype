import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

const TYPE_COLORS: Record<string, string> = {
  normal: '#c6c6a7',
  fire: '#f5ac78',
  water: '#9db7f5',
  electric: '#fae078',
  grass: '#a7db8d',
  ice: '#bce6e6',
  fighting: '#d67873',
  poison: '#c183c1',
  ground: '#ebd69d',
  flying: '#c6b7f5',
  psychic: '#fa92b2',
  bug: '#c6d16e',
  rock: '#d1c17d',
  ghost: '#a292bc',
  dragon: '#a27dfa',
  dark: '#a29288',
  steel: '#d1d1e0',
  fairy: '#f4bdc9',
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const type1 = searchParams.get('type1')
  const type2 = searchParams.get('type2')
  const types = [type1, type2].filter(Boolean) as string[]

  const fontData = await fetch(`${origin}/HeliosExtBlack.woff`).then((r) =>
    r.arrayBuffer(),
  )

  // 타입/포켓몬 미선택 → 타이틀 이미지
  if (types.length === 0) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#dddbdb',
          }}
        >
          <span
            style={{
              fontFamily: 'Helios',
              fontSize: 96,
              color: '#171010',
              letterSpacing: '-2px',
            }}
          >
            My Pokemon Type
          </span>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [{ name: 'Helios', data: fontData, style: 'normal' }],
      },
    )
  }

  // 타입 선택 → 타입 pill 이미지
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
          backgroundColor: '#dddbdb',
          gap: 28,
        }}
      >
        <div style={{ display: 'flex', gap: 20 }}>
          {types.map((type) => (
            <div
              key={type}
              style={{
                backgroundColor: TYPE_COLORS[type] ?? '#c6c6a7',
                borderRadius: 9999,
                padding: '18px 48px',
                fontSize: 48,
                fontWeight: 700,
                color: '#171010',
                textTransform: 'capitalize',
              }}
            >
              {type}
            </div>
          ))}
        </div>
        <span
          style={{
            fontFamily: 'Helios',
            fontSize: 28,
            color: '#4f4d4d',
          }}
        >
          My Pokemon Type
        </span>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: 'Helios', data: fontData, style: 'normal' }],
    },
  )
}
