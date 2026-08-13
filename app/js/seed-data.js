// Fetches seed.json and copy.json at startup with graceful fallback
const FALLBACK_CRISIS = [
  { id: 'crisis-988', name: '988 Suicide & Crisis Lifeline', contact: 'Call or text 988', detail: 'Free, confidential, 24/7.', url: 'https://988lifeline.org/' },
  { id: 'crisis-vcl', name: 'Veterans Crisis Line', contact: 'Call 988 and press 1 — Text 838255', detail: 'For veterans, service members, and families.', url: 'https://www.veteranscrisisline.net/' }
];

export async function loadSeedData() {
  let seed = null;
  let copy = null;
  try {
    const [seedRes, copyRes] = await Promise.all([
      fetch('data/seed.json'),
      fetch('data/copy.json')
    ]);
    if (seedRes.ok) seed = await seedRes.json();
    if (copyRes.ok) copy = await copyRes.json();
  } catch (e) {
    console.warn('Failed to fetch seed/copy data:', e);
  }
  if (!seed) {
    seed = { crisisResources: FALLBACK_CRISIS, members: [], applications: [], carePackages: [], tasks: [], checkIns: [], coachingNotes: [], resources: [], retreats: [], impactMetrics: [] };
  }
  if (!copy) {
    copy = { app: { name: 'OAF OS' }, nav: {}, screens: {}, empty: {}, status: {}, errors: {}, demo: {}, mission: {}, a11y: {} };
  }
  return { seed, copy };
}
