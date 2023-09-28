!function(){"use strict";window.SS=window.SS||{};var l=function(e,o){return e};try{var t=new Gettext({domain:"sstranslate"});l=function(e,o){return o?e:t.gettext(e)}}catch(e){}SS._=l,SS.initTooltips=function(){SS.emptyFieldRegex="^(?=.*\\S).+$",SS.firstLastNameRegex="(^((\\w|\\W){0,50})((\\s)((\\w|\\W){1,50}){0,1}){0,1}$)",SS.passValidatorsRegex=[{regex:{pattern:"(.+){8,}",flag:"g",containPattern:!0},message:l("Password must be at least 8 characters long.")},{regex:{pattern:"[a-zA-Z]",flag:"g",containPattern:!0},message:l("Please include at least one letter.")},{regex:{pattern:"[0-9]",flag:"g",containPattern:!0},message:l("Please include at least one number.")},{regex:{pattern:"(.)\\1{2,}",flag:"g",containPattern:!1},message:l("Please do not repeat characters more than twice.")}],SS.emailInvalidCharsRegex="^[@\\-_+.&0-9a-zA-Z]+$",SS.emailValidationRegex="^([0-9a-zA-Z]+[-_+.&0-9a-zA-Z]*)?[-_+0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$",SS.fieldTest=function(e,o,t,n){return!!new RegExp(o,"i").test(e.val())||(null!=n&&n(e,t),!1)},SS.validateNameAndEmail=function(e,o,t,n,i){var a=[];if(null!==e){e.val(e.val().trim());var r=SS.fieldTest(e,SS.emptyFieldRegex,l("Name is required.",i),t);r=r&&SS.fieldTest(e,SS.firstLastNameRegex,l("Name is required.",i),t),a.push(r)}return n||o.val(o.val().trim()),a.push(SS.fieldTest(o,SS.emptyFieldRegex,l("Email is required.",i),t)),!0===a[a.length-1]&&(a.push(SS.fieldTest(o,SS.emailInvalidCharsRegex,l("Email must not contain special characters.",i),t)),!0===a[a.length-1]&&a.push(SS.fieldTest(o,SS.emailValidationRegex,l("Please enter a valid Email.",i),t))),!(-1<a.indexOf(!1))},SS.leftTooltipPositionL={my:"right, top",at:"left-12 top+5",collision:"none"},SS.leftTooltipPositionS={my:"right, top",at:"left-12 top-4",collision:"none"},SS.bottomTooltipPosition={my:"left, top",at:"left+8 bottom+10",collision:"none"},SS.pwdCorrectFormat=!1,SS.popUpErrorText=[],SS.currPwdToolTip={},SS.currCustomToolTip={},SS.variableTooltip=function(){return 1180<=$(window).width()?{position:SS.leftTooltipPositionL,tooltipClass:"left"}:{position:SS.bottomTooltipPosition,tooltipClass:"bottom"}},SS.bottomTooltip=function(){return{position:SS.bottomTooltipPosition,tooltipClass:"bottomShort"}},SS.addErrorToPwdPopup=function(e){SS.pwdCorrectFormat=!1,SS.popUpErrorText.push("<li>"+e+"</li>")},SS.setSuccessInPwdPopup=function(){SS.pwdCorrectFormat=!0,SS.popUpErrorText.push('<li class="green">&nbsp;&nbsp;'+l("Password requirements met.")+"</li>")},SS.showPwdToolTip=function(e,o){e.attr("title",""),SS.currPwdToolTip["#"+e[0].id].tooltip("option","content","<ul>"+o.join("")+"</ul>"),SS.currPwdToolTip["#"+e[0].id].tooltip("open")},SS.hidePwdPopupError=function(e){SS.currPwdToolTip["#"+e[0].id].tooltip("option","content",""),SS.currPwdToolTip["#"+e[0].id].tooltip("close"),e.removeAttr("title")},SS.showCustomToolTip=function(e,o){e.attr("title",""),SS.currCustomToolTip["#"+e[0].id].tooltip("option","content","<ul><li>"+o+"</li></ul>"),SS.currCustomToolTip["#"+e[0].id].tooltip("open")},SS.showCustomToolTipNoDot=function(e,o){e.attr("title",""),SS.currCustomToolTip["#"+e[0].id].tooltip("option","content",'<ul class="empty"><li class="empty">'+o+"</li></ul>"),SS.currCustomToolTip["#"+e[0].id].tooltip("open")},SS.hideCustomPopupError=function(e){SS.currCustomToolTip["#"+e[0].id].tooltip("option","content",""),SS.currCustomToolTip["#"+e[0].id].tooltip("close"),e.removeAttr("title")},SS.pwdTestResults=function(e){return 0<SS.popUpErrorText.length?(SS.showPwdToolTip(e,SS.popUpErrorText),!1):(!1===SS.pwdCorrectFormat&&(SS.setSuccessInPwdPopup(),SS.showPwdToolTip(e,SS.popUpErrorText),setTimeout(function(){SS.hidePwdPopupError(e)},3e3)),!0)},SS.testPassword=function(e,o){SS.popUpErrorText=[],o&&o(e);for(var t=0;t<SS.passValidatorsRegex.length;t++){new RegExp(SS.passValidatorsRegex[t].regex.pattern,SS.passValidatorsRegex[t].regex.flag).test(e.val())!==SS.passValidatorsRegex[t].regex.containPattern&&SS.addErrorToPwdPopup(SS.passValidatorsRegex[t].message)}},SS.testPattern=function(t){var n=!1;return $.ajax({url:"/testpwst.php",type:"POST",data:{ps:t.val()},datatype:"json",async:!1,success:function(e){if(0!==e.common_pass){var o=l("Please do not use common words.");-1===SS.popUpErrorText.indexOf("<li>"+o+"</li>")&&SS.addErrorToPwdPopup(o)}n=SS.pwdTestResults(t)},error:function(){var e=l("Unable to check password strength.");SS.addErrorToPwdPopup(e),n=!1}}),n},SS.typingTimer,SS.finishedTypingInterval=800,SS.pwdStatus=!1,SS.testPasswordOnTyping=function(e,o,t){return SS.pwdStatus=!1,SS.testPassword(e,o),8<=e.val().length?t?SS.pwdStatus=SS.testPattern(e):(clearTimeout(SS.typingTimer),e.val()&&(SS.typingTimer=setTimeout(function(){SS.pwdStatus=SS.testPattern(e)},SS.finishedTypingInterval))):SS.pwdStatus=SS.pwdTestResults(e),SS.pwdStatus},SS.isIE=function(){return!(!document.documentMode&&!/Edge/.test(navigator.userAgent))},SS.capsLockEnabled=null,SS.verifyCapsLock=function(e,n){if(!SS.isIE()&&n[0]){e.attr("capslockerrctl",n[0].id),e.keyup(function(e){o(e)}),e.focus(function(e){o(e)}),$(window).blur(function(){SS.capsLockEnabled=null});var i="",a="",r="",s="";document.onkeydown=function(e){20==(e=e||event).keyCode&&null!==SS.capsLockEnabled&&(SS.capsLockEnabled=!SS.capsLockEnabled)},document.onkeypress=function(e){e=e||event;var o,t=null==(o=e).which?String.fromCharCode(o.keyCode):0!=o.which&&0!=o.charCode?String.fromCharCode(o.which):null;t&&t.toLowerCase()!=t.toUpperCase()&&(SS.capsLockEnabled=t.toLowerCase()==t&&e.shiftKey||t.toUpperCase()==t&&!e.shiftKey)}}function o(e){var o,t;n=$("#"+e.target.getAttribute("capslockerrctl")),SS.capsLockEnabled?((t=n)[0]&&(""===i&&(i=t[0].style.textTransform||t.css("text-transform")),""===a&&(a=t[0].style.display||t.css("display")),""===r&&(r=t[0].style.visibility||t.css("visibility")),""===s&&(s=t.html()||"empty")),function(e){if(e[0]){e.attr("capslockwarning","true"),e[0].style.visibility="visible",e[0].style.display="block",e[0].style.textTransform="none";var o="<div id='capsLockWarningDiv'><span><img src='"+window.location.protocol+"//"+window.location.host+"/public/image/icon_caps_on.png'></img>"+l("CAPS LOCK is on!")+"</span></div>";e.html(o)}}(n)):(o=n)[0]&&(o.removeAttr("capslockwarning"),o[0].style.textTransform=i,o[0].style.display=a,o[0].style.visibility=r,o.html("empty"===s?"":s))}}},SS.initTooltips(),SS.DOWNLOAD_URL_MAC="/downloads/InstallSugarSync.dmg",SS.DOWNLOAD_URL_WIN="/downloads/SugarSyncSetup.exe",SS.getQueryVariable=function(e){for(var o=window.location.search.substring(1).split("&"),t=0,n=o.length;t<n;t++){var i=o[t].split("=");if(i[0]===e)return unescape(i[1])}return null},SS.getPlatformInfo=function(){var e="Unknown OS";return-1!=navigator.appVersion.indexOf("Win")&&(e="Win"),-1!=navigator.appVersion.indexOf("Mac")&&(e="Mac"),e},SS.getUrlForMobile=function(){var e=navigator.userAgent.toLowerCase(),o="";return-1!=e.indexOf("ipad")||-1!=e.indexOf("iphone")?o="http://phobos.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=288491637&mt=8":-1!=e.indexOf("android")&&(o="https://market.android.com/details?id=com.sharpcast.sugarsync"),o},SS.prepareDownloadButton=function(e){if(e){var o=SS.getUrlForMobile();""===o&&(o="/downloads/download-help.html?binary=",o+="Mac"==SS.getPlatformInfo()?"mac":"win"),e.attr("href",o)}},SS.getBrowserInfo=function(){var e,o,t="Unknown",n=navigator.userAgent,i=(navigator.appName,""+parseFloat(navigator.appVersion)),a=parseInt(navigator.appVersion,10);return-1!=(e=n.indexOf("Opera"))?(t="Opera",i=n.substring(e+6),-1!=(e=n.indexOf("Version"))&&(i=n.substring(e+8))):-1!=(e=n.indexOf("MSIE"))?t="IE"+(i=n.substring(e+5)):-1!=(e=n.indexOf("Chrome"))?(i=n.substring(e+7),t="Chrome"):-1!=(e=n.indexOf("Safari"))?(t="Safari",i=n.substring(e+7),-1!=(e=n.indexOf("Version"))&&(i=n.substring(e+8))):-1!=(e=n.indexOf("Firefox"))&&(t="Firefox",i=n.substring(e+8)),-1!=(o=i.indexOf(";"))&&(i=i.substring(0,o)),-1!=(o=i.indexOf(" "))&&(i=i.substring(0,o)),a=parseInt(""+i,10),isNaN(a)&&(i=""+parseFloat(navigator.appVersion),a=parseInt(navigator.appVersion,10)),t},SS.reloadDownloadHelp=function(){setTimeout(function(){window.location.href="/downloads/download-help.html"},500)},SS.isMobile=function(){return/iphone|ipod|ipad|android|blackberry|fennec/.test(navigator.userAgent.toLowerCase())},SS.isViewedOnMobile=SS.isMobile,SS.getHostName=function(e){var o=e.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);return null!=o&&2<o.length&&"string"==typeof o[2]&&0<o[2].length?o[2]:null},SS.createCookie=function(e,o,t,n){var i;if(t){var a=new Date;a.setTime(a.getTime()+24*t*60*60*1e3),i="; expires="+a.toGMTString()}else i="";var r=SS.getHostName(window.location.href),s=!0===n?"":"domain=."+r;document.cookie=escape(e)+"="+escape(o)+i+";"+s+";path=/; secure;"},SS.readCookie=function(e){for(var o=escape(e)+"=",t=document.cookie.split(";"),n=0;n<t.length;n++){for(var i=t[n];" "===i.charAt(0);)i=i.substring(1,i.length);if(0===i.indexOf(o))return unescape(i.substring(o.length,i.length))}return null},SS.eraseCookie=function(e){var o=new Date;o.setTime(o.getTime()+-864e5);var t="; expires="+o.toGMTString();document.cookie=e+"="+t+"; path=/"},SS.isIE=function(){var e=window.navigator.userAgent;return 0<=e.indexOf("Edge/")||0<=e.indexOf("Trident/")||0<=e.indexOf("MSIE ")};var a=10,r=500;SS.logPixelFire=function(e,o,t){if(e){var n=$("[id*="+e+"]")[0];if(n)t.push('PixelFireURL="',n.src,'";');else{if(0<a--)return void setTimeout(function(){SS.logPixelFire(e,o,t)},r);if(5e3!=r)return r=5e3,a=60,void setTimeout(function(){SS.logPixelFire(e,o,t)},r);t.push("No response received from Fire() in the last 5 minutes. Could not fire pixel.")}}var i=new XMLHttpRequest;i.open("GET",window.location.protocol+"//"+window.location.host+"/sstracking?userId="+o+"&record="+encodeURIComponent(t.join("")),!0),i.setRequestHeader("Content-type","application/json"),i.send(),t=[]};var o=["/","/es/","/de/","/fr/","/jp/","/14-days","/90-days","/free-for-30-days","/30-days-free","/1TB","/free-trial","/offer/"],e=o.concat(["/features","/business","/fb"]),n=-1<window.location.pathname.indexOf("/offer/")?"/offer/":window.location.pathname;-1<n.indexOf("/business")&&(n="/business"),-1<n.indexOf("/features")&&(n="/features");function i(){-1<e.indexOf(n)&&(40<$(window).scrollTop()&&972<$(window).width()?$("#top-nav.header2 .header-bottom, #ss-logo, a.menuTitle").removeClass("no-scroll").addClass("scrolled"):$("#top-nav.header2 .header-bottom, #ss-logo, a.menuTitle").removeClass("scrolled").addClass("no-scroll")),SS.readCookie("fb_land")&&("/"===document.location.pathname||-1<document.location.pathname.indexOf("/fb")||-1<document.location.pathname.indexOf("/pricing")||-1<document.location.pathname.indexOf("/features"))&&(80<$(window).scrollTop()?$(".discountSticker.fb").not(".homepage").fadeOut():$(".discountSticker.fb").not(".homepage").fadeIn())}$(document).mouseup(function(e){var o=$("#chkMobileMenu");o.is(":checked")&&!o.is(e.target)&&$("#chkMobileMenu").click()}),$("#chkMobileMenu").click(function(){this.checked&&$("#top-nav.header2 .header-bottom").addClass("forcedShadow")}),$(window).scroll(function(){i()}),$(window).resize(function(){i()}),i(),function(){if($(".selectableMenus").removeClass("home features pricing business"),-1<window.location.pathname.indexOf("/features")||-1<window.location.pathname.indexOf("/fb"))$(".selectableMenus").addClass("features");else if(-1<window.location.pathname.indexOf("/select-plan")||-1<window.location.pathname.indexOf("/pricing"))$(".selectableMenus").addClass("pricing"),$("#top-nav.header2 .header-bottom, #ss-logo, a.menuTitle").removeClass("no-scroll").addClass("scrolled");else if(-1<window.location.pathname.indexOf("/business")&&-1===window.location.pathname.indexOf("/business_account"))$(".selectableMenus").addClass("business");else{var e=-1<window.location.pathname.indexOf("/offer/")?"/offer/":window.location.pathname;-1<o.indexOf(e)?$(".selectableMenus").addClass("home"):$("#top-nav.header2 .header-bottom, #ss-logo, a.menuTitle").removeClass("no-scroll").addClass("scrolled")}}(),SS.showCookieBanner=function(e){-1!=location.pathname.indexOf("header-include")||"/devpages"==location.pathname&&!e||SS.showCookieBannerHandler()},SS.showCookieBannerHandler=function(){"undefined"!=typeof $?$("#agreementBar").is(":hidden")&&$("#agreementBar").slideToggle():document.getElementById("agreementBar").style.display="block"},SS.hideCookieBanner=function(){"undefined"!=typeof $?$("#agreementBar").is(":visible")&&$("#agreementBar").slideToggle():document.getElementById("agreementBar").style.display="none"},SS.getDomain=function(){var e=window.location.hostname.match(/([a-z0-9-]*?)\.[a-z]{2,}$/);return null!==e&&0<e.length?"."+e[0]:".sugarsync.com"},SS.createCookieAgree=function(){var e=new Date;e.setTime(e.getTime()+31536e7);var o=SS.getDomain();document.cookie="cookieAgree=1; expires="+e.toGMTString()+"; path =/; domain="+o+";"},SS.acceptCookies=function(){SS.createCookieAgree(),SS.hideCookieBanner()},SS.verifyCookieAcceptance=function(e){document.cookie.match(/^(.*;)?\s*cookieAgree\s*=\s*[^;]+(.*)?$/)?SS.hideCookieBanner():void 0!==document.getElementById("agreementBar")?SS.showCookieBanner(e):confirm(l("By continuing to use this website, you consent to the use of cookies in accordance with our")+" "+l("Cookie Policy")+l(".")+" Please visit our /cookie page for details.")&&SS.createCookieAgree()},SS.fetchCookieBanner=function(e){var o=e.getElementById("header_include").contentDocument.getElementById("agreementBar");e.body.appendChild(o),window.setTimeout(function(){SS.verifyCookieAcceptance(),$(window).focus(function(){SS.verifyCookieAcceptance()})},1e3)}}();