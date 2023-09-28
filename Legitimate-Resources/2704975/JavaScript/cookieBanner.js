    function isLogin() {
    	return document.getElementById('account-info') !== null;
    }
    
    function getDomain() {
    	var arr = window.location.hostname.match(/([a-z0-9-]*?)\.[a-z]{2,}$/);
    	if (arr !== null && arr.length > 0) {
    		return "." + arr[0];
    	}
    	return ".sugarsync.com";
    }
    
	function getCookie(name) {
		var re = new RegExp(name + "=([^;]+)");
		var value = re.exec(document.cookie);
		return (value != null && value.length == 2) ? unescape(value[1]) : null;
	}
	
	//displays the cookie banner
	function showCookieBanner(){
		//if jQuery is available, use it
		if(typeof($j) !== 'undefined' && typeof($j('#agreementBar').slideToggle) === "function"){
			$j('#agreementBar').slideToggle();
		} else if(typeof($) !== 'undefined' && typeof($('#agreementBar').slideToggle) === "function"){
			$('#agreementBar').slideToggle();
		} else {
			document.getElementById("agreementBar").style.display = 'block';
		}
	}

	//verify if exists the cookie for cookie acceptance
	function checkForCookie() {
		var cookieAgree = getCookie('cookieAgree');
		var expValue = isLogin() ? 2 : 1;
		if(cookieAgree == null || cookieAgree < expValue){
			var cookieBanner = document.getElementById("agreementBar");
			if(typeof(cookieBanner) !== 'undefined'){
				showCookieBanner();
			} else if(confirm(msg_cookie_agreement_confirm)){
				//in case the cookie banner could not be loaded, show a JS confirm and create the cookies on OK
				createCookieAgree();
			}
		}
	}

	//hides the cookie banner
	function hideCookieBanner(){
		document.getElementById("agreementBar").style.display = 'none';
	}

	//create the cookie to remember cookie acceptance
	function createCookieAgree(){
		var expValue = isLogin() ? 2 : 1;
		var expiry = new Date();
		expiry.setTime(expiry.getTime()+(3600 * 1000 * 24 * 365 * 10)); //10 years
		document.cookie = "cookieAgree=" + expValue + ";domain=" + getDomain() + ";expires=" + expiry.toGMTString() + ";path=/";
	}

	//handles the Accept button
	function acceptCookies(){
		createCookieAgree();
		hideCookieBanner();
	}

if (typeof($j) !== 'undefined' && typeof($j.ready) === "function") {
	$j(document).ready(function () {
		checkForCookie()
	});
} else if (typeof($) !== 'undefined' && typeof($.ready) === "function") {
	$(document).ready(function () {
		checkForCookie()
	});
} else {
	//cookie acceptance
	window.setTimeout(function(){
		checkForCookie();
	},1000);
}

resizeFooterIframe = function () {
    var iframe = document.getElementById('footer_include');
    if (iframe && (iframe.contentDocument || iframe.contentWindow)){
        var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframe.style.height = innerDoc.body.clientHeight + 'px';
    }
}

window.onresize = function (event) {
    resizeFooterIframe();
};