import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  return {
    alternates: {
      canonical: `https://mypokemontype.vercel.app/${lang}/more`,
    },
  }
}

export default function MoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
