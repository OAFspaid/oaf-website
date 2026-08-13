// Main application entry point
import { initState, getState, getCurrentRole, isStorageAvailable } from './state.js';
import { registerRoutes, navigate, start, getCurrentRoute } from './router.js';
import { loadSeedData } from './seed-data.js';
import { renderHeader } from './components/header.js';
import { renderNav } from './components/nav.js';
import { renderSafetyBanner } from './components/safety-banner.js';
import { openCrisisModal } from './components/crisis-modal.js';

// View imports
import { render as renderHome } from './components/views/home.js';
import { render as renderApply } from './components/views/apply.js';
import { render as renderApplyForm } from './components/views/apply-form.js';
import { render as renderSponsor } from './components/views/sponsor.js';
import { render as renderCrisis } from './components/views/crisis-resources.js';
import { render as renderLogin } from './components/views/login.js';
import { render as renderDashMember } from './components/views/dashboard-member.js';
import { render as renderDashStaff } from './components/views/dashboard-staff.js';
import { render as renderDashCoach } from './components/views/dashboard-coach.js';
import { render as renderMembers } from './components/views/members.js';
import { render as renderMemberDetail } from './components/views/member-detail.js';
import { render as renderApplications } from './components/views/applications.js';
import { render as renderAppDetail } from './components/views/application-detail.js';
import { render as renderCarePackages } from './components/views/care-packages.js';
import { render as renderCarePackageDetail } from './components/views/care-package-detail.js';
import { render as renderTasks } from './components/views/tasks.js';
import { render as renderTaskDetail } from './components/views/task-detail.js';
import { render as renderCheckIns } from './components/views/check-ins.js';
import { render as renderCheckInNew } from './components/views/check-in-new.js';
import { render as renderCoaching } from './components/views/coaching.js';
import { render as renderCoachingDetail } from './components/views/coaching-detail.js';
import { render as renderResources } from './components/views/resources.js';
import { render as renderRetreats } from './components/views/retreats.js';
import { render as renderImpact } from './components/views/impact.js';
import { render as renderSettings } from './components/views/settings.js';
import { render as renderNotFound } from './components/views/not-found.js';

let copy = {};
let seedStore = {};
let navOpen = false;

const ROUTES = [
  { path: '/', view: 'home' },
  { path: '/apply', view: 'apply' },
  { path: '/apply/:type', view: 'apply-form' },
  { path: '/sponsor', view: 'sponsor' },
  { path: '/crisis-resources', view: 'crisis-resources' },
  { path: '/login', view: 'login' },
  { path: '/dashboard', view: 'dashboard-redirect' },
  { path: '/dashboard/member', view: 'dashboard-member' },
  { path: '/dashboard/staff', view: 'dashboard-staff' },
  { path: '/dashboard/coach', view: 'dashboard-coach' },
  { path: '/members', view: 'members' },
  { path: '/members/:id', view: 'member-detail' },
  { path: '/applications', view: 'applications' },
  { path: '/applications/:id', view: 'application-detail' },
  { path: '/care-packages', view: 'care-packages' },
  { path: '/care-packages/:id', view: 'care-package-detail' },
  { path: '/tasks', view: 'tasks' },
  { path: '/tasks/:id', view: 'task-detail' },
  { path: '/check-ins', view: 'check-ins' },
  { path: '/check-ins/new', view: 'check-in-new' },
  { path: '/coaching', view: 'coaching' },
  { path: '/coaching/:id', view: 'coaching-detail' },
  { path: '/resources', view: 'resources' },
  { path: '/retreats', view: 'retreats' },
  { path: '/impact', view: 'impact' },
  { path: '/settings', view: 'settings' },
];

const VIEW_MAP = {
  'home': renderHome,
  'apply': renderApply,
  'apply-form': renderApplyForm,
  'sponsor': renderSponsor,
  'crisis-resources': renderCrisis,
  'login': renderLogin,
  'dashboard-member': renderDashMember,
  'dashboard-staff': renderDashStaff,
  'dashboard-coach': renderDashCoach,
  'members': renderMembers,
  'member-detail': renderMemberDetail,
  'applications': renderApplications,
  'application-detail': renderAppDetail,
  'care-packages': renderCarePackages,
  'care-package-detail': renderCarePackageDetail,
  'tasks': renderTasks,
  'task-detail': renderTaskDetail,
  'check-ins': renderCheckIns,
  'check-in-new': renderCheckInNew,
  'coaching': renderCoaching,
  'coaching-detail': renderCoachingDetail,
  'resources': renderResources,
  'retreats': renderRetreats,
  'impact': renderImpact,
  'settings': renderSettings,
  'not-found': renderNotFound,
};

function renderShell() {
  const headerEl = document.getElementById('app-header');
  const navEl = document.getElementById('app-nav');
  const footerEl = document.getElementById('app-footer');
  renderHeader(headerEl, copy, openCrisisModal, toggleNav, navOpen);
  renderNav(navEl, copy, navOpen);
  renderSafetyBanner(footerEl, copy);
}

function toggleNav() {
  navOpen = !navOpen;
  const navEl = document.getElementById('app-nav');
  renderNav(navEl, copy, navOpen);
}

function onNavigate(route, params) {
  // Dashboard redirect
  if (route.view === 'dashboard-redirect') {
    const role = getCurrentRole();
    navigate(`/dashboard/${role || 'member'}`);
    return;
  }

  const mainEl = document.getElementById('main-content');
  const liveRegion = document.getElementById('route-announcer');
  const viewFn = VIEW_MAP[route.view];

  if (viewFn) {
    mainEl.innerHTML = '<div class="loading-state" role="status"><p>Loading…</p></div>';
    try {
      viewFn(mainEl, params, copy, seedStore);
    } catch (e) {
      console.error('View render error:', e);
      mainEl.innerHTML = `<div class="error-state" role="alert"><h1>Error</h1><p>${copy?.errors?.generic || 'Something went wrong.'}</p><p class="crisis-footer-note" style="margin-top:1rem;">If you are in crisis, <a href="#/crisis-resources">Crisis Resources</a> — or call or text <a href="tel:988">988</a>.</p></div>`;
    }
  } else {
    renderNotFound(mainEl, params, copy);
  }

  // Focus management & announcement
  const heading = mainEl.querySelector('h1');
  if (heading) {
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: false });
    if (liveRegion) liveRegion.textContent = heading.textContent;
  }

  // Re-render nav to update active state
  renderShell();
  navOpen = false;
}

// Offline indicator
function updateOnlineStatus() {
  const indicator = document.getElementById('offline-indicator');
  if (!navigator.onLine) {
    indicator.textContent = copy?.offline?.heading || "You're offline.";
    indicator.classList.remove('hidden');
  } else {
    indicator.classList.add('hidden');
  }
}

async function init() {
  // Show loading
  const mainEl = document.getElementById('main-content');
  mainEl.innerHTML = '<div class="loading-state" role="status"><p>Loading OAF OS…</p></div>';

  // Load data
  const data = await loadSeedData();
  copy = data.copy;
  seedStore = data;

  // Initialize state
  initState(data.seed);

  // Storage warning
  if (!isStorageAvailable()) {
    const warning = document.createElement('div');
    warning.className = 'storage-warning';
    warning.setAttribute('role', 'alert');
    warning.textContent = 'Storage unavailable (private browsing?). Data will not persist after closing this tab.';
    document.getElementById('app-header').after(warning);
  }

  // Register routes and start
  registerRoutes(ROUTES, () => renderNotFound(mainEl, {}, copy), onNavigate);
  renderShell();
  start();

  // Online/offline listeners
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus();
}

init();
