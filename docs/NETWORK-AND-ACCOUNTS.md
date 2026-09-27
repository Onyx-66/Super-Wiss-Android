# Ascension — paired Bluetooth and optional accounts

## What a six-digit code does

The host generates a fresh, zero-padded six-digit admission code. Bluetooth system pairing
establishes the radio connection first; the game code admits that connection to the lobby.
It is NOT worldwide code matchmaking, Internet hosting or an online identity credential.
Only admitted peers receive the roster and snapshots. Three incorrect attempts disconnect
an unadmitted peer; create a fresh room to reset failed slot admission.

## Setup on 2–4 phones

1. Install the same Ascension 1.1.0 APK on every phone. Keep Play Protect enabled.
2. In Android Bluetooth settings, pair each guest with the host. Return to the game.
3. Open **Play together → Allow / refresh** and allow Nearby devices when requested.
4. On the host, choose **Create room**. Copy/share the six digits shown.
5. On a guest, enter all six digits, then choose the paired host's name. Join one phone
   at a time during initial testing. A code alone cannot find an unpaired radio.
6. Host selects mode/boss/difficulty. Guests choose **Ready up**. Option changes reset readiness.
7. Host chooses **Start raid/match**. Keep every app foregrounded. If a phone disconnects or
   backgrounds during play, the match is cancelled; there is no host migration/rejoin.
8. The host can reopen a rematch lobby. Idle disconnected slots re-open their listeners.

## Implemented modes

**Shared boss raid (2–4):** one boss/phase state, health multiplier `1 + 0.65*(players-1)`.
Boss AI advances once per frame, not once per player. The shared stagger threshold also scales.
Native skills and the equipped timed pet apply; borrowed/fused hero builds do not.
A downed player has 25 seconds for an ally to stand within 130 logical pixels and hold
REVIVE for 3 uninterrupted seconds. The team has one shared revive charge per starting player.
Revival restores half maximum health (at least two hearts). No allies standing means a wipe.
All teammates share victory. Damage/revives are descriptive, not competing teammate ranks.
Six-minute fight limit. Local raid results do not award campaign/global progress.

**Solo together (2–4):** independent boss attempts with visible ghosts. Fastest successful
clear wins; all failures produce no winner. Five-minute fight limit.

**Free-for-all (2–4):** equal six hearts, melee/knife/dodge, no hero skills or pets. First
10 KOs or most KOs after three minutes. Fewer deaths breaks a tie; remaining tie is a draw.

**2v2 (exactly 4):** alternating roster positions create Sun/Moon teams. No friendly fire.
First 10 team KOs or higher team total at three minutes. Ties are draws.

Dungeon Run, open-world campaign co-op and Survival are NOT new delivered modes in this build.

## Protocol and limits

Protocol5 rejects the old protocol4 APK. Three paired secure RFCOMM service slots retain
the previous UUIDs. Frames are 4-byte big-endian lengths plus UTF-8 JSON, max65,536 bytes,
queue48 and rate guard100 messages/sec per connection. No scan/location permission is used.
Host inputs are simulated locally; guest inputs transmit about30Hz. Snapshots transmit
20Hz with two players,12Hz with three/four. Inputs expire after450ms without refresh.
Session IDs and monotonically increasing sequences reject stale/replayed match inputs.
Snapshot sizes, actor fields and rendered result fields are validated.

This is a small host-authoritative LOCAL system, not Internet anti-cheat. A modified host
can lie. Radio throughput, coexistence with headsets, four-phone latency and reconnect behavior
remain unverified on hardware. Automated fixtures test the protocol, not Bluetooth radios.

## Optional online accounts

The existing `server/` implementation includes username/password login/signup, recovery,
friends, profiles and deletion. No service is deployed or configured in the APK by default.
No Google sign-in or cloud save is included. Offline/Bluetooth play need no account.

```sh
cp server/.env.example server/.env
npm run accounts
```

Node22.16+ and no npm runtime packages. Local HTTP is for tests only. Host a real HTTPS
origin for phone use, then configure **Profile → Server settings**. Review `server/README.md`
and the historical deployment guidance for your chosen host. The Compose/Caddy examples
have not been executed here. Keep SQLite on persistent storage, deploy the deletion web
page, and operate moderation before exposing accounts publicly. Never put production secrets
or signing keys in this repository. The APK's INTERNET permission supports this opt-in service.
