if(typeof (vjo)=="undefined"){
var vjo={};
}
vjo.global=this;
vjo.createPkg=function(_1){
var _2=_1.split("."),len=_2.length;
var _3=this.global;
for(var i=0;i<len-1&&_3&&_2[i];i++){
_3=(_3[_2[i]])?_3[_2[i]]:_3[_2[i]]={};
}
return {pkg:_3,className:(len>0)?_2[len-1]:""};
};
vjo.needs=function(){
};
vjo.needsLib=function(){
};
vjo.type=function(_5){
var _6=function(){
if(this.base){
this.base.parent=this;
}
if(this.constructs){
var rv=this.constructs.apply(this,arguments);
if(rv){
return rv;
}
}
return null;
};
_6.props=function(_8){
for(var i in _8){
if(i!="props"&&i!="protos"&&i!="inherits"&&i!="prototype"&&i!="inits"&&i!="satisfies"&&i!="satisfiers"){
_6[i]=_8[i];
}
}
return _6;
};
function createBaseMethod(_a,_b,_c){
_a.prototype.base[_c]=function(){
var _d=this.parent,supBase=(_b.prototype&&_b.prototype.base)?_b.prototype.base[_c]:null,curBase;
if(supBase){
curBase=_d.base[_c];
_d.base[_c]=supBase;
}
var _e=(this.parent)?this.parent:this;
var rv=_b.prototype[_c].apply(_e,arguments);
if(curBase){
_d.base[_c]=curBase;
}
return rv;
};
}
_6.protos=function(obj,_11){
for(var i in obj){
if(i!="base"&&(!_11||i!="constructs")){
if(_11&&_11.prototype&&_11.prototype[i]&&typeof obj[i]=="function"){
createBaseMethod(_6,_11,i);
}
if((!_11&&!_6.prototype[i])&&_6.prototype.base&&_6.prototype.base[i]){
_6.prototype[i]=function(){
_6.prototype.base[i].apply(this,arguments);
};
}else{
if(!(_11&&_6.prototype[i])){
_6.prototype[i]=obj[i];
}
}
}
}
return _6;
};
function createBase(clz,_14){
return (function(){
var _15=_14.prototype.base||_14,constructs=this.constructs,curBase=this.base;
if(_14.prototype.constructs&&constructs){
this.constructs=_14.prototype.constructs;
}
this.base=function(){
_15.apply(this,arguments);
};
_14.apply(this,arguments);
if(constructs){
this.constructs=constructs;
}
this.base=curBase;
});
}
_6.inherits=function(_16){
var _17=vjo.createPkg(_16);
var _18=_17.pkg[_17.className];
_6.prototype.base=createBase(_6,_18);
_6.protos(_18.prototype,_18);
_6.props(_18);
return _6;
};
_6.singleton=function(){
return _6;
};
_6.inits=function(_19){
var _1a=vjo.createPkg(_5);
if(typeof _1a.pkg[_1a.className]=="function"){
_19.call(this);
}
return _6;
};
_6.satisfies=function(_1b){
return _6;
};
_6.satisfiers=function(_1c){
return _6;
};
_6.makeFinal=function(){
return _6;
};
var _1d=vjo.createPkg(_5);
return (_1d.pkg[_1d.className])?_6:(_1d.pkg[_1d.className]=_6);
};

vjo.type("vjo.Registry").singleton().protos({constructs:function(){
this.controls=[];
},put:function(_1,_2){
return this.controls[_1]=_2;
},get:function(_3){
return this.controls[_3];
},dump:function(){
var _4=this.controls;
var _5="controls on page:\n";
for(var i in _4){
_5+="key = "+i;
_5+="controlName = "+_4[i].objtype;
_5+="\n";
}
return _5;
}}).inits(function(){
vjo.Registry=new vjo.Registry();
});

vjo.type("vjo.dsf.Event").protos({constructs:function(_1,_2,_3){
this.src=_1;
this.eventType=_2;
this.nativeEvent=_3;
}});

vjo.needs("vjo.dsf.Event");
vjo.type("vjo.dsf.EventDispatcher").singleton().protos({constructs:function(){
this.eventHandlers={};
this.nativeEventHandlers={};
this.unboundElems=[];
this.fCustomLoad={};
},process:function(_1,_2){
var _3=this.eventHandlers[_1];
if(!_3){
return true;
}
var _4=_3[_2.eventType];
if(!_4){
return true;
}
var _5;
for(var i=0;i<_4.length;i++){
var _7=_4[i].handle(_2);
if(_7&&_7.objType=="dsf_Message"){
if(vjo.dsf.ServiceEngine){
vjo.dsf.ServiceEngine.handleRequest(_7);
}
if(_7.returnData===false){
_5=false;
}
}else{
if(_5!=false&&typeof _7!="undefined"){
_5=_7;
}
}
}
return _5;
},register:function(id,_9,_a){
if(!id||!_9||!_a){
return this;
}else{
if(typeof _a.handle!="function"){
if(typeof _a=="function"){
var _b=_a;
var _c={handle:function(){
return _b.apply(this,arguments);
}};
_a=_c;
}else{
return this;
}
}
}
var _d=this.eventHandlers[id];
if(!_d){
_d=this.eventHandlers[id]={};
}
if(!_d[_9]){
_d[_9]=[];
}
var _e=_d[_9].length;
_d[_9][_e]=_a;
return _a;
},unregister:function(id,_10){
if(!this.eventHandlers[id]){
return;
}
this.eventHandlers[id][_10]=[];
},registerNative:function(_11,_12,_13){
var id=(_11==window)?"body":_11.id;
var _15=this.nativeEventHandlers[id];
if(!_15){
_15=this.nativeEventHandlers[id]={};
}
if(!_15[_12]){
_15[_12]=[];
}
var len=_15[_12].length;
_15[_12][len]=_13;
},add:function(id,_18,_19){
if(!id||!_18||!_19){
return this;
}
var b=this.isBound(id,_18),rv=this.register(id,_18,_19);
if(!b){
var b=this.bind(id,_18);
if(b==null){
var len=this.unboundElems.length;
this.unboundElems[len]=id;
}
}
return rv;
},addEventListener:function(_1c,_1d,_1e,_1f,_20){
var scp=_1f||vjo.global;
if(typeof _1c=="string"){
_1c=document.getElementById(_1c);
}
if(!_1c){
return false;
}
var _22=function(_23){
var ev=window.event||_23;
var rv=_1e.call(scp,ev);
if(rv===false){
vjo.dsf.EventDispatcher.stopEvent(ev);
}
if(typeof rv!="undefined"){
return rv;
}
};
if(window.addEventListener){
_1c.addEventListener(_1d,_22,_20||false);
this.registerNative(_1c,_1d,_22);
return _22;
}else{
if(window.attachEvent){
_1c.attachEvent("on"+_1d,_22);
this.registerNative(_1c,_1d,_22);
return _22;
}
}
_1c["on"+_1d]=_1e;
return false;
},bind:function(id,_27){
var _28=document.getElementById(id);
if(id=="body"||_28==document.body){
_28=document.body;
if(_27=="load"||_27=="unload"){
var rv=this.addEventListener(window,_27,function(){
var oED=vjo.dsf.EventDispatcher;
if(typeof oED.fCustomLoad[_27]=="function"){
oED.fCustomLoad[_27]();
}
oED[_27]("body");
oED.unregister("body",_27);
oED.fCustomLoad={};
});
if(rv===false){
if(_28.vjLoadSet){
return this;
}else{
_28.vjLoadSet=true;
var _2b=window["on"+_27]||"";
if(_2b){
this.fCustomLoad[_27]=_2b;
}
}
}
return this;
}
}
if(_28){
this.addEventListener(_28,_27,function(_2c){
return vjo.dsf.EventDispatcher[_27](this,_2c||window.event);
},_28);
return this;
}
return null;
},reBind:function(){
var eH=this.eventHandlers,uE=this.unboundElems,len=uE.length,tmp=[];
for(var i=0;i<len;i++){
var id=uE[i],hdls=eH[id];
if(hdls){
for(var _30 in hdls){
if(!this.hasBinding(id,_30)){
var rv=this.bind(id,_30);
if(rv==null){
tmp[tmp.length]=id;
}
}
}
}
}
this.unboundElems=tmp;
},isBound:function(id,_33){
var _34=this.eventHandlers[id];
return (_34&&_34[_33]&&_34[_33].length>0)?true:false;
},hasBinding:function(id,_36){
var nEH=this.nativeEventHandlers;
if(nEH[id]&&nEH[id][_36]){
var aH=nEH[id][_36],len=aH.length,rv=false;
for(var i=0;i<len;i++){
var str=aH[i].toString();
if(str&&str.indexOf("vjo.dsf.EventDispatcher")!=-1){
return true;
}
}
}
return false;
},removeEventListener:function(_3b,_3c,_3d){
if(!_3b||!_3c){
return;
}else{
if(typeof _3b=="string"){
_3b=document.getElementById(_3b);
}
}
if(window.addEventListener&&_3d){
_3b.removeEventListener(_3c,_3d,false);
}else{
if(window.attachEvent&&_3d){
_3b.detachEvent("on"+_3c,_3d);
}else{
_3b["on"+_3c]=null;
}
}
},detachNativeHandlers:function(_3e,_3f){
var id=(_3e==window)?"body":_3e.id;
var _41=this.nativeEventHandlers[id];
if(_41&&_41[_3f]){
var h=_41[_3f];
for(var i=0;i<h.length;i++){
this.removeEventListener(_3e,_3f,_41[_3f][i]);
}
_41[_3f]=[];
}
},detachHandler:function(id,_45,_46){
var _47=this.eventHandlers[id];
if(!_47||!_47[_45]){
return;
}
var h=[],len=_47[_45].length;
for(var i=0;i<len;i++){
if(_46!=_47[_45][i]){
h[h.length]=_47[_45][i];
}
}
this.eventHandlers[id][_45]=h;
},detachHandlers:function(id,_4b){
this.unregister(id,_4b);
var _4c=document.getElementById(id);
if(id=="body"){
_4c=window;
}
if(_4c){
this.detachNativeHandlers(_4c,_4b);
}
},stopEvent:function(evt){
this.stopPropagation(evt);
this.preventDefault(evt);
},stopPropagation:function(evt){
if(evt.stopPropagation){
evt.stopPropagation();
}else{
evt.cancelBubble=true;
}
},preventDefault:function(evt){
if(evt.preventDefault){
evt.preventDefault();
}else{
evt.returnValue=false;
}
},target:function(_50){
return this.resolveTextNode((_50.target)?_50.target:_50.srcElement);
},relatedTarget:function(_51){
if(_51.relatedTarget){
return this.resolveTextNode(_51.relatedTarget);
}else{
if((_51.type=="mouseover")&&_51.fromElement){
return this.resolveTextNode(_51.fromElement);
}else{
if((_51.type=="mouseout")&&_51.toElement){
return this.resolveTextNode(_51.toElement);
}else{
return null;
}
}
}
},resolveTextNode:function(_52){
return (_52&&(_52.nodeType==3))?_52.parentNode:_52;
},cleanUp:function(){
var _53=this.nativeEventHandlers;
for(var id in _53){
for(var ev in _53[id]){
if(ev!="unload"){
this.detachHandlers(id,ev,true);
}
}
}
},getId:function(src,id){
var _58=id;
if(_58===null||!_58){
_58=src.id;
}
return _58;
},getBodyId:function(src,id){
var _5b=this.getId(src,id);
if(!_5b||src==document.body){
_5b="body";
}
return _5b;
},load:function(src,_5d){
var id=this.getBodyId(src);
var rv=this.process(id,new vjo.dsf.Event(src,"load",_5d));
if(id==="body"){
this.unregister("body","load");
}
return rv;
},unload:function(src,_61){
return this.process(this.getBodyId(src),new vjo.dsf.Event(src,"unload",_61));
},change:function(src,_63){
return this.process(this.getId(src),new vjo.dsf.Event(src,"change",_63));
},submit:function(src,_65){
return this.process(this.getId(src),new vjo.dsf.Event(src,"submit",_65));
},reset:function(src,_67){
return this.process(this.getId(src),new vjo.dsf.Event(src,"reset",_67));
},select:function(src,_69){
return this.process(this.getId(src),new vjo.dsf.Event(src,"select",_69));
},blur:function(src,_6b){
return this.process(this.getId(src),new vjo.dsf.Event(src,"blur",_6b));
},focus:function(src,_6d){
return this.process(this.getId(src),new vjo.dsf.Event(src,"focus",_6d));
},keydown:function(src,_6f){
return this.process(this.getBodyId(src),new vjo.dsf.Event(src,"keydown",_6f));
},keypress:function(src,_71){
return this.process(this.getBodyId(src),new vjo.dsf.Event(src,"keypress",_71));
},keyup:function(src,_73){
return this.process(this.getBodyId(src),new vjo.dsf.Event(src,"keyup",_73));
},click:function(src,_75){
return this.process(this.getBodyId(src),new vjo.dsf.Event(src,"click",_75));
},dblclick:function(src,_77){
return this.process(this.getBodyId(src),new vjo.dsf.Event(src,"dblclick",_77));
},mousedown:function(src,_79){
return this.process(this.getBodyId(src),new vjo.dsf.Event(src,"mousedown",_79));
},mousemove:function(src,_7b){
return this.process(this.getBodyId(src),new vjo.dsf.Event(src,"mousemove",_7b));
},mouseout:function(src,_7d){
return this.process(this.getBodyId(src),new vjo.dsf.Event(src,"mouseout",_7d));
},mouseover:function(src,_7f){
return this.process(this.getBodyId(src),new vjo.dsf.Event(src,"mouseover",_7f));
},mouseup:function(src,_81){
return this.process(this.getBodyId(src),new vjo.dsf.Event(src,"mouseup",_81));
}}).inits(function(){
vjo.dsf.EventDispatcher=new vjo.dsf.EventDispatcher();
vjo.dsf.EventDispatcher.addEventListener(window,"load",function(){
vjo.dsf.EventDispatcher.addEventListener(window,"unload",function(){
vjo.dsf.EventDispatcher.cleanUp();
});
});
});

vjo.type("vjo.darwin.core.encoding.Enc").props({isUTF8:function(){
if(typeof (_GlobalNavHeaderUtf8Encoding)!="undefined"){
return _GlobalNavHeaderUtf8Encoding;
}
return false;
}}).inits(function(){
var _1=window.escape;
var _2=window.unescape;
window.unescape=function(_3){
return decodeURIComponent(_3);
};
var _4=window.decodeURI;
window.decodeURI=function(_5){
try{
return _4(_5);
}
catch(e){
return _2(_5);
}
};
var _6=window.decodeURIComponent;
window.decodeURIComponent=function(_7){
try{
return _6(_7);
}
catch(e){
return _2(_7);
}
};
var _8=window.encodeURIComponent;
window.encodeURIComponent=function(_9){
var _a=vjo.darwin.core.encoding.Enc.isUTF8();
if(_a){
return _8(_9);
}
return _1(_9);
};
var _b=window.encodeURI;
window.encodeURI=function(_c){
var _d=vjo.darwin.core.encoding.Enc.isUTF8();
if(_d){
return _b(_c);
}
return _1(_c);
};
});

vjo.needs("vjo.dsf.typeextensions.string.Comparison");
String.prototype.replaceToken=function(_1,_2,_3){
var rv=_1;
while(rv.has(_2)){
rv=rv.replace(_2,_3);
}
return rv;
};
String.prototype.replaceTokensEx=function(_5){
var rv=this,re,tkn,a=arguments,l=a.length;
for(var i=1;i<l+1;i++){
rv=this.replaceToken(rv,_5.replace("n",(i)),a[i]);
}
return rv;
};
String.prototype.replaceTokens=function(){
var rv=this,re,tkn,a=arguments,l=a.length;
for(var i=0;i<l;i++){
rv=this.replaceToken(rv,"<#"+(i+1)+"#>",a[i]);
}
return rv;
};

String.prototype.has=function(_1){
return (this.indexOf(_1)!=-1);
};
String.prototype.hasArg=function(_2){
var a=_2,rv=false;
if(typeof (a)=="string"){
rv=this.has(a);
}else{
var aL=a.length;
for(var j=0;j<aL&&!rv;j++){
rv=this.has(a[j]);
}
}
return rv;
};
String.prototype.hasAny=function(){
var a=arguments,l=a.length,rv=false;
for(var i=0;i<l&&!rv;i++){
rv=this.hasArg(a[i]);
}
return rv;
};
String.prototype.hasAll=function(){
var a=arguments,l=a.length;
for(var i=0;i<l;i++){
if(!this.hasArg(a[i])){
return false;
}
}
return true;
};
String.prototype.is=function(s){
return (this==s);
};
String.prototype.isAny=function(){
var a=arguments,l=a.length,rv=false,aL;
for(var i=0;i<l&&!rv;i++){
if(typeof (a[i])=="string"){
rv=(this==a[i]);
}else{
aL=a[i].length;
for(var j=0;j<aL&&!rv;j++){
rv=(this==a[i][j]);
}
}
}
return rv;
};

vjo.needs("vjo.dsf.typeextensions.string.Comparison");
vjo.type("vjo.dsf.client.Browser").props({init:function(){
this.bFirefox=this.bWebTV=this.bOpera=this.bNav=this.bIE=this.bSafari=this.bWin=this.bMac=this.bMacppc=this.bMactel=this.bActiveXSupported=this.bWinXp=this.bXpSp2=this.bAOL=this.bVista=false;
this.iVer=this.fVer=-1;
this.fMinorVer=0;
this.aMimeTypes=null;
var nv=navigator,agt=nv.userAgent.toLowerCase(),i=0,ver;
with(this){
if(agt.has("webtv")){
bWebTV=true;
i=agt.indexOf("webtv/")+6;
}else{
if(agt.has("firefox")){
bFirefox=true;
i=agt.lastIndexOf("firefox")+8;
}else{
if(agt.has("safari")){
bSafari=true;
i=agt.lastIndexOf("safari")+7;
}else{
if(typeof (window.opera)!="undefined"){
bOpera=true;
i=agt.lastIndexOf("opera")+6;
}else{
if(nv.appName.is("Netscape")){
bNav=true;
i=agt.lastIndexOf("/")+1;
}else{
if(agt.has("msie")){
bIE=true;
i=agt.indexOf("msie")+4;
if(agt.has("aol")||agt.has("america online")){
bAOL=true;
}
}
}
}
}
}
}
ver=bOpera?window.opera.version():agt.substring(i);
iVer=parseInt(ver);
fVer=parseFloat(ver);
fMinorVer=fVer-iVer;
bWin=agt.has("win");
bWinXp=(bWin&&agt.has("windows nt 5.1"));
bVista=(bWin&&agt.has("windows nt 6.0"));
bXpSp2=(bWinXp&&agt.has("sv1"));
bMac=agt.has("mac");
bMacppc=(bMac&&agt.hasAny("ppc","powerpc"));
bMactel=(bMac&&agt.has("intel"));
aMimeTypes=nv.mimeTypes;
bActiveXSupported=(!(bMac||bMacppc)&&(typeof (ActiveXObject)=="function"));
}
}}).inits(function(){
vjo.dsf.client.Browser.init();
});

vjo.needs("vjo.dsf.client.Browser");
vjo.type("vjo.dsf.document.Element").props({get:function(_1){
var d=document,e=null;
if(d.getElementById){
e=d.getElementById(_1);
}
if(!e&&d.all){
e=d.all[_1];
}
return e;
},toggleHideShow:function(_3,_4){
var e=this.get(_3),s,d,u="undefined";
if(e){
s=e.style;
d=s.display;
if(typeof (_4)===u){
_4=(d===""||d==="block")?false:true;
}
e.bIsShown=_4;
s.display=(_4)?"block":"none";
}
},promoteToBody:function(_6){
var e=this.get(_6),b=document.body;
if(e&&b&&e.parentNode){
e.parentNode.removeChild(e);
b.appendChild(e);
}
},toggleVisibility:function(_8,_9){
var e=this.get(_8),v,s,u="undefined";
if(e){
s=e.style;
v=s.visibility;
if(typeof (_9)===u){
_9=(v==="")?false:true;
}
e.bIsVisible=_9;
s.visibility=(_9)?"":"hidden";
}
},toggleHideShowRow:function(_b,_c){
var e=this.get(_b),s,d,u="undefined";
var p=vjo.dsf.client.Browser.bFirefox?"table-row":"block";
if(e){
s=e.style;
d=s.display;
if(typeof (_c)===u){
_c=(d===""||d===p)?false:true;
}
e.bIsShown=_c;
s.display=(_c)?p:"none";
}
},enable:function(_f,_10){
var e=this.get(_f);
if(e){
e.disabled=!_10;
}
},left:function(_12,_13){
return this.setLTWH(_12,_13,"Left");
},top:function(_14,_15){
return this.setLTWH(_14,_15,"Top");
},width:function(_16,_17){
return this.setLTWH(_16,_17,"Width");
},height:function(_18,_19){
return this.setLTWH(_18,_19,"Height");
},setLTWH:function(_1a,_1b,_1c){
var e=this.get(_1a);
if(e){
if((_1b!=null)&&!isNaN(parseInt(_1b))){
e.style[_1c.toLowerCase()]=_1b;
}
return e["offset"+_1c];
}
},createElement:function(_1e){
return document.standardCreateElement?document.standardCreateElement(_1e):document.createElement(_1e);
},containsElement:function(_1f,_20){
while((_20!=null)&&(_20!=_1f)&&(_20.parentNode!=null)){
_20=_20.parentNode;
}
return (_20==_1f);
},getElementByTagClass:function(_21,tag,_23){
var _24=_21.getElementsByTagName(tag);
for(var ndx=0;((ndx<_24.length)&&(_24[ndx].className.match(_23)==null));ndx++){
}
return (ndx<_24.length)?_24[ndx]:null;
},getElementsByTagClass:function(_26,tag,_28){
var _29=new Array();
var _2a=_26.getElementsByTagName(tag);
for(var ndx=0;(ndx<_2a.length);ndx++){
if(_2a[ndx].className.match(_28)){
_29.push(_2a[ndx]);
}
}
return _29;
}});

String.prototype.hex2Dec=function(){
return parseInt(this,16);
};

Number.prototype.dec2Hex=function(){
return parseInt(this,10).toString(16);
};

vjo.needs("vjo.dsf.typeextensions.string.Comparison");
vjo.needs("vjo.dsf.typeextensions.string.HexToDecimal");
vjo.needs("vjo.dsf.typeextensions.number.DecimalToHex");
vjo.type("vjo.dsf.cookie.VjCookieJar").props({Default_Cookie_Format:{"COOKIELET_DELIMITER":"^","NAME_VALUE_DELIMITER":"/","escapedValue":true},DP_Cookie_Format:{"COOKIELET_DELIMITER":"^","NAME_VALUE_DELIMITER":"/","bUseExp":true,"startDelim":"b"},Session_Cookie_Format:{"COOKIELET_DELIMITER":"^","NAME_VALUE_DELIMITER":"=","escapedValue":true,"startDelim":"^"},DS_Cookie_Format:{"COOKIELET_DELIMITER":"^","NAME_VALUE_DELIMITER":"/"},sPath:"/",aConversionMap:{"reg":["dp1","reg"],"recent_vi":["ebay","lvmn"],"ebaysignin":["ebay","sin"],"p":["dp1","p"],"etfc":["dp1","etfc"],"keepmesignin":["dp1","kms"],"ItemList":["ebay","wl"],"BackToList":["s","BIBO_BACK_TO_LIST"]},aFormatMap:{},sCOMPAT:"10",sCONVER:"01",sSTRICT:"00",sModesCookie:"ebay",sModesCookielet:"cv",readCookie:function(_1,_2){
var rv=this.readCookieObj(_1,_2).value;
return (rv)?decodeURIComponent(rv):"";
},createDefaultCookieBean:function(_4,_5){
var _6={};
_6.name=_4;
_6.cookieletname=_5;
_6.value="";
_6.maxage=0;
_6.rawcookievalue="";
_6.mode="";
return _6;
},readCookieObj:function(_7,_8){
var _9=this.createDefaultCookieBean(_7,_8);
this.update();
this.checkConversionMap(_9);
_9.rawcookievalue=this.aCookies[_9.name];
if(!_9.name||!_9.rawcookievalue){
_9.value="";
}else{
if(!_9.cookieletname){
this.readCookieInternal(_9);
}else{
this.readCookieletInternal(_9);
}
}
return (typeof (_9)!="undefined")?_9:"";
},checkConversionMap:function(_a){
var _b=this.aConversionMap[_a.name];
if(_b){
_a.mode=this.getMode(_a.name);
_a.name=_b[0];
_a.cookieletname=_b[1];
}
},readCookieInternal:function(_c){
_c.value=_c.rawcookievalue;
return _c;
},readCookieletInternal:function(_d){
var _e=this.getCookielet(_d.name,_d.cookieletname,_d.rawcookievalue);
var _f=this.getFormat(_d.name);
if(_e&&_f.bUseExp){
var _10=_e;
_e=_e.substring(0,_e.length-8);
if(_10.length>8){
_d.maxage=_10.substring(_10.length-8);
}
}
_d.value=_e;
if(_d.mode==this.sCOMPAT){
_d.value=_d.rawcookievalue;
}
return _d;
},readMultiLineCookie:function(_11,_12){
if(!_11||!_12){
return "";
}
var val,r="";
var _14=this.aConversionMap[_11];
if(_14){
val=this.readCookieObj(_14[0],_14[1]).value||"";
}
if(val){
r=this.getCookielet(_11,_12,val)||"";
}
return (typeof (r)!="undefined")?r:"";
},writeCookie:function(_15,_16,_17){
var _18=this.aConversionMap[_15];
if(_18){
this.writeCookielet(_18[0],_18[1],_16,_17);
return;
}
var _19=this.getFormat(_15);
if(_16&&_19.escapedValue){
_16=encodeURIComponent(_16);
}
this.writeRawCookie(_15,_16,_17);
},writeRawCookie:function(_1a,_1b,_1c){
if(_1a&&(_1b!==undefined)){
if((isNaN(_1b)&&_1b.length<4000)||(_1b+"").length<4000){
if(typeof _1c=="number"){
_1c=this.getExpDate(_1c);
}
var _1d=_1c?new Date(_1c):new Date(this.getExpDate(730));
var _1e=this.getFormat(_1a);
var _1f=this.sCookieDomain;
var dd=document.domain;
if(!dd.has(_1f)){
var _21=dd.indexOf(".ebay.");
if(_21>0){
this.sCookieDomain=dd.substring(_21);
}
}
if(document.cookie){
document.cookie=_1a+"="+(_1b||"")+((_1c||_1e.bUseExp)?"; expires="+_1d.toGMTString():"")+"; domain="+this.sCookieDomain+"; path="+this.sPath;
}
}
}
},writeCookieEx:function(_22,_23,_24){
this.writeCookie(_22,_23,this.getExpDate(_24));
},writeCookielet:function(_25,_26,_27,_28,_29){
if(_25&&_26){
this.update();
var _2a=this.getFormat(_25);
if(_2a.bUseExp&&_27){
if(typeof _28=="number"){
_28=this.getExpDate(_28);
}
var _2b=_28?new Date(_28):new Date(this.getExpDate(730));
var _2c=Date.UTC(_2b.getUTCFullYear(),_2b.getUTCMonth(),_2b.getUTCDate());
_2c=Math.floor(_2c/1000);
_27+=_2c.dec2Hex();
}
var val=this.createCookieValue(_25,_26,_27);
this.writeRawCookie(_25,val,_29);
}
},writeMultiLineCookie:function(_2e,_2f,_30,_31,_32){
this.update();
var val=this.createCookieValue(_2e,_2f,_30);
if(val){
var _34=this.aConversionMap[_2e];
if(_34){
this.writeCookielet(_34[0],_34[1],val,_31,_32);
}
}
},getBitFlag:function(_35,_36){
_35=parseInt(_35,10);
var b=_35.toString(2),r=_35?b.charAt(b.length-_36-1):"";
return (r=="1")?1:0;
},setBitFlag:function(_38,_39,_3a){
var b="",p,i,e,l;
_38=parseInt(_38,10);
if(_38){
b=_38.toString(2);
}
l=b.length;
if(l<_39){
e=_39-l;
for(i=0;i<=e;i++){
b="0"+b;
}
}
p=b.length-_39-1;
return parseInt(b.substring(0,p)+_3a+b.substring(p+1),2);
},createCookieValue:function(_3c,_3d,_3e){
var _3f=this.aConversionMap[_3c],format=this.getFormat(_3c),mode=this.getMode(_3c),val;
if(_3f&&(mode==this.sSTRICT||mode==this.sCONVER)){
val=this.readCookieObj(_3f[0],_3f[1]).value||"";
}else{
val=this.aCookies[_3c]||"";
}
if(format){
var _40=this.getCookieletArray(val,format);
_40[_3d]=_3e;
var str="";
for(var i in _40){
if(_40[i]){
str+=i+format.NAME_VALUE_DELIMITER+_40[i]+format.COOKIELET_DELIMITER;
}
}
if(str&&format.startDelim){
str=format.startDelim+str;
}
val=str;
if(format.escapedValue){
val=encodeURIComponent(val);
}
}
return val;
},update:function(){
var aC=document.cookie.split("; ");
this.aCookies={};
for(var i=0;i<aC.length;i++){
var sC=aC[i].split("=");
var _46=this.getFormat(sC[0]),cv=sC[1],sd=_46.startDelim;
if(sd&&cv&&cv.indexOf(sd)===0){
sC[1]=cv.substring(sd.length,cv.length);
}
this.aCookies[sC[0]]=sC[1];
}
},getCookielet:function(_47,_48,_49){
var _4a=this.getFormat(_47);
var _4b=this.getCookieletArray(_49,_4a);
return _4b[_48]||"";
},getFormat:function(_4c){
return this.aFormatMap[_4c]||vjo.dsf.cookie.VjCookieJar.Default_Cookie_Format;
},getCookieletArray:function(_4d,_4e){
var rv=[],val=_4d||"";
if(_4e.escapedValue){
val=decodeURIComponent(val);
}
var a=val.split(_4e.COOKIELET_DELIMITER);
for(var i=0;i<a.length;i++){
var idx=a[i].indexOf(_4e.NAME_VALUE_DELIMITER);
if(idx>0){
rv[a[i].substring(0,idx)]=a[i].substring(idx+1);
}
}
return rv;
},getExpDate:function(_53){
var _54;
if(typeof _53=="number"&&_53>=0){
var d=new Date();
d.setTime(d.getTime()+(_53*24*60*60*1000));
_54=d.toGMTString();
}
return _54;
},getMode:function(_56){
var h=this.readCookieObj(this.sModesCookie,this.sModesCookielet).value,b;
if(!(_56 in this.aConversionMap)){
return null;
}
if(!h){
return "";
}
if(h===0){
return this.sSTRICT;
}
if(h&&h!="0"){
if(h.has(".")){
var a=h.split(".");
for(i=0;i<a.length;i++){
b=a[i].hex2Dec().toString(2)+b;
}
}else{
b=h.hex2Dec().toString(2);
}
i=0;
var l=b.length,j;
for(o in this.aConversionMap){
j=l-(2*(i+1));
f=b.substring(j,j+2).toString(10);
f=(!f)?this.sSTRICT:f;
if(_56==o){
return (f.length==1)?"0"+f:f;
}
i++;
}
return null;
}
}}).inits(function(){
var vCJ=vjo.dsf.cookie.VjCookieJar;
vCJ.aFormatMap={"r":vCJ.Default_Cookie_Format,"dp1":vCJ.DP_Cookie_Format,"npii":vCJ.DP_Cookie_Format,"ebay":vCJ.Session_Cookie_Format,"reg":vCJ.Session_Cookie_Format,"apcCookies":this.Session_Cookie_Format,"ds2":vCJ.DS_Cookie_Format};
});

vjo.type("vjo.dsf.utils.Object").props({hitch:function(_1,_2){
var _3;
if(typeof _2=="string"){
_3=_1[_2];
}else{
_3=_2;
}
return function(){
return _3.apply(_1,arguments);
};
},extend:function(_4,_5){
function inheritance(){
}
inheritance.prototype=_5.prototype;
_4.prototype=new inheritance();
_4.prototype.constructor=_4;
_4.baseConstructor=_5;
_4.superClass=_5.prototype;
}});

vjo.needs("vjo.dsf.typeextensions.string.TokenReplacement");
vjo.needs("vjo.dsf.typeextensions.string.Comparison");
vjo.needs("vjo.dsf.document.Element");
vjo.needs("vjo.dsf.cookie.VjCookieJar");
vjo.needs("vjo.dsf.utils.Object");
vjo.type("vjo.darwin.core.express.ExpressCrossLinking").protos({constructs:function(_1,_2,_3,_4,_5,_6,_7){
this.sLayerId=_1;
this.sCloseAnchorId=_2;
this.sCartCountText=_3;
this.aHostCoutryId=_4;
this.aHostCountryDomain=_5;
this.aHideOnParams=_6;
this.sHtmlProvider=_7;
this.sReferrer=document.referrer;
},getHost:function(){
var _8=vjo.dsf.cookie.VjCookieJar,df=this.sReferrer,sid=_8.readCookie("ebay","ecs")||"",rv="",i;
if(sid=="-1"){
return rv;
}
if(sid){
rv=this.getHostById(sid);
}else{
if((i=df.indexOf(".express."))!=-1){
df=df.substring(i+9).toLowerCase();
var f=df.indexOf("/");
if(f>0){
df=df.substring(0,f);
}
for(i in this.aHostCountryDomain){
if(this.compareHost(this.aHostCountryDomain[i],df)){
rv=this.aHostCountryDomain[i];
_8.writeCookielet("ebay","ecs",this.aHostCoutryId[i]);
break;
}
}
}
}
return rv.toLowerCase();
},compareHost:function(_a,_b){
var _c=_a.toLowerCase(),sh2=_b.toLowerCase();
if(_c.indexOf(".")==0){
_c=_c.substring(1);
}
if(sh2.indexOf(".")==0){
sh2=sh2.substring(1);
}
_c=_c.replace("/","");
sh2=sh2.replace("/","");
return (_c==sh2);
},hideOnParams:function(){
if(this.aHideOnParams){
var _d=this.aHideOnParams;
var _e=_d.length;
for(var i=0;i<_e;i++){
if(document.location.href.has(_d[i])){
return true;
}
}
}
return false;
},init:function(){
if(this.hideOnParams()){
return;
}
var oD=document,oCJ=vjo.dsf.cookie.VjCookieJar,sh="",l=this.sLayerId,E=vjo.dsf.document.Element;
if(sh=this.getHost()){
var oL=E.get(l),ct=oCJ.readCookie("dp1","exc")||"",sc="",lh=oD.location.host;
ct=ct.split(".")[2];
lh=lh.substring(lh.indexOf(".")+1);
if(ct&&ct!="0"&&this.compareHost(lh,sh)){
sc=this.sCartCountText.replaceTokensEx("##n##",ct);
}
if(oL){
oL.innerHTML=this.sHtmlProvider.replaceTokensEx("##n##",sh,sc);
E.toggleHideShow(l,true);
var oCL=E.get(this.sCloseAnchorId);
if(oCL){
oCL.onclick=vjo.dsf.utils.Object.hitch(this,"close");
}
}
}
},getHostById:function(_13){
var ids=this.aHostCoutryId,i,ind=-1,o="";
for(i=0;i<ids.length;i++){
if(_13==ids[i]){
ind=i;
break;
}
}
if(ind!=-1){
o=this.aHostCountryDomain[ind];
}
return o;
},close:function(){
vjo.dsf.document.Element.toggleHideShow(this.sLayerId,false);
vjo.dsf.cookie.VjCookieJar.writeCookielet("ebay","ecs","-1");
return false;
}});

vjo.needs("vjo.dsf.client.Browser");
vjo.type("vjo.dsf.client.ActiveX").props({init:function(){
var oC=vjo.dsf.client.Browser;
if(oC.bIE){
var d=document;
dw=function(s){
d.writeln(s);
};
dw("<scr"+"ipt language=\"vbscript\" type=\"text/vbscript\">");
dw("\tFunction vbCheckActiveXControl (pActXName)");
dw("\t\taX = false");
dw("\t\ton error resume next");
dw("\t\taX = IsObject(CreateObject(pActXName))");
dw("\t\tvbCheckActiveXControl = aX");
dw("End Function");
dw("</scr"+"ipt>");
}
},isLibLoaded:function(_4){
var oC=vjo.dsf.client.Browser;
return oC.bActiveXSupported&&vbCheckActiveXControl(_4);
}}).inits(function(){
vjo.dsf.client.ActiveX.init();
});

vjo.needs("vjo.dsf.client.ActiveX");
vjo.type("vjo.darwin.core.ebaytoolbar.VjEbayToolbarDetect").props({isEnabled:function(){
var V1="eBayToolbar.Helper",V2="eBayToolbarCommLib.IWebEvent.1";
with(this){
var _2=vjo.dsf.client.ActiveX;
return (_2.isLibLoaded(V1)||_2.isLibLoaded(V2));
}
}});

vjo.needs("vjo.dsf.cookie.VjCookieJar");
vjo.needs("vjo.dsf.typeextensions.string.Comparison");
vjo.needs("vjo.dsf.client.Browser");
vjo.needs("vjo.dsf.document.Element");
vjo.needs("vjo.dsf.utils.Object");
vjo.needs("vjo.darwin.core.ebaytoolbar.VjEbayToolbarDetect");
vjo.type("vjo.darwin.core.bta.BuyerTransactionAlert").protos({constructs:function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b){
this.sId=_1;
this.iPollingInterval=_2;
this.iMaxHits=_3;
this.iHitTimeout=_4;
this.iServerHits=0;
this.sLastCookieletValue="";
this.sServerUrl=_5;
if(document.location.protocol.has("https")){
_6=_6.replace("http://pics.","https://securepics.");
}
this.sImgServer=_6+"/";
this.sViewItemUrl=_7;
this.aAlertInfo=[["h:h:alt:2",_9,"icon/iconOutbid_16x16.gif"],["h:h:alt:3",_8,"icon/iconWatchB_16x16.gif"],["h:h:alt:4",_9,"icon/iconOutbid_16x16.gif"],["h:h:alt:5",_a,"icon/iconchanceBlu_16x16.gif"],["h:h:alt:tcr",_b,"icon/iconMailBlue_16x16.gif"]];
var c,oC=vjo.dsf.client.Browser,oCJ=vjo.dsf.cookie.VjCookieJar;
if((oC.bNav&&oC.iVer<7)||(oC.bOpera&&(oC.iVer+oC.fMinorVer)<0.5)||(oC.bIE&&oC.iVer<5)){
return;
}
c=oCJ.readCookie("ebaysignin");
if(!c||!c.is("in")){
return;
}
c=oCJ.readCookie("dp1","a1p");
if(c&&c.length>0&&parseInt(c)>0){
return;
}
if(vjo.darwin.core.ebaytoolbar.VjEbayToolbarDetect.isEnabled()){
return;
}
},setValue:function(_d,_e){
var oL=this.oL;
if(oL){
if(_d.is("")&&!oL.ctrld){
return;
}
if(_e){
if(vjo.dsf.client.Browser.bFirefox){
oL.textContent=_d;
}else{
oL.innerText=_d;
}
}else{
oL.innerHTML=_d;
}
oL.ctrld=1;
}
},onRefresh:function(){
var E=vjo.dsf.document.Element;
if(!this.oL){
this.oL=E.get(this.sId);
}
if(!this.oL){
return;
}
var c=vjo.dsf.cookie.VjCookieJar.readCookie("ebay","a2p");
if(!c){
this.onCookieExpire();
return;
}
var at=parseInt(c.charAt(8));
if(isNaN(at)){
return;
}
if(at==0){
this.setValue("");
return;
}
var nrt=parseInt(c.substring(0,8),16)*1000;
if(isNaN(nrt)){
return;
}
var ct=new Date();
ct=ct.getTime();
if(at==6||at==9){
if(!c.is(this.sLastCookieletValue)){
this.iServerHits=0;
}
this.setValue("");
this.sLastCookieletValue=c;
var t=(nrt>ct)?parseInt((nrt-ct)/1000):this.iPollingInterval;
window.setTimeout(vjo.dsf.utils.Object.hitch(this,this.onCookieExpire),t*1000);
return;
}
if(ct>=nrt){
this.onCookieExpire();
return;
}
this.iServerHits=0;
var cfg=this.aAlertInfo;
if(at<0&&at>=cfg.length){
return;
}
var ii=c.substring(9,c.lastIndexOf("."));
if(!c.is(this.sLastCookieletValue)){
var _18=cfg[at-1],imgSrv=this.sImgServer;
var _19=imgSrv+"s.gif";
var _1a="<img src=\""+_19+"\" width=\"10\" height=\"16\" style=\"vertical-align:middle\">|<img src=\""+_19+"\" width=\"10\" height=\"16\" style=\"vertical-align:middle\">";
_1a+="<img src=\""+imgSrv+_18[2]+"?t\" style=\"vertical-align:middle\"><img src=\""+_19+"\" width=\"5\" height=\"16\" style=\"vertical-align:middle\">";
var url=this.sViewItemUrl+"&item="+ii;
_1a+="<a href=\""+url+"&ssPageName="+_18[0]+"\">"+_18[1]+"</a>";
this.setValue(_1a);
this.sLastCookieletValue=c;
}
this.fireRefreshEvent();
},fireRefreshEvent:function(_1c){
if(!_1c){
_1c=this.iPollingInterval;
}
window.setTimeout(vjo.dsf.utils.Object.hitch(this,this.onRefresh),_1c*1000);
},onCookieExpire:function(){
var oCJ=vjo.dsf.cookie.VjCookieJar,signin=oCJ.readCookie("ebaysignin");
if(!signin.has("in")){
return;
}
if(document.location.href.has("https:")){
return;
}
if(this.iServerHits<this.iMaxHits){
this.iServerHits++;
var ct=new Date();
ct=ct.getTime();
this.setValue("<img height=\"1\" width=\"1\" src=\""+this.sServerUrl+"&clientTime="+ct+"\" style=\"visibility:hidden;vertical-align:middle\">");
this.fireRefreshEvent(this.iHitTimeout);
}else{
this.setValue("");
oCJ.writeCookielet("ebay","a2p","1111111101111111111.");
}
}});

vjo.type("vjo.dsf.document.Positioning").props({getScrollLeftTop:function(){
var d=document,rv=[0,0],db=d.body,de=d.documentElement;
if(db){
rv[0]+=db.scrollLeft;
rv[1]+=db.scrollTop;
}
if(de){
rv[0]+=de.scrollLeft;
rv[1]+=de.scrollTop;
}
return rv;
},getOffsetLeft:function(_2){
var e=_2,l=0;
while(e){
l+=e.offsetLeft;
e=e.offsetParent;
}
return l;
},getOffsetTop:function(_4){
var e=_4,t=0;
while(e){
t+=e.offsetTop;
e=e.offsetParent;
}
return t;
},getClientWidth:function(){
var s=self,d=document,de=d.documentElement,w;
if(s.innerWidth){
w=s.innerWidth;
}else{
if(de&&de.clientWidth){
w=de.clientWidth;
}else{
w=d.body.clientWidth;
}
}
return w;
},getClientHeight:function(){
var s=self,d=document,de=d.documentElement,h;
if(s.innerHeight){
h=s.innerHeight;
}else{
if(de&&de.clientHeight){
h=de.clientHeight;
}else{
h=d.body.clientHeight;
}
}
return h;
},getEventLeftTop:function(_8){
var u="undefined",evt=window.event||_8,xOff=(typeof (screenLeft)!=u)?screenLeft:screenX,yOff=(typeof (screenTop)!=u)?screenTop:(screenY+(outerHeight-innerHeight)-25);
return [evt.screenX-xOff,evt.screenY-yOff];
}});

vjo.needs("vjo.dsf.client.Browser");
vjo.type("vjo.dsf.document.Shim").props({add:function(_1,_2,_3){
var f,p="px",w,h,s;
if(this.check()){
w=_1.offsetWidth;
h=_1.offsetHeight;
w+=_2?_2:0;
h+=_3?_3:0;
f=document.createElement("IFRAME");
s=f.style;
s.width=w+p;
s.height=h+p;
s.filter="chroma(color='white')";
f.frameBorder=0;
s.position="absolute";
s.left="0"+p;
s.top="0"+p;
s.zIndex="-1";
s.filter="Alpha(Opacity=\"0\")";
if(document.location.protocol=="https:"){
f.src="https://securepics.ebaystatic.com/aw/pics/s.gif";
}
_1.appendChild(f);
return f;
}
},remove:function(_5,_6){
if(this.check()){
if(_6&&_6.parentNode){
_6.parentNode.removeChild(_6);
}
}
},check:function(){
var B=vjo.dsf.client.Browser;
return (B.bIE||B.bFirefox);
}});

vjo.type("vjo.darwin.core.dynamicmenu.Show").satisfies("vjo.dsf.common.IJsHandler").protos({constructs:function(_1){
this.id=_1;
},handle:function(_2){
vjo.Registry.get(this.id).setup();
}});

vjo.type("vjo.darwin.core.dynamicmenu.Hide").satisfies("vjo.dsf.common.IJsHandler").protos({constructs:function(_1){
this.id=_1;
},handle:function(_2){
vjo.Registry.get(this.id).hide();
}});

vjo.type("vjo.darwin.core.dynamicmenu.Stay").satisfies("vjo.dsf.common.IJsHandler").protos({constructs:function(_1){
this.id=_1;
},handle:function(_2){
vjo.Registry.get(this.id).clear();
}});

vjo.needs("vjo.dsf.document.Element");
vjo.needs("vjo.dsf.document.Positioning");
vjo.needs("vjo.dsf.document.Shim");
vjo.needs("vjo.dsf.utils.Object");
vjo.needs("vjo.dsf.client.Browser");
vjo.needs("vjo.darwin.core.dynamicmenu.Show");
vjo.needs("vjo.darwin.core.dynamicmenu.Hide");
vjo.needs("vjo.darwin.core.dynamicmenu.Stay");
vjo.type("vjo.darwin.core.dynamicmenu.DynamicMenu").protos({constructs:function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13,_14){
this.iMouseOutTimer=null;
this.iMouseOverTimer=null;
this.iLeftPadding=_b;
this.iTopPadding=_c;
this.iRightPadding=_d;
this.sAnchorId=_1;
this.sContainerLayerId=_2;
this.sContentLayerId=_3;
this.iMouseOutDelay=_4;
this.iMouseOverDelay=_5;
this.iHighResDocWidth=_6;
this.iLowResDocWidth=_7;
this.iHighResColumns=_8;
this.iMediumResColumns=_9;
this.iLowResColumns=_a;
this.sHandler=_e;
this.sCollName=_f;
this.sWidth=_10;
this.sAnchorMouseOverClass=_11;
this.sAnchorMouseOutClass=_12;
this.iframeShim=null;
this.sHTML=null;
this.oAnchor=null;
this.sTemplate=null;
this.sAnchorText=_13;
this.sDomain=_14;
if(this.sAnchorId=="Help"){
this.iLeftPadding-=5;
}
this.oCobrand=null;
},setup:function(){
var oL,oA,iL,iT,iWW,noc,iAL,iAW,iLW,op,oSI,bF=false,t,lh=window.location.href;
var vd=vjo.dsf,D=vd.document,E=D.Element,P=D.Positioning,S=D.Shim,B=vd.client.Browser;
var O=vd.utils.Object;
with(this){
clear();
if(sTemplate==null){
t=E.get(sContentLayerId);
if(t){
sTemplate=t.innerHTML;
}
}
oL=E.get(sContainerLayerId);
if(oL){
op=oL.offsetParent;
}
oA=E.get(sAnchorId);
iAL=DynamicMenuGetOffsetLeft(oA);
iAW=oA.offsetWidth;
iT=P.getOffsetTop(oA)+(oA.offsetHeight)+iTopPadding;
iWW=P.getClientWidth();
if(typeof (iWW)=="undefined"){
iWW=800;
}
if(iWW>iHighResDocWidth){
noc=iHighResColumns;
}else{
if(iWW>iLowResDocWidth&&iWW<=iHighResDocWidth){
noc=iMediumResColumns;
}else{
if(iWW<=iLowResDocWidth){
noc=iLowResColumns;
}else{
noc=5;
}
}
}
if(sHTML==null){
bF=true;
if(B.bFirefox&&!lh.has("motors.")){
E.promoteToBody(sContainerLayerId);
}
sHTML=getMenuHtml(noc);
if(sHTML==null){
return;
}
oL.innerHTML=sHTML;
}
iLW=oL.offsetWidth;
var _18=GetContainerDiv(),cw,bRA=false;
if(sAnchorId=="Help"){
bRA=true;
}
if(_18&&B.bIE&&!lh.hasAny("community","education")){
cw=_18.offsetWidth;
if((iAL+iLW)>cw){
bRA=true;
}
}
var bE=(sAnchorId=="EbxBrowseCategories")?true:false;
if(lh.hasAny("securitycenter","payments.")&&lh.has(".hk")){
iAL=P.getOffsetLeft(oA);
}else{
if(lh.hasAny("securitycentre","contact_ebay")&&lh.has(".au")){
iAL=P.getOffsetLeft(oA);
}else{
if((typeof (pageName)!="undefined")?pageName.has("CCHP_"):false){
iAL=P.getOffsetLeft(oA);
}else{
if(lh.hasAny("/buy/")){
iAL=P.getOffsetLeft(oA);
}else{
if(lh.hasAny("pages.",".html",".shtml","cgi.","tools.ebay.de","neighborhoods.","themenwelten.","neighbourhoods.")){
iAL=P.getOffsetLeft(oA);
}else{
if(typeof (bCenterAlignedPage)!="undefined"&&bCenterAlignedPage){
iAL=P.getOffsetLeft(oA);
}else{
if(bE&&((typeof (pageName)!="undefined")?pageName.has("KP_HomePage"):false)){
iAL=P.getOffsetLeft(oA);
}else{
if(sAnchorId=="StoreBrowseCats"&&lh.has("stores.")){
iAL=P.getOffsetLeft(oA);
}
}
}
}
}
}
}
}
var _1a=E.get("2tabPopularProducts");
if(_1a&&B.bIE){
iAL=P.getOffsetLeft(oA);
}
if((((iWW-iAL-iLW)<=10)&&iWW>iLW)||(iWW<(vjo.dsf.document.Positioning.getOffsetLeft(oA)+iAW+iLW))||bRA||bE){
iL=iAL+iAW-iLW;
}else{
iL=iAL;
}
if(sAnchorId=="Buy"||sAnchorId=="Sell"||sAnchorId=="MyEbay"||sAnchorId=="OV"){
iL=iAL;
}
iL+=iLeftPadding;
if(lh.has("securitycentre")&&lh.has(".sg")&&B.bIE){
iL+=10;
}else{
if(lh.has("feedback")&&lh.has(".hk")&&B.bFirefox){
iL+=7;
}else{
if(lh.has("my.")&&B.bFirefox){
iL-=7;
}else{
if(lh.has("myworld")&&B.bIE){
iL+=10;
}else{
if(bE){
var sn=E.get("dynamicmenu-snavW");
iT=P.getOffsetTop(sn)+(sn.offsetHeight)+iTopPadding;
if(B.bFirefox){
iL+=2;
}
if(B.bIE&&((typeof (pageName)!="undefined")?pageName.has("KP_HomePage"):false)){
iL-=9;
}
}else{
if(lh.has("search.")&&sAnchorId=="BrowseCategories"&&B.bIE&&B.iVer==7){
iL+=22;
iT-=2;
}
}
}
}
}
}
if(iL>=0){
oL.style.left=(iL-1)+"px";
}
oL.style.top=(iT)+"px";
oL.style.zIndex="1000";
if(bF){
if(lh.has("motors")||sAnchorId=="BrowseCategories"&&!lh.has("myworld")){
iframeShim=this.add(oL,12);
}else{
iframeShim=this.add(oL);
}
}else{
if(B.bIE||B.bFirefox){
oL.appendChild(iframeShim);
}
}
oSI=E.get(sContainerLayerId+"-spacer");
if(oSI&&bF){
oSI.width=iLW-12;
}
iMouseOverTimer=setTimeout(O.hitch(this,"show"),iMouseOverDelay);
}
},show:function(){
var oA,E=vjo.dsf.document.Element;
with(this){
oA=E.get(sAnchorId);
if(oA){
oA.className=sAnchorMouseOverClass;
}
E.toggleVisibility(sContainerLayerId,true);
}
},hide:function(){
with(this){
clearTimeout(iMouseOverTimer);
iMouseOutTimer=setTimeout(vjo.dsf.utils.Object.hitch(this,"close"),iMouseOutDelay);
}
},close:function(){
var oA,E=vjo.dsf.document.Element;
with(this){
oA=E.get(sAnchorId);
if(oA){
oA.className=sAnchorMouseOutClass;
}
E.toggleVisibility(sContainerLayerId,false);
if(iframeShim){
vjo.dsf.document.Shim.remove(E.get(sContainerLayerId),iframeShim);
}
}
},clear:function(){
clearTimeout(this.iMouseOutTimer);
},sortByValue:function(_1e,_1f){
if(_1e.value.has("Everything")){
return 1;
}else{
if(_1f.value.has("Everything")){
return -1;
}else{
return _1e.value<_1f.value?-1:(_1e.value>_1f.value?1:0);
}
}
},getMenuHtml:function(_20){
with(this){
var i,j,c,n,h,ipc,html,img="",si,sTemp=".paradise.qa.ebay.com",sTemp2=".qa.ebay.com",u,ff,ll,sTemp3=".no-pool-name.qa.ebay.com";
var E=vjo.dsf.document.Element;
var lh=window.location.href;
si="<img src='";
if(document.location.protocol.has("https")){
si+="https://secure";
}else{
si+="http://";
}
si+="pics.ebaystatic.com/aw/pics/s.gif' height='1' width='1'  border='0' ";
var _24=window[sHandler];
if(!_24){
return;
}
var _25=_24(),items=_25[sCollName],l=items.length;
if(sAnchorId=="BrowseCategories"&&lh.has("ebay.com/")){
for(i=0;i<l;i++){
if(items[i].value.has("eBay Motors")){
items[i].value="Cars, Boats, Vehicles & Parts";
items[i].url="http://www.motors.ebay.com";
items.sort(sortByValue);
break;
}
}
}
ipc=Math.ceil(l/_20);
h="<table bgcolor='white' border='0' cellpadding='0' cellspacing='0'";
if(this.sWidth!=""){
h+=" width='"+sWidth+"'";
}
h+=">";
for(i=0;i<ipc;i++){
h+="<tr>";
for(j=0;j<_20;j++){
h+="<td nowrap>";
if(i==0&&!E.get("EbxBrowseCategories-menu")){
h+=si+"><br/>";
img=si+" id='"+sContainerLayerId+"-spacer'>";
}
n=i+(j)*ipc;
c=items[n];
if(c){
if(typeof (c.url)!="undefined"){
u=sDomain?c.url.replace(sTemp,sDomain):c.url;
u=sDomain?c.url.replace(sTemp2,sDomain):c.url;
u=sDomain?c.url.replace(sTemp3,sDomain):c.url;
u=cobrandUrl(u);
h+="<a href='"+u+"'>";
h+=c.value;
h+="</a>";
}else{
u=c.value;
ff=u.indexOf("href=\"");
if(ff==-1){
h+=u;
}else{
ff+=6;
ll=u.lastIndexOf("\"");
u=u.substr(ff,ll-ff);
h+=c.value.substr(0,ff)+cobrandUrl(u)+c.value.substr(ll);
}
}
}else{
h+="&nbsp;";
}
h+="</td>";
}
h+="</tr>";
}
h+="</table>";
html=h;
if(sTemplate){
html=sTemplate.replace("##1##",h).replace("##2##",img);
}
return html;
}
},DynamicMenuGetOffsetLeft:function(e){
var l=0,oCl=vjo.dsf.client.Browser,ex=(oCl.bIE||oCl.bSafari),lh=window.location.href;
var bH=(typeof (isHomepage)!="undefined")?isHomepage:false;
if(e.offsetParent){
l=e.offsetLeft;
while(e=e.offsetParent){
if(!e.id.toLowerCase().has("maincontent")&&!e.className.has("pagecontainer")){
l+=e.offsetLeft;
}
if(((e.className.is("pnav")||e.innerHTML.has("snav"))&&ex)&&e.offsetLeft!=0&&(!lh.hasAny("community","sitemap","/help/","/education/","blogs","feedback"))){
return l;
}else{
if((e.className.is("pnav")||e.innerHTML.has("snav"))&&e.offsetLeft!=0&&oCl.bFirefox&&lh.has(".hk")&&(!lh.has("community")&&!bH)){
return l;
}else{
if((e.className.is("pnav")||e.innerHTML.has("snav"))&&e.offsetLeft!=0&&oCl.bIE&&lh.has(".au")&&lh.hasAny("/help/")){
return l;
}
}
}
}
}
return l;
},GetContainerDiv:function(){
var d=document,aa,i,l;
if(d.getElementsByTagName){
aa=d.getElementsByTagName("div");
}else{
if(d.all){
aa=d.all;
}
}
l=aa.length;
for(i=0;i<l;i++){
if(aa[i].className=="gbhdr"){
return aa[i];
}
}
},cobrandUrl:function(_2a){
var u="undefined",cc,cf;
if(this.oCobrand==null&&typeof (ebay)!=u&&typeof (ebay.oDocument)!=u){
cc=ebay.oDocument._getControl("cobrandCollection");
if(cc){
cf=cc._getControl("cobrandFunctions");
this.oCobrand=cf;
}
}else{
cf=this.oCobrand;
}
if(cf&&typeof (cf.cobrandURL)!=u){
return cf.cobrandURL(_2a);
}
return _2a;
},add:function(_2c,_2d,_2e){
var f,p="px",w,h,s,S=vjo.dsf.document.Shim;
if(S.check()){
w=_2c.offsetWidth;
h=_2c.offsetHeight;
w+=_2d?_2d:0;
h+=_2e?_2e:0;
f=document.createElement("IFRAME");
s=f.style;
s.width=w+p;
s.height=h+p;
s.filter="chroma(color='white')";
f.frameBorder=0;
s.position="absolute";
s.left="0"+p;
s.top="0"+p;
s.zIndex="-1";
s.filter="Alpha(Opacity=\"0\")";
if(document.location.protocol.has("https")){
f.src="https://securepics.ebaystatic.com/aw/pics/s.gif";
}
_2c.appendChild(f);
return f;
}
}});

vjo.needs("vjo.dsf.typeextensions.string.Comparison");
vjo.needs("vjo.dsf.cookie.VjCookieJar");
vjo.needs("vjo.dsf.document.Element");
vjo.type("vjo.darwin.core.ebayheader.playground.Playground").protos({constructs:function(_1,_2){
this.sLayerId=_1;
this.sHandle=_2;
},show:function(){
var _3=vjo.dsf.cookie.VjCookieJar,sbf=_3.readCookie("ebay","sbf"),pcon=_3.getBitFlag(sbf,24),l,h;
var _4=this.sLayerId,E=vjo.dsf.document.Element;
if(pcon){
l=E.get(_4);
h=window[this.sHandle];
if(h&&l){
l.innerHTML=h();
E.toggleHideShow(_4,true);
}
}else{
E.toggleHideShow(_4,false);
}
}});


vjo.type("vjo.dsf.utils.URL").props({addArg:function(_1,_2,_3){
if(_1==null||_1==undefined){
return null;
}
if(_1.indexOf("?")<0){
_1+="?"+_2+"="+_3;
return _1;
}
var _4=this.getArgPairIfExists(_1,_2);
if(_4!==null){
_1=_1.replace(_4,_2+"="+_3);
}else{
_1+="&"+_2+"="+_3;
}
return _1;
},getArg:function(_5,_6){
if(_5==null||_5==undefined){
return null;
}
if(_5.indexOf("?")<0){
return null;
}
var _7=this.getArgPairIfExists(_5,_6);
if(_7!==null){
return _7.substring(_7.indexOf("=")+1);
}
return null;
},getArgPairIfExists:function(_8,_9){
var _a=_8.indexOf("?");
if(_a<0){
return null;
}
var _b=_8;
var _c,argName;
while(_a>=0){
_b=_b.substring(_a+1);
_c=_b;
_a=_b.indexOf("&");
if(_a>=0){
_c=_b.substring(0,_a);
}
argName=_c.substring(0,_c.indexOf("="));
if(argName==_9){
return _c;
}
}
return null;
}});

vjo.needs("vjo.dsf.utils.URL");
vjo.needs("vjo.dsf.typeextensions.string.Comparison");
vjo.type("vjo.darwin.tracking.enabler.TrackingModuleEnabler").satisfies("vjo.dsf.common.IJsHandler").protos({constructs:function(_1,_2){
this.sCid=_1;
this.sCidParms=_2;
},rewriteUrl:function(_3){
if(_3.nativeEvent==null||_3.nativeEvent==undefined){
return;
}
var _4=_3.nativeEvent.srcElement||_3.nativeEvent.target;
if(_4==null||_4==undefined){
return;
}
_4=this.getAnchor(_4);
if(this.sCidParms&&_4&&!_4.href.has("javascript:")){
_4.href=vjo.dsf.utils.URL.addArg(_4.href,this.sCid,this.sCidParms);
}
},getAnchor:function(_5){
var e=_5;
if(e&&e.tagName){
if(!e.tagName.is("A")){
e=this.getAnchor(e.parentNode);
}
return e;
}
},handle:function(_7){
this.rewriteUrl(_7);
}});

vjo.type("vjo.dsf.SvcConfig").protos({constructs:function(_1,_2){
this.objType="dsf_SvcConfig";
this.url=_2;
this.method=_1;
this.reqtMarshalling="raw";
this.respMarshalling="raw";
this.async=true;
this.timeout=0;
}});

vjo.type("vjo.dsf.Message").protos({constructs:function(_1){
this.objType="dsf_Message";
this.svcId=_1;
this.request;
this.response;
this.rawRequest="";
this.clientContext={};
this.trspType="InProc";
this.status;
this.svcConfig;
this.returnData=true;
this.trace="";
}});

function FooterTrk() { 	return { handle : function (event) { var _d = vjo.dsf.EventDispatcher, _r = vjo.Registry;
_r.put('FooterTrackingCompSpecGenerator_0', new vjo.darwin.tracking.enabler.TrackingModuleEnabler('_trksid', 'm40'));
_d.add('glbfooter','click',_r.get('FooterTrackingCompSpecGenerator_0'));
   } }; }
function get_Buy_menu(){
return {"items":[{"value":"<a href=\"http://pages.motors.ebay.com/buy/buying-services-resources/index.html\">Buying Services</a>"},{"value":"<a href=\"http://pages.motors.ebay.com/buy/howto/index.html\">How to Buy a Vehicle</a>"},{"value":"<a href=\"http://pages.motors.ebay.com/buy/purchase-protection/index.html\">Vehicle Purchase Protection</a>"}]};
}
function get_Sell_menu(){
return {"items":[{"value":"<a href=\"http://pages.motors.ebay.com/sell/howto/index.html\">How to Sell a Vehicle</a>"},{"value":"<a href=\"http://hub.motors.ebay.com/sell\">Sell Your Item</a>"},{"value":"<a href=\"http://pages.ebay.com/ebaymotors/services/dealers.html\">Dealer Center</a>"}]};
}
function get_MyEbay_menu(){
return {"items":[{"value":"<a href=\"http://my.ebay.com/ebaymotors/ws/eBayISAPI.dll?MyEbay&amp;gbh=1&amp;smGHR=true\">Summary</a>"},{"value":"<a href=\"http://my.ebay.com/ebaymotors/ws/eBayISAPI.dll?MyEbay&amp;gbh=1&amp;CurrentPage=MyeBayWatching\">Watching</a>"},{"value":"<a href=\"http://my.ebay.com/ebaymotors/ws/eBayISAPI.dll?MyEbay&amp;gbh=1&amp;CurrentPage=MyeBayBidding\">Bidding</a>"},{"value":"<a href=\"http://my.ebay.com/ebaymotors/ws/eBayISAPI.dll?MyEbay&amp;gbh=1&amp;CurrentPage=MyeBaySelling&amp;smGHR=true\">Selling</a>"},{"value":"<a href=\"http://my.ebay.com/ebaymotors/ws/eBayISAPI.dll?MyEbay&amp;gbh=1&amp;CurrentPage=MyeBayAllFavorites\">Favorites</a>"},{"value":"<a href=\"http://my.ebay.com/ebaymotors/ws/eBayISAPI.dll?MyEbay&amp;CurrentPage=MyReviewsAndGuides&amp;LogUID=\">Reviews &amp; Guides</a>"}]};
}

function NavMenuBind() { 	return { handle : function (event) { var _d = vjo.dsf.EventDispatcher, _r = vjo.Registry;
_r.put('MotorsPrimaryNavResourceSpec_1', new vjo.darwin.core.dynamicmenu.Hide('BuyMenu'));
_d.add('Buy-menu','mouseout',_r.get('MotorsPrimaryNavResourceSpec_1'));
_r.put('MotorsPrimaryNavResourceSpec_2', new vjo.darwin.core.dynamicmenu.Stay('BuyMenu'));
_d.add('Buy-menu','mouseover',_r.get('MotorsPrimaryNavResourceSpec_2'));
_r.put('MotorsPrimaryNavResourceSpec_3', new vjo.darwin.core.dynamicmenu.Show('BuyMenu'));
_d.add('Buy','mouseover',_r.get('MotorsPrimaryNavResourceSpec_3'));
_r.put('MotorsPrimaryNavResourceSpec_4', new vjo.darwin.core.dynamicmenu.Hide('BuyMenu'));
_d.add('Buy','mouseout',_r.get('MotorsPrimaryNavResourceSpec_4'));
_r.put('MotorsPrimaryNavResourceSpec_6', new vjo.darwin.core.dynamicmenu.Hide('SellMenu'));
_d.add('Sell-menu','mouseout',_r.get('MotorsPrimaryNavResourceSpec_6'));
_r.put('MotorsPrimaryNavResourceSpec_7', new vjo.darwin.core.dynamicmenu.Stay('SellMenu'));
_d.add('Sell-menu','mouseover',_r.get('MotorsPrimaryNavResourceSpec_7'));
_r.put('MotorsPrimaryNavResourceSpec_8', new vjo.darwin.core.dynamicmenu.Show('SellMenu'));
_d.add('Sell','mouseover',_r.get('MotorsPrimaryNavResourceSpec_8'));
_r.put('MotorsPrimaryNavResourceSpec_9', new vjo.darwin.core.dynamicmenu.Hide('SellMenu'));
_d.add('Sell','mouseout',_r.get('MotorsPrimaryNavResourceSpec_9'));
_r.put('MotorsPrimaryNavResourceSpec_11', new vjo.darwin.core.dynamicmenu.Hide('MyEbayMenu'));
_d.add('MyEbay-menu','mouseout',_r.get('MotorsPrimaryNavResourceSpec_11'));
_r.put('MotorsPrimaryNavResourceSpec_12', new vjo.darwin.core.dynamicmenu.Stay('MyEbayMenu'));
_d.add('MyEbay-menu','mouseover',_r.get('MotorsPrimaryNavResourceSpec_12'));
_r.put('MotorsPrimaryNavResourceSpec_13', new vjo.darwin.core.dynamicmenu.Show('MyEbayMenu'));
_d.add('MyEbay','mouseover',_r.get('MotorsPrimaryNavResourceSpec_13'));
_r.put('MotorsPrimaryNavResourceSpec_14', new vjo.darwin.core.dynamicmenu.Hide('MyEbayMenu'));
_d.add('MyEbay','mouseout',_r.get('MotorsPrimaryNavResourceSpec_14'));
   } }; }
function get_CT_menu(){
return {"items":[{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks___W0QQMake247a0eZAcura3c2bde2\">Acura</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks___W0QQMake247a0eZAudi1f4fd9\">Audi</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks___W0QQMake247a0eZBMW1016c\">BMW</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks___W0QQMake247a0eZBuick3d8d53e\">Buick</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks___W0QQMake247a0eZCadillacebca2da5\">Cadillac</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks___W0QQMake247a0eZChevroletb00f1088\">Chevrolet</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks___W0QQMake247a0eZChrysler76de4c52\">Chrysler</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks___W0QQMake247a0eZDodge3f237b7\">Dodge</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks___W0QQMake247a0eZFord2180db\">Ford</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks___W0QQMake247a0eZGMC1141d\">GMC</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks___W0QQMake247a0eZHonda42abae4\">Honda</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks___W0QQMake247a0eZHummer8180dcfa\">Hummer</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks___W0QQMake247a0eZInfinitie2cce38\">Infiniti</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks___W0QQMake247a0eZJeep232b46\">Jeep</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks___W0QQMake247a0eZLandRover3bbee9d1\">Land Rover</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks___W0QQMake247a0eZLexus45eb4dd\">Lexus</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks___W0QQMake247a0eZLincoln6dc338df\">Lincoln</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks___W0QQMake247a0eZMazda46b0043\">Mazda</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks___W0QQMake247a0eZMitsubishiecdaf8b3\">Mitsubishi</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks___W0QQMake247a0eZMercedesBenz455f39e6\">Mercedes-Benz</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks___W0QQMake247a0eZNissan8b17a6e8\">Nissan</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks___W0QQMake247a0eZPontiac4ba0dc06\">Pontiac</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks___W0QQMake247a0eZPorsche4bd8b000\">Porsche</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks___W0QQMake247a0eZToyota95abf51e\">Toyota</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks___W0QQMake247a0eZVolkswagen1489b7cb\">Volkswagen</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Cars-Trucks__\"><i>See all Cars &amp; Trucks...</i></a>"},{"value":"<b>Themes</b>"},{"value":"<a href=\"http://hub.motors.ebay.com/alternative_fuel\">Alternative Fuel Vehicle</a>"},{"value":"<a href=\"http://hub.motors.ebay.com/collector_car\">Collector Car</a>"},{"value":"<a href=\"http://hub.motors.ebay.com/convertible\">Convertible</a>"},{"value":"<a href=\"http://hub.motors.ebay.com/corvette\">Corvette</a>"},{"value":"<a href=\"http://hub.motors.ebay.com/coupe\">Coupe</a>"},{"value":"<a href=\"http://hub.motors.ebay.com/minivan\">Minivan</a>"},{"value":"<a href=\"http://hub.motors.ebay.com/muscle_car\">Muscle Car</a>"},{"value":"<a href=\"http://hub.motors.ebay.com/mustang\">Mustang</a>"},{"value":"<a href=\"http://hub.motors.ebay.com/sedan\">Sedan</a>"},{"value":"<a href=\"http://hub.motors.ebay.com/suv\">SUV</a>"},{"value":"<a href=\"http://hub.motors.ebay.com/truck\">Truck</a>"},{"value":"<a href=\"http://hub.motors.ebay.com/wagon\">Wagon</a>"}]};
}
function get_PA_menu(){
return {"items":[{"value":"<a href=\"http://motors.shop.ebay.com/Parts-Accessories_Car-Truck-Apparel-Merchandise__\">Apparel &amp; Merchandise</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Parts-Accessories_ATV-Parts-Accessories__\">ATV Parts</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Parts-Accessories_Aviation-Parts-Gear__\">Aviation Parts</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Parts-Accessories_Boat-Parts-Accessories-Gear__\">Boat Parts</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Parts-Accessories_Car-Truck-Parts-Accessories__\">Car &amp; Truck Parts</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Parts-Accessories_Car-Audio-Video__\">Car Audio &amp; Electronics</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Parts-Accessories_Manuals-Literature__\">Manuals &amp; Literature</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Parts-Accessories_Motorcycle-Powersports-Apparel-Gear__\">Motorcycle Apparel &amp; Gear</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Parts-Accessories_Motorcycle-Parts-Accessories__\">Motorcycle Parts</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Parts-Accessories_Other-Vehicle-Parts__\">Other Vehicle Parts</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Parts-Accessories_Automotive-Tools__\">Tools</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Parts-Accessories_Vintage-Car-Truck-Parts-Accessories_\">Vintage Car &amp; Truck Parts</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/items/Parts-Accessories__\"><i>See all Parts &amp; Accessories...</i></a>"}]};
}
function get_MC_menu(){
return {"items":[{"value":"<a href=\"http://motors.shop.ebay.com/Motorcycles___W0QQMake247a0eZBMW1016c\">BMW</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Motorcycles___W0QQMake247a0eZDucati7aa8c384\">Ducati</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Motorcycles___W0QQMake247a0eZHarleyDavidson76180c4\">Harley-Davidson</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Motorcycles___W0QQMake247a0eZHonda42abae4\">Honda</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Motorcycles___W0QQMake247a0eZKawasaki4ad1f2ec\">Kawasaki</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Motorcycles___W0QQMake247a0eZKTM12404\">KTM</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Motorcycles___W0QQMake247a0eZSuzuki944c335b\">Suzuki</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Motorcycles___W0QQMake247a0eZTriumph2412629b\">Triumph</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Motorcycles___W0QQMake247a0eZYamaha9d693cb5\">Yamaha</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Motorcycles__\"><i>See all Motorcycles...</i></a>"},{"value":"<b>Themes</b>"},{"value":"<a href=\"http://hub.motors.ebay.com/harley_davidson\">Harley-Davidson</a>"}]};
}
function get_PS_menu(){
return {"items":[{"value":"<a href=\"http://motors.shop.ebay.com/Powersports_ATVs__\">ATVs</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Powersports_Dune-Buggies-Sand-Rails__\">Dune Buggies/Sand Rails</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Powersports_Go-Karts-High-Performance___\">Go Karts</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Powersports_Personal-Watercraft__\">Personal Watercraft</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Powersports_Powersports-Vehicles-Under-50cc__\">Powersports Under 50cc</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Powersports_Scooters-Mopeds__\">Scooters &amp; Mopeds</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Powersports_Snowmobiles__\">Snowmobiles</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Powersports_Powersports-Everything-Else__\">Other Powersports</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/items/Powersports__\"><i>See all Powersports...</i></a>"}]};
}
function get_BT_menu(){
return {"items":[{"value":"<a href=\"http://motors.shop.ebay.com/Boats_Fishing-Boats__\">Fishing Boats</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Boats_Power-Motorboats__\">Powerboats &amp; Motorboats</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Boats_Sailboats__\">Sailboats</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Boats_Other-Boats__\">Other Boats</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/items/Boats__\"><i>See all Boats...</i></a>"}]};
}
function get_OV_menu(){
return {"items":[{"value":"<a href=\"http://motors.shop.ebay.com/Other-Vehicles-Trailers_Aircraft__\">Aircraft</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Other-Vehicles-Trailers_Buses__\">Buses</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Other-Vehicles-Trailers_Commercial-Trucks__\">Commercial Trucks</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Other-Vehicles-Trailers_Military-Vehicles__\">Military Vehicles</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Other-Vehicles-Trailers_Race-Cars-Not-Street-Legal__\">Race Cars</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Other-Vehicles-Trailers_RVs-Campers__\">RVs &amp; Campers</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Other-Vehicles-Trailers_Trailers__\">Trailers</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/Other-Vehicles-Trailers_Other-Vehicles-Everything-Else__\">Other</a>"},{"value":"<a href=\"http://motors.shop.ebay.com/items/Other-Vehicles-Trailers__\"><i>See all Other Vehicles...</i></a>"}]};
}

function SecNavMenuBind() { 	return { handle : function (event) { var _d = vjo.dsf.EventDispatcher, _r = vjo.Registry;
_r.put('MotorsSecondaryNavResourceSpec_1', new vjo.darwin.core.dynamicmenu.Hide('CTMenu'));
_d.add('CT-menu','mouseout',_r.get('MotorsSecondaryNavResourceSpec_1'));
_r.put('MotorsSecondaryNavResourceSpec_2', new vjo.darwin.core.dynamicmenu.Stay('CTMenu'));
_d.add('CT-menu','mouseover',_r.get('MotorsSecondaryNavResourceSpec_2'));
_r.put('MotorsSecondaryNavResourceSpec_3', new vjo.darwin.core.dynamicmenu.Show('CTMenu'));
_d.add('CT','mouseover',_r.get('MotorsSecondaryNavResourceSpec_3'));
_r.put('MotorsSecondaryNavResourceSpec_4', new vjo.darwin.core.dynamicmenu.Hide('CTMenu'));
_d.add('CT','mouseout',_r.get('MotorsSecondaryNavResourceSpec_4'));
_r.put('MotorsSecondaryNavResourceSpec_6', new vjo.darwin.core.dynamicmenu.Hide('PAMenu'));
_d.add('PA-menu','mouseout',_r.get('MotorsSecondaryNavResourceSpec_6'));
_r.put('MotorsSecondaryNavResourceSpec_7', new vjo.darwin.core.dynamicmenu.Stay('PAMenu'));
_d.add('PA-menu','mouseover',_r.get('MotorsSecondaryNavResourceSpec_7'));
_r.put('MotorsSecondaryNavResourceSpec_8', new vjo.darwin.core.dynamicmenu.Show('PAMenu'));
_d.add('PA','mouseover',_r.get('MotorsSecondaryNavResourceSpec_8'));
_r.put('MotorsSecondaryNavResourceSpec_9', new vjo.darwin.core.dynamicmenu.Hide('PAMenu'));
_d.add('PA','mouseout',_r.get('MotorsSecondaryNavResourceSpec_9'));
_r.put('MotorsSecondaryNavResourceSpec_11', new vjo.darwin.core.dynamicmenu.Hide('MCMenu'));
_d.add('MC-menu','mouseout',_r.get('MotorsSecondaryNavResourceSpec_11'));
_r.put('MotorsSecondaryNavResourceSpec_12', new vjo.darwin.core.dynamicmenu.Stay('MCMenu'));
_d.add('MC-menu','mouseover',_r.get('MotorsSecondaryNavResourceSpec_12'));
_r.put('MotorsSecondaryNavResourceSpec_13', new vjo.darwin.core.dynamicmenu.Show('MCMenu'));
_d.add('MC','mouseover',_r.get('MotorsSecondaryNavResourceSpec_13'));
_r.put('MotorsSecondaryNavResourceSpec_14', new vjo.darwin.core.dynamicmenu.Hide('MCMenu'));
_d.add('MC','mouseout',_r.get('MotorsSecondaryNavResourceSpec_14'));
_r.put('MotorsSecondaryNavResourceSpec_16', new vjo.darwin.core.dynamicmenu.Hide('PSMenu'));
_d.add('PS-menu','mouseout',_r.get('MotorsSecondaryNavResourceSpec_16'));
_r.put('MotorsSecondaryNavResourceSpec_17', new vjo.darwin.core.dynamicmenu.Stay('PSMenu'));
_d.add('PS-menu','mouseover',_r.get('MotorsSecondaryNavResourceSpec_17'));
_r.put('MotorsSecondaryNavResourceSpec_18', new vjo.darwin.core.dynamicmenu.Show('PSMenu'));
_d.add('PS','mouseover',_r.get('MotorsSecondaryNavResourceSpec_18'));
_r.put('MotorsSecondaryNavResourceSpec_19', new vjo.darwin.core.dynamicmenu.Hide('PSMenu'));
_d.add('PS','mouseout',_r.get('MotorsSecondaryNavResourceSpec_19'));
_r.put('MotorsSecondaryNavResourceSpec_21', new vjo.darwin.core.dynamicmenu.Hide('BTMenu'));
_d.add('BT-menu','mouseout',_r.get('MotorsSecondaryNavResourceSpec_21'));
_r.put('MotorsSecondaryNavResourceSpec_22', new vjo.darwin.core.dynamicmenu.Stay('BTMenu'));
_d.add('BT-menu','mouseover',_r.get('MotorsSecondaryNavResourceSpec_22'));
_r.put('MotorsSecondaryNavResourceSpec_23', new vjo.darwin.core.dynamicmenu.Show('BTMenu'));
_d.add('BT','mouseover',_r.get('MotorsSecondaryNavResourceSpec_23'));
_r.put('MotorsSecondaryNavResourceSpec_24', new vjo.darwin.core.dynamicmenu.Hide('BTMenu'));
_d.add('BT','mouseout',_r.get('MotorsSecondaryNavResourceSpec_24'));
_r.put('MotorsSecondaryNavResourceSpec_26', new vjo.darwin.core.dynamicmenu.Hide('OVMenu'));
_d.add('OV-menu','mouseout',_r.get('MotorsSecondaryNavResourceSpec_26'));
_r.put('MotorsSecondaryNavResourceSpec_27', new vjo.darwin.core.dynamicmenu.Stay('OVMenu'));
_d.add('OV-menu','mouseover',_r.get('MotorsSecondaryNavResourceSpec_27'));
_r.put('MotorsSecondaryNavResourceSpec_28', new vjo.darwin.core.dynamicmenu.Show('OVMenu'));
_d.add('OV','mouseover',_r.get('MotorsSecondaryNavResourceSpec_28'));
_r.put('MotorsSecondaryNavResourceSpec_29', new vjo.darwin.core.dynamicmenu.Hide('OVMenu'));
_d.add('OV','mouseout',_r.get('MotorsSecondaryNavResourceSpec_29'));
   } }; }
function HeaderTrk() { 	return { handle : function (event) { var _d = vjo.dsf.EventDispatcher, _r = vjo.Registry;
_r.put('HeaderTrackingMotorsCompSpecGenerator_0', new vjo.darwin.tracking.enabler.TrackingModuleEnabler('_trksid', 'm37'));
_d.add('BrowseCategories-menu','click',_r.get('HeaderTrackingMotorsCompSpecGenerator_0'));
_r.put('HeaderTrackingMotorsCompSpecGenerator_1', new vjo.darwin.tracking.enabler.TrackingModuleEnabler('_trksid', 'm37'));
_d.add('gnheader','click',_r.get('HeaderTrackingMotorsCompSpecGenerator_1'));
   } }; }
vjo.needs("vjo.dsf.document.Element");
vjo.needs("vjo.dsf.EventDispatcher");
vjo.type("vjo.darwin.core.greetings.Sandbox").props({init:function(){
var l=vjo.dsf.document.Element.get("registerLink"),s="https://scgi.sandbox.ebay.com/ws/eBayISAPI.dll?RegisterEnterInfo",t="https://developer.ebay.com/DevZone/sandboxuser/Default.aspx";
if(l){
if(l.href==s){
l.href=t;
}
}
}}).inits(function(){
vjo.dsf.EventDispatcher.addEventListener(window,"load",function(){
vjo.darwin.core.greetings.Sandbox.init();
});
});

vjo.needs("vjo.dsf.utils.URL");
vjo.needs("vjo.darwin.core.greetings.Sandbox");
vjo.type("vjo.darwin.core.greetings.VjGreetingsServer").props({handleClick:function(_1,_2){
var _3=_2.srcElement||_2.target;
if(_3){
_3.href=vjo.dsf.utils.URL.addArg(_1,"ru",encodeURIComponent(document.location.href));
}
}});

vjo.needs("vjo.dsf.cookie.VjCookieJar");
vjo.type("vjo.darwin.tracking.rover.Rover").props({roverTrack:function(){
var _1=new Date().getTime();
var _2=vjo.darwin.tracking.rover.Rover.getClientOffset(_1);
var _3=vjo.dsf.cookie.VjCookieJar.readCookieObj("npii","tpim");
if(_3!==null){
var _4=parseInt(_3.maxage,16)*1000;
if(_4>0){
var _5=_4-_1+_2;
var _6=15552000000;
if(_5>_6||_5<0){
vjo.dsf.cookie.VjCookieJar.writeCookielet("npii","tpim","");
}
}
}
},getClientOffset:function(_7){
var _8;
var _9=vjo.dsf.cookie.VjCookieJar.readCookie("ebay","cos");
if(_9!==null&&_9.length>0){
_8=parseInt(_9,16)*1000;
}else{
if(typeof (svrGMT)!=="undefined"){
_8=_7-svrGMT;
var _a=Math.round(_8/1000);
if(!isNaN(_a)){
vjo.dsf.cookie.VjCookieJar.writeCookielet("ebay","cos",_a.toString(16));
}
}
}
if(isNaN(_a)){
_8=1800000;
}
return _8;
}});

/* compspec addJsCompRegistration*/ 
(function () {
var _r = vjo.Registry;
})();
/* end comp spec*/

vjo.dsf.EventDispatcher.add('body','load', new FooterTrk());
/* compspec addJsCompRegistration*/ 
(function () {
var _r = vjo.Registry;
_r.put('BuyMenu', new vjo.darwin.core.dynamicmenu.DynamicMenu('Buy', 'Buy-menu', 'dynMenuCtr', 75, 250, 900, 800, 1, 1, 1, 5, -1, 0, 'get_Buy_menu', 'items', '', 'hovered', '', '', ''));
_r.put('SellMenu', new vjo.darwin.core.dynamicmenu.DynamicMenu('Sell', 'Sell-menu', 'dynMenuCtr', 75, 250, 900, 800, 1, 1, 1, 0, -1, 0, 'get_Sell_menu', 'items', '', 'hovered', '', '', ''));
_r.put('MyEbayMenu', new vjo.darwin.core.dynamicmenu.DynamicMenu('MyEbay', 'MyEbay-menu', 'dynMenuCtr', 75, 250, 900, 800, 1, 1, 1, 0, -1, 0, 'get_MyEbay_menu', 'items', '', 'hovered', '', '', ''));
})();
/* end comp spec*/

vjo.dsf.EventDispatcher.add('body','load', new NavMenuBind());
/* compspec addJsCompRegistration*/ 
(function () {
var _r = vjo.Registry;
_r.put('CTMenu', new vjo.darwin.core.dynamicmenu.DynamicMenu('CT', 'CT-menu', 'dynMenuCtr', 75, 250, 900, 800, 3, 3, 3, 0, -1, 0, 'get_CT_menu', 'items', '', 'hovered', '', '', ''));
_r.put('PAMenu', new vjo.darwin.core.dynamicmenu.DynamicMenu('PA', 'PA-menu', 'dynMenuCtr', 75, 250, 900, 800, 1, 1, 1, 0, -1, 0, 'get_PA_menu', 'items', '', 'hovered', '', '', ''));
_r.put('MCMenu', new vjo.darwin.core.dynamicmenu.DynamicMenu('MC', 'MC-menu', 'dynMenuCtr', 75, 250, 900, 800, 1, 1, 1, 0, -1, 0, 'get_MC_menu', 'items', '', 'hovered', '', '', ''));
_r.put('PSMenu', new vjo.darwin.core.dynamicmenu.DynamicMenu('PS', 'PS-menu', 'dynMenuCtr', 75, 250, 900, 800, 1, 1, 1, 0, -1, 0, 'get_PS_menu', 'items', '', 'hovered', '', '', ''));
_r.put('BTMenu', new vjo.darwin.core.dynamicmenu.DynamicMenu('BT', 'BT-menu', 'dynMenuCtr', 75, 250, 900, 800, 1, 1, 1, 0, -1, 0, 'get_BT_menu', 'items', '', 'hovered', '', '', ''));
_r.put('OVMenu', new vjo.darwin.core.dynamicmenu.DynamicMenu('OV', 'OV-menu', 'dynMenuCtr', 75, 250, 900, 800, 1, 1, 1, 0, -1, 0, 'get_OV_menu', 'items', '', 'hovered', '', '', ''));
})();
/* end comp spec*/

vjo.dsf.EventDispatcher.add('body','load', new SecNavMenuBind());
/* compspec addJsCompRegistration*/ 
(function () {
var _r = vjo.Registry;
})();
/* end comp spec*/

vjo.dsf.EventDispatcher.add('body','load', new HeaderTrk());

// en_US_AUTOS/e551/GlobalNavVjo23_Motors_e5516090370_1_en_US_AUTOS
// b=6090370