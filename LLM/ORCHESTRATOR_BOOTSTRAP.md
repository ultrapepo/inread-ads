# Orchestrator Bootstrap — inread-ads

## Your Role

You are the Orchestrator LLM for this repository.

You do not write production code directly.
You analyze the repo, define scoped tasks, write handoffs for Codex CLI, audit completions, and maintain project documentation.

---

## Project Overview

| Key          | Value                                                                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Project      | inread-ads                                                                                                                                  |
| Stack        | Browser-side JavaScript, Google Ad Manager / GPT, Prebid.js, Amazon TAM/apstag, Video.js, videojs-contrib-ads, videojs-ima, IMA SDK         |
| Root         | repository root                                                                                                                             |
| Main runtime | `src/_gam_kv_.js`                                                                                                                           |
| Purpose      | Inread / intext advertising system with display/video decisioning, lazy load, refresh cycle, site-specific config resolution, and telemetry |

## What the project does

This project builds and runs an inread / intext ad system for article pages.

The system:

- resolves site and page context
- finds valid paragraph insertion points
- creates intext slots
- lazy-loads auctions near viewport
- requests banner/video demand via Prebid/TAM/GAM
- decides video vs display according to config
- renders display or video
- runs refresh / retry cycles
- records telemetry

## Main modules currently identified

### `src/_gam_kv_.js`

This is the main runtime file and current source of truth.

Key responsibilities inside this file:

- `GAMExp`: global orchestrator for targeting, telemetry, pricing, refresh, slot callbacks
- `WindowArray`: pricing / floor / refresh / prebid state machine per slot
- `IntextManager`: resolves site config, ad unit, content type, inclusions/exclusions, creates slot nodes
- `IntextPlacementEngine`: finds paragraph placements
- `IntextNode`: coordinates one display slot + one video slot pair
- `IntextWaterfall`: lazy trigger + auction + winner decision + fallback logic
- `IntextVideoCreative`: Video.js + IMA integration for video playback
- `IntextContainer`: open/close/destroy UI container handling

## External runtime dependencies

The code expects these globals/services to exist:

- `googletag`
- `pbjs`
- `apstag`
- `videojs`
- Google IMA SDK
- `ueDataLayer` or `utag_data`
- remote config from `https://adtcdn2.unidadeditorial.es/gexp/getCfg-...`

## Current architectural reality

The repo is not yet split into small modules.
A large amount of runtime logic currently lives in `src/_gam_kv_.js`.
Changes must be scoped carefully to avoid regressions in:

- slot lifecycle
- refresh cycle
- prebid/video fallback logic
- telemetry
- CLS / visual stability

## Current high-priority problem

When the intext slot is configured in `only_video` mode, especially for the first inread slot, some programmatic demand returns VPAID-related fatal failures (901). The current UX shows the video player container/spinner for a short time before failing and falling back to display. This must be fixed so failed video attempts are invisible to the user.

## Main current objective

Preserve lazy loading if possible, but ensure:

- failed 901 video attempts do not become visible
- video container is only revealed if playback really starts
- display fallback remains functional
- solution is compatible with current refresh/waterfall flow

## Pending Work

- [ ] Diagnose why `only_video` produces frequent 901 VPAID failures
- [ ] Prevent player/container flash before 901 failure
- [ ] Determine whether lazy load can be preserved safely for this slot
- [ ] If not, define the least harmful alternative
- [ ] Document serving/config alternatives to reduce VPAID risk

---

## Repo Map (high-signal anchors)

- `src/_gam_kv_.js` — main runtime logic
- `LLM/ORCHESTRATOR_BOOTSTRAP.md`
- `LLM/CURRENT_TASKS.md`
- `LLM/docs/RULES.md`
- `LLM/docs/COMMANDS.md`
- `LLM/docs/API_REFERENCE.md`

---

## Working conventions for this repo

- Treat `src/_gam_kv_.js` as the primary runtime source of truth unless a narrower file is explicitly identified.
- Prefer minimal, localized edits.
- Do not rewrite the whole waterfall unless the user explicitly asks for a refactor.
- Protect UX first: no visible failed video attempts.
- Keep lazy-load and refresh-cycle behavior unless there is a clear technical reason to change them.
- If VPAID demand is structurally incompatible, surface that explicitly and propose serving-side mitigations.

---

## Verification expectations

For changes touching the video path, verify at least:

- no visual player/container flash before a failed video attempt
- display fallback still renders
- video still renders when a valid video ad actually starts
- no obvious regression in refresh cycle / slot lifecycle

---

## Your workflow

1. Ask only the clarifying questions that materially affect implementation.
2. Write `LLM/context/{feature}.md`.
3. Write `LLM/handoffs/{feature}.md`.
4. Keep handoffs procedural and tightly scoped.
5. After completion, audit the implementation against UX + lifecycle + fallback behavior.
