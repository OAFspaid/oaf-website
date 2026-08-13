// Coaching note detail view
import { getState } from '../../state.js';

export function render(container, params, copy) {
  const state = getState();
  const note = (state?.coachingNotes || []).find(n => n.id === params.id);
  const s = copy?.screens?.coachingDetail || {};

  if (!note) {
    container.innerHTML = `<div class="view"><h1>Not Found</h1><p>Coaching note not found.</p><a href="#/coaching" class="btn btn-outline">Back to Coaching</a><p class="crisis-footer-note" style="margin-top:1.5rem;">If you are in crisis, <a href="#/crisis-resources">Crisis Resources are here</a> — or call or text <a href="tel:988">988</a>.</p></div>`;
    return;
  }

  container.innerHTML = `
    <div class="view view-coaching-detail">
      <h1>${s.heading || 'Coaching Note'}</h1>
      <div class="card">
        <dl class="detail-list">
          ${note.subject ? `<dt>Subject</dt><dd>${note.subject}</dd>` : ''}
          <dt>Date</dt><dd>${new Date(note.createdAt).toLocaleDateString()}</dd>
          <dt>Author</dt><dd>${note.author || note.coachId || 'Coach'}</dd>
          <dt>Visibility</dt><dd><span class="badge">${note.visibility || 'coach-only'}</span></dd>
        </dl>
        <div style="margin-top:var(--app-space-md);">
          <p>${note.content}</p>
        </div>
      </div>
      <a href="#/coaching" class="btn btn-outline">Back to Coaching</a>
    </div>
  `;
}
