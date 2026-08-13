// Resources view with filter and search
import { getState } from '../../state.js';

export function render(container, params, copy) {
  const state = getState();
  const s = copy?.screens?.resources || {};
  const empty = copy?.empty?.resources || {};
  const resources = state?.resources || [];
  const categories = s.categories || {};

  container.innerHTML = `
    <div class="view view-resources">
      <h1>${s.heading || 'Resources'}</h1>
      <p class="view-intro">${s.intro || ''}</p>
      <div class="filter-bar">
        <div class="filter-group">
          <label for="cat-filter" class="form-label">${s.filterLabel || 'Filter by category'}:</label>
          <select id="cat-filter" class="form-input form-input--inline">
            <option value="">All</option>
            ${Object.entries(categories).map(([k,v]) => `<option value="${k}">${v}</option>`).join('')}
          </select>
        </div>
        <div class="filter-group">
          <label for="search-input" class="form-label">Search:</label>
          <input type="search" id="search-input" class="form-input form-input--inline" placeholder="Search resources..." />
        </div>
      </div>
      <div id="resources-list"></div>
    </div>
  `;

  renderResources(container, resources, empty, s);

  container.querySelector('#cat-filter').addEventListener('change', () => filterResources(container, resources, empty, s));
  container.querySelector('#search-input').addEventListener('input', () => filterResources(container, resources, empty, s));
}

function filterResources(container, resources, empty, s) {
  const cat = container.querySelector('#cat-filter').value;
  const q = container.querySelector('#search-input').value.toLowerCase().trim();
  let filtered = resources;
  if (cat) filtered = filtered.filter(r => r.category === cat);
  if (q) filtered = filtered.filter(r => r.title.toLowerCase().includes(q) || (r.blurb||'').toLowerCase().includes(q));
  renderResources(container, filtered, empty, s);
}

function renderResources(container, resources, empty, s) {
  const el = container.querySelector('#resources-list');
  if (resources.length === 0) {
    el.innerHTML = `<div class="empty-state"><h2>${empty.heading || 'No resources found.'}</h2><p>${empty.body || ''}</p></div>`;
    return;
  }
  el.innerHTML = `
    <ul class="resource-grid">
      ${resources.map(r => `
        <li class="card card--gold-rule">
          <p class="micro-label">${r.category || ''}</p>
          <h2>${r.title}</h2>
          <p>${r.blurb || ''}</p>
          ${r.url ? `<a href="${r.url}" ${r.external ? 'target="_blank" rel="noopener noreferrer"' : ''} class="btn btn-outline btn-sm">${r.external ? 'Visit (external)' : 'View'}</a>` : ''}
        </li>
      `).join('')}
    </ul>
  `;
}
