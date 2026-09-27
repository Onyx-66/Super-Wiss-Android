---
name: game-economy-balancing
description: Currency source/sink balancing, inflation control, and free-vs-paid progression math. Use for any change to currency earn rates, prices, or new economy features (new currency, new sink, new source).
---

This is DISTINCT from shop UX/design (see monetization-shop-design) — this skill is the underlying numbers layer that determines whether the shop's design actually works in practice.

SOURCE/SINK FRAMEWORK:
- Every currency needs an explicit list of SOURCES (ways to earn it) and SINKS (ways to spend it). Before adding any new source or sink, write out how it shifts the existing balance — an unbalanced economy (too many sources, too few sinks) causes currency inflation, where earned amounts become meaningless and the shop's paid options lose perceived value because "you'll have enough eventually anyway."
- Target ratio as a starting point: total sink "cost" across all currently-purchasable items should represent roughly 15-30 typical play sessions' worth of earned soft currency for a "committed but not paying" player to fully unlock the free-reachable tier — long enough that paying feels like a meaningful time-save (driving conversion), short enough that free players don't feel the game is designed to be unreachable (which drives churn and bad reviews, and is a compliance risk per the "genuinely reachable free path" requirement in the compliance skill).

INFLATION CONTROL:
- Watch for "source creep" — every new feature that adds a currency-earning method (new daily reward, new ad-reward, new achievement) without a corresponding new sink or price increase elsewhere causes gradual inflation. Before shipping any new earn-source, explicitly check: does total achievable currency-per-session increase meaningfully? If yes, does anything need re-pricing?
- Prefer adding new SINKS (new cosmetics, new upgrade tiers) over constantly adding new sources — sink-starved economies are easier to keep healthy than source-flooded ones.
- Late-game/high-progression players often accumulate large soft-currency surpluses with nothing left to spend on — always reserve at least one "infinite sink" (a repeatable, scaling-cost upgrade, or a rotating cosmetic shop) so currency never becomes fully purposeless for veteran players; a currency with no remaining use stops being motivating to earn, which quietly kills a core retention loop.

DUAL-CURRENCY INTERACTION (soft + hard currency, per shop-design skill):
- Hard currency (paid) should never be directly convertible to unlimited soft currency at a good rate — this collapses the two-currency system into one and undermines the "free-but-slow vs. paid-but-fast" distinction that makes dual currency work as a monetization structure.
- Soft currency should never be purchasable with real money at a rate that trivializes the hard-currency shop — if players can just buy soft currency to skip everything, your hard-currency-only premium items lose their purpose.

PRICING PSYCHOLOGY (apply carefully, stay inside the fairness tiers from monetization-shop-design):
- Charm pricing (e.g. $4.99 vs $5.00) is standard and fine.
- Larger currency bundles should show genuinely better value-per-unit than smaller ones (e.g. the biggest bundle should be a real 20-30% better rate, not just larger in nominal number) — the discount must be real and verifiable, since inflated/fake "% off" framing on unclear baselines risks both player trust and increasing regulatory scrutiny in some regions.

WHEN CHANGING ANY PRICE, EARN RATE, OR ADDING A NEW CURRENCY FEATURE:
1. State whether it's a source or sink change.
2. Recalculate (even roughly) the "sessions to fully unlock free tier" number and confirm it stays in the 15-30 session range, or explicitly justify moving outside it.
3. Check whether it needs a corresponding sink/source addition elsewhere to stay balanced.
