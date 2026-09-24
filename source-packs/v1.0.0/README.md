# Super Wiss Android v1.0.0 source pack

The complete current project is stored here as 29 base64 text chunks.

- Archive: `Super-Wiss-v1.0.0-source.tar.gz`
- Size: 2,573,307 bytes
- SHA-256: `e82c2f8102b9ce3857f7ff56c1b84a9a428c36a31814192f2f2765b16f85e75c`

Restore:

```sh
python3 scripts/restore-v1-source.py
cd Super-Wiss-GitHub-v1
npm run bootstrap
npm run validate
npm test
```

The restored snapshot contains the Android Studio project, gameplay engine, backend,
tests, documentation, runtime asset pack and `docs/assets_generation_prompts.txt`.
