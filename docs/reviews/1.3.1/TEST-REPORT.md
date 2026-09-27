# v1.3.1 weapon / UI / logo patch — test report

Date: 26 September 2026. Source baseline: uploaded `Super-Wiss-Ascension-1.3.0-source.zip`, SHA-256 `034ef124c4f6403ae033abce78cdcc337eaecbf9c49f1b98fd0b3ac1c97f958d`.

## Status

**Source integration candidate, not a compiled/installed Android release.** No new APK or AAB exists for this patch. Final weapon PNGs were not provided; ten slots are pending. Existing body weapons remain baked, without procedural overlays. Native resources/Java were edited but native compilation could not run.

## Executed evidence

| Command / check | Outcome | Evidence |
|---|---|---|
| `npm test` | 203 passed, 0 failed | core-tests.tap |
| `npm run test:weapon-ui` | 24 passed, 0 failed | weapon-tests.tap |
| `npm run validate:maps` | all 15 maps returned zero issues | maps-tests.json |
| `npm run validate` | 321 present assets, 10 explicit pending weapons, 331 registered entries | validate.log |
| `npm run build` | source/JSON compilation and split Android JS/CSS/media packaging successful; Android HTML shell 12,532 bytes | build.log |
| `python tests/weapon-ui-browser.py` | 52 Chromium fixture checks passed | browser-results.json / browser-tests.log |
| `npm run validate:weapon-art` | failed as expected, enumerating ten unprovided PNGs | pending-art-check.log |
| XML/PNG/static package-source checks | 9 passed; XML parsing is not native compilation | package-source-checks.json |
| `./gradlew :app:assembleDebug :app:assembleQa :app:bundleQa :app:lintQa` | failed before compilation while downloading Gradle8.13: UnknownHostException services.gradle.org, exit1 | android-build.log |

The original core suites were retained. Their expected displayed version and solo rules revision were updated for the deliberate 1.3.1 / revision4 changes; a new test explicitly preserves old revision3 records. No failing gameplay test was removed.

## Browser method and limitations

This environment blocks browser navigation to test origins. The suite uses Chromium `page.set_content` on a copy of the standalone preview, with an in-memory localStorage adapter and observation hook. Those fixtures are never shipped in QA/main assets. This is **not** streamed-origin testing, persistence-after-restart evidence, Android WebView testing, device-install testing or Bluetooth radio verification.

Viewports: 640x360, 800x360, 960x443, 1280x720, 1600x738. Each checked staged boot completion with required media, explicit pending weapon count, logo decode, independent saved-avatar/profile name, all ten portrait card bounds/nonoverlap, distinct first-eight portraits, first-row entry, fully reachable last card, re-entry reset and no uncaught JS exception. Extra checks exercised cached registered weapon drawing with a synthetic red swatch and suppressed duplicate overlays on baked body sheets. That swatch exists only in the browser test; it is not a supplied/final weapon PNG and is not bundled.

The compact-layout test first found that a 180px card could not fit the 164px-tall viewport. The final compact rule uses a 148px minimum and 60px contained portrait; the last row passes at 640x360 and 800x360. Partial adjacent rows during deliberate scrolling remain normal scrolling behavior, not overlapping cards.

## Animation validation boundaries

Tests cover explicit profiles for ten heroes, registry lookup, 256x256x1 metadata, deterministic attack frames11/12, finite poses/sockets, valid per-body socket overrides, all normalized PvP profiles, Mira emitting ice shots, and pending-art fallback. They do not certify final hand/weapon alignment without the actual weapon-free body sheets and final PNGs. Existing portrait art still depicts painted weapons. Bow string draw, full per-class hand articulation and new weapon-specific audio are future art/animation work.

## Native and publication boundaries

No Android SDK, ADB, emulator, apksigner or Gradle distribution was installed here. The wrapper JAR checksum verifies, but its download cannot resolve services.gradle.org. Thus no Java/Android resource compilation, SDK lint, APK signing, AAB verification, Android launch/update or physical-device test occurred for this patch. The small split-asset architecture and original save origin/key/schema were retained in source.

Expected artifacts after a successful build on a configured machine:
- app/build/outputs/apk/debug/app-debug.apk
- app/build/outputs/apk/qa/app-qa.apk
- app/build/outputs/bundle/qa/app-qa.aab

These paths are **not existing deliverables**. Build-QA.bat and scripts/build-qa.sh copy QA outputs only after Gradle succeeds. QA is test-signed with the included public certificate, never production signing. Test update installation rather than clearing app data. Use the same candidate version on all local-play devices.

## Scoped changes requiring awareness

Mira changes from the generic melee fallback to ice basic projectiles. Rayan has explicit lance identity but retains old fallback numerical timing. New solo records use revision4 to avoid mixing changed rules with revision3; prior records remain stored. Save schema5, localStorage key and WebView HTTPS origin did not change. Existing procedural weapon-color cosmetic selections remain saved but no longer draw rods.

The requested private Agent Skill files were not retrievable, so this patch is not certified against their unpublished requirements. The final art handoff and source-based quality follow-ups are separate documents.
