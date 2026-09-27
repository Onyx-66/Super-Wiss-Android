"""Original synthesized menu/raid loops and room admission cue; no sampled music."""
import math,struct,wave,json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
folder=root/'assets/audio/ascension';folder.mkdir(parents=True,exist_ok=True)
manifest=json.loads((root/'assets/manifest.json').read_text(encoding='utf-8'))
sr=22050
for name,notes,beat,seconds in [('menu',[48,55,60,64,55,60,67,64],.5,16),('raid',[36,36,43,46,36,48,43,41],.25,12),('room-join',[67,72,76],.13,.45)]:
 frames=bytearray()
 for i in range(int(sr*seconds)):
  t=i/sr;n=int(t/beat);phase=t%beat;freq=440*2**((notes[n%len(notes)]-69)/12)
  envelope=min(1,phase/.015)*math.exp(-phase*(4 if name=='menu' else 9))
  tone=(math.sin(2*math.pi*freq*t)+.25*math.sin(4*math.pi*freq*t))*envelope*.18
  if name=='raid':tone+=math.sin(2*math.pi*(55*phase+15*(1-math.exp(-phase*25))))*math.exp(-phase*30)*.20
  fade=min(1,t/.02,(seconds-t)/.05);frames.extend(struct.pack('<h',int(max(-1,min(1,tone*fade))*32767)))
 file=folder/(name+'.wav')
 with wave.open(str(file),'wb') as f:f.setnchannels(1);f.setsampwidth(2);f.setframerate(sr);f.writeframes(frames)
 key=('sfx/' if name=='room-join' else 'music/')+name
 manifest['audio'][key]={'path':file.relative_to(root).as_posix(),'volume':.45 if name=='room-join' else .30}
(root/'assets/manifest.json').write_text(json.dumps(manifest,indent=2)+'\n',encoding='utf-8')
