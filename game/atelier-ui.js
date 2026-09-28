/* Local art-integration adapter. Existing save, account and gameplay commands remain authoritative. */
function localHeroLoadout(id){return {outfit:save.ascension.outfits[id]||'starter',parts:save.ascension.parts?.[id],equippedWeapon:equippedWeapon(save.ascension,id),wardrobe:save.ascension.wardrobe?.[id]||{}};}
function loadoutDescription(id){
 const weapon=equippedWeapon(save.ascension,id);
 if(weapon===null)return id==='wissem'?'UNARMED · BARE HANDS':'UNARMED · IDENTITY ART SHOWN; COMBAT POSE PENDING';
 return WEAPON_RULES[weapon]?.label.toUpperCase()||'SIGNATURE LOADOUT';
}
function heroStatsHTML(id){const stats=heroStats(id);return `<div class="hero-stat-grid">${Object.entries(STAT_LABELS).map(([key,label])=>`<div title="${escapeText(STAT_HELP[key])}">${icon(key)}<span>${label}<strong>${stats[key]}</strong></span><meter min="0" max="200" value="${stats[key]}" aria-label="${label} rating ${stats[key]}"></meter></div>`).join('')}</div>`;}
function renderHeroes(){
 const grid=$('heroGrid'),h=heroById(selectedHero);
 grid.innerHTML=HEROES.map(v=>`<button class="hero-card ${v.id===h.id?'selected':''}" data-hero="${v.id}" aria-pressed="${v.id===h.id}" aria-label="${v.name}, ${v.role}"><canvas width="192" height="224" data-hero-art="${v.id}"></canvas><strong>${v.name}</strong><small>${v.role}</small><span class="hero-equipped">${save.hero===v.id?'EQUIPPED':''}</span></button>`).join('');
 grid.querySelectorAll('[data-hero-art]').forEach(c=>paintPortrait(c,c.dataset.heroArt,c.dataset.heroArt===h.id,localHeroLoadout(c.dataset.heroArt)));
 grid.querySelectorAll('[data-hero]').forEach(b=>b.onclick=()=>{click();selectedHero=b.dataset.hero;renderHeroes();});
 const weapon=equippedWeapon(save.ascension,h.id),proxy=weapon===null&&h.id!=='wissem';
 $('heroDetails').innerHTML=`<div class="hero-detail-top"><canvas width="168" height="190" id="detailHero"></canvas><div><span class="detail-overline">${save.hero===h.id?'YOUR HERO':'CHOOSE YOUR HERO'}</span><h3>${h.name}</h3><small>${h.role}</small></div></div>${heroStatsHTML(h.id)}<p class="loadout-note ${proxy?'art-pending':''}">${escapeText(loadoutDescription(h.id))}</p><div class="pixel-skills">${h.skills.map(sk=>`<article>${ascSkillImage(sk)}<div><b>${escapeText(sk.name)}</b><small>${sk.cooldown}s cooldown</small><p>${escapeText(sk.description)}</p></div></article>`).join('')}</div><button id="equipHero" class="primary">${icon(save.hero===h.id?'check':'profile')}${save.hero===h.id?'Equipped':'Play as '+h.name}</button><div class="detail-buttons"><button id="heroLoadout" class="secondary">Weapons / unarmed</button><button id="heroForge" class="secondary">Wardrobe & skills</button></div><details class="hero-stat-help"><summary>Ratings & hero identity</summary><p>${escapeText(h.backstory||h.hint)}</p><p>Fixed ratings describe the original combat profile. They do not add a second damage multiplier, buy health, or level up with cosmetics.</p><p>${Object.entries(STAT_HELP).map(([k,v])=>STAT_LABELS[k]+': '+v).join(' ')}</p></details>`;
 paintPortrait($('detailHero'),h.id,true,localHeroLoadout(h.id));
 $('equipHero').onclick=()=>{click();save.hero=h.id;persist();renderHeroes();};
 $('heroLoadout').onclick=()=>showWeaponLoadout(h.id);
 $('heroForge').onclick=()=>{ascForgeHero=h.id;showPage('forge');};
}
function showWeaponLoadout(id){
 const h=heroById(id),current=equippedWeapon(save.ascension,id);
 openModal('weapons',`${header(h.name+' · Weapons','EQUIPMENT / FIXED CAPABILITY RATINGS')}${heroStatsHTML(id)}<p>Choose a weapon or fight bare-handed. New loadouts use separate Open records. Normalized local PvP retains its shared combat rules.</p><div class="weapon-catalog"><button class="weapon-choice ${current===null?'selected':''}" data-equip-weapon="unarmed"><span class="unarmed-word">UNARMED</span><b>Bare hands</b><small>${id==='wissem'?'Weapon-free base; dedicated guard art pending':'Functional training proxy; hero art pending'}</small></button>${Object.entries(WEAPON_RULES).map(([type,rule])=>{const status=equipmentStatus(id,type),signature=type===signatureWeapon(id);return `<button class="weapon-choice ${type===current?'selected':''}" data-equip-weapon="${type}" ${status.ok?'':'disabled'} title="${escapeText(status.reasons.join('; '))}"><img src="${assetUrl('weapon/'+type)}" alt=""><b>${rule.label}</b><small>${signature?'SIGNATURE · ':''}${status.ok?'Ready':status.reasons.join(' · ')}</small></button>`;}).join('')}</div><p class="art-pending">Baked weapon art is never double-rendered. A different weapon on a baked body stays blocked until a weapon-free rig is supplied. Bare hands use an explicitly labelled proxy where needed.</p><button id="weaponDone" class="primary">Done</button>`);
 bindClose(closeModal);$('weaponDone').onclick=closeModal;
 $('modalPanel').querySelectorAll('[data-equip-weapon]').forEach(b=>b.onclick=()=>{const type=b.dataset.equipWeapon==='unarmed'?null:b.dataset.equipWeapon;if(equipWeapon(save,id,type)){persist();if(page==='heroes')renderHeroes();showWeaponLoadout(id);}});
}
let wardrobeSlot='hat';
function renderForge(){
 if(ascForgeTab!=='outfits'){renderForgeLegacy();return;}
 const hero=heroById(ascForgeHero||save.hero);
 $('forgeTabs').innerHTML=[['outfits','Wardrobe'],['skills','Skills'],['fusion','Fusion']].map(([id,title])=>`<button data-forge-tab="${id}" class="${ascForgeTab===id?'selected':''}">${title}</button>`).join('');
 $('forgeTabs').querySelectorAll('button').forEach(b=>b.onclick=()=>{ascForgeTab=b.dataset.forgeTab;renderForge();});
 $('forgeContent').innerHTML=`<aside class="forge-preview pixel-preview"><canvas id="wardrobeHero" width="320" height="370"></canvas><h3>${hero.name}</h3><p>${escapeText(loadoutDescription(hero.id))}</p><button class="secondary" id="shopWeapon">Weapons / unarmed</button><small>Cosmetics never change ratings, eligibility or damage.</small></aside><div class="forge-catalog">${forgeHeroCarousel(hero)}<div class="wardrobe-tabs" role="group" aria-label="Independent cosmetic slots">${WARDROBE_SLOTS.map(slot=>`<button data-wardrobe-slot="${slot}" class="${slot===wardrobeSlot?'selected':''}">${WARDROBE_LABELS[slot]}</button>`).join('')}</div><section class="piece-catalog"><article class="piece-card selected">${icon(wardrobeSlot==='weaponSkin'?'sword':'palette')}<h4>Original ${WARDROBE_LABELS[wardrobeSlot].toLowerCase()}</h4><p>No independent replacement selected.</p><button id="clearPiece" class="primary">Use original</button></article><article class="piece-card art-pending">${icon('lock')}<h4>New pieces need art</h4><p>${wardrobeSlot==='weaponSkin'?'Class-matched weapon skin PNG + grip metadata.':'Frame-aligned '+WARDROBE_LABELS[wardrobeSlot].toLowerCase()+' layers and a clean, modular hero base.'}</p><button disabled>Not for sale · art pending</button></article></section><p class="shop-policy">Six independent slots expand future cosmetic inventory. No item is sold before its art is ready. Current prices and earned-coin rewards are unchanged.</p><details class="legacy-looks"><summary>Existing whole looks & trail collection</summary><p>Legacy purchases are retained. New whole-outfit sales are retired; these are not independent clothing pieces.</p><div class="legacy-outfits">${ASC_OUTFITS.map(o=>{const owned=o.cost===0||save.ascension.ownedOutfits.includes(hero.id+':'+o.id);return `<button data-legacy-look="${o.id}" ${owned?'':'disabled'} class="${save.ascension.outfits[hero.id]===o.id?'selected':''}"><img src="${ascOutfitUrl(hero.id,o.id)}" alt=""><b>${o.name}</b><small>${owned?'Use legacy look':'Sale retired'}</small></button>`;}).join('')}</div><div class="trails">${TRAILS.map(t=>`<button class="trail-button ${save.trail===t.id?'active':''}" data-atelier-trail="${t.id}"><i style="background:${t.color};color:${t.color}"></i><small>${t.name} · ${save.ownedTrails.includes(t.id)?'Owned':t.cost+' coins'}</small></button>`).join('')}</div></details></div>`;
 bindForgeCarousel(hero);
 paintPortrait($('wardrobeHero'),hero.id,true,localHeroLoadout(hero.id));
 $('shopWeapon').onclick=()=>showWeaponLoadout(hero.id);
 $('forgeContent').querySelectorAll('[data-wardrobe-slot]').forEach(b=>b.onclick=()=>{wardrobeSlot=b.dataset.wardrobeSlot;renderForge();});
 $('clearPiece').onclick=()=>{if(equipWardrobe(save,hero.id,wardrobeSlot,null,ASSET_CONFIG)){persist();renderForge();}};
 $('forgeContent').querySelectorAll('[data-legacy-look]').forEach(b=>b.onclick=()=>{if(ascBuyOutfit(save,hero.id,b.dataset.legacyLook)){persist();renderForge();}});
 $('forgeContent').querySelectorAll('[data-atelier-trail]').forEach(b=>b.onclick=()=>{
  const t=TRAILS.find(v=>v.id===b.dataset.atelierTrail);
  const apply=()=>{if(unlockTrail(save,t.id)){renderer.trail=save.trail;persist();closeModal();renderForge();}else toast('Not enough earned coins.');};
  if(save.ownedTrails.includes(t.id)){apply();return;}
  openModal('trail-purchase',`${header(t.name,'COSMETIC TRAIL')}<p>Unlock ${escapeText(t.name)} for <b>${t.cost} earned coins</b>. This changes appearance only.</p><button id="confirmTrail" class="primary">Confirm · ${t.cost} coins</button><button id="cancelTrail" class="secondary">Cancel</button>`);bindClose(closeModal);$('confirmTrail').onclick=apply;$('cancelTrail').onclick=closeModal;
 });
}
function renderRecords(){
 renderRecordsDashboardBase();
 const root=$('recordContent'),dashboard=root.querySelector('.record-dashboard');
 if(!dashboard)return;
 dashboard.classList.add('pixel-records');
 const filters=dashboard.querySelector('.dashboard-filters'),detail=dashboard.querySelector('.dashboard-detail'),list=dashboard.querySelector('.dashboard-list');
 const note=filters.querySelector('p');if(note)detail.prepend(note);
 dashboard.replaceChildren(filters,detail,list);
 const hdr=document.createElement('div');hdr.className='rank-table-head';hdr.innerHTML='<b>RANK</b><b>EXPLORER</b><b>TIME / SCORE</b>';list.querySelector('h3').after(hdr);
}
function renderProfile(){
 renderProfileDashboardBase();const root=$('profileContent');root.classList.add('pixel-profile');
 const head=root.querySelector('.premium-profile-header'),nav=root.querySelector('.profile-tabs'),body=root.querySelector('.profile-tab-body');
 root.replaceChildren(nav,head,body);
 const edit=document.createElement('button');edit.className='secondary';edit.textContent='Edit profile';edit.onclick=()=>{profileTab='Cosmetics';renderProfile();};head.append(edit);
 if(profileTab==='Overview'){
  const progression=document.createElement('section');progression.className='profile-progress-panel';progression.innerHTML=`<span class="detail-overline">STORY PROGRESS</span><h3>${save.maps.filter(m=>m.clear).length} / ${WORLDS.length} worlds complete</h3><progress value="${starsTotal(save)}" max="45"></progress><p>${starsTotal(save)} / 45 stars earned</p>`;body.prepend(progression);
  const achievements=document.createElement('section');achievements.className='profile-achievements';achievements.innerHTML=`<h3>Achievements</h3>${[['First Steps',save.maps.some(m=>m.clear),'medal-gold'],['Sovereign Slayer',Object.keys(save.bossRecords).length>0,'crown'],['Spirit Keeper',save.pets.length>0,'pets'],['Journey Seeker',save.claims.length>0,'trophy']].map(([name,done,ic])=>`<div class="${done?'earned':'unearned'}">${icon(ic)}<span>${name}</span><small>${done?'Earned':'Not earned'}</small></div>`).join('')}`;body.append(achievements);
 }
}
function showSettings(fromPause=false){
 showSettingsLegacy(fromPause);const panel=$('modalPanel');panel.classList.add('pixel-settings');
 const title=$('modalTitle');if(title)title.textContent='Your adventure. Your way.';
 const bools=['haptics','sound','music','sprint','motion','leftHanded'];
 panel.querySelectorAll('[data-setting]').forEach(b=>{if(bools.includes(b.dataset.setting)){const on=!!save.settings[b.dataset.setting];b.setAttribute('role','switch');b.setAttribute('aria-checked',String(on));b.querySelector('small').classList.add(on?'switch-on':'switch-off');}});
 for(const id of ['sfxVolume','musicVolume']){const input=$(id),old=input.oninput;const output=document.createElement('output');output.htmlFor=id;output.textContent=Math.round(+input.value*100)+'%';input.after(output);input.oninput=e=>{old?.(e);output.textContent=Math.round(+input.value*100)+'%';};}
 $('doneSettings').className='primary';
}
function initializeAtelier(){
 const subtitles={campaign:'Fifteen worlds. Every star has a story.',heroes:'Ten identities. Two signature skills each.',pets:'Rescue a companion. Choose when to call.',forge:'Independent style. Never an advantage.',missions:'Complete objectives. Claim earned rewards.',records:'Personal results. Comparable rules.',profile:'Your journey, your achievements.',bosses:'Fifteen sovereigns. Three difficulty tiers.'};
 for(const [id,text] of Object.entries(subtitles)){const heading=$('page-'+id)?.querySelector('.page-heading>div');if(heading&&!heading.querySelector('.page-subtitle')){const p=document.createElement('p');p.className='page-subtitle';p.textContent=text;heading.append(p);}}
 for(const [id,art] of Object.entries(CONTROL_ART)){const b=$(id);if(b){const node=b.querySelector('i');if(node)node.innerHTML=icon(art.icon);else b.insertAdjacentHTML('afterbegin',icon(art.icon));b.querySelectorAll('span').forEach(s=>s.textContent='');b.setAttribute('aria-label',art.ariaLabel);b.dataset.icon=art.icon;}}
 if($('goldPlus'))$('goldPlus').onclick=()=>{click();showPage('forge');};
 if($('starPlus'))$('starPlus').onclick=()=>{click();showPage('campaign');};
 // Mode cards are reordered, not re-created, so their existing handlers survive.
 const actions=document.querySelector('.home-actions'),boss=$('bossHuntButton'),raid=$('nearbyButton'),endless=$('endlessButton');
 const duo=document.createElement('div');duo.className='home-duo';duo.append(raid,endless);actions.querySelector('.home-combat-row')?.remove();actions.insertBefore(boss,$('dailyButton'));actions.insertBefore(duo,$('dailyButton'));
 $('homeLoadout').textContent=loadoutDescription(save.hero);
 document.documentElement.dataset.uiRevision='local-atelier-1';
}
initializeAtelier();

function questThumbnail(stat,fallback){return ({coins:'quest-coins',kills:'quest-monster',skills:'quest-power',powers:'quest-potion',stars:'quest-shrine',clears:'flag',unique:'compass',endlessStage:'clock'})[stat]||fallback;}
