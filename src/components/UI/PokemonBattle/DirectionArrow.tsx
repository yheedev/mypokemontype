'use client'

import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { MoveRight } from 'lucide-react'

interface DirectionArrowProps {
  isLeftAttacker: boolean
  onClick: () => void
}

export function DirectionArrow({
  isLeftAttacker,
  onClick,
}: DirectionArrowProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center gap-1.5">
      <button
        onClick={onClick}
        aria-label={t('Battle.toggleDirection')}
        className={cn(
          'flex h-11 w-11 items-center justify-center rounded-full sm:h-16 sm:w-16',
          'border border-[var(--border)] bg-[var(--card)] shadow-md',
          'transition-all duration-200',
          'hover:scale-105 hover:border-[var(--text)] active:scale-95',
        )}
      >
        <MoveRight
          size={24}
          className={cn(
            'transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] dark:text-[var(--text)]',
            !isLeftAttacker && 'rotate-180',
          )}
        />
      </button>
      <span className="text-[10px] text-[var(--text)] opacity-40">
        {t('Battle.toggleDirection')}
      </span>
    </div>
  )
}
