const CACHE_NAME = 'v1';

self.addEventListener('install', event => {});

self.addEventListener('activate', async event => {
  const cache = await caches.open(CACHE_NAME);

  for (let request of await cache.keys()) {
    cache.delete(request);
  }
});

addEventListener('fetch', event => {
  event.respondWith((async () => {
    try {
      
      const cache = await caches.open(CACHE_NAME);

      let response = await cache.match(event.request);
      if (response) {
        return response;
      }

      response = await fetch(event.request);
      cache.put(event.request, response.clone());
      return response;
    } catch(err) {

      console.error(err);
    }
  })());
});