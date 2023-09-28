dataLayerFun = {
    login: function (callback) {
        var self = this
        $.ajax({
            url: "/ga/user.php",
            type: "get",
            success: function (response) {
                var res = JSON.parse(response)
                // console.log(res);
                if (res.code == "OK") {
                    var data = res.data
                    var dataLayerValue = {
                        'event': 'login',
                        'Usertype': data.userType,
                        'RegSource': data.regSource,
                        'LoginAmount': data.loginAmount,
                        'BookAmount': data.bookAmount,
                        'SellBook': data.sellBook,
                    }
                    self.addCookie('dataLayer', JSON.stringify(dataLayerValue))
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push(dataLayerValue)
                }
                if (typeof callback == 'function') {
                    callback()
                }
            },
            error: function (error) {
                console.log(error)
                if (typeof callback == 'function') {
                    callback()
                }
            }
        });
    },
    updateLoginDataLayer: function () {
        window.dataLayer = window.dataLayer || [];
        var cookieVal = this.getCookie('dataLayer');
        var obj = cookieVal == '' ? {} : JSON.parse(cookieVal);
        window.dataLayer.push(obj)
    },
    uploadBook: function (uType) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'upload_book',
            'usertype': uType,
        })
    },
    buynow: function (uType) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'checkout',
            'usertype': uType,
        })
    },
    uploadBookSucces: function (uType){
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'upload_book_success',
            'Usertype': uType,
        })
    },
    cancelSucces: function (uType){
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'cancel_subscr_success',
            'Usertype': uType,
        })
    },
    cancelClick: function (uType){
        $.ajax({
            url: "/ga/unsubscr.php",
            type: "post",
            success: function (response) {
                var res = JSON.parse(response)
                console.log(res);
                if (res.code == "OK") {
                    var data = res.data
                    var year = "Year"
                    var month = "Month"
                    var period =  data.period
                    if(period.endsWith('Y')){
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                            'event': 'click_cancel_subscr',
                            'Usertype': uType,
                            'paymentperiod': year
                        })
                    }else if(period.endsWith('M')){
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                            'event': 'click_cancel_subscr',
                            'Usertype': uType,
                            'paymentperiod': month
                        })
                    }
                }
            },
            error: function (error) {
                console.log(error)
            }
        });
    },
    purchase: function (uType,sId,oId){
        var self = this
        if(typeof oId != 'undefined' && oId && typeof sId != 'undefined' && sId){
            console.log('sId:' + sId);
            console.log('oId:' + oId);
            $.ajax({
                url: "/ga/subscr.php",
                type: "post",
                data: {
                    'o_id': oId,
                    's_id': sId
                },
                success: function (response) {
                    var res = JSON.parse(response)
                    console.log(res);
                    if (res.code == "OK") {
                        var data = res.data
                        var dataObj = {
                            'payCounts' : data.pay_counts,
                            'uType' : uType,
                            'oId' : data.o_id,
                            'amount' : data.amount,
                            'sku' : data.sku,
                            'name' : data.sku,
                            'type' : "Year"
                        }
                        var month = "Month"
                        var period =  data.period
                        if(period.endsWith('M')){
                            dataObj.type = month
                        }
                        self.purchasePush(dataObj)
                    }
                },
                error: function (error) {
                    console.log(error)
                }
            });
        }
    },
    purchasePush: function (dataObj){
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'paycounts' : dataObj.payCounts,
            'Usertype': dataObj.uType,
            'event': 'purchase',
            'transactionId': dataObj.oId,
            'transactionTotal' : dataObj.amount,
            transactionProducts : [{
                'sku' : dataObj.sku,
                'name' : dataObj.name,
                'category' : dataObj.type
            }]
        })
    },
    getCookie: function (key) {
        try {
            var arrStr = document.cookie.split("; ");
            for (var i = 0; i < arrStr.length; i++) {
                var temp = arrStr[i].split("=");
                if (temp[0] == key) {
                    return unescape(temp[1]);
                }
            }
            return "";
        } catch (e) {
            return "";
        }
    },
    addCookie: function (key, value) {
        try {
            var str = key + "=" + escape(value);
            var date = new Date();
            var ms = 1000 * 3600 * 1000 * 24;
            date.setTime(date.getTime() + ms);
            str += "; expires=" + date.toGMTString();
            document.cookie = str;
        } catch (e) {
        }
    },
    readyUpload: function (){
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'upload_page'
        })
    },
    completeUpload: function (){
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'config_page'
        })
    },
    closeUpload: function (){
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'default_folder'
        })
    }

}
