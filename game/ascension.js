import {cleanCosmetics} from './cosmetics.js';
/** Ascension content/loadout policy. Local unlocks never alter PvP stats. */
import { HEROES, PETS, heroById } from './data.js';
// Mira's explicit frost projectile changes solo combat; retain older runs separately.
export const ASC_RULES_REVISION=4;
export const ASC_OUTFITS=[
 {id:'starter',name:'Original',cost:0,description:'The signature explorer look.'},
 {id:'frost',name:'Frostguard',cost:0,description:'An alternate icy palette, ready to equip.'},
 {id:'ember',name:'Emberguard',cost:800,description:'A warm forged palette. Cosmetic only.'}
];
export const ASC_FUSIONS=[
 {id:'gravity-storm',name:'Gravity Storm',parents:['gravity','chrono'],icon:'bolt',cooldown:19,cost:1600,description:'Lift and slow nearby enemies. A brief electrical pulse follows.'},
 {id:'thunder-fang',name:'Thunder Fang',parents:['fang','overclock'],icon:'sword',cooldown:16,cost:1400,description:'A protected dash with a short electrical charge.'},
 {id:'eclipse-bloom',name:'Eclipse Bloom',parents:['orbit','blades'],icon:'moon',cooldown:20,cost:1800,description:'A short orbit shield and a fan of shadow blades.'}
];
export const ASC_PET_FUSIONS=[
 {id:'skywolf',name:'Sky Wolf',parents:['wolf','eagle'],cost:1200,description:'A flying bite-and-scout summon. Eight seconds, two calls.'},
 {id:'emberguard',name:'Emberguard',parents:['fox','turtle'],cost:1500,description:'A single guard and fire support. Nine seconds, two calls.'}
];
export const ASC_SKILL_ICONS={gravity:24,bomba:4,fang:39,snare:27,orbit:5,chrono:21,shadow:30,blades:28,bastion:22,quake:18,sirocco:51,vault:10,turret:29,overclock:19,arrows:37,windwalk:9,sunlance:23,rally:16,frostnova:46,icevault:45,'gravity-storm':19,'thunder-fang':39,'eclipse-bloom':50};
export function ascSkill(id){return HEROES.flatMap(h=>h.skills).find(s=>s.id===id)||ASC_FUSIONS.find(s=>s.id===id);}
export function ascDefault(){return {parts:{},localRecords:[],outfits:{},ownedOutfits:[],skills:{},learned:[],fusions:[],records:[],camera:'side'};}
export function ascSanitize(raw={}){
 const out=ascDefault();if(!raw||typeof raw!=='object')return out;
 out.ownedOutfits=Array.isArray(raw.ownedOutfits)?[...new Set(raw.ownedOutfits.filter(v=>typeof v==='string'&&HEROES.some(h=>v===h.id+':ember')))]:[];
 out.learned=Array.isArray(raw.learned)?[...new Set(raw.learned.filter(v=>HEROES.some(h=>h.skills.some(s=>s.id===v))))]:[];
 out.fusions=Array.isArray(raw.fusions)?[...new Set(raw.fusions.filter(v=>ASC_FUSIONS.some(f=>f.id===v)))]:[];
 for(const h of HEROES){const outfit=raw.outfits?.[h.id];out.outfits[h.id]=['starter','frost'].includes(outfit)||outfit==='ember'&&out.ownedOutfits.includes(h.id+':ember')?outfit:'starter';const slots=raw.skills?.[h.id];out.skills[h.id]=[0,1].map(i=>ascAllowed(out,h.id,slots?.[i])?slots[i]:h.skills[i].id);if(out.skills[h.id][0]===out.skills[h.id][1])out.skills[h.id]=h.skills.map(s=>s.id);}
 out.records=Array.isArray(raw.records)?raw.records.filter(r=>r&&r.rules==='ascension-1'&&Number.isFinite(r.score)&&r.score>=0&&Number.isFinite(r.time)&&r.time>=0&&Number.isInteger(r.world)&&r.world>=0&&r.world<15&&['standard','open'].includes(r.category)&&['campaign','boss','endless','daily'].includes(r.mode)&&['veteran','nightmare','inferno'].includes(r.difficulty)).slice(-120).map(r=>({rules:'ascension-1',revision:[2,3,ASC_RULES_REVISION].includes(r.revision)?r.revision:1,playerCount:1,deaths:Math.max(0,Math.floor(r.deaths)||0),revives:0,mode:r.mode,world:r.world,difficulty:r.difficulty,category:r.category,hero:heroById(r.hero).id,pet:PETS.some(p=>p.id===r.pet)?r.pet:null,skills:Array.isArray(r.skills)?r.skills.filter(id=>ascSkill(id)).slice(0,2):[],score:Math.min(1e12,r.score),time:Math.min(1e7,r.time),hits:Math.max(0,Math.min(1e6,Number(r.hits)||0)),stage:Math.max(1,Math.min(1e6,Number(r.stage)||1)),grade:['S','A','B','C','D'].includes(r.grade)?r.grade:'C',date:/^\d{4}-\d{2}-\d{2}$/.test(r.date)?r.date:''})) : [];
 for(const h of HEROES)out.parts[h.id]=cleanCosmetics(raw.parts?.[h.id],out.ownedOutfits.includes(h.id+':ember'));
 out.localRecords=Array.isArray(raw.localRecords)?raw.localRecords.filter(r=>r&&['raid','pvp','race'].includes(r.mode)&&Number.isFinite(r.time)&&r.time>=0&&Number.isInteger(r.playerCount)&&r.playerCount>=2&&r.playerCount<=4).slice(-80).map(r=>({...r,hero:heroById(r.hero).id,world:Math.max(0,Math.min(14,Math.floor(r.world)||0)),difficulty:['veteran','nightmare','inferno'].includes(r.difficulty)?r.difficulty:'veteran',deaths:Math.max(0,Math.floor(r.deaths)||0),revives:Math.max(0,Math.floor(r.revives)||0),score:Math.max(0,Math.min(1e9,Number(r.score)||0)),loadout:String(r.loadout||'').slice(0,100)})):[];
 // First-person is an opt-in test view, never persisted as the startup camera.
 out.camera='side';return out;
}
export function ascAllowed(a,hero,id){return !!ascSkill(id)&&(heroById(hero).skills.some(s=>s.id===id)||a.learned.includes(id)||a.fusions.includes(id));}
export function ascHeroSkills(a,hero){const h=heroById(hero);return [0,1].map(i=>ascAllowed(a,hero,a.skills[hero]?.[i])?ascSkill(a.skills[hero][i]):h.skills[i]);}
export function ascBuyOutfit(save,hero,id){const item=ASC_OUTFITS.find(x=>x.id===id);if(!HEROES.some(h=>h.id===hero)||!item)return false;const key=hero+':'+id;if(item.cost&&!save.ascension.ownedOutfits.includes(key)){if(save.gold<item.cost)return false;save.gold-=item.cost;save.ascension.ownedOutfits.push(key);}save.ascension.outfits[hero]=id;return true;}
export function ascLearn(save,id){const sk=HEROES.flatMap(h=>h.skills).find(s=>s.id===id);if(!sk||save.ascension.learned.includes(id))return false;if(save.gold<350)return false;save.gold-=350;save.ascension.learned.push(id);return true;}
export function ascFuseSkill(save,id){const f=ASC_FUSIONS.find(x=>x.id===id);if(!f||save.ascension.fusions.includes(id)||save.gold<f.cost)return false;save.gold-=f.cost;save.ascension.fusions.push(id);return true;}
export function ascFusePet(save,id){const f=ASC_PET_FUSIONS.find(x=>x.id===id);if(!f||save.pets.includes(id)||save.gold<f.cost||!f.parents.every(p=>save.pets.includes(p)))return false;save.gold-=f.cost;save.pets.push(id);return true;}
export function ascEquipSkill(save,hero,slot,id){if(!HEROES.some(h=>h.id===hero)||![0,1].includes(slot)||!ascAllowed(save.ascension,hero,id))return false;const slots=ascHeroSkills(save.ascension,hero).map(s=>s.id);if(slots[1-slot]===id)return false;slots[slot]=id;save.ascension.skills[hero]=slots;return true;}
export function ascApplyRun(save,r){const p=r.player;p.parts=cleanCosmetics(save.ascension.parts?.[p.character],save.ascension.ownedOutfits.includes(p.character+':ember'));p.outfit=save.ascension.outfits[p.character]||'starter';const sk=ascHeroSkills(save.ascension,p.character);p.skillId1=sk[0].id;p.skillId2=sk[1].id;r.loadoutCategory=r.petId||sk.some((s,i)=>s.id!==heroById(p.character).skills[i].id)?'open':'standard';}
export function ascResult(r){const time=r.bossTrial?r.bossTime:r.mapTime+r.knockouts*3;const penalty=r.hits*6+r.knockouts*20+Math.max(0,time-(r.bossTrial?90:r.level.cfg.par))/5;const q=Math.max(0,100-penalty);return {rules:'ascension-1',revision:ASC_RULES_REVISION,playerCount:1,deaths:r.knockouts||0,revives:0,mode:r.bossTrial?'boss':r.mode,world:r.worldId,difficulty:r.difficulty,category:r.loadoutCategory|| (r.petId?'open':'standard'),hero:r.player.character,pet:r.petId,skills:[r.player.skillId1||'',r.player.skillId2||''],score:Math.floor(r.score),time:Math.round(time*1000)/1000,hits:r.hits,stage:r.stage+1,grade:r.failed?'D':q>=90?'S':q>=75?'A':q>=55?'B':'C',date:new Date().toISOString().slice(0,10)};}
export function ascCompare(a,b){return a.mode==='endless'?b.score-a.score||a.hits-b.hits: a.time-b.time||a.hits-b.hits||b.score-a.score;}
export function ascRecord(save,r){if(['practice','local'].includes(r.mode)||r.cameraExperiment||r.failed&&r.mode!=='endless'||!r.complete&&r.mode!=='endless')return false;const v=ascResult(r);save.ascension.records.push(v);save.ascension.records=save.ascension.records.slice(-120);return v;}
