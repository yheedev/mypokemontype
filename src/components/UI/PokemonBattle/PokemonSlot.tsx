'use client'

import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { Pill } from '@/components/UI/Pill'
import { cn } from '@/lib/utils'
import type { PokemonSlotData } from '@/stores/usePokemonSlotStore'

export type SlotColorScheme = 'offense' | 'defense' | 'default'

interface PokemonSlotProps {
  colorScheme: SlotColorScheme
  defaultName: string
  isAttacker: boolean
  data: PokemonSlotData | null
  isActive: boolean
  disabled?: boolean
  onClick: () => void
  onClear: () => void
}

const COLOR_SCHEME = {
  offense: {
    border: 'border-[var(--offenseRec)]',
    activeShadow: 'shadow-[0_0_0_3px_var(--offenseRec)]',
    roleColor: 'text-[var(--offenseRec)]',
  },
  defense: {
    border: 'border-[var(--defenseRec)]',
    activeShadow: 'shadow-[0_0_0_3px_var(--defenseRec)]',
    roleColor: 'text-[var(--defenseRec)]',
  },
  default: {
    border: 'border-[var(--border)]',
    activeShadow: 'shadow-[0_0_0_3px_var(--disable)]',
    roleColor: 'text-[var(--text)] opacity-50',
  },
}

export function PokemonSlot({
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
  const style = COLOR_SCHEME[colorScheme]

  return (
    <div className="relative h-full">
      {/* 슬롯 본체 */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={disabled ? undefined : onClick}
        onKeyDown={(e) =>
          !disabled && (e.key === 'Enter' || e.key === ' ') && onClick()
        }
        className={cn(
          'flex h-full min-h-[175px] w-full flex-col items-center gap-3',
          'rounded-[22px] bg-[var(--card)] px-4 py-5',
          'border text-[var(--text)] shadow-md',
          'transition-all duration-200',
          style.border,
          disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
          !disabled && isActive && style.activeShadow,
        )}
      >
        <span
          className={cn(
            'text-[10px] font-bold tracking-widest uppercase',
            style.roleColor,
          )}
        >
          {isAttacker ? t('Battle.attacker') : t('Battle.attackerTarget')}
        </span>

        {data ? (
          data.imageUrl ? (
            <div className="flex flex-1 items-center gap-3">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[var(--background)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.imageUrl}
                  alt={data.displayName}
                  width={52}
                  height={52}
                  className="h-[52px] w-[52px] object-contain"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
                <span className="text-md w-full truncate font-bold capitalize">
                  {data.displayName}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {data.types.map((type) => (
                    <Pill
                      key={type}
                      pokemonTypeName={type}
                      animation={false}
                      isActive={true}
                    />
                  ))}
                </div>
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
