export type SlotColorScheme = 'offense' | 'defense' | 'default'

export const COLOR_SCHEME = {
  offense: {
    border: 'border-[var(--offenseRec)]',
    activeShadow: 'shadow-[0_0_0_3px_var(--offenseRec)]',
    roleColor: 'text-[var(--offenseRec)]',
    flashBg: 'bg-[rgba(227,78,78,.15)]',
  },
  defense: {
    border: 'border-[var(--defenseRec)]',
    activeShadow: 'shadow-[0_0_0_3px_var(--defenseRec)]',
    roleColor: 'text-[var(--defenseRec)]',
    flashBg: 'bg-[rgba(104,151,169,.15)]',
  },
  default: {
    border: 'border-[var(--border)]',
    activeShadow: 'shadow-[0_0_0_3px_var(--disable)]',
    roleColor: 'text-[var(--text)] opacity-50',
    flashBg: 'bg-[rgba(150,150,150,.15)]',
  },
} as const
