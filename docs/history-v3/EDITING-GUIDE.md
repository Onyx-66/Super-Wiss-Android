# Super Wiss Odyssey 3.0
## The complete editing and rebuilding guide

**Companion Chronicles · Android landscape playtest**

This guide accompanies the actual game source, its editable assets, the standalone
browser preview, and the signed `Super-Wiss-Odyssey-3.0.apk`.
The game runs in a native Android WebView shell. It is not a Unity or Godot project.
The art boards are used as source artwork; they are not a substitute for the game.

**Start here:** install the supplied APK to test immediately. To modify it, extract
`Codebase.zip`, open its `Super-Wiss-Odyssey` folder, edit the source files, rebuild
the bundled HTML, then rebuild the APK. Never just rename a ZIP or HTML to APK.

---

## 1. Install and test on a phone

1. Copy or download `Super-Wiss-Odyssey-3.0.apk` to the phone and open it from Files.
2. Android may require permission to install from that specific file manager or
   browser. Grant it only to that source as needed, and turn it off after testing.
   Keep Google Play Protect enabled; do not bypass a security warning blindly.
3. Open **Super Wiss Odyssey** and hold the phone horizontally. The manifest
   supports Android 8.0 / API 26 and newer, with target API 36. A compatible modern
   Android System WebView is required.
4. Select **Heroes**, choose a hero, and tap **Play as …**. All eight heroes are
   available immediately. Use left/right arrows, hold Jump for height, and use
   the two circular hero-skill buttons independently.
5. Open **Worlds → Practice: on** to test any of the 15 maps. Practice has no
   campaign unlock, coin, mission, record or collection rewards.
6. To test Dragon or Orca immediately, open **Pets**, choose the companion, scroll
   its details, and tap **Test … in practice**. Then select any world and launch
   practice. You do not need to finish the campaign to test the rare abilities.
7. To collect pets permanently, rescue their glowing capsules during campaign or
   daily/endless play. They are saved at pickup. Equip the pet from the sanctuary
   before the next attempt; only one companion can be equipped at a time.

The APK uses the same QA certificate and package ID
`com.superwiss.game.playtest` as the v2 playtest, with version code **30** rather
than 20. It is intended to update that installation. Installation/update behavior
has not been exercised on a physical phone or emulator in this build environment.
Do not uninstall first unnecessarily: uninstalling or clearing storage erases
local progress. A different signing certificate or package ID changes update behavior.

The v3 save imports v2 coins, XP, settings, hero selection and cleared-map unlocks.
It retains a completion star for previously cleared maps, but restarts long-map
scores, times, extra objective stars and endless records. Old v2 storage is left
untouched. There is no cloud save. A checkpoint saves accumulated progress, not a
full mid-map resume snapshot; closing/restarting the app does not resume the exact
position in an unfinished attempt.

**This build is offline.** Google login, friends, multiplayer, online leaderboards,
ads, purchases and telemetry are not enabled. No INTERNET permission is requested.
Do not connect it to the old multiplayer server: that server simulates older rules.

## 2. Find the file you need

| You want to change | Edit this source |
|---|---|
| Hero names, descriptions and cooldowns | `game/heroes.json` |
| Pet names, rescue locations and active durations | `game/pets.json` |
| Power-up labels, icons and descriptive text | `game/powers.json` |
| Map names, size, gaps, enemies, music and theme | `game/maps.json` |
| Which actual image/audio file is loaded | `assets/manifest.json` |
| Individual images | `assets/heroes/`, `enemies/`, `pets/`, `powers/`, `tiles/`, `backgrounds/`, `ui/` |
| Actual music files | `assets/audio/music/` |
| Actual sound effects | `assets/audio/sfx/` |
| Movement, skills, collisions, damage, pickups and pet mechanics | `game/engine.js` |
| Drawing size, animation selection, camera, particles, scenery | `game/render.js` |
| Touch layout, colors, typography, panels | `game/style.css` |
| Menu structure | `game/index.html` |
| Menu behavior, buttons, settings and HUD | `game/app.js` |
| Missions, world-derived values and hero aliases | `game/data.js` |
| Save migration, rewards and records | `game/progress.js` |
| Audio decoding, event routing, volume and mixing | `game/audio.js` |
| SVG interface icons | `game/icons.js` |
| Native Java host / Android Studio configuration | `app/`, root Gradle files |
| Exact native source used for the supplied APK | `native/apktool/` |

**Do not edit `game/content.js`, `dist/Super-Wiss-Odyssey.html` or
`app/src/main/assets/game.html` as your normal workflow.** They are generated from
the source and will be replaced by the next build. `art-source/` contains the
approved boards. The runtime sprites are extracted assets, not live crops of a
remote website.

## 3. Preview changes without rebuilding Android every time

Install Node.js 22.16+ on your development computer. No npm package installation is
needed for the normal game build. In a terminal inside the project folder:

```sh
npm run validate
npm run build
npm run serve
```

Open `http://127.0.0.1:8080` in a browser. Refresh after each build. Stop the server
with Ctrl+C. It serves only the preview and editing guide, not signing keys.
Alternatively open `dist/Super-Wiss-Odyssey.html` directly; storage behavior can
vary for local HTML files, so localhost is preferable for save testing.

For each change:

```sh
# 1. Save your source changes in an editor.
# 2. Validate filenames, sprite dimensions, content and references.
npm run validate
# 3. Rebuild and synchronize the browser and Android assets.
npm run build
# 4. Exercise the relevant mode in the preview, then run the regression suite.
npm test
```

The builder embeds every registered image and audio file as a data URI. The APK
therefore needs no network connection to load art or music. `npm run build` does
not compile Android. It prepares the exact HTML the native app loads.

The baseline regression suite expects 15 worlds and 5× widths. After deliberately
changing the world count or baseline lengths, update those content-count tests
rather than treating the intended content change as an engine failure. Keep the
mechanical tests, run `npm run validate`, and play every changed route.

## 4. Replace a hero, monster, pet or item image

### The easiest method: keep the existing path and dimensions

1. Make a backup of the current PNG or commit it to version control.
2. Open the corresponding file, for example `assets/heroes/wissem.png`, in your
   preferred pixel-art editor. Use transparency, not a black rectangle.
3. Export the replacement using the same filename and canvas dimensions.
4. Run `npm run validate` and `npm run build`.
5. Inspect it in **Heroes** and in gameplay. Make sure the feet touch the floor,
   the face is legible on a phone, and the art does not misleadingly hide hazards.
6. Rebuild the Android package after the preview looks right.

| Asset | Current frame canvas | Notes |
|---|---:|---|
| Each hero | 128 × 160 PNG | Transparent, centered, feet near bottom; one pose supplied |
| Each enemy | 112 × 112 PNG | Transparent; golem is drawn larger in the renderer |
| Each pet | 160 × 128 PNG | Transparent; Dragon and Orca have explicit silhouette masks |
| Power-up icon | 64 × 64 PNG | Transparent; source mechanics are independent of icon shape |
| Coin spin sheet | 320 × 48 PNG | Eight 40 × 48 frames in one row |
| Chest/shrine | 80 × 64 PNG | Transparent |
| Terrain atlas | 256 × 32 PNG | Eight 32 × 32 tiles in one row |

The engine's collision boxes are not inferred from PNG transparency. A hero
remains 28 × 44 logical pixels unless `createRun()` is edited. Art size changes
belong in `drawHero()`, `drawMonster()`, `drawPet()` or `drawPower()`.
Test any hitbox change carefully: it changes jump clearances and map reachability.

### Use another filename or file type

Edit the matching key in `assets/manifest.json`, for example:

```json
"hero/wissem": {
  "path": "assets/heroes/wissem-custom.png",
  "frameWidth": 128,
  "frameHeight": 160,
  "frames": 1
}
```

Keep the logical key `hero/wissem` unless you also change the code that requests
it. PNG is recommended for transparent pixel art. The builder also accepts JPG,
WebP and SVG images. Sprite-frame validation is most thorough for PNG. A changed
extension must match the actual file format and manifest path. Use lowercase
extensions, relative paths inside `assets/`, and no remote URLs.

`assets/manifest.json` is the authoritative asset registry. A file merely copied
into `assets/` is not automatically used or shipped. `docs/ASSET-INVENTORY.json`
lists the registered files and their hashes after a build.

### Add genuine sprite animation frames

The shipped characters use detailed single poses with procedural bob, lean and
effect overlays. They are not full frame-by-frame animation sheets. To replace one:

1. Make a six-frame horizontal sheet, with identical 128 × 160 cells. Total size:
   **768 × 160**.
2. Use these hero frames: **0 idle; 1–3 running; 4 airborne; 5 knockout**.
3. Set the manifest `frameWidth: 128`, `frameHeight: 160`, `frames: 6` and the new
   file path. No physics change is necessary.
4. Run validation, rebuild, and check standing, running, jumping and damage states.

Enemy and pet frame sheets cycle at approximately 8 frames/second. Their frame
count can differ. The coin renderer uses eight supplied frames at 10 frames/second.
Frame selection/rates live in `game/render.js`; the manifest `fps` note does not
currently drive all renderers. Change `drawHero()` for a different animation layout.
Multi-row sheets are supported by `sprite()` when the sheet consists of whole cells.

### Use a different concept board

Normal builds do not rerun art extraction. Replacing a runtime PNG does not require
editing a board. For intentional re-extraction, update `art-source/` and the crop
rectangles/masks in `scripts/extract-art.py`, then run:

```sh
python scripts/extract-art.py
npm run validate
npm run build
```

That operation **overwrites the generated image assets**. It requires Pillow,
NumPy and SciPy. Coordinates and rare-pet polygon masks are retained in the script;
the board images are not uniformly arranged sprite sheets. Keep your custom work
backed up before invoking the extractor.

## 5. Replace or animate the block tiles

Each `assets/tiles/world-N.png` is an atlas of eight **32 × 32** pixel tiles.
The engine draws them at 40 × 40 logical pixels with nearest-neighbor sampling.
Replace the chosen atlas while preserving the grid, or set a new path under its
`tiles/N` manifest key. The map chooses that key using `tileSet`.

| Atlas frame | Visual role |
|---:|---|
| 0 | Grass/top-surface ground |
| 1 | Underground dirt/rock |
| 2 | Breakable brick |
| 3 | Unused glowing cache block |
| 4 | Used cache block |
| 5 | Solid stone/step |
| 6 | Supply-crate face |
| 7 | Reserved water tile visual |

The tile **image frame index** is not the collision **tile value**. In map edits,
value **0** is empty, **1** ground, **2** breakable brick, **3** usable cache,
**4** used cache, **5** stone. Ground automatically selects atlas frame 0 at its
surface and frame 1 below. Orca water is drawn and simulated as a temporary overlay;
it does not permanently replace the terrain grid.

Tiles are Minecraft-inspired block textures created for this game, not imported
Minecraft texture files. Bright surface edges, consistent shadow direction and
clear hazard contrast matter more than adding noisy detail to every block.

## 6. Change music

There are five independent stereo OGG loops: `frontier`, `moonlight`, `skyward`,
`clockwork`, `starlight`. A map's `music` field names one of them.

1. Export a loop you own or have permission to redistribute. OGG Vorbis is the
   current format; the builder also accepts MP3 and WAV. Keep levels below clipping.
2. Either replace `assets/audio/music/frontier.ogg`, or put a new file in that
   directory and change `assets/manifest.json`:

```json
"music/frontier": {
  "path": "assets/audio/music/my-adventure.ogg",
  "volume": 0.34
}
```

3. To add a separate theme, add a new key such as `music/ruins`, then set
   `"music": "ruins"` in the desired `game/maps.json` entry.
4. Build and click/tap in the preview to unlock audio. Music normally starts only
   after a user gesture. Open **Settings** to adjust the music/effects volumes
   independently.
5. Listen to at least two complete loops and pause/resume the game. Check for a
   click at the loop point, a long silent lead-in and excessive loudness.

`AudioEngine.tick()` selects tracks; `AudioEngine.load()` decodes embedded files;
`game/audio.js` contains the mixer, voice cap and event routing. Music is decoded
lazily and cached. Very large tracks increase memory usage even if the compressed
file is small. Prefer short, well-looped tracks, and test memory on a real phone.
Do not place a URL in the manifest: this app is offline and blocks network requests.

To intentionally regenerate the original compositions instead of replacing files:

```sh
python scripts/make-audio.py
npm run build
```

The generator requires NumPy and FFmpeg and overwrites its generated OGG files.
Tempo, chord progressions, instrument synthesis and melodies are in that script.
It is never run by a normal build.

## 7. Replace sound effects or add a new cue

Replace an existing OGG in `assets/audio/sfx/`, keeping its name, or update its
`sfx/NAME` manifest entry. Examples include `jump`, `coin`, `stomp`, `armor`,
`hurt`, `gravity`, `bomba`, `pet-bite`, `fire-shot`, `breath`, `flood`, `prince`,
`pet-found`, `checkpoint` and `finish`. The manifest contains all 27 cues.

```json
"sfx/coin": {
  "path": "assets/audio/sfx/new-coin.ogg",
  "volume": 0.7
}
```

Volumes range from 0 to 1. The in-game effect volume multiplies this per-file gain.
Keep coin/UI sounds short so they do not become tiring during repeated play.
The audio engine rate-limits repeated cues and caps concurrent effect voices.

For a new event, add the file and manifest entry, then emit a matching event from
`game/engine.js`, for example `emit(r, 'my-cue', x, y)`. The main loop calls
`audio.play(event.type, event)`. Add an alias in `AudioEngine.play()` when an event
should reuse a differently named cue. Hero and rare-pet skill events use their
skill ID for certain special sounds; inspect that routing before renaming them.
An image filename does not choose a sound automatically.

## 8. Enlarge an existing map

Maps are structured procedural courses, with editable JSON parameters and optional
authored tile edits—not a drag-and-drop level-editor format.
Every current world has `lengthMultiplier: 5`, so its tile-column count is exactly
five times the v2 baseline. World 1 is **172 × 5 = 860 columns**; world 15 is
**284 × 5 = 1,420 columns**. Horizontal world pixels are `columns × 40`. Play time is
not promised to be exactly five times longer.

The simplest supported edit:

```sh
npm run map -- list
npm run map -- length 1 6
npm run validate
npm run build
```

This changes the first world to **172 × 6 = 1,032 columns**, and creates a `.bak`
backup of `game/maps.json`. The command's map number is **one-based**. Runtime JSON
array IDs are zero-based. The supported sector multiplier is an integer from 1–20.

Or edit the map manually:

```json
{
  "name": "Sunpetal Valley",
  "baseLength": 172,
  "lengthMultiplier": 6,
  "enemyBudget": 7,
  "enemyDensity": 1,
  "powerDensity": 1,
  "basePar": 65
}
```

That is an excerpt, not a replacement for the entire map object: preserve its
other properties. Generation distributes obstacles, coins, enemies, pickups,
chests and checkpoints across the expanded route. It does not simply move the
portal to the right and leave the extra distance empty.

`baseLength` is one sector's width. `gaps` contains gap-start columns within that
sector; the generator repeats them with sector offsets. Changing `baseLength`
requires reviewing gap bounds, optional routes, checkpoints and time objectives.
Increasing `lengthMultiplier` is generally the safer first edit.

`enemyBudget` is approximately the per-sector monster budget before density and
safe-position caps. `enemyDensity` and `powerDensity` accept 0.1–4. Keep changes
moderate and test phones before raising counts: more entities affect difficulty
and CPU cost. Campaign monster counts currently rise from 35 to 140 per map.

The portal is five columns before the far end. The course has two checkpoint
aprons per sector. A rescue pet's `fraction` is relative to the expanded whole map,
so increasing a map moves that rescue proportionally farther along the route.
Changing width also changes time targets; `basePar × lengthMultiplier` supplies
the per-world par where the objective uses time. Coins/objective values are in
`mapObjectives()` and `WORLDS` in `game/data.js`.

## 9. Add a new map

Use a tested world as a template:

```sh
npm run map -- add 3 "Jade Highlands"
npm run validate
npm run build
```

This appends world **16**, copies map 3's current terrain/theme parameters,
slightly increases its base enemy budget, and registers its thumbnail. It reuses
the template's art/music until you replace them. It does not generate a new
illustration or guarantee that the new difficulty is balanced.

1. Edit the appended entry at the bottom of `game/maps.json`.
2. Change its `name`, `tagline`, colors, `night`, `roster`, gap pattern and densities.
3. Choose an existing `biome` to reuse that scenery logic; a completely new biome
   requires implementing its drawing behavior in `landscape()` and `prop()`.
4. Choose `background`, `music`, and `tileSet` keys that exist in the manifest.
   Add new assets and keys first when needed.
5. Replace `map/15` in the manifest with the new world's thumbnail. **15 is the
   zero-based ID for world 16.** Keeping the shared `path` intentionally reuses art.
6. Open the atlas in practice. Test the entire map, especially gap landings,
   moving platforms, ceiling clearance, pet rescue positions and portal access.
7. Update intentional baseline assertions in `tests/v3.test.mjs`, rebuild and run
   tests. Do not remove a failed physics assertion just to silence a broken route.

Campaign locks, save-array extension, daily rotation, world counters, the all-world
mission and endless looping use the current world count. Appending a map preserves
existing map indices. **Do not reorder or remove existing entries without writing
an explicit save migration**: saved achievements and pet rescue map IDs refer to
those positions. After a sixteenth map is added, endless loops after map 16.

### Place a specific block or pickup

Add optional entries to the map's arrays. `col` and `row` are zero-based tile
coordinates in the full expanded map. Row 12 is the main ground surface.

```json
"tileEdits": [
  { "col": 22, "row": 9, "value": 3 },
  { "col": 23, "row": 9, "value": 2 }
],
"extraSpawns": [
  { "kind": "power", "type": "ice", "col": 24, "row": 10 },
  { "kind": "enemy", "type": "golem", "col": 28, "row": 11 }
]
```

The arrays are applied after procedural generation. Custom cache blocks without a
separate configured `blocks` entry default to a shield item. `extraSpawns` places
power-ups at the supplied row. Enemy entries currently use auto main-route/flying
height; their `row` is a validated schema field, not a general enemy-height editor.
For enemies on custom elevated platforms, extend their spawn and movement code.
Do not erase the spawn, checkpoint aprons or portal floor. Do not create gaps
larger than ordinary jump reach unless an alternate reliable route exists.

To change gap width, spring rules, moving platforms, spike placement or the
checkpoint count itself, edit `makeLevel()` in `game/engine.js` and retest complete
routes. The renderer does not determine platform solidity.

## 10. Tune heroes, powers and pets

### Heroes

Change `name`, `role`, descriptive text, icon, color and **cooldown** in
`game/heroes.json`. Cooldowns are consumed directly by the engine. Keep existing
stable IDs when renaming. `heroById()` maps old save IDs to the new hero IDs.
Each hero currently requires exactly two skill definitions.

Skill effects and most hero durations are in the `activateSkill()` switch in
`game/engine.js`. Editing a description does not implement a new ability. Update
mechanics, UI descriptions, audio routing and regression tests together.
For example, Bomba's `.65` second fuse and `205 + 30 × crowdTier` blast radius are
in that function. Wissem's crowd-radius/tier calculation and accelerated recharge
are in `stepRun()`; the nearby-enemy tiers are 3, 6 and 9 enemies, capped at three.

### Powers and sources

Fourteen powers are in `game/powers.json`, but their actual effects/durations are
implemented in `applyPower()`. Update both when changing behavior. Spawn selection
uses the power roster; add a new power only after giving it a working engine case,
a registered image, optional sound, and tests.

Sources include main-route pickups, overhead caches hit from below, touch-opened
chests/crates, checkpoint shrines, selected defeated-enemy drops and companion
supplies. Opening a source is one-use for the current attempt. Caches produce
visible pickups rather than automatically granting their contents.

### Pets

Change `unlockWorld` (zero-based) and `fraction` (0.02–0.95) in `game/pets.json` to
move a rescue. Regular companion AI is in `updateCompanion()`. The wolf's bite
interval, mole's distance rewards, fox's supply interval and turtle guard recharge
are engine parameters, not merely descriptive JSON text.

Rare-pet active `duration` and `cooldown` values are read from their JSON skills.
Current duration is 45 seconds for all three rare active skills. Dragon Breath
has a 90-second cooldown; Orca's two independent skills have 100-second cooldowns.
A cooldown starts when activated, not after the effect ends. All timers freeze
while paused and continue across endless map transitions.

Dragon Scales is a **passive charge resource**, not the active Breath button. It
starts at 15 per attempt, spends one per enemy contact, and never refills at
checkpoints or the next endless world. It does not promise protection against a
cliff, spikes or an unrelated projectile. Breath triples the normal enemy-kill
award, including its existing combo multiplier; it does not triple coins,
checkpoints, completion bonuses or distance points.

Flood kills all current map enemies immediately, clears hostile projectiles and
prevents enemy pressure for 45 seconds, including on the next endless map. It is
not cliff protection. Orca Prince supplies a temporary water floor across gaps
and rescues a current fall; it does not by itself stop spike/enemy damage. Use
both buttons together for both protections. These distinctions are tested.

### Save/reset considerations

The active save key is `super-wiss:odyssey-v3`. Use a separate browser profile for
a clean test or clear that key in development tools. The native release exposes
no debugging bridge. Never make a production update silently clear all saves just
because the content changed. Add a versioned migration in `progress.js` instead.

## 11. Build Android packages after editing

### Android Studio / Gradle source route

1. Install Android Studio and open the **project root** containing `settings.gradle`.
2. Use JDK 17 for this configured Gradle project. Install Android SDK Platform 36
   and the SDK/build tools Android Studio requests.
3. Let Gradle synchronize. The project pins AGP 8.13.2 and Gradle 8.13. Its bootstrap
   scripts obtain the official wrapper with pinned checksums. Tool downloads need
   an Internet connection on your development computer; gameplay does not.
4. From the root, run `npm run validate`, `npm run build`, and the regression tests.
5. Build the nonproduction QA variant:

```sh
# macOS/Linux
chmod +x gradlew scripts/*.sh
./gradlew :app:assembleQa :app:bundleQa :app:lintQa

# Windows command prompt / PowerShell
.\gradlew.bat :app:assembleQa :app:bundleQa :app:lintQa
```

Expected outputs **after a successful local build**:

```text
app/build/outputs/apk/qa/app-qa.apk
app/build/outputs/bundle/qa/app-qa.aab
```

`Build-QA.bat` / `scripts/build-qa.sh` copy them into `artifacts/`.
The Gradle Java route was not executed here, and **no AAB is supplied**. The APK
included in this delivery was built through the exact smali route below. An AAB
is not a directly installable APK.

### Reproduce the supplied APK's exact native host

Requirements: Java, Node.js, Python 3 with `cryptography`, and a trusted Apktool JAR.
The jar is an external tool, not a game asset and not included in the archive.
Its executed-build version/commit are recorded in `native/README.md`.

```sh
# macOS/Linux, from the project root
APKTOOL_JAR=/absolute/path/to/apktool.jar sh scripts/build-playtest.sh
```

This rebuilds the offline HTML, runs the 124 core tests, assembles
`native/apktool/`, signs with the public QA key, verifies the APK's content, and
writes `artifacts/Super-Wiss-Odyssey-3.0.apk`. It uses no npm runtime dependencies.
The verifier includes negative tests that reject altered DEX, HTML and resources.
Java `jarsigner` verification and a separate Python APK-v2 verifier were executed.
The official Android SDK `apksigner` was **not** available/executed here.

The fallback native source and the Java Android Studio host are both included.
A Java host edit does not modify the smali host automatically. Rebuild using Gradle
for Java changes, or deliberately implement and test the matching smali change.
Game asset changes work in both routes after `npm run build`.

### Versioning and signing

Before installing a new update, increase the version code consistently in
`app/build.gradle` and `native/apktool/apktool.yml`. Preserve package ID and signing
certificate to update the same installed test app. `debug` uses a `.debug` package
suffix and can coexist with the QA app.

The bundled `qa/super-wiss-qa.jks` has alias `superwiss-qa` and the intentionally
public password `superwiss-testing-only`. It is for testing only. **Never publish
with that public key.** Production builds use a private key via
`keystore.properties` and the provided template. Do not place private signing
keys/passwords in source control, screenshots or shared ZIPs. The release helper
rejects the supplied QA certificate.

On a normal SDK-equipped machine, verify the finished package with the official
Android tool before distributing it:

```sh
apksigner verify --verbose --print-certs your-built.apk
```

Do not modify files inside an APK after signing; that invalidates the signature.
References: Android Developers, “apksigner”
(https://developer.android.com/tools/apksigner), and “Load in-app content”
(https://developer.android.com/develop/ui/views/layout/webapps/load-local-content).

## 12. Test checklist and troubleshooting

After an asset-only change, test its actual appearance in game—not just the
selection card. After a map/physics change, traverse the **whole route**, not only
the first screen. Test a small landscape phone as well as a large one.

| Symptom | Check |
|---|---|
| New art never appears | Correct manifest key/path? Did `npm run build` run? Did you reinstall the rebuilt APK? |
| Black rectangle around a sprite | Export RGBA transparency; don't use a screenshot with an opaque backdrop. |
| Cut-off/wrong animation frames | Total sheet dimensions divisible by frame dimensions? Correct six-frame hero layout? |
| Character looks huge but collision is small | Renderer draw size and engine hitbox are separate. |
| Music silent | Tap first; check sound/music toggles and both gain values; check decode warnings and true file format. |
| Guide or settings scrolls but game does not move | Close the modal/resume. Paused play intentionally releases controls. |
| A map is locked | Use Practice, or complete the preceding campaign world. |
| Rare pet button absent | Equip that rare pet, or choose its “Test in practice” action. Regular pets are automatic. |
| New map has old appearance | Template assets are reused until you change its manifest keys/theme. |
| Newly added map fails baseline tests | Update deliberate 15-world assertions; preserve and rerun mechanical tests. |
| APK says app not installed | Record the exact Android error, installed version/certificate, device model and OS. Don't blindly uninstall or disable protections. |
| Gradle cannot download | Check your local SDK/JDK/network/proxy configuration; the source is not a bundled SDK distribution. |
| Progress disappears in browser | File-origin storage may be unavailable; use localhost. Native persistence still needs device QA. |

Executed automated evidence is in `docs/TEST-REPORT.md`, the TAP/JSON logs and the
APK verification report. Browser/emulated touch tests are not native Android
performance tests. Before a store release, finish physical-device installation,
background/resume, audio, persistence, thermal/performance, cutout, controller,
accessibility, signing and store-listing review. This source is an offline test
build, not a declaration of Google Play approval.
