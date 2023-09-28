
var d = new Date();
var expire = new Date();
expire.setTime(d.getTime() + 3600000*24*1);
var tzo = d.getTimezoneOffset();

document.cookie = "tzinfo="+escape(tzo)
+ ";expires="+expire.toGMTString()+ ";domain=.canada-choice.com;path=/";	
		 
document.cookie = "osValue="+escape('')
                 + ";expires="+expire.toGMTString() +";domain=.canada-choice.com;path=/";
document.cookie = "proxyValue="+escape('YESS')
                 + ";expires="+expire.toGMTString()+";domain=.canada-choice.com;path=/";
document.cookie = "proxyIpValue="+escape('162.158.170.237')
                 + ";expires="+expire.toGMTString()+";domain=.canada-choice.com;path=/";

