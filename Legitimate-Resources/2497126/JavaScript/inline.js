
var _tvq = window._tvq = window._tvq || [];
(function() {
var u = (("https:" == document.location.protocol) ?
"https://collector-31292.tvsquared.com/"
:
"http://collector-31292.tvsquared.com/"
);
_tvq.push(['setSiteId', "TV-6381720972-1"]);
_tvq.push(['setTrackerUrl', u + 'tv2track.php']);
_tvq.push([function() {
this.deleteCustomVariable(5, 'page')
}]);
_tvq.push(['trackPageView']);
var d = document,
g = d.createElement('script'),
s = d.getElementsByTagName('script')[0];
g.type = 'text/javascript';
g.defer = true;
g.async = true;
g.src = u + 'tv2track.js';
s.parentNode.insertBefore(g, s);
})();
