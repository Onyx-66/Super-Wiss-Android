# Building Super Wiss Ascension 1.4.1

The project root contains `settings.gradle`, `game/`, `assets/`, and `app/`. Current Android metadata is **1.4.1-playtest**, versionCode **46**, application ID `com.superwiss.game.playtest`.

## Requirements

- Node.js 22.16 or newer.
- JDK 17. The pinned Gradle 8.13 wrapper is incompatible with Java 25.
- Android SDK Platform 36 and Build Tools 35/36.
- `ANDROID_HOME` or an untracked `local.properties` with `sdk.dir` pointing to the SDK.

## Windows build

Run from the project root with the installed JDK and SDK paths:

```powershell
$env:JAVA_HOME='C:/path/to/jdk-17'
$env:ANDROID_HOME='C:/Users/YOU/AppData/Local/Android/Sdk'
npm test
npm run validate:weapon-art
npm run validate:maps
./gradlew.bat clean :app:assembleQa :app:lintQa --console=plain
```

The installable APK is `app/build/outputs/apk/qa/app-qa.apk`. The local delivery copy is `artifacts/Super-Wiss-Ascension-1.4.1.apk`. Current build evidence is described in [docs/BUILD-1.4.1.md](docs/BUILD-1.4.1.md).

`Build-QA.bat` also builds the QA AAB and copies both outputs to versioned artifact filenames after success. For a separate debug app, use `:app:assembleDebug`; its application ID has the `.debug` suffix. An AAB is not directly installable on a phone.

## Bundled game and updates

Gradle's `preBuild` regenerates the Android web assets from editable source through `scripts/bundle.mjs`. Android streams them from `https://appassets.androidplatform.net`; the browser preview in `dist/Super-Wiss-Odyssey.html` is generated separately by the same script. Debug diagnostic assets are excluded from the QA variant.

The QA APK uses the existing public testing certificate and app identity, so it can update prior QA installations while retaining local app data. Install the new APK over the existing app; uninstalling removes local saves. Android 8.0/API 26 or newer is required.

The checked-in QA key is for testing. Production signing uses a private, untracked `keystore.properties`; the build rejects the public QA certificate for production releases. Generated APK/AAB files, web bundles, local tooling and private signing files are excluded from Git.

See [UI-POLISH-DELIVERY.md](UI-POLISH-DELIVERY.md) and [docs/MISSING-ASSETS.md](docs/MISSING-ASSETS.md) for the inherited visual and content limitations. Earlier versioned logs remain historical evidence.
