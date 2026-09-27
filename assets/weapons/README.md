# Weapon sprite handoff — v1.3.1 SOURCE candidate

**No final weapon PNG has been supplied or fabricated.** The 3x3 image is an art-style reference only and is not bundled. There are ten registered, optional, single-frame slots. Until artwork arrives the game keeps the weapon pixels already present in the approved hero sheets and draws **no procedural stick weapon**.

## Definitive file list

All paths are relative to the project root. On your computer the directory is `C:\Users\kossa\Desktop\Super-Wiss\assets\weapons`.

| Hero | Combat weapon key | Manifest key | Filename | Grip within 256x256 canvas |
|---|---|---|---|---|
| Wissem | gauntlet | weapon/gauntlet | gravity_gauntlet.png | 50%, 50% |
| Kossay | dual | weapon/dual | twin_fang_dagger.png | 50%, 84% |
| Yakine | staff | weapon/staff | orbit_crescent_staff.png | 50%, 84% |
| Taky | dagger | weapon/dagger | shadow_knife.png | 50%, 84% |
| Garsi | shield | weapon/shield | stonebreaker_hammer.png | 50%, 84% |
| Tounsi | sabre | weapon/sabre | wind_scimitar.png | 50%, 84% |
| Youssef | gadget | weapon/gadget | clockwork_knuckle.png | 50%, 50% |
| Loey | bow | weapon/bow | sky_bow.png | 50%, 50% |
| Rayan | lance | weapon/lance | sun_lance.png | 50%, 72% |
| Mira | frost_staff | weapon/frost_staff | frost_staff.png | 50%, 84% |

One PNG per hero. Kossay's one dagger image is rendered twice; Wissem's gauntlet can also use two instances. Garsi's existing shield is part of the body art: a separate shield is not an eleventh required weapon. Youssef keeps existing gadget/bolt combat, not a new melee ruleset.

## Art contract

Export RGBA PNGs at exactly **256x256**, transparent exterior, no text, baked background, drop shadow, checkerboard or showcase frame. Keep comfortable transparent margin. Match the supplied pixel-art style reference without extracting its pixels. Swords/staves/hammer/lance point UP at rest with the hand grip near the coordinates above. Bow limbs are vertical, arrow firing direction RIGHT; grip at center. Gauntlets/knuckles face RIGHT with the wrist/grip at center. Avoid directional lettering because left-facing gameplay mirrors the art. Weapon pixels will be displayed approximately 23–63 logical world units tall; prioritize legibility over microscopic ornament.

The grip table is the initial engineering convention, not an art measurement that has already been verified. Update `WEAPON_ART` in `game/weapon-art.js` after inspecting the final assets. Do not trim transparent canvas margins later without recalibrating the anchor.

## Registration already present

Example in `assets/manifest.json`:

```json
"weapon/sabre": {
  "path": "assets/weapons/wind_scimitar.png",
  "frameWidth": 256,
  "frameHeight": 256,
  "frames": 1,
  "optional": true,
  "status": "awaiting-user-art"
}
```

The existing cache and `sprite()` function load/draw this asset; there is no separate HTTP loader or per-frame `new Image()` call. The builder marks missing optional weapon entries unavailable in the **generated runtime manifest**, not in your source data. These ten pending entries are omitted from decoding. Missing required art still fails validation/normal boot.

## IMPORTANT: existing hero sheets contain painted weapons

Adding a separate weapon on top of those sheets would create double weapons. This patch therefore marks every current base/outfit sheet `weaponLayer: "baked"`. **Just adding a weapon PNG will register and load it, but will not add an overlay over a baked body.**

To enable independent weapon art for one hero:

1. Save the final PNG at its exact path above.
2. Supply a weapon-free replacement for that hero's existing 128x160 x14 body sheet, retaining the frame order. Keep shields that are intended as body equipment. Never erase a solid color globally: that can destroy dark armor and outlines.
3. In the matching `hero/<id>` manifest entry, change `weaponLayer` from `baked` to `separate`. Do the same only for each outfit sheet that has actually been made weapon-free. Mixed ready/pending outfits remain safe.
4. Optional per-body `weaponSockets` maps frame numbers to hand positions in **hero-local logical units**, for example `"weaponSockets":{"0":[14,-31],"11":[11,-33],"12":[18,-28]}`. Hero origin is the feet; negative Y is above them. These are initial defaults, not universal correct sockets for all future sheets.
5. Tune height, grip anchor, idle angle and motion type in `game/weapon-art.js`. Validate idle, run, jump, crouch, landing, attack11/12, dodge, both facings and vertical aim. Final art-specific alignment cannot be certified before the assets exist.
6. Once all ten files are present, run `npm run validate:weapon-art`. Remove optional/pending status or set `optional:false` for production-ready required weapons. Do not declare an absent image finished.
7. Run `npm run build`, tests, and rebuild/reinstall Android. Never edit generated `game/content.js` or `app/src/main/assets` as source.

Current portrait cards intentionally use the separate still illustration (`hero/<id>/still`) or frame 0, contain-fitted. They no longer call the combat renderer. Supply updated still illustrations separately when you want portraits to depict the final loadout. Custom static bow art does not itself animate a drawn string; that needs a future animated sheet/rig.

## Animation and combat boundaries

Body attack frames are selected by elapsed attack phase, not a wall-clock flicker: 11 during anticipation/early active phase; 12 later in the attack. The same phase drives weapon swing/thrust/recoil/cast transforms and frame-indexed hand sockets. Left/right facing is inherited from the parent hero transform. Body size/crouch transforms apply to the weapon too.

Mira now has explicit `frost_staff` / `ice` basic projectile attacks. Rayan has explicit `lance`, retaining previous fallback numeric timings. No new frost slow debuff was added. Normalized PvP behavior remains shared; hero-specific visuals do not change hitboxes or damage. New solo records use rules revision 4; old revision 3 records are retained, not relabelled.

Saved procedural weapon-tint selections are preserved but no longer draw the removed colored rod. A real weapon-skin inventory/tint pipeline is a follow-up, not implemented by this patch.
