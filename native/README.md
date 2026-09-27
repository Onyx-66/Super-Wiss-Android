# Actual native host — Nightfall v4

Readable Java is in `app/src/main/java/com/superwiss/game/playtest/`. It implements the
trusted bundled WebView, back/insets/lifecycle, optional HTTPS origin allowlist, native
share/haptics and three-slot paired Bluetooth RFCOMM. The shipped APK's DEX is
`native/compiled/classes.dex`; the matching own-class JAR is retained for inspection.

`native/apktool/smali/` contains the exact decoded v4 classes for reference. Resource
packaging uses `native/apktool/`; the build script replaces its DEX with the compiled
Java output. Edit Java and compile it, rather than separately editing generated smali.
`compile-support/make-stubs.py` creates minimal PUBLIC API signatures for the QA fallback.
These are compile-only and never included in the app DEX. They do not constitute an SDK.

Prefer official Android Studio/SDK/Gradle for development/release. That route was not
executed here. No Android device/emulator, SDK lint or official apksigner test was run.
The successful fallback does not prove Android runtime compatibility.

Tool provenance (not shipped as third-party binaries):
- Apktool CI artifact 10662729818, run 35654112498, commit
  57690eee61e394e1987c09981bd36ff171e73d8d, iBotPeaches/Apktool.
- dex-tools artifact 9374730489, run 32277907756, commit
  8ac73f57ce7870a22beb3486173dd9df0f2f4b4f, ThexXTURBOXx/dex2jar.
  Artifact ZIP SHA-256: 83f1be9df5f32ac185a0f1dac2a9e198ea3bd7ab3142fe0af3d2e1d88a89a4fa.
  Its d2j-external JAR provides the DX compiler used by the fallback.
- Java, Python cryptography and supplied signing/verifying scripts handle test packaging.

The `qa` keystore is deliberately public. Never use it as a production/upload identity.
