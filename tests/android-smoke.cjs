// Real Android debug APK; its diagnostic probe is excluded from QA/release.
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const fs=require('node:fs'),{execFileSync}=require('node:child_process'),assert=require('node:assert/strict');
const adb=process.env.ADB||'adb',app='com.superwiss.game.playtest.debug';
const shell=(...args)=>execFileSync(adb,args,{encoding:'utf8'}).trim();
const results=[];function check(name,pass,detail){assert.ok(pass,name+': '+JSON.stringify(detail));results.push({name,pass:true,detail});console.log('PASS '+name);}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 shell('install','-r','app/build/outputs/apk/debug/app-debug.apk');shell('shell','am','force-stop',app);shell('shell','am','start','-W','-n',app+'/com.superwiss.game.playtest.MainActivity');
 let pid='';for(let retry=0;retry<40&&!pid;retry++){try{pid=shell('shell','pidof',app);}catch{}if(!pid)await sleep(500);}assert.ok(pid,'Android app process started');await sleep(1500);shell('forward','tcp:9322','localabstract:webview_devtools_remote_'+pid);
 let browser;for(let retry=0;retry<20&&!browser;retry++){try{browser=await chromium.connectOverCDP('http://127.0.0.1:9322',{timeout:4000});}catch(e){if(retry===19)throw e;await sleep(500);}}const context=browser.contexts()[0],page=context.pages()[0];page.setDefaultTimeout(12000);
 const pageErrors=[];page.on('pageerror',e=>pageErrors.push(String(e)));
 try{
 await page.locator('#bootEnter').waitFor({state:'visible'});check('Android boot reached Home stage',await page.locator('#bootStatus').innerText()==='Ready · offline adventure');await page.click('#bootEnter');
 await page.waitForFunction(()=>!!window.__QA);
 check('Android admission rejects incorrect six-digit code (no radio)',await page.evaluate(()=>{const h=new __QA.NearbySession({send(){}});h.hostLobby('847291');h.connected('slot1');return h.receive('slot1',JSON.stringify({type:'hello',protocol:__QA.LINK_PROTOCOL,code:'847292',profile:{name:'Test peer'}}))===false&&h.roster.length===1;}));
 check('all Android images decoded',await page.evaluate(()=>__QA.assetLoadState.done===__QA.assetLoadState.total&&__QA.assetLoadState.failed===0));
 await page.click('[data-page="heroes"]');await page.click('[data-hero="wissem"]');await page.click('#equipHero');
 await page.click('[data-page="pets"]');await page.click('[data-asc-pet="wolf"]');await page.click('#practicePetButton');await page.click('#playMapButton');if(await page.locator('#guideDone').isVisible())await page.click('#guideDone');
 await sleep(2200);check('world started',await page.evaluate(()=>__QA.run?.worldId===0&&__QA.run.mode==='practice'));
 const x=await page.evaluate(()=>__QA.run.player.x),stick=await page.locator('#analogControl').boundingBox();await page.mouse.move(stick.x+stick.width/2,stick.y+stick.height/2);await page.mouse.down();await page.mouse.move(stick.x+stick.width*.86,stick.y+stick.height/2);await sleep(450);await page.mouse.up();
 check('analog movement moves player',await page.evaluate(before=>__QA.run.player.x>before+20,x));
 await page.keyboard.down('Space');await sleep(160);check('jump rises',await page.evaluate(()=>__QA.run.player.vy<0));await page.keyboard.up('Space');await sleep(700);
 await page.click('#attackControl');await sleep(80);check('attack executed',await page.evaluate(()=>__QA.run.player.attackSerial>0));
 await page.click('#dodgeControl');await sleep(60);check('dodge spends stamina',await page.evaluate(()=>__QA.run.player.stamina<100&&__QA.run.player.dodgeCD>0));
 if(await page.locator('#powerGotIt').isVisible())await page.click('#powerGotIt');
 let knifeSpent=false;for(let attempt=0;attempt<3&&!knifeSpent;attempt++){if(await page.locator('#powerGotIt').isVisible())await page.click('#powerGotIt');await sleep(200);const before=await page.evaluate(()=>__QA.run.player.knives);await page.click('#knifeControl');await sleep(160);knifeSpent=await page.evaluate(n=>__QA.run.player.knives<n,before);}check('knife spends ammunition',knifeSpent,await page.evaluate(()=>({knives:__QA.run.player.knives,throwCD:__QA.run.player.throwCD})));
 await page.click('#skillControl');await sleep(650);await page.click('#skillControl2');await sleep(150);check('both hero skills execute',await page.evaluate(()=>__QA.run.skills>=2));
 await page.click('#summonControl');await sleep(120);check('temporary pet summon consumes a use',await page.evaluate(()=>__QA.run.player.petTime>0&&__QA.run.player.companionCharges<3));
 shell('shell','screencap','-p','/sdcard/wiss-gameplay.png');shell('pull','/sdcard/wiss-gameplay.png','artifacts/android-gameplay.png');
 if(await page.locator('#powerGotIt').isVisible())await page.click('#powerGotIt');
 await page.click('#pauseButton');await page.click('#leaveButton');await page.click('#confirmLeave');
 await page.click('#settingsButton');for(let slot=0;slot<4;slot++){await page.click('#openControlStudio');await page.click('[data-edit-slot="'+slot+'"]');await page.locator('#editorSelect').selectOption('jumpControl');await page.locator('#editorSize').fill(String(80+slot*5));await page.locator('#editorSize').dispatchEvent('input');await page.click('#editorSave');}
 check('four control presets save independently on Android',await page.evaluate(()=>__QA.save.controlPresets.every((p,i)=>p.buttons.jumpControl.size===80+i*5)));
 await page.click('#doneSettings');await page.click('[data-page="heroes"]');await page.click('[data-hero="garsi"]');await page.click('#equipHero');await page.click('[data-page="home"]');await page.click('#bossHuntButton');await page.click('[data-boss-tier="veteran"]');await page.click('[data-boss="0"]');await sleep(250);
 // The pilot changes only the same action booleans used by keyboard/gamepad input.
 const victory=await page.evaluate(()=>new Promise(resolve=>{let i=0;const started=performance.now();const loop=()=>{const r=__QA.run;if(!r||r.complete||r.failed||performance.now()-started>150000){__QA.clearInput();resolve({complete:r?.complete,failed:r?.failed,time:r?.bossTime,hits:r?.hits,bossHP:r?.boss.hp});return;}const p=r.player,b=r.boss,dx=b.x-p.x;let dest=b.x-73;if(b.x<220)dest=b.x+b.w+60;if(b.state==='windup'&&['slam','thorns','rain'].includes(b.attack))dest=p.x<700?1100:250;const delta=dest-p.x,dir=Math.abs(delta)>18?Math.sign(delta):0,threat=b.state==='attack'&&Math.abs(dx)<240||r.bossHazards.some(h=>h.warning<=.1&&Math.abs(h.x-p.x)<100&&Math.abs(h.y-p.y)<130);Object.assign(__QA.keys,{left:dir<0,right:dir>0,attack:true,knife:Math.abs(dx)<630&&p.facing===Math.sign(dx)&&Math.abs(p.y-b.y)<150,jump:b.state==='windup'&&b.clock<.24&&['dash','waves','slam','fan','orbs'].includes(b.attack)||threat&&p.grounded||p.x>280&&p.x<490&&p.grounded&&i%120<20,dodge:threat&&p.dodgeCD===0&&i%2===0,skill:i%3===0&&Math.abs(dx)<500,skill2:i%3===1&&Math.abs(dx)<240,summon:i%30===0&&b.state!=='intro',aimDown:p.y<b.y-10});i++;requestAnimationFrame(loop);};loop();}));
 check('boss defeated on Android using ordinary inputs',victory.complete,victory);await page.locator('#bossChoose').waitFor({state:'visible'});await sleep(150);shell('shell','screencap','-p','/sdcard/wiss-boss.png');shell('pull','/sdcard/wiss-boss.png','artifacts/android-boss-victory.png');
 check('no uncaught JS errors',pageErrors.length===0&&await page.evaluate(()=>SuperWissBoot.errors.length===0),pageErrors);
 const saveBefore=await page.evaluate(()=>localStorage.getItem('super-wiss:odyssey-v4'));fs.writeFileSync('artifacts/android-save-before.json',saveBefore);
 await page.reload();await page.locator('#bootEnter').waitFor({state:'visible'});check('save survives WebView restart',await page.evaluate(v=>localStorage.getItem('super-wiss:odyssey-v4')===v,saveBefore));await page.click('#bootEnter');
 await page.click('#nearbyButton');await page.click('#hostNearby');const code=await page.locator('.room-code strong').innerText();check('native room UI generates six digits',/^\d{6}$/.test(code),code);
 shell('shell','screencap','-p','/sdcard/wiss-room.png');shell('pull','/sdcard/wiss-room.png','artifacts/android-room.png');
 fs.writeFileSync('artifacts/android-smoke-results.json',JSON.stringify({device:shell('shell','getprop','ro.build.fingerprint'),results,pageErrors},null,2));
 }finally{fs.writeFileSync('artifacts/android-smoke-partial.json',JSON.stringify({results,pageErrors},null,2));await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
