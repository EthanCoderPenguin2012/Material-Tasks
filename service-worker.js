self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('material-tasks-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/manifest.json',
                '/assets/styles/main.css',
                '/assets/images/icon-192x192.png',
                '/assets/images/icon-512x512.png',
                // Add other assets as needed
                '/assets/themes/sunrise.css',
                '/assets/themes/galaxy.css',
                '/assets/themes/neon.css',
                '/assets/themes/pastel.css',
                '/assets/themes/retro.css'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['material-tasks-cache'];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Handle advanced settings updates
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'UPDATE_SETTINGS') {
        console.log('Settings updated:', event.data.settings);
    }
});