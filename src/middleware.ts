import { NextRequest, NextResponse } from 'next/server'
import { supportedLangs } from './types/language'

export const config = {
  matcher: ['/((?!api|_next|.*\\..*|favicon.ico|robots.txt|sitemap.xml).*)'],
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  const pathname = url.pathname

  if (pathname === '/') {
    const storedLang = req.cookies.get('lang')?.value
    const lang = supportedLangs.includes(storedLang as any) ? storedLang : 'ko'

    return NextResponse.redirect(new URL(`/${lang}`, req.url))
  }

  return NextResponse.next()
}
