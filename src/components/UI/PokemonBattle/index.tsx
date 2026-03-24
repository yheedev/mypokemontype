'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { usePokemonSlotStore } from '@/stores/usePokemonSlotStore'
import { useUpToTwoStore } from '@/stores/useUpToTwoStore'
import { useOffenseCalStore } from '@/stores/useOffenseCalStore'
import { useDefenseCalStore } from '@/stores/useDefenseCalStore'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { getModeByPath } from '@/utils/pathMode'
import { PokemonSlot } from './PokemonSlot'
import { DirectionArrow } from './DirectionArrow'
import { BattleSentence } from './BattleSentence'

export default function PokemonBattle() {
  const { t } = useTranslation()
  const pathname = usePathname()
  const { lang } = useLanguageStore()
  const mode = getModeByPath(pathname, lang)

  const { slotA, slotB, activeSlot, isLeftAttacker, setActiveSlot, setSlot, clearSlot, toggleDirection } =
    usePokemonSlotStore()

  const { selectedTypes, resetTypes } = useUpToTwoStore()
  const offenseCal = useOffenseCalStore((state) => state.calculate)
  const defenseCal = useDefenseCalStore((state) => state.calculate)

  const attackerData = isLeftAttacker ? slotA : slotB
  const defenderData = isLeftAttacker ? slotB : slotA

  // 슬롯 상태·페이지 모드가 바뀔 때마다 계산 실행 (빈 슬롯이면 undefined → allTypes1x)
  useEffect(() => {
    const types = mode === 'offense' ? attackerData?.types : defenderData?.types
    const [type1, type2] = types ?? []
    mode === 'offense'
      ? offenseCal({ type1, type2 })
      : defenseCal({ type1, type2 })
  }, [attackerData, defenderData, mode, offenseCal, defenseCal])

  // PillGroup 수동 선택 → 슬롯 A 반영
  // 조건: 슬롯 B가 활성화되지 않았고, 슬롯 A에 포켓몬(imageUrl)이 없을 때만
  useEffect(() => {
    if (activeSlot === 'B') return
    if (slotA !== null && slotA.imageUrl !== null) return // 포켓몬이 있으면 덮어쓰지 않음

    if (selectedTypes.length === 0) {
      if (slotA !== null) clearSlot('A') // 타입 전부 해제 시 슬롯도 비움
      return
    }

    setSlot('A', { displayName: '', englishName: '', imageUrl: null, types: selectedTypes })
  // slotA를 deps에서 제외해 루프 방지 (selectedTypes·activeSlot 변경 시에만 실행)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTypes, activeSlot])

  // X 버튼 처리: 타입만 있는 슬롯이면 pill 선택도 함께 초기화
  const handleClearSlot = (slot: 'A' | 'B') => {
    const slotData = slot === 'A' ? slotA : slotB
    clearSlot(slot)
    if (slotData !== null && slotData.imageUrl === null) {
      resetTypes()
    }
  }

  const slotAColorScheme = mode === 'offense' ? 'offense' : 'defense'

  return (
    <div className="mx-4 mt-2 mb-1 flex flex-col gap-2 px-4">
      <div className="grid grid-cols-[1fr_88px_1fr] items-center gap-3">
        <PokemonSlot
          colorScheme={slotAColorScheme}
          defaultName={t('Battle.myPokemon')}
          isAttacker={isLeftAttacker}
          data={slotA}
          isActive={activeSlot === 'A'}
          onClick={() => setActiveSlot('A')}
          onClear={() => handleClearSlot('A')}
        />
        <DirectionArrow
          isLeftAttacker={isLeftAttacker}
          disabled={mode === 'offense'}
          onClick={toggleDirection}
        />
        <PokemonSlot
          colorScheme="default"
          defaultName={t('Battle.otherPokemon')}
          isAttacker={!isLeftAttacker}
          data={slotB}
          isActive={activeSlot === 'B'}
          onClick={() => setActiveSlot('B')}
          onClear={() => handleClearSlot('B')}
        />
      </div>
      <BattleSentence attackerData={attackerData} defenderData={defenderData} />
    </div>
  )
}
