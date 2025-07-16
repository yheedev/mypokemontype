'use client'

//import { notFound } from 'next/navigation'
import Layout from '@/components/Layout'
import { initI18n } from '@/i18n'
import { useEffect, useState } from 'react'
import { useLanguageStore } from '@/stores/useLanguageStore'

export default function LangLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isReady, setIsReady] = useState(false)
  const setLanguage = useLanguageStore((state) => state.setLanguage)

  const supportedLangs = ['ko', 'en', 'ja']

  useEffect(() => {
    initI18n().then((i18n) => {
      setLanguage(i18n.language as any)
      setIsReady(true)
    })
  }, [])

  if (!isReady) return <div>Loading...</div>

  return <Layout>{children}</Layout>
}

// - [ ] 404 페이지 추가
