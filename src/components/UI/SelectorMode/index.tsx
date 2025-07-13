import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export default function SelectorMode({
  lang,
  translate,
}: {
  lang: string
  translate: any
}) {
  const pathname = usePathname()
  const router = useRouter()

  const [mode, setMode] = useState<'offense' | 'defense'>('offense')

  useEffect(() => {
    setMode(pathname?.includes('/defense') ? 'defense' : 'offense')
  }, [pathname])

  const onSelect = (newMode: 'offense' | 'defense') => {
    setMode(newMode)
    router.push(newMode === 'offense' ? `/${lang}` : `/${lang}/defense`)
  }

  return (
    <div className="mx-[1.5rem] mt-[1.3rem] grid grid-cols-2 justify-evenly font-['Noto_Sans_KR'] text-[1.5rem] font-black">
      <button
        className={cn(
          'flex items-center justify-center pt-2 pb-6 text-center align-middle',
          lang === 'ko' ? 'indent-[1.25rem] tracking-[7px]' : 'tracking-[3px]',
          'mr-[0.8rem]',
          mode === 'offense' ? 'underline' : '',
        )}
        onClick={() => onSelect('offense')}
      >
        {translate.Mode.offense}
      </button>

      <button
        className={cn(
          'flex items-center justify-center pt-2 pb-6 text-center align-middle',
          lang === 'ko' ? 'indent-[1.25rem] tracking-[7px]' : 'tracking-[3px]',
          mode === 'defense' ? 'underline' : '',
        )}
        onClick={() => onSelect('defense')}
      >
        {translate.Mode.defense}
      </button>
    </div>
  )
}
