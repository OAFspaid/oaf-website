# OAF OS Alpha — Deployment Guide

> **Author:** Basher (GitHub Pages Engineer, Squad)  
> **Date:** 2026-08-11  
> **Status:** Current

---

## 1. Local Preview

### Option A — Jekyll (full site + app)

Requires Ruby ≥ 3.1 and Bundler:

```bash
cd <repo-root>
bundle install          # first time only
bundle exec jekyll serve --livereload
```

The site is served at `http://localhost:4000`. The OAF OS app is at:

```
http://localhost:4000/app/
```

> **Why `http://localhost` matters:** Service workers and ES modules both require a
> secure context. `http://localhost` is treated as secure by browsers. **`file://`
> URLs will not work** — the SW will silently refuse to register and module imports
> will fail CORS checks.

### Option B — Plain static server (no Ruby required)

After a Jekyll build (`bundle exec jekyll build`), serve `_site/`:

```bash
cd _site
python -m http.server 4000
# or: npx serve . -p 4000
```

App URL: `http://localhost:4000/app/`

You can also serve the **source** `app/` directory directly for PWA-only development:

```bash
cd app
python -m http.server 4001
# App is now at http://localhost:4001/ (path differences — SW scope will need updating)
```

---

## 2. Service Worker Gotchas

### SWs only run on secure contexts

Service workers require either:
- `http://localhost` (or `http://127.0.0.1`)
- HTTPS (any origin)

They will silently fail to register on plain `http://` or `file://`. Always use
`http://localhost` for local development.

### Hard-resetting a stale service worker

If you deploy a bug in the SW or need a clean slate:

1. Open Chrome/Edge DevTools → **Application** tab → **Service Workers**
2. Click **Unregister** next to the `/app/sw.js` entry
3. Hard-refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)

Alternatively, check **"Update on reload"** in the Application → Service Workers panel
to always fetch a fresh SW during development.

### Cache versioning and user updates

- The SW uses a `CACHE_VERSION` constant (currently `oaf-os-v1`).
- When you increment `CACHE_VERSION`, the browser detects a changed SW file and
  queues a new SW installation.
- The app can send `{ type: 'SKIP_WAITING' }` via `postMessage` to activate
  immediately (e.g., from a "Update available — tap to refresh" toast).
- Without `SKIP_WAITING`, the new SW waits until all tabs running the old SW are
  closed before activating.
- The `activate` handler deletes all caches from older versions automatically.

### Liquid / Jekyll processing

`app/` files have **no YAML front matter** and are copied verbatim to `_site/app/`
by Jekyll. They are never processed by Liquid. If someone accidentally adds
`---` front matter to any file under `app/`, Jekyll will process it with
`liquid.error_mode: strict` — raw `{{` or `{%` sequences in JS/HTML would
cause a build error. **Do not add front matter to any file under `app/`.**

---

## 3. Jekyll Build Verification

After `bundle exec jekyll build`, confirm these files exist in `_site/`:

```
_site/app/index.html          ← Rusty's SPA shell (must exist before deploy)
_site/app/sw.js               ← Service worker
_site/app/manifest.json       ← PWA manifest
_site/app/offline.html        ← Offline fallback
_site/app/favicon.ico
_site/app/icons/icon-192.png
_site/app/icons/icon-512.png
_site/app/icons/icon-maskable-192.png
_site/app/icons/icon-maskable-512.png
```

Quick check (PowerShell):

```powershell
Get-ChildItem _site\app -Recurse | Select-Object -ExpandProperty FullName
```

Verify manifest JSON is valid:

```powershell
Get-Content app\manifest.json -Raw | ConvertFrom-Json | Out-Null
Write-Host "manifest.json is valid JSON"
```

Verify SW syntax:

```bash
node --check app/sw.js && echo "sw.js syntax OK"
```

---

## 4. Hosting at `app.operationantifragile.com`

### The problem

**GitHub Pages supports exactly one custom domain per repository.** The repo root
`CNAME` currently points to `www.operationantifragile.com` (the marketing site). A
second custom domain (`app.operationantifragile.com`) cannot be served from the same
Pages site without removing or replacing the existing `CNAME`.

### Options

#### Option A — Separate repository + Pages site (⭐ Recommended)

Create a second GitHub repository (e.g., `oafspaid/oaf-os-app`) that contains only
the contents of `app/`. Enable GitHub Pages on that repo with:

- **Custom domain:** `app.operationantifragile.com`
- **Branch:** `main` (or `gh-pages`)

**DNS record** (add at your DNS provider):

```
Type: CNAME
Host: app
Value: oafspaid.github.io
TTL:  3600
```

GitHub will issue a TLS certificate automatically (Let's Encrypt via Pages).

**Deployment:** A GitHub Actions workflow in *this* repo can push just the `_site/app/`
directory to the second repo on every push to `main`:

```yaml
# .github/workflows/deploy-app.yml  (sketch — do not copy verbatim)
- uses: cpina/github-action-push-to-another-repository@main
  with:
    source-directory: _site/app
    destination-github-username: oafspaid
    destination-repository-name: oaf-os-app
    target-branch: main
```

**Tradeoff:** Requires maintaining a second repo. Decouples app and marketing
deploys cleanly, which is an advantage long-term.

---

#### Option B — GitHub Actions workflow to a separate `gh-pages`-style branch

Keep everything in one repo. Use a workflow that publishes only `_site/app/` to a
dedicated branch (e.g., `app-pages`) and configure a second Pages "deployment" from
that branch via the new GitHub Pages environments feature (currently in beta for
org accounts; check availability).

**Tradeoff:** Complex; depends on a GitHub feature that may not be available for
all accounts.

---

#### Option C — Third-party static host for the subdomain

Deploy `_site/app/` to Cloudflare Pages, Netlify, or Vercel pointed at
`app.operationantifragile.com`. These services allow custom subdomains independently
of GitHub Pages.

**DNS record (Cloudflare Pages example):**

```
Type: CNAME
Host: app
Value: <your-project>.pages.dev
TTL:  auto (proxied or DNS-only)
```

**Tradeoff:** Another service to manage; free tier on all three should suffice for
alpha traffic.

---

### ⭐ Recommendation: Option A (separate repo)

Option A is the most straightforward, uses only tools the team already has (GitHub),
avoids beta features, and gives the app its own deployment history. Set up the `oaf-os-app`
repo and the DNS `CNAME` record for `app.operationantifragile.com` before the alpha
goes public.

**Do not modify the root `CNAME` in this repo.** It must stay pointing to
`www.operationantifragile.com`.

---

## 5. Path Assumptions

The app currently assumes it is served under `/app/`. The following would need to
change if it is later served at a **domain root** (e.g., `https://app.operationantifragile.com/`):

| File | Current value | Value at domain root |
|------|--------------|----------------------|
| `manifest.json` → `start_url` | `/app/?source=pwa` | `/?source=pwa` |
| `manifest.json` → `scope` | `/app/` | `/` |
| `sw.js` → SW registration scope | `/app/` | `/` |
| `sw.js` → precache URLs | `/app/index.html`, `/app/css/...` etc. | `/index.html`, `/css/...` etc. |
| SW file location | Must be at `/app/sw.js` to own `/app/` scope | Must be at `/sw.js` to own `/` scope |
| `index.html` → SW registration | `register('/app/sw.js', { scope: '/app/' })` | `register('/sw.js', { scope: '/' })` |

These are **all** in Basher-owned files (`sw.js`, `manifest.json`) except the SW
registration call in `index.html` (Rusty's file). Coordinate with Rusty if the
deployment path changes.

---

## 6. PWA Install & Verification Checklist

Before calling the alpha "PWA-ready", verify:

- [ ] **Lighthouse PWA audit:** Run `Lighthouse` in Chrome DevTools (or `npx lighthouse http://localhost:4000/app/ --view`). Target score ≥ 90 on the PWA category. Resolve any "installability" or "service worker" failures.
- [ ] **Manifest served correctly:** DevTools → Application → Manifest — confirm all fields parse, icons load, and `start_url` / `scope` are correct.
- [ ] **SW registration:** Application → Service Workers — confirm `sw.js` is "activated and running". No errors in the console.
- [ ] **Install prompt:** On Chrome/Edge, the address bar should show an install icon (⊕) after a moment. Tap it and verify the app installs with the correct name, icon, and launches in standalone mode.
- [ ] **Offline test:**
  1. Load the app (`/app/`) and navigate to a few pages.
  2. DevTools → Network → check "Offline".
  3. Refresh — should load from cache (not show offline.html).
  4. Navigate to an uncached route — should fall back to `/app/index.html` (hash routing handles the rest).
  5. Clear all caches (Application → Storage → Clear site data), then go offline and hard refresh — should show `offline.html`.
- [ ] **Update flow test:** Increment `CACHE_VERSION` in `sw.js`, deploy, load the app, confirm a "new version" toast appears and tapping it reloads with the new SW active.
- [ ] **Scope isolation:** Visit the marketing site root (`/`) with DevTools open — confirm no SW is registered for `/` (only for `/app/`).

---

## 7. GitHub Actions Workflow for App Deploy

A workflow skeleton for publishing to a second repo (Option A above):

```yaml
# .github/workflows/deploy-app.yml
name: Deploy OAF OS App

on:
  push:
    branches: [main]
    paths:
      - 'app/**'
      - '_config.yml'
      - 'Gemfile'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: ruby/setup-ruby@v1
        with:
          bundler-cache: true

      - name: Jekyll build
        run: bundle exec jekyll build

      - name: Publish app/ to oaf-os-app repo
        uses: cpina/github-action-push-to-another-repository@main
        env:
          SSH_DEPLOY_KEY: ${{ secrets.OAF_OS_APP_DEPLOY_KEY }}
        with:
          source-directory: _site/app
          destination-github-username: oafspaid
          destination-repository-name: oaf-os-app
          target-branch: main
          commit-message: "Deploy OAF OS app from ${{ github.sha }}"
```

> **Note:** Create an SSH deploy key on the `oaf-os-app` repo and store the private
> half as `OAF_OS_APP_DEPLOY_KEY` in *this* repo's secrets. Follow GitHub's
> [deploy keys documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys).
