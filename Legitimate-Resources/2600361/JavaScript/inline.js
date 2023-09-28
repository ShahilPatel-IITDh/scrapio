
function trackPreactEvent(event_name) {}
function trackPreactEventAndCallBack(cb, eventName, url, timeout) { cb(); }
function trackPreactEventAndRedirect(url, eventName) { document.location = url; }
function trackPreactEventAndLoadIframe(iframe,url, eventName) {	iframe.src  = url; }
function trackingHandler(click_event) {}
function bindPreactTracking() {}
