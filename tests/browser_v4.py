"""Chromium layout and real touch-input tests; not Android device or Bluetooth-radio tests."""
import json,re
from pathlib import Path
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parents[1];html=(R/'dist/Super-Wiss-Odyssey.html').read_text();assert '__TEST' not in html
m=re.search(r'let storage;[\s\S]+?(?=const loaded\b)',html)
htmltest=html[:m.start()]+"let storage={data:{},getItem(k){return this.data[k]||null},setItem(k,v){this.data[k]=String(v)}};\n"+html[m.end():]
hook='''window.__TEST={get run(){return run},get save(){return save},get paused(){return paused},get modal(){return modalType},get audio(){return audio},get analog(){return analog},get pointers(){return pointers.size},get assets(){return ASSET_CONFIG},get nearby(){return nearby},assetsReady,assetImage,startRun,leaveRun,showPage,showResult,showSettings,applySettings,updateHud,renderProfile,renderBosses,showNearby,clearInput,readInput};'''
htmltest=htmltest.replace('\n})();','\n'+hook+'\n})();')
results=[];errors=[]
def check(n,v):
 assert v,n
 results.append({'name':n,'pass':True});print('PASS',n,flush=True)
def center(page,id):
 b=page.locator('#'+id).bounding_box();return {'x':b['x']+b['width']/2,'y':b['y']+b['height']/2}
with sync_playwright() as pw:
 browser=pw.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
 context=browser.new_context(viewport={'width':844,'height':390},has_touch=True,is_mobile=True,device_scale_factor=1)
 page=context.new_page();page.set_default_timeout(5000);page.on('pageerror',lambda e:errors.append(str(e)));print('Loading test game',flush=True);page.set_content(htmltest,wait_until="domcontentloaded",timeout=30000);print('Waiting for assets',flush=True);page.evaluate('__TEST.assetsReady');page.wait_for_timeout(350)
 check('Nightfall lobby loads with no runtime error',not errors and page.locator('#page-home').is_visible())
 check('guest has no invented currency, rival records or online account',page.evaluate('__TEST.save.gold===0 && Object.keys(__TEST.save.bossRecords).length===0'))
 check('all bundled images decode',page.evaluate('Object.keys(__TEST.assets.images).every(k=>__TEST.assetImage(k).naturalWidth>0)'))
 check('eight actual hero animation sheets',page.evaluate(r'Object.keys(__TEST.assets.images).filter(k=>/^hero\/[a-z]+$/.test(k)&&__TEST.assets.images[k].frames===14).length===8'))
 check('all seven pets have multi-frame animation',page.evaluate(r'Object.keys(__TEST.assets.images).filter(k=>/^pet\/[a-z]+$/.test(k)&&__TEST.assets.images[k].frames===8).length===7'))
 page.screenshot(path=str(R/'docs/nightfall-lobby.png'))
 page.click('#bossHuntButton');check('Boss Hunt exposes all 15 bosses',page.locator('[data-boss]').count()==15)
 page.click('[data-boss-tier="inferno"]');check('tier selector is persistent next-run setting',page.evaluate('__TEST.save.settings.difficulty==="inferno"'))
 page.click('[data-boss-tier="nightmare"]');page.screenshot(path=str(R/'docs/nightfall-hunt.png'))
 page.click('[data-boss="0"]');check('new onboarding teaches focus, soul and exploration','focus' in page.locator('#modalPanel').inner_text().lower() and 'seal chambers' in page.locator('#modalPanel').inner_text())
 page.click('#guideDone');page.wait_for_timeout(500)
 check('Boss Hunt starts real combat simulation',page.evaluate('__TEST.run.bossTrial && __TEST.run.boss.active'))
 check('analog is default active',page.locator('#analogControl').is_visible() and not page.locator('#leftControl').is_visible())
 check('boss health and stamina/focus HUD visible',page.locator('#bossHUD').is_visible() and page.locator('#focusFill').is_visible())
 check('seven action buttons have 48px touch targets',page.evaluate("['jumpControl','attackControl','knifeControl','dodgeControl','skillControl','skillControl2','summonControl'].every(id=>{let b=document.getElementById(id).getBoundingClientRect();return b.width>=47.9&&b.height>=47.9})"))
 # Input-origin fixture near room start; these are input behavior checks, not a complete boss clear.
 page.evaluate('__TEST.run.player.invincible=100;__TEST.run.boss.state="intro";__TEST.run.boss.clock=100')
 cdp=context.new_cdp_session(page);a=center(page,'analogControl');a['x']+=35;j=center(page,'jumpControl');x=page.evaluate('__TEST.run.player.x')
 cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[dict(a,id=1),dict(j,id=2)]});page.wait_for_timeout(220)
 check('simultaneous analog and jump touch moves and lifts hero',page.evaluate(f'__TEST.run.player.x>{x+15}&&__TEST.run.player.y<420'))
 check('joystick tracks analog deflection',page.evaluate('__TEST.analog.axis>.5'))
 cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});page.wait_for_timeout(70)
 check('joystick release clears movement and captures',page.evaluate('__TEST.analog.axis===0&&__TEST.analog.pointer===null&&__TEST.pointers===0'))
 before=page.evaluate('__TEST.run.player.knives');page.click('#knifeControl');page.wait_for_timeout(80);check('knife button consumes actual ammunition',page.evaluate(f'__TEST.run.player.knives==={before-1}'))
 page.click('#attackControl');page.wait_for_timeout(70);check('melee button starts animation and spends stamina',page.evaluate('__TEST.run.player.attackSerial>0&&__TEST.run.player.stamina<100'))
 page.click('#dodgeControl');page.wait_for_timeout(50);check('dodge starts brief protected motion',page.evaluate('__TEST.run.player.dodgeCD>0'))
 page.click('#skillControl');page.wait_for_timeout(70);check('Gravity uses focus and starts its cooldown',page.evaluate('__TEST.run.player.gravity>0&&__TEST.run.player.focus<80'))
 # Skills cannot stack immediately; set only the presentation-frame budget to isolate resource controls.
 check('global skill lock is active',page.evaluate('__TEST.run.player.globalSkill>0'))
 page.wait_for_timeout(650);page.click('#skillControl2');page.wait_for_timeout(70);check('Bomba has independent cooldown and added focus cost',page.evaluate('__TEST.run.player.cooldown2>0&&__TEST.run.player.focus<55'))
 page.click('#summonControl');page.wait_for_timeout(60);check('summon button spends one charge and 60 soul',page.evaluate('__TEST.run.summon!==null&&__TEST.run.player.summonCharges===1&&__TEST.run.player.soul===10'))
 page.keyboard.press('KeyK');page.wait_for_timeout(60);check('keyboard knife control is wired',page.evaluate('__TEST.run.player.knives<12'))
 page.click('#pauseButton');t=page.evaluate('__TEST.run.bossTime');page.wait_for_timeout(150);check('solo pause freezes boss time',page.evaluate('__TEST.paused&&__TEST.run.bossTime')==t)
 page.click('#pauseSettings');page.click('[data-setting="controlMode"]');check('settings switches analog to arrows',page.locator('#leftControl').is_visible() and not page.locator('#analogControl').is_visible())
 page.click('[data-setting="blood"]');check('blood toggle changes renderer preference',page.evaluate('__TEST.save.settings.blood==="off"'))
 page.click('[data-setting="haptics"]');check('haptics can be disabled',page.evaluate('__TEST.save.settings.haptics===false'))
 page.click('[data-setting="controlMode"]');page.click('[data-setting="leftHanded"]');check('analog and action cluster can be mirrored',page.locator('#analogControl').bounding_box()['x']>600)
 page.click('[data-setting="leftHanded"]');page.click('#doneSettings');page.click('#resumeButton');page.wait_for_timeout(40)
 page.evaluate('window.dispatchEvent(new Event("native-pause"))');check('native lifecycle event pauses solo and clears input',page.evaluate('__TEST.paused&&__TEST.analog.axis===0'))
 page.evaluate('__TEST.leaveRun();__TEST.showPage("profile")');check('guest profile editor offers eight avatars',page.locator('[data-avatar]').count()==8)
 page.fill('#editName','Kossay');page.select_option('#editBanner','void');page.select_option('#editFrame','astral');page.click('#saveProfile');check('profile name banner and frame saved',page.evaluate('__TEST.save.profile.name==="Kossay"&&__TEST.save.profile.frame==="astral"'))
 page.click('#accountLogin');check('signup is not faked when backend is unconfigured','included account backend' in page.locator('#modalPanel').inner_text())
 page.click('#closeModal');page.screenshot(path=str(R/'docs/nightfall-profile.png'))
 page.evaluate('__TEST.showPage("home")');page.click('#nearbyButton');check('browser explains native Bluetooth rather than simulating a radio','not this browser preview' in page.locator('#modalPanel').inner_text())
 page.click('#closeModal')
 for w,h in [(640,360),(960,540),(1280,720)]:
  page.set_viewport_size({'width':w,'height':h});page.evaluate('__TEST.startRun(0,"boss");__TEST.run.player.invincible=100;__TEST.run.boss.clock=100');page.wait_for_timeout(180)
  check(f'{w}×{h}: all combat buttons inside viewport and at least 48px',page.evaluate("['jumpControl','attackControl','knifeControl','dodgeControl','skillControl','skillControl2','summonControl'].every(id=>{let b=document.getElementById(id).getBoundingClientRect();return b.width>=47.9&&b.height>=47.9&&b.x>=0&&b.right<=innerWidth+1&&b.y>=0&&b.bottom<=innerHeight+1})"))
  page.evaluate('__TEST.leaveRun()')
 page.set_viewport_size({'width':844,'height':390});page.evaluate('__TEST.startRun(0,"boss");__TEST.run.player.invincible=100');page.wait_for_timeout(2300);page.screenshot(path=str(R/'docs/nightfall-boss.png'))
 page.evaluate('__TEST.audio.unlock()');page.evaluate('Promise.all(Object.keys(__TEST.assets.audio).map(k=>__TEST.audio.load(k)))');check('all 47 bundled music/SFX files decode',page.evaluate('__TEST.audio.buffers.size===Object.keys(__TEST.assets.audio).length'))
 page.evaluate('__TEST.leaveRun();__TEST.startRun(0,"practice");const c=__TEST.run.level.chambers[0];__TEST.run.player.x=c.x+100;__TEST.run.player.y=390;__TEST.run.player.invincible=100');page.wait_for_timeout(300);page.screenshot(path=str(R/'docs/nightfall-chamber.png'))
 page.evaluate('__TEST.leaveRun();__TEST.startRun(0,"practice");__TEST.run.level.chambers.forEach(c=>c.complete=true);__TEST.run.boss.defeated=true;__TEST.run.boss.alive=false;__TEST.run.player.x=__TEST.run.level.goal.x-220;__TEST.run.player.invincible=100');page.wait_for_timeout(700);page.screenshot(path=str(R/'docs/nightfall-stargate.png'))
 check('no runtime exceptions across UI, touch, profile, bosses and map fixtures',not errors)
 # Two real browser clients; explicit in-memory bridge instead of physical Bluetooth radio.
 mock='''window.WissNative={capabilities:()=>'{"bluetooth":true}',send:(peer,payload)=>window.__outbox.push({peer,payload}),stop(){},host(){},devices(){},requestBluetooth(){},join(){},setApiOrigin(){},share(){},haptic(){},kick(){}};window.__outbox=[];'''
 pages=[]
 for name in ['host','slot1']:
  q=browser.new_page(viewport={'width':844,'height':390});q.set_default_timeout(5000);q.on('pageerror',lambda e:errors.append(str(e)));q.set_content(htmltest.replace('(()=>{\n"use strict";',mock+'\n(()=>{\n"use strict";'),wait_until='domcontentloaded',timeout=30000);q.evaluate('__TEST.assetsReady');q.evaluate('__TEST.showNearby()');pages.append(q)
 host,guest=pages;host.click('#hostNearby');host.evaluate("__TEST.nearby.connected('slot1')");guest.evaluate("__TEST.nearby.connected('host')")
 def flush():
  for i,q in enumerate(pages):
   out=q.evaluate('window.__outbox.splice(0)')
   for msg in out:pages[1-i].evaluate('(v)=>window.dispatchEvent(new CustomEvent("sw-native",{detail:v}))',{'type':'message','peer':'host' if i==0 else 'slot1','payload':msg['payload']})
 for _ in range(3):flush()
 check('two browser clients show the same two-player lobby',host.evaluate('__TEST.nearby.roster.length')==2 and guest.evaluate('__TEST.nearby.roster.length')==2)
 host.select_option('#nearMode','ffa');flush();guest.click('#nearReady');flush();host.click('#nearStart');flush()
 for _ in range(45):host.wait_for_timeout(75);flush()
 x=guest.evaluate('__TEST.run.player.x');guest.keyboard.down('KeyD')
 for _ in range(10):host.wait_for_timeout(60);flush()
 guest.keyboard.up('KeyD');flush()
 check('client input crosses bridge and host moves the actual remote player',guest.evaluate(f'__TEST.run.player.x>{x+15}'))
 check('both clients render a real opponent',guest.evaluate('__TEST.run.remotePlayers.length')==1 and host.evaluate('__TEST.run.remotePlayers.length')==1)
 check('PvP hides unbalanced hero/pet/summon controls',not guest.locator('#skillControl').is_visible() and not guest.locator('#summonControl').is_visible())
 host.screenshot(path=str(R/'docs/nightfall-nearby-arena.png'))
 check('no two-client browser exceptions',not errors)
 browser.close()
(R/'docs/nightfall-browser.json').write_text(json.dumps({'checks':results,'count':len(results),'errors':errors,'environment':'Chromium touch emulation; in-memory paired transport; NOT Android/Bluetooth hardware'},indent=2))
print('PASS',len(results),'Chromium checks')
