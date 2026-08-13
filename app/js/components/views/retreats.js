// Retreats view
import { getState } from '../../state.js';

export function render(container, params, copy) {
  const state = getState();
  const s = copy?.screens?.retreats || {};
  const empty = copy?.empty?.retreats || {};
  const retreats = state?.retreats || [];

  container.innerHTML = `
    <div class="view view-retreats">
      <h1>${s.heading || 'Retreats'}</h1>
      <p class="view-intro">${s.intro || ''}</p>
      ${retreats.length === 0 ? `
        <div class="empty-state"><h2>${empty.heading || 'No retreats.'}</h2><p>${empty.body || ''}</p></div>
      ` : `
        <div class="card-grid">
          ${retreats.map(r => `
            <div class="card card--gold-rule">
              <h2>${r.name}</h2>
              <dl class="detail-list">
                <dt>${s.locationLabel || 'Location'}</dt><dd>${r.location}</dd>
                <dt>${s.statusLabel || 'Status'}</dt><dd><span class="badge badge--${r.status}">${r.status}</span></dd>
                <dt>${s.capacityLabel || 'Capacity'}</dt><dd>${r.capacity}</dd>
                <dt>Date</dt><dd>${new Date(r.date).toLocaleDateString()}</dd>
              </dl>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}
