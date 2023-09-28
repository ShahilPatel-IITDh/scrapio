function getCookie(param) {
    var name = param + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            var cleanvalue = c.substring(name.length, c.length).replace(/[&\/\(\)\{\}\[\]\,\;\:\`\~\!\@\#\$\%\^\&\*\-\+\=\|\?\<\>\"\']/g, '');
            return cleanvalue;
        }
    }
    return "";
}

function getParameterValues(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            var cleanparam = urlparam[1].replace(/[&\/\(\)\{\}\[\]\,\;\:\`\~\!\@\#\$\%\^\&\*\_\-\+\=\|\?\<\>\"\']/g, '');
            return cleanparam;
        }
    }
}

function getReferrer() {
    var referrer = document.referrer.split('/')[2];
    var currentPageHostname = window.location.hostname;
    if (!referrer) {}
    else if (referrer !== currentPageHostname) {
        var cleanrefer = referrer.replace(/[&\(\)\{\}\[\]\,\;\:\`\~\!\@\#\$\%\^\*\=\<\>\"\']/g, '');
        return cleanrefer;
    }
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + escape(value) + expires + "; path=/";
}

function getPageDomain() {
    var pageDomain = window.location.hostname;
    var cleanPageDomain = pageDomain.replace(/[&\(\)\{\}\[\]\,\;\:\`\~\!\@\#\$\%\^\&\*\+\=\|\?\<\>\"\']/g, '');
    return cleanPageDomain;
}

function getPageurl() {
    var pageurl = window.location.pathname;
    var cleanpageurl = pageurl.replace(/[&\(\)\{\}\[\]\,\;\:\`\~\!\@\#\$\%\^\&\*\_\+\=\|\?\<\>\"\']/g, '');
    return cleanpageurl;
}  
  
function getthexref() {
    var $ = jQuery.noConflict();
    var myXreference = $("meta[name='xreference']").attr("content");
    if (!myXreference) {}
    else {
        var cleanxRef = myXreference.replace(/[&\(\)\{\}\[\]\,\;\:\`\~\!\@\#\$\%\^\*\=\<\>\"\']/g, '');
        return cleanxRef;
    }
}
