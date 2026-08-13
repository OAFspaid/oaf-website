// OAF OS — Service Worker
// Scope: /app/ only. Never intercepts the marketing site at /.
// Registration must use: navigator.serviceWorker.register('/app/sw.js', { scope: '/app/' })

const CACHE_VERSION = 'oaf-os-v1';
const SHELL_CACHE   = `${CACHE_VERSION}-shell`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

// Stable shell assets we precache at install time.
// Does NOT include Rusty's JS module filenames — those are picked up at runtime.
const PRECACHE_URLS = [
  '/app/',
  '/app/index.html',
  '/app/offline.html',
  '/app/manifest.json',
  '/app/css/app.css',
  '/app/icons/icon-192.png',
  '/app/icons/icon-512.png',
  '/app/icons/icon-maskable-192.png',
  '/app/icons/icon-maskable-512.png',
  '/app/favicon.ico',
];

// ─── Install ──────────────────────────────────────────────────────────────────

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      // Cache each URL individually so one bad fetch can't break the whole install.
      await Promise.allSettled(
        PRECACHE_URLS.map((url) =>
          cache.add(url).catch((err) => {
            console.warn(`[SW] precache miss: ${url}`, err);
          })
        )
      );
    })()
  );
});

// ─── Activate ─────────────────────────────────────────────────────────────────

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Delete every cache that doesn't belong to this version.
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((name) => name !== SHELL_CACHE && name !== RUNTIME_CACHE)
          .map((name) => caches.delete(name))
      );
      // Take control of all in-scope clients immediately.
      await self.clients.claim();
    })()
  );
});

// ─── Message handling ─────────────────────────────────────────────────────────

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// ─── Fetch ────────────────────────────────────────────────────────────────────

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests. Let non-GET pass through unmodified.
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Only handle same-origin requests within /app/.
  // Never intercept the marketing site, never cache opaque cross-origin responses.
  if (url.origin !== self.location.origin) return;
  if (!url.pathname.startsWith('/app')) return;

  // Navigation requests: hash-based SPA — all navigations resolve to /app/index.html.
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request));
    return;
  }

  // Shell assets (precached): cache-first.
  if (PRECACHE_URLS.includes(url.pathname) || PRECACHE_URLS.includes(url.pathname + '/')) {
    event.respondWith(cacheFirst(request, SHELL_CACHE));
    return;
  }

  // Everything else under /app/ (JS modules, data JSON, etc.): stale-while-revalidate.
  event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
});

// ─── Strategy helpers ─────────────────────────────────────────────────────────

async function handleNavigation(request) {
  // 1. Try network for the freshest shell.
  try {
    const networkResponse = await fetch('/app/index.html');
    if (networkResponse.ok) {
      const cache = await caches.open(SHELL_CACHE);
      cache.put('/app/index.html', networkResponse.clone());
      return networkResponse;
    }
  } catch (_) {
    // Network unavailable — fall through to cache.
  }
  // 2. Try cached shell.
  const cached = await caches.match('/app/index.html');
  if (cached) return cached;
  // 3. Last resort: offline fallback.
  const offline = await caches.match('/app/offline.html');
  if (offline) return offline;
  // 4. Bare 503 if nothing is cached at all (fresh install, offline).
  return new Response('Offline — no cached shell available.', {
    status: 503,
    headers: { 'Content-Type': 'text/plain' },
  });
}

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    console.warn('[SW] cache-first network error', request.url, err);
    return new Response('Network error', { status: 503 });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await caches.match(request);

  const networkFetch = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch((err) => {
      console.warn('[SW] SWR network error', request.url, err);
      return null;
    });

  // Return stale immediately if we have it; background-refresh either way.
  if (cached) return cached;
  // No stale copy — wait for network.
  const networkResponse = await networkFetch;
  if (networkResponse) return networkResponse;
  return new Response('Offline', { status: 503 });
}
