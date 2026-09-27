import { sprite, assetUrl, assetsReady } from './assets.js';
import { VERSION, HEROES, WORLDS, POWERS, PETS, TRAILS, QUESTS, CHAPTERS, heroById, mapObjectives, dailyQuests, DT } from './data.js';
import { createRun, stepRun, formatTime, objectiveResults, runDistance, clamp } from './engine.js';
import { Renderer, paintPortrait, paintMap } from './render.js';
import { icon } from './icons.js';
import { AudioEngine } from './audio.js';
import { loadSave, saveProgress, starsTotal, claimQuest, questValue, bankRunStats, recordRun, unlockTrail, refreshDay, utcDay, equipPet, sanitizeSave } from './progress.js';
const $ = id => document.getElementById(id);
const formatNumber = n => Math.floor(n || 0).toLocaleString('en-US');
const escapeText = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
let storage;
try {
    storage = window.localStorage;
}
catch {
    storage = { getItem() { throw Error('Unavailable'); }, setItem() { throw Error('Unavailable'); } };
}
const loaded = loadSave(storage), save = loaded.save, renderer = new Renderer($('scene')), audio = new AudioEngine();
let page = 'home', run = null, paused = false, modalType = null, selectedMap = 0, selectedHero = save.hero, practice = false, dailyTab = false, selectedPet = save.pet || 'wolf', practicePet = save.pet, toastTimer = 0, lastHud = 0, stageUntil = 0, hintUntil = 0, finishDelay = 0, previousFocus = null, storageWarning = loaded.ephemeral;
const keys = { left: false, right: false, jump: false, skill: false, skill2: false, pet: false, pet2: false };
const pointers = new Map();
// Preserve short taps that begin and end between two simulation frames.
const pendingPresses = { jump: false, skill: false, skill2: false, pet: false, pet2: false };
function icons(root = document) { root.querySelectorAll('[data-icon]').forEach(e => { e.innerHTML = icon(e.dataset.icon); e.removeAttribute('data-icon'); }); }
icons();
function toast(text, seconds = 2.5) { $('toast').textContent = text; $('toast').hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').hidden = true, seconds * 1000); }
function persist() { if (!saveProgress(storage, save) && !storageWarning) {
    storageWarning = true;
    toast('Storage is unavailable. This session will not be saved.', 5);
} updateTop(); }
function audioGesture() { audio.enabled = save.settings.sound; audio.music = save.settings.music; if (save.settings.sound)
    audio.unlock(); }
function click() { audioGesture(); audio.play('click'); }
function updateTop() {
    refreshDay(save);
    const h = heroById(save.hero);
    $('gold').textContent = formatNumber(save.gold);
    $('totalStars').textContent = starsTotal(save);
    $('starLimit').textContent = '/' + WORLDS.length * 3;
    $('worldCountTag').textContent = WORLDS.length + ' WORLDS';
    $('heroCountTag').textContent = HEROES.length + ' HEROES';
    $('petCountTag').textContent = PETS.length + ' PETS';
    $('endlessTeaser').textContent = WORLDS.length + ' worlds. No finish line.';
    $('profileName').textContent = h.name;
    $('profileLevel').textContent = `EXPLORER LV. ${1 + Math.floor(save.xp / 500)}`;
    $('xpBar').style.width = ((save.xp % 500) / 5) + '%';
    $('homeHero').textContent = h.name.toUpperCase();
    $('homeSkill').textContent = h.skill.toUpperCase();
    paintPortrait($('profilePortrait'), save.hero, true);
    const next = Math.max(0, save.maps.findIndex(m => !m.clear));
    $('continueMap').textContent = save.maps.every(m => m.clear) ? 'Replay the adventure' : WORLDS[next].name;
    $('continueSub').textContent = `World ${String(next + 1).padStart(2, '0')} • ${(CHAPTERS[WORLDS[next].chapter] || 'The farther frontier')}`;
    $('dailyTeaser').textContent = WORLDS[dailyWorld()].name;
    const ready = QUESTS.some(q => !save.claims.includes(q.id) && questValue(save, q) >= q.target) || dailyQuests(save.daily.day).some(q => !save.daily.claims.includes(q.id) && (save.daily.stats[q.stat] || 0) >= q.target);
    $('questDot').hidden = !ready;
}
function applySettings() { audio.enabled = save.settings.sound; audio.music = save.settings.music; audio.sfxVolume = save.settings.sfxVolume; audio.musicVolume = save.settings.musicVolume; renderer.motion = save.settings.motion; renderer.trail = save.trail; renderer.close = save.settings.zoom === 'close'; document.body.classList.toggle('reduce-motion', !save.settings.motion); $('touchControls').classList.toggle('left-handed', save.settings.leftHanded); document.documentElement.style.setProperty('--control-opacity', save.settings.opacity); $('sprintControl').classList.toggle('enabled', save.settings.sprint); renderer.resize(innerWidth, innerHeight, save.settings.quality); if (!save.settings.sound && audio.context)
    audio.context.suspend().catch(() => { }); }
function dailyWorld() { let hash = 0; for (const c of utcDay())
    hash = (hash * 31 + c.charCodeAt(0)) >>> 0; return hash % WORLDS.length; }
function showPage(name) { if (run)
    return; page = name; document.querySelectorAll('.page').forEach(e => e.classList.toggle('active', e.id === 'page-' + name)); document.querySelectorAll('[data-page]').forEach(e => e.classList.toggle('active', e.dataset.page === name)); if (name === 'campaign')
    renderMaps(); if (name === 'heroes')
    renderHeroes(); if (name === 'pets')
    renderPets(); if (name === 'missions')
    renderQuests(); if (name === 'records')
    renderRecords(); updateTop(); }
function isUnlocked(id) { return id === 0 || save.maps[id - 1].clear; }
function difficultyHTML(level) { return `<div class="difficulty">${[1, 2, 3, 4, 5].map(i => `<b class="${i <= level ? 'on' : ''}"></b>`).join('')} <span style="margin-left:4px">${['Relaxed', 'Lively', 'Daring', 'Intense', 'Legendary'][level - 1]}</span></div>`; }
function renderMaps() {
    const grid = $('mapGrid');
    grid.innerHTML = WORLDS.map(w => `${w.id % 5 === 0 ? `<div class="chapter-label">${String(w.chapter + 1).padStart(2, '0')} / ${(CHAPTERS[w.chapter] || 'The farther frontier').toUpperCase()}</div>` : ''}<button class="map-card ${w.id === selectedMap ? 'selected' : ''} ${!isUnlocked(w.id) && !practice ? 'locked' : ''}" data-map="${w.id}" aria-label="World ${w.id + 1}: ${w.name}${isUnlocked(w.id) || practice ? '' : ' (locked)'}"><canvas width="210" height="104" data-map-art="${w.id}"></canvas><b class="map-number">${String(w.id + 1).padStart(2, '0')}</b>${!isUnlocked(w.id) && !practice ? `<span class="map-lock">${icon('lock')}</span>` : ''}<strong class="map-name">${w.name}</strong><div class="map-stars">${save.maps[w.id].stars.map(v => `<i class="${v ? 'star-earned' : ''}">${icon('star')}</i>`).join('')}</div></button>`).join('');
    grid.querySelectorAll('[data-map-art]').forEach(c => paintMap(c, +c.dataset.mapArt));
    grid.querySelectorAll('[data-map]').forEach(b => b.onclick = () => { click(); selectedMap = +b.dataset.map; renderMaps(); });
    $('practiceToggle').classList.toggle('enabled', practice);
    $('practiceToggle').innerHTML = icon('gamepad') + `<span>Practice: ${practice ? 'on' : 'off'}</span>`;
    const w = WORLDS[selectedMap], m = save.maps[selectedMap], allowed = isUnlocked(selectedMap) || practice;
    $('mapDetails').innerHTML = `<div class="map-summary"><canvas class="detail-art" id="selectedMapArt" width="490" height="172"></canvas><span class="detail-overline">WORLD ${String(w.id + 1).padStart(2, '0')} / ${WORLDS.length}</span><h3>${w.name}</h3><p>${w.tagline} · ${w.sections} sectors · ${formatNumber(w.length)} tiles</p>${difficultyHTML(w.difficulty)}${mapObjectives(w.id).map((o, i) => `<div class="objective ${m.stars[i] ? 'done' : ''}">${icon('star')}<span>${o.label}</span></div>`).join('')}</div><button id="playMapButton" class="primary" ${allowed ? '' : 'disabled'}>${icon(allowed ? 'play' : 'lock')}${allowed ? (practice ? 'Practice this world' : 'Play this world') : `Clear world ${String(w.id).padStart(2, '0')} first`}</button>${practice ? `<div class="practice-note">All ${WORLDS.length} worlds are open in practice. No medals, records, gold, or mission rewards.</div>` : m.time ? `<p style="margin-bottom:0">Personal best: ${formatTime(m.time)} • ${formatNumber(m.score)} pts</p>` : '<p style="margin-bottom:0">Stars stay earned across replays.</p>'}`;
    paintMap($('selectedMapArt'), selectedMap);
    $('playMapButton').onclick = () => requestStart(selectedMap, practice ? 'practice' : 'campaign');
}
function renderHeroes() {
    const grid = $('heroGrid');
    grid.innerHTML = HEROES.map(h => `<button class="hero-card ${h.id === selectedHero ? 'selected' : ''}" data-hero="${h.id}" aria-label="${h.name}, ${h.skill}"><canvas width="185" height="180" data-hero-art="${h.id}"></canvas><span class="hero-skill-icon">${icon(h.icon)}</span><strong>${h.name}</strong><small>${h.skills[0].name} + ${h.skills[1].name}</small></button>`).join('');
    grid.querySelectorAll('[data-hero-art]').forEach(c => paintPortrait(c, c.dataset.heroArt, c.dataset.heroArt === selectedHero));
    grid.querySelectorAll('[data-hero]').forEach(b => b.onclick = () => { click(); selectedHero = b.dataset.hero; renderHeroes(); });
    const h = heroById(selectedHero), uses = save.mastery[h.id] || 0;
    $('heroDetails').innerHTML = `<div class="hero-detail-top"><canvas width="140" height="140" id="detailHero"></canvas><div><span class="detail-overline">${save.hero === h.id ? 'YOUR HERO' : 'MEET YOUR NEXT HERO'}</span><h3>${h.name}</h3><small>${h.role}</small></div></div><div class="skill-description"><h4>${icon(h.icon)} ${h.skill}</h4><p>${h.description}</p><small>${h.cooldown}s cooldown • Mastery Lv. ${Math.min(10, 1 + Math.floor(uses / 20))} • ${uses} uses</small><h4>${icon(h.skills[1].icon)} ${h.skills[1].name}</h4><p>${h.skills[1].description}</p><small>${h.skills[1].cooldown}s cooldown</small><p class="hero-passive">${h.passive}</p></div><button id="equipHero" class="primary">${icon(save.hero === h.id ? 'check' : 'user')}${save.hero === h.id ? 'Equipped' : `Play as ${h.name}`}</button><div class="trail-heading">TRAIL COLLECTION <span>Cosmetic only</span></div><div class="trails">${TRAILS.map(t => `<button class="trail-button ${save.trail === t.id ? 'active' : ''}" data-trail="${t.id}" aria-label="${t.name}, ${save.ownedTrails.includes(t.id) ? 'owned' : t.cost + ' coins'}"><i style="background:${t.color};color:${t.color}"></i><small>${save.ownedTrails.includes(t.id) ? (save.trail === t.id ? 'On' : 'Use') : t.cost}</small></button>`).join('')}</div>`;
    paintPortrait($('detailHero'), h.id, true);
    $('equipHero').onclick = () => { click(); save.hero = h.id; persist(); renderHeroes(); toast(`${h.name} equipped • ${h.skill}`); };
    $('heroDetails').querySelectorAll('[data-trail]').forEach(b => b.onclick = () => { click(); const t = TRAILS.find(t => t.id === b.dataset.trail); if (!unlockTrail(save, t.id)) {
        toast(`Collect ${formatNumber(t.cost - save.gold)} more coins to unlock ${t.name}.`);
        return;
    } renderer.trail = save.trail; persist(); renderHeroes(); toast(`${t.name} trail equipped.`); });
}
function renderPets() {
    const pet = PETS.find(p => p.id === selectedPet) || PETS[0];
    $('petGrid').innerHTML = PETS.map(p => `<button class="pet-card ${p.id === selectedPet ? 'selected' : ''} ${p.rarity === 'super rare' ? 'rare' : ''}" data-pet="${p.id}"><span class="pet-rarity">${p.rarity.toUpperCase()}</span><img src="${assetUrl('pet/' + p.id)}" alt="${p.name}"><strong>${p.name}</strong><small>${save.pets.includes(p.id) ? save.pet === p.id ? 'EQUIPPED' : 'COLLECTED' : `RESCUE IN WORLD ${p.unlockWorld + 1}`}</small></button>`).join('');
    $('petGrid').querySelectorAll('[data-pet]').forEach(b => b.onclick = () => { click(); selectedPet = b.dataset.pet; renderPets(); });
    const owned = save.pets.includes(pet.id);
    $('petDetails').innerHTML = `<span class="detail-overline">${pet.rarity.toUpperCase()} COMPANION</span><h3>${pet.name}</h3><p>${pet.description}</p>${pet.skills.map(sk => `<div class="pet-ability"><b>${icon(sk.icon)} ${sk.name}</b><p>${sk.description}</p><small>${sk.duration}s duration · ${sk.cooldown}s cooldown</small></div>`).join('')}<p class="pet-location">Find the glowing rescue capsule in <b>${WORLDS[pet.unlockWorld]?.name || 'a future world'}</b>, around ${Math.round(pet.fraction * 100)}% of the route.</p><button id="equipPet" class="primary" ${owned ? '' : 'disabled'}>${icon(owned ? 'check' : 'lock')}${owned ? (save.pet === pet.id ? 'Equipped' : 'Equip companion') : 'Rescue to equip in campaign'}</button><button id="practicePetButton" class="secondary">${icon('gamepad')}Test ${pet.name} in practice</button><button id="noPetButton" class="secondary">Adventure without a pet</button><small class="pet-note">One pet at a time. Practice unlocks every pet for testing only, without rewards or collection progress.</small>`;
    $('equipPet').onclick = () => { if (equipPet(save, pet.id)) {
        click();
        practicePet = pet.id;
        persist();
        renderPets();
        toast(pet.name + ' equipped');
    } };
    $('practicePetButton').onclick = () => { click(); practicePet = pet.id; practice = true; selectedMap = pet.unlockWorld; showPage('campaign'); toast(pet.name + ' selected for practice. Choose any world.', 4); };
    $('noPetButton').onclick = () => { click(); equipPet(save, null); practicePet = null; persist(); renderPets(); toast('No companion equipped'); };
}
function renderQuests() { refreshDay(save); $('journeyTab').classList.toggle('selected', !dailyTab); $('dailyTab').classList.toggle('selected', dailyTab); const qs = dailyTab ? dailyQuests(save.daily.day) : QUESTS, claims = dailyTab ? save.daily.claims : save.claims; $('questList').innerHTML = (dailyTab ? `<div class="chapter-label">${escapeText(save.daily.day)} UTC • RESETS DAILY • OFFLINE DEVICE CLOCK</div>` : '') + qs.map(q => { const v = dailyTab ? save.daily.stats[q.stat] || 0 : questValue(save, q), claimed = claims.includes(q.id), ready = v >= q.target; return `<article class="quest-card"><div class="quest-head"><span class="quest-icon">${icon(q.icon)}</span><strong>${q.name}</strong></div><p>${q.text}</p><div class="quest-progress"><i style="width:${Math.min(100, v / q.target * 100)}%"></i></div><div class="quest-foot"><span>${formatNumber(Math.min(v, q.target))} / ${formatNumber(q.target)}</span><button class="quest-claim ${claimed ? 'claimed' : ready ? 'ready' : ''}" data-claim="${q.id}" ${!ready || claimed ? 'disabled' : ''}>${icon(claimed ? 'check' : 'coins')}${claimed ? 'Claimed' : ready ? 'Claim ' + q.reward : q.reward}</button></div></article>`; }).join(''); $('questList').querySelectorAll('[data-claim]').forEach(b => b.onclick = () => { click(); const reward = claimQuest(save, b.dataset.claim, dailyTab); if (reward) {
    audio.play('power');
    toast(`Mission complete • +${reward} coins`);
    persist();
    renderQuests();
} }); }
function renderRecords() { const e = save.endless, clears = save.maps.filter(m => m.clear).length; $('recordContent').innerHTML = `<div class="record-hero">${icon('trophy')}<small>ENDLESS PERSONAL BEST</small><strong>${e.best ? formatNumber(e.best) : '—'}</strong><p>${e.best ? `Farthest world reached: ${e.stage}` : 'Your first great run is still ahead.'}</p><button id="recordEndless" class="primary">${icon('infinity')}Beat your best</button></div><div class="record-right"><div class="stats-row"><div class="stat-box"><small>CAMPAIGN</small><b>${clears}<small style="display:inline"> / ${WORLDS.length}</small></b></div><div class="stat-box"><small>STARS EARNED</small><b>${starsTotal(save)}<small style="display:inline"> / ${WORLDS.length * 3}</small></b></div><div class="stat-box"><small>MONSTERS BEATEN</small><b>${formatNumber(save.totals.kills)}</b></div></div><div class="record-label">BEST ENDLESS RUNS • LOCAL ONLY</div>${e.runs.length ? e.runs.map((r, i) => `<div class="record-row"><span class="rank">${i + 1}</span><span class="record-info"><b>${heroById(r.hero).name} • World ${r.stage}</b><small>${formatNumber(r.distance)} m • ${escapeText(r.date)}</small></span><b>${formatNumber(r.score)}</b></div>`).join('') : '<div class="empty-record">Nothing invented. Nothing online.<br>Finish an endless attempt to put your first real score here.</div>'}<div class="record-label">DAILY CHALLENGE • ${escapeText(save.daily.day)} UTC</div><div class="record-row"><span class="rank">${icon('bullseye')}</span><span class="record-info"><b>${WORLDS[dailyWorld()].name}</b><small>Today’s best on this device</small></span><b>${save.daily.best ? formatNumber(save.daily.best) : '—'}</b></div></div>`; $('recordEndless').onclick = showEndlessIntro; }
function openModal(type, html) { previousFocus = document.activeElement; modalType = type; $('modalPanel').className = 'modal-panel' + (type === 'result' ? ' result' : ''); $('modalPanel').innerHTML = html; $('modal').hidden = false; requestAnimationFrame(() => { $('modalPanel').querySelector('button:not(:disabled)')?.focus({ preventScroll: true }); }); }
function closeModal() { const was = modalType; $('modal').hidden = true; modalType = null; if (previousFocus?.isConnected)
    previousFocus.focus({ preventScroll: true }); if (was === 'settings' && !run)
    audioGesture(); }
function header(title, small = 'SUPER WISS • ODYSSEY', close = true) { return `<div class="modal-header"><div><small>${small}</small><h2 id="modalTitle">${title}</h2></div>${close ? `<button id="closeModal" class="icon-button" aria-label="Close dialog">${icon('xmark')}</button>` : ''}</div>`; }
function bindClose(fn = closeModal) { if ($('closeModal'))
    $('closeModal').onclick = () => { click(); fn(); }; }
function showEndlessIntro() { click(); openModal('endless', `${header('No finish line. Just you.', 'THE ENDLESS RUN')}<p>Start at Sunpetal Valley and run through all ${WORLDS.length} worlds in order. After ${WORLDS.at(-1).name}, the route loops back with tougher enemy pressure. Your score, hearts, and active powers carry forward.</p><div class="howto-grid"><div>${icon('skull')}<span><strong>One attempt</strong><p>A fall or losing all hearts ends the run. Checkpoints restore you to at least two hearts.</p></span></div><div>${icon('bolt')}<span><strong>Rising pressure</strong><p>Enemies and power-ups appear more often as worlds advance. Spawn rates have safety caps.</p></span></div><div>${icon('coins')}<span><strong>Keep the combo</strong><p>Pick up coins and defeat foes in quick succession to increase point rewards.</p></span></div><div>${icon('trophy')}<span><strong>Set a real record</strong><p>Best scores are saved on this device. Pause at any time, or bank your run from the pause menu.</p></span></div></div><div class="button-row"><button class="primary" id="launchEndless">${icon('play')}Start endless run</button></div>`); bindClose(); $('launchEndless').onclick = () => requestStart(0, 'endless'); }
function showDailyIntro() { click(); openModal('daily', `${header('Today’s challenge.', save.daily.day + ' UTC')}<p><strong>${WORLDS[dailyWorld()].name}</strong> is today’s course. Chase a high score using the hero you choose. Daily attempts count toward missions but do not unlock campaign maps or medals.</p><div class="pause-tip">Best today: ${save.daily.best ? formatNumber(save.daily.best) + ' points' : 'No attempts yet'}<br>Offline results and day changes use this device’s clock.</div><div class="button-row"><button class="primary" id="launchDaily">${icon('play')}Take the challenge</button></div>`); bindClose(); $('launchDaily').onclick = () => requestStart(dailyWorld(), 'daily'); }
function showGuide(next) { openModal('guide', `${header('Your thumbs. Your super.', 'WELCOME TO THE ADVENTURE')}<div class="howto-grid"><div>${icon('arrow-right')}<span><strong>Move & sprint</strong><p>Use the left-thumb arrows. Sprint is on by default; tap RUN to switch to walking.</p></span></div><div>${icon('arrow-up')}<span><strong>Jump with feeling</strong><p>Hold JUMP for height. Tap for a short hop. Touch chests and crates to open them. Jump into glowing caches from below.</p></span></div><div>${icon(heroById(save.hero).icon)}<span><strong>${heroById(save.hero).skill}</strong><p>Two hero buttons, two independent cooldowns. Rare pets add their own buttons beside the pet portrait.</p></span></div><div>${icon('star')}<span><strong>Earn your stars</strong><p>Each campaign map has 3 objectives. Spiked monsters cannot be stomped—use skills or avoid them.</p></span></div></div><p style="margin:13px 0 0">Keyboard: A/D move, Space jump, E/Q hero skills, F/G pet skills, Esc pause. Gamepad: A jump, X/Y skills, LB/RB pet skills.</p><div class="button-row"><button id="guideDone" class="primary">${icon('play')}${next ? 'Let’s play' : 'Got it'}</button></div>`); bindClose(); $('guideDone').onclick = () => { click(); save.onboarded = true; persist(); closeModal(); if (next)
    next(); }; }
function requestStart(id, mode) { click(); if (mode === 'campaign' && !isUnlocked(id)) {
    toast('Clear the previous world to unlock this one.');
    return;
} if (!save.onboarded) {
    showGuide(() => startRun(id, mode));
    return;
} startRun(id, mode); }
function clearInput() { for (const k of Object.keys(keys))
    keys[k] = false; for (const k of Object.keys(pendingPresses))
    pendingPresses[k] = false; pointers.clear(); document.querySelectorAll('.control').forEach(b => b.classList.remove('pressed')); }
function startRun(id, mode) { closeModal(); clearInput(); run = createRun(id, save.hero, mode, 0, mode === 'practice' ? practicePet : save.pet); paused = false; finishDelay = 0; stageUntil = performance.now() + 2100; hintUntil = performance.now() + 9000; renderer.lastRun = null; $('menu').hidden = true; $('gameUI').hidden = false; const h = heroById(save.hero); $('skillIcon').innerHTML = icon(h.icon); $('skillControl').setAttribute('aria-label', 'Use ' + h.skill); $('skillCaption').textContent = h.skills[0].name.split(' ')[0].toUpperCase(); $('skillIcon2').innerHTML = icon(h.skills[1].icon); $('skillCaption2').textContent = h.skills[1].name.split(' ')[0].toUpperCase(); $('skillControl2').setAttribute('aria-label', 'Use ' + h.skills[1].name); const pet = PETS.find(z => z.id === run.petId); $('petDock').hidden = !pet; $('petFace').src = pet ? assetUrl('pet/' + pet.id) : assetUrl('pet/wolf'); $('petPassive').textContent = pet?.passive || ''; for (let i = 0; i < 2; i++) {
    const button = $(i ? 'petControl2' : 'petControl');
    button.hidden = !pet?.skills[i];
    if (pet?.skills[i]) {
        button.querySelector('i').innerHTML = icon(pet.skills[i].icon);
        button.querySelector('span').textContent = pet.skills[i].name;
        button.setAttribute('aria-label', 'Use ' + pet.skills[i].name);
    }
} $('scoreLabel').textContent = mode === 'practice' ? 'PRACTICE SCORE' : mode === 'endless' ? 'ENDLESS SCORE' : 'SCORE'; $('gameHint').textContent = id === 0 ? `${h.skill} is ready. Hold JUMP to leap farther.` : h.hint; $('gameHint').hidden = false; showStageBanner(); audioGesture(); audio.play('world'); updateHud(true); }
function showStageBanner() { if (!run)
    return; $('stageBanner').innerHTML = `<small>${run.mode === 'endless' ? `ENDLESS • WORLD ${run.stage + 1} • LOOP ${1 + Math.floor(run.stage / WORLDS.length)}` : run.mode === 'practice' ? 'PRACTICE • NO REWARDS' : run.mode === 'daily' ? 'DAILY CHALLENGE' : `CAMPAIGN • ${String(run.worldId + 1).padStart(2, '0')} / ${WORLDS.length}`}</small><strong>${run.level.cfg.name}</strong>`; $('stageBanner').hidden = false; }
function updateHud(force = false) {
    if (!run)
        return;
    const p = run.player, h = heroById(p.character), now = performance.now();
    if (!force && now - lastHud < 90)
        return;
    lastHud = now;
    $('hearts').innerHTML = Array.from({ length: p.maxHp }, (_, i) => i).map(i => `<i class="${i >= p.hp ? 'empty' : ''}">${icon('heart')}</i>`).join('');
    $('lives').textContent = run.mode === 'endless' ? 'ONE CHANCE' : `${p.lives} ${p.lives === 1 ? 'attempt' : 'attempts'} left`;
    $('runCoins').textContent = formatNumber(run.coinsEarned);
    $('runScore').textContent = formatNumber(run.score);
    $('runTime').textContent = run.mode === 'endless' ? `${formatNumber(runDistance(run))} m • ${formatTime(p.elapsed)}` : formatTime(run.mapTime + run.knockouts * 3);
    $('runMapLabel').textContent = run.mode === 'endless' ? `WORLD ${run.stage + 1} • LOOP ${1 + Math.floor(run.stage / WORLDS.length)}` : `WORLD ${String(run.worldId + 1).padStart(2, '0')} / ${WORLDS.length}`;
    $('runMapName').textContent = run.level.cfg.name;
    $('courseBar').style.width = clamp((p.x - 120) / (run.level.goal.x - 120) * 100, 0, 100) + '%';
    $('cooldownText').textContent = p.cooldown > 0 ? Math.ceil(p.cooldown) : '';
    $('skillControl').classList.toggle('ready', p.cooldown <= 0);
    $('skillControl').style.background = p.cooldown > 0 ? `conic-gradient(#c4a2ee ${360 * (1 - p.cooldown / h.cooldown)}deg,#3b355f 0deg)` : '#8768bce6';
    $('skillControl').setAttribute('aria-disabled', p.cooldown > 0 ? 'true' : 'false');
    $('cooldownText2').textContent = p.cooldown2 > 0 ? Math.ceil(p.cooldown2) : '';
    $('skillControl2').classList.toggle('ready', p.cooldown2 <= 0);
    $('skillControl2').style.background = p.cooldown2 > 0 ? `conic-gradient(#f2bd79 ${360 * (1 - p.cooldown2 / h.skills[1].cooldown)}deg,#40324e 0deg)` : '#85513ee6';
    $('skillControl2').setAttribute('aria-disabled', p.cooldown2 > 0 ? 'true' : 'false');
    const pet = PETS.find(z => z.id === run.petId);
    if (pet) {
        $('petPassive').textContent = run.petId === 'dragon' ? `SCALES ${p.scales}/15` : run.petId === 'turtle' ? (run.petState.guard ? 'GUARD READY' : `GUARD ${Math.ceil(run.petState.guardTimer)}s`) : pet.passive.toUpperCase();
        pet.skills.forEach((sk, i) => { const button = $(i ? 'petControl2' : 'petControl'), cd = p[i ? 'petCooldown2' : 'petCooldown'], active = p[sk.id]; button.querySelector('b').textContent = active > 0 ? Math.ceil(active) + 's' : cd > 0 ? Math.ceil(cd) : ''; button.classList.toggle('buff-active', active > 0); button.classList.toggle('cooling', cd > 0 && active <= 0); });
    }
    const effects = [];
    if (p.crowd > 0)
        effects.push({ icon: 'fire', text: 'FURY ' + p.crowd });
    if (p.rescue > 0)
        effects.push({ icon: 'feather', text: '1 rescue' });
    if (p.shield)
        effects.push({ icon: 'shield-halved', text: '1 hit' });
    for (const key of ['spark', 'magnet', 'double', 'haste', 'fire', 'ice', 'giant', 'thunder', 'phase'])
        if (p[key] > 0)
            effects.push({ icon: POWERS.find(z => z.id === key).icon, text: Math.ceil(p[key]) + 's' });
    if (run.slow > 0)
        effects.push({ icon: 'hourglass-half', text: Math.ceil(run.slow) + 's' });
    if (p.veil > 0)
        effects.push({ icon: 'moon', text: Math.ceil(p.veil) + 's' });
    for (const [key, ic] of [['gravity', 'feather'], ['orbit', 'star'], ['breath', 'fire'], ['flood', 'water'], ['prince', 'crown']])
        if (p[key] > 0)
            effects.push({ icon: ic, text: Math.ceil(p[key]) + 's' });
    $('effectsHUD').innerHTML = effects.slice(0, 9).map(e => `<span class="effect-pill">${icon(e.icon)}${e.text}</span>`).join('');
    const mult = 1 + Math.floor(run.combo / 3) * .5;
    $('combo').hidden = mult <= 1;
    $('combo').textContent = `COMBO ×${mult}`;
    $('stageBanner').hidden = now > stageUntil;
    $('gameHint').hidden = now > hintUntil;
}
function pauseGame() { if (!run || paused || run.complete || run.failed)
    return; paused = true; clearInput(); bankRunStats(save, run); persist(); audio.context?.suspend().catch(() => { }); showPause(); }
function showPause() { if (!run)
    return; const h = heroById(run.player.character); openModal('pause', `${header('Take a breather.', 'ADVENTURE PAUSED', false)}<div class="pause-world"><canvas id="pauseMapArt" width="230" height="130"></canvas><span><strong>${run.level.cfg.name}</strong><small>${run.mode === 'endless' ? `Endless world ${run.stage + 1} • ${formatNumber(runDistance(run))} m` : `${formatTime(run.mapTime)} • ${formatNumber(run.score)} points`}</small></span></div><div class="pause-objectives">${run.mode === 'endless' ? '<div class="objective">' + icon('infinity') + '<span>Your run is frozen. No time or health is lost while paused.</span></div>' : mapObjectives(run.worldId).map(o => `<div class="objective">${icon(o.icon)}<span>${o.label}</span></div>`).join('')}</div><div class="pause-tip"><strong>${h.skill}</strong> — ${h.hint}<br>${run.mode === 'endless' ? 'Falls or zero hearts end the run.' : 'Each knockout adds a 3-second time penalty.'}</div><div class="button-row"><button id="resumeButton" class="primary">${icon('play')}Resume adventure</button></div><div class="pause-button-list"><button id="pauseSettings" class="secondary">${icon('gear')}Settings</button><button id="retryButton" class="secondary">${icon('rotate-right')}Restart</button><button id="leaveButton" class="secondary">${icon('house')}${run.mode === 'endless' ? 'Bank run' : 'Leave map'}</button></div>`); paintMap($('pauseMapArt'), run.worldId); $('resumeButton').onclick = resumeGame; $('pauseSettings').onclick = () => showSettings(true); $('retryButton').onclick = () => confirmLeave('retry'); $('leaveButton').onclick = () => confirmLeave('leave'); }
function resumeGame() { click(); closeModal(); paused = false; clearInput(); audioGesture(); }
function confirmLeave(action) { openModal('confirm', `${header(action === 'retry' ? 'Start a fresh attempt?' : run.mode === 'endless' ? 'Bank this run?' : 'Back to the lobby?', 'YOUR PROGRESS')}<p>${action === 'retry' ? 'Your collected coins and mission progress are kept, but this unfinished score will not be recorded.' : run.mode === 'endless' ? 'Your current endless score will be recorded on this device. Your next run starts from world 1.' : 'Collected coins and mission progress are kept. An unfinished map does not unlock its next world.'}</p><div class="button-row"><button id="cancelLeave" class="secondary">Keep playing</button><button id="confirmLeave" class="primary">${action === 'retry' ? 'Restart' : run.mode === 'endless' ? 'Bank & finish' : 'Back to lobby'}</button></div>`); bindClose(showPause); $('cancelLeave').onclick = showPause; $('confirmLeave').onclick = () => { click(); bankRunStats(save, run); persist(); if (action === 'retry') {
    const id = run.mode === 'endless' ? 0 : run.worldId, mode = run.mode;
    startRun(id, mode);
}
else if (run.mode === 'endless') {
    run.failed = true;
    showResult();
}
else
    leaveRun(); }; }
function leaveRun() { if (run)
    bankRunStats(save, run); persist(); clearInput(); run = null; paused = false; closeModal(); $('gameUI').hidden = true; $('menu').hidden = false; renderer.lastRun = null; showPage('home'); audioGesture(); }
function showResult() {
    if (!run)
        return;
    paused = true;
    clearInput();
    const res = recordRun(save, run);
    persist();
    const success = run.complete, practiceRun = run.mode === 'practice', endless = run.mode === 'endless';
    const title = practiceRun ? (success ? 'Practice complete.' : 'A little more practice.') : (success ? 'A world well played.' : endless ? 'That was a good run.' : 'One more leap?');
    const overline = practiceRun ? 'PRACTICE • NO REWARDS' : endless ? `ENDLESS • WORLD ${run.stage + 1}` : success ? `WORLD ${String(run.worldId + 1).padStart(2, '0')} CLEARED` : 'ATTEMPT COMPLETE';
    openModal('result', `${header(title, overline, false)}${success && run.mode === 'campaign' ? `<div class="result-stars">${res.objectives.map(o => `<i class="${o.done ? 'star-earned' : ''}">${icon('star')}</i>`).join('')}</div>` : ''}${res.newBest ? '<div class="result-new">NEW PERSONAL BEST</div>' : ''}<div class="result-score">${formatNumber(run.score)}</div><div class="result-overline">${endless ? 'ENDLESS SCORE' : practiceRun ? 'PRACTICE SCORE' : 'RUN SCORE'}</div><div class="result-stats"><div class="result-stat"><small>${endless ? 'DISTANCE' : 'TIME'}</small><b>${endless ? formatNumber(runDistance(run)) + ' m' : formatTime(run.mapTime + run.knockouts * 3)}</b></div><div class="result-stat"><small>COINS</small><b>${formatNumber(run.coinsEarned)}</b></div><div class="result-stat"><small>MONSTERS</small><b>${formatNumber(run.stats.kills)}</b></div><div class="result-stat"><small>${endless ? 'WORLDS REACHED' : 'SKILLS USED'}</small><b>${endless ? run.stage + 1 : run.stats.skills}</b></div></div>${!endless ? `<div class="result-objectives">${res.objectives.map(o => `<div class="objective ${o.done ? 'done' : ''}">${icon(o.done ? 'check' : 'star')}<span>${o.label}</span></div>`).join('')}</div>` : '<p class="modal-copy">A little farther. A little faster. Your record is saved locally.</p>'}${res.reward ? `<div class="result-reward">${icon('coins')}+${res.reward} reward coins${res.newStars ? ' • ' + res.newStars + ' new stars' : ''}</div>` : ''}${practiceRun ? '<p class="practice-note">Practice does not award coins, medals, records, or mission progress.</p>' : ''}<div class="button-row"><button id="resultHome" class="secondary">${icon('house')}Lobby</button><button id="resultReplay" class="secondary">${icon('rotate-right')}Replay</button>${success && run.mode === 'campaign' && run.worldId < WORLDS.length - 1 ? `<button id="resultNext" class="primary">Next world ${icon('chevron-right')}</button>` : `<button id="resultPrimary" class="primary">${icon('play')}${endless ? 'Run again' : success ? 'Choose world' : 'Try again'}</button>`}</div>`);
    $('resultHome').onclick = () => { click(); leaveRun(); };
    $('resultReplay').onclick = () => { click(); startRun(endless ? 0 : run.worldId, run.mode); };
    if ($('resultNext'))
        $('resultNext').onclick = () => { click(); startRun(run.worldId + 1, 'campaign'); };
    if ($('resultPrimary'))
        $('resultPrimary').onclick = () => { click(); if (success) {
            const id = run.worldId;
            leaveRun();
            selectedMap = id;
            showPage('campaign');
        }
        else
            startRun(endless ? 0 : run.worldId, run.mode); };
}
function showSettings(fromPause = false) {
    click();
    const s = save.settings;
    openModal('settings', `${header('Make yourself at home.', 'GAME SETTINGS')}<div class="setting-grid">${[
        ['sound', 'volume-high', 'All audio', s.sound ? 'On' : 'Off'], ['music', 'music', 'Music', s.music ? 'On' : 'Off'], ['sprint', 'shoe-prints', 'Auto sprint', s.sprint ? 'On' : 'Off'], ['motion', 'wand-magic-sparkles', 'Extra motion', s.motion ? 'On' : 'Reduced'], ['quality', 'gamepad', 'Graphics', s.quality === 'high' ? 'High' : 'Battery'], ['zoom', 'expand', 'Camera', s.zoom === 'close' ? 'Close' : 'Wide'], ['leftHanded', 'hand-pointer', 'Controls', s.leftHanded ? 'Mirrored' : 'Standard'], ['opacity', 'palette', 'Buttons', s.opacity === .85 ? 'Strong' : 'Subtle']
    ].map(([key, ic, label, state]) => `<button data-setting="${key}" class="setting">${icon(ic)}<span>${label}</span><small>${state}</small></button>`).join('')}</div><div class="volume-row"><label>Effects <input id="sfxVolume" type="range" min="0" max="1" step="0.05" value="${s.sfxVolume}"></label><label>Music <input id="musicVolume" type="range" min="0" max="1" step="0.05" value="${s.musicVolume}"></label></div><div class="settings-footer"><button id="guideSettings" class="secondary">${icon('circle-question')}How to play</button><button id="creditsSettings" class="secondary">${icon('circle-info')}About & credits</button><button id="doneSettings" class="secondary">${icon('check')}Done</button></div>`);
    const done = () => { if (fromPause)
        showPause();
    else
        closeModal(); };
    bindClose(done);
    $('doneSettings').onclick = () => { click(); done(); };
    $('modalPanel').querySelectorAll('[data-setting]').forEach(b => b.onclick = () => { const key = b.dataset.setting; if (key === 'quality')
        s.quality = s.quality === 'high' ? 'low' : 'high';
    else if (key === 'zoom')
        s.zoom = s.zoom === 'normal' ? 'close' : 'normal';
    else if (key === 'opacity')
        s.opacity = s.opacity === .85 ? .55 : .85;
    else
        s[key] = !s[key]; applySettings(); persist(); showSettings(fromPause); });
    $('guideSettings').onclick = () => { showGuide(); $('guideDone').onclick = () => { click(); showSettings(fromPause); }; bindClose(() => showSettings(fromPause)); };
    $('creditsSettings').onclick = () => showCredits(fromPause);
    for (const id of ['sfxVolume', 'musicVolume'])
        $(id).oninput = () => { s[id] = +$(id).value; applySettings(); persist(); };
}
function showCredits(fromPause = false) { openModal('credits', `${header('Made for the next leap.', 'SUPER WISS • ODYSSEY ' + VERSION)}<div class="credits"><h3>Original game, original world.</h3><p>Hero, enemy and companion art is extracted from the approved AI-generated Super Wiss concept boards, with procedural animation. The original block tiles, music and effects are bundled as editable files. No Mario, Minecraft or watermarked stock textures are included.</p><h3>Icon credits</h3><p>Font Awesome Free 6.7.2 by Fonticons, Inc. SVG icons are used under CC BY 4.0, recolored and resized for the game. Copyright and license details are included in the project and bundled APK. No icon font is used.</p><h3>Offline playtest</h3><p>No login, ads, analytics, purchases, or network requests. Campaign progress, coins, settings, and records stay on this device. Online friends, races, and Google sign-in are not active in this edition.</p><h3>Fair offline challenges</h3><p>Daily challenges use the device’s UTC date. Records are personal, not server-verified global leaderboards. Practice grants no progression rewards. Cosmetic trails never change gameplay stats.</p><h3>Storage & updates</h3><p>Version 3 imports version 2 currency, settings, hero choice and map unlocks. Long-map score/time records start fresh; the version 2 save remains untouched. Removing the app or clearing app storage erases local progress. Keep the test signing key for updates; use a private production key for release.</p></div><div class="button-row"><button id="creditsBack" class="primary">Back to settings</button></div>`); bindClose(() => showSettings(fromPause)); $('creditsBack').onclick = () => showSettings(fromPause); }
function nativeBack() { if (run) {
    if (!paused && !run.complete && !run.failed) {
        pauseGame();
        return true;
    }
    if (modalType === 'settings' || modalType === 'credits' || modalType === 'guide') {
        showPause();
        return true;
    }
    if (modalType === 'confirm') {
        showPause();
        return true;
    }
    if (modalType === 'result') {
        leaveRun();
        return true;
    }
    if (modalType === 'pause') {
        resumeGame();
        return true;
    }
    return true;
} if (modalType) {
    closeModal();
    return true;
} if (page !== 'home') {
    showPage('home');
    return true;
} return false; }
window.NativeShell = { back: nativeBack };
window.addEventListener('native-pause', () => { clearInput(); if (run && !paused)
    pauseGame(); if (run)
    bankRunStats(save, run); persist(); audio.context?.suspend().catch(() => { }); });
window.addEventListener('native-resume', () => { refreshDay(save); updateTop(); });
window.addEventListener('visibilitychange', () => { if (document.hidden) {
    clearInput();
    if (run && !paused)
        pauseGame();
    if (run)
        bankRunStats(save, run);
    persist();
    audio.context?.suspend().catch(() => { });
} });
window.addEventListener('blur', () => { clearInput(); if (run && !paused)
    pauseGame(); });
window.addEventListener('pagehide', () => { if (run)
    bankRunStats(save, run); persist(); });
window.addEventListener('resize', () => { renderer.resize(innerWidth, innerHeight, save.settings.quality); if (innerHeight > innerWidth && run && !paused)
    pauseGame(); });
document.querySelectorAll('[data-page]').forEach(b => b.onclick = () => { click(); showPage(b.dataset.page); });
$('profileButton').onclick = () => { click(); selectedHero = save.hero; showPage('heroes'); };
$('settingsButton').onclick = () => showSettings(false);
$('continueButton').onclick = () => { const next = Math.max(0, save.maps.findIndex(m => !m.clear)); requestStart(next, 'campaign'); };
$('endlessButton').onclick = showEndlessIntro;
$('dailyButton').onclick = showDailyIntro;
$('practiceToggle').onclick = () => { click(); practice = !practice; renderMaps(); };
$('journeyTab').onclick = () => { click(); dailyTab = false; renderQuests(); };
$('dailyTab').onclick = () => { click(); dailyTab = true; renderQuests(); };
$('pauseButton').onclick = () => { click(); pauseGame(); };
$('sprintControl').onclick = () => { save.settings.sprint = !save.settings.sprint; applySettings(); persist(); toast(save.settings.sprint ? 'Auto sprint on' : 'Walking pace', 1.3); };
for (const b of document.querySelectorAll('[data-control]')) {
    const control = b.dataset.control;
    b.addEventListener('pointerdown', e => { if (!run || paused)
        return; e.preventDefault(); audioGesture(); try {
        b.setPointerCapture(e.pointerId);
    }
    catch { } pointers.set(e.pointerId, control); if (control in pendingPresses)
        pendingPresses[control] = true; b.classList.add('pressed'); });
    const release = e => { pointers.delete(e.pointerId); if (![...pointers.values()].includes(control))
        b.classList.remove('pressed'); };
    b.addEventListener('pointerup', release);
    b.addEventListener('pointercancel', release);
    b.addEventListener('lostpointercapture', release);
    b.addEventListener('contextmenu', e => e.preventDefault());
}
window.addEventListener('keydown', e => { if (e.code === 'Tab' && modalType) {
    const bs = [...$('modalPanel').querySelectorAll('button:not(:disabled)')];
    if (bs.length && ((e.shiftKey && document.activeElement === bs[0]) || (!e.shiftKey && document.activeElement === bs.at(-1)))) {
        e.preventDefault();
        (e.shiftKey ? bs.at(-1) : bs[0]).focus();
    }
    return;
} if (e.code === 'Escape') {
    e.preventDefault();
    if (!e.repeat)
        nativeBack();
    return;
} const k = { ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', ArrowUp: 'jump', KeyW: 'jump', Space: 'jump', KeyE: 'skill', KeyX: 'skill', KeyQ: 'skill2', KeyF: 'pet', KeyG: 'pet2' }[e.code]; if (k && run && !paused) {
    e.preventDefault();
    keys[k] = true;
    if (k in pendingPresses && !e.repeat)
        pendingPresses[k] = true;
    audioGesture();
} });
window.addEventListener('keyup', e => { const k = { ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', ArrowUp: 'jump', KeyW: 'jump', Space: 'jump', KeyE: 'skill', KeyX: 'skill', KeyQ: 'skill2', KeyF: 'pet', KeyG: 'pet2' }[e.code]; if (k) {
    e.preventDefault();
    keys[k] = false;
} });
let gamepadPause = false;
function readInput() { const out = { ...keys, run: save.settings.sprint }; for (const k of Object.keys(pendingPresses)) {
    out[k] ||= pendingPresses[k];
    pendingPresses[k] = false;
} for (const key of pointers.values())
    out[key] = true; try {
    const gp = Array.from(navigator.getGamepads?.() || []).find(Boolean);
    if (gp) {
        out.left ||= gp.axes[0] < -.3 || gp.buttons[14]?.pressed;
        out.right ||= gp.axes[0] > .3 || gp.buttons[15]?.pressed;
        out.jump ||= gp.buttons[0]?.pressed;
        out.skill ||= gp.buttons[2]?.pressed;
        out.skill2 ||= gp.buttons[3]?.pressed;
        out.pet ||= gp.buttons[4]?.pressed;
        out.pet2 ||= gp.buttons[5]?.pressed;
        const v = gp.buttons[9]?.pressed;
        if (v && !gamepadPause)
            pauseGame();
        gamepadPause = v;
    }
}
catch { } return out; }
let last = performance.now(), accumulator = 0, menuTick = 0;
function frame(now) {
    const dt = Math.min(.12, (now - last) / 1000);
    last = now;
    const t = now / 1000;
    if (run) {
        if (!paused) {
            accumulator += dt;
            let ticks = 0;
            while (accumulator >= DT && ticks++ < 8) {
                const input = readInput();
                if (paused) {
                    accumulator = 0;
                    break;
                }
                stepRun(run, input, DT);
                for (const e of run.events) {
                    audio.play(e.type, e);
                    if (e.type === 'power' || e.type === 'checkpoint' || e.type === 'skill' || e.type === 'pet-found' || e.type === 'pet-skill' || e.type === 'treasure')
                        toast(e.type === 'checkpoint' ? 'Checkpoint reached' : e.label, 1.7);
                    if (e.type === 'world') {
                        stageUntil = now + 1800;
                        showStageBanner();
                        bankRunStats(save, run);
                        persist();
                    }
                    if (e.type === 'checkpoint' || e.type === 'pet-found') {
                        bankRunStats(save, run);
                        persist();
                    }
                }
                renderer.effects(run.events);
                accumulator -= DT;
                if (run.complete || run.failed)
                    break;
            }
            if (run.complete || run.failed) {
                finishDelay += dt;
                if (finishDelay > .50)
                    showResult();
            }
        }
        else
            accumulator = 0;
        renderer.drawRun(run, t, paused ? 0 : dt);
        updateHud();
        audio.tick(run.worldId, !paused && !run.complete && !run.failed);
    }
    else {
        menuTick += dt;
        if (save.settings.quality === 'high' || menuTick > 1 / 30) {
            renderer.drawMenu(t, page, save.hero, 0);
            menuTick = 0;
        }
        audio.tick(0, !modalType);
    }
    requestAnimationFrame(frame);
}
applySettings();
updateTop();
showPage('home');
requestAnimationFrame(frame);
if (loaded.recovered)
    setTimeout(() => toast('Recovered your last valid save. Old-version progress is untouched.', 5), 300);
if (loaded.ephemeral)
    setTimeout(() => toast('Storage unavailable: scores will last only for this session.', 5), 300);
assetsReady.then(() => { updateTop(); if (page === 'heroes')
    renderHeroes(); if (page === 'campaign')
    renderMaps(); if (page === 'pets')
    renderPets(); });
if (loaded.migrated)
    setTimeout(() => toast('Welcome back! Gold and map unlocks restored. Long-map records start fresh.', 6), 500);
