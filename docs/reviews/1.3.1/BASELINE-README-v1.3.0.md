# Super Wiss Ascension — v1.3.0 QA candidate

Android landscape action-platformer, continued from the existing v1.2 codebase. This candidate is **not release-complete**: full early-, middle- and late-world Android clears and broader world/combat balance review remain outstanding.

## What changed

Responsive Heroes/Pets cards, visual Shop hero carousel, full-width Records dashboard and a six-tab Profile. Combat now includes crouch, distinct movement/timing profiles, procedural weapon motion, bow/staff/gadget projectiles and enemy anticipation/recoil. Power-ups are rarer, use central placement checks and show saved first-discovery guides. Worlds gain required underground traversal, return climbs, a seal-powered lift/bridge, vertical camera tracking and themed environmental lanes.

## Preserved

Offline guest play; optional account backend; Adventure, Boss Hunt, Endless, Daily and local friend modes; temporary summons; four editable analog/arrow control presets; Camera Lab; graphics modes; existing saves and cosmetics. Guilds remain a placeholder.

## Build and test

- `npm test` — game and regression tests.
- `npm run validate:maps` — occupancy and conservative terrain-route validation for all 15 worlds.
- `npm run validate` — asset manifest validation.
- `npm run build` — streamed Android assets plus the standalone browser bundle.
- `npm run test:ui`, `node tests/upgrade-gameplay.cjs`, `npm run test:browser` — responsive UI, discovery/crouch and startup recovery checks.
- Android builds require JDK 17 and the Android SDK. See [BUILDING.md](BUILDING.md).

## Architecture

`game/` contains the existing fixed-step engine, renderer, touch UI, content, save and local multiplayer systems. `placement.js` centralizes spawn reservations; `combat-profiles.js` defines class timing/movement; `world-regions.js` extends regional geometry; `upgrade-ui.js` implements the new menu panels. `scripts/bundle.mjs` streams raw APK assets through the native same-origin loader: Android never loads the old giant embedded HTML document.

## Evidence and limits

203 Node tests pass. All 15 maps pass the static route/occupancy validator. Android regression exercised boot, movement, attack/dodge, knife, both skills, temporary summon, four presets, an ordinary-input boss victory and save restart. These are not three completed campaign worlds. See [current validation](docs/V1.3-VALIDATION.md), [TESTING.md](TESTING.md), [CHANGELOG.md](CHANGELOG.md) and [ASSET-LICENSES.md](ASSET-LICENSES.md).

QA APK/AAB files use the public test certificate; production distribution needs private signing. The reference screenshots inspired composition only: no watermarked or copyrighted reference pixels were imported.
