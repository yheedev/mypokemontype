import { twMerge } from 'tailwind-merge'

export const themeToggle = 'fill-[var(--btn)] relative w-[5.5rem] h-10'
export const themeToggleIcon =
  'w-6 h-6 absolute translate-x-[-50%] translate-y-[-50%] transform fill-[var(--btn-icon)] top-[50%]'

// example
// export function getIconClassName() {
//   return twMerge(
//     'w-16 h-16 mx-auto flex items-center justify-center',
//     'stroke-[hsl(var(--primary))]',
//   )
// }

// export const menuClassName =
//   'flex items-center gap-2 p-3 text-sub hover:text-primary rounded-md'
