// Home view
import { getCurrentRole } from '../../state.js';

export function render(container, params, copy) {
  const role = getCurrentRole();
  const mission = copy?.mission || {};
  const screens = copy?.screens?.dashboard || {};

  container.innerHTML = `
    <div class="view view-home">
      <h1>${mission.headline || 'OAF OS'}</h1>
      <section class="hero-section">
        <div class="safety-panel card card--gold-rule">
          <h2 class="micro-label">${mission.noShortcuts || 'No Shortcuts, Only Progress'}</h2>
          <p>${mission.noShortcutsDetail || ''}</p>
        </div>
      </section>
      <section class="how-it-works">
        <h2>${mission.howItWorksHeading || 'How It Works'}</h2>
        <ol class="steps-list">
          ${(mission.steps || []).map(s => `<li><span class="step-num">${s.number}</span> ${s.label}</li>`).join('')}
        </ol>
        <p class="muted">${mission.visibilityNote || ''}</p>
      </section>
      <section class="cta-section">
        ${!role ? `<a href="#/login" class="btn btn-primary">Explore the Demo</a>` : `<a href="#/dashboard" class="btn btn-primary">Go to Dashboard</a>`}
        <a href="#/apply" class="btn btn-outline">Apply for Support</a>
      </section>
    </div>
  `;
}
