---
name: telemetry-analytics-instrumentation
description: Which events to track for funnel analysis, retention measurement, and purchase-conversion diagnosis. Use when adding analytics instrumentation to any new feature, especially onboarding, shop, or level-progression systems.
---

CORE PRINCIPLE: instrument early — retrofitting analytics after a feature ships means losing all historical data on exactly the launch period when a feature's real performance (good or bad) is most visible and cheapest to react to.

MINIMUM EVENT SET FOR ANY NEW GAME (implement before first public build, not after):
- session_start / session_end (with duration)
- tutorial_step_completed (per step, per onboarding skill's step breakdown) and tutorial_abandoned (with the step index where it happened)
- level_start / level_complete / level_failed (with level ID and attempt count)
- currency_earned (with source tag: gameplay, daily reward, ad-reward, purchase) and currency_spent (with sink tag: which item/upgrade)
- shop_viewed, item_viewed (per item), purchase_initiated, purchase_completed, purchase_cancelled — this funnel is what diagnoses WHERE a monetization conversion problem actually is (people not opening the shop? opening it but not tapping an item? tapping but abandoning at confirmation?), which a single "revenue" number can never tell you.
- ad_offered, ad_watched_complete, ad_skipped (per ad placement type, per ads-monetization skill's tier categories)
- app_open (with days-since-install and days-since-last-open, for retention curve calculation)

FUNNEL ANALYSIS PRINCIPLE:
- Every multi-step process (onboarding, purchase flow, event participation) should be instrumented as a FUNNEL (a numbered sequence of events), not just a single completion event — a single "tutorial_completed" event with no per-step breakdown tells you IF the tutorial has a problem but not WHERE, forcing guesswork that instrumenting per-step avoids entirely.
- When a new multi-step feature is designed, list its steps explicitly and confirm each step fires its own event before implementation — don't treat this as "add analytics later."

RETENTION METRICS TO CALCULATE FROM THE ABOVE:
- D1/D7/D30 retention (percentage of installs still opening the app 1/7/30 days later) — the industry-standard baseline health metrics; a mobile game with strong D1 retention (commonly cited healthy benchmark: 30%+ for casual/action mobile games, though this varies by genre) but weak D7 has a mid-game content/pacing problem; strong D1 but weak D30 has a long-term-progression/live-ops problem (ties to retention-liveops-calendar skill).
- Purchase conversion rate (% of players who make at least one purchase) and ARPDAU (average revenue per daily active user) — standard mobile monetization health metrics; use the shop funnel events above to diagnose conversion problems rather than treating conversion rate as an unexplainable black box.

PRIVACY / COMPLIANCE INTERACTION:
- Any analytics/ad-tracking SDK must respect platform consent flows (e.g. Android's advertising ID consent) — do not fire tracking-dependent events before consent is granted where required, and ensure your chosen analytics provider is compatible with the Families Policy constraints already flagged in google-play-compliance-monetization if that classification applies.

WHEN ADDING A NEW FEATURE:
1. Before writing gameplay code, list the events this feature should fire and at which exact trigger points.
2. For any multi-step flow, confirm each step is a separate event, not one aggregate "completed" event.
3. Confirm new events use consistent naming/parameter conventions with the existing event set (e.g. don't introduce a differently-cased or differently-structured event name for a conceptually similar action).
