console.log('載入 Service Worker!');
self.addEventListener('push', event => {
    console.log('[Service Worker] Push Received.');
    if (event.data) {
        console.log(event.data.text());
        console.log(event.data);
    }
    const title = 'Push Codelab';
    let options = {
        icon: 'icon.png',
        body: 'Hello, 灰色老鼠!!',
        data: {
            link: 'https://www.youtube.com/',
            link_kobe: 'https://www.youtube.com/watch?v=OTTWedyp37o',
            link_lbj: 'https://www.youtube.com/watch?v=3zRqsy08YfM'
        }
    };
    event.waitUntil(self.registration.showNotification(title, options));
});

// 使用者點擊推播彈跳訊息
self.addEventListener('notificationclick', function (event) {
    var goingToOpenUrl = 'https://www.youtube.com/watch?v=ShYLgpfW7aU&list=RDMMoxHnRfhDmrk&index=17';
    event.notification.close();

    event.waitUntil(clients.matchAll({
        type: 'window'
    }).then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url === goingToOpenUrl && 'focus' in client) {
                return client.focus();
            }
        }
        if (clients.openWindow) {
            return clients.openWindow(goingToOpenUrl);
        } else {
            console.log("無法開啟url:" + goingToOpenUrl);
        }
    }));
});