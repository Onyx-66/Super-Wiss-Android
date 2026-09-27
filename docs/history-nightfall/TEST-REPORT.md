# Super Wiss Nightfall 4.0 — verification report

**24 September 2026 · QA build · not a production/store release**

## Executed checks

| Check | Result | Evidence |
|---|---|---|
| Node combat, exploration, progression, networking and account tests | **100 passed, 0 failed** | `nightfall-tests.tap` |
| Chromium mobile UI, touch and two-browser integration | **43 passed, 0 failed** | `nightfall-browser.json`, `nightfall-browser.log` |
| Editable asset validation | **183 assets valid** | `ASSET-INVENTORY.json`, `animation-verification.json` |
| Eight hero, thirteen enemy and seven pet sheets | RGBA transparency and multiple frames | `animation-alpha-report.json` |
| Fifteen boss sheets | RGBA, eight frames per sheet | `animation-verification.json` |
| All 47 music/SFX files decoded in Chromium | Passed | Browser suite |
| Readable Java host and Bluetooth bridge compiled | javac + DX fallback passed | `native-compile.log`, `native/compiled/` |
| APK resources/manifest compiled and decoded back | Passed | `nightfall-apk-build.log`, `apk-decode.log`, `apk-badging.txt` |
| APK bundle/DEX compared with production source outputs | Exact matches | `BUILD-INFO.json` |
| Actual DEX contains only app classes | **18 app classes; no framework signature stubs** | `BUILD-INFO.json`, native smali |
| JAR/v1 and independent Python APK-v2 verification | Passed with expected test-certificate warnings | `jarsigner-verification.txt`, `apk-verification.json` |
| Modified DEX, HTML and resources rejected | All three rejected | `apk-verification.json` |

The Node runner reports 85 top-level tests plus nested account checks, totaling 100.
These are not 100 Android-device tests. Asset/signature checks are not counted again
as gameplay tests. The old evidence in `history-v3/` is historical and does not validate v4.

## Combat and exploration coverage

Core fixtures cover all 15 map geometries, three chambers per map, gates, fragment and
warden completion, all eight heroes' focus/cooldown restrictions, pet soul/use restrictions,
all three summons, knives, dodge, melee, damage, boss phase transitions and boss defeat,
endless transitions, save migration, profiles and input sanitization.

The boss fixtures deliberately position actors and apply controlled damage to isolate
rules. They are not player-driven full clears. A gate test and a correct tile count do
not prove an entire map is human-playable. The new complete 15-world campaign has not
been traversed end-to-end, and every hero on every room/tier remains unverified.

The animation generator creates articulated cutout frame atlases, not new hand-painted
art for every animation pose. The 28 regular actor sheets contain 204 unique image frames
in total. Bosses reuse enemy-body archetypes and add variant crowns/palette/motion. The
report does not claim 15 entirely independent hand-drawn boss designs.

## Honest ordinary-input boss survey

`tests/boss-pilot.mjs --survey` runs the actual simulation with ordinary movement, jump,
attack, knife, dodge, hero-skill and summon inputs. It does not teleport, alter health,
remove hazards, inject invulnerability or set a completion flag. Loadouts are selected
directly as test fixtures; pet acquisition itself is not replayed.

The final survey cleared **Briar Regent on Veteran with Garsi + Ember Fox in 21.75 seconds**
and **Moon Reaper on Veteran with Youssef + Ember Fox in 17.60 seconds**. The other thirteen
bosses were not cleared by this simple pilot. All failed attempts remain visible in
`boss-pilot-survey.json` and `boss-pilot.log`. This is evidence of two valid clears, not
proof that later fights are impossible, balanced, or ready for a public release.
Nightmare/Inferno and human difficulty tuning require further testing.

## Browser scope

Chromium ran at 640×360, 844×390, 960×540 and 1280×720 landscape sizes. Tests used real
DevTools multi-touch events to hold analog movement and jump simultaneously. They checked
knife ammunition, melee/stamina, dodge, both skills, soul/charge summons, pause and native
pause event adaptation, analog/arrows, mirrored controls, 48px action targets, blood/haptics
settings, profile selection and unavailable-backend messaging. All registered images
loaded; all 47 audio files decoded. No uncaught JavaScript errors were recorded.

Two independent rendered pages used an **explicit in-memory native-bridge mock**. Their
handshake, two-player lobby, ready/start countdown, client input delivery, host-computed
movement, visible remote players and restricted PvP controls passed. A separate protocol
suite uses up to four independent sessions and tests 2v2 membership, stale/malicious
inputs, KO/team rules, rematch and disconnect behavior. No Bluetooth radio is involved
in those browser/protocol tests.

The environment blocks normal browser navigation. Tests therefore use `set_content`,
a test-only observation hook and in-memory storage adapter, injected into a copy. No
`__TEST` hook is included in the preview/APK. An additional smoke check loaded the
**unmodified production HTML** without the hook or adapter, entered Boss Hunt and
recorded no JavaScript error (`production-smoke.log`). Screenshots are actual Chromium
renders, not Android screenshots or pasted concept boards. Chamber/open-portal screenshots
use explicit scene-position/completion fixtures and do not evidence player progression.

## Account service scope

Tests start a real loopback HTTP server and SQLite database, then make actual requests.
They check signup policy acceptance, password hashing, login failure/success, profile
allowlists, session/recovery rotation, friend consent, removal, blocking, reporting,
account deletion, CORS and rate limits. Additional client checks reject malformed identities
and sanitize server-controlled profile fields before rendering.

The public deletion route is supplied; live HTTPS, Docker/Caddy, production rate limits,
staff moderation, backup/restore, Android-to-server login and independent security review
were not executed. The staging limiter conservatively shares per-IP quotas behind a
reverse proxy. Tokens currently use WebView storage. No Google login or global ranked
backend is present, and no public service has been deployed for this APK.

## Native/package scope

The APK has package `com.superwiss.game.playtest`, version code 40, min API 26, target API
36, sensor-landscape orientation and optional Bluetooth hardware. New permissions are
Internet, legacy Bluetooth (through API 30), Bluetooth Admin (through API 30), and
Bluetooth Connect. No location/scan, microphone, contacts or storage permissions are used.

Readable native Java compiled with **javac against minimal compile-only API signatures**,
then DX generated the DEX. The actual DEX contains 18 app classes and preserves the
JavascriptInterface method annotations. Signature-only framework classes were NOT packaged.
Apktool/AAPT2 built resources; the application DEX was inserted and signed. This is NOT an
Android SDK/Gradle compile or Android runtime/API verification. The full Android Studio
source/build configuration is present, but that build route has not been executed.

The APK decoded back successfully, exact game bytes matched the current bundle, ZIP/DEX
checksums passed, v1 entry digests and APK-v2 RSA/content digests passed, and tampered
copies were rejected. The QA certificate matches the v3 APK. Java correctly warns about
a self-signed test certificate, untrusted chain and absent trusted timestamp.
**Google's official Android `apksigner` was not run.** The independent Python verifier is
not itself independently audited. No AAB was generated.

## Hardware and release gaps

Android install/update, DEX execution, WebView save persistence, physical controls,
Bluetooth pairing/throughput/two/four-phone sessions, lifecycle/audio focus, Android
account login, frame pacing, low-memory behavior, thermal/battery behavior and tablets
remain unverified. No emulator or real phone was available in this build environment.
No Google Play pre-launch test, production signing, policy approval or virality result
is claimed. Use `DEVICE-TEST-CHECKLIST.md` before distributing beyond a test group.

## Re-run

```sh
npm run validate
npm run build
npm test
python tests/browser_v4.py
node tests/boss-pilot.mjs --survey
DEX_TOOLS_LIB=/trusted/dex-tools/lib sh scripts/compile-native.sh
APKTOOL_JAR=/trusted/apktool.jar sh scripts/build-playtest.sh
```
