
    CQ_Analytics.TestTarget.maxProfileParams = 11;

    if (CQ_Analytics.CCM) {
        if (CQ_Analytics.CCM.areStoresInitialized) {
            CQ_Analytics.TestTarget.registerMboxUpdateCalls();
        } else {
            CQ_Analytics.CCM.addListener("storesinitialize", function (e) {
                CQ_Analytics.TestTarget.registerMboxUpdateCalls();
            });
        }
    } else {
        // client context not there, still register calls
        CQ_Analytics.TestTarget.registerMboxUpdateCalls();
    }
    