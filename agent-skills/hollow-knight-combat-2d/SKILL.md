---
name: hollow-knight-combat-2d
description: 'Design and implement responsive 2D melee combat for an Android pixel-art platformer, in the style of Hollow Knight: precise hit/hurtboxes, attack recovery frames, parry/pogo mechanics, and enemy telegraphing.'
---

When implementing combat for this 2D Android game, follow these principles (Hollow Knight-style action combat):

ATTACK STRUCTURE
- Every attack has 3 phases: startup (wind-up, no damage), active (hitbox is live), recovery (player is vulnerable/committed).
- Keep startup short (3-6 frames at 60fps) so combat feels responsive, not sluggish.
- Recovery should be long enough that spamming attacks is punishable, but short enough it doesn't feel unfair.

HIT/HURTBOXES
- Separate the attack's hitbox (deals damage) from the player's hurtbox (receives damage). Never reuse the sprite's full bounding box for both.
- Hitboxes should be slightly smaller than the visual sword/weapon swing to feel fair to the player.
- Enemy hurtboxes should be generous (easy to hit) to keep combat satisfying.

NAIL/POGO-STYLE BOUNCE (if applicable)
- Downward attacks that connect with an enemy or bouncy object should give the player a small upward velocity boost, enabling combo platforming (like Hollow Knight's pogo).

DEFENSE & INTERRUPTION
- Player can cancel recovery early only via a dodge/dash, never via another attack (prevents infinite combos).
- Enemies should telegraph attacks with a visible wind-up animation or color flash BEFORE their hitbox activates, giving the player a fair reaction window.
- Support i-frames (invincibility frames) during dodge/dash, not during normal movement.

FEEL & FEEDBACK
- Add hit-stop (freeze both attacker and target for 2-4 frames on a landed hit) to sell impact.
- Add screen shake only on heavy hits, kept under 150ms duration.
- Flash the enemy sprite white/red briefly on hit.

DETERMINISM
- Combat resolution (did this hit land, in what order) must be deterministic and testable — no relying on frame-rate-dependent timing. Use a fixed timestep or frame-counted state machine for attack phases, not delta-time-only.

When asked to implement or tune combat, always specify which phase (startup/active/recovery) a change affects, and check that hit detection uses separate hit/hurtboxes before writing collision code.
