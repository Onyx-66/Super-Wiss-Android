# Verbatim OLD / NEW source changes

This is evidence for the already-edited full project, not instructions to apply a patch. Baseline: local Super-Wiss-1.3.1-Source-Candidate.zip. Each replacement/insertion/deletion block below contains the exact old and new lines; unchanged context is omitted. A new file has an empty OLD section. Line ranges refer to each side of the comparison. Full generated output/doc text differences are in CHANGES.diff; binary images have exact paths/checksums in CHANGE-INDEX.json and provenance manifests.

## `assets/fonts/README.md`

Tasks: Supporting local delivery. OLD SHA-256: `NEW FILE`. NEW SHA-256: `0e66581e170a617a8b75f3a79ba1432f90a71c73da0ab0b7e275e92175fd71c9`.

### insert: OLD 1–0; NEW 1–12

OLD
````text
````

NEW
````text
# Optional pixel font inputs

No font binaries are included in this delivery. The game makes no font/CDN requests.
The UI declares **Pixelify Sans, weight 700** for headings and **VT323, weight 400** for body copy.
Until those families are installed/packaged, the explicit fallback is Courier New / monospace.
This means the shipped default has the new typography hierarchy and gradient, but not the exact
selected font shapes on a stock Android device.

On your development machine, `python scripts/install-fonts.py` fetches the selected Latin WOFF2
subsets from Google Fonts; review their licenses before redistribution. Then `npm run build`
embeds them in the single HTML preview and copies them into Android assets. This optional command
is not run by the normal build. See `docs/FONT-SETUP.md`.
````

## `assets/manifest.json`

Tasks: 0,1,2,3,4. OLD SHA-256: `7400340184c1ff242b37b0c7cc00ba0c0fd9bc6c6b8abd63752cffb22fdfca0d`. NEW SHA-256: `e677a97aa71cc4ffdbc3f6c3984b47cb1cfb04cccc9670951620837a53b86651`.

### replace: OLD 9–9; NEW 9–126

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "separate",
      "weaponLayerAudit": "All 14 frames: bare costume gloves/bracers, no held weapon. Palette variants have identical alpha masks.",
      "weaponSockets": {
        "0": [
          18.141,
          -24.2
        ],
        "1": [
          18.562,
          -23.35
        ],
        "2": [
          18.562,
          -23.35
        ],
        "3": [
          17.719,
          -22.925
        ],
        "4": [
          16.875,
          -23.35
        ],
        "5": [
          18.141,
          -23.35
        ],
        "6": [
          19.828,
          -24.2
        ],
        "7": [
          19.828,
          -24.2
        ],
        "8": [
          18.562,
          -24.625
        ],
        "9": [
          17.297,
          -23.775
        ],
        "10": [
          18.141,
          -24.2
        ],
        "11": [
          21.938,
          -26.75
        ],
        "12": [
          22.359,
          -29.725
        ],
        "13": [
          18.141,
          -23.35
        ],
        "offhand": {
          "0": [
            -14.344,
            -26.325
          ],
          "1": [
            -13.922,
            -25.475
          ],
          "2": [
            -13.078,
            -25.475
          ],
          "3": [
            -15.188,
            -26.75
          ],
          "4": [
            -16.453,
            -28.875
          ],
          "5": [
            -15.609,
            -28.025
          ],
          "6": [
            -18.984,
            -23.35
          ],
          "7": [
            -18.562,
            -23.775
          ],
          "8": [
            -14.344,
            -24.2
          ],
          "9": [
            -13.5,
            -28.025
          ],
          "10": [
            -13.922,
            -27.175
          ],
          "11": [
            -18.141,
            -29.3
          ],
          "12": [
            -19.828,
            -33.55
          ],
          "13": [
            -12.656,
            -24.625
          ]
        }
      }
````

### replace: OLD 17–17; NEW 134–135

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Twin blades baked in both hands."
````

### replace: OLD 25–25; NEW 143–144

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Glowing crescent staff baked in."
````

### replace: OLD 33–33; NEW 152–153

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Knives baked in."
````

### replace: OLD 41–41; NEW 161–162

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Shield and weapon haft baked in; does not visually match new hammer."
````

### replace: OLD 49–49; NEW 170–171

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Scimitar baked in."
````

### replace: OLD 57–57; NEW 179–180

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Powered gauntlet/gadget silhouette baked in."
````

### replace: OLD 65–65; NEW 188–189

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Bow and arrow baked in."
````

### replace: OLD 458–458; NEW 582–700

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "separate",
      "weaponLayerAudit": "All 14 frames: bare costume gloves/bracers, no held weapon. Palette variants have identical alpha masks.",
      "weaponSockets": {
        "0": [
          18.141,
          -24.2
        ],
        "1": [
          18.562,
          -23.35
        ],
        "2": [
          18.562,
          -23.35
        ],
        "3": [
          17.719,
          -22.925
        ],
        "4": [
          16.875,
          -23.35
        ],
        "5": [
          18.141,
          -23.35
        ],
        "6": [
          19.828,
          -24.2
        ],
        "7": [
          19.828,
          -24.2
        ],
        "8": [
          18.562,
          -24.625
        ],
        "9": [
          17.297,
          -23.775
        ],
        "10": [
          18.141,
          -24.2
        ],
        "11": [
          21.938,
          -26.75
        ],
        "12": [
          22.359,
          -29.725
        ],
        "13": [
          18.141,
          -23.35
        ],
        "offhand": {
          "0": [
            -14.344,
            -26.325
          ],
          "1": [
            -13.922,
            -25.475
          ],
          "2": [
            -13.078,
            -25.475
          ],
          "3": [
            -15.188,
            -26.75
          ],
          "4": [
            -16.453,
            -28.875
          ],
          "5": [
            -15.609,
            -28.025
          ],
          "6": [
            -18.984,
            -23.35
          ],
          "7": [
            -18.562,
            -23.775
          ],
          "8": [
            -14.344,
            -24.2
          ],
          "9": [
            -13.5,
            -28.025
          ],
          "10": [
            -13.922,
            -27.175
          ],
          "11": [
            -18.141,
            -29.3
          ],
          "12": [
            -19.828,
            -33.55
          ],
          "13": [
            -12.656,
            -24.625
          ]
        }
      }
````

### replace: OLD 464–464; NEW 706–708

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Twin blades baked in both hands."
````

### replace: OLD 470–470; NEW 714–716

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Glowing crescent staff baked in."
````

### replace: OLD 476–476; NEW 722–724

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Knives baked in."
````

### replace: OLD 482–482; NEW 730–732

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Shield and weapon haft baked in; does not visually match new hammer."
````

### replace: OLD 488–488; NEW 738–740

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Scimitar baked in."
````

### replace: OLD 494–494; NEW 746–748

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Powered gauntlet/gadget silhouette baked in."
````

### replace: OLD 500–500; NEW 754–756

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Bow and arrow baked in."
````

### replace: OLD 1078–1078; NEW 1334–1335

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Recolored shield-knight sheet; shield baked in, not the new lance."
````

### replace: OLD 1084–1084; NEW 1341–1343

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Recolored shield-knight sheet; shield baked in, not the new lance."
````

### replace: OLD 1092–1092; NEW 1351–1352

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Recolored staff caster; staff baked in."
````

### replace: OLD 1098–1098; NEW 1358–1360

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Recolored staff caster; staff baked in."
````

### replace: OLD 1106–1106; NEW 1368–1485

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "separate",
      "weaponLayerAudit": "All 14 frames: bare costume gloves/bracers, no held weapon. Palette variants have identical alpha masks.",
      "weaponSockets": {
        "0": [
          18.141,
          -24.2
        ],
        "1": [
          18.562,
          -23.35
        ],
        "2": [
          18.562,
          -23.35
        ],
        "3": [
          17.719,
          -22.925
        ],
        "4": [
          16.875,
          -23.35
        ],
        "5": [
          18.141,
          -23.35
        ],
        "6": [
          19.828,
          -24.2
        ],
        "7": [
          19.828,
          -24.2
        ],
        "8": [
          18.562,
          -24.625
        ],
        "9": [
          17.297,
          -23.775
        ],
        "10": [
          18.141,
          -24.2
        ],
        "11": [
          21.938,
          -26.75
        ],
        "12": [
          22.359,
          -29.725
        ],
        "13": [
          18.141,
          -23.35
        ],
        "offhand": {
          "0": [
            -14.344,
            -26.325
          ],
          "1": [
            -13.922,
            -25.475
          ],
          "2": [
            -13.078,
            -25.475
          ],
          "3": [
            -15.188,
            -26.75
          ],
          "4": [
            -16.453,
            -28.875
          ],
          "5": [
            -15.609,
            -28.025
          ],
          "6": [
            -18.984,
            -23.35
          ],
          "7": [
            -18.562,
            -23.775
          ],
          "8": [
            -14.344,
            -24.2
          ],
          "9": [
            -13.5,
            -28.025
          ],
          "10": [
            -13.922,
            -27.175
          ],
          "11": [
            -18.141,
            -29.3
          ],
          "12": [
            -19.828,
            -33.55
          ],
          "13": [
            -12.656,
            -24.625
          ]
        }
      }
````

### replace: OLD 1112–1112; NEW 1491–1609

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "separate",
      "weaponLayerAudit": "All 14 frames: bare costume gloves/bracers, no held weapon. Palette variants have identical alpha masks.",
      "weaponSockets": {
        "0": [
          18.141,
          -24.2
        ],
        "1": [
          18.562,
          -23.35
        ],
        "2": [
          18.562,
          -23.35
        ],
        "3": [
          17.719,
          -22.925
        ],
        "4": [
          16.875,
          -23.35
        ],
        "5": [
          18.141,
          -23.35
        ],
        "6": [
          19.828,
          -24.2
        ],
        "7": [
          19.828,
          -24.2
        ],
        "8": [
          18.562,
          -24.625
        ],
        "9": [
          17.297,
          -23.775
        ],
        "10": [
          18.141,
          -24.2
        ],
        "11": [
          21.938,
          -26.75
        ],
        "12": [
          22.359,
          -29.725
        ],
        "13": [
          18.141,
          -23.35
        ],
        "offhand": {
          "0": [
            -14.344,
            -26.325
          ],
          "1": [
            -13.922,
            -25.475
          ],
          "2": [
            -13.078,
            -25.475
          ],
          "3": [
            -15.188,
            -26.75
          ],
          "4": [
            -16.453,
            -28.875
          ],
          "5": [
            -15.609,
            -28.025
          ],
          "6": [
            -18.984,
            -23.35
          ],
          "7": [
            -18.562,
            -23.775
          ],
          "8": [
            -14.344,
            -24.2
          ],
          "9": [
            -13.5,
            -28.025
          ],
          "10": [
            -13.922,
            -27.175
          ],
          "11": [
            -18.141,
            -29.3
          ],
          "12": [
            -19.828,
            -33.55
          ],
          "13": [
            -12.656,
            -24.625
          ]
        }
      }
````

### replace: OLD 1120–1120; NEW 1617–1734

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "separate",
      "weaponLayerAudit": "All 14 frames: bare costume gloves/bracers, no held weapon. Palette variants have identical alpha masks.",
      "weaponSockets": {
        "0": [
          18.141,
          -24.2
        ],
        "1": [
          18.562,
          -23.35
        ],
        "2": [
          18.562,
          -23.35
        ],
        "3": [
          17.719,
          -22.925
        ],
        "4": [
          16.875,
          -23.35
        ],
        "5": [
          18.141,
          -23.35
        ],
        "6": [
          19.828,
          -24.2
        ],
        "7": [
          19.828,
          -24.2
        ],
        "8": [
          18.562,
          -24.625
        ],
        "9": [
          17.297,
          -23.775
        ],
        "10": [
          18.141,
          -24.2
        ],
        "11": [
          21.938,
          -26.75
        ],
        "12": [
          22.359,
          -29.725
        ],
        "13": [
          18.141,
          -23.35
        ],
        "offhand": {
          "0": [
            -14.344,
            -26.325
          ],
          "1": [
            -13.922,
            -25.475
          ],
          "2": [
            -13.078,
            -25.475
          ],
          "3": [
            -15.188,
            -26.75
          ],
          "4": [
            -16.453,
            -28.875
          ],
          "5": [
            -15.609,
            -28.025
          ],
          "6": [
            -18.984,
            -23.35
          ],
          "7": [
            -18.562,
            -23.775
          ],
          "8": [
            -14.344,
            -24.2
          ],
          "9": [
            -13.5,
            -28.025
          ],
          "10": [
            -13.922,
            -27.175
          ],
          "11": [
            -18.141,
            -29.3
          ],
          "12": [
            -19.828,
            -33.55
          ],
          "13": [
            -12.656,
            -24.625
          ]
        }
      }
````

### replace: OLD 1126–1126; NEW 1740–1858

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "separate",
      "weaponLayerAudit": "All 14 frames: bare costume gloves/bracers, no held weapon. Palette variants have identical alpha masks.",
      "weaponSockets": {
        "0": [
          18.141,
          -24.2
        ],
        "1": [
          18.562,
          -23.35
        ],
        "2": [
          18.562,
          -23.35
        ],
        "3": [
          17.719,
          -22.925
        ],
        "4": [
          16.875,
          -23.35
        ],
        "5": [
          18.141,
          -23.35
        ],
        "6": [
          19.828,
          -24.2
        ],
        "7": [
          19.828,
          -24.2
        ],
        "8": [
          18.562,
          -24.625
        ],
        "9": [
          17.297,
          -23.775
        ],
        "10": [
          18.141,
          -24.2
        ],
        "11": [
          21.938,
          -26.75
        ],
        "12": [
          22.359,
          -29.725
        ],
        "13": [
          18.141,
          -23.35
        ],
        "offhand": {
          "0": [
            -14.344,
            -26.325
          ],
          "1": [
            -13.922,
            -25.475
          ],
          "2": [
            -13.078,
            -25.475
          ],
          "3": [
            -15.188,
            -26.75
          ],
          "4": [
            -16.453,
            -28.875
          ],
          "5": [
            -15.609,
            -28.025
          ],
          "6": [
            -18.984,
            -23.35
          ],
          "7": [
            -18.562,
            -23.775
          ],
          "8": [
            -14.344,
            -24.2
          ],
          "9": [
            -13.5,
            -28.025
          ],
          "10": [
            -13.922,
            -27.175
          ],
          "11": [
            -18.141,
            -29.3
          ],
          "12": [
            -19.828,
            -33.55
          ],
          "13": [
            -12.656,
            -24.625
          ]
        }
      }
````

### replace: OLD 1134–1134; NEW 1866–1867

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Twin blades baked in both hands."
````

### replace: OLD 1140–1140; NEW 1873–1875

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Twin blades baked in both hands."
````

### replace: OLD 1148–1148; NEW 1883–1884

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Twin blades baked in both hands."
````

### replace: OLD 1154–1154; NEW 1890–1892

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Twin blades baked in both hands."
````

### replace: OLD 1162–1162; NEW 1900–1901

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Glowing crescent staff baked in."
````

### replace: OLD 1168–1168; NEW 1907–1909

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Glowing crescent staff baked in."
````

### replace: OLD 1176–1176; NEW 1917–1918

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Glowing crescent staff baked in."
````

### replace: OLD 1182–1182; NEW 1924–1926

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Glowing crescent staff baked in."
````

### replace: OLD 1190–1190; NEW 1934–1935

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Knives baked in."
````

### replace: OLD 1196–1196; NEW 1941–1943

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Knives baked in."
````

### replace: OLD 1204–1204; NEW 1951–1952

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Knives baked in."
````

### replace: OLD 1210–1210; NEW 1958–1960

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Knives baked in."
````

### replace: OLD 1218–1218; NEW 1968–1969

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Shield and weapon haft baked in; does not visually match new hammer."
````

### replace: OLD 1224–1224; NEW 1975–1977

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Shield and weapon haft baked in; does not visually match new hammer."
````

### replace: OLD 1232–1232; NEW 1985–1986

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Shield and weapon haft baked in; does not visually match new hammer."
````

### replace: OLD 1238–1238; NEW 1992–1994

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Shield and weapon haft baked in; does not visually match new hammer."
````

### replace: OLD 1246–1246; NEW 2002–2003

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Scimitar baked in."
````

### replace: OLD 1252–1252; NEW 2009–2011

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Scimitar baked in."
````

### replace: OLD 1260–1260; NEW 2019–2020

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Scimitar baked in."
````

### replace: OLD 1266–1266; NEW 2026–2028

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Scimitar baked in."
````

### replace: OLD 1274–1274; NEW 2036–2037

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Powered gauntlet/gadget silhouette baked in."
````

### replace: OLD 1280–1280; NEW 2043–2045

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Powered gauntlet/gadget silhouette baked in."
````

### replace: OLD 1288–1288; NEW 2053–2054

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Powered gauntlet/gadget silhouette baked in."
````

### replace: OLD 1294–1294; NEW 2060–2062

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Powered gauntlet/gadget silhouette baked in."
````

### replace: OLD 1302–1302; NEW 2070–2071

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Bow and arrow baked in."
````

### replace: OLD 1308–1308; NEW 2077–2079

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Bow and arrow baked in."
````

### replace: OLD 1316–1316; NEW 2087–2088

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Bow and arrow baked in."
````

### replace: OLD 1322–1322; NEW 2094–2096

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Bow and arrow baked in."
````

### replace: OLD 1330–1330; NEW 2104–2105

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Recolored shield-knight sheet; shield baked in, not the new lance."
````

### replace: OLD 1336–1336; NEW 2111–2113

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Recolored shield-knight sheet; shield baked in, not the new lance."
````

### replace: OLD 1344–1344; NEW 2121–2122

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Recolored shield-knight sheet; shield baked in, not the new lance."
````

### replace: OLD 1350–1350; NEW 2128–2130

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Recolored shield-knight sheet; shield baked in, not the new lance."
````

### replace: OLD 1358–1358; NEW 2138–2139

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Recolored staff caster; staff baked in."
````

### replace: OLD 1364–1364; NEW 2145–2147

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Recolored staff caster; staff baked in."
````

### replace: OLD 1372–1372; NEW 2155–2156

OLD
````text
      "weaponLayer": "baked"
````

NEW
````text
      "weaponLayer": "baked",
      "weaponLayerAudit": "Recolored staff caster; staff baked in."
````

### replace: OLD 1378–1378; NEW 2162–2164

OLD
````text
      "frames": 1
````

NEW
````text
      "frames": 1,
      "weaponLayer": "baked",
      "weaponLayerAudit": "Recolored staff caster; staff baked in."
````

### replace: OLD 1408–1409; NEW 2194–2195

OLD
````text
      "frameWidth": 256,
      "frameHeight": 256,
````

NEW
````text
      "frameWidth": 1254,
      "frameHeight": 1254,
````

### replace: OLD 1411–1412; NEW 2197–2198

OLD
````text
      "optional": true,
      "status": "awaiting-user-art"
````

NEW
````text
      "optional": false,
      "status": "ready"
````

### replace: OLD 1416–1417; NEW 2202–2203

OLD
````text
      "frameWidth": 256,
      "frameHeight": 256,
````

NEW
````text
      "frameWidth": 1254,
      "frameHeight": 1254,
````

### replace: OLD 1419–1420; NEW 2205–2206

OLD
````text
      "optional": true,
      "status": "awaiting-user-art"
````

NEW
````text
      "optional": false,
      "status": "ready"
````

### replace: OLD 1424–1425; NEW 2210–2211

OLD
````text
      "frameWidth": 256,
      "frameHeight": 256,
````

NEW
````text
      "frameWidth": 1254,
      "frameHeight": 1254,
````

### replace: OLD 1427–1428; NEW 2213–2214

OLD
````text
      "optional": true,
      "status": "awaiting-user-art"
````

NEW
````text
      "optional": false,
      "status": "ready"
````

### replace: OLD 1432–1433; NEW 2218–2219

OLD
````text
      "frameWidth": 256,
      "frameHeight": 256,
````

NEW
````text
      "frameWidth": 1254,
      "frameHeight": 1254,
````

### replace: OLD 1435–1436; NEW 2221–2222

OLD
````text
      "optional": true,
      "status": "awaiting-user-art"
````

NEW
````text
      "optional": false,
      "status": "ready"
````

### replace: OLD 1440–1441; NEW 2226–2227

OLD
````text
      "frameWidth": 256,
      "frameHeight": 256,
````

NEW
````text
      "frameWidth": 1254,
      "frameHeight": 1254,
````

### replace: OLD 1443–1444; NEW 2229–2230

OLD
````text
      "optional": true,
      "status": "awaiting-user-art"
````

NEW
````text
      "optional": false,
      "status": "ready"
````

### replace: OLD 1448–1449; NEW 2234–2235

OLD
````text
      "frameWidth": 256,
      "frameHeight": 256,
````

NEW
````text
      "frameWidth": 1254,
      "frameHeight": 1254,
````

### replace: OLD 1451–1452; NEW 2237–2238

OLD
````text
      "optional": true,
      "status": "awaiting-user-art"
````

NEW
````text
      "optional": false,
      "status": "ready"
````

### replace: OLD 1456–1457; NEW 2242–2243

OLD
````text
      "frameWidth": 256,
      "frameHeight": 256,
````

NEW
````text
      "frameWidth": 1254,
      "frameHeight": 1254,
````

### replace: OLD 1459–1460; NEW 2245–2246

OLD
````text
      "optional": true,
      "status": "awaiting-user-art"
````

NEW
````text
      "optional": false,
      "status": "ready"
````

### replace: OLD 1464–1465; NEW 2250–2251

OLD
````text
      "frameWidth": 256,
      "frameHeight": 256,
````

NEW
````text
      "frameWidth": 1254,
      "frameHeight": 1254,
````

### replace: OLD 1467–1468; NEW 2253–2254

OLD
````text
      "optional": true,
      "status": "awaiting-user-art"
````

NEW
````text
      "optional": false,
      "status": "ready"
````

### replace: OLD 1472–1473; NEW 2258–2259

OLD
````text
      "frameWidth": 256,
      "frameHeight": 256,
````

NEW
````text
      "frameWidth": 1254,
      "frameHeight": 1254,
````

### replace: OLD 1475–1476; NEW 2261–2262

OLD
````text
      "optional": true,
      "status": "awaiting-user-art"
````

NEW
````text
      "optional": false,
      "status": "ready"
````

### replace: OLD 1480–1481; NEW 2266–2267

OLD
````text
      "frameWidth": 256,
      "frameHeight": 256,
````

NEW
````text
      "frameWidth": 1254,
      "frameHeight": 1254,
````

### replace: OLD 1483–1484; NEW 2269–2270

OLD
````text
      "optional": true,
      "status": "awaiting-user-art"
````

NEW
````text
      "optional": false,
      "status": "ready"
````

### insert: OLD 1490–1489; NEW 2276–2779

OLD
````text
````

NEW
````text
      "frames": 1
    },
    "ui/icons/coin": {
      "path": "assets/ui/icons/coin.png",
      "frameWidth": 86,
      "frameHeight": 89,
      "frames": 1
    },
    "ui/icons/star": {
      "path": "assets/ui/icons/star.png",
      "frameWidth": 96,
      "frameHeight": 95,
      "frames": 1
    },
    "ui/icons/plus": {
      "path": "assets/ui/icons/plus.png",
      "frameWidth": 83,
      "frameHeight": 82,
      "frames": 1
    },
    "ui/icons/friends": {
      "path": "assets/ui/icons/friends.png",
      "frameWidth": 93,
      "frameHeight": 82,
      "frames": 1
    },
    "ui/icons/settings": {
      "path": "assets/ui/icons/settings.png",
      "frameWidth": 97,
      "frameHeight": 98,
      "frames": 1
    },
    "ui/icons/close": {
      "path": "assets/ui/icons/close.png",
      "frameWidth": 84,
      "frameHeight": 84,
      "frames": 1
    },
    "ui/icons/edit": {
      "path": "assets/ui/icons/edit.png",
      "frameWidth": 86,
      "frameHeight": 85,
      "frames": 1
    },
    "ui/icons/help": {
      "path": "assets/ui/icons/help.png",
      "frameWidth": 85,
      "frameHeight": 85,
      "frames": 1
    },
    "ui/icons/info": {
      "path": "assets/ui/icons/info.png",
      "frameWidth": 85,
      "frameHeight": 85,
      "frames": 1
    },
    "ui/icons/check": {
      "path": "assets/ui/icons/check.png",
      "frameWidth": 108,
      "frameHeight": 87,
      "frames": 1
    },
    "ui/icons/lock": {
      "path": "assets/ui/icons/lock.png",
      "frameWidth": 78,
      "frameHeight": 95,
      "frames": 1
    },
    "ui/icons/online": {
      "path": "assets/ui/icons/online.png",
      "frameWidth": 76,
      "frameHeight": 76,
      "frames": 1
    },
    "ui/icons/clock": {
      "path": "assets/ui/icons/clock.png",
      "frameWidth": 91,
      "frameHeight": 91,
      "frames": 1
    },
    "ui/icons/daily": {
      "path": "assets/ui/icons/daily.png",
      "frameWidth": 79,
      "frameHeight": 87,
      "frames": 1
    },
    "ui/icons/home": {
      "path": "assets/ui/icons/home.png",
      "frameWidth": 87,
      "frameHeight": 85,
      "frames": 1
    },
    "ui/icons/worlds": {
      "path": "assets/ui/icons/worlds.png",
      "frameWidth": 99,
      "frameHeight": 101,
      "frames": 1
    },
    "ui/icons/heroes": {
      "path": "assets/ui/icons/heroes.png",
      "frameWidth": 94,
      "frameHeight": 99,
      "frames": 1
    },
    "ui/icons/pets": {
      "path": "assets/ui/icons/pets.png",
      "frameWidth": 101,
      "frameHeight": 89,
      "frames": 1
    },
    "ui/icons/shop": {
      "path": "assets/ui/icons/shop.png",
      "frameWidth": 102,
      "frameHeight": 87,
      "frames": 1
    },
    "ui/icons/missions": {
      "path": "assets/ui/icons/missions.png",
      "frameWidth": 84,
      "frameHeight": 92,
      "frames": 1
    },
    "ui/icons/records": {
      "path": "assets/ui/icons/records.png",
      "frameWidth": 90,
      "frameHeight": 86,
      "frames": 1
    },
    "ui/icons/profile": {
      "path": "assets/ui/icons/profile.png",
      "frameWidth": 92,
      "frameHeight": 94,
      "frames": 1
    },
    "ui/icons/swords": {
      "path": "assets/ui/icons/swords.png",
      "frameWidth": 108,
      "frameHeight": 109,
      "frames": 1
    },
    "ui/icons/boss": {
      "path": "assets/ui/icons/boss.png",
      "frameWidth": 102,
      "frameHeight": 122,
      "frames": 1
    },
    "ui/icons/compass": {
      "path": "assets/ui/icons/compass.png",
      "frameWidth": 112,
      "frameHeight": 117,
      "frames": 1
    },
    "ui/icons/map": {
      "path": "assets/ui/icons/map.png",
      "frameWidth": 118,
      "frameHeight": 110,
      "frames": 1
    },
    "ui/icons/gamepad": {
      "path": "assets/ui/icons/gamepad.png",
      "frameWidth": 100,
      "frameHeight": 77,
      "frames": 1
    },
    "ui/icons/controls": {
      "path": "assets/ui/icons/controls.png",
      "frameWidth": 81,
      "frameHeight": 81,
      "frames": 1
    },
    "ui/icons/flag": {
      "path": "assets/ui/icons/flag.png",
      "frameWidth": 108,
      "frameHeight": 127,
      "frames": 1
    },
    "ui/icons/skull": {
      "path": "assets/ui/icons/skull.png",
      "frameWidth": 83,
      "frameHeight": 91,
      "frames": 1
    },
    "ui/icons/touch": {
      "path": "assets/ui/icons/touch.png",
      "frameWidth": 113,
      "frameHeight": 118,
      "frames": 1
    },
    "ui/icons/volume": {
      "path": "assets/ui/icons/volume.png",
      "frameWidth": 110,
      "frameHeight": 89,
      "frames": 1
    },
    "ui/icons/music": {
      "path": "assets/ui/icons/music.png",
      "frameWidth": 79,
      "frameHeight": 91,
      "frames": 1
    },
    "ui/icons/speed": {
      "path": "assets/ui/icons/speed.png",
      "frameWidth": 94,
      "frameHeight": 95,
      "frames": 1
    },
    "ui/icons/palette": {
      "path": "assets/ui/icons/palette.png",
      "frameWidth": 108,
      "frameHeight": 98,
      "frames": 1
    },
    "ui/icons/power": {
      "path": "assets/ui/icons/power.png",
      "frameWidth": 81,
      "frameHeight": 104,
      "frames": 1
    },
    "ui/icons/sword": {
      "path": "assets/ui/icons/sword.png",
      "frameWidth": 91,
      "frameHeight": 94,
      "frames": 1
    },
    "ui/icons/gold-star": {
      "path": "assets/ui/icons/gold-star.png",
      "frameWidth": 89,
      "frameHeight": 88,
      "frames": 1
    },
    "ui/icons/magic": {
      "path": "assets/ui/icons/magic.png",
      "frameWidth": 88,
      "frameHeight": 93,
      "frames": 1
    },
    "ui/icons/stamina": {
      "path": "assets/ui/icons/stamina.png",
      "frameWidth": 80,
      "frameHeight": 98,
      "frames": 1
    },
    "ui/icons/bow": {
      "path": "assets/ui/icons/bow.png",
      "frameWidth": 96,
      "frameHeight": 98,
      "frames": 1
    },
    "ui/icons/sun": {
      "path": "assets/ui/icons/sun.png",
      "frameWidth": 100,
      "frameHeight": 104,
      "frames": 1
    },
    "ui/icons/frost": {
      "path": "assets/ui/icons/frost.png",
      "frameWidth": 92,
      "frameHeight": 105,
      "frames": 1
    },
    "ui/icons/wind": {
      "path": "assets/ui/icons/wind.png",
      "frameWidth": 116,
      "frameHeight": 101,
      "frames": 1
    },
    "ui/icons/crown": {
      "path": "assets/ui/icons/crown.png",
      "frameWidth": 103,
      "frameHeight": 90,
      "frames": 1
    },
    "ui/icons/earned-star": {
      "path": "assets/ui/icons/earned-star.png",
      "frameWidth": 93,
      "frameHeight": 91,
      "frames": 1
    },
    "ui/icons/empty-star": {
      "path": "assets/ui/icons/empty-star.png",
      "frameWidth": 92,
      "frameHeight": 88,
      "frames": 1
    },
    "ui/icons/medal-gold": {
      "path": "assets/ui/icons/medal-gold.png",
      "frameWidth": 110,
      "frameHeight": 111,
      "frames": 1
    },
    "ui/icons/medal-silver": {
      "path": "assets/ui/icons/medal-silver.png",
      "frameWidth": 111,
      "frameHeight": 112,
      "frames": 1
    },
    "ui/icons/medal-bronze": {
      "path": "assets/ui/icons/medal-bronze.png",
      "frameWidth": 115,
      "frameHeight": 112,
      "frames": 1
    },
    "ui/icons/trophy": {
      "path": "assets/ui/icons/trophy.png",
      "frameWidth": 104,
      "frameHeight": 106,
      "frames": 1
    },
    "ui/icons/quest-coins": {
      "path": "assets/ui/icons/quest-coins.png",
      "frameWidth": 139,
      "frameHeight": 137,
      "frames": 1
    },
    "ui/icons/quest-power": {
      "path": "assets/ui/icons/quest-power.png",
      "frameWidth": 139,
      "frameHeight": 138,
      "frames": 1
    },
    "ui/icons/quest-potion": {
      "path": "assets/ui/icons/quest-potion.png",
      "frameWidth": 86,
      "frameHeight": 138,
      "frames": 1
    },
    "ui/icons/quest-shrine": {
      "path": "assets/ui/icons/quest-shrine.png",
      "frameWidth": 129,
      "frameHeight": 152,
      "frames": 1
    },
    "ui/icons/quest-monster": {
      "path": "assets/ui/icons/quest-monster.png",
      "frameWidth": 142,
      "frameHeight": 139,
      "frames": 1
    },
    "ui/icons/left": {
      "path": "assets/ui/icons/left.png",
      "frameWidth": 64,
      "frameHeight": 94,
      "frames": 1
    },
    "ui/icons/right": {
      "path": "assets/ui/icons/right.png",
      "frameWidth": 64,
      "frameHeight": 94,
      "frames": 1
    },
    "ui/icons/crouch": {
      "path": "assets/ui/icons/crouch.png",
      "frameWidth": 79,
      "frameHeight": 55,
      "frames": 1
    },
    "ui/icons/diamond": {
      "path": "assets/ui/icons/diamond.png",
      "frameWidth": 85,
      "frameHeight": 85,
      "frames": 1
    },
    "ui/frames/currency": {
      "path": "assets/ui/frames/currency.png",
      "frameWidth": 246,
      "frameHeight": 73,
      "frames": 1
    },
    "ui/frames/tab": {
      "path": "assets/ui/frames/tab.png",
      "frameWidth": 137,
      "frameHeight": 73,
      "frames": 1
    },
    "ui/frames/tab-selected": {
      "path": "assets/ui/frames/tab-selected.png",
      "frameWidth": 138,
      "frameHeight": 72,
      "frames": 1
    },
    "ui/frames/button": {
      "path": "assets/ui/frames/button.png",
      "frameWidth": 182,
      "frameHeight": 66,
      "frames": 1
    },
    "ui/frames/button-gold": {
      "path": "assets/ui/frames/button-gold.png",
      "frameWidth": 200,
      "frameHeight": 68,
      "frames": 1
    },
    "ui/frames/hero-card": {
      "path": "assets/ui/frames/hero-card.png",
      "frameWidth": 148,
      "frameHeight": 215,
      "frames": 1
    },
    "ui/frames/hero-selected": {
      "path": "assets/ui/frames/hero-selected.png",
      "frameWidth": 146,
      "frameHeight": 214,
      "frames": 1
    },
    "ui/frames/hero-locked": {
      "path": "assets/ui/frames/hero-locked.png",
      "frameWidth": 147,
      "frameHeight": 213,
      "frames": 1
    },
    "ui/frames/hero-purple": {
      "path": "assets/ui/frames/hero-purple.png",
      "frameWidth": 137,
      "frameHeight": 214,
      "frames": 1
    },
    "ui/frames/quest": {
      "path": "assets/ui/frames/quest.png",
      "frameWidth": 219,
      "frameHeight": 106,
      "frames": 1
    },
    "ui/frames/price": {
      "path": "assets/ui/frames/price.png",
      "frameWidth": 138,
      "frameHeight": 58,
      "frames": 1
    },
    "ui/frames/nav": {
      "path": "assets/ui/frames/nav.png",
      "frameWidth": 655,
      "frameHeight": 52,
      "frames": 1
    },
    "ui/frames/setting-row": {
      "path": "assets/ui/frames/setting-row.png",
      "frameWidth": 345,
      "frameHeight": 70,
      "frames": 1
    },
    "ui/frames/button-large": {
      "path": "assets/ui/frames/button-large.png",
      "frameWidth": 317,
      "frameHeight": 78,
      "frames": 1
    },
    "ui/frames/toggle-on": {
      "path": "assets/ui/frames/toggle-on.png",
      "frameWidth": 103,
      "frameHeight": 55,
      "frames": 1
    },
    "ui/frames/toggle-off": {
      "path": "assets/ui/frames/toggle-off.png",
      "frameWidth": 104,
      "frameHeight": 55,
      "frames": 1
    },
    "ui/frames/progress-empty": {
      "path": "assets/ui/frames/progress-empty.png",
      "frameWidth": 296,
      "frameHeight": 32,
      "frames": 1
    },
    "ui/frames/progress-full": {
      "path": "assets/ui/frames/progress-full.png",
      "frameWidth": 220,
      "frameHeight": 30,
      "frames": 1
    },
    "ui/frames/panel": {
      "path": "assets/ui/frames/panel.png",
      "frameWidth": 440,
      "frameHeight": 227,
      "frames": 1
    },
    "ui/frames/profile": {
      "path": "assets/ui/frames/profile.png",
      "frameWidth": 449,
      "frameHeight": 235,
      "frames": 1
    },
    "ui/frames/identity": {
      "path": "assets/ui/frames/identity.png",
      "frameWidth": 356,
      "frameHeight": 107,
      "frames": 1
    },
    "ui/frames/portrait": {
      "path": "assets/ui/frames/portrait.png",
      "frameWidth": 163,
      "frameHeight": 207,
      "frames": 1
    },
    "ui/frames/portrait-selected": {
      "path": "assets/ui/frames/portrait-selected.png",
      "frameWidth": 182,
      "frameHeight": 219,
      "frames": 1
    },
    "ui/frames/input": {
      "path": "assets/ui/frames/input.png",
      "frameWidth": 344,
      "frameHeight": 68,
````

## `game/app.js`

Tasks: 2,3,4,7. OLD SHA-256: `fb2a32b8840eea0fcfab97f6778facb3c63f130f50f9f378cf97c9e9f5d51ba8`. NEW SHA-256: `d7b08cde04c6a75b9710be771b16570c7bdf8b4e0f72fd7dd37f6a583c7ba42a`.

### insert: OLD 3–2; NEW 3–8

OLD
````text
````

NEW
````text
import {heroStats,STAT_HELP,STAT_LABELS} from './hero-stats.js';
import {equippedWeapon,equipWeapon,equipmentStatus,weaponEligibility,signatureWeapon,WEAPON_RULES} from './equipment.js';
import {WARDROBE_SLOTS,WARDROBE_LABELS,equipWardrobe} from './wardrobe.js';
import {CONTROL_ART} from './controls.js';
import {ASSET_CONFIG} from './assets.js';
import {drawHero} from './render.js';
````

### replace: OLD 49–49; NEW 55–55

OLD
````text
} renderer.menuOutfit=save.ascension.outfits[save.hero]||'starter';renderer.menuParts=save.ascension.parts?.[save.hero]; updateTop(); }
````

NEW
````text
} renderer.menuOutfit=save.ascension.outfits[save.hero]||'starter';renderer.menuParts=save.ascension.parts?.[save.hero];renderer.menuWeapon=equippedWeapon(save.ascension,save.hero);renderer.menuWardrobe=save.ascension.wardrobe?.[save.hero]; updateTop(); }
````

### insert: OLD 66–65; NEW 72–73

OLD
````text
````

NEW
````text
    if($('xpFraction'))$('xpFraction').textContent=(save.xp%500)+' / 500';
    if($('homeLoadout'))$('homeLoadout').textContent=loadoutDescription(save.hero);
````

### replace: OLD 68–68; NEW 76–76

OLD
````text
    paintPortrait($('profilePortrait'), save.profile.avatar, true);
````

NEW
````text
    paintPortrait($('profilePortrait'), save.profile.avatar, true,localHeroLoadout(save.profile.avatar));
````

### replace: OLD 79–79; NEW 87–87

OLD
````text
function applySettings() { ascApplyControls(); renderer.menuOutfit=save.ascension.outfits[save.hero]||'starter';renderer.menuParts=save.ascension.parts?.[save.hero]; audio.enabled = save.settings.sound; audio.music = save.settings.music; audio.sfxVolume = save.settings.sfxVolume; audio.musicVolume = save.settings.musicVolume; renderer.motion = save.settings.motion; renderer.blood=save.settings.blood; document.body.classList.toggle('analog-mode',save.settings.controlMode==='analog'); document.body.classList.toggle('arrows-mode',save.settings.controlMode==='arrows'); renderer.trail = save.trail; renderer.close = save.settings.zoom === 'close'; document.body.classList.toggle('reduce-motion', !save.settings.motion); $('touchControls').classList.toggle('left-handed', save.settings.leftHanded); document.documentElement.style.setProperty('--control-opacity', save.settings.opacity); $('sprintControl').classList.toggle('enabled', save.settings.sprint); renderer.resize(innerWidth, innerHeight, save.settings.quality); if (!save.settings.sound && audio.context)
````

NEW
````text
function applySettings() { ascApplyControls(); renderer.menuOutfit=save.ascension.outfits[save.hero]||'starter';renderer.menuParts=save.ascension.parts?.[save.hero];renderer.menuWeapon=equippedWeapon(save.ascension,save.hero);renderer.menuWardrobe=save.ascension.wardrobe?.[save.hero]; audio.enabled = save.settings.sound; audio.music = save.settings.music; audio.sfxVolume = save.settings.sfxVolume; audio.musicVolume = save.settings.musicVolume; renderer.motion = save.settings.motion; renderer.blood=save.settings.blood; document.body.classList.toggle('analog-mode',save.settings.controlMode==='analog'); document.body.classList.toggle('arrows-mode',save.settings.controlMode==='arrows'); renderer.trail = save.trail; renderer.close = save.settings.zoom === 'close'; document.body.classList.toggle('reduce-motion', !save.settings.motion); $('touchControls').classList.toggle('left-handed', save.settings.leftHanded); document.documentElement.style.setProperty('--control-opacity', save.settings.opacity); $('sprintControl').classList.toggle('enabled', save.settings.sprint); renderer.resize(innerWidth, innerHeight, save.settings.quality); if (!save.settings.sound && audio.context)
````

### replace: OLD 134–134; NEW 142–142

OLD
````text
function renderQuests() { refreshDay(save); $('journeyTab').classList.toggle('selected', !dailyTab); $('dailyTab').classList.toggle('selected', dailyTab); const qs = dailyTab ? dailyQuests(save.daily.day) : QUESTS, claims = dailyTab ? save.daily.claims : save.claims; $('questList').innerHTML = (dailyTab ? `<div class="chapter-label">${escapeText(save.daily.day)} UTC • RESETS DAILY • OFFLINE DEVICE CLOCK</div>` : '') + qs.map(q => { const v = dailyTab ? save.daily.stats[q.stat] || 0 : questValue(save, q), claimed = claims.includes(q.id), ready = v >= q.target; return `<article class="quest-card"><div class="quest-head"><span class="quest-icon">${icon(q.icon)}</span><strong>${q.name}</strong></div><p>${q.text}</p><div class="quest-progress"><i style="width:${Math.min(100, v / q.target * 100)}%"></i></div><div class="quest-foot"><span>${formatNumber(Math.min(v, q.target))} / ${formatNumber(q.target)}</span><button class="quest-claim ${claimed ? 'claimed' : ready ? 'ready' : ''}" data-claim="${q.id}" ${!ready || claimed ? 'disabled' : ''}>${icon(claimed ? 'check' : 'coins')}${claimed ? 'Claimed' : ready ? 'Claim ' + q.reward : q.reward}</button></div></article>`; }).join(''); $('questList').querySelectorAll('[data-claim]').forEach(b => b.onclick = () => { click(); const reward = claimQuest(save, b.dataset.claim, dailyTab); if (reward) {
````

NEW
````text
function renderQuests() { refreshDay(save); $('journeyTab').classList.toggle('selected', !dailyTab); $('dailyTab').classList.toggle('selected', dailyTab); const qs = dailyTab ? dailyQuests(save.daily.day) : QUESTS, claims = dailyTab ? save.daily.claims : save.claims; $('questList').innerHTML = (dailyTab ? `<div class="chapter-label">${escapeText(save.daily.day)} UTC • RESETS DAILY • OFFLINE DEVICE CLOCK</div>` : '') + qs.map(q => { const v = dailyTab ? save.daily.stats[q.stat] || 0 : questValue(save, q), claimed = claims.includes(q.id), ready = v >= q.target; return `<article class="quest-card"><div class="quest-head"><span class="quest-icon">${icon(questThumbnail(q.stat,q.icon))}</span><strong>${q.name}</strong></div><p>${q.text}</p><div class="quest-progress"><i style="width:${Math.min(100, v / q.target * 100)}%"></i></div><div class="quest-foot"><span>${formatNumber(Math.min(v, q.target))} / ${formatNumber(q.target)}</span><button class="quest-claim ${claimed ? 'claimed' : ready ? 'ready' : ''}" data-claim="${q.id}" ${!ready || claimed ? 'disabled' : ''}>${icon(claimed ? 'check' : 'coins')}${claimed ? 'Claimed' : ready ? 'Claim ' + q.reward : q.reward}</button></div></article>`; }).join(''); $('questList').querySelectorAll('[data-claim]').forEach(b => b.onclick = () => { click(); const reward = claimQuest(save, b.dataset.claim, dailyTab); if (reward) {
````

### replace: OLD 141–141; NEW 149–149

OLD
````text
function openModal(type, html) { previousFocus = document.activeElement; modalType = type; $('modalPanel').className = 'modal-panel' + (type === 'result' ? ' result' : ''); $('modalPanel').innerHTML = html; $('modal').hidden = false; requestAnimationFrame(() => { $('modalPanel').querySelector('button:not(:disabled)')?.focus({ preventScroll: true }); }); }
````

NEW
````text
function openModal(type, html) { previousFocus = document.activeElement; modalType = type; $('modalPanel').dataset.modal=type; $('modalPanel').className = 'modal-panel' + (type === 'result' ? ' result' : ''); $('modalPanel').innerHTML = html; $('modal').hidden = false; requestAnimationFrame(() => { $('modalPanel').querySelector('button:not(:disabled)')?.focus({ preventScroll: true }); }); }
````

## `game/ascension-ui.js`

Tasks: 2,4,7. OLD SHA-256: `18dfca09f794b20423e3423bd285f29e7878a1c5e5890995ead84d3efde3b060`. NEW SHA-256: `c4cf29bc76d3057ea907665547f631cf14c8799ab309574379b7c6fb79d6f064`.

### insert: OLD 13–12; NEW 13–16

OLD
````text
````

NEW
````text
 const bare=isUnarmed(p),attack=$('attackControl');
 if(attack.dataset.unarmed!==String(bare)){attack.dataset.unarmed=String(bare);attack.querySelector('i').innerHTML=bare?'':icon('sword');attack.querySelector('span').textContent=bare?'PUNCH':'STRIKE';attack.setAttribute('aria-label',bare?'Unarmed punch; short reach':'Melee attack; aim down in the air to pogo');}
 $('knifeControl').disabled=bare;$('knifeControl').setAttribute('aria-label',bare?'Knife unavailable while unarmed':'Throw a knife');

````

### replace: OLD 51–51; NEW 55–55

OLD
````text
function showSettings(fromPause=false){showSettingsBase(fromPause);const resetTutorials=document.createElement('button');resetTutorials.className='secondary';resetTutorials.textContent='Reset gameplay tutorials';resetTutorials.onclick=()=>{save.discoveredPowerUps=[];persist();toast('Power-up guides reset.');};$('modalPanel').appendChild(resetTutorials);const insert=document.createElement('div');insert.className='control-studio-entry';insert.innerHTML=`<div><b>Your touch layouts</b><small>Four saved presets · position / size / opacity</small></div><div class="preset-quick">${[0,1,2,3].map(i=>`<button data-layout="${i}" class="${save.controlActive===i?'selected':''}">${String.fromCharCode(65+i)}</button>`).join('')}<button id="openControlStudio" class="primary">Edit layout</button></div>`;$('modalPanel').querySelector('.setting-grid').before(insert);$('openControlStudio').onclick=ascOpenEditor;insert.querySelectorAll('[data-layout]').forEach(b=>b.onclick=()=>{ascUsePreset(+b.dataset.layout);showSettings(fromPause);});
````

NEW
````text
function showSettingsLegacy(fromPause=false){showSettingsBase(fromPause);const resetTutorials=document.createElement('button');resetTutorials.className='secondary';resetTutorials.textContent='Reset gameplay tutorials';resetTutorials.onclick=()=>{save.discoveredPowerUps=[];persist();toast('Power-up guides reset.');};$('modalPanel').appendChild(resetTutorials);const insert=document.createElement('div');insert.className='control-studio-entry';insert.innerHTML=`<div><b>Your touch layouts</b><small>Four saved presets · position / size / opacity</small></div><div class="preset-quick">${[0,1,2,3].map(i=>`<button data-layout="${i}" class="${save.controlActive===i?'selected':''}">${String.fromCharCode(65+i)}</button>`).join('')}<button id="openControlStudio" class="primary">Edit layout</button></div>`;$('modalPanel').querySelector('.setting-grid').before(insert);$('openControlStudio').onclick=ascOpenEditor;insert.querySelectorAll('[data-layout]').forEach(b=>b.onclick=()=>{ascUsePreset(+b.dataset.layout);showSettings(fromPause);});
````

### replace: OLD 57–57; NEW 61–61

OLD
````text
function renderForge(){const hero=heroById(ascForgeHero||save.hero);$('forgeTabs').innerHTML=[['outfits','Wardrobe'],['skills','Skills'],['fusion','Fusion']].map(([id,title])=>`<button data-forge-tab="${id}" class="${ascForgeTab===id?'selected':''}">${title}</button>`).join('');$('forgeTabs').querySelectorAll('button').forEach(b=>b.onclick=()=>{ascForgeTab=b.dataset.forgeTab;renderForge();});const out=$('forgeContent');
````

NEW
````text
function renderForgeLegacy(){const hero=heroById(ascForgeHero||save.hero);$('forgeTabs').innerHTML=[['outfits','Wardrobe'],['skills','Skills'],['fusion','Fusion']].map(([id,title])=>`<button data-forge-tab="${id}" class="${ascForgeTab===id?'selected':''}">${title}</button>`).join('');$('forgeTabs').querySelectorAll('button').forEach(b=>b.onclick=()=>{ascForgeTab=b.dataset.forgeTab;renderForge();});const out=$('forgeContent');
````

### replace: OLD 71–71; NEW 75–75

OLD
````text
function renderHeroes(){renderHeroesBase();const h=heroById(selectedHero);const lore=document.createElement('div');lore.className='hero-lore';lore.innerHTML=`<p>${escapeText(h.backstory||h.hint)}</p><p><b>${escapeText(h.weapon||"Signature weapon")}</b> · ${h.combatStyle?.reach||82} reach · ${h.combatStyle?.cooldown||.34}s combo cadence</p><button id="heroForge" class="secondary">Outfits & skill build →</button>`;$('heroDetails').appendChild(lore);$('heroForge').onclick=()=>{ascForgeHero=h.id;showPage('forge');};}
````

NEW
````text
function renderHeroesLegacyPalette(){renderHeroesBase();const h=heroById(selectedHero);const lore=document.createElement('div');lore.className='hero-lore';lore.innerHTML=`<p>${escapeText(h.backstory||h.hint)}</p><p><b>${escapeText(h.weapon||"Signature weapon")}</b> · ${h.combatStyle?.reach||82} reach · ${h.combatStyle?.cooldown||.34}s combo cadence</p><button id="heroForge" class="secondary">Outfits & skill build →</button>`;$('heroDetails').appendChild(lore);$('heroForge').onclick=()=>{ascForgeHero=h.id;showPage('forge');};}
````

## `game/ascension.js`

Tasks: 4,7,8 / save and record migration. OLD SHA-256: `3c1b1eb693d8cbf9a4c3fd4c8934ffd5ae0f13ca427d805ba4c967518e0d3c6c`. NEW SHA-256: `5e28a4eeb6c60fc9814c5c427843af70f503d1deca5beb972d90fdfdcd7b50aa`.

### insert: OLD 2–1; NEW 2–4

OLD
````text
````

NEW
````text
import {cleanWeapons,equippedWeapon,signatureWeapon} from './equipment.js';
import {sanitizeWardrobe,WARDROBE_CATALOG} from './wardrobe.js';
import {ASSET_CONFIG} from './assets.js';
````

### replace: OLD 4–5; NEW 7–8

OLD
````text
// Mira's explicit frost projectile changes solo combat; retain older runs separately.
export const ASC_RULES_REVISION=4;
````

NEW
````text
// Unarmed combat and alternative weapon loadouts change solo comparability; keep revisions 1–4 archived.
export const ASC_RULES_REVISION=5;
````

### replace: OLD 22–22; NEW 25–25

OLD
````text
export function ascDefault(){return {parts:{},localRecords:[],outfits:{},ownedOutfits:[],skills:{},learned:[],fusions:[],records:[],camera:'side'};}
````

NEW
````text
export function ascDefault(){return {weapons:cleanWeapons(),wardrobe:{},ownedPieces:[],parts:{},localRecords:[],outfits:{},ownedOutfits:[],skills:{},learned:[],fusions:[],records:[],camera:'side'};}
````

### insert: OLD 25–24; NEW 28–30

OLD
````text
````

NEW
````text
 out.weapons=cleanWeapons(raw.weapons);
 out.ownedPieces=Array.isArray(raw.ownedPieces)?[...new Set(raw.ownedPieces.filter(id=>WARDROBE_CATALOG.some(i=>i.id===id)))]:[];
 out.wardrobe=sanitizeWardrobe(raw.wardrobe,out.ownedPieces,WARDROBE_CATALOG,ASSET_CONFIG); // no ready body-layer art in this candidate
````

### replace: OLD 29–29; NEW 35–35

OLD
````text
 out.records=Array.isArray(raw.records)?raw.records.filter(r=>r&&r.rules==='ascension-1'&&Number.isFinite(r.score)&&r.score>=0&&Number.isFinite(r.time)&&r.time>=0&&Number.isInteger(r.world)&&r.world>=0&&r.world<15&&['standard','open'].includes(r.category)&&['campaign','boss','endless','daily'].includes(r.mode)&&['veteran','nightmare','inferno'].includes(r.difficulty)).slice(-120).map(r=>({rules:'ascension-1',revision:[2,3,ASC_RULES_REVISION].includes(r.revision)?r.revision:1,playerCount:1,deaths:Math.max(0,Math.floor(r.deaths)||0),revives:0,mode:r.mode,world:r.world,difficulty:r.difficulty,category:r.category,hero:heroById(r.hero).id,pet:PETS.some(p=>p.id===r.pet)?r.pet:null,skills:Array.isArray(r.skills)?r.skills.filter(id=>ascSkill(id)).slice(0,2):[],score:Math.min(1e12,r.score),time:Math.min(1e7,r.time),hits:Math.max(0,Math.min(1e6,Number(r.hits)||0)),stage:Math.max(1,Math.min(1e6,Number(r.stage)||1)),grade:['S','A','B','C','D'].includes(r.grade)?r.grade:'C',date:/^\d{4}-\d{2}-\d{2}$/.test(r.date)?r.date:''})) : [];
````

NEW
````text
 out.records=Array.isArray(raw.records)?raw.records.filter(r=>r&&r.rules==='ascension-1'&&Number.isFinite(r.score)&&r.score>=0&&Number.isFinite(r.time)&&r.time>=0&&Number.isInteger(r.world)&&r.world>=0&&r.world<15&&['standard','open'].includes(r.category)&&['campaign','boss','endless','daily'].includes(r.mode)&&['veteran','nightmare','inferno'].includes(r.difficulty)).slice(-120).map(r=>({rules:'ascension-1',revision:[2,3,4,ASC_RULES_REVISION].includes(r.revision)?r.revision:1,playerCount:1,deaths:Math.max(0,Math.floor(r.deaths)||0),revives:0,mode:r.mode,world:r.world,difficulty:r.difficulty,category:r.category,weapon:Object.hasOwn(r,'weapon')?cleanWeapons({[r.hero]:r.weapon})[heroById(r.hero).id]:signatureWeapon(heroById(r.hero).id),hero:heroById(r.hero).id,pet:PETS.some(p=>p.id===r.pet)?r.pet:null,skills:Array.isArray(r.skills)?r.skills.filter(id=>ascSkill(id)).slice(0,2):[],score:Math.min(1e12,r.score),time:Math.min(1e7,r.time),hits:Math.max(0,Math.min(1e6,Number(r.hits)||0)),stage:Math.max(1,Math.min(1e6,Number(r.stage)||1)),grade:['S','A','B','C','D'].includes(r.grade)?r.grade:'C',date:/^\d{4}-\d{2}-\d{2}$/.test(r.date)?r.date:''})) : [];
````

### replace: OLD 42–43; NEW 48–49

OLD
````text
export function ascApplyRun(save,r){const p=r.player;p.parts=cleanCosmetics(save.ascension.parts?.[p.character],save.ascension.ownedOutfits.includes(p.character+':ember'));p.outfit=save.ascension.outfits[p.character]||'starter';const sk=ascHeroSkills(save.ascension,p.character);p.skillId1=sk[0].id;p.skillId2=sk[1].id;r.loadoutCategory=r.petId||sk.some((s,i)=>s.id!==heroById(p.character).skills[i].id)?'open':'standard';}
export function ascResult(r){const time=r.bossTrial?r.bossTime:r.mapTime+r.knockouts*3;const penalty=r.hits*6+r.knockouts*20+Math.max(0,time-(r.bossTrial?90:r.level.cfg.par))/5;const q=Math.max(0,100-penalty);return {rules:'ascension-1',revision:ASC_RULES_REVISION,playerCount:1,deaths:r.knockouts||0,revives:0,mode:r.bossTrial?'boss':r.mode,world:r.worldId,difficulty:r.difficulty,category:r.loadoutCategory|| (r.petId?'open':'standard'),hero:r.player.character,pet:r.petId,skills:[r.player.skillId1||'',r.player.skillId2||''],score:Math.floor(r.score),time:Math.round(time*1000)/1000,hits:r.hits,stage:r.stage+1,grade:r.failed?'D':q>=90?'S':q>=75?'A':q>=55?'B':'C',date:new Date().toISOString().slice(0,10)};}
````

NEW
````text
export function ascApplyRun(save,r){const p=r.player;p.equippedWeapon=equippedWeapon(save.ascension,p.character);p.wardrobe=save.ascension.wardrobe?.[p.character]||{};p.parts=cleanCosmetics(save.ascension.parts?.[p.character],save.ascension.ownedOutfits.includes(p.character+':ember'));p.outfit=save.ascension.outfits[p.character]||'starter';const sk=ascHeroSkills(save.ascension,p.character);p.skillId1=sk[0].id;p.skillId2=sk[1].id;r.loadoutCategory=r.petId||p.equippedWeapon!==signatureWeapon(p.character)||sk.some((s,i)=>s.id!==heroById(p.character).skills[i].id)?'open':'standard';}
export function ascResult(r){const time=r.bossTrial?r.bossTime:r.mapTime+r.knockouts*3;const penalty=r.hits*6+r.knockouts*20+Math.max(0,time-(r.bossTrial?90:r.level.cfg.par))/5;const q=Math.max(0,100-penalty);return {rules:'ascension-1',revision:ASC_RULES_REVISION,playerCount:1,deaths:r.knockouts||0,revives:0,mode:r.bossTrial?'boss':r.mode,world:r.worldId,difficulty:r.difficulty,category:r.loadoutCategory|| (r.petId?'open':'standard'),hero:r.player.character,weapon:r.player.equippedWeapon===undefined?signatureWeapon(r.player.character):r.player.equippedWeapon,pet:r.petId,skills:[r.player.skillId1||'',r.player.skillId2||''],score:Math.floor(r.score),time:Math.round(time*1000)/1000,hits:r.hits,stage:r.stage+1,grade:r.failed?'D':q>=90?'S':q>=75?'A':q>=55?'B':'C',date:new Date().toISOString().slice(0,10)};}
````

## `game/atelier-ui.js`

Tasks: 2,3,4,5,6,7,8. OLD SHA-256: `NEW FILE`. NEW SHA-256: `1ce9b46ff531440ecc45a70ba6799e03d1daf2af45b2f8540c6a789b29ffe96e`.

### insert: OLD 1–0; NEW 1–89

OLD
````text
````

NEW
````text
/* Local art-integration adapter. Existing save, account and gameplay commands remain authoritative. */
function localHeroLoadout(id){return {outfit:save.ascension.outfits[id]||'starter',parts:save.ascension.parts?.[id],equippedWeapon:equippedWeapon(save.ascension,id),wardrobe:save.ascension.wardrobe?.[id]||{}};}
function loadoutDescription(id){
 const weapon=equippedWeapon(save.ascension,id);
 if(weapon===null)return id==='wissem'?'UNARMED · BARE-HAND GUARD':'UNARMED · TRAINING PROXY / ART PENDING';
 return WEAPON_RULES[weapon]?.label.toUpperCase()||'SIGNATURE LOADOUT';
}
function heroStatsHTML(id){const stats=heroStats(id);return `<div class="hero-stat-grid">${Object.entries(STAT_LABELS).map(([key,label])=>`<div title="${escapeText(STAT_HELP[key])}">${icon(key)}<span>${label}<strong>${stats[key]}</strong></span><meter min="0" max="200" value="${stats[key]}" aria-label="${label} rating ${stats[key]}"></meter></div>`).join('')}</div>`;}
function renderHeroes(){
 const grid=$('heroGrid'),h=heroById(selectedHero);
 grid.innerHTML=HEROES.map(v=>`<button class="hero-card ${v.id===h.id?'selected':''}" data-hero="${v.id}" aria-pressed="${v.id===h.id}" aria-label="${v.name}, ${v.role}"><canvas width="192" height="224" data-hero-art="${v.id}"></canvas><strong>${v.name}</strong><small>${v.role}</small><span class="hero-equipped">${save.hero===v.id?'EQUIPPED':''}</span></button>`).join('');
 grid.querySelectorAll('[data-hero-art]').forEach(c=>paintPortrait(c,c.dataset.heroArt,c.dataset.heroArt===h.id,localHeroLoadout(c.dataset.heroArt)));
 grid.querySelectorAll('[data-hero]').forEach(b=>b.onclick=()=>{click();selectedHero=b.dataset.hero;renderHeroes();});
 const weapon=equippedWeapon(save.ascension,h.id),proxy=weapon===null&&h.id!=='wissem';
 $('heroDetails').innerHTML=`<div class="hero-detail-top"><canvas width="168" height="190" id="detailHero"></canvas><div><span class="detail-overline">${save.hero===h.id?'YOUR HERO':'CHOOSE YOUR HERO'}</span><h3>${h.name}</h3><small>${h.role}</small></div></div>${heroStatsHTML(h.id)}<p class="loadout-note ${proxy?'art-pending':''}">${escapeText(loadoutDescription(h.id))}</p><div class="pixel-skills">${h.skills.map(sk=>`<article>${ascSkillImage(sk)}<div><b>${escapeText(sk.name)}</b><small>${sk.cooldown}s cooldown</small><p>${escapeText(sk.description)}</p></div></article>`).join('')}</div><button id="equipHero" class="primary">${icon(save.hero===h.id?'check':'profile')}${save.hero===h.id?'Equipped':'Play as '+h.name}</button><div class="detail-buttons"><button id="heroLoadout" class="secondary">Weapons / unarmed</button><button id="heroForge" class="secondary">Wardrobe & skills</button></div><details class="hero-stat-help"><summary>Ratings & hero identity</summary><p>${escapeText(h.backstory||h.hint)}</p><p>Fixed ratings describe the original combat profile. They do not add a second damage multiplier, buy health, or level up with cosmetics.</p><p>${Object.entries(STAT_HELP).map(([k,v])=>STAT_LABELS[k]+': '+v).join(' ')}</p></details>`;
 paintPortrait($('detailHero'),h.id,true,localHeroLoadout(h.id));
 $('equipHero').onclick=()=>{click();save.hero=h.id;persist();renderHeroes();};
 $('heroLoadout').onclick=()=>showWeaponLoadout(h.id);
 $('heroForge').onclick=()=>{ascForgeHero=h.id;showPage('forge');};
}
function showWeaponLoadout(id){
 const h=heroById(id),current=equippedWeapon(save.ascension,id);
 openModal('weapons',`${header(h.name+' · Weapons','EQUIPMENT / FIXED CAPABILITY RATINGS')}${heroStatsHTML(id)}<p>Choose a weapon or fight bare-handed. New loadouts use separate Open records. Normalized local PvP retains its shared combat rules.</p><div class="weapon-catalog"><button class="weapon-choice ${current===null?'selected':''}" data-equip-weapon="unarmed"><span class="unarmed-word">UNARMED</span><b>Bare hands</b><small>${id==='wissem'?'Existing weapon-free guard & attack frames':'Functional training proxy; hero art pending'}</small></button>${Object.entries(WEAPON_RULES).map(([type,rule])=>{const status=equipmentStatus(id,type),signature=type===signatureWeapon(id);return `<button class="weapon-choice ${type===current?'selected':''}" data-equip-weapon="${type}" ${status.ok?'':'disabled'} title="${escapeText(status.reasons.join('; '))}"><img src="${assetUrl('weapon/'+type)}" alt=""><b>${rule.label}</b><small>${signature?'SIGNATURE · ':''}${status.ok?'Ready':status.reasons.join(' · ')}</small></button>`;}).join('')}</div><p class="art-pending">Baked weapon art is never double-rendered. A different weapon on a baked body stays blocked until a weapon-free rig is supplied. Bare hands use an explicitly labelled proxy where needed.</p><button id="weaponDone" class="primary">Done</button>`);
 bindClose(closeModal);$('weaponDone').onclick=closeModal;
 $('modalPanel').querySelectorAll('[data-equip-weapon]').forEach(b=>b.onclick=()=>{const type=b.dataset.equipWeapon==='unarmed'?null:b.dataset.equipWeapon;if(equipWeapon(save,id,type)){persist();if(page==='heroes')renderHeroes();showWeaponLoadout(id);}});
}
let wardrobeSlot='hat';
function renderForge(){
 if(ascForgeTab!=='outfits'){renderForgeLegacy();return;}
 const hero=heroById(ascForgeHero||save.hero);
 $('forgeTabs').innerHTML=[['outfits','Wardrobe'],['skills','Skills'],['fusion','Fusion']].map(([id,title])=>`<button data-forge-tab="${id}" class="${ascForgeTab===id?'selected':''}">${title}</button>`).join('');
 $('forgeTabs').querySelectorAll('button').forEach(b=>b.onclick=()=>{ascForgeTab=b.dataset.forgeTab;renderForge();});
 $('forgeContent').innerHTML=`<aside class="forge-preview pixel-preview"><canvas id="wardrobeHero" width="320" height="370"></canvas><h3>${hero.name}</h3><p>${escapeText(loadoutDescription(hero.id))}</p><button class="secondary" id="shopWeapon">Weapons / unarmed</button><small>Cosmetics never change ratings, eligibility or damage.</small></aside><div class="forge-catalog">${forgeHeroCarousel(hero)}<div class="wardrobe-tabs" role="group" aria-label="Independent cosmetic slots">${WARDROBE_SLOTS.map(slot=>`<button data-wardrobe-slot="${slot}" class="${slot===wardrobeSlot?'selected':''}">${WARDROBE_LABELS[slot]}</button>`).join('')}</div><section class="piece-catalog"><article class="piece-card selected">${icon(wardrobeSlot==='weaponSkin'?'sword':'palette')}<h4>Original ${WARDROBE_LABELS[wardrobeSlot].toLowerCase()}</h4><p>No independent replacement selected.</p><button id="clearPiece" class="primary">Use original</button></article><article class="piece-card art-pending">${icon('lock')}<h4>New pieces need art</h4><p>${wardrobeSlot==='weaponSkin'?'Class-matched weapon skin PNG + grip metadata.':'Frame-aligned '+WARDROBE_LABELS[wardrobeSlot].toLowerCase()+' layers and a clean, modular hero base.'}</p><button disabled>Not for sale · art pending</button></article></section><p class="shop-policy">Six independent slots expand future cosmetic inventory. No item is sold before its art is ready. Current prices and earned-coin rewards are unchanged.</p><details class="legacy-looks"><summary>Existing whole looks & trail collection</summary><p>Legacy purchases are retained. New whole-outfit sales are retired; these are not independent clothing pieces.</p><div class="legacy-outfits">${ASC_OUTFITS.map(o=>{const owned=o.cost===0||save.ascension.ownedOutfits.includes(hero.id+':'+o.id);return `<button data-legacy-look="${o.id}" ${owned?'':'disabled'} class="${save.ascension.outfits[hero.id]===o.id?'selected':''}"><img src="${ascOutfitUrl(hero.id,o.id)}" alt=""><b>${o.name}</b><small>${owned?'Use legacy look':'Sale retired'}</small></button>`;}).join('')}</div><div class="trails">${TRAILS.map(t=>`<button class="trail-button ${save.trail===t.id?'active':''}" data-atelier-trail="${t.id}"><i style="background:${t.color};color:${t.color}"></i><small>${t.name} · ${save.ownedTrails.includes(t.id)?'Owned':t.cost+' coins'}</small></button>`).join('')}</div></details></div>`;
 bindForgeCarousel(hero);
 paintPortrait($('wardrobeHero'),hero.id,true,localHeroLoadout(hero.id));
 $('shopWeapon').onclick=()=>showWeaponLoadout(hero.id);
 $('forgeContent').querySelectorAll('[data-wardrobe-slot]').forEach(b=>b.onclick=()=>{wardrobeSlot=b.dataset.wardrobeSlot;renderForge();});
 $('clearPiece').onclick=()=>{if(equipWardrobe(save,hero.id,wardrobeSlot,null,ASSET_CONFIG)){persist();renderForge();}};
 $('forgeContent').querySelectorAll('[data-legacy-look]').forEach(b=>b.onclick=()=>{if(ascBuyOutfit(save,hero.id,b.dataset.legacyLook)){persist();renderForge();}});
 $('forgeContent').querySelectorAll('[data-atelier-trail]').forEach(b=>b.onclick=()=>{
  const t=TRAILS.find(v=>v.id===b.dataset.atelierTrail);
  const apply=()=>{if(unlockTrail(save,t.id)){renderer.trail=save.trail;persist();closeModal();renderForge();}else toast('Not enough earned coins.');};
  if(save.ownedTrails.includes(t.id)){apply();return;}
  openModal('trail-purchase',`${header(t.name,'COSMETIC TRAIL')}<p>Unlock ${escapeText(t.name)} for <b>${t.cost} earned coins</b>. This changes appearance only.</p><button id="confirmTrail" class="primary">Confirm · ${t.cost} coins</button><button id="cancelTrail" class="secondary">Cancel</button>`);bindClose(closeModal);$('confirmTrail').onclick=apply;$('cancelTrail').onclick=closeModal;
 });
}
function renderRecords(){
 renderRecordsDashboardBase();
 const root=$('recordContent'),dashboard=root.querySelector('.record-dashboard');
 if(!dashboard)return;
 dashboard.classList.add('pixel-records');
 const filters=dashboard.querySelector('.dashboard-filters'),detail=dashboard.querySelector('.dashboard-detail'),list=dashboard.querySelector('.dashboard-list');
 const note=filters.querySelector('p');if(note)detail.prepend(note);
 dashboard.replaceChildren(filters,detail,list);
 const hdr=document.createElement('div');hdr.className='rank-table-head';hdr.innerHTML='<b>RANK</b><b>EXPLORER</b><b>TIME / SCORE</b>';list.querySelector('h3').after(hdr);
}
function renderProfile(){
 renderProfileDashboardBase();const root=$('profileContent');root.classList.add('pixel-profile');
 const head=root.querySelector('.premium-profile-header'),nav=root.querySelector('.profile-tabs'),body=root.querySelector('.profile-tab-body');
 root.replaceChildren(nav,head,body);
 const edit=document.createElement('button');edit.className='secondary';edit.textContent='Edit profile';edit.onclick=()=>{profileTab='Cosmetics';renderProfile();};head.append(edit);
 if(profileTab==='Overview'){
  const progression=document.createElement('section');progression.className='profile-progress-panel';progression.innerHTML=`<span class="detail-overline">STORY PROGRESS</span><h3>${save.maps.filter(m=>m.clear).length} / ${WORLDS.length} worlds complete</h3><progress value="${starsTotal(save)}" max="45"></progress><p>${starsTotal(save)} / 45 stars earned</p>`;body.prepend(progression);
  const achievements=document.createElement('section');achievements.className='profile-achievements';achievements.innerHTML=`<h3>Achievements</h3>${[['First Steps',save.maps.some(m=>m.clear),'medal-gold'],['Sovereign Slayer',Object.keys(save.bossRecords).length>0,'crown'],['Spirit Keeper',save.pets.length>0,'pets'],['Journey Seeker',save.claims.length>0,'trophy']].map(([name,done,ic])=>`<div class="${done?'earned':'unearned'}">${icon(ic)}<span>${name}</span><small>${done?'Earned':'Not earned'}</small></div>`).join('')}`;body.append(achievements);
 }
}
function showSettings(fromPause=false){
 showSettingsLegacy(fromPause);const panel=$('modalPanel');panel.classList.add('pixel-settings');
 const title=$('modalTitle');if(title)title.textContent='Your adventure. Your way.';
 const bools=['haptics','sound','music','sprint','motion','leftHanded'];
 panel.querySelectorAll('[data-setting]').forEach(b=>{if(bools.includes(b.dataset.setting)){const on=!!save.settings[b.dataset.setting];b.setAttribute('role','switch');b.setAttribute('aria-checked',String(on));b.querySelector('small').classList.add(on?'switch-on':'switch-off');}});
 for(const id of ['sfxVolume','musicVolume']){const input=$(id),old=input.oninput;const output=document.createElement('output');output.htmlFor=id;output.textContent=Math.round(+input.value*100)+'%';input.after(output);input.oninput=e=>{old?.(e);output.textContent=Math.round(+input.value*100)+'%';};}
 $('doneSettings').className='primary';
}
function initializeAtelier(){
 const subtitles={campaign:'Fifteen worlds. Every star has a story.',heroes:'Ten identities. Two signature skills each.',pets:'Rescue a companion. Choose when to call.',forge:'Independent style. Never an advantage.',missions:'Complete objectives. Claim earned rewards.',records:'Personal results. Comparable rules.',profile:'Your journey, your achievements.',bosses:'Fifteen sovereigns. Three difficulty tiers.'};
 for(const [id,text] of Object.entries(subtitles)){const heading=$('page-'+id)?.querySelector('.page-heading>div');if(heading&&!heading.querySelector('.page-subtitle')){const p=document.createElement('p');p.className='page-subtitle';p.textContent=text;heading.append(p);}}
 for(const [id,art] of Object.entries(CONTROL_ART)){const b=$(id);if(b){b.innerHTML=icon(art.icon)+'<span>'+art.label+'</span>';b.setAttribute('aria-label',art.ariaLabel);b.dataset.asset=art.asset;}}
 if($('goldPlus'))$('goldPlus').onclick=()=>{click();showPage('forge');};
 if($('starPlus'))$('starPlus').onclick=()=>{click();showPage('campaign');};
 // Mode cards are reordered, not re-created, so their existing handlers survive.
 const actions=document.querySelector('.home-actions'),boss=$('bossHuntButton'),raid=$('nearbyButton'),endless=$('endlessButton');
 const duo=document.createElement('div');duo.className='home-duo';duo.append(raid,endless);actions.querySelector('.home-combat-row')?.remove();actions.insertBefore(boss,$('dailyButton'));actions.insertBefore(duo,$('dailyButton'));
 $('homeLoadout').textContent=loadoutDescription(save.hero);
 document.documentElement.dataset.uiRevision='local-atelier-1';
}
initializeAtelier();

function questThumbnail(stat,fallback){return ({coins:'quest-coins',kills:'quest-monster',skills:'quest-power',powers:'quest-potion',stars:'quest-shrine',clears:'flag',unique:'compass',endlessStage:'clock'})[stat]||fallback;}
````

## `game/atelier.css`

Tasks: 2,3,9. OLD SHA-256: `NEW FILE`. NEW SHA-256: `3b43e469ca73b1d61c6857faeb7cdcfc8f03d5916181c5c94c63f4fd4513e5b0`.

### insert: OLD 1–0; NEW 1–116

OLD
````text
````

NEW
````text
/* Local UI system — source rectangles: art-source/ui/crops.json.
   No external font requests. See docs/FONT-SETUP.md for the optional local font build. */
@font-face{font-family:'Pixelify Sans';src:local('Pixelify Sans');font-weight:400 700;font-display:swap}
@font-face{font-family:'VT323';src:local('VT323');font-weight:400;font-display:swap}
/*__OPTIONAL_FONTS__*/
:root{--font-display:'Pixelify Sans','Courier New',monospace;--font-body:'VT323','Courier New',monospace;--paper:#fff1c9;--gold:#edc370;--muted:#afc3d9;--mint:#8de9ee;--ink:#07142d;--safe-left:max(24px,env(safe-area-inset-left));--safe-right:max(24px,env(safe-area-inset-right));font-family:var(--font-body);font-size:15px;color:var(--paper)}
button,input,select,textarea{font-family:var(--font-body)}
button{min-height:44px;line-height:1.2}select,input:not([type=range]){min-height:44px;font-size:14px;background:#071a37;color:var(--paper);border:1px solid #9a874f;border-radius:0;padding:6px 9px;max-width:100%}
button:focus-visible,select:focus-visible,input:focus-visible,summary:focus-visible{outline:3px solid #9de9ff;outline-offset:2px}
button:disabled{opacity:.6;filter:saturate(.4)}
img,canvas{image-rendering:pixelated} .ico.ui-icon{object-fit:contain;image-rendering:pixelated;vertical-align:middle}
/* One nine-slice component for shared panels. Source corners are never redrawn. */
.pixel-panel,.map-details,.hero-details,.pet-details,.forge-preview,.forge-catalog,.dashboard-detail,.dashboard-list,.premium-profile-header,.profile-progress-panel,.profile-achievements,.modal-panel,.skill-forge,.fusion-catalog{
 border:16px solid transparent;border-image:url('asset:ui/frames/panel') 30 fill / 16px / 0 stretch;
 border-radius:0;background:transparent;box-shadow:none;min-width:0;padding:14px;
}
.primary,.secondary,.chip,.wallet,.star-wallet,.profile,.icon-button,.segment button,.profile-tabs button,.wardrobe-tabs button,.forge-carousel button,.detail-buttons button{border:10px solid transparent;border-image:url('asset:ui/frames/button') 18 fill / 10px / 0 stretch;border-radius:0;background:transparent;box-shadow:none;color:var(--paper)}
.primary{border-image-source:url('asset:ui/frames/button-large');border-image-slice:24 fill;border-image-width:12px;min-height:48px;font-weight:bold;font-size:17px;color:#2a200f;text-shadow:0 1px #fff3bb;justify-content:center}
.secondary{font-size:13px;min-height:44px;padding:5px 9px}
.primary .ico{width:24px;height:24px}.primary:hover{filter:brightness(1.12)}
.segment{padding:0;background:none;border:0;gap:5px;flex-wrap:wrap;min-height:44px}.segment button{min-height:44px;min-width:72px;padding:5px 10px;font-size:14px}
.segment button.selected,.profile-tabs button.selected,.wardrobe-tabs button.selected{border-image-source:url('asset:ui/frames/tab-selected');color:#fff0be}
#menu{padding:12px var(--safe-right) 10px var(--safe-left);gap:10px;isolation:isolate}
#menu::before{content:'';position:absolute;inset:0;background:#07152b24;z-index:-1;pointer-events:none}
.topbar{height:76px;min-height:76px;gap:14px;padding:0;align-items:center}
.profile{min-width:245px;max-width:40%;height:72px;min-height:64px;padding:5px 20px 5px 8px;border-image-source:url('asset:ui/frames/identity');border-image-slice:30 fill;border-image-width:14px;gap:10px}
.profile canvas{width:52px;height:54px;border:7px solid transparent;border-image:url('asset:ui/frames/portrait') 24 / 8px / 0 stretch;border-radius:0;background:#123155}
.profile span{min-width:0;flex:1;gap:3px}.profile strong{font:700 19px var(--font-display);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.profile small{font-size:10px;letter-spacing:.5px;line-height:1.1;color:#d5dcea}
.profile #xpFraction{font-size:9px;line-height:1;align-self:flex-end;color:#d8f3ff}.xp-track{width:100%;height:6px;border-radius:0;background:#081022;position:relative}.xp-track i{border-radius:0;background:#65cde9;box-shadow:inset 0 1px #c2fcff}
.topright{gap:8px}.wallet,.star-wallet{border-image-source:url('asset:ui/frames/currency');border-image-slice:18 fill;height:56px;padding:0 7px;gap:7px;font-size:22px;white-space:nowrap}.wallet .ico,.star-wallet .ico{width:32px;height:32px}.star-wallet small{font-size:13px}
.wallet-plus{border:0;min-width:44px;min-height:44px;padding:4px;display:grid;place-items:center}.wallet-plus .ico{width:29px;height:29px}.icon-button{width:52px;height:52px;min-height:52px;padding:3px}.icon-button .ico{width:31px;height:31px}
.bottom-nav{width:100%;max-width:none;height:80px;min-height:64px;padding:6px;gap:4px;align-self:stretch;border:12px solid transparent;border-image:url('asset:ui/frames/nav') 18 fill / 12px / 0 stretch;border-radius:0;box-shadow:none;background:none}
.bottom-nav>button{height:60px;min-height:50px;flex:1;gap:4px;flex-direction:column;border:9px solid transparent;border-image:url('asset:ui/frames/tab') 17 fill / 9px / 0 stretch;border-radius:0;color:#d6d8da;padding:1px 2px;box-shadow:none}
.bottom-nav>button .ico{width:29px;height:29px}.bottom-nav>button>span{font-size:13px;line-height:1.1;font-weight:400}.bottom-nav>button.active{border-image-source:url('asset:ui/frames/tab-selected');color:#ffeab2;filter:drop-shadow(0 0 4px #f8bd6355);background:none;box-shadow:none}.bottom-nav>button.active:after{display:none}.notification{background:#ee5468;border:1px solid #ffd2be;height:8px;width:8px;top:4px;right:15%;border-radius:50%}
#pages{min-height:0}.page{padding:0;min-height:0}.page.active{overflow:hidden}
.page-heading{min-height:92px;padding:4px 10px 14px;gap:12px;align-items:center;overflow:visible}
.page-heading>div:first-child{min-width:0}.page-heading h2{font:700 clamp(25px,3.1vw,51px)/1.04 var(--font-display);letter-spacing:-1px;margin:4px 0 5px;color:#ffdf98;background:linear-gradient(#fff5d1 15%,#ffe9ab 47%,#d8a650 51%,#f4d994 100%);background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(2px 3px 0 #040c22);max-width:100%}
.eyebrow,.detail-overline{font-size:11px;letter-spacing:1.7px;color:#9eeaff;font-weight:400;line-height:1.2}.page-heading .eyebrow{font-size:10px;letter-spacing:1.5px}.page-subtitle{margin:0;font-size:14px;line-height:1.2;color:#c1d3e4}.subtle,.local-badge{font-size:12px;color:#c1d3e4;max-width:230px}.local-badge{background:none;white-space:normal}
h3{font-family:var(--font-display);font-size:25px;line-height:1.1;letter-spacing:-.6px;color:#ffe8aa}h4{font-family:var(--font-display);font-size:18px;line-height:1.15;letter-spacing:0}
p{line-height:1.45}small{line-height:1.2}.muted,.shop-policy{color:#b9cde0;font-size:13px;line-height:1.45}
/* Home: logo/metadata — hero pedestal — distinct mode cards. */
#page-home.active{display:block;overflow:hidden}.home-title{left:1%;top:4%;width:29%;height:90%;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:8px}.home-title .eyebrow{font-size:10px;color:#b6e8f5;letter-spacing:1.2px;text-shadow:1px 2px #050d21}.home-title .logo-lockup{width:100%;height:auto;max-height:57%;margin:0;transform:none;filter:drop-shadow(3px 6px #040a2499)}.logo-lockup img{width:100%;height:100%;max-height:34vh;object-fit:contain}.home-title p{color:#e8d7b3;font-size:18px;line-height:1.4;margin:0;text-shadow:1px 2px #000}.home-tags{gap:7px;margin:6px 0;flex-wrap:wrap}.home-tags span{border:8px solid transparent;border-image:url('asset:ui/frames/price') 14 fill / 8px / 0 stretch;border-radius:0;background:none;color:#efd58d;font-size:10px;padding:2px 6px;letter-spacing:.5px}.home-forge{border:10px solid transparent;border-image:url('asset:ui/frames/button') 18 fill / 10px / 0 stretch;border-radius:0;min-height:44px;font-size:13px;padding:3px 12px;width:100%;color:#f4d792;background:none;box-shadow:none}.home-forge .ico{width:27px;height:27px}
.hero-label{left:46%;top:auto;bottom:3%;transform:translateX(-50%);width:28%;max-width:410px;min-height:95px;padding:8px 15px;border:14px solid transparent;border-image:url('asset:ui/frames/identity') 26 fill / 14px / 0 stretch;border-radius:0;background:none;box-shadow:none}.hero-label span{font:700 25px var(--font-display);letter-spacing:2px;color:#ffe8a8}.hero-label small{font-size:11px;line-height:1.3;letter-spacing:.5px}.hero-label #homeLoadout{font-size:10px;color:#d9d8b9}.hero-label button{min-height:44px;margin:1px 0 0;padding:2px 6px;font-size:12px;color:#99e1f9;border:0;background:none}
.home-actions{right:0;top:3%;bottom:3%;width:36%;display:grid;grid-template-rows:1.15fr 1fr .85fr .75fr;gap:10px}.home-actions>*{min-height:0}.mode-card,.home-combat{width:100%;height:auto;min-height:58px;margin:0;border:14px solid transparent;border-image:url('asset:ui/frames/panel') 30 fill / 14px / 0 stretch;border-radius:0;background:none!important;box-shadow:none;color:#fff0c8;padding:12px 17px;gap:12px;position:relative;overflow:visible;display:flex;align-items:center;text-align:left}
.mode-card:before{display:none}.campaign-card{border-image-source:url('asset:ui/frames/button-large');border-image-slice:24 fill;color:#2b240f}.mode-icon{width:45px;height:45px;border-radius:0;background:none;align-self:center}.mode-icon .ico{width:43px;height:43px}.mode-text>small{font:700 25px var(--font-display);color:#3b2a10;letter-spacing:1px}.mode-text>strong{font-size:16px;color:#332916}.mode-text>em{font-size:12px;color:#4c3b25}.play-badge{background:none;color:#453312;align-self:center;width:28px;height:28px}.home-combat>.ico,.mode-card>.ico:first-child{width:39px;height:39px}.home-combat>span{display:flex;flex-direction:column;gap:6px;min-width:0;font:700 23px var(--font-display)}.home-combat small,.mode-card>span>small{display:block;white-space:normal;font:12px/1.3 var(--font-body);color:#bdd1e4;opacity:1}.home-duo{display:grid;grid-template-columns:1fr 1fr;gap:8px}.home-duo .home-combat,.home-duo .mode-card{padding:6px 8px;gap:6px}.home-duo .home-combat>span,.home-duo .mode-card>span>strong{font:700 17px var(--font-display)}.home-duo .ico:first-child{width:28px;height:28px}.home-duo small{font-size:10px}.daily-card>span>strong{font:700 21px var(--font-display)}.mode-card>.ico:last-child{width:18px;height:18px}
/* Selection pages share the same panel/grid structure, not a horizontal carousel. */
.map-layout,.hero-layout,.pet-layout{display:grid;grid-template-columns:minmax(0,1.65fr) minmax(280px,1fr);gap:14px;min-height:0;flex:1;padding:0 0 2px;overflow:hidden}
.map-scroll,.hero-grid,.pet-grid,.map-details,.hero-details,.pet-details{overflow:auto;touch-action:pan-y;min-height:0;scrollbar-width:thin;scrollbar-color:#9e8150 #091830}
#mapGrid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;padding:0 5px 10px}.chapter-label{font-size:12px;letter-spacing:1px;line-height:1.5;color:#a0d0e5;padding:4px 0;margin:0}.chapter-label:after{background:#c6a56477}
.map-card,.hero-card,.pet-card,.piece-card,.outfit-card{border:12px solid transparent;border-image:url('asset:ui/frames/hero-card') 24 fill / 12px / 0 stretch;border-radius:0;background:transparent;box-shadow:none;overflow:hidden;padding:6px;position:relative;min-width:0}
.map-card.selected,.hero-card.selected,.pet-card.selected,.piece-card.selected,.weapon-choice.selected{border-image-source:url('asset:ui/frames/hero-selected');box-shadow:none}.map-card{min-height:130px}.map-card canvas{height:auto;aspect-ratio:1.8;width:100%;border-radius:0}.map-name{font-size:13px;line-height:1.2;min-height:34px;padding:5px 0 1px}.map-number{font-size:11px;top:4px;left:4px;border-radius:0;padding:3px;background:#071027e6}.map-lock .ico{width:23px;height:23px}.map-stars{justify-content:center;padding:3px 0}.map-stars .ico{width:18px;height:18px}.map-stars i:not(.star-earned){filter:grayscale(1);opacity:.35}.map-card.locked canvas{filter:saturate(.35);opacity:.55}
.detail-art{border-radius:0;height:auto;aspect-ratio:2.3}.map-details h3{font-size:29px;margin:6px 0}.map-details p,.objective{font-size:14px;line-height:1.4}.objective .ico{width:22px;height:22px}.difficulty span{font-size:12px}.map-details>.primary,.hero-details>.primary,.pet-details>.primary{width:100%;margin:8px 0}.detail-overline{font-size:11px}.map-summary .primary{width:100%}
.hero-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));grid-auto-rows:minmax(160px,1fr);gap:12px;align-content:stretch;padding:0 4px 5px;overflow-x:hidden}.hero-card{display:flex;flex-direction:column;align-items:center;min-height:160px;height:auto;max-height:none;gap:3px}.hero-card canvas{width:100%;height:calc(100% - 53px);min-height:80px;object-fit:contain;flex:1;position:static;border-radius:0;background:none}.hero-card strong{font:700 19px var(--font-display);line-height:1.1;padding:0;color:#ffe4a2;position:static}.hero-card small{font-size:10px;line-height:1.2;white-space:normal;position:static}.hero-equipped{height:12px;font-size:8px;color:#a4ebf5;letter-spacing:.5px}.hero-card .hero-skill-icon{display:none}
.hero-detail-top{display:flex;align-items:center;gap:13px;min-height:95px;margin:0 0 5px}.hero-detail-top canvas{width:95px;height:112px;border:0;border-radius:0;background:none}.hero-detail-top h3{font-size:34px;margin:3px 0}.hero-detail-top small{font-size:13px}.hero-stat-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px;margin:6px 0}.hero-stat-grid>div{position:relative;border:1px solid #7f713f;background:#0b1d38;padding:7px 5px;display:flex;gap:4px;align-items:center;min-width:0}.hero-stat-grid .ico{width:23px;height:23px}.hero-stat-grid span{font-size:9px;min-width:0}.hero-stat-grid strong{display:block;font:700 20px var(--font-display);color:#ffe6a7}.hero-stat-grid meter{position:absolute;bottom:1px;left:3px;width:calc(100% - 6px);height:3px;appearance:none}.hero-stat-grid meter::-webkit-meter-bar{background:#142849;border:0}.hero-stat-grid meter::-webkit-meter-optimum-value{background:#c8a95b}.loadout-note{font-size:11px;line-height:1.4;color:#b9dced;margin:8px 0}.art-pending{color:#f1ce92!important}.pixel-skills{display:flex;flex-direction:column;gap:8px}.pixel-skills article{display:flex;align-items:flex-start;gap:9px;padding:7px 0;border-top:1px solid #b29a5838}.pixel-skills article>img,.pixel-skills .asc-skill-icon{width:39px;height:39px;object-fit:contain;flex-shrink:0}.pixel-skills b{font-family:var(--font-display);font-size:17px}.pixel-skills small{display:block;color:#8ed6e8;font-size:11px;margin:3px 0}.pixel-skills p{margin:0;color:#c1d2e0;font-size:13px;line-height:1.35}.detail-buttons{display:grid;grid-template-columns:1fr 1fr;gap:5px}.hero-stat-help{font-size:12px;color:#bfd1dd;margin-top:10px}.hero-stat-help summary{min-height:44px;display:flex;align-items:center;cursor:pointer;color:#eddaae}.hero-stat-help p{margin:6px 0}
.pet-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:minmax(172px,1fr);gap:12px;padding:0 4px 5px}.pet-card{min-height:170px;display:flex;flex-direction:column;align-items:center;gap:4px}.pet-card>img{height:110px;max-height:62%;width:100%;object-fit:contain;min-height:60px}.pet-card strong{font:700 18px var(--font-display);line-height:1.1}.pet-card small,.pet-rarity{font-size:10px;white-space:normal}.pet-card.locked img{filter:grayscale(.7);opacity:.65}.pet-lock .ico{width:28px;height:28px}.pet-details .pet-detail-art{height:120px;width:100%;object-fit:contain}.pet-details h3{font-size:30px;margin:4px 0}.pet-details p,.pet-skill small{font-size:12px;line-height:1.4}.pet-skill b{font-size:16px}.summon-spec{gap:5px}.summon-spec span{font-size:8px}.summon-spec b{font-size:19px}.unlock-note{border:1px solid #ab9251;padding:10px;color:#ead5a5}.pet-details .secondary{width:100%}
/* Shop: stable preview left, hero/category/catalog right. */
.forge-content{overflow:hidden;display:grid;grid-template-columns:minmax(220px,.75fr) minmax(0,1.6fr);gap:14px;flex:1;min-height:0;padding:0}.forge-preview,.forge-catalog{overflow:auto;touch-action:pan-y;min-height:0}.forge-preview.pixel-preview{display:flex;flex-direction:column;align-items:center;text-align:center;gap:5px;justify-content:flex-start}.pixel-preview canvas{width:100%;max-width:300px;height:55%;min-height:130px;object-fit:contain}.pixel-preview h3{font-size:29px;margin:0}.pixel-preview p{font-size:12px;line-height:1.4}.pixel-preview small{font-size:12px;color:#adcedb}.forge-catalog{display:flex;flex-direction:column;gap:10px}.forge-carousel{min-height:60px;gap:8px;display:flex;align-items:center;flex-shrink:0}.forge-carousel>button{width:44px;min-height:44px;padding:2px;font-size:25px}.forge-carousel #forgeHeroCard{flex:1;display:flex;align-items:center;gap:10px;min-width:0}.forge-carousel img{width:43px;height:54px;object-fit:contain}.forge-carousel b{font:700 21px var(--font-display)}.forge-carousel small{display:block;font-size:11px;color:#b8cbdd}.wardrobe-tabs{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:4px}.wardrobe-tabs button{padding:5px 4px;font-size:11px;min-height:44px;line-height:1.15}.piece-catalog{display:grid;grid-template-columns:1fr 1fr;gap:10px;min-height:205px}.piece-card{display:flex;flex-direction:column;align-items:center;text-align:center;padding:12px;gap:5px}.piece-card>.ico{width:52px;height:52px}.piece-card h4{margin:0;font-size:20px}.piece-card p{margin:5px 0;font-size:12px;line-height:1.35}.piece-card button{margin-top:auto;width:100%;min-height:44px;font-size:13px}.shop-policy{margin:0;font-size:12px}.legacy-looks{border-top:1px solid #9d864766;font-size:12px;color:#bfd0dd;padding:6px 0}.legacy-looks summary{min-height:44px;display:flex;align-items:center;color:#f6dfa1;cursor:pointer}.legacy-outfits{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.legacy-outfits button{display:flex;flex-direction:column;align-items:center;min-height:150px;border:10px solid transparent;border-image:url('asset:ui/frames/hero-card') 22 fill / 10px / 0 stretch;padding:4px}.legacy-outfits img{height:100px;width:100%;object-fit:contain}.legacy-outfits b{font-size:15px}.legacy-outfits small{font-size:10px}.trails{display:flex;flex-wrap:wrap;gap:5px}.trail-button{height:auto;min-height:44px;min-width:80px;flex:1;padding:4px}.trail-button small{font-size:10px}
.skill-forge,.fusion-catalog{grid-column:1/-1;overflow:auto;touch-action:pan-y}.skill-library{gap:9px}.library-card,.fusion-card{border:12px solid transparent;border-image:url('asset:ui/frames/hero-card') 24 fill / 12px / 0 stretch;border-radius:0;background:none}.library-card button{min-height:44px}.fusion-card h4{font-size:20px}.fusion-card p{font-size:13px}
/* Missions: actual counters, collectible source-sheet thumbnails, 3-column grid. */
.quest-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-auto-rows:minmax(200px,1fr);gap:14px;overflow:auto;touch-action:pan-y;padding:0 2px 5px;min-height:0}.quest-card{display:flex;flex-direction:column;border:14px solid transparent;border-image:url('asset:ui/frames/quest') 22 fill / 14px / 0 stretch;border-radius:0;background:none;padding:12px;min-height:200px;box-shadow:none}.quest-head{gap:10px;min-height:57px}.quest-icon{width:61px;height:61px;background:none;border:0;border-radius:0;flex-shrink:0}.quest-icon .ico{width:54px;height:54px}.quest-head strong{font:700 21px/1.15 var(--font-display);color:#ffe6a8}.quest-card>p{font-size:13px;line-height:1.4;margin:6px 0 14px;flex:1}.quest-progress{height:9px;background:#081125;border:1px solid #8a7a52;border-radius:0}.quest-progress>i{background:#55abc6;border-radius:0}.quest-foot{font-size:13px;margin-top:10px;gap:8px}.quest-claim{min-height:44px;min-width:95px;border:9px solid transparent;border-image:url('asset:ui/frames/button') 18 fill / 9px / 0 stretch;border-radius:0;background:none;padding:3px 8px;font-size:14px}.quest-claim.ready{border-image-source:url('asset:ui/frames/button-gold');color:#291f11}.quest-claim .ico{width:24px;height:24px}.quest-claim.claimed{color:#acc2d1}
/* Records: one top filter strip, explanatory/details panel left, true device records right. */
.record-content{overflow:hidden;min-height:0;flex:1;padding:0}.record-dashboard.pixel-records{display:grid;grid-template-columns:minmax(240px,.75fr) minmax(0,1.5fr);grid-template-rows:auto minmax(0,1fr);gap:13px;height:100%;padding:0}.pixel-records .dashboard-filters{grid-column:1/-1;display:flex;gap:8px;padding:0;overflow:auto;background:none;border:0;border-radius:0;flex-wrap:nowrap}.dashboard-filters label{font-size:10px;color:#bcd3e3;min-width:100px;flex:1}.dashboard-filters select{width:100%;font-size:12px;min-height:44px;margin-top:4px}.pixel-records .dashboard-list,.pixel-records .dashboard-detail{min-height:0;overflow:auto;touch-action:pan-y}.dashboard-list>h3,.dashboard-detail>h3{font-size:21px;margin:1px 0 12px}.record-detail-grid{display:grid;grid-template-columns:1fr;gap:0}.record-detail-grid>div{display:flex;justify-content:space-between;gap:12px;padding:8px 0;border-bottom:1px solid #c4a75725}.record-detail-grid small{font-size:11px;color:#b9cde0}.record-detail-grid b{font-size:12px;text-align:right}.rank-table-head,.dashboard-row{display:grid;grid-template-columns:44px minmax(0,1fr) minmax(130px,.7fr);align-items:center;gap:9px}.rank-table-head{font-size:10px;letter-spacing:1px;color:#abcee4;border-bottom:1px solid #9e8655;padding:4px 8px 9px}.dashboard-row{width:100%;min-height:60px;border:0;border-bottom:1px solid #a48c4c33;background:#10213c88;border-radius:0;padding:8px;font-size:15px;text-align:left}.dashboard-row.selected{background:#bea76420}.dashboard-row small{font-size:10px;display:block;color:#b6cedc;margin-top:4px}.dashboard-row>b{font:700 22px var(--font-display);color:#e8c680}.dashboard-empty{display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px;min-height:200px;font-size:13px;text-align:center}.dashboard-empty>.ico{width:65px;height:65px}.dashboard-empty h3{margin:0;font-size:25px}.dashboard-empty p{max-width:340px;margin:0}.dashboard-empty .primary{min-width:180px}
/* Profile: persistent identity panel and a real progression / achievement workspace. */
.profile-content.pixel-profile{display:grid;grid-template-columns:minmax(235px,.8fr) minmax(0,1.6fr);grid-template-rows:auto minmax(0,1fr);gap:13px;overflow:hidden;padding:0;min-height:0;flex:1}.profile-tabs{grid-column:1/-1;display:flex;gap:7px;margin:0;overflow:auto;flex-shrink:0}.profile-tabs button{min-height:44px;min-width:90px;padding:5px 12px;font-size:13px;flex:1}.premium-profile-header{display:flex;flex-direction:column;gap:10px;align-items:stretch;overflow:auto;min-height:0}.premium-profile-header>.player-card{min-width:0;width:100%;max-width:100%}.premium-profile-header>div>small{font-size:11px;color:#bdd0df}.premium-profile-header>div>b{font:700 18px var(--font-display);color:#f2d79d}.premium-profile-header progress{width:100%;height:10px;margin:7px 0}.profile-showcase{display:flex;align-items:center;justify-content:center;flex-wrap:wrap}.profile-showcase img{width:100px;height:115px;object-fit:contain}.profile-showcase small{flex-basis:100%;text-align:center}.profile-tab-body{overflow:auto;touch-action:pan-y;min-height:0;background:none;border:0;padding:0}.profile-progress-panel{padding:10px 14px;margin:0 0 10px}.profile-progress-panel h3{font-size:25px;margin:5px 0}.profile-progress-panel progress{width:100%;height:12px}.profile-progress-panel p{font-size:13px;margin:5px 0}.premium-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.premium-stats article{border:10px solid transparent;border-image:url('asset:ui/frames/quest') 18 fill / 10px / 0 stretch;border-radius:0;background:none;padding:8px;min-height:76px}.premium-stats strong{font:700 23px var(--font-display);line-height:1.15;color:#ffe6a2}.premium-stats small{font-size:11px;line-height:1.2;display:block;margin-bottom:6px;color:#c2d4df}.profile-achievements{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:10px;padding:10px}.profile-achievements h3{grid-column:1/-1;font-size:20px;margin:0 0 3px}.profile-achievements>div{display:flex;flex-direction:column;align-items:center;text-align:center;gap:4px;font-size:10px}.profile-achievements .ico{width:46px;height:46px}.profile-achievements .unearned{filter:grayscale(.8);opacity:.6}.profile-achievements small{font-size:9px}.profile-editor,.social-panel{background:#102441aa;border-radius:0;padding:14px}.profile-editor label{font-size:13px}.profile-roster{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}.profile-roster button{min-height:115px}.profile-roster img{width:100%;height:75px;object-fit:contain}.profile-roster b{font-size:13px}.profile-roster small{font-size:9px}
/* Boss trial: horizontal gallery with its own three-option tier selector. */
.boss-grid{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(200px,22%);grid-template-columns:none;grid-template-rows:1fr;gap:14px;overflow-x:auto;overflow-y:hidden;touch-action:pan-x;min-height:0;flex:1;padding:0 3px 10px}.boss-card{border:14px solid transparent;border-image:url('asset:ui/frames/hero-card') 26 fill / 14px / 0 stretch;border-radius:0;background:none;box-shadow:none;display:flex;flex-direction:column;align-items:center;padding:10px;min-height:0;gap:8px;min-width:0;text-align:center}.boss-card>img{width:100%;height:57%;min-height:90px;object-fit:contain}.boss-world{font-size:11px;color:#aed4e6}.boss-card>strong{font:700 25px/1.1 var(--font-display);color:#ffe7a7}.boss-card>small{font-size:12px;line-height:1.4;flex:1}.boss-card>em{font-style:normal;font-size:12px;color:#e9c679}#bossDifficulty{white-space:normal;gap:5px;flex-wrap:nowrap}#bossDifficulty button{font-size:13px;min-width:90px}
/* Settings is a dialog over the same shell, not a disconnected page. */
#modal{padding:16px var(--safe-right) 16px var(--safe-left)}.modal-backdrop{background:#020717c9;backdrop-filter:none}.modal-panel{max-width:1050px;width:min(100%,1050px);max-height:94%;padding:18px 22px;overflow:auto;touch-action:pan-y;color:#f3e4c3}.modal-panel h2{font:700 clamp(25px,3vw,43px)/1.08 var(--font-display);color:#ffdf9e;margin:7px 0}.modal-panel>p{font-size:14px}.modal-panel header{margin-bottom:12px}.modal-panel header .icon-button{min-width:44px;min-height:44px}.pixel-settings{max-width:1080px}.setting-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}.setting{display:grid;grid-template-columns:30px minmax(0,1fr) auto;gap:8px;align-items:center;border:10px solid transparent;border-image:url('asset:ui/frames/setting-row') 18 fill / 10px / 0 stretch;border-radius:0;background:none;min-height:57px;padding:6px 8px;text-align:left}.setting>.ico{width:28px;height:28px}.setting>span{font-size:14px;line-height:1.2}.setting>small{font-size:11px;color:#dcc995}.setting small.switch-on,.setting small.switch-off{min-width:54px;min-height:28px;display:flex;align-items:center;justify-content:center;border:8px solid transparent;border-image:url('asset:ui/frames/toggle-on') 15 fill / 8px / 0 stretch;background:none;border-radius:0;font-size:9px;color:#f4ebc9;padding:0 2px}.setting small.switch-off{border-image-source:url('asset:ui/frames/toggle-off');color:#cbd7dd}.volume-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:14px 0}.volume-row label{display:grid;grid-template-columns:auto 1fr 42px;align-items:center;gap:10px;font-size:14px}.volume-row input{height:30px;min-width:0;width:100%;accent-color:#deb654}.volume-row output{font-size:14px;color:#ffe1a6}.settings-footer{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}.settings-footer button{width:100%}.control-studio-entry{background:none;border:0;border-radius:0;padding:8px 0;margin-bottom:10px;gap:10px}.control-studio-entry b{font-size:14px}.control-studio-entry small{font-size:10px}.preset-quick button{min-width:44px;min-height:44px;font-size:12px}.pixel-settings>.secondary{font-size:11px;min-height:44px;margin-top:8px}.weapon-catalog{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;max-height:47vh;overflow:auto;touch-action:pan-y}.weapon-choice{border:11px solid transparent;border-image:url('asset:ui/frames/hero-card') 23 fill / 11px / 0 stretch;border-radius:0;background:none;display:flex;flex-direction:column;gap:5px;align-items:center;min-height:160px;padding:8px;text-align:center}.weapon-choice img{width:78px;height:78px;object-fit:contain}.weapon-choice b{font-size:13px;color:#f4daa3}.weapon-choice small{font-size:10px;line-height:1.3;color:#bdd4e1}.unarmed-word{height:78px;display:flex;align-items:center;justify-content:center;font:700 18px var(--font-display);color:#b9edf1}
#crouchControl{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px}#crouchControl>.ico{width:27px;height:21px}#crouchControl>span{display:block;font:700 8px var(--font-display);position:static;line-height:1;color:#fff1cd}#crouchControl.pressed{background:#42656d}#crouchControl[hidden]{display:none!important}
body:has(#modal:not([hidden]) #modalPanel[data-modal=settings]) #navSettings{border-image-source:url('asset:ui/frames/tab-selected')}
#toast{font-size:15px;line-height:1.4;max-width:80vw;border-radius:0;background:#071832f5;border:1px solid #c4a465;padding:12px 18px}
progress{accent-color:#74cbe0}progress::-webkit-progress-bar{background:#0b1429;border:1px solid #7c7155}progress::-webkit-progress-value{background:#59bbd6}
@media(max-width:1100px){
 :root{font-size:13px}#menu{gap:6px;padding-top:8px;padding-bottom:6px}.topbar{height:62px;min-height:62px}.profile{height:60px;min-height:60px;min-width:205px;padding:3px 14px 3px 4px}.profile canvas{width:45px;height:46px}.profile strong{font-size:17px}.profile small{font-size:8px}.profile #xpFraction{font-size:8px}.wallet,.star-wallet{height:48px;font-size:19px;padding:0 4px;gap:3px}.wallet .ico,.star-wallet .ico{width:26px;height:26px}.icon-button{width:46px;height:46px;min-height:46px}.topright{gap:5px}.wallet-plus{padding:4px;min-width:44px}.bottom-nav{height:62px;min-height:62px;padding:3px;gap:2px}.bottom-nav>button{height:48px;min-height:48px;gap:2px}.bottom-nav>button .ico{width:22px;height:22px}.bottom-nav>button>span{font-size:10px}.page-heading{min-height:75px;padding:2px 6px 10px}.page-heading h2{font-size:30px}.page-heading .eyebrow{font-size:8px}.page-subtitle{font-size:11px}.map-layout,.hero-layout,.pet-layout{grid-template-columns:minmax(0,1.5fr) minmax(270px,1fr);gap:10px}.hero-grid{gap:7px;grid-auto-rows:minmax(130px,1fr)}.hero-card{min-height:130px;padding:3px;border-image-width:10px}.hero-card canvas{min-height:64px}.hero-card strong{font-size:16px}.hero-card small{font-size:8px}.hero-equipped{font-size:7px}.hero-details,.map-details,.pet-details{padding:9px;border-image-width:12px}.hero-detail-top canvas{width:69px;height:83px}.hero-detail-top{min-height:75px;gap:8px}.hero-detail-top h3{font-size:27px}.hero-detail-top small{font-size:11px}.hero-stat-grid{gap:3px}.hero-stat-grid>div{padding:6px 3px;gap:2px}.hero-stat-grid .ico{width:18px;height:18px}.hero-stat-grid span{font-size:8px}.hero-stat-grid strong{font-size:17px}.pixel-skills p{font-size:11px}.pixel-skills b{font-size:15px}.pixel-skills small{font-size:10px}.pixel-skills article>img{width:28px;height:28px}.loadout-note{font-size:9px}.detail-buttons .secondary{font-size:10px}.pet-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;grid-auto-rows:150px}.pet-card{min-height:150px}.pet-card>img{height:80px}.pet-card strong{font-size:16px}.pet-card small{font-size:8px}.pet-details .pet-detail-art{height:90px}.pet-details p{font-size:11px}.map-card{min-height:105px;padding:3px}.map-name{font-size:10px;min-height:26px}.map-stars .ico{width:13px;height:13px}#mapGrid{gap:8px}.chapter-label{font-size:9px}.detail-art{margin-bottom:8px}.map-details h3{font-size:25px}.map-details p,.objective{font-size:11px}.home-title p{font-size:15px}.home-title .eyebrow{font-size:8px}.home-forge{font-size:11px}.home-tags{gap:4px}.home-tags span{font-size:8px;padding:1px 3px}.home-actions{gap:7px;top:0;bottom:0}.mode-card,.home-combat{padding:7px 10px;gap:7px;min-height:50px;border-image-width:11px}.mode-text>small{font-size:21px}.mode-text>strong{font-size:13px}.mode-text>em{font-size:10px}.mode-icon,.mode-icon .ico{width:32px;height:32px}.home-combat>span{font-size:20px}.home-combat small,.mode-card>span>small{font-size:10px}.hero-label{bottom:0;min-height:80px;padding:4px 10px}.hero-label span{font-size:21px}.hero-label small{font-size:9px}.hero-label #homeLoadout{font-size:8px}.hero-label button{font-size:10px;min-height:35px}.home-duo .home-combat>span,.home-duo .mode-card>span>strong{font-size:14px}.home-duo small{font-size:8px}.home-duo .ico:first-child{width:22px;height:22px}.daily-card>span>strong{font-size:18px}.quest-list{gap:10px;grid-auto-rows:minmax(175px,1fr)}.quest-card{min-height:175px;padding:8px}.quest-head strong{font-size:17px}.quest-icon{width:45px;height:45px}.quest-icon .ico{width:42px;height:42px}.quest-card>p{font-size:11px}.quest-foot{font-size:11px}.quest-claim{font-size:12px;min-width:84px}.forge-content{grid-template-columns:minmax(200px,.75fr) minmax(0,1.6fr);gap:10px}.forge-catalog,.forge-preview{padding:9px}.wardrobe-tabs{grid-template-columns:repeat(3,1fr)}.wardrobe-tabs button{font-size:11px}.piece-card h4{font-size:17px}.piece-card p{font-size:11px}.piece-catalog{min-height:180px}.shop-policy{font-size:11px}.profile-content.pixel-profile{grid-template-columns:minmax(210px,.8fr) minmax(0,1.6fr);gap:9px}.profile-tabs{gap:5px}.profile-tabs button{font-size:11px;min-width:75px;padding:4px 5px}.premium-profile-header{padding:9px}.premium-stats{gap:6px}.premium-stats article{padding:5px;min-height:68px}.premium-stats strong{font-size:18px}.premium-stats small{font-size:9px}.profile-achievements .ico{width:36px;height:36px}.dashboard-filters select{font-size:10px;padding:4px}.dashboard-filters label{min-width:95px;font-size:9px}.record-dashboard.pixel-records{grid-template-columns:minmax(200px,.8fr) minmax(0,1.4fr);gap:9px}.dashboard-list,.dashboard-detail{padding:9px}.boss-grid{grid-auto-columns:23%;gap:10px}.boss-card{padding:6px;border-image-width:12px}.boss-card>strong{font-size:20px}.boss-card>small,.boss-world{font-size:10px}.boss-card>em{font-size:10px}#bossDifficulty button{font-size:11px;min-width:77px;padding:4px 6px}.setting-grid{gap:7px}.setting{padding:4px;gap:5px;grid-template-columns:23px minmax(0,1fr) auto;min-height:52px}.setting>span{font-size:12px}.setting>.ico{width:24px;height:24px}.setting>small{font-size:10px}.modal-panel{padding:12px}.volume-row{gap:14px}.volume-row label{font-size:12px;gap:5px}.modal-panel h2{font-size:29px}.weapon-choice{min-height:150px}.weapon-choice b{font-size:11px}
}
@media(max-height:470px){
 #menu{padding-top:5px;padding-bottom:5px;gap:4px}.topbar{height:56px;min-height:56px}.profile{min-height:54px;height:54px}.profile canvas{width:40px;height:42px}.profile #xpFraction{display:none}.bottom-nav{min-height:56px;height:56px}.bottom-nav>button{height:44px;min-height:44px}.bottom-nav>button .ico{width:20px;height:20px}.page-heading{min-height:64px;padding-bottom:6px}.page-heading h2{font-size:25px;letter-spacing:-.7px;margin:3px 0}.page-heading .eyebrow{font-size:7px}.page-subtitle{font-size:10px}.home-title{top:0;height:100%;gap:3px}.home-title .eyebrow{font-size:7px}.logo-lockup img{max-height:30vh}.home-title p{font-size:12px}.home-tags{margin:2px 0;gap:2px}.home-tags span{font-size:7px}.home-forge{font-size:10px;min-height:44px}.home-actions{grid-template-rows:1.1fr .9fr .8fr .75fr;gap:5px}.mode-card,.home-combat{padding:4px 7px;min-height:44px;border-width:9px;border-image-width:10px}.mode-text>small{font-size:18px}.mode-text>strong{font-size:12px}.mode-text>em{font-size:8px}.home-combat>span{font-size:17px}.home-combat small,.mode-card>span>small{font-size:8px}.home-combat>.ico,.mode-card>.ico:first-child{width:24px;height:24px}.home-duo .home-combat>span,.home-duo .mode-card>span>strong{font-size:12px}.home-duo small{font-size:7px}.home-duo .ico:first-child{display:none}.daily-card>span>strong{font-size:15px}.hero-label{bottom:0;min-height:65px;padding:3px 8px;border-width:9px;border-image-width:10px}.hero-label span{font-size:18px}.hero-label #homeLoadout{font-size:7px}.hero-label button{font-size:9px;min-height:44px;position:absolute;inset:0;opacity:0}.hero-label small{font-size:8px}.hero-grid{grid-auto-rows:132px}.map-details,.hero-details,.pet-details{padding:8px}.profile-tabs button{min-height:44px}.boss-grid{grid-auto-columns:25%;overflow-y:hidden}.boss-card>img{height:43%;min-height:65px}.boss-card>strong{font-size:18px}.boss-card{gap:4px}.boss-card>small{font-size:9px}.modal-panel{max-height:96%;padding:10px 14px}.setting{min-height:48px}.control-studio-entry{padding:4px 0}.setting-grid{gap:5px}.weapon-catalog{max-height:44vh}.weapon-choice{min-height:145px}
}
@media(max-width:780px){.profile{min-width:180px;max-width:36%}.topbar{gap:5px}.topright{gap:3px}.wallet,.star-wallet{font-size:16px;padding:0 2px}.wallet-plus{min-width:44px;width:44px}.star-wallet small{display:none}.topright .icon-button{width:44px}.wallet .ico,.star-wallet .ico{width:22px;height:22px}.map-layout,.hero-layout,.pet-layout{grid-template-columns:minmax(0,1.25fr) minmax(250px,1fr)}.hero-grid{grid-template-columns:repeat(4,1fr)}#mapGrid{grid-template-columns:repeat(4,1fr)}.bottom-nav>button>span{font-size:9px}.home-title{width:30%}.home-actions{width:37%}.hero-label{left:46%;width:27%}.page-heading h2{font-size:23px}.page-heading .subtle{display:none}.setting-grid{grid-template-columns:repeat(2,1fr)}.weapon-catalog{grid-template-columns:repeat(3,1fr)}.wardrobe-tabs{grid-template-columns:repeat(3,1fr)}.profile-content.pixel-profile{grid-template-columns:200px minmax(0,1fr)}.premium-stats{grid-template-columns:repeat(2,1fr)}.quest-list{grid-template-columns:repeat(2,1fr)}}

/* Explicit ID-level overrides retire the legacy carousel geometry. */
#menu>.bottom-nav{position:relative;inset:auto;left:auto;right:auto;bottom:auto;transform:none;width:100%;flex-shrink:0}
.topbar .icon-button{border:10px solid transparent;border-image:url('asset:ui/frames/button') 18 fill / 10px / 0 stretch;border-radius:0;background:none;box-shadow:none}
#heroGrid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));grid-template-rows:repeat(2,minmax(210px,1fr));grid-auto-rows:minmax(210px,1fr);align-content:stretch;gap:12px;padding:0 4px 5px}
#heroGrid>.hero-card{display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:4px;min-height:210px;padding:8px 5px;height:auto;max-height:none;border:12px solid transparent;border-image:url('asset:ui/frames/hero-card') 24 fill / 12px / 0 stretch;border-radius:0;background:none;box-shadow:none}
#heroGrid>.hero-card.selected{border-image-source:url('asset:ui/frames/hero-selected')}
#heroGrid>.hero-card canvas{width:100%;height:110px;min-height:90px;max-height:none;flex:1;position:static;border-radius:0;background:none;object-fit:contain}
#heroGrid>.hero-card>strong{font:700 20px/1.1 var(--font-display);color:#ffe4a2;white-space:normal;padding:0;position:static}
#heroGrid>.hero-card>small{display:block;font:11px/1.2 var(--font-body);white-space:normal;text-align:center;padding:0;position:static}
#heroGrid>.hero-card .hero-equipped{min-height:12px;flex:none}
.forge-content>.forge-preview{width:auto;max-width:none;min-width:0;flex:initial}
.forge-content>.forge-catalog{width:auto;max-width:none;min-width:0;flex:initial}
.profile-tabs button,.hero-label button{min-height:44px}
@media(max-width:1100px){#heroGrid{gap:7px;grid-template-rows:repeat(2,minmax(160px,1fr));grid-auto-rows:minmax(160px,1fr)}#heroGrid>.hero-card{min-height:160px;padding:4px 2px;border-width:10px;border-image-width:10px;gap:3px}#heroGrid>.hero-card canvas{height:80px;min-height:65px}#heroGrid>.hero-card>strong{font-size:17px}#heroGrid>.hero-card>small{font-size:9px}}
@media(max-height:470px){#heroGrid{grid-template-rows:repeat(2,140px);grid-auto-rows:140px}#heroGrid>.hero-card{min-height:140px}#heroGrid>.hero-card canvas{height:65px;min-height:55px}#heroGrid>.hero-card>strong{font-size:16px}#heroGrid>.hero-card>small{font-size:8px}}
@media(max-width:780px){#heroGrid{grid-template-columns:repeat(4,minmax(0,1fr))}}
/* Shared shell owns all three rows; no legacy absolute offsets may escape it. */
#menu{display:flex;flex-direction:column}
#menu>.topbar{position:relative;inset:auto;left:auto;right:auto;top:auto;width:100%;margin:0;flex-shrink:0}
#menu>#pages{position:relative;inset:auto;left:auto;right:auto;top:auto;bottom:auto;flex:1;min-height:0;min-width:0;width:100%;margin:0}
.topbar .profile{max-width:40%;border:10px solid transparent;border-image:url('asset:ui/frames/identity') 30 fill / 14px / 0 stretch;border-radius:0;background:none;box-shadow:none}
#petGrid{grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:minmax(190px,1fr);grid-template-rows:repeat(3,minmax(190px,1fr));gap:12px;align-content:stretch}
#petGrid>.pet-card{min-height:190px;border:12px solid transparent;border-image:url('asset:ui/frames/hero-card') 24 fill / 12px / 0 stretch;border-radius:0;background:none}
#petGrid>.pet-card.selected{border-image-source:url('asset:ui/frames/hero-selected')}
#petGrid>.pet-card>img{height:105px;min-height:80px;width:100%;object-fit:contain}
#profileContent.pixel-profile{display:grid;grid-template-columns:minmax(235px,.8fr) minmax(0,1.6fr);grid-template-rows:auto minmax(0,1fr);gap:13px;overflow:hidden;padding:0;min-height:0;flex:1}
#profileContent.pixel-profile>.premium-profile-header{display:flex;flex-direction:column;grid-column:1;grid-row:2;overflow:auto}
#profileContent.pixel-profile>.profile-tabs{grid-column:1/-1;grid-row:1}
#profileContent.pixel-profile>.profile-tab-body{grid-column:2;grid-row:2;overflow:auto;min-height:0;padding-right:4px}
#bossGrid{grid-auto-columns:clamp(250px,22vw,390px);height:auto;min-height:0;flex:1}
#continueButton .mode-text>small{font:700 clamp(20px,2.1vw,36px)/1.1 var(--font-display);color:#493315;letter-spacing:1px;margin-bottom:4px}
#continueButton .mode-text>strong{font:700 clamp(14px,1.35vw,22px)/1.2 var(--font-display);color:#433117}
#continueButton .mode-text>em{font:clamp(10px,1vw,15px)/1.3 var(--font-body);color:#574322}
#continueButton .mode-icon{display:block;width:42px;height:42px}
@media(max-width:1100px){#petGrid{grid-template-columns:repeat(3,minmax(0,1fr));grid-auto-rows:155px;grid-template-rows:repeat(3,155px);gap:8px}#petGrid>.pet-card{min-height:155px}#petGrid>.pet-card>img{height:80px;min-height:60px}#profileContent.pixel-profile{grid-template-columns:minmax(210px,.8fr) minmax(0,1.6fr);gap:9px}#bossGrid{grid-auto-columns:clamp(220px,25vw,275px)}}
@media(max-height:470px){#continueButton .mode-text>small{font-size:19px;margin:0}#continueButton .mode-text>strong{font-size:12px}#continueButton .mode-text>em{font-size:9px}#continueButton .mode-icon{display:none}#bossGrid{grid-auto-columns:clamp(215px,25vw,275px)}}
````

## `game/audio.js`

Tasks: 4. OLD SHA-256: `7c67ab555f6a2cc067d1ee570f9c45012d0394c56df20e893983ebcf8f013dc8`. NEW SHA-256: `f3fdb05d5823b2225d3b9909cefbcaefa4421b87983b47c7b08a7a0e8d801171`.

### replace: OLD 66–66; NEW 66–66

OLD
````text
        const aliases = { bounce: 'stomp', gameover: 'knockout', blast: 'skill', scales: 'shield', shrine: 'power', crate: 'block', treasure: 'chest', 'water-save': 'prince' };
````

NEW
````text
        const aliases = { punch:'stomp', 'unarmed-hit':'armor', bounce: 'stomp', gameover: 'knockout', blast: 'skill', scales: 'shield', shrine: 'power', crate: 'block', treasure: 'chest', 'water-save': 'prince' };
````

## `game/combat-profiles.js`

Tasks: 4,5,8. OLD SHA-256: `9fecc2443527fe51c6e9d9403c8ee3adf275de48aa2aa951533fa2d05f8bf9f8`. NEW SHA-256: `5dbd942c240567951a20aa9cda0d84f962397ade49835c22e63c2491d8704033`.

### insert: OLD 1–0; NEW 1–1

OLD
````text
````

NEW
````text
import {HEROES} from './data.js';
````

### replace: OLD 15–15; NEW 16–36

OLD
````text
export function combatProfile(p){return p.normalizedCombat?{weapon:'sabre',speed:1,accel:1,air:1,startup:.025,active:.17,recovery:.15,dodge:.22}:COMBAT_PROFILES[p.character]||{weapon:'sabre',speed:1,accel:1,air:1,startup:.08,active:.18,recovery:.2,dodge:.22};}
````

NEW
````text
export function isUnarmed(p){return !p.normalizedCombat&&p.equippedWeapon===null;}
export function unarmedProfile(id){
 const p=COMBAT_PROFILES[id]||COMBAT_PROFILES.wissem;
 const startupFrames=Math.max(3,Math.min(6,Math.round(p.startup*60)));
 const activeFrames=Math.max(3,Math.min(5,Math.round(p.active*30)));
 const recoveryFrames=Math.ceil(Math.max(p.recovery,p.dodge)*60);
 return {...p,weapon:'unarmed',projectile:undefined,startupFrames,activeFrames,recoveryFrames,
  startup:startupFrames/60,active:activeFrames/60,recovery:recoveryFrames/60,damage:1,reach:26,staminaCost:8};
}
export function unarmedPhase(p){
 const a=p.unarmedAttack;if(!a)return 'idle';
 return a.tick<a.startup?'startup':a.tick<a.startup+a.active?'active':a.tick<a.total?'recovery':'idle';
}
export function combatProfile(p){
 if(p.normalizedCombat)return {weapon:'sabre',speed:1,accel:1,air:1,startup:.025,active:.17,recovery:.15,dodge:.22};
 const base=COMBAT_PROFILES[p.character]||COMBAT_PROFILES.wissem;
 if(isUnarmed(p))return unarmedProfile(p.character);
 const weapon=Object.values(COMBAT_PROFILES).find(v=>v.weapon===p.equippedWeapon);
 const owner=HEROES.find(h=>COMBAT_PROFILES[h.id]?.weapon===p.equippedWeapon);
 return weapon?{...base,weapon:weapon.weapon,startup:weapon.startup,active:weapon.active,recovery:weapon.recovery,projectile:weapon.projectile,reach:owner?.combatStyle?.reach,damage:owner?.combatStyle?.damage}:base;
}
````

## `game/content.js`

Tasks: 6 (generated content). OLD SHA-256: `0c6012daf1e88c77f68f9fab31b46f62d103367ac2eb3befc346ef3f662c2597`. NEW SHA-256: `e14526b0393a34d2081b1925aefe0a187b25f951911e972fb2662358ef625b02`.

### replace: OLD 2–2; NEW 2–2

OLD
````text
export const CONTENT={"heroes":[{"id":"wissem","name":"Wissem","role":"The gravity pioneer","color":"#ff756b","dark":"#8c324d","skin":"#ddb291","hair":"#d9484d","style":"quiff","skills":[{"id":"gravity","name":"Gravity control","icon":"feather","cooldown":10,"description":"Lift off, then bend gravity for 4 seconds. Hold jump to float farther."},{"id":"bomba","name":"Bomba","icon":"burst","cooldown":8,"description":"Lob a fused bomb. Its blast breaks bricks and defeats nearby enemies."}],"passive":"Crowd fury: 3+ nearby enemies accelerate cooldowns and strengthen Bomba.","asset":"hero/wissem","backstory":"A cartographer who refused to accept that the sky had an edge. Wissem found a broken gravity compass beneath Sunpetal Valley and now follows the fractures to their source.","weapon":"Gravity gauntlets","combatStyle":{"cooldown":0.34,"reach":82,"damage":2},"animationTempo":1},{"id":"kossay","name":"Kossay","role":"The twin-fang ranger","color":"#81c88c","dark":"#326b59","skin":"#ddb291","hair":"#282332","style":"quiff","skills":[{"id":"fang","name":"Twin fang","icon":"bolt","cooldown":7,"description":"Dash safely through enemies with a pair of enchanted blades."},{"id":"snare","name":"Ranger snare","icon":"bullseye","cooldown":12,"description":"Place a 7-second trap that slows and damages nearby enemies."}],"passive":"Fast attacks, precise escapes.","asset":"hero/kossay","backstory":"A pathfinder from the Moonlit border. Kossay left the royal hunters when they marked an innocent village as prey; his twin blades now protect the people they once threatened.","weapon":"Twin fangs","combatStyle":{"cooldown":0.27,"reach":68,"damage":2},"animationTempo":1.16},{"id":"yakine","name":"Yakine","role":"The astral spellcaster","color":"#95a7ff","dark":"#493f8f","skin":"#ddb291","hair":"#282332","style":"quiff","skills":[{"id":"orbit","name":"Arcane orbit","icon":"star","cooldown":12,"description":"Three orbiting stars defend you and strike nearby enemies for 6 seconds."},{"id":"chrono","name":"Chrono well","icon":"hourglass-half","cooldown":15,"description":"Slow enemies and hostile projectiles by 75% for 5 seconds."}],"passive":"Keep moving while the world slows down.","asset":"hero/yakine","backstory":"Keeper of an observatory lost between seconds. Yakine bends brief moments of time, searching the floating worlds for the missing constellations.","weapon":"Orbit crescent","combatStyle":{"cooldown":0.38,"reach":98,"damage":2},"animationTempo":0.9},{"id":"taky","name":"Taky","role":"The shadow rogue","color":"#cc879e","dark":"#502c50","skin":"#ddb291","hair":"#282332","style":"quiff","skills":[{"id":"shadow","name":"Shadow step","icon":"moon","cooldown":8,"description":"Blink forward up to 160 pixels through safe space; gain brief protection."},{"id":"blades","name":"Night blades","icon":"burst","cooldown":10,"description":"Launch five piercing shadow blades in a wide fan."}],"passive":"Disappear, reposition, strike.","asset":"hero/taky","backstory":"A courier nobody remembers seeing. Taky learned to step through shadows to carry a final message across a kingdom swallowed by night.","weapon":"Shadow knives","combatStyle":{"cooldown":0.29,"reach":76,"damage":2},"animationTempo":1.2},{"id":"garsi","name":"Garsi","role":"The iron guardian","color":"#b4c6e4","dark":"#4d607a","skin":"#ddb291","hair":"#282332","style":"quiff","skills":[{"id":"bastion","name":"Iron bastion","icon":"shield-halved","cooldown":13,"description":"Four seconds of protection; enemy projectiles reflect back."},{"id":"quake","name":"Quake smash","icon":"hammer","cooldown":10,"description":"Crush nearby foes, or slam from the air to trigger a heavy shockwave."}],"passive":"Armor does not protect you from an unbridged cliff.","asset":"hero/garsi","backstory":"The last guardian of a shattered citadel. Garsi rebuilt a suit of armor from its gates and carries the duty of sheltering others into every trial.","weapon":"Stonebreaker hammer","combatStyle":{"cooldown":0.43,"reach":104,"damage":3},"animationTempo":0.8},{"id":"tounsi","name":"Tounsi","role":"The desert corsair","color":"#ffce94","dark":"#92604b","skin":"#ddb291","hair":"#282332","style":"quiff","skills":[{"id":"sirocco","name":"Sirocco spin","icon":"rotate-right","cooldown":10,"description":"Spin for 3 seconds, pulling coins and striking enemies nearby."},{"id":"vault","name":"Dune vault","icon":"feather","cooldown":8,"description":"Leap high, even in midair, and ride a gentle 3-second glide."}],"passive":"A dancer above the dunes.","asset":"hero/tounsi","backstory":"A sailor of sand and wind, exiled after returning a stolen relic to its rightful village. Tounsi follows the sky currents with a blade and an unfinished map.","weapon":"Wind scimitar","combatStyle":{"cooldown":0.32,"reach":92,"damage":2},"animationTempo":1.12},{"id":"youssef","name":"Youssef","role":"The spark inventor","color":"#69d3f2","dark":"#365e89","skin":"#ddb291","hair":"#282332","style":"quiff","skills":[{"id":"turret","name":"Pocket turret","icon":"gear","cooldown":14,"description":"Deploy an 8-second turret that aims at nearby enemies."},{"id":"overclock","name":"Overclock","icon":"bolt","cooldown":13,"description":"Run faster and pulse electricity into nearby enemies for 7 seconds."}],"passive":"Invention is your superpower.","asset":"hero/youssef","backstory":"An inventor whose rescue machine accidentally awakened a Sovereign. Youssef enters the ruins to repair what he started, one improbable gadget at a time.","weapon":"Clockwork knuckles","combatStyle":{"cooldown":0.31,"reach":78,"damage":2},"animationTempo":1.06},{"id":"loey","name":"Loey","role":"The wind scout","color":"#b6d778","dark":"#617741","skin":"#ddb291","hair":"#282332","style":"quiff","skills":[{"id":"arrows","name":"Seeker arrows","icon":"arrow-right","cooldown":9,"description":"Fire three arrows that seek nearby enemies."},{"id":"windwalk","name":"Windwalk","icon":"feather","cooldown":11,"description":"Six seconds of light-footed speed, glide and one extra midair jump."}],"passive":"Read the wind. Find your route.","asset":"hero/loey","backstory":"A scout who can hear the language of the old trees. Loey searches for the seed of the first forest while defending the creatures displaced by the trials.","weapon":"Sky bow","combatStyle":{"cooldown":0.38,"reach":112,"damage":2},"animationTempo":0.92},{"id":"rayan","name":"Rayan","role":"The sun-forged lancer","color":"#efd083","dark":"#4d607a","skin":"#ddb291","hair":"#282332","style":"quiff","skills":[{"id":"sunlance","name":"Sunlance","icon":"sword","cooldown":10,"description":"Hurl a fast piercing lance. Skilled timing staggers a boss."},{"id":"rally","name":"Dawn Rally","icon":"shield","cooldown":18,"description":"A brief guard restores stamina and prepares the next attack."}],"passive":"Distinct skills; shared fair movement physics.","asset":"hero/rayan","backstory":"Rayan once kept the bridges of Amber Skyway open through a century of storms. His oath is simple: nobody crosses the last bridge alone.","weapon":"Sun lance","combatStyle":{"cooldown":0.4,"reach":106,"damage":2},"animationTempo":0.96},{"id":"mira","name":"Mira","role":"The frost archivist","color":"#8ae2e9","dark":"#493f8f","skin":"#ddb291","hair":"#282332","style":"quiff","skills":[{"id":"frostnova","name":"Frost Nova","icon":"snowflake","cooldown":12,"description":"Freeze nearby monsters and slow the boss without stopping its phases."},{"id":"icevault","name":"Glacier Step","icon":"wind","cooldown":10,"description":"Leap into a frost veil, leaving a slowing sigil below."}],"passive":"Distinct skills; shared fair movement physics.","asset":"hero/mira","backstory":"Mira reads memories trapped inside Crystal Hollow. She entered the trials to recover the names erased by the Sovereigns, not for a crown.","weapon":"Frost staff","combatStyle":{"cooldown":0.39,"reach":100,"damage":2},"animationTempo":0.86}],"pets":[{"id":"wolf","name":"Fang Wolf","rarity":"super","unlockWorld":0,"fraction":0.07,"description":"Summon for 12 seconds. Bites a nearby target every 1.8 seconds; then returns to the shrine.","passive":"Auto attack","skills":[],"summonDuration":12,"summonCooldown":60,"summonCost":35,"summonCharges":3},{"id":"eagle","name":"Sky Eagle","rarity":"super","unlockWorld":2,"fraction":0.25,"description":"Summon for 18 seconds. Scout enemies, gaps and treasure, with increased coin reach.","passive":"Scout vision + coin reach","skills":[],"summonDuration":18,"summonCooldown":55,"summonCost":25,"summonCharges":3},{"id":"mole","name":"Mole Digger","rarity":"super","unlockWorld":4,"fraction":0.36,"description":"Summon for 12 seconds. Finds buried rewards through forward progress, not waiting.","passive":"Buried treasure","skills":[],"summonDuration":12,"summonCooldown":70,"summonCost":30,"summonCharges":3},{"id":"fox","name":"Ember Fox","rarity":"super","unlockWorld":6,"fraction":0.43,"description":"Summon for 10 seconds. Limited fire support and distance-driven supplies.","passive":"Fire support + supplies","skills":[],"summonDuration":10,"summonCooldown":75,"summonCost":40,"summonCharges":3},{"id":"turtle","name":"Stone Turtle","rarity":"super","unlockWorld":8,"fraction":0.51,"description":"Summon for 14 seconds. One guard against a hit; no protection against falling.","passive":"One guard per summon","skills":[],"summonDuration":14,"summonCooldown":75,"summonCost":35,"summonCharges":3},{"id":"dragon","name":"Astra Dragon","rarity":"super rare","unlockWorld":11,"fraction":0.84,"description":"One 10-second ultimate per attempt. Up to 15 contact kills while active; bosses resist instant defeat.","passive":"Dragon Scales • 15 enemies","skills":[{"id":"breath","name":"Dragon Breath","icon":"fire","cooldown":90,"duration":10,"description":"For 10 seconds, every enemy kill gives exactly 3× its otherwise-awarded points. Coins and distance are not multiplied."}],"summonDuration":10,"summonCooldown":180,"summonCost":80,"summonCharges":1},{"id":"orca","name":"Orca Prince","rarity":"super rare","unlockWorld":14,"fraction":0.84,"description":"One 12-second ultimate per attempt. Choose a brief clearing flood or water support over gaps.","passive":"Master of the tides","skills":[{"id":"flood","name":"Flood","icon":"water","cooldown":100,"duration":12,"description":"Clear all existing enemies in this map. For 12 seconds, sweep away newly encountered enemies and hostile projectiles, including across endless transitions."},{"id":"prince","name":"Orca Prince","icon":"crown","cooldown":100,"duration":12,"description":"For 12 seconds, water supports you across every cliff. Activating while falling lifts you onto the water. Spikes and enemies remain dangerous unless separately protected."}],"summonDuration":12,"summonCooldown":180,"summonCost":80,"summonCharges":1},{"id":"skywolf","name":"Sky Wolf","rarity":"fusion","unlockWorld":0,"fraction":0.5,"recipe":["wolf","eagle"],"description":"A forged companion. Bites nearby enemies and scouts while flying.","passive":"Bite + scout","skills":[],"summonDuration":8,"summonCooldown":90,"summonCost":45,"summonCharges":2},{"id":"emberguard","name":"Emberguard","rarity":"fusion","unlockWorld":0,"fraction":0.5,"recipe":["fox","turtle"],"description":"A forged companion. Fire support and one protective guard.","passive":"Fire + guard","skills":[],"summonDuration":9,"summonCooldown":90,"summonCost":50,"summonCharges":2}],"powers":[{"id":"shield","name":"Shield acorn","icon":"shield-halved","color":"#78d9fc","description":"Absorb one hit."},{"id":"heart","name":"Healing heart","icon":"heart","color":"#ff7494","description":"Restore one heart."},{"id":"spark","name":"Star charge","icon":"star","color":"#ffd56c","description":"Contact invincibility for 7 seconds. Falls remain dangerous."},{"id":"magnet","name":"Magnet feather","icon":"magnet","color":"#d4a1ff","description":"Attract coins for 12 seconds."},{"id":"double","name":"Coin clover","icon":"coins","color":"#a2e383","description":"Double coin value for 12 seconds."},{"id":"haste","name":"Speed boots","icon":"shoe-prints","color":"#83e4c0","description":"20% faster for 10 seconds."},{"id":"nova","name":"Nova bloom","icon":"star","color":"#e6aaff","description":"Orbiting stars strike nearby enemies for 10 seconds."},{"id":"fire","name":"Fire fruit","icon":"fire","color":"#ff9a68","description":"Automatically launch fireballs at nearby enemies for 12 seconds; ignore fire-imp contact."},{"id":"ice","name":"Ice blossom","icon":"snowflake","color":"#a9edff","description":"Freeze nearby foes and fire slowing ice shards for 12 seconds."},{"id":"giant","name":"Giant heart","icon":"heart","color":"#fa709a","description":"Gain up to five hearts for 20 seconds; revert safely afterward."},{"id":"thunder","name":"Thunder totem","icon":"bolt","color":"#ffe38c","description":"Lightning strikes nearby enemies for 12 seconds."},{"id":"phase","name":"Phase crystal","icon":"moon","color":"#b4a0ff","description":"Pass through breakable bricks and cache blocks; ignore contact damage for 6 seconds. Solid ground stays solid."},{"id":"rescue","name":"Phoenix feather","icon":"feather","color":"#ffa4c4","description":"One automatic rescue from a fall."},{"id":"bomb","name":"Bomba cache","icon":"burst","color":"#ffb64d","description":"Immediately detonate a safe shockwave around you."}],"maps":[{"id":0,"name":"Sunpetal Valley","tagline":"A bright beginning","biome":"meadow","sky":["#7de0dd","#e6f8be"],"far":"#a9d7a0","near":"#50ad87","grass":"#87de72","earth":"#805e48","length":172,"par":64,"gaps":[31,59,94,132],"roster":["slime","beetle"],"night":false,"coinGoal":20,"difficulty":1,"chapter":0,"baseLength":172,"lengthMultiplier":5,"basePar":64,"enemyBudget":7,"enemyDensity":1,"powerDensity":1,"music":"frontier","background":"sky","tileSet":"starry","tileEdits":[],"extraSpawns":[],"communityTheme":"starry","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":1,"name":"Moonlit Grove","tagline":"Follow the fireflies","biome":"forest","sky":["#182748","#8798b5"],"far":"#526f88","near":"#2e686f","grass":"#67ba95","earth":"#495764","length":180,"par":69,"gaps":[28,63,99,139],"roster":["slime","bat","maw"],"night":true,"coinGoal":22,"difficulty":1,"chapter":0,"baseLength":180,"lengthMultiplier":5,"basePar":69,"enemyBudget":8,"enemyDensity":1,"powerDensity":1,"music":"moonlight","background":"cosmic","tileSet":"starry","tileEdits":[],"extraSpawns":[],"communityTheme":"starry","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":2,"name":"Amber Skyway","tagline":"Above the golden clouds","biome":"sky","sky":["#f39976","#ffe6b1"],"far":"#e4b593","near":"#bd978d","grass":"#ffcb80","earth":"#946b61","length":188,"par":73,"gaps":[34,69,107,150],"roster":["beetle","bat","hopper"],"night":false,"coinGoal":24,"difficulty":1,"chapter":0,"baseLength":188,"lengthMultiplier":5,"basePar":73,"enemyBudget":10,"enemyDensity":1,"powerDensity":1,"music":"skyward","background":"sky","tileSet":"waste","tileEdits":[],"extraSpawns":[],"communityTheme":"waste","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":3,"name":"Coral Coast","tagline":"Make waves, chase gold","biome":"coast","sky":["#56c9e9","#d9fcde"],"far":"#75cfc3","near":"#35a7ad","grass":"#fbe39c","earth":"#bd8a60","length":196,"par":77,"gaps":[29,65,103,143,172],"roster":["crab","slime","wisp"],"night":false,"coinGoal":26,"difficulty":2,"chapter":0,"baseLength":196,"lengthMultiplier":5,"basePar":77,"enemyBudget":11,"enemyDensity":1,"powerDensity":1,"music":"frontier","background":"sky","tileSet":"starry","tileEdits":[],"extraSpawns":[],"communityTheme":"starry","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":4,"name":"Candy Canyon","tagline":"Sweet paths. Sneaky foes.","biome":"candy","sky":["#b28ce5","#ffe6d9"],"far":"#e9aad7","near":"#b785c7","grass":"#ffa7d1","earth":"#ad738f","length":204,"par":81,"gaps":[36,73,109,150,181],"roster":["hopper","beetle","maw"],"night":false,"coinGoal":28,"difficulty":2,"chapter":0,"baseLength":204,"lengthMultiplier":5,"basePar":81,"enemyBudget":13,"enemyDensity":1,"powerDensity":1,"music":"skyward","background":"sky","tileSet":"waste","tileEdits":[],"extraSpawns":[],"communityTheme":"waste","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":5,"name":"Frostpeak Pass","tagline":"Keep your cool","biome":"snow","sky":["#5daed3","#e1f7ff"],"far":"#a0d1e1","near":"#67a2b8","grass":"#effbff","earth":"#7495b0","length":212,"par":85,"gaps":[32,68,107,147,187],"roster":["slime","bat","spiker"],"night":false,"coinGoal":30,"difficulty":2,"chapter":1,"baseLength":212,"lengthMultiplier":5,"basePar":85,"enemyBudget":14,"enemyDensity":1,"powerDensity":1,"music":"moonlight","background":"sky","tileSet":"starry","tileEdits":[],"extraSpawns":[],"communityTheme":"starry","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":6,"name":"Clockwork City","tagline":"Every second counts","biome":"clock","sky":["#599d9d","#e4e6b5"],"far":"#7baca0","near":"#407679","grass":"#dcc379","earth":"#6d6354","length":220,"par":89,"gaps":[37,76,114,155,192],"roster":["sentry","drone","golem"],"night":false,"coinGoal":32,"difficulty":3,"chapter":1,"baseLength":220,"lengthMultiplier":5,"basePar":89,"enemyBudget":16,"enemyDensity":1,"powerDensity":1,"music":"clockwork","background":"sky","tileSet":"waste","tileEdits":[],"extraSpawns":[],"communityTheme":"waste","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":7,"name":"Mushroom Marsh","tagline":"Into the emerald mist","biome":"swamp","sky":["#446d80","#b0dcbb"],"far":"#5e9386","near":"#326e6f","grass":"#a4d879","earth":"#4f6050","length":228,"par":93,"gaps":[29,64,103,143,181,206],"roster":["slime","maw","ninja"],"night":false,"coinGoal":34,"difficulty":3,"chapter":1,"baseLength":228,"lengthMultiplier":5,"basePar":93,"enemyBudget":17,"enemyDensity":1,"powerDensity":1,"music":"moonlight","background":"sky","tileSet":"starry","tileEdits":[],"extraSpawns":[],"communityTheme":"starry","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":8,"name":"Ember Caverns","tagline":"The floor has opinions","biome":"lava","sky":["#351e42","#d8845a"],"far":"#875276","near":"#522d50","grass":"#fba065","earth":"#6c4854","length":236,"par":97,"gaps":[34,72,113,156,194,216],"roster":["imp","spiker","golem"],"night":true,"coinGoal":36,"difficulty":3,"chapter":1,"baseLength":236,"lengthMultiplier":5,"basePar":97,"enemyBudget":19,"enemyDensity":1,"powerDensity":1,"music":"clockwork","background":"cosmic","tileSet":"waste","tileEdits":[],"extraSpawns":[],"communityTheme":"waste","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":9,"name":"Crystal Hollow","tagline":"Light up the underground","biome":"crystal","sky":["#202858","#81bbe0"],"far":"#525db3","near":"#4a5495","grass":"#aadbf2","earth":"#555884","length":244,"par":101,"gaps":[31,67,107,149,191,222],"roster":["wisp","bat","golem"],"night":true,"coinGoal":38,"difficulty":4,"chapter":1,"baseLength":244,"lengthMultiplier":5,"basePar":101,"enemyBudget":20,"enemyDensity":1,"powerDensity":1,"music":"starlight","background":"cosmic","tileSet":"starry","tileEdits":[],"extraSpawns":[],"communityTheme":"starry","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":10,"name":"Sunken Ruins","tagline":"An ancient road awakens","biome":"ruins","sky":["#3e9597","#d9edc3"],"far":"#7daaa0","near":"#4e8480","grass":"#b9d295","earth":"#727b6b","length":252,"par":105,"gaps":[36,74,114,157,199,231],"roster":["crab","maw","sentry"],"night":false,"coinGoal":40,"difficulty":4,"chapter":2,"baseLength":252,"lengthMultiplier":5,"basePar":105,"enemyBudget":22,"enemyDensity":1,"powerDensity":1,"music":"moonlight","background":"sky","tileSet":"waste","tileEdits":[],"extraSpawns":[],"communityTheme":"waste","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":11,"name":"Thunder Citadel","tagline":"Run into the storm","biome":"storm","sky":["#293d65","#98acbf"],"far":"#4c6583","near":"#334b6c","grass":"#aac7d5","earth":"#546177","length":260,"par":109,"gaps":[33,70,110,153,196,238],"roster":["drone","ninja","sentry"],"night":true,"coinGoal":42,"difficulty":4,"chapter":2,"baseLength":260,"lengthMultiplier":5,"basePar":109,"enemyBudget":23,"enemyDensity":1,"powerDensity":1,"music":"clockwork","background":"cosmic","tileSet":"starry","tileEdits":[],"extraSpawns":[],"communityTheme":"starry","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":12,"name":"Sakura Summit","tagline":"One last mountain","biome":"sakura","sky":["#96c3df","#ffe2d5"],"far":"#c6b6cf","near":"#b28bb3","grass":"#ffd1e2","earth":"#95738b","length":268,"par":113,"gaps":[30,67,108,150,192,235,251],"roster":["hopper","ninja","spiker"],"night":false,"coinGoal":44,"difficulty":5,"chapter":2,"baseLength":268,"lengthMultiplier":5,"basePar":113,"enemyBudget":25,"enemyDensity":1,"powerDensity":1,"music":"skyward","background":"sky","tileSet":"starry","tileEdits":[],"extraSpawns":[],"communityTheme":"starry","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":13,"name":"Neon Nightway","tagline":"No brakes after midnight","biome":"neon","sky":["#121b3b","#655ba4"],"far":"#34476e","near":"#213650","grass":"#83f5d8","earth":"#424662","length":276,"par":117,"gaps":[35,73,115,156,199,241,260],"roster":["drone","sentry","wisp"],"night":true,"coinGoal":46,"difficulty":5,"chapter":2,"baseLength":276,"lengthMultiplier":5,"basePar":117,"enemyBudget":26,"enemyDensity":1,"powerDensity":1,"music":"clockwork","background":"cosmic","tileSet":"starry","tileEdits":[],"extraSpawns":[],"communityTheme":"starry","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":14,"name":"Starfall Sanctuary","tagline":"Your legend starts here","biome":"cosmic","sky":["#1c1949","#8b83c2"],"far":"#555291","near":"#373a71","grass":"#d9c2ff","earth":"#595482","length":284,"par":121,"gaps":[31,70,112,154,198,240,268],"roster":["golem","imp","ninja","wisp","drone"],"night":true,"coinGoal":48,"difficulty":5,"chapter":2,"baseLength":284,"lengthMultiplier":5,"basePar":121,"enemyBudget":28,"enemyDensity":1,"powerDensity":1,"music":"starlight","background":"cosmic","tileSet":"starry","tileEdits":[],"extraSpawns":[],"communityTheme":"starry","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]}]};
````

NEW
````text
export const CONTENT={"heroes":[{"id":"wissem","name":"Wissem","role":"The gravity pioneer","color":"#ff756b","dark":"#8c324d","skin":"#ddb291","hair":"#d9484d","style":"quiff","skills":[{"id":"gravity","name":"Gravity control","icon":"feather","cooldown":10,"description":"Lift off, then bend gravity for 4 seconds. Hold jump to float farther."},{"id":"bomba","name":"Bomba","icon":"burst","cooldown":8,"description":"Lob a fused bomb. Its blast breaks bricks and defeats nearby enemies."}],"passive":"Crowd fury: 3+ nearby enemies accelerate cooldowns and strengthen Bomba.","asset":"hero/wissem","backstory":"A cartographer who refused to accept that the sky had an edge. Wissem found a broken gravity compass beneath Sunpetal Valley and now follows the fractures to their source.","weapon":"Gravity gauntlets","combatStyle":{"cooldown":0.34,"reach":82,"damage":2},"animationTempo":1},{"id":"kossay","name":"Kael","role":"The twin-fang ranger","color":"#81c88c","dark":"#326b59","skin":"#ddb291","hair":"#282332","style":"quiff","skills":[{"id":"fang","name":"Twin fang","icon":"bolt","cooldown":7,"description":"Dash safely through enemies with a pair of enchanted blades."},{"id":"snare","name":"Ranger snare","icon":"bullseye","cooldown":12,"description":"Place a 7-second trap that slows and damages nearby enemies."}],"passive":"Fast attacks, precise escapes.","asset":"hero/kossay","backstory":"A pathfinder from the Moonlit border. Kael left the royal hunters when they marked an innocent village as prey; his twin blades now protect the people they once threatened.","weapon":"Twin fangs","combatStyle":{"cooldown":0.27,"reach":68,"damage":2},"animationTempo":1.16},{"id":"yakine","name":"Astra","role":"The astral spellcaster","color":"#95a7ff","dark":"#493f8f","skin":"#ddb291","hair":"#282332","style":"quiff","skills":[{"id":"orbit","name":"Arcane orbit","icon":"star","cooldown":12,"description":"Three orbiting stars defend you and strike nearby enemies for 6 seconds."},{"id":"chrono","name":"Chrono well","icon":"hourglass-half","cooldown":15,"description":"Slow enemies and hostile projectiles by 75% for 5 seconds."}],"passive":"Keep moving while the world slows down.","asset":"hero/yakine","backstory":"Keeper of an observatory lost between seconds. Astra bends brief moments of time, searching the floating worlds for the missing constellations.","weapon":"Orbit crescent","combatStyle":{"cooldown":0.38,"reach":98,"damage":2},"animationTempo":0.9},{"id":"taky","name":"Nyx","role":"The shadow rogue","color":"#cc879e","dark":"#502c50","skin":"#ddb291","hair":"#282332","style":"quiff","skills":[{"id":"shadow","name":"Shadow step","icon":"moon","cooldown":8,"description":"Blink forward up to 160 pixels through safe space; gain brief protection."},{"id":"blades","name":"Night blades","icon":"burst","cooldown":10,"description":"Launch five piercing shadow blades in a wide fan."}],"passive":"Disappear, reposition, strike.","asset":"hero/taky","backstory":"A courier nobody remembers seeing. Nyx learned to step through shadows to carry a final message across a kingdom swallowed by night.","weapon":"Shadow knives","combatStyle":{"cooldown":0.29,"reach":76,"damage":2},"animationTempo":1.2},{"id":"garsi","name":"Bront","role":"The iron guardian","color":"#b4c6e4","dark":"#4d607a","skin":"#ddb291","hair":"#282332","style":"quiff","skills":[{"id":"bastion","name":"Iron bastion","icon":"shield-halved","cooldown":13,"description":"Four seconds of protection; enemy projectiles reflect back."},{"id":"quake","name":"Quake smash","icon":"hammer","cooldown":10,"description":"Crush nearby foes, or slam from the air to trigger a heavy shockwave."}],"passive":"Armor does not protect you from an unbridged cliff.","asset":"hero/garsi","backstory":"The last guardian of a shattered citadel. Bront rebuilt a suit of armor from its gates and carries the duty of sheltering others into every trial.","weapon":"Stonebreaker hammer","combatStyle":{"cooldown":0.43,"reach":104,"damage":3},"animationTempo":0.8},{"id":"tounsi","name":"Zephyr","role":"The desert corsair","color":"#ffce94","dark":"#92604b","skin":"#ddb291","hair":"#282332","style":"quiff","skills":[{"id":"sirocco","name":"Sirocco spin","icon":"rotate-right","cooldown":10,"description":"Spin for 3 seconds, pulling coins and striking enemies nearby."},{"id":"vault","name":"Dune vault","icon":"feather","cooldown":8,"description":"Leap high, even in midair, and ride a gentle 3-second glide."}],"passive":"A dancer above the dunes.","asset":"hero/tounsi","backstory":"A sailor of sand and wind, exiled after returning a stolen relic to its rightful village. Zephyr follows the sky currents with a blade and an unfinished map.","weapon":"Wind scimitar","combatStyle":{"cooldown":0.32,"reach":92,"damage":2},"animationTempo":1.12},{"id":"youssef","name":"Volt","role":"The spark inventor","color":"#69d3f2","dark":"#365e89","skin":"#ddb291","hair":"#282332","style":"quiff","skills":[{"id":"turret","name":"Pocket turret","icon":"gear","cooldown":14,"description":"Deploy an 8-second turret that aims at nearby enemies."},{"id":"overclock","name":"Overclock","icon":"bolt","cooldown":13,"description":"Run faster and pulse electricity into nearby enemies for 7 seconds."}],"passive":"Invention is your superpower.","asset":"hero/youssef","backstory":"An inventor whose rescue machine accidentally awakened a Sovereign. Volt enters the ruins to repair what he started, one improbable gadget at a time.","weapon":"Clockwork knuckles","combatStyle":{"cooldown":0.31,"reach":78,"damage":2},"animationTempo":1.06},{"id":"loey","name":"Skye","role":"The wind scout","color":"#b6d778","dark":"#617741","skin":"#ddb291","hair":"#282332","style":"quiff","skills":[{"id":"arrows","name":"Seeker arrows","icon":"arrow-right","cooldown":9,"description":"Fire three arrows that seek nearby enemies."},{"id":"windwalk","name":"Windwalk","icon":"feather","cooldown":11,"description":"Six seconds of light-footed speed, glide and one extra midair jump."}],"passive":"Read the wind. Find your route.","asset":"hero/loey","backstory":"A scout who can hear the language of the old trees. Skye searches for the seed of the first forest while defending the creatures displaced by the trials.","weapon":"Sky bow","combatStyle":{"cooldown":0.38,"reach":112,"damage":2},"animationTempo":0.92},{"id":"rayan","name":"Sol","role":"The sun-forged lancer","color":"#efd083","dark":"#4d607a","skin":"#ddb291","hair":"#282332","style":"quiff","skills":[{"id":"sunlance","name":"Sunlance","icon":"sword","cooldown":10,"description":"Hurl a fast piercing lance. Skilled timing staggers a boss."},{"id":"rally","name":"Dawn Rally","icon":"shield","cooldown":18,"description":"A brief guard restores stamina and prepares the next attack."}],"passive":"Distinct skills; shared fair movement physics.","asset":"hero/rayan","backstory":"Sol once kept the bridges of Amber Skyway open through a century of storms. His oath is simple: nobody crosses the last bridge alone.","weapon":"Sun lance","combatStyle":{"cooldown":0.4,"reach":106,"damage":2},"animationTempo":0.96},{"id":"mira","name":"Rime","role":"The frost archivist","color":"#8ae2e9","dark":"#493f8f","skin":"#ddb291","hair":"#282332","style":"quiff","skills":[{"id":"frostnova","name":"Frost Nova","icon":"snowflake","cooldown":12,"description":"Freeze nearby monsters and slow the boss without stopping its phases."},{"id":"icevault","name":"Glacier Step","icon":"wind","cooldown":10,"description":"Leap into a frost veil, leaving a slowing sigil below."}],"passive":"Distinct skills; shared fair movement physics.","asset":"hero/mira","backstory":"Rime reads memories trapped inside Crystal Hollow. She entered the trials to recover the names erased by the Sovereigns, not for a crown.","weapon":"Frost staff","combatStyle":{"cooldown":0.39,"reach":100,"damage":2},"animationTempo":0.86}],"pets":[{"id":"wolf","name":"Fang Wolf","rarity":"super","unlockWorld":0,"fraction":0.07,"description":"Summon for 12 seconds. Bites a nearby target every 1.8 seconds; then returns to the shrine.","passive":"Auto attack","skills":[],"summonDuration":12,"summonCooldown":60,"summonCost":35,"summonCharges":3},{"id":"eagle","name":"Sky Eagle","rarity":"super","unlockWorld":2,"fraction":0.25,"description":"Summon for 18 seconds. Scout enemies, gaps and treasure, with increased coin reach.","passive":"Scout vision + coin reach","skills":[],"summonDuration":18,"summonCooldown":55,"summonCost":25,"summonCharges":3},{"id":"mole","name":"Mole Digger","rarity":"super","unlockWorld":4,"fraction":0.36,"description":"Summon for 12 seconds. Finds buried rewards through forward progress, not waiting.","passive":"Buried treasure","skills":[],"summonDuration":12,"summonCooldown":70,"summonCost":30,"summonCharges":3},{"id":"fox","name":"Ember Fox","rarity":"super","unlockWorld":6,"fraction":0.43,"description":"Summon for 10 seconds. Limited fire support and distance-driven supplies.","passive":"Fire support + supplies","skills":[],"summonDuration":10,"summonCooldown":75,"summonCost":40,"summonCharges":3},{"id":"turtle","name":"Stone Turtle","rarity":"super","unlockWorld":8,"fraction":0.51,"description":"Summon for 14 seconds. One guard against a hit; no protection against falling.","passive":"One guard per summon","skills":[],"summonDuration":14,"summonCooldown":75,"summonCost":35,"summonCharges":3},{"id":"dragon","name":"Astra Dragon","rarity":"super rare","unlockWorld":11,"fraction":0.84,"description":"One 10-second ultimate per attempt. Up to 15 contact kills while active; bosses resist instant defeat.","passive":"Dragon Scales • 15 enemies","skills":[{"id":"breath","name":"Dragon Breath","icon":"fire","cooldown":90,"duration":10,"description":"For 10 seconds, every enemy kill gives exactly 3× its otherwise-awarded points. Coins and distance are not multiplied."}],"summonDuration":10,"summonCooldown":180,"summonCost":80,"summonCharges":1},{"id":"orca","name":"Orca Prince","rarity":"super rare","unlockWorld":14,"fraction":0.84,"description":"One 12-second ultimate per attempt. Choose a brief clearing flood or water support over gaps.","passive":"Master of the tides","skills":[{"id":"flood","name":"Flood","icon":"water","cooldown":100,"duration":12,"description":"Clear all existing enemies in this map. For 12 seconds, sweep away newly encountered enemies and hostile projectiles, including across endless transitions."},{"id":"prince","name":"Orca Prince","icon":"crown","cooldown":100,"duration":12,"description":"For 12 seconds, water supports you across every cliff. Activating while falling lifts you onto the water. Spikes and enemies remain dangerous unless separately protected."}],"summonDuration":12,"summonCooldown":180,"summonCost":80,"summonCharges":1},{"id":"skywolf","name":"Sky Wolf","rarity":"fusion","unlockWorld":0,"fraction":0.5,"recipe":["wolf","eagle"],"description":"A forged companion. Bites nearby enemies and scouts while flying.","passive":"Bite + scout","skills":[],"summonDuration":8,"summonCooldown":90,"summonCost":45,"summonCharges":2},{"id":"emberguard","name":"Emberguard","rarity":"fusion","unlockWorld":0,"fraction":0.5,"recipe":["fox","turtle"],"description":"A forged companion. Fire support and one protective guard.","passive":"Fire + guard","skills":[],"summonDuration":9,"summonCooldown":90,"summonCost":50,"summonCharges":2}],"powers":[{"id":"shield","name":"Shield acorn","icon":"shield-halved","color":"#78d9fc","description":"Absorb one hit."},{"id":"heart","name":"Healing heart","icon":"heart","color":"#ff7494","description":"Restore one heart."},{"id":"spark","name":"Star charge","icon":"star","color":"#ffd56c","description":"Contact invincibility for 7 seconds. Falls remain dangerous."},{"id":"magnet","name":"Magnet feather","icon":"magnet","color":"#d4a1ff","description":"Attract coins for 12 seconds."},{"id":"double","name":"Coin clover","icon":"coins","color":"#a2e383","description":"Double coin value for 12 seconds."},{"id":"haste","name":"Speed boots","icon":"shoe-prints","color":"#83e4c0","description":"20% faster for 10 seconds."},{"id":"nova","name":"Nova bloom","icon":"star","color":"#e6aaff","description":"Orbiting stars strike nearby enemies for 10 seconds."},{"id":"fire","name":"Fire fruit","icon":"fire","color":"#ff9a68","description":"Automatically launch fireballs at nearby enemies for 12 seconds; ignore fire-imp contact."},{"id":"ice","name":"Ice blossom","icon":"snowflake","color":"#a9edff","description":"Freeze nearby foes and fire slowing ice shards for 12 seconds."},{"id":"giant","name":"Giant heart","icon":"heart","color":"#fa709a","description":"Gain up to five hearts for 20 seconds; revert safely afterward."},{"id":"thunder","name":"Thunder totem","icon":"bolt","color":"#ffe38c","description":"Lightning strikes nearby enemies for 12 seconds."},{"id":"phase","name":"Phase crystal","icon":"moon","color":"#b4a0ff","description":"Pass through breakable bricks and cache blocks; ignore contact damage for 6 seconds. Solid ground stays solid."},{"id":"rescue","name":"Phoenix feather","icon":"feather","color":"#ffa4c4","description":"One automatic rescue from a fall."},{"id":"bomb","name":"Bomba cache","icon":"burst","color":"#ffb64d","description":"Immediately detonate a safe shockwave around you."}],"maps":[{"id":0,"name":"Sunpetal Valley","tagline":"A bright beginning","biome":"meadow","sky":["#7de0dd","#e6f8be"],"far":"#a9d7a0","near":"#50ad87","grass":"#87de72","earth":"#805e48","length":172,"par":64,"gaps":[31,59,94,132],"roster":["slime","beetle"],"night":false,"coinGoal":20,"difficulty":1,"chapter":0,"baseLength":172,"lengthMultiplier":5,"basePar":64,"enemyBudget":7,"enemyDensity":1,"powerDensity":1,"music":"frontier","background":"sky","tileSet":"starry","tileEdits":[],"extraSpawns":[],"communityTheme":"starry","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":1,"name":"Moonlit Grove","tagline":"Follow the fireflies","biome":"forest","sky":["#182748","#8798b5"],"far":"#526f88","near":"#2e686f","grass":"#67ba95","earth":"#495764","length":180,"par":69,"gaps":[28,63,99,139],"roster":["slime","bat","maw"],"night":true,"coinGoal":22,"difficulty":1,"chapter":0,"baseLength":180,"lengthMultiplier":5,"basePar":69,"enemyBudget":8,"enemyDensity":1,"powerDensity":1,"music":"moonlight","background":"cosmic","tileSet":"starry","tileEdits":[],"extraSpawns":[],"communityTheme":"starry","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":2,"name":"Amber Skyway","tagline":"Above the golden clouds","biome":"sky","sky":["#f39976","#ffe6b1"],"far":"#e4b593","near":"#bd978d","grass":"#ffcb80","earth":"#946b61","length":188,"par":73,"gaps":[34,69,107,150],"roster":["beetle","bat","hopper"],"night":false,"coinGoal":24,"difficulty":1,"chapter":0,"baseLength":188,"lengthMultiplier":5,"basePar":73,"enemyBudget":10,"enemyDensity":1,"powerDensity":1,"music":"skyward","background":"sky","tileSet":"waste","tileEdits":[],"extraSpawns":[],"communityTheme":"waste","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":3,"name":"Coral Coast","tagline":"Make waves, chase gold","biome":"coast","sky":["#56c9e9","#d9fcde"],"far":"#75cfc3","near":"#35a7ad","grass":"#fbe39c","earth":"#bd8a60","length":196,"par":77,"gaps":[29,65,103,143,172],"roster":["crab","slime","wisp"],"night":false,"coinGoal":26,"difficulty":2,"chapter":0,"baseLength":196,"lengthMultiplier":5,"basePar":77,"enemyBudget":11,"enemyDensity":1,"powerDensity":1,"music":"frontier","background":"sky","tileSet":"starry","tileEdits":[],"extraSpawns":[],"communityTheme":"starry","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":4,"name":"Candy Canyon","tagline":"Sweet paths. Sneaky foes.","biome":"candy","sky":["#b28ce5","#ffe6d9"],"far":"#e9aad7","near":"#b785c7","grass":"#ffa7d1","earth":"#ad738f","length":204,"par":81,"gaps":[36,73,109,150,181],"roster":["hopper","beetle","maw"],"night":false,"coinGoal":28,"difficulty":2,"chapter":0,"baseLength":204,"lengthMultiplier":5,"basePar":81,"enemyBudget":13,"enemyDensity":1,"powerDensity":1,"music":"skyward","background":"sky","tileSet":"waste","tileEdits":[],"extraSpawns":[],"communityTheme":"waste","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":5,"name":"Frostpeak Pass","tagline":"Keep your cool","biome":"snow","sky":["#5daed3","#e1f7ff"],"far":"#a0d1e1","near":"#67a2b8","grass":"#effbff","earth":"#7495b0","length":212,"par":85,"gaps":[32,68,107,147,187],"roster":["slime","bat","spiker"],"night":false,"coinGoal":30,"difficulty":2,"chapter":1,"baseLength":212,"lengthMultiplier":5,"basePar":85,"enemyBudget":14,"enemyDensity":1,"powerDensity":1,"music":"moonlight","background":"sky","tileSet":"starry","tileEdits":[],"extraSpawns":[],"communityTheme":"starry","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":6,"name":"Clockwork City","tagline":"Every second counts","biome":"clock","sky":["#599d9d","#e4e6b5"],"far":"#7baca0","near":"#407679","grass":"#dcc379","earth":"#6d6354","length":220,"par":89,"gaps":[37,76,114,155,192],"roster":["sentry","drone","golem"],"night":false,"coinGoal":32,"difficulty":3,"chapter":1,"baseLength":220,"lengthMultiplier":5,"basePar":89,"enemyBudget":16,"enemyDensity":1,"powerDensity":1,"music":"clockwork","background":"sky","tileSet":"waste","tileEdits":[],"extraSpawns":[],"communityTheme":"waste","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":7,"name":"Mushroom Marsh","tagline":"Into the emerald mist","biome":"swamp","sky":["#446d80","#b0dcbb"],"far":"#5e9386","near":"#326e6f","grass":"#a4d879","earth":"#4f6050","length":228,"par":93,"gaps":[29,64,103,143,181,206],"roster":["slime","maw","ninja"],"night":false,"coinGoal":34,"difficulty":3,"chapter":1,"baseLength":228,"lengthMultiplier":5,"basePar":93,"enemyBudget":17,"enemyDensity":1,"powerDensity":1,"music":"moonlight","background":"sky","tileSet":"starry","tileEdits":[],"extraSpawns":[],"communityTheme":"starry","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":8,"name":"Ember Caverns","tagline":"The floor has opinions","biome":"lava","sky":["#351e42","#d8845a"],"far":"#875276","near":"#522d50","grass":"#fba065","earth":"#6c4854","length":236,"par":97,"gaps":[34,72,113,156,194,216],"roster":["imp","spiker","golem"],"night":true,"coinGoal":36,"difficulty":3,"chapter":1,"baseLength":236,"lengthMultiplier":5,"basePar":97,"enemyBudget":19,"enemyDensity":1,"powerDensity":1,"music":"clockwork","background":"cosmic","tileSet":"waste","tileEdits":[],"extraSpawns":[],"communityTheme":"waste","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":9,"name":"Crystal Hollow","tagline":"Light up the underground","biome":"crystal","sky":["#202858","#81bbe0"],"far":"#525db3","near":"#4a5495","grass":"#aadbf2","earth":"#555884","length":244,"par":101,"gaps":[31,67,107,149,191,222],"roster":["wisp","bat","golem"],"night":true,"coinGoal":38,"difficulty":4,"chapter":1,"baseLength":244,"lengthMultiplier":5,"basePar":101,"enemyBudget":20,"enemyDensity":1,"powerDensity":1,"music":"starlight","background":"cosmic","tileSet":"starry","tileEdits":[],"extraSpawns":[],"communityTheme":"starry","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":10,"name":"Sunken Ruins","tagline":"An ancient road awakens","biome":"ruins","sky":["#3e9597","#d9edc3"],"far":"#7daaa0","near":"#4e8480","grass":"#b9d295","earth":"#727b6b","length":252,"par":105,"gaps":[36,74,114,157,199,231],"roster":["crab","maw","sentry"],"night":false,"coinGoal":40,"difficulty":4,"chapter":2,"baseLength":252,"lengthMultiplier":5,"basePar":105,"enemyBudget":22,"enemyDensity":1,"powerDensity":1,"music":"moonlight","background":"sky","tileSet":"waste","tileEdits":[],"extraSpawns":[],"communityTheme":"waste","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":11,"name":"Thunder Citadel","tagline":"Run into the storm","biome":"storm","sky":["#293d65","#98acbf"],"far":"#4c6583","near":"#334b6c","grass":"#aac7d5","earth":"#546177","length":260,"par":109,"gaps":[33,70,110,153,196,238],"roster":["drone","ninja","sentry"],"night":true,"coinGoal":42,"difficulty":4,"chapter":2,"baseLength":260,"lengthMultiplier":5,"basePar":109,"enemyBudget":23,"enemyDensity":1,"powerDensity":1,"music":"clockwork","background":"cosmic","tileSet":"starry","tileEdits":[],"extraSpawns":[],"communityTheme":"starry","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":12,"name":"Sakura Summit","tagline":"One last mountain","biome":"sakura","sky":["#96c3df","#ffe2d5"],"far":"#c6b6cf","near":"#b28bb3","grass":"#ffd1e2","earth":"#95738b","length":268,"par":113,"gaps":[30,67,108,150,192,235,251],"roster":["hopper","ninja","spiker"],"night":false,"coinGoal":44,"difficulty":5,"chapter":2,"baseLength":268,"lengthMultiplier":5,"basePar":113,"enemyBudget":25,"enemyDensity":1,"powerDensity":1,"music":"skyward","background":"sky","tileSet":"starry","tileEdits":[],"extraSpawns":[],"communityTheme":"starry","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":13,"name":"Neon Nightway","tagline":"No brakes after midnight","biome":"neon","sky":["#121b3b","#655ba4"],"far":"#34476e","near":"#213650","grass":"#83f5d8","earth":"#424662","length":276,"par":117,"gaps":[35,73,115,156,199,241,260],"roster":["drone","sentry","wisp"],"night":true,"coinGoal":46,"difficulty":5,"chapter":2,"baseLength":276,"lengthMultiplier":5,"basePar":117,"enemyBudget":26,"enemyDensity":1,"powerDensity":1,"music":"clockwork","background":"cosmic","tileSet":"starry","tileEdits":[],"extraSpawns":[],"communityTheme":"starry","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]},{"id":14,"name":"Starfall Sanctuary","tagline":"Your legend starts here","biome":"cosmic","sky":["#1c1949","#8b83c2"],"far":"#555291","near":"#373a71","grass":"#d9c2ff","earth":"#595482","length":284,"par":121,"gaps":[31,70,112,154,198,240,268],"roster":["golem","imp","ninja","wisp","drone"],"night":true,"coinGoal":48,"difficulty":5,"chapter":2,"baseLength":284,"lengthMultiplier":5,"basePar":121,"enemyBudget":28,"enemyDensity":1,"powerDensity":1,"music":"starlight","background":"cosmic","tileSet":"starry","tileEdits":[],"extraSpawns":[],"communityTheme":"starry","regions":["Approach","Ascent","Reliquary","Return","Sovereign Arena"]}]};
````

## `game/controls.js`

Tasks: 3. OLD SHA-256: `393d2e391740e1983661f887d7a47677e6a8ddb307b27d0169afa6d8a456fb5e`. NEW SHA-256: `6700308db38f02540bf1bf29eb04d5b28eae2d556d1e06e6abc2473c963a7650`.

### insert: OLD 18–17; NEW 18–20

OLD
````text
````

NEW
````text

/** Cropped down-chevron + explicit action label; hold semantics are unchanged. */
export const CONTROL_ART={crouchControl:{icon:'crouch',label:'CROUCH',ariaLabel:'Hold to crouch; release to stand',asset:'ui/icons/crouch'}};
````

## `game/engine.js`

Tasks: 4,8. OLD SHA-256: `a043cb566632199edc6a94cc113c7b65d4268e44dc056082112318dd3a2ff0ff`. NEW SHA-256: `6a74f507df05d80bd11e6df46d0b3ca8b86062e371434215e400a3b1626ce978`.

### replace: OLD 2–2; NEW 2–2

OLD
````text
import {combatProfile} from './combat-profiles.js';
````

NEW
````text
import {combatProfile,isUnarmed,unarmedPhase} from './combat-profiles.js';
````

### insert: OLD 429–428; NEW 429–429

OLD
````text
````

NEW
````text
    if(isUnarmed(p)){p.unarmedAttack=null;p.attackTime=0;p.attackCD=0;p.attackHits=[];r.bufferedCombat=null;r.impactPause=0;}
````

### replace: OLD 650–650; NEW 651–652

OLD
````text
    if(r.impactPause>0&&!r.localPvp){r.impactPause=Math.max(0,r.impactPause-dt);return;}
````

NEW
````text
    if(r.impactPause>0&&!r.localPvp){if(isUnarmed(p))r.bufferedCombat={attack:!!(r.bufferedCombat?.attack||input.attack),dodge:!!(r.bufferedCombat?.dodge||input.dodge),aim:input.aim||0};r.impactPause=Math.max(0,r.impactPause-dt);return;}
    if(r.bufferedCombat){input={...input,attack:input.attack||r.bufferedCombat.attack,dodge:input.dodge||r.bufferedCombat.dodge,aim:input.aim||r.bufferedCombat.aim};r.bufferedCombat=null;}
````

### replace: OLD 1126–1126; NEW 1128–1128

OLD
````text
    const p=r.player;if(r.complete||r.failed||p.deadFor>0||p.attackCD>0||p.stamina<8||p.stagger>0)return false;
````

NEW
````text
    const p=r.player;if(r.complete||r.failed||p.deadFor>0||p.attackCD>0||(isUnarmed(p)&&p.dodge>0)||p.stamina<8||p.stagger>0)return false;
````

### replace: OLD 1128–1128; NEW 1130–1131

OLD
````text
    emit(r,'slash',p.x,p.y,{chain:p.attackChain});return true;
````

NEW
````text
    if(isUnarmed(p)){p.unarmedAttack={tick:0,startup:profile.startupFrames,active:profile.activeFrames,total:profile.startupFrames+profile.activeFrames+profile.recoveryFrames,accumulator:0};}
    else emit(r,'slash',p.x,p.y,{chain:p.attackChain});return true;
````

### replace: OLD 1131–1131; NEW 1134–1134

OLD
````text
    const p=r.player;if(r.complete||r.failed||p.deadFor>0||p.throwCD>0||p.knives<=0||p.stagger>0)return false;
````

NEW
````text
    const p=r.player;if(r.complete||r.failed||p.deadFor>0||isUnarmed(p)||p.throwCD>0||p.knives<=0||p.stagger>0)return false;
````

### insert: OLD 1137–1136; NEW 1140–1142

OLD
````text
````

NEW
````text
    // A dodge can cancel unarmed recovery, but neither startup nor the active strike.
    if(isUnarmed(p)&&['startup','active'].includes(unarmedPhase(p)))return false;
    if(isUnarmed(p)&&unarmedPhase(p)==='recovery'){p.unarmedAttack=null;p.attackCD=0;p.attackTime=0;}
````

### insert: OLD 1140–1139; NEW 1146–1146

OLD
````text
````

NEW
````text
    if(isUnarmed(p)){const reach=26;if(p.attackAim>.5&&!p.grounded)return {x:p.x+2,y:p.y+p.h-3,w:p.w-4,h:reach};if(p.attackAim<-.5)return {x:p.x+2,y:p.y-reach+3,w:p.w-4,h:reach};return {x:p.facing>0?p.x+p.w-3:p.x-reach+3,y:p.y+9,w:reach,h:20};}
````

### replace: OLD 1142–1142; NEW 1149–1149

OLD
````text
    const reach=p.normalizedCombat?82:(heroById(p.character).combatStyle?.reach||82);
````

NEW
````text
    const reach=p.normalizedCombat?82:(combatProfile(p).reach||heroById(p.character).combatStyle?.reach||82);
````

### insert: OLD 1148–1147; NEW 1155–1159

OLD
````text
````

NEW
````text
    if(isUnarmed(p)&&p.unarmedAttack){
        const a=p.unarmedAttack;a.accumulator+=dt*60;const ticks=Math.floor(a.accumulator+1e-8);a.accumulator-=ticks;a.tick+=ticks;
        p.attackCD=Math.max(0,(a.total-a.tick)/60);p.attackTime=Math.max(0,(a.startup+a.active-a.tick)/60);
        if(a.tick>=a.total)p.unarmedAttack=null;
    }
````

### replace: OLD 1153–1153; NEW 1165–1166

OLD
````text
    const profile=combatProfile(p),active=p.attackTime>0&&p.attackTime<=profile.active;
````

NEW
````text
    const profile=combatProfile(p),active=isUnarmed(p)?unarmedPhase(p)==='active':p.attackTime>0&&p.attackTime<=profile.active;
    if(active&&isUnarmed(p)&&!p.attackReleased){p.attackReleased=true;emit(r,'punch',p.x,p.y,{chain:p.attackChain});}
````

### replace: OLD 1157–1157; NEW 1170–1173

OLD
````text
        p.attackHits.push(e.id);defeat(r,e,(p.normalizedCombat?2:heroById(p.character).combatStyle?.damage||2)+(p.attackChain===3?1:0),'melee');p.focus=Math.min(100,p.focus+5);p.soul=Math.min(100,p.soul+5);
````

NEW
````text
        p.attackHits.push(e.id);const before=e.hp;
        defeat(r,e,isUnarmed(p)?1:(p.normalizedCombat?2:combatProfile(p).damage||heroById(p.character).combatStyle?.damage||2)+(p.attackChain===3?1:0),'melee');
        if(isUnarmed(p)&&e.hp<before){r.impactPause=3/60;emit(r,'unarmed-hit',e.x,e.y);}
        p.focus=Math.min(100,p.focus+5);p.soul=Math.min(100,p.soul+5);
````

## `game/equipment.js`

Tasks: 4,8. OLD SHA-256: `NEW FILE`. NEW SHA-256: `6133baa737949e5d0d61a5cdf38302d5a65ba86f968380acb3649dba5e097a47`.

### insert: OLD 1–0; NEW 1–41

OLD
````text
````

NEW
````text
import {COMBAT_PROFILES} from './combat-profiles.js';
import {heroStats} from './hero-stats.js';
/** `shield` is the historical save/weapon ID for the hammer. Never migrate it by display name. */
export const WEAPON_RULES=Object.freeze({
 gauntlet:{class:'gauntlet',label:'Gravity gauntlet',min:{power:100,speed:100}},
 dual:{class:'dual-dagger',label:'Twin Fang daggers',min:{power:120,speed:105}},
 staff:{class:'staff',label:'Orbit Crescent staff',min:{magic:50}},
 dagger:{class:'dagger',label:'Shadow knife',min:{power:120,speed:110}},
 shield:{class:'hammer',label:'Stonebreaker hammer',min:{power:95,stamina:120}},
 sabre:{class:'sabre',label:'Wind scimitar',min:{power:100,speed:95}},
 gadget:{class:'gadget',label:'Clockwork knuckle',min:{speed:90,stamina:100}},
 bow:{class:'bow',label:'Sky bow',min:{speed:100,stamina:95}},
 lance:{class:'lance',label:'Sun lance',min:{power:95,stamina:95}},
 frost_staff:{class:'staff',label:'Frost staff',min:{magic:50}}
});
export const WEAPON_FREE_HEROES=Object.freeze(['wissem']);
export function signatureWeapon(hero){return COMBAT_PROFILES[hero]?.weapon;}
export function weaponEligibility(hero,type){
 const stats=heroStats(hero);
 if(!stats)return {ok:false,reasons:['Unknown hero']};
 if(type===null)return {ok:true,reasons:[]};
 const rule=WEAPON_RULES[type];if(!rule)return {ok:false,reasons:['Unknown weapon']};
 const reasons=Object.entries(rule.min).filter(([stat,min])=>stats[stat]<min).map(([stat,min])=>`${stat} ${stats[stat]} / ${min} required`);
 return {ok:!reasons.length,reasons};
}
export function equipmentStatus(hero,type){
 const eligible=weaponEligibility(hero,type);
 const artReady=type===null||type===signatureWeapon(hero)||WEAPON_FREE_HEROES.includes(hero);
 return {...eligible,artReady,ok:eligible.ok&&artReady,reasons:[...eligible.reasons,...(!artReady?['Weapon-free body art required for a different weapon']:[])]};
}
export function cleanWeapons(raw={}){
 const result={};for(const hero of Object.keys(COMBAT_PROFILES)){
  const type=Object.hasOwn(raw||{},hero)?raw[hero]:signatureWeapon(hero);
  result[hero]=equipmentStatus(hero,type).ok?type:signatureWeapon(hero);
 }return result;
}
export function equippedWeapon(asc,hero){return cleanWeapons(asc?.weapons)[hero];}
export function equipWeapon(save,hero,type){
 if(!save?.ascension||!equipmentStatus(hero,type).ok)return false;
 save.ascension.weapons={...cleanWeapons(save.ascension.weapons),[hero]:type};return true;
}
````

## `game/hero-stats.js`

Tasks: 5,8. OLD SHA-256: `NEW FILE`. NEW SHA-256: `f2fe410eea5f9e4a41024993e74d9a061ba65f37a61830a57b210798d8d50133`.

### insert: OLD 1–0; NEW 1–24

OLD
````text
````

NEW
````text
import {COMBAT_PROFILES} from './combat-profiles.js';
import {HEROES} from './data.js';
/** Fixed capability ratings, not purchasable levels or extra damage multipliers.
 * 100 = the original .46s, two-damage reference cycle. See docs/HERO-STATS.md.
 */
export const STAT_REFERENCE = Object.freeze({cycle:.46,damage:2,weights:{speed:.5,accel:.3,air:.2}});
export function heroStats(id) {
 const p=COMBAT_PROFILES[id],hero=HEROES.find(h=>h.id===id);
 if(!p||!hero) return null;
 const cycle=p.startup+p.active+p.recovery;
 const damage=hero.combatStyle?.damage||2;
 const magical=['arcane','ice'].includes(p.projectile);
 const magicDamage=p.projectile==='arcane'?3:2;
 return Object.freeze({
  power:Math.round(100*(damage/2)*STAT_REFERENCE.cycle/cycle),
  magic:magical?Math.round(100*(magicDamage/2)*STAT_REFERENCE.cycle/cycle):0,
  speed:Math.round(100*(p.speed*.5+p.accel*.3+p.air*.2)),
  stamina:Math.round(100*cycle/STAT_REFERENCE.cycle),
  cycle,baseDamage:damage,staminaPerSecond:8/cycle,
  provenance:{startup:p.startup,active:p.active,recovery:p.recovery,speed:p.speed,accel:p.accel,air:p.air,projectile:p.projectile||null}
 });
}
export const STAT_LABELS={power:'Power',magic:'Magic',speed:'Speed',stamina:'Stamina'};
export const STAT_HELP={power:'Base melee damage / complete attack cycle, relative to the original 2-damage, 0.46s reference. Not a second damage multiplier.',magic:'Arcane or ice projectile throughput. Mechanical arrows and bolts do not require magic.',speed:'50% run speed + 30% acceleration + 20% air control; baseline 100.',stamina:'Attack sustainability at the unchanged 8-stamina cost. Higher = lower continuous basic-attack drain. Pool remains 100.'};
````

## `game/heroes.json`

Tasks: 6. OLD SHA-256: `4e387f269798e56ef9e460769e0ed633e7cdb82046adcfbedb68a61993814cc9`. NEW SHA-256: `382a322e482a04b09333d738689eceb7c490cde13a4399f28d76dafae4c8a5c8`.

### replace: OLD 40–40; NEW 40–40

OLD
````text
    "name": "Kossay",
````

NEW
````text
    "name": "Kael",
````

### replace: OLD 65–65; NEW 65–65

OLD
````text
    "backstory": "A pathfinder from the Moonlit border. Kossay left the royal hunters when they marked an innocent village as prey; his twin blades now protect the people they once threatened.",
````

NEW
````text
    "backstory": "A pathfinder from the Moonlit border. Kael left the royal hunters when they marked an innocent village as prey; his twin blades now protect the people they once threatened.",
````

### replace: OLD 76–76; NEW 76–76

OLD
````text
    "name": "Yakine",
````

NEW
````text
    "name": "Astra",
````

### replace: OLD 101–101; NEW 101–101

OLD
````text
    "backstory": "Keeper of an observatory lost between seconds. Yakine bends brief moments of time, searching the floating worlds for the missing constellations.",
````

NEW
````text
    "backstory": "Keeper of an observatory lost between seconds. Astra bends brief moments of time, searching the floating worlds for the missing constellations.",
````

### replace: OLD 112–112; NEW 112–112

OLD
````text
    "name": "Taky",
````

NEW
````text
    "name": "Nyx",
````

### replace: OLD 137–137; NEW 137–137

OLD
````text
    "backstory": "A courier nobody remembers seeing. Taky learned to step through shadows to carry a final message across a kingdom swallowed by night.",
````

NEW
````text
    "backstory": "A courier nobody remembers seeing. Nyx learned to step through shadows to carry a final message across a kingdom swallowed by night.",
````

### replace: OLD 148–148; NEW 148–148

OLD
````text
    "name": "Garsi",
````

NEW
````text
    "name": "Bront",
````

### replace: OLD 173–173; NEW 173–173

OLD
````text
    "backstory": "The last guardian of a shattered citadel. Garsi rebuilt a suit of armor from its gates and carries the duty of sheltering others into every trial.",
````

NEW
````text
    "backstory": "The last guardian of a shattered citadel. Bront rebuilt a suit of armor from its gates and carries the duty of sheltering others into every trial.",
````

### replace: OLD 184–184; NEW 184–184

OLD
````text
    "name": "Tounsi",
````

NEW
````text
    "name": "Zephyr",
````

### replace: OLD 209–209; NEW 209–209

OLD
````text
    "backstory": "A sailor of sand and wind, exiled after returning a stolen relic to its rightful village. Tounsi follows the sky currents with a blade and an unfinished map.",
````

NEW
````text
    "backstory": "A sailor of sand and wind, exiled after returning a stolen relic to its rightful village. Zephyr follows the sky currents with a blade and an unfinished map.",
````

### replace: OLD 220–220; NEW 220–220

OLD
````text
    "name": "Youssef",
````

NEW
````text
    "name": "Volt",
````

### replace: OLD 245–245; NEW 245–245

OLD
````text
    "backstory": "An inventor whose rescue machine accidentally awakened a Sovereign. Youssef enters the ruins to repair what he started, one improbable gadget at a time.",
````

NEW
````text
    "backstory": "An inventor whose rescue machine accidentally awakened a Sovereign. Volt enters the ruins to repair what he started, one improbable gadget at a time.",
````

### replace: OLD 256–256; NEW 256–256

OLD
````text
    "name": "Loey",
````

NEW
````text
    "name": "Skye",
````

### replace: OLD 281–281; NEW 281–281

OLD
````text
    "backstory": "A scout who can hear the language of the old trees. Loey searches for the seed of the first forest while defending the creatures displaced by the trials.",
````

NEW
````text
    "backstory": "A scout who can hear the language of the old trees. Skye searches for the seed of the first forest while defending the creatures displaced by the trials.",
````

### replace: OLD 292–292; NEW 292–292

OLD
````text
    "name": "Rayan",
````

NEW
````text
    "name": "Sol",
````

### replace: OLD 317–317; NEW 317–317

OLD
````text
    "backstory": "Rayan once kept the bridges of Amber Skyway open through a century of storms. His oath is simple: nobody crosses the last bridge alone.",
````

NEW
````text
    "backstory": "Sol once kept the bridges of Amber Skyway open through a century of storms. His oath is simple: nobody crosses the last bridge alone.",
````

### replace: OLD 328–328; NEW 328–328

OLD
````text
    "name": "Mira",
````

NEW
````text
    "name": "Rime",
````

### replace: OLD 353–353; NEW 353–353

OLD
````text
    "backstory": "Mira reads memories trapped inside Crystal Hollow. She entered the trials to recover the names erased by the Sovereigns, not for a crown.",
````

NEW
````text
    "backstory": "Rime reads memories trapped inside Crystal Hollow. She entered the trials to recover the names erased by the Sovereigns, not for a crown.",
````

## `game/icons.js`

Tasks: 2,3. OLD SHA-256: `3ee9aea34dbad3f384d5b4014177f5fec8e92ebf7bfcf2e88d7606b1a61c5128`. NEW SHA-256: `529662b01b8e10dcfb6da664c586d68ff32c7ca756ec8cdbec31732fc6b2bdd6`.

### insert: OLD 1–0; NEW 1–1

OLD
````text
````

NEW
````text
import {croppedIcon} from './ui-crops.js';
````

### replace: OLD 21–21; NEW 22–22

OLD
````text
export const icon=(name)=>ICONS[name]||ICONS["star"];
````

NEW
````text
export const icon=(name)=>croppedIcon(name)||ICONS[name]||ICONS["star"];
````

## `game/index.html`

Tasks: 2,3,9. OLD SHA-256: `530b8ed7b6fa56a465a2a218524d827565b109d7e226cb95016ddcb4ccf8bc50`. NEW SHA-256: `b5617b3daa1933d5ee78d332cb0ba9ccdaa43ec6e3d96065e779c964e12ea206`.

### replace: OLD 1–1; NEW 1–1

OLD
````text
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"><meta name="theme-color" content="#172943"><meta name="color-scheme" content="dark"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; connect-src https:; media-src data:; font-src 'none'; base-uri 'none'; form-action 'none'"><title>Super Wiss Ascension</title><style>/*__STYLE__*/</style></head><body>
````

NEW
````text
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"><meta name="theme-color" content="#172943"><meta name="color-scheme" content="dark"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; connect-src https:; media-src data:; font-src 'self' data:; base-uri 'none'; form-action 'none'"><title>Super Wiss Ascension</title><style>/*__STYLE__*/</style></head><body>
````

### replace: OLD 4–4; NEW 4–4

OLD
````text
 <header class="topbar"><button id="profileButton" class="profile" aria-label="Open player profile"><canvas id="profilePortrait" width="90" height="90"></canvas><span><strong id="profileName">Wissem</strong><small id="profileLevel">EXPLORER LV. 1</small><i class="xp-track"><i id="xpBar"></i></i></span></button><div class="topright"><span class="wallet"><i data-icon="coins"></i><b id="gold">0</b></span><span class="star-wallet"><i data-icon="star"></i><b id="totalStars">0</b><small id="starLimit">/45</small></span><button id="socialButton" class="icon-button" aria-label="Profile and friends"><i data-icon="users"></i></button><button id="settingsButton" class="icon-button" aria-label="Settings"><i data-icon="gear"></i></button></div></header>
````

NEW
````text
 <header class="topbar"><button id="profileButton" class="profile" aria-label="Open player profile"><canvas id="profilePortrait" width="90" height="90"></canvas><span><strong id="profileName">Wissem</strong><small id="profileLevel">EXPLORER LV. 1</small><i class="xp-track"><i id="xpBar"></i></i><small id="xpFraction">0 / 500</small></span></button><div class="topright"><span class="wallet"><i data-icon="coins"></i><b id="gold">0</b><button id="goldPlus" class="wallet-plus" aria-label="Open earned-coin shop"><i data-icon="plus"></i></button></span><span class="star-wallet"><i data-icon="star-wallet"></i><b id="totalStars">0</b><small id="starLimit">/45</small><button id="starPlus" class="wallet-plus" aria-label="Find worlds that award stars"><i data-icon="plus"></i></button></span><button id="socialButton" class="icon-button" aria-label="Profile and friends"><i data-icon="users"></i></button><button id="settingsButton" class="icon-button" aria-label="Settings"><i data-icon="gear"></i></button></div></header>
````

### replace: OLD 8–8; NEW 8–8

OLD
````text
    <div class="hero-label"><span id="homeHero">WISSEM</span><small id="homeSkill">GRAVITY CONTROL</small><button id="homeCustomize">Change outfit & skills</button></div>
````

NEW
````text
    <div class="hero-label"><span id="homeHero">WISSEM</span><small id="homeSkill">GRAVITY CONTROL</small><small id="homeLoadout"></small><button id="homeCustomize">Loadout & wardrobe</button></div>
````

### replace: OLD 21–21; NEW 21–21

OLD
````text
 <section id="page-bosses" class="page"><div class="page-heading"><div><span class="eyebrow">NO LONG RUN-UP. JUST THE FIGHT.</span><h2>The Sovereign Trials</h2></div><button class="chip" id="bossDifficulty"></button></div><div class="boss-grid" id="bossGrid"></div></section>
````

NEW
````text
 <section id="page-bosses" class="page"><div class="page-heading"><div><span class="eyebrow">NO LONG RUN-UP. JUST THE FIGHT.</span><h2>Boss Hunt</h2></div><div class="segment" id="bossDifficulty" role="group" aria-label="Boss difficulty"></div></div><div class="boss-grid" id="bossGrid"></div></section>
````

### replace: OLD 23–23; NEW 23–23

OLD
````text
 <section id="page-forge" class="page"><div class="page-heading"><div><span class="eyebrow">NO CASH SHOP. EVERY COIN EARNED.</span><h2>The Astral Forge</h2></div><div id="forgeTabs" class="segment"></div></div><div id="forgeContent" class="forge-content"></div></section>
````

NEW
````text
 <section id="page-forge" class="page"><div class="page-heading"><div><span class="eyebrow">COSMETICS. NO COMBAT ADVANTAGE.</span><h2>Make it yours.</h2></div><div id="forgeTabs" class="segment"></div></div><div id="forgeContent" class="forge-content"></div></section>
````

### replace: OLD 25–25; NEW 25–25

OLD
````text
 <nav class="bottom-nav" aria-label="Game navigation"><button data-page="home" class="active"><i data-icon="house"></i><span>Home</span></button><button data-page="campaign"><i data-icon="map"></i><span>Worlds</span></button><button data-page="heroes"><i data-icon="users"></i><span>Heroes</span></button><button data-page="pets"><i data-icon="paw"></i><span>Pets</span></button><button data-page="forge"><i data-icon="wand-magic-sparkles"></i><span>Shop</span></button><button data-page="missions"><i data-icon="bullseye"></i><span>Missions</span><b class="notification" id="questDot" hidden></b></button><button data-page="records"><i data-icon="trophy"></i><span>Records</span></button><button data-page="profile"><i data-icon="user"></i><span>Profile</span></button><button id="navSettings"><i data-icon="gear"></i><span>Settings</span></button></nav>
````

NEW
````text
 <nav class="bottom-nav" aria-label="Game navigation"><button data-page="home" class="active"><i data-icon="home"></i><span>Home</span></button><button data-page="campaign"><i data-icon="worlds"></i><span>Worlds</span></button><button data-page="heroes"><i data-icon="heroes"></i><span>Heroes</span></button><button data-page="pets"><i data-icon="pets"></i><span>Pets</span></button><button data-page="forge"><i data-icon="shop"></i><span>Shop</span></button><button data-page="missions"><i data-icon="missions"></i><span>Missions</span><b class="notification" id="questDot" hidden></b></button><button data-page="records"><i data-icon="records"></i><span>Records</span></button><button data-page="profile"><i data-icon="profile"></i><span>Profile</span></button><button id="navSettings"><i data-icon="gear"></i><span>Settings</span></button></nav>
````

### replace: OLD 27–28; NEW 27–28

OLD
````text
<div id="gameUI" hidden><div class="hud-top"><div class="hud-left"><button id="pauseButton" class="icon-button" aria-label="Pause game"><i data-icon="pause"></i></button><div class="vitals"><div id="hearts" class="hearts"></div><small id="lives">3 attempts</small></div><div class="hud-coins"><i data-icon="coins"></i><b id="runCoins">0</b></div></div><div class="hud-center"><small id="runMapLabel">WORLD 01</small><strong id="runMapName">Sunpetal Valley</strong><div class="course-progress"><i id="courseBar"></i></div></div><div class="hud-score"><small id="scoreLabel">SCORE</small><b id="runScore">0</b><span id="runTime">0:00.0</span></div></div><div id="petDock" class="pet-dock" hidden><div class="pet-status"><img id="petFace" alt="Equipped pet"><small id="petPassive"></small></div><button id="petControl" data-control="pet" class="control pet-action"><i></i><b></b><span></span></button><button id="petControl2" data-control="pet2" class="control pet-action"><i></i><b></b><span></span></button></div><div class="combat-resources"><div><span>FOCUS</span><i><b id="focusFill"></b></i><small id="focusValue">100</small></div><div><span>STAMINA</span><i><b id="staminaFill"></b></i><small id="staminaValue">100</small></div></div><div id="bossHUD" hidden><small id="bossTitle"></small><strong id="bossName"></strong><div class="boss-health-track"><i id="bossHealth"></i><b></b><b></b></div><span id="bossPhase"></span><div class="stagger-track"><i id="bossStagger"></i></div><small class="stagger-label">STAGGER</small></div><div id="tacticalObjective"></div><div id="nearbyScore" hidden></div><button id="quickLayout" class="quick-layout" aria-label="Switch control preset">PRESET A</button><button id="interactControl" data-control="interact" class="control combat-button" hidden aria-label="Hold to revive nearby ally"><i data-icon="heart"></i><span>REVIVE</span></button><div id="effectsHUD" class="effects-hud"></div><div id="combo" class="combo" hidden>COMBO ×2</div><div id="stageBanner" class="stage-banner" hidden></div><div id="gameHint" class="game-hint" hidden></div><div class="touch-controls" id="touchControls"><div id="analogControl" role="slider" aria-label="Movement joystick; drag to move and aim" aria-valuemin="-1" aria-valuemax="1" aria-valuenow="0"><span class="analog-ring"></span><span class="analog-axis-x"></span><span class="analog-axis-y"></span><i id="analogKnob"></i></div><div class="movement"><button id="leftControl" data-control="left" class="control move-control" aria-label="Move left"><i data-icon="chevron-left"></i></button><button id="rightControl" data-control="right" class="control move-control" aria-label="Move right"><i data-icon="chevron-right"></i></button></div><div class="actions"><button id="crouchControl" data-control="crouch" class="control combat-button" aria-label="Crouch"><i data-icon="arrow-down"></i></button><button id="attackControl" data-control="attack" class="control combat-button" aria-label="Melee attack; aim down in the air to pogo"><i data-icon="sword"></i><span>STRIKE</span></button><button id="knifeControl" data-control="knife" class="control combat-button" aria-label="Throw a knife"><i data-icon="knife"></i><b id="knifeCount">12</b><span>KNIFE</span></button><button id="dodgeControl" data-control="dodge" class="control combat-button" aria-label="Dodge through an attack"><i data-icon="wind"></i><b id="dodgeCount"></b><span>DODGE</span></button><button id="summonControl" data-control="summon" class="control combat-button" aria-label="Summon a spirit"><i data-icon="ghost"></i><b id="summonCount">2</b><span>SUMMON</span></button><button id="sprintControl" class="control sprint-control" aria-label="Toggle automatic sprint"><i data-icon="shoe-prints"></i><span>RUN</span></button><button id="skillControl" data-control="skill" class="control skill-control" aria-label="Use hero skill"><i id="skillIcon" data-icon="bolt"></i><b id="cooldownText"></b><span id="skillCaption">SKILL</span></button><button id="skillControl2" data-control="skill2" class="control skill-control secondary-skill" aria-label="Use second hero skill"><i id="skillIcon2" data-icon="burst"></i><b id="cooldownText2"></b><span id="skillCaption2">SKILL II</span></button><button id="jumpControl" data-control="jump" class="control jump-control" aria-label="Jump; hold to jump higher"><i data-icon="arrow-up"></i><span>JUMP</span></button></div></div></div>
<div id="controlEditor" hidden aria-label="Control layout editor"></div><div id="bootScreen"><div class="boot-brand"><img data-bundled-image="branding/logo" width="640" height="640" alt="Super Wiss Ascension"></div><p id="bootTip">Your story starts with a single leap.</p><div class="boot-track"><i id="bootProgress"></i></div><small id="bootStatus">Preparing your adventure…</small><button id="bootEnter" hidden>ENTER ASCENSION →</button><div id="bootRecovery" hidden><p id="bootError" role="alert"></p><button id="bootRetry">Retry</button><button id="bootSafe">Safe Mode</button><p>Your saved progress will be kept.</p></div><small class="boot-version">1.3.1 · ART INTEGRATION CANDIDATE</small></div><div id="modal" hidden><div class="modal-backdrop"></div><section id="modalPanel" class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modalTitle"></section></div>
````

NEW
````text
<div id="gameUI" hidden><div class="hud-top"><div class="hud-left"><button id="pauseButton" class="icon-button" aria-label="Pause game"><i data-icon="pause"></i></button><div class="vitals"><div id="hearts" class="hearts"></div><small id="lives">3 attempts</small></div><div class="hud-coins"><i data-icon="coins"></i><b id="runCoins">0</b></div></div><div class="hud-center"><small id="runMapLabel">WORLD 01</small><strong id="runMapName">Sunpetal Valley</strong><div class="course-progress"><i id="courseBar"></i></div></div><div class="hud-score"><small id="scoreLabel">SCORE</small><b id="runScore">0</b><span id="runTime">0:00.0</span></div></div><div id="petDock" class="pet-dock" hidden><div class="pet-status"><img id="petFace" alt="Equipped pet"><small id="petPassive"></small></div><button id="petControl" data-control="pet" class="control pet-action"><i></i><b></b><span></span></button><button id="petControl2" data-control="pet2" class="control pet-action"><i></i><b></b><span></span></button></div><div class="combat-resources"><div><span>FOCUS</span><i><b id="focusFill"></b></i><small id="focusValue">100</small></div><div><span>STAMINA</span><i><b id="staminaFill"></b></i><small id="staminaValue">100</small></div></div><div id="bossHUD" hidden><small id="bossTitle"></small><strong id="bossName"></strong><div class="boss-health-track"><i id="bossHealth"></i><b></b><b></b></div><span id="bossPhase"></span><div class="stagger-track"><i id="bossStagger"></i></div><small class="stagger-label">STAGGER</small></div><div id="tacticalObjective"></div><div id="nearbyScore" hidden></div><button id="quickLayout" class="quick-layout" aria-label="Switch control preset">PRESET A</button><button id="interactControl" data-control="interact" class="control combat-button" hidden aria-label="Hold to revive nearby ally"><i data-icon="heart"></i><span>REVIVE</span></button><div id="effectsHUD" class="effects-hud"></div><div id="combo" class="combo" hidden>COMBO ×2</div><div id="stageBanner" class="stage-banner" hidden></div><div id="gameHint" class="game-hint" hidden></div><div class="touch-controls" id="touchControls"><div id="analogControl" role="slider" aria-label="Movement joystick; drag to move and aim" aria-valuemin="-1" aria-valuemax="1" aria-valuenow="0"><span class="analog-ring"></span><span class="analog-axis-x"></span><span class="analog-axis-y"></span><i id="analogKnob"></i></div><div class="movement"><button id="leftControl" data-control="left" class="control move-control" aria-label="Move left"><i data-icon="chevron-left"></i></button><button id="rightControl" data-control="right" class="control move-control" aria-label="Move right"><i data-icon="chevron-right"></i></button></div><div class="actions"><button id="crouchControl" data-control="crouch" class="control combat-button" aria-label="Hold to crouch; release to stand"><i data-icon="crouch"></i><span>CROUCH</span></button><button id="attackControl" data-control="attack" class="control combat-button" aria-label="Melee attack; aim down in the air to pogo"><i data-icon="sword"></i><span>STRIKE</span></button><button id="knifeControl" data-control="knife" class="control combat-button" aria-label="Throw a knife"><i data-icon="knife"></i><b id="knifeCount">12</b><span>KNIFE</span></button><button id="dodgeControl" data-control="dodge" class="control combat-button" aria-label="Dodge through an attack"><i data-icon="wind"></i><b id="dodgeCount"></b><span>DODGE</span></button><button id="summonControl" data-control="summon" class="control combat-button" aria-label="Summon a spirit"><i data-icon="ghost"></i><b id="summonCount">2</b><span>SUMMON</span></button><button id="sprintControl" class="control sprint-control" aria-label="Toggle automatic sprint"><i data-icon="shoe-prints"></i><span>RUN</span></button><button id="skillControl" data-control="skill" class="control skill-control" aria-label="Use hero skill"><i id="skillIcon" data-icon="bolt"></i><b id="cooldownText"></b><span id="skillCaption">SKILL</span></button><button id="skillControl2" data-control="skill2" class="control skill-control secondary-skill" aria-label="Use second hero skill"><i id="skillIcon2" data-icon="burst"></i><b id="cooldownText2"></b><span id="skillCaption2">SKILL II</span></button><button id="jumpControl" data-control="jump" class="control jump-control" aria-label="Jump; hold to jump higher"><i data-icon="arrow-up"></i><span>JUMP</span></button></div></div></div>
<div id="controlEditor" hidden aria-label="Control layout editor"></div><div id="bootScreen"><div class="boot-brand"><img data-bundled-image="branding/logo" width="640" height="640" alt="Super Wiss Ascension"></div><p id="bootTip">Your story starts with a single leap.</p><div class="boot-track"><i id="bootProgress"></i></div><small id="bootStatus">Preparing your adventure…</small><button id="bootEnter" hidden>ENTER ASCENSION →</button><div id="bootRecovery" hidden><p id="bootError" role="alert"></p><button id="bootRetry">Retry</button><button id="bootSafe">Safe Mode</button><p>Your saved progress will be kept.</p></div><small class="boot-version">1.3.1 · LOCAL UI & LOADOUT WIP</small></div><div id="modal" hidden><div class="modal-backdrop"></div><section id="modalPanel" class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modalTitle"></section></div>
````

## `game/render.js`

Tasks: 1,2,4,7,9. OLD SHA-256: `175ac44ed3369a0a44341b0fd01569d8d6f5a153e0dbe6671fb8c3fbbd4d2f3a`. NEW SHA-256: `09c941efa260e488c4b0511552ab38442423a34d0826145ba09f9fafb0ee34a2`.

### replace: OLD 1–2; NEW 1–3

OLD
````text
import {combatProfile} from './combat-profiles.js';
import {weaponArtForHero, heroArtFrame, weaponPose} from './weapon-art.js';
````

NEW
````text
import {combatProfile,isUnarmed,unarmedPhase} from './combat-profiles.js';
import {wardrobeLayers} from './wardrobe.js';
import {weaponArtForHero,weaponArtForActor, heroArtFrame, weaponPose} from './weapon-art.js';
````

### replace: OLD 53–55; NEW 54–70

OLD
````text
    sprite(c, heroKey, -27, -65 + bob, 54, 68, frame);
    drawHeroWeapon(c,{...effects,character:id},t,frame,bob,heroKey);
    drawCosmeticParts(c,effects.parts,t,moving);
````

NEW
````text
    const actor={...effects,character:id};
    if(isUnarmed(actor)&&cfg?.weaponLayer==='baked'){
        // Visible WIP training proxy. No weapon erasure, no secretly armed unarmed sprite.
        drawUnarmedProxy(c,hero,actor,t,bob);
    }else if(cfg?.modularBody){
        const layers=wardrobeLayers(id,effects.wardrobe,ASSET_CONFIG);
        for(const slot of ['rear','base','shoes','bottom','top','hat','eyewear','weapon','front']){
            if(slot==='weapon')drawHeroWeapon(c,actor,t,frame,bob,heroKey);
            for(const layer of layers.filter(v=>v.slot===slot&&slot!=='weapon'))sprite(c,layer.key,-27,-65+bob,54,68,frame);
        }
    }else{
        // Frame 11 is an existing bare-handed guard pose for Wissem, not edited armed art.
        if(isUnarmed(actor)&&!moving&&!actor.attackTime&&!actor.dodge&&actor.vy===undefined)frame=11;
        sprite(c,heroKey,-27,-65+bob,54,68,frame);
        drawHeroWeapon(c,actor,t,frame,bob,heroKey);
        drawCosmeticParts(c,effects.parts,t,moving); // previously-owned legacy palette accents only
    }
````

### replace: OLD 80–80; NEW 95–95

OLD
````text
    if(e.combatState==='anticipate'){c.fillStyle='#ffd77e';c.font='bold 19px sans-serif';c.fillText('!',e.x+e.w/2-3,e.y-15);}
````

NEW
````text
    if(e.combatState==='anticipate'){c.fillStyle='#ffd77e';c.font='bold 19px VT323, monospace';c.fillText('!',e.x+e.w/2-3,e.y-15);}
````

### replace: OLD 122–122; NEW 137–137

OLD
````text
    c.textAlign='center';c.fillStyle='#e2fbff';c.font='bold 9px sans-serif';c.scale(r.player.facing,1);c.fillText(Math.ceil(r.player.petTime)+'s',0,-s*.72);
````

NEW
````text
    c.textAlign='center';c.fillStyle='#e2fbff';c.font='bold 9px VT323, monospace';c.scale(r.player.facing,1);c.fillText(Math.ceil(r.player.petTime)+'s',0,-s*.72);
````

### replace: OLD 303–304; NEW 318–320

OLD
````text
        landscape(c, w, h, WORLDS[world], this.motion ? t : 0, t * 3, true);
        c.fillStyle=screen==='home'?grad(c,0,h,'#06112238','#071027be'):'#071020e8';c.fillRect(0,0,w,h);
````

NEW
````text
        landscape(c,w,h,WORLDS[world],this.motion?t:0,t*3,true);
        const bg=assetImage('background/cosmic');if(bg){const scale=Math.max(w/bg.naturalWidth,h/bg.naturalHeight);sprite(c,'background/cosmic',(w-bg.naturalWidth*scale)/2,(h-bg.naturalHeight*scale)/2,bg.naturalWidth*scale,bg.naturalHeight*scale);}
        c.fillStyle=screen==='home'?grad(c,0,h,'#06112270','#071027bb'):'#071020b8';c.fillRect(0,0,w,h);
````

### replace: OLD 309–309; NEW 325–325

OLD
````text
            drawHero(c, x, y + 4 * s, 3.15 * s, hero, this.motion ? t : 0, 1, false, {outfit:this.menuOutfit||'starter',parts:this.menuParts});
````

NEW
````text
            drawHero(c, x, y + 4 * s, 3.15 * s, hero, this.motion ? t : 0, 1, false, {outfit:this.menuOutfit||'starter',parts:this.menuParts,equippedWeapon:this.menuWeapon,wardrobe:this.menuWardrobe});
````

### replace: OLD 486–486; NEW 502–502

OLD
````text
                    c.font = 'bold 18px sans-serif';
````

NEW
````text
                    c.font = 'bold 18px VT323, monospace';
````

### replace: OLD 520–520; NEW 536–536

OLD
````text
        for(const ghost of r.remotePlayers||[]){c.save();c.globalAlpha=ghost.ghost?.55:1;if(ghost.downed){glow(c,ghost.x+14,ghost.y+16,40,'#ffb2cf',.28);star(c,ghost.x+14,ghost.y+12,16,'#ffe0ae',4);box(c,ghost.x-8,ghost.y+40,44,4,'#33425d',2);box(c,ghost.x-8,ghost.y+40,44*Math.min(1,(ghost.revive||0)/3),4,'#8ee9d2',2);}else drawHero(c,ghost.x+14,ghost.y+44,1,ghost.character,sceneT,ghost.facing||1,Math.abs(ghost.vx||0)>10,ghost);c.globalAlpha=1;c.fillStyle=ghost.team===1?'#ffaea8':'#91dbff';c.textAlign='center';c.font='bold 12px sans-serif';c.fillText(String(ghost.name||'Explorer').slice(0,16),ghost.x+14,ghost.y-28);c.restore();}
````

NEW
````text
        for(const ghost of r.remotePlayers||[]){c.save();c.globalAlpha=ghost.ghost?.55:1;if(ghost.downed){glow(c,ghost.x+14,ghost.y+16,40,'#ffb2cf',.28);star(c,ghost.x+14,ghost.y+12,16,'#ffe0ae',4);box(c,ghost.x-8,ghost.y+40,44,4,'#33425d',2);box(c,ghost.x-8,ghost.y+40,44*Math.min(1,(ghost.revive||0)/3),4,'#8ee9d2',2);}else drawHero(c,ghost.x+14,ghost.y+44,1,ghost.character,sceneT,ghost.facing||1,Math.abs(ghost.vx||0)>10,ghost);c.globalAlpha=1;c.fillStyle=ghost.team===1?'#ffaea8':'#91dbff';c.textAlign='center';c.font='bold 12px VT323, monospace';c.fillText(String(ghost.name||'Explorer').slice(0,16),ghost.x+14,ghost.y-28);c.restore();}
````

### replace: OLD 527–527; NEW 543–543

OLD
````text
                    drawHero(c, p.x + 14 - p.facing * 25, p.y + p.h, 1, p.character, sceneT, p.facing, true);
````

NEW
````text
                    drawHero(c, p.x + 14 - p.facing * 25, p.y + p.h, 1, p.character, sceneT, p.facing, true,p);
````

### replace: OLD 569–569; NEW 585–585

OLD
````text
export function paintPortrait(canvas, hero, selected = false) {
````

NEW
````text
export function paintPortrait(canvas, hero, selected = false, loadout=null) {
````

### replace: OLD 573–573; NEW 589–590

OLD
````text
 rounded(c,0,0,w,h,18);c.fill();
````

NEW
````text
 c.fillRect(0,0,w,h); // hard-edged portrait well; ornate frame is a cropped UI layer
 if(loadout){drawHero(c,w/2,h-7,Math.min(w/66,h/76),hc.id,0,1,false,loadout);return;}
````

### replace: OLD 607–607; NEW 624–624

OLD
````text
 c.textAlign='center';c.font='bold 11px sans-serif';c.fillStyle=open?'#c9fff3':'#edc1d2';c.fillText(active?'STARGATE ACTIVE':open?'STARGATE READY':seals>0?'PARTIALLY UNLOCKED · '+seals+'/3':'STARGATE LOCKED',x,g.y-40);c.restore();
````

NEW
````text
 c.textAlign='center';c.font='bold 11px VT323, monospace';c.fillStyle=open?'#c9fff3':'#edc1d2';c.fillText(active?'STARGATE ACTIVE':open?'STARGATE READY':seals>0?'PARTIALLY UNLOCKED · '+seals+'/3':'STARGATE LOCKED',x,g.y-40);c.restore();
````

### replace: OLD 642–642; NEW 659–659

OLD
````text
 for(const ch of r.level.chambers||[]){if(ch.x>camera+vw||ch.gateX<camera)continue;c.save();c.fillStyle='#1a254333';c.fillRect(ch.x,30,ch.width,GROUND-30);c.textAlign='center';c.fillStyle='#b1c9dc';c.font='bold 14px sans-serif';c.fillText((ch.id+1)+'. '+ch.name.toUpperCase(),ch.x+ch.width/2,75);c.restore();}
````

NEW
````text
 for(const ch of r.level.chambers||[]){if(ch.x>camera+vw||ch.gateX<camera)continue;c.save();c.fillStyle='#1a254333';c.fillRect(ch.x,30,ch.width,GROUND-30);c.textAlign='center';c.fillStyle='#b1c9dc';c.font='bold 14px VT323, monospace';c.fillText((ch.id+1)+'. '+ch.name.toUpperCase(),ch.x+ch.width/2,75);c.restore();}
````

### replace: OLD 651–651; NEW 668–668

OLD
````text
   c.save();c.textAlign='center';c.font='bold 12px sans-serif';c.fillStyle='#ffcade';c.fillText(ch.wavesStarted?'DEFEAT THE WARDENS':'RECOVER '+ch.sigils.filter(z=>!z.taken).length+' SIGIL'+(ch.sigils.filter(z=>!z.taken).length===1?'':'S'),ch.gateX-100,GROUND-140);c.restore();
````

NEW
````text
   c.save();c.textAlign='center';c.font='bold 12px VT323, monospace';c.fillStyle='#ffcade';c.fillText(ch.wavesStarted?'DEFEAT THE WARDENS':'RECOVER '+ch.sigils.filter(z=>!z.taken).length+' SIGIL'+(ch.sigils.filter(z=>!z.taken).length===1?'':'S'),ch.gateX-100,GROUND-140);c.restore();
````

### replace: OLD 695–695; NEW 712–712

OLD
````text
 c.fillStyle='#06102188';c.fillRect(w*.36,h*.9,w*.28,h*.075);c.textAlign='center';c.font='bold '+Math.max(11,h*.03)+'px sans-serif';c.fillStyle='#ffe9a5';c.fillText('FIRST PERSON LAB · PRACTICE',w*.5,h*.945);
````

NEW
````text
 c.fillStyle='#06102188';c.fillRect(w*.36,h*.9,w*.28,h*.075);c.textAlign='center';c.font='bold '+Math.max(11,h*.03)+'px VT323, monospace';c.fillStyle='#ffe9a5';c.fillText('FIRST PERSON LAB · PRACTICE',w*.5,h*.945);
````

### replace: OLD 702–703; NEW 719–720

OLD
````text
 for(const lift of r.level.lifts||[]){line(c,[[lift.x+12,lift.top-60],[lift.x+12,lift.bottom]],'#96bbc455',3);line(c,[[lift.x+lift.w-12,lift.top-60],[lift.x+lift.w-12,lift.bottom]],'#96bbc455',3);box(c,lift.x,lift.y,lift.w,lift.h,lift.active?'#9beacb':'#d6b875',4);c.fillStyle='#f7eccd';c.font='bold 10px sans-serif';c.fillText(lift.active?'ASCENDING':'SEAL LIFT · INTERACT',lift.x-15,lift.y-15);}
 for(const h of r.level.worldHazards||[]){if(h.x>camera+vw||h.x+h.w<camera)continue;c.save();c.fillStyle=h.active?'#ffd68a88':h.warning?'#ffd68a44':'#8196b91b';c.fillRect(h.x,h.y,h.w,h.h);c.strokeStyle=h.active?'#ffda8b':r.level.cfg.grass;c.lineWidth=h.warning?3:1;c.strokeRect(h.x,h.y,h.w,h.h);c.font='bold 9px sans-serif';c.fillStyle='#eff7ff';c.fillText(h.kind.toUpperCase(),h.x-12,h.y-8);if(h.active)for(let i=0;i<4;i++)star(c,h.x+16,h.y+15+i*19,5+Math.sin(t*14+i)*2,r.level.cfg.grass,4);c.restore();}
````

NEW
````text
 for(const lift of r.level.lifts||[]){line(c,[[lift.x+12,lift.top-60],[lift.x+12,lift.bottom]],'#96bbc455',3);line(c,[[lift.x+lift.w-12,lift.top-60],[lift.x+lift.w-12,lift.bottom]],'#96bbc455',3);box(c,lift.x,lift.y,lift.w,lift.h,lift.active?'#9beacb':'#d6b875',4);c.fillStyle='#f7eccd';c.font='bold 10px VT323, monospace';c.fillText(lift.active?'ASCENDING':'SEAL LIFT · INTERACT',lift.x-15,lift.y-15);}
 for(const h of r.level.worldHazards||[]){if(h.x>camera+vw||h.x+h.w<camera)continue;c.save();c.fillStyle=h.active?'#ffd68a88':h.warning?'#ffd68a44':'#8196b91b';c.fillRect(h.x,h.y,h.w,h.h);c.strokeStyle=h.active?'#ffda8b':r.level.cfg.grass;c.lineWidth=h.warning?3:1;c.strokeRect(h.x,h.y,h.w,h.h);c.font='bold 9px VT323, monospace';c.fillStyle='#eff7ff';c.fillText(h.kind.toUpperCase(),h.x-12,h.y-8);if(h.active)for(let i=0;i<4;i++)star(c,h.x+16,h.y+15+i*19,5+Math.sin(t*14+i)*2,r.level.cfg.grass,4);c.restore();}
````

### replace: OLD 707–707; NEW 724–724

OLD
````text
 for(let i=0;i<12;i++){const x=z.x+((i*39+t*z.strength*24)%z.w+z.w)%z.w,y=z.type==='water'?z.y+Math.sin(t*3+i)*3:z.y+25+i*29;c.beginPath();c.moveTo(x,y);c.lineTo(x+18,y-(z.type==='gravity'?12:0));c.stroke();}c.fillStyle='#eef6ff';c.font='bold 10px sans-serif';c.fillText(z.type.toUpperCase(),z.x+12,z.y-9);c.restore();}
````

NEW
````text
 for(let i=0;i<12;i++){const x=z.x+((i*39+t*z.strength*24)%z.w+z.w)%z.w,y=z.type==='water'?z.y+Math.sin(t*3+i)*3:z.y+25+i*29;c.beginPath();c.moveTo(x,y);c.lineTo(x+18,y-(z.type==='gravity'?12:0));c.stroke();}c.fillStyle='#eef6ff';c.font='bold 10px VT323, monospace';c.fillText(z.type.toUpperCase(),z.x+12,z.y-9);c.restore();}
````

### replace: OLD 709–709; NEW 726–726

OLD
````text
 for(const sw of l.switches||[]){box(c,sw.x,sw.y,sw.w,sw.h,sw.on?'#5febba':'#f6b960',5);c.fillStyle='#101827';c.font='bold 12px sans-serif';c.fillText(sw.on?'ON':'H',sw.x+4,sw.y+20);}
````

NEW
````text
 for(const sw of l.switches||[]){box(c,sw.x,sw.y,sw.w,sw.h,sw.on?'#5febba':'#f6b960',5);c.fillStyle='#101827';c.font='bold 12px VT323, monospace';c.fillText(sw.on?'ON':'H',sw.x+4,sw.y+20);}
````

### replace: OLD 738–738; NEW 755–755

OLD
````text
 const spec=weaponArtForHero(p.character),body=ASSET_CONFIG.images[bodyKey];
````

NEW
````text
 const spec=weaponArtForActor(p),body=ASSET_CONFIG.images[bodyKey];
````

### replace: OLD 740–740; NEW 757–758

OLD
````text
 const meta=ASSET_CONFIG.images[spec.key],im=assetImage(spec.key);
````

NEW
````text
 const skin=p.normalizedCombat?null:wardrobeLayers(p.character,p.wardrobe,ASSET_CONFIG,undefined,combatProfile(p).weapon).find(l=>l.slot==='weapon');
 const key=skin?.key||spec.key,meta=ASSET_CONFIG.images[key],im=assetImage(key);
````

### replace: OLD 743–743; NEW 761–763

OLD
````text
  const pose=weaponPose(p,frame,t,bob,offhand,body.weaponSockets),h=pose.height;
````

NEW
````text
  const pose=weaponPose(p,frame,t,bob,offhand,body.weaponSockets);
  if(skin){pose.key=key;pose.anchorX=skin.anchor[0];pose.anchorY=skin.anchor[1];pose.height=skin.height;pose.angle+=(skin.angle-spec.angle)*(offhand?-1:1);}
  const h=pose.height;
````

### insert: OLD 751–750; NEW 771–780

OLD
````text
````

NEW
````text

function drawUnarmedProxy(c,hero,p,t,bob){
 const phase=unarmedPhase(p),punch=phase==='active'?12:phase==='startup'?-3:0;
 c.save();c.translate(0,bob);c.fillStyle='#111b30';
 c.fillRect(-11,-61,22,20);c.fillRect(-15,-40,30,25);c.fillRect(-14,-17,11,18);c.fillRect(4,-17,11,18);
 c.fillStyle=hero.color;c.fillRect(-8,-58,16,14);c.fillRect(-12,-37,24,17);
 c.fillRect(-21,-40,9,10);c.fillRect(13+punch,-37,10,10);c.fillRect(10,-31,5+punch,5);
 c.fillStyle='#fff0c2';c.fillRect(-6,-53,3,3);c.fillRect(4,-53,3,3);
 c.restore();
}
````

## `game/ui-crops.js`

Tasks: 2,3. OLD SHA-256: `NEW FILE`. NEW SHA-256: `84f452f9d7c719b27f252c91766bbed16fde864ec60055d3206ac88c0b939015`.

### insert: OLD 1–0; NEW 1–44

OLD
````text
````

NEW
````text
import {assetUrl} from "./assets.js";
export const UI_ICON_MAP={
 "coins": "coin",
 "star": "gold-star",
 "star-wallet": "star",
 "plus": "plus",
 "users": "friends",
 "gear": "settings",
 "xmark": "close",
 "pen": "edit",
 "circle-question": "help",
 "circle-info": "info",
 "check": "check",
 "lock": "lock",
 "clock": "clock",
 "calendar": "daily",
 "house": "home",
 "map": "map",
 "paw": "pets",
 "wand-magic-sparkles": "shop",
 "bullseye": "missions",
 "trophy": "trophy",
 "user": "profile",
 "skull": "boss",
 "flag-checkered": "flag",
 "gamepad": "gamepad",
 "hand-pointer": "touch",
 "volume-high": "volume",
 "music": "music",
 "shoe-prints": "speed",
 "palette": "palette",
 "bolt": "power",
 "sword": "sword",
 "moon": "magic",
 "shield-halved": "stamina",
 "sun": "sun",
 "snowflake": "frost",
 "wind": "wind",
 "chevron-left": "left",
 "chevron-right": "right",
 "crouch": "crouch",
 "arrow-down": "crouch"
};
export function croppedIcon(name){const crop=UI_ICON_MAP[name]||name;const url=assetUrl("ui/icons/"+crop);return url?`<img class="ico ui-icon" src="${url}" alt="" aria-hidden="true" draggable="false">`:null;}
````

## `game/upgrade-ui.js`

Tasks: 2. OLD SHA-256: `26c9ff0d8c2ab143f15f58359fea8bdf046e83eca45cbf873429c0084b6c053d`. NEW SHA-256: `9a93506d83898639a275d7c1d6094f4260421d3f846f73478e3f6842c73729d8`.

### replace: OLD 2–2; NEW 2–2

OLD
````text
function forgeHeroCarousel(hero){return `<div class="forge-carousel"><button id="forgePrev" aria-label="Previous hero">‹</button><div id="forgeHeroCard"><img src="${ascOutfitUrl(hero.id)}" alt=""><div><b>${hero.name}</b><small>${save.ascension.outfits[hero.id]||'Starter'} · ${ASC_OUTFITS.length} outfits · ${COSMETIC_PARTS.length} accessory slots</small></div></div><button id="forgeNext" aria-label="Next hero">›</button></div>`;}
````

NEW
````text
function forgeHeroCarousel(hero){return `<div class="forge-carousel"><button id="forgePrev" aria-label="Previous hero">‹</button><div id="forgeHeroCard"><img src="${ascOutfitUrl(hero.id)}" alt=""><div><b>${hero.name}</b><small>${save.ascension.outfits[hero.id]||'Starter'} · ${ASC_OUTFITS.length} outfits · ${WARDROBE_SLOTS.length} independent slots</small></div></div><button id="forgeNext" aria-label="Next hero">›</button></div>`;}
````

### replace: OLD 5–5; NEW 5–5

OLD
````text
function renderRecords(){
````

NEW
````text
function renderRecordsDashboardBase(){
````

### replace: OLD 13–13; NEW 13–13

OLD
````text
function renderProfile(){
````

NEW
````text
function renderProfileDashboardBase(){
````

## `game/wardrobe.js`

Tasks: 7. OLD SHA-256: `NEW FILE`. NEW SHA-256: `980d5ee3afc3bb697c6d1bd3d46498b8add173b5f7a7f44698d8896916d1911d`.

### insert: OLD 1–0; NEW 1–56

OLD
````text
````

NEW
````text
import {signatureWeapon} from './equipment.js';
/** Versioned six-slot renderer contract. Nothing here changes combat statistics.
 * Authored layer art must be ready and frame-compatible before it can be sold/equipped.
 * Existing whole-outfit purchases are retained as legacy looks, never converted to fake parts.
 */
export const WARDROBE_SLOTS=Object.freeze(['hat','top','bottom','shoes','eyewear','weaponSkin']);
export const WARDROBE_LABELS={hat:'Headwear',top:'Top',bottom:'Pants',shoes:'Shoes',eyewear:'Eyewear',weaponSkin:'Weapon skin'};
export const WARDROBE_DRAW_ORDER=Object.freeze(['rear','base','shoes','bottom','top','hat','eyewear','weapon','front']);
// The source pack contains no frame-aligned clothing layers. Do not invent sellable inventory.
export const WARDROBE_CATALOG=Object.freeze([]);
export function emptyWardrobe(){return Object.fromEntries(WARDROBE_SLOTS.map(slot=>[slot,null]));}
export function wardrobeItemReady(item,hero,manifest){
 if(!item||item.hero!==hero||!WARDROBE_SLOTS.includes(item.slot)||item.status!=='ready')return false;
 const body=manifest?.images?.['hero/'+hero],meta=manifest?.images?.[item.key];
 if(!body||!meta)return false;
 if(item.slot==='weaponSkin')return body.weaponLayer==='separate'&&typeof item.weapon==='string'&&
  meta.frames===1&&meta.frameWidth>0&&meta.frameHeight>0&&
  Array.isArray(item.anchor)&&item.anchor.length===2&&item.anchor.every(n=>Number.isFinite(n)&&n>=0&&n<=1)&&
  Number.isFinite(item.height)&&item.height>0&&Number.isFinite(item.angle);
 // Clean, fully aligned base + front arm masks are mandatory for clothing replacement.
 const rig=body.modularBody;
 const aligned=key=>{const m=manifest.images[key];return !!m&&m.frameWidth===body.frameWidth&&m.frameHeight===body.frameHeight&&m.frames===body.frames;};
 if(!rig?.base||!rig?.front||!aligned(rig.base)||!aligned(rig.front)||(rig.rear&&!aligned(rig.rear)))return false;
 return aligned(item.key);
}
export function sanitizeWardrobe(raw={},owned=[],catalog=WARDROBE_CATALOG,manifest={images:{}}){
 const out={};for(const [hero,parts] of Object.entries(raw||{})){
  out[hero]=emptyWardrobe();for(const slot of WARDROBE_SLOTS){
   const item=catalog.find(i=>i.id===parts?.[slot]&&i.slot===slot);
   if(owned.includes(item?.id)&&wardrobeItemReady(item,hero,manifest))out[hero][slot]=item.id;
  }
 }return out;
}
export function equipWardrobe(save,hero,slot,id,manifest,catalog=WARDROBE_CATALOG){
 if(!save?.ascension||!WARDROBE_SLOTS.includes(slot)||!manifest?.images?.['hero/'+hero])return false;
 const item=catalog.find(i=>i.id===id);
 if(id!==null&&(!save.ascension.ownedPieces?.includes(id)||item?.slot!==slot||!wardrobeItemReady(item,hero,manifest)))return false;
 if(id!==null&&slot==='weaponSkin'&&item.weapon!==(Object.hasOwn(save.ascension.weapons||{},hero)?save.ascension.weapons[hero]:signatureWeapon(hero)))return false;
 save.ascension.wardrobe??={};save.ascension.wardrobe[hero]={...emptyWardrobe(),...save.ascension.wardrobe[hero],[slot]:id};return true;
}
export function purchaseWardrobe(save,id,hero,manifest,catalog=WARDROBE_CATALOG){
 if(!save?.ascension||!Number.isFinite(save.gold))return false;
 const item=catalog.find(i=>i.id===id);
 if(!item||!wardrobeItemReady(item,hero,manifest)||!Number.isInteger(item.cost)||item.cost<0||save.gold<item.cost)return false;
 save.ascension.ownedPieces??=[];
 if(save.ascension.ownedPieces.includes(id))return true;
 save.gold-=item.cost;save.ascension.ownedPieces.push(id);return true;
}
export function wardrobeLayers(hero,selection,manifest,catalog=WARDROBE_CATALOG,weapon=signatureWeapon(hero)){
 return WARDROBE_DRAW_ORDER.flatMap(slot=>{
  if(['rear','base','front'].includes(slot)){const key=manifest?.images?.['hero/'+hero]?.modularBody?.[slot];return key?[{slot,key}]:[];}
  const item=catalog.find(i=>i.id===selection?.[slot==='weapon'?'weaponSkin':slot]);
  if(!wardrobeItemReady(item,hero,manifest)||(slot==='weapon'&&item.weapon!==weapon))return [];
  return [{slot,key:item.key,weapon:item.weapon,anchor:item.anchor,height:item.height,angle:item.angle}];
 });
}
````

## `game/weapon-art.js`

Tasks: 1,4,7. OLD SHA-256: `69b2ce11cbcfe88874932b20c25c1341f26eb02b562713beb42e3d06e321c9c3`. NEW SHA-256: `5f48676daa3c43f338423135cf9379834110b2f663138adb26e7b549f0d54947`.

### replace: OLD 1–1; NEW 1–1

OLD
````text
import { COMBAT_PROFILES, combatProfile } from './combat-profiles.js';
````

NEW
````text
import { COMBAT_PROFILES, combatProfile, isUnarmed } from './combat-profiles.js';
````

### replace: OLD 4–5; NEW 4–5

OLD
````text
 * All coordinates below are logical hero-local units. Final grip calibration is
 * pending the supplied PNGs and weapon-free body sheets, not falsely auto-detected.
````

NEW
````text
 * All coordinates below are logical hero-local units. Source-image grip points are visually calibrated from the original PNGs.
 * Wissem has per-frame body sockets; other body rigs remain blocked by baked art.
````

### replace: OLD 8–17; NEW 8–17

OLD
````text
 gauntlet: {key:'weapon/gauntlet', file:'gravity_gauntlet.png', height:23, anchor:[.5,.5], motion:'punch', angle:0, dual:true},
 dual: {key:'weapon/dual', file:'twin_fang_dagger.png', height:34, anchor:[.5,.84], motion:'slash', angle:-.35, dual:true},
 staff: {key:'weapon/staff', file:'orbit_crescent_staff.png', height:59, anchor:[.5,.84], motion:'cast', angle:-.1},
 dagger: {key:'weapon/dagger', file:'shadow_knife.png', height:31, anchor:[.5,.84], motion:'slash', angle:-.38},
 shield: {key:'weapon/shield', file:'stonebreaker_hammer.png', height:52, anchor:[.5,.84], motion:'heavy', angle:.12},
 sabre: {key:'weapon/sabre', file:'wind_scimitar.png', height:47, anchor:[.5,.84], motion:'slash', angle:-.3},
 gadget: {key:'weapon/gadget', file:'clockwork_knuckle.png', height:25, anchor:[.5,.5], motion:'recoil', angle:0},
 bow: {key:'weapon/bow', file:'sky_bow.png', height:43, anchor:[.5,.5], motion:'bow', angle:0},
 lance: {key:'weapon/lance', file:'sun_lance.png', height:63, anchor:[.5,.72], motion:'thrust', angle:.35},
 frost_staff: {key:'weapon/frost_staff', file:'frost_staff.png', height:59, anchor:[.5,.84], motion:'cast', angle:-.1}
````

NEW
````text
 gauntlet:{key:'weapon/gauntlet',file:'gravity_gauntlet.png',height:16,anchor:[.23,.78],motion:'punch',angle:1.85,dual:true},
 dual:{key:'weapon/dual',file:'twin_fang_dagger.png',height:30,anchor:[.24,.73],motion:'slash',angle:-.72,dual:true},
 staff:{key:'weapon/staff',file:'orbit_crescent_staff.png',height:58,anchor:[.35,.65],motion:'cast',angle:-.72},
 dagger:{key:'weapon/dagger',file:'shadow_knife.png',height:29,anchor:[.27,.72],motion:'slash',angle:-.72},
 shield:{key:'weapon/shield',file:'stonebreaker_hammer.png',height:48,anchor:[.25,.72],motion:'heavy',angle:-.72},
 sabre:{key:'weapon/sabre',file:'wind_scimitar.png',height:44,anchor:[.25,.79],motion:'slash',angle:-.72},
 gadget:{key:'weapon/gadget',file:'clockwork_knuckle.png',height:22,anchor:[.21,.75],motion:'recoil',angle:.78},
 bow:{key:'weapon/bow',file:'sky_bow.png',height:44,anchor:[.50,.51],motion:'bow',angle:-.72},
 lance:{key:'weapon/lance',file:'sun_lance.png',height:63,anchor:[.28,.72],motion:'thrust',angle:-.72},
 frost_staff:{key:'weapon/frost_staff',file:'frost_staff.png',height:58,anchor:[.37,.64],motion:'cast',angle:-.72}
````

### insert: OLD 19–18; NEW 19–22

OLD
````text
````

NEW
````text
export function weaponArtForActor(p){
 if(isUnarmed(p))return null;
 return !p.normalizedCombat&&p.equippedWeapon?WEAPON_ART[p.equippedWeapon]:weaponArtForHero(p.character);
}
````

### replace: OLD 45–45; NEW 49–49

OLD
````text
 const spec=weaponArtForHero(p.character); if(!spec)return null;
````

NEW
````text
 const spec=weaponArtForActor(p); if(!spec)return null;
````

### replace: OLD 52–52; NEW 56–56

OLD
````text
 const supplied=socketOverrides?.[frame];
````

NEW
````text
 const supplied=offhand?socketOverrides?.offhand?.[frame]:socketOverrides?.[frame];
````

### insert: OLD 54–53; NEW 58–58

OLD
````text
````

NEW
````text
 const locked=grip===supplied;
````

### replace: OLD 59–62; NEW 64–67

OLD
````text
  }else if(spec.motion==='thrust'){angle=Math.PI/2;x+=Math.sin(u*Math.PI)*21;}
  else if(spec.motion==='punch'){x+=Math.sin(u*Math.PI)*16;y-=Math.sin(u*Math.PI)*3;angle+=.15*u;}
  else if(spec.motion==='recoil'){x-=Math.sin(u*Math.PI)*5;}
  else if(spec.motion==='bow'){x-=phase.windup*3*(1-u);angle+=bounded(p.attackAim,-1,1)*.65;}
````

NEW
````text
  }else if(spec.motion==='thrust'){angle=Math.PI/4;if(!locked)x+=Math.sin(u*Math.PI)*21;}
  else if(spec.motion==='punch'){if(!locked){x+=Math.sin(u*Math.PI)*16;y-=Math.sin(u*Math.PI)*3;}angle=.78+.15*u;}
  else if(spec.motion==='recoil'){if(!locked)x-=Math.sin(u*Math.PI)*5;}
  else if(spec.motion==='bow'){if(!locked)x-=phase.windup*3*(1-u);angle+=bounded(p.attackAim,-1,1)*.65;}
````

### replace: OLD 67–67; NEW 72–72

OLD
````text
 if(offhand){x-=25;y+=7;angle=-angle;}
````

NEW
````text
 if(offhand){if(!locked){x-=25;y+=7;}angle=-angle;}
````

## `package.json`

Tasks: Test / build wiring. OLD SHA-256: `9b09fff4b6f8998ef06080225e967288a66075fe2bc4e2dbe1140b1e653b749f`. NEW SHA-256: `51b50de42f3c078c2d90e23bc2d580b0bdaaba50c264bdbdd32bb2047c647089`.

### replace: OLD 7–7; NEW 7–7

OLD
````text
    "test": "node scripts/compile-content.mjs && node --test tests/nightfall.test.mjs tests/nearby.test.mjs tests/ascension.test.mjs tests/accounts.test.mjs tests/world-physics.test.mjs tests/customization.test.mjs tests/upgrade-rules.test.mjs",
````

NEW
````text
    "test": "node scripts/compile-content.mjs && node --test tests/nightfall.test.mjs tests/nearby.test.mjs tests/ascension.test.mjs tests/accounts.test.mjs tests/world-physics.test.mjs tests/customization.test.mjs tests/upgrade-rules.test.mjs tests/atelier.test.mjs tests/weapon-ui.test.mjs",
````

### replace: OLD 19–19; NEW 19–21

OLD
````text
    "validate:weapon-art": "node scripts/validate-assets.mjs --require-weapons"
````

NEW
````text
    "validate:weapon-art": "node scripts/validate-assets.mjs --require-weapons",
    "test:atelier": "node scripts/compile-content.mjs && node --test tests/atelier.test.mjs tests/weapon-ui.test.mjs",
    "fonts:install": "python3 scripts/install-fonts.py"
````

## `scripts/bundle.mjs`

Tasks: 2,4,5,7,8,9. OLD SHA-256: `65acb8fbf54b57f4da4f27ee1941684bff04bcb14767c98a217754b596ac14fc`. NEW SHA-256: `fed1d37eb7eb6dc45f6f07b46397c3e593627105a2d8c1b1fd9568a04a1a3525`.

### replace: OLD 23–23; NEW 23–23

OLD
````text
const order=['content','data','assets','bosses','controls','cosmetics','ascension','world-physics','world-regions','placement','combat-profiles','weapon-art','engine','arena','link','social','icons','render','progress','audio','app','ascension-ui'];
````

NEW
````text
const order=['content','data','assets','bosses','controls','cosmetics','combat-profiles','hero-stats','equipment','wardrobe','ascension','world-physics','world-regions','placement','weapon-art','engine','arena','link','social','ui-crops','icons','render','progress','audio','app','ascension-ui'];
````

### replace: OLD 27–27; NEW 27–27

OLD
````text
const app=['app','ascension-ui','upgrade-ui'].map(strip).join('\n');
````

NEW
````text
const app=['app','ascension-ui','upgrade-ui','atelier-ui'].map(strip).join('\n');
````

### replace: OLD 29–29; NEW 29–43

OLD
````text
const template=read('index.html'),css=read('style.css'),boot=read('boot.js');
````

NEW
````text
const template=read('index.html'),css=read('style.css')+'\n'+read('atelier.css'),boot=read('boot.js');
const optionalFonts=[{name:'Pixelify Sans',file:'pixelify-sans-latin.woff2',weight:700},{name:'VT323',file:'vt323-latin.woff2',weight:400}];
function buildCss(embeddedMode){
 const faces=[];
 for(const font of optionalFonts){
  const source=path.join(root,'assets/fonts',font.file);if(!fs.existsSync(source))continue;
  const bytes=fs.readFileSync(source);if(bytes.toString('ascii',0,4)!=='wOF2')throw Error('Invalid optional WOFF2 font: '+font.file);
  const url=embeddedMode?'data:font/woff2;base64,'+bytes.toString('base64'):'assets/fonts/'+font.file;
  faces.push(`@font-face{font-family:'${font.name}';font-style:normal;font-weight:${font.weight};font-display:swap;src:url('${url}') format('woff2')}`);
 }
 return css.replace('/*__OPTIONAL_FONTS__*/',faces.join('\n')).replace(/url\(['"]asset:([^'"]+)['"]\)/g,(_,key)=>{
  if(!manifest.images[key])throw Error('Unknown CSS asset '+key);
  return 'url("'+(embeddedMode?embedded[key]:manifest.images[key].path)+'")';
 });
}
````

### replace: OLD 34–34; NEW 48–48

OLD
````text
const html=template.replace('/*__STYLE__*/',()=>css).replace('/*__BOOT__*/',()=>boot).replace('/*__CODE__*/',()=>makeCode(embedded));
````

NEW
````text
const html=template.replace('/*__STYLE__*/',()=>buildCss(true)).replace('/*__BOOT__*/',()=>boot).replace('/*__CODE__*/',()=>makeCode(embedded));
````

### replace: OLD 46–46; NEW 60–60

OLD
````text
for(const [name,content] of Object.entries({'game.html':android,'game.js':makeCode({}),'boot.js':boot,'style.css':css}))fs.writeFileSync(path.join(assets,name),content);
````

NEW
````text
for(const [name,content] of Object.entries({'game.html':android,'game.js':makeCode({}),'boot.js':boot,'style.css':buildCss(false)}))fs.writeFileSync(path.join(assets,name),content);
````

### insert: OLD 50–49; NEW 64–64

OLD
````text
````

NEW
````text
for(const font of optionalFonts){const source=path.join(root,'assets/fonts',font.file);if(fs.existsSync(source)){const dest=path.join(assets,'assets/fonts',font.file);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(source,dest);}}
````

## `scripts/crop-ui.py`

Tasks: 2,3. OLD SHA-256: `NEW FILE`. NEW SHA-256: `78c85227b2bd461968c984fe621f9173847f9dea856941d89ffb22189b32180e`.

### insert: OLD 1–0; NEW 1–16

OLD
````text
````

NEW
````text
#!/usr/bin/env python3
"""Reproduce the committed UI crops from the three original sheets. Requires Pillow."""
import json
from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[1]
ledger=json.loads((root/'art-source/ui/crops.json').read_text())
for entry in ledger:
    source=(root/entry['source']).resolve();dest=(root/entry['path']).resolve()
    if not source.is_relative_to(root) or not dest.is_relative_to(root):raise ValueError('Unsafe crop path')
    with Image.open(source) as image:
        left,top,right,bottom=entry['crop']
        if not (0<=left<right<=image.width and 0<=top<bottom<=image.height):raise ValueError(entry['path'])
        dest.parent.mkdir(parents=True,exist_ok=True)
        image.crop((left,top,right,bottom)).save(dest)
print(f'Reproduced {len(ledger)} crops without redraw, resize or smoothing.')
````

## `scripts/install-fonts.py`

Tasks: 9 (optional, not executed). OLD SHA-256: `NEW FILE`. NEW SHA-256: `968b7a6c76de83ae5b41471927f4858d416139580b5d91483e7884f5606e7a32`.

### insert: OLD 1–0; NEW 1–29

OLD
````text
````

NEW
````text
#!/usr/bin/env python3
"""OPTIONAL: run on your own machine to install the chosen Google Fonts for offline packaging.
No font downloads occur in the game or during a normal build. Requires Python 3 only.
Font specimens/license information: https://fonts.google.com/specimen/Pixelify+Sans
and https://fonts.google.com/specimen/VT323 . Review each font license before redistribution.
"""
from pathlib import Path
from urllib.request import Request,urlopen
from urllib.parse import urlparse
import re,hashlib,json
root=Path(__file__).resolve().parents[1]
ua='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
specs=[('Pixelify Sans','Pixelify+Sans:wght@700','pixelify-sans-latin.woff2'),('VT323','VT323','vt323-latin.woff2')]
report=[]
for name,family,filename in specs:
    cssurl='https://fonts.googleapis.com/css2?family='+family+'&display=swap'
    with urlopen(Request(cssurl,headers={'User-Agent':ua}),timeout=30) as response:css=response.read().decode()
    # The final block is the Latin subset in Google Fonts CSS. Check for the explicit marker first.
    latin=css.rsplit('/* latin */',1)[-1]
    urls=re.findall(r'url\((https://fonts\.gstatic\.com/[^)]+)\)',latin)
    if not urls:raise RuntimeError('No official Latin font URL for '+name)
    url=urls[-1]
    if urlparse(url).hostname!='fonts.gstatic.com':raise RuntimeError('Unexpected font host')
    with urlopen(Request(url,headers={'User-Agent':ua}),timeout=30) as response:content=response.read()
    if content[:4]!=b'wOF2':raise RuntimeError('Expected WOFF2; font source format changed')
    destination=root/'assets/fonts'/filename;destination.parent.mkdir(parents=True,exist_ok=True);destination.write_bytes(content)
    report.append({'family':name,'source':cssurl,'file':str(destination.relative_to(root)),'sha256':hashlib.sha256(content).hexdigest()})
(root/'assets/fonts/installed.json').write_text(json.dumps(report,indent=2)+'\n')
print('Installed fonts. Review licenses, then run npm run build to embed/package them offline.')
````

## `tests/atelier-browser.py`

Tasks: 2,3,4,7,8 browser QA. OLD SHA-256: `NEW FILE`. NEW SHA-256: `633c7e9ce97aa07acf10d895ab51d26c3ff909aecc97735afd4d985e9d3e929b`.

### insert: OLD 1–0; NEW 1–75

OLD
````text
````

NEW
````text
#!/usr/bin/env python3
"""Offline render/interaction checks using Python Playwright and system Chromium.
Run npm run build first. Test-only MemoryStorage and diagnostic probe are injected
into an in-memory copy of dist HTML; release code is not modified. This does not
validate Android WebView, real origin persistence, native billing, audio perception,
Bluetooth or a Gradle build. No external font/network requests are needed.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json, os
R=Path(__file__).resolve().parents[1];OUT=R/'docs/qa-local';screens=OUT/'screens';screens.mkdir(parents=True,exist_ok=True)
html=(R/'dist/Super-Wiss-Odyssey.html').read_text()
shim='<script>const testStorage=new Map();Object.defineProperty(window,"localStorage",{value:{getItem:k=>testStorage.get(k)??null,setItem:(k,v)=>testStorage.set(k,String(v)),removeItem:k=>testStorage.delete(k),clear:()=>testStorage.clear()}});</script>'
html=html.replace('<head>','<head>'+shim,1)
probe="window.__ATELIER_QA={get run(){return run},get save(){return save},pointers,keys,clearInput,showPage,startRun,closeModal,persist,showWeaponLoadout};\n"
assert "window.addEventListener('boot-enter'" in html
html=html.replace("window.addEventListener('boot-enter'",probe+"window.addEventListener('boot-enter'",1)
errors=[];checks=[];geometry=[]
def check(name,condition):
 checks.append({'check':name,'passed':bool(condition)})
 if not condition:raise AssertionError(name)
with sync_playwright() as playwright:
 browser=playwright.chromium.launch(executable_path=os.environ.get('CHROMIUM','/usr/bin/chromium'),headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
 page=browser.new_page(viewport={'width':1672,'height':941},device_scale_factor=1)
 page.on('pageerror',lambda error:errors.append(str(error)))
 try:
  page.set_content(html,wait_until='load',timeout=60000)
  page.locator('#bootEnter').wait_for(state='visible',timeout=60000);page.locator('#bootEnter').click();page.wait_for_timeout(400)
  for size,view in [('large',{'width':1672,'height':941}),('compact',{'width':960,'height':440})]:
   page.set_viewport_size(view)
   for name in ['home','campaign','heroes','pets','forge','missions','records','profile','bosses','settings']:
    if name=='bosses':
     page.locator('.bottom-nav [data-page="home"]').click();page.locator('#bossHuntButton').click()
    elif name=='settings':page.locator('#navSettings').click()
    else:page.locator('.bottom-nav [data-page="'+name+'"]').click()
    page.wait_for_timeout(320);page.screenshot(path=str(screens/(name+'-'+size+'.png')))
    shell=page.evaluate("""()=>Object.fromEntries(['.topbar','#pages','.bottom-nav'].map(s=>{const r=document.querySelector(s).getBoundingClientRect();return[s,{x:r.x,y:r.y,right:r.right,bottom:r.bottom,w:r.width,h:r.height}]}))""")
    geometry.append({'page':name,'viewport':view,'shell':shell})
    check(name+' '+size+' shell within viewport',all(v['x']>=0 and v['right']<=view['width']+1 and v['y']>=0 and v['bottom']<=view['height']+1 for v in shell.values()))
   page.locator('#doneSettings').click()
  page.set_viewport_size({'width':1672,'height':941})
  page.locator('.bottom-nav [data-page="heroes"]').click();page.locator('[data-hero="kossay"]').click();page.locator('#equipHero').click();page.locator('#heroLoadout').click()
  check('Kael cannot visually swap baked knives to a foreign class',page.locator('[data-equip-weapon="dagger"]').is_disabled())
  check('zero Magic denies staff',page.locator('[data-equip-weapon="staff"]').is_disabled())
  page.locator('[data-equip-weapon="unarmed"]').click();page.locator('#weaponDone').click()
  check('null unarmed choice persisted under original hero ID',page.evaluate('window.__ATELIER_QA.save.ascension.weapons.kossay===null'))
  check('unarmed proxy is explicitly labelled in hero detail','TRAINING PROXY' in page.locator('#heroDetails').inner_text())
  page.screenshot(path=str(screens/'kael-unarmed-proxy.png'))
  page.locator('.bottom-nav [data-page="home"]').click();check('lobby states proxy','TRAINING PROXY' in page.locator('#homeLoadout').inner_text());page.screenshot(path=str(screens/'kael-unarmed-lobby.png'))
  page.locator('.bottom-nav [data-page="heroes"]').click();page.locator('[data-hero="wissem"]').click();page.locator('#equipHero').click();page.locator('#heroLoadout').click()
  for weapon in ['dual','sabre','gauntlet','unarmed']:
   check('Wissem equip '+weapon,page.locator('[data-equip-weapon="'+weapon+'"]').is_enabled());page.locator('[data-equip-weapon="'+weapon+'"]').click();page.locator('#weaponDone').click();page.wait_for_timeout(150);page.screenshot(path=str(screens/('wissem-'+weapon+'.png')));page.locator('#heroLoadout').click()
  page.locator('#weaponDone').click();page.locator('.bottom-nav [data-page="forge"]').click()
  for slot in ['hat','top','bottom','shoes','eyewear','weaponSkin']:
   page.locator('[data-wardrobe-slot="'+slot+'"]').click();page.locator('#clearPiece').click();check('independent clear: '+slot,page.evaluate('(slot)=>window.__ATELIER_QA.save.ascension.wardrobe.wissem[slot]===null',slot))
  check('pending pieces are not purchasable',page.locator('.piece-card.art-pending button').is_disabled())
  for tab in ['skills','fusion','outfits']:page.locator('[data-forge-tab="'+tab+'"]').click();page.wait_for_timeout(100)
  page.locator('.bottom-nav [data-page="missions"]').click();page.locator('#dailyTab').click();page.locator('#journeyTab').click();check('journey missions still render',page.locator('.quest-card').count()>0)
  page.locator('#navSettings').click();old=page.evaluate('window.__ATELIER_QA.save.settings.sound');page.locator('[data-setting="sound"]').click();check('sound switch changes setting',page.evaluate('window.__ATELIER_QA.save.settings.sound')!=old)
  page.locator('#sfxVolume').fill('0.3');page.locator('#sfxVolume').dispatch_event('input');check('volume slider saves',page.evaluate('window.__ATELIER_QA.save.settings.sfxVolume===0.3'));page.locator('#doneSettings').click()
  check('serialized save retains null, slots and stable hero ID',page.evaluate("(()=>{const s=JSON.parse(localStorage.getItem('super-wiss:odyssey-v4'));return s.hero==='wissem'&&s.ascension.weapons.wissem===null&&s.ascension.wardrobe.wissem.weaponSkin===null})()"))
  page.set_viewport_size({'width':960,'height':440});page.evaluate("window.__ATELIER_QA.startRun(0,'practice')");page.wait_for_timeout(800)
  check('unarmed run starts with actual null equipment',page.evaluate('window.__ATELIER_QA.run.player.equippedWeapon===null'))
  check('knife control disabled while unarmed',page.locator('#knifeControl').is_disabled());check('attack control says PUNCH',page.locator('#attackControl span').inner_text()=='PUNCH')
  button=page.locator('#crouchControl');rect=button.bounding_box();page.mouse.move(rect['x']+rect['width']/2,rect['y']+rect['height']/2);page.mouse.down();page.wait_for_timeout(250)
  check('holding cropped crouch control reduces actual body hurtbox',page.evaluate('window.__ATELIER_QA.run.player.h===26&&[...window.__ATELIER_QA.pointers.values()].includes("crouch")'))
  page.screenshot(path=str(screens/'crouch-hold.png'));page.mouse.up();page.wait_for_timeout(250);check('release restores standing height and clears input',page.evaluate('window.__ATELIER_QA.run.player.h===44&&![...window.__ATELIER_QA.pointers.values()].includes("crouch")'))
  page.locator('#attackControl').click();page.wait_for_timeout(40);check('touch PUNCH starts unarmed phases',page.evaluate('window.__ATELIER_QA.run.player.attackSerial>0'))
  page.screenshot(path=str(screens/'unarmed-combat.png'))
  check('all visible IMG assets resolve',page.evaluate('Array.from(document.images).filter(i=>i.getAttribute("src")&&(!i.complete||!i.naturalWidth)).length===0'))
  check('no JavaScript page errors',not errors)
 finally:
  report={'environment':'Chromium set_content; test-only MemoryStorage; not Android/native QA','checks':checks,'errors':errors,'geometry':geometry,'fonts':page.evaluate('({display:document.fonts.check(\'16px "Pixelify Sans"\'),body:document.fonts.check(\'16px "VT323"\')})')}
  (OUT/'browser-tests.json').write_text(json.dumps(report,indent=2)+'\n');browser.close()
print(json.dumps({'checks':len(checks),'passed':sum(c['passed'] for c in checks),'errors':errors},indent=2))
````

## `tests/atelier.test.mjs`

Tasks: 0–9 regression coverage. OLD SHA-256: `NEW FILE`. NEW SHA-256: `d81463af7f01ef06edd9c3cb6ace72a6af6b6f873dddfb43562b16d119cfab67`.

### insert: OLD 1–0; NEW 1–155

OLD
````text
````

NEW
````text
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {HEROES,DT} from '../game/data.js';
import {COMBAT_PROFILES,combatProfile,isUnarmed,unarmedProfile,unarmedPhase} from '../game/combat-profiles.js';
import {heroStats} from '../game/hero-stats.js';
import {WEAPON_RULES,WEAPON_FREE_HEROES,signatureWeapon,weaponEligibility,equipmentStatus,cleanWeapons,equipWeapon} from '../game/equipment.js';
import {WARDROBE_SLOTS,WARDROBE_CATALOG,WARDROBE_DRAW_ORDER,emptyWardrobe,wardrobeItemReady,equipWardrobe,purchaseWardrobe,sanitizeWardrobe,wardrobeLayers} from '../game/wardrobe.js';
import {weaponArtForActor,weaponPose} from '../game/weapon-art.js';
import {createRun,stepRun,meleeAttack,meleeBox,dodgeStep,throwKnife,makeEnemy,damagePlayer} from '../game/engine.js';
import {defaultSave,sanitizeSave,SAVE_KEY} from '../game/progress.js';
import {ascApplyRun,ascResult,ascSanitize,ASC_RULES_REVISION} from '../game/ascension.js';
import {CONTROL_ART,CONTROL_IDS,controlRect,defaultControlPreset} from '../game/controls.js';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url));
const manifest=JSON.parse(read('assets/manifest.json'));
const crops=JSON.parse(read('art-source/ui/crops.json'));
const tick=(r,n,input={})=>{for(let i=0;i<n;i++)stepRun(r,input,DT);};
const bare=id=>{const r=createRun(0,id);r.level.enemies=[];r.player.equippedWeapon=null;r.player.grounded=true;return r;};
const expectedIds=['wissem','kossay','yakine','taky','garsi','tounsi','youssef','loey','rayan','mira'];
test('hero IDs/save key are unchanged; display names are unique; Wissem is retained',()=>{
 assert.deepEqual(HEROES.map(h=>h.id),expectedIds);assert.equal(HEROES[0].name,'Wissem');assert.equal(new Set(HEROES.map(h=>h.name)).size,10);assert.equal(SAVE_KEY,'super-wiss:odyssey-v4');
 assert.deepEqual(HEROES.map(h=>h.name),['Wissem','Kael','Astra','Nyx','Bront','Zephyr','Volt','Skye','Sol','Rime']);
});
for(const h of HEROES){
 test(`${h.id}: every displayed rating is derived from the actual legacy profile`,()=>{
  const p=COMBAT_PROFILES[h.id],s=heroStats(h.id),cycle=p.startup+p.active+p.recovery;
  assert.equal(s.power,Math.round(100*((h.combatStyle.damage||2)/2)*.46/cycle));
  assert.equal(s.speed,Math.round(100*(p.speed*.5+p.accel*.3+p.air*.2)));
  assert.equal(s.stamina,Math.round(100*cycle/.46));assert.equal(s.staminaPerSecond,8/cycle);
  assert.equal(s.magic,['arcane','ice'].includes(p.projectile)?Math.round(100*((p.projectile==='arcane'?3:2)/2)*.46/cycle):0);
  assert.deepEqual(s.provenance,{startup:p.startup,active:p.active,recovery:p.recovery,speed:p.speed,accel:p.accel,air:p.air,projectile:p.projectile||null});
 });
 test(`${h.id}: signature passes actual thresholds, with no exemption`,()=>{
  const s=heroStats(h.id),type=signatureWeapon(h.id);assert(weaponEligibility(h.id,type).ok);assert(equipmentStatus(h.id,type).ok);
  for(const [stat,min] of Object.entries(WEAPON_RULES[type].min))assert(s[stat]>=min);
 });
 test(`${h.id}: unarmed phases are bounded and never emit a ranged or knife attack`,()=>{
  const r=bare(h.id),p=r.player,profile=unarmedProfile(h.id);
  assert(profile.startupFrames>=3&&profile.startupFrames<=6);assert(profile.activeFrames>=3&&profile.activeFrames<=5);
  assert(profile.recovery>=COMBAT_PROFILES[h.id].dodge);assert.equal(profile.projectile,undefined);
  assert(meleeAttack(r));assert.equal(p.stamina,92);assert.equal(unarmedPhase(p),'startup');assert(!r.events.some(e=>e.type==='punch'||e.type==='slash'));
  assert(!dodgeStep(r));assert(!meleeAttack(r));assert(!throwKnife(r));
  tick(r,profile.startupFrames-1);assert.equal(unarmedPhase(p),'startup');
  tick(r,1);assert.equal(unarmedPhase(p),'active');assert(r.events.some(e=>e.type==='punch'));
  tick(r,profile.activeFrames);assert.equal(unarmedPhase(p),'recovery');assert(!meleeAttack(r));
  tick(r,profile.recoveryFrames);assert.equal(unarmedPhase(p),'idle');assert.equal(r.shots.length,0);
 });
 test(`${h.id}: old hero-ID inventory and mastery survive renamed saves`,()=>{
  const s=defaultSave();s.hero=h.id;s.mastery[h.id]=31;s.profile.avatar=h.id;s.ascension.ownedOutfits=[h.id+':ember'];s.ascension.outfits[h.id]='ember';
  const clean=sanitizeSave(JSON.parse(JSON.stringify(s)));assert.equal(clean.hero,h.id);assert.equal(clean.profile.avatar,h.id);assert.equal(clean.mastery[h.id],31);assert.equal(clean.ascension.outfits[h.id],'ember');
 });
}
test('zero-magic physical heroes cannot equip either staff; caster signatures stay legal',()=>{
 for(const h of HEROES)for(const type of ['staff','frost_staff'])assert.equal(weaponEligibility(h.id,type).ok,heroStats(h.id).magic>=50);
});
test('eligibility truth table uses only all requested minima; unknown values fail closed',()=>{
 for(const h of HEROES)for(const [type,rule] of Object.entries(WEAPON_RULES))assert.equal(weaponEligibility(h.id,type).ok,Object.entries(rule.min).every(([k,v])=>heroStats(h.id)[k]>=v));
 assert(!weaponEligibility('unknown',null).ok);assert(!weaponEligibility('wissem','made-up').ok);assert.equal(heroStats('unknown'),null);
});
test('an art gate is not a hidden stats exception',()=>{
 assert(weaponEligibility('kossay','dagger').ok);assert(!equipmentStatus('kossay','dagger').ok);assert(!equipmentStatus('kossay','dagger').artReady);
 assert(equipmentStatus('wissem','sabre').ok);assert.deepEqual(WEAPON_FREE_HEROES,['wissem']);
});
test('missing weapon preserves default but explicit null survives save/load',()=>{
 const raw=cleanWeapons({wissem:null,kossay:'staff',yakine:undefined});assert.equal(raw.wissem,null);assert.equal(raw.kossay,'dual');assert.equal(raw.yakine,'staff');
 const s=defaultSave();assert(equipWeapon(s,'yakine',null));assert.equal(sanitizeSave(s).ascension.weapons.yakine,null);
 assert(!equipWeapon(s,'yakine','bow'));assert.equal(s.ascension.weapons.yakine,null);
});
test('unarmed and alternative weapons enter Open records; revision history is kept',()=>{
 const s=defaultSave(),r=createRun(0,'wissem');ascApplyRun(s,r);assert.equal(r.loadoutCategory,'standard');
 equipWeapon(s,'wissem',null);ascApplyRun(s,r);assert.equal(r.loadoutCategory,'open');const result=ascResult(r);assert.equal(result.weapon,null);assert.equal(ASC_RULES_REVISION,5);
 assert.deepEqual(ascSanitize({records:[2,3,4,5].map(revision=>({...result,revision}))}).records.map(r=>r.revision),[2,3,4,5]);
});
test('one-damage fist hits only in active, once per target, and freezes three frames',()=>{
 const r=bare('wissem'),p=r.player,e=makeEnemy('golem',p.x+p.w+5,911);e.vx=0;e.hp=e.maxHp=50;e.y=p.y;r.level.enemies=[e];
 const hurt={w:p.w,h:p.h};assert(meleeAttack(r));tick(r,2);assert.equal(e.hp,50);tick(r,1);assert.equal(e.hp,49);assert.equal(r.impactPause,3/60);
 const phaseTick=p.unarmedAttack.tick;tick(r,3);assert.equal(p.unarmedAttack.tick,phaseTick);assert(r.impactPause<1e-8);
 tick(r,30);assert.equal(e.hp,49);assert.deepEqual({w:p.w,h:p.h},hurt);
});
test('fist hurtbox is not expanded with the attack; directional fist reach stays compact',()=>{
 const r=bare('wissem'),p=r.player;assert.equal(meleeBox(p).w,26);assert.equal(meleeBox(p).h,20);
 p.attackAim=-1;assert.equal(meleeBox(p).h,26);p.grounded=false;p.attackAim=1;assert.equal(meleeBox(p).h,26);assert.equal(p.w,28);assert.equal(p.h,44);
});
test('a dodge cancels recovery only; no free attack during dodge',()=>{
 const r=bare('taky');meleeAttack(r);assert(!dodgeStep(r));tick(r,unarmedProfile('taky').startupFrames);assert(!dodgeStep(r));tick(r,unarmedProfile('taky').activeFrames);
 assert.equal(unarmedPhase(r.player),'recovery');assert(dodgeStep(r));assert.equal(unarmedPhase(r.player),'idle');assert(!meleeAttack(r));
});
test('half-rate substeps agree with the fixed 60 Hz unarmed clock',()=>{
 const a=bare('mira'),b=bare('mira');meleeAttack(a);meleeAttack(b);
 for(let n=0;n<10;n++){stepRun(a,{},1/60);stepRun(b,{},1/120);stepRun(b,{},1/120);assert.equal(a.player.unarmedAttack.tick,b.player.unarmedAttack.tick);assert.equal(unarmedPhase(a.player),unarmedPhase(b.player));}
});
test('unarmed damage interruption clears stale attacks and knockout cannot carry a fist hit',()=>{
 const r=bare('wissem');meleeAttack(r);r.player.invincible=0;damagePlayer(r,false,100);assert.equal(r.player.unarmedAttack,null);assert.equal(r.player.attackTime,0);assert.equal(r.player.attackCD,0);assert.equal(r.bufferedCombat,null);
});
test('normalized combat ignores cosmetic weapon selection and never gains fists advantage',()=>{
 for(const h of HEROES){const p={character:h.id,normalizedCombat:true,equippedWeapon:null};assert(!isUnarmed(p));assert.equal(combatProfile(p).weapon,'sabre');assert(weaponArtForActor(p));}
});
test('all Wissem frame sockets remain at the supplied hand, even during attack translation',()=>{
 const sockets=manifest.images['hero/wissem'].weaponSockets;
 for(let frame=0;frame<14;frame++)for(const offhand of [false,true]){
  const p={character:'wissem',equippedWeapon:'gauntlet',grounded:true,attackTime:.05,attackDuration:.2};const pose=weaponPose(p,frame,1,0,offhand,sockets);const expected=offhand?sockets.offhand[frame]:sockets[frame];assert.equal(pose.x,expected[0]);assert.equal(pose.y,expected[1]);
 }
 assert.equal(weaponArtForActor({character:'wissem',equippedWeapon:null}),null);
});
test('all body and legacy outfit flags reflect the same visual audit',()=>{
 for(const h of HEROES)for(const key of ['hero/'+h.id,'hero/'+h.id+'/still','outfit/'+h.id+'/frost','outfit/'+h.id+'/ember'])assert.equal(manifest.images[key].weaponLayer,h.id==='wissem'?'separate':'baked');
});
test('all 84 cropped PNGs match their provenance checksums and rectangle dimensions',()=>{
 assert.equal(crops.length,84);const names=new Set();for(const c of crops){const png=read(c.path);assert.equal(png.readUInt32BE(16),c.crop[2]-c.crop[0]);assert.equal(png.readUInt32BE(20),c.crop[3]-c.crop[1]);assert.equal(crypto.createHash('sha256').update(png).digest('hex'),c.sha256);assert.equal(manifest.images[c.key].path,c.path);assert(!names.has(c.key));names.add(c.key);}
});
test('cropped crouch icon is wired to the unchanged continuous control ID',()=>{
 assert(CONTROL_IDS.includes('crouchControl'));assert.equal(CONTROL_ART.crouchControl.icon,'crouch');assert.equal(CONTROL_ART.crouchControl.asset,'ui/icons/crouch');assert.equal(manifest.images['ui/icons/crouch'].path,'assets/ui/icons/crouch.png');
 assert(read('game/index.html').toString().includes('id="crouchControl" data-control="crouch"'));
});
// Synthetic READY fixtures exercise the actual future renderer, not imaginary shipped inventory.
const fixture=()=>{
 const m={images:{'hero/wissem':{frameWidth:128,frameHeight:160,frames:14,weaponLayer:'separate',modularBody:{rear:'rear',base:'base',front:'front'}}}};
 for(const key of ['rear','base','front',...WARDROBE_SLOTS])m.images[key]={frameWidth:128,frameHeight:160,frames:14};
 m.images.weaponSkin={frameWidth:1254,frameHeight:1254,frames:1};
 const catalog=WARDROBE_SLOTS.map(slot=>({id:slot+'-test',hero:'wissem',slot,status:'ready',key:slot,cost:20,...(slot==='weaponSkin'?{weapon:'gauntlet',anchor:[.23,.78],angle:1.85,height:16}:{})}));
 const save=defaultSave();save.gold=500;save.ascension.ownedPieces=catalog.map(i=>i.id);return {m,catalog,save};
};
test('six slots are independent, clearable and frame-compatible',()=>{
 const {m,catalog,save}=fixture();assert.equal(WARDROBE_SLOTS.length,6);
 for(const i of catalog)assert(equipWardrobe(save,'wissem',i.slot,i.id,m,catalog));
 assert.deepEqual(save.ascension.wardrobe.wissem,Object.fromEntries(catalog.map(i=>[i.slot,i.id])));
 assert(equipWardrobe(save,'wissem','hat',null,m,catalog));assert.equal(save.ascension.wardrobe.wissem.hat,null);assert.equal(save.ascension.wardrobe.wissem.top,'top-test');
 assert.deepEqual(sanitizeWardrobe(save.ascension.wardrobe,save.ascension.ownedPieces,catalog,m),save.ascension.wardrobe);
});
test('wrong hero, unowned, pending, misaligned or non-modular clothing cannot equip/sell',()=>{
 const {m,catalog,save}=fixture(),hat=catalog[0];
 for(const bad of [{...hat,hero:'kossay'},{...hat,status:'pending'}])assert(!wardrobeItemReady(bad,'wissem',m));
 m.images.hat.frames=1;assert(!wardrobeItemReady(hat,'wissem',m));m.images.hat.frames=14;
 delete m.images['hero/wissem'].modularBody;assert(!wardrobeItemReady(hat,'wissem',m));assert(!purchaseWardrobe(save,hat.id,'wissem',m,catalog));
 const f=fixture();f.save.ascension.ownedPieces=[];assert(!equipWardrobe(f.save,'wissem','hat','hat-test',f.m,f.catalog));
});
test('weapon skin requires correct class, source grip and separate body; hides while unarmed',()=>{
 const {m,catalog,save}=fixture(),skin=catalog.find(i=>i.slot==='weaponSkin');
 assert(equipWardrobe(save,'wissem','weaponSkin',skin.id,m,catalog));assert(wardrobeLayers('wissem',save.ascension.wardrobe.wissem,m,catalog,'gauntlet').some(l=>l.slot==='weapon'));
 assert(!wardrobeLayers('wissem',save.ascension.wardrobe.wissem,m,catalog,null).some(l=>l.slot==='weapon'));
 save.ascension.weapons.wissem='sabre';assert(!equipWardrobe(save,'wissem','weaponSkin',skin.id,m,catalog));
 assert(!wardrobeItemReady({...skin,anchor:[2,0]},'wissem',m));m.images['hero/wissem'].weaponLayer='baked';assert(!wardrobeItemReady(skin,'wissem',m));
});
test('render stack is explicit and includes all equipped layers in the intended order',()=>{
 const {m,catalog}=fixture(),selection=Object.fromEntries(catalog.map(i=>[i.slot,i.id]));
 assert.deepEqual(wardrobeLayers('wissem',selection,m,catalog,'gauntlet').map(l=>l.slot),WARDROBE_DRAW_ORDER);
});
test('cosmetic purchase is one-time, cannot mint gold, and never touches combat stats',()=>{
 const {m,catalog,save}=fixture();save.ascension.ownedPieces=[];const before=heroStats('wissem');assert(purchaseWardrobe(save,'hat-test','wissem',m,catalog));assert.equal(save.gold,480);assert(purchaseWardrobe(save,'hat-test','wissem',m,catalog));assert.equal(save.gold,480);
 assert(!purchaseWardrobe(save,'hat-test','wissem',m,[{...catalog[0],cost:-1}]));assert.deepEqual(heroStats('wissem'),before);assert.equal(WARDROBE_CATALOG.length,0);
});
test('no unauthored new pieces are sold and no font binary is required to boot',()=>{
 assert.equal(WARDROBE_CATALOG.length,0);const css=read('game/atelier.css').toString();assert(css.includes("local('Pixelify Sans')"));assert(css.includes("local('VT323')"));assert(!/https?:\/\//.test(css));assert(css.includes('background-clip:text'));
});
````

## `tests/customization.test.mjs`

Tasks: 4 / comparison revision. OLD SHA-256: `f8eea12c86fa1f16f94a873e0b1a97d8f454b0df3f7ba4eb949d9537ec685f27`. NEW SHA-256: `34ed8a85f3b648fae242c1842a4cbcf45d86dbc2378ca18c56e57d3f48013bf1`.

### replace: OLD 6–6; NEW 6–6

OLD
````text
test('new solo records include player count, deaths, revives and rules revision',()=>{const r=createRun();r.knockouts=2;const row=ascResult(r);assert.equal(row.playerCount,1);assert.equal(row.deaths,2);assert.equal(row.revives,0);assert.equal(row.revision,4);});
````

NEW
````text
test('new solo records include player count, deaths, revives and rules revision',()=>{const r=createRun();r.knockouts=2;const row=ascResult(r);assert.equal(row.playerCount,1);assert.equal(row.deaths,2);assert.equal(row.revives,0);assert.equal(row.revision,5);});
````

## `tests/weapon-ui.test.mjs`

Tasks: 0,1,4,6,8. OLD SHA-256: `a248bb95c0fbec21f529377acc4fca7628151da0962e68dffc7b21a0a2c1ee3a`. NEW SHA-256: `068ad26adbee8d58f1c04efc4d2c5452847a7b6ef3b71bc85ebade5995c7f826`.

### replace: OLD 13–14; NEW 13–19

OLD
````text
 assert.equal(entry.frameWidth,256);assert.equal(entry.frameHeight,256);assert.equal(entry.frames,1);
 assert.equal(entry.optional,true);
````

NEW
````text
 const png=fs.readFileSync(new URL(`../${entry.path}`,import.meta.url));
 assert.deepEqual(png.subarray(0,8),Buffer.from([137,80,78,71,13,10,26,10]));
 assert.equal(png.toString('ascii',12,16),'IHDR');
 assert.equal(entry.frameWidth,png.readUInt32BE(16));
 assert.equal(entry.frameHeight,png.readUInt32BE(20));
 assert.equal(entry.frames,1);assert.equal(entry.optional,false);
 assert.equal(entry.status,'ready');
````

### replace: OLD 58–59; NEW 63–64

OLD
````text
test('body sheets remain marked baked until weapon-free art is provided',()=>{
 for(const h of heroes)assert.equal(manifest.images['hero/'+h.id].weaponLayer,'baked');
````

NEW
````text
test('visual audit enables only the weapon-free Wissem body',()=>{
 for(const h of heroes)assert.equal(manifest.images['hero/'+h.id].weaponLayer,h.id==='wissem'?'separate':'baked');
````

### replace: OLD 68–69; NEW 73–74

OLD
````text
test('new solo results use a distinct revision after Mira changes',()=>{
 const result=ascResult(createRun(0,'mira'));assert.equal(ASC_RULES_REVISION,4);assert.equal(result.revision,4);
````

NEW
````text
test('new solo results use a distinct revision after unarmed / loadout changes',()=>{
 const result=ascResult(createRun(0,'mira'));assert.equal(ASC_RULES_REVISION,5);assert.equal(result.revision,5);
````

### insert: OLD 81–80; NEW 86–92

OLD
````text
````

NEW
````text

// Required weapon registration must describe real files, not optional placeholders.
test('weapon directory has exactly the ten registered PNG filenames',()=>{
 const actual=fs.readdirSync(new URL('../assets/weapons/',import.meta.url)).filter(n=>n.toLowerCase().endsWith('.png')).sort();
 const expected=[...new Set(heroes.map(h=>weaponArtForHero(h.id).file))].sort();
 assert.deepEqual(actual,expected);
});
````

