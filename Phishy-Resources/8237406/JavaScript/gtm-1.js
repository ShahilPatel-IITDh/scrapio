// RESPONSIVE.constant.user is used to pass through user data, whether they are logged in or not
if (typeof(RESPONSIVE) !== 'undefined' && typeof(RESPONSIVE.constant.user) !== 'undefined') {
    if (typeof(dataLayer) !== 'undefined'){
        dataLayer[0].user = RESPONSIVE.constant.user;
    } else {
        var dataLayer = [{
            'user': RESPONSIVE.constant.user
        }];
    }
} else if (typeof(GUSER) !== 'undefined') {
    if (typeof(dataLayer) !== 'undefined'){
        dataLayer[0].user = GUSER;
    } else {
        var dataLayer = [{
            'user': GUSER
        }];
    }
}

if (typeof($.cookie('JXFRONTUID')) !== 'undefined') {
 if (typeof(dataLayer) !== 'undefined'){
  dataLayer[0].JXFRONTUID = $.cookie('JXFRONTUID');
 } else {
  var dataLayer = [{
   'JXFRONTUID': $.cookie('JXFRONTUID')
  }];
 }
}

if (typeof($.cookie('bidalgouid')) !== 'undefined') {
 if (typeof(dataLayer) !== 'undefined'){
  dataLayer[0].bidalgouid = $.cookie('bidalgouid');
 } else {
  var dataLayer = [{
   'bidalgouid': $.cookie('bidalgouid')
  }];
 }
}

(function(w, d, s, l, i) {
 w[l] = w[l] || [];
 w[l].push(
  { 'gtm.start': new Date().getTime(), event: 'gtm.js' }
 );
 var f = d.getElementsByTagName(s)[0],
  j = d.createElement(s),
  dl = l != 'dataLayer' ? '&l=' + l : '';
 j.async=true;
 j.src='//www.googletagmanager.com/gtm.js?id=' + i + dl;
 f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-NRKJSQ');
