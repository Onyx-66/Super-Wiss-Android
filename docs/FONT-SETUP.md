> v1.4.1 UPDATE: ui-polish.css now overrides the display/body variables with a local Georgia/serif treatment (VT323 body only when already available). rasterizeHeadings() uses local Georgia/serif for its pixel-raster approximation. The older Pixelify/VT323 installer below is preserved, but running it alone does NOT change that explicit new heading renderer. No font binaries are included; the original target typeface is still unidentified.

# Font selection, wiring and honest default

Display/headline: **Pixelify Sans, weight 700**. Body: **VT323, weight 400**. These are chosen matches to the bold pixel-display / compact retro-body direction, not a claim of identifying the unknown exact font used in the generated mockups. The heading's cream-to-gold treatment is a CSS gradient, not built into the font.

Official specimen sources consulted: https://fonts.google.com/specimen/Pixelify+Sans and https://fonts.google.com/specimen/VT323 . These public font references, not GitHub/private project content, were the only outside design-source lookup used here.

**No font binary is included in the delivery**, including embedded copies. The default build declares local family names and falls back to Courier New / monospace; selected-font availability in the screenshot environment was false for both. Therefore Task 9 is partial on a normal Android device. The new hierarchy, colors, spacing, pixel image rendering and gradient are applied, but the glyph shapes are fallback shapes.

## Optional setup on your own development machine
```sh
python3 scripts/install-fonts.py
npm run build
```
The optional Python 3 installer requests CSS from fonts.googleapis.com, accepts font URLs only on fonts.gstatic.com, verifies WOFF2 magic, records source URLs and SHA-256, and writes the two named Latin subsets into assets/fonts/. It is not invoked by the normal build or game. Review and supply applicable font licenses before redistribution. The current selected subsets are Latin; additional language coverage and shaping need a separate decision for localization. No claim of offline testing of this network installer is made.

Once fonts are installed locally, bundle.mjs embeds them in the single-file HTML and copies them into Android web assets; no gameplay CDN connection is introduced. Recheck measured text layout and smallest-screen readability after installing the real typefaces.

## Exact touched source/output locations
| File | Purpose |
|---|---|
| game/atelier.css | @font-face local declarations, CSS variables, heading gradient/hierarchy and all menu text selectors |
| game/render.js | Canvas text family switched to VT323, monospace fallback |
| game/index.html | font-src self/data CSP and structural text wiring |
| scripts/install-fonts.py | Optional user-side installer (not executed) |
| scripts/bundle.mjs | Conditional embed/copy of user-installed WOFF2 files |
| package.json | fonts:install convenience command |
| assets/fonts/README.md | Missing font inputs and fallback disclosure |
| app/src/main/assets/style.css | Generated build counterpart; do not hand-edit |
| app/src/main/assets/game.js | Generated build counterpart; do not hand-edit |
| app/src/main/assets/game.html | Generated build counterpart; do not hand-edit |
| app/src/debug/assets/game.js | Generated build counterpart; do not hand-edit |
| dist/Super-Wiss-Odyssey.html | Generated build counterpart; do not hand-edit |

Skills: `pixel-art-page-layout-system/SKILL.md` Part C specifies kicker, cream/gold pixel headline and supporting subtext; `mobile-pixel-art-ui-ux/SKILL.md` requires small-screen legibility rather than merely shrinking desktop text.
