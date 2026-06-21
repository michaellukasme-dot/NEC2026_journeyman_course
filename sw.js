/* Amp Academy — NEC 2026 Journeyman · service worker (SAS §2.3)
   Offline-first runtime cache: page + Google Fonts. Derived edition build 2026-06-18. */
const CACHE = 'aa-jrny-2026-v4';   /* v2: relay-backed tutor added 2026-06-18 */
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(resp => {
    if (resp && (resp.ok || resp.type === 'opaque')) { const copy = resp.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return resp;
  }).catch(() => caches.match(e.request))));
});
