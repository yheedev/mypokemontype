'use client'
import { cn } from '@/lib/utils'

type DividerClassName = {
  className?: string
}

export default function Divider({ className }: DividerClassName) {
  return (
    <hr
      role="separator"
      className={cn('h-0.5 border-[var(--border)]', className)}
    />
  )
}
