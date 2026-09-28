# v1.4.1 — local UI polish / source playtest

- Fix unarmed Kael/other baked-body roster identities: preview policy uses actual identity art with an explicit reference-only notice; no save mutation or false clean-body flag.
- Alpha-bound, uniform contain-fit portrait previews include the weapon envelope and a safety margin. Remove selected-red canvas fills.
- Repack supplied source corners into a common 9-slice shell; separate headline diamond rules, normalize panel spacing and icon alignment across ten screens.
- Gallery/cards/detail, illustrated missions, grouped Settings and icon-only HUD refinements. HUD minima:44 logical pixels; Jump/Attack56; edge clearance24 plus safe insets.
- Add visible bent-leg/leaned-torso runtime crouch cutout, not a standing-sprite y-squash. All ten authored crouch packs remain missing; physics44/26 and attack phases unchanged.
- Restore actual small supplied crown sprites in Boss Hunt thumbnails using original enemy source art.
- Add regression and in-memory browser QA, actual before/after captures, updated asset workbook and merged missing-art ledger. No font binary or APK/AAB is included.

---
# v1.4.0 — Atelier source/playtest WIP (2026-09-27)

- Integrate all ten original 1254×1254 weapon PNGs as required/ready assets. Separate Wissem only; retain nine baked hero weapons.
- Add 84 original-pixel UI crops and layouts for all ten requested screens; detailed fidelity remains WIP.
- Add explicit unarmed equipment, deterministic fist phases, calibrated sockets, a clearer crouch control, profile-derived ratings, display-name updates with stable IDs, and stat/art weapon eligibility.
- Add independent hat/top/bottom/shoes/eyewear/weapon-skin save/render contracts. Missing modular art keeps the new item catalog empty.
- Include asset inventory, missing-art briefs, skill decisions, exact historical implementation diffs and browser QA evidence.
- Advance package/runtime version to 1.4.0 and Android versionCode to 45. No application ID, save key or signing certificate change.
- This is a source/playtest tag, not proof of a native build or device QA. Font binaries and the documented hero/cosmetic art gaps remain missing.

---

# v1.3.1 — source candidate, unreleased / native build blocked

- Remove procedural hero/cosmetic weapon rods; add registry-based PNG weapon rendering with frame-indexed sockets and phase-synchronized attack frames.
- Reserve ten final user weapon PNG slots; preserve baked hero weapons until weapon-free body art is supplied. No reference weapons copied.
- Explicit Rayan lance/Mira frost_staff profiles; Mira emits ice basic shots. Correct Loey's display to Sky bow. Solo rules revision4 preserves/restricts old results; save origin/key/schema unchanged.
- Correct saved-avatar identity and profile action label; contain-fit still portraits; fix compact roster clipping and re-entry scroll.
- Integrate supplied logo, W-based adaptive/themed launcher, web/native boot branding.
- Add tests, exact diff, source/art handoff and build-blocker evidence. Historical native fallback is not refreshed.

---
# v1.3.0 — QA candidate (2026-09-25)

- Fixed Heroes and Pets grid sizing; added Shop hero carousel, competitive Records dashboard and Profile tabs.
- Added crouch with ceiling clearance, icon-only active skills and saved first-discovery power-up guides.
- Centralized logical-cell placement validation and runtime pickup placement; reduced power/chest frequency.
- Added hero-specific movement/weapon timing, visible bow/staff/gadget attacks, melee impact pauses and enemy anticipation/recoil.
- Added required underground traversal, climb/lift return and seal-restored bridge, vertical camera tracking, themed regions/backgrounds and environment lanes.
- Preserved streamed Android boot, saves, accounts, four control layouts, modes and temporary summons. New solo records use rules revision 3.
- Added map reachability and responsive browser tests. **Not release-complete:** three full-world Android clears and broader combat/world balance review remain outstanding. See docs/V1.3-VALIDATION.md.

# 1.2.0 — 2026-09-25

- Reproduced and fixed Android boot OOM in loadDataWithBaseURL by streaming APK assets from the existing save origin.
- Added native/JS startup recovery, stage progress, missing-file diagnostics, Retry, Safe Mode and bounded artwork decode concurrency.
- Fixed Windows Gradle hash bootstrap, explicit Bluetooth permission exception handling and API-26 lint errors.
- Added Presets A–D labels and editor mirroring; completed primary navigation labels.
- Added world physics/optional routes, distinct hero combat cadence, cosmetic component overlays, procedural boss dissolution, explicit portal states, rendering budgets and original menu/raid audio.
- Added profile summaries, separated local match history, rules-revision isolation and three Camera Lab choices.
- VersionCode 42; QA identity/signing and local save origin/key preserved.
- Added reproducible browser/emulator tests and BUILDING/TESTING/ASSET-LICENSES documentation.

---

# Changelog

## 1.1.0 — Ascension (2026-09-24)

Added supplied community art with attribution; redesigned loading/home; four saved control
layouts; paired six-digit room admission; shared boss raids and revives; timed pet calls;
Rayan/Mira, outfit palettes, skill books and deterministic fusions; separate local rank rules;
wall slide/jump, boss stagger and practice-only first-person corridor projection.

This is the implemented update to the v1.0.0 repository baseline, not the entire earlier
75MB/console-quality roadmap. The old internal Nightfall4.0 label is historical only.

Guilds, Google login, cloud saves, Internet raids and independently hand-drawn costume/boss
libraries remain future work. QA APK only; physical Android validation outstanding.
