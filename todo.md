TODO

## new

- [x] 아이콘 shadcn 툴팁
- [x] 1배 상태에서 추천 아이콘 노출하지 않기
- [x] 3개국어 번역한 aira-label, alt 내용 json에 추가
  - [x] more 페이지 텍스트, 툴박스 텍스트 추가
- [x] 기존 모달 shadcn으로 변경
- [x] 모달 스타일 수정
- [x] 스켈레톤 적용
  - [x] 스켈레톤 사이즈 수정
- [ ] 새로운 도메인 구입
- [ ] 404 페이지 추가 ({ notFound } from 'next/navigation')
- [ ] i18n 미들웨어 수정: 접속 위치 파악
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
- [ ] vercel 배포 실패 수정

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
