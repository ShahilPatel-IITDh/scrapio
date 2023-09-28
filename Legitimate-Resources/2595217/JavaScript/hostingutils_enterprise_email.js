/*Start: Utility functions */
function getPageSize(){
	
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
}


if (!document.getElementsByClass) document.getElementsByClass = function (searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (var i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
};

function backHis(){
	redirURL = document.referrer;
	window.location.href = redirURL;
}

function setOpacity(elem,value){
	var ov = value * 100;
	elem.style.opacity = (value == 1 || value === '') ? '' : (value < 0.00001) ? 0 : value;
	elem.style.zoom = 1.0;
	elem.style.filter = " progid:DXImageTransform.Microsoft.Alpha(Opacity=" + ov + ")";
};

function getOpacity(elem){
	var value = elem.style.opacity;
	return value ? parseFloat(value): 1.0;
};
function gId(id){
	return document.getElementById(id)
}
//Returns the elements by classname..
function gName(name){
	return document.getElementsByClass(name)
}

function gClass(name){
	return document.getElementsByClass(name)
}

function hasCl(ele,cls){
	var classes = ele.className + ''; 
	if(classes.indexOf(cls) == -1){
		return false;
	}else{
		return true;
	}
}

function hasClass(ele,cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function addClass(ele,cls) {
	if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}
function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}

function isValidDomainName(name){
	var reg = /([a-zA-Z]+:\/\/)?(.+\.)?(\w+)(\.\w+)(:[0-9]+)?(\/.+)?/;
	if(reg.test(name) == false) {
		return false;
	}
	return true;
}
/* Domain name validator for specific domain names... */
function checkdomain(nname, check){
	if (check=="idn"){
		return true;
	}
	if (check=="premium"){
		var arr = new Array(".com", ".org", ".net", ".biz", ".info");
	}else if (check=="basic"){
		var arr = new Array(".in", ".co.in", ".net.in", ".org.in",".edu.in",".ac.in",".co.uk");
	}else if(check=="promotional"){
		var arr = new Array(".in", ".co.in", ".net.in", ".org.in",".edu.in",".ac.in");
	}else{
		var arr = new Array(".in", ".co.in", ".net.in", ".org.in",".com", ".org", ".net", ".biz", ".info",".edu.in",".ac.in",".co.uk",".ae");
	}
	var mai=nname;
	if(isValidStr(mai)){
		var val = true;
		var dot = mai.indexOf(".");
		var dname = mai.substring(0,dot);
		var ext = mai.substring(dot,mai.length);
		if(dot>=1 && dot<57){
			for(var i=0; i<arr.length; i++){
				if(ext == arr[i]){
					val = true;
					break;
				}else{
					val = false;
				}
			}
			if(val == false){
				if (check=="premium"){
					alert("Sorry! '"+ext+"' domain is not available with your pack.\nYou can book a .com, .org, .net, .biz or .info domain.");
				}else if(check=="basic"){
					alert("Sorry! '"+ext+"' domain is not available with your pack.\nYou can book a .in, .co.in, .net.in or .org.in domain.");
				}else if(check=="promotional"){
					alert("Please specify .in, .co.in, .net.in or org.in domains only.");
				}else{
					alert("Sorry! '"+ext+"' domains are not available with us.");
				}
				return false;
			}else{
				for(var j=0; j<dname.length; j++){
					var dh = dname.charAt(j);
					var hh = dh.charCodeAt(0);
					if((hh > 47 && hh<59) || (hh > 64 && hh<91) || (hh > 96 && hh<123) || hh==46 || hh ==45){
						if((j==0 || j==dname.length-1) && hh == 45){
							alert("A domain name cannot begin or end with '-'");
							return false;
						}
					}else{
						alert("Please do not enter any special characters in the domain name.Please enter a valid domain name(eg. yourcompany.in).");
						return false;
					}
				}
			}
		}else{
			
			return false;
		}
	}
	else{
		alert("Please enter a valid domain name(eg. yourcompany.in).");
		return false;
	}  
	return true;
}

function isValidStr(str){
	return !/[~`!#$%\^&*+=\[\]\\;,/{}|\\\'\":<>\?]/g.test(str);
}

function isEmail(email) {
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z0-9\-]{2,20})$/;
	if(reg.test(email) == false) {
		return false;
	}
	return true;
}

function isEmpty(mytext){
	var re = /^\s{1,}$/g;
	if ((mytext.length==0) || (mytext==null) || ((mytext.search(re)) > -1)) {
		return true;
	}else{
		return false;
	}
}

function isValidURL(url)
{
  return url.match(/([a-zA-Z]+:\/\/)?(.+\.)?(\w+)(\.\w+)(:[0-9]+)?(\/.+)?/) ? true : false;
}

function addEvent(obj, ev, fu) {
	if(obj){
		if (obj.attachEvent){
			return obj.attachEvent("on" + ev, fu);
		}else{
			return obj.addEventListener(ev, fu, false);
		}
	}
}

function removeEvent(obj, ev, fu){
	if (obj.detachEvent)
		obj.detachEvent("on" + ev, fu);
	else 
		obj.removeEventListener(ev, fu, false); 
	return true;
}

function toggle(elem){
	elemt = gId(elem);
	if(elemt.style.display == "none" || elemt.style.display == undefined || elemt.style.display == null){
		show(elem);
	}else{
		hide(elem);	
	}
}
/* Slider related functions */
var TINY={};

function T$(i){return document.getElementById(i)}
function T$$(e,p){return p.getElementsByTagName(e)}

TINY.slider=function(){
	function slide(n,p){this.n=n; this.init(p)}
	slide.prototype.init=function(p){
		var s=this.x=T$(p.id), u=this.u=T$$('ul',s)[0], c=this.m=T$$('li',u), l=c.length, i=this.l=this.c=0; this.b=1;
		if(p.navid&&p.activeclass){this.g=T$$('li',T$(p.navid)); this.s=p.activeclass}
		this.a=p.auto||0; this.p=p.resume||0; this.r=p.rewind||0; this.e=p.elastic||false; this.v=p.vertical||0; s.style.overflow='hidden';
		for(i;i<l;i++){if(c[i].parentNode==u){this.l++}}
		if(this.v){;
			u.style.top=0; this.h=p.height||c[0].offsetHeight; u.style.height=(this.l*this.h)+'px'
		}else{
			u.style.left=0; this.w=p.width||c[0].offsetWidth; u.style.width=(this.l*this.w)+'px'
		}
		this.nav(p.position||0);
		if(p.position){this.pos(p.position||0,this.a?1:0,1)}else if(this.a){this.auto()}
		if(p.left){this.sel(p.left)}
		if(p.right){this.sel(p.right)}
	},
	slide.prototype.pause=function(flag){
		if(flag){
			clearInterval(this.x.ai) ;
		}else{
			this.x.ai=setInterval(new Function(this.n+'.move(1,1,1)'),this.a*1000)
		}		
	},
	slide.prototype.auto=function(){
		this.x.ai=setInterval(new Function(this.n+'.move(1,1,1)'),this.a*1000)
	},
	slide.prototype.move=function(d,a){
		var n=this.c+d;
		if(this.r){n=d==1?n==this.l?0:n:n<0?this.l-1:n}
		this.pos(n,a,1)
	},
	slide.prototype.pos=function(p,a,m){
		var v=p; clearInterval(this.x.ai); clearInterval(this.x.si);
		if(!this.r){
			if(m){
				if(p==-1||(p!=0&&Math.abs(p)%this.l==0)){
					this.b++;
					for(var i=0;i<this.l;i++){this.u.appendChild(this.m[i].cloneNode(1))}
					this.v?this.u.style.height=(this.l*this.h*this.b)+'px':this.u.style.width=(this.l*this.w*this.b)+'px';
				}
				if(p==-1||(p<0&&Math.abs(p)%this.l==0)){
					this.v?this.u.style.top=(this.l*this.h*-1)+'px':this.u.style.left=(this.l*this.w*-1)+'px'; v=this.l-1
				}
			}else if(this.c>this.l&&this.b>1){
				v=(this.l*(this.b-1))+p; p=v
			}
		}
		var t=this.v?v*this.h*-1:v*this.w*-1, d=p<this.c?-1:1; this.c=v; var n=this.c%this.l; this.nav(n);
		if(this.e){t=t-(8*d)}
		this.x.si=setInterval(new Function(this.n+'.slide('+t+','+d+',1,'+a+')'),10)
	},
	slide.prototype.nav=function(n){
		if(this.g){for(var i=0;i<this.l;i++){this.g[i].className=i==n?this.s:''}}
	},
	slide.prototype.slide=function(t,d,i,a){
		var o=this.v?parseInt(this.u.style.top):parseInt(this.u.style.left);
		if(o==t){
			clearInterval(this.x.si);
			if(this.e&&i<3){
				this.x.si=setInterval(new Function(this.n+'.slide('+(i==1?t+(12*d):t+(4*d))+','+(i==1?(-1*d):(-1*d))+','+(i==1?2:3)+','+a+')'),10)
			}else{
				if(a||(this.a&&this.p)){this.auto()}
				if(this.b>1&&this.c%this.l==0){this.clear()}
			}
		}else{
			var v=o-Math.ceil(Math.abs(t-o)*.1)*d+'px';
			this.v?this.u.style.top=v:this.u.style.left=v
		}
	},
	slide.prototype.clear=function(){
		var c=T$$('li',this.u), t=i=c.length; this.v?this.u.style.top=0:this.u.style.left=0; this.b=1; this.c=0;
		for(i;i>0;i--){
			var e=c[i-1];
			if(t>this.l&&e.parentNode==this.u){this.u.removeChild(e); t--}
		}
	},
	slide.prototype.sel=function(i){
		var e=T$(i); e.onselectstart=e.onmousedown=function(){return false}
	}
	return{slide:slide}
}();
	
function getStringToXMLObject(str){
	try{
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = "false";
		xmlDoc.loadXML(str);
		return xmlDoc;
	}catch(e){
		try{
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(str,"text/xml");
			return xmlDoc;
		}catch(e){/*alert(e.message);*/}
	}
}

//For money format conversion...
Number.prototype.formatMoney = function(c, d, t){
var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 }
 
String.prototype.backToNumber = function(str){
	return this.split(str).join('') ;
} 
 
function convertMoney(num){
		var newStr = ''
		num = parseInt(num) ;
		newStr = num.formatMoney(0,'.',',') ;
		return newStr ;
}

function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++){
		current = elements[i];
		if(testClass.test(current.className)){
			returnElements.push(current);
		}
	}
	return returnElements;
}


	function getWindowheight(){
		var winH = 0;
		if (typeof(window.innerHeight) == 'number') {
			winH = window.innerHeight+2;
		} else {
			if (document.documentElement && document.documentElement.clientHeight) {
				winH = document.documentElement.clientHeight;
			} else {
				if (document.body && document.body.clientHeight) {
					winH = document.body.clientHeight;
				}
			}
		}
		return winH;
	}
	
	function getWindowwidth(){
		var winW = 0;
		if (typeof(window.innerWidth) == 'number') {
			winW = window.innerWidth-15;
		} else {
			if (document.documentElement && document.documentElement.clientWidth) {
				winW = document.documentElement.clientWidth;
			} else {
				if (document.body && document.body.clientWidth) {
					winW = document.body.clientWidth;
				}
			}
		}
		return winW-22;
	}
	
var domainchoose=0;/* 
0  --> Available
1  --> Choose from one
2  --> Try another domain name
*/
var dom_need=0;

// Select document element
window.$R = function(elem){
	if(!elem) elem=document;
	if(elem.nodeType){
		return elem;
	}
	if(typeof elem == "string")
	return document.getElementById(elem);
};

/* rkit AJAX related utility functions */
// created main object
var rKit = {};

// function to extend any object
rKit.Extend = function(destination, source) {
  for (var property in source) {
    destination[property] = source[property];
  }
  return destination;
};

// function used to bind the values to function.
var AB = function(iterable) {
  if (!iterable) return [];
  if (iterable.split) {
    return iterable.split('');
  } else {
    var results = [];
    for (var i = 0, length = iterable.length; i < length; i++)
      results.push(iterable[i]);
    return results;
  }
};
Function.prototype.bind = function() {
  var __method = this, args = AB(arguments), object = args.shift();
  return function() {
    return __method.apply(object, args.concat(AB(arguments)));
  }
};

rKit.Ajax = {};


rKit.Extend(rKit.Ajax,{
	getTransport : function (){
		try{
			return new XMLHttpRequest();
		}catch(er){
			try{
				return new ActiveXObject('Msxml2.XMLHTTP');
			}catch(err){
				try{
					return new ActiveXObject('Microsoft.XMLHTTP');	
				}catch(errr){
					return false;
				}
			}
		}
	}
});


rKit.Ajax.Request = function(method,url,data,callback){
		this.url =url;
		this.callback = callback;
		this.transport = rKit.Ajax.getTransport();
		this.method=method.toUpperCase();
		if(this.method != "POST" && this.method != "GET"){
			this.method = "GET";
		}
		
		if(data != null && data.length > 0){
			if(this.method=="GET"){
				this.url = this.url +"?"+data;
			}
		}
		try{
			this.transport.open(this.method,url,true);
			this.transport.onreadystatechange = this.onStateChange.bind(this);
			this.setHeader();
			this.transport.send(data);
		}catch(er){ this.callback(""); }

};

rKit.Ajax.Request.prototype = { 
	setHeader: function (){
		var headers = {
			'X-Requested-With': 'XMLHttpRequest',
			'X-rKit-Version': '2.0.1',
			'Accept': 'text/javascript, text/html, application/json, application/xml, text/xml, */*'
		};
		if(this.method == 'POST'){
			headers['Content-Type'] = "application/x-www-form-urlencoded; charset=UTF-8";
			if (this.transport.overrideMimeType && (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0,2005])[1] < 2005)
				headers['Connection'] = 'close';	
		}

		for (var name in headers)
			this.transport.setRequestHeader(name, headers[name]);
	},
	onStateChange: function(){
		if(this.transport.readyState == "4"){
			this.Response(this.transport.responseText);
		}
	},
	Response: function(r){
		this.callback(r);
	}	
};

function getDomainStatus(check){
	var domainname=gId("domainname").value;
	gId("domain_name").value = domainname;

	if(isEmpty(domainname)){
		alert('Please type a domain name (e.g. yourcompanyname.in)');
		return false;
	}else if(!checkdomain(domainname, check)){
		return false;
	}else{
		var domainext=$R("domainext").value;
		var referencenumber=$R("referencenumber").value;
		
		showLB();
		$R("loading").style.display = 'block';
		$R("error_msg").style.display = 'none';	
		var parseSubmitDomainStatusXML = function (res) {
			$R("loading").style.display = 'none';	
			$R("lightbox").style.display = 'none';

			$R("dom").className = "rwf20";
			if (res != "") {
				if(res==-1 || res==-4){
					alert("Invalid domain name.");
					return false;
				}else if(res==-2){
					alert("Sorry! Domain with the extension entered is not available with us.");
					return false;
				}else {
					$R("main_container").innerHTML=res;
				}	
			}else{
				$R("error_msg").style.display = 'block';	
				$R("error_msg").innerHTML="Oops! An error occurred. Please try again.";	
			}
		};
		new rKit.Ajax.Request("POST", "domainstatus", "domainname=" + domainname +"&referencenumber="+referencenumber+"&newdomaincheck="+check, parseSubmitDomainStatusXML)	
	}
}
function searchKeypress(e, type) {
	if (window.event) {
		nowkey = e.keyCode
	} else {
		nowkey = e.which
	}
	if (nowkey == 13) {
		if(type == "domaincheck"){
			getDomainStatus();
		}else if (type == "premium"){
			getDomainStatus("premium");
		}else if (type == "basic"){
			getDomainStatus("basic");
		}else if (type == "XOM"){
			getDomainStatus("XOM");
		}else if (type == "emailsetup"){
			createEmailIdForDomain();
		}else if (type == "setupwebsite"){
			goToSetUpEMailPage();
		}else if(type == "existingdomaincheck"){
			existingDomainCheck();
		}
	}
}
function getId(id){
	    var selectedid=id;
		newselectedid=selectedid.split("_");
		var newid=newselectedid[1]
	    var selecteddomain=$R(newid).value;
		$R("domainname").value=selecteddomain;
		dom_need=selecteddomain;
}
function getDomainSetUpStatus(){
	
	var existingdomain=arguments[0];
	if(!existingdomain){
		existingdomain=0;
		
	}
	$R("loading").innerHTML="";
			$R("loading").innerHTML='<div>Message 1</div><div style="margin: 10px 0 0 0;"><img src="'+APPLICATIONBASEURL+'/pix/progressanim.gif"></div>';
			//alert($R("loading").style.innerHTML)
		$R("loading").style.display = 'block';
		showLB();
		var domainname=$R("domainname").value;
		var referencenumber=$R("referencenumber").value;
			var parseSubmitDomainSetUpStatusXML = function (res) {
				$R("loading").innerHTML='<div>Message 2</div><div style="margin: 10px 0 0 0;"><img src="'+APPLICATIONBASEURL+'/pix/progressanim.gif"></div>';
						/*if (res != "") {
							
							$R("main_container").innerHTML=res;
						}else{
							if($R("error_msg")){
							$R("error_msg").style.display = 'block';	
							$R("error_msg").innerHTML="Error Occured.Please try again";	
							}
						}*/
			 shortpollDomainStatusCheck();  //stop by shankar for time being
			};
			new rKit.Ajax.Request("POST", "setup", "domainname=" + domainname+"&referencenumber="+referencenumber+"&existingdomain="+existingdomain, parseSubmitDomainSetUpStatusXML);		
	
 }

function upgradeDomainStatus(){
	var existingdomain=arguments[0];
	if(!existingdomain){
		existingdomain=0;
		
	}
	var parseSubmitDomainSetUpStatusXML = function(){
		return;
	}
			
	$R("loading").style.display = 'none';
	$R("lightbox").style.display = 'none';
	var domainname=$R("domainname").value;
	var referencenumber=$R("referencenumber").value;
	var buydom = 'yes';
	new rKit.Ajax.Request("POST", "setup", "domainname=" + domainname+"&referencenumber="+referencenumber+"&buydom="+buydom+"&existingdomain="+existingdomain,parseSubmitDomainSetUpStatusXML);		
	
 }
 function existingDomainCheck(){

	
	var domainname=$R("domainname").value;
	var referencenumber=$R("referencenumber").value;
	
	if(isEmpty(domainname)){
		alert('Please type a domain name (e.g. yourcompanyname.in)');
	}else if(!checkdomain(domainname)){
		//alert('Please type a valid domain name (e.g. yourcompanyname.in)')
		return false;
	}else{
			showLB()
			$R("loadingcheck").style.display = 'block';
	
			var parseSubmitExistingDomainSetUpStatusXML = function (res) {
				hide('lightbox') ;
				$R("loadingcheck").style.display = 'none';
						if($R("dom")){
							$R("loading").style.display = 'none';	
							$R("dom").className = " ";
							$R("dom").className = "rwf20";
						}
						if (res != "") {			
							$R("main_container").innerHTML=res;
						}else{
							$R("error_msg").style.display = 'block';	
							$R("error_msg").innerHTML="Oops! An error occurred. Please try again.";	
						}
			};
			new rKit.Ajax.Request("POST", "existingdomaincheck", "domainname=" + domainname+"&referencenumber="+referencenumber, parseSubmitExistingDomainSetUpStatusXML)
	}
			
}
function existingDomainShow(domainname){			
			var referencenumber=$R("referencenumber").value;
			var parseSubmitExistingDomainSetUpStatusXML = function (res) {
						if($R("dom")){
							$R("loading").style.display = 'none';	
							$R("dom").className = " ";
							$R("dom").className = "rwf20";
						}
						if (res != "") {							
							$R("main_container").innerHTML=res;
						}else{
							$R("error_msg").style.display = 'block';	
							$R("error_msg").innerHTML="Oops! An error occurred. Please try again.";	
						}
			};
			new rKit.Ajax.Request("POST", "existingdomaincheck", "domainname=" + domainname+"&referencenumber="+referencenumber, parseSubmitExistingDomainSetUpStatusXML)

}
function createEmailIdForDomain(){

	var mailid,domainname;
	var mailid=$R("emailid").value;
	var domainName=$R("domainname").value;
	if(isEmpty(mailid)){
		alert('Please enter the desired email ID for your domain administrator');
		return false;
	}else if(!isEmail(mailid+'@'+domainName)){
		alert('Please enter valid email ID for your domain administrator');
		return false;
	}else{
		$R("loading").style.display = 'block';
		showLB();
		var referencenumber=$R("referencenumber").value;
		
		//var actualemailid=mailid+'@'+domainname;
		var parseSubmitDomainSetUpStatusXML = function (res) {
			if (res != "") {
				$R("main_container").innerHTML=res;
			}
			
			shortpollEmailStatusCheck();
		};
		new rKit.Ajax.Request("POST", "emailsetupsuccess", "emailid=" + mailid+"&referencenumber="+referencenumber, parseSubmitDomainSetUpStatusXML);
	}
}
function goToSetUpEMailPage(){
	var websitename = $R('websitename');
	if(websitename && isEmpty(websitename.value)){
		alert('Please enter a title for your website e.g. Your Company Name');
	}else{
		document.getElementById("frm").submit();
	}
}
function goToSetUpWebPage(){	
		document.getElementById("frmwebsetup").submit();
}
function choosone(id){
	domainchoose=id;
	if(domainchoose=="2"){
		$R("bookit").style.display = 'none';
		$R("proceed").style.display = 'block';
		$R("domainname").focus();
	}else{
		$R("bookit").style.display = 'block';
		$R("proceed").style.display = 'none';
	}

}

//Function to check website setup status...
function createwebsiteStatus(){

	show('status_2') ;

	var domainname=$R("domainname").value;
	var parseCreateWebsiteSetUpStatusXML = function (res) {
		if (res != "") {
			if(res == '1'){
				window.location.href = "websitetpl?arec=2&tmp_domain_name="+domainname;
			}else{
				setTimeout((function () {
					createwebsiteStatus();
				}), 5000);	
			}
		}else{
			$R("error_msg").style.display = 'block';	
			$R("error_msg").innerHTML="Oops! An error occurred. Please try again.";	
		}
	};
	new rKit.Ajax.Request("POST", "checkwebsitestatus", "tmp_domain_name=" + domainname, parseCreateWebsiteSetUpStatusXML)
}


function createwebsite(){
	var domainname=$R("domainname").value;
	var referencenumber=$R("referencenumber").value;
	var parseCreateWebsiteSetUpStatusXML = function (res) {
						if($R("dom")){
							$R("loading").style.display = 'none';	
							$R("dom").className = " ";
							$R("dom").className = "rwf20";
						}
						if (res != "") {
							
							$R("main_container").innerHTML=res;
						}else{
							$R("error_msg").style.display = 'block';	
							$R("error_msg").innerHTML="Oops! An error occurred. Please try again.";	
						}
	};
	new rKit.Ajax.Request("POST", "createwebsite", "domainname=" + domainname+"&referencenumber="+referencenumber, parseCreateWebsiteSetUpStatusXML)
}

function shortpollDomainStatusCheck(existingdomain, control){
	var ordernumber,domainname;
	var domainname=$R("domainname").value;
	var referencenumber=$R("referencenumber").value;
			var parseSubmitDomainSetUpStatusXML = function (res) {
						if (res != "") {
							var status=res+'';
							if(status=="SUCCESS"){
								$R("loading").style.display = 'none';
								$R("lightbox").style.display = 'none';
								window.location.href = 'emailsetup?referencenumber='+referencenumber+'&existingdomain='+existingdomain+'&control='+control;
							}else if(status=="FAIL"){
								$R("loading").style.display = 'none';
								$R("lightbox").style.display = 'none';
								$R("error_msg").style.display = 'block';	
								$R("error_msg").innerHTML="Domain booking failed.Please try another domain";	
							}else if(status=="PENDING"){
								setTimeout((function () {
									shortpollDomainStatusCheck(existingdomain, control);
								}), 20000);			
							}else{
							   $R("loading").innerHTML='<div>We are checking availability of the domain, please wait</div><div style="margin: 10px 0 0 0;"><img src="'+APPLICATIONBASEURL+'/pix/progressanim.gif"></div>';
							   $R("loading").style.display = 'none';
							   $R("lightbox").style.display = 'none';
								//$R("loading").innerHTML = 'none';
								$R("main_container").innerHTML=res;
							}
						}else{
							hide('loading') ;
							hide('lightbox') ;
							$R("error_msg").style.display = 'block';	
							$R("error_msg").innerHTML="Oops! An error occurred. Please try again.";	
						}
			};
			new rKit.Ajax.Request("POST", "domainsetupstauscheck", "domainname=" + domainname+"&referencenumber="+referencenumber, parseSubmitDomainSetUpStatusXML)	 
}
function repeater(fn,t){
	setInterval(shortpollDomainStatusCheck,10000);
}

function shortpollEmailStatusCheck(){
	var mailid,ordernumber;
	var mailid=$R("emailid").value;
	var referencenumber=$R("referencenumber").value;
	var parseSubmitDomainSetUpStatusXML = function (res) {
					if (res != "") {
						var status=res+'';
						//alert(status)
						if(status=="SUCCESS"){
							window.location.href = 'emailsuccess?emailid='+mailid+'&referencenumber='+referencenumber;
						}else if(status=="PENDING"){
							//alert('here')
							setTimeout((function () {
								shortpollEmailStatusCheck();
							}), 20000);
						}else{
							$R("loading").style.display = 'none';
							$R("lightbox").style.display = 'none';
							$R("main_container").innerHTML=res;
						}
					}else{
						hide("loading");
						hide("lightbox");
						$R("error_msg").style.display = 'block';	
						$R("error_msg").innerHTML="Oops! An error occurred. Please try again.";
					}
					
		};
	new rKit.Ajax.Request("POST", "emailsetupstatuscheck", "emailid=" + mailid+"&referencenumber="+referencenumber, parseSubmitDomainSetUpStatusXML)

}

function isEmpty(mytext){
	var re = /^\s{1,}$/g;
	if ((mytext.length==0) || (mytext==null) || ((mytext.search(re)) > -1)) {
		return true;
	}else{
		return false;
	}
}
		
function show(id,anim,dur){
	if(document.getElementById(id)){
		if(anim == 'slide'){
			$('#'+id).slideDown(dur);
		}else if(anim == 'fade'){
			$('#'+id).fadeIn(dur);
		}else{
			document.getElementById(id).style.display = 'block';
		}
	}
}
function hide(id,anim,dur){
	if(document.getElementById(id)){
		if(anim == 'slide'){
			$('#'+id).slideUp(dur);
		}else if(anim == 'fade'){
			$('#'+id).fadeOut(dur);
		}else{
			document.getElementById(id).style.display = 'none';
		}
	}
}	

function showBuyMail(){
	hide('mail_hidden_container');
	show('mail_detail_container');
	if(gId('mob_hidden_container')){
		removeClass(gId('mob_hidden_container'),'disabled');
		var makeLink = gId('add_mobile');
		makeLink.innerHTML = '<a class="rwa" href="javascript:void(0);" onclick="showBuyMobile();calculatePrice();">Add Mail on Mobile</a>';
	}
}	

function hideBuyMail(){
	show('mail_hidden_container');
	hide('mail_detail_container');
	
	//If enabled
	show('mob_hidden_container');
	hide('mob_detail_container');
	if(gId('mob_hidden_container')){
		addClass(gId('mob_hidden_container'),'disabled');
	}
	var makeLink = gId('add_mobile');
	if(makeLink){
		makeLink.innerHTML = 'Add Mail on Mobile' ;
	}
}	

function showBuyMobile(){
	hide('mob_hidden_container','slide');
	show('mob_detail_container','slide');
	
	//Disable the year option and set it to 1 year...
	//gId('buy_yr_opt').selectedIndex = 0;
	//gId('buy_yr_opt').disabled = true;
}	

function hideBuyMobile(){
	show('mob_hidden_container','slide');
	$('#mob_detail_container').slideUp('slow',function(){calculatePrice(false);});
	
	//Enable the year option and set it to 1 year...
	//gId('buy_yr_opt').selectedIndex = 0;
	//gId('buy_yr_opt').disabled = false;
}
	
function get_radio_value(name){
	var rad_val = '';
	for (var i=0; i < gName(name).length; i++){
	   if (gName(name)[i].checked){
			rad_val = gName(name)[i].value;
		}
	}
	return rad_val;
}

//Change the no. of mail boxes in the mobile options...
function mobileMailOptions(num){
	num = parseInt(num);
	var mobileSelectBox1 = gId('business_mob_opt1');
	//var mobileSelectBox2 = gId('business_mob_opt2');
	var newOption1 = '';
	var newOption2 = '';
	mobileSelectBox1.innerHTML = '';
	//mobileSelectBox2.innerHTML = '';
	for(var i=0; i<num; i++){
		newOption1 = document.createElement('option');
		newOption2 = document.createElement('option');
		newOption1.value = i+1;
		newOption2.value = i+1;
		if(i==0){
			newOption1.innerHTML = (i+1) + ' account';
			newOption2.innerHTML = (i+1) + ' account';
		}else{
			newOption1.innerHTML = (i+1) + ' accounts';
			newOption2.innerHTML = (i+1) + ' accounts';
		}
				
		mobileSelectBox1.appendChild(newOption1);
		//mobileSelectBox2.appendChild(newOption2);
	}
	
	//To highlight the mobile dropdown when redrawn...
	addClass(gId('business_mob_opt1'),'mobile-select-change') ;
	window.setTimeout(function(){removeClass(gId('business_mob_opt1'),'mobile-select-change')},500);
}


//To calculate the price for the NG...
function mobilePriceCalculation(){
	var typeOfMobileMail = '1';//get_radio_value('mobile_mail_type');
	var mobileMailSelect = '';
	var mobilePrice = '';
	var plan = '';
	var num = '';
	
	//What kind of mobile mail service is required by the user...
	if(gId('mob_detail_container').style.display != 'none'){
		if(typeOfMobileMail == '1'){
			//gId('business_mob_opt2').disabled = true;
			gId('business_mob_opt1').disabled = false;
			num = gId('business_mob_opt1').value ;//With data charges
			plan = typeOfMobileMail ;
		}else if(typeOfMobileMail == '2'){
			gId('business_mob_opt1').disabled = true;
			//gId('business_mob_opt2').disabled = false;
			num = gId('business_mob_opt2').value ;//Without data charges
			plan = typeOfMobileMail ;
		}else{
			gId('business_mob_opt1').disabled = true;
			//gId('business_mob_opt2').disabled = true;
			mobilePrice = 0;
		}
	}
	if(plan == '2'){
		mobilePrice = parseInt(get_price('RH-MA-12'));
		
		gId('mobSkuString').value = 'RH-MA-12' ; // Changes for shankar...
		
	}else if(typeOfMobileMail == '1'){
		mobilePrice = parseInt(get_price('RH-MOB-TN-12'));
		
		gId('mobSkuString').value = 'RH-MOB-TN-12' ; // Changes for shankar...
	}else{
		mobilePrice = 0;
		gId('mobSkuString').value = '' ;
	}
	mobilePrice = mobilePrice * parseInt(num);
	
	//For setting the content of the buy cart...(no. of yrs is hardcoded to one...)
	var childEle = document.createElement('div') ;
	childEle.className = 'buynow-cart-content' ;
	if(num > 1){
		childEle.innerHTML = '<div class="rw-buynow-cart rwleft rw15" style="width:150px;">'+num+' mail on mobile accounts</div><div class="rw-buynow-cart rwf12 rwright" style="width:45px;margin:3px 0 0 0;">'+'1 yr'+'</div><div class="rwclear"></div>' ;
	}else{
		childEle.innerHTML = '<div class="rw-buynow-cart rwleft rw15" style="width:150px;">'+num+' mail on mobile account</div><div class="rw-buynow-cart rwf12 rwright" style="width:45px;margin:3px 0 0 0;">'+'1 yr'+'</div><div class="rwclear"></div>' ;
	}
	if(gId('buy_cart')){
		gId('buy_cart').appendChild(childEle) 
	}
	
	return parseInt(mobilePrice);
}

//To update the price when mobile option changed
/* function addMobilePrice(){
	var additionalPrice = mobilePriceCalculation();
	var initialPrice = parseInt(gId('final_price').innerHTML);
	gId('final_price').innerHTML = additionalPrice + initialPrice;
} */


//To calculate the assorted pack price...
//mobileRedraw:false if NG options has to be redrawn
function calculatePrice(mobileRedraw){
	var domainName = get_radio_value('sel_domain');
	var emailId = gId('business_email_opt');
	var mobMail1 = gId('business_mob_opt1');
	var mobMail2 = gId('business_mob_opt2');
	
	if(gId('buy_yr_opt')){
		var noYr = gId('buy_yr_opt');
	}else{
		var noYr = gId('defaultNoYr');
	}
	
	var domSkuString = '';
	var emlSkuString = '';
	var mobSkuString = '';
	var price = "";
	
	if(gId('buy_space_opt')){
		var mailBoxSizeDropDown = gId('buy_space_opt') ;
		var mailBoxSize = gId('buy_space_opt').options[mailBoxSizeDropDown.selectedIndex].innerHTML ;
	}
	
	if(gId('buy_space')){
		var mailBoxSize = gId('buy_space').getAttribute("space") ;
	}
	
	
	//Reset the buy cart HTML... for removing the duplicate entries...
	if(gId('buy_cart')){
		gId('buy_cart').innerHTML = '';
	}
	
	//For the no. of yrs. string calculation...
	var noYears = '';
	if(noYr.value.indexOf('0') == 0){
		noYears = noYr.value.substr(1) ;
	}	
	if(noYears == 1){
		noYears = noYears + ' yr' ;
	}else{
		noYears = noYears + ' yrs'
	}
	
	
		if(gId('mail_detail_container') && gId('mail_detail_container').style.display != "none"){
		//If already has a domain then the global variable to calculate the email sku is different.
		if(domainName != 'ALREADY'){
			if(mailBoxSizeDropDown && mailBoxSizeDropDown.value != ''){
				emlSkuString = EMLSKU + emailId.value + '-'+mailBoxSizeDropDown.value +'-'+noYr.value;
			}else{
				emlSkuString = EMLSKU + emailId.value + '-' + noYr.value;
			}
			
		}else{
			if(mailBoxSizeDropDown && mailBoxSizeDropDown.value != ''){
				emlSkuString = ALREADYDOMSKU + emailId.value + '-'+mailBoxSizeDropDown.value +'-'+noYr.value;
			}else{
				emlSkuString = ALREADYDOMSKU + emailId.value + '-' + noYr.value;
			}
		}
		
		//VARIABLES USED TO SET THE BUY CART STRINGS...
		var emailString = '';
		if(emailId.value.indexOf('MOB-TN') > 0){
			emailString = emailId.options[emailId.selectedIndex].text ;
		}else{
			emailString = emailId.value + ' mail IDs of ' + mailBoxSize;
		}
		
		//Setting the email part of the buy cart...
		var childEle = document.createElement('div') ;
		childEle.className = 'buynow-cart-content1' ;
		childEle.innerHTML = '<div class="rw-buynow-cart rwleft rw15" style="width:150px;">'+emailString+'</div><div class="rw-buynow-cart rwf12 rwright" style="width:45px;margin:3px 0 0 0;">'+noYears+'</div><div class="rwclear"></div>' ;
		if(gId('buy_cart')){
			gId('buy_cart').appendChild(childEle) ;
		}
	}
	
	//IF ALREADY then domain SKU is not required...
	if(domainName != '' && domainName != 'ALREADY'){
		domSkuString = domainName + '-' + noYr.value;
		
		
		//Setting the domain part of the buy cart...
			if(domainName.indexOf('DOMINNIXI') != -1){
				var domainString = 'Domain name' ;
			}else{
				var domainString =  'Domain name' ;
			}
			
			var childEleDom = document.createElement('div') ;
			childEleDom.className = 'buynow-cart-content' ;
			childEleDom.innerHTML = '<div class="rw-buynow-cart rwleft rw15" style="width:150px;">'+domainString+'</div><div class="rw-buynow-cart rwf12 rwright" style="width:45px;margin:3px 0 0 0;">'+noYears+'</div><div class="rwclear"></div>' ;
			if(gId('buy_cart')){
				gId('buy_cart').appendChild(childEleDom) ;
			}
			
	}
	
	
	//For domain Name
	if(domainName == ''){
		price = 0;	
		gId('domSkuString').value = ''; //changes done by shankar
	}else{
		price = parseInt(get_price(domSkuString));
		gId('domSkuString').value = domSkuString; //changes done by shankar
	}
	
	//For email ID's
	if(emlSkuString !=''){
		price += parseInt(get_price(emlSkuString));
		gId('emlSkuString').value = emlSkuString; //changes done by shankar
	}else{
		price +=0;
		gId('emlSkuString').value = ''; //changes done by shankar
	}
	
	//For mobile services...
	if(mobSkuString != ''){
		price += parseInt(get_price(mobSkuString))
	}else{
		price +=0;
	}

	//For drawing the mobile mail select button...
	if(gId('mob_detail_container') && gId('mob_detail_container').style.display != 'none'){
		if(!mobileRedraw){
			if(emailId){
				mobileMailOptions(emailId.value);
			}
		}
		var mobilePrice = mobilePriceCalculation();
	}
	
	//Total cost of the plans...
	if(mobilePrice){
		price += mobilePrice;
	}else{
		price += 0;
		gId('mobSkuString').value = ''  //changes done by shankar

		// Buy additional mail on mobile accounts - 
	}
	
	price = convertMoney(price) ;	
	
	gId('final_price').innerHTML = price;
}			

//For the renewal tab..
function calculateIndRenew(){
	var checkBoxes      = gName('renew_check');
	var hiddenFields    = gName('renew_hidden');
	var hiddenBoxFields = gName('renew_hidden_mbox');
	var noYr = gName('renew_yr_opt');
	var ngBox = gName('renew_ngboxes');
	var skuString = '';
	var totalPrice = 0;
	var price  = 0;
	var mbox   = 1;
	var renewSelected = false;
	for(var i=0; i<checkBoxes.length; i++){
		// Calculate the SKU string from the hidden textfield
		if(noYr[i].value < 10)
		{
		  noYear = parseInt(noYr[i].value,10);
		  noYear = "0"+noYear;
		}else{
		  noYear = noYr[i].value;
		}

		mbox = hiddenBoxFields[i].value; 
		mbox = (mbox > 0)?mbox:1;
		
		skuString = hiddenFields[i].value + noYear;
		if( hiddenFields[i].value.indexOf('MOB-TN') > 0 &&  ((hiddenFields[i].value.indexOf('EML')==-1) && (hiddenFields[i].value.indexOf('AMB')==-1))){
		    oldnoYear = 12;
			noYear    = 1;
			skuString = hiddenFields[i].value + '12';
		}
		else if( hiddenFields[i].value.indexOf('ECA') > 0 ){
		    oldnoYear = '01';
			noYear    = '01';
		  skuString = hiddenFields[i].value + noYear;
		}
		else if(hiddenFields[i].value.indexOf('REDEEM') > 0 )
		{
		   noYear    = 1;
		   oldnoYear = 1;
  	       skuString = hiddenFields[i].value+noYear;
		}
		else
		{
		   oldnoYear = '01';

		}
		var oldskustring = hiddenFields[i].value + oldnoYear;
		//Get the price from SKU.js
		price    = parseInt(get_price(skuString));	
		// discount part implement	
		oldprice = parseInt(get_price(oldskustring)) * noYear ; 
		var price_diff  = oldprice - price;
		$("#indi_pack_blank_"+i).hide();
		$("#indi_pack_"+i).show();
		if(price_diff <= 0)
		{
		  discount =0;
		  $("#old_price_"+i).hide();
		  $("#offer_price_"+i).html("0 %<br>Off").removeClass("discount-class").addClass('discount-greyclass');
		  if(hiddenFields[i].value.indexOf('EML')>0)
		  {
		    $("#offer_price_"+i).addClass('discount-imgclass');
		  }
		}else
		{
			
			discount = Math.round((price_diff*100)/(oldprice));
		    $("#old_price_"+i).show();
			$("#offer_price_"+i).html(discount+" %<br>Off").addClass("discount-class").removeClass("discount-greyclass").removeClass('discount-imgclass');
			$("#old_price_"+i).addClass("strikethrough");
			$("#old_price_"+i).html("Rs. "+oldprice);
			$('#indi_'+i).show();
		}
		
		
		//In case og NG boxes the price has to be multiplied by the no. of NG boxes.
		if(ngBox[i].value != ''){
			price = price*(ngBox[i].value);
		}
		//Display the price
		$('#individual_price'+i).show();
		var iDisplayYearSel=parseInt(noYear,10);
		var sDisplayYearText="";
		if(iDisplayYearSel==1){
			sDisplayYearText="For "+iDisplayYearSel+" year";
		}else {
			sDisplayYearText="For "+iDisplayYearSel+" years";
		}
		gId('individual_year_label'+i).innerHTML = sDisplayYearText;
		if(price>0){
			gId('individual_price'+i).innerHTML = convertMoney(price);
			$("#individual_year_label"+i).show(); 
		}else {
			gId('individual_price'+i).innerHTML="FREE with email";
			$("#individual_year_label"+i).hide(); 
		}	
		$('#individual_price'+i).addClass('bld');
		calculateTotalRenew();
	}
}
//To calculate the total renewal price			
function calculateTotalRenew(){
	var checkBoxes = gName('renew_check');
	var hiddenFields = gName('renew_hidden');
	var noYr = gName('renew_yr_opt');
	var skuString = '';
	var totalPrice = 0;
	var price  = 0;
	var renewSelected = false;
	var count = 0;
	gId('renew_cart').innerHTML = '' ;
	
	for(var i=0; i<checkBoxes.length; i++){
	if(noYr[i].value < 10)
	{
	  noYear = parseInt(noYr[i].value);
	  noYear = "0"+noYear;
	}
		if(checkBoxes[i].checked){
		if( hiddenFields[i].value.indexOf('MOB-TN') > 0 &&  ((hiddenFields[i].value.indexOf('EML')==-1) && (hiddenFields[i].value.indexOf('AMB')==-1))){
		noYear = 12;
		}
		else if(hiddenFields[i].value.indexOf('REDEEM') > 0 )
		{
		   noYear    = 1;
		   oldnoYear = 1;
		}
			skuString = hiddenFields[i].value + noYear;
			price = parseInt(gId('individual_price'+i).innerHTML.backToNumber(','));
			if(isNaN(price)){
				price=0;
			}
			count++;
			totalPrice +=  price
			
			skuid = 'renew_hidden_text_'+i; //changes done by shankar
			gId(skuid).value = skuString; //changes done by shankar
			
			
			//Setting the renew right div content
			var renewContent = gId('renew_container'+[i]).innerHTML;
			var renewYear = gName('renew_yr_opt')[i].value;
			if(gName('renew_yr_opt')[i].value < 10)
			{
			  renewYear = "0"+gName('renew_yr_opt')[i].value;
			}
			//To make 01yr to 1yr...
			var noYears = renewYear;
			if(renewYear.indexOf('0') == 0){
				var noYears = renewYear.substr(1) ;
			}
			
			noYears = parseInt(noYears) ;
			if(skuString.indexOf('MOB-TN') > 0 && skuString.indexOf('EML')==-1){
				if(noYears == 1){
				noYears = noYears + ' mth' ;
				}else{
					noYears = noYears + ' mths'
				}
			}else{
				if(noYears == 1){
				noYears = noYears + ' yr' ;
				}else{
					noYears = noYears + ' yrs'
				}
			}
			var childEle = document.createElement('div') ;
			childEle.className = 'buynow-cart-content' ;
			childEle.innerHTML = '<div class="rw-buynow-cart rwleft rw15" style="width:140px;">'+renewContent+'</div><div class="rw-buynow-cart rwf12 rwright" style="width:45px;margin:3px 0 0 0;">'+noYears+'</div><div class="rwclear"></div>' ;
			
			gId('renew_cart').appendChild(childEle) ;
		}else{
			skuid = 'renew_hidden_text_'+i; //changes done by shankar
			gId(skuid).value = ''; //changes done by shankar
		}
	}
	
	//If no services selected for renewal...
	if(totalPrice == 0){
		hide('renew_price') ;
		show('no_renew_price') ;
		hide('total_price');
		//hide('renew_all') ;
		removeClass(gId('renew_but_bot'),'button');
		addClass(gId('renew_but_bot'),'grey-button');
	}else{
		//show('renew_all') ;
		show('total_price');
		hide('no_renew_price') ;
		show('renew_price') ;
		gId('renew_price').innerHTML = 'Rs '+convertMoney(totalPrice)+' only';
		if(gId('renew_price_mobile')!=undefined) {
			gId('renew_price_mobile').innerHTML = 'Rs '+convertMoney(totalPrice)+' only';
		}
		
		removeClass(gId('renew_but_bot'),'grey-button');
		addClass(gId('renew_but_bot'),'button');
	}
}
			
//Renew all services...
function renewAll(){
	var renewAll = gId('renew_all');
	var checkBoxes = gName('renew_check');
	for(var i=0; i<checkBoxes.length; i++){
		if(renewAll.checked){
			checkBoxes[i].checked = true;
		}else{
			checkBoxes[i].checked = false;
		}
	}
	
	calculateIndRenew();
}

//For single renewal button...
function renewSingle(obj,obj2){
	var hiddenFields = gName('renew_hidden');
	var noYr = gName('renew_yr_opt');
	
	skuString = hiddenFields[obj].value + noYr[obj].value;
	
	skuid = 'renew_hidden_text_'+obj; //changes done by shankar
	gId(skuid).value = skuString; //changes done by shankar
	
	if(!hasClass(obj2,'grey-button')){
		renewcart(obj);
	}
}

//To check if the renew all button is enabled...Otherwise no action onclick.
function renewcartCall(id,obj){
	if(!hasClass(obj,'grey-button')){
		renewcart(id);
	}
}

//Already existing domain name in case of buydom...
function alreadeExistingDomain(obj){
	if(obj.checked){
		show('existing_domain_name');	
	}else{
		hide('existing_domain_name');
	}
	
}

//Fire the function on the basis of which radio button is selected for buydom page...
function checkedDomainRadio(obj){
	if(obj.id=='sel_domain3'){
		hide('domain_verified','fade');
		hide('green_tick','fade');
		show('verify_but','fade');
		alreadeExistingDomain(obj);
		calculatePrice(true);
		removeClass(gId('buy_but'),'button');
		addClass(gId('buy_but'),'grey-button');
	}else{
		calculatePrice(true);
		hide('existing_domain_name','fade');
		removeClass(gId('buy_but'),'grey-button');
		addClass(gId('buy_but'),'button');
	}
}

//Fire the function on the basis of which radio button is selected for buynow page...
function checkedDomainRadioNow(obj){
	if(obj.id=='SEL_NODOM'){
		hide('domain_verified','fade');
		hide('green_tick','fade');
		show('verify_but','fade');
		alreadeExistingDomain(obj);
		removeClass(gId('buy_but'),'button');
		addClass(gId('buy_but'),'grey-button');
	}else{
		hide('existing_domain_name','fade');
		removeClass(gId('buy_but'),'grey-button');
		addClass(gId('buy_but'),'button');
	}
	if (document.getElementById("totalPrice")){
		 if(obj.value=="DISC"){
			document.getElementById("totalPrice").innerHTML = convertMoney(parseInt(get_price(init_sku+"-"+obj.value+"-01")));
		}else if (obj.value!="NODOM"){
			document.getElementById("totalPrice").innerHTML = convertMoney(parseInt(get_price(init_sku+"-"+obj.value+"-01")));
		}else{
			document.getElementById("totalPrice").innerHTML = convertMoney(parseInt(get_price(init_sku+"-01")));
		}
	}
}

//To submit the current form with name passed
function formSubmit(id,obj){
	if(!hasCl(obj,'grey-button')){
		gId(id).submit();
	}else{
		return false;
	}
}

//To verify the users domain exist or not
function verifyAlreadyExistDomain(){
	showLB();
	show('who_is');
}



//Purchase domain related functions:

function changeDomainRadio(){
	//Change the button visiblity...
	choosone(1);
	
	var domainName = get_radio_value('dom_rad');
	//gId("domainname").value=domainName;
	var domArr = domainName.split('.');
	var webPro = gId('webpro').value;
	var existingdomain = gId('existingdomain').value
	var referencenumber=gId("referencenumber").value;
	var buydom = 'yes';
	//Change the button on the basis of the domain selected...
	//console.log(domArr[domArr.length-1]);
	if(domArr[domArr.length-1].toLowerCase() != 'in' && webPro == '1'){
		//gId('bookit_but').innerHTML = '&nbsp;Buy it now&nbsp;&raquo;&nbsp;' ;
		gId('bookit_but').setAttribute ("onclick", "window.location.href='"+APPLICATIONBASEURL+"/setup?domainname="+domainName+"&referencenumber="+referencenumber+"&buydom="+buydom+"&existingdomain=existingdomain';");
	}else{
		//gId('bookit_but').innerHTML = '&nbsp;Book it now&nbsp;&raquo;&nbsp;' ;
		gId('bookit_but').setAttribute ("onclick", "window.location.href='"+APPLICATIONBASEURL+"/verifysetup?domainname="+domainName+"&referencenumber="+referencenumber+"&buydom="+buydom+"&existingdomain="+existingdomain+"';");
	}
	
}

function getAnotherDomainPrice(available){
	var checkBoxes = gName('another_domain');
	var checkBoxLabel = gName('another_dom_label');
	var tld = '';
	var str  = '';
	var totalPrice = 0;
	var price = 0;
	var noYears = '';
	var totalSel = false;
	//For no. of years...
	if(gId('buy_yr_opt')){
		noYears = gId('buy_yr_opt').value ;
	}

	//To set the domain price and SKU of the domain name entered by the user...
	if(gId('hidden_sku')){
		var initialSKU = gId('hidden_sku').value+'-'+noYears;
		$("#searched_sku").val($('#hidden_sku').val()+'-'+noYears);
		totalPrice = parseInt(get_price(initialSKU)) ;
	}
	/*if(available){
		gName('sku')[checkBoxes.length].value = initialSKU;
	}*/
	
	for(var id=0; id<checkBoxes.length; id++){
		if(checkBoxes[id].checked){
			totalSel = true ;
			gName('domain')[id].value = checkBoxLabel[id].innerHTML;
			tld =  checkBoxLabel[id].innerHTML.split('.').splice(1,checkBoxLabel[id].innerHTML.split('.').length).join('.') ;
			if(tld=="in" ){
				str="DOMINNIXI";
				skuString = 'RH-'+str+'-'+noYears
				 gName('sku')[id].value = skuString;
				price = parseInt(get_price(skuString));
			}else if(tld=="co.in" || tld=="net.in" || tld=="org.in"){
				str="DOMNIXI";
				skuString = 'RH-'+str+'-'+noYears ;
				gName('sku')[id].value = skuString;
				price = parseInt(get_price(skuString));
			}else{
				str="DOM";
				skuString = 'RH-'+str+'-'+noYears ;
				gName('sku')[id].value = skuString;
				price = parseInt(get_price(skuString));
			}
			totalPrice += price;
		}else{
			gName('domain')[id].value = '';
			gName('sku')[id].value = '';
		}
	}
	if(!totalSel && !available){
		removeClass(gId('buy_but'),'button');
		$("#buy_but").attr("disabled", "disabled");
		addClass(gId('buy_but'),'grey-button');
	}else{
		removeClass(gId('buy_but'),'grey-button');
		$("#buy_but").removeAttr("disabled");
		addClass(gId('buy_but'),'button');
	}

	gId('dom_price').innerHTML = convertMoney(totalPrice) ;
}

/* function getAnotherDomainPrice(id){
	var checkBoxes = gName('another_domain');
	var checkBoxLabel = gName('another_dom_label');
	var tld = '';
	var str  = '';
	var totalPrice = 0;
	var price = 0;
	
	if(gId('dom_price')){
		totalPrice = parseInt(gId('dom_price').innerHTML) ;
	}
	
	id = parseInt(id)-1 ;
	
	gName('domain[]')[id].value = checkBoxLabel[id].innerHTML;
	tld =  checkBoxLabel[id].innerHTML.split('.').splice(1).join('.') ;	
		
	if(tld=="in" ){
		str="DOMINNIXI";
		skuString = 'RH-'+str+'-01'
		 gName('sku[]')[id].value = skuString;
		price = parseInt(get_price(skuString));
	}else if(tld=="co.in" || tld=="net.in" || tld=="org.in"){
		str="DOMNIXI";
		skuString = 'RH-'+str+'-01';
		gName('sku[]')[id].value = skuString;
		price = parseInt(get_price(skuString));
	}else{
		str="DOM";
		skuString = 'RH-'+str+'-01';
		gName('sku[]')[id].value = skuString;
		price = parseInt(get_price(skuString));
	}
	
	if(checkBoxes[id].checked){
		totalPrice += price;
	}else{
		totalPrice -= price;
	}
		
	//For no. of years...
	var noYears = parseInt(gId('buy_yr_opt').value)
	totalPrice = totalPrice*noYears ;

	gId('dom_price').innerHTML = totalPrice ;
} */

function resetWhoIS(domain){
	removeClass(gId('accept_agreement'),'button');
	addClass(gId('accept_agreement'),'grey-button');
	hide('domain_confirm_cont') ;
	gId('try_another').innerHTML = 'Close' ;
	gId('message').style.color = '#000000' ;
	gId('message').value = 'Loading, please wait...';
	gId('domain_name_confirm').innerHTML = domain;
}

//For showing the Whois for an already existing domain...
function verifyAlreadyExistDomainWhoIs(obj){
	if(isValidURL(gId('domainname').value)){
		var domain = document.getElementById('domainname').value;		
		resetWhoIS(domain);
		showLB();
		show('who_is','fadein','slow');
		gId('accept_agreement').focus();
		//For removing WWW if present...
		if (domain.indexOf("www.")==0){
			domain = domain.substr(4);
		}
		
		document.getElementById('domain_name').value = domain;
		getData(SITE_ROOT,domain)
		return false;
	}else{
		alert('Please type a valid domain name (e.g. yourcompanyname.in)');
		return false ;
	}
}

function getData(obj,domain){
	var parseSubmitDomainSetUpStatusXML = function (res) {
		if(res != ""){
			content=getStringToXMLObject(res);
			for (var i=0,nodeLen=content.childNodes.length;i<nodeLen;i++){
				if (content.childNodes[i].nodeType==1){
					gId('domain_name_confirm').innerHTML = gId('domain_name_confirm2').innerHTML = domain;
					gId('message').value = content.childNodes[i].childNodes[1].childNodes[0].nodeValue;
					//Set the global variable to calculate the price if domain already present.
					ALREADYDOMSKU = content.childNodes[i].childNodes[2].childNodes[0].nodeValue;
					alreadyExists = content.childNodes[i].childNodes[3].childNodes[0].nodeValue;
				}
			}
			
			if(alreadyExists == '1'){
				removeClass(gId('accept_agreement'),'button');
				addClass(gId('accept_agreement'),'grey-button');
				gId('try_another').innerHTML = 'Please try another domain' ;
				gId('message').style.color = '#000000' ;
				hide('domain_confirm_cont') ;
			}else if(alreadyExists == '2'){
				removeClass(gId('accept_agreement'),'button');
				addClass(gId('accept_agreement'),'grey-button');
				gId('try_another').innerHTML = 'Please try another domain' ;
				gId('message').style.color = '#CD0000' ;
				hide('domain_confirm_cont') ;
			}else{
				removeClass(gId('accept_agreement'),'grey-button');
				addClass(gId('accept_agreement'),'button');
				gId('try_another').innerHTML = 'No! this is not my domain' ;
				gId('message').style.color = '#000000' ;
				show('domain_confirm_cont') ;
			}
		}else{
			gId('message').value = "An error has occured. Please try again..." ;
			removeClass(gId('accept_agreement'),'button');
			addClass(gId('accept_agreement'),'grey-button');
			gId('try_another').innerHTML = 'Please try again' ;
			gId('message').style.color = '#000000' ;
			hide('domain_confirm_cont') ;
		}
	};
	new rKit.Ajax.Request("POST", "whois", "domain_name=" + domain, parseSubmitDomainSetUpStatusXML);
}

//If the user accepts the agreement...
function acceptAgreement(str){
	if(!hasCl(gId('accept_agreement'),'grey-button')){
		hide('lightbox','fade');
		hide('iFrame','fade');
		hide('who_is','fade');
		hide('verify_but','fade');
		show('green_tick','fade');
		show('domain_verified','fade') ;
		removeClass(gId('buy_but'),'grey-button');
		addClass(gId('buy_but'),'button');	
		if(str != 'buynow'){
			calculatePrice(true) ;
		}
	}
}

function verifyDomain(obj){
	hide('green_tick','fade');
	show('verify_but','fade');
	hide('domain_verified','fade') ;
	removeClass(gId('buy_but'),'button');
	addClass(gId('buy_but'),'grey-button');
}

//For the show details link on the control page...
function splitDetails(id1,id2,id3,count,obj){
	var total = id1+count;
	var split1 = id2+count;
	var split2 = id3+count;
	if(obj.innerHTML == 'Details'){
		obj.innerHTML = 'Hide';
		hide(total,'slide');
		show(split1,'slide');
		show(split2,'slide');
	}else{
		obj.innerHTML = 'Details' ;
		hide(split1,'slide');
		hide(split2,'slide');
		show(total,'slide');
	}
}

//For checking the keyword availability...
function checkKeyWordAvailaibilty(){
	var keywordInput =  document.getElementById('keyword_input').value ;
	
	var parseKeyWordAvailability = function(res){
		if(res == 'Keyword Available'){
			hide('avail_but');
			show('green_tick');
			show('green_text');
			removeClass(gId('save_but'),'grey-button');
			addClass(gId('save_but'),'button');
			//gId('save_but').setAttribute('onclick',"document.buynow.submit();")
		}else{
			hide('avail_but');
			show('red_cross');
			show('red_text');
			removeClass(gId('save_but'),'button');
			addClass(gId('save_but'),'grey-button');
			//gId('save_but').setAttribute('onclick',"")
		}
	}
	new rKit.Ajax.Request("POST", "searchkeywords", "keyword=" + keywordInput,parseKeyWordAvailability);
}

function changeCheckAvailaibilty(){
	hide('green_tick');
	hide('green_text');
	hide('red_cross');
	hide('red_text');
	show('avail_but');
	removeClass(gId('save_but'),'button');
	addClass(gId('save_but'),'grey-button');
	//gId('save_but').setAttribute('onclick',"")
}

//To validate the domain name....and submit the form if correct...
function getOnlyDomain(frm){
	var completeDomainName =  gId('domainname').value;
	if(checkdomain(completeDomainName)){
		show('loading','fadein','slow');
		showLB();
		return true;
	}else{
		//alert('Please type a valid domain name (e.g. yourcompanyname.in)');
		gId('domainname').focus();
		return false;
	}
}

//Shortpoll ajax request for the payment page...
var startPoll;
var stopPoll = false;
function startPaymentShortPoll(){
	if(!stopPoll){
		startPoll = window.setTimeout("ajaxPaymentRequest()",10000) ;
	}else{
		return ;
	}
}

function ajaxPaymentRequest(){

	//To show the loader image...
	if(gId('status_2')){
		hide('status_3') ;
		show('status_2') ;
	}

	var orderNo = gId('order_no').value; 
	var paymentProcessCheck = function(res){
		if(res == 'Succcess-bookinginprogress'){
			stopPoll = true;
			clearTimeout(startPoll);
			window.location = APPLICATIONBASEURL+'/poll-order?orderid='+orderNo;
		}else if(res == 'Succcess' || res == 'SucccessControl'){
			stopPoll = true;
			clearTimeout(startPoll);
			window.location = APPLICATIONBASEURL+'/control' ;
		}else if(res == 'Approved'){
			stopPoll = true;
			clearTimeout(startPoll);
			window.location = APPLICATIONBASEURL+'/purchase?status=yes&order_no='+orderNo ;
		}else if(res == 'Cancelled'){
			stopPoll = true;
			clearTimeout(startPoll);
			window.location = APPLICATIONBASEURL+'/ordererror?error='+res ;
		}else if(res == 'Declined'){
			stopPoll = true;
			clearTimeout(startPoll);
			window.location = APPLICATIONBASEURL+'/ordererror?error='+res ;
		}else if(res == 'Registered'){
			show('status_3') ;
			hide('status_2') ;
			startPaymentShortPoll();
			//window.location = 'http://businessemail.rediff.com/ordererror?error='+res ;
		}else if(res == 'IdentifiedUser'){
			show('status_4') ;
			hide('status_2') ;
			stopPoll = true;
			clearTimeout(startPoll);
		}else{
			show('status_3') ;
			hide('status_2') ;
			startPaymentShortPoll();
		}
	}
	new rKit.Ajax.Request("POST", "checkstatus", "order_no=" + orderNo,paymentProcessCheck);
}

/* For whois form.. */
var whoisForm = {
	validateWhoIs: function(){
		if(gId('org_fname') && isEmpty(gId('org_fname').value)){
			alert('Please enter a valid first name') ;
			gId('org_fname').focus();
			return false ;
		}else if(gId('org_lname') && isEmpty(gId('org_lname').value)){
			alert('Please enter a valid last name') ;
			gId('org_lname').focus();
			return false ;
		}
		
		if(gId('org_addr1') && isEmpty(gId('org_addr1').value)){
			alert('Please enter a valid address') ;
			gId('org_addr1').focus();
			return false ;
		}
		
		if(gId('org_city') && isEmpty(gId('org_city').value)){
			alert('Please enter a valid city') ;
			gId('org_city').focus();
			return false ;
		}
		if(gId('org_zipcode') && isEmpty(gId('org_zipcode').value)){
			alert('Please enter a valid zip code') ;
			gId('org_zipcode').focus();
			return false ;
		}
		if(gId('org_state') && isEmpty(gId('org_state').value)){
			alert('Please enter a valid state') ;
			gId('org_state').focus();
			return false ;
		}
		if(gId('org_email') && isEmpty(gId('org_email').value)){
			alert('Please enter a valid email address') ;
			gId('org_email').focus();
			return false ;
		}
		if(gId('org_phone') && isEmpty(gId('org_phone').value)){
			alert('Please enter a valid phone number') ;
			gId('org_phone').focus();
			return false ;
		}else if(isNaN(gId('org_phone').value)){
			alert('Please enter a valid phone number') ;
			gId('org_phone').focus();
			return false ;
		}
		
		if(gId('org_phone_country_code') && isEmpty(gId('org_phone_country_code').value)){
			alert('Please enter a valid phone country code') ;
			gId('org_phone_country_code').focus();
			return false ;
		}else if(isNaN(gId('org_phone_country_code').value)){
			alert('Please enter a valid phone country code') ;
			gId('org_phone_country_code').focus();
			return false ;
		}
		
		if(gId('org_country').selectedIndex == 0){
			alert('Please select a country') ;
			return false ;
		}
		
		if(gId('admin_fname') && isEmpty(gId('admin_fname').value)){
			alert('Please enter a valid first name for the administrative contact') ;
			gId('admin_fname').focus();
			return false ;
		}else if(gId('admin_lname') && isEmpty(gId('admin_lname').value)){
			alert('Please enter a valid last name for the administrative contact') ;
			gId('admin_lname').focus();
			return false ;
		}
		
		if(gId('admin_addr1') && isEmpty(gId('admin_addr1').value)){
			alert('Please enter a valid address for the administrative contact') ;
			gId('admin_addr1').focus();
			return false ;
		}
		
		if(gId('admin_city') && isEmpty(gId('admin_city').value)){
			alert('Please enter a valid city for the administrative contact') ;
			gId('admin_city').focus();
			return false ;
		}
		if(gId('admin_zipcode') && isEmpty(gId('admin_zipcode').value)){
			alert('Please enter a valid zip code for the administrative contact') ;
			gId('admin_zipcode').focus();
			return false ;
		}
		if(gId('admin_state') && isEmpty(gId('admin_state').value)){
			alert('Please enter a valid state for the administrative contact') ;
			gId('admin_state').focus();
			return false ;
		}
		if(gId('admin_email') && isEmpty(gId('admin_email').value)){
			alert('Please enter a valid email address for the administrative contact') ;
			gId('admin_email').focus();
			return false ;
		}
		if(gId('admin_phone') && isEmpty(gId('admin_phone').value)){
			alert('Please enter a valid phone number for the administrative contact') ;
			gId('admin_phone').focus();
			return false ;
		}else if(isNaN(gId('admin_phone').value)){
			alert('Please enter a valid phone number for the administrative contact') ;
			gId('admin_phone').focus();
			return false ;
		}
		if(gId('admin_phone_country_code') && isEmpty(gId('admin_phone_country_code').value)){
			alert('Please enter a valid phone country code for the administrative contact') ;
			gId('admin_phone_country_code').focus();
			return false ;
		}else if(isNaN(gId('admin_phone_country_code').value)){
			alert('Please enter a valid phone country code for the administrative contact') ;
			gId('admin_phone_country_code').focus();
			return false ;
		}
		
		if(gId('admin_country').selectedIndex == 0){
			alert('Please select a country for the administrative contact') ;
			return false ;
		}
		
		return true ;
	},

	/* For filling up the fields in the administrative contact */
	fillAsAbove: function(obj){
		if(obj.checked){
			if(gId('org_fname')){
				gId('admin_fname').value = gId('org_fname').value ;
				gId('admin_fname').readOnly = true ;
			}
			
			if(gId('org_mname')){
				gId('admin_mname').value = gId('org_mname').value ;
				gId('admin_mname').readOnly = true ;
			}
			
			if(gId('org_lname')){
				gId('admin_lname').value = gId('org_lname').value ;
				gId('admin_lname').readOnly = true ;
			}
			
			if(gId('org_addr1')){
				gId('admin_addr1').value = gId('org_addr1').value ;
				gId('admin_addr1').readOnly = true ;
			}
			
			if(gId('org_city')){
				gId('admin_city').value = gId('org_city').value ;
				gId('admin_city').readOnly = true ;
			}
			
			if(gId('org_zipcode')){
				gId('admin_zipcode').value = gId('org_zipcode').value ;
				gId('admin_zipcode').readOnly = true ;
			}
			
			if(gId('org_state')){
				gId('admin_state').value = gId('org_state').value ;
				gId('admin_state').readOnly = true ;
			}
			
			if(gId('org_email')){
				gId('admin_email').value = gId('org_email').value ;
				gId('admin_email').readOnly = true ;
			}
			
			if(gId('org_phone')){
				gId('admin_phone').value = gId('org_phone').value ;
				gId('admin_phone').readOnly = true ;
			}
			
			if(gId('org_country')){
				gId('admin_country').selectedIndex = gId('org_country').selectedIndex ;
				gId('admin_country').readOnly = true ;
			}
			if(gId('org_addr2')){
				gId('admin_addr2').value = gId('org_addr2').value ;
				gId('admin_addr2').readOnly = true ;
			}
			if(gId('org_phone_country_code')){
				gId('admin_phone_country_code').value = gId('org_phone_country_code').value ;
				gId('admin_phone_country_code').readOnly = true ;
			}
			
		}else{
			gId('admin_fname').value = '' ;
			gId('admin_fname').readOnly = false ;
			gId('admin_mname').value = '' ;
			gId('admin_mname').readOnly = false ;
			gId('admin_lname').value = '' ;
			gId('admin_lname').readOnly = false ;
			gId('admin_addr1').value = '' ;
			gId('admin_addr1').readOnly = false ;
			gId('admin_city').value  = '' ;
			gId('admin_city').readOnly = false ;
			gId('admin_zipcode').value  = '' ;
			gId('admin_zipcode').readOnly = false ;
			gId('admin_state').value = '' ;
			gId('admin_state').readOnly = false ;
			gId('admin_email').value = '' ;
			gId('admin_email').readOnly = false ;
			gId('admin_phone').value = '' ;
			gId('admin_phone').readOnly = false ;
			gId('admin_country').selectedIndex = 0 ;
			gId('admin_country').readOnly = false ;
			gId('admin_addr2').value = '' ;
			gId('admin_addr2').readOnly = false ;			
			gId('admin_phone_country_code').value = '' ;
			gId('admin_phone_country_code').readOnly = false ;			
			
		}
	}

}

/* For showing the videos on page... */
function showVideo(id,noslide){
	showLB() ;
	videoDivId = 'video'+id ;
	show(videoDivId,'fade','slow') ;
	//To pause the slide animation
	if(noslide != true){
		slideshow.pause(false) ;
	}
}

function hideVideo(id,noslide){
	hide('lightbox','fade');
	videoDivId = 'video'+id ;
	hide(videoDivId) ;
	//To pause the slide animation
	if(noslide != true){
		slideshow.pause(false) ;
	}
}

function embedVideo(src,y){
	showLB();
	var videoObject = "<object id='aplayer' height='338' width='536' classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'><param name='movie' value='http://ishare.rediff.com/images/player_embed_dm_27052011.swf' /><param name='flashvars' value='config=http://ishare.rediff.com/embed_config.php?id="+src+"%26player%3Dplayer_embed_dm_27052011.swf&plugins=http://ishare.rediff.com/images/embed_plugin_30052011.swf&autostart=true' /><param name='wmode' value='transparent' /><param name='allowScriptAccess' value='always' /><param name='allowFullScreen' value='true' /><embed src='http://ishare.rediff.com/images/player_embed_dm_27052011.swf' flashvars='config=http://ishare.rediff.com/embed_config.php?id="+src+"%26player%3Dplayer_embed_dm_27052011.swf&plugins=http://ishare.rediff.com/images/embed_plugin_30052011.swf&autostart=true' name='aplayer' allowScriptAccess='always' allowFullScreen='true' type='application/x-shockwave-flash' height='338' width='536' wmode='transparent'></embed></object>";
	show('video_container') ;
	gId('video_object').innerHTML = videoObject ;
	if(window.scrollY){
		gId('video_container').style.top = (window.scrollY + 50) + 'px' ;
	}else{
		gId('video_container').style.top = (document.documentElement.scrollTop + 50) + 'px' ;
	}
}

function removeVideo(){
	hide('lightbox','fade');
	hide('video_container','fade') ;
	hide('iFrame','fade');
	gId('video_object').innerHTML = '' ;
}

function showLB(){
	winH = getWindowheight() ;
	bodyH = document.body.offsetHeight ;
	if(bodyH>winH){
		gId('lightbox').style.height = (bodyH + 15) + 'px';
	}else{
		gId('lightbox').style.height = (winH-4) + 'px';
	}
	//gId('lightbox').style.width = getWindowwidth()+ document.documentElement.scrollLeft + 15 + 'px';
	if(gId('iFrame')){
		show('iFrame');	
		if(bodyH>winH){
			gId('iFrame').style.height = (bodyH + 15) + 'px';
		}else{
			gId('iFrame').style.height = (winH-4) + 'px';
		}
		//gId('iFrame').style.width = getWindowwidth()+document.documentElement.scrollLeft+ 15 + 'px';
	}
	
	show('lightbox','fade','slow');
}

/* Chnage password validations... */
function validateChangePasswordForm(Formobj){
	var oldP = document.getElementById('oldpasswd');
	var newP = document.getElementById('passwd1');
	var newP2 = document.getElementById('passwd2');

	if(isEmpty(oldP.value)){
		alert('Please enter your current password');
		oldP.focus();
		return false;
	}
	
	if(isEmpty(newP.value)){
		alert('Please enter your new password');
		newP.focus();
		return false;
	}else if(newP.value.length<4 || newP.value.length>12){
		alert('Your new password should be 4-12 characters long.');
		newP.focus();
		return false;
	}
	
	if (isEmpty(newP2.value)){
		alert('Please re-type your new password');
		newP2.focus();
		return false;
	}else if(newP2.value != newP.value){
		alert('Your re-typed and new password do not match. Please re-type your password correctly.');
		newP2.focus();
		return false;
	}
	
	return true;
}

//TO allow only numbers...
function allowOnlyNumber(obj){
	setTimeout(function() {
		obj.value=obj.value.replace(/[^0-9]/g, '');
	}, 1);
}

function scrollAnimate(pos){
	$('html, body').animate({scrollTop:pos}, 500) ;
}

function submitFormNotMyDom(sAction,sFormname){
	$('#'+sFormname).attr("action", sAction);
	$('#'+sFormname).submit();
}


var upsellArr;

function calculateUpsellTotal(sku,avail){
	var checkedDomains 		= $('#alt_opt_cont :checkbox:checked');
	var checkedDomainsCount = checkedDomains.length;
	upsellArr = new Array();
	
	if(!avail){
		$("#all_domains_listing").empty();
		var totalYearsChosen = parseInt($("#buy_yr_opt").val(),10);
		$("#year").html(totalYearsChosen);
		
		if($("#upsell_sel_dom").val() != undefined){
			var example_email = "you@"+$("#upsell_sel_dom").val();
		}
		else{
			var example_email = "you@"+$("#upsell_select_dom").html();
		}
		$("#example_email_upsell").html(example_email);
		
		if(totalYearsChosen == 1){
			$("#upsell_year_slider_down").removeClass().addClass("new1b-minus-slider-dis");
			$("#upsell_year_slider_up").removeClass().addClass("new1b-plus-slider");
			$("#yearunit").html("year");
		}
		else if(totalYearsChosen == 10){
			$("#upsell_year_slider_down").removeClass().addClass("new1b-minus-slider");
			$("#upsell_year_slider_up").removeClass().addClass("new1b-plus-slider-dis");
			$("#yearunit").html("years");
		}
		else if( (totalYearsChosen > 1) && (totalYearsChosen < 10) ){
			$("#upsell_year_slider_down").removeClass().addClass("new1b-minus-slider");
			$("#upsell_year_slider_up").removeClass().addClass("new1b-plus-slider");
			$("#yearunit").html("years");
		}
		
		new1BCalculatePriceUpsell();
		
		//upsellArr.push( [ $("#searched_domain").val(), $("#searched_sku").val(), "FREE" ] ); //Initial domain..
		
		if(totalYearsChosen >= 2){ 
			var showDomainYear = totalYearsChosen+" years"; 
		} 
		else{ 
			var showDomainYear = totalYearsChosen+" year"; 
		}
		
		if(checkedDomainsCount > 0){
			for(var i=0; i < checkedDomainsCount; i++){
				var selDomainID = $($('#alt_opt_cont :checkbox:checked')[i]).attr("id");
				var selDomainOrder = selDomainID.split("another_domain");
				var selDomainSKU = $("#another_sku"+selDomainOrder[1]).val();
				var selDomainName = $("label[for='"+checkedDomains[i].id+"']").html();
				var selDomainYearSplit = selDomainSKU.split("-");
				var selDomainYear = parseInt(selDomainYearSplit[2],10);
				var listID = i+1;
				
				if(selDomainYear >= 2 ){
					selDomainYear += " years";
				}
				else{
					selDomainYear += " year";
				}
				
				if(i == 0){
					upsellArr.push([selDomainName,selDomainSKU,"FREE"]);
					$("#all_domains_listing").html('<tr id="upsell_dom_list_0"><td width="40%">'+selDomainName+'</td><td class="rw-hint rwf18" id="free_domain_year" width="28%">'+selDomainYear+'</td><td id="dom_price_container_0" width="32%"><div class="floatL rw-hint rwf24 strike">Rs. <span id="free_domain_price_upsell">'+get_price(selDomainSKU)+'</span></div> <div class="floatL free-bg" style="margin-top: 9px;"></div></td></tr>');
				}
				else{
					upsellArr.push([selDomainName,selDomainSKU,"PAID"]);
					$("#all_domains_listing").append('<tr id="upsell_dom_list_"'+listID+'><td width="40%">'+selDomainName+'</td><td class="rw-hint rwf18" width="28%">'+selDomainYear+'</td><td class="rwf24" id="dom_price_container_"'+listID+' width="32%">Rs. '+get_price(selDomainSKU)+'</td></tr>');
				}
			}
		}
		
		updateUpsellGrandTotal();
	}
	else{
		$("#all_domains_listing").empty();
		var totalYearsChosen = parseInt($("#buy_yr_opt").val(),10);
		$("#year").html(totalYearsChosen);
		
		var example_email = "you@"+$("#searched_domain").val();
		$("#example_email_upsell").html(example_email);
		
		if(totalYearsChosen == 1){
			$("#upsell_year_slider_down").removeClass().addClass("new1b-minus-slider-dis");
			$("#upsell_year_slider_up").removeClass().addClass("new1b-plus-slider");
			$("#yearunit").html("year");
		}
		else if(totalYearsChosen == 10){
			$("#upsell_year_slider_down").removeClass().addClass("new1b-minus-slider");
			$("#upsell_year_slider_up").removeClass().addClass("new1b-plus-slider-dis");
			$("#yearunit").html("years");
		}
		else if( (totalYearsChosen > 1) && (totalYearsChosen < 10) ){
			$("#upsell_year_slider_down").removeClass().addClass("new1b-minus-slider");
			$("#upsell_year_slider_up").removeClass().addClass("new1b-plus-slider");
			$("#yearunit").html("years");
		}
		
		new1BCalculatePriceUpsell();
		
		upsellArr.push( [ $("#searched_domain").val(), $("#searched_sku").val(), "FREE" ] ); //Initial domain..
		
		if(totalYearsChosen >= 2){ var showDomainYear = totalYearsChosen+" years"; } 
		else { var showDomainYear = totalYearsChosen+" year"; }
		
		$("#all_domains_listing").html('<tr id="upsell_dom_list_0"><td width="40%">'+$("#searched_domain").val()+'</td><td class="rw-hint rwf18" id="free_domain_year" width="28%">'+showDomainYear+'</td><td id="dom_price_container_0" width="32%"><div class="floatL rw-hint rwf24 strike">Rs. <span id="free_domain_price_upsell">'+get_price($("#searched_sku").val())+'</span></div> <div class="floatL free-bg" style="margin-top: 9px;"></div></td></tr>');
		
		if(checkedDomainsCount > 0){
			for(var i=0; i < checkedDomainsCount; i++){
				var selDomainID = $($('#alt_opt_cont :checkbox:checked')[i]).attr("id");
				var selDomainOrder = selDomainID.split("another_domain");
				var selDomainSKU = $("#another_sku"+selDomainOrder[1]).val();
				var selDomainName = $("label[for='"+checkedDomains[i].id+"']").html();
				var selDomainYearSplit = selDomainSKU.split("-");
				var selDomainYear = parseInt(selDomainYearSplit[2],10);
				upsellArr.push([selDomainName,selDomainSKU,"PAID"]);
				var listID = i+1;
				
				if(selDomainYear >= 2 ){
					selDomainYear += " years";
				}
				else{
					selDomainYear += " year";
				}
				
				$("#all_domains_listing").append('<tr id="upsell_dom_list_"'+listID+'><td width="40%">'+selDomainName+'</td><td class="rw-hint rwf18" width="28%">'+selDomainYear+'</td><td class="rwf24" id="dom_price_container_"'+listID+' width="32%">Rs. '+get_price(selDomainSKU)+'</td></tr>');
			}
		}
		else{
			//$("#all_domains_listing").html('<tr id="upsell_dom_list_0"><td width="61%">'+$("#searched_domain").val()+'</td><td width="40%"><div class="floatL rw-hint rwf24 strike" id="dom_price_container_0">Rs. '+get_price($("#searched_sku").val())+'</div> <div class="floatL free-bg" style="margin-top: 9px;"></div></td></tr>');
		}
		updateUpsellGrandTotal();
	}
}

function updateUpsellGrandTotal(){
	var totalPricing = 0;
	for(var i=0; i < upsellArr.length; i++){
		if(upsellArr[i][2] == "PAID"){
			var newDomainPrice = get_price(upsellArr[i][1]);
			totalPricing += parseInt(newDomainPrice,10);
		}
	}
	
	var email = $('#email') ;
	var size = ($('#size').html().length == 1)?'0'+$('#size').html():$('#size').html() ;
	var duration = ($('#year').html().length == 1)?'0'+$('#year').html():$('#year').html() ;
	var sku = 'RH-' + 'EML' + $('#email').html() + '-' + $('#sizeunit').html() +  size + '-' + duration ;
	
	var emailPrice = parseInt(get_price(sku));
	
	totalPricing += emailPrice;
	
	$("#upsell_total_price").html(totalPricing);
}

function updateFreeDomainUpsell(){
	var addEmailToID = $("#upsell_sel_dom").val();
	var year = $("#buy_yr_opt").val();
	var newSelectedDomain = $("#upsell_sel_dom").val();
	
	var example_email = "you@"+newSelectedDomain;
	$("#example_email_upsell").html(example_email);
	
	for(var i=0; i < upsellArr.length; i++){
		if(upsellArr[i][2] == "FREE"){
			var newDomainExtract1 = upsellArr[i][1].split("-");
			var newDomainCode1 = newDomainExtract1[0]+"-"+newDomainExtract1[1]; //Get RH-DOM
			
			upsellArr[i].splice(1,1,newDomainCode1+"-"+year);
			upsellArr[i].splice(2,1,"PAID");
			
			break;
		}
	}
	
	for(var i=0; i < upsellArr.length; i++){
		if(upsellArr[i][0] == newSelectedDomain){
			var newDomainExtract = upsellArr[i][1].split("-");
			var newDomainCode = newDomainExtract[0]+"-"+newDomainExtract[1]; //Get RH-DOM
			var duration = ($('#year').html().length == 1)?'0'+$('#year').html():$('#year').html() ;
			
			upsellArr[i].splice(1,1,newDomainCode+"-"+duration);
			upsellArr[i].splice(2,1,"FREE");
			
			break;
		}
	}
	
	$("#all_domains_listing").empty();
	
	for(var i=0; i < upsellArr.length; i++){
		var listDomName = upsellArr[i][0];
		var listDomSKU 	= upsellArr[i][1];
		
		var selDomainYearSplit = listDomSKU.split("-");
		var selDomainYear = parseInt(selDomainYearSplit[2],10);
		if(selDomainYear >= 2){ selDomainYear += " years"; } else { selDomainYear += " year"; }
		
		if(upsellArr[i][2] == "FREE"){
			$("#all_domains_listing").append('<tr id="upsell_dom_list_0"><td width="40%">'+listDomName+'</td><td class="rwf18 rw-hint" id="free_domain_year" width="28%">'+selDomainYear+'</td><td width="32%"><div class="floatL rw-hint rwf24 strike">Rs. <span id="free_domain_price_upsell">'+get_price(listDomSKU)+'</span></div> <div class="floatL free-bg" style="margin-top: 9px;"></div></td></tr>');
		}
		else{
			$("#all_domains_listing").append('<tr><td width="40%">'+listDomName+'</td><td class="rwf18 rw-hint" width="28%">'+selDomainYear+'</td><td class="rwf24" width="32%">Rs. '+get_price(listDomSKU)+'</td></tr>');
		}
	}
	
	updateUpsellGrandTotal();
}

function updateBoxUpsell(id,unit,arr,flag,obj,mult){
	obj = $(obj) ;
	if(obj.attr('class').indexOf('dis') == -1){
	//The plus case...
		if(flag){
			//Tracking code...
			//fieldTrack(gId(id).id,flag);
			
			//Set the minus button
			obj.next().removeClass('new1b-minus-slider-dis') ;//new1b-plus-slider
			obj.next().addClass('new1b-minus-slider') ;
			var currValue = parseInt(gId(id).innerHTML) ;
			var currU = gId(id).id + 'unit' ;
			for(var i=0; i<arr.length; i++){
				if(i != arr.length && arr[i] == currValue){
					gId(id).innerHTML = arr[i+1] ;
					if(parseInt(arr[i+1])>1 && mult){
						gId(currU).innerHTML = unit + 's' ;
					}else{
						gId(currU).innerHTML = unit ;
					}
					if((i+2) == arr.length){
						obj.removeClass('new1b-plus-slider') ;
						obj.addClass('new1b-plus-slider-dis') ;
					}
					new1BCalculatePriceUpsell() ;
					break;
				}else{
					continue;
				}
			}
		}else{
			//Tracking code...
			//fieldTrack(gId(id).id,flag) ;
			
			//The minus case...
			//Set the plus button
			obj.prev().removeClass('new1b-plus-slider-dis') ;
			obj.prev().addClass('new1b-plus-slider') ;
			var currValue = parseInt(gId(id).innerHTML) ;
			var currU = gId(id).id + 'unit' ;
			for(var i=0; i<arr.length; i++){
				if(i != 0 && arr[i] == currValue){
					gId(id).innerHTML = arr[i-1] ;
					if(parseInt(arr[i-1])>1 && mult){
						gId(currU).innerHTML = unit + 's' ;
					}else{
						gId(currU).innerHTML = unit ;
					}
					if((i-1) == 0){
						obj.removeClass('new1b-minus-slider') ;
						obj.addClass('new1b-minus-slider-dis') ;
					}
					new1BCalculatePriceUpsell();
					break;
				}else{
					continue;
				}
			}
		}
	}
}
	
function new1BCalculatePriceUpsell(){
	var email = $('#email') ;
	var size = ($('#size').html().length == 1)?'0'+$('#size').html():$('#size').html() ;
	var duration = ($('#year').html().length == 1)?'0'+$('#year').html():$('#year').html() ;
	var mobilePrice = 0; 
	var emailPrice = 0;
	var catchPrice = 0;
	var sku = 'RH-' + 'EML' + $('#email').html() + '-' + $('#sizeunit').html() +  size + '-' + duration ;
	
	emailPrice = parseInt(get_price(sku));
	catchPrice = 0;
	mobilePrice = 0;
	
	$('#upsell_dom_price').html(catchPrice + emailPrice + mobilePrice);
	$('#upsell_month_price').html(Math.ceil((catchPrice + emailPrice + mobilePrice)/(12*parseInt(duration,10))));
	
	updateFreeDomainPriceUpsell(duration);
	
	/* Actual price of the sku : Balu T */
	/*var new_sku = "RH-EML1-GB"+size+"-"+duration;
	var noOfEmails = parseInt($('#email').html(),10);
	var actualPrice = (get_price(new_sku)) * noOfEmails;
	var diffPercentage = (1 - (emailPrice/actualPrice));
	
	if(actualPrice > emailPrice){
		$("#discount_percent").html( Math.floor((diffPercentage*100))+"%");
		$("#discount").html("Rs. "+actualPrice);
		
		$("#discount_bg").css("visibility","visible");
		$("#discount").css("visibility","visible");
		$("#discount_area").css("visibility","visible");
	}
	else{
		$("#discount_percent").html("0");
		$("#discount").html("0");
		
		$("#discount_bg").css("visibility","hidden");
		$("#discount").css("visibility","hidden");
		$("#discount_area").css("visibility","hidden");
	}*/
}

function updateFreeDomainPriceUpsell(year){
	for(var i=0; i < upsellArr.length; i++){
		if(upsellArr[i][2] == "FREE"){
			var newDomainExtract = upsellArr[i][1].split("-");
			var newDomainCode = newDomainExtract[0]+"-"+newDomainExtract[1]; //Get RH-DOM
			upsellArr[i].splice(1,1,newDomainCode+"-"+year);
			var newDomainPrice = get_price(upsellArr[i][1]);
			
			var selDomainYear = parseInt(year,10);
			
			if(selDomainYear >= 2){ 
				selDomainYear += " years"; 
			} 
			else{ 
				selDomainYear += " year"; 
			}
			
			break;
		}
	}
	
	$("#free_domain_price_upsell").html(newDomainPrice);
	$("#free_domain_year").html(selDomainYear);
	updateUpsellGrandTotal();
}

function upsellEmailKnowMore(){
	if($("#know_more_less").html() == "Know more" ){
		$("#know_more_less").html("Less");
		
		$("#upsell_sep").show();
		$("#upsell_small_sep").hide();
		
		$("#upsel_hint").hide();
		$("#upsell_slide_progress").show();
		
		$("#upsell_email_knowmore").fadeIn("slow");
		
		$(".lightbox-upselling").height(516);
		$(".lb-inner-upselling").height(460);
		
		var allUpsellSlides = $("#upsell_email_knowmore .upsell-slide");
		
		if(allUpsellSlides.length > 1){
			$(".upsell-pagination .next").show();
			$(".upsell-pagination .prev").hide();
			$("#upsell_slide_progress").empty();
			
			for(var i=0; i < allUpsellSlides.length; i++ ){
				if(i == 0){
					$("#upsell_slide_progress").append('<span><img src="pix/blank.gif" border="0" class="active-slide-dot floatL"/></span>');
					$(allUpsellSlides[i]).css("display","block");
				}
				else{
					$("#upsell_slide_progress").append('<span><img src="pix/blank.gif" border="0" class="inactive-slide-dot floatL"/></span>');
					$(allUpsellSlides[i]).css("display","none");
				}
			}
		}
		else{
			$(".upsell-pagination .upsell-slide").hide();
		}
	}
	else{
		$("#know_more_less").html("Know more");
		
		$("#upsell_sep").hide();
		$("#upsell_small_sep").show();
		
		$("#upsel_hint").show();
		$("#upsell_slide_progress").hide();
		
		$("#upsell_email_knowmore").fadeOut("fast");
		
		$(".lightbox-upselling").height(321);
		$(".lb-inner-upselling").height(288);
		
		var allUpsellSlides = $("#upsell_email_knowmore .upsell-slide");
		
		$(".upsell-pagination .next").hide();
		$(".upsell-pagination .prev").hide();
		
		if(allUpsellSlides.length > 1){
			for(var i=0; i < allUpsellSlides.length; i++ ){
				$(allUpsellSlides[i]).css("display","none");
			}
		}
	}
}

function getCurrentUpsellSlide(){
	var allUpsellSlides = $("#upsell_email_knowmore .upsell-slide");
	for(var i=0; i < allUpsellSlides.length; i++ ){
		if( $(allUpsellSlides[i]).css("display") == "block" ){
			var currSlide = i;
			break;
		}
	}
	
	return currSlide;
}

function showNextUpsellSlide(){
	var currentSlide = getCurrentUpsellSlide();
	var allSlides = $("#upsell_email_knowmore .upsell-slide");
	
	var allProgressDots = $("#upsell_slide_progress").children();
	var progressSpan = $("#upsell_slide_progress").children()[currentSlide+1];
	var progressDotImg = $(progressSpan).children()[0];
	
	$(progressDotImg).removeClass('inactive-slide-dot').addClass('active-slide-dot');
	
	for(var i=0; i < allSlides.length; i++){
		if(i == currentSlide + 1){
			$(allSlides[i]).fadeIn("slow");
			
			if(i == (allSlides.length - 1)){ //Remove next from the last slide.
				$("#upsell_email_knowmore .next").hide();
				$("#upsell_email_knowmore .prev").show();
			}
			else{
				$("#upsell_email_knowmore .next").show();
				$("#upsell_email_knowmore .prev").show();
			}
		}
		else{
			$($(allProgressDots[i]).children()[0]).removeClass("active-slide-dot").addClass("inactive-slide-dot");
			$(allSlides[i]).hide();
		}
	}
}

function showPrevUpsellSlide(){
	var currentSlide = getCurrentUpsellSlide();
	var allSlides = $("#upsell_email_knowmore .upsell-slide");
	
	var allProgressDots = $("#upsell_slide_progress").children();
	
	var progressSpanCurr = $("#upsell_slide_progress").children()[currentSlide];
	var progressDotImg = $(progressSpanCurr).children()[0];
	$(progressDotImg).removeClass('active-slide-dot').addClass('inactive-slide-dot');
	
	var progressSpanNew = $("#upsell_slide_progress").children()[currentSlide-1];
	var progressDotImgNew = $(progressSpanNew).children()[0];
	$(progressDotImgNew).removeClass('inactive-slide-dot').addClass('active-slide-dot');
	
	
	for(var i=0; i < allSlides.length; i++){
		if(i == (currentSlide - 1)){ //Show previous slide..
			$(allSlides[i]).fadeIn("slow");
			
			if(i == 0){ //Remove prev from the first slide.
				$("#upsell_email_knowmore .next").show();
				$("#upsell_email_knowmore .prev").hide();
			}
			else{
				$("#upsell_email_knowmore .next").show();
				$("#upsell_email_knowmore .prev").show();
			}
		}
		else{
			$(allSlides[i]).hide();
		}
	}
}

function callDomainAvailability(typedDomain, successCallBack, errorCallBack){
	var idnbkg=-1;
	if($("#idnbkg") !=undefined){
		idnbkg = $("#idnbkg").val(); 
	}	
	
	$.ajax({
		url		: 	APPLICATIONBASEURL+"/checkdomainavailability",
		type	: 	"POST",	
		async 	: 	true,
		data 	: 	"domainname="+typedDomain+"&idnbkg="+idnbkg,
		success : 	successCallBack,
		error 	: 	errorCallBack
	});
}

function searchDomainFromHome(from_src){
	$("#dom_unavail_sugg").hide();
	
	$("#check_domain").css("background","");
	$("#check_domain").css("background-color","none");
	
	var typedDomain = $("#home_dom_search").val();
	$("#new_slider_sel_email_box").focus();
	
	if(typedDomain.indexOf("www.") == 0){
		typedDomain = typedDomain.substring(4);
	}
	
	$("#home_dom_search").val(typedDomain);
	var iPromotionalbkg=-1;
	if($("#promotionalbkg") !=undefined){
		iPromotionalbkg = $("#promotionalbkg").val(); 
	}	
	var sCheckType="";
	if(iPromotionalbkg==1){
		sCheckType="promotional";
	}
	var idnbkg=-1;
	if($("#idnbkg") !=undefined){
		idnbkg = $("#idnbkg").val(); 
	}	
	if(idnbkg==1){
		sCheckType="idn";
	}
	if(checkdomain(typedDomain,sCheckType)){
		domainCheckedOk=true;//temp
		if(!searchingDomain){
			if(domainCheckedOk){
				$(".dom-status").hide();
				$("#dom_searching").show();
				
				searchingDomain = true;
				$("#home_dom_search").attr("readonly","readonly");
				$("#existing_domain_check").attr("disabled","disabled");
				if(from_src == "from_home"){
					callDomainAvailability(typedDomain,domAvailSuccessNormal,domAvailFailNormal);
				}
			}
			else{
				alert("Please enter a valid domain name. \nE.g. shahtrading.com");
			}
		}
		else{
			if(confirm("Your domain search is in progress, do you wish to stop the current search?")){
				$("#home_dom_search").removeAttr("readonly");
				$("#existing_domain_check").removeAttr("disabled");
				
				$(".dom-status").hide();
				$("#dom_check").show();
				
				searchingDomain = false;
				
				//Reset the loader events to initial case
				//isLoaderDiv = false;
				$("#dom_searching").unbind("hover");
				$("#dom_searching").unbind("mouseover");
				//$("#dom_stop").unbind("mouseout");
			}
		}
	}else {
		if(iPromotionalbkg!=1){
			alert("Please type a valid domain name(eg. yourcompany.in).");
		}
		$(".dom-status").hide();
		$("#dom_check").show();
		$("#check_domain").css("background","#E8990C");
		$("#check_domain").css("background-color","none");
	}
}

function searchDomainFromBtm(from_src){
	$("#dom_unavail_sugg_btm").hide();
	
	$("#check_domain_btm").css("background","");
	$("#check_domain_btm").css("background-color","none");
	
	var typedDomain = $("#home_dom_search_btm").val();
	$("#new_slider_sel_email_box_btm").focus();
	
	if(typedDomain.indexOf("www.") == 0){
		typedDomain = typedDomain.substring(4);
	}
	
	$("#home_dom_search_btm").val(typedDomain);
	
	if(checkdomain(typedDomain)){
		if(!searchingDomain){
			if(domainCheckedOk){
				$(".dom-status-btm").hide();
				$("#dom_searching_btm").show();
				
				searchingDomain = true;
				$("#home_dom_search_btm").attr("readonly","readonly");
				//$("#existing_domain_check_btm").attr("disabled","disabled");
				
				fieldTrack(gId('home_dom_search_btm').id,gId('home_dom_search_btm').value+"/entered");
				
				if(from_src == "from_home"){
					callDomainAvailability(typedDomain,domAvailSuccessNormalBtm,domAvailFailNormalBtm);
				}
			}
			else{
				alert("Please enter a valid domain name. \nE.g. shahtrading.com");
			}
		}
		else{
			if(confirm("Your domain search is in progress, do you wish to stop the current search?")){
				$("#home_dom_search_btm").removeAttr("readonly");
				$("#existing_domain_check_btm").removeAttr("disabled");
				
				$(".dom-status-btm").hide();
				$("#dom_check_btm").show();
				
				searchingDomain = false;
				
				//Reset the loader events to initial case
				//isLoaderDiv = false;
				$("#dom_searching_btm").unbind("hover");
				$("#dom_searching_btm").unbind("mouseover");
				//$("#dom_stop").unbind("mouseout");
			}
		}
	}
}

function domAvailSuccessNormal(res){
	searchingDomain = false;
	domSearchComplete = true;
	var typedDomain = $("#home_dom_search").val();
	var response = eval('('+res+')');
	//For nixi or netsol maintenance page
	checkForMaintenanceActivity(response,typedDomain);
	//End of For nixi or netsol maintenance page	
	if( (response.Error == 0) && (response.is_domain_available == 1) ){
		$("#check_domain").css("background","none");
		$(".dom-status").hide();
		$("#dom_available").show(0);
		
		//$("#check_domain").unbind("click");
		//$("#home_dom_search").unbind("keyup");
		
		isDomainAvailable = true;
		$("#is_dom_verfied").val("1");
		$("#home_dom_search").removeAttr("readonly");
		$("#existing_domain_check").removeAttr("disabled");
		
		//set_sku_prize_buy();
		validateDomain($("#home_dom_search").val())
		showDomainPriceInTotal();

		//fieldTrack("domain_available","yes");
		//send the lead details to clicktocall api
		sendLeadFrmBookingForm();
		return true;
	}
	else{
		if(response.is_domain_available == 0){
			$("#check_domain").css("background","none");
			$(".dom-status").hide();
			$("#dom_unavailable").show();
			isDomainAvailable = false;
			//send the lead details to clicktocall api
			sendLeadFrmBookingForm();
		}else {
			$(".dom-status").show();
			$("#dom_unavailable").hide();		
			//$(".dom-available").hide();
			domSearchComplete = false;
		}
        /* Start: Added By Kalpesh for checking logged in user domain */
        if(response.domainbelongstouser == 0){
		   domainBelongsToUser =false;
		}else{
		   domainBelongsToUser =true;
		}
		if(response.emailexistfordomain == 0){
		   emailExistForDomain =false;
		}else{
		   emailExistForDomain =true;
		}
		
        /* End : Added By Kalpesh for checking logged in user domain */		
		$("#dom_unavail_sugg").fadeIn();
		$("#existing_domain_check").removeAttr("checked");
		$("#is_dom_verfied").val("0");
		
		showSuggestions(response,typedDomain);
		
		//fieldTrack("domain_available","no");
		
		return false;
	}
}

function domAvailFailNormal(){
	searchingDomain = true;
	domSearchComplete = true;
	
	clearDomSearch();
	$("#home_dom_search").removeAttr("readonly");
	fieldTrack("domain_available","request_failed");
	alert("Sorry!. An unknown error has occurred. Please try again.");
	//return false;
}

function domAvailSuccessNormalBtm(res){
	searchingDomain = false;
	domSearchComplete = true;
	var typedDomain = $("#home_dom_search_btm").val();
	var response = eval('('+res+')');
	
	if( (response.Error == 0) && (response.is_domain_available == 1) ){
		$("#check_domain_btm").css("background","none");
		$(".dom-status-btm").hide();
		$("#dom_available_btm").show();
		
		//$("#check_domain").unbind("click");
		//$("#home_dom_search").unbind("keyup");
		
		isDomainAvailable = true;
		$("#is_dom_verfied_btm").val("1");
		$("#home_dom_search_btm").removeAttr("readonly");
		//$("#existing_domain_check").removeAttr("disabled");
		
		fieldTrack("domain_available_btm","yes");
		
		return true;
	}
	else{
		if(response.is_domain_available == 0){
			$("#check_domain_btm").css("background","none");
			$(".dom-status-btm").hide();
			$("#dom_unavailable_btm").show();
			isDomainAvailable = false;
		}else {
			$(".dom-status-btm").show();
			$("#dom_unavailable_btm").hide();
			domSearchComplete = false;
			$(".dom-available").hide();
		}	
		$("#dom_unavail_sugg_btm").show();
		$("#is_dom_verfied_btm").val("0");
		
		showSuggestionsBtm(response,typedDomain);
		
		fieldTrack("domain_available_btm","no");
		
		return false;
	}
}

function domAvailFailNormalBtm(){
	searchingDomain = true;
	domSearchComplete = true;
	
	clearDomSearch();
	$("#home_dom_search_btm").removeAttr("readonly");
	fieldTrack("domain_available_btm","request_failed");
	alert("Sorry!. An unknown error has occurred. Please try again.");
	//return false;
}

function addToSearchBox(elem){
	var addElem = $($(elem)[0]).html();
	$("#home_dom_search").val(addElem);
	
	$("#is_dom_verfied").val("1");
	isDomainAvailable = true;
	
	$("#dom_unavail_sugg").hide();
	$("#check_domain").css("background","none");
	$(".dom-status").hide();
	$("#dom_available").show(0);
	$(".dom-available").show();
	$("#existing_domain_check").attr("disabled","disabled");

	validateDomain($("#home_dom_search").val())

	if(BUY_FROM == "1"){
		showDomainPriceInTotal();
		sendLeadFrmBookingForm();
	}
}

function addToSearchBoxBtm(elem){
	var addElem = $($(elem)[0]).html();
	$("#home_dom_search_btm").val(addElem);
	
	$("#is_dom_verfied_btm").val("1");
	isDomainAvailable = true;
	
	$("#dom_unavail_sugg_btm").hide();
	$("#check_domain_btm").css("background","none");
	$(".dom-status-btm").hide();
	$("#dom_available_btm").show();
	$(".dom-available").show();

	//alert("addToSearchBoxBtm.... call searchDomainFromHomeEnterprise")

	//Recalculate the price
	searchDomainFromHomeEnterprise("from_home");
}

function clearDomSearch(){
	$("#home_dom_search").val("");
	$("#dom_unavail_sugg").hide();
	$("#check_domain").hide();
	$(".dom-status").hide();
	//$("#home_dom_search").css("width","335px");
}

function clearDomSearchBtm(){
	$("#home_dom_search_btm").val("");
	$("#dom_unavail_sugg_btm").hide();
	$("#check_domain_btm").hide();
	$(".dom-status-btm").hide();
	$("#home_dom_search_btm").css("width","249px");
}

function validateDomain(domain){
	var typedDomain = domain;
	var domainName = typedDomain.split(".");
	var dom_ok = false;
	var idnbkg=-1;
	if($("#idnbkg") !=undefined){
		idnbkg = $("#idnbkg").val(); 
	}	
	if(typedDomain.length > 0){
		
		if(idnbkg==1){
			if(domainName[0].length < 1){
				$("#home_dom_search").css("border-color","#E92931");
				dom_ok = false;
			}else {
				$("#home_dom_search").css("border-color","#aaa");
				dom_ok = true;
			}
		}else {
	
		if(domainName.length <= 1){
			$("#home_dom_search").css("border-color","#E92931");
			dom_ok = false;
		}
		else if(domainName[0].length > 62){
			$("#home_dom_search").css("border-color","#E92931");
			dom_ok = false;
		}
		else{
			var checkTLDLength = true;
			for(var i=1; i<domainName.length; i++){
				if(domainName[i].length < 2){
					checkTLDLength = false;
					break;
				}
			}
			
			if(checkTLDLength){
				$("#home_dom_search").css("border-color","#aaa");
				dom_ok = true;
			}
			else{
				$("#home_dom_search").css("border-color","#E92931");
				dom_ok = false;
			}
		}
	}
	}
	else{
		$("#home_dom_search").css("border-color","#aaa");
		dom_ok = false;
	}
	return dom_ok;
}

function validateDomainBtm(domain){
	var typedDomain = domain;
	var domainName = typedDomain.split(".");
	var dom_ok = false;
	
	if(typedDomain.length > 0){
		if(domainName.length <= 1){
			$("#home_dom_search_btm").css("border-color","#E92931");
			dom_ok = false;
		}
		else if(domainName[0].length > 62){
			$("#home_dom_search_btm").css("border-color","#E92931");
			dom_ok = false;
		}
		else{
			var checkTLDLength = true;
			for(var i=1; i<domainName.length; i++){
				if(domainName[i].length < 2){
					checkTLDLength = false;
					break;
				}
			}
			
			if(checkTLDLength){
				$("#home_dom_search_btm").css("border-color","#aaa");
				dom_ok = true;
			}
			else{
				$("#home_dom_search_btm").css("border-color","#E92931");
				dom_ok = false;
			}
		}
	}
	else{
		$("#home_dom_search_btm").css("border-color","#aaa");
		dom_ok = false;
	}
	
	return dom_ok;
}

function showSuggestions(response, typedDomain){
	var iPromotionalbkg=-1;
	if($("#promotionalbkg") !=undefined){
		iPromotionalbkg = $("#promotionalbkg").val(); 
	}	
	var aAllowedExt = new Array(".in", ".co.in", ".net.in", ".org.in",".edu.in",".ac.in",".co.uk");	
	if(response.other_domain_suggested != ""){
		var dom_suggestions = response.other_domain_suggested.split("|");
		var dom_sugg_str = "";
		
		$("#dom_unavail_sugg").height("auto");
		if(isDomainAvailable===false){
		    if(domainBelongsToUser == true){
			    if(emailExistForDomain == true){
			        $("#sugg_heading").html("<span class='black'>'<strong>"+typedDomain+"</strong>' belongs to you and email is already associated with it,</span> here are the available options -");
				}else{
				    $("#sugg_heading").html("<span class='black'>'<strong>"+typedDomain+"</strong>' belongs to you and ,</span> here are the available options -");
				}
			}else{
			    $("#sugg_heading").html("<span class='black'>This domain is already in use.</span> <em><a id='exist_click' onclick='return markDomainExisting();'>Click here</a> if it belongs to you</em><cite>Or choose one of the following</cite>");
			}
		}else {
			$("#sugg_heading").html("<span class='black'>'<strong>"+typedDomain+"</strong>' could not be verified,</span> here are the available options -");
			$("#dom_searching").hide(0);
			$("#dom_stop").hide(0);
			$("#dom_available").hide(0);
		}	
		var iDotPos = "";
		var sExt = "";
		var iValidDomain=-1;
		var iCnt=0;
		for(var i=0; i< dom_suggestions.length; i++){
			iValidDomain=true;
			if(iPromotionalbkg==1){
				//check for .in domains only
				iDotPos = dom_suggestions[i].indexOf(".");
				var sExt = dom_suggestions[i].substring(iDotPos,dom_suggestions[i].length);
				for(var j=0; j<aAllowedExt.length; j++){
					if(sExt == aAllowedExt[j]){
						iValidDomain = true;
						break;
					}else{
						iValidDomain = false;
					}
				}
			}
			if(iValidDomain==true){
				dom_sugg_str += "<div><a href='javascript:;' onclick='addToSearchBox(this);'>"+dom_suggestions[i]+"</a></div>";
				iCnt++;	
			}	
			if(iCnt>= 3){
				break;
			}
		}
		var html_click="";
		dom_sugg_str = dom_sugg_str+html_click;
		$("#dom_sugg_list").html(dom_sugg_str);
		
	}
	else{
		var errMessage = response.message;
		$("#dom_sugg_list").empty();
		$("#dom_unavail_sugg").height(38);
		if(errMessage != ""){
			$("#sugg_heading").html("This is a trademark domain name.");
			$("#dom_searching").hide(0);
			$("#dom_check").hide(0);
			$("#dom_stop").hide(0);
			$("#dom_available").hide(0);
			$("#dom_unavailable").show(0);
			$("#check_domain").css('background','none');
		}
		else{
			if(isDomainAvailable===false){
				$("#sugg_heading").html("<span class='black'>This domain is already in use.</span> <em><a id='exist_click' onclick='return markDomainExisting();'>Click here</a> if it belongs to you</em><cite>Or choose one of the following</cite>");
			}else {
			$("#sugg_heading").html("<strong>"+typedDomain+"</strong> could not be verified,</span> <em><a id='exist_click' onclick='return markDomainExisting();'>Click here</a> if it belongs to you</em><cite>Or search another one </cite>");
			}
			$("#dom_searching").hide(0);
			$("#dom_check").hide(0);
			$("#dom_stop").hide(0);
			$("#dom_available").hide(0);
			$("#dom_unavailable").show(0);
			$("#check_domain").css('background','none');
			
		}
	}
	
	$("#home_dom_search").removeAttr("readonly");
	$("#existing_domain_check").removeAttr("disabled");
}

function showSuggestionsBtm(response, typedDomain){
	if(response.other_domain_suggested != ""){
		var dom_suggestions = response.other_domain_suggested.split("|");
		var dom_sugg_str = "";
		
		$("#dom_unavail_sugg_btm").height("auto");
		if(isDomainAvailable===false){
			$("#sugg_heading_btm").html("<span class='black'>This domain is already in use</span>");
		}else {
			$("#sugg_heading_btm").html("<span class='black'>'<strong>"+typedDomain+"</strong>' could not be verified,</span> here are the available options -");
		}	
		
		for(var i=0; i< dom_suggestions.length; i++){
			dom_sugg_str += "<div onclick='addToSearchBoxBtm(this)'>"+dom_suggestions[i]+"</div>";
			if(i >= 4){
				break;
			}
		}
		$("#dom_sugg_list_btm").html(dom_sugg_str);
	}
	else{
		var errMessage = response.message;
		$("#dom_sugg_list_btm").empty();
		$("#dom_unavail_sugg_btm").height(38);
		if(errMessage != ""){
			$("#sugg_heading_btm").html("This is a trademark domain name.");
		}
		else{
			$("#sugg_heading_btm").html("There are no suggestions available.");
		}
	}
	
	$("#home_dom_search").removeAttr("readonly");
	$("#home_dom_search_btm").removeAttr("readonly");
	
	//$("#existing_domain_check").removeAttr("disabled");
}

function updateBox(id,unit,arr,flag,obj,mult){
	obj = $(obj) ;
	if(obj.attr('class').indexOf('dis') == -1){
	//The plus case...
		if(flag){
			//Tracking code...
			fieldTrack(gId(id).id,flag);
			
			//Set the minus button
			obj.next().removeClass('new1b-minus-slider-dis') ;//new1b-plus-slider
			obj.next().addClass('new1b-minus-slider') ;
			var currValue = parseInt(gId(id).innerHTML) ;
			var currU = gId(id).id + 'unit' ;
			for(var i=0; i<arr.length; i++){
				if(i != arr.length && arr[i] == currValue){
					gId(id).innerHTML = arr[i+1] ;
					if(parseInt(arr[i+1])>1 && mult){
						gId(currU).innerHTML = unit + 's' ;
					}else{
						gId(currU).innerHTML = unit ;
					}
					if((i+2) == arr.length){
						obj.removeClass('new1b-plus-slider') ;
						obj.addClass('new1b-plus-slider-dis') ;
					}
					new1BCalculatePrice() ;
					break;
				}else{
					continue;
				}
			}
		}else{
			//Tracking code...
			fieldTrack(gId(id).id,flag) ;
			
			//The minus case...
			//Set the plus button
			obj.prev().removeClass('new1b-plus-slider-dis') ;
			obj.prev().addClass('new1b-plus-slider') ;
			var currValue = parseInt(gId(id).innerHTML) ;
			var currU = gId(id).id + 'unit' ;
			for(var i=0; i<arr.length; i++){
				if(i != 0 && arr[i] == currValue){
					gId(id).innerHTML = arr[i-1] ;
					if(parseInt(arr[i-1])>1 && mult){
						gId(currU).innerHTML = unit + 's' ;
					}else{
						gId(currU).innerHTML = unit ;
					}
					if((i-1) == 0){
						obj.removeClass('new1b-minus-slider') ;
						obj.addClass('new1b-minus-slider-dis') ;
					}
					new1BCalculatePrice();
					break;
				}else{
					continue;
				}
			}
		}
	}
}

function updateBoxBtm(id,unit,arr,flag,obj,mult){
	obj = $(obj) ;
	if(obj.attr('class').indexOf('dis') == -1){
	//The plus case...
		if(flag){
			//Tracking code...
			fieldTrack(gId(id).id,flag);
			
			//Set the minus button
			obj.next().removeClass('new1b-minus-slider-dis') ;//new1b-plus-slider
			obj.next().addClass('new1b-minus-slider') ;
			var currValue = parseInt(gId(id).innerHTML) ;
			var currU = gId(id).id + '_unit' ;
			for(var i=0; i<arr.length; i++){
				if(i != arr.length && arr[i] == currValue){
					gId(id).innerHTML = arr[i+1] ;
					if(parseInt(arr[i+1])>1 && mult){
						gId(currU).innerHTML = unit + 's' ;
					}else{
						gId(currU).innerHTML = unit ;
					}
					if((i+2) == arr.length){
						obj.removeClass('new1b-plus-slider') ;
						obj.addClass('new1b-plus-slider-dis') ;
					}
					new1BCalculatePriceBtm() ;
					break;
				}else{
					continue;
				}
			}
		}else{
			//Tracking code...
			fieldTrack(gId(id).id,flag) ;
			
			//The minus case...
			//Set the plus button
			obj.prev().removeClass('new1b-plus-slider-dis') ;
			obj.prev().addClass('new1b-plus-slider') ;
			var currValue = parseInt(gId(id).innerHTML) ;
			var currU = gId(id).id + '_unit' ;
			for(var i=0; i<arr.length; i++){
				if(i != 0 && arr[i] == currValue){
					gId(id).innerHTML = arr[i-1] ;
					if(parseInt(arr[i-1])>1 && mult){
						gId(currU).innerHTML = unit + 's' ;
					}else{
						gId(currU).innerHTML = unit ;
					}
					if((i-1) == 0){
						obj.removeClass('new1b-minus-slider') ;
						obj.addClass('new1b-minus-slider-dis') ;
					}
					new1BCalculatePriceBtm();
					break;
				}else{
					continue;
				}
			}
		}
	}
}

function new1BCalculatePriceBtm(){
	var email = $('#email_btm') ;
	var size = ($('#size_btm').html().length == 1)?'0'+$('#size_btm').html():$('#size_btm').html() ;
	var duration = ($('#year_btm').html().length == 1)?'0'+$('#year_btm').html():$('#year_btm').html() ;
	var mobilePrice = 0; 
	var emailPrice = 0;
	var catchPrice = 0;
	var sku = 'RH-' + 'EML' + $('#email_btm').html() + '-' + $('#size_btm_unit').html() +  size + '-' + duration ;
	
	emailPrice = parseInt(get_price(sku));
	catchPrice = 0;
	mobilePrice = 0;
	
	$('#final_price_btm').html(catchPrice + emailPrice + mobilePrice);
	$('#month_price_btm').html(Math.ceil((catchPrice + emailPrice + mobilePrice)/(12*parseInt(duration,10))));
	
	/* Actual price of the sku : Balu T */
	var new_sku = "RH-EML1-GB"+size+"-"+duration;
	var noOfEmails = parseInt($('#email').html(),10);
	var actualPrice = (get_price(new_sku)) * noOfEmails;
	var diffPercentage = (1 - (emailPrice/actualPrice));
	
	/*if(actualPrice > emailPrice){
		$("#discount_percent_btm").html( Math.floor((diffPercentage*100))+"%");
		$("#discount_btm").html("Rs. "+actualPrice);
		
		$("#discount_bg_btm").css("display","block");
		$("#discount_btm").css("visibility","visible");
		$("#discount_area_btm").css("display","block");
	}
	else{
		$("#discount_percent_btm").html("0");
		$("#discount_btm").html("0");
		
		$("#discount_bg_btm").css("display","none");
		$("#discount_btm").css("visibility","hidden");
		$("#discount_area_btm").css("display","none");
	}*/
}

function new1BCalculatePrice(){
	var email = $('#email') ;
	var size = ($('#size').html().length == 1)?'0'+$('#size').html():$('#size').html() ;
	var duration = ($('#year').html().length == 1)?'0'+$('#year').html():$('#year').html() ;
	var mobilePrice = 0; 
	var emailPrice = 0;
	var catchPrice = 0;
	var sku = 'RH-' + 'EML' + $('#email').html() + '-' + $('#sizeunit').html() +  size + '-' + duration ;
	
	emailPrice = parseInt(get_price(sku));
	catchPrice = 0;
	mobilePrice = 0;
	
	$('#final_price').html(catchPrice + emailPrice + mobilePrice);
	$('#month_price').html(Math.ceil((catchPrice + emailPrice + mobilePrice)/(12*parseInt(duration,10))));
	
	/* Actual price of the sku : Balu T */
	var new_sku = "RH-EML1-GB"+size+"-"+duration;
	var noOfEmails = parseInt($('#email').html(),10);
	var actualPrice = (get_price(new_sku)) * noOfEmails;
	var diffPercentage = (1 - (emailPrice/actualPrice));
	
	if(actualPrice > emailPrice && size != '05'){
		$("#discount_percent").html( Math.floor((diffPercentage*100))+"%");
		$("#discount").html("Rs. "+actualPrice);
		
		$("#discount_bg").css("display","block");
		$("#discount").css("visibility","visible");
		$("#discount_area").css("display","block");
	}
	else{
		$("#discount_percent").html("0");
		$("#discount").html("0");
		
		$("#discount_bg").css("display","none");
		$("#discount").css("visibility","hidden");
		$("#discount_area").css("display","none");
	}
}

//Function to set the final SKU tpl variable...
function setFinalSku(trackElem){
	var email = $('#email') ;
	var size = ($('#size').html().length == 1)?'0'+$('#size').html():$('#size').html() ;
	var duration = ($('#year').html().length == 1)?'0'+$('#year').html():$('#year').html() ;
	
	//XOM
	var searched_domain = $("#home_dom_search").val();
	
	if( (searched_domain == "") || (searched_domain == "Enter a domain name of your choice") || (searched_domain == "Enter your existing domain") || (searched_domain == "Enter the domain name you want") || (searched_domain == "Enter a domain name e.g. shahtrading.in") || (searched_domain == "Enter a domain e.g. shahtrading.in")  ){
		$('#domSkuString').val('RH-XOM-' + duration);
		$("#domain_name").val("no_dom");
		//email
		gId('emlSkuString').value = 'RH-' + 'EML' + $('#email').html() + '-' + $('#sizeunit').html() +  size + '-' + duration ;
		gId('mobSkuString').value= '' ;
		gId('catchSkuString').value= '' ;
		//Tracking code...
		fieldTrack(trackElem,'submit') ;
		
		gId('buynow').submit();
	}
	else{
		if(validateDomain(searched_domain)){
			var dom_verified_status = $("#is_dom_verfied").val();
			
			if(isDomainAvailable === false){
				if(confirm("The domain you have entered is not available, would you like to go ahead without a domain?"))
				{
					$('#domSkuString').val('RH-XOM-' + duration);
					$("#domain_name").val("no_dom");
					
					//email
					gId('emlSkuString').value = 'RH-' + 'EML' + $('#email').html() + '-' + $('#sizeunit').html() +  size + '-' + duration ;
					gId('mobSkuString').value= '' ;		
					gId('catchSkuString').value= '' ;
					//Tracking code...
					fieldTrack(trackElem,'submit') ;
					
					gId('buynow').submit();
				}
				else{
					return false;
				}
			}
			else{
				if(dom_verified_status == 1){
					$('#domSkuString').val('RH-XOM-' + duration);
					$("#domain_name").val(searched_domain);
					
					//email
					gId('emlSkuString').value = 'RH-' + 'EML' + $('#email').html() + '-' + $('#sizeunit').html() +  size + '-' + duration ;
					gId('mobSkuString').value= '' ;		
					gId('catchSkuString').value= '' ;
					//Tracking code...
					fieldTrack(trackElem,'submit') ;
					
					gId('buynow').submit();
				}
				else{
					if(searched_domain.toLowerCase().indexOf("rediff") != 0){
						//$("#btn_get_it_now").attr("disabled","disabled");
						//$("#btn_get_it_now").html("Checking..");
						//$("#btn_get_it_now").addClass("disabled");
						
						//searchDomainFromHome("before_proceed");
						if(confirm("Would you like to go ahead without checking the availability of the domain?")){
							
							if(searched_domain.indexOf("www.") == 0){
								searched_domain = searched_domain.substring(4);
								$("#home_dom_search").val(searched_domain);
							}
							
							$('#domSkuString').val('RH-XOM-' + duration);
							$("#domain_name").val(searched_domain);
							$("#is_dom_verfied").val("0"); //Just in case..
							
							//email
							gId('emlSkuString').value = 'RH-' + 'EML' + $('#email').html() + '-' + $('#sizeunit').html() +  size + '-' + duration ;
							gId('mobSkuString').value= '' ;		
							gId('catchSkuString').value= '' ;
							
							//Tracking code...
							fieldTrack(trackElem,'submit') ;
							
							gId('buynow').submit();
						}
					}
					else{
						alert("'"+searched_domain+"' is a trademark domain name. Please choose another domain name.");
						return false;
					}
				}
			}
		}
		else{
			alert("Please enter a valid domain.\nE.g. shahtrading.com");
			
			/*$("#buynow").submit(function(e){
		        e.preventDefault();
		    });*/
			
			return false;
		}
	}
	return false;
}

function setFinalSkuBtm(trackElem){
	var email = $('#email_btm') ;
	var size = ($('#size_btm').html().length == 1)?'0'+$('#size_btm').html():$('#size_btm').html() ;
	var duration = ($('#year_btm').html().length == 1)?'0'+$('#year_btm').html():$('#year_btm').html() ;
	
	//XOM
	var searched_domain = $("#home_dom_search_btm").val();
	
	if( (searched_domain == "") || (searched_domain == "Enter a domain name of your choice") || (searched_domain == "Enter your existing domain") || (searched_domain == "Enter the domain name you want") || (searched_domain == "Enter a domain name e.g. shahtrading.in") || (searched_domain == "Enter a domain e.g. shahtrading.in")  ){
		$('#domSkuStringBtm').val('RH-XOM-' + duration);
		$("#domain_name_btm").val("no_dom");
		//email
		gId('emlSkuStringBtm').value = 'RH-' + 'EML' + $('#email_btm').html() + '-' + $('#size_btm_unit').html() +  size + '-' + duration ;
		gId('mobSkuStringBtm').value= '' ;
		gId('catchSkuStringBtm').value= '' ;
		//Tracking code...
		fieldTrack(trackElem,'submit') ;
		
		gId('buynow_btm').submit();
	}
	else{
		if(validateDomainBtm(searched_domain)){
			var dom_verified_status = $("#is_dom_verfied_btm").val();
			
			if(isDomainAvailable === false){
				if(confirm("The domain you have entered is not available, would you like to go ahead without a domain?"))
				{
					$('#domSkuStringBtm').val('RH-XOM-' + duration);
					$("#domain_name_btm").val("no_dom");
					
					//email
					gId('emlSkuStringBtm').value = 'RH-' + 'EML' + $('#email_btm').html() + '-' + $('#size_btm_unit').html() +  size + '-' + duration ;
					gId('mobSkuStringBtm').value= '' ;		
					gId('catchSkuStringBtm').value= '' ;
					//Tracking code...
					fieldTrack(trackElem,'submit') ;
					
					gId('buynow_btm').submit();
				}
				else{
					return false;
				}
			}
			else{
				if(dom_verified_status == 1){
					$('#domSkuStringBtm').val('RH-XOM-' + duration);
					$("#domain_name_btm").val(searched_domain);
					
					//email
					gId('emlSkuStringBtm').value = 'RH-' + 'EML' + $('#email_btm').html() + '-' + $('#size_btm_unit').html() +  size + '-' + duration ;
					gId('mobSkuStringBtm').value= '' ;		
					gId('catchSkuStringBtm').value= '' ;
					//Tracking code...
					fieldTrack(trackElem,'submit') ;
					
					gId('buynow_btm').submit();
				}
				else{
					if(searched_domain.toLowerCase().indexOf("rediff") != 0){
						//$("#btn_get_it_now").attr("disabled","disabled");
						//$("#btn_get_it_now").html("Checking..");
						//$("#btn_get_it_now").addClass("disabled");
						
						//searchDomainFromHome("before_proceed");
						
						if(confirm("Would you like to go ahead without checking the availability of the domain?")){
							
							if(searched_domain.indexOf("www.") == 0){
								searched_domain = searched_domain.substring(4);
								
								$("#home_dom_search_btm").val(searched_domain);
							}
							
							$('#domSkuStringBtm').val('RH-XOM-' + duration);
							$("#domain_name_btm").val(searched_domain);
							$("#is_dom_verfied_btm").val("0"); //Just in case..
							
							//email
							gId('emlSkuStringBtm').value = 'RH-' + 'EML' + $('#email_btm').html() + '-' + $('#size_btm_unit').html() +  size + '-' + duration ;
							gId('mobSkuStringBtm').value= '' ;		
							gId('catchSkuStringBtm').value= '' ;
							
							//Tracking code...
							fieldTrack(trackElem,'submit') ;
							
							gId('buynow_btm').submit();
						}
					}
					else{
						alert("'"+searched_domain+"' is a trademark domain name. Please choose another domain name.");
						return false;
					}
				}
			}
		}
		else{
			alert("Please enter a valid domain.\nE.g. shahtrading.com");
			
			/*$("#buynow").submit(function(e){
		        e.preventDefault();
		    });*/
			
			return false;
		}
	}
	return false;
}

function checkExistingDomain(){
	if($('#existing_domain_check').is(":checked")){
		if(placeholderIsSupported()){
			$("#home_dom_search").attr("placeholder","Enter your existing domain");
		}
		else{
			$("#home_dom_search").attr("placeholder","Enter your existing domain");
			$("#home_dom_search").val("Enter your existing domain");
		}
		
		$('#existing_domain').val("1");
	}
	else{
		if(placeholderIsSupported()){
			$("#home_dom_search").attr("placeholder","Enter the domain name you want");
		}
		else{
			$("#home_dom_search").attr("placeholder","Enter the domain name you want");
			$("#home_dom_search").val("Enter the domain name you want");
		}
		
		$('#existing_domain').val("0");
	}
}

function placeholderIsSupported() {
    test = document.createElement('input');
    return ('placeholder' in test);
}

function openPopup(type){
	if (type=="disclaimer"){
		window.open('/hosting/scripts/disclaimer.phtml',"win1","toolbar=no,directories=no,resize=yes,menubar=no,location=no,scrollbars=yes,width=650,height=500,maximize=null,top=70,left=80");
	}
	if (type=="terms"){
		window.open('/hosting/scripts/terms.phtml',"win2","toolbar=no,directories=no,resize=yes,menubar=no,location=no,scrollbars=yes,width=650,height=500,maximize=null,top=70,left=80");
	}
	if (type=="renewal"){
		window.open('/hosting/scripts/lead_renew.phtml',"win2","toolbar=no,directories=no,resize=yes,menubar=no,location=no,scrollbars=yes,width=500,height=490,maximize=null,top=70,left=80");
	}
	if (type=="businessassociate"){
		window.open('businessassociate.phtml',"win2","toolbar=no,directories=no,resize=yes,menubar=no,location=no,scrollbars=yes,width=500,height=490,maximize=null,top=70,left=80");
	}
}

function initFeatureTabs(defaultPane){
	var allTabHandles = $(".rw-feature");
	for(var i=0; i < allTabHandles.length; i++){
		if( $(allTabHandles[i]).attr("tab_handle") == defaultPane ) {
			$(allTabHandles[i]).removeClass().addClass("rw-feature").addClass("rw-feat-tab-selected");
			var selectTab = $(allTabHandles[i]).append('<div class="floatR rw-feat-tab-selected-arrow"></div>');
			break;
		}
	}
	
	$(".rw-tab-pane").hide();
	$("#"+defaultPane).show();
}

function showTabContent(tabHandle){
	var allTabHandles = $(".rw-feature");
	for(var i=0; i < allTabHandles.length; i++){
		var handleText = $.trim($(allTabHandles[i]).text());
		var selectTab = $(allTabHandles[i]).html(handleText);
		$(allTabHandles[i]).removeClass("rw-feat-tab-selected");
	}
	
	$(tabHandle).addClass("rw-feat-tab-selected");
	var handleText = $.trim($(tabHandle).text());
	var selectTab=$(tabHandle).html("<div class='floatL'>"+handleText+'</div><div class="floatR rw-feat-tab-selected-arrow"></div>');
	
	var paneID = $(tabHandle).attr("tab_handle");
	$(".rw-tab-pane").hide();
	$("#"+paneID).show();
}

function toggleInterestedBar(){
	var barDisplayStatus = $("#callme_area").css("display");
	if(barDisplayStatus == "none"){
		$("#callme_area").show();
		$("#interested_bar_container").height(40);
		/*$("#interested_bar_container").animate({
			height:60
		},100);*/
		$("#collapse_handle").removeClass().addClass("rw-collapse-interest-bar-down");
	}
	else{
		$("#callme_area").hide();
		$("#interested_bar_container").height(0);
		/*$("#interested_bar_container").animate({
			height:20
		},100);*/
		
		$("#collapse_handle").removeClass().addClass("rw-collapse-interest-bar-up");
	}
}

function readMoreInfo(sectionID){
	if($("#"+sectionID).css("display") == "inline"){
		$("#"+sectionID).hide();
		$("#read_more_handle").html("Show more &gt;");
	}
	else{
		$("#"+sectionID).show();
		$("#read_more_handle").html("Show less &gt;");
	}
}

function trackFooterContactForm(){
	var tracklink;
	var addContactParam = "";
	
	if(document.getElementById('fill_metric')){
		tracklink = $(location).attr('href').split("?");
		if(tracklink.length > 1){
			addContactParam = "&msg=thank-you-phone";
		}
		else{
			addContactParam = "?msg=thank-you-phone";
		}
		
		document.getElementById('fill_metric').src = $(location).attr('href')+addContactParam;
	}
}

function inactivityCheck() {
	idleTime = idleTime + 5;
    if (idleTime >= maxIdleTime){
		//console.log("Inactivity detected! :"+idleTime);
		idleTime = 0;
		if(!holdInactivityCheck){
		    $("#wait_clicktocallmsg").hide();
            $("#submit_clicktocall").show();
			$("#slide_response").hide();
			$("#slide_timeout_response").hide();
			$("#slide_before").show();
			rLightBox.showSlide("#inactivity_slide",0);
		}
		else{
			//console.log("Inactivity detected, but holding the msg bcoz another one is open");
		}
    }
}

function changePhoneCountryCode(sCountryField,sCountryCodeField){
	if(gId(sCountryField).value=="IN"){
		gId(sCountryCodeField).value="91";
	}else {
		gId(sCountryCodeField).value="";
	} 
}

function setCookie(c_name,value,exdays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name){
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1){
		c_start = c_value.indexOf(c_name + "=");
	}
	
	if (c_start == -1){
		c_value = null;
	}
	else{
		c_start = c_value.indexOf("=", c_start) + 1;
	  	var c_end = c_value.indexOf(";", c_start);
	  	if (c_end == -1){
			c_end = c_value.length;
		}
		c_value = unescape(c_value.substring(c_start,c_end));
	}
	
	return c_value;
}

function autoSearchForDomain(){
	$("#outer_border").css("border","solid 2px #EEEEEE");
	$("#dom_unavail_sugg").hide();
	$("#check_domain").css("background","");
	$("#check_domain").css("background-color","none");
	
	$(".dom-status").hide();
	$("#dom_check").show();
	
	$("#home_dom_search").css("width","276px");
	$("#check_domain").show();
	
	$("#is_dom_verfied").val("0");
	
	domSearchComplete = false;
	isDomainAvailable = "";
	
	searchDomainFromHome("from_home");
}

function initCampaignTabs(){
	$(".camp-tab").hide();
	$("#home_tab_handle").addClass('bold black no-underline tab-handle');
	$("#home_tab").fadeIn();
}

function showCampaignTab(tabID){
	$(".tab-handle").removeClass().addClass("rwa rwf14 tab-handle");
	
	switch(tabID){
		case "#home_tab":
			$("#home_tab_handle").addClass('bold black no-underline tab-handle');
			$(".rw-campaign-tab-arrow").css("margin-left","345px")
		break;
		
		case "#features_tab":
			$("#features_tab_handle").addClass('bold black no-underline tab-handle');
			$(".rw-campaign-tab-arrow").css("margin-left","460px")
		break;
		
		case "#pricing_tab":
			$("#pricing_tab_handle").addClass('bold black no-underline tab-handle');
			$(".rw-campaign-tab-arrow").css("margin-left","572px")
		break;
		
		case "#faq_tab":
			$("#faq_tab_handle").addClass('bold black no-underline tab-handle');
			$(".rw-campaign-tab-arrow").css("margin-left","637px")
		break;
	}
	
	$(".camp-tab").hide();
	$(tabID).fadeIn();
	
	fieldTrack("campaign_tabs",tabID);
}

function showTabList(listObj){
	var listDom = "#"+$(listObj).attr("list_dom");
	$(".tab-list").removeClass().addClass("tab-list");
	$(listObj).addClass("rwa no-underline bold black tab-list");
	$(".rw-campaign-l-arrow").hide();
	
	var parent = $(listObj).parent().parent();
	var children = $(parent).children();
	
	$(children[2]).show();
	
	$(".list-detail").hide();
	$(listDom).fadeIn();
	
	fieldTrack("list_tabs",listDom);
}

function showTabListFaq(listObj){
	var listDom = "#"+$(listObj).attr("list_dom");
	$(".tab-list-faq").removeClass().addClass("tab-list-faq");
	$(listObj).addClass("rwa no-underline bold black tab-list-faq");
	$(".rw-campaign-l-arrow-faq").hide();
	
	var parent = $(listObj).parent().parent();
	var children = $(parent).children();
	
	$(children[2]).show();
	
	$(".list-detail-faq").hide();
	$(listDom).fadeIn();
	
	fieldTrack("list_tabs_faq",listDom);
}

function getCampaignPrice(){
	var allEmailPlans =  $('[name="email_radio"]');
	var allEmailSize  =  $('[name="email_size"]');
	var skuCampaign = "RH-";
	//var sku = "RH-EML05-GB02-01";
	
	for(var i=0; i < allEmailPlans.length; i++){
		if($(allEmailPlans[i]).is(":checked") == true){
			var checkedEmail = $(allEmailPlans[i]).val();
			break;
		}
	}
	
	for(var i=0; i < allEmailSize.length; i++){
		if($(allEmailSize[i]).is(":checked") == true){
			var checkedEmailSize = $(allEmailSize[i]).val();
			break;
		}
	}
	
	skuCampaign += "EML"+checkedEmail+"-GB"+checkedEmailSize+"-01";
	
	
	var total_price = get_price(skuCampaign);
	var price_per_month = Math.ceil(total_price/12);
	
	var emailPrice = parseInt(get_price(skuCampaign));
	var new_sku = "RH-EML1-GB"+checkedEmailSize+"-01"; //Base SKU for 1 email and 1 year.
	var noOfEmails = parseInt(checkedEmail,10);
	var actualPrice = (get_price(new_sku)) * noOfEmails;
	var diffPercentage = (1 - (emailPrice/actualPrice));
	
	if(actualPrice > emailPrice){
		$(".actual_price").show();
		$(".actual_price").html("Rs. "+actualPrice);
	}
	else{
		$(".actual_price").hide();
	}
	
	$(".total_price").html(total_price);
	$(".price_per_month").html(price_per_month);
}

function resetCallMeForm(){
	$("#call_form_title").show();
	$("#callme_form_area").show();
	$("#callme_default").show();
	$("#callme_success").hide();
	$("#callme_failed").hide();
}
function faq_prize(email_no){
    
   //skuCampaign += "EML"+checkedEmail+"-GB"+checkedEmailSize+"-01";
   var sku_2gb = 'RH-' + 'EML' +email_no+ '-GB02'+ '-01';
   var sku_5gb = 'RH-' + 'EML' +email_no+ '-GB05'+ '-01';
   var total_price_2gb = get_price(sku_2gb);
   var total_price_5gb = get_price(sku_5gb);
   $("#faq_price_form").append('<tr><td class="borderBottom borderRight">'+email_no+' email ID</td><td class="borderBottom borderRight">Rs. '+total_price_2gb+'</td><td class="borderBottom">Rs. '+total_price_5gb+'</td></tr>');
   
}
function faq_prize_list(email_no){
   for(i=1;i < 6;i++){
    faq_prize(i);
   }
   faq_prize(10);
   faq_prize(15);
   faq_prize(25);
   faq_prize(50);
}
function callAOLData(successCallBack){
   var phone_no=gId('phone_clicktocall').value;
   var user_name=gId('name_clicktocall').value;
   var captcha = gId('captcha_clicktocall').value;
   
   if(phone_no == ''){
     alert('Please Enter Phone Number');
	 return false;
   }
   
   if(captcha == ''){
     alert('Please Enter Captcha');
	 return false;
   }
   $("#wait_clicktocallmsg").show();
   //$("#submit_clicktocall").hide();
   $.ajax({
		url		: 	APPLICATIONBASEURL+"/clicktocall",
		type	: 	"POST",	
		async 	: 	true,
		data 	: 	"phone="+phone_no+"&captcha="+captcha+"&user_name="+user_name,
		success : 	successCallBack
	});
}
function fn_sub_aol(res){
   
   var arr=res.split("|");
   if(arr[0] == '1'){
      alert(arr[1]);
	  $("#wait_clicktocallmsg").hide();
      $("#submit_clicktocall").show();
   }else if(arr[0] == '2'){
      $("#slide_timeout_response").show();
	  $("#slide_response").hide();
	  $("#slide_before").hide();
   }else{
      $("#slide_response").show();
	  $("#slide_timeout_response").hide();
	  $("#slide_before").hide();
	  $("#phone_dis").html(gId('phone_clicktocall').value);
     //rLightBox.closeLightBox('#inactivity_slide');
   }
}
function close_inactivity(){
    holdInactivityCheck = true;
	rLightBox.closeLightBox("#inactivity_slide");
}
function sendLeadFrmBookingForm(){
	//send the lead details to clicktocall api
	if($('#phone_clicktocall')!=undefined){
		if($('#phone_clicktocall').val() != "" && isNaN($('#phone_clicktocall').val())==false && $('#phone_clicktocall').val().length>9 ){
			callClickData(clicktocallResponse,1);
		}
	}
}
function sendEproLeadFrmBookingForm(){
	return;
	//send the lead details to clicktocall api
	if($('#phone_clicktocall')!=undefined){
		if($('#phone_clicktocall').val() != "" && isNaN($('#phone_clicktocall').val())==false && $('#phone_clicktocall').val().length>9 ){
			callClickDataSubmitSuper(function(){},1);
		}
	}
}

