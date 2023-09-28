/**
 * @version     3.1.x
 * @package     Simple Image Gallery Pro
 * @author      JoomlaWorks - http://www.joomlaworks.net
 * @copyright   Copyright (c) 2006 - 2016 JoomlaWorks Ltd. All rights reserved.
 * @license     http://www.joomlaworks.net/license
 */

var SIGProHelper = {

	ieBrowserDetect: function(){
		if(!document.getElementsByTagName) return false;
		if(!document.getElementById) return false;

		var bodyClass = document.getElementsByTagName("body")[0].className;

		var isIE6 = navigator.userAgent.toLowerCase().indexOf('msie 6') != -1;
		var isIE7 = navigator.userAgent.toLowerCase().indexOf('msie 7') != -1;
		var isIE8 = navigator.userAgent.toLowerCase().indexOf('msie 8') != -1;

		if(isIE6) document.getElementsByTagName("body")[0].className = bodyClass + ' sigProIsIE6';
		if(isIE7) document.getElementsByTagName("body")[0].className = bodyClass + ' sigProIsIE7';
		if(isIE8) document.getElementsByTagName("body")[0].className = bodyClass + ' sigProIsIE8';

	},

	loader: function(func) {
		var oldonload = window.onload;
		if (typeof window.onload != 'function') {
			window.onload = func;
		} else {
			window.onload = function() {
				if (oldonload) {
					oldonload();
				}
				func();
			}
		}
	}

	// END
};

// Initiate
SIGProHelper.loader(SIGProHelper.ieBrowserDetect);
