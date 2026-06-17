import { Suspense } from 'react'
import type { Metadata } from 'next'
import Selector from '@/components/UI/Selector'
import Result from '@/components/UI/Result'
import PokemonSearch from '@/components/UI/PokemonSearch'
import PokemonBattle from '@/components/UI/PokemonBattle'
import { UrlSync } from '@/components/UI/UrlSync'
import { buildPokemonMetadata } from '@/utils/ogMetadata'
import { supportedLangs } from '@/types/language'

const BASE_URL = 'https://mypokemontype.vercel.app'

const PAGE_META: Record<string, { title: string; description: string }> = {
  ko: {
    title: '공격 타입 계산기 | My Pokemon Type',
    description: '포켓몬 공격 타입 상성을 빠르게 계산하세요.',
  },
  en: {
    title: 'Attack Type Calculator | My Pokemon Type',
    description: 'Quickly calculate Pokémon attack type effectiveness.',
  },
  ja: {
    title: '攻撃タイプ計算機 | My Pokemon Type',
    description: 'ポケモンの攻撃タイプ相性を素早く計算できます。',
  },
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: Promise<{
    ally?: string
    foe?: string
    type1?: string
    type2?: string
    foe1?: string
    foe2?: string
  }>
}): Promise<Metadata> {
  const { lang } = await params
  const meta = PAGE_META[lang] ?? PAGE_META.en
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${lang}`,
      languages: {
        'x-default': `${BASE_URL}/en`,
        ...Object.fromEntries(supportedLangs.map((l) => [l, `${BASE_URL}/${l}`])),
      },
    },
    ...(await buildPokemonMetadata(await searchParams)),
  }
}

export default function Offense() {
  return (
    <main>
      <Suspense fallback={null}>
        <UrlSync />
      </Suspense>
      <PokemonSearch />
      <PokemonBattle />
      <div className="m-4 grid grid-cols-1 items-start gap-12 p-4 xl:grid-cols-2">
        <Selector />
        <Result />
      </div>
    </main>
  )
}
