
//<![CDATA[
var _gaq = [];

_gaq.push(['_gat._anonymizeIp']);
if (window.CookieControl.isCookieAllowed("jimdo_analytics")) {
    _gaq.push(['b._setAccount', 'UA-24232327-12'],
        ['b._setCustomVar', '1', 'websiteid', 'sd1d18911df8d7d46'],
        ['b._setDomainName', 'none'],
        ['b._setAllowLinker', true],
        ['b._trackPageview']);
}

if (window.CookieControl.isCookieAllowed("jimdo_analytics") || window.CookieControl.isCookieAllowed("ga")) {
    (function() {
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = 'https://www.google-analytics.com/ga.js';

        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
    })();
}
//]]>
