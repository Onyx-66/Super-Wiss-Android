# Super Wiss — Android

**Current public baseline: v1.0.0**

This private repository contains the current Super Wiss Android source snapshot. The
earlier “2.0 / 3.0 / 4.0” labels used during prototype development were internal iteration
names, so public semantic versioning starts cleanly at **v1.0.0**.

## Restore the complete source

The connected GitHub integration accepts Git/text objects rather than a direct local
binary working-tree push, so the complete v1.0.0 snapshot is committed as a verified
split source pack.

```sh
git clone https://github.com/Onyx-66/Super-Wiss-Android.git
cd Super-Wiss-Android
python3 scripts/restore-v1-source.py
cd Super-Wiss-GitHub-v1
npm run bootstrap
npm run validate
npm test
```

The restore script validates the archive SHA-256 before extracting.

## Current gameplay

- 15 extended worlds with multi-stage seal chambers
- 15 three-phase boss encounters and Boss Hunt
- melee combos, pogo attacks, knives, dodge/stamina, focus-limited skills and summons
- 8 heroes and 7 collectible pets
- analog controls
- local Bluetooth-party implementation for 2–4 players
- optional account/profile/friends backend
- Android Studio host plus fallback packaging source

## Versioning

- current baseline → **v1.0.0**
- bugfix → v1.0.1
- backward-compatible feature update → v1.1.0
- breaking generation → v2.0.0

See `VERSIONING.md` and `source-packs/v1.0.0/README.md`.
