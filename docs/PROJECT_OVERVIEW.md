# LuonnonKauniissaSilmassa — Project Overview

<!-- STATUS:BEGIN -->
## Status

| Field | Detail |
|---|---|
| Current milestone | Initial content complete — deployed to GitHub Pages |
| Working | Single-page layout, scroll-snap sections, image carousel, map section, Bootstrap responsive layout, JSON-driven media loading |
| Scaffolded / incomplete | `Karhutunturi_1.webp` on disk but absent from `images.json`; `Video_1_preview.webp` has no JSON entry; six local `.mp4` files in `content/videos/` but `videos.json` uses YouTube URLs only |
| Known technical debt | Map initialised on `id="location-map"` (`<section>`) instead of `id="leafletMap"` (`<div>`) — map silently fails to render; modal media never rendered — code path for appending image/video elements is missing; `.media-container` height set to 40% with no fixed-height parent — unreliable sizing |
| Next planned work | Fix Leaflet map id mismatch; implement modal media render path; resolve local vs YouTube video inconsistency |
<!-- STATUS:END -->

---

## Architecture Overview

Single-page static site with no build step. All content is in one `index.html` file organised as six vertical scroll-snap sections. Media content (images and videos) is loaded dynamically from `images.json` and `videos.json` via `scripts.js`. Bootstrap CDN handles the grid and base layout; `styles.css` overrides for scroll-snap, modal sizing, carousel controls, and responsive breakpoints. Deployed directly from `main` to GitHub Pages with no CI step.

---

## Page Inventory

| File | Purpose | Notes |
|---|---|---|
| `index.html` | Single entry point — entire site | Six scroll-snap sections: hero, image carousel, map, video, info card, resources. No sub-pages, no templating. |

---

## Asset Inventory

### Styles

| File | Scope | Notes |
|---|---|---|
| `styles.css` | Global | Scroll-snap container and section sizing, modal dimensions, carousel controls, info card layout, responsive breakpoints. Bootstrap CDN loaded separately via `<link>` in `index.html`. |

### Scripts

| File | Purpose | Notes |
|---|---|---|
| `scripts.js` | All interactivity | Leaflet map initialisation, carousel loading from `images.json`, modal wiring, `escapeHTML()` XSS guard, `goToMap()` scroll helper. Video section loads from `videos.json`. |

### Data

| File | Purpose | Notes |
|---|---|---|
| `images.json` | Image carousel entries | 9 entries. `Karhutunturi_1.webp` exists on disk but is absent from this file. |
| `videos.json` | Video section entries | 5 entries, all YouTube URLs. Six local `.mp4` files exist in `content/videos/` but are not referenced here — inconsistency unresolved. |

---

## Deployment

Hosted on GitHub Pages, deployed directly from the `main` branch. No build step, no bundler, no CNAME. The site root is the repo root. Pushing to `main` is a deploy. No `dist/` directory — everything served as-is.

---

## Re-entry Notes

- Start with `scripts.js` — it owns all runtime behaviour. Understanding the carousel loader and modal wiring gives you the full picture quickly.
- `images.json` and `videos.json` are the content layer — adding or changing media means editing these files, not `index.html`.
- The Leaflet map id mismatch (`location-map` vs `leafletMap`) means the map section will appear blank in the browser until fixed — do not mistake this for a missing asset issue.
- Browser verification still needed: modal media rendering, Leaflet map sizing and display, and reachability of the five external resource links in the Resources section.
