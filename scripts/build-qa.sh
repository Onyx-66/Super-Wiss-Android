#!/usr/bin/env sh
set -eu
ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$ROOT"
./gradlew :app:assembleQa :app:bundleQa :app:lintQa
mkdir -p artifacts
cp app/build/outputs/apk/qa/app-qa.apk artifacts/Super-Wiss-Ascension-1.4.1.apk
cp app/build/outputs/bundle/qa/app-qa.aab artifacts/Super-Wiss-Ascension-1.4.1.aab
echo 'QA packages are in artifacts. Do not publish them as production.'
