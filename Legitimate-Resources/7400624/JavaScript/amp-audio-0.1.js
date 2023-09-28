;
(self.AMP=self.AMP||[]).push({m:0,v:"2307212240000",n:"amp-audio",ev:"0.1",l:!0,f:function(t,n){!function(){function n(t,r){return(n=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,r)}function r(t){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function e(t,n){if(n&&("object"===i(n)||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}var o=Array.isArray;function u(t,n){(null==n||n>t.length)&&(n=t.length);for(var r=0,i=new Array(n);r<n;r++)i[r]=t[r];return i}function a(t,n){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(r)return(r=r.call(t)).next.bind(r);if(Array.isArray(t)||(r=function(t,n){if(t){if("string"==typeof t)return u(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?u(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var i=0;return function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var f=Object.prototype,c=(f.hasOwnProperty,f.toString);function s(t){var n=Object.create(null);return t&&Object.assign(n,t),n}var l,h="nodisplay";function v(t,n,r,i){for(var e,u,f=a(o(e=t)?e:[e],!0);!(u=f()).done;){var c=u.value,s=n.getAttribute(c);null!==s?r.setAttribute(c,s):i&&r.removeAttribute(c)}}function p(t){var n=Object.getOwnPropertyDescriptor(t,"message");if(null!=n&&n.writable)return t;var r=t.message,i=t.stack,e=new Error(r);for(var o in t)e[o]=t[o];return e.stack=i,e}function d(t){for(var n,r=null,i="",e=a(arguments,!0);!(n=e()).done;){var o=n.value;o instanceof Error&&!r?r=p(o):(i&&(i+=" "),i+=o)}return r?i&&(r.message=i+": "+r.message):r=new Error(i),r}function y(t){var n,r;null===(n=(r=self).__AMP_REPORT_ERROR)||void 0===n||n.call(r,t)}function m(t){var n=d.apply(null,arguments);return n.expected=!0,n}var b=["Webkit","webkit","Moz","moz","ms","O","o"];var w=function(){var t=this;this.promise=new Promise((function(n,r){t.resolve=n,t.reject=r}))};function g(t,n){var r,i=(r=function(){return t.play(!!n)},new Promise((function(t){t(r())})));return i.catch((function(t){!function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];y(m.apply(null,r))}("TRYPLAY",t)})),i}new RegExp("^https://([a-zA-Z0-9_-]+.)?cdn.ampproject.org(/.*)?$"),new RegExp("^([a-zA-Z0-9_-]+.)?localhost$"),self.__AMP_LOG=self.__AMP_LOG||{user:null,dev:null,userForEmbed:null};var j=self.__AMP_LOG;function O(t){return function(t,n){throw new Error("failed to call initLogConstructor")}()}function S(t,n,r,i,e,o,u,a,f,c,s){return t}function A(t,n,r,i,e,o,u,a,f,c,s){return(j.user||(j.user=O()),void j.user.win?j.userForEmbed||(j.userForEmbed=O()):j.user).assert(t,n,r,i,e,o,u,a,f,c,s)}function E(t,n){return P(t=function(t){return t.__AMP_TOP||(t.__AMP_TOP=t)}(t),n)}function R(t,n){return z(x(t),n)}function k(t){return t.nodeType?(r=t,n=(r.ownerDocument||r).defaultView,E(n,"ampdoc")).getAmpDoc(t):t;var n,r}function x(t){var n=k(t);return n.isSingleDoc()?n.win:n}function P(t,n){S(L(t,n));var r=I(t)[n];return r.obj||(S(r.ctor),S(r.context),r.obj=new r.ctor(r.context),S(r.obj),r.context=null,r.resolve&&r.resolve(r.obj)),r.obj}function z(t,n){var r=I(t)[n];return r?r.promise?r.promise:(P(t,n),r.promise=Promise.resolve(r.obj)):null}function I(t){var n=t.__AMP_SERVICES;return n||(n=t.__AMP_SERVICES={}),n}function L(t,n){var r=t.__AMP_SERVICES&&t.__AMP_SERVICES[n];return!(!r||!r.ctor)}var T,Z=function(t){return function(t,n,r,i){var e=R(t,n);if(e)return e;var o=k(t);return o.whenExtensionsKnown().then((function(){var t=o.getExtensionVersion(r);return t?E(o.win,"extensions").waitForExtension(r,t):null})).then((function(r){return r?function(t,n){return function(t,n){var r=z(t,n);if(r)return r;var i,e,o,u,a=I(t);return a[n]=(e=(i=new w).promise,o=i.reject,u=i.resolve,e.catch((function(){})),{obj:null,promise:e,resolve:u,reject:o,context:null,ctor:null}),a[n].promise}(x(t),n)}(t,n):null}))}(t,"amp-analytics-instrumentation","amp-analytics")};function $(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];Z(t).then((function(e){e&&e.triggerEventForTarget(t,n,r,i)}))}function B(t,n,r,i){return function(t,n,r,i){var e=t,o=r,u=function(t){try{return o(t)}catch(t){var n,r;throw null===(n=(r=self).__AMP_REPORT_ERROR)||void 0===n||n.call(r,t),t}},a=function(){if(void 0!==T)return T;T=!1;try{var t={get capture(){return T=!0,!1}};self.addEventListener("test-options",null,t),self.removeEventListener("test-options",null,t)}catch(t){}return T}(),f=!(null==i||!i.capture);return e.addEventListener(n,u,a?i:f),function(){null==e||e.removeEventListener(n,u,a?i:f),o=null,e=null,u=null}}(t,n,r,i)}var C,M,N={"title":"","artist":"","album":"","artwork":[{"src":""}]},Y=function(){function t(t){this.dr=t,this.pr=0,this.mr=0,this.yr=s()}var n=t.prototype;return n.has=function(t){return!!this.yr[t]},n.get=function(t){var n=this.yr[t];if(n)return n.access=++this.mr,n.payload},n.put=function(t,n){this.has(t)||this.pr++,this.yr[t]={payload:n,access:this.mr},this.gr()},n.gr=function(){if(!(this.pr<=this.dr)){var t,n=this.yr,r=this.mr+1;for(var i in n){var e=n[i].access;e<r&&(r=e,t=i)}void 0!==t&&(delete n[t],this.pr--)}},t}();function _(t){return"https:"==(t=function(t){return"string"==typeof t?function(t,n){return C||(C=self.document.createElement("a"),M=self.__AMP_URL_CACHE||(self.__AMP_URL_CACHE=new Y(100))),function(t,n,r){if(r&&r.has(n))return r.get(n);t.href=n,t.protocol||(t.href=t.href);var i,e={href:t.href,protocol:t.protocol,host:t.host,hostname:t.hostname,port:"0"==t.port?"":t.port,pathname:t.pathname,search:t.search,hash:t.hash,origin:null};"/"!==e.pathname[0]&&(e.pathname="/"+e.pathname),("http:"==e.protocol&&80==e.port||"https:"==e.protocol&&443==e.port)&&(e.port="",e.host=e.hostname),i=t.origin&&"null"!=t.origin?t.origin:"data:"!=e.protocol&&e.host?e.protocol+"//"+e.host:e.href,e.origin=i;var o=e;return r&&r.put(n,o),o}(C,t,M)}(t):t}(t)).protocol||"localhost"==t.hostname||"127.0.0.1"==t.hostname||(r=".localhost",(i=(n=t.hostname).length-r.length)>=0&&n.indexOf(r,i)==i);var n,r,i}function D(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"source";return A(null!=t,"%s %s must be available",n,r),A(_(t)||/^\/\//.test(t),'%s %s must start with "https://" or "//" or be relative and served from either https or from localhost. Invalid value: %s',n,r,t),t}var F=function(t){!function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(r&&r.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),r&&n(t,r)}(f,t);var i,u,a=(i=f,u=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,n=r(i);if(u){var o=r(this).constructor;t=Reflect.construct(n,arguments,o)}else t=n.apply(this,arguments);return e(this,t)});function f(t){var n;return(n=a.call(this,t)).Py=null,n.Ly=N,n.isPlaying=!1,n}var p=f.prototype;return p.isLayoutSupported=function(t){return function(t){return"fixed"==t||"fixed-height"==t}(t)||"container"==t},p.buildCallback=function(){this.getLayout()===h&&(this.element.removeAttribute("autoplay"),this.buildAudioElement()),this.element.classList.add("i-amphtml-media-component"),this.registerAction("play",this.Ty.bind(this)),this.registerAction("pause",this.Zy.bind(this))},p.mutatedAttributesCallback=function(t){if(this.Py){var n=t.src,r=t.controlsList,i=t.loop;void 0===n&&void 0===r&&void 0===i||(void 0!==n&&D(n,this.element),v(["src","loop","controlsList"],this.element,this.Py));var e=t.artist,o=t.title,u=t.album,a=t.artwork;void 0===e&&void 0===o&&void 0===u&&void 0===a||this.Ny()}},p.buildAudioElement=function(){var t,n=this,r=this.element.querySelector("audio");if(r||(r=this.element.ownerDocument.createElement("audio"),this.element.appendChild(r)),r.play){r.controls=!0,function(t,n,r,i,e){var o=function(t,n,r){if(n.startsWith("--"))return n;l||(l=s());var i=l[n];if(!i||r){if(i=n,void 0===t[n]){var e=function(t){return t.charAt(0).toUpperCase()+t.slice(1)}(n),o=function(t,n){for(var r=0;r<b.length;r++){var i=b[r]+n;if(void 0!==t[i])return i}return""}(t,e);void 0!==t[o]&&(i=o)}r||(l[n]=i)}return i}(t.style,n,e);if(o){var u,a=i?r+i:r;t.style.setProperty((u=o.replace(/[A-Z]/g,(function(t){return"-"+t.toLowerCase()})),b.some((function(t){return u.startsWith(t+"-")}))?"-".concat(u):u),a)}}(r,"width","100%");var i=this.Yy("src");i&&D(i,this.element),v(["src","preload","autoplay","muted","loop","aria-label","aria-describedby","aria-labelledby","controlsList"],this.element,r),r.classList.add("i-amphtml-fill-content"),(t=this.element,function(t,n){for(var r=[],i=t.firstChild;i;i=i.nextSibling)u=void 0,a=void 0,"string"==typeof(o=e=i)?u=o:1==(null==(a=o)?void 0:a.nodeType)&&(u=o.tagName),!(u&&u.toLowerCase().startsWith("i-")||e.nodeType===Node.ELEMENT_NODE&&(e.hasAttribute("placeholder")||e.hasAttribute("fallback")||e.hasAttribute("overflow")))&&r.push(i);var e,o,u,a;return r}(t)).forEach((function(t){t!==r&&(t.getAttribute&&t.getAttribute("src")&&D(t.getAttribute("src"),t),r.appendChild(t))})),this.Py=r,B(this.Py,"playing",(function(){return n.Fy()})),B(this.Py,"play",(function(){return $(n.element,"audio-play")})),B(this.Py,"pause",(function(){return $(n.element,"audio-pause")}))}else this.toggleFallback(!0)},p.layoutCallback=function(){return this.getLayout()!==h&&this.buildAudioElement(),this.Ny(),"none"===this.element.getAttribute("preload")?this.Py:this.loadPromise(this.Py)},p.Ny=function(){var t,n,r,i=this.getAmpDoc().win.document,e=this.Yy("artist")||"",o=this.Yy("title")||this.Yy("aria-label")||i.title||"",u=this.Yy("album")||"",a=this.Yy("artwork")||function(t){var n=t.querySelector('script[type="application/ld+json"]');if(n){var r=function(t,n){try{return function(t){return JSON.parse(t)}(t)}catch(t){return null}}(n.textContent);if(r&&r.image)return"string"==typeof r.image?r.image:r.image["@list"]&&"string"==typeof r.image["@list"][0]?r.image["@list"][0]:"string"==typeof r.image.url?r.image.url:"string"==typeof r.image[0]?r.image[0]:void 0}}(i)||((t=i.querySelector('meta[property="og:image"]'))?t.getAttribute("content"):void 0)||((r=(n=i).querySelector('link[rel="shortcut icon"]')||n.querySelector('link[rel="icon"]'))?r.getAttribute("href"):void 0)||"";this.Ly={title:o,artist:e,album:u,artwork:[{src:a}]}},p.renderOutsideViewport=function(){return!0},p.Yy=function(t){return this.element.getAttribute(t)},p.pauseCallback=function(){this.Py&&(this.Py.pause(),this.Jy(!1))},p.qy=function(){return!!this.Py},p.Zy=function(){this.qy()&&(this.Py.pause(),this.Jy(!1))},p.Ty=function(){this.qy()&&(g(this.Py),this.Jy(!0))},p.Jy=function(t){},p.Fy=function(){var t,n,r,i=this;(function(t,n){var r=function(t){return L(n=x(k(t)),"url")?P(n,"url"):null;var n}(t);if(n&&n.artwork){var i=n.artwork;S(o(i)),i.forEach((function(t){if(t){var n=(i=t,"[object Object]"===c.call(i)?t.src:t);A(r.isProtocolValid(n))}var i}))}})(this.element,this.Ly),t=this.win,n=this.Ly,"mediaSession"in(r=t.navigator)&&t.MediaMetadata&&(r.mediaSession.metadata=new t.MediaMetadata(N),r.mediaSession.metadata=new t.MediaMetadata(n),r.mediaSession.setActionHandler("play",(function(){g(i.Py),i.Jy(!0)})),r.mediaSession.setActionHandler("pause",(function(){i.Py.pause(),i.Jy(!1)})))},f}(t.BaseElement);t.registerElement("amp-audio",F)}();
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */}});
//# sourceMappingURL=amp-audio-0.1.js.map