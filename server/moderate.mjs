/** Local operator tool. Do not expose it as an unauthenticated web endpoint. */
import {DatabaseSync}from'node:sqlite';
const[action='list',id]=process.argv.slice(2);if(!['list','resolve'].includes(action))throw Error('Use list or resolve REPORT_ID.');
const db=new DatabaseSync(process.env.DATABASE_PATH||'data/accounts.sqlite');
try{if(action==='list')console.log(JSON.stringify(db.prepare("SELECT r.id,r.reason,r.created,r.status,a.username AS reportedUser FROM reports r LEFT JOIN accounts a ON a.id=r.target WHERE r.status='open' ORDER BY r.created LIMIT 100").all(),null,2));else{if(!/^[a-f0-9]{24}$/.test(id||''))throw Error('Provide an exact report ID.');const n=db.prepare("UPDATE reports SET status='resolved' WHERE id=?").run(id);if(!n.changes)throw Error('Report not found.');console.log('Report marked resolved.');}}finally{db.close();}
