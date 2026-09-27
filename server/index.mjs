/** Super Wiss account/social service. No score submission or cloud-save endpoint.
 * TLS terminates at Caddy in deployment. Never log credentials, tokens or bodies. */
import http from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { randomBytes, scrypt as rawScrypt, timingSafeEqual, createHash } from 'node:crypto';
import { promisify } from 'node:util';
import { pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
const scrypt = promisify(rawScrypt), sha = x => createHash('sha256').update(x).digest('hex');
const hex = (n=24) => randomBytes(n).toString('hex');
const VALID_AVATARS=['wissem','kossay','yakine','taky','garsi','tounsi','youssef','loey','rayan','mira'];
export function cleanProfile(p={}) { return {name:String(p.name||'Explorer').replace(/[^a-zA-Z0-9 _-]/g,'').trim().slice(0,20)||'Explorer',avatar:VALID_AVATARS.includes(p.avatar)?p.avatar:'wissem',banner:['aurora','ember','void','tide'].includes(p.banner)?p.banner:'aurora',frame:['silver','gold','thorns','astral'].includes(p.frame)?p.frame:'silver'}; }
async function passHash(password,salt=hex(16)) { return salt+':'+(await scrypt(password,salt,32,{N:32768,r:8,p:1,maxmem:64*1024*1024})).toString('hex'); }
async function passOK(password,encoded){ const [salt,hash]=encoded.split(':');const value=(await passHash(password,salt)).split(':')[1];return timingSafeEqual(Buffer.from(value,'hex'),Buffer.from(hash,'hex')); }
const validPass=p=>typeof p==='string'&&p.length>=12&&p.length<=128;
export function createAccountServer({dbPath=process.env.DATABASE_PATH||'data/accounts.sqlite',origins=(process.env.ALLOWED_ORIGINS||'https://appassets.androidplatform.net').split(','),rateLimit=true,secure=process.env.NODE_ENV==='production'}={}) {
 if(dbPath!==':memory:')mkdirSync(path.dirname(dbPath),{recursive:true});
 const db=new DatabaseSync(dbPath);db.exec(`PRAGMA journal_mode=WAL;PRAGMA foreign_keys=ON;
 CREATE TABLE IF NOT EXISTS accounts(id TEXT PRIMARY KEY,username TEXT UNIQUE NOT NULL,password TEXT NOT NULL,recovery TEXT NOT NULL,code TEXT UNIQUE NOT NULL,profile TEXT NOT NULL,created INTEGER NOT NULL);
 CREATE TABLE IF NOT EXISTS sessions(hash TEXT PRIMARY KEY,user TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,expires INTEGER NOT NULL);
 CREATE TABLE IF NOT EXISTS requests(sender TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,recipient TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,created INTEGER NOT NULL,PRIMARY KEY(sender,recipient));
 CREATE TABLE IF NOT EXISTS friends(a TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,b TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,PRIMARY KEY(a,b));
 CREATE TABLE IF NOT EXISTS blocks(owner TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,target TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,PRIMARY KEY(owner,target));
 CREATE TABLE IF NOT EXISTS reports(id TEXT PRIMARY KEY,reporter TEXT REFERENCES accounts(id) ON DELETE SET NULL,target TEXT REFERENCES accounts(id) ON DELETE SET NULL,reason TEXT NOT NULL,created INTEGER NOT NULL,status TEXT NOT NULL DEFAULT 'open');`);
 const buckets=new Map();let lastSweep=0;const now=()=>Date.now();
 const rate=(key,max,window=60000)=>{if(!rateLimit)return;const t=now();if(t-lastSweep>60000){for(const[k,v]of buckets)if(v.until<t)buckets.delete(k);db.prepare('DELETE FROM sessions WHERE expires < ?').run(t);lastSweep=t;}if(buckets.size>10000)throw Object.assign(Error('Server busy; retry later.'),{status:503});let b=buckets.get(key);if(!b||b.until<t){b={n:0,until:t+window};buckets.set(key,b);}if(++b.n>max)throw Object.assign(Error('Too many attempts. Try again later.'),{status:429});};
 const error=(message,status=400)=>{throw Object.assign(Error(message),{status});};
 const publicUser=u=>({id:u.id,username:u.username,code:u.code,...JSON.parse(u.profile)});
 const blocked=(a,b)=>!!db.prepare('SELECT 1 FROM blocks WHERE (owner=? AND target=?) OR (owner=? AND target=?)').get(a,b,b,a);
 const issue=u=>{const token=hex(32),expires=now()+7*86400000;db.prepare('INSERT INTO sessions VALUES(?,?,?)').run(sha(token),u.id,expires);return {token,expires,user:publicUser(u)};};
 const auth=req=>{const t=/^Bearer ([a-f0-9]{64})$/.exec(req.headers.authorization||'');if(!t)error('Sign in first.',401);const u=db.prepare('SELECT a.* FROM sessions s JOIN accounts a ON a.id=s.user WHERE s.hash=? AND s.expires>?').get(sha(t[1]),now());if(!u)error('Session expired. Sign in again.',401);return u;};
 async function body(req){let text='';for await(const chunk of req){text+=chunk;if(Buffer.byteLength(text)>16384)error('Request too large.',413);}let o;try{o=JSON.parse(text||'{}');}catch{error('Invalid JSON.');}if(!o||Array.isArray(o)||typeof o!=='object')error('Invalid request.');return o;}
 const handler=async(req,res)=>{const origin=req.headers.origin,allowed=origin&&origins.includes(origin);res.setHeader('Vary','Origin');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Cache-Control','no-store');res.setHeader('Referrer-Policy','no-referrer');
  if(allowed)res.setHeader('Access-Control-Allow-Origin',origin);
  const send=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify(data));};
  try {
   if(origin&&!allowed)error('Origin not allowed.',403);
   if(req.method==='OPTIONS'){res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE,OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');res.writeHead(204);res.end();return;}
   const pathname=new URL(req.url,'http://localhost').pathname;
   if(req.method==='GET'&&pathname==='/health'){send(200,{ok:true,service:'Super Wiss accounts',protocol:1});return;}
   if(req.method==='GET'&&pathname==='/delete-account'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Content-Security-Policy':"default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; form-action 'self'; frame-ancestors 'none'"});res.end(`<!doctype html><html lang="en"><meta name="viewport" content="width=device-width"><title>Delete Super Wiss account</title><style>body{font:18px system-ui;max-width:600px;margin:10vh auto;padding:24px;background:#111827;color:#eef}input,button{display:block;padding:14px;margin:14px 0;width:95%;font:inherit}button{background:#b94747;color:white;border:0}p{line-height:1.6}</style><h1>Delete your Super Wiss account</h1><p>This permanently removes your online profile, friend connections, requests and sessions. Local game saves on each phone are separate. Submitted safety reports are retained for moderation with the deleted account identity removed.</p><form><input id="u" autocomplete="username" placeholder="Username" required><input id="p" type="password" autocomplete="current-password" placeholder="Password" required><label><input id="c" type="checkbox" required style="width:auto;display:inline"> I understand this cannot be undone.</label><button>Delete my account permanently</button></form><p id="s" role="status"></p><script>document.querySelector('form').onsubmit=async e=>{e.preventDefault();let s=document.querySelector('#s');try{let r=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:document.querySelector('#u').value,password:document.querySelector('#p').value})}),a=await r.json();if(!r.ok)throw Error(a.error);r=await fetch('/api/account',{method:'DELETE',headers:{'Content-Type':'application/json',Authorization:'Bearer '+a.token},body:JSON.stringify({password:document.querySelector('#p').value})});a=await r.json();if(!r.ok)throw Error(a.error);s.textContent='Account deleted.';document.querySelector('form').reset()}catch(e){s.textContent=e.message}};</script></html>`);return;}
   // Behind a proxy, keep the default socket address limiter. Do not trust an arbitrary X-Forwarded-For header.
   const ip=req.socket.remoteAddress||'unknown';rate('all:'+ip,180);
   const data=['POST','PATCH','DELETE'].includes(req.method)?await body(req):{};
   if(req.method==='POST'&&['/api/signup','/api/login','/api/recover'].includes(pathname)){
    const username=String(data.username||'').trim().toLowerCase();if(!/^[a-z0-9_]{3,24}$/.test(username))error('Use a 3–24 character username: letters, numbers or underscore.');
    rate('auth-ip:'+ip,20,15*60000);rate('auth-user:'+username,10,15*60000);
    if(pathname==='/api/signup'){
     if(data.acceptRules!==true)error('Accept the community rules to create an account.');if(!validPass(data.password))error('Use a password of 12–128 characters.');
     if(db.prepare('SELECT 1 FROM accounts WHERE username=?').get(username))error('That username is unavailable.',409);
     const recovery=hex(20),u={id:hex(12),username,password:await passHash(data.password),recovery:sha(recovery),code:randomBytes(5).toString('hex').toUpperCase(),profile:JSON.stringify(cleanProfile(data.profile)),created:now()};
     try{db.prepare('INSERT INTO accounts VALUES(?,?,?,?,?,?,?)').run(u.id,u.username,u.password,u.recovery,u.code,u.profile,u.created);}catch{error('That username is unavailable.',409);}
     send(201,{...issue(u),recoveryCode:recovery});return;
    }
    const u=db.prepare('SELECT * FROM accounts WHERE username=?').get(username);
    if(pathname==='/api/recover'){
     if(!validPass(data.password))error('Use a password of 12–128 characters.');const hash=sha(String(data.recoveryCode||'').trim());if(!u||!timingSafeEqual(Buffer.from(hash,'hex'),Buffer.from(u.recovery,'hex')))error('Recovery details were not recognized.',401);
     const recovery=hex(20),password=await passHash(data.password);db.exec('BEGIN');try{db.prepare('UPDATE accounts SET password=?,recovery=? WHERE id=?').run(password,sha(recovery),u.id);db.prepare('DELETE FROM sessions WHERE user=?').run(u.id);db.exec('COMMIT');}catch(e){db.exec('ROLLBACK');throw e;}
     send(200,{...issue(u),recoveryCode:recovery});return;
    }
    if(typeof data.password!=='string'||data.password.length>128)error('Login details were not recognized.',401);
    // A fixed dummy KDF keeps absent-user and wrong-password work comparable.
    const encoded=u?.password||('0'.repeat(32)+':'+ '0'.repeat(64));const ok=await passOK(data.password,encoded);if(!u||!ok)error('Login details were not recognized.',401);
    send(200,issue(u));return;
   }
   const u=auth(req);rate('user:'+u.id,100);
   if(pathname==='/api/me'&&req.method==='GET'){send(200,{user:publicUser(u)});return;}
   if(pathname==='/api/logout'&&req.method==='POST'){db.prepare('DELETE FROM sessions WHERE hash=?').run(sha(req.headers.authorization.slice(7)));send(200,{ok:true});return;}
   if(pathname==='/api/profile'&&req.method==='PATCH'){const p=cleanProfile(data);db.prepare('UPDATE accounts SET profile=? WHERE id=?').run(JSON.stringify(p),u.id);u.profile=JSON.stringify(p);send(200,{user:publicUser(u)});return;}
   if(pathname==='/api/account'&&req.method==='DELETE'){
    if(typeof data.password!=='string'||data.password.length>128||!await passOK(data.password,u.password))error('Password incorrect.',401);
    db.prepare('DELETE FROM accounts WHERE id=?').run(u.id);send(200,{ok:true});return;
   }
   if(pathname==='/api/friends'&&req.method==='GET'){
    const friends=db.prepare('SELECT x.* FROM friends f JOIN accounts x ON x.id=CASE WHEN f.a=? THEN f.b ELSE f.a END WHERE f.a=? OR f.b=?').all(u.id,u.id,u.id).map(publicUser);
    const incoming=db.prepare('SELECT x.* FROM requests r JOIN accounts x ON x.id=r.sender WHERE r.recipient=?').all(u.id).map(publicUser);
    const outgoing=db.prepare('SELECT x.* FROM requests r JOIN accounts x ON x.id=r.recipient WHERE r.sender=?').all(u.id).map(publicUser);
    send(200,{friends,incoming,outgoing});return;
   }
   if(pathname==='/api/friends/request'&&req.method==='POST'){
    rate('friend:'+u.id,12,3600000);const code=String(data.code||'').trim().toUpperCase(),target=db.prepare('SELECT * FROM accounts WHERE code=?').get(code);if(!target||target.id===u.id||blocked(u.id,target.id))error('Friend code unavailable.',404);
    const[a,b]=[u.id,target.id].sort();if(db.prepare('SELECT 1 FROM friends WHERE a=? AND b=?').get(a,b))error('Already friends.',409);
    db.prepare('INSERT OR IGNORE INTO requests VALUES(?,?,?)').run(u.id,target.id,now());send(200,{ok:true});return;
   }
   if(pathname==='/api/friends/respond'&&req.method==='POST'){
    const from=String(data.id||'');if(!db.prepare('SELECT 1 FROM requests WHERE sender=? AND recipient=?').get(from,u.id))error('Request unavailable.',404);
    if(blocked(from,u.id))error('Request unavailable.',404);db.exec('BEGIN');try{if(data.accept===true){const[a,b]=[u.id,from].sort();db.prepare('INSERT OR IGNORE INTO friends VALUES(?,?)').run(a,b);}db.prepare('DELETE FROM requests WHERE (sender=? AND recipient=?) OR (sender=? AND recipient=?)').run(from,u.id,u.id,from);db.exec('COMMIT');}catch(e){db.exec('ROLLBACK');throw e;}send(200,{ok:true});return;
   }
   if(pathname==='/api/friends/remove'&&req.method==='POST'){const[a,b]=[u.id,String(data.id||'')].sort();db.prepare('DELETE FROM friends WHERE a=? AND b=?').run(a,b);db.prepare('DELETE FROM requests WHERE (sender=? AND recipient=?) OR (sender=? AND recipient=?)').run(a,b,b,a);send(200,{ok:true});return;}
   if(pathname==='/api/block'&&req.method==='POST'){
    const id=String(data.id||'');if(id===u.id||!db.prepare('SELECT 1 FROM accounts WHERE id=?').get(id))error('Player unavailable.',404);db.exec('BEGIN');try{db.prepare('INSERT OR IGNORE INTO blocks VALUES(?,?)').run(u.id,id);const[a,b]=[u.id,id].sort();db.prepare('DELETE FROM friends WHERE a=? AND b=?').run(a,b);db.prepare('DELETE FROM requests WHERE (sender=? AND recipient=?) OR (sender=? AND recipient=?)').run(a,b,b,a);db.exec('COMMIT');}catch(e){db.exec('ROLLBACK');throw e;}send(200,{ok:true});return;
   }
   if(pathname==='/api/report'&&req.method==='POST'){rate('report:'+u.id,5,3600000);if(!['name','harassment','cheating','other'].includes(data.reason))error('Choose a report reason.');if(data.id===u.id||!db.prepare('SELECT 1 FROM accounts WHERE id=?').get(String(data.id)))error('Player unavailable.',404);db.prepare('INSERT INTO reports(id,reporter,target,reason,created) VALUES(?,?,?,?,?)').run(hex(12),u.id,data.id,data.reason,now());send(200,{ok:true});return;}
   error('Endpoint not found.',404);
  }catch(e){send(e.status||500,{error:e.status?e.message:'Service error. Please retry.'});}
 };
 const server=http.createServer(handler);server.requestTimeout=15000;server.headersTimeout=10000;server.keepAliveTimeout=5000;server.maxRequestsPerSocket=100;server.on('close',()=>db.close());return {server,db};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const{server}=createAccountServer();const port=Number(process.env.PORT||3000);server.listen(port,'0.0.0.0',()=>console.log('Super Wiss accounts listening on port '+port));for(const s of ['SIGTERM','SIGINT'])process.on(s,()=>server.close(()=>process.exit()));}
