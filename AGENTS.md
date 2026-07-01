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

## Discord MCP Missions
These rules apply to any task that uses the Discord MCP server tools.

### Capability Check — Run Before Any Other Steps
- Call discord_list_servers to confirm the bot is connected and retrieve the guild ID. The guild ID is also available in the DISCORD_GUILD_ID environment variable.
- Call discord_get_server_info to verify the bot has the permissions required for the planned operations. Check the following before proceeding:
  - Creating, editing, or deleting channels: requires Manage Channels
  - Managing roles: requires Manage Roles
  - Sending or managing messages: requires Send Messages and View Channel
  - Creating or managing webhooks: requires Manage Webhooks
- List the available MCP tools and confirm every tool the mission requires is present in the manifest. If any required tool is missing, stop and report — do not attempt workarounds such as delete-and-recreate in place of a rename.
- If any capability check fails, stop immediately and report what is missing. Do not proceed with partial execution.

### Safety Rules
- Never delete an existing channel, message, role, or webhook unless the brief explicitly instructs it and explicitly acknowledges that the action is irreversible and may result in permanent loss of message history or configuration.
- Never rename a channel via delete-and-recreate without explicit instruction acknowledging history loss. A true rename (preserving history) requires the edit_channel tool — if that tool is not available, stop and report rather than substituting delete-and-recreate.
- Do one operation at a time. Confirm success of each operation before proceeding to the next.
- Do not modify any channel, role, or permission that is not explicitly listed in the mission brief.

### Common Guild Information
- Bot name: DevHub Agent#0197
- Guild ID: available in DISCORD_GUILD_ID environment variable
- Server name: My Dev Hub
