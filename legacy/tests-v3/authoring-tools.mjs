/** Exercise map-editing helpers in an isolated copy; never change the real game. */
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';import assert from 'node:assert/strict';import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..'),tmp=fs.mkdtempSync(path.join(os.tmpdir(),'sw-authoring-'));let count=0;
const run=(...args)=>execFileSync(process.execPath,args,{cwd:tmp,encoding:'utf8'});
try{
 for(const name of ['game','assets','scripts','licenses'])fs.cpSync(path.join(root,name),path.join(tmp,name),{recursive:true});fs.copyFileSync(path.join(root,'package.json'),path.join(tmp,'package.json'));fs.mkdirSync(path.join(tmp,'docs'));
 assert.ok(run('scripts/map-tool.mjs','list').includes('15  Starfall Sanctuary'));count++;
 run('scripts/map-tool.mjs','length','1','6');let maps=JSON.parse(fs.readFileSync(path.join(tmp,'game/maps.json')));assert.equal(maps[0].lengthMultiplier,6);assert.equal(maps[0].baseLength*maps[0].lengthMultiplier,1032);assert.ok(fs.existsSync(path.join(tmp,'game/maps.json.bak')));count++;
 run('scripts/map-tool.mjs','add','3','Jade Highlands');maps=JSON.parse(fs.readFileSync(path.join(tmp,'game/maps.json')));assert.equal(maps.length,16);assert.equal(maps[15].name,'Jade Highlands');count++;
 assert.ok(run('scripts/validate-assets.mjs').includes('16 maps'));count++;
 assert.ok(run('scripts/bundle.mjs').includes('Bundled 16 maps'));assert.ok(fs.existsSync(path.join(tmp,'app/src/main/assets/game.html')));count++;
 const sim=run('--input-type=module','-e',`import{createRun,stepRun}from'./game/engine.js';const r=createRun(15);for(let i=0;i<100;i++)stepRun(r,{right:true});if(r.worldId!==15||!Number.isFinite(r.player.x))process.exit(1);console.log(r.level.cfg.name)`);assert.ok(sim.includes('Jade Highlands'));count++;
 let bad=false;try{run('scripts/map-tool.mjs','length','1','0');}catch{bad=true;}assert.ok(bad);count++;
 const result={suite:'authoring helpers in temporary copy',passed:count,checks:['list','length change and backup','append world16','validate expanded registry','bundle expanded game','simulate new map','reject invalid multiplier']};fs.writeFileSync(path.join(root,'docs/authoring-tests.json'),JSON.stringify(result,null,2)+'\n');console.log(`${count} authoring checks passed.`);
}finally{fs.rmSync(tmp,{recursive:true,force:true});}
