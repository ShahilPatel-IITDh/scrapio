self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(event) {
  
});

self.addEventListener('fetch', function(event) {
});

self.addEventListener("push", function(event)  {
	var  message = JSON.parse(event.data.text());
	const title = message.title;
	console.log(message);
	const options = {
		body : message.body,		
		tag : message.tag,
		icon : "/flexweb/scotiabank/assets/images/android-chrome-144x144.png",
		vibrate : "[500, 100, 500]",
		badge : "/flexweb/scotiabank/assets/images/android-chrome-144x144.png"
	}

	event.waitUntil(
		self.registration.showNotification(title, options)
	)
});

self.addEventListener('notificationclick', function(event) {
  event.waitUntil(
    // Retrieve a list of the clients of this service worker.
    self.clients.matchAll().then(function(clientList) {
      // If there is at least one client, focus it.
      if (clientList.length > 0) {
        return clientList[0].focus();
      }

      // Otherwise, open a new page.
      return self.clients.openWindow('scotiabank_home.cfm');
    })
  );
});

// Listen to  `pushsubscriptionchange` event which is fired when
// subscription expires. Subscribe again and register the new subscription
// in the server by sending a POST request with endpoint. Real world
// application would probably use also user identification.
self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('Subscription expired');
  event.waitUntil(
    self.registration.pushManager.subscribe({ userVisibleOnly: true })
    .then(function(subscription) {
      console.log('Subscribed after expiration', subscription.endpoint);
	  fetch('./scotiabank_push_subscriptions.cfm', {
		method: 'post',
		headers: {
		  'Content-type': 'application/json'
		},
		body: JSON.stringify({
		  subscription: subscription,
		  subscribe: true
		}),
	});

    })
  );
});