// Members list view
import { getState, getCurrentRole } from '../../state.js';

export function render(container, params, copy) {
  const state = getState();
  const role = getCurrentRole();
  const members = state?.members || [];

  if (role === 'member') {
    container.innerHTML = `<div class="view"><h1>My Profile</h1><p>Your profile details would appear here.</p><a href="#/dashboard" class="btn btn-outline">Back to Dashboard</a></div>`;
    return;
  }

  container.innerHTML = `
    <div class="view view-members">
      <h1>Members</h1>
      <p class="view-intro">Active members in the program.</p>
      ${members.length === 0 ? `<div class="empty-state"><p>No members yet.</p></div>` : `
        <ul class="record-list">
          ${members.map(m => `
            <li class="record-item">
              <a href="#/members/${m.id}" class="record-link">
                <span class="record-name">${m.firstName} ${m.lastName}</span>
                <span class="badge badge--${m.status}">${m.status}</span>
                <span class="record-meta">${m.branch}</span>
              </a>
            </li>
          `).join('')}
        </ul>
      `}
    </div>
  `;
}
