const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../app/src/main/assets');
const server=http.createServer((req,res)=>{const pathname=new URL(req.url,'http://localhost').pathname;const file=path.join(root,pathname);if(!file.startsWith(root+path.sep)||!fs.existsSync(file)){res.writeHead(404);return res.end();}res.setHeader('Content-Type',file.endsWith('.js')?'application/javascript':file.endsWith('.css')?'text/css':file.endsWith('.html')?'text/html':file.endsWith('.png')?'image/png':file.endsWith('.ogg')?'audio/ogg':'application/octet-stream');fs.createReadStream(file).pipe(res);});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const url='http://127.0.0.1:'+server.address().port+'/game.html';
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const context=await browser.newContext({viewport:{width:960,height:440},hasTouch:true});const page=await context.newPage();let errors=[];page.on('pageerror',e=>errors.push(String(e)));const results=[];
 const check=(name,value)=>{assert.ok(value,name);results.push(name);console.log('PASS '+name);};
 try {
 await page.goto(url);await page.locator('#bootEnter').waitFor({state:'visible'});
 check('streamed bundle reaches ready without JS errors',errors.length===0);
 await page.screenshot({path:'artifacts/boot-loading-browser.png'});await page.click('#bootEnter');
 check('home is visible',await page.locator('#page-home').isVisible());
 await page.screenshot({path:'artifacts/home-browser.png'});


 await page.click('[data-page="forge"]');check('eight accessory slots appear',await page.locator('[data-part]').count()===8);await page.locator('[data-part="head"]').selectOption('frost');
 check('individual accessory saves',await page.evaluate(()=>JSON.parse(localStorage.getItem('super-wiss:odyssey-v4')).ascension.parts.wissem.head==='frost'));
 await page.click('[data-page="profile"]');check('guilds remain a placeholder',(await page.locator('#profileContent').innerText()).includes('Guilds — Coming later'));
 await page.click('[data-page="records"]');await page.locator('#rankMode').selectOption('raid');check('empty raid history has no fake players',(await page.locator('#recordContent').innerText()).includes('No record yet'));
 await page.click('[data-page="home"]');
 await page.click('#settingsButton');
 for(let slot=0;slot<4;slot++){
  await page.click('#openControlStudio');await page.click('[data-edit-slot="'+slot+'"]');
  await page.locator('#editorSelect').selectOption('jumpControl');
  await page.locator('#editorSize').fill(String(78+slot*6));await page.locator('#editorSize').dispatchEvent('input');
  await page.locator('#editorOpacity').fill(String(55+slot*5));await page.locator('#editorOpacity').dispatchEvent('input');
  await page.click('#editorMirror');await page.click('#editorSave');
 }
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('super-wiss:odyssey-v4')));
 check('four independently saved preset sizes',saved.controlPresets.every((p,i)=>p.buttons.jumpControl.size===78+i*6));
 const {defaultControlPreset}=await import('../game/controls.js');check('all controls mirror within each preset',saved.controlPresets.every((p,i)=>Object.entries(p.buttons).every(([id,b])=>Math.abs(b.x-(1-defaultControlPreset(i).buttons[id].x))<.00001)&&p.buttons.jumpControl.opacity>=.55));
 for(let slot=0;slot<4;slot++){await page.click('[data-layout="'+slot+'"]');check('one-tap preset '+String.fromCharCode(65+slot),await page.evaluate(i=>JSON.parse(localStorage.getItem('super-wiss:odyssey-v4')).controlActive===i,slot));}
 await page.click('#doneSettings');
 await page.evaluate(()=>localStorage.setItem('boot-regression-sentinel','preserve'));await page.reload();await page.locator('#bootEnter').waitFor({state:'visible'});
 check('stable origin survives reload',await page.evaluate(()=>localStorage.getItem('boot-regression-sentinel')==='preserve'));
 await page.route('**/game.js',r=>r.fulfill({contentType:'application/javascript',body:'const broken = ;'}));await page.reload();await page.locator('#bootRecovery').waitFor({state:'visible'});
 check('syntax failure exposes recovery',await page.locator('#bootRetry').isVisible());await page.unroute('**/game.js');await page.click('#bootRetry');await page.locator('#bootEnter').waitFor({state:'visible'});
 check('retry recovers after startup fault',true);
 const manifest=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../assets/manifest.json')));const missing=Object.values(manifest.images)[0].path;
 await page.route('**/'+missing,r=>r.fulfill({status:404,body:''}));await page.reload();await page.locator('#bootRecovery').waitFor({state:'visible'});
 check('missing image produces named asset error',(await page.locator('#bootError').innerText()).includes('assets:'));
 await page.click('#bootSafe');await page.locator('#bootEnter').waitFor({state:'visible'});
 check('safe mode tolerates missing artwork',await page.evaluate(()=>SuperWissBoot.safe));
 check('safe mode keeps stored data',await page.evaluate(()=>localStorage.getItem('boot-regression-sentinel')==='preserve'));
 await page.unroute('**/'+missing);
 fs.writeFileSync('artifacts/boot-browser-results.json',JSON.stringify({results,expectedSyntaxErrors:errors},null,2));
 } finally {await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
