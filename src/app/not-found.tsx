'use client'

import { useEffect, useState } from 'react'
import { initI18n, i18n } from '@/lib/i18n'
import { supportedLangs, type Language } from '@/types/language'
import NotFoundView from '@/components/NotFoundView'

const isValidLang = (x: any): x is Language =>
  supportedLangs.includes(x as Language)

const getCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') return undefined
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return m ? decodeURIComponent(m[1]) : undefined
}

export default function GlobalNotFound() {
  const [ready, setReady] = useState(false)

  const urlSeg = (() => {
    if (typeof window === 'undefined') return undefined
    const first = window.location.pathname.split('/').filter(Boolean)[0]
    return isValidLang(first) ? (first as Language) : undefined
  })()

  const cookieLang = getCookie('lang')
  const preferred: Language =
    urlSeg ??
    (isValidLang(cookieLang) ? (cookieLang as Language) : undefined) ??
    (isValidLang(i18n.language) ? (i18n.language as Language) : undefined) ??
    'ko'

  useEffect(() => {
    ;(async () => {
      await initI18n(preferred)
      await i18n.changeLanguage(preferred)

      try {
        const local = localStorage.getItem('mypkmn-theme')
        if (!local) {
          const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)',
          ).matches
          localStorage.setItem(
            'mypkmn-theme',
            JSON.stringify({
              state: { theme: prefersDark ? 'dark' : 'light' },
            }),
          )
        }
      } catch {}
      setReady(true)
    })()
  }, [preferred])

  if (!ready) return null

  return <NotFoundView />
}
