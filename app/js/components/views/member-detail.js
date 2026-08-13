// Member detail view
import { getState } from '../../state.js';

export function render(container, params, copy) {
  const state = getState();
  const member = (state?.members || []).find(m => m.id === params.id);

  if (!member) {
    container.innerHTML = `<div class="view"><h1>Member Not Found</h1><p>No member with this ID.</p><a href="#/members" class="btn btn-outline">Back</a><p class="crisis-footer-note" style="margin-top:1.5rem;">If you are in crisis, <a href="#/crisis-resources">Crisis Resources are here</a> — or call or text <a href="tel:988">988</a>.</p></div>`;
    return;
  }

  container.innerHTML = `
    <div class="view view-member-detail">
      <h1>${member.firstName} ${member.lastName}</h1>
      <div class="detail-card card">
        <dl class="detail-list">
          <dt>Branch</dt><dd>${member.branch}</dd>
          <dt>Status</dt><dd><span class="badge badge--${member.status}">${member.status}</span></dd>
          <dt>Joined</dt><dd>${member.joinedAt ? new Date(member.joinedAt).toLocaleDateString() : 'N/A'}</dd>
          <dt>Email</dt><dd>${member.email || 'N/A'}</dd>
          <dt>Phone</dt><dd>${member.phone || 'N/A'}</dd>
        </dl>
      </div>
      <a href="#/members" class="btn btn-outline">Back to Members</a>
    </div>
  `;
}
