export function analogVector(dx,dy,radius=50,sensitivity=1){
 if(!Number.isFinite(dx)||!Number.isFinite(dy)||!(radius>0))return {axis:0,aim:0,x:0,y:0};
 const len=Math.hypot(dx,dy),m=Math.min(1,len/radius),dead=.16;
 if(m<=dead)return {axis:0,aim:0,x:dx/radius,y:dy/radius};
 const gain=Math.min(1,(m-dead)/(1-dead)*sensitivity),n=len||1;
 return {axis:dx/n*gain,aim:dy/n*gain,x:dx/n*m,y:dy/n*m};
}

export const CONTROL_IDS=['analogControl','leftControl','rightControl','jumpControl','attackControl','knifeControl','dodgeControl','skillControl','skillControl2','summonControl','petControl','petControl2','sprintControl','pauseButton','interactControl','crouchControl'];
const ctrlBound=(v,a,b)=>Math.max(a,Math.min(b,v));
export function defaultControlPreset(index=0){
 const coords={crouchControl:[.31,.8,46],analogControl:[.12,.77,120],leftControl:[.07,.78,58],rightControl:[.18,.78,58],jumpControl:[.925,.83,76],attackControl:[.89,.59,64],knifeControl:[.78,.44,48],dodgeControl:[.805,.86,58],skillControl:[.675,.62,52],skillControl2:[.78,.64,52],summonControl:[.68,.86,54],petControl:[.545,.85,48],petControl2:[.465,.85,48],sprintControl:[.255,.88,44],interactControl:[.56,.62,52],pauseButton:[.035,.08,44]};
 const buttons={};for(const [id,[x,y,size]] of Object.entries(coords)){buttons[id]={x:index===3?1-x:x,y,size:size*(index===1&&['jumpControl','attackControl','dodgeControl'].includes(id)?1.12:index===2&&id==='jumpControl'?1.2:1),opacity:.82};}
 return {name:['Preset A','Preset B','Preset C','Preset D'][index]||'Custom',mode:'analog',buttons};
}
export function sanitizeControlPresets(raw){return Array.from({length:4},(_,i)=>{const d=defaultControlPreset(i),s=raw?.[i];if(!s||typeof s!=='object')return d;d.name=String(s.name||d.name).replace(/[<>]/g,'').slice(0,16);d.mode=s.mode==='arrows'?'arrows':'analog';for(const id of CONTROL_IDS){const b=s.buttons?.[id];if(!b)continue;for(const [k,a,z]of [['x',.02,.98],['y',.045,.955],['size',44,152],['opacity',.25,1]])if(Number.isFinite(b[k]))d.buttons[id][k]=ctrlBound(b[k],a,z);}return d;});}
export function controlRect(b,w,h){const size=Math.min(Math.max(44,b.size*Math.min(w/844,h/390)),Math.min(w,h)*.42);return {size,x:ctrlBound(b.x*w,size/2+8,w-size/2-8),y:ctrlBound(b.y*h,size/2+6,h-size/2-6)};}
