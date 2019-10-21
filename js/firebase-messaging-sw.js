'use strict';
/*
self.addEventListener('push', function (event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${even   t.data.text()}"`);

    const title = 'Que tal, como te va?';
    const options = {
        body: 'Hay Maduras Calientes en tu zona.\n¿Quieres Conocerlas?',
        icon: 'imgs/icon_480.png',
        badge: 'imgs/icon_54.png',
        vibrate: [100, 75, 200]
    };
    /*
    const = notificationPromise = self.registration.showNotification(title, options);
    event.waitUntil(notificationPromise);
    *//*
    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
    console.log('[Service Worker] Notification click Received.');
    event.notification.close();
    event.waitUntil(clients.openWindow('http://google.com/'));
});*/

//-----------------------------------------------------------------------------------------

 // [START initialize_firebase_in_sw]
 //Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here, other Firebase libraries
 // are not available in the service worker.
 importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');
 // Initialize the Firebase app in the service worker by passing in the
 // messagingSenderId.
 firebase.initializeApp({
     'messagingSenderId': '367327564555'
 });
 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
 const messaging = firebase.messaging();
 // [END initialize_firebase_in_sw] 