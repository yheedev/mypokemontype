'use client'

import { useEffect } from 'react'
import { useDarkModeStore } from '@/stores/useDarkModeStore'

export default function ClientFavicon() {
  const theme = useDarkModeStore((state) => state.theme)

  useEffect(() => {
    const favicon = document.querySelector(
      "link[rel='icon']",
    ) as HTMLLinkElement | null
    if (!favicon) return

    const lightIcon = '/img/ico/favicon_light.ico'
    const darkIcon = '/img/ico/favicon_dark.ico'

    favicon.href = theme === 'dark' ? darkIcon : lightIcon
  }, [theme])

  return null
}
