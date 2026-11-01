const CACHE_NAME = 'movietime-v2';
const ASSETS = [
  './index.html',
  './manifest.json',
  './breaking.mp4',
  './office.mp4',
  './got.mp4',
  './stranger.mp4',
  './theboys.mp4',
  './succession.mp4',
  './downton.mp4',
  './friends.mp4',
  './euphoria.mp4',
  './bear.mp4'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Pre-caching offline assets...');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});