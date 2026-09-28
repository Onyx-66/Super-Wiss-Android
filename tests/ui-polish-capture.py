from pathlib import Path
from playwright.sync_api import sync_playwright
import json,sys
R=Path(__file__).resolve().parents[1]
stage=sys.argv[1] if len(sys.argv)>1 else 'before'
OUT=R/'docs/ui-polish'/stage;OUT.mkdir(parents=True,exist_ok=True)
code=(R/'dist/Super-Wiss-Odyssey.html').read_text()
probe="window.__POLISH_QA={get run(){return run},get save(){return save},get renderer(){return renderer},get pointers(){return pointers},keys,clearInput,get showPage(){return showPage},startRun,closeModal,persist,showWeaponLoadout,get showSettings(){return showSettings},get renderHeroes(){return renderHeroes},get renderForge(){return renderForge},ascUsePreset,ascApplyControls,equipWeapon,paintPortrait,drawHero,heroArtFrame,assetLoadState,ASSET_CONFIG};\n"
code=code.replace("window.addEventListener('boot-enter'",probe+"window.addEventListener('boot-enter'",1)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 page=b.new_page(viewport={'width':1648,'height':928},device_scale_factor=1)
 errors=[]; page.on('pageerror',lambda e:errors.append(str(e)))
 shim='<script>const mem=new Map();Object.defineProperty(window,"localStorage",{value:{getItem:k=>mem.get(k)??null,setItem:(k,v)=>mem.set(k,String(v)),removeItem:k=>mem.delete(k),clear:()=>mem.clear()}});</script>'
 page.set_content(code.replace('<head>','<head>'+shim,1),wait_until='load',timeout=60000)
 page.locator('#bootEnter').wait_for(state='visible',timeout=60000);page.locator('#bootEnter').click();page.wait_for_timeout(250)
 page.evaluate('window.__POLISH_QA.save.settings.motion=false;window.__POLISH_QA.persist()')
 for n,name in enumerate(['home','campaign','heroes','pets','forge','missions','records','profile','bosses','settings']):
  if name=='settings':page.evaluate('window.__POLISH_QA.showSettings()')
  else:page.evaluate('(s)=>window.__POLISH_QA.showPage(s)',name)
  page.wait_for_timeout(150);page.screenshot(path=str(OUT/f'{n+1:02}-{name}.png'))
 page.evaluate('window.__POLISH_QA.closeModal();window.__POLISH_QA.save.ascension.weapons.kossay=null;window.__POLISH_QA.persist();window.__POLISH_QA.showPage("heroes")')
 page.wait_for_timeout(150);page.screenshot(path=str(OUT/'11-kael-null.png'))
 print(json.dumps({'stage':stage,'errors':errors,'assets':page.evaluate('window.__POLISH_QA.assetLoadState')},indent=2)); b.close()
