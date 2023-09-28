$(document).ready(function() {
    var d = new Date();
    d.setTime(d.getTime()+(31*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie="cookies_accepted=1;"+expires+'; path=/;';
    $('.close-cookie-panel').click(escondeCookiePanel);
    //requestFirebase();
});

function escondeCookiePanel(e){
    $('.cookie-consent').css('display','none');
}

// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();

// IDs of divs that display Instance ID token UI or request permission UI.
const tokenDivId = '';
const permissionDivId = '';

function requestFirebase(){
    messaging.requestPermission()
    .then(function() {
      getTokenFirebase() 
    })
    .catch(function(err) {setTokenSentToServer(false);});
}

function getTokenFirebase(){
  messaging.getToken()
  .then(function(currentToken) {
    if (currentToken) {sendTokenToServer(currentToken);}
    else {setTokenSentToServer(false);}
  })
  .catch(function(err) {setTokenSentToServer(false);});
}

messaging.onTokenRefresh(function() {
  messaging.getToken()
  .then(function(refreshedToken) {
    setTokenSentToServer(false);
    sendTokenToServer(refreshedToken);
  })
  .catch(function(err) {showToken('Unable to retrieve refreshed token ', err);});
});

function sendTokenToServer(currentToken) {
  if (!isTokenSentToServer()) {
    setTokenSentToServer(true);
    $.ajax({
        url: '/ajax_send_token/',
        data: {
            token:currentToken,
        },
        success: function( data ) {
            //~ response( data );
        },
    });
  } else {
      console.log('Token already sent to server so won\'t send it again unless it changes');
  }
}

messaging.onMessage(function(payload) {
  // Customize notification here
});

function isTokenSentToServer() {
  return window.localStorage.getItem('sentToServer') == 1;
}
function setTokenSentToServer(sent) {
  window.localStorage.setItem('sentToServer', sent ? 1 : 0);
}

function showToken(currentToken) {
  //console.log("Current Token...",currentToken);
}


function reqPermissionSave(e){
    //console.log('BBBBBBBBBBBBBBBBBBBBB');
    firebase.messaging().requestPermission()
    .then(function(token) {
      //console.log('CCCCCCCCCCCCCCCCCCCCCCC');
      firebase.messaging().getToken()
      .then((currentToken) => {
        //console.log('DDDDDDDDDDDDDDD', currentToken);
        if (currentToken) {
          console.log('Tokeeeeeeeeeeen', currentToken);
          $.ajax({
            url: '/save_token/',
            data: {
              token: currentToken
            },
            success: function( data ) {
              console.log("Todo bien");
            },
          });
        } else {
          console.log('Malooooooo');
        }
      })
      .catch((err) => {
        console.log('Errorrrrrrrrr', err);
      })
    })
    .catch(function(err) {
      console.log('No se ha obtenido permiso', err);
    });
}
function reqPermissionNouser(e){
    //console.log('AAAAAAAAAAAAAAAAA');
    firebase.messaging().getToken()
    .then((currentToken) => {
      if (currentToken) {
        console.log('Tokeeeeeeeeeeen', currentToken);
      } else {
        console.log('No tengo token');
        reqPermissionSave();       
      }
    })
    .catch((err) => {
      console.log('Errorrrrrrrrr', err);
    })
}
