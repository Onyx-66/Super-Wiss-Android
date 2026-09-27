import { ASC_RULES_REVISION, ASC_OUTFITS, ASC_FUSIONS, ASC_PET_FUSIONS, ASC_SKILL_ICONS, ascSkill, ascHeroSkills, ascBuyOutfit, ascLearn, ascFuseSkill, ascFusePet, ascEquipSkill, ascApplyRun, ascCompare, ascResult } from './ascension.js';
import { BOSSES, DIFFICULTIES } from './bosses.js';
import { analogVector, CONTROL_IDS, defaultControlPreset, controlRect, sanitizeControlPresets } from './controls.js';
import { AccountClient } from './social.js';
import { NearbySession, validRoomCode } from './link.js';
import { snapshotView } from './arena.js';
import { sprite, assetUrl, assetsReady, assetLoadState } from './assets.js';
import { VERSION, HEROES, WORLDS, POWERS, PETS, TRAILS, QUESTS, CHAPTERS, heroById, mapObjectives, dailyQuests, DT } from './data.js';
import { createRun, createBossTrial, stepRun, formatTime, objectiveResults, runDistance, clamp } from './engine.js';
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
window.SuperWissBoot?.stage('Initialize save',75);
if(window.SuperWissBoot?.safe){const original=storage;storage={getItem:k=>original.getItem(k),setItem(){throw Error('Safe Mode saves are read-only');}};}
const loaded = loadSave(storage), save = loaded.save;
if(window.SuperWissBoot?.safe)Object.assign(save.settings,{quality:'low',sound:false,music:false,motion:false});
window.SuperWissBoot?.stage('Initialize audio',82);
const audio = new AudioEngine(); // AudioContext is unlocked by the Enter gesture.
window.SuperWissBoot?.stage('Initialize game',90);
const renderer = new Renderer($('scene'));
if(!renderer.c)throw Error('Canvas 2D is unavailable on this Android WebView.');
let page = 'home', run = null, paused = false, modalType = null, selectedMap = 0, selectedHero = save.hero, practice = false, dailyTab = false, selectedPet = save.pet || 'wolf', practicePet = save.pet, toastTimer = 0, lastHud = 0, stageUntil = 0, hintUntil = 0, finishDelay = 0, previousFocus = null, storageWarning = loaded.ephemeral;
const keys = { left: false, right: false, jump: false, skill: false, skill2: false, pet: false, pet2: false, attack:false, knife:false, dodge:false, summon:false,aimUp:false,aimDown:false,interact:false,crouch:false };
const pointers = new Map();
const analog={pointer:null,axis:0,aim:0};
const native=window.WissNative||null;
const account=new AccountClient(storage,native);
let nearby=null, nearbyDevices=[], nearbyStatus='', nearbyView=null, nearbyRendered=false, nearbyErrors=0;

// Preserve short taps that begin and end between two simulation frames.
const pendingPresses = { jump: false, skill: false, skill2: false, pet: false, pet2: false, attack:false, knife:false, dodge:false, summon:false,interact:false,crouch:false };
function icons(root = document) { root.querySelectorAll('[data-icon]').forEach(e => { e.innerHTML = icon(e.dataset.icon); e.removeAttribute('data-icon'); }); }
icons();
function toast(text, seconds = 2.5) { $('toast').textContent = text; $('toast').hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').hidden = true, seconds * 1000); }
function persist() { if (!saveProgress(storage, save) && !storageWarning) {
    storageWarning = true;
    toast('Storage is unavailable. This session will not be saved.', 5);
} renderer.menuOutfit=save.ascension.outfits[save.hero]||'starter';renderer.menuParts=save.ascension.parts?.[save.hero]; updateTop(); }
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
    $('profileName').textContent = save.profile.name;
    $('profileLevel').textContent = `EXPLORER LV. ${1 + Math.floor(save.xp / 500)}`;
    $('xpBar').style.width = ((save.xp % 500) / 5) + '%';
    $('homeHero').textContent = h.name.toUpperCase();
    $('homeSkill').textContent = h.skill.toUpperCase();
    paintPortrait($('profilePortrait'), save.profile.avatar, true);
    $('profileButton').dataset.avatar=save.profile.avatar;
    $('profileButton').className='profile frame-'+save.profile.frame+' banner-'+save.profile.banner;
    $('profileButton').title=save.profile.name+' — open player profile';
    const next = Math.max(0, save.maps.findIndex(m => !m.clear));
    $('continueMap').textContent = save.maps.every(m => m.clear) ? 'Replay the adventure' : WORLDS[next].name;
    $('continueSub').textContent = `World ${String(next + 1).padStart(2, '0')} • ${(CHAPTERS[WORLDS[next].chapter] || 'The farther frontier')}`;
    $('dailyTeaser').textContent = WORLDS[dailyWorld()].name;
    const ready = QUESTS.some(q => !save.claims.includes(q.id) && questValue(save, q) >= q.target) || dailyQuests(save.daily.day).some(q => !save.daily.claims.includes(q.id) && (save.daily.stats[q.stat] || 0) >= q.target);
    $('questDot').hidden = !ready;
}
function applySettings() { ascApplyControls(); renderer.menuOutfit=save.ascension.outfits[save.hero]||'starter';renderer.menuParts=save.ascension.parts?.[save.hero]; audio.enabled = save.settings.sound; audio.music = save.settings.music; audio.sfxVolume = save.settings.sfxVolume; audio.musicVolume = save.settings.musicVolume; renderer.motion = save.settings.motion; renderer.blood=save.settings.blood; document.body.classList.toggle('analog-mode',save.settings.controlMode==='analog'); document.body.classList.toggle('arrows-mode',save.settings.controlMode==='arrows'); renderer.trail = save.trail; renderer.close = save.settings.zoom === 'close'; document.body.classList.toggle('reduce-motion', !save.settings.motion); $('touchControls').classList.toggle('left-handed', save.settings.leftHanded); document.documentElement.style.setProperty('--control-opacity', save.settings.opacity); $('sprintControl').classList.toggle('enabled', save.settings.sprint); renderer.resize(innerWidth, innerHeight, save.settings.quality); if (!save.settings.sound && audio.context)
    audio.context.suspend().catch(() => { }); }
function dailyWorld() { let hash = 0; for (const c of utcDay())
    hash = (hash * 31 + c.charCodeAt(0)) >>> 0; return hash % WORLDS.length; }
function showPage(name) { if (run)
    return; const enteringHeroes=name==='heroes'&&page!=='heroes'; page = name; document.querySelectorAll('.page').forEach(e => e.classList.toggle('active', e.id === 'page-' + name)); document.querySelectorAll('[data-page]').forEach(e => e.classList.toggle('active', e.dataset.page === name)); if (name === 'campaign')
    renderMaps(); if (name === 'heroes')
    renderHeroes(); if (name === 'pets')
    renderPets(); if (name === 'missions')
    renderQuests(); if(name==='bosses')renderBosses(); if(name==='profile')renderProfile(); if (name === 'records')
    renderRecords(); if(name==='forge')renderForge(); if(enteringHeroes)$('heroGrid').scrollTop=0; updateTop(); }
function isUnlocked(id) { return id === 0 || id <= save.legacyUnlocked || save.maps[id - 1].clear; }
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
function renderHeroesBase() {
    const grid = $('heroGrid');
    grid.innerHTML = HEROES.map(h => `<button class="hero-card ${h.id === selectedHero ? 'selected' : ''}" data-hero="${h.id}" aria-pressed="${h.id===selectedHero}" aria-label="${h.name}, ${h.skill}"><canvas width="185" height="180" data-hero-art="${h.id}"></canvas><span class="hero-skill-icon">${icon(h.icon)}</span><strong>${h.name}</strong><small>${h.role} · Lv. ${Math.min(10,1+Math.floor((save.mastery[h.id]||0)/20))}</small><span class="hero-equipped">${save.hero===h.id?"EQUIPPED":""}</span></button>`).join('');
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
function renderPetsBase() {
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
function renderRecordsBase() { const e = save.endless, clears = save.maps.filter(m => m.clear).length; $('recordContent').innerHTML = `<div class="record-hero">${icon('trophy')}<small>ENDLESS PERSONAL BEST</small><strong>${e.best ? formatNumber(e.best) : '—'}</strong><p>${e.best ? `Farthest world reached: ${e.stage}` : 'Your first great run is still ahead.'}</p><button id="recordEndless" class="primary">${icon('infinity')}Beat your best</button></div><div class="record-right"><div class="stats-row"><div class="stat-box"><small>CAMPAIGN</small><b>${clears}<small style="display:inline"> / ${WORLDS.length}</small></b></div><div class="stat-box"><small>STARS EARNED</small><b>${starsTotal(save)}<small style="display:inline"> / ${WORLDS.length * 3}</small></b></div><div class="stat-box"><small>MONSTERS BEATEN</small><b>${formatNumber(save.totals.kills)}</b></div></div><div class="record-label">BEST ENDLESS RUNS • LOCAL ONLY</div>${e.runs.length ? e.runs.map((r, i) => `<div class="record-row"><span class="rank">${i + 1}</span><span class="record-info"><b>${heroById(r.hero).name} • World ${r.stage}</b><small>${formatNumber(r.distance)} m • ${escapeText(r.date)}</small></span><b>${formatNumber(r.score)}</b></div>`).join('') : '<div class="empty-record">Nothing invented. Nothing online.<br>Finish an endless attempt to put your first real score here.</div>'}<div class="record-label">DAILY CHALLENGE • ${escapeText(save.daily.day)} UTC</div><div class="record-row"><span class="rank">${icon('bullseye')}</span><span class="record-info"><b>${WORLDS[dailyWorld()].name}</b><small>Today’s best on this device</small></span><b>${save.daily.best ? formatNumber(save.daily.best) : '—'}</b></div></div>`; $('recordEndless').onclick = showEndlessIntro; }
function openModal(type, html) { previousFocus = document.activeElement; modalType = type; $('modalPanel').className = 'modal-panel' + (type === 'result' ? ' result' : ''); $('modalPanel').innerHTML = html; $('modal').hidden = false; requestAnimationFrame(() => { $('modalPanel').querySelector('button:not(:disabled)')?.focus({ preventScroll: true }); }); }
function closeModal() { const was = modalType; $('modal').hidden = true; modalType = null; if (previousFocus?.isConnected)
    previousFocus.focus({ preventScroll: true }); if (was === 'settings' && !run)
    audioGesture(); }
function header(title, small = 'SUPER WISS • ODYSSEY', close = true) { return `<div class="modal-header"><div><small>${small}</small><h2 id="modalTitle">${title}</h2></div>${close ? `<button id="closeModal" class="icon-button" aria-label="Close dialog">${icon('xmark')}</button>` : ''}</div>`; }
function bindClose(fn = closeModal) { if ($('closeModal'))
    $('closeModal').onclick = () => { click(); fn(); }; }
function showEndlessIntro() { click(); openModal('endless', `${header('No finish line. Just you.', 'THE ENDLESS RUN')}<p>Start at Sunpetal Valley and run through all ${WORLDS.length} worlds in order. After ${WORLDS.at(-1).name}, the route loops back with tougher enemy pressure. Your score, hearts, and active powers carry forward.</p><div class="howto-grid"><div>${icon('skull')}<span><strong>One attempt</strong><p>A fall or losing all hearts ends the run. Checkpoints restore you to at least two hearts.</p></span></div><div>${icon('bolt')}<span><strong>Rising pressure</strong><p>Enemies and power-ups appear more often as worlds advance. Spawn rates have safety caps.</p></span></div><div>${icon('coins')}<span><strong>Keep the combo</strong><p>Pick up coins and defeat foes in quick succession to increase point rewards.</p></span></div><div>${icon('trophy')}<span><strong>Set a real record</strong><p>Best scores are saved on this device. Pause at any time, or bank your run from the pause menu.</p></span></div></div><div class="button-row"><button class="primary" id="launchEndless">${icon('play')}Start endless run</button></div>`); bindClose(); $('launchEndless').onclick = () => requestStart(0, 'endless'); }
function showDailyIntro() { click(); openModal('daily', `${header('Today’s challenge.', save.daily.day + ' UTC')}<p><strong>${WORLDS[dailyWorld()].name}</strong> is today’s course. Chase a high score using the hero you choose. Daily attempts count toward missions but do not unlock campaign maps or medals.</p><div class="pause-tip">Best today: ${save.daily.best ? formatNumber(save.daily.best) + ' points' : 'No attempts yet'}<br>Offline results and day changes use this device’s clock.</div><div class="button-row"><button class="primary" id="launchDaily">${icon('play')}Take the challenge</button></div>`); bindClose(); $('launchDaily').onclick = () => requestStart(dailyWorld(), 'daily'); }
function showGuideBase(next) { openModal('guide', `${header('Your thumbs. Your super.', 'WELCOME TO THE ADVENTURE')}<div class="howto-grid"><div>${icon('arrow-right')}<span><strong>Move & sprint</strong><p>Drag the analog stick. Small movements walk; full deflection runs. Settings lets you switch to arrows or mirror the controls.</p></span></div><div>${icon('arrow-up')}<span><strong>Jump with feeling</strong><p>Hold JUMP for height. Tap for a short hop. Touch chests and crates to open them. Jump into glowing caches from below.</p></span></div><div>${icon(heroById(save.hero).icon)}<span><strong>${heroById(save.hero).skill}</strong><p>Hero skills cost focus. Melee rebuilds focus and soul; dodge costs stamina. Throwing knives have limited ammunition. Spirit summons have two charges; pet call limits vary by companion.</p></span></div><div>${icon('star')}<span><strong>Earn your stars</strong><p>Explore three seal chambers, climb to the fragments, defeat the wardens, then face a three-phase final boss. Learn telegraphs before attacking.</p></span></div></div><p style="margin:13px 0 0">Keyboard: A/D move, Space jump, J slash, K knife, L dodge, R summon, E/Q hero skills, F/G pets. Aim up/down with W/S. Gamepad: A jump, X slash, B dodge, Y knife, triggers skills.</p><div class="button-row"><button id="guideDone" class="primary">${icon('play')}${next ? 'Let’s play' : 'Got it'}</button></div>`); bindClose(); $('guideDone').onclick = () => { click(); save.onboarded = true; persist(); closeModal(); if (next)
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
    pendingPresses[k] = false; pointers.clear(); analog.pointer=null;analog.axis=analog.aim=0;if($('analogKnob'))$('analogKnob').style.transform='translate(-50%,-50%)';document.querySelectorAll('.control').forEach(b => b.classList.remove('pressed')); }
function startRun(id, mode) {
 closeModal();clearInput();
 run=mode==='boss'?createBossTrial(id,save.hero,save.settings.difficulty,save.pet):createRun(id,save.hero,mode,0,mode==='practice'?practicePet:save.pet,save.settings.difficulty);
 run.summonChoice=save.summon;ascApplyRun(save,run);paused=false;finishDelay=0;stageUntil=performance.now()+2100;hintUntil=performance.now()+9000;renderer.lastRun=null;
 $('menu').hidden=true;$('gameUI').hidden=false;
 for(const id of ['skillIcon','skillIcon2'])delete $(id).dataset.skill;
 for(const id of ['petControl','petControl2'])delete $(id).dataset.petSkill;
 ascApplyControls();ascSetRunButtons();
 $('scoreLabel').textContent=mode==='practice'?'PRACTICE SCORE':mode==='endless'?'ENDLESS SCORE':'SCORE';
 $('gameHint').textContent=id===0?`${ascHeroSkills(save.ascension,save.hero)[0].name} is ready. Hold JUMP to leap farther.`:heroById(save.hero).hint;
 $('gameHint').hidden=false;showStageBanner();audioGesture();audio.play('world');updateHud(true);
}
function showStageBanner() { if (!run)
    return; $('stageBanner').innerHTML = `<small>${run.bossTrial?'BOSS HUNT • '+run.difficulty.toUpperCase():run.mode === 'endless' ? `ENDLESS • WORLD ${run.stage + 1} • LOOP ${1 + Math.floor(run.stage / WORLDS.length)}` : run.mode === 'practice' ? 'PRACTICE • NO REWARDS' : run.mode === 'daily' ? 'DAILY CHALLENGE' : `CAMPAIGN • ${String(run.worldId + 1).padStart(2, '0')} / ${WORLDS.length}`}</small><strong>${run.level.cfg.name}</strong>`; $('stageBanner').hidden = false; }
function updateHud(force = false) {
    if (!run)
        return;
    const p = run.player, h = heroById(p.character), now = performance.now();
    if (!force && now - lastHud < 90)
        return;
    lastHud = now; updateCombatHud();
    $('hearts').innerHTML = Array.from({ length: p.maxHp }, (_, i) => i).map(i => `<i class="${i >= p.hp ? 'empty' : ''}">${icon('heart')}</i>`).join('');
    $('lives').textContent = run.localPvp ? (p.deadFor>0?`RESPAWN ${Math.ceil(p.deadFor)}s`:'ARENA · 6 HEARTS') : run.mode === 'endless' ? 'ONE CHANCE' : `${p.lives} ${p.lives === 1 ? 'attempt' : 'attempts'} left`;
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
    $('stageBanner').hidden = run.bossTrial || now > stageUntil;
    $('gameHint').hidden = now > hintUntil;ascUpdateHud();
}
function pauseGame() { if(nearby?.state==='playing'){showNearbyPause();return;} if (!run || paused || run.complete || run.failed)
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
function leaveRun() { if(nearby&&['playing','results','ended'].includes(nearby.state)){native?.stop();nearby.stop();nearby=null;nearbyView=null;} document.body.classList.remove('pvp-mode','boss-mode');$('nearbyScore').hidden=true; if (run)
    bankRunStats(save, run); persist(); clearInput(); run = null; paused = false; closeModal(); $('gameUI').hidden = true; $('menu').hidden = false; renderer.lastRun = null; showPage('home'); audioGesture(); }
function showResult() { if(run?.bossTrial){showBossResult();return;}
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
function showSettingsBase(fromPause = false) {
    click();
    const s = save.settings;
    openModal('settings', `${header('Make yourself at home.', 'GAME SETTINGS')}<div class="setting-grid">${[
        ['controlMode','gamepad','Movement',s.controlMode==='analog'?'Analog':'Arrows'],['difficulty','skull','Next attempt',DIFFICULTIES[s.difficulty].label],['blood','droplet','Hit effects',s.blood],['haptics','hand-pointer','Haptics',s.haptics?'On':'Off'],['summonChoice','ghost','Summon',save.summon],['sound', 'volume-high', 'All audio', s.sound ? 'On' : 'Off'], ['music', 'music', 'Music', s.music ? 'On' : 'Off'], ['sprint', 'shoe-prints', 'Auto sprint', s.sprint ? 'On' : 'Off'], ['motion', 'wand-magic-sparkles', 'Extra motion', s.motion ? 'On' : 'Reduced'], ['quality', 'gamepad', 'Graphics', ({low:'Battery',balanced:'Balanced',high:'Quality'})[s.quality]], ['zoom', 'expand', 'Camera', s.zoom === 'close' ? 'Close' : 'Wide'], ['leftHanded', 'hand-pointer', 'Controls', s.leftHanded ? 'Mirrored' : 'Standard'], ['opacity', 'palette', 'Buttons', s.opacity === .85 ? 'Strong' : 'Subtle']
    ].map(([key, ic, label, state]) => `<button data-setting="${key}" class="setting">${icon(ic)}<span>${label}</span><small>${state}</small></button>`).join('')}</div><div class="volume-row"><label>Effects <input id="sfxVolume" type="range" min="0" max="1" step="0.05" value="${s.sfxVolume}"></label><label>Music <input id="musicVolume" type="range" min="0" max="1" step="0.05" value="${s.musicVolume}"></label></div><div class="settings-footer"><button id="guideSettings" class="secondary">${icon('circle-question')}How to play</button><button id="creditsSettings" class="secondary">${icon('circle-info')}About & credits</button><button id="doneSettings" class="secondary">${icon('check')}Done</button></div>`);
    const done = () => { if (fromPause)
        showPause();
    else
        closeModal(); };
    bindClose(done);
    $('doneSettings').onclick = () => { click(); done(); };
    $('modalPanel').querySelectorAll('[data-setting]').forEach(b => b.onclick = () => { const key = b.dataset.setting; if(key==='controlMode'){s.controlMode=s.controlMode==='analog'?'arrows':'analog';save.controlPresets[save.controlActive].mode=s.controlMode;clearInput();}else if(key==='difficulty')s.difficulty=['veteran','nightmare','inferno'][(['veteran','nightmare','inferno'].indexOf(s.difficulty)+1)%3];else if(key==='blood')s.blood=['off','essence','crimson'][(['off','essence','crimson'].indexOf(s.blood)+1)%3];else if(key==='summonChoice')save.summon=['warden','ravens','sentinel'][(['warden','ravens','sentinel'].indexOf(save.summon)+1)%3];else if (key === 'quality')
        s.quality = ['low','balanced','high'][(['low','balanced','high'].indexOf(s.quality)+1)%3];
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
function showCreditsBase(fromPause = false) { openModal('credits', `${header('Made for the next leap.', 'SUPER WISS • ODYSSEY ' + VERSION)}<div class="credits"><h3>Original game, original world.</h3><p>Hero, enemy and companion art is extracted from the approved AI-generated Super Wiss concept boards, with procedural animation. The original block tiles, music and effects are bundled as editable files. No Mario, Minecraft or watermarked stock textures are included.</p><h3>Icon credits</h3><p>Font Awesome Free 6.7.2 by Fonticons, Inc. SVG icons are used under CC BY 4.0, recolored and resized for the game. Copyright and license details are included in the project and bundled APK. No icon font is used.</p><h3>Offline playtest</h3><p>Offline play is account-free. Optional paired Bluetooth supports up to four nearby players. Username/password accounts and online friends require your configured HTTPS server. No ads, analytics, purchases, Google login, or global leaderboard. Local saves stay on this device.</p><h3>Fair offline challenges</h3><p>Daily challenges use the device’s UTC date. Records are personal, not server-verified global leaderboards. Practice grants no progression rewards. Cosmetic trails never change gameplay stats.</p><h3>Storage & updates</h3><p>Version 4 preserves older currency, pets and unlocked map access. Nightfall scores and boss-clear medals start fresh; older saves remain untouched. Removing the app or clearing app storage erases local progress. Keep the test signing key for updates; use a private production key for release.</p></div><div class="button-row"><button id="creditsBack" class="primary">Back to settings</button></div>`); bindClose(() => showSettings(fromPause)); $('creditsBack').onclick = () => showSettings(fromPause); }
function nativeBack() { if(!$('controlEditor').hidden){ascCloseEditor(false);return true;} if (run) {
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
window.addEventListener('native-pause', () => { if(nearby?.state==='playing')cancelNearby('App backgrounded. Local match cancelled.'); clearInput(); if (run && !paused)
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
window.addEventListener('blur', () => { clearInput(); if (run && !paused && nearby?.state!=='playing')
    pauseGame(); });
window.addEventListener('pagehide', () => { if (run)
    bankRunStats(save, run); persist(); });
window.addEventListener('resize', () => { ascApplyControls(); renderer.resize(innerWidth, innerHeight, save.settings.quality); if (innerHeight > innerWidth && run && !paused)
    pauseGame(); });
document.querySelectorAll('[data-page]').forEach(b => b.onclick = () => { click(); showPage(b.dataset.page); });
$('profileButton').onclick = () => { click(); showPage('profile'); };
$('socialButton').onclick=()=>{click();showPage('profile');};
$('bossHuntButton').onclick=()=>{click();showPage('bosses');};
$('nearbyButton').onclick=()=>{click();showNearby();};
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
window.addEventListener('keydown', e => { if(/^(INPUT|TEXTAREA|SELECT)$/.test(e.target?.tagName)&&e.code!=='Escape')return; if (e.code === 'Tab' && modalType) {
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
} const k = { ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', ArrowUp: 'aimUp', KeyW: 'aimUp',ArrowDown:'aimDown',KeyS:'aimDown', Space: 'jump', KeyE: 'skill', KeyX: 'skill', KeyQ: 'skill2', KeyF: 'pet', KeyG: 'pet2', KeyJ:'attack',KeyK:'knife',KeyL:'dodge',KeyR:'summon',KeyH:'interact',KeyC:'crouch',ControlLeft:'crouch' }[e.code]; if (k && run && !paused) {
    e.preventDefault();
    keys[k] = true;
    if (k in pendingPresses && !e.repeat)
        pendingPresses[k] = true;
    audioGesture();
} });
window.addEventListener('keyup', e => { if(/^(INPUT|TEXTAREA|SELECT)$/.test(e.target?.tagName))return; const k = { ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', ArrowUp: 'aimUp', KeyW: 'aimUp',ArrowDown:'aimDown',KeyS:'aimDown', Space: 'jump', KeyE: 'skill', KeyX: 'skill', KeyQ: 'skill2', KeyF: 'pet', KeyG: 'pet2', KeyJ:'attack',KeyK:'knife',KeyL:'dodge',KeyR:'summon',KeyH:'interact',KeyC:'crouch',ControlLeft:'crouch' }[e.code]; if (k) {
    e.preventDefault();
    keys[k] = false;
} });
let gamepadPause = false;
function readInput() { const out = { ...keys, axis:analog.axis,aim:keys.aimUp?-1:keys.aimDown?1:analog.aim,run: save.settings.sprint }; for (const k of Object.keys(pendingPresses)) {
    out[k] ||= pendingPresses[k];
    pendingPresses[k] = false;
} for (const key of pointers.values())
    out[key] = true; try {
    const gp = Array.from(navigator.getGamepads?.() || []).find(Boolean);
    if (gp) {
        out.left ||= gp.axes[0] < -.3 || gp.buttons[14]?.pressed;
        out.right ||= gp.axes[0] > .3 || gp.buttons[15]?.pressed;
        out.jump ||= gp.buttons[0]?.pressed;
        out.crouch ||= gp.buttons[10]?.pressed||gp.buttons[13]?.pressed;out.attack ||= gp.buttons[2]?.pressed;out.dodge ||= gp.buttons[1]?.pressed;out.knife ||= gp.buttons[3]?.pressed;out.skill ||=gp.buttons[6]?.pressed;out.skill2 ||=gp.buttons[7]?.pressed;out.summon ||=gp.buttons[8]?.pressed;out.axis=analogVector(gp.axes[0]*50,gp.axes[1]*50,50).axis;out.aim=gp.axes[1];
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
    if(nearby?.state==='playing'){frameNearby(dt,t);requestAnimationFrame(frame);return;}
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
                    if(e.type==='power-discovery')showPowerDiscovery(e.power);
                    audio.play(e.type, e);if(save.settings.haptics&&['hurt','boss-phase','boss-defeat'].includes(e.type))native?.haptic(e.type);
                    if (e.type === 'power' || e.type === 'checkpoint' || e.type === 'skill' || e.type === 'pet-found' || e.type === 'pet-skill' || e.type === 'treasure' || ['boss-warn','boss-phase','seal-wave','seal-open','sigil','summon','region'].includes(e.type))
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
                if (paused || run.complete || run.failed)
                    break;
            }
            if (run.complete || run.failed) {
                finishDelay += dt;
                if (finishDelay > (run.complete&&run.bossTrial?2.2:.50))
                    showResult();
            }
        }
        else
            accumulator = 0;
        renderer.drawRun(run, t, paused ? 0 : dt);
        updateHud();
        audio.scene='exploration';audio.bossActive=!!run.boss?.active; audio.tick(run.worldId, !paused && !run.complete && !run.failed);
    }
    else {
        menuTick += dt;
        if (save.settings.quality !== 'low' || menuTick > 1 / 30) {
            renderer.drawMenu(t, page, save.hero, 0);
            menuTick = 0;
        }
        audio.scene='menu';audio.bossActive=false;audio.tick(0, !modalType);
    }
    requestAnimationFrame(frame);
}
// NIGHTFALL MOBILE / SOCIAL / NEARBY INTEGRATION
function updateCombatHud(){if(!run)return;const p=run.player,b=run.boss;document.body.classList.toggle('boss-mode',!!b?.active);
 $('focusFill').style.width=p.focus+'%';$('focusValue').textContent=Math.floor(p.focus);$('staminaFill').style.width=p.stamina+'%';$('staminaValue').textContent=Math.floor(p.stamina);
 $('knifeCount').textContent=p.knives;$('summonCount').textContent=p.summonCD>0?Math.ceil(p.summonCD):p.summonCharges;$('dodgeCount').textContent=p.dodgeCD>0?Math.ceil(p.dodgeCD):'';
 $('knifeControl').classList.toggle('unavailable',p.knives<=0);$('summonControl').classList.toggle('unavailable',p.soul<60||p.summonCharges<=0||p.summonCD>0);
 $('skillControl').classList.toggle('unavailable',p.focus<28||p.globalSkill>0);$('skillControl2').classList.toggle('unavailable',p.focus<38||p.globalSkill>0);
 $('bossHUD').hidden=!b?.active;if(b?.active){$('bossName').textContent=b.name;$('bossTitle').textContent=b.title;$('bossPhase').textContent=`PHASE ${b.phase}/3 · ${Math.ceil(b.hp)}/${b.maxHp}`;$('bossHealth').style.width=100*b.hp/b.maxHp+'%';}
 const c=run.level.chambers?.find(c=>!c.complete);$('tacticalObjective').textContent=run.localPvp?'MELEE • KNIVES • DODGE — equal stats':b?.active?(b.state==='windup'?b.attack.toUpperCase()+' · evade the telegraph':`${run.difficulty.toUpperCase()} · SOUL ${Math.floor(p.soul)}/100`):c?`SEAL ${run.stageIndex+1}/3 · ${c.sigils.filter(s=>s.taken).length}/${c.sigils.length} fragments${c.wavesStarted?' · defeat the wardens':''}`:'STARGATE OPEN';
}
function renderBosses(){const tier=save.settings.difficulty;$('bossDifficulty').innerHTML=['veteran','nightmare','inferno'].map(d=>`<button class="secondary ${tier===d?'selected':''}" data-boss-tier="${d}">${DIFFICULTIES[d].label}</button>`).join('');$('bossDifficulty').querySelectorAll('button').forEach(b=>b.onclick=()=>{click();save.settings.difficulty=b.dataset.bossTier;persist();renderBosses();});
 $('bossGrid').innerHTML=BOSSES.map((b,i)=>{const rec=save.bossRecords[`${i}:${tier}:${save.pet||'none'}`];return `<button class="boss-card" data-boss="${i}" style="--boss:${b.color}"><img src="${assetUrl('boss/'+b.id)}" alt=""><span class="boss-world">${String(i+1).padStart(2,'0')} / ${WORLDS[i].name}</span><strong>${b.name}</strong><small>${b.attacks.join(' · ')}</small><em>${rec?formatTime(rec.time)+' · '+rec.hits+' hits':'NO CLEAR YET'} →</em></button>`;}).join('');$('bossGrid').querySelectorAll('[data-boss]').forEach(b=>b.onclick=()=>requestStart(+b.dataset.boss,'boss'));
}
function shareText(text){if(native?.share){native.share(text);return;}navigator.clipboard?.writeText(text).then(()=>toast('Challenge copied.')).catch(()=>toast(text,8));}
function showBossResult(){if(!run)return;paused=true;clearInput();const r=run,res=recordRun(save,r);persist();const name=r.boss.name;openModal('result',`${header(r.complete?'The crown is yours.':'Learn. Adapt. Return.',r.difficulty.toUpperCase()+' · BOSS HUNT',false)}<div class="boss-result"><img src="${assetUrl('boss/'+r.boss.configId)}" alt=""><div><h3>${name}</h3><p>${r.complete?(res.newBest?'NEW PERSONAL BEST':'BOSS DEFEATED'):'ATTEMPT ENDED'} · ${formatTime(r.bossTime)}<br>${r.hits} hits taken · ${heroById(r.player.character).name}</p></div></div><p>${r.complete?'Your best is stored locally by boss, tier and pet loadout.':'Study the telegraph, dodge through danger, and strike during recovery. Melee rebuilds focus; summons cost 60 soul.'}</p><div class="button-row"><button id="bossRetry" class="primary">Rematch</button><button id="bossChoose" class="secondary">Boss Hunt</button><button id="bossShare" class="secondary">Share challenge</button></div>`);$('bossRetry').onclick=()=>startRun(r.worldId,'boss');$('bossChoose').onclick=()=>{leaveRun();showPage('bosses');};$('bossShare').onclick=()=>shareText(`Super Wiss Nightfall challenge: ${name} / ${r.difficulty} / ${heroById(r.player.character).name}${r.complete?' — beat my local time '+formatTime(r.bossTime):''}. Challenge code SW4-${r.worldId+1}-${r.difficulty}.`);}
function profileCard(p,small=false){return `<div class="profile-card banner-${p.banner} frame-${p.frame}${small?' compact':''}"><img src="${assetUrl('hero/'+p.avatar)}" alt=""><div><strong>${escapeText(p.name)}</strong><small>${p.username?'@'+escapeText(p.username):p.online?'LOCAL LOBBY · LV. '+(p.level||1):'OFFLINE EXPLORER'}</small>${p.code?`<code>${escapeText(p.code)}</code>`:''}</div></div>`;}
function renderProfileBase(){const p=save.profile;$('accountState').textContent=account.user?'SIGNED IN · '+account.user.username:'GUEST · PLAY WITHOUT AN ACCOUNT';$('profileContent').innerHTML=`<div class="profile-editor">${profileCard({...p,...account.user})}<label>Display name<input id="editName" maxlength="20" value="${escapeText(p.name)}"></label><div class="avatar-picker">${HEROES.map(h=>`<button data-avatar="${h.id}" class="${p.avatar===h.id?'selected':''}" aria-label="${h.name}"><img src="${assetUrl('hero/'+h.id)}" alt=""></button>`).join('')}</div><label>Banner<select id="editBanner">${['aurora','ember','void','tide'].map(x=>`<option ${p.banner===x?'selected':''}>${x}</option>`).join('')}</select></label><label>Frame<select id="editFrame">${['silver','gold','thorns','astral'].map(x=>`<option ${p.frame===x?'selected':''}>${x}</option>`).join('')}</select></label><button class="primary" id="saveProfile">Save profile</button><p>Cosmetics never alter combat stats. Nearby friends see this player card. Online friends see the profile saved to your server.</p></div><div class="social-panel"><h3>${account.user?'Friends & account':'Connect your adventure'}</h3><p class="account-note">${account.origin?'Server: '+escapeText(account.origin):'No account server is configured. Local and Bluetooth play work without one.'}</p><div class="button-row"><button id="accountConfig" class="secondary">Server settings</button>${account.user?'<button id="accountLogout" class="secondary">Sign out</button>':'<button id="accountLogin" class="primary">Log in / Sign up</button>'}</div><div id="friendsContent">${account.user?'Loading friends…':'Create an account on your own configured service to add friends. No automatic uploads or ads.'}</div>${account.user?'<button id="deleteAccount" class="danger secondary">Delete online account</button>':''}</div>`;
 $('profileContent').querySelectorAll('[data-avatar]').forEach(b=>b.onclick=()=>{save.profile.avatar=b.dataset.avatar;save.profile.name=$('editName').value||'Explorer';persist();renderProfile();});
 $('saveProfile').onclick=async()=>{save.profile={name:$('editName').value.replace(/[^a-zA-Z0-9 _-]/g,'').trim()||'Explorer',avatar:save.profile.avatar,banner:$('editBanner').value,frame:$('editFrame').value};persist();if(account.user){try{await account.update(save.profile);toast('Profile synchronized.');}catch(e){toast(e.message,5);}}else toast('Local profile saved.');renderProfile();};
 $('accountConfig').onclick=showAccountConfig;if($('accountLogin'))$('accountLogin').onclick=()=>showAuth('login');if($('accountLogout'))$('accountLogout').onclick=async()=>{await account.logout();renderProfile();};if($('deleteAccount'))$('deleteAccount').onclick=showDeleteAccount;if(account.user)refreshFriends();
}
function showAccountConfig(){openModal('server',`${header('Your account server.','OPTIONAL HTTPS SERVICE')}<p>The included account backend must be deployed before online sign-up works. Leave this empty to keep playing as a guest.</p><form id="serverForm" class="social-form"><label>HTTPS origin<input id="serverOrigin" type="url" value="${escapeText(account.origin)}" placeholder="https://accounts.example.com"></label><p>Changing servers signs you out. Never enter a server you do not trust.</p><button class="primary">Connect server</button><div id="serverStatus" role="status"></div></form>`);bindClose();$('serverForm').onsubmit=async e=>{e.preventDefault();try{account.configure($('serverOrigin').value);if(!account.origin){closeModal();renderProfile();toast('Account server disconnected.');return;}$('serverStatus').textContent='Checking service…';await account.request('/health');closeModal();renderProfile();toast('Account server connected.');}catch(err){$('serverStatus').textContent=err.message;}};}
function showAuth(kind='login'){if(!account.origin){showAccountConfig();return;}openModal('auth',`${header(kind==='signup'?'Join the adventure.':kind==='recover'?'Recover your account.':'Welcome back.','SUPER WISS ACCOUNT')}<div class="button-row">${['login','signup','recover'].map(k=>`<button class="secondary" data-auth="${k}">${k==='login'?'Log in':k==='signup'?'Sign up':'Recover'}</button>`).join('')}</div><form id="authForm" class="social-form"><label>Username<input id="authUser" autocomplete="username" minlength="3" maxlength="24" pattern="[A-Za-z0-9_]{3,24}" required></label><label>${kind==='recover'?'New password':'Password'}<input id="authPass" type="password" autocomplete="${kind==='login'?'current-password':'new-password'}" minlength="12" maxlength="128" required></label>${kind==='recover'?'<label>Recovery code<input id="authRecovery" autocomplete="off" required></label>':''}${kind==='signup'?'<label class="checkbox-line"><input id="authRules" type="checkbox" required> I agree: no abusive names, harassment or cheating. Players can block and report profiles.</label>':''}<button id="authSubmit" class="primary">${kind==='signup'?'Create account':kind==='recover'?'Reset password':'Log in'}</button><div id="authError" role="alert"></div></form>`);bindClose();$('modalPanel').querySelectorAll('[data-auth]').forEach(b=>b.onclick=()=>showAuth(b.dataset.auth));$('authForm').onsubmit=async e=>{e.preventDefault();$('authSubmit').disabled=true;try{const result=await account.login(kind,{username:$('authUser').value,password:$('authPass').value,recoveryCode:$('authRecovery')?.value,acceptRules:$('authRules')?.checked,profile:save.profile});Object.assign(save.profile,cleanUserProfile(result.user));persist();closeModal();renderProfile();if(result.recoveryCode){openModal('recovery',`${header('Save this recovery code.','SHOWN ONCE')}<p>No email address is collected. This code is the only self-service recovery method. Keep it private and store it outside the app.</p><code class="recovery-code">${escapeText(result.recoveryCode)}</code><button id="recoveryDone" class="primary">I saved the code</button>`);bindClose();$('recoveryDone').onclick=closeModal;}}catch(err){$('authError').textContent=err.message;$('authSubmit').disabled=false;}};}
function cleanUserProfile(p){return {name:p.name,avatar:p.avatar,banner:p.banner,frame:p.frame};}
async function refreshFriends(){try{const x=await account.request('/api/friends');if(page!=='profile'||!$('friendsContent'))return;$('friendsContent').innerHTML=`<div class="friend-code">YOUR FRIEND CODE <b>${escapeText(account.user.code)}</b></div><form id="friendForm" class="social-form"><input id="friendCode" placeholder="Friend code" maxlength="10" required><button class="primary">Send request</button></form><h4>Incoming requests (${x.incoming.length})</h4>${x.incoming.map(p=>`<div class="friend-row">${profileCard(p,true)}<button class="secondary" data-accept="${p.id}">Accept</button><button class="secondary" data-decline="${p.id}">Decline</button></div>`).join('')}<h4>Friends (${x.friends.length})</h4>${x.friends.map(p=>`<div class="friend-row">${profileCard(p,true)}<button class="secondary" data-friend-menu="${p.id}" data-friend-name="${escapeText(p.name)}">Manage</button></div>`).join('')||'<p>Your accepted friends will appear here.</p>'}<h4>Outgoing requests (${x.outgoing.length})</h4>${x.outgoing.map(p=>`<div class="friend-row">${profileCard(p,true)}<button class="secondary" data-decline="${p.id}">Cancel</button></div>`).join('')}`;
 $('friendForm').onsubmit=async e=>{e.preventDefault();await socialAction('/api/friends/request',{code:$('friendCode').value});};$('friendsContent').querySelectorAll('[data-accept]').forEach(b=>b.onclick=()=>socialAction('/api/friends/respond',{id:b.dataset.accept,accept:true}));$('friendsContent').querySelectorAll('[data-decline]').forEach(b=>b.onclick=()=>socialAction('/api/friends/remove',{id:b.dataset.decline}));$('friendsContent').querySelectorAll('[data-friend-menu]').forEach(b=>b.onclick=()=>showFriendManage(b.dataset.friendMenu,b.dataset.friendName));
 }catch(e){if($('friendsContent'))$('friendsContent').textContent=e.message;}}
async function socialAction(path,data){try{await account.request(path,'POST',data);toast('Updated.');await refreshFriends();}catch(e){toast(e.message,5);}}
function showFriendManage(id,name){openModal('friend',`${header(escapeText(name),'FRIEND PROFILE')}<p>Blocking removes the friend connection and prevents new requests between these accounts. Reports go to your server operator, not an automatic moderation service.</p><label>Report reason<select id="reportReason"><option value="name">Inappropriate name</option><option value="harassment">Harassment</option><option value="cheating">Cheating</option><option value="other">Other</option></select></label><div class="button-row"><button id="friendRemove" class="secondary">Remove friend</button><button id="friendBlock" class="danger secondary">Block</button><button id="friendReport" class="secondary">Report</button></div>`);bindClose();$('friendRemove').onclick=()=>{socialAction('/api/friends/remove',{id});closeModal();};$('friendBlock').onclick=()=>{socialAction('/api/block',{id});closeModal();};$('friendReport').onclick=()=>{socialAction('/api/report',{id,reason:$('reportReason').value});closeModal();};}
function showDeleteAccount(){openModal('delete',`${header('Delete your online account?','PERMANENT ACTION')}<p>Your online profile, friends and sessions will be removed. Local game progress remains. Safety reports retain no deleted account identity.</p><form id="deleteForm" class="social-form"><input id="deletePass" type="password" autocomplete="current-password" placeholder="Confirm your password" required><label><input type="checkbox" required> Permanently delete my account</label><button class="danger secondary">Delete account</button><div id="deleteStatus" role="alert"></div></form>`);bindClose();$('deleteForm').onsubmit=async e=>{e.preventDefault();try{await account.remove($('deletePass').value);closeModal();renderProfile();toast('Online account deleted.');}catch(err){$('deleteStatus').textContent=err.message;}};}
function nativeSend(peer,message){native?.send(peer,JSON.stringify(message));}
function makeNearby(){return new NearbySession({send:nativeSend,profile:{...save.profile,level:1+Math.floor(save.xp/500),online:true,hero:save.hero,pet:save.pet,outfit:save.ascension.outfits[save.hero]||'starter'},onReject:peer=>native?.kick(peer),onError:text=>{nearbyStatus=text;toast(text,6);},onChange:()=>{if(nearby?.state==='playing'&&!nearbyRendered){closeModal();nearbyRendered=true;paused=false;clearInput();$('menu').hidden=true;$('gameUI').hidden=false;}else if(nearby?.state==='results')showNearbyResult();else if(nearby?.state==='ended')cancelNearby('Connection lost. Match cancelled.');else if(modalType==='nearby')renderNearbyModal();}});}
function showNearby(){if(!native){openModal('nearby-info',`${header('Play side by side.','ANDROID BLUETOOTH')}<p>Bluetooth is available in the Android APK, not this browser preview. Pair your phones in Android Bluetooth settings first, then one player hosts and the others join.</p><p><strong>Shared boss raid:</strong> 2–4 players fight the same sovereign, with team revives. Six-digit code admission after pairing.<br><strong>Solo together:</strong> simultaneous independent boss races.<br><strong>Free-for-all:</strong> 2–4 player arena combat.<br><strong>2v2:</strong> four players, equal stats, no friendly fire.</p><p>No account or internet is needed. Physical-phone Bluetooth testing is still required.</p>`);bindClose();return;}if(!nearby)nearby=makeNearby();renderNearbyModal();}
function renderNearbyModalBase(){if(!nearby||nearby.state==='playing')return;const host=nearby.host,roster=nearby.roster;openModal('nearby',`${header('Your crew. One room.','NEARBY · BLUETOOTH')}<div class="nearby-status" role="status">${escapeText(nearbyStatus||'Pair phones in Android settings. Then request permission and choose host or join.')}</div><div class="button-row"><button id="pairPhones" class="secondary">Pair in Android</button><button id="listPhones" class="secondary">Allow / refresh devices</button><button id="hostNearby" class="primary">Host room</button></div>${nearby.state==='idle'||nearby.state==='connecting'?`<div class="device-list">${nearbyDevices.map(d=>`<button class="secondary" data-device="${escapeText(d.address)}">Join ${escapeText(d.name)}</button>`).join('')||'<p>No paired devices loaded.</p>'}</div>`:''}${roster.length?`<div class="nearby-roster">${roster.map(p=>`<div>${profileCard(p.profile,true)}<small>${p.id==='host'?'HOST':p.ready?'READY':'NOT READY'} ${host&&p.id!=='host'?`<button class="secondary kick-peer" data-kick="${p.id}">Kick</button>`:''}</small></div>`).join('')}</div>`:''}${host?`<div class="nearby-options"><label>Mode<select id="nearMode">${[['together','Solo together · boss race'],['ffa','Free-for-all'],['teams','2v2 · four players']].map(([k,v])=>`<option value="${k}" ${nearby.mode===k?'selected':''}>${v}</option>`).join('')}</select></label><label>Arena / boss<select id="nearWorld">${BOSSES.map((b,i)=>`<option value="${i}" ${nearby.world===i?'selected':''}>${b.name}</option>`).join('')}</select></label><button id="nearStart" class="primary">Start match</button></div>`:roster.length?`<button id="nearReady" class="primary">${roster.find(p=>p.id===nearby.id)?.ready?'Not ready':'Ready up'}</button>`:''}<p class="nearby-note">Host + up to 3 friends. The host calculates movement and results. Minimize other Bluetooth traffic. Backgrounding or a disconnect cancels the match. Rematches keep the connection.</p><button id="nearLeave" class="secondary">Leave room</button>`);bindClose(()=>{closeModal();});$('pairPhones').onclick=()=>native.openBluetoothSettings();$('listPhones').onclick=()=>native.requestBluetooth();$('hostNearby').onclick=()=>{native.stop();nearby=makeNearby();nearby.hostLobby();native.host();nearbyStatus='Hosting. Friends should select this phone.';renderNearbyModal();};$('nearLeave').onclick=()=>{native.stop();nearby.stop();nearby=null;closeModal();};$('modalPanel').querySelectorAll('[data-device]').forEach(b=>b.onclick=()=>{nearby=makeNearby();nearby.state='connecting';nearbyStatus='Connecting…';native.join(b.dataset.device);renderNearbyModal();});if(host){$('nearMode').onchange=$('nearWorld').onchange=()=>nearby.configure($('nearMode').value,+$('nearWorld').value,save.settings.difficulty);$('nearStart').onclick=()=>{try{nearby.start();}catch(e){toast(e.message,4);}};$('modalPanel').querySelectorAll('[data-kick]').forEach(b=>b.onclick=()=>{native.kick(b.dataset.kick);nearby.disconnected(b.dataset.kick);});}else if($('nearReady'))$('nearReady').onclick=()=>nearby.ready(!roster.find(p=>p.id===nearby.id)?.ready);}
function frameNearby(dt,t){const input=readInput();let remaining=Math.min(dt,.1);while(remaining>0){const step=Math.min(DT,remaining);nearby.step(input,step);remaining-=step;}if(!nearby?.snapshot)return;nearbyView=snapshotView(nearby.snapshot,nearby.id,nearbyView);if(!nearbyView)return;run=nearbyView;ascSetRunButtons();document.body.classList.toggle('pvp-mode',['ffa','teams'].includes(nearby.mode));$('petDock').hidden=nearby.mode!=='raid'||!PETS.some(p=>p.id===run.petId);renderer.drawRun(run,t,dt);updateHud();$('stageBanner').hidden=true;$('gameHint').hidden=true;$('nearbyScore').hidden=false;const s=nearby.snapshot;$('nearbyScore').textContent=s.countdown>0?`START IN ${Math.ceil(s.countdown)}`:nearby.mode==='teams'?`SUN ${s.teamScores[0]} — ${s.teamScores[1]} MOON · ${Math.max(0,180-Math.floor(s.time-3))}s`:nearby.mode==='raid'?`SQUAD RAID · ${s.players.filter(p=>!p.failed).length}/${s.players.length} standing · ${s.revivePool} revives`:s.players.map(p=>`${p.profile.name}: ${nearby.mode==='together'?(p.finishedAt?formatTime(p.finishedAt):Math.ceil(p.boss?.hp||0)+' HP'):p.kills}`).join('  |  ');audio.scene=nearby.mode==='raid'?'raid':'exploration';audio.bossActive=['raid','together'].includes(nearby.mode);audio.tick(run.worldId,true);}
function showNearbyPause(){openModal('nearby-pause',`${header('Local match continues.','LIVE MATCH')}<p>All devices share the host’s clock. This match cannot be paused.</p><div class="button-row"><button id="localResume" class="primary">Return to match</button><button id="localLeave" class="danger secondary">Leave & cancel</button></div>`);bindClose();$('localResume').onclick=closeModal;$('localLeave').onclick=()=>cancelNearby('You left the match.');}
function cancelNearby(text){if(!nearby)return;native?.stop();nearby.stop();nearby=null;nearbyView=null;nearbyRendered=false;run=null;paused=false;clearInput();$('gameUI').hidden=true;$('menu').hidden=false;document.body.classList.remove('pvp-mode','boss-mode');closeModal();showPage('home');toast(text,5);}
function showNearbyResultBase(){if(!nearby?.snapshot?.result)return;const result=nearby.snapshot.result;paused=true;clearInput();nearbyRendered=false;openModal('nearby-result',`${header(result.tie?'A hard-fought draw.':'Match complete.','NEARBY · HOST-CALCULATED',false)}${result.rows.map(p=>`<div class="friend-row">${profileCard(p.profile,true)}<b>${result.mode==='together'?(p.time===null?'No clear':formatTime(p.time)):p.kills+' KOs / '+p.deaths+' falls'}</b></div>`).join('')}<p>Local match only. No global ranked points or campaign rewards.</p><div class="button-row">${nearby.host?'<button id="localRematch" class="primary">Rematch lobby</button>':'<span>Waiting for host to reopen the lobby…</span>'}<button id="localExit" class="secondary">Leave</button></div>`);$('localExit').onclick=()=>cancelNearby('Local session ended.');if($('localRematch'))$('localRematch').onclick=()=>{run=null;nearbyView=null;$('gameUI').hidden=true;$('menu').hidden=false;nearby.rematch();showNearby();};}
window.addEventListener('sw-native',e=>{const v=e.detail;if(!v||typeof v.type!=='string')return;if(v.type==='devices'){nearbyDevices=Array.isArray(v.devices)?v.devices.slice(0,30):[];nearbyStatus='Select a paired host, or host your own room.';if(modalType==='nearby')renderNearbyModal();}else if(v.type==='status'||v.type==='error'){nearbyStatus=String(v.text||'').slice(0,200);if(modalType==='nearby')renderNearbyModal();else if(v.type==='error')toast(nearbyStatus,5);}else if(v.type==='connected')nearby?.connected(v.peer);else if(v.type==='disconnected')nearby?.disconnected(v.peer);else if(v.type==='message'){const oldState=nearby?.state;nearby?.receive(v.peer,v.payload);if(oldState==='results'&&nearby?.state==='lobby'){run=null;nearbyView=null;nearbyRendered=false;$('gameUI').hidden=true;$('menu').hidden=false;showNearby();}}});
const analogPad=$('analogControl');
function moveAnalog(e){if(e.pointerId!==analog.pointer)return;const b=analogPad.getBoundingClientRect(),v=analogVector(e.clientX-b.left-b.width/2,e.clientY-b.top-b.height/2,b.width*.38,save.settings.sensitivity);analog.axis=v.axis;analog.aim=v.aim;analogPad.setAttribute('aria-valuenow',v.axis.toFixed(2));$('analogKnob').style.transform=`translate(calc(-50% + ${v.x*b.width*.38}px),calc(-50% + ${v.y*b.width*.38}px))`;}
analogPad.addEventListener('pointerdown',e=>{if(!run||paused||analog.pointer!==null)return;e.preventDefault();analog.pointer=e.pointerId;analogPad.setPointerCapture(e.pointerId);moveAnalog(e);audioGesture();});analogPad.addEventListener('pointermove',moveAnalog);for(const name of ['pointerup','pointercancel','lostpointercapture'])analogPad.addEventListener(name,e=>{if(e.pointerId!==analog.pointer)return;analog.pointer=null;analog.axis=analog.aim=0;$('analogKnob').style.transform='translate(-50%,-50%)';});analogPad.addEventListener('contextmenu',e=>e.preventDefault());

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

if(account.token&&!window.SuperWissBoot?.safe)account.me().then(()=>{if(page==='profile')renderProfile();}).catch(()=>{account.user=null;});
