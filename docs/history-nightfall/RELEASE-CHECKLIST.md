# Release gates and a sustainable growth plan

## Product decisions in this build

Make challenging combat optional to enter, fast to retry and clear to read: Boss Hunt
is available immediately, Nightmare is default, Veteran and Inferno remain explicit
choices. Telegraphs and recovery windows should explain deaths rather than hide danger.
Local parties use equal combat stats instead of rare-pet advantages. Cosmetic frames
and banners never change damage. Guest play does not require registration. No ads,
pay-to-win purchases, random paid loot boxes or forced referral gates are included.

The share action sends a plain-text boss/time/tier challenge. It is not a replay, verified
online leaderboard entry, deep-link join or automatic social post. A recipient selects
the matching boss/tier manually. Daily tasks and mission progress are local and do not
claim synchronized global competition. There is no guarantee the game will go viral.

## Before an external beta

First close the hardware gaps: Android installation, save persistence, real two/four-phone
Bluetooth, exact-match protocol recovery and performance at low-end devices. Then human
playtest every chamber and boss. The ordinary-input pilot only cleared two early bosses
on Veteran; this is not proof of complete campaign balance. Treat Inferno as experimental.
Capture death causes and attempt time with opt-in playtester reports before adding more
punishment. Avoid publishing promotional artwork as a representation of footage that
players do not actually see.

## Experiments, not promises

Test whether new players can move, attack, dodge and read a boss warning in the first
session. Compare tutorial completion, first-boss attempts, voluntary rematches and friend
party setup success. These are proposed measurements, not existing analytics. Interview
players who quit; inspect unreadable controls, unavoidable damage and pairing friction.
Only after the core loop retains voluntary play should you spend on acquisition.
Show actual 10–20 second gameplay clips of a dodge, summon and phase transition. Test
which honest clip users understand fastest. Never seed fake rivals or rankings.

## Production engineering gates

Use the official Android SDK, Gradle, lint, apksigner and your PRIVATE upload certificate.
The supplied APK is public-QA-signed and cannot be treated as a production identity.
Choose a final application ID and version policy. Build/test an AAB on Play internal
or closed testing; no AAB was generated for this delivery. Finish device, accessibility,
audio focus, cutout, crash, thermal and frame-pacing testing. Confirm current target-SDK
and large-screen behavior requirements against Google Play at submission time.

Deploy accounts with valid HTTPS, persistent storage, backups, exact CORS, abuse controls
and a reviewed rate-limiting/trusted-proxy configuration. The current staging limiter
shares per-IP quotas behind a reverse proxy. Tokens currently live in WebView storage;
review native secure storage, independent security testing and incident handling before
public signup. This is a single SQLite service, not globally distributed infrastructure.

## Publication declarations and moderation

Provide your actual publisher identity, support contact, accessible privacy policy and
working public account-deletion page. Fill Data safety accurately for accounts, friend
relationships, reports, IP/infrastructure handling and any later SDKs. Classify the actual
fantasy violence and optional blood in the content-rating questionnaire; do not hide
Crimson mode from reviewers. App-side toggles do not remove declaration obligations.

Profile names are user-generated content, even without chat. Terms/rules acceptance,
blocking and reporting are implemented, but the operator must actually act on reports.
Choose a documented report/log/backup retention policy. The template is not a substitute
for jurisdiction-appropriate privacy/legal review. Keep children/family-targeting choices
consistent with the real violence, social features, data collection and store audience.
No store approval, age rating, security certification or monetization result is claimed.

Official policy starting points (verify at release):
- https://support.google.com/googleplay/android-developer/answer/13327111
- https://support.google.com/googleplay/android-developer/answer/9876937
- https://support.google.com/googleplay/android-developer/answer/10787469
- https://developer.android.com/studio/publish/app-signing
