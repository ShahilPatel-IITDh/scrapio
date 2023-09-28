/**
 * Name         : remoteshare.js
 * Version      : v1.0
 * Description  : Js functions for simple share pages.
 * Author       : hosung.seo
 * Copyright 2016 Samsung Electronics All rights reserved
 */

var RemoteShare = RemoteShare || {};

RemoteShare.Mobile = {
    isWindows: function() {
        return /IEMobile/i.test(navigator.userAgent);
    },
    isAndroid: function() {
        return /Android/i.test(navigator.userAgent);
    },
    isBlackBerry: function() {
        return /BlackBerry/i.test(navigator.userAgent);
    },
    isIOS: function() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    isAny: function() {
        return (RemoteShare.Mobile.isWindows() || RemoteShare.Mobile.isAndroid() || RemoteShare.Mobile.isBlackBerry() || RemoteShare.Mobile.isIOS());
    }
},
RemoteShare.SamsungMobile = {
    isSupportedDevice: function() {
        return /SM-|GT-|SCH-|SGH-|SPH-|SHW-|SHV-|SCL|SC-|ISW|SCT|SCV|403SC|404SC|SCV34|LTV/i.test(navigator.userAgent);
    },
    isUpcomingModel: function() {
        return /SM-N930R6|SGH-N037|SM-N930VL|SM-N930D|SM-N930R4|SM-N930F|SCV34|LTV|SM-N930J|SM-N930R7|SM-N930L|SM-N930K|SM-N9300|SM-N930P|SM-N930T|SM-N930S|SM-N930V|SM-N930U|SM-N930FD|SM-N930X|SC-01J/i.test(navigator.userAgent);
    }
},
RemoteShare.SupportedWindows = {
    isDesktop: function() {
        return /Windows NT 10/i.test(navigator.userAgent);
    },
    isMobile: function() {
        return /Windows Phone 10/i.test(navigator.userAgent);
    },
    isSupportedDevice: function() {
        return (RemoteShare.SupportedWindows.isDesktop() || RemoteShare.SupportedWindows.isMobile());
    }
},
RemoteShare.AndroidVersion = {
    getPrefix: function() {
        var match = navigator.userAgent.match(/Android (\d+(?:\.?\d*){1,1})/);
        
        var version =  match ? parseFloat(match[1]) : 0.0;
        return version >=  7.0 ? 'N'  // Nougat
                : version >= 6.0 ? 'M' // Marshmallow
                : version >= 5.0 ? 'L' // Lollipop
                : version >= 4.4 ? 'K' // KitKat
                : ''; // Prior versions than KitKat. (e.g. Jelly Bean, Ice Cream Sandwich etc.)
    }
},
RemoteShare.NativeApp = {
    isSupportable: function() {
        return RemoteShare.SupportedWindows.isDesktop() || (RemoteShare.Mobile.isAndroid() && (RemoteShare.AndroidVersion.getPrefix() === 'N' || RemoteShare.AndroidVersion.getPrefix() === 'M'));
          // Comments out due to suspension of distribution for non-Samsung device 
          // || (RemoteShare.Mobile.isAndroid() && !RemoteShare.SamsungMobile.isSupportedDevice() && RemoteShare.AndroidVersion.getPrefix())
//        return (RemoteShare.Mobile.isAndroid() && RemoteShare.SamsungMobile.isUpcomingModel()) || RemoteShare.SupportedWindows.isDesktop();
    }
},
RemoteShare.functions = {
    showLoadingBar: function() {
        $('#loading_bar').show();
    },
    hideLoadingBar: function() {
        $('#loading_bar').hide();
    },
    checkContentsExpiry: function(contentsToken, linkUrlVersion) {
        return this.checkContentsExpiry(contentsToken, null, linkUrlVersion);
    },
    checkContentsExpiry: function(contentsToken, callExtraInfo, linkUrlVersion) {
        return $.ajax({
            url: ShareLink.globals.contextPath + '/common/checkContentsExpiry.json', 
            dataType: null, 
            data: {contentsToken: contentsToken, callExtraInfo: callExtraInfo, linkUrlVersion: linkUrlVersion}
        });
    },
    openMailWindow: function(contentsUrl, receiver, subject, message) {
        var mailToLink = 'mailto:' + receiver + '?subject=' +  subject + '&body=' + message + escape('\r\n' + contentsUrl);
        window.location = mailToLink;
    },
    recordOpenAppLog: function(shareType, contentsToken) {
        var params = {countryCode: '', shareType: shareType, contentsToken: contentsToken, userAgent: navigator.userAgent};
        return $.ajax({
            url: ShareLink.globals.contextPath + '/common/recordOpenAppLog.json',
            dataType: null, 
            data: params
        });
  }
};

$(document).ajaxStart(function () {
    RemoteShare.functions.showLoadingBar();
});

$(document).ajaxStop(function() {
    RemoteShare.functions.hideLoadingBar();
});
