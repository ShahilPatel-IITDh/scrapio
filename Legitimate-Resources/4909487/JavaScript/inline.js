
(function () {
var category = "spam:warning_page",
state = 0;
function trackHover(e) {
try {
state = 1;
ga('send', 'event', category, "Spam interstitial link hovered.");
removeEvent(document.getElementById("clickthrough"), "mouseover", trackHover);
} catch (ex) { }
}
function trackClick(e) {
try {
state = 2
ga('send', 'event', category, "Spam interstitial link clicked.");
removeEvent(document.getElementById("clickthrough"), "click", trackClick);
} catch (ex) { }
}
function trackUnload(e) {
try {
ga('send', 'event', category, "Spam interstitial page unload state: " + state);
removeEvent(window, "beforeunload", trackUnload);
} catch (ex) { }
}
try {
ga('send', 'event', category, "Spam interstitial page load.");
addEvent(document.getElementById("clickthrough"), "mouseover", trackHover);
addEvent(document.getElementById("clickthrough"), "click", trackClick);
addEvent(window, "beforeunload", trackUnload);
} catch (ex) { }
})();
