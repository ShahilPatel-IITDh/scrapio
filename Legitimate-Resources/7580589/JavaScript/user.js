// ----------------------------------------------
// This function dynamically generates flash file
// parameters.
// -----------------------------------------------
function viewFlash(src, w, h, loop, play)
{
   var width = parseInt(w);
   var height = parseInt(h);

//alert('adWidth = '+width+ '\n Height = '+height);

   eval("win = window.open('','Flash', 'toolbar=0,scrollbars=0,location=0,status=0,resizable=1,menubar=0,width="+width+",height="+height+"');");
   win.document.writeln('<html>');
   win.document.writeln('<head><title>Flash Movie</title></head>');
   win.document.writeln('<body>');

   // for IE users use <object> tag
   objectTag = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0"';
   win.document.write(objectTag);
   win.document.write(' width="'+width+'"');
   win.document.writeln(' height="'+height+'">');
   win.document.writeln('<param name="movie" value="'+src+'">');
   win.document.writeln('<param name="loop" value="'+loop+'">');
   win.document.writeln('<param name="play" value="'+play+'">');

    // for Netscape users use <embed> tag
   win.document.writeln('<embed src="'+src+'" loop="'+loop+'" play="'+play+'" width="'+width+'" height="'+height+'" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" />'); 
   win.document.writeln('</object>');
   win.document.writeln('</body></html>');

}

// ----------------------------------------------
// This function dynamically generates a chat 
// pop-up. (ASV)
// -----------------------------------------------
function viewChat(instance_id, url)
{
   props = 'toolbar=0,scrollbars=0,location=0,status=0,resizable=1,menubar=0,width=584,height=410';
   win = window.open('','Chat',props);
   win.document.writeln('<html>');
   win.document.writeln('<head><title>Chat Room</title></head>');
   win.document.writeln('<body>');
   win.document.writeln('<applet codebase="'+url+'" archive="multichat.jar" CODE="GUIClient.class" width="562" height="385" align="BOTTOM">');
   win.document.writeln('<param name="CABBASE" value="multichat.cab">');
   win.document.writeln('<param name="roomid" value="'+instance_id+'">');
   win.document.writeln('</applet>');
   win.document.writeln('</body></html>');
}

//----------------------------------------------------
// Create a new pop up window for a given URL and type
//----------------------------------------------------
function popUp(URL, type) 
{
    switch(type)
    {
	 case "guestbook":
	    width = 675;
	    height = 500;
	    break;	    
	 case "forum":
	    width = 675;
	    height = 500;
	    break;	    
         default:
            width = 550;
            height = 580;
   }

   var token = URL.indexOf('?') > -1 ? '&amp;' : '?';
   uniqueId = genUniqueId();
   URL=URL+genUniqueParam(token);

   var leftPosition  = (screen.width - width - 20) / 2;
   var topPosition = (screen.height - height) / 4;

   //open centered
   eval("win = window.open(URL, '"+type+"', 'toolbar=0,scrollbars=1,location=0,status=1,resizable=1,menubar=0,width="+width+",height="+height+",left="+leftPosition+",top="+topPosition+"');");

   if (parseInt(navigator.appVersion) >= 4) 
   { 
      win.window.focus(); 
   }
}

//----------------------------------------------------

// Create a new pop up window for a given MLS action 

//----------------------------------------------------

function popUpMLS(id) 

{
   var winWidth = 550;
   var winHeight = 510;
   eval("win = window.open('"+ window.parent.document.getElementById("ic_mls_url"+id).innerHTML +"', name='_blank');");
  
}
//----------------------------------------------------

// Create a new pop up window for a given referral action 

//----------------------------------------------------

function popUpEReferral(id, http, action, subject) 

{
   var winWidth = 550;
   var winHeight = 510;
   eval("win = window.open('','Referral', 'toolbar=0,scrollbars=1,location=0,status=0,resizable=1,menubar=0,width="+winWidth+",height="+winHeight+"');");

   // clear the content of the document
   win.document.open();
   win.document.writeln('<html>');
   win.document.writeln('<head><title>E-Referral Link</title><script language="JavaScript"> function checkemail(){ var toEmail=document.site_refer.ToEmail.value; fromEmail=document.site_refer.FromEmail.value; var filter=/^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$/i; var toEmailArr = new Array(); toEmailArr = toEmail.split(","); var i=0; for (i=0;i<toEmailArr.length;i++) { if(filter.test(toEmailArr[i].replace(/^\\s\\s*/, "").replace(/\\s\\s*$/, ""))){ continue; }else{ alert("Please enter a valid e-mail address (e.g. email@example.com)."); return false; } } if (filter.test(fromEmail)) { return true; } else { alert("Please enter a valid e-mail address (e.g. email@example.com)."); return false; } } function onClickForm(){ document.site_refer.return_url.value=window.location.href; alert("Thank you. Your message has been submitted.");  self.close(); } </script><style type="text/css"> .fName { display:none; }  </style></head>');
   win.document.writeln('<body>');
   win.document.writeln('<h4>Invite People to this Website</h4>');
   win.document.writeln('<h4 style="color:#0000CC">Enter email invitation details</h4>');
   win.document.writeln('<center><table border="0">');
   win.document.writeln('<form onSubmit="return onClickForm();return false;" name="site_refer" action="' +http+ action +'" method="post">');
   win.document.writeln('<input type="hidden" value="" name="return_url"/>');
   win.document.writeln('<div class="fName"><input type="text" name="FirstName" value=""></div></br>');

   win.document.writeln('<table><tr><td><strong>*From Email Address:</strong></td><td><input type="text" style="width:350px;" name="FromEmail" value=""><br/></td></tr>');
   win.document.writeln('<tr><td><strong>Name:</strong></td><td><input type="text" style="width:350px;" name="VisitorName" value=""><br/></td></tr>');
   win.document.writeln('<tr><td><strong>Subject:</strong></td><td><input type="text" readonly style="width:350px;" name="Subject" value="'+ subject +'"><br/></td></tr>');
   win.document.writeln('<tr><td><strong>*To Email Address:</strong></td><td><textarea rows="5" cols="50" style="width:350px;" name="ToEmail"></textarea><br/></td></tr>');
   win.document.writeln('<tr><td><strong>Message:</strong></td><td><textarea rows="10" cols="50" style="width:350px;" readonly name="Message">'+window.parent.document.getElementById("ic_ereferral_mesg"+id).innerHTML+" "+ window.parent.document.getElementById("ic_ereferral_url"+id).innerHTML +'</textarea><br/></td></tr>');
   //win.document.writeln('<textarea rows="10" cols="50" readonly name="Message" >'+mesg+'</textarea><br>');
   //win.document.writeln('<tr><td>&nbsp;</td><td><div style="border: 1px solid #000000; padding: 6px"><b>Subject:</b> '+ subject +'<br><p><b>Message:</b>' + mesg +'</p></div></td></tr>');
   win.document.writeln('<br/><tr><td>&nbsp;</td><td><input type="submit" name="Send" value="Send Invite" onclick="return checkemail();"/>&nbsp;<input type="button" name="Cancel" value="Cancel" onclick="javascript:self.close();"/></td></tr></table>');
   win.document.writeln('</form></table><small>The email address your provide is being used solely to invite people to the website. Network Solutions will not collect your email address for marketing or any other prurposes.</small></center>');
   win.document.writeln('</body></html>');
   win.document.close();
}

// ----------------------
// Generate Unique Id
// ----------------------
function genUniqueId()
{
   day = new Date();
   return day.getTime();
}

// -------------------------------------------------
// Generate Unique parameter to be appended to the URL
// This will allow us to realod the HTML from the server
// -------------------------------------------------
function genUniqueParam(parameter)
{
   return parameter+'unique_id='+genUniqueId();
}

//
// Display the target image for this thumbnail
//
function displayThumb(src, width, height, title)
{
   var winWidth = 650;
   var winHeight = 510;

   eval("win = window.open('','Thumb', 'toolbar=0,scrollbars=1,location=0,status=0,resizable=1,menubar=0,width="+winWidth+",height="+winHeight+"');");

   // clear the content of the document
   win.document.open();

   win.document.writeln('<html>');

   if(null != title && title != "")
   {
       win.document.writeln('<head><title>' + title + '</title></head>');
   }
   else
   {
       win.document.writeln('<head><title>Thumbnail Image</title></head>');
   }
   win.document.writeln('<body>');

   win.document.writeln('<center><table border="0">');
   if (width == 0)
   {
      win.document.writeln('<tr><td align="center"><img src="'+src+'"></td></tr>');
   }
   else if (height == 0)
   {
      win.document.writeln('<tr><td align="center"><img width="'+width+'" src="'+src+'"></td></tr>');   
   } 
   else
   {
      win.document.writeln('<tr><td align="center"><img width="'+width+'" height="'+height+'" src="'+src+'"></td></tr>');   
   } 

   if(null != title && title != "")
   {
       win.document.writeln('<tr><td align="center">'+title+'</td></tr>');
   }
   win.document.writeln('</table></center>');

   win.document.writeln('</body></html>');
   win.document.close();
}
//------------------------------------------------------------
// Create a URL which is called from a mapquest Map to get Directions
//-----------------------------------------------------------
    function genURL(action,formname,newMap)
    {
		var sa = document.getElementById(formname).street_address.value;
		var cy = document.getElementById(formname).city.value;
		var st = document.getElementById(formname).state.value;
		var pc = document.getElementById(formname).postal_code.value;
		var ct = document.getElementById(formname).country.value;
		var lat =document.getElementById(formname).latitude.value;
		var lng =document.getElementById(formname).longitude.value;
		var uid =document.getElementById(formname).userid.value;
		var wid =document.getElementById(formname).website_id.value;
		
		if (newMap=='true'){
		// To be added only if the user is a new user.
			var street=document.getElementById(formname).toStreet.value;
			var city= document.getElementById(formname).toCity.value;
			var state=document.getElementById(formname).toState.value;
			var zip=document.getElementById(formname).toZip.value;
			var country=document.getElementById(formname).toCountry.value;
			if(zip=="")
			{
				if(city=="" || state=="")
				{
					alert("Please select an address by clicking the radio button");
					return false;
				}
			}
		}
		if(pc=="")
		{
			if(cy=="" || st=="")
			{
				alert(ICaltgopub.pe_txt1);
				return false;
			}
		}
		
		
		
		//pallavi change to send the toAress also to get driving directions
		var url = action+"&street_address="+sa+"&city="+cy+"&state="+st+"&postal_code="+pc+"&country="+ct
					+"&latitude="+lat+"&longitude="+lng +"&userid="+uid+"&website_id="+wid;
		if (newMap=='true'){
		//WE have toaddress only for new user,old users used Lat and lon.			
			url=url +"&toStreet="+street+"&toCity="+city+"&toState="+state+"&toZipCode="+zip+"&toCountry="+country
		}				
		popUp(url);

   }
//------------------------------------------------------------
// Called from Map Element: This method will set hidden parameters
//-----------------------------------------------------------
    function setToAddress(street,city,state,zip,country,formname)
    {
		document.getElementById(formname).toStreet.value=street;
		document.getElementById(formname).toCity.value=city;
		document.getElementById(formname).toState.value=state;
		document.getElementById(formname).toZip.value=zip;
		document.getElementById(formname).toCountry.value=country;
		
		
  }
 
//------------------------------------------------------------
// Called from Map Element: This method disables the button Id that is passed
//-----------------------------------------------------------
   function disableZoomButton(buttonId,formname,relativepath){
	    switch(buttonId)
	    {
		 case "minus_three":
		   document.getElementById(formname)[buttonId].src=relativepath+'images/photoalbum/zoom-in.png';
		    break;	    
		 case "minus_two":
		    document.getElementById(formname)[buttonId].src=relativepath+'images/photoalbum/zoom-level-button.png';
		    break;
		case "minus_one":
		    document.getElementById(formname)[buttonId].src=relativepath+'images/photoalbum/zoom-level-button.png';
		    break;
		 case "plus_two":
		    document.getElementById(formname)[buttonId].src=relativepath+'images/photoalbum/zoom-level-button.png';
		    break;
		 case "plus_one":
		    document.getElementById(formname)[buttonId].src=relativepath+'images/photoalbum/zoom-level-button.png';
		    break;	
		 case "center":
		    document.getElementById(formname)[buttonId].src=relativepath+'images/photoalbum/zoom-level-button.png';
		    break;		 
		 case "plus_three":
		    document.getElementById(formname)[buttonId].src=relativepath+'images/photoalbum/zoom-out.png';
		    break;	
		 case "original":
		    document.getElementById(formname)[buttonId].src=relativepath+'images/photoalbum/center-map.png';
		    break;
		
	  	 }
   }

//------------------------------------------------------------
// Called from Map Element: This method enables all buttons
//-----------------------------------------------------------  
 function enableAllbutton(formname,relativepath){
 	document.getElementById(formname).minus_three.src=relativepath+'images/photoalbum/zoom-in-over.png';
 	document.getElementById(formname).minus_two.src=relativepath+'images/photoalbum/zoom-level-button-up.png';
 	document.getElementById(formname).minus_one.src=relativepath+'images/photoalbum/zoom-level-button-up.png';
 	document.getElementById(formname).plus_one.src=relativepath+'images/photoalbum/zoom-level-button-up.png';
 	document.getElementById(formname).plus_two.src=relativepath+'images/photoalbum/zoom-level-button-up.png';
 	document.getElementById(formname).plus_three.src=relativepath+'images/photoalbum/zoom-out-over.png';
 	document.getElementById(formname).original.src=relativepath+'images/photoalbum/center-map-over.png';
 	document.getElementById(formname).center.src=relativepath+'images/photoalbum/zoom-level-button-up.png';
   } 
 //------------------------------------------------------------
// Called from Map Element: This is invoked when user clicks zoom buttons or pan buttons
//-----------------------------------------------------------    
    function genZoomURL(pageId,elementId,action,zoomLevel,symbolName,formname,panDirection,relativepath)
    {
		  enableAllbutton(formname,relativepath);
		  disableZoomButton(zoomLevel,formname,relativepath);
		  
		  var uniqueId = genUniqueId();
		  var url = action+"page_id="+pageId+"&element_id="+elementId
							+ "&symbolName=" +symbolName+"&zoomLevel=" + zoomLevel 
							+ "&panDirection=" + panDirection 
							+ "&uniqueId=" +uniqueId;
							
		//popUp(url);
		var divImageName= 'mapImage'+	elementId;	
		document.getElementById(divImageName).style.display='none';
		var divZoomName= 'zoomDiv'+	elementId;	
		document.getElementById(divZoomName).style.display='block';
		var iframeZoomName= 'zoomImageFrame'+	elementId;	
		document.getElementById(iframeZoomName).src=url;
	      
					
   }
   

 


//-----------
// BEGIN SCRIPTS FOR NAV MENUS
//-----------

// MENU GLOBALS

//var navcontname='navcontainer';
var navcontname;
var menumainwidth=100;
var navmode=0;
// 0 is right 1 is left
var fldr=0;
var fldrorg=0;
//containing menu ids
var menuids=new Array();

//item that opens this menu
var menuparitem=new Array();
var menuparindex=new Array();
var itemchildren=new Array();
var timerID;
var menuactv=0;


//item ids
var itemids=new Array();
var itemparids=new Array();
var itemchild=new Array();
var linkarr=new Array();

var xSize=0;
var ySize=0;


//index to menuids and menuparitem arrays
var menuids_ct=1;
//index to itemids and itemmenu arrays
var itemids_ct=0;
var step_ct=0;

var nodeposition=new Array();
var nodelength=new Array();

var absdepth=0;
var deptharr=new Array();

function parseMenus() {

	if (document.getElementById('nav-left')) {
		navmode=0;
		fldr=0;
	} else if (document.getElementById('nav-right')) {
		navmode=1;
		fldr=1;
	} else if (document.getElementById('nav-top')) {
		navmode=2;
		fldr=0;
	}
	fldrorg=fldr;

navcontname=document.getElementById('navcontainer');
menuids[0]=navcontname;
menuparitem[0]=navcontname;
deptharr[0]=navcontname;
nodeposition[0]=0;
nodelength[0]=deptharr[0].childNodes.length;



do {

 if (deptharr[absdepth].childNodes[nodeposition[absdepth]].tagName=="DIV") {
      if (deptharr[absdepth].childNodes[nodeposition[absdepth]].className.indexOf("submenu")!=-1) {
        menuids[menuids_ct]=deptharr[absdepth].childNodes[nodeposition[absdepth]];
        deptharr[absdepth+1]=menuids[menuids_ct];
        menuparitem[menuids_ct]=itemids[itemids_ct-1];
        menuparindex[menuids_ct]=itemids_ct;
        itemchildren[menuids_ct]=menuids[menuids_ct];
        itemchild[itemids_ct-1]=menuids[menuids_ct];
	
		//linkarr[itemids_ct].className="tertiary linkHasSub"; // use to apply arrows to subs using class "linkHasSub"
		
        rolladd="rollMenu(" + menuids_ct +")";
		rolladdout="rollMenu(0)";
		
        eval('menuparitem[menuids_ct].onmouseover=function(){' + rolladd + '}');
		eval('menuparitem[menuids_ct].onmouseout=function(){' + rolladdout + '}');
        nodelength[absdepth+1]=deptharr[absdepth].childNodes[nodeposition[absdepth]].childNodes.length-1;
        absdepth++;
        nodeposition[absdepth]=-1;
        menuids_ct++;
} else {

     itemids[itemids_ct]=deptharr[absdepth].childNodes[nodeposition[absdepth]];
     itemparids[itemids_ct]=menuids[menuids_ct-1];
     nodelength[absdepth+1]=deptharr[absdepth].childNodes[nodeposition[absdepth]].childNodes.length-1;
     absdepth++;
     deptharr[absdepth]=itemids[itemids_ct];
     nodeposition[absdepth]=-1;
  	 itemids_ct++;
	 }

 } else if (deptharr[absdepth].childNodes[nodeposition[absdepth]].tagName=="A") {
	 deptharr[absdepth].childNodes[nodeposition[absdepth]].id="sublink" + itemids_ct;
     linkarr[itemids_ct]=deptharr[absdepth].childNodes[nodeposition[absdepth]];
	}

    nodeposition[absdepth]++;
    if (nodeposition[absdepth]>nodelength[absdepth]) {
    do {
        absdepth--;
        nodeposition[absdepth]++;
    } while (nodeposition[absdepth]>nodelength[absdepth]);
    }

} while (nodeposition[0]<nodelength[0]);


}


function positionMenus() {

//menumainwidth=document.getElementById('navcontainer').clientWidth;
menumainheight=document.getElementById('navcontainer').clientHeight;

// Nav-Left
if (navmode==0) {
	
	for (i=1; i<menuids.length; i++) {

		ofst=0;
		ofsl=0;
		ofsw=0;
		
		menuids[i].style.position="absolute";
	    menuids[i].style.zIndex="10000" + i;
		ofsw=menuids[i].clientWidth;
		menuids[i].style.width=ofsw;
		
		ofst=linkarr[menuparindex[i]].offsetTop;
		ofsl=menuparitem[i].offsetLeft + menuparitem[i].clientWidth;
		
		edgeAdjuster(ofsl,ofst,ofsw,i);
	}
	
// Nav-Right	
} else if (navmode==1) {
	
	for (i=1; i<menuids.length; i++) {
		ofst=0;
		ofsl=0;
		ofsw=0;
		
		menuids[i].style.position="absolute";
		menuids[i].style.zIndex="10000" + i;
		ofsw=menuids[i].clientWidth;
		menuids[i].style.width=ofsw;
		
		ofst=linkarr[menuparindex[i]].offsetTop;
		ofsl=menuparitem[i].offsetLeft - menuids[i].clientWidth;

		edgeAdjuster(ofsl,ofst,ofsw,i);
	}

// Nav-Top
} else if (navmode==2) {
 	
 	for (i=1; i<menuids.length; i++) {
	     ofst=0;
 		 ofsl=0;
 		 ofsw=0;
 		 
    	 menuids[i].style.zIndex="10000" + i;
 		 ofsw=menuparitem[i].clientWidth;
 		 
 		 if (menuparitem[i].offsetParent.id) {
 		 //ofst=menumainheight + 2;
 		 ofst=menuparitem[i].clientHeight;
	     } else {
	     ofst=linkarr[menuparindex[i]].offsetTop;
         ofsl=menuparitem[i].offsetLeft + menuparitem[i].clientWidth;
	     }
	     
	     
	     edgeAdjuster(ofsl,ofst,ofsw,i);
	}
 }

}

function edgeAdjuster(xfs,yfs,wdt,i) {
  
  getPageSizes();
  
        xpg=0;
		ypg=0;
		myobj=menuids[i];
		do {
		xtest = myobj.offsetLeft;
		ytest = myobj.offsetTop;

		if (myobj.offsetLeft>0) xpg += myobj.offsetLeft;
		if (myobj.offsetTop>0) ypg += myobj.offsetTop;
		myobj= myobj.offsetParent;

		} while ((myobj.tagName!="BODY")&&(myobj.tagName!="HTML"));
  
if((navmode==0)||(navmode==2)) {
  if (fldr==0) {
  if ((xpg + xfs + wdt)>xSize) {
  
  if(xpg>wdt) xfs-=wdt*2;
 
  fldr=1;
  }
  } else {
  if ((xpg -xfs)<0) {
  
  fldr=0;
  } else {
  
  xfs-=wdt*2;
  
  }

  }
}

if (navmode==1) {

	 if (fldr==0) {
  if ((xpg + wdt*2)>=xSize) {
   
  fldr=1;
  } else {
  
  xfs+=wdt*2;
  
  }
  
  
  } else {
  if ((xpg-wdt)<=-1) {

  xfs+=wdt*2;
  fldr=0;
  
  }
  
  }

}

  if(navmode==2) {
  
  if(menuids[i].offsetParent.offsetParent.id!="navcontainer") {
  menuids[i].style.left=xfs + "px";
  }
  
  } else {
  
  menuids[i].style.left=xfs + "px";
  }	
  menuids[i].style.top=yfs + "px";
  menuids[i].style.visibility="hidden";
  
}

//--end  function menuSetPositions() --

function getPageSizes() {
	if(typeof(window.innerWidth)=='number') {
    //IE
    xSize=window.innerWidth;
    ySize=window.innerHeight;
  } else if(document.documentElement &&
      (document.documentElement.clientWidth||document.documentElement.clientHeight)) {
    //IE 6 xhtml
    xSize=document.documentElement.clientWidth;
    ySize=document.documentElement.clientHeight;
  } else if(document.body&&(document.body.clientWidth||document.body.clientHeight)) {
    //IE 4 5 or 6 standard
    xSize=document.body.clientWidth;
    ySize=document.body.clientHeight;
  }
}


function processMenus() {
	parseMenus();
	positionMenus();
}

function resetMenus() {
	
	for (i=1; i<menuids.length; i++) {
	
  		menuids[i].style.left= "0px";
 	
	}
	fldr=fldrorg;
	positionMenus();

}

function rollMenu(ref)
{
olx=xSize;
oly=ySize;

getPageSizes();

if ((olx!=xSize)||(oly!=ySize)) resetMenus();

  if(ref>0) {
	clearTimeout(timerID);
	turnOff(ref);
    menuactv=1;
    itemchildren[ref].style.visibility="visible";
    menuparitem[ref].style.zIndex=10000-ref;
    itemchildren[ref].style.zIndex=10000+ref;
  }
  else
  {
    menuactv=0;
    clearTimeout(timerID);
    timerID = setTimeout('turnOff()', 300);
  }
}

function turnOff(ref)
{
 if (menuactv==0) {
   for (i=0; i<itemchildren.length; i++) {
        if ((itemchildren[i]) && (i!=ref)) itemchildren[i].style.visibility="hidden";
   }
  }

}

//-----------
// END SCRIPTS FOR NAV MENUS
//-----------



//var colheightofs = 31;
var colheightofs = 0;
var pngXOffset=0;
var pngYOffset=0;
function sizeColumns() {

if (window.pngHeight) {
	pngHeight();
}

if (!document.getElementById('column1')){
	return;
}

coldvht1=document.getElementById('column1').offsetHeight;
coldvht2= document.getElementById('column2') ? document.getElementById('column2').offsetHeight : 0;
coldvht3=document.getElementById('column3') ? document.getElementById('column3').offsetHeight : 0;


if (coldvht1>coldvht2) coldvht2=coldvht1;
else if (coldvht2>=coldvht1) coldvht1=coldvht2;
if (coldvht3>=coldvht1) 
{
  coldvht1=coldvht3;
  coldvht2=coldvht3;
}
else 
{
  coldvht3=coldvht1;
}

coldvht3=coldvht1;
coldvht2=coldvht1;

document.getElementById('colbody1').style.height = (coldvht1 - colheightofs) + 'px';

	if(document.getElementById('colbody2')) {	
		document.getElementById('colbody2').style.height = (coldvht2 - colheightofs) + 'px';
		return;
	}
	
	if(document.getElementById('colbody3')) {
		document.getElementById('colbody3').style.height = (coldvht3 - colheightofs) + 'px';	
	}
}
