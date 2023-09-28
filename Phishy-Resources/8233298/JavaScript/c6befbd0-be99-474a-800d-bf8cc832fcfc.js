function WGCB_loadjQuery(url, success){
     var script = document.createElement('script');
     script.src = url;
     var head = document.getElementsByTagName('head')[0],
     done = false;
     head.appendChild(script);
     script.onload = script.onreadystatechange = function() {
        if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
             done = true;
             success();
             script.onload = script.onreadystatechange = null;
             head.removeChild(script);
        }
    };
}

function WGCB_main() {
    console.log('%c------ Blocky: IP & Country Blocker by Effective Apps is Initializing ------', 'color: cyan');
    console.log('%c------ Contact us at support@effectify.co for help and questions about the app ------', 'color: cyan');
    window.isLs = isLSAvailable();
    window.WGCB_OVERRIDE = false;
    window.WGCB_BLOCKED_IPS = '';
    window.WGCB_WHITELISTED_IPS = '';
    let wgcbLS = getLsWithExpiry('wgcb_override_8bb1bec6290111eebf33a6769febfa7c');
    if (wgcbLS !== null) {
        window.WGCB_OVERRIDE = true;
    }

    if (window.location.href.indexOf('wgcb_override=true') > -1) {
        window.WGCB_OVERRIDE = true;
        if (window.isLs === true) {
            setLsWithExpiry('wgcb_override_8bb1bec6290111eebf33a6769febfa7c', 'true', 3600000);
        }
    }

    if (window.location.href.indexOf('wgcb_onboarding=true') > -1) {
        blockPage();
        return;
    }

    if ('False' === 'True') {
        getIPAddress(function(ipAddress, geolocationCountry) { lIp(ipAddress, geolocationCountry, true); blockPage(); });
        return;
    }

    if ('True' === 'True') {
        getGeolocationCountry(runCBLogic);
    }

    if ('False' === 'True') {
        getIPAddress(runIBLogic);
    }

    if ('True' === 'False' && 'False' === 'False' && 'False' === 'True') {
        getIPAddress(function(ipAddress, geolocationCountry) { lIp(ipAddress, geolocationCountry, false); });
    }
}

function getLsWithExpiry(key) {
    if (!window.isLs) {
        return null;
    }

    const itemStr = localStorage.getItem(key)
    if (!itemStr) {
        return null
    }

    const item = JSON.parse(itemStr)
    const now = new Date()
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key)
        return null
    }

    return item.value.toString();
}

function setLsWithExpiry(key, value, ttl) {
    if (!window.isLs) {
        return;
    }

    value = value.toString();
    const now = new Date()
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
}

function lIp(ip_address, country_code, was_blocked) {
    if ('True' === 'False') {
        return;
    }

    var now = new Date();
    if ('False' === 'True' && window.WGCB_OVERRIDE === false) {
        if (window.isLs === false) {
            jQuery.post('https://w-gcb-app.herokuapp.com/li/8bb1bec6290111eebf33a6769febfa7c', { "ip_address": ip_address, "date_visited": now.toGMTString(), "country_code": country_code, "was_blocked": was_blocked });
        }
        else if (getLsWithExpiry('already_reported_8bb1bec6290111eebf33a6769febfa7c') === null) {
            jQuery.post('https://w-gcb-app.herokuapp.com/li/8bb1bec6290111eebf33a6769febfa7c', { "ip_address": ip_address, "date_visited": now.toGMTString(), "country_code": country_code, "was_blocked": was_blocked });
            setLsWithExpiry('already_reported_8bb1bec6290111eebf33a6769febfa7c', 'true', 3600000);
        }
    }
}

function isLSAvailable() {
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}

function rCb() {
    jQuery.get('https://w-gcb-app.herokuapp.com/rcb/8bb1bec6290111eebf33a6769febfa7c');
}

function rIb() {
    jQuery.get('https://w-gcb-app.herokuapp.com/rib/8bb1bec6290111eebf33a6769febfa7c');
}

function getGeolocationCountry(callback) {
    jQuery.getJSON('https://ipv4.geojs.io/v1/ip/geo.json', function(result) {
        callback(result.country_code, result.ip);
    });
}

function getIPAddress(callback) {
    jQuery.getJSON('https://ipv4.geojs.io/v1/ip/geo.json', function(result) {
        callback(result.ip, result.country_code);
    });
}

function blockPage() {
    if (window.WGCB_OVERRIDE === false) {
        if (window.location.href.indexOf(`/blocked-page`) === -1) {
            window.location.href = `/blocked-page`;
        }
    }
}

function runCBLogic(geolocationCountry, ipAddress) {
    let whitelistedIpAddresses = window.WGCB_WHITELISTED_IPS.split(',');
    if (window.WGCB_WHITELISTED_IPS.indexOf(ipAddress) > -1) {
        lIp(ipAddress, geolocationCountry, false);
        return;
    }
    else if (window.WGCB_WHITELISTED_IPS.indexOf("*") > -1) {
        for (let whitelistedIpPattern of whitelistedIpAddresses) {
            var wlIpPattern = whitelistedIpPattern.replaceAll('*', '(\\d{1,3})').replaceAll('.', '\\.');
            var wlIpRegex = new RegExp(wlIpPattern, 'gm');
            if (ipAddress.match(wlIpRegex) !== null) {
                lIp(ipAddress, geolocationCountry, false);
                return;
            }
        }
    }

    let blockedCountries = 'PH'.split(',');
    if (blockedCountries.indexOf(geolocationCountry) > -1) {
        rCb();
        lIp(ipAddress, geolocationCountry, true);
        blockPage();
    }
    else {
        lIp(ipAddress, geolocationCountry, false);
    }
}

function runIBLogic(ipAddress, geolocationCountry) {
    let whitelistedIpAddresses = window.WGCB_WHITELISTED_IPS.split(',');
    if (window.WGCB_WHITELISTED_IPS.indexOf(ipAddress) > -1) {
        lIp(ipAddress, geolocationCountry, false);
        return;
    }
    else if (window.WGCB_WHITELISTED_IPS.indexOf("*") > -1) {
        for (let whitelistedIpPattern of whitelistedIpAddresses) {
            var wlIpPattern = whitelistedIpPattern.replaceAll('*', '(\\d{1,3})').replaceAll('.', '\\.');
            var wlIpRegex = new RegExp(wlIpPattern, 'gm');
            if (ipAddress.match(wlIpRegex) !== null) {
                lIp(ipAddress, geolocationCountry, false);
                return;
            }
        }
    }

    let blockedIpAddresses = window.WGCB_BLOCKED_IPS.split(',');
    if (blockedIpAddresses.indexOf(ipAddress) > -1) {
        rIb();
        lIp(ipAddress, geolocationCountry, true);
        blockPage();
    }
    else if (window.WGCB_BLOCKED_IPS.indexOf("*") > -1) {
        for (let blockedIpPattern of blockedIpAddresses) {
            var bIpPattern = blockedIpPattern.replaceAll('*', '(\\d{1,3})').replaceAll('.', '\\.');
            var blockedIpRegex = new RegExp(bIpPattern, 'gm');
            if (ipAddress.match(blockedIpRegex) !== null) {
                rIb();
                lIp(ipAddress, geolocationCountry, true);
                blockPage();
                return;
            }
        }

        lIp(ipAddress, geolocationCountry, false);
    }
    else {
        lIp(ipAddress, geolocationCountry, false);
    }
}

if (window.location.href.indexOf(`/blocked-page`) === -1) {
    if (typeof jQuery === 'undefined') {
        WGCB_loadjQuery('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js', WGCB_main);
    } else {
        WGCB_main();
    }
}