# Publish the v1.4.1 UI-polish source from your machine

This folder is already updated: version1.4.1, Android versionCode46. No GitHub write or tag was attempted during this polish pass. Preserve your repository’s history, existing tags, credentials and unrelated files. This is a source/playtest WIP, not a certified native release.

Copy the CONTENTS of this folder into a clean checkout, without deleting unrelated repository paths. Inspect the resulting diff before staging. Do not overwrite an existing v1.4.1 tag or force-push history. Run:

```sh
npm test
npm run validate:weapon-art
npm run build
```

The expected local tests are333 passed. Review `UI-POLISH-DELIVERY.md` and `docs/MISSING-ASSETS.md` before publishing. If you choose to tag this source snapshot, use a new annotated `v1.4.1` source/playtest tag on your reviewed commit; keep every earlier tag intact. Native compilation and device testing are separate steps and were not done by this pass. Keep production signing secrets out of the source tree.
