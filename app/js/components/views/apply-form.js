// Dynamic apply form view
import { addRecord, getState } from '../../state.js';

export function render(container, params, copy, seedStore) {
  const formType = params.type;
  const types = seedStore?.seed?.applicationTypes || [];
  const appType = types.find(t => t.id === formType);
  const screens = copy?.screens?.applyForm || {};

  if (!appType) {
    container.innerHTML = `<div class="view"><h1>Not Found</h1><p>Unknown application type.</p><a href="#/apply" class="btn btn-outline">Back to Apply</a><p class="crisis-footer-note" style="margin-top:1.5rem;">If you are in crisis, <a href="#/crisis-resources">Crisis Resources are here</a> — or call or text <a href="tel:988">988</a>.</p></div>`;
    return;
  }

  container.innerHTML = `
    <div class="view view-apply-form">
      <h1>${appType.title}</h1>
      <p class="view-intro">${appType.blurb}</p>
      <p class="required-notice">${screens.requiredNotice || 'Fields marked * are required.'}</p>
      <form id="apply-form" class="form" novalidate>
        ${appType.fields.map(field => renderField(field)).join('')}
        <div class="form-notice">
          <p class="crisis-notice">This is not an emergency service. If you are in crisis, tap <a href="#/crisis-resources">Crisis Resources</a> above.</p>
        </div>
        <div class="privacy-notice" role="note">
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span>${screens.localStorageNotice || 'Anything you enter here is saved only in this browser on this device — not sent to OAF. Anyone with access to this browser can see it. To remove it, reset demo data in Settings.'}</span>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">${screens.submitLabel || 'Submit Application'}</button>
          <a href="#/apply" class="btn btn-outline">${screens.cancelLabel || 'Cancel'}</a>
        </div>
      </form>
      <div id="form-toast" class="toast hidden" role="status" aria-live="polite"></div>
    </div>
  `;

  const form = container.querySelector('#apply-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm(form, appType.fields)) return;
    const formData = {};
    appType.fields.forEach(f => {
      if (f.type === 'checkbox') {
        formData[f.id] = form.querySelector(`#field-${f.id}`)?.checked || false;
      } else {
        formData[f.id] = form.querySelector(`#field-${f.id}`)?.value || '';
      }
    });
    const record = {
      id: crypto.randomUUID(),
      memberId: null,
      type: formType,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      reviewedAt: null,
      reviewedBy: null,
      notes: '',
      formData
    };
    addRecord('applications', record);
    const successKey = formType === 'care-package' ? 'carePackageSubmitted'
                     : formType === 'retreat'       ? 'retreatInterestSubmitted'
                     : 'applicationSubmitted';
    showToast(container, copy?.forms?.success?.[successKey] || copy?.forms?.success?.applicationSubmitted || 'Application submitted.');
    setTimeout(() => { window.location.hash = '#/applications'; }, 1500);
  });
}

function renderField(field) {
  const required = field.required ? 'required' : '';
  const requiredMark = field.required ? ' <span class="required-mark" aria-hidden="true">*</span>' : '';
  const errorId = `error-${field.id}`;
  let input = '';

  switch (field.type) {
    case 'text':
    case 'email':
    case 'tel':
      input = `<input type="${field.type}" id="field-${field.id}" name="${field.id}" ${required} aria-describedby="${errorId} help-${field.id}" class="form-input" />`;
      break;
    case 'textarea':
      input = `<textarea id="field-${field.id}" name="${field.id}" ${required} rows="4" aria-describedby="${errorId} help-${field.id}" class="form-input"></textarea>`;
      break;
    case 'select':
      input = `<select id="field-${field.id}" name="${field.id}" ${required} aria-describedby="${errorId} help-${field.id}" class="form-input">
        <option value="">— Select —</option>
        ${(field.options || []).map(o => `<option value="${o}">${o}</option>`).join('')}
      </select>`;
      break;
    case 'radio':
      input = `<fieldset class="radio-group" aria-describedby="${errorId} help-${field.id}">
        <legend class="sr-only">${field.label}</legend>
        ${(field.options || []).map((o, i) => `
          <label class="radio-label"><input type="radio" name="${field.id}" value="${o}" ${i === 0 ? '' : ''} ${required && i === 0 ? required : ''} /> ${o}</label>
        `).join('')}
      </fieldset>`;
      break;
    case 'checkbox':
      return `
        <div class="form-group form-group--checkbox">
          <label class="checkbox-label">
            <input type="checkbox" id="field-${field.id}" name="${field.id}" ${required} aria-describedby="${errorId}" />
            ${field.label}${requiredMark}
          </label>
          <span id="${errorId}" class="field-error hidden" role="alert"></span>
        </div>`;
    default:
      input = `<input type="text" id="field-${field.id}" name="${field.id}" ${required} aria-describedby="${errorId} help-${field.id}" class="form-input" />`;
  }

  return `
    <div class="form-group">
      <label for="field-${field.id}" class="form-label">${field.label}${requiredMark}</label>
      ${input}
      ${field.help ? `<span id="help-${field.id}" class="field-help">${field.help}</span>` : ''}
      <span id="${errorId}" class="field-error hidden" role="alert"></span>
    </div>`;
}

function validateForm(form, fields) {
  let valid = true;
  fields.forEach(f => {
    const errorEl = form.querySelector(`#error-${f.id}`);
    const inputEl = f.type === 'checkbox' ? form.querySelector(`#field-${f.id}`) :
                    f.type === 'radio' ? form.querySelector(`input[name="${f.id}"]`) :
                    form.querySelector(`#field-${f.id}`);
    if (!errorEl) return;
    errorEl.textContent = '';
    errorEl.classList.add('hidden');
    if (inputEl) inputEl.removeAttribute('aria-invalid');
    if (f.required) {
      let val;
      if (f.type === 'checkbox') {
        val = form.querySelector(`#field-${f.id}`)?.checked;
      } else if (f.type === 'radio') {
        val = form.querySelector(`input[name="${f.id}"]:checked`)?.value;
      } else {
        val = form.querySelector(`#field-${f.id}`)?.value?.trim();
      }
      if (!val) {
        errorEl.textContent = 'This field is required.';
        errorEl.classList.remove('hidden');
        if (inputEl) inputEl.setAttribute('aria-invalid', 'true');
        valid = false;
      }
    }
    if (f.type === 'email') {
      const v = form.querySelector(`#field-${f.id}`)?.value?.trim();
      if (v && !v.includes('@')) {
        errorEl.textContent = 'Enter a valid email address.';
        errorEl.classList.remove('hidden');
        if (inputEl) inputEl.setAttribute('aria-invalid', 'true');
        valid = false;
      }
    }
  });
  return valid;
}

function showToast(container, msg) {
  const toast = container.querySelector('#form-toast');
  if (toast) {
    toast.textContent = msg;
    toast.classList.remove('hidden');
  }
}
