
    App.vent.on('deposit:success', function(data) {
        var numberNoOfDeposits = parseInt(data.depositsCount);
        if(numberNoOfDeposits == 1){
            title = 'First deposit intent';
            trackingCode  = '32Red_Client Side Tracking_First Deposit';
        } else if (numberNoOfDeposits > 1){
            title = 'Further deposit intent';
            trackingCode  = '32Red_Client Side Tracking_Further Deposit';
        } else {
            title = 'deposit code triggered but error';
            trackingCode  = '32Red_Client Side Tracking_Error Deposit';
        }
        data.site_section = window.location.pathname.split('/')[1]
        var pathName = window.location.pathname;
        if (data.site_section === ''){
           data.site_section = 'home';
        } else if (pathName.match(/\/promotions(\/)?/gi)) {
           data.site_section = 'promotions';
        }
        var adf_item = varsForAllTrack(title);
        if (typeof (data.transactionTotal) != "undefined") adf_item.sl = data.transactionTotal.toString();
        if (typeof (data.transactionId) != "undefined") adf_item.id = data.transactionId;
        if (typeof (data.userId) != "undefined") adf_item.sv1 = data.userId;
        if (typeof (data.depositsCount) != "undefined") adf_item.sv2 = data.depositsCount.toString();
        if (typeof (data.currency) != "undefined") adf_item.sv5 = data.currency;
        if (typeof (data.site_section) != "undefined") adf_item.sv14 = data.site_section;
        if (typeof ($.cookie('User'))!="undefined" && typeof (JSON.parse($.cookie('User'))['loyaltyTier']['tierName'])!="undefined" && JSON.parse($.cookie('User'))['loyaltyTier']['tierName']!=null) adf_item.sv16 = JSON.parse($.cookie('User'))['loyaltyTier']['tierName'];
        sendAdformData(adf_item, trackingCode);
    });
