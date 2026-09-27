---
name: player-onboarding-ftue
description: 'First-time-user-experience design: tutorial pacing, time-to-first-fun, and early-session retention. Use for any new player''s first session, tutorial sequence, or onboarding flow.'
---

CORE STAT TO DESIGN AGAINST: most mobile games lose 60-70% of installs within the first session. Every decision in this skill exists to fight that number.

TIME-TO-FIRST-FUN:
- The player must be performing the core action loop (jumping, attacking, moving) within 15-30 seconds of app open — not watching a logo screen, not reading lore, not sitting through an unskippable cutscene.
- Splash/logo screens: under 2 seconds combined, or skip entirely after first launch.
- Any narrative setup must be deliverable AFTER the player has already moved/attacked once, not before — let them touch the game first, explain second.

TUTORIAL STRUCTURE (teach one verb at a time):
- Introduce exactly ONE new mechanic per tutorial beat, in a context where failure is impossible or low-cost (no death, no lost progress).
- Never explain a mechanic in a text box the player must read before acting — instead, put them in a situation where the mechanic is the only viable action, and let a brief on-screen prompt (icon + single short word, e.g. a jump icon over a gap) reinforce it as they discover it.
- Sequence: movement → jump → first enemy (teaches attack) → first hazard requiring the just-taught mechanic combo → first checkpoint/save moment (teaches persistence exists) → first currency pickup (teaches economy exists, but WITHOUT yet showing the shop).
- Do not introduce the shop, currency spending, or any monetization surface until after the player has completed at least one full "win" moment (cleared a section, beat a mini-boss, reached a checkpoint) — leading with monetization before demonstrating fun is a top cause of immediate uninstalls and poor first-session reviews.

FAILURE HANDLING DURING ONBOARDING:
- The first 2-3 player deaths/failures must have near-zero progress loss (respawn at the exact failure point or seconds before) — punishing early failure the same way you'd punish a 20th-hour player teaches new players the game is unfair before they've built any investment to tolerate it.
- Full difficulty/penalty systems (permadeath, full level restart, resource loss on death) should ramp in gradually after the tutorial window, not apply at full force from move one.

SKIPPABILITY:
- Every tutorial element must be skippable for returning players or players who demonstrate mastery early (e.g. if they clear the first section without touching a prompted mechanic, don't force the redundant prompt) — forcing experienced players through a full tutorial on every fresh install (common after a reinstall or on a second device) is a preventable churn cause.

PERMISSION / ACCOUNT REQUESTS:
- Never request notification permissions, account creation, or ad-tracking consent before the player has experienced actual gameplay — front-loading permission dialogs before any gameplay is one of the most common "day-1 uninstall before playing" causes measurable in analytics (ties to telemetry-analytics-instrumentation skill).
- If account creation/login is optional, make guest-play the default path, with account linking offered later (e.g. after first session, framed as "save your progress").

MEASURING SUCCESS (ties to telemetry skill):
- Track: time-to-first-input, time-to-first-death, tutorial completion rate per step (to find the exact step players quit at), and day-1 retention specifically for players who completed vs. abandoned the tutorial.

WHEN DESIGNING OR REVIEWING A TUTORIAL SEQUENCE:
1. Walk through it verb-by-verb and confirm no more than one new mechanic appears per beat.
2. Confirm the shop/monetization surface doesn't appear before the first "win" moment.
3. Confirm death/failure in the first 2-3 attempts costs near-zero progress.
