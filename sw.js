const CACHE_NAME = "kamus-cache-v1";
const FILES = [
  "/BIKamus/",
  "/BIKamus/index.html",
  "/BIKamus/style.css",
  "/BIKamus/app.js",
  "/BIKamus/manifest.json",
  "/BIKamus/iconkamus-192.png",
  "/BIKamus/iconkamus-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => (k !== CACHE_NAME ? caches.delete(k) : null))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
