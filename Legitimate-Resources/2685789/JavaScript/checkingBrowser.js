function checking_browser() {
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var nameOffset, verOffset, ix, requiredVersion, isRequired;
    isRequired = true;

// In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset = nAgt.indexOf("Opera")) != -1) {
        browserName = "Opera";
        requiredVersion = 46;
        fullVersion = nAgt.substring(verOffset + 6);
        if (parseFloat(fullVersion) < requiredVersion) {
            isRequired = false;
        }
    }
// In MSIE, the true version is after "MSIE" in userAgent. Internet Explorer is not supported since COS-2.4.0
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
        browserName = "Microsoft Internet Explorer";
        isRequired = false;
    }
// In Chrome, the true version is after "Chrome"
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
        browserName = "Chrome";
        requiredVersion = 60;
        fullVersion = nAgt.substring(verOffset + 7);
        if (parseFloat(fullVersion) < requiredVersion) {
            isRequired = false;
        }
    }
// In Safari, the true version is after "Safari" or after "Version"
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
        browserName = "Safari";
        requiredVersion = 10.1;
        fullVersion = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
        if (parseFloat(fullVersion) < requiredVersion) {
            isRequired = false;
        }
    }
// In Firefox, the true version is after "Firefox"
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
        browserName = "Mozilla Firefox";
        requiredVersion = 55;
        //fix for ESR detection
        //required version for ESR is 52, regular release 55
        //webAssembly isn't supported by Mozilla Firefox ESR >=52
        try {
            WebAssembly;
        } catch (SyntaxError) {
            browserName = "Mozilla Firefox ESR";
            requiredVersion = 52;
        }
        fullVersion = nAgt.substring(verOffset + 8);
        if (parseFloat(fullVersion) < requiredVersion) {
            isRequired = false;
        }
    }

    if (!isRequired) {
        $('.pop-up').css('display', 'block');
        $('.browser-checker')[0].innerHTML = 'You are using an unsupported browser version. Some of the functionalities may not work properly. If you continue using ' + browserName + ', please update to version ' + requiredVersion + ' or later. For proper user experience, please use Chrome/Chromium version 60 or later';
        $('.icon-exit-browser-checker').on("click", function () {
            $('.pop-up').css("display", "none");
        });
        if ($('.portlet-boundary').hasClass("portlet-login")) {
            $('head').append('<link rel="stylesheet" type="text/css" href="/charter-theme/css/login.css">');
        }
    } else if (browserName !== 'Opera' && browserName !== 'Microsoft Internet Explorer' && browserName !== 'Chrome' && browserName !== 'Safari' && browserName !== 'Mozilla Firefox' && browserName !== 'Mozilla Firefox ESR') {
        $('.pop-up').css('display', 'block');
        $('.browser-checker')[0].innerHTML = 'You are using an unsupported browser version. Some of the functionalities may not work properly. For proper user experience, please use Chrome/Chromium version 60 or later';
        $('.icon-exit-browser-checker').on("click", function () {
            $('.pop-up').css("display", "none");
        });
        if ($('.portlet-boundary').hasClass("portlet-login")) {
            $('head').append('<link rel="stylesheet" type="text/css" href="/charter-theme/css/login.css">');
        }
    } else {
        $('.pop-up').css('display', 'none');
    }
}

//add for training environment,
function checkIfTraining() {
    //for testing only
    if (window.location.href.indexOf('charter.training') > -1 && $('.portlet-boundary').hasClass("portlet-login")) {
        $('fieldset').after('<div class="aui-fieldset-content right"><span class="aui-field aui-field-text"><span class="login-info">If you dont have a personal account, please use:<span class="login-labels"><label>User ID:<span style="padding-right: 26px;display: inline;"></span>AU_public</label><label>Password:<span style="padding-right:12px; display:inline"></span>AU_public</label></span></span></span></div>');
        $('head').append('<link rel="stylesheet" type="text/css" href="/charter-theme/css/login_training.css">');
    }
}

$(document).ready(function () {
    checking_browser();
    checkIfTraining();
    $('li.title-list').removeClass('title-list');
});
