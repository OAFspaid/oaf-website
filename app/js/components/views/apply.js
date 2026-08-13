// Apply hub view
export function render(container, params, copy, state) {
  const screens = copy?.screens?.applications || {};
  const types = state?.seed?.applicationTypes || [];

  container.innerHTML = `
    <div class="view view-apply">
      <h1>${copy?.screens?.applyForm?.heading || 'Apply for Support'}</h1>
      <p class="view-intro">${copy?.screens?.applyForm?.intro || ''}</p>
      <div class="card-grid">
        ${types.map(t => `
          <a href="#/apply/${t.id}" class="card card--gold-rule card-link">
            <h3 class="micro-label">${t.title}</h3>
            <p>${t.blurb}</p>
            <span class="card-meta">~${t.estMinutes} min</span>
          </a>
        `).join('')}
      </div>
    </div>
  `;
}
