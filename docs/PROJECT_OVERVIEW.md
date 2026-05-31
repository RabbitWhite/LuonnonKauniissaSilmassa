# LuonnonKauniissaSilmassa — Project Overview

<!-- STATUS:BEGIN -->
## Status

- **Current milestone:** Initial content complete
- **Working:** Single-page site loads and renders; image carousel (9 entries) and video carousel (5 entries) populate from JSON; Leaflet map initialises and responds to "Show on Map" from modal; Bootstrap modal opens on carousel item click; mobile nav collapse; responsive layout including small-screen carousel controls and landscape-phone modal adjustments; FontAwesome icons; About card with email and LinkedIn links; Resources section with five external links; GitHub Pages deployment from `main`.
- **Scaffolded / incomplete:** `content/images/Actual_Images/Karhutunturi_1.webp` and `content/images/Preview_Images/Karhutunturi_1_preview.webp` are present on disk but have **no matching entry in `images.json`** — the location is unreachable from the carousel. `content/images/Preview_Images/Video_1_preview.webp` likewise has no JSON entry. `content/videos/` contains six `.mp4` files with paired `_Preview.jpg` files, but `videos.json` links only to YouTube URLs — the local `.mp4` files appear unused. The map default marker (Patvinsuo) is commented out in `scripts.js`.
- **Known technical debt:** `scripts.js` initialises the map on `id="location-map"` (the `<section>` element) rather than `id="leafletMap"` (the inner `<div>`), which may produce sizing issues. Media displayed inside the modal is never actually rendered (the code explicitly notes "Do NOT append media automatically here" without a follow-up path for it). `styles.css` contains a typo in a section comment ("CONTET PAGE SECTIONS"). `.media-container img` / `.media-container video` height is set to `40%` but the parent has no fixed height, making the percentage non-functional.
- **Next planned work:** Wire up Karhutunturi in `images.json`; decide whether local `.mp4` files or YouTube links are canonical for videos; resolve modal media rendering; add map marker for every JSON location.
<!-- STATUS:END -->

---

## Architecture Overview

The site is a single-page application contained entirely in `index.html`. All six content areas (Frontpage, Images, Videos, Map, About, Resources) are `<section>` elements on one scrolling page, linked via an in-page `<nav>`. There is no build step, no templating engine, and no shared partial system — the header and footer are inlined directly in `index.html`. Dynamic content (carousels, map markers, modal details) is generated at runtime by `scripts.js` reading from two JSON data files.

---

## Page Inventory

| File | Purpose | Notes |
|------|---------|-------|
| `index.html` | Single entry point; contains all six sections | Fully self-contained; no sub-pages or includes. Sections: `#frontpage`, `#images-gallery`, `#videos-gallery`, `#location-map`, `#info-section`, `#external-resources`. |

There is only one HTML file. The site is not multi-page.

---

## Asset Inventory

### Styles

| File | Scope | Notes |
|------|-------|-------|
| `styles.css` | Global — all sections | Custom overrides on top of Bootstrap. Defines CSS variables (`--main-font`, `--main-color`, `--accent-color`), scroll-snap layout, carousel controls, modal sizing, info card, resources container, and responsive breakpoints at 768 px and 480 px. Imports Lora from Google Fonts. |
| Bootstrap 5.3.0-alpha1 (CDN) | Global — layout/components | Loaded with SRI hash. Provides grid, navbar, carousel, modal, and utility classes. |
| Leaflet 1.9.3 (CDN) | Map section only | Required stylesheet for Leaflet map tiles and controls. |
| FontAwesome 6.0.0 (CDN) | Icons | Used for nav leaf icons and contact links (envelope, LinkedIn). |

### Scripts

| File | Purpose | Notes |
|------|---------|-------|
| `scripts.js` | All runtime behaviour | `escapeHTML()` XSS sanitiser; Leaflet map init (`DOMContentLoaded`); `loadCarousel()` — fetches JSON and injects carousel items for both galleries; modal open/populate via event delegation on `.open-modal`; "Open in New Window" and "Show on Map" modal button wiring; mobile nav auto-collapse; `goToMap()` — places a marker and smooth-scrolls to map section. |
| Bootstrap bundle 5.3.0-alpha1 (CDN) | Bootstrap JS + Popper | Required for carousel, modal, and collapse behaviour. Loaded with SRI hash. |
| Leaflet 1.9.3 (CDN) | Map rendering | Loaded with `defer` and SRI hash. |

---

## Deployment

The site is hosted on **GitHub Pages** served directly from the `main` branch of `github.com/RabbitWhite/LuonnonKauniissaSilmassa`, with no build step. The live URL is `https://rabbitwhite.github.io/LuonnonKauniissaSilmassa`. There is no CNAME file (no custom domain configured). Deployment is triggered by pushing to `main`; the `content/` directory and all JSON files are part of the repository and served as static assets.

---

## Re-entry Notes

- Read `AGENTS.md` first — it documents the stack, directory layout, coding constraints (no framework, no npm), and agent behaviour rules (always show diff before applying).
- Read `images.json` and `videos.json` before touching carousel or modal logic; all media is driven from these files and must not be hardcoded in HTML.
- The only JavaScript file is `scripts.js`; search for `escapeHTML` before rendering any user-facing or data-driven string — it must be applied to all dynamic HTML insertion.
