import {buildRegionalRoutes} from './world-regions.js';
import {combatProfile} from './combat-profiles.js';
import {finalizePlacements,spawnPickup} from './placement.js';
import {addWorldFeatures,sampleWorldPhysics,stepWorldFeatures} from './world-physics.js';
import { ascSkill } from './ascension.js';
import { BOSSES, DIFFICULTIES } from './bosses.js';
import { TILE, GROUND, DT, HEROES, WORLDS, POWERS, PETS, heroById, mapObjectives } from './data.js';
export const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
export const overlap = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
const approach = (a, b, n) => a < b ? Math.min(a + n, b) : Math.max(a - n, b);
const distance = (a, b) => Math.hypot(a.x + a.w / 2 - b.x - b.w / 2, a.y + a.h / 2 - b.y - b.h / 2);
const solid = t => t > 0;
export function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
export function tileAt(l, x, y) { if (x < 0 || x >= l.cols)
    return 5; if (y < 0 || y >= l.tiles.length)
    return 0; return l.tiles[y][x]; }
function collisions(l, b) { const out = []; for (let y = Math.floor(b.y / TILE); y <= Math.floor((b.y + b.h - .01) / TILE); y++)
    for (let x = Math.floor(b.x / TILE); x <= Math.floor((b.x + b.w - .01) / TILE); x++) {
        const v = tileAt(l, x, y);
        if (solid(v) && !(b.phase > 0 && [2, 3, 4].includes(v)))
            out.push({ x: x * TILE, y: y * TILE, w: TILE, h: TILE, tx: x, ty: y, v });
    } return out; }
function safeGround(l, x, span = 1) { const t = Math.floor(x / TILE); for (let dx = -1; dx <= span; dx++)
    if (!tileAt(l, t + dx, 12) || tileAt(l, t + dx, 11))
        return false; return true; }
export function makeEnemy(type, x, id, speedScale = 1) { const fly = ['bat', 'wisp', 'drone'].includes(type); return { id, type, x, y: fly ? GROUND - 100 : GROUND - (type === 'golem' ? 48 : 30), baseY: GROUND - 104, w: type === 'golem' ? 42 : 32, h: type === 'golem' ? 48 : 30, vx: (id % 2 ? -1 : 1) * (type === 'crab' ? 65 : type === 'golem' ? 29 : 43) * speedScale, vy: 0, hp: type === 'golem' ? 3 : ['beetle', 'ninja', 'maw', 'drone'].includes(type) ? 2 : 1, alive: true, t: 0, shotTimer: 2.4 + id % 3 * .5, hit: 0, warning: 0 }; }
export function makeLevel(worldId = 0, stage = 0, endless = false) {
    const id = clamp(Math.floor(worldId) || 0, 0, WORLDS.length - 1), cfg = WORLDS[id], cols = cfg.length;
    const pressure = endless ? stage : id;
    const random = rng(2026 + id * 9157 + stage * 113), tiles = Array.from({ length: 16 }, () => Array(cols).fill(0));
    const l = { id, cfg, cols, width: cols * TILE, height: 640, tiles, coins: [], enemies: [], pickups: [], spikes: [], blocks: [], checkpoints: [], springs: [], platforms: [], decor: [], chests: [], crates: [], shrines: [], eggs: [], buried: [], goal: { x: (cols - 5) * TILE, y: GROUND - 210, w: 58, h: 210 }, spawn: { x: 120, y: GROUND - 44 } };
    for (let x = 0; x < cols; x++)
        for (let y = 12; y < 16; y++)
            tiles[y][x] = 1;
    const gaps = cfg.gaps.map((x, i) => ({ x, n: id >= 10 && i % 3 === 0 ? 4 : id >= 3 ? 3 : 2 }));
    for (const g of gaps) {
        for (let x = g.x; x < g.x + g.n; x++)
            for (let y = 12; y < 16; y++)
                tiles[y][x] = 0;
        for (let j = 0; j < g.n + 3; j++)
            l.coins.push({ x: (g.x - 1 + j) * TILE + 12, y: GROUND - 66 - Math.sin(j / (g.n + 2) * Math.PI) * 83, w: 18, h: 24, taken: false });
    }
    const inGapApproach = x => gaps.some(g => x > g.x - 5 && x < g.x + g.n + 4);
    // Deliberate optional upper routes; no mandatory jumps rely on a particular hero skill.
    for (let x = 15, k = 0; x < cols - 12; x += 19 + (id % 4), k++) {
        if (inGapApproach(x) || inGapApproach(x + 4))
            continue;
        const row = k % 3 === 1 ? 8 : 9, span = 3 + (id + k) % 3;
        for (let dx = 0; dx < span; dx++) {
            tiles[row][x + dx] = dx === 1 ? 3 : 2;
            l.coins.push({ x: (x + dx) * TILE + 12, y: row * TILE - 36, w: 18, h: 24, taken: false });
        }
        if(k%4===0)l.blocks.push({ x: x + 1, y: row, power: POWERS[(k + id) % POWERS.length].id });
        if (row === 8 && !inGapApproach(x - 2)) {
            tiles[11][x - 3] = 5;
            tiles[10][x - 2] = 5;
            tiles[11][x - 2] = 5;
        }
    }
    // Safe checkpoint aprons, spaced away from both the start and the portal.
    for (const f of Array.from({ length: cfg.sections }, (_, i) => [(i + .34) / cfg.sections, (i + .67) / cfg.sections]).flat()) {
        let tx = Math.floor(cols * f);
        while (inGapApproach(tx) && tx < cols - 12)
            tx++;
        for (let dx = -2; dx <= 3; dx++) {
            for (let y = 8; y < 12; y++)
                tiles[y][tx + dx] = 0;
            for (let y = 12; y < 16; y++)
                tiles[y][tx + dx] = 1;
        }
        l.checkpoints.push({ x: tx * TILE, y: GROUND - 80, w: 24, h: 80 });
    }
    for (let x = 6; x < cols - 6; x += 6) {
        if (safeGround(l, x * TILE) && !tileAt(l, x, 10))
            l.coins.push({ x: x * TILE + 12, y: GROUND - 47, w: 18, h: 24, taken: false });
    }
    // Power-ups on the main route remain available without hitting an overhead block.
    for (let x = 12, k = 0; x < cols - 8; x += Math.max(12, 25 - Math.floor(pressure / 2)), k++) {
        if (!safeGround(l, x * TILE))
            continue;
        spawnPickup(l,{ x: x * TILE + 4, y: GROUND - 62, w: 28, h: 28, type: POWERS[(k + id) % POWERS.length].id, taken: false });
    }
    if (id >= 4)
        for (let x = 47; x < cols - 12; x += 38 - (id % 3) * 3) {
            if (safeGround(l, x * TILE, 2) && !inGapApproach(x) && !l.checkpoints.some(c => Math.abs(c.x - x * TILE) < 150))
                l.spikes.push({ x: x * TILE + 4, y: GROUND - 20, w: 58, h: 20 });
        }
    if (['sky', 'snow', 'clock', 'storm', 'cosmic'].includes(cfg.biome))
        for (let i = 0; i < gaps.length; i += 2) {
            const g = gaps[i];
            l.platforms.push({ baseX: (g.x - 2) * TILE, baseY: GROUND - 150, x: (g.x - 2) * TILE, y: GROUND - 150, w: 100, h: 16, phase: i, dx: 0 });
        }
    if (id >= 2)
        for (let x = 25; x < cols - 15; x += 48)
            if (safeGround(l, x * TILE) && !inGapApproach(x))
                l.springs.push({ x: x * TILE, y: GROUND - 14, w: 32, h: 14, cool: 0 });
    // Remove monsters from hazard/checkpoint landing zones, not merely from holes.
    l.enemies = l.enemies.filter(e => !l.spikes.some(s => Math.abs(s.x - e.x) < 110) && !l.springs.some(s => Math.abs(s.x - e.x) < 90));
    // Distribute a fixed, increasing monster budget across safe main-route positions.
    const candidates = [];
    for (let tx = 19; tx < cols - 10; tx += 3) {
        const x = tx * TILE;
        if (safeGround(l, x) && !l.checkpoints.some(c => Math.abs(c.x - x) < 140) && !l.spikes.some(z => Math.abs(z.x - x) < 100) && !l.springs.some(z => Math.abs(z.x - x) < 80))
            candidates.push(x);
    }
    const budget = Math.min(candidates.length, Math.floor((cfg.enemyBudget || 7 + Math.floor(Math.min(pressure, 30) * 1.5)) * cfg.sections * (cfg.enemyDensity || 1)));
    const roster = endless && stage >= WORLDS.length ? [...cfg.roster, 'sentry', 'spiker', 'golem'] : cfg.roster;
    l.enemies = Array.from({ length: budget }, (_, k) => makeEnemy(roster[(k + id) % roster.length], candidates[Math.floor(k * candidates.length / budget)], k, 1 + Math.min(1.8, pressure * .035) + Math.floor(k / budget * cfg.sections) * .045));
    const powerPositions = [];
    for (let tx = 12; tx < cols - 9; tx += 4)
        if (safeGround(l, tx * TILE))
            powerPositions.push(tx * TILE);
    const powerBudget = Math.min(powerPositions.length, Math.min(8, cfg.sections + 2));
    l.pickups = Array.from({ length: powerBudget }, (_, k) => ({ x: powerPositions[Math.floor(k * powerPositions.length / powerBudget)] + 4, y: GROUND - 62, w: 28, h: 28, type: POWERS[(k + id) % POWERS.length].id, taken: false }));
    for (let x = 5; x < cols; x += 5 + Math.floor(random() * 5))
        l.decor.push({ x: x * TILE, v: random(), size: .7 + random() * .6 });
    // Each extended sector has sources of its own, not just an empty corridor.
    const place = (fraction) => { let x = Math.floor(cols * fraction) * TILE; while (x < l.goal.x - 220 && !safeGround(l, x, 2))
        x += TILE; return Math.min(x, l.goal.x - 220); };
    for (let sec = 0; sec < cfg.sections; sec++) {
        for (const f of [.76])
            l.chests.push({ x: place((sec + f) / cfg.sections), y: GROUND - 38, w: 45, h: 38, opened: false, type: POWERS[(sec * 3 + id) % POWERS.length].id });
        l.crates.push({ x: place((sec + .48) / cfg.sections), y: GROUND - 34, w: 34, h: 34, opened: false, type: POWERS[(sec * 5 + id + 6) % POWERS.length].id });
        l.buried.push({ x: place((sec + .57) / cfg.sections), y: GROUND - 30, w: 28, h: 28, opened: false });
    }
    l.shrines = l.checkpoints.filter((_, i) => i % 2 === 1).map((c, i) => ({ x: c.x + 64, y: GROUND - 42, w: 35, h: 42, opened: false, type: i % 2 ? 'heart' : 'shield' }));
    for (const pet of PETS.filter(z=>!z.recipe))
        if (pet.unlockWorld === id)
            l.eggs.push({ id: pet.id, x: place(pet.fraction), y: GROUND - 54, w: 35, h: 45, taken: false });
    // Optional authored edits are applied last. Coordinates are tile columns/rows.
    for (const e of cfg.tileEdits || []) {
        if (e.row >= 0 && e.row < 16 && e.col >= 0 && e.col < cols)
            tiles[e.row][e.col] = e.value;
    }
    for (const e of cfg.extraSpawns || []) {
        const x = e.col * TILE, y = e.row * TILE;
        if (e.kind === 'enemy')
            l.enemies.push(makeEnemy(e.type, x, 50000 + l.enemies.length));
        else if (e.kind === 'power')
            spawnPickup(l,{ x, y, w: 28, h: 28, type: e.type, taken: false });
    }
    addChambers(l);
    addWorldFeatures(l);
    const col=Math.floor(l.cols*.84),mx=col*TILE;
    if(mx+480<l.arena.left&&!l.chambers.some(c=>mx<c.gateX+160&&mx+480>c.x-160)){
      for(let k=0;k<8;k++)l.tiles[8][col+k]=5;
      for(let k=0;k<3;k++)l.tiles[10][col-3+k]=5;
      const mini=makeEnemy('golem',mx+110,70000+l.id);Object.assign(mini,{isMiniBoss:true,y:8*TILE-64,h:64,w:48,hp:8,maxHp:8,patrolLeft:mx+15,patrolRight:mx+260});l.enemies.push(mini);
      l.chests.push({x:mx+275,y:8*TILE-38,w:45,h:38,opened:false,type:'shield'});
    }
    return finalizePlacements(buildRegionalRoutes(l));
}
export function createRun(worldId = 0, hero = 'wissem', mode = 'campaign', stage = 0, petId = null, difficulty = 'nightmare') {
    const level = makeLevel(worldId, stage, mode === 'endless');
    const result = { mode, stage, worldId: level.id, level, tick: 0, events: [], complete: false, failed: false, transition: 0, baseDistance: 0, furthest: 120, mapTime: 0, coinCount: 0, kills: 0, powers: 0, skills: 0, hits: 0, knockouts: 0, coinsEarned: 0, score: 0, combo: 0, comboClock: 0, slow: 0, shots: [], spawnSerial: 10000, nextEnemyDistance: 900, nextPowerDistance: 1450, stats: { coins: 0, kills: 0, powers: 0, skills: 0, clears: 0 },
        petId: PETS.some(p => p.id === petId) ? petId : null, petState: { x: 80, y: 400, timer: 0, guard: true, guardTimer: 0, nextFind: 900, nextSupply: 1800 }, petsFound: [], bombs: [], traps: [], turrets: [], powerShot: 0, pulseClock: 0,
        player: { character: heroById(hero).id, x: 120, y: GROUND - 44, w: 28, h: 44, vx: 0, vy: 0, facing: 1, grounded: false, coyote: 0, buffer: 0, jumpHeld: false, skillHeld: false, maxHp: 3, hp: 3, gravity: 0, orbit: 0, fire: 0, ice: 0, giant: 0, thunder: 0, phase: 0, rescue: 0, windwalk: 0, airJump: true, spin: 0, overclock: 0, bastion: 0, crowd: 0, breath: 0, flood: 0, prince: 0, scales: 0, petTime:0, companionCooldown:0, companionCharges:PETS.find(z=>z.id===petId)?.summonCharges||0, skillId1:'',skillId2:'',outfit:'starter', cooldown2: 0, petCooldown: 0, petCooldown2: 0, skillHeld2: false, petHeld: false, petHeld2: false, lives: mode === 'endless' ? 1 : 3, elapsed: 0, deaths: 0, invincible: 0, spark: 0, shield: false, magnet: 0, double: 0, haste: 0, dash: 0, glide: 0, veil: 0, slam: false, cooldown: 0, deadFor: 0, checkpoint: -1, checkpointX: 120, animation: 0, finished: false } };
    initNightfall(result, difficulty);
    return result;
}
function emit(r, type, x = r.player.x, y = r.player.y, extra = {}) { r.events.push({ type, x, y, ...extra }); }
function addScore(r, points, enemy = false) {
    r.combo = Math.min(8, r.combo + 1);
    r.comboClock = 3;
    const combo = 1 + Math.floor(r.combo / 3) * .5;
    const value = Math.round(points * combo * (DIFFICULTIES[r.difficulty]?.score||1)) * (enemy && r.player.breath > 0 ? 3 : 1);
    r.score += value;
    return value;
}
export function defeat(r, e, damage = 1, source = 'hero') {
    if (e.isBoss) return damageBoss(r, e, damage, source);
    if (!e.alive || e.warning > 0)
        return false;
    e.hp -= damage;
    e.hit = .18;e.recoil=Math.sign(e.x-r.player.x)*150;if(source==='melee'){r.impactPause=.035;emit(r,'impact',e.x,e.y);}
    if (e.hp > 0) {
        emit(r, 'armor', e.x, e.y);
        return false;
    }
    e.alive = false;
    r.kills++;
    r.stats.kills++;
    if(source!=='flood'){
    r.player.focus = Math.min(100, (r.player.focus || 0) + 9);
    r.player.soul = Math.min(100, (r.player.soul || 0) + 12);
    if (e.id % 3 === 0) r.player.knives = Math.min(18, (r.player.knives || 0) + 1);
    }
    const points = addScore(r, e.isMiniBoss ? 1400 : e.type === 'golem' ? 400 : 200, true);
    emit(r, 'stomp', e.x, e.y, { value: points, source });
    if (e.id % 5 === 2 && source !== 'flood')
        spawnPickup(r.level,{ x: e.x, y: e.y - 24, w: 28, h: 28, type: POWERS[Math.abs(e.id) % POWERS.length].id, taken: false, pop: .35 });
    return true;
}
function blast(r, radius, damage, x = r.player.x, y = r.player.y) {
    const center = { x, y, w: 28, h: 44 };
    for (const e of r.level.enemies)
        if (e.alive && distance(center, e) < radius)
            defeat(r, e, damage);
    emit(r, 'blast', x, y, { radius });
}
function fireShot(r, { x = r.player.x + 14, y = r.player.y + 16, vx = r.player.facing * 530, vy = 0, kind = 'fire', life = 1.8, damage = 2, homing = false, target = null } = {}) {
    r.shots.push({ x, y, w: 14, h: 14, vx, vy, life, owner: 'hero', hitIds: [], kind, damage, homing, target });
}
export function activateSkill(r, slot = 0) {
    const p = r.player, cd = slot === 1 ? 'cooldown2' : 'cooldown';
    if (![0, 1].includes(slot) || p[cd] > 0 || p.deadFor > 0 || r.complete || r.failed)
        return false;
    const h = heroById(p.character), skill = ascSkill(p[slot===1?'skillId2':'skillId1']) || h.skills[slot], cost = skill.cost ? 50 : slot === 1 ? 38 : 28;
    if (r.localPvp || p.focus < cost || p.globalSkill > 0 || p.stagger > 0) { emit(r, 'denied', p.x, p.y, {label:'Need focus or recovery'}); return false; }
    p.focus -= cost; p.globalSkill = .6;p.castTime=.45;
    p[cd] = skill.cooldown * 1.35;
    r.skills++;
    r.stats.skills++;
    emit(r, 'skill', p.x, p.y, { label: skill.name, hero: h.id, skill: skill.id });
    switch (skill.id) {
        case 'sunlance': fireShot(r,{kind:'knife',vx:p.facing*800,life:1.2,damage:4});p.invincible=Math.max(p.invincible,.12);break;
        case 'rally':p.bastion=1.5;p.stamina=Math.min(100,p.stamina+55);p.soul=Math.min(100,p.soul+10);break;
        case 'frostnova':r.slow=Math.max(r.slow,3);for(const e of r.level.enemies)if(e.alive&&distance(p,e)<260){if(!e.isBoss)e.frozen=3;defeat(r,e,2,'frost');}emit(r,'blast',p.x,p.y,{radius:260});break;
        case 'icevault':p.vy=-670;p.grounded=false;p.glide=1.4;p.veil=1;r.traps.push({x:p.x,y:p.y,life:3,timer:0});break;
        case 'gravity-storm':p.gravity=2.5;p.vy=-520;p.grounded=false;r.slow=2.5;p.thunder=2;break;
        case 'thunder-fang':p.dash=.25;p.thunder=2.5;break;
        case 'eclipse-bloom':p.orbit=3;for(let k=-1;k<=1;k++)fireShot(r,{kind:'shadow',vy:k*130,damage:2});break;
        case 'gravity':
            p.gravity = 4;
            p.vy = -590;
            p.grounded = false;
            break;
        case 'bomba':
            r.bombs.push({ x: p.x + 14, y: p.y + 10, w: 18, h: 18, vx: p.facing * 300, vy: -330, fuse: .65, radius: 205 + 30 * p.crowd });
            break;
        case 'fang':
            p.dash = .35;
            p.invincible = Math.max(p.invincible, .5);
            p.vy = Math.min(0, p.vy);
            break;
        case 'snare':
            r.traps.push({ x: clamp(p.x + p.facing * 95, 30, r.level.goal.x), y: GROUND - 20, w: 160, h: 60, life: 7, pulse: 0 });
            break;
        case 'orbit':
            p.orbit = 6;
            break;
        case 'chrono':
            r.slow = 5;
            break;
        case 'shadow': {
            let safe = p.x;
            for (let d = 8; d <= 160; d += 8) {
                const x = clamp(p.x + p.facing * d, 0, r.level.width - p.w);
                if (collisions(r.level, { ...p, x }).length)
                    break;
                safe = x;
            }
            p.x = safe;
            p.veil = 1.8;
            break;
        }
        case 'blades':
            for (let i = -2; i <= 2; i++)
                fireShot(r, { vx: p.facing * 560, vy: i * 120, kind: 'blade', life: 1.5 });
            break;
        case 'bastion':
            p.bastion = 4;
            break;
        case 'quake':
            if (p.grounded)
                blast(r, 215, 5);
            else {
                p.slam = true;
                p.vy = 980;
                p.invincible = .7;
            }
            break;
        case 'sirocco':
            p.spin = 3;
            p.magnet = Math.max(p.magnet, 3);
            break;
        case 'vault':
            p.vy = -900;
            p.grounded = false;
            p.glide = 3;
            break;
        case 'turret':
            r.turrets.push({ x: p.x, y: p.y, w: 30, h: 32, life: 8, shot: 0 });
            r.turrets = r.turrets.slice(-2);
            break;
        case 'overclock':
            p.overclock = 7;
            p.haste = Math.max(p.haste, 7);
            break;
        case 'arrows': {
            const targets = r.level.enemies.filter(e => e.alive && distance(p, e) < 700).sort((a, b) => distance(p, a) - distance(p, b));
            for (let i = 0; i < 3; i++)
                fireShot(r, { kind: 'arrow', homing: true, target: targets[i % Math.max(1, targets.length)]?.id, vy: (i - 1) * -75, life: 2.5 });
            break;
        }
        case 'windwalk':
            p.windwalk = 6;
            p.glide = 6;
            p.haste = Math.max(p.haste, 6);
            p.airJump = true;
            break;
    }
    return true;
}
export function activatePetSkill(r, slot = 0) {
    const p = r.player, pet = PETS.find(z => z.id === r.petId), skill = pet?.skills[slot];
    const cd = slot === 1 ? 'petCooldown2' : 'petCooldown';
    if (!skill || p[cd] > 0 || p.deadFor > 0 || r.failed || r.complete)
        return false;
    if (p.petTime <= 0 || p.soul < 15 || p.petUses <= 0 || r.localPvp) { emit(r,'denied',p.x,p.y,{label:'Summon first; need 15 soul and an ability charge'}); return false; }
    p.soul -= 15; p.petUses--;
    p[cd] = skill.cooldown;
    p[skill.id] = Math.min(skill.duration,p.petTime);
    emit(r, 'pet-skill', p.x, p.y, { label: skill.name, skill: skill.id });
    if (skill.id === 'flood')
        sweepFlood(r);
    if (skill.id === 'prince' && p.y + p.h > GROUND) {
        p.y = GROUND - p.h;
        p.vy = 0;
        p.grounded = true;
    }
    return true;
}
function sweepFlood(r) {
    for (const e of r.level.enemies)
        if (e.alive) {
            e.warning = 0;
            if (!e.isBoss) defeat(r, e, 10000, 'flood');
        }
    r.shots = r.shots.filter(s => s.owner !== 'foe');
}
export function applyPower(r, type) {
    const p = r.player;
    if (!POWERS.some(z => z.id === type))
        return false;
    emit(r,'power-discovery',p.x,p.y,{power:type});
    r.powers++;
    r.stats.powers++;
    p.focus = Math.min(100, (p.focus || 0) + 12);
    p.knives = Math.min(18, (p.knives || 0) + 2);
    switch (type) {
        case 'heart':
            p.hp = Math.min(p.maxHp, p.hp + 1);
            break;
        case 'shield':
            p.shield = true;
            break;
        case 'spark':
            p.spark = 7;
            break;
        case 'magnet':
            p.magnet = 12;
            break;
        case 'double':
            p.double = 12;
            break;
        case 'haste':
            p.haste = 10;
            break;
        case 'nova':
            p.orbit = 10;
            break;
        case 'fire':
            p.fire = 12;
            break;
        case 'ice':
            p.ice = 12;
            for (const e of r.level.enemies)
                if (distance(p, e) < 550)
                    e.frozen = 3;
            break;
        case 'giant':
            p.giant = 20;
            p.maxHp = 5;
            p.hp = Math.min(5, p.hp + 2);
            break;
        case 'thunder':
            p.thunder = 12;
            break;
        case 'phase':
            p.phase = 6;
            break;
        case 'rescue':
            p.rescue = 1;
            break;
        case 'bomb':
            blast(r, 260, 6);
            break;
    }
    emit(r, 'power', p.x, p.y, { label: POWERS.find(z => z.id === type).name, power: type });
    return true;
}
export function damagePlayer(r, fall = false, amount = 1) {
    const p = r.player;
    if (r.complete || r.failed || p.deadFor > 0)
        return;
    if (fall && p.prince > 0) {
        p.y = GROUND - p.h;
        p.vy = 0;
        p.grounded = true;
        emit(r, 'water-save');
        return;
    }
    if (fall && p.rescue > 0) {
        p.rescue = 0;
        p.x = p.checkpointX;
        p.y = GROUND - 110;
        p.vy = -180;
        p.invincible = 2;
        emit(r, 'rescue');
        return;
    }
    if (!fall && (p.dodge > 0 || p.invincible > 0 || p.spark > 0 || p.veil > 0 || p.dash > 0 || p.phase > 0 || p.bastion > 0))
        return;
    if (!fall && ['turtle','emberguard'].includes(r.petId) && p.petTime>0 && r.petState.guard) {
        r.petState.guard = false;
        r.petState.guardTimer = 18;
        p.invincible = 1.2;
        emit(r, 'shield');
        return;
    }
    if (!fall && p.shield) {
        p.shield = false;
        p.invincible = 1.2;
        emit(r, 'shield');
        return;
    }
    p.hp -= amount;
    p.stagger = .16; p.invincible = .75;
    r.hits++;
    r.combo = 0;
    r.comboClock = 0;
    emit(r, 'hurt');
    if (fall || p.hp <= 0) {
        p.petTime=0;p.scales=0;p.breath=0;p.flood=0;p.prince=0;r.petState.guard=false;
        p.deaths++;
        r.knockouts++;
        p.lives--;
        p.vx = 0;
        p.vy = 0;
        p.deadFor = .65;
        emit(r, 'knockout');
        if (p.lives <= 0) {
            r.failed = true;
            emit(r, 'gameover');
        }
        else {
            p.hp = p.maxHp;
            p.spark = 0;
            p.shield = false;
            p.veil = 0;
            p.dash = 0;
            p.slam = false;
            p.gravity = 0;
        }
    }
    else {
        p.vy = -360;
        p.vx = -p.facing * 160;
    }
}
function updateCompanion(r, dt) {
    if (!r.petId || r.player.petTime<=0)
        return;
    const p = r.player, pet = r.petState;
    const targetX = p.x - 48 * p.facing, targetY = p.y + (['eagle','skywolf'].includes(r.petId) ? -80 : r.petId === 'dragon' ? -55 : r.petId === 'orca' ? -15 : 22);
    pet.x += (targetX - pet.x) * Math.min(1, dt * 6);
    pet.y += (targetY - pet.y) * Math.min(1, dt * 6);
    pet.timer = Math.max(0, pet.timer - dt);
    const enemy = r.level.enemies.filter(e => e.alive && e.warning <= 0 && distance(p, e) < (['wolf','skywolf'].includes(r.petId) ? 175 : 550)).sort((a, b) => distance(p, a) - distance(p, b))[0];
    if (['wolf','skywolf'].includes(r.petId) && enemy && pet.timer <= 0) {
        pet.timer = 1.8;
        pet.attack = .35;
        pet.vx = (enemy.x - pet.x) * 7;
        pet.x += (enemy.x-pet.x)*.22;
        defeat(r, enemy, 2, 'pet');
        emit(r, 'pet-bite', enemy.x, enemy.y);
    }
    if (['fox','emberguard'].includes(r.petId) && enemy && pet.timer <= 0) {
        pet.timer = 2.5;
        fireShot(r, { x: pet.x, y: pet.y, kind: 'fire', homing: true, target: enemy.id });
        emit(r, 'fire-shot', pet.x, pet.y);
    }
    const dist = r.baseDistance + r.furthest;
    if (r.petId === 'mole' && dist >= pet.nextFind) {
        pet.nextFind = dist + 900;
        r.coinsEarned += 8;
        r.stats.coins += 8;
        addScore(r, 800);
        emit(r, 'treasure', p.x, p.y, { label: 'Mole found 8 coins' });
    }
    if (r.petId === 'fox' && dist >= pet.nextSupply) {
        pet.nextSupply = dist + 1800;
        spawnPickup(r.level,{ x: p.x + 100, y: p.y, w: 28, h: 28, type: POWERS[Math.floor(dist / 1800) % POWERS.length].id, taken: false });
    }
    if (['eagle', 'mole','skywolf'].includes(r.petId))
        for (const b of r.level.buried)
            if (!b.opened && Math.abs(b.x - p.x) < (['eagle','skywolf'].includes(r.petId) ? 320 : 80)) {
                b.revealed = true;
                if (Math.abs(b.x - p.x) < 50) {
                    b.opened = true;
                    r.coinsEarned += 10;
                    r.stats.coins += 10;
                    addScore(r, 1000);
                    emit(r, 'treasure', b.x, b.y, { label: 'Hidden treasure • 10 coins' });
                }
            }
}
function updateExtras(r, dt) {
    const p = r.player, l = r.level;
    for (const bomb of r.bombs) {
        bomb.fuse -= dt;
        bomb.vy += 1000 * dt;
        bomb.x += bomb.vx * dt;
        bomb.y += bomb.vy * dt;
        if (collisions(l, bomb).length) {
            bomb.vx *= .35;
            bomb.vy = -Math.abs(bomb.vy) * .3;
            bomb.y -= 6;
        }
        if (bomb.fuse <= 0) {
            blast(r, bomb.radius, 6, bomb.x, bomb.y);
            emit(r, 'bomba', bomb.x, bomb.y);
            const tx = Math.floor(bomb.x / TILE), ty = Math.floor(bomb.y / TILE);
            for (let y = ty - 3; y <= ty + 3; y++)
                for (let x = tx - 4; x <= tx + 4; x++)
                    if (tileAt(l, x, y) === 2) {
                        l.tiles[y][x] = 0;
                        r.score += 25;
                    }
        }
    }
    r.bombs = r.bombs.filter(b => b.fuse > 0);
    for (const trap of r.traps) {
        trap.life -= dt;
        trap.pulse -= dt;
        if (trap.pulse <= 0) {
            trap.pulse = .9;
            for (const e of l.enemies)
                if (e.alive && Math.abs(e.x - trap.x) < 130) {
                    e.frozen = 1;
                    defeat(r, e, 1, 'snare');
                }
        }
    }
    r.traps = r.traps.filter(z => z.life > 0);
    for (const turret of r.turrets) {
        turret.life -= dt;
        turret.shot -= dt;
        const enemy = l.enemies.find(e => e.alive && Math.abs(e.x - turret.x) < 600);
        if (enemy && turret.shot <= 0) {
            turret.shot = .6;
            fireShot(r, { x: turret.x, y: turret.y, kind: 'bolt', homing: true, target: enemy.id, vx: Math.sign(enemy.x - turret.x) * 460 });
        }
    }
    r.turrets = r.turrets.filter(z => z.life > 0);
    r.powerShot -= dt;
    if (r.powerShot <= 0 && (p.fire > 0 || p.ice > 0)) {
        const e = l.enemies.find(e => e.alive && distance(p, e) < 600);
        if (e) {
            fireShot(r, { kind: p.ice > 0 ? 'ice' : 'fire', homing: true, target: e.id });
            r.powerShot = .7;
            emit(r, 'fire-shot');
        }
    }
    r.pulseClock -= dt;
    if (r.pulseClock <= 0) {
        r.pulseClock = .65;
        if (p.orbit > 0 || p.spin > 0 || p.overclock > 0)
            blast(r, p.spin > 0 ? 115 : p.overclock > 0 ? 140 : 85, 1);
        if (p.thunder > 0) {
            const e = l.enemies.find(e => e.alive && distance(p, e) < 650);
            if (e) {
                defeat(r, e, 3, 'thunder');
                emit(r, 'lightning', e.x, e.y);
            }
        }
    }
    for (const [kind, arr] of [['chest', l.chests], ['crate', l.crates], ['shrine', l.shrines]])
        for (const o of arr)
            if (!o.opened && overlap({ ...p, x: p.x - 8, w: p.w + 16 }, o)) {
                o.opened = true;
                emit(r, kind, o.x, o.y, { label: kind === 'chest' ? 'Treasure chest' : kind === 'crate' ? 'Supply crate' : 'Waystone blessing' });
                spawnPickup(l,{ x: o.x, y: o.y - 40, w: 28, h: 28, type: o.type, taken: false, pop: .5 });
                if (kind === 'chest') {
                    r.coinsEarned += 5;
                    r.stats.coins += 5;
                    addScore(r, 500);
                }
            }
    for (const egg of l.eggs)
        if (!egg.taken && overlap(p, egg)) {
            egg.taken = true;
            if (!r.petsFound.includes(egg.id))
                r.petsFound.push(egg.id);
            emit(r, 'pet-found', egg.x, egg.y, { pet: egg.id, label: PETS.find(z => z.id === egg.id).name + ' rescued!' });
        }
    updateCompanion(r, dt);
    if (p.flood > 0)
        sweepFlood(r);
}
function hitBlock(r, b) { if (b.tx < 0 || b.tx >= r.level.cols || b.ty < 0)
    return; if (b.v === 3) {
    r.level.tiles[b.ty][b.tx] = 4;
    const z = r.level.blocks.find(z => z.x === b.tx && z.y === b.ty);
    spawnPickup(r.level,{ x: b.x + 6, y: b.y - 34, w: 28, h: 28, type: z?.power || 'shield', taken: false, pop: .4 });
    emit(r, 'block', b.x, b.y);
}
else if (b.v === 2) {
    r.level.tiles[b.ty][b.tx] = 0;
    r.score += 25;
    emit(r, 'break', b.x, b.y);
} }
function spawnAhead(r, type) {
    const l = r.level, p = r.player;
    let x = p.x + 650;
    while (x < Math.min(l.goal.x - 180, p.x + 1000) && !safeGround(l, x, 2))
        x += 40;
    if (x >= l.goal.x - 180 || !safeGround(l, x, 2))
        return;
    if (type === 'enemy') {
        if (p.flood > 0)
            return;
        if (l.enemies.filter(e => e.alive && Math.abs(e.x - p.x) < 1300).length >= 28)
            return;
        if (l.enemies.some(e => e.alive && Math.abs(e.x - x) < 110))
            return;
        const e = makeEnemy(l.cfg.roster[r.spawnSerial % l.cfg.roster.length], x, r.spawnSerial++, 1 + Math.min(1.8, r.stage * .035));
        e.warning = .8;
        e.dynamic = true;
        l.enemies.push(e);
    }
    else {
        spawnPickup(l,{ x, y: GROUND - 58, w: 28, h: 28, type: POWERS[r.spawnSerial++ % POWERS.length].id, taken: false, dynamic: true });
    }
}
export function stageRates(stage) { return { enemyGap: Math.max(220, 950 - stage * 32), powerGap: Math.max(380, 1500 - stage * 42), speedScale: 1 + Math.min(1.8, stage * .035) }; }
export function advanceEndless(r) { if (r.mode !== 'endless')
    return false; r.baseDistance += r.level.goal.x - 120; r.stage++; r.worldId = r.stage % WORLDS.length; r.score += 1000 + Math.min(20, r.stage) * 100; r.stats.clears++; r.level = makeLevel(r.worldId, r.stage, true); r.furthest = 120; r.mapTime = 0; r.coinCount = 0; r.kills = 0; r.powers = 0; r.skills = 0; r.knockouts = 0; r.hits = 0; r.slow = 0; r.shots = []; r.bombs = []; r.traps = []; r.turrets = []; const p = r.player; Object.assign(p, { x: 120, y: GROUND - 44, vx: 0, vy: 0, grounded: false, coyote: 0, buffer: 0, jumpHeld: false, checkpoint: -1, checkpointX: 120, dash: 0, slam: false, invincible: 2 }); r.nextEnemyDistance = r.baseDistance + stageRates(r.stage).enemyGap; r.nextPowerDistance = r.baseDistance + stageRates(r.stage).powerGap; if (p.flood > 0)
    sweepFlood(r); resetNightfallWorld(r); r.transition = 1.2; emit(r, 'world', 120, GROUND - 100, { label: r.level.cfg.name, stage: r.stage }); return true; }
export function stepRun(r, input = {}, dt = DT) {
    r.events = [];
    if (r.complete || r.failed)
        return;
    r.tick++;
    dt = clamp(Number.isFinite(dt) ? dt : DT, 0, 1 / 30);
    const p = r.player, l = r.level;
    p.elapsed += dt;
    r.mapTime += dt;
    if(r.impactPause>0&&!r.localPvp){r.impactPause=Math.max(0,r.impactPause-dt);return;}
    p.animation += dt;
    r.transition = Math.max(0, r.transition - dt);
    r.comboClock = Math.max(0, r.comboClock - dt);
    if (!r.comboClock)
        r.combo = 0;
    r.slow = Math.max(0, r.slow - dt);
    const hadPhase = p.phase > 0;
    for (const k of ['invincible', 'spark', 'magnet', 'double', 'haste', 'dash', 'glide', 'veil', 'gravity', 'orbit', 'fire', 'ice', 'giant', 'thunder', 'phase', 'windwalk', 'spin', 'overclock', 'bastion', 'breath', 'flood', 'prince', 'petCooldown', 'petCooldown2', 'petTime','companionCooldown','wallTime','wallKick'])
        p[k] = Math.max(0, p[k] - dt);
    if(p.petTime<=0){p.scales=0;p.breath=0;p.flood=0;p.prince=0;r.petState.guard=false;}
    p.crowd = p.character === 'wissem' ? Math.min(3, Math.floor(l.enemies.filter(e => e.alive && distance(p, e) < 300).length / 3)) : 0;
    const recharge = 1 + p.crowd * .25;
    p.cooldown = Math.max(0, p.cooldown - dt * recharge);
    p.cooldown2 = Math.max(0, p.cooldown2 - dt * recharge);
    if (p.giant <= 0 && p.maxHp > (p.baseHp || 3)) {
        p.maxHp = p.baseHp || 3;
        p.hp = Math.min(p.hp, p.maxHp);
    }
    if (hadPhase && p.phase <= 0 && collisions(l, p).length) {
        let fixed = false;
        for (let d = 0; d < 400 && !fixed; d += 40)
            for (const sign of [1, -1]) {
                const test = { ...p, x: clamp(p.x + d * sign, 0, l.width - p.w) };
                if (!collisions(l, test).length) {
                    p.x = test.x;
                    fixed = true;
                    break;
                }
            }
        if (!fixed) {
            p.x = p.checkpointX;
            p.y = GROUND - p.h;
        }
    }
    if (p.deadFor > 0) {
        p.deadFor -= dt;
        if (p.deadFor <= 0) {
            Object.assign(p, { x: p.checkpointX, y: (p.checkpointY||GROUND) - 44, h:44,vx: 0, vy: 0, invincible: 2.5, grounded: false, jumpHeld: false, coyote: 0, buffer: 0 });
        }
        return;
    }
    const foot=p.y+p.h, targetHeight=input.crouch&&p.grounded?26:44;
    const standing={...p,y:foot-targetHeight,h:targetHeight};
    if(targetHeight<p.h||(!collisions(l,standing).length&&!(l.sideGates||[]).some(g=>!g.open&&overlap(g,standing)))){p.h=targetHeight;p.y=foot-targetHeight;}
    p.crouching=p.h<44;p.crouchBlend=approach(p.crouchBlend||0,p.crouching?1:0,dt*12);
    const left = input.left === true, right = input.right === true, jump = input.jump === true, skill = input.skill === true;
    const dir = (left || right) ? (right ? 1 : 0) - (left ? 1 : 0) : clamp(Number.isFinite(input.axis) ? input.axis : 0, -1, 1);
    if (dir)
        p.facing = Math.sign(dir);
    if (skill && !p.skillHeld)
        activateSkill(r);
    p.skillHeld = skill;
    if (input.skill2 && !p.skillHeld2)
        activateSkill(r, 1);
    p.skillHeld2 = input.skill2 === true;
    if (input.pet && !p.petHeld)
        activatePetSkill(r, 0);
    p.petHeld = input.pet === true;
    if (input.pet2 && !p.petHeld2)
        activatePetSkill(r, 1);
    p.petHeld2 = input.pet2 === true;
    updateCombat(r, input, dt);
    const physics=r.localPvp||r.bossTrial?{water:false,gravity:1,wind:0,current:0,ice:false}:sampleWorldPhysics(l,p,p.elapsed);
    const wasGrounded=p.grounded;
    const profile=combatProfile(p);
    const topSpeed = profile.speed * (p.crouching?.4:1) * (physics.water?.72:1) * (input.run === false ? 260 : 340) * (p.haste > 0 ? 1.2 : 1) * (1 + p.crowd * .045), accel = p.grounded ? (physics.ice ? (dir?850:260) : 2300*profile.accel) : 1450*profile.air;
    p.vx = p.wallKick>0 ? p.vx : p.dodge > 0 ? p.facing * 620 : p.stagger > 0 ? p.vx : p.dash > 0 ? p.facing * 690 : approach(p.vx, dir * topSpeed+physics.wind+physics.current, accel * dt);
    if(physics.water){p.vy*=Math.pow(.16,dt);if(jump)p.vy=Math.max(-280,p.vy-1200*dt);}
    if (jump && !p.jumpHeld)
        p.buffer = .14;
    else
        p.buffer = Math.max(0, p.buffer - dt);
    p.coyote = p.grounded ? .11 : Math.max(0, p.coyote - dt);
    if (p.grounded)
        p.airJump = true;
    if(p.buffer>0&&p.wallTime>0&&!p.grounded&&p.coyote<=0){p.vy=-690;p.vx=-p.wallDir*390;p.facing=-p.wallDir;p.wallKick=.16;p.wallTime=0;p.buffer=0;emit(r,'jump',p.x,p.y,{label:'Wall kick'});}
    if (p.buffer > 0 && (p.coyote > 0 || (p.windwalk > 0 && p.airJump && !p.grounded))) {
        if (!p.grounded)
            p.airJump = false;
        p.vy = p.gravity > 0 ? -620 : -755;
        p.grounded = false;
        p.coyote = 0;
        p.buffer = 0;
        emit(r, 'jump');
    }
    if (!jump && p.jumpHeld && p.vy < -290 && p.glide <= 0 && p.gravity <= 0)
        p.vy = -290;
    p.jumpHeld = jump;
    p.vy = p.dash > 0 ? Math.min(0, p.vy) : Math.min(p.glide > 0 ? 170 : p.gravity > 0 ? 140 : 1050, p.vy + 1940 * physics.gravity * (physics.water?.35:1) * (p.gravity > 0 ? .27 : 1) * dt);
    if (p.slam)
        p.vy = 1000;
    if (p.y < 25) {
        p.y = 25;
        p.vy = Math.max(0, p.vy);
    }
    const oldBottom = p.y + p.h, oldX = p.x;
    p.x += p.vx * dt;
    for (const b of collisions(l, p)) {
        if(!p.grounded&&dir){p.wallDir=Math.sign(dir);p.wallTime=.12;if(p.vy>90)p.vy=90;}
        if (p.vx > 0)
            p.x = b.x - p.w;
        else if (p.vx < 0)
            p.x = b.x + b.w;
        p.vx = 0;
    }
    p.x = clamp(p.x, 0, l.width - p.w);
    resolveGates(r, oldX);
    const vertical = p.vy;
    p.y += vertical * dt;
    p.grounded = false;
    const cs = collisions(l, p);
    cs.sort((a, b) => vertical < 0 ? b.y - a.y : a.y - b.y);
    for (const b of cs) {
        if (!overlap(p, b))
            continue;
        if (vertical > 0) {
            p.y = b.y - p.h;
            p.vy = 0;
            p.grounded = true;
        }
        else if (vertical < 0) {
            p.y = b.y + b.h;
            p.vy = 0;
            hitBlock(r, b);
        }
    }
    for (const m of l.platforms) {
        const prevX = m.x;
        m.x = m.baseX + Math.sin(p.elapsed * 1.1 + m.phase) * 60;
        m.dx = m.x - prevX;
        m.y = m.baseY + Math.sin(p.elapsed * .8 + m.phase) * 22;
        if (vertical >= 0 && oldBottom <= m.y + 8 && p.y + p.h >= m.y && p.y + p.h <= m.y + 30 && p.x + p.w > m.x && p.x < m.x + m.w) {
            p.y = m.y - p.h;
            p.vy = 0;
            p.grounded = true;
            p.x += m.dx;
        }
    }
    if(p.grounded&&!wasGrounded&&vertical>150){p.landTime=.18;emit(r,'land',p.x,p.y,{weight:p.character==='garsi'?1:.4});}
    stepWorldFeatures(r,input,oldBottom,oldX,wasGrounded,dt);
    if (p.prince > 0 && p.y + p.h >= GROUND && !tileAt(l, Math.floor((p.x + p.w / 2) / TILE), 12)) {
        p.y = GROUND - p.h;
        p.vy = 0;
        p.grounded = true;
    }
    if (p.grounded && p.slam) {
        blast(r, 205, 4);
        p.slam = false;
    }
    for (const s of l.springs) {
        s.cool = Math.max(0, s.cool - dt);
        if (s.cool === 0 && p.vy >= 0 && overlap(p, s)) {
            p.vy = -925;
            p.grounded = false;
            s.cool = .45;
            emit(r, 'spring', s.x, s.y);
        }
    }
    for (const c of l.coins) {
        if (c.taken || Math.abs(c.x - p.x) > 400)
            continue;
        if ((p.magnet > 0 || p.petTime>0 && ['eagle','skywolf'].includes(r.petId)) && distance(p, c) < (p.magnet > 0 ? 240 : 110)) {
            const dx = p.x + 14 - c.x, dy = p.y + 12 - c.y, d = Math.max(1, Math.hypot(dx, dy));
            c.x += dx / d * 600 * dt;
            c.y += dy / d * 600 * dt;
        }
        if (overlap(p, c)) {
            c.taken = true;
            const value = p.double > 0 ? 2 : 1;
            r.coinCount++;
            r.stats.coins++;
            r.coinsEarned += value;
            addScore(r, 100 * value);
            emit(r, 'coin', c.x, c.y, { value });
        }
    }
    for (const u of l.pickups)
        if (!u.taken && overlap(p, u)) {
            u.taken = true;
            applyPower(r, u.type);
        }
    updateExtras(r, dt);
    updateChambers(r, dt);
    for(const h of l.worldHazards||[]){const phase=(p.elapsed+h.phase)%4.6;h.warning=phase>2.7&&phase<3.4;h.active=phase>=3.4&&phase<4.15;if(h.active&&overlap(p,h)){if(['gust','tide','flood','gravity-pulse'].includes(h.kind)){p.vy=Math.min(p.vy,-230);p.vx+=Math.sin(p.elapsed)*35;}else if(h.kind==='bounce')p.vy=-820;else damagePlayer(r);}}
    updateBoss(r, dt);
    const edt = dt * (r.slow > 0 ? .25 : 1);
    for (const e of l.enemies) {
        if (!e.alive || Math.abs(e.x - p.x) > 1350)
            continue;
        if (e.isBoss) continue;
        e.t += edt;
        e.hit = Math.max(0, e.hit - dt);if(e.hit>0&&e.recoil){const q={...e,x:e.x+e.recoil*dt};if(!collisions(l,q).length)e.x=q.x;e.recoil*=.8;}
        if (e.warning > 0) {
            e.warning -= dt;
            continue;
        }
        if (e.frozen > 0) {
            e.frozen = Math.max(0, e.frozen - dt);
            continue;
        }
        if(e.isMiniBoss&&(e.x<e.patrolLeft||e.x>e.patrolRight)){e.x=clamp(e.x,e.patrolLeft,e.patrolRight);e.vx=-e.vx;}
        e.combatClock=Math.max(0,(e.combatClock||0)-dt);
        if(!e.combatState)e.combatState='patrol';
        if(e.combatState==='patrol'&&Math.abs(e.x-p.x)<150&&Math.abs(e.y-p.y)<85){e.combatState='anticipate';e.combatClock=.34;e.attackDirection=Math.sign(p.x-e.x)||1;}
        if(e.combatState==='anticipate'&&e.combatClock<=0){e.combatState='attack';e.combatClock=.18;}
        if(e.combatState==='attack'&&e.combatClock<=0){e.combatState='recover';e.combatClock=.55;}
        if(e.combatState==='recover'&&e.combatClock<=0)e.combatState='patrol';
        if(e.hit>0||e.combatState==='anticipate'||e.combatState==='recover')continue;
        if(e.combatState==='attack'&&!['sentry','maw','bat','wisp','drone'].includes(e.type))e.vx=e.attackDirection*125;
        const ex = e.x;
        if (['bat', 'wisp', 'drone'].includes(e.type)) {
            e.x += e.vx * edt;
            e.y = e.baseY + Math.sin(e.t * 2.8 + e.id) * 31;
            if (e.x < 120 || e.x > l.goal.x - 80)
                e.vx *= -1;
        }
        else if (['sentry', 'maw'].includes(e.type)) {
            e.shotTimer -= edt;
            if (e.shotTimer < 0 && Math.abs(e.x - p.x) < 660) {
                e.shotTimer = 2.8 / (DIFFICULTIES[r.difficulty]?.enemy || 1);
                r.shots.push({ x: e.x + 16, y: e.y + 12, w: 12, h: 12, vx: Math.sign(p.x - e.x) * 165, vy: 0, life: 4, owner: 'foe' });
                emit(r, 'shot', e.x, e.y);
            }
        }
        else {
            if (['crab', 'ninja'].includes(e.type) && Math.abs(e.x - p.x) < 210)
                e.vx = approach(e.vx, Math.sign(p.x - e.x) * 110, 110 * edt);
            e.x += e.vx * edt;
            if (['hopper', 'imp'].includes(e.type)) {
                e.vy += 1600 * edt;
                e.y += e.vy * edt;
                if (e.y + e.h >= GROUND) {
                    e.y = GROUND - e.h;
                    if (e.t > 1.2) {
                        e.vy = -410;
                        e.t = 0;
                    }
                    else
                        e.vy = 0;
                }
            }
            const front = e.vx > 0 ? e.x + e.w + 3 : e.x - 3;
            if (!solid(tileAt(l, Math.floor(front / TILE), 12)) || collisions(l, { ...e, y: GROUND - e.h }).length) {
                e.x = ex;
                e.vx *= -1;
            }
        }
        if(e.chamber!==undefined){const room=l.chambers[e.chamber];if(room){if(e.x<room.x+50){e.x=room.x+50;e.vx=Math.abs(e.vx);}if(e.x+e.w>room.gateX-10){e.x=room.gateX-e.w-10;e.vx=-Math.abs(e.vx);}}}
        if (overlap(p, e)) {
            if (p.scales > 0) {
                p.scales--;
                defeat(r, e, 10000, 'scales');
                p.invincible = Math.max(p.invincible, .12);
                emit(r, 'scales', e.x, e.y);
            }
            else if (p.flood > 0) {
                defeat(r, e, 10000, 'flood');
            }
            else if (p.fire > 0 && e.type === 'imp') {
                defeat(r, e, 4, 'fire');
            }
            else if (p.spark > 0 || p.dash > 0 || p.slam) {
                defeat(r, e, 4);
            }
            else if (vertical > 40 && oldBottom <= e.y + 15 && !['spiker', 'maw'].includes(e.type)) {
                defeat(r, e, 1);
                p.vy = jump ? -560 : -420;
                emit(r, 'bounce', e.x, e.y);
            }
            else
                damagePlayer(r);
        }
    }
    for (const s of r.shots) {
        if (s.homing) {
            const target = l.enemies.find(e => e.alive && e.id === s.target) || l.enemies.find(e => e.alive && distance(p, e) < 600);
            if (target) {
                const dx = target.x + target.w / 2 - s.x, dy = target.y + target.h / 2 - s.y, d = Math.max(1, Math.hypot(dx, dy));
                s.vx = dx / d * 510;
                s.vy = dy / d * 510;
            }
        }
        const sd = s.owner === 'foe' ? edt : dt;
        s.x += s.vx * sd;
        s.y += s.vy * sd;
        s.life -= sd;
        if (s.owner === 'foe' && overlap(p, s)) {
            if (p.bastion > 0) {
                s.owner = 'hero';
                s.vx *= -1;
                s.hitIds = [];
                s.damage = 3;
                s.life = 2;
            }
            else {
                if (p.flood <= 0)
                    damagePlayer(r);
                s.life = 0;
            }
        }
        if (s.owner === 'hero')
            for (const e of l.enemies)
                if (e.alive && !s.hitIds.includes(e.id) && overlap(s, e)) {
                    defeat(r, e, s.damage || 2, s.kind === 'knife' ? 'knife' : 'projectile');
                    if (s.kind === 'knife') s.life = 0;
                    if (s.kind === 'ice')
                        e.frozen = 2;
                    s.hitIds.push(e.id);
                }
        if (collisions(l, s).length)
            s.life = 0;
    }
    r.shots = r.shots.filter(s => s.life > 0 && Math.abs(s.x - p.x) < 1400).slice(-48);
    for (const s of l.spikes)
        if (overlap(p, s))
            damagePlayer(r);
    for (const [i, c] of l.checkpoints.entries())
        if (i > p.checkpoint && p.x + p.w > c.x && p.x < c.x + c.w + 35 && p.y > c.y - 35 && p.y<c.y+c.h+45) {
            p.checkpoint = i;
            p.checkpointX = c.x;p.checkpointY=c.y+c.h;
            p.hp = Math.min(p.maxHp, Math.max(p.hp, 2));
            r.score += 250;
            emit(r, 'checkpoint', c.x, c.y);
        }
    if (p.y > l.height + 80)
        damagePlayer(r, true);
    if (p.x > r.furthest) {
        r.score += Math.max(0, Math.floor(p.x / 10) - Math.floor(r.furthest / 10));
        r.furthest = p.x;
    }
    if (r.mode === 'endless') {
        const dist = r.baseDistance + r.furthest - 120, rates = stageRates(r.stage);
        if (dist > r.nextEnemyDistance) {
            spawnAhead(r, 'enemy');
            r.nextEnemyDistance = dist + rates.enemyGap;
        }
        if (dist > r.nextPowerDistance) {
            spawnAhead(r, 'power');
            r.nextPowerDistance = dist + rates.powerGap;
        }
        l.enemies = l.enemies.filter(e => !e.dynamic || e.x > p.x - 1450);
        l.pickups = l.pickups.filter(u => !u.dynamic || u.x > p.x - 1000);
    }
    if (!r.failed && !r.localPvp && r.boss?.defeated && l.chambers.every(c => c.complete) && overlap(p, l.goal)) {
        if (r.mode === 'endless') {
            advanceEndless(r);
        }
        else {
            p.finished = true;
            r.complete = true;
            r.stats.clears++;
            r.score += Math.max(0, 2000 - Math.floor(r.mapTime * 10));
            emit(r, 'finish', p.x, p.y);
        }
    }
}
export function objectiveResults(r) { return mapObjectives(r.worldId).map(o => { let value = false; switch (o.key) {
    case 'clear':
        value = r.complete;
        break;
    case 'coins':
        value = r.coinCount >= o.target;
        break;
    case 'kills':
        value = r.kills >= o.target;
        break;
    case 'powers':
        value = r.powers >= o.target;
        break;
    case 'skills':
        value = r.skills >= o.target;
        break;
    case 'clean':
        value = r.knockouts === 0;
        break;
    case 'time':
        value = r.mapTime + r.knockouts * 3 <= o.target;
        break;
} return { ...o, done: r.complete && value }; }); }
export function formatTime(s) { if (!Number.isFinite(s))
    return '—'; return `${Math.floor(s / 60)}:${(s % 60).toFixed(1).padStart(4, '0')}`; }
export function runDistance(r) { return Math.floor((r.baseDistance + r.furthest - 120) / 40); }

// ─── NIGHTFALL COMBAT / EXPLORATION ──────────────────────────────────────────
// Bosses use their own state machine. Ordinary enemies remain in the original
// simulation; no client-submitted scores or positional teleports are used.
export function addChambers(l) {
    l.chambers = [];
    for (let i = 0; i < 3; i++) {
        const col = Math.floor(l.cols * [.20, .46, .72][i]);
        const chamber = { id:i, name:['The Ascent','The Return','Twin Reliquaries'][i], x:col*TILE, gateX:(col+26)*TILE, width:27*TILE, complete:false, wavesStarted:false, waveIds:[], sigils:[] };
        // Replace the local corridor with a climbable room, not just an image.
        for (let x=col; x<=col+27; x++) for(let y=0;y<16;y++) l.tiles[y][x]=y>=12?1:0;
        const pads = i===0?[[2,10,4],[7,8,4],[12,6,5]]:i===1?[[20,10,4],[15,8,4],[10,6,4],[4,4,5]]:[[2,10,4],[7,8,4],[12,6,4],[18,4,5]];
        for (const [off,row,span] of pads) for(let k=0;k<span;k++) l.tiles[row][col+off+k]=5;
        const points=i===0?[[14,6]]:i===1?[[6,4]]:[[8,8],[20,4]];
        chamber.sigils=points.map(([x,y],k)=>({id:k,x:(col+x)*TILE,y:y*TILE-43,w:26,h:32,taken:false}));
        const inside=o=>o.x>=col*TILE-80&&o.x<(col+28)*TILE+80;
        l.spikes=l.spikes.filter(o=>!inside(o)); l.springs=l.springs.filter(o=>!inside(o)); l.platforms=l.platforms.filter(o=>!inside(o));
        l.enemies=l.enemies.filter(o=>!inside(o)); l.pickups=l.pickups.filter(o=>!inside(o));
        l.chambers.push(chamber);
    }
    // A real enclosed final arena, reached only after the three seals.
    l.arena={left:l.goal.x-1320,right:l.goal.x-120,floor:GROUND};
    const col=Math.floor(l.arena.left/TILE);
    for(let x=col;x<l.cols;x++)for(let y=0;y<16;y++)l.tiles[y][x]=y>=12?1:0;
    for(const [off,row,span]of arenaPlatforms(l.id))for(let k=0;k<span;k++)l.tiles[row][col+off+k]=5;
    for(const key of ['spikes','springs','platforms','enemies','pickups'])l[key]=l[key].filter(o=>o.x<l.arena.left-80);
    l.shrines.push({x:l.arena.left-130,y:GROUND-42,w:35,h:42,opened:false,type:'heart'});
}
export function arenaPlatforms(id){return id===0?[[8,9,4],[24,8,4]]:[[6+id%4,8+id%2,3+id%3],[21+id%5,7+Math.floor(id/5),3+(id+1)%3]];}
export function makeArenaLevel(id=0) {
    const cfg=WORLDS[clamp(id,0,WORLDS.length-1)], cols=40;
    const l={id:cfg.id,cfg,cols,width:cols*TILE,height:640,tiles:Array.from({length:16},(_,y)=>Array(cols).fill(y>=12?1:0)),coins:[],enemies:[],pickups:[],spikes:[],blocks:[],checkpoints:[],springs:[],platforms:[],decor:[],chests:[],crates:[],shrines:[],eggs:[],buried:[],chambers:[],goal:{x:1480,y:GROUND-210,w:58,h:210},spawn:{x:160,y:GROUND-44},arena:{left:50,right:1420,floor:GROUND}};
    for(const [x,y,span]of arenaPlatforms(cfg.id))for(let k=0;k<span;k++)l.tiles[y][x+k]=5;
    return l;
}
function newBoss(r) {
    const cfg=BOSSES[r.worldId%BOSSES.length], a=r.level.arena;
    const b={...makeEnemy(cfg.sprite,a.right-230,900000+r.worldId,1),isBoss:true,configId:cfg.id,name:cfg.name,title:cfg.title,color:cfg.color,w:100,h:116,hp:cfg.hp,maxHp:cfg.hp,y:GROUND-116,baseY:GROUND-116,phase:1,state:'dormant',clock:0,attackIndex:0,attack:'',cool:0,invuln:0,defeated:false,active:false,targetX:0,direction:-1,stagger:0,maxStagger:40,staggerLock:0};
    r.level.enemies.push(b);r.boss=b;
}
function initNightfall(r,difficulty) {
    r.difficulty=DIFFICULTIES[difficulty]?difficulty:'nightmare';
    r.bossHazards=[];r.summon=null;r.summonChoice='warden';r.combatTime=0;r.bossTime=0;r.stats.bosses=0;r.stats.summons=0;r.stageIndex=0;
    const d=DIFFICULTIES[r.difficulty],p=r.player;
    Object.assign(p,{baseHp:d.health,maxHp:d.health,hp:d.health,lives:r.mode==='endless'?1:r.difficulty==='inferno'?1:r.difficulty==='nightmare'?2:3,focus:100,soul:70,stamina:100,knives:12,summonCharges:2,petUses:2,globalSkill:0,dodge:0,dodgeCD:0,attackCD:0,attackTime:0,attackSerial:0,attackChain:0,attackHits:[],throwCD:0,summonCD:0,stagger:0,combatIdle:0,wallDir:0,wallTime:0,wallKick:0});
    for(const e of r.level.enemies){e.vx*=d.enemy;e.hp+=r.difficulty==='inferno'?1:0;}
    // Fewer passive power-ups. Every pickup also restores ammunition/focus.
    r.level.pickups=r.level.pickups.filter((_,i)=>i%(r.difficulty==='veteran'?2:3)===0);
    newBoss(r);
}
function resetNightfallWorld(r) {r.bossHazards=[];r.stageIndex=0;r.summon=null;const d=DIFFICULTIES[r.difficulty];for(const e of r.level.enemies){e.vx*=d.enemy;e.hp+=r.difficulty==='inferno'?1:0;}r.level.pickups=r.level.pickups.filter((_,i)=>i%(r.difficulty==='veteran'?2:3)===0);newBoss(r);}
export function createBossTrial(id=0,hero='wissem',difficulty='nightmare',pet=null) {
    const r=createRun(id,hero,'boss',0,pet,difficulty);
    r.level=makeArenaLevel(id);r.bossHazards=[];newBoss(r);r.player.x=160;r.player.checkpointX=160;r.player.lives=1;r.bossTrial=true;r.furthest=160;
    startBoss(r);return r;
}
export function startBoss(r) {
    const b=r.boss;if(!b||b.active||b.defeated)return false;
    b.active=true;b.state='intro';b.clock=1.6;b.invuln=1.6;r.bossTime=0;
    r.player.checkpointX=r.level.arena.left+60;
    // Remove the possibility of stacking long invulnerability before entering.
    for(const k of ['spark','veil','bastion','phase','dash'])r.player[k]=Math.min(r.player[k],.4);
    emit(r,'boss-intro',b.x,b.y,{label:b.name});return true;
}
function resolveGates(r,oldX) {
    const p=r.player,l=r.level;
    if(r.localPvp)return;
    for(const c of l.chambers)if(!c.complete&&p.x+p.w>c.gateX){p.x=c.gateX-p.w;p.vx=Math.min(0,p.vx);break;}
    if(r.boss?.active&&!r.boss.defeated){p.x=clamp(p.x,l.arena.left,l.arena.right-p.w);}
    else if(r.boss&&!r.boss.defeated&&p.x>l.arena.left+20&&l.chambers.every(c=>c.complete))startBoss(r);
}
function updateChambers(r,dt) {
    if(r.localPvp)return;
    const p=r.player;
    for(const c of r.level.chambers){
        if(c.complete)continue;
        for(const z of c.sigils)if(!z.taken&&overlap(p,z)){z.taken=true;r.score+=600;emit(r,'sigil',z.x,z.y,{label:'Seal fragment recovered'});}
        if(c.sigils.every(z=>z.taken)&&!c.wavesStarted&&p.y<GROUND&&Math.abs(p.x-c.gateX)<170){
            c.wavesStarted=true;
            const n=4+Math.floor(r.worldId/3)+(r.difficulty==='inferno'?2:0);
            for(let k=0;k<n;k++){const e=makeEnemy(r.level.cfg.roster[k%r.level.cfg.roster.length],c.gateX-160-(k%4)*150,++r.spawnSerial,DIFFICULTIES[r.difficulty].enemy);e.warning=1+k*.2;e.chamber=c.id;c.waveIds.push(e.id);r.level.enemies.push(e);}
            emit(r,'seal-wave',p.x,p.y,{label:'Seal wardens awaken'});
        }
        if(c.wavesStarted&&c.waveIds.every(id=>!r.level.enemies.some(e=>e.id===id&&e.alive))){c.complete=true;r.stageIndex++;p.focus=Math.min(100,p.focus+30);p.knives=Math.min(18,p.knives+5);p.soul=Math.min(100,p.soul+25);r.score+=1500;emit(r,'seal-open',c.gateX,GROUND-100,{label:'Seal broken • '+r.stageIndex+'/3'});}
    }
}
export function activateSummon(r) {
    const p=r.player;if(r.failed||r.complete||r.localPvp||p.deadFor>0||p.summonCD>0||p.summonCharges<=0||p.soul<60)return false;
    p.soul-=60;p.summonCharges--;p.summonCD=60;
    r.summon={kind:['warden','ravens','sentinel'].includes(r.summonChoice)?r.summonChoice:'warden',x:p.x-60,y:p.y,life:18,timer:0,guard:0,t:0};r.stats.summons++;
    emit(r,'summon',p.x,p.y,{label:'Spirit covenant • 18 seconds'});return true;
}
export function meleeAttack(r,aim=0) {
    const p=r.player;if(r.complete||r.failed||p.deadFor>0||p.attackCD>0||p.stamina<8||p.stagger>0)return false;
    const profile=combatProfile(p);p.stamina-=8;p.combatIdle=0;p.attackDuration=profile.startup+profile.active;p.attackCD=p.attackDuration+profile.recovery;p.attackTime=p.attackDuration;p.attackStartup=profile.startup;p.attackReleased=false;p.attackSerial++;p.attackChain=p.attackChain%3+1;p.attackHits=[];p.attackAim=clamp(aim,-1,1);
    emit(r,'slash',p.x,p.y,{chain:p.attackChain});return true;
}
export function throwKnife(r,aim=0) {
    const p=r.player;if(r.complete||r.failed||p.deadFor>0||p.throwCD>0||p.knives<=0||p.stagger>0)return false;
    p.knives--;p.throwCD=.45;const a=clamp(aim,-1,1)*.7;
    fireShot(r,{vx:p.facing*720*Math.cos(a),vy:a*550,kind:'knife',damage:3,life:1.6});emit(r,'knife',p.x,p.y);return true;
}
export function dodgeStep(r) {
    const p=r.player;if(r.complete||r.failed||p.deadFor>0||p.dodgeCD>0||p.stamina<25||p.stagger>0)return false;
    p.stamina-=25;p.combatIdle=0;p.dodge=combatProfile(p).dodge;p.dodgeCD=.9;p.vy=Math.min(0,p.vy);emit(r,'dodge',p.x,p.y);return true;
}
export function meleeBox(p){
    if(p.attackAim>.5&&!p.grounded)return {x:p.x-18,y:p.y+p.h-5,w:p.w+36,h:65};
    if(p.attackAim<-.5)return {x:p.x-18,y:p.y-66,w:p.w+36,h:70};
    const reach=p.normalizedCombat?82:(heroById(p.character).combatStyle?.reach||82);
    return {x:p.facing>0?p.x+p.w-6:p.x-reach+6,y:p.y-14,w:reach,h:p.h+20};
}
function updateCombat(r,input,dt) {
    const p=r.player;
    for(const k of ['globalSkill','dodge','dodgeCD','attackCD','attackTime','throwCD','summonCD','stagger','castTime','landTime'])p[k]=Math.max(0,p[k]-dt);
    p.combatIdle+=dt;p.focus=Math.min(100,p.focus+DIFFICULTIES[r.difficulty].focus*dt);p.stamina=Math.min(100,p.stamina+(p.combatIdle>.55?25:5)*dt);
    if(input.attack)meleeAttack(r,input.aim||0);
    if(input.knife)throwKnife(r,input.aim||0);
    if(input.dodge&&!p.dodgeHeld)dodgeStep(r);p.dodgeHeld=!!input.dodge;
    if(input.summon&&!p.summonHeld){if(r.petId)activateCompanion(r);else activateSummon(r);};p.summonHeld=!!input.summon;
    const profile=combatProfile(p),active=p.attackTime>0&&p.attackTime<=profile.active;
    const ranged=profile.projectile&&!(p.attackAim>.5&&!p.grounded);
    if(active&&ranged&&!p.attackReleased){p.attackReleased=true;const a=p.attackAim*.75;fireShot(r,{x:p.x+p.w/2+p.facing*24,y:p.y+p.h*.4-7,vx:p.facing*(profile.weapon==='bow'?780:560)*Math.cos(a),vy:Math.sin(a)*600,kind:profile.projectile,life:1.25,damage:profile.weapon==='staff'?3:2});p.vx-=p.facing*28;emit(r,'shot',p.x,p.y);}
    if(active&&!ranged){const box=meleeBox(p);for(const e of r.level.enemies)if(e.alive&&!p.attackHits.includes(e.id)&&overlap(box,e)){
        p.attackHits.push(e.id);defeat(r,e,(p.normalizedCombat?2:heroById(p.character).combatStyle?.damage||2)+(p.attackChain===3?1:0),'melee');p.focus=Math.min(100,p.focus+5);p.soul=Math.min(100,p.soul+5);
        if(p.attackAim>.5&&!p.grounded){p.vy=-590;emit(r,'pogo',p.x,p.y);}
    }}
    if(r.summon){const z=r.summon;z.life-=dt;z.t+=dt;z.timer-=dt;z.guard=Math.max(0,z.guard-dt);
        z.x+=(p.x-p.facing*85-z.x)*Math.min(1,dt*5);z.y+=(p.y+(z.kind==='ravens'?-65:0)-z.y)*Math.min(1,dt*7);
        const target=r.level.enemies.filter(e=>e.alive&&e.warning<=0&&(!e.isBoss||e.active)&&distance(p,e)<850).sort((a,b)=>distance(p,a)-distance(p,b))[0];
        if(target&&z.timer<=0){z.timer=z.kind==='ravens'?.8:1.2;if(z.kind==='warden'&&distance(p,target)<220){defeat(r,target,2,'summon');z.x+=(target.x-z.x)*.2;}else fireShot(r,{x:z.x,y:z.y,kind:'spirit',homing:true,target:target.id,damage:1,life:2});}
        if(z.life<=0)r.summon=null;
    }
}
export function damageBoss(r,b,amount=1,source='hero'){
    if(r.failed||!b.alive||!b.active||b.defeated||b.invuln>0||b.state==='intro'||source==='flood'||source==='scales')return false;
    // All damage paths share this budget; bombs/pets cannot bypass boss phases.
    const damage=Math.min(4,Math.max(0,amount));if(!Number.isFinite(damage)||damage===0)return false;
    b.hp=Math.max(0,b.hp-damage);b.hit=.13;b.invuln=.085;r.bossDamage=(r.bossDamage||0)+damage;
    if(b.staggerLock<=0&&b.state!=='phase'){b.stagger=Math.min(b.maxStagger,b.stagger+damage*(source==='melee'?2:1));if(b.stagger>=b.maxStagger){b.stagger=0;b.staggerLock=8;b.state='stagger';b.clock=1.45;emit(r,'boss-phase',b.x,b.y,{label:'STAGGERED • punish now'});}}
    emit(r,'boss-hit',b.x+b.w/2,b.y+b.h/2,{value:damage});
    if(b.hp<=0){b.defeated=true;b.alive=false;b.active=false;b.state='defeated';r.bossHazards=[];r.stats.bosses++;r.kills++;r.stats.kills++;
        r.score+=Math.floor((8000+r.worldId*700)*DIFFICULTIES[r.difficulty].score)*(r.player.breath>0?3:1);emit(r,'boss-defeat',b.x,b.y,{label:b.name+' defeated'});
        if(r.bossTrial){r.complete=true;r.player.finished=true;r.stats.clears++;emit(r,'finish',r.player.x,r.player.y);}
        return true;}
    const phase=b.hp<=b.maxHp*.33?3:b.hp<=b.maxHp*.67?2:1;
    if(phase>b.phase){b.phase=phase;b.state='phase';b.clock=1.25;b.invuln=1.25;r.bossHazards=[];emit(r,'boss-phase',b.x,b.y,{label:'Phase '+phase});}
    return false;
}
function bossHazard(r,kind,x,y,vx=0,vy=0,warning=0,life=3,w=20,h=20){r.bossHazards.push({id:++r.spawnSerial,kind,x,y,vx,vy,warning,life,w,h});}
function windupBoss(r){
    const b=r.boss,cfg=BOSSES[r.worldId%BOSSES.length],a=r.level.arena;
    b.attack=cfg.attacks[b.attackIndex++%cfg.attacks.length];b.state='windup';b.clock=(.78-(b.phase-1)*.09)*DIFFICULTIES[r.difficulty].telegraph;
    b.targetX=clamp(r.player.x,a.left+65,a.right-65);b.direction=r.player.x<b.x?-1:1;
    b.originX=b.x;b.originY=b.y;
    emit(r,'boss-warn',b.x,b.y,{label:({dash:'DASH • dodge or leap',slam:'SLAM • jump the shockwave',fan:'VOLLEY • find a gap',rain:'RAIN • keep moving',thorns:'THORNS • leave the marked ground',waves:'TIDE • jump the wave',orbs:'ORB RING • dodge through'})[b.attack]});
}
function executeBoss(r){
    const b=r.boss,p=r.player,a=r.level.arena;b.state='attack';b.clock=b.attack==='dash'?.65:.38;
    if(b.attack==='dash'){b.vx=b.direction*(720+b.phase*80);}
    else if(b.attack==='slam'){b.x=clamp(b.targetX-40,a.left+30,a.right-b.w);b.y=GROUND-b.h;for(const dir of [-1,1])bossHazard(r,'wave',b.x+40,GROUND-26,dir*(280+b.phase*30),0,0,4,44,26);}
    else if(b.attack==='rain'){for(let k=-2;k<=2;k++)bossHazard(r,'rain',clamp(b.targetX+k*145,a.left+20,a.right-20),20,0,390,.7,3,18,55);}
    else if(b.attack==='thorns'){for(let k=0;k<5;k++)bossHazard(r,'thorn',a.left+120+k*230+(b.attackIndex%2)*65,GROUND-95,0,0,.7,1.25,52,95);}
    else if(b.attack==='waves'){for(let k=0;k<3;k++)bossHazard(r,'wave',b.x+40,GROUND-28,b.direction*(240+k*75),0,k*.28,4,45,28);}
    else{
        const base=Math.atan2(p.y-b.y,p.x-b.x), n=b.attack==='orbs'?7:5;
        for(let k=0;k<n;k++){const angle=base+(k-(n-1)/2)*(b.attack==='orbs'?.43:.23);bossHazard(r,'orb',b.x+50,b.y+35,Math.cos(angle)*(230+b.phase*30),Math.sin(angle)*(230+b.phase*30),0,4.5,18,18);}
    }
    emit(r,'boss-strike',b.x,b.y);
}
function updateBoss(r,dt,force=false){
    if(r.raidSlave&&!force)return;
    const b=r.boss;if(!b||!b.active||b.defeated||r.failed||r.localPvp)return;
    const p=r.player,a=r.level.arena;r.bossTime+=dt;b.staggerLock=Math.max(0,(b.staggerLock||0)-dt);b.invuln=Math.max(0,b.invuln-dt);b.hit=Math.max(0,b.hit-dt);b.t+=dt;
    const bd=dt*(r.slow>0?.7:1);b.clock-=bd;
    if(b.state==='intro'||b.state==='phase'||b.state==='stagger'){if(b.clock<=0){b.state='recover';b.clock=.6;}}
    else if(b.state==='recover'){b.y=GROUND-b.h;if(b.clock<=0)windupBoss(r);}
    else if(b.state==='windup'){if(b.attack==='slam'){b.y=GROUND-b.h-160*Math.sin(Math.max(0,b.clock)*2);}
        if(b.clock<=0)executeBoss(r);}
    else if(b.state==='attack'){
        if(b.attack==='dash')b.x=clamp(b.x+b.vx*bd,a.left+10,a.right-b.w-10);
        if(b.clock<=0){b.vx=0;b.y=GROUND-b.h;b.state='recover';b.clock=Math.max(.5,1.15-b.phase*.14);}
    }
    if(['attack','recover'].includes(b.state)&&overlap(p,b))damagePlayer(r,false,DIFFICULTIES[r.difficulty].damage);
    for(const h of r.bossHazards){
        if(h.warning>0){h.warning=Math.max(0,h.warning-dt);continue;}
        h.life-=dt;h.x+=h.vx*bd;h.y+=h.vy*bd;
        if(overlap(p,h))damagePlayer(r,false,DIFFICULTIES[r.difficulty].damage);
    }
    r.bossHazards=r.bossHazards.filter(h=>h.life>0&&h.x>a.left-160&&h.x<a.right+160&&h.y<720).slice(-70);
}

// ASCENSION: bounded companion summons. Effects, charges and cooldowns survive sector changes.
export function activateCompanion(r){
 const p=r.player,pet=PETS.find(x=>x.id===r.petId);
 if(!pet||r.complete||r.failed||r.localPvp||p.deadFor>0||p.petTime>0||p.companionCooldown>0||p.companionCharges<=0||p.soul<pet.summonCost)return false;
 p.soul-=pet.summonCost;p.companionCharges--;p.petTime=pet.summonDuration;p.companionCooldown=pet.summonCooldown;
 p.scales=pet.id==='dragon'?15:0;p.petUses=pet.id==='orca'?2:1;p.petCooldown=0;p.petCooldown2=0;
 r.petState.x=p.x-50;r.petState.y=p.y;r.petState.timer=0;r.petState.guard=['turtle','emberguard'].includes(pet.id);
 emit(r,'summon',p.x,p.y,{label:pet.name+' • '+pet.summonDuration+' seconds'});return true;
}
export function tickRaidBoss(target,others,dt){
 updateBoss(target,dt,true);
 for(const r of others){if(r===target||r.failed)continue;r.bossHazards=target.bossHazards;r.bossTime=target.bossTime;
  const b=r.boss;if(b?.active&&['attack','recover'].includes(b.state)&&overlap(r.player,b))damagePlayer(r,false,DIFFICULTIES[r.difficulty].damage);
  for(const h of r.bossHazards)if(h.warning<=0&&overlap(r.player,h))damagePlayer(r,false,DIFFICULTIES[r.difficulty].damage);
 }
}
