// Staff dashboard
import { getState } from '../../state.js';

export function render(container, params, copy) {
  const state = getState();
  const s = copy?.screens?.dashboard || {};
  const pendingApps = (state?.applications || []).filter(a => a.status === 'submitted' || a.status === 'under-review');
  const activePkgs = (state?.carePackages || []).filter(p => !['follow-up-complete','delivered'].includes(p.status));
  const openTasks = (state?.tasks || []).filter(t => t.status !== 'complete');
  const memberCount = (state?.members || []).length;

  container.innerHTML = `
    <div class="view view-dashboard">
      <div class="demo-banner" role="status">${copy?.demo?.notice || 'Demo data only.'}</div>
      <h1>${s.heading || 'Mission Overview'}</h1>
      <p class="view-greeting">${s.staffGreeting || "Good to have you. Here's what needs attention."}</p>
      <div class="dashboard-grid">
        <a href="#/applications" class="card card--gold-rule">
          <h2 class="micro-label">Pending Applications</h2>
          <p class="stat">${pendingApps.length}</p>
        </a>
        <a href="#/care-packages" class="card card--gold-rule">
          <h2 class="micro-label">Active Care Packages</h2>
          <p class="stat">${activePkgs.length}</p>
        </a>
        <a href="#/tasks" class="card card--gold-rule">
          <h2 class="micro-label">Open Tasks</h2>
          <p class="stat">${openTasks.length}</p>
        </a>
        <a href="#/members" class="card card--gold-rule">
          <h2 class="micro-label">Members</h2>
          <p class="stat">${memberCount}</p>
        </a>
      </div>
      <p class="crisis-footer-note">${s.noticeCrisis || 'If you are in crisis, do not wait. Call or text 988.'}</p>
    </div>
  `;
}
