import type { Metadata, Viewport } from 'next'
import './global.css'
import { Noto_Sans_KR } from 'next/font/google'
import localFont from 'next/font/local'

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
    canonical: 'https://mypokemontype.vercel.app',
  },
  metadataBase: new URL('https://mypokemontype.vercel.app'),
  openGraph: {
    title: 'My Pokemon Type | 포켓몬 타입 계산기',
    description: '포켓몬 배틀을 위한 타입 상성 계산기',
    url: 'https://mypokemontype.vercel.app',
    siteName: 'My Pokemon Type',
    images: [
      {
        url: '/img/ico/favicon_light.ico',
        width: 1200,
        height: 630,
        alt: 'My Pokemon Type | 포켓몬 타입 계산기',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  icons: {
    icon: [
      {
        href: '/img/ico/favicon_light.ico',
        url: '/img/ico/favicon_light.ico',
        type: '/img/x-icon',
      },
      {
        url: '/img/ico/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/img/ico/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/img/ico/apple-touch-icon.png',
        sizes: '180x180',
      },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/img/ico/safari-pinned-tab.svg',
        color: '#dddbdb',
      },
    ],
    shortcut: '/img/ico/favicon_light.ico',
  },
  manifest: '/img/ico/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'My Pokemon Type',
    statusBarStyle: 'default',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#dddbdb',
}

export const noto = Noto_Sans_KR({
  weight: ['700', '900'],
  display: 'swap',
  preload: true,
  variable: '--font-noto',
  subsets: ['latin'],
})

const helios = localFont({
  src: [
    {
      path: '../../public/HeliosExtBlack.woff',
      style: 'normal',
      weight: '400 700 900',
    },
  ],

  display: 'swap',
  preload: true,
  variable: '--font-helios',
  fallback: ['system-ui', 'Arial'],
})
//TODO
// [ ] 다운로드 받기
// [ ] 사용중인 font-weight 찾아서 작성

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ko"
      className={`${noto.variable} ${helios.variable} ${noto.className}`}
    >
      <body>
        <main>{children}</main>
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
