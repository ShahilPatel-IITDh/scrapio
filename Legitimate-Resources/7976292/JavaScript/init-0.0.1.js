window.addEventListener("DOMContentLoaded", function (e) {
    new window.O11yRUM.RumReporter({
        apiURL: "https://rum.api.intuit.com/v1/rum/web",
        apiHeaders: {
            Authorization:
                "Intuit_APIKey intuit_apikey=prdakyresoXBoSxKMxdAfzsr10ofy6haro7yOKaE, intuit_apkey_version=1.0"
        },
        reportNavigation: !0,
        reportResources: !0,
        reportWebVitals: !0,
        tags: {
            webAppId: "Intuit.gotomarket.expdelactiv.gwpobservabilityrumclient",
            assetId: "8434133794755619141",
            env: "prod"
        },
        excludeFetchResources: []
    });
});