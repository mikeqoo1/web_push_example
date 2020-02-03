const express = require('express'); //node.js的web框架
const webpush = require('web-push'); //web push的lib (node.js版本)

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

// Replace with your email
webpush.setVapidDetails('mailto:email@google.com', publicVapidKey, privateVapidKey);

const app = express();

app.use(require('body-parser').json());

//建立一個post請求(/subscribe) 
//web中的 JavaScript 將會發送一個 body 中包含 PushSubscription 的請求
//為了用 webpush.sendNotification() 發送推送通知 需要獲取 PushSubscription 的物件
app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    res.status(201).json({});
    const payload = JSON.stringify({ title: 'TEST(title)' });

    console.log(subscription);

    webpush.sendNotification(subscription, payload).catch(error => {
        console.error(error.stack);
    });
});

app.use(require('express-static')('./'));

app.listen(3000);