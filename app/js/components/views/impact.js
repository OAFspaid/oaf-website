// Impact metrics view
import { getState } from '../../state.js';

export function render(container, params, copy) {
  const state = getState();
  const s = copy?.screens?.impact || {};
  const empty = copy?.empty?.impact || {};
  const metrics = state?.impactMetrics || [];

  container.innerHTML = `
    <div class="view view-impact">
      <h1>${s.heading || 'Impact'}</h1>
      <p class="view-intro">${s.intro || ''}</p>
      ${metrics.length === 0 ? `
        <div class="empty-state"><h2>${empty.heading || 'No impact data.'}</h2><p>${empty.body || ''}</p></div>
      ` : `
        <div class="card-grid">
          ${metrics.map(m => `
            <div class="card card--gold-rule">
              <h2 class="micro-label">${m.category || ''}</h2>
              <p class="stat">${m.value} <span class="stat-unit">${m.unit || ''}</span></p>
              <p class="muted">${m.label}</p>
              ${m.period ? `<p class="record-meta">${m.period}</p>` : ''}
              ${m.note ? `<p class="record-meta" style="font-style:italic;">${m.note}</p>` : ''}
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}
