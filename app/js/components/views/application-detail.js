// Application detail view
import { getState, updateRecord, getCurrentRole } from '../../state.js';

const TRANSITIONS = {
  'submitted': ['under-review', 'withdrawn'],
  'under-review': ['approved', 'declined', 'withdrawn'],
};

export function render(container, params, copy) {
  const state = getState();
  const app = (state?.applications || []).find(a => a.id === params.id);
  const role = getCurrentRole();
  const s = copy?.screens?.applicationDetail || {};

  if (!app) {
    container.innerHTML = `<div class="view"><h1>Not Found</h1><p>Application not found.</p><a href="#/applications" class="btn btn-outline">Back</a><p class="crisis-footer-note" style="margin-top:1.5rem;">If you are in crisis, <a href="#/crisis-resources">Crisis Resources are here</a> — or call or text <a href="tel:988">988</a>.</p></div>`;
    return;
  }

  const nextStatuses = (role === 'staff') ? (TRANSITIONS[app.status] || []) : [];

  container.innerHTML = `
    <div class="view view-application-detail">
      <h1>${s.heading || 'Application Detail'}</h1>
      <div class="card">
        <dl class="detail-list">
          <dt>Type</dt><dd>${app.type}</dd>
          <dt>Status</dt><dd><span class="badge badge--${app.status}">${app.status}</span></dd>
          <dt>Submitted</dt><dd>${new Date(app.submittedAt).toLocaleDateString()}</dd>
          ${app.reviewedAt ? `<dt>Reviewed</dt><dd>${new Date(app.reviewedAt).toLocaleDateString()}</dd>` : ''}
          ${app.notes ? `<dt>Notes</dt><dd>${app.notes}</dd>` : ''}
        </dl>
        ${nextStatuses.length > 0 ? `
          <div class="status-actions">
            <h3 class="micro-label">${s.updateStatusLabel || 'Update status'}</h3>
            <div class="btn-group">
              ${nextStatuses.map(st => `<button class="btn btn-outline btn-sm" data-status="${st}">${st}</button>`).join('')}
            </div>
          </div>
        ` : ''}
      </div>
      <div id="detail-toast" class="toast hidden" role="status" aria-live="polite"></div>
      <a href="#/applications" class="btn btn-outline">Back</a>
    </div>
  `;

  container.querySelectorAll('[data-status]').forEach(btn => {
    btn.addEventListener('click', () => {
      const newStatus = btn.dataset.status;
      updateRecord('applications', app.id, {
        status: newStatus,
        reviewedAt: new Date().toISOString(),
        reviewedBy: state.currentUserId
      });
      const toast = container.querySelector('#detail-toast');
      if (toast) { toast.textContent = `Status updated to ${newStatus}. (Local demo only.)`; toast.classList.remove('hidden'); }
      setTimeout(() => render(container, params, copy), 800);
    });
  });
}
