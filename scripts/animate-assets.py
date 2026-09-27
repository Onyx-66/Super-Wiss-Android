"""Reproducible cutout rigs: clean alpha, split visible limbs/wings, render frames.
No color-key deletion of every black pixel; only flat, border-connected backdrop
colors and disconnected extraction debris are removed. Original art is retained.
Run once after replacing still images; inspect docs/animation-contact-sheet.png.
"""
from pathlib import Path
import json, math
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage
ROOT=Path(__file__).resolve().parents[1]; M=ROOT/'assets/manifest.json'
m=json.loads(M.read_text()); (ROOT/'assets/animated').mkdir(exist_ok=True)
report=[]; previews=[]
def clean(im):
 a=np.array(im.convert('RGBA')); rgb=a[:,:,:3].astype(int); alpha=a[:,:,3]
 # Tiny disconnected component artifacts in the approved-board crops are not limbs.
 labels,n=ndimage.label(alpha>30)
 sizes=np.bincount(labels.ravel());sizes[0]=0
 if sizes.max(initial=0)>0:
  big=sizes.argmax();keep=(labels==big)|(sizes[labels]>sizes[big]*.025)
  alpha[~keep]=0
 # Only remove near-uniform background colors that actually meet an image border.
 border=np.concatenate([a[0],a[-1],a[:,0],a[:,-1]])
 b=border[border[:,3]>240,:3]
 if len(b)>10:
  vals,cnt=np.unique((b//4)*4,axis=0,return_counts=True)
  for col in vals[cnt>=6]:
   if max(col)>65:continue
   near=np.max(np.abs(rgb-col),axis=2)<9
   seed=np.zeros_like(near);seed[0]=near[0];seed[-1]=near[-1];seed[:,0]=near[:,0];seed[:,-1]=near[:,-1]
   flood=ndimage.binary_propagation(seed,mask=near)
   alpha[flood]=0
 a[:,:,3]=alpha
 return Image.fromarray(a)
def part(im,rect):
 out=Image.new('RGBA',im.size);out.paste(im.crop(rect),rect[:2]);return out

def rotate_at(im,angle,pivot,dx=0,dy=0):
 # Bicubic cutout rotation; pixel-aligned final image. Padding prevents clipped feet.
 out=im.rotate(angle,resample=Image.Resampling.BICUBIC,center=pivot)
 if dx or dy:
  shifted=Image.new('RGBA',im.size);shifted.alpha_composite(out,(int(dx),int(dy)));return shifted
 return out

def rig(im,kind,key):
 w,h=im.size;frames=[]
 if kind=='hero':
  # Cut the actual sprite into pelvis/torso, two arms and two leg chains.
  hip=int(h*.68); mid=int(w*.53); armY=int(h*.40);armEnd=int(h*.66)
  top=part(im,(0,0,w,hip)); legs=[part(im,(0,hip,mid,h)),part(im,(mid,hip,w,h))]
  for n in range(14):
   t=(n-1)/8*math.tau if 1<=n<=8 else 0;moving=1<=n<=8
   a=math.sin(t)*22 if moving else (-17 if n==9 else 12 if n==10 else 0)
   f=Image.new('RGBA',im.size)
   f.alpha_composite(rotate_at(legs[1],-a,(int(w*.65),hip),0,-max(0,-math.sin(t))*5 if moving else 0))
   f.alpha_composite(rotate_at(legs[0],a,(int(w*.38),hip),0,-max(0,math.sin(t))*5 if moving else 0))
   # Arms swing independently around shoulder. Torso excludes the arm regions.
   left=part(top,(0,armY,int(w*.26),armEnd));right=part(top,(int(w*.77),armY,w,armEnd))
   body=top.copy();dd=ImageDraw.Draw(body);dd.rectangle((0,armY,int(w*.26)-1,armEnd-1),fill=(0,0,0,0));dd.rectangle((int(w*.77),armY,w,armEnd-1),fill=(0,0,0,0))
   angle=(math.sin(t)*16 if moving else -32 if n in (11,12) else 0)
   f.alpha_composite(rotate_at(left,angle,(int(w*.27),armY)))
   f.alpha_composite(rotate_at(body,-4 if n==13 else 0,(w//2,hip),0,-abs(math.sin(t))*2 if moving else 0))
   f.alpha_composite(rotate_at(right,-angle,(int(w*.76),armY)))
   if n==12: f=rotate_at(f,-8,(w//2,hip))
   frames.append(f)
 elif key in ['bat','eagle','dragon','drone']:
  mid0=int(w*.35);mid1=int(w*.67)
  l=part(im,(0,0,mid0,h));r=part(im,(mid1,0,w,h));body=part(im,(mid0,0,mid1,h))
  for n in range(8):
   a=math.sin(n/8*math.tau)*27;f=Image.new('RGBA',im.size)
   f.alpha_composite(rotate_at(l,a,(mid0,int(h*.47))));f.alpha_composite(rotate_at(r,-a,(mid1,int(h*.47))));f.alpha_composite(body);frames.append(f)
 elif key in ['wolf','fox','mole','turtle','beetle','crab','spiker','hopper']:
  split=int(h*.70);body=part(im,(0,0,w,split));legs=[part(im,(i*w//4,split,(i+1)*w//4,h))for i in range(4)]
  for n in range(8):
   f=Image.new('RGBA',im.size)
   for i,leg in enumerate(legs):f.alpha_composite(rotate_at(leg,math.sin(n/8*math.tau+i*math.pi/2)*20,(int((i+.5)*w/4),split),0,-max(0,math.sin(n/8*math.tau+i))*4))
   f.alpha_composite(body);frames.append(f)
 elif key in ['orca','wisp','slime']:
  # Orca's tail deforms independently, slime uses volume-preserving squash.
  for n in range(8):
   t=n/8*math.tau
   if key=='orca':
    tail=part(im,(0,0,int(w*.38),h));body=part(im,(int(w*.38),0,w,h));f=Image.new('RGBA',im.size);f.alpha_composite(rotate_at(tail,math.sin(t)*16,(int(w*.4),int(h*.55))));f.alpha_composite(body)
   else:
    nw=max(1,int(w*(.94+.055*math.sin(t))));nh=max(1,int(h*(.93-.055*math.sin(t))));f=Image.new('RGBA',im.size);f.alpha_composite(im.resize((nw,nh),Image.Resampling.NEAREST),((w-nw)//2,h-nh))
   frames.append(f)
 else:
  # Humanoid foes have the same separated lower-limb mechanism.
  split=int(h*.70);top=part(im,(0,0,w,split));legs=[part(im,(0,split,w//2,h)),part(im,(w//2,split,w,h))]
  for n in range(8):
   f=Image.new('RGBA',im.size);a=math.sin(n/8*math.tau)*17
   f.alpha_composite(rotate_at(legs[0],a,(int(w*.35),split)));f.alpha_composite(rotate_at(legs[1],-a,(int(w*.65),split)));f.alpha_composite(rotate_at(top,math.sin(n/8*math.tau)*2,(w//2,split)));frames.append(f)
 return frames
for key,meta in list(m['images'].items()):
 if not key.startswith(('hero/','enemy/','pet/')) or key.endswith('/still'):continue
 kind,name=key.split('/');original=ROOT/('assets/'+{'hero':'heroes','enemy':'enemies','pet':'pets'}[kind]+'/'+name+'.png')
 if not original.exists():continue
 im=clean(Image.open(original));im.save(original,optimize=True)
 frames=rig(im,kind,name);fw,fh=im.size;sheet=Image.new('RGBA',(fw*len(frames),fh))
 for n,f in enumerate(frames):sheet.alpha_composite(f,(n*fw,0))
 dest=f'assets/animated/{kind}-{name}.png';sheet.save(ROOT/dest,optimize=True)
 m['images'][key]={'path':dest,'frameWidth':fw,'frameHeight':fh,'frames':len(frames),'animation':'idle:0, run:1-8, jump:9, fall:10, attack:11-12, dodge:13' if kind=='hero' else 'loop:0-7'}
 m['images'][key+'/still']={'path':str(original.relative_to(ROOT)),'frameWidth':fw,'frameHeight':fh,'frames':1}
 aa=np.array(sheet)[:,:,3];report.append({'key':key,'frames':len(frames),'transparentPixels':int((aa==0).sum()),'totalPixels':aa.size,'uniqueFrames':len({f.tobytes()for f in frames})})
 previews.append((key,frames))
# Extend the supplied aesthetic into larger armored boss variations, not new copyrighted art.
bosses=json.loads((ROOT/'game/bosses.json').read_text());(ROOT/'assets/bosses').mkdir(exist_ok=True)
for i,b in enumerate(bosses):
 src=Image.open(ROOT/f'assets/enemies/{b["sprite"]}.png').convert('RGBA');frames=[]
 for n in range(8):
  f=Image.new('RGBA',(192,224));actor=rig(src,'enemy',b['sprite'])[n].resize((168,168),Image.Resampling.NEAREST);f.alpha_composite(actor,(12,46));d=ImageDraw.Draw(f)
  col=b['color'];d.polygon([(65,49),(56,15),(83,31),(96,5),(109,31),(139,15),(127,49)],fill=col,outline='#fff3dc',width=3)
  d.polygon([(72,51),(120,51),(114,61),(79,61)],fill='#b6a16a',outline='#ffdf9e')
  for x in [56,139]:d.ellipse((x-5,10,x+5,20),fill='#fff3d4')
  frames.append(f)
 sheet=Image.new('RGBA',(192*8,224))
 for n,f in enumerate(frames):sheet.alpha_composite(f,(192*n,0))
 dest=f'assets/bosses/{b["id"]}.png';sheet.save(ROOT/dest,optimize=True)
 m['images']['boss/'+b['id']]={'path':dest,'frameWidth':192,'frameHeight':224,'frames':8}
 # Separate still asset avoids stretching an entire sheet in menus.
 dest2=f'assets/bosses/{b["id"]}-still.png';frames[0].save(ROOT/dest2,optimize=True);m['images']['boss/'+b['id']+'/still']={'path':dest2,'frames':1,'frameWidth':192,'frameHeight':224}
M.write_text(json.dumps(m,indent=2)+'\n');(ROOT/'docs/animation-alpha-report.json').write_text(json.dumps(report,indent=2)+'\n')
# Actual contact sheet on contrasting squares for alpha inspection.
out=Image.new('RGB',(1100,len(previews)*94),(22,31,49));d=ImageDraw.Draw(out)
for row,(key,fs)in enumerate(previews):
 d.text((8,row*94+4),key,fill='white')
 for k,idx in enumerate([0,1,3,5,7]):
  x=190+k*175;y=row*94+4
  for a in range(0,150,15):
   for b in range(0,80,15):d.rectangle((x+a,y+b,x+a+14,y+b+14),fill=(88,102,130) if (a//15+b//15)%2 else (142,156,171))
  im=fs[idx%len(fs)].copy();im.thumbnail((100,80));out.paste(im,(x+24,y),im)
out.save(ROOT/'docs/animation-contact-sheet.png')
print('Animated',len(report),'actors, added',len(bosses),'boss variants. Different frames:',sum(r['uniqueFrames']for r in report))
