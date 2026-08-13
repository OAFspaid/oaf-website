// Tasks view with status toggle
import { getState, updateRecord, getCurrentRole } from '../../state.js';

const STATUSES = ['open', 'in-progress', 'complete'];

export function render(container, params, copy) {
  const state = getState();
  const s = copy?.screens?.tasks || {};
  const empty = copy?.empty?.tasks || {};
  const role = getCurrentRole();
  let tasks = state?.tasks || [];
  if (role === 'member') tasks = tasks.filter(t => t.assigneeRole === 'member');
  else if (role === 'coach') tasks = tasks.filter(t => t.assigneeRole === 'coach');

  container.innerHTML = `
    <div class="view view-tasks">
      <h1>${s.heading || 'Tasks'}</h1>
      <p class="view-intro">${s.intro || ''}</p>
      <div id="tasks-list"></div>
    </div>
  `;

  renderTasks(container, tasks, empty);
}

function renderTasks(container, tasks, empty) {
  const el = container.querySelector('#tasks-list');
  if (tasks.length === 0) {
    el.innerHTML = `<div class="empty-state"><h2>${empty.heading || 'Your queue is clear.'}</h2><p>${empty.body || ''}</p></div>`;
    return;
  }
  el.innerHTML = `
    <ul class="record-list">
      ${tasks.map(t => `
        <li class="record-item task-item">
          <div class="task-info">
            <span class="record-name"><a href="#/tasks/${t.id}" style="color:inherit;text-decoration:none;">${t.title}</a></span>
            <span class="badge badge--${t.status}">${t.status}</span>
            ${t.dueDate ? `<span class="record-meta">Due: ${new Date(t.dueDate).toLocaleDateString()}</span>` : ''}
          </div>
          <div class="task-actions">
            ${STATUSES.filter(s => s !== t.status).map(s => `<button class="btn btn-outline btn-xs" data-task="${t.id}" data-status="${s}">${s}</button>`).join('')}
          </div>
        </li>
      `).join('')}
    </ul>
  `;

  el.querySelectorAll('[data-task]').forEach(btn => {
    btn.addEventListener('click', () => {
      updateRecord('tasks', btn.dataset.task, { status: btn.dataset.status });
      // Re-render
      const state = getState();
      const role = getCurrentRole();
      let tasks = state?.tasks || [];
      if (role === 'member') tasks = tasks.filter(t => t.assigneeRole === 'member');
      else if (role === 'coach') tasks = tasks.filter(t => t.assigneeRole === 'coach');
      renderTasks(container, tasks, {});
    });
  });
}
