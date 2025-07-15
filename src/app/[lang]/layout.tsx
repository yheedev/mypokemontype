'use client'

import { notFound } from 'next/navigation'
import Layout from '@/components/Layout'

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const supportedLangs = ['ko', 'en', 'ja']
  if (!supportedLangs.includes(params.lang)) {
    notFound()
  }

  return <Layout>{children}</Layout>
}
