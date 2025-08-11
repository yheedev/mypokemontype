'use client'

import { use } from 'react'
import { useEffect, useState } from 'react'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { useDarkModeStore } from '@/stores/useDarkModeStore'
import { supportedLangs, Language } from '@/types/language'
import { saveLang } from '@/utils/langs'
import AllBtns from '@/components/UI/Buttons/AllBtns'
import Title from '@/components/UI/Title'
import { Skeleton } from '@/components/UI/Skeleton'
import { initI18n, i18n } from '@/lib/i18n'
import Favicon from '@/components/UI/Favicon'

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = use(params)
  const setLanguage = useLanguageStore((state) => state.setLanguage)
  const setTheme = useDarkModeStore((state) => state.setTheme)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const runInit = async () => {
      const validLang = supportedLangs.includes(lang as Language)
        ? (lang as Language)
        : 'ko'

      // i18n 초기화
      await initI18n(validLang)
      await i18n.changeLanguage(validLang)
      setLanguage(validLang)
      saveLang(validLang)

      // 테마 초기화
      const localTheme = localStorage.getItem('mypkmn-theme')
      if (localTheme) {
        const parsed = JSON.parse(localTheme)
        if (parsed.state?.theme === 'dark' || parsed.state?.theme === 'light') {
          setTheme(parsed.state.theme)
          setReady(true)
          return
        }
      }

      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches
      const theme = prefersDark ? 'dark' : 'light'
      setTheme(theme)
      localStorage.setItem('mypkmn-theme', JSON.stringify({ state: { theme } }))

      setReady(true)
    }

    runInit()
  }, [lang])

  if (!ready) {
    return (
      <div className="m-4 mt-50 grid grid-cols-1 gap-12 p-4 xl:grid-cols-2">
        {[0, 1].map((k) => (
          <div
            key={k}
            className="rounded-[22px] bg-[--color-card] p-6 shadow-lg"
          >
            <Skeleton className="mb-4 h-6 w-48 animate-pulse" />
            <Skeleton className="mb-6 h-px w-full animate-pulse" />
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-[repeat(auto-fill,_minmax(110px,_1fr))]">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="h-10 animate-pulse rounded-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div lang={lang}>
      <Favicon />
      <Title />
      <main>{children}</main>
      <AllBtns />
    </div>
  )
}
