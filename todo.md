## 🔴 우선순위1 (긴급 + 쉬움)

- [x] `allTypes1x.ts` 매직 넘버 `18` → `TypeName.length` 교체
- [x] `[lang]/layout.tsx` localStorage 직접 접근 → Zustand persist로 일원화

## 🟠 우선순위2 (긴급 + 어려움)

- [x] **포켓몬 검색 기능** (PokeAPI + TanStack Query)
  - [x] `usePokemonQuery` + `usePokemonList` 훅 (전체 목록 캐싱 + 상세 조회)
  - [x] 검색 UI — 실시간 자동완성 드롭다운 (로컬 필터링, API 호출 최소화)
  - [x] 포켓몬 이미지 + 타입 Pill 표시
  - [x] 검색 결과 → `setTypes()` 로 기존 calculate 자동 연결
  - [x] 드롭다운 방향키 탐색 (↑↓ 이동, Enter 선택, Esc 닫기)
  - [x] 한국어 포켓몬 이름 검색 (정적 JSON 생성 스크립트 + `/data/pokemon-ko.json` 캐싱)
  - [x] 초성 검색 (ㅍ 입력 → 피카츄, 파이리 등 노출)
  - [x] 일본어 포켓몬 이름 검색 (정적 JSON 생성 스크립트 + `/data/pokemon-ko.json` 캐싱)
  - [x] 초성 검색 (フ 입력 → フシギダネ, フシギソウ 등 노출)
- [ ] **공격/방어 화살표 UI** (디자인 확정 후 개발)
  - [ ] 두 슬롯 + 방향 화살표 레이아웃
  - [ ] 화살표 클릭으로 offense ↔ defense 전환
- [x] **핵심 로직 테스트** — `offenseCal`, `defenseCal` 단위 테스트 (Vitest)

## 🟡 우선순위3 (여유 + 쉬움)

- [ ] **URL 상태 공유** — `?type=fire,water` 쿼리스트링으로 결과 공유 가능하게
- [ ] 에러 바운더리 컴포넌트 추가 (i18n 로딩 실패 등 대응)
- [ ] OG 이미지 설정 (SNS 공유 시 미리보기)
- [ ] 라이트하우스 점수 및 접근성 개선

## 🟢 우선순위4 (여유 + 어려움)

- [ ] **PWA** — 오프라인 지원 (서버 없는 구조라 적합)
- [ ] E2E 테스트 (Playwright) — 주요 사용자 플로우

## 보류 (결정 필요)

- [ ] 상대 포켓몬 검색 슬롯 추가 (vs. 단순 타입 선택기 유지)
- [ ] 데미지 계산기 (스탯, 레벨 입력 필요 — 스코프 확장 큼)

---

## new

- [x] 아이콘 shadcn 툴팁
- [x] 1배 상태에서 추천 아이콘 노출하지 않기
- [x] 3개국어 번역한 aira-label, alt 내용 json에 추가
  - [x] more 페이지 텍스트, 툴박스 텍스트 추가
- [x] 기존 모달 shadcn으로 변경
- [x] 모달 스타일 수정
- [x] 스켈레톤 적용
  - [x] 스켈레톤 사이즈 수정
- [x] 404 페이지 추가 ({ notFound } from 'next/navigation')
- [x] i18n 미들웨어 수정: 접속 위치 파악
- [ ] 이스터에그

## 로직

- [x] SelectMode의 useEffect 계속 사용할지/PATH 사용
- [x] 셀렉터 선택 해제할 때 allType1x 호출
- [x] /defense 페이지 연결, 방어 계산 로직 연결
- [x] 최초 접속시 유저의 디바이스가 선호하는 테마 자동 설정

## 최적화/배포

- [x] 모든 페이지 라이트하우스 점수 측정 후 성능 개선
  - [ ] 접근성 개선
  - [ ] 퍼포먼스 개선
    - [x] 폰트 import 방식 수정
- [x] vercel 배포 실패 수정

## UI

- [x] 추천 아이콘 수정
- [x] 아이콘들 스타일 적용
- [x] 결과 UI 수정
- [x] pill(포켓몬 타입): hover animation 추가
  - [x] shadow 적용
  - [x] 스타일 수정
- [x] more 페이지/버튼 연결
- [x] 레이아웃 수정해서 전체 반응형/그리드 수정
- [x] 언어 선택 모달 shadcn dialog 컴포넌트 사용
- [x] 다크모드 적용
- [x] divider 컴포넌트 분리
- [x] 카드 컴포넌트 분리
- [x] 셀렉터 모드 (SelectMode) 컴포넌트 분리
- [x] 추천 아이콘 컴포넌트 (BestIcon) 분리
- [x] global.css 정리
- [x] 자주 사용되는 스타일 클래스 classUtil에 정리
