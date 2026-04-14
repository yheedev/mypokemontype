import type { Metadata } from 'next'

async function fetchPokemonImageUrl(englishName: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${englishName.toLowerCase()}`,
      { next: { revalidate: 86400 } },
    )
    if (!res.ok) return null
    const data = await res.json()
    return (
      data.sprites?.other?.['official-artwork']?.front_default ??
      data.sprites?.front_default ??
      null
    )
  } catch {
    return null
  }
}

export async function buildPokemonMetadata(searchParams: {
  ally?: string
  foe?: string
  type1?: string
  type2?: string
  foe1?: string
  foe2?: string
}): Promise<Metadata> {
  const pokemon = searchParams.ally || searchParams.foe

  // 포켓몬이 선택된 경우 → official-artwork
  if (pokemon) {
    const imageUrl = await fetchPokemonImageUrl(pokemon)
    if (imageUrl) {
      const name = pokemon.charAt(0).toUpperCase() + pokemon.slice(1)
      return {
        title: `${name} | My Pokemon Type`,
        openGraph: {
          title: `${name} | My Pokemon Type`,
          images: [{ url: imageUrl, width: 475, height: 475 }],
        },
        twitter: {
          card: 'summary',
          images: [imageUrl],
        },
      }
    }
  }

  // 타입만 선택된 경우 → /api/og 생성 이미지
  const { type1, type2 } = searchParams
  if (type1 || type2) {
    const params = new URLSearchParams()
    if (type1) params.set('type1', type1)
    if (type2) params.set('type2', type2)
    const ogUrl = `/api/og?${params.toString()}`
    return {
      openGraph: {
        images: [{ url: ogUrl, width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        images: [ogUrl],
      },
    }
  }

  return {}
}
