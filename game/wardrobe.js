import {signatureWeapon} from './equipment.js';
/** Versioned six-slot renderer contract. Nothing here changes combat statistics.
 * Authored layer art must be ready and frame-compatible before it can be sold/equipped.
 * Existing whole-outfit purchases are retained as legacy looks, never converted to fake parts.
 */
export const WARDROBE_SLOTS=Object.freeze(['hat','top','bottom','shoes','eyewear','weaponSkin']);
export const WARDROBE_LABELS={hat:'Headwear',top:'Top',bottom:'Pants',shoes:'Shoes',eyewear:'Eyewear',weaponSkin:'Weapon skin'};
export const WARDROBE_DRAW_ORDER=Object.freeze(['rear','base','shoes','bottom','top','hat','eyewear','weapon','front']);
// The source pack contains no frame-aligned clothing layers. Do not invent sellable inventory.
export const WARDROBE_CATALOG=Object.freeze([]);
export function emptyWardrobe(){return Object.fromEntries(WARDROBE_SLOTS.map(slot=>[slot,null]));}
export function wardrobeItemReady(item,hero,manifest){
 if(!item||item.hero!==hero||!WARDROBE_SLOTS.includes(item.slot)||item.status!=='ready')return false;
 const body=manifest?.images?.['hero/'+hero],meta=manifest?.images?.[item.key];
 if(!body||!meta)return false;
 if(item.slot==='weaponSkin')return body.weaponLayer==='separate'&&typeof item.weapon==='string'&&
  meta.frames===1&&meta.frameWidth>0&&meta.frameHeight>0&&
  Array.isArray(item.anchor)&&item.anchor.length===2&&item.anchor.every(n=>Number.isFinite(n)&&n>=0&&n<=1)&&
  Number.isFinite(item.height)&&item.height>0&&Number.isFinite(item.angle);
 // Clean, fully aligned base + front arm masks are mandatory for clothing replacement.
 const rig=body.modularBody;
 const aligned=key=>{const m=manifest.images[key];return !!m&&m.frameWidth===body.frameWidth&&m.frameHeight===body.frameHeight&&m.frames===body.frames;};
 if(!rig?.base||!rig?.front||!aligned(rig.base)||!aligned(rig.front)||(rig.rear&&!aligned(rig.rear)))return false;
 return aligned(item.key);
}
export function sanitizeWardrobe(raw={},owned=[],catalog=WARDROBE_CATALOG,manifest={images:{}}){
 const out={};for(const [hero,parts] of Object.entries(raw||{})){
  out[hero]=emptyWardrobe();for(const slot of WARDROBE_SLOTS){
   const item=catalog.find(i=>i.id===parts?.[slot]&&i.slot===slot);
   if(owned.includes(item?.id)&&wardrobeItemReady(item,hero,manifest))out[hero][slot]=item.id;
  }
 }return out;
}
export function equipWardrobe(save,hero,slot,id,manifest,catalog=WARDROBE_CATALOG){
 if(!save?.ascension||!WARDROBE_SLOTS.includes(slot)||!manifest?.images?.['hero/'+hero])return false;
 const item=catalog.find(i=>i.id===id);
 if(id!==null&&(!save.ascension.ownedPieces?.includes(id)||item?.slot!==slot||!wardrobeItemReady(item,hero,manifest)))return false;
 if(id!==null&&slot==='weaponSkin'&&item.weapon!==(Object.hasOwn(save.ascension.weapons||{},hero)?save.ascension.weapons[hero]:signatureWeapon(hero)))return false;
 save.ascension.wardrobe??={};save.ascension.wardrobe[hero]={...emptyWardrobe(),...save.ascension.wardrobe[hero],[slot]:id};return true;
}
export function purchaseWardrobe(save,id,hero,manifest,catalog=WARDROBE_CATALOG){
 if(!save?.ascension||!Number.isFinite(save.gold))return false;
 const item=catalog.find(i=>i.id===id);
 if(!item||!wardrobeItemReady(item,hero,manifest)||!Number.isInteger(item.cost)||item.cost<0||save.gold<item.cost)return false;
 save.ascension.ownedPieces??=[];
 if(save.ascension.ownedPieces.includes(id))return true;
 save.gold-=item.cost;save.ascension.ownedPieces.push(id);return true;
}
export function wardrobeLayers(hero,selection,manifest,catalog=WARDROBE_CATALOG,weapon=signatureWeapon(hero)){
 return WARDROBE_DRAW_ORDER.flatMap(slot=>{
  if(['rear','base','front'].includes(slot)){const key=manifest?.images?.['hero/'+hero]?.modularBody?.[slot];return key?[{slot,key}]:[];}
  const item=catalog.find(i=>i.id===selection?.[slot==='weapon'?'weaponSkin':slot]);
  if(!wardrobeItemReady(item,hero,manifest)||(slot==='weapon'&&item.weapon!==weapon))return [];
  return [{slot,key:item.key,weapon:item.weapon,anchor:item.anchor,height:item.height,angle:item.angle}];
 });
}
