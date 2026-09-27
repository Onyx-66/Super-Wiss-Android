"""Optional guide renderer: python -m pip install mistune; python scripts/build-docs.py.
Not required for running or building the game. No external fonts/scripts are used.
"""
from pathlib import Path
import base64, html, re, sys
try:
    import mistune
except ImportError:
    sys.exit('Optional documentation dependency missing: python -m pip install mistune')
ROOT = Path(__file__).resolve().parents[1]
source = ROOT / 'docs/EDITING-GUIDE.md'
body = mistune.create_markdown(plugins=['table', 'strikethrough'])(source.read_text())
links = []
used = set()
def heading(match):
    level, text = match.group(1), match.group(2)
    plain = re.sub('<[^>]+>', '', text)
    anchor = re.sub('[^a-z0-9]+', '-', html.unescape(plain).lower()).strip('-')
    while anchor in used:
        anchor += '-x'
    used.add(anchor)
    if level == '2' and re.match(r'\d+\.', plain):
        links.append(f'<a href="#{anchor}">{plain}</a>')
    return f'<h{level} id="{anchor}">{text}</h{level}>'
body = re.sub(r'<h([123])>(.*?)</h\1>', heading, body)
body = body.replace('<table>', '<div class="table-wrap"><table>').replace('</table>', '</table></div>')
image = base64.b64encode((ROOT/'docs/nightfall-boss.png').read_bytes()).decode()
page = '''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Super Wiss — Editing & Rebuilding Guide</title>
<style>
:root{color-scheme:light;--ink:#12243b;--blue:#225781;--gold:#e6b659;--paper:#f2f5f9}*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:24px}body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.7 system-ui,-apple-system,Segoe UI,sans-serif}header{padding:42px max(24px,calc((100vw - 1220px)/2));background:#112038;color:white;border-bottom:5px solid var(--gold)}header .eyebrow{color:#f4ce7d;font-size:12px;font-weight:800;letter-spacing:.22em}header h1{color:white;font-size:clamp(28px,4vw,48px);line-height:1.15;margin:.4em 0}header p{color:#d0ddee;max-width:790px;margin-bottom:0}.layout{max-width:1280px;margin:auto;display:grid;grid-template-columns:250px minmax(0,1fr);gap:36px;padding:32px 24px}nav{position:sticky;top:25px;align-self:start;background:white;border:1px solid #dce3ec;border-radius:14px;padding:18px;font-size:13px;line-height:1.5;max-height:92vh;overflow:auto}nav strong{display:block;font-size:11px;letter-spacing:.16em;margin-bottom:8px;color:#65809e}nav a{display:block;padding:9px 3px;border-bottom:1px solid #edf1f5;text-decoration:none;color:var(--blue)}nav a:hover{color:#8c5a12}main{background:white;border:1px solid #dce3ec;border-radius:16px;min-width:0;padding:32px 38px;box-shadow:0 3px 18px #19354a07}h1,h2,h3{line-height:1.3;letter-spacing:-.015em}main h1{font-size:32px;margin:0 0 12px}h2{font-size:25px;border-top:1px solid #dbe4ee;padding-top:26px;margin-top:36px}h3{font-size:19px;margin-top:28px;color:#244b6f}p{margin:12px 0 18px}a{color:var(--blue);overflow-wrap:anywhere}code{background:#eef3f8;border-radius:4px;padding:2px 5px;font-size:.87em;overflow-wrap:anywhere}pre{background:#122238;color:#eaf3ff;padding:20px;border-radius:9px;overflow:auto;line-height:1.6;font-size:13px}pre code{background:none;color:inherit;padding:0;overflow-wrap:normal}.table-wrap{overflow:auto;margin:22px 0}table{width:100%;border-collapse:collapse;font-size:14px;line-height:1.55}td,th{padding:12px 14px;border:1px solid #dbe3ec;text-align:left;vertical-align:top}th{background:#eaf1f8}tr:nth-child(even){background:#f8fafc}blockquote{border-left:4px solid var(--gold);padding:8px 18px;margin:20px 0;background:#fffaf0}li{margin:8px 0}hr{border:0;border-top:1px solid #dbe3ec;margin:28px 0}.preview{margin:0 0 30px}.preview img{width:100%;height:auto;border-radius:10px}.preview figcaption{font-size:12px;color:#61738b;margin-top:8px}.footer{margin-top:30px;border-top:1px solid #ddd;padding:20px;color:#62778e;font-size:12px}button{border:1px solid #92adc6;background:#ffffff12;color:white;padding:10px 16px;border-radius:7px;cursor:pointer;margin-top:20px;font:inherit}@media(max-width:850px){.layout{grid-template-columns:1fr;gap:20px;padding:20px 14px}nav{position:static;max-height:none}nav a{display:inline-block;margin-right:12px;max-width:100%}main{padding:24px 20px}header{padding:28px 22px}}@media print{nav,button,.preview{display:none}.layout{display:block;padding:0}header{background:white;color:#111;border-color:#999;padding:0 0 15px}header h1,header p,header .eyebrow{color:#111}main{border:0;box-shadow:none;padding:0}body{background:white;font-size:10pt}h2,h3{break-after:avoid}pre,table{break-inside:avoid}a{color:inherit}pre{white-space:pre-wrap;background:#eee;color:#111}}
</style></head><body><header><div class="eyebrow">NIGHTFALL • VERSION 4.0</div><h1>Build your next adventure.</h1><p>The hands-on guide to editing Super Wiss: replace art and audio, tune bosses and skills, extend worlds, test Bluetooth parties, configure accounts, and rebuild the Android test package.</p><button onclick="window.print()">Print this guide</button></header><div class="layout"><nav aria-label="Guide contents"><strong>ON THIS PAGE</strong>'''+''.join(links)+'''</nav><main><figure class="preview"><img alt="Actual Super Wiss Nightfall browser-rendered boss arena" src="data:image/png;base64,'''+image+'''"><figcaption>Actual browser-rendered game. This is not an Android-device screenshot.</figcaption></figure>'''+body+'''<div class="footer">Super Wiss Nightfall 4.0 • QA build • Keep your production signing key private.</div></main></div></body></html>'''
(ROOT/'docs/EDITING-GUIDE.html').write_text(page)
print(f'Wrote portable editing guide: {len(page.encode()):,} bytes; {len(links)} sections')
