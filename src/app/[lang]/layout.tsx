import { supportedLangs } from '@/types/language'
import { LangLayoutClient } from './layout-client'

export function generateStaticParams() {
  return supportedLangs.map((lang) => ({ lang }))
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  return <LangLayoutClient params={params}>{children}</LangLayoutClient>
}
