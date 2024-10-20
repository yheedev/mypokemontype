function (event) {
  var request = event.request;
  var headers = request.headers;
  var defaultCountryCode = 'ko';
  var supportedCountries = ['en', 'ja'];
  var uri = request.uri;
  var newURI;

  if (uri.startsWith('/static/') || uri.startsWith('/en') || uri.startsWith('/ja') || uri.startsWith('/ko')) {
    return request;
  } // `/static/js/main.a342a225.js`, `/en/`, `/ja/`, `/ko/`로 시작하는 경우 origin에 그대로 전달

  if (headers['cloudfront-viewer-country']) {
    // cloudfront-viewer-country 헤더가 있는 경우
    var countryCode = headers['cloudfront-viewer-country'].value.toLowerCase(); // cloudfront-viewer-country 헤더 값이 소문자로 변환된다.
    console.log(`Viewer Country (테스트 값: us): ${countryCode}`);

    if (supportedCountries.includes(countryCode)) {
      newURI = '/' + countryCode + uri;
    } else {
      newURI = '/' + defaultCountryCode + uri;
    }

    if (newURI !== uri) {
      return {
        statusCode: 302,
        statusDescription: 'Found',
        headers: {
          location: { value: newURI },
        },
      };
    }
  } else if (uri.endsWith('/') && uri.length > 1) {
    var trimmedURI = uri.slice(0, -1); // 마지막 슬래시 제거
    // if (trimmedURI === '') {
    //   trimmedURI = '/'; // URI가 빈 문자열이 되지 않도록 기본 '/' 설정
    // }
    return {
      statusCode: 302,
      statusDescription: 'Found',
      headers: {
        location: { value: trimmedURI },
      },
    };
  }

  return request;
}

//     if (supportedCountries.includes(countryCode)) {
//       newURI = '/' + countryCode + request.uri; // 지원하는 국가 목록이면 지원함
//     } else {
//       newURI = '/' + defaultCountryCode + request.uri; // 아니면 디폴트
//     }

//     return {
//       statusCode: 302, // 엣지에서 실행되는 코드
//       statusDescription: 'Found',
//       headers: {
//         location: { value: newURI },
//       },
//     };
//   } else {
//     console.log('cloudfront-viewer-country header not found');
//   }
//   return request;
// }
