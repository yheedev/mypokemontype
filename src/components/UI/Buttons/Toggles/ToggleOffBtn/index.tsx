import Sun from '@/assets/Sun.svg'
import ToggleOff from '@/assets/ToggleOff.svg'
import { cn } from '@/lib/utils'
import { themeToggle, themeToggleIcon } from '@/lib/StyleClassUtil'

export default function ToggleOffBtn() {
  return (
    <div className="themeToggle">
      <div className="relative inline-flex items-center [--track-h:2.9rem]">
        <ToggleOff
          className={cn(
            themeToggle,
            'mt-1 block h-[var(--track-h)] w-[calc(var(--track-h)*2)]',
          )}
        />
        <Sun
          className={cn(
            themeToggleIcon,
            'absolute top-1/2 -translate-y-1/2',
            'right-[calc(var(--track-h)*0.15)] size-[calc(var(--track-h)*0.5)]',
            'btnIconShadow',
          )}
        />
      </div>
    </div>
  )
}
