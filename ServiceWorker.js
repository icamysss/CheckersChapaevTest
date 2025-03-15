const cacheName = "DefaultCompany-Checkers Chapaev-0.1.0";
const contentToCache = [
    "Build/4a4970da5c8f1898573ef7b9c0e8fa72.loader.js",
    "Build/65bdf7313a9b87d04d3077ad997256f9.framework.js.unityweb",
    "Build/7bb34a2235120e59dfbcecdfd6dd6902.data.unityweb",
    "Build/23045dce5b4820abdf0a538f1b8024fd.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
