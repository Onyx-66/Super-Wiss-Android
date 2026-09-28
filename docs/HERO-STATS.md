# Hero capability ratings, names and weapon eligibility

## What the four ratings mean
These are **fixed capability ratings derived from the original signature combat profiles**, not four new independent power multipliers. The stock armed profiles are unchanged. They are a roster comparison and eligibility layer; currently equipped foreign-weapon timings do not recursively change eligibility. No XP/cosmetic purchase raises them.

Let C = startup + active + recovery in `game/combat-profiles.js`; D = the hero's existing `combatStyle.damage` from `game/heroes.json` (default 2). Reference cycle C0 = 0.46 seconds, damage D0 = 2, scale = 100.

```
Power   = round(100 × (D / 2) × 0.46 / C)
Magic   = round(100 × (projectileDamage / 2) × 0.46 / C), for arcane/ice only; otherwise 0
Speed   = round(100 × (0.50 × speed + 0.30 × accel + 0.20 × air))
Stamina = round(100 × C / 0.46)
```
Arcane projectile damage 3 and ice damage 2 match the existing engine's projectile values. Stamina is **attack sustainability**, not armor, maximum health, damage reduction, or a larger stamina bar: ordinary attacks still cost 8 and the pool remains 100. Larger C means fewer repeated attack expenditures per second; drain is 8/C. Rating values are indices, not percentages or DPS claims accounting for hit chance, shields, distance or enemy invulnerability.

**New design judgments:** reference normalization; Speed weights; Magic restricted to arcane/ice rather than mechanical bolts/arrows; the interpretation of Stamina as sustainability; and each eligibility threshold. These are disclosed choices, not new numbers secretly presented as original content. No Luck/Crit roll was added: it would introduce randomness not present in the real-time attack timing model. No separate defense number was fabricated from movement speed. This set communicates throughput, spell affinity, mobility and pacing for the existing action loop.

Skills: `character-narrative-skills-pets` says mechanical hook first; `game-economy-balancing` says identify source/sink changes and balance new prices. There is no new source, price, level curve or purchased stat bonus here. New wardrobe inventory is a future cosmetic sink, not a reason to silently add grind or pay-for-Power.

## Actual values and body audit
| Display / ID | Power | Magic | Speed | Stamina | Current body | Signature file |
|---|---|---|---|---|---|---|
| Wissem / wissem | 133 | 0 | 109 | 75 | separate | gravity_gauntlet.png |
| Kael / kossay | 174 | 0 | 114 | 58 | baked | twin_fang_dagger.png |
| Astra / yakine | 78 | 117 | 87 | 128 | baked | orbit_crescent_staff.png |
| Nyx / taky | 151 | 0 | 118 | 66 | baked | shadow_knife.png |
| Bront / garsi | 101 | 0 | 75 | 148 | baked | stonebreaker_hammer.png |
| Zephyr / tounsi | 105 | 0 | 107 | 96 | baked | wind_scimitar.png |
| Volt / youssef | 92 | 0 | 97 | 109 | baked | clockwork_knuckle.png |
| Skye / loey | 88 | 0 | 108 | 113 | baked | sky_bow.png |
| Sol / rayan | 100 | 0 | 100 | 100 | baked | sun_lance.png |
| Rime / mira | 100 | 100 | 100 | 100 | baked | frost_staff.png |

## Display names only

Wissem is unchanged. Stable IDs stay exactly the same in content, saves, equipment, wardrobe and records. These are creative naming proposals, not researched assertions that these names are trending.

| ID | Old name | New display name | Reason |
|---|---|---|---|
| kossay | Kossay | Kael | Compact, sharp-sounding name for the twin-fang duelist. |
| yakine | Yakine | Astra | Connects the orbit caster to stars without a long title. |
| taky | Taky | Nyx | A short night-themed name for the shadow assassin. |
| garsi | Garsi | Bront | A weighty, punchy name for the slow heavy guardian. |
| tounsi | Tounsi | Zephyr | Names the desert swordsman after his wind-based identity. |
| youssef | Youssef | Volt | Immediately suggests the inventor’s electrical gadgets. |
| loey | Loey | Skye | A readable air-themed name for the bow scout. |
| rayan | Rayan | Sol | A compact solar name for the sun-lance hero. |
| mira | Mira | Rime | Directly evokes the frost archivist’s ice mechanics. |

## Rules — checked before equip

| Internal weapon type | Displayed category | Required ratings |
|---|---|---|
| gauntlet | gauntlet | power ≥ 100, speed ≥ 100 |
| dual | dual-dagger | power ≥ 120, speed ≥ 105 |
| staff | staff | magic ≥ 50 |
| dagger | dagger | power ≥ 120, speed ≥ 110 |
| shield | hammer | power ≥ 95, stamina ≥ 120 |
| sabre | sabre | power ≥ 100, speed ≥ 95 |
| gadget | gadget | speed ≥ 90, stamina ≥ 100 |
| bow | bow | speed ≥ 100, stamina ≥ 95 |
| lance | lance | power ≥ 95, stamina ≥ 95 |
| frost_staff | staff | magic ≥ 50 |

`shield` remains the historical key for the Stonebreaker hammer. Renaming it to `hammer` would risk equipment/save references; only the human-readable class/label is hammer.

| Hero | gauntlet | dual | staff | dagger | shield | sabre | gadget | bow | lance | frost_staff |
|---|---|---|---|---|---|---|---|---|---|---|
| Wissem | PASS | PASS | — | — | — | PASS | — | — | — | — |
| Kael | PASS | PASS | — | PASS | — | PASS | — | — | — | — |
| Astra | — | — | PASS | — | — | — | — | — | — | PASS |
| Nyx | PASS | PASS | — | PASS | — | PASS | — | — | — | — |
| Bront | — | — | — | — | PASS | — | — | — | PASS | — |
| Zephyr | PASS | — | — | — | — | PASS | — | PASS | PASS | — |
| Volt | — | — | — | — | — | — | PASS | — | — | — |
| Skye | — | — | — | — | — | — | PASS | PASS | — | — |
| Sol | PASS | — | — | — | — | PASS | PASS | PASS | PASS | — |
| Rime | PASS | — | PASS | — | — | PASS | PASS | PASS | PASS | PASS |

**Every hero’s own signature passes these ordinary thresholds. There are no signature bypasses.** The separate art gate is applied afterward: Wissem may equip his eligible gauntlet, twin daggers and scimitar; nine baked heroes may use only their signature or unarmed proxy until a clean body rig exists, even where another type passes stats. The UI reports insufficient stats separately from missing body art.

## Explicit null versus missing equipment

Old saves with no weapons field receive each hero’s signature. Explicit `null` means bare hands and survives sanitize/save/load. Unknown or ineligible weapon IDs fall back to the signature; unknown hero IDs are not equipped. Old display names are not used for lookup. Save key remains `super-wiss:odyssey-v4`; upgraded saves can be read by this build. Downgrading to an older build can discard new equipment/wardrobe fields, so back up saves before downgrading.

## Unarmed attack timing

At 60 simulation ticks/second: startup = clamp(round(originalStartup×60),3,6); active = clamp(round(originalActive×30),3,5); recovery = ceil(max(originalRecovery, originalDodge)×60). Duration is integer-tick based, with fractional elapsed time accumulated for stepping. Every hero gets damage 1, reach 26 logical units and stamina cost 8; those three values are explicit new fist-balance judgments.

| Hero | Startup ticks | Active ticks | Recovery ticks | Total ms (excluding hitstop) | Presentation |
|---|---|---|---|---|---|
| Wissem | 3 | 5 | 13 | 350.0 | Existing bare-hand frames |
| Kael | 3 | 4 | 11 | 300.0 | Labelled generic training proxy |
| Astra | 6 | 4 | 18 | 466.7 | Labelled generic training proxy |
| Nyx | 3 | 4 | 10 | 283.3 | Labelled generic training proxy |
| Bront | 6 | 5 | 20 | 516.7 | Labelled generic training proxy |
| Zephyr | 4 | 5 | 12 | 350.0 | Labelled generic training proxy |
| Volt | 6 | 3 | 18 | 450.0 | Labelled generic training proxy |
| Skye | 6 | 3 | 15 | 400.0 | Labelled generic training proxy |
| Sol | 5 | 5 | 14 | 400.0 | Labelled generic training proxy |
| Rime | 5 | 5 | 14 | 400.0 | Labelled generic training proxy |

There is no hit during startup or recovery. Side fists use a 26×20 attack rectangle separate from the standing 28×44 body (28×26 when crouching); directional variants use distinct attack rectangles, not full sprite bounds. A set of already-hit targets prevents repeat contact damage in one attack. A landed HP change produces three fixed ticks of hitstop. Dodge can cancel recovery, not startup/active; another attack cannot cancel recovery. Damage interrupts the current punch and clears buffered attack state. Basic ranged/knife attacks are disabled while unarmed; the attack control says PUNCH. Existing hero skills/pet abilities are preserved and may remain magical/ranged; “unarmed” does not remove a character’s innate skills.

Normalized local PvP intentionally retains its common legacy combat profile and ignores the new unarmed/foreign-weapon advantage. Story/practice/daily/endless/boss loadouts use the new equipment. Unarmed or alternative weapon loadouts are marked Open; comparable records use revision 5, old revisions 1–4 remain archived rather than being mixed into new rankings.

## Socket art implementation and limitations
`game/weapon-art.js` contains source-PNG grip anchors, logical draw height and orientation for all ten images. Wissem's 14 frame-local main/offhand sockets are in `assets/manifest.json`; a supplied socket suppresses additive procedural hand translation, so a held image stays at the authored frame's grip. Mirroring uses local hero coordinates. Old outfit variants with the same masks inherit the audited flags/sockets.

Only Wissem's separate layer is shown in gameplay/lobby. Other weapon PNGs are visible in the equipment catalog, but not stacked over baked weapons. Grip/angle calibration is a visual engineering estimate, not a substitute for an artist-approved rig or physical-device motion review. Only eligible Wissem cross-equips are interactively screenshot-tested. Nine missing rigs prevent final all-hero armed holding approval.
