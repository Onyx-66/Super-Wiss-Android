from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter
import hashlib,json,math,shutil
r=Path(__file__).resolve().parents[1];target=r/'assets/branding';target.mkdir(exist_ok=True)
source=r/'docs/branding/logo-supplied.png'
im=Image.open(source).convert('RGBA'); rgb=im.convert('RGB')
# Remove only the border-connected dark exterior, not interior holes or the navy emblem.
m=Image.new('L',im.size);m.putdata([255 if px[0]<24 and px[1]<26 and px[2]<48 else 0 for px in rgb.getdata()])
ImageDraw.floodfill(m,(0,0),128,thresh=0)
alpha=m.point(lambda x:0 if x==128 else 255)
# Do not crop/reinterpret the wordmark. Preserve its full framing and proportions.
logo=im.copy();logo.putalpha(alpha);logo.resize((640,640),Image.Resampling.LANCZOS).save(target/'logo.png',optimize=True)
res=r/'app/src/main/res';(res/'drawable-nodpi').mkdir(exist_ok=True)
logo.resize((384,384),Image.Resampling.LANCZOS).save(res/'drawable-nodpi/brand_logo.png',optimize=True)
# Extract only the supplied W (no new typography or copied weapon art).
bbox=(88,540,486,824);crop=im.crop(bbox);mask=Image.new('L',crop.size)
mask.putdata([255 if px[0]>50 and px[0]>px[2]*1.035 and px[1]>px[2]*1.02 else 0 for px in crop.getdata()])
poly=Image.new('L',crop.size);d=ImageDraw.Draw(poly)
points=[(99,559),(257,542),(258,576),(239,604),(268,674),(344,539),(487,550),(486,579),(450,600),(409,752),(330,771),(301,705),(232,810),(181,824),(129,618),(97,591)]
d.polygon([(x-bbox[0],y-bbox[1]) for x,y in points],fill=255)
from PIL import ImageChops
gold=ImageChops.multiply(mask,poly)
edge=gold.filter(ImageFilter.MaxFilter(13));crop.putalpha(edge);crop=crop.crop(edge.getbbox())
# All visible points lie inside the central 66dp safe circle of the 108dp layer.
w,h=crop.size;scale=252/math.hypot(w,h);mark=crop.resize((round(w*scale),round(h*scale)),Image.Resampling.LANCZOS)
fg=Image.new('RGBA',(432,432));fg.alpha_composite(mark,((432-mark.width)//2,(432-mark.height)//2));fg.save(res/'drawable-nodpi/ic_wiss.png',optimize=True)
mono=Image.new('RGBA',fg.size,'white');mono.putalpha(fg.getchannel('A'));mono.save(res/'drawable-nodpi/ic_wiss_mono.png',optimize=True)
# Preview contact sheet at launcher-like sizes; not a Play Store readiness claim.
preview=Image.new('RGB',(560,210),'#0c1528');d=ImageDraw.Draw(preview)
for i,size in enumerate((48,72,96,144)):
 box=Image.new('RGBA',(size,size),'#101827');f=fg.crop((72,72,360,360)).resize((size,size),Image.Resampling.LANCZOS);box.alpha_composite(f);preview.paste(box,(12+i*135,30),box);d.text((12+i*135,180),f'{size}px',fill='white')
preview.save(r/'docs/branding/launcher-preview.png')
