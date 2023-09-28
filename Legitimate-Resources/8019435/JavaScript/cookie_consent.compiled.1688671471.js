(() => {
    var whitelistCookies = [ "XSRF-TOKEN", "laravel_session", "crisp-client", "UKRedirectModalShown", "pay_later_confirm", "pm_selected_tab" ];
    var consentModeExists = localStorage.getItem("consentMode");
    var eventBus, crispChat;
    var hideCookieConsent = () => {
        var cookieConsent = document.querySelector(".cookie-consent");
        if (cookieConsent) {
            cookieConsent.classList.add("hide");
            if (eventBus) {
                eventBus.dispatch(new Event("CookieConsent:closed"));
            }
            crispChat = document.querySelector(".cc-nsge");
            if (crispChat) {
                crispChat.removeAttribute("style");
            }
        }
    };
    var showCookieConsent = () => {
        var cookieConsent = document.querySelector(".cookie-consent");
        if (cookieConsent) {
            cookieConsent.classList.remove("hide");
            if (eventBus) {
                eventBus.dispatch(new Event("CookieConsent:opened"));
            }
            window.addEventListener("CrispLoaded", function() {
                crispChat = document.querySelector(".cc-nsge");
                if (crispChat) {
                    var cookieConsentBanner = document.querySelector(".cookie-consent__banner");
                    crispChat.setAttribute("style", "bottom:" + (cookieConsentBanner.offsetHeight + 20) + "px !important");
                }
            });
        }
    };
    function deleteCookie(name, value, path) {
        var hostname = window.location.hostname.split(".");
        var domains = [ "." + hostname.slice(-2).join("."), "." + hostname.slice(-3).join("."), "." + hostname.slice(-4).join(".") ];
        for (const domain of domains) {
            document.cookie = name + "=" + value + ";path=/;domain=" + domain + ";expires=Thu, 01 Jan 1970 00:00:01 UTC";
        }
    }
    var expireCookiesNotInWhitelist = whitelist => {
        const cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            var equalsIndex = cookie.indexOf("=");
            var cookieName = cookie.substring(0, equalsIndex);
            var cookieValue = cookie.substring(equalsIndex + 1, cookie.indexOf(";"));
            var isInWhitelist = whitelist.some(whitelistedSubstring => {
                return cookieName.indexOf(whitelistedSubstring) !== -1;
            });
            if (!isInWhitelist) {
                deleteCookie(cookieName, cookieValue);
            }
        }
    };
    var setCookieConsent = consent => {
        if (consent) {
            consent.non_essential = consent.non_essential === true || consent.non_essential === "granted" ? true : false;
            const consentMode = {
                essential: "granted",
                non_essential: consent.non_essential ? "granted" : "denied",
                ad_storage: consent.non_essential ? "granted" : "denied",
                analytics_storage: consent.non_essential ? "granted" : "denied"
            };
            gtag("consent", consent.status ? consent.status : "default", consentMode);
            if (consent.status === "update") {
                localStorage.setItem("consentMode", JSON.stringify(consentMode));
            }
        }
    };
    var createCookieCTAListeners = () => {
        var allowAllCTA = document.querySelector(".js-cookie-consent-allow");
        allowAllCTA.addEventListener("click", e => {
            e.preventDefault();
            setCookieConsent({
                status: "update",
                essential: true,
                non_essential: true
            });
            hideCookieConsent();
        });
        var declineCTA = document.querySelector(".js-cookie-consent-decline");
        declineCTA.addEventListener("click", e => {
            e.preventDefault();
            setCookieConsent({
                status: "update",
                essential: true,
                non_essential: false
            });
            hideCookieConsent();
            expireCookiesNotInWhitelist(whitelistCookies);
        });
    };
    if (typeof gtag === "undefined") {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
    }
    if (consentModeExists === null) {
        setCookieConsent({
            status: "default",
            essential: true,
            non_essential: true
        });
    } else {
        setCookieConsent(JSON.parse(consentModeExists));
    }
    window.addEventListener("load", () => {
        eventBus = window.eventBus;
        if (eventBus) {
            eventBus.addEventListener("CookieConsent:Show", () => {
                showCookieConsent();
            });
            eventBus.addEventListener("CookieConsent:Reset", () => {
                expireCookiesNotInWhitelist(whitelistCookies);
                createCookieCTAListeners();
                showCookieConsent();
                localStorage.removeItem("consentMode");
            });
        }
        if (consentModeExists === null && gtag) {
            createCookieCTAListeners();
            showCookieConsent();
        }
    });
})();