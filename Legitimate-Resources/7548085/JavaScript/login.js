function init() {
	document.MainForm.UID.focus();
	checkBrowserVersion();
	if(document.getElementById("errormsg").style.display == 'block' || 
		document.getElementById('browsererrormsg').style.display == 'block'){
		//setiFrameHeight();
	}
}


function checkBrowserVersion(){
	var browserName = get_browser();
	var browserVersion = get_browser_version();
	var ieVersion = 9;
	var firefoxVersion = 23;
	var chromeVersion = 23;
	var safariVersion = 5;
	browserVersion = browserVersion.replace(/[a-z ]/gi,'');
	var isBrowserSupported = false;
	if(browserName.search(/chrome/i) != -1){
		if(browserVersion >= chromeVersion){
			isBrowserSupported = true;
		}
	} else if(browserName.search(/firefox/i) != -1){
		if(browserVersion >= firefoxVersion){
			isBrowserSupported = true;
		}
	} else if(browserName.search(/msie/i) != -1){
		if(browserVersion >= ieVersion){
			isBrowserSupported = true;
		}
	} else if(browserName.search(/safari/i) != -1){
		if(browserVersion >= safariVersion){
			isBrowserSupported = true;
		}
	}
	if(isBrowserSupported){
		document.getElementById('browsererrormsg').style.display='none';
	} else {
		document.getElementById('browsererrormsg').style.display='block';
	}
}


function get_browser(){
	var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
	if(/trident/i.test(M[1])){
		tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
		return 'msie '+(tem[1]||'');
		}   
	if(M[1]==='Chrome'){
		tem=ua.match(/\bOPR\/(\d+)/)
		if(tem!=null)   {return 'Opera '+tem[1];}
		}   
	M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
	if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
	return M[0];
}

function get_browser_version(){
	var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];                                                                                                                         
	if(/trident/i.test(M[1])){
		tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
		return (tem[1]||'');
		}
	if(M[1]==='Chrome'){
		tem=ua.match(/\bOPR\/(\d+)/)
		if(tem!=null)   {return 'Opera '+tem[1];}
		}   
	M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
	if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
	return M[1];
}
