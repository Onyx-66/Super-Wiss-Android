import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {VERSION} from '../game/data.js';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('v1.4.1 release metadata agrees without changing app identity',()=>{
 assert.equal(VERSION,'1.4.1');
 assert.equal(read('VERSION').trim(),VERSION);
 assert.equal(JSON.parse(read('package.json')).version,VERSION);
 assert.match(read('app/build.gradle'),/versionCode 46\b/);
 assert.ok(read('app/build.gradle').includes("versionName '1.4.1-playtest'"));
 assert.ok(read('app/build.gradle').includes("applicationId 'com.superwiss.game.playtest'"));
 assert.ok(!read('game/index.html').includes('1.3.1'));
});
