'use client'

import { cn } from '@/lib/utils'

type CardProps = {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-[22px] bg-[var(--card)] p-4 text-[var(--text)] shadow-md',
        // 'flex flex-col gap-4 rounded-[22px] bg-[var(--card)] text-[var(--text)] shadow-md',
        className,
      )}
    >
      {children}
    </div>
  )
}
