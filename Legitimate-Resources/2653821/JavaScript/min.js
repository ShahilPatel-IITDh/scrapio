/*
 * Copyright (C) 2012-2016 Media.net Advertising FZ-LLC All Rights Reserved
 */
var showPop=1;function clearSearchText(t){t.value="",t.select()}function replaceString(t,e,n){return t.replace(e,n,"g")}function submitSearch(t,e,n){return n+=generateBrowLogURL("srcqry"),d=document.forms[t],0==d.elements.q.value.length||"Enter Keyword"==d.elements.q.value?(alert("Please enter a search keyword !"),d.elements.q.focus(),!1):(checkValidURLChars(d.elements.q.value)?(newstr=d.elements.q.value,newstr=getEscapedString(newstr),d.action="/display.cfm?s="+newstr+"&"+n+"&kt="+e):(newstr=d.elements.q.value,newstr=getEscapedString(newstr),d.action="/"+newstr+".cfm?"+n+"&kt="+e),"undefined"!=typeof d&&(d.target="_top"),!0)}function is_ie6(){return null==window.XMLHttpRequest&&null!=ActiveXObject&&/msie|MSIE 6/.test(navigator.userAgent)}function sendRequest(t,e){return!(showPop=0)}function changeStatus(t){return!0}function addbookmark(t){return!1}function setAsHomePage(t,e){return!1}function getDate(){var t=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"),e=new Array("January","February","March","April","May","June","July","August","September","October","November","December"),n=new Date,o=n.getYear();o<1e3&&(o+=1900);var r=n.getDay(),i=n.getMonth(),n=n.getDate();n<10&&(n="0"+n);o=t[r]+", "+e[i]+" "+n+", "+o;document.write(o)}function checkUTFChar(t){for(var e=!0,n=0;n<128;++n){var o=n.toString(16);if(1==o.length&&(o="0"+o),o="%"+o,(o=unescape(o))==t){e=!1;break}}return e}function checkValidURLChars(t){var e,n;if(""==t)return!1;if(t.match(/[#&]/))return!0;for(n=t.length,intCur=0;intCur<n&&(chrValue=t.charAt(intCur),1!=(e=checkUTFChar(chrValue)));intCur++);return e}function getEscapedString(t){var e,n="";if(""==t)return t;for(e=t.length,intCur=0;intCur<e;intCur++)chrValue=t.charAt(intCur),1==checkUTFChar(chrValue)?n+=chrValue:(" "==chrValue&&(chrValue="_"),n+=escape(chrValue));return n}function relplaceAllALinks(t){try{for(links=window.document.getElementsByTagName("A"),links_len=links.length,i=0;i<links_len;i++)links[i].href.match(t)&&(tempData=links[i].innerHTML,modifyKeywordClickURL(links[i],"olod"),links[i].innerHTML=tempData)}catch(t){}}function modifyKeywordClickURL(t,e){return t.href=t.href+generateBrowLogURL(e),"undefined"!=typeof prctu&&0<prctu.length&&(t.href=prctu+getEscapedString(t.href)),!0}function generateBrowLogURL(t){var e="";try{void 0!==br_data&&br_data||(br_data=new brdata),e="kwclk"==t?escape(br_data.getMousePositionData()):"adclk"==t||"srcqry"==t?"&bd="+escape(br_data.getSearchBoxRelatedData()):"&bd="+escape(br_data.getURLBrowserData())}catch(t){}return e}var brdata=function(){this.fd="#",this.cookieSupport=-1,this.isinframe=-1,this.browserdata="",this.getABPStatus=function(){return void 0!==window.abp&&window.abp?1:0},this.getLocalTimeZone=function(){return(new Date).getTimezoneOffset()/60*-1},this.getScreenHeight=function(){return screen.height},this.getScreenWidth=function(){return screen.width},this.calledInExternalFrame=function(){return"n"},this.isCookieSupported=function(){var t;return-1==this.cookieSupport&&(t=navigator.cookieEnabled||!1,void 0!==navigator.cookieEnabled||t||(document.cookie="iscookieenabled",t=-1!=document.cookie.indexOf("iscookieenabled"))),this.cookieSupport},this.getURLBrowserData=function(){return""==this.browserdata&&(this.browserdata=this.getLocalTimeZone().toString()+this.fd+this.getScreenHeight()+this.fd+this.getScreenWidth()+this.fd+(this.isCookieSupported()?1:0).toString()+this.fd+this.getABPStatus()),this.browserdata},this.getMousePositionData=function(){return this.fd+mX+this.fd+mY},this.getSearchBoxRelatedData=function(){return this.getURLBrowserData()+this.getMousePositionData()}};function confirmToOptOut(){var t;optOut=confirm("You will not be able to see any ads or websearches."),optOut&&((t=new Date).setTime(t.getTime()+31536e6),t="; expires="+t.toGMTString(),document.cookie="dnsoptout=1"+t+"; path=/",window.location.reload())}var mX=0,mY=0,br_data=!1;function mPos(t){try{mX=window.Event?t.pageX:event.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft),mY=window.Event?t.pageY:event.clientY+(document.documentElement.scrollTop||document.body.scrollTop)}catch(t){}return!0}document.onmousemove=mPos;var _skPU={_Top:null,_wh:function(){var e=0;try{"number"==typeof this._Top.window.innerHeight?e=this._Top.window.innerHeight:this._Top.document.documentElement&&this._Top.document.documentElement.clientHeight?e=this._Top.document.documentElement.clientHeight:this._Top.document.body&&this._Top.document.body.clientHeight&&(e=this._Top.document.body.clientHeight)}catch(t){e=0}return e},_ww:function(){var e=0;try{"number"==typeof this._Top.window.innerWidth?e=this._Top.window.innerWidth:this._Top.document.documentElement&&this._Top.document.documentElement.clientWidth?e=this._Top.document.documentElement.clientWidth:this._Top.document.body&&this._Top.document.body.clientWidth&&(e=this._Top.document.body.clientWidth)}catch(t){e=0}return e},_wt:function(){return this._Top?null!=this._Top.window.screenTop?this._Top.window.screenTop:this._Top.window.screenY:0},_wl:function(){return this._Top?null!=this._Top.window.screenLeft?this._Top.window.screenLeft:this._Top.window.screenX:0},doPU:function(url,pw,ph,npf,dr){if(!this._Top&&(this._Top=self,top!=self))try{top.document.location.toString()&&(this._Top=top)}catch(e){}var _npSU=dr?url:"about:blank",_npID="pu_"+Math.floor(89999999*Math.random()+1e7),pxLeft=0,pxTop=0;-1==pw&&(pw=this._ww()),-1==ph&&(ph=this._wh()),pxLeft=this._wl()+this._ww()/2-pw/2,pxTop=this._wt()+this._wh()/2-ph/2,npf=npf||"toolbar=0,scrollbars=1,location=1,statusbar=0,menubar=0,resizable=1";var _npW=this._Top.window.open(_npSU,_npID,npf+",top="+pxTop+",left="+pxLeft+",width="+pw+",height="+ph);return _npW&&(_npW.blur(),-1<navigator.userAgent.toLowerCase().indexOf("applewebkit")&&(this._Top.window.blur(),this._Top.window.focus()),_npW.Init=function(e){with(e)Params=e.Params,Main=function(){void 0===window.mozPaintCount||(t=window.open("about:blank"))&&t.close();var t=Params.dUrl;try{navigator.userAgent.toLowerCase().indexOf("msie")<1&&opener.window.focus()}catch(t){}dr||(window.location=t)},Main()},_npW.Params={dUrl:url},_npW.Init(_npW)),_npW}};function renderFACP(t){if("ex"==t)return!1;if(1!=showPop||"undefined"==typeof __pp||void 0===__pp.FACP||0!=__pp.FACP.pd)return!1;try{if(t||((t=window.event||window.Event).cancelBubble=!0),t.button&&2==t.button)return!1;if(void 0!==__pp.FACP.u&&0<__pp.FACP.u.length)return __pp.FACP.pd=!0,__pp.FACP.u=__pp.FACP.u+generateBrowLogURL("adclk"),_skPU.doPU(__pp.FACP.u,__pp.FACP.w,__pp.FACP.h,__pp.FACP.p,"ex"==t),!(showPop=0)}catch(t){return!(__pp.FACP.pd=!0)}}function atevt(){document.addEventListener?document.addEventListener("click",ppctrl,!1):document.attachEvent?document.attachEvent("onclick",ppctrl):document.onclick=ppctrl}function ppctrl(t){try{var e=(t=t||(window.event||window.Event)).srcElement||t.target;if(e.tagName&&"INPUT"==e.tagName)return e.attributes.type&&"text"!=e.attributes.type.value&&void 0!==showPop&&(showPop=0),!1;1!=showPop||renderFACP(t)||shpp(t)}catch(t){}}function shpp(t){if("undefined"!=typeof __pp&&1==showPop&&!renderFACP(t))try{if(t||((t=window.event||window.Event).cancelBubble=!0),t.button&&2==t.button)return;try{var e=!1;isIE()&&(e=shdsp(t)),e||"ld"==t||(void 0!==__pp.kp&&void 0!==__pp.kp.u&&__pp.kp.u&&0<__pp.kp.u.length&&0==__pp.kp.pd&&(__pp.kp.pd=!0,"ex"==t&&(__pp.kp.u=__pp.kp.u+"&_onx_=1"),_skPU.doPU(__pp.kp.u,__pp.kp.w,__pp.kp.h,__pp.kp.p,"ex"==t)),shldp("ld"))}catch(t){}("ex"==t?shmsc:"ld"==t?shldp:shdsp)(t)}catch(t){}}function shmsc(t){if("undefined"!=typeof __pp)try{if(void 0!==__pp.ms&&void 0!==__pp.ms.u&&__pp.ms.u)for(var e=__pp.ms.u.length,n=0;n<e;n++)__pp.ms.u[n]&&_skPU.doPU(__pp.ms.u[n],-1,-1,__pp.ms.p,!0)}catch(t){}}function shdsp(t){try{return void 0!==__pp.dp&&void 0!==__pp.dp.u&&__pp.dp.u&&0<__pp.dp.u.length&&0==__pp.dp.pd?(__pp.dp.pd=!0,_skPU.doPU(__pp.dp.u,__pp.dp.w,__pp.dp.h,__pp.dp.p,"ex"==t),!0):!1}catch(t){return!1}}function shldp(t){try{return void 0!==__pp.ld&&void 0!==__pp.ld.u&&__pp.ld.u&&0<__pp.ld.u.length&&0==__pp.ld.pd?(__pp.ld.pd=!0,_skPU.doPU(__pp.ld.u,__pp.ld.w,__pp.ld.h,__pp.ld.p,"ld"==t),!0):!1}catch(t){return!1}}function isIE(){var t=!1;try{t=/msie|MSIE/.test(navigator.userAgent)}catch(t){}return t}function setBrowserDetails(){relplaceAllALinks&&relplaceAllALinks(/(\/trf|\.cfm)\?/)}