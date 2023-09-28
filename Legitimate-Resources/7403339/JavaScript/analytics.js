$(document).ready(function() {
    includeInlineScript(function () {

        // Stats website
        (function (d, c) {
            ({
                a: function () {
                    return window.location.protocol || "http:"
                }, d: function () {
                    return (navigator.userAgent || navigator.appVersion || "x").toLowerCase()
                }, domain: function () {
                    return (document.domain || "?").toLowerCase()
                }, referrer: function () {
                    return encodeURIComponent(c.referrer ? c.referrer : "direct")
                },
                b: function () {
                    var a = screen.width, b = screen.height;
                    return 4096 <= a && 2160 <= b ? 4096 : 1920 <= a && 1080 <= b ? 1920 : 1280 <= a && 720 <= b ? 1280 : 640 <= a && 480 <= b ? 640 : 320 <= a && 240 <= b ? 320 : 0
                }, lang: function () {
                    return navigator.language || navigator.c || "?"
                }, send: function () {
                    var a = new Image(1, 1), b = new Date;
                    a.src = this.a() + "//" + d + "?l=" + this.lang() + "&d=" + this.domain() + "&r=" + this.referrer() + "&s=" + this.b() + "&u=" + Math.floor(b.getTime() / 1E3);
                    a.onload = function () {
                    }
                }
            }).send()
        })(window.location.hostname + "/statistiques/index/tracker", document);

        // Google Analytics
        if (typeof window._gaq !== 'undefined' || typeof window.ga !== 'undefined') {
            ga('set', 'page', window.location.pathname);
            ga('send', 'pageview');
        }
    });
});
