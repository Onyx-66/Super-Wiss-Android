import { cleanPeerProfile } from './arena.js';
/** HTTPS account client. Tokens never enter Bluetooth payloads or profile exports. */
export function normalizeOrigin(value){const u=new URL(value);if(u.protocol!=='https:'||u.username||u.password||u.search||u.hash||u.pathname!=='/')throw Error('Enter an HTTPS server origin without a path, for example https://accounts.example.com');return u.origin;}
export function accountUser(value){
 if(!value||!(/^[a-f0-9]{24}$/).test(value.id)||!(/^[a-z0-9_]{3,24}$/).test(value.username)||!(/^[A-F0-9]{10}$/).test(value.code))throw Error('The server returned an invalid player profile.');
 return {id:value.id,username:value.username,code:value.code,...cleanPeerProfile(value)};
}
export function accountResponse(value){
 if(!value||typeof value!=='object'||Array.isArray(value))throw Error('Invalid account server response.');
 if(value.user)value.user=accountUser(value.user);
 for(const k of ['friends','incoming','outgoing'])if(k in value){if(!Array.isArray(value[k])||value[k].length>500)throw Error('The server returned an oversized friend list.');value[k]=value[k].map(accountUser);}
 if('token' in value&&!/^[a-f0-9]{64}$/.test(value.token))throw Error('The server returned an invalid login token.');
 return value;
}
export class AccountClient {
 constructor(store,native=null){this.store=store;this.native=native;this.token='';this.user=null;this.origin='';try{const x=JSON.parse(store.getItem('sw-account-v1')||'{}');this.origin=x.origin?normalizeOrigin(x.origin):'';this.token=/^[a-f0-9]{64}$/.test(x.token||'')?x.token:'';}catch{}if(this.origin)this.native?.setApiOrigin(this.origin);}
 save(){try{this.store.setItem('sw-account-v1',JSON.stringify({origin:this.origin,token:this.token}));}catch{}}
 configure(origin){this.origin=origin.trim()?normalizeOrigin(origin.trim()):'';this.token='';this.user=null;this.native?.setApiOrigin(this.origin);this.save();}
 async request(path,method='GET',data){if(!this.origin)throw Error('Configure the account server first. Offline play needs no account.');const abort=new AbortController(),timer=setTimeout(()=>abort.abort(),12000);try{const res=await fetch(this.origin+path,{method,headers:{'Content-Type':'application/json',...(this.token?{Authorization:'Bearer '+this.token}:{})},body:data?JSON.stringify(data):undefined,signal:abort.signal,credentials:'omit',redirect:'error'});const o=await res.json();if(!res.ok)throw Error(String(o.error||'Request failed').slice(0,300));return accountResponse(o);}catch(e){if(e.name==='AbortError')throw Error('Server timed out. Your offline game is unaffected.');throw e;}finally{clearTimeout(timer);}}
 async login(kind,form){const o=await this.request('/api/'+kind,'POST',form);this.token=o.token;this.user=o.user;this.save();return o;}
 async me(){const o=await this.request('/api/me');this.user=o.user;return o.user;}
 async update(profile){const o=await this.request('/api/profile','PATCH',profile);this.user=o.user;return o.user;}
 async logout(){try{if(this.token)await this.request('/api/logout','POST',{});}finally{this.token='';this.user=null;this.save();}}
 async remove(password){await this.request('/api/account','DELETE',{password});this.token='';this.user=null;this.save();}
}
