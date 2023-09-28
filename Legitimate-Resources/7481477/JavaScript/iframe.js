var addEvent = function(e, t, n) {
    if (e.addEventListener) {
        e.addEventListener(t, n, false)
    } else {
        e.attachEvent("on" + t, n)
    }
};

var showLog = false;

var showMessage = function(message) {
    if (showLog) {
        console.log(message);
    }
}

var getCanonicalUrl = function() {
    var links = document.getElementsByTagName("link");
    for (var i = 0; i < links.length; i++) {
        if (links[i].rel) {
            if (links[i].rel.toLowerCase() === "canonical") {
                return links[i].href;
            }
        }
    }
    return "";
}

var iframe = document.createElement("iframe");
iframe.style.display = 'none';
iframe.style.visibility = 'hidden';
iframe.id = "IfmWindow";

var creatIframe = function() {
    var paramsObj = {
        "queryParam": document.location.search ? document.location.search.slice(1) : "",
        "pageURL": document.URL ? document.URL : "",
        "canonicalUrl": getCanonicalUrl(),
        "sourceUrl": document.URL ? document.URL : "",
        "documentReferrer": document.referrer ? document.referrer : "",
        "requestCount": history ? history.length : "",
        "ratAccountId": document.getElementById("ratAccountId") ? document.getElementById("ratAccountId").value : "",
        "scAccountId": document.getElementById("scAccountId") ? document.getElementById("scAccountId").value : "",
        "iframeJsVersion": "1.0.0",
        "trackingParam": document.getElementById("trackingParam") ? document.getElementById("trackingParam").value : ""
    };
    showMessage(paramsObj);

    var paramsStr = "";
    for (var key in paramsObj) {
        if (paramsObj.hasOwnProperty(key)) {
            paramsStr += key + "=" + encodeURIComponent(paramsObj[key]) + "&";
        }
    }
    paramsStr = "#" + paramsStr.slice(0, -1);

    showMessage(paramsStr);

    iframe.src = '//www.rakuten.co.jp/com/ap/analytics/iFrameTracking/iframe.html?v=20170904' + paramsStr;

    document.body.appendChild(iframe);
}

addEvent(window, "load", function(event) {
    creatIframe();
});

addEvent(document, "sendData", function(event) {
    if (!event.detail) {
        showMessage("There is no data send");
        return;
    }
    if (!event.detail.sc) {
        showMessage("There is no sitecatalyst data");
        return;
    }
    var data = event.detail.sc;

    var eVarRgx = /^eVar[0-75]$/,
        propRgx = /^prop[0-75]$/;

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key.search(eVarRgx) < 0 && key.search(propRgx) < 0 && key !== "events") {
                showMessage("not right sitecatalyst data");
                return;
            }
        }
    }

    var dataStr = JSON.stringify(data);
    showMessage(dataStr);
    iframe.contentWindow.postMessage(dataStr, "*");
});
