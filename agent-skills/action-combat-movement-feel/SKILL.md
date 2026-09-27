---
name: action-combat-movement-feel
description: Genre-agnostic standards for 2D action-platformer movement and combat feel, calibrated against Hollow Knight, Celeste, Dead Cells, and Katana Zero. Use for any jump/dash/attack tuning across any project.
---

CALIBRATION REFERENCES:
- Celeste: best-in-class jump buffering/coyote time tuning, forgiving but skill-expressive movement.
- Hollow Knight: nail (melee) startup/active/recovery pacing, pogo-bounce platforming, parry timing.
- Dead Cells: attack combo chaining, roll/dodge i-frame windows, weapon-switch fluidity.
- Katana Zero: instant, high-commitment attacks with heavy telegraphing on enemy side — good reference for "one-hit-kill" style combat if that fits a project.

MOVEMENT BASELINE (starting point for any new project, then tune per game feel):
- Coyote time: 80-120ms.
- Jump buffer: 100-150ms.
- Variable jump height: early-release should cut upward velocity by 40-60%, not to zero (a full cut feels unresponsive).
- Wall-slide/wall-jump: only include if the game's level design uses vertical wall sections meaningfully — don't add wall-jump as a default "feature checklist" item if levels are flat.

COMBAT BASELINE:
- Every attack decomposes into startup (no damage, telegraphed) → active (hitbox live) → recovery (vulnerable/committed). Never skip decomposing a new attack into these 3 phases, even a "simple" one.
- Startup: 60-100ms for a "fast" attack, up to 250ms for a "heavy/telegraphed" attack — the startup duration IS the game's way of communicating attack weight to the player, don't treat it as an arbitrary tuning knob.
- Recovery should always be ≥ the player's own dodge recovery, so dodging out of a whiffed attack is mechanically always viable — this single rule prevents the most common "combat feels unfair" complaint.
- Hit-stop (freezing both attacker and target for 2-4 frames on a landed hit) is mandatory for anything marketed as having "impactful" combat — its absence is the most common reason indie combat feels weightless compared to the references above.
- Separate hitbox (deals damage) from hurtbox (receives damage) always, even in the simplest AABB implementation — never reuse one rectangle for both roles.
- Enemy telegraphs (visual tell before their hitbox activates) must give the player a MINIMUM reaction window matching human reaction time: 200-250ms minimum for a "fair" difficulty enemy, can drop to 120-150ms only for intentionally punishing/boss-tier enemies.

PROGRESSION OF DIFFICULTY:
- Early-game enemies: single attack pattern, long telegraph, slow recovery — teaches the hitbox/hurtbox/dodge loop.
- Mid-game enemies: 2-3 attack patterns, shorter telegraphs, may punish button-mashing dodge.
- Boss-tier: multi-phase, stagger meters, telegraphed but faster patterns, environmental hazards layered on top of attack patterns (this is what separates Hollow Knight bosses from generic "big HP bar" bosses).

GAME FEEL / JUICE CHECKLIST (apply to every new mechanic, not just combat):
- Screen shake: 50-200ms duration, diminishing intensity, reserved for genuinely impactful moments (heavy hits, deaths, level transitions) — overuse numbs the player to it within the first play session.
- Squash/stretch on landing, jumping, and taking damage.
- Particle burst on impact, death, and pickup collection — even 3-5 particles reads as "polished" versus zero.
- Audio must be synced to the active frame of an attack, never the startup frame — mis-timed SFX is a top complaint in combat-feel reviews even when the underlying mechanics are sound.

WHEN TUNING FEEL FOR A SPECIFIC PROJECT:
1. Ask which of the 4 reference games' combat weight the project is aiming for (floaty/forgiving like Celeste vs weighty/precise like Hollow Knight vs instant/lethal like Katana Zero) before picking numbers — these baselines are a starting range, not a fixed answer.
2. Always state which specific phase (startup/active/recovery) a change affects.
