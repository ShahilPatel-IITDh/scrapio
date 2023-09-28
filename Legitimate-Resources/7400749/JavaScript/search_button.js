/**
 * uisearch.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
 !function(e){"use strict";function t(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)")}var n,s,i;function a(e,t){(n(e,t)?i:s)(e,t)}"classList"in document.documentElement?(n=function(e,t){return e.classList.contains(t)},s=function(e,t){e.classList.add(t)},i=function(e,t){e.classList.remove(t)}):(n=function(e,n){return t(n).test(e.className)},s=function(e,t){n(e,t)||(e.className=e.className+" "+t)},i=function(e,n){e.className=e.className.replace(t(n)," ")});var r={hasClass:n,addClass:s,removeClass:i,toggleClass:a,has:n,add:s,remove:i,toggle:a};"function"==typeof define&&define.amd?define(r):e.classie=r}(window),function(e){"use strict";function t(e,t){this.el=e,this.inputEl=e.querySelector("form > input.sb-search-input"),this.inputSubmit=e.querySelector("form > input.sb-search-submit"),this._initEvents()}!e.addEventListener&&e.Element&&function(){function e(e,t){Window.prototype[e]=HTMLDocument.prototype[e]=Element.prototype[e]=t}var t=[];e("addEventListener",function(e,n){var s=this;t.unshift({__listener:function(e){e.currentTarget=s,e.pageX=e.clientX+document.documentElement.scrollLeft,e.pageY=e.clientY+document.documentElement.scrollTop,e.preventDefault=function(){e.returnValue=!1},e.relatedTarget=e.fromElement||null,e.stopPropagation=function(){e.cancelBubble=!0},e.relatedTarget=e.fromElement||null,e.target=e.srcElement||s,e.timeStamp=+new Date,n.call(s,e)},listener:n,target:s,type:e}),this.attachEvent("on"+e,t[0].__listener)}),e("removeEventListener",function(e,n){for(var s=0,i=t.length;s<i;++s)if(t[s].target==this&&t[s].type==e&&t[s].listener==n)return this.detachEvent("on"+e,t.splice(s,1)[0].__listener)}),e("dispatchEvent",function(e){try{return this.fireEvent("on"+e.type,e)}catch(i){for(var n=0,s=t.length;n<s;++n)t[n].target==this&&t[n].type==e.type&&t[n].call(this,e)}})}(),!String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),t.prototype={_initEvents:function(){var e=this,t=function(t){t.stopPropagation(),e.inputEl.value=e.inputEl.value.trim(),classie.has(e.el,"sb-search-open")?classie.has(e.el,"sb-search-open")&&/^\s*$/.test(e.inputEl.value)?(t.preventDefault(),e.close()):classie.has(e.el,"sb-search-open")&&(classie.has(t.target,"sb-icon-search")||"use"===t.target.nodeName)&&(t.preventDefault(),e.close()):(t.preventDefault(),e.open())};this.el.addEventListener("click",t),this.el.addEventListener("touchstart",t),this.inputEl.addEventListener("click",function(e){e.stopPropagation()}),this.inputEl.addEventListener("touchstart",function(e){e.stopPropagation()})},open:function(){var e=this;classie.add(this.el,"sb-search-open"),this.inputEl.focus();var t=function(n){classie.has(e.el,"sb-search-open")&&/^\s*$/.test(e.inputEl.value)?(n.preventDefault(),e.close()):classie.has(e.el,"sb-search-open")&&(classie.has(n.target,"sb-icon-search")||"use"===n.target.nodeName)&&(n.preventDefault(),e.close()),this.removeEventListener("click",t),this.removeEventListener("touchstart",t)};document.addEventListener("click",t),document.addEventListener("touchstart",t)},close:function(){this.inputEl.blur(),classie.remove(this.el,"sb-search-open")}},e.UISearch=t}(window);