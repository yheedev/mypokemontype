import { MODE, Mode } from '@/constants/mode'

export const getModeByPath = (pathname: string, lang: string): Mode =>
  pathname === `/${lang}` ? MODE.offense : MODE.defense

export const isOffensePath = (pathname: string, lang: string): boolean =>
  getModeByPath(pathname, lang) === MODE.offense
