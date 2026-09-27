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
