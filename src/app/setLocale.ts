'use server'

import { cookies } from 'next/headers'
import type { Language } from '@/types/language'

export async function setLocaleCookie(lang: Language) {
  const cookieStore = await cookies()
  if ('set' in cookieStore && typeof cookieStore.set === 'function') {
    cookieStore.set('lang', lang, {
      path: '/',
      httpOnly: false,
      sameSite: 'lax',
      secure: true,
      maxAge: 60 * 60 * 24 * 365, // 1년
    })
  }
}
