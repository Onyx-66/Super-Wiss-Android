import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {portraitPolicy,containArtRect,CROUCH_CUTOUT,usesCrouchPose} from '../game/hero-presentation.js';
import {CONTROL_IDS,CONTROL_ART,controlRect,defaultControlPreset,sanitizeControlPresets} from '../game/controls.js';
import {heroArtFrame} from '../game/weapon-art.js';
const manifest=JSON.parse(fs.readFileSync(new URL('../assets/manifest.json',import.meta.url)));
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
for(const id of ['wissem','kossay','yakine','taky','garsi','tounsi','youssef','loey','rayan','mira']){
 test(`${id}: unarmed identity retains its real body reference without mutating equipment`,()=>{
  const loadout={equippedWeapon:null,outfit:'starter'},result=portraitPolicy(id,loadout,manifest.images);
  assert.equal(result.body,'hero/'+id);assert.equal(loadout.equippedWeapon,null);
  assert.equal(result.referenceOnly,id!=='wissem');assert(fs.existsSync(new URL('../'+manifest.images[result.body].path,import.meta.url)));
 });
 test(`${id}: legacy sheet has exactly 14 frames, no invented crouch cell`,()=>{
  const c=manifest.images['hero/'+id];assert.equal(c.frames,14);assert(!/crouch/i.test(c.animation));
  assert.equal(usesCrouchPose({crouching:true}),true);
  assert(heroArtFrame({character:id,crouching:true,grounded:true},0,false)<14);
 });
}
test('portrait contains complete painted bounds with uniform scaling and requested margins',()=>{
 for(const [w,h] of [[192,224],[320,370],[168,190]])for(const [bw,bh] of [[120,160],[250,310],[180,90]]){
  const r=containArtRect({width:bw,height:bh},w,h,12);assert(r.x>=12-.0001&&r.y>=12-.0001);assert(r.x+r.width<=w-12+.0001);assert(r.y+r.height<=h-12+.0001);assert(Math.abs(r.width/r.height-bw/bh)<1e-8);
 }
 assert.equal(containArtRect(null,100,100),null);
});
test('crouch cutout uses four separately bent leg sections, not nonuniform global squashing',()=>{
 assert.equal(CROUCH_CUTOUT.legs.length,4);assert(CROUCH_CUTOUT.legs.some(l=>l.angle<0));assert(CROUCH_CUTOUT.legs.some(l=>l.angle>0));assert(CROUCH_CUTOUT.torso.angle>0);
 const render=read('game/render.js');assert(!render.includes('1-.4*crouch'));assert(render.includes('drawCrouchedHero'));
});
for(const [w,h] of [[640,360],[844,390],[960,440],[1648,928]])for(let i=0;i<4;i++)test(`HUD ${w}x${h}, preset ${i}: min 44 / primary 56 and safe 24`,()=>{
 const preset=defaultControlPreset(i);for(const id of CONTROL_IDS){const rect=controlRect(preset.buttons[id],w,h,id);assert(rect.size>=(['jumpControl','attackControl'].includes(id)?56:44));assert(rect.x-rect.size/2>=24-1e-8);assert(rect.y-rect.size/2>=24-1e-8);assert(rect.x+rect.size/2<=w-24+1e-8);assert(rect.y+rect.size/2<=h-24+1e-8);}
});
test('custom undersized primary controls and screen cutouts cannot remove minimum hit areas',()=>{
 const presets=sanitizeControlPresets([{buttons:{jumpControl:{size:44,x:.98,y:.98}}}]);
 const r=controlRect(presets[0].buttons.jumpControl,844,390,'jumpControl',{right:48,bottom:32});assert(r.size>=56);assert(r.x+r.size/2<=844-48);assert(r.y+r.size/2<=390-32);
});
test('source action captions are empty, not replaced by arbitrary numbers or destroyed data badges',()=>{
 const html=read('game/index.html').split('<div id="gameUI"')[1].split('<div id="controlEditor"')[0];
 assert(!/>\s*(CROUCH|DODGE|SPIRIT|JUMP|PUNCH|STRIKE|KNIFE|PRESET A|RUN|REVIVE|SUMMON|SKILL II?)\s*</.test(html));
 for(const id of ['knifeCount','summonCount','cooldownText','cooldownText2'])assert(html.includes('id="'+id+'"'));
 assert.equal(CONTROL_ART.crouchControl.icon,'crouch-pose');assert(CONTROL_ART.crouchControl.ariaLabel);
});
test('four-corner shell, separate diamond and line have real registered PNGs',()=>{
 for(const key of ['ui/frames/panel-shell','ui/ornaments/diamond','ui/ornaments/rule']){const entry=manifest.images[key];assert(entry);const bytes=fs.readFileSync(new URL('../'+entry.path,import.meta.url));assert.equal(bytes.toString('ascii',1,4),'PNG');assert.equal(bytes.readUInt32BE(16),entry.frameWidth);assert.equal(bytes.readUInt32BE(20),entry.frameHeight);}
 const css=read('game/ui-polish.css');assert(css.includes("'asset:ui/frames/panel-shell') 32"));
});
test('identity and menu fixes retain weapon flags and all original files',()=>{
 assert.equal(manifest.images['hero/kossay'].weaponLayer,'baked');assert.equal(manifest.images['hero/wissem'].weaponLayer,'separate');
 for(const entry of Object.values(manifest.images).filter(e=>e.path.startsWith('assets/weapons/')&&e.path.endsWith('.png')))assert.equal(entry.frameWidth,1254);
});
