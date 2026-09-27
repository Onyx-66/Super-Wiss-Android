"""Production bundle UI tests. Test-only storage/hooks and in-memory transport are NOT shipped.
These are Chromium checks, not Android installation, WebView or Bluetooth-radio tests.
"""
import json,re,os
from pathlib import Path
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parents[1]
html=(R/'dist/Super-Wiss-Odyssey.html').read_text()
assert '__TEST' not in html
m=re.search(r'let storage;[\s\S]+?(?=const loaded\b)',html)
assert m
ht=html[:m.start()]+"let storage={data:{},getItem(k){return this.data[k]||null},setItem(k,v){this.data[k]=String(v)}};\n"+html[m.end():]
hook='''window.__TEST={get run(){return run},get save(){return save},get paused(){return paused},get modal(){return modalType},get audio(){return audio},get analog(){return analog},get pointers(){return pointers.size},get assets(){return ASSET_CONFIG},get nearby(){return nearby},get editor(){return ascEditor},get storage(){return storage},assetsReady,assetImage,assetLoadState,startRun,leaveRun,showPage,showResult,showSettings,applySettings,updateHud,renderProfile,renderBosses,showNearby,clearInput,readInput,ascOpenEditor,ascUsePreset,ascCameraLab,renderForge,ascHeroSkills,recordRun,persist,stepRun,activateCompanion,sanitizeSave,renderNearbyModal,closeModal,practicePet(id){practicePet=id},setHero(id){save.hero=id},quiet(){run.player.invincible=100;run.boss.state='intro';run.boss.clock=100;hintUntil=0;stageUntil=0;},setDevices(d){nearbyDevices=d;renderNearbyModal();}};'''
ht=ht.replace('\n})();','\n'+hook+'\n})();')
assert ht.count('window.__TEST=')==1
results=[];errors=[]
def check(n,v):
 if not v:raise AssertionError(n)
 results.append({'name':n,'pass':True});print('PASS',n,flush=True)
def ctr(p,id):
 b=p.locator('#'+id).bounding_box();assert b,id
 return {'x':b['x']+b['width']/2,'y':b['y']+b['height']/2}
def boot(p,text=ht):
 p.on('pageerror',lambda e:errors.append(str(e)))
 p.set_content(text,wait_until='domcontentloaded',timeout=30000);p.evaluate('__TEST.assetsReady');p.wait_for_timeout(200)
 p.click('#bootEnter');p.wait_for_timeout(150)
def tap(p,id):
 p.click('#'+id);p.wait_for_timeout(90)
def shot(p,name):p.screenshot(path=str(R/'docs'/('ascension-'+name+'.png')))
mock='''window.__outbox=[];window.__copied='';window.WissNative={capabilities:()=>'{"bluetooth":true,"protocol":5}',send:(peer,payload)=>window.__outbox.push({peer,payload}),stop(){},host(){},devices(){},requestBluetooth(){},join(){},setApiOrigin(){},share(){},haptic(){},kick(){},copy(v){window.__copied=v},openBluetoothSettings(){}};'''
with sync_playwright() as pw:
 browser=pw.chromium.launch(executable_path=os.environ.get('CHROMIUM','/usr/bin/chromium'),headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
 ctx=browser.new_context(viewport={'width':844,'height':390},has_touch=True,is_mobile=True,device_scale_factor=1)
 p=ctx.new_page();p.set_default_timeout(6000)
 p.on('pageerror',lambda e:errors.append(str(e)))
 p.set_content(ht,wait_until='domcontentloaded',timeout=30000);p.evaluate('__TEST.assetsReady');p.wait_for_timeout(250)
 check('actual loading screen waits for all 270 image assets',p.evaluate('__TEST.assetLoadState.done===270&&__TEST.assetLoadState.failed===0') and p.locator('#bootEnter').is_visible())
 shot(p,'loading');tap(p,'bootEnter')
 check('fresh guest starts without fabricated gold or ranks',p.evaluate('__TEST.save.gold===0&&__TEST.save.ascension.records.length===0'))
 check('all 270 registered images decoded',p.evaluate('Object.keys(__TEST.assets.images).every(k=>__TEST.assetImage(k).naturalWidth>0)'))
 check('community backgrounds and animated water registered',p.evaluate("!!__TEST.assets.images['environment/starry-sky']&&__TEST.assets.images['environment/water'].frames===4"))
 check('home hero label has no black or translucent panel',p.evaluate("getComputedStyle(document.querySelector('.hero-label')).backgroundColor==='rgba(0, 0, 0, 0)'"))
 p.set_viewport_size({'width':960,'height':540});p.wait_for_timeout(120);shot(p,'home')
 p.click('[data-page="heroes"]');check('ten hero cards selectable',p.locator('[data-hero]').count()==10)
 for h in ['rayan','mira']:
  p.click('[data-hero="'+h+'"]');check(h+' has visible lore and two skills',len(p.locator('.hero-lore').inner_text())>80 and 'skill' in p.locator('#heroDetails').inner_text().lower())
 shot(p,'heroes')
 p.click('[data-page="pets"]');check('nine pet cards include both fusions',p.locator('[data-asc-pet]').count()==9)
 p.click('[data-asc-pet="dragon"]');check('dragon panel explicitly exposes 10s time limit, soul and calls','10s' in p.locator('#petDetails').inner_text() and '80' in p.locator('#petDetails').inner_text())
 shot(p,'pets');p.click('[data-asc-pet="orca"]');check('orca abilities end with its 12s summon','12s' in p.locator('#petDetails').inner_text() and 'Ends when the summon expires' in p.locator('#petDetails').inner_text())
 p.click('[data-page="forge"]');check('three outfit color variants shown',p.locator('[data-outfit]').count()==3)
 check('paid outfit disabled with no currency',p.locator('[data-outfit="ember"]').is_disabled())
 p.click('[data-outfit="frost"]');check('free frost palette equips without spending',p.evaluate('__TEST.save.ascension.outfits["wissem"]==="frost"&&__TEST.save.gold===0'))
 # Isolated shop UI fixture: gold and rescued parents are NOT earned in a run here.
 p.evaluate('__TEST.save.gold=6000;__TEST.save.pets=["wolf","eagle","fox","turtle"];__TEST.renderForge()')
 p.click('[data-outfit="ember"]');check('outfit purchase costs exactly 800 once',p.evaluate('__TEST.save.gold===5200'))
 p.click('[data-outfit="frost"]');p.click('[data-outfit="ember"]');check('owned outfit re-equip is free',p.evaluate('__TEST.save.gold===5200'))
 p.click('[data-forge-tab="skills"]');check('twenty native skills have library entries',p.locator('.library-card').count()==20)
 p.click('[data-learn="chrono"]');check('borrowed skill book costs 350',p.evaluate('__TEST.save.gold===4850'))
 p.click('[data-equip="chrono"][data-slot="1"]');check('borrowed skill equips in second slot',p.evaluate('__TEST.ascHeroSkills(__TEST.save.ascension,"wissem")[1].id==="chrono"'))
 p.click('[data-forge-tab="fusion"]');check('three skill recipes and two pet recipes present',p.locator('[data-fuse-skill]').count()==3 and p.locator('[data-fuse-pet]').count()==2)
 p.click('[data-fuse-pet="skywolf"]');check('pet fusion preserves both rescued parents',p.evaluate('["skywolf","wolf","eagle"].every(p=>__TEST.save.pets.includes(p))&&__TEST.save.gold===3650'))
 p.click('[data-fuse-skill="gravity-storm"]');check('fixed skill fusion unlocks for declared price',p.evaluate('__TEST.save.ascension.fusions.includes("gravity-storm")&&__TEST.save.gold===2050'))
 shot(p,'fusion');p.click('[data-forge-tab="outfits"]');shot(p,'forge')
 # Control editor: real pointer drag plus individual size/opacity/coordinate inputs.
 tap(p,'settingsButton');tap(p,'openControlStudio')
 check('control studio has four independent saved slots',p.locator('[data-edit-slot]').count()==4)
 target=p.locator('[data-handle="jumpControl"]');b=target.bounding_box();p.mouse.move(b['x']+b['width']/2,b['y']+b['height']/2);p.mouse.down();p.mouse.move(690,330,steps=8);p.mouse.up()
 check('drag modifies edit buffer not live save',p.evaluate('Math.abs(__TEST.editor.buffer.buttons.jumpControl.x-690/innerWidth)<.01&&__TEST.save.controlPresets[0].buttons.jumpControl.x>.9'))
 p.locator('#editorSize').fill('96');p.locator('#editorSize').dispatch_event('input');p.locator('#editorOpacity').fill('55');p.locator('#editorOpacity').dispatch_event('input')
 p.select_option('#editorSelect','pauseButton');p.locator('#editorX').fill('15');p.locator('#editorX').dispatch_event('input');check('covered pause button can be positioned with explicit X/Y',p.evaluate('__TEST.editor.buffer.buttons.pauseButton.x===.15'))
 shot(p,'controls');tap(p,'editorSave');check('preset 1 persists position size and opacity',p.evaluate('__TEST.save.controlPresets[0].buttons.jumpControl.size===96&&__TEST.save.controlPresets[0].buttons.jumpControl.opacity===.55'))
 for slot in [1,2,3]:
  tap(p,'openControlStudio');p.click('[data-edit-slot="'+str(slot)+'"]');p.select_option('#editorSelect','jumpControl');p.locator('#editorSize').fill(str(80+slot));p.locator('#editorSize').dispatch_event('input');tap(p,'editorSave');check('preset '+str(slot+1)+' saved independently',p.evaluate(f'__TEST.save.controlActive==={slot}&&__TEST.save.controlPresets[{slot}].buttons.jumpControl.size==={80+slot}'))
 tap(p,'openControlStudio');p.locator('#editorSize').fill('130');p.locator('#editorSize').dispatch_event('input');tap(p,'editorCancel');check('cancel discards buffered control edits',p.evaluate('__TEST.save.controlPresets[3].buttons.jumpControl.size===83'))
 p.click('[data-layout="0"]');tap(p,'doneSettings')
 p.evaluate('__TEST.save.hero="wissem";__TEST.save.ascension.skills={};__TEST.save.pet=null;__TEST.save.settings.leftHanded=false;__TEST.save.controlPresets=__TEST.sanitizeSave({}).controlPresets;__TEST.ascUsePreset(0);__TEST.showPage("home")')
 tap(p,'bossHuntButton');check('all fifteen bosses still available',p.locator('[data-boss]').count()==15)
 p.click('[data-boss-tier="veteran"]');p.click('[data-boss="0"]')
 if p.locator('#guideDone').is_visible():tap(p,'guideDone')
 p.wait_for_timeout(200);p.evaluate('__TEST.quiet()')
 check('actual boss simulation and stagger bar active',p.evaluate('__TEST.run.bossTrial&&__TEST.run.boss.active') and p.locator('#bossStagger').count()==1)
 check('provided skill art actually appears on both gameplay buttons',p.locator('#skillIcon img').count()==1 and p.locator('#skillIcon2 img').count()==1)
 check('analog active and arrows hidden by default',p.locator('#analogControl').is_visible() and not p.locator('#leftControl').is_visible())
 cdp=ctx.new_cdp_session(p);a=ctr(p,'analogControl');a['x']+=40;j=ctr(p,'jumpControl');x=p.evaluate('__TEST.run.player.x')
 cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[dict(a,id=1),dict(j,id=2)]});p.wait_for_timeout(250)
 check('real simultaneous analog and jump touch moves and lifts',p.evaluate(f'__TEST.run.player.x>{x+15}&&__TEST.run.player.y<420'))
 check('stick reads proportional deflection',p.evaluate('__TEST.analog.axis>.45'))
 cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});p.wait_for_timeout(50)
 check('touch release clears movement captures',p.evaluate('__TEST.analog.axis===0&&__TEST.analog.pointer===null&&__TEST.pointers===0'))
 before=p.evaluate('__TEST.run.player.knives');tap(p,'knifeControl');check('knife touch spends ammunition',p.evaluate(f'__TEST.run.player.knives==={before-1}'))
 tap(p,'attackControl');check('strike spends stamina and starts actual swing',p.evaluate('__TEST.run.player.attackSerial>0&&__TEST.run.player.stamina<100'))
 tap(p,'dodgeControl');check('dodge button starts recharge',p.evaluate('__TEST.run.player.dodgeCD>0'))
 tap(p,'skillControl');check('Gravity focus cost and cooldown applied',p.evaluate('__TEST.run.player.cooldown>0&&__TEST.run.player.focus<80'))
 p.wait_for_timeout(650);tap(p,'skillControl2');check('Bomba independent cooldown and focus cost applied',p.evaluate('__TEST.run.player.cooldown2>0&&__TEST.run.player.focus<55'))
 tap(p,'quickLayout');check('one tap applies next saved control preset',p.evaluate('__TEST.save.controlActive===1'))
 p.keyboard.press('Alt+4');check('keyboard shortcut applies fourth control preset',p.evaluate('__TEST.save.controlActive===3'))
 p.evaluate('__TEST.ascUsePreset(0)');tap(p,'pauseButton');clock=p.evaluate('__TEST.run.bossTime');p.wait_for_timeout(150);check('pause freezes actual boss clock',p.evaluate('__TEST.paused&&__TEST.run.bossTime')==clock)
 tap(p,'pauseSettings');p.click('[data-setting="controlMode"]');check('settings switches analog to arrows',p.locator('#leftControl').is_visible() and not p.locator('#analogControl').is_visible())
 p.click('[data-setting="controlMode"]');p.click('[data-setting="leftHanded"]');check('global mirrored setting moves stick to right',p.locator('#analogControl').bounding_box()['x']>600)
 p.click('[data-setting="leftHanded"]');tap(p,'doneSettings');tap(p,'resumeButton');p.evaluate('window.dispatchEvent(new Event("native-pause"))');check('native pause adapter releases input and pauses solo',p.evaluate('__TEST.paused&&__TEST.analog.axis===0'))
 p.evaluate('__TEST.leaveRun();__TEST.save.pet="wolf";__TEST.startRun(0,"boss");__TEST.quiet()')
 check('equipped wolf starts dormant',p.evaluate('__TEST.run.player.petTime===0'))
 tap(p,'summonControl');check('call button spends one pet call and starts 12 second timer',p.evaluate('__TEST.run.player.petTime>11&&__TEST.run.player.companionCharges===2&&__TEST.run.player.soul===35'))
 tap(p,'summonControl');check('repeat summon press cannot consume another call',p.evaluate('__TEST.run.player.companionCharges===2'))
 p.evaluate('for(let i=0;i<750;i++)__TEST.stepRun(__TEST.run,{},1/60)');p.wait_for_timeout(100)
 check('pet expires in game simulation and cannot be immediately recalled',p.evaluate('__TEST.run.player.petTime===0&&__TEST.run.player.companionCooldown>40'))
 p.evaluate('__TEST.leaveRun();__TEST.save.pet="dragon";__TEST.startRun(0,"boss");__TEST.quiet();__TEST.run.player.soul=100')
 tap(p,'summonControl');tap(p,'petControl');check('dragon manual active starts only within its call window',p.evaluate('__TEST.run.player.petTime>9&&__TEST.run.player.breath>0&&__TEST.run.player.breath<=__TEST.run.player.petTime+.1'))
 p.evaluate('for(let i=0;i<660;i++)__TEST.stepRun(__TEST.run,{},1/60)');check('dragon scales and bonus end on summon expiry',p.evaluate('__TEST.run.player.scales===0&&__TEST.run.player.breath===0'))
 p.evaluate('__TEST.leaveRun();__TEST.save.pet=null;__TEST.showPage("records")');check('ranking categories and tiebreaks visibly explained','Fastest adjusted clear' in p.locator('#recordContent').inner_text() and p.locator('#rankCategory').count()==1)
 p.select_option('#rankMode','endless');check('endless records rank by score and disable world filter','Highest score wins' in p.locator('#recordContent').inner_text() and p.locator('#rankWorld').is_disabled());shot(p,'records')
 p.evaluate('__TEST.ascCameraLab()');tap(p,'cameraStart');check('camera lab uses real practice run with reward exclusion',p.evaluate('__TEST.run.cameraExperiment&&__TEST.run.mode==="practice"'))
 p.wait_for_timeout(400);shot(p,'camera-lab');p.evaluate('__TEST.leaveRun()')
 for w,h in [(640,360),(844,390),(960,540),(1280,720)]:
  p.set_viewport_size({'width':w,'height':h});p.evaluate('__TEST.ascUsePreset(0);__TEST.save.pet="orca";__TEST.startRun(0,"boss");__TEST.quiet()');p.wait_for_timeout(140)
  check(f'{w}x{h}: action and pet buttons all in bounds and at least 44px',p.evaluate("['jumpControl','attackControl','knifeControl','dodgeControl','skillControl','skillControl2','summonControl','petControl','petControl2','pauseButton'].every(id=>{let b=document.getElementById(id).getBoundingClientRect();return b.width>=43.9&&b.height>=43.9&&b.x>=0&&b.right<=innerWidth+1&&b.y>=0&&b.bottom<=innerHeight+1})"))
  p.evaluate('__TEST.leaveRun();__TEST.showPage("home")');check(f'{w}x{h}: main home actions available above navigation',p.evaluate("['continueButton','bossHuntButton','nearbyButton'].every(id=>{let e=document.getElementById(id);if(!e)return false;let b=e.getBoundingClientRect();return b.y>=0&&b.bottom<innerHeight-35&&b.right<=innerWidth})"))
 p.set_viewport_size({'width':844,'height':390});p.evaluate('__TEST.save.pet=null;__TEST.startRun(0,"boss");__TEST.run.player.invincible=100');p.wait_for_timeout(2350);shot(p,'boss')
 p.evaluate('__TEST.audio.unlock()');p.evaluate('Promise.all(Object.keys(__TEST.assets.audio).map(k=>__TEST.audio.load(k)))');check('all 47 existing audio cues and music files decode',p.evaluate('__TEST.audio.buffers.size===47'))
 p.evaluate('__TEST.leaveRun();__TEST.practicePet(null);__TEST.startRun(0,"practice");__TEST.run.player.invincible=0');p.wait_for_timeout(2300);shot(p,'gameplay')
 p.evaluate('__TEST.leaveRun();__TEST.showPage("profile")');check('profile offers ten roster avatars',p.locator('[data-avatar]').count()==10)
 tap(p,'accountLogin');check('no fake login when server unconfigured','included account backend' in p.locator('#modalPanel').inner_text());tap(p,'closeModal')
 p.evaluate('__TEST.showNearby()');check('browser explicitly separates native Bluetooth','not this browser preview' in p.locator('#modalPanel').inner_text());tap(p,'closeModal')
 check('no runtime errors through menus, inputs, summons, audio, camera',not errors)
 # Two separately rendered browser clients. Real protocol, mocked radio boundary.
 pages=[]
 for name in ['host','slot1']:
  q=browser.new_page(viewport={'width':844,'height':390});q.set_default_timeout(6000);boot(q,ht.replace('(()=>{\n"use strict";',mock+'\n(()=>{\n"use strict";'));q.evaluate('__TEST.showNearby()');pages.append(q)
 host,guest=pages;tap(host,'hostNearby');code=host.evaluate('__TEST.nearby.roomCode')
 check('native lobby generates exactly six digits',bool(re.fullmatch(r'\d{6}',code)))
 check('host cannot start without second admitted player',host.locator('#startNearby').is_disabled())
 tap(host,'roomCopy');check('copy code button calls native bridge with exact code',host.evaluate('window.__copied')==code)
 guest.evaluate('__TEST.setDevices([{name:"Test host",address:"AA:BB:CC:DD:EE:FF"}])');guest.fill('#joinSix',code);guest.click('[data-device]');host.evaluate("__TEST.nearby.connected('slot1')");guest.evaluate("__TEST.nearby.connected('host')")
 def flush():
  for i,q in enumerate(pages):
   for msg in q.evaluate('window.__outbox.splice(0)'):
    pages[1-i].evaluate('(v)=>window.dispatchEvent(new CustomEvent("sw-native",{detail:v}))',{'type':'message','peer':'host' if i==0 else 'slot1','payload':msg['payload']})
 for _ in range(3):flush()
 check('code-admitted clients see same room and two-player roster',host.evaluate('__TEST.nearby.roster.length')==2 and guest.evaluate('__TEST.nearby.roster.length')==2 and guest.evaluate('__TEST.nearby.roomCode')==code)
 host.select_option('#nearDifficulty','veteran');flush();tap(guest,'readyNearby');flush();check('guest ready enables host raid start',host.locator('#startNearby').is_enabled())
 shot(host,'raid-lobby');tap(host,'startNearby');flush()
 for _ in range(45):host.wait_for_timeout(75);flush()
 check('two-client raid starts same scaled boss HP',host.evaluate('__TEST.run.boss.maxHp')==guest.evaluate('__TEST.run.boss.maxHp') and host.evaluate('__TEST.run.boss.maxHp>40'))
 check('both raid clients see teammate and hero abilities',host.evaluate('__TEST.run.remotePlayers.length')==1 and guest.evaluate('__TEST.run.remotePlayers.length')==1 and guest.locator('#skillControl').is_visible())
 check('raid without an equipped pet never exposes an empty portrait',not host.locator('#petDock').is_visible() and not guest.locator('#petDock').is_visible())
 check('visible raid image elements all have decoded artwork',all(q.evaluate("Array.from(document.images).filter(i=>i.getClientRects().length&&getComputedStyle(i).visibility!=='hidden').every(i=>i.complete&&i.naturalWidth>0)") for q in [host,guest]))
 # Place boss intro in a presentation fixture so movement test is not defeated mid-input.
 host.evaluate("for(const p of __TEST.nearby.match.players){p.run.player.invincible=100;}__TEST.nearby.match.sharedBoss.state='intro';__TEST.nearby.match.sharedBoss.clock=100")
 x=guest.evaluate('__TEST.run.player.x');guest.keyboard.down('KeyD')
 for _ in range(9):host.wait_for_timeout(60);flush()
 guest.keyboard.up('KeyD');flush();check('guest movement reaches authoritative host simulation',guest.evaluate(f'__TEST.run.player.x>{x+15}'))
 shot(host,'raid')
 # Host fixture causes a down; recovery still uses real hold input across client protocol.
 host.evaluate("let a=__TEST.nearby.match.players[0],b=__TEST.nearby.match.players[1];a.run.failed=true;a.run.player.hp=0;a.run.player.x=240;a.run.player.y=420;a.run.player.vx=0;a.downTime=0;b.run.player.x=270;b.run.player.y=420;b.run.player.vx=0;")
 for _ in range(4):host.wait_for_timeout(70);flush()
 check('downed teammate enables revive control on guest',guest.locator('#interactControl').is_visible())
 guest.keyboard.down('KeyH')
 for _ in range(55):host.wait_for_timeout(70);flush()
 guest.keyboard.up('KeyH');flush()
 check('three-second held revive restores ally and spends shared pool',host.evaluate('__TEST.nearby.match.players[0].run.failed===false&&__TEST.nearby.match.revivePool===1&&__TEST.nearby.match.players[1].revives===1'))
 # Force boss defeat solely to exercise the result screen; not an ordinary-input clear.
 host.evaluate('__TEST.nearby.match.sharedBoss.defeated=true;__TEST.nearby.match.sharedBoss.alive=false;__TEST.nearby.match.sharedBoss.hp=0')
 for _ in range(5):host.wait_for_timeout(80);flush()
 check('both clients show shared team clear rather than rival rankings','TEAM CLEAR' in host.locator('#modalPanel').inner_text() and 'TEAM CLEAR' in guest.locator('#modalPanel').inner_text())
 tap(host,'localRematch');flush();host.select_option('#nearMode','ffa');flush();tap(guest,'readyNearby');flush();tap(host,'startNearby');flush()
 for _ in range(45):host.wait_for_timeout(75);flush()
 check('FFA rematch disables pets and hero abilities for equal-stat rules',not guest.locator('#skillControl').is_visible() and not guest.locator('#summonControl').is_visible())
 check('no two-browser multiplayer runtime exceptions',not errors)
 # Production bundle smoke test with NO test hook and NO storage adapter.
 prod=browser.new_page(viewport={'width':844,'height':390});pe=[];prod.on('pageerror',lambda e:pe.append(str(e)));prod.set_content(html,wait_until='domcontentloaded',timeout=30000);prod.wait_for_selector('#bootEnter:not([hidden])');prod.click('#bootEnter');prod.wait_for_timeout(250)
 check('unmodified production HTML boots with no private test API',not pe and prod.evaluate('typeof window.__TEST==="undefined"') and prod.locator('#page-home').is_visible())
 browser.close()
(R/'docs/ascension-browser.json').write_text(json.dumps({'checks':results,'count':len(results),'errors':errors,'environment':'Chromium, mobile emulation; in-memory storage and paired transport in test copies only. NOT Android or Bluetooth radio tests.'},indent=2))
print('PASS',len(results),'Chromium checks')
