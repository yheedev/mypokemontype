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
  onClick,
  onClear,
}: PokemonSlotProps) {
  const { t } = useTranslation()
  const style = COLOR_SCHEME[colorScheme]

  return (
    <div className="relative">
      {/* 슬롯 본체 */}
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
        className={cn(
          'flex w-full cursor-pointer flex-col items-center gap-3',
          'rounded-[22px] bg-[var(--card)] px-4 py-5',
          'border text-[var(--text)] shadow-md',
          'transition-all duration-200',
          style.border,
          isActive && style.activeShadow,
        )}
      >
        <span className={cn('text-[10px] font-bold tracking-widest uppercase', style.roleColor)}>
          {isAttacker ? t('Battle.attacker') : t('Battle.attackerTarget')}
        </span>

        {data ? (
          data.imageUrl ? (
            // 포켓몬 검색으로 채운 상태: 이미지 + 이름 + 타입
            <>
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--background)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.imageUrl}
                  alt={data.displayName}
                  width={72}
                  height={72}
                  className="h-[72px] w-[72px] object-contain"
                />
              </div>
              <span className="text-sm font-bold capitalize">{data.displayName}</span>
              <div className="flex flex-wrap justify-center gap-1.5">
                {data.types.map((type) => (
                  <Pill key={type} pokemonTypeName={type} animation={false} isActive={true} />
                ))}
              </div>
            </>
          ) : (
            // 수동 타입 선택 상태: 이미지 없이 타입만 표시
            <div className="flex min-h-[108px] flex-wrap content-center justify-center gap-1.5 py-2">
              {data.types.map((type) => (
                <Pill key={type} pokemonTypeName={type} animation={false} isActive={true} />
              ))}
            </div>
          )
        ) : (
          // 빈 슬롯
          <>
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-[var(--border)] bg-[var(--background)]">
              <span className="text-2xl text-[var(--text)] opacity-20">?</span>
            </div>
            <span className="text-sm font-semibold text-[var(--text)] opacity-30">{defaultName}</span>
            <div className="h-[22px]" />
          </>
        )}
      </div>

      {/* 포켓몬이 있을 때만 삭제 버튼 표시 */}
      {data && (
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
