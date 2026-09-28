# Tests actually performed for this local WIP

| Check | Result |
|---|---|
| `npm test` | 290 passed, zero failed/skipped/cancelled. Includes feature and weapon tests. |
| `npm run test:atelier` | 87 passed (62 feature + 25 existing weapon/UI tests). This is a subset, not 87 extra independent tests beyond the 290. |
| `npm run validate:weapon-art` | 415 present registrations, zero pending weapon PNGs; 15 maps, 10 heroes, 9 pets. |
| `npm run build` | Successful. Embedded browser HTML ≈35.35 MiB; Android shell 12,894 bytes plus external assets. |
| `node --check app/src/main/assets/game.js` and debug counterpart | Passed JavaScript syntax checks. |
| Source crop comparison | All 84 cropped RGBA images exactly match their source-sheet rectangles. |
| Original weapon archive comparison | All ten installed PNGs byte-identical to `Heroes_weapons-assets.zip`; 1254×1254. |
| `python3 tests/atelier-browser.py` | 48 checks passed; zero JavaScript page errors; 28 screenshots. |
| Final project archive | See `docs/PACKAGE-VERIFICATION.json` and adjacent delivery hash after packaging. |

Browser checks rendered all ten screens at 1672×941 and 960×440; verified shell bounds, stat and baked-art equip blocking, saved explicit null, labelled hero-select/lobby proxy, eligible Wissem weapon selections, all six independent slot clears, disabled missing-art purchase, retained Skills/Fusion and mission tabs, settings toggle/volume, serialized stable IDs, null-equipped actual combat, disabled knife control, PUNCH label, crouch held height26/released44, touch punch execution and resolved IMG elements.

The crouch browser test reads the touch pointer map, not the keyboard-only `keys.crouch` field. This was a correction to the test observation, not a fabricated engine behavior. Pointerdown/hold/up on the actual CROUCH button changes the actual player hurtbox and releases correctly.

Environment: local system Chromium through Python Playwright. Browser navigation restrictions required loading the self-contained HTML with set_content and injecting an in-memory storage shim into the TEST copy. That means these checks validate serialization and UI behavior, **not true browser-origin persistence, Android WebView, native permissions, network/account service behavior or app restarts**. Release source was not modified by that diagnostic injection. Optional font families were unavailable, so screenshots show fallback glyphs.

No Gradle, APK, AAB, native device, Bluetooth, performance/memory/thermal, billing, real sound perception or current store-policy certification was performed. Existing historical QA documents in the source candidate are not evidence for this WIP. Final visual matching still needs human/device review after clean hero art, wardrobe art and chosen fonts are supplied.
