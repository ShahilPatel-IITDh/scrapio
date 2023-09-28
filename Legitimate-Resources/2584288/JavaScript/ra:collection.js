
try{setTimeout(function(){	
// create a test node off the browser screen to calculate high contrast mode
var testNode = document.createElement("div");
testNode.className = "highContrastTestNode";
document.body.appendChild(testNode);
// look at the computed style for the test node
var styles = null;
try {
	styles = document.defaultView.getComputedStyle(testNode, "");
} catch(e) {
	styles = testNode.currentStyle;
}
if(styles) {
	var testImg = styles.backgroundImage;
	if ((styles.borderTopColor == styles.borderRightColor) || (testImg != null && (testImg == "none" || testImg == "url(invalid-url:)" ))) {
		document.getElementsByTagName("body")[0].className+=" lotusImagesOff";
	}
	document.body.removeChild(testNode);
}
}, 500);

}catch(e){console.log("Module 'wp_one_ui_303': ",e);}
try{(function(){
if(!i$.isIE){
i$.addOnLoad(function(){
var _1=document.createElement("div");
_1.style.cssText="border:1px solid;border-color:red green;position:absolute;height:5px;top:-999px;background-image:url(\"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\");";
document.body.appendChild(_1);
var _2=null;
try{
_2=document.defaultView.getComputedStyle(_1,"");
}
catch(e){
_2=_1.currentStyle;
}
if(_2){
var _3=_2.backgroundImage;
if((_2.borderTopColor==_2.borderRightColor)||(_3!=null&&(_3=="none"||_3=="url(invalid-url:)"))){
document.getElementsByTagName("body")[0].className+=" a11yHighContrast";
}
document.body.removeChild(_1);
}
});
}
})();


}catch(e){console.log("Module 'wp_high_contrast': ",e);}
try{/** Licensed Materials - Property of IBM, 5724-E76 and 5724-E77, (C) Copyright IBM Corp. 2012 - All Rights reserved.  **/
(function(){
var _1=ibmCfg.portalConfig.contentHandlerURI+((ibmCfg.portalConfig.contentHandlerURI.indexOf("?")<0)?"?":"&")+"uri=menu:${id}",_2=false,_3="Separator",_4="Header",_5=function(){
var _6=i$.hasClass(document.getElementsByTagName("body")[0],"edit-mode");
return _6;
},_7=i$.fromPath("wptheme",true),_8=i$.fromPath("wptheme.contextMenu",true),_9=i$.fromPath("wptheme.contextMenu.extension",true);
i$.mash(_7,{getWindowIDFromSkin:function(_a){
while((_a=_a.parentNode)!=null){
if(i$.hasClass(_a,"component-control")){
var m=_a&&(_a.className||"").match(/id-([\S]+)/);
var _b=m&&m[1];
return _b;
}
}
return null;
},getPortletState:function(_c){
var _d=i$.byId("portletState");
var _e={};
if(_d){
if(!_d._cache){
_d._cache=i$.fromJson(_d.innerHTML);
_d._cache._defaults={"windowState":"normal","portletMode":"view"};
}
if(_d._cache[_c]){
_e=_d._cache[_c];
}else{
_e=_d._cache._defaults;
}
}
return _e;
},isValidOp:function(_f){
if(_f.visibility===false){
return false;
}
var _10=_f.metadata||{};
switch(_f.id){
case "ibm.portal.operations.changePortletMode":
var _11=_7.getPortletState(_10.wid).portletMode!=_10.portletMode;
return _11;
case "ibm.portal.operations.changeWindowState":
var _11=_7.getPortletState(_10.wid).windowState!=_10.windowState;
return _11;
default:
}
return true;
},operation:{changeToHelpMode:function(_12){
var _13=window.location.href;
if(_12.actionUrl){
if(_12.actionUrl.indexOf("?")==0){
var _14=_13.indexOf("#");
if(_14!=-1){
var _15=_13.substring(0,_14);
var _16=_13.substring(_14);
_13=_15+(_15.indexOf("?")==-1?"?":"&")+_12.actionUrl.substring(1);
_13+=_16;
}else{
_13+=(_13.indexOf("?")==-1?"?":"&")+_12.actionUrl.substring(1);
}
}else{
_13=_12.actionUrl;
}
}
window.open(_13,"","resizable=yes,scrollbars=yes,menubar=no,toolbar=no,status=no,width=800,height=600,screenX=10,screenY=10,top=10,left=10");
}},canImpersonate:function(){
return ibmCfg.portalConfig.canImpersonate;
}});
i$.mash(_8,{cache:{},css:{focus:"wpthemeMenuFocus",disabled:"wpthemeMenuDisabled",show:"wpthemeMenuShow",error:"wpthemeMenuError",menuTemplate:"wpthemeTemplateMenu",submenuTemplate:"wpthemeTemplateSubmenu",loadingTemplate:"wpthemeTemplateLoading",complementaryContent:"wpthemeComplementaryContent",menuOverlay:"wpthemeMenuOverlay",alignLeft:"wpthemeMenuLeft",alignRight:"wpthemeMenuRight",noTouch:"wpthemeNoTouch"},init:function(){
var _17;
if(arguments.length==1){
_17=arguments[0];
}else{
_17={node:arguments[0],menuId:arguments[1],jsonQuery:(arguments.length>2)?arguments[2]:null};
}
this.init2(_17);
},init2:function(_18){
var _19=_18.node;
_18.params=_18.params||{};
var _1a=_18.params.autoScroll!==false;
_19._contextMenu=_19._contextMenu||{};
var _1b=_19._contextMenu;
_1b.id=_19._contextMenu.id||_19.getAttribute("id")||Math.round(Math.random()*1000000000);
_19.setAttribute("id",_1b.id);
_1b.menuId=_18.menuId;
_1b.jsonQuery=_18.jsonQuery;
_1b.templateId=_18.params.templateId||null;
_1b.alignLeft=(_18.params.alignment=="left")||false;
_1b.alignRight=(_18.params.alignment=="right")||false;
_1b.touchDevice=(com_ibm_device_class.indexOf("tablet")!=-1)||(com_ibm_device_class.indexOf("smartphone")!=-1);
_1b.closeFn=function(_1c,evt){
var fn=_18.onClose;
if(fn){
if(i$.isFunction(fn)){
try{
fn();
}
catch(exc){
console.log("error executing function "+fn+" - "+exc);
}
}
}
_7.contextMenu.close(_1b,_1c,evt);
};
if(_1b.touchDevice){
var _1d=i$.bindDomEvt(document.body,"touchmove",function(evt){
var _1e=(evt)?evt.target||evt.srcElement:null;
var _1f=i$.byId(_1b.id);
if(i$.hasClass((_1b.shadowNode)?_1b.shadowNode:_1f,_24.show)&&!i$.isDescendant(_1e,_1b.shadowNode)){
i$.unbindDomEvt(_1d);
if(_1b._inProgress){
_displayMenu=false;
}
_1b.closeFn(false);
}
});
}
var _20=function(_21){
if(_21.displayMenu){
_1b.activeAction=false;
i$.fireEvent("wptheme/contextMenu/close/all");
var _22=i$.byId(_1b.id);
if(!_1b._submenu){
i$.fireEvent("wptheme/contextMenu/close/all");
_7.contextMenu._updateAbsolutePosition(_22);
}
var _23=_7.contextMenu._adjustScreenPositionStart();
i$.addClass((_1b.shadowNode)?_1b.shadowNode:_22,_24.show);
if(_1a){
_7.contextMenu._adjustScreenPositionEnd(_23);
}
var _25=_22._firstSelectable;
if(_25){
_25.focus();
_22._currentSelected=_25;
}
i$.addClass((_1b.shadowNode)?_1b.shadowNode:_22,("ontouchstart" in document)?"":_24.noTouch);
}
};
_7.contextMenu._initialize(_19).then(_20,_20);
_19=null;
},initSubmenu:function(_26,_27,_28){
_26._contextMenu=_26._contextMenu||{};
var _29=_26._contextMenu;
_29._submenu=true;
_29._menuitemTemplate=_28._menuitemTemplate;
_29._subMenuTemplate=_28._subMenuTemplate;
_29._loadingTemplate=_28._loadingTemplate;
_7.contextMenu.init(_26,_27,_28.jsonQuery);
},_findFocusNode:function(_2a){
var _2b,i,_2c;
var _2d=function(_2e,_2f){
var l=_2e.childNodes.length;
for(i=0;i<l;i++){
if(_2b){
break;
}
_2c=_2e.childNodes[i];
if(i$.hasClass(_2c,_24.focus)){
_2b=_2c;
break;
}
if(_2c.childNodes){
i=_2d(_2c,i);
}
}
return _2f;
};
if(i$.hasClass(_2a,_24.focus)){
return _2a;
}
_2d(_2a);
return _2b;
},_findNodes:function(_30,_31){
var _32,_33,_34,_35,i,_36;
var _37=function(_38,_39){
for(i=_38.childNodes.length-1;i>=0;i--){
_36=_38.childNodes[i];
if(i$.hasClass(_36,_24.menuTemplate)){
_33=_36;
continue;
}
if(i$.hasClass(_36,_24.submenuTemplate)){
_34=_36;
continue;
}
if(i$.hasClass(_36,_24.loadingTemplate)){
_35=_36;
continue;
}
if(_36.childNodes){
i=_37(_36,i);
}
}
return _39;
};
if(_31&&!_30._contextMenu.menuNode){
_32=document.getElementById(_31);
if(_32){
_32=_32.cloneNode(true);
_30.appendChild(_32);
}
}
_37(_30);
if(!_33){
_32=document.getElementById("simpleMenuTemplate");
if(_32){
_32=_32.cloneNode(true);
_30.appendChild(_32);
_37(_30);
}
}
var _3a={"root":_32,"menu":_33,"submenu":_34,"loading":_35};
return _3a;
},_findNextNodeByKeyCode:function(_3b,_3c){
var _3d=_3b.parentNode;
var _3e,_3f,_40,i,j;
var l=_3d.childNodes.length;
for(i=0;i<l;i++){
if(_3d.childNodes[i]==_3b){
break;
}
}
for(j=i+1;j<l;j++){
_3e=_3d.childNodes[j];
_3f=_3e.textContent||_3e.innerText;
if(_3e._menuitem&&_3e._menuitem.type!=_4&&_3e._menuitem.type!=_3&&_3f&&_3f.charAt(0).toUpperCase().charCodeAt(0)==_3c){
_40=_3d.childNodes[j];
return _40;
}
}
for(j=0;j<i;j++){
_3e=_3d.childNodes[j];
_3f=_3e.textContent||_3e.innerText;
if(_3e._menuitem&&_3e._menuitem.type!=_4&&_3e._menuitem.type!=_3&&_3f&&_3f.charAt(0).toUpperCase().charCodeAt(0)==_3c){
_40=_3d.childNodes[j];
return _40;
}
}
return null;
},_invalidateCallback:function(){
_7.contextMenu.cache={};
},_initialize:function(_41){
var _42=true;
var _43=_41._contextMenu;
if(_7.contextMenu.cache[_43.id]||_43._inProgress){
return i$.promise.resolved({displayMenu:_42});
}
_43._inProgress=true;
i$.addListener("wptheme/contextMenu/invalidate/all",_7.contextMenu._invalidateCallback);
var _44,_45,tmp=i$.createDom("div"),_46;
if(_43._submenu){
tmp.innerHTML=_43._subMenuTemplate.replace(/\$\{submenu-id\}/g,_43.id+"_menu");
_41.appendChild(tmp.firstChild);
_44=i$.byId(_43.id+"_menu");
_45=i$.createDom("div");
_45.innerHTML=_43._loadingTemplate;
}else{
var _47=_7.contextMenu._findNodes((_43.shadowNode)?_43.shadowNode:_41,_41._contextMenu.templateId);
_44=_47.menu;
_46=_47.root;
if(_46){
if(_43.alignLeft||_43.alignRight){
i$.removeClass(_46,_24.alignLeft);
i$.removeClass(_46,_24.alignRight);
if(_43.alignLeft){
i$.addClass(_46,_24.alignLeft);
}else{
i$.addClass(_46,_24.alignRight);
}
}
_46.removeAttribute("id");
}
if(!_43._menuitemTemplate){
_43._menuitemTemplate=i$.trim(_44.innerHTML);
}
if(!_43._loadingTemplate){
_45=i$.createDom("div");
_45.appendChild(_47.loading);
_43._loadingTemplate=i$.trim(_45.innerHTML);
_43._loadingTemplate=_43._loadingTemplate.replace(/\$\{loading\}/g,_7.contextMenu.nls.LOADING_0);
_45=null;
}
_45=i$.createDom("div");
_45.innerHTML=_43._loadingTemplate;
if(_47.submenu){
tmp.appendChild(_47.submenu.cloneNode(true));
if(!_43._subMenuTemplate){
_43._subMenuTemplate=i$.trim(tmp.innerHTML);
}
}
}
while(_44.firstChild){
_44.removeChild(_44.firstChild);
}
_44.appendChild(_45);
var _48;
if(_43._submenu){
_48=_43.shadowNode;
}else{
if(_43.shadowNode){
_48=_43.shadowNode;
}else{
_48=_7.contextMenu._transformIntoAbsolutePosition(_41);
}
}
i$.addClass((_48)?_48:_41,_24.show);
i$.bindDomEvt((_48)?_48:_41,"onmouseleave",function(){
if(_43._inProgress){
_42=false;
}
_43.closeFn(false);
});
var _49=_7.contextMenu._load(_43).then(function(_4a){
var _4b=_7.contextMenu._parseData(_4a).then(function(_4c){
_4c=_7.contextMenu._filterMenu(_4c);
if(!_4c||_4c.length==0){
_4c=[{type:"Menuitem",_enabled:true,itemClass:_24.error,title:{value:_7.contextMenu.nls.NO_ITEMS_0,lang:"en"}}];
}
_7.contextMenu._buildMenu(_43,_44,_4c);
_43._inProgress=false;
_7.contextMenu.cache[_43.id]=true;
return {displayMenu:_42};
});
return _4b;
},function(){
var tmp=i$.createDom("div");
tmp.innerHTML=_7.contextMenu._fromTemplate(_43._menuitemTemplate,_24.error,_7.contextMenu.nls.ERROR_LOADING_0);
while(_44.firstChild){
_44.removeChild(_44.firstChild);
}
_44.appendChild(tmp);
_43._inProgress=false;
_7.contextMenu.cache[_43.id]=true;
return {displayMenu:_42};
});
return _49;
},close:function(_4d,_4e,evt){
var _4f=(evt)?evt.target||evt.srcElement:null;
var _50=i$.byId(_4d.id);
i$.removeClass((_4d.shadowNode)?_4d.shadowNode:_50,_24.show);
if(!_4d.activeAction){
var _51=_50._currentSelected;
if(_51){
_51.blur();
}
var _52=_7.contextMenu._findFocusNode(_50);
window.setTimeout(function(){
((_52)?_52:_50).focus();
if(_4e){
window.setTimeout(function(){
_7.contextMenu._applyAction(_4f);
},0);
}
},0);
}
},_load:function(_53){
var _54=_1.replace(/\$\{id\}/g,_53.menuId);
if(_53.jsonQuery){
_54+=(_54.indexOf("?")==-1?"?":"&")+i$.toQuery(_53.jsonQuery);
}
var _55=i$.xhrGet({url:_54,headers:{"X-IBM-XHR":"true"},responseType:"json"}).then(function(_56){
return _56.data;
},function(_57){
var _58=_57.xhr.getResponseHeader("Content-Type")||"";
if((_58.indexOf("text/html")==0)||(_57.xhr.status==401)){
window.setTimeout(function(){
document.location.reload();
},0);
}
console.log("Error trying to load the context menu feed for '"+_53.menuId+"': "+_57);
return null;
});
return _55;
},_parseData:function(_59){
var _5a=[];
i$.each(_59,function(_5b){
var _5c=i$.fromPath("moduleInfo.deferred",false,_5b)?i$.modules.loadDeferred():i$.promise.resolved(true);
_5a.push(_5c.then(function(){
var _5d=_7.contextMenu._checkFunction(_5b,_5b.visibilityFn,_5b,(typeof _5b.visibility!="undefined")?_5b.visibility:true);
var _5e=_7.contextMenu._checkFunction(_5b,_5b.enableFn,_5b,(typeof _5b.enabled!="undefined")?_5b.enabled:true);
return i$.whenAll(_5d,_5e).then(function(_5f){
_5b._visible=_5f[0];
_5b._enabled=_5f[1];
return _5b;
});
}));
});
var _60=i$.whenAll.apply(i$,_5a);
return _60;
},_filterMenu:function(_61){
var _62=[],_63,_64={"type":_3};
for(var i=_61.length-1;i>=0;i--){
_63=_61[i];
if(!_63._visible){
continue;
}
if(_63.type==_3){
if(_64.type==_3){
continue;
}
}else{
if(_63.type==_4){
if((_64.type==_3)||(_64.type==_4)){
continue;
}
}
}
_64=_63;
_62.unshift(_63);
}
while(_62.length>0&&_62[0].type==_3){
_62=_62.slice(1);
}
return _62;
},_buildMenu:function(_65,_66,_67){
var _68=document.createDocumentFragment(),tmp=i$.createDom("div"),_69,_6a,_6b,_6c,_6d,_6e,_6f=i$.fromPath("wptheme.contextMenu.extension.badge");
for(var i=0,l=_67.length;i<l;i++){
_69=_67[i];
tmp.innerHTML=_7.contextMenu._fromTemplate(_65._menuitemTemplate,_69,_6f);
while(_6a=tmp.firstChild){
if(_6a.nodeType==1){
if(_69.type=="Submenu"){
_6a._menuitem=_69;
_6a._jsonData=_65;
i$.bindDomEvt(_6a,"onmouseover",_7.contextMenu._applySubmenu);
}else{
if(_69._enabled){
if(!_6d){
_6d=_6a;
}
_6e=_6a;
_6a.links={previous:_6b,next:null,sub:null};
if(_6b){
_6b.links.next=_6a;
}
if(!_6c&&_69.type!=_4){
_6c=_6a;
}
_6a._menuitem=_69;
_6b=_6a;
i$.bindDomEvt(_6a,"onclick",function(evt){
_7.contextMenu._stopEventPropagation(evt);
_65.closeFn(true,evt);
});
i$.bindDomEvt(_6a,"onkeydown",function(evt){
return _7.contextMenu._applyKeyAction(evt);
});
i$.bindDomEvt(_6a,"onmouseover",function(evt){
return _7.contextMenu._applyFocusAction(evt);
});
}
}
if((_69.title)&&(i$.isRTL(_69.title.lang))){
i$.addClass(_6a,"rtl");
_6a.setAttribute("dir","RTL");
}
if(_69.markupId){
_6a.setAttribute("id",_69.markupId);
}
if(_6f){
_6f.injectBadge(_6a);
}
}
_68.appendChild(_6a);
}
}
_6d.links.previous=_6e;
_6e.links.next=_6d;
while(_66.firstChild){
_66.removeChild(_66.firstChild);
}
_66.appendChild(_68);
i$.byId(_65.id)._firstSelectable=_6c;
i$.byId(_65.id)._currentSelected=null;
},_fromTemplate:function(_70,_71,_72){
var _73,_74,_75,_76="";
if(typeof (_71)=="string"){
_73=_71;
_74=_72;
_75="";
}else{
_73="type"+_71.type;
if(_71.itemClass){
_73+=" "+_71.itemClass;
}
if(!_71._enabled){
_73+=" "+_24.disabled;
}
_74=(_71.title)?_71.title.value:"";
_75=((_71.description)?_71.description.value:"");
if(_72){
_76=_72.getAnchor(_71);
}
}
var _77=_70.replace(/\$\{title\}/g,_74).replace(/\$\{badge\}/g,_76).replace(/"\$\{css-class\}"/g,"\""+(_73)+"\"").replace(/\$\{css-class\}/g,"\""+(_73)+"\"").replace(/"\$\{description\}"/g,"\""+_75+"\"").replace(/\$\{description\}/g,"\""+_75+"\"");
return _77;
},_checkFunction:function(_78,fn,arg,_79){
if(fn){
if(!_78.fromPath){
_78.fromPath={};
}
var _7a=i$.fromPath("wptheme.contextMenu.extension.menuItemScope"),_7b=_7a?_7a.getWindow(_78):null,_7c=_78.fromPath[fn]||i$.fromPath(fn,false,_7b);
_78.fromPath[fn]=_7c;
if(i$.isFunction(_7c)){
try{
return _7c(arg);
}
catch(exc){
console.log("error executing function "+fn+" - "+exc);
}
}
}
return i$.promise.resolved(_79);
},_stopEventPropagation:function(evt){
if(evt){
if(evt.stopPropagation){
evt.stopPropagation();
}else{
evt.cancelBubble=true;
}
}
},_applyKeyAction:function(evt){
var _7d=evt.target||evt.srcElement;
var _7e=_7d;
var _7f=null;
while(!_7f){
_7e=_7e.parentNode;
if(_7e._contextMenu){
_7f=_7e;
}
}
var _80=_7f._contextMenu;
switch(evt.keyCode){
case 32:
if(evt.preventDefault){
evt.preventDefault();
}
case 13:
_7.contextMenu._stopEventPropagation(evt);
_80.closeFn(true,evt);
return false;
case 9:
case 27:
_80.closeFn(false);
break;
case 40:
_7.contextMenu._moveFocus(evt,_80,_7d,"next");
return false;
case 38:
_7.contextMenu._moveFocus(evt,_80,_7d,"previous");
return false;
}
var _81=_7.contextMenu._findNextNodeByKeyCode(_7d,evt.keyCode);
if(_81){
_81.focus();
return false;
}
return true;
},_moveFocus:function(evt,_82,_83,_84){
var _85=_83.links[_84];
if(_85&&(_85._menuitem.type==_4||_85._menuitem.type==_3)){
var _86=false;
var _87=null;
while(!_87&&!_86){
_85=_85.links[_84];
if(!_85){
_86=true;
}else{
if(_85._menuitem.type!=_4&&_85._menuitem.type!=_3){
_87=_85;
}
}
}
_85=_87;
}
if(_85){
var _88=i$.byId(_82.id)._currentSelected;
if(_88){
_88.blur();
}
i$.byId(_82.id)._currentSelected=_85;
_85.focus();
}
if(evt.preventDefault){
evt.preventDefault();
}
},_applyFocusAction:function(evt){
var _89=evt.target||evt.srcElement;
var _8a=_89;
var _8b=null;
var _8c=_89._menuitem;
while(!_8b){
_8a=_8a.parentNode;
if(_8a._contextMenu){
_8b=_8a;
}
if(!_8c){
_89=_89.parentNode;
_8c=_89._menuitem;
}
}
var _8d=_8b._contextMenu;
var _8e=i$.byId(_8d.id)._currentSelected;
if(_8e!=_89){
if(_8e){
_8e.blur();
i$.byId(_8d.id)._currentSelected=null;
}
if(_8c.type!=_4&&_8c.type!=_3){
i$.byId(_8d.id)._currentSelected=_89;
_89.focus();
}
}
return false;
},_applyAction:function(_8f){
var _90=_8f;
var _91=null;
var _92=_8f._menuitem;
while(!_91){
_90=_90.parentNode;
if(_90._contextMenu){
_91=_90;
}
if(!_92){
_8f=_8f.parentNode;
_92=_8f._menuitem;
}
}
var _93=_91._contextMenu;
_93.activeAction=true;
var p=_7.contextMenu._checkFunction(_92,_92.actionFn,_92,_92.actionUrl);
if(p){
p.then(function(_94){
if(_94&&i$.isString(_94)){
var _95=i$.fromPath("wptheme.contextMenu.extension.actionUrlTarget");
var _96=(_95)?_95.getWindow(_92):window;
var _97=_92.actionHttpMethod||"GET";
if(_97!="GET"){
var _98=_96.i$.createDom("form");
_98.setAttribute("action",_94);
_97=_97.toLowerCase();
switch(_97){
case "get":
_98.setAttribute("method","GET");
break;
case "delete":
case "put":
var _99=_96.i$.createDom("input",{"type":"hidden","name":"x-method-override","value":_97.toUpperCase()});
_98.appendChild(_99);
case "post":
_98.setAttribute("method","POST");
_98.setAttribute("enctype","multipart/form-data");
break;
default:
}
_96.i$.byId(_24.complementaryContent).appendChild(_98);
_98.submit();
}else{
var _9a=_96.i$.createDom("a");
_9a.setAttribute("style","display:none");
_9a.setAttribute("href",_94);
_96.i$.byId(_24.complementaryContent).appendChild(_9a);
_9a.click();
}
}
});
}
},_applySubmenu:function(evt){
var _9b=evt.target||evt.srcElement;
if(!_9b._jsonData){
_9b=_9b.parentNode;
}
if(_9b._jsonData){
_9b.setAttribute("id",_9b._jsonData.id+"_"+_9b._menuitem.id);
_7.contextMenu.initSubmenu(_9b,_9b._menuitem.id,_9b._jsonData);
}
},_transformIntoAbsolutePosition:function(_9c){
var _9d=_9c.childNodes,_9e,i=0,_9f=false;
while(_9e=_9d[i++]){
if(i$.hasClass(_9e,_24.alignRight)){
_9f=true;
break;
}else{
if(i$.hasClass(_9e,_24.alignLeft)){
break;
}
}
}
var _a0=i$.createDom("div");
_a0.className=_9c.className;
_a0.appendChild(_9e);
i$.byId(_24.complementaryContent).appendChild(_a0);
_a0._contextMenu=_9c._contextMenu;
_9c._contextMenu.shadowNode=_a0;
_9c._contextMenu._menuIsRight=_9f;
var _a1=i$.createDom("span");
_a0.appendChild(_a1);
i$.addClass(_a1,_24.menuOverlay);
_9c._contextMenu.overlayNode=_a1;
_9c._contextMenu.menuNode=_9e;
_7.contextMenu._updateAbsolutePosition(_9c);
return _a0;
},_updateAbsolutePosition:function(_a2){
var _a3=_a2._contextMenu._menuIsRight;
var _a4=_a2._contextMenu.menuNode;
var _a5=_a2._contextMenu.overlayNode;
var _a6=_7.contextMenu._findPos(_a2);
var _a7=2;
_a5.style.left=(_a6[0]-_a7)+"px";
_a5.style.top=(_a6[1]-_a7)+"px";
_a5.style.width=(_a2.offsetWidth+(2*_a7))+"px";
_a5.style.height=(_a2.offsetHeight+(2*_a7))+"px";
var dir=document.getElementsByTagName("html")[0].getAttribute("dir");
if(dir!=null){
dir=dir.toLowerCase();
}else{
dir="";
}
if(!(dir=="rtl")){
_a4.style.left=((_a3)?_a6[0]+_a2.offsetWidth:_a6[0])+"px";
}else{
_a4.style.left=((_a3)?_a6[0]+_a2.offsetWidth-_a2.scrollWidth:_a6[0]+_a2.scrollWidth)+"px";
}
_a4.style.top=_a6[1]+"px";
},_adjustScreenPositionStart:function(){
return document.documentElement.scrollHeight;
},_adjustScreenPositionEnd:function(_a8){
var _a9=document.documentElement.scrollHeight;
if(_a8!=_a9){
document.documentElement.scrollTop=document.documentElement.scrollHeight;
}
},_findPos:function(obj){
var _aa=curtop=0;
if(obj.offsetParent){
do{
_aa+=obj.offsetLeft;
curtop+=obj.offsetTop;
}while(obj=obj.offsetParent);
var _ab=[_aa,curtop];
return _ab;
}
},});
var _24=_7.contextMenu.css;
})();


}catch(e){console.log("Module 'wp_simple_contextmenu_js': ",e);}
try{(function(){
    i$.merge({
	"NO_ITEMS_0":"No items to display",
	"ERROR_LOADING_0":"Error happened while loading the menu.",
	"LOADING_0":"Loading..."
},i$.fromPath("wptheme.contextMenu.nls",true));
})();
}catch(e){console.log("Module 'wp_simple_contextmenu_js': ",e);}
try{(function(){
if(typeof ic4_wai_integration!="undefined"&&ic4_wai_integration===true){
if(typeof waiHideSecondaryNav!="undefined"&&waiHideSecondaryNav===true){
document.getElementById("wpthemeSecondaryBanner").style.display="none";
document.getElementById("wpthemeMainContent").style.display="none";
}
document.getElementById("wptheme_banner").removeAttribute("role");
document.getElementById("wptheme_contentinfo").removeAttribute("role");
if(dojo!="undefined"){
djConfig.locale=dojo.locale;
dojo.addOnLoad(function(){
document.getElementById("logoutlink").onclick=null;
});
}
if(typeof appName!="undefined"&&appName==="profile"){
ibmConfig.proxyURL=svcHrefProfiles+"/ajaxProxy/";
ibmConfig["com.ibm.mashups.proxy.url"]=svcHrefProfiles+"/ajaxProxy";
djConfig.baseUrl=(needProxy?(ibmConfig.proxyURL+encodeURIComponent(baseProtocol)+"/"+encodeURIComponent(baseHost)):(baseProtocol+"://"+baseHost))+basePath+"/web/dojo/";
djConfig.proxy=applicationContext+"/ajaxProxy";
}
if(typeof i$!="undefined"&&i$.isRTL){
document.body.className=document.body.className.replace("lotusImagesOff","");
document.body.className+=" wptheme_ic4_wai_rtl";
}
}
})();


}catch(e){console.log("Module 'wp_ic4_wai_resources': ",e);}
try{(function(){
if(!i$.isIE){
i$.addOnLoad(function(){
var _1=new Array();
var _2=document.getElementsByTagName("SECTION");
var _3=null;
for(var i=0;i<_2.length;i++){
if(i$.hasClass(_2[i],"a11yRegionTarget")){
var _4=_2[i];
var _5=null;
var _6=_4.getElementsByTagName("SPAN");
var _7=document.getElementsByTagName("HEADER");
var _8=null;
for(var j=0;j<_6.length;j++){
if(i$.hasClass(_6[j],"a11yRegionLabel")){
_5=_6[j];
}
}
if(_5){
var _9=_5;
var _a=_4;
while((_a=_a.parentNode)!=null){
if(i$.hasClass(_a,"component-control")){
var m=_a&&(_a.className||"").match(/id-([\S]+)/);
_3=m&&m[1];
break;
}
}
if(_3){
var _b="skinHeader"+_3;
var _c=_9.innerHTML;
if(_1.indexOf(_c)>-1){
for(var j=0;j<_1.length;j++){
var _d=_c.concat(" ").concat(j+1);
if(_1.indexOf(_d)==-1){
_c=_d;
_1.push(_c);
break;
}
}
}else{
_1.push(_c);
}
_4.setAttribute("aria-label",_c);
for(var k=0;k<_7.length;k++){
if(i$.hasClass(_7[k],"wpthemeControlHeader")){
_8=_7[k];
if(_8.parentNode==_4){
_8.setAttribute("aria-label",_b);
}
}
}
}
}
}
}
});
}
})();


}catch(e){console.log("Module 'wp_theme_skin_region': ",e);}
try{(function(){
    i$.merge({
	"WARNING_0":"Warning",
	"DELETE_0":"Delete",
	"INFO_0":"Information",
	"MESSAGES_AVAILABLE_1":"${0} messages are available for review",
	"SHOW_DETAILS_0":"Show Details",
	"ERROR_0":"Error",
	"HIDE_DETAILS_0":"Hide Details"
},i$.fromPath("wptheme.statusBar.nls",true));
})();
}catch(e){console.log("Module 'wp_status_bar': ",e);}
try{(function(){
if(typeof com==="undefined"||!com){
com={};
}
if(typeof com.ibm==="undefined"||!com.ibm){
com.ibm={};
}
if(typeof com.ibm.widgets==="undefined"||!com.ibm.widgets){
com.ibm.widgets={};
}
if(typeof com.ibm.widgets.StatusType==="undefined"||!com.ibm.widgets.StatusType){
com.ibm.widgets.StatusType=function(id,_1,_2,_3){
this._id=id;
this._styleClass=_1;
this._iconPath=_2;
this._iconAlt=_3;
};
}
if(typeof com.ibm.widgets.StatusMessage==="undefined"||!com.ibm.widgets.StatusMessage){
com.ibm.widgets.StatusMessage=function(_4,_5,_6){
this._type=_4;
this._message=_5;
if(!i$.isString(_5)&&_5.message&&i$.isString(_5.message)){
this._message=_5.message;
}
this._details=_6;
};
}
if(typeof com.ibm.widgets.StatusBarV2==="undefined"||!com.ibm.widgets.StatusBarV2){
com.ibm.widgets.StatusBarV2=function(_7){
this.uid=_7;
this.showDetails=false;
this._messages=[];
this._connections=[];
this._numMessages=0;
this._baseURL=window.location.protocol+"//"+window.location.host;
this.blankGifIcon="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
this._statusTypesMap={"error":new com.ibm.widgets.StatusType(0,"wpthemeError",this.blankGifIcon,wptheme.statusBar.nls.ERROR_0),"warning":new com.ibm.widgets.StatusType(1,"wpthemeWarning",this.blankGifIcon,wptheme.statusBar.nls.WARNING_0),"info":new com.ibm.widgets.StatusType(2,"wpthemeInfo",this.blankGifIcon,wptheme.statusBar.nls.INFO_0)};
i$.addListener("/portal/status",i$.scope(this,this.addMessage));
i$.addListener("/message/status",i$.scope(this,this.addMessage));
i$.addListener("/portal/status/clear",i$.scope(this,this.clearMessage));
i$.addListener("/message/status/clear",i$.scope(this,this.clearMessage));
if(typeof (ibmCfg)!="undefined"&&ibmCfg.portalConfig){
this.isBidi=ibmCfg.portalConfig.isRTL;
}else{
if(typeof (ibmPortalConfig)!="undefined"){
this.isBidi=ibmPortalConfig.isRTL;
}else{
if(typeof (ibmConfig)!="undefined"){
this.isBidi=ibmConfig.isBidi;
}
}
}
i$.addOnUnload(i$.scope(this,this._onWindowUnload));
this.containerNode=i$.byId("wpthemeStatusBarContainer");
};
}
i$.augment(com.ibm.widgets.StatusBarV2,{_onWindowUnload:function(){
i$.forEach(this._connections,function(_8){
i$.unbindDomEvt(_8);
});
this._connections=null;
this.clear();
this._messages=null;
},_getStatusContainer:function(){
return this.containerNode;
},_escapeHTML:function(_9){
if(_9.replace){
return _9.replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
}
return _9;
},setShowDetails:function(_a){
this.showDetails=_a;
},toggleShowDetails:function(){
this.setShowDetails(!this.showDetails);
this.render();
},clear:function(){
var _b=this._getStatusContainer();
if(!!_b){
_b.innerHTML="";
_b.setAttribute("role","");
_b.setAttribute("wairole","");
}
this._messages.length=0;
},clearMessage:function(_c){
if(_c.uid&&_c.uid!=this.uid){
return;
}
var _d=_c.message;
if(typeof _d==="undefined"||_d===null){
this.clear();
}else{
for(var i=this._messages.length-1;i>=0;i--){
if(this._messages[i]._type==_d._type&&this._messages[i]._message==_d._message&&this._messages[i]._details==_d._details){
this._messages.splice(i,1);
}
}
if(this._messages.length==0){
this.clear();
}else{
if(this._messages.length<100){
this.render(this._getStatusContainer());
}
}
}
},addMessage:function(_e){
if(_e.uid&&_e.uid!=this.uid){
return;
}
var _f=_e.message;
this._messages.push(_f);
if(this._messages.length<100){
this.render(this._getStatusContainer());
}
},render:function(_10){
if(_10==null){
_10=this._getStatusContainer();
}
_10.innerHTML="";
if(this._messages.length>1){
this.renderHeader(_10);
}else{
if(this._messages.length==1){
this.renderMessage(_10,this._messages[0],this.showDetails,0);
}
}
if(this.showDetails&&this._messages.length>1){
for(x in this._messages){
this.renderMessage(_10,this._messages[x],this.showDetails,x);
}
}
},renderHeader:function(_11){
if(this._messages.length>1){
var _12=2;
for(var i=0;i<this._messages.length;i++){
_12=Math.min(_12,this._statusTypesMap[this._messages[i]._type]._id);
}
var _13="info";
for(x in this._statusTypesMap){
if(this._statusTypesMap[x]._id==_12){
_13=x;
break;
}
}
var _14=new com.ibm.widgets.StatusMessage(_13,wptheme.statusBar.nls.MESSAGES_AVAILABLE_1.replace("${0}",this._messages.length),"");
this.renderMessage(_11,_14,this.showDetails,-1);
}
},renderMessage:function(_15,_16,_17,_18){
var _19=this._statusTypesMap[_16._type];
var _1a=document.createElement("div");
_1a.className="wpthemeMessage "+_19._styleClass;
if(this._messages.length>1&&_18>=0){
_1a.className+=" wpthemeMoreMsg";
}
var _1b=document.createElement("img");
_1b.className="wpthemeMsgIcon "+(_19._styleClass=="wpthemeError"?"wpthemeMsgIconError":_19._styleClass=="wpthemeWarning"?"wpthemeMsgIconWarning":"wpthemeMsgIconInfo");
_1b.src=_19._iconPath;
_1b.alt=_1b.title=_19._iconAlt;
_1a.appendChild(_1b);
var _1c=document.createElement("span");
_1c.className="wpthemeAltText";
_1c.innerHTML=this._escapeHTML(_19._iconAlt+":");
_1a.appendChild(_1c);
var _1d=document.createElement("div");
_1d.className="wpthemeMessageBody";
_1d.innerHTML=this._escapeHTML(_16._message);
_1a.appendChild(_1d);
if((this._messages.length>1&&_18<0)||(this._messages.length==1)){
if(_16._details&&_16._details.length>0||_18<0){
var _1e=document.createElement("a");
_1e.href="javascript:void(0)";
_1e.className="wpthemeHideShow";
_1e.role="button";
this._connections.push(i$.bindDomEvt(_1e,"onclick",i$.scope(this,this.toggleShowDetails)));
var _1f=document.createElement("img");
_1f.className="wpthemeMsgIcon16";
_1f.src=ibmCfg.themeConfig.modulesWebAppBaseURI+"/themes/html/dynamicSpots/icons/blank.gif";
_1e.appendChild(_1f);
var _20=document.createElement("span");
_20.className="wpthemeAltText";
_1e.appendChild(_20);
}else{
_17=false;
}
var _21=document.createElement("a");
_21.href="javascript:void(0);";
_21.className="wpthemeDelete";
_21.role="button";
_21.title=wptheme.statusBar.nls.DELETE_0;
this._connections.push(i$.bindDomEvt(_21,"onclick",i$.scope(this,this.clear)));
var _22=document.createElement("img");
_22.alt=wptheme.statusBar.nls.DELETE_0;
_22.src=ibmCfg.themeConfig.modulesWebAppBaseURI+"/themes/html/dynamicSpots/icons/blank.gif";
_21.appendChild(_22);
var _23=document.createElement("span");
_23.className="wpthemeAltText";
_23.innerHTML=this._escapeHTML(wptheme.statusBar.nls.DELETE_0);
_21.appendChild(_23);
if(_16._details&&_16._details.length>0||_18<0){
if(_17){
_1e.title=wptheme.statusBar.nls.HIDE_DETAILS_0;
_1f.className+=" wpthemeMsgIconHide";
_1f.alt=wptheme.statusBar.nls.HIDE_DETAILS_0;
_20.innerHTML=this._escapeHTML(wptheme.statusBar.nls.HIDE_DETAILS_0);
}else{
_1e.title=wptheme.statusBar.nls.SHOW_DETAILS_0;
_1f.className+=" wpthemeMsgIconShow";
_1f.alt=wptheme.statusBar.nls.SHOW_DETAILS_0;
_20.innerHTML=this._escapeHTML(wptheme.statusBar.nls.SHOW_DETAILS_0);
}
_1a.appendChild(_1e);
}
_1a.appendChild(_21);
}
var _24=document.createElement("div");
_24.className="wpthemeClear";
_1a.appendChild(_24);
if(_16._details&&_16._details.length>0&&_17&&_18>=0){
var _25=document.createElement("div");
_25.className="wpthemeDetails";
_25.appendChild(document.createTextNode(_16._details));
_1a.appendChild(_25);
}
_15.appendChild(_1a);
_15.setAttribute("role","alert");
_15.setAttribute("wairole","alert");
}});
if(typeof wpstatusbar==="undefined"||!wpstatusbar){
wpstatusbar=new com.ibm.widgets.StatusBarV2("ibmStatusBox");
}
var _26=i$.getCookie("ibm.portal.operations.error");
if(_26){
var _27=i$.fromJson(decodeURIComponent(_26));
var _28="error";
if(_27.errorType){
_28=_27.errorType;
}else{
if(_27.errorCode){
if(_27.errorCode=="400"){
_28="error";
}
}
}
i$.fireEvent("/portal/status",[{message:new com.ibm.widgets.StatusMessage(_28,_27.errorMessage?_27.errorMessage:"",_27.errorDetails?_27.errorDetails:""),uid:"ibmStatusBox"}]);
i$.deleteCookie("ibm.portal.operations.error");
}
i$.addOnLoad(function(){
if("localStorage" in window&&window["localStorage"]!==null){
if(localStorage["com.ibm.wp.toolbar.msg.msg"]!=null){
i$.fireEvent("/message/status",[{message:new com.ibm.widgets.StatusMessage(localStorage["com.ibm.wp.toolbar.msg.type"],localStorage["com.ibm.wp.toolbar.msg.msg"],""),uid:"ibmStatusBox"}]);
localStorage.removeItem("com.ibm.wp.toolbar.msg.type");
localStorage.removeItem("com.ibm.wp.toolbar.msg.msg");
}
}
});
})();


}catch(e){console.log("Module 'wp_status_bar': ",e);}