// Coaching notes view
import { getState, getCurrentRole, addRecord } from '../../state.js';

export function render(container, params, copy) {
  const state = getState();
  const s = copy?.screens?.coaching || {};
  const empty = copy?.empty?.coaching || {};
  const role = getCurrentRole();
  const notes = state?.coachingNotes || [];

  container.innerHTML = `
    <div class="view view-coaching">
      <h1>${s.heading || 'Coaching Notes'}</h1>
      <p class="view-intro">${s.intro || ''}</p>
      <p class="safety-note">Coaching notes are operational, not clinical records.</p>
      ${role === 'coach' ? `<button class="btn btn-primary" id="add-note-btn">${s.newNoteLabel || 'Add coaching note'}</button>` : ''}
      ${notes.length === 0 ? `
        <div class="empty-state"><h2>${empty.heading || 'No coaching notes yet.'}</h2><p>${empty.body || ''}</p></div>
      ` : `
        <ul class="record-list">
          ${notes.map(n => `
            <li class="record-item">
              <a href="#/coaching/${n.id}" class="record-link">
                <span class="record-name">${n.content?.substring(0, 60) || 'Note'}...</span>
                <span class="record-meta">${new Date(n.createdAt).toLocaleDateString()}</span>
                <span class="badge">${n.visibility}</span>
              </a>
            </li>
          `).join('')}
        </ul>
      `}
      <div id="note-form-area"></div>
      <div id="form-toast" class="toast hidden" role="status" aria-live="polite"></div>
    </div>
  `;

  container.querySelector('#add-note-btn')?.addEventListener('click', () => {
    const area = container.querySelector('#note-form-area');
    area.innerHTML = `
      <form id="coaching-form" class="form">
        <div class="form-group">
          <label for="note-content" class="form-label">Note <span class="required-mark">*</span></label>
          <textarea id="note-content" rows="4" required class="form-input" aria-describedby="error-note"></textarea>
          <span id="error-note" class="field-error hidden" role="alert"></span>
        </div>
        <div class="form-group">
          <label for="note-visibility" class="form-label">Visibility</label>
          <select id="note-visibility" class="form-input">
            <option value="member-visible">Member-visible</option>
            <option value="coach-only">Coach-only</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
      </form>
    `;
    area.querySelector('#coaching-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const content = area.querySelector('#note-content').value.trim();
      if (!content) { area.querySelector('#error-note').textContent = 'Required.'; area.querySelector('#error-note').classList.remove('hidden'); area.querySelector('#note-content').setAttribute('aria-invalid', 'true'); return; }
      addRecord('coachingNotes', {
        id: crypto.randomUUID(),
        coachId: state.currentUserId || 'coach',
        memberId: null,
        createdAt: new Date().toISOString(),
        content,
        visibility: area.querySelector('#note-visibility').value
      });
      const toast = container.querySelector('#form-toast');
      if (toast) { toast.textContent = (copy?.forms?.success?.coachingNoteSaved || 'Note saved.') + ' (Local demo only.)'; toast.classList.remove('hidden'); }
      setTimeout(() => render(container, params, copy), 800);
    });
  });
}
