// service-worker.js
// Service Worker básico exigido pelo edital (PWA instalável).
// Faz cache dos assets estáticos (app shell) e, como diferencial,
// tenta servir a última resposta da API em cache quando offline.

const CACHE_NAME = "desapega-uni-cache-v1";
const APP_SHELL = ["/", "/index.html", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Chamadas à API: tenta rede primeiro, cai pro cache se offline (stale-while-offline)
  if (request.url.includes("/api/")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Assets estáticos: cache first
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});
