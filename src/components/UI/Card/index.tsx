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
        'flex flex-col rounded-[22px] bg-[var(--card)] px-4 pt-4 text-[var(--text)] shadow-md',
        className,
      )}
    >
      {children}
    </div>
  )
}
