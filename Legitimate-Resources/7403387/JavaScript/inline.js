
    function bingLoadingScript(){
        var bingTrackingID = "4077452";
        if(bingTrackingID !== "") {
            (function (w, d, t, r, u) {
                var f, n, i;
                w[u] = w[u] || [], f = function () {
                    var o = {ti: bingTrackingID};
                    o.q = w[u], w[u] = new UET(o), w[u].push("pageLoad")
                }, n = d.createElement(t), n.src = r, n.rel = "dns-prefetch", n.onload = n.onreadystatechange = function () {
                    var s = this.readyState;
                    s && s !== "loaded" && s !== "complete" || (f(), n.onload = n.onreadystatechange = null)
                }, i = d.getElementsByTagName(t)[0], i.parentNode.insertBefore(n, i)
            })(window, document, "script", (window.location.protocol === "http:" ? "http:" : "https:") + "//bat.bing.com/bat.js", "uetq");
        }
    }
