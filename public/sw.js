const CACHE_NAME = 'mypkmn-v2'

const STATIC_ASSETS = [
  '/img/ico/web-app-manifest-192x192.png',
  '/img/ico/web-app-manifest-512x512.png',
  '/data/pokemon-ko.json',
  '/data/pokemon-ja.json',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)),
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)),
      ),
    ),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  if (url.origin !== self.location.origin) return

  // HTML 페이지(navigate)는 항상 네트워크 우선 — 배포 후 구버전 캐시 방지
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match(request)),
    )
    return
  }

  // /locales/ 번역 파일: 네트워크 우선, 실패 시 캐시
  if (url.pathname.startsWith('/locales/')) {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const clone = res.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          return res
        })
        .catch(() => caches.match(request)),
    )
    return
  }

  // 그 외 정적 자산: 캐시 우선, 없으면 네트워크
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached
      return fetch(request).then((res) => {
        if (res.ok) {
          const clone = res.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
        }
        return res
      })
    }),
  )
})
