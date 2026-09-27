#!/bin/sh
# SDK-less fallback for QA ONLY. Prefer ./gradlew :app:assembleQa with the official SDK.
set -eu
ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
: "${DEX_TOOLS_LIB:?Point DEX_TOOLS_LIB to trusted dex-tools lib directory.}"
OUT=${1:-"$ROOT/native/compiled"}
mkdir -p "$OUT"
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT HUP INT TERM
python3 "$ROOT/native/compile-support/make-stubs.py" "$TMP/stubs"
find "$TMP/stubs" -name '*.java' > "$TMP/stub-sources.txt"
javac --release 8 -d "$TMP/signatures" @"$TMP/stub-sources.txt"
jar cf "$TMP/signatures.jar" -C "$TMP/signatures" .
find "$ROOT/app/src/main/java" -name '*.java' > "$TMP/sources.txt"
javac --release 8 -Xlint:all -cp "$TMP/signatures.jar" -d "$TMP/classes" @"$TMP/sources.txt"
# Never include stub classes. The DEX contains ONLY our app namespace.
jar cf "$TMP/host.jar" -C "$TMP/classes" com
java -cp "$DEX_TOOLS_LIB/*" com.android.dx.command.Main --dex --min-sdk-version=26 --output="$OUT/classes.dex" "$TMP/host.jar"
cp "$TMP/host.jar" "$OUT/host-classes.jar"
javap -classpath "$TMP/host.jar" -s com.superwiss.game.playtest.NativeBridge > "$OUT/bridge-signatures.txt"
echo "Compiled native host and Bluetooth bridge with javac + DX (not Android SDK/Gradle)."
