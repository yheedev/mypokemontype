import { Suspense } from 'react'
import type { Metadata } from 'next'
import Selector from '@/components/UI/Selector'
import Result from '@/components/UI/Result'
import PokemonSearch from '@/components/UI/PokemonSearch'
import PokemonBattle from '@/components/UI/PokemonBattle'
import { UrlSync } from '@/components/UI/UrlSync'
import { buildPokemonMetadata } from '@/utils/ogMetadata'

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ slotA?: string; slotB?: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const canonical = `https://mypokemontype.vercel.app/${lang}/defense`
  return {
    alternates: { canonical },
    ...(await buildPokemonMetadata(await searchParams)),
  }
}

export default function Defense() {
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
