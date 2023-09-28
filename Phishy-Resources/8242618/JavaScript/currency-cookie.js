var cookie_name = "Currency";
var currency;

function putCookie() {
	if(document.cookie != document.cookie){
		index = document.cookie.indexOf(cookie_name);
	} else { 
		index = -1;
	}

	if (index == -1){
		currency=document.pick.country.value;
		var isDubdomain = new Array();
		isDubdomain = location.hostname.split('.');
	
		if (! /^(USD|GBP|CAD|AUD|EUR)$/.test(currency)) {
			currency = 'USD';
		} 

		if (isDubdomain.length == 2) {
			document.cookie=cookie_name+"="+currency+"; expires=Monday, 04-Apr-2022 05:00:00 GMT;  path=/; domain=."+location.hostname.split('.').splice(0,3).join('.');
		} else {
			document.cookie=cookie_name+"="+currency+"; expires=Monday, 04-Apr-2022 05:00:00 GMT;  path=/; domain=."+location.hostname.split('.').splice(1,4).join('.');
		}
		window.onbeforeunload=null;
		window.location.reload();
	}
}

function get_cookie ( cookie_name ) {
	var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
	if ( results ){
		return ( unescape ( results[2] ) );
	} else{
		return null;
	}
}
