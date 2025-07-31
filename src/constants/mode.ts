export const MODE = {
  offense: 'offense',
  defense: 'defense',
} as const

export type Mode = (typeof MODE)[keyof typeof MODE]
