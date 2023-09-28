//YAHOO.util.Event.on(document,'load',readCookie);


//Status Bar Message
function statwords(message){
window.status = message;
return true;
}

//Toggle Display Function
function toggleDisplay(id) {
  if (document.getElementById) {
    var e = document.getElementById(id);
    if (e) {
      if (e.style.display !== "") e.style.display = ""
      else e.style.display = "none"
    }  
  }
}
//Toggle Display Function
function toggleClassName(id, class1, class2) {
  if (document.getElementById) {
    var e = document.getElementById(id);
    if (e) {
      if (e.className !== class1) e.className = class1
      else e.className = class2
    }  
  }
}
//Toggle Display Function
function toggleDisplayorder(id) {
  if (document.getElementById) {
    var e = document.getElementById(id);
    if (e) {
      if (e.style.display !== "" && e.value !== "checked") e.style.display = ""
      else e.style.display = "none"
    }  
  }
}
//Site Manager Login Function
	function get_data(obj)
{

var hostname = obj.host.value;
var password = obj.pass.value;
var username = obj.user.value;
var my_action = 'http://' + hostname + '/+sitemanager';
document.second_post.action = my_action;
document.second_post.username.value = username;
document.second_post.password.value = password;
document.second_post.hostname.value = hostname;
document.second_post.submit();

}

//Form Validation Function
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_validateForm() { //v4.0
  var i,p,q,nm,test,num,min,max,errors='',args=MM_validateForm.arguments;
  for (i=0; i<(args.length-2); i+=3) { test=args[i+2]; val=MM_findObj(args[i]);
    if (val) { nm=val.name; if ((val=val.value)!="") {
      if (test.indexOf('isEmail')!=-1) { p=val.indexOf('@');
        if (p<1 || p==(val.length-1)) errors+='- '+nm+' must contain an e-mail address.\n';
      } else if (test!='R') { num = parseFloat(val);
        if (isNaN(val)) errors+='- '+nm+' must contain a number.\n';
        if (test.indexOf('inRange') != -1) { p=test.indexOf(':');
          min=test.substring(8,p); max=test.substring(p+1);
          if (num<min || max<num) errors+='- '+nm+' must contain a number between '+min+' and '+max+'.\n';
    } } } else if (test.charAt(0) == 'R') errors += '- '+nm+' is required.\n'; }
  } if (errors) alert('The following error(s) occurred:\n'+errors);
  document.MM_returnValue = (errors == '');
}

//Drag script for popup
var Drag = {

	obj : null,

	init : function(o, oRoot, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper)
	{
		o.onmousedown	= Drag.start;

		o.hmode			= bSwapHorzRef ? false : true ;
		o.vmode			= bSwapVertRef ? false : true ;

		o.root = oRoot && oRoot != null ? oRoot : o ;

		if (o.hmode  && isNaN(parseInt(o.root.style.left  ))) o.root.style.left   = document.body.offsetWidth*.3;
		if (o.vmode  && isNaN(parseInt(o.root.style.top   ))) o.root.style.top    = "150px";
		if (!o.hmode && isNaN(parseInt(o.root.style.right ))) o.root.style.right  = "0px";
		if (!o.vmode && isNaN(parseInt(o.root.style.bottom))) o.root.style.bottom = "0px";

		o.minX	= typeof minX != 'undefined' ? minX : null;
		o.minY	= typeof minY != 'undefined' ? minY : null;
		o.maxX	= typeof maxX != 'undefined' ? maxX : null;
		o.maxY	= typeof maxY != 'undefined' ? maxY : null;

		o.xMapper = fXMapper ? fXMapper : null;
		o.yMapper = fYMapper ? fYMapper : null;

		o.root.onDragStart	= new Function();
		o.root.onDragEnd	= new Function();
		o.root.onDrag		= new Function();
	},

	start : function(e)
	{
		var o = Drag.obj = this;
		e = Drag.fixE(e);
		var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom);
		var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right );
		o.root.onDragStart(x, y);

		o.lastMouseX	= e.clientX;
		o.lastMouseY	= e.clientY;

		if (o.hmode) {
			if (o.minX != null)	o.minMouseX	= e.clientX - x + o.minX;
			if (o.maxX != null)	o.maxMouseX	= o.minMouseX + o.maxX - o.minX;
		} else {
			if (o.minX != null) o.maxMouseX = -o.minX + e.clientX + x;
			if (o.maxX != null) o.minMouseX = -o.maxX + e.clientX + x;
		}

		if (o.vmode) {
			if (o.minY != null)	o.minMouseY	= e.clientY - y + o.minY;
			if (o.maxY != null)	o.maxMouseY	= o.minMouseY + o.maxY - o.minY;
		} else {
			if (o.minY != null) o.maxMouseY = -o.minY + e.clientY + y;
			if (o.maxY != null) o.minMouseY = -o.maxY + e.clientY + y;
		}

		document.onmousemove	= Drag.drag;
		document.onmouseup		= Drag.end;

		return false;
	},

	drag : function(e)
	{
		e = Drag.fixE(e);
		var o = Drag.obj;

		var ey	= e.clientY;
		var ex	= e.clientX;
		var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom);
		var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right );
		var nx, ny;

		if (o.minX != null) ex = o.hmode ? Math.max(ex, o.minMouseX) : Math.min(ex, o.maxMouseX);
		if (o.maxX != null) ex = o.hmode ? Math.min(ex, o.maxMouseX) : Math.max(ex, o.minMouseX);
		if (o.minY != null) ey = o.vmode ? Math.max(ey, o.minMouseY) : Math.min(ey, o.maxMouseY);
		if (o.maxY != null) ey = o.vmode ? Math.min(ey, o.maxMouseY) : Math.max(ey, o.minMouseY);

		nx = x + ((ex - o.lastMouseX) * (o.hmode ? 1 : -1));
		ny = y + ((ey - o.lastMouseY) * (o.vmode ? 1 : -1));

		if (o.xMapper)		nx = o.xMapper(y)
		else if (o.yMapper)	ny = o.yMapper(x)

		Drag.obj.root.style[o.hmode ? "left" : "right"] = nx + "px";
		Drag.obj.root.style[o.vmode ? "top" : "bottom"] = ny + "px";
		Drag.obj.lastMouseX	= ex;
		Drag.obj.lastMouseY	= ey;

		Drag.obj.root.onDrag(nx, ny);
		return false;
	},

	end : function()
	{
		document.onmousemove = null;
		document.onmouseup   = null;
		Drag.obj.root.onDragEnd(	parseInt(Drag.obj.root.style[Drag.obj.hmode ? "left" : "right"]), 
									parseInt(Drag.obj.root.style[Drag.obj.vmode ? "top" : "bottom"]));
		Drag.obj = null;
	},

	fixE : function(e)
	{
		if (typeof e == 'undefined') e = window.event;
		if (typeof e.layerX == 'undefined') e.layerX = e.offsetX;
		if (typeof e.layerY == 'undefined') e.layerY = e.offsetY;
		return e;
	}
};
	

// Menu's c/o www.youngpup.net
/*****************************************************
* ypSlideOutMenu
* 3/04/2001
*
* a nice little script to create exclusive, slide-out
* menus for ns4, ns6, mozilla, opera, ie4, ie5 on 
* mac and win32. I've got no linux or unix to test on but 
* it should(?) work... 
*
* Revised:
* - 08/29/2002 : added .hideAll()
*
* --youngpup--
*****************************************************/
ypSlideOutMenu.Registry = []
ypSlideOutMenu.aniLen = 250
ypSlideOutMenu.hideDelay = 200
ypSlideOutMenu.minCPUResolution = 10
// constructor
function ypSlideOutMenu(id, dir, left, top, width, height)
{
this.ie = document.all ? 1 : 0
this.ns4 = document.layers ? 1 : 0
this.dom = document.getElementById ? 1 : 0
if (this.ie || this.ns4 || this.dom) {
this.id = id
this.dir = dir
this.orientation = dir == "left" || dir == "right" ? "h" : "v"
this.dirType = dir == "right" || dir == "down" ? "-" : "+"
this.dim = this.orientation == "h" ? width : height
this.hideTimer = false
this.aniTimer = false
this.open = false
this.over = false
this.startTime = 0
this.gRef = "ypSlideOutMenu_"+id
eval(this.gRef+"=this")
ypSlideOutMenu.Registry[id] = this
var d = document
var strCSS = '<style type="text/css">';
strCSS += '#' + this.id + 'Container { visibility:hidden; '
strCSS += 'left:' + left + 'px; '
strCSS += 'top:' + top + 'px; '
strCSS += 'overflow:hidden; z-index:10000; }'
strCSS += '#' + this.id + 'Container, #' + this.id + 'Content { position:absolute; '
strCSS += 'width:' + width + 'px; '
strCSS += 'height:' + height + 'px; '
strCSS += 'clip:rect(0 ' + width + ' ' + height + ' 0); '
strCSS += '}'
strCSS += '</style>'
d.write(strCSS)
this.load()
}
}
ypSlideOutMenu.prototype.load = function() {
var d = document
var lyrId1 = this.id + "Container"
var lyrId2 = this.id + "Content"
var obj1 = this.dom ? d.getElementById(lyrId1) : this.ie ? d.all[lyrId1] : d.layers[lyrId1]
if (obj1) var obj2 = this.ns4 ? obj1.layers[lyrId2] : this.ie ? d.all[lyrId2] : d.getElementById(lyrId2)
var temp
if (!obj1 || !obj2) window.setTimeout(this.gRef + ".load()", 100)
else {
this.container = obj1
this.menu = obj2
this.style = this.ns4 ? this.menu : this.menu.style
this.homePos = eval("0" + this.dirType + this.dim)
this.outPos = 0
this.accelConst = (this.outPos - this.homePos) / ypSlideOutMenu.aniLen / ypSlideOutMenu.aniLen 
// set event handlers.
if (this.ns4) this.menu.captureEvents(Event.MOUSEOVER | Event.MOUSEOUT);
this.menu.onmouseover = new Function("ypSlideOutMenu.showMenu('" + this.id + "')")
this.menu.onmouseout = new Function("ypSlideOutMenu.hideMenu('" + this.id + "')")
//set initial state
this.endSlide()
}
}
ypSlideOutMenu.showMenu = function(id){
var reg = ypSlideOutMenu.Registry
var obj = ypSlideOutMenu.Registry[id]
if (obj.container) {
obj.over = true
for (menu in reg) if (id != menu) ypSlideOutMenu.hide(menu)
if (obj.hideTimer) { reg[id].hideTimer = window.clearTimeout(reg[id].hideTimer) }
if (!obj.open && !obj.aniTimer) reg[id].startSlide(true)
}
}
ypSlideOutMenu.hideMenu = function(id){
var obj = ypSlideOutMenu.Registry[id]
if (obj.container) {
if (obj.hideTimer) window.clearTimeout(obj.hideTimer)
obj.hideTimer = window.setTimeout("ypSlideOutMenu.hide('" + id + "')", ypSlideOutMenu.hideDelay);
}
}
ypSlideOutMenu.hideAll = function(){
var reg = ypSlideOutMenu.Registry
for (menu in reg) {
ypSlideOutMenu.hide(menu);
if (menu.hideTimer) window.clearTimeout(menu.hideTimer);
}
}
ypSlideOutMenu.hide = function(id){
var obj = ypSlideOutMenu.Registry[id]
obj.over = false
if (obj.hideTimer) window.clearTimeout(obj.hideTimer)
obj.hideTimer = 0
if (obj.open && !obj.aniTimer) obj.startSlide(false)
}
ypSlideOutMenu.prototype.startSlide = function(open) {
this[open ? "onactivate" : "ondeactivate"]()
this.open = open
if (open) this.setVisibility(true)
this.startTime = (new Date()).getTime() 
this.aniTimer = window.setInterval(this.gRef + ".slide()", ypSlideOutMenu.minCPUResolution)
}
ypSlideOutMenu.prototype.slide = function() {
var elapsed = (new Date()).getTime() - this.startTime
if (elapsed > ypSlideOutMenu.aniLen) this.endSlide()
else {
var d = Math.round(Math.pow(ypSlideOutMenu.aniLen-elapsed, 2) * this.accelConst)
if (this.open && this.dirType == "-") d = -d
else if (this.open && this.dirType == "+") d = -d
else if (!this.open && this.dirType == "-") d = -this.dim + d
else d = this.dim + d
this.moveTo(d)
}
}
ypSlideOutMenu.prototype.endSlide = function() {
this.aniTimer = window.clearTimeout(this.aniTimer)
this.moveTo(this.open ? this.outPos : this.homePos)
if (!this.open) this.setVisibility(false)
if ((this.open && !this.over) || (!this.open && this.over)) {
this.startSlide(this.over)
}
}
ypSlideOutMenu.prototype.setVisibility = function(bShow) { 
var s = this.ns4 ? this.container : this.container.style
s.visibility = bShow ? "visible" : "hidden"
}
ypSlideOutMenu.prototype.moveTo = function(p) { 
this.style[this.orientation == "h" ? "left" : "top"] = this.ns4 ? p : p + "px"
}
ypSlideOutMenu.prototype.getPos = function(c) {
return parseInt(this.style[c])
}
ypSlideOutMenu.prototype.onactivate = function() { }
ypSlideOutMenu.prototype.ondeactivate = function() { }

	// Menu configuration Options
	//var myOffset = -310;

		/*
		var myMenu1 = new ypSlideOutMenu("menu1", "down", 0, 100, 102, 200);
		var myMenu2 = new ypSlideOutMenu("menu2", "down", 0, 204, 102, 200);
		var myMenu3 = new ypSlideOutMenu("menu3", "down", 0, 306, 102, 200);
 		*/
 		
 		// the number you pass to initLeft doesn't matter since it will get
		// changed onactivate
		// left, from top, width, height
		
		var myMenu1 = new ypSlideOutMenu("menu1", "down", 0, 141, 150, 400);
		var myMenu2 = new ypSlideOutMenu("menu2", "down", 0, 141, 150, 400);
		var myMenu3 = new ypSlideOutMenu("menu3", "down", 0, 141, 150, 400);
		var myMenu4 = new ypSlideOutMenu("menu4", "down", 0, 141, 150, 400);
		var myMenu5 = new ypSlideOutMenu("menu5", "down", 0, 141, 150, 400);
		var myMenu6 = new ypSlideOutMenu("menu6", "down", 0, 141, 150, 400);

// for each menu, we set up the onactivate event to call repositionMenu with the amount offset from center, in pixels
// This thinks Firefox is Netscape too.

if (navigator.appName == "Netscape"){
	myMenu1.onactivate = function() { repositionMenu(myMenu1, -490); }
	myMenu2.onactivate = function() { repositionMenu(myMenu2, -260); }
	myMenu3.onactivate = function() { repositionMenu(myMenu3, -100); }
	myMenu4.onactivate = function() { repositionMenu(myMenu4, 16); }
	myMenu5.onactivate = function() { repositionMenu(myMenu5, 160); }
	myMenu6.onactivate = function() { repositionMenu(myMenu6, 310); }
} else {
	myMenu1.onactivate = function() { repositionMenu(myMenu1, -490+10); }
	myMenu2.onactivate = function() { repositionMenu(myMenu2, -260+10); }
	myMenu3.onactivate = function() { repositionMenu(myMenu3, -100+10); }
	myMenu4.onactivate = function() { repositionMenu(myMenu4, 16+10); }
	myMenu5.onactivate = function() { repositionMenu(myMenu5, 160+10); }
	myMenu6.onactivate = function() { repositionMenu(myMenu6, 310+10); }
}
    		// this function repositions a menu to the speicified offset from center
		
		function repositionMenu(menu, offset)
		{
      
      		// the new left position should be the center of the window + the offset
		
		var newLeft = getWindowWidth() / 2 + offset;

      		// setting the left position in netscape is a little different than IE
			menu.container.style ? menu.container.style.left = newLeft + "px" : menu.container.left = newLeft;
		}
		 
    		// this function calculates the window's width - different for IE and netscape
		function getWindowWidth()
		{
			return window.innerWidth ? window.innerWidth : document.body.offsetWidth;
		}

function toggleClass(class1, class2){
	if (document.addtestimonial.name.value=='Name' || document.addtestimonial.name.value==''){
		//alert(class1);
		document.addtestimonial.name.className = class1;
	} else {
		//alert (class2);
		document.addtestimonial.name.className = class2;
	}
}
// Sign Up Warning Function

function warn_about_username() {
	alert("Please be sure to choose a different username for OPS then for system usage (ftp, mail, etc...)");
}
//Contact Help Desk popup
function commentPopUp(theURL) {
	window.open(theURL,'comments','scrollbars=yes,resizable=no,width=300,height=200');
}

/*PopUpAdvertisment*/
function getUSObj(name){
  if (document.getElementById) {
    this.obj = document.getElementById(name);
    this.style = document.getElementById(name).style;
  }
  else if (document.all) {
    this.obj = document.all[name];
    this.style = document.all[name].style;
  }
  else if (document.layers) {
    this.obj = document.layers[name];
    this.style = document.layers[name];
  }
}
function hideUSDiv(which)
{
  var x = new getUSObj(which);
  x.style.visibility = 'hidden';
}
function moveUSDiv(which, startx, starty, finishx, finishy, steps, speed)
{
  var x = new getUSObj(which);
  if (steps) {
    stepx = (finishx - startx)/steps;
    stepy = (finishy - starty)/steps;
    steps -= 1;
    x.style.top = starty;
    x.style.left = startx;
    startx=startx+stepx;
    starty=starty+stepy;
    setTimeout("moveUSDiv('"+which+"',"+startx+","+starty+","+finishx+","+finishy+","+steps+","+speed+")",speed);
  }
}
function floatUSDiv(which, startx, starty, finishx, finishy, steps, speed, hangtime)
{
  moveUSDiv(which, startx, starty, finishx, finishy, steps, speed);
  if (hangtime != 0) {
    setTimeout("hideUSDiv('"+which+"')",hangtime*1000);
  }
}
function writeYear(){
now = new Date();
year = now.getYear();
document.write(year);
}


//Show Divs by id
	function revealDiv(div_name) {
		var inDivVar = document.getElementById(div_name);
		if( inDivVar == null ) {
			return false;
		}

		inDivVar.style.display = "block";
		return true;
	}
	
//Hide Divs by id					
	function concealDiv(div_name) {
		var inDivVar = document.getElementById(div_name);
		if( inDivVar == null ) {
			return false;
		}

		inDivVar.style.display = "none";
		return true;
	}
						
//Payment Form Handling Script
	function handleBillForm( paymenttype ) {


		if( !paymenttype ) {
			concealDiv('ccinfo');
			concealDiv('addrinfo');
			return false;
		}
		if( paymenttype == "" ) {
		revealDiv('mailin');
		
		}

		if( paymenttype == "credit_card" ) {
			revealDiv('ccinfo');
			revealDiv('addrinfo');
			
				for (i=0;i<document.forms[0].same_address.length;i++){
							if (document.forms[0].same_address[i].checked){
								user_input = document.forms[0].same_address[i].value;
								if (user_input == "no"){
								revealDiv('sepaddress');
								
								}
							}
						}

			
		}
		else {
			concealDiv('ccinfo');
			concealDiv('addrinfo');
			concealDiv('sepaddress');
		}
	}
						
						
//PopUpScript
function popup(mylink, windowname, width, height)
{
PositionX = 150;
PositionY = 10;
if (! window.focus)return true;
var href;
if (typeof(mylink) == 'string')
   href=mylink;
else
   href=mylink.href;
window.open(href, windowname, 'width='+ width+',height=' + height + ',scrollbars=yes,left='+PositionX+',top='+PositionY);
return false;
}

var allBoxes = ["p1", "p2", "p3"];
function alertCheck(id){

	var e = document.getElementById(id);
	var testid = e.checked;
	for (i=0;i<allBoxes.length;i++)
	{
	testing = allBoxes[i];
	//alert(document.forms[0].allBoxes[i].checked);
		alert(e.checked);
	}
}


 var blink_speed=500;
 var i=0;
 

	 layerStyleRef="layer.style.";
 layerRef="document.getElementById";
 styleSwitch=".style";


//BLINKING
function Blink(layerName){

	  
 if(i%2==0)
 {
/* eval(layerRef+'('+layerName+')'+
 styleSwitch+'.visibility="visible"');*/
document.getElementById(layerName).style.visibility = 'visible';
 }
 else
 {
 /*eval(layerRef+'('+layerName+')'+
 styleSwitch+'.visibility="hidden"');*/
 document.getElementById(layerName).style.visibility = 'hidden';
 }
 
	
 if(i<1)
 {
 i++;
 } 
 else
 {
 i--
 }
 setTimeout("Blink('"+layerName+"')",blink_speed);
}


/*Timer countdown*/

var before=""
var current="CURRENT!!!"
var montharray=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec")

function countdown(yr,m,d){
theyear=yr;themonth=m;theday=d
var today=new Date()
var todayy=today.getYear()
if (todayy < 1000)
todayy+=1900
var todaym=today.getMonth()
var todayd=today.getDate()
var todayh=today.getHours()
var todaymin=today.getMinutes()
var todaysec=today.getSeconds()
var todaystring=montharray[todaym]+" "+todayd+", "+todayy+" "+todayh+":"+todaymin+":"+todaysec
var count2 = document.getElementById('count2');
futurestring=montharray[m-1]+" "+d+", "+yr
dd=Date.parse(futurestring)-Date.parse(todaystring)
dday=Math.floor(dd/(60*60*1000*24)*1)
dhour=Math.floor((dd%(60*60*1000*24))/(60*60*1000)*1)
dmin=Math.floor(((dd%(60*60*1000*24))%(60*60*1000))/(60*1000)*1)
dsec=Math.floor((((dd%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1)
if(dday==0&&dhour==0&&dmin==0&&dsec==0){
window.location.reload();
return
}
else
count2.innerHTML=""+dhour+" hours, "+dmin+" minutes, and "+dsec+" seconds "
setTimeout("countdown(theyear,themonth,theday)",1000)
}

function countdown_lasthour(yr,m,d){
theyear=yr;themonth=m;theday=d
var today=new Date()
var todayy=today.getYear()
if (todayy < 1000)
todayy+=1900
var todaym=today.getMonth()
var todayd=today.getDate()
var todayh=today.getHours()
var todaymin=today.getMinutes()
var todaysec=today.getSeconds()
var todaystring=montharray[todaym]+" "+todayd+", "+todayy+" "+todayh+":"+todaymin+":"+todaysec
var count2 = document.getElementById('count2');
futurestring=montharray[m-1]+" "+d+", "+yr
dd=Date.parse(futurestring)-Date.parse(todaystring)
dday=Math.floor(dd/(60*60*1000*24)*1)
dhour=Math.floor((dd%(60*60*1000*24))/(60*60*1000)*1)
dmin=Math.floor(((dd%(60*60*1000*24))%(60*60*1000))/(60*1000)*1)
dsec=Math.floor((((dd%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1)
if(dday==0&&dhour==0&&dmin==0&&dsec==0){
window.location.reload();
return
}
else
count2.innerHTML=""+dmin+" minutes, and "+dsec+" seconds "
setTimeout("countdown(theyear,themonth,theday)",1000)
}

//function setInputCSS(){
	  // -- get all the input elements in the document
  /* var x=document.getElementsByTagName('input') 	
   
   for (i=0; i<x.length;i++) {
     if (x[i].getAttribute('type')=='checkbox') {
       x[i].className='';
       }
     if (x[i].getAttribute('type')=='radio') {
       x[i].className='';
       }
     if (x[i].getAttribute('type')=='text') {
       x[i].className='input2';
       }
     if (x[i].getAttribute('type')=='submit') {
       x[i].className='buttons';
       }
     if (x[i].getAttribute('type')=='button') {
       x[i].className='buttons';
       }
   }*/

//	}
function highlightField(id, clname){
	var foo = document.getElementById(id);
	var foos = document.getElementById('r'+id);
	if (foos.checked){
		foo.className = clname;
		} else {
			foo.className = '';
			}
	
	}
function clearField(id){
	var foo = document.getElementById(id);
	foo.className = 'quicklinkshead';
	return true;
	}
function altRows(id){
	if(document.getElementById){
	var table = document.getElementById(id);
		if (table){
		var rows = table.getElementsByTagName("tr");
			for(i = 0; i < rows.length; i++){
				
				stripeIt(rows[i], i)
					
			}
		}
	}
	
	
	}
	
function stripeIt(row, i, excp){
	var r = row.childNodes;
	for (var n = 0;n<r.length;n++)
	{
		
			
			if(r[n].tagName == 'TD'){
					if(i % 2 == 0){
						r[n].className = "folderList1";
					} else {
						r[n].className = "folderList2";
					}
				}
				
			
			
	}
	}
function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

	
function alternate(id){
//var id="maintable";
var excp = 'excptable';
	//method = document.methodSelector.selector[document.methodSelector.selector.selectedIndex].value;	
var	method = "doAlternate";
	if(document.getElementById){						//check that browser has capabilities
		var table = document.getElementById(id);		//get just the selected table not all of them
		if (table){
			var rows = table.getElementsByTagName("tr");	//get all table rows
			for(i = 0; i < rows.length; i++){				//alternate styles			
				//manipulate rows	
				if(method == "doAlternate"){
					doAlternate(rows[i], i);
					
				}
				if(method == "doMultiple") doMultiple(rows[i], i, excp);
				if(method == "doGradient") doGradient(rows[i]);
			}
		} 
	}
}
function doAlternate(row, i, excp){
	var r = row.childNodes;
	for (var n = 0;n<r.length;n++)
	{
		if (r[n] != document.getElementById(excp)){
				if(i % 2 == 0){
					r[n].className += " folderList1";
				} else {
					r[n].className += " folderList2";
				}
			}
			
	}
}
function addEvent(obj, evType, fn)
{
	if (obj.addEventListener)
	{
		obj.addEventListener(evType, fn, true);
		return true;
	} 
	else if (obj.attachEvent)
	{
		var r = obj.attachEvent("on"+evType, fn);
		return r;
	} 
	else 
	{
		obj['on'+evType]=fn;
	}
}

function alternateList(id){
	var excp = 'excptable';
	//method = document.methodSelector.selector[document.methodSelector.selector.selectedIndex].value;	
	method = "doAlternate";
	if(document.getElementById){						//check that browser has capabilities
		var ulist = document.getElementById(id);		//get just the selected list not all of them
		if (ulist){
			var rows = ulist.getElementsByTagName("li");	//get all list items
			for(i = 0; i < rows.length; i++){
				if(i % 2 == 0){
					rows[i].className = "folderList1";
				} else {
					rows[i].className = "folderList2";
				}
				
				}
		}
	}
	}

<!--
/*******************
* ©1998-2004 PowWeb, Inc. All Rights Reserved.
* ---------------------------------------------
* All Code Developed by http://www.alterform.com
*
* Author: Nate Cavanaugh
*/
//-->

function hilite( tableIdName, highlightedClassName, eventList) {


	// initialize class variables
	this.containerId            = tableIdName;
	this.tableElement           = document.getElementById(tableIdName);
	this.highlightedClassName   = highlightedClassName;
	this.selectedRow;
	this.selectedRowOriginalClass;
	
	if( this.tableElement == null ) {
		return false;
	}
		
	// Note about copying this.
	// For some reason, browsers complain about using "this" from an anonymous function like
	// the one below.  I think it has something to do with a scoping change when
	// inside of an anonymous function. Thus you have to copt the "this" for use.
	var copyOfThis = this;	
	var action 	= 	function( e ) {
						if( e == null ) {
							e = this.tableElement.ownerDocument.parentWindow.event;
						}
						copyOfThis.mouseover(e);
					}
	
	// add a listener for onmouseover W3C compatable
	if (this.tableElement.addEventListener) {
		for( i=0; i< eventList.length; i++ ) {
			this.tableElement.addEventListener(eventList[i], action, false);
		}
	}
	// add a listener for onmouseover Microsoft IE compatable
	else if (this.tableElement.attachEvent) {
	    for( i=0; i< eventList.length; i++ ) {
			eventName = "on" + eventList[i];
			this.tableElement.attachEvent(eventName, action);
		}
	}
	
	return;
	
}

hilite.prototype.mouseover = function( e ) {
	
	// what node are we over?
	var el;
	if( e.target != null ) {
		el = e.target;
	}
	else {
		el = e.srcElement;
	}
	
	// Move up the tree to the first TAG type node that is not the TABLE parent
	while ( el != null && el.nodeType!=1 && el.parentNode!=this.tableElement ) {
		el = el.parentNode;
	}
	
	if(el == this.tableElement) {
		return false;
	}
	
	//alert("t");
	
	// get the row we are over
	rowEl = this.getCurrentRow(el);
	
	
	if( rowEl == null ) {
		return false;
	}
	
	// we're in the same row, do nothing
	if( rowEl == this.selectedRow ) {
		return false;
	}
	
	// return the currently highlighted row to its original form
	if( this.selectedRow ) {
		this.selectedRow.className = this.selectedRowOriginalClass;
	}
	
	// store the selected row element and its original class
	this.selectedRow              = rowEl;
	// store the selected row class
	this.selectedRowOriginalClass = rowEl.className;
	
	// highlight the current row
	rowEl.className = this.highlightedClassName;
	return;
	
}

hilite.prototype.getCurrentRow = function(el) {
	// cruise up to the TR tag
	//names = el.nodeName + " " + el.id + "\n";
	while ( el != null && el.parentNode.parentNode.id!=this.containerId && el.parentNode != null) {
		el = el.parentNode;
		//names = names + el.nodeName + " " + el.id + "\n";
	}	
	//alert(el.nodeName);
	
	return el;
}
function getSelectedRadio(buttonGroup) {
   // returns the array number of the selected radio button or -1 if no button is selected
   if (buttonGroup[0]) { // if the button group is an array (one button is not an array)
      for (var i=0; i<buttonGroup.length; i++) {
         if (buttonGroup[i].checked) {
            return i
         }
      }
   } else {
      if (buttonGroup.checked) { return 0; } // if the one button is checked, return zero
   }
   // if we get to this point, no radio button is selected
   return -1;
} // Ends the "getSelectedRadio" function


//Restore a form field to visibility and change the associated link
function enableForm(field, showobj, linkname, extobj){
	var theInput = document.getElementById(field);
	if (showobj != null){
		showObj(showobj);
		}
		if (linkname != null){
		document.getElementById(linkname).childNodes[0].nodeValue ='Nevermind';
		}
		if (extobj != null){
		hideObj(extobj);
		
		}
	//theInput.disabled=false;
	showObj(theInput);
	}
	
//Remove a form field from visibility and change the associated link
function disableForm(field, hideobj, linkname, extobj){
	var theInput = document.getElementById(field);
	if (hideobj != null){
		hideObj(hideobj);
		}
		if (linkname != null){
		document.getElementById(linkname).childNodes[0].nodeValue ='Edit';
		}
		if (extobj != null){
		showObj(extobj);
		}
	//theInput.disabled=true;
	hideObj(theInput);
	}
	
//Hide an object
function hideObj(id)
{
	if (typeof id =='object'){
		id.style.display = 'none';
		} else {
			
var x = document.getElementById(id);
  x.style.display = 'none';
	}
}
//Show an object
function showObj(id)
{
	if (typeof id =='object'){
		id.style.display = '';
		} else {
var x = document.getElementById(id);
  x.style.display = '';
		}
}

function changeBC(){
var docloc = document.URL;
var reNRen = /status=non-renew/;
var reARen = /status=active/;
if((docloc.match(reNRen) || docloc.match(reARen)) && document.getElementById('packageContainer')){
Fat.fade_element('bc1');
Fat.fade_element('bc2');
}
	}
 function changeQL(){			  
			  	if(document.getElementById){
			  	var listC = document.getElementById('qlContainer');
				var actLn = document.getElementById('activatorLink');
					if(listC.className == 'listVer'){
					listC.className = '';
					document.cookie = 'qlContainer= ';
					document.cookie = 'lnText=List Version';
					actLn.childNodes[0].nodeValue = 'List Version';
					} else {
					listC.className = 'listVer';
					document.cookie = 'qlContainer=listVer';
					document.cookie = 'lnText=Full Version';
					actLn.childNodes[0].nodeValue = 'Full Version';
					}
					
					
				}
			  }
 function fixActText(){
					if(document.getElementById){
						
					var actLn = document.getElementById('activatorLink');
					
					if(actLn){
					if (getCookie('lnText') !== null){
						if(actLn){
							actLn.childNodes[0].nodeValue = getCookie('lnText');
							}
						
						}
					}
					}
			  }

addEvent(window, 'load', function(){
								  alternate('maintable');
								  alternate('maintable2');
								  alternateList('packageList');
								  alternateList('announcementList');
								  altRows('overGen');
								  changeBC();
								  fixActText()
								  });
addEvent(window, 'load', function(){
								  if (document.getElementById("floater1")){
								 Drag.init(document.getElementById("floater"));
								 if (document.getElementById("daysleft")){
									 //Blink('daysleft');
									 }
								  }
								  });

addEvent(window, 'load', function(){
								  var add_pointer = document.getElementById("addpointer");
								  var change_domain = document.getElementById("changedomain");
								  if (add_pointer){
								add_pointer.style.display  = 'none';
								  }
								  if (change_domain){
									  change_domain.style.display = 'none';
									  }
								  });






//Type checking

function isAlien(a) {
   return isObject(a) && typeof a.constructor != 'function';
}
function isArray(a) {
    return isObject(a) && a.constructor == Array;
}
function isBoolean(a) {
    return typeof a == 'boolean';
}
function isEmpty(o) {
    var i, v;
    if (isObject(o)) {
        for (i in o) {
            v = o[i];
            if (isUndefined(v) && isFunction(v)) {
                return false;
            }
        }
    }
    return true;
}
function isFunction(a) {
    return typeof a == 'function';
}
function isNull(a) {
    return typeof a == 'object' && !a;
}
function isNumber(a) {
    return typeof a == 'number' && isFinite(a);
}
function isObject(a) {
    return (a && typeof a == 'object') || isFunction(a);
}
function isString(a) {
    return typeof a == 'string';
}
function isUndefined(a) {
    return typeof a == 'undefined';
}


