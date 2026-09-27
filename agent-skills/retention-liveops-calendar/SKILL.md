---
name: retention-liveops-calendar
description: Daily reward design, event cadence, and push-notification/re-engagement strategy. Use for any daily login system, timed event, or notification feature.
---

CALIBRATION REFERENCE: Brawl Stars / Clash Royale-style live-ops cadence — daily login streaks, weekly rotating challenges, seasonal content drops on a predictable calendar players can learn to expect.

DAILY REWARD DESIGN:
- Use an escalating streak reward (day 1 small, day 7 meaningful) rather than a flat daily reward — escalation is what drives "don't break the streak" behavior, which is the core mechanism daily-login systems rely on.
- Cap the streak cycle length at 7 or 14 days, then loop, rather than an indefinite streak — indefinite streaks either become trivial after enough days (nothing left to look forward to) or require ever-escalating rewards that break economy balance (ties to game-economy-balancing skill).
- ALWAYS forgive one missed day per streak cycle (a "streak freeze" or 1-day grace period) — a system that fully resets on any missed day punishes real-life interruption (a genuinely bad day, no phone access) as harshly as disinterest, and disproportionately drives away otherwise-engaged players over something outside their control.

EVENT CADENCE:
- Weekly rotating content (a rotating challenge mode, rotating shop item, rotating modifier) creates a lightweight "something's different this week" hook with low content-production cost.
- Larger seasonal events (roughly monthly or tied to a season-pass cycle) should introduce genuinely new content (new cosmetic set, new limited mode) — reserve your actual new-content budget for this cadence rather than the weekly rotation.
- Always telegraph upcoming events in-game a few days ahead (a "coming soon" banner/countdown) — this builds anticipation and gives players a reason to return specifically when it launches, rather than discovering it cold.

PUSH NOTIFICATION STRATEGY:
- Never request notification permission before the player has experienced gameplay (see onboarding skill) — ask at a moment tied to clear value (e.g. right after claiming a daily reward: "get notified when your next reward is ready?").
- Limit notification categories to genuinely valuable ones: streak-about-to-break warning, energy/stamina refilled (if the game uses an energy system), limited-time event starting/ending soon, friend activity (if social features exist). Avoid generic "come back!" notifications with no specific hook — these have the highest opt-out/uninstall-notification rates and the lowest re-engagement value.
- Respect a reasonable frequency cap (e.g. no more than 1 notification per day outside of critical time-sensitive events like "event ends in 1 hour") — notification fatigue causes players to disable notifications entirely, which is much harder to reverse than simply sending fewer.

RE-ENGAGEMENT FOR LAPSED PLAYERS:
- For players inactive 3+ days, a returning-player incentive (a "welcome back" bonus, a summary of what they missed) measurably improves win-back rates versus a generic notification alone.
- Never punish returning players for their absence (e.g. don't have their resources decayed or their streak-based unlocks revoked) — the goal is making return frictionless and rewarding, not penalizing the gap.

WHEN DESIGNING A NEW LIVE-OPS FEATURE:
1. State its cadence (daily/weekly/monthly) and confirm it doesn't collide with an existing cadence slot (e.g. don't stack two different weekly systems asking for attention on the same day).
2. If it involves notifications, state the specific value hook, not a generic "come play" message.
3. Confirm streak/cadence systems include forgiveness for a missed cycle.
