import type { Metadata } from 'next'
//import ThemeProvider from '#contexts/ThemeProvider'
import './globals.css'
import Layout from '@/components/Layout'

export const metadata: Metadata = {
  title: {
    default: 'My Pokemon Type',
    template: '%s | My Pokemon Type',
  },
  description: '<My Pokemon Type>은 포켓몬 배틀을 위한 타입 상성 계산기입니다.',
  keywords: [
    '포켓몬',
    '포켓몬 타입',
    '포켓몬 타입 상성',
    '포켓몬 배틀',
    '포켓몬 타입 계산기',
    '포켓몬 타입 계산',
    '포켓몬 타입 상성 계산',
    '포켓몬 타입 상성 계산기',
    'mypkmn',
    'mypkmn.info',
    'pokemon type chart',
    'pokemon',
    'pokemon type',
    'pokemon battle',
    'pokemon type calculator',
    'pokemon battle calculator',
    'pokemon type effectiveness',
    'pokemon type effectiveness calculator',
    'pokemon type effectiveness calculator',
    'pokemon attack',
    'pokemon go',
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://mypkmn.info',
  },
  metadataBase: new URL('https://mypkmn.info'),
  openGraph: {
    title: 'My Pokemon Type | 포켓몬 타입 계산기',
    description: '포켓몬 배틀을 위한 타입 상성 계산기',
    url: 'https://mypkmn.info',
    siteName: 'My Pokemon Type',
    // images: [
    //   {
    //     url: // globe img,
    //     width: 1200,
    //     height: 630,
    //     alt: 'My Pokemon Type | 포켓몬 타입 계산기',
    //   }
    // ],
    locale: 'ko_KR',
    type: 'website',
  },

  // icons: {
  //   icon: [
  //     {
  //       href: '/images/favicon/light_favicon.png',
  //       url: '/images/favicon/light_favicon.png',
  //       media: '(prefers-color-scheme: light)',
  //     },
  //     {
  //       href: '/images/favicon/dark_favicon.png',
  //       url: '/images/favicon/dark_favicon.png',
  //       media: '(prefers-color-scheme: black)',
  //     },
  //     { url: '/favicon.ico', type: 'image/x-icon' },
  //   ],
  //   shortcut: '/images/favicon/light_favicon.png',
  //   apple: '/images/favicon/light_favicon.png',
  // },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        {/* <ThemeProvider> */}
        <Layout>{children}</Layout>
        {/* </ThemeProvider>  */}
      </body>
    </html>
  )
}

// import { createRoot } from 'react-dom/client'
// import App from '../../legacy/src/App'
// import { Provider } from 'react-redux'
// import React from 'react'
// import { BrowserRouter } from 'react-router-dom'
// import { persistor } from '../../legacy/src/stores/store'
// import { PersistGate } from 'redux-persist/integration/react'
// import { store } from 'stores/store'
// //
// const container = document.getElementById('root') as HTMLElement
// const root = createRoot(container)

// function Root() {
//   return (
//     <React.StrictMode>
//       <Provider store={store}>
//         <BrowserRouter>
//           <PersistGate loading={null} persistor={persistor}>
//             <App />
//           </PersistGate>
//         </BrowserRouter>
//       </Provider>
//     </React.StrictMode>
//   )
// }
// root.render(<Root />)
