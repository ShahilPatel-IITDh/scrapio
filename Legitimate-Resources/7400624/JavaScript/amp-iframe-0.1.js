;
(self.AMP=self.AMP||[]).push({m:0,v:"2307212240000",n:"amp-iframe",ev:"0.1",l:!0,f:function(t,n){!function(){function n(t,n,r){return n in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t}function r(t,n){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),r.push.apply(r,i)}return r}function i(t){for(var i=1;i<arguments.length;i++){var e=null!=arguments[i]?arguments[i]:{};i%2?r(Object(e),!0).forEach((function(r){n(t,r,e[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):r(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}function e(t,n){(null==n||n>t.length)&&(n=t.length);for(var r=0,i=new Array(n);r<n;r++)i[r]=t[r];return i}function o(t,n){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(r)return(r=r.call(t)).next.bind(r);if(Array.isArray(t)||(r=function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var i=0;return function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var u;function a(){return u||(u=Promise.resolve(void 0))}var s=function(){var t=this;this.promise=new Promise((function(n,r){t.resolve=n,t.reject=r}))};function f(t,n){return(f=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function l(t){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function h(t,n){if(n&&("object"===l(n)||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}var v=Array.isArray;function m(t,n){for(var r=[],i=0,e=0;e<t.length;e++){var o=t[e];n(o,e,t)?r.push(o):(i<e&&(t[i]=o),i++)}return i<t.length&&(t.length=i),r}function d(t,n){var r=t.length-n.length;return r>=0&&t.indexOf(n,r)==r}var p,b,g=Object.prototype;function y(t){var n=Object.create(null);return t&&Object.assign(n,t),n}function w(t,n,r,i,e,o,u,a,s,f,c){return t}function O(t){var n=Object.getOwnPropertyDescriptor(t,"message");if(null!=n&&n.writable)return t;var r=t.message,i=t.stack,e=new Error(r);for(var o in t)e[o]=t[o];return e.stack=i,e}function j(t){for(var n,r=null,i="",e=o(arguments,!0);!(n=e()).done;){var u=n.value;u instanceof Error&&!r?r=O(u):(i&&(i+=" "),i+=u)}return r?i&&(r.message=i+": "+r.message):r=new Error(i),r}function S(t){var n,r;null===(n=(r=self).__AMP_REPORT_ERROR)||void 0===n||n.call(r,t)}function x(t){var n=j.apply(null,arguments);setTimeout((function(){throw S(n),n}))}function E(t){try{for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];return t.apply(null,r)}catch(t){x(t)}}function P(t){return JSON.parse(t)}function I(t,n){try{return P(t)}catch(t){return null==n||n(t),null}}function M(t){return"string"==typeof t&&t.startsWith("amp-")&&-1!=t.indexOf("{")}function A(t){return(t.ownerDocument||t).defaultView}function R(t){var n;null===(n=t.parentElement)||void 0===n||n.removeChild(t)}function z(t,n,r,i){for(var e,u,a=o(v(e=t)?e:[e],!0);!(u=a()).done;){var s=u.value,f=n.getAttribute(s);null!==f?r.setAttribute(s,f):i&&r.removeAttribute(s)}}g.hasOwnProperty,g.toString;var T=["Webkit","webkit","Moz","moz","ms","O","o"],k={"getPropertyPriority":function(){return""},"getPropertyValue":function(){return""}};function N(t,n,r,i,e){var o=function(t,n,r){if(n.startsWith("--"))return n;b||(b=y());var i=b[n];if(!i||r){if(i=n,void 0===t[n]){var e=function(t){return t.charAt(0).toUpperCase()+t.slice(1)}(n),o=function(t,n){for(var r=0;r<T.length;r++){var i=T[r]+n;if(void 0!==t[i])return i}return""}(t,e);void 0!==t[o]&&(i=o)}r||(b[n]=i)}return i}(t.style,n,e);if(o){var u,a=i?r+i:r;t.style.setProperty((u=o.replace(/[A-Z]/g,(function(t){return"-"+t.toLowerCase()})),T.some((function(t){return u.startsWith(t+"-")}))?"-".concat(u):u),a)}}function C(t,n){return t.getComputedStyle(n)||k}var G=/vertical/,L=new WeakMap,_=new WeakMap,F=new WeakMap;function B(t){var n=L.get(t);return n||(n=new t.ResizeObserver(D),L.set(t,n)),n}function D(t){for(var n=new Set,r=t.length-1;r>=0;r--){var i=t[r],e=i.target;if(!n.has(e)){n.add(e);var o=_.get(e);if(o){F.set(e,i);for(var u=0;u<o.length;u++){var a=o[u],s=a.callback;q(a.type,s,i)}}}}}function q(t,n,r){if(0==t){var i=r.contentRect,e=i.height;E(n,{width:i.width,height:e})}else if(1==t){var o,u=r.borderBoxSize;if(u)o=u.length>0?u[0]:{inlineSize:0,blockSize:0};else{var a,s,f=r.target,c=A(f),l=G.test(C(c,f).writingMode),h=f,v=h.offsetHeight,m=h.offsetWidth;l?(s=m,a=v):(a=m,s=v),o={inlineSize:a,blockSize:s}}E(n,o)}}var J=function(){function t(t){this.Ml=t,this.Zv=!1,this.Qv=!1,this.nb=this.nb.bind(this)}var n=t.prototype;return n.updatePlaying=function(t){t!==this.Zv&&(this.Zv=t,t?(this.Qv=!1,function(t,n,r){var i=t.ownerDocument.defaultView;if(i){var e=_.get(t);if(e||(e=[],_.set(t,e),B(i).observe(t)),!e.some((function(t){return t.callback===r&&1===t.type}))){e.push({type:1,callback:r});var o=F.get(t);o&&setTimeout((function(){return q(1,r,o)}))}}}(this.Ml,0,this.nb)):function(t,n){!function(t,n,r){var i=_.get(t);if(i&&(m(i,(function(t){return t.callback===r&&1===t.type})),0==i.length)){_.delete(t),F.delete(t);var e=t.ownerDocument.defaultView;e&&B(e).unobserve(t)}}(t,0,n)}(this.Ml,this.nb))},n.nb=function(t){var n=t.blockSize,r=t.inlineSize>0&&n>0;if(r!==this.Qv){this.Qv=r;var i=this.Ml;r||i.pause()}},t}(),U=/(?:^[#?]?|&)([^=&]+)(?:=([^&]*))?/g;function X(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";try{return decodeURIComponent(t)}catch(t){return n}}self.__AMP_LOG=self.__AMP_LOG||{user:null,dev:null,userForEmbed:null};var Y=self.__AMP_LOG;function H(t,n){throw new Error("failed to call initLogConstructor")}function W(t){return Y.user||(Y.user=Z()),function(t,n){return n&&n.ownerDocument.defaultView!=t}(Y.user.win,t)?Y.userForEmbed||(Y.userForEmbed=Z()):Y.user}function Z(t){return H()}function $(){return Y.dev||(Y.dev=H())}function K(t,n,r,i,e,o,u,a,s,f,c){return t}function V(t,n,r,i,e,o,u,a,s,f,c){return W().assert(t,n,r,i,e,o,u,a,s,f,c)}function Q(t,n){return et(t=function(t){return t.__AMP_TOP||(t.__AMP_TOP=t)}(t),n)}function tt(t,n){var r=it(rt(t));return at(r,n)?et(r,n):null}function nt(t,n){return ot(it(t),n)}function rt(t){return t.nodeType?(n=A(t),Q(n,"ampdoc")).getAmpDoc(t):t;var n}function it(t){var n=rt(t);return n.isSingleDoc()?n.win:n}function et(t,n){K(at(t,n));var r=ut(t)[n];return r.obj||(K(r.ctor),K(r.context),r.obj=new r.ctor(r.context),K(r.obj),r.context=null,r.resolve&&r.resolve(r.obj)),r.obj}function ot(t,n){var r=ut(t)[n];return r?r.promise?r.promise:(et(t,n),r.promise=Promise.resolve(r.obj)):null}function ut(t){var n=t.__AMP_SERVICES;return n||(n=t.__AMP_SERVICES={}),n}function at(t,n){var r=t.__AMP_SERVICES&&t.__AMP_SERVICES[n];return!(!r||!r.ctor)}var st="__AMP__EXPERIMENT_TOGGLES";new RegExp("^https://([a-zA-Z0-9_-]+.)?cdn.ampproject.org(/.*)?$"),new RegExp("^([a-zA-Z0-9_-]+.)?localhost$");var ft=function(t){return et(t,"timer")},ct=function(t){return function(t,n,r,i){var e=nt(t,n);if(e)return e;var o=rt(t);return o.whenExtensionsKnown().then((function(){var t=o.getExtensionVersion(r);return t?Q(o.win,"extensions").waitForExtension(r,t):null})).then((function(r){return r?function(t,n){return function(t,n){var r=ot(t,n);if(r)return r;var i,e,o,u,a=ut(t);return a[n]=(e=(i=new s).promise,o=i.reject,u=i.resolve,e.catch((function(){})),{obj:null,promise:e,resolve:u,reject:o,context:null,ctor:null}),a[n].promise}(it(t),n)}(t,n):null}))}(t,"consentPolicyManager","amp-consent")},lt=function(t){return tt(t,"url")};function ht(t){return t.data}var vt,mt,dt=function(){function t(t){this.dr=t,this.pr=0,this.mr=0,this.yr=y()}var n=t.prototype;return n.has=function(t){return!!this.yr[t]},n.get=function(t){var n=this.yr[t];if(n)return n.access=++this.mr,n.payload},n.put=function(t,n){this.has(t)||this.pr++,this.yr[t]={payload:n,access:this.mr},this.gr()},n.gr=function(){if(!(this.pr<=this.dr)){var t,n=this.yr,r=this.mr+1;for(var i in n){var e=n[i].access;e<r&&(r=e,t=i)}void 0!==t&&(delete n[t],this.pr--)}},t}(),pt="unlisten";function bt(t,n,r){var i=function(t,n){var r=t.listeningFors;return!r&&n&&(r=t.listeningFors=Object.create(null)),r||null}(t,r);if(!i)return i;var e=i[n];return!e&&r&&(e=i[n]=[]),e||null}function gt(t,n){for(var r=n;r&&r!=r.parent;r=r.parent)if(r==t)return!0;return!1}function yt(t){for(var n={"sentinel":pt},r=t.length-1;r>=0;r--){var i=t[r];if(!i.frame.contentWindow){t.splice(r,1);var e=i.events;for(var o in e)e[o].splice(0,1/0).forEach((function(t){t(n)}))}}}function wt(t,n,r,i,e,o){K(t.src),K(!t.parentNode),K(r);var u=t.ownerDocument.defaultView;!function(t){t.listeningFors||t.addEventListener("message",(function(n){if(ht(n)){var r=function(t){return"string"==typeof t&&(t="{"==t.charAt(0)?I(t,(function(t){$().warn("IFRAME-HELPER","Postmessage could not be parsed. Is it in a valid JSON format?",t)}))||null:M(t)?function(t){if(!M(t))return null;var n=t.indexOf("{");return w(-1!=n),I(t.substr(n),(function(n){x(new Error("MESSAGING: Failed to parse message: ".concat(t,"\n").concat(n.message)))}))}(t):null),t}(ht(n));if(r&&r.sentinel){var i=function(t,n,r,i){var e,o=bt(t,n);if(!o)return o;for(var u=0;u<o.length;u++){var a=o[u],s=a.frame.contentWindow;if(s){if(i==s||gt(s,i)){e=a;break}}else setTimeout(yt,0,o)}return e?e.events:null}(t,r.sentinel,n.origin,n.source);if(i){var e=i[r.type];if(e){e=e.slice();for(var o=0;o<e.length;o++)(0,e[o])(r,n.source,n.origin,n)}}}}}))}(u);var a,s,f=function(t,n,r){for(var i,e=bt(t,Ot(n,r),!0),o=0;o<e.length;o++){var u=e[o];if(u.frame===n){i=u;break}}return i||(i={frame:n,events:Object.create(null)},e.push(i)),i.events}(u,t,i),c=(s=t.src,vt||(vt=self.document.createElement("a"),mt=self.__AMP_URL_CACHE||(self.__AMP_URL_CACHE=new dt(100))),function(t,n,r){if(r&&r.has(n))return r.get(n);t.href=n,t.protocol||(t.href=t.href);var i,e={href:t.href,protocol:t.protocol,host:t.host,hostname:t.hostname,port:"0"==t.port?"":t.port,pathname:t.pathname,search:t.search,hash:t.hash,origin:null};"/"!==e.pathname[0]&&(e.pathname="/"+e.pathname),("http:"==e.protocol&&80==e.port||"https:"==e.protocol&&443==e.port)&&(e.port="",e.host=e.hostname),i=t.origin&&"null"!=t.origin?t.origin:"data:"!=e.protocol&&e.host?e.protocol+"//"+e.host:e.href,e.origin=i;var o=e;return r&&r.put(n,o),o}(vt,s,mt)).origin,l=f[n]||(f[n]=[]),h=function(n,i,u,s){if("amp"==n.sentinel){if(i!=t.contentWindow)return;if(c!=u&&("null"!=u||!o))return}(e||i==t.contentWindow)&&(n.sentinel!=pt?r(n,i,u,s):a())};return l.push(h),a=function(){if(h){var t=l.indexOf(h);t>-1&&l.splice(t,1),h=null,l=null,r=null}}}function Ot(t,n){return n?t.getAttribute("data-amp-3p-sentinel"):"amp"}var jt=function(){function t(t,n,r,i){var e=this;this.ib=t,this.rg=r,this.eg=[],this.By=wt(this.ib,n,(function(t,n,r){e.eg.some((function(t){return t.win==n}))||e.eg.push({win:n,origin:r}),i(t,n,r)}),this.rg,this.rg)}var n=t.prototype;return n.send=function(t,n){m(this.eg,(function(t){return!t.win.parent})),function(t,n,r,i,e){if(t.contentWindow){i.type=r,i.sentinel=Ot(t,e);var o=i;e&&(o="amp-"+JSON.stringify(i));for(var u=0;u<n.length;u++){var a=n[u];a.win.postMessage(o,a.origin)}}}(this.ib,this.eg,t,n,this.rg)},n.destroy=function(){this.By(),this.eg.length=0},t}(),St=[[300,250],[320,50],[300,50],[320,100]],xt=[0,.05,.1,.15,.2,.25,.3,.35,.4,.45,.5,.55,.6,.65,.7,.75,.8,.85,.9,.95,1],Et=(Date.now(),function(){function t(t,n){var r=this;this.og=t,this.ug=null,this.ag=new jt(n,"send-intersections",!1,(function(){r.sg()})),this.ug=new IntersectionObserver((function(t){r.ag.send("intersection",{"changes":t.map(Pt)})}),{threshold:xt})}var n=t.prototype;return n.sg=function(){this.ug.observe(this.og.element)},n.destroy=function(){this.ug.disconnect(),this.ug=null,this.ag.destroy(),this.ag=null},t}());function Pt(t){return{"time":t.time,"rootBounds":t.rootBounds,"boundingClientRect":t.boundingClientRect,"intersectionRect":t.intersectionRect,"intersectionRatio":t.intersectionRatio}}var It={"AMP-FX-FLYING-CARPET":!0,"AMP-LIGHTBOX":!0,"AMP-STICKY-AD":!0,"AMP-LIGHTBOX-GALLERY":!0};function Mt(t,n){var r=C(n,t).position;return"fixed"==r||"sticky"==r}var At=function(){return self.AMP.config.urls}(),Rt="amp-iframe",zt=["allowfullscreen","allowpaymentrequest","allowtransparency","allow","frameborder","referrerpolicy","scrolling","tabindex","title"],Tt=0,kt=function(t){!function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&f(t,n)}(s,t);var r,e,u=(r=s,e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,n=c(r);if(e){var i=c(this).constructor;t=Reflect.construct(n,arguments,i)}else t=n.apply(this,arguments);return h(this,t)});function s(t){var n;return(n=u.call(this,t)).fg=null,n.cg=!1,n.lg=!1,n.hg=!1,n.vg=!1,n.ib=null,n.mg=!1,n.dg=null,n.pg="",n.bg=null,n.iframeSrc=null,n.$w=null,n.gg=null,n.yg=!1,n.fb=new J(n.element),n}var l=s.prototype;return l.isLayoutSupported=function(t){return function(t){return"fixed"==t||"fixed-height"==t||"responsive"==t||"fill"==t||"flex-item"==t||"fluid"==t||"intrinsic"==t}(t)},l.qr=function(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",i=this.element,e=lt(i),o=e.parse(t),u=o.hostname,a=o.origin,s=o.protocol;V(e.isSecure(t)||"data:"==s,"Invalid <amp-iframe> src. Must start with https://. Found %s",i);var f=e.parse(n);return V(!this.wg(r,"allow-same-origin")||a!=f.origin&&"data:"!=s,"Origin of <amp-iframe> must not be equal to container %s if allow-same-origin is set. See https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-iframe-origin-policy.md for details.",i),V(!(d(u,".".concat(At.thirdPartyFrameHost))||d(u,".ampproject.org")),"amp-iframe does not allow embedding of frames from ampproject.*: %s",t),t},l.Og=function(){var t=this.element.getLayoutBox(),n=Math.min(600,.75*this.getViewport().getSize().height);V(t.top>=n,"<amp-iframe> elements must be positioned outside the first 75% of the viewport or 600px from the top (whichever is smaller): %s  Current position %s. Min: %sPositioning rules don't apply for iframes that use `placeholder`.See https://github.com/ampproject/amphtml/blob/main/extensions/amp-iframe/amp-iframe.md#iframe-with-placeholder for details.",this.element,t.top,n)},l.wg=function(t,n){return new RegExp("\\s".concat(n,"\\s"),"i").test(" "+t+" ")},l.jg=function(t){if(t){var n,r,i=lt(this.element).parse(t),e=i.hash;return"data:"==i.protocol||e&&"#"!=e?t:(-1==(r=(n=t).indexOf("#"))?n:n.substring(0,r))+"#amp=1"}},l.Sg=function(t,n){if(t)return V(!(" "+n+" ").match(/\s+allow-same-origin\s+/i),"allow-same-origin is not allowed with the srcdoc attribute %s.",this.element),"data:text/html;charset=utf-8;base64,"+(i=t,r="undefined"!=typeof TextEncoder?(new TextEncoder).encode(i):function(t){for(var n=new Uint8Array(t.length),r=0;r<t.length;r++){var i=t.charCodeAt(r);w(i<=255),n[r]=i}return n}(unescape(encodeURIComponent(i))),btoa(function(t){for(var n=new Array(t.length),r=0;r<t.length;r++)n[r]=String.fromCharCode(t[r]);return n.join("")}(r)));var r,i},l.preconnectCallback=function(t){var n;this.iframeSrc&&(n=this.win,Q(n,"preconnect")).url(this.getAmpDoc(),this.iframeSrc,t)},l.buildCallback=function(){this.pg=this.element.getAttribute("sandbox");var t=this.jg(this.element.getAttribute("src"))||this.Sg(this.element.getAttribute("srcdoc"),this.pg);this.iframeSrc=this.qr(t,window.location.href,this.pg),this.fg=this.getPlaceholder(),this.cg=!!this.fg,this.mg=this.element.hasAttribute("resizable"),this.mg&&this.element.setAttribute("scrolling","no"),this.element.hasAttribute("frameborder")||this.element.setAttribute("frameborder","0"),this.$w=function(t){if("no"!=t.getAttribute("scrolling")){var n=t.ownerDocument.createElement("i-amphtml-scroll-container");return t.appendChild(n),n}return t}(this.element),this.xg()},l.onLayoutMeasure=function(){var t=this.element;this.lg=function(t){for(var n=t.getLayoutSize(),r=n.height,i=n.width,e=0;e<St.length;e++){var o=St[e][0],u=St[e][1];if(!(u>r)&&!(o>i)&&r-u<=20&&i-o<=20)return!0}return!1}(t),this.hg=this.Eg(),this.vg=this.lg&&!function(t,n){var r=!1,i=0,e=t;do{It[e.tagName]?(i++,r=!1):Mt(e,n)&&(r=!0),e=e.parentElement}while(e&&"BODY"!=e.tagName);return!r&&i<=1}(t,this.win)},l.Eg=function(){return r=(n=(t=this.element).getLayoutSize()).height,!(n.width>10||r>10||function(t,n){return t.closest?t.closest(".i-amphtml-overlay"):function(t,n,r){var i;for(i=t;i&&void 0!==i;i=i.parentElement)if(n(i))return i;return null}(t,(function(t){return function(t,n){var r=t.matches||t.webkitMatchesSelector||t.mozMatchesSelector||t.msMatchesSelector||t.oMatchesSelector;return!!r&&r.call(t,".i-amphtml-overlay")}(t)}))}(t));var t,n,r},l.layoutCallback=function(){var t=this;if(V(!this.vg,"amp-iframe is not used for displaying fixed ad. Please use amp-sticky-ad and amp-ad instead."),this.cg||this.Og(),this.mg&&V(this.getOverflowElement(),"Overflow element must be defined for resizable frames: %s",this.element),!this.iframeSrc)return a();if(this.hg&&!this.getAmpDoc().registerSingleton(1))return console.error("Only 1 analytics/tracking iframe allowed per page. Please use amp-analytics instead or file a GitHub issue for your use case: https://github.com/ampproject/amphtml/issues/new/choose"),a();var n=this.element.ownerDocument.createElement("iframe");this.ib=n,n.classList.add("i-amphtml-fill-content"),n.name="amp_iframe"+Tt++,this.cg&&N(n,"zIndex",-1),z(zt,this.element,n);var r=n.getAttribute("allow")||"";return r=r.replace("autoplay","autoplay-disabled"),n.setAttribute("allow",r),function(t,n,r){var i=r||"";n.setAttribute("sandbox",i)}(this.element,n,this.pg),n.src=this.iframeSrc,this.hg||(this.dg=new Et(this,n)),n.onload=function(){n.readyState="complete",t.Pg(),t.hg&&(t.iframeSrc=null,ft(t.win).promise(5e3).then((function(){R(n),t.element.setAttribute("amp-removed",""),t.ib=null})))},wt(n,"embed-size",(function(n){t.Ig(n.height,n.width)}),void 0,void 0,!0),this.bg=function(n,r,i,e){var o=n,u=function(n){return t.Mg(n)},a=function(t){try{return u(t)}catch(t){var n,r;throw null===(n=(r=self).__AMP_REPORT_ERROR)||void 0===n||n.call(r,t),t}},s=function(){if(void 0!==p)return p;p=!1;try{var t={get capture(){return p=!0,!1}};self.addEventListener("test-options",null,t),self.removeEventListener("test-options",null,t)}catch(t){}return p}();return o.addEventListener(r,a,!!s&&e),function(){null==o||o.removeEventListener(r,a,!!s&&e),u=null,o=null,a=null}}(this.win,"message",0,void 0),this.cg&&wt(n,"embed-ready",this.Pg.bind(this)),wt(n,"send-consent-data",(function(n,r,i){t.Ag(r,i)})),this.$w.appendChild(n),this.loadPromise(n).then((function(){t.$w!=t.element&&ft(t.win).delay((function(){t.mutateElement((function(){t.$w.classList.add("amp-active")}))}),1e3),t.fb.updatePlaying(!0)}))},l.Mg=function(t){if(this.ib&&t.source===this.ib.contentWindow){var n=ht(t);if("string"==typeof n&&n.startsWith("pym")){var r=n.split(/xPYMx/);"height"===r[2]?this.Ig(parseInt(r[3],10),void 0):"width"===r[2]?this.Ig(void 0,parseInt(r[3],10)):W().warn(Rt,"Unsupported Pym.js message: ".concat(n))}}},l.Ag=function(t,r){var e,o,u=this;(e=this.element,o=this.getConsentPolicy(),ct(e).then((function(t){var r={"consentMetadata":t&&t.getConsentMetadataInfo,"consentString":t&&t.getConsentStringInfo,"consentPolicyState":t&&t.whenPolicyResolved,"consentPolicySharedData":t&&t.getMergedSharedData};return t?Promise.all(Object.keys(r).map((function(i){return r[i].call(t,o||"default").then((function(t){return n({},i,t)}))}))).then((function(t){return Object.assign.apply({},t)})):r}))).then((function(n){u.Rg(t,r,i({"sentinel":"amp","type":"consent-data"},n))}))},l.Rg=function(t,n,r){t.postMessage(r,n)},l.unlayoutCallback=function(){return this.bg&&(this.bg(),this.bg=null),this.ib&&(R(this.ib),this.fg&&this.togglePlaceholder(!0),this.ib=null,this.dg&&(this.dg.destroy(),this.dg=null)),this.fb.updatePlaying(!1),!0},l.getLayoutPriority=function(){return this.lg?2:this.hg?1:t.prototype.getLayoutPriority.call(this)},l.mutatedAttributesCallback=function(t){var n=t.src;void 0!==n&&(this.iframeSrc=this.jg(n),this.ib&&(this.ib.src=this.qr(this.iframeSrc,window.location.href,this.pg))),this.ib&&t.title&&z(["title"],this.element,this.ib)},l.unlayoutOnPause=function(){return!0},l.Pg=function(){var t=this;this.fg&&this.getVsync().mutate((function(){t.ib&&(N(t.ib,"zIndex",0),t.togglePlaceholder(!1))}))},l.firstLayoutCompleted=function(){},l.throwIfCannotNavigate=function(){if(!this.wg(this.pg,"allow-top-navigation"))throw W().createError('"AMP.navigateTo" is only allowed on <amp-iframe> when its "sandbox" attribute contains "allow-top-navigation".')},l.Ig=function(t,n){var r,i,e=this;this.mg?t<100?this.user().error(Rt,"Ignoring embed-size request because the resize height is less than 100px. If you are using amp-iframe to display ads, consider using amp-ad instead.",this.element):(t=parseInt(t,10),isNaN(t)||(r=Math.max(t+(this.element.offsetHeight-this.ib.offsetHeight),t)),n=parseInt(n,10),isNaN(n)||(i=Math.max(n+(this.element.offsetWidth-this.ib.offsetWidth),n)),void 0!==r||void 0!==i?this.attemptChangeSize(r,i).then((function(){void 0!==r&&e.element.setAttribute("height",r),void 0!==i&&e.element.setAttribute("width",i),e.element.overflowCallback(!1,r,i)}),(function(){})):this.user().error(Rt,"Ignoring embed-size request because no width or height value is provided",this.element)):this.yg||(this.user().error(Rt,"Ignoring embed-size request because this iframe is not resizable",this.element),this.yg=!0)},l.xg=function(){var t,n=this;if("iframe-messaging",t=function(t){var n,r,e,u,a;if(t[st])return t[st];t[st]=y();var s=t[st];w(s);var f=i(i({},null!==(n=t.AMP_CONFIG)&&void 0!==n?n:{}),null!==(r=t.AMP_EXP)&&void 0!==r?r:P((null===(e=t.__AMP_EXP)||void 0===e?void 0:e.textContent)||"{}"));for(var c in f){var l=f[c];"number"==typeof l&&l>=0&&l<=1&&(s[c]=Math.random()<l)}var h=null===(u=t.AMP_CONFIG)||void 0===u?void 0:u["allow-doc-opt-in"];if(v(h)&&h.length){var m=t.document.head.querySelector('meta[name="amp-experiments-opt-in"]');if(m)for(var d,p,b=o((null===(d=m.getAttribute("content"))||void 0===d?void 0:d.split(","))||[],!0);!(p=b()).done;){var g=p.value;h.includes(g)&&(s[g]=!0)}}Object.assign(s,function(t){var n,r="";try{var i;"localStorage"in t&&(r=null!==(i=t.localStorage.getItem("amp-experiment-toggles"))&&void 0!==i?i:"")}catch(t){$().warn("EXPERIMENTS","Failed to retrieve experiments from localStorage.")}for(var e,u=(null===(n=r)||void 0===n?void 0:n.split(/\s*,\s*/g))||[],a=y(),s=o(u,!0);!(e=s()).done;){var f=e.value;f&&("-"==f[0]?a[f.substr(1)]=!1:a[f]=!0)}return a}(t));var O=null===(a=t.AMP_CONFIG)||void 0===a?void 0:a["allow-url-opt-in"];if(v(O)&&O.length)for(var j,S=function(t){var n,r=y();if(!t)return r;for(;n=U.exec(t);){var i=X(n[1],n[1]),e=n[2]?X(n[2].replace(/\+/g," "),n[2]):"";r[i]=e}return r}(t.location.originalHash||t.location.hash),x=o(O,!0);!(j=x()).done;){var E=j.value,I=S["e-".concat(E)];"1"==I&&(s[E]=!0),"0"==I&&(s[E]=!1)}return s}(this.win),t["iframe-messaging"]){var r=this.element,e=r.getAttribute("src");if(e&&(this.gg=lt(r).parse(e).origin),this.registerAction("postMessage",(function(t){n.gg?n.ib.contentWindow.postMessage(t.args,n.gg):W().error(Rt,'"postMessage" action is only allowed with "src"attribute with an origin.')})),this.gg){var u=0;this.win.addEventListener("message",(function t(r){if(r.source===n.ib.contentWindow)if(r.origin===n.gg){if(!n.zg())return u++,W().error(Rt,'"message" event may only be triggered from a user gesture.'),void(u>=10&&(W().error(Rt,'Too many non-gesture-triggered "message" events; detaching event listener.'),n.win.removeEventListener("message",t)));var i,e=ht(r);try{i=P(JSON.stringify(e))}catch(t){return void W().error(Rt,'Data from "message" event must be JSON.')}var o=function(t,n,r,i){var e={detail:r};if(Object.assign(e,void 0),"function"==typeof t.CustomEvent)return new t.CustomEvent(n,e);var o=t.document.createEvent("CustomEvent");return o.initCustomEvent(n,!!e.bubbles,!!e.cancelable,r),o}(n.win,"amp-iframe:message",{"data":i});(function(t){return tt(t,"action")})(n.element).trigger(n.element,"message",o,3)}else W().error(Rt,'"message" received from unexpected origin: '+r.origin+". Only allowed from: "+n.gg)}))}}},l.zg=function(){if(this.getAmpDoc().getRootNode().activeElement!==this.ib)return!1;var t,n,r=this.win.document.createElement("audio");return t=r,(n=function(){return t.play()},new Promise((function(t){t(n())}))).catch((function(){})),!r.paused},l.setTargetOriginForTesting=function(t){this.gg=t},s}(t.BaseElement);t.registerElement(Rt,kt)}();
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */}});
//# sourceMappingURL=amp-iframe-0.1.js.map