var popCookieName = "pwindow";

var alreadyExecuted = false;
var browserUserAgent = navigator.userAgent;
var time = new Date().getTime();

var config = "width=1000,toolbar=1,menubar=1,resizable=1,scrollbars=1";

function cancelPop() {
    alreadyExecuted = true;
}

function displayTheWindow(urlToShow, execOnChrome) {
    var didPop = false;
    if (alreadyExecuted == false) {
        alreadyExecuted = true;

        var ff_new = false;
        var chrome_new = false;

        for (var i = 12; i <= 20; i++) {
            if (browserUserAgent.search("Firefox/" + i) > -1) {
                ff_new = true;
                break;
            }
        }

        for (var i = 21; i <= 40; i++) {
            if (browserUserAgent.search("Chrome/" + i) > -1) {
                chrome_new = true;
                break;
            }
        }

        if (ff_new == true || chrome_new == true) {
            if (!execOnChrome) {
                alreadyExecuted = false;
            }
            else {
                config = "width=" + screen.width + ", height=" + screen.height + ",toolbar=1,menubar=1,resizable=1,scrollbars=1;";
                var w = window.open(urlToShow, popCookieName, config);
                w.blur();
                window.focus();

                if (w) {
                    var w2 = window.open('about:blank');

                    if (w2) {
                        w2.focus();
                        w2.close();
                    } else {
                        window.showModalDialog("javascript:window.close()", null, "dialogtop:99999999;dialogleft:999999999;dialogWidth:1;dialogHeight:1");
                    }

                    didPop = true;
                }
            }
        }
        else if (browserUserAgent.search("Chrome") > -1) {
            if (!execOnChrome) {
                alreadyExecuted = false;
            }
            else {
                config = "width=" + screen.width + ", height=" + screen.height + ",toolbar=1,menubar=1,resizable=1,scrollbars=1";
                var w = window.open(urlToShow, popCookieName, config).blur();
                window.focus();
                if (w) {
                    var w2 = window.open('about:blank');

                    if (w2) {
                        w2.focus();
                        w2.close();
                    } else {
                        window.showModalDialog("javascript:window.close()", null, "dialogtop:99999999;dialogleft:999999999;dialogWidth:1;dialogHeight:1");
                    }

                    didPop = true;
                }
            }
        }
        else if (browserUserAgent.search("Firefox/3") > -1 || browserUserAgent.search("Safari") > -1) {
            config = "width=" + screen.width + ", height=" + screen.height + ",toolbar=1,menubar=1,resizable=1,scrollbars=1";
            var w = window.open(urlToShow, popCookieName, config).blur();
            window.focus();
            if (w)
                didPop = true;
        }
        else if (browserUserAgent.search("Firefox") > -1) {
            config = "width=" + screen.width + ", height=" + screen.height + ",toolbar=1,menubar=1,resizable=1,scrollbars=1";
            var w = window.open(urlToShow, popCookieName, config);
            var temp = w.window.open("about:blank");
            temp.close();
            if (w)
                didPop = true;
        }
        else if (browserUserAgent.search("Opera") > -1) {
            var w = window.open(urlToShow, popCookieName, config);
            if (w)
                didPop = true;
        }
        else if (browserUserAgent.search("MSIE") > -1) {
            config = "width=" + screen.width + ", height=" + screen.height + ",toolbar=1,menubar=1,resizable=1,scrollbars=1";
            var w = window.open(urlToShow, popCookieName, config);
            window.setTimeout(window.focus, 750);
            window.setTimeout(window.focus, 850);
            if (w) {
                w.blur();
                didPop = true;
            }
        }
        else {
            var w = window.open(urlToShow, popCookieName, config);
            w.blur();
            window.focus();
            if (w)
                didPop = true;
        }

    }
}