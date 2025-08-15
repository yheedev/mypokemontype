import { NextRequest, NextResponse } from 'next/server'
import { supportedLangs, type Language } from './types/language'
import { geolocation } from '@vercel/functions'

export const config = {
  matcher: ['/((?!api|_next|.*\\..*|favicon.ico|robots.txt|sitemap.xml).*)'],
}

function countryToLocale(country?: string): Language | null {
  const c = country?.toUpperCase()
  if (c === 'KR') return 'ko'
  if (c === 'JP') return 'ja'
  return null
}

function negotiateLocale(req: NextRequest): Language {
  const h = (req.headers.get('accept-language') || '').toLowerCase()
  if (h.includes('ko')) return 'ko'
  if (h.includes('ja')) return 'ja'
  return 'en'
}

export default function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req
  const { pathname } = nextUrl

  const hasLocalePrefix = supportedLangs.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  )
  if (hasLocalePrefix) {
    return NextResponse.next()
  }

  const cookieLang = cookies.get('lang')?.value as Language | undefined
  if (cookieLang && supportedLangs.includes(cookieLang)) {
    const res = NextResponse.redirect(
      new URL(`/${cookieLang}${pathname}`, req.url),
    )
    res.headers.set('Vary', 'X-Vercel-IP-Country, Accept-Language, Cookie')
    return res
  }

  const geo = geolocation(req)
  const fromCountry = countryToLocale(geo.country)

  let locale: Language
  if (geo.country) {
    locale = fromCountry ?? 'en'
  } else {
    locale = negotiateLocale(req)
  }

  const res = NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url))
  res.cookies.set('lang', locale, {
    path: '/',
    httpOnly: false,
    sameSite: 'lax',
    secure: true,
    maxAge: 60 * 60 * 24 * 365, // 1년
  })

  res.headers.set('Vary', 'X-Vercel-IP-Country, Accept-Language, Cookie')

  res.headers.set('X-Debug-Country', geo.country ?? 'none')
  res.headers.set('X-Debug-Decision', locale)
  return res
}
