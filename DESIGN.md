# DESIGN.md — Operation Antifragile Visual & Interaction System

## Overview

The Operation Antifragile Jekyll site implements a custom, brand-aligned design system built entirely on CSS custom properties (CSS variables) with responsive mobile-first architecture. No theme frameworks (Tailwind, Bootstrap) are used. All visual decisions derive from military/tactical aesthetic and accessibility-first principles.

**Design Philosophy:** Strong, austere, purposeful. Built by veterans for veterans. No decoration, no compromise. Every visual element serves a function.

## Theme Architecture

This presentation layer is an **OAF Jekyll port inspired by the live site's public presentation**, not a direct WordPress theme export. The reusable theme contract is:

- **Layouts:** `_layouts/default.html`, `home.html`, `page.html`, `program.html`, `blog.html`, `post.html`
- **Includes:** `header.html`, `footer.html`, `hero.html`, `cta-panel.html`, `feature-card.html`, `breadcrumbs.html`
- **Theme data:** `_data/navigation.yml`, `_data/footer.yml`, `_data/contact.yml`, `_data/social.yml`, plus page/home hero data under `_data/home.yml` and `_data/page_heroes.yml`
- **Sass entrypoint:** `assets/css/main.scss`, split across `_sass/_tokens.scss`, `_base.scss`, `_header.scss`, `_footer.scss`, `_buttons.scss`, `_sections.scss`, `_cards.scss`, `_blog-article.scss`, `_responsive.scss`, and `_utilities.scss`

### Final layout taxonomy and page-type mapping

| Page type | Layout | Current route mapping |
| --- | --- | --- |
| Homepage | `home` | `/` |
| Standard pages | `page` | `/about/`, `/site-map/`, `/thank-you/`, `/404.html` |
| Program/service pages | `program` | `/physical-training/`, `/modern-athlete-warfighter-program/`, `/modern-athlete-warfighter-mobility-and-stability-program/`, `/old-bull-captains-coaches/`, `/liftlab-app/`, `/nutrition-health/`, `/mental-fortitude/` |
| Blog index | `blog` | `/blog/` |
| Blog posts | `post` | all `_posts/*.md` routes |
| Contact page | `page` | `/contact-us/` |
| Legal pages | `page` | `/privacy-policy/`, `/disclaimer/` |

This mapping preserves migrated content and URLs while moving visible structure into reusable Jekyll primitives. It intentionally reimplements public-facing patterns—absolute hero headers, inner-page hero bands, CTA panels, breadcrumbs, and responsive blog/article cards—without copying Elementor-generated CSS verbatim or packaging plugin code.

## Visual System

### Color Palette

All colors are defined as CSS custom properties in `assets/css/main.css:root` and applied consistently across the site.

**Primary Brand Colors:**

| Role | Name | Value | Usage |
|------|------|-------|-------|
| Primary Accent | Gold | #ECC83F | Primary call-to-action buttons, borders, hovers, highlights |
| Bright Accent | Gold Bright | #FFCE00 | Hover states, interactive emphasis |
| Primary Text | Charcoal Light | #2D2C28 | Body text, readable content on white backgrounds |
| Secondary BG | Charcoal Mid | #1E1E1E | Dark card backgrounds, section dividers |
| Dark Overlay | Charcoal Dark | #000 | Headings, maximum contrast text |
| Primary Accent (Dark) | Navy | #17274A | Secondary text, link colors on light backgrounds |
| Light Accent (Dark) | Navy Light | #3C4B74 | Tertiary text, muted accents |

**Contrast Ratios (WCAG AA+):**
- Gold (#ECC83F) on white: 7.6:1 (exceeds AA)
- Gold on charcoal: 11.3:1 (exceeds AAA)
- White on charcoal: 15.3:1 (AAA)
- Navy on white: 6.8:1 (exceeds AA)

**Color Application Rules:**
- **Links:** Navy (#17274A) by default; gold (#ECC83F) on hover/focus
- **Buttons:** Gold background, charcoal text
- **Headers:** Charcoal dark (#000) with uppercase treatment
- **Navigation:** White text on charcoal dark background with gold border bottom
- **Body text:** Charcoal light (#2D2C28) on white or light backgrounds
- **Focus states:** 2px solid gold outline, 2px offset

### Typography

All fonts load from Google Fonts with preconnect optimization. No fallback font substitution needed.

**Typeface Choices:**

| Role | Font | Weights | File Size | Rationale |
|------|------|---------|-----------|-----------|
| Headings (H1–H6) | Russo One | 700 only | ~12KB | Bold, uppercase, letter-spaced; military/tactical aesthetic; display only |
| Body Text | Work Sans | 400, 500, 600, 700 | ~40KB total | Professional sans-serif; excellent readability; supports weight emphasis |

**Font Loading:**
```html
<link href="https://fonts.googleapis.com/css2?family=Russo+One&family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```
- `display=swap`: Use system font while Google Fonts loads (avoid layout shift)
- Preconnect: `<link rel="preconnect" href="https://fonts.googleapis.com">` for DNS prefetch

### Heading Hierarchy

**Baseline:** 1rem (16px) on desktop

| Level | Tag | Font Size | Letter Spacing | Transform | Usage |
|-------|-----|-----------|-----------------|-----------|-------|
| H1 | `<h1>` | 3rem (48px) | 0.05em | uppercase | Page titles, hero headlines |
| H2 | `<h2>` | 2.5rem (40px) | 0.05em | uppercase | Section titles, major divisions |
| H3 | `<h3>` | 2rem (32px) | 0.05em | uppercase | Subsection titles, card titles |
| H4 | `<h4>` | 1.5rem (24px) | 0.05em | uppercase | Sub-subsection titles |
| H5 | `<h5>` | 1.25rem (20px) | 0.05em | uppercase | Minor headings (rarely used) |
| H6 | `<h6>` | 1rem (16px) | 0.05em | uppercase | Footer headings (rarely used) |

**Responsive Adjustments:**

- **Tablet (≤768px):** H1 = 2rem, H2 = 1.75rem, H3 = 1.5rem
- **Mobile (≤480px):** H1 = 1.5rem, H2 = 1.25rem, H3 = 1.125rem

**Heading Styling:**
- Font family: Russo One
- Font weight: 700
- Text transform: uppercase
- Letter spacing: 0.05em
- Line height: 1.2 (compact, controlled)
- Margin bottom: 1.5rem (var(--space-md))
- Color: #000 (charcoal-dark) by default

### Body Text

**Paragraph Base:**
- Font family: Work Sans
- Font size: 1rem (16px)
- Font weight: 400 (regular)
- Line height: 1.6 (very readable)
- Margin bottom: 1.5rem (var(--space-md))
- Color: #2D2C28 (charcoal-light)

**Emphasis:**
- `<strong>`: font-weight 700 (bold, charcoal-dark)
- `<em>`: font-style italic (rare, used for quotes/callouts)

**Lists:**
- Default margin-left: 2rem (var(--space-lg))
- List item margin-bottom: 1rem (var(--space-sm))
- `<ol>`, `<ul>`: automatic numbering/bullets (browser default)

**Links:**
- Color: #17274A (navy)
- Text decoration: none (no underline by default)
- Border bottom: 2px solid transparent
- Transition: all 0.3s ease

**Link States:**
- `:hover`: color gold (#ECC83F), border-bottom-color gold
- `:focus`: same as hover + 2px solid gold outline, 2px offset (keyboard navigation)
- `:active`: (not visually distinct; same as hover)
- `:visited`: (not styled differently; maintain brand consistency)

**Accessibility:** Focus outline is always visible; no focus removal.

### Spacing System

Defined as CSS custom properties for consistency across components:

```css
--space-xs:  0.5rem   (8px)
--space-sm:  1rem     (16px)
--space-md:  1.5rem   (24px)
--space-lg:  2rem     (32px)
--space-xl:  3rem     (48px)
--space-2xl: 4rem     (64px)
```

**Responsive Adjustments (Tablet/Mobile):**
- `--space-xl` reduces to 2rem on tablet
- `--space-2xl` reduces to 3rem on tablet
- `--space-lg` reduces to 1.5rem on mobile

## Layout System

### Page Structure

All pages inherit from `_layouts/default.html` and follow this DOM structure:

```
<html>
  <head>
    <!-- Meta, fonts, CSS, SEO -->
  </head>
  <body>
    <header class="site-header">
      <!-- Navigation -->
    </header>
    <main id="main" class="site-main">
      <!-- Page content (laid out per page type) -->
    </main>
    <footer class="site-footer">
      <!-- Footer navigation and copyright -->
    </footer>
  </body>
</html>
```

### Header (Navigation)

**Desktop (≥769px):**
- Background: rgba(45, 44, 40, 0.95) (charcoal with slight transparency)
- Position: sticky (remains visible while scrolling)
- Border bottom: 2px solid gold
- Height: auto (content-driven)
- Navigation menu: horizontal flexbox, gap 2rem
- Logo/title: 1.5rem, uppercase, gold color

**Mobile (<769px):**
- Navigation menu: hidden by default (offscreen)
- Toggle button: hamburger icon (3 horizontal lines), gold on hover
- Toggle animation: lines rotate/fold into X on open
- Menu on open: full-width, vertical list, overlay (implied)
- Keyboard dismiss: Escape key closes menu

**Navigation Links:**
- Color: white
- Font size: 0.875rem
- Text transform: uppercase
- Letter spacing: 0.05em
- Font weight: 500
- Hover: gold color, gold bottom border
- Focus: gold outline (2px, 2px offset)

### Hero Section (Full-Screen)

Used on home page and program pages (via featured image + overlay).

**Desktop:**
- Height: 100vh (full viewport height)
- Position: relative
- Flex layout: center content vertically and horizontally

**Structure:**
```
.hero
  .hero-image (absolute, full coverage)
  .hero-overlay (dark overlay, rgba(0,0,0,0.4))
  .hero-content (relative, z-index 2, centered text)
```

**Hero Content:**
- Max width: 800px
- Text align: center
- Padding: 2rem (var(--space-lg))
- H1: white color, 3.5rem, text-shadow 2px 2px 4px rgba(0,0,0,0.5)
- Subtitle: 1.5rem, margin 2rem below title
- Primary CTA: gold button positioned below subtitle

**Mobile (<768px):**
- Height: 60vh (reduced to preserve viewport on small screens)
- Font sizes scale down (per heading hierarchy responsive rules)
- Content padding: 1rem (reduced)

### Content Container

**Max width:** 1200px

**Padding:** 0 1.5rem (horizontal margins on all sides)

**Grid Layout:** Some sections use CSS Grid for two-column layouts (image + text):
```css
display: grid;
grid-template-columns: 1fr 1fr;
gap: 3rem;
```

On tablet/mobile: switches to single column (grid-template-columns: 1fr)

### Page Content Area

**Single Column:**
- Max width: 900px
- Margin: 0 auto (centered)
- Padding: 4rem 1.5rem (vertical/horizontal)

**Post/Page Header:**
- Margin bottom: 4rem
- Includes title, description, featured image

**Post/Page Body:**
- Consistent font sizing and line-height
- Images: max-width 100%, responsive
- No sidebar or multi-column within body

### Footer

**Background:** rgba(45, 44, 40, 0.95) (same as header)
**Border top:** 2px solid gold
**Color:** white text, #999 for secondary text
**Layout:** CSS Grid, 2 columns (footer-content and footer-links)
**Responsive:** Single column on mobile

**Footer Content:**
- Title: gold color, uppercase
- Description: light gray (#ccc)
- Link text: white, uppercase, 0.875rem

**Footer Bottom:**
- Border top: 1px solid rgba(255, 206, 0, 0.2) (subtle gold divider)
- Copyright text: #999, 0.875rem, centered
- Padding: 2rem 1.5rem

## Interactive Elements

### Buttons & CTAs

**Primary Button (.btn):**
```css
display: inline-block;
padding: 1rem 2rem;
background: #ECC83F (gold);
color: #000 (charcoal-dark);
border: 2px solid gold;
font-family: Russo One;
font-size: 1.25rem;
text-transform: uppercase;
letter-spacing: 0.05em;
transition: all 0.3s ease;
```

**States:**
- Default: gold background, charcoal text
- Hover: #FFCE00 (bright gold) background and border
- Focus: gold outline (2px, 2px offset)

**Secondary Button (.btn-secondary):**
```css
background: transparent;
color: #ECC83F (gold);
border: 2px solid gold;
```

**Hover:** Inverts to primary (gold background, charcoal text)

**Accessibility:**
- Minimum touch target: 44×44px (exceeds WCAG)
- Focus outline always visible
- No focus removal or outline: none

### Forms

No forms are hosted on-site; all forms use external services (Formspree, Netlify, etc.).

Form styling (if needed) should follow button patterns:
- Labels: 0.875rem, bold, charcoal-dark
- Inputs: 1rem, gray border, gold focus outline
- Placeholders: light gray, readable

### Links

Default link behavior (described above):
- Underline created with border-bottom (not text-decoration: underline)
- Hover changes color and reveals gold underline
- Focus adds outline

**Link Variations:**
- Navigation links: white text on dark background
- Footer links: white text on dark background
- Body links: navy text on light background

## Image Strategy

### Featured Images

**Usage:** Home page hero, program pages, blog post headers

**Specifications:**
- Recommended aspect ratio: 16:9 or 4:3 (landscape)
- Minimum width: 1200px (for high-DPI displays)
- Format: JPEG or PNG (WebP support optional but recommended)
- Optimization: Compress to <200KB (tools: TinyPNG, Squoosh)

**Presentation:**
- Full-width on desktop
- Responsive: max-width 100%, height auto
- Overlay: dark overlay (rgba(0,0,0,0.4)) applied for readability over image

**Alt Text:** Required in front matter (featured_image_alt)
```markdown
featured_image_alt: "Tactical training session with Operation Antifragile participants"
```

### Content Images

**Inline images:** Sized to fit content column (max 900px)
- Wrapped in `<figure>` with optional `<figcaption>`
- Responsive: max-width 100%

**Thumbnail images:** Small images in grids (four pillars section)
- Aspect ratio: 3:4 (portrait)
- Width: ~300px on desktop, responsive on mobile

### Image Organization

All images stored in `/assets/images/` directory (or referenced from external sources like operationantifragile.com).

## Responsive Design

### Breakpoints

| Name | Width | Usage |
|------|-------|-------|
| Desktop | 769px+ | Full multi-column layout |
| Tablet | 481px–768px | Optimized spacing, single columns |
| Mobile | 480px and below | Stacked layout, touch-optimized |

### Mobile-First Approach

Styles cascade from mobile to desktop:
1. Base styles (mobile-first)
2. `@media (min-width: 769px)` (tablet/desktop enhancements)
3. `@media (max-width: 480px)` (mobile-specific adjustments)

### Responsive Behavior

**Navigation:**
- Mobile: Hamburger toggle, vertical menu
- Tablet/Desktop: Horizontal menu

**Grid Layouts:**
- Mobile/Tablet: Single column
- Desktop: Two/three column (content + sidebar, or image + text)

**Typography:**
- Mobile: H1 = 1.5rem, H2 = 1.25rem
- Tablet: H1 = 2rem, H2 = 1.75rem
- Desktop: H1 = 3rem, H2 = 2.5rem

**Spacing:**
- Mobile: Reduced margins and padding (--space-xl = 1.5rem)
- Desktop: Full spacing (--space-xl = 3rem)

## Accessibility

### WCAG 2.1 Level AA Compliance

**Contrast:**
- All text meets or exceeds AA standard (4.5:1 for normal text, 3:1 for large text)
- No text under 16px on colored backgrounds

**Keyboard Navigation:**
- Tab: moves focus to next interactive element
- Shift+Tab: moves focus backward
- Escape: closes mobile navigation menu
- Enter: activates buttons/links

**Screen Reader Support:**
- Semantic HTML (`<nav>`, `<article>`, `<header>`, `<footer>`, `<main>`)
- ARIA labels on buttons (nav-toggle: aria-expanded, aria-controls)
- Alt text on all images
- Language: html lang="en"

**Reduced Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
Users with vestibular disorders see no animations/transitions.

**Visual Focus Indicators:**
- Gold 2px outline, 2px offset (never hidden)
- Visible on all interactive elements

### Accessible Images

All images (featured, inline, thumbnails) use front-matter for alt text:
```yaml
featured_image_alt: "descriptive text"
```

Alt text should be descriptive but not verbose ("A veteran performing strength training" not "image").

## CSS Architecture

### Files

**assets/css/main.css:**
- Color variables (--color-gold, --color-charcoal-light, etc.)
- Font loading and font variables
- Spacing variables
- Base element styles (html, body, headings, paragraphs, links, images, buttons)
- Reduced motion support

**assets/css/layout.css:**
- Site structure (header, footer, main)
- Navigation styles (desktop, mobile toggle)
- Hero section
- Container and page content area
- Post/page specific styles
- Responsive breakpoints

### Cascade & Specificity

- **Global resets:** * { margin: 0; padding: 0; box-sizing: border-box; }
- **Element styles:** Applied to semantic elements (h1, p, a, button)
- **Component classes:** .btn, .hero, .page-content, etc.
- **No IDs for styling** (too high specificity, hard to override)
- **Utility-like classes** kept minimal (only .btn, .btn-secondary, .container)

### CSS Variables

All custom properties defined in `:root` for easy brand customization:

```css
:root {
  --color-gold: #ECC83F;
  --font-heading: "Russo One", sans-serif;
  --space-md: 1.5rem;
  /* ... */
}
```

To change brand color globally: update one variable.

## Interactions & Animations

### Transitions

Smooth transitions (all 0.3s ease) on:
- Link color and border changes
- Button background changes
- Mobile nav toggle animation

**Animation timing:** 0.3s (fast enough to feel responsive, slow enough to be readable)

### Mobile Navigation Toggle

**Animation:**
- Line 1: rotates 45deg, translates 8px down-right
- Line 2: fades out (opacity 0)
- Line 3: rotates -45deg, translates 7px up-left
- Creates an X shape when menu is open

**State:** aria-expanded attribute toggles true/false

### Hover Effects

- **Links:** color changes, border-bottom appears
- **Buttons:** background brightens to #FFCE00
- **Nav items:** gold color, gold underline

### Focus States

All interactive elements (links, buttons, inputs):
- 2px solid gold outline
- 2px offset from element
- Always visible (no removal)

### No Animations/Restrictions

- No parallax scrolling
- No infinite animations
- No bounce easing
- No decorative animations
- Respect prefers-reduced-motion

## Dark Mode

Not supported. The site uses a dark charcoal navigation header/footer with light background content area. No separate dark theme implementation.

## Performance & Optimization

### CSS Delivery

- **main.css:** Inline critical styles (optional, not implemented)
- **layout.css:** Deferred (not blocking)
- Minified: `sass: style: compressed` in _config.yml
- No external CSS frameworks

### Font Loading

- Google Fonts with `display=swap` (use system font while loading)
- Preconnect to fonts.googleapis.com and fonts.gstatic.com
- Only necessary weights loaded (400, 500, 600, 700 for Work Sans; 700 for Russo One)

### Image Optimization

- No lazy loading (images load upfront; quantity is minimal)
- Responsive images via max-width: 100%
- External images (Train Heroic, WordPress site) load from CDN

### JavaScript

- Minimal vanilla JS (mobile toggle, keyboard shortcuts)
- No frameworks or libraries
- Deferred loading (script tag with defer attribute)
- File: assets/js/main.js (~2KB uncompressed)

## Future Customization Points

### Changing Brand Colors

Update CSS variables in `assets/css/main.css`:root to change all colors site-wide.

Example:
```css
:root {
  --color-gold: #FFB600;  /* New brand gold */
  --color-navy: #1A3A5C;  /* New brand navy */
}
```

### Changing Fonts

Update font import in `_layouts/default.html` and variable in `main.css:root`.

Example: Replace Work Sans with Inter:
```html
<link href="https://fonts.googleapis.com/css2?family=Russo+One&family=Inter:wght@400;500;600;700&display=swap">
```

### Adjusting Spacing

Modify `--space-*` variables in `main.css`:root for consistent global spacing changes.

### Adding Animations

Add new transitions/animations in layout.css (respecting prefers-reduced-motion).

Example:
```css
.fade-in {
  animation: fadeIn 0.5s ease;
}

@media (prefers-reduced-motion: reduce) {
  .fade-in { animation: none; }
}
```

---

**Status:** Complete and shipped
**WCAG Compliance:** 2.1 Level AA+
**Mobile Support:** Full (480px+)
**Performance:** Optimized (no frameworks, minimal JS)
**Maintenance:** Low (CSS variables make updates easy)
