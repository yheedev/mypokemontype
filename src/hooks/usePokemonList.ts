import { useQuery } from '@tanstack/react-query'

async function fetchPokemonList(): Promise<string[]> {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025')
  if (!res.ok) throw new Error('Failed to fetch Pokémon list')
  const data: { results: { name: string }[] } = await res.json()
  return data.results.map((p) => p.name)
}

export function usePokemonList() {
  return useQuery({
    queryKey: ['pokemon-list'],
    queryFn: fetchPokemonList,
    staleTime: Infinity, // 포켓몬 목록은 바뀌지 않음
    gcTime: Infinity,
  })
}
