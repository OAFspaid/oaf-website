# OAF OS Alpha

OAF OS is a static, client-side, installable Progressive Web App for Operation Antifragile. It lives in `app/` alongside the Jekyll marketing site, is built and copied verbatim into `_site/app/` at deploy time, and is served at `/app/`. It has no relation to the Jekyll site's layout or routing — the two are independent products sharing one repository for now.

---

## ⚠️ Alpha status

**This is a demo. It is not a live service.**

- No backend. No server. No authentication.
- The login screen is a role picker — three buttons, no credentials, no real accounts.
- All data lives **unencrypted** in the browser's `localStorage` on that device only. It is never transmitted to OAF or any server.
- Closing the browser or clearing site data wipes everything.
- **Do not enter real member data. Do not use this for any actual operational purpose.**

---

## Safety posture

OAF OS is not a clinical tool and not an emergency service. Every screen includes a link to crisis resources. The resources screen and crisis modal are reachable while offline and with JavaScript disabled (via `offline.html` and the `<noscript>` block in `index.html`).

Crisis contacts as they appear in `app/data/seed.json`:

| Resource | Contact |
|----------|---------|
| 988 Suicide & Crisis Lifeline | Call or text **988** |
| Veterans Crisis Line | Call **988** then press **1** — Text **838255** — Chat at veteranscrisisline.net |
| CopLine (law enforcement) | Call **1-800-267-5463** |

---

## Run it locally

### Option A — Jekyll (full site + app)

Requires Ruby ≥ 3.1 and Bundler:

```bash
cd <repo-root>
bundle install          # first time only
bundle exec jekyll serve --livereload
```

App is at: `http://localhost:4000/app/`

### Option B — Plain static server (no Ruby)

After `bundle exec jekyll build`, serve `_site/`:

```bash
cd _site
python -m http.server 4000
# or: npx serve . -p 4000
```

App is at: `http://localhost:4000/app/`

> **Why `http://localhost` and not `file://`:** Service workers and ES modules both require a secure context. `http://localhost` qualifies. `file://` URLs will not work — the service worker silently refuses to register and module imports fail CORS checks.

---

## What is in the alpha

**In scope:**

- Public landing / marketing view (app-specific)
- Apply intake — four paths: remote training, in-person training, care package request, retreat interest
- Role-based demo dashboards for Member, Staff, and Coach
- Care package lifecycle (request → review → fulfillment → follow-up)
- Member support view (status, coaching, tasks, resources)
- Sponsorship info page (links out to Stripe; no payment handling in-app)
- Crisis resources — always accessible from every screen

**Not in this alpha:**

- Real authentication, OAuth, or credential storage
- Server-persisted data or real Stripe integration
- `/donate` page
- Blog or news within the app
- Board-level reporting dashboard
- Retreat scheduling / calendar (intake interest form only)
- Push notifications
- Multi-language / i18n

---

## Document map

| File | What it is | Who'd read it |
|------|-----------|---------------|
| **README.md** (this file) | Entry point and orientation | Anyone starting here |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Route map, data model, role model, component breakdown, service worker design | Developers, tech leads |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Local preview, SW gotchas, GitHub Pages hosting options, build verification checklist | Developers, DevOps |
| [QA-REPORT.md](QA-REPORT.md) | Initial QA/accessibility audit (5 blockers, 7 major) and re-review verdict (approved) | QA, developers |
| [RAI-REVIEW.md](RAI-REVIEW.md) | Responsible AI review of safety posture, crisis resource integrity, honest capability representation; initial and re-verification verdicts | Safety reviewers, leadership |
| [FACT-CHECK.md](FACT-CHECK.md) | Verification of all crisis contact numbers and resource descriptions; required copy corrections | Content owners, legal |

---

## Review status

### QA / Accessibility (Yen)

**Initial verdict (2026-08-11):** ⛔ REJECTED — 5 blockers (pervasive data model mismatch, gold link contrast failures, invisible form focus indicator, two missing detail views), 7 major accessibility and functional findings.

**Re-review verdict (2026-08-11):** ✅ APPROVED WITH FINDINGS — all 5 blockers and all 7 major findings resolved.

Open non-blocking findings:

| ID | Severity | Description |
|----|----------|-------------|
| N-01 | Minor (latent) | `.badge--pending` / `.badge--planning` still use `#e65100` on `#fff3e0` = 3.46:1. Not currently visible in demo data; will fail if those statuses are used. |
| N-02 | Nit | `copy.json` has no `screens.taskDetail` or `screens.coachingDetail` keys; both views fall back to hardcoded defaults correctly. |

### RAI Review (Rai)

**Initial verdict (2026-08-11):** 🟡 Yellow — safe to preview conditionally; two gaps found (R-02: 404 screen had no crisis link; R-01: dormant "Secure mission access" string in `copy.json`).

**Re-verification verdict (2026-08-11):** 🟢 Green — safe to preview with stakeholders. All five initial findings and the post-review regressions are resolved. Remaining items are production-transition advisories:

| ID | Severity | Description |
|----|----------|-------------|
| N-01 | Advisory | Add the shared-device/local-storage disclosure directly to the check-in form before production use; it is already present in settings, intake forms, and the global header notice. |

---

## Where the code lives

```
app/
├── index.html          SPA shell — entry point, SW registration, noscript crisis resources
├── offline.html        Offline fallback — includes all three crisis contacts
├── manifest.json       PWA manifest (start_url: /app/, scope: /app/)
├── sw.js               Service worker — precaching, offline routing (Basher)
├── favicon.ico
├── icons/              PWA icons (192, 512, maskable variants)
├── css/
│   └── app.css         Single stylesheet — design tokens, components, responsive rules
├── data/
│   ├── seed.json       Demo data — members, applications, care packages, tasks, resources, crisis contacts
│   └── copy.json       UI strings — headings, labels, disclaimers, demo banners
└── js/
    ├── app.js          Router bootstrap, VIEW_MAP, error boundary
    ├── router.js       Hash-based SPA router
    ├── state.js        localStorage state layer with memory fallback
    ├── seed-data.js    Seed + copy loader with graceful fetch-failure fallbacks
    ├── pwa.js          Install prompt, SW update toast
    └── components/
        ├── header.js       App header — crisis button, demo badge, shared-device notice
        ├── nav.js          Role-aware navigation, mobile drawer
        ├── crisis-modal.js Crisis resources modal (accessible, focus-trapped)
        ├── safety-banner.js Footer safety/disclaimer banner, rendered on all views
        └── views/          One file per route — dashboards, forms, detail views, 404
```

All state is stored under key `oaf_os_demo_state` in `localStorage`. Nothing is sent over the network.
