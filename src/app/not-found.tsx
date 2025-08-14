'use client'

import { useEffect, useState } from 'react'
import { initI18n, i18n } from '@/lib/i18n'
import { supportedLangs } from '@/types/language'
import NotFoundView from '@/components/NotFoundView'

export default function GlobalNotFound() {
  const [ready, setReady] = useState(false)

  const detected = (() => {
    if (typeof window === 'undefined') return 'ko'
    const seg = window.location.pathname.split('/').filter(Boolean)[0]
    return supportedLangs.includes(seg as any) ? seg : 'ko'
  })()

  useEffect(() => {
    ;(async () => {
      await initI18n(detected)
      await i18n.changeLanguage(detected)
      setReady(true)
    })()
  }, [detected])

  if (!ready) return null

  return <NotFoundView />
}
