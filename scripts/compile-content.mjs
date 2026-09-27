import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
export function compileContent(){
 const bossPath=path.join(root,'game/bosses.json');const bosses=JSON.parse(fs.readFileSync(bossPath,'utf8')); if(bosses.length<1)throw Error('At least one boss required');
 const bossFile=path.join(root,'game/bosses.js');const diff=fs.readFileSync(bossFile,'utf8').split('export const DIFFICULTIES')[1];fs.writeFileSync(bossFile,'// Generated boss table; edit bosses.json.\nexport const BOSSES='+JSON.stringify(bosses)+';\nexport const DIFFICULTIES'+diff);
 const data={};for(const name of ['heroes','pets','powers','maps'])data[name]=JSON.parse(fs.readFileSync(path.join(root,'game',name+'.json'),'utf8'));
 if(data.heroes.length<8||data.heroes.length>32)throw Error('Expected 8..32 hero definitions.');
 for(const [i,w] of data.maps.entries()){
  if(!Number.isInteger(w.baseLength)||w.baseLength<80||!Number.isInteger(w.lengthMultiplier)||w.lengthMultiplier<1||w.lengthMultiplier>20)throw Error(`Map ${i}: baseLength must be >=80; lengthMultiplier must be an integer 1..20.`);
  if(!Array.isArray(w.gaps)||w.gaps.some(x=>!Number.isInteger(x)||x<8||x>w.baseLength-8))throw Error(`Map ${i}: gaps outside safe sector bounds.`);
  if(!w.roster?.length)throw Error(`Map ${i} needs enemies.`);
  const known=['slime','beetle','hopper','bat','crab','sentry','spiker','golem','imp','ninja','wisp','maw','drone'];
  if(w.roster.some(k=>!known.includes(k)))throw Error(`Map ${i}: unknown enemy type.`);
  if(!Number.isFinite(w.enemyDensity)||w.enemyDensity<0.1||w.enemyDensity>4||!Number.isFinite(w.powerDensity)||w.powerDensity<0.1||w.powerDensity>4)throw Error(`Map ${i}: densities must be 0.1..4.`);
  for(const e of w.tileEdits||[])if(!Number.isInteger(e.col)||!Number.isInteger(e.row)||e.col<0||e.col>=w.baseLength*w.lengthMultiplier||e.row<0||e.row>=16||!Number.isInteger(e.value)||e.value<0||e.value>5)throw Error(`Map ${i}: invalid tile edit.`);
  for(const e of w.extraSpawns||[])if(!['enemy','power'].includes(e.kind)||!Number.isInteger(e.col)||e.col<0||e.col>=w.baseLength*w.lengthMultiplier||!Number.isInteger(e.row)||e.row<0||e.row>=16||(e.kind==='enemy'?!known.includes(e.type):!data.powers.some(p=>p.id===e.type)))throw Error(`Map ${i}: invalid extra spawn.`);
 }
 for(const h of data.heroes){if(h.skills.length!==2)throw Error(h.id+' must have two skills');for(const sk of h.skills)if(!Number.isFinite(sk.cooldown)||sk.cooldown<=0)throw Error(h.id+': cooldown must be positive');}
 for(const pet of data.pets){if(!Number.isInteger(pet.unlockWorld)||pet.unlockWorld<0||pet.unlockWorld>=data.maps.length||pet.fraction<0.02||pet.fraction>0.95)throw Error(pet.id+': invalid rescue location');for(const sk of pet.skills)if(!(sk.duration>0&&sk.cooldown>=sk.duration))throw Error(pet.id+': cooldown must be >= positive duration');}
 fs.writeFileSync(path.join(root,'game/content.js'),'// GENERATED. Edit the JSON files, not this snapshot.\nexport const CONTENT='+JSON.stringify(data)+';\n');
 return data;
}
if(process.argv[1]===import.meta.filename){compileContent();console.log('Content compiled.');}
