self.importScripts('cw2/main.js');

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
    };

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(contentToCache);
        })
    );
});

var cacheName = 'manifest.json';
var appShellFiles = [
    '/desktop/cw2/Data/english.png',
    '/desktop/cw2/Data/History.png',
    '/desktop/cw2/Data/IT.png',
    '/desktop/cw2/Data/Math.png',
    '/desktop/cw2/Data/Science.png',
    '/desktop/cw2/index.html',
    '/desktop/cw2/style.css',
    '/desktop/cw2/sw.js',
    '/desktop/cw2/Data/music.jpg',
    '/desktop/cw2/Data/business.jpg',
    '/desktop/cw2/Data/art.png',
    '/desktop/cw2/Data/running.png',
    '/desktop/cw2/Data/geo.png',

];

var gamesImages = [];
for (var i = 0; i < games.length; i++) {
    gamesImages.push('data/img/' + games[i].slug + '.jpg');
}
var contentToCache = appShellFiles.concat(gamesImages);

// Installing Service Worker
self.addEventListener('install', function(e) {
    console.log('[Service Worker] Install');
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(contentToCache);
      })
    );
 });
self.addEventListener('fetch', (e) => {
    console.log('[Service Worker] Fetched resource ' + e.request.url);
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            console.log('[Service Worker] Fetching resource: ' + e.request.url);
            return r || fetch(e.request).then(function (response) {
                return caches.open(cacheName).then(function (cache) {
                    console.log('[Service Worker] Caching new resource: ' + e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        }));
});

var cacheName = 'js13kpwa.json';

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('js13kPWA').then((cache) => {
            return cache.addAll(contentToCache);
        })
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== cacheName) {
                    return caches.delete(key);
                }
            }));
        })
    );
});
