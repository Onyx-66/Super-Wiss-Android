/** Safe map helper. User-facing numbers are ONE-based; array IDs are ZERO-based.
 * Examples: npm run map -- list
 *           npm run map -- length 1 6
 *           npm run map -- add 3 "Jade Highlands"
 * Writes backups before editing. Appending preserves existing save indices.
 */
import fs from 'node:fs';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),file=path.join(root,'game/maps.json'),mf=path.join(root,'assets/manifest.json');
const maps=JSON.parse(fs.readFileSync(file)),manifest=JSON.parse(fs.readFileSync(mf));
const [action='list',a,b]=process.argv.slice(2);
function index(s){const n=Number(s);if(!Number.isInteger(n)||n<1||n>maps.length)throw Error(`Map number must be 1..${maps.length}`);return n-1;}
function backup(p){fs.copyFileSync(p,p+'.bak');}
if(action==='list'){for(const[i,m]of maps.entries())console.log(`${String(i+1).padStart(2,'0')}  ${m.name}  ${m.baseLength} × ${m.lengthMultiplier} = ${m.baseLength*m.lengthMultiplier} tiles`);}
else if(action==='length'){
 const id=index(a),n=Number(b);if(!Number.isInteger(n)||n<1||n>20)throw Error('Sector multiplier must be an integer 1..20.');backup(file);maps[id].lengthMultiplier=n;fs.writeFileSync(file,JSON.stringify(maps,null,2)+'\n');console.log(`${maps[id].name}: now ${maps[id].baseLength*n} tiles. Run npm run validate && npm run build.`);
}else if(action==='add'){
 const id=index(a);if(!b?.trim()||b.length>45)throw Error('Provide a map name of 1..45 characters.');const m=structuredClone(maps[id]);m.name=b.trim();m.tagline='A new frontier awaits.';m.enemyBudget=Math.min(60,m.enemyBudget+2);const newId=maps.length;maps.push(m);manifest.images['map/'+newId]=structuredClone(manifest.images['map/'+id]);backup(file);backup(mf);fs.writeFileSync(file,JSON.stringify(maps,null,2)+'\n');fs.writeFileSync(mf,JSON.stringify(manifest,null,2)+'\n');console.log(`Appended world ${newId+1}: ${m.name}. Reuses template art/music until replaced. Run npm run validate && npm run build. Update baseline content-count tests after intentional expansion.`);
}else throw Error('Use list, length MAP MULTIPLIER, or add TEMPLATE_MAP "Name".');
