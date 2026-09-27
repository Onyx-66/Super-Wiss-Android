---
name: social-virality-referral
description: Share mechanics, referral rewards, and leaderboard design that drive free/organic player acquisition. Use for any friend-invite feature, leaderboard, or shareable-moment system.
---

CORE PRINCIPLE: the cheapest player acquisition is a player brought in by another player. Every feature here should make a strong player-moment easy to share and rewarding to act on for both the sharer and the invitee.

SHAREABLE MOMENTS:
- Identify the game's genuinely "flex-worthy" moments (a hard boss kill, a big combo, a rare item pull) and build a one-tap share action at that exact moment (auto-generated image/clip + share sheet), not a buried "share" button in a menu — moments lose their shareability value quickly once the player has moved past the excitement of the instant.
- Shared content should visually represent the game's actual pixel-art style prominently (ties to mobile-pixel-art-ui-ux skill) — a shared screenshot is often a non-player's first exposure to the game's look, so it functions like a micro-ASO screenshot (ties to aso-store-listing skill).

REFERRAL SYSTEM:
- Reward BOTH the referrer and the new player (e.g. both get a currency bonus once the invitee reaches a meaningful milestone, like completing onboarding — not just on install, which is trivially gameable and rewards installs with no actual engagement).
- Set the referral reward milestone at a point that also benefits your own retention data (e.g. "reward triggers when invitee reaches day-3 retention") — this aligns the referral incentive with genuine engagement rather than a bot-farmable install count.
- Keep the invite flow to one tap (native share sheet with a pre-filled deep link), never require the referrer to manually type a code to a friend if a link-based flow is technically available.

LEADERBOARDS:
- Global leaderboards alone (e.g. "top 100 players worldwide") are demotivating for the vast majority of players who will never realistically rank — always pair a global leaderboard with a FRIENDS-ONLY or smaller-cohort leaderboard (e.g. "top among your friends," or a weekly-reset regional/random-cohort leaderboard) where a normal player has a realistic chance of seeing meaningful movement.
- Weekly-resetting leaderboards (rather than all-time-only) give every player a fresh, achievable competitive window regularly, rather than an all-time board dominated permanently by the earliest/most dedicated players.

SOCIAL PROOF IN-APP:
- Surfacing simple social signals (a friend's recent high score, a friend playing right now if using the local-multiplayer system) drives re-engagement more reliably than generic notifications (ties to retention-liveops-calendar skill) — prioritize this if the game already has any friend/social-graph data from a referral or account system.

MODERATION TIE-IN:
- Any leaderboard with player-chosen display names or any shareable content involving user-generated elements (a custom loadout name, etc.) inherits the same moderation/reporting requirement flagged in the audio-sfx-vo-emotes skill and google-play-compliance-monetization skill — don't treat leaderboard display names as exempt from UGC moderation just because they're short.

WHEN DESIGNING A NEW SOCIAL/SHARE FEATURE:
1. Confirm both sides of a referral are rewarded, and the reward triggers on genuine engagement, not just install.
2. Confirm any leaderboard includes a small-cohort/friends view alongside any global view.
3. Confirm shared content visually represents the actual game art style.
