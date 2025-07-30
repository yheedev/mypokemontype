import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Flame from '@/assets/Flame.svg'
import { useTranslation } from 'react-i18next'
import type { Language } from '@/types/language'
import { isOffensePath } from '@/utils/pathMode'

export default function BestIcon({ lang }: { lang: Language }) {
  const pathname = usePathname()
  const isOffense = isOffensePath(pathname, lang)
  const { t } = useTranslation()

  const color = isOffense
    ? 'fill-[var(--offenseRec)] stroke-[var(--offenseRec)]'
    : 'fill-[var(--defenseRec)] stroke-[var(--defenseRec)]'

  return (
    <div className={cn(color)} aria-label={t('a11y.bestIcon.aria-label')}>
      <Flame className="mt-4 ml-2 h-8 w-8 rounded-full border-4 border-current p-[0.1rem]" />
    </div>
  )
}

// export const FlameIcon = styled(Flame)<{
//   color: string
// }>`
//   border: 3px solid;
//   border-radius: 50%;
//   padding: 0.1rem;
//   width: 2rem;
//   height: 2rem;
//   stroke: ${({ color }) => color};
//   fill: ${({ color }) => color};
//   stroke-width: 12;
//   margin-left: 0.7rem; // ml-3 (0.75rem)

//   & g {
//     fill: ${({ color }) => color};
//   }

//   @media (min-width: 280px) and (max-width: 767px) {
//     margin: 1rem 0 0 0;
//   }
// `
