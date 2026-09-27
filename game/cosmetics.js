export const COSMETIC_PARTS=['head','torso','gloves','boots','cape','weapon','aura','emote'];
export const COSMETIC_COLORS={frost:'#8fe9ff',ember:'#ffba72'};
export function cleanCosmetics(raw={},allowEmber=false){return Object.fromEntries(COSMETIC_PARTS.map(k=>[k,['original','frost',...(allowEmber?['ember']:[])].includes(raw?.[k])?raw[k]:'original']));}
