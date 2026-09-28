#!/usr/bin/env python3
"""Offline render/interaction checks using Python Playwright and system Chromium.
Run npm run build first. Test-only MemoryStorage and diagnostic probe are injected
into an in-memory copy of dist HTML; release code is not modified. This does not
validate Android WebView, real origin persistence, native billing, audio perception,
Bluetooth or a Gradle build. No external font/network requests are needed.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json, os
R=Path(__file__).resolve().parents[1];OUT=R/'docs/qa-local';screens=OUT/'screens';screens.mkdir(parents=True,exist_ok=True)
html=(R/'dist/Super-Wiss-Odyssey.html').read_text()
shim='<script>const testStorage=new Map();Object.defineProperty(window,"localStorage",{value:{getItem:k=>testStorage.get(k)??null,setItem:(k,v)=>testStorage.set(k,String(v)),removeItem:k=>testStorage.delete(k),clear:()=>testStorage.clear()}});</script>'
html=html.replace('<head>','<head>'+shim,1)
probe="window.__ATELIER_QA={get run(){return run},get save(){return save},pointers,keys,clearInput,showPage,startRun,closeModal,persist,showWeaponLoadout};\n"
assert "window.addEventListener('boot-enter'" in html
html=html.replace("window.addEventListener('boot-enter'",probe+"window.addEventListener('boot-enter'",1)
errors=[];checks=[];geometry=[]
def check(name,condition):
 checks.append({'check':name,'passed':bool(condition)})
 if not condition:raise AssertionError(name)
with sync_playwright() as playwright:
 browser=playwright.chromium.launch(executable_path=os.environ.get('CHROMIUM','/usr/bin/chromium'),headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
 page=browser.new_page(viewport={'width':1672,'height':941},device_scale_factor=1)
 page.on('pageerror',lambda error:errors.append(str(error)))
 try:
  page.set_content(html,wait_until='load',timeout=60000)
  page.locator('#bootEnter').wait_for(state='visible',timeout=60000);page.locator('#bootEnter').click();page.wait_for_timeout(400)
  for size,view in [('large',{'width':1672,'height':941}),('compact',{'width':960,'height':440})]:
   page.set_viewport_size(view)
   for name in ['home','campaign','heroes','pets','forge','missions','records','profile','bosses','settings']:
    if name=='bosses':
     page.locator('.bottom-nav [data-page="home"]').click();page.locator('#bossHuntButton').click()
    elif name=='settings':page.locator('#navSettings').click()
    else:page.locator('.bottom-nav [data-page="'+name+'"]').click()
    page.wait_for_timeout(320);page.screenshot(path=str(screens/(name+'-'+size+'.png')))
    shell=page.evaluate("""()=>Object.fromEntries(['.topbar','#pages','.bottom-nav'].map(s=>{const r=document.querySelector(s).getBoundingClientRect();return[s,{x:r.x,y:r.y,right:r.right,bottom:r.bottom,w:r.width,h:r.height}]}))""")
    geometry.append({'page':name,'viewport':view,'shell':shell})
    check(name+' '+size+' shell within viewport',all(v['x']>=0 and v['right']<=view['width']+1 and v['y']>=0 and v['bottom']<=view['height']+1 for v in shell.values()))
   page.locator('#doneSettings').click()
  page.set_viewport_size({'width':1672,'height':941})
  page.locator('.bottom-nav [data-page="heroes"]').click();page.locator('[data-hero="kossay"]').click();page.locator('#equipHero').click();page.locator('#heroLoadout').click()
  check('Kael cannot visually swap baked knives to a foreign class',page.locator('[data-equip-weapon="dagger"]').is_disabled())
  check('zero Magic denies staff',page.locator('[data-equip-weapon="staff"]').is_disabled())
  page.locator('[data-equip-weapon="unarmed"]').click();page.locator('#weaponDone').click()
  check('null unarmed choice persisted under original hero ID',page.evaluate('window.__ATELIER_QA.save.ascension.weapons.kossay===null'))
  check('unarmed proxy is explicitly labelled in hero detail','TRAINING PROXY' in page.locator('#heroDetails').inner_text())
  page.screenshot(path=str(screens/'kael-unarmed-proxy.png'))
  page.locator('.bottom-nav [data-page="home"]').click();check('lobby states proxy','TRAINING PROXY' in page.locator('#homeLoadout').inner_text());page.screenshot(path=str(screens/'kael-unarmed-lobby.png'))
  page.locator('.bottom-nav [data-page="heroes"]').click();page.locator('[data-hero="wissem"]').click();page.locator('#equipHero').click();page.locator('#heroLoadout').click()
  for weapon in ['dual','sabre','gauntlet','unarmed']:
   check('Wissem equip '+weapon,page.locator('[data-equip-weapon="'+weapon+'"]').is_enabled());page.locator('[data-equip-weapon="'+weapon+'"]').click();page.locator('#weaponDone').click();page.wait_for_timeout(150);page.screenshot(path=str(screens/('wissem-'+weapon+'.png')));page.locator('#heroLoadout').click()
  page.locator('#weaponDone').click();page.locator('.bottom-nav [data-page="forge"]').click()
  for slot in ['hat','top','bottom','shoes','eyewear','weaponSkin']:
   page.locator('[data-wardrobe-slot="'+slot+'"]').click();page.locator('#clearPiece').click();check('independent clear: '+slot,page.evaluate('(slot)=>window.__ATELIER_QA.save.ascension.wardrobe.wissem[slot]===null',slot))
  check('pending pieces are not purchasable',page.locator('.piece-card.art-pending button').is_disabled())
  for tab in ['skills','fusion','outfits']:page.locator('[data-forge-tab="'+tab+'"]').click();page.wait_for_timeout(100)
  page.locator('.bottom-nav [data-page="missions"]').click();page.locator('#dailyTab').click();page.locator('#journeyTab').click();check('journey missions still render',page.locator('.quest-card').count()>0)
  page.locator('#navSettings').click();old=page.evaluate('window.__ATELIER_QA.save.settings.sound');page.locator('[data-setting="sound"]').click();check('sound switch changes setting',page.evaluate('window.__ATELIER_QA.save.settings.sound')!=old)
  page.locator('#sfxVolume').fill('0.3');page.locator('#sfxVolume').dispatch_event('input');check('volume slider saves',page.evaluate('window.__ATELIER_QA.save.settings.sfxVolume===0.3'));page.locator('#doneSettings').click()
  check('serialized save retains null, slots and stable hero ID',page.evaluate("(()=>{const s=JSON.parse(localStorage.getItem('super-wiss:odyssey-v4'));return s.hero==='wissem'&&s.ascension.weapons.wissem===null&&s.ascension.wardrobe.wissem.weaponSkin===null})()"))
  page.set_viewport_size({'width':960,'height':440});page.evaluate("window.__ATELIER_QA.startRun(0,'practice')");page.wait_for_timeout(800)
  check('unarmed run starts with actual null equipment',page.evaluate('window.__ATELIER_QA.run.player.equippedWeapon===null'))
  check('knife control disabled while unarmed',page.locator('#knifeControl').is_disabled());check('attack control says PUNCH',page.locator('#attackControl span').inner_text()=='PUNCH')
  button=page.locator('#crouchControl');rect=button.bounding_box();page.mouse.move(rect['x']+rect['width']/2,rect['y']+rect['height']/2);page.mouse.down();page.wait_for_timeout(250)
  check('holding cropped crouch control reduces actual body hurtbox',page.evaluate('window.__ATELIER_QA.run.player.h===26&&[...window.__ATELIER_QA.pointers.values()].includes("crouch")'))
  page.screenshot(path=str(screens/'crouch-hold.png'));page.mouse.up();page.wait_for_timeout(250);check('release restores standing height and clears input',page.evaluate('window.__ATELIER_QA.run.player.h===44&&![...window.__ATELIER_QA.pointers.values()].includes("crouch")'))
  page.locator('#attackControl').click();page.wait_for_timeout(40);check('touch PUNCH starts unarmed phases',page.evaluate('window.__ATELIER_QA.run.player.attackSerial>0'))
  page.screenshot(path=str(screens/'unarmed-combat.png'))
  check('all visible IMG assets resolve',page.evaluate('Array.from(document.images).filter(i=>i.getAttribute("src")&&(!i.complete||!i.naturalWidth)).length===0'))
  check('no JavaScript page errors',not errors)
 finally:
  report={'environment':'Chromium set_content; test-only MemoryStorage; not Android/native QA','checks':checks,'errors':errors,'geometry':geometry,'fonts':page.evaluate('({display:document.fonts.check(\'16px "Pixelify Sans"\'),body:document.fonts.check(\'16px "VT323"\')})')}
  (OUT/'browser-tests.json').write_text(json.dumps(report,indent=2)+'\n');browser.close()
print(json.dumps({'checks':len(checks),'passed':sum(c['passed'] for c in checks),'errors':errors},indent=2))
