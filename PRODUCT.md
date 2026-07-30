# PRODUCT.md — Operation Antifragile Jekyll Site

## Product Overview

The Operation Antifragile website is a GitHub Pages-hosted Jekyll site designed to support Operation Antifragile's mission: helping veterans, first responders, and operators become resilient and strong under stress through evidence-based training, mental fortitude development, and holistic wellness support.

This is a **content-driven informational site** with heavy emphasis on program discovery and external integrations. It is not a transaction platform—primary conversion flows direct users to external partner platforms (Train Heroic for training programs, contact form for inquiries).

## Goals

1. **Mission clarity:** Explain what "antifragile" means and why it matters for the target audience
2. **Program discovery:** Showcase the four pillars of wellness (Strength Training, Mental Fortitude, Mobility Support, Nutrition & Health)
3. **Trust building:** Establish credibility through veteran/first-responder perspective
4. **External conversion:** Drive users to Train Heroic marketplace for training program enrollment, contact form for membership/partnership inquiries, and external operationantifragile.com for resources
5. **Community engagement:** Position the Foundation as peer-to-peer, created by veterans/first responders for veterans/first responders

## Audience

**Primary:**
- Veterans transitioning to civilian life or second careers
- Active duty military personnel seeking resilience training
- First responders (police, fire, emergency medical) managing occupational stress

**Secondary:**
- Athletes and tactical professionals seeking performance optimization
- Family members of veterans/first responders seeking support resources
- Potential partners, sponsors, or volunteer contributors

**Audience needs:**
- Holistic wellness approach (not just fitness)
- Peer-informed guidance (not generic wellness advice)
- Practical, actionable resources
- Clear conversion path to training programs
- Confidence that programs are designed by and for people like them

## Content Model

### Collections & Structure

**Pages (content/static/):**
- Standard informational pages (about, contact-us, disclaimer, privacy-policy)
- Program/service pages (physical-training, mental-fortitude, nutrition-health, modern-athlete-warfighter-program)
- Landing pages (blog, site-map, thank-you, liftlab-app)

**Posts (blog/):**
- Blog content (currently minimal; intended for news, tips, case studies)
- Tagged for categorization (news, updates)
- Generated RSS feed at /feed.xml

**Homepage (index.md):**
- Hero section with mission statement
- "What is Antifragile" explainer section
- Four pillars showcase with images and links
- Social proof section (Designed by veterans for veterans)
- Strong CTA to membership/programs

### Front Matter Schema

All pages use:
- layout: page|post|program|home
- title: Page Title
- permalink: /slug/

Pages optionally support:
- description: Subtitle or meta description
- featured_image: URL to hero/featured image
- featured_image_alt: Alt text for featured image
- featured_image_caption: Caption below image

Program pages also support:
- cta_text: Button text for primary CTA
- cta_url: External URL for CTA (e.g., Train Heroic link)

Blog posts support:
- author: Author name
- date: Publication date (YYYY-MM-DD)
- tags: Array of tags for categorization

Navigation:
- nav-order: (number): Optional; includes page in header/footer navigation (auto-sorted ascending)

## Page Types

### 1. Home (layout: home)
- Full-screen hero with mission statement and primary CTA
- Structured content sections
- Four pillars showcase with image/title/link per pillar
- Social proof messaging
- Secondary CTA to about page

### 2. Standard Page (layout: page)
- Page header with title and optional description
- Single-column body content (max 900px width)
- Support for featured images
- No sidebar or multi-column layout

### 3. Program Page (layout: program)
- Hero image (full-width featured-image)
- Program title and description
- Body content with embedded images and text
- Strong CTA button linking to external platform (Train Heroic) or internal resource
- Designed for service/training discovery pages

### 4. Blog Post (layout: post)
- Post header with title, author, date, and featured image
- Single-column body content
- Post footer with tag links
- Date-based permalink

## External Service Boundaries

The site integrates with and directs traffic to:

1. **Train Heroic** (marketplace.trainheroic.com/brand/operation-antifragile)
   - Hosts physical training programs and workout library
   - Primary conversion destination for strength training and mobility content
   - Links appear as CTAs on Physical Training, Modern Athlete/Warfighter, and Mobility pages

2. **operationantifragile.com (WordPress)**
   - External business website
   - Hosts contact forms, membership signup, additional resources
   - Links appear as secondary/tertiary CTAs for contact, membership, about

3. **GitHub Pages**
   - Deployment platform
   - Automatic build/deploy via GitHub Actions workflow

4. **Google Fonts**
   - Hosts Russo One and Work Sans typefaces
   - Preconnect optimization for performance

5. **Jekyll Plugins:**
   - jekyll-feed: Generates RSS/Atom at /feed.xml
   - jekyll-sitemap: Auto-generates /sitemap.xml for SEO
   - jekyll-seo-tag: Injects Open Graph, Twitter Card, and structured data meta tags

## Deployment Model

**Platform:** GitHub Pages (free GitHub-hosted static site)

**Build Process:**
- GitHub Actions workflow (.github/workflows/pages.yml)
- Triggered on push to main branch
- Builds with bundle exec jekyll build
- Artifacts deployed to GitHub Pages URL

**URL Configuration:**
- Local development: url: "" and baseurl: ""
- Production: url: https://organization.github.io/oaf-website (or custom domain)
- All links use relative_url filter to support any baseurl

**Build Settings:**
- Markdown processor: kramdown (GitHub Flavored Markdown)
- Liquid error mode: strict (fail on undefined variables)
- Sass output: compressed
- Incremental builds: disabled
- Permalink format: /:slug/ (WordPress-compatible root-level URLs)

**Gems:**
- github-pages (~> 231): Bundles Jekyll and all GitHub Pages-supported plugins
- jekyll-feed, jekyll-sitemap, jekyll-seo-tag: SEO and discovery plugins
- webrick: Required for Ruby 3+ local development
- tzinfo-data: Windows timezone support

**Build Constraints:**
- Only supported Jekyll plugins can be used (GitHub Pages whitelist)
- No custom Ruby plugins or liquid tags
- Builds run on GitHub infrastructure (no environment variables or secrets)
- Static output only (no server-side processing)

## Constraints & Decisions

### What This Site Is NOT

1. **Not a membership platform.** Memberships are handled externally (operationantifragile.com or external partner). This site directs users to those platforms.

2. **Not a transactional application.** No shopping cart, payment processing, or user accounts. All e-commerce/membership/CRM lives on external services.

3. **Not a blog-first platform.** The blog is secondary; the home page and program discovery pages are the main conversion drivers.

4. **Not a marketing automation platform.** No email signup, lead capture, or marketing funnel automation. Links drive to external platforms that handle lead capture.

5. **Not a real-time platform.** Static HTML; no live updates, comments, or dynamic content. Content is deployed via Git commit.

### Technical Constraints

- **No plugin ecosystem.** GitHub Pages only supports whitelisted Jekyll plugins. Custom plugins are not allowed.
- **No JavaScript frameworks.** No React/Vue/Svelte. Only vanilla JavaScript for accessibility and interactivity (mobile nav toggle, keyboard shortcuts).
- **No external APIs at build time.** Content is static markdown; dynamic external data loads are not supported.
- **No server-side rendering.** All content must be pre-rendered as static HTML/CSS/JS.
- **No form processing.** Forms must use external services (Formspree, Netlify Forms, etc.).

### Brand Compliance

- **Color palette:** Gold (#ECC83F), Charcoal (#2D2C28–#000), Navy (#17274A) preserve military aesthetic
- **Typography:** Russo One + Work Sans create bold, professional, accessible visual hierarchy
- **Voice:** Direct, no-nonsense messaging (No shortcuts, Training for life)
- **Visual language:** Image-heavy, full-screen heros, dark navigation, military/tactical aesthetic
- **No trendy effects:** No gradients, glassmorphism, excessive animations, or icon-heavy design
- **Accessibility-first:** WCAG AA+ compliant by default, not retrofitted

## Success Indicators

(Not tracked on-site; external analytics needed)

- Visits to home page and program pages
- Clicks through to Train Heroic and external contact forms
- Time on site (engagement signal)
- Mobile vs. desktop traffic split
- Referral sources (social, search, direct)

## Governance & Responsibilities

- **Content:** Content creators own content creation and updates via markdown files
- **Design/Layout:** Design team owns presentation layer (layouts, includes, styles)
- **Deployment:** DevOps team owns production URL setup, monitoring, and GitHub Pages configuration
- **Copy editing:** Editorial review recommended before commit

---

**Status:** Shipped and live
**Content Model:** Mature (all page types defined)
**External Dependencies:** Train Heroic, operationantifragile.com WordPress site, GitHub Pages
**Maintenance Model:** Low-touch (static site, no server maintenance)
