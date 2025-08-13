'use client'

import Card from '@/components/UI/Card'
import Divider from '@/components/UI/Divider'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { PATH } from '@/app/routes'
import { notFound } from 'next/navigation'

export default function notFoundPage() {
  const { t } = useTranslation()

  return (
    <main>
      <Card className="flex-row flex-wrap items-center justify-center gap-8 p-12 sm:mx-8 sm:mt-12 sm:mb-8 md:mx-44 md:my-16">
        <h1 className="text-3xl font-bold">{t('language.notFound')}</h1>
        <Divider />
        <Link
          href={PATH().offense}
          className="mt-6 rounded bg-[--offenseRec] px-6 py-2 font-semibold text-white hover:opacity-90"
        ></Link>
      </Card>
    </main>
  )
}
