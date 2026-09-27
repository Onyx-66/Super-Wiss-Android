/** Non-destructive validation of editable content, file paths, and sprite layouts. */
import fs from 'node:fs';
import path from 'node:path';
import {compileContent} from './compile-content.mjs';
const root=path.resolve(import.meta.dirname,'..'),content=compileContent();
const manifest=JSON.parse(fs.readFileSync(path.join(root,'assets/manifest.json')));
const errors=[];let count=0,present=0,pending=0;
for(const [kind,entries]of Object.entries(manifest))for(const[key,meta]of Object.entries(entries)){
 count++;const p=path.resolve(root,meta.path||'');
 if(!p.startsWith(root+path.sep)||!meta.path?.startsWith('assets/')){errors.push(`${key}: unsafe path`);continue;}
 if(!fs.existsSync(p)){
  if(kind==='images'&&key.startsWith('weapon/')&&meta.optional===true&&!process.argv.includes('--require-weapons')){pending++;console.warn(`PENDING ART: ${key}: ${meta.path}`);continue;}
  errors.push(`${key}: missing ${meta.path}`);continue;
 }
 present++;const b=fs.readFileSync(p);if(!b.length)errors.push(`${key}: empty file`);
 if(kind==='images'&&meta.path.endsWith('.png')){
  if(b.length<24||b.readUInt32BE(0)!==0x89504e47){errors.push(`${key}: invalid PNG header`);continue;}
  const w=b.readUInt32BE(16),h=b.readUInt32BE(20),fw=meta.frameWidth||w,fh=meta.frameHeight||h,n=meta.frames||1;
  if(!Number.isInteger(fw)||!Number.isInteger(fh)||fw<1||fh<1||w%fw||h%fh||Math.floor(w/fw)*Math.floor(h/fh)<n)errors.push(`${key}: ${w}×${h} does not contain ${n} complete ${fw}×${fh} frames`);
 }
 if(kind==='audio'&&(!Number.isFinite(meta.volume)||meta.volume<0||meta.volume>1))errors.push(`${key}: volume must be 0..1`);
}
for(const h of content.heroes)if(!manifest.images['hero/'+h.id])errors.push(`No art for ${h.id}`);
for(const p of content.pets)if(!manifest.images['pet/'+p.id])errors.push(`No art for ${p.id}`);
for(const [i,w]of content.maps.entries()){
 for(const key of ['tiles/'+w.tileSet,'background/'+w.background,'map/'+i])if(!manifest.images[key])errors.push(`Map ${i+1} is missing ${key}`);
 if(!manifest.audio['music/'+w.music])errors.push(`Map ${i+1}: missing music ${w.music}`);
}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log(`PASS: ${present} present assets; ${pending} explicitly pending weapon PNGs (${count} entries); ${content.maps.length} maps, ${content.heroes.length} heroes and ${content.pets.length} pets.`);
