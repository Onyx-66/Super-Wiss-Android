# v1.3.1 source candidate — current packaging status

No current APK/AAB has been built here. Official Gradle attempt failed before compilation because services.gradle.org did not resolve; Android SDK/ADB are unavailable. The commands below are for a configured development computer, not evidence of executed builds.

Use Node 22.16+ and JDK17 with Android SDK36 installed. Open the project root containing settings.gradle. Do not use the old native/apktool fallback: its resources/host scripts are historical and not updated for this patch.

```powershell
npm run validate
npm run build
npm test
npm run test:weapon-ui
npm run validate:maps
.\gradlew.bat :app:assembleDebug :app:assembleQa :app:bundleQa :app:lintDebug :app:lintQa
```

Expected outputs only after a successful local Gradle build:
- app/build/outputs/apk/debug/app-debug.apk (debug identity suffix)
- app/build/outputs/apk/qa/app-qa.apk (same QA identity/certificate, version code44)
- app/build/outputs/bundle/qa/app-qa.aab

Build-QA.bat copies QA outputs to versioned artifacts filenames only after success. Keep Play Protect enabled. Do not uninstall merely to upgrade, as that deletes local saves. An AAB is not directly installable; use bundletool or an appropriate Play testing flow after verification.

Artwork prerequisites and optional-body gates: [assets/weapons/README.md](assets/weapons/README.md).
Optional browser checks: install Python Playwright, set CHROMIUM_PATH to your Chromium executable, then `python tests/weapon-ui-browser.py`. These are set_content fixture checks, not Android tests. Rebuilding logo derivatives requires Pillow and the retained docs/branding/logo-supplied.png; run `python scripts/prepare-branding.py`.

---
# Historical building guidance from the source baseline

# Building Super Wiss Ascension 1.3.0

The existing Android project root is this folder; do not create a replacement project.

## Requirements

- JDK 17, Node.js 22.16 or newer, Android SDK Platform 36, Build Tools 35/36.
- Gradle 8.13 and Android Gradle Plugin 8.13.2 are pinned. Android Studio's Java 25 cannot run this Gradle version; set `JAVA_HOME` to JDK 17.
- `ANDROID_HOME` points to your Android SDK, or set `sdk.dir` in untracked `local.properties`.
- Official compatibility reference: https://developer.android.com/build/releases/agp-8-13-0-release-notes

## Windows

```powershell
$env:JAVA_HOME='C:/path/to/jdk-17'
$env:ANDROID_HOME='C:/Users/YOU/AppData/Local/Android/Sdk'
npm test
npm run validate
./gradlew.bat :app:assembleQa :app:bundleQa :app:lintQa :app:assembleDebug :app:lintDebug --console=plain
```

`preBuild` runs `scripts/bundle.mjs`, so edits to `game/`, source assets, and licenses cannot silently leave a stale APK. The Windows wrapper verifies its downloaded JAR with SHA-256 using .NET; it no longer depends on `Get-FileHash` being available in Windows PowerShell.

Outputs: `app/build/outputs/apk/qa/app-qa.apk`, `app/build/outputs/bundle/qa/app-qa.aab`, and `app/build/outputs/apk/debug/app-debug.apk`.

The portable JDK in `.tools/` was installed for this session and is excluded from the source archive. It is tooling, never an APK asset.

## Bundle architecture

Android streams `game.html`, `boot.js`, `style.css`, `game.js`, and manifest-selected media from APK assets through the exact HTTPS origin `https://appassets.androidplatform.net`. All required files work offline. The previous origin and save key are unchanged.

The standalone `dist/Super-Wiss-Odyssey.html` browser preview remains a self-contained convenience file. It must not be loaded through Android `loadDataWithBaseURL`.

The debug variant overlays a generated `app/src/debug/assets/game.js` diagnostic probe for emulator tests. QA/release assets have no probe and WebView debugging is disabled for them.

## Signing

QA uses the existing deliberately public testing certificate. The APK updates the previous QA identity (`com.superwiss.game.playtest`); versionCode is 42. The AAB is QA-signed, not a Play Store production release. Production signing still requires a private `keystore.properties`, and the build rejects the public QA key for production.

## Source archive

The source ZIP contains editable game/native code, assets, artwork sources, tests, build scripts and notices. Generated APK/AAB copies, local SDK/JDK/Gradle caches, and duplicate generated game bundles are excluded. `npm run build` recreates the bundles.
