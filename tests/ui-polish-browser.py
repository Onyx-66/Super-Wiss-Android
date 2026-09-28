from pathlib import Path
from playwright.sync_api import sync_playwright
import json,base64,sys
R=Path(__file__).resolve().parents[1]
O=R/'docs/ui-polish';O.mkdir(exist_ok=True,parents=True)
html=(R/'dist/Super-Wiss-Odyssey.html').read_text()
probe="window.__POLISH_QA={get run(){return run},get save(){return save},get renderer(){return renderer},get pointers(){return pointers},keys,clearInput,get showPage(){return showPage},startRun,closeModal,persist,get showWeaponLoadout(){return showWeaponLoadout},get showSettings(){return showSettings},get renderHeroes(){return renderHeroes},get renderForge(){return renderForge},ascUsePreset,ascApplyControls,equipWeapon,paintPortrait,drawHero,heroArtFrame,assetLoadState,ASSET_CONFIG};\n"
html=html.replace("window.addEventListener('boot-enter'",probe+"window.addEventListener('boot-enter'",1)
shim='<script>const mem=new Map();Object.defineProperty(window,"localStorage",{value:{getItem:k=>mem.get(k)??null,setItem:(k,v)=>mem.set(k,String(v)),removeItem:k=>mem.delete(k),clear:()=>mem.clear()}});</script>'
html=html.replace('<head>','<head>'+shim,1)
checks=[];errors=[];measurements=[]
def check(label,condition,detail=None):
 checks.append({'name':label,'passed':bool(condition),'detail':detail})
with sync_playwright() as pw:
 browser=pw.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 for width,height in [(1648,928),(960,440),(844,390)]:
  page=browser.new_page(viewport={'width':width,'height':height},device_scale_factor=1)
  page.on('pageerror',lambda e:errors.append(str(e)))
  page.set_content(html,wait_until='load',timeout=60000);page.locator('#bootEnter').wait_for(state='visible',timeout=60000);page.locator('#bootEnter').click();page.wait_for_timeout(200)
  page.evaluate('window.__POLISH_QA.save.settings.motion=false;window.__POLISH_QA.persist()')
  check(f'{width}: no image load failures',page.evaluate('window.__POLISH_QA.assetLoadState.failed')==0)
  for screen in ['home','campaign','heroes','pets','forge','missions','records','profile','bosses']:
   page.evaluate('(name)=>window.__POLISH_QA.showPage(name)',screen);page.wait_for_timeout(120)
   d=page.evaluate('''()=>{const p=document.querySelector('.page.active'),h=p.querySelector('.page-heading h2,.home-heading h2'),c=h?.querySelector('canvas'),pixels=c?c.getContext('2d').getImageData(0,0,c.width,c.height).data:null;return {head:!!h&&!!(p.querySelector('.eyebrow')&&p.querySelector('.page-subtitle')&&(pixels?[...pixels].filter((v,i)=>i%4===3&&v>20).length>20:getComputedStyle(h).backgroundImage!=='none'))&&(!p.querySelector('#continueButton')||getComputedStyle(p.querySelector('#continueButton .mode-text>small')).color==='rgb(255, 240, 200)'),borders:[...p.querySelectorAll('.precision-panel')].every(el=>getComputedStyle(el).borderImageSource!=='none'),overflow:document.documentElement.scrollWidth>innerWidth+1};}''')
   check(f'{width} {screen}: painted headline + kicker/subtext',d['head']);check(f'{width} {screen}: shared border component',d['borders']);check(f'{width} {screen}: no horizontal page overflow',not d['overflow'])
  # Settings is interacted with through its real controls, not a static mock.
  page.evaluate('window.__POLISH_QA.showSettings()');page.wait_for_timeout(100)
  check(f'{width}: settings grouped into three columns',page.locator('.settings-column').count()==3)
  box=page.locator('#doneSettings').bounding_box();check(f'{width}: Done is inside dialog/viewport',box and box['y']>=0 and box['y']+box['height']<=height)
  page.locator('#sfxVolume').evaluate('(e)=>{e.value=.35;e.dispatchEvent(new Event("input",{bubbles:true}));}')
  check(f'{width}: audio percentage live',page.locator('output[for=sfxVolume]').text_content()=='35%' and page.evaluate('window.__POLISH_QA.save.settings.sfxVolume')==.35)
  page.locator('#doneSettings').click()
  # Reproduce exact Kael report: explicitly unequip the weapon, retain real art in identity UI.
  page.evaluate('window.__POLISH_QA.save.ascension.weapons.kossay=null;window.__POLISH_QA.persist();window.__POLISH_QA.showPage("heroes")')
  kael=page.locator('canvas[data-hero-art=kossay]')
  d=kael.evaluate('''c=>{const p=c.getContext('2d').getImageData(0,0,c.width,c.height).data;const colors=new Set();for(let i=0;i<p.length;i+=4)if(p[i+3]>32)colors.add([p[i],p[i+1],p[i+2]].join(','));return {mode:c.dataset.portraitMode,colors:colors.size,margin:JSON.parse(c.dataset.artBounds)};}''')
  check(f'{width}: Kael actual detailed portrait, not block proxy',d['mode']=='identity-reference' and d['colors']>100,d)
  check(f'{width}: unarmed save NOT silently changed',page.evaluate('window.__POLISH_QA.save.ascension.weapons.kossay') is None)
  page.locator('button[data-hero=kossay]').click()
  check(f'{width}: selected Kael identity art pending note visible',page.locator('#heroDetails .identity-reference-note').count()==1)
  # Cycle Wardrobe previews with real carousel buttons, checking alpha containment.
  page.evaluate('window.__POLISH_QA.showPage("forge")')
  for i in range(10):
   d=page.locator('#wardrobeHero').evaluate('''c=>{const b=JSON.parse(c.dataset.artBounds);return {id:c.dataset.heroIdentity,inside:b.x>=7&&b.y>=7&&b.x+b.width<=c.width-7&&b.y+b.height<=c.height-7};}''')
   check(f'{width}: wardrobe {d["id"]} full silhouette inside margins',d['inside']);page.locator('#forgeNext').click()
  # Real gameplay HUD and pointer crouch.
  page.evaluate('window.__POLISH_QA.save.hero="wissem";window.__POLISH_QA.persist();window.__POLISH_QA.startRun(0,"practice")');page.wait_for_timeout(400)
  for preset in range(4):
   page.evaluate('(i)=>window.__POLISH_QA.ascUsePreset(i)',preset);page.wait_for_timeout(70)
   dims=page.evaluate('''()=>[...document.querySelectorAll('#gameUI button.control,#pauseButton,#quickLayout')].filter(el=>el.getClientRects().length&&!el.hidden).map(el=>{const r=el.getBoundingClientRect();return {id:el.id,w:r.width,h:r.height,l:r.left,t:r.top,r:r.right,b:r.bottom,caption:el.querySelector('span')?.textContent||'',aria:el.getAttribute('aria-label')||''};})''')
   for d in dims:
    primary=d['id'] in ['attackControl','jumpControl'];minimum=56 if primary else 44
    check(f'{width} preset{preset}: {d["id"]} target {minimum}',d['w']>=minimum-.1 and d['h']>=minimum-.1)
    check(f'{width} preset{preset}: {d["id"]} safe 24',min(d['l'],d['t'],width-d['r'],height-d['b'])>=23.8)
    check(f'{width} preset{preset}: {d["id"]} no caption + accessible name',not d['caption'] and bool(d['aria']))
   measurements.append({'viewport':[width,height],'preset':preset,'controls':dims})
  page.evaluate('window.__POLISH_QA.ascUsePreset(0)');page.wait_for_timeout(2800)
  check(f'{width}: knife and spirit data badges remain',page.locator('#knifeCount').text_content()=='12' and page.locator('#summonCount').text_content()=='2')
  page.screenshot(path=str(O/f'hud-armed-{width}.png'))
  rect=page.locator('#crouchControl').bounding_box();page.mouse.move(rect['x']+rect['width']/2,rect['y']+rect['height']/2);page.mouse.down();page.wait_for_timeout(250)
  d=page.evaluate('({height:window.__POLISH_QA.run.player.h,pose:window.__POLISH_QA.run.player.crouching,pressed:document.getElementById("crouchControl").getAttribute("aria-pressed")})')
  check(f'{width}: pointer crouch produces height26 + visible pose state',d['height']==26 and d['pose'] and d['pressed']=='true',d)
  page.screenshot(path=str(O/f'hud-crouched-{width}.png'));page.mouse.up();page.wait_for_timeout(170)
  check(f'{width}: releasing crouch restores height44',page.evaluate('window.__POLISH_QA.run.player.h')==44)
  # Separate reference is explicit. No fabricated unarmed sprite registration is added.
  page.evaluate('window.__POLISH_QA.save.ascension.weapons.wissem=null;window.__POLISH_QA.persist();window.__POLISH_QA.startRun(0,"practice")');page.wait_for_timeout(180)
  check(f'{width}: unarmed action draws a fist glyph',page.locator('#attackControl i svg[viewBox="0 0 32 32"]').count()==1)
  check(f'{width}: unarmed control has no PUNCH caption',page.locator('#attackControl span').text_content()=='')
  page.screenshot(path=str(O/f'hud-unarmed-{width}.png'));page.close()
 browser.close()
check('no runtime JavaScript errors',not errors,errors)
report={'passed':sum(c['passed'] for c in checks),'failed':sum(not c['passed'] for c in checks),'checks':checks,'controls':measurements,'scope':'Chromium embedded build; in-memory storage shim only, no real-origin persistence or Android native verification'}
(O/'BROWSER-CHECKS.json').write_text(json.dumps(report,indent=2))
print(json.dumps({'passed':report['passed'],'failed':report['failed'],'failures':[c for c in checks if not c['passed']]},indent=2))
sys.exit(1 if report['failed'] else 0)
