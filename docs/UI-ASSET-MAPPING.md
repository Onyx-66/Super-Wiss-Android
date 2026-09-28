> v1.4.1 UPDATE: the original mapping below is retained as the1.4.0 baseline. Principal panel/card borders and dividers now use the overrides documented in UI-POLISH-REPORT.md and art-source/ui/polish-crops.json. Inherited line numbers in the old crop inventory describe the baseline, not the new source positions.

# UI asset mapping — real source crops, not redrawn replacements

Sources: `art-source/ui/Assets_icons.png` (icons), `Assets_placeholders.png` (sheet 2 frames) and `Assets_placeholders_2.png` (sheet 3 larger panels). Rectangles use **left, top, right-exclusive, bottom-exclusive** in original source pixels. All 84 output PNGs were checked pixel-for-pixel against those source rectangles. PNG encoding/checksum differs from a source region naturally; decoded RGBA pixels are identical. All crops are registered under `ui/icons/*` or `ui/frames/*` in `assets/manifest.json`.

`game/ui-crops.js` maps existing semantic icon names onto the cropped PNGs. `game/icons.js` calls that resolver before using its legacy SVG fallback; the entire legacy icon system was not destructively removed. `game/atelier.css` refers to frames using `url('asset:ui/frames/...')`; `scripts/bundle.mjs` resolves these into embedded data for the single-HTML build and relative `assets/ui/...` paths for Android. Panel stretching is nine-slice, not redrawing; arbitrary device sizes can still produce non-integer scale edges. Some old SVG or procedural gameplay/HUD details remain outside the cropped set.

## Shared shell on every page (including behind Settings)
Identity frame → `assets/ui/frames/identity.png`; avatar border → `portrait.png`; both currency displays → `currency.png`; bottom navigation surround → `nav.png`; inactive/selected nav tabs → `tab.png` / `tab-selected.png`; common buttons → `button.png`. Header currency/plus/friends/settings and all nine navigation icons come from the icon sheet. These references live in `game/atelier.css`, `game/index.html`, `game/atelier-ui.js`, `game/ui-crops.js` and `game/icons.js`. The exact crop rectangle and matching source lines are enumerated below. Currency displayed is real saved currency, not painted mockup values.

## Per-screen mapping

### Home

Mockup inspected: `design/references/ui/sw_home_page.png`. Implemented structure: Logo/hero/platform center and weighted mode-card stack. Main integration: `game/atelier.css; game/atelier-ui.js; game/render.js`. All shared-shell assets above also apply.

| Element / crop | Exact output path | Source sheet | Crop rectangle | Source-code references |
|---|---|---|---|---|
| frames: panel | assets/ui/frames/panel.png | Assets_placeholders_2.png | 370, 402, 810, 629 | game/atelier.css:14, game/atelier.css:44 |
| frames: identity | assets/ui/frames/identity.png | Assets_placeholders_2.png | 823, 421, 1179, 528 | game/atelier.css:26, game/atelier.css:43, game/atelier.css:101 |
| frames: button | assets/ui/frames/button.png | Assets_placeholders.png | 859, 226, 1041, 292 | game/atelier.css:17, game/atelier.css:18, game/atelier.css:42, game/atelier.css:45 |
| frames: button-large | assets/ui/frames/button-large.png | Assets_placeholders.png | 712, 886, 1029, 964 | game/atelier.css:18, game/atelier.css:45 |
| frames: price | assets/ui/frames/price.png | Assets_placeholders.png | 794, 663, 932, 721 | game/atelier.css:42 |
| icons: home | assets/ui/icons/home.png | Assets_icons.png | 239, 205, 326, 290 | game/app.js:39, game/app.js:239, game/app.js:252, game/app.js:263 |
| icons: worlds | assets/ui/icons/worlds.png | Assets_icons.png | 343, 200, 442, 301 | game/index.html:25 |
| icons: boss | assets/ui/icons/boss.png | Assets_icons.png | 1314, 187, 1416, 309 | game/audio.js:93, game/ascension-ui.js:82, game/ascension-ui.js:86, game/ascension-ui.js:137 |
| icons: friends | assets/ui/icons/friends.png | Assets_icons.png | 340, 79, 433, 161 | game/ascension-ui.js:95, game/social.js:11, game/index.html:4, game/index.html:11 |
| icons: clock | assets/ui/icons/clock.png | Assets_icons.png | 29, 206, 120, 297 | game/atelier-ui.js:89, game/content.js:2, game/engine.js:88, game/render.js:212 |
| icons: daily | assets/ui/icons/daily.png | Assets_icons.png | 139, 207, 218, 294 | game/ascension-ui.js:86, game/ascension.js:35, game/upgrade-ui.js:9, game/app.js:157 |
| icons: flag | assets/ui/icons/flag.png | Assets_icons.png | 594, 325, 702, 452 | game/atelier-ui.js:89, game/data.js:14, game/data.js:30, game/index.html:10 |

### Worlds

Mockup inspected: `design/references/ui/sw_worlds_page.png`. Implemented structure: Three grouped world-card rows and right detail/CTA. Main integration: `game/atelier.css; game/upgrade-ui.js; game/app.js`. All shared-shell assets above also apply.

| Element / crop | Exact output path | Source sheet | Crop rectangle | Source-code references |
|---|---|---|---|---|
| frames: panel | assets/ui/frames/panel.png | Assets_placeholders_2.png | 370, 402, 810, 629 | game/atelier.css:14, game/atelier.css:44 |
| frames: hero-card | assets/ui/frames/hero-card.png | Assets_placeholders.png | 27, 308, 175, 523 | game/atelier.css:50, game/atelier.css:57, game/atelier.css:58, game/atelier.css:66 |
| frames: hero-selected | assets/ui/frames/hero-selected.png | Assets_placeholders.png | 186, 308, 332, 522 | game/atelier.css:51, game/atelier.css:86, game/atelier.css:104 |
| frames: hero-locked | assets/ui/frames/hero-locked.png | Assets_placeholders.png | 344, 309, 491, 522 | Registered/resolver; contextual use only |
| frames: button-large | assets/ui/frames/button-large.png | Assets_placeholders.png | 712, 886, 1029, 964 | game/atelier.css:18, game/atelier.css:45 |
| icons: worlds | assets/ui/icons/worlds.png | Assets_icons.png | 343, 200, 442, 301 | game/index.html:25 |
| icons: lock | assets/ui/icons/lock.png | Assets_icons.png | 1222, 67, 1300, 162 | game/atelier-ui.js:33, game/ascension-ui.js:77, game/app.js:102, game/app.js:108 |
| icons: gold-star | assets/ui/icons/gold-star.png | Assets_icons.png | 504, 472, 593, 560 | game/content.js:2, game/app.js:102, game/app.js:108, game/app.js:158 |
| icons: flag | assets/ui/icons/flag.png | Assets_icons.png | 594, 325, 702, 452 | game/atelier-ui.js:89, game/data.js:14, game/data.js:30, game/index.html:10 |
| icons: compass | assets/ui/icons/compass.png | Assets_icons.png | 23, 333, 135, 450 | game/atelier-ui.js:89 |

### Heroes

Mockup inspected: `design/references/ui/sw_heroes_page.png`. Implemented structure: Two-row hero grid, right stat/ability/loadout details. Main integration: `game/atelier-ui.js; game/atelier.css`. All shared-shell assets above also apply.

| Element / crop | Exact output path | Source sheet | Crop rectangle | Source-code references |
|---|---|---|---|---|
| frames: panel | assets/ui/frames/panel.png | Assets_placeholders_2.png | 370, 402, 810, 629 | game/atelier.css:14, game/atelier.css:44 |
| frames: hero-card | assets/ui/frames/hero-card.png | Assets_placeholders.png | 27, 308, 175, 523 | game/atelier.css:50, game/atelier.css:57, game/atelier.css:58, game/atelier.css:66 |
| frames: hero-selected | assets/ui/frames/hero-selected.png | Assets_placeholders.png | 186, 308, 332, 522 | game/atelier.css:51, game/atelier.css:86, game/atelier.css:104 |
| frames: button | assets/ui/frames/button.png | Assets_placeholders.png | 859, 226, 1041, 292 | game/atelier.css:17, game/atelier.css:18, game/atelier.css:42, game/atelier.css:45 |
| frames: button-large | assets/ui/frames/button-large.png | Assets_placeholders.png | 712, 886, 1029, 964 | game/atelier.css:18, game/atelier.css:45 |
| icons: heroes | assets/ui/icons/heroes.png | Assets_icons.png | 462, 198, 556, 297 | game/atelier-ui.js:25, game/upgrade-ui.js:22, game/content.js:2, game/app.js:92 |
| icons: power | assets/ui/icons/power.png | Assets_icons.png | 281, 469, 362, 573 | game/audio.js:66, game/audio.js:71, game/combat-profiles.js:10, game/ascension.js:15 |
| icons: magic | assets/ui/icons/magic.png | Assets_icons.png | 612, 475, 700, 568 | game/ascension.js:17, game/content.js:2, game/app.js:225 |
| icons: speed | assets/ui/icons/speed.png | Assets_icons.png | 25, 475, 119, 570 | game/content.js:2, game/app.js:282, game/index.html:27 |
| icons: stamina | assets/ui/icons/stamina.png | Assets_icons.png | 717, 469, 797, 567 | game/content.js:2, game/app.js:218 |
| icons: check | assets/ui/icons/check.png | Assets_icons.png | 988, 78, 1096, 165 | game/atelier-ui.js:15, game/app.js:118, game/app.js:131, game/app.js:142 |

### Pets

Mockup inspected: `design/references/ui/sw_pets_page.png`. Implemented structure: Pet grid plus right ability/detail panel. Main integration: `game/ascension-ui.js; game/atelier.css`. All shared-shell assets above also apply.

| Element / crop | Exact output path | Source sheet | Crop rectangle | Source-code references |
|---|---|---|---|---|
| frames: panel | assets/ui/frames/panel.png | Assets_placeholders_2.png | 370, 402, 810, 629 | game/atelier.css:14, game/atelier.css:44 |
| frames: hero-card | assets/ui/frames/hero-card.png | Assets_placeholders.png | 27, 308, 175, 523 | game/atelier.css:50, game/atelier.css:57, game/atelier.css:58, game/atelier.css:66 |
| frames: hero-selected | assets/ui/frames/hero-selected.png | Assets_placeholders.png | 186, 308, 332, 522 | game/atelier.css:51, game/atelier.css:86, game/atelier.css:104 |
| frames: hero-locked | assets/ui/frames/hero-locked.png | Assets_placeholders.png | 344, 309, 491, 522 | Registered/resolver; contextual use only |
| frames: button | assets/ui/frames/button.png | Assets_placeholders.png | 859, 226, 1041, 292 | game/atelier.css:17, game/atelier.css:18, game/atelier.css:42, game/atelier.css:45 |
| icons: pets | assets/ui/icons/pets.png | Assets_icons.png | 577, 203, 678, 292 | game/atelier-ui.js:64, game/content.js:2, game/app.js:94, game/app.js:538 |
| icons: lock | assets/ui/icons/lock.png | Assets_icons.png | 1222, 67, 1300, 162 | game/atelier-ui.js:33, game/ascension-ui.js:77, game/app.js:102, game/app.js:108 |
| icons: clock | assets/ui/icons/clock.png | Assets_icons.png | 29, 206, 120, 297 | game/atelier-ui.js:89, game/content.js:2, game/engine.js:88, game/render.js:212 |
| icons: check | assets/ui/icons/check.png | Assets_icons.png | 988, 78, 1096, 165 | game/atelier-ui.js:15, game/app.js:118, game/app.js:131, game/app.js:142 |

### Shop

Mockup inspected: `design/references/ui/sw_shop_page.png`. Implemented structure: Preview left, six-slot selector/catalog right; Skills/Fusion retained. Main integration: `game/atelier-ui.js; game/ascension-ui.js; game/atelier.css`. All shared-shell assets above also apply.

| Element / crop | Exact output path | Source sheet | Crop rectangle | Source-code references |
|---|---|---|---|---|
| frames: panel | assets/ui/frames/panel.png | Assets_placeholders_2.png | 370, 402, 810, 629 | game/atelier.css:14, game/atelier.css:44 |
| frames: portrait | assets/ui/frames/portrait.png | Assets_placeholders_2.png | 84, 129, 247, 336 | game/atelier.css:27 |
| frames: button | assets/ui/frames/button.png | Assets_placeholders.png | 859, 226, 1041, 292 | game/atelier.css:17, game/atelier.css:18, game/atelier.css:42, game/atelier.css:45 |
| frames: button-large | assets/ui/frames/button-large.png | Assets_placeholders.png | 712, 886, 1029, 964 | game/atelier.css:18, game/atelier.css:45 |
| frames: tab | assets/ui/frames/tab.png | Assets_placeholders.png | 748, 131, 885, 204 | game/atelier.css:22, game/atelier.css:33, game/atelier.css:34, game/atelier.css:70 |
| frames: tab-selected | assets/ui/frames/tab-selected.png | Assets_placeholders.png | 607, 132, 745, 204 | game/atelier.css:22, game/atelier.css:34, game/atelier.css:70 |
| icons: shop | assets/ui/icons/shop.png | Assets_icons.png | 698, 209, 800, 296 | game/app.js:282, game/index.html:7, game/index.html:25 |
| icons: palette | assets/ui/icons/palette.png | Assets_icons.png | 147, 473, 255, 571 | game/atelier-ui.js:33, game/app.js:282 |
| icons: sword | assets/ui/icons/sword.png | Assets_icons.png | 388, 472, 479, 566 | game/atelier-ui.js:33, game/ascension-ui.js:14, game/ascension.js:16, game/content.js:2 |
| icons: lock | assets/ui/icons/lock.png | Assets_icons.png | 1222, 67, 1300, 162 | game/atelier-ui.js:33, game/ascension-ui.js:77, game/app.js:102, game/app.js:108 |
| icons: coin | assets/ui/icons/coin.png | Assets_icons.png | 34, 75, 120, 164 | game/audio.js:78, game/content.js:2, game/engine.js:826, game/engine.js:1013 |

### Missions

Mockup inspected: `design/references/ui/sw_missions_page.png`. Implemented structure: Three-column quest cards; earned progress/reward state. Main integration: `game/app.js; game/atelier-ui.js; game/atelier.css`. All shared-shell assets above also apply.

| Element / crop | Exact output path | Source sheet | Crop rectangle | Source-code references |
|---|---|---|---|---|
| frames: quest | assets/ui/frames/quest.png | Assets_placeholders.png | 491, 544, 710, 650 | game/atelier.css:60, game/atelier.css:64 |
| frames: panel | assets/ui/frames/panel.png | Assets_placeholders_2.png | 370, 402, 810, 629 | game/atelier.css:14, game/atelier.css:44 |
| frames: progress-empty | assets/ui/frames/progress-empty.png | Assets_placeholders.png | 28, 981, 324, 1013 | Registered/resolver; contextual use only |
| frames: progress-full | assets/ui/frames/progress-full.png | Assets_placeholders.png | 341, 982, 561, 1012 | Registered/resolver; contextual use only |
| frames: price | assets/ui/frames/price.png | Assets_placeholders.png | 794, 663, 932, 721 | game/atelier.css:42 |
| frames: button | assets/ui/frames/button.png | Assets_placeholders.png | 859, 226, 1041, 292 | game/atelier.css:17, game/atelier.css:18, game/atelier.css:42, game/atelier.css:45 |
| icons: missions | assets/ui/icons/missions.png | Assets_icons.png | 822, 206, 906, 298 | game/content.js:2, game/app.js:95, game/app.js:148, game/index.html:13 |
| icons: quest-coins | assets/ui/icons/quest-coins.png | Assets_icons.png | 689, 738, 828, 875 | game/atelier-ui.js:89 |
| icons: quest-power | assets/ui/icons/quest-power.png | Assets_icons.png | 834, 739, 973, 877 | game/atelier-ui.js:89 |
| icons: quest-potion | assets/ui/icons/quest-potion.png | Assets_icons.png | 1010, 739, 1096, 877 | game/atelier-ui.js:89 |
| icons: quest-shrine | assets/ui/icons/quest-shrine.png | Assets_icons.png | 1124, 729, 1253, 881 | game/atelier-ui.js:89 |
| icons: quest-monster | assets/ui/icons/quest-monster.png | Assets_icons.png | 1267, 739, 1409, 878 | game/atelier-ui.js:89 |
| icons: flag | assets/ui/icons/flag.png | Assets_icons.png | 594, 325, 702, 452 | game/atelier-ui.js:89, game/data.js:14, game/data.js:30, game/index.html:10 |
| icons: compass | assets/ui/icons/compass.png | Assets_icons.png | 23, 333, 135, 450 | game/atelier-ui.js:89 |
| icons: clock | assets/ui/icons/clock.png | Assets_icons.png | 29, 206, 120, 297 | game/atelier-ui.js:89, game/content.js:2, game/engine.js:88, game/render.js:212 |
| icons: coin | assets/ui/icons/coin.png | Assets_icons.png | 34, 75, 120, 164 | game/audio.js:78, game/content.js:2, game/engine.js:826, game/engine.js:1013 |
| icons: check | assets/ui/icons/check.png | Assets_icons.png | 988, 78, 1096, 165 | game/atelier-ui.js:15, game/app.js:118, game/app.js:131, game/app.js:142 |

### Records

Mockup inspected: `design/references/ui/sw_records_page.png`. Implemented structure: Filter row, rules/detail left, real records right. Main integration: `game/upgrade-ui.js; game/atelier-ui.js; game/atelier.css`. All shared-shell assets above also apply.

| Element / crop | Exact output path | Source sheet | Crop rectangle | Source-code references |
|---|---|---|---|---|
| frames: panel | assets/ui/frames/panel.png | Assets_placeholders_2.png | 370, 402, 810, 629 | game/atelier.css:14, game/atelier.css:44 |
| frames: input | assets/ui/frames/input.png | Assets_placeholders_2.png | 36, 887, 380, 955 | Registered/resolver; contextual use only |
| frames: button | assets/ui/frames/button.png | Assets_placeholders.png | 859, 226, 1041, 292 | game/atelier.css:17, game/atelier.css:18, game/atelier.css:42, game/atelier.css:45 |
| icons: records | assets/ui/icons/records.png | Assets_icons.png | 936, 208, 1026, 294 | game/upgrade-ui.js:25, game/app.js:96, game/index.html:25 |
| icons: trophy | assets/ui/icons/trophy.png | Assets_icons.png | 580, 756, 684, 862 | game/atelier-ui.js:64, game/upgrade-ui.js:9, game/app.js:148, game/app.js:156 |
| icons: coin | assets/ui/icons/coin.png | Assets_icons.png | 34, 75, 120, 164 | game/audio.js:78, game/content.js:2, game/engine.js:826, game/engine.js:1013 |

### Profile

Mockup inspected: `design/references/ui/sw_profile_page.png`. Implemented structure: Identity left; overview/progress/achievements right. Main integration: `game/upgrade-ui.js; game/atelier-ui.js; game/atelier.css`. All shared-shell assets above also apply.

| Element / crop | Exact output path | Source sheet | Crop rectangle | Source-code references |
|---|---|---|---|---|
| frames: panel | assets/ui/frames/panel.png | Assets_placeholders_2.png | 370, 402, 810, 629 | game/atelier.css:14, game/atelier.css:44 |
| frames: identity | assets/ui/frames/identity.png | Assets_placeholders_2.png | 823, 421, 1179, 528 | game/atelier.css:26, game/atelier.css:43, game/atelier.css:101 |
| frames: portrait | assets/ui/frames/portrait.png | Assets_placeholders_2.png | 84, 129, 247, 336 | game/atelier.css:27 |
| frames: tab | assets/ui/frames/tab.png | Assets_placeholders.png | 748, 131, 885, 204 | game/atelier.css:22, game/atelier.css:33, game/atelier.css:34, game/atelier.css:70 |
| frames: tab-selected | assets/ui/frames/tab-selected.png | Assets_placeholders.png | 607, 132, 745, 204 | game/atelier.css:22, game/atelier.css:34, game/atelier.css:70 |
| frames: setting-row | assets/ui/frames/setting-row.png | Assets_placeholders.png | 28, 800, 373, 870 | game/atelier.css:68 |
| frames: progress-empty | assets/ui/frames/progress-empty.png | Assets_placeholders.png | 28, 981, 324, 1013 | Registered/resolver; contextual use only |
| frames: progress-full | assets/ui/frames/progress-full.png | Assets_placeholders.png | 341, 982, 561, 1012 | Registered/resolver; contextual use only |
| frames: button | assets/ui/frames/button.png | Assets_placeholders.png | 859, 226, 1041, 292 | game/atelier.css:17, game/atelier.css:18, game/atelier.css:42, game/atelier.css:45 |
| icons: profile | assets/ui/icons/profile.png | Assets_icons.png | 1061, 201, 1153, 295 | game/atelier-ui.js:15, game/app.js:96, game/app.js:118, game/app.js:354 |
| icons: edit | assets/ui/icons/edit.png | Assets_icons.png | 671, 79, 757, 164 | Registered/resolver; contextual use only |
| icons: medal-gold | assets/ui/icons/medal-gold.png | Assets_icons.png | 26, 744, 136, 855 | game/atelier-ui.js:64 |
| icons: crown | assets/ui/icons/crown.png | Assets_icons.png | 31, 604, 134, 694 | game/atelier-ui.js:64, game/content.js:2, game/app.js:226 |
| icons: pets | assets/ui/icons/pets.png | Assets_icons.png | 577, 203, 678, 292 | game/atelier-ui.js:64, game/content.js:2, game/app.js:94, game/app.js:538 |
| icons: trophy | assets/ui/icons/trophy.png | Assets_icons.png | 580, 756, 684, 862 | game/atelier-ui.js:64, game/upgrade-ui.js:9, game/app.js:148, game/app.js:156 |
| icons: lock | assets/ui/icons/lock.png | Assets_icons.png | 1222, 67, 1300, 162 | game/atelier-ui.js:33, game/ascension-ui.js:77, game/app.js:102, game/app.js:108 |

### Settings

Mockup inspected: `design/references/ui/sw_settings_page.png`. Implemented structure: Centered overlay; multi-column settings, toggles/sliders, close + Done. Main integration: `game/app.js; game/atelier-ui.js; game/atelier.css`. All shared-shell assets above also apply.

| Element / crop | Exact output path | Source sheet | Crop rectangle | Source-code references |
|---|---|---|---|---|
| frames: panel | assets/ui/frames/panel.png | Assets_placeholders_2.png | 370, 402, 810, 629 | game/atelier.css:14, game/atelier.css:44 |
| frames: setting-row | assets/ui/frames/setting-row.png | Assets_placeholders.png | 28, 800, 373, 870 | game/atelier.css:68 |
| frames: toggle-on | assets/ui/frames/toggle-on.png | Assets_placeholders.png | 1182, 883, 1285, 938 | game/atelier.css:68 |
| frames: toggle-off | assets/ui/frames/toggle-off.png | Assets_placeholders.png | 1312, 883, 1416, 938 | game/atelier.css:68 |
| frames: button | assets/ui/frames/button.png | Assets_placeholders.png | 859, 226, 1041, 292 | game/atelier.css:17, game/atelier.css:18, game/atelier.css:42, game/atelier.css:45 |
| frames: button-large | assets/ui/frames/button-large.png | Assets_placeholders.png | 712, 886, 1029, 964 | game/atelier.css:18, game/atelier.css:45 |
| icons: settings | assets/ui/icons/settings.png | Assets_icons.png | 448, 73, 545, 171 | game/content.js:2, game/app.js:151, game/app.js:239, game/app.js:281 |
| icons: close | assets/ui/icons/close.png | Assets_icons.png | 564, 80, 648, 164 | game/ascension-ui.js:58, game/app.js:87, game/app.js:153, game/app.js:282 |
| icons: controls | assets/ui/icons/controls.png | Assets_icons.png | 396, 347, 477, 428 | Registered/resolver; contextual use only |
| icons: touch | assets/ui/icons/touch.png | Assets_icons.png | 1039, 329, 1152, 447 | game/app.js:282 |
| icons: volume | assets/ui/icons/volume.png | Assets_icons.png | 1183, 346, 1293, 435 | game/app.js:282 |
| icons: music | assets/ui/icons/music.png | Assets_icons.png | 1326, 346, 1405, 437 | game/atelier-ui.js:70, game/content.js:2, game/app.js:282, game/progress.js:43 |
| icons: gamepad | assets/ui/icons/gamepad.png | Assets_icons.png | 280, 348, 380, 425 | game/app.js:106, game/app.js:131, game/app.js:282, game/index.html:16 |
| icons: speed | assets/ui/icons/speed.png | Assets_icons.png | 25, 475, 119, 570 | game/content.js:2, game/app.js:282, game/index.html:27 |
| icons: palette | assets/ui/icons/palette.png | Assets_icons.png | 147, 473, 255, 571 | game/atelier-ui.js:33, game/app.js:282 |
| icons: help | assets/ui/icons/help.png | Assets_icons.png | 778, 78, 863, 163 | game/app.js:283 |
| icons: check | assets/ui/icons/check.png | Assets_icons.png | 988, 78, 1096, 165 | game/atelier-ui.js:15, game/app.js:118, game/app.js:131, game/app.js:142 |

### Boss trials

Mockup inspected: `design/references/ui/sw_boss_hunt_mode.png`. Implemented structure: Tier tabs plus horizontal boss-card rail. Main integration: `game/ascension-ui.js; game/atelier.css`. All shared-shell assets above also apply.

| Element / crop | Exact output path | Source sheet | Crop rectangle | Source-code references |
|---|---|---|---|---|
| frames: hero-card | assets/ui/frames/hero-card.png | Assets_placeholders.png | 27, 308, 175, 523 | game/atelier.css:50, game/atelier.css:57, game/atelier.css:58, game/atelier.css:66 |
| frames: panel | assets/ui/frames/panel.png | Assets_placeholders_2.png | 370, 402, 810, 629 | game/atelier.css:14, game/atelier.css:44 |
| frames: tab | assets/ui/frames/tab.png | Assets_placeholders.png | 748, 131, 885, 204 | game/atelier.css:22, game/atelier.css:33, game/atelier.css:34, game/atelier.css:70 |
| frames: tab-selected | assets/ui/frames/tab-selected.png | Assets_placeholders.png | 607, 132, 745, 204 | game/atelier.css:22, game/atelier.css:34, game/atelier.css:70 |
| icons: boss | assets/ui/icons/boss.png | Assets_icons.png | 1314, 187, 1416, 309 | game/audio.js:93, game/ascension-ui.js:82, game/ascension-ui.js:86, game/ascension-ui.js:137 |
| icons: crown | assets/ui/icons/crown.png | Assets_icons.png | 31, 604, 134, 694 | game/atelier-ui.js:64, game/content.js:2, game/app.js:226 |

## Visual fidelity not claimed complete
All ten screens have been rendered and interacted with at 1672×941 and 960×440. Those checks establish rendered assets, shell bounds and selected functional behaviors, not pixel equivalence to mockups. The finished screenshots are under `docs/qa-local/screens/`.

The isolated mockup background and central pedestal are not supplied as reusable layers. The current integration retains original cosmic pixel-art background and procedural platform rather than cropping full mockups containing text/UI into game backgrounds. Mode-card illustrated scenery, a few per-card badges/metadata details, final selected-font rendering, and consistent base-pixel scaling remain polish work. Detailed typography differs visibly on stock Android because no font binaries ship. Some source crops are prepared but not actively referenced; they are explicitly identified in the complete index below. A source sheet is not a ready-to-use modular wardrobe or hero rig.

## Complete crop index (including unused or dynamic-only entries)

Code references below are exact source lines containing the key or semantic alias, not a claim that every conditional branch displayed it during the screenshot run. The authoritative dynamic lookup is `croppedIcon()` in game/ui-crops.js; legacy SVGs remain the fallback.
| Manifest key | Output file | Source sheet | Original rectangle | Exact references / usage limitation |
|---|---|---|---|---|
| ui/icons/coin | assets/ui/icons/coin.png | Assets_icons.png | 34, 75, 120, 164 | game/audio.js:78; game/content.js:2; game/engine.js:826; game/engine.js:1013; game/app.js:142; game/app.js:156; game/app.js:263; game/render.js:25; game/render.js:300; game/render.js:301; game/render.js:302; game/render.js:710; game/data.js:15; game/data.js:22; game/data.js:31; game/data.js:40; game/progress.js:131; game/world-regions.js:15; game/index.html:4; game/index.html:27 |
| ui/icons/star | assets/ui/icons/star.png | Assets_icons.png | 125, 72, 221, 167 | game/content.js:2; game/app.js:102; game/app.js:108; game/app.js:158; game/app.js:226; game/app.js:263; game/data.js:19; game/index.html:4 |
| ui/icons/plus | assets/ui/icons/plus.png | Assets_icons.png | 239, 83, 322, 165 | game/index.html:4 |
| ui/icons/friends | assets/ui/icons/friends.png | Assets_icons.png | 340, 79, 433, 161 | game/ascension-ui.js:95; game/social.js:11; game/index.html:4; game/index.html:11 |
| ui/icons/settings | assets/ui/icons/settings.png | Assets_icons.png | 448, 73, 545, 171 | game/content.js:2; game/app.js:151; game/app.js:239; game/app.js:281; game/app.js:309; game/index.html:4; game/index.html:25 |
| ui/icons/close | assets/ui/icons/close.png | Assets_icons.png | 564, 80, 648, 164 | game/ascension-ui.js:58; game/app.js:87; game/app.js:153; game/app.js:282; game/app.js:293; game/progress.js:52 |
| ui/icons/edit | assets/ui/icons/edit.png | Assets_icons.png | 671, 79, 757, 164 | No direct source consumer found; registered spare/dynamic-only. Not claimed visible. |
| ui/icons/help | assets/ui/icons/help.png | Assets_icons.png | 778, 78, 863, 163 | game/app.js:283 |
| ui/icons/info | assets/ui/icons/info.png | Assets_icons.png | 887, 78, 972, 163 | game/app.js:283 |
| ui/icons/check | assets/ui/icons/check.png | Assets_icons.png | 988, 78, 1096, 165 | game/atelier-ui.js:15; game/app.js:118; game/app.js:131; game/app.js:142; game/app.js:263; game/app.js:283 |
| ui/icons/lock | assets/ui/icons/lock.png | Assets_icons.png | 1222, 67, 1300, 162 | game/atelier-ui.js:33; game/ascension-ui.js:77; game/app.js:102; game/app.js:108; game/app.js:131 |
| ui/icons/online | assets/ui/icons/online.png | Assets_icons.png | 1332, 83, 1408, 159 | No direct source consumer found; registered spare/dynamic-only. Not claimed visible. |
| ui/icons/clock | assets/ui/icons/clock.png | Assets_icons.png | 29, 206, 120, 297 | game/atelier-ui.js:89; game/content.js:2; game/engine.js:88; game/render.js:212; game/render.js:270 |
| ui/icons/daily | assets/ui/icons/daily.png | Assets_icons.png | 139, 207, 218, 294 | game/ascension-ui.js:86; game/ascension.js:35; game/upgrade-ui.js:9; game/app.js:157; game/app.js:183; game/progress.js:187 |
| ui/icons/home | assets/ui/icons/home.png | Assets_icons.png | 239, 205, 326, 290 | game/app.js:39; game/app.js:239; game/app.js:252; game/app.js:263; game/app.js:329; game/app.js:330; game/app.js:521; game/app.js:530; game/render.js:315; game/render.js:320; game/render.js:321; game/index.html:25 |
| ui/icons/worlds | assets/ui/icons/worlds.png | Assets_icons.png | 343, 200, 442, 301 | game/index.html:25 |
| ui/icons/heroes | assets/ui/icons/heroes.png | Assets_icons.png | 462, 198, 556, 297 | game/atelier-ui.js:25; game/upgrade-ui.js:22; game/content.js:2; game/app.js:92; game/app.js:93; game/app.js:536; game/index.html:25 |
| ui/icons/pets | assets/ui/icons/pets.png | Assets_icons.png | 577, 203, 678, 292 | game/atelier-ui.js:64; game/content.js:2; game/app.js:94; game/app.js:538; game/index.html:25 |
| ui/icons/shop | assets/ui/icons/shop.png | Assets_icons.png | 698, 209, 800, 296 | game/app.js:282; game/index.html:7; game/index.html:25 |
| ui/icons/missions | assets/ui/icons/missions.png | Assets_icons.png | 822, 206, 906, 298 | game/content.js:2; game/app.js:95; game/app.js:148; game/index.html:13; game/index.html:25 |
| ui/icons/records | assets/ui/icons/records.png | Assets_icons.png | 936, 208, 1026, 294 | game/upgrade-ui.js:25; game/app.js:96; game/index.html:25 |
| ui/icons/profile | assets/ui/icons/profile.png | Assets_icons.png | 1061, 201, 1153, 295 | game/atelier-ui.js:15; game/app.js:96; game/app.js:118; game/app.js:354; game/app.js:355; game/app.js:509; game/app.js:543; game/index.html:4; game/index.html:25 |
| ui/icons/swords | assets/ui/icons/swords.png | Assets_icons.png | 1181, 197, 1289, 306 | No direct source consumer found; registered spare/dynamic-only. Not claimed visible. |
| ui/icons/boss | assets/ui/icons/boss.png | Assets_icons.png | 1314, 187, 1416, 309 | game/audio.js:93; game/ascension-ui.js:82; game/ascension-ui.js:86; game/ascension-ui.js:137; game/ascension.js:35; game/ascension.js:49; game/upgrade-ui.js:9; game/upgrade-ui.js:19; game/engine.js:1087; game/app.js:156; game/app.js:172; game/app.js:282; game/app.js:496; game/app.js:499; game/data.js:16; game/data.js:23; game/data.js:31; game/data.js:41; game/progress.js:121; game/progress.js:155; game/index.html:11 |
| ui/icons/compass | assets/ui/icons/compass.png | Assets_icons.png | 23, 333, 135, 450 | game/atelier-ui.js:89 |
| ui/icons/map | assets/ui/icons/map.png | Assets_icons.png | 146, 329, 264, 439 | game/data.js:20 |
| ui/icons/gamepad | assets/ui/icons/gamepad.png | Assets_icons.png | 280, 348, 380, 425 | game/app.js:106; game/app.js:131; game/app.js:282; game/index.html:16 |
| ui/icons/controls | assets/ui/icons/controls.png | Assets_icons.png | 396, 347, 477, 428 | No direct source consumer found; registered spare/dynamic-only. Not claimed visible. |
| ui/icons/flag | assets/ui/icons/flag.png | Assets_icons.png | 594, 325, 702, 452 | game/atelier-ui.js:89; game/data.js:14; game/data.js:30; game/index.html:10 |
| ui/icons/skull | assets/ui/icons/skull.png | Assets_icons.png | 932, 336, 1015, 427 | game/app.js:156; game/app.js:282; game/data.js:16; game/data.js:23; game/data.js:31; game/data.js:41; game/index.html:11 |
| ui/icons/touch | assets/ui/icons/touch.png | Assets_icons.png | 1039, 329, 1152, 447 | game/app.js:282 |
| ui/icons/volume | assets/ui/icons/volume.png | Assets_icons.png | 1183, 346, 1293, 435 | game/app.js:282 |
| ui/icons/music | assets/ui/icons/music.png | Assets_icons.png | 1326, 346, 1405, 437 | game/atelier-ui.js:70; game/content.js:2; game/app.js:282; game/progress.js:43 |
| ui/icons/speed | assets/ui/icons/speed.png | Assets_icons.png | 25, 475, 119, 570 | game/content.js:2; game/app.js:282; game/index.html:27 |
| ui/icons/palette | assets/ui/icons/palette.png | Assets_icons.png | 147, 473, 255, 571 | game/atelier-ui.js:33; game/app.js:282 |
| ui/icons/power | assets/ui/icons/power.png | Assets_icons.png | 281, 469, 362, 573 | game/audio.js:66; game/audio.js:71; game/combat-profiles.js:10; game/ascension.js:15; game/content.js:2; game/engine.js:139; game/engine.js:390; game/engine.js:554; game/engine.js:990; game/app.js:143; game/app.js:156; game/app.js:446; game/render.js:300; game/data.js:17; game/data.js:32; game/data.js:42; game/index.html:27 |
| ui/icons/sword | assets/ui/icons/sword.png | Assets_icons.png | 388, 472, 479, 566 | game/atelier-ui.js:33; game/ascension-ui.js:14; game/ascension.js:16; game/content.js:2; game/index.html:27 |
| ui/icons/gold-star | assets/ui/icons/gold-star.png | Assets_icons.png | 504, 472, 593, 560 | game/content.js:2; game/app.js:102; game/app.js:108; game/app.js:158; game/app.js:226; game/app.js:263; game/data.js:19 |
| ui/icons/magic | assets/ui/icons/magic.png | Assets_icons.png | 612, 475, 700, 568 | game/ascension.js:17; game/content.js:2; game/app.js:225 |
| ui/icons/stamina | assets/ui/icons/stamina.png | Assets_icons.png | 717, 469, 797, 567 | game/content.js:2; game/app.js:218 |
| ui/icons/bow | assets/ui/icons/bow.png | Assets_icons.png | 821, 471, 917, 569 | game/combat-profiles.js:11; game/weapon-art.js:15; game/weapon-art.js:67; game/engine.js:1168; game/equipment.js:12 |
| ui/icons/sun | assets/ui/icons/sun.png | Assets_icons.png | 937, 468, 1037, 572 | No direct source consumer found; registered spare/dynamic-only. Not claimed visible. |
| ui/icons/frost | assets/ui/icons/frost.png | Assets_icons.png | 1063, 467, 1155, 572 | game/ascension-ui.js:124; game/ascension.js:11; game/ascension.js:34; game/arena.js:6; game/content.js:2; game/cosmetics.js:3; game/engine.js:218; game/render.js:740 |
| ui/icons/wind | assets/ui/icons/wind.png | Assets_icons.png | 1300, 467, 1416, 568 | game/world-physics.js:22; game/world-physics.js:27; game/content.js:2; game/index.html:27 |
| ui/icons/crown | assets/ui/icons/crown.png | Assets_icons.png | 31, 604, 134, 694 | game/atelier-ui.js:64; game/content.js:2; game/app.js:226 |
| ui/icons/earned-star | assets/ui/icons/earned-star.png | Assets_icons.png | 898, 607, 991, 698 | No direct source consumer found; registered spare/dynamic-only. Not claimed visible. |
| ui/icons/empty-star | assets/ui/icons/empty-star.png | Assets_icons.png | 1012, 609, 1104, 697 | No direct source consumer found; registered spare/dynamic-only. Not claimed visible. |
| ui/icons/medal-gold | assets/ui/icons/medal-gold.png | Assets_icons.png | 26, 744, 136, 855 | game/atelier-ui.js:64 |
| ui/icons/medal-silver | assets/ui/icons/medal-silver.png | Assets_icons.png | 143, 744, 254, 856 | No direct source consumer found; registered spare/dynamic-only. Not claimed visible. |
| ui/icons/medal-bronze | assets/ui/icons/medal-bronze.png | Assets_icons.png | 264, 744, 379, 856 | No direct source consumer found; registered spare/dynamic-only. Not claimed visible. |
| ui/icons/trophy | assets/ui/icons/trophy.png | Assets_icons.png | 580, 756, 684, 862 | game/atelier-ui.js:64; game/upgrade-ui.js:9; game/app.js:148; game/app.js:156; game/data.js:25 |
| ui/icons/quest-coins | assets/ui/icons/quest-coins.png | Assets_icons.png | 689, 738, 828, 875 | game/atelier-ui.js:89 |
| ui/icons/quest-power | assets/ui/icons/quest-power.png | Assets_icons.png | 834, 739, 973, 877 | game/atelier-ui.js:89 |
| ui/icons/quest-potion | assets/ui/icons/quest-potion.png | Assets_icons.png | 1010, 739, 1096, 877 | game/atelier-ui.js:89 |
| ui/icons/quest-shrine | assets/ui/icons/quest-shrine.png | Assets_icons.png | 1124, 729, 1253, 881 | game/atelier-ui.js:89 |
| ui/icons/quest-monster | assets/ui/icons/quest-monster.png | Assets_icons.png | 1267, 739, 1409, 878 | game/atelier-ui.js:89 |
| ui/icons/left | assets/ui/icons/left.png | Assets_icons.png | 36, 921, 100, 1015 | game/arena.js:5; game/app.js:394; game/app.js:401; game/index.html:27 |
| ui/icons/right | assets/ui/icons/right.png | Assets_icons.png | 139, 921, 203, 1015 | game/arena.js:5; game/app.js:263; game/app.js:394; game/app.js:401; game/index.html:12; game/index.html:13; game/index.html:27 |
| ui/icons/crouch | assets/ui/icons/crouch.png | Assets_icons.png | 225, 948, 304, 1003 | game/controls.js:20; game/app.js:394; game/app.js:401; game/index.html:27 |
| ui/icons/diamond | assets/ui/icons/diamond.png | Assets_icons.png | 331, 927, 416, 1012 | No direct source consumer found; registered spare/dynamic-only. Not claimed visible. |
| ui/frames/currency | assets/ui/frames/currency.png | Assets_placeholders.png | 1173, 29, 1419, 102 | game/atelier.css:30 |
| ui/frames/tab | assets/ui/frames/tab.png | Assets_placeholders.png | 748, 131, 885, 204 | game/atelier.css:22; game/atelier.css:33; game/atelier.css:34; game/atelier.css:70 |
| ui/frames/tab-selected | assets/ui/frames/tab-selected.png | Assets_placeholders.png | 607, 132, 745, 204 | game/atelier.css:22; game/atelier.css:34; game/atelier.css:70 |
| ui/frames/button | assets/ui/frames/button.png | Assets_placeholders.png | 859, 226, 1041, 292 | game/atelier.css:17; game/atelier.css:18; game/atelier.css:42; game/atelier.css:45; game/atelier.css:60; game/atelier.css:83 |
| ui/frames/button-gold | assets/ui/frames/button-gold.png | Assets_placeholders.png | 1082, 227, 1282, 295 | game/atelier.css:60 |
| ui/frames/hero-card | assets/ui/frames/hero-card.png | Assets_placeholders.png | 27, 308, 175, 523 | game/atelier.css:50; game/atelier.css:57; game/atelier.css:58; game/atelier.css:66; game/atelier.css:68; game/atelier.css:85; game/atelier.css:103 |
| ui/frames/hero-selected | assets/ui/frames/hero-selected.png | Assets_placeholders.png | 186, 308, 332, 522 | game/atelier.css:51; game/atelier.css:86; game/atelier.css:104 |
| ui/frames/hero-locked | assets/ui/frames/hero-locked.png | Assets_placeholders.png | 344, 309, 491, 522 | No direct source consumer found; registered spare/dynamic-only. Not claimed visible. |
| ui/frames/hero-purple | assets/ui/frames/hero-purple.png | Assets_placeholders.png | 658, 309, 795, 523 | No direct source consumer found; registered spare/dynamic-only. Not claimed visible. |
| ui/frames/quest | assets/ui/frames/quest.png | Assets_placeholders.png | 491, 544, 710, 650 | game/atelier.css:60; game/atelier.css:64 |
| ui/frames/price | assets/ui/frames/price.png | Assets_placeholders.png | 794, 663, 932, 721 | game/atelier.css:42 |
| ui/frames/nav | assets/ui/frames/nav.png | Assets_placeholders.png | 27, 739, 682, 791 | game/atelier.css:32 |
| ui/frames/setting-row | assets/ui/frames/setting-row.png | Assets_placeholders.png | 28, 800, 373, 870 | game/atelier.css:68 |
| ui/frames/button-large | assets/ui/frames/button-large.png | Assets_placeholders.png | 712, 886, 1029, 964 | game/atelier.css:18; game/atelier.css:45 |
| ui/frames/toggle-on | assets/ui/frames/toggle-on.png | Assets_placeholders.png | 1182, 883, 1285, 938 | game/atelier.css:68 |
| ui/frames/toggle-off | assets/ui/frames/toggle-off.png | Assets_placeholders.png | 1312, 883, 1416, 938 | game/atelier.css:68 |
| ui/frames/progress-empty | assets/ui/frames/progress-empty.png | Assets_placeholders.png | 28, 981, 324, 1013 | No direct source consumer found; registered spare/dynamic-only. Not claimed visible. |
| ui/frames/progress-full | assets/ui/frames/progress-full.png | Assets_placeholders.png | 341, 982, 561, 1012 | No direct source consumer found; registered spare/dynamic-only. Not claimed visible. |
| ui/frames/panel | assets/ui/frames/panel.png | Assets_placeholders_2.png | 370, 402, 810, 629 | game/atelier.css:14; game/atelier.css:44 |
| ui/frames/profile | assets/ui/frames/profile.png | Assets_placeholders_2.png | 27, 647, 476, 882 | No direct source consumer found; registered spare/dynamic-only. Not claimed visible. |
| ui/frames/identity | assets/ui/frames/identity.png | Assets_placeholders_2.png | 823, 421, 1179, 528 | game/atelier.css:26; game/atelier.css:43; game/atelier.css:101 |
| ui/frames/portrait | assets/ui/frames/portrait.png | Assets_placeholders_2.png | 84, 129, 247, 336 | game/atelier.css:27 |
| ui/frames/portrait-selected | assets/ui/frames/portrait-selected.png | Assets_placeholders_2.png | 270, 123, 452, 342 | No direct source consumer found; registered spare/dynamic-only. Not claimed visible. |
| ui/frames/input | assets/ui/frames/input.png | Assets_placeholders_2.png | 36, 887, 380, 955 | No direct source consumer found; registered spare/dynamic-only. Not claimed visible. |
