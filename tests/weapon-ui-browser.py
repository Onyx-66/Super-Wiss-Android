from pathlib import Path
from playwright.sync_api import sync_playwright
import json, os, argparse
parser=argparse.ArgumentParser();parser.add_argument('--output',default=None);args=parser.parse_args()
root=Path(__file__).resolve().parents[1];out=Path(args.output) if args.output else root/'artifacts/weapon-ui-checks';out.mkdir(parents=True,exist_ok=True);results=[]
html=(root/'dist/Super-Wiss-Odyssey.html').read_text()
# In-memory save and observation hooks are test-fixture-only. Not shipped.
store='''<script>window.testStore={};Object.defineProperty(window,'localStorage',{value:{getItem:k=>window.testStore[k]??null,setItem:(k,v)=>window.testStore[k]=String(v),removeItem:k=>delete window.testStore[k]}});</script>'''
html=html.replace('<body>','<body>'+store)
probe="window.__VISUAL_QA={save,updateTop,showPage,renderer,paintPortrait,drawHero,drawHeroWeapon,weaponPose,heroArtFrame,ASSET_CONFIG,imageCache,assetLoadState,createRun,stepRun};\n"
html=html.replace("window.addEventListener('boot-enter'",probe+"window.addEventListener('boot-enter'",1)
def check(name,v):
 if not v:raise AssertionError(name)
 results.append(name);print('PASS',name)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH','/usr/bin/chromium'),headless=True,args=['--no-sandbox'])
 for w,h in [(640,360),(800,360),(960,443),(1280,720),(1600,738)]:
  page=b.new_page(viewport={'width':w,'height':h},has_touch=True);errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.set_content(html,wait_until='load');page.locator('#bootEnter').wait_for(state='visible',timeout=30000)
  check(f'boot required media ready {w}',page.evaluate('()=>!SuperWissBoot.failed&&__VISUAL_QA.assetLoadState.failed===0'))
  check(f'10 missing weapon assets explicitly pending {w}',page.evaluate('()=>__VISUAL_QA.assetLoadState.pending.length===10'))
  if w==960:page.screenshot(path=str(out/'loading-after.png'))
  page.click('#bootEnter');page.wait_for_timeout(450)
  check(f'logo loaded from registry {w}',page.locator('.logo-lockup img').evaluate('e=>e.complete&&e.naturalWidth===640'))
  page.evaluate("()=>{let q=__VISUAL_QA;q.save.hero='tounsi';q.save.profile.avatar='yakine';q.save.profile.name='Profile test';q.updateTop();}")
  check(f'identity uses profile avatar independently {w}',page.evaluate("()=>{const q=__VISUAL_QA,c=document.createElement('canvas');c.width=c.height=90;q.paintPortrait(c,'yakine',true);return c.toDataURL()===document.querySelector('#profilePortrait').toDataURL()&&document.querySelector('#profileName').textContent==='Profile test';}"))
  # Correct menu selected hero without editing persistent progress.
  page.evaluate("()=>{__VISUAL_QA.renderer.menuOutfit='starter';__VISUAL_QA.renderer.menuParts={};}")
  page.wait_for_timeout(400)
  if w in (960,1600):page.screenshot(path=str(out/f'home-after-{w}.png'))
  page.click('[data-page="heroes"]');page.wait_for_timeout(400)
  geometry=page.evaluate('''()=>{const g=document.querySelector('#heroGrid'),cards=[...g.children],rect=cards.map(c=>c.getBoundingClientRect());return {count:cards.length,scroll:g.scrollTop,overlap:rect.some((a,i)=>rect.some((b,j)=>i!==j&&a.left<b.right-1&&a.right>b.left+1&&a.top<b.bottom-1&&a.bottom>b.top+1)),contained:cards.every(c=>{const a=c.getBoundingClientRect(),b=c.querySelector('canvas').getBoundingClientRect();return b.top>=a.top&&b.bottom<=a.bottom&&b.left>=a.left-1&&b.right<=a.right+1}),firstVisible:rect[0].top>=g.getBoundingClientRect().top-1,detail:g.getBoundingClientRect().right<=document.querySelector('#heroDetails').getBoundingClientRect().left};}''')
  check(f'10 non-overlapping bounded portrait cards {w}',geometry['count']==10 and not geometry['overlap'] and geometry['contained'] and geometry['detail'])
  check(f'first row starts fully visible {w}',geometry['scroll']==0 and geometry['firstVisible'])
  distinct=page.evaluate("()=>new Set([...document.querySelectorAll('#heroGrid canvas')].slice(0,8).map(c=>c.toDataURL())).size")
  check(f'original eight hero portraits remain distinct {w}',distinct==8)
  if w in (960,1600):page.screenshot(path=str(out/f'heroes-after-{w}.png'))
  page.locator('#heroGrid').evaluate('g=>g.scrollTop=g.scrollHeight');page.wait_for_timeout(600)
  page.screenshot(path=str(out/f'heroes-bottom-{w}.png'))
  (out/f'geometry-after-{w}.json').write_text(json.dumps(page.evaluate("()=>{const r=e=>{let a=e.getBoundingClientRect();return {x:a.x,y:a.y,w:a.width,h:a.height,bottom:a.bottom}};let g=document.querySelector('#heroGrid');return {grid:r(g),last:r(g.lastElementChild),page:r(document.querySelector('#page-heroes')),head:r(document.querySelector('#page-heroes>.page-heading')),scroll:g.scrollTop,maxScroll:g.scrollHeight-g.clientHeight};}"),indent=2))
  check(f'last roster row reachable {w}',page.locator('#heroGrid').evaluate("g=>{const a=g.getBoundingClientRect(),b=g.lastElementChild.getBoundingClientRect();return b.top>=a.top-1&&b.bottom<=a.bottom+1;}"))
  page.click('[data-page="home"]');page.click('[data-page="heroes"]');page.wait_for_timeout(500)
  check(f're-enter roster starts at top {w}',page.locator('#heroGrid').evaluate('g=>g.scrollTop===0'))
  check(f'no uncaught JS exceptions {w}',len(errors)==0)
  if w==960:
   # Inject a synthetic test swatch, NOT production artwork, to exercise cached sprite draws.
   ok=page.evaluate('''async()=>{let q=__VISUAL_QA,c=document.createElement('canvas');c.width=c.height=256;const z=c.getContext('2d');z.fillStyle='red';z.fillRect(110,10,36,225);const im=new Image();im.src=c.toDataURL();await im.decode();q.imageCache.set('weapon/sabre',im);
    const body=q.ASSET_CONFIG.images['hero/tounsi'],meta=q.ASSET_CONFIG.images['weapon/sabre'];meta.available=true;const calls=[];const ctx=document.createElement('canvas').getContext('2d');let f=ctx.drawImage.bind(ctx);ctx.drawImage=(...args)=>{calls.push(args);f(...args)};
    const player={character:'tounsi',attackTime:.24,attackDuration:.26,attackChain:1};
    let noDouble=q.drawHeroWeapon(ctx,player,1,11)===false&&calls.length===0;
    body.weaponLayer='separate';let drawn=q.drawHeroWeapon(ctx,player,1,11);let cached=calls.length===1&&calls[0][0]===im&&calls[0][3]===256&&calls[0][4]===256;
    body.weaponLayer='baked';q.imageCache.delete('weapon/sabre');return noDouble&&drawn&&cached;
   }''')
   check('weapon cache/sprite path works; baked body suppresses duplicate overlay',ok)
   # Missing optional media never turns into procedural art or blocks boot.
   check('missing real weapon returns false, not sticks',page.evaluate("()=>{let q=__VISUAL_QA,c=document.createElement('canvas').getContext('2d'),body=q.ASSET_CONFIG.images['hero/tounsi'];body.weaponLayer='separate';let ok=q.drawHeroWeapon(c,{character:'tounsi'},0)===false;body.weaponLayer='baked';return ok;}"))
  page.close()
 b.close()
(out/'browser-results.json').write_text(json.dumps({'method':'Chromium set_content using offline bundle; in-memory storage + test-only observation hooks. Not Android or network-origin verification.','passed':len(results),'checks':results},indent=2))
