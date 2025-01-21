// service-worker.js

// 캐시할 자원을 정의합니다.
const CACHE_NAME = 'v1';
const urlsToCache = [
  './Home.css',
  './Home.jsx',
  '/assets/videos/Education.webm'
];

// 서비스 워커 설치 및 자원 캐시
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 캐시된 자원을 사용하여 네트워크 요청에 응답
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 캐시된 응답을 찾으면 반환
        if (response) {
          return response;
        }

        // 새로운 네트워크 요청을 수행하여 응답을 가져옵니다.
        return fetch(event.request).then(response => {
          // 유효한 응답이 아니라면 그대로 반환
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // 응답을 복제하여 캐시에 저장
          var responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});
