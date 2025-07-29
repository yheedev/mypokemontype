'use client'

import { use } from 'react'
//import { notFound } from 'next/navigation'
import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { useDarkModeStore } from '@/stores/useDarkModeStore'
import { supportedLangs, Language } from '@/types/language'
import { saveLang } from '@/utils/langs'
import AllBtns from '@/components/UI/Buttons/AllBtns'
import Title from '@/components/UI/Title'

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

  useEffect(() => {
    if (supportedLangs.includes(lang as Language)) {
      setLanguage(lang as Language)
      saveLang(lang as Language)
    }

    const localTheme = localStorage.getItem('mypkmn-theme')
    if (localTheme) {
      const parsed = JSON.parse(localTheme)
      if (parsed.state?.theme === 'dark' || parsed.state?.theme === 'light') {
        setTheme(parsed.state.theme)
        return
      }
    }

    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches
    const theme = prefersDark ? 'dark' : 'light'
    setTheme(theme)
    localStorage.setItem('mypkmn-theme', JSON.stringify({ state: { theme } }))
  }, [lang])

  return (
    <Layout>
      <Title />
      <main>{children}</main>
      <AllBtns />
    </Layout>
  )
}
