# Super Wiss Ascension 1.4.1 mobile build

## Source integration

The supplied `Super-Wiss-Ascension-1.4.1` full-source folder was imported into the repository root on 2026-09-28. All 2,319 supplied files were copied and checked against their source hashes before integration edits. The existing Git history, Android build workflow, and repository-only reference files were preserved. The prior root files have a local backup under `artifacts/local-backups/`.

The integration reconciles the older 1.4.0/1.3.1 headings in the current README, build, versioning and testing instructions with the supplied 1.4.1 metadata. Existing private-file exclusions were retained, and generated Android/browser bundles, APKs and emulator disk images stay out of Git. The supplied game implementation and art are retained. Git attributes preserve the original bytes and whitespace of the three supplied verbatim diff/code reports.

## Checks performed

| Check | Result |
| --- | --- |
| `npm test` | 333 passed, 0 failed |
| `npm run validate:weapon-art` | 423 assets present; all ten weapon PNGs present; 0 pending weapon PNGs |
| `npm run validate:maps` | All 15 maps passed with no reported route/occupancy issues |
| `./gradlew.bat clean :app:assembleQa :app:lintQa --console=plain` | Successful native QA build and lint; 0 errors, 8 non-blocking warnings |
| Import integrity | No unexpected source-file differences before the documented integration edits |
| Git conflict/whitespace review | No unresolved merge markers or source whitespace errors; verbatim historical reports retain their original whitespace |

The Android assets were regenerated from source after removing the previous generated asset directories. The bundle contains 15 maps and 423 registered assets. The build used Node.js 26.8.1, JDK 17, Gradle 8.13 and Android SDK 36 on Windows. Full local command output is under `artifacts/local-validation/1.4.1/`.

## Mobile APK

- Version: `1.4.1-playtest`, Android versionCode `46`.
- Application ID: `com.superwiss.game.playtest`.
- Minimum Android version: Android 8.0 / API 26.
- Gradle output: `app/build/outputs/apk/qa/app-qa.apk`.
- Local delivery: `artifacts/Super-Wiss-Ascension-1.4.1.apk` and its `.sha256` checksum.
- Signing: the repository's existing public QA certificate, allowing an update over earlier QA installations with the same application ID and certificate.

Install the APK over the existing QA app to retain its local saves. Physical-phone gameplay, rendering, persistent saves and Bluetooth behavior remain for device testing. The source delivery's remaining artwork/content limitations are listed in [UI-POLISH-DELIVERY.md](../UI-POLISH-DELIVERY.md) and [MISSING-ASSETS.md](MISSING-ASSETS.md).
