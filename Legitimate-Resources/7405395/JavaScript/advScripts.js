
var QueryString = function () {
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
            // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
        query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
        var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
        query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
        query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    } 
    return query_string;
}();

if (window.location.href.indexOf('gclid') > -1) { 
        addAdwords(QueryString.gclid);
}
if (window.location.href.indexOf('campaign') > -1) {
    var campaign = 'ca',adgroup='ad',keyword='kw';
    if (window.location.href.indexOf('campaign') > -1) {
        campaign = campaign+QueryString.campaign;
    }
    if (window.location.href.indexOf('adgroup') > -1) {
        adgroup = adgroup+QueryString.adgroup;
    }
    if (window.location.href.indexOf('keyword') > -1) {
        keyword = keyword+QueryString.keyword;
    }
    addAddParams(campaign,adgroup,keyword);
}

if (window.location.href.indexOf('gclid') > -1 || window.location.href.indexOf('yclid') > -1 || window.location.href.indexOf('campaign') > -1 || window.location.href.indexOf('msclkid') > -1 || window.location.href.indexOf('UTM_Source') > -1 ) { 
    var query = window.location.search.substring(1);
    setCookie('FullAdvParams',query, 30 );
}

if (window.location.search.indexOf('bc') > -1) {
    addBc(QueryString.bc);
}