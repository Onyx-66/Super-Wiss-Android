import {TILE,GROUND} from './data.js';
/** Optional authored route features layered onto the existing five-sector maps. */
export function addWorldFeatures(l){
 l.regions=Array.from({length:5},(_,i)=>({id:i,name:['Outer Trail','Windward Climb','Hidden Undercroft','Seal Approach','Sovereign Court'][i],start:i*l.width/5,end:(i+1)*l.width/5}));
 l.zones=[];l.slopes=[];l.switches=[];l.sideGates=[];
 const forbidden=x=>l.chambers.some(c=>x<c.gateX+160&&x+480>c.x-160)||x+480>l.arena.left-100||l.checkpoints.some(c=>Math.abs(c.x-x)<500);
 const locate=f=>{for(let tx=Math.floor(l.cols*f);tx<l.cols-30;tx++){const x=tx*TILE;if(!forbidden(x)&&Array.from({length:12},(_,i)=>l.tiles[12][tx+i]===1&&!l.tiles[11][tx+i]).every(Boolean))return tx;}return null;};
 const ramp=locate(.065);if(ramp!==null)l.slopes.push({x:ramp*TILE,w:240,h:56});
 const cave=locate(.52);
 if(cave!==null){
  const x=cave*TILE;
  for(let col=cave;col<cave+12;col++)for(let row=12;row<15;row++)l.tiles[row][col]=0;
  // Upper bypass and a lower optional room, with a jumpable route back out.
  for(let col=cave+2;col<cave+10;col++)l.tiles[11][col]=5;
  l.tiles[14][cave+10]=5;l.tiles[13][cave+11]=5;
  l.switches.push({x:x+110,y:GROUND+80,w:28,h:40,on:false});
  l.sideGates.push({x:x+270,y:GROUND+40,w:18,h:80,open:false});
  l.chests.push({x:x+355,y:GROUND+82,w:45,h:38,opened:false,type:'heart'});
  l.enemies=l.enemies.filter(e=>e.x<x-40||e.x>x+520);
  l.spikes=l.spikes.filter(e=>e.x<x-40||e.x>x+520);
 }
 const type={coast:'water',ruins:'water',sky:'wind',storm:'wind',cosmic:'gravity',crystal:'gravity'}[l.cfg.biome];
 if(type)for(let i=0;i<4;i++){const col=locate((i+.12)/5);if(col===null)continue;const x=col*TILE;if(!l.zones.some(z=>Math.abs(z.x-x)<450))l.zones.push({type,x,y:type==='water'?GROUND-84:60,w:440,h:type==='water'?84:GROUND-60,strength:i%2?-1:1});}
}
export function sampleWorldPhysics(l,p,time=0){
 const zone=(l.zones||[]).find(z=>p.x+p.w>z.x&&p.x<z.x+z.w&&p.y+p.h>z.y&&p.y<z.y+z.h);
 return {water:zone?.type==='water',gravity:zone?.type==='gravity'?.48:1,wind:zone?.type==='wind'?zone.strength*(120+40*Math.sin(time*.9)):0,current:zone?.type==='water'?zone.strength*75:0,ice:l.cfg.biome==='snow'};
}
export function slopeSurface(s,x){return GROUND-s.h*Math.max(0,1-Math.abs((x-s.x)/s.w*2-1));}
export function stepWorldFeatures(r,input,oldBottom,oldX,wasGrounded,dt){
 if(r.localPvp||r.bossTrial)return;
 const p=r.player,l=r.level;
 for(const s of l.slopes||[]){const x=p.x+p.w/2;if(x<s.x||x>s.x+s.w)continue;const y=slopeSurface(s,x);if(p.vy>=0&&p.y+p.h>=y&&(oldBottom<=y+18||wasGrounded)){p.y=y-p.h;p.vy=0;p.grounded=true;}}
 for(const sw of l.switches||[])if(!sw.on&&input.interact&&Math.abs(sw.x-p.x)<75&&Math.abs(sw.y-p.y)<75){sw.on=true;for(const gate of l.sideGates)gate.open=true;r.events.push({type:'seal-open',x:sw.x,y:sw.y,label:'Secret cache gate opened'});}
 for(const g of l.sideGates||[])if(!g.open&&p.x+p.w>g.x&&p.x<g.x+g.w&&p.y+p.h>g.y&&p.y<g.y+g.h){p.x=oldX<g.x?g.x-p.w:g.x+g.w;p.vx=0;}
 for(const lift of l.lifts||[]){const old=lift.y,on=p.x+p.w>lift.x&&p.x<lift.x+lift.w&&Math.abs(oldBottom-old)<20;if(input.interact&&on&&p.y>900&&l.chambers[lift.seal].sigils.every(s=>s.taken))lift.active=true;if(lift.active&&!l.bridgeOpened){l.bridgeOpened=true;const room=l.chambers[lift.seal],col=Math.floor(room.x/TILE);for(let k=0;k<24;k++)l.tiles[12][col+k]=5;r.events.push({type:'seal-open',x:lift.x,y:lift.y,label:'Return bridge restored'});}
 if(lift.active)lift.y=Math.max(lift.top,lift.y-dt*100);if(on&&p.vy>=0||p.vy>=0&&oldBottom<=old+8&&p.y+p.h>=lift.y&&p.x+p.w>lift.x&&p.x<lift.x+lift.w){p.y=lift.y-p.h;p.vy=0;p.grounded=true;}}
 const index=p.y>520?2:Math.min(4,Math.floor(p.x/l.width*5));if(r.regionIndex!==index){r.regionIndex=index;r.events.push({type:'region',x:p.x,y:p.y,label:l.regions?.[index]?.name||'Adventure'});}
}
