# v1.4.1 UI polish — applied local source update

This is a full working-source update of the supplied v1.4.0 snapshot. It is not a patch-only delivery and does not require GitHub access. Version metadata is **1.4.1**, Android **versionCode 46**; the application identity, signing configuration, save key, hero IDs, ratings, weapon eligibility, currency values and combat rules revision remain unchanged.

## What is fixed versus still partial

**Fixed in code:** Kael's identity portrait when the saved weapon is null; transparent full-silhouette contain-fit for portraits and wardrobe; a common corner-preserving panel shell and independent diamond rules; headline hierarchy; icon alignment; persistent icon-only action controls with real counters; logical touch-target floors and safe insets; a visible crouch pose; compact Settings footer reachability.

**Closer, not pixel-identical:** the ten screens now follow the target structures more closely, but the clean target moon/castle background, Home rocky pedestal, several page illustrations and exact original typeface are unavailable. The runtime still uses existing scenery and a documented system-font treatment. All ten heroes still require authored crouch clips, and nine require clean unarmed combat sheets. The articulated crouch cutout is a temporary rendering fallback, not an artist-authored animation. Existing wardrobe art gaps remain.

## Inputs and provenance

The user's Drive link returned `Super-Wiss-v1.4.0-temporary-publication-transfer.zip`: a **transfer overlay**, not a complete standalone project. Its 206 snapshot members were compared with the available `Super-Wiss-v1.4.0-Complete-Source.zip` and all matched byte-for-byte. Work used that complete archive plus the matching transfer snapshot, retaining the original base assets and all ten target mockups. `docs/ui-polish/SOURCE-PROVENANCE.json` records the archive hashes.

All 16 supplied `agent-skills/*/SKILL.md` documents were read in full. The actual ten PNGs under `design/references/ui/` and all three source sheets under `art-source/ui/` were inspected. The user-mentioned `player-movement-platforming` and `sprite-animation-pipeline` files are **not present** among those 16; no rule is attributed to a nonexistent document. The existing manifest and animation-generation code were inspected for the frame mapping instead.

## Screen-by-screen comparison

The gallery at `docs/ui-polish/GALLERY.html` links each target, untouched-v1.4.0 browser capture, updated 1648×928 capture, and updated 960×440 capture. The baseline captures are a reproduced run of v1.4.0, not edited mockups. Original user-reported PNGs are also preserved under `docs/ui-polish/user-reported/`.

| Screen | Before | Applied change | Intentional difference / remaining limitation |
|---|---|---|---|
| Home | Tiny identity/currency widgets; three small scope pills; flat mode cards; no consistent secondary headline/divider. | Larger shared shell; logo with a kicker/title/subtext block; vertically stacked scope rows; framed, scene-backed mode cards with aligned icons and light Adventure text. | The smooth procedural platform, logo wording and cosmic backdrop are not the target’s isolated rocky pedestal / moon-castle illustration. |
| Worlds | Dense cards and divider lines through captions; selected banner was a stretched strip. | Separate image/caption/star bands; padded chapter groups; correct-aspect selected-world banner; separated diamond rule, objectives and primary CTA. | A scrollable grid preserves all 15 worlds. World-lock states and stars come from the save, not the mockup’s example values. |
| Heroes | Portraits ran into card dividers; mixed plain and framed skills; Kael could become a green proxy when unequipped. | Uniform 5×2 gallery with contained portraits, scene backgrounds and class badges; separated nameplates; raised selection panel; consistent skill frames; scrollable detail body with fixed actions. Actual Kael identity art is retained. | Real artwork/role text is retained; compact screens scroll details. Baked-body unarmed portraits explicitly say identity-reference; this does not create a clean unarmed combat sheet. |
| Pets | Inconsistent card interiors and rarity/portrait/caption alignment; divider crossed labels. | Three-column companion gallery; separated rarity, illustration, name and summon metadata; consistent corners and a padded detail panel. | Locked companions remain locked. Source art differs from some mockup illustrations; no imaginary rescued pets are added. |
| Shop / Wardrobe | Hero/weapon edges could be clipped by a fixed preview canvas; entire card artwork and divider were stretched together. | Transparent, alpha-bound contain-fit of the complete hero plus weapon; framed scene preview, independent slot toolbar and consistent piece-card borders/dividers. | The six-slot catalog remains honestly unavailable until aligned clothing art exists; target example purchasable cards are not fabricated. |
| Missions | Huge stretched internal diamond rules, competing price-outline shapes, uneven title/description spacing. | Independent consistent panel corners; illustration zone beside a padded content zone; separate title divider and correctly aligned progress/reward controls; regular grid gaps. | Uses existing map scenery and supplied mission icons, not the target’s bespoke painted quest vignettes. Existing objectives/reward amounts are unchanged. |
| Records | Left details used a plain rounded web panel beside an ornate list; filter/heading alignment differed. | Both panels now share the same corner-preserving frame; aligned filters; clear rank/list title and diamond divider; accessible real empty-state action. | Real local empty state remains. The mockup’s populated global-looking leaderboard is not evidence of a working server leaderboard. |
| Profile | Dense 3-column stats reused mission cards with empty price cutouts; identity and achievement panels had different treatments. | Structured identity/progress areas, two-column metric lines without false price boxes, consistent panel borders and section dividers; preserved functional tabs. | Actual account/achievement data remains unchanged; target banners and richer collectible embellishments still need clean assets. |
| Boss trials | Oversized crowns baked into thumbnails, few very tall cards, captions crossed by stretched dividers. | Uses existing original enemy art with separately cropped modest crowns; scene-backed cards, regular spacing, independent caption rules and difficulty controls; wider gallery coverage. | Source bosses are not all the exact target illustrations. No boss clear or crown progress is fabricated. |
| Settings | Mixed settings blocks, inconsistent panel borders, no full heading sequence; compact Done could fall below the dialog. | Framed three-column Controls/Adventure/Audio layout; kicker/headline/subtext and dividers; working live volume percentages; fixed reachable Done/X actions, with extras inside scrollable content. | The game’s four-preset editor remains functional and occupies space not identical to the target. Columns scroll on compact landscape screens. |

## Kael: actual root cause and correction

This was **not a missing manifest path**. `assets/animated/hero-kossay.png` exists and the stable internal ID is `kossay`. `paintPortrait()` previously passed the saved `equippedWeapon: null` through `drawHero()` as if it were a combat actor. The deliberate combat protection for `null + weaponLayer: baked` then selected the green training proxy. That combat fallback leaked into the roster and wardrobe identity UI.

`game/hero-presentation.js:portraitPolicy()` now distinguishes an identity preview from a combat actor. `game/render.js:paintPortrait()` passes an explicit `portraitReference` flag only when needed and labels the result `identity-reference`. `game/ui-polish.js:polishReferenceNote()` shows “Identity portrait · unarmed combat art pending.” This keeps real Kael art visible, preserves the user's null equipment value, and does not silently switch him back to an armed loadout. His baked blades remain visible in this **reference-only portrait**; clean unarmed combat art is still missing. The same fix applies to the other baked heroes.

The former selected-portrait red rectangle is removed. The preview renderer scans painted alpha bounds on a transparent scratch canvas and uniformly contains the hero and attached weapon with a safety margin. Tests cycle all ten actual wardrobe previews and verify at least seven physical canvas pixels of margin. No source sprite is silently weapon-erased.

## Borders, spacing and typography

`game/ui-polish.css` and `game/ui-polish.js` are the final presentation adapters in the bundle. Existing interactions and save logic remain in place. All principal page panels and cards use `assets/ui/frames/panel-shell.png`, a 96×96 repack of nine unchanged pieces of the existing supplied panel crop; CSS border slices are 32 pixels. Corners are independently preserved while straight edges stretch. The original full card art is no longer scaled as one image across arbitrary mission/card aspect ratios.

`assets/ui/ornaments/diamond.png` and `rule.png` are independent crops, not text glyph approximations. They decorate headers and section boundaries without forcing a prepainted line through card text. The full operation records and PNG hashes are in `art-source/ui/polish-crops.json`. Eight new PNG registrations bring the runtime inventory from 415 to **423**. One prepared pink crown is explicitly marked unused by the current theme cycle.

Desktop defaults are 20px panel padding, 18–22px layout gaps and 14px panel borders, with intentional per-component/mobile variants. Compact layouts retain scrolling rather than hiding data behind navigation. Currency, stat and navigation icons use consistent centered boxes/flex alignment. Navigation remains nine functional entries, even where a particular screenshot depicts fewer tabs.

Every menu has the kicker → headline → supporting-text sequence. Display headings use a cream-to-gold gradient and a low-resolution canvas treatment of locally available Georgia/serif; Home uses the matching live gradient treatment. This is **not** an identified copy of the original mockup font. Body text uses the declared local font stack; no TTF/OTF/WOFF binaries are distributed. Small raster titles and body-text fit still need physical-device visual approval.

## Crouch: what exists and what does not

Every current hero body uses the same 14-cell map: **idle 0; run 1–8; jump 9; fall 10; attack 11–12; dodge 13**. There is no crouch cell. Cell 13 is not relabelled as crouch, and no nonexistent frame14 is referenced. The current `scripts/animate-assets.py` and all ten manifest entries were inspected.

`CROUCH_CUTOUT` in `game/hero-presentation.js`, selected by the actual `actor.crouching` state, supplies a visibly lowered temporary pose. `drawCrouchedHero()` in `game/render.js` leans the torso and separately rotates four upper/lower-leg pieces; the transform is not a nonuniform vertical squash of an unchanged standing pose. Separate weapons follow the torso transform, while baked weapons stay with the existing body pieces. The explicit unarmed combat proxy also has a bent-knee pose. Crouch still uses the existing physics height change **44 → 26**; release returns to 44 only through the existing clearance logic.

This is a functional visual fallback, with possible cutout seams and approximate sockets. It is not a claim of clean authored animation for each hero. Required per hero: crouch-idle, four crouch-move cells, two enter + two exit cells, three phase-aligned crouch-attack cells, sockets, and matching future clothing/occlusion layers. All are added to the merged missing-assets report.

Wissem's previous frame11 “unarmed guard” treatment was also incorrect: attack11 is an attack cell, not a dedicated guard. The identity preview now uses his genuine weapon-free idle0 while the bespoke fist guard remains a documented art request.

## Regression evidence

- **333 Node tests passed**, zero failed, including 42 new polish regressions; the pristine v1.4.0 baseline passed 291.
- **544 browser checks passed**, zero failed, at 1648×928, 960×440 and 844×390. This covers all pages, all four control presets, Kael null-equipment identity handling, all ten wardrobe alpha bounds, live Settings controls, counters, pointer-held crouch and release.
- Every final page capture loaded all **373 image registrations** with no missing images or JavaScript page errors. The manifest also includes 50 audio entries, making 423 registrations total.
- The editable web build and synchronized Android web assets were regenerated successfully. Ten original 1254×1254 weapon PNGs are unchanged.
- **No APK/AAB was compiled, and no native/physical Android test was performed.** Browser tests use an in-memory storage shim and an in-memory-only QA probe because the local browser environment blocked the HTTP origin. These do not test real save persistence, native dp, billing, Bluetooth, native startup, physical touch feel or frame-time performance. No QA probe/shim was added to the production bundle.

See `docs/ui-polish/NODE-TESTS.txt`, `BUILD.txt`, `BROWSER-CHECKS.json`, and `VERIFICATION.json`. Historical evidence elsewhere in the repository remains historical and is not presented as v1.4.1 evidence.

## Missing art and conflicts carried forward

`docs/MISSING-ASSETS.md` preserves the prior 217 worklist items and adds 56 crouch/rig/glyph/fidelity items (273 work items, not 273 unique pictures). The original unarmed bodies, slot variants, clean modular bases, foreground masks, weapon holding gaps and font constraints remain tracked. Bront's legacy shield/haft body and Sol's shield-knight body still do not visually match their intended hammer/lance. The six-slot catalog is not populated with fake saleable pieces.

Conflicts were resolved explicitly: identity art is allowed as a labelled reference without lying about an unarmed combat sprite; new posture is a labelled procedural fallback until art exists; extra stats/actions and real save state are kept even when mockups omit them; target dummy currency, unlocked states and leaderboard results are not copied into gameplay. Exact visual fidelity remains partial, rather than replacing live UI with a screenshot.
