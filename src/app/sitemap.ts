import type { MetadataRoute } from 'next'
import { supportedLangs } from '@/types/language'

const BASE_URL = 'https://mypokemontype.vercel.app'

const PAGES = [
  { path: '', priority: 1.0, changeFrequency: 'monthly' as const },
  { path: '/defense', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/more', priority: 0.5, changeFrequency: 'monthly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return supportedLangs.flatMap((lang) =>
    PAGES.map(({ path, priority, changeFrequency }) => ({
      url: `${BASE_URL}/${lang}${path}`,
      lastModified: new Date('2025-06-17'),
      changeFrequency,
      priority,
      alternates: {
        languages: {
          'x-default': `${BASE_URL}/en${path}`,
          ...Object.fromEntries(
            supportedLangs.map((l) => [l, `${BASE_URL}/${l}${path}`]),
          ),
        },
      },
    })),
  )
}
