#!/usr/bin/env sh
# Small bootstrap launcher, then the official, checksum-verified Gradle wrapper.
set -eu
APP_HOME=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
sh "$APP_HOME/scripts/prepare-gradle.sh"
if [ -n "${JAVA_HOME:-}" ]; then JAVACMD="$JAVA_HOME/bin/java"; else JAVACMD=java; fi
if ! command -v "$JAVACMD" >/dev/null 2>&1; then echo 'Use JDK 17 or newer (Android Studio includes one).' >&2; exit 1; fi
exec "$JAVACMD" -Xmx64m -Xms64m "-Dorg.gradle.appname=gradlew" -classpath "$APP_HOME/gradle/wrapper/gradle-wrapper.jar" org.gradle.wrapper.GradleWrapperMain "$@"
