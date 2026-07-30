# Operation Antifragile — File Structure

```
oaf-website/
├── _layouts/                    # Page templates (not using minima)
│   ├── default.html             # Base template with <html>, <head>, <body>
│   ├── home.html                # Homepage with full-screen hero
│   ├── page.html                # Standard pages (about, legal, etc.)
│   ├── post.html                # Blog articles with metadata
│   └── program.html             # Program/service pages
│
├── _includes/                   # Reusable HTML components
│   ├── header.html              # Sticky navigation bar
│   ├── footer.html              # Dark footer with links
│   ├── image-section.html       # Image-led section (alternating layout)
│   ├── cta-block.html           # Call-to-action block
│   └── section.html             # Text section container
│
├── assets/
│   ├── css/
│   │   ├── main.css             # Brand colors, fonts, typography, buttons
│   │   └── layout.css           # Layout components, responsive design
│   ├── js/
│   │   └── main.js              # Mobile menu, keyboard nav, accessibility
│   └── images/                  # (Create this for your images)
│       ├── hero.jpg
│       ├── section1.jpg
│       └── ...
│
├── _config.yml                  # Jekyll configuration (theme: minima left for compatibility)
├── _site/                       # Build output (generated, don't edit)
├── Gemfile                      # Dependencies (no changes needed)
├── index.md                     # Homepage content (layout: home)
├── 404.html                     # 404 page (layout: page)
├── PRESENTATION_LAYER.md        # Content creator guide
├── HANDOFF.md                   # Coordination guide
└── README.md                    # Original project README
```

## Key Files by Role

### Content Creators (Linus)
- `PRESENTATION_LAYER.md` — How to create pages and use layouts
- `_layouts/` — Available layout templates
- `_includes/` — Reusable components for content
- `index.md` — Edit to add homepage content

### Copy Editors (Basher)
- `_layouts/post.html` — Blog post structure
- `_layouts/page.html` — Standard page structure
- `PRESENTATION_LAYER.md` — Understand content structure

### DevOps/Deployment (Yen)
- `_config.yml` — Set `url` and `baseurl` at launch
- `assets/` — Custom assets (no theme dependencies)
- `Gemfile` — No changes needed
- `HANDOFF.md` — Deployment notes

## Color Reference

| Name | Hex | Usage |
|------|-----|-------|
| Gold (Primary) | #ECC83F | CTAs, accents, header/footer borders |
| Gold (Bright) | #FFCE00 | Hover states, focus indicators |
| Charcoal Light | #2D2C28 | Primary text, headings |
| Charcoal Mid | #1E1E1E | Background in dark sections |
| Charcoal Dark | #000 | Strong text, button text on gold |
| Navy | #17274A | Link color, secondary accents |
| Navy Light | #3C4B74 | Secondary text, metadata |

## Typography

| Element | Font | Weight | Style | Size |
|---------|------|--------|-------|------|
| Headings | Russo One | 700 | UPPERCASE, letter-spaced | 4rem–1rem |
| Body Text | Work Sans | 400 | Normal | 1rem |
| Bold Text | Work Sans | 500–700 | Normal | 1rem |
| Buttons | Russo One | 700 | UPPERCASE, letter-spaced | 1.25rem |
| Navigation | Work Sans | 500 | UPPERCASE, letter-spaced | 0.875rem |

## Layouts

| Layout | Use For | Key Features |
|--------|---------|--------------|
| `default` | Not used directly (base for others) | HTML structure, head, fonts, CSS |
| `home` | Homepage | Full-screen hero, content sections |
| `page` | About, Legal, FAQ | Single-column, readable layout |
| `post` | Blog articles | Featured image, metadata (date/author/tags) |
| `program` | Programs, Services | Hero image, description, strong CTA |

## Includes

| Include | Use For | Parameters |
|---------|---------|------------|
| `header` | Navigation | Auto-included in default.html |
| `footer` | Footer | Auto-included in default.html |
| `image-section` | Image + text sections | image, title, content, cta-text, cta-url |
| `cta-block` | Call-to-action sections | title, description, cta-text, cta-url |
| `section` | Text sections | title, content |

## CSS Variables (in main.css)

```css
/* Colors */
--color-gold: #ECC83F;
--color-gold-bright: #FFCE00;
--color-charcoal-light: #2D2C28;
--color-charcoal-mid: #1E1E1E;
--color-charcoal-dark: #000;
--color-navy: #17274A;
--color-navy-light: #3C4B74;

/* Fonts */
--font-heading: "Russo One", sans-serif;
--font-body: "Work Sans", sans-serif;

/* Spacing */
--space-xs: 0.5rem;
--space-sm: 1rem;
--space-md: 1.5rem;
--space-lg: 2rem;
--space-xl: 3rem;
--space-2xl: 4rem;

/* Typography */
--text-base: 1rem;
--text-lg: 1.25rem;
--text-xl: 1.5rem;
--text-2xl: 2rem;
--text-3xl: 2.5rem;
--text-4xl: 3rem;
```

## Responsive Breakpoints (in layout.css)

- **1024px and above:** Desktop layout (full-width, side-by-side sections)
- **768px–1023px:** Tablet layout (optimized spacing, single-column sections)
- **Below 768px:** Mobile layout (mobile menu toggle, stacked layout)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)
- IE11: Not supported (no fallbacks included)

## No Dependencies on Minima Theme

The presentation layer is now **100% independent**:
- ✓ Custom layouts (not from minima gem)
- ✓ Custom CSS (not from minima gem)
- ✓ Custom JavaScript (not from minima gem)
- ✓ Custom includes (not from minima gem)

The `minima` gem remains in Gemfile for backwards compatibility, but Jekyll will use the custom `_layouts/`, `_includes/`, and `assets/` directories instead.
