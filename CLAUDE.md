# MyPokemonType — CLAUDE.md

포켓몬 타입 상성 계산기. Next.js 16 (App Router) + TypeScript + Zustand + Tailwind CSS 4.
외부 백엔드 없음. Vercel 배포 전용. 패키지 매니저: **npm**.

커맨드는 `package.json` `scripts` 참고.

---

## 핵심 구조

```
src/
  app/
    [lang]/           # 언어별 동적 라우트 (ko / en / ja)
      page.tsx        # offense 페이지
      defense/        # defense 페이지
      more/           # 소개 페이지
      layout.tsx      # i18n 초기화, 다크모드 적용
  components/UI/      # 재사용 컴포넌트 (Pill, PillGroup, Result, ...)
  constants/
    pokemon.ts        # TypeName (18개 타입 배열), TypeValue (18x18 상성 매트릭스)
    effectiveness.ts  # 버킷 키 상수, makeBuckets, BucketResult 타입
  utils/
    offenseCal.ts     # 공격 계산 함수
    defenseCal.ts     # 방어 계산 함수
    allTypes1x.ts     # 타입 미선택 시 1x 배열 반환
  stores/
    useOffenseCalStore.tsx   # 공격 계산 결과 상태
    useDefenseCalStore.tsx   # 방어 계산 결과 상태
    useUpToTwoStore.tsx      # 선택된 타입 (최대 2개)
    useLanguageStore.tsx     # 현재 언어 (persist)
    useDarkModeStore.tsx     # 다크모드 상태 (persist)
  middleware.ts       # 언어 감지 및 리다이렉트 (Vercel geolocation 사용)
  lib/
    i18n.ts           # i18next 설정
    utils.ts          # cn() 유틸 (clsx + tailwind-merge)
```

---

## 계산 로직

### offenseCal(type1?, type2?)
- 각 타입에 대해 `TypeValue[atkType][defIdx]` 조회
- 듀얼 타입이면 두 타입 중 `Math.max()` 적용 (공격은 유리한 쪽 채택)
- 결과: `{ '0': [], '0.5': [], '1': [], '2': [] }` (버킷)

### defenseCal(type1?, type2?)
- 각 공격 타입에 대해 방어 타입별 배율 곱셈
- 면역(0) 발견 시 즉시 해당 버킷으로 short-circuit
- `TYPE_INDEX` 사전 계산으로 O(1) 인덱스 조회
- 결과: `{ '0': [], '0.25': [], '0.5': [], '1': [], '2': [], '4': [] }`

---

## 상태 흐름

```
Pill 클릭 → useUpToTwoStore.toggleType()
  → useEffect (SelectorMode 또는 각 페이지)
  → offenseCal() / defenseCal() 호출
  → useOffenseCalStore / useDefenseCalStore 업데이트
  → Result 컴포넌트 리렌더
```

---

## 다국어 (i18n)

- 지원 언어: `ko` / `en` / `ja`
- 번역 파일: `public/locales/{lang}/translation.json`
- 언어 감지 우선순위: 쿠키 → Vercel IP geolocation → Accept-Language 헤더
- URL 구조: `/{lang}/...` (모든 페이지 lang prefix 필수)

---

## 주요 타입

```ts
TypeNameElement   // 18개 타입 리터럴 유니언 ('fire' | 'water' | ...)
BucketResult<K>   // Record<K, TypeNameElement[]>
SelectedTypes     // { type1?: TypeId; type2?: TypeId }
TypeCalState<K>   // { result, type1, type2, calculate }
```

---

## 알아둘 것

- **테스트 없음** — `offenseCal`, `defenseCal` 수정 시 직접 검증 필요
- `@radix-ui/react-dialog`, `@radix-ui/react-tooltip` 설치돼 있지만 미사용
- `effectiveness.ts` 하단 주석 코드는 이전 구현 잔재 (삭제 예정)
- `TypeName.length === 18` — 매직 넘버 대신 이 값 사용
- Vercel 전용 API(`geolocation`) 사용 중 → 로컬에서 geo 감지 안 됨 (언어 fallback으로 동작)
