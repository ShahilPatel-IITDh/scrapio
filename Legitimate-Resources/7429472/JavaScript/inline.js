
    if(window.CQ_Analytics && window.CQ_Analytics.TestTarget) {
        window.CQ_Analytics.TestTarget.maxProfileParams = 11;
        if (window.CQ_Analytics.CCM) {
            if (window.CQ_Analytics.CCM.areStoresInitialized) {
                window.CQ_Analytics.TestTarget.registerMboxUpdateCalls();
            } else {
                window.CQ_Analytics.CCM.addListener("storesinitialize", function (e) {
                    window.CQ_Analytics.TestTarget.registerMboxUpdateCalls();
                });
            }
        } else {
            // client context not there, still register calls
            window.CQ_Analytics.TestTarget.registerMboxUpdateCalls();
        }
    }
    