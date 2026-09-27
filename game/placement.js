import {TILE} from './data.js';
export const OCCUPANCY=['SOLID','PLATFORM','HAZARD','PICKUP','POWERUP','CHEST','ENEMY','DECORATION','INTERACTIVE'];
export function occupiedCells(o){const cells=[];for(let y=Math.floor(o.y/TILE);y<=Math.floor((o.y+o.h-.01)/TILE);y++)for(let x=Math.floor(o.x/TILE);x<=Math.floor((o.x+o.w-.01)/TILE);x++)cells.push(x+','+y);return cells;}
export class PlacementGrid{
 constructor(level){this.level=level;this.cells=new Map();for(let y=0;y<level.tiles.length;y++)for(let x=0;x<level.cols;x++)if(level.tiles[y][x])this.cells.set(x+','+y,{category:'SOLID'});}
 canPlace(o){return Number.isFinite(o.x+o.y+o.w+o.h)&&o.w>0&&o.h>0&&o.x>=0&&o.y>=0&&o.x+o.w<=this.level.width&&o.y+o.h<=this.level.height&&!occupiedCells(o).some(k=>this.cells.has(k));}
 reserve(o,category){if(!this.canPlace(o))return false;for(const k of occupiedCells(o))this.cells.set(k,{category,object:o});return true;}
}
export function placementGroups(l){return [['INTERACTIVE',(l.chambers||[]).flatMap(c=>c.sigils)],['INTERACTIVE',l.eggs||[]],['INTERACTIVE',l.checkpoints||[]],['INTERACTIVE',l.switches||[]],['INTERACTIVE',l.sideGates||[]],['PLATFORM',l.platforms||[]],['HAZARD',l.spikes||[]],['HAZARD',l.worldHazards||[]],['INTERACTIVE',l.springs||[]],['CHEST',l.chests||[]],['CHEST',l.crates||[]],['INTERACTIVE',l.shrines||[]],['INTERACTIVE',l.buried||[]],['POWERUP',l.pickups||[]],['ENEMY',l.enemies||[]],['PICKUP',l.coins||[]]];}
export function validatePlacements(l){const grid=new PlacementGrid(l),errors=[];for(const [category,items]of placementGroups(l))for(const o of items)if(!grid.reserve(o,category))errors.push({category,x:o.x,y:o.y});return errors;}
export function finalizePlacements(l){const grid=new PlacementGrid(l);l.placementRejected=[];
 for(const [category,items]of placementGroups(l))for(let i=items.length-1;i>=0;i--){const o=items[i];if(grid.reserve(o,category))continue;let found=false;
 // Required collectibles may shift on their existing ledge, never to an arbitrary void.
 if(category==='INTERACTIVE'&&((l.eggs||[]).includes(o)||(l.chambers||[]).some(c=>c.sigils.includes(o)))){for(const dx of [40,-40,80,-80,120,-120]){const q={...o,x:o.x+dx};const row=Math.floor((q.y+q.h+12)/TILE),col=Math.floor((q.x+q.w/2)/TILE);if(l.tiles[row]?.[col]&&grid.reserve(q,category)){o.x=q.x;found=true;break;}}if(!found)throw Error('Required collectible has no safe position: '+l.id);}
 if(!found){items.splice(i,1);l.placementRejected.push({category,x:o.x,y:o.y});}}
 l.occupancy=grid.cells;
 // Foreground foliage must not obscure an interactable or collectible.
 l.decor=l.decor.filter(d=>!['PICKUP','POWERUP','CHEST','ENEMY','INTERACTIVE'].some(cat=>placementGroups(l).some(([c,items])=>c===cat&&items.some(o=>Math.abs(o.x-d.x)<70&&o.y>340))));return l;
}
export function spawnPickup(l,o){const grid=new PlacementGrid(l);for(const [category,items]of placementGroups(l))for(const other of items)if(!other.taken&&!other.opened&&other.alive!==false)grid.reserve(other,category);for(const [dx,dy]of [[0,0],[0,-40],[40,0],[-40,0],[0,-80],[80,0],[-80,0]]){const q={...o,x:o.x+dx,y:o.y+dy};if(grid.canPlace(q)){l.pickups.push(q);return q;}}return null;}
