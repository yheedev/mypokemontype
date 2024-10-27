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

   1. [Redux Toolkit과 Redux Persist 세팅: 모든 상태를 로컬 스토리지에 저장하기](#15-redux-toolkit과-redux-persist-세팅-모든-상태를-로컬-스토리지에-저장하기)
   2. [AWS Amplify, Route 53 세팅: 배포 시간 90초 대로 단축, push 명령어로 자동 빌드 및 배포, 리디렉션 관리 및 SSL 인증서 사용](#25-aws-amplify-route-53-세팅-배포-시간-90초-대로-단축-push-명령어로-자동-빌드-및-배포-리디렉션-관리-및-ssl-인증서-사용)
   3. [사용자의 기기 선호 테마에 따라 다크/라이트 테마 지원](#35-typescript-redux-toolkit-jest를-사용한-공격-방어-계산-함수-작성과-테스트)
   4. [라이트 하우스 점수 성능 30점대에서 98점으로 상승 그외 모두 만점](#45-사용자의-기기-선호-테마에-따라-다크라이트-테마-지원)
   5. [포켓몬 타입의 공격 계산 함수와 방어 계산 함수 구현과 테스트](#55-라이트-하우스-점수-개선-성능-30점대--98점-그외-모두-100점)

## 1) `My Pokemon Type` 프로젝트의 기능

1. 사용자가 해당 웹 앱에 접속해서 포켓몬 타입을 선택하면 결과에서 그 포켓몬 타입이 공격하거나 방어할 때에 가장 효율적인 타입을 계산 결과를 제안합니다.

2. 사용자의 기기의 선호 테마에 해당하는 다크모드 또는 라이트모드가 자동으로 설정됩니다.

3. 사용자가 선택했던 포켓몬 타입과 그에 따른 계산 결과, 다크/라이트 테마, 언어 등의 선택은 모두 탭을 종료하거나 새로고침하더라도 저장됩니다.

4. 한국어, 영어, 일본어 언어 3개 국어를 지원합니다.

5. 반응형 UI를 구현해서 PC, 태블릿, 모바일 환경 모두 일관된 사용자 경험을 제공합니다.

6. 기존의 포켓몬 타입 계산기 사이트들을 사용하면서 느꼈던 불편한 점을 개선해보았습니다.

   - 사용자가 타입 선택지에서 포켓몬 타입을 최대 2개까지만 클릭 가능하도록 만들어서 편의성을 개선했습니다.
     - 가장 마지막에 클릭했던 포켓몬 타입의 클릭은 자동으로 클릭 해제가 됩니다.
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

### 2/5. AWS Amplify, Route 53 세팅: 배포 시간 90초 대로 단축, push 명령어로 자동 빌드 및 배포, 리디렉션 관리 및 SSL 인증서 사용

1. AWS Amplify 콘솔에서 새로 생성합니다. 깃허브를 클릭하고 'only select repo' -> `My Pokemon Type` 깃허브 저장소를 클릭해서 Amplify에서 해당 깃허브 저장소에 접근할 수 있는 권한을 부여합니다.

- 이는 `Amplify`가 추후에 자동으로 코드 변경사항을 자동으로 빌드, 테스트, 배포 하기 위해서는 Amplify의 접근을 허용하는게 필요하기 때문입니다.

2. 이후 바로 `Amplify` 브랜치가 생성되지 않고 배포 에러가 발생할 수 있는데, `npm ci`를 실행하거나 의존성 라이브러리들을 최신 버전으로 업데이트해서 해결할 수 있었습니다.
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

4. `Amplify` 콘솔의 사용자 지정 도메인에서 SSL 인증서와 함께 `Route53`에 등록했던 `mypkmn.info` 도메인을 등록해줍니다. 이 과정 이후에 `mypkmn.info`에 접속해도 `www.mypkmn.info`로 자동으로 리디렉션 됩니다.

이후에는 터미널에서 push를 하면 변경사항이 배포 페이지에 자동으로 반영되어서 무척 편했습니다. `Amplify`의 난이도가 낮진 않았지만 프론트엔드 개발에 집중할 수 있다는 점이 좋았습니다.

AWS 서비스를 사용하며 세팅했던 더 자세한 내용은 블로그 포스트에 정리해두었습니다.
https://www.notion.so/stillcorners/CI-CD-3-64a96d7866f94484817f933f8e42a081#fd32a259e4b1494aa794292b3a9745f9

### 3/5. TypeScript, Redux Toolkit, Jest를 사용한 공격, 방어 계산 함수 작성과 테스트

해당 웹 앱은 사용자가 선택한 포켓몬 타입의 공격, 방어 효과를 정확하게 계산하기 위해 TypeScript와 Redux Toolkit을 사용하여 공격, 방어 계산 함수를 작성해서 정확한 결과를 도출할 수 있었습니다.

1. 타입 정의: `types.ts` 파일에서 포켓몬 타입과 각 타입 간의 상성 값을 정의했습니다. `TypeName` 배열은 18개의 모든 포켓몬 타입을 포함하고 있으며, `TypeValue` 객체는 각 타입에 대한 상성 값을 배열로 저장하고 있습니다. 실제로는 모든 타입들을 0번째부터 17번째까지 차례대로 작성했습니다.

   ```ts
   //type.ts
   export const TypeName = ['normal', 'fighting', ... ]

   export const TypeValue: { [key: string]: ReadonlyArray<number> } = {
     normal: [1, 1, 1, 1, 1, 0.5, 1, 0, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1],
     fighting: [2, 1, 0.5, 0.5, 1, 2, 0.5, 0, 2, 1, 1, 1, 1, 0.5, 2, 1, 2, 0.5],
     ...}
   ```

2. 리듀서 작성: 공격, 방어 함수를 작성할 때 `createSlice`를 사용하여 각각의 함수를 작성했습니다. 이를 통해 선택한 포켓몬 타입과 그에 해당하는 함수의 결과의 상태가 모두 `RootState`에서 관리되며 로컬 스토리지에 저장됩니다.

3. 공격 함수 `offenseCal`, 방어 함수 `defenseCal` 작성

- `offenseCalState`와 `defenseCalState` 타입을 정의한 뒤에 해당 함수에서 선택된 타입의 결과들을 type1, type2에 올 수 있도록 했습니다.
- 사용자가 아무 것도 선택하지 않을 경우 결과에서 모든 타입을 1배의 효과로 반환합니다. 이를 반환하기 위해 `allType1x`와 같은 유틸리티 함수를 만들어서 중복 작업을 간결하게 처리했습니다.
- 0배, 0.25배, 0.5배, 1배, 2배, 4배 효과에 해당하는 이 숫자들을 `effectiveness` 객체에 담아서 반환된 결과를 `effectiveness` 객체에 저장하고, 이를 통해 빠르게 결과를 참조할 수 있도록 했습니다.

  ```tsx
  // offenseCalSlice.tsx
    let effectiveness: Effectiveness = { '4': [], '2': [], '1': [], '0.5': [], '0.25': [], '0': []
    };
    // 이하 생략

    else if (offenseType1 && !offenseType2) {
      let typeArr1 = allTypes1x(offenseType1);
      typeArr1.forEach((curr, index) => {
        const key = curr.toString();
        if (effectiveness[key]) {
          effectiveness[key].push(TypeName[index]);
        }});

      state.result = effectiveness;
      state.offenseType1 = offenseType1
      };
  ```

- 예를 들어 사용자가 노멀 타입 하나를 선택했다면 `normal: [1, 1, 1, 1, 1, 0.5, 1, 0, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1]`을 선택하는게 될 것입니다.
  그러면 아래처럼 노멀 타입이 갖는 배열의 각각의 요소가 `effectiveness` 배열에 담길텐데, 이 결과 그대로 결과 컴포넌트에 렌더링이 됩니다.

  ```tsx
  let effectiveness: Effectiveness = {
    '4': [],
    '2': [],
    '1': ['normal', 'fighting', 'flying', 'poison', 'ground' 'bug', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'],
    '0.5': ['rock', 'steel'],
    '0.25': [],
    '0': ['ghost'],
  };
  ```

- 아무 타입도 들어가지 않은 빈 배열은 렌더링되지 않도록 결과 컴포넌트에서 함수를 작성해두었습니다.

4. `Jest`를 사용한 테스트: 공격 계산 함수의 정확성을 검증하기 위해 다양한 테스트 케이스를 작성했습니다. 이 과정에서 `Jest`의 사용 방법과 유틸리티를 익힐 수 있었고 공격 함수가 예상대로 정확하게 동작하는걸 테스트할 수 있었습니다.

### 4/5. 사용자의 기기 선호 테마에 따라 다크/라이트 테마 지원

1. `styled-components`를 통한 다크/라이트 테마 작성: `styled-components`를 사용하여 다크/라이트 테마 스타일을 따로 정의하고, 이를 컴포넌트에 적용했습니다. 테마는 Redux 상태를 통해 된리됩니다.

2. 사용자 기기가 선호 테마에 따라 동적으로 적용: 애플리케이션에 있는 다크모드 버튼을 누르면 다크모드 리듀서 액션이 디스패치 됩니다. 이를 통해 리덕스 상태가 업데이트 되고 `styled-component`로 작성한 테마가 변경 됩니다. 또한 사용자의 시스템 테마 설정을 감지해서 초기 테마를 설정할 수 있는데, 이 기능을 구현하기 위해 `window.matchMedia`를 사용했습니다.

### 5/5. 라이트 하우스 점수 개선 (성능 30점대 → 98점, 그외 모두 100점)

  <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 10px;">
  <img src="./png/lighthouse.png" width="300px">
  </div>

1. 성능: FOIT 현상 해결

- 기존에는 해당 웹 앱에서 사용 중인 폰트 2개를 `.woff` 확장자 파일으로 로컬에 저장해서 사용했습니다. 이 경우 타이틀에 해당하는 폰트가 기본 폰트로 나오다가 깜빡거리다가 10초 뒤에 지정해뒀던 `Helios` 폰트로 나오는 FOIT 현상을 겪었습니다.

- 기존에 저장했던 폰트 파일들을 삭제하고 `index.html`에서 CDN 형태로 폰트들을 가져와서 사용하는 형태로 변경했습니다. 이후 더 빠르게 폰트들을 불러올 수 있었고 자연스럽게 FOIT 현상을 해결할 수 있었습니다.

2. 성능: 개발자 도구의 다양한 에러 디버깅

- 배포 페이지의 CORB 문제 해결: javascript 요청 중 에러가 발생한 응답 헤더에서 `Content-Type` 값이 `text/html`으로 되어있는걸 확인할 수 있었는데, 이를 `application/javascript` 타입으로 바꿔줘야 했던 문제입니다.

  - 이 때문에 브라우저가 javascipt 요청을 html 파일으로 읽으려고 했기 때문에 CORB 에러가 발생했던 것입니다.
  - 이 값을 바꾸기 위해서는 Amplify의 '빌드 설정'에서 아래처럼 값을 줄 수 있습니다.
    ```yml
    // amplify.yml
        customHeaders:
        - pattern: '**/*.js'
          headers:
            - key: 'Content-Type'
              value: 'application/javascript'
    ```

3. 접근성: 백그라운드 및 포그라운드 색상의 대비율 개선

- 셀렉터에서 공격을 선택했을 경우, 방어 선택지의 컬러가 어두워지는 디자인이였으나 해당 디자인에 대한 색상 대비가 불충분하다는 결과를 받아 전체적인 폰트 색깔을 통일하는 방향으로 변경했습니다.

4. 접근성: aria-label 사용

- `aria-label`은 `<button>`, `<a>`, `<input>`, `<a>` 처럼 사용자가 직접 클릭, 입력, 선택과 같이 상호작용을 할 수 있는 요소에 주로 사용합니다. 이러한 요소에 `aria-label` 속성을 사용해서 스크린 리더 사용자에게 해당 요소들에 대한 기능을 설명할 수 있습니다.

- `alt`는 `<img>` 처럼 이미지 요소가 로드되지 않는 상황에 나타나거나 시각 장애인이 이미지를 이해할 수 있도록 도울 수 있는 대체 텍스트를 대체하는 역할을 합니다.
  (끝)
