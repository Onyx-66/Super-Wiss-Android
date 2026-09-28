> Historical v1.4.0 delivery report. For the current applied correction read **UI-POLISH-DELIVERY.md**.

# Super Wiss — v1.4.0 Atelier source/playtest

This is a **full project**, not a patch. Changes are already applied. Start here rather than historical build notes elsewhere in the candidate. The original local WIP delivery was prepared without GitHub or a native build. This publication carries that implementation forward as package version 1.4.0, Android versionCode 45; UI revision is `local-atelier-1`, comparable-run rules revision is 5.

## What is complete
| Task | Status | Scope |
|---|---|---|
| Step 0 | Complete locally | Ten byte-identical original PNGs; 1254×1254; required/ready registrations; tests updated. |
| 1 — layering | Complete audit and configuration | Only Wissem is separate; nine stay baked. Hammer/lance visual conflicts documented. |
| 2 — ten-screen UI | Partial visual delivery | Shared shell, 84 source-pixel crops, page layouts and interactions implemented. Not pixel-identical to mockups; background/pedestal/font and detailed embellishment gaps remain. |
| 3 — crouch | Complete locally | Actual down-chevron crop, CROUCH label, hold/release semantics retained and browser-tested. |
| 4 — unarmed / holding | Partial art delivery; combat implemented | Null equipment, deterministic fist phases, distinct hitbox, sockets, saved selection. Wissem uses real weapon-free frames; nine use an explicitly labelled training proxy. |
| 5 — hero ratings | Complete locally | Fixed Power/Magic/Speed/Stamina derived from original profiles; no new XP power multiplier. |
| 6 — names | Complete locally | Nine display renames; internal hero IDs and existing save key unchanged. |
| 7 — six-slot wardrobe | Partial content delivery; foundation implemented | Independent saves, ownership/purchase validation, layer contract and UI. Ready-piece catalog is empty because no modular clothing art exists. |
| 8 — eligibility | Complete locally | All ten signatures pass ordinary stat rules without exemptions; separate art gate prevents foreign weapons on baked bodies. |
| 9 — fonts | Partial | Family selection, hierarchy, gradient, Canvas fallback and optional build wiring implemented. No font binaries included; stock Android uses monospace fallback. |

## Sources actually used
The base was the locally available `Super-Wiss-1.3.1-Source-Candidate.zip`, root `Super-Wiss-Ascension-1.3.1/`. All 16 skill ZIP attachments were extracted into `agent-skills/<skill>/`; their entire SKILL.md contents were read before implementation. All ten `sw_*` mockup PNG attachments were visually inspected and copied into `design/references/ui/`. The three actual `Assets_*.png` sheet attachments were inspected and copied into `art-source/ui/`; crops are from original pixels, not generated replacements. Weapons came from `Heroes_weapons-assets.zip`. No claim of reading a live repository checkout is made in this turn. Full hashes are in `docs/SOURCE-PROVENANCE.json` and the workbook.

## Run the already built project
Open `dist/Super-Wiss-Odyssey.html` in a normal desktop browser. This is a single embedded-file preview with all image/audio assets. For a local origin use `npm run serve` and follow its printed address. Android web assets are already synchronized under `app/src/main/assets/`, including `game.html`, `game.js`, `style.css`, `boot.js` and all registered assets. Native Android sources are retained; Gradle version metadata is bumped to 1.4.0-playtest / 45; these assets are not an APK.

Rebuild/test with:
```sh
npm test
npm run validate:weapon-art
npm run build
```
`npm run test:atelier` runs the 87-test feature subset. The full suite includes that subset; do not add the counts together. Optional screenshot/interaction QA: `python3 tests/atelier-browser.py` (Python Playwright and Chromium required; `CHROMIUM` may override `/usr/bin/chromium`). This test injects an in-memory diagnostic hook/storage shim only into its test page, not into release source.

No font download occurs during the ordinary build or gameplay. Optional font setup on your development machine is described in `docs/FONT-SETUP.md`.

## Read the evidence
- `docs/ASSET-INVENTORY.xlsx`: all 415 runtime asset registrations, the 84 crops, source provenance, formula-derived stats and eligibility matrix.
- `docs/MISSING-ASSETS.md` and `.csv`: per-hero unarmed, modular body, clothing-slot and weapon-skin production requirements.
- `docs/UI-ASSET-MAPPING.md`: each screen → source sheet/crop → code references; includes unused crops rather than falsely claiming all crops are displayed.
- `docs/HERO-STATS.md`: values, formulas, judgments, all ten weapon eligibility columns and phased fist timings.
- `docs/SKILL-DECISIONS.md`: exact skill paths, cited rule text and application/limitations.
- `docs/CONFLICTS.md`: baked-body conflicts, fairness/save handling, fonts and fidelity limitations.
- `docs/OLD-NEW-CODE.md`: verbatim OLD/NEW handwritten-source changes with file paths; `docs/CHANGES.diff` contains the full machine-applicable text comparison, including new source/doc files and generated text bundles. These are evidence only; do not apply them to this already-updated project.
- `docs/CHANGE-INDEX.md` / `.json`: every changed/new file, baseline/new SHA-256 and binary notices.
- `docs/qa-local/TEST-RESULTS.md`, logs and 28 PNG screenshots: tests actually performed.

## Release cautions
This is a **reviewable WIP candidate**, not store-ready certification. Nine unarmed proxies deliberately do not impersonate authored final hero art. Bront still visually carries his baked shield rather than the new hammer; Sol still carries the baked shield rather than the new lance. The six-slot store has no new ready pieces for sale. Normalized local PvP retains its established common profile, does not gain equipment power and was regression-tested rather than redesigned. Native WebView, device performance, real persistent storage/network/account behavior, Bluetooth, billing and perceived audio quality still require device QA. Historical files under `qa/` or `artifacts/` describe earlier builds; they are not results for this WIP.
