function fpv() {
	try {
		if(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
			return (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
		}
	} catch(e) {}
	return '0,0,0';
}

function gL() {
	if (top && top != self) {
		var loc = document.referrer || document.location;
	} else if (window && location) {
		var loc = window.location;
	} else {
		var loc = document.location;
	}
	loc = loc + '';
	if (loc && loc.length > 1000) {loc = loc.substring(0,1000);}
	return loc;
}
function gRF() {
	var mrf = '';
	if (document && document.referrer && document.referrer != document.location) {
		mrf = document.referrer + '';
		if (mrf && mrf.length > 1000) {mrf = mrf.substring(0,1000);}
	}
	return mrf;
}
function modEnc(v) {
	if (v) {
		var v = encodeURIComponent(v);
		v = v.replace(/%2F/g, '_@2F');v = v.replace(/%3F/g, '_@3F');v = v.replace(/%26/g, '_@26');v = v.replace(/%3B/g, '_@3B');v = v.replace(/%5C/g, '_');v = v.replace(/%255c/g, '_');v = v.replace(/%23/g, '_@23');v = v.replace(/%253B/g, '_@3B');v = v.replace(/%253F/g, '_@3F');
		v = v.replace(/\'|\(|\)|\!/g, '');
		return v;
	} else {
		return '';
	}
}
function gSWHD() {
	var w = (screen.width) ? screen.width:0;var h = (screen.height) ? screen.height:0;var px = 1;
	if (w && window && window.devicePixelRatio && window.devicePixelRatio > 0 && window.devicePixelRatio < 100) {
		px = window.devicePixelRatio;
	}
	return w+'x'+h+'x'+px;
}

function gMDL() {
	var modDL = '';
	if (typeof(modDataLayer) == 'object') {
		for (var key in modDataLayer) {
			var obj = modDataLayer[key];
			for (var prop in obj) {
				if (obj.hasOwnProperty(prop)){
					modDL += prop+'='+obj[prop]+';';
				}
			}
		}
	}
	modDL += '';
	if (modDL && modDL.length > 6) {
		return 'mod_data_layer='+modDL;
	} else {
		return '';
	}
}
var mdjs = {};
mdjs._dL = {};
mdjs.fp = fpv();
mdjs.loc = modEnc(gL());
mdjs.mrf = modEnc(gRF());
mdjs.swhd = gSWHD();
mdjs.mDL = modEnc(gMDL());
if (mdjs.loc && mdjs.loc.indexOf('https') > -1) {
	mdjs.proto = 'https:';
} else if (window && window.location && window.location.protocol == 'https:') {
	mdjs.proto = 'https:';
} else {
	mdjs.proto = 'http:';
}

mdjs.targeting = {
	get:function(k) {
		var idl = 'ct';
		return (typeof mdjs._dL[idl] == 'object' && typeof mdjs._dL[idl][k] != 'undefined') ? mdjs._dL[idl][k] : null;
	},
	getCustom:function() {
		var idl = 'ct';
		return (typeof mdjs._dL[idl] == 'object') ? mdjs._dL[idl] : null;
	},
	getList:function() {
		var idl = 'd';
		return (typeof mdjs._dL[idl] == 'object') ? mdjs._dL[idl] : null;
	},
	getKeys:function() {
		var idl = 'dt';
		return (typeof mdjs._dL[idl] == 'object') ? mdjs._dL[idl] : null;
	}
};

var mdNode = mdNode || [];
try {
	mdNode['s'] = document.querySelector("script[src*='b17a881a4b77ecdff79625fd7115c46c/0.0.async']");
} catch (e) {
	var scripts = document.getElementsByTagName('script');
	for (var i = 0; i < scripts.length; i++) {
		if (scripts[i].src.indexOf('b17a881a4b77ecdff79625fd7115c46c/0.0.async') >= 0) {
			mdNode['s'] = scripts[i];
		}
	}
}
var _mdSct = document.createElement("script");_mdSct.setAttribute("type", "text/javascript");
	_mdSct.setAttribute("src", '//ad.wsod.com/pub/b17a881a4b77ecdff79625fd7115c46c/1.0.async/1689833100;'+mdjs.fp+';'+mdjs.swhd+';'+mdjs.loc+';'+mdjs.mrf+';'+mdjs.mDL+';');
	_mdSct.setAttribute("async", "async");(mdNode['s'].parentNode||document.body).appendChild(_mdSct);
