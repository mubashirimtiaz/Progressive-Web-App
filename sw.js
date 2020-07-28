const siteStaticName = "site-static-v0.2";
const siteDynamicName = "site-dynamic-v0.2";
const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/styles.css",
  "/css/materialize.min.css",
  "/img/dish.png",
  "/manifest.json",
  "/img/icons/icon-72x72.png",
  "/pages/fallback.html",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
];

// limit cache size function

const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

//install event

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches
      .open(siteStaticName)
      .then((cache) => {
        console.log("caching assets");
        cache.addAll(assets);
      })
      .catch((err) => {
        console.log(err);
      })
  );
});

//activate event
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== siteStaticName && key !== siteDynamicName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

//fetch event
self.addEventListener("fetch", (evt) => {
  // evt.respondWith(
  //   caches
  //     .match(evt.request)
  //     .then((cacheResponse) => {
  //       return (
  //         cacheResponse ||
  //         fetch(evt.request).then((fetchResponse) => {
  //           return caches.open(siteDynamicName).then((cache) => {
  //             cache.put(evt.request.url, fetchResponse.clone());
  //             limitCacheSize(siteDynamicName, 15);
  //             return fetchResponse;
  //           });
  //         })
  //       );
  //     })
  //     .catch(() => {
  //       if (evt.request.url.includes("html")) {
  //         return caches.match("/pages/fallback.html");
  //       }
  //     })
  // );
});

// let deferredPrompt;

// self.addEventListener("beforeinstallprompt", (e) => {
//   // Prevent the mini-infobar from appearing on mobile
//   e.preventDefault();
//   // Stash the event so it can be triggered later.
//   deferredPrompt = e;
//   // Update UI notify the user they can install the PWA
//   showInstallPromotion();
// });
