# Context — intext-video-901-fallback

## Problem

`only_video` mode in the first inread slot frequently produces fatal 901 VPAID failures from programmatic demand.
The current UX shows the video container / spinner briefly before failing and falling back to display.

## Desired outcome

If video fails before actual playback:

- the user must not see the video player
- the user should not see a transient broken video container
- display fallback should remain possible

## Constraints

- Keep lazy load if possible
- Avoid broad refactors
- Preserve current waterfall and refresh-cycle behavior unless necessary
- Maintain current successful video playback behavior for valid video ads

## Suspected code areas

- `IntextVideoCreative.requestAds()`
- `IntextNode.buildAndPlayVideo()`
- `IntextWaterfall._requestVideo()`
- CSS behavior for `.gexp-intext-slot` and `.video-started`

## Acceptance criteria

- 901 before playback produces no visible player/container flash
- video slot is only revealed after confirmed playback start
- display fallback still works
- no obvious regression for successful video fills
