// App header component
import { getCurrentRole } from '../state.js';

let demoBadgeExpanded = false;

export function renderHeader(container, copy, onCrisisClick, onMenuToggle, navOpen) {
  const role = getCurrentRole();
  const appName = copy?.app?.name || 'OAF OS';
  const installLabel  = copy?.install?.installLabel  || 'Install app';
  const sharedNotice  = copy?.demo?.sharedDeviceNotice || 'Shared device? Data you enter is stored unencrypted in this browser and is visible to anyone who uses it. Use Reset demo data in Settings to clear it.';
  container.innerHTML = `
    <header class="app-header" role="banner">
      <div class="header-left">
        <button class="menu-toggle" aria-label="${copy?.a11y?.openMenu || 'Open navigation menu'}" aria-expanded="${!!navOpen}" aria-controls="app-nav" id="menu-toggle">
          <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <a href="#/" class="header-brand" aria-label="${appName} home">
          <span class="brand-text">${appName}</span>
        </a>
        <button class="demo-badge" id="demo-badge-btn" aria-expanded="${demoBadgeExpanded}" aria-controls="demo-shared-notice" title="Tap to see shared-device privacy notice">Demo / Alpha &#9432;</button>
      </div>
      <div class="header-right">
        <button id="pwa-install-btn" class="btn btn-sm btn-outline pwa-install-btn hidden"
                type="button" aria-label="${installLabel}">
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>${installLabel}</span>
        </button>
        <button class="crisis-btn" id="crisis-trigger" aria-haspopup="dialog">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <span>${copy?.nav?.crisis || 'Crisis Resources'}</span>
        </button>
        ${role ? `<span class="role-indicator">Role: <strong>${role}</strong></span>` : ''}
      </div>
    </header>
    <div id="demo-shared-notice" class="demo-shared-notice${demoBadgeExpanded ? '' : ' hidden'}" role="note" aria-live="polite">
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      <span>${sharedNotice} <a href="#/settings">Settings</a></span>
    </div>
  `;
  container.querySelector('#crisis-trigger')?.addEventListener('click', onCrisisClick);
  container.querySelector('#menu-toggle')?.addEventListener('click', onMenuToggle);
  container.querySelector('#demo-badge-btn')?.addEventListener('click', () => {
    demoBadgeExpanded = !demoBadgeExpanded;
    const btn = container.querySelector('#demo-badge-btn');
    const notice = container.querySelector('#demo-shared-notice');
    if (btn) btn.setAttribute('aria-expanded', String(demoBadgeExpanded));
    if (notice) notice.classList.toggle('hidden', !demoBadgeExpanded);
  });

  // Wire install button — deferredPrompt may have already fired by the time
  // the header re-renders, so delegate to the global pwa helper.
  const installBtn = container.querySelector('#pwa-install-btn');
  if (installBtn) {
    if (window.__oafPwa?.canInstall) installBtn.classList.remove('hidden');
    installBtn.addEventListener('click', () => window.__oafPwa?.promptInstall());
  }
}
