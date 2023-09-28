
document.addEventListener("DOMContentLoaded", function (e) {
var borlabsCookieContentBlocker = {"facebook": {"id": "facebook","global": function (contentBlockerData) {  },"init": function (el, contentBlockerData) { if(typeof FB === "object") { FB.XFBML.parse(el.parentElement); } },"settings": {"executeGlobalCodeBeforeUnblocking":false}},"default": {"id": "default","global": function (contentBlockerData) {  },"init": function (el, contentBlockerData) {  },"settings": {"executeGlobalCodeBeforeUnblocking":false}},"googlemaps": {"id": "googlemaps","global": function (contentBlockerData) {  },"init": function (el, contentBlockerData) {  },"settings": {"executeGlobalCodeBeforeUnblocking":false}},"instagram": {"id": "instagram","global": function (contentBlockerData) {  },"init": function (el, contentBlockerData) { if (typeof instgrm === "object") { instgrm.Embeds.process(); } },"settings": {"executeGlobalCodeBeforeUnblocking":false}},"openstreetmap": {"id": "openstreetmap","global": function (contentBlockerData) {  },"init": function (el, contentBlockerData) {  },"settings": {"executeGlobalCodeBeforeUnblocking":false}},"twitter": {"id": "twitter","global": function (contentBlockerData) {  },"init": function (el, contentBlockerData) {  },"settings": {"executeGlobalCodeBeforeUnblocking":false}},"vimeo": {"id": "vimeo","global": function (contentBlockerData) {  },"init": function (el, contentBlockerData) {  },"settings": {"executeGlobalCodeBeforeUnblocking":false,"saveThumbnails":false,"videoWrapper":false}},"youtube": {"id": "youtube","global": function (contentBlockerData) {  },"init": function (el, contentBlockerData) {  },"settings": {"executeGlobalCodeBeforeUnblocking":false,"changeURLToNoCookie":true,"saveThumbnails":false,"thumbnailQuality":"maxresdefault","videoWrapper":false}}};
    var BorlabsCookieInitCheck = function () {

    if (typeof window.BorlabsCookie === "object" && typeof window.jQuery === "function") {

        if (typeof borlabsCookiePrioritized !== "object") {
            borlabsCookiePrioritized = { optInJS: {} };
        }

        window.BorlabsCookie.init(borlabsCookieConfig, borlabsCookieCookies, borlabsCookieContentBlocker, borlabsCookiePrioritized.optInJS);
    } else {
        window.setTimeout(BorlabsCookieInitCheck, 50);
    }
};

BorlabsCookieInitCheck();});
