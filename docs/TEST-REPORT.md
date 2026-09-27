# Super Wiss Ascension 1.1.0 — verification report

**24 September 2026 · signed QA playtest · not a production/Google Play release**

The delivered APK was compiled and signed using the included Java/DX/Apktool QA route.
It has **not been installed on an Android phone or emulator**. Browser and package checks
are not substitutes for Android runtime or Bluetooth-radio validation.

## Executed checks

| Check | Result | Evidence in this folder |
|---|---|---|
| Node combat, progression, controls, networking and account suites | **152 passed, 0 failed** | `ascension-core-tests.tap` |
| Chromium menus, touch, loadouts and two-client protocol integration | **86 passed, 0 runtime exceptions** | `ascension-browser.json`, `ascension-browser.log` |
| Runtime asset manifest | **317 files: 270 images + 47 audio** | `ascension-asset-validation.log`, `ASSET-INVENTORY.json` |
| Principal actor-sheet first-frame corners | **47 sheets have transparent RGBA corners** | `ASCENSION-BUILD-INFO.json` |
| Existing 41 sound cues and six music loops | All 47 decoded in Chromium | Browser suite |
| Native Java activity and Bluetooth bridge | javac/DX compilation passed | `ascension-native-compile.log`, `native/compiled/` |
| Resources, manifest and APK decoded back | Passed | `ascension-apk-build.log`, `ascension-apk-decode.log` |
| APK game bundle and DEX versus final outputs | Exact byte matches | `ASCENSION-BUILD-INFO.json` |
| Defined DEX classes | 19 application classes; no compile-time Android framework stubs | `ASCENSION-BUILD-INFO.json` |
| JAR/v1 and independent Python APK-v2 validation | Passed with expected QA-certificate warnings | `ascension-apk-build.log`, `ascension-apk-verification.json` |
| Altered HTML, DEX and resource data | All three rejected | `ascension-apk-verification.json` |
| Unmodified production HTML startup | Passed; no private test hook or mocked radio shipped | Browser suite and build-info |

The Node total includes nested account checks. These are not 152 Android-device tests.
Asset/signature checks are not counted again as gameplay tests. Historical Nightfall
reports under `history-nightfall/` do not validate this update.

## Actual test boundaries

Core fixtures inspect the fifteen extended maps, existing seal chambers and boss phases,
wall slide/jump, stamina/focus/soul restrictions, cooldowns, borrowed/fused skills, cosmetic
purchases and fixed pet recipes. They cover timed summons, expiry, charge limits, elite
pet restrictions, save sanitization/migration, and local ranking categories/tiebreaks.
Some fixtures directly assign positions, resources or damage to isolate rules. They are
not all human-equivalent playthroughs, nor evidence that every map/hero/difficulty is balanced.

The new pet rules were checked for all nine pets. Inactive and expired pets do not attack,
scout, guard or collect. Dragon charges and bonus scoring expire with its ten-second call;
Orca effects expire with its twelve-second call. Neither can instantly remove a boss.
Calls do not refill at checkpoints or endless transitions. The camera lab is a practice-only
perspective projection of the two-dimensional world, not true 3D/free-look or ranked content.

### Ordinary-input boss survey

`ascension-boss-pilots.json` records six attempts using normal movement, jumping, attacks,
knives, dodge, hero skills and summon inputs. No health edits, teleportation, boss mutation
or forced completion flags were used in that survey. Garsi without a pet cleared the first
Veteran boss in **25.5 simulated seconds**, taking three hits and finishing with two hearts.
The other five attempts (including Mira and Rayan) failed. These failures are retained in
the report, not silently excluded. They do not prove that those fights are impossible;
they mean this simple pilot did not clear them. Full campaign traversal, all later bosses,
Nightmare/Inferno balance and human usability remain unverified.

## Browser and control coverage

Chromium checks use 640×360, 844×390, 960×540 and 1280×720 landscape viewports. The suite
loads every registered image, tests the loading screen and home actions, exercises all
new menu categories, purchases/equips appearances and skills, and tests guaranteed recipes.
UI economy tests explicitly seed currency and rescued parents in isolated test saves;
they do not claim to have earned those rewards in a full fresh-save run.

The controls tests use actual pointer dragging and per-control position/size/opacity
inputs, save all four independent presets, cancel unsaved changes, and switch layouts.
DevTools multi-touch events hold analog movement and jump simultaneously. Input release,
arrows versus analog, mirroring, ammo/resource consumption and native-pause adaptation are
checked. Tested visible action/pet buttons remain within the viewport and at least 44px.

The test environment restricts normal navigation, so tests use `set_content` with a
test-only observation API and in-memory storage adapter injected into a copy. This does
not establish physical WebView reload/save persistence. An additional smoke check boots
the unmodified production HTML. The APK and preview contain neither the observation API
nor the mocked transport. Screenshots are actual Chromium renders, **not Android captures**.
Some scene screenshots use explicit positions, invincibility or boss-intro fixtures.

A final visual review found an empty pet portrait being exposed in raids with no equipped
pet. The visibility logic was fixed, both-client portrait/image checks were added, and
all 86 browser checks were rerun against the final bundle before packaging.

## Local multiplayer scope

Node sessions test two-, three- and four-client shared raids, six-digit room admission,
incorrect-code rejection, input validation, shared boss simulation, scaled health/stagger,
down timers, three-second held revives, shared revive limits, team wipes and results.
Malformed snapshots, including invalid revive fields, are rejected.

Two independent rendered browser clients use an explicitly mocked native-radio boundary,
but the real session/host game protocol. They join using the same six-digit code, ready
up, enter one shared-boss fight, display the same boss health, deliver guest movement to
the host simulation and revive a downed ally using a real held input. A forced boss-defeat
fixture exercises the common results screen; this is **not an ordinary-input raid clear**.
An FFA rematch verifies equal-stat restrictions. Physical Bluetooth is not involved.

The compiled native implementation uses paired RFCOMM sockets. The code is an admission
code after Android pairing, not a global matchmaking address or a substitute for pairing.
All phones need this protocol-5 build. Shared boss raids require 2–4 players; 2v2 requires
exactly four. Independent boss races and FFA remain. There is no Internet multiplayer,
shared campaign co-op, Dungeon Run, Survival, host migration or reconnect recovery.
Backgrounding/disconnecting cancels a match. Radio throughput and four-phone reliability
must be measured on real devices before broader distribution.

## Account service scope

The retained account tests start an actual loopback HTTP/SQLite service and make real
requests for sign-up, login, profile allowlists, recovery, friend consent, blocking,
reporting, deletion, CORS and rate limits. This is not a deployed public service. HTTPS,
real Android-to-server login, production backups, moderation and independent security
review remain unverified. No Google login, cloud save or global ranked backend is present.

## Native/package scope

The package is `com.superwiss.game.playtest`, Android versionCode **41**, versionName
`1.1.0-playtest`, label **Super Wiss Ascension**, minimum API 26, target API 36 and
sensor-landscape orientation. It uses Internet, legacy Bluetooth permissions through
API 30 and Bluetooth Connect. It does not request Bluetooth scan/location, contacts,
microphone or external-storage permissions.

Readable Java was compiled against minimal compile-only Android API signatures and then
converted with DX. The DEX contains only 19 app classes, not the Android signature stubs.
Apktool/AAPT2 compiled resources; the current DEX and game bundle were packaged and signed.
This is **not an executed Android Studio/Gradle/official SDK build**. Their source and
configuration are supplied, but SDK compilation, lint and instrumented tests remain pending.

The independent Python verifier checks content digests, RSA/certificate consistency,
ZIP/DEX checksums and alignment; Java's JAR verifier also passed. The QA certificate is
self-signed and deliberately public, so trust-chain/no-timestamp warnings are expected.
**The official Android SDK `apksigner` was not run.** The Python verifier is not independently
audited. No AAB was generated. The certificate matches the older playtest and versionCode
increases; actual install/update and save retention are still untested on hardware.

## Artwork and release scope

The identified supplied environment/skill-icon packs are integrated and credited in
`licenses/COMMUNITY-ASSETS.md`. The unidentified `Icons` folder was excluded. The user
ZIP contained no character or boss animation library or new audio. Extra heroes/outfits
are recolored derivatives; fused pets are composites. Boss silhouettes combine existing
body archetypes with drawn equipment/effects. They are not newly hand-drawn animation sets.
The main game remains Canvas/WebView. No dummy content was added to approach 75MB.

Installation, Android DEX execution, modern WebView compatibility, physical multitouch,
Bluetooth, lifecycle/audio focus, saves, battery/thermals, tablets, human balance and
Google Play pre-launch testing remain outstanding. Production signing, policy approval,
and virality are not established. Use `DEVICE-TEST-CHECKLIST.md` before public distribution.

## Re-run

```sh
npm run validate
npm run build
npm test
npm run test:browser
DEX_TOOLS_LIB=/trusted/dex-tools/lib sh scripts/compile-native.sh
APKTOOL_JAR=/trusted/apktool.jar sh scripts/build-playtest.sh
```

External tools are not bundled. The build guide explains prerequisites and the preferred
official Android Studio route. `ASCENSION-BUILD-INFO.json` records the final APK hashes.
