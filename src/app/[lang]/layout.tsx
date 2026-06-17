import { supportedLangs } from '@/types/language'
import { LangLayoutClient } from './layout-client'

const BASE_URL = 'https://mypokemontype.vercel.app'

const DESCRIPTIONS: Record<string, string> = {
  ko: '포켓몬 배틀을 위한 타입 상성 계산기',
  en: 'Pokémon type effectiveness calculator for battle',
  ja: 'バトルのためのポケモンタイプ相性計算機',
}

export function generateStaticParams() {
  return supportedLangs.map((lang) => ({ lang }))
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'My Pokemon Type',
    url: `${BASE_URL}/${lang}`,
    description: DESCRIPTIONS[lang] ?? DESCRIPTIONS.en,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Any',
    inLanguage: lang,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@type': 'Person', name: 'yheedev' },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LangLayoutClient params={params}>{children}</LangLayoutClient>
    </>
  )
}
