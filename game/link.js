import { LINK_PROTOCOL, LocalMatch, cleanPeerProfile, validSnapshot } from './arena.js';
export function roomCode(){if(!globalThis.crypto?.getRandomValues)throw Error('Secure random room codes are unavailable.');const n=new Uint32Array(1);crypto.getRandomValues(n);return String(n[0]%1000000).padStart(6,'0');}
export function validRoomCode(code){return typeof code==='string'&&/^\d{6}$/.test(code);}
/** Paired RFCOMM establishes the radio connection; the code admits a peer to a lobby.
 * It is not internet matchmaking and is not a replacement for Bluetooth pairing. */
export class NearbySession{
 constructor({send,onChange=()=>{},profile={},onError=()=>{},onReject=()=>{}}){Object.assign(this,{send,onChange,onError,onReject,profile:cleanPeerProfile(profile),host:false,id:null,roster:[],mode:'raid',world:0,difficulty:'nightmare',match:null,snapshot:null,state:'idle',sequence:0,snapshotClock:0,inputClock:0,lastPacket:0,sessionId:'',lastSnapshotTick:-1,roomCode:'',joinCode:''});this.connections=new Set();this.rejections=new Map();}
 hostLobby(code=roomCode()){if(!validRoomCode(code))throw Error('A room code must have six digits.');this.roomCode=code;this.host=true;this.id='host';this.state='lobby';this.roster=[{id:'host',profile:this.profile,ready:true}];this.changed();}
 prepareJoin(code){if(!validRoomCode(code))throw Error('Enter all six digits.');this.joinCode=code;this.state='connecting';}
 connected(peer){if(!/^(host|slot[123])$/.test(peer))return;this.connections.add(peer);if(!this.host){this.state='connecting';this.send(peer,{type:'hello',protocol:LINK_PROTOCOL,code:this.joinCode,profile:this.profile});}else if(this.state!=='lobby')this.reject(peer,'Match in progress. Join the next lobby.');}
 reject(peer,text){const attempts=(this.rejections.get(peer)||0)+1;this.rejections.set(peer,attempts);this.send(peer,{type:'error',protocol:LINK_PROTOCOL,text});if(attempts>=3){this.onReject(peer);this.connections.delete(peer);}return false;}
 disconnected(peer){const admitted=this.roster.some(p=>p.id===peer);this.connections.delete(peer);if(admitted&&this.state==='playing'){this.state='ended';this.match=null;this.snapshot=null;this.onError('A player disconnected. Match cancelled; no ranked result recorded.');}if(this.host)this.roster=this.roster.filter(p=>p.id!==peer);else if(!this.connections.size)this.state='idle';this.broadcastLobby();this.changed();}
 broadcast(message){for(const p of this.connections)if(this.roster.some(r=>r.id===p))this.send(p,message);}
 broadcastLobby(){if(this.host&&this.state==='lobby')this.broadcast({type:'lobby',protocol:LINK_PROTOCOL,roster:this.roster,mode:this.mode,world:this.world,difficulty:this.difficulty,code:this.roomCode});}
 changed(){this.onChange(this);}
 receive(peer,raw){if(typeof raw!=='string'||raw.length>65536)return false;let m;try{m=JSON.parse(raw);}catch{return false;}if(!m||typeof m.type!=='string'||m.protocol!==LINK_PROTOCOL||!this.connections.has(peer))return false;
  if(this.host){const existing=this.roster.find(p=>p.id===peer);
   if(m.type==='hello'&&this.state==='lobby'&&/^slot[123]$/.test(peer)){
    if(!validRoomCode(m.code)||m.code!==this.roomCode)return this.reject(peer,'Incorrect room code. Ask your host for the six digits.');
    if((this.rejections.get(peer)||0)>=3)return false;
    if(!existing&&this.roster.length<4)this.roster.push({id:peer,profile:cleanPeerProfile(m.profile),ready:false});
    this.send(peer,{type:'welcome',protocol:LINK_PROTOCOL,id:peer,code:this.roomCode});this.broadcastLobby();this.changed();return true;
   }
   if(!existing)return false;
   if(m.type==='ready'&&this.state==='lobby'){existing.ready=m.ready===true;this.broadcastLobby();this.changed();return true;}
   if(m.type==='input'&&this.state==='playing'&&m.session===this.sessionId)return this.match.input(peer,m);
  }else{
   if(m.type==='welcome'&&/^slot[123]$/.test(m.id)&&m.code===this.joinCode){this.id=m.id;this.roomCode=m.code;this.state='lobby';return true;}
   if(!this.id&&m.type!=='error')return false;
   if(m.type==='lobby'&&Array.isArray(m.roster)&&m.roster.length<=4&&m.roster.every(p=>p&&/^(host|slot[123])$/.test(p.id))&&new Set(m.roster.map(p=>p.id)).size===m.roster.length){this.roster=m.roster.map(p=>({id:p.id,ready:p.ready===true,profile:cleanPeerProfile(p.profile)}));this.mode=['raid','together','ffa','teams'].includes(m.mode)?m.mode:'raid';this.world=Number.isInteger(m.world)&&m.world>=0&&m.world<15?m.world:0;this.difficulty=['veteran','nightmare','inferno'].includes(m.difficulty)?m.difficulty:'nightmare';this.state='lobby';this.changed();return true;}
   if(m.type==='start'&&this.state==='lobby'&&typeof m.session==='string'&&m.session.length<=50){this.sessionId=m.session;this.sequence=0;this.lastSnapshotTick=-1;this.lastPacket=performance.now();this.state='playing';this.changed();return true;}
   if(m.type==='snapshot'&&m.session===this.sessionId&&this.state==='playing'&&Number.isInteger(m.tick)&&m.tick>this.lastSnapshotTick&&validSnapshot(m)){this.snapshot=m;this.lastSnapshotTick=m.tick;this.lastPacket=performance.now();if(m.finished)this.state='results';this.changed();return true;}
   if(m.type==='error'){this.onError(String(m.text).slice(0,160));return true;}
  }return false;
 }
 ready(value){if(this.host)return;for(const peer of this.connections)this.send(peer,{type:'ready',protocol:LINK_PROTOCOL,ready:!!value});}
 configure(mode,world,difficulty){if(!this.host||this.state!=='lobby')return;this.mode=['raid','together','ffa','teams'].includes(mode)?mode:'raid';this.world=Number.isInteger(world)&&world>=0&&world<15?world:0;this.difficulty=['veteran','nightmare','inferno'].includes(difficulty)?difficulty:'nightmare';for(const p of this.roster)if(p.id!=='host')p.ready=false;this.broadcastLobby();this.changed();}
 start(){if(!this.host||this.state!=='lobby'||this.roster.some(p=>!p.ready))throw Error('Every player must be ready.');this.match=new LocalMatch({mode:this.mode,world:this.world,roster:this.roster,difficulty:this.difficulty});this.state='playing';this.sequence=0;this.sessionId=Date.now().toString(36)+'-'+roomCode();this.broadcast({type:'start',protocol:LINK_PROTOCOL,session:this.sessionId});this.changed();}
 step(input,dt){if(this.state!=='playing')return;
  if(this.host){this.match.input('host',{seq:++this.sequence,input});this.match.step(dt);this.snapshotClock+=dt;if(this.snapshotClock>=1/(this.roster.length<=2?20:12)||this.match.finished){this.snapshotClock=0;this.snapshot={...this.match.snapshot(),session:this.sessionId};this.broadcast(this.snapshot);if(this.match.finished){this.state='results';this.changed();}}}
  else{this.inputClock+=dt;if(this.inputClock>=1/30){this.inputClock=0;for(const peer of this.connections)this.send(peer,{type:'input',protocol:LINK_PROTOCOL,session:this.sessionId,seq:++this.sequence,input});}if(this.lastPacket&&performance.now()-this.lastPacket>6000){this.state='ended';this.onError('Host stopped responding. Match cancelled.');this.changed();}}
 }
 rematch(){if(!this.host)return;this.match=null;this.snapshot=null;this.state='lobby';for(const p of this.roster)p.ready=p.id==='host';this.broadcastLobby();this.changed();}
 stop(){this.state='idle';this.connections.clear();this.match=null;this.snapshot=null;this.roster=[];this.changed();}
}
