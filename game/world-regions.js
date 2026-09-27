import {TILE,GROUND} from './data.js';
export const WORLD_REGIONS=[
 ['Meadow Ruins','Living Canopy','Rootwell Crypt','Vine Fortress','Sunpetal Crown'],['Lantern Wood','Spirit Boughs','Moonwell Descent','Fading Halls','Lunar Court'],['Cloud Moorings','Updraft Spires','Hollow Airship','Storm Bridges','Amber Throne'],['Tidal Walk','Coral Cliffs','Current Vault','Pearl Ruins','Leviathan Shore'],['Snowbound Trail','Icicle Ascent','Frozen Well','Glacier Keep','Frost Crown'],['Gearworks','Clock Tower','Service Shafts','Piston Fortress','Foundry Core'],['Spore Banks','Mushroom Rise','Poison Hollow','Bog Sanctum','Marsh Heart'],['Ash Road','Basalt Climb','Ember Descent','Collapsing Keep','Magma Throne'],['Prism Road','Lightshaft Rise','Crystal Grotto','Mirror Ruins','Prism Crown'],['Broken Causeway','Drowned Tower','Flooded Crypt','Tidal Sanctum','Sunken Throne'],['Spark Road','Conductor Spire','Storm Drain','Charged Bastion','Thunder Court'],['Petal Trail','Mountain Ascent','Windworn Cavern','Summit Shrine','Sakura Crown'],['Circuit Walk','Energy Tower','Data Underpass','Neon Bastion','Nightway Core'],['Sugar Trail','Ribbon Rise','Candy Cavern','Caramel Keep','Candy Crown'],['Comet Trail','Gravity Spires','Starwell Descent','Astral Ruins','Starfall Throne']];
export function buildRegionalRoutes(l){
 const names=WORLD_REGIONS[[0,1,2,3,13,4,5,6,7,8,9,10,11,12,14][l.id]];l.regions=l.regions.map((r,i)=>({...r,name:names[i]}));
 while(l.tiles.length<32)l.tiles.push(Array(l.cols).fill(0));l.height=l.tiles.length*TILE;
 const c=l.chambers[1],col=Math.round(c.x/TILE);c.name=names[2];c.cameraZone={left:c.x-80,right:c.gateX+120,top:300,bottom:1200};
 // A required well descent with a low return collectible: the rightward shortcut cannot unlock its seal.
 for(let x=col;x<col+26;x++)for(let y=12;y<29;y++)l.tiles[y][x]=y===28?1:0;
 for(let y=12;y<29;y++)l.tiles[y][col-1]=5;
 const pads=[[2,14,3],[6,18,3],[10,22,3],[14,26,3],...Array.from({length:6},(_,i)=>[i%2?22:18,25-i*3,3]) , [23,10,3]];
 for(const [x,y,w]of pads)for(let k=0;k<w;k++)l.tiles[y][col+x+k]=5;
 c.sigils=[{id:0,x:(col+4)*TILE+6,y:28*TILE-43,w:26,h:32,taken:false}];
 const inside=o=>o.x>=c.x-40&&o.x<c.gateX;
 for(const key of ['coins','pickups','enemies','chests','crates','shrines','buried','decor','spikes','springs','platforms','checkpoints'])l[key]=l[key].filter(o=>!inside(o));
 // Coin trails have explicit route roles; no random scatter in the multi-floor rooms.
 for(const room of l.chambers){l.coins=l.coins.filter(o=>o.x<room.x||o.x>room.gateX);for(let y=1;y<l.tiles.length;y++)for(let x=Math.floor(room.x/TILE);x<Math.floor(room.gateX/TILE);x++){if(l.tiles[y][x]&&!l.tiles[y-1][x]&&y!==12&&x%2===0)l.coins.push({x:x*TILE+11,y:y*TILE-34,w:18,h:24,taken:false,pattern:'ledge-guidance'});}}
 // A meaningful challenge reward sits beyond the low collectible, not on the main road.
 l.chests.push({x:(col+9)*TILE,y:28*TILE-38,w:45,h:38,opened:false,type:l.id%2?'shield':'heart',challenge:true});
 l.worldHazards=[];
 const mechanic={meadow:'falling-log',forest:'spirit-pulse',sky:'gust',coast:'tide',candy:'bounce',snow:'icicle',clock:'piston',swamp:'spores',lava:'heat-vent',crystal:'crystal-pulse',ruins:'flood',storm:'lightning',sakura:'gust',neon:'laser',cosmic:'gravity-pulse'}[l.cfg.biome];l.environmentMechanic=mechanic;
 for(let region=0;region<4;region++){let tx=Math.floor((region+.6)*l.cols/5);for(let attempts=0;attempts<25;attempts++,tx++){const x=tx*TILE;if(l.tiles[12]?.[tx]&&!l.tiles[11]?.[tx]&&!l.checkpoints.some(q=>Math.abs(q.x-x)<240)&&!l.chambers.some(q=>x>q.x-120&&x<q.gateX+120)&&x<l.arena.left-240){l.worldHazards.push({x,y:GROUND-90,w:32,h:90,kind:mechanic,phase:region*.83,active:false,warning:false});break;}}}
 l.routeMetadata={climb:true,descent:true,backtrack:true,requiredLowSeal:c.sigils[0],returnPads:pads.filter(p=>p[0]>=16),regions:5};
 // Wide late-world gaps receive a lower recovery foothold usable by the slowest hero.
 for(let x=3;x<l.cols-4;x++){if(l.tiles[12][x-1]&&!l.tiles[12][x]){let end=x;while(end<l.cols&&!l.tiles[12][end])end++;if(end-x>=4&&end-x<8)l.tiles[13][x+Math.floor((end-x)/2)]=5;x=end;}}
 for(let row=10;row<28;row++)for(let x=col+24;x<col+26;x++)l.tiles[row][x]=0;
 l.lifts=[{x:c.gateX-80,y:1104,w:70,h:16,bottom:1104,top:GROUND,active:false,seal:1}];
 l.cave={left:c.x,right:c.gateX,top:480,bottom:1120};
 // Every world retains its configured roster and receives an explicit local variant identity.
 for(const e of l.enemies){e.variant=l.cfg.biome;e.accent=l.cfg.grass;e.baseY=e.y;}
 return l;
}
