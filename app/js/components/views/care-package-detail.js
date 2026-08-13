// Care package detail view with status advancement
import { getState, updateRecord, getCurrentRole } from '../../state.js';

const LIFECYCLE = ['requested', 'under_review', 'needs_info', 'approved', 'sourcing', 'packing', 'shipped', 'delivered', 'follow_up', 'closed'];

export function render(container, params, copy) {
  const state = getState();
  const pkg = (state?.carePackages || []).find(p => p.id === params.id);
  const role = getCurrentRole();
  const s = copy?.screens?.carePackageDetail || {};

  if (!pkg) {
    container.innerHTML = `<div class="view"><h1>Not Found</h1><p>Care package not found.</p><a href="#/care-packages" class="btn btn-outline">Back</a><p class="crisis-footer-note" style="margin-top:1.5rem;">If you are in crisis, <a href="#/crisis-resources">Crisis Resources are here</a> — or call or text <a href="tel:988">988</a>.</p></div>`;
    return;
  }

  const currentIdx = LIFECYCLE.indexOf(pkg.status);
  const nextStatus = (role === 'staff' && currentIdx >= 0 && currentIdx < LIFECYCLE.length - 1) ? LIFECYCLE[currentIdx + 1] : null;

  container.innerHTML = `
    <div class="view view-care-package-detail">
      <h1>${s.heading || 'Care Package Detail'}</h1>
      <div class="card">
        <dl class="detail-list">
          <dt>Description</dt><dd>${pkg.title || pkg.description || 'N/A'}</dd>
          <dt>Status</dt><dd><span class="badge badge--${pkg.status}">${pkg.status}</span></dd>
          <dt>Priority</dt><dd>${pkg.priority || 'standard'}</dd>
          <dt>Requested</dt><dd>${new Date(pkg.requestedAt).toLocaleDateString()}</dd>
        </dl>
        ${pkg.items?.length ? `<h3 class="micro-label">${s.itemsHeading || 'Items'}</h3><ul>${pkg.items.map(i => `<li>${i}</li>`).join('')}</ul>` : ''}
        <h3 class="micro-label">${s.historyHeading || 'Status History'}</h3>
        <ul class="status-history">
          ${(pkg.statusHistory || []).map(h => `<li><span class="badge badge--${h.status}">${h.status}</span> — ${new Date(h.at).toLocaleString()}</li>`).join('')}
        </ul>
        ${nextStatus ? `
          <div class="status-actions">
            <button class="btn btn-primary" id="advance-status">Advance to: ${nextStatus}</button>
          </div>
        ` : ''}
      </div>
      <div id="detail-toast" class="toast hidden" role="status" aria-live="polite"></div>
      <a href="#/care-packages" class="btn btn-outline">Back</a>
    </div>
  `;

  container.querySelector('#advance-status')?.addEventListener('click', () => {
    const history = [...(pkg.statusHistory || []), { status: nextStatus, at: new Date().toISOString(), by: state.currentUserId || 'staff' }];
    updateRecord('carePackages', pkg.id, { status: nextStatus, statusHistory: history });
    const toast = container.querySelector('#detail-toast');
    if (toast) { toast.textContent = `Advanced to ${nextStatus}. (Local demo only.)`; toast.classList.remove('hidden'); }
    setTimeout(() => render(container, params, copy), 800);
  });
}
