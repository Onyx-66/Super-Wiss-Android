---
name: mobile-pixel-art-ui-ux
description: Mobile pixel-art UI/UX standards calibrated against top-tier reference games (Dead Cells, Brawlhalla, Vampire Survivors, Stardew Valley mobile). Use for any menu, HUD, shop screen, or touch control layout.
---

CALIBRATION REFERENCES (study these, don't copy assets — copy the underlying decisions):
- Dead Cells (mobile port): HUD minimalism, readable pixel-art at small phone screens, clean icon language.
- Brawlhalla: touch control layout for action games, legend/skin shop grid.
- Vampire Survivors: extremely readable upgrade-choice UI under time pressure, minimal-friction shop.
- Stardew Valley (mobile): pixel-art UI that stays legible on a 5-6" screen without feeling like a shrunk desktop UI.

TOUCH TARGET STANDARDS:
- Minimum tappable area: 44x44dp (Android accessibility guideline), even if the visible icon is smaller — pad the hitbox, not just the art.
- Primary action buttons (jump, attack): minimum 56x56dp, placed in the bottom third of the screen, thumb-reachable zone.
- Never place critical UI within 24dp of screen edges — this collides with gesture-navigation zones on modern Android and notch/punch-hole camera areas.
- Respect safe-area insets on every screen (status bar, gesture nav bar, notches) — pad, don't just avoid drawing there.

PIXEL ART SCALE RULES:
- Choose ONE base pixel scale multiplier per project (e.g. 3x or 4x) and apply it uniformly — mixing scale multipliers between UI and gameplay sprites is the #1 tell of an unpolished mobile pixel-art game.
- UI text must remain legible at the smallest supported screen size (typically ~5" at 720p) — never go below the equivalent of an 8px pixel font at 1x before scaling; test readability at that floor before finalizing.
- Icon silhouettes must be readable in grayscale at 32x32 — if the icon relies on color alone to be understood (common failure with rarity-color-coded shop items), it fails colorblind accessibility and often fails at small size too.

HUD PRINCIPLES:
- Persistent HUD elements (health, currency, stamina) stay in fixed screen-space corners, never world-space, never move during gameplay except for intentional damage-flash/pulse feedback.
- Currency display must always be visible from the shop screen and from the main gameplay HUD — never make players "remember" their balance between screens.
- Notification badges (new item, quest complete) use a consistent dot/number badge language across the entire app — don't invent a new indicator style per screen.

SHOP-SPECIFIC UI (ties to monetization-shop-design skill):
- Real-money purchases and soft-currency purchases must be VISUALLY DISTINCT (different button color/icon, e.g. gem icon for real money vs coin icon for soft currency) — conflating them is both a UX failure and a Google Play compliance risk (see google-play-compliance skill).
- Price must always be shown on the item card itself, never require a tap-through to see the price — this is both good UX and increasingly an enforced Play policy requirement.

WHEN DESIGNING A NEW SCREEN:
1. Sketch which of the 4 reference games' screens is closest to this one's function, and explicitly name it as the comparison point in your response.
2. State the touch-target sizes and safe-area handling you're using before writing layout code.
3. Flag if the new screen reuses an existing icon/badge language or invents a new one — invented-but-unnecessary UI patterns are a recurring quality bug across indie mobile games.
