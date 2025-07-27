'use client'

import { useEffect, useState } from 'react'
import { initI18n } from '@/lib/i18n'
import { useLanguageStore } from '@/stores/useLanguageStore'
import Layout from '@/components/Layout'
import Title from '@/components/UI/Title'
import { Skeleton } from '@/components/UI/Skeleton'

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode
}) {
  const lang = useLanguageStore((state) => state.lang)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    initI18n(lang).then(() => setIsReady(true))
  }, [lang])

  if (!isReady) {
    return <Skeleton className="h-screen w-full" />
  }

  return (
    <>
      <Title />
      <Layout>{children}</Layout>
    </>
  )
}
