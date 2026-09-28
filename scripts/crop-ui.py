#!/usr/bin/env python3
"""Reproduce the committed UI crops from the three original sheets. Requires Pillow."""
import json
from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[1]
ledger=json.loads((root/'art-source/ui/crops.json').read_text())
for entry in ledger:
    source=(root/entry['source']).resolve();dest=(root/entry['path']).resolve()
    if not source.is_relative_to(root) or not dest.is_relative_to(root):raise ValueError('Unsafe crop path')
    with Image.open(source) as image:
        left,top,right,bottom=entry['crop']
        if not (0<=left<right<=image.width and 0<=top<bottom<=image.height):raise ValueError(entry['path'])
        dest.parent.mkdir(parents=True,exist_ok=True)
        image.crop((left,top,right,bottom)).save(dest)
print(f'Reproduced {len(ledger)} crops without redraw, resize or smoothing.')
