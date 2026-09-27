import { COMBAT_PROFILES, combatProfile } from './combat-profiles.js';

/** Art is selected by the hero weapon category, NOT by the normalized PvP profile.
 * All coordinates below are logical hero-local units. Final grip calibration is
 * pending the supplied PNGs and weapon-free body sheets, not falsely auto-detected.
 */
export const WEAPON_ART = {
 gauntlet: {key:'weapon/gauntlet', file:'gravity_gauntlet.png', height:23, anchor:[.5,.5], motion:'punch', angle:0, dual:true},
 dual: {key:'weapon/dual', file:'twin_fang_dagger.png', height:34, anchor:[.5,.84], motion:'slash', angle:-.35, dual:true},
 staff: {key:'weapon/staff', file:'orbit_crescent_staff.png', height:59, anchor:[.5,.84], motion:'cast', angle:-.1},
 dagger: {key:'weapon/dagger', file:'shadow_knife.png', height:31, anchor:[.5,.84], motion:'slash', angle:-.38},
 shield: {key:'weapon/shield', file:'stonebreaker_hammer.png', height:52, anchor:[.5,.84], motion:'heavy', angle:.12},
 sabre: {key:'weapon/sabre', file:'wind_scimitar.png', height:47, anchor:[.5,.84], motion:'slash', angle:-.3},
 gadget: {key:'weapon/gadget', file:'clockwork_knuckle.png', height:25, anchor:[.5,.5], motion:'recoil', angle:0},
 bow: {key:'weapon/bow', file:'sky_bow.png', height:43, anchor:[.5,.5], motion:'bow', angle:0},
 lance: {key:'weapon/lance', file:'sun_lance.png', height:63, anchor:[.5,.72], motion:'thrust', angle:.35},
 frost_staff: {key:'weapon/frost_staff', file:'frost_staff.png', height:59, anchor:[.5,.84], motion:'cast', angle:-.1}
};
const bounded = (v,min,max) => Math.max(min,Math.min(max,Number.isFinite(v)?v:0));
export function weaponArtForHero(id) {
 const type=COMBAT_PROFILES[id]?.weapon;
 return type ? WEAPON_ART[type] : undefined; // No invented default weapon.
}
export function weaponAttackPhase(p) {
 const profile=combatProfile(p),duration=p.attackDuration||profile.startup+profile.active;
 if (!(p.attackTime>0)) return {attacking:false,windup:0,active:0,elapsed:0};
 const elapsed=bounded(duration-p.attackTime,0,duration),startup=p.attackStartup??profile.startup;
 return {attacking:true,windup:bounded(elapsed/Math.max(.001,startup),0,1),
  active:bounded((elapsed-startup)/Math.max(.001,duration-startup),0,1),elapsed};
}
/** Existing sheet contract: idle 0, run 1..8, jump 9, fall 10, attack 11..12, dodge 13. */
export function heroArtFrame(p,t=0,moving=false,tempo=1) {
 if(p.dodge>0) return 13;
 const phase=weaponAttackPhase(p);
 if(phase.attacking) return phase.active<.5?11:12;
 if(!p.grounded&&p.vy!==undefined) return p.vy<0?9:10;
 return moving?1+Math.floor(Math.max(0,t)*13*tempo)%8:0;
}
/** Frame-indexed sockets. Kept in data so an artist can calibrate against final art. */
export const WEAPON_SOCKETS = {
 idle:[14,-31], run:[[15,-31],[16,-30],[16,-30],[14,-31],[12,-32],[11,-32],[12,-31],[14,-31]],
 jump:[13,-35], fall:[15,-30], attack11:[11,-33], attack12:[18,-28], dodge:[15,-25]
};
export function weaponPose(p,frame,t=0,bob=0,offhand=false,socketOverrides=null) {
 const spec=weaponArtForHero(p.character); if(!spec)return null;
 const phase=weaponAttackPhase(p),u=phase.active;
 const socket=frame>=1&&frame<=8?WEAPON_SOCKETS.run[frame-1]:
  frame===9?WEAPON_SOCKETS.jump:frame===10?WEAPON_SOCKETS.fall:
  frame===11?WEAPON_SOCKETS.attack11:frame===12?WEAPON_SOCKETS.attack12:
  frame===13?WEAPON_SOCKETS.dodge:WEAPON_SOCKETS.idle;
 // Optional per-body frame sockets let replacement sheets match their actual hands.
 const supplied=socketOverrides?.[frame];
 const grip=Array.isArray(supplied)&&supplied.length===2&&supplied.every(Number.isFinite)?supplied:socket;
 let [x,y]=grip,angle=spec.angle;
 if(phase.attacking){
  if(spec.motion==='slash'||spec.motion==='heavy'){
   const reverse=spec.motion==='slash'&&p.attackChain===2?-1:1;
   angle+=(-.85*phase.windup+2.35*u)*reverse;
  }else if(spec.motion==='thrust'){angle=Math.PI/2;x+=Math.sin(u*Math.PI)*21;}
  else if(spec.motion==='punch'){x+=Math.sin(u*Math.PI)*16;y-=Math.sin(u*Math.PI)*3;angle+=.15*u;}
  else if(spec.motion==='recoil'){x-=Math.sin(u*Math.PI)*5;}
  else if(spec.motion==='bow'){x-=phase.windup*3*(1-u);angle+=bounded(p.attackAim,-1,1)*.65;}
  else if(spec.motion==='cast'){angle-=.25*phase.windup+.25*Math.sin(u*Math.PI);}
  // Match vertical melee intent; ranged weapons keep their aim/release pose.
  if(!combatProfile(p).projectile){if(p.attackAim>.5&&!p.grounded)angle+=Math.PI;else if(p.attackAim<-.5)angle-=Math.PI/2;}
 }else angle+=Math.sin(t*2.2)*.018;
 if(offhand){x-=25;y+=7;angle=-angle;}
 return {key:spec.key,x,y:y+bob+(p.landTime>0?3:0),angle,height:spec.height,
  anchorX:spec.anchor[0],anchorY:spec.anchor[1],mirror:offhand,frame};
}
