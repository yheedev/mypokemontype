'use client'

import { use, useEffect } from 'react'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { useDarkModeStore } from '@/stores/useDarkModeStore'
import { supportedLangs, Language } from '@/types/language'
import { saveLang } from '@/utils/langs'
import AllBtns from '@/components/UI/Buttons/AllBtns'
import Title from '@/components/UI/Title'
import { initI18n } from '@/lib/i18n'
import Favicon from '@/components/UI/Favicon'
import { notFound } from 'next/navigation'

export function LangLayoutClient({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = use(params)

  if (!supportedLangs.includes(lang as Language)) notFound()

  const validLang = lang as Language

  // 번역 파일이 번들에 포함되어 있으므로 동기 초기화 가능 → 스켈레톤 불필요
  initI18n(validLang)

  const setLanguage = useLanguageStore((state) => state.setLanguage)
  const initTheme = useDarkModeStore((state) => state.initTheme)

  useEffect(() => {
    setLanguage(validLang)
    saveLang(validLang)
    initTheme()
  }, [validLang])

  return (
    <div lang={validLang}>
      <Favicon />
      <Title />
      <main>{children}</main>
      <AllBtns />
    </div>
  )
}
