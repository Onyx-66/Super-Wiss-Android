import {COMBAT_PROFILES} from './combat-profiles.js';
import {heroStats} from './hero-stats.js';
/** `shield` is the historical save/weapon ID for the hammer. Never migrate it by display name. */
export const WEAPON_RULES=Object.freeze({
 gauntlet:{class:'gauntlet',label:'Gravity gauntlet',min:{power:100,speed:100}},
 dual:{class:'dual-dagger',label:'Twin Fang daggers',min:{power:120,speed:105}},
 staff:{class:'staff',label:'Orbit Crescent staff',min:{magic:50}},
 dagger:{class:'dagger',label:'Shadow knife',min:{power:120,speed:110}},
 shield:{class:'hammer',label:'Stonebreaker hammer',min:{power:95,stamina:120}},
 sabre:{class:'sabre',label:'Wind scimitar',min:{power:100,speed:95}},
 gadget:{class:'gadget',label:'Clockwork knuckle',min:{speed:90,stamina:100}},
 bow:{class:'bow',label:'Sky bow',min:{speed:100,stamina:95}},
 lance:{class:'lance',label:'Sun lance',min:{power:95,stamina:95}},
 frost_staff:{class:'staff',label:'Frost staff',min:{magic:50}}
});
export const WEAPON_FREE_HEROES=Object.freeze(['wissem']);
export function signatureWeapon(hero){return COMBAT_PROFILES[hero]?.weapon;}
export function weaponEligibility(hero,type){
 const stats=heroStats(hero);
 if(!stats)return {ok:false,reasons:['Unknown hero']};
 if(type===null)return {ok:true,reasons:[]};
 const rule=WEAPON_RULES[type];if(!rule)return {ok:false,reasons:['Unknown weapon']};
 const reasons=Object.entries(rule.min).filter(([stat,min])=>stats[stat]<min).map(([stat,min])=>`${stat} ${stats[stat]} / ${min} required`);
 return {ok:!reasons.length,reasons};
}
export function equipmentStatus(hero,type){
 const eligible=weaponEligibility(hero,type);
 const artReady=type===null||type===signatureWeapon(hero)||WEAPON_FREE_HEROES.includes(hero);
 return {...eligible,artReady,ok:eligible.ok&&artReady,reasons:[...eligible.reasons,...(!artReady?['Weapon-free body art required for a different weapon']:[])]};
}
export function cleanWeapons(raw={}){
 const result={};for(const hero of Object.keys(COMBAT_PROFILES)){
  const type=Object.hasOwn(raw||{},hero)?raw[hero]:signatureWeapon(hero);
  result[hero]=equipmentStatus(hero,type).ok?type:signatureWeapon(hero);
 }return result;
}
export function equippedWeapon(asc,hero){return cleanWeapons(asc?.weapons)[hero];}
export function equipWeapon(save,hero,type){
 if(!save?.ascension||!equipmentStatus(hero,type).ok)return false;
 save.ascension.weapons={...cleanWeapons(save.ascension.weapons),[hero]:type};return true;
}
