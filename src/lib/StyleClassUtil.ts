import { twMerge } from 'tailwind-merge'
import { Mode } from '@/constants/mode'
import { Language } from '@/types/language'

export const themeToggle = 'fill-[var(--btn)] relative w-[5.5rem] h-10'
export const themeToggleIcon =
  'w-6 h-6 absolute translate-x-[-50%] translate-y-[-50%] transform fill-[var(--btn-icon)] top-[50%]'

export const modeStyle =
  'flex items-center justify-center justify-items-center border-t-0 border-r-0 border-l-0 sm:px-[4rem] sm:py-2 sm:pb-6 pb-2 text-center align-middle md:py-2 lg:pt-2'

export const modeTextStyle =
  'mb-2 inline-block  sm:pb-2  sm:text-2xl sm:font-black text-lg'

export function getLangClass(lang: Language) {
  return twMerge(lang === 'ko' ? 'tracking-[7px]' : 'tracking-[3px]')
}

export function getActiveMode(mode: Mode, current: Mode) {
  const isActive = mode === current

  if (mode === 'offense') {
    return twMerge(
      isActive
        ? 'border-b-[4px] border-[var(--offenseRec)] text-[var(--offenseRec)] lg:border-b-[7px]'
        : 'border-b-[2px] border-[var(--border)] text-[var(--disable)]',
    )
  }

  if (mode === 'defense') {
    return twMerge(
      isActive
        ? 'border-b-[4px] border-[var(--defenseRec)] text-[var(--defenseRec)] lg:border-b-[7px] '
        : 'border-b-[2px] border-[var(--border)] text-[var(--disable)]',
    )
  }

  return ''
}

// example
// export function getIconClassName() {
//   return twMerge(

//     'w-16 h-16 mx-auto flex items-center justify-center',
//     'stroke-[hsl(var(--primary))]',
//   )
// }

// export const menuClassName =
//   'flex items-center gap-2 p-3 text-sub hover:text-primary rounded-md'
