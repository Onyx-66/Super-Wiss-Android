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
 for(const [width,height] of [[640,360],[800,360],[1280,720],[960,440]]){
 await page.setViewportSize({width,height});await page.goto(url);await page.locator('#bootEnter').waitFor({state:'visible'});await page.click('#bootEnter');
 await page.click('[data-page="heroes"]');
 const geometry=await page.locator('#heroGrid').evaluate(grid=>{const cards=[...grid.children],r=cards.map(e=>e.getBoundingClientRect());return {count:r.length,overlap:r.some((a,i)=>r.some((b,j)=>i!==j&&a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top)),names:cards.every(c=>c.querySelector('strong').scrollWidth<=c.clientWidth),detail:grid.getBoundingClientRect().right<=document.querySelector('#heroDetails').getBoundingClientRect().left};});
 check(`Heroes no overlap / clipped names ${width}x${height}`,geometry.count===10&&!geometry.overlap&&geometry.names&&geometry.detail);
 await page.screenshot({path:`artifacts/v130-heroes-${width}.png`});
 await page.click('[data-page="forge"]');check('Shop has carousel, no hero dropdown',await page.locator('#forgeHero').count()===0&&await page.locator('#forgeNext').count()===1);const before=await page.locator('#forgeHeroCard').innerText();await page.click('#forgeNext');check('Carousel refreshes hero and accessories',before!==await page.locator('#forgeHeroCard').innerText()&&await page.locator('[data-part]').count()===8);
 await page.click('[data-page="records"]');check('Records fill width',await page.locator('.record-dashboard').evaluate(e=>e.getBoundingClientRect().width>innerWidth*.85));await page.screenshot({path:`artifacts/v130-records-${width}.png`});
 await page.click('[data-page="profile"]');for(const tab of ['Overview','Achievements','Heroes','Cosmetics','Records','Social']){await page.click(`[data-profile-tab="${tab}"]`);check('Profile '+tab,(await page.locator('.profile-tab-body').innerText()).trim().length>20);}
 await page.click('[data-profile-tab="Overview"]');await page.screenshot({path:`artifacts/v130-profile-${width}.png`});
 }
 check('No uncaught UI errors',errors.length===0);fs.writeFileSync('artifacts/v130-ui-results.json',JSON.stringify({results,errors},null,2));
 } finally {await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
