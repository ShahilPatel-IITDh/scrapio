 (function(window, document) {
 if(navigator.userAgent.match(/(Android|iPod|iPhone|iPad|BlackBerry|IEMobile|Opera Mini)/)) {
 document.body.className += " using-mobile-browser ";
 }
 if( !("ontouchstart" in window) ) {
 var body = document.querySelector("body");
 var winW = window.innerWidth;
 var bodyW = body.clientWidth;
 if (winW > bodyW + 4) {
 body.setAttribute("style", "--scroll-bar-w: " + (winW - bodyW - 4) + "px");
 } else {
 body.setAttribute("style", "--scroll-bar-w: 0px");
 }
 }
 })(window, document); 