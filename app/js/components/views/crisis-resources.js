// Crisis resources full page view
import { getState } from '../../state.js';

export function render(container, params, copy) {
  const state = getState();
  const resources = state?.crisisResources || [];
  const s = copy?.screens?.crisis || {};

  container.innerHTML = `
    <div class="view view-crisis">
      <h1>${s.heading || 'Crisis Resources'}</h1>
      <p class="view-subtitle">${s.subheading || 'If you are in crisis, reach out now.'}</p>
      <p class="view-intro">${s.intro || ''}</p>
      <div class="crisis-resources-list">
        ${resources.map(r => `
          <div class="card card--crisis">
            <h2>${r.name}</h2>
            <p>${r.description}</p>
            <div class="crisis-actions">
              ${renderCrisisContact(r)}
              ${r.url ? `<a href="${r.url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">${s.visitLabel || 'Visit'}</a>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderCrisisContact(r) {
  const c = r.contact || '';
  if (c.includes('Call or text 988')) {
    return `<a href="tel:988" class="btn btn-danger">Call 988</a> <a href="sms:988" class="btn btn-outline">Text 988</a>`;
  }
  if (c.includes('988 and press 1')) {
    return `<a href="tel:988" class="btn btn-danger">Call 988 (press 1)</a> <a href="sms:838255" class="btn btn-outline">Text 838255</a>`;
  }
  if (c.includes('1-800-267-5463')) {
    return `<a href="tel:18002675463" class="btn btn-danger">Call 1-800-267-5463</a>`;
  }
  if (r.url) return '';
  return `<span>${c}</span>`;
}
