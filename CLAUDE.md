# MyPokemonType — CLAUDE.md

포켓몬 타입 상성 계산기. Next.js 16 (App Router) + TypeScript + Zustand + Tailwind CSS 4.
외부 백엔드 없음. Vercel 배포 전용. 패키지 매니저: **npm**.

커맨드는 `package.json` `scripts` 참고.

---

## 스크립트

| 명령어 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 실행 |
| `npm run lint` | ESLint 실행 및 자동 수정 |
| `npm run prettier` | Prettier 포맷 |
| `npm run test` | Vitest 단위 테스트 실행 |
| `npm run test:watch` | Vitest watch 모드 |
| `npm run generate:ko` | 한국어 포켓몬 이름 데이터 생성 |

---

## 환경 변수

| 변수 | 설명 |
|---|---|
| `NEXT_FORCE_WEBPACK=true` | Turbopack 대신 Webpack 강제 사용 (`.env.local`) |

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
      layout-client.tsx  # 클라이언트 레이아웃 (스켈레톤 등)
    api/og/           # OG 이미지 생성 API
    layout.tsx        # 루트 레이아웃 (폰트, 메타데이터)
    routes.tsx        # 라우트 상수
    setLocale.ts      # 로케일 설정 유틸
  components/UI/      # 재사용 컴포넌트
    Pill/             # 타입 선택 알약
    PillGroup/        # 타입 알약 그룹
    Result/           # 계산 결과 (CopyButton, ShareButton 포함)
    Selector/         # 타입 선택기
    SelectorMode/     # 선택 모드 전환
    PokemonSearch/    # 포켓몬 검색 (자동완성)
    PokemonBattle/    # 배틀 문장 모드 (BattleSentence, PokemonSlot, DirectionArrow)
    Buttons/          # DarkModeBtn, LangBtn, MoreBtn, AllBtns, Toggles
    Dialog/           # 언어 선택 다이얼로그 (@radix-ui/react-dialog)
    Tooltip/          # 툴팁 (@radix-ui/react-tooltip)
    Skeleton/         # 로딩 스켈레톤
    Card/             # 카드 래퍼
    BestIcon/         # 최고 상성 아이콘
    Favicon/          # 파비콘 컴포넌트
    UrlSync/          # URL 상태 동기화
  constants/
    pokemon.ts        # TypeName (18개 타입 배열), TypeValue (18x18 상성 매트릭스)
    effectiveness.ts  # 버킷 키 상수, makeBuckets, BucketResult 타입
    theme.ts          # 테마 상수
    mode.ts           # 모드 상수
    pokemonSlot.ts    # 포켓몬 슬롯 상수
  utils/
    offenseCal.ts     # 공격 계산 함수
    defenseCal.ts     # 방어 계산 함수
    allTypes1x.ts     # 타입 미선택 시 1x 배열 반환
    pathMode.ts       # URL 경로 모드 유틸
    langs.ts          # 언어 유틸
    jamo.ts           # 한글 자모 분리 (검색용)
    pokemonFilter.ts  # 포켓몬 필터링
    koParticle.ts     # 한국어 조사 처리
    ogMetadata.ts     # OG 메타데이터 생성
  stores/
    useOffenseCalStore.tsx        # 공격 계산 결과 상태
    useDefenseCalStore.tsx        # 방어 계산 결과 상태
    useUpToTwoStore.tsx           # 선택된 타입 (최대 2개)
    useLanguageStore.tsx          # 현재 언어 (persist)
    useDarkModeStore.tsx          # 다크모드 상태 (persist)
    usePokemonSlotStore.ts        # 포켓몬 슬롯 상태
    useBattleSentenceModeStore.tsx # 배틀 문장 모드 상태
    __tests__/
      useUpToTwoStore.test.ts
  hooks/
    usePokemonQuery.ts    # 포켓몬 단건 조회 (react-query)
    usePokemonList.ts     # 포켓몬 목록 조회 (react-query)
    usePokemonLangMap.ts  # 포켓몬 언어별 이름 맵 (react-query)
    usePokemonSearch.ts   # 포켓몬 검색 훅
    useClickOutside.ts    # 외부 클릭 감지
    useFlash.ts           # 플래시 효과
    useUrlSync.ts         # URL 상태 동기화
  providers/
    QueryProvider.tsx     # react-query 클라이언트 프로바이더
  types/
    language.ts           # Language 타입, supportedLangs
    calState.ts           # TypeCalState 타입
    validPages.ts         # 유효 페이지 타입
    css.d.ts              # CSS 모듈 타입 선언
    svg.d.ts              # SVG 모듈 타입 선언
    darkMode.d.ts         # 다크모드 타입 선언
  lib/
    i18n.ts               # i18next 설정
    utils.ts              # cn() 유틸 (clsx + tailwind-merge)
    StyleClassUtil.ts     # 스타일 클래스 유틸
  middleware.ts       # 언어 감지 및 리다이렉트 (Vercel geolocation 사용)
  utils/__tests__/
    offenseCal.test.ts
    defenseCal.test.ts
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
Language          // 'ko' | 'en' | 'ja'
```

---

## 알아둘 것

- **테스트 존재** — `offenseCal`, `defenseCal`, `useUpToTwoStore` 단위 테스트 있음 (`vitest`)
- `@radix-ui/react-dialog` — `LangBtn` 컴포넌트에서 사용 중
- `@radix-ui/react-tooltip` — `CopyButton`, `ShareButton`, `layout.tsx`에서 사용 중
- `effectiveness.ts` 하단 주석 코드는 이전 구현 잔재 (삭제 예정)
- `TypeName.length === 18` — 매직 넘버 대신 이 값 사용
- Vercel 전용 API(`geolocation`) 사용 중 → 로컬에서 geo 감지 안 됨 (언어 fallback으로 동작)
- `tw-animate-css` 제거됨 → 사용 중인 11개 애니메이션 클래스만 `global.css`에 직접 정의
