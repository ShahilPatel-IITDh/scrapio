(function(sttc){/* 
 
 Copyright The Closure Library Authors. 
 SPDX-License-Identifier: Apache-2.0 
*/ 
function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}var ba="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a}; 
function ca(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");}var m=ca(this),da="function"===typeof Symbol&&"symbol"===typeof Symbol("x"),u={},v={};function ea(a,b,c){if(!c||null!=a){c=v[b];if(null==c)return a[b];c=a[c];return void 0!==c?c:a[b]}} 
function fa(a,b,c){if(b)a:{var d=a.split(".");a=1===d.length;var h=d[0],f;!a&&h in u?f=u:f=m;for(h=0;h<d.length-1;h++){var e=d[h];if(!(e in f))break a;f=f[e]}d=d[d.length-1];c=da&&"es6"===c?f[d]:null;b=b(c);null!=b&&(a?ba(u,d,{configurable:!0,writable:!0,value:b}):b!==c&&(void 0===v[d]&&(a=1E9*Math.random()>>>0,v[d]=da?m.Symbol(d):"$jscp$"+a+"$"+d),ba(f,v[d],{configurable:!0,writable:!0,value:b})))}}function ha(a){return a.raw=a} 
function ia(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];if(b)return b.call(a);if("number"==typeof a.length)return{next:aa(a)};throw Error(String(a)+" is not an iterable or ArrayLike");}var ja="function"==typeof Object.create?Object.create:function(a){function b(){}b.prototype=a;return new b},ka; 
if(da&&"function"==typeof Object.setPrototypeOf)ka=Object.setPrototypeOf;else{var la;a:{var ma={a:!0},na={};try{na.__proto__=ma;la=na.a;break a}catch(a){}la=!1}ka=la?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var oa=ka; 
function pa(a,b){a.prototype=ja(b.prototype);a.prototype.constructor=a;if(oa)oa(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.N=b.prototype}function qa(){for(var a=Number(this),b=[],c=a;c<arguments.length;c++)b[c-a]=arguments[c];return b} 
fa("Promise",function(a){function b(e){this.h=0;this.i=void 0;this.g=[];this.B=!1;var g=this.j();try{e(g.resolve,g.reject)}catch(k){g.reject(k)}}function c(){this.g=null}function d(e){return e instanceof b?e:new b(function(g){g(e)})}if(a)return a;c.prototype.h=function(e){if(null==this.g){this.g=[];var g=this;this.i(function(){g.l()})}this.g.push(e)};var h=m.setTimeout;c.prototype.i=function(e){h(e,0)};c.prototype.l=function(){for(;this.g&&this.g.length;){var e=this.g;this.g=[];for(var g=0;g<e.length;++g){var k= 
e[g];e[g]=null;try{k()}catch(l){this.j(l)}}}this.g=null};c.prototype.j=function(e){this.i(function(){throw e;})};b.prototype.j=function(){function e(l){return function(n){k||(k=!0,l.call(g,n))}}var g=this,k=!1;return{resolve:e(this.F),reject:e(this.l)}};b.prototype.F=function(e){if(e===this)this.l(new TypeError("A Promise cannot resolve to itself"));else if(e instanceof b)this.H(e);else{a:switch(typeof e){case "object":var g=null!=e;break a;case "function":g=!0;break a;default:g=!1}g?this.D(e):this.s(e)}}; 
b.prototype.D=function(e){var g=void 0;try{g=e.then}catch(k){this.l(k);return}"function"==typeof g?this.I(g,e):this.s(e)};b.prototype.l=function(e){this.C(2,e)};b.prototype.s=function(e){this.C(1,e)};b.prototype.C=function(e,g){if(0!=this.h)throw Error("Cannot settle("+e+", "+g+"): Promise already settled in state"+this.h);this.h=e;this.i=g;2===this.h&&this.G();this.L()};b.prototype.G=function(){var e=this;h(function(){if(e.M()){var g=m.console;"undefined"!==typeof g&&g.error(e.i)}},1)};b.prototype.M= 
function(){if(this.B)return!1;var e=m.CustomEvent,g=m.Event,k=m.dispatchEvent;if("undefined"===typeof k)return!0;"function"===typeof e?e=new e("unhandledrejection",{cancelable:!0}):"function"===typeof g?e=new g("unhandledrejection",{cancelable:!0}):(e=m.document.createEvent("CustomEvent"),e.initCustomEvent("unhandledrejection",!1,!0,e));e.promise=this;e.reason=this.i;return k(e)};b.prototype.L=function(){if(null!=this.g){for(var e=0;e<this.g.length;++e)f.h(this.g[e]);this.g=null}};var f=new c;b.prototype.H= 
function(e){var g=this.j();e.m(g.resolve,g.reject)};b.prototype.I=function(e,g){var k=this.j();try{e.call(g,k.resolve,k.reject)}catch(l){k.reject(l)}};b.prototype.then=function(e,g){function k(p,q){return"function"==typeof p?function(t){try{l(p(t))}catch(A){n(A)}}:q}var l,n,r=new b(function(p,q){l=p;n=q});this.m(k(e,l),k(g,n));return r};b.prototype.catch=function(e){return this.then(void 0,e)};b.prototype.m=function(e,g){function k(){switch(l.h){case 1:e(l.i);break;case 2:g(l.i);break;default:throw Error("Unexpected state: "+ 
l.h);}}var l=this;null==this.g?f.h(k):this.g.push(k);this.B=!0};b.resolve=d;b.reject=function(e){return new b(function(g,k){k(e)})};b.race=function(e){return new b(function(g,k){for(var l=ia(e),n=l.next();!n.done;n=l.next())d(n.value).m(g,k)})};b.all=function(e){var g=ia(e),k=g.next();return k.done?d([]):new b(function(l,n){function r(t){return function(A){p[t]=A;q--;0==q&&l(p)}}var p=[],q=0;do p.push(void 0),q++,d(k.value).m(r(p.length-1),n),k=g.next();while(!k.done)})};return b},"es6"); 
fa("String.prototype.endsWith",function(a){return a?a:function(b,c){if(null==this)throw new TypeError("The 'this' value for String.prototype.endsWith must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype.endsWith must not be a regular expression");void 0===c&&(c=this.length);c=Math.max(0,Math.min(c|0,this.length));for(var d=b.length;0<d&&0<c;)if(this[--c]!=b[--d])return!1;return 0>=d}},"es6");var w=this||self;function ra(a){return a};var sa,x;a:{for(var ta=["CLOSURE_FLAGS"],y=w,ua=0;ua<ta.length;ua++)if(y=y[ta[ua]],null==y){x=null;break a}x=y}var va=x&&x[610401301];sa=null!=va?va:!1;var C,wa=w.navigator;C=wa?wa.userAgentData||null:null;function za(a){return sa?C?C.brands.some(function(b){return(b=b.brand)&&-1!=b.indexOf(a)}):!1:!1}function D(a){var b;a:{if(b=w.navigator)if(b=b.userAgent)break a;b=""}return-1!=b.indexOf(a)};function F(){return sa?!!C&&0<C.brands.length:!1}function Aa(){!D("Safari")||Ba()||(F()?0:D("Coast"))||(F()?0:D("Opera"))||(F()?0:D("Edge"))||(F()?za("Microsoft Edge"):D("Edg/"))||F()&&za("Opera")}function Ba(){return F()?za("Chromium"):(D("Chrome")||D("CriOS"))&&!(F()?0:D("Edge"))||D("Silk")};function Ca(a){Ca[" "](a);return a}Ca[" "]=function(){};var Da=F()?!1:D("Trident")||D("MSIE");!D("Android")||Ba();Ba();Aa();var Ea={},G=null;var Fa="undefined"!==typeof Uint8Array,Ga=!Da&&"function"===typeof btoa;var H="function"===typeof Symbol&&"symbol"===typeof Symbol()?Symbol():void 0,Ha=H?function(a,b){a[H]|=b}:function(a,b){void 0!==a.g?a.g|=b:Object.defineProperties(a,{g:{value:b,configurable:!0,writable:!0,enumerable:!1}})},I=H?function(a){return a[H]|0}:function(a){return a.g|0},Ia=H?function(a){return a[H]}:function(a){return a.g},Ja=H?function(a,b){a[H]=b}:function(a,b){void 0!==a.g?a.g=b:Object.defineProperties(a,{g:{value:b,configurable:!0,writable:!0,enumerable:!1}})}; 
function Ka(){var a=[];Ha(a,1);return a}function La(a){a=a>>10&1023;return 0===a?536870912:a};var Ma={};function J(a){return null!==a&&"object"===typeof a&&!Array.isArray(a)&&a.constructor===Object}var Na=[];Ja(Na,39);Object.freeze(Na);function Oa(a){if(null==a)return a;if("boolean"===typeof a||"number"===typeof a)return!!a}function Pa(a){return null==a||"string"===typeof a?a:void 0};var Qa;function Ra(a,b,c){null==a&&(a=Qa);Qa=void 0;if(null==a){var d=96;c?(a=[c],d|=512):a=[];b&&(d=d&-1047553|(b&1023)<<10)}else{if(!Array.isArray(a))throw Error();d=I(a);if(d&64)return a;d|=64;if(c&&(d|=512,c!==a[0]))throw Error();a:{c=a;var h=c.length;if(h){var f=h-1,e=c[f];if(J(e)){d|=256;b=(d>>9&1)-1;h=f-b;1024<=h&&(Sa(c,b,e),h=1023);d=d&-1047553|(h&1023)<<10;break a}}b&&(e=(d>>9&1)-1,b=Math.max(b,h-e),1024<b&&(Sa(c,e,{}),d|=256,b=1023),d=d&-1047553|(b&1023)<<10)}}Ja(a,d);return a} 
function Sa(a,b,c){for(var d=1023+b,h=a.length,f=d;f<h;f++){var e=a[f];null!=e&&e!==c&&(c[f-b]=e)}a.length=d+1;a[d]=c};function Ta(a){switch(typeof a){case "number":return isFinite(a)?a:String(a);case "boolean":return a?1:0;case "object":if(a&&!Array.isArray(a)&&Fa&&null!=a&&a instanceof Uint8Array){if(Ga){for(var b="",c=0,d=a.length-10240;c<d;)b+=String.fromCharCode.apply(null,a.subarray(c,c+=10240));b+=String.fromCharCode.apply(null,c?a.subarray(c):a);a=btoa(b)}else{void 0===b&&(b=0);if(!G){G={};c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");d=["+/=","+/","-_=","-_.","-_"];for(var h= 
0;5>h;h++){var f=c.concat(d[h].split(""));Ea[h]=f;for(var e=0;e<f.length;e++){var g=f[e];void 0===G[g]&&(G[g]=e)}}}b=Ea[b];c=Array(Math.floor(a.length/3));d=b[64]||"";for(h=f=0;f<a.length-2;f+=3){var k=a[f],l=a[f+1];g=a[f+2];e=b[k>>2];k=b[(k&3)<<4|l>>4];l=b[(l&15)<<2|g>>6];g=b[g&63];c[h++]=e+k+l+g}e=0;g=d;switch(a.length-f){case 2:e=a[f+1],g=b[(e&15)<<2]||d;case 1:a=a[f],c[h]=b[a>>2]+b[(a&3)<<4|e>>4]+g+d}a=c.join("")}return a}}return a};function Ua(a,b,c,d,h,f){if(null!=a){if(Array.isArray(a))a=h&&0==a.length&&I(a)&1?void 0:f&&I(a)&2?a:Va(a,b,c,void 0!==d,h,f);else if(J(a)){var e={},g;for(g in a)Object.prototype.hasOwnProperty.call(a,g)&&(e[g]=Ua(a[g],b,c,d,h,f));a=e}else a=b(a,d);return a}}function Va(a,b,c,d,h,f){var e=d||c?I(a):0;d=d?!!(e&32):void 0;a=Array.prototype.slice.call(a);for(var g=0;g<a.length;g++)a[g]=Ua(a[g],b,c,d,h,f);c&&c(e,a);return a}function Wa(a){return a.J===Ma?a.toJSON():Ta(a)};function K(a,b){a=a.o;a:{var c=Ia(a);if(-1===b)b=null;else{if(b>=La(c)){if(c&256){b=a[a.length-1][b];break a}}else if(b+=(c>>9&1)-1,b<a.length){b=a[b];break a}b=void 0}}return b}function L(a,b){return null!=a?a:b};function Xa(a,b,c){this.o=Ra(a,b,c)} 
Xa.prototype.toJSON=function(){var a=Va(this.o,Wa,void 0,void 0,!1,!1);var b=this.constructor.K;if(b){var c=Ia(this.o),d=La(c);c=(c>>9&1)-1;for(var h,f,e=0;e<b.length;e++)if(f=b[e],f<d)f+=c,null==a[f]&&(a[f]=Ka());else{if(!h){var g=void 0;a.length&&J(g=a[a.length-1])?h=g:a.push(h={})}null==h[f]&&(h[f]=Ka())}}if(b=a.length){var k;if(J(d=a[b-1])){b:{var l=d;h={};c=!1;for(var n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e=l[n],Array.isArray(e)&&e!=e&&(c=!0),null!=e?h[n]=e:c=!0);if(c){for(var r in h){l= 
h;break b}l=null}}l!=d&&(k=!0);b--}for(;0<b;b--){d=a[b-1];if(null!=d)break;var p=!0}if(k||p)a=Array.prototype.slice.call(a,0,b),l&&a.push(l)}return a};Xa.prototype.J=Ma;function Ya(a,b){var c=Za;Za=void 0;if(!b(a))throw b=c?c()+"\n":"",Error(b+String(a));}function $a(a){return null!==a&&void 0!==a}var Za=void 0;function ab(a,b){a.addEventListener&&a.addEventListener("load",b,!1)};var M;function N(a){this.g=a}N.prototype.toString=function(){return this.g+""};var bb={};function cb(a){if(void 0===M){var b=null;var c=w.trustedTypes;if(c&&c.createPolicy){try{b=c.createPolicy("goog#html",{createHTML:ra,createScript:ra,createScriptURL:ra})}catch(d){w.console&&w.console.error(d.message)}M=b}else M=b}a=(b=M)?b.createScriptURL(a):a;return new N(a,bb)};var db=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");/* 
 
 SPDX-License-Identifier: Apache-2.0 
*/ 
var eb={};function fb(){}function O(a){this.g=a}pa(O,fb);O.prototype.toString=function(){return this.g};function gb(a,b,c){var d=[new O(hb[0].toLowerCase(),eb)];if(0===d.length)throw Error("");d=d.map(function(f){if(f instanceof O)f=f.g;else throw Error("");return f});var h=b.toLowerCase();if(d.every(function(f){return 0!==h.indexOf(f)}))throw Error('Attribute "'+b+'" does not match any of the allowed prefixes.');a.setAttribute(b,c)};function ib(a,b){if(a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(a[c],c,a)}var P=[];function jb(){var a=P;P=[];a=ia(a);for(var b=a.next();!b.done;b=a.next()){b=b.value;try{b()}catch(c){}}}function kb(a){var b=document;"complete"===b.readyState||"interactive"===b.readyState?(P.push(a),1==P.length&&(u.Promise?u.Promise.resolve().then(jb):window.setImmediate?setImmediate(jb):setTimeout(jb,0))):b.addEventListener("DOMContentLoaded",a)} 
function lb(a,b){b=void 0===b?document:b;return b.createElement(String(a).toLowerCase())};function mb(a){w.google_image_requests||(w.google_image_requests=[]);var b=lb("IMG",w.document);b.src=a;w.google_image_requests.push(b)};var nb=window;function ob(a){var b=qa.apply(1,arguments);if(0===b.length)return cb(a[0]);for(var c=a[0],d=0;d<b.length;d++)c+=encodeURIComponent(b[d])+a[d+1];return cb(c)};function pb(){var a=void 0===a?nb:a;if(!a)return!1;try{return!(!a.navigator.standalone&&!a.top.navigator.standalone)}catch(b){return!1}};function ub(a,b){var c=void 0===c?{}:c;this.error=a;this.context=b.context;this.msg=b.message||"";this.id=b.id||"jserror";this.meta=c};var vb=RegExp("^https?://(\\w|-)+\\.cdn\\.ampproject\\.(net|org)(\\?|/|$)");function wb(a,b){this.g=a;this.h=b}function xb(a,b){this.url=a;this.A=!!b;this.depth=null};function yb(){this.i="&";this.h={};this.j=0;this.g=[]}function Q(a,b){var c={};c[a]=b;return[c]}function zb(a,b,c,d,h){var f=[];ib(a,function(e,g){(e=Ab(e,b,c,d,h))&&f.push(g+"="+e)});return f.join(b)} 
function Ab(a,b,c,d,h){if(null==a)return"";b=b||"&";c=c||",$";"string"==typeof c&&(c=c.split(""));if(a instanceof Array){if(d=d||0,d<c.length){for(var f=[],e=0;e<a.length;e++)f.push(Ab(a[e],b,c,d+1,h));return f.join(c[d])}}else if("object"==typeof a)return h=h||0,2>h?encodeURIComponent(zb(a,b,c,d,h+1)):"...";return encodeURIComponent(String(a))} 
function Bb(a,b){var c="https://pagead2.googlesyndication.com"+b,d=Cb(a)-b.length;if(0>d)return"";a.g.sort(function(n,r){return n-r});b=null;for(var h="",f=0;f<a.g.length;f++)for(var e=a.g[f],g=a.h[e],k=0;k<g.length;k++){if(!d){b=null==b?e:b;break}var l=zb(g[k],a.i,",$");if(l){l=h+l;if(d>=l.length){d-=l.length;c+=l;h=a.i;break}b=null==b?e:b}}a="";null!=b&&(a=h+"trn="+b);return c+a}function Cb(a){var b=1,c;for(c in a.h)b=c.length>b?c.length:b;return 3997-b-a.i.length-1};function Db(){this.g=Math.random()}function Eb(a,b){0<=b&&1>=b&&(a.g=b)}function Fb(a,b,c,d,h){if(((void 0===d?0:d)?a.g:Math.random())<(h||.01))try{if(c instanceof yb)var f=c;else f=new yb,ib(c,function(g,k){var l=f,n=l.j++;g=Q(k,g);l.g.push(n);l.h[n]=g});var e=Bb(f,"/pagead/gen_204?id="+b+"&");e&&mb(e)}catch(g){}};var R=null;function Gb(){var a=void 0===a?w:a;return(a=a.performance)&&a.now&&a.timing?Math.floor(a.now()+a.timing.navigationStart):Date.now()}function Hb(){var a=void 0===a?w:a;return(a=a.performance)&&a.now?a.now():null};function Ib(a,b){var c=Hb()||Gb();this.label=a;this.type=b;this.value=c;this.duration=0;this.taskId=this.slotId=void 0;this.uniqueId=Math.random()};var S=w.performance,Jb=!!(S&&S.mark&&S.measure&&S.clearMarks),T=function(a){var b=!1,c;return function(){b||(c=a(),b=!0);return c}}(function(){var a;if(a=Jb){var b;if(null===R){R="";try{a="";try{a=w.top.location.hash}catch(c){a=w.location.hash}a&&(R=(b=a.match(/\bdeid=([\d,]+)/))?b[1]:"")}catch(c){}}b=R;a=!!b.indexOf&&0<=b.indexOf("1337")}return a}); 
function U(a){this.h=[];this.i=a||w;var b=null;a&&(a.google_js_reporting_queue=a.google_js_reporting_queue||[],this.h=a.google_js_reporting_queue,b=a.google_measure_js_timing);this.g=T()||(null!=b?b:1>Math.random())}function V(a){a.g=!1;if(a.h!=a.i.google_js_reporting_queue){if(T())for(var b=a.h,c=Kb,d=b.length,h="string"===typeof b?b.split(""):b,f=0;f<d;f++)f in h&&c.call(void 0,h[f],f,b);a.h.length=0}} 
function Kb(a){a&&S&&T()&&(S.clearMarks("goog_"+a.label+"_"+a.uniqueId+"_start"),S.clearMarks("goog_"+a.label+"_"+a.uniqueId+"_end"))}U.prototype.start=function(a,b){if(!this.g)return null;a=new Ib(a,b);b="goog_"+a.label+"_"+a.uniqueId+"_start";S&&T()&&S.mark(b);return a};U.prototype.end=function(a){if(this.g&&"number"===typeof a.value){a.duration=(Hb()||Gb())-a.value;var b="goog_"+a.label+"_"+a.uniqueId+"_end";S&&T()&&S.mark(b);!this.g||2048<this.h.length||this.h.push(a)}};function Lb(a,b,c){this.j=a;this.l=b;this.i=null;this.s=this.u;this.g=void 0===c?null:c;this.h=!1}function Mb(a,b){a.i=b} 
Lb.prototype.u=function(a,b,c,d,h){h=h||"jserror";try{var f=new yb;f.g.push(1);f.h[1]=Q("context",a);b.error&&b.meta&&b.id||(b=new ub(b,{message:Nb(b)}));if(b.msg){var e=b.msg.substring(0,512);f.g.push(2);f.h[2]=Q("msg",e)}var g=b.meta||{};if(this.i)try{this.i(g)}catch(E){}if(d)try{d(g)}catch(E){}b=[g];f.g.push(3);f.h[3]=b;d=w;b=[];e=null;do{var k=d;try{var l;if(l=!!k&&null!=k.location.href)b:{try{Ca(k.foo);l=!0;break b}catch(E){}l=!1}var n=l}catch(E){n=!1}if(n){var r=k.location.href;e=k.document&& 
k.document.referrer||null}else r=e,e=null;b.push(new xb(r||""));try{d=k.parent}catch(E){d=null}}while(d&&k!=d);r=0;for(var p=b.length-1;r<=p;++r)b[r].depth=p-r;k=w;if(k.location&&k.location.ancestorOrigins&&k.location.ancestorOrigins.length==b.length-1)for(p=1;p<b.length;++p){var q=b[p];q.url||(q.url=k.location.ancestorOrigins[p-1]||"",q.A=!0)}var t=new xb(w.location.href,!1);k=null;var A=b.length-1;for(q=A;0<=q;--q){var z=b[q];!k&&vb.test(z.url)&&(k=z);if(z.url&&!z.A){t=z;break}}z=null;var dc=b.length&& 
b[A].url;0!=t.depth&&dc&&(z=b[A]);var B=new wb(t,z);if(B.h){var ec=B.h.url||"";f.g.push(4);f.h[4]=Q("top",ec)}var xa={url:B.g.url||""};if(B.g.url){var ya=B.g.url.match(db),qb=ya[1],rb=ya[3],sb=ya[4];t="";qb&&(t+=qb+":");rb&&(t+="//",t+=rb,sb&&(t+=":"+sb));var tb=t}else tb="";xa=[xa,{url:tb}];f.g.push(5);f.h[5]=xa;Fb(this.j,h,f,this.h,c)}catch(E){try{Fb(this.j,h,{context:"ecmserr",rctx:a,msg:Nb(E),url:B&&B.g.url},this.h,c)}catch(wc){}}return this.l}; 
function Nb(a){var b=a.toString();a.name&&-1==b.indexOf(a.name)&&(b+=": "+a.name);a.message&&-1==b.indexOf(a.message)&&(b+=": "+a.message);if(a.stack){a=a.stack;var c=b;try{-1==a.indexOf(c)&&(a=c+"\n"+a);for(var d;a!=d;)d=a,a=a.replace(RegExp("((https?:/..*/)[^/:]*:\\d+(?:.|\n)*)\\2"),"$1");b=a.replace(RegExp("\n *","g"),"\n")}catch(h){b=c}}return b};function Ob(a){return"string"===typeof a}function Pb(a){return void 0===a};function W(){};var Qb,Rb,Sb=new U(window);(function(a){Qb=null!=a?a:new Db;"number"!==typeof window.google_srt&&(window.google_srt=Math.random());Eb(Qb,window.google_srt);Rb=new Lb(Qb,!0,Sb);Mb(Rb,function(){});Rb.h=!0;"complete"==window.document.readyState?window.google_measure_js_timing||V(Sb):Sb.g&&ab(window,function(){window.google_measure_js_timing||V(Sb)})})();var Tb=(new Date).getTime();var Ub,X,Vb=new U(w);(function(a,b){b=void 0===b?!0:b;Ub=a||new Db;"number"!==typeof w.google_srt&&(w.google_srt=Math.random());Eb(Ub,w.google_srt);X=new Lb(Ub,b,Vb);X.h=!0;"complete"==w.document.readyState?w.google_measure_js_timing||V(Vb):Vb.g&&ab(w,function(){w.google_measure_js_timing||V(Vb)})})();var Wb=void 0;function Xb(a){Ya(Wb,Pb);Wb=a};function Yb(a){this.o=Ra(a)}pa(Yb,Xa);Yb.K=[19];var Zb="google_ad_block google_ad_channel google_ad_client google_ad_format google_ad_height google_ad_host google_ad_host_channel google_ad_host_tier_id google_ad_layout google_ad_layout_key google_ad_output google_ad_region google_ad_section google_ad_slot google_ad_type google_ad_unit_key google_ad_dom_fingerprint google_ad_semantic_area google_placement_id google_daaos_ts google_erank google_ad_width google_adtest google_allow_expandable_ads google_alternate_ad_url google_alternate_color google_analytics_domain_name google_analytics_uacct google_apsail google_captcha_token google_city google_color_bg google_color_border google_color_line google_color_link google_color_text google_color_url google_container_id google_content_recommendation_ad_positions google_content_recommendation_columns_num google_content_recommendation_rows_num google_content_recommendation_ui_type google_content_recommendation_use_square_imgs google_contents google_country google_cpm google_ctr_threshold google_cust_age google_cust_ch google_cust_criteria google_cust_gender google_cust_id google_cust_interests google_cust_job google_cust_l google_cust_lh google_cust_u_url google_disable_video_autoplay google_enable_content_recommendations google_enable_ose google_encoding google_font_face google_font_size google_frame_id google_full_width_responsive_allowed efwr google_full_width_responsive gfwroh gfwrow gfwroml gfwromr gfwroz gfwrnh gfwrnwer gfwrnher google_gl google_hints google_image_size google_kw google_kw_type google_language google_loeid google_max_num_ads google_max_radlink_len google_max_responsive_height google_ml_rank google_mtl google_native_ad_template google_native_settings_key google_num_radlinks google_num_radlinks_per_unit google_override_format google_page_url google_pgb_reactive google_pucrd google_referrer_url google_region google_resizing_allowed google_resizing_height google_resizing_width rpe google_responsive_formats google_responsive_auto_format armr google_rl_dest_url google_rl_filtering google_rl_mode google_rt google_safe google_safe_for_responsive_override google_video_play_muted google_source_type google_tag_for_child_directed_treatment google_tag_for_under_age_of_consent google_tag_origin google_tag_partner google_targeting google_tfs google_video_doc_id google_video_product_type google_webgl_support google_package google_debug_params dash google_restrict_data_processing google_ad_public_floor google_ad_private_floor google_traffic_source easpi scsals asptt asro asacml srtr easppi asiscm asla asaa sedf sefa srldp google_shadow_mode".split(" "), 
Y={},$b=(Y.google_analytics_domain_name=!0,Y.google_analytics_uacct=!0,Y.google_pause_ad_requests=!0,Y.google_user_agent_client_hint=!0,Y);function ac(a){return(a=a.innerText||a.innerHTML)&&(a=a.replace(/^\s+/,"").split(/\r?\n/,1)[0].match(/^\x3c!--+(.*?)(?:--+>)?\s*$/))&&RegExp("google_ad_client").test(a[1])?a[1]:null} 
function bc(a){if(a=a.innerText||a.innerHTML)if(a=a.replace(/^\s+|\s+$/g,"").replace(/\s*(\r?\n)+\s*/g,";"),(a=a.match(/^\x3c!--+(.*?)(?:--+>)?$/)||a.match(/^\/*\s*<!\[CDATA\[(.*?)(?:\/*\s*\]\]>)?$/i))&&RegExp("google_ad_client").test(a[1]))return a[1];return null} 
function cc(a){try{a:{for(var b=a.document.getElementsByTagName("script"),c=a.navigator&&a.navigator.userAgent||"",d=RegExp("appbankapppuzdradb|daumapps|fban|fbios|fbav|fb_iab|gsa/|messengerforios|naver|niftyappmobile|nonavigation|pinterest|twitter|ucbrowser|yjnewsapp|youtube","i").test(c)||/i(phone|pad|pod)/i.test(c)&&/applewebkit/i.test(c)&&!/version|safari/i.test(c)&&!pb()?ac:bc,h=b.length-1;0<=h;h--){var f=b[h];if(!f.google_parsed_script){f.google_parsed_script=!0;var e=d(f);if(e){var g=e;break a}}}g= 
null}}catch(l){return!1}if(!g)return!1;try{b=/(google_\w+) *= *(['"]?[\w.-]+['"]?) *(?:;|$)/gm;c={};for(var k;k=b.exec(g);)c[k[1]]=fc(k[2]);gc(c,a)}catch(l){return!1}return!!a.google_ad_client}function hc(a){var b={};null==a.google_ad_client&&cc(a)&&(b.google_loader_features_used=2048);gc(a,b);return b}function ic(a){for(var b=0,c=Zb.length;b<c;b++){var d=Zb[b];$b[d]||(a[d]=null)}} 
function fc(a){switch(a){case "true":return!0;case "false":return!1;case "null":return null;case "undefined":break;default:try{var b=a.match(/^(?:'(.*)'|"(.*)")$/);if(b)return b[1]||b[2]||"";if(/^[-+]?\d*(\.\d+)?$/.test(a)){var c=parseFloat(a);return c===c?c:void 0}}catch(d){}}}function gc(a,b){for(var c=0;c<Zb.length;c++){var d=Zb[c];null==b[d]&&null!=a[d]&&(b[d]=a[d])}};function jc(){var a=window;if("on"!==w.google_adtest&&"on"!==w.google_adbreak_test&&!ea(a.location.host,"endsWith").call(a.location.host,"h5games.usercontent.goog"))return[];var b,c;return(null==(b=a.document.querySelector('meta[name="h5-games-eids"]'))?void 0:null==(c=b.getAttribute("content"))?void 0:c.split(",").map(function(d){return Math.floor(Number(d))}).filter(function(d){return!isNaN(d)&&0<d}))||[]};function kc(a){Mb(X,function(b){b.shv=String(a);b.mjsv="m202308070102";var c="v";W.v&&W.hasOwnProperty(c)||(c=new W,W.v=c);c=jc();b.eid=[].concat(c).join(",")})};Da||Aa();var lc=ha(["https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]); 
function mc(a,b,c){a.dataset.adsbygoogleStatus="reserved";a.className+=" adsbygoogle-noablate";if(!c.adsbygoogle){c.adsbygoogle=[];var d=c.document,h=ob(lc),f=lb("SCRIPT",d);f.src=h instanceof N&&h.constructor===N?h.g:"type_error:TrustedResourceUrl";var e,g;(e=(h=null==(g=(e=(f.ownerDocument&&f.ownerDocument.defaultView||window).document).querySelector)?void 0:g.call(e,"script[nonce]"))?h.nonce||h.getAttribute("nonce")||"":"")&&f.setAttribute("nonce",e);(d=d.getElementsByTagName("script")[0])&&d.parentNode&& 
d.parentNode.insertBefore(f,d)}c.adsbygoogle.push({element:a,params:b})};var nc="undefined"===typeof sttc?void 0:sttc;function oc(){var a=X;try{return Ya(nc,Ob),new Yb(JSON.parse(nc))}catch(b){a.u(838,b instanceof Error?b:Error(String(b)),void 0,function(c){c.jspb=String(nc)})}return new Yb};var hb=ha(["data-"]); 
function pc(a,b){var c=document.createElement("ins");c.className="adsbygoogle";var d=Number(b.google_ad_width)||0,h=Number(b.google_ad_height)||0;c.style.display="inline-block";c.style.width=d+"px";c.style.height=h+"px";ib(b,function(f,e){gb(c,e.replace("google","data").replace(/_/g,"-"),f)});b=document.currentScript;b||(a=a.document.querySelectorAll('script[src*="show_ads.js"]'),b=a[a.length-1]);Ya(b,$a);if(b.parentElement===document.head)return new u.Promise(function(f){kb(function(){document.body.prepend?document.body.prepend(c): 
document.body.appendChild(c);f(c)})});b.after?b.after(c):b.parentElement.insertBefore(c,b.nextSibling);return c}function qc(a,b){a=[L(Pa(K(a,15)),""),L(Pa(K(a,23)),"")].filter(function(c){return""!==c}).join(",");""!==a&&(b.saaei=a)} 
function rc(){var a=window,b=oc();kc(L(Pa(K(b,2)),""));Xb(L(Oa(K(b,6)),!1));var c=hc(a);ic(a);c=pc(a,c);var d={},h=(d.google_loader_used="sd",d.google_start_time=Tb,d);qc(b,h);"then"in c?c.then(function(f){mc(f,h,a)}):mc(c,h,a);console.warn("You are using deprecated show_ads.js script to display AdSense ads. To improve performance of your ads switch to the modern adsbygoogle.js script. See instructions on https://support.google.com/adsense/answer/9190028.")};var Z=X,sc;try{Z.g&&Z.g.g?(sc=Z.g.start((1113).toString(),3),rc(),Z.g.end(sc)):rc()}catch(a){var tc=Z.l;try{Kb(sc),tc=Z.s(1113,new ub(a,{message:Nb(a)}),void 0,void 0)}catch(b){Z.u(217,b)}if(tc){var uc,vc;null==(uc=window.console)||null==(vc=uc.error)||vc.call(uc,a)}else throw a;}; 
}).call(this,"[2012,\"r20230809\",\"r20190131\",null,null,null,null,\".google.co.in\",null,null,null,null,null,null,null,null,null,-1,[44759876,44759927,44759842],null,null,null,\"44796313\"]");
