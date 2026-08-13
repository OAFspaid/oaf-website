// Role-aware navigation
import { getCurrentRole } from '../state.js';
import { getCurrentRoute } from '../router.js';

const PUBLIC_LINKS = [
  { path: '/', label: 'Home', icon: 'home' },
  { path: '/apply', label: 'Apply', icon: 'clipboard' },
  { path: '/sponsor', label: 'Sponsor', icon: 'heart' },
  { path: '/crisis-resources', label: 'Crisis Resources', icon: 'alert' },
];

const MEMBER_LINKS = [
  { path: '/dashboard/member', label: 'Dashboard', icon: 'layout' },
  { path: '/applications', label: 'Applications', icon: 'clipboard' },
  { path: '/care-packages', label: 'Care Packages', icon: 'package' },
  { path: '/tasks', label: 'Tasks', icon: 'check-square' },
  { path: '/check-ins', label: 'Check-Ins', icon: 'activity' },
  { path: '/coaching', label: 'Coaching', icon: 'users' },
  { path: '/resources', label: 'Resources', icon: 'book' },
  { path: '/settings', label: 'Settings', icon: 'settings' },
];

const STAFF_LINKS = [
  { path: '/dashboard/staff', label: 'Dashboard', icon: 'layout' },
  { path: '/members', label: 'Members', icon: 'users' },
  { path: '/applications', label: 'Applications', icon: 'clipboard' },
  { path: '/care-packages', label: 'Care Packages', icon: 'package' },
  { path: '/tasks', label: 'Tasks', icon: 'check-square' },
  { path: '/retreats', label: 'Retreats', icon: 'map' },
  { path: '/impact', label: 'Impact', icon: 'bar-chart' },
  { path: '/resources', label: 'Resources', icon: 'book' },
  { path: '/settings', label: 'Settings', icon: 'settings' },
];

const COACH_LINKS = [
  { path: '/dashboard/coach', label: 'Dashboard', icon: 'layout' },
  { path: '/members', label: 'Members', icon: 'users' },
  { path: '/tasks', label: 'Tasks', icon: 'check-square' },
  { path: '/check-ins', label: 'Check-Ins', icon: 'activity' },
  { path: '/coaching', label: 'Coaching', icon: 'users' },
  { path: '/resources', label: 'Resources', icon: 'book' },
  { path: '/settings', label: 'Settings', icon: 'settings' },
];

function getLinks() {
  const role = getCurrentRole();
  switch (role) {
    case 'member': return MEMBER_LINKS;
    case 'staff': return STAFF_LINKS;
    case 'coach': return COACH_LINKS;
    default: return PUBLIC_LINKS;
  }
}

export function renderNav(container, copy, isOpen) {
  const links = getLinks();
  const currentPath = getCurrentRoute();
  const role = getCurrentRole();
  const openClass = isOpen ? 'nav-open' : '';

  // Mi-06: set inert on main when mobile nav is open
  const mainEl = document.getElementById('main-content');
  if (mainEl) {
    if (isOpen && window.innerWidth < 768) mainEl.setAttribute('inert', '');
    else mainEl.removeAttribute('inert');
  }

  container.innerHTML = `
    <nav class="app-nav ${openClass}" id="app-nav" aria-label="Main navigation">
      <ul class="nav-list">
        ${links.map(link => {
          const active = currentPath === link.path || currentPath.startsWith(link.path + '/');
          return `<li><a href="#${link.path}" class="nav-link ${active ? 'active' : ''}" ${active ? 'aria-current="page"' : ''}>${link.label}</a></li>`;
        }).join('')}
        ${role ? `<li><a href="#/login" class="nav-link nav-link--logout">${copy?.nav?.logout || 'Sign Out'}</a></li>` : `<li><a href="#/login" class="nav-link">Sign In</a></li>`}
      </ul>
      <div class="nav-footer">
        <a href="#/crisis-resources" class="nav-crisis-link">${copy?.nav?.crisis || 'Crisis Resources'}</a>
      </div>
    </nav>
  `;
}
