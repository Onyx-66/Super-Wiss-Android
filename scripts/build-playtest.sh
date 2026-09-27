#!/bin/sh
# Reproducible QA fallback. Official Android SDK/Gradle remains preferred.
set -eu
ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
: "${APKTOOL_JAR:?Set to a trusted Apktool JAR.}"
cd "$ROOT"
if [ -n "${DEX_TOOLS_LIB:-}" ]; then sh scripts/compile-native.sh; fi
[ -f native/compiled/classes.dex ] || { echo 'Compile native host first'; exit 1; }
WORK=$(mktemp -d);trap 'rm -rf "$WORK"' EXIT HUP INT TERM
node scripts/bundle.mjs
cp -R native/apktool "$WORK/app"
mkdir -p "$WORK/app/assets" artifacts
cp app/src/main/assets/* "$WORK/app/assets/"
java -jar "$APKTOOL_JAR" b "$WORK/app" -o "$WORK/resources.apk"
python3 - "$WORK/resources.apk" native/compiled/classes.dex "$WORK/unsigned.apk" <<'PY'
import sys,zipfile
src,dex,out=sys.argv[1:]
with zipfile.ZipFile(src) as a,zipfile.ZipFile(out,'w',compression=zipfile.ZIP_DEFLATED) as b:
 for n in a.namelist():
  if n!='classes.dex' and not n.startswith('META-INF/'):b.writestr(n,a.read(n))
 b.write(dex,'classes.dex')
PY
keytool -importkeystore -srckeystore qa/super-wiss-qa.jks -srcstorepass superwiss-testing-only -srcalias superwiss-qa -destkeystore "$WORK/qa.p12" -deststoretype PKCS12 -deststorepass superwiss-testing-only -noprompt
python3 scripts/sign_playtest.py "$WORK/unsigned.apk" "$WORK/qa.p12" superwiss-testing-only artifacts/Super-Wiss-Ascension-1.1.0.apk
python3 scripts/verify_playtest.py artifacts/Super-Wiss-Ascension-1.1.0.apk
jarsigner -verify artifacts/Super-Wiss-Ascension-1.1.0.apk
