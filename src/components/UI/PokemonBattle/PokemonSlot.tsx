'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { Pill } from '@/components/UI/Pill'
import { cn } from '@/lib/utils'
import { COLOR_SCHEME } from '@/constants/pokemonSlot'
import type { SlotColorScheme } from '@/constants/pokemonSlot'
import type { Mode } from '@/constants/mode'
import { useLanguageStore } from '@/stores/useLanguageStore'
import type { PokemonSlotData } from '@/stores/usePokemonSlotStore'

interface PokemonSlotProps {
  mode: Mode
  colorScheme: SlotColorScheme
  defaultName: string
  isAttacker: boolean
  data: PokemonSlotData | null
  isActive: boolean
  disabled?: boolean
  onClick: () => void
  onClear: () => void
}

export function PokemonSlot({
  mode,
  colorScheme,
  defaultName,
  isAttacker,
  data,
  isActive,
  disabled = false,
  onClick,
  onClear,
}: PokemonSlotProps) {
  const { t } = useTranslation()
  const { lang } = useLanguageStore()
  const style = COLOR_SCHEME[colorScheme]

  // 한국어·영어: 띄어쓰기 기준 줄넘김 / 일본어: 문자 단위 줄넘김
  const textBreak = lang === 'ja' ? 'break-all' : 'break-keep'

  const roleLabel =
    mode === 'offense'
      ? isAttacker
        ? 'Battle.attacker'
        : 'Battle.attackerTarget'
      : isAttacker
        ? 'Battle.defense'
        : 'Battle.defenseTarget'

  const [isFlashing, setIsFlashing] = useState(false)

  const handleClick = () => {
    if (disabled) return
    setIsFlashing(true)
    onClick()
    setTimeout(() => setIsFlashing(false), 300)
  }

  return (
    <div className="relative h-full">
      {/* 슬롯 본체 */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={(e) =>
          !disabled && (e.key === 'Enter' || e.key === ' ') && handleClick()
        }
        className={cn(
          'flex h-full min-h-[175px] w-full flex-col items-center',
          'rounded-[22px] p-3 sm:p-5',
          'border text-[var(--text)] shadow-md',
          'transition-colors duration-200',
          style.border,
          isFlashing ? style.flashBg : 'bg-[var(--card)]',
          disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
          !disabled && isActive && style.activeShadow,
        )}
      >
        <div
          className={cn(
            'flex h-9 w-full items-center justify-center',
            style.roleColor,
          )}
        >
          <span
            className={cn(
              'text-center text-[12px] font-bold uppercase',
              textBreak,
            )}
          >
            {t(roleLabel)}
          </span>
        </div>

        {data ? (
          data.imageUrl ? (
            <div className="flex flex-1 flex-col items-center gap-3 align-middle">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full">
                <img
                  src={data.imageUrl}
                  alt={data.displayName}
                  width={52}
                  height={52}
                  className="h-[52px] w-[52px] object-contain"
                />
              </div>
              <span
                className={cn(
                  'text-md w-full text-center font-bold capitalize',
                  textBreak,
                )}
              >
                {data.displayName}
              </span>
              <div className="flex flex-wrap justify-center gap-1.5">
                {data.types.map((type) => (
                  <Pill
                    key={type}
                    pokemonTypeName={type}
                    animation={false}
                    isActive={true}
                    size="md"
                  />
                ))}
              </div>
            </div>
          ) : (
            // 수동 타입 선택 상태: 타입만 중앙 정렬
            <div className="flex flex-1 flex-wrap content-center justify-center gap-1.5 py-2">
              {data.types.map((type) => (
                <Pill
                  key={type}
                  pokemonTypeName={type}
                  animation={false}
                  isActive={true}
                  size="md"
                />
              ))}
            </div>
          )
        ) : (
          // 빈 슬롯: 원형 + 이름 세로 중앙 정렬
          <div className="flex w-full flex-1 flex-col items-center justify-center gap-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-[var(--border)] bg-[var(--background)]">
              <span className="text-2xl text-[var(--text)] opacity-20">?</span>
            </div>
            <span className="text-sm font-semibold text-[var(--text)] opacity-30">
              {defaultName}
            </span>
          </div>
        )}
      </div>

      {/* 포켓몬이 있고 비활성화되지 않았을 때만 삭제 버튼 표시 */}
      {data && !disabled && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClear()
          }}
          aria-label="clear slot"
          className={cn(
            'absolute top-2.5 right-2.5',
            'flex h-6 w-6 items-center justify-center rounded-full',
            'bg-[var(--background)] text-[var(--text)] opacity-40',
            'transition-opacity duration-150 hover:opacity-80',
          )}
        >
          <X size={12} />
        </button>
      )}
    </div>
  )
}
