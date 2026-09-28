/** UI identity is not a combat actor. An unequipped weapon must never erase a roster identity. */
export function portraitPolicy(hero,loadout,images){
 const body=loadout?.outfit&&loadout.outfit!=='starter'?'outfit/'+hero+'/'+loadout.outfit:'hero/'+hero;
 const referenceOnly=loadout?.equippedWeapon===null&&images?.[body]?.weaponLayer==='baked';
 return {body,referenceOnly,mode:referenceOnly?'identity-reference':'equipped-preview'};
}
export function containArtRect(bounds,width,height,padding=10){
 if(!bounds||bounds.width<=0||bounds.height<=0||width<=2*padding||height<=2*padding)return null;
 const scale=Math.min((width-2*padding)/bounds.width,(height-2*padding)/bounds.height);
 return {x:(width-bounds.width*scale)/2,y:(height-bounds.height*scale)/2,width:bounds.width*scale,height:bounds.height*scale,scale};
}
/** No crouch cell exists in the legacy 14-frame contract. This is an explicit cutout fallback,
 * not a new authored frame, and not a scaled standing sprite. Coordinates are on a 128x160 rig.
 * Torso leans forward, upper/lower legs rotate independently, feet remain at the actor baseline.
 */
export const CROUCH_CUTOUT=Object.freeze({
 scale:.8,torso:{crop:[0,0,128,108],pivot:[64,108],at:[64,131],angle:.57},
 legs:[
  {crop:[64,108,64,24],pivot:[88,108],at:[81,131],angle:.85},
  {crop:[64,132,64,28],pivot:[94,132],at:[62,147],angle:-1.05},
  {crop:[0,108,64,24],pivot:[42,108],at:[45,131],angle:-.85},
  {crop:[0,132,64,28],pivot:[34,132],at:[65,147],angle:1.05}
 ]
});
export function usesCrouchPose(actor){return actor?.crouching===true;}
