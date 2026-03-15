import { useQuery } from '@tanstack/react-query'

export type LangMapKey = 'ko' | 'ja'
export type LangMap = Map<string, string>

async function fetchLangMap(lang: LangMapKey): Promise<LangMap> {
  const res = await fetch(`/data/pokemon-${lang}.json`)
  if (!res.ok) throw new Error(`Failed to load pokemon-${lang}.json`)
  const json: Record<string, string> = await res.json()
  return new Map(Object.entries(json))
}

export function usePokemonLangMap(lang: LangMapKey) {
  return useQuery({
    queryKey: ['pokemon-lang-map', lang],
    queryFn: () => fetchLangMap(lang),
    staleTime: Infinity,
    gcTime: Infinity,
  })
}
