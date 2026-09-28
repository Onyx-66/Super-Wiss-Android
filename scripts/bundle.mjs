import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {compileContent} from './compile-content.mjs';
const root=path.resolve(import.meta.dirname,'..');
const data=compileContent();
const manifest=JSON.parse(fs.readFileSync(path.join(root,'assets/manifest.json'),'utf8'));
const embedded={},inventory=[];
const mime={'.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.ogg':'audio/ogg','.mp3':'audio/mpeg','.wav':'audio/wav'};
for(const [key,meta] of Object.entries({...manifest.images,...manifest.audio})){
 const file=path.resolve(root,meta.path);if(!file.startsWith(root+path.sep))throw Error('Unsafe asset path: '+meta.path);
 if(!mime[path.extname(file)])throw Error('Unsupported asset: '+file);
 if(!fs.existsSync(file)&&key.startsWith('weapon/')&&meta.optional===true){
  meta.available=false;inventory.push({key,path:meta.path,status:'awaiting-user-art'});continue;
 }
 if(meta.optional===true)meta.available=true;
 const bytes=fs.readFileSync(file);embedded[key]=`data:${mime[path.extname(file)]};base64,${bytes.toString('base64')}`;
 inventory.push({key,path:meta.path,size:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex')});
}
for(const h of data.heroes)if(!manifest.images[h.asset])throw Error('Missing hero asset '+h.asset);
for(const p of data.pets)if(!manifest.images['pet/'+p.id])throw Error('Missing pet '+p.id);
for(const w of data.maps){if(!manifest.images['tiles/'+w.tileSet])throw Error('Missing tileSet '+w.tileSet);if(!manifest.audio['music/'+w.music])throw Error('Missing music '+w.music);}
const order=['content','data','assets','bosses','controls','cosmetics','combat-profiles','hero-stats','equipment','wardrobe','ascension','world-physics','world-regions','placement','weapon-art','hero-presentation','engine','arena','link','social','ui-crops','icons','render','progress','audio','app','ascension-ui'];
const read=name=>fs.readFileSync(path.join(root,'game',name),'utf8');
const strip=name=>read(name+'.js').replace(/^import .*?;\s*$/gm,'').replace(/^export /gm,'');
const core=order.filter(n=>!['app','ascension-ui'].includes(n)).map(strip).join('\n');
const app=['app','ascension-ui','upgrade-ui','atelier-ui','ui-polish'].map(strip).join('\n');
const makeCode=assets=>'(()=>{\n"use strict";\n'+core.replace('/*__ASSET_CONFIG__*/{}',JSON.stringify(manifest)).replace('/*__ASSET_DATA__*/{}',JSON.stringify(assets))+'\n(async()=>{try{await assetsReady;\n'+app+'\n}catch(e){window.SuperWissBoot.fail(e);}})();\n})();';
const template=read('index.html'),css=read('style.css')+'\n'+read('atelier.css')+'\n'+read('ui-polish.css'),boot=read('boot.js');
const optionalFonts=[{name:'Pixelify Sans',file:'pixelify-sans-latin.woff2',weight:700},{name:'VT323',file:'vt323-latin.woff2',weight:400}];
function buildCss(embeddedMode){
 const faces=[];
 for(const font of optionalFonts){
  const source=path.join(root,'assets/fonts',font.file);if(!fs.existsSync(source))continue;
  const bytes=fs.readFileSync(source);if(bytes.toString('ascii',0,4)!=='wOF2')throw Error('Invalid optional WOFF2 font: '+font.file);
  const url=embeddedMode?'data:font/woff2;base64,'+bytes.toString('base64'):'assets/fonts/'+font.file;
  faces.push(`@font-face{font-family:'${font.name}';font-style:normal;font-weight:${font.weight};font-display:swap;src:url('${url}') format('woff2')}`);
 }
 return css.replace('/*__OPTIONAL_FONTS__*/',faces.join('\n')).replace(/url\(['"]asset:([^'"]+)['"]\)/g,(_,key)=>{
  if(!manifest.images[key])throw Error('Unknown CSS asset '+key);
  return 'url("'+(embeddedMode?embedded[key]:manifest.images[key].path)+'")';
 });
}
const resolveStaticImages=(markup,embeddedMode)=>markup.replace(/data-bundled-image="([^"]+)"/g,(_,key)=>{
 const meta=manifest.images[key];if(!meta||meta.available===false)throw Error('Missing branding image '+key);
 return 'src="'+(embeddedMode?embedded[key]:meta.path)+'"';
});
const html=template.replace('/*__STYLE__*/',()=>buildCss(true)).replace('/*__BOOT__*/',()=>boot).replace('/*__CODE__*/',()=>makeCode(embedded));
fs.mkdirSync(path.join(root,'dist'),{recursive:true});
const browserHtml=resolveStaticImages(html,true);
fs.writeFileSync(path.join(root,'dist/Super-Wiss-Odyssey.html'),browserHtml);
const assets=path.join(root,'app/src/main/assets');fs.mkdirSync(assets,{recursive:true});
// Android uses small documents and raw streamed media, never base64 media in Java.
let android=template.replace('<style>/*__STYLE__*/</style>','<link rel="stylesheet" href="style.css">')
 .replace('<script>/*__BOOT__*/</script>','<script src="boot.js"></script>')
 .replace('<script>/*__CODE__*/</script>','<script src="game.js" defer></script>')
 .replace("script-src 'unsafe-inline'", "script-src 'self'").replace("style-src 'unsafe-inline'", "style-src 'self' 'unsafe-inline'")
 .replace('img-src data:', "img-src 'self' data:").replace('media-src data:', "media-src 'self' data:");
android=resolveStaticImages(android,false);
for(const [name,content] of Object.entries({'game.html':android,'game.js':makeCode({}),'boot.js':boot,'style.css':buildCss(false)}))fs.writeFileSync(path.join(assets,name),content);
for(const meta of Object.values({...manifest.images,...manifest.audio})){
 const target=path.join(assets,meta.path);if(meta.available===false){fs.rmSync(target,{force:true});continue;}fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(path.join(root,meta.path),target);
}
for(const font of optionalFonts){const source=path.join(root,'assets/fonts',font.file);if(fs.existsSync(source)){const dest=path.join(assets,'assets/fonts',font.file);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(source,dest);}}
for(const name of fs.readdirSync(path.join(root,'licenses')))fs.copyFileSync(path.join(root,'licenses',name),path.join(assets,name));
fs.writeFileSync(path.join(root,'docs/ASSET-INVENTORY.json'),JSON.stringify(inventory,null,2)+'\n');
console.log(`Bundled ${data.maps.length} maps, ${inventory.filter(x=>x.size!==undefined).length} present assets + ${inventory.filter(x=>x.status==='awaiting-user-art').length} pending weapons; Android shell ${Buffer.byteLength(android)} bytes; browser ${(Buffer.byteLength(browserHtml)/1024/1024).toFixed(2)} MiB.`);

// Debug-only diagnostic access for emulator tests; QA/release assets have no probe.
const debugAssets=path.join(root,'app/src/debug/assets');fs.mkdirSync(debugAssets,{recursive:true});
const probe="window.__QA={get run(){return run},get save(){return save},get audio(){return audio},get nearby(){return nearby},keys,assetLoadState,clearInput,NearbySession,LINK_PROTOCOL};\n";
fs.writeFileSync(path.join(debugAssets,'game.js'),makeCode({}).replace("window.addEventListener('boot-enter'",probe+"window.addEventListener('boot-enter'"));
