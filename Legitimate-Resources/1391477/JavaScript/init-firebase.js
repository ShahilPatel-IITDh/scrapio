import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging.js";

/**
 * 
 */
 
 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyBCDq_EGYytg8XIEO9BZUyGR7pcc6Con5A",
    authDomain: "bidorbuy-mobile-apps.firebaseapp.com",
    databaseURL: "https://bidorbuy-mobile-apps.firebaseio.com",
    projectId: "bidorbuy-mobile-apps",
    storageBucket: "bidorbuy-mobile-apps.appspot.com",
    messagingSenderId: "925420103275",
    appId: "1:925420103275:web:03164089882a14e53d332e"
  };

  // Initialize Firebase
 const app = initializeApp(firebaseConfig);
  
 // Initialize Firebase Cloud Messaging
 const messaging = getMessaging(app); 
  
  // if browser is open
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    showFCMNotification(payload);
  });

  function getFCMToken (isJustLoggedIn) {
    
    getToken(messaging, { vapidKey: "BH0JRSru3TPISSG6CuDiMjwUKmqvDZZcytF9BT0glrE7Fm3m7LWxCPthNbfuCZfQNk-gvh0gEVuYtOBxGgOgnsY"}).then((currentToken) => {
      console.log("This is the token " + currentToken);
      sessionStorage.setItem("resolveFcmToken", true);
      if (currentToken) {
         if(isJustLoggedIn)SaveToken(currentToken);
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        requestPermission(isJustLoggedIn);
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
     
  }
  
  function requestPermission(isJustLoggedIn) {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        getFCMToken (isJustLoggedIn);
      }
    });
  }
  
  function initFCMToken () {
    var isJustLoggedIn = sessionStorage.getItem("isJustLoggedIn");
    var resolveFcmToken = sessionStorage.getItem("resolveFcmToken");
    var resolvedFcmToken = sessionStorage.getItem("resolvedFcmToken");
    if(!(resolveFcmToken && !isJustLoggedIn) && !resolvedFcmToken) { 
     getFCMToken (isJustLoggedIn);
    }
  }
  
  function SaveToken(aToken) {
    $.ajax({
      url : '/mobilejquery/jsp/firebase/FirebaseUpdateTokenAjaxHandler.jsp',
      data : {token:aToken, mode: "save"},
      type : "GET",
      contentType: "application/json",
      dataType : "json",
      cache: false,
      success : function(aResponse) { 
        sessionStorage.removeItem("isJustLoggedIn");
        sessionStorage.removeItem("resolveFcmToken");
        sessionStorage.setItem("resolvedFcmToken", true);
      },
      error : function(aXMLHttpRequest, aAJAXError, aAJAXException) {
        console.log("Something went wrong updating token: " + aAJAXError );  
      },
    });
  }
  
  function showFCMNotification(payload) {
     let title = payload.notification?.title || "";
     let icon =  payload.notification?.icon || ""; 
     let body =  payload.notification?.body || "";
     let action =payload.data?.click_action || null;
  
     let notification = new Notification(title, { body, icon });

     notification.onclick = () => {
        notification.close();
        if(action != null) {
          window.parent.location.href = action; 
        } else {
          window.parent.focus();
        }
     }  
  }
    
  // this is an attempt to predict if a user just loggedin...it supports other logic
  if (!sessionStorage.getItem("resolvedFcmToken") && BobeLoginDialog.isUserProbablyLoggedInRecently()) {
    sessionStorage.setItem("isJustLoggedIn", true);
  }
  
  initFCMToken();
