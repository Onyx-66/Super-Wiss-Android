#!/usr/bin/env python3
"""Restore the full Super Wiss Android v1.0.0 source tree from GitHub source-pack chunks."""
from pathlib import Path
import base64, hashlib, io, tarfile

ROOT=Path(__file__).resolve().parents[1]
PARTS=ROOT/"source-packs"/"v1.0.0"
OUT=ROOT/"Super-Wiss-v1.0.0-source.tar.gz"
EXPECTED="e82c2f8102b9ce3857f7ff56c1b84a9a428c36a31814192f2f2765b16f85e75c"

parts=sorted(PARTS.glob("v1.0.0.part*.b64"))
if len(parts)!=29:
    raise SystemExit(f"Expected 29 source-pack parts, found {len(parts)}")
raw=base64.b64decode("".join(p.read_text().strip() for p in parts), validate=True)
digest=hashlib.sha256(raw).hexdigest()
if digest!=EXPECTED:
    raise SystemExit(f"SHA-256 mismatch: {digest}")
OUT.write_bytes(raw)
with tarfile.open(fileobj=io.BytesIO(raw), mode="r:gz") as tf:
    for member in tf.getmembers():
        target=(ROOT/member.name).resolve()
        if ROOT.resolve() not in target.parents and target!=ROOT.resolve():
            raise SystemExit(f"Unsafe archive member: {member.name}")
    tf.extractall(ROOT, filter="data")
print("Restored Super Wiss Android v1.0.0 source tree.")
