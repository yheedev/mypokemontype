import type { ReactNode } from 'react'
import Title from '../UI/Title'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* <main className="bg-background flex-1 overflow-y-auto"> */}
      <Title />
      {children}
      {/* </main> */}
    </div>
  )
}
