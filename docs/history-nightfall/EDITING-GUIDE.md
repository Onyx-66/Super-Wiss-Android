# Super Wiss Nightfall 4.0
## Editing, rebuilding and testing your game

The APK is an installable, test-signed package. The HTML is a browser preview. The ZIP
contains the complete current project. They are different deliverables. This guide
covers the native Java shell, the bundled Canvas game and the optional account service.

## 1. Install and start testing

Download `Super-Wiss-Nightfall-4.0.apk`, open it from Files on Android, and follow the
installer. Allow installation from that specific file manager only when prompted;
keep Play Protect on. Do not bypass a security warning blindly. Send the exact error
and phone/Android version when reporting an installation failure.

The package is `com.superwiss.game.playtest`, version code 40, version name
`4.0.0-playtest`, minimum API 26 and target API 36. It uses the same deliberately public
QA signing certificate as v3, so it is intended to update the earlier playtest. Updating
has not been tested on hardware. Avoid uninstalling unnecessarily: local progress is
erased when the application is uninstalled or its storage is cleared.

The manifest requests landscape. Large-screen system behavior still needs testing.
A recent compatible Android System WebView is required. All game images and audio are
bundled; there are no asset downloads or ads. This update adds Internet permission for
optional accounts and Bluetooth permissions for optional nearby matches. It does not
request location, microphone, contacts or storage access.

For an immediate fight, tap **Boss Hunt**, select a difficulty and boss, then play.
Nightmare is default. Veteran is the gentler test tier; Inferno is extreme. **Worlds →
Practice: on** exposes every map without campaign rewards. **Pets → Test in practice**
lets you inspect rare abilities without grinding unlocks. Boss Hunt records are local
and separated by boss, tier and equipped pet; character name is saved with the record.

## 2. Learn the controls and combat rules

Drag the left analog pad gently to walk, fully to run. Its radial dead zone avoids small
unintended movements. Drag upward/downward while striking to aim; a downward airborne
hit bounces you upward. Hold Jump for height. Settings supports arrows, mirrored controls,
button opacity, audio sliders, lower graphics, reduced extra motion and optional haptics.

| Action | Keyboard | Gamepad | Resource |
|---|---|---|---|
| Move / aim | A,D / W,S | Left stick / D-pad | None |
| Jump | Space | A | None |
| Strike | J | X | 8 stamina; 0.34 s interval |
| Throw knife | K | Y | 1 knife; 0.45 s interval |
| Dodge | L | B | 25 stamina; 0.9 s cooldown |
| Hero skills | E / Q | Triggers | 28 / 38 focus; independent cooldowns |
| Pet skills | F / G | Bumpers | 55 soul; shared 2-use budget per attempt |
| Summon | R | Back/select button | 60 soul; 2 charges; 60 s cooldown |
| Pause solo | Escape | Start | Solo only; local multiplayer continues |

You start with 12 throwing knives. Ordinary enemies can drop ammunition and chamber
rewards replenish it, capped at 18. Stamina regenerates; focus regenerates more slowly
at higher difficulty. Melee hits and ordinary kills rebuild focus/soul. Summons last
18 seconds. Choose **warden, ravens or sentinel** in Settings before a run. These are
support attacks, not permanent extra characters. Pet ultimates keep their earlier
45-second effects but now consume soul and uses. Dragon Scales and Orca Flood do not
instantly defeat bosses. Flood does not farm replacement soul/ammunition.

Bosses telegraph attacks, briefly lock damage between phases, and leave recovery
windows. Each hit is capped at four boss damage. Learn the pattern instead of trying
to erase the encounter with a single Bomba or rare-pet activation. Boss tiers have
5/4/3 starting hearts; ordinary campaign retry budgets are 3/2/1. Boss Hunt and endless
are single-attempt modes. Solo can be paused; unfinished runs do not resume at the exact
position after process death. The visible checkpoint is not a full disk snapshot.

## 3. Locate editable files

| Edit | Source |
|---|---|
| Boss names, HP, attack sequences, palette | `game/bosses.json` |
| Difficulty budgets | `DIFFICULTIES` in `game/bosses.js` |
| Hero names, skill text and base cooldowns | `game/heroes.json` |
| Map lengths, enemy lists, gaps, music, terrain edits | `game/maps.json` |
| Pet unlock points, base cooldown/duration metadata | `game/pets.json` |
| Asset file mapping, frame dimensions and volume | `assets/manifest.json` |
| Combat costs, projectiles, chambers and boss behavior | `game/engine.js` |
| Scene art, animation selection, stargate and camera | `game/render.js` |
| Menus, HUD, account/nearby flows | `game/app.js`, `game/index.html`, `game/style.css` |
| Analog dead zone and normalization | `game/controls.js` |
| Host-authoritative local matches / wire protocol | `game/arena.js`, `game/link.js` |
| Native transport, lifecycle and trusted WebView | `app/src/main/java/com/superwiss/game/playtest/` |
| HTTPS account API and SQLite schema | `server/index.mjs` |

`game/content.js` and the BOSSES table at the top of `game/bosses.js` are generated.
Edit the JSON, not those generated tables. `compile-content.mjs` preserves the
DIFFICULTIES declaration below the generated boss table. Keep that declaration intact.

## 4. Replace an image with transparency

1. Back up the original PNG and `assets/manifest.json`.
2. Export your replacement as **RGBA PNG**, with a real alpha channel. A black checkerboard
   painted into the image is not transparency. Keep important dark outlines opaque.
3. Replace the referenced file or change the entry's `path`. Paths are relative to the
   project root, such as `assets/heroes/wissem.png`.
4. For a static icon, remove animation metadata or set `frames: 1` and the correct full
   image dimensions. For a sprite sheet, use complete equal-size frame cells.
5. Run `npm run validate`, rebuild and inspect it against both light and dark scenes.

For example, a horizontally packed replacement hero sheet:

```json
"hero/wissem": {
  "path": "assets/custom/wissem-run.png",
  "frameWidth": 128,
  "frameHeight": 160,
  "frames": 14
}
```

The actual manifest supplies the shipped dimensions; use those dimensions for a direct
replacement. `hero/wissem/still` supplies the menu portrait. Replacing only that entry
changes the portrait, not gameplay. Enemy and pet entries follow the same pattern.
For boss menus there is also a `/still` entry. Cropping a board with UI text/background
into a sprite is not enough: remove the frame and matte before packing the sheet.

`python scripts/animate-assets.py` regenerates the included cutout animation sheets.
It cleans edge-connected dark mattes, articulates lower limbs/wings/tails, and adds
original boss crowns. It is a reproducible starting point, not a hand-animation tool.
Regenerating overwrites generated animation files: keep custom sheets in a different
folder and point the manifest there. Python dependencies: Pillow, numpy and scipy.
The extraction guide/scripts in `art-source/` retain the approved board provenance.

## 5. Author more expressive animation

The shipped hero layout is 14 frames: **0 idle, 1–8 run, 9 jump, 10 fall, 11–12 attack,
13 dodge**. Several poses intentionally share source geometry. Pet and ordinary enemy
sheets contain eight frames. The renderer chooses frames using actual movement/action
state, not just a translated PNG. Wings use flap cycles and land pets use leg cycles.
Boss sheets also use eight frames.

For a hand-drawn 24-frame hero sheet, update `frames`, dimensions and the corresponding
frame selection in `drawHero` / hero rendering in `game/render.js`. Add proper idle,
run, attack, hurt and airborne sequences rather than cycling unrelated poses. Use the
same pivot and foot baseline in every cell so the character does not bounce sideways.
Collision dimensions are independent of artwork: adjust `player.w/h` or enemy creation
in `engine.js` only when gameplay hitboxes genuinely need changing.

## 6. Replace music and sound effects

Open `assets/manifest.json`, find an `audio` entry, and replace its file or path.
The shipped game includes 41 sound cues and six music loops. Boss combat uses `music/boss`.
The previous five world loops remain assigned through each map's `music` field.

```json
"music/boss": {"path":"assets/audio/music/my-boss-theme.ogg", "volume":0.5}
```

Use the existing entry as the exact shape; preserve any loop fields present. Keep
mastered levels conservative and audition with several simultaneous combat sounds.
Aim for seamless loops with matching start/end levels; long recordings increase APK
size and decoded memory. OGG, WAV and MP3 are supported by the bundler. Test your codec
on the oldest supported Android WebView rather than relying only on desktop playback.
The user still controls master/music/effect levels independently.

`python scripts/make-nightfall-audio.py` reproduces the 14 added combat cues and original
boss loop (numpy plus ffmpeg required). `scripts/make-audio.py` contains the earlier
original sound generation. These are optional authoring tools, not runtime dependencies.
Do not replace files with recordings whose distribution rights you have not obtained.

## 7. Enlarge, duplicate or add a map

```sh
npm run map -- list
npm run map -- length 1 6
npm run map -- add 3 "Jade Highlands"
npm run validate
npm run build
```

Map numbers in the helper are **one-based**; JSON arrays and engine IDs are zero-based.
The shipped `lengthMultiplier` is 5. Changing it to 6 makes the map six times its base
sector size, not six times its already-enlarged size. The tool makes `.bak` files before
editing. `baseLength × lengthMultiplier` is the authored tile-column count; a tile is
40 logical pixels. Width does not directly equal completion time.

Append maps rather than inserting/reordering existing indices, because saves refer to
map indices. A duplicated map initially reuses the template's art/audio. Update its name,
biome, palette, gaps, `roster`, `enemyBudget`, `enemyDensity`, `powerDensity`, background,
`tileSet`, music, thumbnail and optional `tileEdits` / `extraSpawns`.

The 15 existing bosses are assigned to maps cyclically. A sixteenth map initially reuses
the first boss. To add a new unique boss, append a definition and matching art (section 9),
then review the map-to-boss assignment. Nearby matchmaking intentionally supports the
first 15 maps in this version; update its range checks/protocol and tests to extend it.
Changing content counts requires updating baseline tests and save migration intentionally.

## 8. Edit multi-stage chambers, gates and terrain

`buildNightfallStages` / the chamber-construction section in `engine.js` places three
chambers at 20%, 46% and 72% of a map, replacing parts of the straight route. Each is
27 tiles wide. The first requires an ascent, the second climbing from the right and
returning left, and the third two separate fragments. Wardens spawn after fragment
collection. Defeat every warden to unlock the gate. A boss seals the final arena.

Edit the `pads` and `points` arrays in that section to move ledges and fragments.
Coordinates are tile offsets inside the chamber. `GROUND` is the floor baseline.
Keep ledge gaps reachable with the **least mobile hero**, not only with Wissem's gravity
skill. Include a lower recovery route and a clear camera view. Do not spawn pickups
inside solid terrain, a closed gate, or the player's arrival position.

The final arena should have an uninterrupted floor, sufficient dodge space, and
recognizable attack warnings. `makeArenaLevel` supplies Boss Hunt and local PvP; campaign
arenas are integrated into each long map. The stargate geometry lives in `render.js`.
Its open/closed state is driven by chamber and boss completion, not decorative effects.

## 9. Tune or add a final boss

In `game/bosses.json`, use a unique lowercase ID, display name/title, existing sprite
archetype, palette, positive HP, scale, and an ordered attack list. Supported patterns:
**dash, slam, fan, rain, thorns, waves, orbs**. Bosses have three phases at 67% and 33% HP.

```json
{
  "id":"jade-warden", "name":"Jade Warden", "sprite":"golem",
  "title":"GUARDIAN OF THE HIGHLANDS", "color":"#a4e8ae",
  "hp":130, "scale":1.25, "attacks":["slam","thorns","fan"]
}
```

Register `boss/jade-warden` and `boss/jade-warden/still` art entries. Regenerate the
boss sheets only after confirming your archetype exists; otherwise supply custom art.
Tune windups and recovery windows in `windupBoss`, `executeBoss` and `updateBoss`.
Add a new pattern to all three relevant parts: simulation, telegraph renderer and
sound/label mapping. Do not add an attack name only to JSON: an unimplemented pattern
cannot become a new mechanic by renaming it.

The current highest difficulty is experimental. Full human balance and full-campaign
completion are still unverified. `tests/boss-pilot.mjs --survey` uses ordinary inputs;
its failed attempts are retained instead of hidden. Unit fixtures that directly place
an actor or damage a boss validate mechanics, not human playability.

## 10. Change skills, pets and economy restrictions

Each hero keeps two skills; metadata is in `heroes.json`, behavior in `useSkill` in
`engine.js`. The 28/38 focus costs, global skill lock and 1.35× cooldown multiplier are
also engine rules. Updating a description alone does not alter the mechanic. Pet active
skills retain 45-second duration and independent cooldowns, plus a two-use attempt cap
and 55 soul cost. Summons are selected before a run and never consume real money.

Adjust costs and budgets together, test every damage source against boss phase locks,
and ensure charges do not refill at checkpoints or endless transitions. Local PvP
intentionally disables hero skills, pets and summons and gives all players equal hearts,
melee, knives and dodge. This avoids rare-pet ownership deciding a match before it starts.
It is not a global ranked anti-cheat system: the host controls its local simulation.

## 11. Bluetooth party setup and account deployment

See `NETWORK-AND-ACCOUNTS.md` for the complete protocol and service guide. The short
Bluetooth path is: install the **same v4 APK on every phone**, pair each guest with the
host in Android Bluetooth settings, return to Nearby, allow Nearby devices access,
choose Host on one phone and that paired host on every guest, choose mode, ready up,
and start. 2v2 requires exactly four phones. All players remain inside the game.
Backgrounding, disconnecting or losing the host cancels the match; there is no host
migration or background service. This must be verified with real radios.

Online account setup is optional and separate. Run `server/index.mjs` behind HTTPS,
configure exact allowed origins including `https://appassets.androidplatform.net`, and
enter your HTTPS origin in **Profile → Server settings**. The native host blocks other
network origins. Never use a server you do not trust. To disconnect, clear that field
and submit. Guest and Bluetooth profiles remain local.

Sign-up uses username/password, not Google. Save the once-shown recovery code: no email
address is collected and there is no email recovery. Friends require an accepted request.
Avatars/banners/frames use allowlisted local art, not arbitrary uploads. Blocking removes
the friend connection; reports require a human operator. Account deletion is in-app and
at `/delete-account` on your deployed service. It does not erase each phone's offline
save. There is no cloud backup of campaign progress.

## 12. Rebuild the preview, APK and optional bundle

From the extracted project root, install Node.js 22.16 or newer. No `npm install` is
required for runtime dependencies.

```sh
npm run validate
npm run build
npm test
npm run serve
```

Open the local address printed by the server. The portable HTML can also be opened
directly, but browser file-storage restrictions vary. Android uses a stable bundled
origin. Never edit only `app/src/main/assets/game.html`: the next bundle overwrites it.

For Android Studio, install SDK 36 and JDK 17, open this project root, prepare/download
the checksum-verified Gradle wrapper using the provided scripts, and synchronize.
Then run **Build-QA.bat** on Windows or **scripts/build-qa.sh** on macOS/Linux.

```sh
./gradlew :app:assembleQa :app:bundleQa :app:lintQa
```

A successful SDK build produces `app/build/outputs/apk/qa/app-qa.apk` and
`app/build/outputs/bundle/qa/app-qa.aab`. **That build route was not executed here and
no AAB is included.** The debug variant has a separate `.debug` package suffix.

The supplied APK instead used this executed QA fallback:

```sh
DEX_TOOLS_LIB=/trusted/dex-tools/lib sh scripts/compile-native.sh
APKTOOL_JAR=/trusted/apktool.jar sh scripts/build-playtest.sh
```

This compiles the readable Java against minimal compile-only API signatures and converts
only the app classes to DEX. Signatures are never shipped as Android framework code.
Apktool/AAPT2 builds resources; the DEX is inserted and test-signed. `native/compiled`
contains the actual compiled host used by this delivery. This is not equivalent to
SDK API lint, Android runtime verification, device installation or official apksigner
verification. Rebuild with the normal SDK and test on phones before production.

The QA key in `qa/` is public. Never use it for a production/upload identity. Configure
your own private `keystore.properties`, final application ID and versioning for release.
The release task rejects the included QA certificate. Do not put private credentials,
server databases or real account tokens in the source ZIP. See the release checklist.

## 13. Test changes before sharing them

Run `npm test` for combat, local protocol and real HTTP account tests. `npm run validate`
checks asset paths/frame geometry. `npm run test:browser` needs Python Playwright and
Chromium; set the Chromium executable in the test for your machine. The browser suite
uses a test-only storage adapter and transport mock, injected only into a copy. It tests
actual touch events and two rendered clients but does not test Android Bluetooth radios.

Use `docs/DEVICE-TEST-CHECKLIST.md` for actual phones: native launch, saves after force-stop,
Bluetooth permissions, two/four phones, slow radio/disconnect behavior, accounts over
HTTPS, frame pacing, audio focus, controls and battery. Capture the exact app version,
phone models, Android/WebView versions and reproducible inputs with every issue.
