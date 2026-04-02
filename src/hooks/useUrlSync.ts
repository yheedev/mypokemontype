'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useUpToTwoStore } from '@/stores/useUpToTwoStore'
import { usePokemonSlotStore } from '@/stores/usePokemonSlotStore'
import type { PokemonSlotData } from '@/stores/usePokemonSlotStore'
import { TypeName, type TypeNameElement } from '@/constants/pokemon'

async function fetchPokemonSlotData(englishName: string): Promise<PokemonSlotData | null> {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${englishName.toLowerCase()}`)
    if (!res.ok) return null
    const raw = await res.json()
    const types = (raw.types ?? [])
      .sort((a: { slot: number }, b: { slot: number }) => a.slot - b.slot)
      .map(({ type }: { type: { name: string } }) => type.name)
      .filter((name: string): name is TypeNameElement =>
        (TypeName as readonly string[]).includes(name),
      )
    const imageUrl: string | null =
      raw.sprites?.other?.['official-artwork']?.front_default ??
      raw.sprites?.front_default ??
      null
    if (!imageUrl || types.length === 0) return null
    return {
      displayName: englishName.charAt(0).toUpperCase() + englishName.slice(1),
      englishName,
      imageUrl,
      types,
    }
  } catch {
    return null
  }
}

export function useUrlSync() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [hydrated, setHydrated] = useState(false)

  const selectedTypes = useUpToTwoStore((s) => s.selectedTypes)
  const setTypes = useUpToTwoStore((s) => s.setTypes)

  const slotA = usePokemonSlotStore((s) => s.slotA)
  const slotB = usePokemonSlotStore((s) => s.slotB)
  const setSlot = usePokemonSlotStore((s) => s.setSlot)

  // URL → store: 마운트 시 1회만 실행
  useEffect(() => {
    const hydrate = async () => {
      const slotAParam = searchParams.get('slotA')
      const slotBParam = searchParams.get('slotB')
      const type1Param = searchParams.get('type1')
      const type2Param = searchParams.get('type2')

      const [dataA, dataB] = await Promise.all([
        slotAParam ? fetchPokemonSlotData(slotAParam) : Promise.resolve(null),
        slotBParam ? fetchPokemonSlotData(slotBParam) : Promise.resolve(null),
      ])

      if (dataA) setSlot('A', dataA)
      if (dataB) setSlot('B', dataB)

      if (dataB) {
        setTypes(dataB.types)
      } else if (dataA) {
        setTypes(dataA.types)
      } else {
        const types: TypeNameElement[] = []
        if (type1Param && (TypeName as readonly string[]).includes(type1Param))
          types.push(type1Param as TypeNameElement)
        if (type2Param && (TypeName as readonly string[]).includes(type2Param))
          types.push(type2Param as TypeNameElement)
        if (types.length > 0) setTypes(types)
      }

      setHydrated(true)
    }
    hydrate()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // store → URL: hydration 완료 후 상태 변경 시 동기화
  useEffect(() => {
    if (!hydrated) return

    const params = new URLSearchParams()
    if (slotA?.englishName) params.set('slotA', slotA.englishName)
    if (slotB?.englishName) params.set('slotB', slotB.englishName)
    if (selectedTypes[0]) params.set('type1', selectedTypes[0])
    if (selectedTypes[1]) params.set('type2', selectedTypes[1])

    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }, [hydrated, selectedTypes, slotA, slotB]) // eslint-disable-line react-hooks/exhaustive-deps
}
