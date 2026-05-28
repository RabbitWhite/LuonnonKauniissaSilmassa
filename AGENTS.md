# AGENTS.md — LuonnonKauniissaSilmassa

**Local path:** ~/Workspace/LuonnonKauniissaSilmassa
**GitHub repo:** github.com/RabbitWhite/LuonnonKauniissaSilmassa
**Deployed at:** https://rabbitwhite.github.io/LuonnonKauniissaSilmassa

## Project Overview
Finnish nature photography and media showcase website.
Static site — no build step, no npm, no framework.
Deployed directly via GitHub Pages from main branch.

## Stack
- Vanilla HTML / CSS / JavaScript (no framework)
- Bootstrap 5.3 — layout and components
- Leaflet 1.9.3 — interactive map centered on Finnish national parks
- FontAwesome 6 — icons
- Content loaded from images.json and videos.json

## Project Structure
index.html          — single page entry point
styles.css          — custom styles
scripts.js          — all JS: map init, carousel loader, utilities
images.json         — image metadata (paths, captions, locations)
videos.json         — video metadata
content/
  images/           — all image assets
  videos/           — all video assets

## How To Run
Open index.html directly in a browser — no server needed.
Or serve locally: python -m http.server 8000

## How To Deploy
Push to main — GitHub Pages serves directly from main branch.
No build step required.

## Coding Standards
- Vanilla JS only — do not introduce React, Vue, or any framework
- Do not introduce npm or a build pipeline without explicit approval
- Bootstrap utility classes preferred over custom CSS where possible
- All user-facing strings use escapeHTML() for XSS protection
- Map default center: Patvinsuo National Park [63.0577, 30.3464]

## Content Files
- images.json and videos.json define all media metadata
- Read these files before any work that touches content display or carousel logic
- Do not hardcode content in index.html — all media goes through JSON files

## What NOT To Touch
- CDN integrity hashes on external scripts and stylesheets
- Leaflet map tile attribution
- escapeHTML() utility function

## Agent Behavior
- Always show diff and wait for approval before applying changes
- Never push directly to main without explicit instruction