
document.ondragstart = function() { return false;}
	function nocontext(e) {
	   return false;
	}
	document.oncontextmenu = nocontext;
