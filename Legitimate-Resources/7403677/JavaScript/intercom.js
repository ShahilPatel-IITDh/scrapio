intercomFun = {
    pushInterCom: function (){
        var self = this
        var userHash = ''
        var uId = ''
        if(typeof fh5 != 'undefined' && fh5){
            userHash = fh5.userHash
            uId = fh5.uId
        }
        if(!$.trim(userHash) || !$.trim(uId)){
            return;
        }
        if(!self.verifyHash()){
            return;
        }
        var intercomPar = {
            'uId' : uId,
            'key' : userHash
        }
        self.addIntercom(intercomPar)
    },
    addIntercom: function (intercomPar){
        window.intercomSettings = {
            app_id: "mtp3fwip",
            user_id: intercomPar.uId, // User ID
            user_hash: intercomPar.key // HMAC using SHA-256
        };
    },
    addUserHash: function (key){
        if(typeof fh5 != 'undefined' && fh5){
            fh5['userHash'] = key
        }
    },
    verifyHash: function (){
        var slef = this
        slef.initInterComCookie()
        return slef.getValue('isHash')
    },
    initInterComCookie: function (){
        var slef = this
        window.interCom = [];
        var interCom = dataLayerFun.getCookie("interCom");
        if(typeof interCom != 'undefined' && interCom){
            window.interCom.push(JSON.parse(interCom))
        }else {
            slef.addInterComCookie()
        }
    },
    setInterComCookie: function (key,value){
        var slef = this
        window.interCom = window.interCom || [];
        var interCom = dataLayerFun.getCookie("interCom");
        if(typeof interCom != 'undefined' && interCom){
            var interComObj = JSON.parse(interCom);
            interComObj[key] = value
            window.interCom = []
            slef.addInterComCookie(interComObj)
        }else {
            var obj = {
                'isHash': true,
                'cancelTime': '',
                'buyTime': '',
                'scrollTime': ''
            }
            obj[key] = value
            window.interCom = []
            slef.addInterComCookie(obj)
        }
    },
    addInterComCookie: function (obj){
        if(typeof obj == 'undefined' || obj === '{}'){
             obj = {
                'isHash': true,
                'cancelTime': '',
                'buyTime': '',
                'scrollTime': ''
            }
        }
        dataLayerFun.addCookie('interCom', JSON.stringify(obj))
        window.interCom.push(obj)
        return obj
    },
    getValue: function (key){
        var slef = this
        var obj = window.interCom
        if(typeof obj != 'undefined' && obj.length < 1){
            return obj[0][key]
        }
        var interCom = dataLayerFun.getCookie("interCom");
        if(typeof interCom != 'undefined' && interCom){
            var interComObj = JSON.parse(interCom);
            return interComObj[key]
        }
        window.interCom = []
        var initObje = slef.addInterComCookie()
        return initObje[key]
    },
    verifyTime: function (key){
        var slef = this
        slef.initInterComCookie()
        var time = slef.getValue(key)
        if(!$.trim(time)){
            return true
        }
        var day = slef.getDaysBetween(time,slef.getNowFormatDate())
        if(day > 0){
            return true
        }
        return false
    },
    /**
     * 计算两个日期之间的天数
     * @param dateString1  开始日期 yyyy-MM-dd
     * @param dateString2  结束日期 yyyy-MM-dd
     * @returns {number} 如果日期相同 返回0 开始日期大于结束日期，返回0
     */
    getDaysBetween: function (dateString1,dateString2){
        var  startDate = Date.parse(dateString1);
        var  endDate = Date.parse(dateString2);
        if (startDate>endDate){
            return 0;
        }
        if (startDate==endDate){
            return 0;
        }
        var days=(endDate - startDate)/(1*24*60*60*1000);
        return  days;
    },
    /**
     * 获取当前时间 yyyy-MM-dd
     * @returns {string}
     */
    getNowFormatDate: function (){
        var date = new Date();
        var seperator1 = "-";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        return currentdate;
    },

    test: function (){
        window.addEventListener('onload',function(){
            if(userHash != 'undefined' && userHash != ''){
                dataLayer.push({
                    'event': 'isEmptyUserHash',
                    'isEmptyUserHashData' :  1
                })
            }else {
                dataLayer.push({
                    'event': 'isEmptyUserHash',
                    'isEmptyUserHashData' :  0
                })
            }
        } )
    }
}