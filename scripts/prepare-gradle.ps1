$ErrorActionPreference = 'Stop'
function File-Sha256($path) {
    $stream = [IO.File]::OpenRead($path)
    $sha = [Security.Cryptography.SHA256]::Create()
    try { return [BitConverter]::ToString($sha.ComputeHash($stream)).Replace('-', '').ToLowerInvariant() }
    finally { $stream.Dispose(); $sha.Dispose() }
}
$root = Split-Path $PSScriptRoot -Parent
$jar = Join-Path $root 'gradle/wrapper/gradle-wrapper.jar'
$expected = '81a82aaea5abcc8ff68b3dfcb58b3c3c429378efd98e7433460610fecd7ae45f'
if (!(Test-Path $jar)) {
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    $tmp = "$jar.download"
    try {
        Write-Host 'Downloading the official Gradle 8.13 wrapper (first use only).'
        Invoke-WebRequest -Uri 'https://raw.githubusercontent.com/gradle/gradle/v8.13.0/gradle/wrapper/gradle-wrapper.jar' -OutFile $tmp -UseBasicParsing
        if ((File-Sha256 $tmp) -ne $expected) { throw 'Wrapper checksum mismatch. Refusing to execute.' }
        Move-Item $tmp $jar -Force
    } finally { if (Test-Path $tmp) { Remove-Item $tmp -Force } }
}
if ((File-Sha256 $jar) -ne $expected) { throw 'Untrusted wrapper JAR. Check the official Gradle 8.13 SHA-256.' }
Write-Host 'Gradle wrapper SHA-256 verified.'
