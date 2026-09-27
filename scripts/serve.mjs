/** Local preview server. No dependencies, exposed only on this machine by default. */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const port=Number(process.env.PORT||8080),host=process.env.HOST||'127.0.0.1';
if(!Number.isInteger(port)||port<1||port>65535)throw Error('PORT must be 1..65535');
http.createServer((req,res)=>{
 const pathname=new URL(req.url,'http://localhost').pathname;
 // Serve the built preview and optional editing documentation only. Never expose
 // private signing material or arbitrary files via a development server.
 const routes={'/':'dist/Super-Wiss-Odyssey.html','/guide':'docs/EDITING-GUIDE.html'};
 const file=routes[pathname];
 if(!file){res.writeHead(404);return res.end('Not found');}
 try{const bytes=fs.readFileSync(path.join(root,file));res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(bytes);}catch{res.writeHead(503);res.end('Run npm run build first.');}
}).listen(port,host,()=>console.log(`Super Wiss preview: http://${host}:${port}\nPress Ctrl+C to stop.`));
