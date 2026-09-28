# Super Wiss Ascension — v1.4.1 UI polish

**Complete source/playtest project.** The current editable game lives at the repository root. Android versionCode: **46**; versionName: **1.4.1-playtest**. Start with [UI-POLISH-DELIVERY.md](UI-POLISH-DELIVERY.md) for the supplied UI changes and [BUILDING.md](BUILDING.md) to build the mobile APK. Exact reference backgrounds, typefaces and dedicated animation art remain work in progress.

## Implemented

Ten final weapon PNGs, the 84 cropped UI pieces, ten-screen layouts, clearer crouch controls, deterministic unarmed combat, profile-derived hero ratings, nine display renames with stable internal IDs, weapon restrictions, and the six-slot wardrobe architecture are included.

## Still partial

Nine heroes need authored weapon-free/unarmed rigs. Bront and Sol retain conflicting baked shield art. Modular clothing pieces are not supplied and the ready-piece shop catalog is empty. Typography uses a fallback until separately licensed fonts are installed, and mockup fidelity remains incomplete. Native WebView, persistent storage, devices, Bluetooth and performance require QA. No production readiness or APK success is implied by the source tag.

## Build and test

Use Node.js 22, JDK 17 and the checked-in Gradle wrapper.

```sh
npm test
npm run validate:weapon-art
npm run build
```

The last command generates `dist/Super-Wiss-Odyssey.html` and the Android web assets. Run `npm run serve` for a browser preview. For Android, configure the Android SDK and run `./gradlew :app:assembleDebug :app:assembleQa :app:bundleQa`. See [BUILDING.md](BUILDING.md). The checked-in QA signing key is public and NONPRODUCTION. Never use it for a production release.

The 1.4.1 project-root integration passed the 333-test suite, asset/map validation, and the native QA build and lint. See [current build results](docs/BUILD-1.4.1.md) for the installable APK location and remaining phone checks.

GitHub Actions: **Super Wiss Android - Debug and QA**, in `.github/workflows/android-build.yml`, compiles debug/QA APKs and a QA AAB and uploads them with test logs. A green build is not device certification.

## Handoff and evidence

- [Task-by-task status](LOCAL-DELIVERY.md)
- [Asset inventory](docs/ASSET-INVENTORY.xlsx)
- [Missing assets](docs/MISSING-ASSETS.md)
- [UI crop mapping](docs/UI-ASSET-MAPPING.md)
- [Hero stats](docs/HERO-STATS.md)
- [Skill decisions](docs/SKILL-DECISIONS.md)
- [Conflicts](docs/CONFLICTS.md)
- [Original implementation OLD/NEW report](docs/OLD-NEW-CODE.md)
- [Versioning](VERSIONING.md)

`agent-skills/` contains the 16 supplied standards; `design/references/ui/` contains target mockups, not runtime evidence. `docs/qa-local/` contains screenshots/tests from the local implementation before its version-label bump. Historical files under `artifacts/`, `qa/`, and `docs/repository-import/` describe earlier builds, not current Android validation.
