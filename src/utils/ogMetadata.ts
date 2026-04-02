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
  slotA?: string
  slotB?: string
}): Promise<Metadata> {
  const pokemon = searchParams.slotA || searchParams.slotB
  if (!pokemon) return {}

  const imageUrl = await fetchPokemonImageUrl(pokemon)
  if (!imageUrl) return {}

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
