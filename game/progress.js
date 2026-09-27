import { ascDefault, ascSanitize, ascRecord } from './ascension.js';
import { sanitizeControlPresets } from './controls.js';
import { HEROES, QUESTS, TRAILS, WORLDS, PETS, POWERS, dailyQuests, heroById } from './data.js';
import { objectiveResults, runDistance } from './engine.js';
export const SAVE_KEY = 'super-wiss:odyssey-v4';
export const utcDay = () => new Date().toISOString().slice(0, 10);
const count = n => Number.isFinite(n) && n >= 0 ? Math.min(1e12, Math.floor(n)) : 0;
export function defaultSave() { return { discoveredPowerUps:[], version: 5, ascension:ascDefault(),controlPresets:sanitizeControlPresets(),controlActive:0,profile: {name:"Explorer",avatar:"wissem",banner:"aurora",frame:"silver"}, legacyUnlocked:0, bossRecords:{}, summon:"warden", hero: 'wissem', pet: null, pets: [], gold: 0, xp: 0, trail: 'classic', ownedTrails: ['classic'], maps: Array.from({ length: WORLDS.length }, () => ({ clear: false, stars: [false, false, false], score: 0, time: null })), totals: { coins: 0, kills: 0, powers: 0, skills: 0, clears: 0, distance: 0 }, mastery: {}, claims: [], daily: { day: utcDay(), stats: { coins: 0, kills: 0, skills: 0 }, claims: [], best: 0 }, endless: { best: 0, stage: 0, runs: [] }, settings: { controlMode:'analog', sensitivity:1, difficulty:'nightmare', blood:'crimson', haptics:true, sound: true, music: true, motion: true, sprint: true, quality: 'balanced', zoom: 'normal', leftHanded: false, opacity: .85, sfxVolume: .75, musicVolume: .5 }, onboarded: false }; }
export function sanitizeSave(raw) {
    const s = defaultSave();
    if (!raw || typeof raw !== 'object')
        return s;
    s.ascension=ascSanitize(raw.ascension);s.controlPresets=sanitizeControlPresets(raw.controlPresets);s.controlActive=Number.isInteger(raw.controlActive)?Math.max(0,Math.min(3,raw.controlActive)):0;
    s.discoveredPowerUps=Array.isArray(raw.discoveredPowerUps)?[...new Set(raw.discoveredPowerUps.filter(id=>POWERS.some(p=>p.id===id)))]:[];
    s.hero = heroById(raw.hero).id;
    s.profile={name:String(raw.profile?.name||'Explorer').replace(/[^a-zA-Z0-9 _-]/g,'').slice(0,20)||'Explorer',avatar:heroById(raw.profile?.avatar).id,banner:['aurora','ember','void','tide'].includes(raw.profile?.banner)?raw.profile.banner:'aurora',frame:['silver','gold','thorns','astral'].includes(raw.profile?.frame)?raw.profile.frame:'silver'};
    s.legacyUnlocked=Math.min(WORLDS.length-1,count(raw.legacyUnlocked));
    s.summon=['warden','ravens','sentinel'].includes(raw.summon)?raw.summon:'warden';
    if(raw.bossRecords&&typeof raw.bossRecords==='object')for(const [k,v]of Object.entries(raw.bossRecords).slice(0,300))if(/^\d{1,2}:(veteran|nightmare|inferno):[a-z-]+$/.test(k)&&v&&Number.isFinite(v.time)&&v.time>0)s.bossRecords[k]={time:v.time,hits:count(v.hits),hero:heroById(v.hero).id,score:count(v.score),date:String(v.date||'').slice(0,10)};
    s.pets = Array.isArray(raw.pets) ? [...new Set(raw.pets.filter(id => PETS.some(p => p.id === id)))] : [];
    s.pet = s.pets.includes(raw.pet) ? raw.pet : null;
    s.gold = count(raw.gold);
    s.xp = count(raw.xp);
    s.onboarded = raw.onboarded === true;
    if (Array.isArray(raw.maps))
        s.maps = s.maps.map((m, i) => { const v = raw.maps[i] || {}; return { clear: v.clear === true, stars: [0, 1, 2].map(k => v.stars?.[k] === true), score: count(v.score), time: Number.isFinite(v.time) && v.time > 0 ? v.time : null }; });
    for (const k of Object.keys(s.totals))
        s.totals[k] = count(raw.totals?.[k]);
    for (const h of HEROES)
        s.mastery[h.id] = count(raw.mastery?.[h.id]);
    s.claims = Array.isArray(raw.claims) ? raw.claims.filter(k => QUESTS.some(q => q.id === k)) : [];
    s.ownedTrails = Array.isArray(raw.ownedTrails) ? ['classic', ...new Set(raw.ownedTrails.filter(k => TRAILS.some(t => t.id === k)))] : ['classic'];
    s.trail = s.ownedTrails.includes(raw.trail) ? raw.trail : 'classic';
    if (raw.daily?.day === s.daily.day) {
        for (const k of Object.keys(s.daily.stats))
            s.daily.stats[k] = count(raw.daily.stats?.[k]);
        s.daily.claims = Array.isArray(raw.daily.claims) ? raw.daily.claims.filter(k => dailyQuests(s.daily.day).some(q => q.id === k)) : [];
        s.daily.best = count(raw.daily.best);
    }
    s.endless.best = count(raw.endless?.best);
    s.endless.stage = count(raw.endless?.stage);
    s.endless.runs = Array.isArray(raw.endless?.runs) ? raw.endless.runs.filter(v => v && Number.isFinite(v.score)).slice(0, 8).map(v => ({ score: count(v.score), stage: count(v.stage), distance: count(v.distance), hero: heroById(v.hero).id, date: typeof v.date === 'string' ? v.date.slice(0, 10) : utcDay() })) : [];
    for (const k of ['sound', 'music', 'motion', 'sprint', 'leftHanded'])
        if (typeof raw.settings?.[k] === 'boolean')
            s.settings[k] = raw.settings[k];
    s.settings.controlMode=raw.settings?.controlMode==='arrows'?'arrows':'analog';
    s.settings.sensitivity=[.75,1,1.25].includes(raw.settings?.sensitivity)?raw.settings.sensitivity:1;
    s.settings.difficulty=['veteran','nightmare','inferno'].includes(raw.settings?.difficulty)?raw.settings.difficulty:'nightmare';
    s.settings.blood=['off','essence','crimson'].includes(raw.settings?.blood)?raw.settings.blood:'crimson';
    s.settings.haptics=raw.settings?.haptics!==false;
    s.settings.quality = ['low','balanced','high'].includes(raw.settings?.quality) ? raw.settings.quality : 'balanced';
    s.settings.zoom = raw.settings?.zoom === 'close' ? 'close' : 'normal';
    s.settings.opacity = raw.settings?.opacity === .55 ? .55 : .85;
    for (const k of ['sfxVolume', 'musicVolume'])
        if (Number.isFinite(raw.settings?.[k]))
            s.settings[k] = Math.max(0, Math.min(1, raw.settings[k]));
    return s;
}
export function loadSave(storage) {
    try {
        const raw = storage.getItem(SAVE_KEY);
        if (raw) {
            try {
                return { save: sanitizeSave(JSON.parse(raw)), recovered: false, ephemeral: false };
            }
            catch {
                const backup = storage.getItem(SAVE_KEY + ':backup');
                if (backup) {
                    try {
                        return { save: sanitizeSave(JSON.parse(backup)), recovered: true, ephemeral: false };
                    }
                    catch { }
                }
                return { save: defaultSave(), recovered: true, ephemeral: false };
            }
        }
        const old = storage.getItem('super-wiss:odyssey-v3') || storage.getItem('super-wiss:odyssey-v2');
        if (old) {
            try {
                const legacy = JSON.parse(old), s = sanitizeSave(legacy);
                s.legacyUnlocked=Math.min(WORLDS.length-1,s.maps.reduce((a,m,i)=>m.clear?Math.max(a,i+1):a,0));
                s.maps=s.maps.map(m=>({clear:false,stars:[false,false,false],score:0,time:null}));
                s.endless = { best: 0, stage: 0, runs: [] };
                s.daily.best = 0;
                return { save: s, migrated: true, recovered: false, ephemeral: false };
            }
            catch { }
        }
        return { save: defaultSave(), recovered: false, ephemeral: false };
    }
    catch {
        return { save: defaultSave(), recovered: false, ephemeral: true };
    }
}
export function saveProgress(storage, s) { try {
    const previous = storage.getItem(SAVE_KEY);
    if (previous) {
        try {
            JSON.parse(previous);
            storage.setItem(SAVE_KEY + ':backup', previous);
        }
        catch { }
    }
    storage.setItem(SAVE_KEY, JSON.stringify(s));
    return true;
}
catch {
    return false;
} }
export function refreshDay(s) { const day = utcDay(); if (s.daily.day !== day)
    s.daily = { day, stats: { coins: 0, kills: 0, skills: 0 }, claims: [], best: 0 }; }
export function starsTotal(s) { return s.maps.reduce((a, m) => a + m.stars.filter(Boolean).length, 0); }
export function questValue(s, q) { if (q.stat === 'stars')
    return starsTotal(s); if (q.stat === 'unique')
    return s.maps.filter(m => m.clear).length; if (q.stat === 'endlessStage')
    return s.endless.stage; return s.totals[q.stat] || 0; }
export function claimQuest(s, id, daily = false) { refreshDay(s); const q = (daily ? dailyQuests(s.daily.day) : QUESTS).find(q => q.id === id), claims = daily ? s.daily.claims : s.claims; if (!q || claims.includes(id))
    return 0; const v = daily ? s.daily.stats[q.stat] || 0 : questValue(s, q); if (v < q.target)
    return 0; claims.push(id); s.gold += q.reward; s.xp += Math.floor(q.reward / 2); return q.reward; }
export function bankRunStats(s, r) {
    if (!r || ['practice','boss','local'].includes(r.mode))
        return;
    refreshDay(s);
    for (const id of r.petsFound || [])
        if (PETS.some(p => p.id === id) && !s.pets.includes(id)) {
            s.pets.push(id);
            if (!s.pet)
                s.pet = id;
        }
    r.accounted = r.accounted || { coins: 0, kills: 0, powers: 0, skills: 0, gold: 0, distance: 0 };
    for (const k of ['coins', 'kills', 'powers', 'skills']) {
        const delta = Math.max(0, r.stats[k] - r.accounted[k]);
        s.totals[k] += delta;
        if (k in s.daily.stats)
            s.daily.stats[k] += delta;
        if (k === 'skills')
            s.mastery[r.player.character] = (s.mastery[r.player.character] || 0) + delta;
        r.accounted[k] = r.stats[k];
    }
    const gold = Math.max(0, r.coinsEarned - r.accounted.gold);
    s.gold += gold;
    s.xp += gold;
    r.accounted.gold = r.coinsEarned;
    const d = runDistance(r);
    s.totals.distance += Math.max(0, d - r.accounted.distance);
    r.accounted.distance = d;
}
export function recordRun(s, r) {
    if (r.recorded)
        return r.result;
    ascRecord(s,r);
    r.recorded = true;
    bankRunStats(s, r);
    const res = { newBest: false, newStars: 0, reward: 0, objectives: objectiveResults(r) };
    if (r.mode === 'boss' && r.complete) {
      const key=r.worldId+':'+r.difficulty+':'+(r.petId||'none'); const prior=s.bossRecords[key];
      res.newBest=!prior||r.bossTime<prior.time;res.objectives=[];
      if(res.newBest)s.bossRecords[key]={time:r.bossTime,hits:r.hits,hero:r.player.character,score:r.score,date:utcDay()};
    }
    if (r.mode === 'campaign' && r.complete) {
        const m = s.maps[r.worldId], first = !m.clear;
        m.clear = true;
        s.totals.clears++;
        res.newBest = r.score > m.score;
        m.score = Math.max(m.score, r.score);
        const time = r.mapTime + r.knockouts * 3;
        m.time = m.time === null ? time : Math.min(m.time, time);
        res.objectives.forEach((o, i) => { if (o.done && !m.stars[i]) {
            m.stars[i] = true;
            res.newStars++;
        } });
        res.reward = (first ? 100 + r.worldId * 15 : 25) + res.newStars * 50;
        s.gold += res.reward;
        s.xp += 80 + res.newStars * 60;
    }
    if (r.mode === 'endless' && r.failed) {
        res.newBest = r.score > s.endless.best;
        s.endless.best = Math.max(s.endless.best, r.score);
        s.endless.stage = Math.max(s.endless.stage, r.stage + 1);
        s.endless.runs.push({ score: r.score, stage: r.stage + 1, distance: runDistance(r), hero: r.player.character, date: utcDay() });
        s.endless.runs.sort((a, b) => b.score - a.score);
        s.endless.runs = s.endless.runs.slice(0, 8);
        res.reward = Math.min(500, Math.floor(r.score / 500));
        s.gold += res.reward;
        s.xp += Math.min(400, Math.floor(r.score / 100));
    }
    if (r.mode === 'daily' && (r.failed || r.complete)) {
        res.newBest = r.score > s.daily.best;
        s.daily.best = Math.max(s.daily.best, r.score);
        res.reward = r.complete ? 80 : 0;
        s.gold += res.reward;
        s.xp += res.reward;
    }
    r.result = res;
    return res;
}
export function unlockTrail(s, id) { const t = TRAILS.find(t => t.id === id); if (!t)
    return false; if (s.ownedTrails.includes(id)) {
    s.trail = id;
    return true;
} if (s.gold < t.cost)
    return false; s.gold -= t.cost; s.ownedTrails.push(id); s.trail = id; return true; }
export function equipPet(s, id) { if (id === null) {
    s.pet = null;
    return true;
} if (!s.pets.includes(id))
    return false; s.pet = id; return true; }
