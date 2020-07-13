const express = require('express'); //node.js的web框架
const webpush = require('web-push'); //web push的lib (node.js版本)

const publicVapidKey = process.env.PUBLIC_VAPID_KEY; //公鑰
const privateVapidKey = process.env.PRIVATE_VAPID_KEY; //私鑰

// Replace with your email

//setVapidDetails()用來設定推播前的資格驗證，第一個可以放URL或是Mail用途是當Push Server如果要回傳一些資訊時，他們會直接傳到上面的E-mail。後面放Key。
webpush.setVapidDetails('mailto:email@google.com', publicVapidKey, privateVapidKey);

const app = express();

app.use(require('body-parser').json());



const options = {
    icon: 'icon.png',
    body: 'Hello, 灰色老鼠!!',
    data: {
        link: 'https://www.youtube.com/',
        link_kobe: 'https://www.youtube.com/watch?v=OTTWedyp37o',
        link_lbj: 'https://www.youtube.com/watch?v=3zRqsy08YfM'
    }
};

    // requireInteraction: true,
    // actions: [
    //     {
    //         action: 'kobe',
    //         title: '紫金傳奇-Kobe',
    //         icon: 'icon.png'
    //     },
    //     {
    //         action: 'lbj',
    //         title: '小皇帝-LBJ',
    //         icon: 'icon.png'
    //     },
    // ]


//建立一個post請求(/subscribe)
//web中的 JavaScript 將會發送一個 body 中包含 PushSubscription 的請求
//為了用 webpush.sendNotification() 發送推送通知 需要獲取 PushSubscription 的物件
app.post('/subscribe', (req, res) => {
    const subscription = req.body; //客戶端傳來的鑰匙
    res.status(201).json({});

    console.log("subscription = ",subscription);
    webpush.sendNotification(subscription, JSON.stringify(options)).catch(error => {
        console.error(error.stack);
    });
});

app.use(require('express-static')('./'));

app.listen(3000);