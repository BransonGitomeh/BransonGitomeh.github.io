self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('v1').then(function (cache) {
            return cache.addAll([
                "https://unpkg.com/leaflet@1.4.0/dist/leaflet.js",
                "https://unpkg.com/leaflet@1.4.0/dist/leaflet.css",
                "https://cdnjs.cloudflare.com/ajax/libs/pace/1.0.2/pace.min.js",
                "https://cdnjs.cloudflare.com/ajax/libs/pace/1.0.2/themes/blue/pace-theme-minimal.min.css",
                "https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js",
                "/assets/vendors/base/vendors.bundle.js",
                "/assets/demo/default/base/scripts.bundle.js",
                "/assets/app/scripts/custom/dashboard.js",
                "/assets/app/scripts/bundle/app.bundle.js",
                "/assets/demo/default/custom/components/forms/widgets/bootstrap-select.js",
                "/assets/demo/default/custom/components/forms/widgets/bootstrap-daterangepicker.js",
                // "/bundles/saas.bundle.js",
                "https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote.js",
                "/assets/vendors/base/vendors.bundle.css",
                "/assets/demo/default/base/style.bundle.css",
                "/assets/demo/default/skins/header/base/light.css",
                "/assets/demo/default/skins/header/menu/light.css",
                "/assets/demo/default/skins/brand/navy.css",
                "/assets/media/logos/favicon.ico",

                "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.2/css/bootstrap-select.min.css",
                "https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css",
                "https://use.fontawesome.com/releases/v5.6.3/css/all.css",
                "https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote.css"
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
