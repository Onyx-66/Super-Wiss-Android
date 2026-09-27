---
name: google-play-compliance-monetization
description: Current Google Play Developer Policy requirements specifically affecting monetized games with shops, currencies, or randomized items. Use before submitting any build, and before implementing loot boxes, ads, or any purchase flow.
---

This skill covers POLICY, not general monetization design (see monetization-shop-design for design principles). Policy violations here cause app rejection or removal, not just poor reviews — treat every item below as a hard requirement, not a suggestion.

PAYMENTS POLICY (Google Play Billing):
- Any in-app purchase of digital goods/features MUST use Google Play's billing system — you cannot process real-money transactions for digital currency/items through an external payment processor inside the app (physical goods and a few other exceptions exist, but a game's virtual currency/cosmetics do not qualify).
- In-app pricing shown to the user must exactly match the price in Google Play's billing UI — never show a custom price that differs from what Play Billing actually charges.
- If your store listing describes any feature that requires payment to access, the listing itself must clearly disclose that payment is required — don't let "free to download" imply "free to fully play" if there's a paywall.

LOOT BOX / RANDOMIZED ITEM DISCLOSURE (mandatory if using any gacha/loot-box mechanic):
- You MUST clearly disclose the odds of receiving each item BEFORE purchase, and that disclosure must be in "close and timely proximity" to the purchase action — a page buried in settings or a separate "odds" menu the player has to seek out is NOT sufficient; the odds must be visible at or immediately before the point of purchase.
- This applies to ANY mechanism granting randomized virtual items via purchase, not just explicitly-named "loot boxes" — a "mystery pack," "surprise crate," "random hero shard bundle," etc. all qualify.
- Odds must be per-individual-item, not just per-rarity-tier vagueness (e.g. "70% chance of Common" is insufficient if there are 10 different Common items — ideally disclose the chance of each specific item, or at minimum each rarity tier AND how many items share that tier).

FAMILIES / KIDS POLICY (check this even if not explicitly targeting kids):
- If your game's content, marketing, or common usage patterns could appeal to children, Google may require Families Policy compliance regardless of your intended target audience — a bright pixel-art platformer with a young-looking protagonist is a realistic candidate for this classification even without explicit "kids game" framing.
- Under Families Policy: no ads from non-certified ad networks may target children's apps (Ad Network Certification requirement), and stricter data-collection rules apply.
- If genuinely designed for a general/adult audience, be prepared to justify this in Play Console's content rating questionnaire — don't assume pixel-art style alone exempts you from Families Policy scrutiny.

DATA / PERMISSIONS POLICY:
- Do not request broad Contacts permission if not genuinely needed — Play now requires using the Android Contact Picker (a narrower, user-mediated alternative) instead of broad contacts access, unless you have a clearly justified, disclosed need for full access (e.g. a "find friends" feature still often should use the picker, not broad access).
- Any use of an Age Signals API or similar age-inference data may ONLY be used to shape age-appropriate experience within the receiving app — do not repurpose age-signal data for ad targeting or any unrelated use.
- Request the minimum permission set your actual features require; unused/broad permissions are a common review-rejection and re-review-delay cause.

USER-GENERATED CONTENT (relevant if adding chat, custom names, or shareable content):
- Google Play Developer Policy prohibits monetizing UGC in ways that could enable exploitation (e.g. selling access to user-generated content without moderation safeguards).
- If your emote/social system (see audio-sfx-vo-emotes skill) allows any player-authored text or content, you need a moderation/reporting mechanism before launch, not as a post-launch addition — this is both a policy requirement in many cases and a reputational risk.

GAMBLING POLICY BOUNDARY:
- Google's Gambling policy has been updated with additional examples clarifying the line between legal randomized-item monetization (loot boxes with disclosed odds, generally permitted) and prohibited real-money-gambling mechanics (anything allowing cash-out/resale of randomized item outcomes for real money, or wagering real money on an uncertain outcome for a real-money prize).
- Never build any feature allowing players to sell/trade purchased randomized items for real money within the app or via any integrated marketplace — this crosses from "loot box" into "gambling" territory under current policy.

PRE-SUBMISSION CHECKLIST (run through this before every Play Console submission):
1. Every real-money purchase goes through Google Play Billing — no external payment links for digital goods.
2. Every randomized-item purchase mechanism shows odds at the point of purchase.
3. Content rating questionnaire answers match actual game content honestly (violence level, monetization type, UGC presence).
4. No broad Contacts permission unless justified and using the Contact Picker where possible.
5. If any UGC/chat/emote-with-text feature exists, a moderation/report mechanism is implemented.
6. No feature allows converting in-game randomized items back into real-world money.
7. Store listing accurately discloses that payment is required for any paywalled feature.

WHEN A NEW MONETIZATION FEATURE IS PROPOSED:
1. Check it against this list BEFORE implementation, not after — a feature built against a compliant design from the start avoids costly rework when Play Console review flags it.
2. If it involves randomization + purchase, treat odds-disclosure UI as a REQUIRED part of the initial build, not a "add before launch" follow-up task.
