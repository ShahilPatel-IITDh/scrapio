(()=>{"use strict";var e,t,n={24:(e,t,n)=>{n.d(t,{W:()=>i});let i=function(e){return e.Event="Event",e.Microdata="Microdata",e.Settings="Settings",e.VideoPlayer="VideoPlayer",e.Network="Network",e}({})},148:(e,t,n)=>{n.d(t,{i:()=>i});let i=function(e){return e.Error="error",e.Warning="warning",e.Info="info",e}({})},886:(e,t,n)=>{n.d(t,{X:()=>i});const i=new class{constructor(e){let t;try{t=window[e]}catch(t){console.warn("[rcm] Unavailable browserStorage type - ".concat(e))}this.storage=t}getItem(e){let t=null;return this.storage&&(t=this.storage.getItem(e)),t}setItem(e,t){this.storage&&this.storage.setItem(e,t)}removeItem(e){this.storage&&this.storage.removeItem(e)}}("localStorage")},512:(e,t,n)=>{n.d(t,{k:()=>d});var i=n(572),r=n(148),o=n(886);const s=Boolean(o.X.getItem("rcmLoggerEnabled")),a=Boolean(o.X.getItem("rcmSentryEnabled"));const d=new class{constructor(){(0,i.Z)(this,"isLoggerEnabled",s),(0,i.Z)(this,"isSentryEnabled",1===((e,t)=>{const n=e-.5+Math.random()*(t-e+1);return Math.round(n)})(1,100)||a),this.printFeatureStatus("logger",this.isLoggerEnabled),this.printFeatureStatus("sentry",this.isSentryEnabled)}async captureInSentry(e){const{captureEvent:t}=await Promise.all([n.e(998),n.e(897)]).then(n.bind(n,695));t(e)}printFeatureStatus(e,t){const n=t?"enabled":"disabled",i="rcm ".concat(e," ").concat(n);console.log(i)}setTags(e){this.tags=e}log(e){(arguments.length>1&&void 0!==arguments[1]&&arguments[1]||this.isLoggerEnabled)&&console.log(...e)}error(e){let{error:t,category:n,message:i,fingerprint:o,forcedLog:s=!1}=e;if(s||this.isLoggerEnabled){const e=i?" ".concat(i,";"):"";console.error("[rcm error]".concat(e),t)}this.isSentryEnabled&&(o||(i?o=[i]:"string"==typeof t&&(o=[t])),this.captureInSentry({event:t,logCategory:n,logLevel:r.i.Error,tags:this.tags,fingerprint:o}))}info(e){let{message:t,category:n,fingerprint:i,forcedLog:o=!1}=e;(o||this.isLoggerEnabled)&&console.info("[rcm info] ".concat(t)),this.isSentryEnabled&&(i||(i=[t]),this.captureInSentry({event:t,logCategory:n,logLevel:r.i.Info,tags:this.tags,fingerprint:i}))}}},572:(e,t,n)=>{function i(e){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}function r(e){var t=function(e,t){if("object"!==i(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!==i(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===i(t)?t:String(t)}function o(e,t,n){return(t=r(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,{Z:()=>o})}},i={};function r(e){var t=i[e];if(void 0!==t)return t.exports;var o=i[e]={id:e,loaded:!1,exports:{}};return n[e](o,o.exports,r),o.loaded=!0,o.exports}r.m=n,r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,n)=>(r.f[n](e,t),t)),[])),r.u=e=>"recommender."+e+".js",r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},t="recommender.js:",r.l=(n,i,o,s)=>{if(e[n])e[n].push(i);else{var a,d;if(void 0!==o)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var l=c[u];if(l.getAttribute("src")==n||l.getAttribute("data-webpack")==t+o){a=l;break}}a||(d=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,r.nc&&a.setAttribute("nonce",r.nc),a.setAttribute("data-webpack",t+o),a.src=n),e[n]=[i];var h=(t,i)=>{a.onerror=a.onload=null,clearTimeout(m);var r=e[n];if(delete e[n],a.parentNode&&a.parentNode.removeChild(a),r&&r.forEach((e=>e(i))),t)return t(i)},m=setTimeout(h.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=h.bind(null,a.onerror),a.onload=h.bind(null,a.onload),d&&document.head.appendChild(a)}},r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.p="//rcmjs.rambler.ru/static/",(()=>{var e={211:0};r.f.j=(t,n)=>{var i=r.o(e,t)?e[t]:void 0;if(0!==i)if(i)n.push(i[2]);else{var o=new Promise(((n,r)=>i=e[t]=[n,r]));n.push(i[2]=o);var s=r.p+r.u(t),a=new Error;r.l(s,(n=>{if(r.o(e,t)&&(0!==(i=e[t])&&(e[t]=void 0),i)){var o=n&&("load"===n.type?"missing":n.type),s=n&&n.target&&n.target.src;a.message="Loading chunk "+t+" failed.\n("+o+": "+s+")",a.name="ChunkLoadError",a.type=o,a.request=s,i[1](a)}}),"chunk-"+t,t)}};var t=(t,n)=>{var i,o,s=n[0],a=n[1],d=n[2],c=0;if(s.some((t=>0!==e[t]))){for(i in a)r.o(a,i)&&(r.m[i]=a[i]);if(d)d(r)}for(t&&t(n);c<s.length;c++)o=s[c],r.o(e,o)&&e[o]&&e[o][0](),e[o]=0},n=self.rcmjsWebpackChunkGlobal=self.rcmjsWebpackChunkGlobal||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})(),(()=>{"function"!=typeof Object.fromEntries&&(Object.fromEntries=function(e){const t={};for(const[n,i]of e)t[n]=i;return t});var e=r(24);let t=function(e){return e.Pending="pending",e.Ready="ready",e}({});const n={};function i(e,t,n){const i=String(t).split(".");for(let t=0;t<i.length;t++){if(3===arguments.length)t+1===i.length?e[i[t]]=n:void 0===e[i[t]]&&(e[i[t]]={});else if(void 0===e[i[t]])return;e=e[i[t]]}return e}const o={get:e=>e?i(n,e):n,set(e,t){i(n,e,t)}};var s=r(512),a=r(572),d="adtech_uid",c=function(){function e(e){this.regValidKey=new RegExp("([a-zA-Z0-9_-]{0,})","i"),this.hash=e||location.hostname}return e.prototype.isSupported=function(){return"object"==typeof document&&"string"==typeof document.cookie},e.prototype.setItem=function(e,t,n,i,r,o,s,a){void 0===e&&(e=!0),void 0===i&&(i=30),void 0===r&&(r="/"),void 0===o&&(o=location.hostname.split(".").slice(-2).join(".")),void 0===s&&(s="https:"===location.protocol),void 0===a&&(a=!0);try{if("boolean"==typeof e&&"string"==typeof t&&this.regValidKey.test(t)&&"string"==typeof n&&(""===n||this.regValidKey.test(n))&&"number"==typeof i&&"string"==typeof r&&"string"==typeof o&&-1!==location.hostname.indexOf(o)&&"boolean"==typeof s&&s===("https:"===location.protocol)){var d=document.createElement("a");if(d.href="http://"+o+r,d.hostname===o||d.pathname===r){if(!e||this.isSupported()){var c="";c+=a?this.hash+"_"+t:t;var u=new Date;u.setTime(u.getTime()+24*i*60*60*1e3);var l=u.toUTCString();return n=encodeURIComponent(n),document.cookie=c+"="+n+(l?"; expires="+l:"")+(r?"; path="+r:"")+(o?"; domain="+o:"")+(s?"; secure":""),this.getItem(e,t,a)===decodeURIComponent(n)}return!1}return!1}return!1}catch(e){return!1}},e.prototype.getItem=function(e,t,n){void 0===e&&(e=!0),void 0===n&&(n=!0);try{if("boolean"!=typeof e||"string"!=typeof t||!this.regValidKey.test(t))return!1;if(e&&!this.isSupported())return!1;n&&(t=this.hash+"_"+t);for(var i=document.cookie.split(";"),r=[],o=0;o<i.length;o++){var s=i[o],a=this._getCookieParts(s),d=a.left,c=a.right;d===t&&r.push(decodeURIComponent(c))}if(0===r.length)return!1;if(1===r.length)return r[0];try{var u=1/0,l=void 0;for(o=0;o<r.length;o++){var h=r[o].split(":")[1].split(".").length;h<u&&(u=h,l=r[o])}return l||!1}catch(e){return!1}}catch(e){return!1}},e.prototype.removeItem=function(e,t){void 0===e&&(e=!0);try{return!("boolean"!=typeof e||"string"!=typeof t||!this.regValidKey.test(t))&&(!(e&&!this.isSupported())&&(this.setItem(e,t,"",-86400),!1===this.getItem(e,t)))}catch(e){return!1}},e.prototype.getKeys=function(e){void 0===e&&(e=!0);try{if("boolean"==typeof e){if(!e||this.isSupported()){for(var t=[],n=document.cookie.split(";"),i=0;i<n.length;i++){var r=n[i],o=this._getCookieParts(r).left;0===o.indexOf(this.hash)&&t.push(o.substr(this.hash.length+1))}return t}return[]}return[]}catch(e){return[]}},e.prototype.clear=function(e){void 0===e&&(e=!0);try{if("boolean"==typeof e){if(!e||this.isSupported()){var t=this.getKeys(e);if(t)for(var n=0;n<t.length;n++){var i=t[n];this.removeItem(e,i)}return 0===this.getKeys(e).length}return!0}return!1}catch(e){return!1}},e.prototype._getCookieParts=function(e){var t=e.indexOf("=");return t<0?{left:"",right:""}:{left:e.slice(0,t).trim(),right:e.slice(t+1,e.length).trim()}},e}();const u=c;var l,h=function(){function e(){this.cookieStore=new u}return e.prototype.getItem=function(e){var t=this.cookieStore.getItem(!0,e,!1);return"boolean"!=typeof t&&t},e.prototype.setItem=function(e,t,n){return this.cookieStore.setItem(!0,e,t,365,"/",n,"https:"===location.protocol,!1)},e}(),m=new Uint8Array(16);function p(){if(!l&&!(l="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return l(m)}const v=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;const f=function(e){return"string"==typeof e&&v.test(e)};for(var g=[],I=0;I<256;++I)g.push((I+256).toString(16).substr(1));const y=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(g[e[t+0]]+g[e[t+1]]+g[e[t+2]]+g[e[t+3]]+"-"+g[e[t+4]]+g[e[t+5]]+"-"+g[e[t+6]]+g[e[t+7]]+"-"+g[e[t+8]]+g[e[t+9]]+"-"+g[e[t+10]]+g[e[t+11]]+g[e[t+12]]+g[e[t+13]]+g[e[t+14]]+g[e[t+15]]).toLowerCase();if(!f(n))throw TypeError("Stringified UUID is invalid");return n};const b=function(e,t,n){var i=(e=e||{}).random||(e.rng||p)();if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,t){n=n||0;for(var r=0;r<16;++r)t[n+r]=i[r];return t}return y(i)};const k=function(e){if(!f(e))throw TypeError("Invalid UUID");return parseInt(e.substr(14,1),16)};var w=function(){function e(){this.uuid="",this.scope=""}return e.prototype.parse=function(e){try{var t=e.split(":");if(2!==t.length)return!1;var n=t[0],i=t[1];return!!function(e){return f(e)&&4===k(e)}(n)&&(this.uuid=n,this.scope=i,!0)}catch(e){return!1}},e.prototype.getID=function(){return{scope:this.scope,uuid:this.uuid}},e.prototype.generate=function(e){this.uuid=b(),this.scope=e},e.prototype.getJoined=function(){return[this.uuid,this.scope].join(":")},e}(),S=function(e,t,n){if(n||2===arguments.length)for(var i,r=0,o=t.length;r<o;r++)!i&&r in t||(i||(i=Array.prototype.slice.call(t,0,r)),i[r]=t[r]);return e.concat(i||Array.prototype.slice.call(t))},E=function(){function e(){this.storeFacade=new h}return e.prototype.getID=function(){var e=this.storeFacade.getItem(d);return e?this.getCurrentUID(e):this.generateAndSave()},e.prototype.generateAndSave=function(){var e=this.getScopeDomains(),t=this.tryToSetAllDomains(e);return t?t.getID():{scope:null,uuid:null}},e.prototype.getCurrentUID=function(e){var t=new w;if(t.parse(e)){var n=t.getID();return n.scope&&n.uuid&&this.storeFacade.setItem(d,e,n.scope),n}return this.generateAndSave()},e.prototype.tryToSetAllDomains=function(e){for(var t=0;t<e.length;t++){var n=e[t],i=new w;i.generate(n);var r=i.getJoined();if(this.storeFacade.setItem(d,r,n))return i}},e.prototype.getScopeDomains=function(e){void 0===e&&(e=location.hostname);var t=e.split(".");if(t.length<=1)return t;for(var n=[],i=0;i<t.length-1;i++){var r=t[i];n.unshift(S([r],t.slice(i+1),!0).join("."))}return n},e}();function x(e,t){let n,i,r=!1;return function o(){for(var s=arguments.length,a=new Array(s),d=0;d<s;d++)a[d]=arguments[d];if(r)return n=a,void(i=this);e.apply(this,a),r=!0,setTimeout((()=>{r=!1,n&&(o.apply(i,n),n=i=null)}),t||100)}}function C(e){const t=Object.entries(e).filter((e=>{let[,t]=e;return null!=t}));return Object.fromEntries(t)}let T=function(e){return e.Beacon="beacon",e.Xhr="xhr",e}({});const U=6e4,R=[5e3,1e4,3e4,6e4,2*U,3*U,5*U,8*U,78e4,21*U,34*U];function O(e){let t,n=1,i=null,r=!1,o=0;const s=[{eventName:"scroll",value:0},{eventName:"mousemove",value:0},{eventName:"click",value:0},{eventName:"keydown",value:0},{eventName:"resize",value:0}].map(((e,t)=>({...e,eventHandler:x((()=>s[t].value++),250)}))),a=()=>s.map((e=>e.value)).join("_"),d=e=>s.map((t=>Math.min(250*t.value,e))).join("_"),c=()=>s.forEach((e=>{e.value=0}));function u(){let i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T.Xhr;const r=Date.now(),s=r-t,u={activityCounters:a(),activityDurations:d(s),duration:s,num:n++,timestamp:r};e.onPing(u,i),c(),o+=s,t=r}function l(){const e=function(){let e=null;for(const t of R)if(o<t){e=t-o;break}return e}();e?i=window.setTimeout((()=>{u(),l()}),e):v(!1)}function h(){p(!0)}function m(){const e=document.visibilityState;"visible"===e?function(){if(r)return;r=!0,t=Date.now(),l()}():"hidden"===e&&p(!0)}function p(e){r&&(r=!1,i&&window.clearTimeout(i),i=null,e&&u(T.Beacon))}function v(e){p(e),document.removeEventListener("visibilitychange",m),window.removeEventListener("pagehide",h),s.forEach((e=>window.removeEventListener(e.eventName,e.eventHandler)))}return document.addEventListener("visibilitychange",m),window.addEventListener("pagehide",h),s.forEach((e=>window.addEventListener(e.eventName,e.eventHandler))),m(),v}class P{constructor(){(0,a.Z)(this,"stopActivityTracker",null),this.reset()}start(e){this.stop();const t={onPing:e};this.stopActivityTracker=O(t)}stop(){this.stopActivityTracker&&this.stopActivityTracker(!0),this.reset()}reset(){this.stopActivityTracker=null}}let A=(e=21)=>crypto.getRandomValues(new Uint8Array(e)).reduce(((e,t)=>e+=(t&=63)<36?t.toString(36):t<62?(t-26).toString(36).toUpperCase():t>62?"-":"_"),"");class _{constructor(){(0,a.Z)(this,"resendList",null),(0,a.Z)(this,"resendTailElem",null)}push(e){const t={data:e,next:null};this.resendList?this.resendTailElem.next=t:this.resendList=t,this.resendTailElem=t}shift(){if(this.resendList){const e=this.resendList.data;return this.resendList=this.resendList.next,e}return null}get isEmpty(){return!this.resendList}}const V=window.navigator.userAgent.includes("Firefox");class F{constructor(e){(0,a.Z)(this,"baseUrl","https://kraken.rambler.ru/cnt/v2/"),(0,a.Z)(this,"queue",new _),(0,a.Z)(this,"isOnLine",window.navigator.onLine),(0,a.Z)(this,"eventNumber",1),this.baseParams={event_type:"rec",counter_type:e.isAmp?"amp":"web",project_id:e.projectId,version:"1.9.6463+g58389f1f0",session_id:A(),ruid:e.ruid,adtech_uid:e.adtechUid,adtech_uid_scope:e.adtechUidScope},this.baseMeta={xuid:e.xuid,xuidRcmId:e.rcmId,itemRcmId:e.rcmId},this.baseFetchOptions={mode:"cors",credentials:"include",referrerPolicy:"no-referrer",cache:"no-store",redirect:"follow"},window.addEventListener("online",this.createConnectionListener()),window.addEventListener("offline",(()=>{this.isOnLine=!1}))}createConnectionListener(){let e;return async()=>{if(this.isOnLine=!0,!this.queue.isEmpty&&!e){e=!0;let t=0;do{const e=this.queue.shift();e&&this.sendFetch(e,!1),t++,t%10==0&&await new Promise((e=>{setTimeout(e,2e3)}))}while(!this.queue.isEmpty&&this.isOnLine);e=!1}}}enrichEventData(e){const{runtimeContext:t,event:n,userId:i,...r}=e,o={...this.baseMeta,referrer:t.referrer,referrerShowId:t.referrerShowId,...r},a={event_name:n,...this.baseParams,auth_uid:i,request_id:t.pvId,event_id:A(),session_event_number:String(this.eventNumber++),random:String(Math.floor(1e11*Math.random())),url:t.currentUrl,meta:JSON.stringify(C(o))};return s.k.log(["rcm event: ".concat(n),"\nmeta:",r,"\nparams:",a]),new URLSearchParams(C(a))}useBeacon(t){const n=window.navigator,i=t.toString();if(!n.sendBeacon||!n.sendBeacon(this.baseUrl,i)){if(V){const t=new XMLHttpRequest;t.open("POST",this.baseUrl,!1),t.setRequestHeader("Content-Type","text/plain;charset=UTF-8"),t.withCredentials=!0;try{t.send(i)}catch(t){s.k.error({error:t,category:e.W.Network,fingerprint:["Failed to send synchronous xhr from useBeacon to Kraken"]})}}else this.useFetch(t,!0);s.k.info({message:"sendBeacon ".concat(n.sendBeacon?"failed to send":"does not exist"),category:e.W.Network,fingerprint:["sendBeacon","error"]})}}useFetch(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const n=e.toString();let i,r;n.length>1500?(i={...this.baseFetchOptions,method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},body:n,keepalive:t},r=this.baseUrl):(i={...this.baseFetchOptions,method:"GET",keepalive:t},r="".concat(this.baseUrl,"?").concat(n)),this.sendFetch({url:r,options:i,count:0})}sendFetch(t){let n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];const{url:i,options:r}=t;fetch(i,r).then((t=>{t.ok||s.k.error({error:"Kraken api error with status code=".concat(t.status," and text=").concat(t.statusText),category:e.W.Network,fingerprint:["Kraken api failed"]})})).catch((i=>{n&&s.k.error({error:i,message:"Kraken: client failed to fetch",category:e.W.Network,fingerprint:["Kraken failed to fetch"]}),this.enqueueFetch(t)}))}enqueueFetch(e){e.count++>=15||(this.queue.push(e),this.isOnLine&&this.runResendTimer())}runResendTimer(){this.resendTimer||(this.resendTimer=window.setTimeout((()=>{if(this.resendTimer=null,this.isOnLine){for(let e=0;e<10;e++){const e=this.queue.shift();if(!e)break;this.sendFetch(e,!1)}this.queue.isEmpty||this.runResendTimer()}}),2e3))}send(e,t){const n=this.enrichEventData(e);(null==t?void 0:t.transport)===T.Beacon?this.useBeacon(n):this.useFetch(n)}}var L=r(886);const q="rcmrclid_list",M="rcmrclid";function j(){const e=L.X.getItem(q);if(e){let t;try{t=JSON.parse(e)}catch(e){}const[n,i]=function(e){const t={};let n=!1;if("object"==typeof e&&null!==e)for(const[i,r]of Object.entries(e))Array.isArray(r)&&r[0]&&r[1]&&Date.now()<r[1]?t[i]=r:n=!0;else n=!0;return[n,t]}(t);return n&&L.X.setItem(q,JSON.stringify(i)),i}return{}}function B(e){o.set(M,e)}function D(){const e=new Uint32Array(10);crypto.getRandomValues(e);let t=0;for(const n of Array.from(e))t^=n;return"".concat(Date.now()/1e3,"-").concat(Math.abs(t))}class N{constructor(e,t){var n,i;(0,a.Z)(this,"microdataObserver",null),(0,a.Z)(this,"initVideo",null),s.k.log(["rcm event: 'setup', meta:",e]),this.rcmId=e.rcmId,this.xuid=e.xuid,this.ruid=e.ruid,this.userId=e.userId,this.isAmp=null!==(n=e.isAmp)&&void 0!==n&&n,this.adtechUid=e.adtechUid,this.adtechUidScope=e.adtechUidScope,this.options=null!=t?t:{},this.isFirstPVId=!0,this.runtimeContext=this.createRuntimeContext();const r=null===(i=e.isActivityTrackerEnabled)||void 0===i||i;if(this.activityTrackerManager=r?new P:null,s.k.log(["rcm activity tracker ".concat(r?"enabled":"disabled")]),void 0===this.adtechUid||void 0===this.adtechUidScope){const e=(new E).getID();this.adtechUid=e.uuid,this.adtechUidScope=e.scope}this.transport=new F({projectId:"7696632",...e.transportConfig,adtechUid:this.adtechUid,adtechUidScope:this.adtechUidScope,xuid:this.xuid,ruid:this.ruid,rcmId:this.rcmId,isAmp:this.isAmp})}getOnSetupParams(){return{adtechUid:{uid:this.adtechUid,scope:this.adtechUidScope},runtimeContext:{...this.runtimeContext}}}setMeta(e){s.k.log(["rcm event: 'setMeta', meta:",e]),this.userId=e.userId}sendAddToBookmarks(e){this.sendEvent({event:"rvaddbm",itemUrl:e.itemUrl,itemId:e.itemId})}sendAddToWatchlist(e){this.sendEvent({event:"rvaddwl",itemUrl:e.itemUrl,itemId:e.itemId})}sendBlockInit(e){var t;this.sendEvent({event:"blockinit",blockId:e.blockId,itemId:null!==(t=e.contextItemId)&&void 0!==t?t:void 0})}sendClick(e){this.sendEvent({event:"click",blockId:e.blockId,contextItemId:e.contextItemId,itemRcmId:e.item.rcm_id,position:e.position,requestId:e.requestId,itemUrl:e.item.item_url,showId:e.item.show_id,itemId:e.item.item_id},{transport:T.Beacon})}sendDislike(e){this.sendEvent({event:"dislike",editorChoice:e.reason,itemRcmId:e.rcmId||this.rcmId,itemUrl:e.itemUrl,showId:e.showId,itemId:e.itemId})}sendLike(e){this.sendEvent({event:"like",editorChoice:e.reason,itemRcmId:e.rcmId||this.rcmId,itemUrl:e.itemUrl,showId:e.showId,itemId:e.itemId})}sendPageRead(e){this.sendEvent({event:"pageread",itemId:e.itemId})}sendPageView(e){const{itemId:t}=e;this.activityTrackerRunCommand("stop"),this.updateRuntimeContext(t),this.sendEvent({event:"pageview",itemId:t}),this.activityTrackerRunCommand("start",t),this.microdataObserverRunCommand("start",t)}sendAutoPageView(e){const{itemId:t}=e;this.activityTrackerRunCommand("stop"),this.updateRuntimeContext(t),this.sendEvent({event:"autopageview",itemId:t}),this.activityTrackerRunCommand("start",t),this.microdataObserverRunCommand("start",t)}sendHubPageView(e){const{hubId:t}=e;this.activityTrackerRunCommand("stop"),this.updateRuntimeContext(),this.sendEvent({event:"hubpageview",itemId:t}),this.activityTrackerRunCommand("start",t),this.microdataObserverRunCommand("stop")}sendRemoveFromBookmarks(e){this.sendEvent({event:"rvrmbm",itemUrl:e.itemUrl,itemId:e.itemId})}sendRemoveFromWatchlist(e){this.sendEvent({event:"rvrmwl",itemUrl:e.itemUrl,itemId:e.itemId})}sendShow(e){this.sendEvent({event:"show",blockId:e.blockId,contextItemId:e.contextItemId,itemRcmId:e.item.rcm_id,position:e.position,requestId:e.requestId,itemUrl:e.item.item_url,showId:e.item.show_id,itemId:e.item.item_id})}sendShowAd(e){this.sendEvent({event:"showAd",blockId:e.blockId,contextItemId:e.contextItemId,position:e.position,requestId:e.requestId})}sendFulltextShow(e){let t,n;this.activityTrackerRunCommand("stop"),("blockId"in e||"position"in e||"item"in e)&&!("itemId"in e)?(t=e.item.item_id,n={event:"fulltext_show",blockId:e.blockId,contextItemId:e.contextItemId,itemRcmId:e.item.rcm_id,position:e.position,requestId:e.requestId,itemUrl:e.item.item_url,showId:e.item.show_id,itemId:t}):(t=e.itemId,n={event:"fulltext_show",itemId:t}),this.updateRuntimeContext(t),this.sendEvent(n),this.activityTrackerRunCommand("start",t),this.microdataObserverRunCommand("start",t)}sendFulltextClick(e){this.sendEvent({event:"fulltext_click",blockId:e.blockId,contextItemId:e.contextItemId,itemRcmId:e.item.rcm_id,position:e.position,requestId:e.requestId,itemUrl:e.item.item_url,showId:e.item.show_id,itemId:e.item.item_id},{transport:T.Beacon})}sendSubscribe(e){var t;this.sendEvent({event:"subscribe",position:e.authorId,itemId:null!==(t=e.contextItemId)&&void 0!==t?t:void 0})}sendUnsubscribe(e){var t;this.sendEvent({event:"unsubscribe",position:e.authorId,itemId:null!==(t=e.contextItemId)&&void 0!==t?t:void 0})}async setVideoInit(t){if(!this.initVideo)try{const e=await r.e(117).then(r.bind(r,117));this.initVideo=e.initVideo}catch(t){return void s.k.error({error:t,category:e.W.VideoPlayer,message:"VideoInit set up incorrectly"})}this.initVideo(t,{end:e=>{this.sendVideoEnd({...e})},pause:e=>{this.sendVideoPause({...e})},progress:e=>{this.sendVideoProgress({...e})},screenOff:e=>{this.sendVideoFullScreenOff({...e})},screenOn:e=>{this.sendVideoFullScreenOn({...e})},start:e=>{this.sendVideoStart({...e})}})}sendVideoFullScreenOff(e){this.sendEvent({event:"rvfoff",editorChoice:e.resourceId,itemId:e.itemId})}sendVideoFullScreenOn(e){this.sendEvent({event:"rvfon",editorChoice:e.resourceId,itemId:e.itemId})}sendVideoProgress(e){this.sendEvent({event:"rvp",blockId:String(e.duration),duration:e.pingDuration,editorChoice:e.resourceId,showId:String(e.progress),itemId:e.itemId})}sendVideoPause(e){this.sendEvent({event:"rvpause",editorChoice:e.resourceId,itemId:e.itemId})}sendVideoStart(e){this.sendEvent({event:"rvs",editorChoice:e.resourceId,itemId:e.itemId})}sendVideoEnd(e){this.sendEvent({event:"rve",editorChoice:e.resourceId,itemId:e.itemId})}sendActivityPing(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:T.Xhr;this.sendEvent({event:"activityPing",activityCounters:e.activityCounters,activityDurations:e.activityDurations,duration:e.duration,editorChoice:"2",position:e.num,timestamp:e.timestamp,itemId:e.itemId},{transport:t})}sendScrollEnd(e){this.sendEvent({event:"scrollEnd",duration:e.duration,portion:e.portion,itemId:e.itemId})}sendReadEnd(e){this.sendEvent({event:"readEnd",duration:e.duration,portion:e.portion,itemId:e.itemId})}sendOrderCheckout(e){this.sendEvent({event:"orderCheckout",itemId:e.itemId},{transport:T.Beacon})}sendOrderPaid(e){this.sendEvent({event:"orderPaid",itemId:e.itemId},{transport:T.Beacon})}sendBookingCheckout(e){this.sendEvent({event:"bookingCheckout",itemId:e.itemId},{transport:T.Beacon})}sendBookingDone(e){this.sendEvent({event:"bookingDone",itemId:e.itemId},{transport:T.Beacon})}sendSearch(e){this.sendEvent({event:"search",text:e.text.trim().substring(0,100)})}sendExternalClick(e){this.sendEvent({event:"externalClick",blockId:e.blockId,contextItemId:e.contextItemId,itemRcmId:e.item.rcm_id,position:e.position,itemUrl:e.item.item_url,itemId:e.item.item_id},{transport:T.Beacon})}sendExternalShow(e){this.sendEvent({event:"externalShow",blockId:e.blockId,contextItemId:e.contextItemId,itemRcmId:e.item.rcm_id,position:e.position,itemUrl:e.item.item_url,itemId:e.item.item_id})}createRuntimeContext(){var e,t,n;const i=function(){let e;const t=window.location.hash;return t&&t.startsWith("#".concat(M,"="))&&(e=t.substring(10)||void 0),B(e),e}();return{currentUrl:this.isAmp?null===(e=window.context)||void 0===e?void 0:e.canonicalUrl:window.location.href,referrer:this.isAmp?null===(t=window.context)||void 0===t?void 0:t.referrer:null!==(n=this.runtimeContext)&&void 0!==n&&n.currentUrl?this.runtimeContext.currentUrl:document.referrer,referrerShowId:i,pvId:D()}}updateRuntimeContext(e){this.isFirstPVId?this.isFirstPVId=!1:this.runtimeContext=this.createRuntimeContext();const t=this.options.storeRcmClickId;if(e&&null!=t&&t.enable){const n=this.runtimeContext.referrerShowId;n?function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:14400;const i=j();i[e]=[t,Date.now()+1e3*n],L.X.setItem(q,JSON.stringify(i))}(e,n,t.expires):this.runtimeContext.referrerShowId=function(e){const t=j();let n;return t[e]&&(n=t[e][0]),B(n),n}(e)}}async microdataObserverRunCommand(t,n){if(!this.microdataObserver){var i;if(null===(i=this.options.microdata)||void 0===i||!i.enable)return;try{const e=await r.e(729).then(r.bind(r,944));this.microdataObserver=new e.MicrodataObserver}catch(t){return void s.k.error({error:t,category:e.W.Microdata,message:"MicrodataObserver set up incorrectly"})}}"start"===t&&n?this.microdataObserver.observe(n,(e=>{this.sendScrollEnd({...e,itemId:n})}),(e=>{this.sendReadEnd({...e,itemId:n})})):"stop"===t&&this.microdataObserver.stopObserving()}activityTrackerRunCommand(e,t){this.activityTrackerManager&&("start"===e&&t?this.activityTrackerManager.start(((e,n)=>{this.sendActivityPing({...e,itemId:t},n)})):"stop"===e&&this.activityTrackerManager.stop())}sendEvent(e,t){this.transport.send({...e,userId:this.userId,runtimeContext:this.runtimeContext},t)}}const W=(e,t)=>"number"===t?String(e):null,K=!0,Z={s:{type:"string",toType:W},b:{type:"boolean",toType:e=>!!e},o:{type:"object"},n:{type:"number",toType:(e,t)=>{if("string"===t){const t=e.trim();if(t.length){const e=Number(t);if(!Number.isNaN(e))return e}}return null}},f:{type:"function"},sn:{type:"string",nullable:!0,toType:W}},X={s:{...Z.s,required:K},b:{...Z.b,required:K},o:{...Z.o,required:K},n:{...Z.n,required:K},f:{...Z.f,required:K}},H=[["item_id",X.s],["item_url",Z.s],["rcm_id",X.s],["show_id",Z.sn]],J=[["itemId",X.s]],Q=[...J,["itemUrl",X.s]],G=[...Q,["rcmId",Z.s],["showId",Z.s],["reason",Z.s]],z=[["blockId",X.s],["requestId",Z.sn],["contextItemId",Z.sn],["position",X.n],["item",{...X.o,model:H}]],$=[["authorId",X.s],["contextItemId",Z.sn]],Y=[...J,["resourceId",X.n]],ee=[...J,["duration",X.n],["portion",X.n]],te=[["blockId",Z.s],["contextItemId",Z.sn],["position",X.n],["item",{...X.o,model:H}]],ne={setup:[["rcmId",X.s],["userId",Z.sn],["isActivityTrackerEnabled",Z.b],["isAmp",Z.b],["xuid",Z.sn],["ruid",{...Z.sn,specialCheck:e=>"string"!=typeof e||32!==e.length||/[^0-9A-F]/i.test(e)?"".concat(e," is not a 32-digit hex number"):null}],["adtechUid",Z.sn],["adtechUidScope",Z.sn]],onLoad:X.f,onSetup:X.f,setMeta:[["userId",Z.sn]],addToBookmarks:Q,addToWatchlist:Q,blockinit:[["contextItemId",Z.sn],["blockId",X.s]],click:z,fulltextClick:z,show:z,fulltextShow:e=>"itemId"in e&&!("blockId"in e||"position"in e||"item"in e)?J:z,like:G,dislike:G,pageread:J,pageview:J,autopageview:J,hubpageview:[["hubId",X.s]],removeFromBookmarks:Q,removeFromWatchlist:Q,subscribe:$,unsubscribe:$,videoInit:[...J,["parentId",X.s],["resourceId",X.n],["playerOptions",Z.o],["onReady",Z.f]],videoFullScreenOff:Y,videoFullScreenOn:Y,videoPause:Y,videoStart:Y,videoEnd:Y,videoProgress:[...Y,["duration",X.n],["progress",X.n],["pingDuration",X.n]],showAd:[["blockId",X.s],["position",X.n],["requestId",Z.sn],["contextItemId",Z.sn]],activityPing:[...J,["timestamp",X.n],["duration",X.n],["activityCounters",X.s],["activityDurations",X.s],["num",Z.n]],readEnd:ee,scrollEnd:ee,orderCheckout:J,orderPaid:J,bookingCheckout:J,bookingDone:J,search:[["text",X.s]],externalClick:te,externalShow:te},ie=(e,t,n)=>{let i,r=[],o=[];if("string"!=typeof e)r.push("Event name is not a string, type=".concat(typeof e));else if(Array.isArray(n))i=n;else{const n=ne[e];Array.isArray(n)?i=n:"function"==typeof n?i=n(t):void 0!==n&&(i=[["userMeta",n]],t={userMeta:t}),!i||"object"==typeof t&&null!==t||r.push("Meta is not an object for event=".concat(e))}if(!r.length)if(i)for(const[n,s]of i){let i=t[n];if(void 0===i&&s.required)r.push('Required param "'.concat(n,'" is missed in "').concat(e,'" event'));else if(void 0!==i){if(null===i&&s.nullable)continue;if("object"===s.type){if(null===i){r.push('Required param "'.concat(n,'" is equal to "null" in "').concat(e,'" event'));continue}if(s.model){const t=ie("".concat(e,".").concat(n),i,s.model);t.errorMsg.length&&(r=r.concat(t.errorMsg)),t.warnMsg.length&&(o=o.concat(t.warnMsg));continue}}let a=typeof i;if(s.type!==a){if(!s.toType){r.push('Param "'.concat(n,'": ').concat(String(i)," is not of type ").concat(s.type,' in "').concat(e,'" event'));continue}{const o=s.toType(i,a);if(null===o){r.push('Cannot coerce type of param "'.concat(n,'": ').concat(JSON.stringify(i)," (").concat(a,") to ").concat(s.type,' in "').concat(e,'" event'));continue}t[n]=o,i=o,a=s.type}}if(s.specialCheck){const e=s.specialCheck(i);e&&(o.push('Param "'.concat(n,'": ').concat(e)),delete t[n])}"string"===a&&""===i.trim()&&(s.required?r.push('Param "'.concat(n,'": is empty string in "').concat(e,'" event')):(delete t[n],i=void 0))}}else o.push("Unknown event ".concat(e));return{errorMsg:r,warnMsg:o}},re=[],oe={},se={"RCM-7BA1":{options:{storeRcmClickId:{enable:!0}}}};let ae,de;function ce(n,i){if("setup"===n){if(de)return;ae="string"==typeof(null==i?void 0:i.rcmId)&&i.rcmId||"none";const e=[["rcmId",ae],["amp",String(!(null==i||!i.isAmp))]];if(s.k.setTags(e),re.includes(ae))return void console.warn("[rcm warning] ".concat(ae," was filtered"))}else if(!de)return;const{warnMsg:r,errorMsg:o}=ie(n,i);if(r.forEach((t=>{s.k.info({message:t,category:e.W.Settings,fingerprint:["Validation",ae],forcedLog:!0})})),o.length)o.forEach((t=>{s.k.error({error:t,category:e.W.Settings,fingerprint:["Validation",ae],forcedLog:!0})}));else try{switch(n){case"setup":{const e=function(e){return se[e]||oe[e]&&se[oe[e]]}(i.rcmId);de=new N({...null==e?void 0:e.setup,...i},null==e?void 0:e.options),ce.isInit=!0;break}case"onLoad":i(t.Ready);break;case"onSetup":i(de.getOnSetupParams());break;case"setMeta":de.setMeta(i);break;case"addToBookmarks":de.sendAddToBookmarks(i);break;case"addToWatchlist":de.sendAddToWatchlist(i);break;case"blockinit":de.sendBlockInit(i);break;case"click":de.sendClick(i);break;case"dislike":de.sendDislike(i);break;case"like":de.sendLike(i);break;case"pageread":de.sendPageRead(i);break;case"pageview":de.sendPageView(i);break;case"autopageview":de.sendAutoPageView(i);break;case"hubpageview":de.sendHubPageView(i);break;case"removeFromBookmarks":de.sendRemoveFromBookmarks(i);break;case"removeFromWatchlist":de.sendRemoveFromWatchlist(i);break;case"show":de.sendShow(i);break;case"subscribe":de.sendSubscribe(i);break;case"unsubscribe":de.sendUnsubscribe(i);break;case"videoFullScreenOff":de.sendVideoFullScreenOff(i);break;case"videoInit":de.setVideoInit(i);break;case"videoFullScreenOn":de.sendVideoFullScreenOn(i);break;case"videoProgress":de.sendVideoProgress(i);break;case"videoPause":de.sendVideoPause(i);break;case"videoStart":de.sendVideoStart(i);break;case"videoEnd":de.sendVideoEnd(i);break;case"fulltextShow":de.sendFulltextShow(i);break;case"fulltextClick":de.sendFulltextClick(i);break;case"showAd":de.sendShowAd(i);break;case"activityPing":de.sendActivityPing(i);break;case"scrollEnd":de.sendScrollEnd(i);break;case"readEnd":de.sendReadEnd(i);break;case"orderCheckout":de.sendOrderCheckout(i);break;case"orderPaid":de.sendOrderPaid(i);break;case"bookingCheckout":de.sendBookingCheckout(i);break;case"bookingDone":de.sendBookingDone(i);break;case"search":de.sendSearch(i);break;case"externalClick":de.sendExternalClick(i);break;case"externalShow":de.sendExternalShow(i)}}catch(t){s.k.error({error:t,category:e.W.Event})}}ce.isInit=!1,ce.config=o;const ue=(t,n)=>{"function"==typeof t?t(n):s.k.error({error:"Meta is not a function for event=onLoad",category:e.W.Event})},le=(e,t)=>(ce("setup",e),!!ce.isInit&&(window.rcm=ce,t.forEach((e=>{let[t,n]=e;return window.rcm(t,n)})),!0)),he=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];he.q.push(t)};he.isInit=!0,he.q={innerQueue:[],push(e){const[n,i]=e;"onLoad"===n?ue(i,t.Pending):"setup"===n?le(i,this.innerQueue):this.innerQueue.push(e)}};(()=>{if(!window.rcm)return void s.k.error({error:"Rcm is set up incorrectly",category:e.W.Settings,fingerprint:["Rcm is set up incorrectly"]});if(window.rcm.isInit)return;if("function"!=typeof window.IntersectionObserver)return;let n,i=Array.isArray(window.rcm.q)?window.rcm.q:[];i=i.filter((e=>{switch(e[0]){case"onLoad":return ue(e[1],t.Pending),!1;case"setup":return n||(n=e),!1;default:return!0}})),n&&le(n[1],i)||(he.q.innerQueue=i,window.rcm=he)})()})()})();