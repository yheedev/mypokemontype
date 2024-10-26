## [개인] 리액트 웹 앱 포켓몬 타입 계산기: [My Pokemon Type](https://mypkmn.info)

> <aside>

> ## 배포 페이지: https://mypkmn.info | 피그마 페이지: https://lrl.kr/xW4m
>
> `My Pokemon Type`은 사용자가 자신 또는 상대방의 포켓몬 타입을 선택하면, 공격과 방어 시 효과적인 포켓몬 타입을 계산하는 반응형 리액트 웹 애플리케이션입니다.
>
> **공격** 계산 시, 선택한 포켓몬 타입이 `공격할 때에 가장 큰 데미지를 줄 수 있는 포켓몬 타입`이 결과에 표시됩니다. **방어** 계산 시, 선택한 포켓몬 타입이 `공격을 받을 때에 데미지를 가장 적게 주는 타입`을 계산해서 결과를 제공합니다.
>
> <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 10px;">
> <img src="./png/PC_dark_en.png" width="660px" alt="PC에서 접속한 My Pokemon Type 웹 앱의 다크 모드, 영어, 방어 계산 결과 상태의 스크린샷 이미지">
> </div>
>
> <div style="display: flex; gap: 10px; justify-content: center; align-items: center; margin-bottom: 20px;">
> <img src="./png/iPad_light_kr.png" height="450px" alt="태블릿에서 접속한 My Pokemon Type 웹 앱의 라이트 모드, 한국어, 방어 계산 결과 상태의 스크린샷 이미지">
> <img src="./png/Mobile_dark_jp.png" height="450px" alt="모바일에서 접속한 My Pokemon Type 웹 앱의 다크 모드, 일본어, 방어 계산 결과 상태의 스크린샷 이미지">
> <img src="./png/more_Mobile_light.png" height="450px" alt="모바일에서 접속한 My Pokemon Type 웹 앱의 다크 모드, MORE 페이지의 스크린샷 이미지">
> </div>
>
> </aside>

# `My Pokemon Type` README 목차

1. [`My Pokemon Type` 프로젝트의 기능](#1-my-pokemon-type-프로젝트의-기능)
2. [사용한 스택 및 선정 이유](#2-사용한-스택-및-선정-이유)
3. [배운 점 및 도전 과제](#3-배운-점-및-도전-과제)

   1. [모든 상태를 로컬 스토리지에 저장하기](#16-redux-toolkit과-redux-persist-세팅-모든-상태를-로컬-스토리지에-저장하기)
   2. [사용자의 디바이스가 선호하는 테마를 자동으로 선택](#26-사용자-기기-선호-테마에-따라-다크라이트-테마-지원)
   3. [AWS Amplify를 사용한 배포](#36-aws-amplify를-사용한-배포)
   4. [라이트 하우스 점수 성능 30점대에서 98점으로 상승 그외 모두 만점](#66-라이트-하우스-점수-개선-성능-30점대--98점-그외-모두-100점)
   5. [포켓몬 타입의 공격 계산 함수와 방어 계산 함수 구현과 테스트](#56-포켓몬-타입의-공격-계산-함수와-방어-계산-함수-구현과-테스트)

   6. [모든 상태를 로컬 스토리지에 저장하기](#redux-toolkit과-redux-persist-세팅-모든-상태를-로컬-스토리지에-저장하기)
   7. [사용자의 디바이스가 선호하는 테마를 자동으로 선택](#사용자-기기-선호-테마에-따라-다크라이트-테마-지원)
   8. [AWS Amplify를 사용한 배포](#aws-amplify를-사용한-배포)
   9. [라이트 하우스 점수 성능 30점대에서 98점으로 상승 그외 모두 만점](#45-라이트-하우스-점수-개선-성능-30점대에서-98점-그외-모두-100점)
   10. [포켓몬 타입의 공격 계산 함수와 방어 계산 함수 구현과 테스트](#포켓몬-타입의-공격-계산-함수와-방어-계산-함수-구현과-테스트)

## 1) `My Pokemon Type` 프로젝트의 기능

1. 사용자가 해당 웹 앱에 접속해서 포켓몬 타입을 선택하면 결과에서 그 포켓몬 타입이 공격하거나 방어할 때에 가장 효율적인 타입을 계산 결과를 보여줍니다.

2. 사용자의 기기의 선호 테마에 해당하는 다크모드 또는 라이트모드가 자동으로 설정됩니다.

3. 사용자가 선택했던 포켓몬 타입과 그에 따른 계산 결과, 다크/라이트 테마, 언어 등의 선택은 모두 로컬 스토리지에 저장됩니다.

4. 반응형 UI를 구현해서 PC, 태블릿, 모바일 환경에 맞춘 반응형 UI로 일관된 사용자 경험을 제공합니다.

5. 기존의 포켓몬 타입 계산기 사이트들을 사용하면서 느꼈던 불편한 점을 개선해보았습니다.

   - 사용자가 타입 선택지에서 포켓몬 타입을 최대 2개까지만 클릭 가능하도록 만들어서 편의성을 개선했습니다.
   - 결과에서 가장 효과적인 타입에 강조 아이콘을 사용했습니다.
   - 보편적으로 공격을 할 때에는 결과의 숫자가 높을 수록, 방어를 할 때에는 효과가 결과의 숫자가 낮을 수록 뛰어납니다.
     - 공격과 방어 계산 결과 간의 배치 순서를 바꿔서 사용자가 보다 직관적으로 최적의 포켓몬 타입을 선택할 수 있도록 기획해서 사용자 경험 향상을 고민했습니다.

## 2) 사용한 스택 및 선정 이유

- 배포/AWS: `Amplify`, `Route 53`
- 상태 관리: `Redux-toolkit`, `Redux-persist`
- 프론트엔드 라이브러리: `TypeScript`, `React`, `React-router-dom`, `Styled-component`, `Jest`
- 디자인: `Figma`

### 배포/AWS: `Amplify`, `Route 53`

- `Amplify`는 리액트 애플리케이션을 빠르고 효율적으로 배포할 수 있다는 점 덕분에 사용해보았습니다. AWS Amplify 콘솔에서 몇 가지 설정으로 손쉽게 배포를 할 수 있고, 터미널에서 `git push`를 실행하면 자동으로 빌드와 배포가 이루어지는 CI/CD 파이프라인을 제공하는 점이 편했습니다.

- `Route 53`은 AWS의 DNS 서비스로, `Amplify`에서 제공하는 기본 도메인 대신에 제가 구입한 도메인인 `mypkmn.info`를 사용하기 위해 선택했습니다. `Amplify` 같은 AWS의 다른 서비스와 원활하게 통합되어 관리가 용이했습니다.

### 상태 관리: `Redux Toolkit`, `Redux-persist`

- `Redux Toolkit`은 중앙 집중식으로 상태 관리를 효율적으로 할 수 있도록 도와줬는데, 이를 통해 애플리케이션 상태 관리를 일관성 있게 유지하고 에러가 난 부분을 추적하기 쉽다는 장점이 있었습니다. 또한 `Redux Toolkit`은 상대적으로 `Redux` 보다 더 간편하게 설정할 수 있기 때문에 선택했습니다.

  - 세팅 후에는 굉장히 사용하기 편하고 기능을 추가하는 데에도 안정적이라는 장점이 있지만 초반의 러닝 커브 떄문에 시간이 상당 부분 소요되었고 중복 코드가 많다는 단점이 있어서 다소 아쉬운 선택이라는 생각이 듭니다.

- `Redux Persist`는 리덕스 스토어의 상태, 즉 사용자가 선택했던 포켓몬 타입, 언어, 다크/라이트 테마 등을 로컬 스토리지에 저장합니다. 이를 통해 사용자가 페이지를 새로고침하거나 재접속할 때에 상태가 유지되기 때문에 사용자 경험이 향상된다는 장점이 있습니다.

### 프론트엔드 라이브러리: `TypeScript`, `React`, `React-router-dom`, `Styled-component`, `Jest`

- `TypeScript`는 타입을 명시해서 코드의 안전성과 가독성을 높일 수 있었습니다. 코드 작성 시 자동 완성이 되는 기능, 타입을 체크하는 기능, 타입 정의를 통해 변수와 함수들의 의도를 명확하게 해서 유지 보수를 용이하게 할 수 있다는 장점이 있습니다.

- `React`는 컴포넌트 기반의 라이브러리로, 컴포넌트 UI를 효율적으로 구축하고 재사용하기 용이했습니다. `React Router DOM`은 리액트 애플리케이션에서 라우팅을 관리하는 라이브러리입니다. 사용자가 `/` 외에 `/defense`, `/more` 과 같은 기존과 다른 URL에 접속할 때에 해당 URL 파라미터에 지정한 컴포넌트들 전체를 렌더링합니다. 그래서 비교적 간단한 과정으로 페이지 전환을 쉽게 구현할 수 있었습니다.

- `Styled-components`는 CSS-in-JS 라이브러리입니다. `Styled-Components`는 리액트 컴포넌트와 로직, 스타일을 결합해서 한 곳에서 모두 작성하고 관리할 수 있다는 사용할 수 있다는 장점이 있습니다.

- 테스트 코드를 처음 작성하기 위해 `Jest`를 사용해서 테스트 해보았습니다. `Jest`를 통해 공격 계산 함수의 테스트를 효율적으로 작성하고 안정성을 높일 수 있었습니다.

- 자바스크립트 코드를 작성하지 않더라도 `Styled-component`에서 props를 통해 다크 모드와 라이트 모드에 따라 다른 스타일을 적용하도록 작성할 수 있다는 점이 좋았습니다. 그리고 이렇게 작성한 스타일을 재사용할 수 있기 때문에 효율적이였습니다.

### 디자인 도구: Figma

- `Figma`의 조작 방법을 배워보고 싶었고, UX를 고려한 디자인에 관심이 있어서 직접 디자인을 해보았습니다.

## 3) 배운 점 및 도전 과제

### 1/5. `Redux Toolkit`과 `Redux Persist` 세팅: 모든 상태를 로컬 스토리지에 저장하기

1. `store`에서 `RootState`, `persistConfig`, `rootReducer`사용해서 `reducer` 정의하기

- `RootState`: 리듀서에 저장하려는 모든 기능들을 담고 있는 역할을 합니다.
- `persistConfig`: 상태를 로컬 스토리지에 저장하도록 설정하는 역할을 합니다.
- `Redux Persist`의 `rootReducer`: 프로젝트에서 여러 상태를 관리하기 위해 각 상태별로 세부 reducer를 정의하고, 이를 하나로 결합하는 역할을 합니다. 그리고 `rootReducer`에 포함된 모든 상태를 로컬 스토리지에 저장하고, 애플리케이션이 다시 로드될 때 상태를 복원할 수 있도록 설정할 수 있습니다.

```tsx
// reducer.tsx
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { darkModeSlice, darkModeState } from '../features/darkModeSlice';

export type RootState = { darkMode: darkModeState } & PersistPartial;

export const persistConfig = { key: 'root', storage };

export const rootReducer = combineReducers({ darkMode: darkModeSlice.reduce });

export const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;
```

2. `Redux Toolkit`에서 정의한 리듀서들을 컴포넌트에서 사용할 때에는 `useSelector`, `useDispatch` 사용하기

- `useSelector`는 Redux 스토어의 상태를 선택하는 데 사용됩니다. 컴포넌트는 `useSelector`를 통해 필요한 상태를 구독하고, 상태가 변경될 때마다 자동으로 리렌더링됩니다.
- `useDispatch`는 Redux 스토어에 액션을 디스패치하는 데 사용됩니다. 컴포넌트는 useDispatch를 통해 액션을 디스패치하여 상태를 변경할 수 있습니다.

```tsx
// darkModeBtn.tsx
const theme = useSelector((state: RootState) => state.darkMode.theme);

const handleClick = () => {
  toggle();
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  dispatch(darkModeSlice.actions.setTheme(newTheme));
};
```

### 2/5. 사용자의 기기 선호 테마에 따라 다크/라이트 테마 지원

1. `styled-components`를 통한 다크/라이트 테마 작성: `styled-components`를 사용하여 다크/라이트 테마 스타일을 따로 정의하고, 이를 컴포넌트에 적용했습니다. 테마는 Redux 상태를 통해 된리됩니다.

2. 사용자 기기가 선호 테마에 따라 동적으로 적용: 애플리케이션에 있는 다크모드 버튼을 누르면 다크모드 리듀서 액션이 디스패치 됩니다. 이를 통해 리덕스 상태가 업데이트 되고 `styled-component`로 작성한 테마가 변경 됩니다. 또한 사용자의 시스템 테마 설정을 감지해서 초기 테마를 설정할 수 있는데, 이 기능을 구현하기 위해 `window.matchMedia`를 사용했습니다.

### 3/5. AWS Amplify를 사용해서 배포 시간을 90초 대로 단축 및 배포 과정 단순화

배포 과정 단순화 /

1. AWS Amplify 콘솔에서 새로 생성합니다. 깃허브를 클릭하고 'only select repo' -> `My Pokemon Type` 깃허브 저장소를 클릭해서 Amplify에서 해당 깃허브 저장소에 접근할 수 있는 권한을 부여합니다.
   - 이는 `Amplify`가 추후에 자동으로 코드 변경사항을 자동으로 빌드, 테스트, 배포 하기 위해서는 Amplify의 접근을 허용하는게 필요하기 때문입니다.
2. 이후 바로 `Amplify` 브랜치가 생성되지 않고 배포 에러가 발생할 수 있는데, `npm ci`를 실행하거나 의존성 라이브러리들을 최신 버전으로 업데이트해주는게 필요했습니다.
3. `Amplify` 브랜치가 생성된 다음에는 다시 쓰기 및 리디렉션에서 클라이언트의 코드에 맞게 하나의 URL에서 다른 URL로 경로를 다시 라우팅하도록 수정해줍니다.

```json
[
  {
    "source": "https://mypkmn.info",
    "status": "302",
    "target": "https://www.mypkmn.info"
  },
  {
    "source": "</^[^.]+$|.(?!(css|gif|ico|jpg|jpeg|webp|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$ )/>",
    "status": "200",
    "target": "/index.html"
  },
  {
    "source": "/",
    "status": "200",
    "target": "/ko"
  },
  {
    "source": "/",
    "status": "200",
    "target": "/en"
  },
  {
    "source": "/",
    "status": "200",
    "target": "/ja"
  },
  {
    "source": "/static/js/<*>",
    "status": "200",
    "target": "/static/js/<*>"
  },
  {
    "source": "/:lang/static/*",
    "status": "200",
    "target": "/static/:file"
  }
]
```

4. `Amplify` 콘솔의 사용자 지정 도메인에서 `Route53`에 등록했던 `mypkmn.info` 도메인을 등록해주는 과정이 필요합니다.

이후에는 IDE 터미널에서 push를 하면 변경 사항이 배포 페이지에 자동으로 반영되는게 무척 편했습니다. 앞으로 개인 프로젝트를 할 때에는 Amplify만 쓰고 싶을 정도로 Amplify가 너무 좋았습니다. 난이도가 낮다고 보긴 어렵지만 프론트엔드 개발에 집중할 수 있다는 점이 좋았습니다.

Amplify를 사용했던 자세한 내용은 블로그에 정리해두었습니다.
https://www.notion.so/stillcorners/CI-CD-3-64a96d7866f94484817f933f8e42a081#fd32a259e4b1494aa794292b3a9745f9

### 5/5. 포켓몬 타입의 공격 계산 함수와 방어 계산 함수 구현과 테스트

`My Pokemon Type` 프로젝트에서는 포켓몬 타입 간의 상성을 계산하기 위해 TypeScript와 Redux Toolkit을 사용하여 공격 계산 함수를 구현했습니다. 이를 통해 사용자가 선택한 포켓몬 타입의 공격 효과와 방어 효과를 정확하게 계산할 수 있었습니다.

1. 타입 정의: `types.ts` 파일에서 포켓몬 타입과 각 타입 간의 상성 값을 정의했습니다. `TypeName` 배열은 모든 포켓몬 타입을 포함하고 있으며, `TypeValue` 객체는 각 타입에 대한 상성 값을 배열로 저장하고 있습니다.

```ts
//type.ts
export const TypeName = ['normal', 'fighting', ... ]

export const TypeValue: { [key: string]: ReadonlyArray<number> } = {
  normal: [1, 1, 1, 1, 1, 0.5, 1, 0, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  fighting: [2, 1, 0.5, 0.5, 1, 2, 0.5, 0, 2, 1, 1, 1, 1, 0.5, 2, 1, 2, 0.5],
  ...}
```

2. 리듀서 작성: `offenseCalSlice.tsx` 파일과 `defenseCalSlice.tsx` 파일에서 `createSlice`를 사용하여 각각 공격 계산과 방어 계산에 해당하는 리듀서를 작성했습니다. 이를 통해 선택한 포켓몬 타입과 그에 해당하는 결과의 상태가 모두 관리되며 로컬 스토리지에 저장됩니다.

3. 공격 함수 `offenseCal`, 방어 함수 `defenseCal` 작성: `allType1x`와 같은 유틸리티 함수를 만들고 다양한 메소드를 사용해서 중복 작업을 간결하게 처리하려 노력했습니다. `offenseCalState`와 `defenseCalState` 타입을 최소한으로 정의한 뒤에 상태 관리를 일관되게 처리했고 코드의 구조를 정리해서 가독성을 확보했습니다. `0, 0.25, 0.5, 1, 2, 4`에 해당하는 `effectiveness` 객체를 사용해서 반환된 결과를 `effectiveness` 객체에 저장하고, 이를 통해 빠르게 결과를 참조할 수 있도록 했습니다.

4. `Jest`를 사용한 테스트: 공격 계산 함수의 정확성을 검증하기 위해 다양한 테스트 케이스를 작성해보았습니다. 이를 통해 공격 함수가 예상대로 정확하게 동작하는 것을 확인할 수 있었습니다.

- 테스트 유틸리티 함수: `filterEmptyArrays` 함수를 사용하여 결과에서 빈 배열을 필터링합니다.
- 테스트 케이스 작성: `describe`와 `it` 블록을 사용하여 다양한 포켓몬 타입 조합에 대한 테스트 케이스를 작성했습니다. 각 테스트 케이스는 `offenseCal` 액션을 디스패치하고, 결과를 검증합니다.

### 6/6) 라이트 하우스 점수 개선 (성능 30점대 → 98점, 그외 모두 100점)

<div style="display: flex; justify-content: center; align-items: center; margin-bottom: 10px;">
<img src="./png/lighthouse.png" width="300px">
</div>

- FOIT 현상 해결
- 콘솔에 뜨는 브라우저 오류 해결 (index.js 컴파일..)
- 백그라운드 색상 대비 개선
- CORB 디버깅

등을 통해 라이트 하우스 점수 개선을 할 수 있었습니다... (작성 중입니다)
