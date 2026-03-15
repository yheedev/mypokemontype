const CHOSEONG = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ',
  'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
]

/** 한글 문자열에서 각 음절의 초성(첫 자음)을 추출 */
export function getChoseong(str: string): string {
  return [...str]
    .map((char) => {
      const code = char.charCodeAt(0) - 0xac00
      if (code < 0 || code > 11171) return char
      return CHOSEONG[Math.floor(code / (21 * 28))]
    })
    .join('')
}

/** 입력이 한글(음절 또는 자모)을 포함하는지 */
export function isKoreanInput(str: string): boolean {
  return /[\uac00-\ud7a3\u1100-\u11ff\u3130-\u318f]/.test(str)
}

/** 입력이 순수 자음(초성)으로만 이루어졌는지 — 예: 'ㅍㄱ' */
export function isPureJamo(str: string): boolean {
  return /^[\u3130-\u318f]+$/.test(str)
}

/** 입력이 히라가나 또는 가타카나를 포함하는지 */
export function isJapaneseInput(str: string): boolean {
  return /[\u3040-\u309f\u30a0-\u30ff]/.test(str)
}
