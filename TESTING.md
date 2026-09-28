# Validation — Super Wiss Ascension 1.4.1

Current Android version: **1.4.1-playtest**, versionCode **46**. Run `npm test`, `npm run validate:weapon-art`, and `npm run validate:maps` from the project root. Build and lint the installable QA APK with `./gradlew :app:assembleQa :app:lintQa` using JDK 17 and Android SDK 36. Current local build results are recorded in [docs/BUILD-1.4.1.md](docs/BUILD-1.4.1.md).

The supplied UI evidence is documented in [UI-POLISH-DELIVERY.md](UI-POLISH-DELIVERY.md). All v1.3.1 and older results below are historical.

## Historical v1.3.1 source verification

Read [this patch's report](docs/reviews/1.3.1/TEST-REPORT.md). No native compilation/installation succeeded here. All Android successes below are historical and must not be applied to this candidate. Real weapon art remains pending.

---
# Current validation: v1.3.0 QA candidate

See [v1.3 validation and acceptance gaps](docs/V1.3-VALIDATION.md). The results below describe the previous v1.2 release and must not be read as v1.3 full-world certification.

# Validation — Super Wiss Ascension 1.2.0

Executed 2026-09-25 on Windows. This report replaces the earlier 1.1.0 no-device-test limitation for the checks listed below. It does not imply testing on physical phones.

## Reproduced boot failure

Installed the original `artifacts/Super-Wiss-Ascension-1.1.0.apk` in the installed Resizable Experimental AVD. It crashed in `MainActivity.onCreate` → `WebView.loadDataWithBaseURL` → `android.util.Base64.encodeToString` with `OutOfMemoryError`. The trace reports a failed 23,698,112-byte allocation at a 201,326,592-byte heap limit. See `artifacts/baseline-crash.txt`.

The old HTML file was 17,542,743 bytes. The new Android HTML shell is about 12 KB and streams JS/CSS/media from APK files. The Java heap no longer holds/re-encodes the media document. File/content access remains disabled, and the old HTTPS save origin is preserved.

## Executed checks

- Official Gradle: `assembleQa`, `bundleQa`, `lintQa`, `assembleDebug`, `lintDebug` — successful. Lint: zero errors, eight warnings (including launcher/localization and deprecated-platform guidance). See `artifacts/gradle-final.log` and `app/build/reports/lint-results-qa.txt`.
- `npm test`: **165 tests passed**, zero failures. Includes movement/combat, pets, all boss phase state machines, save migration, account API, six-digit admission, shared raids/revives, 2v2 normalization, added world physics, cosmetics, rules metadata, and 15 distinct arena layouts. Boss state-machine fixtures are not 15 manual boss clears.
- `npm run validate`: **320 manifest assets**, 15 worlds, 10 heroes, 9 pets/fusions. All files present with valid dimensions/metadata.
- Browser integration: **18 checks passed**. Real streamed files, home, eight cosmetic slots, profile placeholder, empty real-only match history, every mirrored control, four presets and switching, storage reload, syntax failure, missing-image failure, Retry, and read-only Safe Mode. The one recorded syntax exception is deliberately injected by the negative test; it is expected. See `artifacts/boot-browser-results.json`.
- Android emulator gameplay: boot stages and all **270 images** loaded; Home reached; a practice world started; analog movement, jump, melee, dodge, knife, both Wissem skills, and a timed Fang Wolf summon executed. All four presets were edited/saved. Garsi cleared Briar Regent on Veteran using ordinary movement/action inputs, without health edits, teleportation, boss edits, forced wins, or accelerated simulation. See `artifacts/android-smoke-results.json` and device screenshots.
- Android six-digit room UI generated a real random code. A wrong six-digit admission code was rejected by the Android JS session implementation with no peer admitted. That rejection is a transport-independent test, not a physical radio handshake.
- Android save survived both a WebView reload and a full `am force-stop`/cold app restart, retaining the selected hero, all four edited presets and the boss-clear record. See `artifacts/android-restart-results.json`.
- No uncaught JS errors or gray startup screen were observed in the successful final emulator runs. Native logs are in `artifacts/android-final-boot.log`.
- The signed QA APK itself was installed as an update to the original QA app identity and cold-launched to loading, then Home through native touch. Its signature was verified with the official `apksigner`. QA assets match the generated source bundle and contain no debug probe.

Environment: Android 17/API 37 preview emulator, x86_64, 16 KB pages; fingerprint recorded in the smoke JSON. App minSdk 26, target/compileSdk 36. Lower Android versions have lint/API checks only in this session.

## Test boundaries / unfinished work

- Physical Bluetooth radios and two/four real paired devices were **not** tested. Shared health, admission, revives, contributions and 2v2 are covered by simulated session/state tests. Do not infer native multiplayer certification from them.
- No production account server was deployed. Internet friend presence and cross-device account/profile synchronization are not end-to-end verified. Offline play remains available.
- The 15 extended worlds now have five named regions and added route features, but are built from shared procedural structures. They are not 75 individually hand-authored region maps, and a complete campaign was not played through.
- Cosmetics are procedural accessories/palette outfits over existing animated sheets; not a complete independently rigged interchangeable body-part art library.
- True world/texture chunk streaming and a comprehensive reusable object/particle pool remain unimplemented. Existing atlas use, culling, off-screen limits, bounded effects, bounded decoding and rendering budgets remain. Sustained 60 FPS, battery and thermals on low-end physical hardware are unverified.
- The AAB was built and QA-signed, not uploaded to Google Play or installed through bundletool. Production signing still requires a private key.
- Startup failure injection was exercised in Chromium; native WebView provider failure/renderer-kill recovery still needs device fault-injection coverage.
- No new source art could be selected from `ai-generated-assets/` because that directory is empty.

## Reproduce

```powershell
npm test
npm run validate
npm run build
$env:PLAYWRIGHT_PATH='C:/path/to/node_modules/playwright' # omit if installed locally
$env:ADB='C:/path/to/Android/Sdk/platform-tools/adb.exe'
node tests/boot-browser.cjs
./gradlew.bat :app:assembleDebug
node tests/android-smoke.cjs
node tests/android-restart.cjs
```

The browser harness uses installed Chrome. The Android harness needs a running emulator and the debug APK. A debug-only probe exposes state and normal input booleans; it is excluded from QA/release bundles. Device screenshots use `adb screencap`: CDP screenshots on this emulator can omit the accelerated canvas layer.

Artifacts include loading/home, gameplay, boss-victory and room screenshots. Logs from earlier failed attempts are diagnostic history; JSON result files and the final build log identify passing runs.
