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
export function combatProfile(p){return p.normalizedCombat?{weapon:'sabre',speed:1,accel:1,air:1,startup:.025,active:.17,recovery:.15,dodge:.22}:COMBAT_PROFILES[p.character]||{weapon:'sabre',speed:1,accel:1,air:1,startup:.08,active:.18,recovery:.2,dodge:.22};}
