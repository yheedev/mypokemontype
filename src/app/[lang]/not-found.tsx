'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { initI18n, i18n } from '@/lib/i18n'
import NotFoundView from '@/components/NotFoundView'

export default function NotFoundInLang() {
  const { lang } = useParams() as { lang: string }
  const [ready, setReady] = useState(false)

  useEffect(() => {
    ;(async () => {
      await initI18n(lang)
      await i18n.changeLanguage(lang)
      setReady(true)
    })()
  }, [lang])

  if (!ready) return null
  return <NotFoundView />
}
