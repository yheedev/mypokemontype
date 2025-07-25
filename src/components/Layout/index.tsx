'use client'

import { useEffect, useState } from 'react'
import i18n from 'i18next'
import { initI18n } from '@/lib/i18n'
import { useLanguageStore } from '@/stores/useLanguageStore'

export default function Layout({ children }: { children: React.ReactNode }) {
  const lang = useLanguageStore((state) => state.lang)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initI18n().then(() => {
      i18n.changeLanguage(lang).then(() => setReady(true))
    })
  }, [lang])

  if (!ready) return null

  return (
    <div lang={lang}>
      {/* <main className="bg-background flex-1 overflow-y-auto"> */}
      {/* <Title /> */}
      {children}
      {/* </main> */}
    </div>
  )
}
