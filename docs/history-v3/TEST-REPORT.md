# Super Wiss Odyssey 3.0 — Verification report

**Companion Chronicles · 24 September 2026 · offline QA build**

The delivery contains an actual signed APK. It was built from the included native
smali source using Apktool/AAPT2 and contains the current production game bundle.
It was not built through Android Studio/Gradle and was not installed on an Android
device or emulator. The distinction matters: package checks and browser tests do
not establish native installation, Android WebView behavior or store readiness.

## Results

| Executed suite/check | Result | Evidence |
|---|---:|---|
| Core game, progression, ability and long-map tests | 124 passed; 0 failed | `core-tests.tap`, `tests/v3.test.mjs` |
| Chromium mobile UI and multi-touch checks | 67 passed; 0 failed | `browser-tests.json`, `tests/browser_v3.py` |
| Map-authoring helper checks in an isolated temporary copy | 7 passed | `authoring-tests.json`, `tests/authoring-tools.mjs` |
| Asset manifest validation | 110 registered files valid | `ASSET-INVENTORY.json`, `scripts/validate-assets.mjs` |
| Native smali/manifest/resources assembled into APK | Passed | `apk-build.log` |
| APK decoded back; embedded game compared to the current bundle | Byte-for-byte match | `apk-decode.log`, `BUILD-INFO.json` |
| AAPT2 package, version and SDK inspection | Passed | `apk-badging.txt` |
| JAR/v1 signature verification | Passed, with QA-certificate warnings | `jarsigner-verification.txt` |
| Independent Python APK-v2 signature/content verification | Passed | `apk-verification.json` |
| Altered DEX, game HTML and resource bytes rejected | All three rejected | `apk-verification.json` |

These are different suites and checks, not 198 Android device tests. The asset and
package checks are not counted again as gameplay tests. Test fixtures isolate
mechanics; they do not all represent full player-driven runs.

## Gameplay and content coverage

Every one of the 15 shipped worlds has exactly five times its previous tile-column
count. Tests inspect filled sectors, ordinary pickups, monster populations,
checkpoints, chests, crates, shrines, legal enemy types and finite geometry. Each
hero has two separate, usable skills with independent cooldowns. Every power-up
is exercised through its actual state change, and selected projectile, trap,
reflection, blast and collision effects are checked through simulation ticks.

The rare-pet tests exercise their exact contracts rather than just the UI text:

- Dragon Scales kills 15 actual contact enemies without damage, then stops; charges
  do not reset at checkpoints or endless world changes.
- Dragon Breath triples enemy-kill awards relative to the same unbuffed award,
  does not triple coin awards, lasts 45 simulated seconds, and cannot immediately
  be reactivated during its 90-second cooldown.
- Orca Flood removes all existing enemies, including warning-state spawns, clears
  hostile shots and suppresses enemies for 45 seconds, including across worlds.
- Orca Prince supports gaps without permanently rewriting terrain, rescues an
  already-started fall, lasts 45 seconds and does not block ordinary enemy/spike
  damage. Its timer/cooldown is separate from Flood.

Regular pet attacks, scouting/treasure, distance-driven supplies, regenerating
protection, capsule collection, equipment restrictions and practice-without-
rewards are tested. Save tests cover v2 migration, invalid-data sanitization,
backup recovery and an unavailable-storage condition. Endless tests cover the
15-to-1 loop, carried state, capped spawn pressure and replacement of old levels.

## Fifteen ordinary-input completions

The final 15 tests run the actual five-times-longer maps without removing enemies,
changing player health, teleporting, assigning invulnerability, or manipulating
completion flags. The pilot uses the ordinary move, jump and two skill inputs.
All 15 reached the portal within 300 simulated seconds.

Most use Wissem with no pet. Crystal Hollow uses Loey with Fang Wolf; Thunder
Citadel uses Taky with no pet; Neon Nightway uses Wissem with Stone Turtle. These
are valid loadouts, with the pets available from earlier worlds. The tests create
those loadouts directly; they are not a full fresh-save campaign unlock test.

`map-traversal.json` records another replay of those same pilots with map widths,
populations, loadout, score, simulated duration and knockout counts. This is
additional evidence, not an additional independent test count. It does **not**
establish human balance, all 45 objectives, all eight heroes on all 15 maps, or a
continuous 15-world endless clear.

## Browser UI and audio coverage

Chromium ran at 640×360, 844×390, 960×540 and 1280×720 mobile landscape viewports,
plus a portrait rotation-hint check. Tests checked menu navigation, practice,
locks, eight hero selections, seven pets, two hero buttons, two Orca buttons,
Dragon's charge display, independent audio sliders, mirrored controls, mission
and local-record screens, and touch targets within viewport bounds.

Actual Chrome DevTools Protocol multi-touch events held movement and jump at the
same time. Rapid-tap buffering and keyboard pet activation were also exercised.
All 78 registered images loaded; all 32 stereo audio files decoded. Native-pause
JavaScript events paused simulation, released controls and suspended WebAudio.
No uncaught JavaScript errors or external network requests were observed.

This environment administratively blocks browser navigation, so the suite uses
`page.set_content` with a test-only observation API and explicit in-memory storage
adapter. Those are injected into a **copy**, never into the distributed bundle.
An additional smoke check runs the unmodified production HTML without the test
API. Storage algorithm tests pass, but real WebView persistence and browser
reload persistence are not established by this adapter.

The screenshots in this folder are actual Chromium game renders, not Android
screenshots and not screenshots of the concept boards. The screenshot scene uses
real practice-mode entry points. They are not Google Play-approved store media.

## Package verification details

The APK manifest reports package `com.superwiss.game.playtest`, version code 30,
version name `3.0.0-playtest`, minimum API 26, target API 36 and landscape gameplay.
It requests no Android permissions, including no Internet permission. The launcher
icon uses the new Wissem artwork.

The certificate matches the supplied v2 QA APK. This is intended as an update to
that test installation; actual install/update has not been exercised. The deliberately
public QA certificate is not a production identity. Java's verifier correctly
warns that the certificate is self-signed, not publicly trusted, and lacks a trusted
timestamp; it also notes ZIP permission attributes are not protected by signatures.

The included Python verifier independently reads the APK-v2 block, checks its
RSA/SHA-256 signature and certificate/public-key consistency, recomputes chunked
content digests, checks ZIP CRCs and v1 entry digests, validates DEX checksums and
checks four-byte alignment of uncompressed entries. It rejects modified copies.
It is **not** Google's official Android SDK `apksigner`; the latter was not
available and was not run. This verifier is not independently security-audited.

## Unverified / not delivered

- Android installation/update, Android runtime DEX verification and Android WebView
  rendering on a real phone or emulator.
- Android Studio/Gradle Java build, SDK lint and Android instrumented/unit-test
  tasks; no AAB was generated.
- Physical multi-touch, gamepads, cutouts, lifecycle/interruptions, audio focus,
  hardware performance, frame pacing, thermals or battery life.
- Device save persistence/migration, recovery after force-stop/storage pressure,
  and production release signing.
- Human difficulty balance, complete star-objective testing and large-screen
  Android compatibility beyond the browser layouts.
- Google sign-in, friends, multiplayer or online leaderboards. This is an offline
  build; the earlier online server has not been adapted to these new mechanics.
- Play Console pre-launch checks, current publication declarations or approval.

## Re-run

From the extracted project root:

```sh
npm run validate
npm run build
npm test
node tests/authoring-tools.mjs
# Requires Python Playwright and /usr/bin/chromium (adjust browser path for your OS):
python tests/browser_v3.py
# Exact native fallback route; requires trusted external Apktool, Java, cryptography:
APKTOOL_JAR=/path/to/apktool.jar sh scripts/build-playtest.sh
```

When changing the number of maps/assets or balancing the game, update the
baseline-count assertions and traversal pilots deliberately. A passing old
baseline is not sufficient validation of newly authored content. Use the Android
SDK's official package verifier and real-device tests on the release machine.
