'use client'

import { useEffect, useState } from 'react'
import { initI18n } from '@/lib/i18n'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { Skeleton } from '@/components/UI/Skeleton'
import { useDarkModeStore } from '@/stores/useDarkModeStore'

export default function Layout({ children }: { children: React.ReactNode }) {
  const lang = useLanguageStore((state) => state.lang)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initI18n(lang).then(() => setReady(true))
    useDarkModeStore.getState().initTheme()
  }, [lang])

  if (!ready) {
    return <Skeleton className="h-screen w-full" />
  }

  return <div lang={lang}>{children}</div>
}
