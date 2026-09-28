import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {HEROES,DT} from '../game/data.js';
import {COMBAT_PROFILES,combatProfile,isUnarmed,unarmedProfile,unarmedPhase} from '../game/combat-profiles.js';
import {heroStats} from '../game/hero-stats.js';
import {WEAPON_RULES,WEAPON_FREE_HEROES,signatureWeapon,weaponEligibility,equipmentStatus,cleanWeapons,equipWeapon} from '../game/equipment.js';
import {WARDROBE_SLOTS,WARDROBE_CATALOG,WARDROBE_DRAW_ORDER,emptyWardrobe,wardrobeItemReady,equipWardrobe,purchaseWardrobe,sanitizeWardrobe,wardrobeLayers} from '../game/wardrobe.js';
import {weaponArtForActor,weaponPose} from '../game/weapon-art.js';
import {createRun,stepRun,meleeAttack,meleeBox,dodgeStep,throwKnife,makeEnemy,damagePlayer} from '../game/engine.js';
import {defaultSave,sanitizeSave,SAVE_KEY} from '../game/progress.js';
import {ascApplyRun,ascResult,ascSanitize,ASC_RULES_REVISION} from '../game/ascension.js';
import {CONTROL_ART,CONTROL_IDS,controlRect,defaultControlPreset} from '../game/controls.js';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url));
const manifest=JSON.parse(read('assets/manifest.json'));
const crops=JSON.parse(read('art-source/ui/crops.json'));
const tick=(r,n,input={})=>{for(let i=0;i<n;i++)stepRun(r,input,DT);};
const bare=id=>{const r=createRun(0,id);r.level.enemies=[];r.player.equippedWeapon=null;r.player.grounded=true;return r;};
const expectedIds=['wissem','kossay','yakine','taky','garsi','tounsi','youssef','loey','rayan','mira'];
test('hero IDs/save key are unchanged; display names are unique; Wissem is retained',()=>{
 assert.deepEqual(HEROES.map(h=>h.id),expectedIds);assert.equal(HEROES[0].name,'Wissem');assert.equal(new Set(HEROES.map(h=>h.name)).size,10);assert.equal(SAVE_KEY,'super-wiss:odyssey-v4');
 assert.deepEqual(HEROES.map(h=>h.name),['Wissem','Kael','Astra','Nyx','Bront','Zephyr','Volt','Skye','Sol','Rime']);
});
for(const h of HEROES){
 test(`${h.id}: every displayed rating is derived from the actual legacy profile`,()=>{
  const p=COMBAT_PROFILES[h.id],s=heroStats(h.id),cycle=p.startup+p.active+p.recovery;
  assert.equal(s.power,Math.round(100*((h.combatStyle.damage||2)/2)*.46/cycle));
  assert.equal(s.speed,Math.round(100*(p.speed*.5+p.accel*.3+p.air*.2)));
  assert.equal(s.stamina,Math.round(100*cycle/.46));assert.equal(s.staminaPerSecond,8/cycle);
  assert.equal(s.magic,['arcane','ice'].includes(p.projectile)?Math.round(100*((p.projectile==='arcane'?3:2)/2)*.46/cycle):0);
  assert.deepEqual(s.provenance,{startup:p.startup,active:p.active,recovery:p.recovery,speed:p.speed,accel:p.accel,air:p.air,projectile:p.projectile||null});
 });
 test(`${h.id}: signature passes actual thresholds, with no exemption`,()=>{
  const s=heroStats(h.id),type=signatureWeapon(h.id);assert(weaponEligibility(h.id,type).ok);assert(equipmentStatus(h.id,type).ok);
  for(const [stat,min] of Object.entries(WEAPON_RULES[type].min))assert(s[stat]>=min);
 });
 test(`${h.id}: unarmed phases are bounded and never emit a ranged or knife attack`,()=>{
  const r=bare(h.id),p=r.player,profile=unarmedProfile(h.id);
  assert(profile.startupFrames>=3&&profile.startupFrames<=6);assert(profile.activeFrames>=3&&profile.activeFrames<=5);
  assert(profile.recovery>=COMBAT_PROFILES[h.id].dodge);assert.equal(profile.projectile,undefined);
  assert(meleeAttack(r));assert.equal(p.stamina,92);assert.equal(unarmedPhase(p),'startup');assert(!r.events.some(e=>e.type==='punch'||e.type==='slash'));
  assert(!dodgeStep(r));assert(!meleeAttack(r));assert(!throwKnife(r));
  tick(r,profile.startupFrames-1);assert.equal(unarmedPhase(p),'startup');
  tick(r,1);assert.equal(unarmedPhase(p),'active');assert(r.events.some(e=>e.type==='punch'));
  tick(r,profile.activeFrames);assert.equal(unarmedPhase(p),'recovery');assert(!meleeAttack(r));
  tick(r,profile.recoveryFrames);assert.equal(unarmedPhase(p),'idle');assert.equal(r.shots.length,0);
 });
 test(`${h.id}: old hero-ID inventory and mastery survive renamed saves`,()=>{
  const s=defaultSave();s.hero=h.id;s.mastery[h.id]=31;s.profile.avatar=h.id;s.ascension.ownedOutfits=[h.id+':ember'];s.ascension.outfits[h.id]='ember';
  const clean=sanitizeSave(JSON.parse(JSON.stringify(s)));assert.equal(clean.hero,h.id);assert.equal(clean.profile.avatar,h.id);assert.equal(clean.mastery[h.id],31);assert.equal(clean.ascension.outfits[h.id],'ember');
 });
}
test('zero-magic physical heroes cannot equip either staff; caster signatures stay legal',()=>{
 for(const h of HEROES)for(const type of ['staff','frost_staff'])assert.equal(weaponEligibility(h.id,type).ok,heroStats(h.id).magic>=50);
});
test('eligibility truth table uses only all requested minima; unknown values fail closed',()=>{
 for(const h of HEROES)for(const [type,rule] of Object.entries(WEAPON_RULES))assert.equal(weaponEligibility(h.id,type).ok,Object.entries(rule.min).every(([k,v])=>heroStats(h.id)[k]>=v));
 assert(!weaponEligibility('unknown',null).ok);assert(!weaponEligibility('wissem','made-up').ok);assert.equal(heroStats('unknown'),null);
});
test('an art gate is not a hidden stats exception',()=>{
 assert(weaponEligibility('kossay','dagger').ok);assert(!equipmentStatus('kossay','dagger').ok);assert(!equipmentStatus('kossay','dagger').artReady);
 assert(equipmentStatus('wissem','sabre').ok);assert.deepEqual(WEAPON_FREE_HEROES,['wissem']);
});
test('missing weapon preserves default but explicit null survives save/load',()=>{
 const raw=cleanWeapons({wissem:null,kossay:'staff',yakine:undefined});assert.equal(raw.wissem,null);assert.equal(raw.kossay,'dual');assert.equal(raw.yakine,'staff');
 const s=defaultSave();assert(equipWeapon(s,'yakine',null));assert.equal(sanitizeSave(s).ascension.weapons.yakine,null);
 assert(!equipWeapon(s,'yakine','bow'));assert.equal(s.ascension.weapons.yakine,null);
});
test('unarmed and alternative weapons enter Open records; revision history is kept',()=>{
 const s=defaultSave(),r=createRun(0,'wissem');ascApplyRun(s,r);assert.equal(r.loadoutCategory,'standard');
 equipWeapon(s,'wissem',null);ascApplyRun(s,r);assert.equal(r.loadoutCategory,'open');const result=ascResult(r);assert.equal(result.weapon,null);assert.equal(ASC_RULES_REVISION,5);
 assert.deepEqual(ascSanitize({records:[2,3,4,5].map(revision=>({...result,revision}))}).records.map(r=>r.revision),[2,3,4,5]);
});
test('one-damage fist hits only in active, once per target, and freezes three frames',()=>{
 const r=bare('wissem'),p=r.player,e=makeEnemy('golem',p.x+p.w+5,911);e.vx=0;e.hp=e.maxHp=50;e.y=p.y;r.level.enemies=[e];
 const hurt={w:p.w,h:p.h};assert(meleeAttack(r));tick(r,2);assert.equal(e.hp,50);tick(r,1);assert.equal(e.hp,49);assert.equal(r.impactPause,3/60);
 const phaseTick=p.unarmedAttack.tick;tick(r,3);assert.equal(p.unarmedAttack.tick,phaseTick);assert(r.impactPause<1e-8);
 tick(r,30);assert.equal(e.hp,49);assert.deepEqual({w:p.w,h:p.h},hurt);
});
test('fist hurtbox is not expanded with the attack; directional fist reach stays compact',()=>{
 const r=bare('wissem'),p=r.player;assert.equal(meleeBox(p).w,26);assert.equal(meleeBox(p).h,20);
 p.attackAim=-1;assert.equal(meleeBox(p).h,26);p.grounded=false;p.attackAim=1;assert.equal(meleeBox(p).h,26);assert.equal(p.w,28);assert.equal(p.h,44);
});
test('a dodge cancels recovery only; no free attack during dodge',()=>{
 const r=bare('taky');meleeAttack(r);assert(!dodgeStep(r));tick(r,unarmedProfile('taky').startupFrames);assert(!dodgeStep(r));tick(r,unarmedProfile('taky').activeFrames);
 assert.equal(unarmedPhase(r.player),'recovery');assert(dodgeStep(r));assert.equal(unarmedPhase(r.player),'idle');assert(!meleeAttack(r));
});
test('half-rate substeps agree with the fixed 60 Hz unarmed clock',()=>{
 const a=bare('mira'),b=bare('mira');meleeAttack(a);meleeAttack(b);
 for(let n=0;n<10;n++){stepRun(a,{},1/60);stepRun(b,{},1/120);stepRun(b,{},1/120);assert.equal(a.player.unarmedAttack.tick,b.player.unarmedAttack.tick);assert.equal(unarmedPhase(a.player),unarmedPhase(b.player));}
});
test('unarmed damage interruption clears stale attacks and knockout cannot carry a fist hit',()=>{
 const r=bare('wissem');meleeAttack(r);r.player.invincible=0;damagePlayer(r,false,100);assert.equal(r.player.unarmedAttack,null);assert.equal(r.player.attackTime,0);assert.equal(r.player.attackCD,0);assert.equal(r.bufferedCombat,null);
});
test('normalized combat ignores cosmetic weapon selection and never gains fists advantage',()=>{
 for(const h of HEROES){const p={character:h.id,normalizedCombat:true,equippedWeapon:null};assert(!isUnarmed(p));assert.equal(combatProfile(p).weapon,'sabre');assert(weaponArtForActor(p));}
});
test('all Wissem frame sockets remain at the supplied hand, even during attack translation',()=>{
 const sockets=manifest.images['hero/wissem'].weaponSockets;
 for(let frame=0;frame<14;frame++)for(const offhand of [false,true]){
  const p={character:'wissem',equippedWeapon:'gauntlet',grounded:true,attackTime:.05,attackDuration:.2};const pose=weaponPose(p,frame,1,0,offhand,sockets);const expected=offhand?sockets.offhand[frame]:sockets[frame];assert.equal(pose.x,expected[0]);assert.equal(pose.y,expected[1]);
 }
 assert.equal(weaponArtForActor({character:'wissem',equippedWeapon:null}),null);
});
test('all body and legacy outfit flags reflect the same visual audit',()=>{
 for(const h of HEROES)for(const key of ['hero/'+h.id,'hero/'+h.id+'/still','outfit/'+h.id+'/frost','outfit/'+h.id+'/ember'])assert.equal(manifest.images[key].weaponLayer,h.id==='wissem'?'separate':'baked');
});
test('all 84 cropped PNGs match their provenance checksums and rectangle dimensions',()=>{
 assert.equal(crops.length,84);const names=new Set();for(const c of crops){const png=read(c.path);assert.equal(png.readUInt32BE(16),c.crop[2]-c.crop[0]);assert.equal(png.readUInt32BE(20),c.crop[3]-c.crop[1]);assert.equal(crypto.createHash('sha256').update(png).digest('hex'),c.sha256);assert.equal(manifest.images[c.key].path,c.path);assert(!names.has(c.key));names.add(c.key);}
});
test('crouch silhouette is wired to the unchanged continuous control ID',()=>{
 assert(CONTROL_IDS.includes('crouchControl'));assert.equal(CONTROL_ART.crouchControl.icon,'crouch-pose');assert.match(CONTROL_ART.crouchControl.source,/bent knees/);assert.equal(manifest.images['ui/icons/crouch'].path,'assets/ui/icons/crouch.png');
 assert(read('game/index.html').toString().includes('id="crouchControl" data-control="crouch"'));
});
// Synthetic READY fixtures exercise the actual future renderer, not imaginary shipped inventory.
const fixture=()=>{
 const m={images:{'hero/wissem':{frameWidth:128,frameHeight:160,frames:14,weaponLayer:'separate',modularBody:{rear:'rear',base:'base',front:'front'}}}};
 for(const key of ['rear','base','front',...WARDROBE_SLOTS])m.images[key]={frameWidth:128,frameHeight:160,frames:14};
 m.images.weaponSkin={frameWidth:1254,frameHeight:1254,frames:1};
 const catalog=WARDROBE_SLOTS.map(slot=>({id:slot+'-test',hero:'wissem',slot,status:'ready',key:slot,cost:20,...(slot==='weaponSkin'?{weapon:'gauntlet',anchor:[.23,.78],angle:1.85,height:16}:{})}));
 const save=defaultSave();save.gold=500;save.ascension.ownedPieces=catalog.map(i=>i.id);return {m,catalog,save};
};
test('six slots are independent, clearable and frame-compatible',()=>{
 const {m,catalog,save}=fixture();assert.equal(WARDROBE_SLOTS.length,6);
 for(const i of catalog)assert(equipWardrobe(save,'wissem',i.slot,i.id,m,catalog));
 assert.deepEqual(save.ascension.wardrobe.wissem,Object.fromEntries(catalog.map(i=>[i.slot,i.id])));
 assert(equipWardrobe(save,'wissem','hat',null,m,catalog));assert.equal(save.ascension.wardrobe.wissem.hat,null);assert.equal(save.ascension.wardrobe.wissem.top,'top-test');
 assert.deepEqual(sanitizeWardrobe(save.ascension.wardrobe,save.ascension.ownedPieces,catalog,m),save.ascension.wardrobe);
});
test('wrong hero, unowned, pending, misaligned or non-modular clothing cannot equip/sell',()=>{
 const {m,catalog,save}=fixture(),hat=catalog[0];
 for(const bad of [{...hat,hero:'kossay'},{...hat,status:'pending'}])assert(!wardrobeItemReady(bad,'wissem',m));
 m.images.hat.frames=1;assert(!wardrobeItemReady(hat,'wissem',m));m.images.hat.frames=14;
 delete m.images['hero/wissem'].modularBody;assert(!wardrobeItemReady(hat,'wissem',m));assert(!purchaseWardrobe(save,hat.id,'wissem',m,catalog));
 const f=fixture();f.save.ascension.ownedPieces=[];assert(!equipWardrobe(f.save,'wissem','hat','hat-test',f.m,f.catalog));
});
test('weapon skin requires correct class, source grip and separate body; hides while unarmed',()=>{
 const {m,catalog,save}=fixture(),skin=catalog.find(i=>i.slot==='weaponSkin');
 assert(equipWardrobe(save,'wissem','weaponSkin',skin.id,m,catalog));assert(wardrobeLayers('wissem',save.ascension.wardrobe.wissem,m,catalog,'gauntlet').some(l=>l.slot==='weapon'));
 assert(!wardrobeLayers('wissem',save.ascension.wardrobe.wissem,m,catalog,null).some(l=>l.slot==='weapon'));
 save.ascension.weapons.wissem='sabre';assert(!equipWardrobe(save,'wissem','weaponSkin',skin.id,m,catalog));
 assert(!wardrobeItemReady({...skin,anchor:[2,0]},'wissem',m));m.images['hero/wissem'].weaponLayer='baked';assert(!wardrobeItemReady(skin,'wissem',m));
});
test('render stack is explicit and includes all equipped layers in the intended order',()=>{
 const {m,catalog}=fixture(),selection=Object.fromEntries(catalog.map(i=>[i.slot,i.id]));
 assert.deepEqual(wardrobeLayers('wissem',selection,m,catalog,'gauntlet').map(l=>l.slot),WARDROBE_DRAW_ORDER);
});
test('cosmetic purchase is one-time, cannot mint gold, and never touches combat stats',()=>{
 const {m,catalog,save}=fixture();save.ascension.ownedPieces=[];const before=heroStats('wissem');assert(purchaseWardrobe(save,'hat-test','wissem',m,catalog));assert.equal(save.gold,480);assert(purchaseWardrobe(save,'hat-test','wissem',m,catalog));assert.equal(save.gold,480);
 assert(!purchaseWardrobe(save,'hat-test','wissem',m,[{...catalog[0],cost:-1}]));assert.deepEqual(heroStats('wissem'),before);assert.equal(WARDROBE_CATALOG.length,0);
});
test('no unauthored new pieces are sold and no font binary is required to boot',()=>{
 assert.equal(WARDROBE_CATALOG.length,0);const css=read('game/atelier.css').toString();assert(css.includes("local('Pixelify Sans')"));assert(css.includes("local('VT323')"));assert(!/https?:\/\//.test(css));assert(css.includes('background-clip:text'));
});
