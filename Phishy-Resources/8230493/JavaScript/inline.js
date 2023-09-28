
// 

;(function(p,l,o,w,i,n,g){if(!p[i]){p.GlobalSnowplowNamespace=p.GlobalSnowplowNamespace||[];p.GlobalSnowplowNamespace.push(i);p[i]=function(){(p[i].q=p[i].q||[]).push(arguments)};p[i].q=p[i].q||[];n=l.createElement(o);g=l.getElementsByTagName(o)[0];n.async=1;n.src=w;g.parentNode.insertBefore(n,g)}}(window,document,'script','//cdn2.editmysite.com/js/wsnbn/snowday262.js','snowday'));

var r = [99, 104, 101, 99, 107, 111, 117, 116, 46, 40, 119, 101, 101, 98, 108, 121, 124, 101, 100, 105, 116, 109, 121, 115, 105, 116, 101, 41, 46, 99, 111, 109];
var snPlObR = function(arr) {
    var s = '';
    for (var i = 0 ; i < arr.length ; i++){
        s = s + String.fromCharCode(arr[i]);
    }
    return s;
};
var s = snPlObR(r);

var regEx = new RegExp(s);

window._W = {
    Analytics: {
        trackers: {
            wSP: snowday,
        },
        user_id: '145741997',
        site_id: '999136190215964011',
        snowplow_backend_id: '8745d300-347a-11ee-b77a-15b464f33ec5',
    },
};

(function(app_id, ec_hostname, discover_root_domain) {
    var track = window._W.Analytics.trackers.wSP;
    if (!track) return;
    track('newTracker', app_id, ec_hostname, {
        appId: app_id,
        post: true,
        platform: 'web',
        discoverRootDomain: discover_root_domain,
        cookieName: '_snow_',
        contexts: {
            webPage: true,
            performanceTiming: true,
            gaCookies: true
        },
        crossDomainLinker: function (linkElement) {
            return regEx.test(linkElement.href);
        },
        respectDoNotTrack: document.cookie.indexOf('gdpr-kb') === -1
    });
    track('trackPageView', _W.Analytics.user_id+':'+_W.Analytics.site_id, [{
        schema: 'iglu:com.weebly/snowplow_backend_id/jsonschema/1-0-0',
        data: { snowplow_backend_id: _W.Analytics.snowplow_backend_id }
    }]);
    track('crossDomainLinker', function (linkElement) {
        return regEx.test(linkElement.href);
    });
})(
    '_wn',
    'ec.editmysite.com',
    false
);
