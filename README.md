# Super Wiss Odyssey — NIGHTFALL

**Landscape Android combat-platformer / local-party playtest.**

This GitHub repository is the canonical **v1.0.0 source baseline**. Run `npm run bootstrap` and `npm run build` to generate the standalone HTML, or open the folder containing `settings.gradle` in Android Studio for the Android build.

## What is implemented

15 five-times-longer worlds, three seal chambers per world, 15 three-phase final-boss
encounters, Boss Hunt, Veteran/Nightmare/Inferno, melee combos, directional pogo,
throwing knives, stamina dodge, focus-limited hero skills, limited spirit summons,
seven collectible pets, rotating coins, 14 power-ups, 28 animated actor sheets,
15 animated boss sheets, and an illuminated stargate. Analog controls are default.
Original boss-focused music and combat sound cues are included. Crimson/essence/off
hit effects are selectable. These are stylized game effects, not graphic dismemberment.

Native paired-device Bluetooth source and DEX implement host + 3 clients: independent
boss challenges, free-for-all and exactly-four-player 2v2. Hosts simulate inputs;
clients cannot submit positions or scores. Physical Bluetooth testing is still required.

Optional HTTPS username/password accounts, profiles, friend requests, blocking,
reporting, recovery codes and account deletion are implemented in `server/`. No server
is deployed. **There is no Google login, cloud save, global ranking or Internet PvP.**
Guest play and Bluetooth play do not require an account or an Internet connection.

## Fresh clone bootstrap

Runtime images/audio and the public QA test key are versioned in
`source-packs/runtime-binaries.tar.gz` so the initial repository import stays compact.
Restore them before editing or building:

```sh
npm run bootstrap
```

After replacing binary assets, run `python3 scripts/repack-binaries.py` before committing.

## Developer commands

Requires Node.js 22.16+ for the included SQLite service/tests; no npm runtime dependencies.

```sh
npm run validate
npm run build
npm test
npm run serve
npm run test:browser
npm run accounts
./gradlew :app:assembleQa :app:bundleQa :app:lintQa
```

`npm run build` updates the HTML preview and Android's bundled game. Rebuild/reinstall
the APK afterward. The QA key is deliberately public and **must not be used for production**.

## Read next

- `docs/EDITING-GUIDE.md` / `.html` — editing, content and build guide.
- `docs/TEST-REPORT.md` — executed tests versus important unverified behavior.
- `docs/DEVICE-TEST-CHECKLIST.md` — solo, Bluetooth and account tests on actual phones.
- `docs/NETWORK-AND-ACCOUNTS.md` — protocol, paired setup and backend deployment.
- `docs/RELEASE-CHECKLIST.md` — production gates, privacy and growth experiment plan.
- `licenses/` — art and SVG provenance.

## Limits you should know

This is still a Canvas/WebView game, not a Unity/Godot rewrite. Animation is generated
from articulated cutouts of the approved artwork, not hand-drawn frame-by-frame animation.
Bosses use shared enemy-body archetypes with different patterns/palettes/crowns.
Difficulty is intentionally severe and not human-balanced yet. The APK has not been
installed on a real Android phone or emulator here. Store approval and virality are
not established by this build.

## Folder map

`game/` editable JS/JSON/CSS/UI; `assets/manifest.json` runtime asset map;
`source-packs/` versioned runtime binary pack; `app/` readable Android Java/manifest;
`native/apktool/` fallback packaging resources; `server/` accounts/social; `scripts/`
authoring, bootstrap, asset generation and build/signing; `tests/` current tests;
`docs/` guide/evidence; `legacy/` historical engine source.
