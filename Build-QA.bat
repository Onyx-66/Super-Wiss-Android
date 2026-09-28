@echo off
setlocal
cd /d "%~dp0"
call gradlew.bat :app:assembleQa :app:bundleQa :app:lintQa
if errorlevel 1 exit /b 1
if not exist artifacts mkdir artifacts
copy /Y app\build\outputs\apk\qa\app-qa.apk artifacts\Super-Wiss-Ascension-1.4.1.apk
copy /Y app\build\outputs\bundle\qa\app-qa.aab artifacts\Super-Wiss-Ascension-1.4.1.aab
echo QA packages are in artifacts. Do not publish them as production.
