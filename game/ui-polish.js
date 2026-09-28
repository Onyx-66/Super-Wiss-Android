/* UI precision pass. Source artwork stays separate from layout and real save data.
   Rules: agent-skills/pixel-art-page-layout-system/SKILL.md and mobile-pixel-art-ui-ux/SKILL.md. */
const POLISH_ROLES={wissem:'bolt',kossay:'sword',yakine:'star',taky:'moon',garsi:'shield-halved',tounsi:'wind',youssef:'gear',loey:'bow',rayan:'sun',mira:'snowflake'};
const POLISH_SCENES={wissem:0,kossay:1,yakine:9,taky:11,garsi:2,tounsi:3,youssef:6,loey:4,rayan:13,mira:5};
function polishDivider(parent,after){
 if(!parent)return;const rule=document.createElement('span');rule.className='ornament-divider';rule.setAttribute('aria-hidden','true');
 if(after)after.after(rule);else parent.append(rule);return rule;
}
function polishFrame(el){if(!el)return;el.classList.add('precision-panel');el.dataset.borderComponent='panel-shell';}
function polishFrames(root=document){root.querySelectorAll('.map-details,.hero-details,.pet-details,.forge-preview,.forge-catalog,.dashboard-detail,.dashboard-list,.premium-profile-header,.profile-progress-panel,.profile-achievements,.modal-panel,.skill-forge,.fusion-catalog,.quest-card,.piece-card,.library-card,.fusion-card,.pet-skill,.pixel-skills article').forEach(polishFrame);}
function polishReferenceNote(canvas,parent){
 if(canvas?.dataset.portraitMode!=='identity-reference')return;
 const note=document.createElement('small');note.className='identity-reference-note';note.textContent='Identity portrait · unarmed combat art pending';parent.append(note);
}
function polishScene(el,world){el.style.setProperty('--scene',`url("${assetUrl('map/'+world)}")`);}
const polishHeroesBase=renderHeroes;
renderHeroes=function(){
 polishHeroesBase();const h=heroById(selectedHero);
 $('heroGrid').querySelectorAll('.hero-card').forEach(card=>{
  const id=card.dataset.hero,art=card.querySelector('canvas');polishFrame(card);polishScene(card,POLISH_SCENES[id]);card.style.setProperty('--roster-scene',`url("${assetUrl('background/cosmic')}")`);
  const badge=document.createElement('span');badge.className='class-badge';badge.innerHTML=icon(POLISH_ROLES[id]);badge.setAttribute('aria-hidden','true');card.prepend(badge);
  const label=document.createElement('div');label.className='roster-caption';label.append(card.querySelector('strong'),card.querySelector('small'),card.querySelector('.hero-equipped'));card.append(label);
  polishReferenceNote(art,label);
 });
 const top=$('heroDetails').querySelector('.hero-detail-top');polishScene(top,POLISH_SCENES[h.id]);
 const detailText=top.querySelector('div');detailText?.insertAdjacentHTML('beforeend',`<p class="hero-quote">${escapeText(h.hint||h.role)}</p>`);
 polishReferenceNote($('detailHero'),$('heroDetails'));
 polishDivider($('heroDetails'),top);polishFrames($('page-heroes'));
 const detail=$('heroDetails'),scroll=document.createElement('div'),actions=document.createElement('div');scroll.className='hero-detail-scroll';actions.className='hero-detail-actions';
 const equip=detail.querySelector('#equipHero'),links=detail.querySelector('.detail-buttons');actions.append(equip,links);while(detail.firstChild)scroll.append(detail.firstChild);detail.append(scroll,actions);
};
const polishMapsBase=renderMaps;
renderMaps=function(){
 polishMapsBase();const summary=$('mapDetails').querySelector('.map-summary'),art=$('selectedMapArt'),title=summary.querySelector('h3');
 title.after(art);polishDivider(summary,art);polishFrames($('page-campaign'));
 $('mapGrid').querySelectorAll('.map-card').forEach(c=>{polishFrame(c);const label=document.createElement('div');label.className='map-caption';label.append(c.querySelector('.map-name'),c.querySelector('.map-stars'));c.append(label);});
};
const polishPetsBase=renderPets;
renderPets=function(){
 polishPetsBase();$('petGrid').querySelectorAll('.pet-card').forEach((card,i)=>{polishFrame(card);polishScene(card,Math.min(14,PETS[i].unlockWorld||0));card.prepend(card.querySelector('.pet-rarity'));});
 const detail=$('petDetails');polishDivider(detail,detail.querySelector('h3'));polishFrames($('page-pets'));
};
const polishForgeBase=renderForge;
renderForge=function(){
 polishForgeBase();polishFrames($('page-forge'));const canvas=$('wardrobeHero');
 if(canvas){const hero=heroById(ascForgeHero||save.hero);polishScene(canvas.parentElement,POLISH_SCENES[hero.id]);polishReferenceNote(canvas,canvas.parentElement);polishDivider(canvas.parentElement,canvas.parentElement.querySelector('h3'));}
 const carousel=$('forgeHeroCard');if(carousel)carousel.querySelector('img')?.setAttribute('alt',heroById(ascForgeHero||save.hero).name+' identity portrait');
};
const polishQuestsBase=renderQuests;
renderQuests=function(){
 polishQuestsBase();$('questList').querySelectorAll('.quest-card').forEach((card,i)=>{
  const head=card.querySelector('.quest-head'),title=head.querySelector('strong'),art=head.querySelector('.quest-icon');
  const text=document.createElement('div');text.className='quest-copy';text.append(title,card.querySelector('p'),card.querySelector('.quest-progress'),card.querySelector('.quest-foot'));
  const scene=document.createElement('div');scene.className='quest-scene';scene.append(art);polishScene(scene,[0,6,1,9,3,14,2,5,8][i%9]);
  card.replaceChildren(scene,text);polishDivider(text,title);polishFrame(card);
 });
};
const polishRecordsBase=renderRecords;
renderRecords=function(){polishRecordsBase();polishFrames($('page-records'));const d=$('recordContent').querySelector('.dashboard-detail');if(d)polishDivider(d,d.querySelector('h3'));};
const polishProfileBase=renderProfile;
renderProfile=function(){polishProfileBase();polishFrames($('page-profile'));const root=$('profileContent');root.querySelectorAll('.premium-stats article').forEach(a=>{a.classList.add('stat-line');});root.querySelectorAll('.premium-profile-header h3,.profile-progress-panel h3,.profile-achievements h3').forEach(h=>polishDivider(h.parentElement,h));};
const polishBossesBase=renderBosses;
renderBosses=function(){
 polishBossesBase();$('bossGrid').querySelectorAll('.boss-card').forEach((card,i)=>{
  const boss=BOSSES[i],image=card.querySelector('img');
  // The old boss thumbnail contains a giant procedural crown. Use its existing original enemy art,
  // then layer one supplied crown separately, rather than painting over the thumbnail.
  image.src=assetUrl('enemy/'+boss.sprite);image.alt=boss.name;const scene=document.createElement('div');scene.className='boss-scene';polishScene(scene,i);image.before(scene);scene.append(image);
  const crown=document.createElement('img');crown.className='boss-crown';crown.src=assetUrl('ui/icons/'+['crown-green','crown-silver','crown','crown-cyan','crown-red'][i%5]);crown.alt='';scene.append(crown);
  polishFrame(card);polishDivider(card,card.querySelector('strong'));
 });
};
const polishSettingsBase=showSettings;
showSettings=function(fromPause=false){
 polishSettingsBase(fromPause);const panel=$('modalPanel');panel.classList.add('precision-settings');$('modalTitle').textContent='Make yourself at home.';
 const header=panel.querySelector('.modal-header'),sub=document.createElement('p');sub.className='page-subtitle';sub.textContent='Fine-tune your adventure.';header.querySelector('div').append(sub);polishDivider(header.querySelector('div'),$('modalTitle'));
 const grid=panel.querySelector('.setting-grid');grid.className='precision-setting-columns';
 const groups=[['Controls',['controlMode','sprint','leftHanded','haptics','opacity']],['Adventure',['difficulty','blood','summonChoice','motion','quality','zoom']],['Audio',['sound','music']]];
 const nodes=new Map([...panel.querySelectorAll('[data-setting]')].map(n=>[n.dataset.setting,n]));
 grid.replaceChildren();for(const [label,keys] of groups){const section=document.createElement('section');section.className='settings-column';section.innerHTML=`<h3>${label}</h3>`;polishDivider(section);keys.forEach(k=>{if(nodes.has(k))section.append(nodes.get(k));});grid.append(section);}
 grid.lastElementChild.append(panel.querySelector('.volume-row'));
 panel.querySelectorAll('.volume-row label').forEach(label=>{const text=[...label.childNodes].find(n=>n.nodeType===3);if(text){const name=document.createElement('span');name.className='volume-label';name.textContent=text.textContent.trim();text.replaceWith(name);}});
 const extras=document.createElement('div');extras.className='settings-extras';[...panel.children].filter(el=>el.matches('button.secondary')).forEach(el=>extras.append(el));grid.firstElementChild.append(extras);
 $('openControlStudio').className='secondary';polishFrames(panel);polishFrame(panel);rasterizeHeadings(panel);
};
/* Native fonts are rasterized at half size, then nearest-neighbor scaled. No font file is bundled.
   This is a documented fallback, not a claim that the mockup's original typeface was recovered. */
function rasterizeHeadings(root=document){
 root.querySelectorAll('.page-heading h2,.modal-header h2').forEach(h=>{
  let label=h.dataset.displayText;if(!label){label=h.textContent.trim();h.dataset.displayText=label;}
  if(h.id==='modalTitle'){label=h.textContent.trim();h.dataset.displayText=label;}
  if(!h.querySelector('.heading-copy')){h.textContent='';const span=document.createElement('span');span.className='heading-copy';span.textContent=label;h.append(span);const canvas=document.createElement('canvas');canvas.className='pixel-headline';canvas.setAttribute('aria-hidden','true');h.append(canvas);}
  const canvas=h.querySelector('canvas'),span=h.querySelector('span');span.textContent=label;
  const css=getComputedStyle(h),size=parseFloat(css.fontSize),line=size*1.16;
  const width=Math.max(10,h.clientWidth);canvas.width=Math.ceil(width/2);canvas.height=Math.ceil(line/2);
  const ctx=canvas.getContext('2d');ctx.font=`900 ${size/2}px Georgia,serif`;ctx.textBaseline='top';
  let fontSize=size/2;if(ctx.measureText(label).width>canvas.width){fontSize*=canvas.width/ctx.measureText(label).width;ctx.font=`900 ${fontSize}px Georgia,serif`;}
  const gold=ctx.createLinearGradient(0,0,0,canvas.height);gold.addColorStop(0,'#fff7dd');gold.addColorStop(.48,'#f5efd8');gold.addColorStop(.52,'#edce7a');gold.addColorStop(1,'#d8a435');ctx.fillStyle=gold;ctx.fillText(label,0,0);
 });
}
function initializePolish(){
 document.documentElement.dataset.uiRevision='precision-1.4.1';
 const words={home:['ASCENSION · CHAPTER ONE','Your next adventure.','Brave the dark. Rise together.'],campaign:['THE ADVENTURE ATLAS','Choose your next leap.','Fifteen worlds. Every star has a story.'],heroes:['TEN HEROES. TWENTY SIGNATURE SKILLS.','Find your super.','Different paths. A brighter tomorrow.'],pets:['RESCUE. SUMMON. RECHARGE.','Better together.','A loyal companion. A shared adventure.'],forge:['STYLE WITHOUT LIMITS','The Astral Forge','Your hero. Your legend. Your style.'],missions:['MAKE EVERY RUN COUNT','Little goals. Legendary rewards.','Every step of the journey matters.'],records:['YOUR PERSONAL HALL OF FAME','Chase your own legend.','Personal records. Comparable rules.'],profile:['YOUR IDENTITY. YOUR ADVENTURE.','Your legend, so far.','Your journey, your achievements.'],bosses:['NO LONG RUN-UP. JUST THE FIGHT.','The Sovereign Trials','Fifteen sovereigns. Three difficulty tiers.']};
 for(const [id,[kicker,title,subtitle]] of Object.entries(words)){
  if(id==='home')continue;const head=$('page-'+id)?.querySelector('.page-heading>div');if(!head)continue;
  head.querySelector('.eyebrow').textContent=kicker;const h=head.querySelector('h2');h.textContent=title;polishDivider(head,h);head.querySelector('.page-subtitle').textContent=subtitle;
 }
 const home=document.querySelector('.home-title');const intro=document.createElement('div');intro.className='home-heading';intro.innerHTML='<span class="eyebrow">YOUR NEXT ADVENTURE</span><h2>Brave the dark.</h2><p class="page-subtitle">Rise together.</p>';home.querySelector('p')?.replaceWith(intro);polishDivider(intro,intro.querySelector('h2'));
 const tags=document.querySelector('.home-tags');if(tags){[...tags.children].forEach((tag,i)=>{tag.insertAdjacentHTML('afterbegin',icon(['worlds','heroes','pets'][i]));});}
 document.querySelectorAll('.bottom-nav button').forEach(b=>b.setAttribute('title',b.textContent.trim()));
 ['continueButton','bossHuntButton','nearbyButton','endlessButton','dailyButton'].forEach((id,i)=>{const el=$(id);if(el)polishScene(el,[0,9,2,11,1][i]);});
 // Paint source portraits only. Body/weapon null handling belongs in the combat renderer, not identity UI.
 polishFrames();rasterizeHeadings();
 new ResizeObserver(()=>requestAnimationFrame(()=>rasterizeHeadings())).observe($('menu'));
}
initializePolish();
const polishShowPageBase=showPage;
showPage=function(...args){polishShowPageBase(...args);requestAnimationFrame(()=>rasterizeHeadings(document.querySelector('.page.active')));};
