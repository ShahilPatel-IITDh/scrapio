!function(e,t,n){"use strict";!function o(e,t,n){function a(s,l){if(!t[s]){if(!e[s]){var i="function"==typeof require&&require;if(!l&&i)return i(s,!0);if(r)return r(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var c=t[s]={exports:{}};e[s][0].call(c.exports,function(t){var n=e[s][1][t];return a(n?n:t)},c,c.exports,o,e,t,n)}return t[s].exports}for(var r="function"==typeof require&&require,s=0;s<n.length;s++)a(n[s]);return a}({1:[function(o,a,r){function s(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(r,"__esModule",{value:!0});var l,i,u,c,d=o("./modules/handle-dom"),f=o("./modules/utils"),p=o("./modules/handle-swal-dom"),m=o("./modules/handle-click"),v=o("./modules/handle-key"),y=s(v),b=o("./modules/default-params"),h=s(b),g=o("./modules/set-params"),w=s(g);r["default"]=u=c=function(){function o(e){var t=a;return t[e]===n?h["default"][e]:t[e]}var a=arguments[0];if((0,d.addClass)(t.body,"stop-scrolling"),(0,p.resetInput)(),a===n)return(0,f.logStr)("SweetAlert expects at least 1 attribute!"),!1;var r=(0,f.extend)({},h["default"]);switch(typeof a){case"string":r.title=a,r.text=arguments[1]||"",r.type=arguments[2]||"";break;case"object":if(a.title===n)return(0,f.logStr)('Missing "title" argument!'),!1;r.title=a.title;for(var s in h["default"])r[s]=o(s);r.confirmButtonText=r.showCancelButton?"Confirm":h["default"].confirmButtonText,r.confirmButtonText=o("confirmButtonText"),r.doneFunction=arguments[1]||null;break;default:return(0,f.logStr)('Unexpected type of argument! Expected "string" or "object", got '+typeof a),!1}(0,w["default"])(r),(0,p.fixVerticalPosition)(),(0,p.openModal)(arguments[1]);for(var u=(0,p.getModal)(),v=u.querySelectorAll("button"),b=["onclick","onmouseover","onmouseout","onmousedown","onmouseup","onfocus"],g=function(e){return(0,m.handleButton)(e,r,u)},C=0;C<v.length;C++)for(var S=0;S<b.length;S++){var x=b[S];v[C][x]=g}(0,p.getOverlay)().onclick=g,l=e.onkeydown;var k=function(e){return(0,y["default"])(e,r,u)};e.onkeydown=k,e.onfocus=function(){setTimeout(function(){i!==n&&(i.focus(),i=n)},0)},c.enableButtons()},u.setDefaults=c.setDefaults=function(e){if(!e)throw new Error("userParams is required");if("object"!=typeof e)throw new Error("userParams has to be a object");(0,f.extend)(h["default"],e)},u.close=c.close=function(){var o=(0,p.getModal)();(0,d.fadeOut)((0,p.getOverlay)(),5),(0,d.fadeOut)(o,5),(0,d.removeClass)(o,"showSweetAlert"),(0,d.addClass)(o,"hideSweetAlert"),(0,d.removeClass)(o,"visible");var a=o.querySelector(".sa-icon.sa-success");(0,d.removeClass)(a,"animate"),(0,d.removeClass)(a.querySelector(".sa-tip"),"animateSuccessTip"),(0,d.removeClass)(a.querySelector(".sa-long"),"animateSuccessLong");var r=o.querySelector(".sa-icon.sa-error");(0,d.removeClass)(r,"animateErrorIcon"),(0,d.removeClass)(r.querySelector(".sa-x-mark"),"animateXMark");var s=o.querySelector(".sa-icon.sa-warning");return(0,d.removeClass)(s,"pulseWarning"),(0,d.removeClass)(s.querySelector(".sa-body"),"pulseWarningIns"),(0,d.removeClass)(s.querySelector(".sa-dot"),"pulseWarningIns"),setTimeout(function(){var e=o.getAttribute("data-custom-class");(0,d.removeClass)(o,e)},300),(0,d.removeClass)(t.body,"stop-scrolling"),e.onkeydown=l,e.previousActiveElement&&e.previousActiveElement.focus(),i=n,clearTimeout(o.timeout),!0},u.showInputError=c.showInputError=function(e){var t=(0,p.getModal)(),n=t.querySelector(".sa-input-error");(0,d.addClass)(n,"show");var o=t.querySelector(".sa-error-container");(0,d.addClass)(o,"show"),o.querySelector("p").innerHTML=e,setTimeout(function(){u.enableButtons()},1),t.querySelector("input").focus()},u.resetInputError=c.resetInputError=function(e){if(e&&13===e.keyCode)return!1;var t=(0,p.getModal)(),n=t.querySelector(".sa-input-error");(0,d.removeClass)(n,"show");var o=t.querySelector(".sa-error-container");(0,d.removeClass)(o,"show")},u.disableButtons=c.disableButtons=function(e){var t=(0,p.getModal)(),n=t.querySelector("button.confirm"),o=t.querySelector("button.cancel");n.disabled=!0,o.disabled=!0},u.enableButtons=c.enableButtons=function(e){var t=(0,p.getModal)(),n=t.querySelector("button.confirm"),o=t.querySelector("button.cancel");n.disabled=!1,o.disabled=!1},"undefined"!=typeof e?e.sweetAlert=e.swal=u:(0,f.logStr)("SweetAlert is a frontend module!"),a.exports=r["default"]},{"./modules/default-params":2,"./modules/handle-click":3,"./modules/handle-dom":4,"./modules/handle-key":5,"./modules/handle-swal-dom":6,"./modules/set-params":8,"./modules/utils":9}],2:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var o={title:"",text:"",type:null,allowOutsideClick:!1,showConfirmButton:!0,showCancelButton:!1,closeOnConfirm:!0,closeOnCancel:!0,confirmButtonText:"OK",confirmButtonColor:"#8CD4F5",cancelButtonText:"Cancel",imageUrl:null,imageSize:null,timer:null,customClass:"",html:!1,animation:!0,allowEscapeKey:!0,inputType:"text",inputPlaceholder:"",inputValue:"",showLoaderOnConfirm:!1};n["default"]=o,t.exports=n["default"]},{}],3:[function(t,n,o){Object.defineProperty(o,"__esModule",{value:!0});var a=t("./utils"),r=(t("./handle-swal-dom"),t("./handle-dom")),s=function(t,n,o){function s(e){m&&n.confirmButtonColor&&(p.style.backgroundColor=e)}var u,c,d,f=t||e.event,p=f.target||f.srcElement,m=-1!==p.className.indexOf("confirm"),v=-1!==p.className.indexOf("sweet-overlay"),y=(0,r.hasClass)(o,"visible"),b=n.doneFunction&&"true"===o.getAttribute("data-has-done-function");switch(m&&n.confirmButtonColor&&(u=n.confirmButtonColor,c=(0,a.colorLuminance)(u,-.04),d=(0,a.colorLuminance)(u,-.14)),f.type){case"mouseover":s(c);break;case"mouseout":s(u);break;case"mousedown":s(d);break;case"mouseup":s(c);break;case"focus":var h=o.querySelector("button.confirm"),g=o.querySelector("button.cancel");m?g.style.boxShadow="none":h.style.boxShadow="none";break;case"click":var w=o===p,C=(0,r.isDescendant)(o,p);if(!w&&!C&&y&&!n.allowOutsideClick)break;m&&b&&y?l(o,n):b&&y||v?i(o,n):(0,r.isDescendant)(o,p)&&"BUTTON"===p.tagName&&sweetAlert.close()}},l=function(e,t){var n=!0;(0,r.hasClass)(e,"show-input")&&(n=e.querySelector("input").value,n||(n="")),t.doneFunction(n),t.closeOnConfirm&&sweetAlert.close(),t.showLoaderOnConfirm&&sweetAlert.disableButtons()},i=function(e,t){var n=String(t.doneFunction).replace(/\s/g,""),o="function("===n.substring(0,9)&&")"!==n.substring(9,10);o&&t.doneFunction(!1),t.closeOnCancel&&sweetAlert.close()};o["default"]={handleButton:s,handleConfirm:l,handleCancel:i},n.exports=o["default"]},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],4:[function(n,o,a){Object.defineProperty(a,"__esModule",{value:!0});var r=function(e,t){return new RegExp(" "+t+" ").test(" "+e.className+" ")},s=function(e,t){r(e,t)||(e.className+=" "+t)},l=function(e,t){var n=" "+e.className.replace(/[\t\r\n]/g," ")+" ";if(r(e,t)){for(;n.indexOf(" "+t+" ")>=0;)n=n.replace(" "+t+" "," ");e.className=n.replace(/^\s+|\s+$/g,"")}},i=function(e){var n=t.createElement("div");return n.appendChild(t.createTextNode(e)),n.innerHTML},u=function(e){e.style.opacity="",e.style.display="block"},c=function(e){if(e&&!e.length)return u(e);for(var t=0;t<e.length;++t)u(e[t])},d=function(e){e.style.opacity="",e.style.display="none"},f=function(e){if(e&&!e.length)return d(e);for(var t=0;t<e.length;++t)d(e[t])},p=function(e,t){for(var n=t.parentNode;null!==n;){if(n===e)return!0;n=n.parentNode}return!1},m=function(e){e.style.left="-9999px",e.style.display="block";var t,n=e.clientHeight;return t="undefined"!=typeof getComputedStyle?parseInt(getComputedStyle(e).getPropertyValue("padding-top"),10):parseInt(e.currentStyle.padding),e.style.left="",e.style.display="none","-"+parseInt((n+t)/2)+"px"},v=function(e,t){if(+e.style.opacity<1){t=t||16,e.style.opacity=0,e.style.display="block";var n=+new Date,o=function a(){e.style.opacity=+e.style.opacity+(new Date-n)/100,n=+new Date,+e.style.opacity<1&&setTimeout(a,t)};o()}e.style.display="block"},y=function(e,t){t=t||16,e.style.opacity=1;var n=+new Date,o=function a(){e.style.opacity=+e.style.opacity-(new Date-n)/100,n=+new Date,+e.style.opacity>0?setTimeout(a,t):e.style.display="none"};o()},b=function(n){if("function"==typeof MouseEvent){var o=new MouseEvent("click",{view:e,bubbles:!1,cancelable:!0});n.dispatchEvent(o)}else if(t.createEvent){var a=t.createEvent("MouseEvents");a.initEvent("click",!1,!1),n.dispatchEvent(a)}else t.createEventObject?n.fireEvent("onclick"):"function"==typeof n.onclick&&n.onclick()},h=function(t){"function"==typeof t.stopPropagation?(t.stopPropagation(),t.preventDefault()):e.event&&e.event.hasOwnProperty("cancelBubble")&&(e.event.cancelBubble=!0)};a.hasClass=r,a.addClass=s,a.removeClass=l,a.escapeHtml=i,a._show=u,a.show=c,a._hide=d,a.hide=f,a.isDescendant=p,a.getTopMargin=m,a.fadeIn=v,a.fadeOut=y,a.fireClick=b,a.stopEventPropagation=h},{}],5:[function(t,o,a){Object.defineProperty(a,"__esModule",{value:!0});var r=t("./handle-dom"),s=t("./handle-swal-dom"),l=function(t,o,a){var l=t||e.event,i=l.keyCode||l.which,u=a.querySelector("button.confirm"),c=a.querySelector("button.cancel"),d=a.querySelectorAll("button[tabindex]");if(-1!==[9,13,32,27].indexOf(i)){for(var f=l.target||l.srcElement,p=-1,m=0;m<d.length;m++)if(f===d[m]){p=m;break}9===i?(f=-1===p?u:p===d.length-1?d[0]:d[p+1],(0,r.stopEventPropagation)(l),f.focus(),o.confirmButtonColor&&(0,s.setFocusStyle)(f,o.confirmButtonColor)):13===i?("INPUT"===f.tagName&&(f=u,u.focus()),f=-1===p?u:n):27===i&&o.allowEscapeKey===!0?(f=c,(0,r.fireClick)(f,l)):f=n}};a["default"]=l,o.exports=a["default"]},{"./handle-dom":4,"./handle-swal-dom":6}],6:[function(n,o,a){function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(a,"__esModule",{value:!0});var s=n("./utils"),l=n("./handle-dom"),i=n("./default-params"),u=r(i),c=n("./injected-html"),d=r(c),f=".sweet-alert",p=".sweet-overlay",m=function(){var e=t.createElement("div");for(e.innerHTML=d["default"];e.firstChild;)t.body.appendChild(e.firstChild)},v=function x(){var e=t.querySelector(f);return e||(m(),e=x()),e},y=function(){var e=v();return e?e.querySelector("input"):void 0},b=function(){return t.querySelector(p)},h=function(e,t){var n=(0,s.hexToRgb)(t);e.style.boxShadow="0 0 2px rgba("+n+", 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)"},g=function(n){var o=v();(0,l.fadeIn)(b(),10),(0,l.show)(o),(0,l.addClass)(o,"showSweetAlert"),(0,l.removeClass)(o,"hideSweetAlert"),e.previousActiveElement=t.activeElement;var a=o.querySelector("button.confirm");a.focus(),setTimeout(function(){(0,l.addClass)(o,"visible")},500);var r=o.getAttribute("data-timer");if("null"!==r&&""!==r){var s=n;o.timeout=setTimeout(function(){var e=(s||null)&&"true"===o.getAttribute("data-has-done-function");e?s(null):sweetAlert.close()},r)}},w=function(){var e=v(),t=y();(0,l.removeClass)(e,"show-input"),t.value=u["default"].inputValue,t.setAttribute("type",u["default"].inputType),t.setAttribute("placeholder",u["default"].inputPlaceholder),C()},C=function(e){if(e&&13===e.keyCode)return!1;var t=v(),n=t.querySelector(".sa-input-error");(0,l.removeClass)(n,"show");var o=t.querySelector(".sa-error-container");(0,l.removeClass)(o,"show")},S=function(){var e=v();e.style.marginTop=(0,l.getTopMargin)(v())};a.sweetAlertInitialize=m,a.getModal=v,a.getOverlay=b,a.getInput=y,a.setFocusStyle=h,a.openModal=g,a.resetInput=w,a.resetInputError=C,a.fixVerticalPosition=S},{"./default-params":2,"./handle-dom":4,"./injected-html":7,"./utils":9}],7:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var o='<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert"><div class="sa-icon sa-error">\n      <span class="sa-x-mark">\n        <span class="sa-line sa-left"></span>\n        <span class="sa-line sa-right"></span>\n      </span>\n    </div><div class="sa-icon sa-warning">\n      <span class="sa-body"></span>\n      <span class="sa-dot"></span>\n    </div><div class="sa-icon sa-info"></div><div class="sa-icon sa-success">\n      <span class="sa-line sa-tip"></span>\n      <span class="sa-line sa-long"></span>\n\n      <div class="sa-placeholder"></div>\n      <div class="sa-fix"></div>\n    </div><div class="sa-icon sa-custom"></div><h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type="text" tabIndex="3" />\n      <div class="sa-input-error"></div>\n    </fieldset><div class="sa-error-container">\n      <div class="icon">!</div>\n      <p>Not valid!</p>\n    </div><div class="sa-button-container">\n      <button class="cancel" tabIndex="2">Cancel</button>\n      <div class="sa-confirm-button-container">\n        <button class="confirm" tabIndex="1">OK</button><div class="la-ball-fall">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div></div>';n["default"]=o,t.exports=n["default"]},{}],8:[function(e,t,o){Object.defineProperty(o,"__esModule",{value:!0});var a=e("./utils"),r=e("./handle-swal-dom"),s=e("./handle-dom"),l=["error","warning","info","success","input","prompt"],i=function(e){var t=(0,r.getModal)(),o=t.querySelector("h2"),i=t.querySelector("p"),u=t.querySelector("button.cancel"),c=t.querySelector("button.confirm");if(o.innerHTML=e.html?e.title:(0,s.escapeHtml)(e.title).split("\n").join("<br>"),i.innerHTML=e.html?e.text:(0,s.escapeHtml)(e.text||"").split("\n").join("<br>"),e.text&&(0,s.show)(i),e.customClass)(0,s.addClass)(t,e.customClass),t.setAttribute("data-custom-class",e.customClass);else{var d=t.getAttribute("data-custom-class");(0,s.removeClass)(t,d),t.setAttribute("data-custom-class","")}if((0,s.hide)(t.querySelectorAll(".sa-icon")),e.type&&!(0,a.isIE8)()){var f=function(){for(var o=!1,a=0;a<l.length;a++)if(e.type===l[a]){o=!0;break}if(!o)return logStr("Unknown alert type: "+e.type),{v:!1};var i=["success","error","warning","info"],u=n;-1!==i.indexOf(e.type)&&(u=t.querySelector(".sa-icon.sa-"+e.type),(0,s.show)(u));var c=(0,r.getInput)();switch(e.type){case"success":(0,s.addClass)(u,"animate"),(0,s.addClass)(u.querySelector(".sa-tip"),"animateSuccessTip"),(0,s.addClass)(u.querySelector(".sa-long"),"animateSuccessLong");break;case"error":(0,s.addClass)(u,"animateErrorIcon"),(0,s.addClass)(u.querySelector(".sa-x-mark"),"animateXMark");break;case"warning":(0,s.addClass)(u,"pulseWarning"),(0,s.addClass)(u.querySelector(".sa-body"),"pulseWarningIns"),(0,s.addClass)(u.querySelector(".sa-dot"),"pulseWarningIns");break;case"input":case"prompt":c.setAttribute("type",e.inputType),c.value=e.inputValue,c.setAttribute("placeholder",e.inputPlaceholder),(0,s.addClass)(t,"show-input"),setTimeout(function(){c.focus(),c.addEventListener("keyup",swal.resetInputError)},400)}}();if("object"==typeof f)return f.v}if(e.imageUrl){var p=t.querySelector(".sa-icon.sa-custom");p.style.backgroundImage="url("+e.imageUrl+")",(0,s.show)(p);var m=80,v=80;if(e.imageSize){var y=e.imageSize.toString().split("x"),b=y[0],h=y[1];b&&h?(m=b,v=h):logStr("Parameter imageSize expects value with format WIDTHxHEIGHT, got "+e.imageSize)}p.setAttribute("style",p.getAttribute("style")+"width:"+m+"px; height:"+v+"px")}t.setAttribute("data-has-cancel-button",e.showCancelButton),e.showCancelButton?u.style.display="inline-block":(0,s.hide)(u),t.setAttribute("data-has-confirm-button",e.showConfirmButton),e.showConfirmButton?c.style.display="inline-block":(0,s.hide)(c),e.cancelButtonText&&(u.innerHTML=(0,s.escapeHtml)(e.cancelButtonText)),e.confirmButtonText&&(c.innerHTML=(0,s.escapeHtml)(e.confirmButtonText)),e.confirmButtonColor&&(c.style.backgroundColor=e.confirmButtonColor,c.style.borderLeftColor=e.confirmLoadingButtonColor,c.style.borderRightColor=e.confirmLoadingButtonColor,(0,r.setFocusStyle)(c,e.confirmButtonColor)),t.setAttribute("data-allow-outside-click",e.allowOutsideClick);var g=!!e.doneFunction;t.setAttribute("data-has-done-function",g),e.animation?"string"==typeof e.animation?t.setAttribute("data-animation",e.animation):t.setAttribute("data-animation","pop"):t.setAttribute("data-animation","none"),t.setAttribute("data-timer",e.timer)};o["default"]=i,t.exports=o["default"]},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],9:[function(t,n,o){Object.defineProperty(o,"__esModule",{value:!0});var a=function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},r=function(e){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?parseInt(t[1],16)+", "+parseInt(t[2],16)+", "+parseInt(t[3],16):null},s=function(){return e.attachEvent&&!e.addEventListener},l=function(t){"undefined"!=typeof e&&e.console&&e.console.log("SweetAlert: "+t)},i=function(e,t){e=String(e).replace(/[^0-9a-f]/gi,""),e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),t=t||0;var n,o,a="#";for(o=0;3>o;o++)n=parseInt(e.substr(2*o,2),16),n=Math.round(Math.min(Math.max(0,n+n*t),255)).toString(16),a+=("00"+n).substr(n.length);return a};o.extend=a,o.hexToRgb=r,o.isIE8=s,o.logStr=l,o.colorLuminance=i},{}]},{},[1]),"function"==typeof define&&define.amd?define(function(){return sweetAlert}):"undefined"!=typeof module&&module.exports&&(module.exports=sweetAlert)}(window,document);
/// Knockout Mapping plugin v2.4.1
/// (c) 2013 Steven Sanderson, Roy Jacobs - http://knockoutjs.com/
/// License: MIT (http://www.opensource.org/licenses/mit-license.php)
(function (e) { "function" === typeof require && "object" === typeof exports && "object" === typeof module ? e(require("knockout"), exports) : "function" === typeof define && define.amd ? define(["knockout", "exports"], e) : e(ko, ko.mapping = {}) })(function (e, f) {
    function y(b, c) {
        var a, d; for (d in c) if (c.hasOwnProperty(d) && c[d]) if (a = f.getType(b[d]), d && b[d] && "array" !== a && "string" !== a) y(b[d], c[d]); else if ("array" === f.getType(b[d]) && "array" === f.getType(c[d])) {
            a = b; for (var e = d, l = b[d], n = c[d], t = {}, g = l.length - 1; 0 <= g; --g) t[l[g]] = l[g]; for (g =
            n.length - 1; 0 <= g; --g) t[n[g]] = n[g]; l = []; n = void 0; for (n in t) l.push(t[n]); a[e] = l
        } else b[d] = c[d]
    } function E(b, c) { var a = {}; y(a, b); y(a, c); return a } function z(b, c) {
        for (var a = E({}, b), e = L.length - 1; 0 <= e; e--) { var f = L[e]; a[f] && (a[""] instanceof Object || (a[""] = {}), a[""][f] = a[f], delete a[f]) } c && (a.ignore = h(c.ignore, a.ignore), a.include = h(c.include, a.include), a.copy = h(c.copy, a.copy), a.observe = h(c.observe, a.observe)); a.ignore = h(a.ignore, j.ignore); a.include = h(a.include, j.include); a.copy = h(a.copy, j.copy); a.observe = h(a.observe,
        j.observe); a.mappedProperties = a.mappedProperties || {}; a.copiedProperties = a.copiedProperties || {}; return a
    } function h(b, c) { "array" !== f.getType(b) && (b = "undefined" === f.getType(b) ? [] : [b]); "array" !== f.getType(c) && (c = "undefined" === f.getType(c) ? [] : [c]); return e.utils.arrayGetDistinctValues(b.concat(c)) } function F(b, c, a, d, k, l, n) {
        var t = "array" === f.getType(e.utils.unwrapObservable(c)); l = l || ""; if (f.isMapped(b)) { var g = e.utils.unwrapObservable(b)[p]; a = E(g, a) } var j = n || k, h = function () {
            return a[d] && a[d].create instanceof
            Function
        }, x = function (b) {
            var f = G, g = e.dependentObservable; e.dependentObservable = function (a, b, c) { c = c || {}; a && "object" == typeof a && (c = a); var d = c.deferEvaluation, M = !1; c.deferEvaluation = !0; a = new H(a, b, c); if (!d) { var g = a, d = e.dependentObservable; e.dependentObservable = H; a = e.isWriteableObservable(g); e.dependentObservable = d; d = H({ read: function () { M || (e.utils.arrayRemoveItem(f, g), M = !0); return g.apply(g, arguments) }, write: a && function (a) { return g(a) }, deferEvaluation: !0 }); d.__DO = g; a = d; f.push(a) } return a }; e.dependentObservable.fn =
            H.fn; e.computed = e.dependentObservable; b = e.utils.unwrapObservable(k) instanceof Array ? a[d].create({ data: b || c, parent: j, skip: N }) : a[d].create({ data: b || c, parent: j }); e.dependentObservable = g; e.computed = e.dependentObservable; return b
        }, u = function () { return a[d] && a[d].update instanceof Function }, v = function (b, f) { var g = { data: f || c, parent: j, target: e.utils.unwrapObservable(b) }; e.isWriteableObservable(b) && (g.observable = b); return a[d].update(g) }; if (n = I.get(c)) return n; d = d || ""; if (t) {
            var t = [], s = !1, m = function (a) { return a };
            a[d] && a[d].key && (m = a[d].key, s = !0); e.isObservable(b) || (b = e.observableArray([]), b.mappedRemove = function (a) { var c = "function" == typeof a ? a : function (b) { return b === m(a) }; return b.remove(function (a) { return c(m(a)) }) }, b.mappedRemoveAll = function (a) { var c = C(a, m); return b.remove(function (a) { return -1 != e.utils.arrayIndexOf(c, m(a)) }) }, b.mappedDestroy = function (a) { var c = "function" == typeof a ? a : function (b) { return b === m(a) }; return b.destroy(function (a) { return c(m(a)) }) }, b.mappedDestroyAll = function (a) {
                var c = C(a, m); return b.destroy(function (a) {
                    return -1 !=
                    e.utils.arrayIndexOf(c, m(a))
                })
            }, b.mappedIndexOf = function (a) { var c = C(b(), m); a = m(a); return e.utils.arrayIndexOf(c, a) }, b.mappedGet = function (a) { return b()[b.mappedIndexOf(a)] }, b.mappedCreate = function (a) { if (-1 !== b.mappedIndexOf(a)) throw Error("There already is an object with the key that you specified."); var c = h() ? x(a) : a; u() && (a = v(c, a), e.isWriteableObservable(c) ? c(a) : c = a); b.push(c); return c }); n = C(e.utils.unwrapObservable(b), m).sort(); g = C(c, m); s && g.sort(); s = e.utils.compareArrays(n, g); n = {}; var J, A = e.utils.unwrapObservable(c),
            y = {}, z = !0, g = 0; for (J = A.length; g < J; g++) { var r = m(A[g]); if (void 0 === r || r instanceof Object) { z = !1; break } y[r] = A[g] } var A = [], B = 0, g = 0; for (J = s.length; g < J; g++) {
                var r = s[g], q, w = l + "[" + g + "]"; switch (r.status) {
                    case "added": var D = z ? y[r.value] : K(e.utils.unwrapObservable(c), r.value, m); q = F(void 0, D, a, d, b, w, k); h() || (q = e.utils.unwrapObservable(q)); w = O(e.utils.unwrapObservable(c), D, n); q === N ? B++ : A[w - B] = q; n[w] = !0; break; case "retained": D = z ? y[r.value] : K(e.utils.unwrapObservable(c), r.value, m); q = K(b, r.value, m); F(q, D, a, d, b, w,
                    k); w = O(e.utils.unwrapObservable(c), D, n); A[w] = q; n[w] = !0; break; case "deleted": q = K(b, r.value, m)
                } t.push({ event: r.status, item: q })
            } b(A); a[d] && a[d].arrayChanged && e.utils.arrayForEach(t, function (b) { a[d].arrayChanged(b.event, b.item) })
        } else if (P(c)) {
            b = e.utils.unwrapObservable(b); if (!b) { if (h()) return s = x(), u() && (s = v(s)), s; if (u()) return v(s); b = {} } u() && (b = v(b)); I.save(c, b); if (u()) return b; Q(c, function (d) {
                var f = l.length ? l + "." + d : d; if (-1 == e.utils.arrayIndexOf(a.ignore, f)) if (-1 != e.utils.arrayIndexOf(a.copy, f)) b[d] =
                c[d]; else if ("object" != typeof c[d] && "array" != typeof c[d] && 0 < a.observe.length && -1 == e.utils.arrayIndexOf(a.observe, f)) b[d] = c[d], a.copiedProperties[f] = !0; else { var g = I.get(c[d]), k = F(b[d], c[d], a, d, b, f, b), g = g || k; if (0 < a.observe.length && -1 == e.utils.arrayIndexOf(a.observe, f)) b[d] = g(), a.copiedProperties[f] = !0; else { if (e.isWriteableObservable(b[d])) { if (g = e.utils.unwrapObservable(g), b[d]() !== g) b[d](g) } else g = void 0 === b[d] ? g : e.utils.unwrapObservable(g), b[d] = g; a.mappedProperties[f] = !0 } }
            })
        } else switch (f.getType(c)) {
            case "function": u() ?
            e.isWriteableObservable(c) ? (c(v(c)), b = c) : b = v(c) : b = c; break; default: if (e.isWriteableObservable(b)) return q = u() ? v(b) : e.utils.unwrapObservable(c), b(q), q; h() || u(); b = h() ? x() : e.observable(e.utils.unwrapObservable(c)); u() && b(v(b))
        } return b
    } function O(b, c, a) { for (var d = 0, e = b.length; d < e; d++) if (!0 !== a[d] && b[d] === c) return d; return null } function R(b, c) { var a; c && (a = c(b)); "undefined" === f.getType(a) && (a = b); return e.utils.unwrapObservable(a) } function K(b, c, a) {
        b = e.utils.unwrapObservable(b); for (var d = 0, f = b.length; d <
        f; d++) { var l = b[d]; if (R(l, a) === c) return l } throw Error("When calling ko.update*, the key '" + c + "' was not found!");
    } function C(b, c) { return e.utils.arrayMap(e.utils.unwrapObservable(b), function (a) { return c ? R(a, c) : a }) } function Q(b, c) { if ("array" === f.getType(b)) for (var a = 0; a < b.length; a++) c(a); else for (a in b) c(a) } function P(b) { var c = f.getType(b); return ("object" === c || "array" === c) && null !== b } function T() {
        var b = [], c = []; this.save = function (a, d) { var f = e.utils.arrayIndexOf(b, a); 0 <= f ? c[f] = d : (b.push(a), c.push(d)) };
        this.get = function (a) { a = e.utils.arrayIndexOf(b, a); return 0 <= a ? c[a] : void 0 }
    } function S() { var b = {}, c = function (a) { var c; try { c = a } catch (e) { c = "$$$" } a = b[c]; void 0 === a && (a = new T, b[c] = a); return a }; this.save = function (a, b) { c(a).save(a, b) }; this.get = function (a) { return c(a).get(a) } } var p = "__ko_mapping__", H = e.dependentObservable, B = 0, G, I, L = ["create", "update", "key", "arrayChanged"], N = {}, x = { include: ["_destroy"], ignore: [], copy: [], observe: [] }, j = x; f.isMapped = function (b) { return (b = e.utils.unwrapObservable(b)) && b[p] }; f.fromJS =
    function (b) { if (0 == arguments.length) throw Error("When calling ko.fromJS, pass the object you want to convert."); try { B++ || (G = [], I = new S); var c, a; 2 == arguments.length && (arguments[1][p] ? a = arguments[1] : c = arguments[1]); 3 == arguments.length && (c = arguments[1], a = arguments[2]); a && (c = E(c, a[p])); c = z(c); var d = F(a, b, c); a && (d = a); if (!--B) for (; G.length;) { var e = G.pop(); e && (e(), e.__DO.throttleEvaluation = e.throttleEvaluation) } d[p] = E(d[p], c); return d } catch (f) { throw B = 0, f; } }; f.fromJSON = function (b) {
        var c = e.utils.parseJson(b);
        arguments[0] = c; return f.fromJS.apply(this, arguments)
    }; f.updateFromJS = function () { throw Error("ko.mapping.updateFromJS, use ko.mapping.fromJS instead. Please note that the order of parameters is different!"); }; f.updateFromJSON = function () { throw Error("ko.mapping.updateFromJSON, use ko.mapping.fromJSON instead. Please note that the order of parameters is different!"); }; f.toJS = function (b, c) {
        j || f.resetDefaultOptions(); if (0 == arguments.length) throw Error("When calling ko.mapping.toJS, pass the object you want to convert.");
        if ("array" !== f.getType(j.ignore)) throw Error("ko.mapping.defaultOptions().ignore should be an array."); if ("array" !== f.getType(j.include)) throw Error("ko.mapping.defaultOptions().include should be an array."); if ("array" !== f.getType(j.copy)) throw Error("ko.mapping.defaultOptions().copy should be an array."); c = z(c, b[p]); return f.visitModel(b, function (a) { return e.utils.unwrapObservable(a) }, c)
    }; f.toJSON = function (b, c) { var a = f.toJS(b, c); return e.utils.stringifyJson(a) }; f.defaultOptions = function () {
        if (0 < arguments.length) j =
        arguments[0]; else return j
    }; f.resetDefaultOptions = function () { j = { include: x.include.slice(0), ignore: x.ignore.slice(0), copy: x.copy.slice(0) } }; f.getType = function (b) { if (b && "object" === typeof b) { if (b.constructor === Date) return "date"; if (b.constructor === Array) return "array" } return typeof b }; f.visitModel = function (b, c, a) {
        a = a || {}; a.visitedObjects = a.visitedObjects || new S; var d, k = e.utils.unwrapObservable(b); if (P(k)) a = z(a, k[p]), c(b, a.parentName), d = "array" === f.getType(k) ? [] : {}; else return c(b, a.parentName); a.visitedObjects.save(b,
        d); var l = a.parentName; Q(k, function (b) {
            if (!(a.ignore && -1 != e.utils.arrayIndexOf(a.ignore, b))) {
                var j = k[b], g = a, h = l || ""; "array" === f.getType(k) ? l && (h += "[" + b + "]") : (l && (h += "."), h += b); g.parentName = h; if (!(-1 === e.utils.arrayIndexOf(a.copy, b) && -1 === e.utils.arrayIndexOf(a.include, b) && k[p] && k[p].mappedProperties && !k[p].mappedProperties[b] && k[p].copiedProperties && !k[p].copiedProperties[b] && "array" !== f.getType(k))) switch (f.getType(e.utils.unwrapObservable(j))) {
                    case "object": case "array": case "undefined": g = a.visitedObjects.get(j);
                        d[b] = "undefined" !== f.getType(g) ? g : f.visitModel(j, c, a); break; default: d[b] = c(j, a.parentName)
                }
            }
        }); return d
    }
});
var globalEmailId = "";
var checkoutTitle = "";
var excludesComponents = "";
var options = "";
$('form').attr('autocomplete', 'off');
var signInId = 'SignIn',
    createAccountId = 'CreateAccount',
    forgotPasswordId = 'ForgotPassword',
    validationSummaryContainer = '#validationSummaryContainer',
    validationSummaryImage = '#validationSummaryImage',
    validationSummaryText = '#validationSummaryText',
    validationErrorClass = ".field-validation-error",
    password = "#Password",
    newPassword = "#NewPassword",
    confirmNewPassword = "#ConfirmNewPassword",
    fg = -1,
    fg2 = -1,
    localJsBundleLoaded = true;

$(document).ready(function () {
    Initialize();
    $.ajaxSetup({ cache: false });
});

function Initialize() {
    Event.Listen("showValidationSummary", showValidationSummary);
    Event.Listen("hideValidationSummary", hideValidationSummary);

    $(document.forms).each(function () {
        $(":input[type=password]", this).each(function () {
            $(this).attr('data-val-type', $(this).attr('type'));
        });

        $(this).bind("submit", displayAlertMessageAfterSubmit);
    });

    // Below code is just needed for Login/Register View
    if ($("#ShowCreateAccountSection").length > 0 && $("#ShowCreateAccountSection").val() == "true" && $("#show-hide-create-account-section").length > 0) {
        $("#show-hide-create-account-section").show();
    }
    else if ($("#showNewGuestCheckoutFeature").val() != 'undefined' && $("#showNewGuestCheckoutFeature").val() == 'true') {
        $("#show-hide-create-account-section").show();
    }
    else {
        $("#show-hide-create-account-section").hide();
    }

    $(newPassword).strength({
        strengthClass: 'strength',
        strengthMeterClass: 'strength_meter',
        strengthButtonClass: 'button1_strength',
        strengthButtonText: 'Show1 password',
        strengthButtonTextToggle: 'Hide1 Password'
    });

    To_Find_The_The_Button_Clicked();

    setFg(true);

    if (enableCustomFingerPrint.toLowerCase() === "true") {
        getExcludesComponents(fingerPrintExcludeComponentList);
        setMonitorFg(true);
    }
}

function setFg(async) {
    if (async === true) {
        try {
            if (window.requestIdleCallback) {
                requestIdleCallback(function () {
                    Fingerprint2.get(function (components) {
                        fg = Fingerprint2.x64hash128(components.map(function (pair) { return pair.value }).join(), 31);
                    });
                });
            } else {
                setTimeout(function () {
                    Fingerprint2.get(function (components) {
                        fg = Fingerprint2.x64hash128(components.map(function (pair) { return pair.value }).join(), 31);
                    });
                }, 2000);
            }
        }
        catch (e) {
            fg = "68d4f54f0c19404ca7554eda6d03e523";
        }
    }
    else {
        try {
            Fingerprint2.get(function (components) {
                fg = Fingerprint2.x64hash128(components.map(function (pair) { return pair.value }).join(), 31);
            });
        }
        catch (e) {
            fg = "68d4f54f0c19404ca7554eda6d03e526";
        }
    }
}

function setMonitorFg(async) {
    if (async === true) {
        try {
            if (window.requestIdleCallback) {
                requestIdleCallback(function () {
                    if (options !== "" && options !== null) {
                        Fingerprint2.get(options, function (components) {
                            fg2 = Fingerprint2.x64hash128(components.map(function (pair) { return pair.value }).join(), 31);
                        });
                    }
                });
            } else {
                setTimeout(function () {
                    if (options != "" && options.length > 0) {
                        Fingerprint2.get(options, function (components) {
                            fg2 = Fingerprint2.x64hash128(components.map(function (pair) { return pair.value }).join(), 31);
                        });
                    }
                }, 2000);
            }
        }
        catch (e) {
            fg2 = "78d4f54f0c19404ca7554eda6d03e523";
        }
    }
    else {
        try {
            if (options != "" && options.length > 0) {
                Fingerprint2.get(options, function (components) {
                    fg2 = Fingerprint2.x64hash128(components.map(function (pair) { return pair.value }).join(), 31);
                });
            }
        }
        catch (e) {
            fg2 = "78d4f54f0c19404ca7554eda6d03e523";
        }
    }
}

function ClearControlsAfterCaptcha(formInstance) {
    var lFormInstance = $("#" + $(this)[0]);
    disableFormControls(lFormInstance, false);
    clearButtonProcessingState(lFormInstance);
    clearFormControlsOnError(lFormInstance);
}

/// <summary>
/// To find the button that is clicked to render the busy image
/// </summary>
function To_Find_The_The_Button_Clicked() {
    $(document.forms).each(function () {
        $(":input[type=button]:not(.btn-dont-register-click-event)", this).each(function () {
            $(this).bind("click", displayAlertMessageAfterSubmit);
        });
    });
}

function Custom_Ajax_Call(formId, url, skipValidation, httpMethodType, successMethod, errorMethod) {
    var formInstance = $("#" + formId);
    if (!window.event) {
        window.event = arguments.callee.caller.arguments[0];
    }
    if (typeof window.event != "undefined") {
        if (window.event.target && window.event.target.type === 'button') {
            $(window.event.target).attr('button-clicked', true);
        }
        else if (window.event.type && window.event.type === 'button') {
            // For IE8 compatibility
            $(window.event.srcElement).attr('button-clicked', true);
        }
    }

    if ((typeof (skipValidation) != undefined && skipValidation == true) || (typeof (formInstance.validate()) != "undefined") && formInstance.validate().form()) {
        var _oData = {
            type: (typeof (httpMethodType) != "undefined") ? httpMethodType : "POST",
            url: url,
            data: getFormData(formId),
            beforeSend: CustomAjaxCallBeforeSendEvent,
            success: (successMethod != undefined) ? window[successMethod] : CustomAjaxCallSuccessEvent,
            error: function (request, status, error) {
                processErrorMessage(["1", [generalErrorMessage + '.']], formInstance);
                try {
                    if (typeof logMessageUrl != "undefined") {
                        $.ajax({
                            type: "POST",
                            url: logMessageUrl,
                            contentType: "application/json",
                            dataType: "json",
                            data: JSON.stringify({ message: 'Call from Custom_Ajax_Call - Status: ' + status + ', \nEmailId: ' + globalEmailId + ', \nStatusText: ' + error + ', \nResponseText: ' + htmlDecode(request.responseText) })
                        });
                    }
                }
                catch (e) {
                }
            },
            dataType: "html",
            context: [formId]
        };

        submitAjax(_oData);
    }

    return false;
}

function toLocalTime(id, time) {
    $('#' + id).html(new Date(time + ' UTC').toLocaleString())
}
function Delegation(data, url, id) {
    $('#' + id).attr('disabled', true);
    $('#' + id).toggleClass('fa-trash-o fa-spinner fa-spin');
    if (!window.event) {
        window.event = arguments.callee.caller.arguments[0];
    }

    if (typeof window.event != "undefined") {
        if (window.event.target && window.event.target.type === 'button') {
            $(window.event.target).attr('button-clicked', true);
        }
        else if (window.event.type && window.event.type === 'button') {
            // For IE8 compatibility
            $(window.event.srcElement).attr('button-clicked', true);
        }
    }
    var _oData = {
        type: (typeof (httpMethodType) != "undefined") ? httpMethodType : "POST",
        url: url,
        data: data,
        beforeSend: CustomAjaxCallBeforeSendEvent,
        success: DelegateSuccessEvent,
        error: function (request, status, error) {
            processErrorMessage(["1", [generalErrorMessage + '.']], "#frm-delegate-user");
            try {
                if (typeof logMessageUrl != "undefined") {
                    $.ajax({
                        type: "POST",
                        url: logMessageUrl,
                        contentType: "application/json",
                        dataType: "json",
                        data: JSON.stringify({ message: 'Call from Custom_Ajax_Call - Status: ' + status + ', \nEmailId: ' + globalEmailId + ', \nStatusText: ' + error + ', \nResponseText: ' + htmlDecode(request.responseText) })
                    });
                }
            }
            catch (e) {
            }
        },
    };

    $.ajax({
        type: _oData.type,
        url: _oData.url,
        data: { id: _oData.data },
        success: _oData.success,
        complete: _oData.complete,
        context: _oData.context,
        dataType: "json"
    });
    return true;
}

function DelegateSuccessEvent(data) {
    if (data.Status && typeof (data.Result) != "undefined" && data.Result.length > 0 && data.ClientActionId == "ManageDelegates") {
        clearButtonProcessingState("#frm-delegate-user");
        document.getElementById('manageDelegates').innerHTML = data.Result;
        toLocalTime('delegateLocalTime');
        $('#add-user-button').attr('disabled', false);
        $('#delegate-id').val('');
        $('#delegate-id').attr('disabled', false);
        $("#cancel-button").prop('disabled', false);
        delegate_user_section_hide();
        $('#delegate-user-btn').attr('disabled', false);
    }
    else if (data.Status && typeof (data.Result) != "undefined" && data.Result.length > 0 && data.ClientActionId == "ManageServiceTags") {
        document.getElementById('manageServiceTags').innerHTML = data.Result;
        toLocalTime('tagLocalTime');
    }
    else {
        clearButtonProcessingState("#frm-delegate-user");
        $('#add-user-button').attr('disabled', false);
        $('#delegate-id').val('');
        $('#delegate-id').attr('disabled', false);
        $("#cancel-button").prop('disabled', false);
        delegate_user_section_hide();
        processErrorMessage(["1", [generalErrorMessage + '.']], "#frm-delegate-user");
    }
}

function toLocalTime(classname) {
    var list = document.getElementsByClassName(classname);
    for (var i = 0; i < list.length; i++) {
        document.getElementById(list[i].id).innerHTML = new Date(document.getElementById(list[i].id).innerHTML + ' UTC').toLocaleString();
    }
}

/// <summary>
/// Ajax before send call back event
/// </summary>
function CustomAjaxCallBeforeSendEvent(xhr) {
    if (fg === -1) { setFg(); }

    if (fg != -1) {
        xhr.setRequestHeader('X-Fingerprint', fg);
    }
    if (fg2 === -1 && enableCustomFingerPrint.toLowerCase() === "true") {
        setMonitorFg();
    }
    if (fg2 != -1) {
        xhr.setRequestHeader('x-DeviceId', fg2);
    }
    var formInstance = $("#" + $(this)[0]);
    getEmailId(formInstance);
    hideValidationSummary(formInstance);
    disableFormControls(formInstance, true);
    setSubmitButtonToProcessingState(formInstance);
}

function CustomAjaxCallBeforeSendEvent_New(xhr) {
    if (fg === -1) { setFg(); }

    if (fg != -1) {
        xhr.setRequestHeader('X-Fingerprint', fg);
    }

    if (fg2 === -1 && enableCustomFingerPrint.toLowerCase() === "true") { setMonitorFg(); }
    if (fg2 != -1) {
        xhr.setRequestHeader('x-DeviceId', fg2);
    }

    var formInstance = $("#" + $(this)[0]);
    getEmailId(formInstance);
    hideValidationSummary(formInstance);
    //disableFormControls(formInstance, true);
    setSubmitButtonToProcessingState(formInstance);
}

/// <summary>
/// Ajax success call back event
/// </summary>
function CustomAjaxCallSuccessEvent(data) {
    var formInstance = $("#" + $(this)[0]);
    if (typeof (data) != "undefined") {
        // To handle hash in the redirecturl
        if (window.location.hash) {
            data.Url += window.location.hash;
        }
        if (typeof (data.Status) != "undefined") {
            if (data.Status && typeof (data.IsModalData) != "undefined" && data.IsModalData) {
                if (typeof (data.Url) != "undefined" && data.Url.length > 0) {
                    var htmlData = "<div style=\"text-align:center;\">" + "Redirecting" + "</div>";
                    showBusyDialog(htmlData, 'modal-busy-text-dialog');
                    window.location.href = data.Url;
                }
            }
            else if (data.Status && typeof (data.Result) != "undefined" && data.Result.length > 0 && data.ClientActionId == "RenderAccessGroups") {
                clearButtonProcessingState("#frmSignIn");
                $("#sign-in-button").prop('disabled', true);
                document.getElementById('AGdropDown').innerHTML = data.Result;
            }
            else if (data.Status && typeof (data.Result) != "undefined" && data.Result.length > 0 && data.ClientActionId == "SecureId") {
                clearButtonProcessingState("#frmSignIn");
                $("#sign-in-button").prop('disabled', true);
                $("#forgot-password-for-sign-in").prop('hidden', true);
                $('#sign-in-password').removeClass('watermarkEnabled');
                document.getElementById('SecureIdPartial').innerHTML = data.Result;
                var script = document.createElement('script');
                script[(script.innerText === undefined ? "textContent" : "innerText")] = 'Place_Holder_Support(); RebindValidatorsForSecureId(); Initialize();';
                document.getElementById('SecureIdPartial').appendChild(script);
            }

            else if (data.Status && typeof (data.Result) != "undefined" && data.Result.length > 0 && data.ClientActionId == "ManageDelegates") {
                clearButtonProcessingState("#frm-delegate-user");
                document.getElementById('manageDelegates').innerHTML = data.Result;
                toLocalTime('delegateLocalTime');
                $('#add-user-button').attr('disabled', false);
                $('#delegate-id').val('');
                $('#delegate-id').attr('disabled', false);
                $("#cancel-button").prop('disabled', false);
                delegate_user_section_hide();
                $('#delegate-user-btn').attr('disabled', false);
            }           
            else if (data.Status && typeof (data.Result) != "undefined" && data.Result.length > 0) {
                $("#divResponseform").html('');
                $("#divResponseform").html(data.Result);
                var elementsName = ["wresult", "SAMLResponse"];
                for (index = 0; index < elementsName.length; index++) {
                    var elements = document.getElementsByName(elementsName[index]);
                    if (elements.length > 0) {
                        var frm = elements[0].form;
                        if (typeof (frm) != "undefined") {
                            frm.action += document.location.hash;
                            //frm.submit();
                            break;
                        }
                    }
                }
                if (data.NeedsPost && typeof formInstance[0] !== "undefined" && formInstance[0].id === "frm-account-opt-in") {
                    sendAnalyticsAccountRegistrationData(formInstance);
                }
            }
            else if (data.Status && typeof (data.Url) != "undefined" && data.Url.length > 0) {
                sendAnalyticsAccountRegistrationData(formInstance);
                if (data.IsRedirect === true) {
                    if (typeof formInstance[0] !== "undefined" ) {
                    if (typeof dellmetricsb2bTrack !== "undefined" && typeof dellmetricsb2bTrack === "function") {
                        var metricsmessage = formInstance[0].id === "frmOtpSignIn" ? "signinsuccess|otp" : "signinsuccess";
                        dellmetricsb2bTrack(metricsmessage);
                        }
                    }
                   
                    window.location.href = data.Url;
                }
                else {
                    return Custom_Ajax_Call(null, data.Url, true, 'GET');
                }
            }
            else if (data.Status && typeof (data.Messages) != "undefined" && data.Messages.length > 0 && typeof (data.Claims) != "undefined") {
                processErrorMessage([data.Claims, data.Messages], formInstance);
            }
            else if (data.Status && typeof (data.Messages) != "undefined" && data.Messages.length > 0) {
                if ($("#change-email-address-section", formInstance).length > 0) {
                    $("#read-only-email-address-label").text($("#EmailAddress").val());
                    $('#edit-account-button').show(function () {
                        $('#edit-account-btn').prop('disabled', true);
                    });
                    $('#change-email-address-section').hide();
                    $('#read-only-email-address-label').show();
                    $('#continue-button-section').show();
                    $('#edit-password-btn').prop('disabled', true);
                }
                else if ($("#change-password-section", formInstance).length > 0) {
                    $('#change-password-section').hide();
                    $('#edit-password-button').show(function () {
                        $('#edit-password-btn').prop('disabled', true);
                    });
                    $('#continue-button-section').show();
                    $('#edit-account-btn').prop('disabled', true);
                }
                else if (typeof (secondaryContinueButtonLabel) != "undefined") {
                    $(":input[type=submit],:input[type=button]:not(.btn-dont-register-click-event)", formInstance).each(function () {
                        $(this).attr('title', secondaryContinueButtonLabel);
                    });
                }

                processErrorMessage(["3", data.Messages], formInstance);

                if ($("#reset-password-section").length > 0) {
                    $('#NewPassword').prop('value', '');
                    $('#NewPassword').prop('disabled', true);
                    $('#ConfirmNewPassword').prop('value', '');
                    $('#ConfirmNewPassword').prop('disabled', true);
                    $('#reset_password_btn').prop('disabled', true);
                }
            }
            else if (typeof (data.FaultCode) != "undefined" && (data.FaultCode == "UpdateAccount")) {
                processErrorMessage(["2", data.Messages], formInstance);
                enableskipbutton();
            }

            else if (typeof (data.FaultCode) != "undefined" && data.FaultCode == "ForceRedirectFault") {
                processErrorMessage(["2", data.Messages], formInstance);
                DisplayOTBgenericerrors(data);
            }
            else if (typeof (data.FaultCode) != "undefined" && data.FaultCode == "ForcePasswordChangeFault") {
                $('#force-password-change-for-sign-in').html(data.Result);
                RequiredFunctionsToBeRunForPartialView(document);
                clearButtonProcessingState(formInstance);
                disableFormControls(formInstance, false);
            }
            else if (typeof (data.FaultCode) != "undefined" && data.FaultCode == "NoAccessGroupLinked") {
                clearButtonProcessingState('#frmSignIn');
                disableFormControls('#frmSignIn', false);
                processErrorMessage(["2", data.Messages], formInstance);
            }
            else if (typeof (data.FaultCode) != "undefined" && data.FaultCode == "CaptchaFault") {
                if (typeof getCaptcha != 'undefined' && typeof getCaptcha === 'function') {
                    if (typeof formInstance[0] !== "undefined") {
                        if (typeof dellmetricsb2bTrack !== "undefined" && typeof dellmetricsb2bTrack === "function") {
                            var message = formInstance[0].id === "frmOtpSignIn" ? "captchaFaulttriggered | otp" : "captchaFaulttriggered";
                            dellmetricsb2bTrack(message);
                        }
                    }
                    Dell.Captcha.OnRenderSuccess(ClearControlsAfterCaptcha);
                    getCaptcha([$(this)[0]]);
                    if (typeof (error) != "undefined") {
                        error = true;
                    }
                }
                Event.Trigger("showValidationSummary", ["1", data.Messages], formInstance);
            }
            else if (typeof (data.FaultCode) != "undefined" && data.FaultCode == "SystemForcedPasswordChangeFault") {
                processErrorMessage(["4", data.Messages], formInstance);
            }
            else {
                if (typeof (error) != "undefined") {
                    error = true;
                }
                processErrorMessage(["2", data.Messages], formInstance);
            }

            if (typeof (data.DisableCaptcha) != "undefined" && data.DisableCaptcha == true) {
                $("[id=captcha-section]").each(function (i, el) { $(this).empty() });
            }
            DisableCaptchaIfAccessGroupPresent();
        }
        else {
            clearButtonProcessingState(formInstance);
            disableFormControls(formInstance, false);
        }

        // Dais DC async here
        if (data.Status != undefined) {
            if (daisDCFormName == "frmSignIn" && dataAnalyticsMode == "async") {
                daisCD = makeDCObject(data.Status ? 1 : 0);
                var token = "";
                if ($("#" + "frmSignIn").children("input[name='reqT']").length === 1) {
                    token = $("#" + "frmSignIn").children("input[name='reqT']")[0].value;
                }
                if (token !== "") {
                    $.ajax({
                        type: "POST",
                        url: window.location.origin + "/identity/global/analytics",
                        data: {
                            reqT: token,
                            activityData: daisCD
                        },
                        success: function (d) {
                        },
                        error: function (d) {
                        }
                    });
                }
                initializeDaisDC();
            }
        }
    }
    else {
        processErrorMessage(["1", [generalErrorMessage]], formInstance);
        try {
            if (typeof logMessageUrl != "undefined") {
                $.ajax({
                    type: "POST",
                    url: logMessageUrl,
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify({ message: 'Call from CustomAjaxCallSuccessEvent - ajax data returned is null' })
                });
            }
        }
        catch (e) {
        }
    }
}

function RequiredFunctionsToBeRunForPartialView(content) {
    RebindValidators(content);
    Place_Holder_Support();
    ShowHide_Password_Characters_Support();
    To_Find_The_The_Button_Clicked();
}

/// <summary>
/// Makes a call to analytics.
/// </summary>
function sendAnalyticsAccountRegistrationData(formInstance) {
    Dell = window.Dell || {};
    Dell.Metrics = Dell.Metrics || {};
    Dell.Metrics.sc = Dell.Metrics.sc || {};
    Dell.Metrics.sc.registration = {};

    var eventData = window.event5 || 'event5';
    var isSubscribed = null;
    var isDellAdvantageOpted = null;

    if ($(":input#createAccountOptInCheckbox.dellmetrics-subscription", formInstance).length > 0) {
        isSubscribed = $("#createAccountOptInCheckbox").is(':checked');
        Dell.Metrics.sc.registration.subscription = isSubscribed;
    }

    if ($(":input#DellAdvantageOptInCheckbox", formInstance).length > 0) {
        isDellAdvantageOpted = $("#DellAdvantageOptInCheckbox").is(':checked');
        Dell.Metrics.sc.registration.advantage = isDellAdvantageOpted;
    }

    //Need to invoke method only if any one of subscription or DA checkbox is shown
    if (typeof stp_registrationMetrics === 'function' && (isSubscribed != null || isDellAdvantageOpted != null)) {
        Dell.Metrics.sc.registration.event5 = eventData;
        try {
            stp_registrationMetrics();
        } catch (e) {
        }
    }
}

function displayAlertMessageAfterSubmit(data) {
    if (data.target.localName != "undefined" && data.target.localName != "form" && typeof (this.form) != "undefined") {
        data.target = $("#" + this.form.id);
    }

    var errorList = $(data.target).data('validator').errorList;
    if (errorList.length > 0) {
        var errorMessage = [];
        for (var i = 0; i < errorList.length; i++) {
            if (errorMessage.indexOf(errorList[i].message) < 0) {
                errorMessage = errorMessage.concat(errorList[i].message);
            }
        }

        // Pass 1 for error message
        // Pass 2 for warning message
        data.parameters = [1, errorMessage];
        showValidationSummary(data);
    }
}

function showMe(sectionName, data) {
    if (data.checked) {
        $("#" + sectionName).show();
    }
    else {
        $("#" + sectionName).hide();
    }
}

function showPasswords(data) {
    $(":input[data-val-type=password]", data.form).each(function () {
        if (data.checked) {
            if (!supports_input_placeholder()) {
                $(this).hide();
            }
            else {
                $(this).prop('type', 'text');
            }
        }
        else {
            if (!supports_input_placeholder()) {
                $(this).show();
            }
            else {
                $(this).prop('type', 'password');
            }
        }
    });

    $(":input[data-val-type=visiblepassword]", data.form).each(function () {
        if (data.checked) {
            if (!supports_input_placeholder()) {
                $(this).show();
            }
        }
        else {
            if (!supports_input_placeholder()) {
                $(this).hide();
            }
        }
    });
}

function showValidationSummary(data) {
    var validationSummaryContainerObject = $(validationSummaryContainer, data.target)[0];
    $(validationSummaryContainerObject).focus();
    var validationSummaryImageObject = $(validationSummaryImage, data.target)[0];
    $(validationSummaryImageObject).removeClass('fa fa-exclamation-triangle fa-check-square fa-2x icon-small-alertinfo text-blue');
    if (data.parameters[0] == 1) {
        $(validationSummaryImageObject).addClass('fa fa-exclamation-triangle fa-2x');
    }
    else if (data.parameters[0] == 2) {
        $(validationSummaryImageObject).addClass('fa fa-exclamation-triangle fa-2x');
    }
    else if (data.parameters[0] == 3) {
        $(validationSummaryImageObject).addClass('fa fa-check-square fa-2x');
    }
    else if (data.parameters[0] == 4) {
        $(validationSummaryImageObject).addClass('icon-small-alertinfo text-blue');
    }

    var validationSummaryTextObject = $(validationSummaryText, data.target)[0];
    var errorMessage = data.parameters[1];
    $(validationSummaryTextObject).text('');

    var text = "";
    for (var Errorindex = 0; Errorindex < errorMessage.length; Errorindex++) {
        text += errorMessage[Errorindex].length ? errorMessage[Errorindex] + "<br/>" : "";
    }

    if (text.length > 0) {
        $(validationSummaryTextObject).append(text);
        $(validationSummaryContainerObject).show();
        $(":input.input-validation-error:first", data.target).focus();
    }
}

function hideValidationSummary(formInstance) {
    var validationSummaryContainerObject = $(validationSummaryContainer, formInstance)[0];
    // Hide the validation summary
    $(validationSummaryContainerObject).hide();

    // Clear the text inside the validation summary
    var validationSummaryTextObject = $(validationSummaryText, formInstance)[0];
    $(validationSummaryTextObject).text('');
}

/// <summary>
///
/// </summary>///
function processErrorMessage(data, formInstance) {

    if (typeof formInstance[0] !== "undefined") {
        if (typeof dellmetricsb2bTrack !== "undefined" && typeof dellmetricsb2bTrack === "function") {
            var message = formInstance[0].id === "frmOtpSignIn" ? "signinfail |otp" : "signinfail ";
            dellmetricsb2bTrack(message);
        }
    }

    Event.Trigger("showValidationSummary", data, formInstance);
    clearButtonProcessingState(formInstance);
    disableFormControls(formInstance, false);
    clearFormControlsOnError(formInstance);
    if ($("#divLoading").length > 0) {
        $("#divLoading").hide();
    }

    if (typeof (error) != "undefined") {
        if (($.parseJSON(error))) {
            ShowOTBErrors();
        }
    }
}

function ShowOTBErrors() {
    $("#passwordlbl").css({
        "color": "#FF3300",
        "font-weight": "bold"
    });
}

function DisplayOTBgenericerrors(data) {
    $('#sign-in-button').hide();
    $('#skip-button').show();
    $('#skip-button').click(function () { window.location = data.Url });

    $('#Password').css('border-color', '');
    $('#Password').css('border-width', '');
    $('#Password').css('border-width', '');

    $('#ImageText').css('border-color', '');
    $('#ImageText').css('border-width', '');
    $('#ImageText').css('border-width', '');

    $('#passwordlbl').css('color', '');
    $('#passwordlbl').css('font-weight', '');

    $("#Password").css({
        "border-color": "#777777;",
        "border-width": "1px;",
        "border-width": "solid;"
    });

    $("#ImageText").css({
        "border-color": "#777777;",
        "border-width": "1px;",
        "border-style": "solid;"
    });

    $("#passwordlbl").css({
        "color": "#444444;",
        "font-weight": "normal;"
    });

    $("#Password").disabled = true;
    $('#Password').attr('disabled', true);

    if ($("#btn-refresh-captcha").length > 0) {
        $('#btn-refresh-captcha').prop('disabled', true);
    }

    if ($("#ImageText").length > 0) {
        $('#ImageText').val("");
        $('#ImageText').attr('disabled', true);
    }

    if ($("#otb_change-password-button").length > 0) {
        $('#otb_change-password-button').prop('disabled', true);
    }
}

/// <summary>
/// To get the serialized form data based on formId
/// </summary>
function getFormData(formid) {
    evaluateExpression(formid);
    if (dataAnalyticsMode == 'sync') {
        if (daisCD == null) {
            daisCD = makeDCObject(-1);
        }
        writeDataCaptureObjectToForm(formid, daisCD);
        initializeDaisDC();
    }

    var formId = "#" + formid;

    var form = $(formId).serialize();
    // The below is concatenate the disabled control values to the serialize string
    $(formId + " input[disabled]").each(function () {
        form = form + "&" + $(this).attr("name") + "=" + $(this).val();
    });

    //Adding a unique value to resolve "response is served from cache" issue with IE
    //form = form + 'uniq_param :' + (new Date()).getTime();

    return form;
}

/// <summary>
/// To convert the submit button to processing button
/// </summary>
function setSubmitButtonToProcessingState(formInstance) {
    if ($(":input[button-clicked=true]", formInstance).length > 0) {
        $(":input[button-clicked=true]", formInstance).each(function () {
            $(this).addClass('btn-primary-processing');
            var width = $(this).css('width');
            $(this).text('');
            $(this).css('width', width);
        });
    }
    else {
        $(":input[type=submit]:not(.btn-dont-register-click-event)", formInstance).each(function () {
            if ($(this)[0].className.indexOf("otb-button") >= 0) {
                $(this).addClass('otb-button-processing');
            }
            else {
                $(this).addClass('btn-primary-processing');
            }

            var width = $(this).css('width');
            $(this).text('');
            $(this).css('width', width);
        });
    }
}

/// <summary>
/// To convert the processing button to submit button
/// </summary>
function clearButtonProcessingState(formInstance) {
    $(":input[type=submit],:input[type=button]:not(.btn-dont-register-click-event)", formInstance).each(function () {
        if ($(this)[0].className.indexOf("otb-button") >= 0) {
            $(this).removeClass('otb-button-processing');
        }
        else {
            $(this).removeClass('btn-primary-processing');
        }

        $(this).css('width', '');
        var titleValue = $(this).attr('title');
        $(this).text(titleValue);
        $(this).attr('button-clicked', '');
    });
}

/// <summary>
/// To disable all the controls on the form
/// </summary>
function disableFormControls(formInstance, IsDisable) {
    $(":input[type!=hidden]", formInstance).each(function (index, element) {
        element.disabled = IsDisable;
    });
}

/// <summary>
/// To clear all the controls with clear-on-error class
/// We leave the other controls as it is.
/// </summary>
function clearFormControlsOnError(formInstance) {
    jQuery('.clear-on-error').each(function () {
        this.value = '';
        fireEvent(this, 'onchange');
    });
}

function fireEvent(element, eventName) {
    if (document.createEvent) {
        var event = document.createEvent('Event');
        event.initEvent(eventName, true, true);
        element.dispatchEvent(event);
    } else {
        // dispatch for IE
        var evt = document.createEventObject();
        return element.fireEvent(event, evt);
    }
}

function NumericTextBox(event) {
    if ((event.keyCode == 86 && event.ctrlKey) ||// disable ctrl+v
        event.shiftKey
        || (event.keyCode >= 32 && event.keyCode <= 34) // disallow space page-up page-down
        || (event.keyCode >= 58 && event.keyCode <= 64) // disallow : ;  < = > ? @@
        || (!event.ctrlKey && event.keyCode >= 65 && event.keyCode <= 90) // disallow a to z
        || (event.keyCode >= 91 && event.keyCode <= 95) // disallow [\]^_`
        || event.keyCode >= 106) {
        event.preventDefault();
    }
}

function AlphanumericTextBox(event) {
    if ((event.keyCode == 86 && event.ctrlKey) || // disable ctrl+v
        event.shiftKey
        || (event.keyCode >= 32 && event.keyCode <= 34) // disallow space page-up page-down
        || (event.keyCode >= 58 && event.keyCode <= 64) // disallow : ;  < = > ? @@
        || (event.keyCode >= 91 && event.keyCode <= 96) // disallow [\]^_`
        || event.keyCode >= 106) {
        event.preventDefault();
    }
}

function htmlEncode(value) {
    return $('<div/>').text(value).html();
}

function htmlDecode(value) {
    return $('<div/>').html(value).text();
}

function getMetaValue(key) {
    var metas = document.getElementsByTagName('meta');
    for (i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute("name") == key) {
            return metas[i].getAttribute("content");
        }
    }

    return "";
}

function Event() {
}

/// <summary>
/// Event Subscriber
/// </summary>
Event.Listen = function (eventName, callback) {
    if (document.addEventListener) {
        $(document)[0].addEventListener(eventName, callback, false);
    } else {
        $(document)[0].attachEvent('onpropertychange', function (e) {
            if (e.eventType == eventName) {
                callback(e);
            }
        });
    }
};

/// <summary>
/// Event Publisher
/// </summary>
Event.Trigger = function (eventName, eventData, formInstance) {
    if (document.createEvent) {
        var event = document.createEvent('Event');
        event.initEvent(eventName, true, true);
        event.parameters = eventData;
        event.nodeName = eventName;
        if (typeof (formInstance) != "undefined" && formInstance.length > 0) {
            formInstance[0].dispatchEvent(event);
        }
        else {
            document.dispatchEvent(event);
        }
    } else {
        // For IE8 compatibility
        event = document.createEventObject(window.event);
        event.parameters = eventData;
        event.eventType = eventName;
        event.nodeName = eventName;
        event.target = formInstance;
        document.fireEvent("onpropertychange", event);
    }
};

/// <summary>
/// This Generic function used to make ASYNC Calls
/// </summary>
/// <param name="oData">This object will have property keys like {_type, _url, _data, _beforeSend, _success, _error, _complete, _dataType}</param>
function submitAjax(oData) {
    if ((typeof (oData) != "undefined")) {
        if ((typeof (oData.type) != "undefined") && (typeof (oData.url) != "undefined") && (typeof (oData.data) != "undefined") && (typeof (oData.success) == "function")) {
            var onErrorMethod;
            if ((oData.error == "undefined") || (typeof (oData.error) != "function")) {
                onErrorMethod = function (request, status, error) {
                    RaiseEvent("showValidationSummary", ["1", [generalErrorMessage]]);
                    try {
                        if (typeof logMessageUrl != "undefined") {
                            $.ajax({
                                type: "POST",
                                url: logMessageUrl,
                                contentType: "application/json",
                                dataType: "json",
                                data: JSON.stringify({ message: 'Call from Custom_Ajax_Call - Status: ' + status + ', \nEmailId: ' + globalEmailId + ', \nStatusText: ' + error + ', \nResponseText: ' + htmlDecode(request.responseText) })
                            });
                        }
                    }
                    catch (e) {
                    }
                };
            }
            else {
                onErrorMethod = oData.error;
            }
            $.ajax({
                type: oData.type,
                url: oData.url,
                data: oData.data,
                beforeSend: oData.beforeSend,
                success: oData.success,
                error: onErrorMethod,
                complete: oData.complete,
                context: oData.context
            });
        }
    }

    return false;
}

function GetModifiedUrl(lang) {
    var newQS = "", qsItem = [], path, pathArray, qs, qsItem;
    var fullUrl = window.location.href;
    pathArray = fullUrl.split("?");
    if (pathArray.length > 1) {
        path = pathArray[0];
        qs = pathArray[1].split("&");
        for (var i = 0; i < qs.length; i++) {
            qsItem = qs[i].split('=');
            if (qsItem[0] != undefined && qsItem[1] != undefined && qsItem[0] != "l" && qsItem[0] != "L") {
                newQS = newQS + qsItem[0] + "=" + qsItem[1];
                if (i != qs.length) newQS = newQS + "&";
            }
        }
        if (newQS != "") {
            var ampersandChar = newQS.substr(newQS.length - 1);
            if (ampersandChar == "&") {
                newQS = newQS + "l=" + lang;
            }
            else {
                newQS = newQS + "&l=" + lang;
            }
        }
        else {
            newQS = newQS + "l=" + lang;
        }
    }
    else {
        path = fullUrl;
        var languageItem = "l=" + lang;
        newQS = languageItem;
    }
    return path.concat("?", newQS);
}

function PageLoad(ele) {
    var lang = ele;
    var modifiedPath = GetModifiedUrl(lang);
    window.location = modifiedPath;
}

function GetQueryStringParamValue(queryStringKey) {
    var parsedParameters = {};
    var uriParameters = location.search.substr(1).split('&');
    var paramValue = "";

    for (var i = 0; i < uriParameters.length; i++) {
        var parameter = uriParameters[i].split('=');
        parsedParameters[parameter[0]] = decodeURIComponent(parameter[1]);
    }

    queryStringKey = queryStringKey.toLowerCase();
    for (key in parsedParameters) {
        if (key.toLowerCase() == queryStringKey) {
            paramValue = parsedParameters[key];
            break;
        }
    }
    return paramValue;
}

function processErrorMessage_New(data, formInstance) {
    Event.Trigger("showValidationSummary", data, formInstance);
    clearButtonProcessingState(formInstance);
    //disableFormControls(formInstance, false);
    clearFormControlsOnError(formInstance);
    if ($("#divLoading").length > 0) {
        $("#divLoading").hide();
    }

    if (typeof (error) != "undefined") {
        if (($.parseJSON(error))) {
            ShowOTBErrors();
        }
    }
}

function CustomAjaxCallSuccessEvent_New(data) {
    var formInstance = $("#" + $(this)[0]);
    if (typeof (data) != "undefined") {
        // To handle hash in the redirecturl
        if (window.location.hash) {
            data.Url += window.location.hash;
        }
        if (typeof (data.Status) != "undefined") {
            if (data.Status && typeof (data.IsModalData) != "undefined" && data.IsModalData) {
                if (typeof (data.Url) != "undefined" && data.Url.length > 0) {
                    var htmlData = "<div style=\"text-align:center;\">" + "Redirecting" + "</div>";
                    showBusyDialog(htmlData, 'modal-busy-text-dialog');
                    window.location.href = data.Url;
                }
            }
            else if (data.Status && typeof (data.Result) != "undefined" && data.Result.length > 0 && data.ClientActionId == "RenderAccessGroups") {
                clearButtonProcessingState("#frmSignIn");
                $("#sign-in-button").prop('disabled', true);
                document.getElementById('AGdropDown').innerHTML = data.Result;
            }
            else if (data.Status && typeof (data.Url) != "undefined" && data.Url.length > 0) {
                sendAnalyticsAccountRegistrationData(formInstance);
                if (data.IsRedirect == true) {
                    window.location.href = data.Url;
                }
                else {
                    return Custom_Ajax_Call(null, data.Url, true, 'GET');
                }
            }
            else if (data.Status && typeof (data.Result) != "undefined" && data.Result.length > 0) {
                $("#divResponseform").html('');
                $("#divResponseform").html(data.Result);
                var elementsName = ["wresult", "SAMLResponse"];
                for (index = 0; index < elementsName.length; index++) {
                    var elements = document.getElementsByName(elementsName[index]);
                    if (elements.length > 0) {
                        var frm = elements[0].form;
                        if (typeof (frm) != "undefined") {
                            frm.action += document.location.hash;
                            //frm.submit();
                            break;
                        }
                    }
                }
            }
            else if (data.Status && typeof (data.Messages) != "undefined" && data.Messages.length > 0 && typeof (data.Claims) != "undefined") {
                processErrorMessage_New([data.Claims, data.Messages], formInstance);
            }
            else if (data.Status && typeof (data.Messages) != "undefined" && data.Messages.length > 0) {
                if ($("#change-email-address-section", formInstance).length > 0) {
                    $("#read-only-email-address-label").text($("#EmailAddress").val());
                    $('#edit-account-button').show(function () {
                        $('#edit-account-btn').prop('disabled', true);
                    });
                    $('#change-email-address-section').hide();
                    $('#read-only-email-address-label').show();
                    $('#continue-button-section').show();
                    $('#edit-password-btn').prop('disabled', true);
                }
                else if ($("#change-password-section", formInstance).length > 0) {
                    $('#change-password-section').hide();
                    $('#edit-password-button').show(function () {
                        $('#edit-password-btn').prop('disabled', true);
                    });
                    $('#continue-button-section').show();
                    $('#edit-account-btn').prop('disabled', true);
                }
                else if (typeof (secondaryContinueButtonLabel) != "undefined") {
                    $(":input[type=submit],:input[type=button]:not(.btn-dont-register-click-event)", formInstance).each(function () {
                        $(this).attr('title', secondaryContinueButtonLabel);
                    });
                }

                processErrorMessage_New(["3", data.Messages], formInstance);

                if ($("#reset-password-section").length > 0) {
                    $('#NewPassword').prop('value', '');
                    $('#NewPassword').prop('disabled', true);
                    $('#ConfirmNewPassword').prop('value', '');
                    $('#ConfirmNewPassword').prop('disabled', true);
                    $('#reset_password_btn').prop('disabled', true);
                }
            }
            else if (typeof (data.FaultCode) != "undefined" && data.FaultCode == "ForceRedirectFault") {
                processErrorMessage_New(["2", data.Messages], formInstance);
                DisplayOTBgenericerrors(data);
            }
            else if (typeof (data.FaultCode) != "undefined" && data.FaultCode == "ForcePasswordChangeFault") {
                $('#force-password-change-for-sign-in').html(data.Result);
                RequiredFunctionsToBeRunForPartialView(document);
                clearButtonProcessingState(formInstance);
                disableFormControls(formInstance, false);
            }
            else if (typeof (data.FaultCode) != "undefined" && data.FaultCode == "NoAccessGroupLinked") {
                clearButtonProcessingState('#frmSignIn');
                disableFormControls('#frmSignIn', false);
                processErrorMessage_New(["2", data.Messages], formInstance);
            }
            else if (typeof (data.FaultCode) != "undefined" && data.FaultCode == "CaptchaFault") {
                if (typeof getCaptcha != 'undefined' && typeof getCaptcha === 'function') {
                    Dell.Captcha.OnRenderSuccess(ClearControlsAfterCaptcha);
                    getCaptcha([$(this)[0]]);
                    if (typeof (error) != "undefined") {
                        error = true;
                    }
                }
                Event.Trigger("showValidationSummary", ["1", data.Messages], formInstance);
            }
            else {
                if (typeof (error) != "undefined") {
                    error = true;
                }
                processErrorMessage_New(["2", data.Messages], formInstance);
            }

            if (typeof (data.DisableCaptcha) != "undefined" && data.DisableCaptcha == true) {
                $("[id=captcha-section]").each(function (i, el) { $(this).empty() });
            }
        }
        else {
            clearButtonProcessingState(formInstance);
            if (dataToBeUsed == "Phone") {
                $("#phone-otp").prop('disabled', false);
                $("#phno-resend-otp").prop('disabled', false);
                $("#phone-verify-otp").prop('disabled', false);
            }
            else if (dataToBeUsed == "Email") {
                $("#email-otp").prop('disabled', false);
                $("#email-resend-otp").prop('disabled', false);
                $("#email-verify-otp").prop('disabled', false);
            }
            else if (dataToBeUsed == "PhoneNumber") {
                $("#phone-otp").prop('disabled', true);
                $("#phno-resend-otp").prop('disabled', true);
                $("#phone-verify-otp").prop('disabled', true);
            }
            else if (dataToBeUsed == "EmailAddress") {
                $("#email-otp").prop('disabled', true);
                $("#email-resend-otp").prop('disabled', true);
                $("#email-verify-otp").prop('disabled', true);
            }
            //disableFormControls(formInstance, false);
        }
    }
    else {
        processErrorMessage_New(["1", [generalErrorMessage]], formInstance);
        try {
            if (typeof logMessageUrl != "undefined") {
                $.ajax({
                    type: "POST",
                    url: logMessageUrl,
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify({ message: 'Call from CustomAjaxCallSuccessEvent - ajax data returned is null' })
                });
            }
        }
        catch (e) {
        }
    }
}

var dataToBeUsed;
function Custom_Ajax_Call_New(type, dataFromForm, formId, url, skipValidation, httpMethodType) {
    var formInstance = $("#" + formId);
    dataToBeUsed = type;
    if (!window.event) {
        window.event = arguments.callee.caller.arguments[0];
    }

    if (typeof window.event != "undefined") {
        if (window.event.target && window.event.target.type === 'button') {
            $(window.event.target).attr('button-clicked', true);
        }
        else if (window.event.type && window.event.type === 'button') {
            // For IE8 compatibility
            $(window.event.srcElement).attr('button-clicked', true);
        }
    }
    if ((typeof (skipValidation) != undefined && skipValidation == true) || (typeof (formInstance.validate()) != "undefined") && formInstance.validate().form()) {
        var _oData = {
            type: (typeof (httpMethodType) != "undefined") ? httpMethodType : "POST",
            url: url,
            data: dataFromForm,
            beforeSend: CustomAjaxCallBeforeSendEvent_New,
            success: CustomAjaxCallSuccessEvent_New,
            error: function (request, status, error) {
                processErrorMessage_New(["1", [generalErrorMessage + '.']], formInstance);
                try {
                    if (typeof logMessageUrl != "undefined") {
                        $.ajax({
                            type: "POST",
                            url: logMessageUrl,
                            contentType: "application/json",
                            dataType: "json",
                            data: JSON.stringify({ message: 'Call from Custom_Ajax_Call - Status: ' + status + ', \nEmailId: ' + globalEmailId + ', \nStatusText: ' + error + ', \nResponseText: ' + htmlDecode(request.responseText) })
                        });
                    }
                }
                catch (e) {
                }
            },
            dataType: "html",
            context: [formId]
        };

        submitAjax(_oData);
    }

    return false;
}

//for show password-button toggle
$('.toggle-password').click(function () {
    $(this).addClass("hide");
    if ($(this).hasClass("show-button")) {
        $(this).siblings('.hide-button').removeClass("hide");
    }
    else {
        $(this).siblings('.show-button').removeClass("hide");
    }
    var input = $($(this).attr('toggle'));
    if (input.attr('type') == 'password') {
        input.attr('type', 'text');
    } else {
        input.attr('type', 'password');
    }
});

function disableEmailVerification(data) {
    var formInstance = $("#" + $(this)[0]);
    processErrorMessage(["2", data.Messages], formInstance);
    if (typeof (data.FaultCode) != "undefined" && data.FaultCode == "AttemptExceededEmailVerificationLink") {
        disableEmailVerificationLink();
        $("#description").hide();
    }
}

//methods for data capture-analytics

var start = null,
    dais_kc = null,
    dais_ks = [],
    dais_ct = [],
    dais_dct = [],
    dais_mc = [],
    daisDCFormName = null;
var daisCD = null;
var dataAnalyticsMode = "disabled";
var start_p = null,
    start_e = null;

function toCategory(temp) {
    class3 = [8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36,
        37, 38, 39, 40, 44, 45, 46]
    class2 = [];
    for (i = 65; i <= 91; i++) {
        class2[class2.length] = i;
    }
    class1 = [192, 219, 221, 220, 59, 222, 188,
        189, 191, 96, 97, 98, 99, 100, 102, 103];

    if (class1.indexOf(temp) > -1)
        return 1;
    else if (class2.indexOf(temp) > -1)
        return 2;
    else if (class3.indexOf(temp) > -1)
        return 3;
    else
        return 4;
}
function initializeDaisDC() {
    start = null,
        dais_ks = [],
        dais_ct = [],
        dais_dct = [],
        dais_mc = [],
        daisCD = null;
}

function handleNull(inputObj) {
    if (inputObj === null) {
        return 0;
    }
    else {
        return inputObj.getTime();
    }
}

function getDC(maxLength) {
    if (maxLength == undefined | maxLength == 0) {
        maxLength = 500;
    }
    initializeDaisDC();
    $("#EmailAddress").keydown(function (event) {
        start_e = new Date();
        dais_kc = event.which || event.keyCode;
    });

    $("#EmailAddress").keyup(function () {
        var finish = new Date();
        var dais_st = handleNull(start_e);
        var dais_ft = handleNull(finish);

        if (dais_ks.length < maxLength) {
            dais_ks[dais_ks.length] = [dais_st, dais_ft, toCategory(dais_kc), 0];
        }
    });

    $("#EmailAddress").click(function () {
        var z = new Date();
        var inFieldClickTime = handleNull(z);
        dais_ct[dais_ct.length] = [inFieldClickTime, 0];
    });

    $("#EmailAddress").dblclick(function () {
        var z = new Date();
        var in_dblclick_time = handleNull(z);
        dais_dct[dais_dct.length] = [in_dblclick_time, 0];
    });

    $("#Password").keydown(function (event) {
        start_p = new Date();
        dais_kc = event.which || event.keyCode;
    });

    $("#Password").keyup(function () {
        var finish = new Date();
        var startTime = handleNull(start_p);
        var finishTime = handleNull(finish);
        if (dais_ks.length < maxLength) {
            dais_ks[dais_ks.length] = [startTime, finishTime, toCategory(dais_kc), 1];
        }
    });

    $("#Password").click(function () {
        var z = new Date();
        var inFieldClickTime = handleNull(z);

        dais_ct[dais_ct.length] = [inFieldClickTime, 1];
    });

    $("#Password").dblclick(function () {
        var z = new Date();
        var in_dblclick_time = handleNull(z);
        dais_dct[dais_dct.length] = [in_dblclick_time, 1];
    });

    $(document).mousemove(function (event) {
        var x = event.clientX;
        var y = event.clientY;
        var z = event.timeStamp;
        var dais_c = [x, y, z];
        if (dais_mc.length < maxLength) {
            dais_mc[dais_mc.length] = dais_c;
        }
    });

    $(document).dblclick(function () {
        var z = new Date();
        var dblclick_time = handleNull(z);
        dais_dct[dais_dct.length] = [dblclick_time, 0];
    });

    $(document).click(function () {
        var z = new Date();
        var click_time = handleNull(z);
        dais_ct[dais_ct.length] = [click_time, 0];
    });
}

function makeDCObject(dais_a) {
    var daisCD = JSON.stringify({
        "DaisMC": dais_mc,
        "DaisKS": dais_ks,
        "DaisCT": dais_ct,
        "DaisDCT": dais_dct,
        "DaisE": $('#EmailAddress').val(),
        "DaisA": dais_a
    });
    //base64 encoding
    var encoded = btoa(daisCD);
    //var encoded = new Buffer.from(daisCD).toString("base64");
    return encoded;
}

function getEmailId(formInstance) {
    if (typeof (formInstance) != "undefined" && formInstance != null && formInstance[0] != null) {
        var buttonClick = formInstance[0]["id"];
        globalEmailId = "";
        switch (buttonClick) {
            case "frm-forgot-password":
                globalEmailId = $('#ForgotPasswordEmailAddress').val()
                break;
            case "frmSignIn":
                globalEmailId = $('#EmailAddress').val()
                break;
            case "frmCreateAccount":
                globalEmailId = $('#CreateAccountEmailAddress').val()
                break;
            default:
                "";
        }
        return globalEmailId;
    }
}

function getExcludesComponents(excludesCom) {
    excludesComponents = "";
    var excludesComJsonStrig = '[{';
    excludesCom = excludesCom.split(',');
    for (var i = 0; i < excludesCom.length; i++) {
        excludesComJsonStrig += '"' + excludesCom[i] + '":' + true + ',';
    }
    excludesComJsonStrig = excludesComJsonStrig.substr(0, excludesComJsonStrig.length - 1);
    excludesComJsonStrig += '}]';
    excludesComponents = JSON.parse(excludesComJsonStrig);
    if (excludesComponents !== null && excludesComponents.length > 0 && excludesComponents[0] !== null) {
        options = {
            excludes: excludesComponents[0]
        }
    }
}

function handleKeyPressEvent(event, id) {
    var keycode = event.keyCode;
    //keycode 32 handles spacebar event.
    if (event.keyCode === 32) {
        event.preventDefault(); // Default action is to navigate to the bottom of the page and hence disabling it.
        document.getElementById(id).click();
    }

    //keycode 13 is to handle keyboard enter event.
    if (event.keyCode === 13) {
        document.getElementById(id).click();
    }
}
$(document).ready(function () {
    // To hide extra label when browser supports placeholder
    Place_Holder_Support()
    ShowHide_Password_Characters_Support();
    Support_ClassList();
});

function Place_Holder_Support() {
    if (supports_input_placeholder()) {
        jQuery('.watermarkEnabled').each(function () {
            var self = jQuery(this);
            self.hide();
        });
    }
}

function ShowHide_Password_Characters_Support() {
    if (!supports_input_placeholder()) {
        // IE8 does not support the change of type property of an input element. So the below patch code to support IE8
        $(":input[data-val-type=password]", document).each(function () {
            var passwordField = $(this);
            var visiblePasswordField = $(document.createElement('input')).attr({
                name: 'visible' + passwordField.attr('name'),
                id: 'visible' + passwordField.attr('id'),
                value: passwordField.val(),
                type: 'text',
                'data-val-type': 'visiblepassword'
            });

            var attributesCount = passwordField[0].attributes.length;
            for (var attributeIndex = 0; attributeIndex < attributesCount; attributeIndex++) {
                var attribute = passwordField[0].attributes[attributeIndex];
                if (attribute != null && (attribute.name != "id" && attribute.name != "type" && attribute.name != "name" && attribute.name != "data-val-type")) {
                    visiblePasswordField.attr(attribute.name, attribute.value);
                }
            }

            passwordField.after(visiblePasswordField);
            visiblePasswordField.hide();

            // To update the value from the password field to the hidden text version of the password field
            passwordField.keyup(function () {
                if ($(this).val() != visiblePasswordField.val()) {
                    visiblePasswordField.val($(this).val())
                }
            });

            // To update the value from the text version of the password field field to the actual password field
            visiblePasswordField.keyup(function () {
                if ($(this).val() != passwordField.val()) {
                    passwordField.val($(this).val())
                }

                passwordField.keyup();
            });

            // To add the validation span for the newly added input field
            var validationSpan = $("span[data-valmsg-for=" + $(this).attr('name') + "]");
            var newValidationSpan = validationSpan.clone(false).attr('data-valmsg-for', 'visible' + $(this).attr('name'));
            $(this).after(newValidationSpan);
        });

        // Rebind validators to newly added input elements
        RebindValidators(document);
    }
}

// Rebind appropriate validators for all the elements in the form
function RebindValidators(content) {
    $(content).find("form").each(function () {
        $(this).removeData("validator").removeData("unobtrusiveValidation");
        $.validator.unobtrusive.parse($(this));
    });
}

function RebindValidatorsForSecureId() {
    $(document).find("form").each(function () {
        $(this).removeData("validator").removeData("unobtrusiveValidation");
        $.validator.unobtrusive.parse($(this));
    });
}

// Check if browser supports HTML5 input placeholder
function supports_input_placeholder() {
    var i = document.createElement('input');
    return 'placeholder' in i;
}

// Classlist implementation for IE8/9
function Support_ClassList() {
    if ("document" in self) {
        // Full polyfill for browsers with no classList support
        if (!("classList" in document.createElement("_"))) {
            (function (view) {
                "use strict";

                if (!('Element' in view)) return;

                var
                      classListProp = "classList"
                    , protoProp = "prototype"
                    , elemCtrProto = view.Element[protoProp]
                    , objCtr = Object
                    , strTrim = String[protoProp].trim || function () {
                        return this.replace(/^\s+|\s+$/g, "");
                    }
                    , arrIndexOf = Array[protoProp].indexOf || function (item) {
                        var
                              i = 0
                            , len = this.length
                        ;
                        for (; i < len; i++) {
                            if (i in this && this[i] === item) {
                                return i;
                            }
                        }
                        return -1;
                    }
                    // Vendors: please allow content code to instantiate DOMExceptions
                    , DOMEx = function (type, message) {
                        this.name = type;
                        this.code = DOMException[type];
                        this.message = message;
                    }
                    , checkTokenAndGetIndex = function (classList, token) {
                        if (token === "") {
                            throw new DOMEx(
                                  "SYNTAX_ERR"
                                , "An invalid or illegal string was specified"
                            );
                        }
                        if (/\s/.test(token)) {
                            throw new DOMEx(
                                  "INVALID_CHARACTER_ERR"
                                , "String contains an invalid character"
                            );
                        }
                        return arrIndexOf.call(classList, token);
                    }
                    , ClassList = function (elem) {
                        var
                              trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
                            , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
                            , i = 0
                            , len = classes.length
                        ;
                        for (; i < len; i++) {
                            this.push(classes[i]);
                        }
                        this._updateClassName = function () {
                            elem.setAttribute("class", this.toString());
                        };
                    }
                    , classListProto = ClassList[protoProp] = []
                    , classListGetter = function () {
                        return new ClassList(this);
                    }
                ;
                // Most DOMException implementations don't allow calling DOMException's toString()
                // on non-DOMExceptions. Error's toString() is sufficient here.
                DOMEx[protoProp] = Error[protoProp];
                classListProto.item = function (i) {
                    return this[i] || null;
                };
                classListProto.contains = function (token) {
                    token += "";
                    return checkTokenAndGetIndex(this, token) !== -1;
                };
                classListProto.add = function () {
                    var
                          tokens = arguments
                        , i = 0
                        , l = tokens.length
                        , token
                        , updated = false
                    ;
                    do {
                        token = tokens[i] + "";
                        if (checkTokenAndGetIndex(this, token) === -1) {
                            this.push(token);
                            updated = true;
                        }
                    }
                    while (++i < l);

                    if (updated) {
                        this._updateClassName();
                    }
                };
                classListProto.remove = function () {
                    var
                          tokens = arguments
                        , i = 0
                        , l = tokens.length
                        , token
                        , updated = false
                        , index
                    ;
                    do {
                        token = tokens[i] + "";
                        index = checkTokenAndGetIndex(this, token);
                        while (index !== -1) {
                            this.splice(index, 1);
                            updated = true;
                            index = checkTokenAndGetIndex(this, token);
                        }
                    }
                    while (++i < l);

                    if (updated) {
                        this._updateClassName();
                    }
                };
                classListProto.toggle = function (token, force) {
                    token += "";

                    var
                          result = this.contains(token)
                        , method = result ?
                            force !== true && "remove"
                        :
                            force !== false && "add"
                    ;

                    if (method) {
                        this[method](token);
                    }

                    if (force === true || force === false) {
                        return force;
                    } else {
                        return !result;
                    }
                };
                classListProto.toString = function () {
                    return this.join(" ");
                };

                if (objCtr.defineProperty) {
                    var classListPropDesc = {
                        get: classListGetter
                        , enumerable: true
                        , configurable: true
                    };
                    try {
                        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                    } catch (ex) { // IE 8 doesn't support enumerable:true
                        if (ex.number === -0x7FF5EC54) {
                            classListPropDesc.enumerable = false;
                            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                        }
                    }
                } else if (objCtr[protoProp].__defineGetter__) {
                    elemCtrProto.__defineGetter__(classListProp, classListGetter);
                }
            }(self));
        } else {
            // There is full or partial native classList support, so just check if we need
            // to normalize the add/remove and toggle APIs.

            (function () {
                "use strict";

                var testElement = document.createElement("_");

                testElement.classList.add("c1", "c2");

                // Polyfill for IE 10/11 and Firefox <26, where classList.add and
                // classList.remove exist but support only one argument at a time.
                if (!testElement.classList.contains("c2")) {
                    var createMethod = function (method) {
                        var original = DOMTokenList.prototype[method];

                        DOMTokenList.prototype[method] = function (token) {
                            var i, len = arguments.length;

                            for (i = 0; i < len; i++) {
                                token = arguments[i];
                                original.call(this, token);
                            }
                        };
                    };
                    createMethod('add');
                    createMethod('remove');
                }

                testElement.classList.toggle("c3", false);

                // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
                // support the second argument.
                if (testElement.classList.contains("c3")) {
                    var _toggle = DOMTokenList.prototype.toggle;

                    DOMTokenList.prototype.toggle = function (token, force) {
                        if (1 in arguments && !this.contains(token) === !force) {
                            return force;
                        } else {
                            return _toggle.call(this, token);
                        }
                    };
                }

                testElement = null;
            }());
        }
    }
}
var socialSignInModal = '#social-sign-in-modal',
    modalDialog = '#modal-dialog',
    modalHeader = '#modal-header',
    modalBody = '#modal-body',
    modalFooter = '#modal-footer',
    socialSignInSection = '#social-sign-in-section';

function processSocialMediaUser(eventObj) {
    if (typeof (eventObj.user) != "undefined") {
        //social media auditing. UserAccount already exists
        if (typeof (dellmetrics_sso) != "undefined") {
            dellmetrics_sso(eventObj.context + "-modal");
        }

        var image = "<img src=\"" + loadingAnimationUrl + "\" alt\"Loading\" style=\"vertical-align: middle;\">";
        showBusyDialog(image, 'modal-busy-icon-dialog');
        var _oData = {
            type: "POST",
            url: socialSignInUrl,
            data: {
                //'context': JSON.stringify(eventObj.user.identities[eventObj.context])

                'context': JSON.stringify(eventObj.user)
            },
            error: function (data) {
                bindDataToDialogAndShow(data, 'modal-busy-icon-dialog');
            },
            success: CustomAjaxCallSuccessEvent,
            dataType: "html",
            context: ["noform"]
        };

        submitAjax(_oData);
    }

    return false;
}

function prefillSocialMediaUserInformation(eventObj) {
    var obj = null;
    if (typeof (eventObj.user) != "undefined") {
        obj = eventObj.user.identities[eventObj.context];
    }
    else if (JSON.parse(eventObj) != "undefined") {
        var userobj = JSON.parse(eventObj);
        obj = userobj.identities[userobj.LoginProvider];

    }

    if (obj != undefined) {

        var firstName = document.getElementById("FirstName");
        if (firstName != null) {
            firstName.value = obj[getPropCaseInsensitive(obj,"firstname")];
            firstName.focus();
        }

        var lastName = document.getElementById("LastName");
        if (lastName != null) {
            lastName.value = obj[getPropCaseInsensitive(obj, "lastname")];
            lastName.focus();
        }

        var emailAddress = document.getElementById("CreateAccountEmailAddress");
        if (emailAddress != null) {
            emailAddress.value = obj[getPropCaseInsensitive(obj, "email")];
        }

        var isFocusSet = false;
        $("input[type!=hidden]", document).each(function () {
            if ($(this).val() == "" && !isFocusSet) {
                $(this).focus();
                isFocusSet = true;
            }
        });
    }
}

function getPropCaseInsensitive(obj, key) {
    var props = Object.getOwnPropertyNames(obj);
    var lkey;
    if (props != undefined) {
        for (var i = 0; i < props.length; i++) {
            if ((props[i] != undefined && props[i].toLowerCase() == key)) {
                lkey = props[i];
                break;
            }
        }
    }
    return lkey;
}


function showBusyDialog(data, className) {
    $(modalHeader).hide();
    var content = $(socialSignInModal).find("#modal-body");
    content.html("");
    content.html(data);
    $(modalDialog).removeClass('modal-busy-icon-dialog').removeClass('modal-busy-text-dialog').removeClass('modal-text-dialog').addClass(className);
    $(socialSignInModal).modal('show');
}

function bindDataToDialogAndShow(data, className) {
    var header = $(socialSignInModal).find("#modal-title");
    header.html("");
    header.html($(data).find("#title").text());
    var content = $(socialSignInModal).find("#modal-body");
    $(modalHeader).show();
    content.html("");
    content.html(data);
    if ($(content).find("form").length > 0) {
        $(content).find("form").each(function () {
            $(":input[type=password]", this).each(function () {
                $(this).attr('data-val-type', $(this).attr('type'));
            });

            $(this).bind("submit", displayAlertMessageAfterSubmit);
        });

        RequiredFunctionsToBeRunForPartialView(content);
    }

    $(modalDialog).removeClass('modal-busy-icon-dialog').removeClass('modal-busy-text-dialog').removeClass('modal-text-dialog').addClass(className);
    $(socialSignInModal).modal('show');
}
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch (e) { }
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {
        // Write

        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }

            return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {};

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }

        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };
}));
if (typeof Object.create !== "function") {
    Object.create = function (e) {
        function t() { }
        t.prototype = e;
        return new t
    }
}
var ua = {
    toString: function () {
        return navigator.userAgent
    },
    test: function (e) {
        return this.toString().toLowerCase().indexOf(e.toLowerCase()) > -1
    }
};
ua.version = (ua.toString().toLowerCase().match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1];
ua.webkit = ua.test("webkit");
ua.gecko = ua.test("gecko") && !ua.webkit;
ua.opera = ua.test("opera");
ua.ie = ua.test("msie") && !ua.opera;
ua.ie6 = ua.ie && document.compatMode && typeof document.documentElement.style.maxHeight === "undefined";
ua.ie7 = ua.ie && document.documentElement && typeof document.documentElement.style.maxHeight !== "undefined" && typeof XDomainRequest === "undefined";
ua.ie8 = ua.ie && typeof XDomainRequest !== "undefined";
var domReady = function () {
    var e = [];
    var t = function () {
        if (!arguments.callee.done) {
            arguments.callee.done = true;
            for (var t = 0; t < e.length; t++) {
                e[t]()
            }
        }
    };
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", t, false)
    }
    if (ua.ie) {
        (function () {
            try {
                document.documentElement.doScroll("left")
            } catch (e) {
                setTimeout(arguments.callee, 50);
                return
            }
            t()
        })();
        document.onreadystatechange = function () {
            if (document.readyState === "complete") {
                document.onreadystatechange = null;
                t()
            }
        }
    }
    if (ua.webkit && document.readyState) {
        (function () {
            if (document.readyState !== "loading") {
                t()
            } else {
                setTimeout(arguments.callee, 10)
            }
        })()
    }
    window.onload = t;
    return function (t) {
        if (typeof t === "function") {
            e[e.length] = t
        }
        return t
    }
}();
var cssHelper = function () {
    var e = {
        BLOCKS: /[^\s{;][^{;]*\{(?:[^{}]*\{[^{}]*\}[^{}]*|[^{}]*)*\}/g,
        BLOCKS_INSIDE: /[^\s{][^{]*\{[^{}]*\}/g,
        DECLARATIONS: /[a-zA-Z\-]+[^;]*:[^;]+;/g,
        RELATIVE_URLS: /url\(['"]?([^\/\)'"][^:\)'"]+)['"]?\)/g,
        REDUNDANT_COMPONENTS: /(?:\/\*([^*\\\\]|\*(?!\/))+\*\/|@import[^;]+;)/g,
        REDUNDANT_WHITESPACE: /\s*(,|:|;|\{|\})\s*/g,
        WHITESPACE_IN_PARENTHESES: /\(\s*(\S*)\s*\)/g,
        MORE_WHITESPACE: /\s{2,}/g,
        FINAL_SEMICOLONS: /;\}/g,
        NOT_WHITESPACE: /\S+/g
    };
    var t, n = false;
    var r = [];
    var s = function (e) {
        if (typeof e === "function") {
            r[r.length] = e
        }
    };
    var o = function () {
        for (var e = 0; e < r.length; e++) {
            r[e](t)
        }
    };
    var u = {};
    var a = function (e, t) {
        if (u[e]) {
            var n = u[e].listeners;
            if (n) {
                for (var r = 0; r < n.length; r++) {
                    n[r](t)
                }
            }
        }
    };
    var f = function (e, t, n) {
        if (ua.ie && !window.XMLHttpRequest) {
            window.XMLHttpRequest = function () {
                return new ActiveXObject("Microsoft.XMLHTTP")
            }
        }
        if (!XMLHttpRequest) {
            return ""
        }
        var r = new XMLHttpRequest;
        try {
            r.open("get", e, true);
            r.setRequestHeader("X_REQUESTED_WITH", "XMLHttpRequest")
        } catch (i) {
            n();
            return
        }
        var s = false;
        setTimeout(function () {
            s = true
        }, 5e3);
        document.documentElement.style.cursor = "progress";
        r.onreadystatechange = function () {
            if (r.readyState === 4 && !s) {
                if (!r.status && location.protocol === "file:" || r.status >= 200 && r.status < 300 || r.status === 304 || navigator.userAgent.indexOf("Safari") > -1 && typeof r.status === "undefined") {
                    t(r.responseText)
                } else {
                    n()
                }
                document.documentElement.style.cursor = "";
                r = null
            }
        };
        r.send("")
    };
    var l = function (t) {
        t = t.replace(e.REDUNDANT_COMPONENTS, "");
        t = t.replace(e.REDUNDANT_WHITESPACE, "$1");
        t = t.replace(e.WHITESPACE_IN_PARENTHESES, "($1)");
        t = t.replace(e.MORE_WHITESPACE, " ");
        t = t.replace(e.FINAL_SEMICOLONS, "}");
        return t
    };
    var c = {
        stylesheet: function (t) {
            var n = {};
            var r = [],
                i = [],
                s = [],
                o = [];
            var u = t.cssHelperText;
            var a = t.getAttribute("media");
            if (a) {
                var f = a.toLowerCase().split(",")
            } else {
                var f = ["all"]
            }
            for (var l = 0; l < f.length; l++) {
                r[r.length] = c.mediaQuery(f[l], n)
            }
            var h = u.match(e.BLOCKS);
            if (h !== null) {
                for (var l = 0; l < h.length; l++) {
                    if (h[l].substring(0, 7) === "@media ") {
                        var p = c.mediaQueryList(h[l], n);
                        s = s.concat(p.getRules());
                        i[i.length] = p
                    } else {
                        s[s.length] = o[o.length] = c.rule(h[l], n, null)
                    }
                }
            }
            n.element = t;
            n.getCssText = function () {
                return u
            };
            n.getAttrMediaQueries = function () {
                return r
            };
            n.getMediaQueryLists = function () {
                return i
            };
            n.getRules = function () {
                return s
            };
            n.getRulesWithoutMQ = function () {
                return o
            };
            return n
        },
        mediaQueryList: function (t, n) {
            var r = {};
            var i = t.indexOf("{");
            var s = t.substring(0, i);
            t = t.substring(i + 1, t.length - 1);
            var o = [],
                u = [];
            var a = s.toLowerCase().substring(7).split(",");
            for (var f = 0; f < a.length; f++) {
                o[o.length] = c.mediaQuery(a[f], r)
            }
            var l = t.match(e.BLOCKS_INSIDE);
            if (l !== null) {
                for (f = 0; f < l.length; f++) {
                    u[u.length] = c.rule(l[f], n, r)
                }
            }
            r.type = "mediaQueryList";
            r.getMediaQueries = function () {
                return o
            };
            r.getRules = function () {
                return u
            };
            r.getListText = function () {
                return s
            };
            r.getCssText = function () {
                return t
            };
            return r
        },
        mediaQuery: function (t, n) {
            t = t || "";
            var r, i;
            if (n.type === "mediaQueryList") {
                r = n
            } else {
                i = n
            }
            var s = false,
                o;
            var u = [];
            var a = true;
            var f = t.match(e.NOT_WHITESPACE);
            for (var l = 0; l < f.length; l++) {
                var c = f[l];
                if (!o && (c === "not" || c === "only")) {
                    if (c === "not") {
                        s = true
                    }
                } else if (!o) {
                    o = c
                } else if (c.charAt(0) === "(") {
                    var h = c.substring(1, c.length - 1).split(":");
                    u[u.length] = {
                        mediaFeature: h[0],
                        value: h[1] || null
                    }
                }
            }
            return {
                getQueryText: function () {
                    return t
                },
                getAttrStyleSheet: function () {
                    return i || null
                },
                getList: function () {
                    return r || null
                },
                getValid: function () {
                    return a
                },
                getNot: function () {
                    return s
                },
                getMediaType: function () {
                    return o
                },
                getExpressions: function () {
                    return u
                }
            }
        },
        rule: function (e, t, n) {
            var r = {};
            var i = e.indexOf("{");
            var s = e.substring(0, i);
            var o = s.split(",");
            var u = [];
            var a = e.substring(i + 1, e.length - 1).split(";");
            for (var f = 0; f < a.length; f++) {
                u[u.length] = c.declaration(a[f], r)
            }
            r.getStylesheet = function () {
                return t || null
            };
            r.getMediaQueryList = function () {
                return n || null
            };
            r.getSelectors = function () {
                return o
            };
            r.getSelectorText = function () {
                return s
            };
            r.getDeclarations = function () {
                return u
            };
            r.getPropertyValue = function (e) {
                for (var t = 0; t < u.length; t++) {
                    if (u[t].getProperty() === e) {
                        return u[t].getValue()
                    }
                }
                return null
            };
            return r
        },
        declaration: function (e, t) {
            var n = e.indexOf(":");
            var r = e.substring(0, n);
            var i = e.substring(n + 1);
            return {
                getRule: function () {
                    return t || null
                },
                getProperty: function () {
                    return r
                },
                getValue: function () {
                    return i
                }
            }
        }
    };
    var h = function (e) {
        if (typeof e.cssHelperText !== "string") {
            return
        }
        var n = {
            stylesheet: null,
            mediaQueryLists: [],
            rules: [],
            selectors: {},
            declarations: [],
            properties: {}
        };
        var r = n.stylesheet = c.stylesheet(e);
        var s = n.mediaQueryLists = r.getMediaQueryLists();
        var o = n.rules = r.getRules();
        var u = n.selectors;
        var a = function (e) {
            var t = e.getSelectors();
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                if (!u[r]) {
                    u[r] = []
                }
                u[r][u[r].length] = e
            }
        };
        for (i = 0; i < o.length; i++) {
            a(o[i])
        }
        var f = n.declarations;
        for (i = 0; i < o.length; i++) {
            f = n.declarations = f.concat(o[i].getDeclarations())
        }
        var l = n.properties;
        for (i = 0; i < f.length; i++) {
            var h = f[i].getProperty();
            if (!l[h]) {
                l[h] = []
            }
            l[h][l[h].length] = f[i]
        }
        e.cssHelperParsed = n;
        t[t.length] = e;
        return n
    };
    var p = function (e, t) {
        return;
        e.cssHelperText = l(t || e.innerHTML);
        return h(e)
    };
    var d = function () {
        n = true;
        t = [];
        var r = [];
        var i = function () {
            for (var e = 0; e < r.length; e++) {
                h(r[e])
            }
            var t = document.getElementsByTagName("style");
            for (e = 0; e < t.length; e++) {
                p(t[e])
            }
            n = false;
            o()
        };
        var s = document.getElementsByTagName("link");
        for (var u = 0; u < s.length; u++) {
            var a = s[u];
            if (a.getAttribute("rel").indexOf("style") > -1 && a.href && a.href.length !== 0 && !a.disabled) {
                r[r.length] = a
            }
        }
        if (r.length > 0) {
            var c = 0;
            var d = function () {
                c++;
                if (c === r.length) {
                    i()
                }
            };
            var v = function (t) {
                var n = t.href;
                f(n, function (r) {
                    r = l(r).replace(e.RELATIVE_URLS, "url(" + n.substring(0, n.lastIndexOf("/")) + "/$1)");
                    t.cssHelperText = r;
                    d()
                }, d)
            };
            for (u = 0; u < r.length; u++) {
                v(r[u])
            }
        } else {
            i()
        }
    };
    var v = {
        stylesheets: "array",
        mediaQueryLists: "array",
        rules: "array",
        selectors: "object",
        declarations: "array",
        properties: "object"
    };
    var m = {
        stylesheets: null,
        mediaQueryLists: null,
        rules: null,
        selectors: null,
        declarations: null,
        properties: null
    };
    var g = function (e, t) {
        if (m[e] !== null) {
            if (v[e] === "array") {
                return m[e] = m[e].concat(t)
            } else {
                var n = m[e];
                for (var r in t) {
                    if (t.hasOwnProperty(r)) {
                        if (!n[r]) {
                            n[r] = t[r]
                        } else {
                            n[r] = n[r].concat(t[r])
                        }
                    }
                }
                return n
            }
        }
    };
    var y = function (e) {
        m[e] = v[e] === "array" ? [] : {};
        for (var n = 0; n < t.length; n++) {
            var r = e === "stylesheets" ? "stylesheet" : e;
            g(e, t[n].cssHelperParsed[r])
        }
        return m[e]
    };
    var b = function (e) {
        if (typeof window.innerWidth != "undefined") {
            return window["inner" + e]
        } else if (typeof document.documentElement !== "undefined" && typeof document.documentElement.clientWidth !== "undefined" && document.documentElement.clientWidth != 0) {
            return document.documentElement["client" + e]
        }
    };
    return {
        addStyle: function (e, t, n) {
            var r = document.createElement("style");
            r.setAttribute("type", "text/css");
            if (t && t.length > 0) {
                r.setAttribute("media", t.join(","))
            }
            document.getElementsByTagName("head")[0].appendChild(r);
            if (r.styleSheet) {
                r.styleSheet.cssText = e
            } else {
                r.appendChild(document.createTextNode(e))
            }
            r.addedWithCssHelper = true;
            if (typeof n === "undefined" || n === true) {
                cssHelper.parsed(function (t) {
                    var n = p(r, e);
                    for (var i in n) {
                        if (n.hasOwnProperty(i)) {
                            g(i, n[i])
                        }
                    }
                    a("newStyleParsed", r)
                })
            } else {
                r.parsingDisallowed = true
            }
            return r
        },
        removeStyle: function (e) {
            return e.parentNode.removeChild(e)
        },
        parsed: function (e) {
            if (n) {
                s(e)
            } else {
                if (typeof t !== "undefined") {
                    if (typeof e === "function") {
                        e(t)
                    }
                } else {
                    s(e);
                    d()
                }
            }
        },
        stylesheets: function (e) {
            cssHelper.parsed(function (t) {
                e(m.stylesheets || y("stylesheets"))
            })
        },
        mediaQueryLists: function (e) {
            cssHelper.parsed(function (t) {
                e(m.mediaQueryLists || y("mediaQueryLists"))
            })
        },
        rules: function (e) {
            cssHelper.parsed(function (t) {
                e(m.rules || y("rules"))
            })
        },
        selectors: function (e) {
            cssHelper.parsed(function (t) {
                e(m.selectors || y("selectors"))
            })
        },
        declarations: function (e) {
            cssHelper.parsed(function (t) {
                e(m.declarations || y("declarations"))
            })
        },
        properties: function (e) {
            cssHelper.parsed(function (t) {
                e(m.properties || y("properties"))
            })
        },
        broadcast: a,
        addListener: function (e, t) {
            if (typeof t === "function") {
                if (!u[e]) {
                    u[e] = {
                        listeners: []
                    }
                }
                u[e].listeners[u[e].listeners.length] = t
            }
        },
        removeListener: function (e, t) {
            if (typeof t === "function" && u[e]) {
                var n = u[e].listeners;
                for (var r = 0; r < n.length; r++) {
                    if (n[r] === t) {
                        n.splice(r, 1);
                        r -= 1
                    }
                }
            }
        },
        getViewportWidth: function () {
            return b("Width")
        },
        getViewportHeight: function () {
            return b("Height")
        }
    }
}();
domReady(function () {
    var t;
    var n = {
        LENGTH_UNIT: /[0-9]+(em|ex|px|in|cm|mm|pt|pc)$/,
        RESOLUTION_UNIT: /[0-9]+(dpi|dpcm)$/,
        ASPECT_RATIO: /^[0-9]+\/[0-9]+$/,
        ABSOLUTE_VALUE: /^[0-9]*(\.[0-9]+)*$/
    };
    var r = [];
    var i = function () {
        var e = "css3-mediaqueries-test";
        var t = document.createElement("div");
        t.id = e;
        var n = cssHelper.addStyle("@media all and (width) { #" + e + " { width: 1px !important; } }", [], false);
        document.body.appendChild(t);
        var r = t.offsetWidth === 1;
        n.parentNode.removeChild(n);
        t.parentNode.removeChild(t);
        i = function () {
            return r
        };
        return r
    };
    var s = function () {
        t = document.createElement("div");
        t.style.cssText = "position:absolute;top:-9999em;left:-9999em;" + "margin:0;border:none;padding:0;width:1em;font-size:1em;";
        document.body.appendChild(t);
        if (t.offsetWidth !== 16) {
            t.style.fontSize = 16 / t.offsetWidth + "em"
        }
        t.style.width = ""
    };
    var o = function (e) {
        t.style.width = e;
        var n = t.offsetWidth;
        t.style.width = "";
        return n
    };
    var u = function (e, t) {
        var r = e.length;
        var i = e.substring(0, 4) === "min-";
        var s = !i && e.substring(0, 4) === "max-";
        if (t !== null) {
            var u;
            var a;
            if (n.LENGTH_UNIT.exec(t)) {
                u = "length";
                a = o(t)
            } else if (n.RESOLUTION_UNIT.exec(t)) {
                u = "resolution";
                a = parseInt(t, 10);
                var f = t.substring((a + "").length)
            } else if (n.ASPECT_RATIO.exec(t)) {
                u = "aspect-ratio";
                a = t.split("/")
            } else if (n.ABSOLUTE_VALUE) {
                u = "absolute";
                a = t
            } else {
                u = "unknown"
            }
        }
        var l, c;
        if ("device-width" === e.substring(r - 12, r)) {
            l = screen.width;
            if (t !== null) {
                if (u === "length") {
                    return i && l >= a || s && l < a || !i && !s && l === a
                } else {
                    return false
                }
            } else {
                return l > 0
            }
        } else if ("device-height" === e.substring(r - 13, r)) {
            c = screen.height;
            if (t !== null) {
                if (u === "length") {
                    return i && c >= a || s && c < a || !i && !s && c === a
                } else {
                    return false
                }
            } else {
                return c > 0
            }
        } else if ("width" === e.substring(r - 5, r)) {
            l = document.documentElement.clientWidth || document.body.clientWidth;
            if (t !== null) {
                if (u === "length") {
                    return i && l >= a || s && l < a || !i && !s && l === a
                } else {
                    return false
                }
            } else {
                return l > 0
            }
        } else if ("height" === e.substring(r - 6, r)) {
            c = document.documentElement.clientHeight || document.body.clientHeight;
            if (t !== null) {
                if (u === "length") {
                    return i && c >= a || s && c < a || !i && !s && c === a
                } else {
                    return false
                }
            } else {
                return c > 0
            }
        } else if ("device-aspect-ratio" === e.substring(r - 19, r)) {
            return u === "aspect-ratio" && screen.width * a[1] === screen.height * a[0]
        } else if ("color-index" === e.substring(r - 11, r)) {
            var h = Math.pow(2, screen.colorDepth);
            if (t !== null) {
                if (u === "absolute") {
                    return i && h >= a || s && h < a || !i && !s && h === a
                } else {
                    return false
                }
            } else {
                return h > 0
            }
        } else if ("color" === e.substring(r - 5, r)) {
            var p = screen.colorDepth;
            if (t !== null) {
                if (u === "absolute") {
                    return i && p >= a || s && p < a || !i && !s && p === a
                } else {
                    return false
                }
            } else {
                return p > 0
            }
        } else if ("resolution" === e.substring(r - 10, r)) {
            var d;
            if (f === "dpcm") {
                d = o("1cm")
            } else {
                d = o("1in")
            }
            if (t !== null) {
                if (u === "resolution") {
                    return i && d >= a || s && d < a || !i && !s && d === a
                } else {
                    return false
                }
            } else {
                return d > 0
            }
        } else {
            return false
        }
    };
    var a = function (e) {
        var t = e.getValid();
        var n = e.getExpressions();
        var r = n.length;
        if (r > 0) {
            for (var i = 0; i < r && t; i++) {
                t = u(n[i].mediaFeature, n[i].value)
            }
            var s = e.getNot();
            return t && !s || s && !t
        }
        return t
    };
    var f = function (e, t) {
        var n = e.getMediaQueries();
        var i = {};
        for (var s = 0; s < n.length; s++) {
            var o = n[s].getMediaType();
            if (n[s].getExpressions().length === 0) {
                continue
            }
            var u = true;
            if (o !== "all" && t && t.length > 0) {
                u = false;
                for (var f = 0; f < t.length; f++) {
                    if (t[f] === o) {
                        u = true
                    }
                }
            }
            if (u && a(n[s])) {
                i[o] = true
            }
        }
        var l = [],
            c = 0;
        for (var h in i) {
            if (i.hasOwnProperty(h)) {
                if (c > 0) {
                    l[c++] = ","
                }
                l[c++] = h
            }
        }
        if (l.length > 0) {
            r[r.length] = cssHelper.addStyle("@media " + l.join("") + "{" + e.getCssText() + "}", t, false)
        }
    };
    var l = function (e, t) {
        for (var n = 0; n < e.length; n++) {
            f(e[n], t)
        }
    };
    var c = function (e) {
        var t = e.getAttrMediaQueries();
        var n = false;
        var i = {};
        for (var s = 0; s < t.length; s++) {
            if (a(t[s])) {
                i[t[s].getMediaType()] = t[s].getExpressions().length > 0
            }
        }
        var o = [],
            u = [];
        for (var f in i) {
            if (i.hasOwnProperty(f)) {
                o[o.length] = f;
                if (i[f]) {
                    u[u.length] = f
                }
                if (f === "all") {
                    n = true
                }
            }
        }
        if (u.length > 0) {
            r[r.length] = cssHelper.addStyle(e.getCssText(), u, false)
        }
        var c = e.getMediaQueryLists();
        if (n) {
            l(c)
        } else {
            l(c, o)
        }
    };
    var h = function (e) {
        for (var t = 0; t < e.length; t++) {
            c(e[t])
        }
        if (ua.ie) {
            document.documentElement.style.display = "block";
            setTimeout(function () {
                document.documentElement.style.display = ""
            }, 0);
            setTimeout(function () {
                cssHelper.broadcast("cssMediaQueriesTested")
            }, 100)
        } else {
            cssHelper.broadcast("cssMediaQueriesTested")
        }
    };
    var p = function () {
        for (var e = 0; e < r.length; e++) {
            cssHelper.removeStyle(r[e])
        }
        r = [];
        cssHelper.stylesheets(h)
    };
    var d = 0;
    var v = function () {
        var e = cssHelper.getViewportWidth();
        var t = cssHelper.getViewportHeight();
        if (ua.ie) {
            var n = document.createElement("div");
            n.style.position = "absolute";
            n.style.top = "-9999em";
            n.style.overflow = "scroll";
            document.body.appendChild(n);
            d = n.offsetWidth - n.clientWidth;
            document.body.removeChild(n)
        }
        var r;
        var s = function () {
            var n = cssHelper.getViewportWidth();
            var s = cssHelper.getViewportHeight();
            if (Math.abs(n - e) > d || Math.abs(s - t) > d) {
                e = n;
                t = s;
                clearTimeout(r);
                r = setTimeout(function () {
                    if (!i()) {
                        p()
                    } else {
                        cssHelper.broadcast("cssMediaQueriesTested")
                    }
                }, 500)
            }
        };
        window.onresize = function () {
            var e = window.onresize || function () { };
            return function () {
                e();
                s()
            }
        }()
    };
    var m = document.documentElement;
    m.style.marginLeft = "-32767px";
    setTimeout(function () {
        m.style.marginLeft = ""
    }, 5e3);
    return function () {
        if (!i()) {
            cssHelper.addListener("newStyleParsed", function (e) {
                c(e.cssHelperParsed.stylesheet)
            });
            cssHelper.addListener("cssMediaQueriesTested", function () {
                if (ua.ie) {
                    m.style.width = "1px"
                }
                setTimeout(function () {
                    m.style.width = "";
                    m.style.marginLeft = ""
                }, 0);
                cssHelper.removeListener("cssMediaQueriesTested", arguments.callee)
            });
            s();
            p()
        } else {
            m.style.marginLeft = ""
        }
        v()
    }
}());
try {
    document.execCommand("BackgroundImageCache", false, true)
} catch (e) { }
var onSuccessfullLoginEvent = null, onUserCancelledLoginEvent = null, onLoginException = null; var newWindow = null;

// To open a popup window for social login
function OpenPopupWindow(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}

// Popup close event
function PopupWindowClosedEvent(status, userProfile) {
    if (typeof status != "undefined" && status == true && typeof userProfile != "undefined") {
        if (typeof onSuccessfullLoginEvent != 'undefined' && typeof onSuccessfullLoginEvent === 'function') {
            onSuccessfullLoginEvent(userProfile);
        }
    }
    else if (typeof status != "undefined" && status == false) {
        if (typeof onUserCancelledLoginEvent != 'undefined' && typeof onUserCancelledLoginEvent === 'function') {
            onUserCancelledLoginEvent();
        }
    }
}

// To add event handlers
Dell.Social = {
    Login: function (parameters) {
        onSuccessfullLoginEvent = parameters["callback"];

        if (parameters["windowMode"] === 'self') {
            window.location.href = parameters["authenticateUrl"];
        }
        else {
            OpenPopupWindow(parameters["authenticateUrl"], '_blank', '500', '500');
        }

        if (parameters["provider"] == "wechat")
        {
            weChatCheckUserStatusUrl = parameters["weChatCheckUserStatusUrl"];
            weChatPostUserScanUrl = parameters["weChatPostUserScanUrl"];
            intervalId = setInterval(weChatCheckStatus, 2000, weChatCheckUserStatusUrl, weChatPostUserScanUrl, newWindow);
        }
    },
}
var onCaptchaRenderSuccess = null, onCaptchaRenderFailure = null;

// To add custom client callback function
Dell.Captcha = {
    OnRenderSuccess: function (callback) {
        onCaptchaRenderSuccess = callback;
    },
    OnRenderFailure: function (callback) {
        onCaptchaRenderFailure = callback;
    }
}

var getCaptcha = function (customContext) {
    if (typeof captchaUrl != "undefined" && captchaUrl != null) {
        $.ajax({
            cache: false,
            context: customContext,
            type: "get",
            url: captchaUrl,
            success: function () {
                captchaSuccess.apply(this, arguments);
                if (typeof onCaptchaRenderSuccess != 'undefined' && typeof onCaptchaRenderSuccess === 'function') {
                    onCaptchaRenderSuccess.apply(this, arguments);
                }
            },
            error: function () {
                if (typeof onCaptchaRenderFailure != 'undefined' && typeof onCaptchaRenderFailure === 'function') {
                    onCaptchaRenderFailure.apply(this, arguments);
                }
            }
        });
    }
};

var captchaSuccess = function (data) {
    if (typeof data != "undefined" && typeof data.Status != "undefined" && data.Status && typeof data.Result != "undefined") {
        var parentElement = $("#" + $(this)[0]);
        if (parentElement.length == 1 && $(parentElement).find('#captcha-section').length == 1) {
            $(parentElement).find('#captcha-section').html(data.Result);
        }
        RebindValidatorsForCaptcha();
        PlaceholderSupportForCaptcha();
    }
};

// Rebind appropriate validators for all the elements in the form
function RebindValidatorsForCaptcha() {
    $(document).find("form").each(function () {
        $(this).removeData("validator").removeData("unobtrusiveValidation");
        $.validator.unobtrusive.parse($(this));
    });
}

function PlaceholderSupportForCaptcha() {
    if (BrowserSupportsPlaceholderForCaptcha()) {
        jQuery('.watermarkEnabled').each(function () {
            var self = jQuery(this);
            self.hide();
        });
    }
}

// Check if browser supports HTML5 input placeholder
function BrowserSupportsPlaceholderForCaptcha() {
    var i = document.createElement('input');
    return 'placeholder' in i;
}

function DisableCaptchaIfAccessGroupPresent()
{
    var accessGroupLength = $('#AccessGroup').length;
    if (accessGroupLength > 0)
    {
        $('#captcha-section').addClass('display-none');
    }
}
$(document).ready(function () {
    try {
        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

        var classNames = classNamesToBeDynamicallyBlockedInDom.split(",");

        var observer = new MutationObserver(function (mutations, observer) {
            mutations.forEach(function (mutation) {
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    for (var j = 0 ; j < classNames.length; j++) {
                        if (typeof classNames[j] != "undefined" && classNames[j] != '') {
                            if ($(mutation.addedNodes[0]).find("." + classNames[j]).length > 0) {
                                mutation.addedNodes[0].innerHTML = '';

                                console.log('Dynamically injected element with classname [' + classNames[j] + '] has been deleted.');

                                break;
                            }
                        }
                    }
                }
            })
        });

        observer.observe(document.body, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        });
    }
    catch (e) {
    }

    // To test above code, uncomment below code :-)
    //var a = document.createElement("script");
    //a.src = 'http://localhost.dell.com/favicon.ico';
    //document.body.insertBefore(a, document.body.firstChild);
    // a = document.createElement("script");
    //a.src = 'http://nexus.ensighten.com/favicon.ico';
    //document.body.insertBefore(a, document.body.firstChild);
    // a = document.createElement("script");
    //a.src = 'https://nexus.ensighten.com/favicon.ico';
    //document.body.insertBefore(a, document.body.firstChild);
    //var span = document.createElement('div');
    //var inner1Span = document.createElement('div');
    //var inner2Span = document.createElement('div');
    //inner2Span.innerHTML = 'Something';
    //inner2Span.className = 'da-myaccount da-myaccount1';

    //inner1Span.appendChild(inner2Span);
    //span.appendChild(inner1Span);

    //document.getElementById('captcha-section').appendChild(span);
});
/*
* Fingerprintjs2 2.1.0 - Modern & flexible browser fingerprint library v2
* https://github.com/Valve/fingerprintjs2
* Copyright (c) 2015 Valentin Vasilyev (valentin.vasilyev@outlook.com)
* Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL VALENTIN VASILYEV BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
* THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/* global define */
(function (name, context, definition) {
	'use strict'
	if (typeof window !== 'undefined' && typeof define === 'function' && define.amd) { define(definition) } else if (typeof module !== 'undefined' && module.exports) { module.exports = definition() } else if (context.exports) { context.exports = definition() } else { context[name] = definition() }
})('Fingerprint2', this, function () {
	'use strict'

	/// MurmurHash3 related functions

	//
	// Given two 64bit ints (as an array of two 32bit ints) returns the two
	// added together as a 64bit int (as an array of two 32bit ints).
	//
	var x64Add = function (m, n) {
		m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff]
		n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff]
		var o = [0, 0, 0, 0]
		o[3] += m[3] + n[3]
		o[2] += o[3] >>> 16
		o[3] &= 0xffff
		o[2] += m[2] + n[2]
		o[1] += o[2] >>> 16
		o[2] &= 0xffff
		o[1] += m[1] + n[1]
		o[0] += o[1] >>> 16
		o[1] &= 0xffff
		o[0] += m[0] + n[0]
		o[0] &= 0xffff
		return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]]
	}

	//
	// Given two 64bit ints (as an array of two 32bit ints) returns the two
	// multiplied together as a 64bit int (as an array of two 32bit ints).
	//
	var x64Multiply = function (m, n) {
		m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff]
		n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff]
		var o = [0, 0, 0, 0]
		o[3] += m[3] * n[3]
		o[2] += o[3] >>> 16
		o[3] &= 0xffff
		o[2] += m[2] * n[3]
		o[1] += o[2] >>> 16
		o[2] &= 0xffff
		o[2] += m[3] * n[2]
		o[1] += o[2] >>> 16
		o[2] &= 0xffff
		o[1] += m[1] * n[3]
		o[0] += o[1] >>> 16
		o[1] &= 0xffff
		o[1] += m[2] * n[2]
		o[0] += o[1] >>> 16
		o[1] &= 0xffff
		o[1] += m[3] * n[1]
		o[0] += o[1] >>> 16
		o[1] &= 0xffff
		o[0] += (m[0] * n[3]) + (m[1] * n[2]) + (m[2] * n[1]) + (m[3] * n[0])
		o[0] &= 0xffff
		return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]]
	}
	//
	// Given a 64bit int (as an array of two 32bit ints) and an int
	// representing a number of bit positions, returns the 64bit int (as an
	// array of two 32bit ints) rotated left by that number of positions.
	//
	var x64Rotl = function (m, n) {
		n %= 64
		if (n === 32) {
			return [m[1], m[0]]
		} else if (n < 32) {
			return [(m[0] << n) | (m[1] >>> (32 - n)), (m[1] << n) | (m[0] >>> (32 - n))]
		} else {
			n -= 32
			return [(m[1] << n) | (m[0] >>> (32 - n)), (m[0] << n) | (m[1] >>> (32 - n))]
		}
	}
	//
	// Given a 64bit int (as an array of two 32bit ints) and an int
	// representing a number of bit positions, returns the 64bit int (as an
	// array of two 32bit ints) shifted left by that number of positions.
	//
	var x64LeftShift = function (m, n) {
		n %= 64
		if (n === 0) {
			return m
		} else if (n < 32) {
			return [(m[0] << n) | (m[1] >>> (32 - n)), m[1] << n]
		} else {
			return [m[1] << (n - 32), 0]
		}
	}
	//
	// Given two 64bit ints (as an array of two 32bit ints) returns the two
	// xored together as a 64bit int (as an array of two 32bit ints).
	//
	var x64Xor = function (m, n) {
		return [m[0] ^ n[0], m[1] ^ n[1]]
	}
	//
	// Given a block, returns murmurHash3's final x64 mix of that block.
	// (`[0, h[0] >>> 1]` is a 33 bit unsigned right shift. This is the
	// only place where we need to right shift 64bit ints.)
	//
	var x64Fmix = function (h) {
		h = x64Xor(h, [0, h[0] >>> 1])
		h = x64Multiply(h, [0xff51afd7, 0xed558ccd])
		h = x64Xor(h, [0, h[0] >>> 1])
		h = x64Multiply(h, [0xc4ceb9fe, 0x1a85ec53])
		h = x64Xor(h, [0, h[0] >>> 1])
		return h
	}

	//
	// Given a string and an optional seed as an int, returns a 128 bit
	// hash using the x64 flavor of MurmurHash3, as an unsigned hex.
	//
	var x64hash128 = function (key, seed) {
		key = key || ''
		seed = seed || 0
		var remainder = key.length % 16
		var bytes = key.length - remainder
		var h1 = [0, seed]
		var h2 = [0, seed]
		var k1 = [0, 0]
		var k2 = [0, 0]
		var c1 = [0x87c37b91, 0x114253d5]
		var c2 = [0x4cf5ad43, 0x2745937f]
		for (var i = 0; i < bytes; i = i + 16) {
			k1 = [((key.charCodeAt(i + 4) & 0xff)) | ((key.charCodeAt(i + 5) & 0xff) << 8) | ((key.charCodeAt(i + 6) & 0xff) << 16) | ((key.charCodeAt(i + 7) & 0xff) << 24), ((key.charCodeAt(i) & 0xff)) | ((key.charCodeAt(i + 1) & 0xff) << 8) | ((key.charCodeAt(i + 2) & 0xff) << 16) | ((key.charCodeAt(i + 3) & 0xff) << 24)]
			k2 = [((key.charCodeAt(i + 12) & 0xff)) | ((key.charCodeAt(i + 13) & 0xff) << 8) | ((key.charCodeAt(i + 14) & 0xff) << 16) | ((key.charCodeAt(i + 15) & 0xff) << 24), ((key.charCodeAt(i + 8) & 0xff)) | ((key.charCodeAt(i + 9) & 0xff) << 8) | ((key.charCodeAt(i + 10) & 0xff) << 16) | ((key.charCodeAt(i + 11) & 0xff) << 24)]
			k1 = x64Multiply(k1, c1)
			k1 = x64Rotl(k1, 31)
			k1 = x64Multiply(k1, c2)
			h1 = x64Xor(h1, k1)
			h1 = x64Rotl(h1, 27)
			h1 = x64Add(h1, h2)
			h1 = x64Add(x64Multiply(h1, [0, 5]), [0, 0x52dce729])
			k2 = x64Multiply(k2, c2)
			k2 = x64Rotl(k2, 33)
			k2 = x64Multiply(k2, c1)
			h2 = x64Xor(h2, k2)
			h2 = x64Rotl(h2, 31)
			h2 = x64Add(h2, h1)
			h2 = x64Add(x64Multiply(h2, [0, 5]), [0, 0x38495ab5])
		}
		k1 = [0, 0]
		k2 = [0, 0]
		switch (remainder) {
			case 15:
				k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 14)], 48))
			// fallthrough
			case 14:
				k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 13)], 40))
			// fallthrough
			case 13:
				k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 12)], 32))
			// fallthrough
			case 12:
				k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 11)], 24))
			// fallthrough
			case 11:
				k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 10)], 16))
			// fallthrough
			case 10:
				k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 9)], 8))
			// fallthrough
			case 9:
				k2 = x64Xor(k2, [0, key.charCodeAt(i + 8)])
				k2 = x64Multiply(k2, c2)
				k2 = x64Rotl(k2, 33)
				k2 = x64Multiply(k2, c1)
				h2 = x64Xor(h2, k2)
			// fallthrough
			case 8:
				k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 7)], 56))
			// fallthrough
			case 7:
				k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 6)], 48))
			// fallthrough
			case 6:
				k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 5)], 40))
			// fallthrough
			case 5:
				k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 4)], 32))
			// fallthrough
			case 4:
				k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 3)], 24))
			// fallthrough
			case 3:
				k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 2)], 16))
			// fallthrough
			case 2:
				k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 1)], 8))
			// fallthrough
			case 1:
				k1 = x64Xor(k1, [0, key.charCodeAt(i)])
				k1 = x64Multiply(k1, c1)
				k1 = x64Rotl(k1, 31)
				k1 = x64Multiply(k1, c2)
				h1 = x64Xor(h1, k1)
			// fallthrough
		}
		h1 = x64Xor(h1, [0, key.length])
		h2 = x64Xor(h2, [0, key.length])
		h1 = x64Add(h1, h2)
		h2 = x64Add(h2, h1)
		h1 = x64Fmix(h1)
		h2 = x64Fmix(h2)
		h1 = x64Add(h1, h2)
		h2 = x64Add(h2, h1)
		return ('00000000' + (h1[0] >>> 0).toString(16)).slice(-8) + ('00000000' + (h1[1] >>> 0).toString(16)).slice(-8) + ('00000000' + (h2[0] >>> 0).toString(16)).slice(-8) + ('00000000' + (h2[1] >>> 0).toString(16)).slice(-8)
	}

	var defaultOptions = {
		preprocessor: null,
		audio: {
			timeout: 1000,
			// On iOS 11, audio context can only be used in response to user interaction.
			// We require users to explicitly enable audio fingerprinting on iOS 11.
			// See https://stackoverflow.com/questions/46363048/onaudioprocess-not-called-on-ios11#46534088
			excludeIOS11: true
		},
		fonts: {
			swfContainerId: 'fingerprintjs2',
			swfPath: 'flash/compiled/FontList.swf',
			userDefinedFonts: [],
			extendedJsFonts: false
		},
		screen: {
			// To ensure consistent fingerprints when users rotate their mobile devices
			detectScreenOrientation: true
		},
		plugins: {
			sortPluginsFor: [/palemoon/i],
			excludeIE: false
		},
		extraComponents: [],
		excludes: {
			// Unreliable on Windows, see https://github.com/Valve/fingerprintjs2/issues/375
			'enumerateDevices': true,
			// devicePixelRatio depends on browser zoom, and it's impossible to detect browser zoom
			'pixelRatio': true,
			// DNT depends on incognito mode for some browsers (Chrome) and it's impossible to detect incognito mode
			'doNotTrack': true,
			// uses js fonts already
			'fontsFlash': true
		},
		NOT_AVAILABLE: 'not available',
		ERROR: 'error',
		EXCLUDED: 'excluded'
	}

	var each = function (obj, iterator) {
		if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
			obj.forEach(iterator)
		} else if (obj.length === +obj.length) {
			for (var i = 0, l = obj.length; i < l; i++) {
				iterator(obj[i], i, obj)
			}
		} else {
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					iterator(obj[key], key, obj)
				}
			}
		}
	}

	var map = function (obj, iterator) {
		var results = []
		// Not using strict equality so that this acts as a
		// shortcut to checking for `null` and `undefined`.
		if (obj == null) {
			return results
		}
		if (Array.prototype.map && obj.map === Array.prototype.map) { return obj.map(iterator) }
		each(obj, function (value, index, list) {
			results.push(iterator(value, index, list))
		})
		return results
	}

	var extendSoft = function (target, source) {
		if (source == null) { return target }
		var value
		var key
		for (key in source) {
			value = source[key]
			if (value != null && !(Object.prototype.hasOwnProperty.call(target, key))) {
				target[key] = value
			}
		}
		return target
	}

	// https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices
	var enumerateDevicesKey = function (done, options) {
		if (!isEnumerateDevicesSupported()) {
			return done(options.NOT_AVAILABLE)
		}
		navigator.mediaDevices.enumerateDevices().then(function (devices) {
			done(devices.map(function (device) {
				return 'id=' + device.deviceId + ';gid=' + device.groupId + ';' + device.kind + ';' + device.label
			}))
		})
	}

	var isEnumerateDevicesSupported = function () {
		return (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices)
	}
	// Inspired by and based on https://github.com/cozylife/audio-fingerprint
	var audioKey = function (done, options) {
		var audioOptions = options.audio
		if (audioOptions.excludeIOS11 && navigator.userAgent.match(/OS 11.+Version\/11.+Safari/)) {
			// See comment for excludeUserAgent and https://stackoverflow.com/questions/46363048/onaudioprocess-not-called-on-ios11#46534088
			return done(options.EXCLUDED)
		}

		var AudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext

		if (AudioContext == null) {
			return done(options.NOT_AVAILABLE)
		}

		var context = new AudioContext(1, 44100, 44100)

		var oscillator = context.createOscillator()
		oscillator.type = 'triangle'
		oscillator.frequency.setValueAtTime(10000, context.currentTime)

		var compressor = context.createDynamicsCompressor()
		each([
			['threshold', -50],
			['knee', 40],
			['ratio', 12],
			['reduction', -20],
			['attack', 0],
			['release', 0.25]
		], function (item) {
			if (compressor[item[0]] !== undefined && typeof compressor[item[0]].setValueAtTime === 'function') {
				compressor[item[0]].setValueAtTime(item[1], context.currentTime)
			}
		})

		oscillator.connect(compressor)
		compressor.connect(context.destination)
		oscillator.start(0)
		context.startRendering()

		var audioTimeoutId = setTimeout(function () {
			console.warn('Audio fingerprint timed out. Please report bug at https://github.com/Valve/fingerprintjs2 with your user agent: "' + navigator.userAgent + '".')
			context.oncomplete = function () { }
			context = null
			return done('audioTimeout')
		}, audioOptions.timeout)

		context.oncomplete = function (event) {
			var fingerprint
			try {
				clearTimeout(audioTimeoutId)
				fingerprint = event.renderedBuffer.getChannelData(0)
					.slice(4500, 5000)
					.reduce(function (acc, val) { return acc + Math.abs(val) }, 0)
					.toString()
				oscillator.disconnect()
				compressor.disconnect()
			} catch (error) {
				done(error)
				return
			}
			done(fingerprint)
		}
	}
	var UserAgent = function (done) {
		done(navigator.userAgent)
	}
	var webdriver = function (done, options) {
		done(navigator.webdriver == null ? options.NOT_AVAILABLE : navigator.webdriver)
	}
	var languageKey = function (done, options) {
		done(navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || options.NOT_AVAILABLE)
	}
	var colorDepthKey = function (done, options) {
		done(window.screen.colorDepth || options.NOT_AVAILABLE)
	}
	var deviceMemoryKey = function (done, options) {
		done(navigator.deviceMemory || options.NOT_AVAILABLE)
	}
	var pixelRatioKey = function (done, options) {
		done(window.devicePixelRatio || options.NOT_AVAILABLE)
	}
	var screenResolutionKey = function (done, options) {
		done(getScreenResolution(options))
	}
	var getScreenResolution = function (options) {
		var resolution = [window.screen.width, window.screen.height]
		if (options.screen.detectScreenOrientation) {
			resolution.sort().reverse()
		}
		return resolution
	}
	var availableScreenResolutionKey = function (done, options) {
		done(getAvailableScreenResolution(options))
	}
	var getAvailableScreenResolution = function (options) {
		if (window.screen.availWidth && window.screen.availHeight) {
			var available = [window.screen.availHeight, window.screen.availWidth]
			if (options.screen.detectScreenOrientation) {
				available.sort().reverse()
			}
			return available
		}
		// headless browsers
		return options.NOT_AVAILABLE
	}
	var timezoneOffset = function (done) {
		done(new Date().getTimezoneOffset())
	}
	var timezone = function (done, options) {
		if (window.Intl && window.Intl.DateTimeFormat) {
			done(new window.Intl.DateTimeFormat().resolvedOptions().timeZone)
			return
		}
		done(options.NOT_AVAILABLE)
	}
	var sessionStorageKey = function (done, options) {
		done(hasSessionStorage(options))
	}
	var localStorageKey = function (done, options) {
		done(hasLocalStorage(options))
	}
	var indexedDbKey = function (done, options) {
		done(hasIndexedDB(options))
	}
	var addBehaviorKey = function (done) {
		// body might not be defined at this point or removed programmatically
		done(!!(document.body && document.body.addBehavior))
	}
	var openDatabaseKey = function (done) {
		done(!!window.openDatabase)
	}
	var cpuClassKey = function (done, options) {
		done(getNavigatorCpuClass(options))
	}
	var platformKey = function (done, options) {
		done(getNavigatorPlatform(options))
	}
	var doNotTrackKey = function (done, options) {
		done(getDoNotTrack(options))
	}
	var canvasKey = function (done, options) {
		if (isCanvasSupported()) {
			done(getCanvasFp(options))
			return
		}
		done(options.NOT_AVAILABLE)
	}
	var webglKey = function (done, options) {
		if (isWebGlSupported()) {
			done(getWebglFp())
			return
		}
		done(options.NOT_AVAILABLE)
	}
	var webglVendorAndRendererKey = function (done) {
		if (isWebGlSupported()) {
			done(getWebglVendorAndRenderer())
			return
		}
		done()
	}
	var adBlockKey = function (done) {
		done(getAdBlock())
	}
	var hasLiedLanguagesKey = function (done) {
		done(getHasLiedLanguages())
	}
	var hasLiedResolutionKey = function (done) {
		done(getHasLiedResolution())
	}
	var hasLiedOsKey = function (done) {
		done(getHasLiedOs())
	}
	var hasLiedBrowserKey = function (done) {
		done(getHasLiedBrowser())
	}
	// flash fonts (will increase fingerprinting time 20X to ~ 130-150ms)
	var flashFontsKey = function (done, options) {
		// we do flash if swfobject is loaded
		if (!hasSwfObjectLoaded()) {
			return done('swf object not loaded')
		}
		if (!hasMinFlashInstalled()) {
			return done('flash not installed')
		}
		if (!options.fonts.swfPath) {
			return done('missing options.fonts.swfPath')
		}
		loadSwfAndDetectFonts(function (fonts) {
			done(fonts)
		}, options)
	}
	// kudos to http://www.lalit.org/lab/javascript-css-font-detect/
	var jsFontsKey = function (done, options) {
		// a font will be compared against all the three default fonts.
		// and if it doesn't match all 3 then that font is not available.
		var baseFonts = ['monospace', 'sans-serif', 'serif']

		var fontList = [
			'Andale Mono', 'Arial', 'Arial Black', 'Arial Hebrew', 'Arial MT', 'Arial Narrow', 'Arial Rounded MT Bold', 'Arial Unicode MS',
			'Bitstream Vera Sans Mono', 'Book Antiqua', 'Bookman Old Style',
			'Calibri', 'Cambria', 'Cambria Math', 'Century', 'Century Gothic', 'Century Schoolbook', 'Comic Sans', 'Comic Sans MS', 'Consolas', 'Courier', 'Courier New',
			'Geneva', 'Georgia',
			'Helvetica', 'Helvetica Neue',
			'Impact',
			'Lucida Bright', 'Lucida Calligraphy', 'Lucida Console', 'Lucida Fax', 'LUCIDA GRANDE', 'Lucida Handwriting', 'Lucida Sans', 'Lucida Sans Typewriter', 'Lucida Sans Unicode',
			'Microsoft Sans Serif', 'Monaco', 'Monotype Corsiva', 'MS Gothic', 'MS Outlook', 'MS PGothic', 'MS Reference Sans Serif', 'MS Sans Serif', 'MS Serif', 'MYRIAD', 'MYRIAD PRO',
			'Palatino', 'Palatino Linotype',
			'Segoe Print', 'Segoe Script', 'Segoe UI', 'Segoe UI Light', 'Segoe UI Semibold', 'Segoe UI Symbol',
			'Tahoma', 'Times', 'Times New Roman', 'Times New Roman PS', 'Trebuchet MS',
			'Verdana', 'Wingdings', 'Wingdings 2', 'Wingdings 3'
		]

		if (options.fonts.extendedJsFonts) {
			var extendedFontList = [
				'Abadi MT Condensed Light', 'Academy Engraved LET', 'ADOBE CASLON PRO', 'Adobe Garamond', 'ADOBE GARAMOND PRO', 'Agency FB', 'Aharoni', 'Albertus Extra Bold', 'Albertus Medium', 'Algerian', 'Amazone BT', 'American Typewriter',
				'American Typewriter Condensed', 'AmerType Md BT', 'Andalus', 'Angsana New', 'AngsanaUPC', 'Antique Olive', 'Aparajita', 'Apple Chancery', 'Apple Color Emoji', 'Apple SD Gothic Neo', 'Arabic Typesetting', 'ARCHER',
				'ARNO PRO', 'Arrus BT', 'Aurora Cn BT', 'AvantGarde Bk BT', 'AvantGarde Md BT', 'AVENIR', 'Ayuthaya', 'Bandy', 'Bangla Sangam MN', 'Bank Gothic', 'BankGothic Md BT', 'Baskerville',
				'Baskerville Old Face', 'Batang', 'BatangChe', 'Bauer Bodoni', 'Bauhaus 93', 'Bazooka', 'Bell MT', 'Bembo', 'Benguiat Bk BT', 'Berlin Sans FB', 'Berlin Sans FB Demi', 'Bernard MT Condensed', 'BernhardFashion BT', 'BernhardMod BT', 'Big Caslon', 'BinnerD',
				'Blackadder ITC', 'BlairMdITC TT', 'Bodoni 72', 'Bodoni 72 Oldstyle', 'Bodoni 72 Smallcaps', 'Bodoni MT', 'Bodoni MT Black', 'Bodoni MT Condensed', 'Bodoni MT Poster Compressed',
				'Bookshelf Symbol 7', 'Boulder', 'Bradley Hand', 'Bradley Hand ITC', 'Bremen Bd BT', 'Britannic Bold', 'Broadway', 'Browallia New', 'BrowalliaUPC', 'Brush Script MT', 'Californian FB', 'Calisto MT', 'Calligrapher', 'Candara',
				'CaslonOpnface BT', 'Castellar', 'Centaur', 'Cezanne', 'CG Omega', 'CG Times', 'Chalkboard', 'Chalkboard SE', 'Chalkduster', 'Charlesworth', 'Charter Bd BT', 'Charter BT', 'Chaucer',
				'ChelthmITC Bk BT', 'Chiller', 'Clarendon', 'Clarendon Condensed', 'CloisterBlack BT', 'Cochin', 'Colonna MT', 'Constantia', 'Cooper Black', 'Copperplate', 'Copperplate Gothic', 'Copperplate Gothic Bold',
				'Copperplate Gothic Light', 'CopperplGoth Bd BT', 'Corbel', 'Cordia New', 'CordiaUPC', 'Cornerstone', 'Coronet', 'Cuckoo', 'Curlz MT', 'DaunPenh', 'Dauphin', 'David', 'DB LCD Temp', 'DELICIOUS', 'Denmark',
				'DFKai-SB', 'Didot', 'DilleniaUPC', 'DIN', 'DokChampa', 'Dotum', 'DotumChe', 'Ebrima', 'Edwardian Script ITC', 'Elephant', 'English 111 Vivace BT', 'Engravers MT', 'EngraversGothic BT', 'Eras Bold ITC', 'Eras Demi ITC', 'Eras Light ITC', 'Eras Medium ITC',
				'EucrosiaUPC', 'Euphemia', 'Euphemia UCAS', 'EUROSTILE', 'Exotc350 Bd BT', 'FangSong', 'Felix Titling', 'Fixedsys', 'FONTIN', 'Footlight MT Light', 'Forte',
				'FrankRuehl', 'Fransiscan', 'Freefrm721 Blk BT', 'FreesiaUPC', 'Freestyle Script', 'French Script MT', 'FrnkGothITC Bk BT', 'Fruitger', 'FRUTIGER',
				'Futura', 'Futura Bk BT', 'Futura Lt BT', 'Futura Md BT', 'Futura ZBlk BT', 'FuturaBlack BT', 'Gabriola', 'Galliard BT', 'Gautami', 'Geeza Pro', 'Geometr231 BT', 'Geometr231 Hv BT', 'Geometr231 Lt BT', 'GeoSlab 703 Lt BT',
				'GeoSlab 703 XBd BT', 'Gigi', 'Gill Sans', 'Gill Sans MT', 'Gill Sans MT Condensed', 'Gill Sans MT Ext Condensed Bold', 'Gill Sans Ultra Bold', 'Gill Sans Ultra Bold Condensed', 'Gisha', 'Gloucester MT Extra Condensed', 'GOTHAM', 'GOTHAM BOLD',
				'Goudy Old Style', 'Goudy Stout', 'GoudyHandtooled BT', 'GoudyOLSt BT', 'Gujarati Sangam MN', 'Gulim', 'GulimChe', 'Gungsuh', 'GungsuhChe', 'Gurmukhi MN', 'Haettenschweiler', 'Harlow Solid Italic', 'Harrington', 'Heather', 'Heiti SC', 'Heiti TC', 'HELV',
				'Herald', 'High Tower Text', 'Hiragino Kaku Gothic ProN', 'Hiragino Mincho ProN', 'Hoefler Text', 'Humanst 521 Cn BT', 'Humanst521 BT', 'Humanst521 Lt BT', 'Imprint MT Shadow', 'Incised901 Bd BT', 'Incised901 BT',
				'Incised901 Lt BT', 'INCONSOLATA', 'Informal Roman', 'Informal011 BT', 'INTERSTATE', 'IrisUPC', 'Iskoola Pota', 'JasmineUPC', 'Jazz LET', 'Jenson', 'Jester', 'Jokerman', 'Juice ITC', 'Kabel Bk BT', 'Kabel Ult BT', 'Kailasa', 'KaiTi', 'Kalinga', 'Kannada Sangam MN',
				'Kartika', 'Kaufmann Bd BT', 'Kaufmann BT', 'Khmer UI', 'KodchiangUPC', 'Kokila', 'Korinna BT', 'Kristen ITC', 'Krungthep', 'Kunstler Script', 'Lao UI', 'Latha', 'Leelawadee', 'Letter Gothic', 'Levenim MT', 'LilyUPC', 'Lithograph', 'Lithograph Light', 'Long Island',
				'Lydian BT', 'Magneto', 'Maiandra GD', 'Malayalam Sangam MN', 'Malgun Gothic',
				'Mangal', 'Marigold', 'Marion', 'Marker Felt', 'Market', 'Marlett', 'Matisse ITC', 'Matura MT Script Capitals', 'Meiryo', 'Meiryo UI', 'Microsoft Himalaya', 'Microsoft JhengHei', 'Microsoft New Tai Lue', 'Microsoft PhagsPa', 'Microsoft Tai Le',
				'Microsoft Uighur', 'Microsoft YaHei', 'Microsoft Yi Baiti', 'MingLiU', 'MingLiU_HKSCS', 'MingLiU_HKSCS-ExtB', 'MingLiU-ExtB', 'Minion', 'Minion Pro', 'Miriam', 'Miriam Fixed', 'Mistral', 'Modern', 'Modern No. 20', 'Mona Lisa Solid ITC TT', 'Mongolian Baiti',
				'MONO', 'MoolBoran', 'Mrs Eaves', 'MS LineDraw', 'MS Mincho', 'MS PMincho', 'MS Reference Specialty', 'MS UI Gothic', 'MT Extra', 'MUSEO', 'MV Boli',
				'Nadeem', 'Narkisim', 'NEVIS', 'News Gothic', 'News GothicMT', 'NewsGoth BT', 'Niagara Engraved', 'Niagara Solid', 'Noteworthy', 'NSimSun', 'Nyala', 'OCR A Extended', 'Old Century', 'Old English Text MT', 'Onyx', 'Onyx BT', 'OPTIMA', 'Oriya Sangam MN',
				'OSAKA', 'OzHandicraft BT', 'Palace Script MT', 'Papyrus', 'Parchment', 'Party LET', 'Pegasus', 'Perpetua', 'Perpetua Titling MT', 'PetitaBold', 'Pickwick', 'Plantagenet Cherokee', 'Playbill', 'PMingLiU', 'PMingLiU-ExtB',
				'Poor Richard', 'Poster', 'PosterBodoni BT', 'PRINCETOWN LET', 'Pristina', 'PTBarnum BT', 'Pythagoras', 'Raavi', 'Rage Italic', 'Ravie', 'Ribbon131 Bd BT', 'Rockwell', 'Rockwell Condensed', 'Rockwell Extra Bold', 'Rod', 'Roman', 'Sakkal Majalla',
				'Santa Fe LET', 'Savoye LET', 'Sceptre', 'Script', 'Script MT Bold', 'SCRIPTINA', 'Serifa', 'Serifa BT', 'Serifa Th BT', 'ShelleyVolante BT', 'Sherwood',
				'Shonar Bangla', 'Showcard Gothic', 'Shruti', 'Signboard', 'SILKSCREEN', 'SimHei', 'Simplified Arabic', 'Simplified Arabic Fixed', 'SimSun', 'SimSun-ExtB', 'Sinhala Sangam MN', 'Sketch Rockwell', 'Skia', 'Small Fonts', 'Snap ITC', 'Snell Roundhand', 'Socket',
				'Souvenir Lt BT', 'Staccato222 BT', 'Steamer', 'Stencil', 'Storybook', 'Styllo', 'Subway', 'Swis721 BlkEx BT', 'Swiss911 XCm BT', 'Sylfaen', 'Synchro LET', 'System', 'Tamil Sangam MN', 'Technical', 'Teletype', 'Telugu Sangam MN', 'Tempus Sans ITC',
				'Terminal', 'Thonburi', 'Traditional Arabic', 'Trajan', 'TRAJAN PRO', 'Tristan', 'Tubular', 'Tunga', 'Tw Cen MT', 'Tw Cen MT Condensed', 'Tw Cen MT Condensed Extra Bold',
				'TypoUpright BT', 'Unicorn', 'Univers', 'Univers CE 55 Medium', 'Univers Condensed', 'Utsaah', 'Vagabond', 'Vani', 'Vijaya', 'Viner Hand ITC', 'VisualUI', 'Vivaldi', 'Vladimir Script', 'Vrinda', 'Westminster', 'WHITNEY', 'Wide Latin',
				'ZapfEllipt BT', 'ZapfHumnst BT', 'ZapfHumnst Dm BT', 'Zapfino', 'Zurich BlkEx BT', 'Zurich Ex BT', 'ZWAdobeF']
			fontList = fontList.concat(extendedFontList)
		}

		fontList = fontList.concat(options.fonts.userDefinedFonts)

		// remove duplicate fonts
		fontList = fontList.filter(function (font, position) {
			return fontList.indexOf(font) === position
		})

		// we use m or w because these two characters take up the maximum width.
		// And we use a LLi so that the same matching fonts can get separated
		var testString = 'mmmmmmmmmmlli'

		// we test using 72px font size, we may use any size. I guess larger the better.
		var testSize = '72px'

		var h = document.getElementsByTagName('body')[0]

		// div to load spans for the base fonts
		var baseFontsDiv = document.createElement('div')

		// div to load spans for the fonts to detect
		var fontsDiv = document.createElement('div')

		var defaultWidth = {}
		var defaultHeight = {}

		// creates a span where the fonts will be loaded
		var createSpan = function () {
			var s = document.createElement('span')
			/*
			 * We need this css as in some weird browser this
			 * span elements shows up for a microSec which creates a
			 * bad user experience
			 */
			s.style.position = 'absolute'
			s.style.left = '-9999px'
			s.style.fontSize = testSize

			// css font reset to reset external styles
			s.style.fontStyle = 'normal'
			s.style.fontWeight = 'normal'
			s.style.letterSpacing = 'normal'
			s.style.lineBreak = 'auto'
			s.style.lineHeight = 'normal'
			s.style.textTransform = 'none'
			s.style.textAlign = 'left'
			s.style.textDecoration = 'none'
			s.style.textShadow = 'none'
			s.style.whiteSpace = 'normal'
			s.style.wordBreak = 'normal'
			s.style.wordSpacing = 'normal'

			s.innerHTML = testString
			return s
		}

		// creates a span and load the font to detect and a base font for fallback
		var createSpanWithFonts = function (fontToDetect, baseFont) {
			var s = createSpan()
			s.style.fontFamily = "'" + fontToDetect + "'," + baseFont
			return s
		}

		// creates spans for the base fonts and adds them to baseFontsDiv
		var initializeBaseFontsSpans = function () {
			var spans = []
			for (var index = 0, length = baseFonts.length; index < length; index++) {
				var s = createSpan()
				s.style.fontFamily = baseFonts[index]
				baseFontsDiv.appendChild(s)
				spans.push(s)
			}
			return spans
		}

		// creates spans for the fonts to detect and adds them to fontsDiv
		var initializeFontsSpans = function () {
			var spans = {}
			for (var i = 0, l = fontList.length; i < l; i++) {
				var fontSpans = []
				for (var j = 0, numDefaultFonts = baseFonts.length; j < numDefaultFonts; j++) {
					var s = createSpanWithFonts(fontList[i], baseFonts[j])
					fontsDiv.appendChild(s)
					fontSpans.push(s)
				}
				spans[fontList[i]] = fontSpans // Stores {fontName : [spans for that font]}
			}
			return spans
		}

		// checks if a font is available
		var isFontAvailable = function (fontSpans) {
			var detected = false
			for (var i = 0; i < baseFonts.length; i++) {
				detected = (fontSpans[i].offsetWidth !== defaultWidth[baseFonts[i]] || fontSpans[i].offsetHeight !== defaultHeight[baseFonts[i]])
				if (detected) {
					return detected
				}
			}
			return detected
		}

		// create spans for base fonts
		var baseFontsSpans = initializeBaseFontsSpans()

		// add the spans to the DOM
		h.appendChild(baseFontsDiv)

		// get the default width for the three base fonts
		for (var index = 0, length = baseFonts.length; index < length; index++) {
			defaultWidth[baseFonts[index]] = baseFontsSpans[index].offsetWidth // width for the default font
			defaultHeight[baseFonts[index]] = baseFontsSpans[index].offsetHeight // height for the default font
		}

		// create spans for fonts to detect
		var fontsSpans = initializeFontsSpans()

		// add all the spans to the DOM
		h.appendChild(fontsDiv)

		// check available fonts
		var available = []
		for (var i = 0, l = fontList.length; i < l; i++) {
			if (isFontAvailable(fontsSpans[fontList[i]])) {
				available.push(fontList[i])
			}
		}

		// remove spans from DOM
		h.removeChild(fontsDiv)
		h.removeChild(baseFontsDiv)
		done(available)
	}
	var pluginsComponent = function (done, options) {
		if (isIE()) {
			if (!options.plugins.excludeIE) {
				done(getIEPlugins(options))
			} else {
				done(options.EXCLUDED)
			}
		} else {
			done(getRegularPlugins(options))
		}
	}
	var getRegularPlugins = function (options) {
		if (navigator.plugins == null) {
			return options.NOT_AVAILABLE
		}

		var plugins = []
		// plugins isn't defined in Node envs.
		for (var i = 0, l = navigator.plugins.length; i < l; i++) {
			if (navigator.plugins[i]) { plugins.push(navigator.plugins[i]) }
		}

		// sorting plugins only for those user agents, that we know randomize the plugins
		// every time we try to enumerate them
		if (pluginsShouldBeSorted(options)) {
			plugins = plugins.sort(function (a, b) {
				if (a.name > b.name) { return 1 }
				if (a.name < b.name) { return -1 }
				return 0
			})
		}
		return map(plugins, function (p) {
			var mimeTypes = map(p, function (mt) {
				return [mt.type, mt.suffixes]
			})
			return [p.name, p.description, mimeTypes]
		})
	}
	var getIEPlugins = function (options) {
		var result = []
		if ((Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, 'ActiveXObject')) || ('ActiveXObject' in window)) {
			var names = [
				'AcroPDF.PDF', // Adobe PDF reader 7+
				'Adodb.Stream',
				'AgControl.AgControl', // Silverlight
				'DevalVRXCtrl.DevalVRXCtrl.1',
				'MacromediaFlashPaper.MacromediaFlashPaper',
				'Msxml2.DOMDocument',
				'Msxml2.XMLHTTP',
				'PDF.PdfCtrl', // Adobe PDF reader 6 and earlier, brrr
				'QuickTime.QuickTime', // QuickTime
				'QuickTimeCheckObject.QuickTimeCheck.1',
				'RealPlayer',
				'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)',
				'RealVideo.RealVideo(tm) ActiveX Control (32-bit)',
				'Scripting.Dictionary',
				'SWCtl.SWCtl', // ShockWave player
				'Shell.UIHelper',
				'ShockwaveFlash.ShockwaveFlash', // flash plugin
				'Skype.Detection',
				'TDCCtl.TDCCtl',
				'WMPlayer.OCX', // Windows media player
				'rmocx.RealPlayer G2 Control',
				'rmocx.RealPlayer G2 Control.1'
			]
			// starting to detect plugins in IE
			result = map(names, function (name) {
				try {
					// eslint-disable-next-line no-new
					new window.ActiveXObject(name)
					return name
				} catch (e) {
					return options.ERROR
				}
			})
		} else {
			result.push(options.NOT_AVAILABLE)
		}
		if (navigator.plugins) {
			result = result.concat(getRegularPlugins(options))
		}
		return result
	}
	var pluginsShouldBeSorted = function (options) {
		var should = false
		for (var i = 0, l = options.plugins.sortPluginsFor.length; i < l; i++) {
			var re = options.plugins.sortPluginsFor[i]
			if (navigator.userAgent.match(re)) {
				should = true
				break
			}
		}
		return should
	}
	var touchSupportKey = function (done) {
		done(getTouchSupport())
	}
	var hardwareConcurrencyKey = function (done, options) {
		done(getHardwareConcurrency(options))
	}
	var hasSessionStorage = function (options) {
		try {
			return !!window.sessionStorage
		} catch (e) {
			return options.ERROR // SecurityError when referencing it means it exists
		}
	}

	// https://bugzilla.mozilla.org/show_bug.cgi?id=781447
	var hasLocalStorage = function (options) {
		try {
			return !!window.localStorage
		} catch (e) {
			return options.ERROR // SecurityError when referencing it means it exists
		}
	}
	var hasIndexedDB = function (options) {
		try {
			return !!window.indexedDB
		} catch (e) {
			return options.ERROR // SecurityError when referencing it means it exists
		}
	}
	var getHardwareConcurrency = function (options) {
		if (navigator.hardwareConcurrency) {
			return navigator.hardwareConcurrency
		}
		return options.NOT_AVAILABLE
	}
	var getNavigatorCpuClass = function (options) {
		return navigator.cpuClass || options.NOT_AVAILABLE
	}
	var getNavigatorPlatform = function (options) {
		if (navigator.platform) {
			return navigator.platform
		} else {
			return options.NOT_AVAILABLE
		}
	}
	var getDoNotTrack = function (options) {
		if (navigator.doNotTrack) {
			return navigator.doNotTrack
		} else if (navigator.msDoNotTrack) {
			return navigator.msDoNotTrack
		} else if (window.doNotTrack) {
			return window.doNotTrack
		} else {
			return options.NOT_AVAILABLE
		}
	}
	// This is a crude and primitive touch screen detection.
	// It's not possible to currently reliably detect the  availability of a touch screen
	// with a JS, without actually subscribing to a touch event.
	// http://www.stucox.com/blog/you-cant-detect-a-touchscreen/
	// https://github.com/Modernizr/Modernizr/issues/548
	// method returns an array of 3 values:
	// maxTouchPoints, the success or failure of creating a TouchEvent,
	// and the availability of the 'ontouchstart' property

	var getTouchSupport = function () {
		var maxTouchPoints = 0
		var touchEvent
		if (typeof navigator.maxTouchPoints !== 'undefined') {
			maxTouchPoints = navigator.maxTouchPoints
		} else if (typeof navigator.msMaxTouchPoints !== 'undefined') {
			maxTouchPoints = navigator.msMaxTouchPoints
		}
		try {
			document.createEvent('TouchEvent')
			touchEvent = true
		} catch (_) {
			touchEvent = false
		}
		var touchStart = 'ontouchstart' in window
		return [maxTouchPoints, touchEvent, touchStart]
	}
	// https://www.browserleaks.com/canvas#how-does-it-work

	var getCanvasFp = function (options) {
		var result = []
		// Very simple now, need to make it more complex (geo shapes etc)
		var canvas = document.createElement('canvas')
		canvas.width = 2000
		canvas.height = 200
		canvas.style.display = 'inline'
		var ctx = canvas.getContext('2d')
		// detect browser support of canvas winding
		// http://blogs.adobe.com/webplatform/2013/01/30/winding-rules-in-canvas/
		// https://github.com/Modernizr/Modernizr/blob/master/feature-detects/canvas/winding.js
		ctx.rect(0, 0, 10, 10)
		ctx.rect(2, 2, 6, 6)
		result.push('canvas winding:' + ((ctx.isPointInPath(5, 5, 'evenodd') === false) ? 'yes' : 'no'))

		ctx.textBaseline = 'alphabetic'
		ctx.fillStyle = '#f60'
		ctx.fillRect(125, 1, 62, 20)
		ctx.fillStyle = '#069'
		// https://github.com/Valve/fingerprintjs2/issues/66
		if (options.dontUseFakeFontInCanvas) {
			ctx.font = '11pt Arial'
		} else {
			ctx.font = '11pt no-real-font-123'
		}
		ctx.fillText('Cwm fjordbank glyphs vext quiz, \ud83d\ude03', 2, 15)
		ctx.fillStyle = 'rgba(102, 204, 0, 0.2)'
		ctx.font = '18pt Arial'
		ctx.fillText('Cwm fjordbank glyphs vext quiz, \ud83d\ude03', 4, 45)

		// canvas blending
		// http://blogs.adobe.com/webplatform/2013/01/28/blending-features-in-canvas/
		// http://jsfiddle.net/NDYV8/16/
		ctx.globalCompositeOperation = 'multiply'
		ctx.fillStyle = 'rgb(255,0,255)'
		ctx.beginPath()
		ctx.arc(50, 50, 50, 0, Math.PI * 2, true)
		ctx.closePath()
		ctx.fill()
		ctx.fillStyle = 'rgb(0,255,255)'
		ctx.beginPath()
		ctx.arc(100, 50, 50, 0, Math.PI * 2, true)
		ctx.closePath()
		ctx.fill()
		ctx.fillStyle = 'rgb(255,255,0)'
		ctx.beginPath()
		ctx.arc(75, 100, 50, 0, Math.PI * 2, true)
		ctx.closePath()
		ctx.fill()
		ctx.fillStyle = 'rgb(255,0,255)'
		// canvas winding
		// http://blogs.adobe.com/webplatform/2013/01/30/winding-rules-in-canvas/
		// http://jsfiddle.net/NDYV8/19/
		ctx.arc(75, 75, 75, 0, Math.PI * 2, true)
		ctx.arc(75, 75, 25, 0, Math.PI * 2, true)
		ctx.fill('evenodd')

		if (canvas.toDataURL) { result.push('canvas fp:' + canvas.toDataURL()) }
		return result
	}
	var getWebglFp = function () {
		var gl
		var fa2s = function (fa) {
			gl.clearColor(0.0, 0.0, 0.0, 1.0)
			gl.enable(gl.DEPTH_TEST)
			gl.depthFunc(gl.LEQUAL)
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
			return '[' + fa[0] + ', ' + fa[1] + ']'
		}
		var maxAnisotropy = function (gl) {
			var ext = gl.getExtension('EXT_texture_filter_anisotropic') || gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') || gl.getExtension('MOZ_EXT_texture_filter_anisotropic')
			if (ext) {
				var anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
				if (anisotropy === 0) {
					anisotropy = 2
				}
				return anisotropy
			} else {
				return null
			}
		}

		gl = getWebglCanvas()
		if (!gl) { return null }
		// WebGL fingerprinting is a combination of techniques, found in MaxMind antifraud script & Augur fingerprinting.
		// First it draws a gradient object with shaders and convers the image to the Base64 string.
		// Then it enumerates all WebGL extensions & capabilities and appends them to the Base64 string, resulting in a huge WebGL string, potentially very unique on each device
		// Since iOS supports webgl starting from version 8.1 and 8.1 runs on several graphics chips, the results may be different across ios devices, but we need to verify it.
		var result = []
		var vShaderTemplate = 'attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}'
		var fShaderTemplate = 'precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}'
		var vertexPosBuffer = gl.createBuffer()
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer)
		var vertices = new Float32Array([-0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0])
		gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
		vertexPosBuffer.itemSize = 3
		vertexPosBuffer.numItems = 3
		var program = gl.createProgram()
		var vshader = gl.createShader(gl.VERTEX_SHADER)
		gl.shaderSource(vshader, vShaderTemplate)
		gl.compileShader(vshader)
		var fshader = gl.createShader(gl.FRAGMENT_SHADER)
		gl.shaderSource(fshader, fShaderTemplate)
		gl.compileShader(fshader)
		gl.attachShader(program, vshader)
		gl.attachShader(program, fshader)
		gl.linkProgram(program)
		gl.useProgram(program)
		program.vertexPosAttrib = gl.getAttribLocation(program, 'attrVertex')
		program.offsetUniform = gl.getUniformLocation(program, 'uniformOffset')
		gl.enableVertexAttribArray(program.vertexPosArray)
		gl.vertexAttribPointer(program.vertexPosAttrib, vertexPosBuffer.itemSize, gl.FLOAT, !1, 0, 0)
		gl.uniform2f(program.offsetUniform, 1, 1)
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems)
		try {
			result.push(gl.canvas.toDataURL())
		} catch (e) {
			/* .toDataURL may be absent or broken (blocked by extension) */
		}
		result.push('extensions:' + (gl.getSupportedExtensions() || []).join(';'))
		result.push('webgl aliased line width range:' + fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)))
		result.push('webgl aliased point size range:' + fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)))
		result.push('webgl alpha bits:' + gl.getParameter(gl.ALPHA_BITS))
		result.push('webgl antialiasing:' + (gl.getContextAttributes().antialias ? 'yes' : 'no'))
		result.push('webgl blue bits:' + gl.getParameter(gl.BLUE_BITS))
		result.push('webgl depth bits:' + gl.getParameter(gl.DEPTH_BITS))
		result.push('webgl green bits:' + gl.getParameter(gl.GREEN_BITS))
		result.push('webgl max anisotropy:' + maxAnisotropy(gl))
		result.push('webgl max combined texture image units:' + gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS))
		result.push('webgl max cube map texture size:' + gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE))
		result.push('webgl max fragment uniform vectors:' + gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS))
		result.push('webgl max render buffer size:' + gl.getParameter(gl.MAX_RENDERBUFFER_SIZE))
		result.push('webgl max texture image units:' + gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS))
		result.push('webgl max texture size:' + gl.getParameter(gl.MAX_TEXTURE_SIZE))
		result.push('webgl max varying vectors:' + gl.getParameter(gl.MAX_VARYING_VECTORS))
		result.push('webgl max vertex attribs:' + gl.getParameter(gl.MAX_VERTEX_ATTRIBS))
		result.push('webgl max vertex texture image units:' + gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS))
		result.push('webgl max vertex uniform vectors:' + gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS))
		result.push('webgl max viewport dims:' + fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS)))
		result.push('webgl red bits:' + gl.getParameter(gl.RED_BITS))
		result.push('webgl renderer:' + gl.getParameter(gl.RENDERER))
		result.push('webgl shading language version:' + gl.getParameter(gl.SHADING_LANGUAGE_VERSION))
		result.push('webgl stencil bits:' + gl.getParameter(gl.STENCIL_BITS))
		result.push('webgl vendor:' + gl.getParameter(gl.VENDOR))
		result.push('webgl version:' + gl.getParameter(gl.VERSION))

		try {
			// Add the unmasked vendor and unmasked renderer if the debug_renderer_info extension is available
			var extensionDebugRendererInfo = gl.getExtension('WEBGL_debug_renderer_info')
			if (extensionDebugRendererInfo) {
				result.push('webgl unmasked vendor:' + gl.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL))
				result.push('webgl unmasked renderer:' + gl.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL))
			}
		} catch (e) { /* squelch */ }

		if (!gl.getShaderPrecisionFormat) {
			return result
		}

		each(['FLOAT', 'INT'], function (numType) {
			each(['VERTEX', 'FRAGMENT'], function (shader) {
				each(['HIGH', 'MEDIUM', 'LOW'], function (numSize) {
					each(['precision', 'rangeMin', 'rangeMax'], function (key) {
						var format = gl.getShaderPrecisionFormat(gl[shader + '_SHADER'], gl[numSize + '_' + numType])[key]
						if (key !== 'precision') {
							key = 'precision ' + key
						}
						var line = ['webgl ', shader.toLowerCase(), ' shader ', numSize.toLowerCase(), ' ', numType.toLowerCase(), ' ', key, ':', format].join('')
						result.push(line)
					})
				})
			})
		})
		return result
	}
	var getWebglVendorAndRenderer = function () {
		/* This a subset of the WebGL fingerprint with a lot of entropy, while being reasonably browser-independent */
		try {
			var glContext = getWebglCanvas()
			var extensionDebugRendererInfo = glContext.getExtension('WEBGL_debug_renderer_info')
			return glContext.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL) + '~' + glContext.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL)
		} catch (e) {
			return null
		}
	}
	var getAdBlock = function () {
		var ads = document.createElement('div')
		ads.innerHTML = '&nbsp;'
		ads.className = 'adsbox'
		var result = false
		try {
			// body may not exist, that's why we need try/catch
			document.body.appendChild(ads)
			result = document.getElementsByClassName('adsbox')[0].offsetHeight === 0
			document.body.removeChild(ads)
		} catch (e) {
			result = false
		}
		return result
	}
	var getHasLiedLanguages = function () {
		// We check if navigator.language is equal to the first language of navigator.languages
		// navigator.languages is undefined on IE11 (and potentially older IEs)
		if (typeof navigator.languages !== 'undefined') {
			try {
				var firstLanguages = navigator.languages[0].substr(0, 2)
				if (firstLanguages !== navigator.language.substr(0, 2)) {
					return true
				}
			} catch (err) {
				return true
			}
		}
		return false
	}
	var getHasLiedResolution = function () {
		return window.screen.width < window.screen.availWidth || window.screen.height < window.screen.availHeight
	}
	var getHasLiedOs = function () {
		var userAgent = navigator.userAgent.toLowerCase()
		var oscpu = navigator.oscpu
		var platform = navigator.platform.toLowerCase()
		var os
		// We extract the OS from the user agent (respect the order of the if else if statement)
		if (userAgent.indexOf('windows phone') >= 0) {
			os = 'Windows Phone'
		} else if (userAgent.indexOf('win') >= 0) {
			os = 'Windows'
		} else if (userAgent.indexOf('android') >= 0) {
			os = 'Android'
		} else if (userAgent.indexOf('linux') >= 0 || userAgent.indexOf('cros') >= 0) {
			os = 'Linux'
		} else if (userAgent.indexOf('iphone') >= 0 || userAgent.indexOf('ipad') >= 0) {
			os = 'iOS'
		} else if (userAgent.indexOf('mac') >= 0) {
			os = 'Mac'
		} else {
			os = 'Other'
		}
		// We detect if the person uses a mobile device
		var mobileDevice = (('ontouchstart' in window) ||
			(navigator.maxTouchPoints > 0) ||
			(navigator.msMaxTouchPoints > 0))

		if (mobileDevice && os !== 'Windows Phone' && os !== 'Android' && os !== 'iOS' && os !== 'Other') {
			return true
		}

		// We compare oscpu with the OS extracted from the UA
		if (typeof oscpu !== 'undefined') {
			oscpu = oscpu.toLowerCase()
			if (oscpu.indexOf('win') >= 0 && os !== 'Windows' && os !== 'Windows Phone') {
				return true
			} else if (oscpu.indexOf('linux') >= 0 && os !== 'Linux' && os !== 'Android') {
				return true
			} else if (oscpu.indexOf('mac') >= 0 && os !== 'Mac' && os !== 'iOS') {
				return true
			} else if ((oscpu.indexOf('win') === -1 && oscpu.indexOf('linux') === -1 && oscpu.indexOf('mac') === -1) !== (os === 'Other')) {
				return true
			}
		}

		// We compare platform with the OS extracted from the UA
		if (platform.indexOf('win') >= 0 && os !== 'Windows' && os !== 'Windows Phone') {
			return true
		} else if ((platform.indexOf('linux') >= 0 || platform.indexOf('android') >= 0 || platform.indexOf('pike') >= 0) && os !== 'Linux' && os !== 'Android') {
			return true
		} else if ((platform.indexOf('mac') >= 0 || platform.indexOf('ipad') >= 0 || platform.indexOf('ipod') >= 0 || platform.indexOf('iphone') >= 0) && os !== 'Mac' && os !== 'iOS') {
			return true
		} else {
			var platformIsOther = platform.indexOf('win') < 0 &&
				platform.indexOf('linux') < 0 &&
				platform.indexOf('mac') < 0 &&
				platform.indexOf('iphone') < 0 &&
				platform.indexOf('ipad') < 0
			if (platformIsOther !== (os === 'Other')) {
				return true
			}
		}

		return typeof navigator.plugins === 'undefined' && os !== 'Windows' && os !== 'Windows Phone'
	}
	var getHasLiedBrowser = function () {
		var userAgent = navigator.userAgent.toLowerCase()
		var productSub = navigator.productSub

		// we extract the browser from the user agent (respect the order of the tests)
		var browser
		if (userAgent.indexOf('firefox') >= 0) {
			browser = 'Firefox'
		} else if (userAgent.indexOf('opera') >= 0 || userAgent.indexOf('opr') >= 0) {
			browser = 'Opera'
		} else if (userAgent.indexOf('chrome') >= 0) {
			browser = 'Chrome'
		} else if (userAgent.indexOf('safari') >= 0) {
			browser = 'Safari'
		} else if (userAgent.indexOf('trident') >= 0) {
			browser = 'Internet Explorer'
		} else {
			browser = 'Other'
		}

		if ((browser === 'Chrome' || browser === 'Safari' || browser === 'Opera') && productSub !== '20030107') {
			return true
		}

		// eslint-disable-next-line no-eval
		var tempRes = eval.toString().length
		if (tempRes === 37 && browser !== 'Safari' && browser !== 'Firefox' && browser !== 'Other') {
			return true
		} else if (tempRes === 39 && browser !== 'Internet Explorer' && browser !== 'Other') {
			return true
		} else if (tempRes === 33 && browser !== 'Chrome' && browser !== 'Opera' && browser !== 'Other') {
			return true
		}

		// We create an error to see how it is handled
		var errFirefox
		try {
			// eslint-disable-next-line no-throw-literal
			throw 'a'
		} catch (err) {
			try {
				err.toSource()
				errFirefox = true
			} catch (errOfErr) {
				errFirefox = false
			}
		}
		return errFirefox && browser !== 'Firefox' && browser !== 'Other'
	}
	var isCanvasSupported = function () {
		var elem = document.createElement('canvas')
		return !!(elem.getContext && elem.getContext('2d'))
	}
	var isWebGlSupported = function () {
		// code taken from Modernizr
		if (!isCanvasSupported()) {
			return false
		}

		var glContext = getWebglCanvas()
		return !!window.WebGLRenderingContext && !!glContext
	}
	var isIE = function () {
		if (navigator.appName === 'Microsoft Internet Explorer') {
			return true
		} else if (navigator.appName === 'Netscape' && /Trident/.test(navigator.userAgent)) { // IE 11
			return true
		}
		return false
	}
	var hasSwfObjectLoaded = function () {
		return typeof window.swfobject !== 'undefined'
	}
	var hasMinFlashInstalled = function () {
		return window.swfobject.hasFlashPlayerVersion('9.0.0')
	}
	var addFlashDivNode = function (options) {
		var node = document.createElement('div')
		node.setAttribute('id', options.fonts.swfContainerId)
		document.body.appendChild(node)
	}
	var loadSwfAndDetectFonts = function (done, options) {
		var hiddenCallback = '___fp_swf_loaded'
		window[hiddenCallback] = function (fonts) {
			done(fonts)
		}
		var id = options.fonts.swfContainerId
		addFlashDivNode()
		var flashvars = { onReady: hiddenCallback }
		var flashparams = { allowScriptAccess: 'always', menu: 'false' }
		window.swfobject.embedSWF(options.fonts.swfPath, id, '1', '1', '9.0.0', false, flashvars, flashparams, {})
	}
	var getWebglCanvas = function () {
		var canvas = document.createElement('canvas')
		var gl = null
		try {
			gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
		} catch (e) { /* squelch */ }
		if (!gl) { gl = null }
		return gl
	}

	var components = [
		{ key: 'userAgent', getData: UserAgent },
		{ key: 'webdriver', getData: webdriver },
		{ key: 'language', getData: languageKey },
		{ key: 'colorDepth', getData: colorDepthKey },
		{ key: 'deviceMemory', getData: deviceMemoryKey },
		{ key: 'pixelRatio', getData: pixelRatioKey },
		{ key: 'hardwareConcurrency', getData: hardwareConcurrencyKey },
		{ key: 'screenResolution', getData: screenResolutionKey },
		{ key: 'availableScreenResolution', getData: availableScreenResolutionKey },
		{ key: 'timezoneOffset', getData: timezoneOffset },
		{ key: 'timezone', getData: timezone },
		{ key: 'sessionStorage', getData: sessionStorageKey },
		{ key: 'localStorage', getData: localStorageKey },
		{ key: 'indexedDb', getData: indexedDbKey },
		{ key: 'addBehavior', getData: addBehaviorKey },
		{ key: 'openDatabase', getData: openDatabaseKey },
		{ key: 'cpuClass', getData: cpuClassKey },
		{ key: 'platform', getData: platformKey },
		{ key: 'doNotTrack', getData: doNotTrackKey },
		{ key: 'plugins', getData: pluginsComponent },
		{ key: 'canvas', getData: canvasKey },
		{ key: 'webgl', getData: webglKey },
		{ key: 'webglVendorAndRenderer', getData: webglVendorAndRendererKey },
		{ key: 'adBlock', getData: adBlockKey },
		{ key: 'hasLiedLanguages', getData: hasLiedLanguagesKey },
		{ key: 'hasLiedResolution', getData: hasLiedResolutionKey },
		{ key: 'hasLiedOs', getData: hasLiedOsKey },
		{ key: 'hasLiedBrowser', getData: hasLiedBrowserKey },
		{ key: 'touchSupport', getData: touchSupportKey },
		{ key: 'fonts', getData: jsFontsKey, pauseBefore: true },
		{ key: 'fontsFlash', getData: flashFontsKey, pauseBefore: true },
		{ key: 'audio', getData: audioKey },
		{ key: 'enumerateDevices', getData: enumerateDevicesKey }
	]

	var Fingerprint2 = function (options) {
		throw new Error("'new Fingerprint()' is deprecated, see https://github.com/Valve/fingerprintjs2#upgrade-guide-from-182-to-200")
	}

	Fingerprint2.get = function (options, callback) {
		if (!callback) {
			callback = options
			options = {}
		} else if (!options) {
			options = {}
		}
		extendSoft(options, defaultOptions)
		options.components = options.extraComponents.concat(components)

		var keys = {
			data: [],
			addPreprocessedComponent: function (key, value) {
				if (typeof options.preprocessor === 'function') {
					value = options.preprocessor(key, value)
				}
				keys.data.push({ key: key, value: value })
			}
		}

		var i = -1
		var chainComponents = function (alreadyWaited) {
			i += 1
			if (i >= options.components.length) { // on finish
				callback(keys.data)
				return
			}
			var component = options.components[i]

			if (options.excludes[component.key]) {
				chainComponents(false) // skip
				return
			}

			if (!alreadyWaited && component.pauseBefore) {
				i -= 1
				setTimeout(function () {
					chainComponents(true)
				}, 1)
				return
			}

			try {
				component.getData(function (value) {
					keys.addPreprocessedComponent(component.key, value)
					chainComponents(false)
				}, options)
			} catch (error) {
				// main body error
				keys.addPreprocessedComponent(component.key, String(error))
				chainComponents(false)
			}
		}

		chainComponents(false)
	}

	Fingerprint2.getPromise = function (options) {
		return new Promise(function (resolve, reject) {
			Fingerprint2.get(options, resolve)
		})
	}

	Fingerprint2.getV18 = function (options, callback) {
		if (callback == null) {
			callback = options
			options = {}
		}
		return Fingerprint2.get(options, function (components) {
			var newComponents = []
			for (var i = 0; i < components.length; i++) {
				var component = components[i]
				if (component.value === (options.NOT_AVAILABLE || 'not available')) {
					newComponents.push({ key: component.key, value: 'unknown' })
				} else if (component.key === 'plugins') {
					newComponents.push({
						key: 'plugins',
						value: map(component.value, function (p) {
							var mimeTypes = map(p[2], function (mt) {
								if (mt.join) { return mt.join('~') }
								return mt
							}).join(',')
							return [p[0], p[1], mimeTypes].join('::')
						})
					})
				} else if (['canvas', 'webgl'].indexOf(component.key) !== -1) {
					newComponents.push({ key: component.key, value: component.value.join('~') })
				} else if (['sessionStorage', 'localStorage', 'indexedDb', 'addBehavior', 'openDatabase'].indexOf(component.key) !== -1) {
					if (component.value) {
						newComponents.push({ key: component.key, value: 1 })
					} else {
						// skip
						continue
					}
				} else {
					if (component.value) {
						newComponents.push(component.value.join ? { key: component.key, value: component.value.join(';') } : component)
					} else {
						newComponents.push({ key: component.key, value: component.value })
					}
				}
			}
			var murmur = x64hash128(map(newComponents, function (component) { return component.value }).join('~~~'), 31)
			callback(murmur, newComponents)
		})
	}

	Fingerprint2.x64hash128 = x64hash128
	Fingerprint2.VERSION = '2.1.0'
	return Fingerprint2
})
/*
 * jQuery FlexSlider v2.6.0
 * Copyright 2012
 */
;
(function ($) {
    var focused = true;

    //FlexSlider: Object Instance
    $.flexslider = function (el, options) {
        var slider = $(el);

        // making variables public
        slider.vars = $.extend({}, $.flexslider.defaults, options);

        var namespace = slider.vars.namespace,
            msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            touch = (("ontouchstart" in window) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
            // depricating this idea, as devices are being released with both of these events
            eventType = "click touchend MSPointerUp keyup",
            watchedEvent = "",
            watchedEventClearTimer,
            vertical = slider.vars.direction === "vertical",
            reverse = slider.vars.reverse,
            carousel = (slider.vars.itemWidth > 0),
            fade = slider.vars.animation === "fade",
            asNav = slider.vars.asNavFor !== "",
            methods = {};

        // Store a reference to the slider object
        $.data(el, "flexslider", slider);

        // Private slider methods
        methods = {
            init: function () {
                slider.animating = false;
                // Get current slide and make sure it is a number
                slider.currentSlide = parseInt((slider.vars.startAt ? slider.vars.startAt : 0), 10);
                if (isNaN(slider.currentSlide)) { slider.currentSlide = 0; }
                slider.animatingTo = slider.currentSlide;
                slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
                slider.containerSelector = slider.vars.selector.substr(0, slider.vars.selector.search(' '));
                slider.slides = $(slider.vars.selector, slider);
                slider.container = $(slider.containerSelector, slider);
                slider.count = slider.slides.length;
                // SYNC:
                slider.syncExists = $(slider.vars.sync).length > 0;
                // SLIDE:
                if (slider.vars.animation === "slide") { slider.vars.animation = "swing"; }
                slider.prop = (vertical) ? "top" : "marginLeft";
                slider.args = {};
                // SLIDESHOW:
                slider.manualPause = false;
                slider.stopped = false;
                //PAUSE WHEN INVISIBLE
                slider.started = false;
                slider.startTimeout = null;
                // TOUCH/USECSS:
                slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && (function () {
                    var obj = document.createElement('div'),
                        props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
                    for (var i in props) {
                        if (obj.style[props[i]] !== undefined) {
                            slider.pfx = props[i].replace('Perspective', '').toLowerCase();
                            slider.prop = "-" + slider.pfx + "-transform";
                            return true;
                        }
                    }
                    return false;
                }());
                slider.ensureAnimationEnd = '';
                // CONTROLSCONTAINER:
                if (slider.vars.controlsContainer !== "") slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
                // MANUAL:
                if (slider.vars.manualControls !== "") slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);

                // CUSTOM DIRECTION NAV:
                if (slider.vars.customDirectionNav !== "") slider.customDirectionNav = $(slider.vars.customDirectionNav).length === 2 && $(slider.vars.customDirectionNav);

                // RANDOMIZE:
                if (slider.vars.randomize) {
                    slider.slides.sort(function () { return (Math.round(Math.random()) - 0.5); });
                    slider.container.empty().append(slider.slides);
                }

                slider.doMath();

                // INIT
                slider.setup("init");

                // CONTROLNAV:
                if (slider.vars.controlNav) { methods.controlNav.setup(); }

                // DIRECTIONNAV:
                if (slider.vars.directionNav) { methods.directionNav.setup(); }

                // KEYBOARD:
                if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard)) {
                    $(document).bind('keyup', function (event) {
                        var keycode = event.keyCode;
                        if (!slider.animating && (keycode === 39 || keycode === 37)) {
                            var target = (keycode === 39) ? slider.getTarget('next') :
                                         (keycode === 37) ? slider.getTarget('prev') : false;
                            slider.flexAnimate(target, slider.vars.pauseOnAction);
                        }
                    });
                }
                // MOUSEWHEEL:
                if (slider.vars.mousewheel) {
                    slider.bind('mousewheel', function (event, delta, deltaX, deltaY) {
                        event.preventDefault();
                        var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
                        slider.flexAnimate(target, slider.vars.pauseOnAction);
                    });
                }

                // PAUSEPLAY
                if (slider.vars.pausePlay) { methods.pausePlay.setup(); }

                //PAUSE WHEN INVISIBLE
                if (slider.vars.slideshow && slider.vars.pauseInvisible) { methods.pauseInvisible.init(); }

                // SLIDSESHOW
                if (slider.vars.slideshow) {
                    if (slider.vars.pauseOnHover) {
                        slider.hover(function () {
                            if (!slider.manualPlay && !slider.manualPause) { slider.pause(); }
                        }, function () {
                            if (!slider.manualPause && !slider.manualPlay && !slider.stopped) { slider.play(); }
                        });
                    }
                    // initialize animation
                    //If we're visible, or we don't use PageVisibility API
                    if (!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden()) {
                        (slider.vars.initDelay > 0) ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play();
                    }
                }

                // ASNAV:
                if (asNav) { methods.asNav.setup(); }

                // TOUCH
                if (touch && slider.vars.touch) { methods.touch(); }

                // FADE&&SMOOTHHEIGHT || SLIDE:
                if (!fade || (fade && slider.vars.smoothHeight)) { $(window).bind("resize orientationchange focus", methods.resize); }

                slider.find("img").attr("draggable", "false");

                // API: start() Callback
                setTimeout(function () {
                    slider.vars.start(slider);
                }, 200);
            },
            asNav: {
                setup: function () {
                    slider.asNav = true;
                    slider.animatingTo = Math.floor(slider.currentSlide / slider.move);
                    slider.currentItem = slider.currentSlide;
                    slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
                    if (!msGesture) {
                        slider.slides.on(eventType, function (e) {
                            e.preventDefault();
                            var $slide = $(this),
                                target = $slide.index();
                            var posFromLeft = $slide.offset().left - $(slider).scrollLeft(); // Find position of slide relative to left of slider container
                            if (posFromLeft <= 0 && $slide.hasClass(namespace + 'active-slide')) {
                                slider.flexAnimate(slider.getTarget("prev"), true);
                            } else if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass(namespace + "active-slide")) {
                                slider.direction = (slider.currentItem < target) ? "next" : "prev";
                                slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                            }
                        });
                    } else {
                        el._slider = slider;
                        slider.slides.each(function () {
                            var that = this;
                            that._gesture = new MSGesture();
                            that._gesture.target = that;
                            that.addEventListener("MSPointerDown", function (e) {
                                e.preventDefault();
                                if (e.currentTarget._gesture) {
                                    e.currentTarget._gesture.addPointer(e.pointerId);
                                }
                            }, false);
                            that.addEventListener("MSGestureTap", function (e) {
                                e.preventDefault();
                                var $slide = $(this),
                                    target = $slide.index();
                                if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                                    slider.direction = (slider.currentItem < target) ? "next" : "prev";
                                    slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                                }
                            });
                        });
                    }
                }
            },
            controlNav: {
                setup: function () {
                    if (!slider.manualControls) {
                        methods.controlNav.setupPaging();
                    } else { // MANUALCONTROLS:
                        methods.controlNav.setupManual();
                    }
                },
                setupPaging: function () {
                    var type = (slider.vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
                        j = 1,
                        item,
                        slide;

                    slider.controlNavScaffold = $('<ol class="' + namespace + 'control-nav ' + namespace + type + '"></ol>');

                    if (slider.pagingCount > 1) {
                        for (var i = 0; i < slider.pagingCount; i++) {
                            slide = slider.slides.eq(i);
                            if (undefined === slide.attr('data-thumb-alt')) { slide.attr('data-thumb-alt', ''); }
                            altText = ('' !== slide.attr('data-thumb-alt')) ? altText = ' alt="' + slide.attr('data-thumb-alt') + '"' : '';
                            item = (slider.vars.controlNav === "thumbnails") ? '<img src="' + slide.attr('data-thumb') + '"' + altText + '/>' : '<a href="#">' + j + '</a>';
                            if ('thumbnails' === slider.vars.controlNav && true === slider.vars.thumbCaptions) {
                                var captn = slide.attr('data-thumbcaption');
                                if ('' !== captn && undefined !== captn) { item += '<span class="' + namespace + 'caption">' + captn + '</span>'; }
                            }
                            slider.controlNavScaffold.append('<li>' + item + '</li>');
                            j++;
                        }
                    }

                    // CONTROLSCONTAINER:
                    (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
                    methods.controlNav.set();

                    methods.controlNav.active();

                    slider.controlNavScaffold.delegate('a, img', eventType, function (event) {
                        event.preventDefault();

                        if (watchedEvent === "" || watchedEvent === event.type) {
                            var $this = $(this),
                                target = slider.controlNav.index($this);

                            if (!$this.hasClass(namespace + 'active')) {
                                slider.direction = (target > slider.currentSlide) ? "next" : "prev";
                                slider.flexAnimate(target, slider.vars.pauseOnAction);
                            }
                        }

                        // setup flags to prevent event duplication
                        if (watchedEvent === "") {
                            watchedEvent = event.type;
                        }
                        methods.setToClearWatchedEvent();
                    });
                },
                setupManual: function () {
                    slider.controlNav = slider.manualControls;
                    methods.controlNav.active();

                    slider.controlNav.bind(eventType, function (event) {
                        event.preventDefault();

                        if (watchedEvent === "" || watchedEvent === event.type) {
                            var $this = $(this),
                                target = slider.controlNav.index($this);

                            if (!$this.hasClass(namespace + 'active')) {
                                (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
                                slider.flexAnimate(target, slider.vars.pauseOnAction);
                            }
                        }

                        // setup flags to prevent event duplication
                        if (watchedEvent === "") {
                            watchedEvent = event.type;
                        }
                        methods.setToClearWatchedEvent();
                    });
                },
                set: function () {
                    var selector = (slider.vars.controlNav === "thumbnails") ? 'img' : 'a';
                    slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
                },
                active: function () {
                    slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
                },
                update: function (action, pos) {
                    if (slider.pagingCount > 1 && action === "add") {
                        slider.controlNavScaffold.append($('<li><a href="#">' + slider.count + '</a></li>'));
                    } else if (slider.pagingCount === 1) {
                        slider.controlNavScaffold.find('li').remove();
                    } else {
                        slider.controlNav.eq(pos).closest('li').remove();
                    }
                    methods.controlNav.set();
                    (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
                }
            },
            directionNav: {
                setup: function () {
                    var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li class="' + namespace + 'nav-prev"><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li class="' + namespace + 'nav-next"><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');

                    // CUSTOM DIRECTION NAV:
                    if (slider.customDirectionNav) {
                        slider.directionNav = slider.customDirectionNav;
                        // CONTROLSCONTAINER:
                    } else if (slider.controlsContainer) {
                        $(slider.controlsContainer).append(directionNavScaffold);
                        slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
                    } else {
                        slider.append(directionNavScaffold);
                        slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
                    }

                    methods.directionNav.update();

                    slider.directionNav.bind(eventType, function (event) {
                        event.preventDefault();
                        var target;

                        if (watchedEvent === "" || watchedEvent === event.type) {
                            target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
                            slider.flexAnimate(target, slider.vars.pauseOnAction);
                        }

                        // setup flags to prevent event duplication
                        if (watchedEvent === "") {
                            watchedEvent = event.type;
                        }
                        methods.setToClearWatchedEvent();
                    });
                },
                update: function () {
                    var disabledClass = namespace + 'disabled';
                    if (slider.pagingCount === 1) {
                        slider.directionNav.addClass(disabledClass).attr('tabindex', '-1');
                    } else if (!slider.vars.animationLoop) {
                        if (slider.animatingTo === 0) {
                            slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1');
                        } else if (slider.animatingTo === slider.last) {
                            slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1');
                        } else {
                            slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
                        }
                    } else {
                        slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
                    }
                }
            },
            pausePlay: {
                setup: function () {
                    var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a href="#"></a></div>');

                    // CONTROLSCONTAINER:
                    if (slider.controlsContainer) {
                        slider.controlsContainer.append(pausePlayScaffold);
                        slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
                    } else {
                        slider.append(pausePlayScaffold);
                        slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
                    }

                    methods.pausePlay.update((slider.vars.slideshow) ? namespace + 'pause' : namespace + 'play');

                    slider.pausePlay.bind(eventType, function (event) {
                        event.preventDefault();

                        if (watchedEvent === "" || watchedEvent === event.type) {
                            if ($(this).hasClass(namespace + 'pause')) {
                                slider.manualPause = true;
                                slider.manualPlay = false;
                                slider.pause();
                            } else {
                                slider.manualPause = false;
                                slider.manualPlay = true;
                                slider.play();
                            }
                        }

                        // setup flags to prevent event duplication
                        if (watchedEvent === "") {
                            watchedEvent = event.type;
                        }
                        methods.setToClearWatchedEvent();
                    });
                },
                update: function (state) {
                    (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText);
                }
            },
            touch: function () {
                var startX,
                  startY,
                  offset,
                  cwidth,
                  dx,
                  startT,
                  onTouchStart,
                  onTouchMove,
                  onTouchEnd,
                  scrolling = false,
                  localX = 0,
                  localY = 0,
                  accDx = 0;

                if (!msGesture) {
                    onTouchStart = function (e) {
                        if (slider.animating) {
                            e.preventDefault();
                        } else if ((window.navigator.msPointerEnabled) || e.touches.length === 1) {
                            slider.pause();
                            // CAROUSEL:
                            cwidth = (vertical) ? slider.h : slider.w;
                            startT = Number(new Date());
                            // CAROUSEL:

                            // Local vars for X and Y points.
                            localX = e.touches[0].pageX;
                            localY = e.touches[0].pageY;

                            offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                                     (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                                     (carousel && slider.currentSlide === slider.last) ? slider.limit :
                                     (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                                     (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                            startX = (vertical) ? localY : localX;
                            startY = (vertical) ? localX : localY;

                            el.addEventListener('touchmove', onTouchMove, false);
                            el.addEventListener('touchend', onTouchEnd, false);
                        }
                    };

                    onTouchMove = function (e) {
                        // Local vars for X and Y points.

                        localX = e.touches[0].pageX;
                        localY = e.touches[0].pageY;

                        dx = (vertical) ? startX - localY : startX - localX;
                        scrolling = (vertical) ? (Math.abs(dx) < Math.abs(localX - startY)) : (Math.abs(dx) < Math.abs(localY - startY));

                        var fxms = 500;

                        if (!scrolling || Number(new Date()) - startT > fxms) {
                            e.preventDefault();
                            if (!fade && slider.transitions) {
                                if (!slider.vars.animationLoop) {
                                    dx = dx / ((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx) / cwidth + 2) : 1);
                                }
                                slider.setProps(offset + dx, "setTouch");
                            }
                        }
                    };

                    onTouchEnd = function (e) {
                        // finish the touch by undoing the touch session
                        el.removeEventListener('touchmove', onTouchMove, false);

                        if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                            var updateDx = (reverse) ? -dx : dx,
                                target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                            if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth / 2)) {
                                slider.flexAnimate(target, slider.vars.pauseOnAction);
                            } else {
                                if (!fade) { slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true); }
                            }
                        }
                        el.removeEventListener('touchend', onTouchEnd, false);

                        startX = null;
                        startY = null;
                        dx = null;
                        offset = null;
                    };

                    el.addEventListener('touchstart', onTouchStart, false);
                } else {
                    el.style.msTouchAction = "none";
                    el._gesture = new MSGesture();
                    el._gesture.target = el;
                    el.addEventListener("MSPointerDown", onMSPointerDown, false);
                    el._slider = slider;
                    el.addEventListener("MSGestureChange", onMSGestureChange, false);
                    el.addEventListener("MSGestureEnd", onMSGestureEnd, false);

                    function onMSPointerDown(e) {
                        e.stopPropagation();
                        if (slider.animating) {
                            e.preventDefault();
                        } else {
                            slider.pause();
                            el._gesture.addPointer(e.pointerId);
                            accDx = 0;
                            cwidth = (vertical) ? slider.h : slider.w;
                            startT = Number(new Date());
                            // CAROUSEL:

                            offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                                (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                                    (carousel && slider.currentSlide === slider.last) ? slider.limit :
                                        (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                                            (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                        }
                    }

                    function onMSGestureChange(e) {
                        e.stopPropagation();
                        var slider = e.target._slider;
                        if (!slider) {
                            return;
                        }
                        var transX = -e.translationX,
                            transY = -e.translationY;

                        //Accumulate translations.
                        accDx = accDx + ((vertical) ? transY : transX);
                        dx = accDx;
                        scrolling = (vertical) ? (Math.abs(accDx) < Math.abs(-transX)) : (Math.abs(accDx) < Math.abs(-transY));

                        if (e.detail === e.MSGESTURE_FLAG_INERTIA) {
                            setImmediate(function () {
                                el._gesture.stop();
                            });

                            return;
                        }

                        if (!scrolling || Number(new Date()) - startT > 500) {
                            e.preventDefault();
                            if (!fade && slider.transitions) {
                                if (!slider.vars.animationLoop) {
                                    dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
                                }
                                slider.setProps(offset + dx, "setTouch");
                            }
                        }
                    }

                    function onMSGestureEnd(e) {
                        e.stopPropagation();
                        var slider = e.target._slider;
                        if (!slider) {
                            return;
                        }
                        if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                            var updateDx = (reverse) ? -dx : dx,
                                target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                            if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth / 2)) {
                                slider.flexAnimate(target, slider.vars.pauseOnAction);
                            } else {
                                if (!fade) { slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true); }
                            }
                        }

                        startX = null;
                        startY = null;
                        dx = null;
                        offset = null;
                        accDx = 0;
                    }
                }
            },
            resize: function () {
                if (!slider.animating && slider.is(':visible')) {
                    if (!carousel) { slider.doMath(); }

                    if (fade) {
                        // SMOOTH HEIGHT:
                        methods.smoothHeight();
                    } else if (carousel) { //CAROUSEL:
                        slider.slides.width(slider.computedW);
                        slider.update(slider.pagingCount);
                        slider.setProps();
                    }
                    else if (vertical) { //VERTICAL:
                        slider.viewport.height(slider.h);
                        slider.setProps(slider.h, "setTotal");
                    } else {
                        // SMOOTH HEIGHT:
                        if (slider.vars.smoothHeight) { methods.smoothHeight(); }
                        slider.newSlides.width(slider.computedW);
                        slider.setProps(slider.computedW, "setTotal");
                    }
                }
            },
            smoothHeight: function (dur) {
                if (!vertical || fade) {
                    var $obj = (fade) ? slider : slider.viewport;
                    (dur) ? $obj.animate({ "height": slider.slides.eq(slider.animatingTo).height() }, dur) : $obj.height(slider.slides.eq(slider.animatingTo).height());
                }
            },
            sync: function (action) {
                var $obj = $(slider.vars.sync).data("flexslider"),
                    target = slider.animatingTo;

                switch (action) {
                    case "animate": $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true); break;
                    case "play": if (!$obj.playing && !$obj.asNav) { $obj.play(); } break;
                    case "pause": $obj.pause(); break;
                }
            },
            uniqueID: function ($clone) {
                // Append _clone to current level and children elements with id attributes
                $clone.filter('[id]').add($clone.find('[id]')).each(function () {
                    var $this = $(this);
                    $this.attr('id', $this.attr('id') + '_clone');
                });
                return $clone;
            },
            pauseInvisible: {
                visProp: null,
                init: function () {
                    var visProp = methods.pauseInvisible.getHiddenProp();
                    if (visProp) {
                        var evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
                        document.addEventListener(evtname, function () {
                            if (methods.pauseInvisible.isHidden()) {
                                if (slider.startTimeout) {
                                    clearTimeout(slider.startTimeout); //If clock is ticking, stop timer and prevent from starting while invisible
                                } else {
                                    slider.pause(); //Or just pause
                                }
                            }
                            else {
                                if (slider.started) {
                                    slider.play(); //Initiated before, just play
                                } else {
                                    if (slider.vars.initDelay > 0) {
                                        setTimeout(slider.play, slider.vars.initDelay);
                                    } else {
                                        slider.play(); //Didn't init before: simply init or wait for it
                                    }
                                }
                            }
                        });
                    }
                },
                isHidden: function () {
                    var prop = methods.pauseInvisible.getHiddenProp();
                    if (!prop) {
                        return false;
                    }
                    return document[prop];
                },
                getHiddenProp: function () {
                    var prefixes = ['webkit', 'moz', 'ms', 'o'];
                    // if 'hidden' is natively supported just return it
                    if ('hidden' in document) {
                        return 'hidden';
                    }
                    // otherwise loop over all the known prefixes until we find one
                    for (var i = 0; i < prefixes.length; i++) {
                        if ((prefixes[i] + 'Hidden') in document) {
                            return prefixes[i] + 'Hidden';
                        }
                    }
                    // otherwise it's not supported
                    return null;
                }
            },
            setToClearWatchedEvent: function () {
                clearTimeout(watchedEventClearTimer);
                watchedEventClearTimer = setTimeout(function () {
                    watchedEvent = "";
                }, 3000);
            }
        };

        // public methods
        slider.flexAnimate = function (target, pause, override, withSync, fromNav) {
            if (!slider.vars.animationLoop && target !== slider.currentSlide) {
                slider.direction = (target > slider.currentSlide) ? "next" : "prev";
            }

            if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

            if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
                if (asNav && withSync) {
                    var master = $(slider.vars.asNavFor).data('flexslider');
                    slider.atEnd = target === 0 || target === slider.count - 1;
                    master.flexAnimate(target, true, false, true, fromNav);
                    slider.direction = (slider.currentItem < target) ? "next" : "prev";
                    master.direction = slider.direction;

                    if (Math.ceil((target + 1) / slider.visible) - 1 !== slider.currentSlide && target !== 0) {
                        slider.currentItem = target;
                        slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
                        target = Math.floor(target / slider.visible);
                    } else {
                        slider.currentItem = target;
                        slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
                        return false;
                    }
                }

                slider.animating = true;
                slider.animatingTo = target;

                // SLIDESHOW:
                if (pause) { slider.pause(); }

                // API: before() animation Callback
                slider.vars.before(slider);

                // SYNC:
                if (slider.syncExists && !fromNav) { methods.sync("animate"); }

                // CONTROLNAV
                if (slider.vars.controlNav) { methods.controlNav.active(); }

                // !CAROUSEL:
                // CANDIDATE: slide active class (for add/remove slide)
                if (!carousel) { slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide'); }

                // INFINITE LOOP:
                // CANDIDATE: atEnd
                slider.atEnd = target === 0 || target === slider.last;

                // DIRECTIONNAV:
                if (slider.vars.directionNav) { methods.directionNav.update(); }

                if (target === slider.last) {
                    // API: end() of cycle Callback
                    slider.vars.end(slider);
                    // SLIDESHOW && !INFINITE LOOP:
                    if (!slider.vars.animationLoop) { slider.pause(); }
                }

                // SLIDE:
                if (!fade) {
                    var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
                        margin, slideString, calcNext;

                    // INFINITE LOOP / REVERSE:
                    if (carousel) {
                        margin = slider.vars.itemMargin;
                        calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
                        slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
                    } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next") {
                        slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
                    } else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev") {
                        slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
                    } else {
                        slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
                    }
                    slider.setProps(slideString, "", slider.vars.animationSpeed);
                    if (slider.transitions) {
                        if (!slider.vars.animationLoop || !slider.atEnd) {
                            slider.animating = false;
                            slider.currentSlide = slider.animatingTo;
                        }

                        // Unbind previous transitionEnd events and re-bind new transitionEnd event
                        slider.container.unbind("webkitTransitionEnd transitionend");
                        slider.container.bind("webkitTransitionEnd transitionend", function () {
                            clearTimeout(slider.ensureAnimationEnd);
                            slider.wrapup(dimension);
                        });

                        // Insurance for the ever-so-fickle transitionEnd event
                        clearTimeout(slider.ensureAnimationEnd);
                        slider.ensureAnimationEnd = setTimeout(function () {
                            slider.wrapup(dimension);
                        }, slider.vars.animationSpeed + 100);
                    } else {
                        slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function () {
                            slider.wrapup(dimension);
                        });
                    }
                } else { // FADE:
                    if (!touch) {
                        //slider.slides.eq(slider.currentSlide).fadeOut(slider.vars.animationSpeed, slider.vars.easing);
                        //slider.slides.eq(target).fadeIn(slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

                        slider.slides.eq(slider.currentSlide).css({ "zIndex": 1 }).animate({ "opacity": 0 }, slider.vars.animationSpeed, slider.vars.easing);
                        slider.slides.eq(target).css({ "zIndex": 2 }).animate({ "opacity": 1 }, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);
                    } else {
                        slider.slides.eq(slider.currentSlide).css({ "opacity": 0, "zIndex": 1 });
                        slider.slides.eq(target).css({ "opacity": 1, "zIndex": 2 });
                        slider.wrapup(dimension);
                    }
                }
                // SMOOTH HEIGHT:
                if (slider.vars.smoothHeight) { methods.smoothHeight(slider.vars.animationSpeed); }
            }
        };
        slider.wrapup = function (dimension) {
            // SLIDE:
            if (!fade && !carousel) {
                if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop) {
                    slider.setProps(dimension, "jumpEnd");
                } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop) {
                    slider.setProps(dimension, "jumpStart");
                }
            }
            slider.animating = false;
            slider.currentSlide = slider.animatingTo;
            // API: after() animation Callback
            slider.vars.after(slider);
        };

        // SLIDESHOW:
        slider.animateSlides = function () {
            if (!slider.animating && focused) { slider.flexAnimate(slider.getTarget("next")); }
        };
        // SLIDESHOW:
        slider.pause = function () {
            clearInterval(slider.animatedSlides);
            slider.animatedSlides = null;
            slider.playing = false;
            // PAUSEPLAY:
            if (slider.vars.pausePlay) { methods.pausePlay.update("play"); }
            // SYNC:
            if (slider.syncExists) { methods.sync("pause"); }
        };
        // SLIDESHOW:
        slider.play = function () {
            if (slider.playing) { clearInterval(slider.animatedSlides); }
            slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
            slider.started = slider.playing = true;
            // PAUSEPLAY:
            if (slider.vars.pausePlay) { methods.pausePlay.update("pause"); }
            // SYNC:
            if (slider.syncExists) { methods.sync("play"); }
        };
        // STOP:
        slider.stop = function () {
            slider.pause();
            slider.stopped = true;
        };
        slider.canAdvance = function (target, fromNav) {
            // ASNAV:
            var last = (asNav) ? slider.pagingCount - 1 : slider.last;
            return (fromNav) ? true :
                   (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
                   (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
                   (target === slider.currentSlide && !asNav) ? false :
                   (slider.vars.animationLoop) ? true :
                   (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
                   (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
                   true;
        };
        slider.getTarget = function (dir) {
            slider.direction = dir;
            if (dir === "next") {
                return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
            } else {
                return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
            }
        };

        // SLIDE:
        slider.setProps = function (pos, special, dur) {
            var target = (function () {
                var posCheck = (pos) ? pos : ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo,
                    posCalc = (function () {
                        if (carousel) {
                            return (special === "setTouch") ? pos :
                                   (reverse && slider.animatingTo === slider.last) ? 0 :
                                   (reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                                   (slider.animatingTo === slider.last) ? slider.limit : posCheck;
                        } else {
                            switch (special) {
                                case "setTotal": return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                                case "setTouch": return (reverse) ? pos : pos;
                                case "jumpEnd": return (reverse) ? pos : slider.count * pos;
                                case "jumpStart": return (reverse) ? slider.count * pos : pos;
                                default: return pos;
                            }
                        }
                    }());

                return (posCalc * -1) + "px";
            }());

            if (slider.transitions) {
                target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
                dur = (dur !== undefined) ? (dur / 1000) + "s" : "0s";
                slider.container.css("-" + slider.pfx + "-transition-duration", dur);
                slider.container.css("transition-duration", dur);
            }

            slider.args[slider.prop] = target;
            if (slider.transitions || dur === undefined) { slider.container.css(slider.args); }

            slider.container.css('transform', target);
        };

        slider.setup = function (type) {
            // SLIDE:
            if (!fade) {
                var sliderOffset, arr;

                if (type === "init") {
                    slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({ "overflow": "hidden", "position": "relative" }).appendTo(slider).append(slider.container);
                    // INFINITE LOOP:
                    slider.cloneCount = 0;
                    slider.cloneOffset = 0;
                    // REVERSE:
                    if (reverse) {
                        arr = $.makeArray(slider.slides).reverse();
                        slider.slides = $(arr);
                        slider.container.empty().append(slider.slides);
                    }
                }
                // INFINITE LOOP && !CAROUSEL:
                if (slider.vars.animationLoop && !carousel) {
                    slider.cloneCount = 2;
                    slider.cloneOffset = 1;
                    // clear out old clones
                    if (type !== "init") { slider.container.find('.clone').remove(); }
                    slider.container.append(methods.uniqueID(slider.slides.first().clone().addClass('clone')).attr('aria-hidden', 'true'))
                                    .prepend(methods.uniqueID(slider.slides.last().clone().addClass('clone')).attr('aria-hidden', 'true'));
                }
                slider.newSlides = $(slider.vars.selector, slider);

                sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
                // VERTICAL:
                if (vertical && !carousel) {
                    slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
                    setTimeout(function () {
                        slider.newSlides.css({ "display": "block" });
                        slider.doMath();
                        slider.viewport.height(slider.h);
                        slider.setProps(sliderOffset * slider.h, "init");
                    }, (type === "init") ? 100 : 0);
                } else {
                    slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
                    slider.setProps(sliderOffset * slider.computedW, "init");
                    setTimeout(function () {
                        slider.doMath();
                        slider.newSlides.css({ "width": slider.computedW, "marginRight": slider.computedM, "float": "left", "display": "block" });
                        // SMOOTH HEIGHT:
                        if (slider.vars.smoothHeight) { methods.smoothHeight(); }
                    }, (type === "init") ? 100 : 0);
                }
            } else { // FADE:
                slider.slides.css({ "width": "100%", "float": "left", "marginRight": "-100%", "position": "relative" });
                if (type === "init") {
                    if (!touch) {
                        //slider.slides.eq(slider.currentSlide).fadeIn(slider.vars.animationSpeed, slider.vars.easing);
                        if (slider.vars.fadeFirstSlide == false) {
                            slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({ "zIndex": 2 }).css({ "opacity": 1 });
                        } else {
                            slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({ "zIndex": 2 }).animate({ "opacity": 1 }, slider.vars.animationSpeed, slider.vars.easing);
                        }
                    } else {
                        slider.slides.css({ "opacity": 0, "display": "block", "webkitTransition": "opacity " + slider.vars.animationSpeed / 1000 + "s ease", "zIndex": 1 }).eq(slider.currentSlide).css({ "opacity": 1, "zIndex": 2 });
                    }
                }
                // SMOOTH HEIGHT:
                if (slider.vars.smoothHeight) { methods.smoothHeight(); }
            }
            // !CAROUSEL:
            // CANDIDATE: active slide
            if (!carousel) { slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide"); }

            //FlexSlider: init() Callback
            slider.vars.init(slider);
        };

        slider.doMath = function () {
            var slide = slider.slides.first(),
                slideMargin = slider.vars.itemMargin,
                minItems = slider.vars.minItems,
                maxItems = slider.vars.maxItems;

            slider.w = (slider.viewport === undefined) ? slider.width() : slider.viewport.width();
            slider.h = slide.height();
            slider.boxPadding = slide.outerWidth() - slide.width();

            // CAROUSEL:
            if (carousel) {
                slider.itemT = slider.vars.itemWidth + slideMargin;
                slider.itemM = slideMargin;
                slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
                slider.maxW = (maxItems) ? (maxItems * slider.itemT) - slideMargin : slider.w;
                slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1))) / minItems :
                               (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1))) / maxItems :
                               (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;

                slider.visible = Math.floor(slider.w / (slider.itemW));
                slider.move = (slider.vars.move > 0 && slider.vars.move < slider.visible) ? slider.vars.move : slider.visible;
                slider.pagingCount = Math.ceil(((slider.count - slider.visible) / slider.move) + 1);
                slider.last = slider.pagingCount - 1;
                slider.limit = (slider.pagingCount === 1) ? 0 :
                               (slider.vars.itemWidth > slider.w) ? (slider.itemW * (slider.count - 1)) + (slideMargin * (slider.count - 1)) : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
            } else {
                slider.itemW = slider.w;
                slider.itemM = slideMargin;
                slider.pagingCount = slider.count;
                slider.last = slider.count - 1;
            }
            slider.computedW = slider.itemW - slider.boxPadding;
            slider.computedM = slider.itemM;
        };

        slider.update = function (pos, action) {
            slider.doMath();

            // update currentSlide and slider.animatingTo if necessary
            if (!carousel) {
                if (pos < slider.currentSlide) {
                    slider.currentSlide += 1;
                } else if (pos <= slider.currentSlide && pos !== 0) {
                    slider.currentSlide -= 1;
                }
                slider.animatingTo = slider.currentSlide;
            }

            // update controlNav
            if (slider.vars.controlNav && !slider.manualControls) {
                if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
                    methods.controlNav.update("add");
                } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
                    if (carousel && slider.currentSlide > slider.last) {
                        slider.currentSlide -= 1;
                        slider.animatingTo -= 1;
                    }
                    methods.controlNav.update("remove", slider.last);
                }
            }
            // update directionNav
            if (slider.vars.directionNav) { methods.directionNav.update(); }
        };

        slider.addSlide = function (obj, pos) {
            var $obj = $(obj);

            slider.count += 1;
            slider.last = slider.count - 1;

            // append new slide
            if (vertical && reverse) {
                (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
            } else {
                (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
            }

            // update currentSlide, animatingTo, controlNav, and directionNav
            slider.update(pos, "add");

            // update slider.slides
            slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
            // re-setup the slider to accomdate new slide
            slider.setup();

            //FlexSlider: added() Callback
            slider.vars.added(slider);
        };
        slider.removeSlide = function (obj) {
            var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;

            // update count
            slider.count -= 1;
            slider.last = slider.count - 1;

            // remove slide
            if (isNaN(obj)) {
                $(obj, slider.slides).remove();
            } else {
                (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
            }

            // update currentSlide, animatingTo, controlNav, and directionNav
            slider.doMath();
            slider.update(pos, "remove");

            // update slider.slides
            slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
            // re-setup the slider to accomdate new slide
            slider.setup();

            // FlexSlider: removed() Callback
            slider.vars.removed(slider);
        };

        //FlexSlider: Initialize
        methods.init();
    };

    // Ensure the slider isn't focussed if the window loses focus.
    $(window).blur(function (e) {
        focused = false;
    }).focus(function (e) {
        focused = true;
    });

    //FlexSlider: Default Settings
    $.flexslider.defaults = {
        namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
        selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
        animation: "fade",              //String: Select your animation type, "fade" or "slide"
        easing: "swing",                //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
        direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
        reverse: false,                 //{NEW} Boolean: Reverse the animation direction
        animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
        smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
        startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
        slideshow: true,                //Boolean: Animate slider automatically
        slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
        animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
        initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
        randomize: false,               //Boolean: Randomize slide order
        fadeFirstSlide: true,           //Boolean: Fade in the first slide when animation type is "fade"
        thumbCaptions: false,           //Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

        // Usability features
        pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
        pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
        pauseInvisible: true,   		//{NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
        useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
        touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
        video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

        // Primary Controls
        controlNav: true,               //Boolean: Create navigation for paging control of each slide? Note: Leave true for manualControls usage
        directionNav: false,             //Boolean: Create navigation for previous/next navigation? (true/false)
        prevText: "Previous",           //String: Set the text for the "previous" directionNav item
        nextText: "Next",               //String: Set the text for the "next" directionNav item

        // Secondary Navigation
        keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
        multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
        mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js - Allows slider navigating via mousewheel
        pausePlay: false,               //Boolean: Create pause/play dynamic element
        pauseText: "Pause",             //String: Set the text for the "pause" pausePlay item
        playText: "Play",               //String: Set the text for the "play" pausePlay item

        // Special properties
        controlsContainer: "",          //{UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
        manualControls: "",             //{UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
        customDirectionNav: "",         //{NEW} jQuery Object/Selector: Custom prev / next button. Must be two jQuery elements. In order to make the events work they have to have the classes "prev" and "next" (plus namespace)
        sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
        asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

        // Carousel Options
        itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
        itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
        minItems: 1,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
        maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
        move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
        allowOneSlide: true,           //{NEW} Boolean: Whether or not to allow a slider comprised of a single slide

        // Callback API
        start: function () { },            //Callback: function(slider) - Fires when the slider loads the first slide
        before: function () { },           //Callback: function(slider) - Fires asynchronously with each slider animation
        after: function () { },            //Callback: function(slider) - Fires after each slider animation completes
        end: function () { },              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
        added: function () { },            //{NEW} Callback: function(slider) - Fires after a slide is added
        removed: function () { },           //{NEW} Callback: function(slider) - Fires after a slide is removed
        init: function () { }             //{NEW} Callback: function(slider) - Fires after the slider is initially setup
    };

    //FlexSlider: Plugin Function
    $.fn.flexslider = function (options) {
        if (options === undefined) { options = {}; }

        if (typeof options === "object") {
            return this.each(function () {
                var $this = $(this),
                    selector = (options.selector) ? options.selector : ".slides > li",
                    $slides = $this.find(selector);

                if (($slides.length === 1 && options.allowOneSlide === true) || $slides.length === 0) {
                    $slides.fadeIn(400);
                    if (options.start) { options.start($this); }
                } else if ($this.data('flexslider') === undefined) {
                    new $.flexslider(this, options);
                }
            });
        } else {
            // Helper strings to quickly perform functions on the slider
            var $slider = $(this).data('flexslider');
            switch (options) {
                case "play": $slider.play(); break;
                case "pause": $slider.pause(); break;
                case "stop": $slider.stop(); break;
                case "next": $slider.flexAnimate($slider.getTarget("next"), true); break;
                case "prev":
                case "previous": $slider.flexAnimate($slider.getTarget("prev"), true); break;
                default: if (typeof options === "number") { $slider.flexAnimate(options, true); }
            }
        }
    };
})(jQuery);
var intervalId;
var timeCounter = 0;


function weChatCheckStatus(weChatCheckUserStatusUrl, weChatPostUserScanUrl, newWindow) {
    //console.log(timeCounter + " : " + newWindow.closed);
    $.ajax({
        type: "GET",
        url: weChatCheckUserStatusUrl,
        dataType: "json",
        cache: false,
        success: function (response) {
            if (response.status == "not scanned") {
                //await sleep(2000);

            }
            else {
                timeCounter = 0;
                clearInterval(intervalId);
                if (navigator.userAgent.search("rv:11.0") != -1 || navigator.userAgent.search("MSIE") != -1 || navigator.userAgent.search("Edge") != -1) {
                    newWindow.close();
                    var n = window.open(weChatPostUserScanUrl, "_blank", "width=100,height=100");
                    n.focus();
                }
                else {
                    newWindow.location.replace(weChatPostUserScanUrl);
                }

            }
        },
        error: function (response) {
            timeCounter = 0;
            clearInterval(intervalId);
        }
    });
    if (++timeCounter == 30) {
        timeCounter = 0;
        clearInterval(intervalId);
    }
}

var WeChatScanAdminQR = function (adminQRCodeUrl) {
    swal({
        title: "Note!",
        text: "Old tokens will no longer be valid",
        timer: 3000,
        showConfirmButton: false
    });
    window.location.replace(adminQRCodeUrl);
}
function Domain(domainMappings, urlIdpMappings, inputControl, preRedirectionToIdp, onError) {

	if (typeof domainMappings !== "object")
		throw "domapingMappings is not set";

	if (typeof urlIdpMappings === "undefined" || urlIdpMappings === "")
		throw "urlIdpMappings is not set or is empty.";

	if (typeof inputControl !== "object")
		throw "inputControl is not set or is not an input field.";

    this.urlIdpMappings = urlIdpMappings;
    this.preRedirectionToIdp = preRedirectionToIdp;
    this.onError = onError;
    this.inputControl = inputControl;

    this.StartListeningControl = function () {
        inputControl.blur(domainCheck);
    };


    var redirectToIdp = function (domain) {

        if (typeof domain !== "string" || domain === '')
            throw "domain is null or empty";

        preRedirectionToIdp();
        var promise = fetchIdpDetails(domain);
        promise.done(redirect);
    };


    let domainCheck = function () {
        var email = inputControl.val();
        if (email !== '') {
            var indexOfDomainChar = email.indexOf('@');
            if (indexOfDomainChar > 0) {
                var domain = email.substring(indexOfDomainChar + 1);

                if (domain !== '' && domain.trim() !== '') {
                    domain = domain.trim().toLowerCase();
                    var protocol = '';
                    var idpUrl = '';
                    var binding = '';

                    $.grep(domainMappings, function (mapping, i) {
                        if (mapping.Domain.toLowerCase() === domain) {
                            protocol = mapping.Protocol.toLowerCase();
                            binding = mapping.SamlBinding;
                        }
                    });

                    if (protocol !== '' && protocol.indexOf("saml 2.0") >= 0) { 
                    redirectToIdp(domain);
                }
                    }
                }
        }
        return false;
    };

    let redirect = function (data) {
        if (typeof data !== "undefined") {
            if (data.status === true) {
                var stateParamName = data.stateParamName;
                if (typeof stateParamName === "undefined") { stateParamName = "RelayState"; }
                if (data.queryStringRelayState) {

                    var _mainUrl = window.location.href.toLowerCase().replace("/login/", "/in/").replace("/loginorregister/", "/in/");

                    if (_mainUrl.toLowerCase().indexOf("relaystate") === -1 && data.relayState != "") { var _relayState = data.relayState; }

                    if (typeof _relayState !== "undefined") {

                            if (_mainUrl.indexOf('?') === -1 ) {
                                _mainUrl += "?" + "RelayState" + "=" + _relayState;
                            }
                            else {
                                _mainUrl += "&" + "RelayState" + "=" + _relayState;
                            }
                    }

                    var _bs64EnUrl = btoa(_mainUrl);
                    var _enUri = encodeURIComponent(_bs64EnUrl);

                    // get idpUrl based on get/post
                    if (data.isPost) {
                        redirectWithPost(data, _enUri);
                    }
                    else {
                        idpUrl = data.idpUrl;
                        if (idpUrl.indexOf('?') === -1) {
                            idpUrl += "?" + stateParamName + "=" + _enUri;
                        }
                        else {
                            idpUrl += "&" + stateParamName + "=" + _enUri;
                        }
                        if (idpUrl !== '') {
                            window.location.href = idpUrl;
                            return;
                        }
                    }
                }
            }
        }
        else if (typeof data === "undefined") {
            onError();
        }
    };


    var redirectWithPost = function (data, _enUri) {
        if (typeof data !== "undefined") {
            if (data.idpUrl.indexOf('SAMLRequest') != -1) {
                var samlAuthReq = data.idpUrl.substring(data.idpUrl.indexOf('SAMLRequest') + 12);
                var idpUrl = data.idpUrl.substring(0, data.idpUrl.indexOf('?'));
            }
            var stateParamName = data.stateParamName;
            if (typeof stateParamName === "undefined")
            {
                stateParamName = "RelayState";
            }
            //form post
            var form = document.createElement('form');
            form.method = 'POST';
            form.action = idpUrl;

            var input = document.createElement('input');
            input.name = 'SAMLRequest';
            input.value = samlAuthReq;
            input.type = 'hidden';
            form.appendChild(input)
            var input = document.createElement('input');
            input.name = stateParamName;
            input.value = _enUri;
            input.type = 'hidden';
            form.appendChild(input)
            document.body.appendChild(form);
            form.submit();
        }
        else if (typeof data === "undefined") {
            onError();
        }
    }


   
    let fetchIdpDetails = function (domain) {
        var idpUrl = '';

        return $.ajax({
            type: "GET",
            url: urlIdpMappings + encodeURIComponent(domain),
            error: function (e) {
                onError();
            }
        });
    };
}
function evaluateExpression(formId) {
	if (formId !== "undefined" && $("#" + formId).length === 1) {
		var expressionResult = "";
		if ($("#kiteExpression").length === 1) {
			try {
				var expression = $("#kiteExpression")[0].value;
				expressionResult = Function('"use strict";return (' + atob(expression) + ')')();
			}
			catch (e) {
				expressionResult = e;
			}

			if ($("#" + formId).children("input[name='kiteExpressionResult']").length === 1) {
				$("#" + formId).children("input[name='kiteExpressionResult']")[0].value = btoa(expressionResult);
			}
		}

		if ($("#kiteImage").length === 1) {
			var kiteImgProperties = "w=" + $("#kiteImage")[0].width + "&h=" + $("#kiteImage")[0].height;

			if ($("#" + formId).children("input[name='kiteImageResult']").length === 1) {
				$("#" + formId).children("input[name='kiteImageResult']")[0].value = btoa(kiteImgProperties);
			}
		}

		if ($("#kiteSImage").length === 1) {
			var kiteSImgProperties = "w=" + $("#kiteSImage")[0].width + "&h=" + $("#kiteSImage")[0].height;

			if ($("#" + formId).children("input[name='kiteSImageResult']").length === 1) {
				$("#" + formId).children("input[name='kiteSImageResult']")[0].value = btoa(kiteSImgProperties);
			}
		}

		if ($("#kiteFs").length === 1) {
			var fsResult = "";
			try {
				var fsExpression = $("#kiteFs")[0].value;
				fsResult = Function('"use strict";return (' + atob(fsExpression) + ')')();
			}
			catch (e) {
				fsResult = e;
			}

			if ($("#" + formId).children("input[name='kiteFsResult']").length === 1) {
				$("#" + formId).children("input[name='kiteFsResult']")[0].value = btoa(fsResult);
			}
		}
	}
}

function writeDataCaptureObjectToForm(formId, dataObject) {
	if (formId !== "undefined" && $("#" + formId).length === 1) {
		if ($("#" + formId).children("input[name='daisDC']").length === 1) {
			$("#" + formId).children("input[name='daisDC']")[0].value = dataObject;
		}
	}
}
