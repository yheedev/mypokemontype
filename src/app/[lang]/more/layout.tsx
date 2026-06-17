import type { Metadata } from 'next'
import { supportedLangs } from '@/types/language'

const BASE_URL = 'https://mypokemontype.vercel.app'

const PAGE_META: Record<string, { title: string; description: string }> = {
  ko: {
    title: '소개 | My Pokemon Type',
    description: '포켓몬 타입 상성 계산기 My Pokemon Type 소개 페이지입니다.',
  },
  en: {
    title: 'About | My Pokemon Type',
    description: 'About My Pokemon Type — a Pokémon type effectiveness calculator.',
  },
  ja: {
    title: '紹介 | My Pokemon Type',
    description: 'ポケモンタイプ相性計算機 My Pokemon Type の紹介ページです。',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const meta = PAGE_META[lang] ?? PAGE_META.en
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/more`,
      languages: {
        'x-default': `${BASE_URL}/en/more`,
        ...Object.fromEntries(supportedLangs.map((l) => [l, `${BASE_URL}/${l}/more`])),
      },
    },
  }
}

export default function MoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
