#!/usr/bin/env python3
"""OPTIONAL: run on your own machine to install the chosen Google Fonts for offline packaging.
No font downloads occur in the game or during a normal build. Requires Python 3 only.
Font specimens/license information: https://fonts.google.com/specimen/Pixelify+Sans
and https://fonts.google.com/specimen/VT323 . Review each font license before redistribution.
"""
from pathlib import Path
from urllib.request import Request,urlopen
from urllib.parse import urlparse
import re,hashlib,json
root=Path(__file__).resolve().parents[1]
ua='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
specs=[('Pixelify Sans','Pixelify+Sans:wght@700','pixelify-sans-latin.woff2'),('VT323','VT323','vt323-latin.woff2')]
report=[]
for name,family,filename in specs:
    cssurl='https://fonts.googleapis.com/css2?family='+family+'&display=swap'
    with urlopen(Request(cssurl,headers={'User-Agent':ua}),timeout=30) as response:css=response.read().decode()
    # The final block is the Latin subset in Google Fonts CSS. Check for the explicit marker first.
    latin=css.rsplit('/* latin */',1)[-1]
    urls=re.findall(r'url\((https://fonts\.gstatic\.com/[^)]+)\)',latin)
    if not urls:raise RuntimeError('No official Latin font URL for '+name)
    url=urls[-1]
    if urlparse(url).hostname!='fonts.gstatic.com':raise RuntimeError('Unexpected font host')
    with urlopen(Request(url,headers={'User-Agent':ua}),timeout=30) as response:content=response.read()
    if content[:4]!=b'wOF2':raise RuntimeError('Expected WOFF2; font source format changed')
    destination=root/'assets/fonts'/filename;destination.parent.mkdir(parents=True,exist_ok=True);destination.write_bytes(content)
    report.append({'family':name,'source':cssurl,'file':str(destination.relative_to(root)),'sha256':hashlib.sha256(content).hexdigest()})
(root/'assets/fonts/installed.json').write_text(json.dumps(report,indent=2)+'\n')
print('Installed fonts. Review licenses, then run npm run build to embed/package them offline.')
