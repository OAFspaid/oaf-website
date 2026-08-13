// Member dashboard
import { getState, getCurrentRole } from '../../state.js';

export function render(container, params, copy) {
  const state = getState();
  const s = copy?.screens?.dashboard || {};
  const myApps = (state?.applications || []).filter(a => a.status === 'submitted' || a.status === 'under-review');
  const myPackages = (state?.carePackages || []).filter(p => p.status !== 'follow-up-complete');
  const myTasks = (state?.tasks || []).filter(t => t.assigneeRole === 'member' && t.status !== 'complete');
  const recentCheckIns = (state?.checkIns || []).slice(-3);

  container.innerHTML = `
    <div class="view view-dashboard">
      <div class="demo-banner" role="status">${copy?.demo?.notice || 'Demo Mode — changes are stored locally on this device only and are not sent to OAF servers.'}</div>
      <h1>${s.heading || 'Mission Overview'}</h1>
      <p class="view-greeting">${s.memberGreeting || "You're in. Let's keep moving."}</p>
      <div class="dashboard-grid">
        <a href="#/applications" class="card card--gold-rule">
          <h2 class="micro-label">Applications</h2>
          <p class="stat">${myApps.length}</p>
          <p class="muted">Active</p>
        </a>
        <a href="#/care-packages" class="card card--gold-rule">
          <h2 class="micro-label">Care Packages</h2>
          <p class="stat">${myPackages.length}</p>
          <p class="muted">In progress</p>
        </a>
        <a href="#/tasks" class="card card--gold-rule">
          <h2 class="micro-label">Tasks</h2>
          <p class="stat">${myTasks.length}</p>
          <p class="muted">Open</p>
        </a>
        <a href="#/check-ins" class="card card--gold-rule">
          <h2 class="micro-label">Check-Ins</h2>
          <p class="stat">${recentCheckIns.length}</p>
          <p class="muted">Recent</p>
        </a>
      </div>
      <p class="crisis-footer-note">${s.noticeCrisis || 'If you are in crisis, do not wait. Call or text 988.'}</p>
    </div>
  `;
}
