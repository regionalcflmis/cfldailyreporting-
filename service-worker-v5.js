const CACHE = 'cfl-daily-v5-static-20260914';
const STATIC = [
  './offline.html',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(STATIC)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE && /cfl[-_ ]?(pwa|daily)/i.test(k)).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return; // Apps Script stays 100% live.

  const isNavigation = event.request.mode === 'navigate';
  const noCacheFile = /(?:index\.html|launch-v5\.html|RESET_PWA_V5\.html|manifest\.webmanifest)$/.test(url.pathname);

  if (isNavigation || noCacheFile) {
    event.respondWith(
      fetch(event.request, {cache:'no-store'})
        .catch(() => caches.match('./offline.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => caches.match('./offline.html')))
  );
});
