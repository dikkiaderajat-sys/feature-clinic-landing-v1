import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'../out');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2','.svg':'image/svg+xml'};
const server=http.createServer(async(req,res)=>{
  try {
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    // Local QA fixtures only. These routes are never copied into the exported site.
    if(pathname==='/__qa/reduced.css'){
      const css=(await fs.readFile(path.join(root,'styles.css'),'utf8'))
        .replaceAll('@media(prefers-reduced-motion:no-preference)','@media not all')
        .replaceAll('@media(prefers-reduced-motion:reduce)','@media all');
      res.writeHead(200,{'Content-Type':'text/css'});res.end(css);return;
    }
    if(pathname==='/__qa/timeline'||pathname==='/__qa/reduced'){
      let html=await fs.readFile(path.join(root,'index.html'),'utf8');
      if(pathname.endsWith('reduced'))html=html.replace('href="/styles.css"','href="/__qa/reduced.css"');
      const script=`<script>addEventListener('load',()=>{const samples=[];const start=performance.now();for(const ms of [0,600,1000,1550,2100,2700,3400,4450,5200,5800,6500,7200,7950,8500,9350,10000,12000])setTimeout(()=>{const style=s=>getComputedStyle(document.querySelector(s));samples.push({at:Math.round(performance.now()-start),messages:[...document.querySelectorAll('.message')].map(e=>Number(getComputedStyle(e).opacity)),nodes:[...document.querySelectorAll('.workflow-node')].map(e=>Number(getComputedStyle(e).opacity)),green:style('.chart-line.revenue').strokeDashoffset,red:style('.chart-line.loss').strokeDashoffset,active:document.getAnimations().filter(a=>a.playState==='running' && a.effect.target.closest('.hero')).length});if(ms===12000){const report=document.createElement('pre');report.id='qa-results';report.hidden=true;report.textContent=JSON.stringify(samples);document.body.append(report)}} ,ms)});</script>`;
      html=html.replace('</body>',script+'</body>');res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(html);return;
    }
    const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
    if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
    const data=await fs.readFile(file);
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);
  } catch {res.writeHead(404);res.end('Not found');}
});
server.listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
