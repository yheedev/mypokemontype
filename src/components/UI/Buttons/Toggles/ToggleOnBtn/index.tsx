import Moon from '@/assets/Moon.svg'
import ToggleOn from '@/assets/ToggleOn.svg'
import { cn } from '@/lib/utils'
import { themeToggle, themeToggleIcon } from '@/lib/StyleClassUtil'

export default function ToggleOffBtn() {
  return (
    <div className="themeToggle">
      <div className="relative inline-flex items-center [--track-h:2.8rem]">
        <ToggleOn
          className={cn(
            themeToggle,
            'block h-[var(--track-h)] w-[calc(var(--track-h)*2)]',
          )}
        />
        <Moon
          className={cn(
            themeToggleIcon,
            'absolute top-1/2 -translate-y-1/2',
            'left-[calc(var(--track-h)*0.75)] size-[calc(var(--track-h)*0.6)]',
            'btnIconShadow',
          )}
        />
      </div>
    </div>
  )
}
