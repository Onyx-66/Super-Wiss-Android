import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { COMBAT_PROFILES, combatProfile } from '../game/combat-profiles.js';
import { WEAPON_ART, weaponArtForHero, weaponAttackPhase, heroArtFrame, weaponPose } from '../game/weapon-art.js';
import {createRun,meleeAttack,stepRun} from '../game/engine.js';
const heroes=JSON.parse(fs.readFileSync(new URL('../game/heroes.json',import.meta.url)));
const manifest=JSON.parse(fs.readFileSync(new URL('../assets/manifest.json',import.meta.url)));
for(const h of heroes)test(`${h.name} has explicit combat type and one registered weapon PNG`,()=>{
 const type=COMBAT_PROFILES[h.id]?.weapon;assert(type);
 const spec=weaponArtForHero(h.id);assert(spec);assert.equal(spec,WEAPON_ART[type]);
 const entry=manifest.images[spec.key];assert.equal(entry.path,`assets/weapons/${spec.file}`);
 assert.equal(entry.frameWidth,256);assert.equal(entry.frameHeight,256);assert.equal(entry.frames,1);
 assert.equal(entry.optional,true);
});
test('ten unique requested PNGs, no accidental extra shield asset',()=>{
 assert.equal(new Set(heroes.map(h=>weaponArtForHero(h.id).file)).size,10);
 assert.equal(weaponArtForHero('unknown'),undefined);
});
test('Loey display data matches bow behavior',()=>{
 assert.equal(heroes.find(h=>h.id==='loey').weapon,'Sky bow');
 assert.equal(COMBAT_PROFILES.loey.weapon,'bow');assert.equal(COMBAT_PROFILES.loey.projectile,'arrow');
});
test('PvP behavior remains normalized for all ten heroes',()=>{
 for(const h of heroes)assert.deepEqual(combatProfile({character:h.id,normalizedCombat:true}),combatProfile({character:'wissem',normalizedCombat:true}));
});
test('Rayan retains fallback timing but now has explicit lance art',()=>{
 const p=combatProfile({character:'rayan'});assert.equal(p.weapon,'lance');assert.equal(p.startup,.08);assert.equal(p.active,.18);assert.equal(p.projectile,undefined);
});
test('Mira basic attack actually emits ice after anticipation',()=>{
 const r=createRun(0,'mira');r.level.enemies=[];assert(meleeAttack(r));assert.equal(r.shots.length,0);
 for(let n=0;n<20;n++)stepRun(r,{});
 assert(r.shots.some(s=>s.kind==='ice'));
});
test('attack frames follow elapsed attack, not global wall-clock flicker',()=>{
 const p={character:'tounsi',attackDuration:.26,attackStartup:.06,attackTime:.25,attackChain:1};
 assert.equal(heroArtFrame(p,1),11);assert.equal(heroArtFrame(p,999),11);
 p.attackTime=.05;assert.equal(heroArtFrame(p,1),12);assert.equal(heroArtFrame(p,999),12);
});
test('idle/run/jump/fall/dodge retain the 14-frame contract',()=>{
 assert.equal(heroArtFrame({character:'tounsi'},0),0);
 for(let i=0;i<100;i++){const f=heroArtFrame({character:'tounsi',grounded:true},i/100,true);assert(f>=1&&f<=8);}
 assert.equal(heroArtFrame({character:'loey',grounded:false,vy:-20}),9);
 assert.equal(heroArtFrame({character:'loey',grounded:false,vy:20}),10);
 assert.equal(heroArtFrame({character:'garsi',dodge:.1}),13);
});
test('weapon sockets, angles and size are finite for all heroes and sheet frames',()=>{
 for(const h of heroes)for(let frame=0;frame<14;frame++){
  const pose=weaponPose({character:h.id,grounded:true,attackTime:.05,attackDuration:.26,attackChain:1},frame,1,0);
  for(const k of ['x','y','angle','height','anchorX','anchorY'])assert(Number.isFinite(pose[k]),`${h.id}:${k}`);
 }
});
test('attack motion changes socket/angle; facing is inherited rather than double flipped',()=>{
 const a=weaponPose({character:'tounsi',grounded:true,attackTime:.24,attackDuration:.26,attackChain:1},11);
 const b=weaponPose({character:'tounsi',grounded:true,attackTime:.04,attackDuration:.26,attackChain:1},12);
 assert.notEqual(a.angle,b.angle);assert.notEqual(a.x,b.x);
});
test('body sheets remain marked baked until weapon-free art is provided',()=>{
 for(const h of heroes)assert.equal(manifest.images['hero/'+h.id].weaponLayer,'baked');
});
test('attack phase remains bounded for stale or zero values',()=>{
 assert.equal(weaponAttackPhase({character:'wissem'}).attacking,false);
 const p=weaponAttackPhase({character:'wissem',attackTime:999,attackDuration:.2});assert.equal(p.elapsed,0);
});

// Separate changed combat results without deleting old player history.
import {ascResult,ascSanitize,ASC_RULES_REVISION} from '../game/ascension.js';
test('new solo results use a distinct revision after Mira changes',()=>{
 const result=ascResult(createRun(0,'mira'));assert.equal(ASC_RULES_REVISION,4);assert.equal(result.revision,4);
});
test('old and new solo records survive sanitization without relabelling',()=>{
 const r=ascResult(createRun(0,'mira'));const s=ascSanitize({records:[{...r,revision:3},{...r,revision:4}]});
 assert.deepEqual(s.records.map(x=>x.revision),[3,4]);
});

test('per-body frame sockets permit calibration; invalid overrides use safe defaults',()=>{
 const p={character:'tounsi'};
 const custom=weaponPose(p,0,0,0,false,{0:[7,-28]});assert.equal(custom.x,7);assert.equal(custom.y,-28);
 assert.deepEqual(weaponPose(p,0,0,0,false,{0:[NaN,-2]}),weaponPose(p,0));
});
