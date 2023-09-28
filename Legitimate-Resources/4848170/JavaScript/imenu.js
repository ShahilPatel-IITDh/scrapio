
var userAgent=navigator.userAgent.toLowerCase();var is_opera=(userAgent.indexOf('opera')!=-1);var is_saf=((userAgent.indexOf('applewebkit')!=-1)||(navigator.vendor=='Apple Computer, Inc.'));var is_webtv=(userAgent.indexOf('webtv')!=-1);var is_ie=((userAgent.indexOf('msie')!=-1)&&(!is_opera)&&(!is_saf)&&(!is_webtv));var is_ie4=((is_ie)&&(userAgent.indexOf('msie 4.')!=-1));var is_moz=((navigator.product=='Gecko')&&(!is_saf));var is_kon=(userAgent.indexOf('konqueror')!=-1);var is_ns=((userAgent.indexOf('compatible')==-1)&&(userAgent.indexOf('mozilla')!=-1)&&(!is_opera)&&(!is_webtv)&&(!is_saf));var is_ns4=((is_ns)&&(parseInt(navigator.appVersion)==4));var is_mac=(userAgent.indexOf('mac')!=-1);var pointer_cursor=(is_ie?'hand':'pointer');function array_pop(a)
{if(typeof a!='object'||!a.length)
{return null;}
else
{var response=a[a.length-1];a.length--;return response;}}
function array_push(a,value)
{a[a.length]=value;return a.length;}
function fetch_object(idname)
{if(document.getElementById)
{return document.getElementById(idname);}
else if(document.all)
{return document.all[idname];}
else if(document.layers)
{return document.layers[idname];}
else
{return null;}}
function fetch_tags(parentobj,tag)
{if(typeof parentobj.getElementsByTagName!='undefined')
{return parentobj.getElementsByTagName(tag);}
else if(parentobj.all&&parentobj.all.tags)
{return parentobj.all.tags(tag);}
else
{return null;}}
function do_an_e(eventobj)
{if(!eventobj||is_ie)
{window.event.returnValue=false;window.event.cancelBubble=true;return window.event;}
else
{eventobj.stopPropagation();eventobj.preventDefault();return eventobj;}}
function e_by_gum(eventobj)
{if(!eventobj||is_ie)
{window.event.cancelBubble=true;return window.event;}
else
{if(eventobj.target.type=='submit')
{eventobj.target.form.submit();}
eventobj.stopPropagation();return eventobj;}}
function iM_Popup_Handler()
{this.open_steps=10;this.open_fade=false;this.active=false;this.menus=new Array();this.activemenu=null;this.hidden_selects=new Array();}
iM_Popup_Handler.prototype.activate=function(active)
{this.active=active;}
iM_Popup_Handler.prototype.register=function(controlkey,noimage)
{this.menus[controlkey]=new iM_Popup_Menu(controlkey,noimage);return this.menus[controlkey];}
iM_Popup_Handler.prototype.hide=function()
{if(this.activemenu!=null)
{this.menus[this.activemenu].hide();}}
iMenu=new iM_Popup_Handler();function imenu_hide(e)
{if(e&&e.button&&e.button!=1&&e.type=='click')
{return true;}
else
{iMenu.hide();}}
function iM_Popup_Menu(controlkey,noimage)
{this.controlkey=controlkey;this.menuname=this.controlkey.split('.')[0]+'_menu';this.init_control(noimage);if(fetch_object(this.menuname))
{this.init_menu();}
this.slide_open=(is_opera?false:true);this.open_steps=iMenu.open_steps;}
iM_Popup_Menu.prototype.init_control=function(noimage)
{this.controlobj=fetch_object(this.controlkey);this.controlobj.state=false;this.controlobj.unselectable=true;this.controlobj.onclick=iM_Popup_Events.prototype.controlobj_onclick;this.controlobj.onmouseover=iM_Popup_Events.prototype.controlobj_onmouseover;}
iM_Popup_Menu.prototype.init_menu=function()
{this.menuobj=fetch_object(this.menuname);if(this.menuobj&&!this.menuobj.initialized)
{this.menuobj.initialized=true;this.menuobj.onclick=e_by_gum;this.menuobj.style.position='absolute';this.menuobj.style.zIndex=50;if(is_ie&&!is_mac)
{this.menuobj.style.filter+="progid:DXImageTransform.Microsoft.alpha(enabled=1,opacity=100)";this.menuobj.style.filter+="progid:DXImageTransform.Microsoft.shadow(direction=135,color=#8E8E8E,strength=3)";}
this.init_menu_contents();}}
iM_Popup_Menu.prototype.init_menu_contents=function()
{var tds=fetch_tags(this.menuobj,'td');for(var i=0;i<tds.length;i++)
{if(tds[i].className=='imenu_option')
{if(tds[i].title&&tds[i].title=='nohilite')
{tds[i].title='';}
else
{tds[i].controlkey=this.controlkey;tds[i].onmouseover=iM_Popup_Events.prototype.menuoption_onmouseover;tds[i].onmouseout=iM_Popup_Events.prototype.menuoption_onmouseout;if(typeof tds[i].onclick=='function')
{tds[i].ofunc=tds[i].onclick;tds[i].onclick=iM_Popup_Events.prototype.menuoption_onclick_function;}
else
{tds[i].onclick=iM_Popup_Events.prototype.menuoption_onclick_link;}
if(!is_saf&&!is_kon)
{try
{links=fetch_tags(tds[i],'a');for(var j=0;j<links.length;j++)
{if(typeof links[j].onclick=='undefined')
{links[j].onclick=e_by_gum;}}}
catch(e)
{}}}}}}
iM_Popup_Menu.prototype.show=function(obj,instant)
{if(!iMenu.active)
{return false;}
else if(!this.menuobj)
{this.init_menu();}
if(!this.menuobj)
{return false;}
if(iMenu.activemenu!=null)
{iMenu.menus[iMenu.activemenu].hide();}
iMenu.activemenu=this.controlkey;this.menuobj.style.display='';if(iMenu.slide_open)
{this.menuobj.style.clip='rect(auto, auto, auto, auto)';}
this.pos=this.fetch_offset(obj);this.leftpx=this.pos['left'];this.toppx=this.pos['top']+obj.offsetHeight;if((this.leftpx+this.menuobj.offsetWidth)>=document.body.clientWidth)
{this.leftpx=this.leftpx+obj.offsetWidth-this.menuobj.offsetWidth;this.direction='right';}
else
{this.direction='left'}
this.menuobj.style.left=this.leftpx+'px';this.menuobj.style.top=this.toppx+'px';if(!instant&&this.slide_open)
{this.intervalX=Math.ceil(this.menuobj.offsetWidth/this.open_steps);this.intervalY=Math.ceil(this.menuobj.offsetHeight/this.open_steps);this.slide((this.direction=='left'?0:this.menuobj.offsetWidth),0,0);}
else if(this.menuobj.style.clip&&iMenu.slide_open)
{this.menuobj.style.clip='rect(auto, auto, auto, auto)';}
this.handle_overlaps(true);}
iM_Popup_Menu.prototype.hide=function(e)
{if(e&&e.button&&e.button!=1)
{return true;}
this.stop_slide();this.menuobj.style.display='none';this.handle_overlaps(false);iMenu.activemenu=null;}
iM_Popup_Menu.prototype.hover=function(obj)
{if(iMenu.activemenu!=null)
{if(iMenu.menus[iMenu.activemenu].controlkey!=this.id)
{this.show(obj,true);}}}
iM_Popup_Menu.prototype.choose=function(e,obj)
{var links=fetch_tags(obj,'a');if(links[0])
{if(is_ie)
{links[0].click();window.event.cancelBubble=true;}
else
{if(e.shiftKey)
{window.open(links[0].href);e.stopPropagation();e.preventDefault();}
else
{window.location=links[0].href;e.stopPropagation();e.preventDefault();}}
this.hide();}}
iM_Popup_Menu.prototype.slide=function(clipX,clipY,opacity)
{if(this.direction=='left'&&(clipX<this.menuobj.offsetWidth||clipY<this.menuobj.offsetHeight))
{if(iMenu.open_fade&&is_ie)
{opacity+=10;this.menuobj.filters.item('DXImageTransform.Microsoft.alpha').opacity=opacity;}
clipX+=this.intervalX;clipY+=this.intervalY;this.menuobj.style.clip="rect(auto, "+clipX+"px, "+clipY+"px, auto)";this.slidetimer=setTimeout("iMenu.menus[iMenu.activemenu].slide("+clipX+", "+clipY+", "+opacity+");",0);}
else if(this.direction=='right'&&(clipX>0||clipY<this.menuobj.offsetHeight))
{if(iMenu.open_fade&&is_ie)
{opacity+=10;menuobj.filters.item('DXImageTransform.Microsoft.alpha').opacity=opacity;}
clipX-=this.intervalX;clipY+=this.intervalY;this.menuobj.style.clip="rect(auto, "+this.menuobj.offsetWidth+"px, "+clipY+"px, "+clipX+"px)";this.slidetimer=setTimeout("iMenu.menus[iMenu.activemenu].slide("+clipX+", "+clipY+", "+opacity+");",0);}
else
{this.stop_slide();}}
iM_Popup_Menu.prototype.stop_slide=function()
{clearTimeout(this.slidetimer);this.menuobj.style.clip='rect(auto, auto, auto, auto)';if(iMenu.open_fade&&is_ie)
{this.menuobj.filters.item('DXImageTransform.Microsoft.alpha').opacity=100;}}
iM_Popup_Menu.prototype.fetch_offset=function(obj)
{var left_offset=obj.offsetLeft;var top_offset=obj.offsetTop;while((obj=obj.offsetParent)!=null)
{left_offset+=obj.offsetLeft;top_offset+=obj.offsetTop;}
return{'left':left_offset,'top':top_offset};}
iM_Popup_Menu.prototype.overlaps=function(obj,m)
{var s=new Array();var pos=this.fetch_offset(obj);s['L']=pos['left'];s['T']=pos['top'];s['R']=s['L']+obj.offsetWidth;s['B']=s['T']+obj.offsetHeight;if(s['L']>m['R']||s['R']<m['L']||s['T']>m['B']||s['B']<m['T'])
{return false;}
return true;}
iM_Popup_Menu.prototype.handle_overlaps=function(dohide)
{if(is_ie)
{var selects=fetch_tags(document,'select');if(dohide)
{var menuarea=new Array();menuarea={'L':this.leftpx,'R':this.leftpx+this.menuobj.offsetWidth,'T':this.toppx,'B':this.toppx+this.menuobj.offsetHeight};for(var i=0;i<selects.length;i++)
{if(this.overlaps(selects[i],menuarea))
{var hide=true;var s=selects[i];while(s=s.parentNode)
{if(s.className=='imenu_popup')
{hide=false;break;}}
if(hide)
{selects[i].style.visibility='hidden';array_push(iMenu.hidden_selects,i);}}}}
else
{while(true)
{var i=array_pop(iMenu.hidden_selects);if(typeof i=='undefined'||i==null)
{break;}
else
{selects[i].style.visibility='visible';}}}}}
function iM_Popup_Events()
{}
iM_Popup_Events.prototype.controlobj_onclick=function(e)
{do_an_e(e);if(iMenu.activemenu==null||iMenu.menus[iMenu.activemenu].controlkey!=this.id)
{iMenu.menus[this.id].show(this);}
else
{iMenu.menus[this.id].hide();}};iM_Popup_Events.prototype.controlobj_onmouseover=function(e)
{do_an_e(e);iMenu.menus[this.id].hover(this);};iM_Popup_Events.prototype.menuoption_onclick_function=function(e)
{this.ofunc(e);};iM_Popup_Events.prototype.menuoption_onclick_link=function(e)
{iMenu.menus[this.controlkey].choose(e,this);};iM_Popup_Events.prototype.menuoption_onmouseover=function(e)
{this.className='imenu_hilite';};iM_Popup_Events.prototype.menuoption_onmouseout=function(e)
{this.className='imenu_option';};function iMenu_init()
{if(typeof iMenu=='object')
{if(window.attachEvent&&!is_saf)
{document.attachEvent('onclick',imenu_hide);window.attachEvent('onresize',imenu_hide);}
else if(document.addEventListener&&!is_saf)
{document.addEventListener('click',imenu_hide,false);window.addEventListener('resize',imenu_hide,false);}
else
{window.onclick=imenu_hide;window.onresize=imenu_hide;}
iMenu.activate(true);}
return true;}
function toggle_option(td)
{try
{var input=td.getElementsByTagName("INPUT")[0];if(input&&input.type=="checkbox"&&!input.disabled)
{var on=input.value=="On"?true:false;if(on!=input.checked)
{input.value=on?"Off":"On";}
else
{input.checked=!input.checked;input.value=on?"Off":"On";}}}catch(e){}}

function toggleblocks (postid) {
var whichpost = document.getElementById(postid);
if (whichpost.className=="expandblock") {
whichpost.className="collapseblock";
}
else {
whichpost.className="expandblock";
}
}