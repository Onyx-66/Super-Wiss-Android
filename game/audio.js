import { ASSET_CONFIG, assetUrl } from './assets.js';
import { WORLDS } from './data.js';
/** File-based sound engine with rate-limited effects, volume controls and graceful decode failure. */
export class AudioEngine {
    constructor() { this.context = null; this.enabled = true; this.music = true; this.sfxVolume = .75; this.musicVolume = .5; this.buffers = new Map(); this.loading = new Map(); this.lastPlay = {}; this.voices = 0; this.track = null; this.musicSource = null; this.musicGain = null; this.lastWorld = -1; }
    unlock() {
        if (!this.enabled)
            return;
        if (!this.context) {
            const C = window.AudioContext || window.webkitAudioContext;
            if (!C)
                return;
            this.context = new C();
            this.master = this.context.createGain();
            this.master.gain.value = .72;
            const limiter = this.context.createDynamicsCompressor();
            limiter.threshold.value = -8;
            limiter.knee.value = 12;
            limiter.ratio.value = 6;
            this.master.connect(limiter);
            limiter.connect(this.context.destination);
        }
        this.context.resume().catch(() => { });
        for (const key of Object.keys(ASSET_CONFIG.audio))
            if (key.startsWith('sfx/'))
                this.load(key);
    }
    async load(key) {
        if (this.buffers.has(key))
            return this.buffers.get(key);
        if (this.loading.has(key))
            return this.loading.get(key);
        if (!this.context || !ASSET_CONFIG.audio[key])
            return null;
        const promise = (async () => {
            try {
                const url = assetUrl(key);
                let bytes;
                // Browser preview embeds media; Android streams same-origin APK media.
                if (url.startsWith('data:')) {
                    const raw = atob(url.slice(url.indexOf(',') + 1));
                    bytes = Uint8Array.from(raw, c => c.charCodeAt(0)).buffer;
                }
                else {
                    const target = new URL(url, location.href);
                    if (target.origin !== location.origin || !target.pathname.startsWith('/assets/')) return null;
                    const response = await fetch(target.href);
                    if (!response.ok) throw Error('Audio asset HTTP '+response.status);
                    bytes = await response.arrayBuffer();
                }
                const buffer = await this.context.decodeAudioData(bytes);
                this.buffers.set(key, buffer);
                return buffer;
            }
            catch (err) {
                console.warn('[SuperWissAssets] Audio unavailable:', key, err.message);
                return null;
            }
        })();
        this.loading.set(key, promise);
        return promise;
    }
    play(type, event = {}) {
        if (!this.enabled || !this.context || this.context.state !== 'running' || this.voices >= 20)
            return;
        const aliases = { punch:'stomp', 'unarmed-hit':'armor', bounce: 'stomp', gameover: 'knockout', blast: 'skill', scales: 'shield', shrine: 'power', crate: 'block', treasure: 'chest', 'water-save': 'prince' };
        let name = aliases[type] || type;
        if (type === 'skill' && event.skill === 'gravity')
            name = 'gravity';
        if (type === 'pet-skill')
            name = event.skill || 'power';
        const key = 'sfx/' + name, buffer = this.buffers.get(key);
        if (!buffer) {
            this.load(key);
            return;
        }
        const now = this.context.currentTime;
        if (now - (this.lastPlay[name] ?? -100) < (name === 'coin' ? .045 : .08))
            return;
        this.lastPlay[name] = now;
        const src = this.context.createBufferSource(), gain = this.context.createGain();
        src.buffer = buffer;
        gain.gain.value = this.sfxVolume * (ASSET_CONFIG.audio[key]?.volume ?? .8);
        src.connect(gain);
        gain.connect(this.master);
        this.voices++;
        src.onended = () => { this.voices--; src.disconnect(); gain.disconnect(); };
        src.start();
    }
    tick(world = 0, active = false) {
        if (!this.context)
            return;
        const desired = 'music/' + (this.scene==='menu'?'menu':this.scene==='raid'?'raid':this.bossActive?'boss':WORLDS[world]?.music || 'frontier');
        if (this.enabled && this.music && active && this.track !== desired) {
            this.track = desired;
            this.load(desired).then(buffer => {
                if (!buffer || this.track !== desired)
                    return;
                this.musicSource?.stop();
                this.musicSource?.disconnect();
                this.musicGain?.disconnect();
                const src = this.context.createBufferSource(), gain = this.context.createGain();
                src.buffer = buffer;
                src.loop = true;
                gain.gain.value = 0;
                src.connect(gain);
                gain.connect(this.master);
                src.start();
                this.musicSource = src;
                this.musicGain = gain;
            });
        }
        if (this.musicGain) {
            const volume = this.enabled && this.music && active ? this.musicVolume * (ASSET_CONFIG.audio[this.track]?.volume ?? .34) : 0;
            this.musicGain.gain.setTargetAtTime(volume, this.context.currentTime, .12);
        }
    }
}
