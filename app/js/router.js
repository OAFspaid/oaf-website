// Hash-based router
import { getCurrentRole } from './state.js';

let routes = [];
let notFoundHandler = null;
let onNavigate = null;

const AUTH_ROUTES = [
  'dashboard', 'members', 'applications', 'care-packages',
  'tasks', 'check-ins', 'coaching', 'resources', 'retreats', 'impact', 'settings'
];

export function registerRoutes(routeMap, notFound, navigateCb) {
  routes = routeMap;
  notFoundHandler = notFound;
  onNavigate = navigateCb;
}

export function navigate(path) {
  window.location.hash = path.startsWith('#') ? path : '#' + path;
}

export function getCurrentRoute() {
  const hash = window.location.hash || '#/';
  return hash.slice(1) || '/';
}

function matchRoute(path) {
  for (const route of routes) {
    const params = matchPath(route.path, path);
    if (params !== null) return { route, params };
  }
  return null;
}

function matchPath(pattern, path) {
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = path.split('/').filter(Boolean);
  if (patternParts.length !== pathParts.length) return null;
  const params = {};
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      params[patternParts[i].slice(1)] = pathParts[i];
    } else if (patternParts[i] !== pathParts[i]) {
      return null;
    }
  }
  return params;
}

function isAuthRequired(path) {
  const firstSegment = path.split('/').filter(Boolean)[0];
  return AUTH_ROUTES.includes(firstSegment);
}

function handleRoute() {
  const path = getCurrentRoute();
  if (isAuthRequired(path) && !getCurrentRole()) {
    navigate('/login');
    return;
  }
  const match = matchRoute(path);
  if (match) {
    if (onNavigate) onNavigate(match.route, match.params);
  } else {
    if (notFoundHandler) notFoundHandler();
    if (onNavigate) onNavigate({ path, view: 'not-found' }, {});
  }
}

export function start() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}
