var top_ie = 244;
var left_ie = 10;
var top_ns4 = 21;
var left_ns4 = 6;
var top_ns5 = 22;
var left_ns5 = 6;
var width_xx = 166;
var height_xx = 120;

var scrolltimer = null;
var scrollstep = 4;

function checkBrowser() {
	this.ver = navigator.appVersion;
	this.dom = document.getElementById ? 1 : 0;
	this.ie6 = (this.ver.indexOf("MSIE 6")>-1 && this.dom) ? 1 : 0;
	this.ie5 = (this.ver.indexOf("MSIE 5")>-1 && this.dom) ? 1 : 0;
	this.ie4 = (document.all && !this.dom) ? 1 : 0;
	this.ns5 = (this.dom && parseInt(this.ver) >= 5) ? 1 : 0;
	this.ns4 = (document.layers && !this.dom) ? 1 : 0;
	this.IE = (this.ie6 || this.ie5 || this.ie4);
	this.NN = (this.ns5 || this.ns4);
	this.valid = (this.IE || this.NN);
}

var app_version = new checkBrowser();

function drawContainer(src_) {
	if (!app_version.valid) {
//		alert("Your browser not supported");
//		return;
	}

	var src = "";
	var _Coords = new Array();
	_Coords[0] = _Coords[1] = 0;

	if (app_version.IE) {
		src += "<div id='Cont' style='position:absolute;width:" + width_xx + ";height:" + height_xx + ";top:" + top_ie + ";left:" + left_ie + ";overflow:hidden;clip:rect(0," + width_xx + "," + height_xx + ",0);'>";
		src += "<div id='Data' style='position:absolute;top:0;left:0;width:" + width_xx + ";'></div>";
		src += "</div>";
		src += "<iframe id='bufferFrame' name='bufferFrame' src='" + src_ + "' style='position:absolute;width:1;height:1;top:-800;left:-800;overflow:hidden;clip:rect(0,1,1,0)'></iframe>";
		_Coords[0] = top_ie; _Coords[1] = left_ie;
	}
	if (app_version.ns4) {
		src += "<layer name='Cont' position=absolute top=" + top_ns4 + " left=" + left_ns4 + " width=" + width_xx + " height=" + height_xx + " clip='0,0," + width_xx + "," + height_xx + "'>";
		src += "<layer name='Data' src='" + src_ + "' position=absolute top=0 left=0 width=" + width_xx + "></layer>";
		src += "</layer>";
		_Coords[0] = top_ns4; _Coords[1] = left_ns4;
	}
	if (app_version.ns5) {
		src += "<div id='Cont' style='position:absolute;width:" + width_xx + ";height:" + height_xx + ";top:" + top_ns5 + ";left:" + left_ns5 + ";overflow:hidden;clip:rect(0," + width_xx + "," + height_xx + ",0);'>";
		src += "<div id='Data' style='position:absolute;top:0;left:0;width:" + width_xx + ";'></div>";
		src += "</div>";
		src += "<iframe id='bufferFrame' name='bufferFrame' src='" + src_ + "' style='position:absolute;width:1;height:1;top:-800;left:-800;overflow:hidden;clip:rect(0,1,1,0)'></iframe>";
		_Coords[0] = top_ns5; _Coords[1] = left_ns5;
	}

	document.write(src);

	return _Coords;
}

function updateContainer(data_) {
	if (app_version.IE) {
	    document.all("Data").innerHTML = document.frames("bufferFrame").document.body.innerHTML;
	    document.all("Data").style.top = 0;
	}
	if (app_version.ns4) {
	   	window.document.layers["Cont"].document.layers["Data"].top = 0;
	}
	if (app_version.ns5) {
		var obj = document.getElementById('Data');
		obj.style.top = 0;
		obj.innerHTML = data_.document.childNodes[0].childNodes[2].innerHTML;
	}
}

function stopScroll() {
	if (scrolltimer) clearInterval(scrolltimer);
}

function doScrollDown() {
    if (scrolltimer) clearInterval(scrolltimer);
    scrolltimer = setInterval("doScroll(-1)", 20);
}

function doScrollUp() {
    if (scrolltimer) clearInterval(scrolltimer);
    scrolltimer = setInterval("doScroll(1)", 20);
}

function doScroll(direction_) {
    var tmpObj;
    var tmpHeight;
    var tmpTop;
    var backHeight;

	if (app_version.IE) {
	    tmpObj = document.all("Data").style;
    	tmpHeight = document.all("Data").offsetHeight;
	    tmpTop = document.all("Data").offsetTop;
    	backHeight = document.all("Cont").offsetHeight;
	}
	if (app_version.ns4) {
	    tmpObj = document.layers["Cont"].document.layers["Data"];
	    tmpHeight = tmpObj.clip.height;
	    tmpTop = tmpObj.top;
	    backHeight = document.layers["Cont"].clip.height;
	}
	if (app_version.ns5) {
	    tmpObj = document.getElementById("Data").style;
    	tmpHeight = document.getElementById("Data").offsetHeight;
	    tmpTop = parseInt(document.getElementById("Data").style.top, 10);
    	backHeight = document.getElementById("Cont").offsetHeight;
	}

    switch(direction_) {
        case 1:
            if (tmpTop < 0) {
                tmpObj.top = tmpTop + scrollstep;
            } else {
                clearInterval(scrolltimer);
            }
	        break;
        case -1:
            if (tmpTop > -(tmpHeight-backHeight)) {
                tmpObj.top = tmpTop - scrollstep;
            } else {
                clearInterval(scrolltimer);
            }
	        break;
    }
}

function refreshBasketArea(obj_) {
	if (app_version.IE) {
		obj_.location.href = "view.php?file=basket_area.html&nocache=" + (new Date()).getTime();
	}
	if (app_version.ns4) {
		obj_.src = "view.php?file=basket_area.html&nocache=" + (new Date()).getTime();
		obj_.top = 0;
	}
	if (app_version.ns5) {
		obj_.location.href = "view.php?file=basket_area.html&nocache=" + (new Date()).getTime();
	}
}

function save4restore(frm) {
	var val = "";
	var ckval = "";
	for (i=0; i<frm.elements.length; i++) {
		obj = frm.elements[i];
		switch(obj.type) {
		case "checkbox":
			val = (obj.checked) ? "yes" : "no";
			break;
		case "select-one":
			val = obj.options.selectedIndex;
			break;
		case "select-multiple":
			val = "-1";
			for (var j = 0; j < obj.options.length; j++) {
				if (obj.options[j].selected) val += "|" + j;
			}
			break;
		case "password":
		case "text":
		case "textarea":
			val = obj.value;
			break;
		}
		if (obj.name != "") {
			ckval += obj.name + "=" + val + "\t";
		}
	}
	deleteCookie_("ck4errcollection", "", "");
	setCookie_("ck4err", "yes", "", "", "", "");
	setCookie_("ck4errcollection", ckval, "", "", "", "");
	return true;
}

function restoreall(frm) {
	var val, fld;
	var buf;
	var ckcollection = Array();
	var collectionmap = Array();

	if (getCookie_("ck4err") == "yes") {
		var ckval = getCookie_("ck4errcollection");
		ckcollection = ckval.split("\t");
		for (i=0; i<ckcollection.length; i++) {
			var delim = ckcollection[i].indexOf("=");
			fld = ckcollection[i].substring(0, delim);
			val = ckcollection[i].substring(delim + 1, ckcollection[i].length);
			if (fld == "") continue;
			ckcollection[i] = val;
			collectionmap[i] = fld;
		}
		for (i=0; i<frm.elements.length; i++) {
			obj = frm.elements[i];
			if (obj.name == "") { continue; }

			val = "";
			for (j=0; j<collectionmap.length; j++) {
				if (obj.name == collectionmap[j]) {
					val = ckcollection[j];
					break;
				}
			}

			switch(obj.type) {
			case "checkbox":
				obj.checked = (val == "yes") ? true : false;
				break;
			case "select-one":
				obj.options.selectedIndex = parseInt("0" + val, 10);
				break;
			case "select-multiple":
				var selmcollection = val.split("|");
				for (j=1; j<selmcollection.length; j++) {
					var optionidx = parseInt(selmcollection[j], 10);
					if (optionidx >= 0) obj.options[optionidx].selected = true;
				}
				break;
			case "password":
			case "text":
			case "textarea":
				obj.value = val;
				break;
			}
		}
	}
	deleteCookie_("ck4err", "", "");
	deleteCookie_("ck4errcollection", "", "");
	return true;
}

function setCookie_(name, value, expires, path, domain, secure) {
  var curCookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires.toGMTString() : "") + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");
  document.cookie = curCookie;
}

function getCookie_(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return "";
  } else
    begin += 2;
  var end = document.cookie.indexOf(";", begin);
  if (end == -1)
    end = dc.length;
  var retval = unescape(dc.substring(begin + prefix.length, end));
  if (retval == null) retval = "";
  return retval;
}

function deleteCookie_(name, path, domain) {
  if (getCookie_(name)) {
    document.cookie = name + "=" + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

var http_request = false;
function makeRequest(url, parameters, procfunction) {
  http_request = false;
  if (window.XMLHttpRequest) { // Mozilla, Safari,...
     http_request = new XMLHttpRequest();
     if (http_request.overrideMimeType) {
        http_request.overrideMimeType('text/xml');
     }
  } else if (window.ActiveXObject) { // IE
     try {
        http_request = new ActiveXObject("Msxml2.XMLHTTP");
     } catch (e) {
        try {
           http_request = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
     }
  }
  if (!http_request) {
     alert('Cannot create XMLHTTP instance (AJAX init failed)');
     return false;
  }
  http_request.onreadystatechange = procfunction;
  http_request.open('GET', url + parameters, true); // true - continue execution
  http_request.send(null);
}

var selectStatesObj = null;
var statesdivtxt = null;
var statesdivselect = null;
function updateStates(modulefilter, country, region, selectobj, divtxt, divselect) {
  selectStatesObj = selectobj;
  statesdivtxt = divtxt;
  statesdivselect = divselect;
  makeRequest('ws/stateslist.php', '?showfirstoption=1&backendcontext=0&countryid=' + country + '&regionid=' + region + '&modulefilter=' + modulefilter, fillStates);
}

function fillStates() {
  if (!selectStatesObj) return;

  for (var i=selectStatesObj.length-1; i>=0; i--) {
	selectStatesObj.options[i] = null;
  }

  if (http_request.readyState == 4) {
     if (http_request.status == 200) {
        var xmldoc = http_request.responseXML;
        var root = xmldoc.getElementsByTagName('states').item(0); // states
		var itmIDX = 0;
        for (var iNode = 0; iNode < root.childNodes.length; iNode++) {
           var node = root.childNodes.item(iNode); // state
		   if (node.hasChildNodes()) {
               var id = node.getElementsByTagName('id').item(0).childNodes.item(0).nodeValue; // id
               var name = node.getElementsByTagName('name').item(0).childNodes.item(0).nodeValue; // name
		       var option_ = new Option(name, id);
		       selectStatesObj.options[itmIDX] = option_; itmIDX++;
		   }
        }
     } else {
        alert('There was a problem with the request.');
     }
  }

  if (document.getElementById) {
	var stlObjectTXT;
	var stlObjectSELECT;
	if (document.getElementById) {
		stlObjectTXT = document.getElementById(statesdivtxt).style;
		stlObjectSELECT = document.getElementById(statesdivselect).style;
	}
	if (document.all) {
		stlObjectTXT = document.all(statesdivtxt).style;
		stlObjectSELECT = document.all(statesdivselect).style;
	}
	if (stlObjectTXT) {
		if (selectStatesObj.options.length > 0) {
			stlObjectTXT.display = "none";
			stlObjectSELECT.display = "inline";
		} else {
			stlObjectTXT.display = "inline";
			stlObjectSELECT.display = "none";
		}
	}
  }
}

function getExtraFields() {
	var val = "";
	var retval = "";
	var frm = document.frmmain;
	if (document.frmextrafields) frm = document.frmextrafields;
	for (i=0; i<frm.elements.length; i++) {
		obj = frm.elements[i];
		if (obj.name.substring(0, 4) == 'ext_') {
			switch(obj.type) {
			case "checkbox":
				val = (obj.checked) ? obj.value : "";
				break;
			case "select-one":
				val = obj.options[obj.options.selectedIndex].value;
				break;
			case "select-multiple":
				val = "";
				for (var j = 0; j < obj.options.length; j++) {
					if (obj.options[j].selected) {
						if (val != "") val += "|";
						val += obj.options[j].value;
					}
				}
				break;
			case "password":
			case "text":
			case "textarea":
				val = obj.value;
				break;
			}
			if (obj.name != "") {
				retval += obj.name + "*P1*" + val + "\t";
			}
		}
	}
	return retval;
}
