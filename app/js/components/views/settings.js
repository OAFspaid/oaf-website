// Settings view
import { resetState, getCurrentRole, setCurrentRole, getState, isStorageAvailable } from '../../state.js';
import { navigate } from '../../router.js';

let seedStoreRef = null;

export function setSeedStore(s) { seedStoreRef = s; }

export function render(container, params, copy, seedStore) {
  if (seedStore) seedStoreRef = seedStore;
  const s = copy?.screens?.settings || {};
  const role = getCurrentRole();
  const storageOk = isStorageAvailable();

  container.innerHTML = `
    <div class="view view-settings">
      <h1>${s.heading || 'Settings'}</h1>
      <p class="view-intro">${s.subheading || ''}</p>
      <div class="card">
        <dl class="detail-list">
          <dt>${s.roleLabel || 'Current role'}</dt><dd>${role || 'None'}</dd>
          <dt>${s.versionLabel || 'App version'}</dt><dd>0.1.0-alpha</dd>
          <dt>Storage</dt><dd>${storageOk ? 'localStorage active' : '⚠️ In-memory only (private browsing?)'}</dd>
        </dl>
      </div>
      <div class="settings-actions">
        <button class="btn btn-primary" id="switch-role">Switch role</button>
        <button class="btn btn-danger" id="reset-data">${s.resetLabel || 'Reset demo data'}</button>
      </div>
      <div class="privacy-notice" role="note">
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <span>${s.localStorageNotice || 'Data you enter is saved on this device only, in your browser\u2019s local storage. Anyone with access to this browser can see it. It is never sent to OAF servers in this demo.'}</span>
      </div>
      <p class="privacy-clear-note">${s.clearDataLabel || 'To remove all stored data, use Reset demo data above.'}</p>
    </div>
  `;

  container.querySelector('#switch-role').addEventListener('click', () => {
    setCurrentRole(null, null);
    navigate('/login');
  });

  container.querySelector('#reset-data').addEventListener('click', () => {
    if (seedStoreRef?.seed) {
      resetState(seedStoreRef.seed);
    }
    setCurrentRole(null, null);
    navigate('/login');
  });
}
