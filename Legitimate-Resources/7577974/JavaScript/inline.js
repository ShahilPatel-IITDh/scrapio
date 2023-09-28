
// Column Height Script
function pngHeight() {
	if (document.getElementById('nav-left') || document.getElementById('nav-right')) {
		var pngH = document.getElementById('footer').offsetTop;
		var nH = document.getElementById('nav-wrapper').clientHeight;
		if ( pngH < nH ) pngH = nH;
		if (document.all) {
			document.getElementById('navcontainer').style.height=pngH;
			document.getElementById('fill-1').style.height=pngH;
			document.getElementById('fill-2').style.height=pngH;
			document.getElementById('content').style.height=pngH;
		}
		else {
			document.getElementById('navcontainer').style.height=pngH + "px";
			document.getElementById('fill-1').style.height=pngH + "px";
			document.getElementById('fill-2').style.height=pngH + "px";
			document.getElementById('content').style.height=pngH + "px";
		}
	}
}
var oldhandler = window.onload;
window.onload = (typeof oldhandler == "function")
    ? function() { oldhandler(); pngHeight(); } : pngHeight;
