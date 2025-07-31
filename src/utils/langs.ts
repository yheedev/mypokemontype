import { supportedLangs, Language } from '@/types/language'

// 경로에서 언어 추출
export const getLangFromPath = (path: string): Language | null => {
  const lang = path.split('/')[1]
  return supportedLangs.includes(lang as Language) ? (lang as Language) : null
}

// 쿠키에서 언어 추출 (클라이언트)
export const getLangFromCookie = (): Language => {
  if (typeof document === 'undefined') return 'ko'
  const match = document.cookie.match(/lang=(ko|en|ja)/)
  return (match?.[1] as Language) || 'ko'
}

// 클라이언트 환경 기준으로 언어 초기값 결정
export const getInitialLang = (): Language => {
  if (typeof window === 'undefined') return 'ko'

  const stored = localStorage.getItem('lang') as Language | null
  if (supportedLangs.includes(stored as Language)) return stored!

  const pathLang = getLangFromPath(window.location.pathname)
  return pathLang || 'ko'
}

// 언어 설정 시 로컬스토리지와 쿠키 동시 저장
export const saveLang = (lang: Language) => {
  localStorage.setItem('lang', lang)
  document.cookie = `lang=${lang}; path=/; max-age=31536000`
}

// TODO
// [ ] 안 쓰는 유틸 삭제/리팩토링
