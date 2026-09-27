# Nightfall — actual-phone acceptance checklist

**Every box below is still a hardware/staging task, not a completed test claim.**
Record APK SHA-256, model, Android version, WebView version, RAM and display refresh rate.

## Install and lifecycle
- [ ] Fresh-install the signed QA APK on Android 8+, a midrange phone and a recent flagship.
- [ ] Update v3 without uninstalling: confirm gold, pets and unlocked map access migrate correctly.
- [ ] Offline cold-start; all art/music loads with airplane mode (Bluetooth manually enabled for parties).
- [ ] Confirm both landscape directions, cutouts, gesture areas and tablet letterboxing.
- [ ] Check force-stop/relaunch save persistence; unfinished runs are not position-resumable.
- [ ] Interrupt with home, lock screen, incoming call, audio interruption and process death.
- [ ] Confirm Back, pause, resume, audio focus and disabled haptics behave correctly.

## Solo content and balance
- [ ] Simultaneous analog + jump + attack; rapid taps, small deflections and held inputs.
- [ ] Switch arrows/analog and mirror controls; no stuck pointer after system gestures.
- [ ] Each hero, each pet, summon type, knife aim, wall jump, downward pogo and stamina exhaustion.
- [ ] All three chambers in all 15 worlds are reachable without a mobility-specific hero.
- [ ] Wardens remain reachable, gates cannot be bypassed, checkpoints do not strand a player.
- [ ] Every boss's three phases, every attack telegraph and final stargate.
- [ ] Clear all 15 bosses on each intended tier; inspect unavoidable attack combinations.
- [ ] Skill/pet/summon caps persist through respawns and endless transitions.
- [ ] Blood Off/Essence/Crimson, low graphics, reduced motion and independent audio sliders.
- [ ] One continuous map-15 → map-1 endless transition, without duplicated rewards or growing memory.
- [ ] 20–30 minutes of gameplay: frame timing, memory, thermal throttling, battery and audio clipping.

## Bluetooth — two phones first, then four
- [ ] Pair through Android Settings; grant and deny Nearby devices permission.
- [ ] No-adapter/disabled-Bluetooth/no-host/error messages leave solo accessible.
- [ ] Actual host+guest boss challenge: identical boss, independent health and correct fastest winner.
- [ ] Actual free-for-all: damage/knives, respawn countdown, KO attribution, draw and timeout.
- [ ] Four phones: all slots join, 2v2 starts only with four, no friendly fire, correct team result.
- [ ] Profile name/avatar/banner/frame visible on the other phones; no credentials transmitted.
- [ ] Host changes mode, ready resets, no stale match snapshot on rematch.
- [ ] Leaving/backgrounding/turning Bluetooth off cancels fairly with no false win/reward.
- [ ] Weak signal, crowded 2.4 GHz, Bluetooth headphones, older phones and packet congestion.
- [ ] Reopen host room after disconnect and rejoin; slow host does not accumulate stale traffic.
- [ ] Measure actual throughput, input latency and frame pacing; optimize before public beta.

## Accounts — your deployed HTTPS staging service
- [ ] Correct TLS certificate, exact origin/CORS policy, persistent database and restore procedure.
- [ ] Sign-up/login/logout, duplicate usernames, bad passwords, rate limits and session expiration.
- [ ] Recovery code shown once, copy/paste works, reset revokes older sessions.
- [ ] Friends send/accept/decline/remove; block prevents new requests; reports reach an operator.
- [ ] Profile changes seen by a second signed-in friend on another phone.
- [ ] In-app and web account deletion; old credentials/tokens fail afterward.
- [ ] Switching/clearing server origin signs out; untrusted or HTTP origins are rejected.
- [ ] Network errors/timeouts never erase local progress or prevent offline play.

## Release gate
- [ ] Compile/lint with the official SDK/Gradle; verify APK using official apksigner.
- [ ] Build a production-key AAB; test Play-delivered APKs and pre-launch reports.
- [ ] Privacy/Data safety/content rating/account-deletion declarations match the deployed build.
- [ ] Staff moderation, abuse response, crash reporting consent and operational monitoring.
