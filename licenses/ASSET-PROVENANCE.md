# Asset provenance — Super Wiss Odyssey 3.0

## Included artwork

The three PNG boards in `art-source/` are the AI-generated **Super Wiss** concept
boards provided and approved in this conversation. The eight hero illustrations,
twelve enemy illustrations, seven companions, ten base power icons, gold W coin,
chests, campaign thumbnails and clean cosmic background were extracted from them.
The additional hopper enemy and several item icons are original recolored or
cropped adaptations. Rare-pet silhouette masks deliberately exclude the ability
labels and scenic backgrounds. `art-source/crops.json` and
`scripts/extract-art.py` document the extraction. The concept boards are retained
as source material, not presented as screenshots of functioning gameplay.

All 15 terrain atlases, the spinning coin strip, control-specific SVG additions,
launcher composition, procedural scenery, effects and sprite motion are created
for this project. The 27 OGG sound cues and five OGG music loops are original
synthesized compositions; `scripts/make-audio.py` contains their source.
No Nintendo character/sound/sprite assets or Minecraft textures were imported.
The referenced Spriters Resource collection could not be retrieved and its
redistribution permissions were not verified. It was not used as an asset source.
The user's earlier watermarked stock reference image is NOT in this archive.

The supplied hero/enemy/pet sprites are single detailed poses with procedural
movement. They are not complete hand-drawn frame-by-frame animation packs. The
loader and manifest support replacing them with true animated PNG sheets.

AI-generated artwork is not a guarantee of exclusive rights or trademark
clearance. Keep a record of any additional third-party asset permissions you use
when replacing the provided art or preparing a commercial release.

## Existing third-party UI icons

Selected SVG icons: Font Awesome Free 6.7.2, Fonticons, Inc., CC BY 4.0.
They are resized/recolored and embedded in `game/icons.js`. The complete retained
notice is `FONT-AWESOME.txt`. Added paw/water/crown/snowflake icons are original SVGs.
No font binaries are included.

## Tooling, not game assets

Apktool/AAPT2/smali are external build tools, not redistributed in this codebase.
The build's tool provenance is in `native/README.md`. The source archive contains
all game assets and source, but not Android Studio, the Android SDK, JDK, Gradle
distributions, Python packages, FFmpeg or the external Apktool JAR.
The QA certificate in `qa/` is deliberately public and must never be used as a
production signing identity.
