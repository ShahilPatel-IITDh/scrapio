// JavaScript Document
var uagent = navigator.userAgent.toLowerCase();
var mobileAgents = [
      "ipod",
	  "ipad",
      "iphone",
      "android",
      "opera mobi",
      "opera mini",
      "fennec", 
      "blackberry"
];

function isMobile() {
	 var ret = false;
	 
   if (uagent.search('android') > -1 && uagent.search('mobile') > -1) {
      ret = true;
   }
   else if (uagent.search('windows phone os') > -1 && uagent.search('iemobile') > -1) {
      ret = true;
   }
   else {
     for (var i = 0; i < mobileAgents.length; ++i) {
       if (uagent.search(mobileAgents[i]) > -1) {
         ret = true;
         break;
       }
     }
   }
	 return ret;
}

function alertMobile() {
	if (isMobile()) {
		document.getElementById('mobile_alert').style.display = 'block';
	}
}
