'use client'

import { use } from 'react'
//import { notFound } from 'next/navigation'
import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import { useLanguageStore } from '@/stores/useLanguageStore'

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = use(params)
  const setLanguage = useLanguageStore((state) => state.setLanguage)

  useEffect(() => {
    const allowedLangs = ['ko', 'en', 'ja'] as const
    if (allowedLangs.includes(lang as any)) {
      setLanguage(lang as (typeof allowedLangs)[number])
    }
  }, [lang])

  return <Layout>{children}</Layout>
}

// - [ ] 404 페이지 추가
