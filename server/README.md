# Optional account service

Not deployed or configured in the APK by default. See
`../docs/NETWORK-AND-ACCOUNTS.md` for the current Android/HTTPS integration.

From the project root, with Node.js 22.16 or newer:

```sh
cp server/.env.example server/.env
npm run accounts
```

The local HTTP service is for development. Configure a genuine HTTPS origin, restricted
`ALLOWED_ORIGINS`, persistent `DATABASE_PATH`, backups and a working `/delete-account` web
page before staging. Docker/Caddy configuration is supplied but has not been executed here.
Never log account credentials or session tokens. Recovery codes must be kept by the player.

This service provides login/signup, account recovery/deletion, profiles and friendships.
It does not provide Google sign-in, cloud saves, global score verification or online raids.
Reports need a human operator and policy before public access. `server/moderate.mjs list`
inspects reports against the configured database; resolving a report is an explicit operator
mutation and is not an automatic content-moderation service.
