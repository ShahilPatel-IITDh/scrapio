

var isMobile = function () {
    var flag = false ;
    if (
               (navigator.userAgent.toUpperCase().indexOf('IPHONE')     != -1)
            || (navigator.userAgent.toUpperCase().indexOf('IPOD')   != -1)
            //|| (navigator.userAgent.indexOf('iPad')   != -1)
            || (navigator.userAgent.toUpperCase().indexOf('BADA')   != -1)
            || (navigator.userAgent.toUpperCase().indexOf('BLACKBERRY')  != -1)
            || (navigator.userAgent.toUpperCase().indexOf('PALM')   != -1)
            || (navigator.userAgent.toUpperCase().indexOf('SYMBIAN')  != -1)
            || 
                (
                    (navigator.userAgent.toUpperCase().indexOf('ANDROID')  != -1)
                    &&
                    (navigator.userAgent.toUpperCase().indexOf('MOBILE')  != -1)
                )
    )
    flag = true ;
    return flag;
};


var getUrlParameter = function (sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
};


	var redirectEngine = function(){
		
		(function($){
			
		    if(getUrlParameter("noRedirect") == "true")
		    	{
		    	var date = new Date();
		    	date.setTime(date.getTime() + (30 * 60 * 1000));   
		    	setCookie("sfrMobileDeviceRedirection", true, { expires: date });
		    	return false;
		    	}
		    else {
		    	var url = "//static.s-sfr.fr/routage/device/get";
		    	var sourceURL = window.location.pathname;
		    	var hostURL = "";
		    	//if cms we need to set hostURL to prod ones to make the mongo search query effective
		    	if (window.location.hostname.indexOf("cms.", 0) != -1 || 
		    		window.location.hostname.indexOf(".cms",0) != -1) {
		    		url = "//cms.sfr.fr/routage/device/get";
		    		if (window.location.hostname.indexOf("adsl", 0) != -1) {
		    			hostURL = "adsl.sfr.fr";
		    		} else if (window.location.pathname.indexOf("mon-espace-client", 0) != -1) {
		    			hostURL = "espace-client.sfr.fr";
		    		} else if (window.location.hostname.indexOf("m.", 0) != -1){
    	    			hostURL = "m.sfr.fr";
		    		} else {
		    			hostURL = "www.sfr.fr";
		    		}
		    	} else {
		    		hostURL = window.location.hostname;
		    	}
		    	var params = "";
		    	if (window.location.search) {
		    		params += window.location.search;
		    	}
		    	if (window.location.hash) {
		    		if (params) {
		    			params += "&" + window.location.hash.substring(1, window.location.hash.length);
		    		} else {
		    			params += window.location.hash;
		    		}
		    	}
		    	
		    	$.ajax({
				"url" : url,
                "data": {"sourceURL": sourceURL, "hostURL": hostURL},
				"jsonpCallback" : "handleResponse",
				"success" : function(data){
				if (data.mobileUrl != null){
			    //check if cookie present
				var redirectMe = true;
			    var cookieNoRedirect = getCookie("sfrMobileDeviceRedirection");
			    if(cookieNoRedirect == "false"){
			    		redirectMe = true;    
			        }
			        else if (cookieNoRedirect == "true") {
			        	redirectMe = false;
			        }
			    var conf = false;
			    if ((data.showAlert && data.alertText != null && redirectMe) || (!data.showAlert && !redirectMe)) {                 
			        var text = ((data.alertText != null && data.alertText != "") ? data.alertText : "Voulez vous accéder à la version mobile?");
			    	conf = confirm(text);
			        var date = new Date();
			        date.setTime(date.getTime() + (30 * 60 * 1000));                        
			        
			        if (!conf) {
			        	setCookie("sfrMobileDeviceRedirection", true, { expires: date });
			        } else {
			        	setCookie("sfrMobileDeviceRedirection", true, { expires: new Date() });
			        	window.location = data.mobileUrl;
			        }
			    } else if (redirectMe) {
			    	if (data.mobileUrl.indexOf("#", 0) == -1 && 
			    	    data.mobileUrl.indexOf("?", 0) == -1 && params) {
                        window.location = data.mobileUrl + params;
			    	} else if (params) {
                        window.location = data.mobileUrl + "&" + params.substring(1, params.length);
			    	} else {
                        window.location = data.mobileUrl;
			    	}
			    } else return false;
				}
				},
				"dataType": "jsonp",
                "cache" : true
			});
		}
		})($sfr);
	};
	
	if(isMobile()){
		redirectEngine() ;
	}
	
