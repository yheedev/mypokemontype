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

  const { selectedTypes, isUserChange, setTypes, resetTypes } = useUpToTwoStore()
  const offenseCal = useOffenseCalStore((state) => state.calculate)
  const defenseCal = useDefenseCalStore((state) => state.calculate)

  const attackerData = isLeftAttacker ? slotA : slotB
  const defenderData = isLeftAttacker ? slotB : slotA

  // 슬롯 상태가 바뀔 때마다 공격·방어 양쪽 계산 모두 실행
  useEffect(() => {
    const [atkType1, atkType2] = attackerData?.types ?? []
    const [defType1, defType2] = defenderData?.types ?? []
    offenseCal({ type1: atkType1, type2: atkType2 })
    defenseCal({ type1: defType1, type2: defType2 })
  }, [attackerData, defenderData, offenseCal, defenseCal])

  // PillGroup 수동 선택 → 활성 슬롯에 반영
  // isUserChange=true(toggleType)일 때만 동작, setTypes/resetTypes(프로그래밍)는 무시
  useEffect(() => {
    if (!isUserChange) return
    if (activeSlot === null) return

    const currentSlotData = activeSlot === 'A' ? slotA : slotB
    if (currentSlotData !== null && currentSlotData.imageUrl !== null) return // 포켓몬이 있으면 덮어쓰지 않음

    if (selectedTypes.length === 0) {
      if (currentSlotData !== null) clearSlot(activeSlot) // 타입 전부 해제 시 슬롯도 비움
      return
    }

    setSlot(activeSlot, { displayName: '', englishName: '', imageUrl: null, types: selectedTypes })
  // slotA·slotB를 deps에서 제외해 루프 방지
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTypes, isUserChange, activeSlot])

  // 슬롯 클릭: 활성화 시 해당 슬롯의 타입을 PillGroup에 반영 (isUserChange=false → 슬롯 재sync 없음)
  const handleSlotClick = (slot: 'A' | 'B') => {
    const isActivating = activeSlot !== slot
    setActiveSlot(slot)

    if (isActivating) {
      const slotData = slot === 'A' ? slotA : slotB
      if (slotData !== null) {
        setTypes(slotData.types) // 포켓몬이든 수동 타입이든 해당 슬롯의 타입을 pills에 표시
      } else {
        resetTypes() // 빈 슬롯: pills 초기화
      }
    }
  }

  // X 버튼 처리: 타입만 있는 슬롯이면 pill 선택도 함께 초기화
  const handleClearSlot = (slot: 'A' | 'B') => {
    const slotData = slot === 'A' ? slotA : slotB
    clearSlot(slot)
    if (slotData !== null && slotData.imageUrl === null) {
      resetTypes()
    }
  }

  const slotAColorScheme = mode === 'offense' ? 'offense' : 'defense'
  // offense 페이지에서 슬롯 A가 비어있으면 슬롯 B 비활성화
  const isSlotBDisabled = mode === 'offense' && slotA === null

  return (
    <div className="mx-4 mt-2 mb-1 flex flex-col gap-2 px-4">
      <div className="grid grid-cols-[1fr_88px_1fr] items-center gap-3">
        <PokemonSlot
          colorScheme={slotAColorScheme}
          defaultName={t('Battle.myPokemon')}
          isAttacker={isLeftAttacker}
          data={slotA}
          isActive={activeSlot === 'A'}
          onClick={() => handleSlotClick('A')}
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
          disabled={isSlotBDisabled}
          onClick={() => handleSlotClick('B')}
          onClear={() => handleClearSlot('B')}
        />
      </div>
      <BattleSentence attackerData={attackerData} defenderData={defenderData} />
    </div>
  )
}
