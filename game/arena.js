import { createBossTrial, createRun, makeArenaLevel, stepRun, meleeBox, damagePlayer, tickRaidBoss, clamp } from './engine.js';
import { HEROES, PETS, DT } from './data.js';
export const LINK_PROTOCOL=5;
const duelOverlap=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
export function cleanInput(v={}){const o={axis:clamp(Number.isFinite(v.axis)?v.axis:0,-1,1),aim:clamp(Number.isFinite(v.aim)?v.aim:0,-1,1),run:true};for(const k of ['left','right','jump','attack','knife','dodge','skill','skill2','pet','pet2','summon','interact'])o[k]=v[k]===true;return o;}
export function cleanPeerProfile(p={}){p=p&&typeof p==='object'?p:{};return {level:Math.max(1,Math.min(999,Math.floor(Number(p.level)||1))),online:p.online===true,hero:HEROES.some(h=>h.id===p.hero)?p.hero:(HEROES.some(h=>h.id===p.avatar)?p.avatar:'wissem'),pet:PETS.some(h=>h.id===p.pet)?p.pet:null,outfit:['starter','frost','ember'].includes(p.outfit)?p.outfit:'starter',name:String(p.name||'Explorer').replace(/[^a-zA-Z0-9 _-]/g,'').trim().slice(0,20)||'Explorer',avatar:HEROES.some(h=>h.id===p.avatar)?p.avatar:'wissem',banner:['aurora','ember','void','tide'].includes(p.banner)?p.banner:'aurora',frame:['silver','gold','thorns','astral'].includes(p.frame)?p.frame:'silver'};}
function duelRun(world,character,index){const r=createRun(world,character,'local',0,null,'veteran');r.localPvp=true;r.level=makeArenaLevel(world);r.level.enemies=[];r.boss=null;r.level.chambers=[];Object.assign(r.player,{normalizedCombat:true,x:120+index*340,y:436,checkpointX:120+index*340,lives:999,maxHp:6,baseHp:6,hp:6,invincible:2,focus:0,soul:0,knives:12});r.level.goal.x=99999;return r;}
/** Input-authoritative, bounded four-player local match. This is not an online ranked server. */
export class LocalMatch{
 constructor({mode='together',world=0,roster=[],difficulty='nightmare'}={}){
  if(!['raid','together','ffa','teams'].includes(mode)||roster.length<2||roster.length>4||(mode==='teams'&&roster.length!==4))throw Error('Choose 2–4 players; 2v2 needs exactly four.');
  if(new Set(roster.map(x=>x.id)).size!==roster.length||roster.some(x=>!/^(host|slot[123])$/.test(x.id)))throw Error('Invalid roster');
  this.mode=mode;this.world=clamp(Math.floor(world),0,14);this.difficulty=difficulty;this.time=0;this.countdown=3;this.finished=false;this.result=null;this.tickNo=0;this.teamScores=[0,0];this.players=roster.map((x,i)=>({id:x.id,profile:cleanPeerProfile(x.profile),team:i%2,ready:true,kills:0,deaths:0,seq:-1,input:{},lastInput:-9,lastAttack:0,lastHitBy:null,finishedAt:null,run:['raid','together'].includes(mode)?createBossTrial(this.world,cleanPeerProfile(x.profile).hero,difficulty,mode==='raid'?cleanPeerProfile(x.profile).pet:null):duelRun(this.world,cleanPeerProfile(x.profile).hero,i)}));
  for(const p of this.players)p.run.player.outfit=p.profile.outfit;
  if(mode==='raid'){
   this.revivePool=roster.length;this.sharedBoss=this.players[0].run.boss;
   this.sharedBoss.maxHp=this.sharedBoss.hp=Math.round(this.sharedBoss.maxHp*(1+.65*(roster.length-1)));
   this.sharedBoss.maxStagger=40+10*(roster.length-1);
   this.sharedHazards=[];
   for(const [i,p] of this.players.entries()){p.run.boss=this.sharedBoss;p.run.level.enemies=[this.sharedBoss];p.run.bossHazards=this.sharedHazards;p.run.raidSlave=true;p.run.player.x=160+i*75;p.revive=0;p.revives=0;p.downTime=0;}
  }
 }
 input(id,packet){const p=this.players.find(p=>p.id===id);if(!p||!packet||!Number.isSafeInteger(packet.seq)||packet.seq<0||packet.seq<=p.seq||packet.seq>p.seq+10000)return false;p.seq=packet.seq;p.input=cleanInput(packet.input);p.lastInput=this.time;return true;}
 step(dt=DT){if(this.finished)return;dt=clamp(dt,0,1/30);this.time+=dt;this.tickNo++;if(this.countdown>0){this.countdown=Math.max(0,this.countdown-dt);return;}
  if(this.mode==='raid'){this.stepRaid(dt);return;}
  for(const p of this.players){const r=p.run;if(this.mode==='together'&&(r.complete||r.failed))continue;const i=this.time-p.lastInput>.45?{}:p.input;const wasDead=r.player.deadFor>0;
   stepRun(r,this.mode==='together'?i:{...i,skill:false,skill2:false,pet:false,pet2:false,summon:false},dt);
   if(this.mode==='together'){if(r.complete&&p.finishedAt===null)p.finishedAt=this.time-3;continue;}
   r.player.x=clamp(r.player.x,35,1480);r.player.soul=0;r.player.focus=0;

   if(wasDead&&r.player.deadFor<=0){r.player.hp=6;r.player.invincible=2;r.player.stamina=100;}
   for(const target of this.players){if(target===p||this.mode==='teams'&&p.team===target.team||target.run.player.deadFor>0)continue;
    const q=target.run.player;
    if(r.player.attackTime>0&&!r.player.attackHits.includes(target.id)&&duelOverlap(meleeBox(r.player),q)){r.player.attackHits.push(target.id);const before=target.run.hits;damagePlayer(target.run,false,2);if(target.run.hits>before)target.lastHitBy=p.id;}
    for(const shot of r.shots)if(shot.owner==='hero'&&shot.life>0&&duelOverlap({x:shot.x-6,y:shot.y-6,w:16,h:12},q)){const before=target.run.hits;damagePlayer(target.run,false,2);if(target.run.hits>before)target.lastHitBy=p.id;shot.life=0;}
   }
   if(this.tickNo%600===0)r.player.knives=Math.min(12,r.player.knives+3);
  }
  if(this.mode!=='together')for(const p of this.players){if(p.run.knockouts>(p.lastDeaths||0)){p.lastDeaths=p.run.knockouts;p.deaths++;const killer=this.players.find(x=>x.id===p.lastHitBy);if(killer){killer.kills++;this.teamScores[killer.team]++;}p.lastHitBy=null;p.run.player.knives=12;p.run.player.deadFor=3;}}
  const limit=this.mode==='together'?300:180;
  if(this.mode==='together'&&this.players.every(p=>p.run.complete||p.run.failed)||this.time>=limit+3||this.mode==='teams'&&Math.max(...this.teamScores)>=10||this.mode==='ffa'&&this.players.some(p=>p.kills>=10))this.finish();
 }
 stepRaid(dt){
  // Rotate input order so a shared boss hit-recovery window does not favor the host.
  const order=this.players.slice(this.tickNo%this.players.length).concat(this.players.slice(0,this.tickNo%this.players.length));
  const phase=this.sharedBoss.phase;
  for(const p of order){if(p.run.failed){p.downTime+=dt;continue;}const i=this.time-p.lastInput>.45?{}:p.input;stepRun(p.run,i,dt);if(p.run.failed)p.downTime=0;if(this.sharedBoss.defeated)break;}
  if(this.sharedBoss.phase!==phase)this.sharedHazards=[];
  if(this.sharedBoss.defeated){for(const p of this.players){p.finishedAt=this.time-3;p.run.bossTime=this.time-3;}this.finish('raid-clear');return;}
  const standing=this.players.filter(p=>!p.run.failed);
  if(!standing.length){this.finish('team-wipe');return;}
  const target=standing[Math.floor(this.time/5)%standing.length];
  target.run.bossHazards=this.sharedHazards;
  tickRaidBoss(target.run,standing.map(p=>p.run),dt);
  this.sharedHazards=target.run.bossHazards.slice(-24);
  for(const p of this.players){p.run.bossHazards=this.sharedHazards;p.run.bossTime=this.time-3;}
  for(const fallen of this.players.filter(p=>p.run.failed)){
   const helper=standing.find(p=>!p.run.failed&&p.input.interact&&this.time-p.lastInput<.45&&Math.hypot(p.run.player.x-fallen.run.player.x,p.run.player.y-fallen.run.player.y)<130);
   if(helper&&this.revivePool>0&&fallen.downTime<25){fallen.revive+=dt;if(fallen.revive>=3){this.revivePool--;fallen.run.failed=false;fallen.run.complete=false;Object.assign(fallen.run.player,{hp:Math.max(2,Math.ceil(fallen.run.player.maxHp/2)),lives:1,deadFor:0,invincible:2,vy:0,stamina:100});fallen.revive=0;fallen.downTime=0;helper.revives++;}}
   else fallen.revive=0;
  }
  if(this.time>363)this.finish('time-limit');
 }
 finish(reason='complete'){this.finished=true;const rows=this.players.map(p=>({id:p.id,profile:p.profile,team:p.team,kills:p.kills,deaths:p.deaths,time:p.finishedAt,failed:p.run.failed,damage:p.run.bossDamage||0,revives:p.revives||0}));let winner=null,tie=false;
  if(this.mode==='raid'){winner=reason==='raid-clear'?'TEAM':null;rows.sort((a,b)=>b.damage-a.damage);}
  else if(this.mode==='teams'){tie=this.teamScores[0]===this.teamScores[1];winner=tie?null:this.teamScores[0]>this.teamScores[1]?'SUN':'MOON';}
  else{rows.sort(this.mode==='together'?(a,b)=>(a.time??Infinity)-(b.time??Infinity):(a,b)=>b.kills-a.kills||a.deaths-b.deaths);winner=rows[0]?.id;if(this.mode==='together'&&rows[0].time===null)winner=null;tie=this.mode==='ffa'&&rows.length>1&&rows[0].kills===rows[1].kills&&rows[0].deaths===rows[1].deaths;if(tie)winner=null;}
  this.result={mode:this.mode,rows,winner,tie,reason,teamScores:this.teamScores,revivePool:this.revivePool||0};return this.result;
 }
 snapshot(){return {type:'snapshot',protocol:LINK_PROTOCOL,tick:this.tickNo,mode:this.mode,world:this.world,difficulty:this.difficulty,time:this.time,countdown:this.countdown,finished:this.finished,result:this.result,teamScores:this.teamScores,revivePool:this.revivePool||0,players:this.players.map(p=>({id:p.id,profile:p.profile,team:p.team,kills:p.kills,deaths:p.deaths,finishedAt:p.finishedAt,revive:p.revive||0,downTime:p.downTime||0,player:{...p.run.player,attackHits:[]},boss:p.run.boss,shots:p.run.shots.slice(this.mode==='raid'?-16:-32),hazards:p.run.bossHazards.slice(this.mode==='raid'?-24:-40),bossTime:p.run.bossTime,score:p.run.score,complete:p.run.complete,failed:p.run.failed,petId:p.run.petId,petState:{x:p.run.petState.x,y:p.run.petState.y,guard:p.run.petState.guard},events:p.run.events.slice(-6)}))};}
}
/** Strict shape limits before a remote host can drive the renderer. Host is still trusted
 * for local match fairness; this validator is a safety boundary, not anti-cheat. */
export function validSnapshot(s){
 if(!s||s.type!=='snapshot'||s.protocol!==LINK_PROTOCOL||!['raid','together','ffa','teams'].includes(s.mode)||!['veteran','nightmare','inferno'].includes(s.difficulty)||!Number.isInteger(s.world)||s.world<0||s.world>14||!Number.isSafeInteger(s.tick)||s.tick<0||!Array.isArray(s.players)||s.players.length<2||s.players.length>4||new Set(s.players.map(p=>p?.id)).size!==s.players.length)return false;
 const number=(v,min=-1e7,max=1e7)=>Number.isFinite(v)&&v>=min&&v<=max;
 const flat=v=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.entries(v).length<=160&&Object.entries(v).every(([k,x])=>!['__proto__','constructor','prototype'].includes(k)&&(typeof x==='number'?number(x):typeof x==='boolean'||x===null||typeof x==='string'&&x.length<=120||Array.isArray(x)&&x.length<=50&&x.every(y=>typeof y==='number'&&number(y)||typeof y==='string'&&y.length<=40)));
 if(!number(s.time,0,3600)||!number(s.countdown,0,3.1)||!Array.isArray(s.teamScores)||s.teamScores.length!==2||!s.teamScores.every(x=>number(x,0,1000)))return false;
 for(const a of s.players){if(!a||typeof a!=='object')return false;const p=a.player;if(!/^(host|slot[123])$/.test(a.id)||!flat(p)||!HEROES.some(h=>h.id===p.character)||!number(p.x,-2000,10000)||!number(p.y,-3000,5000)||!number(p.maxHp,1,12)||!number(p.hp,0,p.maxHp)||!number(p.w,1,160)||!number(p.h,1,200)||!number(a.kills,0,1000)||!number(a.deaths,0,1000)||!a.profile||a.profile.name!==cleanPeerProfile(a.profile).name||a.profile.avatar!==cleanPeerProfile(a.profile).avatar||a.profile.banner!==cleanPeerProfile(a.profile).banner||a.profile.frame!==cleanPeerProfile(a.profile).frame)return false;
  if(a.petId!==null&&!PETS.some(p=>p.id===a.petId)||!flat(a.petState))return false;
  if(a.boss&&(!flat(a.boss)||!number(a.boss.maxHp,1,10000)||!number(a.boss.hp,0,10000)||!number(a.boss.phase,1,3)||!number(a.boss.w,1,1000)||!number(a.boss.h,1,1000)))return false;
  for(const [key,max]of [['shots',40],['hazards',50],['events',6]])if(!Array.isArray(a[key])||a[key].length>max||!a[key].every(flat))return false;
 }
 if(s.finished&&(!s.result||!['raid','together','ffa','teams'].includes(s.result.mode)||!Array.isArray(s.result.rows)||s.result.rows.length!==s.players.length||!s.result.rows.every(p=>s.players.some(a=>a.id===p.id)&&number(p.kills,0,1000)&&number(p.deaths,0,1000)&&number(p.damage,0,1e9)&&number(p.revives,0,1000)&&(p.time===null||number(p.time,0,3600))&&p.profile&&['name','avatar','banner','frame'].every(k=>p.profile[k]===cleanPeerProfile(p.profile)[k]))))return false;
 return true;
}
export function snapshotView(snapshot,id,previous=null){if(!validSnapshot(snapshot))return null;const me=snapshot.players.find(p=>p.id===id);if(!me||!me.player||!Number.isFinite(me.player.x)||!Number.isFinite(me.player.y))return null;
 const r=previous?.worldId===snapshot.world&&previous.localView?previous:(['raid','together'].includes(snapshot.mode)?createBossTrial(snapshot.world,me.profile.avatar,snapshot.difficulty,null):duelRun(snapshot.world,me.profile.avatar,0));
 r.localView=true;r.mode='local';r.localPvp=['ffa','teams'].includes(snapshot.mode);r.player={...me.player};r.petId=me.petId;r.petState={...r.petState,...me.petState};r.boss=me.boss;r.level.enemies=r.boss?[r.boss]:[];r.bossHazards=me.hazards||[];r.shots=snapshot.mode==='together'?(me.shots||[]):snapshot.players.flatMap(p=>p.shots||[]).slice(-80);r.events=me.events||[];r.revivePool=snapshot.revivePool||0;r.bossTime=me.bossTime;r.score=me.score;r.mapTime=snapshot.time;r.remotePlayers=snapshot.players.filter(p=>p.id!==id).map(p=>({...p.player,name:p.profile.name,team:p.team,avatar:p.profile.avatar,ghost:snapshot.mode==='together',downed:p.failed,revive:p.revive||0}));r.transition=0;r.complete=false;r.failed=false;return r;
}
