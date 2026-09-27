---
name: ads-monetization-rewarded-interstitial
description: Standards for integrating rewarded video and interstitial ads without hurting retention, and how ad monetization interacts with Google Play's Ad Network Certification policy. Use for any ad placement or ad-network integration.
---

CALIBRATION REFERENCE: Brawl Stars / Subway Surfers-style hybrid monetization — light, opt-in ad presence layered on top of a primarily IAP-driven economy, never ads as the sole or dominant monetization method for a game with genuine IAP depth.

AD TYPE HIERARCHY (prefer higher on this list):
1. Rewarded video (player-initiated, opt-in, clear value exchange: "watch an ad for 2x coins," "watch ad to continue/revive") — lowest friction, best-tolerated by players, should be your PRIMARY ad surface.
2. Rewarded interstitial (offered at a natural break point — level complete, death screen — still opt-in via a clear "watch for reward" button, not auto-played).
3. Standard interstitial (forced, non-skippable for several seconds, shown between levels/sessions) — highest revenue-per-impression but highest retention cost; use SPARINGLY and only at natural break points (level transitions), never mid-gameplay or immediately after a death (kicking a frustrated player into a forced ad is a top-tier churn driver).
4. Banner ads — generally discouraged for an action/platformer game: they either clutter the HUD (if persistent) or require awkward placement; usually skip these entirely for this genre.

FREQUENCY CAPPING (hard rules, not suggestions):
- Never show more than 1 forced interstitial per 3-4 minutes of active play, and never within 30 seconds of a previous ad of any type.
- Never show a forced interstitial immediately after a purchase (real-money or otherwise) — this reads as punishing the player for spending money, which is actively hostile to your own paying users.
- Never show a forced interstitial immediately on app open — let the player get into gameplay first (ties to onboarding skill's "gameplay before friction" principle).

REWARDED VIDEO PLACEMENT PATTERNS (proven, low-risk to implement):
- "Continue" offer on death (once per death max, diminishing or capped daily to avoid ads becoming a de facto difficulty bypass that undermines your combat/difficulty design work).
- "Double rewards" offer on level/match completion screen.
- "Free daily chest/bonus" offer, capped at a small number of uses per day (e.g. 3x) to prevent ad-watching from replacing your intended economy pacing (ties to game-economy-balancing skill — rewarded ads are a currency SOURCE and must be balanced into your sink/source math, not bolted on separately).

UI REQUIREMENTS:
- Always show the exact reward BEFORE the player commits to watching (e.g. "+50 coins" visible on the button, not revealed after) — undisclosed or bait-and-switch reward sizing is both a trust violation and can create Play Store review friction similar to the loot-box odds-disclosure principle.
- Always provide a visible, easy close/skip control on any ad surface your own UI wraps around (the ad network's own X button + your own screen's clear path back to gameplay).

GOOGLE PLAY POLICY INTERACTION (ties to google-play-compliance-monetization skill):
- If your app could appeal to children (see Families Policy note in the compliance skill), you may ONLY serve ads from Google-certified ad networks under the Ad Network Certification policy — verify any third-party ad SDK you integrate is on Google's certified list before shipping if there's any chance of Families Policy classification.
- Ad content itself must not violate content-rating mismatches (e.g. a mature-rated ad creative showing inside an all-ages game) — most major ad networks (AdMob, etc.) support content-rating filters at the SDK config level; always configure this rather than leaving default/unfiltered.

WHEN ADDING A NEW AD PLACEMENT:
1. State which of the 4 tiers above it is, and justify anything below tier 1-2.
2. Confirm frequency capping rules are enforced in code, not just "intended."
3. Confirm the reward (if rewarded-type) is shown before commitment.
