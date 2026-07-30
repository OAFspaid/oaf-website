# Operation Antifragile website

Static Jekyll migration of the Operation Antifragile site, built to run locally and deploy cleanly to GitHub Pages.

## What is in this repo

- Jekyll source for the public site
- 15 public pages plus 32 public blog posts
- Local first-party media under `wp-content/uploads/`
- GitHub Pages workflow in `.github/workflows/pages.yml`

## Local build and preview (Windows PowerShell)

```powershell
cd "C:\Users\jspai\.source\GitHub\oaf-website"
bundle config set --local path "vendor/bundle"
bundle install
bundle exec jekyll build
bundle exec jekyll serve --baseurl=""
```

Preview locally at http://127.0.0.1:4000/.

## Content structure

- `_posts/` - published articles
- Root `*.md` pages - public landing/program/legal pages
- `_layouts/`, `_includes/`, `assets/` - site presentation
- `wp-content/uploads/` - migrated first-party media and downloads

## Theme architecture

This repo is an **OAF Jekyll port inspired by the live site's public presentation**. The reusable presentation layer is organized around:

- layouts: `_layouts/default.html`, `home.html`, `page.html`, `program.html`, `blog.html`, `post.html`
- includes: `_includes/header.html`, `footer.html`, `hero.html`, `cta-panel.html`, `feature-card.html`, `breadcrumbs.html`
- shared data: `_data/navigation.yml`, `_data/footer.yml`, `_data/contact.yml`, `_data/social.yml`
- one Sass entrypoint: `assets/css/main.scss`, importing token/base/header/footer/button/section/card/blog/responsive/utility partials from `_sass/`

Final layout mapping for the port is:

- homepage → `home`
- standard pages (`/about/`, `/site-map/`, `/thank-you/`, `/404.html`) → `page`
- program/service pages → `program`
- blog index (`/blog/`) → `blog`
- posts in `_posts/` → `post`
- contact (`/contact-us/`) → `page`
- legal (`/privacy-policy/`, `/disclaimer/`) → `page`

This keeps migrated URLs stable while reimplementing the public presentation in Jekyll rather than shipping WordPress or Elementor code.

## Deployment

GitHub Actions builds the site on pushes and deploys to GitHub Pages from the repository default branch.

## Notes

- This repo is a static mirror. External conversions such as Apple, Insight Timer, social links, and the live contact workflow remain outbound.
- Keep new internal links relative/rooted so they work both locally and on GitHub Pages.
