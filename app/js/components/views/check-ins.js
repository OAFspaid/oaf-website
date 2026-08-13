// Check-ins history view
import { getState, getCurrentRole } from '../../state.js';

export function render(container, params, copy) {
  const state = getState();
  const s = copy?.screens?.checkIns || {};
  const empty = copy?.empty?.checkIns || {};
  const checkIns = state?.checkIns || [];

  container.innerHTML = `
    <div class="view view-check-ins">
      <h1>${s.heading || 'Check-Ins'}</h1>
      <p class="view-intro">${s.intro || ''}</p>
      <a href="#/check-ins/new" class="btn btn-primary">${s.newCheckInLabel || 'Log a check-in'}</a>
      ${checkIns.length === 0 ? `
        <div class="empty-state"><h2>${empty.heading || 'No check-ins yet.'}</h2><p>${empty.body || ''}</p></div>
      ` : `
        <ul class="record-list">
          ${checkIns.sort((a,b) => b.createdAt.localeCompare(a.createdAt)).map(c => `
            <li class="record-item">
              <div class="checkin-summary">
                <span class="record-name">Mood: ${c.mood}/5</span>
                <span class="record-meta">${new Date(c.createdAt).toLocaleDateString()}</span>
              </div>
              ${c.notes ? `<p class="checkin-note">${c.notes}</p>` : ''}
            </li>
          `).join('')}
        </ul>
      `}
    </div>
  `;
}
