# Skill decisions and local read ledger

All 16 documents below were extracted from the locally available skill ZIP attachments, read in full, and included under `agent-skills/`. Not fetched from GitHub in this turn. SHA-256 values identify the SKILL.md bytes; ZIP hashes are in SOURCE-PROVENANCE.json. Rules are design inputs, not proof of finished visual art, current laws, or measured market outcomes.

## `action-combat-movement-feel`

Source: `agent-skills/action-combat-movement-feel/SKILL.md:19`. Full document: 39 lines. SHA-256: `9f6a4de029425078b549889486591b4983aaaec9c681c7b8a8454186c3d16b5e`.

> Every attack decomposes into startup (no damage, telegraphed) → active (hitbox live) → recovery (vulnerable/committed). Never skip decomposing a new attack into these 3 phases, even a "simple" one.

Tasks 1/4: never draw an extra held weapon over baked art; fist simulation explicitly separates startup, active, recovery and body/attack rectangles. Recovery is at least the original dodge duration. The layering rule is an implementation inference serving readable combat, not a direct weapon-layer instruction in this skill.

## `ads-monetization-rewarded-interstitial`

Source: `agent-skills/ads-monetization-rewarded-interstitial/SKILL.md:9`. Full document: 35 lines. SHA-256: `c5bdfee571e612d7640fbad1040e05587a2945b335d026a70793a2e9cd67e331`.

> 1. Rewarded video (player-initiated, opt-in, clear value exchange: "watch an ad for 2x coins," "watch ad to continue/revive") — lowest friction, best-tolerated by players, should be your PRIMARY ad surface.

No ad SDK, forced ad, ad reward or new currency source was added. This task does not implement or audit an ad flow.

## `aso-store-listing`

Source: `agent-skills/aso-store-listing/SKILL.md:27`. Full document: 33 lines. SHA-256: `0c6139a85224625819b75afc077c87882cac4a64be74e5f74350b21c0c227915`.

> Keep the visible app name (shown under the icon on the home screen) short and memorable — long names get truncated on the home screen launcher grid, which can look unpolished or make the app hard to find later.

Task 6: used short, readable display names as a creative extrapolation of the naming rule. The document addresses app names, not hero trend research; these nine hero names are not validated claims about current mobile popularity.

## `audio-sfx-vo-emotes`

Source: `agent-skills/audio-sfx-vo-emotes/SKILL.md:14`. Full document: 35 lines. SHA-256: `4d5da0ca9700230266fe63465cb9cd0527aa4e6baabd8c8ced870babbae8c67f`.

> SFX must trigger on the ACTIVE frame of an action, never the startup frame — this is the single most common audio-timing bug in indie games and instantly reads as "unpolished" even when the visuals are fine.

Task 4: punch action sound occurs at the first active tick; impact sound occurs on damage confirmation. Reused short existing samples are functional placeholders, not authored fist/hero VO.

## `character-narrative-skills-pets`

Source: `agent-skills/character-narrative-skills-pets/SKILL.md:12`. Full document: 33 lines. SHA-256: `c8fe8873fb54767f4130c99d3ee70860dd028565a56659c9ab0290ad259b219a`.

> 1. Define the ONE mechanical hook first (speed, range, defense trade-off, unique verb like "can double-jump" or "attacks pierce"), before writing any backstory. Mechanics-first, lore-second — a character with rich lore but no clear mechanical identity fails in actual play; the reverse (clear mechanics, thin lore) still functions.

Tasks 5/6/8: names and ratings communicate existing quick-duelist, caster, guardian, wind, gadget, scout, solar and frost identities. Original combat speed/acceleration and signature roles remain authoritative.

## `game-economy-balancing`

Source: `agent-skills/game-economy-balancing/SKILL.md:14`. Full document: 28 lines. SHA-256: `56ab308677e014b60fb3355fc7a7f53516623c33d7d6cae125c7ed2b135b791a`.

> Prefer adding new SINKS (new cosmetics, new upgrade tiers) over constantly adding new sources — sink-starved economies are easier to keep healthy than source-flooded ones.

Tasks 5/7: no XP-to-Power multiplication, no changed coin source or current item price, no sellable fake clothing. Six slots define future cosmetic sinks; production pricing/session-to-unlock modeling remains required before actual new inventory is sold.

## `google-play-compliance-monetization`

Source: `agent-skills/google-play-compliance-monetization/SKILL.md:3`. Full document: 47 lines. SHA-256: `655b3ab63a68cff0237351412d69fdd641c3c07853e103886022104decaddb7e`.

> description: Current Google Play Developer Policy requirements specifically affecting monetized games with shops, currencies, or randomized items. Use before submitting any build, and before implementing loot boxes, ads, or any purchase flow.

Task 7: no new real-money, randomized or power sale was implemented. This locally supplied document was read, but it is not a current legal/policy verification. Billing/store compliance remains outside this WIP.

## `hollow-knight-combat-2d`

Source: `agent-skills/hollow-knight-combat-2d/SKILL.md:10`. Full document: 34 lines. SHA-256: `4d3ca018660f3487deab4055c39389c686877ced4464e79cb5753a53043a4473`.

> Keep startup short (3-6 frames at 60fps) so combat feels responsive, not sluggish.

Task 4: startup clamped to 3–6 ticks at 60Hz, active-only fist collision, separate hurtbox, one target hit per attack, three-tick attacker/target hitstop, recovery-only dodge cancellation. Per-hero tick table is in HERO-STATS.md.

## `mobile-pixel-art-ui-ux`

Source: `agent-skills/mobile-pixel-art-ui-ux/SKILL.md:13`. Full document: 35 lines. SHA-256: `74079701dcffd87ae28c9bd2037d89e9ac0dc8a40073fe05cd1d253927e21596`.

> Minimum tappable area: 44x44dp (Android accessibility guideline), even if the visible icon is smaller — pad the hitbox, not just the art.

Tasks 2/3/9: new generic buttons are at least 44 CSS pixels; jump/attack retain larger controls; global menu uses max(24px, safe-area inset) sides. Cropped chevron is paired with CROUCH text and an accessible hold/release label. CSS pixels/browser checks are not a claim of full Android dp/device accessibility certification. Small-screen text and non-integer stretched border details still require polish. Comparison points: action HUD/Brawlhalla-style controls, Dead Cells-style scannable combat menus; the supplied mockups remain the specific visual target.

## `monetization-shop-design`

Source: `agent-skills/monetization-shop-design/SKILL.md:17`. Full document: 38 lines. SHA-256: `9a841d254a2b91fbcde37533654d7691b3aebb928967bc4a79b2e318e526788e`.

> 1. Pure cosmetics (skins, emotes, banners, profile customization) — zero gameplay effect, safest for both player trust and store policy.

Task 7: headwear/top/pants/shoes/eyewear/weapon skins are tier 1, pure appearance. Ratings, eligibility, HP and damage cannot be bought through these slots. Ready asset and ownership validation precede equip/purchase. Existing trail purchases show price and confirmation; unavailable new pieces are disabled.

## `pixel-art-page-layout-system`

Source: `agent-skills/pixel-art-page-layout-system/SKILL.md:127`. Full document: 130 lines. SHA-256: `5bc680454fe05cd3a87da7f93d5a9db7ef1c9c096adcc9ba9aaf8a894fbc085d`.

> 2. Build the Part B border/panel component FIRST, as a reusable 9-slice asset, before building any individual page — every other page depends on this one component existing and being correct.

Tasks 2/9: common cropped nine-slice navy/gold panel and shared identity/currency/navigation shell precede page-specific layouts. Kicker + cream/gold headline + supporting line and grid/detail, split-table, wardrobe preview and settings-overlay structures are implemented. Exact mockup background/pedestal, role badges, some metadata embellishments, and final font shapes are not claimed complete.

## `player-onboarding-ftue`

Source: `agent-skills/player-onboarding-ftue/SKILL.md:28`. Full document: 36 lines. SHA-256: `a3719c40f7bc0f68e7896b35d6b64c4cc7f272b2aa799d8d753b1abc16795dc1`.

> If account creation/login is optional, make guest-play the default path, with account linking offered later (e.g. after first session, framed as "save your progress").

Preserved guest play and the existing onboarding/account path. No new mandatory login, permissions or equipment tutorial blocks first play.

## `retention-liveops-calendar`

Source: `agent-skills/retention-liveops-calendar/SKILL.md:25`. Full document: 30 lines. SHA-256: `64643008ab521e4cbf9df91d40e52e870c6b0aa1e32f97a540ded43176d07cf0`.

> Never punish returning players for their absence (e.g. don't have their resources decayed or their streak-based unlocks revoked) — the goal is making return frictionless and rewarding, not penalizing the gap.

Preserved earned rewards/legacy entitlements; did not introduce loss/decay, notification permission prompts, fake timed offers or a new reward cadence.

## `social-virality-referral`

Source: `agent-skills/social-virality-referral/SKILL.md:3`. Full document: 30 lines. SHA-256: `d963b6a29cda64b6b29255617ec4bd98864e7243276de1ef35c5f08c8ed9cb09`.

> description: Share mechanics, referral rewards, and leaderboard design that drive free/organic player acquisition. Use for any friend-invite feature, leaderboard, or shareable-moment system.

Records are actual on-device data, not fabricated rankings to match decorative mockup rows. Combat revision 5 isolates changed rules from archived 1–4 results. No new referral flow was added.

## `telemetry-analytics-instrumentation`

Source: `agent-skills/telemetry-analytics-instrumentation/SKILL.md:26`. Full document: 31 lines. SHA-256: `ea9dcfcac8606c351c6b405d71caec1a1f4c78d332284663bf073347a9c1276b`.

> Any analytics/ad-tracking SDK must respect platform consent flows (e.g. Android's advertising ID consent) — do not fire tracking-dependent events before consent is granted where required, and ensure your chosen analytics provider is compatible with the Families Policy constraints already flagged in google-play-compliance-monetization if that classification applies.

No external telemetry SDK or tracking is introduced. Future sellable-piece funnel events (view, preview, purchase start/complete/cancel) require an explicit privacy/instrumentation decision; this skill is read but its full commerce-funnel instrumentation is not implemented in this empty-catalog WIP.

## `world-level-generation`

Source: `agent-skills/world-level-generation/SKILL.md:19`. Full document: 39 lines. SHA-256: `e66119b67cca3a22df1da800629a435b338a07b9f1ade3e94818b1bfb84b59ad`.

> Tag each chunk with: difficulty tier, required player abilities (so a chunk requiring double-jump never spawns before the player has it), and enemy density.

No level geometry, generated chunk reachability, collision routes or enemy placements were edited. Existing fifteen maps compile/validate and world-physics tests pass; this is preservation rather than a level-generation redesign.

## Decision priority and unresolved rule conflicts

The user’s actual art requirement takes precedence over generating visually similar replacements. Baked sprites therefore remain baked unless weapon freedom was visually confirmed. The melee-specific 3–6-frame startup range takes precedence over the broader movement document’s 60–100ms recommendation for the new fast fist attack: three frames is 50ms. Skill references are not a license to invent missing source data or claim art completion. Cosmetic rarity pricing was not invented: this skill ranks monetization fairness tiers, not a mandatory Common/Rare/Epic price table.
