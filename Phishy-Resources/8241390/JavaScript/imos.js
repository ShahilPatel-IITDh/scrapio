IMOS = {};
IMOS.ready = false;
IMOS.visitorId = "";
IMOS.server = "https://imos005-dot-im--os.appspot.com";//"https://im--os.appspot.com";
IMOS.siteId = "";


IMOS.init = function(){
	try{
		var splittedDomain = IMOS.splitHostname(window.location.hostname);
		IMOS.visitorId = IMOS.getOrCreateVisitor(splittedDomain.domain + "." + splittedDomain.type);

		if (window.location.host.indexOf("localhost") != -1){
			IMOS.server = "http://localhost:11000"
		}
		window.onload = function() {
			IMOS.siteId = document.body.getAttribute("data-osid");
			IMOS.ready = true;
		};
		if (typeof EditorHelper != "undefined"){
			IMOS.ready = true;
			//IMOS.siteId = "osid--imcreator";
		}
	} catch (e) {
		console.log("something went wrong")
	}
};


IMOS.pageView = function(pageName){
	if (pageName === undefined) {
		pageName = window.location.pathname;
	}
	if (!IMOS.ready){
		setTimeout(function(){
			IMOS.pageView(pageName)
		},100);
	}else{
		var params = {};
		params["category"] = "page";
		params["pathname"] = pageName;
		IMOS.pingServer(params);
	}
};

IMOS.trackEvent = function(eventName){
	if (eventName === undefined) {
		eventName = null;
	}
	if (eventName == null) return; 
	if (!IMOS.ready){
		setTimeout(function(){
			IMOS.trackEvent(eventName)
		},100);
	}else{
		var params = {};
		params["category"] = "event";
		params["pathname"] = eventName;
		IMOS.pingServer(params);
	}
};

IMOS.trackGoal = function(eventName, params){
	if (eventName === undefined) {
		eventName = null;
	}
	if (params === undefined) {
		params = {};
	}
	if (eventName == null) return; 
	if (!IMOS.ready){
		setTimeout(function(){
			IMOS.trackGoal(eventName,params)
		},100);
	}else{
		params["category"] = "goal";
		params["pathname"] = eventName;
		setTimeout(function(){
			IMOS.pingServer(params);	
		},1000);
	}
};


IMOS.handleNewsLetterIntegration = function(submitParams){
	try{
		if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
		else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		submitParams["site_id"] = IMOS.siteId;
		submitParams["osid"] = IMOS.visitorId;
		var splittedDomain = IMOS.splitHostname(window.location.hostname);
		submitParams["domain"] = splittedDomain.domain + "." + splittedDomain.type;
		submitParams["subdomain"] = splittedDomain.subdomain;
		submitParams["referrer"] = IMOS.getVisitorReferer(submitParams["domain"]);
		submitParams["url"] = window.location.href;
		xmlhttp.open("POST",IMOS.server + "/api/newsletter" + IMOS.serializeParams(submitParams),true);
	    xmlhttp.send();
	}catch (err){
    }
};


IMOS.pingServer = function(params){
	try{
		if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
		else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		if (!("site_id" in params)){
			params["site_id"] = IMOS.siteId;
		}
		params["osid"] = IMOS.visitorId;
		var splittedDomain = IMOS.splitHostname(window.location.hostname);
		params["domain"] = splittedDomain.domain + "." + splittedDomain.type;
		params["subdomain"] = splittedDomain.subdomain;
		params["referrer"] = IMOS.getVisitorReferer(params["domain"]);
		params["url"] = window.location.href;
		params["exp"] = IMOS.getParameterByName("exp");
		xmlhttp.open("GET",IMOS.server + "/ping" + IMOS.serializeParams(params),true);
	    xmlhttp.send();
	}catch (err){}
};

IMOS.getParameterByName = function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


IMOS.getVisitorReferer = function(domain_name){
    var myReferer = IMOS.getCookie("imxprs_referer");
    if (typeof myReferer == "undefined" || myReferer == ""){
    	myReferer = IMOS.getCookie("imos_referer");
    	if (typeof myReferer == "undefined" || myReferer == ""){
    		myReferer = document.referrer;
    		IMOS.setCookie("imos_referer",myReferer,365, domain_name);
    	}
    }
    return myReferer;
};

IMOS.getOrCreateVisitor = function(domain_name){
	var visitorId = IMOS.getCookie("os_visitor")
	if (typeof visitorId == "undefined" || visitorId == ""){
		visitorId = IMOS.shortUuid();
		IMOS.setCookie("os_visitor",visitorId,365,domain_name);
	}
	return visitorId;
};


IMOS.setCookie = function(cname, cvalue, exdays, domain_name) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
	if (typeof domain_name == "undefined"){
    	document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
	} else {
		document.cookie = cname + "=" + cvalue + "; " + expires + ";Domain=."+domain_name+";path=/";
	}
};


IMOS.getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
};


IMOS.serializeParams = function(params){
	 return '?' + 
     Object.keys(params).map(function(key) {
         return encodeURIComponent(key) + '=' +
             encodeURIComponent(params[key]);
     }).join('&');
};


IMOS.splitHostname = function(url) {
    var result = {};
    var regexParse = new RegExp('([a-z\-0-9]{2,63})\.([a-z\.]{2,7})$');
    var urlParts = regexParse.exec(url);
    result.domain = urlParts[1];
    result.type = urlParts[2];
    result.subdomain = url.replace(result.domain + '.' + result.type, '').slice(0, -1);;
    return result;
};


IMOS.shortUuid = function() {
	return 'xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
};

IMOS.init();