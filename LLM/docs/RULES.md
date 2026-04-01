# Project Rules and Invariants

## Active Rules

- Never reveal an intext video container to the user until ad playback has actually started.
- If video fails before first frame (for example 901 / 400 / 1009), fail silently and fall back without showing the video player/container.
- Preserve lazy-load behavior unless the task explicitly proves it is the root cause of the issue.
- For changes in `src/_gam_kv_.js`, prefer narrow lifecycle fixes over broad refactors.
- Do not break display fallback while improving the video path.
