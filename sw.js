const siteStaticName = "site-static";
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
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
];

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
  // console.log("service Worker has been activated");
});

//fetch event
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheResponse) => {
        return cacheResponse || fetch(evt.request);
      })
      .catch((err) => console.log(err))
  );
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
