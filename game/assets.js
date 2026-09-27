/** Assets are normal editable files. The offline builder embeds them without network requests. */

export const ASSET_CONFIG=/*__ASSET_CONFIG__*/{};

export const EMBEDDED_ASSETS=/*__ASSET_DATA__*/{};

const imageCache=new Map();

export function assetUrl(key){if(ASSET_CONFIG.images?.[key+'/still'])key+='/still';const meta=ASSET_CONFIG.images?.[key]||ASSET_CONFIG.audio?.[key];return EMBEDDED_ASSETS[key]||meta?.path||'';}

export function assetImage(key){return imageCache.get(key);}

export function sprite(c,key,x,y,w,h,frame=0){

 const im=imageCache.get(key);if(!im?.complete||!im.naturalWidth)return false;

 const cfg=ASSET_CONFIG.images[key],fw=cfg.frameWidth||im.naturalWidth,fh=cfg.frameHeight||im.naturalHeight,n=cfg.frames||1;

 const fi=((Math.floor(frame)%n)+n)%n,cols=Math.floor(im.naturalWidth/fw);

 c.imageSmoothingEnabled=false;c.drawImage(im,(fi%cols)*fw,Math.floor(fi/cols)*fh,fw,fh,x,y,w,h);return true;

}

const activeImageEntries=Object.entries(ASSET_CONFIG.images||{}).filter(([,meta])=>meta.available!==false);
export const assetLoadState={done:0,total:activeImageEntries.length,failed:0,missing:[],pending:Object.entries(ASSET_CONFIG.images||{}).filter(([,meta])=>meta.available===false).map(([key])=>key)};

// Bound decode concurrency and timeouts: a missing file cannot stall boot forever.

export const assetsReady=typeof Image==='undefined'?Promise.resolve():loadArtwork();

async function loadArtwork(){

 const boot=globalThis.SuperWissBoot;

 boot?.stage('Load config',8);

 if(!ASSET_CONFIG.images||!ASSET_CONFIG.audio)throw Error('Asset configuration is missing');

 boot?.stage('Load assets',12);

 const queue=[...activeImageEntries],workers=Array.from({length:boot?.safe?2:6},async()=>{

  while(queue.length){const [key,meta]=queue.shift();await new Promise(resolve=>{

   const im=new Image();imageCache.set(key,im);let settled=false;

   const done=ok=>{if(settled)return;settled=true;clearTimeout(timer);im.onload=im.onerror=null;assetLoadState.done++;

    if(!ok){assetLoadState.failed++;assetLoadState.missing.push(key);console.error('[SuperWissAssets] Missing or invalid image: '+key+' ('+meta.path+')');}

    boot?.stage('Load assets · '+assetLoadState.done+' / '+assetLoadState.total,12+58*assetLoadState.done/assetLoadState.total);resolve();};

   const timer=setTimeout(()=>done(false),10000);im.onload=()=>done(im.naturalWidth>0);im.onerror=()=>done(false);im.src=EMBEDDED_ASSETS[key]||meta.path||'';

  });}

 });await Promise.all(workers);

 if(assetLoadState.failed&&!boot?.safe)throw Error('Could not load '+assetLoadState.failed+' assets: '+assetLoadState.missing.slice(0,4).join(', ')+'. Retry or use Safe Mode.');

}

