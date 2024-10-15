// function handler(event) {
//   var request = event.request;
//   var headers = request.headers;
//   var supportedCountries = ['en', 'ja'];
//   var defaultCountryCode = 'ko';
//   var uri = request.uri;
//   var newURI;

//   if (uri.startsWith('/static/')) {
//     return request;
//   } // 경로가 `/static/js/main.a342a225.js` 자체는 통과

//   if (uri.startsWith('/en') || uri.startsWith('/ja') || uri.startsWith('/ko')) {
//     return request;
//   } // 이미 언어 코드가 포함된 uri는 통과함 (ex: /en/more)
//   //

//   if (headers['cloudfront-viewer-country']) {
//     var countryCode = headers['cloudfront-viewer-country'].value.toLowerCase();
//     // console.log(`Viewer Country (테스트 값: us): ${countryCode}`);

//     if (supportedCountries.includes(countryCode)) {
//       return {
//         statusCode: 302,
//         statusDescription: 'Found',
//         headers: {
//           location: { value: '/' + countryCode + uri },
//         },
//       };
//     } else {
//       // 지원되지 않는 국가 코드인 경우 기본값(ko)으로 리디렉션
//       return {
//         statusCode: 302,
//         statusDescription: 'Found',
//         headers: {
//           location: { value: '/' + defaultCountryCode + uri },
//         },
//       };
//     }
//   } else {
//     console.log('CloudFront-Viewer-Country header not found');
//   }

//   // 헤더가 없으면 기본값으로 리디렉션
//   return {
//     statusCode: 302,
//     statusDescription: 'Found',
//     headers: {
//       location: { value: '/' + defaultCountryCode + uri },
//     },
//   };
// }

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
