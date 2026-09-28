# v1.4.1 — icon-only touch HUD

All action captions are removed from source markup and dynamic updates, not merely made transparent. Stable control IDs, pointer bindings, accessible names and data badge nodes remain. Persistent numeric knife/spirit/skill/cooldown badges are real data and are retained. Contextual gameplay notifications and settings/editor instructions are not action-button captions.

| Old button | New visible icon | Source / implementation | Data / target |
|---|---|---|---|
| CROUCH / down-chevron | Bent-knee crouching silhouette beneath a low ceiling | Original 32×32 runtime SVG `crouch-pose` in `game/icons.js`; no matching supplied-sheet silhouette exists | Pressed state; at least44×44 logical pixels |
| JUMP | Upward arrow | Existing `arrow-up` SVG | At least56×56 |
| STRIKE / ATTACK | Sword | Existing sheet crop `assets/ui/icons/sword.png` | At least56×56 |
| PUNCH / unarmed attack | Clenched fist | Original 32×32 runtime SVG `fist` | At least56×56 |
| KNIFE | Diagonal dagger | Existing `knife` SVG | Keep knife count, e.g.12; at least44×44 |
| DODGE | Curling wind/roll symbol | Supplied icon-sheet crop `assets/ui/icons/wind.png` | At least44×44 |
| SPIRIT | Spirit silhouette; paw when a pet is selected | Existing ghost SVG / supplied `paw.png` | Keep call counter, e.g.2; at least44×44 |
| Hero skill I / II | Actual equipped skill artwork | Existing skill PNG registrations; labels stay off | Retain actual cooldown numbers; at least44×44 |
| Companion skill I / II | Actual companion skill / summon artwork | Existing dynamic pet-skill icons | Real cooldown/call values preserved; at least44×44 |
| RUN / sprint | Running figure | Supplied speed/running crop through `shoe-prints` mapping | At least44×44 |
| Left / right | Directional chevrons | Supplied arrow-left/right crops | At least44×44 when directional mode is active |
| Analog movement | Joystick disc and thumb | Existing live stick rendering | Existing larger drag region; min44 applies |
| ACTIVATE / REVIVE | Touch hand / heart | Supplied touch crop / existing heart icon | Context-sensitive accessible name; at least44×44 |
| Pause | Two pause bars | Existing pause SVG | At least44×44 |
| PRESET A / layout switch | Game controller | Supplied controller crop through `gamepad` mapping | At least44×44; accessible label retains actual preset letter |

`game/controls.js:controlRect()` clamps target size to44, or56 for Jump/Attack, and preserves24px safe margins plus larger safe-area insets. `game/ascension-ui.js:ascApplyControls()` uses measured safe insets and passes the control ID to that function. `game/index.html` keeps all numeric badge IDs intact; `game/ui-polish.css` centers icons and enforces caption-free rendering. The layout button is separated from the bottom action cluster, at the upper-right safe inset.

**Measured, not assumed:** all visible controls passed browser bounding-box checks for all four presets at1648×928,960×440,844×390; unit tests additionally exercise640×360 and an oversized right/bottom inset. Measurements are **CSS logical pixels**, not an Android instrumentation measurement. The width=device-width viewport follows the intended logical sizing, but actual WebView zoom/dp and physical thumb usability still require device verification.

The mobile UI skill requires silhouettes to read at32×32 in grayscale. The two new glyphs use geometry/outline rather than color distinctions, but no user-recognition study is claimed. Commissioned polished pixel-art replacements are optional finishing items, not unresolved runtime asset paths:

**Crouch PNG brief:** transparent32×32 logical canvas, contiguous cream/gold side silhouette with clearly bent knees and lowered torso under a horizontal ceiling bar, dark1px outline, no letters, no chevron-only shorthand; distinguish clearly from jump/up-arrow and dodge/swirl at32px in grayscale.

**Fist PNG brief:** transparent32×32 logical canvas, short wrist, thumb across curled fingers, strong single clenched-fist silhouette, cream/gold face with dark1px outline; no weapon and no lettering. Validate at32px and grayscale.
