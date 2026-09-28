# Super Wiss 1.4.1 — UI polish source delivery

> This is the supplied source delivery report. Subsequent project-root integration and native build results are recorded in [docs/BUILD-1.4.1.md](docs/BUILD-1.4.1.md).

All changes are already applied. This folder is the complete editable project, with original media, regenerated browser/Android web assets, tests and reports. **Not an APK/AAB or a pixel-identical recreation of the target artwork.** Android versionCode46; app identity and save keys unchanged.

## Open and inspect
Open `dist/Super-Wiss-Odyssey.html` for the standalone browser preview. Read `docs/UI-POLISH-REPORT.md` for the screen-by-screen changes and limits. Open `docs/ui-polish/GALLERY.html` for targets, before/after screenshots, Kael’s null-weapon regression, and HUD/crouch captures.

## Rebuild and test
```sh
npm test
npm run validate:weapon-art
npm run build
```
Optional Chromium/Playwright checks: `python3 tests/ui-polish-browser.py`. These use a test-only in-memory storage shim/probe. The expected local result is333 Node tests and544 browser checks; browser availability and rendering vary by environment.

`docs/UI-POLISH-CODE.diff` contains exact editable-file diffs against the supplied1.4.0 archive. `docs/ui-polish/CHANGED-FILES.json` lists hashes for all changed/new delivery members excluding itself. Older diff/test documents remain as historical evidence; they are not the new pass’s results.

## Important gaps
The Kael green identity proxy and portrait containment bugs are fixed. All principal screen components have the new frame/spacing/divider treatment. Action HUD buttons are icon-only and logically sized. Crouch is visibly lowered using a temporary articulated cutout.

Exact scene/typeface/pedestal matching, ten authored crouch clip sets, nine clean unarmed combat sets and the populated six-slot wardrobe catalog are unfinished. See `docs/MISSING-ASSETS.md` and the updated `docs/ASSET-INVENTORY.xlsx`. All earlier art requirements are retained.

No GitHub action or upload was performed in this pass. No native Android build/device validation is claimed. The public QA signing key inherited from the source is testing-only.
