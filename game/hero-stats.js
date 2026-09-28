import {COMBAT_PROFILES} from './combat-profiles.js';
import {HEROES} from './data.js';
/** Fixed capability ratings, not purchasable levels or extra damage multipliers.
 * 100 = the original .46s, two-damage reference cycle. See docs/HERO-STATS.md.
 */
export const STAT_REFERENCE = Object.freeze({cycle:.46,damage:2,weights:{speed:.5,accel:.3,air:.2}});
export function heroStats(id) {
 const p=COMBAT_PROFILES[id],hero=HEROES.find(h=>h.id===id);
 if(!p||!hero) return null;
 const cycle=p.startup+p.active+p.recovery;
 const damage=hero.combatStyle?.damage||2;
 const magical=['arcane','ice'].includes(p.projectile);
 const magicDamage=p.projectile==='arcane'?3:2;
 return Object.freeze({
  power:Math.round(100*(damage/2)*STAT_REFERENCE.cycle/cycle),
  magic:magical?Math.round(100*(magicDamage/2)*STAT_REFERENCE.cycle/cycle):0,
  speed:Math.round(100*(p.speed*.5+p.accel*.3+p.air*.2)),
  stamina:Math.round(100*cycle/STAT_REFERENCE.cycle),
  cycle,baseDamage:damage,staminaPerSecond:8/cycle,
  provenance:{startup:p.startup,active:p.active,recovery:p.recovery,speed:p.speed,accel:p.accel,air:p.air,projectile:p.projectile||null}
 });
}
export const STAT_LABELS={power:'Power',magic:'Magic',speed:'Speed',stamina:'Stamina'};
export const STAT_HELP={power:'Base melee damage / complete attack cycle, relative to the original 2-damage, 0.46s reference. Not a second damage multiplier.',magic:'Arcane or ice projectile throughput. Mechanical arrows and bolts do not require magic.',speed:'50% run speed + 30% acceleration + 20% air control; baseline 100.',stamina:'Attack sustainability at the unchanged 8-stamina cost. Higher = lower continuous basic-attack drain. Pool remains 100.'};
