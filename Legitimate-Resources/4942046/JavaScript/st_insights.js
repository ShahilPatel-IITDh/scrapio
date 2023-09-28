var stlib = stlib || {
  functions: [],
  functionCount: 0,
  util: {
    prop: function(p, obj) {
      if (obj) {
        return obj[p];
      }
      return function(o) { return o[p]; };
    }
  },
  dynamicOn: true,
  setPublisher : function(pubKey){
    stlib.publisher = pubKey;
  },
  setProduct : function(prod){
    stlib.product = prod;
  },
  parseQuery: function( query ) {
    var Params = new Object ();
    if ( ! query ) return Params; // return empty object
    var Pairs = query.split(/[;&]/);
    for ( var i = 0; i < Pairs.length; i++ ) {
       var KeyVal = Pairs[i].split('=');
       if ( ! KeyVal || KeyVal.length != 2 ) continue;
       var key = unescape( KeyVal[0] );
       var val = unescape( KeyVal[1] );
       val = val.replace(/\+/g, ' ');
       Params[key] = val;
    }
    return Params;
  },
  getQueryParams : function(){
    var buttonScript = document.getElementById('st_insights_js');
    if(buttonScript && buttonScript.src){
      var queryString = buttonScript.src.replace(/^[^\?]+\??/,'');
      var params = stlib.parseQuery( queryString );
      stlib.setPublisher ( params.publisher);
      stlib.setProduct( params.product);
    }
  }
};

stlib.global = {
  hash: stlib.util.prop('hash', document.location).substr(1)
};

// Extract out parameters
stlib.getQueryParams();
/********************START BROWSER CODE***********************/
stlib.browser = {
	iemode: null,
	firefox: null,
	firefoxVersion: null,
	safari: null,
	chrome: null,
	opera: null,
	windows: null,
	mac: null,
	ieFallback: (/MSIE [6789]/).test(navigator.userAgent),
	//ieFallback: true,
	
	init: function() {
		var ua = navigator.userAgent.toString().toLowerCase();
		
		if (/msie|trident/i.test(ua)) {
	      if (document.documentMode) // IE8 or later
	    	  stlib.browser.iemode = document.documentMode;
		  else{ // IE 5-7
			  stlib.browser.iemode = 5; // Assume quirks mode unless proven otherwise
			  if (document.compatMode){
				  if (document.compatMode == "CSS1Compat")
					  stlib.browser.iemode = 7; // standards mode
		      }
		   }
	      //stlib.browser.iemode = getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i); //IE11+ 
		}
		/*stlib.browser.firefox 	=(navigator.userAgent.indexOf("Firefox") !=-1) ? true : false;
		stlib.browser.firefoxVersion 	=(navigator.userAgent.indexOf("Firefox/5.0") !=-1 || navigator.userAgent.indexOf("Firefox/9.0") !=-1) ? false : true;
		stlib.browser.safari 	=(navigator.userAgent.indexOf("Safari") !=-1 && navigator.userAgent.indexOf("Chrome") ==-1) ? true : false;
		stlib.browser.chrome 	=(navigator.userAgent.indexOf("Safari") !=-1 && navigator.userAgent.indexOf("Chrome") !=-1) ? true : false;
		stlib.browser.windows 	=(navigator.userAgent.indexOf("Windows") !=-1) ? true : false;
		stlib.browser.mac 		=(navigator.userAgent.indexOf("Macintosh") !=-1) ? true : false;*/
		
		stlib.browser.firefox 	= ((ua.indexOf("firefox") !=-1) && (typeof InstallTrigger !== 'undefined'))?true:false;
	    stlib.browser.firefoxVersion 	=(ua.indexOf("firefox/5.0") !=-1 || ua.indexOf("firefox/9.0") !=-1) ? false : true;
	    stlib.browser.safari 	= (ua.indexOf("safari") !=-1 && ua.indexOf("chrome") ==-1)?true:false;
	    stlib.browser.chrome 	= (ua.indexOf("safari") !=-1 && ua.indexOf("chrome") !=-1)?true:false;
    	stlib.browser.opera 	= (window.opera || ua.indexOf(' opr/') >= 0)?true:false;
		stlib.browser.windows 	=(ua.indexOf("windows") !=-1) ? true : false;
		stlib.browser.mac 		=(ua.indexOf("macintosh") !=-1) ? true : false;
	},

	getIEVersion : function() {
		return stlib.browser.iemode;
	},
	isFirefox : function() {
		return stlib.browser.firefox;
	},
	firefox8Version : function() {
		return stlib.browser.firefoxVersion;
	},
	isSafari : function() {
		return stlib.browser.safari;
	},
	isWindows : function() {
		return stlib.browser.windows;
	},
	isChrome : function() {
		return stlib.browser.chrome;
	},
	isOpera : function() {
		return stlib.browser.opera;
	},
	isMac : function() {
		return stlib.browser.mac;
	},
       isSafariBrowser: function(vendor, ua) {
              // check if browser is safari
              var isSafari = vendor &&
                              vendor.indexOf('Apple Computer, Inc.') > -1 &&
                              ua && !ua.match('CriOS');
              // check if browser is not chrome
              var notChrome = /^((?!chrome|android).)*safari/i.test(ua);
              // check if browser is not firefox
              var notFireFox = /^((?!firefox|linux))/i.test(ua);
              // check if OS is from Apple
              var isApple = (ua.indexOf('Mac OS X') > -1) ||
                             (/iPad|iPhone|iPod/.test(ua) && !window.MSStream);
              // check if OS is windows
              var isWindows = (ua.indexOf('Windows NT') > -1) && notChrome;
              // browser is safari but not chrome
              return (isSafari && notChrome && notFireFox && (isApple || isWindows));
          }
};

stlib.browser.init();
/********************END BROWSER CODE***********************/
/********************START SCRIPTLOADER***********************/
/* 
 * This handles on demand loading of javascript and CSS files
 */
stlib.scriptLoader = {
	loadJavascript : function(href,callBack){
		var loader = stlib.scriptLoader;
		loader.head=document.getElementsByTagName('head')[0];
		loader.scriptSrc=href;
		loader.script=document.createElement('script');
		loader.script.setAttribute('type', 'text/javascript');
		loader.script.setAttribute('src', loader.scriptSrc);
		loader.script.async = true;
		
		if(window.attachEvent && document.all) { //IE:
			loader.script.onreadystatechange=function(){
				if(this.readyState=='complete' || this.readyState=='loaded'){
					callBack();
				}
			};
		} else { //other browsers:
			loader.script.onload=callBack;
		}
		loader.s = document.getElementsByTagName('script')[0]; 
		loader.s.parentNode.insertBefore(loader.script, loader.s);
	},
	loadCSS : function(href,callBack) {
		_$d_();
		_$d1("Loading CSS: "  + href);
		var loader = stlib.scriptLoader;
		var cssInterval;
		loader.head=document.getElementsByTagName('head')[0];
		loader.cssSrc=href;
		loader.css=document.createElement('link');
		loader.css.setAttribute('rel', 'stylesheet');
		loader.css.setAttribute('type', 'text/css');
		loader.css.setAttribute('href', href);
		loader.css.setAttribute('id', href);
		setTimeout(function(){
			callBack();
			if(!document.getElementById(href)){
				cssInterval=setInterval(function(){
					if(document.getElementById(href)){
						clearInterval(cssInterval);
						callBack();
					}
				}, 100);
			}
		},100);
		loader.head.appendChild(loader.css);		
	}
};
/********************END SCRIPTLOADER***********************/
/********************START MOBILE BROWSER CODE***********************/

stlib.browser.mobile = {
	mobile:false,
	uagent: null,
	android: null,
	iOs: null,
	silk: null,
	windows: null,
	kindle: null,
	url: null,
	sharCreated: false,
	sharUrl: null,
	isExcerptImplementation: false, //Flag to check if multiple sharethis buttons (Excerpt) have been implemented
	iOsVer: 0, // It will hold iOS version if device is iOS else 0
	
	init: function () {
		this.uagent = navigator.userAgent.toLowerCase();
		if (this.isAndroid()) {
			this.mobile = true;
		}else if (this.isIOs()) {
			this.mobile = true;
		} else if (this.isSilk()) {
			this.mobile = true;
		} else if (this.isWindowsPhone()) {
			this.mobile = true;
		}else if (this.isKindle()) {
			this.mobile = true;
		}
		
		
	},
	
	isMobile: function isMobile() {
		return this.mobile;
	},
	
	isAndroid: function() {
		if (this.android === null) {
			this.android = this.uagent.indexOf("android") > -1;
		}
		return this.android;
	},

	isKindle: function() {
		if (this.kindle === null) {
			this.kindle = this.uagent.indexOf("kindle") > -1;
		}
		return this.kindle;
	},
	
	isIOs: function isIOs() {
		if (this.iOs === null) {
			this.iOs = (this.uagent.indexOf("ipad") > -1) ||
				   (this.uagent.indexOf("ipod") > -1) ||
				   (this.uagent.indexOf("iphone") > -1);
		}
		return this.iOs;
		
	},

	isSilk: function() {
		if (this.silk === null) {
			this.silk = this.uagent.indexOf("silk") > -1;
		}
		return this.silk;
	},

	/**
	 * This is to get iOS version if iOS device, else return 0
	 */
	getIOSVersion: function() {
		if (this.isIOs()) {
			this.iOsVer = this.uagent.substr( (this.uagent.indexOf( 'os ' )) + 3, 5 ).replace( /\_/g, '.' );
		}
		return this.iOsVer;
	},
	
	isWindowsPhone: function() {
		if (this.windows === null) {
			this.windows = this.uagent.indexOf("windows phone") > -1;
		}
		return this.windows;
	}
	
};

stlib.browser.mobile.init();

/********************END MOBILE BROWSER CODE***********************/

/********************START COOKIE LIBRARY***********************/
/*
 * This handles cookies
 */
var tpcCookiesEnableCheckingDone = false;
var tpcCookiesEnabledStatus = true;

stlib.cookie = {
	setCookie : function(name, value, days) {
		var safari =(navigator.userAgent.indexOf("Safari") !=-1 && navigator.userAgent.indexOf("Chrome") ==-1);
		var ie =(navigator.userAgent.indexOf("MSIE") !=-1);

		if (safari || ie) {
			  var expiration = (days) ? days*24*60*60 : 0;

			  var _div = document.createElement('div');
			  _div.setAttribute("id", name);
			  _div.setAttribute("type", "hidden");
			  document.body.appendChild(_div);

			  var
			  div = document.getElementById(name),
			  form = document.createElement('form');

			  try {
				  var iframe = document.createElement('<iframe name="'+name+'" ></iframe>');
					//try is ie
				} catch(err) {
					//catch is ff and safari
					iframe = document.createElement('iframe');
				}

			  iframe.name = name;
			  iframe.src = 'javascript:false';
			  iframe.style.display="none";
			  div.appendChild(iframe);

			  form.action = "https://sharethis.com/account/setCookie.php";
			  form.method = 'POST';

			  var hiddenField = document.createElement("input");
			  hiddenField.setAttribute("type", "hidden");
			  hiddenField.setAttribute("name", "name");
			  hiddenField.setAttribute("value", name);
			  form.appendChild(hiddenField);

			  var hiddenField2 = document.createElement("input");
			  hiddenField2.setAttribute("type", "hidden");
			  hiddenField2.setAttribute("name", "value");
			  hiddenField2.setAttribute("value", value);
			  form.appendChild(hiddenField2);

			  var hiddenField3 = document.createElement("input");
			  hiddenField3.setAttribute("type", "hidden");
			  hiddenField3.setAttribute("name", "time");
			  hiddenField3.setAttribute("value", expiration);
			  form.appendChild(hiddenField3);

			  form.target = name;
			  div.appendChild(form);

			  form.submit();
		}
		else {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
			} else {
				var expires = "";
			}
			var cookie_string = name + "=" + escape(value) + expires;
			cookie_string += "; domain=" + escape (".sharethis.com")+";path=/";
			document.cookie = cookie_string;
		}
	},
	setTempCookie : function(name, value, days) {
		if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
		} else {
				var expires = "";
		}
		var cookie_string = name + "=" + escape(value) + expires;
		cookie_string += "; domain=" + escape (".sharethis.com")+";path=/";
		document.cookie = cookie_string;
	},
	getCookie : function(cookie_name) {
	  var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
	  if (results) {
		  return (unescape(results[2]));
	  } else {
		  return false;
	  }
	},
	deleteCookie : function(name) {

		// For all browsers
		var path="/";
		var domain=".sharethis.com";
		document.cookie = name.replace(/^\s+|\s+$/g,"") + "=" +( ( path ) ? ";path=" + path : "")
				  + ( ( domain ) ? ";domain=" + domain : "" ) +";expires=Thu, 01-Jan-1970 00:00:01 GMT";


		// For Safari and IE
		var safari =(navigator.userAgent.indexOf("Safari") !=-1 && navigator.userAgent.indexOf("Chrome") ==-1);
		var ie =(navigator.userAgent.indexOf("MSIE") !=-1);

		if (safari || ie) {
			var _div = document.createElement('div');
			_div.setAttribute("id", name);
			_div.setAttribute("type", "hidden");
			document.body.appendChild(_div);

			var
			div = document.getElementById(name),
			form = document.createElement('form');

			try {
			  var iframe = document.createElement('<iframe name="'+name+'" ></iframe>');
				//try is ie
			} catch(err) {
				//catch is ff and safari
				iframe = document.createElement('iframe');
			}

			iframe.name = name;
			iframe.src = 'javascript:false';
			iframe.style.display="none";
			div.appendChild(iframe);

			form.action = "https://sharethis.com/account/deleteCookie.php";
			form.method = 'POST';

			var hiddenField = document.createElement("input");
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("name", "name");
			hiddenField.setAttribute("value", name);
			form.appendChild(hiddenField);

			form.target = name;
			div.appendChild(form);

			form.submit();
		}
	},
	deleteAllSTCookie : function() {
		var a=document.cookie;
		a=a.split(';');
		for(var i=0;i<a.length;i++){
			var b=a[i];
			b=b.split('=');

      // do not delete the st_optout cookie
			if(!/st_optout/.test(b[0])){
				var name=b[0];
				var path="/";
				var domain=".edge.sharethis.com";
				document.cookie = name + "=;path=" + path + ";domain=" + domain +";expires=Thu, 01-Jan-1970 00:00:01 GMT";
			}
		}
	},
	setFpcCookie : function(name, value) {
//		var name="__unam";
		var current_date = new Date;
		var exp_y = current_date.getFullYear();
		var exp_m = current_date.getMonth() + 9;// set cookie for 9 months into future
		var exp_d = current_date.getDate();
		var cookie_string = name + "=" + escape(value);
		if (exp_y) {
			var expires = new Date (exp_y,exp_m,exp_d);
			cookie_string += "; expires=" + expires.toGMTString();
		}
		var domain=stlib.cookie.getDomain();
		cookie_string += "; domain=" + escape (domain)+";path=/";
		document.cookie = cookie_string;
	},
	getFpcCookie : function(cookie_name) {
		var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
		if (results)
			return (unescape(results[2]));
		else
			return false;
	},
	getDomain : function() {
		var str = document.domain.split(/\./);
		var domain="";
		if(str.length>1){
			domain="."+str[str.length-2]+"."+str[str.length-1];
		}
		return domain;
	},
	checkCookiesEnabled: function() {
		if(!tpcCookiesEnableCheckingDone) {
			stlib.cookie.setTempCookie("STPC", "yes", 1);
			if(stlib.cookie.getCookie("STPC") == "yes") {
				tpcCookiesEnabledStatus = true;
			}else {
				tpcCookiesEnabledStatus = false;
			}
			tpcCookiesEnableCheckingDone = true;
			return tpcCookiesEnabledStatus;
		}else{
			return tpcCookiesEnabledStatus;
		}
	},
	hasLocalStorage: function() {
		try {
			localStorage.setItem("stStorage", "yes");
			localStorage.removeItem("stStorage");
			return true;
		} catch(e) {
			return false;
		}
	}
};
/********************END COOKIE LIBRARY***********************/
/*
 * Requires cookie.js
 */
stlib.fpc = {
	cookieName: "__unam",
	cookieValue: "",
	createFpc: function() {
		if(!document.domain || document.domain.search(/\.gov/) > 0){
			return false;
		}
//		var firstPersonCookie = stlib.cookie.getCookie(stlib.fpc.cookieName);
		var firstPersonCookie = stlib.cookie.getFpcCookie(stlib.fpc.cookieName);
		if(firstPersonCookie==false){
			// Create a new cookie
			var bigRan = Math.round(Math.random() * 2147483647);
			bigRan = bigRan.toString(16);

			var time = (new Date()).getTime();
			time = time.toString(16);

			var partialDomain = window.location.hostname.split(/\./)[1];
			if(!partialDomain){
				return false;
			}

			var cookieValue = "";
			cookieValue = stlib.fpc.determineHash(partialDomain) + "-" + time + "-" + bigRan + "-1";

			firstPersonCookie = cookieValue;
		}else{
			// Increment the counter on the cookie by one
			var originalCookie = firstPersonCookie;
			var originalCookieArray = originalCookie.split(/\-/);
			if(originalCookieArray.length == 4){
				var num = Number(originalCookieArray[3]);
				num++;
				firstPersonCookie = originalCookieArray[0] + "-" + originalCookieArray[1] + "-" + originalCookieArray[2] + "-" + num;
			}
		}

//		stlib.cookie.setCookie(stlib.fpc.cookieName, firstPersonCookie, 90);
		stlib.cookie.setFpcCookie(stlib.fpc.cookieName, firstPersonCookie);
		stlib.fpc.cookieValue = firstPersonCookie;
		return firstPersonCookie;
	},

	determineHash: function(partialDomain) {
		var hash = 0;
		var salt = 0;
		for (var i = partialDomain.length - 1; i >= 0; i--) {
			var charCode = parseInt(partialDomain.charCodeAt(i));
			hash = ((hash << 8) & 268435455) + charCode + (charCode << 12);
			if ((salt = hash & 161119850) != 0){
				hash = (hash ^ (salt >> 20));
			}
		}
		return hash.toString(16);
	}
};
/*
 * This holds critical data, requires the cookie object
 */
if (typeof(stlib.data) == "undefined") {
	stlib.data = {
		bInit: false,
		publisherKeySet: false,
		pageInfo: {
		},
		shareInfo: {
		},
		resetPageData: function() {
			//stlib.data.pageInfo.publisher 		= "00-00-00"; // The publisher key as given by the publisher
			// stlib.data.pageInfo.fpc 			= "ERROR"; // The cookie set on the publisher's domain to track the user on that domain
			stlib.data.pageInfo.sessionID 		= "ERROR"; // The session on any given pageview with our widget on it
			//stlib.data.pageInfo.sourceURL		= "ERROR"; // The source domain
			stlib.data.pageInfo.hostname		= "ERROR"; // The source domain
			stlib.data.pageInfo.location		= "ERROR"; // The source domain
			stlib.data.pageInfo.product		  = "DOS2"; // the product
		},
		resetShareData: function() {
			stlib.data.shareInfo = {};
			stlib.data.shareInfo.url 			= "ERROR"; // The url the service is sharing before any modification
			stlib.data.shareInfo.sharURL		= ""; // The shar url the service is sharing before any modification
			stlib.data.shareInfo.buttonType		= "ERROR"; // The button type that were clicked (hcount or vcount)
			stlib.data.shareInfo.destination	= "ERROR"; // The channel that is being shared to (facebook, twitter)
			stlib.data.shareInfo.source 		= "ERROR"; // The widget or code location that is generating the request
		},
		resetData: function() {
			stlib.data.resetPageData();
			stlib.data.resetShareData();
		},

		init: function() {
			if (!stlib.data.bInit) {
				stlib.data.bInit = true;
				stlib.data.resetData();
				stlib.data.set("fcmp", typeof(window.__cmp) == 'function', "pageInfo");
                              stlib.data.set("fcmpv2", typeof(window.__tcfapi) == 'function', "pageInfo");

				if (stlib.publisher){
					stlib.data.setPublisher(stlib.publisher);
				}
				stlib.data.set("product",stlib.product,"pageInfo");
				var rawUrl = document.location.href;
				var sessionID_time = '', sessionID_rand = '';
				stlib.data.set("url", rawUrl,"shareInfo");

				// no longer using fpc
				// stlib.fpc.createFpc();
				// stlib.data.set("fpc",stlib.fpc.cookieValue,"pageInfo"); // Requires that the cookie has been created

				stlib.data.set("title", document.title, "shareInfo");

				sessionID_time = (new Date()).getTime().toString();
				sessionID_rand = Number(Math.random().toPrecision(5).toString().substr(2)).toString();
				stlib.data.set("sessionID",sessionID_time + '.' + sessionID_rand,"pageInfo");
				stlib.data.validateRefDomain();
				//stlib.data.set("sourceURL", document.location.href,"pageInfo");
				stlib.data.set("hostname", document.location.hostname,"pageInfo");
				stlib.data.set("location", document.location.pathname,"pageInfo");
			}
		},

		validateRefDomain: function() {
			var refDomain = stlib.data.get("refDomain", "pageInfo");
			if (!refDomain) {
				this.setRefDomain(stlib.util.prop('referrer', window.document));
			}
		},

		setRefDomain: function (refDomain) {
			if (refDomain.length == 0) {
				return;
			}
			var referArray = refDomain.replace("http://", "").replace("https://", "").split("/");
			if(referArray.length > 0) {
				refDomain = (typeof(referArray[0]) != "undefined") ? referArray[0] : refDomain;
				refQuery = (typeof(referArray[1]) != "undefined") ? referArray[1] : "";
				stlib.data.set("refQuery", refQuery,"pageInfo");
				stlib.data.set("refDomain", refDomain ,"pageInfo");
			}
;
		},
		setPublisher: function(publisherKey) {
			// TODO: Add Validation
			stlib.data.set("publisher",publisherKey,"pageInfo");
		},
		setSource: function(src, options) {
			// TODO: Add Validation
			var source = "";
			// Inside widget logging
			if (options) {
				if (options.toolbar) {
					source = "toolbar"+src;
				} else if (options.page && options.page != "home" && options.page != "") {
					source = "chicklet"+src;
				} else {
					source = "button"+src;
				}
			}
			// Outside widget logging
			else {
				// can be share5x, share4x, chicklet, fastshare, mobile
				source = src;
			}
			stlib.data.set("source",source,"shareInfo");
		},
		set: function(key, value, table) {
			if (typeof(value) == "number" || typeof(value) == "boolean") {
				stlib.data[table][key] = value;
			} else if (typeof(value) == "undefined" || value == null) {
			} else {
				stlib.data[table][key] = encodeURIComponent(decodeURIComponent(unescape(value.replace(/<[^<>]*>/gi, " ")).replace(/%/gi, "%25")));
				// These might have url encoded data
				if (key=="url" /*|| key=="sourceURL"*/ || key=="location" || key=="image") {
					try {
						stlib.data[table][key] = encodeURIComponent(decodeURIComponent(decodeURI(value.replace(/<[^<>]*>/gi, " ")).replace(/%/gi, "%25")));
					} catch (e) {
						stlib.data[table][key] = encodeURIComponent(decodeURIComponent(unescape(value.replace(/<[^<>]*>/gi, " ")).replace(/%/gi, "%25")));
					}
				}
			}
		},
		get: function(key, table) {
			try{
				if (stlib.data[table] && stlib.data[table][key])
					return decodeURIComponent(stlib.data[table][key]);
				else
					return false;
			}catch(e){
				return false
			}
		},
		unset: function(key, table) {
			if (stlib.data[table] && typeof(stlib.data[table][key])!="undefined")
				delete stlib.data[table][key];
		},
                bindEvent: function(element, eventName, eventHandler) {
                    if (element.addEventListener) {
                        element.addEventListener(eventName, eventHandler, false);
                    } else if (element.attachEvent) {
                        element.attachEvent('on' + eventName, eventHandler);
                    }
                },
                debug: function(endpoint, event) {
                  stlib.data.init();
                  var a = stlib.data.pageInfo;
                  var c = "";
                  var b;
                  for (b in a) {
                      c += b + "=" + a[b] + "&"
                  }
                  c = c.substring(0, c.length - 1);

                  var loggerUrl = "https://l.sharethis.com/";
                  loggerUrl += endpoint;
                  loggerUrl += "?event=" + event;
                  loggerUrl += "&" + c;

                  var e = new Image(1, 1);
                  e.src = loggerUrl;
                  e.onload = function() {
                      return
                  };
                },
                hostname: function(url) {
                  var a;
                  if (url == null) {
                    url = st.href;
                  }
                  a = document.createElement('a');
                  a.setAttribute('href', url);
                  return a.hostname;
                },
                parseCookie: function (name, cookie) {
                  var values = cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
                  return values ? values.pop() : null;
                },
                writeCookie: function(name, value, max_age)  {
                  if (!max_age) {
                    max_age = 33696000
                  }
                  var host = (window && window.location && window.location.hostname) || '';
                  var parts = host.split('.');
                  var domain = "";
                  if (parts.length > 1) {
                    domain = "domain=." + parts.slice(-2).join('.');
                  }
                  var samesite_secure = "";
                  try {
                    document.cookie = "st_samesite=1;SameSite=None;Secure";
                    if (stlib.data.parseCookie("st_samesite", document.cookie)) {
                      samesite_secure = "SameSite=None;Secure"
                      document.cookie = "st_samesite=1;max-age=0;SameSite=None;Secure";
                    }
                  } catch (e) {}
                  document.cookie = name + "=" + value + ";" + domain + ";path=/;max-age=" + max_age + ";" + samesite_secure;
                },
                setConsent: function(consent) {
                    for(var consent_key in consent) {
                         stlib.data.set(consent_key,consent[consent_key],"pageInfo");
                    }
                },
                getEUConsent: function (c) {

                  function once(fn, context) { 
                    var result;
                    return function() { 
                      if(fn) {
                        result = fn.apply(context || this, arguments);
                        fn = null;
                      }
                      return result;
                    };
                  }
        
                  var done = once(c);

                  // set usprivacy first if we have it
                  var usprivacy = stlib.data.parseCookie("usprivacy", document.cookie);
                  if (usprivacy) {
                    stlib.data.setConsent({
                      usprivacy: usprivacy
                    });
                  }

                  // keep track of how long it takes to get consent
                  var start = Date.now();

                  var useCookie = once(function() {

                    // check for first party cookies
                    var euconsent_v2 = stlib.data.parseCookie("euconsent-v2", document.cookie);
                    if (euconsent_v2 !== null) {
        
                      // use the first party cookie if it exists
                      stlib.data.setConsent({
                        gdpr_consent: euconsent_v2,
                        gdpr_domain: document.location.hostname,
                        gdpr_method: "cookie"
                      });
                    }
                    done();
                  });

                  if (typeof window.__tcfapi == "function") {

                    // fallback to cookie in case the tcf api is too slow or unavailable
                    var timeout = setTimeout(useCookie, 5000);
        
                    // first we try to get the data from the cmp
                    // wrap in a try catch since we don't control the tcfapi code on page
                    try {
                      window.__tcfapi("getTCData", 2, function (data) {
                        if (data && data.tcString) {
                          var gdpr_domain = (data.isServiceSpecific)
                            ? document.location.hostname : ".consensu.org";
                          stlib.data.setConsent({
                            consent_duration: Date.now() - start,
                            gdpr_consent: data.tcString,
                            gdpr_domain: gdpr_domain,
                            gdpr_method: "api"
                          });
                          clearTimeout(timeout);
                          done();
                        } else {
        
                          // fallback to cookie if there is no data
                          useCookie();
                        }
                      });
                    } catch (e) {
        
                      // fallback to cookie if there is an error
                      useCookie();
                    }
                  } else {
        
                    // fallback to cookie if the tcfapi doesn't exist
                    useCookie();
                  }
                }
	};

	stlib.data.resetData();
}
stlib.comscore = {
  load: function() {
      var ref=document.referrer;
      var lurl = "https://sb.scorecardresearch.com/";
      lurl+="b?c1=7&c2=8097938&rn=" +Math.round(Math.random() * 2147483647 )+ "&c7=" + encodeURIComponent(document.location.href)+ "&c3=8097938"+ "&c8="+encodeURIComponent(document.title)+ ( (ref)? "&c9="+encodeURIComponent(document.referrer) :  "" )+ "&cv=2.2"+ "&cs=js";
      var logger = new Image(1,1);
      logger.src = lurl;
      logger.onload = function(){return;};
  }
}
/********************START LOGGING***********************/
/*
 * This handles logging
 */
stlib.logger = {
  loggerUrl: "https://l.sharethis.com/",
  l2LoggerUrl: "https://l2.sharethis.com/",
  productArray: new Array(),
  version: '',
  lang: 'en',
  isFpEvent: false,

  constructParamString: function() {
    
    // Pull all the parameters from the page the widget was on
    var p = stlib.data.pageInfo;
    var paramString = "";
    var param;

    for (param in p) {
      
      // the following line creates "param=value&"
      if (p[param] == null || p[param] === "" || p[param] == "ERROR") continue;
      paramString += param + "=" + p[param] + "&";
    }

    // Pull all the parameters related to the share
    p = stlib.data.shareInfo;
    for (param in p) {
      if (p[param] == null || p[param] === "" || p[param] == "ERROR") continue;
      paramString += param + "=" + p[param] + "&";
    }

    // add sop parameter
    paramString += "sop=false"

    // add fpestid if it exists
    var fpestid = stlib.data.parseCookie("fpestid", document.cookie);
    if (fpestid) {
      paramString += "&fpestid=" + fpestid;
    }

    // add description if it exists
    try {
      var elements = document.getElementsByTagName("meta");
      for (var i = 0; i < elements.length; i++) {
        var attribute = elements[i].getAttribute('property');
        if (attribute == null) {
          attribute = elements[i].getAttribute('name');
        }
        if (attribute == "twitter:description" || attribute == "og:description" || attribute == "description" || attribute == "Description") {
          var description = encodeURIComponent(elements[i].getAttribute('content'));
          paramString += "&description=" + description;
          break;
        }
      }
    } catch (e) {}

    return paramString
  },
  ibl: function() {
    var blacklist, domain, protocol, hostname, href, i, len;
    href = document.referrer;
    if (href) {
      hostname = stlib.data.hostname(href) || '';
      if (stlib.data.protocol) {
        protocol = stlib.data.protocol(href) || '';
        if (protocol == "android-app:") {
          return true;
        }
      }
      blacklist = ['aol', 'bing', 'bs.to', 'facebook', 'google', 'yahoo', 'yandex', document.location.hostname];
      for (i = 0, len = blacklist.length; i < len; i++) {
        domain = blacklist[i];
        if (hostname.indexOf(domain) > -1) {
          return true;
        }
      }
      var logUrl = stlib.logger.loggerUrl + "log?event=ibl&url=" + href;
      stlib.logger.logByImage("ibl", logUrl, null);
    }
    return true;
  },
  obl: function(e) {
    var href, prefix, ref;
    if ((e != null ? (ref = e.target) != null ? ref.tagName : void 0 : void 0) === 'A') {
      href = e.target.getAttribute('href') || '';
      prefix = href.slice(0, href.indexOf(':'));
      if (href.slice(0, 4) === 'http' && e.target.hostname !== document.location.hostname) {
        var logUrl = stlib.logger.loggerUrl + "log?event=obl&url=" + href;
        stlib.logger.logByImage("obl", logUrl, null);
      }
    }
    return true;
  },
  getGDPRQueryString: function() {
    var gdpr_consent = stlib.data.get("gdpr_consent", "pageInfo");
    var gdpr_domain = encodeURIComponent(stlib.data.get("gdpr_domain", "pageInfo"));
    var gdpr_method = stlib.data.get("gdpr_method", "pageInfo");
    var gdpr_query_str = "";
    if (gdpr_consent) {
      gdpr_query_str += "&gdpr_consent=" + gdpr_consent;
    }
    if (gdpr_domain) {
      gdpr_query_str += "&gdpr_domain=" + gdpr_domain;
    }
    if (gdpr_method) {
      gdpr_query_str += "&gdpr_method=" + gdpr_method;
    }
    return gdpr_query_str;
  },

  loadPixelsAsync: function(res) {
    if (typeof(stlib.product) !== "undefined") {
      if ((stlib.product == "ecommerce") ||
         (stlib.product == "dos2") ||
         (stlib.product == "feather") ||
         (stlib.product == "simple") ||
         (stlib.product == "simpleshare") ||
         (stlib.product == "simple-share-pro")) {
        return;
      }
    }
    if (typeof(res) !== "undefined") {
        if (res.status === "true") {
          // set stid
          stlib.data.set("stid", res.stid, "pageInfo")

          // fire the pixel
          var pxcel_url = "https://t.sharethis.com/1/d/t.dhj?rnd=" +
            (new Date()).getTime() +
            "&cid=c010&dmn="+
            window.location.hostname +
            stlib.logger.getGDPRQueryString();
          var $el = document.createElement('script');
          $el.async = 1;
          $el.src = pxcel_url;
          $el.id = "pxscrpt";
          var first = document.getElementsByTagName('script')[0];
          first.parentNode.insertBefore($el, first);
        }

        // run dmd script if indicated in response
        if (res.dmd === "true") {
          var f = function (w, d, s, m, n, t) {
            w[m] = w[m] || {
              init: function () { (w[m].q = w[m].q || []).push(arguments); }, ready: function (c) {
                if ('function' != typeof c) { return; } (w[m].c = w[m].c || []).push(c); c = w[m].c;
                n.onload = n.onreadystatechange = function () {
                  if (!n.readyState || /loaded|complete/.test(n.readyState)) {
                    n.onload = n.onreadystatechange = null;
                    if (t.parentNode && n.parentNode) { t.parentNode.removeChild(n); } while (c.length) { (c.shift())(); }
                  }
                };
              }
            }, w[m].d = 1 * new Date(); n = d.createElement(s); t = d.getElementsByTagName(s)[0];
            n.async=1;n.src='https://www.medtargetsystem.com/javascript/beacon.js?'+(Date.now().toString()).substring(0,4);n.setAttribute("data-aim",m);t.parentNode.insertBefore(n,t);
          }
          f(window, document, 'script', 'AIM');

          AIM.init('194-3051-2EAEFDBB', { 'onload_pageview': false });

          AIM.ready(function () {
            var stid = stlib.data.get("stid", "pageInfo");
            var url = window.location.href + '#estid=' + stid;
            AIM.pageview(url);
          });
        }

        try {

          function getBrowser() {
            var ua = navigator.userAgent;
            var tem; 
            var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            var isMobile = /iPhone|iPad|iPod|Android|Opera Mini|IEMobile|WPDesktop|BlackBerry|webOS|Windows Phone/i.test(ua);
            if(/trident/i.test(M[1])){
                tem =  /\brv[ :]+(\d+)/g.exec(ua) || [];
                return 'IE '+(tem[1] || '');
            }
            if(M[1] === 'Chrome'){
                tem = ua.match(/\b(OPR|Edg)\/(\d+)/);
                if(tem != null) return tem.slice(1).join('').replace('OPR', 'Opera').replace('Edg', 'Edge');
            }
            M = M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
            if((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);   
            if(isMobile){
              if(M[0] === 'Chrome'){
                return 'Chrome Mobile'+M.slice(1).join('');
              }
              return 'Mobile '+M.join('');
            }
            return M.join('');
          }

          const browser_allow_list = [
            'Chrome114',
            'Chrome Mobile114',
            'Chrome113',
            'Chrome Mobile113',
            'Mobile Safari',
            'Mobile Safari16',
            'Safari16',
            'Chrome109',
            'Chrome Mobile110',
            'Chrome112',
            'Chrome Mobile112',
            'Edge108',
            'Chrome108',
            'Chrome Mobile108',
          ]

          const standard_browser_name = getBrowser();
         
          // run lotame's panorama id code if indicated by the content rule
          if(res.status === "true" && res.lotame === "true" && browser_allow_list.includes(standard_browser_name)) {
            !function() {
              // Callback that will be triggered after each call to sync()
              // and let you have access to the profile and/or panorama ids
              var syncCallback = function (profile) {
          
                  // sync the panorama id
                  var panorama_id = profile.getPanoramaId();
                  if (panorama_id && res.stid) {
                    var url = "https://sync.sharethis.com/panorama"
                    url += "?uid=" + encodeURIComponent(panorama_id)
                    url += "&stid=" + encodeURIComponent(res.stid)
                    stlib.logger.send(url)
                  }

              };
          
              var lotame_client_id = '16621';
              var lotame_tag_input = {
                  config: {
                      onProfileReady: syncCallback
                  }
              };
          
              // Lotame initialization
              var lotame_config = lotame_tag_input.config || {};
              var namespace = window['lotame_sync_' + lotame_client_id] = {};
              namespace.config = lotame_config;
              namespace.data = {};
              namespace.cmd = namespace.cmd || [];
            } ();

            window.lotame_sync_16621.cmd.push(function() {
              window.lotame_sync_16621.sync();
            });

            stlib.logger.js("https://platform-api.sharethis.com/panorama.js");
          }
        } catch (e) {
          // do nothing for now
        }

    }
  },

  send: function(url) {
    var img = new Image(1, 1);
    img.src = url;
    img.style.display = "none"
    img.onload = function() {};
    img.onerror = function() {};
  },

  js: function(url) {
    var el = document.createElement('script');
    el.async = 1;
    el.src = url;
    var first = document.getElementsByTagName('script')[0];
    first.parentNode.insertBefore(el, first);
  },

  logByImage: function(event, logUrl, callback) {
    
    // add consent params if they exist
    var gdpr_consent = stlib.data.get("gdpr_consent", "pageInfo");
    var gdpr_domain = stlib.data.get("gdpr_domain", "pageInfo");
    if (gdpr_consent) {
      logUrl += "&gdpr_consent=" + gdpr_consent;
    }
    if (gdpr_domain) {
      logUrl += "&gdpr_domain=" + gdpr_domain;
    }
    var gdpr_method = stlib.data.get("gdpr_method", "pageInfo");
    if (gdpr_method) {
      logUrl += "&gdpr_method=" + gdpr_method;
    }
    var usprivacy = stlib.data.get("usprivacy", "pageInfo");
    if (usprivacy) {
      logUrl += "&usprivacy=" + usprivacy;
    }

    // add fpestid if it exists
    var fpestid = stlib.data.parseCookie("fpestid", document.cookie);
    if (fpestid) {
      logUrl += "&fpestid=" + fpestid;
    }
    
    // add description if it exists
    try {
      var elements = document.getElementsByTagName("meta");
      for (var i = 0; i < elements.length; i++) {
        var attribute = elements[i].getAttribute('property');
        if (attribute == null) {
          attribute = elements[i].getAttribute('name');
        }
        if (attribute == "twitter:description" || attribute == "og:description" || attribute == "description" || attribute == "Description") {
          var description = encodeURIComponent(elements[i].getAttribute('content'));
          logUrl += "&description=" + description;
          break;
        }
      }
    } catch (e) {}

    var mImage = new Image(1, 1);
    mImage.src = logUrl + "&img_pview=true";
    mImage.onload = function () {
      return;
    };
    if (event == "pview") {
      stlib.logger.loadPixelsAsync(undefined);
    } else {
      callback? callback() : null;
    }
  },

  // TODO: (step 1) error checking on data
  // TODO: (step 2) convert params into a generic object, normalize or prepare before logging
  log : function(event, loggingUrl, callback, newEndpoint) {

    if(typeof(stlib.data.get("counter", "shareInfo")) != "undefined") {
      var count = 0;
      if (stlib.data.get("counter", "shareInfo")) {
        count = stlib.data.get("counter", "shareInfo");
      }
      stlib.data.set("ts" + new Date().getTime() + "." + count, "", "shareInfo");
      stlib.data.unset("counter", "shareInfo");
    } else {
      stlib.data.set("ts" + new Date().getTime(), "", "shareInfo");
    }

    if(event == 'widget') {
      var shortenedDestination = "." + stlib.hash.hashDestination(stlib.data.shareInfo.destination);
      stlib.hash.updateDestination(shortenedDestination);
    }

    //Fix for SAB-709
    if ( !loggingUrl || (loggingUrl != stlib.logger.loggerUrl && loggingUrl != stlib.logger.l2LoggerUrl)) {
      loggingUrl = stlib.logger.loggerUrl;
    }

    // Step 3: log data (iterate through objects)
    var logName = null;
    if (newEndpoint) {
      logName = event;
    } else {
      logName = (event == "pview") ? event : ((event == "debug") ? "cns" : "log");
    }
    stlib.data.getEUConsent(function(consent){
      if(event == "pview") {
        var logUrl = loggingUrl + logName + "?event="+event+  "&" + "version="+stlib.logger.version+ "&" + "lang="+stlib.logger.lang + "&" + stlib.logger.constructParamString();
      }else {
        var logUrl = loggingUrl + logName + "?event="+event +  "&" + stlib.logger.constructParamString();
      }
      var pview_had_consent = (stlib.data.get("gdpr_consent", "pageInfo")) ? true : false;
      stlib.data.set("pview_had_consent", pview_had_consent, "pageInfo");
      
      var user_agent_data = {}
      try {
        if (navigator.userAgentData) {
          user_agent_data = navigator.userAgentData;
        }

        if (Array.isArray(user_agent_data.brands)) {
          var ua = ""
          user_agent_data.brands.forEach((brand) => {
            if (ua) {
              ua += ", "
            }
            ua += `"${brand.brand}";v="${brand.version}"`
          });
          logUrl += "&ua=" + encodeURIComponent(ua);
        }

        if (user_agent_data.mobile !== undefined) {
          var ua_mobile = (user_agent_data.mobile) ? "true" : "false";
          logUrl += "&ua_mobile=" + encodeURIComponent(ua_mobile);
        }

        if (user_agent_data.platform) {
          var ua_platform = user_agent_data.platform
          logUrl += "&ua_platform=" + encodeURIComponent(ua_platform);
        }

      } catch (e) {
        // do nothing for now if it fails
      }

      // if there is no getHighEntropyValues function create a shell function
      // in order to keep the workflow unified 
      if (!user_agent_data.getHighEntropyValues) {
        user_agent_data.getHighEntropyValues = () => {
          return new Promise((resolve) => {
            resolve({});
          });
        }
      }
      
      function once(fn, context) { 
        var result;
        return function() { 
          if(fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
          }
          return result;
        };
      }

      var sendPageView = once(function() {

        try {
          var client = new XMLHttpRequest();
          var res;
          client.open("GET", logUrl, true);
          client.withCredentials = true;
          client.timeout = 10000;
          client.onreadystatechange = function () {
            if (this.readyState == this.DONE) {
              try {
                res = JSON.parse(client.responseText);
                if (res.fpestid) {
                  stlib.data.writeCookie("fpestid", res.fpestid, res.fpestid_maxage);
                }
                if (event == "pview") {
                  /*
                  // stop firing comscore beacon
                  if (typeof (stlib.comscore) != "undefined") {
                    stlib.comscore.load();
                  }
                  */
                  stlib.logger.loadPixelsAsync(res);
                } else {
                  callback ? callback(): null;
                }
              } catch (e) {
                // responseText is empty for request timeout
                stlib.logger.logByImage(event, logUrl, callback);
              }
            }
          };
          client.send();
        } catch (err) { // some browsers don't support XMLHttpRequest
          stlib.logger.logByImage(event, logUrl, callback);
        }
      })

      var getOverride = function() {
        var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (is_safari) {
          var req = new XMLHttpRequest();
          req.open("GET", "https://data.stbuttons.click/data", true);
          req.onreadystatechange = function() {
            try {
              if (this.readyState == this.DONE) {
                var res = JSON.parse(req.responseText)
                if (res.data) {
                  logUrl += "&override=" + encodeURIComponent(res.data);
                }
                sendPageView()
              }
            } catch(e) {
              sendPageView()
            }
          }
          req.send()
          
          // send page view if request doesn't complete in 2 seconds
          setTimeout(sendPageView, 2000)
        } else {
          sendPageView()
        }
      }

      var high_entropy_fields = [
        "model",
        "platformVersion",
        "fullVersionList"
      ]
      
      user_agent_data.getHighEntropyValues(high_entropy_fields).then((high_entropy_values) => {

        try {

          if (Array.isArray(high_entropy_values.fullVersionList)) {
            var  ua_full_version_list = ""
            high_entropy_values.fullVersionList.forEach((brand) => {
              if (ua_full_version_list) {
                ua_full_version_list += ", "
              }
              ua_full_version_list += `"${brand.brand}";v="${brand.version}"`
            });
            logUrl += "&ua_full_version_list=" + encodeURIComponent(ua_full_version_list);
          }

          if (high_entropy_values.model) {
            var ua_model = high_entropy_values.model
            logUrl += "&ua_model=" + encodeURIComponent(ua_model);
          }

          if (high_entropy_values.platformVersion) {
            var ua_platform_version = high_entropy_values.platformVersion
            logUrl += "&ua_platform_version=" + encodeURIComponent(ua_platform_version);
          }

        } catch (e) {
          // do nothing for now
        }

        getOverride()
        
      });

    });
  },
  tcfapi_listener: function() {
    var start = Date.now();
    var interval = setInterval(function() {
      if (window.__tcfapi) {
        try {
          window.__tcfapi("addEventListener", 2, function(data) {
            if (data && data.eventStatus == "useractioncomplete") {
              stlib.data.set("gdpr_consent", data.tcString, "pageInfo");
              var gdpr_domain = (data.isServiceSpecific) 
                ? document.location.hostname : ".consensu.org";
              stlib.data.set("gdpr_domain", gdpr_domain, "pageInfo");
              stlib.data.set("gdpr_method", "api", "pageInfo");
              var url = stlib.logger.loggerUrl;
              url += "log?event=updated_consent";
              url += "&pview_had_consent=" + stlib.data.get("pview_had_consent", "pageInfo");
              stlib.logger.logByImage("updated_consent", url, null);
            }
          });
        } catch (e) {
          clearInterval(interval);
        }
      }
      if (Date.now() - start > 10000) {
        clearInterval(interval);
      }
    }, 1000);
  }()
};

/********************END LOGGING***********************/
stlib.logger.version = 'st_insights.js'
// set product and property for new buttons
if (window.__sharethis__) {
  stlib.setProduct(window.__sharethis__.product);
  stlib.setPublisher(window.__sharethis__.property);
}
var sop_pview_logged = typeof __stdos__ !== 'undefined' && __stdos__ !== null && __stdos__.onscriptload;
if (!sop_pview_logged && !stlib.onscriptload && document.URL.indexOf("edge.sharethis.com") == -1) {
  stlib.data.init();
  stlib.onscriptload = true;
  stlib.logger.log("pview", null);
}
stlib.logger.ibl();
stlib.data.bindEvent(document, "click", stlib.logger.obl);


if(typeof(stLight)=="undefined" && typeof(SHARETHIS)=="undefined"){ //make sure it isnt called over and over again
  var stWidgetVersion = false;

  if(typeof(switchTo5x)=="undefined") {
    stWidgetVersion = "4x"; // For Migration Phase 2 - by deafult widget will be 5xa
  }else{
    if(switchTo5x == false){
      stWidgetVersion = "4x";
    }
    if(switchTo5x == true){
      stWidgetVersion = "5xa";
    }
  }

	stLight=new function(){
		this.version=false;
		this.publisher=null;
		this.sessionID_time = (new Date()).getTime().toString();
		this.sessionID_rand = Number(Math.random().toPrecision(5).toString().substr(2)).toString();
		this.sessionID = this.sessionID_time + '.' + this.sessionID_rand;
		this.fpc=null;
		this.counter=0;
		this.readyRun=false;
		this.meta={
				hostname: document.location.host,
				location: document.location.pathname
		};
		this.loadedFromBar=false;
		this.clickCallBack=false;
	};

	stLight.loadDefault = function() {
    if (typeof(customProduct) == "undefined") {
		  this.product = "DOS2";
    } else{
      this.product = customProduct;
    }
		this.source = "DOS2";
		this.version = "st_insights.js";
	};

	stLight.options=function(options){
		this.loadDefault();
		// set custom publisher
		if(options && options.publisher){
			stLight.setPublisher(options.publisher);
		}

		// set custom ref domain
		if(options && options.refDomain){
			stLight.setRefDomain(options.refDomain);
		}

		// set custom product
    // calls setProduct but doesn't update stLight.product
		// deprecated: productArray
		stlib.logger.productArray = []
		if(options && options.product){
			stLight.setProduct(options.product);
		}
    else {
			stLight.setProduct(stLight.product);
		}

               // set copy and share options
               if(options && typeof(options.hashAddressBar) != "undefined") {
                        stlib.hash.hashAddressBar = options.hashAddressBar;
               }
               stlib.hash.doNotHash = stlib.hash.doNotCopy = false;
               if(options) {
                        options.doNotCopy = options.doNotHash = false;
               }

	        stlib.stLightOptionsObj = options;
	};

	stLight.onReady=function(){
		if(stLight.readyRun==true){
			return false;
		}

		stLight.loadFromScript();
		stLight.readyRun=true;
    stlib.data.init();
        stLight.fpc=stlib.data.get("fpc", "pageInfo");
		if(stLight.publisher==null){
			if(typeof(window.console)!=="undefined"){
				try{
					// console.debug("Please specify a ShareThis Publisher Key \nFor help, contact support@sharethis.com");
				}catch(err){}
			}
		}
		stLight.setProduct(stLight.product);

		//TODO: set this from the ref?
		stlib.logger.lang = 'en';

	};




        //Used only to generate widget and pview events logs.
	stLight.log=function(event){
		stlib.data.resetShareData();
		stlib.data.setSource(stLight.getSource());
		stlib.data.set("url", document.location.href, "shareInfo");
		stlib.data.set("title", document.title, "shareInfo");
		stlib.data.set("counter", stLight.counter++, "shareInfo");
		stlib.logger.log(event);
	};


	if(window.document.readyState=="completed"){
		stLight.onReady();
	}else{
		if (typeof(window.addEventListener) != 'undefined') {
			window.addEventListener("load", stLight.onReady, false);
		} else if (typeof(document.addEventListener) != 'undefined') {
			document.addEventListener("load", stLight.onReady, false);
		} else if (typeof window.attachEvent != 'undefined') {
			window.attachEvent("onload", stLight.onReady);
		}
	}


	stLight.setPublisher = function(publisher) {
	  stlib.data.setPublisher(publisher);
	  stLight.publisher=publisher;
	};

	stLight.setRefDomain = function(refDomain) {
	  stlib.data.setRefDomain(refDomain);
	};

	stLight.setProduct = function(product) {
	  this.product =  product;
	  stlib.data.set("product", product, "pageInfo");
	};

	stLight.getProduct = function() {
		return this.product;
	};

  stLight.getSource=function(){
    var source = 'share4x';
    if(stWidgetVersion == "5xa"){
      source = 'share5x';
    }
    //TODO: Get share bar version before buttons load
    return source;
  };

}

stLight.getUrlSearchParam = function() {
  var list = window.location.search.substring(1);
  return list.split("&");
}

stLight.getUrlQueryParams = function(url) {
  var params = {};
  var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi,
  function(m,key,value) {
		params[key] = value;
  });
  return params;
}

stLight.getScriptSrcParams = function(scriptId){
  var s = document.getElementById(scriptId);
  if (s) {
    return stLight.getUrlQueryParams(s.src)
  }
}

stLight.setParams = function(params) {
	if (params) {
		if (params.refdomain) {
			stLight.setRefDomain(params.refdomain);
		}
		if (params.publisher) {
			stLight.setPublisher(params.publisher);
		}
		if (params.product) {
			stLight.setProduct(params.product);
		}
	}
}

stLight.loadFromScript = function() {
  // Load the url params from script "st_insights_js" src
  var params = stLight.getScriptSrcParams('st_insights_js');
  stLight.setParams(params)
}

stLight.loadFromWindowLocation = function() {
  var params = stLight.getUrlSearchParam();
  stLight.setParams(params)
}

//END OF light.js

stLight.onDomContentLoaded=function(){
  stLight.onReady();
;
};


stLight.domReady=function(){
	stLight.onReady();
};


st_showing=false;

stLight.clickSubscribers=[];
stLight.nonClickSubscribers=[];


if(window.document.readyState=="completed"){
	stLight.domReady();//domReady
}else{
	if (typeof(window.addEventListener) != 'undefined') {
		window.addEventListener("load", stLight.domReady, false);
	} else if (typeof(document.addEventListener) != 'undefined') {
		document.addEventListener("load", stLight.domReady, false);
	} else if (typeof window.attachEvent != 'undefined') {
		window.attachEvent("onload", stLight.domReady);
	}
}



//DOMContentLoaded
if(typeof(__st_loadLate)=="undefined"){
	if (typeof(window.addEventListener) != 'undefined') {
		window.addEventListener("DOMContentLoaded", stLight.onDomContentLoaded, false);
	} else if (typeof(document.addEventListener) != 'undefined') {
		document.addEventListener("DOMContentLoaded", stLight.onDomContentLoaded, false);
	}
} else {
	if (typeof(window.addEventListener) != 'undefined') {
		window.addEventListener("DOMContentLoaded", stLight.onDomContentLoadedLazy, false);
	} else if (typeof(document.addEventListener) != 'undefined') {
		document.addEventListener("DOMContentLoaded", stLight.onDomContentLoadedLazy, false);
	}
}


if(document.readyState == "complete" && stLight.readyRun==false){ //Keep at the end of the file
	//This is called after body is loaded so the domeready call would never get called, so call it here
	stLight.domReady();
}

  


