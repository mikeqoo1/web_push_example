console.log('Loaded service worker!');

self.addEventListener('push', ev => {
  const data = ev.data.json();
  console.log('Got push', data);
  self.registration.showNotification(data.title, {
    body: 'Hello, 灰色老鼠ㄝ~~~',
    icon: 'https://img.icons8.com/emoji/48/000000/mouse-body-emoji.png'
  });
});