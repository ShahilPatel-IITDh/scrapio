var API_KEY = window.GoogleSamples.Config.gcmAPIKey;
var GCM_ENDPOINT = 'https://android.googleapis.com/gcm/send';
var isPushEnabled = false;

// This method handles the removal of subscriptionId 
// in Chrome 44 by concatenating the subscription Id 
// to the subscription endpoint 
function endpointWorkaround(pushSubscription) {
    // Make sure we only mess with GCM 
    if (pushSubscription.endpoint.indexOf('https://android.googleapis.com/gcm/send') != 0) {
        return pushSubscription.endpoint;
    }

    var mergedEndpoint = pushSubscription.endpoint;
    // Chrome 42 + 43 will not have the subscriptionId attached 
    // to the endpoint. 

    if (pushSubscription.subscriptionId &&
      pushSubscription.endpoint.indexOf(pushSubscription.subscriptionId) == -1) {
        // Handle version 42 where you have separate subId and Endpoint 
        mergedEndpoint = pushSubscription.endpoint + '/' +
          pushSubscription.subscriptionId;
    }

    return mergedEndpoint;
}

function sendSubscriptionToServer(subscription) {
    // TODO: Send the subscription.endpoint 
    // to your server and save it to send a 
    // push message at a later date 
    // 
    // For compatibly of Chrome 43, get the endpoint via 
    // endpointWorkaround(subscription) 
    console.log('TODO: Implement sendSubscriptionToServer()');

    var mergedEndpoint = endpointWorkaround(subscription);


    // This is just for demo purposes / an easy to test by 
    // generating the appropriate cURL command 
    showCurlCommand(mergedEndpoint);
}


// NOTE: This code is only suitable for GCM endpoints, 
// When another browser has a working version, alter 
// this to send a PUSH request directly to the endpoint 
function showCurlCommand(mergedEndpoint) {
    try {
        var API_KEY = window.GoogleSamples.Config.gcmAPIKey;
    }
    catch (e) {
        alert(e.message);
    }
    // The curl command to trigger a push message straight from GCM 
    //alert(GCM_ENDPOINT + "    ttt   " + mergedEndpoint + "   llll   " + mergedEndpoint.indexOf(GCM_ENDPOINT));
    //if (mergedEndpoint.indexOf(GCM_ENDPOINT) != 0) { 
    //      alert('This browser isn\'t currently ' + 'supported for this demo');
    //      return; 
    //    } 

    var endpointSections = mergedEndpoint.split('/');
    var subscriptionId = endpointSections[endpointSections.length - 1];

    var curlCommand = 'curl --header "Authorization: key=' + API_KEY +
      '" --header Content-Type:"application/json" ' + GCM_ENDPOINT +
      ' -d "{\\"registration_ids\\":[\\"' + subscriptionId + '\\"]}"';
    try {
        var unix = Math.round(+new Date() / 1000);
        var _varUrl = "https://secure.quranexplorer.com/QuranExplorer-Portal2-RestFullServices/Service1.svc/GetGEOIPDetailWithTimeStamp/" + unix + "?jsoncallback=?";

        $.ajax({
            type: "GET",
            url: _varUrl,
            cache: false,
            timeout: 15000,
            dataType: "jsonp",
            success: function (data) {
                var _ipDetail;
                if (data.ResponseID == 1) {
                    _ipDetail = data.ResponseText.split(",");
                    var _IPGCM = _ipDetail[7];
                    var _CountryGCM = _ipDetail[0];
                    var urlRequest = "SetPushRegistration.aspx?subscriptionId=" + subscriptionId + "&Country=" + _CountryGCM + "&IPAddress=" + _IPGCM;
        $.ajax({
            type: "POST",
            async: false,
            url: urlRequest,
            contentType: "application/json; charset=utf-8", // content type sent to server
            success: function (_data) {
                var d = 0;
                //unsubscribe("same and mismatch");
                //                if(_data == "same and mismatch")
                //                {
                //                unsubscribe();
                //                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("Error  " + xhr.status + "    " + thrownError);
            }
        });
                }
            },
            //the error method seems to be unavailable until jquery 1.5
            error: function (xhr, ajaxOptions, thrownError) {
                alert("Error  " + xhr.status + "    " + thrownError);
            }
        });

    } catch (e) {
        alert(e.message);
    }
   // alert(subscriptionId);
}


function unsubscribe() {
    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
        // To unsubscribe from push messaging, you need get the 
        // subcription object, which you can call unsubscribe() on. 
        serviceWorkerRegistration.pushManager.getSubscription().then(
          function (pushSubscription) {
              // Check we have a subscription to unsubscribe 
              if (!pushSubscription) {
                  // No subscription object, so set the state 
                  // to allow the user to subscribe to push 
                  isPushEnabled = false;
                  return;
              }


              // TODO: Make a request to your server to remove 
              // the users data from your data store so you 
              // don't attempt to send them push messages anymore 


              // We have a subcription, so call unsubscribe on it 
              pushSubscription.unsubscribe().then(function () {
                  isPushEnabled = false;
              }).catch(function (e) {
                  // We failed to unsubscribe, this can lead to 
                  // an unusual state, so may be best to remove 
                  // the subscription id from your data store and 
                  // inform the user that you disabled push 


                  console.log('Unsubscription error: ', e);
              });
          }).catch(function (e) {
              console.log('Error thrown while unsubscribing from ' +
                'push messaging.', e);
          });
    });
}


function subscribe() {
    // Disable the button so it can't be changed while 
    // we process the permission request 
    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.subscribe({ userVisibleOnly: true })
          .then(function (subscription) {
              // The subscription was successful 
              isPushEnabled = true;
              // TODO: Send the subscription subscription.endpoint 
              // to your server and save it to send a push message 
              // at a later date 
              return sendSubscriptionToServer(subscription);
          })
          .catch(function (e) {
              if (Notification.permission === 'denied') {
                  // The user denied the notification permission which 
                  // means we failed to subscribe and the user will need 
                  // to manually change the notification permission to 
                  // subscribe to push messages 
                  console.log('Permission for Notifications was denied');
              } else {
                  // A problem occurred with the subscription, this can 
                  // often be down to an issue or lack of the gcm_sender_id 
                  // and / or gcm_user_visible_only 
                  //window.Demo.debug.log("");
                  console.log('Unable to subscribe to push.', e);
              }
          });
    });
}


// Once the service worker is registered set the initial state 
function initialiseState() {
    // Are Notifications supported in the service worker? 
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
        alert('Notifications aren\'t supported.');
        return;
    }

    // Check the current Notification permission. 
    // If its denied, it's a permanent block until the 
    // user changes the permission 
    if (Notification.permission == 'denied') {
        alert('The user has blocked notifications.');
        return;
    }


    // Check if push messaging is supported 
    if (!('PushManager' in window)) {
        alert('Push messaging isn\'t supported.');
        return;
    }

    // We need the service worker registration to check for a subscription 
    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
        // Do we already have a push message subscription? 
        serviceWorkerRegistration.pushManager.getSubscription()
          .then(function (subscription) {
              // Enable any UI which subscribes / unsubscribes from 
              // push messages. 

              //alert(JSON.stringify(subscription) + "  test 1   kdhfdkhf");
              if (!subscription) {
                  // to allow the user to enable push 
                  subscribe();
                  return;
              }

              // Keep your server in sync with the latest subscription 
              sendSubscriptionToServer(subscription);


              // Set your UI to show they have subscribed for 
              // push messages 
              isPushEnabled = true;
              //alert(isPushEnabled);

          })
          .catch(function (err) {
              console.log('Error during getSubscription()', err);
          });
    });
}

function showNotification(title, body, icon, data) {
    var notificationOptions = {
        body: body,
        icon: icon ? icon : '/images/touch/chrome-touch-icon-192x192.png',
        tag: 'simple-push-demo-notification',
        data: data
    };
    return self.registration.showNotification("test", notificationOptions);
}

