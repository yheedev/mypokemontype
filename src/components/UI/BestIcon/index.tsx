import { usePathname } from 'next/navigation'
import Flame from '@/svg/Flame.svg'
import { cn } from '@/lib/utils'
import { PATH } from '@/app/routes'

export default function BestIcon({ alt = '가장 효과적인 포켓몬 타입' }) {
  const pathname = usePathname()
  const isOffense = /^\/(ko|en|ja)$/.test(pathname)

  const color = isOffense
    ? 'fill-[var(--offenseRec)] stroke-[var(--offenseRec)]'
    : 'fill-[var(--defenseRec)] stroke-[var(--defenseRec)]'

  return (
    <div
      className={cn(
        'mt-4 ml-3 h-8 w-8 rounded-full border-4 border-current p-[0.1rem]',
        color,
      )}
      aria-label={alt}
    >
      <Flame className="h-full w-full" />
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
