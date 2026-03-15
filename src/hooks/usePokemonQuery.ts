import { useQuery } from '@tanstack/react-query'
import type { TypeNameElement } from '@/constants/pokemon'

interface PokemonApiType {
  slot: number
  type: { name: string; url: string }
}

export interface PokemonData {
  id: number
  name: string
  sprites: {
    front_default: string
    other: {
      'official-artwork': { front_default: string }
    }
  }
  types: PokemonApiType[]
}

export type PokemonType = TypeNameElement

async function fetchPokemon(name: string): Promise<PokemonData> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`,
  )
  if (!res.ok) throw new Error('Pokemon not found')
  return res.json()
}

/** name이 빈 문자열이면 쿼리를 실행하지 않음 */
export function usePokemonQuery(name: string) {
  return useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemon(name),
    enabled: name.length > 0,
    retry: false, // 존재하지 않는 이름은 재시도 불필요
  })
}
