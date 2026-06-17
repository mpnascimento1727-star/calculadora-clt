self.addEventListener('install', function(event){
console.log('Service Worker instalado');
});

self.addEventListener('fetch', function(event){
});if('serviceWorker' in navigator){

navigator.serviceWorker.register('sw.js')
.then(() => console.log("Service Worker ativo"));

}