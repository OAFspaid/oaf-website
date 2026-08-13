// Login / role picker view
import { setCurrentRole, resetState, getState } from '../../state.js';
import { navigate } from '../../router.js';

export function render(container, params, copy, seedStore) {
  const s = copy?.screens?.rolePicker || {};
  const demo = copy?.demo || {};
  const roles = seedStore?.seed?.roles || [];

  container.innerHTML = `
    <div class="view view-login">
      <h1>${demo.rolePickerHeading || 'OAF OS Alpha Preview'}</h1>
      <p class="view-subtitle">${s.subheading || ''}</p>
      <p class="view-intro">${demo.rolePickerBody || s.intro || ''}</p>
      <div class="role-picker">
        ${roles.map(r => `
          <button class="card card--gold-rule role-card" data-role="${r.id}">
            <div class="role-card-avatar"><span class="avatar">${r.persona.initials}</span></div>
            <h2>${r.label}</h2>
            <p class="role-description">${r.description}</p>
            <p class="role-persona muted">${r.persona.displayName} — ${r.persona.unit}</p>
            <span class="btn btn-primary btn-sm">${s.selectLabel || 'Enter as'} ${r.label}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('[data-role]').forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.dataset.role;
      const roleData = roles.find(r => r.id === role);
      setCurrentRole(role, roleData?.persona?.displayName || role);
      navigate('/dashboard');
    });
  });
}
