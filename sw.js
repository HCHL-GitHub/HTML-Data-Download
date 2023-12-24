var current_cache = "pwa-assets";
let filesToCache = [
    "data.nds",
];

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open("pwa-assets")
      .then((cache) =>
        cache.addAll(filesToCache),
      ),
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(current_cache).then(function(cache) {
      return cache.match(event.request, {'ignoreSearch': true}).then(function (response) {
        if (response !== undefined) {
          return response;
        } else {
          return caches.match(event.request, {'ignoreSearch': true}).then((response) => {
            // caches.match() always resolves
            // but in case of success response will have value
            if (response !== undefined) {
              return response;
            } else {
              return fetch(event.request);
            }
          })
        }
      });
    })
  );
});