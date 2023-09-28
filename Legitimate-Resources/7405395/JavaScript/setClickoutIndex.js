Window.clickoutIndex = 1;

function addClickoutPhp (data) {
    return function addClickoutPhpEventHandler(event) {
        console.log(event.button);
        if(event.button == 0 || event.button == 1){
            var pageview = rndPage;
            data.internalurl = data.internalurl.replace(data.clickout_id, pageview + '|' + Window.clickoutIndex
                + '|' + data.vendor_id);
            data.clickout_id = pageview + '|' + Window.clickoutIndex + '|' + data.vendor_id;

            aloomaTrackPageview("clickout", data);
            Window.clickoutIndex += 1;

            setTimeout(
                function(){
                    updateClickout(false);
                }, 0
            )
        }
    }
}

function getLinkParams(val) {
    var h = val.getAttribute("href");
    var onClickString = val.getAttribute("onclick");
    var myRegexp = /clickedLinkExternal\(\s*['|"](.*?)['|"]\s*,\s*['|"](.*?)['|"]\s*\)/g;
    var clickoutData = myRegexp.exec(onClickString);
    var pageview = rndPage;
    var url = new URL(h);

    var params = '';
    var vid = '';
    var deeplink = '';
    var pos = '';
    var clickout = '';

    var vendorName = 'Js Error';
    var btnName = 'Js Error';

    if(clickoutData) {
        var vendorName = clickoutData[2];
        var btnName = clickoutData[1];
    }

    url.searchParams.forEach(function(value, key) {
        if(key == 'vid') {
            vid = value;
            clickout = pageview + "|" + Window.clickoutIndex + "|" + vid;
        }

        if(key == 'dl') {
            deeplink = value;
        }

        if(key == 'pos') {
            pos = value;
        }

        if(key == 'pageview_id') {
            pageview = value;
        }

        if(key == 'clickout_id') {
            value = clickout;
        }

        if(params == '') {
            params = params + key + "=" + value;
        } else {
            params = params + "&" + key + "=" + value;
        }

    });

    if(!url.searchParams.has("pageview_id")) {
        url.searchParams.set("pageview_id", pageview);
        params = params + "&pageview_id" + "=" + pageview;
    }

    if(!url.searchParams.has("clickout_id")) {
        url.searchParams.set("clickout_id", clickout);
        params = params + "&clickout_id" + "=" + clickout;
    }
    if(typeof is_ppc_page !== 'undefined' || typeof is_correct_btn_name !== 'undefined' || (typeof is_blog_pages !== 'undefined' && url.searchParams.get("target").includes('exit_intent')) ){
        btnName = url.searchParams.get("target")
    }

    return {
        "pageview_id": pageview,
        "clickout_id" : clickout,
        "vendor_id" : vid,
        "btnName" : btnName,
        "deeplink": deeplink,
        "pos"   : pos,
        "current_url" : window.location.href,
        "internalurl" : url.protocol + "//" + url.host + "/?" + params
    }
}

function setLinkClickout(val, addEventListener) {
    var aloomaClickData = getLinkParams(val);

    aloomaClickData.splitCurrentUrl = {};
    aloomaClickData.splitCurrentUrl.host = window.location.origin + window.location.pathname;
    aloomaClickData.splitCurrentUrl.params = TrackingQueryString;

    val.setAttribute('href', aloomaClickData.internalurl);

    if (addEventListener) {
        val.addEventListener('click', addClickoutPhp(aloomaClickData));
        val.addEventListener('auxclick', addClickoutPhp(aloomaClickData) );
    }
}

var updateClickout = function(addEventListenerToAllHref){
    var linksWithRedirectKeyInHref = Array.from( document.querySelectorAll('a[href*="'+redirectKey+'"]') );
    // console.log(linksWithRedirectKeyInHref);
    asyncForEach(linksWithRedirectKeyInHref, addEventListenerToAllHref, setLinkClickout)
    // linksWithRedirectKeyInHref.forEach(function(val){
    //     setLinkClickout(val, addEventListenerToAllHref);
    // });
};
function asyncForEach(arr, param, fn){
    // console.log(arr.length);
    if (arr.length) {
        setTimeout(function(){
            fn(arr.shift(), param);
            asyncForEach(arr, param, fn);
        }, 0);
    }
}

var getOS = function() {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'mac';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'ios';
  } else if (/Android/.test(userAgent)) {
    os = 'android';
  } else {
    os = 'desktop';
  }

  return os;
};

var appendPlatform = function() {
  var os = getOS()
  if(os != 'desktop' || true) {
    var append = '&platform=' + os;
  }

  return append;
}
// document.addEventListener('DOMContentLoaded', function(){
// });            
document.addEventListener('DOMContentLoaded', function(){
    if (window.location.pathname !== 'about-us') {
        var linksWithRedirectKeyInHref = document.querySelectorAll('a[href*="'+redirectKey+'"]');
        var list = Array.from(linksWithRedirectKeyInHref);
        // console.log('list', list);
        addParemeterToHrefInTheLinksList(list, function(h){
            return h + appendPlatform();
        });
    }
    updateClickout(true);
});            
// (function () {

//     // jQuery('a[href*="'+redirectKey+'"]').attr('href', function(i, h) {
  
// })();