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
        'mx-auto flex max-w-xl flex-col gap-4 rounded-[22px] bg-[#171010] p-6 text-[var(--color-text)] shadow-md',
        className,
      )}
    >
      {children}
    </div>
  )
}

// TODO
// - [ ] 왜 카드 색깔이 background랑 똑같이 나오는지,,
