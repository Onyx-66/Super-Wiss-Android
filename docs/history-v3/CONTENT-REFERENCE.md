# Super Wiss Odyssey 3.0 — Content reference

This is the shipped configuration, not the concept-board specification. Edit the JSON registries and rebuild to change it.

## Campaign worlds

Every world is exactly 5× its v2 tile-column count. A tile is 40 logical game pixels; this is not a claim about real-world meters or exact completion time.

| # | World | V2 columns | V3 columns | Enemies | Pickups¹ | Checkpoints | Music |
|---|---|---:|---:|---:|---:|---:|---|
| 1 | Sunpetal Valley | 172 | 860 | 35 | 30 | 10 | frontier |
| 2 | Moonlit Grove | 180 | 900 | 40 | 30 | 10 | moonlight |
| 3 | Amber Skyway | 188 | 940 | 50 | 35 | 10 | skyward |
| 4 | Coral Coast | 196 | 980 | 55 | 35 | 10 | frontier |
| 5 | Candy Canyon | 204 | 1020 | 65 | 40 | 10 | skyward |
| 6 | Frostpeak Pass | 212 | 1060 | 70 | 40 | 10 | moonlight |
| 7 | Clockwork City | 220 | 1100 | 80 | 45 | 10 | clockwork |
| 8 | Mushroom Marsh | 228 | 1140 | 85 | 45 | 10 | moonlight |
| 9 | Ember Caverns | 236 | 1180 | 95 | 50 | 10 | clockwork |
| 10 | Crystal Hollow | 244 | 1220 | 100 | 50 | 10 | starlight |
| 11 | Sunken Ruins | 252 | 1260 | 110 | 55 | 10 | moonlight |
| 12 | Thunder Citadel | 260 | 1300 | 115 | 55 | 10 | clockwork |
| 13 | Sakura Summit | 268 | 1340 | 125 | 60 | 10 | skyward |
| 14 | Neon Nightway | 276 | 1380 | 130 | 60 | 10 | clockwork |
| 15 | Starfall Sanctuary | 284 | 1420 | 140 | 65 | 10 | starlight |

¹Initial route pickups only. Breakable overhead caches, touch-open chests/crates, shrines, selected enemy drops and Ember Fox add more sources. Every shipped map also has ten chests, five crates and five shrines.

The terrain uses a repeated five-sector base gap pattern with populated, procedural routes. It is not five independently hand-painted levels joined together.

## Hero abilities

Cooldowns begin when the skill is activated. Timed effects and recharge advance in simulation time and pause with the game.

| Hero | Ability | Cooldown | Effect |
|---|---|---:|---|
| Wissem | Gravity control | 10s | Lift off, then bend gravity for 4 seconds. Hold jump to float farther. |
| Wissem | Bomba | 8s | Lob a fused bomb. Its blast breaks bricks and defeats nearby enemies. |
| Kossay | Twin fang | 7s | Dash safely through enemies with a pair of enchanted blades. |
| Kossay | Ranger snare | 12s | Place a 7-second trap that slows and damages nearby enemies. |
| Yakine | Arcane orbit | 12s | Three orbiting stars defend you and strike nearby enemies for 6 seconds. |
| Yakine | Chrono well | 15s | Slow enemies and hostile projectiles by 75% for 5 seconds. |
| Taky | Shadow step | 8s | Blink forward up to 160 pixels through safe space; gain brief protection. |
| Taky | Night blades | 10s | Launch five piercing shadow blades in a wide fan. |
| Garsi | Iron bastion | 13s | Four seconds of protection; enemy projectiles reflect back. |
| Garsi | Quake smash | 10s | Crush nearby foes, or slam from the air to trigger a heavy shockwave. |
| Tounsi | Sirocco spin | 10s | Spin for 3 seconds, pulling coins and striking enemies nearby. |
| Tounsi | Dune vault | 8s | Leap high, even in midair, and ride a gentle 3-second glide. |
| Youssef | Pocket turret | 14s | Deploy an 8-second turret that aims at nearby enemies. |
| Youssef | Overclock | 13s | Run faster and pulse electricity into nearby enemies for 7 seconds. |
| Loey | Seeker arrows | 9s | Fire three arrows that seek nearby enemies. |
| Loey | Windwalk | 11s | Six seconds of light-footed speed, glide and one extra midair jump. |

Wissem additionally has three crowd-fury tiers at 3, 6 and 9 nearby enemies (within 300 logical pixels): recharge rate +25% per tier, movement speed +4.5% per tier, Bomba radius +30 per tier. Gravity control is a launch plus low gravity, not ceiling-walking. Other role descriptions do not imply unlisted passive stat bonuses.

## Rescue and equip pets

One pet per attempt. Find a rescue capsule in its designated world; percentages are approximate placement along world width, not guaranteed speed-run times. You may test any locked pet in practice without earning ownership.

| Pet | Rarity | Rescue world | Approximate map progress | Automatic help |
|---|---|---|---:|---|
| Fang Wolf | super | 1 — Sunpetal Valley | 7% | Auto attack |
| Sky Eagle | super | 3 — Amber Skyway | 25% | Scout vision + coin reach |
| Mole Digger | super | 5 — Candy Canyon | 36% | Buried treasure |
| Ember Fox | super | 7 — Clockwork City | 43% | Fire support + supplies |
| Stone Turtle | super | 9 — Ember Caverns | 51% | Regenerating guard |
| Astra Dragon | super rare | 12 — Thunder Citadel | 84% | Dragon Scales • 15 enemies |
| Orca Prince | super rare | 15 — Starfall Sanctuary | 84% | Master of the tides |

### Fang Wolf

Bites the closest enemy in reach every 1.8 seconds. Stronger monsters may need more than one bite.

### Sky Eagle

Scouts enemies and cliffs ahead. Extends coin pickup reach and reveals nearby hidden treasure.

### Mole Digger

Unearths a reward after each 900 pixels of new forward progress. Waiting in place cannot farm rewards.

### Ember Fox

Launches a small fireball every 2.5 seconds when an enemy is nearby. Discovers a power-up every 1,800 pixels.

### Stone Turtle

Absorbs one damaging hit, then regrows its guard after 18 seconds. Does not block falls.

### Astra Dragon

Dragon Scales starts with 15 enemy-contact charges per attempt. Running into an enemy kills it instantly without damage and spends one charge. Charges never reset at checkpoints or between endless maps.

**Dragon Breath:** For 45 seconds, every enemy kill gives exactly 3× its otherwise-awarded points. Coins and distance are not multiplied. Duration 45s; activation cooldown 90s.

### Orca Prince

A companion of tides. Two independent, manually activated abilities.

**Flood:** Clear all existing enemies in this map. For 45 seconds, sweep away newly encountered enemies and hostile projectiles, including across endless transitions. Duration 45s; activation cooldown 100s.

**Orca Prince:** For 45 seconds, water supports you across every cliff. Activating while falling lifts you onto the water. Spikes and enemies remain dangerous unless separately protected. Duration 45s; activation cooldown 100s.

## Power-ups

| Item | Actual effect |
|---|---|
| Shield acorn | Absorb one hit. |
| Healing heart | Restore one heart. |
| Star charge | Contact invincibility for 7 seconds. Falls remain dangerous. |
| Magnet feather | Attract coins for 12 seconds. |
| Coin clover | Double coin value for 12 seconds. |
| Speed boots | 20% faster for 10 seconds. |
| Nova bloom | Orbiting stars strike nearby enemies for 10 seconds. |
| Fire fruit | Automatically launch fireballs at nearby enemies for 12 seconds; ignore fire-imp contact. |
| Ice blossom | Freeze nearby foes and fire slowing ice shards for 12 seconds. |
| Giant heart | Gain up to five hearts for 20 seconds; revert safely afterward. |
| Thunder totem | Lightning strikes nearby enemies for 12 seconds. |
| Phase crystal | Pass through breakable bricks and cache blocks; ignore contact damage for 6 seconds. Solid ground stays solid. |
| Phoenix feather | One automatic rescue from a fall. |
| Bomba cache | Immediately detonate a safe shockwave around you. |

## Enemies

`slime`, `beetle`, `hopper`, `bat`, `crab`, `sentry`, `spiker`, `golem`, `imp`, `ninja`, `wisp`, `maw`, `drone`.

There are 13 enemy types. They use combinations of walking, hopping, flying, charging, ranged attacks, armor, contact hazards and health tiers; some types share behavior code. Artwork appears at larger visual bounds than the collision boxes to keep hit detection forgiving.

## Art and sound

78 registered image assets, 27 stereo sound cues, and five stereo original music loops are included. Generated artwork is cropped from the approved boards, with new coin-spin frames and block atlases. Hero, enemy and pet files are single-pose images with procedural motion; the renderer also supports replacement multi-frame sprite sheets.

See `assets/manifest.json` for exact paths and `docs/ASSET-INVENTORY.json` for SHA-256 file hashes. `licenses/ASSET-PROVENANCE.md` records the source and attribution boundaries.

## Progression and saves

45 campaign stars; 12 journey missions; three device-date-based daily missions; daily course; local best times/scores; eight saved endless results. Endless cycles every authored world then starts another loop, preserving score and active pet effects while increasing capped spawn pressure. Offline records are not server-verified and device clocks/saves can be edited. There are no seeded fake competitors.

V2 gold, XP, settings and map clears migrate. Only the clear star is retained for previously completed worlds; long-map scores/times, extra objective stars and endless records restart. V2 storage is not removed. Capsules save on pickup; checkpoint banking does not preserve the exact in-progress position after a process restart.
