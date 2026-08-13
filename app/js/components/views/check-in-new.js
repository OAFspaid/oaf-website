// New check-in form
import { addRecord, getCurrentUserId } from '../../state.js';

export function render(container, params, copy) {
  const s = copy?.screens?.checkIns || {};

  container.innerHTML = `
    <div class="view view-check-in-new">
      <h1>New Check-In</h1>
      <p class="view-intro">${s.intro || ''}</p>
      <p class="scale-note">${s.scaleNote || 'Rate mood and energy 1 (low) to 5 (high).'}</p>
      <form id="checkin-form" class="form" novalidate>
        <div class="form-group">
          <label for="mood" class="form-label">${s.moodLabel || 'Mood'} <span class="required-mark" aria-hidden="true">*</span></label>
          <input type="range" id="mood" name="mood" min="1" max="5" value="3" class="form-range" aria-describedby="error-mood" />
          <output for="mood" class="range-output">3</output>
          <span id="error-mood" class="field-error hidden" role="alert"></span>
        </div>
        <div class="form-group">
          <label for="energy" class="form-label">${s.energyLabel || 'Energy'} <span class="required-mark" aria-hidden="true">*</span></label>
          <input type="range" id="energy" name="energy" min="1" max="5" value="3" class="form-range" aria-describedby="error-energy" />
          <output for="energy" class="range-output">3</output>
          <span id="error-energy" class="field-error hidden" role="alert"></span>
        </div>
        <div class="form-group">
          <label for="sleep" class="form-label">${s.sleepLabel || 'Sleep (hours)'}</label>
          <input type="number" id="sleep" name="sleep" min="0" max="24" step="0.5" class="form-input" />
        </div>
        <div class="form-group">
          <label for="note" class="form-label">${s.noteLabel || 'Note'}</label>
          <textarea id="note" name="note" rows="3" class="form-input"></textarea>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">${s.submitLabel || 'Save check-in'}</button>
          <a href="#/check-ins" class="btn btn-outline">Cancel</a>
        </div>
        <div class="privacy-notice" role="note" style="margin-top:var(--app-space-md);">
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span>${copy?.screens?.applyForm?.localStorageNotice || 'Anything you enter here is saved only in this browser on this device — not sent to OAF. Anyone with access to this browser can see it. To remove it, reset demo data in Settings.'}</span>
        </div>
      </form>
      <div id="form-toast" class="toast hidden" role="status" aria-live="polite"></div>
    </div>
  `;

  // Range output sync
  container.querySelectorAll('input[type=range]').forEach(r => {
    const out = container.querySelector(`output[for="${r.id}"]`);
    r.addEventListener('input', () => { if (out) out.textContent = r.value; });
  });

  container.querySelector('#checkin-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const record = {
      id: crypto.randomUUID(),
      memberId: getCurrentUserId(),
      createdAt: new Date().toISOString(),
      mood: parseInt(container.querySelector('#mood').value),
      energy: parseInt(container.querySelector('#energy').value),
      sleep: parseFloat(container.querySelector('#sleep').value) || null,
      notes: container.querySelector('#note').value.trim(),
      pillars: { strength: false, mentalFortitude: false, mobility: false, nutrition: false }
    };
    addRecord('checkIns', record);
    const toast = container.querySelector('#form-toast');
    if (toast) { toast.textContent = (copy?.forms?.success?.checkInSaved || 'Check-in logged.') + ' (Saved to local demo — not submitted to OAF.)'; toast.classList.remove('hidden'); }
    setTimeout(() => { window.location.hash = '#/check-ins'; }, 1200);
  });
}
