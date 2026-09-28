import {portraitPolicy,containArtRect,CROUCH_CUTOUT,usesCrouchPose} from './hero-presentation.js';
import {combatProfile,isUnarmed,unarmedPhase} from './combat-profiles.js';
import {wardrobeLayers} from './wardrobe.js';
import {weaponArtForHero,weaponArtForActor, heroArtFrame, weaponPose} from './weapon-art.js';
import {COSMETIC_COLORS} from './cosmetics.js';
import { sprite, assetImage, ASSET_CONFIG } from './assets.js';
import { BOSSES } from './bosses.js';
import { TILE, GROUND, HEROES, WORLDS, heroById, POWERS, TRAILS, PETS } from './data.js';
import { clamp, meleeBox } from './engine.js';
export function rounded(c, x, y, w, h, r = 8) { r = Math.min(r, w / 2, h / 2); c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
function box(c, x, y, w, h, color, r = 8) { c.fillStyle = color; rounded(c, x, y, w, h, r); c.fill(); }
function ellipse(c, x, y, rx, ry, color) { c.fillStyle = color; c.beginPath(); c.ellipse(x, y, Math.max(.01, rx), Math.max(.01, ry), 0, 0, Math.PI * 2); c.fill(); }
function line(c, pts, color, w = 2) { c.beginPath(); c.moveTo(...pts[0]); for (const p of pts.slice(1))
    c.lineTo(...p); c.strokeStyle = color; c.lineWidth = w; c.lineJoin = 'round'; c.lineCap = 'round'; c.stroke(); }
function grad(c, y, h, a, b) { const g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, a); g.addColorStop(1, b); return g; }
function star(c, x, y, r, color, n = 5, inner = .46) { c.fillStyle = color; c.beginPath(); for (let i = 0; i < n * 2; i++) {
    const a = i * Math.PI / n - Math.PI / 2, k = i % 2 ? r * inner : r;
    i ? c.lineTo(x + Math.cos(a) * k, y + Math.sin(a) * k) : c.moveTo(x + Math.cos(a) * k, y + Math.sin(a) * k);
} c.closePath(); c.fill(); }
function glow(c, x, y, r, color, alpha = .3) { c.save(); c.globalAlpha = alpha; const g = c.createRadialGradient(x, y, 1, x, y, r); g.addColorStop(0, color); g.addColorStop(1, 'transparent'); ellipse(c, x, y, r, r, g); c.restore(); }
function cloud(c, x, y, s, a = 1) { c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = a; ellipse(c, 0, 3, 36, 12, '#fffdf2'); ellipse(c, -14, -4, 17, 17, '#fffdf2'); ellipse(c, 9, -11, 21, 22, '#fffdf2'); ellipse(c, 29, -1, 18, 15, '#fffdf2'); c.restore(); }
export function drawCoin(c, x, y, t = 0, s = 1) {
    c.save();
    c.translate(x, y);
    c.scale(s, s);
    if (!sprite(c, 'coin', -11, -14, 22, 28, Math.floor(t * 10))) {
        ellipse(c, 0, 0, 8 * Math.max(.15, Math.abs(Math.cos(t * 4))), 12, '#ffc950');
    }
    c.restore();
}
export function drawHero(c, x, y, s, id = 'wissem', t = 0, dir = 1, moving = false, effects = {}) {
    const hero = heroById(id), stretch = effects.giant > 0 ? 1.15 : 1;
    const walk = moving ? Math.sin(t * 17*(hero.animationTempo||1)) : 0, bob = moving ? -Math.abs(walk) * 1.7 : Math.sin(t * 2.5) * .65;
    c.save();
    c.translate(x, y);
    c.scale(s * dir * stretch, s * stretch);
    ellipse(c, 0, 2, 17, 3, '#11213945');
    if (effects.gravity > 0) {
        c.strokeStyle = '#70dfff';
        c.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
            const yy = -12 - i * 20 + Math.sin(t * 3 + i) * 3;
            line(c, [[-27, yy + 5], [-23, yy], [-19, yy + 5]], '#a1e7ff', 2);
        }
    }
    if (effects.phase > 0 || effects.veil > 0)
        c.globalAlpha = .65;
    // Articulated, alpha-cleaned sheets: separate limb motion, jump/fall and attack frames.
    const heroKey=effects.outfit&&effects.outfit!=='starter'?'outfit/'+hero.id+'/'+effects.outfit:'hero/'+hero.id;
    const cfg = ASSET_CONFIG.images[heroKey];
    let frame = 0;
    if ((cfg?.frames || 1) > 1)
        frame = heroArtFrame({...effects,character:id},t,moving,hero.animationTempo||1);
    c.rotate(moving ? walk * .013 : 0);
    const actor={...effects,character:id};
    if(isUnarmed(actor)&&cfg?.weaponLayer==='baked'&&!effects.portraitReference){
        // Visible WIP training proxy. No weapon erasure, no secretly armed unarmed sprite.
        drawUnarmedProxy(c,hero,actor,t,bob);
    }else if(usesCrouchPose(actor)){
        drawCrouchedHero(c,heroKey,actor,t,frame,bob);
    }else if(cfg?.modularBody){
        const layers=wardrobeLayers(id,effects.wardrobe,ASSET_CONFIG);
        for(const slot of ['rear','base','shoes','bottom','top','hat','eyewear','weapon','front']){
            if(slot==='weapon')drawHeroWeapon(c,actor,t,frame,bob,heroKey);
            for(const layer of layers.filter(v=>v.slot===slot&&slot!=='weapon'))sprite(c,layer.key,-27,-65+bob,54,68,frame);
        }
    }else{
        // Use the genuine weapon-free idle. Frame 11 is an attack cutout, not a valid idle guard.
        if(isUnarmed(actor)&&!moving&&!actor.attackTime&&!actor.dodge&&actor.vy===undefined)frame=0;
        sprite(c,heroKey,-27,-65+bob,54,68,frame);
        drawHeroWeapon(c,actor,t,frame,bob,heroKey);
        drawCosmeticParts(c,effects.parts,t,moving); // previously-owned legacy palette accents only
    }
    c.globalAlpha = 1;
    if (effects.shield || effects.veil > 0 || effects.spark > 0 || effects.bastion > 0 || effects.scales > 0) {
        const col = effects.scales > 0 ? '#ffd55b' : effects.spark > 0 ? '#fff3b6' : effects.bastion > 0 ? '#bbd7ff' : '#83e7ff';
        c.strokeStyle = col;
        c.globalAlpha = .6;
        c.lineWidth = 1.7;
        c.beginPath();
        c.ellipse(0, -30, 29, 37, 0, 0, Math.PI * 2);
        c.stroke();
        c.globalAlpha = 1;
    }
    if (effects.orbit > 0 || effects.spin > 0)
        for (let i = 0; i < 3; i++) {
            const a = t * 5 + i * Math.PI * 2 / 3;
            star(c, Math.cos(a) * 42, -27 + Math.sin(a) * 30, 6, hero.color, 5);
        }
    if (effects.breath > 0) {
        glow(c, 0, -27, 40, '#ff8f37', .22);
        star(c, 22, -53, 7, '#ffd061', 5);
    }
    c.restore();
}
export function drawMonster(c, e, t) {
    if (e.isBoss) { drawBoss(c,e,t); return; }
    if(e.combatState==='anticipate'){c.fillStyle='#ffd77e';c.font='bold 19px VT323, monospace';c.fillText('!',e.x+e.w/2-3,e.y-15);}
    if(e.isMiniBoss){glow(c,e.x+24,e.y+20,65,'#ffd47a',.22);box(c,e.x-4,e.y-20,60,5,'#372c47',2);box(c,e.x-4,e.y-20,60*e.hp/e.maxHp,5,'#ffd47a',2);star(c,e.x+24,e.y-32,9,'#ffe3a4',5);}
    const scale = e.type === 'golem' ? 1.32 : e.type === 'maw' ? 1.12 : 1;
    const width = (['bat', 'drone'].includes(e.type) ? 58 : 44) * scale, height = 44 * scale;
    c.save();
    c.translate(e.x + e.w / 2, e.y + e.h);
    if(e.combatState==='anticipate')c.scale(1.1,.87);else if(e.combatState==='attack')c.rotate((e.vx<0?-1:1)*.15);else if(e.hit>0)c.rotate(-.12);
    c.scale(e.vx < 0 ? -1 : 1, 1);
    if (e.warning > 0)
        c.globalAlpha = .25 + Math.abs(Math.sin(t * 12)) * .6;
    if (e.hit > 0)
        c.globalAlpha = .55;
    const fly = ['bat', 'wisp', 'drone'].includes(e.type), bob = fly ? Math.sin(t * 7 + e.id) * 3 : Math.sin(t * 8 + e.id) * 1.1;
    ellipse(c, 0, 3, 17 * scale, 3, '#1b213050');
    const cfg = ASSET_CONFIG.images['enemy/' + e.type];
    const frame = (cfg?.frames || 1) > 1 ? Math.floor(t * 8) : 0;
    sprite(c, 'enemy/' + e.type, -width / 2, -height + bob, width, height, frame);
    if (e.frozen > 0) {
        box(c, -width / 2, -height, width, height, '#83ddff44', 2);
        star(c, 0, -height - 6, 5, '#b9eaff', 6);
    }
    if (e.type === 'golem' && e.hp < 3) {
        box(c, -18, -height - 7, 36, 3, '#192039', 0);
        box(c, -18, -height - 7, 36 * e.hp / 3, 3, '#ffc568', 0);
    }
    c.restore();
}
export function drawPower(c, u, t) {
    const cfg = POWERS.find(z => z.id === u.type) || POWERS[0], x = u.x + u.w / 2, y = u.y + u.h / 2 + Math.sin(t * 3 + u.x) * 3;
    c.save();
    glow(c, x, y, 25, cfg.color, .18);
    sprite(c, 'power/' + u.type, x - 19, y - 20, 38, 38);
    c.restore();
}
function drawPet(c, r, t) {
    if (!r.petId || !(r.player.petTime>0))
        return;
    const pet = r.petState, s = ['dragon', 'orca'].includes(r.petId) ? 70 : 48;
    c.save();
    c.translate(pet.x + 14, pet.y + 20);
    c.scale(r.player.facing, 1);
    sprite(c, 'pet/' + r.petId, -s / 2, -s * .68 + Math.sin(t * 6) * 2, s, s * .8, Math.floor(t * 8));
    c.textAlign='center';c.fillStyle='#e2fbff';c.font='bold 9px VT323, monospace';c.scale(r.player.facing,1);c.fillText(Math.ceil(r.player.petTime)+'s',0,-s*.72);
    c.restore();
}
function landscape(c, w, h, cfg, t, scroll = 0, menu = false) {
    c.fillStyle = grad(c, 0, h, cfg.sky[0], cfg.sky[1]);
    c.fillRect(0, 0, w, h);
    // Licensed, layered pixel environments supplied by the player. All local assets.
    const theme=cfg.communityTheme||'starry', sky=assetImage('environment/'+theme+'-sky');
    if((menu||cfg.biome==='cosmic')&&sky?.complete&&sky.naturalWidth){
        c.imageSmoothingEnabled=false;
        const sw=Math.max(w,h*sky.naturalWidth/sky.naturalHeight);
        c.drawImage(sky,(w-sw)/2,0,sw,h);
        const layers=theme==='waste'?[['waste-far',.045,.7],['waste-near',.11,.92]]:[['starry-clouds',.075,.98]];
        for(const [name,speed,alpha] of layers){const im=assetImage('environment/'+name);if(!im?.naturalWidth)continue;const iw=h*im.naturalWidth/im.naturalHeight;const off=((scroll*speed+t*(theme==='starry'?3:0))%iw+iw)%iw;c.save();c.globalAlpha=alpha;for(let x=-off;x<w;x+=iw)c.drawImage(im,x,0,iw+1,h);c.restore();}
        if(theme==='starry')for(let i=0;i<25;i++){const x=(i*191.73+33)%w,y=(i*57.31)%(h*.7);star(c,x,y,1+Math.sin(t+i)*.35,'#d9edff88',4);}
        return;
    }
    const bg = assetImage('background/' + (cfg.background || 'cosmic'));
    if (bg?.complete && bg.naturalWidth) {
        const bh = h * .9, bw = bh * bg.naturalWidth / bg.naturalHeight, off = ((scroll * .07) % bw + bw) % bw;
        c.save();
        c.globalAlpha = cfg.night ? .86 : .46;
        c.imageSmoothingEnabled = false;
        for (let xx = -off; xx < w; xx += bw)
            c.drawImage(bg, xx, 0, bw + 1, bh);
        c.restore();
    }
    if (cfg.night) {
        for (let i = 0; i < 55; i++) {
            const x = (i * 139.23 + 17) % w, y = (i * 47.77 + 12) % (h * .65);
            ellipse(c, x, y, i % 5 === 0 ? 1.7 : .8, i % 5 === 0 ? 1.7 : .8, `rgba(255,248,220,${.3 + Math.sin(t + i) * .2})`);
        }
        glow(c, w * .79, h * .16, h * .16, '#f8e9b7', .14);
        ellipse(c, w * .79, h * .16, h * .055, h * .055, '#fff0ca');
        ellipse(c, w * .80, h * .145, h * .049, h * .05, cfg.sky[0]);
    }
    else {
        glow(c, w * .78, h * .2, h * .25, '#fff8d1', .5);
        ellipse(c, w * .78, h * .2, h * .067, h * .067, '#fff4ba');
    }
    for (let i = 0; i < 6; i++) {
        const x = ((i * (w / 4) + t * 7 - scroll * .1) % (w + 180) + w + 180) % (w + 180) - 90;
        cloud(c, x, h * (.16 + (i % 3) * .11), .55 + h / 500 * (i % 2 * .4), cfg.night ? .13 : .68);
    }
    for (let layer = 0; layer < 3; layer++) {
        const period = layer === 0 ? 440 : 310, offset = scroll * (.06 + layer * .055);
        c.fillStyle = layer === 0 ? cfg.far : layer === 1 ? cfg.near : cfg.near;
        c.globalAlpha = layer === 0 ? .6 : layer === 1 ? .55 : .28;
        c.beginPath();
        c.moveTo(0, h);
        for (let x = -period; x < w + period; x += period) {
            const xx = x - (offset % period), base = h * (.7 + layer * .1), peak = h * (.30 + layer * .16);
            if (['snow', 'storm', 'sky', 'sakura'].includes(cfg.biome)) {
                c.lineTo(xx, base);
                c.lineTo(xx + period * .48, peak);
                c.lineTo(xx + period, base);
            }
            else {
                c.lineTo(xx, base);
                c.bezierCurveTo(xx + period * .12, peak, xx + period * .7, peak, xx + period, base);
            }
        }
        c.lineTo(w, h);
        c.closePath();
        c.fill();
        c.globalAlpha = 1;
    }
    if (['coast', 'ruins'].includes(cfg.biome)) {
        c.fillStyle = '#5edbc938';
        c.fillRect(0, h * .68, w, h * .32);
        for (let i = 0; i < 18; i++) {
            const x = (i * 141 + t * 17) % (w + 80) - 40;
            box(c, x, h * .72 + (i % 5) * h * .04, 22 + i % 3 * 10, 2, '#e3fff675', 2);
        }
    }
    if (['neon', 'clock', 'ruins'].includes(cfg.biome)) {
        for (let i = 0; i < 14; i++) {
            const x = i * 100 - (scroll * .16 % 100), hh = 55 + (i * 37) % 105;
            box(c, x, h * .79 - hh, 60, hh, cfg.near, 4);
            for (let a = 0; a < 3; a++)
                for (let b = 0; b < 3; b++)
                    box(c, x + 10 + a * 15, h * .79 - hh + 14 + b * 19, 5, 8, cfg.biome === 'neon' ? '#7bfadc55' : '#e4d9a33b', 1);
        }
    }
    if (cfg.biome === 'snow')
        for (let i = 0; i < 35; i++)
            ellipse(c, (i * 107 + t * 17) % (w + 20), (i * 63 + t * 27) % (h + 10), 1.7, 1.7, '#ffffffa8');
    if (['sakura', 'cosmic', 'forest'].includes(cfg.biome))
        for (let i = 0; i < 16; i++) {
            const x = (i * 117 + t * 12 + Math.sin(t + i) * 13) % (w + 30), y = (i * 43 + t * 8) % (h * .85);
            ellipse(c, x, y, cfg.biome === 'sakura' ? 3 : 1.4, cfg.biome === 'sakura' ? 1.4 : 1.4, cfg.biome === 'sakura' ? '#fff2eeab' : '#ffe9a480');
        }
    if (cfg.biome === 'lava')
        for (let i = 0; i < 18; i++)
            ellipse(c, (i * 91 + t * 10) % w, h - (i * 57 + t * 24) % (h * .8), 1.4, 2.5, '#ffc17288');
}
function prop(c, x, y, size, cfg, v, t) {
    c.save();
    c.translate(x, y);
    c.scale(size, size);
    const kind = cfg.biome;
    if (['crystal', 'cosmic'].includes(kind)) {
        for (let i = 0; i < 3; i++) {
            c.fillStyle = i === 0 ? '#b4e3f48c' : '#c5bbf2aa';
            c.beginPath();
            c.moveTo(i * 16 - 16, 0);
            c.lineTo(i * 16 - 22, -28 - i * 11);
            c.lineTo(i * 16 - 10, -54 - i * 8);
            c.lineTo(i * 16, -30 - i * 11);
            c.lineTo(i * 16 - 3, 0);
            c.closePath();
            c.fill();
        }
    }
    else if (['swamp', 'candy', 'forest'].includes(kind)) {
        const color = kind === 'candy' ? '#f3afd7' : kind === 'forest' ? '#869ed7' : '#b9d67d';
        box(c, -3, -33, 8, 34, '#dbe4bd', 3);
        ellipse(c, 0, -31, 29, 15, color);
        ellipse(c, -10, -35, 5, 3, '#fff1d5aa');
        ellipse(c, 9, -29, 4, 3, '#fff1d5aa');
    }
    else if (['snow', 'storm'].includes(kind)) {
        box(c, -3, -64, 7, 65, '#6b868c', 2);
        for (let i = 0; i < 3; i++) {
            c.fillStyle = kind === 'snow' ? '#e4f3ed' : '#8ba3a6';
            c.beginPath();
            c.moveTo(0, -105 + i * 25);
            c.lineTo(-24 - i * 7, -52 + i * 22);
            c.lineTo(24 + i * 7, -52 + i * 22);
            c.closePath();
            c.fill();
        }
    }
    else if (['clock', 'neon', 'ruins'].includes(kind)) {
        box(c, -12, -48, 24, 48, cfg.earth, 5);
        box(c, -17, -53, 34, 9, cfg.grass, 3);
        line(c, [[-4, -42], [-6, -15], [3, -21], [5, -2]], '#15283c33', 2);
    }
    else if (kind === 'coast') {
        line(c, [[0, 0], [4, -35], [20, -75]], '#9b9270', 10);
        for (let i = 0; i < 5; i++)
            line(c, [[20, -75], [20 + Math.cos(i * 1.1) * 42, -80 + Math.sin(i * 1.1) * 25]], '#56ad92', 8);
    }
    else if (kind === 'lava') {
        for (let i = 0; i < 3; i++)
            ellipse(c, -15 + i * 16, -12, 15, 13, '#705269');
        line(c, [[-18, -22], [-3, -5], [7, -16], [20, -8]], '#fc9e6377', 2);
    }
    else {
        const color = kind === 'sakura' ? '#f3c3da' : cfg.near;
        box(c, -5, -68, 10, 68, '#736f58', 4);
        ellipse(c, 0, -70, 35, 28, color);
        ellipse(c, -20, -55, 25, 24, color);
        ellipse(c, 25, -56, 26, 24, color);
        ellipse(c, -11, -80, 16, 8, kind === 'sakura' ? '#ffe1e8' : '#bbdf9844');
    }
    c.restore();
}
export class Renderer {
    constructor(canvas) { this.canvas = canvas; this.c = canvas.getContext('2d', { alpha: false }); this.w = 960; this.h = 540; this.dpr = 1; this.camera = 0; this.cy = 0; this.fx = []; this.shake = 0; this.lastRun = null; this.motion = true; this.trail = 'classic'; this.close = false; }
    resize(w, h, quality = 'high') { this.w = w; this.h = h; this.particleLimit=quality==='low'?60:quality==='balanced'?120:200; this.dpr = Math.min(window.devicePixelRatio || 1, quality === 'high' ? 2 : quality==='balanced'?1.5:1); this.canvas.width = Math.round(w * this.dpr); this.canvas.height = Math.round(h * this.dpr); this.canvas.style.width = w + 'px'; this.canvas.style.height = h + 'px'; }
    effects(events) {
        for (const e of events) {
            if (['impact','boss-hit','boss-defeat','sigil','summon','seal-open','coin', 'stomp', 'break', 'skill', 'power', 'checkpoint', 'hurt', 'blast', 'finish'].includes(e.type)) {
                const colors = (['boss-hit','stomp','hurt'].includes(e.type) && this.blood!=='off') ? (this.blood==='crimson'?['#b52c52','#df4564','#f88186']:['#b48bff','#82eaff']) : e.type === 'coin' ? ['#ffd363', '#fff2b1'] : e.type === 'hurt' ? ['#ff7690', '#fff4da'] : ['#a1efdb', '#c4aeff', '#fff1b8'];
                const n = e.type === 'coin' ? 5 : e.type === 'blast' ? 22 : 12;
                for (let i = 0; i < n; i++) {
                    const a = Math.PI * 2 * i / n;
                    this.fx.push({ x: e.x + 14, y: e.y + 8, vx: Math.cos(a) * (35 + i * 5), vy: Math.sin(a) * (45 + i * 4) - 45, life: .5 + (i % 3) * .13, max: .8, color: colors[i % colors.length], size: 2 + i % 3 });
                }
                if (['hurt','boss-hit','boss-defeat','boss-strike'].includes(e.type))
                    this.shake = .18;
            }
            if (e.type === 'blast')
                this.fx.push({ x: e.x + 14, y: e.y + 22, ring: true, radius: e.radius, life: .5, max: .5 });
        }
        this.fx = this.fx.slice(-(this.particleLimit||120));
    }
    drawMenu(t, screen = 'home', hero = 'wissem', world = 0) {
        const c = this.c, w = this.w, h = this.h;
        c.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        landscape(c,w,h,WORLDS[world],this.motion?t:0,t*3,true);
        const bg=assetImage('background/cosmic');if(bg){const scale=Math.max(w/bg.naturalWidth,h/bg.naturalHeight);sprite(c,'background/cosmic',(w-bg.naturalWidth*scale)/2,(h-bg.naturalHeight*scale)/2,bg.naturalWidth*scale,bg.naturalHeight*scale);}
        c.fillStyle=screen==='home'?grad(c,0,h,'#06112270','#071027bb'):'#071020b8';c.fillRect(0,0,w,h);
        if (screen === 'home') {
            const x = w * .455, y = h * .665, s = Math.min(w / 960, h / 500);
            glow(c, x, y - 95 * s, 160 * s, '#ffebaa', .30);
            this.island(c, x, y + 15 * s, 135 * s, 42 * s, WORLDS[0]);
            drawHero(c, x, y + 4 * s, 3.15 * s, hero, this.motion ? t : 0, 1, false, {outfit:this.menuOutfit||'starter',parts:this.menuParts,equippedWeapon:this.menuWeapon,wardrobe:this.menuWardrobe});
            for (let i = 0; i < 3; i++) {
                const a = 2.35+i * .25+Math.sin(t*.3)*.12;
                drawCoin(c, x + Math.cos(a) * 135 * s, y - 90 * s + Math.sin(a) * 55 * s, t + i, 1.45 * s);
            }
            for (let i = 0; i < 3; i++)
                star(c, x + (i - 1) * 95 * s, y - 190 * s + (i % 2) * 20, 6 * s, '#fff3b1');
            this.island(c, w * .82, h * .62, 55 * s, 20 * s, WORLDS[0]);
            prop(c, w * .82, h * .59, .62 * s, WORLDS[0], .2, t);
            this.island(c, w * .32, h * .56, 38 * s, 15 * s, WORLDS[0]);
        }

    }
    island(c, x, y, rx, ry, cfg) { c.fillStyle = grad(c, y, ry * 2, cfg.earth, '#5c5b68'); c.beginPath(); c.moveTo(x - rx, y); c.quadraticCurveTo(x - rx * .3, y + ry * 3, x + rx * .5, y + ry * 1.8); c.lineTo(x + rx, y); c.closePath(); c.fill(); ellipse(c, x, y, rx, ry * .45, cfg.grass); ellipse(c, x - 8, y - 4, rx * .87, ry * .28, '#c5ed8a'); for (let i = 0; i < 4; i++)
        line(c, [[x - rx * .6 + i * rx * .35, y + ry * .3], [x - rx * .5 + i * rx * .27, y + ry * 1.1]], '#4c536426', 4); }
    drawRun(r, t, dt = 1 / 60) {
        const c = this.c, w = this.w, h = this.h, p = r.player, l = r.level;
        this.motion = this.motion !== false;
        const sceneT = this.motion ? p.animation || r.mapTime || 0 : 0;
        if(r.cameraExperiment){drawFirstPersonExperiment(this,r,sceneT);return;}
        const arenaCamera=!!r.boss?.active||r.localPvp; const logicalH = arenaCamera ? ((l.arena.right-l.arena.left+180)*h/w) : this.close ? 405 : 465, scale = h / logicalH, vw = w / scale;
        if (this.lastRun !== r || p.x < 150 && this.camera > 300) {
            this.camera = clamp(p.x - (w / (h / (this.close ? 405 : 465))) * .31,0,Math.max(0,l.width-w/(h/(this.close?405:465))));
            this.cy = GROUND - logicalH * .72;
            this.lastRun = r;
            this.fx = [];
        }
        const desired = arenaCamera ? l.arena.left-90 : clamp(p.x - vw * .43 + clamp(p.vx*.22,-80,80), 0, Math.max(0, l.width - vw));
        this.camera += (desired - this.camera) * Math.min(1, dt * 8);if(arenaCamera){this.camera=desired;}
        const desiredY = arenaCamera ? GROUND-logicalH*.64 : clamp(p.y+p.h/2-logicalH*.52+clamp(p.vy*.12,-65,85),0,Math.max(0,l.height-logicalH));
        this.cy += (desiredY - this.cy) * Math.min(1, dt * 6);if(arenaCamera)this.cy=desiredY;
        c.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        landscape(c, w, h, l.cfg, sceneT, this.camera);
        if(p.y>520){c.fillStyle=l.cfg.biome==='lava'?'#311b2bea':'#11182ee8';c.fillRect(0,0,w,h);for(let i=0;i<14;i++){const xx=(i*137-this.camera*.12)%w,yy=(i*79-this.cy*.15)%h;c.fillStyle=l.cfg.far+'55';c.fillRect(xx,yy,65,95);}}
        if(r.boss?.active){c.fillStyle='#111126a8';c.fillRect(0,0,w,h);}
        c.save();
        c.scale(scale, scale);
        this.shake = Math.max(0, this.shake - dt);
        const shake = this.motion ? Math.sin(t * 140) * this.shake * 15 : 0;
        c.translate(-this.camera + shake, -this.cy);
        drawNightfallBackdrop(c,r,this.camera,vw,sceneT);
        const start = Math.max(0, Math.floor(this.camera / TILE) - 2), end = Math.min(l.cols, Math.ceil((this.camera + vw) / TILE) + 2);
        for (const d of l.decor)
            if (d.x > this.camera - 100 && d.x < this.camera + vw + 100 && tileAtVisual(l, d.x))
                prop(c, d.x, GROUND, d.size * .63, l.cfg, d.v, sceneT);
        for(let tx=Math.floor(this.camera/760)*760;tx<this.camera+vw;tx+=760){if(tx>0&&tileAtVisual(l,tx)&&![...l.coins,...l.pickups,...l.chests].some(o=>Math.abs(o.x-tx)<105&&o.y>340))sprite(c,'environment/starry-tree',tx,GROUND-112,90,112);}
        // A visible hazard surface makes gaps distinguishable from traversable floor.
        c.fillStyle = l.cfg.biome === 'lava' ? '#ec8459' : l.cfg.biome === 'coast' ? '#43b6c2' : '#334e7044';
        c.fillRect(this.camera, GROUND + 108, vw, 150);
        for (let y = 0; y < l.tiles.length; y++)
            for (let x = start; x < end; x++) {
                const v = l.tiles[y][x];
                if (!v)
                    continue;
                const xx = x * TILE, yy = y * TILE;
                const tileKey = 'tiles/' + l.cfg.tileSet;
                const frame = v === 1 ? (y === 12 ? 0 : 1) : v;
                if (sprite(c, tileKey, xx, yy, 40, 40, frame))
                    continue;
                if (v === 1) {
                    c.fillStyle = l.cfg.earth;
                    c.fillRect(xx, yy, 40, 40);
                    if (y === 12) {
                        box(c, xx, yy, 40, 12, l.cfg.grass, 3);
                        box(c, xx, yy + 10, 40, 5, '#11273d19', 2);
                        for (let i = 0; i < 3; i++)
                            box(c, xx + 5 + i * 14, yy + 19 + (x + i) % 3 * 5, 5, 3, '#f9dcab25', 2);
                    }
                    else if ((x + y) % 3 === 0) {
                        box(c, xx + 9, yy + 12, 11, 5, '#0a24441a', 3);
                        box(c, xx + 27, yy + 31, 5, 3, '#f9d9ad18', 2);
                    }
                }
                else if (v === 2) {
                    box(c, xx + 1, yy + 1, 38, 38, l.cfg.earth, 5);
                    box(c, xx + 2, yy + 2, 36, 32, '#c5916966', 4);
                    line(c, [[xx + 2, yy + 19], [xx + 38, yy + 19]], '#352f473d', 2);
                    line(c, [[xx + 20, yy + 2], [xx + 20, yy + 19]], '#352f473d', 2);
                    line(c, [[xx + 11, yy + 20], [xx + 11, yy + 37], [xx + 30, yy + 37], [xx + 30, yy + 20]], '#352f4728', 1.5);
                    box(c, xx + 4, yy + 3, 31, 3, '#ffe1a950', 2);
                }
                else if (v === 3) {
                    box(c, xx + 1, yy + 3, 38, 37, '#b77832', 6);
                    box(c, xx + 1, yy, 38, 35, grad(c, yy, 35, '#ffe197', '#edaf56'), 6);
                    box(c, xx + 5, yy + 4, 30, 27, '#f4c467', 4);
                    star(c, xx + 20, yy + 18, 10, '#fff1b8', 4, .55);
                    for (const a of [7, 33])
                        ellipse(c, xx + a, yy + 7, 1.4, 1.4, '#bf812c');
                }
                else if (v === 4) {
                    box(c, xx + 1, yy + 2, 38, 38, '#746c72', 5);
                    box(c, xx + 5, yy + 6, 30, 28, '#ffffff0d', 4);
                    ellipse(c, xx + 20, yy + 20, 3, 3, '#dfd7bf66');
                }
                else {
                    box(c, xx + 1, yy, 38, 40, grad(c, yy, 40, l.cfg.grass, l.cfg.earth), 6);
                    box(c, xx + 5, yy + 4, 30, 3, '#fff5cc40', 2);
                }
            }
        drawWorldFeatures(c,r,this.camera,vw,sceneT);
        for (const m of l.platforms) {
            box(c, m.x, m.y + 4, m.w, m.h, '#595b7c', 7);
            box(c, m.x, m.y, m.w, 9, '#d9d5fc', 5);
            box(c, m.x + 6, m.y + 1, m.w - 12, 3, '#fff2d0', 2);
        }
        for (const s of l.springs) {
            box(c, s.x, s.y + s.h - 4, 32, 5, '#5a6d87', 2);
            line(c, [[s.x + 6, s.y + 10], [s.x + 24, s.y + 7], [s.x + 6, s.y + 4], [s.x + 24, s.y]], '#cbdce6', 3);
            box(c, s.x - 2, s.y - 3, 36, 7, '#f38793', 3);
        }
        for (const spike of l.spikes) if(spike.x>this.camera-80&&spike.x<this.camera+vw+80)
            for(let i=0;i<3;i++)sprite(c,'environment/spikes',spike.x+i*19,spike.y,20,22,sceneT*7);
        // Orca Prince adds a temporary water collision surface; the original map is untouched.
        if (p.prince > 0)
            for (let x = start; x < end; x++)
                if (!l.tiles[12][x]) {
                    c.fillStyle = '#399dcea9';
                    c.fillRect(x * TILE, GROUND, 40, 170);
                    sprite(c,'environment/water',x*TILE,GROUND-8,40,32,sceneT*8);
                }
        if (p.flood > 0) {
            c.fillStyle = '#4bb6de21';
            c.fillRect(this.camera, GROUND - 50, vw, 220);
            for (let i = 0; i < 8; i++)
                line(c, [[this.camera + i * 125, GROUND + 32], [this.camera + i * 125 + 40, GROUND + 25 + Math.sin(t * 6 + i) * 6], [this.camera + i * 125 + 80, GROUND + 32]], '#c2f5ff8f', 2);
        }
        for (const arr of [l.chests, l.crates, l.shrines])
            for (const o of arr)
                if (Math.abs(o.x - p.x) < vw) {
                    c.save();
                    if (o.opened)
                        c.globalAlpha = .4;
                    if (arr === l.crates)
                        sprite(c, 'tiles/' + l.cfg.tileSet, o.x, o.y, o.w, o.h, 6);
                    else
                        sprite(c, arr === l.shrines ? 'shrine' : 'chest', o.x - 6, o.y - 9, o.w + 12, o.h + 9);
                    c.restore();
                }
        for (const b of l.buried)
            if (b.revealed && !b.opened && Math.abs(b.x - p.x) < vw) {
                sprite(c, 'chest', b.x, b.y, 30, 25);
                star(c, b.x + 14, b.y - 6, 5, '#ffe098');
            }
        for (const egg of l.eggs)
            if (!egg.taken && Math.abs(egg.x - p.x) < vw) {
                glow(c, egg.x + 17, egg.y + 16, 52, '#b19bff', .32);
                ellipse(c, egg.x + 17, egg.y + 22, 22, 26, '#33477ceb');
                c.strokeStyle = '#d7c2ff';
                c.lineWidth = 2;
                c.beginPath();
                c.ellipse(egg.x + 17, egg.y + 22, 22, 26, 0, 0, Math.PI * 2);
                c.stroke();
                sprite(c, 'pet/' + egg.id, egg.x - 8, egg.y + 1 + Math.sin(t * 3) * 3, 50, 40);
                star(c, egg.x + 17, egg.y - 11, 7, '#ffdb84');
            }
        for (const b of r.bombs) {
            sprite(c, 'power/bomb', b.x - 4, b.y - 5, 26, 26);
            star(c, b.x + 15, b.y - 5, 3, '#ffe28b');
        }
        for (const trap of r.traps) {
            c.strokeStyle = '#8ee4ad';
            c.lineWidth = 2;
            c.beginPath();
            c.ellipse(trap.x, GROUND - 4, 90, 12, 0, 0, Math.PI * 2);
            c.stroke();
        }
        for (const turret of r.turrets) {
            sprite(c, 'enemy/drone', turret.x - 8, turret.y - 12, 47, 43);
        }
        if (['eagle','skywolf'].includes(r.petId) && p.petTime>0) {
            for (const e of l.enemies)
                if (e.alive && e.x > p.x && e.x < p.x + 900) {
                    star(c, e.x + e.w / 2, e.y - 18, 5, '#ffd576', 4);
                }
            for (let x = start; x < end; x++)
                if (!l.tiles[12][x] && l.tiles[12][x - 1]) {
                    c.fillStyle = '#ffd477';
                    c.font = 'bold 18px VT323, monospace';
                    c.fillText('!', x * TILE - 12, GROUND - 35);
                }
        }
        for (const coin of l.coins)
            if (!coin.taken && coin.x > this.camera - 40 && coin.x < this.camera + vw + 40)
                drawCoin(c, coin.x + 9, coin.y + 12 + Math.sin(sceneT * 3 + coin.x * .015) * 3, sceneT + coin.x * .013);
        for (const u of l.pickups)
            if (!u.taken && Math.abs(u.x - p.x) < vw)
                drawPower(c, u, sceneT);
        for (const [i, cp] of l.checkpoints.entries()) {
            box(c, cp.x + 5, cp.y, 5, 80, '#ede3c8', 2);
            star(c, cp.x + 7, cp.y - 3, 6, '#ffda80');
            c.fillStyle = i <= p.checkpoint ? '#ffe28e' : '#92f0cd';
            c.beginPath();
            c.moveTo(cp.x + 10, cp.y + 5);
            c.quadraticCurveTo(cp.x + 40, cp.y + Math.sin(sceneT * 4) * 5, cp.x + 41, cp.y + 16);
            c.lineTo(cp.x + 10, cp.y + 30);
            c.closePath();
            c.fill();
        }
        drawStargate(c,l.goal,sceneT,!!r.boss?.defeated && l.chambers.every(z=>z.complete), r.stageIndex||0,l.cfg.grass,!!r.complete);
        drawNightfallObjects(c,r,sceneT);
        for (const e of l.enemies)
            if (e.alive && e.x > this.camera - 60 && e.x < this.camera + vw + 60)
                drawMonster(c, e, sceneT);
        if(r.boss?.defeated){r.boss.defeatVisual=(r.boss.defeatVisual||0)+dt;drawBossDissolve(c,r.boss,r.worldId,r.boss.defeatVisual);}
        for (const s of r.shots) {
            if(s.kind==='arrow'){c.save();c.translate(s.x+7,s.y+7);c.rotate(Math.atan2(s.vy,s.vx));line(c,[[-15,0],[16,0]],'#f4deb0',2);line(c,[[-14,-4],[-7,0],[-14,4]],'#81dbbd',2);line(c,[[10,-4],[17,0],[10,4]],'#edffff',2);c.restore();continue;}
            if(s.kind==='knife'){c.save();c.translate(s.x+7,s.y+7);c.rotate(Math.atan2(s.vy,s.vx));line(c,[[-14,0],[10,0]],'#f8edd4',3);c.fillStyle='#a3c8de';c.beginPath();c.moveTo(19,0);c.lineTo(3,-4);c.lineTo(3,4);c.fill();line(c,[[-6,-5],[-6,5]],'#b29558',3);c.restore();continue;}
            glow(c, s.x + 7, s.y + 7, 20, s.owner === 'hero' ? '#ffc775' : '#ff9cd3', .5);
            ellipse(c, s.x + 7, s.y + 7, 7, 7, s.owner === 'foe' ? '#f587ad' : s.kind === 'ice' ? '#a8efff' : s.kind === 'blade' ? '#d2adff' : '#ffe394');
        }
        drawPet(c, r, sceneT);
        for(const ghost of r.remotePlayers||[]){c.save();c.globalAlpha=ghost.ghost?.55:1;if(ghost.downed){glow(c,ghost.x+14,ghost.y+16,40,'#ffb2cf',.28);star(c,ghost.x+14,ghost.y+12,16,'#ffe0ae',4);box(c,ghost.x-8,ghost.y+40,44,4,'#33425d',2);box(c,ghost.x-8,ghost.y+40,44*Math.min(1,(ghost.revive||0)/3),4,'#8ee9d2',2);}else drawHero(c,ghost.x+14,ghost.y+44,1,ghost.character,sceneT,ghost.facing||1,Math.abs(ghost.vx||0)>10,ghost);c.globalAlpha=1;c.fillStyle=ghost.team===1?'#ffaea8':'#91dbff';c.textAlign='center';c.font='bold 12px VT323, monospace';c.fillText(String(ghost.name||'Explorer').slice(0,16),ghost.x+14,ghost.y-28);c.restore();}
        if(p.attackTime>0&&!combatProfile(p).projectile){const b=meleeBox(p);c.save();c.globalAlpha=Math.min(1,p.attackTime/(p.attackDuration||.2));c.strokeStyle='#fff0c5';c.lineWidth=6;c.beginPath();c.ellipse(b.x+b.w/2,b.y+b.h/2,b.w*.55,b.h*.6,0,-1.25,1.5);c.stroke();c.strokeStyle='#abdfff';c.lineWidth=2;c.stroke();c.restore();}
        if (p.deadFor <= 0) {
            if (p.invincible <= 0 || Math.floor(t * 16) % 2 === 0) {
                if ((p.dash > 0 || p.haste > 0) && this.motion) {
                    c.save();
                    c.globalAlpha = .15;
                    drawHero(c, p.x + 14 - p.facing * 25, p.y + p.h, 1, p.character, sceneT, p.facing, true,p);
                    c.restore();
                }
                drawHero(c, p.x + 14, p.y + p.h, 1, p.character, sceneT, p.facing, Math.abs(p.vx) > 40, p);
            }
        }
        if (dt > 0 && this.motion && Math.abs(p.vx) > 80 && r.tick % 4 === 0) {
            const color = TRAILS.find(z => z.id === this.trail)?.color || '#fff1b4';
            this.fx.push({ x: p.x + 14, y: p.y + 35, vx: -p.vx * .1, vy: -20, life: .35, max: .35, color, size: 3 });
        }
        if (r.slow > 0) {
            c.globalAlpha = .045;
            c.fillStyle = '#91beff';
            c.fillRect(this.camera, this.cy, vw, logicalH);
            c.globalAlpha = 1;
        }
        for (const fx of this.fx) {
            fx.life -= dt;
            fx.x += (fx.vx || 0) * dt;
            fx.y += (fx.vy || 0) * dt;
            if (fx.vy)
                fx.vy += 130 * dt;
            c.globalAlpha = clamp(fx.life / fx.max, 0, 1);
            if (fx.ring) {
                c.strokeStyle = '#ffdfa2';
                c.lineWidth = 4;
                c.beginPath();
                c.arc(fx.x, fx.y, (1 - fx.life / fx.max) * fx.radius, 0, Math.PI * 2);
                c.stroke();
            }
            else if (this.motion)
                star(c, fx.x, fx.y, fx.size, fx.color, 4);
            c.globalAlpha = 1;
        }
        this.fx = this.fx.filter(f => f.life > 0).slice(-200);
        c.restore();
        // Discreet vignetting improves contrast without making the world look like a web panel.
        c.fillStyle = grad(c, 0, h * .20, '#10233f40', 'transparent');
        c.fillRect(0, 0, w, h * .20);
    }
}
function tileAtVisual(l, x) { return l.tiles[12]?.[Math.floor(x / TILE)] && !l.tiles[11]?.[Math.floor(x / TILE)]; }
const portraitCache=new Map();
export function paintPortrait(canvas,hero,selected=false,loadout=null){
 const c=canvas.getContext('2d'),w=canvas.width,h=canvas.height,hc=heroById(hero);
 const policy=portraitPolicy(hc.id,loadout,ASSET_CONFIG.images);
 canvas.dataset.portraitMode=policy.mode;canvas.dataset.heroIdentity=hc.id;
 canvas.setAttribute('aria-label',hc.name+(policy.referenceOnly?' identity portrait; unarmed animation pending':' equipped preview'));
 c.clearRect(0,0,w,h);c.imageSmoothingEnabled=false;
 // Measure the actual painted silhouette, including separate weapons. CSS owns the portrait well.
 const cacheKey=JSON.stringify([hc.id,loadout,policy.mode]);let art=portraitCache.get(cacheKey);
 if(!art){
  const surface=document.createElement('canvas');surface.width=512;surface.height=384;
  const ctx=surface.getContext('2d',{willReadFrequently:true});
  if(loadout)drawHero(ctx,256,330,3,hc.id,0,1,false,{...loadout,portraitReference:policy.referenceOnly});
  else {const still=assetImage('hero/'+hc.id+'/still')?'hero/'+hc.id+'/still':'hero/'+hc.id;sprite(ctx,still,175,125,162,203,0);}
  const pixels=ctx.getImageData(0,0,512,384).data;let left=512,top=384,right=-1,bottom=-1;
  for(let y=0;y<384;y++)for(let x=0;x<512;x++)if(pixels[(y*512+x)*4+3]>32){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}
  art={surface,bounds:{x:left,y:top,width:right-left+1,height:bottom-top+1}};
  if(portraitCache.size>80)portraitCache.clear();portraitCache.set(cacheKey,art);
 }
 const fit=containArtRect(art.bounds,w,h,Math.max(8,Math.min(w,h)*.075));
 if(fit){const b=art.bounds;c.drawImage(art.surface,b.x,b.y,b.width,b.height,fit.x,fit.y,fit.width,fit.height);canvas.dataset.artBounds=JSON.stringify(fit);}
}

export function paintMap(canvas, id) { const c = canvas.getContext('2d'), w = canvas.width, h = canvas.height, cfg = WORLDS[id]; c.clearRect(0, 0, w, h); landscape(c, w, h, cfg, 0, 0, true); if (sprite(c, 'map/' + id, 0, 0, w, h)) {
    c.fillStyle = '#11132722';
    c.fillRect(0, 0, w, h);
    return;
} prop(c, w * .78, h * .8, .55, cfg, .3, 0); box(c, 0, h * .82, w, h * .2, cfg.earth, 0); box(c, 0, h * .80, w, 8, cfg.grass, 2); for (let i = 0; i < 3; i++)
    drawCoin(c, w * .2 + i * 25, h * .58, 0, .65); }

function drawStargate(c,g,t,open,seals=0,worldColor='#8ef4ec',active=false){
 const x=g.x+g.w/2,y=g.y+g.h/2; c.save();
 const color=open?worldColor:seals>0?'#eec57f':'#af749a';glow(c,x,y,120,open?'#9d72ff':'#e7638d',.3);
 // The portal is a stone-and-gold shrine with a luminous moving interior.
 for(const side of [-1,1])for(let i=0;i<6;i++){
  box(c,x+side*49-12,g.y+14+i*32,25,30,i%2?'#47445e':'#55536f',3);
  line(c,[[x+side*49-8,g.y+24+i*32],[x+side*49+8,g.y+24+i*32]],'#bcaa7a',2);
  if(i%2===0)star(c,x+side*49,g.y+30+i*32,3,color,4);
 }
 box(c,x-70,g.y+g.h-2,140,13,'#716580',3);box(c,x-61,g.y+g.h-8,122,8,'#c6b276',2);
 c.save();c.beginPath();c.ellipse(x,y,39,90,0,0,Math.PI*2);c.clip();
 c.fillStyle=grad(c,g.y,g.h,open?'#162552':'#25182b',open?'#835af1':'#583149');c.fillRect(x-42,g.y,84,g.h);
 for(let j=0;j<8;j++){c.strokeStyle=open?'#a4fbef77':'#dc829f33';c.lineWidth=1.5;c.beginPath();c.ellipse(x+Math.sin(t*1.2+j)*10,y,7+j*6,17+j*13,t*.2+j*.2,0,Math.PI*2);c.stroke();}
 for(let i=0;i<18;i++)star(c,x+Math.sin(i*6.3+t*.3)*33,y+((i*37-t*24)%165+165)%165-82,1.6,open?'#e4fffb':'#aa647d',4);
 c.restore();
 for(let ring=0;ring<3;ring++){c.strokeStyle=ring===0?'#ead9a3':ring===1?'#858bb5':color;c.lineWidth=ring===0?6:2;c.beginPath();c.ellipse(x,y,42+ring*5,95+ring*5,0,0,Math.PI*2);c.stroke();}
 for(let i=0;i<12;i++){const a=i*Math.PI/6+t*(open?.2:.05);star(c,x+Math.cos(a)*55,y+Math.sin(a)*108,i%3===0?5:3,i<seals*4||open?'#fff3c2':'#6c5c77',4);}
 c.fillStyle='#272438';c.beginPath();c.moveTo(x-25,g.y-6);c.lineTo(x,g.y-29);c.lineTo(x+25,g.y-6);c.fill();star(c,x,g.y-9,11,open?'#a4fff0':'#cc729e',4);
 if(!open){for(const s of [-1,1])line(c,[[x-35,y+s*54],[x+35,y-s*54]],'#b583a1',3);}
 c.textAlign='center';c.font='bold 11px VT323, monospace';c.fillStyle=open?'#c9fff3':'#edc1d2';c.fillText(active?'STARGATE ACTIVE':open?'STARGATE READY':seals>0?'PARTIALLY UNLOCKED · '+seals+'/3':'STARGATE LOCKED',x,g.y-40);c.restore();
}
function drawBoss(c,b,t){
 c.save();c.translate(b.x+b.w/2,b.y+b.h);c.scale(b.direction||-1,1);
 ellipse(c,0,4,70,11,'#060a19bb');glow(c,0,-77,126,b.color,.18);
 // Layered regalia and articulated silhouettes distinguish sovereign families.
 const archetype=Math.max(0,BOSSES.findIndex(x=>x.id===b.configId))%5,lean=b.state==='attack'?Math.sin(t*11)*.04:b.state==='stagger'?.12:Math.sin(t*1.7)*.015;
 c.rotate(lean);
 for(const side of [-1,1]){c.save();c.scale(side,1);
  if(archetype===0||archetype===3){c.fillStyle=archetype===0?'#162e37':'#30213f';c.beginPath();c.moveTo(16,-143);c.quadraticCurveTo(83+Math.sin(t*3)*8,-157,104,-68);c.lineTo(70,-37);c.lineTo(42,-74);c.closePath();c.fill();line(c,[[22,-140],[78,-107],[91,-67]],b.color+'aa',2);}
  else if(archetype===1){line(c,[[45,-106],[97,-151],[119,-180]],'#ddeaf1',5);line(c,[[76,-138],[115,-144]],b.color,4);}
  else if(archetype===2){box(c,42,-101,28,72,'#182634',5);box(c,46,-99,20,5,b.color,2);}
  else {c.strokeStyle=b.color+'99';c.lineWidth=3;c.beginPath();c.ellipse(56,-100,23,75,side*.3,0,Math.PI*2);c.stroke();}
  c.restore();}
 if(b.hit>0)c.globalAlpha=.6;
 const fi=b.state==='stagger'?6:b.state==='attack'?Math.floor(t*15):Math.floor(t*7);
 sprite(c,'boss/'+b.configId,-80,-177,160,183,fi);c.globalAlpha=1;
 const crownY=-181+Math.sin(t*2)*3;line(c,[[-29,crownY+10],[-34,crownY-8],[-14,crownY],[0,crownY-23],[14,crownY],[34,crownY-8],[29,crownY+10],[-29,crownY+10]],'#f4d38b',3);star(c,0,crownY,6,b.color,4);
 if(b.phase>1)for(let i=0;i<b.phase+1;i++){const a=t+i*Math.PI*2/(b.phase+1);star(c,Math.cos(a)*83,-95+Math.sin(a)*64,6,b.color,4);}
 if(b.state==='stagger'){for(let i=0;i<3;i++)star(c,Math.cos(t*5+i*2)*39,-197+Math.sin(t*5+i*2)*8,5,'#fff0b4');}
 if(b.state==='windup'){c.lineWidth=3;c.strokeStyle=b.color;c.beginPath();c.arc(0,-86,94,0,Math.PI*2*(1-Math.min(1,b.clock)));c.stroke();}
 c.restore();
}
function drawNightfallBackdrop(c,r,camera,vw,t){
 const a=r.level.arena;
 if(a&&camera+vw>a.left-200){
  c.save();c.fillStyle='#13172caa';c.fillRect(a.left-80,0,a.right-a.left+240,GROUND);
  for(let x=a.left;x<a.right+180;x+=190){
   box(c,x,80,28,GROUND-80,'#282b44',3);box(c,x-9,82,47,14,'#42415b',3);
   c.fillStyle='#090e23';c.beginPath();c.moveTo(x+40,GROUND);c.lineTo(x+40,190);c.quadraticCurveTo(x+92,80,x+144,190);c.lineTo(x+144,GROUND);c.fill();
   line(c,[[x+40,190],[x+92,115],[x+144,190]],'#4e405b',3);
   glow(c,x+14,190,65,r.boss?.color||'#a7b7f3',.13);star(c,x+14,190,8,'#c6e4ff',4);
  }
  c.restore();
 }
 for(const ch of r.level.chambers||[]){if(ch.x>camera+vw||ch.gateX<camera)continue;c.save();c.fillStyle='#1a254333';c.fillRect(ch.x,30,ch.width,GROUND-30);c.textAlign='center';c.fillStyle='#b1c9dc';c.font='bold 14px VT323, monospace';c.fillText((ch.id+1)+'. '+ch.name.toUpperCase(),ch.x+ch.width/2,75);c.restore();}
}
function drawNightfallObjects(c,r,t){
 const p=r.player;
 for(const ch of r.level.chambers||[]){
  for(const z of ch.sigils)if(!z.taken){glow(c,z.x+13,z.y+16,46,'#74e7ec',.22);star(c,z.x+13,z.y+16+Math.sin(t*3)*3,17,'#68def1',4);star(c,z.x+13,z.y+16,8,'#e3fff4',4);}
  if(!ch.complete){
   for(let y=20;y<GROUND;y+=40)box(c,ch.gateX-3,y,7,36,'#ae82bb',2);
   glow(c,ch.gateX,GROUND-90,60,'#d96696',.18);
   c.save();c.textAlign='center';c.font='bold 12px VT323, monospace';c.fillStyle='#ffcade';c.fillText(ch.wavesStarted?'DEFEAT THE WARDENS':'RECOVER '+ch.sigils.filter(z=>!z.taken).length+' SIGIL'+(ch.sigils.filter(z=>!z.taken).length===1?'':'S'),ch.gateX-100,GROUND-140);c.restore();
  }
 }
 const b=r.boss;
 if(b?.active){
  if(b.state==='windup'){
   c.save();c.globalAlpha=.25+.12*Math.sin(t*22);c.fillStyle=b.color;
   if(b.attack==='dash')c.fillRect(r.level.arena.left,GROUND-65,r.level.arena.right-r.level.arena.left,65);
   else if(b.attack==='slam'||b.attack==='rain')c.fillRect(b.targetX-40,20,80,GROUND-20);
   c.restore();
  }
  for(const h of r.bossHazards){
   c.save();
   if(h.warning>0){c.globalAlpha=.3+.3*Math.abs(Math.sin(t*18));c.strokeStyle='#ffbdcf';c.lineWidth=2;c.setLineDash([6,5]);c.strokeRect(h.x-4,h.kind==='rain'?40:h.y,h.w+8,h.kind==='rain'?GROUND-40:h.h);c.restore();continue;}
   glow(c,h.x+h.w/2,h.y+h.h/2,Math.max(h.w,h.h),b.color,.18);
   if(h.kind==='thorn'){c.fillStyle='#f3a6c2';c.beginPath();c.moveTo(h.x,h.y+h.h);c.lineTo(h.x+h.w/2,h.y);c.lineTo(h.x+h.w,h.y+h.h);c.fill();}
   else if(h.kind==='wave'){line(c,[[h.x,h.y+h.h],[h.x+h.w*.25,h.y],[h.x+h.w*.6,h.y+h.h*.4],[h.x+h.w,h.y+h.h]],'#dab8ff',5);}
   else star(c,h.x+h.w/2,h.y+h.h/2,h.h/2,b.color,h.kind==='rain'?4:6);
   c.restore();
  }
 }
 if(r.summon){const z=r.summon;c.save();c.globalAlpha=.6;
  if(z.kind==='ravens')for(let i=0;i<3;i++)sprite(c,'enemy/bat',z.x+Math.cos(t*3+i*2)*40,z.y+Math.sin(t*3+i*2)*24,48,40,Math.floor(t*12+i));
  else drawHero(c,z.x+14,z.y+44,1.1,z.kind==='warden'?'garsi':'loey',t,p.facing,true,{grounded:true});
  c.globalAlpha=.8;glow(c,z.x,z.y,65,'#8ddafa',.2);c.restore();
 }
}

/** Experimental projection of the same 2D physics into a first-person corridor.
 * Not a free-look 3D world. Practice-only and excluded from rewards/rankings. */
function drawFirstPersonExperiment(renderer,r,t){
 const c=renderer.c,w=renderer.w,h=renderer.h,p=r.player,l=r.level;
 c.setTransform(renderer.dpr,0,0,renderer.dpr,0,0);landscape(c,w,h,l.cfg,t,p.x);
 const horizon=h*.34, eye=p.y+p.h*.27, direction=p.facing||1, focal=h*.78;
 const proj=(z,y,lane=0)=>({x:w*.5+lane*focal/(z+125),y:horizon+(y-eye)*focal/(z+125),s:focal/(z+125)});
 for(let d=30;d>=0;d--){const tx=Math.floor(p.x/TILE)+d*direction;if(tx<0||tx>=l.cols)continue;const z=d*TILE;
  for(let row=0;row<l.tiles.length;row++){const v=l.tiles[row][tx];if(!v)continue;
   const a=proj(z,row*TILE,-140),b=proj(z,row*TILE,140),n=proj(z+40,row*TILE,-140),q=proj(z+40,row*TILE,140);
   c.fillStyle=row===12?l.cfg.grass:l.cfg.earth;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.lineTo(q.x,q.y);c.lineTo(n.x,n.y);c.closePath();c.fill();c.strokeStyle='#11223077';c.lineWidth=1;c.stroke();
   if(row!==12){const bh=Math.max(3,40*a.s);box(c,a.x,a.y,b.x-a.x,bh,'#443b58',1);}
  }
 }
 const objs=[...l.coins.filter(x=>!x.taken).map(x=>({x:x.x,y:x.y,key:'coin',frame:t*10})),...l.enemies.filter(e=>e.hp>0).map(e=>({x:e.x,y:e.y,key:e.isBoss?'boss/'+e.configId:'enemy/'+e.type,frame:t*8}))];
 objs.sort((a,b)=>direction*(b.x-a.x));for(const o of objs){const z=(o.x-p.x)*direction;if(z<5||z>1100)continue;const pt=proj(z,o.y);const size=Math.min(h*.55,55*pt.s);sprite(c,o.key,pt.x-size/2,pt.y-size,size,size,o.frame);}
 c.fillStyle='#06102188';c.fillRect(w*.36,h*.9,w*.28,h*.075);c.textAlign='center';c.font='bold '+Math.max(11,h*.03)+'px VT323, monospace';c.fillStyle='#ffe9a5';c.fillText('FIRST PERSON LAB · PRACTICE',w*.5,h*.945);
 line(c,[[w*.5-7,h*.46],[w*.5+7,h*.46]],'#f3f9fe',1);line(c,[[w*.5,h*.46-7],[w*.5,h*.46+7]],'#f3f9fe',1);
 // Hands/knife indicate the body; the player sprite is deliberately not in view.
 c.save();c.translate(w*.54,h*.94+Math.sin(t*8)*Math.min(6,Math.abs(p.vx)/70));c.rotate(-.4);box(c,-16,-4,32,45,'#976847',5);line(c,[[0,-2],[0,-h*.13]],'#e1e8f2',6);c.restore();
}

function drawWorldFeatures(c,r,camera,vw,t){
 for(const lift of r.level.lifts||[]){line(c,[[lift.x+12,lift.top-60],[lift.x+12,lift.bottom]],'#96bbc455',3);line(c,[[lift.x+lift.w-12,lift.top-60],[lift.x+lift.w-12,lift.bottom]],'#96bbc455',3);box(c,lift.x,lift.y,lift.w,lift.h,lift.active?'#9beacb':'#d6b875',4);c.fillStyle='#f7eccd';c.font='bold 10px VT323, monospace';c.fillText(lift.active?'ASCENDING':'SEAL LIFT · INTERACT',lift.x-15,lift.y-15);}
 for(const h of r.level.worldHazards||[]){if(h.x>camera+vw||h.x+h.w<camera)continue;c.save();c.fillStyle=h.active?'#ffd68a88':h.warning?'#ffd68a44':'#8196b91b';c.fillRect(h.x,h.y,h.w,h.h);c.strokeStyle=h.active?'#ffda8b':r.level.cfg.grass;c.lineWidth=h.warning?3:1;c.strokeRect(h.x,h.y,h.w,h.h);c.font='bold 9px VT323, monospace';c.fillStyle='#eff7ff';c.fillText(h.kind.toUpperCase(),h.x-12,h.y-8);if(h.active)for(let i=0;i<4;i++)star(c,h.x+16,h.y+15+i*19,5+Math.sin(t*14+i)*2,r.level.cfg.grass,4);c.restore();}

 const l=r.level;
 for(const z of l.zones||[]){if(z.x+z.w<camera||z.x>camera+vw)continue;c.save();c.fillStyle=z.type==='water'?'#3eb9dc55':z.type==='gravity'?'#ad87f322':'#f7d38611';c.fillRect(z.x,z.y,z.w,z.h);c.strokeStyle=z.type==='water'?'#79edff':z.type==='gravity'?'#bd9bff':'#f5e3bb';c.lineWidth=2;
 for(let i=0;i<12;i++){const x=z.x+((i*39+t*z.strength*24)%z.w+z.w)%z.w,y=z.type==='water'?z.y+Math.sin(t*3+i)*3:z.y+25+i*29;c.beginPath();c.moveTo(x,y);c.lineTo(x+18,y-(z.type==='gravity'?12:0));c.stroke();}c.fillStyle='#eef6ff';c.font='bold 10px VT323, monospace';c.fillText(z.type.toUpperCase(),z.x+12,z.y-9);c.restore();}
 for(const s of l.slopes||[]){if(s.x+s.w<camera||s.x>camera+vw)continue;c.fillStyle=l.cfg.earth;c.beginPath();c.moveTo(s.x,GROUND);c.lineTo(s.x+s.w/2,GROUND-s.h);c.lineTo(s.x+s.w,GROUND);c.fill();line(c,[[s.x,GROUND],[s.x+s.w/2,GROUND-s.h],[s.x+s.w,GROUND]],l.cfg.grass,6);}
 for(const sw of l.switches||[]){box(c,sw.x,sw.y,sw.w,sw.h,sw.on?'#5febba':'#f6b960',5);c.fillStyle='#101827';c.font='bold 12px VT323, monospace';c.fillText(sw.on?'ON':'H',sw.x+4,sw.y+20);}
 for(const g of l.sideGates||[])if(!g.open){box(c,g.x,g.y,g.w,g.h,'#9484b6',3);for(let i=0;i<4;i++)line(c,[[g.x,g.y+i*20],[g.x+g.w,g.y+i*20]],'#ddceff',2);}
}

function drawCosmeticParts(c,parts,t,moving){
 if(!parts)return;c.save();
 for(const [part,style]of Object.entries(parts)){const color=COSMETIC_COLORS[style];if(!color)continue;
 if(part==='head')line(c,[[-11,-54],[8,-54],[12,-48]],color,3);
 if(part==='torso')line(c,[[-10,-34],[8,-28],[5,-17]],color,3);
 if(part==='gloves'){box(c,-18,-24,7,6,color,2);box(c,13,-29,7,6,color,2);}
 if(part==='boots'){box(c,-17,-4,12,4,color,1);box(c,5,-4,12,4,color,1);}
 if(part==='cape'){c.fillStyle=color+'aa';c.beginPath();c.moveTo(-10,-41);c.quadraticCurveTo(-40-Math.sin(t*5)*7,-20,-31,-7);c.lineTo(-14,-17);c.fill();}
 // Weapon tint overlays are retired; saved cosmetic selections are preserved.
 if(part==='aura')for(let i=0;i<4;i++)star(c,Math.cos(t+i*1.57)*33,-27+Math.sin(t+i*1.57)*28,2,color,4);
 if(part==='emote'&&!moving){const y=-78+Math.sin(t*3)*3;style==='frost'?star(c,0,y,5,color,4):star(c,0,y,7,color,5);}
 }c.restore();
}

function drawBossDissolve(c,b,id,elapsed){
 if(elapsed>2.2)return;const q=Math.min(1,elapsed/2.2),x=b.x+b.w/2,y=b.y+b.h/2;c.save();c.globalAlpha=1-q;
 for(let i=0;i<6;i++){const a=i*Math.PI/3+id*.37,dx=Math.cos(a)*q*(70+id*3),dy=-q*95+Math.sin(a)*q*40;c.save();c.translate(x+dx,y+dy);c.rotate((i%2?1:-1)*q*(.3+id*.025));c.beginPath();c.rect(-80+i*27,-100,28,185);c.clip();sprite(c,'boss/'+b.configId,-80,-100,160,183,0);c.restore();}
 c.strokeStyle=b.color;c.lineWidth=4*(1-q);c.beginPath();c.arc(x,y,20+q*(120+id*6),0,Math.PI*2);c.stroke();for(let i=0;i<15+id;i++){const a=i*2.399+id*.4;star(c,x+Math.cos(a)*q*160,y+Math.sin(a)*q*130,4*(1-q),b.color,4);}c.restore();
}

/** Draw a registered weapon through the existing sprite cache. Never draw stick fallbacks.
 * Current body sheets contain painted weapons. Opt in with weaponLayer:"separate"
 * only AFTER supplying weapon-free body/outfit art, preventing doubled weapons.
 */
export function drawHeroWeapon(c,p,t,frame=heroArtFrame(p,t),bob=0,bodyKey='hero/'+p.character) {
 const spec=weaponArtForActor(p),body=ASSET_CONFIG.images[bodyKey];
 if(!spec||body?.weaponLayer!=='separate')return false;
 const skin=p.normalizedCombat?null:wardrobeLayers(p.character,p.wardrobe,ASSET_CONFIG,undefined,combatProfile(p).weapon).find(l=>l.slot==='weapon');
 const key=skin?.key||spec.key,meta=ASSET_CONFIG.images[key],im=assetImage(key);
 if(!meta||!im?.complete||!im.naturalWidth)return false;
 const draw=offhand=>{
  const pose=weaponPose(p,frame,t,bob,offhand,body.weaponSockets);
  if(skin){pose.key=key;pose.anchorX=skin.anchor[0];pose.anchorY=skin.anchor[1];pose.height=skin.height;pose.angle+=(skin.angle-spec.angle)*(offhand?-1:1);}
  const h=pose.height;
  const w=h*(meta.frameWidth||im.naturalWidth)/(meta.frameHeight||im.naturalHeight);
  c.save();c.translate(pose.x,pose.y);if(pose.mirror)c.scale(-1,1);c.rotate(pose.angle);
  const ok=sprite(c,pose.key,-w*pose.anchorX,-h*pose.anchorY,w,h,0);c.restore();return ok;
 };
 if(spec.dual)draw(true);
 return draw(false);
}

function drawUnarmedProxy(c,hero,p,t,bob){
 const phase=unarmedPhase(p),punch=phase==='active'?12:phase==='startup'?-3:0;
 if(usesCrouchPose(p)){c.save();c.translate(0,bob);c.fillStyle='#111b30';c.fillRect(-7,-39,22,18);c.fillRect(-13,-23,30,13);c.fillRect(-21,-13,17,10);c.fillRect(8,-11,17,10);c.fillStyle=hero.color;c.fillRect(-4,-36,16,12);c.fillRect(-10,-21,24,9);c.fillRect(-22,-17,11,7);c.fillRect(15+punch,-22,10,8);c.fillStyle='#fff0c2';c.fillRect(5,-32,3,3);c.fillRect(10,-32,3,3);c.restore();return;}
 c.save();c.translate(0,bob);c.fillStyle='#111b30';
 c.fillRect(-11,-61,22,20);c.fillRect(-15,-40,30,25);c.fillRect(-14,-17,11,18);c.fillRect(4,-17,11,18);
 c.fillStyle=hero.color;c.fillRect(-8,-58,16,14);c.fillRect(-12,-37,24,17);
 c.fillRect(-21,-40,9,10);c.fillRect(13+punch,-37,10,10);c.fillRect(10,-31,5+punch,5);
 c.fillStyle='#fff0c2';c.fillRect(-6,-53,3,3);c.fillRect(4,-53,3,3);
 c.restore();
}

function drawCrouchedHero(c,key,actor,t,frame,bob){
 const im=assetImage(key),cfg=ASSET_CONFIG.images[key];if(!im?.naturalWidth||!cfg)return false;
 const fw=cfg.frameWidth||128,fh=cfg.frameHeight||160,cols=Math.floor(im.naturalWidth/fw),fi=Math.max(0,Math.floor(frame))%(cfg.frames||1);
 const sx=(fi%cols)*fw,sy=Math.floor(fi/cols)*fh;
 c.save();c.translate(0,-6);c.scale(CROUCH_CUTOUT.scale,CROUCH_CUTOUT.scale);
 const part=p=>{const [x,y,w,h]=p.crop;c.save();c.translate((p.at[0]-64)*54/128,-65+p.at[1]*68/160+bob);c.rotate(p.angle);c.drawImage(im,sx+x*fw/128,sy+y*fh/160,w*fw/128,h*fh/160,(x-p.pivot[0])*54/128,(y-p.pivot[1])*68/160,w*54/128,h*68/160);c.restore();};
 c.imageSmoothingEnabled=false;for(const leg of CROUCH_CUTOUT.legs)part(leg);part(CROUCH_CUTOUT.torso);
 const torso=CROUCH_CUTOUT.torso;c.save();c.translate(0,-65+torso.at[1]*68/160+bob);c.rotate(torso.angle);c.translate(0,65-torso.pivot[1]*68/160-bob);
 drawHeroWeapon(c,actor,t,frame,bob,key);c.restore();c.restore();return true;
}
