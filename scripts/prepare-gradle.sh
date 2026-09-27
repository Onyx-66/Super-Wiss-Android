#!/usr/bin/env sh
# Obtain the official wrapper only when absent; never execute an unverified JAR.
set -eu
ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
JAR="$ROOT/gradle/wrapper/gradle-wrapper.jar"
EXPECTED=81a82aaea5abcc8ff68b3dfcb58b3c3c429378efd98e7433460610fecd7ae45f
hash_file() { if command -v sha256sum >/dev/null 2>&1; then sha256sum "$1" | cut -d ' ' -f1; else shasum -a 256 "$1" | cut -d ' ' -f1; fi; }
if [ ! -f "$JAR" ]; then
  URL=https://raw.githubusercontent.com/gradle/gradle/v8.13.0/gradle/wrapper/gradle-wrapper.jar
  echo 'Downloading the official Gradle 8.13 wrapper (first use only).'
  TMP="$JAR.download.$$"
  trap 'rm -f "$TMP"' EXIT HUP INT TERM
  if command -v curl >/dev/null 2>&1; then
    curl --fail --location --proto '=https' --tlsv1.2 --connect-timeout 20 --max-time 120 "$URL" -o "$TMP"
  elif command -v wget >/dev/null 2>&1; then
    wget --https-only --timeout=60 -O "$TMP" "$URL"
  else echo 'Install curl or wget, or run scripts/prepare-gradle.ps1 on Windows.' >&2; exit 1; fi
  [ "$(hash_file "$TMP")" = "$EXPECTED" ] || { echo 'Wrapper checksum mismatch. Refusing to execute.' >&2; exit 1; }
  mv "$TMP" "$JAR"
fi
[ "$(hash_file "$JAR")" = "$EXPECTED" ] || { echo 'Untrusted wrapper JAR: SHA-256 does not match Gradle 8.13.' >&2; exit 1; }
echo 'Gradle wrapper SHA-256 verified.'
