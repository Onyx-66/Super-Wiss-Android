"""Desktop Chromium, mobile viewport/touch-emulation regression suite.
Not an Android device/emulator test. set_content is used because this container's
browser navigation is administratively blocked. A test-only observation API and
in-memory storage adapter are injected into a COPY, never shipped in the APK.
"""
import json, re
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/'dist/Super-Wiss-Odyssey.html').read_text()
m=re.search(r"let storage;[\s\S]+?(?=const loaded\b)",html)
assert m and 'window.localStorage' in m.group(0) and '__TEST' not in html
new="let storage={data:{},getItem(k){return this.data[k]||null},setItem(k,v){this.data[k]=String(v)}};\n"
hook="""
window.__TEST={get run(){return run},get save(){return save},get paused(){return paused},get modal(){return modalType},get audio(){return audio},get pointers(){return pointers.size},get storage(){return storage},get assets(){return ASSET_CONFIG},assetsReady,assetImage,startRun,leaveRun,showPage,showResult,showSettings,updateHud,updateTop,applySettings,persist,advanceEndless,activatePetSkill,activateSkill,stepRun,recordRun};
"""
test_html=(html[:m.start()]+new+html[m.end():]).replace('\n})();','\n'+hook+'\n})();')
results=[];errors=[];requests=[];warnings=[]
def check(name,value):
    assert value,name
    results.append({'name':name,'result':'pass'})
def center(page,id):
    b=page.locator('#'+id).bounding_box();return {'x':b['x']+b['width']/2,'y':b['y']+b['height']/2}
def tap(page,id):page.locator('#'+id).click()
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
    context=browser.new_context(viewport={'width':844,'height':390},has_touch=True,is_mobile=True,device_scale_factor=1)
    page=context.new_page();page.on('pageerror',lambda e:errors.append(str(e)));page.on('request',lambda r:requests.append(r.url))
    page.on('console',lambda msg:warnings.append(msg.text) if msg.type=='warning' else None)
    page.set_content(test_html);page.wait_for_timeout(500);page.evaluate('__TEST.assetsReady')
    check('no observation hook in distributed production HTML','__TEST' not in html)
    check('production contains no external scripts, fonts or image links','.woff' not in html and '<script src=' not in html)
    check('landscape home initializes',page.locator('#page-home').is_visible())
    check('fresh profile has no invented gold, pets or rival records',page.evaluate('__TEST.save.gold===0 && __TEST.save.pets.length===0 && __TEST.save.endless.runs.length===0'))
    check('all 78 shipped images decode',page.evaluate('Object.keys(__TEST.assets.images).length===78 && Object.keys(__TEST.assets.images).every(k=>__TEST.assetImage(k).naturalWidth>0)'))
    check('new hero name and seven-pet badge visible',page.locator('#profileName').inner_text()=='Wissem' and page.locator('#petCountTag').inner_text()=='7 PETS')
    page.locator('[data-page="campaign"]').click()
    check('all 15 campaign cards are present',page.locator('[data-map]').count()==15)
    check('14 maps initially locked',page.locator('.map-card.locked').count()==14)
    check('map details show five sectors and 860 tiles','5 sectors' in page.locator('#mapDetails').inner_text() and '860 tiles' in page.locator('#mapDetails').inner_text())
    page.locator('[data-map="1"]').click();check('locked campaign cannot launch',page.locator('#playMapButton').is_disabled())
    tap(page,'practiceToggle');page.locator('[data-map="14"]').click()
    check('practice opens every map without modifying campaign clears',page.locator('.map-card.locked').count()==0 and page.evaluate('__TEST.save.maps.every(m=>!m.clear)'))
    check('practice note interpolates the current world count','All 15 worlds' in page.locator('.practice-note').inner_text())
    tap(page,'playMapButton');check('onboarding explains both skill buttons','Two hero buttons' in page.locator('#modalPanel').inner_text())
    tap(page,'guideDone');check('selected practice map starts',page.evaluate('__TEST.run.worldId===14 && __TEST.run.mode==="practice"'))
    page.evaluate('__TEST.leaveRun()');page.locator('[data-page="heroes"]').click()
    check('eight renamed hero cards',page.locator('[data-hero]').count()==8 and page.locator('[data-hero="wissem"]').count()==1 and page.locator('[data-hero="loey"]').count()==1)
    check('Wissem details expose Gravity and Bomba','Bomba' in page.locator('#heroDetails').inner_text() and 'Crowd fury' in page.locator('#heroDetails').inner_text())
    for hero in ['kossay','yakine','taky','garsi','tounsi','youssef','loey','wissem']:
        page.locator(f'[data-hero="{hero}"]').click();tap(page,'equipHero')
        check(f'{hero}: equip selects hero and two skills',page.evaluate(f'__TEST.save.hero==="{hero}"') and page.locator('#heroDetails h4').count()==2)
    page.locator('[data-page="pets"]').click()
    check('pet sanctuary lists five super and two super-rare pets',page.locator('[data-pet]').count()==7 and page.locator('.pet-card.rare').count()==2)
    page.locator('[data-pet="dragon"]').click();check('Dragon lists 15 charges and 45-second triple scoring','15 enemy' in page.locator('#petDetails').inner_text() and '3×' in page.locator('#petDetails').inner_text() and '45s' in page.locator('#petDetails').inner_text())
    check('locked rare pet cannot be equipped in campaign',page.locator('#equipPet').is_disabled())
    page.locator('[data-pet="orca"]').click();tap(page,'practicePetButton');page.locator('[data-map="0"]').click();tap(page,'playMapButton')
    check('practice tests Orca without adding ownership',page.evaluate('__TEST.run.petId==="orca" && __TEST.run.mode==="practice" && __TEST.save.pets.length===0'))
    check('both Orca buttons are visible',page.locator('#petControl').is_visible() and page.locator('#petControl2').is_visible())
    check('all game buttons have 44px minimum hit areas',page.evaluate("['leftControl','rightControl','jumpControl','skillControl','skillControl2','sprintControl','petControl','petControl2'].every(id=>{const b=document.getElementById(id).getBoundingClientRect();return b.width>=44&&b.height>=44})"))
    cdp=context.new_cdp_session(page);a=center(page,'rightControl');b=center(page,'jumpControl');x=page.evaluate('__TEST.run.player.x')
    cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[dict(a,id=1),dict(b,id=2)]});page.wait_for_timeout(180)
    check('real simultaneous touch moves and jumps',page.evaluate(f'__TEST.run.player.x>{x+12} && __TEST.run.player.y<430'))
    check('two pointer captures coexist',page.evaluate('__TEST.pointers')==2)
    cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});page.wait_for_timeout(60);check('touch release clears all held pointers',page.evaluate('__TEST.pointers')==0)
    tap(page,'skillControl');page.wait_for_timeout(80);check('first hero touch activates low gravity',page.evaluate('__TEST.run.player.gravity>0 && __TEST.run.player.cooldown>0'))
    tap(page,'skillControl2');page.wait_for_timeout(60);check('second hero touch launches Bomba independently',page.evaluate('__TEST.run.player.cooldown2>0 && __TEST.run.stats.skills>=2'))
    tap(page,'petControl');page.wait_for_timeout(60);check('Flood touch clears all map enemies and starts 45s effect',page.evaluate('__TEST.run.player.flood>44 && __TEST.run.level.enemies.every(e=>!e.alive)'))
    tap(page,'petControl2');page.wait_for_timeout(100);check('Prince touch starts separate water protection',page.evaluate('__TEST.run.player.prince>44 && __TEST.run.player.petCooldown2>99'))
    check('active pet buttons display remaining duration','s' in page.locator('#petControl b').inner_text() and 's' in page.locator('#petControl2 b').inner_text())
    tap(page,'pauseButton');t=page.evaluate('__TEST.run.player.flood');page.wait_for_timeout(250);check('pause freezes rare buffs and game time',page.evaluate('__TEST.paused && __TEST.run.player.flood')==t)
    check('native back adapter resumes the pause dialog',page.evaluate('window.NativeShell.back()') is True);page.wait_for_timeout(100);check('run resumes after back',not page.evaluate('__TEST.paused'))
    page.evaluate('window.dispatchEvent(new Event("native-pause"))');page.wait_for_timeout(100);check('native pause event pauses and releases controls',page.evaluate('__TEST.paused && __TEST.pointers===0'))
    check('native pause suspends WebAudio context',page.evaluate('__TEST.audio.context.state')=='suspended')
    page.evaluate('__TEST.leaveRun()');page.locator('[data-page="pets"]').click();page.locator('[data-pet="dragon"]').click();tap(page,'practicePetButton');page.locator('[data-map="0"]').click();tap(page,'playMapButton')
    check('Dragon shows its passive charge counter and one active button','15' in page.locator('#petPassive').inner_text() and page.locator('#petControl').is_visible() and not page.locator('#petControl2').is_visible())
    page.keyboard.press('KeyF');page.wait_for_timeout(120);check('pet keyboard F activates Dragon Breath',page.evaluate('__TEST.run.player.breath>44'))
    # Rapid taps are latched, not lost between animation frames.
    page.evaluate('__TEST.run.player.cooldown=0;__TEST.run.player.skillHeld=false')
    page.locator('#skillControl').dispatch_event('pointerdown',{'pointerId':901,'pointerType':'touch','bubbles':True});page.locator('#skillControl').dispatch_event('pointerup',{'pointerId':901,'pointerType':'touch','bubbles':True});page.wait_for_timeout(100)
    check('rapid skill tap is not dropped',page.evaluate('__TEST.run.player.cooldown>0'))
    page.evaluate('__TEST.leaveRun();__TEST.showSettings()');page.locator('#sfxVolume').fill('0.35');page.locator('#sfxVolume').dispatch_event('input');page.locator('#musicVolume').fill('0.25');page.locator('#musicVolume').dispatch_event('input')
    check('separate effect and music volumes update the engine and save',page.evaluate('__TEST.save.settings.sfxVolume===.35 && __TEST.audio.musicVolume===.25'))
    page.locator('[data-setting="leftHanded"]').click();check('mirrored controls setting applies',page.locator('#touchControls').evaluate('(e)=>e.classList.contains("left-handed")'))
    page.locator('[data-setting="leftHanded"]').click();tap(page,'doneSettings')
    check('all 32 audio files decode as valid buffers',page.evaluate('async()=>{__TEST.audio.unlock();const a=await Promise.all(Object.keys(__TEST.assets.audio).map(k=>__TEST.audio.load(k)));return a.length===32&&a.every(b=>b&&b.duration>0&&b.numberOfChannels===2)}'))
    page.locator('[data-page="missions"]').click();check('12 journey missions retained',page.locator('.quest-card').count()==12)
    tap(page,'dailyTab');check('three daily missions retained',page.locator('.quest-card').count()==3)
    page.locator('[data-page="records"]').click();check('records explicitly local and no invented competitors','ON THIS DEVICE' in page.locator('#page-records').inner_text() and page.evaluate('__TEST.save.endless.runs.length===0'))
    page.evaluate('__TEST.startRun(0,"endless");for(let i=0;i<15;i++)__TEST.advanceEndless(__TEST.run);__TEST.updateHud(true)')
    check('endless HUD advances to world16 loop2','WORLD 16' in page.locator('#runMapLabel').inner_text() and 'LOOP 2' in page.locator('#runMapLabel').inner_text())
    page.evaluate('__TEST.leaveRun()')
    for w,h in [(640,360),(844,390),(960,540),(1280,720)]:
        page.set_viewport_size({'width':w,'height':h});page.evaluate('__TEST.showPage("home")');page.wait_for_timeout(80)
        check(f'{w}x{h}: no body horizontal overflow',page.evaluate('document.documentElement.scrollWidth<=innerWidth'))
        page.evaluate('__TEST.showPage("pets")');page.locator('[data-pet="orca"]').click();tap(page,'practicePetButton');page.locator('[data-map="0"]').click();tap(page,'playMapButton');page.wait_for_timeout(70)
        check(f'{w}x{h}: both hero and both pet buttons fit viewport',page.evaluate("['leftControl','rightControl','jumpControl','skillControl','skillControl2','petControl','petControl2'].every(id=>{let b=document.getElementById(id).getBoundingClientRect();return b.left>=0&&b.right<=innerWidth&&b.top>=0&&b.bottom<=innerHeight})"))
        page.evaluate('__TEST.leaveRun()')
    page.set_viewport_size({'width':390,'height':844});check('portrait shows landscape rotation hint',page.locator('#rotateHint').is_visible())
    # Screenshots use only real UI entry points, practice modes, and unmodified
    # content. The storage adapter and observations do not appear in screenshots.
    page.set_viewport_size({'width':960,'height':540});page.evaluate('__TEST.showPage("home")');page.wait_for_timeout(3500);page.screenshot(path=str(ROOT/'docs/home-landscape.png'))
    page.locator('[data-page="heroes"]').click();page.screenshot(path=str(ROOT/'docs/heroes-landscape.png'))
    page.locator('[data-page="pets"]').click();page.locator('[data-pet="dragon"]').click();page.wait_for_timeout(200);page.screenshot(path=str(ROOT/'docs/pets-landscape.png'))
    page.locator('[data-pet="orca"]').click();tap(page,'practicePetButton');page.locator('[data-map="14"]').click();page.wait_for_timeout(3200);page.screenshot(path=str(ROOT/'docs/worlds-landscape.png'));tap(page,'playMapButton');page.wait_for_timeout(2400);page.keyboard.down('KeyD');page.wait_for_timeout(1150);page.keyboard.up('KeyD');page.wait_for_timeout(250)
    page.screenshot(path=str(ROOT/'docs/gameplay-landscape.png'))
    tap(page,'petControl');tap(page,'petControl2');page.wait_for_timeout(400);page.screenshot(path=str(ROOT/'docs/orca-landscape.png'))
    check('all UI interactions completed without JavaScript errors',not errors)
    check('game made no non-data external requests',all(u.startswith('data:') for u in requests))
    check('no failed asset/audio loads reported',not any('unavailable' in w.lower() or 'Asset failed' in w for w in warnings))
    # Unmodified production smoke, without test storage or observation hook.
    raw=context.new_page();raw_errors=[];raw.on('pageerror',lambda e:raw_errors.append(str(e)));raw.set_content(html);raw.wait_for_timeout(200);raw.locator('#continueButton').click();raw.locator('#guideDone').click();raw.wait_for_timeout(200)
    check('unmodified production bundle starts actual gameplay',raw.locator('#gameUI').is_visible() and not raw_errors)
    check('production has no injected test API',raw.evaluate('typeof window.__TEST')=='undefined')
    browser.close()
report={'suite':'Chromium mobile emulation; NOT Android runtime','passed':len(results),'failed':0,'checks':results,'pageErrors':errors,'networkRequests':requests,'warnings':warnings,'storage':'test copy uses explicit in-memory adapter; physical persistence untested'}
(ROOT/'docs/browser-tests.json').write_text(json.dumps(report,indent=2)+'\n')
print(f'{len(results)} browser checks passed. No Android runtime was exercised.')
