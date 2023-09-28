function inicializace() {
	Lightbox.inicializace();
}

// if the browser can deal with DOM, call the function onload		
if(document.getElementById && document.createTextNode) {
	window.onload = inicializace;
}

document.getElementsByClassName = function(strClassName)
{
  var arrElements = (document.all ? document.all : document.getElementsByTagName('*'));
  var arrReturnElements = new Array();
  strClassName = strClassName.replace(/\-/g, "\\-");
  var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
  var oElement;
  for(var i=0; i<arrElements.length; i++){
      oElement = arrElements[i];      
      if(oRegExp.test(oElement.className)){
          arrReturnElements.push(oElement);
      }   
  }
  return (arrReturnElements)
}

function Forma(obr,nahled) {
  var lft = "";
  var rgt = "";
  lft = "[obr:"+obr+"]";
  rgt = "[/obr:"+nahled+"]";
  if (document.all)
  {
    IEWrap(lft, rgt);
  }
	else if (document.getElementById)
  {
    MozWrap(document.getElementById("text"), lft, rgt);
  }
}

function Format(typ,jmeno) {
  var lft = "";
  var rgt = "";
  lft = "[obrazek:"+jmeno+"]";
  rgt = "[/obrazek]";
  if (document.all)
  {
    IEWrap(lft, rgt);
  }
	else if (document.getElementById)
  {
    MozWrap(document.getElementById("text"), lft, rgt);
  }
}

function Formatovani(typ)
{
  var lft = "";
  var rgt = "";

  switch (typ)
  {
    case "nadpis1":
      lft = "[nadpis]";
      rgt = "[/nadpis]\n";
      break;
    case "podnadpis":
      lft = "[podnadpis]";
      rgt = "[/podnadpis]\n";
      break;
    case "podnadpisc":
      lft = "[podnadpisc]";
      rgt = "[/podnadpisc]\n";
      break;
    case "kurziva":
      lft = "[i]";
      rgt = "[/i]";
      break;
    case "b":
      lft = "[b]";
      rgt = "[/b]";
      break;
    case "i":
      lft = "[i]";
      rgt = "[/i]";
      break;
    case "code":
      lft = "[code]";
      rgt = "[/code]";
      break;
    case "u":
      lft = "[u]";
      rgt = "[/u]";
      break;
    case "url":
      var popisek = prompt("Zadejte www adresu:");
      if (!popisek)
      {
        lft = "[url]";
        rgt = "[/url]";
      }
      else
      {
        lft = "[url:" + popisek + "]";
        rgt = "[/url]";
      }
      break;
    case "vysvetleni":
      var popisek = prompt("Napiště vysvětlení textu:");
      if (!popisek)
      {
        lft = "[info]";
        rgt = "[/info]";
      }
      else
      {
        lft = "[info:" + popisek + "]";
        rgt = "[/info]";
      }
      break;
    case "obrazek":
      var nazev = prompt("Zadejte název souboru:");
      var popisek = prompt("Zadejte popis obrázku:");
      if (nazev && popisek)
      {
        lft = "[obrazek:"+nazev+"]"+popisek;
        rgt = "[/obrazek]";
      }
      else
      {
        lft = "";
        rgt = "";
      }
      break;
    case "obrazeks":
      var nazev = prompt("Zadejte název souboru:");
      var popisek = prompt("Zadejte popis obrázku:");
      if (nazev && popisek)
      {
        lft = "[obrazeks:"+nazev+"]"+popisek;
        rgt = "[/obrazeks]";
      }
      else
      {
        lft = "";
        rgt = "";
      }
      break;
    case "obr":
      var nazev = prompt("Zadejte název souboru:");
      var popisek = prompt("Zadejte popis obrázku:");
      if (nazev && popisek)
      {
        lft = "[obr:"+nazev+"]"+popisek;
        rgt = "[/obr]";
      }
      else
      {
        lft = "";
        rgt = "";
      }
      break;
    case "mail":
      lft = "[mail]";
      rgt = "[/mail]";
      break;
    case "tucne":
      lft = "[b]";
      rgt = "[/b]";
      break;
    case "uvod":
      lft = "[uvod]";
      rgt = "[/uvod]\n";
      break;
    case "cite":
      lft = "[cite]";
      rgt = "[/cite]";
      break;
    case "warning":
      lft = "[warning]";
      rgt = "[/warning]";
      break;
    case "warnings":
      lft = "[warnings]";
      rgt = "[/warnings]";
      break;
    case "odstavec":
      lft = "[odstavec]";
      rgt = "[/odstavec]\n";
      break;
    case "seznam":
      lft = "[seznam]\n";
      rgt = "\n[/seznam]\n";
      break;
    case "cseznam":
      lft = "[cseznam]\n";
      rgt = "\n[/cseznam]\n";
      break;
    case "polozka-seznamu":
      lft = "[polozka-seznamu]";
      rgt = "[/polozka-seznamu]";
      break;
    case "tabulka":
      lft = "[tabulka]\n";
      rgt = "\n[/tabulka]\n";
      break;
    case "tabulkap":
      lft = "[tabulkap]\n";
      rgt = "\n[/tabulkap]\n";
      break;
    case "radek-tabulky":
      lft = "[radekt]";
      rgt = "[/radekt]";
      break;
    case "bunka-tabulky":
      lft = "[bunkat]";
      rgt = "[/bunkat]";
      break;
    case "zahlavi-tabulky":
      lft = "[zahlavit]";
      rgt = "[/zahlavit]";
      break;
    case "termin":
      lft = "[termin]";
      rgt = "[/termin]";
      break;
    case "mapa":
      lft = "[mapa]";
      rgt = "[/mapa]";
      break;
  }
  
  if (document.all)
  {
    IEWrap(lft, rgt);
  }
	else if (document.getElementById)
  {
    MozWrap(document.getElementById("text"), lft, rgt);
  }
}

function MozWrap(txtarea, lft, rgt) // vloĹľenĂ­ textu na pozici v Gecku
{
	var selLength = txtarea.textLength;
	var selStart = txtarea.selectionStart;
	var selEnd = txtarea.selectionEnd;
	if (selEnd==1 || selEnd==2) selEnd=selLength;
	var s1 = (txtarea.value).substring(0,selStart);
	var s2 = (txtarea.value).substring(selStart, selEnd)
	var s3 = (txtarea.value).substring(selEnd, selLength);
	txtarea.value = s1 + lft + s2 + rgt + s3;
}

	
function IEWrap(lft, rgt) // vloĹľenĂ­ textu na pozici v IE
{
	strSelection = document.selection.createRange().text;
	if (strSelection!="")
  {
    document.selection.createRange().text = lft + strSelection + rgt;
	}
}

//function cituj(id,autor)
//{
     //document.getElementById('text').value = '[cite] ' + document.getElementById(id).innerHTML + ' - ' + '[/cite]' + autor;
     
//}

function checkBrowser()
{
    this.ver=navigator.appVersion;
    this.dom=document.getElementById?1:0;
    this.ie6=(this.ver.indexOf("MSIE 6")>-1 && this.dom)?1:0;
    this.ie5=(this.ver.indexOf("MSIE 5")>-1 && this.dom)?1:0;
    this.ns6=(this.dom && parseInt(this.ver)>= 5)?1:0;
    this.ns4=(document.layers && !this.dom)?1:0;
    this.opr=(navigator.userAgent.toLowerCase().indexOf("opera")!=-1)?1:0;

    return this
}

function vlozRetezec(strinL,datum,autor){ 
    if(strinL=='') alert('Vyberte prosím nejprve text, který chcete citovat.');
    else
    {
        strinL = '[cite]' + autor + ', ' + datum + ':\n' + strinL + '[/cite]' + '\n';
        var isForm=document.forms["forumpost"];
        if (isForm) {
            var input=document.forms["forumpost"].elements["text"];
            input.value=input.value+strinL; 
        }
        else alert('Přístup zamítnut');
    }
}

function pasteSel() {
    if(document.getSelection) selection=document.getSelection();
    else if(document.selection) selection=document.selection.createRange().text;
    else if(window.getSelection) selection=window.getSelection;
    else selection='';
}

// lightbox ------------------------------------------------------------------------------------------------------------------

var Lightbox = {
	loadingImage: '/images/loading.gif',		
	closeButton: '/images/close.gif',
	
	// Function runs on window load, going through link tags looking for rel="lightbox".
	// These links receive onclick events that enable the lightbox display for their targets.
	// The function also inserts html markup at the top of the page which will be used as a
	// container for the overlay pattern and the inline image.
	inicializace: function()
	{
		var obrazky_do_noveho_okna = document.getElementsByClassName('nwp');

		// pokud na stránce nejsou žádné obrázky pro lightbox, ukončíme inicializaci lightboxu		
		if (obrazky_do_noveho_okna.length == 0) return;
	
		for (var i = 0; i < obrazky_do_noveho_okna.length; i++)
		{
			obrazky_do_noveho_okna[i].onclick = function ()
			{
				Lightbox.zobrazSe(this);
				return false;
			}
		}
	
		// the rest of this code inserts html at the top of the page that looks like this:
		//
		// <div id="overlay">
		//		<a href="#" onclick="hideLightbox(); return false;"><img id="loadingImage" /></a>
		//	</div>
		// <div id="lightbox">
		//		<a href="#" onclick="hideLightbox(); return false;" title="Click anywhere to close image">
		//			<img id="closeButton" />		
		//			<img id="lightboxImage" />
		//		</a>
		//		<div id="lightboxDetails">
		//			<div id="lightboxCaption"></div>
		//		</div>
		// </div>
		
		var objBody = document.getElementsByTagName("body").item(0);
		
		// create overlay div and hardcode some functional styles (aesthetic styles are in CSS file)
		var objOverlay = document.createElement("div");
		objOverlay.setAttribute('id','overlay');
		objOverlay.onclick = function () {Lightbox.skryjSe(); return false;}
		objOverlay.onmousedown = function () {Lightbox.skryjSe(); return false;}
		objOverlay.onkeydown = function () {Lightbox.skryjSe(); return false;}
		objOverlay.style.display = 'none';
		objOverlay.style.position = 'absolute';
		objOverlay.style.top = '0';
		objOverlay.style.left = '0';
		objOverlay.style.zIndex = '90';
	 	objOverlay.style.width = '100%';
		objBody.insertBefore(objOverlay, objBody.firstChild);
		
		var arrayPageSize = Lightbox.getPageSize();
		var arrayPageScroll = Lightbox.getPageScroll();
	
		// preload and create loader image
		var imgPreloader = new Image();
		
		// if loader image found, create link to hide lightbox and create loadingimage
		imgPreloader.onload=function(){
	
			var objLoadingImageLink = document.createElement("a");
			objLoadingImageLink.setAttribute('href','#');
			objLoadingImageLink.onclick = function () {Lightbox.skryjSe(); return false;}
			objOverlay.appendChild(objLoadingImageLink);
			
			var objLoadingImage = document.createElement("img");
			objLoadingImage.src = Lightbox.loadingImage;
			objLoadingImage.setAttribute('id','loadingImage');
			objLoadingImage.style.position = 'absolute';
			objLoadingImage.style.zIndex = '150';
			objLoadingImageLink.appendChild(objLoadingImage);
	
			imgPreloader.onload=function(){};	//	clear onLoad, as IE will flip out w/animated gifs
	
			return false;
		}
	
		imgPreloader.src = Lightbox.loadingImage;
	
		// create lightbox div, same note about styles as above
		var objLightbox = document.createElement("div");
		objLightbox.setAttribute('id','lightbox');
		objLightbox.style.display = 'none';
		objLightbox.style.position = 'absolute';
		objLightbox.style.zIndex = '100';	
		objBody.insertBefore(objLightbox, objOverlay.nextSibling);
		
		// create link
		var objLink = document.createElement("a");
		objLink.setAttribute('href','#');
		objLink.setAttribute('title','Obrázek se po kliknutí zavře');
		objLink.onclick = function () {Lightbox.skryjSe(); return false;}
		objLink.onmousedown = function () {Lightbox.skryjSe(); return false;}
		objLink.onkeydown = function () {Lightbox.skryjSe(); return false;}
		objLightbox.appendChild(objLink);
	
		// preload and create close button image
		var imgPreloadCloseButton = new Image();
	
		// if close button image found, 
		imgPreloadCloseButton.onload=function(){
	
			var objCloseButton = document.createElement("img");
			objCloseButton.src = Lightbox.closeButton;
			objCloseButton.setAttribute('id','closeButton');
			objCloseButton.style.position = 'absolute';
			objCloseButton.style.zIndex = '200';
			objLink.appendChild(objCloseButton);
	
			return false;
		}
	
		imgPreloadCloseButton.src = Lightbox.closeButton;
	
		// create image
		var objImage = document.createElement("img");
		objImage.setAttribute('id','lightboxImage');
		objLink.appendChild(objImage);
		
		// create details div, a container for the caption and keyboard message
		var objLightboxDetails = document.createElement("div");
		objLightboxDetails.setAttribute('id','lightboxDetails');
		objLightbox.appendChild(objLightboxDetails);
	
		// create caption
		var objCaption = document.createElement("div");
		objCaption.setAttribute('id','lightboxCaption');
		objCaption.style.display = 'none';
		objLightboxDetails.appendChild(objCaption);
	},
	
	// getPageScroll()
	// Returns array with x,y page scroll values.
	// Core code from - quirksmode.org
	getPageScroll: function ()
	{
		var yScroll;

		if (self.pageYOffset) {
			yScroll = self.pageYOffset;
		} else if (document.documentElement && document.documentElement.scrollTop){	 // Explorer 6 Strict
			yScroll = document.documentElement.scrollTop;
		} else if (document.body) {// all other Explorers
			yScroll = document.body.scrollTop;
		}
	
		arrayPageScroll = new Array('',yScroll) 
		return arrayPageScroll;
	},
	
	// getPageSize()
	// Returns array with page width, height and window width, height
	// Core code from - quirksmode.org
	// Edit for Firefox by pHaez
	getPageSize: function()
	{
		var xScroll, yScroll;
		
		if (window.innerHeight && window.scrollMaxY) {	
			xScroll = document.body.scrollWidth;
			yScroll = window.innerHeight + window.scrollMaxY;
		} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
			xScroll = document.body.scrollWidth;
			yScroll = document.body.scrollHeight;
		} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
			xScroll = document.body.offsetWidth;
			yScroll = document.body.offsetHeight;
		}
		
		var windowWidth, windowHeight;
		if (self.innerHeight) {	// all except Explorer
			windowWidth = self.innerWidth;
			windowHeight = self.innerHeight;
		} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
			windowWidth = document.documentElement.clientWidth;
			windowHeight = document.documentElement.clientHeight;
		} else if (document.body) { // other Explorers
			windowWidth = document.body.clientWidth;
			windowHeight = document.body.clientHeight;
		}	
		
		// for small pages with total height less then height of the viewport
		if(yScroll < windowHeight){
			pageHeight = windowHeight;
		} else { 
			pageHeight = yScroll;
		}
	
		// for small pages with total width less then width of the viewport
		if(xScroll < windowWidth){	
			pageWidth = windowWidth;
		} else {
			pageWidth = xScroll;
		}
	
	
		arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight) 
		return arrayPageSize;
	},
	
	// pause(numberMillis)
	// Pauses code execution for specified time. Uses busy code, not good.
	// Code from http://www.faqts.com/knowledge_base/view.phtml/aid/1602
	pause: function(numberMillis)
	{
		var now = new Date();
		var exitTime = now.getTime() + numberMillis;
		while (true) {
			now = new Date();
			if (now.getTime() > exitTime)
				return;
		}
	},
	
	// getKey(key)
	// Gets keycode. If 'x' is pressed then it hides the lightbox.
	getKey: function(e)
	{
		if (e == null) { // ie
			keycode = event.keyCode;
		} else { // mozilla
			keycode = e.which;
		}
		key = String.fromCharCode(keycode).toLowerCase();
		
		if(key == 'x'){ Lightbox.skryjSe(); }
	},
	
	// listenKey()
	listenKey: function ()
	{
		document.onkeypress = Lightbox.getKey;
	},
	
	// zobrazSe()
	// Preloads images. Pleaces new image in lightbox then centers and displays.
	zobrazSe: function (objLink)
	{
		// prep objects
		var objOverlay = document.getElementById('overlay');
		var objLightbox = document.getElementById('lightbox');
		var objCaption = document.getElementById('lightboxCaption');
		var objImage = document.getElementById('lightboxImage');
		var objLoadingImage = document.getElementById('loadingImage');
		var objLightboxDetails = document.getElementById('lightboxDetails');
	
		var arrayPageSize = Lightbox.getPageSize();
		var arrayPageScroll = Lightbox.getPageScroll();
	
		// center loadingImage if it exists
		if (objLoadingImage) {
			objLoadingImage.style.top = (arrayPageScroll[1] + ((arrayPageSize[3] - 35 - objLoadingImage.height) / 2) + 'px');
			objLoadingImage.style.left = (((arrayPageSize[0] - 20 - objLoadingImage.width) / 2) + 'px');
			objLoadingImage.style.display = 'block';
		}
	
		// set height of Overlay to take up whole page and show
		objOverlay.style.height = (arrayPageSize[1] + 'px');
		objOverlay.style.display = 'block';
	
		// preload image
		imgPreload = new Image();
	
		imgPreload.onload = function()
		{
			objImage.src = objLink.href;
	
			// center lightbox and make sure that the top and left values are not negative
			// and the image placed outside the viewport
			var lightboxTop = arrayPageScroll[1] + ((arrayPageSize[3] - 35 - imgPreload.height) / 2);
			var lightboxLeft = ((arrayPageSize[0] - 20 - imgPreload.width) / 2);
			
			objLightbox.style.top = (lightboxTop < 0) ? "0px" : lightboxTop + "px";
			objLightbox.style.left = (lightboxLeft < 0) ? "0px" : lightboxLeft + "px";
	
	
			objLightboxDetails.style.width = imgPreload.width + 'px';
			
			if(objLink.getAttribute('title')){
				objCaption.style.display = 'block';
				//objCaption.style.width = imgPreload.width + 'px';
				objCaption.innerHTML = objLink.getAttribute('title');
			} else {
				objCaption.style.display = 'none';
			}
			
			// A small pause between the image loading and displaying is required with IE,
			// this prevents the previous image displaying for a short burst causing flicker.
			if (navigator.appVersion.indexOf("MSIE")!=-1){
				Lightbox.pause(250);
			} 
	
			if (objLoadingImage)
			{
				objLoadingImage.style.display = 'none';
			}
	
			// Hide select boxes as they will 'peek' through the image in IE
			selects = document.getElementsByTagName("select");
	        for (i = 0; i != selects.length; i++) {
	                selects[i].style.visibility = "hidden";
	        }
	
		
			objLightbox.style.display = 'block';
	
			// After image is loaded, update the overlay height as the new image might have
			// increased the overall page height.
			arrayPageSize = Lightbox.getPageSize();
			objOverlay.style.height = (arrayPageSize[1] + 'px');
			
			// Check for 'x' keypress
			Lightbox.listenKey();
	
			return false;
		}
	
		imgPreload.src = objLink.href;
	},
	
	// skryjSe()
	skryjSe: function()
	{
		// get objects
		objOverlay = document.getElementById('overlay');
		objLightbox = document.getElementById('lightbox');
	
		// hide lightbox and overlay
		objOverlay.style.display = 'none';
		objLightbox.style.display = 'none';
	
		// make select boxes visible
		selects = document.getElementsByTagName("select");
	    for (i = 0; i != selects.length; i++) {
			selects[i].style.visibility = "visible";
		}
	
		// disable keypress listener
		document.onkeypress = '';
	}
}
