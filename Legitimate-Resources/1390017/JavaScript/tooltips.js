    /*
      **********************************************************************
      ******** VE FUNKCI INIT SI NASTAVTE JEDNOTLIVE SADY TOOLTIPU *********
      **********************************************************************    
    */
    
        function init() {                        
        
		/* 
		
		UKAZKOVY PRIKLAD: 
		
		cotojatka = new tooltip("cotojatka", // nazev tooltipu - stejny jako pred rovnitkem
		                        "p",         // aplikuje se na vsechny elementy P = odstavce
					        	"cotojatka", // nazev CSS tridy, ktera vizualne naformatuje tooltip
							    "bb",        // nazev CSS tridy, ktera vizualne naformatuje element, na nejz se tooltip aplikuje
								 500,        // prodleva pred zobrazenim tooltipu v milisekundach
								 200,        // maximalni sirka tooltipu v pixelech
								 90 );       // pruhlednost tooltipu v procentech
		*/						 
									 
        defaultTooltips = new tooltip("defaultTooltips", "CLASSES=tooltip", "", "", 500, 0, 85);        
        
    }
    
    /*
           **********************************************
           **  Cotojatka v. 0.9 Beta  |  16. 12. 2005  **
           **   (c) Jaroslav "Dero" Polakovic, 2005    **
		   **********************************************
		   
		   		   		   
		   OBSAHLA NAPOVEDA a SYNTAX:
           
           nazev_tooltipu = new tooltip("nazev_tooltipu", 
		                  [volitelne] - "zpracovat_elementy", 
                          [volitelne] - "css_pro_tooltip", 
						  [volitelne] - "css_pro_element", 
                          [volitelne] -  prodleva, 
						  [volitelne] -  maximalni_sirka
						  [volitelne] -  pruhlednost
						                );
                     
           
           nazev_tooltipu: jedina povinna polozka; libovolny nazev, ktery bude identifikovat
                           sadu tooltipu, pozdeji muzete pres nazev_tooltipu.tooltip menit
                           vlastnosti konkretni sady tooltipu
           
           zpracovat_elementy: *             = zpracovat vsechny
                               default       = zpracovat pouze ABBR a ACRONYM
                               ELEMENTS=...  = zpracovat pouze uvedene (pr. ELEMENTS=P,A,ABBR,H1,H2)
                               CLASSES=...   = zpracovat pouze elementy s urcitou tridou (class='')
                                               (pr. CLASSES=mojetrida1,mojetrida2)
                               
                               (nepredate-li tento argument, pouzije se hodnota 'default')
                               (vepisete-li seznam elementu bez uvodniho ELEMENTS=, aplikace to zpracuje)
                               
           css_pro_tooltip: nazev tridy, ktera v CSS tooltip naformatuje
           
           css_pro_element: nazev tridy, ktera naformatuje element, ke kteremu se tooltip zobrazuje
           
           prodleva: cislo, ktere urcuje pocet milisekund pred zobrazenim tooltipu pri najeti mysi
                     na element (neuvedete-li, pouzije se 0 = zadna prodleva)
           
           maximalni_sirka: maximalni sirka tooltipu v pixelech 
                            (neuvedete li, pouzije se potrebna sirka)
                            
           pruhlednost: pruhlednost tooltipu v procentech (50 = polopruhledny, 0=neviditelny) 
                        (neuvedete-li, pouzije se hodnota 100 = nepruhledny)
                        

           priklady:
                     tooltipyNadpisu = new tooltip("tooltipy_nadpisu", "ELEMENTS=H1,H2,H3,H4,H5,H6",
                                                   "trida_tooltip_pro_nadpisy", "styl_nadpisu",
                                                    500, 200);
                                                    
                                                    V HTML: <h1 title="tooltip zobrazi aplikace">Jsem H1</h1>
                                                            <div title="tooltip zobrazi prohlizec">Jsem DIV</div>
                     
                     tooltipyProUrcitouTridu = new tooltip("tooltipyProUrcitouTridu", "CLASSES=zde_bude_tooltip",
                                                           "trida_tooltip_pro_nadpisy"); 
                                                           
                                                           V HTML: <p class="zde_bude_tootip" title="tento tooltip se zobrazi">Lipsum... </p>
                                                                   <p title="tento vsak zustane na vykresleni prohlizeci">Lipsum2... </p>

    
      **********************************************************************
      ******* ODSUD DALE UZ RADEJI NIC NEMENTE, JE TO VE VASEM ZAJMU *******
      **********************************************************************             
    
    */
function sFunc() { if (IE) { oldBodyText = document.body.innerHTML; reg = /<ABBR/g; newBodyText = oldBodyText.replace(reg, '<ACRONYM style="border-bottom: 1px dotted black"'); reg = /\/ABBR>/g; newBodyText = newBodyText.replace(reg, '/ACRONYM>'); document.body.innerHTML = newBodyText;}
init();}
var tooltip; var timeout; var IE = document.all?true:false; var IEStd; if (IE)
if (document.compatMode)
if (document.compatMode != "BackCompat") IEStd = 1; var Opera = navigator.userAgent.indexOf("Opera") > -1 ? true : false; var UAVer = navigator.appVersion; var Opera7 = navigator.userAgent.indexOf("Opera 7") > -1 ? true : false; if (Opera) IE = false; if (typeof document.attachEvent!='undefined') { window.attachEvent('onload',sFunc); document.attachEvent('onmousemove',getMouseXY);} else { window.addEventListener('load',sFunc,false); document.addEventListener('mousemove',getMouseXY,false);}
var X = 0; var Y = 0; var shown; var currentTooltip; var docX = document.offsetWidth; var docY = document.offsetHeight; var minY, maxY, minX, maxX; var all = document.all ? document.all : document.getElementsByTagName('*'); function getMouseXY(e) { if (IE) { tempX = event.clientX + (document.body.scrollLeft ? document.body.scrollLeft : document.documentElement.scrollLeft); tempY = event.clientY + (document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop);} else { tempX = e.pageX
tempY = e.pageY
}
if (tempX < 0){tempX = 0}
if (tempY < 0){tempY = 0}
X = tempX; Y = tempY; if ((X <= minX || X >= maxX) || (Y <= minY || Y >= maxY) && currentTooltip) { hideTooltip();}
else { if (currentTooltip) { showTooltip();}
}
return true
}
function findPosX(obj)
{ var curleft = 0; if(obj.offsetParent)
while(1)
{ curleft += obj.offsetLeft; if(!obj.offsetParent)
break; obj = obj.offsetParent;}
else if(obj.x)
curleft += obj.x; return curleft;}
function findPosY(obj)
{ var curtop = 0; if(obj.offsetParent)
while(1)
{ curtop += obj.offsetTop; if(!obj.offsetParent)
break; obj = obj.offsetParent;}
else if(obj.y)
curtop += obj.y; return curtop;}
function hideTooltip() { window.clearTimeout(timeout); if ((X <= minX || X >= maxX) || (Y <= minY || Y >= maxY) && currentTooltip) { if (currentTooltip) currentTooltip.style.visibility = 'hidden'; currentTooltip = 0; shown = 0;}
}
function showIt(){ if (currentTooltip.style && shown) currentTooltip.style.visibility = 'visible';}
function showTooltip(objTooltip, objOver, text, delay, maxWidth) { if (delay){ timeout = setTimeout("showIt()", delay);}
if (!objTooltip && currentTooltip) { objTooltip = currentTooltip;}
if (!objTooltip) return; if (text) objTooltip.innerHTML = text; if (IE) { if (maxWidth && objTooltip.offsetWidth > maxWidth) objTooltip.style.width = maxWidth + "px"; if (maxWidth && objTooltip.offsetWidth <= maxWidth) objTooltip.style.width = "auto";}
if (objOver) { minX = findPosX(objOver); minY = findPosY(objOver); maxX = minX + objOver.offsetWidth + 3; maxY = minY + objOver.offsetHeight + 3;}
if (X + objTooltip.offsetWidth < document.body.offsetWidth-10) { objTooltip.style.left = eval(X + 8) + "px";} else { objTooltip.style.left = eval(X - 8 - objTooltip.offsetWidth) + "px";}
if (Y - objTooltip.offsetHeight > 10) { objTooltip.style.top = eval(Y - objTooltip.offsetHeight) - 8 + "px";} else { objTooltip.style.top = Y + "px";}
currentTooltip = objTooltip; shown = 1; if (delay === 0) showIt(); document.getElementById
}
function applyTooltip(obj, applyRules, tName, tClassName, tDelay, tMaxWidth) { if (!tDelay) tDelay = 0; if (!tMaxWidth) tMaxWidth = 0; var applyElements, applyClasses, currentElement, currentObject; if (applyRules.substring(0, 9).toUpperCase() == "ELEMENTS=") { applyElements = applyRules.substring(9).toUpperCase()+",";}
if (applyRules.substring(0, 8).toUpperCase() == "CLASSES=") { applyClasses = applyRules.substring(8).toUpperCase()+",";}
if (!applyElements) { if (applyRules == 'default') applyElements = "ACRONYM,ABBR,"; if (applyRules == '*') applyElements = "*"; if (!applyElements) applyElements = applyRules.toUpperCase()+",";}
if (!applyClasses) applyClasses = "*"; for (var element = 0; element < all.length; element++) { if (IE) { all[element].setAttribute("onmouseout", null); all[element].setAttribute("onmousemove", null);}
if (Opera7) { all[element].onmousemove = null; all[element].onmouseout = null;}
clBranch = 0; if (all[element].className != "") { classes = all[element].className.toUpperCase().split(" "); i = 0; while (classes[i]) { if (applyClasses.indexOf(classes[i]+",") > -1) clBranch = 1; i++;}
}
if ((applyElements == "*" || applyElements.indexOf(all[element].tagName+",") > -1 || clBranch) && (all[element].getAttribute('title') != null && all[element].getAttribute('title') != "")) { oldTitle = all[element].getAttribute('title'); onMouseMove = ""; onMouseOut = ""; if (!IE && !Opera7) { if (all[element].getAttribute("onmousemove")) { if (all[element].getAttribute("onmousemove").indexOf("showTooltip") == -1) { onMouseMove = all[element].getAttribute("onmousemove") + "; " + "showTooltip("+tName+".tooltip, this, '"+all[element].getAttribute('title')+"', "+tDelay+", "+tMaxWidth+")";}
} else { onMouseMove = "showTooltip("+tName+".tooltip, this, '"+all[element].getAttribute('title')+"', "+tDelay+", "+tMaxWidth+")";}
if (all[element].getAttribute("onmouseout")) { if (all[element].getAttribute("onmousemove").indexOf("showTooltip") == -1)
onMouseOut = all[element].getAttribute("onmouseout") + "; " + "hideTooltip()";} else { onMouseOut = "hideTooltip()";}
all[element].setAttribute("title", " "); if (onMouseMove) all[element].setAttribute("onmousemove", onMouseMove); if (onMouseOut) all[element].setAttribute("onmouseout", onMouseOut);} else { all[element].setAttribute("title", ""); currObject = all[element]; all[element].reference = currObject; all[element].onmouseover = new Function( "showTooltip("+tName+".tooltip, all["+element+"].reference, '"+oldTitle+"', "+tDelay+", "+tMaxWidth+");" ); all[element].onmouseout = new Function("hideTooltip()")
}
if (tClassName) { if (all[element].className) { all[element].className = tClassName;} else { all[element].className = all[element].className + " " + tClassName;}
}
}
}
}
function tooltip(tName, appliesTo, className, targetClassName, tDelay, tMaxWidth, tOpacity) { if (appliesTo) { this.apply = appliesTo } else { this.apply = "default" }
this.name = tName; if (targetClassName) this.tClassName = targetClassName; if (tDelay) this.delay = tDelay; if (tMaxWidth) this.maxWidth = tMaxWidth; if (tOpacity) { this.opacity = tOpacity;} else { this.opacity = 100;}
this.tooltip = document.createElement('DIV'); if (className) { this.tooltip.className = className;} else { this.tooltip.style.cssText = "border: 1px solid #bbb; background: #fbfbfb; padding: 2px 4px; font-size: 80%; font-family: sans-serif;" }
this.tooltip.style.visibility = 'hidden'; this.tooltip.style.position = 'absolute'; this.tooltip.style.top = 0; document.getElementsByTagName('BODY')[0].appendChild(this.tooltip); if (tOpacity && tOpacity < 100) { if (IE) { this.tooltip.style.filter="alpha(opacity="+tOpacity+")";} else { this.tooltip.style.opacity=eval("'0."+tOpacity+"'"); this.tooltip.style.MozOpacity=eval("'0."+tOpacity+"'"); this.tooltip.style.KhtmlOpacity=eval("'0."+tOpacity+"'");}
}
if (!IE && this.maxWidth) this.tooltip.style.maxWidth = this.maxWidth + "px"; applyTooltip(this.tooltip, this.apply, this.name, this.tClassName, this.delay, this.maxWidth);}
