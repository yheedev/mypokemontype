/** 마지막 글자의 받침 유무를 반환 (한글 음절 범위 밖이면 받침 없음으로 처리) */
function hasFinalConsonant(name: string): boolean {
  const code = name.charCodeAt(name.length - 1)
  if (code < 0xac00 || code > 0xd7a3) return false
  return (code - 0xac00) % 28 !== 0
}

/** 받침 유무에 따라 주격 조사 반환 — 이 / 가 */
export function getKoSubjectParticle(name: string): '이' | '가' {
  return hasFinalConsonant(name) ? '이' : '가'
}

/** 받침 유무에 따라 목적격 조사 반환 — 을 / 를 */
export function getKoObjectParticle(name: string): '을' | '를' {
  return hasFinalConsonant(name) ? '을' : '를'
}
