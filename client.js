//這裡的 public key 要改用自己產生的
const publicVapidKey = 'BIa5LyyvebounXa4Yydflf72M1c-hdDyY5GQEwuaYSwRICt8wRtxLPr6Rm4Ppi7GxktY6Y1NhSs-5uogwlott6g';

if ('serviceWorker' in navigator) {
    run().catch(error => console.error(error));
}

async function run() {
    console.log('註冊 service worker');
    const registration = await navigator.serviceWorker.register('/worker.js', { scope: '/' }); //初始化service worker
    console.log('Notification permission default status:', Notification.permission);

    console.log('註冊 push 功能');
    console.log('Notification permission 同意後 status:', Notification.permission);
    const subscription = await registration.pushManager.
        subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });

    console.log('發送訂閱請求');
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
}

//解key使用
//Boilerplate borrowed from https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}