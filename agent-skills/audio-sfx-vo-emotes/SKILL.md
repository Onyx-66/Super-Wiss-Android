---
name: audio-sfx-vo-emotes
description: Standards for sound effects, adaptive music, voice-over delivery, and social emote systems in a 2D mobile action game. Use for any new SFX, VO line, music layer, or emote/reaction feature.
---

CALIBRATION REFERENCES:
- Hollow Knight: minimal but perfectly-timed hit/impact SFX, sparse ambient music that swells only at key moments.
- Brawlhalla: quick, distinct hit-confirmation sounds per weapon type, readable in chaotic multiplayer without becoming noise.
- Fall Guys / Brawl Stars: short, expressive, spammable emote system designed for social multiplayer moments, not narrative dialogue.

SFX PRINCIPLES:
- Every player action that has a gameplay consequence needs a distinct SFX: jump, land, attack-startup (subtle, e.g. a whoosh), attack-hit-confirm (the important one — must be punchy and distinct from the whoosh), damage-taken, death, pickup, currency-gain, purchase-confirm.
- Hit-confirm SFX must be layered: a base "impact" sound plus a pitch/sample variation per weapon-type or enemy-type, so players can distinguish "I hit a shielded enemy" from "I hit a normal enemy" by sound alone, without looking at a health bar — this is a core game-feel signal, not decoration.
- SFX must trigger on the ACTIVE frame of an action, never the startup frame — this is the single most common audio-timing bug in indie games and instantly reads as "unpolished" even when the visuals are fine.
- Keep individual SFX under 300ms for frequent actions (attacks, jumps, hits) — longer sounds overlap badly when actions chain quickly, especially in combo-heavy combat.
- UI sounds (button tap, purchase, menu open/close) must be a SEPARATE, distinctly different sonic palette from gameplay SFX — mixing them makes menus feel like part of combat and vice versa, undermining both.

ADAPTIVE MUSIC:
- Structure music in layers (e.g. base ambient layer + combat layer + boss layer) that crossfade based on game state, rather than hard-cutting between separate tracks — hard cuts are jarring and read as unpolished; 1-2 second crossfades read as intentional and professional.
- Boss music should be distinct per boss (or per boss phase, matching the phase-based combat system) — reusing one generic "boss theme" across all bosses undercuts the sense of escalation that phase-based combat is trying to create.
- Music volume should duck (reduce, not mute) during critical VO or important SFX moments (level-up fanfare, purchase confirmation) — never let music compete with a moment meant to feel rewarding.

VOICE-OVER:
- Combat VO (hit grunts, attack callouts) should be short (under 1 second) and have 3-5 variations per line to avoid repetition fatigue — a single repeated grunt sample becomes actively annoying within one play session.
- Story/narrative VO, if used, should never block gameplay input — always let the player skip or move past VO, mobile players have low tolerance for forced listening.
- If budget doesn't support full VO, prioritize combat-feedback VO variations over narrative VO — feedback VO affects moment-to-moment feel every session, narrative VO is experienced once.

EMOTE / SOCIAL REACTION SYSTEM (for multiplayer modes):
- Emotes should be quick-access (single tap/gesture, no menu diving) and short in duration (under 2 seconds) so they don't disrupt match flow.
- Include both "positive/friendly" and "taunt/competitive" emote categories, but always allow players/servers to filter or disable taunts — unmoderated taunt spam is a common source of toxic-feeling multiplayer experiences and can create Google Play policy issues if the game targets younger audiences (see google-play-compliance skill on UGC/harassment policy).
- Emotes are a strong, low-controversy monetization surface (cosmetic-only, no gameplay effect) — see monetization-shop-design skill for how to price and present these.

WHEN ADDING NEW AUDIO:
1. State which category it falls into (gameplay-critical SFX, ambient/music, VO, emote) since each has different timing/repetition/variation rules above.
2. For any new gameplay SFX, confirm which frame (startup/active/recovery, if combat-related) it triggers on.
