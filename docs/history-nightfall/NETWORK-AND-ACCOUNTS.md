# Nearby parties and optional online accounts

## Implemented versus validated

Native RFCOMM transport is compiled into the attached APK. JavaScript party/protocol
logic has automated two/four-client tests and two rendered-browser integration tests.
**No actual Bluetooth radio connection or Android installation was tested here.**
The account API has real local HTTP/SQLite integration tests. No public HTTPS deployment
or native WebView-to-service login has been exercised. Neither feature is a live hosted
service supplied with the APK.

## Local party modes

**Solo together:** 2–4 friends attempt independent copies of the same boss. Players see
one another as translucent rivals but cannot hit or help each other. Fastest successful
clear wins; no clear is not treated as a win. Five-minute match limit.

**Free-for-all:** 2–4 players, equal six hearts, melee/knives/dodge only, three-second
respawn and a three-minute limit. First to ten KOs ends the match. Ties use deaths;
identical outcomes are a draw.

**2v2:** exactly four players, alternating roster positions form Sun and Moon. Friendly
fire is off; first team to ten KOs or highest team KOs at three minutes wins. There is
no friendly boss co-op, Internet PvP, matchmaking server, host migration or global rank.
Local matches never award campaign currency or unlocks.

## Pair phones and play

1. Install the same Nightfall v4 APK on all phones. Different protocol versions cannot join.
2. Turn on Bluetooth. Pair every guest phone with the host using Android Bluetooth settings.
   No in-app discovery/location permission is used.
3. Return to Super Wiss, open Nearby, and allow Nearby devices when requested. Permission
   denial leaves offline modes available.
4. One phone selects **Host**. Guests choose **Paired phones** and select the host's name.
   Connect guests one at a time during initial testing. The transport tries three slots;
   an occupied slot can delay the next connection attempt.
5. The host chooses mode/world; every guest marks ready. Changing options clears ready status.
6. Start. Keep all phones foregrounded. Backgrounding stops local sockets and cancels a match.
7. Use Rematch to return to the lobby. A disconnected slot needs the host to reopen a room
   before a replacement phone joins; the current implementation does not reopen consumed
   accept sockets automatically. The host can remove a player before starting.

## Transport and safety boundaries

Three fixed service UUIDs (ending `b401`, `b402`, `b403`) form a paired, secure RFCOMM star.
The host accepts at most three clients. Android's system pairing authenticates the radio
link, not an online Super Wiss identity. Use only phones and hosts you trust.

Frames are four-byte big-endian lengths followed by UTF-8 JSON, maximum 32,768 bytes.
Read/write operations run on workers, not the UI thread. Queues cap at 48 frames and
connections reject excessive input rates. Congestion cancels the connection rather than
allowing unbounded memory. Generation guards prevent old threads from attaching after stop.
No file transfer, microphone, chat or arbitrary URLs are exposed through the bridge.

Protocol 4 uses `hello`, `welcome`, `lobby`, `ready`, `start`, `input`, `snapshot`, `error`.
The host assigns peer IDs from actual socket slots. Clients submit only bounded controls
and increasing input sequence numbers. The host runs the simulation, TTLs stale input,
counts KOs, and sends state snapshots about 10 times per second. Inputs send about 30 times
per second. A per-match session identifier rejects previous-match messages. Snapshot
structure, counts, coordinates, health and profile identifiers are validated before render.

This is not Internet anti-cheat: a modified host can falsify its own match. No local
result is uploaded as a trusted global score. A radio failure cancels rather than inventing
a winner. Radio throughput/latency at four phones remains a release gate; large particle
snapshots and Bluetooth coexistence can require further compression or rate adjustment.

## Run the account service locally

Node.js 22.16+ includes the SQLite API this server uses. The application has no npm runtime
dependencies. For server-only testing:

```sh
cp server/.env.example server/.env
npm run accounts
```

The service listens on port 3000 by default. `GET /health` is public. Loopback HTTP is
for API tests only: the Android account client deliberately requires HTTPS. Do not
expose development HTTP to other users. The APK does not ship an active server origin.

## Example HTTPS staging deployment

The included `server/Dockerfile`, `compose.yaml`, and `server/Caddyfile` are templates;
Docker/Caddy were not executed here. Provide a real DNS name pointing to your host,
set `ACCOUNT_DOMAIN` in a root `.env`, and allow ports 80/443 for HTTPS provisioning.

```dotenv
ACCOUNT_DOMAIN=accounts.your-domain.example
```

```sh
docker compose up --build -d
```

SQLite belongs on persistent storage. The account container port is internal only;
Caddy terminates HTTPS. `ALLOWED_ORIGINS` must contain both the bundled app origin and
the service's own HTTPS origin so the deletion page can call its own API. It must not
be `*` and should not include arbitrary browser origins.

Enter that exact HTTPS origin under **Profile → Server settings**. Test health,
registration, login, recovery, friends and deletion from an actual APK before enabling
public sign-up. The native origin allowlist prevents network access elsewhere.

The conservative per-socket-IP rate limiter does not trust arbitrary forwarded IP
headers. Behind a reverse proxy, the IP budget is consequently shared. This is suitable
for a small staging group, **not a production-scale configuration**. Before launch,
add a reviewed trusted-proxy/rate-limit configuration and external abuse protection;
never blindly trust user-supplied `X-Forwarded-For`. Load-test the scrypt workload.

## Account data and recovery

Usernames: 3–24 ASCII letters/numbers/underscore. Passwords: 12–128 characters, salted
scrypt (N=32768,r=8,p=1). Random opaque session tokens are hashed server-side, expire
after seven days and are revoked on account recovery. The client stores its bearer
token in app WebView storage; production should review stronger native token storage.
Backups are disabled for the Android application. No password/token enters Bluetooth
profiles, screenshots, logs or share text.

A once-shown recovery code replaces email recovery. Store it safely. Recovery rotates
the code and invalidates older sessions. There is no Google sign-in, email collection,
cloud game save, global score endpoint, advertising or analytics SDK.

Friends require exact friend codes and acceptance. Only allowlisted avatars, four banners
and four frames are supported. Blocking removes friendship/requests. Reports enter the
SQLite moderation queue. A human operator must review them; no automated moderation is
claimed. The CLI can list/resolve reports; it does not replace a staffed moderation process.

```sh
node server/moderate.mjs list
node server/moderate.mjs resolve REPORT_ID
```

Account deletion rechecks the password and removes online profile, friendships, requests,
sessions and blocks. Reports retain their reason/status with deleted identities set null.
The public `/delete-account` page performs authenticated deletion without requiring the
app. Offline progress remains on each phone. Establish and disclose a retention schedule
for reports, backups and infrastructure logs before launching.

## Primary implementation references

- Android RFCOMM: https://developer.android.com/develop/connectivity/bluetooth/connect-bluetooth-devices
- Paired-device permissions: https://developer.android.com/develop/connectivity/bluetooth/bt-permissions
- Thread-safe socket close: https://developer.android.com/reference/android/bluetooth/BluetoothSocket
- Account-deletion policy: https://support.google.com/googleplay/android-developer/answer/13327111

Production should use an updated LTS runtime and pin its audited image digest. The
example uses the Node 24 LTS line; container deployment was not exercised here.
Official release status: https://nodejs.org/en/about/previous-releases
