//importScripts('https://www.gstatic.com/firebasejs/5.4.1/firebase-app.js');
//importScripts('https://www.gstatic.com/firebasejs/5.4.1/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-messaging.js');
firebase.initializeApp({
  //'messagingSenderId': '11797137959'
  apiKey: "AIzaSyCXXQ0GFo8LNSGkazKzXc3lptJsFC2HQDo",
  authDomain: "starfapp-a3e4e.firebaseapp.com",
  databaseURL: "https://starfapp-a3e4e.firebaseio.com",
  projectId: "starfapp-a3e4e",
  storageBucket: "starfapp-a3e4e.appspot.com",
  messagingSenderId: "11797137959",
  appId: "1:11797137959:web:ba997d35b242b41bb5dc02"
});
const messaging = firebase.messaging();

/*messaging.setBackgroundMessageHandler(payload => {
  const title = 'asasd';
  const options = {
    body: 'payload.data.score'
  };
  return self.registration.showNotification(title, options);
});*/