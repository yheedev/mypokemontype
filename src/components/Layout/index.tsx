import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <main className="bg-background flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
