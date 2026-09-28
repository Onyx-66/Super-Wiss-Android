/** Runtime data. Edit game/*.json then run npm run build. */
import { CONTENT } from './content.js';
export const VERSION = '1.4.1';
export const TILE = 40, GROUND = 480, DT = 1 / 60;
export const HEROES = CONTENT.heroes.map(h => ({ ...h, skill: h.skills[0].name, icon: h.skills[0].icon, cooldown: h.skills[0].cooldown, description: h.skills[0].description, hint: h.skills[0].description }));
export const HERO_ALIASES = { wiss: 'wissem', nova: 'yakine', rafi: 'youssef', aya: 'loey', zed: 'kossay', luna: 'taky', koa: 'garsi', pip: 'tounsi' };
export const PETS = CONTENT.pets;
export const POWERS = CONTENT.powers;
export const WORLDS = CONTENT.maps.map((w, id) => ({ ...w, id, length: w.baseLength * w.lengthMultiplier, par: w.basePar * w.lengthMultiplier, coinGoal: (20 + id * 2) * w.lengthMultiplier, gaps: Array.from({ length: w.lengthMultiplier }, (_, s) => w.gaps.map(g => g + s * w.baseLength)).flat(), sections: w.lengthMultiplier, chapter: Math.floor(id / 5) }));
export const CHAPTERS = ['The wild frontiers', 'Beyond the horizon', 'The forgotten skies'];
export const ENEMY_TYPES = ['slime', 'beetle', 'hopper', 'bat', 'crab', 'sentry', 'spiker', 'golem', 'imp', 'ninja', 'wisp', 'maw', 'drone'];
export const TRAILS = [{ id: 'classic', name: 'Stardust', color: '#fff0a6', cost: 0 }, { id: 'mint', name: 'Aurora', color: '#60ffd0', cost: 400 }, { id: 'rose', name: 'Roselight', color: '#ff89ba', cost: 700 }, { id: 'ice', name: 'Frostfire', color: '#a0e3ff', cost: 1000 }, { id: 'prism', name: 'Prismatic', color: '#c6a4ff', cost: 1500 }];
export const QUESTS = [
    { id: 'first', name: 'The first chapter', text: 'Clear your first campaign map.', stat: 'clears', target: 1, reward: 100, icon: 'flag-checkered' },
    { id: 'coins100', name: 'Pocket change', text: 'Collect 100 coins across your runs.', stat: 'coins', target: 100, reward: 150, icon: 'coins' },
    { id: 'foes25', name: 'Monster stopper', text: 'Defeat 25 monsters.', stat: 'kills', target: 25, reward: 180, icon: 'skull' },
    { id: 'skills20', name: 'Find your power', text: 'Activate hero skills 20 times.', stat: 'skills', target: 20, reward: 150, icon: 'bolt' },
    { id: 'powers20', name: 'Fully charged', text: 'Collect 20 power-ups.', stat: 'powers', target: 20, reward: 180, icon: 'flask' },
    { id: 'stars9', name: 'Star seeker', text: 'Earn 9 different campaign stars.', stat: 'stars', target: 9, reward: 250, icon: 'star' },
    { id: 'clear5', name: 'Beyond the frontier', text: 'Clear 5 different campaign maps.', stat: 'unique', target: 5, reward: 350, icon: 'map' },
    { id: 'endless3', name: 'Keep the world turning', text: 'Reach world 3 in a single endless run.', stat: 'endlessStage', target: 3, reward: 300, icon: 'infinity' },
    { id: 'coins1000', name: 'Golden legend', text: 'Collect 1,000 coins across your runs.', stat: 'coins', target: 1000, reward: 500, icon: 'coins' },
    { id: 'foes200', name: 'The great clean-up', text: 'Defeat 200 monsters.', stat: 'kills', target: 200, reward: 450, icon: 'skull' },
    { id: 'all', name: 'World wanderer', text: `Clear all ${WORLDS.length} campaign maps.`, stat: 'unique', target: WORLDS.length, reward: 900, icon: 'earth-americas' },
    { id: 'stars45', name: 'A perfect odyssey', text: `Earn all ${WORLDS.length * 3} campaign stars.`, stat: 'stars', target: WORLDS.length * 3, reward: 1500, icon: 'trophy' }
];
export function mapObjectives(id) {
    const w = WORLDS[id];
    return [
        { key: 'clear', label: 'Break three seals, defeat the boss, enter the Stargate', icon: 'flag-checkered' },
        id % 3 === 1 ? { key: 'kills', label: `Defeat ${16 + Math.floor(id / 3) * 4} monsters`, target: 16 + Math.floor(id / 3) * 4, icon: 'skull' } : id % 3 === 2 ? { key: 'powers', label: 'Collect 12 power-ups', target: 12, icon: 'flask' } : { key: 'coins', label: `Collect ${w.coinGoal} coins`, target: w.coinGoal, icon: 'coins' },
        id % 3 === 0 ? { key: 'clean', label: 'Finish without a knockout', icon: 'heart' } : id % 3 === 1 ? { key: 'time', label: `Finish under ${w.par}s`, target: w.par, icon: 'stopwatch' } : { key: 'skills', label: 'Use either hero skill 12 times', target: 12, icon: 'bolt' }
    ];
}
export function dailyQuests(day) {
    let n = 0;
    for (const c of day)
        n = (n * 31 + c.charCodeAt(0)) >>> 0;
    return [
        { id: 'daily-coins', name: 'Daily treasure', text: `Collect ${60 + n % 41} coins today.`, stat: 'coins', target: 60 + n % 41, reward: 120, icon: 'coins' },
        { id: 'daily-foes', name: 'Daily patrol', text: `Defeat ${8 + n % 8} monsters today.`, stat: 'kills', target: 8 + n % 8, reward: 150, icon: 'skull' },
        { id: 'daily-skills', name: 'Daily spark', text: `Use skills ${5 + n % 5} times today.`, stat: 'skills', target: 5 + n % 5, reward: 120, icon: 'bolt' }
    ];
}
export function heroById(id) { return HEROES.find(h => h.id === (HERO_ALIASES[id] || id)) || HEROES[0]; }
