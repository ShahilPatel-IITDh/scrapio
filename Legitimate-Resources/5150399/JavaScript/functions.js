function findPosX(obj)
{
	var curleft = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curleft += obj.offsetLeft;
			obj = obj.offsetParent;
		}
	}
	else if (obj.x)
		curleft += obj.x;
	return curleft;
}

function findPosY(obj)
{
	var curtop = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curtop += obj.offsetTop;
			obj = obj.offsetParent;
		}
	}
	else if (obj.y)
		curtop += obj.y;
	return curtop;
}

function showStats(p_oObj, p_oEvent)
{
	if (!p_oEvent)
		p_oEvent = window.event;

	if (!p_oEvent)
	{
		alert("No event to get :\\");
		return;
	}
	var posx = 0;
	var posy = 0;

	if (p_oEvent.pageX || p_oEvent.pageY)
	{
		// moz, opera, ...
		posx = p_oEvent.pageX;
		posy = p_oEvent.pageY;
	}
	else if (p_oEvent.clientX || p_oEvent.clientY)
	{
		// ie
		var top = 0;
		var left = 0;
		if (document.documentElement && document.documentElement.scrollTop && document.documentElement.scrollTop != 0) {
			top = document.documentElement.scrollTop;
			left = document.documentElement.scrollLeft;
		}

		if (document.body && document.body.scrollTop && document.body.scrollTop!=0) {
			top = document.body.scrollTop;
			left = document.body.scrollLeft;
		}
		posx = p_oEvent.clientX + left;
		posy = p_oEvent.clientY + top;
	}
	// posx and posy contain the mouse position relative to the document
	// Do something with this information
	posx = posx - findPosX(p_oObj);
	posy = posy - findPosY(p_oObj);

	if (document.mapform.record && document.mapform.record.checked)
	{
		recordClickZentral(posx, posy);
		return;
	}
	scale = parseFloat(document.mapform.scale.value);
	posx = Math.round(parseInt(document.mapform.cx.value) + ((posx - 400) / scale));
	posy = Math.round(parseInt(document.mapform.cy.value) + ((posy - 300) / scale));
	if (!g_oRequest) { // ajax ready?
		return true;
	}
	var url = "/_remote_map.php?l="+document.mapform.l.value+"&cx="+posx+"&cy="+posy+"&scale="+document.mapform.scale.value+"&elements="+document.mapform.melements.value+collectUriParams();
	einblenden();
	window.setTimeout("ajax('"+url+"')", 20);
}
function changerad(object) {
	if (!object || !g_oRequest) { // ajax ready?
		return true;
	}
	var rad = object.value;
	var url = "/_remote_map.php?crad="+rad+"&l="+document.mapform.l.value+"&cx="+document.mapform.cx.value+"&cy="+document.mapform.cy.value+"&scale="+document.mapform.scale.value+"&elements="+document.mapform.melements.value+collectUriParams();
	einblenden();
	window.setTimeout("ajax('"+url+"')", 20);
}
function changepoi(object) {
	if (!object || !g_oRequest) { // ajax ready?
		return true;
	}
	var t = object.value;
	var url = "/_remote_map.php?poit="+t+"&l="+document.mapform.l.value+"&cx="+document.mapform.cx.value+"&cy="+document.mapform.cy.value+"&scale="+document.mapform.scale.value+"&elements="+document.mapform.melements.value+collectUriParams();
	einblenden();
	window.setTimeout("ajax('"+url+"')", 20);
}
function changepoiz(object) {
	if (!object || !g_oRequest) { // ajax ready?
		return true;
	}
	var t = object.value;
	var url = "/_remote_map.php?poiz="+escape(t)+"&l="+document.mapform.l.value+"&cx="+document.mapform.cx.value+"&cy="+document.mapform.cy.value+"&scale="+document.mapform.scale.value+"&elements="+document.mapform.melements.value+collectUriParams();
	einblenden();
	window.setTimeout("ajax('"+url+"')", 20);
}
function clabel(object) {
	if (!object || !g_oRequest) { // ajax ready?
		return true;
	}
	var s = object.value;
	var url = "/_remote_map.php?clabel="+escape(s)+"&l="+document.mapform.l.value+"&cx="+document.mapform.cx.value+"&cy="+document.mapform.cy.value+"&scale="+document.mapform.scale.value+"&elements="+document.mapform.melements.value+collectUriParams();
	einblenden();
	window.setTimeout("ajax('"+url+"')", 20);
}
function mapclear() {
	document.mapform.coord.value='';
	var url = "/_remote_map.php?clear=1&l="+document.mapform.l.value+"&cx="+document.mapform.cx.value+"&cy="+document.mapform.cy.value+"&scale="+document.mapform.scale.value+"&elements="+document.mapform.melements.value+collectUriParams();
	einblenden();
	window.setTimeout("ajax('"+url+"')", 20);
}
function collectUriParams() {
	var parameter = '';
	if (document.mapform.what)
		parameter += "&what="+document.mapform.what.value;
	if (document.mapform.editid)
		parameter += "&editid="+document.mapform.editid.value;
	if (document.mapform.sid)
		parameter += "&sid="+document.mapform.sid.value;
	return parameter;
}
function translateX(wert) {
	return Math.round(parseInt(document.mapform.cx.value) + ((wert / parseFloat(document.mapform.scale.value)) - (400 / parseFloat(document.mapform.scale.value))));
}
function translateY(wert) {
	return Math.round(parseInt(document.mapform.cy.value) + ((wert / parseFloat(document.mapform.scale.value)) - (300 / parseFloat(document.mapform.scale.value))));
}
function recordClickZentral(x, y) {
	recordClick(x, y);
	if (!g_oRequest) { // ajax ready?
		return true;
	}
	var scale = parseFloat(document.mapform.scale.value);
	var posx = translateX(x);
	var posy = translateY(y);
	var rad = "";
	if (document.mapform.radius)
		rad = "&rad="+document.mapform.radius.value;
	var url = "/_remote_map.php?addx="+posx+"&addy="+posy+rad+"&l="+document.mapform.l.value+"&cx="+document.mapform.cx.value+"&cy="+document.mapform.cy.value+"&scale="+document.mapform.scale.value+"&elements="+document.mapform.melements.value+collectUriParams();
	einblenden();
	window.setTimeout("ajax('"+url+"')", 20);
}

function afterMap() {
	if (g_oRequest && g_oRequest.readyState == 4) {
		if (g_oRequest.status == 200) {
			try {
				var a = new Array();
			 	eval("a = " + g_oRequest.responseText);
				var d = document.getElementById('mappic');
			 	if (d && a['file']) {
			 		d.src = a['file'];
			 		window.setTimeout("testMap()", 50);
			 	}
			 	if (a['cx'])
			 		document.mapform.cx.value = a['cx'];
			 	if (a['cy'])
			 		document.mapform.cy.value = a['cy'];
			 	if (a['scale']) {
			 		var s = document.getElementById('zoom_sel');
			 		for (var i = 0; i < s.length; i++) {
			 			if (s.options[i].value == a['scale'])
			 				break;
			 		}
			 		s.selectedIndex = i;
			 		document.mapform.scale.value = a['scale'];
			 		toggleButtons(a['scale']);
			 	}
			 	var map = document.getElementById('Mapname');
			 	if (map) {
			 		map.innerHTML = (a['map']?a['map']:'');
			 	}
			} catch (exc) {
				alert(exc);
			}
		}
	}
}
function testMap() {
	var d = document.getElementById('mappic');
	if (d) {
		if (d.complete)
			ausblenden();
		else
			window.setTimeout("testMap()", 100);
	}
	else
		ausblenden();
}
function toggleButtons(scale) {
	var i = document.getElementById("zoom_in");
	var o = document.getElementById("zoom_out");
	if (scale > 1.9) {
		if (i) {
			i.src='pics/map_button_plus_off.png';
		}
	}
	else {
		if (i) {
			i.src='pics/map_button_plus.png';
		}
	}
	if (scale < 0.2) {
		if (o) {
			o.src='pics/map_button_minus_off.png';
		}
	}
	else {
		if (o) {
			o.src='pics/map_button_minus.png';
		}
	}
}
function delta(x, y)
{
	if (document.mapform.record && document.mapform.record.checked)
		return;
	scale = parseFloat(document.mapform.scale.value);
	posx = parseInt(document.mapform.cx.value) + (x * 800 / scale);
	posy = parseInt(document.mapform.cy.value) + (y * 600 / scale);

	if (!g_oRequest) { // ajax ready?
		return true;
	}
	var url = "/_remote_map.php?l="+document.mapform.l.value+"&cx="+posx+"&cy="+posy+"&scale="+document.mapform.scale.value+"&elements="+document.mapform.melements.value+collectUriParams();
	einblenden();
	window.setTimeout("ajax('"+url+"')", 20);
}

function zoom(delta)
{
	if (document.mapform.record && document.mapform.record.checked)
		return;
	var s = (parseFloat(document.mapform.scale.value)) + (0.2 * delta);

	if (s < 0.1 || s > 2.0 || !g_oRequest) { // ajax ready?
		return;
	}
	var url = "/_remote_map.php?l="+document.mapform.l.value+"&cx="+document.mapform.cx.value+"&cy="+document.mapform.cy.value+"&scale="+s+"&elements="+document.mapform.melements.value+collectUriParams();
	einblenden();
	window.setTimeout("ajax('"+url+"')", 20);
}
function ajax(url) {
	g_oRequest.open("POST", url, true);
	g_oRequest.onreadystatechange = afterMap;
	g_oRequest.send(null);
	return;
}
function addNew()
{
	window.location.href = 'http://wow.freierbund.de/index.php?pID=15&etype='+document.mapform.donew.value+"&l="+document.mapform.l.value+"&cx="+document.mapform.cx.value+"&cy="+document.mapform.cy.value+"&scale="+document.mapform.scale.value+"&pr="+document.mapform.melements.value+"#ec";
}

function doEdit(p_nId, p_nType) {
	var s = 'http://wow.freierbund.de/index.php?pID=15&etype='+p_nType+"&editid="+p_nId+"&l="+document.mapform.l.value+"&cx="+document.mapform.cx.value+"&cy="+document.mapform.cy.value+"&scale="+document.mapform.scale.value+"#ec";
	window.location.href = s;
}

function doCopy(p_nId, p_nType)
{
	window.location.href = 'http://wow.freierbund.de/index.php?pID=15&etype='+p_nType+"&editid="+p_nId+"&l="+document.mapform.l.value+"&cx="+document.mapform.cx.value+"&cy="+document.mapform.cy.value+"&scale="+document.mapform.scale.value+"&kopie=1#ec";
}

function doDelete(p_nId)
{
	if (confirm("Wollt Ihr diesen Eintrag wirklich löschen?\nDiese Aktion kann nicht rückgängig gemacht werden!"))
		window.location.href = 'http://wow.freierbund.de/index.php?pID=14&delete='+p_nId;
	return false;
}
function einblenden() {
	var x = document.getElementById('mappicwait_map');
	x.style.display='block';
}
function ausblenden() {
	var x = document.getElementById('mappicwait_map');
	x.style.display='none';
}
function change_zoom_sel()
{
	if (!g_oRequest) { // ajax ready?
		return true;
	}
	einblenden();
	var url = "/_remote_map.php?l="+document.mapform.l.value+"&cx="+document.mapform.cx.value+"&cy="+document.mapform.cy.value+"&scale="+document.mapform.zoom_sel.value+"&elements="+document.mapform.melements.value+collectUriParams();
	einblenden();
	window.setTimeout("ajax('"+url+"')", 20);
}

// IE7 und FF1/2 Scuzeile mit M&G füttern
function searchAdd()
{
    try {
        window.external.AddSearchProvider("http://wow.freierbund.de/map_n_guide_search.xml");
    }
    catch (ex)
    {
        try
        {
            window.sidebar.addSearchEngine("http://wow.freierbund.de/map_n_guide_search.src",
                "http://wow.freierbund.de/map_n_guide_search.png",
                "Freier Bund: Map & Guide",
                "World of Warcraft");
        }
        catch (ex2)
        {
            alert("Verzeiht, aber das Hinzufügen unserer Suchmaschine funktioniert in dem von Euch verwendeten Browser leider nicht.\nBisher wird dieser Mechanismus vom Firefox (1.x, 2.x) und IE7 unterstützt.");
        }
    }
}

function showmap(p_sVal) {
	var d = document.getElementById('mappic');
	if (d) {
		d.src = p_sVal;
	}
}

function toggle(id) {
	var el = document.getElementById(id);
	if (el) {
        if (el.style.display != 'none') {
            el.style.display = 'none';
        }
        else {
            el.style.display = null;
	    }
    }
}

function toggle2(id, pel) {
	var el = document.getElementById(id);
	if (el) {
        if (el.style.display != 'none') {
            el.style.display = 'none';
            if (pel) {
                pel.className = 'morelinkshidden';
            }
        }
        else {
            el.style.display = null;
            if (pel) {
                pel.className = 'morelinks';
            }
	    }
    }
}

function onover(id) {
	var d = document.getElementById('mappic');
	if (d) {
		// sind wir schon mit einem Element versehen?
		// 0_3_0_2_0-0.42863
		var x = d.src.replace(/\.jpeg/, "-" + id + ".jpeg");
		if (d.src.match(/.*\/\d+_\d+_\d+_\d+_\d+-\d+-\d+.*/))
			x = d.src.replace(/\.jpeg/, "." + id + ".jpeg");
		d.src = x.replace(/jpegs/, "jpeg");
	}
}

function onout(id) {
	var d = document.getElementById('mappic');
	if (d) {
		d.src = d.src.replace("." + id, "").replace("-" + id, "");
	}
}

function backend(keyval, type) {
	if (!g_oRequest) { // ajax ready?
		return true;
	}
	if (keyval) {
        var url = "";
        if (type == "quest") {
            url = "/_remote_request_entry_" + type + ".php?" + (keyval) + '&amp;t=' + Math.floor(Math.random()*1000);
        }
        else {
            url = "/_remote_request_entry_general.php?" + (keyval) + '&f=' + type + '&t=' + Math.floor(Math.random()*1000);
        }
        g_oRequest.open("POST", url, true);
        g_oRequest.onreadystatechange = updateFrontend;
        g_oRequest.send(null);
	}
}

function updateTranslation() {
    if (g_oRequest && g_oRequest.readyState == 4) {
        if (g_oRequest.status == 200) {
            try {
                document.getElementById('ax').innerHtml = "";
                eval("var a = " + g_oRequest.responseText);
                var ax = document.getElementById('ax');
                ax.style.display = 'none';
                if (a['n'] && a['n'] > 0) {
                    ax.innerHTML = a['s'];
                    ax.style.display = 'block';
                    return;
                }
                setElemWert(document.mapform.cname, a['name']);
                setElemWert(document.mapform.coname, a['orig']);
                setElemWert(document.mapform.level, a['stufe']);
                setElemWert(document.mapform.stufe, a['stufe']);
                setElemWert(document.mapform.mlevel_min, a['stufe']);
                setElemWert(document.mapform.mlevel_max, a['stufe']);
                setElemWert(document.mapform.category, a['beschreibung']);
                setElemWert(document.mapform.czone, a['ursprung']);
                setElemWert(document.mapform.bid, a['id']);
            } catch (exc) {
                //
            }
            return a;
        }
    }
}

function setElemWert(elem, wert) {
	if (elem && wert && wert != '') {
		elem.value = wert;
	}
}

function replaceChars(p_oObj) {
    // die dummen Sonderzeichen ...
    p_oObj.value = p_oObj.value.replace(/ÃŸ/g, 'ß');
    p_oObj.value = p_oObj.value.replace(/Ã„/g, 'Ä');
    p_oObj.value = p_oObj.value.replace(/Ã /g, 'á');
    p_oObj.value = p_oObj.value.replace(/Ãœ/g, 'Ü');
    p_oObj.value = p_oObj.value.replace(/Ã¤/g, 'ä');
    p_oObj.value = p_oObj.value.replace(/Ã„/g, 'Ä');
    p_oObj.value = p_oObj.value.replace(/Ã¶/g, 'ö');
    p_oObj.value = p_oObj.value.replace(/Ã¼/g, 'ü');
    p_oObj.value = p_oObj.value.replace(/Ãœ/g, 'Ü');
    p_oObj.value = p_oObj.value.replace(/Ã–/g, 'Ö');
    p_oObj.value = p_oObj.value.replace(/€™/g, '\'');
    p_oObj.value = p_oObj.value.replace(/\$b\$b/ig, "\n\n");
    p_oObj.value = p_oObj.value.replace(/\\n/g, '\n');
    p_oObj.value = p_oObj.value.replace(/$C/ig, '<Klassenname>');
    p_oObj.value = p_oObj.value.replace(/$N/ig, '<Name>');
    p_oObj.value = p_oObj.value.replace(/$R/ig, '<Rassenname>');
    p_oObj.value = p_oObj.value.replace(/$g(.+):(.+);/ig, '<$1/$2>');
}

