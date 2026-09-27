import { sprite, assetImage, ASSET_CONFIG } from './assets.js';
import { TILE, GROUND, HEROES, WORLDS, heroById, POWERS, TRAILS, PETS } from './data.js';
import { clamp } from './engine.js';
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
    const walk = moving ? Math.sin(t * 17) : 0, bob = moving ? -Math.abs(walk) * 1.7 : Math.sin(t * 2.5) * .65;
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
    // The included concept-derived sprites are single poses with procedural bob, lean,
    // scarf/foot accents. A true sprite strip works by editing the manifest frame count.
    const cfg = ASSET_CONFIG.images['hero/' + hero.id];
    let frame = 0;
    if ((cfg?.frames || 1) > 1)
        frame = effects.deadFor > 0 ? 5 : !effects.grounded && effects.vy !== undefined ? 4 : moving ? 1 + Math.floor(t * 10) % 3 : 0;
    c.rotate(moving ? walk * .013 : 0);
    sprite(c, 'hero/' + hero.id, -27, -65 + bob, 54, 68, frame);
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
    const scale = e.type === 'golem' ? 1.32 : e.type === 'maw' ? 1.12 : 1;
    const width = (['bat', 'drone'].includes(e.type) ? 58 : 44) * scale, height = 44 * scale;
    c.save();
    c.translate(e.x + e.w / 2, e.y + e.h);
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
    if (!r.petId)
        return;
    const pet = r.petState, s = ['dragon', 'orca'].includes(r.petId) ? 70 : 48;
    c.save();
    c.translate(pet.x + 14, pet.y + 20);
    c.scale(r.player.facing, 1);
    sprite(c, 'pet/' + r.petId, -s / 2, -s * .68 + Math.sin(t * 6) * 2, s, s * .8, Math.floor(t * 8));
    c.restore();
}
function landscape(c, w, h, cfg, t, scroll = 0, menu = false) {
    c.fillStyle = grad(c, 0, h, cfg.sky[0], cfg.sky[1]);
    c.fillRect(0, 0, w, h);
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
    resize(w, h, quality = 'high') { this.w = w; this.h = h; this.dpr = Math.min(window.devicePixelRatio || 1, quality === 'high' ? 2 : 1); this.canvas.width = Math.round(w * this.dpr); this.canvas.height = Math.round(h * this.dpr); this.canvas.style.width = w + 'px'; this.canvas.style.height = h + 'px'; }
    effects(events) {
        for (const e of events) {
            if (['coin', 'stomp', 'break', 'skill', 'power', 'checkpoint', 'hurt', 'blast', 'finish'].includes(e.type)) {
                const colors = e.type === 'coin' ? ['#ffd363', '#fff2b1'] : e.type === 'hurt' ? ['#ff7690', '#fff4da'] : ['#a1efdb', '#c4aeff', '#fff1b8'];
                const n = e.type === 'coin' ? 5 : e.type === 'blast' ? 22 : 12;
                for (let i = 0; i < n; i++) {
                    const a = Math.PI * 2 * i / n;
                    this.fx.push({ x: e.x + 14, y: e.y + 8, vx: Math.cos(a) * (35 + i * 5), vy: Math.sin(a) * (45 + i * 4) - 45, life: .5 + (i % 3) * .13, max: .8, color: colors[i % colors.length], size: 2 + i % 3 });
                }
                if (e.type === 'hurt')
                    this.shake = .18;
            }
            if (e.type === 'blast')
                this.fx.push({ x: e.x + 14, y: e.y + 22, ring: true, radius: e.radius, life: .5, max: .5 });
        }
        this.fx = this.fx.slice(-200);
    }
    drawMenu(t, screen = 'home', hero = 'wissem', world = 0) {
        const c = this.c, w = this.w, h = this.h;
        c.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        landscape(c, w, h, WORLDS[world], this.motion ? t : 0, t * 3, true);
        if (screen === 'home') {
            const x = w * .58, y = h * .65, s = Math.min(w / 960, h / 500);
            glow(c, x, y - 95 * s, 160 * s, '#ffebaa', .30);
            this.island(c, x, y + 15 * s, 135 * s, 42 * s, WORLDS[0]);
            drawHero(c, x, y + 4 * s, 2.9 * s, hero, this.motion ? t : 0, 1, false);
            for (let i = 0; i < 5; i++) {
                const a = i * .8 + t * .18;
                drawCoin(c, x + Math.cos(a) * 135 * s, y - 90 * s + Math.sin(a) * 55 * s, t + i, 1.45 * s);
            }
            for (let i = 0; i < 3; i++)
                star(c, x + (i - 1) * 95 * s, y - 190 * s + (i % 2) * 20, 6 * s, '#fff3b1');
            this.island(c, w * .82, h * .62, 55 * s, 20 * s, WORLDS[0]);
            prop(c, w * .82, h * .59, .62 * s, WORLDS[0], .2, t);
            this.island(c, w * .32, h * .56, 38 * s, 15 * s, WORLDS[0]);
        }
        c.fillStyle = screen === 'home' ? grad(c, 0, h, '#08132930', '#090f26be') : '#0b142ade';
        c.fillRect(0, 0, w, h);
    }
    island(c, x, y, rx, ry, cfg) { c.fillStyle = grad(c, y, ry * 2, cfg.earth, '#5c5b68'); c.beginPath(); c.moveTo(x - rx, y); c.quadraticCurveTo(x - rx * .3, y + ry * 3, x + rx * .5, y + ry * 1.8); c.lineTo(x + rx, y); c.closePath(); c.fill(); ellipse(c, x, y, rx, ry * .45, cfg.grass); ellipse(c, x - 8, y - 4, rx * .87, ry * .28, '#c5ed8a'); for (let i = 0; i < 4; i++)
        line(c, [[x - rx * .6 + i * rx * .35, y + ry * .3], [x - rx * .5 + i * rx * .27, y + ry * 1.1]], '#4c536426', 4); }
    drawRun(r, t, dt = 1 / 60) {
        const c = this.c, w = this.w, h = this.h, p = r.player, l = r.level;
        this.motion = this.motion !== false;
        const sceneT = this.motion ? t : 0;
        const logicalH = this.close ? 405 : 465, scale = h / logicalH, vw = w / scale;
        if (this.lastRun !== r || p.x < 150 && this.camera > 300) {
            this.camera = 0;
            this.cy = GROUND - logicalH * .72;
            this.lastRun = r;
            this.fx = [];
        }
        const desired = clamp(p.x - vw * .31, 0, Math.max(0, l.width - vw));
        this.camera += (desired - this.camera) * Math.min(1, dt * 8);
        const desiredY = clamp(Math.min(GROUND - logicalH * .72, p.y - logicalH * .22), 0, 240);
        this.cy += (desiredY - this.cy) * Math.min(1, dt * 6);
        c.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        landscape(c, w, h, l.cfg, sceneT, this.camera);
        c.save();
        c.scale(scale, scale);
        this.shake = Math.max(0, this.shake - dt);
        const shake = this.motion ? Math.sin(t * 140) * this.shake * 15 : 0;
        c.translate(-this.camera + shake, -this.cy);
        const start = Math.max(0, Math.floor(this.camera / TILE) - 2), end = Math.min(l.cols, Math.ceil((this.camera + vw) / TILE) + 2);
        for (const d of l.decor)
            if (d.x > this.camera - 100 && d.x < this.camera + vw + 100 && tileAtVisual(l, d.x))
                prop(c, d.x, GROUND, d.size * .63, l.cfg, d.v, sceneT);
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
        for (const s of l.spikes)
            for (let i = 0; i < 3; i++) {
                c.fillStyle = '#ecafb3';
                c.beginPath();
                c.moveTo(s.x + i * 19, s.y + 20);
                c.lineTo(s.x + i * 19 + 9, s.y);
                c.lineTo(s.x + i * 19 + 19, s.y + 20);
                c.fill();
                line(c, [[s.x + i * 19 + 9, s.y + 4], [s.x + i * 19 + 13, s.y + 17]], '#fff1df', 1.5);
            }
        // Orca Prince adds a temporary water collision surface; the original map is untouched.
        if (p.prince > 0)
            for (let x = start; x < end; x++)
                if (!l.tiles[12][x]) {
                    c.fillStyle = '#399dcea9';
                    c.fillRect(x * TILE, GROUND, 40, 170);
                    line(c, [[x * TILE, GROUND + Math.sin(t * 4 + x) * 2], [x * TILE + 20, GROUND + Math.sin(t * 4 + x + 1) * 2], [x * TILE + 40, GROUND]], '#b2f9ff', 3);
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
        if (r.petId === 'eagle') {
            for (const e of l.enemies)
                if (e.alive && e.x > p.x && e.x < p.x + 900) {
                    star(c, e.x + e.w / 2, e.y - 18, 5, '#ffd576', 4);
                }
            for (let x = start; x < end; x++)
                if (!l.tiles[12][x] && l.tiles[12][x - 1]) {
                    c.fillStyle = '#ffd477';
                    c.font = 'bold 18px sans-serif';
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
        const g = l.goal;
        glow(c, g.x + 29, g.y + g.h / 2, 95, '#fbe9b4', .20);
        c.strokeStyle = '#fff3cb';
        c.lineWidth = 9;
        c.beginPath();
        c.ellipse(g.x + 29, g.y + g.h / 2, 30, g.h / 2 - 7, 0, 0, Math.PI * 2);
        c.stroke();
        c.strokeStyle = '#a2eddc';
        c.lineWidth = 4;
        c.stroke();
        for (let i = 0; i < 6; i++)
            star(c, g.x + 29 + Math.cos(sceneT + i) * 35, g.y + g.h / 2 + Math.sin(sceneT + i) * (g.h / 2 - 5), 4, '#fff2bd', 4);
        box(c, g.x - 15, g.y + g.h - 9, 87, 12, l.cfg.grass, 5);
        for (const e of l.enemies)
            if (e.alive && e.x > this.camera - 60 && e.x < this.camera + vw + 60)
                drawMonster(c, e, sceneT);
        for (const s of r.shots) {
            glow(c, s.x + 7, s.y + 7, 20, s.owner === 'hero' ? '#ffc775' : '#ff9cd3', .5);
            ellipse(c, s.x + 7, s.y + 7, 7, 7, s.owner === 'foe' ? '#f587ad' : s.kind === 'ice' ? '#a8efff' : s.kind === 'blade' ? '#d2adff' : '#ffe394');
        }
        drawPet(c, r, sceneT);
        if (p.deadFor <= 0) {
            if (p.invincible <= 0 || Math.floor(t * 16) % 2 === 0) {
                if ((p.dash > 0 || p.haste > 0) && this.motion) {
                    c.save();
                    c.globalAlpha = .15;
                    drawHero(c, p.x + 14 - p.facing * 25, p.y + p.h, 1, p.character, sceneT, p.facing, true);
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
export function paintPortrait(canvas, hero, selected = false) { const c = canvas.getContext('2d'), w = canvas.width, h = canvas.height, hc = heroById(hero); c.clearRect(0, 0, w, h); c.fillStyle = grad(c, 0, h, selected ? hc.color + '77' : '#51668144', selected ? hc.dark + 'aa' : '#26395077'); rounded(c, 0, 0, w, h, 18); c.fill(); glow(c, w * .55, h * .5, h * .6, hc.color, .20); drawHero(c, w * .5, h * .98, h / 78, hero, 0, 1, false); }
export function paintMap(canvas, id) { const c = canvas.getContext('2d'), w = canvas.width, h = canvas.height, cfg = WORLDS[id]; c.clearRect(0, 0, w, h); landscape(c, w, h, cfg, 0, 0, true); if (sprite(c, 'map/' + id, 0, 0, w, h)) {
    c.fillStyle = '#11132722';
    c.fillRect(0, 0, w, h);
    return;
} prop(c, w * .78, h * .8, .55, cfg, .3, 0); box(c, 0, h * .82, w, h * .2, cfg.earth, 0); box(c, 0, h * .80, w, 8, cfg.grass, 2); for (let i = 0; i < 3; i++)
    drawCoin(c, w * .2 + i * 25, h * .58, 0, .65); }
