import {HEROES} from './data.js';
/** Weapon timing is explicit; normalized PvP keeps its established shared profile. */
export const COMBAT_PROFILES={
 wissem:{weapon:'gauntlet',speed:1.08,accel:1.1,air:1.12,startup:.025,active:.17,recovery:.15,dodge:.21},
 kossay:{weapon:'dual',speed:1.12,accel:1.25,air:1,startup:.025,active:.12,recovery:.12,dodge:.17},
 yakine:{weapon:'staff',speed:.86,accel:.85,air:.92,startup:.17,active:.12,recovery:.3,dodge:.23,projectile:'arcane'},
 taky:{weapon:'dagger',speed:1.1,accel:1.3,air:1.18,startup:.035,active:.13,recovery:.14,dodge:.16},
 garsi:{weapon:'shield',speed:.8,accel:.63,air:.78,startup:.14,active:.22,recovery:.32,dodge:.26},
 tounsi:{weapon:'sabre',speed:1.04,accel:1.1,air:1.12,startup:.06,active:.2,recovery:.18,dodge:.2},
 youssef:{weapon:'gadget',speed:.94,accel:1,air:1,startup:.1,active:.1,recovery:.3,dodge:.22,projectile:'bolt'},
 loey:{weapon:'bow',speed:1.03,accel:1.12,air:1.16,startup:.2,active:.08,recovery:.24,dodge:.18,projectile:'arrow'},
 // Preserve former fallback timings; make the two missing identities explicit.
 rayan:{weapon:'lance',speed:1,accel:1,air:1,startup:.08,active:.18,recovery:.2,dodge:.22},
 mira:{weapon:'frost_staff',speed:1,accel:1,air:1,startup:.08,active:.18,recovery:.2,dodge:.22,projectile:'ice'}
};
export function isUnarmed(p){return !p.normalizedCombat&&p.equippedWeapon===null;}
export function unarmedProfile(id){
 const p=COMBAT_PROFILES[id]||COMBAT_PROFILES.wissem;
 const startupFrames=Math.max(3,Math.min(6,Math.round(p.startup*60)));
 const activeFrames=Math.max(3,Math.min(5,Math.round(p.active*30)));
 const recoveryFrames=Math.ceil(Math.max(p.recovery,p.dodge)*60);
 return {...p,weapon:'unarmed',projectile:undefined,startupFrames,activeFrames,recoveryFrames,
  startup:startupFrames/60,active:activeFrames/60,recovery:recoveryFrames/60,damage:1,reach:26,staminaCost:8};
}
export function unarmedPhase(p){
 const a=p.unarmedAttack;if(!a)return 'idle';
 return a.tick<a.startup?'startup':a.tick<a.startup+a.active?'active':a.tick<a.total?'recovery':'idle';
}
export function combatProfile(p){
 if(p.normalizedCombat)return {weapon:'sabre',speed:1,accel:1,air:1,startup:.025,active:.17,recovery:.15,dodge:.22};
 const base=COMBAT_PROFILES[p.character]||COMBAT_PROFILES.wissem;
 if(isUnarmed(p))return unarmedProfile(p.character);
 const weapon=Object.values(COMBAT_PROFILES).find(v=>v.weapon===p.equippedWeapon);
 const owner=HEROES.find(h=>COMBAT_PROFILES[h.id]?.weapon===p.equippedWeapon);
 return weapon?{...base,weapon:weapon.weapon,startup:weapon.startup,active:weapon.active,recovery:weapon.recovery,projectile:weapon.projectile,reach:owner?.combatStyle?.reach,damage:owner?.combatStyle?.damage}:base;
}
