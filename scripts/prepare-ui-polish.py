from pathlib import Path
from PIL import Image
import json,hashlib
R=Path(__file__).resolve().parents[1]
m=json.loads((R/'assets/manifest.json').read_text());pro=[]
def save_png(key,im,path,source,operations):
 p=R/path;p.parent.mkdir(parents=True,exist_ok=True);im.save(p,optimize=True)
 m['images'][key]={'path':path,'frameWidth':im.width,'frameHeight':im.height,'frames':1}
 pro.append({'key':key,'path':path,'source':source,'operations':operations,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
# Repack unornamented edge strips and the original four corners: no painted/recreated pixels.
src='assets/ui/frames/panel.png';im=Image.open(R/src).convert('RGBA');w,h=im.size
rects=[(0,0,32,32),(64,0,96,32),(w-32,0,w,32),(0,64,32,96),(64,64,96,96),(w-32,64,w,96),(0,h-32,32,h),(64,h-32,96,h),(w-32,h-32,w,h)]
out=Image.new('RGBA',(96,96))
for i,box in enumerate(rects):out.paste(im.crop(box),(i%3*32,i//3*32))
save_png('ui/frames/panel-shell',out,'assets/ui/frames/panel-shell.png',src,[{'crop':list(b),'paste':[i%3*32,i//3*32]}for i,b in enumerate(rects)])
# A diamond is an independent layer so it is never stretched with the border.
save_png('ui/ornaments/diamond',im.crop((211,2,235,26)),'assets/ui/ornaments/diamond.png',src,[{'crop':[211,2,235,26]}])
save_png('ui/ornaments/rule',im.crop((65,11,97,14)),'assets/ui/ornaments/rule.png',src,[{'crop':[65,11,97,14]}])
# All five boss crown colours supplied by the source icon sheet.
ic=Image.open(R/'art-source/ui/Assets_icons.png');print('icon source',ic.size)
# New crown crops are made directly from the same supplied icon sheet, no vector crown overlay.
for name,box in [('silver',(143,604,250,696)),('red',(256,604,363,696)),('green',(376,604,486,696)),('cyan',(503,604,612,696)),('pink',(622,604,731,696))]:
 save_png('ui/icons/crown-'+name,ic.crop(box),'assets/ui/icons/crown-'+name+'.png','art-source/ui/Assets_icons.png',[{'crop':list(box)}])
(R/'assets/manifest.json').write_text(json.dumps(m,indent=2)+'\n')
(R/'art-source/ui/polish-crops.json').write_text(json.dumps(pro,indent=2)+'\n')
