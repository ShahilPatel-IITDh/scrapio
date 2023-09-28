/**
 * ==========================================
 * config.js
 * Copyright (c) 2010 wwww.114la.com
 * Author: cai@115.com
 * ==========================================
 */

var Config = {
    Mail: [{
        val: 0
    },  { //sina.com
        action: "http://mail.sina.com.cn/cgi-bin/login.cgi",
        params: {
            u: "#{u}",
            psw: "#{p}"
        }
    }, { //vip.sina.com
        action: "http://vip.sina.com.cn/cgi-bin/login.cgi",
        params: {
            user: "#{u}",
            pass: "#{p}"
        }
    }, { //yahoo.com.cn
        action: "https://edit.bjs.yahoo.com/config/login",
        params: {
            login: "#{u}@yahoo.com.cn",
            passwd: "#{p}",
            domainss: "yahoo",
            ".intl": "cn",
            ".src": "ym"
        }
    }, { //yahoo.cn
        action: "https://edit.bjs.yahoo.com/config/login",
        params: {
            login: "#{u}@yahoo.cn",
            passwd: "#{p}",
            domainss: "yahoocn",
            ".intl": "cn",
            ".done": "http://mail.cn.yahoo.com/inset.html"
        }
    }, { //百度帐号
        action: "http://passport.baidu.com/?login",
        params: {
            u: "http://passport.baidu.com/center",
            username: "#{u}",
            password: "#{p}"
        }
    }, { //renren
        action: "http://passport.renren.com/PLogin.do",
        params: {
            email: "#{u}",
            password: "#{p}",
            origURL: "http://www.renren.com/Home.do",
            domain: "renren.com"
        }
    }, {
        val: 0
    }, {
        action: "http://www.kaixin001.com/",
        type: "link"
    }, {
        action: "http://qzone.qq.com/",
        type: "link"
    }, {
        action: "http://mail.qq.com/cgi-bin/loginpage",
        type: "link"
    }, {
    
        action: "http://mail.139.com/",
        type: "link"
    }, {
        action: "http://gmail.google.com/",
        type: "link"
    },{
    
        action: "http://www.188.com/",
        type: "link"
    }],
	banner:{
		b4:{
			img:"static/images/banner/taoke12060.jpg",
			url:"http://pindao.huoban.taobao.com/channel/channelMall.htm?pid=mm_11140156_0_0"
		}
	},
	Track:[
		[]
	],
	Keywords:[]  

}

function getProId(proName){
    var ProId;
    CityArr.forEach(function(element, index, array){
        if (element[0] == proName) {
            ProId = element[2]
        }
    })
    return ProId
}

function getCityId(ProId, CityName){
    var CityId;
    CityArr.forEach(function(element, index, array){
        if (element[0] == CityName && element[1] == ProId) {
            CityId = element[2]
        }
    })
    return CityId
}