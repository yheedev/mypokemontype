import { useState, useCallback } from 'react'

export function useFlash(duration = 300) {
  const [isFlashing, setIsFlashing] = useState(false)

  const flash = useCallback(() => {
    setIsFlashing(true)
    setTimeout(() => setIsFlashing(false), duration)
  }, [duration])

  return { isFlashing, flash }
}
