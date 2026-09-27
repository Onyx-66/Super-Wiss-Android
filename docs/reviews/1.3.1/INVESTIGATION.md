# Super Wiss: pre-edit investigation

Source: the uploaded Super-Wiss-Ascension-1.3.0-source.zip, not the older GitHub source pack or any unprovided local changes.

Archive SHA-256: `034ef124c4f6403ae033abce78cdcc337eaecbf9c49f1b98fd0b3ac1c97f958d`.

## Skills availability
The named Agent Skills were not exposed by the available skill discovery and were not found in the accessible Project/Library searches. There is no SKILL.md in this archive. This report does not claim to have applied those private standards. Upload their text/files for a standards-specific review. Findings below come from the source, screenshots and public Android documentation.

## Exact current assignments

| Hero | COMBAT_PROFILES.weapon | projectile | heroes.json.weapon |
|---|---|---|---|
| Wissem | `gauntlet` | `—` | Gravity gauntlets |
| Kossay | `dual` | `—` | Twin fangs |
| Yakine | `staff` | `arcane` | Orbit crescent |
| Taky | `dagger` | `—` | Shadow knives |
| Garsi | `shield` | `—` | Stonebreaker hammer |
| Tounsi | `sabre` | `—` | Wind scimitar |
| Youssef | `gadget` | `bolt` | Clockwork knuckles |
| Loey | `bow` | `arrow` | Sky spear |
| Rayan | `No explicit entry; fallback sabre` | `—` | Sun lance |
| Mira | `No explicit entry; fallback sabre` | `—` | Frost staff |

## Decisions before edits
- Loey: keep the bow/arrow behavior; change display name Sky spear to Sky bow. The source sprite already contains a bow. Her existing numerical reach remains unchanged in this patch.
- Garsi: `shield` is a combat/renderer category, not a literal display weapon name. Existing procedural code draws BOTH a shield and hammer, and the source body already contains a shield. Keep the defensive profile key and use one external stonebreaker_hammer.png; do not add a second shield PNG in this phase.
- Youssef: `gadget` is the existing ranged category (`bolt`); retain it while using a mechanical knuckle PNG. Do not silently convert him to melee.
- Rayan: add explicit `lance`, retaining his old fallback timing/movement so this does not become an unsolicited rebalance. His source body is a Garsi recolor with a shield.
- Mira: add explicit `frost_staff`, projectile `ice`, retaining fallback cadence/movement. This intentionally changes basic attacks from fallback melee to ice shots; test it and document it. Her source body is a Yakine recolor.

## Current procedural function, verbatim

```js
/** Original procedural weapons, attached to a moving hand rather than static UI art. */
function drawHeroWeapon(c,p,t){const profile=combatProfile(p),weapon=profile.weapon,progress=p.attackTime>0?1-p.attackTime/(p.attackDuration||.2):0,active=p.attackTime>0,cast=p.castTime>0;c.save();c.translate(15,-32+(p.landTime>0?4:0));
 if(weapon==='bow'){const pull=active?Math.sin(progress*Math.PI)*13:0;c.strokeStyle='#f4cd78';c.lineWidth=3;c.beginPath();c.ellipse(0,0,13,23,0,-Math.PI/2,Math.PI/2);c.stroke();line(c,[[0,-23],[-pull,0],[0,23]],'#c6f6e9',1.5);if(active)line(c,[[-pull,0],[23,0]],'#fff4cb',2);ellipse(c,-pull,0,3,3,'#dcb390');}
 else if(weapon==='staff'){c.rotate(active?-.25-progress*.35:Math.sin(t*2)*.05);line(c,[[0,24],[0,-30]],'#ad83d2',4);star(c,0,-34,8,'#b5f5ff',5);if(active||cast){glow(c,0,-34,24,'#9ecbff',.45);for(let i=0;i<3;i++)star(c,Math.cos(t*10+i*2)*19,-34+Math.sin(t*10+i*2)*19,3,'#e2b4ff',4);}}
 else if(weapon==='gadget'){c.translate(active?-progress*9:0,0);box(c,-5,-8,23,15,'#788b9e',3);box(c,14,-4,15,6,'#8ee9ff',2);ellipse(c,0,0,4,4,'#f1c474');}
 else if(weapon==='shield'){ellipse(c,-11,1,15,23,'#7898ab');ellipse(c,-11,1,11,18,'#374f70');star(c,-11,1,7,'#edcd86',4);c.rotate(active?-1.8+progress*3:.25);line(c,[[9,19],[9,-35]],'#deb97b',5);box(c,-2,-41,24,15,'#c5d8e2',3);}
 else if(weapon==='gauntlet'){c.translate(active?Math.sin(progress*Math.PI)*25:0,active?-progress*6:Math.sin(t*3));box(c,-4,-5,14,12,'#e29a69',3);if(active||cast){c.strokeStyle='#84d7ef';c.lineWidth=2;c.beginPath();c.arc(6,0,15+progress*10,0,Math.PI*2);c.stroke();}}
 else{const blade=(offset,reverse)=>{c.save();c.translate(offset,reverse?9:0);c.rotate(active?(reverse?1:-1)*(1.5-progress*3.5):-.35);line(c,[[0,12],[0,-8]],'#bc9070',4);line(c,[[-7,-8],[7,-8]],'#ffd596',3);line(c,[[0,-8],[weapon==='sabre'?8:0,weapon==='dagger'||weapon==='dual'?-29:-44]],'#d2f6fa',4);c.restore();};blade(0,p.attackChain%2===0);if(weapon==='dual')blade(-23,p.attackChain%2!==0);}
 c.restore();}

```

A second source of stick art is in `drawCosmeticParts`, currently:
```js
 if(part==='weapon')line(c,[[16,-16],[27,-46+Math.sin(t*2)]],color,3);
```
Both drawings must be removed, not only the large sword.

## Existing asset contract
- `assets/manifest.json.images` maps keys to relative `assets/...` paths and frameWidth/frameHeight/frames.
- `game/assets.js.loadArtwork()` creates Image objects in imageCache under the exact manifest key.
- `assetImage(key)` returns the cached Image; it does not load a path.
- `sprite(ctx,key,x,y,w,h,frame)` obtains that Image and manifest dimensions, computes a row/column source rectangle, disables image smoothing and calls drawImage.
- `assetUrl(key)` preferentially uses `key + '/still'` for DOM images. This differs from sprite's exact-key lookup.
- `scripts/bundle.mjs` embeds media only in the standalone browser preview. Android gets a small game.html, separate game.js/CSS and streamed raw APK media. Preserve this architecture and the existing HTTPS origin.
- The current validator/bundler require EVERY registered path to exist. Registering the unprovided weapons without an explicit pending-asset rule would break builds/boot.

## UI diagnosis
- `game/app.js.updateTop()` calls paintPortrait(profilePortrait, save.hero, true); the player-selected avatar is actually save.profile.avatar. This is a reproducible source mismatch. The name already comes from save.profile.name; do not rename Mr Onyx.
- The top card aria-label is Select hero, but its click opens Profile: label/behavior mismatch.
- `paintPortrait()` calls drawHero(), which overlays procedural weapons, so weapon sticks are repeated in identity and roster portraits. Portraits should contain-fit still art, not use the combat renderer.
- Verified the eight core hero sheet paths and pixels are distinct. Wissem/Kossay/Yakine do NOT share a manifest path/placeholder. The reference screenshot does not prove duplicate sprites.
- Rayan is an intentional Garsi recolor and Mira a Yakine recolor, with separate paths/pixels; this is a content limitation, not an incorrect manifest alias.
- Hero roster is a vertical scroll area with fixed 174px rows (148px at low height), a fixed canvas height and many layered CSS overrides. At 960x443 a fresh entry is not overlapped: the first row fits, the second is only partially visible. A screenshot with half the first row can also be a scrolled list; its scrollTop cannot be recovered from the image. Test entry/selection/scrolling before asserting a layout cause.
- Source sprites already include weapons. Replacing procedural overlays does NOT erase embedded weapons. Proper independently swappable weapons require weapon-free hero/outfit sheets. Do not silently claim that PNG replacement can remove those pixels.

## Proposed scope
Remove procedural overlays; implement optional weapon registration through the existing manifest/cache/sprite loader; deterministic attack-phase frame 11/12 poses; explicit lance/frost profiles; portrait-only renderer; saved-avatar identity; scoped roster geometry/scroll handling; supplied logo on home/loading/native startup and an adaptive launcher mark. No economy, networking, save-schema or physics changes outside the explicitly requested Mira profile assignment.

## Missing inputs / build environment
The individual final weapon PNGs are not supplied, and assets/weapons does not exist in the uploaded archive. The style reference will not be extracted or shipped as weapon art. Native SDK/Gradle caches are absent; direct downloads of the Android CLI and Gradle fail DNS/download. No APK/AAB compilation has occurred.
