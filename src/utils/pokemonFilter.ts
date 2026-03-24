import { getChoseong, isPureJamo } from '@/utils/jamo'

const MAX_SUGGESTIONS = 8

export interface Suggestion {
  displayName: string // 드롭다운에 표시할 이름 (한글 or 영어)
  englishName: string // API 호출에 쓸 영어 slug
}

export function filterEnglish(list: string[], query: string): Suggestion[] {
  const q = query.toLowerCase()
  const starts = list.filter((n) => n.startsWith(q))
  const includes = list.filter((n) => !n.startsWith(q) && n.includes(q))
  return [...starts, ...includes]
    .slice(0, MAX_SUGGESTIONS)
    .map((name) => ({ displayName: name, englishName: name }))
}

export function filterJapanese(
  jaMap: Map<string, string>,
  query: string,
): Suggestion[] {
  const q = query.toLowerCase()
  const starts = Array.from(jaMap.keys()).filter((n) => n.startsWith(query))
  const includes = Array.from(jaMap.keys()).filter(
    (n) => !n.startsWith(query) && n.toLowerCase().includes(q),
  )
  return [...starts, ...includes]
    .slice(0, MAX_SUGGESTIONS)
    .map((name) => ({ displayName: name, englishName: jaMap.get(name)! }))
}

export function filterKorean(koMap: Map<string, string>, query: string): Suggestion[] {
  const isJamo = isPureJamo(query)
  const results: Suggestion[] = []

  for (const [koName, enName] of koMap) {
    const matches = isJamo
      ? getChoseong(koName).includes(query)
      : koName.startsWith(query) || koName.includes(query)

    if (matches) results.push({ displayName: koName, englishName: enName })
  }

  return results
    .sort((a, b) => {
      const aFirst = isJamo
        ? getChoseong(a.displayName).startsWith(query)
        : a.displayName.startsWith(query)
      const bFirst = isJamo
        ? getChoseong(b.displayName).startsWith(query)
        : b.displayName.startsWith(query)
      if (aFirst && !bFirst) return -1
      if (!aFirst && bFirst) return 1
      return 0
    })
    .slice(0, MAX_SUGGESTIONS)
}
