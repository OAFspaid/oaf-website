// OAF OS — PWA wiring: SW registration, update flow, install prompt.
// Loaded as a separate module so a failure here never breaks app.js.

// ─── Service Worker registration ──────────────────────────────────────────────

(async () => {
  if (!('serviceWorker' in navigator)) return;

  // SWs don't run on file:// — fail silently with a single informative log.
  if (location.protocol === 'file:') {
    console.info('[PWA] Service workers are unavailable on file:// origins. Serve over HTTP to enable offline support.');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register('/app/sw.js', { scope: '/app/' });

    // ─── Update flow ──────────────────────────────────────────────────────────
    // Wire the "New version available" banner.
    // Guard against reload loops with a session flag.

    const updateBanner = document.getElementById('pwa-update-banner');
    const updateBtn    = document.getElementById('pwa-update-btn');

    function showUpdateBanner(waitingWorker) {
      if (!updateBanner || sessionStorage.getItem('oaf-reload-pending')) return;
      updateBanner.classList.remove('hidden');

      updateBtn.addEventListener('click', () => {
        sessionStorage.setItem('oaf-reload-pending', '1');
        waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      }, { once: true });
    }

    // If there's already a waiting SW when we load (e.g. user was offline during last update cycle).
    if (registration.waiting) {
      showUpdateBanner(registration.waiting);
    }

    registration.addEventListener('updatefound', () => {
      const incoming = registration.installing;
      if (!incoming) return;
      incoming.addEventListener('statechange', () => {
        if (incoming.state === 'installed' && navigator.serviceWorker.controller) {
          showUpdateBanner(incoming);
        }
      });
    });

    // When the new SW takes control, reload once.
    let reloadScheduled = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (reloadScheduled) return;
      reloadScheduled = true;
      sessionStorage.removeItem('oaf-reload-pending');
      location.reload();
    });

  } catch (err) {
    // A failed registration must never break the app.
    console.warn('[PWA] Service worker registration failed:', err);
  }
})();

// ─── Install prompt ────────────────────────────────────────────────────────────
// beforeinstallprompt fires on Android/Chrome. iOS/Safari never fires it —
// the button stays hidden in that case, which is the correct behaviour.

let deferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault(); // suppress the mini-infobar
  deferredInstallPrompt = event;
  showInstallButton();
});

window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  hideInstallButton();
});

function getInstallButton() {
  return document.getElementById('pwa-install-btn');
}

function showInstallButton() {
  const btn = getInstallButton();
  if (btn) btn.classList.remove('hidden');
}

function hideInstallButton() {
  const btn = getInstallButton();
  if (btn) btn.classList.add('hidden');
}

// Exposed globally so the settings view (or any component) can wire click handlers.
window.__oafPwa = {
  async promptInstall() {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    const { outcome } = await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    if (outcome === 'accepted' || outcome === 'dismissed') {
      hideInstallButton();
    }
  },
  get canInstall() {
    return !!deferredInstallPrompt;
  },
};
