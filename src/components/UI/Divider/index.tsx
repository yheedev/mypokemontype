'use client'

type DviderClassName = {
  className?: string
}

export default function Divider({ className }: DviderClassName) {
  return (
    <hr
      role="separator"
      className="my-4 h-0.5 border-[var(--border)] sm:my-2"
    />
  )
}
