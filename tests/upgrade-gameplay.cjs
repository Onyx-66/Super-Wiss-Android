const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../app/src/main/assets');
const server=http.createServer((req,res)=>{const pathname=new URL(req.url,'http://localhost').pathname;const file=pathname==='/game.js'?path.resolve(__dirname,'../app/src/debug/assets/game.js'):path.join(root,pathname);if((!file.startsWith(root+path.sep)&&pathname!=='/game.js')||!fs.existsSync(file)){res.writeHead(404);return res.end();}res.setHeader('Content-Type',file.endsWith('.js')?'application/javascript':file.endsWith('.css')?'text/css':file.endsWith('.html')?'text/html':file.endsWith('.png')?'image/png':file.endsWith('.ogg')?'audio/ogg':'application/octet-stream');fs.createReadStream(file).pipe(res);});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const url='http://127.0.0.1:'+server.address().port+'/game.html';
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const context=await browser.newContext({viewport:{width:960,height:440},hasTouch:true});const page=await context.newPage();let errors=[];page.on('pageerror',e=>errors.push(String(e)));const results=[];
 const check=(name,value)=>{assert.ok(value,name);results.push(name);console.log('PASS '+name);};
 try {
 await page.goto(url);await page.locator('#bootEnter').waitFor({state:'visible'});await page.click('#bootEnter');await page.click('#settingsButton');await page.getByText('Camera Lab · offline practice',{exact:true}).click();await page.click('#cameraStart');if(await page.locator('#guideDone').isVisible())await page.click('#guideDone');await page.waitForTimeout(500);
 await page.keyboard.down('KeyC');await page.waitForTimeout(120);check('keyboard crouch changes collision height',await page.evaluate(()=>__QA.run.player.h===26));await page.keyboard.up('KeyC');await page.waitForTimeout(100);check('standing restores collision height',await page.evaluate(()=>__QA.run.player.h===44));
 check('active skills have no visible caption',await page.locator('#skillCaption').evaluate(e=>getComputedStyle(e).display==='none'));
 // Isolated UI fixture: place one real pickup at the player to test the discovery lifecycle.
 await page.evaluate(()=>{const r=__QA.run;r.level.pickups.push({x:r.player.x,y:r.player.y,w:28,h:28,type:'heart',taken:false});});await page.locator('#powerGotIt').waitFor({state:'visible'});const time=await page.evaluate(()=>__QA.run.mapTime);await page.waitForTimeout(300);check('first discovery safely pauses simulation',await page.evaluate(t=>__QA.run.mapTime===t,time));await page.screenshot({path:'artifacts/v130-discovery-browser.png'});await page.click('#powerGotIt');
 check('discovery persists once per save',await page.evaluate(()=>JSON.parse(localStorage.getItem('super-wiss:odyssey-v4')).discoveredPowerUps.includes('heart')));
 await page.evaluate(()=>{const r=__QA.run;r.level.pickups.push({x:r.player.x,y:r.player.y,w:28,h:28,type:'heart',taken:false});});await page.waitForTimeout(200);check('repeat pickup does not interrupt',!await page.locator('#powerGotIt').isVisible());await page.screenshot({path:'artifacts/v130-gameplay-browser.png'});
 check('no runtime exceptions',errors.length===0);fs.writeFileSync('artifacts/v130-gameplay-browser-results.json',JSON.stringify({results,errors,fixture:'Two healing pickups spawned at player solely to test tutorial UI; no world completion claimed'},null,2));
 } finally {await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
