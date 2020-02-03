console.log('Loaded service worker!');

self.addEventListener('push', ev => {
  const data = ev.data.json();
  console.log('Got push', data);
  self.registration.showNotification(data.title, {
    body: 'Hello, 灰色老鼠ㄝ~~~',
    icon: 'icon.png',
    badge: 'icon.png'
  });
});