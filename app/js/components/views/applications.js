// Applications list view
import { getState, getCurrentRole } from '../../state.js';

export function render(container, params, copy) {
  const state = getState();
  const role = getCurrentRole();
  const s = copy?.screens?.applications || {};
  const empty = copy?.empty?.applications || {};
  let apps = state?.applications || [];

  container.innerHTML = `
    <div class="view view-applications">
      <h1>${s.heading || 'Applications'}</h1>
      <p class="view-intro">${s.intro || ''}</p>
      ${role === 'staff' ? `
        <div class="filter-bar">
          <label for="status-filter" class="form-label">Filter by status:</label>
          <select id="status-filter" class="form-input form-input--inline">
            <option value="">All</option>
            <option value="submitted">Submitted</option>
            <option value="under-review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="declined">Declined</option>
          </select>
        </div>
      ` : ''}
      <div id="app-list-container"></div>
      <a href="#/apply" class="btn btn-primary">${s.newApplicationLabel || 'Start a new application'}</a>
    </div>
  `;

  renderList(container, apps, empty, copy);

  if (role === 'staff') {
    container.querySelector('#status-filter')?.addEventListener('change', (e) => {
      const filtered = e.target.value ? apps.filter(a => a.status === e.target.value) : apps;
      renderList(container, filtered, empty, copy);
    });
  }
}

function renderList(container, apps, empty, copy) {
  const listEl = container.querySelector('#app-list-container');
  if (apps.length === 0) {
    listEl.innerHTML = `<div class="empty-state"><h2>${empty.heading || 'No applications yet.'}</h2><p>${empty.body || ''}</p></div>`;
    return;
  }
  listEl.innerHTML = `
    <ul class="record-list">
      ${apps.map(a => `
        <li class="record-item">
          <a href="#/applications/${a.id}" class="record-link">
            <span class="record-name">${a.type}</span>
            <span class="badge badge--${a.status}">${a.status}</span>
            <span class="record-meta">${new Date(a.submittedAt).toLocaleDateString()}</span>
          </a>
        </li>
      `).join('')}
    </ul>
  `;
}
