# Super Wiss Odyssey 3.0
## Companion Chronicles

**A landscape offline Android platformer, with the approved Super Wiss concept
art integrated into real gameplay.**

![Actual browser-rendered game, not an Android screenshot](docs/gameplay-landscape.png)

## Included delivery

- `artifacts/Super-Wiss-Odyssey-3.0.apk`: actual assembled, QA-signed Android APK.
- `dist/Super-Wiss-Odyssey.html`: playable, self-contained offline browser preview.
- `game/` and `assets/`: complete current game source and all registered game art/audio.
- `app/`: Android Studio Java host and Gradle configuration.
- `native/apktool/`: exact native smali host used to build the supplied APK.
- `art-source/`: the three approved generated concept boards, with crop information.
- `docs/EDITING-GUIDE.md` / `.html`: detailed replacement, mapping and build instructions.
- `docs/TEST-REPORT.md`: executed tests, evidence and untested areas.

## What changed

All 15 worlds have **exactly five times their v2 tile-column count**: 860–1,420
columns, with five populated sectors and ten checkpoints per world. Extra length
has enemies, pickups, caches, chests, crates, shrines, coins and optional routes.
The campaign keeps its 45-star progression, missions, local records, daily course
and endless loop. World generation remains procedural and deterministic.

Eight heroes now each have two independent active skills:

| Hero | Skill I | Skill II |
|---|---|---|
| Wissem | Gravity control | Bomba |
| Kossay | Twin fang | Ranger snare |
| Yakine | Arcane orbit | Chrono well |
| Taky | Shadow step | Night blades |
| Garsi | Iron bastion | Quake smash |
| Tounsi | Sirocco spin | Dune vault |
| Youssef | Pocket turret | Overclock |
| Loey | Seeker arrows | Windwalk |

Wissem additionally gains crowd-fury tiers when 3, 6 or 9 enemies are nearby.
Each tier accelerates recharge, slightly boosts movement and enlarges Bomba's blast.
Gravity control is a low-gravity launch/float mechanic, not inverted ceiling-walking.

Five regular collectible pets: **Fang Wolf, Sky Eagle, Mole Digger, Ember Fox,
Stone Turtle**. Each helps automatically. The late-game **Astra Dragon** and
**Orca Prince** have the requested rare abilities:

- Dragon Scales: 15 contact-kill charges per attempt, no damage from those contacts.
  No refill between checkpoints or endless worlds.
- Dragon Breath: activated separately; exactly 3× enemy-kill awards for 45 seconds,
  with a 90-second activation cooldown. Coins and distance are not tripled.
- Orca Flood: clears all map enemies and hostile shots, suppresses enemy pressure
  for 45 seconds, including across endless map transitions.
- Orca Prince: separate 45-second gap-water/fall protection. Both Orca abilities
  have independent 100-second cooldowns. Flood is not cliff protection; Prince is
  not spike/contact protection. Both can be activated together.

There are **13 enemy types, 14 power-ups, 27 original sound cues and five original
music loops**. Detailed concept-derived sprites, eight-frame rotating W coins and
15 original block-texture atlases replace much of the former procedural art.
The supplied hero/enemy/pet art is single-pose art with procedural motion, not
complete frame-by-frame animation sheets. True sprite sheets can be substituted.

## Play and test quickly

Install the supplied APK on a compatible Android 8.0+ phone and play horizontally.
**Worlds → Practice: on** opens every map without progression rewards.
**Pets → choose pet → Test in practice → choose world** lets you test any pet,
including Dragon and Orca, without collecting it first. Regular campaign collection
still requires finding the rescue capsule. Only one pet is equipped per attempt.

Keyboard: A/D or arrows move; Space jump; E/Q hero skills; F/G pet skills; Escape
pause. Hold Jump for a higher leap. Touch offers separate hero/pet buttons, automatic
sprint, mirrored controls, volume settings and pause. Gamepad mappings are present
but physical controllers have not been tested.

## Edit / preview

Requires Node.js 22.16+. No npm runtime dependencies or npm install are needed.

```sh
npm run validate
npm run build
npm run serve
```

Open `http://127.0.0.1:8080`. Read `docs/EDITING-GUIDE.html` for the full workflow.

```sh
npm test                       # 124 core + long-map traversal checks
node tests/authoring-tools.mjs  # 7 map-helper checks in an isolated copy
python tests/browser_v3.py      # 67 Chromium checks; Python Playwright + Chromium
npm run map -- list
npm run map -- length 1 6
npm run map -- add 3 "Jade Highlands"
```

The last two commands intentionally change content and therefore some baseline
count/length tests must be updated. Appending maps is supported; reordering existing
map entries needs an explicit save migration.

## Build Android

Open the project root containing `settings.gradle` in Android Studio. Configured:
AGP 8.13.2, Gradle 8.13, Java 17, compile/target SDK 36, minimum SDK 26.
After `npm run build`, use `:app:assembleQa` / `:app:bundleQa` for test packages.
The Java/Gradle route was **not compiled here**, and no AAB is included.

The delivered APK was assembled successfully from `native/apktool/`:

```sh
APKTOOL_JAR=/path/to/trusted/apktool.jar sh scripts/build-playtest.sh
```

Java, Python cryptography, Node and the external Apktool JAR are required for that
fallback route. The exact executed tool provenance is in `native/README.md`.
The project includes all game assets, not the external Android SDK/tool distributions.

## Release boundaries

**Offline, test-signed build—not the final Google Play release.** No Google login,
online friends, multiplayer server, ads, analytics or purchases are active. The
old online engine has not been upgraded or bundled as a compatible server.

Package `com.superwiss.game.playtest`, version code 30, same deliberately public QA
certificate as v2. It is intended to update the earlier test app; update behavior
has not been tested on hardware. V2 gold/settings/unlocks migrate, but long-map
scores and extra objective stars start fresh. Original v2 storage is not deleted.

Never use the bundled QA key for production. Complete private signing, SDK builds,
physical-device tests and Play Console requirements before a store release.
Native installation/runtime, real WebView save persistence, lifecycle behavior,
performance, battery/thermals and game balance remain unverified on Android.
The SDK's official `apksigner` was not run. See the complete test report.

## License / attribution

`licenses/ASSET-PROVENANCE.md` documents the generated-board crops and original
music/tiles. Font Awesome SVG attribution is retained in `licenses/FONT-AWESOME.txt`.
No Mario sprites/sounds, Minecraft textures, watermarked stock references or font
binaries are included. Keep permissions for any third-party replacements you add.
