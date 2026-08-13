// Coach dashboard
import { getState } from '../../state.js';

export function render(container, params, copy) {
  const state = getState();
  const s = copy?.screens?.dashboard || {};
  const myTasks = (state?.tasks || []).filter(t => t.assigneeRole === 'coach' && t.status !== 'complete');
  const checkIns = (state?.checkIns || []).slice(-5);
  const notes = (state?.coachingNotes || []).length;

  container.innerHTML = `
    <div class="view view-dashboard">
      <div class="demo-banner" role="status">${copy?.demo?.notice || 'Demo data only.'}</div>
      <h1>${s.heading || 'Mission Overview'}</h1>
      <p class="view-greeting">${s.coachGreeting || "Ready when you are. Here's your queue."}</p>
      <div class="dashboard-grid">
        <a href="#/tasks" class="card card--gold-rule">
          <h2 class="micro-label">Tasks</h2>
          <p class="stat">${myTasks.length}</p>
          <p class="muted">Open</p>
        </a>
        <a href="#/check-ins" class="card card--gold-rule">
          <h2 class="micro-label">Recent Check-Ins</h2>
          <p class="stat">${checkIns.length}</p>
        </a>
        <a href="#/coaching" class="card card--gold-rule">
          <h2 class="micro-label">Coaching Notes</h2>
          <p class="stat">${notes}</p>
        </a>
      </div>
      <p class="crisis-footer-note">${s.noticeCrisis || 'If you are in crisis, do not wait. Call or text 988.'}</p>
    </div>
  `;
}
