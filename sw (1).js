// Service Worker — GPS Chofer
// Mantiene la app activa en segundo plano

const CACHE = 'gps-chofer-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

// Interceptar fetch para modo offline básico
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

// Escuchar mensajes de la app principal
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'KEEP_ALIVE') {
    // El SW responde para confirmar que sigue activo
    e.ports[0].postMessage({ alive: true });
  }
});
