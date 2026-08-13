# OAF OS — Progressive Web App Alpha Architecture

> **Status:** Architecture specification (no implementation code)
> **Author:** Danny (Lead), 2026-08-11
> **Audience:** Rusty (UI implementation), Basher (PWA infra + deployment)

---

## 1. Inferred Alpha Scope

### In scope (alpha)

| Feature | Evidence |
|---------|----------|
| Public landing / marketing view (app-specific) | `/` exists with OAF OS positioning copy |
| Apply intake — four paths (remote training, in-person, care package, retreat) | `/apply` + sub-routes confirmed |
| Role-based demo dashboards (Member, Staff, Coach) | Login page references role-based dashboards |
| Care package lifecycle (request → review → fulfillment → follow-up) | Cards on homepage + care-package intake form |
| Member support view (status, coaching, tasks, resources) | Homepage card copy |
| Sponsorship info page | `/sponsor` confirmed |
| Crisis resources (always-accessible) | `/crisis-resources` confirmed |
| Login/role-select screen (demo, no real auth) | `/login` confirmed; alpha uses fake role picker |

### Explicitly deferred (not alpha)

| Feature | Reason |
|---------|--------|
| Real authentication / OAuth / credential storage | Constraint #1 — static only |
| Server-persisted data, real Stripe integration | No backend; sponsor page is informational only |
| `/donate` page (separate from sponsorship) | Low alpha priority; can redirect to external |
| Blog / news within the app | Belongs to marketing site |
| Board-level reporting dashboard | Insufficient preview evidence; complex scope |
| Retreat scheduling/calendar | Only intake interest form is evidenced |
| Push notifications | Requires backend; deferred |
| Multi-language / i18n | No evidence of need in alpha |

---

## 2. Role Model

The alpha demonstrates **three roles**:

| Role | Justification |
|------|---------------|
| **Member** | Primary beneficiary. Sees own profile, application status, care packages, tasks, coaching notes, resources, check-ins. |
| **Staff** | Operational backbone. Sees all members, intake queue, care package pipeline, task assignments, impact metrics. |
| **Coach** | Focused support. Sees assigned members, coaching notes, check-ins, tasks for their caseload. |

**Login screen behavior:** A clearly-labeled demo role picker with three buttons. No credentials. A banner reads: _"Demo Mode — no real data is saved. Select a role to explore."_

---

## 3. Route Map

### Routing decision: **Hash-based routing (`#/path`)**

**Rationale:** GitHub Pages serves static files with no SPA URL rewrite. Path-based routing would 404 on direct navigation or refresh. Hash routing works natively with static hosting, requires zero server config, and is appropriate for an alpha.

### Routes

```
#/                          → App landing / home (public)
#/apply                     → Intake hub (four paths)
#/apply/remote-training     → Remote training intake form
#/apply/in-person-training  → In-person training intake form
#/apply/care-package        → Care package request form
#/apply/retreat             → Retreat interest form
#/sponsor                   → Sponsorship info (links to Stripe externally)
#/crisis-resources          → Crisis resources (always accessible)
#/login                     → Demo role picker

# Authenticated (role-gated) routes:
#/dashboard                 → Role-appropriate dashboard (redirects by role)
#/dashboard/member          → Member dashboard
#/dashboard/staff           → Staff dashboard
#/dashboard/coach           → Coach dashboard

#/members                   → Member directory (Staff, Coach)
#/members/:id               → Member detail (Staff, Coach) / own profile (Member)

#/applications              → Application queue (Staff)
#/applications/:id          → Application detail

#/care-packages             → Care package pipeline (Staff)
#/care-packages/:id         → Care package detail

#/tasks                     → Task list (role-filtered)
#/tasks/:id                 → Task detail

#/check-ins                 → Check-in history (Member own; Coach for caseload)
#/check-ins/new             → New check-in form

#/coaching                  → Coaching notes (Coach writes; Member reads own)
#/coaching/:id              → Coaching note detail

#/resources                 → Resource library
#/retreats                  → Retreat roster/interest list (Staff)
#/impact                    → Impact metrics (Staff)
#/settings                  → Demo settings (reset data, switch role)
```

---

## 4. Data Model

All data stored as JSON in `localStorage` under key `oaf_os_demo_state`.

### 4.1 Member Profile

```json
{
  "id": "string (uuid)",
  "firstName": "string",
  "lastName": "string",
  "role": "member",
  "branch": "string (military branch or 'first-responder')",
  "joinedAt": "ISO-8601 date",
  "status": "active | inactive | pending",
  "assignedCoachId": "string | null",
  "email": "string (fake)",
  "phone": "string (fake)"
}
```

### 4.2 Application / Intake Submission

```json
{
  "id": "string (uuid)",
  "memberId": "string | null (linked after approval)",
  "type": "remote-training | in-person-training | care-package | retreat",
  "status": "submitted | under-review | approved | declined | withdrawn",
  "submittedAt": "ISO-8601",
  "reviewedAt": "ISO-8601 | null",
  "reviewedBy": "string (staff id) | null",
  "notes": "string",
  "formData": { }
}
```

**Application state machine:**
```
submitted → under-review → approved
                         → declined
submitted → withdrawn
under-review → withdrawn
```

### 4.3 Care Package Request

```json
{
  "id": "string (uuid)",
  "memberId": "string",
  "applicationId": "string",
  "status": "requested | reviewing | approved | packing | shipped | delivered | follow-up-scheduled | follow-up-complete",
  "requestedAt": "ISO-8601",
  "description": "string (plain language request)",
  "items": ["string"],
  "priority": "standard | urgent",
  "assignedStaffId": "string | null",
  "statusHistory": [
    { "status": "string", "at": "ISO-8601", "by": "string" }
  ],
  "followUpDate": "ISO-8601 | null",
  "followUpNotes": "string | null"
}
```

**Care package state machine:**
```
requested → reviewing → approved → packing → shipped → delivered → follow-up-scheduled → follow-up-complete
                      → declined (terminal)
requested → withdrawn (terminal)
```

### 4.4 Task

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "assigneeId": "string",
  "assigneeRole": "staff | coach | member",
  "relatedEntityType": "care-package | application | check-in | retreat | null",
  "relatedEntityId": "string | null",
  "status": "open | in-progress | complete",
  "dueDate": "ISO-8601 | null",
  "createdAt": "ISO-8601"
}
```

### 4.5 Check-In

```json
{
  "id": "string",
  "memberId": "string",
  "createdAt": "ISO-8601",
  "mood": "1-5 integer",
  "notes": "string",
  "pillars": {
    "strength": "boolean",
    "mentalFortitude": "boolean",
    "mobility": "boolean",
    "nutrition": "boolean"
  }
}
```

### 4.6 Coaching Note

```json
{
  "id": "string",
  "coachId": "string",
  "memberId": "string",
  "createdAt": "ISO-8601",
  "content": "string",
  "visibility": "coach-only | member-visible"
}
```

### 4.7 Resource

```json
{
  "id": "string",
  "title": "string",
  "category": "strength | mental-fortitude | mobility | nutrition | general",
  "url": "string | null",
  "description": "string",
  "audienceRoles": ["member", "staff", "coach"]
}
```

### 4.8 Retreat

```json
{
  "id": "string",
  "name": "string",
  "date": "ISO-8601",
  "location": "string",
  "capacity": "number",
  "interestedMemberIds": ["string"],
  "status": "planning | open | full | completed"
}
```

### 4.9 Impact Metric

```json
{
  "id": "string",
  "label": "string",
  "value": "number",
  "unit": "string",
  "period": "string (e.g. '2026-Q3')",
  "category": "care-packages | coaching | retreats | training"
}
```

---

## 5. Seed Data Plan

### Personas (all fictional)

| ID | Name | Role | Notes |
|----|------|------|-------|
| m-001 | Alex Rivera | Member | Army vet, active, remote training, 2 care packages (delivered, follow-up-complete) |
| m-002 | Jordan Lee | Member | First responder, active, in-person training, 1 care package (shipped) |
| m-003 | Sam Okoro | Member | Marine vet, pending application (retreat), no care packages yet |
| m-004 | Casey Nguyen | Member | Navy vet, active, assigned coach, 3 check-ins logged |
| m-005 | Morgan Blake | Member | Firefighter, active, care package in "reviewing" state |
| s-001 | Taylor Marsh | Staff | Manages care package pipeline |
| s-002 | Drew Patel | Staff | Reviews applications |
| c-001 | Jamie Wolfe | Coach | Assigned to m-001, m-004 |
| c-002 | Riley Santos | Coach | Assigned to m-002 |

### Seed counts

- **Members:** 5
- **Applications:** 6 (various statuses: 2 approved, 1 under-review, 1 submitted, 1 declined, 1 withdrawn)
- **Care packages:** 4 (statuses: follow-up-complete, shipped, reviewing, requested)
- **Tasks:** 8 (mix of open/in-progress/complete)
- **Check-ins:** 12 (spread across members)
- **Coaching notes:** 6
- **Resources:** 10 (at least 2 per pillar)
- **Retreats:** 2 (1 planning, 1 completed)
- **Impact metrics:** 8

### Reset behavior

A "Reset Demo Data" button in `#/settings` wipes `localStorage` key and reloads seed data from a bundled JSON file.

---

## 6. File/Folder Layout

```
app/                              ← Top-level directory; served as static files
├── index.html                    ← SPA shell (single entry point)
├── manifest.json                 ← PWA manifest
├── sw.js                         ← Service worker
├── offline.html                  ← Offline fallback page
├── favicon.ico                   ← App favicon
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-maskable-192.png
│   └── icon-maskable-512.png
├── css/
│   └── app.css                   ← All app styles (design tokens + components)
├── js/
│   ├── app.js                    ← Main application (router, views, state)
│   ├── router.js                 ← Hash-based router
│   ├── state.js                  ← State management (localStorage wrapper)
│   ├── seed-data.js              ← Bundled seed/demo data
│   └── components/
│       ├── header.js             ← App header with crisis-resources link
│       ├── nav.js                ← Role-aware navigation
│       ├── safety-banner.js      ← Non-clinical disclaimer banner
│       ├── crisis-modal.js       ← Crisis resources modal (accessible anywhere)
│       └── views/
│           ├── home.js
│           ├── apply.js
│           ├── apply-form.js
│           ├── sponsor.js
│           ├── crisis-resources.js
│           ├── login.js
│           ├── dashboard-member.js
│           ├── dashboard-staff.js
│           ├── dashboard-coach.js
│           ├── members.js
│           ├── member-detail.js
│           ├── applications.js
│           ├── application-detail.js
│           ├── care-packages.js
│           ├── care-package-detail.js
│           ├── tasks.js
│           ├── check-ins.js
│           ├── check-in-new.js
│           ├── coaching.js
│           ├── resources.js
│           ├── retreats.js
│           ├── impact.js
│           └── settings.js
└── docs/
    └── (this spec lives at repo-root docs/oaf-os-alpha/)
```

### Jekyll configuration change required

Add `app/` to the **root** of the repo. Since files in `app/` will have **no YAML front matter**, Jekyll will copy them as-is to `_site/app/`. No `include:` change is needed (it's not excluded). However, to be explicit and prevent accidental Liquid processing if someone adds front matter later:

**No `_config.yml` change is strictly required.** The `app/` directory is not in `exclude:` and files without front matter pass through unprocessed. The existing `defaults:` block scopes to `type: "pages"` and `type: "posts"` which won't match loose files.

**Recommended safety addition** (optional but explicit):
```yaml
# In _config.yml exclude list — do NOT add app/ here
# app/ files have no front matter and are copied verbatim
```

For the custom domain `app.operationantifragile.com` deployment, a separate GitHub Pages deployment or a `CNAME` override in the `app/` directory would be handled at deployment time (Basher's scope). The existing `CNAME` points to `www.operationantifragile.com`.

---

## 7. Design System Decision

### Recommendation: **Use the preview app palette (charcoal/gold/bone) for the PWA; keep marketing tokens for the marketing site.**

**Rationale:** The OAF OS app is a distinct product from the marketing site. The preview already established a refined, accessible palette purpose-built for a data-dense operational UI. The marketing palette (#ffce00 yellow primary) is loud and brand-forward — great for landing pages, wrong for a dashboard you use daily.

### App CSS Custom Properties (defined in `app/css/app.css`)

```css
:root {
  /* Core palette — derived from preview */
  --app-bg: #1e1e1e;              /* charcoal — page background */
  --app-surface: #2a2a2a;         /* elevated cards */
  --app-surface-alt: #f8f6f1;     /* bone — light surface for content areas */
  --app-paper: #ffffff;           /* paper — clean white panels */
  --app-ink: #1a1a1a;            /* ink — primary text on light bg */
  --app-content-secondary: #4a4a4a; /* secondary text */
  --app-content-muted: #6b6b6b;  /* muted/helper text */

  /* Accent */
  --app-gold: #c8ad70;           /* gold — primary accent, CTAs, active states */
  --app-gold-hover: #b89a5c;     /* gold darkened for hover */
  --app-gold-soft: rgba(200, 173, 112, 0.12); /* gold tint for backgrounds */

  /* Functional */
  --app-field: #f3f1eb;          /* field — input backgrounds */
  --app-steel: #d4d0c8;          /* steel — borders, dividers */
  --app-line: #e5e2dc;           /* line — subtle separators */
  --app-danger: #c0392b;         /* error/crisis states */
  --app-success: #27ae60;        /* success/complete states */
  --app-warning: #d4a017;        /* warning/review states */

  /* Typography */
  --app-font-heading: "Russo One", sans-serif;
  --app-font-body: "Work Sans", sans-serif;
  --app-font-mono: "JetBrains Mono", "Fira Code", monospace;

  /* Spacing (reuse marketing scale) */
  --app-space-xs: 0.5rem;
  --app-space-sm: 0.75rem;
  --app-space-md: 1rem;
  --app-space-lg: 1.5rem;
  --app-space-xl: 2rem;
  --app-space-2xl: 3rem;

  /* Radii */
  --app-radius-sm: 0.375rem;
  --app-radius-md: 0.5rem;
  --app-radius-lg: 0.75rem;

  /* Shadows */
  --app-shadow-card: 0 4px 12px rgba(0, 0, 0, 0.08);
  --app-shadow-elevated: 0 8px 24px rgba(0, 0, 0, 0.12);

  /* Layout */
  --app-header-height: 3.5rem;
  --app-sidebar-width: 16rem;
  --app-max-content: 72rem;
}
```

### Brand connection

The gold accent (#c8ad70) echoes the marketing gold (#ffce00) in a muted, professional tone suitable for operational UI. "Russo One" as the heading font maintains brand continuity. The `bone`/`paper`/`field` palette mirrors the marketing `surface-muted` (#f3f1eb) but in a darker chrome context.

---

## 8. PWA Strategy

### Manifest (`app/manifest.json`)

```json
{
  "name": "OAF OS",
  "short_name": "OAF OS",
  "description": "Operation Antifragile — Operational Support System (Demo)",
  "start_url": "/app/#/",
  "display": "standalone",
  "background_color": "#1e1e1e",
  "theme_color": "#c8ad70",
  "orientation": "portrait-primary",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "icons/icon-maskable-192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable" },
    { "src": "icons/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

### Icon sizes required

- 192×192 (standard + maskable)
- 512×512 (standard + maskable)

### Service Worker Strategy

| Resource | Strategy |
|----------|----------|
| App shell (index.html, app.css, app.js, router.js, state.js, seed-data.js, component JS) | **Precache** — versioned at build/deploy time |
| Icons, fonts | **Cache-first** (long-lived) |
| External resources (Google Fonts CSS) | **Stale-while-revalidate** |
| Navigation fallback | **Offline page** (`offline.html`) if network and cache both miss |

### Update/versioning approach

- Service worker uses a `CACHE_VERSION` string (e.g. `oaf-os-v1.0.0`).
- On activation, old caches are deleted.
- `index.html` includes a version check: if SW detects new version, a non-intrusive toast says _"Update available — tap to refresh."_
- No build tool required; version is a manually-bumped constant in `sw.js`.

---

## 9. State/Persistence Contract

### Storage mechanism

- **Key:** `oaf_os_demo_state` in `localStorage`
- **Format:** Single JSON object containing all entity collections + current role selection
- **Max size target:** < 500KB (well within localStorage limits for seed data)

### Structure

```json
{
  "_version": "1.0.0",
  "_lastModified": "ISO-8601",
  "currentRole": "member | staff | coach | null",
  "currentUserId": "string | null",
  "members": [...],
  "applications": [...],
  "carePackages": [...],
  "tasks": [...],
  "checkIns": [...],
  "coachingNotes": [...],
  "resources": [...],
  "retreats": [...],
  "impactMetrics": [...]
}
```

### Reset behavior

1. `#/settings` → "Reset Demo Data" button
2. Clears `oaf_os_demo_state` from localStorage
3. Reloads seed data from `seed-data.js`
4. Redirects to `#/login`

### Demo labeling

- **Persistent banner** at top of every authenticated view: _"⚡ Demo Mode — changes are stored locally on this device only and are not sent to OAF servers."_
- Role picker screen: _"This is a preview. No real member data is displayed."_
- Every form submission shows a toast: _"Saved to local demo — not submitted to OAF."_

---

## 10. Safety & Compliance Requirements

These are **binding** on all implementers.

### Crisis Resources — Placement

1. **Global header:** A persistent "Crisis Resources" link/button visible on EVERY screen (public and authenticated). Uses `--app-danger` color. Tapping opens a modal overlay.
2. **Crisis modal content (minimum):**
   - 988 Suicide & Crisis Lifeline — call or text 988
   - Veterans Crisis Line — call 988 (press 1), text 838255
   - QRFup Crisis App — qrfup.org
3. **Dedicated route** `#/crisis-resources` — full-page version of the same content with additional context.
4. **Footer of every page** — text link "Crisis Resources" in the page footer.

### Non-Clinical / Non-Emergency Disclaimers

1. **App landing page** (`#/`): Display the safety panel verbatim: _"No Shortcuts, Only Progress — No emergency promises. No clinical claims. Just disciplined operational follow-through for veterans and first responders."_
2. **Every intake form** (apply routes): Above the submit button: _"This is not an emergency service. If you are in crisis, tap Crisis Resources above."_
3. **Dashboard footer** (all roles): _"OAF OS is an operational tool. It does not provide medical, clinical, or emergency services."_
4. **Coaching notes** (create/view): _"Coaching notes are operational, not clinical records."_

### Accessibility requirements

- All crisis links must be reachable via keyboard (focusable, `Enter` to activate).
- Crisis modal must trap focus and be dismissible with `Escape`.
- Color contrast ratio ≥ 4.5:1 for all text; ≥ 3:1 for UI components.
- All interactive elements must have visible focus indicators.
- Forms must have associated `<label>` elements.
- ARIA landmarks: `banner`, `main`, `navigation`, `contentinfo`.

---

## 11. Work Split

### Rusty — App UI Implementation

Owns all files in `app/` **except** `sw.js`, `manifest.json`, `offline.html`, and `icons/`.

```
app/index.html
app/css/app.css
app/js/app.js
app/js/router.js
app/js/state.js
app/js/seed-data.js
app/js/components/header.js
app/js/components/nav.js
app/js/components/safety-banner.js
app/js/components/crisis-modal.js
app/js/components/views/*.js  (all view files)
```

**Rusty's responsibilities:**
- HTML shell with semantic structure
- CSS design system implementation (all tokens from §7)
- Hash router implementation
- State management (localStorage read/write/reset)
- All UI views and components
- Seed data JSON structure
- Accessibility compliance
- Crisis resource UI placement per §10
- Demo labeling per §9

### Basher — PWA Infra + Deployment + Jekyll Config

Owns:

```
app/sw.js
app/manifest.json
app/offline.html
app/favicon.ico
app/icons/icon-192.png
app/icons/icon-512.png
app/icons/icon-maskable-192.png
app/icons/icon-maskable-512.png
```

**Basher's responsibilities:**
- Service worker (precache list, offline fallback, update mechanism)
- PWA manifest
- Icon generation (all four sizes)
- Offline fallback page (branded, with crisis resources link)
- Verification that Jekyll passes `app/` through without processing
- Any `_config.yml` change if testing reveals one is needed
- Local preview instructions (e.g. `bundle exec jekyll serve` or simple HTTP server)
- Deployment documentation for `app.operationantifragile.com`

### Shared contract (no file overlap)

- Rusty's `index.html` includes `<link rel="manifest" href="manifest.json">` and registers `sw.js` — but does NOT write those files.
- Basher's `sw.js` precache list references Rusty's files by path — Basher updates this list after Rusty's files are finalized.
- Coordination point: Basher provides icon files; Rusty references them only via manifest (Basher's file).

---

## Appendix: Summary of Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Routing | Hash-based (`#/path`) | GitHub Pages has no SPA rewrite; hash routing works without server config |
| App location | `/app/` directory at repo root | Isolates from marketing site; Jekyll copies it verbatim |
| Auth model | Fake role picker, no credentials | Static alpha; clearly labeled demo |
| Persistence | `localStorage` single JSON key | No backend; simple, resettable, honest |
| Design tokens | Preview palette (charcoal/gold/bone) | Purpose-built for operational UI; marketing palette too loud for dashboards |
| PWA caching | Precache shell + stale-while-revalidate external | Offline-capable with minimal complexity |
| Roles | Member, Staff, Coach | Covers primary user journeys evidenced in preview |
| Framework | Vanilla JS (no build step) | Static hosting, no toolchain, fast iteration for alpha |
