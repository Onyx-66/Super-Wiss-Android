# Super Wiss 3.0 — Phone test and release worksheet

Record results, rather than assuming a passing desktop test covers the phone.

**Tester:** __________ **Date:** __________ **APK SHA-256:** __________

**Phone/model:** __________ **Android version:** __________

**Android System WebView version:** __________ **Screen/refresh rate:** __________

## Installation and first session

- [ ] New install launches, displays the Wissem icon and has no parsing/certificate error.
- [ ] Updating the previous QA build works without uninstalling or clearing storage.
- [ ] Landscape works in both directions; notch, gesture bar and status bar do not obscure controls.
- [ ] Low-end device and current-generation device both reach the menu without a blank screen.
- [ ] Tutorial, pause, back button and menu navigation work at the phone's aspect ratio.

Do not disable Play Protect to dismiss an unexplained warning. Record its exact text.

## Controls and audio

- [ ] Hold movement and jump simultaneously; repeatedly tap each skill while moving.
- [ ] Use both Orca buttons with move/jump; check that controls do not remain held after a touch ends.
- [ ] Change mirrored controls, opacity, camera, graphics and reduced-motion settings.
- [ ] Test speaker, wired/Bluetooth headphones, silent/muted audio settings and independent sliders.
- [ ] Home, screen-lock, notification interruption and app switching pause appropriately.
- [ ] Incoming audio focus changes do not leave uncontrolled music or input running.

## Content and progression

- [ ] Collect a Wolf capsule, exit the app and verify collection/equipment persists.
- [ ] Test each hero's two skills, not just their tooltips.
- [ ] Pets → Test in practice: confirm no campaign currency, stars or pet ownership is awarded.
- [ ] Dragon Scales consumes exactly 15 contact charges; Breath gives triple enemy points for 45s.
- [ ] Flood suppresses enemies for 45s; Prince separately supports gaps for 45s; pause freezes timers.
- [ ] Complete one early, one middle and one late map; check objective stars, checkpoints and results.
- [ ] Test lives, falls, phase-expiry recovery, moving platforms, springs and slippery terrain.
- [ ] Test endless transitions, rare-buff carry, banking a run and local top-eight results.
- [ ] Test v2 save migration and settings persistence after a full app restart.

There is no exact mid-map position resume after a process restart. Checkpoints bank
progress but do not serialize an entire active run.

## Performance and robustness

- [ ] Run for at least 20–30 minutes; record lag, frame pacing, temperature and battery changes.
- [ ] Test high enemy density and both rare effects on a late world.
- [ ] Change resolution/text scaling and use a tablet/foldable if supporting those devices.
- [ ] Force-stop and restart; test device storage pressure, denied/failed local storage and clean saves.
- [ ] Confirm gameplay works in airplane mode and requests no unexpected permissions.

## Before any Google Play submission

This worksheet is not an approval or compliance certificate. Check the current
Play Console requirements for the account, app category and intended audience.

Use a private production/upload signing identity, not the included public QA key.
Choose the final package ID and version policy before publishing. Compile the Java
project with the supported Android SDK/Gradle environment, run lint, use the SDK's
`apksigner` verifier, and validate the actual AAB/APK set in Play testing. Review
asset rights, privacy disclosures, account/data handling if later adding online
services, age/content ratings and the store listing. Do not advertise online
friends or multiplayer for this offline build.

Useful official starting points:

- https://developer.android.com/tools/apksigner
- https://developer.android.com/studio/publish/app-signing
- https://developer.android.com/guide/app-bundle/test
- https://developer.android.com/google/play/requirements/target-sdk
- https://support.google.com/googleplay/android-developer/
