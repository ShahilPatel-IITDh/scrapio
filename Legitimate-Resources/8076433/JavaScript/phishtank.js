function setcookie(name, value, expires, path, domain, secure) {
	var curCookie = name + "=" + escape(value) +
	((expires) ? "; expires=" + expires.toGMTString() : "") +
	((path) ? "; path=" + path : "") +
	((domain) ? "; domain=" + domain : "") +
	((secure) ? "; secure" : "");
	document.cookie = curCookie;
}

function getcookie(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0) return null;
	} else
		begin += 2;
	var end = document.cookie.indexOf(";", begin);
	if (end == -1)
		end = dc.length;
	return unescape(dc.substring(begin + prefix.length, end));
}

function phishwarning() {
	if(getcookie('phishwarning') == 'y') {
		return TRUE;
	} else {
		alert('Phishing sites may contain malicious software or viruses that may not be detected by your anti-virus software. Please exercise caution when visiting these sites.');
		setcookie('phishwarning', 'y');
		return TRUE;
	}
}

function lbfocus() {
	username = document.getElementById('username');
	password = document.getElementById('password');
	if(username.value == 'username' && password.value == 'password') {
		username.value = '';
		username.style.color = 'black';
		password.value = '';
		password.style.color = 'black';
	}
}

function toggle(id) {
	var e = document.getElementById(id);
	if(e.style.display == 'none') {
		e.style.display = 'block';
	} else {
		e.style.display = 'none';
	}
}

function flagphishreport(phishid) {
	if(!document.getElementById('flagbox')) {
		document.body.innerHTML = document.body.innerHTML + '<div id="flagbox"></div>';
		document.getElementById('flagbox').innerHTML = '<iframe src="flag.php?phish_id=' + phishid +'" width="100%" height="100%" frameborder="0" marginwidth="0" marginheight="0" vspace="0" hspace="0"></iframe>';
		document.getElementById('flagbox').className = 'flagbox';
	} else {
		document.getElementById('flagbox').style.display = 'block';
	}
}

function phishflagvalidate() {
	if(document.getElementById('reasona').checked == false && document.getElementById('reasonb').checked == false && document.getElementById('reasonc').checked == false && document.getElementById('reasond').checked == false && document.getElementById('reasone').checked == false && document.getElementById('reasonf').checked == false) {
		alert('You must select a reason for flagging this phish submission.');
		return false;
	}
}
