---
name: pixel-art-page-layout-system
description: 'Complete pixel-art UI page-layout system: global shell (header, currency, nav), border/panel component, color palette, typography, and per-page-type layout rules, reverse-engineered from a reference fantasy-adventure game. Use for building any new screen/page in any 2D pixel-art game to maintain visual consistency.'
---

This skill defines a REUSABLE page-layout system, not a one-off theme. The reference game uses a "night sky adventure" skin (navy/gold/cyan, moon, castle); a different project can reskin the PALETTE and ICONOGRAPHY while keeping every STRUCTURAL rule below identical. When applying this skill to a new game, always separate "structure" (keep) from "reference theme" (swap per project).

=====================================================
PART A — GLOBAL SHELL (appears identically on every page)
=====================================================

BACKGROUND:
- Full-bleed painted pixel-art scene, NOT a flat color or simple gradient. Reference: night sky with scattered stars, a large soft-glowing moon positioned upper-center-right, a distant silhouetted castle/landmark on a cliff, atmospheric haze/cloud layers for depth.
- Background composition shifts slightly per page (different foreground elements — a character standing on a cliff for Home, an empty vista for menu-only pages) but the SAME color temperature, time-of-day, and landmark motif (the moon + castle) persists across every page — this is what makes 9 different screens read as one game rather than disconnected menus.
- Keep the background darker/lower-contrast in areas where UI panels will sit, so panels remain readable without needing a heavy scrim behind every single one.

TOP-LEFT: PLAYER IDENTITY CARD (persistent, identical position/size on every page):
- A bordered rounded-rect panel containing, left-to-right: a square portrait frame (player avatar, gold ornate border, ~1:1 aspect), then a text column with: player name (bold, white, largest text in the card), title/rank + level line beneath it (smaller, blue-gray, e.g. "Explorer Lv. 2"), then a horizontal progress bar (cyan fill on dark track, rounded ends) with a numeric fraction label to its right (current/max, e.g. "120 / 300").
- A small diamond/gem icon button sits at the top-right corner of this card (reference: opens a player-menu or notification popover) — always present, always the same icon shape, regardless of what it opens per-project.

TOP-RIGHT: CURRENCY & UTILITY ROW (persistent, identical position on every page):
- Ordered left to right: PRIMARY soft currency pill (icon + number + blue "+" button to open purchase/earn flow), SECONDARY currency or premium-track pill (icon + fraction e.g. "0/45" + blue "+" button), then two icon-only square utility buttons (social/friends icon, settings/gear icon).
- Every pill/button in this row uses the SAME ornate gold-bordered container component (see Part B) at the same height — never mix a plain flat button into this row, it breaks the shell's consistency instantly.
- The "+" buttons are visually distinct (bright blue, rounded-square, centered plus icon) from the currency icon beside them — this is the universal "tap to add/buy" affordance across the whole game; reuse this exact blue-plus-button shape anywhere else a purchase/add action appears (ties to monetization-shop-design skill's "distinct button for spend actions" rule).

BOTTOM: PERSISTENT NAVIGATION BAR (identical on every page, never hidden except in full-screen modals):
- A row of equal-width bordered rectangle tabs, each containing an icon (top) and a text label (bottom), for every top-level section of the game (reference has 9: Home, Worlds, Heroes, Pets, Shop, Missions, Records, Profile, Settings).
- INACTIVE tab state: muted blue-gray icon and text, dark navy fill, thin gold border.
- ACTIVE tab state: bright gold glowing border (a visible outer glow, not just a color change), gold-colored icon and text — the active tab must be unmistakable at a glance, not a subtle tint shift.
- Notification badge: a small red circle (with a "+" or number) anchored to the top-right corner of a tab's icon when that section has unclaimed/new content (reference: Missions tab badge). Never use more than one badge color (red) for this across the whole game — reserve red exclusively for "needs attention," so it isn't diluted by also using it for e.g. rarity or damage numbers elsewhere in the UI.
- Keep this bar fixed height and fixed position across every page — a nav bar that shifts height or position between screens (e.g. because one page has 8 tabs visible and another scrolls to reveal a 9th) reads as broken, not adaptive; if more sections exist than comfortably fit, prefer horizontal scroll within the bar over resizing tabs.

=====================================================
PART B — THE UNIVERSAL BORDER/PANEL COMPONENT
=====================================================

This single component is reused for EVERY container in the game — the header card, currency pills, page panels, item cards, buttons, popups, modals. Consistency here is what makes the whole UI feel hand-crafted rather than assembled from mismatched pieces.

CONSTRUCTION:
- Outer border: a metallic gold/bronze pixel-art frame, drawn as a 9-slice sprite (so it stretches cleanly to any panel size without distorting the corner detail) — never a simple solid-color CSS-style border; the border itself must have pixel-art bevel/highlight shading to read as "carved" or "forged," not flat.
- Corner accents: a small diamond/gem pixel-art ornament at each of the 4 corners, and often at edge midpoints — this is the single most identifying visual signature of the whole system; apply it to every panel size, from the tiny currency pill up to the largest full-screen panel.
- Fill: a dark, slightly transparent navy/blue-black, letting the background scene subtly show through at low opacity on large panels, while being fully opaque enough for text contrast on small/dense panels (like the leaderboard table rows).
- Selected/active state: the same panel gets a bright gold OUTER GLOW (not just a border color change) plus a brighter/thicker border — used for the currently-selected hero, world, tab, or variant across every page. This glow treatment must be pixel-consistent (same glow radius/color) wherever "this is the selected one" needs to be communicated.
- Locked/disabled state: desaturated/darker fill, a centered padlock icon, and muted/gray text (e.g. "Locked Companion — Rescue more pets on your journey") — always pair a lock icon with a short explanatory line telling the player HOW to unlock it, never a bare lock with no path forward.

BUTTON VARIANT OF THE SAME COMPONENT:
- Primary CTA buttons (reference: "Play this world," "Done") use the same gold-bordered panel shape but filled with a solid gold/amber gradient rather than dark navy, with bold dark text — reserve this treatment for the ONE primary action per screen; a screen with multiple gold-filled buttons competing for attention dilutes the "this is the important button" signal.
- Secondary buttons keep the dark navy fill with gold border/text (reference: "How to play," "About & credits") — visually clearly subordinate to the primary CTA.

=====================================================
PART C — TYPOGRAPHY & COLOR SYSTEM
=====================================================

TYPOGRAPHY HIERARCHY (apply identically on every page):
1. Eyebrow/kicker line: small, all-caps, letter-spaced, muted blue — sits directly above the headline (reference: "MAKE EVERY RUN COUNT," "TEN HEROES. TWENTY SIGNATURE SKILLS.").
2. Page headline: large, bold, pixel-art display font, cream-to-gold gradient fill, max 2 lines (reference: "Little goals. Legendary rewards.", "Find your super.") — every single page in the game has exactly this kicker+headline pair near the top-left of its content area; a page missing this pair will feel structurally inconsistent with the rest of the app even if everything else matches.
3. Supporting subtext: one line, regular weight, soft blue-gray, directly under the headline, explaining the page's purpose in plain language (reference: "Progress through missions and claim your rewards.").
4. Body/UI text: white or light cream for primary content (item names, values), blue-gray for secondary/muted content (descriptions, timestamps, locked states).

COLOR PALETTE (reference values — reskin for a different project, keep the ROLES):
- Background base: deep navy (#0A1128 – #16213E range).
- Panel fill: darker navy-black, ~85-95% opacity (#0D1B2A range).
- Border/frame: warm gold/bronze (#D4AF37 active, #8A6D3B muted/inactive).
- Primary accent (progress bars, info highlights, "+": bright cyan-blue (#3EC6FF range).
- Success/claimed: green checkmark (#4ADE80 range).
- Alert/notification badge: red (#E53935 range) — reserved exclusively for "needs attention," never reused decoratively.
- Headline gradient: cream (#F5EFD8) to gold (#E0A835).
EVERY new project using this skill should define its own equivalent 6-role palette (background/panel/border/accent/success/alert) rather than reusing these exact hex values — the ROLES are the reusable part, not the literal colors, so a different game's theme (e.g. a jungle or cyberpunk setting) swaps the palette while keeping identical role assignments.

=====================================================
PART D — PER-PAGE-TYPE LAYOUT RULES
=====================================================

HOME / MAIN MENU:
- Left column: game logo lockup (stylized, can incorporate a pixel-art icon replacing a letter for brand personality — reference replaces the "O" with a star), one-line tagline beneath it, then 3 stacked stat-highlight rows (icon + number + label, e.g. "15 Worlds — Vast lands to explore") giving the player an at-a-glance sense of game scope.
- Center: the player's current/last-used hero rendered as a full pixel-art character standing on an environmental platform (a cliff edge, matching the background), with a floating name/title tag above the character and a short flavor caption beneath.
- Right column: a stack of MODE CARDS — large rectangular panels each with its own background thumbnail art, bold title, one-line subtitle, and an implied tap/chevron affordance. Vary card size by importance: the primary mode (reference: "Adventure") gets the largest card; secondary modes (Raid, Endless Run) can pair up side-by-side at half-width; a daily/rotating mode (Daily Challenge) gets a full-width banner at the bottom to signal "check this every day."

WORLD/LEVEL SELECT:
- Left: a grid of level-thumbnail cards, GROUPED under chapter/region header labels with a divider line (reference: "01 / THE WILD FRONTIERS"), each thumbnail a small painted landscape matching that level's theme, with a lock icon overlay for unearned levels and a star-rating row beneath unlocked ones.
- Right: a detail panel for whichever level is currently selected in the grid — larger banner art, level number/name, a metadata line (sector count, tile count, or equivalent scope indicator), a difficulty-pip row with a text label (e.g. "Relaxed"), a short flavor-text description, and the single primary gold CTA button ("Play this world") anchored at the bottom of this panel.

CHARACTER/HERO SELECT:
- Left: a grid of character portrait cards (small square art + a small class/role icon badge in the corner + name label beneath) — the class-icon badge is important: it lets a player scanning a large roster identify a character's ROLE before reading any name, critical for mobile screens where full stat comparison isn't feasible at a glance.
- Right: a detail panel for the selected character — larger splash art, name + title/epithet, an italicized flavor quote (short, under 10 words per the character-narrative-skills-pets skill's mobile text-length rule), then 1-2 ability cards each showing icon, ability name, one-line effect description, and a stat row (cooldown, mastery level, usage count) — end with a "View [X] Details" link/button for players who want to go deeper, keeping this screen itself scannable.

COMPANION/PET SELECT:
- Same left-grid/right-detail structure as character select, but grid cards additionally show a RARITY TAG at the top (reference: "SUPER") and a compact stat line under the name (active-duration + uses-per-run) so players can compare utility without opening the detail panel.
- Locked slots use the same lock+explanation treatment from Part B, shown inline in the same grid rather than hidden — seeing "3 more companions exist, here's how to get them" is a soft progression/monetization hook (ties to character-narrative-skills-pets and retention-liveops-calendar skills) that a simply-shorter grid would waste.
- A small summary counter (e.g. "7 companions · 2 forge fusions") anchored top-right of the content area gives collection-progress framing without needing a separate stats page.

BOSS/CHALLENGE SELECT:
- A difficulty-tier selector (pill-tab group, e.g. Veteran/Nightmare/Inferno) anchored top-right of the content header — switching tiers should re-filter the same card row rather than navigating to a different page.
- A horizontally-scrollable row of boss cards (not a grid) — appropriate specifically for a linear progression of a small number of "trial" encounters; each card shows a rank/crown icon, large boss art, origin-world tag, boss name, a set of small pill tags describing its attack repertoire (ties to combat-system skill's shared attack-verb taxonomy), and a clear-status line ("NO CLEAR YET" / a completion time once cleared).

LEADERBOARD / RECORDS:
- A filter row at the top: 2-4 dropdown selectors (mode, difficulty, loadout/category) as bordered boxes with icon+label+chevron — always show CURRENT filter state directly in the closed dropdown, never require opening it to see what's active.
- Below: a two-panel split — a smaller left panel explaining the ranking RULES in plain text (critical for a score-based leaderboard; players distrust rankings they don't understand), and a larger right panel with the ranked table itself.
- Table rows: rank column uses medal icons for top 3 (gold/silver/bronze) and plain numbers beyond that; the player's OWN row gets a distinct highlighted border/glow plus an explicit tag (reference: "On this device") — always make it trivial for the player to find themselves in a long list at a glance.

PROFILE:
- Two-column split: left column is an identity showcase (large character portrait matching equipped appearance, name, a short status/flavor tag, an italicized personal quote, and an editable display-name field with a pencil-icon edit affordance) — right column is a stats/progress summary panel (a small grid of icon+label+value rows for key lifetime stats) plus a separate achievements panel showing badge slots (locked ones shown as silhouette+padlock, matching Part B's locked-state rule).

SHOP (COSMETIC-FOCUSED — ties directly to monetization-shop-design skill):
- Tab selector for shop sub-categories (reference: Wardrobe / Skills / Fusion) anchored top-right.
- Left: a large preview panel showing the currently-equipped/selected item on the character, with descriptive flavor text.
- Right: a hero/category dropdown selector, then a grid of purchasable/ownable variant cards — each card shows art thumbnail, name, and EITHER a price pill (currency icon + amount) or a green "Equipped"/owned checkmark state.
- CRITICAL COMPLIANCE/TRUST PATTERN — replicate this exactly: an explicit disclosure line near the top of any cosmetic shop stating there is no gameplay advantage (reference: "Colors only; no combat advantage" / kicker "No cash shop. Every coin earned."). This single sentence does real work — it's a trust signal to players AND it pre-empts "pay to win" review complaints AND it supports the fairness-tier framework in monetization-shop-design. Never omit an equivalent line from any cosmetic-only shop screen.

MISSIONS/QUESTS:
- A grid of quest cards (reference: 3-column, 2-row), each with: a square illustrated thumbnail relevant to the quest's theme (not a generic icon — reference uses a unique painted scene per quest, which reads as far more premium than a stock icon set), title, one-line description, a progress bar with numeric fraction, and a reward area that shows EITHER an unclaimed reward pill (currency icon + amount, tappable) OR a green "Claimed" checkmark state once collected.
- A tab/toggle near the top switching between quest categories (reference: "Journey" vs "Daily") if the game has both a long-term and a rotating/daily quest track (ties to retention-liveops-calendar skill's daily-cadence system).

SETTINGS (MODAL, not a full nav-bar page):
- Rendered as a centered overlay panel (using the same Part B border component, just larger) with the background/nav bar visibly dimmed but present behind it — always give this modal a clear X close button top-right, distinct from any in-panel "Done" button, so both an eager-exit and a deliberate-confirm path exist.
- Same kicker+headline+subtext header pattern as every other page (keeps it feeling like part of the same app, not a bolted-on system dialog).
- Setting ROWS organized in a multi-column grid (reference: 3 columns), each row = icon + label + control (dropdown, toggle, or slider) — group related settings into visual columns (e.g. one column for controls/input, one for game/difficulty options, one for audio) rather than one long undifferentiated list.
- Toggles use a distinct pill-switch component (blue-filled circle-on-track for "On") separate from dropdowns (chevron-arrow boxes) — never conflate the two control types visually.
- Sliders (volume controls) show the live numeric percentage next to the slider track, not hidden until dragged.
- End with a secondary-button row (reference: "How to play," "About & credits") plus the single primary gold "Done" CTA — this mirrors the Part B primary/secondary button hierarchy rule even inside a modal.

=====================================================
PART E — APPLYING THIS TO A NEW PROJECT
=====================================================
When starting a new 2D pixel-art game's UI, follow this exact sequence:
1. Define the project's own 6-role color palette (background/panel/border/accent/success/alert) — do not reuse navy/gold literally unless the new game's setting actually calls for a "night fantasy" theme.
2. Build the Part B border/panel component FIRST, as a reusable 9-slice asset, before building any individual page — every other page depends on this one component existing and being correct.
3. Build the Part A global shell (identity card, currency row, nav bar) second, and lock its position/sizing across all pages before building page-specific content.
4. Only then build individual pages, applying the Part D per-page-type rules and always including the kicker+headline+subtext header pattern from Part C.
5. Any new page type not covered above should still follow: (a) the same header pattern, (b) the same left-grid/right-detail split where a "browse then inspect" interaction applies, and (c) the same locked/selected/CTA visual states from Part B — don't invent new visual states without first checking whether an existing one already covers the need.
