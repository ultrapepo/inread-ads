# Handoff — intext-video-901-fallback

## Objective

Implement a minimal, localized fix so that intext/inread video attempts that fail before actual playback never become visible to the user.

The scope is strictly limited to the current intext video lifecycle in `src/_gam_kv_.js`.

Do **not** perform broad refactors.

## Problem summary

Current behavior in the repo:

- intext video can win the waterfall
- `IntextVideoCreative.requestAds()` opens the video container on `readyforpreroll`
- some programmatic VPAID responses then fail with fatal IMA/VPAID errors such as `901`
- the user sees the video slot / spinner briefly before fallback or close

This violates the repo rule:

- never reveal an intext video container until ad playback has actually started

## Important constraints

- keep lazy-load behavior unless the implementation proves it must change
- keep display fallback behavior intact
- do not rewrite the whole waterfall
- do not change unrelated display logic
- do not perform config-wide bidder refactors in this task

## Primary hypothesis

The visible flash is caused by the UI lifecycle, not by the lazy trigger itself.

Specifically:

- `readyforpreroll` is too early to reveal the slot
- a VPAID ad can still fail after `readyforpreroll` and before real playback
- the CSS currently hides `.video-js` before `.video-started`, but the container/spinner can still become visible

## Files to edit

- `src/_gam_kv_.js`

## Exact code areas to inspect

Focus on these classes and methods:

1. `IntextVideoCreative.requestAds()`
2. `IntextVideoCreative.render()`
3. `IntextNode.buildAndPlayVideo()`
4. `IntextWaterfall._requestVideo()`

## Required implementation behavior

### 1) Do not reveal the video container on `readyforpreroll`

In `IntextVideoCreative.requestAds()`:

- keep the event for logging if useful
- remove the behavior that opens the slot or makes it visible on `readyforpreroll`
- do not call `this.node.videoContainer.open(...)` there
- do not make opacity/height/display changes there that reveal the container

### 2) Reveal only on confirmed playback start

The container should become visible only when there is a strong signal that the ad has actually started.

Preferred reveal trigger order:

1. native IMA `STARTED`
2. `adstart` only if followed by a robust real-playback confirmation
3. `timeupdate` with `currentTime() > 0` as fallback

Implementation intent:

- the first successful real-playback signal should:
  - hide spinner
  - add `.video-started`
  - open the container
  - resolve the pending video promise

Do not reveal earlier.

### 3) Fail silently before first playback

If `adserror`, `adtimeout`, or equivalent failure happens before the reveal condition:

- reject the video attempt
- destroy the player
- close/destroy the video container silently
- do not leave visible empty video UI behind

This must be true especially for errors like:

- `901`
- `400`
- `1009`

### 4) Preserve fallback to display

Do not break the existing fallback path.

Current expectation:

- if video request fails in a mode/path where display fallback is allowed, the display path must still run
- if the current mode does not allow immediate fallback, keep the existing behavior unchanged
- this task is about invisible failure before playback, not about redesigning decision policy

### 5) Keep lazy-load unless proven incompatible

Do not remove or rewrite:

- `setupIntersectionTrigger()`
- `setupTimerTrigger()`

Only note in comments/logging if a timing issue is observed, but the implementation should assume lazy load remains enabled.

## Suggested implementation approach

### Step A — localize the reveal logic

Inside `IntextVideoCreative.requestAds()`:

- introduce a single guarded function responsible for first reveal, for example current `revealPlayer()`
- ensure this function is the **only** place that:
  - opens the video container
  - adds `.video-started`
  - hides the visible loading state
  - resolves success

At the moment the code already centralizes part of this behavior in `revealPlayer()`, but `readyforpreroll` still opens the container early. Remove that early open.

### Step B — keep DOM/player initialization hidden

It is acceptable to:

- create the `<video>` element
- initialize Video.js
- initialize IMA
- request ads

while the container stays visually collapsed/hidden.

### Step C — tighten pre-playback failure handling

In `adserror` / `adtimeout` handling:

- if playback was never confirmed, reject immediately
- destroy shortly after if needed
- do not reveal any loader or placeholder state before fallback

### Step D — do not broaden scope

Do not in this task:

- change bidder lists broadly
- change `buildGAMVideoTagUrl()` serving parameters globally
- change `decision.mode` policy
- redesign refresh cycle logic

You may add concise debug logs if they help distinguish:

- `readyforpreroll`
- actual reveal
- pre-playback failure
- post-start failure

## Acceptance criteria

A change is correct only if all of these are true:

1. a `901` before real playback produces no visible player/container flash
2. the user never sees the video spinner/container for a video that fails before playback
3. display fallback still works where it already worked before
4. successful video fills still become visible and play normally
5. lazy-load behavior remains intact
6. no broad refactor was introduced

## Verification guidance

Manually validate at least these scenarios:

### Scenario 1 — failing VPAID / 901 before playback

Expected:

- no visible video slot expansion
- no visible spinner/player flash
- then normal downstream fallback/close behavior

### Scenario 2 — valid playable video

Expected:

- slot stays hidden while loading
- slot becomes visible only once playback truly starts
- display slot is discarded only after successful video start as before

### Scenario 3 — display path after video failure

Expected:

- no stuck hidden state
- no orphaned video wrapper blocking display
- display still renders in the same waterfall path where it previously did

## Notes for diagnosis only

The repo strongly suggests a mixed issue:

- root error frequency likely comes from programmatic VPAID demand / serving
- visible UX problem comes from opening UI too early in code

This task fixes the UX/lifecycle side only.

Serving-side mitigations such as restricting VPAID are out of scope for this implementation unless you need to mention them in comments or audit notes.

## Deliverable

Make the minimal code change in `src/_gam_kv_.js` and keep the diff tightly scoped to the intext video reveal/failure lifecycle.
