var staticCacheName = 'buzz-v1';

// when sw is being installed
self.addEventListener('install', function(event) {
    console.log('Service Worker Installed');
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll([
                '/',
                'css/bootstrap_paper.min.css',
                'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
                'css/style.css',
                'js/jquery.js',
                'js/main.js',
                'js/sw-register.js',
            ]);
        })
    )
});

// when sw is activated
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            cacheNames.filter(function(cacheName) {
                return cacheName.startsWith('buzz-') && cacheName !== staticCacheName;
            }).map(function(cacheName) {
                return caches.delete(cacheName);
            });
        })
    )
});

// when a fetch event is made
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    )
});

// listen for a message event
self.addEventListener('message', function(event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});