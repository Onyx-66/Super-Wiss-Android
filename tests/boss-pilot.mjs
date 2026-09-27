/** Ordinary inputs only. No health edits, teleportation, hidden invulnerability or boss edits. */
import {createBossTrial,stepRun} from '../game/engine.js';import{DT,HEROES}from '../game/data.js';import fs from'node:fs';
export function pilot(world,hero='garsi',difficulty='veteran',pet='fox'){
 const r=createBossTrial(world,hero,difficulty,pet);
 for(let i=0;i<18000&&!r.complete&&!r.failed;i++){
  const p=r.player,b=r.boss;const dx=b.x-p.x;let dest=b.x-73;
  if(b.x<220)dest=b.x+b.w+60;
  if(b.state==='windup'&&['slam','thorns','rain'].includes(b.attack))dest=p.x<700?1100:250;
  const delta=dest-p.x,dir=Math.abs(delta)>18?Math.sign(delta):0;
  const threat=b.state==='attack'&&Math.abs(dx)<240||r.bossHazards.some(h=>h.warning<=.1&&Math.abs(h.x-p.x)<100&&Math.abs(h.y-p.y)<130);
  const input={axis:dir,run:true,attack:true,knife:Math.abs(dx)<630&&p.facing===Math.sign(dx)&&Math.abs(p.y-b.y)<150,
   jump:(b.state==='windup'&&b.clock<.24&&['dash','waves','slam','fan','orbs'].includes(b.attack))||(threat&&p.grounded)||(p.x>280&&p.x<490&&p.grounded&&i%120<20),
   dodge:threat&&p.dodgeCD===0&&i%2===0,skill:i%3===0&&Math.abs(dx)<500,skill2:i%3===1&&Math.abs(dx)<240,summon:i%30===0&&b.state!=='intro',aim:p.y<b.y-10?.8:0};
  stepRun(r,input,DT);
 }
 return {world:world+1,hero,difficulty,pet,complete:r.complete,seconds:r.bossTime,hits:r.hits,bossHP:r.boss.hp,playerHP:r.player.hp};
}
if(process.argv.includes('--survey')){let wins=[];for(let w=0;w<15;w++){let best=null;for(const h of ['garsi','taky','yakine','loey','kossay','wissem','youssef','tounsi']){const x=pilot(w,h);if(!best||x.bossHP<best.bossHP)best=x;if(x.complete)break;}wins.push(best);console.log(best);}fs.writeFileSync(new URL('../docs/boss-pilot-survey.json',import.meta.url),JSON.stringify(wins,null,2));}
