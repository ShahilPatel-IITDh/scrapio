function getCk(key){
	var all = document.cookie;
	if(all != ""){
		var list = all.split("; ");
		for(var i = 0; i < list.length; i++){
			var c = list[i];
			var p = c.indexOf("=");
			if(key == c.substring(0, p)) return decodeURIComponent(c.substring(p+1));
		}
	}
	return false;
}

function setCk(key, val, day, sec_flg){
	if(typeof day !== "number") return false;
	var age = day * 60 * 60 * 24;
	var d = new Date();
	d.setDate(d.getDate() + day);
	var exp =  (d.toUTCString()).replace("UTC","GMT");
	var path = "/";
	var cookie = key + "=" + encodeURIComponent(val) + "; path=" + path + "; max-age=" + age + "; expires=" + exp;
	if(sec_flg) cookie += "; secure";
	document.cookie = cookie;
}

