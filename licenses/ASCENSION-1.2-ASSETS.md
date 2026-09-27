# Super Wiss Ascension asset licenses — 1.2.0

Inspected 2026-09-25. `ai-generated-assets/` exists but contains no files, including hidden files. Nothing was imported from that empty folder. Existing project artwork was retained selectively through `assets/manifest.json`.

## Existing artwork and notices

- Super Wiss concept boards, cutouts, hero/enemy/pet sheets, recolored outfits and derived bosses: existing project-approved AI artwork, provenance retained in [licenses/ASSET-PROVENANCE.md](licenses/ASSET-PROVENANCE.md). This update does not independently assert copyright exclusivity or ownership beyond that supplied record.
- Quintino Pixels: Wasteland, Starry Night, and skill icons. Source links, attribution and licensing notes remain in [licenses/COMMUNITY-ASSETS.md](licenses/COMMUNITY-ASSETS.md). Retain its conservative attribution; do not assume all packs are CC0.
- Batareya: selected magical icons, with the original credit and AI-assistance disclosure in that same notice.
- Font Awesome Free: icons under CC BY 4.0; retained [licenses/FONT-AWESOME.txt](licenses/FONT-AWESOME.txt).
- No new externally sourced bitmap artwork was downloaded. Unidentified/unlicensed icon packs remain excluded.

## Additions in 1.2.0

Original project-generated procedural accessory overlays, biome indicators, stargate states and boss dissolution effects are code in `game/render.js` and `game/world-physics.js`.

Original synthesized menu and raid loops and room-admission cue are reproducible with `python scripts/make-ascension-audio.py`. They use mathematical oscillators, not sampled commercial recordings. Existing original synthesis sources remain in `scripts/make-audio.py` and `scripts/make-nightfall-audio.py`. No Mario or Hollow Knight audio/assets were added.

Runtime assets are selected by the manifest; the builder copies only those files into Android assets. Source boards, build tools and unrelated input files are not APK padding. Character sheets retain alpha transparency; accessory parts are procedural overlays rather than new independently rigged body-part artwork.
