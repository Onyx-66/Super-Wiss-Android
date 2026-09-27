/** Geometry-aware test pilot. Only ordinary movement, jump and skill inputs. */
import {GROUND,TILE} from '../game/data.js';
import {tileAt} from '../game/engine.js';
const memories=new WeakMap();
export function pilot(r){
 const state=memories.get(r)||{short:false,frames:0};memories.set(r,state);
 const p=r.player,l=r.level;if(p.x>l.goal.x+l.goal.w)return {left:true,run:false};let gap=Infinity,obstacle=Infinity;
 for(let j=0;j<6;j++){const tx=Math.floor((p.x+p.w)/TILE)+j;if(!tileAt(l,tx,12)){gap=tx*TILE-p.x-p.w;break;}}
 for(let j=0;j<4;j++){const tx=Math.floor((p.x+p.w)/TILE)+j;if(tileAt(l,tx,Math.floor((p.y+p.h-2)/TILE))||tileAt(l,tx,Math.floor((p.y+5)/TILE))){obstacle=tx*TILE-p.x-p.w;break;}}
 const spikes=l.spikes.some(e=>e.x-p.x-p.w>-10&&e.x-p.x-p.w<95);
 const enemy=l.enemies.find(e=>e.alive&&e.warning<=0&&e.x-p.x-p.w>-12&&e.x-p.x-p.w<90&&e.y+e.h>p.y+12);
 let danger=gap<73||obstacle<55||spikes||!!enemy;
 // New press on the ground; hold during ascent, release during descent.
 if(p.grounded&&!p.jumpHeld&&danger){state.short=!!enemy&&gap>100&&gap<330;state.frames=0;}else state.frames++;
 let jump=!!((p.grounded&&danger)||(!p.grounded&&p.vy<-70&&p.jumpHeld&&(!state.short||state.frames<7)));
 if(p.grounded&&p.jumpHeld)jump=false;
 const rescue=p.character==='wissem'&&gap<25&&p.y>GROUND-110&&!p.grounded&&p.vy>100;
 const skill=p.cooldown<=0&&(rescue||!!enemy&&(p.character==='wissem'?false:true));
 const skill2=p.cooldown2<=0&&(!!enemy||spikes||gap<80&&['loey','tounsi'].includes(p.character));
 return {right:true,run:true,jump,skill,skill2};
}
