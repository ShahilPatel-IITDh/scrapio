var qvaVersion = "1.0.0";
var qvaServer = "1";
var qvaData = qvaData || {};
var qvaEventData = qvaEventData || {};
if (typeof qva == "undefined") {
    qva = {}
}
(function () {
    var W = window,
        D = document,
        N = navigator,
        WL = window.location,
        hr = WL.href,
        se = WL.search,
        hn = WL.hostname,
        pn = WL.pathname,
        ref = D.referrer,
        an = N.appName,
        av = N.appVersion,
        ua = N.userAgent,
        PT = WL.protocol == "https:" ? "https:" : "http:",
        eu = encodeURIComponent,
        du = decodeURIComponent,
        Q = {};

    //make parameter
    pa = function(){
        os();
        la();
        ws();
        ss();
    },

    os = function(){
        Q.os = N.platform ? N.platform : ""
    },
    la = function() {
        var _la = "";
        _la = N.userLanguage ? N.userLanguage : N.language ? N.language : "";
        Q.la = _la;
        //Q.tmp="한글abc123";
    },
    ws = function() {
            var _ws = "";
            if (window.screen && screen.width && screen.height) {
                _ws = screen.width + "x" + screen.height
            }
            Q.ws = _ws
    },
    ss = function(){
        var rn_t = 1000 * 60 * 60 * 24 * 365;
        var ss_t = 1000 * 60 * 30;
        var cur_gmt = (new Date()).toGMTString();

        var a_rn = gc('qva_rn');
        var a_ss = gc('qva_ss');

        //재/신규 방문
        if(a_rn) {
            sc('qva_rn', cur_gmt, rn_t);
            Q.rn=cur_gmt; //신규 방문자:1
        }else{
            sc('qva_rn', cur_gmt, rn_t);
            Q.rn=a_rn; //기존 방문자:0
        }
        //30분 방문자 세션
        if(a_ss<1) {
            sc('qva_ss', '1', ss_t);
            Q.visitor=1; //30분 신규 방문자:1
        }else{
            Q.visitor=0; //30분 기존 방문자:0
        }
    },
    //make query
    mq = function(){
        var qs="?account="+W.qvaData.account;
        var _qs="";
        for (var k in Q) {
            var v = Q[k];
            if(typeof v != "undefined") {
                var euv=eu(v);
                //console.log(k + ":" + v + "|"+euv);
                //query string이 파라메터로 넘어온경우는 처리 하지 않았음. 나중에 꼭 해야함, key:value -> value가 ?a=1&b=2&c=3
                _qs = _qs + "&"+k+"="+euv;
            }
        }
        return qs + _qs;
    },

    ci = function (a) {
        var b = D.createElement("img");
        b.width = 1;
        b.height = 1;
        b.src = a;
        return b
    },

    l = function(){
        //console.log(W.qvaData);
        if(typeof W.qvaData.account != "undefinded"){
            qa();
        }
    },

    qa = function (a, b) {
        //url + parameter
        pa();
        //console.log("href:"+hr+"\nsearch:"+se+"\nhostname:"+hn+"/pathname:"+pn+"/ref:"+ref+"\nappName:"+an+"\nappVersion:"+av+"\nuserAgent:"+ua);
        //console.log(Q);
        var qs = mq();
        var c = ci(PT+"//log"+qvaServer+".quv.kr/log/qa.php"+qs);
        c.onload = c.onerror = function () {
            c.onload = null;
            c.onerror = null;
            return;
        }
    },
    //set cookie
    sc = function(a, b, c, d, e) {
        D.cookie = a + "=" + b + "; expires=" + (new Date((new Date).getTime() + c)).toGMTString() + "; path=" + (!e ? "/" : e) + (!d ? "" : "; domain=" + d)

    },
    //get cookie
    gc = function(a) {
        var aH = D.cookie.split(";");
        for (b="", c = aH, n = new RegExp("^\\s*" + a + "=\\s*(.*?)\\s*$"),
            d = 0; d < c.length; d++) {
            if(e = c[d].match(n)){ b=(e[1]); break; }
        }
        return b;
    },


    //방문자 구분
    //30분 쿠키 발행
    //30분 쿠키=방문자 있으면, 방문자, 없으면 신규 방문자
    //쿠키 발행시, 2차도메인 <-> 1차도메인 간 공유 지원

    //나중에 방문자를 세션으로 변경할 건지 고민
    //구글, 30분 세션의 정의
    //  https://support.google.com/analytics/answer/2731565?hl=ko
    //  http://www.goldenplanet.co.kr/blog/2017/04/11/%EA%B5%AC%EA%B8%80-%EC%95%A0%EB%84%90%EB%A6%AC%ED%8B%B1%EC%8A%A4-%EC%84%B8%EC%85%98-session%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80%EC%9A%94//
    //  http://analyticsmarketing.co.kr/digital-analytics/google-analytics/337/


    qva.DataSet = function(k,v) {
        if(k) {
            var obj = {}
            obj[k] = v;
            qvaData[k] = v
        }
    };
    qva.EventDataSet = function(k,v) {
        //console.log("qva.EventDataSet()");
        if(k) {
            qvaEventData[k] = v
        }
    };
    qva.start = function() {
        //console.log("qva.start()");
        l();
    };

})(window);