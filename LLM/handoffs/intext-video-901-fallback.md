# Handoff — intext-video-901-fallback

## Read These Files First

- `src/_gam_kv_.js`
- `LLM/context/intext-video-901-fallback.md`
- `LLM/docs/RULES.md`

## Goal

Fix the intext video path so failed video attempts (especially 901 VPAID failures) do not become visible before fallback.

## Scope

Only touch the intext video lifecycle and the display fallback handoff around it.
Do not perform broad refactors.

## Required investigation

Inspect these methods carefully:

- `IntextVideoCreative.requestAds()`
- `IntextNode.buildAndPlayVideo()`
- `IntextWaterfall._requestVideo()`
- any CSS/class logic related to `.video-started`, `.is-open`, loader visibility, and container opening

## Implementation direction

1. Prevent the video container from becoming visibly open at `readyforpreroll`.
2. Reveal the video container only when playback has genuinely started.
3. If video fails before first frame, reject silently and keep the video UI invisible.
4. Preserve display fallback behavior.
5. Preserve lazy loading unless impossible.

## Acceptance checks

- A failed 901 path does not show the player or an open video container before fallback.
- A successful video ad still becomes visible normally.
- Display fallback still appears when video fails.
- No obvious regression in refresh-cycle behavior.

## Deliverables

- code changes
- brief rationale
- completion report in `LLM/completions/intext-video-901-fallback.md`
