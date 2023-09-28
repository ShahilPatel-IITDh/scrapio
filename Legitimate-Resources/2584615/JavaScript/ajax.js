/** Shopify CDN: Minification failed

Line 23:6 Transforming let to the configured target environment ("es5") is not supported yet
Line 48:4 Transforming let to the configured target environment ("es5") is not supported yet

**/
var script_loaded = !1;
function loadJSscripts() {
  console.log("Loading scripts 18000ms");
  setTimeout(function () {
    if (!script_loaded) {
      script_loaded = !0;
      var t = document.getElementsByTagName("script");
      for (i = 0; i < t.length; i++)
        null !== t[i].getAttribute("data-src") &&
          (t[i].setAttribute("src", t[i].getAttribute("data-src")),
          delete t[i].dataset.src);
      var e = document.getElementsByTagName("link");
      for (i = 0; i < e.length; i++)
        null !== e[i].getAttribute("data-href") &&
          (e[i].setAttribute("href", e[i].getAttribute("data-href")),
          delete e[i].dataset.href);
      let scripts = document.getElementsByClassName("deferredScript");
      for (script in scripts) {
        script.type = "text/javascript";
      }
      setTimeout(function () {
        document.dispatchEvent(new CustomEvent("StartAsyncLoading"));
        document.dispatchEvent(new CustomEvent("StartKernelLoading"));
      }, 400);
    }
  }, 9000);
}
function loadJSscriptsNow() {
  if (!script_loaded) {
    console.log("now ...");
    script_loaded = !0;
    var t = document.getElementsByTagName("script");
    for (i = 0; i < t.length; i++)
      null !== t[i].getAttribute("data-src") &&
        (t[i].setAttribute("src", t[i].getAttribute("data-src")),
        delete t[i].dataset.src);
    var e = document.getElementsByTagName("link");
    for (i = 0; i < e.length; i++)
      null !== e[i].getAttribute("data-href") &&
        (e[i].setAttribute("href", e[i].getAttribute("data-href")),
        delete e[i].dataset.href);
    let scripts = document.getElementsByClassName("deferredScript");
    for (script in scripts) {
      script.type = "text/javascript";
    }
    setTimeout(function () {
      document.dispatchEvent(new CustomEvent("StartAsyncLoading"));
      document.dispatchEvent(new CustomEvent("StartKernelLoading"));
    }, 400);
  }
}
var activityEvents = [
  "mousedown",
  "mousemove",
  "keydown",
  "scroll",
  "touchstart",
  "click",
  "keypress",
  "touchmove",
];
activityEvents.forEach(function (eventName) {
  window.addEventListener(eventName, loadJSscriptsNow, false);
});
document.addEventListener("load", loadJSscripts, false);
document.addEventListener("onload", loadJSscripts, false);
if (window.addEventListener != undefined) {
  window.addEventListener("load", loadJSscripts, false);
} else if (window.attachEvent != undefined) {
  window.attachEvent("onload", loadJSscripts);
} else {
  window.onload = loadJSscripts;
}