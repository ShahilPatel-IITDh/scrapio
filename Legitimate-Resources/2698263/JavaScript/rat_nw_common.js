function _mocoxudid(){this.visitedCookie=null,this.q=[]}_mocoxudid.prototype.$uuid2=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var o=16*Math.random()|0;return("x"==t?o:3&o|8).toString(16)})},_mocoxudid.prototype.id=function(){return this.$uuid()},_mocoxudid.prototype.$uuid=function(){var t="mxuid",o=this.readCookie(t);if(!o){var i=this.$uuid2();this.writeCookie(t,i,365),o=i}return o},_mocoxudid.prototype.readCookie=function(t){for(var o=t+"=",i=document.cookie.split(";"),e=0;e<i.length;e++){for(var n=i[e];" "==n.charAt(0);)n=n.substring(1,n.length);if(0==n.indexOf(o))return n.substring(o.length,n.length)}return null},_mocoxudid.prototype.writeCookie=function(t,o,i){var e="";if(i){var n=new Date;n.setTime(n.getTime()+24*i*60*60*1e3),e="; expires="+n.toUTCString()}var x=window.location.hostname,r=x.split(".");if(r.length>2){var u=t+"="+(o||"")+e+"; domain=."+(x=r[r.length-2]+"."+r[r.length-1])+"; path=/";document.cookie=u}document.cookie=t+"="+(o||"")+e+"; path=/"};

var __nw_mnewid = new _mocoxudid();
// awudid end


// 브라우저 고유키(awudid) 생성 관련
var _rat_dynamic_flag = 0;
var _rat_awudid_flag = 0;

try {
    var now = new Date();
    var script = document.createElement('script');
    var url = "//mscript.myshp.us/script/rat_nw_dynamic.js?version=26&req="+ now.getFullYear() + now.getMonth() + now.getDate();
    var s = document.getElementsByTagName("script")[0];
    script.async = true;
    script.src = url;
    script.onreadystatechange = function () {
        if (this.readyState == 'complete' || this.readyState == 'loaded') {
            try
            {
                if(_rat_dynamic_flag++==0) _getRatAwudid();
            }
            catch(e){}
        }
    };
    script.onload = function () {
        try{
            if(_rat_dynamic_flag++==0) _getRatAwudid();
        }catch(e){}
    };
    s.parentNode.insertBefore(script, s); //or something of the likes       
}
catch(e){}

function _getRatAwudid(){
    if(_rat_awudid_flag++==0){
	    _nw_trk_initialize();
    }
}