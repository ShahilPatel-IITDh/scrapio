function sc_map(id, bgcolor, dcolor, rate) {
    var info;
    if (encodeURIComponent) {
        info = '&ua=' + encodeURIComponent(navigator.userAgent);
        info = info + '&ref=' + encodeURIComponent(document.referrer);
        info = info + '&url=' + encodeURIComponent(window.location);
        info = info + '&title=' + encodeURIComponent(document.title);
    } else {
        info = '&ua=' + escape(navigator.userAgent);
        info = info + '&ref=' + escape(document.referrer);
        info = info + '&url=' + escape(window.location);
        info = info + '&title=' + escape(document.title);

    }

    info = info + '&sw=' + screen.width;
    info = info + '&sh=' + screen.height;
    info = info + '&rand=' + Math.round(100 * Math.random());

    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = "async";
    ga.src = '//www.supercounters.com/fc.php?id=' + id + '&w=4' + info; (document.getElementsByTagName("head")[0] || d.getElementsByTagName("body")[0]).appendChild(ga);
    sc_map_var['bgcolor'] = bgcolor.replace("#", "");
    sc_map_var['dcolor'] = dcolor.replace("#", "");
    sc_map_var['rate'] = rate;

}

function sc_show_map(id, s) {
    var vlist = eval(s);
	var rate = 1;
    var url = "//widget.supercounters.com/images/map/bg/" + sc_map_var['bgcolor'] + "/"+ sc_map_var['rate'] +".png";
    var pin = "//widget.supercounters.com/images/map/dot/" + sc_map_var['dcolor'] + ".png";
	if(sc_map_var['rate'] > 1)
	{
		rate = parseFloat("0." + sc_map_var['rate']);
	}
    var cw = 420 * rate;
    var ch = 210 * rate;
    var scale = 360 / cw;
    var c = document.createElement("img");
    c.onload = function() {
        var cd = document.createElement("div");
		cd.id = "scvmap";
        cd.style.position = "relative";
        cd.style.display = "inline-block";
        cd.style.width = cw + "px";
        cd.style.height = ch + "px";
        cd.style.overflow = "hidden";
        cd.style.cursor = "pointer";
        cd.style.backgroundImage = "url(" + url + ")";
        cd.style.backgroundRepeat = "no-repeat";
        cd.style.backgroundPosition = "0px 0px";
        cd.title = "Visitor Map";

        for (k in vlist) {
            var v = vlist[k];
            var x = (v["lo"] + 180) / scale - 4;
            var y = (180 - (v["la"] + 90)) / scale - 4;
			if(x < cw & y < ch)
	            drawPin(pin, y, x, cd);
        }

        cd.onclick = function() {
            window.location = "//www.supercounters.com/stats/" + id;
        };
        ct_insert(cd, "supercounters.com/map.js");
    };
    c.src = url;
}

function ct_insert(c, d) {
    var a = document.getElementsByTagName("script");
    for (var b = 0; b < a.length; b++) {
        if (a[b].src.indexOf(d) > 0) {
            a[b].parentNode.insertBefore(c, a[b].nextSibling);
        }
    }
}

function drawPin(url, t, l, d) {
    var f = document.createElement("div");
    f.style.backgroundImage = "url(" + url + ")";
    f.style.backgroundRepeat = "no-repeat";
    f.style.position = "absolute";
    f.style.padding = "0px";
    f.style.margin = "0px";
    f.style.width = "8px";
    f.style.height = "8px";
    f.style.display = "inline-block";
    f.style.top = t + "px";
    f.style.left = l + "px";
    d.appendChild(f);
}

function errorMsg(msg) {
    var w = msg.length * 7;
    var cd = document.createElement("div");
    cd.style.position = "relative";
    cd.style.display = "inline-block";
    cd.style.width = w + "px";
    cd.style.height = "15px";
    cd.style.overflow = "hidden";
    cd.style.cursor = "pointer";
    cd.style.fontFamily = "Arial";
    cd.style.fontSize = "12px";
    cd.style.color = "#ff0000";
    cd.style.borderColor = "#ffffff";
    cd.style.borderWidth = "1px";
    cd.style.borderStyle = "solid";
    cd.style.backgroundColor = sc_map_var['bgcolor'];
    cd.title = "Supercounters";
    cd.innerHTML = msg;
	 cd.onclick = function() {
            window.location = "//www.supercounters.com/";
        };
    ct_insert(cd, "supercounters.com/map.js");
}
