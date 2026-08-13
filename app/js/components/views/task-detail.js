// Task detail view
import { getState, updateRecord } from '../../state.js';

const STATUSES = ['open', 'in-progress', 'complete'];

export function render(container, params, copy) {
  const state = getState();
  const task = (state?.tasks || []).find(t => t.id === params.id);
  const s = copy?.screens?.taskDetail || {};

  if (!task) {
    container.innerHTML = `<div class="view"><h1>Not Found</h1><p>Task not found.</p><a href="#/tasks" class="btn btn-outline">Back to Tasks</a><p class="crisis-footer-note" style="margin-top:1.5rem;">If you are in crisis, <a href="#/crisis-resources">Crisis Resources are here</a> — or call or text <a href="tel:988">988</a>.</p></div>`;
    return;
  }

  container.innerHTML = `
    <div class="view view-task-detail">
      <h1>${s.heading || 'Task Detail'}</h1>
      <div class="card">
        <dl class="detail-list">
          <dt>Title</dt><dd>${task.title}</dd>
          <dt>Status</dt><dd><span class="badge badge--${task.status}">${task.status}</span></dd>
          <dt>Assigned to</dt><dd>${task.assigneeRole || 'N/A'}</dd>
          ${task.dueDate ? `<dt>Due</dt><dd>${new Date(task.dueDate).toLocaleDateString()}</dd>` : ''}
          ${task.description ? `<dt>Details</dt><dd>${task.description}</dd>` : ''}
          ${task.relatedTo ? `<dt>Related</dt><dd>${task.relatedTo}</dd>` : ''}
        </dl>
        <div class="status-actions">
          <p class="micro-label">Change status</p>
          <div class="btn-group">
            ${STATUSES.filter(s => s !== task.status).map(s => `<button class="btn btn-outline btn-sm" data-status="${s}">${s}</button>`).join('')}
          </div>
        </div>
      </div>
      <div id="detail-toast" class="toast hidden" role="status" aria-live="polite"></div>
      <a href="#/tasks" class="btn btn-outline">Back to Tasks</a>
    </div>
  `;

  container.querySelectorAll('[data-status]').forEach(btn => {
    btn.addEventListener('click', () => {
      updateRecord('tasks', task.id, { status: btn.dataset.status });
      const toast = container.querySelector('#detail-toast');
      if (toast) { toast.textContent = `Status updated to ${btn.dataset.status}. (Local demo only.)`; toast.classList.remove('hidden'); }
      setTimeout(() => render(container, params, copy), 800);
    });
  });
}
