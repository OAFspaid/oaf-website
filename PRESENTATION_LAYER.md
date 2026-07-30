# Operation Antifragile — Presentation Layer Guide

This document explains how to use the custom layouts and includes for the Operation Antifragile website.

## Available Layouts

### 1. **home** — Homepage with Full-Screen Hero

Use this layout for the main homepage. It features a full-screen hero section with an optional hero image and strong CTA.

**Front Matter:**
```yaml
---
layout: home
title: Operation Antifragile
hero-title: Operation Antifragile  # Optional, defaults to site.title
hero-subtitle: Building resilience through adaptability
hero-image: /assets/images/hero.jpg  # Optional
hero-image-alt: Hero image description
hero-cta: Get Started
hero-cta-url: /program/
---
```

**Content Example:**
```markdown
{% include image-section.html 
  image="/assets/images/section1.jpg"
  image-alt="Section 1"
  title="Why Antifragility?"
  content="Antifragility is the ability to benefit from disorder and uncertainty..."
  cta-text="Learn More"
  cta-url="/about/"
%}
```

---

### 2. **program** — Program/Service Pages

Use this layout for program or service pages. Features a featured image header and optional CTA.

**Front Matter:**
```yaml
---
layout: program
title: The Program
description: A comprehensive approach to building resilience
featured-image: /assets/images/program.jpg
featured-image-alt: Program overview
featured-image-caption: Optional caption
cta-text: Join the Program
cta-url: https://external-link.com/signup
---
```

**Content Structure:**
- Supports Markdown for body content
- Use `{% include image-section.html %}` for image-led sections
- Use `{% include cta-block.html %}` for prominent call-to-action sections
- Use `{% include section.html %}` for text sections

---

### 3. **page** — Standard Pages (About, Legal, etc.)

Use this layout for informational pages like About, FAQ, Terms, Privacy, etc.

**Front Matter:**
```yaml
---
layout: page
title: About Operation Antifragile
description: Learn more about our mission and approach
---
```

**Content:**
- Simple single-column layout
- Full support for Markdown
- Readable typography and comfortable line-length

---

### 4. **post** — Blog Posts

Use this layout for blog articles. Features metadata (date, author), optional featured image, and tag support.

**Front Matter:**
```yaml
---
layout: post
title: Building Resilience in Uncertain Times
author: Jane Doe
date: 2024-01-15
description: How to apply antifragile principles to your organization
featured-image: /assets/images/blog-post.jpg
featured-image-alt: Blog post image
featured-image-caption: Optional caption
tags:
  - Resilience
  - Strategy
  - Culture
---
```

**Content:**
- Standard Markdown for article body
- Metadata displays automatically (date, author, tags)
- Tags are rendered as clickable links

---

## Reusable Includes

### 1. **image-section** — Image-Led Section

Creates a section with an image on one side and text/CTA on the other (alternates on mobile).

**Usage:**
```liquid
{% include image-section.html 
  image="/assets/images/my-image.jpg"
  image-alt="Descriptive text"
  title="Section Title"
  content="Markdown formatted content here..."
  cta-text="Call to Action"
  cta-url="/destination/"
%}
```

**Parameters:**
- `image` — Image path (required)
- `image-alt` — Alt text for image
- `title` — Section heading
- `content` — Markdown content
- `cta-text` — Button text
- `cta-url` — Button destination

---

### 2. **cta-block** — Call-to-Action Block

Creates a prominent CTA section with optional secondary button.

**Usage:**
```liquid
{% include cta-block.html 
  title="Ready to Get Started?"
  description="Join hundreds of leaders building antifragile organizations"
  cta-text="Start Free Trial"
  cta-url="https://external.com/signup"
  secondary-cta-text="Learn More"
  secondary-cta-url="/about/"
%}
```

**Parameters:**
- `title` — Block heading
- `description` — Supporting text
- `cta-text` — Primary button text (required)
- `cta-url` — Primary button URL (required)
- `secondary-cta-text` — Secondary button text (optional)
- `secondary-cta-url` — Secondary button URL (optional)

---

### 3. **section** — Content Section Container

Simple container for organizing text content sections.

**Usage:**
```liquid
{% include section.html 
  title="Section Title"
  content="Your markdown content here..."
%}
```

---

## CSS Variables and Colors

All layouts use these brand CSS variables:

```css
--color-gold: #ECC83F
--color-gold-bright: #FFCE00
--color-charcoal-light: #2D2C28
--color-charcoal-mid: #1E1E1E
--color-charcoal-dark: #000
--color-navy: #17274A
--color-navy-light: #3C4B74
```

Fonts are:
- **Headings:** Russo One (bold, uppercase)
- **Body:** Work Sans (4 weights: 400, 500, 600, 700)

---

## Accessibility Features

The presentation layer includes:

- ✅ Semantic HTML (`<nav>`, `<article>`, `<section>`, `<header>`, `<footer>`)
- ✅ Keyboard navigation (Tab, Escape to close mobile menu)
- ✅ Visible focus states (gold outline on all interactive elements)
- ✅ Skip-to-main-content link (hidden but keyboard-accessible)
- ✅ ARIA labels and roles (navigation, alt text)
- ✅ Reduced-motion support (@prefers-reduced-motion)
- ✅ Sufficient color contrast (WCAG AA+)

---

## Navigation Setup

To add pages to the navigation menu, include this in your front matter:

```yaml
nav-order: 1  # Lower numbers appear first
```

Example:
```yaml
---
layout: page
title: About
nav-order: 2
---
```

---

## Image Guidelines

- Use high-quality images (min 1200px wide for hero/featured images)
- Optimize for web (compress JPG/PNG, consider WebP)
- Always provide `alt` text for accessibility
- Store images in `/assets/images/` directory

---

## Content Examples

### Homepage with Multiple Sections

```markdown
---
layout: home
hero-title: Operation Antifragile
hero-subtitle: Build strength through adaptability
hero-image: /assets/images/hero.jpg
hero-cta: Learn More
hero-cta-url: /program/
---

{% include image-section.html 
  image="/assets/images/benefit-1.jpg"
  image-alt="Benefit 1"
  title="Resilience Through Uncertainty"
  content="Learn how antifragile principles help organizations thrive during change..."
%}

{% include cta-block.html 
  title="Ready to Transform?"
  cta-text="Start Your Journey"
  cta-url="https://external.com/signup"
%}

{% include image-section.html 
  image="/assets/images/benefit-2.jpg"
  image-alt="Benefit 2"
  title="Sustainable Growth"
  content="Build sustainable competitive advantages..."
%}
```

---

## Workflow Notes

1. **Shape First:** Create content structure before refining copy
2. **Distinguish by Type:**
   - **Persuade:** Use `home` and `program` layouts (hero, CTAs, image-led sections)
   - **Read:** Use `page` and `post` layouts (clear typography, readable single-column)
3. **Polish:** Review contrast, focus states, mobile responsiveness
4. **Audit:** Verify all links work, images load, no accessibility issues

---

## Troubleshooting

**Mobile menu not working?**
- Check that `main.js` is loading (DevTools > Network tab)
- Ensure JavaScript is enabled

**Fonts not loading?**
- Check browser DevTools > Network tab for Google Fonts requests
- Verify internet connection

**Images not showing?**
- Verify image path is correct (use `/assets/images/` prefix)
- Check file exists in repository
- Ensure image file format is supported (JPG, PNG, WebP)

**Styling looks off?**
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Verify CSS files are loading in DevTools

---

## Questions?

Refer to:
- **Layout files:** `_layouts/`
- **Includes:** `_includes/`
- **Styles:** `assets/css/main.css` (brand colors/fonts) and `assets/css/layout.css` (layout styles)
- **Scripts:** `assets/js/main.js` (accessibility & interactivity)
