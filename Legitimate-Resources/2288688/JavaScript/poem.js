// **********************************
// ÇáÑÌÇÁ ÚÏã ÅÒÇáÉ æÕÝ ÇáÍÞæÞ
// Please don't remove the copyright note
// Poem Software by Alawi Hussain Ba3qeel © http://www.rayaheen.net, software@rayaheen.net
// Poem Software          ÊØæíÑ ÇÈæ ÚãÑ        © http://www.bdr130.net, bdr130@bdr130.net
// ( free software )
// **********************************

////////////////////////// set default parameters //////////////////////////

function poem_setDefaultVar() {
  // ÅÐÇ áã íæÌÏ ÇáÎØ ÇáÐí ÍÏÏå ÇáãÓÊÎÏã
  // ÝÅä ÇáÇÊÔ Êí Çã Çá íÎÊÇÑ ÊáÞÇÆíÇ æÇÍÏ ãä ÇáÎØæØ ÇáÊÇáíÉ Úáì ÇáÊÑÊíÈ
  // ÝÅä áã íÌÏ ÇáÃæá ÇäÊÞá Åáì ÇáËÇäí æåßÐÇ
  poemDefaultFont = "simplified arabic,tahoma,ms sans serif,verdana,arial,helvetica";  



  poemType = "0",

  poemAlign = "center",

  poemLine = "0";

  poemUse = "ex";



  poemFontName = "",

  poemFontSize = "4",  // 1 to 7

  poemFontColor = "",

  poemFontBold = "",

  poemFontItalic = "";



  poemBackColor = "none",

  poemBackImage = "none";



  poemBorderStyle = "none",

  poemBorderWidth = "4",

  poemBorderColor = "gray";



  poemSerialNum = "0",

  poemSerialNumColor = "";  



}



//////////////////////////////////////////////////////////////////////////           

  var poemSpaceWidth, poemExtendWidth;

  var poemToolFix, poemPrevHTML, poemMargin, poemPadding;

            

  var poemLetters1 = "ÇÃÅÂÄÁÏÐÑÒæÉì"

  var poemLetters2 = "ÇÃÅÂÄÆÈÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÝÞßáãäåæíÉì";

  var poemLetters3 = "óðõñöòúø";

if(typeof HTMLElement!="undefined" && !
HTMLElement.prototype.insertAdjacentElement){
HTMLElement.prototype.insertAdjacentElement = function
(where,parsedNode)
{
switch (where){
case 'beforeBegin':
this.parentNode.insertBefore(parsedNode,this)
break;
case 'afterBegin':
this.insertBefore(parsedNode,this.firstChild);
break;
case 'beforeEnd':
this.appendChild(parsedNode);
break;
case 'afterEnd':
if (this.nextSibling)
this.parentNode.insertBefore(parsedNode,this.nextSibling);
else this.parentNode.appendChild(parsedNode);
break;
}
}

HTMLElement.prototype.insertAdjacentHTML = function
(where,htmlStr)
{
var r = this.ownerDocument.createRange();
r.setStartBefore(this);
var parsedHTML = r.createContextualFragment(htmlStr);
this.insertAdjacentElement(where,parsedHTML)
}


HTMLElement.prototype.insertAdjacentText = function
(where,txtStr)
{
var parsedText = document.createTextNode(txtStr)
this.insertAdjacentElement(where,parsedText)
}
}

  function create_poemTestWidth_table() {

    if (!document.getElementById("poemtestWidth")) {

      var HTML = "<table border=1 width=1px style='visibility:hidden;position:absolute'>";

      HTML += "<tr><td id='poemTestWidth' width='0px' nowrap></td></tr>";

      HTML += "</table>";

      document.body.insertAdjacentHTML("afterBegin", HTML);

    }

  }



  function poem_getValue(t, p) {

    var r = new RegExp("([ \"]|^)" + t + "[ ]*=[ ]*\"[^\"]*\"", "i");

    var m = p.match(r);    

    if (!m) {

      r = new RegExp("([ \"]|^)" + t + "[ ]*=[ ]*[^\" ]*([ ]|$)", "i");

      m = p.match(r);

      if (!m)          

        return "";

    }

    m = m[0];

    m = m.replace(/\"/gi,"");    

    var i = m.search("=");

    return m.substring(i + 1).replace(/[\(\)\&\[\]\;]/g, "");

  }



  function poem_getDefault(p, d) {

	  var r = ((p)?p:d);

	  return poem_trim(r);

  }

    

  function poem_setArg(arg) {        

    var par, poemFontSize2;



    par = poem_getValue("font", arg) + ",,,,";  //comas = number of arrays - 1

    par = par.split(",");

    poemFontName = poem_getDefault(par[0], poemFontName);

	poemFontName = poemFontName.replace(/\-/g, ",");

    poemFontSize2 = parseInt(poem_getDefault(par[1], poemFontSize));

	if (isNaN(poemFontSize2))

		poemFontSize2 = 0;

	if (poemFontSize2 < 1 || poemFontSize2 > 7)

		poemFontSize2 = poemFontSize;

	poemFontSize = poemFontSize2;



    poemFontColor = poem_getDefault(par[2], poemFontColor);

    poemFontBold = poem_getDefault(par[3], poemFontBold);

    poemFontItalic = poem_getDefault(par[4], poemFontItalic);



    par = poem_getValue("border", arg) + ",,";

    par = par.split(",");

    poemBorderStyle = poem_getDefault(par[0], poemBorderStyle);

    poemBorderWidth = poem_getDefault(par[1], poemBorderWidth);

    poemBorderColor = poem_getDefault(par[2], poemBorderColor);



    par = poem_getValue("num", arg) + ",";	

	par = par.split(",");

    poemSerialNum = poem_getDefault(par[0], poemSerialNum);

	if (!poemSerialNum)

		poemSerialNum = 0;

	else {

		poemSerialNum = parseInt(poemSerialNum);

		if (isNaN(poemSerialNum))

			poemSerialNum = 0;

	}

    poemSerialNumColor = poem_getDefault(par[1], poemSerialNumColor);



    par = poem_getValue("type", arg);

    poemType = poem_getDefault(par, poemType);



    par = poem_getValue("align", arg);

    poemAlign = poem_getDefault(par, poemAlign).toLowerCase();



    par = poem_getValue("line", arg);

    poemLine = poem_getDefault(par, poemLine);

	poemLine = parseInt(poemLine);

	if (isNaN(poemLine))

		poemLine = 0;

	if (poemLine == 0) {

		poemPadding = "5px";

		poemMargin = "";

	} else {

		poemPadding = 15;

		poemMargin = "margin-bottom:" + poemPadding;

	}



    par = poem_getValue("use", arg);

    poemUse = poem_getDefault(par, poemUse).toLowerCase();



    par = poem_getValue("bkcolor", arg);

    poemBackColor = poem_getDefault(par, poemBackColor);



    par = poem_getValue("bkimage", arg);

    poemBackImage = poem_getDefault(par, poemBackImage);



    //////////// set style ///////////

    var facesize = new Array("xx-small","x-small","small","medium","large","x-large","xx-large");

    poemFontSize = facesize[poemFontSize - 1];



    poemFontName += "," + poemDefaultFont;
    if (document.all){
		//
    }else{
        poemTestWidth = document.getElementById('poemTestWidth');
    }

    poemTestWidth.style.fontFamily = poemFontName;

    poemTestWidth.style.fontSize = poemFontSize;

    poemTestWidth.style.fontWeight = poemFontBold;

    poemTestWidth.style.fontStyle = poemFontItalic;



    ///////////////////////////////////

  }

  

  function poem_trim(t) {

    t = t.replace(/^[ ]+/, "");

    t = t.replace(/[ ]+$/, "");

    return t;

  }

  

  function poem_textWidth(t) {

	t = t.replace(/ /g, "&nbsp;");

	t = t.replace(/\^/g, "");

	poemTestWidth.innerHTML= t;	

    return (poemTestWidth.clientWidth - 2) * 0.75;

  }

  

  function poem_strReplace(t, s1, s2, c) {

	if (c <= 0) 

	  return;

    t=t.split(s1);

    var s="";

    for (var i=t.length-1;i>0;i--)

	  if (c-->0)

        s = s2 + t[i] + s;

	  else

		s = s1 + t[i] + s;



	s = t[0] + s;

    return s;

  }

  

  function poem_count(str, ch) {

    var c = 0;

    for (var i = 0; i < str.length; i++)

      c += (str.charAt(i) == ch);

    return c;

  }



  function poem_space(n) {

    if (n == 1)

      return " ";

    return  " " + poem_space(n-1);

  }

  

  function poem_createExtend(t) {

    var alef = "ÇÃÅÂ";

    var s = "";

    var befor = "", ch = "";

    t = t.replace(/Çááå/g,"alh");

	t = t.replace(/ááå/g,"lah");

    for (i = 0; i < t.length; i++) {

      ch = t.charAt(i);

      if (poemLetters2.indexOf(ch.charAt(0)) != -1 || ch.charAt(0) == "Á") {        

        if (befor != "")

          if (poemLetters1.indexOf(befor.charAt(0)) == -1 && poemLetters2.indexOf(ch.charAt(0)) != -1 

            && (befor.charAt(0) != "á" 

            || alef.indexOf(ch.charAt(0)) == -1))

            s += "^";

        befor = ch;

        s += ch;

      }

      else {

        s += ch;

        if (poemLetters3.indexOf(ch.charAt(0)) == -1)

          befor = "";

      }        

    }

    s = s.replace(/alh/g,"Çááå");

	s = s.replace(/lah/g,"ááå");

    return s;

  }

  

  function poem_extend(n) {

	if (n <= 0)

      return ""; 

    if (n == 1)

      return "Ü";

    return  "Ü" + poem_extend(n-1);

  } 



  function poem_justifyBYextend(t, w) {

    var ex = 0, i, d, n, p, m;

    ex = poem_count(t, "^");

    if (ex == 0) return t;

    d = Math.floor((w - poem_textWidth(t.replace(/\^/g,""))) / poemExtendWidth);      

    t = t.split(" ");

    n = 0;

    for (i = 0; i < t.length; i++)      

      n += (t[i].indexOf("^") != -1);

    p = Math.floor(d / n);

    m = d % n;

    for (i = t.length-1; i >= 0; i--) {    

      ex = poem_count(t[i], "^");

      if (ex == 0)

        continue;

      d = p + (m-- > 0);

      n = Math.floor(d / ex);      

      if (n > 0)

        t[i] = t[i].replace(/\^/g, "^" + poem_extend(n));

      if (d % ex > 0)

        t[i] = poem_strReplace(t[i], "^", "Ü", d % ex);

    }

    t = t.join(" ");

    t = t.replace(/\^/g, ""); 

    return t;

  }

  

  function poem_justifyBYspace(t, w, dir) {

    var sp = 0, i, d, tw, n;

    sp = poem_count(t, " ");

    if (sp != 0) {

      d = Math.floor((w - poem_textWidth(t)) / poemSpaceWidth);

      n = Math.floor(d / sp);

      if (n > 0)

        t = t.replace(/ /g, poem_space(n + 1));

      if (d % sp > 0)

        t = poem_strReplace(t, poem_space(n + 1), poem_space(n + 2), d % sp);

    }

    tw = w - poem_textWidth(t);

    if (tw > 0) {

      i = t.lastIndexOf(" ");

      if (i == -1)

        if (dir == 0)

          return t;

        else

          i = ((dir==2)?-1:t.length-1);	  

    } else

		tw = 0;

	t = t.substr(0, i+1) + poemToolFix.replace(/%w%/,tw + "pt") + t.substr(i+1);

    return t; 

  }

  

  function poem_justify(t, w, dir) {

    if (poemUse == "ex") t = poem_justifyBYextend(t, w);    

    return poem_justifyBYspace(t, w, dir);

  }



  function showPoemLine(preview, html) {

	if (preview)

		poemPrevHTML += html;

	else

		document.write(html);

  }

  

  function doPoem(preview) {

	var found = 0, div;

	poem_setDefaultVar();

	if (preview) {

		div = poemExample;		

		poemPrevHTML = "";

	}

	else {

		var d = document.getElementsByTagName("div");

		div = d[d.length -1];		

	}

	var poem = div.innerHTML.replace(/<br \/>|<br>/gi, "\r");

	if (poem == "")

		return;

	if (!div.tag)

		div.tag = "";

	if (!preview)

		div.innerHTML = "";	

	var arg = div.tag.replace(/\\\"/g, "'");		

	

	create_poemTestWidth_table(); 



	poem_setArg(arg);

	

	poemToolFix = "<span style='font-size:1pt;padding-right:%w%;'></span>";

    poemToolFix = poemToolFix.replace(/ /g,"^");



	poem = poem.replace(/</g, "&lt;");

	poem = poem.replace(/>/g, "&gt;");	

	poem = poem.replace(/[\^]|^[\r]+|[\r]+$|\n/g, "");

	poem = poem.replace(/^[ ]+|[ ]+$|/g, "");

	poem = poem.replace(/[Ü]+( |$)/g, "ext1");

	poem = poem.replace(/(^| )[Ü]+/g, "ext2");

	poem = poem.replace(/Ü/g, "");

	poem = poem.replace(/ext1/g, "Ü");

	poem = poem.replace(/ext2/g, "Ü");

    poem = poem.replace(/[ ]+/g, " ");

	poem = poem.replace(/[ ]*=[ ]*/g, "=");

	poem = poem.replace(/[ ]+\r|\r[ ]+/g, "\r");	

	

	if (poem.substring(poem.length-1) != "\r") poem += "\r";



	poemExtendWidth = poem_textWidth("Ô" + "ÜÜ" + "Ô");

    poemExtendWidth -= poem_textWidth("Ô" + "Ü" + "Ô");

    poemSpaceWidth = poem_textWidth("Ô" + "&nbsp;&nbsp;" + "Ô");

    poemSpaceWidth -= poem_textWidth("Ô" + "&nbsp;" + "Ô");



	var tmp, MTW, MTW1;	

	

	tmp = "\r" + poem + "\r";

	tmp = tmp.replace(/\r[^\r]+\=[^\r]+/gi,"");

	tmp = tmp.replace(/\r/g,"<br>");

	var MTW1 = poem_textWidth(tmp);



	tmp = "\r" + poem + "\r";

	tmp = tmp.replace(/\r[^=]+\r/gi,"\r");	

	tmp = tmp.replace(/=/g,"<br>");

	tmp = tmp.replace(/\r/g,"<br>");

	var MTW = poem_textWidth(tmp);

	tmp = "";



	if (poemUse=="ex") {

	  var test = poem_textWidth(poem);

	  poem = poem_createExtend(poem);

      test = (poem_textWidth(poem.replace(/\^/g, "Ü")) - test) / poem_count(poem,"^");

	  //if (test != poemExtendWidth) //problem in some fonts

		//poem = poem.replace(/\^/g, "^Ü");

    }



// *************

    var poemBodyStyle = "", fonts = "";

	fonts += ";font-family:" + poemFontName;

    fonts += ";font-size:" + poemFontSize;

    fonts += ";color:" + poemFontColor;

    fonts += ";font-weight:" + poemFontBold;

    fonts += ";font-style:" + poemFontItalic;

	poemBodyStyle += fonts;

    poemBodyStyle += ";background-color:" + poemBackColor; 

    poemBodyStyle += ";background-image:url(" + poemBackImage + ")";

	poemBodyStyle += ";border:" + poemBorderWidth + "px " + poemBorderStyle + " " + poemBorderColor; 

	

	showPoemLine(preview, "<div align='" + poemAlign + "'>");

    showPoemLine(preview, "<table dir='rtl' border='0' cellpadding='0' cellspacing='0' width='1px' style='" + poemBodyStyle + ";'>");

// *************	

	poem = "\r" + poem;



	var L, R, i, j = 0, cr = 0, sn = 0;

	var poemSide, poemSideNum, wnum;

	if (poemSerialNum > 0)

		sn = poemSerialNum - 1;	

    while (1) {

   	  poemSideNum = "";

      poemSide = "";

	  if (sn == 0)

		poemSide = "<div style='height:" + poemPadding + "px;font-size:1'></div>";

      cr = poem.indexOf("\r", cr);

	  if (cr == -1) break;	  

      if (poem.substring(j, cr) != "") {

        i = poem.indexOf("=", j);

        if (i == -1 || i > cr) i = cr; //no '=' in this line

		

        L = poem.substring(j, i);

		if (L != "\r" && L != "") {

			if (i != cr)

				L = poem_justify(L, MTW, 1);

			else {

				L = poem_justify(L, MTW1, 0);

			}

			L = L.replace(/ /g, "&nbsp;");

			L = L.replace(/\^/g, " ");

		}



		R = poem.substring(i + 1, cr);

		if (R != "\r" && R != "") {

			R = poem_justify(R, MTW, 2);

			R = R.replace(/ /g, "&nbsp;");

			R = R.replace(/\^/g, " ");

		}



		if (poemType == 0) {

		  if (i != cr) {

			  if (L != "" && R == "")

				poemSide = L;

			  else if (L == "" && R != "")

				poemSide = R;

			  else if (L != "" && R != "")

				poemSide = L + poemToolFix.replace(/%w%/, Math.floor(MTW / 2.1) + "px").replace(/\^/, " ") + R;

		  } else

			    poemSide = L;



		  poemSide = "<div align=center style='" + fonts + ";" + poemMargin +"'>" + poemSide + "</div>";

		  

		  poemSideNum = ++sn;

		}

		else if (poemType == 1) {

			if (i == cr) {

				poemSide = "<div align=center style='" + fonts + ";" + poemMargin +"'>" + L + "</div>";

			} else {

				poemSide = "<div align='right' style='" + fonts + "; margin-left:" + Math.round(MTW) + "pt;" + poemMargin + "'>" + L + "</div>";

				poemSide += "<div align='left' style='" + fonts + "; margin-right:" + Math.round(MTW) + "pt;" + poemMargin + "'>" + R + "</div>";

			}

			poemSideNum = ++sn;

		}

		else if (poemType == 2 || poemType > 3 || poemType < 1) {

			if (i == cr) {

				poemSide = "<div align=center style='" + fonts + ";" + poemMargin +"'>" + L + "</div>";

			} else {

				poemSide = "<div align='right' style='" + fonts + "; margin-left:" + Math.round(MTW/2) + "pt;" + poemMargin + "'>" + L + "</div>";

				poemSide += "<div align='left' style='" + fonts + "; margin-right:" + Math.round(MTW/2) + "pt;" + poemMargin + "'>" + R + "</div>";

			}

			poemSideNum = ++sn;

		}

		else if (poemType == 3) {

		  poemSideNum = ++sn;

		  poemSide = "<div style='" + fonts + ";" + poemMargin + "'>" + L + "</div>";

  		  poemSide += "<div style='" + fonts + ";" + poemMargin + "'>" + R + "</div>";

		}        

	  }

	  if (poemSerialNum > 0 && poemSideNum != "")

		  showPoemLine(preview, "<tr><td align=left valign=top style='" + fonts + "; color:" + poemSerialNumColor + "' nowrap>&nbsp;&nbsp;" + poemSideNum + "</td>");

	  showPoemLine(preview, "<td align=center valign=middle style='" + fonts + ";padding-left:15px;padding-right:15px;' nowrap>" + poemSide + "</td></tr>");

	  cr += 1;

	  j = cr;

    }

	if (poemLine == 0) {

		poemSide = "<div style='height:" + poemPadding + "px;font-size:1'></div>";		

		if (poemSerialNum > 0 && poemSideNum != "")

		  showPoemLine(preview, "<tr><td align=left valign=top style='" + fonts + "; color:" + poemSerialNumColor + "' nowrap>&nbsp;&nbsp;" + poemSideNum + "</td>");

		showPoemLine(preview, "<td align=center valign=middle style='" + fonts + ";padding-left:15px;padding-right:15px;' nowrap>" + poemSide + "</td></tr>");

	}



    showPoemLine(preview, "</table></div>");



	if (preview)

		poemPreview.innerHTML = poemPrevHTML;

	poemPrevHTML = "";



	// *******************************************



	poem_textWidth("");

  } 