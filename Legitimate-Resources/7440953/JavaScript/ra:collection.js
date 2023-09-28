
try{(function(_1){
var _1=_1,_2=_1.document,_3=i$.hasClass,_4=i$.toQuery,_5=i$.fromPath,_6=i$.forEach,_7="edit",_8="info",_9="toolbar:open",_a="toolbar:close",_b="ibm.portal.toolbar.",_c=function(_d){
var _d=_e(_d),_f=_10(_d),uri=_f.uri,_11=_f.params||{},_12=_13(_d);
if(uri){
if(_14()&&!_15(_12)){
if(_d.editMode===true){
_16(uri,_11);
}else{
_17(uri,_11);
}
}else{
_18(uri,_11,_12);
}
}else{
if(_14()){
if(_15(_12)){
_19(_12);
}
}else{
_18(uri,_11,_12);
}
}
},_1a=function(_1b){
_1b.primaryTab=_1b.tab;
_1b.tab=null;
return _c(_1b);
},_1c=function(_1d){
_1d.secondaryTab=_1d.tab;
_1d.tab=null;
return _c(_1d);
},_1e=function(_1f){
var _20=_21();
if(_20){
_20.close(_1f);
}else{
_1f();
}
},_22=function(_23){
_1e(function(){
_24(_23);
});
},_24=function(_25){
var _26=_10(_25),uri=_26.uri,_27=_26.params||{};
if(_14()){
if(uri){
if(!_27.uri){
_27.uri=[];
}
_27.uri.push(_a);
}else{
uri=_a;
}
}
if(uri){
_28(_29(),uri,_27,function(url){
_2a().location.href=url;
});
}
},_14=function(){
var r=_21();
return r;
},_2b=function(_2c,_2d){
var uri=_2e(_2c,_2d);
if(_2c==_7&&_2d&&_14()){
_16(uri);
}else{
_17(uri);
}
},_2e=function(_2f,_30){
var uri=["pagemode:"];
uri.push(_2f);
uri.push(":");
_30?uri.push("on"):uri.push("off");
var r=uri.join("");
return r;
},_31=function(_32){
_2b(_7,_32);
},_33=function(){
var r=_34(_7);
return r;
},_35=function(_36){
_2b(_8,_36);
},_37=function(){
var r=_34(_8);
return r;
},_34=function(_38){
var win=_29(),_39=win.document.body,r=_3(_39,_38+"-mode");
return r;
},_3a=function(_3b,_3c){
var r=false;
if(_3c!==undefined){
r=_3c!==_34(_3b);
}
return r;
},_17=function(uri,_3d){
var win=_29();
_28(win,uri,_3d,function(url){
win.location.href=url;
});
},_16=function(uri,_3e){
if(_14()){
var _3f=_21();
_3f.load(_40(uri,_3e),"view",{"onload":function(){
_3f.restore();
}});
}else{
var win=_29();
_28(win,uri,_3e,function(url){
win.location.href=url;
});
}
},_41=function(_42){
_29().location.reload(_42);
},_10=function(_43){
var r={};
if(_43){
var uri=null,_44={},_45=_43.editMode,_46=_43.infoMode;
if(_3a(_7,_45)){
uri=_2e(_7,_45);
}
if(_3a(_8,_46)){
var _47=_2e(_8,_46);
if(uri){
_44.uri=[_47];
}else{
uri=_47;
}
}
if(uri){
r.uri=uri;
r.params=_44;
}
}
return r;
},_40=function(uri,_48){
var _49={"uri":uri};
if(_48){
_49.params=_48;
}
return _49;
},_e=function(_4a){
if(_14()){
_4a.autoOpenDefaultTabs=false;
}
return _4a;
},_19=function(_4b){
if(_4b&&_15(_4b)){
var _4c=_21();
if(_4c){
var p=_4b.primaryURI,_4d={},_4e=_4b.onCloseDialog;
if(_4e&&_4e.id){
_4d.onCloseDialog=function(_4f){
_50(_4f,_4e.id,_4e.key);
};
}
if(p){
_4c.load(_40(p),"primary",_4d);
}
var s=_4b.secondaryURI;
if(s){
_4c.load(_40(s),"secondary",_4d);
}
}
}
},_50=function(_51,id,key){
var _52=_51,id=id,key=key||"onCloseDialog";
_53(function(w){
try{
var d=w.document;
if(d){
var n=d.getElementById(id);
if(n){
var f=n[key];
if(f){
f.call(n,_51);
}
}
}
}
catch(e){
}
});
},_18=function(uri,_54,_55){
if(uri){
if(!_54){
_54={};
}
if(!_54.uri){
_54.uri=[];
}
_54.uri.push(_9);
}else{
uri=_9;
}
if(_55&&_15(_55)){
if(!_54){
_54={};
}
var p=_55.primaryURI;
if(p){
_54.primaryTabURI=[p];
}
var s=_55.secondaryURI;
if(s){
_54.secondaryTabURI=[s];
}
}
_28(_29(),uri,_54,function(url){
_2a().location.href=url;
});
},_13=function(_56){
var r={};
if(_56){
if(_56.tab||_56.primaryTab||_56.secondaryTab){
var _57=_56.secondaryTab||_56.tab;
if(_57){
r.secondaryURI=_58(_57);
}
var _59=_56.primaryTab;
if(_59){
r.primaryURI=_58(_59);
}
}
r.onCloseDialog=_56.onCloseDialog;
var _5a=_56.autoOpenDefaultTabs;
if(_5a){
if(!r.primaryURI){
r.primaryURI="default";
}
if(!r.secondaryURI){
r.secondaryURI="default";
}
}
}
return r;
},_58=function(t){
if(t.indexOf(_b)==0||t.indexOf("Z6_")==0){
return "nm:oid:"+t;
}else{
return t;
}
},_15=function(_5b){
var r=_5b&&(_5b.primaryURI||_5b.secondaryURI);
return r;
},_28=function(win,uri,_5c,cb){
_5d(win).then(function(url){
var _5e=url,buf=[];
buf.push(_5e);
if(_5e.indexOf("?")<0){
buf.push("?");
}else{
buf.push("&");
}
buf.push("uri=");
buf.push(uri);
if(_5c){
buf.push("&");
buf.push(_4(_5c));
}
var r=buf.join("");
cb(r);
});
},_5d=function(win){
var r=wpModules.theme.WindowUtils.findBaseURL(win);
return r;
},_5f=function(win){
var r=wpModules.theme.WindowUtils.getBaseURL(win);
return r;
},_29=function(){
var wu=wpModules.theme.WindowUtils,r=(wu&&wu.getWindow(wu.VIEW_AREA))||_1;
return r;
},_53=function(cb){
var _60=_2a(),_61=_60.frames;
cb.call(this,_60);
if(_61&&_61.length>0){
_6(_61,function(f){
cb.call(this,f.window);
});
}
},_2a=function(){
var win=_29(),r=(win.parent||win);
return r;
},_21=function(){
var r=_5("wpModules.toolbar.NavigationController",false,_2a());
return r;
},_62=_5("wpModules.toolbar",true);
_62.openToolbar=_c;
_62.openPrimaryTab=_1a;
_62.openSecondaryTab=_1c;
_62.closeTab=_1e;
_62.closeToolbar=_22;
_62.isToolbarOpened=_14;
_62.setEditModeActive=_31;
_62.isEditModeActive=_33;
_62.setInfoModeActive=_35;
_62.isInfoModeActive=_37;
_62.loadViewArea=_17;
_62.reloadViewArea=_41;
_62.getViewAreaWindow=_29;
_62.getToolbarMasterWindow=_2a;
_62.getBaseURL=_5f;
})(window);


}catch(e){console.log("Module 'wp_toolbar_utils': ",e);}
try{if(typeof (wpModules.toolbar)=="undefined"){
wpModules.toolbar={};
}
if(typeof (wpModules.toolbar.menuActions)=="undefined"){
wpModules.toolbar.menuActions={};
}


}catch(e){console.log("Module 'wp_toolbar_menuactions': ",e);}
try{(function(){
    i$.merge({
	"move_page_dialog_title":"Move the page '{0}' to...",
	"edit_wiring_dialog_title":"Manage Communication Endpoints for '{0}'",
	"confirm_delete_page_anonymous":"Are you sure you want to delete this page and all of its children?",
	"delete_control_dialog_title":"Delete Portlet",
	"confirm_delete_page":"Are you sure you want to delete the page '{0}' and all of its children?",
	"confirm_delete_control_anonymous":"Are you sure you want to remove this portlet from the page?",
	"page_properties_dialog_title":"Manage Page Properties",
	"delete_page_dialog_title":"Delete Page",
	"edit_wiring_dialog_title_anonymous":"Manage Communication Endpoints",
	"preview_as_user_dialog_title":"Preview as User",
	"confirm_delete_control":"Are you sure you want to remove the portlet '{0}' from the page?"
},i$.fromPath("wpModules.toolbar.menuActions.nls",true));
})();
}catch(e){console.log("Module 'wp_toolbar_menuactions': ",e);}
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
var _55=i$.xhrGet({url:_54,headers:{"X-IBM-XHR":"true","Cache-Control":"No-Cache"},responseType:"json"}).then(function(_56){
var _57=_53.jsonQuery.secondaryRootNode;
if(_57!=null){
_53.jsonQuery.rootNode=_57;
var _58=_1.replace(/\$\{id\}/g,_53.menuId);
_58+=(_54.indexOf("?")==-1?"?":"&")+i$.toQuery(_53.jsonQuery);
var _59=i$.xhrGet({url:_58,headers:{"X-IBM-XHR":"true"},responseType:"json"}).then(function(_5a){
return _56.data.concat(_5a.data);
});
return _59;
}
return _56.data;
},function(_5b){
var _5c=_5b.xhr.getResponseHeader("Content-Type")||"";
if((_5c.indexOf("text/html")==0)||(_5b.xhr.status==401)){
window.setTimeout(function(){
document.location.reload();
},0);
}
console.log("Error trying to load the context menu feed for '"+_53.menuId+"': "+_5b);
return null;
});
return _55;
},_parseData:function(_5d){
var _5e=[];
i$.each(_5d,function(_5f){
var _60=i$.fromPath("moduleInfo.deferred",false,_5f)?i$.modules.loadDeferred():i$.promise.resolved(true);
_5e.push(_60.then(function(){
var _61=_7.contextMenu._checkFunction(_5f,_5f.visibilityFn,_5f,(typeof _5f.visibility!="undefined")?_5f.visibility:true);
var _62=_7.contextMenu._checkFunction(_5f,_5f.enableFn,_5f,(typeof _5f.enabled!="undefined")?_5f.enabled:true);
return i$.whenAll(_61,_62).then(function(_63){
_5f._visible=_63[0];
_5f._enabled=_63[1];
return _5f;
});
}));
});
var _64=i$.whenAll.apply(i$,_5e);
return _64;
},_filterMenu:function(_65){
var _66=[],_67,_68={"type":_3};
for(var i=_65.length-1;i>=0;i--){
_67=_65[i];
if(!_67._visible){
continue;
}
if(_67.type==_3){
if(_68.type==_3){
continue;
}
}else{
if(_67.type==_4){
if((_68.type==_3)||(_68.type==_4)){
continue;
}
}
}
_68=_67;
_66.unshift(_67);
}
while(_66.length>0&&_66[0].type==_3){
_66=_66.slice(1);
}
return _66;
},_buildMenu:function(_69,_6a,_6b){
var _6c=document.createDocumentFragment(),tmp=i$.createDom("div"),_6d,_6e,_6f,_70,_71,_72,_73=i$.fromPath("wptheme.contextMenu.extension.badge");
for(var i=0,l=_6b.length;i<l;i++){
_6d=_6b[i];
tmp.innerHTML=_7.contextMenu._fromTemplate(_69._menuitemTemplate,_6d,_73);
while(_6e=tmp.firstChild){
if(_6e.nodeType==1){
if(_6d.type=="Submenu"){
_6e._menuitem=_6d;
_6e._jsonData=_69;
i$.bindDomEvt(_6e,"onmouseover",_7.contextMenu._applySubmenu);
}else{
if(_6d._enabled){
if(!_71){
_71=_6e;
}
_72=_6e;
_6e.links={previous:_6f,next:null,sub:null};
if(_6f){
_6f.links.next=_6e;
}
if(!_70&&_6d.type!=_4){
_70=_6e;
}
_6e._menuitem=_6d;
_6f=_6e;
i$.bindDomEvt(_6e,"onclick",function(evt){
_7.contextMenu._stopEventPropagation(evt);
_69.closeFn(true,evt);
});
i$.bindDomEvt(_6e,"onkeydown",function(evt){
return _7.contextMenu._applyKeyAction(evt);
});
i$.bindDomEvt(_6e,"onmouseover",function(evt){
return _7.contextMenu._applyFocusAction(evt);
});
}
}
if((_6d.title)&&(i$.isRTL(_6d.title.lang))){
i$.addClass(_6e,"rtl");
_6e.setAttribute("dir","RTL");
}
if(_6d.markupId){
_6e.setAttribute("id",_6d.markupId);
}
if(_73){
_73.injectBadge(_6e);
}
}
_6c.appendChild(_6e);
}
}
_71.links.previous=_72;
_72.links.next=_71;
while(_6a.firstChild){
_6a.removeChild(_6a.firstChild);
}
_6a.appendChild(_6c);
i$.byId(_69.id)._firstSelectable=_70;
i$.byId(_69.id)._currentSelected=null;
},_fromTemplate:function(_74,_75,_76){
var _77,_78,_79,_7a="";
if(typeof (_75)=="string"){
_77=_75;
_78=_76;
_79="";
}else{
_77="type"+_75.type;
if(_75.itemClass){
_77+=" "+_75.itemClass;
}
if(!_75._enabled){
_77+=" "+_24.disabled;
}
_78=(_75.title)?_75.title.value:"";
_79=((_75.description)?_75.description.value:"");
if(_76){
_7a=_76.getAnchor(_75);
}
}
var _7b=_74.replace(/\$\{title\}/g,_78).replace(/\$\{badge\}/g,_7a).replace(/"\$\{css-class\}"/g,"\""+(_77)+"\"").replace(/\$\{css-class\}/g,"\""+(_77)+"\"").replace(/"\$\{description\}"/g,"\""+_79+"\"").replace(/\$\{description\}/g,"\""+_79+"\"");
return _7b;
},_checkFunction:function(_7c,fn,arg,_7d){
if(fn){
if(!_7c.fromPath){
_7c.fromPath={};
}
var _7e=i$.fromPath("wptheme.contextMenu.extension.menuItemScope"),_7f=_7e?_7e.getWindow(_7c):null,_80=_7c.fromPath[fn]||i$.fromPath(fn,false,_7f);
_7c.fromPath[fn]=_80;
if(i$.isFunction(_80)){
try{
return _80(arg);
}
catch(exc){
console.log("error executing function "+fn+" - "+exc);
}
}
}
return i$.promise.resolved(_7d);
},_stopEventPropagation:function(evt){
if(evt){
if(evt.stopPropagation){
evt.stopPropagation();
}else{
evt.cancelBubble=true;
}
}
},_applyKeyAction:function(evt){
var _81=evt.target||evt.srcElement;
var _82=_81;
var _83=null;
while(!_83){
_82=_82.parentNode;
if(_82._contextMenu){
_83=_82;
}
}
var _84=_83._contextMenu;
switch(evt.keyCode){
case 32:
if(evt.preventDefault){
evt.preventDefault();
}
case 13:
_7.contextMenu._stopEventPropagation(evt);
_84.closeFn(true,evt);
return false;
case 9:
case 27:
_84.closeFn(false);
break;
case 40:
_7.contextMenu._moveFocus(evt,_84,_81,"next");
return false;
case 38:
_7.contextMenu._moveFocus(evt,_84,_81,"previous");
return false;
}
var _85=_7.contextMenu._findNextNodeByKeyCode(_81,evt.keyCode);
if(_85){
_85.focus();
return false;
}
return true;
},_moveFocus:function(evt,_86,_87,_88){
var _89=_87.links[_88];
if(_89&&(_89._menuitem.type==_4||_89._menuitem.type==_3)){
var _8a=false;
var _8b=null;
while(!_8b&&!_8a){
_89=_89.links[_88];
if(!_89){
_8a=true;
}else{
if(_89._menuitem.type!=_4&&_89._menuitem.type!=_3){
_8b=_89;
}
}
}
_89=_8b;
}
if(_89){
var _8c=i$.byId(_86.id)._currentSelected;
if(_8c){
_8c.blur();
}
i$.byId(_86.id)._currentSelected=_89;
_89.focus();
}
if(evt.preventDefault){
evt.preventDefault();
}
},_applyFocusAction:function(evt){
var _8d=evt.target||evt.srcElement;
var _8e=_8d;
var _8f=null;
var _90=_8d._menuitem;
while(!_8f){
_8e=_8e.parentNode;
if(_8e._contextMenu){
_8f=_8e;
}
if(!_90){
_8d=_8d.parentNode;
_90=_8d._menuitem;
}
}
var _91=_8f._contextMenu;
var _92=i$.byId(_91.id)._currentSelected;
if(_92!=_8d){
if(_92){
_92.blur();
i$.byId(_91.id)._currentSelected=null;
}
if(_90.type!=_4&&_90.type!=_3){
i$.byId(_91.id)._currentSelected=_8d;
_8d.focus();
}
}
return false;
},_applyAction:function(_93){
var _94=_93;
var _95=null;
var _96=_93._menuitem;
while(!_95){
_94=_94.parentNode;
if(_94._contextMenu){
_95=_94;
}
if(!_96){
_93=_93.parentNode;
_96=_93._menuitem;
}
}
var _97=_95._contextMenu;
_97.activeAction=true;
var p=_7.contextMenu._checkFunction(_96,_96.actionFn,_96,_96.actionUrl);
if(p){
p.then(function(_98){
if(_98&&i$.isString(_98)){
var _99=i$.fromPath("wptheme.contextMenu.extension.actionUrlTarget");
var _9a=(_99)?_99.getWindow(_96):window;
var _9b=_96.actionHttpMethod||"GET";
if(_9b!="GET"){
var _9c=_9a.i$.createDom("form");
_9c.setAttribute("action",_98);
_9b=_9b.toLowerCase();
switch(_9b){
case "get":
_9c.setAttribute("method","GET");
break;
case "delete":
case "put":
var _9d=_9a.i$.createDom("input",{"type":"hidden","name":"x-method-override","value":_9b.toUpperCase()});
_9c.appendChild(_9d);
case "post":
_9c.setAttribute("method","POST");
_9c.setAttribute("enctype","multipart/form-data");
break;
default:
}
_9a.i$.byId(_24.complementaryContent).appendChild(_9c);
_9c.submit();
}else{
var _9e=_9a.i$.createDom("a");
_9e.setAttribute("style","display:none");
_9e.setAttribute("href",_98);
_9a.i$.byId(_24.complementaryContent).appendChild(_9e);
_9e.click();
}
}
});
}
},_applySubmenu:function(evt){
var _9f=evt.target||evt.srcElement;
if(!_9f._jsonData){
_9f=_9f.parentNode;
}
if(_9f._jsonData){
_9f.setAttribute("id",_9f._jsonData.id+"_"+_9f._menuitem.id);
_7.contextMenu.initSubmenu(_9f,_9f._menuitem.id,_9f._jsonData);
}
},_transformIntoAbsolutePosition:function(_a0){
var _a1=_a0.childNodes,_a2,i=0,_a3=false;
while(_a2=_a1[i++]){
if(i$.hasClass(_a2,_24.alignRight)){
_a3=true;
break;
}else{
if(i$.hasClass(_a2,_24.alignLeft)){
break;
}
}
}
var _a4=i$.createDom("div");
_a4.className=_a0.className;
_a4.appendChild(_a2);
i$.byId(_24.complementaryContent).appendChild(_a4);
_a4._contextMenu=_a0._contextMenu;
_a0._contextMenu.shadowNode=_a4;
_a0._contextMenu._menuIsRight=_a3;
var _a5=i$.createDom("span");
_a4.appendChild(_a5);
i$.addClass(_a5,_24.menuOverlay);
_a0._contextMenu.overlayNode=_a5;
_a0._contextMenu.menuNode=_a2;
_7.contextMenu._updateAbsolutePosition(_a0);
return _a4;
},_updateAbsolutePosition:function(_a6){
var _a7=_a6._contextMenu._menuIsRight;
var _a8=_a6._contextMenu.menuNode;
var _a9=_a6._contextMenu.overlayNode;
var _aa=_7.contextMenu._findPos(_a6);
var _ab=2;
_a9.style.left=(_aa[0]-_ab)+"px";
_a9.style.top=(_aa[1]-_ab)+"px";
_a9.style.width=(_a6.offsetWidth+(2*_ab))+"px";
_a9.style.height=(_a6.offsetHeight+(2*_ab))+"px";
var dir=document.getElementsByTagName("html")[0].getAttribute("dir");
if(dir!=null){
dir=dir.toLowerCase();
}else{
dir="";
}
if(!(dir=="rtl")){
_a8.style.left=((_a7)?_aa[0]+_a6.offsetWidth:_aa[0])+"px";
}else{
_a8.style.left=((_a7)?_aa[0]+_a6.offsetWidth-_a6.scrollWidth:_aa[0]+_a6.scrollWidth)+"px";
}
_a8.style.top=_aa[1]+"px";
},_adjustScreenPositionStart:function(){
return document.documentElement.scrollHeight;
},_adjustScreenPositionEnd:function(_ac){
var _ad=document.documentElement.scrollHeight;
if(_ac!=_ad){
document.documentElement.scrollTop=document.documentElement.scrollHeight;
}
},_findPos:function(obj){
var _ae=curtop=0;
if(obj.offsetParent){
do{
_ae+=obj.offsetLeft;
curtop+=obj.offsetTop;
}while(obj=obj.offsetParent);
var _af=[_ae,curtop];
return _af;
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
try{/** Licensed Materials - Property of IBM, 5724-E76 and 5724-E77, (C) Copyright IBM Corp. 2012 - All Rights reserved.  **/
(function(){
function _1(_2){
var _3=window,_4=_2.metadata;
if(_4&&_4._contributionWindow){
return _4._contributionWindow;
}
if(_4&&_4.contributor){
var _5=_4.contributor,_6=_5.lastIndexOf(":"),_7=_5.substr(_6+1),_8=i$.fromPath("wpModules.theme.WindowUtils");
if(_8){
_3=_8.getWindow(_7);
}
}
if(!_4){
_4=_2.metadata={};
}
_4._contributionWindow=_3;
return _3;
};
var _9={getWindow:function(_a){
var _b=(_a.metadata&&_a.metadata.actionUrlTarget)||"same",_c,wu=wpModules.theme.WindowUtils;
_c=_1(_a);
if(_b=="view"){
_c=wu&&wu.getWindow(wu.VIEW_AREA);
}else{
if(_b=="master"){
_c=wu&&wu.getWindow(wu.MASTER);
}
}
return _c||window;
}};
var _d={getWindow:function(_e){
return _1(_e);
}};
i$.toPath("wptheme.contextMenu.extension.actionUrlTarget",_9);
i$.toPath("wptheme.contextMenu.extension.menuItemScope",_d);
var _f={templates:{anchor:"<span class=\"wpthemeMenuBadgeAnchor\"></span>",loading:"<span class=\"wpthemeMenuLoading wpthemeTemplateLoading\"></span>",badge_info:"<span class=\"wpthemeMenuBadge wpthemeMenuBadgeInfo\" aria-live=\"polite\">${count}</span>",badge_warn:"<span class=\"wpthemeMenuBadge wpthemeMenuBadgeWarn\" aria-live=\"polite\">${count}</span>",badge_error:"<span class=\"wpthemeMenuBadge wpthemeMenuBadgeError\" aria-live=\"polite\">${count}</span>"},getAnchor:function(_10){
var md=(_10)?_10.metadata:null;
return (md&&(md.badgeUrl||md.badgeData))?_f.templates.anchor:"";
},injectBadge:function(_11,_12){
var _13=(_12)?_12:_11._menuitem,md=(_13)?_13.metadata:null;
if(md&&(md.badgeUrl||md.badgeData)){
var _14=_f._findNode(_11,"wpthemeMenuBadgeAnchor");
if(_14){
if(md.badgeUrl){
var _15,_16=md.badgeUrl,_17=ibmCfg.portalConfig.contentHandlerURI;
if(_16.indexOf("?")==0){
_15=_17+((_17.indexOf("?")<0)?"?":"&")+_16.substring(1);
}else{
_15=_16;
}
var tmp=i$.createDom("div");
tmp.innerHTML=_f.templates.loading;
_14.appendChild(tmp.firstChild);
i$.xhrGet({url:_15,headers:{"X-IBM-XHR":"true"},responseType:"json"}).then(function(_18){
_f._insertBadge(_18.data,md.badgeTitle,_14);
},function(_19){
while(_14.firstChild){
_14.removeChild(_14.firstChild);
}
});
}else{
_f._insertBadge(md.badgeData,md.badgeTitle,_14);
}
}
}
},_insertBadge:function(_1a,_1b,_1c){
while(_1c.firstChild){
_1c.removeChild(_1c.firstChild);
}
if(_1a&&_1a.count>0){
var tmp=i$.createDom("div");
if(_1a.level=="error"){
tmp.innerHTML=_f.templates.badge_error.replace(/\$\{count\}/g,_1a.count);
}else{
if(_1a.level=="warn"){
tmp.innerHTML=_f.templates.badge_warn.replace(/\$\{count\}/g,_1a.count);
}else{
tmp.innerHTML=_f.templates.badge_info.replace(/\$\{count\}/g,_1a.count);
}
}
if(_1b){
tmp.firstChild.setAttribute("title",_1b);
tmp.firstChild.setAttribute("aria-label",_1b);
}
_1c.appendChild(tmp.firstChild);
}
},_findNode:function(_1d,_1e){
var _1f,i,_20;
var _21=function(_22,_23){
for(i=_22.childNodes.length-1;i>=0;i--){
_20=_22.childNodes[i];
if(i$.hasClass(_20,_1e)){
_1f=_20;
continue;
}
if(_20.childNodes){
i=_21(_20,i);
}
}
return _23;
};
_21(_1d);
return _1f;
}};
i$.toPath("wptheme.contextMenu.extension.badge",_f);
})();


}catch(e){console.log("Module 'wp_simple_contextmenu_ext': ",e);}
try{(function(_1){
var _2="aria-labelledby",_3="aria-describedby",_4="aria-pressed",_5="title",_6="true",_7="false",_8="selected",_9="disabled",_a="show-text",_b="hide-text",_c="disableClick",_d="remove",_e="off-label",_f="on-label",_10="wpToolbarHighContrast",_11="http://www.ibm.com/xmlns/prod/websphere/portal/publicparams",_12="wpPageModeToggleIdContainer",_13="wpInfoModeToggle",_14="wpInfoModeToggleLink",_15="wpPageModeToggle",_16="wptoogleInput",_17="wpPageModeToggleLink",_18="wpPageIsPractitioner",_19="wpPageModeToggleIdContainer",_1a="wpToolbarToggle",_1b="ibm.portal.home.createpage",_1c="wpEditTooltip",_1d="ibm.portal.toolbar.NewPage",_1e="wps.content.root",_1f="wps.Administration",_20="ibm.portal.page.Applications",_21="hcl.portal.practitionerstudio",_22="hcl.portal.helplinks",_23="wpHelpContainerID",_24="wpHelpCenterDialogContent-root",_25="wpHelpCenterDialog",_26=[13,32,38,40],_27=[13,32],T=true,F=false,_28=i$.byId,_29=i$.hasClass,_2a=i$.addClass,_2b=i$.removeClass,_2c=i$.forEach,_2d=i$.toQuery,_2e=i$.fromPath,_2f=i$.bindDomEvt;
function _30(_31,_32){
var _33=_31||_28(_15),_34="valueoff",_35="valueon",_36=_28(_16),_37=_28(_e),_38=_28(_f),_39=document.getElementById("wpViewModeDesc").textContent,_3a=document.getElementById("wpEditModeDesc").textContent,_3b=document.getElementById(_1c);
if(_32){
if(!_29(_33,_35)){
_2b(_33,_34);
_2a(_33,_35);
_2b(_37,_a);
_2b(_38,_b);
_2a(_37,_b);
_2a(_38,_a);
_3b.innerHTML=_3a;
_3c(_33,_4,_6);
_36.setAttribute("checked",true);
}
}else{
if(_29(_33,_35)){
_2b(_33,_35);
_2a(_33,_34);
_2b(_37,_b);
_2b(_38,_a);
_2a(_37,_a);
_2a(_38,_b);
_3b.innerHTML=_39;
_3c(_33,_4,_7);
_36.removeAttribute("checked");
}
}
};
function _3d(_3e,_3f){
var _40=_3e||_28(_13),_41=_28(_14);
if(_3f){
if(!_29(_40,_8)){
_2a(_40,_8);
_3c(_41,_2,"wpInfoModeOnLabel");
_3c(_41,_3,"wpInfoModeOnDesc");
_3c(_41,_4,_6);
_3c(_40,_5,_42(_43(_28("wpInfoModeOnDesc"))));
}
}else{
if(_29(_40,_8)){
_2b(_40,_8);
_3c(_41,_2,"wpInfoModeOffLabel");
_3c(_41,_3,"wpInfoModeOffDesc");
_3c(_41,_4,_7);
_3c(_40,_5,_42(_43(_28("wpInfoModeOffDesc"))));
}
}
};
function _44(_45,e){
if(!_46(e,_27)){
return F;
}
_2a(_45,_8);
var _47=wpModules.toolbar;
if(_47.isToolbarOpened()){
_47.closeToolbar();
}else{
_47.openToolbar({"autoOpenDefaultTabs":true});
}
return T;
};
function _48(_49,_4a,e){
var _4b=_28(_16),_4c=_28(_e),_4d=_28(_f);
if(!_46(e,_27)){
return F;
}
if(!_29(_49,_9)){
var t=wpModules.toolbar,_4e=t.isEditModeActive();
if(_4e){
_2b(_4c,_a);
_2b(_4d,_b);
_2a(_4c,_b);
_2a(_4d,_a);
_4b.setAttribute("checked",true);
t.setEditModeActive(F);
}else{
_2b(_4c,_b);
_2b(_4d,_a);
_2a(_4c,_a);
_2a(_4d,_b);
_4b.removeAttribute("checked");
if(_4a&&_4f()){
var _50={"editMode":T};
if(!t.isToolbarOpened()){
_50.autoOpenDefaultTabs=true;
}
t.openToolbar(_50);
}else{
t.setEditModeActive(T);
}
}
_30(_49,!_4e);
}
return T;
};
function _51(_52,e){
if(!_46(e,_27)){
return F;
}
var t=wpModules.toolbar,_53=t.isInfoModeActive();
_3d(_52,!_53);
t.setInfoModeActive(!_53);
return T;
};
function _54(){
return _55().then(function(_56){
var _57=_56;
if(_57.length!=0&&wpModules.toolbar.isInfoModeActive()){
return T;
}else{
return F;
}
});
};
function _58(){
return _55().then(function(_59){
var _5a=_59;
if(_5a.length!=0&&!wpModules.toolbar.isInfoModeActive()){
return T;
}else{
return F;
}
});
};
function _55(){
return new Promise(function(_5b){
var _5c=ibmCfg.portalConfig.contentHandlerURI+((ibmCfg.portalConfig.contentHandlerURI.indexOf("?")<0)?"?":"&")+"uri=menu:navigationMenu";
var _5d={navID:_7f(),rootNode:_21};
if(_5d){
_5c+=(_5c.indexOf("?")==-1?"?":"&")+i$.toQuery(_5d);
}
i$.xhrGet({url:_5c,headers:{"X-IBM-XHR":"true"},responseType:"json"}).then(function(_5e){
_5b(_5e.data);
});
});
};
function _5f(){
var t=wpModules.toolbar;
t.setInfoModeActive(F);
};
function _60(){
var t=wpModules.toolbar;
t.setInfoModeActive(T);
};
function _61(_62,e){
var _63=_28(_23);
var _64=document.getElementById(_24);
var k=e.keyCode;
if(k&&k!==13&&k!==32&&k!==38&&k!==40&&k!==27){
return F;
}
_3c(_63,"style","display: none");
_64.innerHTML="";
};
function _65(_66,e,_67){
var _68=_28(_23);
var _69=document.getElementById(_24);
var _6a=document.getElementById(_25);
var k=e.keyCode;
if(k&&k!==13&&k!==32&&k!==38&&k!==40){
return F;
}
_3c(_68,"style","display: block");
_69.insertAdjacentHTML("beforeend","<iframe src=\""+_67+"\" class=\"wpHelpIFrame\" frameBorder=\"0\" tabindex=\"-1\"></iframe>");
_6a.onclick=function(e){
if(e.target==_6a){
_61(_66,e);
}
};
document.onkeyup=function(e){
if(e.keyCode===27){
_61(_66,e);
}
};
return T;
};
function _6b(_6c,e){
var _6d=F;
if(_6e()){
_6d=_6f(_6c,_1e,e);
}else{
_70(_1e);
_6d=T;
}
return _6d;
};
function _71(_72,e){
var _73=F;
if(_6e()){
_73=_6f(_72,_20,e);
}else{
_70(_20);
_73=T;
}
return _73;
};
function _74(_75,e){
var _76=F;
if(_6e()){
_76=_77(_75,_21,_22,e);
}else{
_70(_21);
_76=T;
}
return _76;
};
function _78(_79,e){
var _7a=T;
_70(_1f);
return _7a;
};
function _6e(){
var _7b=(typeof wptheme!="undefined"&&wptheme.contextMenu);
return _7b;
};
function _6f(_7c,_7d,e){
if(!_46(e,_26)){
return F;
}
var _7e={"navID":_7f(),"rootNode":_7d};
var _80=wpModules.toolbar;
if(_80&&_80.isToolbarOpened()){
_7e.contribURI="nm:oid:ibm.portal.Toolbar";
}
_81(_7c,"navigationMenu",_7e);
return T;
};
function _77(_82,_83,_84,e){
if(!_46(e,_26)){
return F;
}
var _85={"navID":_7f(),"rootNode":_83,"secondaryRootNode":_84};
var _86=wpModules.toolbar;
if(_86&&_86.isToolbarOpened()){
_85.contribURI="nm:oid:ibm.portal.Toolbar";
}
_81(_82,"navigationMenu",_85);
return T;
};
function _81(_87,_88,_89){
_2a(_87.parentNode,_8);
_3c(_87,_4,_6);
args={"node":_87.parentNode,"menuId":_88,"jsonQuery":_89,"params":{"templateId":"simpleMenuTemplate","alignment":"right","autoScroll":false},"onClose":function(){
_2b(_87.parentNode,_8);
_3c(_87,_4,_7);
}};
wptheme.contextMenu.init(args);
};
function _8a(){
return _28(_18).value;
};
function _3c(_8b,_8c,_8d){
_8b.setAttribute(_8c,_8d);
};
function _43(_8e){
return _8e.firstChild;
};
function _42(_8f){
return _8f.nodeValue;
};
function _90(_91){
var fc=_91.firstChild;
while(fc&&fc.nodeType!==1){
fc=fc.nextSibling;
}
return fc;
};
function _92(_93,_94,_95){
if(_95&&_93&&_94&&_94.length>0){
_2c(_94,function(p){
if(_93.name==p.name&&_93.nsuri==p.nsuri){
_95(p.value);
return F;
}
});
}
};
function _46(e,_96){
var k=e?e.keyCode:null;
if(k){
if(_96){
var r=_96.indexOf(k)>=0;
return r;
}else{
return F;
}
}
return T;
};
function _97(){
return wpModules.toolbar.getViewAreaWindow();
};
function _7f(){
var r=_97().ibmCfg.portalConfig.currentPageOID;
return r;
};
function _98(){
return _2e("ibmCfg.portalConfig.isCurrentPageEditable",false,_97());
};
function _4f(){
return _2e("wpModules.state.page.supportsToolbar",false,_97());
};
function _70(id){
wpModules.toolbar.loadViewArea("nm:oid:"+id);
};
function _99(_9a){
if(_9a&&_9a.pageId){
var id=_9a.pageId;
if(id&&id.value&&id.value.length>0){
_70(id.value[0]);
}
}
};
i$.addOnLoad(function(){
var _9b=i$.fromPath("wpModules.state.page",false);
if(_9b){
var _9c=_9b.getStateManager();
_9c.addListener(function(_9d){
var _9e=_9d.renderParams().getModified();
_92({"nsuri":_11,"name":"editMode"},_9e,function(_9f){
var res=(_9f&&_9f[0]=="true"),_a0=_28(_15);
if(_a0){
_30(_a0,res);
}
});
_92({"nsuri":_11,"name":"infoMode"},_9e,function(_a1){
var res=(_a1&&_a1[0]=="true"),_a2=_28(_13);
if(_a2){
_3d(_a2,res);
}
});
});
}
var _a3=wpModules.toolbar.getViewAreaWindow();
if(self===_a3){
var w=_a3.parent||_a3,_a4=w.document.getElementById(_15),_a5=_28(_19),_a6=w.document.getElementById(_1a),_a7=wpModules.toolbar.isEditModeActive(),_a8=w.document.getElementById(_1c),_a9=w.document.getElementById("wpEditModeDesc"),_aa=w.document.getElementById("wpViewModeDesc"),_ab=w.document.getElementById("wpEditModeDisable");
if(_a4){
if(_98()&&_ab){
_2b(_a4,_9);
_2b(_a4,_c);
_2b(_a5,_d);
if(_a7&&_a9){
_a8.innerHTML=_a9.textContent;
}else{
_a8.innerHTML=_aa.textContent;
}
}else{
_2a(_a4,_c);
_2a(_a4,_9);
_2a(_a5,_d);
_a8.innerHTML=_ab.innerText;
}
}
if(_a6){
if(_4f()){
_2b(_a6,_9);
}else{
_2a(_a6,_9);
}
}
}
var _ac=_28(_1b);
if(_ac){
var _ad=wpModules.toolbar;
_ac.onClose=_99;
if(_ad.isToolbarOpened()||_28(_15)){
var _ae={};
_ae.id=_1b;
_ae.key="onClose";
_2f(_ac,"click",function(e){
_ad.openToolbar({"primaryTab":"siteManagerTreeTab:context:oid:"+_7f()+":default:action:CREATE_CHILD_PAGE","onCloseDialog":_ae});
e.preventDefault?e.preventDefault():e.returnValue=F;
return F;
});
}
}
});
wpModules.a11y.highContrastMode.then(function(_af){
if(_af){
_2a(_28(_13),_10);
}
});
_1.toggleToolbar=_44;
_1.toggleEditMode=_48;
_1.toggleInfoMode=_51;
_1.openSitesMenu=_6b;
_1.openApplicationsMenu=_71;
_1.openAdministration=_78;
_1.openHelpArticle=_65;
_1.closeHelpArticle=_61;
_1.toggleInfoModeOff=_5f;
_1.toggleInfoModeOn=_60;
_1.isInfoModeActive=_54;
_1.isInfoModeInactive=_58;
_1.openPractitionersMenu=_74;
})(i$.fromPath("wpModules.theme.ActionBar",true));


}catch(e){console.log("Module 'wp_toolbar_actionbar': ",e);}
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
try{(function(){
var _1=i$.addClass,_2=i$.hasClass,_3=i$.removeClass,_4=i$.fromPath,ln=function(o){
return o.length;
},_5="edit-mode",_6="edit-mode-disabled",_7="help-mode",_8="info-mode",_9="toolbar-opened",_a="toolbar-closed",_b=_4("wpModules.state.page");
if(_b){
var _c=_b.getStateManager();
_c&&_c.getState().then(function(_d){
var _e=_d.renderParams().get({nsuri:"http://www.ibm.com/xmlns/prod/websphere/portal/publicparams",name:"pageMode"}),_f=_d.renderParams().get({nsuri:"http://www.ibm.com/xmlns/prod/websphere/portal/publicparams",name:"showTools"}),_10=document.body;
_3(_10,_5);
_3(_10,_6);
_3(_10,_8);
_3(_10,_7);
if(_e&&ln(_e)>0&&_e[0].value&&ln(_e[0].value)>0){
var _11=_e[0].value;
for(var i=0;i<ln(_11);++i){
var _12=_11[i];
if("EDIT"==_12){
if(wpModules.state.page.supportsEditMode){
_1(_10,_5);
}else{
_1(_10,_6);
}
}else{
if("INFO"==_12){
_1(_10,_8);
}else{
if("HELP"==_12){
_1(_10,_7);
}
}
}
}
}
if(_f&&ln(_f)>0&&_f[0].value&&ln(_f[0].value)>0){
var _13=_f[0].value[0];
if("true"==_13){
_1(_10,_9);
}else{
_1(_10,_a);
}
}else{
_1(_10,_a);
}
});
}
})();


}catch(e){console.log("Module 'wp_state_page_modes': ",e);}
try{(function(){
    i$.merge({
	"ICON_STOP":"msgError",
	"ICON_SUCCESS":"msgSuccess",
	"BUTTON_RETRY":"Retry",
	"BUTTON_YES":"Yes",
	"BUTTON_NO":"No",
	"BUTTON_IGNORE":"Ignore",
	"LINK_LEARN_MORE":"Learn More",
	"ICON_WARNING":"msgWarning",
	"ICON_INFORMATION":"msgInfo",
	"LOADING_IMAGE_0":"loading image",
	"BUTTON_ABORT":"Abort",
	"ICON_EXCLAMATION":"msgWarning",
	"BUTTON_CANCEL":"Cancel",
	"BUTTON_CONTINUE":"Continue",
	"BUTTON_OK":"Ok",
	"BUTTON_TRY":"Try Again",
	"LOADING_0":"Loading...",
	"ICON_ASTERISK":"msgInfo",
	"ICON_ERROR":"msgError",
	"CLOSE_IMAGE_0":"close image",
	"CLOSE_0":"Close"
},i$.fromPath("wpModules.dialog.nls",true));
})();
}catch(e){console.log("Module 'wp_dialog_main': ",e);}
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
try{(function(_1){
var _2="wpToolbarProjectMenuLink",_3="wpToolbarProjectInfoBox",_4="<edit-mode>",_5="<page-id>",_6="?uri=toolbar:projectTab:projectMenu:returnURI:dialog:CloseModalDialog@oid:"+_5+"&uri=pagemode:edit:"+_4,_7="project:oid:",_8="project:null",_9="title",_a="titleLang",_b="titleDir",_c="editMode",_d="action",_e="resultURI",_f="selectProject",_10="openDialog",_11="openToolbar",_12="closeToolbar",_13={"uri":"pagemode:edit:on"},_14={"uri":"pagemode:edit:off"},_15={"uri":"toolbar:open","params":{"primaryTabURI":"default","secondaryTabURI":"default"}},_16={"uri":"toolbar:open"},_1=_1,_17=_1.document,_18=i$.byId,_19=i$.bindDomEvt,_1a=i$.fromPath,_1b=i$.forEach,_1c=i$.toQuery,_1d=wpModules.toolbar,_1e=function(_1f,e){
var k=e.keyCode;
if(k&&k!==13&&k!==32&&k!==38&&k!==40){
return false;
}
var url=_6.replace(_5,_20()).replace(_4,(_21()?"on":"off")),_22={"url":url,"autoResize":true,"posHandler":"horizontallyBelow","autoPosition":_1f.parentNode,"modal":false,"padding":0,"callbackFn":function(_23){
_1f.focus();
if(_23){
var _24=get(_23,_d);
if(_f==_24){
_25(_23);
}else{
if(_10==_24){
_26(_23);
}else{
if(_11==_24){
_27(_23);
}
}
}
}
}};
_28(_22);
return true;
},_25=function(_29){
var uri=get(_29,_e),_2a=get(_29,_c)=="true";
if(uri){
var _2b=[],_2c=_1d.isToolbarOpened(),_2d=_2e(uri),_2f=_30(_29),_31=_32();
if(_2c&&!_2d){
if(_2f){
_1d.closeToolbar({"editMode":_2a});
}else{
_1d.setEditModeActive(_2a);
}
}else{
if(_2a!=_21()){
if(_2a){
_2b.push(_13);
if(!_2c&&_31){
_2b.push(_15);
}
}else{
_2b.push(_14);
}
}
if(_2c){
if(_2f){
_1d.closeTab();
}else{
if(_31){
if(_2a){
_2b.push(_15);
}else{
_2b.push(_16);
}
}
}
}
_2b.push(_33(uri));
var win=_34(),url=_35(_2b,win),_36=win.parent||win;
_36.location.href=url;
}
}
},_26=function(_37){
var _38=_39(_3a(_37,_e));
if(_38){
var _3b=get(_37,_9)||"Dialog",url=_3c(_38),_3d={"url":url,"title":_3b,"modal":true,"autoResize":true,"metrics":{"width":900},"padding":0,"callbackFn":function(_3e){
if(_3e&&_3e.result=="project_published"){
_1d.closeToolbar({"editMode":false});
}else{
_1d.reloadViewArea(true);
}
}};
_28(_3d);
}
},_27=function(_3f){
var uri=get(_3f,_e);
_1d.openToolbar({tab:uri});
},_28=function(_40){
var _41=new wpModules.dialog.Dialog(_40);
_41.open();
},_35=function(_42,_43){
var _44=_43?_45(_43):"",url=[_44];
_44.indexOf("?")<0?url.push("?"):url.push("&");
_1b(_42,function(_46){
var uri=_46.uri,_47=_46.params;
url.push("uri=");
url.push(uri);
url.push("&");
if(_47){
url.push(_1c(_47));
url.push("&");
}
});
var r=url.join("");
return r;
},_3c=function(_48,_49){
var _4a=_49?_45(_49):"",url=[_4a],uri=_48.uri,_4b=_48.params;
_4a.indexOf("?")<0?url.push("?"):url.push("&");
url.push("uri=");
url.push(uri);
if(_4b){
url.push("&");
url.push(_1c(_4b));
}
var r=url.join("");
return r;
},_33=function(uri,_4c){
var a={};
a.uri=uri;
if(_4c){
a.params=_4c;
}
return a;
},_39=function(_4d){
if(_4d&&_4d.length>0){
var o={};
o.uri=_4d[0];
o.params={};
for(var i=1,l=_4d.length;i<l;i+=2){
var key=_4d[i],val=_4d[i+1];
if(val){
o.params[key]=[val];
}
}
return o;
}
return null;
},get=function(obj,key){
var o=obj[key];
if(o){
var v=o.value;
if(v&&v.length>0){
var r=v[0];
return r;
}
}
return null;
},_3a=function(obj,key){
var o=obj[key];
if(o){
var r=o.value;
return r;
}
return null;
},_20=function(){
var r=_34().ibmCfg.portalConfig.currentPageOID;
return r;
},_21=function(){
var r=_1d.isEditModeActive();
return r;
},_34=function(){
var r=_1d.getViewAreaWindow();
return r;
},_32=function(){
var r=_1a("wpModules.state.page.supportsToolbar",false,_34());
return r;
},_45=function(win){
var r=_1d.getBaseURL(win);
return r;
},_2e=function(uri){
var _4e=_4f(),r=true;
if(_4e){
r=uri.substring(_7.length)!=_4e;
}else{
r=uri!=_8;
}
return r;
},_30=function(_50){
var _51=_3a(_50,_d),r=(_51&&_51.length>1&&_51[1]==_12);
return r;
},_4f=function(){
return _34().ibmCfg.portalConfig.projectUUID;
};
i$.addOnLoad(function(){
var _52=_18(_2);
if(_52){
var _53=function(e){
if(_1e(_52,e)){
e.preventDefault?e.preventDefault():e.returnValue=false;
return false;
}
};
_19(_52,"click",_53);
_19(_52,"keydown",_53);
}
});
})(window);


}catch(e){console.log("Module 'wp_toolbar_projectmenu': ",e);}
try{(function(_1,_2){
var _3="?uri=pagemode:edit:off&uri=op:ibm.portal.operations.showPreviewScreen()&returnURI=dialog:CloseModalDialog",_4={"then":function(){
}},_5=i$.fromPath,_1=_1,_6=_1.document,_7=wpModules.toolbar,_8=_2,_9=function(_a){
var _b=_3,_c=_d("preview_as_user_dialog_title")||"Preview as User",_e={"url":_b,"title":_c,"modal":true,"autoResize":true,"window":_1.parent||_1,"callbackFn":function(_f){
if(_f){
var _10=get(_f,"action");
if(_10=="ok"){
var _11=get(_f,"userID"),_12=get(_f,"path");
_13(_11,_12);
}
}
}},_14=new wpModules.dialog.Dialog(_e);
_14.open();
var r=_4;
return r;
},_13=function(_15,_16){
var url=_7.getBaseURL(_17());
url=url.replace(_16,_16+_15);
url+=url.indexOf("?")<0?"?":"&";
url+="uri=toolbar:close&uri=pagemode:edit:off";
top.location.href=url;
},_18=function(_19){
var r=_19.visibility!==false;
return r;
},_1a=function(_1b){
var r=_1c();
return r;
},_1c=function(){
var r=_5("ibmCfg.portalConfig.canAnonymousUserViewCurrentPage",false,_17());
return r;
},_17=function(){
var r=_7.getViewAreaWindow();
return r;
},_1d=function(_1e){
return {"then":function(cb){
cb(_1e);
}};
},_d=function(key){
var r=_8.nls[key];
return r;
},get=function(obj,key){
var o=obj[key],r=null;
if(o){
var v=o.value;
if(v&&v.length>0){
r=v[0];
}
}
return r;
};
_8.openPreviewAsUserDialog=_9;
_8.isPreviewAsUnauthenticatedUserVisible=_18;
_8.isPreviewAsUnauthenticatedUserEnabled=_1a;
})(window,i$.fromPath("wpModules.toolbar.menuActions",true));


}catch(e){console.log("Module 'wp_toolbar_sitepreview_menuactions': ",e);}
try{(function(_1,_2){
var _3="aria-pressed",_4="selected",_5="true",_6="false",_7=_1.document,_8=i$.addClass,_9=i$.removeClass,_a=wpModules.theme.WindowUtils,_b=_2,_c=function(_d,_e,e){
if(e){
var k=e.keyCode;
if(k&&k!==13&&k!==32&&k!==38&&k!==40){
return false;
}
}
if(typeof wptheme!="undefined"&&wptheme.contextMenu){
var _f=_10(),_11=[];
for(var i=0,l=_f.length;i<l;i++){
_11.push("nm:oid:"+_f[i]);
}
var _12={resURI:"nm:oid:"+_13(_14()),contribURI:_11},_15={"node":_d.parentNode,"menuId":_e,"jsonQuery":_12,"params":{"templateId":"simpleMenuTemplate","alignment":"right","autoScroll":false},"onClose":function(){
_16(_d);
}};
_17(_d);
wptheme.contextMenu.init(_15);
return true;
}else{
return false;
}
},_17=function(_18){
_8(_18.parentNode,_4);
_19(_18,_3,_5);
},_16=function(_1a){
_9(_1a.parentNode,_4);
_19(_1a,_3,_6);
},_19=function(_1b,_1c,_1d){
_1b.setAttribute(_1c,_1d);
},_14=function(){
var r=_a.getWindow(_a.VIEW_AREA);
return r;
},_13=function(win){
var r=win.ibmCfg.portalConfig.currentPageOID;
return r;
},_10=function(){
var r=_a.getPageIDs();
return r;
};
_b.open=_c;
})(window,i$.fromPath("wpModules.toolbar.ContextMenu",true));


}catch(e){console.log("Module 'wp_toolbar_contextmenu': ",e);}
try{(function(_1){
var _2=_1,_3=_1.document,_4=i$.addClass,_5=i$.removeClass,_6=i$.byId,_7=i$.bindDomEvt,_8="minimized",_9="utb-end-preview-btn",_a=3500,_b=500,_c=function(_d,_e){
var _f=function(){
_4(_d,_8);
};
return setTimeout(_f,_e);
},_10=function(_11,_12){
var _13=function(){
_5(_11,_8);
};
return setTimeout(_13,_12);
};
i$.addOnLoad(function(){
var _14=_6(_9);
if(_14){
var _15=_14.parentNode,_16=_c(_15,_a);
_7(_15,"mouseenter",function(){
if(_16){
clearTimeout(_16);
}
_16=_10(_15,_b);
});
_7(_15,"mouseleave",function(){
if(_16){
clearTimeout(_16);
}
_16=_c(_15,_a);
});
}
});
})(window);


}catch(e){console.log("Module 'wp_toolbar_sitepreview': ",e);}
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