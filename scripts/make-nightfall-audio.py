"""Original synthesized percussion, atmosphere and combat Foley. No sampled game audio."""
from pathlib import Path
import wave, json, subprocess, tempfile
import numpy as np
R=Path(__file__).resolve().parents[1];sr=22050;rng=np.random.default_rng(410)
def save(key,y,vol=.65):
 y=np.clip(y,-.94,.94);p=R/'assets/audio'/('music' if key.startswith('music/') else 'sfx')/(key.split('/')[1]+'.ogg');p.parent.mkdir(parents=True,exist_ok=True)
 with tempfile.NamedTemporaryFile(suffix='.wav')as f:
  with wave.open(f.name,'wb')as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes((y*32767).astype('<i2').tobytes())
  subprocess.run(['ffmpeg','-loglevel','error','-y','-i',f.name,'-c:a','libvorbis','-q:a','3',str(p)],check=True)
 manifest['audio'][key]={'path':str(p.relative_to(R)),'volume':vol}
def tone(f,t):return np.sin(2*np.pi*f*t)
manifest=json.loads((R/'assets/manifest.json').read_text())
names=['slash','knife','dodge','boss-intro','boss-warn','boss-strike','boss-phase','boss-hit','boss-defeat','sigil','seal-open','seal-wave','summon','pogo']
for k,name in enumerate(names):
 duration=2.4 if name in ['boss-intro','boss-defeat','summon','seal-open'] else .65 if name in ['boss-phase','seal-wave'] else .24
 t=np.arange(int(sr*duration))/sr;env=np.minimum(1,t/.009)*np.exp(-t/(duration*.29));noise=rng.normal(0,.2,len(t))
 if name in ['slash','knife','dodge']:y=(np.convolve(noise,np.ones(4)/4,mode='same')*.9+tone(850-600*t/duration,t)*.1)*env
 elif name in ['boss-hit','boss-strike','seal-wave']:y=(tone(90-45*t/duration,t)*.55+noise*.8+tone(155,t)*.1)*env
 elif name=='boss-warn':y=(tone(660,t)+tone(830,t)*.25)*env*.28
 elif name in ['sigil','pogo']:y=sum(tone(f,t)*(.3/(i+1)) for i,f in enumerate([660,990,1320]))*env
 else:y=sum(tone(f*(1+k*.009),t)*(.16/(i+1)) for i,f in enumerate([110,164.81,220,261.63,329.63,440]))*env+noise*.25*env
 save('sfx/'+name,y)
# 16-bar 8th-note minor-mode ostinato, spectral pads, kick/toms: seamless 32-second loop.
duration=32;t=np.arange(sr*duration)/sr;y=np.zeros_like(t)
for start in np.arange(0,duration,.25):
 beat=int(round(start/.25));length=.23 if beat%4 else .43;tt=np.arange(int(sr*length))/sr;freq=[146.83,220,174.61,196,130.81,196,164.81,220][beat%8];note=(tone(freq,tt)+.2*tone(freq*2,tt))*np.exp(-tt*13)*.095
 i=int(start*sr);y[i:i+len(note)]+=note[:len(y)-i]
for start in np.arange(0,duration,.5):
 tt=np.arange(int(sr*.3))/sr;kick=(np.sin(2*np.pi*(58*tt+18*(1-np.exp(-tt*22))))*.42+rng.normal(0,.09,len(tt)))*np.exp(-tt*22);i=int(start*sr);y[i:i+len(kick)]+=kick[:len(y)-i]
# Integer-cycle pad oscillators avoid a loop-boundary discontinuity.
for f in [73.40625,110,146.8125,174.625]:y+=tone(f,t)*.035*(.6+.4*np.sin(2*np.pi*t/32)**2)
y=np.tanh(y*.8);save('music/boss',y,.55)
(R/'assets/manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('Created 14 combat cues and one original boss loop.')
