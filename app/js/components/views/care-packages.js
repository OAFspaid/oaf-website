// Care packages list view
import { getState, getCurrentRole } from '../../state.js';

export function render(container, params, copy) {
  const state = getState();
  const s = copy?.screens?.carePackages || {};
  const empty = copy?.empty?.carePackages || {};
  const pkgs = state?.carePackages || [];

  container.innerHTML = `
    <div class="view view-care-packages">
      <h1>${s.heading || 'Care Packages'}</h1>
      <p class="view-intro">${s.intro || ''}</p>
      ${pkgs.length === 0 ? `
        <div class="empty-state"><h2>${empty.heading || 'No care packages.'}</h2><p>${empty.body || ''}</p></div>
      ` : `
        <ul class="record-list">
          ${pkgs.map(p => `
            <li class="record-item">
              <a href="#/care-packages/${p.id}" class="record-link">
                <span class="record-name">${p.title || p.description || 'Care Package'}</span>
                <span class="badge badge--${p.status}">${p.status}</span>
                <span class="record-meta">${p.priority || 'standard'}</span>
              </a>
            </li>
          `).join('')}
        </ul>
      `}
    </div>
  `;
}
