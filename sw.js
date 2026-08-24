const CACHE="sri-hari-tyres-app-v2";
const SHELL=["./","./index.html","./manifest.webmanifest","./icon.svg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
 const u=new URL(e.request.url);
 if(u.hostname.includes("firebaseio.com")||u.hostname.includes("googleapis.com")||u.hostname.includes("gstatic.com")||u.hostname.includes("cdn.sheetjs.com")) return;
 e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{const x=r.clone();caches.open(CACHE).then(ca=>ca.put(e.request,x));return r}).catch(()=>caches.match("./index.html"))));
});