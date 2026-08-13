// State management — localStorage wrapper with graceful fallback
const STORAGE_KEY = 'oaf_os_demo_state';
let memoryFallback = null;
let storageAvailable = true;

function checkStorage() {
  try {
    const t = '__storage_test__';
    localStorage.setItem(t, t);
    localStorage.removeItem(t);
    return true;
  } catch (e) {
    return false;
  }
}

storageAvailable = checkStorage();

export function isStorageAvailable() {
  return storageAvailable;
}

export function getState() {
  if (!storageAvailable) return memoryFallback;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return memoryFallback;
  }
}

export function setState(state) {
  const updated = { ...state, _lastModified: new Date().toISOString() };
  if (storageAvailable) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      memoryFallback = updated;
    }
  } else {
    memoryFallback = updated;
  }
  return updated;
}

export function patchState(partial) {
  const current = getState() || {};
  return setState({ ...current, ...partial });
}

export function getCurrentRole() {
  const state = getState();
  return state ? state.currentRole : null;
}

export function getCurrentUserId() {
  const state = getState();
  return state ? state.currentUserId : null;
}

export function setCurrentRole(role, userId) {
  return patchState({ currentRole: role, currentUserId: userId || null });
}

export function addRecord(collection, record) {
  const state = getState();
  if (!state || !state[collection]) return null;
  state[collection] = [...state[collection], record];
  return setState(state);
}

export function updateRecord(collection, id, updates) {
  const state = getState();
  if (!state || !state[collection]) return null;
  state[collection] = state[collection].map(item =>
    item.id === id ? { ...item, ...updates } : item
  );
  return setState(state);
}

export function resetState(seedData) {
  const fresh = {
    _version: '1.0.0',
    _lastModified: new Date().toISOString(),
    currentRole: null,
    currentUserId: null,
    members: seedData.members || [],
    applications: seedData.applications || [],
    carePackages: seedData.carePackages || [],
    tasks: seedData.tasks || [],
    checkIns: seedData.checkIns || [],
    coachingNotes: seedData.coachingNotes || [],
    resources: seedData.resources || [],
    retreats: seedData.retreats || [],
    impactMetrics: seedData.impactMetrics || [],
    crisisResources: seedData.crisisResources || [],
  };
  return setState(fresh);
}

export function initState(seedData) {
  const existing = getState();
  if (existing && existing._version) return existing;
  return resetState(seedData);
}
