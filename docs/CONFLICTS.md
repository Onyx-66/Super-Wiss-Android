> v1.4.1 UPDATE: see UI-POLISH-REPORT.md for the Kael identity-versus-combat correction, temporary articulated crouch fallback, and source-art/typeface fidelity limits. The historical conflicts below remain unless explicitly resolved by that report.

# Conflicts and their actual resolution

| Requests in tension | Resolution in this candidate | Remaining limitation |
|---|---|---|
| Install real weapons versus avoid double weapons | All ten PNGs installed and visible in loadout catalog; only visually verified weapon-free Wissem switches to separate. | Nine baked heroes cannot show separate equipped art until clean rigs exist. |
| Hammer for Garsi / lance for Rayan versus current body art | Keep stable IDs `garsi` / `rayan`, display Bront / Sol, retain baked shields and flag mismatches. No stacked hammer/lance. | Correct body/animation silhouettes required; current gameplay presentation remains shield-themed. |
| Everybody unarmed versus no weapon erasure | Real null-equipment mechanics, fist hitboxes and phases for everyone; Wissem uses existing clean art; nine use explicit training proxies. | Unique authored unarmed poses absent for nine heroes; proxy is a visible WIP, not completed art. |
| Correct sockets versus immutable armed sheets | Calibrate real PNG anchors; supply frame-indexed main/offhand Wissem sockets; block foreign weapons on baked bodies. | Other rigs not calibrated because their clean body data does not exist. |
| Stat restrictions versus signature ownership | Thresholds chosen using derived ratings and checked against all ten signatures; no exception/bypass needed. | Some other classes qualify numerically but are art-blocked. |
| Cosmetic expansion versus single flattened outfit | Six-slot save/data/renderer contracts, modular clean-base/front-mask validation, empty ready catalog; legacy entitlements preserved. | Five clothing layers per variant, masks, previews and actual weapon-skin designs require art and populated shop-card integration. |
| Monetization expansion versus no combat advantage | Future piece inventory is tier-1 cosmetic-only; no paid stats, changed XP curve or extra currency source. | Future prices and earned-session affordability must be modeled when a real catalog exists. |
| Save stability versus changed combat comparisons | Hero IDs/save key unchanged; explicit null preserved; revision 5/Open records isolate changed loadouts, archive 1–4. | Downgrading to an old app can strip unknown new fields; back up saves. |
| Exact font/style request versus no packaged font binaries | Pixelify Sans/VT323 declared with offline fallback, gradient and optional user-side installer/build support. | No selected font files in ZIP; stock Android default is not the exact chosen typeface. |
| Exact mockup scenery versus only composite mockups and UI sheets | Crop source sheets exactly; retain existing cosmic backdrop and procedural pedestal instead of pretending mockups provide clean backgrounds. | Isolated backdrop/pedestal/mode-card scenery, some badges and final typography need polish. |
| Melee skill startup 3–6 frames versus broad combat 60–100ms | Prioritize the explicitly requested melee-specific 3–6-frame rule; fastest fists start at 50ms. Recovery remains at least dodge length. | This is a disclosed tuning choice, not both constraints satisfied exactly. |
| User asks all diffs in chat versus very large bundled source | Full project is already edited; exhaustive verbatim textual diff and explicit old/new handwritten-code report are supplied with exact file index inside the ZIP and as readable downloads. | Binary image changes cannot have meaningful verbatim code lines; paths, hashes and provenance are supplied instead. |

No use of GitHub is needed to extract or run this delivery. No false commit hash, Actions URL, release APK or claim of fully finished artwork is supplied.
