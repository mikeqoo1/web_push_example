const SW = '[Service Worker]';
console.log('Loaded service worker!');
self.addEventListener('push', event => {
    const data = event.data.json();
    console.log('Got push', data);
    
    self.registration.showNotification(data.title, {
        body: 'Hello, 灰色老鼠ㄝ~~~',
        icon: 'icon.png',
    });
});