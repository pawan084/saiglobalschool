/* SSSGS service worker.
 * Cache-first for static assets, network-first for pages, offline fallback page.
 * Update the version below when shipping a new shell.
 */
const VERSION = "sssgs-v2";
const SHELL = `${VERSION}-shell`;
const PAGES = `${VERSION}-pages`;
const STATIC = `${VERSION}-static`;

const OFFLINE_URL = "/offline";
const SHELL_ASSETS = ["/", OFFLINE_URL, "/logo.png", "/manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL);
      try {
        await cache.addAll(SHELL_ASSETS);
      } catch (err) {
        // Best-effort: ignore individual asset failures so install never blocks
        console.warn("[sw] shell precache partial:", err);
      }
      self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => !k.startsWith(VERSION))
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

// Pages that may receive PII in query strings (event RSVPs, fee calculator
// pre-fills, apply-with-grade pre-fills, etc.). Never cache these — a shared
// device could otherwise show a prior visitor's submission state on Back.
const NEVER_CACHE_PATHS = [
  "/apply",
  "/inquire-book-a-tour",
  "/contact-us",
  "/open-house",
  "/grade-fit",
  "/fee-structure/calculator",
];

function isPiiSensitive(url) {
  if (url.search) return true; // any query string is a flag (?event=..., ?g=..., ?from=...)
  if (NEVER_CACHE_PATHS.includes(url.pathname)) return true;
  if (url.pathname.startsWith("/events/")) return true; // RSVP pages
  return false;
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  // Only GET, only same-origin
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  // Don't interfere with Next data / API
  if (url.pathname.startsWith("/api/")) return;
  if (url.pathname.startsWith("/_next/data/")) return;

  // Static immutables: cache-first
  if (url.pathname.startsWith("/_next/static/") || /\.(png|jpg|jpeg|gif|webp|avif|svg|ico|woff2?)$/i.test(url.pathname)) {
    event.respondWith(cacheFirst(req, STATIC));
    return;
  }

  // Documents: network-first with offline fallback.
  // For PII-sensitive routes, pass through to the network entirely — never cache.
  if (req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html")) {
    if (isPiiSensitive(url)) return;
    event.respondWith(networkFirst(req, PAGES));
    return;
  }
});

async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(req);
  if (hit) return hit;
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch (e) {
    return new Response("", { status: 504, statusText: "Offline" });
  }
}

async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch (e) {
    const hit = await cache.match(req);
    if (hit) return hit;
    const offline = await caches.match(OFFLINE_URL);
    return offline || new Response("Offline", { status: 503 });
  }
}

// Optional: future push notification handling
self.addEventListener("push", (event) => {
  if (!event.data) return;
  let data;
  try {
    data = event.data.json();
  } catch {
    data = { title: "SSSGS", body: event.data.text() };
  }
  event.waitUntil(
    self.registration.showNotification(data.title || "SSSGS", {
      body: data.body || "",
      icon: data.icon || "/logo.png",
      badge: "/logo.png",
      data: { url: data.url || "/" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || "/";
  event.waitUntil(self.clients.openWindow(target));
});
