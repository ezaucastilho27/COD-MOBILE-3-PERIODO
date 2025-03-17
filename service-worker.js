// Defina o nome do cache
const CACHE_NAME = 'ezaufotografias-cache-v1';

// Arquivos a serem armazenados em cache
const CACHE_URLS = [
  '/',
  '/index.html',
  '/assets/favicon.ico',
  '/assets/img/casamento.jpeg',
  '/assets/img/site ezauu.jpg',
  '/assets/img/casamento na praia.jpg',
  '/css/styles.css',
  '/js/scripts.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
  'https://use.fontawesome.com/releases/v6.3.0/js/all.js',
  'https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900',
  'https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i'
];

// Instalar o Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Cache aberto');
        return cache.addAll(CACHE_URLS);
      })
  );
});

// Ativar o Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Ativado');
  // Limpar caches antigos
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar as requisições e servir arquivos do cache, se possível
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Retorna a resposta do cache se disponível
        if (cachedResponse) {
          return cachedResponse;
        }
        // Caso contrário, faz a requisição de rede
        return fetch(event.request);
      })
  );
});
