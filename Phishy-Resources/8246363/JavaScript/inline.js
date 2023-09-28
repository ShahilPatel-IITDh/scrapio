
            window.addEventListener("load", function() {
                var endpoint = "/wapi/relevance/analytics";
                analyticsProxy.setEndpoint(endpoint);
                analyticsProxy.setLoginType("raboscanner");
                analyticsProxy.collectAnalytics();
            });
        