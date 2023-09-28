
        window.__bloomberg__ = window.__bloomberg__ || {};
        window.__bloomberg__.cmp = {
            init: function initCMP(footerReadyEvent) {
    console.warn("[navi/cmp] Need to migrate to V2 implementation!");
    var CCPA_FOOTER_LABELS = {
        ja: "私の個人情報を販売しない(カリフォルニア州消費者プライバシー法)",
        en: "Do Not Sell or Share My Personal Information"
    };
    var GDPR_FOOTER_LABELS = {
        ja: "クッキーを管理する",
        en: "Manage Cookies"
    };
    if (!window.__tcfapi) {
        console.warn("[navi/cmp] CMP required stub missing, exiting `initCMP`");
        return;
    }
    var bbgConsentReadyFlag = false;
    var sourcepointCMPLoaded = false;
    var footerReadyEventFired = false;
    var SOURCEPOINT_GDPR_PRIVACY_MANAGER_ID = 192913;
    var SOURCEPOINT_CCPA_PRIVACY_MANAGER_ID = "5f07906b43304a114d911db3";
    var trackerTimeStart = Date.now();
    /* https://support.google.com/analytics/answer/10022331?hl=en */
    window["gtag_enable_tcf_support"] = true;
    /* Listens for GDPR/CCPA consent events, converts it to bbg consent string, and stores it in a cookie */
    waitForConsent({
        onGDPR: function (tcData) {
            if (tcData.eventStatus !== "tcloaded" && tcData.eventStatus !== "useractioncomplete") {
                console.warn("[navi/cmp] CMP UI is shown, waiting for user consent");
                return;
            }
            window.__tcfapi("getCustomVendorConsents", 2, function (customConsents, success) {
                if (!success) {
                    console.error("[navi/cmp] Failed to `getCustomVendorConsents` with __tcfapi");
                    return;
                }
                var bbgConsentString = convertFromGDPRData(customConsents);
                setCookie("bbgconsentstring", bbgConsentString, 365);
                fireBBGConsentReadyGTMEventOnce();
                console.log("[navi/cmp] GDPR applies, custom consent string", bbgConsentString);
            });
        },
        onCCPA: function (uspData) {
            var bbgConsentString = convertFromCCPAData(uspData);
            setCookie("bbgconsentstring", bbgConsentString, 365);
            fireBBGConsentReadyGTMEventOnce();
            console.log("[navi/cmp] CCPA applies, custom consent string", bbgConsentString);
        },
        onError: function (error) {
            console.warn("[navi/cmp]", error);
            if (!navigator.sendBeacon)
                return;
            navigator.sendBeacon("/javelin/api/cmp_tracker", new Blob([JSON.stringify({
                    url: window.location.href,
                    event: "sourcepoint_cmp_error",
                    message: error.message,
                    userAgent: navigator.userAgent,
                    timeElapsed: (Date.now() - trackerTimeStart) / 1000
                })], { type: "application/json" }));
        }
    });
    /* Listens for GDPR/CCPA consent events and injects proper footer link */
    waitForConsent({
        onGDPR: function () {
            injectWhenFooterReady(() => injectCmpLink(GDPR_FOOTER_LABELS, function () {
                window._sp_.loadPrivacyManagerModal(SOURCEPOINT_GDPR_PRIVACY_MANAGER_ID);
            }));
        },
        onCCPA: function () {
            injectWhenFooterReady(() => injectCmpLink(CCPA_FOOTER_LABELS, function () {
                window._sp_ccpa.loadPrivacyManagerModal(null, SOURCEPOINT_CCPA_PRIVACY_MANAGER_ID);
            }));
        },
        once: true
    });
    window.addEventListener("beforeunload", function () {
        if (!navigator.sendBeacon)
            return;
        if (!sourcepointCMPLoaded || !wasGtmDomEventPushed() || !didGoogletagLoadStart()) {
            navigator.sendBeacon("/javelin/api/cmp_tracker", new Blob([JSON.stringify({
                    url: window.location.href,
                    event: "integration_load_anomaly",
                    userAgent: navigator.userAgent,
                    sourcepointCMPLoaded: sourcepointCMPLoaded,
                    gtmDom: wasGtmDomEventPushed(),
                    gtmLoad: wasGtmLoadEventPushed(),
                    googletagLoadStart: didGoogletagLoadStart(),
                    message: "See attached metadata",
                    timeElapsed: (Date.now() - trackerTimeStart) / 1000
                })], { type: "application/json" }));
        }
        if (sourcepointCMPLoaded && !bbgConsentReadyFlag) {
            navigator.sendBeacon("/javelin/api/cmp_tracker", new Blob([JSON.stringify({
                    url: window.location.href,
                    event: "bbg_consent_ready",
                    userAgent: navigator.userAgent,
                    message: "User left the page before CMP was submitted",
                    timeElapsed: (Date.now() - trackerTimeStart) / 1000
                })], { type: "application/json" }));
        }
    });
    function waitForConsent(options) {
        window.__tcfapi("addEventListener", 2, function (tcData, success) {
            options.onError = options.onError || function () { };
            if (!success) {
                options.onError(new Error("[navi/cmp] Failure received from __tcfapi `addEventListener`"));
                return;
            }
            /* https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md#what-does-the-gdprapplies-value-mean */
            if (tcData.gdprApplies === undefined) {
                options.onError(new Error("[navi/cmp] Received `gdprApplies` as undefined"));
                return;
            }
            sourcepointCMPLoaded = true;
            if (tcData.gdprApplies) {
                options.onGDPR(tcData);
            }
            else {
                window.__uspapi("getUSPData", 1, function (uspData, success) {
                    if (!success) {
                        options.onError(new Error("[navi/cmp] Failed to `getUSPData` with __uspapi"));
                        return;
                    }
                    options.onCCPA(uspData);
                });
            }
            if (options.once) {
                window.__tcfapi("removeEventListener", 2, function (success) {
                    if (!success) {
                        options.onError(new Error("[navi/cmp] Failed to remove __tcfapi event listener with id: " + tcData.listenerId));
                    }
                }, tcData.listenerId);
            }
        });
    }
    function waitForDOM(fn) {
        document.readyState === "loading"
            ? document.addEventListener("DOMContentLoaded", fn)
            : fn();
        window.addEventListener("load", fn);
    }
    function injectWhenFooterReady(injectCallback) {
        // Below logic is to avoid hydration mismatch errors in NextJS apps
        // If footer isn't ready yet listen for ready event before proceeding
        if (footerReadyEvent && !footerReadyEventFired) {
            const timer = setTimeout(injectCallback, 20000);
            document.addEventListener(footerReadyEvent, () => {
                clearTimeout(timer);
                injectCallback();
            }, { once: true });
        }
        else {
            waitForDOM(injectCallback);
        }
    }
    (function setFooterReadyEventFired() {
        if (!footerReadyEvent)
            return;
        document.addEventListener(footerReadyEvent, () => {
            footerReadyEventFired = true;
        }, { once: true });
    })();
    function injectCmpLink(labels, triggerCmpModal) {
        var cmpLink = document.querySelector("#cmp-footer-link");
        if (cmpLink && cmpLink.getAttribute("data-status") !== "injected") {
            cmpLink.textContent = labels[cmpLink.getAttribute("data-lang") || "en"];
            cmpLink.addEventListener("click", triggerCmpModal);
            cmpLink.setAttribute("data-status", "injected");
            console.log("[navi/cmp] Successfully injected footer link", cmpLink);
            return;
        }
        console.warn("[navi/cmp] Footer link was not found or was already injected", cmpLink);
    }
    function convertFromCCPAData(uspData) {
        return uspData.uspString.charAt(2) === "N" ? "req1fun1pad1" : "req1fun0pad0";
    }
    function convertFromGDPRData(consents) {
        var funId = "5f29641df70e58290010d5aa";
        var padId = "5f2c366203c8584077858803";
        var grantedConsents = consents.consentedPurposes.concat(consents.legIntPurposes);
        var reqFlag = "req1", funFlag = "fun0", padFlag = "pad0";
        grantedConsents.forEach(function (purpose) {
            if (purpose._id === funId) {
                funFlag = "fun1";
                Object.keys(consents.grants).forEach(function (vendorId) {
                    var grant = consents.grants[vendorId].purposeGrants;
                    if (funId in grant && !grant[funId]) {
                        funFlag = "fun0";
                    }
                });
            }
            if (purpose._id === padId) {
                padFlag = "pad1";
                Object.keys(consents.grants).forEach(function (vendorId) {
                    var grant = consents.grants[vendorId].purposeGrants;
                    if (padId in grant && !grant[padId]) {
                        padFlag = "pad0";
                    }
                });
            }
        });
        return [reqFlag, funFlag, padFlag].join("");
    }
    function getParentDomain(hostname) {
        const parts = hostname.split(".");
        const bloombergPartIndex = parts.findIndex((part) => part === "bloomberg");
        if (bloombergPartIndex === -1) {
            return hostname;
        }
        return parts.slice(bloombergPartIndex).join(".");
    }
    function setCookie(name, value, days) {
        var d = new Date;
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
        document.cookie = name + "=" + value + ";path=/;domain=" + getParentDomain(window.location.hostname) + ";expires=" + d.toUTCString();
    }
    function fireBBGConsentReadyGTMEventOnce() {
        if (!bbgConsentReadyFlag) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: "bbg_consent_ready" });
            // add support for liveblog-frontend, which uses a different data layer array
            if (/^\/?news\/live-blog/.test(window.location.pathname)) {
                window.dataLayerMNTH5N = window.dataLayerMNTH5N || [];
                window.dataLayerMNTH5N.push({ event: "bbg_consent_ready" });
            }
            /* Needed to guarantee that we fire GTM `bbg_consent_ready` event only once */
            bbgConsentReadyFlag = true;
        }
    }
    function wasGtmDomEventPushed() {
        try {
            return Boolean(window.dataLayer.find(function (command) {
                return command.event === "gtm.dom";
            }));
        }
        catch (e) {
            return null;
        }
    }
    function wasGtmLoadEventPushed() {
        try {
            return Boolean(window.dataLayer.find(function (command) {
                return command.event === "gtm.load";
            }));
        }
        catch (e) {
            return null;
        }
    }
    function didGoogletagLoadStart() {
        try {
            return Boolean(window.googletag._loadStarted_);
        }
        catch (e) {
            return null;
        }
    }
}
        };
        window.__bloomberg__.cmp.init("CmpFooterReadyEvent");
    