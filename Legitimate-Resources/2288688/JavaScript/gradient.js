function gradient_gradient_browser() {
	gradient_browser = "unknown";
	gradient_version = 0;
	if (navigator.userAgent.indexOf("Opera") >= 0)
	 gradient_browser = "opera";
	else if (navigator.userAgent.indexOf("obot") >= 0)
	 gradient_browser = "robot";
	else if (navigator.appName.indexOf("etscape") >= 0)
	 gradient_browser = "netscape";
	else if (navigator.appName.indexOf("icrosoft") >= 0)
	 gradient_browser = "msie";
	gradient_version = parseFloat(navigator.appVersion);
	if (isNaN(gradient_version)) gradient_version = 0;
	if ((gradient_browser == "msie")&&(gradient_version == 2)) gradient_version = 3;
	gradient_tohex = new Array(256);
	var hex = "0123456789ABCDEF";
	var count = 0;
	for (var x=0; x<16; x++) {
	 for (var y=0; y<16; y++) {
		gradient_tohex[count] = hex.charAt(x) + hex.charAt(y);
		count++;
	 }
	}
}

function ColorCode(hexcode) {
  if (hexcode.length == 7) {
    this.gradient_r = parseInt(hexcode.substring(1,3),16);
    this.gradient_g = parseInt(hexcode.substring(3,5),16);
    this.gradient_b = parseInt(hexcode.substring(5,7),16);
  }
  else if (hexcode.length == 6) {
    this.gradient_r = parseInt(hexcode.substring(0,2),16);
    this.gradient_g = parseInt(hexcode.substring(2,4),16);
    this.gradient_b = parseInt(hexcode.substring(4,6),16);
  }
  else {
    this.gradient_r = this.gradient_g = this.gradient_b = 0;
  }
}

function ColorList(hexcodes) {
  var i = 0;
  var c = 0;
  this.gradient_codes = new Array(Math.round(hexcodes.length/7));
  while (i < hexcodes.length) {
    if (isNaN(parseInt(hexcodes.substring(i,i+6),16))) ++i;
    else {
      this.gradient_codes[c] = new ColorCode(hexcodes.substring(i,i+6));
      i += 7;
      ++c;
    }
  }
  this.len = c;
}

function interpolate (x1, y1, x3, y3, x2) {
  if (x3 == x1) return y1
  else return (x2-x1)*(y3-y1)/(x3-x1) + y1
}

function lowcolorindex (x, y, z) {
  if (y == 1) return 0
  else return Math.floor( (x*(z-1))/(y-1) )
}

function hicolorindex (x, y, z, low) {
  if ( low*(y-1) == x*(z-1) ) return low
  else if (y == 1) return 0
  else return Math.floor( (x*(z-1))/(y-1) + 1 )
}

function drawGradient() {
	var found = 0;
	var d = document.getElementsByTagName("DIV");
	for (var i = d.length - 1; i >= 0; i--) {
		if (d[i].id == "mygradient") {
			d[i].id = "";
			div = d[i];
			found = 1;
			break;
		}
	}
	if (found == 0) return;
	clr = div.title;
	clr = clr.replace(/\#/g, "");
	clr = clr.replace(/[ ]+/g, " ");
	clr += "      ";
	clr = clr.split(" ");
	gradient_gradient_browser();
	gradient_thecolors = "#" + clr[0].substr(0,6);
	gradient_thecolors += "#" + clr[1].substr(0,6);
	gradient_thecolors += "#" + clr[2].substr(0,6);
	gradient_thecolors += "#" + clr[3].substr(0,6);
	gradient_thecolors += "#" + clr[4].substr(0,6);

	var gradient_html = "";
	if (((gradient_browser == "netscape")||(gradient_browser == "msie")||(gradient_browser == "opera"))&&(gradient_version>=3.0)) {

		var colors = new ColorList(gradient_thecolors);
		if (colors.len < 2) {
			div.style.display = "block";
			return;
		}
		var numcolors = colors.len;
        if(document.all){
            var numchars = div.innerText.replace(/[\n\r\t ]/g, "").length;
        } else{
            var numchars = div.textContent.replace(/[\n\r\t ]/g, "").length;
        }
		var rr = 0;
		var gg = 0;
		var bb = 0;
		var lci = 0; //lower color index
		var hci = 0; //high color index
		var chr, p = 0;
		for (i = 0; p < numchars; ++i) {
            if(document.all){
                chr = div.innerText.charAt(i);
            } else{
                chr = div.textContent.charAt(i);
            }
			if (" \r\n\t".indexOf(chr) != -1) {
				gradient_html += chr;
			} else {
				lci = lowcolorindex(p, numchars, numcolors);
				hci = hicolorindex(p, numchars, numcolors, lci);
				rr = Math.round(interpolate( lci/(numcolors-1), colors.gradient_codes[lci].gradient_r, hci/(numcolors-1), colors.gradient_codes[hci].gradient_r, p/(numchars-1)));
				gg = Math.round(interpolate( lci/(numcolors-1), colors.gradient_codes[lci].gradient_g, hci/(numcolors-1), colors.gradient_codes[hci].gradient_g, p/(numchars-1)));
				bb = Math.round(interpolate( lci/(numcolors-1), colors.gradient_codes[lci].gradient_b, hci/(numcolors-1), colors.gradient_codes[hci].gradient_b, p/(numchars-1)));
				if (gradient_browser == "opera") {
					rr = 255 - rr;
					gg = 255 - gg;
					bb = 255 - bb;
				}
				gradient_html += chr.fontcolor('#'+gradient_tohex[rr]+gradient_tohex[gg]+gradient_tohex[bb]);
				p++;
			}
		}
	} else
        if(document.all){
            gradient_html += div.innerText;
        } else{
            gradient_html += div.textContent;
        }
	div.innerHTML = gradient_html.replace(/\r/gi, "<br>");
	gradient_html = "";
	div.style.display = "block";
}
// ******************* [glint] code ******************* //
setInterval("doGlintText()", 50);
document.write('<div tag="dummy" id="myglinttext" style="display:none;filter:alpha(opacity=100);width:100%"></div>');
function doGlintText() {
	try {
		var a, d;
		for (var i = 0; i < myglinttext.length; i++) {
			if (myglinttext[i].tag == "dummy")
				continue;			
			a = parseInt(myglinttext[i].filters.alpha.opacity);
			d = parseInt(myglinttext[i].tag);			
			if (d == 1 || d == -1)	{
				a += d * 5;
				if (a <= 0) {				
					myglinttext[i].tag = "1";
				} if (a >= 100) {
					myglinttext[i].tag = "2";
				}
				myglinttext[i].filters.alpha.opacity = a;
			} else if (d >= 10)
				myglinttext[i].tag = -1;
			else
				myglinttext[i].tag = ++d;
		}
	} catch(e) {
	;
	}
}

// ******************* [blink] code ******************* //
setInterval("doBlinkText()", 500);
document.write('<span id="myblinktext" style="display:none"></span>');
function doBlinkText() {
	try {
		for (var i = 1; i < myblinktext.length; i++)
			if (myblinktext[i].style.visibility == "hidden")
				myblinktext[i].style.visibility = "visible";
			else
				myblinktext[i].style.visibility = "hidden";
	} catch(e) {
	;
	}
}