self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('v1').then(function (cache) {
            return cache.addAll([
                "https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js",
                "/assets/custom/user/login-v2.css",
                "/assets/demo/default/base/style.bundle.css",
                "/assets/media/logos/favicon.ico",
                "/assets/demo/default/custom/custom/login/login.js",
                "/bundles/login.bundle.js"
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(caches.match(event.request).then(function (response) {
        // caches.match() always resolves
        // but in case of success response will have value
        if (response !== undefined) {
            return response;
        } else {
            return fetch(event.request).then(function (response) {
                // response may be used only once
                // we need to save clone to put one copy in cache
                // and serve second one
                let responseClone = response.clone();

                caches.open('v2').then(function (cache) {
                    cache.put(event.request, responseClone);
                });
                return response;
            }).catch(function () {
                return caches.match('/sw-test/gallery/myLittleVader.jpg');
            });
        }
    }));
});
