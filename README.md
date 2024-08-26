> <aside>

> ## 배포 페이지: https://mypkmn.info/
>
> 개인 프로젝트 `My Pokemon Type`는 <포켓몬스터> 게임 내 배틀을 할 때에 나 혹은 상대의 포켓몬 타입을 선택하면 공격과 방어를 할 때에 각각 효율적인 포켓몬 타입을 찾아드리는 반응형 리액트 웹앱 프로젝트 입니다.
>
> </aside>

## `My Pokemon Type` README 목차

<!-- 프로젝트 목적
사용한 스택
리덕스툴킷, 타입스크립트+리액트 스택 선정 이유(스택이 도움된 부분, 사용할 수 밖에 없던 이유)
..
길어지면 위 내용을 정리한 노션 링크 올리기 -->

<!-- 1. [사용한 스택](#1-사용한-스택)
2. [프로젝트 상세사항](#2-프로젝트-상세사항)
3. [API 요청 및 배포 과정에서 배운 점](#3-api-요청-및-배포-과정에서-배운-점)
4. [SCSS 사용 과정에서 배운 점](#4-scss-사용-과정에서-배운-점) -->

1. `My Pokemon Type` 프로젝트의 기능
2. 사용한 스택 및 스택 선정 과정
3. 기획 및 상세 사항
4. 배운 점

## 1) `My Pokemon Type` 프로젝트의 기능

1. 셀렉터에서 18개의 포켓몬 타입 중에서 최소 0개에서 최대 2개를 선택할 수 있습니다. 결과 컴포넌트에서 그에 해당하는 포켓몬 타입이 공격하거나 방어할 때에 가장 효율적인 타입을 계산 결과를 보여줍니다.

2. 다크모드가 지원되며 유저가 선호하느 ㄴ

3.

- 사용자가 선택했던 포켓몬 타입, 공격/방어 계산기, 다크모드, 언어는 웹 페이지를 닫더라도 로컬 스토리지를 통해 저장됩니다. (redux-persist)
- 해당 웹앱은 한국어, 영어, 일본어 언어가 지원되며, 자동으로 유저의 국가 위치에 따라 그에 맞는 해당 앱의 언어가 지원됩니다. (cloudfront)
- React, Styled-component를 통해 PC, 태블릿, 모바일 반응형 UI를 구현했습니다. - (리액트, 스타일드컴포넌트, )
- 포켓몬 타입을 최대 2개까지만 클릭 가능하도록 만들어서 실용성을 추구했고, 결과 컴포넌트에서 가장 효과적인 포켓몬 타입에 강조 아이콘을 사용해서 UX를 개선했습니다. - (기획, 디자인, 피그마, )

## 3) 기획 및 상세 사항

1. 18개의 포켓몬 타입 중에서 최소 0개에서 최대 2개를 선택할 수 있도록 만들어서 사용성을 개선했습니다.

이는 모든 포켓몬들은 1개 혹은 2개의 타입만 갖고 있기 때문에 3개 이상의 포켓몬 타입을 클릭할 필요가 없기 때문에 기획 초기 부터 염두에 두었던 기능입니다. 그렇기 때문에 유저가 셀렉터에서 두 개 이상의 타입을 클릭한 상태에서 추가로 다른 포켓몬 타입을 클릭하면 자동으로 클릭이 해제되어서 가장 최근에 클릭한 포켓몬 타입을 클릭하게 됩니다.

이후에 유저가 셀렉터에서 선택한 포켓몬 타입이 각 18개 포켓몬 타입에게 타입과 공격, 방어 알고리즘을 계산합니다.

## 1) 사용한 스택

- AWS: `Cloudfront`, `Amplify`, `Route 53`
- `React`, `TypeScript`, `Redux-toolkit`, `Redux-persist`, `Styled-component`, `Figma`, `jest`

## 2) 프로젝트 상세사항

- 네이버에서 제공하는 검색 API 요청
- CORS 문제 해결을 위한 `Express` 서버 구축
- `Heroku`를 사용한 서버 배포
- `flex`와 `grid`를 이용한 반응형 디자인
- `SCSS` 를 사용해서 중첩, 믹스인 문법 사용 경험
- [에어비앤비 스타일 가이드](https://github.com/CodeMakeBros/css-style-guide) 를 사용한 class 작명

## 3) API 요청 및 배포 과정에서 배운 점

### 1/7. 네이버 API를 요청하는 방법

네이버 API를 요청하기 위해서는 먼저 네이버 Developers 페이지에서 애플리케이션을 등록해야 한다. 등록 과정에서 발급받은 클라이언트 아이디와 클라이언트 시크릿을 사용하여, GET 방식으로 API 요청을 보내는 것이 필수적이였다. 요청 시, 클라이언트 아이디, 클라이언트 시크릿, GET 요청 방식, api 요청을 보낼 url을 헤더에 포함시키는 것이 필요하다. 이를 통해 네이버에서 제공하는 다양한 API(검색, 카페, 캘린더 등)를 활용할 수 있었다.

### 2/7. Heroku를 사용한 Express 서버 배포

로컬 환경에서 HTTP 페이지에서는 API 요청이 정상적으로 작동했지만, HTTPS 페이지에서는 CORS 에러가 발생했다. 이를 해결하기 위해 Express 서버를 설정하고, Heroku를 사용하여 배포했다. Heroku를 통해 배포된 서버는 HTTPS를 지원하므로, CORS 문제를 해결할 수 있었다.

### 3/7. ES 모듈 환경에서 CommonJS 전역 변수인 dirname을 사용하는 방법

`index.js` 에서 `app.use(express.static(join(__dirname, 'public')));` 와 같이 `index.html`의 위치를 지정하기 위해 `__dirname`을 사용했었다.

Heroku와 Node.js는 ES 모듈과 CommonJS 모듈을 모두 지원한다. 현재 프로젝트는 `import`, `export` 키워드를 사용하는 ES 모듈 환경으로 설정되어 있었다. 따라서 CommonJS 문법인 `__dirname`을 사용할 수 없고, ES 모듈 문법만 사용할 수 있는 상태였다.

처음에는 'Heroku와 Node.js가 ES 모듈과 CommonJS 모듈을 모두 지원한다'는 내용을 보고 혼란스러웠다. 왜 지금의 환경에서 `__dirname`을 사용할 수 없는지 이해하기 어려웠기 때문이다.

알고 보니, Heroku와 Node.js가 ES 모듈 환경으로 설정된 경우 ES 모듈 문법만, CommonJS 모듈 환경으로 설정된 경우 CommonJS 문법만 사용할 수 있었던 것이다.

따라서 현재 환경에서 CommonJS 전역 변수인 `__dirname`을 사용하기 위해 `import.meta.url`을 대체로 사용했다. `import.meta.url`을 통해 현재 모듈의 URL을 얻고, 이를 파일 경로로 변환하여 `index.html`을 가져올 수 있었다.

Heroku로 배포하면서 마주했던 더 많은 에러들과 디버깅에 대한 자세한 내용은 아래 노션 블로그에 정리했다.

[https://www.notion.so/stillcorners/Heroku-cors-express-4faa5e84e6e04434abc8ea266d49334a#49d30652ad054cd69a51b4b015719d97](https://www.notion.so/4faa5e84e6e04434abc8ea266d49334a?pvs=21)

### 4/7. `axios`를 사용해서 GET 요청하는 방법

`axios`를 사용해서 `/search/blog` 엔드포인트로 네이버 블로그 검색 API에 GET 요청을 보냈다. 요청 URL은 사용자가 입력한 검색어를 포함하도록 동적으로 생성되었다.

```jsx
// index.js

app.get('/search/blog', async (req, res) => {
  const query = req.query.query;
  const api_url =
    'https://openapi.naver.com/v1/search/blog?query=' +
    encodeURI(query) +
    '&display=10&start=1&sort=date';

  try {
    const response = await axios.get(api_url, {
      headers: {
        'X-Naver-Client-Id': client_id,
        'X-Naver-Client-Secret': client_secret,
      },
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(error.response ? error.response.status : 500).send(error.message);
  }
});
```

- `app.get('/search/blog', async (req, res) => { const api_irl ... }`: `axios`의 `get` 메서드를 사용하여 API 요청을 보낸다. 이 때 `async` 키워드를 사용해서 비동기적으로 API 요청을 보내고 응답을 기다린다. 이후 응답이 도착하면 `await` 키워드가 그 결과를 처리한다.
  - `req` (request): 클라이언트가 서버로 보내는 요청 객체이다. 여기서 `req.query.query` 를 사용해서 사용자가 입력한 검색어를 가져올 수 있었다.
  - `res` (response): 서버가 클라이언트로 보내는 응답 객체이다. 검색 결과를 JSON 형태로 반환한다.
- `try { const response = await axios.get(api_url, { headers :{ ...} } ...} catch (error) { … }`: try-catch 문은 예외 처리를 담당한다. `try` 블록의 `axios.get` api 요청을 하고 에러가 발생하면 `catch` 블록이 실행된다.
  - `headers`: 객체는 API 인증을 위해 네이버에서 발급받은 클라이언트 ID와 클라이언트 시크릿을 포함한다.
  - `response.status(response.status).json(response.data)`: 요청이 성공 (검색)하면, API 응답 데이터 (검색 결과)를 클라이언트에 JSON 형식으로 반환한다.
  - `catch (error)`: 요청이 실패하면, 오류 메시지를 콘솔에 출력하고 클라이언트에 오류 상태와 메시지를 반환한다.

### 5/7. `git add` 할 때에 터미널에서 LF will be replaced by CRLF in.. 에러 해결 방법

SCSS를 사용하기 시작할 때부터 종종 `git add .` 를 할 때에 가끔 터미널에서 다음와 같은 LF 관련 에러가 발생했다. : `warning: in the working copy of 'index.html', LF will be replaced by CRLF the next time Git touches it`

LF(Line Feed)는 맥, 리눅스 환경의 줄 바꿈 형식이고, CRLF(Carriage Return Line Feed)는 주로 윈도우 환경의 줄 바꿈 형식을 뜻한다. 이 경고는 Git이 파일을 add 하면서 자동으로 줄 바꿈 형식을 변환하는데, 이 때 LF와 CRLF 둘 중 어떤 것을 선택할지 알려 달라는 의미로 경고 메세지를 띄운 것이다.

실제로 확인해보니 각 SCSS 파일마다 LF와 CRLF가 다르게 설정 되어있었다. 윈도우 유저인 나는 모든 파일들의 줄바꿈을 CRLF 로 저장하기 위해서 `git config --global core.autocrlf true` 명령어를 통해 윈도우 OS에서 전역적으로 통일해서 바꿔주었다.

이 에러를 보고 처음으로 맥과 윈도우가 서로 다른 줄바꿈 체계를 갖고 있다는 걸 배웠다. 나중에 윈도우 사용자인 내가 맥 사용자와 협업을 한다면 줄바꿈 체계에 대해 의논하고 일관성을 유지하는게 중요할 것이라는 생각이 들었다.

### 6/7. 원활한 배포를 위해 상대 경로로 작성하는 것이 좋다

```html
<!--index.html-->

<link rel="shortcut icon" href="img/symbol/symbol.png" /> // (O) 상대경로
<link rel="shortcut icon" href="./img/symbol/symbol.png" />// (X) 절대경로 비추
```

`./`로 시작하는 절대경로로 경로를 사용해도 IDE에서는 에러가 없지만, 배포할 때에는 상대경로로 작성해주는게 권장된다.

이는 절대 경로를 사용할 경우 서버의 루트 디렉토리를 기준으로 파일을 찾기 때문이다. 반면에, 상대 경로를 사용해서 현재 HTML 파일과 동일한 위치에서 파일들을 찾는게 좀 더 안전하다.

상대경로를 사용함으로써 파일 구조 변경 시에도 경로 수정이 용이하며, 다양한 배포 환경에서도 일관된 동작을 보장할 수 있다.

### 7/7. 깃허브 페이지 배포는 절대 경로가 권장되었지만, Heroku 배포는 상대 경로가 권장된다.

이전에 깃허브 페이지에서 배포할 때에는 이미지가 렌더링 되지 않았다가 `https://stillcorners.github.io/naverappclone/src/img/sp/sp_search.png` 와 같이 절대경로를 수정해서 입력했더니 렌더링이 잘 되었던 경험이 있었다. 그래서 왜 깃허브 페이지와 Heroku가 서로 다른 경로 작성이 필요한지 궁금했다.

깃허브 페이지 배포와 Heroku 배포는 서로 다른 방식으로 애플리케이션을 호스팅하기 때문에 경로 작성에 대한 권장 사항이 다른 것이다.

**Heroku**는 **서버 측 애플리케이션**을 호스팅하는 플랫폼이다. Heroku에서 배포된 애플리케이션은 서버 측에서 동적으로 콘텐츠를 생성하고 제공할 수 있다. 이 경우 상대경로를 사용하는 것이 일반적이다.

상대 경로를 사용해서 현재 파일의 위치를 기준으로 파일을 찾기 때문에, 서버 측 애플리케이션에서는 상대경로를 사용하여 파일을 참조하는 것이 더 유연하다.

예를 들어, `index.html` 파일이 `src` 디렉토리에 있는 경우, 상대경로를 사용하면 파일 구조가 변경되더라도 쉽게 경로를 수정할 수 있다.

**GitHub Pages**는 **정적 사이트 호스팅 서비스**이다. 정적 사이트는 서버 측의 로직 없이 클라이언트 측에서만 동작한다.

절대경로는 서버의 루트 디렉토리를 기준으로 파일을 찾기 때문에, GitHub Pages와 같은 정적 사이트 호스팅 서비스에서는 절대경로를 사용하는 것이 더 안전하다. 이는 GitHub Pages가 루트 디렉토리를 기준으로 파일을 찾기 때문이다.

## 4) SCSS 사용 과정에서 배운 점

### 1/4. SCSS **파일 네이밍 규칙: 언더바 사용**

SCSS 파일 대부분에는 파일명 맨 앞에 언더바(`_`)를 붙인다. 예를 들어, `_mixin.scss` 파일을 생성할 수 있고, 다른 파일에서 이를 import할 때에는 언더바를 생략하여 `@import 'mixin';` 과 같이 작성할 수 있다. 이렇게 SCSS 파일명 앞에 언더바를 붙이는 이유는 해당 파일을 컴파일 하지 않기 위함이다.

추후에 메인으로 사용할 언더바가 붙지 않은 `main.scss` 와 같은 SCSS 파일 1개에서 모든 SCSS 파일들의 컴파일을 할 수 있다. 그리고 `main.scss` 라는 하나의 SCSS 파일만 CSS 파일로 컴파일 한 뒤에 `main.scss`만 HTML 파일에 import를 해서 사용할 수 있을 것이다. 그러면 렌더링 시 모든 SCSS 파일이 아닌 `main.scss` 파일만 import를 할 수 있어서 효율적이다.

### 2/4. **에어비앤비 스타일 가이드 첫 도입 경험**

클래스 네이밍에 어려움을 겪던 중, 에어비앤비 스타일 가이드를 도입하여 언더바 두 개(`__`)를 사용한 네이밍 방식을 시도해보았다.

장점으로는 `shortcut__item__link__image`와 같은 클래스명을 사용함으로써 `.shortcut` 클래스 내부에 `&__item__link` 와 `&__image` 클래스를 중첩해서 스타일을 적용할 수 있었다. 이를 통해 가독성이 향상되고 관련된 스타일을 그룹화해서 관리하기 쉬웠다는 점 등을 경험할 수 있었다.

그러나 클래스명이 길어져서 HTML 파일이 과하게 복잡해진다는 단점이 있었다. 돌이켜보면 굳이 언더바를 두 개 사용하지 않아도 되었던 것 같다는 아쉬움이 남는다. 다음에는 `BEM`이나 `OOCSS` 네이밍 방식을 사용해보고 싶기도 하고, `btn`, `nav` 와 같이 보편적으로 사용하는 축약형 네이밍에 대해 좀 더 찾아보고 싶다.

### 3/4. `rem` 단위를 사용하여 상대적인 반응형 사이즈 지정하기

`rem` 단위를 사용하는 방법은 다음과 같다.

1. `html` 요소에 기본 `font-size`를 설정한다.
2. 이후 다양한 요소에 `1.8rem`과 같은 `rem` 단위를 사용하여 CSS 속성의 값을 줄 수 있다.

`rem` 단위는 루트 요소(`html`)의 `font-size`를 기준으로 상대적인 크기를 지정하는 단위이다. 예를 들어, `1rem`은 루트 요소의 `font-size`와 동일하며, `3rem`은 루트 요소의 `font-size`의 3배에 해당한다.

`rem` 단위는 반응형 웹 디자인을 구현할 때 매우 유용하게 사용할 수 있다. `rem` 단위를 사용하면, 루트 요소의 `font-size`만 변경하여 전체적인 폰트 크기를 쉽게 조정할 수 있기 때문에 전체적인 크기의 통일성을 주기 쉽고 유지보수와 확장성이 뛰어나다.

프로젝트 이후에 배운 내용인데 `rem` 단위를 사용할 때에는 주로 `html` 의 `font-size`를 16px으로 설정하는 것이 관례라고 한다. 이는 대부분의 브라우저가 기본적으로 `html` 요소의 `font-size`를 16px으로 설정하기 때문에 크로스 브라우징을 위해 권장된다. 또, 16px을 기준으로 했을 때에 `rem` 단위의 계산이 간단해진다는 의견이 있다. 이번 프로젝트에서는 `font-size를` 10px로 설정했지만, 다음에는 16px으로 설정해서 사용해보고 싶다.

### 4/4. CSS 속성과 SCSS 믹스인을 활용한 스프라이트 이미지 추출하는 방법

스프라이트 이미지는 여러 작은 이미지들을 하나의 이미지 파일으로 결합한 것이다. 이를 통해 HTTP 요청 수 감소, 로딩 시간 단축, 캐싱 효율성 향상, 용량 개선, 일관된 디자인 유지 등 다양한 장점을 제공한다.

이번 프로젝트에서 스프라이트 이미지에서 특정 부분만 추출하는 방법을 학습할 수 있었다. 이를 위해 `background-position`, `background-repeat`, `background`, `background-size` 속성을 활용했고, SCSS 믹스인(`@mixin`)을 사용하여 반복적인 스타일 정의를 효율적으로 관리할 수 있었다.

```scss
// _mixin.scss

@mixin spImg($url, $repeat: no-repeat, $position, $size) {
  background: url($url);
  background-repeat: $repeat;
  background-position: $position;
  background-size: $size;
}
```

```scss
// _header.scss

&__menu {
  @include spImg(
    $url: '/src/img/sp/sp_main_search.png',
    $position: -47px -145px,
    $size: 323px 273px
  );
}
```

- `background`: 스프라이트 이미지의 URL (위치)를 지정한다.
- `background-repeat`: `no-repeat` 을 통해 이미지가 반복되지 않도록 설정한다.
- `background-position`: 스프라이트 이미지에서 원하는 부분의 위치를 지정한다.
- `background-size`: 스프라이트 이미지의 전체 크기를 설정한다.

이러한 방법을 통해, 스프라이트 이미지에서 특정 아이콘이나 그래픽 요소를 효율적으로 추출하고 사용할 수 있었다. 이는 코드의 재사용성을 높이고, 유지보수를 용이하게 하며, 스타일 정의의 일관성을 유지하는 데 큰 도움이 되었다.
