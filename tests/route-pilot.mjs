// Test driver: returns ordinary controls only. Never edits simulation state.
export function createPilot(graph){let path=[],targetKey='',jumpHeld=false,arc=null,clock=0,lastX=0,stuck=0;
 const closest=(p,allowed=()=>true)=>graph.nodes.reduce((best,n)=>allowed(n)&&(!best||Math.hypot(n.x-p.x,n.y-p.y)<Math.hypot(best.x-p.x,best.y-p.y))?n:best,null);
 function plan(p,goal,maxX){const start=closest(p),end=closest(goal,n=>n.x<=maxX);if(!start||!end)return [];const queue=[start.id],prev=new Map([[start.id,null]]);for(let i=0;i<queue.length&&!prev.has(end.id);i++)for(const id of graph.nodes[queue[i]].edges)if(!prev.has(id)&&graph.nodes[id].x<=maxX){prev.set(id,queue[i]);queue.push(id);}if(!prev.has(end.id))return [];const out=[];for(let id=end.id;id!==null;id=prev.get(id))out.unshift(graph.nodes[id]);return out;}
 return r=>{clock++;const p=r.player,l=r.level,b=r.boss;const input={attack:true,run:true};
 if(b?.active&&!b.defeated){const dx=b.x-p.x;let dest=b.x-80;if(b.x<220+l.arena.left)dest=b.x+b.w+65;if(b.state==='windup'&&['slam','thorns','rain'].includes(b.attack))dest=p.x<(l.arena.left+l.arena.right)/2?l.arena.right-120:l.arena.left+100;const d=dest-p.x,threat=b.state==='attack'&&Math.abs(dx)<240||r.bossHazards.some(h=>h.warning<=.1&&Math.abs(h.x-p.x)<100&&Math.abs(h.y-p.y)<130);return {left:d< -18,right:d>18,attack:true,knife:Math.abs(dx)<630&&p.facing===Math.sign(dx)&&Math.abs(p.y-b.y)<150,jump:b.state==='windup'&&b.clock<.24&&['dash','waves','slam','fan','orbs'].includes(b.attack)||threat&&p.grounded,dodge:threat&&p.dodgeCD===0&&clock%2===0,skill:clock%3===0&&Math.abs(dx)<500,skill2:clock%3===1&&Math.abs(dx)<240,summon:clock%30===0&&b.state!=='intro',aimDown:p.y<b.y-10};}
 const chamber=l.chambers.find(c=>!c.complete),sigil=chamber?.sigils.find(z=>!z.taken),enemy=l.enemies.filter(e=>e.alive&&!e.isBoss&&e.warning<=0&&(!chamber?.wavesStarted||e.chamber===chamber.id)&&Math.abs(e.y-p.y)<100).sort((a,b)=>Math.abs(a.x-p.x)-Math.abs(b.x-p.x))[0];
 let goal=sigil?{x:sigil.x,y:sigil.y+sigil.h-44}:chamber?{x:chamber.gateX-95,y:436}:{x:l.goal.x+15,y:436};
 if(chamber?.wavesStarted&&enemy&&enemy.chamber===chamber.id)goal={x:enemy.x-(enemy.x>p.x?65:-65),y:enemy.y+enemy.h-44};
 const lift=l.lifts?.[0];if(chamber?.id===1&&!sigil&&p.y>460&&lift){const dx=lift.x+lift.w/2-14-p.x;return {left:dx< -8,right:dx>8,crouch:p.y>1000,interact:true,attack:true};}
 const key=(chamber?.id??'end')+':'+(sigil?.id??'fight');
 if(Math.abs(p.x-lastX)<.15&&p.grounded)stuck++;else stuck=0;lastX=p.x;
 if(key!==targetKey||!path.length||stuck>90){targetKey=key;path=plan(p,goal,chamber?chamber.gateX-28:Infinity);arc=null;stuck=0;}
 if(p.grounded&&p.jumpHeld){return {...input,jump:false};}
 if(arc){if(!p.grounded)arc.airborne=true;if(p.grounded&&arc.airborne){arc=null;path=[];}else{return {...input,axis:arc.action.speed/272,jump:arc.action.jump,interact:true};}}
 while(path.length>1&&p.grounded&&Math.abs(path[0].x-p.x)<12&&(Math.abs(path[0].y-p.y)<9||(path[0].row===12&&Math.abs(path[0].y-p.y)<65)))path.shift();
 let target=path[0]||goal;let source=closest(p);
 if(p.grounded){let i=0;while(i+1<path.length&&path[i+1].row===path[i].row&&Math.abs(path[i+1].col-path[i].col)===1)i++;if(i>0){target=path[i];path=path.slice(i);}
 const action=source?.actions?.[target.id];if(action?.jump||action&&!action.jump&&target.y>p.y+20){if(Math.abs(p.vx)>5)return {...input};arc={action,airborne:false};return {...input,axis:action.speed/272,jump:action.jump,interact:true};}}
 const dx=target.x-p.x;input.axis=Math.max(-1,Math.min(1,(dx-p.vx*.075)/30));input.jump=false;input.interact=true;
 if(Math.abs(dx)<12&&target.y>p.y+65&&p.grounded){let col=Math.floor((p.x+14)/40),row=Math.floor((p.y+p.h+2)/40);while(l.tiles[row]?.[col])col++;input.axis=1;}
 if(enemy){const d=enemy.x-p.x;input.knife=Math.abs(d)<400&&p.facing===Math.sign(d);input.dodge=enemy.combatState==='attack'&&Math.abs(d)<75&&clock%2===0;input.skill=Math.abs(d)<130&&clock%3===0;input.skill2=Math.abs(d)<100&&clock%3===1;}
 input.debug={target,goal,path:path.length,arc:!!arc};return input;
 };}
