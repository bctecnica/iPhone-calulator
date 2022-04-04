// cached data 
self.addEventListener ("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            console.log('installed');
            return cache.addAll(["./index.html", "./index.js", "./style.css", "./manifest.json", "script.js", "sw.js", "./img/favicon-256.png", "./img/favicon-512.png"]);
        })
    );
});

// pulls cached data from service worker if available if working offline
self.addEventListener("fetch", e =>{
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch (e.request);
        })
    );
});