// Crisis modal — accessible, focus-trapped, keyboard dismissible
import { getState } from '../state.js';

let previousFocus = null;
let trapListener = null;

export function openCrisisModal() {
  previousFocus = document.activeElement;
  const state = getState();
  const resources = state?.crisisResources || [];
  const overlay = document.createElement('div');
  overlay.id = 'crisis-modal-overlay';
  overlay.className = 'modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'crisis-modal-title');

  overlay.innerHTML = `
    <div class="modal-content crisis-modal">
      <div class="modal-header">
        <h2 id="crisis-modal-title">Crisis Resources</h2>
        <button class="modal-close" aria-label="Close" id="crisis-modal-close">&times;</button>
      </div>
      <div class="modal-body">
        <p class="crisis-intro">If you are in crisis, reach out now. These resources are free, confidential, and available around the clock.</p>
        <ul class="crisis-list">
          ${resources.map(r => `
            <li class="crisis-item">
              <strong>${r.name}</strong>
              <p>${r.description}</p>
              <div class="crisis-actions">
                ${renderContact(r)}
                ${r.url ? `<a href="${r.url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">Visit site</a>` : ''}
              </div>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  overlay.querySelector('#crisis-modal-close').focus();

  // Focus trap
  trapListener = (e) => {
    if (e.key === 'Escape') { closeCrisisModal(); return; }
    if (e.key !== 'Tab') return;
    const focusable = overlay.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  };
  document.addEventListener('keydown', trapListener);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeCrisisModal(); });
}

function renderContact(resource) {
  const contact = resource.contact || '';
  let html = '';
  // Parse phone numbers for tel: links
  const phoneMatch = contact.match(/(1-\d{3}-\d{3}-\d{4}|\d{3})/);
  if (contact.toLowerCase().includes('call or text 988')) {
    html += `<a href="tel:988" class="btn btn-danger">Call 988</a> <a href="sms:988" class="btn btn-outline">Text 988</a>`;
  } else if (contact.includes('988 and press 1')) {
    html += `<a href="tel:988" class="btn btn-danger">Call 988 (press 1)</a> <a href="sms:838255" class="btn btn-outline">Text 838255</a>`;
  } else if (contact.includes('1-800-267-5463')) {
    html += `<a href="tel:18002675463" class="btn btn-danger">Call 1-800-267-5463</a>`;
  } else if (contact.includes('qrfup')) {
    html += `<a href="${resource.url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">Visit qrfup.org</a>`;
  } else {
    html += `<span class="crisis-contact-text">${contact}</span>`;
  }
  return html;
}

export function closeCrisisModal() {
  const overlay = document.getElementById('crisis-modal-overlay');
  if (overlay) overlay.remove();
  if (trapListener) { document.removeEventListener('keydown', trapListener); trapListener = null; }
  if (previousFocus) { previousFocus.focus(); previousFocus = null; }
}
