
var _qevents = _qevents || [];

var quantcast_host = function(){
    var h = document.location.hostname;
    if(h == 'wn.com') return 'main';
    if(h.match('^..\.wn\.com$')) return 'international';
    if(h.match('\.wn\.com$')) return 'subdomain';
    return 'outer';
}();

(function() {
    var elem = document.createElement('script');
    elem.src = (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js";
    elem.async = true;
    elem.type = "text/javascript";
    var scpt = document.getElementsByTagName('script')[0];
    scpt.parentNode.insertBefore(elem, scpt);
})();

_qevents.push({
    qacct: "p-69LMgINxZpq8g",
    labels: 'wn.' + (window.quantcast_label||'other') + '.' + quantcast_host
});
