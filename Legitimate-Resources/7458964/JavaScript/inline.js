try {
    var analytics = window.analytics = window.analytics || [];
    if (!analytics.initialize) {
        if (analytics.invoked) window.console && console.error && console.error("Segment snippet included twice.");
        else {
            analytics.invoked = !0;
            analytics.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "identify", "reset", "group", "track", "ready", "alias", "debug", "page", "once", "off", "on"];
            analytics.factory = function(t) {
                return function() {
                    var e = Array.prototype.slice.call(arguments);
                    e.unshift(t);
                    analytics.push(e);
                    return analytics
                }
            };
            for (var t = 0; t < analytics.methods.length; t++) {
                var e = analytics.methods[t];
                analytics[e] = analytics.factory(e)
            }
            analytics.load = function(t, e) {
                try {
                    var n = document.createElement("script");
                    n.type = "text/javascript";
                    n.async = !0;
                    n.src = "https://cdn.segment.com/analytics.js/v1/" + t + "/analytics.min.js";
                    n.onerror = (error) => {
                        window.analyticsError = error
                    }
                    var a = document.getElementsByTagName("script")[0];
                    a.parentNode.insertBefore(n, a);
                    analytics._loadOptions = e
                } catch (error) {
                    window.analyticsError = error
                }
            };
            analytics.SNIPPET_VERSION = "4.1.0";
            analytics.load("xCFNzXfegnqVeUJzI6KkruZL5ZzL7iXy");
            analytics.page();
        }
    };
} catch (e) {
    window.analyticsError = e
}