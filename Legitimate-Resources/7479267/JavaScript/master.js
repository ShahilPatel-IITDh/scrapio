/* ‚¿‚ç‚Â‚«‰ñ”ğ */
try {
	document.execCommand('BackgroundImageCache', false, true);
} catch(e) {}

function popup(win_url) {
	WinOpen = window.open(win_url,"popup",'location=yes,menubar=no,status=yes,scrollbars=yes,resizable=yes,width=680');
	WinOpen.focus();
	return false;
}

function popup2(win_url,winName,features) {
	WinOpen = window.open(win_url, winName, features);
	WinOpen.focus();
	return false;
}

function MM_openBrWindow(win_url,winName,features) {
	return popup2(win_url, winName, features);
}

function setJcbTopCookie() {
	var expires = new Date();
	expires.setTime(expires.getTime() + (183 * 24 * 60 * 60 * 1000));
	document.cookie = "TOP_JCB=on; domain=jcb.co.jp; path=/; expires=" + expires.toGMTString();
}

function setMyJCookie() {
	// 20090331 �ˆ—��í�œ
}
// -->
