#!/usr/bin/env python3
"""Re-extract approved, generated concept art. Never reads the external stock/reference JPGs.
Run intentionally: this overwrites generated assets. Normal `npm run build` does NOT.
Requires Pillow, NumPy and SciPy. Coordinates refer to the three retained PNG boards.
"""
from pathlib import Path
import json, shutil
import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageOps
from scipy.ndimage import binary_fill_holes, binary_closing, label
ROOT=Path(__file__).resolve().parents[1]
A=Image.open(ROOT/'art-source/heroes-board.png').convert('RGB')
B=Image.open(ROOT/'art-source/codex-board.png').convert('RGB')
C=Image.open(ROOT/'art-source/worlds-board.png').convert('RGB')
manifest={}

def cut(im, rect, size=(128,160), mask=None):
    rect=tuple(round(v*1448/1408) for v in rect) if im.size==(1448,1086) else rect
    q=im.crop(rect).convert('RGBA'); ar=np.array(q); r,g,b=[ar[:,:,i].astype(float) for i in range(3)]
    # Panel backgrounds are dark, blue-grey gradients. Protect enclosed dark costume pixels.
    fg=(np.maximum.reduce([r,g,b])>60) | ((r>g*1.2)&(r>31)) | ((g>b*1.15)&(g>32))
    fg=binary_closing(fg,iterations=1)
    labs,num=label(fg)
    if num:
        counts=np.bincount(labs.ravel()); keep=np.where(counts>=8)[0]; keep=keep[keep!=0]
        fg=np.isin(labs,keep)
    fg=binary_fill_holes(fg)
    if mask:
        mm=Image.new('1',q.size);ImageDraw.Draw(mm).polygon(mask,fill=1);fg &= np.array(mm).astype(bool)
    ar[:,:,3]=fg.astype('uint8')*255;q=Image.fromarray(ar)
    bb=q.getbbox()
    if bb:q=q.crop(bb)
    q.thumbnail((size[0]-10,size[1]-10),Image.Resampling.LANCZOS)
    o=Image.new('RGBA',size);o.alpha_composite(q,((size[0]-q.width)//2,size[1]-q.height-4));return o

def save_png(im,key,path,**kwargs):
    p=ROOT/path;p.parent.mkdir(parents=True,exist_ok=True);im.save(p,optimize=True)
    manifest[key]={'path':path,**kwargs}

heroes=['wissem','kossay','yakine','taky','garsi','tounsi','youssef','loey']
# Panel boxes exclude names, labels and border lines.
rects=[(32,225,178,395),(197,227,355,395),(370,221,515,395),(538,237,682,396),(697,228,850,396),(866,233,1029,396),(1042,230,1208,396),(1223,233,1388,396)]
for id,rc in zip(heroes,rects):
    sprite=cut(A,rc)
    save_png(sprite,'hero/'+id,'assets/heroes/'+id+'.png',frameWidth=128,frameHeight=160,frames=1)

names=['slime','beetle','bat','crab','sentry','spiker','imp','ninja','wisp','maw','golem','drone']
xs=[21,132,245,350,468,592,712,827,938,1048,1161,1285]
ends=[119,232,339,458,579,700,808,926,1035,1150,1270,1390]
for id,x,end in zip(names,xs,ends):
    save_png(cut(B,(x,224,end,334),(112,112)),'enemy/'+id,'assets/enemies/'+id+'.png',frameWidth=112,frameHeight=112,frames=1)
# A hopping enemy is a distinct, violet variant of the supplied slime sprite.
hop=Image.open(ROOT/'assets/enemies/slime.png').convert('RGBA');ar=np.array(hop);ar[:,:,:3]=ar[:,:,[1,2,0]];hop=Image.fromarray(ar)
save_png(hop,'enemy/hopper','assets/enemies/hopper.png',frames=1,frameWidth=112,frameHeight=112)

powers=['shield','nova','fire','ice','magnet','haste','giant','double','thunder','phase']
for i,id in enumerate(powers):
    x=26+i*138
    save_png(cut(B,(x,463,x+111,532),(64,64)),'power/'+id,'assets/powers/'+id+'.png',frameWidth=64,frameHeight=64,frames=1)
# Single-use and restorative items use distinct original adaptations.
for id,src in [('heart','giant'),('spark','nova'),('rescue','magnet'),('bomb','fire')]:
    im=Image.open(ROOT/f'assets/powers/{src}.png').copy()
    if id=='spark':
        aa=np.array(im); aa[:,:,0]=np.maximum(aa[:,:,0],aa[:,:,2]);aa[:,:,1]=np.maximum(aa[:,:,1],(aa[:,:,0]*.8).astype('uint8'));im=Image.fromarray(aa)
    if id=='rescue':
        aa=np.array(im); aa[:,:,:3]=aa[:,:,[2,0,1]];im=Image.fromarray(aa)
    if id=='bomb':im=cut(A,(345,622,393,670),(64,64))
    save_png(im,'power/'+id,'assets/powers/'+id+'.png',frames=1,frameWidth=64,frameHeight=64)

petrects={'wolf':(26,838,139,922),'eagle':(157,835,266,922),'mole':(295,842,403,922),'fox':(428,836,541,922),'turtle':(564,839,684,922),
'dragon':(725,831,916,966),'orca':(1083,831,1288,916)}
for id,rc in petrects.items():
    save_png(cut(B,rc,(160,128)),'pet/'+id,'assets/pets/'+id+'.png',frameWidth=160,frameHeight=128,frames=1)
# The two rare companions overlap illustrated effects on the concept sheet.
# Explicit silhouette masks exclude labels, ability panels and scenic backdrops.
# Points are documented on a 2x QA crop whose source origin is (737, 837).
rare_masks = {
'dragon': [(15,75),(52,53),(104,47),(155,52),(191,90),(196,42),(176,30),(222,36),(263,72),(269,42),(306,68),(335,55),(348,80),(374,81),(380,97),(399,104),(403,132),(387,149),(363,150),(343,139),(319,132),(301,152),(287,177),(261,211),(267,257),(250,267),(246,229),(227,231),(222,265),(205,271),(199,244),(180,257),(158,259),(152,287),(132,303),(108,293),(113,265),(117,251),(102,237),(58,226),(33,215),(19,224),(13,237),(5,231),(3,195),(15,175),(30,171),(42,174),(44,166),(61,176),(79,195),(99,205),(121,204),(142,174),(161,166),(166,146),(139,151),(133,146),(100,135),(90,140),(76,123),(53,123),(51,110),(39,91)],
'orca': [(856,49),(877,42),(904,46),(933,49),(951,62),(977,57),(995,45),(1035,48),(1060,65),(1079,77),(1085,91),(1081,108),(1065,128),(1044,148),(1010,165),(992,169),(995,190),(989,200),(977,202),(972,176),(958,178),(942,190),(912,195),(901,184),(921,169),(947,153),(912,161),(878,171),(855,176),(849,183),(838,179),(838,175),(820,170),(833,151),(857,124),(882,100),(900,85),(885,70),(856,58)]
}
for ident,points in rare_masks.items():
    xy=[(round(737+x/2),round(837+y/2)) for x,y in points]
    mask=Image.new('L',B.size);ImageDraw.Draw(mask).polygon(xy,fill=255)
    q=B.copy().convert('RGBA');q.putalpha(mask);q=q.crop(q.getbbox())
    q.thumbnail((150,118),Image.Resampling.NEAREST)
    out=Image.new('RGBA',(160,128));out.alpha_composite(q,((160-q.width)//2,124-q.height))
    save_png(out,'pet/'+ident,'assets/pets/'+ident+'.png',frameWidth=160,frameHeight=128,frames=1)

# Coins have actual independently sized rotation frames generated from approved W artwork.
coin=cut(B,(37,702,80,750),(40,48));strip=Image.new('RGBA',(40*8,48))
for i in range(8):
    k=max(.12,abs(np.cos(i*np.pi/8)));f=coin.resize((max(5,int(40*k)),48),Image.Resampling.NEAREST)
    strip.alpha_composite(f,(i*40+(40-f.width)//2,0))
save_png(strip,'coin','assets/powers/coin-spin.png',frameWidth=40,frameHeight=48,frames=8,fps=10)
for key,rc in [('chest',(529,695,594,755)),('shrine',(673,695,741,755))]:
    save_png(cut(B,rc,(80,64)),key,'assets/powers/'+key+'.png',frames=1,frameWidth=80,frameHeight=64)
# Decorative backgrounds, not a screenshot substituted for gameplay.
# A clean background-only panel, never a gameplay screenshot.
cosmic=A.crop((802,819,1337,1033)).resize((1070,428),Image.Resampling.LANCZOS)
save_png(cosmic,'background/cosmic','assets/backgrounds/cosmic.png')
gray=ImageOps.grayscale(cosmic)
sky=ImageOps.colorize(gray,black='#143c65',mid='#638fc2',white='#f3d6b1')
save_png(sky,'background/sky','assets/backgrounds/sky.png')
save_png(A.crop((28,5,300,178)),'logo','assets/ui/logo.png')
# Retained campaign thumbnails from the long-map board. Exclude text, numeric badges and borders.
for i in range(15):
    x=34+i*99
    save_png(C.crop((x+6,635,x+82,676)).resize((228,177),Image.Resampling.NEAREST),'map/'+str(i),'assets/backgrounds/map-'+str(i)+'.png')

# Original Minecraft-inspired, pixel-grid terrain atlas. No Minecraft textures are copied.
rng=np.random.default_rng(19449)
palettes=[('#78cf59','#795239'),('#619b83','#443c53'),('#e2ad6c','#7a5271'),('#e5d995','#7e7552'),('#f49dcd','#945776'),('#eef6ff','#5d7698'),('#d2b66c','#554d4a'),('#8ec877','#465645'),('#f47d44','#452c42'),('#b6b4ff','#493b70'),('#96b2a2','#556861'),('#97aac5','#424f6a'),('#f7b4d9','#6d4a62'),('#52e9d5','#333950'),('#bd9cff','#3f2b68')]
def rgb(s):return tuple(bytes.fromhex(s[1:]))
for wi,(grass,dirt) in enumerate(palettes):
    atlas=Image.new('RGBA',(32*8,32))
    for v in range(8):
        t=Image.new('RGBA',(32,32),dirt);d=ImageDraw.Draw(t)
        if v in (0,1):
            base=np.array(rgb(dirt))
            for yy in range(0,32,4):
                for xx in range(0,32,4):
                    delta=int(rng.integers(-20,23));co=tuple(np.clip(base+delta,0,255));d.rectangle((xx,yy,xx+3,yy+3),fill=co)
                    if rng.random()<.2:d.point((xx+1,yy+1),fill=tuple(np.clip(base+40,0,255)))
            if v==0:
                d.rectangle((0,0,31,5),fill=grass)
                for xx in range(0,32,4):d.rectangle((xx,4,xx+3,6+int(rng.integers(1,6))),fill=grass)
                d.line((0,0,31,0),fill=tuple(np.clip(np.array(rgb(grass))+35,0,255)),width=2)
        elif v==2:
            d.rectangle((0,0,31,31),fill='#745339',outline='#271c27',width=2)
            for yy in [2,12,22]:
                for xx in [-15 if yy==12 else 1,1 if yy==12 else 16,17 if yy==12 else 32]:
                    d.rectangle((xx,yy,xx+14,yy+8),fill='#b68150',outline='#4f3540');d.line((xx+2,yy+1,xx+12,yy+1),fill='#dba775')
        elif v==3:
            d.rectangle((0,0,31,31),fill='#875a23',outline='#261d30',width=2);d.rectangle((3,3,28,28),fill='#edb744');d.line((4,4,27,4),fill='#fff4ad',width=2)
            d.polygon([(16,6),(19,12),(26,14),(21,19),(22,26),(16,23),(9,26),(10,19),(5,14),(12,12)],fill='#fff4af')
        elif v==4:
            d.rectangle((0,0,31,31),fill='#505061',outline='#242334',width=2);d.rectangle((5,5,26,26),outline='#69697b');d.rectangle((13,13,18,18),fill='#383645')
        elif v==5:
            d.rectangle((0,0,31,31),fill='#59616b',outline='#2d3043',width=2)
            for yy in [2,17]:
                for xx in [2,17]:d.rectangle((xx,yy,xx+12,yy+12),fill='#78818b');d.line((xx,yy,xx+12,yy),fill='#9fa5af')
            d.rectangle((12,11,16,16),fill=grass);d.rectangle((14,16,19,23),fill=grass)
        elif v==6:
            d.rectangle((0,0,31,31),fill='#704923',outline='#30262c',width=2)
            for yy in range(5,30,7):d.line((3,yy,28,yy),fill='#50341e')
            d.rectangle((3,3,28,28),outline='#bc8b4c',width=3);d.line((5,5,26,26),fill='#cda467',width=3);d.line((26,5,5,26),fill='#cda467',width=3)
        else:
            d.rectangle((0,0,31,31),fill='#397bab');d.line((0,1,31,1),fill='#a2f5ff',width=2)
            for j in [5,19,27]:d.line((int(rng.integers(0,12)),j,25,j),fill='#69bbdb')
        atlas.alpha_composite(t,(v*32,0))
    save_png(atlas,'tiles/'+str(wi),'assets/tiles/world-'+str(wi)+'.png',frameWidth=32,frameHeight=32,frames=8)

old_manifest=json.loads((ROOT/'assets/manifest.json').read_text()) if (ROOT/'assets/manifest.json').exists() else {}
(ROOT/'assets/manifest.json').write_text(json.dumps({'images':manifest,'audio':old_manifest.get('audio',{})},indent=2)+'\n')
# Human-readable extraction coordinates are kept so the boards are traceable.
(ROOT/'art-source/crops.json').write_text(json.dumps({'heroes':dict(zip(heroes,rects)),'enemy_x':dict(zip(names,zip(xs,ends))),'pets':petrects,'notes':'Background removed by connected foreground + hole fill. Single pose sprites use procedural motion; replaceable with true frame strips.'},indent=2)+'\n')
# Contact sheet for QA. Not used as runtime art.
sheet=Image.new('RGB',(8*150,520),'#1d3345');d=ImageDraw.Draw(sheet)
for i,id in enumerate(heroes):
    im=Image.open(ROOT/f'assets/heroes/{id}.png');sheet.paste(im,(i*150+10,6),im);d.text((i*150+18,170),id,fill='white')
for i,id in enumerate(names):
    im=Image.open(ROOT/f'assets/enemies/{id}.png');sheet.paste(im,((i%8)*150+15,205+(i//8)*150),im);d.text(((i%8)*150+15,320+(i//8)*150),id,fill='white')
sheet.save(ROOT/'docs/art-contact-sheet.png')
print('Extracted',len(manifest),'image assets')
