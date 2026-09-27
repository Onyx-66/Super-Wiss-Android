#!/usr/bin/env python3
"""Compose the original bundled soundtrack and effects. NOT run by the normal builder.
NumPy + FFmpeg are required. Output .ogg files are independently replaceable in the manifest.
Melody/bass/drum seeds, tempo and chords are editable below; no external recordings are used.
"""
from pathlib import Path
import numpy as np, wave, subprocess, json, tempfile
R=Path(__file__).resolve().parents[1];SR=22050
rng=np.random.default_rng(29626)

def write_ogg(path,y):
    y=np.asarray(y);peak=max(.001,float(np.abs(y).max()));y=np.tanh(y/max(1,peak)*1.3)*.72
    if y.ndim==1:y=np.column_stack((y,y))
    path.parent.mkdir(parents=True,exist_ok=True)
    with tempfile.TemporaryDirectory() as td:
        wav=Path(td)/'source.wav'
        with wave.open(str(wav),'wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((y*32767).astype('<i2').tobytes())
        subprocess.run(['ffmpeg','-v','error','-y','-i',str(wav),'-c:a','libvorbis','-q:a','4',str(path)],check=True)

def tone(f,dur=.25,kind='bell',end=None):
    t=np.arange(int(SR*dur))/SR
    ph=2*np.pi*(f*t if end is None else f*t+(end-f)*t*t/(2*dur))
    if kind=='bell':y=np.sin(ph)+.3*np.sin(ph*2.01)*np.exp(-t*9)+.13*np.sin(ph*3.98)*np.exp(-t*17)
    elif kind=='pluck':y=np.sin(ph)+.23*np.sin(ph*2)+.12*np.sin(ph*3)
    elif kind=='warm':y=np.sin(ph)+.2*np.sin(ph*3)+.12*np.sin(ph*5)
    elif kind=='noise':y=rng.normal(size=len(t))*.45+np.sin(ph)*.45
    else:y=np.sin(ph)
    env=np.minimum(1,t/.008)*np.exp(-t/(dur*.34))*np.minimum(1,np.maximum(0,(dur-t)/.025))
    return y*env

def cue(notes,d=.17,kind='bell',step=.11):
    out=np.zeros(int(SR*(d+step*(len(notes)-1)+.06)))
    for i,f in enumerate(notes):
        q=tone(f,d,kind);at=int(i*step*SR);out[at:at+len(q)]+=q*.42
    return out
sfx={
'click':tone(790,.07,'pluck',540)*.5,
'jump':tone(230,.23,'pluck',680),
'coin':cue([1174,1760],.16,step=.07),
'stomp':tone(170,.17,'noise',48),
'armor':tone(650,.14,'bell',180),
'break':tone(120,.26,'noise',30),
'block':tone(280,.11,'warm',185),
'hurt':tone(230,.38,'warm',65),
'knockout':cue([440,349,261,196],.21,'warm',.13),
'shield':cue([588,880,1176],.25,'bell',.045),
'gravity':tone(210,.7,'bell',980)+tone(104,.7,'warm',440)*.3,
'bomba':tone(74,.65,'noise',25),
'pet-bite':tone(180,.19,'noise',70),
'fire-shot':tone(580,.18,'noise',150),
'lightning':tone(70,.45,'noise',900),
'power':cue([392,587,784,1174],.28,'bell',.08),
'checkpoint':cue([440,554,659,880],.33,'bell',.12),
'finish':cue([392,494,587,784,659,988,1174],.42,'bell',.16),
'world':cue([330,440,554,660],.32,'warm',.12),
'pet-found':cue([523,784,1047,1318,1568],.42,'bell',.14),
'skill':cue([330,495,660],.25,'warm',.065),
'breath':cue([147,220,294,440],.48,'warm',.12),
'flood':tone(120,1.3,'noise',420)*.7,
'prince':cue([392,523,784,1047],.4,'bell',.17),
'chest':cue([330,523,659],.35,'bell',.13),
'rescue':cue([261,392,523,784,1047],.28,'bell',.08),
'spring':tone(190,.32,'pluck',880),
}
man=json.loads((R/'assets/manifest.json').read_text())
for name,y in sfx.items():
    path='assets/audio/sfx/'+name+'.ogg';write_ogg(R/path,y)
    man['audio']['sfx/'+name]={'path':path,'volume':.7 if name=='coin' else .9}
tracks=[('frontier',112,60,[0,5,9,7],0),('moonlight',92,57,[0,8,5,7],1),('skyward',124,62,[0,7,9,5],2),('clockwork',120,55,[0,3,8,7],3),('starlight',100,60,[0,8,3,7],4)]
for name,bpm,key,chords,variant in tracks:
    beat=60/bpm;bars=16;seconds=bars*4*beat;n=int(seconds*SR);out=np.zeros((n,2));scale=[0,2,4,7,9] if variant in [0,2] else [0,2,3,7,10]
    def put(y,at,gain=.18,pan=0):
        # Circular accumulation produces a seamless loop including natural note tails.
        start=int(at*SR);indices=(start+np.arange(len(y)))%n
        out[indices,0]+=y*gain*(1-pan*.45);out[indices,1]+=y*gain*(1+pan*.45)
    def freq(m):return 440*2**((m-69)/12)
    melody=[0,2,3,4,2,1,0,3,2,4,3,1,2,0,1,3]
    for bar in range(bars):
        root=key+chords[(bar//2)%4]
        # Warm plucked chord bed, arpeggio and bass.
        for k in range(8):
            at=(bar*4+k*.5)*beat
            chord=[0,3 if variant in [1,3,4] else 4,7,12][k%4]
            put(tone(freq(root+chord),beat*.7,'pluck'),at,.075,(-1)**k*.5)
            if k%2==0:put(tone(freq(root-24),beat*.9,'warm'),at,.16)
            note=key+12+scale[melody[(bar*3+k+variant)%16]%5]+(12 if bar>=8 and k==6 else 0)
            if k%3!=2:put(tone(freq(note),beat*.6,'bell'),at,.12,(k%3-1)*.2)
            # Soft kick and brush hats, kept below the melody.
            if k%4==0:put(tone(96,beat*.36,'sine',38),at,.19)
            if k%4==2:put(tone(165,beat*.16,'noise'),at,.07)
            put(tone(6200,.04,'noise'),at,.025,(-1)**k*.6)
        if bar%4==3:
            for j in range(3):put(tone(freq(key+24+[0,7,12][j]),beat*.75,'bell'),(bar*4+2+j*.5)*beat,.10,j*.4-.4)
    # A quiet stereo delay, also circular to retain a true loop boundary.
    out+=np.roll(out,int(beat*.75*SR),axis=0)[:,::-1]*.18
    path='assets/audio/music/'+name+'.ogg';write_ogg(R/path,out)
    man['audio']['music/'+name]={'path':path,'volume':.34,'bpm':bpm,'bars':bars,'loop':True,'durationSeconds':seconds}
(R/'assets/manifest.json').write_text(json.dumps(man,indent=2)+'\n')
print(f'Created {len(sfx)} original SFX and {len(tracks)} stereo music loops.')
