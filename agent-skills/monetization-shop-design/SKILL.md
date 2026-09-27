---
name: monetization-shop-design
description: Standards for designing an in-game shop, currency system, and monetization structure that maximizes real-money revenue while staying fair and avoiding predatory design flags. Use for any shop screen, currency, or IAP feature.
---

CALIBRATION REFERENCES:
- Brawlhalla/Brawl Stars: dual-currency model (earnable soft currency + purchasable hard currency), cosmetic-focused monetization, no pay-to-win core combat stats.
- Genshin Impact: battle-pass + gacha + direct-purchase hybrid, proven high-revenue structure, though gacha carries the most regulatory scrutiny (see compliance skill).
- Vampire Survivors: minimal/no aggressive monetization, proof that strong core-loop retention can succeed with a much lighter monetization touch — a valid strategy for a portfolio entry aimed at reviews/virality over immediate revenue.

CURRENCY STRUCTURE (default recommended model):
- Dual currency: a SOFT currency earned through play (coins, used for common items/upgrades) and a HARD currency primarily purchased with real money but earnable slowly through play (gems, used for premium cosmetics/convenience).
- Never make hard currency ONLY purchasable — always provide a slow, meaningful earn rate through gameplay (even if slow), both for fairness perception and because full-paywall currency is a stronger regulatory/policy red flag in several jurisdictions (see compliance skill).
- Price hard currency in bundles with escalating "value" framing (e.g. bigger bundles show a % bonus/discount badge) — this is standard, proven practice, not manipulative by itself, as long as the underlying prices and bonuses are accurately displayed.

MONETIZATION SURFACES, RANKED BY PLAYER-FAIRNESS (prefer higher on this list; anything below the "pay-to-win line" needs explicit justification):
1. Pure cosmetics (skins, emotes, banners, profile customization) — zero gameplay effect, safest for both player trust and store policy.
2. Convenience (faster progression, extra inventory slots, cosmetic loadout slots) — no direct combat advantage, generally safe.
3. Battle pass / season pass with a mix of cosmetic + convenience rewards, always including a free track alongside the paid track.
4. Direct currency purchase for earnable-but-slow items (buying your way to something everyone can eventually get for free) — acceptable if the free path is genuinely reachable in a reasonable timeframe, not designed to be effectively impossible without paying.
--- PAY-TO-WIN LINE — below this needs strong justification and increases regulatory/review risk ---
5. Randomized (gacha/loot box) mechanics granting gameplay-affecting items (new characters/pets with combat stats, powerful gear) — legal and Play-Store-permitted IF odds are disclosed (mandatory, see compliance skill), but carries the highest regulatory scrutiny globally and the highest "predatory" perception risk with players and reviewers.
6. Direct sale of gameplay power with no earnable free equivalent — strongly discouraged; this is the core definition of "pay-to-win" that drives the worst App Store reviews and press coverage.

SHOP UX (ties to mobile-pixel-art-ui-ux skill):
- Every item must show: price, what it does/looks like (preview), and — if randomized — the odds, BEFORE the purchase confirmation, not after.
- Never use a "confirm purchase" flow that requires more than 2 taps from decision to completion — excessive friction reduces legitimate conversion, but ALSO never make the final purchase tap accidental-clickable from browsing (a specific Play Store concern around accidental purchases).
- Clearly label real-money buttons differently from soft-currency buttons (see UI skill) at all times, including inside any "gacha pull" or loot-box screen.

RETENTION-MONETIZATION LEVERS (ordered by common effectiveness in top-tier mobile games):
1. Daily login rewards (soft currency + occasional hard currency drip) — proven low-cost retention driver.
2. Limited-time cosmetic offers tied to events — creates urgency without touching core fairness.
3. Battle pass with weekly/season cadence — strongest recurring-revenue driver in the current market, low predatory-perception risk if cosmetic-focused.
4. "Starter pack" one-time heavily-discounted bundle for new players — industry-standard, high-conversion, low controversy IF the discount claim is real and verifiable against normal pricing.

WHEN DESIGNING A NEW MONETIZED FEATURE:
1. State which numbered tier (1-6 above) it falls into and, if tier 5 or 6, explicitly flag this as a higher-scrutiny decision requiring the compliance skill's odds-disclosure and regional-legality checks before implementation.
2. Confirm a free/earnable path exists for anything not purely cosmetic, or explicitly justify why not.
