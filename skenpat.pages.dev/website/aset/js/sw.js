const CACHE_NAME = 'skenpat-cache-v4-m3';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/app/',
  '/app/index.html',
  '/aset/css/style.css',
  '/aset/css/core.css',
  '/aset/css/material-you.css',
  '/manifest.json',
  '/aset/api/search.json',
  '/aset/api/alat.json',
  '/aset/api/articles.json'
];

const EXTERNAL_ASSETS = [
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Quicksand:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS).catch(e=>console.log('cache add', e))),
      caches.open(CACHE_NAME).then(cache => Promise.all(EXTERNAL_ASSETS.map(url=>
        fetch(url, {mode:'cors'}).then(r=>{ if(r.ok) cache.put(url, r); }).catch(()=>{})
      )))
    ]).then(()=>self.skipWaiting())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if(request.method!=='GET') return;
  const url = new URL(request.url);
  if(url.origin!==location.origin){
    event.respondWith(
      caches.open(CACHE_NAME).then(cache=>
        cache.match(request).then(cached=>{
          const fetched=fetch(request).then(net=>{ if(net.ok) cache.put(request, net.clone()); return net; }).catch(()=>cached);
          return cached||fetched;
        })
      )
    );
    return;
  }
  if(request.headers.get('accept')?.includes('text/html')){
    event.respondWith(
      fetch(request).then(res=>{
        const clone=res.clone();
        caches.open(CACHE_NAME).then(c=>c.put(request, clone));
        return res;
      }).catch(()=>caches.match(request).then(c=>c||caches.match('/index.html')))
    );
  } else {
    event.respondWith(
      caches.match(request).then(cached=>{
        if(cached) return cached;
        return fetch(request).then(res=>{
          if(!res.ok) return res;
          const clone=res.clone();
          caches.open(CACHE_NAME).then(c=>c.put(request, clone));
          return res;
        }).catch(()=>{
          if(request.destination==='image'){
            return new Response('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50" x="50" text-anchor="middle" font-size="40">🖼️</text></svg>', {headers:{'Content-Type':'image/svg+xml'}});
          }
        });
      })
    );
  }
});

self.addEventListener('activate', event=>{
  event.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
  );
});

self.addEventListener('message', e=>{ if(e.data==='skipWaiting') self.skipWaiting(); });
