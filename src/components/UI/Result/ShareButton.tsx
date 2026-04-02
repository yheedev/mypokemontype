'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Share2, Check } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export function ShareButton() {
  const { t } = useTranslation()
  const [shared, setShared] = useState(false)

  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = url
      textarea.style.cssText = 'position:fixed;top:0;left:0;opacity:0;'
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    toast(t('Result.share'))
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }

  return (
    <button
      onClick={handleShare}
      className={cn(
        'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5',
        'text-xs font-medium transition-colors duration-150',
        'text-[var(--text)] opacity-40 hover:opacity-80',
      )}
    >
      {shared ? <Check size={17} /> : <Share2 size={17} />}
    </button>
  )
}
