---
name: world-level-generation
description: Principles for level/world design and generation that maximize replayability and pacing, for both hand-authored and procedural 2D level systems. Use for new worlds, difficulty curves, or map-building tools.
---

CALIBRATION REFERENCES:
- Dead Cells: procedural room composition from hand-authored room "chunks" — best practice for procedural-feeling-hand-crafted level design on mobile.
- Hollow Knight: hand-authored interconnected map with gated progression (metroidvania backtracking) — reference for non-procedural world structure.
- Spelunky: pure procedural generation with guaranteed solvability rules — reference if going fully procedural.

CORE PRINCIPLE — PACING CURVE:
Every level/world segment should follow a tension curve, not flat difficulty:
- Introduce a new mechanic/enemy in a SAFE context first (no combined threats).
- Combine it with an already-known mechanic/enemy next (compounding, not new).
- End the segment with either a mastery test (harder combination) or a rest beat (easier section, breather before next escalation) — never end on the hardest point of a segment, always resolve down slightly before the next escalation begins.

CHUNK-BASED PROCEDURAL GENERATION (recommended default for mobile, following Dead Cells' model):
- Author level content as hand-crafted "chunks" (a room, a platforming sequence) with defined entry/exit points, NOT as fully procedural noise-based generation — pure noise generation rarely produces good platforming and is very hard to guarantee solvable.
- Tag each chunk with: difficulty tier, required player abilities (so a chunk requiring double-jump never spawns before the player has it), and enemy density.
- Generation logic picks chunks matching current progression state + difficulty curve position, then stitches them — never generates raw tile noise for primary gameplay space.
- ALWAYS include a solvability guarantee: validate that a generated sequence has at least one traversable path using the player's currently-unlocked abilities before finalizing it, especially on mobile where a softlock means an immediate uninstall (much less patient audience than PC/console for getting stuck).

HAND-AUTHORED WORLD STRUCTURE (metroidvania-style):
- Gate progression with ability checks (a locked door needing double-jump/dash/etc.), not just enemy difficulty — this is what creates "aha, I can get back there now" moments that drive replay and exploration, a major retention lever.
- Always provide a fast-travel or shortcut-unlock mechanism once an area is fully explored — mobile players have less patience for backtracking than PC/console players; failing to shortcut long return trips is a common mobile-specific retention killer.

MOBILE-SPECIFIC LEVEL DESIGN CONSTRAINTS:
- Session length: design discrete level/chunk lengths to fit 2-5 minute play sessions as a default unit — mobile play patterns are bursty (commute, waiting in line), and levels/chunks that can't be meaningfully paused or resolved in that window hurt retention regardless of how good the level design is otherwise.
- Always support a mid-level checkpoint/save state — losing 5+ minutes of progress to an app switch or interruption (a phone call, notification) is a top mobile-specific churn cause that doesn't exist on console/PC.

REPLAYABILITY LEVERS (in order of implementation cost, cheapest first):
1. Randomized enemy/pickup placement within fixed hand-authored geometry (cheapest, high value).
2. Daily/rotating challenge modifiers on existing levels (no new content needed).
3. Chunk-based procedural recombination (moderate cost, see above).
4. Fully new hand-authored content (highest cost, use for major updates only).

WHEN DESIGNING A NEW WORLD/LEVEL SYSTEM:
1. State whether it's hand-authored, chunk-based-procedural, or fully-procedural, and justify the choice against the mobile session-length constraint above.
2. Include a difficulty curve description (where do new mechanics get introduced, where are the rest beats) before generating content.
