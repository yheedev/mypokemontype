'use client'

import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { MoveRight } from 'lucide-react'

interface DirectionArrowProps {
  isLeftAttacker: boolean
  disabled?: boolean
  onClick: () => void
}

export function DirectionArrow({
  isLeftAttacker,
  disabled = false,
  onClick,
}: DirectionArrowProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center gap-1.5">
      <button
        onClick={onClick}
        disabled={disabled}
        aria-label={t('Battle.toggleDirection')}
        className={cn(
          'flex h-16 w-16 items-center justify-center rounded-full',
          'border border-[var(--border)] bg-[var(--card)] shadow-md',
          'transition-all duration-200',
          disabled
            ? 'cursor-not-allowed opacity-30'
            : 'hover:scale-105 hover:border-[var(--text)] active:scale-95',
        )}
      >
        <MoveRight
          size={24}
          className={cn(
            'transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)]',
            !isLeftAttacker && 'rotate-180',
          )}
        />
      </button>
      <span className={cn('text-[10px] text-[var(--text)]', disabled ? 'opacity-20' : 'opacity-40')}>
        {t('Battle.toggleDirection')}
      </span>
    </div>
  )
}
