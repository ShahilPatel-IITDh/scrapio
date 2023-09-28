if ("serviceWorker" in navigator) {
  if (navigator.serviceWorker.controller) {
    console.log("Active service worker found, no need to register");
  } else {
    // Register the service worker
    navigator.serviceWorker
      .register("/serviceworker.js", {
        scope: "./"
      })
      .then(function (reg) {
        console.log("Service worker has been registered for scope: " + reg.scope);
      });
  }
}

function updateIndicator() {
  var page = document.getElementById( 'page' );
  var offline = document.getElementById( 'offline' );
  if(navigator.onLine) {
    page.style.display = '';
    offline.style.display = 'none';
    return;
  }
  offline.style.display = '';
  page.style.display = 'none';
}
window.addEventListener('online',  updateIndicator);
window.addEventListener('offline', updateIndicator);
document.addEventListener('DOMContentLoaded', function () {
  updateIndicator();
});
