import test from 'node:test';
import assert from 'node:assert/strict';
import {makeLevel,createRun,stepRun,createBossTrial} from '../game/engine.js';
import {sampleWorldPhysics,slopeSurface,stepWorldFeatures} from '../game/world-physics.js';
import {DT,GROUND} from '../game/data.js';
test('15 maps have five regions, optional ramps and underground switch caches outside seals',()=>{for(let i=0;i<15;i++){const l=makeLevel(i);assert.equal(l.regions.length,5);assert.equal(l.switches.length,1);assert.equal(l.slopes.length,1);const sw=l.switches[0];assert.ok(sw.y>GROUND);assert.ok(l.chambers.every(c=>sw.x<c.x||sw.x>c.gateX));}});
test('named world physics are present and apply only inside marked zones',()=>{for(const [id,type] of [[2,'wind'],[3,'water'],[14,'gravity']]){const l=makeLevel(id);assert.ok(l.zones.length>0);const z=l.zones[0],p={x:z.x+50,y:z.y+20,w:28,h:44},v=sampleWorldPhysics(l,p);assert.equal(z.type,type);assert.ok(type==='wind'?v.wind!==0:type==='water'?v.water:v.gravity<1);p.x=0;const outside=sampleWorldPhysics(l,p);assert.equal(outside.wind,0);assert.equal(outside.water,false);assert.equal(outside.gravity,1);}});
test('Frostpeak retains more momentum than dry ground',()=>{const ice=createRun(5),dry=createRun(0);for(const r of [ice,dry])Object.assign(r.player,{x:130,y:436,vx:300,grounded:true});stepRun(ice,{},DT);stepRun(dry,{},DT);assert.ok(ice.player.vx>dry.player.vx);});
test('switch requires proximity and interact, and opens its optional gate',()=>{const r=createRun(0),s=r.level.switches[0];stepWorldFeatures(r,{interact:true},480,120,true,DT);assert.equal(s.on,false);Object.assign(r.player,{x:s.x,y:s.y});stepWorldFeatures(r,{},580,s.x,false,DT);assert.equal(s.on,false);stepWorldFeatures(r,{interact:true},580,s.x,false,DT);assert.equal(s.on,true);assert.equal(r.level.sideGates[0].open,true);});
test('walking across a slope follows its surface without a jump or tunneling',()=>{const r=createRun(0),s=r.level.slopes[0];r.level.enemies=[];const p=r.player;Object.assign(p,{x:s.x-20,y:436,vx:120,grounded:true});let climbed=false;for(let i=0;i<50;i++){stepRun(r,{right:true,run:false},DT);if(p.x>s.x+30&&p.x<s.x+s.w-30){climbed ||=p.y<420;assert.ok(p.y+p.h<=slopeSurface(s,p.x+p.w/2)+2);}}assert.ok(climbed);});
test('standalone boss arenas exclude exploration zones and gates',()=>{const r=createBossTrial(14);assert.equal(r.level.zones,undefined);assert.equal(r.level.sideGates,undefined);});

import {makeArenaLevel} from '../game/engine.js';
test('all 15 standalone boss arenas have distinct platform layouts',()=>{const layouts=new Set(Array.from({length:15},(_,i)=>JSON.stringify(makeArenaLevel(i).tiles)));assert.equal(layouts.size,15);});
