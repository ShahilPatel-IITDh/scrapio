/*! jQuery v3.6.0 | (c) OpenJS Foundation and other contributors | jquery.org/license */
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(C,e){"use strict";var t=[],r=Object.getPrototypeOf,s=t.slice,g=t.flat?function(e){return t.flat.call(e)}:function(e){return t.concat.apply([],e)},u=t.push,i=t.indexOf,n={},o=n.toString,v=n.hasOwnProperty,a=v.toString,l=a.call(Object),y={},m=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType&&"function"!=typeof e.item},x=function(e){return null!=e&&e===e.window},E=C.document,c={type:!0,src:!0,nonce:!0,noModule:!0};function b(e,t,n){var r,i,o=(n=n||E).createElement("script");if(o.text=e,t)for(r in c)(i=t[r]||t.getAttribute&&t.getAttribute(r))&&o.setAttribute(r,i);n.head.appendChild(o).parentNode.removeChild(o)}function w(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?n[o.call(e)]||"object":typeof e}var f="3.6.0",S=function(e,t){return new S.fn.init(e,t)};function p(e){var t=!!e&&"length"in e&&e.length,n=w(e);return!m(e)&&!x(e)&&("array"===n||0===t||"number"==typeof t&&0<t&&t-1 in e)}S.fn=S.prototype={jquery:f,constructor:S,length:0,toArray:function(){return s.call(this)},get:function(e){return null==e?s.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=S.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return S.each(this,e)},map:function(n){return this.pushStack(S.map(this,function(e,t){return n.call(e,t,e)}))},slice:function(){return this.pushStack(s.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},even:function(){return this.pushStack(S.grep(this,function(e,t){return(t+1)%2}))},odd:function(){return this.pushStack(S.grep(this,function(e,t){return t%2}))},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(0<=n&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:u,sort:t.sort,splice:t.splice},S.extend=S.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||m(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)r=e[t],"__proto__"!==t&&a!==r&&(l&&r&&(S.isPlainObject(r)||(i=Array.isArray(r)))?(n=a[t],o=i&&!Array.isArray(n)?[]:i||S.isPlainObject(n)?n:{},i=!1,a[t]=S.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},S.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==o.call(e))&&(!(t=r(e))||"function"==typeof(n=v.call(t,"constructor")&&t.constructor)&&a.call(n)===l)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e,t,n){b(e,{nonce:t&&t.nonce},n)},each:function(e,t){var n,r=0;if(p(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},makeArray:function(e,t){var n=t||[];return null!=e&&(p(Object(e))?S.merge(n,"string"==typeof e?[e]:e):u.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:i.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r=[],i=0,o=e.length,a=!n;i<o;i++)!t(e[i],i)!==a&&r.push(e[i]);return r},map:function(e,t,n){var r,i,o=0,a=[];if(p(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&a.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&a.push(i);return g(a)},guid:1,support:y}),"function"==typeof Symbol&&(S.fn[Symbol.iterator]=t[Symbol.iterator]),S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){n["[object "+t+"]"]=t.toLowerCase()});var d=function(n){var e,d,b,o,i,h,f,g,w,u,l,T,C,a,E,v,s,c,y,S="sizzle"+1*new Date,p=n.document,k=0,r=0,m=ue(),x=ue(),A=ue(),N=ue(),j=function(e,t){return e===t&&(l=!0),0},D={}.hasOwnProperty,t=[],q=t.pop,L=t.push,H=t.push,O=t.slice,P=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",I="(?:\\\\[\\da-fA-F]{1,6}"+M+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",W="\\["+M+"*("+I+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+I+"))|)"+M+"*\\]",F=":("+I+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+W+")*)|.*)\\)|)",B=new RegExp(M+"+","g"),$=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=new RegExp("^"+M+"*,"+M+"*"),z=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp(M+"|>"),X=new RegExp(F),V=new RegExp("^"+I+"$"),G={ID:new RegExp("^#("+I+")"),CLASS:new RegExp("^\\.("+I+")"),TAG:new RegExp("^("+I+"|[*])"),ATTR:new RegExp("^"+W),PSEUDO:new RegExp("^"+F),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+R+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/HTML$/i,Q=/^(?:input|select|textarea|button)$/i,J=/^h\d$/i,K=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ee=/[+~]/,te=new RegExp("\\\\[\\da-fA-F]{1,6}"+M+"?|\\\\([^\\r\\n\\f])","g"),ne=function(e,t){var n="0x"+e.slice(1)-65536;return t||(n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320))},re=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ie=function(e,t){return t?"\0"===e?"\ufffd":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},oe=function(){T()},ae=be(function(e){return!0===e.disabled&&"fieldset"===e.nodeName.toLowerCase()},{dir:"parentNode",next:"legend"});try{H.apply(t=O.call(p.childNodes),p.childNodes),t[p.childNodes.length].nodeType}catch(e){H={apply:t.length?function(e,t){L.apply(e,O.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function se(t,e,n,r){var i,o,a,s,u,l,c,f=e&&e.ownerDocument,p=e?e.nodeType:9;if(n=n||[],"string"!=typeof t||!t||1!==p&&9!==p&&11!==p)return n;if(!r&&(T(e),e=e||C,E)){if(11!==p&&(u=Z.exec(t)))if(i=u[1]){if(9===p){if(!(a=e.getElementById(i)))return n;if(a.id===i)return n.push(a),n}else if(f&&(a=f.getElementById(i))&&y(e,a)&&a.id===i)return n.push(a),n}else{if(u[2])return H.apply(n,e.getElementsByTagName(t)),n;if((i=u[3])&&d.getElementsByClassName&&e.getElementsByClassName)return H.apply(n,e.getElementsByClassName(i)),n}if(d.qsa&&!N[t+" "]&&(!v||!v.test(t))&&(1!==p||"object"!==e.nodeName.toLowerCase())){if(c=t,f=e,1===p&&(U.test(t)||z.test(t))){(f=ee.test(t)&&ye(e.parentNode)||e)===e&&d.scope||((s=e.getAttribute("id"))?s=s.replace(re,ie):e.setAttribute("id",s=S)),o=(l=h(t)).length;while(o--)l[o]=(s?"#"+s:":scope")+" "+xe(l[o]);c=l.join(",")}try{return H.apply(n,f.querySelectorAll(c)),n}catch(e){N(t,!0)}finally{s===S&&e.removeAttribute("id")}}}return g(t.replace($,"$1"),e,n,r)}function ue(){var r=[];return function e(t,n){return r.push(t+" ")>b.cacheLength&&delete e[r.shift()],e[t+" "]=n}}function le(e){return e[S]=!0,e}function ce(e){var t=C.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function fe(e,t){var n=e.split("|"),r=n.length;while(r--)b.attrHandle[n[r]]=t}function pe(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function de(t){return function(e){return"input"===e.nodeName.toLowerCase()&&e.type===t}}function he(n){return function(e){var t=e.nodeName.toLowerCase();return("input"===t||"button"===t)&&e.type===n}}function ge(t){return function(e){return"form"in e?e.parentNode&&!1===e.disabled?"label"in e?"label"in e.parentNode?e.parentNode.disabled===t:e.disabled===t:e.isDisabled===t||e.isDisabled!==!t&&ae(e)===t:e.disabled===t:"label"in e&&e.disabled===t}}function ve(a){return le(function(o){return o=+o,le(function(e,t){var n,r=a([],e.length,o),i=r.length;while(i--)e[n=r[i]]&&(e[n]=!(t[n]=e[n]))})})}function ye(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}for(e in d=se.support={},i=se.isXML=function(e){var t=e&&e.namespaceURI,n=e&&(e.ownerDocument||e).documentElement;return!Y.test(t||n&&n.nodeName||"HTML")},T=se.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:p;return r!=C&&9===r.nodeType&&r.documentElement&&(a=(C=r).documentElement,E=!i(C),p!=C&&(n=C.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",oe,!1):n.attachEvent&&n.attachEvent("onunload",oe)),d.scope=ce(function(e){return a.appendChild(e).appendChild(C.createElement("div")),"undefined"!=typeof e.querySelectorAll&&!e.querySelectorAll(":scope fieldset div").length}),d.attributes=ce(function(e){return e.className="i",!e.getAttribute("className")}),d.getElementsByTagName=ce(function(e){return e.appendChild(C.createComment("")),!e.getElementsByTagName("*").length}),d.getElementsByClassName=K.test(C.getElementsByClassName),d.getById=ce(function(e){return a.appendChild(e).id=S,!C.getElementsByName||!C.getElementsByName(S).length}),d.getById?(b.filter.ID=function(e){var t=e.replace(te,ne);return function(e){return e.getAttribute("id")===t}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n=t.getElementById(e);return n?[n]:[]}}):(b.filter.ID=function(e){var n=e.replace(te,ne);return function(e){var t="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return t&&t.value===n}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),b.find.TAG=d.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):d.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},b.find.CLASS=d.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&E)return t.getElementsByClassName(e)},s=[],v=[],(d.qsa=K.test(C.querySelectorAll))&&(ce(function(e){var t;a.appendChild(e).innerHTML="<a id='"+S+"'></a><select id='"+S+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&v.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||v.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll("[id~="+S+"-]").length||v.push("~="),(t=C.createElement("input")).setAttribute("name",""),e.appendChild(t),e.querySelectorAll("[name='']").length||v.push("\\["+M+"*name"+M+"*="+M+"*(?:''|\"\")"),e.querySelectorAll(":checked").length||v.push(":checked"),e.querySelectorAll("a#"+S+"+*").length||v.push(".#.+[+~]"),e.querySelectorAll("\\\f"),v.push("[\\r\\n\\f]")}),ce(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=C.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&v.push("name"+M+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&v.push(":enabled",":disabled"),a.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&v.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),v.push(",.*:")})),(d.matchesSelector=K.test(c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.msMatchesSelector))&&ce(function(e){d.disconnectedMatch=c.call(e,"*"),c.call(e,"[s!='']:x"),s.push("!=",F)}),v=v.length&&new RegExp(v.join("|")),s=s.length&&new RegExp(s.join("|")),t=K.test(a.compareDocumentPosition),y=t||K.test(a.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},j=t?function(e,t){if(e===t)return l=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n||(1&(n=(e.ownerDocument||e)==(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!d.sortDetached&&t.compareDocumentPosition(e)===n?e==C||e.ownerDocument==p&&y(p,e)?-1:t==C||t.ownerDocument==p&&y(p,t)?1:u?P(u,e)-P(u,t):0:4&n?-1:1)}:function(e,t){if(e===t)return l=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,a=[e],s=[t];if(!i||!o)return e==C?-1:t==C?1:i?-1:o?1:u?P(u,e)-P(u,t):0;if(i===o)return pe(e,t);n=e;while(n=n.parentNode)a.unshift(n);n=t;while(n=n.parentNode)s.unshift(n);while(a[r]===s[r])r++;return r?pe(a[r],s[r]):a[r]==p?-1:s[r]==p?1:0}),C},se.matches=function(e,t){return se(e,null,null,t)},se.matchesSelector=function(e,t){if(T(e),d.matchesSelector&&E&&!N[t+" "]&&(!s||!s.test(t))&&(!v||!v.test(t)))try{var n=c.call(e,t);if(n||d.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(e){N(t,!0)}return 0<se(t,C,null,[e]).length},se.contains=function(e,t){return(e.ownerDocument||e)!=C&&T(e),y(e,t)},se.attr=function(e,t){(e.ownerDocument||e)!=C&&T(e);var n=b.attrHandle[t.toLowerCase()],r=n&&D.call(b.attrHandle,t.toLowerCase())?n(e,t,!E):void 0;return void 0!==r?r:d.attributes||!E?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},se.escape=function(e){return(e+"").replace(re,ie)},se.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},se.uniqueSort=function(e){var t,n=[],r=0,i=0;if(l=!d.detectDuplicates,u=!d.sortStable&&e.slice(0),e.sort(j),l){while(t=e[i++])t===e[i]&&(r=n.push(i));while(r--)e.splice(n[r],1)}return u=null,e},o=se.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else while(t=e[r++])n+=o(t);return n},(b=se.selectors={cacheLength:50,createPseudo:le,match:G,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(te,ne),e[3]=(e[3]||e[4]||e[5]||"").replace(te,ne),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||se.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&se.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return G.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&X.test(n)&&(t=h(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(te,ne).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=m[e+" "];return t||(t=new RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&m(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(n,r,i){return function(e){var t=se.attr(e,n);return null==t?"!="===r:!r||(t+="","="===r?t===i:"!="===r?t!==i:"^="===r?i&&0===t.indexOf(i):"*="===r?i&&-1<t.indexOf(i):"$="===r?i&&t.slice(-i.length)===i:"~="===r?-1<(" "+t.replace(B," ")+" ").indexOf(i):"|="===r&&(t===i||t.slice(0,i.length+1)===i+"-"))}},CHILD:function(h,e,t,g,v){var y="nth"!==h.slice(0,3),m="last"!==h.slice(-4),x="of-type"===e;return 1===g&&0===v?function(e){return!!e.parentNode}:function(e,t,n){var r,i,o,a,s,u,l=y!==m?"nextSibling":"previousSibling",c=e.parentNode,f=x&&e.nodeName.toLowerCase(),p=!n&&!x,d=!1;if(c){if(y){while(l){a=e;while(a=a[l])if(x?a.nodeName.toLowerCase()===f:1===a.nodeType)return!1;u=l="only"===h&&!u&&"nextSibling"}return!0}if(u=[m?c.firstChild:c.lastChild],m&&p){d=(s=(r=(i=(o=(a=c)[S]||(a[S]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===k&&r[1])&&r[2],a=s&&c.childNodes[s];while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if(1===a.nodeType&&++d&&a===e){i[h]=[k,s,d];break}}else if(p&&(d=s=(r=(i=(o=(a=e)[S]||(a[S]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===k&&r[1]),!1===d)while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if((x?a.nodeName.toLowerCase()===f:1===a.nodeType)&&++d&&(p&&((i=(o=a[S]||(a[S]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]=[k,d]),a===e))break;return(d-=v)===g||d%g==0&&0<=d/g}}},PSEUDO:function(e,o){var t,a=b.pseudos[e]||b.setFilters[e.toLowerCase()]||se.error("unsupported pseudo: "+e);return a[S]?a(o):1<a.length?(t=[e,e,"",o],b.setFilters.hasOwnProperty(e.toLowerCase())?le(function(e,t){var n,r=a(e,o),i=r.length;while(i--)e[n=P(e,r[i])]=!(t[n]=r[i])}):function(e){return a(e,0,t)}):a}},pseudos:{not:le(function(e){var r=[],i=[],s=f(e.replace($,"$1"));return s[S]?le(function(e,t,n,r){var i,o=s(e,null,r,[]),a=e.length;while(a--)(i=o[a])&&(e[a]=!(t[a]=i))}):function(e,t,n){return r[0]=e,s(r,null,n,i),r[0]=null,!i.pop()}}),has:le(function(t){return function(e){return 0<se(t,e).length}}),contains:le(function(t){return t=t.replace(te,ne),function(e){return-1<(e.textContent||o(e)).indexOf(t)}}),lang:le(function(n){return V.test(n||"")||se.error("unsupported lang: "+n),n=n.replace(te,ne).toLowerCase(),function(e){var t;do{if(t=E?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return(t=t.toLowerCase())===n||0===t.indexOf(n+"-")}while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var t=n.location&&n.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===a},focus:function(e){return e===C.activeElement&&(!C.hasFocus||C.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:ge(!1),disabled:ge(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!b.pseudos.empty(e)},header:function(e){return J.test(e.nodeName)},input:function(e){return Q.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:ve(function(){return[0]}),last:ve(function(e,t){return[t-1]}),eq:ve(function(e,t,n){return[n<0?n+t:n]}),even:ve(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:ve(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:ve(function(e,t,n){for(var r=n<0?n+t:t<n?t:n;0<=--r;)e.push(r);return e}),gt:ve(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=b.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})b.pseudos[e]=de(e);for(e in{submit:!0,reset:!0})b.pseudos[e]=he(e);function me(){}function xe(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function be(s,e,t){var u=e.dir,l=e.next,c=l||u,f=t&&"parentNode"===c,p=r++;return e.first?function(e,t,n){while(e=e[u])if(1===e.nodeType||f)return s(e,t,n);return!1}:function(e,t,n){var r,i,o,a=[k,p];if(n){while(e=e[u])if((1===e.nodeType||f)&&s(e,t,n))return!0}else while(e=e[u])if(1===e.nodeType||f)if(i=(o=e[S]||(e[S]={}))[e.uniqueID]||(o[e.uniqueID]={}),l&&l===e.nodeName.toLowerCase())e=e[u]||e;else{if((r=i[c])&&r[0]===k&&r[1]===p)return a[2]=r[2];if((i[c]=a)[2]=s(e,t,n))return!0}return!1}}function we(i){return 1<i.length?function(e,t,n){var r=i.length;while(r--)if(!i[r](e,t,n))return!1;return!0}:i[0]}function Te(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function Ce(d,h,g,v,y,e){return v&&!v[S]&&(v=Ce(v)),y&&!y[S]&&(y=Ce(y,e)),le(function(e,t,n,r){var i,o,a,s=[],u=[],l=t.length,c=e||function(e,t,n){for(var r=0,i=t.length;r<i;r++)se(e,t[r],n);return n}(h||"*",n.nodeType?[n]:n,[]),f=!d||!e&&h?c:Te(c,s,d,n,r),p=g?y||(e?d:l||v)?[]:t:f;if(g&&g(f,p,n,r),v){i=Te(p,u),v(i,[],n,r),o=i.length;while(o--)(a=i[o])&&(p[u[o]]=!(f[u[o]]=a))}if(e){if(y||d){if(y){i=[],o=p.length;while(o--)(a=p[o])&&i.push(f[o]=a);y(null,p=[],i,r)}o=p.length;while(o--)(a=p[o])&&-1<(i=y?P(e,a):s[o])&&(e[i]=!(t[i]=a))}}else p=Te(p===t?p.splice(l,p.length):p),y?y(null,t,p,r):H.apply(t,p)})}function Ee(e){for(var i,t,n,r=e.length,o=b.relative[e[0].type],a=o||b.relative[" "],s=o?1:0,u=be(function(e){return e===i},a,!0),l=be(function(e){return-1<P(i,e)},a,!0),c=[function(e,t,n){var r=!o&&(n||t!==w)||((i=t).nodeType?u(e,t,n):l(e,t,n));return i=null,r}];s<r;s++)if(t=b.relative[e[s].type])c=[be(we(c),t)];else{if((t=b.filter[e[s].type].apply(null,e[s].matches))[S]){for(n=++s;n<r;n++)if(b.relative[e[n].type])break;return Ce(1<s&&we(c),1<s&&xe(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace($,"$1"),t,s<n&&Ee(e.slice(s,n)),n<r&&Ee(e=e.slice(n)),n<r&&xe(e))}c.push(t)}return we(c)}return me.prototype=b.filters=b.pseudos,b.setFilters=new me,h=se.tokenize=function(e,t){var n,r,i,o,a,s,u,l=x[e+" "];if(l)return t?0:l.slice(0);a=e,s=[],u=b.preFilter;while(a){for(o in n&&!(r=_.exec(a))||(r&&(a=a.slice(r[0].length)||a),s.push(i=[])),n=!1,(r=z.exec(a))&&(n=r.shift(),i.push({value:n,type:r[0].replace($," ")}),a=a.slice(n.length)),b.filter)!(r=G[o].exec(a))||u[o]&&!(r=u[o](r))||(n=r.shift(),i.push({value:n,type:o,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?se.error(e):x(e,s).slice(0)},f=se.compile=function(e,t){var n,v,y,m,x,r,i=[],o=[],a=A[e+" "];if(!a){t||(t=h(e)),n=t.length;while(n--)(a=Ee(t[n]))[S]?i.push(a):o.push(a);(a=A(e,(v=o,m=0<(y=i).length,x=0<v.length,r=function(e,t,n,r,i){var o,a,s,u=0,l="0",c=e&&[],f=[],p=w,d=e||x&&b.find.TAG("*",i),h=k+=null==p?1:Math.random()||.1,g=d.length;for(i&&(w=t==C||t||i);l!==g&&null!=(o=d[l]);l++){if(x&&o){a=0,t||o.ownerDocument==C||(T(o),n=!E);while(s=v[a++])if(s(o,t||C,n)){r.push(o);break}i&&(k=h)}m&&((o=!s&&o)&&u--,e&&c.push(o))}if(u+=l,m&&l!==u){a=0;while(s=y[a++])s(c,f,t,n);if(e){if(0<u)while(l--)c[l]||f[l]||(f[l]=q.call(r));f=Te(f)}H.apply(r,f),i&&!e&&0<f.length&&1<u+y.length&&se.uniqueSort(r)}return i&&(k=h,w=p),c},m?le(r):r))).selector=e}return a},g=se.select=function(e,t,n,r){var i,o,a,s,u,l="function"==typeof e&&e,c=!r&&h(e=l.selector||e);if(n=n||[],1===c.length){if(2<(o=c[0]=c[0].slice(0)).length&&"ID"===(a=o[0]).type&&9===t.nodeType&&E&&b.relative[o[1].type]){if(!(t=(b.find.ID(a.matches[0].replace(te,ne),t)||[])[0]))return n;l&&(t=t.parentNode),e=e.slice(o.shift().value.length)}i=G.needsContext.test(e)?0:o.length;while(i--){if(a=o[i],b.relative[s=a.type])break;if((u=b.find[s])&&(r=u(a.matches[0].replace(te,ne),ee.test(o[0].type)&&ye(t.parentNode)||t))){if(o.splice(i,1),!(e=r.length&&xe(o)))return H.apply(n,r),n;break}}}return(l||f(e,c))(r,t,!E,n,!t||ee.test(e)&&ye(t.parentNode)||t),n},d.sortStable=S.split("").sort(j).join("")===S,d.detectDuplicates=!!l,T(),d.sortDetached=ce(function(e){return 1&e.compareDocumentPosition(C.createElement("fieldset"))}),ce(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||fe("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),d.attributes&&ce(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||fe("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),ce(function(e){return null==e.getAttribute("disabled")})||fe(R,function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),se}(C);S.find=d,S.expr=d.selectors,S.expr[":"]=S.expr.pseudos,S.uniqueSort=S.unique=d.uniqueSort,S.text=d.getText,S.isXMLDoc=d.isXML,S.contains=d.contains,S.escapeSelector=d.escape;var h=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&S(e).is(n))break;r.push(e)}return r},T=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},k=S.expr.match.needsContext;function A(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var N=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function j(e,n,r){return m(n)?S.grep(e,function(e,t){return!!n.call(e,t,e)!==r}):n.nodeType?S.grep(e,function(e){return e===n!==r}):"string"!=typeof n?S.grep(e,function(e){return-1<i.call(n,e)!==r}):S.filter(n,e,r)}S.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?S.find.matchesSelector(r,e)?[r]:[]:S.find.matches(e,S.grep(t,function(e){return 1===e.nodeType}))},S.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(S(e).filter(function(){for(t=0;t<r;t++)if(S.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)S.find(e,i[t],n);return 1<r?S.uniqueSort(n):n},filter:function(e){return this.pushStack(j(this,e||[],!1))},not:function(e){return this.pushStack(j(this,e||[],!0))},is:function(e){return!!j(this,"string"==typeof e&&k.test(e)?S(e):e||[],!1).length}});var D,q=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(S.fn.init=function(e,t,n){var r,i;if(!e)return this;if(n=n||D,"string"==typeof e){if(!(r="<"===e[0]&&">"===e[e.length-1]&&3<=e.length?[null,e,null]:q.exec(e))||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof S?t[0]:t,S.merge(this,S.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:E,!0)),N.test(r[1])&&S.isPlainObject(t))for(r in t)m(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return(i=E.getElementById(r[2]))&&(this[0]=i,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):m(e)?void 0!==n.ready?n.ready(e):e(S):S.makeArray(e,this)}).prototype=S.fn,D=S(E);var L=/^(?:parents|prev(?:Until|All))/,H={children:!0,contents:!0,next:!0,prev:!0};function O(e,t){while((e=e[t])&&1!==e.nodeType);return e}S.fn.extend({has:function(e){var t=S(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(S.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&S(e);if(!k.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?-1<a.index(n):1===n.nodeType&&S.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(1<o.length?S.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?i.call(S(e),this[0]):i.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(S.uniqueSort(S.merge(this.get(),S(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),S.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return h(e,"parentNode")},parentsUntil:function(e,t,n){return h(e,"parentNode",n)},next:function(e){return O(e,"nextSibling")},prev:function(e){return O(e,"previousSibling")},nextAll:function(e){return h(e,"nextSibling")},prevAll:function(e){return h(e,"previousSibling")},nextUntil:function(e,t,n){return h(e,"nextSibling",n)},prevUntil:function(e,t,n){return h(e,"previousSibling",n)},siblings:function(e){return T((e.parentNode||{}).firstChild,e)},children:function(e){return T(e.firstChild)},contents:function(e){return null!=e.contentDocument&&r(e.contentDocument)?e.contentDocument:(A(e,"template")&&(e=e.content||e),S.merge([],e.childNodes))}},function(r,i){S.fn[r]=function(e,t){var n=S.map(this,i,e);return"Until"!==r.slice(-5)&&(t=e),t&&"string"==typeof t&&(n=S.filter(t,n)),1<this.length&&(H[r]||S.uniqueSort(n),L.test(r)&&n.reverse()),this.pushStack(n)}});var P=/[^\x20\t\r\n\f]+/g;function R(e){return e}function M(e){throw e}function I(e,t,n,r){var i;try{e&&m(i=e.promise)?i.call(e).done(t).fail(n):e&&m(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}S.Callbacks=function(r){var e,n;r="string"==typeof r?(e=r,n={},S.each(e.match(P)||[],function(e,t){n[t]=!0}),n):S.extend({},r);var i,t,o,a,s=[],u=[],l=-1,c=function(){for(a=a||r.once,o=i=!0;u.length;l=-1){t=u.shift();while(++l<s.length)!1===s[l].apply(t[0],t[1])&&r.stopOnFalse&&(l=s.length,t=!1)}r.memory||(t=!1),i=!1,a&&(s=t?[]:"")},f={add:function(){return s&&(t&&!i&&(l=s.length-1,u.push(t)),function n(e){S.each(e,function(e,t){m(t)?r.unique&&f.has(t)||s.push(t):t&&t.length&&"string"!==w(t)&&n(t)})}(arguments),t&&!i&&c()),this},remove:function(){return S.each(arguments,function(e,t){var n;while(-1<(n=S.inArray(t,s,n)))s.splice(n,1),n<=l&&l--}),this},has:function(e){return e?-1<S.inArray(e,s):0<s.length},empty:function(){return s&&(s=[]),this},disable:function(){return a=u=[],s=t="",this},disabled:function(){return!s},lock:function(){return a=u=[],t||i||(s=t=""),this},locked:function(){return!!a},fireWith:function(e,t){return a||(t=[e,(t=t||[]).slice?t.slice():t],u.push(t),i||c()),this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!o}};return f},S.extend({Deferred:function(e){var o=[["notify","progress",S.Callbacks("memory"),S.Callbacks("memory"),2],["resolve","done",S.Callbacks("once memory"),S.Callbacks("once memory"),0,"resolved"],["reject","fail",S.Callbacks("once memory"),S.Callbacks("once memory"),1,"rejected"]],i="pending",a={state:function(){return i},always:function(){return s.done(arguments).fail(arguments),this},"catch":function(e){return a.then(null,e)},pipe:function(){var i=arguments;return S.Deferred(function(r){S.each(o,function(e,t){var n=m(i[t[4]])&&i[t[4]];s[t[1]](function(){var e=n&&n.apply(this,arguments);e&&m(e.promise)?e.promise().progress(r.notify).done(r.resolve).fail(r.reject):r[t[0]+"With"](this,n?[e]:arguments)})}),i=null}).promise()},then:function(t,n,r){var u=0;function l(i,o,a,s){return function(){var n=this,r=arguments,e=function(){var e,t;if(!(i<u)){if((e=a.apply(n,r))===o.promise())throw new TypeError("Thenable self-resolution");t=e&&("object"==typeof e||"function"==typeof e)&&e.then,m(t)?s?t.call(e,l(u,o,R,s),l(u,o,M,s)):(u++,t.call(e,l(u,o,R,s),l(u,o,M,s),l(u,o,R,o.notifyWith))):(a!==R&&(n=void 0,r=[e]),(s||o.resolveWith)(n,r))}},t=s?e:function(){try{e()}catch(e){S.Deferred.exceptionHook&&S.Deferred.exceptionHook(e,t.stackTrace),u<=i+1&&(a!==M&&(n=void 0,r=[e]),o.rejectWith(n,r))}};i?t():(S.Deferred.getStackHook&&(t.stackTrace=S.Deferred.getStackHook()),C.setTimeout(t))}}return S.Deferred(function(e){o[0][3].add(l(0,e,m(r)?r:R,e.notifyWith)),o[1][3].add(l(0,e,m(t)?t:R)),o[2][3].add(l(0,e,m(n)?n:M))}).promise()},promise:function(e){return null!=e?S.extend(e,a):a}},s={};return S.each(o,function(e,t){var n=t[2],r=t[5];a[t[1]]=n.add,r&&n.add(function(){i=r},o[3-e][2].disable,o[3-e][3].disable,o[0][2].lock,o[0][3].lock),n.add(t[3].fire),s[t[0]]=function(){return s[t[0]+"With"](this===s?void 0:this,arguments),this},s[t[0]+"With"]=n.fireWith}),a.promise(s),e&&e.call(s,s),s},when:function(e){var n=arguments.length,t=n,r=Array(t),i=s.call(arguments),o=S.Deferred(),a=function(t){return function(e){r[t]=this,i[t]=1<arguments.length?s.call(arguments):e,--n||o.resolveWith(r,i)}};if(n<=1&&(I(e,o.done(a(t)).resolve,o.reject,!n),"pending"===o.state()||m(i[t]&&i[t].then)))return o.then();while(t--)I(i[t],a(t),o.reject);return o.promise()}});var W=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;S.Deferred.exceptionHook=function(e,t){C.console&&C.console.warn&&e&&W.test(e.name)&&C.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},S.readyException=function(e){C.setTimeout(function(){throw e})};var F=S.Deferred();function B(){E.removeEventListener("DOMContentLoaded",B),C.removeEventListener("load",B),S.ready()}S.fn.ready=function(e){return F.then(e)["catch"](function(e){S.readyException(e)}),this},S.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--S.readyWait:S.isReady)||(S.isReady=!0)!==e&&0<--S.readyWait||F.resolveWith(E,[S])}}),S.ready.then=F.then,"complete"===E.readyState||"loading"!==E.readyState&&!E.documentElement.doScroll?C.setTimeout(S.ready):(E.addEventListener("DOMContentLoaded",B),C.addEventListener("load",B));var $=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===w(n))for(s in i=!0,n)$(e,t,s,n[s],!0,o,a);else if(void 0!==r&&(i=!0,m(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(S(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},_=/^-ms-/,z=/-([a-z])/g;function U(e,t){return t.toUpperCase()}function X(e){return e.replace(_,"ms-").replace(z,U)}var V=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function G(){this.expando=S.expando+G.uid++}G.uid=1,G.prototype={cache:function(e){var t=e[this.expando];return t||(t={},V(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[X(t)]=n;else for(r in t)i[X(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][X(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(X):(t=X(t))in r?[t]:t.match(P)||[]).length;while(n--)delete r[t[n]]}(void 0===t||S.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!S.isEmptyObject(t)}};var Y=new G,Q=new G,J=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,K=/[A-Z]/g;function Z(e,t,n){var r,i;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(K,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n="true"===(i=n)||"false"!==i&&("null"===i?null:i===+i+""?+i:J.test(i)?JSON.parse(i):i)}catch(e){}Q.set(e,t,n)}else n=void 0;return n}S.extend({hasData:function(e){return Q.hasData(e)||Y.hasData(e)},data:function(e,t,n){return Q.access(e,t,n)},removeData:function(e,t){Q.remove(e,t)},_data:function(e,t,n){return Y.access(e,t,n)},_removeData:function(e,t){Y.remove(e,t)}}),S.fn.extend({data:function(n,e){var t,r,i,o=this[0],a=o&&o.attributes;if(void 0===n){if(this.length&&(i=Q.get(o),1===o.nodeType&&!Y.get(o,"hasDataAttrs"))){t=a.length;while(t--)a[t]&&0===(r=a[t].name).indexOf("data-")&&(r=X(r.slice(5)),Z(o,r,i[r]));Y.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof n?this.each(function(){Q.set(this,n)}):$(this,function(e){var t;if(o&&void 0===e)return void 0!==(t=Q.get(o,n))?t:void 0!==(t=Z(o,n))?t:void 0;this.each(function(){Q.set(this,n,e)})},null,e,1<arguments.length,null,!0)},removeData:function(e){return this.each(function(){Q.remove(this,e)})}}),S.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=Y.get(e,t),n&&(!r||Array.isArray(n)?r=Y.access(e,t,S.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=S.queue(e,t),r=n.length,i=n.shift(),o=S._queueHooks(e,t);"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,function(){S.dequeue(e,t)},o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return Y.get(e,n)||Y.access(e,n,{empty:S.Callbacks("once memory").add(function(){Y.remove(e,[t+"queue",n])})})}}),S.fn.extend({queue:function(t,n){var e=2;return"string"!=typeof t&&(n=t,t="fx",e--),arguments.length<e?S.queue(this[0],t):void 0===n?this:this.each(function(){var e=S.queue(this,t,n);S._queueHooks(this,t),"fx"===t&&"inprogress"!==e[0]&&S.dequeue(this,t)})},dequeue:function(e){return this.each(function(){S.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=S.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=void 0),e=e||"fx";while(a--)(n=Y.get(o[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var ee=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,te=new RegExp("^(?:([+-])=|)("+ee+")([a-z%]*)$","i"),ne=["Top","Right","Bottom","Left"],re=E.documentElement,ie=function(e){return S.contains(e.ownerDocument,e)},oe={composed:!0};re.getRootNode&&(ie=function(e){return S.contains(e.ownerDocument,e)||e.getRootNode(oe)===e.ownerDocument});var ae=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&ie(e)&&"none"===S.css(e,"display")};function se(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return S.css(e,t,"")},u=s(),l=n&&n[3]||(S.cssNumber[t]?"":"px"),c=e.nodeType&&(S.cssNumber[t]||"px"!==l&&+u)&&te.exec(S.css(e,t));if(c&&c[3]!==l){u/=2,l=l||c[3],c=+u||1;while(a--)S.style(e,t,c+l),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),c/=o;c*=2,S.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}var ue={};function le(e,t){for(var n,r,i,o,a,s,u,l=[],c=0,f=e.length;c<f;c++)(r=e[c]).style&&(n=r.style.display,t?("none"===n&&(l[c]=Y.get(r,"display")||null,l[c]||(r.style.display="")),""===r.style.display&&ae(r)&&(l[c]=(u=a=o=void 0,a=(i=r).ownerDocument,s=i.nodeName,(u=ue[s])||(o=a.body.appendChild(a.createElement(s)),u=S.css(o,"display"),o.parentNode.removeChild(o),"none"===u&&(u="block"),ue[s]=u)))):"none"!==n&&(l[c]="none",Y.set(r,"display",n)));for(c=0;c<f;c++)null!=l[c]&&(e[c].style.display=l[c]);return e}S.fn.extend({show:function(){return le(this,!0)},hide:function(){return le(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){ae(this)?S(this).show():S(this).hide()})}});var ce,fe,pe=/^(?:checkbox|radio)$/i,de=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,he=/^$|^module$|\/(?:java|ecma)script/i;ce=E.createDocumentFragment().appendChild(E.createElement("div")),(fe=E.createElement("input")).setAttribute("type","radio"),fe.setAttribute("checked","checked"),fe.setAttribute("name","t"),ce.appendChild(fe),y.checkClone=ce.cloneNode(!0).cloneNode(!0).lastChild.checked,ce.innerHTML="<textarea>x</textarea>",y.noCloneChecked=!!ce.cloneNode(!0).lastChild.defaultValue,ce.innerHTML="<option></option>",y.option=!!ce.lastChild;var ge={thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function ve(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&A(e,t)?S.merge([e],n):n}function ye(e,t){for(var n=0,r=e.length;n<r;n++)Y.set(e[n],"globalEval",!t||Y.get(t[n],"globalEval"))}ge.tbody=ge.tfoot=ge.colgroup=ge.caption=ge.thead,ge.th=ge.td,y.option||(ge.optgroup=ge.option=[1,"<select multiple='multiple'>","</select>"]);var me=/<|&#?\w+;/;function xe(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if((o=e[d])||0===o)if("object"===w(o))S.merge(p,o.nodeType?[o]:o);else if(me.test(o)){a=a||f.appendChild(t.createElement("div")),s=(de.exec(o)||["",""])[1].toLowerCase(),u=ge[s]||ge._default,a.innerHTML=u[1]+S.htmlPrefilter(o)+u[2],c=u[0];while(c--)a=a.lastChild;S.merge(p,a.childNodes),(a=f.firstChild).textContent=""}else p.push(t.createTextNode(o));f.textContent="",d=0;while(o=p[d++])if(r&&-1<S.inArray(o,r))i&&i.push(o);else if(l=ie(o),a=ve(f.appendChild(o),"script"),l&&ye(a),n){c=0;while(o=a[c++])he.test(o.type||"")&&n.push(o)}return f}var be=/^([^.]*)(?:\.(.+)|)/;function we(){return!0}function Te(){return!1}function Ce(e,t){return e===function(){try{return E.activeElement}catch(e){}}()==("focus"===t)}function Ee(e,t,n,r,i,o){var a,s;if("object"==typeof t){for(s in"string"!=typeof n&&(r=r||n,n=void 0),t)Ee(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=Te;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return S().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=S.guid++)),e.each(function(){S.event.add(this,t,i,r,n)})}function Se(e,i,o){o?(Y.set(e,i,!1),S.event.add(e,i,{namespace:!1,handler:function(e){var t,n,r=Y.get(this,i);if(1&e.isTrigger&&this[i]){if(r.length)(S.event.special[i]||{}).delegateType&&e.stopPropagation();else if(r=s.call(arguments),Y.set(this,i,r),t=o(this,i),this[i](),r!==(n=Y.get(this,i))||t?Y.set(this,i,!1):n={},r!==n)return e.stopImmediatePropagation(),e.preventDefault(),n&&n.value}else r.length&&(Y.set(this,i,{value:S.event.trigger(S.extend(r[0],S.Event.prototype),r.slice(1),this)}),e.stopImmediatePropagation())}})):void 0===Y.get(e,i)&&S.event.add(e,i,we)}S.event={global:{},add:function(t,e,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Y.get(t);if(V(t)){n.handler&&(n=(o=n).handler,i=o.selector),i&&S.find.matchesSelector(re,i),n.guid||(n.guid=S.guid++),(u=v.events)||(u=v.events=Object.create(null)),(a=v.handle)||(a=v.handle=function(e){return"undefined"!=typeof S&&S.event.triggered!==e.type?S.event.dispatch.apply(t,arguments):void 0}),l=(e=(e||"").match(P)||[""]).length;while(l--)d=g=(s=be.exec(e[l])||[])[1],h=(s[2]||"").split(".").sort(),d&&(f=S.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=S.event.special[d]||{},c=S.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&S.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||((p=u[d]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(t,r,h,a)||t.addEventListener&&t.addEventListener(d,a)),f.add&&(f.add.call(t,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),S.event.global[d]=!0)}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Y.hasData(e)&&Y.get(e);if(v&&(u=v.events)){l=(t=(t||"").match(P)||[""]).length;while(l--)if(d=g=(s=be.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),d){f=S.event.special[d]||{},p=u[d=(r?f.delegateType:f.bindType)||d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;while(o--)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&!1!==f.teardown.call(e,h,v.handle)||S.removeEvent(e,d,v.handle),delete u[d])}else for(d in u)S.event.remove(e,d+t[l],n,r,!0);S.isEmptyObject(u)&&Y.remove(e,"handle events")}},dispatch:function(e){var t,n,r,i,o,a,s=new Array(arguments.length),u=S.event.fix(e),l=(Y.get(this,"events")||Object.create(null))[u.type]||[],c=S.event.special[u.type]||{};for(s[0]=u,t=1;t<arguments.length;t++)s[t]=arguments[t];if(u.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,u)){a=S.event.handlers.call(this,u,l),t=0;while((i=a[t++])&&!u.isPropagationStopped()){u.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!u.isImmediatePropagationStopped())u.rnamespace&&!1!==o.namespace&&!u.rnamespace.test(o.namespace)||(u.handleObj=o,u.data=o.data,void 0!==(r=((S.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,s))&&!1===(u.result=r)&&(u.preventDefault(),u.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,u),u.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!("click"===e.type&&1<=e.button))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<u;n++)void 0===a[i=(r=t[n]).selector+" "]&&(a[i]=r.needsContext?-1<S(i,this).index(l):S.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(t,e){Object.defineProperty(S.Event.prototype,t,{enumerable:!0,configurable:!0,get:m(e)?function(){if(this.originalEvent)return e(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[t]},set:function(e){Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:e})}})},fix:function(e){return e[S.expando]?e:new S.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&Se(t,"click",we),!1},trigger:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&Se(t,"click"),!0},_default:function(e){var t=e.target;return pe.test(t.type)&&t.click&&A(t,"input")&&Y.get(t,"click")||A(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},S.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},S.Event=function(e,t){if(!(this instanceof S.Event))return new S.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?we:Te,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&S.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[S.expando]=!0},S.Event.prototype={constructor:S.Event,isDefaultPrevented:Te,isPropagationStopped:Te,isImmediatePropagationStopped:Te,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=we,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=we,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=we,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},S.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:!0},S.event.addProp),S.each({focus:"focusin",blur:"focusout"},function(e,t){S.event.special[e]={setup:function(){return Se(this,e,Ce),!1},trigger:function(){return Se(this,e),!0},_default:function(){return!0},delegateType:t}}),S.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,i){S.event.special[e]={delegateType:i,bindType:i,handle:function(e){var t,n=e.relatedTarget,r=e.handleObj;return n&&(n===this||S.contains(this,n))||(e.type=r.origType,t=r.handler.apply(this,arguments),e.type=i),t}}}),S.fn.extend({on:function(e,t,n,r){return Ee(this,e,t,n,r)},one:function(e,t,n,r){return Ee(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,S(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=Te),this.each(function(){S.event.remove(this,e,n,t)})}});var ke=/<script|<style|<link/i,Ae=/checked\s*(?:[^=]|=\s*.checked.)/i,Ne=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function je(e,t){return A(e,"table")&&A(11!==t.nodeType?t:t.firstChild,"tr")&&S(e).children("tbody")[0]||e}function De(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function qe(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Le(e,t){var n,r,i,o,a,s;if(1===t.nodeType){if(Y.hasData(e)&&(s=Y.get(e).events))for(i in Y.remove(t,"handle events"),s)for(n=0,r=s[i].length;n<r;n++)S.event.add(t,i,s[i][n]);Q.hasData(e)&&(o=Q.access(e),a=S.extend({},o),Q.set(t,a))}}function He(n,r,i,o){r=g(r);var e,t,a,s,u,l,c=0,f=n.length,p=f-1,d=r[0],h=m(d);if(h||1<f&&"string"==typeof d&&!y.checkClone&&Ae.test(d))return n.each(function(e){var t=n.eq(e);h&&(r[0]=d.call(this,e,t.html())),He(t,r,i,o)});if(f&&(t=(e=xe(r,n[0].ownerDocument,!1,n,o)).firstChild,1===e.childNodes.length&&(e=t),t||o)){for(s=(a=S.map(ve(e,"script"),De)).length;c<f;c++)u=e,c!==p&&(u=S.clone(u,!0,!0),s&&S.merge(a,ve(u,"script"))),i.call(n[c],u,c);if(s)for(l=a[a.length-1].ownerDocument,S.map(a,qe),c=0;c<s;c++)u=a[c],he.test(u.type||"")&&!Y.access(u,"globalEval")&&S.contains(l,u)&&(u.src&&"module"!==(u.type||"").toLowerCase()?S._evalUrl&&!u.noModule&&S._evalUrl(u.src,{nonce:u.nonce||u.getAttribute("nonce")},l):b(u.textContent.replace(Ne,""),u,l))}return n}function Oe(e,t,n){for(var r,i=t?S.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||S.cleanData(ve(r)),r.parentNode&&(n&&ie(r)&&ye(ve(r,"script")),r.parentNode.removeChild(r));return e}S.extend({htmlPrefilter:function(e){return e},clone:function(e,t,n){var r,i,o,a,s,u,l,c=e.cloneNode(!0),f=ie(e);if(!(y.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||S.isXMLDoc(e)))for(a=ve(c),r=0,i=(o=ve(e)).length;r<i;r++)s=o[r],u=a[r],void 0,"input"===(l=u.nodeName.toLowerCase())&&pe.test(s.type)?u.checked=s.checked:"input"!==l&&"textarea"!==l||(u.defaultValue=s.defaultValue);if(t)if(n)for(o=o||ve(e),a=a||ve(c),r=0,i=o.length;r<i;r++)Le(o[r],a[r]);else Le(e,c);return 0<(a=ve(c,"script")).length&&ye(a,!f&&ve(e,"script")),c},cleanData:function(e){for(var t,n,r,i=S.event.special,o=0;void 0!==(n=e[o]);o++)if(V(n)){if(t=n[Y.expando]){if(t.events)for(r in t.events)i[r]?S.event.remove(n,r):S.removeEvent(n,r,t.handle);n[Y.expando]=void 0}n[Q.expando]&&(n[Q.expando]=void 0)}}}),S.fn.extend({detach:function(e){return Oe(this,e,!0)},remove:function(e){return Oe(this,e)},text:function(e){return $(this,function(e){return void 0===e?S.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return He(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||je(this,e).appendChild(e)})},prepend:function(){return He(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=je(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return He(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return He(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(S.cleanData(ve(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return S.clone(this,e,t)})},html:function(e){return $(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!ke.test(e)&&!ge[(de.exec(e)||["",""])[1].toLowerCase()]){e=S.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(S.cleanData(ve(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var n=[];return He(this,arguments,function(e){var t=this.parentNode;S.inArray(this,n)<0&&(S.cleanData(ve(this)),t&&t.replaceChild(e,this))},n)}}),S.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,a){S.fn[e]=function(e){for(var t,n=[],r=S(e),i=r.length-1,o=0;o<=i;o++)t=o===i?this:this.clone(!0),S(r[o])[a](t),u.apply(n,t.get());return this.pushStack(n)}});var Pe=new RegExp("^("+ee+")(?!px)[a-z%]+$","i"),Re=function(e){var t=e.ownerDocument.defaultView;return t&&t.opener||(t=C),t.getComputedStyle(e)},Me=function(e,t,n){var r,i,o={};for(i in t)o[i]=e.style[i],e.style[i]=t[i];for(i in r=n.call(e),t)e.style[i]=o[i];return r},Ie=new RegExp(ne.join("|"),"i");function We(e,t,n){var r,i,o,a,s=e.style;return(n=n||Re(e))&&(""!==(a=n.getPropertyValue(t)||n[t])||ie(e)||(a=S.style(e,t)),!y.pixelBoxStyles()&&Pe.test(a)&&Ie.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function Fe(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}!function(){function e(){if(l){u.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",l.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",re.appendChild(u).appendChild(l);var e=C.getComputedStyle(l);n="1%"!==e.top,s=12===t(e.marginLeft),l.style.right="60%",o=36===t(e.right),r=36===t(e.width),l.style.position="absolute",i=12===t(l.offsetWidth/3),re.removeChild(u),l=null}}function t(e){return Math.round(parseFloat(e))}var n,r,i,o,a,s,u=E.createElement("div"),l=E.createElement("div");l.style&&(l.style.backgroundClip="content-box",l.cloneNode(!0).style.backgroundClip="",y.clearCloneStyle="content-box"===l.style.backgroundClip,S.extend(y,{boxSizingReliable:function(){return e(),r},pixelBoxStyles:function(){return e(),o},pixelPosition:function(){return e(),n},reliableMarginLeft:function(){return e(),s},scrollboxSize:function(){return e(),i},reliableTrDimensions:function(){var e,t,n,r;return null==a&&(e=E.createElement("table"),t=E.createElement("tr"),n=E.createElement("div"),e.style.cssText="position:absolute;left:-11111px;border-collapse:separate",t.style.cssText="border:1px solid",t.style.height="1px",n.style.height="9px",n.style.display="block",re.appendChild(e).appendChild(t).appendChild(n),r=C.getComputedStyle(t),a=parseInt(r.height,10)+parseInt(r.borderTopWidth,10)+parseInt(r.borderBottomWidth,10)===t.offsetHeight,re.removeChild(e)),a}}))}();var Be=["Webkit","Moz","ms"],$e=E.createElement("div").style,_e={};function ze(e){var t=S.cssProps[e]||_e[e];return t||(e in $e?e:_e[e]=function(e){var t=e[0].toUpperCase()+e.slice(1),n=Be.length;while(n--)if((e=Be[n]+t)in $e)return e}(e)||e)}var Ue=/^(none|table(?!-c[ea]).+)/,Xe=/^--/,Ve={position:"absolute",visibility:"hidden",display:"block"},Ge={letterSpacing:"0",fontWeight:"400"};function Ye(e,t,n){var r=te.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function Qe(e,t,n,r,i,o){var a="width"===t?1:0,s=0,u=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(u+=S.css(e,n+ne[a],!0,i)),r?("content"===n&&(u-=S.css(e,"padding"+ne[a],!0,i)),"margin"!==n&&(u-=S.css(e,"border"+ne[a]+"Width",!0,i))):(u+=S.css(e,"padding"+ne[a],!0,i),"padding"!==n?u+=S.css(e,"border"+ne[a]+"Width",!0,i):s+=S.css(e,"border"+ne[a]+"Width",!0,i));return!r&&0<=o&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))||0),u}function Je(e,t,n){var r=Re(e),i=(!y.boxSizingReliable()||n)&&"border-box"===S.css(e,"boxSizing",!1,r),o=i,a=We(e,t,r),s="offset"+t[0].toUpperCase()+t.slice(1);if(Pe.test(a)){if(!n)return a;a="auto"}return(!y.boxSizingReliable()&&i||!y.reliableTrDimensions()&&A(e,"tr")||"auto"===a||!parseFloat(a)&&"inline"===S.css(e,"display",!1,r))&&e.getClientRects().length&&(i="border-box"===S.css(e,"boxSizing",!1,r),(o=s in e)&&(a=e[s])),(a=parseFloat(a)||0)+Qe(e,t,n||(i?"border":"content"),o,r,a)+"px"}function Ke(e,t,n,r,i){return new Ke.prototype.init(e,t,n,r,i)}S.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=We(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=X(t),u=Xe.test(t),l=e.style;if(u||(t=ze(s)),a=S.cssHooks[t]||S.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];"string"===(o=typeof n)&&(i=te.exec(n))&&i[1]&&(n=se(e,t,i),o="number"),null!=n&&n==n&&("number"!==o||u||(n+=i&&i[3]||(S.cssNumber[s]?"":"px")),y.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=X(t);return Xe.test(t)||(t=ze(s)),(a=S.cssHooks[t]||S.cssHooks[s])&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=We(e,t,r)),"normal"===i&&t in Ge&&(i=Ge[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),S.each(["height","width"],function(e,u){S.cssHooks[u]={get:function(e,t,n){if(t)return!Ue.test(S.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?Je(e,u,n):Me(e,Ve,function(){return Je(e,u,n)})},set:function(e,t,n){var r,i=Re(e),o=!y.scrollboxSize()&&"absolute"===i.position,a=(o||n)&&"border-box"===S.css(e,"boxSizing",!1,i),s=n?Qe(e,u,n,a,i):0;return a&&o&&(s-=Math.ceil(e["offset"+u[0].toUpperCase()+u.slice(1)]-parseFloat(i[u])-Qe(e,u,"border",!1,i)-.5)),s&&(r=te.exec(t))&&"px"!==(r[3]||"px")&&(e.style[u]=t,t=S.css(e,u)),Ye(0,t,s)}}}),S.cssHooks.marginLeft=Fe(y.reliableMarginLeft,function(e,t){if(t)return(parseFloat(We(e,"marginLeft"))||e.getBoundingClientRect().left-Me(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),S.each({margin:"",padding:"",border:"Width"},function(i,o){S.cssHooks[i+o]={expand:function(e){for(var t=0,n={},r="string"==typeof e?e.split(" "):[e];t<4;t++)n[i+ne[t]+o]=r[t]||r[t-2]||r[0];return n}},"margin"!==i&&(S.cssHooks[i+o].set=Ye)}),S.fn.extend({css:function(e,t){return $(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=Re(e),i=t.length;a<i;a++)o[t[a]]=S.css(e,t[a],!1,r);return o}return void 0!==n?S.style(e,t,n):S.css(e,t)},e,t,1<arguments.length)}}),((S.Tween=Ke).prototype={constructor:Ke,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||S.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(S.cssNumber[n]?"":"px")},cur:function(){var e=Ke.propHooks[this.prop];return e&&e.get?e.get(this):Ke.propHooks._default.get(this)},run:function(e){var t,n=Ke.propHooks[this.prop];return this.options.duration?this.pos=t=S.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Ke.propHooks._default.set(this),this}}).init.prototype=Ke.prototype,(Ke.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=S.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){S.fx.step[e.prop]?S.fx.step[e.prop](e):1!==e.elem.nodeType||!S.cssHooks[e.prop]&&null==e.elem.style[ze(e.prop)]?e.elem[e.prop]=e.now:S.style(e.elem,e.prop,e.now+e.unit)}}}).scrollTop=Ke.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},S.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},S.fx=Ke.prototype.init,S.fx.step={};var Ze,et,tt,nt,rt=/^(?:toggle|show|hide)$/,it=/queueHooks$/;function ot(){et&&(!1===E.hidden&&C.requestAnimationFrame?C.requestAnimationFrame(ot):C.setTimeout(ot,S.fx.interval),S.fx.tick())}function at(){return C.setTimeout(function(){Ze=void 0}),Ze=Date.now()}function st(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=ne[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function ut(e,t,n){for(var r,i=(lt.tweeners[t]||[]).concat(lt.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function lt(o,e,t){var n,a,r=0,i=lt.prefilters.length,s=S.Deferred().always(function(){delete u.elem}),u=function(){if(a)return!1;for(var e=Ze||at(),t=Math.max(0,l.startTime+l.duration-e),n=1-(t/l.duration||0),r=0,i=l.tweens.length;r<i;r++)l.tweens[r].run(n);return s.notifyWith(o,[l,n,t]),n<1&&i?t:(i||s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l]),!1)},l=s.promise({elem:o,props:S.extend({},e),opts:S.extend(!0,{specialEasing:{},easing:S.easing._default},t),originalProperties:e,originalOptions:t,startTime:Ze||at(),duration:t.duration,tweens:[],createTween:function(e,t){var n=S.Tween(o,l.opts,e,t,l.opts.specialEasing[e]||l.opts.easing);return l.tweens.push(n),n},stop:function(e){var t=0,n=e?l.tweens.length:0;if(a)return this;for(a=!0;t<n;t++)l.tweens[t].run(1);return e?(s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l,e])):s.rejectWith(o,[l,e]),this}}),c=l.props;for(!function(e,t){var n,r,i,o,a;for(n in e)if(i=t[r=X(n)],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(a=S.cssHooks[r])&&"expand"in a)for(n in o=a.expand(o),delete e[r],o)n in e||(e[n]=o[n],t[n]=i);else t[r]=i}(c,l.opts.specialEasing);r<i;r++)if(n=lt.prefilters[r].call(l,o,c,l.opts))return m(n.stop)&&(S._queueHooks(l.elem,l.opts.queue).stop=n.stop.bind(n)),n;return S.map(c,ut,l),m(l.opts.start)&&l.opts.start.call(o,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),S.fx.timer(S.extend(u,{elem:o,anim:l,queue:l.opts.queue})),l}S.Animation=S.extend(lt,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return se(n.elem,e,te.exec(t),n),n}]},tweener:function(e,t){m(e)?(t=e,e=["*"]):e=e.match(P);for(var n,r=0,i=e.length;r<i;r++)n=e[r],lt.tweeners[n]=lt.tweeners[n]||[],lt.tweeners[n].unshift(t)},prefilters:[function(e,t,n){var r,i,o,a,s,u,l,c,f="width"in t||"height"in t,p=this,d={},h=e.style,g=e.nodeType&&ae(e),v=Y.get(e,"fxshow");for(r in n.queue||(null==(a=S._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,S.queue(e,"fx").length||a.empty.fire()})})),t)if(i=t[r],rt.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!v||void 0===v[r])continue;g=!0}d[r]=v&&v[r]||S.style(e,r)}if((u=!S.isEmptyObject(t))||!S.isEmptyObject(d))for(r in f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=v&&v.display)&&(l=Y.get(e,"display")),"none"===(c=S.css(e,"display"))&&(l?c=l:(le([e],!0),l=e.style.display||l,c=S.css(e,"display"),le([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===S.css(e,"float")&&(u||(p.done(function(){h.display=l}),null==l&&(c=h.display,l="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1,d)u||(v?"hidden"in v&&(g=v.hidden):v=Y.access(e,"fxshow",{display:l}),o&&(v.hidden=!g),g&&le([e],!0),p.done(function(){for(r in g||le([e]),Y.remove(e,"fxshow"),d)S.style(e,r,d[r])})),u=ut(g?v[r]:0,r,p),r in v||(v[r]=u.start,g&&(u.end=u.start,u.start=0))}],prefilter:function(e,t){t?lt.prefilters.unshift(e):lt.prefilters.push(e)}}),S.speed=function(e,t,n){var r=e&&"object"==typeof e?S.extend({},e):{complete:n||!n&&t||m(e)&&e,duration:e,easing:n&&t||t&&!m(t)&&t};return S.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in S.fx.speeds?r.duration=S.fx.speeds[r.duration]:r.duration=S.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){m(r.old)&&r.old.call(this),r.queue&&S.dequeue(this,r.queue)},r},S.fn.extend({fadeTo:function(e,t,n,r){return this.filter(ae).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(t,e,n,r){var i=S.isEmptyObject(t),o=S.speed(e,n,r),a=function(){var e=lt(this,S.extend({},t),o);(i||Y.get(this,"finish"))&&e.stop(!0)};return a.finish=a,i||!1===o.queue?this.each(a):this.queue(o.queue,a)},stop:function(i,e,o){var a=function(e){var t=e.stop;delete e.stop,t(o)};return"string"!=typeof i&&(o=e,e=i,i=void 0),e&&this.queue(i||"fx",[]),this.each(function(){var e=!0,t=null!=i&&i+"queueHooks",n=S.timers,r=Y.get(this);if(t)r[t]&&r[t].stop&&a(r[t]);else for(t in r)r[t]&&r[t].stop&&it.test(t)&&a(r[t]);for(t=n.length;t--;)n[t].elem!==this||null!=i&&n[t].queue!==i||(n[t].anim.stop(o),e=!1,n.splice(t,1));!e&&o||S.dequeue(this,i)})},finish:function(a){return!1!==a&&(a=a||"fx"),this.each(function(){var e,t=Y.get(this),n=t[a+"queue"],r=t[a+"queueHooks"],i=S.timers,o=n?n.length:0;for(t.finish=!0,S.queue(this,a,[]),r&&r.stop&&r.stop.call(this,!0),e=i.length;e--;)i[e].elem===this&&i[e].queue===a&&(i[e].anim.stop(!0),i.splice(e,1));for(e=0;e<o;e++)n[e]&&n[e].finish&&n[e].finish.call(this);delete t.finish})}}),S.each(["toggle","show","hide"],function(e,r){var i=S.fn[r];S.fn[r]=function(e,t,n){return null==e||"boolean"==typeof e?i.apply(this,arguments):this.animate(st(r,!0),e,t,n)}}),S.each({slideDown:st("show"),slideUp:st("hide"),slideToggle:st("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,r){S.fn[e]=function(e,t,n){return this.animate(r,e,t,n)}}),S.timers=[],S.fx.tick=function(){var e,t=0,n=S.timers;for(Ze=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||S.fx.stop(),Ze=void 0},S.fx.timer=function(e){S.timers.push(e),S.fx.start()},S.fx.interval=13,S.fx.start=function(){et||(et=!0,ot())},S.fx.stop=function(){et=null},S.fx.speeds={slow:600,fast:200,_default:400},S.fn.delay=function(r,e){return r=S.fx&&S.fx.speeds[r]||r,e=e||"fx",this.queue(e,function(e,t){var n=C.setTimeout(e,r);t.stop=function(){C.clearTimeout(n)}})},tt=E.createElement("input"),nt=E.createElement("select").appendChild(E.createElement("option")),tt.type="checkbox",y.checkOn=""!==tt.value,y.optSelected=nt.selected,(tt=E.createElement("input")).value="t",tt.type="radio",y.radioValue="t"===tt.value;var ct,ft=S.expr.attrHandle;S.fn.extend({attr:function(e,t){return $(this,S.attr,e,t,1<arguments.length)},removeAttr:function(e){return this.each(function(){S.removeAttr(this,e)})}}),S.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?S.prop(e,t,n):(1===o&&S.isXMLDoc(e)||(i=S.attrHooks[t.toLowerCase()]||(S.expr.match.bool.test(t)?ct:void 0)),void 0!==n?null===n?void S.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=S.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!y.radioValue&&"radio"===t&&A(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(P);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),ct={set:function(e,t,n){return!1===t?S.removeAttr(e,n):e.setAttribute(n,n),n}},S.each(S.expr.match.bool.source.match(/\w+/g),function(e,t){var a=ft[t]||S.find.attr;ft[t]=function(e,t,n){var r,i,o=t.toLowerCase();return n||(i=ft[o],ft[o]=r,r=null!=a(e,t,n)?o:null,ft[o]=i),r}});var pt=/^(?:input|select|textarea|button)$/i,dt=/^(?:a|area)$/i;function ht(e){return(e.match(P)||[]).join(" ")}function gt(e){return e.getAttribute&&e.getAttribute("class")||""}function vt(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(P)||[]}S.fn.extend({prop:function(e,t){return $(this,S.prop,e,t,1<arguments.length)},removeProp:function(e){return this.each(function(){delete this[S.propFix[e]||e]})}}),S.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&S.isXMLDoc(e)||(t=S.propFix[t]||t,i=S.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=S.find.attr(e,"tabindex");return t?parseInt(t,10):pt.test(e.nodeName)||dt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),y.optSelected||(S.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),S.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){S.propFix[this.toLowerCase()]=this}),S.fn.extend({addClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){S(this).addClass(t.call(this,e,gt(this)))});if((e=vt(t)).length)while(n=this[u++])if(i=gt(n),r=1===n.nodeType&&" "+ht(i)+" "){a=0;while(o=e[a++])r.indexOf(" "+o+" ")<0&&(r+=o+" ");i!==(s=ht(r))&&n.setAttribute("class",s)}return this},removeClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){S(this).removeClass(t.call(this,e,gt(this)))});if(!arguments.length)return this.attr("class","");if((e=vt(t)).length)while(n=this[u++])if(i=gt(n),r=1===n.nodeType&&" "+ht(i)+" "){a=0;while(o=e[a++])while(-1<r.indexOf(" "+o+" "))r=r.replace(" "+o+" "," ");i!==(s=ht(r))&&n.setAttribute("class",s)}return this},toggleClass:function(i,t){var o=typeof i,a="string"===o||Array.isArray(i);return"boolean"==typeof t&&a?t?this.addClass(i):this.removeClass(i):m(i)?this.each(function(e){S(this).toggleClass(i.call(this,e,gt(this),t),t)}):this.each(function(){var e,t,n,r;if(a){t=0,n=S(this),r=vt(i);while(e=r[t++])n.hasClass(e)?n.removeClass(e):n.addClass(e)}else void 0!==i&&"boolean"!==o||((e=gt(this))&&Y.set(this,"__className__",e),this.setAttribute&&this.setAttribute("class",e||!1===i?"":Y.get(this,"__className__")||""))})},hasClass:function(e){var t,n,r=0;t=" "+e+" ";while(n=this[r++])if(1===n.nodeType&&-1<(" "+ht(gt(n))+" ").indexOf(t))return!0;return!1}});var yt=/\r/g;S.fn.extend({val:function(n){var r,e,i,t=this[0];return arguments.length?(i=m(n),this.each(function(e){var t;1===this.nodeType&&(null==(t=i?n.call(this,e,S(this).val()):n)?t="":"number"==typeof t?t+="":Array.isArray(t)&&(t=S.map(t,function(e){return null==e?"":e+""})),(r=S.valHooks[this.type]||S.valHooks[this.nodeName.toLowerCase()])&&"set"in r&&void 0!==r.set(this,t,"value")||(this.value=t))})):t?(r=S.valHooks[t.type]||S.valHooks[t.nodeName.toLowerCase()])&&"get"in r&&void 0!==(e=r.get(t,"value"))?e:"string"==typeof(e=t.value)?e.replace(yt,""):null==e?"":e:void 0}}),S.extend({valHooks:{option:{get:function(e){var t=S.find.attr(e,"value");return null!=t?t:ht(S.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!A(n.parentNode,"optgroup"))){if(t=S(n).val(),a)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=S.makeArray(t),a=i.length;while(a--)((r=i[a]).selected=-1<S.inArray(S.valHooks.option.get(r),o))&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),S.each(["radio","checkbox"],function(){S.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=-1<S.inArray(S(e).val(),t)}},y.checkOn||(S.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),y.focusin="onfocusin"in C;var mt=/^(?:focusinfocus|focusoutblur)$/,xt=function(e){e.stopPropagation()};S.extend(S.event,{trigger:function(e,t,n,r){var i,o,a,s,u,l,c,f,p=[n||E],d=v.call(e,"type")?e.type:e,h=v.call(e,"namespace")?e.namespace.split("."):[];if(o=f=a=n=n||E,3!==n.nodeType&&8!==n.nodeType&&!mt.test(d+S.event.triggered)&&(-1<d.indexOf(".")&&(d=(h=d.split(".")).shift(),h.sort()),u=d.indexOf(":")<0&&"on"+d,(e=e[S.expando]?e:new S.Event(d,"object"==typeof e&&e)).isTrigger=r?2:3,e.namespace=h.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),t=null==t?[e]:S.makeArray(t,[e]),c=S.event.special[d]||{},r||!c.trigger||!1!==c.trigger.apply(n,t))){if(!r&&!c.noBubble&&!x(n)){for(s=c.delegateType||d,mt.test(s+d)||(o=o.parentNode);o;o=o.parentNode)p.push(o),a=o;a===(n.ownerDocument||E)&&p.push(a.defaultView||a.parentWindow||C)}i=0;while((o=p[i++])&&!e.isPropagationStopped())f=o,e.type=1<i?s:c.bindType||d,(l=(Y.get(o,"events")||Object.create(null))[e.type]&&Y.get(o,"handle"))&&l.apply(o,t),(l=u&&o[u])&&l.apply&&V(o)&&(e.result=l.apply(o,t),!1===e.result&&e.preventDefault());return e.type=d,r||e.isDefaultPrevented()||c._default&&!1!==c._default.apply(p.pop(),t)||!V(n)||u&&m(n[d])&&!x(n)&&((a=n[u])&&(n[u]=null),S.event.triggered=d,e.isPropagationStopped()&&f.addEventListener(d,xt),n[d](),e.isPropagationStopped()&&f.removeEventListener(d,xt),S.event.triggered=void 0,a&&(n[u]=a)),e.result}},simulate:function(e,t,n){var r=S.extend(new S.Event,n,{type:e,isSimulated:!0});S.event.trigger(r,null,t)}}),S.fn.extend({trigger:function(e,t){return this.each(function(){S.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return S.event.trigger(e,t,n,!0)}}),y.focusin||S.each({focus:"focusin",blur:"focusout"},function(n,r){var i=function(e){S.event.simulate(r,e.target,S.event.fix(e))};S.event.special[r]={setup:function(){var e=this.ownerDocument||this.document||this,t=Y.access(e,r);t||e.addEventListener(n,i,!0),Y.access(e,r,(t||0)+1)},teardown:function(){var e=this.ownerDocument||this.document||this,t=Y.access(e,r)-1;t?Y.access(e,r,t):(e.removeEventListener(n,i,!0),Y.remove(e,r))}}});var bt=C.location,wt={guid:Date.now()},Tt=/\?/;S.parseXML=function(e){var t,n;if(!e||"string"!=typeof e)return null;try{t=(new C.DOMParser).parseFromString(e,"text/xml")}catch(e){}return n=t&&t.getElementsByTagName("parsererror")[0],t&&!n||S.error("Invalid XML: "+(n?S.map(n.childNodes,function(e){return e.textContent}).join("\n"):e)),t};var Ct=/\[\]$/,Et=/\r?\n/g,St=/^(?:submit|button|image|reset|file)$/i,kt=/^(?:input|select|textarea|keygen)/i;function At(n,e,r,i){var t;if(Array.isArray(e))S.each(e,function(e,t){r||Ct.test(n)?i(n,t):At(n+"["+("object"==typeof t&&null!=t?e:"")+"]",t,r,i)});else if(r||"object"!==w(e))i(n,e);else for(t in e)At(n+"["+t+"]",e[t],r,i)}S.param=function(e,t){var n,r=[],i=function(e,t){var n=m(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(null==e)return"";if(Array.isArray(e)||e.jquery&&!S.isPlainObject(e))S.each(e,function(){i(this.name,this.value)});else for(n in e)At(n,e[n],t,i);return r.join("&")},S.fn.extend({serialize:function(){return S.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=S.prop(this,"elements");return e?S.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!S(this).is(":disabled")&&kt.test(this.nodeName)&&!St.test(e)&&(this.checked||!pe.test(e))}).map(function(e,t){var n=S(this).val();return null==n?null:Array.isArray(n)?S.map(n,function(e){return{name:t.name,value:e.replace(Et,"\r\n")}}):{name:t.name,value:n.replace(Et,"\r\n")}}).get()}});var Nt=/%20/g,jt=/#.*$/,Dt=/([?&])_=[^&]*/,qt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Lt=/^(?:GET|HEAD)$/,Ht=/^\/\//,Ot={},Pt={},Rt="*/".concat("*"),Mt=E.createElement("a");function It(o){return function(e,t){"string"!=typeof e&&(t=e,e="*");var n,r=0,i=e.toLowerCase().match(P)||[];if(m(t))while(n=i[r++])"+"===n[0]?(n=n.slice(1)||"*",(o[n]=o[n]||[]).unshift(t)):(o[n]=o[n]||[]).push(t)}}function Wt(t,i,o,a){var s={},u=t===Pt;function l(e){var r;return s[e]=!0,S.each(t[e]||[],function(e,t){var n=t(i,o,a);return"string"!=typeof n||u||s[n]?u?!(r=n):void 0:(i.dataTypes.unshift(n),l(n),!1)}),r}return l(i.dataTypes[0])||!s["*"]&&l("*")}function Ft(e,t){var n,r,i=S.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&S.extend(!0,e,r),e}Mt.href=bt.href,S.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:bt.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(bt.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Rt,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":S.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Ft(Ft(e,S.ajaxSettings),t):Ft(S.ajaxSettings,e)},ajaxPrefilter:It(Ot),ajaxTransport:It(Pt),ajax:function(e,t){"object"==typeof e&&(t=e,e=void 0),t=t||{};var c,f,p,n,d,r,h,g,i,o,v=S.ajaxSetup({},t),y=v.context||v,m=v.context&&(y.nodeType||y.jquery)?S(y):S.event,x=S.Deferred(),b=S.Callbacks("once memory"),w=v.statusCode||{},a={},s={},u="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(h){if(!n){n={};while(t=qt.exec(p))n[t[1].toLowerCase()+" "]=(n[t[1].toLowerCase()+" "]||[]).concat(t[2])}t=n[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return h?p:null},setRequestHeader:function(e,t){return null==h&&(e=s[e.toLowerCase()]=s[e.toLowerCase()]||e,a[e]=t),this},overrideMimeType:function(e){return null==h&&(v.mimeType=e),this},statusCode:function(e){var t;if(e)if(h)T.always(e[T.status]);else for(t in e)w[t]=[w[t],e[t]];return this},abort:function(e){var t=e||u;return c&&c.abort(t),l(0,t),this}};if(x.promise(T),v.url=((e||v.url||bt.href)+"").replace(Ht,bt.protocol+"//"),v.type=t.method||t.type||v.method||v.type,v.dataTypes=(v.dataType||"*").toLowerCase().match(P)||[""],null==v.crossDomain){r=E.createElement("a");try{r.href=v.url,r.href=r.href,v.crossDomain=Mt.protocol+"//"+Mt.host!=r.protocol+"//"+r.host}catch(e){v.crossDomain=!0}}if(v.data&&v.processData&&"string"!=typeof v.data&&(v.data=S.param(v.data,v.traditional)),Wt(Ot,v,t,T),h)return T;for(i in(g=S.event&&v.global)&&0==S.active++&&S.event.trigger("ajaxStart"),v.type=v.type.toUpperCase(),v.hasContent=!Lt.test(v.type),f=v.url.replace(jt,""),v.hasContent?v.data&&v.processData&&0===(v.contentType||"").indexOf("application/x-www-form-urlencoded")&&(v.data=v.data.replace(Nt,"+")):(o=v.url.slice(f.length),v.data&&(v.processData||"string"==typeof v.data)&&(f+=(Tt.test(f)?"&":"?")+v.data,delete v.data),!1===v.cache&&(f=f.replace(Dt,"$1"),o=(Tt.test(f)?"&":"?")+"_="+wt.guid+++o),v.url=f+o),v.ifModified&&(S.lastModified[f]&&T.setRequestHeader("If-Modified-Since",S.lastModified[f]),S.etag[f]&&T.setRequestHeader("If-None-Match",S.etag[f])),(v.data&&v.hasContent&&!1!==v.contentType||t.contentType)&&T.setRequestHeader("Content-Type",v.contentType),T.setRequestHeader("Accept",v.dataTypes[0]&&v.accepts[v.dataTypes[0]]?v.accepts[v.dataTypes[0]]+("*"!==v.dataTypes[0]?", "+Rt+"; q=0.01":""):v.accepts["*"]),v.headers)T.setRequestHeader(i,v.headers[i]);if(v.beforeSend&&(!1===v.beforeSend.call(y,T,v)||h))return T.abort();if(u="abort",b.add(v.complete),T.done(v.success),T.fail(v.error),c=Wt(Pt,v,t,T)){if(T.readyState=1,g&&m.trigger("ajaxSend",[T,v]),h)return T;v.async&&0<v.timeout&&(d=C.setTimeout(function(){T.abort("timeout")},v.timeout));try{h=!1,c.send(a,l)}catch(e){if(h)throw e;l(-1,e)}}else l(-1,"No Transport");function l(e,t,n,r){var i,o,a,s,u,l=t;h||(h=!0,d&&C.clearTimeout(d),c=void 0,p=r||"",T.readyState=0<e?4:0,i=200<=e&&e<300||304===e,n&&(s=function(e,t,n){var r,i,o,a,s=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==u[0]&&u.unshift(o),n[o]}(v,T,n)),!i&&-1<S.inArray("script",v.dataTypes)&&S.inArray("json",v.dataTypes)<0&&(v.converters["text script"]=function(){}),s=function(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(!(a=l[u+" "+o]||l["* "+o]))for(i in l)if((s=i.split(" "))[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){!0===a?a=l[i]:!0!==l[i]&&(o=s[0],c.unshift(s[1]));break}if(!0!==a)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}(v,s,T,i),i?(v.ifModified&&((u=T.getResponseHeader("Last-Modified"))&&(S.lastModified[f]=u),(u=T.getResponseHeader("etag"))&&(S.etag[f]=u)),204===e||"HEAD"===v.type?l="nocontent":304===e?l="notmodified":(l=s.state,o=s.data,i=!(a=s.error))):(a=l,!e&&l||(l="error",e<0&&(e=0))),T.status=e,T.statusText=(t||l)+"",i?x.resolveWith(y,[o,l,T]):x.rejectWith(y,[T,l,a]),T.statusCode(w),w=void 0,g&&m.trigger(i?"ajaxSuccess":"ajaxError",[T,v,i?o:a]),b.fireWith(y,[T,l]),g&&(m.trigger("ajaxComplete",[T,v]),--S.active||S.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return S.get(e,t,n,"json")},getScript:function(e,t){return S.get(e,void 0,t,"script")}}),S.each(["get","post"],function(e,i){S[i]=function(e,t,n,r){return m(t)&&(r=r||n,n=t,t=void 0),S.ajax(S.extend({url:e,type:i,dataType:r,data:t,success:n},S.isPlainObject(e)&&e))}}),S.ajaxPrefilter(function(e){var t;for(t in e.headers)"content-type"===t.toLowerCase()&&(e.contentType=e.headers[t]||"")}),S._evalUrl=function(e,t,n){return S.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(e){S.globalEval(e,t,n)}})},S.fn.extend({wrapAll:function(e){var t;return this[0]&&(m(e)&&(e=e.call(this[0])),t=S(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(n){return m(n)?this.each(function(e){S(this).wrapInner(n.call(this,e))}):this.each(function(){var e=S(this),t=e.contents();t.length?t.wrapAll(n):e.append(n)})},wrap:function(t){var n=m(t);return this.each(function(e){S(this).wrapAll(n?t.call(this,e):t)})},unwrap:function(e){return this.parent(e).not("body").each(function(){S(this).replaceWith(this.childNodes)}),this}}),S.expr.pseudos.hidden=function(e){return!S.expr.pseudos.visible(e)},S.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},S.ajaxSettings.xhr=function(){try{return new C.XMLHttpRequest}catch(e){}};var Bt={0:200,1223:204},$t=S.ajaxSettings.xhr();y.cors=!!$t&&"withCredentials"in $t,y.ajax=$t=!!$t,S.ajaxTransport(function(i){var o,a;if(y.cors||$t&&!i.crossDomain)return{send:function(e,t){var n,r=i.xhr();if(r.open(i.type,i.url,i.async,i.username,i.password),i.xhrFields)for(n in i.xhrFields)r[n]=i.xhrFields[n];for(n in i.mimeType&&r.overrideMimeType&&r.overrideMimeType(i.mimeType),i.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest"),e)r.setRequestHeader(n,e[n]);o=function(e){return function(){o&&(o=a=r.onload=r.onerror=r.onabort=r.ontimeout=r.onreadystatechange=null,"abort"===e?r.abort():"error"===e?"number"!=typeof r.status?t(0,"error"):t(r.status,r.statusText):t(Bt[r.status]||r.status,r.statusText,"text"!==(r.responseType||"text")||"string"!=typeof r.responseText?{binary:r.response}:{text:r.responseText},r.getAllResponseHeaders()))}},r.onload=o(),a=r.onerror=r.ontimeout=o("error"),void 0!==r.onabort?r.onabort=a:r.onreadystatechange=function(){4===r.readyState&&C.setTimeout(function(){o&&a()})},o=o("abort");try{r.send(i.hasContent&&i.data||null)}catch(e){if(o)throw e}},abort:function(){o&&o()}}}),S.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),S.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return S.globalEval(e),e}}}),S.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),S.ajaxTransport("script",function(n){var r,i;if(n.crossDomain||n.scriptAttrs)return{send:function(e,t){r=S("<script>").attr(n.scriptAttrs||{}).prop({charset:n.scriptCharset,src:n.url}).on("load error",i=function(e){r.remove(),i=null,e&&t("error"===e.type?404:200,e.type)}),E.head.appendChild(r[0])},abort:function(){i&&i()}}});var _t,zt=[],Ut=/(=)\?(?=&|$)|\?\?/;S.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=zt.pop()||S.expando+"_"+wt.guid++;return this[e]=!0,e}}),S.ajaxPrefilter("json jsonp",function(e,t,n){var r,i,o,a=!1!==e.jsonp&&(Ut.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&Ut.test(e.data)&&"data");if(a||"jsonp"===e.dataTypes[0])return r=e.jsonpCallback=m(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(Ut,"$1"+r):!1!==e.jsonp&&(e.url+=(Tt.test(e.url)?"&":"?")+e.jsonp+"="+r),e.converters["script json"]=function(){return o||S.error(r+" was not called"),o[0]},e.dataTypes[0]="json",i=C[r],C[r]=function(){o=arguments},n.always(function(){void 0===i?S(C).removeProp(r):C[r]=i,e[r]&&(e.jsonpCallback=t.jsonpCallback,zt.push(r)),o&&m(i)&&i(o[0]),o=i=void 0}),"script"}),y.createHTMLDocument=((_t=E.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===_t.childNodes.length),S.parseHTML=function(e,t,n){return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(y.createHTMLDocument?((r=(t=E.implementation.createHTMLDocument("")).createElement("base")).href=E.location.href,t.head.appendChild(r)):t=E),o=!n&&[],(i=N.exec(e))?[t.createElement(i[1])]:(i=xe([e],t,o),o&&o.length&&S(o).remove(),S.merge([],i.childNodes)));var r,i,o},S.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return-1<s&&(r=ht(e.slice(s)),e=e.slice(0,s)),m(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),0<a.length&&S.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,a.html(r?S("<div>").append(S.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},S.expr.pseudos.animated=function(t){return S.grep(S.timers,function(e){return t===e.elem}).length},S.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l=S.css(e,"position"),c=S(e),f={};"static"===l&&(e.style.position="relative"),s=c.offset(),o=S.css(e,"top"),u=S.css(e,"left"),("absolute"===l||"fixed"===l)&&-1<(o+u).indexOf("auto")?(a=(r=c.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),m(t)&&(t=t.call(e,n,S.extend({},s))),null!=t.top&&(f.top=t.top-s.top+a),null!=t.left&&(f.left=t.left-s.left+i),"using"in t?t.using.call(e,f):c.css(f)}},S.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){S.offset.setOffset(this,t,e)});var e,n,r=this[0];return r?r.getClientRects().length?(e=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:e.top+n.pageYOffset,left:e.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===S.css(r,"position"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&"static"===S.css(e,"position"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=S(e).offset()).top+=S.css(e,"borderTopWidth",!0),i.left+=S.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-S.css(r,"marginTop",!0),left:t.left-i.left-S.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent;while(e&&"static"===S.css(e,"position"))e=e.offsetParent;return e||re})}}),S.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,i){var o="pageYOffset"===i;S.fn[t]=function(e){return $(this,function(e,t,n){var r;if(x(e)?r=e:9===e.nodeType&&(r=e.defaultView),void 0===n)return r?r[i]:e[t];r?r.scrollTo(o?r.pageXOffset:n,o?n:r.pageYOffset):e[t]=n},t,e,arguments.length)}}),S.each(["top","left"],function(e,n){S.cssHooks[n]=Fe(y.pixelPosition,function(e,t){if(t)return t=We(e,n),Pe.test(t)?S(e).position()[n]+"px":t})}),S.each({Height:"height",Width:"width"},function(a,s){S.each({padding:"inner"+a,content:s,"":"outer"+a},function(r,o){S.fn[o]=function(e,t){var n=arguments.length&&(r||"boolean"!=typeof e),i=r||(!0===e||!0===t?"margin":"border");return $(this,function(e,t,n){var r;return x(e)?0===o.indexOf("outer")?e["inner"+a]:e.document.documentElement["client"+a]:9===e.nodeType?(r=e.documentElement,Math.max(e.body["scroll"+a],r["scroll"+a],e.body["offset"+a],r["offset"+a],r["client"+a])):void 0===n?S.css(e,t,i):S.style(e,t,n,i)},s,n?e:void 0,n)}})}),S.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){S.fn[t]=function(e){return this.on(t,e)}}),S.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,n){S.fn[n]=function(e,t){return 0<arguments.length?this.on(n,null,e,t):this.trigger(n)}});var Xt=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;S.proxy=function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),m(e))return r=s.call(arguments,2),(i=function(){return e.apply(t||this,r.concat(s.call(arguments)))}).guid=e.guid=e.guid||S.guid++,i},S.holdReady=function(e){e?S.readyWait++:S.ready(!0)},S.isArray=Array.isArray,S.parseJSON=JSON.parse,S.nodeName=A,S.isFunction=m,S.isWindow=x,S.camelCase=X,S.type=w,S.now=Date.now,S.isNumeric=function(e){var t=S.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},S.trim=function(e){return null==e?"":(e+"").replace(Xt,"")},"function"==typeof define&&define.amd&&define("jquery",[],function(){return S});var Vt=C.jQuery,Gt=C.$;return S.noConflict=function(e){return C.$===S&&(C.$=Gt),e&&C.jQuery===S&&(C.jQuery=Vt),S},"undefined"==typeof e&&(C.jQuery=C.$=S),S});
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
};
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

if (typeof Object.assign !== 'function') {
  Object.defineProperty(Object, 'assign', {
    value: function assign(target, varArgs) {
      'use strict';

      if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource !== null && nextSource !== undefined) {
          for (var nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }

      return to;
    },
    writable: true,
    configurable: true
  });
};
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
};
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */
;(function(root, factory) {
	// https://github.com/umdjs/umd/blob/master/returnExports.js
	if (typeof exports == 'object') {
		// For Node.js.
		module.exports = factory(root);
	} else if (typeof define == 'function' && define.amd) {
		// For AMD. Register as an anonymous module.
		define([], factory.bind(root, root));
	} else {
		// For browser globals (not exposing the function separately).
		factory(root);
	}
}(typeof global != 'undefined' ? global : this, function(root) {

	if (root.CSS && root.CSS.escape) {
		return root.CSS.escape;
	}

	// https://drafts.csswg.org/cssom/#serialize-an-identifier
	var cssEscape = function(value) {
		if (arguments.length == 0) {
			throw new TypeError('`CSS.escape` requires an argument.');
		}
		var string = String(value);
		var length = string.length;
		var index = -1;
		var codeUnit;
		var result = '';
		var firstCodeUnit = string.charCodeAt(0);
		while (++index < length) {
			codeUnit = string.charCodeAt(index);
			// Note: thereâs no need to special-case astral symbols, surrogate
			// pairs, or lone surrogates.

			// If the character is NULL (U+0000), then the REPLACEMENT CHARACTER
			// (U+FFFD).
			if (codeUnit == 0x0000) {
				result += '\uFFFD';
				continue;
			}

			if (
				// If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
				// U+007F, [â¦]
				(codeUnit >= 0x0001 && codeUnit <= 0x001F) || codeUnit == 0x007F ||
				// If the character is the first character and is in the range [0-9]
				// (U+0030 to U+0039), [â¦]
				(index == 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
				// If the character is the second character and is in the range [0-9]
				// (U+0030 to U+0039) and the first character is a `-` (U+002D), [â¦]
				(
					index == 1 &&
					codeUnit >= 0x0030 && codeUnit <= 0x0039 &&
					firstCodeUnit == 0x002D
				)
			) {
				// https://drafts.csswg.org/cssom/#escape-a-character-as-code-point
				result += '\\' + codeUnit.toString(16) + ' ';
				continue;
			}

			if (
				// If the character is the first character and is a `-` (U+002D), and
				// there is no second character, [â¦]
				index == 0 &&
				length == 1 &&
				codeUnit == 0x002D
			) {
				result += '\\' + string.charAt(index);
				continue;
			}

			// If the character is not handled by one of the above rules and is
			// greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
			// is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
			// U+005A), or [a-z] (U+0061 to U+007A), [â¦]
			if (
				codeUnit >= 0x0080 ||
				codeUnit == 0x002D ||
				codeUnit == 0x005F ||
				codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
				codeUnit >= 0x0041 && codeUnit <= 0x005A ||
				codeUnit >= 0x0061 && codeUnit <= 0x007A
			) {
				// the character itself
				result += string.charAt(index);
				continue;
			}

			// Otherwise, the escaped character.
			// https://drafts.csswg.org/cssom/#escape-a-character
			result += '\\' + string.charAt(index);

		}
		return result;
	};

	if (!root.CSS) {
		root.CSS = {};
	}

	root.CSS.escape = cssEscape;
	return cssEscape;

}));
;
/*! @drupal/once - v1.0.1 - 2021-06-12 */
var once=function(){"use strict";var n=/[\11\12\14\15\40]+/,e="data-once",t=document;function r(n,t,r){return n[t+"Attribute"](e,r)}function o(e){if("string"!=typeof e)throw new TypeError("once ID must be a string");if(""===e||n.test(e))throw new RangeError("once ID must not be empty or contain spaces");return'[data-once~="'+e+'"]'}function u(n){if(!(n instanceof Element))throw new TypeError("The element must be an instance of Element");return!0}function i(n,e){void 0===e&&(e=t);var r=n;if(null===n)r=[];else{if(!n)throw new TypeError("Selector must not be empty");"string"!=typeof n||e!==t&&!u(e)?n instanceof Element&&(r=[n]):r=e.querySelectorAll(n)}return Array.prototype.slice.call(r)}function c(n,e,t){return e.filter((function(e){var r=u(e)&&e.matches(n);return r&&t&&t(e),r}))}function f(e,t){var o=t.add,u=t.remove,i=[];r(e,"has")&&r(e,"get").trim().split(n).forEach((function(n){i.indexOf(n)<0&&n!==u&&i.push(n)})),o&&i.push(o);var c=i.join(" ");r(e,""===c?"remove":"set",c)}function a(n,e,t){return c(":not("+o(n)+")",i(e,t),(function(e){return f(e,{add:n})}))}return a.remove=function(n,e,t){return c(o(n),i(e,t),(function(e){return f(e,{remove:n})}))},a.filter=function(n,e,t){return c(o(n),i(e,t))},a.find=function(n,e){return i(n?o(n):"[data-once]",e)},a}();

;
/*!
 * jQuery Once v2.2.3 - http://github.com/robloach/jquery-once
 * @license MIT, GPL-2.0
 *   http://opensource.org/licenses/MIT
 *   http://opensource.org/licenses/GPL-2.0
 */
(function(e){"use strict";if(typeof exports==="object"&&typeof exports.nodeName!=="string"){e(require("jquery"))}else if(typeof define==="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(t){"use strict";var r=function(e){e=e||"once";if(typeof e!=="string"){throw new TypeError("The jQuery Once id parameter must be a string")}return e};t.fn.once=function(e){var n="jquery-once-"+r(e);return this.filter(function(){return t(this).data(n)!==true}).data(n,true)};t.fn.removeOnce=function(e){return this.findOnce(e).removeData("jquery-once-"+r(e))};t.fn.findOnce=function(e){var n="jquery-once-"+r(e);return this.filter(function(){return t(this).data(n)===true})}});

/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function () {
  var settingsElement = document.querySelector('head > script[type="application/json"][data-drupal-selector="drupal-settings-json"], body > script[type="application/json"][data-drupal-selector="drupal-settings-json"]');
  window.drupalSettings = {};

  if (settingsElement !== null) {
    window.drupalSettings = JSON.parse(settingsElement.textContent);
  }
})();;
window.drupalTranslations = {"strings":{"":{"An AJAX HTTP error occurred.":"Une erreur HTTP AJAX s\u0027est produite.","HTTP Result Code: !status":"Code de statut HTTP : !status","An AJAX HTTP request terminated abnormally.":"Une requ\u00eate HTTP AJAX s\u0027est termin\u00e9e anormalement.","Debugging information follows.":"Informations de d\u00e9bogage ci-dessous.","Path: !uri":"Chemin : !uri","StatusText: !statusText":"StatusText: !statusText","ResponseText: !responseText":"ResponseText : !responseText","ReadyState: !readyState":"ReadyState : !readyState","CustomMessage: !customMessage":"Message personalis\u00e9 : !customMessage","Please wait...":"Veuillez patienter...","The response failed verification so will not be processed.":"La v\u00e9rification de la r\u00e9ponse a \u00e9chou\u00e9, elle ne sera pas trait\u00e9e.","The callback URL is not local and not trusted: !url":"L\u0027URL de retour n\u0027est pas locale et n\u0027est pas de confiance : !url","Changed":"Modifi\u00e9","Open":"Ouvert","Close":"Fermer","@action @title configuration options":"options de configuration @action @title","Quick edit":"Modification rapide","OK":"OK","Could not load the form for \u003Cq\u003E@field-label\u003C\/q\u003E, either due to a website problem or a network connection problem.\u003Cbr\u003EPlease try again.":"Impossible de charger le formulaire de \u003Cq\u003E@field-label\u003C\/q\u003E, soit \u00e0 cause d\u0027un probl\u00e8me dans le site web, soit \u00e0 cause d\u0027un probl\u00e8me de connexion r\u00e9seau. \u003Cbr \/\u003EVeuillez r\u00e9essayer.","Network problem!":"Probl\u00e8me de r\u00e9seau !","Your changes to \u003Cq\u003E@entity-title\u003C\/q\u003E could not be saved, either due to a website problem or a network connection problem.\u003Cbr\u003EPlease try again.":"Vos modifications dans \u003Cq\u003E@entity-title\u003C\/q\u003E n\u0027ont pas pu \u00eatre enregistr\u00e9es, soit \u00e0 cause d\u0027un probl\u00e8me dans le site web, soit \u00e0 cause d\u0027un probl\u00e8me de connexion r\u00e9seau. \u003Cbr \/\u003EVeuillez recommencer.","You have unsaved changes":"Vous avez des changements non enregistr\u00e9s","Discard changes?":"Annuler les changements ?","Save":"Enregistrer","Discard changes":"Annuler les changements","Saving":"Enregistrement","Extend":"Extension","Collapse":"Replier","@label":"@label","Horizontal orientation":"Orientation horizontale","Vertical orientation":"Orientation verticale","The toolbar cannot be set to a horizontal orientation when it is locked.":"La barre d\u0027outils ne peut pas \u00eatre orient\u00e9e horizontalement quand elle est verrouill\u00e9e.","Tray orientation changed to @orientation.":"L\u0027orientation du sous-menu est maintenant @orientation.","closed":"ferm\u00e9","opened":"ouvert","Tray \u0022@tray\u0022 @action.":"Sous-menu \u0022@tray\u0022 @action.","Tray @action.":"Sous-menu @action.","!tour_item of !total":"!tour_item sur !total","End tour":"Terminer la visite","Tabbing is no longer constrained by the Contextual module.":"La tabulation n\u0027est plus contrainte par le module Contextual.","Tabbing is constrained to a set of @contextualsCount and the edit mode toggle.":"La tabulation est contrainte par un ensemble de @contextualsCount et l\u0027activation\/d\u00e9saction du mode d\u0027\u00e9dition.","Press the esc key to exit.":"Pressez la touche Echap pour quitter.","@count contextual link\u0003@count contextual links":"@count lien contextuel\u0003@count liens contextuels","Home":"Accueil","Show all columns":"Montrer toutes les colonnes","Hide lower priority columns":"Cacher les colonnes de plus faible priorit\u00e9","Show table cells that were hidden to make the table fit within a small screen.":"Montrer les cellules de tableau qui ont \u00e9t\u00e9 cach\u00e9es pour que le tableau rentre dans un petit \u00e9cran.","Show row weights":"Afficher le poids des lignes","Hide row weights":"Cacher le poids des lignes","Drag to re-order":"Cliquer-d\u00e9poser pour r\u00e9-organiser","You have unsaved changes.":"Vous avez des changements non enregistr\u00e9s.","List additional actions":"Lister les actions suppl\u00e9mentaires","Edit":"Modifier","(active tab)":"(onglet actif)","Image":"Image","Caption":"L\u00e9gende","Apply":"Appliquer","Glossary":"Liste des sigles","Hide":"Masquer","Show":"Afficher","The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.":"Le fichier s\u00e9lectionn\u00e9 %filename ne peut pas \u00eatre transf\u00e9r\u00e9. Seulement les fichiers avec les extensions suivantes sont permis : %extensions.","Hide description":"Masquer la description","Show description":"Afficher la description","Changes made in this table will not be saved until the form is submitted.":"Les changements effectu\u00e9s dans ce tableau ne seront pris en compte que lorsque la configuration aura \u00e9t\u00e9 enregistr\u00e9e.","Select all rows in this table":"S\u00e9lectionner toutes les lignes du tableau","Deselect all rows in this table":"D\u00e9s\u00e9lectionner toutes les lignes du tableau","Mon":"lun","Monday":"Lundi","Enabled":"Activ\u00e9","Link":"Lien","1 min\u0003@count min":"@count min\u0003@count min","1 sec\u0003@count sec":"@count sec\u0003@count sec","Next":"Suivant","Confirm":"Confirmer","Cancel":"Annuler","Disabled":"D\u00e9sactiv\u00e9","Back":"Pr\u00e9c\u00e9dent","Sunday":"Dimanche","Tuesday":"Mardi","Wednesday":"Mercredi","Thursday":"Jeudi","Friday":"Vendredi","Saturday":"Samedi","Add":"Ajouter","Unknown":"Inconnu","Continue":"Continuer","Done":"Termin\u00e9","1 hour\u0003@count hours":"@count heure\u0003@count heures","1 day\u0003@count days":"@count jour\u0003@count jours","Month":"Mois","Prev":"Pr\u00e9c.","Day":"Jour","Tue":"mar","Wed":"mer","Thu":"jeu","Fri":"ven","Sat":"sam","Sun":"dim","May":"mai","Add group":"Ajouter un groupe","Today":"Aujourd\u0027hui","Jan":"jan","Feb":"f\u00e9v","Mar":"mar","Apr":"avr","Jun":"juin","Jul":"juil","Aug":"ao\u00fb","Sep":"sep","Oct":"oct","Nov":"nov","Dec":"d\u00e9c","Su":"Di","Mo":"Lu","Tu":"Ma","We":"Me","Th":"Je","Fr":"Ve","Sa":"Sa","Not published":"Non publi\u00e9","Loading...":"En cours de chargement...","Unlink":"Supprimer le lien","1 year\u0003@count years":"@count ann\u00e9e\u0003@count ann\u00e9es","1 week\u0003@count weeks":"@count semaine\u0003@count semaines","Not promoted":"Non promu","mm\/dd\/yy":"dd\/mm\/yy","1 month\u0003@count months":"@count mois\u0003@count mois","button":"bouton","of":"sur","Edit Link":"Modifier le lien","Remove group":"Supprimer le groupe","By @name on @date":"Par @name le @date","By @name":"Par @name","Not in menu":"Pas dans le menu","Alias: @alias":"Alias : @alias","No alias":"Aucun alias","0 sec":"0\u00a0s","New revision":"Nouvelle r\u00e9vision","New group":"Nouveau groupe","This permission is inherited from the authenticated user role.":"Ce droit est h\u00e9rit\u00e9e du r\u00f4le de l\u0027utilisateur authentifi\u00e9.","No revision":"Aucune r\u00e9vision","Requires a title":"Titre obligatoire","Not restricted":"Non restreint","Restricted to certain pages":"R\u00e9serv\u00e9 \u00e0 certaines pages","The block cannot be placed in this region.":"Le bloc ne peut pas \u00eatre plac\u00e9 dans cette r\u00e9gion.","Hide summary":"Masquer le r\u00e9sum\u00e9","Edit summary":"Modifier le sommaire","Don\u0027t display post information":"Ne pas afficher les informations de la contribution","Apply (all displays)":"Appliquer (tous les affichages)","Apply (this display)":"Appliquer (cet affichage)","Revert to default":"R\u00e9tablir par d\u00e9faut","Needs to be updated":"N\u00e9cessite une mise \u00e0 jour","Does not need to be updated":"Ne n\u00e9cessite aucune mise \u00e0 jour","Flag other translations as outdated":"Marquer les autres traductions comme p\u00e9rim\u00e9es","Do not flag other translations as outdated":"Ne pas marquer les autres traductions comme p\u00e9rim\u00e9es","No styles configured":"Aucun style configur\u00e9","@count styles configured":"@count styles configur\u00e9s","Based on the text editor configuration, these tags have automatically been added: \u003Cstrong\u003E@tag-list\u003C\/strong\u003E.":"Bas\u00e9 sur la configuration de l\u0027\u00e9diteur de texte, ces balises ont automatiquement \u00e9t\u00e9 ajout\u00e9es : \u003Cstrong\u003E@tag-list\u003C\/strong\u003E.","Uploads disabled":"Transferts d\u00e9sactiv\u00e9s","Uploads enabled, max size: @size @dimensions":"Transferts activ\u00e9s, taille max. : @size @dimensions","Enter caption here":"Saisir la l\u00e9gende ici","Hide group names":"Masquer les noms des groupes","Show group names":"Afficher les noms des groupes","@groupName button group in position @position of @positionCount in row @row of @rowCount.":"Groupe de boutons @groupName \u00e0 la position @position de @positionCount \u00e0 la ligne @row de @rowCount.","Press the down arrow key to create a new row.":"Appuyer sur la touche \u0022fl\u00e8che du bas\u0022 pour cr\u00e9er une nouvelle ligne.","@name @type.":"@name @type.","Press the down arrow key to activate.":"Appuyer sur la touche \u0022fl\u00e8che du bas\u0022 pour activer.","@name @type in position @position of @positionCount in @groupName button group in row @row of @rowCount.":"@name @type \u00e0 la position @position de @positionCount dans le groupe de boutons @groupName \u00e0 la ligne @row de @rowCount.","Press the down arrow key to create a new button group in a new row.":"Presser la touche fl\u00e8che bas pour cr\u00e9er un nouveau groupe de bouton dans une nouvelle ligne.","This is the last group. Move the button forward to create a new group.":"Ceci est le dernier groupe. D\u00e9placer le bouton vers l\u0027avant pour cr\u00e9er un nouveau groupe.","The \u0022@name\u0022 button is currently enabled.":"Le bouton \u0022@name\u0022 est actuellement activ\u00e9.","Use the keyboard arrow keys to change the position of this button.":"Utiliser les fl\u00e8ches du clavier pour changer la position de ce bouton.","Press the up arrow key on the top row to disable the button.":"Appuyer sur la touche fl\u00e8che du haut sur la ligne du haut pour d\u00e9sactiver le bouton.","The \u0022@name\u0022 button is currently disabled.":"Le bouton \u0022@name\u0022 est actuellement d\u00e9sactiv\u00e9.","Use the down arrow key to move this button into the active toolbar.":"Utiliser la touche \u0022fl\u00e8che du bas\u0022 pour d\u00e9placer ce bouton dans la barre d\u0027outils active.","This @name is currently enabled.":"Ce @name est actuellement activ\u00e9.","Use the keyboard arrow keys to change the position of this separator.":"Utiliser les fl\u00e8ches du clavier pour changer la position de ce s\u00e9parateur.","Separators are used to visually split individual buttons.":"Les s\u00e9parateurs sont utilis\u00e9s pour s\u00e9parer visuellement des boutons individuels.","This @name is currently disabled.":"Ce @name est actuellement d\u00e9sactiv\u00e9","Use the down arrow key to move this separator into the active toolbar.":"Utiliser la touche \u0022fl\u00e8che du bas\u0022 pour d\u00e9placer ce s\u00e9parateur dans la barre d\u0027outils active.","You may add multiple separators to each button group.":"Vous pouvez ajouter plusieurs s\u00e9parateurs \u00e0 chaque groupe de boutons.","Please provide a name for the button group.":"Veuillez fournir un nom pour le groupe de boutons.","Button group name":"Nom du groupe de boutons","Editing the name of the new button group in a dialog.":"Modification du nom du nouveau groupe de boutons dans une bo\u00eete de dialogue.","Editing the name of the \u0022@groupName\u0022 button group in a dialog.":"Modification du nom du groupe de boutons @groupName dans une bo\u00eete de dialogue.","Place a button to create a new button group.":"Placer un bouton pour cr\u00e9er un nouveau groupe de boutons.","Add a CKEditor button group to the end of this row.":"Ajouter un groupe de boutons CKEditor \u00e0 la fin de cette ligne.","Changing the text format to %text_format will permanently remove content that is not allowed in that text format.\u003Cbr\u003E\u003Cbr\u003ESave your changes before switching the text format to avoid losing data.":"Basculer le format de texte en %text_format retirera d\u00e9finitivement le contenu qui n\u0027est pas autoris\u00e9 dans ce format de texte.\u003Cbr\u003E\u003Cbr\u003EPour \u00e9viter de perdre des donn\u00e9es, enregistrez vos changements avant de basculer le format de texte.","Change text format?":"Changer le format de texte ?","Rich Text Editor, !label field":"\u00c9diteur de texte riche, champ !label","!modules modules are available in the modified list.":"Les modules !modules sont disponibles dans la liste modifi\u00e9e.","Authored on @date":"R\u00e9dig\u00e9 le @date","1 block is available in the modified list.\u0003@count blocks are available in the modified list.":"@count bloc est disponible dans la liste modifi\u00e9e.\u0003@count blocs sont disponibles dans la liste modifi\u00e9e.","Zero items selected":"Zero \u00e9l\u00e9ment s\u00e9lectionn\u00e9","All @count items selected":"Tous les @count \u00e9l\u00e9ments ont \u00e9t\u00e9 s\u00e9lectionn\u00e9s","Select all media":"S\u00e9lectionner tous les m\u00e9dias","Show media item weights":"Afficher les poids des \u00e9l\u00e9ments m\u00e9dia","Hide media item weights":"Masquer les poids des \u00e9l\u00e9ments m\u00e9dia","Unsaved changes to the form will be lost. Are you sure you want to leave?":"Les modifications non-sauvegard\u00e9es dans ce formulaire seront perdues. \u00cates-vous s\u00fbr(e) de vouloir quitter\u00a0?","All available blocks are listed.":"Tous les blocs disponibles sont list\u00e9s.","Loading grid view.":"Chargement de la vue de grille.","Changed to grid view.":"Chang\u00e9 en la vue de grille.","Loading table view.":"Chargement de la vue de tableau.","Changed to table view.":"Chang\u00e9 en la vue de tableau.","@selected of @count item selected\u0003@selected of @count items selected":"@selected \u00e9l\u00e9ment sur @count a \u00e9t\u00e9 s\u00e9lectionn\u00e9\u0003@selected \u00e9l\u00e9ments sur @count ont \u00e9t\u00e9 s\u00e9lectionn\u00e9s","1 item selected\u0003@count items selected":"1 \u00e9l\u00e9ment s\u00e9lectionn\u00e9\u0003@count \u00e9l\u00e9ments s\u00e9lectionn\u00e9s","Block previews are visible. Block labels are hidden.":"Les aper\u00e7us des blocs sont visibles. Les \u00e9tiquettes des blocs sont cach\u00e9es.","Block previews are hidden. Block labels are visible.":"Les aper\u00e7us des blocs sont cach\u00e9s. Les \u00e9tiquettes des blocs sont visibles.","\u003Cspan class=\u0022visually-hidden\u0022\u003EShow \u003C\/span\u003E@title\u003Cspan class=\u0022visually-hidden\u0022\u003E media\u003C\/span\u003E\u003Cspan class=\u0022active-tab visually-hidden\u0022\u003E (selected)\u003C\/span\u003E":"\u003Cspan class=\u0022visually-hidden\u0022\u003EAfficher le m\u00e9dia  \u003C\/span\u003E@title\u003Cspan class=\u0022active-tab visually-hidden\u0022\u003E (s\u00e9lectionn\u00e9)\u003C\/span\u003E","Showing @title media.":"Affichage du m\u00e9dia @title.","Information":"Informations","Previous":"Pr\u00e9c\u00e9dent","Crop image":"Recadrer l\u0027image","Automatic alias":"Alias automatique","Scheduled for publishing":"Planifi\u00e9 pour publication","Scheduled for unpublishing":"Planifi\u00e9 pour d\u00e9publication","Not scheduled":"Non planifi\u00e9","Publishing enabled":"Publication activ\u00e9e","Unpublishing enabled":"D\u00e9publication activ\u00e9e","Insert this token into your form":"Ins\u00e9rer ce jeton (\u003Cem\u003Etoken\u003C\/em\u003E) dans votre formulaire","First click a text field to insert your tokens into.":"Cliquez d\u0027abord sur un champ de texte pour ins\u00e9rer vos jetons (\u003Cem\u003Etokens\u003C\/em\u003E) dans celui -ci.","Show selected":"Afficher l\u0027\u00e9l\u00e9ment s\u00e9lectionn\u00e9","Hide selected":"Masquer l\u0027\u00e9l\u00e9ment s\u00e9lectionn\u00e9","Crop image (cropping applied)":"Redimensionner une image (redimensionnement appliqu\u00e9)","Cropping applied.":"Redimensionnement appliqu\u00e9","Close popup":"Fermer le popup","Enlarge infographic":"Agrandir l\u0027infographie","cta link":"Lien CTA","Hide the textual transcription":"Masquer la transcription","Show the textual transcription":"Afficher la transcription","Week from !from to !to":"Semaine du !from au !to","Create new":"Cr\u00e9er un nouveau","Search by map":"Rechercher par carte","Week":"Semaine","Close the submenu":"Fermer le sous-menu ","No events":"Aucun \u00e9v\u00e8nement","Next slide":"Diapositive suivante","Previous slide":"Diapositive pr\u00e9c\u00e9dente","End of class":"Fin des cours ","Resumption of classes":"Reprise des cours ","new window":"nouvelle fen\u00eatre","Do you want to continue?":"Voulez-vous continuer ?","Select date":"S\u00e9lectionner la date","Open menu":"Ouvrir le menu","Close menu":"Fermer le menu","Show more thematics":"Afficher toutes les th\u00e9matiques","Hide thematics":"Voir moins de th\u00e9matiques","Choose an academy":"Choisir une acad\u00e9mie","Choose a department":"Choisir un d\u00e9partement","Choose a region":"Choisir une r\u00e9gion","Select None":"Aucun","Select All":"Tout s\u00e9lectionner","Back to the portal":"Retour au portail","Are you sure you want to remove this question?":"Etes-vous s\u00fbr de vouloir supprimer cette question ?","Enlarged image":"Image agrandie","Selected @count item in this view\u0003Selected @count items in this view":"@count \u00e9l\u00e9ment s\u00e9lectionn\u00e9\u0003@count \u00e9l\u00e9ments s\u00e9lectionn\u00e9s"," Results":"R\u00e9sultats"," Result":"R\u00e9sultat","Read more":"En savoir plus","Content limited to @limit characters, remaining: \u003Cstrong\u003E@remaining\u003C\/strong\u003E":"Contenu limit\u00e9 \u00e0 @limit caract\u00e8res, restant : \u003Cstrong\u003E@remaining\u003C\/strong\u003E","Confirm my choices":"Confirmer mes choix"},"Long month name":{"July":"Juillet","January":"janvier","February":"f\u00e9vrier","March":"mars","April":"avril","May":"mai","June":"juin","August":"ao\u00fbt","September":"septembre","October":"octobre","November":"novembre","December":"d\u00e9cembre"},"Main accessibility button screenreader text":{"Accessibility":"Accessibilit\u00e9"}},"pluralFormula":{"0":0,"1":0,"default":1}};;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

window.Drupal = {
  behaviors: {},
  locale: {}
};

(function (Drupal, drupalSettings, drupalTranslations, console, Proxy, Reflect) {
  Drupal.throwError = function (error) {
    setTimeout(function () {
      throw error;
    }, 0);
  };

  Drupal.attachBehaviors = function (context, settings) {
    context = context || document;
    settings = settings || drupalSettings;
    var behaviors = Drupal.behaviors;
    Object.keys(behaviors || {}).forEach(function (i) {
      if (typeof behaviors[i].attach === 'function') {
        try {
          behaviors[i].attach(context, settings);
        } catch (e) {
          Drupal.throwError(e);
        }
      }
    });
  };

  Drupal.detachBehaviors = function (context, settings, trigger) {
    context = context || document;
    settings = settings || drupalSettings;
    trigger = trigger || 'unload';
    var behaviors = Drupal.behaviors;
    Object.keys(behaviors || {}).forEach(function (i) {
      if (typeof behaviors[i].detach === 'function') {
        try {
          behaviors[i].detach(context, settings, trigger);
        } catch (e) {
          Drupal.throwError(e);
        }
      }
    });
  };

  Drupal.checkPlain = function (str) {
    str = str.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    return str;
  };

  Drupal.formatString = function (str, args) {
    var processedArgs = {};
    Object.keys(args || {}).forEach(function (key) {
      switch (key.charAt(0)) {
        case '@':
          processedArgs[key] = Drupal.checkPlain(args[key]);
          break;

        case '!':
          processedArgs[key] = args[key];
          break;

        default:
          processedArgs[key] = Drupal.theme('placeholder', args[key]);
          break;
      }
    });
    return Drupal.stringReplace(str, processedArgs, null);
  };

  Drupal.stringReplace = function (str, args, keys) {
    if (str.length === 0) {
      return str;
    }

    if (!Array.isArray(keys)) {
      keys = Object.keys(args || {});
      keys.sort(function (a, b) {
        return a.length - b.length;
      });
    }

    if (keys.length === 0) {
      return str;
    }

    var key = keys.pop();
    var fragments = str.split(key);

    if (keys.length) {
      for (var i = 0; i < fragments.length; i++) {
        fragments[i] = Drupal.stringReplace(fragments[i], args, keys.slice(0));
      }
    }

    return fragments.join(args[key]);
  };

  Drupal.t = function (str, args, options) {
    options = options || {};
    options.context = options.context || '';

    if (typeof drupalTranslations !== 'undefined' && drupalTranslations.strings && drupalTranslations.strings[options.context] && drupalTranslations.strings[options.context][str]) {
      str = drupalTranslations.strings[options.context][str];
    }

    if (args) {
      str = Drupal.formatString(str, args);
    }

    return str;
  };

  Drupal.url = function (path) {
    return drupalSettings.path.baseUrl + drupalSettings.path.pathPrefix + path;
  };

  Drupal.url.toAbsolute = function (url) {
    var urlParsingNode = document.createElement('a');

    try {
      url = decodeURIComponent(url);
    } catch (e) {}

    urlParsingNode.setAttribute('href', url);
    return urlParsingNode.cloneNode(false).href;
  };

  Drupal.url.isLocal = function (url) {
    var absoluteUrl = Drupal.url.toAbsolute(url);
    var protocol = window.location.protocol;

    if (protocol === 'http:' && absoluteUrl.indexOf('https:') === 0) {
      protocol = 'https:';
    }

    var baseUrl = "".concat(protocol, "//").concat(window.location.host).concat(drupalSettings.path.baseUrl.slice(0, -1));

    try {
      absoluteUrl = decodeURIComponent(absoluteUrl);
    } catch (e) {}

    try {
      baseUrl = decodeURIComponent(baseUrl);
    } catch (e) {}

    return absoluteUrl === baseUrl || absoluteUrl.indexOf("".concat(baseUrl, "/")) === 0;
  };

  Drupal.formatPlural = function (count, singular, plural, args, options) {
    args = args || {};
    args['@count'] = count;
    var pluralDelimiter = drupalSettings.pluralDelimiter;
    var translations = Drupal.t(singular + pluralDelimiter + plural, args, options).split(pluralDelimiter);
    var index = 0;

    if (typeof drupalTranslations !== 'undefined' && drupalTranslations.pluralFormula) {
      index = count in drupalTranslations.pluralFormula ? drupalTranslations.pluralFormula[count] : drupalTranslations.pluralFormula.default;
    } else if (args['@count'] !== 1) {
      index = 1;
    }

    return translations[index];
  };

  Drupal.encodePath = function (item) {
    return window.encodeURIComponent(item).replace(/%2F/g, '/');
  };

  Drupal.deprecationError = function (_ref) {
    var message = _ref.message;

    if (drupalSettings.suppressDeprecationErrors === false && typeof console !== 'undefined' && console.warn) {
      console.warn("[Deprecation] ".concat(message));
    }
  };

  Drupal.deprecatedProperty = function (_ref2) {
    var target = _ref2.target,
        deprecatedProperty = _ref2.deprecatedProperty,
        message = _ref2.message;

    if (!Proxy || !Reflect) {
      return target;
    }

    return new Proxy(target, {
      get: function get(target, key) {
        if (key === deprecatedProperty) {
          Drupal.deprecationError({
            message: message
          });
        }

        for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          rest[_key - 2] = arguments[_key];
        }

        return Reflect.get.apply(Reflect, [target, key].concat(rest));
      }
    });
  };

  Drupal.theme = function (func) {
    if (func in Drupal.theme) {
      var _Drupal$theme;

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return (_Drupal$theme = Drupal.theme)[func].apply(_Drupal$theme, args);
    }
  };

  Drupal.theme.placeholder = function (str) {
    return "<em class=\"placeholder\">".concat(Drupal.checkPlain(str), "</em>");
  };
})(Drupal, window.drupalSettings, window.drupalTranslations, window.console, window.Proxy, window.Reflect);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

if (window.jQuery) {
  jQuery.noConflict();
}

document.documentElement.className += ' js';

(function (Drupal, drupalSettings) {
  var domReady = function domReady(callback) {
    var listener = function listener() {
      callback();
      document.removeEventListener('DOMContentLoaded', listener);
    };

    if (document.readyState !== 'loading') {
      setTimeout(callback, 0);
    } else {
      document.addEventListener('DOMContentLoaded', listener);
    }
  };

  domReady(function () {
    Drupal.attachBehaviors(document, drupalSettings);
  });
})(Drupal, window.drupalSettings);;
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}((function(e){"use strict";return e.ui=e.ui||{},e.ui.version="1.13.2"}));

/*!
 * jQuery UI :data 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}((function(e){"use strict";return e.extend(e.expr.pseudos,{data:e.expr.createPseudo?e.expr.createPseudo((function(n){return function(t){return!!e.data(t,n)}})):function(n,t,r){return!!e.data(n,r[3])}})}));

/*!
 * jQuery UI Disable Selection 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}((function(e){"use strict";return e.fn.extend({disableSelection:(n="onselectstart"in document.createElement("div")?"selectstart":"mousedown",function(){return this.on(n+".ui-disableSelection",(function(e){e.preventDefault()}))}),enableSelection:function(){return this.off(".ui-disableSelection")}});var n}));

/*!
 * jQuery UI Focusable 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}((function(e){"use strict";return e.ui.focusable=function(i,t){var n,s,r,u,a,o=i.nodeName.toLowerCase();return"area"===o?(s=(n=i.parentNode).name,!(!i.href||!s||"map"!==n.nodeName.toLowerCase())&&((r=e("img[usemap='#"+s+"']")).length>0&&r.is(":visible"))):(/^(input|select|textarea|button|object)$/.test(o)?(u=!i.disabled)&&(a=e(i).closest("fieldset")[0])&&(u=!a.disabled):u="a"===o&&i.href||t,u&&e(i).is(":visible")&&function(e){var i=e.css("visibility");for(;"inherit"===i;)i=(e=e.parent()).css("visibility");return"visible"===i}(e(i)))},e.extend(e.expr.pseudos,{focusable:function(i){return e.ui.focusable(i,null!=e.attr(i,"tabindex"))}}),e.ui.focusable}));

!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],t):t(jQuery)}((function(t){"use strict";return t.fn._form=function(){return"string"==typeof this[0].form?this.closest("form"):t(this[0].form)}}));

!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}((function(e){"use strict";return e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())}));

/*!
 * jQuery UI Support for jQuery core 1.8.x and newer 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}((function(e){"use strict";if(e.expr.pseudos||(e.expr.pseudos=e.expr[":"]),e.uniqueSort||(e.uniqueSort=e.unique),!e.escapeSelector){var n=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,t=function(e,n){return n?"\0"===e?"ï¿½":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e};e.escapeSelector=function(e){return(e+"").replace(n,t)}}e.fn.even&&e.fn.odd||e.fn.extend({even:function(){return this.filter((function(e){return e%2==0}))},odd:function(){return this.filter((function(e){return e%2==1}))}})}));

/*!
 * jQuery UI Keycode 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}((function(e){"use strict";return e.ui.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}));

!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}((function(e){"use strict";return e.ui.plugin={add:function(n,i,t){var u,o=e.ui[n].prototype;for(u in t)o.plugins[u]=o.plugins[u]||[],o.plugins[u].push([i,t[u]])},call:function(e,n,i,t){var u,o=e.plugins[n];if(o&&(t||e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType))for(u=0;u<o.length;u++)e.options[o[u][0]]&&o[u][1].apply(e.element,i)}}}));

!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}((function(e){"use strict";return e.ui.safeActiveElement=function(e){var n;try{n=e.activeElement}catch(t){n=e.body}return n||(n=e.body),n.nodeName||(n=e.body),n}}));

!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}((function(e){"use strict";return e.ui.safeBlur=function(n){n&&"body"!==n.nodeName.toLowerCase()&&e(n).trigger("blur")}}));

/*!
 * jQuery UI Scroll Parent 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],t):t(jQuery)}((function(t){"use strict";return t.fn.scrollParent=function(e){var s=this.css("position"),n="absolute"===s,o=e?/(auto|scroll|hidden)/:/(auto|scroll)/,i=this.parents().filter((function(){var e=t(this);return(!n||"static"!==e.css("position"))&&o.test(e.css("overflow")+e.css("overflow-y")+e.css("overflow-x"))})).eq(0);return"fixed"!==s&&i.length?i:t(this[0].ownerDocument||document)}}));

/*!
 * jQuery UI Unique ID 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],i):i(jQuery)}((function(i){"use strict";return i.fn.extend({uniqueId:(e=0,function(){return this.each((function(){this.id||(this.id="ui-id-"+ ++e)}))}),removeUniqueId:function(){return this.each((function(){/^ui-id-\d+$/.test(this.id)&&i(this).removeAttr("id")}))}});var e}));

/*!
 * jQuery UI Widget 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],t):t(jQuery)}((function(t){"use strict";var e,i=0,s=Array.prototype.hasOwnProperty,n=Array.prototype.slice;return t.cleanData=(e=t.cleanData,function(i){var s,n,o;for(o=0;null!=(n=i[o]);o++)(s=t._data(n,"events"))&&s.remove&&t(n).triggerHandler("remove");e(i)}),t.widget=function(e,i,s){var n,o,a,r={},l=e.split(".")[0],u=l+"-"+(e=e.split(".")[1]);return s||(s=i,i=t.Widget),Array.isArray(s)&&(s=t.extend.apply(null,[{}].concat(s))),t.expr.pseudos[u.toLowerCase()]=function(e){return!!t.data(e,u)},t[l]=t[l]||{},n=t[l][e],o=t[l][e]=function(t,e){if(!this||!this._createWidget)return new o(t,e);arguments.length&&this._createWidget(t,e)},t.extend(o,n,{version:s.version,_proto:t.extend({},s),_childConstructors:[]}),(a=new i).options=t.widget.extend({},a.options),t.each(s,(function(t,e){r[t]="function"==typeof e?function(){function s(){return i.prototype[t].apply(this,arguments)}function n(e){return i.prototype[t].apply(this,e)}return function(){var t,i=this._super,o=this._superApply;return this._super=s,this._superApply=n,t=e.apply(this,arguments),this._super=i,this._superApply=o,t}}():e})),o.prototype=t.widget.extend(a,{widgetEventPrefix:n&&a.widgetEventPrefix||e},r,{constructor:o,namespace:l,widgetName:e,widgetFullName:u}),n?(t.each(n._childConstructors,(function(e,i){var s=i.prototype;t.widget(s.namespace+"."+s.widgetName,o,i._proto)})),delete n._childConstructors):i._childConstructors.push(o),t.widget.bridge(e,o),o},t.widget.extend=function(e){for(var i,o,a=n.call(arguments,1),r=0,l=a.length;r<l;r++)for(i in a[r])o=a[r][i],s.call(a[r],i)&&void 0!==o&&(t.isPlainObject(o)?e[i]=t.isPlainObject(e[i])?t.widget.extend({},e[i],o):t.widget.extend({},o):e[i]=o);return e},t.widget.bridge=function(e,i){var s=i.prototype.widgetFullName||e;t.fn[e]=function(o){var a="string"==typeof o,r=n.call(arguments,1),l=this;return a?this.length||"instance"!==o?this.each((function(){var i,n=t.data(this,s);return"instance"===o?(l=n,!1):n?"function"!=typeof n[o]||"_"===o.charAt(0)?t.error("no such method '"+o+"' for "+e+" widget instance"):(i=n[o].apply(n,r))!==n&&void 0!==i?(l=i&&i.jquery?l.pushStack(i.get()):i,!1):void 0:t.error("cannot call methods on "+e+" prior to initialization; attempted to call method '"+o+"'")})):l=void 0:(r.length&&(o=t.widget.extend.apply(null,[o].concat(r))),this.each((function(){var e=t.data(this,s);e?(e.option(o||{}),e._init&&e._init()):t.data(this,s,new i(o,this))}))),l}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:!1,create:null},_createWidget:function(e,s){s=t(s||this.defaultElement||this)[0],this.element=t(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=t(),this.hoverable=t(),this.focusable=t(),this.classesElementLookup={},s!==this&&(t.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===s&&this.destroy()}}),this.document=t(s.style?s.ownerDocument:s.document||s),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this.options=t.widget.extend({},this.options,this._getCreateOptions(),e),this._create(),this.options.disabled&&this._setOptionDisabled(this.options.disabled),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){var e=this;this._destroy(),t.each(this.classesElementLookup,(function(t,i){e._removeClass(i,t)})),this.element.off(this.eventNamespace).removeData(this.widgetFullName),this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),this.bindings.off(this.eventNamespace)},_destroy:t.noop,widget:function(){return this.element},option:function(e,i){var s,n,o,a=e;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof e)if(a={},s=e.split("."),e=s.shift(),s.length){for(n=a[e]=t.widget.extend({},this.options[e]),o=0;o<s.length-1;o++)n[s[o]]=n[s[o]]||{},n=n[s[o]];if(e=s.pop(),1===arguments.length)return void 0===n[e]?null:n[e];n[e]=i}else{if(1===arguments.length)return void 0===this.options[e]?null:this.options[e];a[e]=i}return this._setOptions(a),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return"classes"===t&&this._setOptionClasses(e),this.options[t]=e,"disabled"===t&&this._setOptionDisabled(e),this},_setOptionClasses:function(e){var i,s,n;for(i in e)n=this.classesElementLookup[i],e[i]!==this.options.classes[i]&&n&&n.length&&(s=t(n.get()),this._removeClass(n,i),s.addClass(this._classes({element:s,keys:i,classes:e,add:!0})))},_setOptionDisabled:function(t){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!t),t&&(this._removeClass(this.hoverable,null,"ui-state-hover"),this._removeClass(this.focusable,null,"ui-state-focus"))},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_classes:function(e){var i=[],s=this;function n(){var i=[];e.element.each((function(e,n){t.map(s.classesElementLookup,(function(t){return t})).some((function(t){return t.is(n)}))||i.push(n)})),s._on(t(i),{remove:"_untrackClassesElement"})}function o(o,a){var r,l;for(l=0;l<o.length;l++)r=s.classesElementLookup[o[l]]||t(),e.add?(n(),r=t(t.uniqueSort(r.get().concat(e.element.get())))):r=t(r.not(e.element).get()),s.classesElementLookup[o[l]]=r,i.push(o[l]),a&&e.classes[o[l]]&&i.push(e.classes[o[l]])}return(e=t.extend({element:this.element,classes:this.options.classes||{}},e)).keys&&o(e.keys.match(/\S+/g)||[],!0),e.extra&&o(e.extra.match(/\S+/g)||[]),i.join(" ")},_untrackClassesElement:function(e){var i=this;t.each(i.classesElementLookup,(function(s,n){-1!==t.inArray(e.target,n)&&(i.classesElementLookup[s]=t(n.not(e.target).get()))})),this._off(t(e.target))},_removeClass:function(t,e,i){return this._toggleClass(t,e,i,!1)},_addClass:function(t,e,i){return this._toggleClass(t,e,i,!0)},_toggleClass:function(t,e,i,s){s="boolean"==typeof s?s:i;var n="string"==typeof t||null===t,o={extra:n?e:i,keys:n?t:e,element:n?this.element:t,add:s};return o.element.toggleClass(this._classes(o),s),this},_on:function(e,i,s){var n,o=this;"boolean"!=typeof e&&(s=i,i=e,e=!1),s?(i=n=t(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),t.each(s,(function(s,a){function r(){if(e||!0!==o.options.disabled&&!t(this).hasClass("ui-state-disabled"))return("string"==typeof a?o[a]:a).apply(o,arguments)}"string"!=typeof a&&(r.guid=a.guid=a.guid||r.guid||t.guid++);var l=s.match(/^([\w:-]*)\s*(.*)$/),u=l[1]+o.eventNamespace,h=l[2];h?n.on(u,h,r):i.on(u,r)}))},_off:function(e,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.off(i),this.bindings=t(this.bindings.not(e).get()),this.focusable=t(this.focusable.not(e).get()),this.hoverable=t(this.hoverable.not(e).get())},_delay:function(t,e){var i=this;return setTimeout((function(){return("string"==typeof t?i[t]:t).apply(i,arguments)}),e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){this._addClass(t(e.currentTarget),null,"ui-state-hover")},mouseleave:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){this._addClass(t(e.currentTarget),null,"ui-state-focus")},focusout:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-focus")}})},_trigger:function(e,i,s){var n,o,a=this.options[e];if(s=s||{},(i=t.Event(i)).type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(n in o)n in i||(i[n]=o[n]);return this.element.trigger(i,s),!("function"==typeof a&&!1===a.apply(this.element[0],[i].concat(s))||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},(function(e,i){t.Widget.prototype["_"+e]=function(s,n,o){var a;"string"==typeof n&&(n={effect:n});var r=n?!0===n||"number"==typeof n?i:n.effect||i:e;"number"==typeof(n=n||{})?n={duration:n}:!0===n&&(n={}),a=!t.isEmptyObject(n),n.complete=o,n.delay&&s.delay(n.delay),a&&t.effects&&t.effects.effect[r]?s[e](n):r!==e&&s[r]?s[r](n.duration,n.easing,o):s.queue((function(i){t(this)[e](),o&&o.call(s[0]),i()}))}})),t.widget}));

/*!
 * jQuery UI Autocomplete 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./menu","../keycode","../position","../safe-active-element","../version","../widget"],e):e(jQuery)}((function(e){"use strict";return e.widget("ui.autocomplete",{version:"1.13.2",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,liveRegionTimer:null,_create:function(){var t,i,s,n=this.element[0].nodeName.toLowerCase(),o="textarea"===n,u="input"===n;this.isMultiLine=o||!u&&this._isContentEditable(this.element),this.valueMethod=this.element[o||u?"val":"text"],this.isNewMenu=!0,this._addClass("ui-autocomplete-input"),this.element.attr("autocomplete","off"),this._on(this.element,{keydown:function(n){if(this.element.prop("readOnly"))return t=!0,s=!0,void(i=!0);t=!1,s=!1,i=!1;var o=e.ui.keyCode;switch(n.keyCode){case o.PAGE_UP:t=!0,this._move("previousPage",n);break;case o.PAGE_DOWN:t=!0,this._move("nextPage",n);break;case o.UP:t=!0,this._keyEvent("previous",n);break;case o.DOWN:t=!0,this._keyEvent("next",n);break;case o.ENTER:this.menu.active&&(t=!0,n.preventDefault(),this.menu.select(n));break;case o.TAB:this.menu.active&&this.menu.select(n);break;case o.ESCAPE:this.menu.element.is(":visible")&&(this.isMultiLine||this._value(this.term),this.close(n),n.preventDefault());break;default:i=!0,this._searchTimeout(n)}},keypress:function(s){if(t)return t=!1,void(this.isMultiLine&&!this.menu.element.is(":visible")||s.preventDefault());if(!i){var n=e.ui.keyCode;switch(s.keyCode){case n.PAGE_UP:this._move("previousPage",s);break;case n.PAGE_DOWN:this._move("nextPage",s);break;case n.UP:this._keyEvent("previous",s);break;case n.DOWN:this._keyEvent("next",s)}}},input:function(e){if(s)return s=!1,void e.preventDefault();this._searchTimeout(e)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(e){clearTimeout(this.searching),this.close(e),this._change(e)}}),this._initSource(),this.menu=e("<ul>").appendTo(this._appendTo()).menu({role:null}).hide().attr({unselectable:"on"}).menu("instance"),this._addClass(this.menu.element,"ui-autocomplete","ui-front"),this._on(this.menu.element,{mousedown:function(e){e.preventDefault()},menufocus:function(t,i){var s,n;if(this.isNewMenu&&(this.isNewMenu=!1,t.originalEvent&&/^mouse/.test(t.originalEvent.type)))return this.menu.blur(),void this.document.one("mousemove",(function(){e(t.target).trigger(t.originalEvent)}));n=i.item.data("ui-autocomplete-item"),!1!==this._trigger("focus",t,{item:n})&&t.originalEvent&&/^key/.test(t.originalEvent.type)&&this._value(n.value),(s=i.item.attr("aria-label")||n.value)&&String.prototype.trim.call(s).length&&(clearTimeout(this.liveRegionTimer),this.liveRegionTimer=this._delay((function(){this.liveRegion.html(e("<div>").text(s))}),100))},menuselect:function(t,i){var s=i.item.data("ui-autocomplete-item"),n=this.previous;this.element[0]!==e.ui.safeActiveElement(this.document[0])&&(this.element.trigger("focus"),this.previous=n,this._delay((function(){this.previous=n,this.selectedItem=s}))),!1!==this._trigger("select",t,{item:s})&&this._value(s.value),this.term=this._value(),this.close(t),this.selectedItem=s}}),this.liveRegion=e("<div>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body),this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible"),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(e,t){this._super(e,t),"source"===e&&this._initSource(),"appendTo"===e&&this.menu.element.appendTo(this._appendTo()),"disabled"===e&&t&&this.xhr&&this.xhr.abort()},_isEventTargetInWidget:function(t){var i=this.menu.element[0];return t.target===this.element[0]||t.target===i||e.contains(i,t.target)},_closeOnClickOutside:function(e){this._isEventTargetInWidget(e)||this.close()},_appendTo:function(){var t=this.options.appendTo;return t&&(t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)),t&&t[0]||(t=this.element.closest(".ui-front, dialog")),t.length||(t=this.document[0].body),t},_initSource:function(){var t,i,s=this;Array.isArray(this.options.source)?(t=this.options.source,this.source=function(i,s){s(e.ui.autocomplete.filter(t,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(t,n){s.xhr&&s.xhr.abort(),s.xhr=e.ajax({url:i,data:t,dataType:"json",success:function(e){n(e)},error:function(){n([])}})}):this.source=this.options.source},_searchTimeout:function(e){clearTimeout(this.searching),this.searching=this._delay((function(){var t=this.term===this._value(),i=this.menu.element.is(":visible"),s=e.altKey||e.ctrlKey||e.metaKey||e.shiftKey;t&&(!t||i||s)||(this.selectedItem=null,this.search(null,e))}),this.options.delay)},search:function(e,t){return e=null!=e?e:this._value(),this.term=this._value(),e.length<this.options.minLength?this.close(t):!1!==this._trigger("search",t)?this._search(e):void 0},_search:function(e){this.pending++,this._addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:e},this._response())},_response:function(){var e=++this.requestIndex;return function(t){e===this.requestIndex&&this.__response(t),this.pending--,this.pending||this._removeClass("ui-autocomplete-loading")}.bind(this)},__response:function(e){e&&(e=this._normalize(e)),this._trigger("response",null,{content:e}),!this.options.disabled&&e&&e.length&&!this.cancelSearch?(this._suggest(e),this._trigger("open")):this._close()},close:function(e){this.cancelSearch=!0,this._close(e)},_close:function(e){this._off(this.document,"mousedown"),this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",e))},_change:function(e){this.previous!==this._value()&&this._trigger("change",e,{item:this.selectedItem})},_normalize:function(t){return t.length&&t[0].label&&t[0].value?t:e.map(t,(function(t){return"string"==typeof t?{label:t,value:t}:e.extend({},t,{label:t.label||t.value,value:t.value||t.label})}))},_suggest:function(t){var i=this.menu.element.empty();this._renderMenu(i,t),this.isNewMenu=!0,this.menu.refresh(),i.show(),this._resizeMenu(),i.position(e.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next(),this._on(this.document,{mousedown:"_closeOnClickOutside"})},_resizeMenu:function(){var e=this.menu.element;e.outerWidth(Math.max(e.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(t,i){var s=this;e.each(i,(function(e,i){s._renderItemData(t,i)}))},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-autocomplete-item",t)},_renderItem:function(t,i){return e("<li>").append(e("<div>").text(i.label)).appendTo(t)},_move:function(e,t){if(this.menu.element.is(":visible"))return this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)?(this.isMultiLine||this._value(this.term),void this.menu.blur()):void this.menu[e](t);this.search(null,t)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(e,t){this.isMultiLine&&!this.menu.element.is(":visible")||(this._move(e,t),t.preventDefault())},_isContentEditable:function(e){if(!e.length)return!1;var t=e.prop("contentEditable");return"inherit"===t?this._isContentEditable(e.parent()):"true"===t}}),e.extend(e.ui.autocomplete,{escapeRegex:function(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(t,i){var s=new RegExp(e.ui.autocomplete.escapeRegex(i),"i");return e.grep(t,(function(e){return s.test(e.label||e.value||e)}))}}),e.widget("ui.autocomplete",e.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(e){return e+(e>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(t){var i;this._superApply(arguments),this.options.disabled||this.cancelSearch||(i=t&&t.length?this.options.messages.results(t.length):this.options.messages.noResults,clearTimeout(this.liveRegionTimer),this.liveRegionTimer=this._delay((function(){this.liveRegion.html(e("<div>").text(i))}),100))}}),e.ui.autocomplete}));

/*!
 * jQuery UI Labels 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],t):t(jQuery)}((function(t){"use strict";return t.fn.labels=function(){var e,s,i,n,a;return this.length?this[0].labels&&this[0].labels.length?this.pushStack(this[0].labels):(n=this.eq(0).parents("label"),(i=this.attr("id"))&&(a=(e=this.eq(0).parents().last()).add(e.length?e.siblings():this.siblings()),s="label[for='"+t.escapeSelector(i)+"']",n=n.add(a.find(s).addBack(s))),this.pushStack(n)):this.pushStack([])}}));

/*!
 * jQuery UI Menu 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","../keycode","../position","../safe-active-element","../unique-id","../version","../widget"],e):e(jQuery)}((function(e){"use strict";return e.widget("ui.menu",{version:"1.13.2",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-caret-1-e"},items:"> *",menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.lastMousePosition={x:null,y:null},this.element.uniqueId().attr({role:this.options.role,tabIndex:0}),this._addClass("ui-menu","ui-widget ui-widget-content"),this._on({"mousedown .ui-menu-item":function(e){e.preventDefault(),this._activateItem(e)},"click .ui-menu-item":function(t){var i=e(t.target),s=e(e.ui.safeActiveElement(this.document[0]));!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.select(t),t.isPropagationStopped()||(this.mouseHandled=!0),i.has(".ui-menu").length?this.expand(t):!this.element.is(":focus")&&s.closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":"_activateItem","mousemove .ui-menu-item":"_activateItem",mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(e,t){var i=this.active||this._menuItems().first();t||this.focus(e,i)},blur:function(t){this._delay((function(){!e.contains(this.element[0],e.ui.safeActiveElement(this.document[0]))&&this.collapseAll(t)}))},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(e){this._closeOnDocumentClick(e)&&this.collapseAll(e,!0),this.mouseHandled=!1}})},_activateItem:function(t){if(!this.previousFilter&&(t.clientX!==this.lastMousePosition.x||t.clientY!==this.lastMousePosition.y)){this.lastMousePosition={x:t.clientX,y:t.clientY};var i=e(t.target).closest(".ui-menu-item"),s=e(t.currentTarget);i[0]===s[0]&&(s.is(".ui-state-active")||(this._removeClass(s.siblings().children(".ui-state-active"),null,"ui-state-active"),this.focus(t,s)))}},_destroy:function(){var t=this.element.find(".ui-menu-item").removeAttr("role aria-disabled").children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(),t.children().each((function(){var t=e(this);t.data("ui-menu-submenu-caret")&&t.remove()}))},_keydown:function(t){var i,s,n,a,u=!0;switch(t.keyCode){case e.ui.keyCode.PAGE_UP:this.previousPage(t);break;case e.ui.keyCode.PAGE_DOWN:this.nextPage(t);break;case e.ui.keyCode.HOME:this._move("first","first",t);break;case e.ui.keyCode.END:this._move("last","last",t);break;case e.ui.keyCode.UP:this.previous(t);break;case e.ui.keyCode.DOWN:this.next(t);break;case e.ui.keyCode.LEFT:this.collapse(t);break;case e.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(t);break;case e.ui.keyCode.ENTER:case e.ui.keyCode.SPACE:this._activate(t);break;case e.ui.keyCode.ESCAPE:this.collapse(t);break;default:u=!1,s=this.previousFilter||"",a=!1,n=t.keyCode>=96&&t.keyCode<=105?(t.keyCode-96).toString():String.fromCharCode(t.keyCode),clearTimeout(this.filterTimer),n===s?a=!0:n=s+n,i=this._filterMenuItems(n),(i=a&&-1!==i.index(this.active.next())?this.active.nextAll(".ui-menu-item"):i).length||(n=String.fromCharCode(t.keyCode),i=this._filterMenuItems(n)),i.length?(this.focus(t,i),this.previousFilter=n,this.filterTimer=this._delay((function(){delete this.previousFilter}),1e3)):delete this.previousFilter}u&&t.preventDefault()},_activate:function(e){this.active&&!this.active.is(".ui-state-disabled")&&(this.active.children("[aria-haspopup='true']").length?this.expand(e):this.select(e))},refresh:function(){var t,i,s,n,a=this,u=this.options.icons.submenu,o=this.element.find(this.options.menus);this._toggleClass("ui-menu-icons",null,!!this.element.find(".ui-icon").length),i=o.filter(":not(.ui-menu)").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each((function(){var t=e(this),i=t.prev(),s=e("<span>").data("ui-menu-submenu-caret",!0);a._addClass(s,"ui-menu-icon","ui-icon "+u),i.attr("aria-haspopup","true").prepend(s),t.attr("aria-labelledby",i.attr("id"))})),this._addClass(i,"ui-menu","ui-widget ui-widget-content ui-front"),(t=o.add(this.element).find(this.options.items)).not(".ui-menu-item").each((function(){var t=e(this);a._isDivider(t)&&a._addClass(t,"ui-menu-divider","ui-widget-content")})),n=(s=t.not(".ui-menu-item, .ui-menu-divider")).children().not(".ui-menu").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),this._addClass(s,"ui-menu-item")._addClass(n,"ui-menu-item-wrapper"),t.filter(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!e.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(e,t){if("icons"===e){var i=this.element.find(".ui-menu-icon");this._removeClass(i,null,this.options.icons.submenu)._addClass(i,null,t.submenu)}this._super(e,t)},_setOptionDisabled:function(e){this._super(e),this.element.attr("aria-disabled",String(e)),this._toggleClass(null,"ui-state-disabled",!!e)},focus:function(e,t){var i,s,n;this.blur(e,e&&"focus"===e.type),this._scrollIntoView(t),this.active=t.first(),s=this.active.children(".ui-menu-item-wrapper"),this._addClass(s,null,"ui-state-active"),this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),n=this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"),this._addClass(n,null,"ui-state-active"),e&&"keydown"===e.type?this._close():this.timer=this._delay((function(){this._close()}),this.delay),(i=t.children(".ui-menu")).length&&e&&/^mouse/.test(e.type)&&this._startOpening(i),this.activeMenu=t.parent(),this._trigger("focus",e,{item:t})},_scrollIntoView:function(t){var i,s,n,a,u,o;this._hasScroll()&&(i=parseFloat(e.css(this.activeMenu[0],"borderTopWidth"))||0,s=parseFloat(e.css(this.activeMenu[0],"paddingTop"))||0,n=t.offset().top-this.activeMenu.offset().top-i-s,a=this.activeMenu.scrollTop(),u=this.activeMenu.height(),o=t.outerHeight(),n<0?this.activeMenu.scrollTop(a+n):n+o>u&&this.activeMenu.scrollTop(a+n-u+o))},blur:function(e,t){t||clearTimeout(this.timer),this.active&&(this._removeClass(this.active.children(".ui-menu-item-wrapper"),null,"ui-state-active"),this._trigger("blur",e,{item:this.active}),this.active=null)},_startOpening:function(e){clearTimeout(this.timer),"true"===e.attr("aria-hidden")&&(this.timer=this._delay((function(){this._close(),this._open(e)}),this.delay))},_open:function(t){var i=e.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden","true"),t.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(t,i){clearTimeout(this.timer),this.timer=this._delay((function(){var s=i?this.element:e(t&&t.target).closest(this.element.find(".ui-menu"));s.length||(s=this.element),this._close(s),this.blur(t),this._removeClass(s.find(".ui-state-active"),null,"ui-state-active"),this.activeMenu=s}),i?0:this.delay)},_close:function(e){e||(e=this.active?this.active.parent():this.element),e.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false")},_closeOnDocumentClick:function(t){return!e(t.target).closest(".ui-menu").length},_isDivider:function(e){return!/[^\-\u2014\u2013\s]/.test(e.text())},collapse:function(e){var t=this.active&&this.active.parent().closest(".ui-menu-item",this.element);t&&t.length&&(this._close(),this.focus(e,t))},expand:function(e){var t=this.active&&this._menuItems(this.active.children(".ui-menu")).first();t&&t.length&&(this._open(t.parent()),this._delay((function(){this.focus(e,t)})))},next:function(e){this._move("next","first",e)},previous:function(e){this._move("prev","last",e)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_menuItems:function(e){return(e||this.element).find(this.options.items).filter(".ui-menu-item")},_move:function(e,t,i){var s;this.active&&(s="first"===e||"last"===e?this.active["first"===e?"prevAll":"nextAll"](".ui-menu-item").last():this.active[e+"All"](".ui-menu-item").first()),s&&s.length&&this.active||(s=this._menuItems(this.activeMenu)[t]()),this.focus(i,s)},nextPage:function(t){var i,s,n;this.active?this.isLastItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.innerHeight(),0===e.fn.jquery.indexOf("3.2.")&&(n+=this.element[0].offsetHeight-this.element.outerHeight()),this.active.nextAll(".ui-menu-item").each((function(){return(i=e(this)).offset().top-s-n<0})),this.focus(t,i)):this.focus(t,this._menuItems(this.activeMenu)[this.active?"last":"first"]())):this.next(t)},previousPage:function(t){var i,s,n;this.active?this.isFirstItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.innerHeight(),0===e.fn.jquery.indexOf("3.2.")&&(n+=this.element[0].offsetHeight-this.element.outerHeight()),this.active.prevAll(".ui-menu-item").each((function(){return(i=e(this)).offset().top-s+n>0})),this.focus(t,i)):this.focus(t,this._menuItems(this.activeMenu).first())):this.next(t)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(t){this.active=this.active||e(t.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(t,!0),this._trigger("select",t,i)},_filterMenuItems:function(t){var i=t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),s=new RegExp("^"+i,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter((function(){return s.test(String.prototype.trim.call(e(this).children(".ui-menu-item-wrapper").text()))}))}})}));

/**
 * @file
 * Defines the behaviors for the AT Internet tracker.
 */

function slugify(string) {
  "use strict";

  return string
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[-]/g,'_')
    .replace(/\s+/g, '_')
    .replace(/[^\w\-]+/g, "_")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

(function ($, Drupal, window, document) {
  "use strict";

  const title = $('title').text().split('|'),
    pageTitle = slugify(title[0]),
    level2Identifier = $('meta[name=level2_identifier]').attr('content'),
    site2 = $('meta[name="site2_identifier"]').attr('content');

  /**
   * Trigger event atinternetMediaGdprAllow for medias.
   *
   * @param $element
   *   Element for attach mediaplayer.
   */
  function edugouvMediaElementPlayer($element) {
    $element.each(function () {
      if ($(this).parents('[class^="media-data"]').length === 0 && !$(this).hasClass('initialized')) {
        $(this).addClass('initialized');

        $(this).once('at-media').each(function () {
          const mediaId = $('source', this).attr('data-media-id');
          const mediaName = slugify($('source', this).attr('data-media-title'));

          $(this).mediaelementplayer({
            success: function (media, originalNode, instance) {
              const mediaTitle = $(media).find('source').data('media-title');
              $(document).trigger('atinternetMediaGdprAllow', {'media': media, 'mediaId': mediaId, 'mediaName' : mediaName});

              media.addEventListener('canplay', () => {
                $(media).find('iframe').attr('title', mediaTitle);
              });
            }
          });

          // Hide unnecesary controls for vimeo.
          let $vimeo_player_custom = $('.vimeo_player_custom');
          $vimeo_player_custom.each(function () {
            $(this).closest('.mejs__container').find('.mejs__controls').addClass('hide-controls');
          });
        })
      }
    });
  }

  /**
   * Base integration with Atinternet.
   */
  Drupal.behaviors.baseTracker = {
    attach: function (context, settings) {

      // $(document).trigger('atinternetGdprAllow');

      $(document).once('atinternet-gdpr-allow-base-tracker').on('atinternetGdprAllow', function (event, data) {
        const contentType = $('meta[property="og:type"]').attr('content') || level2Identifier || site2;

        // On click on Social Media (Bottom of page).
        $('#block-medialinksblock .media-links a').once('social-item').on('click', function () {
          let tag = new window.ATInternet.Tracker.Tag();
          tag.click.send({
            elem: this,
            name: 'suivez_nous_sur_' + slugify(this.text),
            chapter1: 'footer',
            level2: level2Identifier || '1',
            type: 'exit'
          });
        });

        // CTA related contents.
        $('.related__content .content__title a, .action-buttons a, .thematic-page-slider a, .personality-content-wrapper a, .article__linked a, .related__content a')
          .not('a.btn-tag, a.use-ajax').once('related-content').on('click', function () {
          let tag = new window.ATInternet.Tracker.Tag();
          tag.click.send({
            elem: this,
            name: slugify(this.text),
            chapter1: 'footer',
            chapter2: contentType + '_proposes',
            level2: level2Identifier || '5',
            type: 'navigation'
          });
        });

        // Tags on all contents.
        $('a.btn-tag, a.btn-tag-transparent')
          .not('div.search__header a.btn-tag, div.search__header a.btn-tag-transparent')
          .once('tags-click').on('click', function () {
          let tag = new window.ATInternet.Tracker.Tag();
          tag.click.send({
            elem: this,
            name: slugify(this.text),
            chapter1: 'taxonomie',
            chapter2: 'in_' + contentType,
            chapter3: pageTitle,
            level2: level2Identifier || '1',
            type: 'navigation'
          });
        });

        // Button search on rebound block.
        $('.rebound-search-form').once('rebound-search').on('submit', function () {
          let tag = new window.ATInternet.Tracker.Tag();
          let button = $(this).find('#edit-submit');
          tag.click.send({
            elem: button,
            name: slugify(button.val()),
            chapter1: 'taxonomie',
            chapter2: 'in_' + contentType,
            chapter3: pageTitle,
            level2: level2Identifier || '1',
            type: 'navigation'
          });
        });

        // Main menu.
        $('#mainMenu a').once('main-menu').on('click', function () {
          let tag = new window.ATInternet.Tracker.Tag();
          tag.click.send({
            elem: this,
            name: slugify(this.text),
            chapter1: 'header',
            chapter2: pageTitle,
            level2: level2Identifier || '1',
            type:'navigation'
          });
        });

        // Accessibility.
        $('#accessconfig').once('accessibility-popin').one('click', function () {
          let tag = new window.ATInternet.Tracker.Tag();
          tag.click.send({
            elem: this,
            name: 'accessibilite',
            chapter1: 'header',
            chapter2: pageTitle,
            level2: level2Identifier || '1',
            type: 'navigation'
          });
        });

        // Click on every choice on accessibility popin.
        $('.tandem-ac-content label').once('accessibility-value').one('click', function () {
          let tag = new window.ATInternet.Tracker.Tag(),
              legend = $(this).parent('.tandem-ac-fieldset').find('.tandem-ac-legend').text(),
              label = $(this).text();
          tag.click.send({
            elem: this,
            name: slugify(legend) + '_' + slugify(label),
            chapter1: 'accessibilite',
            level2: level2Identifier || '1',
            type: 'navigation'
          });
        });

        // Tag on cookie banner.
        $('#tarteaucitronAlertBig button, #tarteaucitronScrollbarAdjust button').once('cookie-banner').on('click', function () {
          let tag = new window.ATInternet.Tracker.Tag();
          tag.click.send({
            elem: this,
            name: slugify($(this).text()),
            chapter1: 'cookie',
            level2: '1',
            type: 'navigation'
          });
          tag.dispatch();
        });

        // Share button.
        $('.header__share > button, .content__bottom__share > button').once('share-button').on('click', function () {
          let tag = new window.ATInternet.Tracker.Tag();
          tag.click.send({
            elem: this,
            name: 'partager_la_page',
            chapter1: 'footer',
            chapter2: pageTitle,
            level2: level2Identifier || '4',
            type: 'exit'
          });
          tag.dispatch();
        });

        function standardTagMediaUrl() {
          const medialinkTemplate = /^\/media\/\d+\/download$/;
          let href = $(this).attr('href');
          if (medialinkTemplate.test(href)) {
            let href_array = href.split('/');
            let clicked_media_id = href_array[2];
            let tag = new window.ATInternet.Tracker.Tag({disableCookie: true});
            tag.page.set({
              elem: this,
              name: 'media_' + clicked_media_id,
              chapter1: 'media',
              chapter2: '[]',
              chapter3: '[]',
              level2: '[]',
            });

            tag.customVars.set({
              site: {
                1: '[FR]',
                2: '[download]',
                3: '[]',
                4: '[' + window.location.protocol + '//' + window.location.hostname + href + ']',
                5: '[' + document.referrer + ']',
              }
            });
            tag.dispatch();
          }
        }

        // Download Banner button.
        $('.header__download > a').once('download-button-header').on('click', function () {
          standardTagMediaUrl.call(this);
        });

        // Download Content footer button.
        $('.content__bottom__download > a').once('download-button-footer').on('click', function () {
          standardTagMediaUrl.call(this);
        });

        // Tracker on Infography present on RTE.
        $('.ckeditor-text .infography-embed-wrapper .edugouv-modal-icon + img').once('infography-rte').on('click', function () {
          let tag = new window.ATInternet.Tracker.Tag();
          tag.click.send({
            elem: this,
            name: $(this).data('edugouv-modal').split("/").pop(),
            chapter1: 'in_' + contentType,
            chapter2: pageTitle,
            type: 'click'
          });
          tag.dispatch();
        });

        // Tracker on embed medias added by RTE.
        $('div[data-embed-button="media"][data-entity-type="media"] span.icon-img + a').once('embed-media-rte').on('click', function () {
          let href = $(this).attr('href');
          let href_array = href.split('/');
          let clicked_media_id = href_array[2];
          let tag = new window.ATInternet.Tracker.Tag();
          tag.click.set({
            elem: this,
            name: slugify(settings['atinternet_embed_media'][clicked_media_id]['file_name']) + '_' + clicked_media_id,
            chapter1: 'media',
            chapter2: '[]',
            chapter3: '[]',
            level2: '[]',
            type: 'download',
          });

          tag.dispatch();
        });

        // Tracker on embed media links added by RTE.
        $('a').once('embed-media-link-rte').on('click', function () {
          // Avoid duplication of tags sending in some cases.
          if ($(this).parents('div.embedded-entity').length ||
            $(this).parents('div.content__bottom__download').length ||
            $(this).parents('div.header__download')) {
            return;
          }
          standardTagMediaUrl.call(this);
        });

      });
    }
  };

  /**
   * Registers behaviour for init mediaElement player.
   *
   * And trigger ATInternet events.
   *
   * @see Drupal.behaviors.tandemMediaElement
   */
  Drupal.behaviors.tandemMediaelement = {
    attach: function (context,settings) {

      edugouvMediaElementPlayer($('.youtube_player_custom'));
      edugouvMediaElementPlayer($('.vimeo_player_custom'));
      edugouvMediaElementPlayer($('.dailymotion_player_custom'));

      $(document).once('at-media-success').on('atinternetMediaGdprAllow', function (event, data) {
        let media = data.media;
        let mediaId = data.mediaId;
        let mediaName = data.mediaName;

        if (window.ATInternet) {
          let tag = new window.ATInternet.Tracker.Tag();

          // On video load.
          media.addEventListener('loadedmetadata', function () {
            tag.richMedia.add({
              mediaType: 'video',
              playerId: mediaId,
              mediaLevel2: level2Identifier || '1',
              mediaLabel: mediaName,
              mediaTheme1: pageTitle,
              isEmbedded: true,
              broadcastMode: 'live'
            });
          });

          let onPlay = () => {
            // Prevent double execution event for fix DailyMotion player.
            media.removeEventListener('play', onPlay);

            tag.richMedia.send({
              action: 'play',
              playerId: mediaId,
              mediaLabel: mediaName,
              mediaTheme1: pageTitle,
            });
          };

          media.addEventListener('play', onPlay);

          let onPause = () => {
            // Prevent double execution event for fix DailyMotion player.
            media.addEventListener('play', onPlay);

            tag.richMedia.send({
              action: 'pause',
              playerId: mediaId,
              mediaLabel: mediaName,
              mediaTheme1: pageTitle,
            });
          };

          media.addEventListener('pause', onPause);
        }
      });
    }
  };

})(jQuery, Drupal, window, document);
;
/*! picturefill - v3.0.2 - 2016-02-12
 * https://scottjehl.github.io/picturefill/
 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
!function(a){var b=navigator.userAgent;a.HTMLPictureElement&&/ecko/.test(b)&&b.match(/rv\:(\d+)/)&&RegExp.$1<45&&addEventListener("resize",function(){var b,c=document.createElement("source"),d=function(a){var b,d,e=a.parentNode;"PICTURE"===e.nodeName.toUpperCase()?(b=c.cloneNode(),e.insertBefore(b,e.firstElementChild),setTimeout(function(){e.removeChild(b)})):(!a._pfLastSize||a.offsetWidth>a._pfLastSize)&&(a._pfLastSize=a.offsetWidth,d=a.sizes,a.sizes+=",100vw",setTimeout(function(){a.sizes=d}))},e=function(){var a,b=document.querySelectorAll("picture > img, img[srcset][sizes]");for(a=0;a<b.length;a++)d(b[a])},f=function(){clearTimeout(b),b=setTimeout(e,99)},g=a.matchMedia&&matchMedia("(orientation: landscape)"),h=function(){f(),g&&g.addListener&&g.addListener(f)};return c.srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",/^[c|i]|d$/.test(document.readyState||"")?h():document.addEventListener("DOMContentLoaded",h),f}())}(window),function(a,b,c){"use strict";function d(a){return" "===a||"	"===a||"\n"===a||"\f"===a||"\r"===a}function e(b,c){var d=new a.Image;return d.onerror=function(){A[b]=!1,ba()},d.onload=function(){A[b]=1===d.width,ba()},d.src=c,"pending"}function f(){M=!1,P=a.devicePixelRatio,N={},O={},s.DPR=P||1,Q.width=Math.max(a.innerWidth||0,z.clientWidth),Q.height=Math.max(a.innerHeight||0,z.clientHeight),Q.vw=Q.width/100,Q.vh=Q.height/100,r=[Q.height,Q.width,P].join("-"),Q.em=s.getEmValue(),Q.rem=Q.em}function g(a,b,c,d){var e,f,g,h;return"saveData"===B.algorithm?a>2.7?h=c+1:(f=b-c,e=Math.pow(a-.6,1.5),g=f*e,d&&(g+=.1*e),h=a+g):h=c>1?Math.sqrt(a*b):a,h>c}function h(a){var b,c=s.getSet(a),d=!1;"pending"!==c&&(d=r,c&&(b=s.setRes(c),s.applySetCandidate(b,a))),a[s.ns].evaled=d}function i(a,b){return a.res-b.res}function j(a,b,c){var d;return!c&&b&&(c=a[s.ns].sets,c=c&&c[c.length-1]),d=k(b,c),d&&(b=s.makeUrl(b),a[s.ns].curSrc=b,a[s.ns].curCan=d,d.res||aa(d,d.set.sizes)),d}function k(a,b){var c,d,e;if(a&&b)for(e=s.parseSet(b),a=s.makeUrl(a),c=0;c<e.length;c++)if(a===s.makeUrl(e[c].url)){d=e[c];break}return d}function l(a,b){var c,d,e,f,g=a.getElementsByTagName("source");for(c=0,d=g.length;d>c;c++)e=g[c],e[s.ns]=!0,f=e.getAttribute("srcset"),f&&b.push({srcset:f,media:e.getAttribute("media"),type:e.getAttribute("type"),sizes:e.getAttribute("sizes")})}function m(a,b){function c(b){var c,d=b.exec(a.substring(m));return d?(c=d[0],m+=c.length,c):void 0}function e(){var a,c,d,e,f,i,j,k,l,m=!1,o={};for(e=0;e<h.length;e++)f=h[e],i=f[f.length-1],j=f.substring(0,f.length-1),k=parseInt(j,10),l=parseFloat(j),X.test(j)&&"w"===i?((a||c)&&(m=!0),0===k?m=!0:a=k):Y.test(j)&&"x"===i?((a||c||d)&&(m=!0),0>l?m=!0:c=l):X.test(j)&&"h"===i?((d||c)&&(m=!0),0===k?m=!0:d=k):m=!0;m||(o.url=g,a&&(o.w=a),c&&(o.d=c),d&&(o.h=d),d||c||a||(o.d=1),1===o.d&&(b.has1x=!0),o.set=b,n.push(o))}function f(){for(c(T),i="",j="in descriptor";;){if(k=a.charAt(m),"in descriptor"===j)if(d(k))i&&(h.push(i),i="",j="after descriptor");else{if(","===k)return m+=1,i&&h.push(i),void e();if("("===k)i+=k,j="in parens";else{if(""===k)return i&&h.push(i),void e();i+=k}}else if("in parens"===j)if(")"===k)i+=k,j="in descriptor";else{if(""===k)return h.push(i),void e();i+=k}else if("after descriptor"===j)if(d(k));else{if(""===k)return void e();j="in descriptor",m-=1}m+=1}}for(var g,h,i,j,k,l=a.length,m=0,n=[];;){if(c(U),m>=l)return n;g=c(V),h=[],","===g.slice(-1)?(g=g.replace(W,""),e()):f()}}function n(a){function b(a){function b(){f&&(g.push(f),f="")}function c(){g[0]&&(h.push(g),g=[])}for(var e,f="",g=[],h=[],i=0,j=0,k=!1;;){if(e=a.charAt(j),""===e)return b(),c(),h;if(k){if("*"===e&&"/"===a[j+1]){k=!1,j+=2,b();continue}j+=1}else{if(d(e)){if(a.charAt(j-1)&&d(a.charAt(j-1))||!f){j+=1;continue}if(0===i){b(),j+=1;continue}e=" "}else if("("===e)i+=1;else if(")"===e)i-=1;else{if(","===e){b(),c(),j+=1;continue}if("/"===e&&"*"===a.charAt(j+1)){k=!0,j+=2;continue}}f+=e,j+=1}}}function c(a){return k.test(a)&&parseFloat(a)>=0?!0:l.test(a)?!0:"0"===a||"-0"===a||"+0"===a?!0:!1}var e,f,g,h,i,j,k=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,l=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;for(f=b(a),g=f.length,e=0;g>e;e++)if(h=f[e],i=h[h.length-1],c(i)){if(j=i,h.pop(),0===h.length)return j;if(h=h.join(" "),s.matchesMedia(h))return j}return"100vw"}b.createElement("picture");var o,p,q,r,s={},t=!1,u=function(){},v=b.createElement("img"),w=v.getAttribute,x=v.setAttribute,y=v.removeAttribute,z=b.documentElement,A={},B={algorithm:""},C="data-pfsrc",D=C+"set",E=navigator.userAgent,F=/rident/.test(E)||/ecko/.test(E)&&E.match(/rv\:(\d+)/)&&RegExp.$1>35,G="currentSrc",H=/\s+\+?\d+(e\d+)?w/,I=/(\([^)]+\))?\s*(.+)/,J=a.picturefillCFG,K="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",L="font-size:100%!important;",M=!0,N={},O={},P=a.devicePixelRatio,Q={px:1,"in":96},R=b.createElement("a"),S=!1,T=/^[ \t\n\r\u000c]+/,U=/^[, \t\n\r\u000c]+/,V=/^[^ \t\n\r\u000c]+/,W=/[,]+$/,X=/^\d+$/,Y=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,Z=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d||!1):a.attachEvent&&a.attachEvent("on"+b,c)},$=function(a){var b={};return function(c){return c in b||(b[c]=a(c)),b[c]}},_=function(){var a=/^([\d\.]+)(em|vw|px)$/,b=function(){for(var a=arguments,b=0,c=a[0];++b in a;)c=c.replace(a[b],a[++b]);return c},c=$(function(a){return"return "+b((a||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"});return function(b,d){var e;if(!(b in N))if(N[b]=!1,d&&(e=b.match(a)))N[b]=e[1]*Q[e[2]];else try{N[b]=new Function("e",c(b))(Q)}catch(f){}return N[b]}}(),aa=function(a,b){return a.w?(a.cWidth=s.calcListLength(b||"100vw"),a.res=a.w/a.cWidth):a.res=a.d,a},ba=function(a){if(t){var c,d,e,f=a||{};if(f.elements&&1===f.elements.nodeType&&("IMG"===f.elements.nodeName.toUpperCase()?f.elements=[f.elements]:(f.context=f.elements,f.elements=null)),c=f.elements||s.qsa(f.context||b,f.reevaluate||f.reselect?s.sel:s.selShort),e=c.length){for(s.setupRun(f),S=!0,d=0;e>d;d++)s.fillImg(c[d],f);s.teardownRun(f)}}};o=a.console&&console.warn?function(a){console.warn(a)}:u,G in v||(G="src"),A["image/jpeg"]=!0,A["image/gif"]=!0,A["image/png"]=!0,A["image/svg+xml"]=b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),s.ns=("pf"+(new Date).getTime()).substr(0,9),s.supSrcset="srcset"in v,s.supSizes="sizes"in v,s.supPicture=!!a.HTMLPictureElement,s.supSrcset&&s.supPicture&&!s.supSizes&&!function(a){v.srcset="data:,a",a.src="data:,a",s.supSrcset=v.complete===a.complete,s.supPicture=s.supSrcset&&s.supPicture}(b.createElement("img")),s.supSrcset&&!s.supSizes?!function(){var a="data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==",c="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",d=b.createElement("img"),e=function(){var a=d.width;2===a&&(s.supSizes=!0),q=s.supSrcset&&!s.supSizes,t=!0,setTimeout(ba)};d.onload=e,d.onerror=e,d.setAttribute("sizes","9px"),d.srcset=c+" 1w,"+a+" 9w",d.src=c}():t=!0,s.selShort="picture>img,img[srcset]",s.sel=s.selShort,s.cfg=B,s.DPR=P||1,s.u=Q,s.types=A,s.setSize=u,s.makeUrl=$(function(a){return R.href=a,R.href}),s.qsa=function(a,b){return"querySelector"in a?a.querySelectorAll(b):[]},s.matchesMedia=function(){return a.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?s.matchesMedia=function(a){return!a||matchMedia(a).matches}:s.matchesMedia=s.mMQ,s.matchesMedia.apply(this,arguments)},s.mMQ=function(a){return a?_(a):!0},s.calcLength=function(a){var b=_(a,!0)||!1;return 0>b&&(b=!1),b},s.supportsType=function(a){return a?A[a]:!0},s.parseSize=$(function(a){var b=(a||"").match(I);return{media:b&&b[1],length:b&&b[2]}}),s.parseSet=function(a){return a.cands||(a.cands=m(a.srcset,a)),a.cands},s.getEmValue=function(){var a;if(!p&&(a=b.body)){var c=b.createElement("div"),d=z.style.cssText,e=a.style.cssText;c.style.cssText=K,z.style.cssText=L,a.style.cssText=L,a.appendChild(c),p=c.offsetWidth,a.removeChild(c),p=parseFloat(p,10),z.style.cssText=d,a.style.cssText=e}return p||16},s.calcListLength=function(a){if(!(a in O)||B.uT){var b=s.calcLength(n(a));O[a]=b?b:Q.width}return O[a]},s.setRes=function(a){var b;if(a){b=s.parseSet(a);for(var c=0,d=b.length;d>c;c++)aa(b[c],a.sizes)}return b},s.setRes.res=aa,s.applySetCandidate=function(a,b){if(a.length){var c,d,e,f,h,k,l,m,n,o=b[s.ns],p=s.DPR;if(k=o.curSrc||b[G],l=o.curCan||j(b,k,a[0].set),l&&l.set===a[0].set&&(n=F&&!b.complete&&l.res-.1>p,n||(l.cached=!0,l.res>=p&&(h=l))),!h)for(a.sort(i),f=a.length,h=a[f-1],d=0;f>d;d++)if(c=a[d],c.res>=p){e=d-1,h=a[e]&&(n||k!==s.makeUrl(c.url))&&g(a[e].res,c.res,p,a[e].cached)?a[e]:c;break}h&&(m=s.makeUrl(h.url),o.curSrc=m,o.curCan=h,m!==k&&s.setSrc(b,h),s.setSize(b))}},s.setSrc=function(a,b){var c;a.src=b.url,"image/svg+xml"===b.set.type&&(c=a.style.width,a.style.width=a.offsetWidth+1+"px",a.offsetWidth+1&&(a.style.width=c))},s.getSet=function(a){var b,c,d,e=!1,f=a[s.ns].sets;for(b=0;b<f.length&&!e;b++)if(c=f[b],c.srcset&&s.matchesMedia(c.media)&&(d=s.supportsType(c.type))){"pending"===d&&(c=d),e=c;break}return e},s.parseSets=function(a,b,d){var e,f,g,h,i=b&&"PICTURE"===b.nodeName.toUpperCase(),j=a[s.ns];(j.src===c||d.src)&&(j.src=w.call(a,"src"),j.src?x.call(a,C,j.src):y.call(a,C)),(j.srcset===c||d.srcset||!s.supSrcset||a.srcset)&&(e=w.call(a,"srcset"),j.srcset=e,h=!0),j.sets=[],i&&(j.pic=!0,l(b,j.sets)),j.srcset?(f={srcset:j.srcset,sizes:w.call(a,"sizes")},j.sets.push(f),g=(q||j.src)&&H.test(j.srcset||""),g||!j.src||k(j.src,f)||f.has1x||(f.srcset+=", "+j.src,f.cands.push({url:j.src,d:1,set:f}))):j.src&&j.sets.push({srcset:j.src,sizes:null}),j.curCan=null,j.curSrc=c,j.supported=!(i||f&&!s.supSrcset||g&&!s.supSizes),h&&s.supSrcset&&!j.supported&&(e?(x.call(a,D,e),a.srcset=""):y.call(a,D)),j.supported&&!j.srcset&&(!j.src&&a.src||a.src!==s.makeUrl(j.src))&&(null===j.src?a.removeAttribute("src"):a.src=j.src),j.parsed=!0},s.fillImg=function(a,b){var c,d=b.reselect||b.reevaluate;a[s.ns]||(a[s.ns]={}),c=a[s.ns],(d||c.evaled!==r)&&((!c.parsed||b.reevaluate)&&s.parseSets(a,a.parentNode,b),c.supported?c.evaled=r:h(a))},s.setupRun=function(){(!S||M||P!==a.devicePixelRatio)&&f()},s.supPicture?(ba=u,s.fillImg=u):!function(){var c,d=a.attachEvent?/d$|^c/:/d$|^c|^i/,e=function(){var a=b.readyState||"";f=setTimeout(e,"loading"===a?200:999),b.body&&(s.fillImgs(),c=c||d.test(a),c&&clearTimeout(f))},f=setTimeout(e,b.body?9:99),g=function(a,b){var c,d,e=function(){var f=new Date-d;b>f?c=setTimeout(e,b-f):(c=null,a())};return function(){d=new Date,c||(c=setTimeout(e,b))}},h=z.clientHeight,i=function(){M=Math.max(a.innerWidth||0,z.clientWidth)!==Q.width||z.clientHeight!==h,h=z.clientHeight,M&&s.fillImgs()};Z(a,"resize",g(i,99)),Z(b,"readystatechange",e)}(),s.picturefill=ba,s.fillImgs=ba,s.teardownRun=u,ba._=s,a.picturefillCFG={pf:s,push:function(a){var b=a.shift();"function"==typeof s[b]?s[b].apply(s,a):(B[b]=a[0],S&&s.fillImgs({reselect:!0}))}};for(;J&&J.length;)a.picturefillCFG.push(J.shift());a.picturefill=ba,"object"==typeof module&&"object"==typeof module.exports?module.exports=ba:"function"==typeof define&&define.amd&&define("picturefill",function(){return ba}),s.supPicture||(A["image/webp"]=e("image/webp","data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))}(window,document);;
/**
 * @file
 * Defines the behaviors for the AT Internet tracker.
 */

(function ($, Drupal, window, document) {
  "use strict";

  /**
   * Content page integration with ATInternet.
   */
  Drupal.behaviors.contenTracker = {
    attach: function (context, settings) {
      $(document).once('atinternet-gdpr-allow-conten-tracker').one('atinternetGdprAllow', function (event, data) {
        if (window.addEventListener) {


          const tag = new window.ATInternet.Tracker.Tag(),
            title = $('title').text().split('|'),
            pageTitle = slugify(title[0]),
            $breadcrumb = $('nav.breadcrumb'),
            contentType = $('meta[property="og:type"]').attr('content'),
            site2 = $('meta[name="site2_identifier"]').attr('content'),
            chapter2 = slugify($breadcrumb.find('li').eq(2).text()),
            $mainMenuActive = $('#mainMenu li a.is-active').last();

          let level2,
            visibleTags = [],
            chapter1;

          setTimeout(function () {
            level2 = $mainMenuActive.attr('data-at-level2');
            chapter1 = contentType;

            if (typeof level2 === 'undefined' || !level2) {
              level2 = $('meta[name=level2_identifier]').attr('content');
            }

            $('.header__tags a').each(function () {
              visibleTags.push(slugify($(this).text()));
            });

            tag.page.set({
              name: pageTitle,
              chapter1: chapter1,
              chapter2: chapter2,
              level2: level2 || '5',
            });

            tag.customVars.set({
              site: {
                1: '[FR]',
                2: '[' + (settings.atinternet.type || site2 || '') + ']',
                3: '[' + visibleTags.join('|') + ']',
                4: '[' + window.location.href + ']',
                5: '[' + document.referrer + ']',
              }
            });

            tag.dispatch();
          }, 100);
        }
      });
    }
  };

})(jQuery, Drupal, window, document);
;
/*!
* tabbable 5.3.2
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):(e="undefined"!=typeof globalThis?globalThis:e||self,function(){var n=e.tabbable,o=e.tabbable={};t(o),o.noConflict=function(){return e.tabbable=n,o}}())}(this,(function(e){"use strict";var t=["input","select","textarea","a[href]","button","[tabindex]:not(slot)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])',"details>summary:first-of-type","details"],n=t.join(","),o="undefined"==typeof Element,r=o?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,i=!o&&Element.prototype.getRootNode?function(e){return e.getRootNode()}:function(e){return e.ownerDocument},a=function(e,t,o){var i=Array.prototype.slice.apply(e.querySelectorAll(n));return t&&r.call(e,n)&&i.unshift(e),i=i.filter(o)},l=function e(t,o,i){for(var a=[],l=Array.from(t);l.length;){var u=l.shift();if("SLOT"===u.tagName){var c=u.assignedElements(),d=e(c.length?c:u.children,!0,i);i.flatten?a.push.apply(a,d):a.push({scope:u,candidates:d})}else{r.call(u,n)&&i.filter(u)&&(o||!t.includes(u))&&a.push(u);var f=u.shadowRoot||"function"==typeof i.getShadowRoot&&i.getShadowRoot(u);if(f){var s=e(!0===f?u.children:f.children,!0,i);i.flatten?a.push.apply(a,s):a.push({scope:u,candidates:s})}else l.unshift.apply(l,u.children)}}return a},u=function(e,t){return e.tabIndex<0&&(t||/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName)||e.isContentEditable)&&isNaN(parseInt(e.getAttribute("tabindex"),10))?0:e.tabIndex},c=function(e,t){return e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex},d=function(e){return"INPUT"===e.tagName},f=function(e){return function(e){return d(e)&&"radio"===e.type}(e)&&!function(e){if(!e.name)return!0;var t,n=e.form||i(e),o=function(e){return n.querySelectorAll('input[type="radio"][name="'+e+'"]')};if("undefined"!=typeof window&&void 0!==window.CSS&&"function"==typeof window.CSS.escape)t=o(window.CSS.escape(e.name));else try{t=o(e.name)}catch(e){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",e.message),!1}var r=function(e,t){for(var n=0;n<e.length;n++)if(e[n].checked&&e[n].form===t)return e[n]}(t,e.form);return!r||r===e}(e)},s=function(e){var t=e.getBoundingClientRect(),n=t.width,o=t.height;return 0===n&&0===o},p=function(e,t){return!(t.disabled||function(e){return d(e)&&"hidden"===e.type}(t)||function(e,t){var n=t.displayCheck,o=t.getShadowRoot;if("hidden"===getComputedStyle(e).visibility)return!0;var a=r.call(e,"details>summary:first-of-type")?e.parentElement:e;if(r.call(a,"details:not([open]) *"))return!0;var l=i(e).host,u=(null==l?void 0:l.ownerDocument.contains(l))||e.ownerDocument.contains(e);if(n&&"full"!==n){if("non-zero-area"===n)return s(e)}else{if("function"==typeof o){for(var c=e;e;){var d=e.parentElement,f=i(e);if(d&&!d.shadowRoot&&!0===o(d))return s(e);e=e.assignedSlot?e.assignedSlot:d||f===e.ownerDocument?d:f.host}e=c}if(u)return!e.getClientRects().length}return!1}(t,e)||function(e){return"DETAILS"===e.tagName&&Array.prototype.slice.apply(e.children).some((function(e){return"SUMMARY"===e.tagName}))}(t)||function(e){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))for(var t=e.parentElement;t;){if("FIELDSET"===t.tagName&&t.disabled){for(var n=0;n<t.children.length;n++){var o=t.children.item(n);if("LEGEND"===o.tagName)return!!r.call(t,"fieldset[disabled] *")||!o.contains(e)}return!0}t=t.parentElement}return!1}(t))},h=function(e,t){return!(f(t)||u(t)<0||!p(e,t))},m=t.concat("iframe").join(",");e.focusable=function(e,t){return(t=t||{}).getShadowRoot?l([e],t.includeContainer,{filter:p.bind(null,t),flatten:!0,getShadowRoot:t.getShadowRoot}):a(e,t.includeContainer,p.bind(null,t))},e.isFocusable=function(e,t){if(t=t||{},!e)throw new Error("No node provided");return!1!==r.call(e,m)&&p(t,e)},e.isTabbable=function(e,t){if(t=t||{},!e)throw new Error("No node provided");return!1!==r.call(e,n)&&h(t,e)},e.tabbable=function(e,t){return function e(t){var n=[],o=[];return t.forEach((function(t,r){var i=!!t.scope,a=i?t.scope:t,l=u(a,i),c=i?e(t.candidates):a;0===l?i?n.push.apply(n,c):n.push(a):o.push({documentOrder:r,tabIndex:l,item:t,isScope:i,content:c})})),o.sort(c).reduce((function(e,t){return t.isScope?e.push.apply(e,t.content):e.push(t.content),e}),[]).concat(n)}((t=t||{}).getShadowRoot?l([e],t.includeContainer,{filter:h.bind(null,t),flatten:!1,getShadowRoot:t.getShadowRoot}):a(e,t.includeContainer,h.bind(null,t)))},Object.defineProperty(e,"__esModule",{value:!0})}));

;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  var autocomplete;

  function autocompleteSplitValues(value) {
    var result = [];
    var quote = false;
    var current = '';
    var valueLength = value.length;
    var character;

    for (var i = 0; i < valueLength; i++) {
      character = value.charAt(i);

      if (character === '"') {
        current += character;
        quote = !quote;
      } else if (character === '`' && !quote) {
        result.push(current.trim());
        current = '';
      } else {
        current += character;
      }
    }

    if (value.length > 0) {
      result.push(current.trim());
    }

    return result;
  }

  function extractLastTerm(terms) {
    return autocomplete.splitValues(terms).pop();
  }

  function searchHandler(event) {
    var options = autocomplete.options;

    if (options.isComposing) {
      return false;
    }

    var term = autocomplete.extractLastTerm(event.target.value);

    if (term.length > 0 && options.firstCharacterBlacklist.indexOf(term[0]) !== -1) {
      return false;
    }

    return term.length >= options.minLength;
  }

  function sourceData(request, response) {
    var elementId = this.element.attr('id');

    if (!(elementId in autocomplete.cache)) {
      autocomplete.cache[elementId] = {};
    }

    function showSuggestions(suggestions) {
      var tagged = autocomplete.splitValues(request.term);
      var il = tagged.length;

      for (var i = 0; i < il; i++) {
        var index = suggestions.indexOf(tagged[i]);

        if (index >= 0) {
          suggestions.splice(index, 1);
        }
      }

      response(suggestions);
    }

    var term = autocomplete.extractLastTerm(request.term);

    function sourceCallbackHandler(data) {
      autocomplete.cache[elementId][term] = data;
      showSuggestions(data);
    }

    if (autocomplete.cache[elementId].hasOwnProperty(term)) {
      showSuggestions(autocomplete.cache[elementId][term]);
    } else {
      var options = $.extend({
        success: sourceCallbackHandler,
        data: {
          q: term
        }
      }, autocomplete.ajax);
      $.ajax(this.element.attr('data-autocomplete-path'), options);
    }
  }

  function focusHandler() {
    return false;
  }

  function selectHandler(event, ui) {
    var terms = autocomplete.splitValues(event.target.value);
    terms.pop();
    terms.push(ui.item.value);
    event.target.value = terms.join('` ');
    return false;
  }

  function renderItem(ul, item) {
    return $('<li>').append($('<a>').html(item.label)).appendTo(ul);
  }

  Drupal.behaviors.autocomplete = {
    attach: function attach(context) {
      var $autocomplete = $(once('autocomplete', 'input.form-autocomplete', context));

      if ($autocomplete.length) {
        var blacklist = $autocomplete.attr('data-autocomplete-first-character-blacklist');
        $.extend(autocomplete.options, {
          firstCharacterBlacklist: blacklist || ''
        });
        $autocomplete.autocomplete(autocomplete.options).each(function () {
          $(this).data('ui-autocomplete')._renderItem = autocomplete.options.renderItem;
        });
        $autocomplete.on('compositionstart.autocomplete', function () {
          autocomplete.options.isComposing = true;
        });
        $autocomplete.on('compositionend.autocomplete', function () {
          autocomplete.options.isComposing = false;
        });
      }
    },
    detach: function detach(context, settings, trigger) {
      if (trigger === 'unload') {
        $(once.remove('autocomplete', 'input.form-autocomplete', context)).autocomplete('destroy');
      }
    }
  };
  autocomplete = {
    cache: {},
    splitValues: autocompleteSplitValues,
    extractLastTerm: extractLastTerm,
    options: {
      source: sourceData,
      focus: focusHandler,
      search: searchHandler,
      select: selectHandler,
      renderItem: renderItem,
      minLength: 1,
      firstCharacterBlacklist: '',
      isComposing: false
    },
    ajax: {
      dataType: 'json',
      jsonp: false
    }
  };
  Drupal.autocomplete = autocomplete;
})(jQuery, Drupal);
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, once) {
  var deprecatedMessageSuffix = "is deprecated in Drupal 9.3.0 and will be removed in Drupal 10.0.0. Use the core/once library instead. See https://www.drupal.org/node/3158256";
  var originalJQOnce = $.fn.once;
  var originalJQRemoveOnce = $.fn.removeOnce;

  $.fn.once = function jQueryOnce(id) {
    Drupal.deprecationError({
      message: "jQuery.once() ".concat(deprecatedMessageSuffix)
    });
    return originalJQOnce.apply(this, [id]);
  };

  $.fn.removeOnce = function jQueryRemoveOnce(id) {
    Drupal.deprecationError({
      message: "jQuery.removeOnce() ".concat(deprecatedMessageSuffix)
    });
    return originalJQRemoveOnce.apply(this, [id]);
  };

  var drupalOnce = once;

  function augmentedOnce(id, selector, context) {
    originalJQOnce.apply($(selector, context), [id]);
    return drupalOnce(id, selector, context);
  }

  function remove(id, selector, context) {
    originalJQRemoveOnce.apply($(selector, context), [id]);
    return drupalOnce.remove(id, selector, context);
  }

  window.once = Object.assign(augmentedOnce, drupalOnce, {
    remove: remove
  });
})(jQuery, once);;
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function ($, Drupal, drupalSettings) {
  /**
   * Create agenda.
   */
  Drupal.behaviors.edugouvAgenda = {
    attach: function attach(context) {
      $('.js-agenda', context).once('edugouvAgenda').each(function (index, element) {
        var Agenda =
        /*#__PURE__*/
        function () {
          // Get initial data.
          function Agenda($obj) {
            _classCallCheck(this, Agenda);

            this.lang = drupalSettings.path ? drupalSettings.path.currentLanguage : 'en';
            this.viewTypes = {
              monthly: 'Month',
              weekly: 'Week',
              daily: 'Day'
            };
            this.cachedData = {};
            this.cachedDates = {};
            this.accessibleType = 'weekly';
            this.viewType = $obj.data('view-type') ? $obj.data('view-type') : 'monthly';
            this.gapDays = $obj.data('gap-days') ? $obj.data('gap-days') : 5;
            this.$this = $obj;
            this.currentDate = new Date();
            this.calendarStartDate = new Date();
            this.calendarEndDate = new Date();
            this.noFutureEvents = null;
            this.$main = $(Drupal.theme('agendaMainStructure')).appendTo(this.$this);
            this.$header = $('.agenda__header', this.$main);
            this.$content = $('.agenda__content', this.$main);
            this.$viewTypeWrapper = $('.agenda__view__wrapper', this.$main);
            this.$typeWrapper = $('.agenda__types__wrapper', this.$main);
            this.$accessibleTypeWrapper = $('.agenda__types__wrapper--accessible', this.$main);
            this.$accessibleEvents = $('.agenda__events', this.$main);
            this.$viewport = $('.viewport', this.$main);
            this.$scrollWrapper = this.$viewport.parent();
            this.daySeconds = 86400000; // 1000 * 60 * 60 * 24

            this.hourSeconds = 3600000; // 1000 * 60 * 60

            this.rows = {};
            this.accessibleRows = {};
            this.dates = this.fillDates(this.viewType);
            this.accessibleDates = this.fillDates(this.accessibleType);
            this.$scrollWrapper.tinyscrollbar({
              axis: 'x',
              wheel: false
            });
          } // Get rows from api or from cached data if it was got before.


          _createClass(Agenda, [{
            key: "getRows",
            value: function getRows() {
              var _this = this;

              var basePath = drupalSettings.path ? drupalSettings.path.baseUrl : '/';
              var eventTypes = this.$this.data('event-types').join('+');
              var personality = this.$this.data('personality') ? this.$this.data('personality') : '';
              this.$this.addClass('loading');
              $.get("".concat(basePath, "api/v1/agenda/").concat(this.viewType, "?types=").concat(eventTypes, "&personality=").concat(personality)).done(function (response) {
                _this.rows = response.data;
                _this.cachedData[_this.viewType] = response.data;
                _this.currentDate = new Date(response.currentDate);

                if (response.pagerFrom) {
                  _this.calendarStartDate = new Date(response.pagerFrom);
                  _this.calendarEndDate = new Date(response.pagerTo);
                } else {
                  var date = new Date();

                  if (!response.noFutureEvents) {
                    date = new Date(response.firstEventStartDate);
                  }

                  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

                  if (_this.viewType === 'daily') {
                    firstDay = new Date(date.getTime() - _this.daySeconds);
                    lastDay = date;
                  } else if (_this.viewType === 'weekly') {
                    var curDay = date.getDate() + (1 - date.getDay());
                    var curMon = new Date(date.getFullYear(), date.getMonth(), curDay).getTime();
                    firstDay = new Date(curMon - _this.daySeconds * 7);
                    lastDay = new Date(date.setDate(date.getDate() - date.getDay() + 7));
                  }

                  _this.calendarStartDate = firstDay;
                  _this.calendarEndDate = lastDay;
                }

                if (response.noFutureEvents) {
                  $('.agenda-next', _this.$main).hide();
                } else {
                  $('.agenda-next', _this.$main).show();
                }

                _this.noFutureEvents = response.noFutureEvents;
                _this.dates = _this.fillDates(_this.viewType);

                _this.render();

                _this.$scrollWrapper.attr('data-start', response.calendarStartDate);

                _this.$scrollWrapper.attr('data-end', response.calendarEndDate);

                _this.$scrollWrapper.data('plugin_tinyscrollbar').update();
              }).fail(function (error) {
                throw new Error(error);
              }).always(function () {
                setTimeout(function () {
                  _this.$this.removeClass('loading');
                }, 1100);
              });
            } // Get rows for accessible version.

          }, {
            key: "getAccessibleRows",
            value: function getAccessibleRows() {
              var _this2 = this;

              if (this.cachedData[this.accessibleType]) {
                this.accessibleRows = this.cachedData[this.accessibleType];
                this.renderAccessible();
              } else {
                var basePath = drupalSettings.path ? drupalSettings.path.baseUrl : '/';
                var eventTypes = this.$this.data('event-types').join('+');
                var personality = this.$this.data('personality') ? this.$this.data('personality') : '';
                $.get("".concat(basePath, "api/v1/agenda/").concat(this.accessibleType, "?types=").concat(eventTypes, "&personality=").concat(personality, "&accessible=1")).done(function (response) {
                  _this2.cachedData[_this2.accessibleType] = response.data;
                  _this2.accessibleRows = response.data;
                  var today = new Date().getTime();
                  var startRequest = today - _this2.daySeconds * 84;
                  var endRequest = today + _this2.daySeconds * 84;
                  _this2.calendarStartDate = new Date(startRequest);
                  _this2.calendarEndDate = new Date(endRequest);
                  _this2.accessibleDates = _this2.fillDates(_this2.accessibleType);

                  _this2.renderAccessible();
                }).fail(function (error) {
                  throw new Error(error);
                });
              }
            } // Render all elements.

          }, {
            key: "render",
            value: function render() {
              this.$header.empty();
              this.$content.empty();
              this.$typeWrapper.empty();
              this.$viewTypeWrapper.empty();
              this["generate".concat(this.viewTypes[this.viewType], "Header")]();
              this.generateContent();
              this.generateViewTypeSelector();
              this.$scrollWrapper.data('plugin_tinyscrollbar').update();
              this.setViewportHeight();
              this.bindArrowsSwitcher();
              this.bindPopupSwitcher();
            } // Bind events for arrows switcher.

          }, {
            key: "bindArrowsSwitcher",
            value: function bindArrowsSwitcher() {
              var _this3 = this;

              $('.custom-scrollbar-wrapper').each(function (ind, elem) {
                var scroll = _this3.$scrollWrapper.data('plugin_tinyscrollbar');

                var agendaDay = $(elem).find('.agenda__day.today').index();
                var agendaMonth = $(elem).find('.agenda__header__month');
                var length = 0;

                if (agendaMonth.length) {
                  length = agendaMonth.width() * $(elem).find('.agenda__day.today').closest('.agenda__header__month').index();
                } else {
                  length = agendaDay * $(elem).find('.agenda__day').width();
                }

                scroll.update(length);
                var $arrow = $(elem).find('.agenda__buttons button');
                $arrow.on('click', function (e) {
                  e.preventDefault();
                  e.stopImmediatePropagation();
                  var basePath = drupalSettings.path ? drupalSettings.path.baseUrl : '/';
                  var eventTypes = $(e.target).closest('.js-agenda').data('event-types').join('+');
                  var personality = $(e.target).closest('.js-agenda').data('personality') ? _this3.$this.data('personality') : '';
                  var firstVisibleDate = new Date($(e.target).closest('.custom-scrollbar-wrapper').find('.agenda__header .agenda__day').first().attr('data-date') + ' 01:00:00').getTime();
                  var lastVisibleDate = new Date($(e.target).closest('.custom-scrollbar-wrapper').find('.agenda__header .agenda__day').last().attr('data-date') + ' 01:00:00').getTime();
                  $(e.target).closest('.js-agenda').addClass('loading');
                  var startRequest = (lastVisibleDate + _this3.daySeconds) / 1000;
                  var endRequest = new Date();
                  _this3.$main = $(e.target).closest('.js-agenda');
                  _this3.$header = $('.agenda__header', _this3.$main);
                  _this3.$content = $('.agenda__content', _this3.$main);
                  _this3.$viewTypeWrapper = $('.agenda__view__wrapper', _this3.$main);
                  _this3.$typeWrapper = $('.agenda__types__wrapper', _this3.$main);
                  _this3.$viewport = $('.viewport', _this3.$main);
                  _this3.viewType = $(e.target).closest('.js-agenda').attr('data-view-type');

                  if (_this3.viewType === 'daily') {
                    endRequest = (lastVisibleDate + _this3.daySeconds * 2) / 1000;
                  } else if (_this3.viewType === 'weekly') {
                    endRequest = (lastVisibleDate + _this3.daySeconds * 14) / 1000;
                  } else {
                    var oldYear = new Date(lastVisibleDate).getFullYear();
                    var oldMonth = new Date(lastVisibleDate).getMonth();
                    var newDate = oldMonth === 11 ? new Date(oldYear + 1, 1, 0, 1) : new Date(oldYear, oldMonth + 2, 0, 1);
                    endRequest = newDate.getTime() / 1000;
                  }

                  if ($(e.target).hasClass('agenda-prev')) {
                    endRequest = (firstVisibleDate - _this3.daySeconds) / 1000;

                    if (_this3.viewType === 'daily') {
                      startRequest = (firstVisibleDate - _this3.daySeconds * 2) / 1000;
                    } else if (_this3.viewType === 'weekly') {
                      startRequest = (firstVisibleDate - _this3.daySeconds * 14) / 1000;
                    } else {
                      var oldFirst = new Date(firstVisibleDate);
                      startRequest = new Date(oldFirst.setMonth(oldFirst.getMonth() - 1)).getTime() / 1000;
                    }
                  }

                  $.get("".concat(basePath, "api/v1/agenda/").concat(_this3.viewType, "?types=").concat(eventTypes, "&personality=").concat(personality, "&from=").concat(startRequest, "&to=").concat(endRequest)).done(function (response) {
                    _this3.rows = response.data;
                    _this3.currentDate = new Date(response.currentDate);

                    if (response.pagerFrom) {
                      _this3.calendarStartDate = new Date(response.pagerFrom);
                      _this3.calendarEndDate = new Date(response.pagerTo);
                    } else {
                      var date = new Date();
                      var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
                      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

                      if (_this3.viewType === 'daily') {
                        firstDay = new Date(date.getTime() - _this3.daySeconds);
                        lastDay = date;
                      } else if (_this3.viewType === 'weekly') {
                        var curDay = date.getDate() + (1 - date.getDay());
                        var curMon = new Date(date.getFullYear(), date.getMonth(), curDay).getTime();
                        firstDay = new Date(curMon - _this3.daySeconds * 7);
                        lastDay = new Date(date.setDate(date.getDate() - date.getDay() + 7));
                      }

                      _this3.calendarStartDate = firstDay;
                      _this3.calendarEndDate = lastDay;
                    }

                    _this3.noFutureEvents = response.noFutureEvents;
                    _this3.dates = _this3.fillDates(_this3.viewType);

                    if (new Date(_this3.$scrollWrapper.attr('data-start')).getTime() >= new Date(response.pagerFrom).getTime()) {
                      $('.agenda-prev', _this3.$main).hide();
                    } else {
                      $('.agenda-prev', _this3.$main).show();
                    }

                    if (new Date(_this3.$scrollWrapper.attr('data-end')).getTime() <= new Date(response.pagerTo).getTime()) {
                      $('.agenda-next', _this3.$main).hide();
                    } else {
                      $('.agenda-next', _this3.$main).show();
                    }

                    _this3.render();

                    setTimeout(function () {
                      _this3.$scrollWrapper.data('plugin_tinyscrollbar').update();
                    }, 1000);
                  }).fail(function (error) {
                    throw new Error(error);
                  }).always(function () {
                    setTimeout(function () {
                      $(e.target).closest('.js-agenda').removeClass('loading');
                    }, 1100);
                  });
                  return false;
                });
              });
            } // Bind events for popup switcher.

          }, {
            key: "bindPopupSwitcher",
            value: function bindPopupSwitcher() {
              var _this4 = this;

              var $popupSwitcher = $('.event__popup__switcher', this.$main);
              $popupSwitcher.click(function (e) {
                var $target = $(e.target);
                var $parent = $target.closest('.event__cell');
                e.preventDefault();
                $('.event__cell', _this4.$main).not($parent).removeClass('active');
                $parent.toggleClass('active');
              });
            } // Render accessible version.

          }, {
            key: "renderAccessible",
            value: function renderAccessible() {
              this.generateAccessibleContent();
            } // Set height for viewport element.

          }, {
            key: "setViewportHeight",
            value: function setViewportHeight() {
              var headerHeight = 0;

              if (this.$header.css('display') !== 'none') {
                headerHeight = this.$header.outerHeight(true);
              }

              this.$viewport.height(headerHeight + this.$content.outerHeight(true));
            } // Fill dates for needed period.

          }, {
            key: "fillDates",
            value: function fillDates(type) {
              var startCalendar = this.calendarStartDate.getTime();
              var endCalendar = this.calendarEndDate.getTime();
              var dates = [];

              switch (type) {
                case 'daily':
                  {
                    for (var i = startCalendar; i <= endCalendar; i += this.daySeconds) {
                      var date = new Date(i);

                      for (var j = 0; j <= 23; j += 1) {
                        dates.push({
                          obj: date,
                          year: date.getFullYear(),
                          month: date.getMonth(),
                          day: date.getDate(),
                          hour: j
                        });
                      }
                    }

                    break;
                  }

                case 'weekly':
                  {
                    for (var _i = startCalendar; _i <= endCalendar; _i += this.daySeconds) {
                      var _date = new Date(_i);

                      dates.push({
                        obj: _date,
                        year: _date.getFullYear(),
                        month: _date.getMonth(),
                        day: _date.getDate()
                      });
                    }

                    break;
                  }

                default:
                  {
                    for (var _i2 = startCalendar; _i2 <= endCalendar; _i2 += this.daySeconds) {
                      var _date2 = new Date(_i2);

                      dates.push({
                        obj: _date2,
                        year: _date2.getFullYear(),
                        month: _date2.getMonth(),
                        day: _date2.getDate()
                      });
                    }
                  }
              }

              this.cachedDates[type] = dates;
              return dates;
            } // Get amount of dates in month.

          }, {
            key: "setViewType",
            // Set view type.
            value: function setViewType(type) {
              var newType = this.viewTypes[type] ? type : 'monthly';
              this.viewType = newType;
              this.$this.attr('data-view-type', newType);
            } // Generate header for month view.

          }, {
            key: "generateMonthHeader",
            value: function generateMonthHeader() {
              var temporaryMonthIndex = 100;
              var $temporaryMonth = $();
              var $headerMonth = $('<div class="agenda__header__month"></div>');
              var currentYear = this.currentDate.getFullYear();
              var currentMonth = this.currentDate.getMonth();
              var currentDay = this.currentDate.getDate();

              for (var i = 0; i < this.dates.length; i += 1) {
                var date = this.dates[i];
                var current = currentYear === date.year && currentMonth === date.month && currentDay === date.day;
                var daysInMonth = new Date(date.year, date.month + 1, 0).getDate();

                if (temporaryMonthIndex !== date.month) {
                  $temporaryMonth = $headerMonth.clone().appendTo(this.$header);
                  $temporaryMonth.append("<div class=\"agenda__month__name\">".concat(new Date(date.year, date.month).toLocaleString(this.lang, {
                    month: 'long'
                  }), "</div>"));
                  temporaryMonthIndex = date.month;
                }

                var dateText = "".concat(date.year, "-").concat(date.month + 1, "-").concat(date.day);
                $temporaryMonth.append("<div class=\"agenda__day agenda__day-".concat(daysInMonth).concat(current ? ' today' : '', "\" data-date=\"").concat(dateText, "\">").concat(date.day, "</div>"));
              }
            } // Generate header for week view.

          }, {
            key: "generateWeekHeader",
            value: function generateWeekHeader() {
              var currentDay = this.currentDate;

              for (var i = 0; i < this.dates.length; i += 1) {
                var today = currentDay.getDate() === this.dates[i].day && currentDay.getMonth() === this.dates[i].month && currentDay.getFullYear() === this.dates[i].year;
                var name = '';

                if (this.dates[i].obj !== undefined) {
                  name = "".concat(this.dates[i].obj.toLocaleDateString(this.lang, {
                    weekday: 'long'
                  }), " ").concat(this.dates[i].day);
                }

                var dateText = "".concat(this.dates[i].year, "-").concat(this.dates[i].month + 1, "-").concat(this.dates[i].day);
                this.$header.append("<div class=\"agenda__day".concat(today ? ' today' : '', "\" data-date=\"").concat(dateText, "\">").concat(name, "</div>"));
              }
            } // Generate header for day view.

          }, {
            key: "generateDayHeader",
            value: function generateDayHeader() {
              var currentDay = this.currentDate.getDate();
              var currentHour = this.currentDate.getHours();

              for (var i = 0; i < this.dates.length; i += 1) {
                var midnight = this.dates[i].hour === 0;
                var today = currentHour === this.dates[i].hour && currentDay === this.dates[i].day;
                var month = new Date(this.dates[i].year, this.dates[i].month).toLocaleString(this.lang, {
                  month: 'long'
                });
                var name = midnight ? "<span>".concat(this.dates[i].day, " ").concat(month, "</span>") : "".concat(this.dates[i].hour, "h");
                var dateText = "".concat(this.dates[i].year, "-").concat(this.dates[i].month + 1, "-").concat(this.dates[i].day);
                this.$header.append("<div class=\"agenda__day".concat(midnight ? ' highlight' : '').concat(today ? ' today' : '', "\" data-date=\"").concat(dateText, "\">").concat(name, "</div>"));
              }
            } // Order events before printing.

          }, {
            key: "orderEvents",
            value: function orderEvents(events) {
              var _this5 = this;

              var currentItem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
              var currentRow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
              var ordered = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

              if (events.length) {
                var _ret = function () {
                  var daily = _this5.viewType === 'daily';
                  var eventsArray = ordered.length ? ordered : [_toConsumableArray(events)];
                  var compareEvent = eventsArray[currentRow][currentItem];
                  var startObj = compareEvent.startDate;
                  var startHour = daily && startObj.hour ? startObj.hour : 0;
                  var startDate = new Date(startObj.year, startObj.month - 1, startObj.day, startHour).getTime();
                  var endObj = $.isEmptyObject(compareEvent.endDate) ? false : compareEvent.endDate;
                  var endHour = endObj && daily && endObj.hour ? endObj.hour : 23;
                  var endDate = endObj ? new Date(endObj.year, endObj.month - 1, endObj.day, endHour).getTime() : false;

                  var tempArray = _toConsumableArray(eventsArray);

                  var _loop = function _loop(i) {
                    var event = eventsArray[currentRow][i];
                    var _event$startDate = event.startDate,
                        year = _event$startDate.year,
                        month = _event$startDate.month,
                        day = _event$startDate.day;
                    var eventHour = daily && event.hour ? event.hour : 0;
                    var eventDate = new Date(year, month - 1, day, eventHour).getTime();
                    var eventMargin = _this5.daySeconds * _this5.gapDays;

                    if (eventDate <= startDate + eventMargin || endDate && eventDate <= endDate + eventMargin && eventDate > startDate + eventMargin) {
                      // Copy event to new level of array if it intersects with current date.
                      if (!tempArray[currentRow + 1]) {
                        tempArray.push([]);
                      }

                      tempArray[currentRow + 1].push(event); // Delete this event from current row of array, because it was copied.

                      tempArray[currentRow] = tempArray[currentRow].filter(function (el, idx) {
                        return idx !== tempArray[currentRow].indexOf(event);
                      });
                    }
                  };

                  for (var i = currentItem + 1; i < eventsArray[currentRow].length; i += 1) {
                    _loop(i);
                  } // Check next element in array.


                  if (currentItem < tempArray[currentRow].length - 1) {
                    return {
                      v: _this5.orderEvents(events, currentItem + 1, currentRow, tempArray)
                    };
                  } // Check elements from new line.


                  if (tempArray[currentRow + 1]) {
                    return {
                      v: _this5.orderEvents(events, 0, currentRow + 1, tempArray)
                    };
                  }

                  return {
                    v: tempArray
                  };
                }();

                if (_typeof(_ret) === "object") return _ret.v;
              }

              return [[]];
            } // Created all needed cells and fill them with events.

          }, {
            key: "populateCells",
            value: function populateCells(dateRows, color) {
              var $output = [];

              for (var rowIndex = 0; rowIndex < dateRows.length; rowIndex += 1) {
                var events = dateRows[rowIndex];
                var $dayWrapper = $('<div class="agenda__day__wrapper"></div>');
                var content = '';
                var event = '';
                $output.push($dayWrapper);

                for (var i = 0; i < this.dates.length; i += 1) {
                  var date = this.dates[i];
                  var daysInMonth = '';

                  if (this.viewType === 'monthly') {
                    daysInMonth = " agenda__day-".concat(new Date(date.year, date.month + 1, 0).getDate());
                  }

                  event = '';

                  for (var idx = 0; idx < events.length; idx += 1) {
                    event = this.buildEventCell(events[idx], date, i, color);

                    if (event.length) {
                      break;
                    }
                  }

                  content += "<div class=\"agenda__day".concat(daysInMonth, "\">").concat(event, "</div>");
                }

                $dayWrapper.append(content);
              }

              return $output;
            } // Building cells with events.

          }, {
            key: "buildEventCell",
            value: function buildEventCell(eventObj, date, dateIndex, color) {
              var event = '';
              var multiplier = 1;
              var _eventObj$startDate = eventObj.startDate,
                  year = _eventObj$startDate.year,
                  month = _eventObj$startDate.month,
                  day = _eventObj$startDate.day;
              var endYearTemp = eventObj.endDate.year;
              var endMonthTemp = eventObj.endDate.month;
              var endDayTemp = eventObj.endDate.day;
              var startDate = new Date(year, month - 1, day).getTime();
              var endDateTemp = new Date(endYearTemp, endMonthTemp - 1, endDayTemp).getTime();
              var endCalendarDate = new Date(this.calendarEndDate).getTime();
              var currentDate = new Date(date.year, date.month, date.day).getTime();
              var className = dateIndex === 0 && currentDate > startDate ? ' event-past' : '';
              var classFutureName = endCalendarDate < endDateTemp ? ' event-future' : ''; // I know that it is not good code Â¯\_(ã)_/Â¯.

              if (this.viewType === 'daily') {
                var hour = eventObj.startDate.hour ? eventObj.startDate.hour : 0;

                if (date.year === year && date.month + 1 === month && date.day === day && date.hour === hour || dateIndex === 0 && currentDate > startDate) {
                  // Detect how many days event will take.
                  if (eventObj.endDate.day) {
                    var endDate = eventObj.endDate;
                    var endHour = endDate.hour ? endDate.hour : 23;
                    var endMonth = endDate.month - 1;
                    var endObj = new Date(endDate.year, endMonth, endDate.day, endHour);
                    var diff = endObj - new Date(year, month - 1, day, hour);
                    currentDate = new Date(date.year, date.month, date.day, hour);

                    if (dateIndex === 0 && currentDate > startDate) {
                      diff = endObj - currentDate;
                    }

                    var hours = diff / this.hourSeconds;
                    multiplier += hours;
                    multiplier = this.dates.length - dateIndex < multiplier ? this.dates.length - dateIndex : multiplier;
                  }

                  event = "<div style=\"width: ".concat(100 * multiplier, "%;\" class=\"event__cell").concat(className).concat(classFutureName, "\">").concat(Drupal.theme('agendaEventCell', eventObj, color), "</div>");
                }
              } else if (dateIndex === 0 && currentDate > startDate || currentDate === startDate) {
                // Detect how many days event will take.
                if (eventObj.endDate.day) {
                  var _endDate = eventObj.endDate;
                  var endDateObj = new Date(_endDate.year, _endDate.month - 1, _endDate.day);

                  var _diff = endDateObj - new Date(year, month - 1, day);

                  if (dateIndex === 0 && currentDate > startDate) {
                    _diff = endDateObj - currentDate;
                  }

                  var days = _diff / this.daySeconds;
                  multiplier += days;
                  multiplier = this.dates.length - dateIndex < multiplier ? this.dates.length - dateIndex : multiplier;
                }

                event = "<div style=\"width: ".concat(100 * multiplier, "%;\" class=\"event__cell").concat(className).concat(classFutureName, "\">").concat(Drupal.theme('agendaEventCell', eventObj, color), "</div>");
              }

              return event;
            } // Generate selector for view type.

          }, {
            key: "generateViewTypeSelector",
            value: function generateViewTypeSelector() {
              var _this6 = this;

              var keys = Object.keys(this.viewTypes);

              var _loop2 = function _loop2(i) {
                var type = keys[i];
                var viewTypes = {
                  monthly: Drupal.t('Month'),
                  weekly: Drupal.t('Week'),
                  daily: Drupal.t('Day')
                };
                var name = viewTypes[keys[i]];
                var $link = $("<a class=\"agenda__view__selector".concat(type === _this6.viewType ? ' active' : '', "\" href=\"#\">").concat(name, "</a>"));
                $link.appendTo(_this6.$viewTypeWrapper);
                $link.click(function (e) {
                  e.preventDefault();
                  _this6.$main = $(e.target).closest('.js-agenda');
                  _this6.$header = $('.agenda__header', _this6.$main);
                  _this6.$content = $('.agenda__content', _this6.$main);
                  _this6.$viewTypeWrapper = $('.agenda__view__wrapper', _this6.$main);
                  _this6.$typeWrapper = $('.agenda__types__wrapper', _this6.$main);
                  _this6.$viewport = $('.viewport', _this6.$main);

                  if (!$(e.target).hasClass('active')) {
                    $('.agenda__view__selector', _this6.$viewTypeWrapper).removeClass('active');
                    $link.addClass('active');

                    _this6.setViewType(type);

                    _this6.dates = _this6.fillDates(type);

                    _this6.getRows();

                    setTimeout(function () {
                      _this6.$scrollWrapper.data('plugin_tinyscrollbar').update();
                    }, 1000);
                  }

                  var top = $(_this6.$main).offset().top - 100;
                  $('html, body').animate({
                    scrollTop: top
                  }, '300');
                });
              };

              for (var i = 0; i < keys.length; i += 1) {
                _loop2(i);
              }
            } // Generate main content of calendar.

          }, {
            key: "generateContent",
            value: function generateContent() {
              var _this7 = this;

              var keys = Object.keys(this.rows);

              var _loop3 = function _loop3(i) {
                var type = keys[i];
                var row = _this7.rows[keys[i]];
                var eventsToOrder = [];

                for (var ind = 0; ind < row.events.length; ind += 1) {
                  var startEv = row.events[ind].startDate;
                  var endEv = row.events[ind].endDate;
                  var startEvDate = new Date(startEv.year, startEv.month - 1, startEv.day).getTime();
                  var endEventDate = new Date(endEv.year, endEv.month - 1, endEv.day).getTime();
                  var startDate = _this7.dates[0];
                  var startDateObj = new Date(startDate.year, startDate.month, startDate.day);
                  var currentStart = startDateObj.getTime();
                  var endDate = _this7.dates[_this7.dates.length - 1];
                  var currentEnd = new Date(endDate.year, endDate.month, endDate.day).getTime();

                  if (startEvDate < currentEnd && endEventDate > currentStart) {
                    eventsToOrder.push(row.events[ind]);
                  }

                  if (row.events[ind].subevents !== undefined) {
                    for (var subInd = 0; subInd < row.events[ind].subevents.length; subInd += 1) {
                      startEv = row.events[ind].subevents[subInd].startDate;
                      endEv = row.events[ind].subevents[subInd].endDate;
                      startEvDate = new Date(startEv.year, startEv.month - 1, startEv.day).getTime();
                      endEventDate = new Date(endEv.year, endEv.month - 1, endEv.day).getTime();

                      if (startEvDate < currentEnd && endEventDate > currentStart) {
                        eventsToOrder.push(row.events[ind].subevents[subInd]);
                      }
                    }
                  }
                }

                var $rowWrapper = $("<div style=\"background: ".concat(row.color, ";\" class=\"show agenda__row\"></div>"));

                var orderedEvents = _this7.orderEvents(eventsToOrder);

                _this7.$content.append($rowWrapper);

                $rowWrapper.append(_this7.populateCells(orderedEvents, row.color)); // Generate controls.

                var $typeSelect = $("<a href=\"#\" style=\"color: ".concat(row.color, "; background: ").concat(row.color, ";\" class=\"btn agenda__type__selector\">").concat(type, "</a>")).appendTo(_this7.$typeWrapper);
                $typeSelect.click(function (e) {
                  e.preventDefault();
                  var $row = $('.agenda__row', _this7.$content);

                  if ($('.agenda__row:not(.show)', _this7.$content).length === 0 && !$('.agenda__type__selector', _this7.$typeWrapper).hasClass('active')) {
                    $row.removeClass('show');
                  }

                  $(e.target).toggleClass('active');
                  $rowWrapper.toggleClass('show', $(e.target).hasClass('active'));

                  if (!$row.hasClass('show')) {
                    $row.addClass('show');
                  }

                  _this7.setViewportHeight();
                });
              };

              for (var i = 0; i < keys.length; i += 1) {
                _loop3(i);
              }

              this.setViewportHeight();
            } // Prepare accessible data for printing.

          }, {
            key: "prepareAccessibleData",
            value: function prepareAccessibleData(row) {
              var data = {};

              for (var j = 0; j < row.events.length; j += 1) {
                var $event = row.events[j];
                var startObj = $event.startDate;
                var startDate = new Date(startObj.year, startObj.month - 1, startObj.day);
                var startListObj = this.accessibleDates[0];
                var startList = new Date(startListObj.year, startListObj.month, startListObj.day);
                var endListObj = this.accessibleDates[this.accessibleDates.length - 1];
                var endList = new Date(endListObj.year, endListObj.month, endListObj.day);

                if (startDate.getTime() < startList.getTime()) {
                  this.accessibleDates = [];
                  var daysCount = (endList.getTime() - startDate.getTime()) / this.daySeconds;

                  for (var i = 0; i <= daysCount; i += 1) {
                    var date = new Date(startDate.getTime() + this.daySeconds * i);
                    this.accessibleDates.push({
                      obj: date,
                      year: date.getFullYear(),
                      month: date.getMonth(),
                      day: date.getDate()
                    });
                  }
                }
              }

              for (var _i3 = 0; _i3 < this.accessibleDates.length; _i3 += 1) {
                var _date3 = this.accessibleDates[_i3];

                for (var idx = 0; idx < row.events.length; idx += 1) {
                  var event = row.events[idx];

                  if (event.startDate.month === _date3.month && event.startDate.day === _date3.day) {
                    if (!data[_date3.day]) {
                      data[_date3.day] = {};
                      data[_date3.day].events = [];
                      data[_date3.day].date = _date3.obj;
                    }

                    data[_date3.day].events.push(event);
                  }

                  if (row.events[idx].subevents !== undefined) {
                    for (var subIdx = 0; subIdx < row.events[idx].subevents.length; subIdx += 1) {
                      var subevent = row.events[idx].subevents[subIdx];

                      if (subevent.startDate.month === _date3.month && subevent.startDate.day === _date3.day) {
                        if (!data[_date3.day]) {
                          data[_date3.day] = {};
                          data[_date3.day].events = [];
                          data[_date3.day].date = _date3.obj;
                        }

                        data[_date3.day].events.push(row.events[idx].subevents[subIdx]);
                      }
                    }
                  }
                }
              }

              return data;
            } // Generate main content for accessible version.

          }, {
            key: "generateAccessibleContent",
            value: function generateAccessibleContent() {
              var _this8 = this;

              var keys = Object.keys(this.accessibleRows);
              var firstDay = this.accessibleDates[0].obj;
              var lastDay = this.accessibleDates[this.accessibleDates.length - 1].obj;
              var noEvents = Drupal.t('No events');
              var noEventsFlag = true;
              var text = Drupal.t('Week from !from to !to', {
                '!from': firstDay.toLocaleString(this.lang, {
                  month: 'long',
                  day: 'numeric'
                }),
                '!to': lastDay.toLocaleString(this.lang, {
                  month: 'long',
                  day: 'numeric'
                })
              });
              this.$accessibleEvents.before("<div class=\"agenda__events__title\">".concat(text, "</div>"));

              for (var i = 0; i < keys.length; i += 1) {
                var type = keys[i];
                var row = this.accessibleRows[keys[i]];

                if (row.events.length) {
                  (function () {
                    var $eventList = $(Drupal.theme('agendaAccessibleEventList', _this8.prepareAccessibleData(row), type, _this8.lang));

                    _this8.$accessibleEvents.append($eventList);

                    noEventsFlag = false; // Generate controls.

                    var $typeSelect = $("<a href=\"#\" class=\"btn agenda__type__selector\">".concat(type, "</a>")).appendTo(_this8.$accessibleTypeWrapper);
                    $typeSelect.click(function (e) {
                      e.preventDefault();
                      $('.agenda__event__list', _this8.$accessibleEvents).hide();
                      $('.agenda__type__selector', _this8.$accessibleTypeWrapper).removeClass('active');
                      $eventList.show();
                      $(e.target).addClass('active');
                    });
                  })();
                }
              }

              if (noEventsFlag) {
                this.$accessibleEvents.append("<div class=\"event__title\">".concat(noEvents, "</div>"));
              }

              if ($('.agenda__day__event[data-date]', this.$accessibleEvents).length) {
                var oldFirstDate = firstDay.toLocaleString('default', {
                  month: 'long',
                  day: 'numeric'
                });
                var newFirstDate = $('.agenda__day__event[data-date]', this.$accessibleEvents).attr('data-date');
                var newDateFull = new Date("".concat(new Date().getUTCFullYear(), " ").concat(newFirstDate));

                if (oldFirstDate !== newFirstDate && newDateFull.getTime() < firstDay.getTime()) {
                  var newTitle = Drupal.t('Week from !from to !to', {
                    '!from': newFirstDate,
                    '!to': lastDay.toLocaleString(this.lang, {
                      month: 'long',
                      day: 'numeric'
                    })
                  });
                  $('.agenda__events__title', this.$main).text(newTitle);
                }
              }

              $('.agenda__type__selector', this.$accessibleTypeWrapper).first().addClass('active');
            }
          }], [{
            key: "getDaysInMonth",
            value: function getDaysInMonth(month, year) {
              return new Date(year, month + 1, 0).getDate();
            }
          }]);

          return Agenda;
        }();

        var agenda = new Agenda($(element));
        agenda.getRows();
        agenda.getAccessibleRows();
      });
    }
  };
  /**
   * Theme for agenda block with main structure.
   */

  Drupal.theme.agendaMainStructure = function () {
    var output = '';
    output += '<div class="custom-scrollbar-wrapper">';
    output += '<div class="viewport">';
    output += '<div class="agenda__main__wrapper overview">';
    output += '<div class="agenda__header"></div>';
    output += '<div class="agenda__content"></div>';
    output += '</div>';
    output += '</div>';
    output += '<div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>';
    output += '<div class="agenda__buttons">';
    output += '<button class="agenda-prev"></button>';
    output += '<button class="agenda-next"></button>';
    output += '</div>';
    output += '</div>';
    output += '<div class="agenda__controls">';
    output += '<div class="agenda__view__wrapper"></div>';
    output += '<div class="agenda__types__wrapper"></div>';
    output += '</div>';
    output += '<div class="agenda--accessible">';
    output += '<div class="agenda__types__wrapper--accessible"></div>';
    output += '<div class="agenda__events"></div>';
    output += '</div>';
    return output;
  };
  /**
   * Theme for event cell.
   */


  Drupal.theme.agendaEventCell = function (event, color) {
    var output = '';
    output += "<div class=\"event__title\">".concat(event.name, "</div>");
    output += '<div class="event__content">';

    if (event.detailPage) {
      output += event.detailPage;
    } else if (event.longTitle || event.shortDescription) {
      output += "<a style=\"color: ".concat(color, "\" class=\"event__popup__switcher\" href=\"#\"></a>");
      output += '<div class="event__popup">';
      output += "<div class=\"event__popup__title\">".concat(event.longTitle, "</div>");

      if (event.shortDescription !== null) {
        output += "<div class=\"event__popup__description\">".concat(event.shortDescription, "</div>");
      }

      output += '</div>';
    }

    output += '</div>';
    return output;
  };
  /**
   * Theme for accessible event list.
   */


  Drupal.theme.agendaAccessibleEventList = function (days, type, lang) {
    var output = '';
    var keys = Object.keys(days);
    output += '<div class="agenda__event__list">';

    for (var i = 0; i < keys.length; i += 1) {
      var day = days[keys[i]];
      output += '<div class="agenda__day--accessible">';
      output += "<div class=\"agenda__day__title\">".concat(day.date.toLocaleString(lang, {
        weekday: 'long',
        day: 'numeric'
      }), "</div>");

      for (var idx = 0; idx < day.events.length; idx += 1) {
        var event = day.events[idx];
        var _event$startDate2 = event.startDate,
            hour = _event$startDate2.hour,
            minutes = _event$startDate2.minutes;
        var eventStart = event.startDate;
        var startObj = new Date(eventStart.year, eventStart.month - 1, eventStart.day);
        var stringDate = idx === 0 ? startObj.toLocaleString('default', {
          month: 'long',
          day: 'numeric'
        }) : '';
        hour = hour && hour < 10 ? "0".concat(hour) : hour;
        minutes = minutes && minutes < 10 ? "0".concat(minutes) : '00';
        output += "<div class=\"agenda__day__event\" data-date=\"".concat(stringDate, "\">");
        output += "<div class=\"event__time\">".concat(hour ? "".concat(hour, "h").concat(minutes) : '', "</div>");
        output += '<div class="event__content">';
        output += "<div class=\"event__title\">".concat(event.name, "</div>");

        if (event.shortDescription !== null) {
          output += "<div class=\"event__description\">".concat(event.shortDescription, "</div>");
        }

        output += '</div>';
        output += '</div>';
      }

      output += '</div>';
    }

    output += '</div>';
    return output;
  };
})(jQuery, Drupal, drupalSettings);
"use strict";

(function ($, Drupal) {
  /**
   * Create kiosque tabs.
   */
  Drupal.behaviors.agendaSummary = {
    attach: function attach(context) {
      $('.agenda-summary', context).once('agendaSummary').each(function (index, element) {
        $(element).find('.agenda-summary-list li a').each(function (index, item) {
          $(item).click(function () {
            // check if it is not builder mode
            if (!$(element).hasClass('layout-builder-block')) {
              $(document).ajaxComplete(function () {
                var wW = $(window).width();

                if ($('.ui-dialog').find('.agenda-list-wrapper')) {
                  var getSizes = function getSizes(val) {
                    var $viewportHeight = $(window).height();
                    var $paddingTop = $popup.css('paddingTop');
                    var $paddingBottom = $popup.css('paddingBottom');
                    var $titleHeight = $popup.find('.ui-dialog-title').outerHeight();
                    var $listHeight = $popup.find('.agenda-list-wrapper').outerHeight();
                    var $differnt = $viewportHeight - $titleHeight - parseInt($paddingTop) - parseInt($paddingBottom) - val * 2;

                    if ($listHeight > $differnt) {
                      var setScroll = function setScroll() {
                        scrollWrapper.css('height', $differnt + 'px');
                        scrollWrapper.overlayScrollbars({});
                      };

                      var isWrapper = $container.find('.agenda-summary-scrollbar-wrapper');
                      var scrollWrapper; // check if scroll in not in the popup

                      if (isWrapper.length === 0) {
                        $container.wrapInner('<div class="agenda-summary-scrollbar-wrapper"></div>');
                        scrollWrapper = $container.find('.agenda-summary-scrollbar-wrapper');
                        setScroll();
                      } else if (isWrapper.length === 1) {
                        scrollWrapper = $container.find('.agenda-summary-scrollbar-wrapper');
                        setScroll();
                      }
                    }
                  };

                  $('.ui-dialog').addClass('agenda-summary-popup');
                  $('.ui-widget-overlay').addClass('agenda-summary-popup--overlay');

                  if (wW < 768) {
                    $('html').addClass('agenda-no-scroll');
                  }

                  var $popup = $('.agenda-summary-popup');
                  var $titleAgenda = $popup.find('h2');
                  var $titlePopup = $popup.find('.ui-dialog-title');
                  $titlePopup.empty().append($titleAgenda);
                  var $container = $(".ui-dialog .ui-dialog-content");
                  $container.css('overflow', 'inherit');
                  getSizes(0);
                  setTimeout(function () {
                    if ($popup.length) {
                      var $postop = $popup.position().top;
                      getSizes($postop);
                    }
                  }, 500);
                  $(window).resize(function () {
                    if ($popup.length) {
                      var $postopResize = $popup.position().top;
                      getSizes($postopResize);
                    }
                  });
                }
              });
            } // end of checking if it is not builder mode

          });
        });
        $(document).ajaxComplete(function () {
          $('.ui-dialog-titlebar-close').click(function () {
            $('html').removeClass('agenda-no-scroll');
          });
        });
      });
    }
  };
})(jQuery, Drupal);
"use strict";

/* eslint-disable no-use-before-define */
(function ($, Drupal) {
  /**
   * blockÐ¡ookie
   */
  Drupal.behaviors.blockÐ¡ookie = {
    attach: function attach(context) {
      $('body', context).once('blockÐ¡ookie').each(function (index, element) {
        var myBtnInterval;
        var buttonsNow = [];
        var buttonsThen = [];

        function recheckButtons() {
          var buttons = document.querySelectorAll('button[aria-pressed]');
          buttonsThen = [];
          buttons.forEach(function (button) {
            if (button.getAttribute('aria-pressed') === 'true') {
              buttonsThen.push(1);
            } else {
              buttonsThen.push(0);
            }
          });
        }

        function pageReloadBehavior() {
          var buttons = document.querySelectorAll('button[aria-pressed]');
          recheckButtons();
          buttons.forEach(function (button) {
            button.addEventListener('click', function () {
              recheckButtons();
            });
          });

          for (var i = 0; i < buttonsNow.length; i++) {
            if (buttonsNow[i] !== buttonsThen[i]) {
              window.location.reload();
            }
          }
        }

        var addConfirmbtn = function addConfirmbtn() {
          function createBtn() {
            var banner = element.querySelector('#tarteaucitronRoot');

            if (banner) {
              var closeBtn = banner.querySelector('#tarteaucitronClosePanel');
              var popup = banner.querySelector('#tarteaucitronServices');
              var confirmBtn = document.createElement('button');
              confirmBtn.classList.add('cookies-confirmBtn');
              confirmBtn.textContent = Drupal.t('Confirm my choices');
              popup.append(confirmBtn);
              var closePopupEmulator = document.createElement('button');
              closePopupEmulator.classList.add('cookies-closeBtnEmulator');
              closePopupEmulator.textContent = Drupal.t('Close');
              popup.insertAdjacentElement("beforeBegin", closePopupEmulator);
              var holder = document.querySelector('#tarteaucitronBack');
              var confirmButton = document.querySelector('.tarteaucitronCTAButton.tarteaucitronAllow');
              confirmButton.addEventListener('click', function () {
                window.location.reload();
              });
              var videoResponsive = document.querySelectorAll('.video-embed-field-responsive-video .tac_activate');

              if (videoResponsive.length > 0) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                  for (var _iterator = videoResponsive[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var container = _step.value;
                    var par = container.closest('.youtube_playlist_custom_wrapper');

                    if (par) {
                      par.removeAttribute('style');
                    }
                  }
                } catch (err) {
                  _didIteratorError = true;
                  _iteratorError = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                      _iterator.return();
                    }
                  } finally {
                    if (_didIteratorError) {
                      throw _iteratorError;
                    }
                  }
                }
              }

              confirmBtn.addEventListener('click', function (e) {
                e.preventDefault();
                closeBtn.click();
                pageReloadBehavior();
              });
              holder.addEventListener('click', function (e) {
                e.preventDefault();
                closeBtn.click();
                pageReloadBehavior();
              });
              closePopupEmulator.addEventListener('click', function (e) {
                e.preventDefault();
                closeBtn.click();
                pageReloadBehavior();
              });
              clearInterval(myBtnInterval);
            }
          }

          function checkFormSelections() {
            var buttons = document.querySelectorAll('button[aria-pressed]');
            buttons.forEach(function (button) {
              if (button.getAttribute('aria-pressed') === 'true') {
                buttonsNow.push(1);
              } else {
                buttonsNow.push(0);
              }
            });
          }

          myBtnInterval = setInterval(function () {
            createBtn();
            checkFormSelections();
          }, 1000);
        };

        addConfirmbtn();

        var changeText = function changeText() {
          function moveTitle() {
            var banner = element.querySelector('#tarteaucitronRoot');

            if (banner) {
              var lines = banner.querySelectorAll('li.tarteaucitronLine');

              if (lines.length > 0) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                  for (var _iterator2 = lines[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var item = _step2.value;
                    var title = item.querySelector('.tarteaucitronH3');
                    var buttonsContainer = item.querySelector('.tarteaucitronAsk');

                    if (title) {
                      buttonsContainer.prepend(title);
                    }
                  }
                } catch (err) {
                  _didIteratorError2 = true;
                  _iteratorError2 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                      _iterator2.return();
                    }
                  } finally {
                    if (_didIteratorError2) {
                      throw _iteratorError2;
                    }
                  }
                }
              }

              clearInterval(myInterval);
            }
          }

          var myInterval = setInterval(moveTitle, 1000);
        };

        function WidthChange(mq) {
          if (mq.matches) {
            changeText();
          }
        }

        var media = '(max-width: 767px)';
        var mq = window.matchMedia(media);
        mq.addListener(WidthChange);
        WidthChange(mq);
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
   * Create kiosque tabs.
   */
  Drupal.behaviors.kiosqueTabs = {
    attach: function attach(context) {
      $('.js-block-kiosque', context).once('kiosqueTabs').each(function (index, element) {
        var tabs = element;
        var tabButton = $('[aria-controls]', tabs);
        tabButton.click(function (e) {
          var target = e.target;
          var targetButton = $(target).is('button') ? $(target)[0] : $(target).parents('button')[0];
          var isExpanded = targetButton.getAttribute('aria-selected') === true;
          var active = tabs.querySelector('[aria-selected="true"]');

          if (active && active !== targetButton) {
            // Set the expanded state on the triggering element
            active.setAttribute('aria-selected', 'false'); // Hide the accordion sections, using aria-controls to specify the desired section

            document.getElementById(active.getAttribute('aria-controls')).setAttribute('hidden', '');
          }

          if (!isExpanded) {
            // Set the expanded state on the triggering element
            targetButton.setAttribute('aria-selected', 'true'); // Hide the accordion sections, using aria-controls to specify the desired section

            document.getElementById(targetButton.getAttribute('aria-controls')).removeAttribute('hidden');
          }
        });
        tabButton.keydown(function (e) {
          var code = e.keyCode || e.which;

          if (code === 13 || code === 32) {
            $(e.target).click();
          }
        });
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
   * Create kiosque tabs.
   */
  Drupal.behaviors.boContent = {
    attach: function attach(context) {
      $('.bo_content_wrapper', context).once('boContent').each(function (index, element) {
        var $isnextEl = $(element).closest('.one__column__header').next('.one__column__main').find('.container').children();
        var $isnextElLength = $isnextEl.length;

        if (!$isnextElLength) {
          $(element).closest('.one__column__header').next('.one__column__main').hide();
        }
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
   * Create service slider.
   */
  Drupal.behaviors.edugouvThematicSliderNewBehavior = {
    attach: function attach(context) {
      $('.js-slick--thematic-slider-new', context).once('edugouvThematicSliderNewBehavior').each(function (index, element) {
        var $sliderHorizontal = $(element);
        var showedSlides = 3;
        var isEditor = $(element).closest('.ckeditor-text');

        if (isEditor.closest('.basic_page--full').length) {
          showedSlides = 3;
        } else if ($(element).closest('.ckeditor-text').length) {
          showedSlides = 2;
        }

        $sliderHorizontal.slick({
          infinite: true,
          slidesToShow: showedSlides,
          slidesToScroll: 1,
          dots: true,
          centerMode: true,
          centerPadding: '60px',
          responsive: [{
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerPadding: '0px',
              centerMode: false
            }
          }]
        });
        var $nextSlide = $sliderHorizontal.find('.slick-next');
        var $prevSlide = $sliderHorizontal.find('.slick-prev');
        var $translatableAriaNext = Drupal.t('Next slide');
        var $translatableAriaPrev = Drupal.t('Previous slide');
        $nextSlide.attr('aria-label', $translatableAriaNext);
        $prevSlide.attr('aria-label', $translatableAriaPrev);
        var randId = Math.floor(Math.random() * 1000);
        var $sliderContainer = element.closest('.thematic-page-slider');
        $($sliderContainer).find('h2').attr('id', "title-thematic-page-slider".concat(randId));
        $($sliderContainer).find('.slick-dots').attr('aria-labelledby', "title-thematic-page-slider".concat(randId));
        $($sliderContainer).find('.js-slick--thematic-slider').attr('aria-labelledby', "title-thematic-page-slider".concat(randId));
        var $slideTitles = $sliderContainer.querySelectorAll('.thematic-page-slide:not(.slick-cloned) h3');
        var $slickDots = $sliderContainer.querySelectorAll('.slick-dots li');
        $sliderHorizontal.on('afterChange', function () {
          setTimeout(function () {
            // $('.slick-slide').removeAttr('aria-describedby');
            $sliderHorizontal.find('.slick-dots li button').attr('tabindex', '0');
          }, 1);
        });
        $slideTitles.forEach(function (item, i) {
          $(item).attr('id', "slide-thematic-title".concat(i + 1).concat(index)); // $(item).closest('.thematic-page-slide').removeAttr('aria-describedby');
        });
        $slickDots.forEach(function (item, i) {
          $(item).attr('aria-labelledby', "slide-thematic-title".concat(i + 1).concat(index));
          $(item).find('button').attr('aria-label', "".concat(i + 1, " ").concat(Drupal.t('sur'), " ").concat($slickDots.length));
        });

        function moveList() {
          var list = $sliderHorizontal.find('.slick-list');
          $sliderHorizontal.append(list);
        }

        var $slides = $sliderContainer.querySelectorAll('.thematic-page-slide');
        $slides.forEach(function (item) {
          var idAttribute = item.getAttribute('id');

          if (idAttribute && idAttribute != '') {
            var trimedIdtext = idAttribute.trim();
            item.setAttribute('id', trimedIdtext);
          } else {
            item.removeAttribute('id');
          }
        });
        setTimeout(function () {
          $nextSlide.html(Drupal.t('Next'));
          $prevSlide.html(Drupal.t('Previous'));
        });

        function checkDotsAndSlides() {
          var slides = $sliderContainer.querySelectorAll('.thematic-page-slide:not(.slick-cloned)');

          if ($slickDots.length < slides.length) {
            $sliderContainer.querySelector('.slick-dots').classList.add('hide-dots');
            slides.forEach(function (slide) {
              slide.removeAttribute('aria-describedby');
            });
          } else {
            $sliderContainer.querySelector('.slick-dots').classList.remove('hide-dots');
          }
        }

        checkDotsAndSlides();
        setTimeout(moveList(), 0);
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
   * Create bulletin tabs.
   */
  Drupal.behaviors.bulletinTabs = {
    attach: function attach(context) {
      $('.js-current-bulletin', context).once('bulletinTabs').each(function (index, element) {
        var tabs = element;
        var tabButton = $('[aria-controls]', tabs);
        tabButton.attr('aria-selected', false);
        tabButton.eq(0).attr('aria-selected', true);

        function makeButtonsActive(tab) {
          tab.find('a').attr('tabindex', '0');
        }

        function makeButtonsInactive(tab) {
          tab.find('a').attr('tabindex', '-1');
        }

        tabButton.each(function () {
          makeButtonsInactive($(this));
        });
        makeButtonsActive(tabButton.eq(0));
        tabButton.click(function (e) {
          var target = e.target;
          var targetButton = $(target).is('.current-bulletin-pages__header__button') ? $(target)[0] : $(target).parents('.current-bulletin-pages__header__button')[0];
          var isExpanded = targetButton.getAttribute('aria-selected') === true;
          var active = tabs.querySelector('[aria-selected="true"]');
          tabButton.each(function () {
            makeButtonsInactive($(this));
          });
          makeButtonsActive($(target));

          if (active && active !== targetButton) {
            // Set the expanded state on the triggering element
            active.setAttribute('aria-selected', 'false'); // Hide the accordion sections, using aria-controls to specify the desired section

            var elementId = "#".concat(active.getAttribute('aria-controls'));

            if ($(elementId).length) {
              $(elementId).attr('hidden', '');
            }
          }

          if (!isExpanded) {
            // Set the expanded state on the triggering element
            targetButton.setAttribute('aria-selected', 'true'); // Hide the accordion sections, using aria-controls to specify the desired section

            var _elementId = "#".concat(targetButton.getAttribute('aria-controls'));

            if ($(_elementId).length) {
              $(_elementId).removeAttr('hidden');
            }
          }
        });
        tabButton.keydown(function (e) {
          var code = e.keyCode || e.which;

          if (code === 13 || code === 32) {
            $(e.target).click();
          }
        }); // Mobile behavior.

        var downloadButtonClone = function downloadButtonClone(mq) {
          if (mq.matches) {
            tabButton.each(function (i, el) {
              var downloadButton = $(el).find('.download-wrapper');
              var shareButton = $(el).find('.js-share');
              var tabElement = $("#".concat(el.getAttribute('aria-controls')));
              downloadButton.once().clone().appendTo(tabElement);
              shareButton.once().clone().appendTo(tabElement);

              if ($('.current-bulletin-pages__tabs .js-share').length > 0) {
                var share = tabElement.find('.js-share');
                var download = tabElement.find('.download-wrapper');
                var wrappedItems = share.add(download);
                wrappedItems.wrapAll('<div class="wrapped-share-download"></div>');
              }
            });
          } else {
            tabButton.each(function (i, el) {
              var tabElement = $("#".concat(el.getAttribute('aria-controls')));
              var share = tabElement.find('.js-share');
              var download = tabElement.find('.download-wrapper');
              var wrappedItems = share.add(download);
              wrappedItems.unwrap();
            });
          }
        };

        var mq = window.matchMedia('(max-width: 767px)');
        mq.addListener(downloadButtonClone);
        downloadButtonClone(mq);
      });
    }
  };
})(jQuery, Drupal);
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function ($, Drupal) {
  function simplifyText() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var smplStr = str.toLowerCase().replace(/^\s+|\s+$/g, ''); // trim

    var from = 'Ã£Ã Ã¡Ã¤Ã¢áº½Ã¨Ã©Ã«ÃªÃ¬Ã­Ã¯Ã®ÃµÃ²Ã³Ã¶Ã´Ã¹ÃºÃ¼Ã»Ã±Ã§Â·/_,:;';
    var to = 'aaaaaeeeeeiiiiooooouuuunc------';

    for (var i = 0; i < from.length; i += 1) {
      smplStr = smplStr.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    smplStr = smplStr.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

    return smplStr;
  }

  var SearchItem =
  /*#__PURE__*/
  function () {
    function SearchItem($el) {
      _classCallCheck(this, SearchItem);

      this.$el = $el; // heading DOM element

      var $body = $el.nextElementSibling;
      this.title = $el.innerText.trim();
      this.titleSmpl = simplifyText($el.innerText.trim());
      this.bodySmpl = simplifyText($body.innerText.trim());
      this.anchor = $el.id;
    }

    _createClass(SearchItem, [{
      key: "search",
      value: function search(text) {
        var _this = this;

        if (!text) {
          return {
            title: 0,
            body: 0
          };
        }

        var searchWords = text.split('-');
        var counter = 0;
        searchWords.forEach(function (word) {
          if (_this.titleSmpl.indexOf(word) >= 0) {
            counter += 10;
          }

          if (_this.bodySmpl.indexOf(word) >= 0) {
            counter += 1;
          }
        });
        return counter;
      }
    }]);

    return SearchItem;
  }();

  var SearchItems =
  /*#__PURE__*/
  function () {
    function SearchItems() {
      _classCallCheck(this, SearchItems);

      this.items = [];
    }

    _createClass(SearchItems, [{
      key: "add",
      value: function add(searchItem) {
        this.items.push(searchItem);
      }
    }, {
      key: "search",
      value: function search(text) {
        var results = [];

        if (!text || !text.trim().length) {
          return results;
        }

        var textSmpl = simplifyText(text.trim());
        this.items.forEach(function (item) {
          var value = item.search(textSmpl);

          if (value > 0) {
            results.push({
              $el: item.$el,
              title: item.title,
              value: value
            });
          }
        });
        results.sort(function (a, b) {
          return a.value > b.value ? -1 : 1;
        });
        return results;
      }
    }]);

    return SearchItems;
  }();

  Drupal.behaviors.faqSearch = {
    attach: function attach(context) {
      $('.faq-search', context).once('faqSearch').each(function (index, $element) {
        var $textField = $element.querySelector('.faq-search__field');
        var $resultsList = $element.querySelector('.faq-search__results');
        var $btnShowAllResults = $element.querySelector('.faq-search__btn--all-results');
        var $btnShowRelevantResults = $element.querySelector('.faq-search__btn--relevant-results');
        var $faqHeadings = document.querySelectorAll('.faq-section__accordion .faqfield-question');
        var searchItems = new SearchItems();
        $faqHeadings.forEach(function ($faqHeading) {
          var searchItem = new SearchItem($faqHeading);
          searchItems.add(searchItem);
        });

        function currentGapHeight() {
          var topAdminToolbar = document.querySelector('#toolbar-bar');
          var botAdminToolbar = document.querySelector('.toolbar-tray-horizontal.is-active');
          var crisisMessage = document.querySelector('.back-office-message-tab');
          var miniSiteMenu = document.querySelector('.mini-site-menu-wrapper');
          var summaryBlock = document.querySelector('.js-edugouv-progress-bar');
          var sumBlockHeight = 0;

          if ($(window).width() >= 768) {
            sumBlockHeight = 0;
          } else {
            sumBlockHeight = summaryBlock ? summaryBlock.offsetHeight : 0;
          }

          var topAdminToolbarHeight = topAdminToolbar ? topAdminToolbar.offsetHeight : 0;
          var botAdminToolbarHeight = botAdminToolbar ? botAdminToolbar.offsetHeight : 0;
          var crisisMessageHeight = crisisMessage ? crisisMessage.offsetHeight : 0;
          var miniSiteMenuHeight = miniSiteMenu ? miniSiteMenu.offsetHeight : 0;
          return topAdminToolbarHeight + botAdminToolbarHeight + crisisMessageHeight + miniSiteMenuHeight + sumBlockHeight + $('.header').outerHeight();
        }

        function onItemClick(e) {
          if (!e.target.classList.contains('faq-search__result-link')) {
            return;
          }

          e.preventDefault();
          var $el = $("#".concat(e.target.getAttribute('data-id')));
          var $expandedAccordions = $('.ui-accordion .ui-accordion-header-active').not($el);
          $expandedAccordions.trigger('click', [true]); // close expanded accordions;

          setTimeout(function () {
            $('html, body').animate({
              scrollTop: $el.offset().top - currentGapHeight()
            }, 500); // expand active accordion

            if ($el.hasClass('ui-accordion-header-collapsed')) {
              $el.click();
            }
          }, 250);
        }

        function onShowAllClick(e) {
          e.preventDefault();
          $element.classList.add('faq-search--all-results');
        }

        function onShowRelevantClick(e) {
          e.preventDefault();
          $element.classList.remove('faq-search--all-results');
        }

        function renderSearchResults(results, text) {
          $element.classList.remove('faq-search--no-results');
          $element.classList.remove('faq-search--has-more-5-results');

          if (results && results.length) {
            $element.classList.add('faq-search--has-results');
          } else {
            if (text) {
              $element.classList.add('faq-search--no-results');
            }

            $element.classList.remove('faq-search--has-results');
          }

          if (results && results.length > 5) {
            $element.classList.add('faq-search--has-more-5-results');
          }

          var itemsHtml = '';
          results.forEach(function (result) {
            itemsHtml += "\n              <li class=\"faq-search__result\">\n              <a class=\"faq-search__result-link\" data-id=\"".concat(result.$el.id, "\" href=\"#").concat(result.$el.id, "\">- ").concat(result.title, "</a>\n              </li>");
          });
          $resultsList.innerHTML = itemsHtml;
        } // Add event listeners:


        $resultsList.addEventListener('click', onItemClick);
        $btnShowAllResults.addEventListener('click', onShowAllClick);
        $btnShowRelevantResults.addEventListener('click', onShowRelevantClick);
        var timerId;
        $textField.addEventListener('keyup', function (e) {
          clearTimeout(timerId);
          timerId = setTimeout(function () {
            var results = searchItems.search(e.target.value);
            renderSearchResults(results, e.target.value);
          }, 150);
        });
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  Drupal.behaviors.faqSection = {
    attach: function attach(context) {
      $('.faq-section', context).once('faqSection').each(function (index, $element) {
        function onHeadingClick(e, isFakeClick) {
          if (!isFakeClick) {
            var $expandedAccordions = $('.ui-accordion .ui-accordion-header-active').not(e.target);
            $expandedAccordions.trigger('click', [true]); // close expanded accordions;
          }
        }

        $($element).on('click.faqSection', '.ui-accordion-header', onHeadingClick);
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
   * Create image gallery.
   */
  Drupal.behaviors.edugouvGallery = {
    attach: function attach(context) {
      $('.js-gallery', context).once('edugouvGallery').each(function (index, element) {
        var $this = $(element);
        var $images = $('img', $this);

        if ($images.length) {
          $images.each(function (i, image) {
            console.log(image.src);
            $(image).wrap("<div class=\"gallery-slider\"></div>");
            $("<img class=\"call-popup-modal\" src='".concat(image.src, "' />")).insertAfter($(image));
            $(image).next('.call-popup-modal').click(function (event) {
              event.stopPropagation();
              $(image).trigger("click");
            });
          });
        }

        var slidesToShow = $this.closest('.ckeditor-text').length ? 1 : 2;
        $this.slick({
          arrows: true,
          prevArrow: '<button type="button" class="slick-prev">PrÃ©cÃ©dent</button>',
          nextArrow: '<button type="button" class="slick-next">Suivant</button>',
          infinite: true,
          dots: false,
          centerMode: true,
          slidesToShow: slidesToShow,
          slidesToScroll: 1,
          responsive: [{
            breakpoint: 768,
            settings: {
              slidesToShow: 1
            }
          }]
        });
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
   * Create image gallery.
   */
  Drupal.behaviors.iframePrint = {
    attach: function attach(context) {
      $('#main-content', context).once('iframePrint').each(function (index, element) {
        var body = $(element);
        var count = 0;
        var timer = setInterval(function () {
          var newIframes = body.find('iframe');

          if (newIframes.length > count) {
            count = newIframes.length;
          } else {
            clearInterval(timer);
            newIframes.each(function (index, element) {
              var $this = $(element);
              $("<div class='iframePrint'><p>Cet Ã©lÃ©ment n'est pas imprimable.</p></div>").insertAfter($this);
            });
          }
        }, 1000);
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
   * Create kiosque tabs.
   */
  Drupal.behaviors.ivacChartesBehavior = {
    attach: function attach(context) {
      $('.ivac .iva-charts', context).once('ivacChartesBehavior').each(function (index, element) {
        var $mainElement = $(element);
        var $oldIvalPage = $mainElement.parents('body').find('.resultats_lycee');
        var sourceTables = '';

        if ($oldIvalPage.length) {
          sourceTables = $oldIvalPage.find('table');
        } else {
          sourceTables = $mainElement.parents('body').find('.table_pyjama');
        }

        var $typeSource = $(element).parents('body').find('.iva-charts-type');
        $typeSource.hide();
        var $typeSourceText = $typeSource.text();
        var seriesArray = [];
        var charts = [];

        function createTittle(title) {
          var arr = title.split(' ');
          arr.pop();
          return arr.join(' ');
        }

        setTimeout(function () {
          if (sourceTables.length) {
            var setOptions = function setOptions(options, idx) {
              return {
                series: [0, 0],
                chart: {
                  height: '240px',
                  type: 'radialBar',
                  id: "Chart_".concat(idx)
                },
                plotOptions: {
                  radialBar: {
                    offsetY: 0,
                    startAngle: 0,
                    // endAngle: 270,
                    hollow: {
                      margin: 0,
                      size: '45%',
                      background: 'transparent',
                      image: undefined
                    },
                    track: {
                      margin: 0
                    },
                    dataLabels: {
                      name: {
                        show: false
                      },
                      value: {
                        show: false
                      }
                    }
                  }
                },
                colors: [drupalSettings.charts_color.observed_color, drupalSettings.charts_color.expected_color],
                labels: ['ATTENDU', 'constatÃ©'],
                legend: {
                  show: true,
                  floating: true,
                  fontSize: '12px',
                  position: 'bottom',
                  offsetX: 0,
                  offsetY: 0,
                  labels: {
                    useSeriesColors: true
                  },
                  markers: {
                    size: 0
                  },
                  formatter: function formatter(seriesName, opts) {
                    return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + "%";
                  },
                  itemMargin: {
                    vertical: 1
                  }
                },
                responsive: [{
                  breakpoint: 480,
                  options: {
                    legend: {
                      show: true
                    }
                  }
                }]
              };
            };

            var showChart = function showChart(name, id, idDom, opt, callBack) {
              var name = new ApexCharts(document.querySelector(id), callBack);
              charts.push(name);
              var point = document.createElement('div');
              point.classList.add('iva-charts__point');
              point.innerHTML = opt.point;
              var parentDiv = document.getElementById(idDom).closest('.iva-charts__container');
              parentDiv.append(point);
            };

            var $titlesArr = [createTittle(document.querySelector('#edugouv-summary-item-0').innerText.toUpperCase().replace('DIPLÃME NATIONAL DU BREVET', 'DNB')), createTittle(document.querySelector('#edugouv-summary-item-1').innerText.toUpperCase().replace('DIPLÃME NATIONAL DU BREVET', 'DNB'))];
            sourceTables.each(function (index, element) {
              if (index === 1 || index === 0) {
                var isThead = $(element).find('thead');
                var numberOfRow;

                if (isThead.length) {
                  numberOfRow = 0;
                } else {
                  numberOfRow = 1;
                }

                var $observedRate = $(element).find("tbody tr:eq(".concat(numberOfRow, ") td:eq(2)")).text();
                var $expectedTate = $(element).find("tbody tr:eq(".concat(numberOfRow, ") td:eq(1)")).text();
                var addedValText = $(element).find("tbody tr:eq(".concat(numberOfRow, ") td:eq(3)")).text();
                var $addvalue = addedValText === 'ND' ? 'ND' : addedValText.replace(',', '.');
                var $addvalueClass = '';
                var $pointEnd = 's';

                if (index === 1) {
                  var observedText = $(element).find("tbody tr:eq(".concat(numberOfRow, ") td:eq(2)")).text();
                  var expectedText = $(element).find("tbody tr:eq(".concat(numberOfRow, ") td:eq(1)")).text();
                  $observedRate = observedText === 'ND' ? 0 : 100 / 20 * observedText.replace(',', '.');
                  $expectedTate = expectedText === 'ND' ? 0 : 100 / 20 * expectedText.replace(',', '.');
                }

                if ($observedRate === "ND") {
                  $observedRate = 0;
                }

                if ($expectedTate === "ND") {
                  $expectedTate = 0;
                }

                if ($typeSourceText === 'GENERAL_TECHNO' || $typeSourceText === 'Lycee general et technologique') {
                  $mainElement.addClass('iva-charts--general-techno');
                } else if ($typeSourceText === 'PRO' || $typeSourceText === 'Lycee professionnel') {
                  $mainElement.addClass('iva-charts--pro');
                } // if ($typeSourceText === 'GENERAL_TECHNO' || $typeSourceText === 'Lycee general et technologique') {


                if (index === 1) {
                  if ($addvalue < -0.5) {
                    $addvalueClass = 'ivac-charts__point--small';
                  } else if ($addvalue >= -0.5 && $addvalue <= 0.5) {
                    $addvalueClass = 'ivac-charts__point--middle';
                  } else if ($addvalue > 0.5) {
                    $addvalueClass = 'ivac-charts__point--big';
                  }
                } else {
                  if ($addvalue < -3) {
                    $addvalueClass = 'iva-charts__point--small';
                  } else if ($addvalue > -4 && $addvalue < 4) {
                    $addvalueClass = 'iva-charts__point--middle';
                  } else if ($addvalue > 3) {
                    $addvalueClass = 'iva-charts__point--big';
                  }
                } // }
                //
                // if ($typeSourceText === 'PRO' || $typeSourceText === 'Lycee professionnel') {
                //   if ($addvalue < -5) {
                //     $addvalueClass = 'iva-charts__point--small';
                //   } else if ($addvalue > -6 && $addvalue < 6) {
                //     $addvalueClass = 'iva-charts__point--middle';
                //   } else if ($addvalue > 5) {
                //     $addvalueClass = 'iva-charts__point--big';
                //   }
                // }


                if ($addvalue > -2 && $addvalue < 2) {
                  $pointEnd = '';
                } // if (index === 1) {
                //   if ($addvalue > -2 && $addvalue < 2) {
                //     $pointEnd = '';
                //   }
                // }


                $mainElement.append("<div class='iva-charts__block'>\n                <div class='iva-charts__inner'>\n                  <div class='iva-charts__title'>\n                    ".concat($titlesArr[index], "\n                  </div>\n                  <div class='iva-charts__container'>\n                    <div id='iva-chartsId-").concat(index, "'></div>\n                  </div>\n                </div>\n              </div>"));
                var chartObj = {
                  series: [$observedRate, $expectedTate],
                  point: "<i class=\"".concat($addvalueClass, "\">").concat($addvalue, "</i><span>point").concat($pointEnd, "</span>")
                };
                showChart(index, "#iva-chartsId-".concat(index), "iva-chartsId-".concat(index), chartObj, setOptions(chartObj, index));
                seriesArray.push(chartObj.series);
              }
            });
          } else {
            $mainElement.hide();
          }
        });

        function renderCharts() {
          $('.iva-charts__inner').each(function (i, chart) {
            charts[i].render();
            var legend = $(chart).find('.apexcharts-legend');
            legend.appendTo($(chart));
          });
        }

        function checkCharts() {
          $('.iva-charts__inner').each(function (i, chart) {
            if (chart.getBoundingClientRect().top < window.innerHeight - 200) {
              if (!chart.classList.contains('animate')) {
                // charts[i].render();
                charts[i].updateOptions({
                  series: [seriesArray[i][0], seriesArray[i][1]]
                });
                var legends = $(chart).find('.apexcharts-legend');

                if (i === 1) {
                  legends.find('.apexcharts-legend-series:first .apexcharts-legend-text').text("ATTENDUE: ".concat(seriesArray[i][0] / 5, " / 20"));
                  legends.find('.apexcharts-legend-series:last .apexcharts-legend-text').text("constat\xE9e: ".concat(seriesArray[i][1] / 5, " / 20"));
                } else {
                  legends.find('.apexcharts-legend-series:first .apexcharts-legend-text').text("ATTENDU: ".concat(seriesArray[i][0], "%"));
                  legends.find('.apexcharts-legend-series:last .apexcharts-legend-text').text("constat\xE9: ".concat(seriesArray[i][1], "%"));
                }

                chart.classList.add('animate');
              }
            }
          });
        }

        setTimeout(function () {
          renderCharts();
          checkCharts();
        }, 10);
        $(window).on('scroll', function () {
          checkCharts();
        });
        var $parenWrapper = $(element).closest('.page-wrapper');
        var $breadcrumbList = $parenWrapper.find('.breadcrumb ol li');
        var $prewPageItem = $breadcrumbList[$breadcrumbList.length - 2];
        var prewPageLink = $prewPageItem.querySelector('a');

        if (prewPageLink) {
          prewPageLink.addEventListener("click", function (e) {
            var previousPageUrl = document.referrer;

            if (previousPageUrl && previousPageUrl.includes('recherche-ivac')) {
              e.preventDefault();
              window.history.back();
            }
          });
        }
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
   * Create  ivacIvalSearch.
   */
  Drupal.behaviors.ivacIvalSearchBehavior = {
    attach: function attach(context) {
      $('form[data-drupal-selector=views-exposed-form-search-ival-page-main], form[data-drupal-selector=views-exposed-form-search-ivac-page-main]', context).once('ivacIvalSearchBehavior').each(function (index, element) {
        var cityField = element.querySelector('#edit-city');
        var departnemt = element.querySelector('#edit-department');
        element.closest('html').classList.add('ivacIvalPage');
        var departnemtSource = [];

        if (cityField) {
          $(cityField).autocomplete({
            select: function select(event, ui) {
              departnemt.value = ui.item.departments[0];
              departnemtSource = ui.item.departments;

              if (departnemt) {
                if (departnemtSource.length > 0) {
                  $(departnemt).autocomplete({
                    source: departnemtSource,
                    minLength: 0
                  }).focus(function () {
                    $(this).autocomplete("search", "");
                  });
                  $(departnemt).trigger('focus');
                }
              }
            }
          });
        }

        if (departnemt) {
          departnemt.addEventListener("input", function () {
            var valueLength = departnemt.value.length;

            if (valueLength > 0) {
              if (departnemtSource.length > 0) {
                $(departnemt).autocomplete({
                  source: departnemtSource,
                  minLength: 3
                });
              }
            }
          });
        }
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
   * Create kiosque tabs.
   */
  Drupal.behaviors.ivalChartesBehavior = {
    attach: function attach(context) {
      $('.ival .iva-charts', context).once('ivaCharts').each(function (index, element) {
        var $mainElement = $(element);
        var $oldIvalPage = $mainElement.parents('body').find('.resultats_lycee');
        var sourceTables = '';

        if ($oldIvalPage.length) {
          sourceTables = $oldIvalPage.find('table');
        } else {
          sourceTables = $mainElement.parents('body').find('.table_pyjama');
        }

        var $typeSource = $(element).parents('body').find('.iva-charts-type');
        $typeSource.hide();
        var $typeSourceText = $typeSource.text();
        var seriesArray = [];
        var charts = [];

        if (sourceTables.length) {
          var setOptions = function setOptions(options, idx) {
            return {
              series: [0, 0],
              chart: {
                height: '240px',
                type: 'radialBar',
                id: "Chart_".concat(idx)
              },
              plotOptions: {
                radialBar: {
                  offsetY: 0,
                  startAngle: 0,
                  // endAngle: 270,
                  hollow: {
                    margin: 0,
                    size: '45%',
                    background: 'transparent',
                    image: undefined
                  },
                  track: {
                    margin: 0
                  },
                  dataLabels: {
                    name: {
                      show: false
                    },
                    value: {
                      show: false
                    }
                  }
                }
              },
              colors: [drupalSettings.charts_color.observed_color, drupalSettings.charts_color.expected_color],
              labels: ['ATTENDU', 'constatÃ©'],
              legend: {
                show: true,
                floating: true,
                fontSize: '12px',
                position: 'bottom',
                offsetX: 0,
                offsetY: 0,
                labels: {
                  useSeriesColors: true
                },
                markers: {
                  size: 0
                },
                formatter: function formatter(seriesName, opts) {
                  return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + "%";
                },
                itemMargin: {
                  vertical: 1
                }
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  legend: {
                    show: true
                  }
                }
              }]
            };
          };

          var showChart = function showChart(name, id, idDom, opt, callBack) {
            var name = new ApexCharts(document.querySelector(id), callBack);
            charts.push(name);
            var point = document.createElement('div');
            point.classList.add('iva-charts__point');
            point.innerHTML = opt.point;
            var parentDiv = document.getElementById(idDom).closest('.iva-charts__container');
            parentDiv.append(point);
          };

          sourceTables.each(function (index, element) {
            var $titlesArr = ["Taux de r\xE9ussite au baccalaur\xE9at", "Taux d'acc\xE8s de la seconde au baccalaur\xE9at", "Taux de mentions au baccalaur\xE9at"];
            var isThead = $(element).find('thead');
            var numberOfRow;

            if (isThead.length) {
              numberOfRow = 0;
            } else {
              numberOfRow = 1;
            }

            var $observedRate = $(element).find("tbody tr:eq(".concat(numberOfRow, ") td:eq(2)")).text();
            var $expectedTate = $(element).find("tbody tr:eq(".concat(numberOfRow, ") td:eq(1)")).text();
            var $addvalue = $(element).find("tbody tr:eq(".concat(numberOfRow, ") td:eq(3)")).text();
            var $addvalueClass = '';
            var $pointEnd = 's';

            if ($observedRate === "ND") {
              $observedRate = 0;
            }

            if ($expectedTate === "ND") {
              $expectedTate = 0;
            }

            if ($typeSourceText === 'GENERAL_TECHNO' || $typeSourceText === 'Lycee general et technologique') {
              $mainElement.addClass('iva-charts--general-techno');
            } else if ($typeSourceText === 'PRO' || $typeSourceText === 'Lycee professionnel') {
              $mainElement.addClass('iva-charts--pro');
            }

            if ($typeSourceText === 'GENERAL_TECHNO' || $typeSourceText === 'Lycee general et technologique') {
              if ($addvalue < -3) {
                $addvalueClass = 'iva-charts__point--small';
              } else if ($addvalue > -4 && $addvalue < 4) {
                $addvalueClass = 'iva-charts__point--middle';
              } else if ($addvalue > 3) {
                $addvalueClass = 'iva-charts__point--big';
              }
            }

            if ($typeSourceText === 'PRO' || $typeSourceText === 'Lycee professionnel') {
              if ($addvalue < -5) {
                $addvalueClass = 'iva-charts__point--small';
              } else if ($addvalue > -6 && $addvalue < 6) {
                $addvalueClass = 'iva-charts__point--middle';
              } else if ($addvalue > 5) {
                $addvalueClass = 'iva-charts__point--big';
              }
            }

            if ($addvalue >= -1 && $addvalue <= 1) {
              $pointEnd = '';
            }

            $mainElement.append("<div class='iva-charts__block'>\n                <div class='iva-charts__inner'>\n                  <div class='iva-charts__title'>\n                    ".concat($titlesArr[index], "\n                  </div>\n                  <div class='iva-charts__container'>\n                    <div id='iva-chartsId-").concat(index, "'></div>\n                  </div>\n                </div>\n              </div>"));
            var chartObj = {
              series: [$observedRate, $expectedTate],
              point: "<i class=\"".concat($addvalueClass, "\">").concat($addvalue, "</i><span>point").concat($pointEnd, "</span>")
            };
            showChart(index, "#iva-chartsId-".concat(index), "iva-chartsId-".concat(index), chartObj, setOptions(chartObj, index));
            seriesArray.push(chartObj.series);
          });
        } else {
          $mainElement.hide();
        }

        function renderCharts() {
          $('.iva-charts__inner').each(function (i, chart) {
            charts[i].render();
            var legend = $(chart).find('.apexcharts-legend');
            legend.appendTo($(chart));
          });
        }

        function checkCharts() {
          $('.iva-charts__inner').each(function (i, chart) {
            if (chart.getBoundingClientRect().top < window.innerHeight - 200) {
              if (!chart.classList.contains('animate')) {
                // charts[i].render();
                charts[i].updateOptions({
                  series: [seriesArray[i][0], seriesArray[i][1]]
                });
                var legends = $(chart).find('.apexcharts-legend');
                legends.find('.apexcharts-legend-series:first .apexcharts-legend-text').text("ATTENDU: ".concat(seriesArray[i][0], "%"));
                legends.find('.apexcharts-legend-series:last .apexcharts-legend-text').text("constat\xE9: ".concat(seriesArray[i][1], "%"));
                chart.classList.add('animate');
              }
            }
          });
        }

        setTimeout(function () {
          renderCharts();
          checkCharts();
        }, 10);
        $(window).on('scroll', function () {
          checkCharts();
        });
        var $parenWrapper = $(element).closest('.page-wrapper');
        var $breadcrumbList = $parenWrapper.find('.breadcrumb ol li');
        var $prewPageItem = $breadcrumbList[$breadcrumbList.length - 2];
        var prewPageLink = $prewPageItem.querySelector('a');

        if (prewPageLink) {
          prewPageLink.addEventListener("click", function (e) {
            var previousPageUrl = document.referrer;

            if (previousPageUrl && previousPageUrl.includes('recherche-ival')) {
              e.preventDefault();
              window.history.back();
            }
          });
        }
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
   * Create sticky header.
   */
  Drupal.behaviors.edugouvMobileSlider = {
    attach: function attach(context) {
      $('.js-slick--mobile', context).once('edugouvMobileSlider').each(function (index, element) {
        var $slider = $(element);

        var toggleSlider = function toggleSlider(mq) {
          if (mq.matches) {
            $slider.slick({
              dots: true,
              infinite: false,
              arrows: false,
              adaptiveHeight: true
            });
          } else if ($slider.hasClass('slick-initialized')) {
            $slider.slick('unslick');
          }
        };

        var mq = window.matchMedia('(max-width: 767px)');
        mq.addListener(toggleSlider);
        toggleSlider(mq);
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
   * Create partner slider.
   */
  Drupal.behaviors.edugouvPartnerSlider = {
    attach: function attach(context) {
      $('.js-slick--partner', context).once('edugouvPartnerSlider').each(function (index, element) {
        var $slider = $(element);
        $slider.slick({
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: false,
          responsive: [{
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }, {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
              arrows: false
            }
          }]
        });
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
   * Create image gallery.
   */
  Drupal.behaviors.edugouvMasonry = {
    attach: function attach(context) {
      $('.js-vertical-masonry', context).once('edugouvMasonry').each(function (index, element) {
        var loadedImages = 0;
        var $this = $(element);
        var $images = $('img', $this);
        var $gridItem = $('.grid-item:not(.load-more)', $this);
        var $initialLength = $gridItem.length;

        var imageLoaded = function imageLoaded() {
          loadedImages += 1;

          if (loadedImages === $images.length) {
            $this.isotope({
              itemSelector: '.grid-item',
              layoutMode: 'masonry',
              masonry: {
                gutter: '.gutter-sizer',
                columnWidth: '.grid-sizer'
              }
            });
          }
        };

        if ($images.length) {
          $this.addClass('loading');
          $images.each(function (i, image) {
            $('<img>').on('load', imageLoaded).attr('src', $(image).attr('src'));
          });
        } else {
          $this.isotope({
            itemSelector: '.grid-item',
            layoutMode: 'masonry',
            masonry: {
              gutter: '.gutter-sizer',
              columnWidth: '.grid-sizer'
            }
          });
        }

        $(document).ajaxComplete(function () {
          var $actualGridItem = $('.grid-item:not(.load-more)', $this);
          var $actualLength = $actualGridItem.length;

          if ($this.data('isotope')) {
            $images = $('img', $this);
            loadedImages = 0;

            imageLoaded = function imageLoaded() {
              loadedImages += 1;

              if (loadedImages === $images.length) {
                $this.isotope('reloadItems').isotope({
                  sortBy: 'original-order'
                });
              }
            };

            if ($images.length) {
              $this.addClass('loading');
              $images.each(function (i, image) {
                $('<img>').on('load', imageLoaded).attr('src', $(image).attr('src'));
              });
            } else {
              $this.isotope('reloadItems').isotope({
                sortBy: 'original-order'
              });
            }

            if ($actualLength > $initialLength) {
              $actualGridItem[$actualLength - $initialLength].focus();
            }
          }
        });
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
   * Create publication slider.
   */
  Drupal.behaviors.edugouvPublicationSlider = {
    attach: function attach(context) {
      $('.js-publication-slider', context).once('edugouvPublicationSlider').each(function (index, element) {
        var $slider = $(element);
        var $titles = $('.publication__title', $slider);
        $slider.slick({
          infinite: false,
          arrows: false,
          dots: true,
          customPaging: function customPaging(slider, i) {
            return "<button class=\"slick-dot\" aria-labelledby=\"slide-publication-item-title".concat(i + 1, "\">").concat($titles.eq(i).text().trim(), "</button>");
          }
        });
        var $sliderContainer = document.querySelectorAll('.block--publication-slider');
        var $slideTitles = $sliderContainer[0].querySelectorAll('.publication__slide:not(.slick-cloned) .publication__title a');
        $slider.on('afterChange', function () {
          $slider.find('.slick-dots li button').blur();
          $slider.find('.slick-dots .slick-active button').focus();
          setTimeout(function () {
            $('.slick-slide').removeAttr('aria-describedby');
          }, 1);
        });
        $slideTitles.forEach(function (item, i) {
          $(item).attr('id', "slide-publication-item-title".concat(i + 1));
          $(item).closest('.slick-slide').removeAttr('aria-describedby');
        });
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
   * Create rich agenda block.
   */
  Drupal.behaviors.edugouvRichAgenda = {
    attach: function attach(context) {
      $('.js-rich-agenda', context).once('edugouvRichAgenda').each(function (index, element) {
        var $element = $(element);
        var $blockTwitters = $('.block-twitters', $element);
        var $eventsHeight = $element.find('.block-events').height();
        var $allBlockEventItems = $('.event-item', $element);
        var $blockEvent = $element.find('.block-events');
        var firstColumn = [];
        var secondColumn = [];

        if ($eventsHeight > 465) {
          $blockTwitters.css({
            'max-height': $eventsHeight
          });
        }

        $.each($allBlockEventItems, function (i) {
          if (i < Math.round($allBlockEventItems.length / 2)) {
            firstColumn.push($allBlockEventItems[i]);
          } else {
            secondColumn.push($allBlockEventItems[i]);
          }
        });
        $blockEvent.append($('<div class="events-column"></div>').append(firstColumn));
        $blockEvent.append($('<div class="events-column"></div>').append(secondColumn));
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
   * Create subevents.
   */
  Drupal.behaviors.edugouvSubevents = {
    attach: function attach(context) {
      $('.subevents__block', context).once('edugouvSubevents').each(function () {
        var render = function render(elements) {
          var day = 86400000;
          var firstDate = new Date(elements[0].startTime * 1000);
          var lastDate = new Date(elements[elements.length - 1].endTime * 1000);
          var allDays = Math.abs(firstDate.getTime() - lastDate.getTime()) / day;
          var dayWidth = 100 / allDays;
          var prevEventEnd = firstDate.getTime();
          var today = {};
          today.date = new Date();
          today.position = Math.abs((firstDate.getTime() - today.date.getTime()) / day);
          today.outEvent = true;
          today.gutterWidth = dayWidth;
          today.lang = drupalSettings.path ? drupalSettings.path.currentLanguage : 'en';

          if (today.date < firstDate) {
            today.position = -2;
            today.gutterWidth = 1;
          } else if (today.date > lastDate) {
            today.position = 102;
            today.gutterWidth = 1;
          }

          $('.subevents__block').append('<div class="subevents__wrapper"><div class="subevents"></div></div>');

          for (var i = 0; i < elements.length; i += 1) {
            var event = elements[i];
            var startDate = new Date(event.startTime * 1000);
            var endDate = new Date(event.endTime * 1000);
            var eventInPast = startDate < today.date ? 'past' : 'future';
            var eventDuration = Math.abs(startDate.getTime() - endDate.getTime()) / day;
            var eventMargin = Math.abs(prevEventEnd - startDate.getTime()) / day;
            eventDuration = eventDuration > 0 ? eventDuration : 1;
            eventMargin = eventMargin > -1 ? eventMargin : 0;
            var startText = event.freeText !== null ? event.freeText : "".concat(startDate.getDate(), " ").concat(startDate.toLocaleString(today.lang, {
              month: 'short'
            }), " ").concat(startDate.getFullYear());
            prevEventEnd = endDate.getTime();

            if (today.date < endDate && today.date > startDate) {
              today.outEvent = false;
              today.gutterWidth = 100 / eventDuration;
              today.position = Math.abs((startDate.getTime() - today.date.getTime()) / day);
            }

            $('.subevents').append("<div style=\"width: ".concat(dayWidth * eventDuration, "%; margin-left: ").concat(dayWidth * eventMargin, "%\" class=\"subevent__item duration-").concat(parseInt(eventDuration, 10), " ").concat(eventInPast, "\">").concat(Drupal.theme('agendaSubEventCell', event, startText, today), "</div>"));
          }

          if (today.outEvent) {
            $('.subevents__wrapper').append("<div class=\"current__date\" style=\"left: ".concat(today.gutterWidth * today.position, "%;\">").concat(Drupal.t('Today'), "<span class=\"current__date__circle\"><span class=\"date\">").concat(today.date.getDate(), "</span><span class=\"month\">").concat(today.date.toLocaleString(today.lang, {
              month: 'short'
            }), "</span></span></div>"));
          }

          var $slider = $('.subevents');

          var toggleSlider = function toggleSlider(mq) {
            if (mq.matches && $slider[0].children.length > 1) {
              $slider.slick({
                dots: false,
                infinite: false,
                arrows: true,
                slidesToShow: 1
              });
            } else if ($slider.hasClass('slick-initialized')) {
              $slider.slick('unslick');
            }
          };

          var mq = window.matchMedia('(max-width: 767px)');
          mq.addListener(toggleSlider);
          toggleSlider(mq);
        };

        var basePath = drupalSettings.path ? drupalSettings.path.baseUrl : '/';
        var eventID = drupalSettings.edugouv_event.eventId;
        $.get("".concat(basePath, "api/v1/sub-events-list/").concat(eventID)).done(function (response) {
          render(response);
        }).fail(function (error) {
          throw new Error(error);
        });
      });
    }
  };
  /**
   * Theme for subevent cell.
   */

  Drupal.theme.agendaSubEventCell = function (event, eventStart, today) {
    var output = '';
    output += '<div class="event__mobile_wrapper">';

    if (today.outEvent || $('.current__date').length >= 1) {
      output += '<div class="event__content">';
      output += "<div class=\"event__title\">".concat(event.title, "</div>");
      output += "<div class=\"event__start__text\">".concat(eventStart, "</div>");
      output += '</div>';
    } else {
      output += "<div class=\"current__date\" style=\"left: ".concat(today.gutterWidth * today.position, "%;\">");
      output += "".concat(Drupal.t('Today'));
      output += '<span class="current__date__circle">';
      output += "<span class=\"date\">".concat(today.date.getDate(), "</span>");
      output += "<span class=\"month\">".concat(today.date.toLocaleString(today.lang, {
        month: 'short'
      }), "</span>");
      output += '</span>';
      output += '<div class="current__date__content">';
      output += "<div class=\"event__title\">".concat(event.title, "</div>");
      output += "<div class=\"event__start__text\">".concat(eventStart, "</div>");
      output += '</div>';
      output += '</div>';
    }

    output += '</div>';
    return output;
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
   * Create service slider.
   */
  Drupal.behaviors.edugouvThematicSlider = {
    attach: function attach(context) {
      $('.js-slick--thematic-slider', context).once('edugouvThematicSlider').each(function (index, element) {
        var $slider = $(element);
        $slider.slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          centerMode: true,
          centerPadding: '75px',
          responsive: [{
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerPadding: '0px',
              centerMode: false
            }
          }]
        });
        var $nextSlide = $('.slick-next');
        var $prevSlide = $('.slick-prev');
        var $translatableAriaNext = Drupal.t('Next slide');
        var $translatableAriaPrev = Drupal.t('Previous slide');
        $nextSlide.attr('aria-label', $translatableAriaNext);
        $prevSlide.attr('aria-label', $translatableAriaPrev);
        var $sliderContainer = document.querySelectorAll('.thematic-page-slider');
        $sliderContainer.forEach(function (item, i) {
          $(item).find('h2').attr('id', "title-thematic-page-slider".concat(i + 1));
          $(item).find('.slick-dots').attr('aria-labelledby', "title-thematic-page-slider".concat(i + 1));
          $(item).find('.js-slick--thematic-slider').attr('aria-labelledby', "title-thematic-page-slider".concat(i + 1));
        });
        var $slideTitles = $sliderContainer[0].querySelectorAll('.thematic-page-slide:not(.slick-cloned) h3');
        var $slickDots = $sliderContainer[0].querySelectorAll('.slick-dots li');
        $slider.on('afterChange', function () {
          setTimeout(function () {
            $('.slick-slide').removeAttr('aria-describedby');
            $slider.find('.slick-dots li button').attr('tabindex', '0');
          }, 1);
        });
        $slideTitles.forEach(function (item, i) {
          $(item).attr('id', "slide-thematic-title".concat(i + 1));
          $(item).closest('.thematic-page-slide').removeAttr('aria-describedby');
        });
        $slickDots.forEach(function (item, i) {
          $(item).attr('aria-labelledby', "slide-thematic-title".concat(i + 1));
        });

        function moveList() {
          var list = $slider.find('.slick-list');
          $slider.append(list);
        }

        setTimeout(moveList(), 0);
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
   * Create service slider.
   */
  Drupal.behaviors.edugouvServicesSlider = {
    attach: function attach(context) {
      $('.js-slick--services', context).once('edugouvServicesSlider').each(function (index, element) {
        var $slider = $(element);
        var sliderInfinite = true;
        var sliderDots = true;
        var sliderCenterMode = true;

        if ($('.thematic-services-item', $slider).length <= 3) {
          sliderInfinite = false;
          sliderDots = false;
          sliderCenterMode = false;
        }

        $slider.slick({
          infinite: sliderInfinite,
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: sliderCenterMode,
          dots: sliderDots,
          responsive: [{
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
              arrows: false,
              centerMode: false
            }
          }]
        });
        var $nextSlide = $('.slick-next');
        var $prevSlide = $('.slick-prev');
        var $translatableAriaNext = Drupal.t('Next slide');
        var $translatableAriaPrev = Drupal.t('Previous slide');
        $nextSlide.attr('aria-label', $translatableAriaNext);
        $prevSlide.attr('aria-label', $translatableAriaPrev);
        $nextSlide.html(Drupal.t('Next'));
        $prevSlide.html(Drupal.t('Previous'));
        var $sliderContainer = document.querySelectorAll('.services-slider__wrapper');
        $sliderContainer.forEach(function (item, i) {
          $(item).find('h2').attr('id', "title-services-item-slider".concat(i + 1).concat(index));
          $(item).find('.slick-dots').attr('aria-labelledby', "title-thematic-page-slider".concat(i + 1).concat(index));
          $(item).find('.js-slick--services').attr('aria-labelledby', "title-services-item-slider".concat(i + 1).concat(index));
        });
        var $slideTitles = $sliderContainer[0].querySelectorAll('.thematic-services-item:not(.slick-cloned) h3');
        var $slickDots = $sliderContainer[0].querySelectorAll('.slick-dots li');
        $slider.on('afterChange', function () {
          setTimeout(function () {
            // $('.slick-slide').removeAttr('aria-describedby');
            $slider.find('.slick-dots li button').attr('tabindex', '0');
          }, 1);
        });
        $slideTitles.forEach(function (item, i) {
          $(item).attr('id', "slide-services-item-title".concat(i + 1).concat(index)); // $(item).closest('.thematic-services-item').removeAttr('aria-describedby');
        });
        $slickDots.forEach(function (item, i) {
          $(item).attr('aria-labelledby', "slide-services-item-title".concat(i + 1).concat(index));
          $(item).find('button').attr('aria-label', "".concat(i + 1, " ").concat(Drupal.t('of'), " ").concat($slickDots.length));
        });

        function moveList() {
          var list = $slider.find('.slick-list');
          $slider.append(list);
        }

        var $slides = $sliderContainer[0].querySelectorAll('.thematic-services-item');
        $slides.forEach(function (item) {
          var idAttribute = item.getAttribute('id');

          if (idAttribute && idAttribute != '') {
            var trimedIdtext = idAttribute.trim();
            item.setAttribute('id', trimedIdtext);
          } else {
            item.removeAttribute('id');
          }
        });

        function checkDotsAndSlides() {
          var slides = $sliderContainer[0].querySelectorAll('.thematic-page-slide:not(.slick-cloned)');

          if ($slickDots.length < slides.length) {
            $sliderContainer[0].querySelector('.slick-dots').classList.add('hide-dots');
            slides.forEach(function (slide) {
              slide.removeAttribute('aria-describedby');
            });
          } else {
            $sliderContainer[0].querySelector('.slick-dots').classList.remove('hide-dots');
          }
        }

        checkDotsAndSlides();
        setTimeout(moveList(), 0);
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
   * Create video transcription.
   */
  Drupal.behaviors.edugouvVideoTranscription = {
    attach: function attach(context) {
      $('.js-video-transcription', context).once('edugouvVideoTranscription').each(function () {
        $(document).once('edugouvVideoTranscription').on('click', '.video-transcription-trigger', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var $this = $(e.target);
          var accordionPanel = $this.next('.transcription');

          if (accordionPanel[0].hasAttribute('hidden')) {
            $this.attr('aria-expanded', true).text(Drupal.t('Hide the textual transcription'));
            accordionPanel[0].removeAttribute('hidden');
          } else {
            $this.attr('aria-expanded', false).text(Drupal.t('Show the textual transcription'));
            accordionPanel[0].setAttribute('hidden', '');
          }
        });
        $(document).once('edugouvVideoTranscription').on('keydown', '.video-transcription-trigger', function (e) {
          var code = e.keyCode || e.which;

          if (code === 13 || code === 32) {
            e.preventDefault();
            e.stopPropagation();
            e.target.click();
          }
        });
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function (Modernizr, $, Drupal) {
  /**
   * Create map.
   */
  Modernizr.addTest('ipad', function () {
    return !!navigator.userAgent.match(/iPad/i);
  });
  Modernizr.addTest('iphone', function () {
    return !!navigator.userAgent.match(/iPhone/i);
  });
  Modernizr.addTest('ipod', function () {
    return !!navigator.userAgent.match(/iPod/i);
  });
  Modernizr.addTest('ios', function () {
    return Modernizr.ipad || Modernizr.ipod || Modernizr.iphone;
  });
  Drupal.behaviors.edugouvMap = {
    attach: function attach(context) {
      $('.js-map', context).once('edugouvMap').each(function (index, element) {
        var lat = $(element).data('lat');
        var lon = $(element).data('lon');
        var baseUrl = drupalSettings.path.baseUrl;
        var map = L.map('map').setView([lat, lon], 13);
        var mapIcon = L.icon({
          iconUrl: "".concat(baseUrl, "themes/custom/edugouv_theme/html/public/assets/images/marker.png"),
          iconSize: [43, 56],
          iconAnchor: [21, 56]
        });
        var mapCopyright = drupalSettings.osm_credit !== undefined ? jQuery.parseHTML(drupalSettings.osm_credit) : [''];
        map.attributionControl.setPrefix(false);

        if (mapCopyright.length) {
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: mapCopyright[0].innerHTML
          }).addTo(map);
        } else {
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        }

        L.marker([lat, lon], {
          icon: mapIcon
        }).addTo(map);
        var $isnextEl = $(element).closest('.one__column__header').next('.one__column__main').find('.container').children();
        var $isnextElLength = $isnextEl.length;

        if (!$isnextElLength) {
          $(element).closest('.one__column__header').next('.one__column__main').addClass('no-elements-block');
        }
      });
    }
  };
})(Modernizr, jQuery, Drupal);
"use strict";

(function (Modernizr, $, Drupal) {
  /**
   * Behavior to focus search input.
   */
  Drupal.behaviors.searchFieldAutofocus = {
    attach: function attach(context) {
      $('#search-banner-page', context).once('searchFieldAutofocus').each(function (index, element) {
        $(element).find('.edugouv-search-autocomplete input').focus();
        var searchInput = $('#edugouv-search-autocomplete');
        var admin = $('#toolbar-administration').length ? 80 : 0;
        $('html, body').animate({
          scrollTop: searchInput.offset().top - admin - searchInput.height() * 2
        }, 500);
      });
    }
  };
})(Modernizr, jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
   * Create subevents.
   */
  Drupal.behaviors.edugouvSubeventsHeader = {
    attach: function attach(context) {
      $('[data-event]', context).once('edugouvCalendarSubevents').each(function (index, element) {
        var render = function render(elements) {
          var day = 86400000;
          var firstDate = new Date(elements[0].startTime * 1000);
          var lastDate = new Date(elements[0].endTime * 1000);
          var lang = drupalSettings.path ? drupalSettings.path.currentLanguage : 'en';

          for (var i = 1; i < 3; i += 1) {
            var tempEnd = new Date(elements[i].endTime * 1000);

            if (tempEnd > lastDate) {
              lastDate = tempEnd;
            }
          }

          var allDays = Math.abs(firstDate.getTime() - lastDate.getTime()) / day;

          for (var _i = 0; _i < 3; _i += 1) {
            var event = elements[_i];
            var startDate = new Date(event.startTime * 1000);
            var endDate = new Date(event.endTime * 1000);
            var eventDuration = Math.abs(startDate.getTime() - endDate.getTime()) / day;
            var eventMargin = Math.abs(firstDate - startDate.getTime()) / day;
            eventDuration = eventDuration > 0.25 * allDays ? eventDuration / (0.25 * allDays) : 1;
            eventMargin = eventMargin > 0 ? eventMargin / (0.25 * allDays) : 0;
            var startDateString = "".concat(startDate.toLocaleString(lang, {
              weekday: 'long'
            }), " ").concat(startDate.getDate(), " ").concat(startDate.toLocaleString(lang, {
              month: 'long'
            }), " ").concat(startDate.getFullYear());
            var endDateString = "".concat(endDate.toLocaleString(lang, {
              weekday: 'long'
            }), " ").concat(endDate.getDate(), " ").concat(endDate.toLocaleString(lang, {
              month: 'long'
            }), " ").concat(endDate.getFullYear());
            var color = event.color !== null ? event.color : 'blue';
            $('.calendar_subevents').append("<div class=\"calendar_subevent\"><div class=\"calendar_subevent_progress\"><h3 class=\"calendar_subevent_progress_color ".concat(color, "\" style=\"width: ").concat(Math.round(eventDuration) * 25, "%; margin-left: ").concat(Math.round(eventMargin) * 25, "%;\">").concat(event.title, "</h3></div><p>").concat(Drupal.t('End of class'), ": <span>").concat(startDateString, "</span></p><p>").concat(Drupal.t('Resumption of classes'), ": <span>").concat(endDateString, "</span></p></div>"));
          }
        };

        var basePath = drupalSettings.path ? drupalSettings.path.baseUrl : '/';
        var eventID = $(element).data('event');
        $.get("".concat(basePath, "api/v1/sub-events-list/").concat(eventID)).done(function (response) {
          render(response);
        }).fail(function (error) {
          throw new Error(error);
        });
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
   * Create mobile footer accordion.
   */
  Drupal.behaviors.edugouvFooterAccordion = {
    attach: function attach(context) {
      $('#footer-accordion-group', context).once('edugouvFooterAccordion').each(function (index, element) {
        var accordion = element;
        var accordionPanel = $('.panel', accordion);
        var mq = window.matchMedia('(max-width: 767px)');
        var nolink = $('> li > span', accordion);
        accordionPanel.each(function (accordionIndex, accordionElement) {
          var panel = $(accordionElement);
          var button = "<button aria-controls=\"".concat(panel.attr('id'), "\" aria-expanded=\"false\"></button>");
          $(button).insertBefore(panel);
        });
        var accordionTrigger = $('[aria-controls]', accordion);

        var enableMenu = function enableMenu(query) {
          if (query.matches) {
            nolink.click(function (e) {
              $(e.target).next('button').click();
            });
            accordionPanel.attr('hidden', '');
            accordionTrigger.attr('aria-expanded', 'false');
            accordionTrigger.first().attr('aria-expanded', 'true');
            accordionPanel.first().removeAttr('hidden');
            accordionTrigger.click(function (e) {
              e.preventDefault();
              e.stopPropagation();
              var target = e.target;
              var isExpanded = target.getAttribute('aria-expanded') === 'true';
              var active = accordion.querySelector('[aria-expanded="true"]');

              if (active && active !== target) {
                // Set the expanded state on the triggering element
                active.setAttribute('aria-expanded', 'false'); // Hide the accordion sections, using aria-controls to specify the desired section

                document.getElementById(active.getAttribute('aria-controls')).setAttribute('hidden', '');
              }

              if (!isExpanded) {
                // Set the expanded state on the triggering element
                target.setAttribute('aria-expanded', 'true'); // Hide the accordion sections, using aria-controls to specify the desired section

                document.getElementById(target.getAttribute('aria-controls')).removeAttribute('hidden');
              }
            });
            accordionTrigger.keydown(function (e) {
              var code = e.keyCode || e.which;

              if (code === 13 || code === 32) {
                e.preventDefault();
                e.stopPropagation();
                $(e.target).click();
              }
            });
          } else {
            accordionPanel.removeAttr('hidden');
            accordionTrigger.attr('aria-expanded', 'true');
          }
        };

        enableMenu(mq);
        mq.addListener(enableMenu);
      });
    }
  };
  /**
   * Scroll top button.
   */

  Drupal.behaviors.edugouvScrollTop = {
    attach: function attach(context) {
      $('.scroll__top', context).once('edugouvScrollTop').each(function (index, element) {
        var scrollTop = $(element);
        var $window = $(window);
        var $header = $('.js-header');
        var lastScrollTop = 0;
        var lastBackScroll = 700;
        $window.scroll(function () {
          var st = $window.scrollTop();
          scrollTop.toggleClass('show', st < lastBackScroll && $header.hasClass('fixed'));

          if (st + $window.height() === $(document).height()) {
            scrollTop.addClass('show');
          }

          if (st > lastScrollTop) {
            lastBackScroll = st - 700;
          }

          lastScrollTop = st;
        });
        scrollTop.on('click', function (e) {
          e.preventDefault();
          $('html, body').animate({
            scrollTop: 0
          }, '300');
        });
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
   * Create mobile menu.
   */
  Drupal.behaviors.edugouvMobileMenu = {
    attach: function attach(context) {
      $('.main-menu .is-active:last').attr('aria-current', 'true');
      $('.js-menu-toggle', context).once('edugouvMobileMenu').each(function (index, element) {
        var $mainMenu = $('.main-menu');
        var firstLvlDrop = $('.first-lvl-drop');
        var $toSecondLvl = $('.to-second-lvl');
        var $toSecondLvlSpan = $toSecondLvl.siblings('span');
        $(element).click(function () {
          var toggleArea = $(element).attr('aria-expanded') === 'true' || false;
          $(element).toggleClass('is-active').attr('aria-expanded', !toggleArea).attr('aria-label', toggleArea ? Drupal.t('Open menu') : Drupal.t('Close menu'));
          $mainMenu.toggleClass('is-active');
          $('html').toggleClass('menu-open');
          firstLvlDrop.removeClass('is-active');
          $toSecondLvl.attr('aria-expanded', false);
        });
        $(element).keydown(function (e) {
          var code = e.keyCode || e.which;

          if (!e.shiftKey && code === 9 && $mainMenu.hasClass('is-active')) {
            e.preventDefault();
            $('.main-menu').find('>li:first-child > a').focus();
          }
        });
        $(document).keydown(function (e) {
          var code = e.keyCode || e.which;

          if (code === 27 && $(element).hasClass('is-active')) {
            if ($toSecondLvl.attr('aria-expanded') === 'true') {
              var currentSrcond = $('.to-second-lvl[aria-expanded="true"]');
              currentSrcond.focus();
              currentSrcond.attr('aria-expanded', false);
              firstLvlDrop.removeClass('is-active');
            } else {
              $(element).removeClass('is-active').attr('aria-expanded', false).attr('aria-label', Drupal.t('Close menu'));
              $(element).focus();
              $('html').removeClass('menu-open');
              firstLvlDrop.removeClass('is-active');
              $mainMenu.removeClass('is-active');
            }
          }
        });
        $('.main-menu').find('>li:first-child > a').keydown(function (e) {
          var code = e.keyCode || e.which;

          if (e.shiftKey && code === 9 && $mainMenu.hasClass('is-active')) {
            e.preventDefault();
            $(element).focus();
          }
        });
        $('.lvl-2').each(function (i, elem) {
          var backLinkText = $(elem).closest('li').find('> a, > span').text();
          $(elem).prepend("<li class=\"to-first-lvl\"><button type=\"button\" aria-label=\"".concat(Drupal.t('Close the submenu') + backLinkText, "\">").concat(backLinkText, "</button></li>"));
          $(elem).find('li:last-child a, li:last-child button').keydown(function (e) {
            var code = e.keyCode || e.which;

            if (!e.shiftKey && code === 9 && $mainMenu.hasClass('is-active') && $(e.target).next('button').length === 0) {
              e.preventDefault();
              $(elem).find('li:first-child >*').focus();
            }
          });
        });
        $('.to-first-lvl button').click(function (e) {
          $(e.currentTarget).closest('.first-lvl-drop').removeClass('is-active');
          $('.to-second-lvl').attr('aria-expanded', false);
          $(e.currentTarget).parents('li:not(.to-first-lvl)').find('> button').focus();
        });
        $('.to-first-lvl button').keydown(function (e) {
          var code = e.keyCode || e.which;

          if (e.shiftKey && code === 9 && $mainMenu.hasClass('is-active')) {
            e.preventDefault();
            $(e.currentTarget).parents('.lvl-2').find('li:last-child a').focus();
          }
        });
        $toSecondLvl.click(function (e) {
          var toggleArea = $(e.currentTarget).attr('aria-expanded') === 'true' || false;
          $(e.currentTarget).attr('aria-expanded', !toggleArea);
          $(e.currentTarget).next('.first-lvl-drop').toggleClass('is-active');
          $(e.currentTarget).next('.first-lvl-drop').find('.to-first-lvl button').focus();
        });
        $toSecondLvlSpan.click(function (e) {
          var toggleArea = $(e.currentTarget).attr('aria-expanded') === 'true' || false;
          $(e.currentTarget).attr('aria-expanded', !toggleArea);
          $(e.currentTarget).siblings('.first-lvl-drop').toggleClass('is-active');
          $(e.currentTarget).siblings('.first-lvl-drop').find('.to-first-lvl button').focus();
        });
        $('.main-menu, .first-lvl-drop').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
          var target = e.target;

          if (!$(target).hasClass('is-active')) {
            $(target).attr('style', 'visibility: hidden;');
          } else {
            $(target).attr('style', 'visibility: visible !important;');
          }
        });
      });
    }
  };
  /**
   * Add active class to parent link.
   */

  Drupal.behaviors.edugouvActiveParent = {
    attach: function attach(context) {
      setTimeout(function () {
        $('.main-menu .lvl-2 .is-active', context).once('edugouvActiveParent').each(function (index, element) {
          $(element).closest('.main-menu').find('a').removeAttr('aria-current');
          $(element).attr('aria-current', 'true');
          $(element).closest('.first-lvl-drop').parent('li').find('a, span').first().addClass('is-active');
          $(element).closest('.first-lvl-drop').parent('li').find('span').first().addClass('is-active');
        });
        $('.main-menu > li > a, .main-menu > li > span', context).once('edugouvActiveParent').each(function (index, element) {
          var title = $(element).prop('title') || $(element).html();
          $(element).filter('.is-active').prop('title', "".concat(title, " - rubrique active"));
          $(element).not('.is-active, [target="_blank"]').removeAttr('title');
        });
      }, 1);
    }
  };
  /**
   * Append Language switch to burger menu.
   */

  Drupal.behaviors.edugouvLanguageSwitchMobile = {
    attach: function attach(context) {
      $('.header', context).once('edugouvLanguageSwitchMobile').each(function () {
        var $mainMenu = $('.main-menu');
        var $languageSwitch = $('.language-switch > ul > li');
        $languageSwitch.first().addClass('language-switch-first');

        var appendMenu = function appendMenu(mq) {
          if (mq.matches) {
            $mainMenu.append($languageSwitch);
          }
        };

        var mq = window.matchMedia('(max-width: 769px)');
        mq.addListener(appendMenu);
        appendMenu(mq);
      });
    }
  };
  Drupal.behaviors.edugouvMainMenuDesktop = {
    attach: function attach(context) {
      $('.main-menu', context).once('edugouvMainMenuDesktop').each(function (index, element) {
        $(element).keydown(function (e) {
          var code = e.keyCode || e.which;

          if (!e.shiftKey && code === 27) {
            e.preventDefault();
            $(':focus').closest('.first-lvl-drop').parent('li').find('a, span').first().focus();
            $(':focus').parent('li').removeClass('active-1st-level');
          }
        });
        $(element).keydown(function (e) {
          var code = e.keyCode || e.which;
          var targetEl = e.target;

          if (!e.shiftKey && code === 13) {
            $(':focus').parent('li').addClass('active-1st-level');
          }

          if (!e.shiftKey && code === 13 && targetEl.classList.contains('quick-menu__link')) {
            $(targetEl).parent('li').addClass('active-1st-level');
            $(targetEl).click();
          }
        });
        $(element).click(function () {
          $(':focus').parent('li').addClass('active-1st-level');
        });
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
   * Create progress bar for article.
   */
  Drupal.behaviors.edugouvProgressBar = {
    attach: function attach(context) {
      $('.js-edugouv-progress-bar', context).once('edugouvProgressBar').each(function (index, element) {
        var bulletinTab = $(element).parents('.current-bulletin-pages__tab');
        var isBulletin = bulletinTab.length > 0;
        var $progressElement = isBulletin ? $(element).parents('.current-bulletin-pages__tab') : $('[class*="column--flex--main"]');
        var $progressBar = $(Drupal.theme('edugouvProgressBar')).prependTo(element);
        var $progress = $('.progress', $progressBar);
        var $header = $('.header');
        var $window = $(window);
        var $leftSidebar = $('.column--flex--side');
        var scrollWrapper = $(element).find('.custom-scrollbar-wrapper');

        if ($leftSidebar.find('> div').length > 1) {
          $leftSidebar.addClass('no-mobile-progress');
        }

        $('body').css('overflow', 'visible'); // Make progress bar animation.

        var createProgress = function createProgress() {
          var percent = ($window.scrollTop() + $header.outerHeight() - $progressElement.offset().top) / $progressElement.height() * 100;
          $progress.css('width', "".concat(percent, "%"));
        };

        createProgress();
        $window.scroll(createProgress);

        if ($(element).hasClass('show-summary')) {
          var currentGapHeight = function currentGapHeight() {
            var topAdminToolbar = document.querySelector('#toolbar-bar');
            var botAdminToolbar = document.querySelector('.toolbar-tray-horizontal.is-active');
            var crisisMessage = document.querySelector('.back-office-message-tab');
            var miniSiteMenu = document.querySelector('.mini-site-menu-wrapper');
            var summaryBlock = document.querySelector('.js-edugouv-progress-bar');
            var sumBlockHeight = 0;

            if ($(window).width() >= 768) {
              sumBlockHeight = 0;
            } else {
              sumBlockHeight = summaryBlock ? summaryBlock.offsetHeight : 0;
            }

            var topAdminToolbarHeight = topAdminToolbar ? topAdminToolbar.offsetHeight : 0;
            var botAdminToolbarHeight = botAdminToolbar ? botAdminToolbar.offsetHeight : 0;
            var crisisMessageHeight = crisisMessage ? crisisMessage.offsetHeight : 0;
            var miniSiteMenuHeight = miniSiteMenu ? miniSiteMenu.offsetHeight : 0;
            return topAdminToolbarHeight + botAdminToolbarHeight + crisisMessageHeight + miniSiteMenuHeight + sumBlockHeight + $header.outerHeight();
          }; // Make highlights for summary navigation.


          var refreshTinyScroll = function refreshTinyScroll() {
            scrollWrapper.css('height', $(window).height() - (currentGapHeight() + $('.edugouv-progress-bar').innerHeight() + 25) + 'px');
            scrollWrapper.data('plugin_tinyscrollbar').update();
          };

          var $summary = $('<div class="edugouv-progress-summary viewport"><div class="overview"></div></div>').appendTo($(element).find('.custom-scrollbar-wrapper'));
          var $headingsFirst = $('.in-depth-wrapper > h2', $progressElement).not('.hide_summary');
          var $headingsSecond = $('.bo_detail').length ? $('.content-bo-detail .Stitre, .content-bo-detail .Stitre1, .content-bo-detail h2:not([class]), .content-bo-detail h3:not([class])', $progressElement).not('.hide_summary') : $('.ckeditor-text h2, .ckeditor-text h3:not(.thematic-page-slide__title)', $progressElement).not('.hide_summary');
          var $headingsThird = $('.edugouv-common-rubric-item h2, .edugouv-common-rubric-item h3', $progressElement);
          var $headingsFAQ = $('.faq-section.on_summary .faq-section__head h2, .faq-section.on_summary .faq-section__accordion h3.on_summary');
          var lastScroll = 0;
          var content = '';
          var $headings = $.merge($headingsFirst, $headingsSecond, $headingsThird, $headingsFAQ);

          var highlightSummary = function highlightSummary($sections, $links) {
            var scrollTop = isBulletin ? $window.scrollTop() + currentGapHeight() + 100 : $window.scrollTop() + currentGapHeight() + 100;

            for (var i = $sections.length - 1; i >= 0; i -= 1) {
              var $section = $sections.eq(i);
              var $parent = $links.closest('li');

              if (scrollTop >= $section.offset().top) {
                $parent.removeClass('active');
                $links.removeClass('active');
                $links.removeClass('active').filter("[href=\"#".concat($section.attr('id'), "\"]")).addClass('active').closest('li').addClass('active').closest('.edugouv-summary-item-group').addClass('active');
                scrollWrapper.css('height', summary.outerHeight() + margin + 'px');

                if (summary.outerHeight() + margin > viewportHeight) {
                  scrollWrapper.css('height', viewportHeight + 'px'); // Create custom scrollbar.

                  scrollWrapper.tinyscrollbar({
                    axis: 'y'
                  });
                } else {
                  scrollWrapper.find('.scrollbar').hide();
                  scrollWrapper.css('height', summary.outerHeight() + margin + 'px'); // scrollWrapper.css('height',   currentGapHeight());
                }

                return $links;
              } // Remove active state from first items when user scrolls up.


              if (lastScroll > scrollTop && scrollTop < $section.offset().top && i === 0) {
                $links.removeClass('active');
                $parent.removeClass('active');
              }
            }

            lastScroll = scrollTop;
            return true;
          }; // Build summery navigation.


          $headings.each(function (i, heading) {
            var id = "edugouv-summary-item-".concat(i);
            $(heading).attr('id', id);

            if (i === 0) {
              content += '<ul>';
            }

            var linkClass = heading.tagName.toLowerCase() === 'div' ? heading.className : heading.tagName.toLowerCase();
            var link = "<a href=\"#".concat(id, "\" class=\"").concat(id, " ").concat(linkClass, "\">").concat(heading.innerText, "</a>");

            if (i !== 0) {
              if ($headings[i].tagName.toLowerCase() === 'h2' && $headings[i - 1].tagName.toLowerCase() === 'h2') {
                content += "</li><li class=\"edugouv-summary-item-group\">".concat(link);
              }

              if ($headings[i].tagName.toLowerCase() !== 'h2' && $headings[i - 1].tagName.toLowerCase() === 'h2') {
                content += "<ul><li>".concat(link);
              }

              if ($headings[i].tagName.toLowerCase() !== 'h2' && $headings[i - 1].tagName.toLowerCase() !== 'h2') {
                content += "</li><li>".concat(link);
              }

              if ($headings[i].tagName.toLowerCase() === 'h2' && $headings[i - 1].tagName.toLowerCase() !== 'h2') {
                content += "</ul><li class=\"edugouv-summary-item-group\">".concat(link);
              }
            } else {
              content += "<li class=\"edugouv-summary-item-group\">".concat(link);
            }

            if ($headings.length - 1 === i) {
              content += '</li></ul>';
            }
          });
          $summary.find('.overview').append(content); // Set summary height and init tinyscrollbar.

          scrollWrapper.append('<div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>');
          var summary = $(element).find('.edugouv-progress-summary .overview');
          var summaryGroup = summary.find('.edugouv-summary-item-group');
          summaryGroup.addClass('active');
          summaryGroup.children().addClass('active');
          var viewportHeight = $(window).height() - $('.header').height() - $('.edugouv-progress-bar').height();
          viewportHeight -= $('.tarteaucitronAlertBigBottom').css('display') == 'block' ? $('.tarteaucitronAlertBigBottom').outerHeight() : 0;
          viewportHeight -= $('.mini-site-menu-wrapper').length ? $('.mini-site-menu-wrapper').height() : 0;
          viewportHeight -= $('#toolbar-administration').length ? 80 : 0;
          var margin = summary.outerHeight() > 0 ? 20 : 0;
          scrollWrapper.css('margin-top', margin);
          setTimeout(function () {
            if (summary.outerHeight() + margin > viewportHeight) {
              scrollWrapper.css('height', viewportHeight + 'px');
              summary.find('.edugouv-summary-item-group').removeClass('active');
              summary.find('.edugouv-summary-item-group').children().removeClass('active');
              summary.find('.edugouv-summary-item-group').children('ul').removeAttr('class'); // Create custom scrollbar.

              scrollWrapper.tinyscrollbar({
                axis: 'y'
              });
            } else {
              scrollWrapper.find('.scrollbar').hide();
              summary.find('.edugouv-summary-item-group').not(':first-child').removeClass('active');
              summary.find('.edugouv-summary-item-group').children().removeClass('active');
              summary.find('.edugouv-summary-item-group').children('ul').removeAttr('class');
              scrollWrapper.css('height', summary.outerHeight() + margin + 'px');
              summary.find('.edugouv-summary-item-group').removeClass('active');
            }
          }, 100);
          var $summaryItem = $('a', $summary);
          $summaryItem.click(function (e) {
            e.preventDefault();
            new Promise(function (resolve) {
              var $element = $($(e.currentTarget).attr('href'));

              if ($element.length) {
                $element.triggerHandler('summary:open');
                setTimeout(function () {
                  return resolve();
                }, 250);
              } else {
                resolve();
              }
            }).then(function () {
              $('html, body').animate({
                scrollTop: $(e.target.attributes.href.value).offset().top - currentGapHeight() // scrollTop: $($(e.currentTarget).attr('href')).offset().top - $header.outerHeight() - parseInt($header.css('top'), 10),

              }, 500);
            });

            if (scrollWrapper.data('plugin_tinyscrollbar') !== undefined) {
              refreshTinyScroll();
            }
          });
          highlightSummary($headings, $summaryItem);
          $window.scroll(function () {
            highlightSummary($headings, $summaryItem);

            if (scrollWrapper.data('plugin_tinyscrollbar') !== undefined // && !scrollWrapper.find('.scrollbar').hasClass('disable')
            ) {
                refreshTinyScroll();
                var scroll = scrollWrapper.data('plugin_tinyscrollbar');
                var scrolltop = 0;
                var groupsArray = $('.edugouv-summary-item-group.active').prevAll('.edugouv-summary-item-group');

                for (var groupInd = 0; groupInd < groupsArray.length; groupInd++) {
                  scrolltop += groupsArray.eq(groupInd).outerHeight() + parseInt(groupsArray.eq(groupInd).css('margin-bottom'), 10);
                }

                if (scroll.contentPosition !== scrolltop) {
                  scrollWrapper.data('plugin_tinyscrollbar').update(scrolltop);
                }
              }
          });
        }
      });
    }
  };
  /**
   * Accessibility button.
   */

  Drupal.behaviors.accessibilityButton = {
    attach: function attach() {
      $(document).on('click', 'input[name="tandem-ac-contrast"]', function () {
        var $accessibilityButton = $('#tandem-ac-button');
        var $body = $('body');

        if ($body.hasClass('tandem-ac-high-contrast')) {
          $accessibilityButton.html('<span aria-hidden="true"></span>Renforced');
        } else {
          $accessibilityButton.html('<span aria-hidden="true"></span>Accessibility');
        }
      });
    }
  };
  /**
   * Create popup with image.
   */

  Drupal.behaviors.edugouvModal = {
    attach: function attach(context) {
      $('[data-edugouv-modal], .js-gallery .lazy', context).once('edugouvModal').each(function (index, element) {
        var $this = $(element);
        var popupOpened = false;
        var $attribute;

        if ($this.attr('data-edugouv-modal')) {
          $attribute = 'data-edugouv-modal';
          setPopup($attribute);
        } else if ($this.hasClass('lazy')) {
          $this.Lazy({
            scrollDirection: 'vertical',
            visibleOnly: true,
            beforeLoad: function beforeLoad(element) {
              $this.closest('.gallery-slider').addClass('loading');
            },
            afterLoad: function afterLoad(element) {
              $attribute = 'src';
              setPopup($attribute);
              $this.closest('.gallery-slider').removeClass('loading');
            }
          });
        }

        function setPopup(attrValue) {
          var $img = $this.attr(attrValue).includes('/');
          var content = '';

          if ($img) {
            content = "<img src=\"".concat($this.attr(attrValue), "\" alt=\"").concat($this.attr('alt'), " - ").concat(Drupal.t('Enlarged image'), "\">");
          } else {
            content = $($this.attr(attrValue)).html();
          }

          var $popup = $(Drupal.theme('edugouvPopup', "".concat(content)));
          var $body = $('body');
          var $html = $('html');

          if ($img && !$this.hasClass('no-wrap')) {
            $this.wrap('<div class="edugouv-modal-item-wrapper"></div>');
            $this.attr('tabindex', 0);
            $this.before("<div class=\"edugouv-modal-icon\">".concat(Drupal.t('Enlarge infographic'), "</div>"));
            $this.after('<span class="edugouv-modal-icon__focuser"></span>');
          }

          $body.on('edugouv-modal-close', function () {
            popupOpened = false;
            $html.removeClass('disable-scroll');
            $('.edugouv-popup').remove();
            $(document).off('click', '.edugouv-popup__arrows .prev-gallery');
            $(document).off('click', '.edugouv-popup__arrows .next-gallery');
          });
          $(document).keyup(function (e) {
            if (e.key === 'Escape') {
              $body.trigger('edugouv-modal-close');
            }
          });
          $this.on('click keypress', function (event) {
            event.preventDefault();

            if (!$body.hasClass('a42-ac-high-contrast')) {
              var $clonedPopup = $popup.clone().appendTo($body);
              var $closeButton = $('.edugouv-popup__close', $clonedPopup);
              $html.addClass('disable-scroll');
              Drupal.attachBehaviors(document, Drupal.settings);

              if ($this.closest('.js-gallery').length && !$('.edugouv-popup__arrows').length) {
                $('.edugouv-popup__wrapper').append('<div class="edugouv-popup__arrows"><a class="prev-gallery"></a><a class="next-gallery"></a></div>');
              } else if (!$this.closest('.js-gallery').length) {
                $('.edugouv-popup__wrapper .edugouv-popup__arrows').remove();
              }

              $closeButton.focus();
              $(document).one('click', '.edugouv-popup__arrows .prev-gallery', function () {
                $body.trigger('edugouv-modal-close');
                $this.closest('.gallery-slider').prev().find('img.call-popup-modal').trigger('click');
              });
              $(document).one('click', '.edugouv-popup__arrows .next-gallery', function () {
                $body.trigger('edugouv-modal-close');
                $this.closest('.gallery-slider').next().find('img.call-popup-modal').trigger('click');
              });
              $clonedPopup.click(function (e) {
                if (!$clonedPopup.find(e.target).length && !$(e.target).hasClass('tarteaucitronAllow') || $clonedPopup.find(e.target).hasClass('edugouv-popup__wrapper')) {
                  $body.trigger('edugouv-modal-close');
                }
              });
              $closeButton.click(function (e) {
                e.preventDefault();
                $body.trigger('edugouv-modal-close');
              });
            }
          });
        }
      });
    }
  };
  /**
   * Create share popup.
   */

  Drupal.behaviors.edugouvSharePopup = {
    attach: function attach(context) {
      var _this = this;

      $('.js-share', context).once('edugouvSharePopup').each(function (index, element) {
        var $this = $(element);
        var $link = $('button', $this).length ? $('button', $this) : $('a', $this);
        var $closeButton = $('.share__items__close', $this);
        var popupSubtitleText = $('.header__title').text().trim();
        var popupSubTitle = "<p id=\"share_subtitle\" class=\"subtitle\">".concat(popupSubtitleText, "</p>");
        var $sharePopup = $(element).find('.share__items');
        setTimeout(function () {
          $('.addthis-box', $this).before(popupSubTitle);
          $sharePopup.find('.subtitle').attr('id', "".concat($sharePopup.find('.subtitle').attr('id') + index));
          $sharePopup.find('h1').attr('id', "".concat($sharePopup.find('h1').attr('id') + index));
          var popupDescribedby = $sharePopup.find('.subtitle').attr('id');
          var popupLabelledby = $sharePopup.find('h1').attr('id');
          $sharePopup.attr('aria-describedby', popupDescribedby);
          $sharePopup.attr('aria-labelledby', popupLabelledby);
        }, 100);
        $sharePopup.each(function () {
          var $name = $(_this).find('h1').text();
          $(_this).attr('name', $name);
        });
        $link.click(function (e) {
          e.preventDefault();
          $(document).find('.js-share.show-popup').removeClass('show-popup');
          $this.addClass('show-popup');
        });
        $closeButton.click(function () {
          $this.removeClass('show-popup');
        });
        $('body').click(function (e) {
          var $target = $(e.target);

          if (!$target.closest('.js-share').length) {
            $this.removeClass('show-popup');
          }
        });
        $(document).keyup(function (e) {
          if (e.key === 'Escape') {
            $('.js-share.show-popup > button').first().focus();
            $this.removeClass('show-popup');
          }
        });
        $(document).on('keydown', '.share__items a, .share__items button', function (e) {
          var code = e.keyCode || e.which;
          var $tabButton = code === 9;
          var $shiftButton = e.shiftKey;
          var $popupWrapper = $(e.target).closest('.share__items');
          var $openPopup = $(e.target).closest('.js-share').hasClass('show-popup');
          var $links = $popupWrapper.find('a, button');

          if ($tabButton && $openPopup) {
            if (!$shiftButton && $(e.target)[0] === $links.last()[0]) {
              e.preventDefault();
              $popupWrapper.find('button:first-child').focus();
            }

            if ($shiftButton && $(e.target)[0] === $links.first()[0]) {
              e.preventDefault();
              $popupWrapper.find('a:last-child').focus();
            }
          }
        });
      });
    }
  };
  /**
   * Create responsive table.
   */

  Drupal.behaviors.edugouvTable = {
    attach: function attach(context) {
      $('.ckeditor-text table, .maintenance-page table', context).once('edugouvTable').each(function (index, element) {
        if ($(element).parents('table').length) {
          return;
        }

        var $this = $(element);
        $this.wrap('<div class="table-wrapper custom-scrollbar-wrapper"><div class="viewport"><div class="overview"></div></div></div>');
        var $tableWrapper = $this.parents('.table-wrapper');
        $tableWrapper.append('<div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>');
        $this.find('tr').each(function (i, e) {
          $(e).find('*').first().addClass('first-item');
        });

        function setSize() {
          $tableWrapper.find('.viewport').height($this[0].offsetHeight);
        }

        setSize(); // Create custom scrollbar.

        $tableWrapper.tinyscrollbar({
          axis: 'x',
          wheel: true
        });
        $(window).resize(function () {
          setSize();
          $tableWrapper.data('plugin_tinyscrollbar').update();
        });

        if ($this.closest('.faq-section__accordion').length) {
          $('body').on('click', '.faq-section__accordion .faqfield-question', function (e) {
            $tableWrapper.find('.viewport').height($this[0].offsetHeight);
            $tableWrapper.data('plugin_tinyscrollbar').update();
          });
        }
      });
    }
  }; // Hotfix for https://prj.adyax.com/issues/394169

  Drupal.behaviors.modalInput = {
    attach: function attach() {
      $(document).ajaxComplete(function () {
        setTimeout(function () {
          $('.cke_button__anchor').click(function () {
            setTimeout(function () {
              $('input').once('modalInput').each(function (index, element) {
                $(element).click(function (e) {
                  $(e.target).focus();
                });
              });
            }, 100);
          });
        }, 1000);
      });
    }
  };
  /**
   * Returns html of progress bar.
   */

  Drupal.theme.edugouvProgressBar = function () {
    return '<div class="edugouv-progress-bar"><span class="progress"></span></div>';
  };
  /**
   * Returns html of popup.
   */


  Drupal.theme.edugouvPopup = function (content) {
    var output = '';
    output += '<div class="edugouv-popup">';
    output += '<div class="edugouv-popup__wrapper">';
    output += '<div class="edugouv-popup__content">';
    output += "<a aria-label=\"".concat(Drupal.t('Close popup'), "\" href=\"#\" class=\"edugouv-popup__close\"></a>");
    output += content;
    output += '</div>';
    output += '</div>';
    output += '</div>';
    return output;
  };
  /**
   * Sets width of autocomplete field same to input; mobile search scroll to top on focus
   */


  Drupal.behaviors.edugouvSearchAutocomplete = {
    attach: function attach(context) {
      var _this2 = this;

      $('.header__search__form', context).once('edugouvSearchAutocomplete').each(function (index, element) {
        var $this = $(element);

        if ($this.closest('.glossary__header').length === 0) {
          var $form = $('form', $this);
          var $input = $('.ui-autocomplete-input', $this);
          var $autocomplete = $('.ui-autocomplete');
          var $searchSubmit = $('.form-submit', $this);
          var $returnButton = $('.return-button', $this); // Autocomplete width equals to search input.

          $input.on('input', function () {
            var $inputWidth = $input.outerWidth();
            $autocomplete.css('max-width', $inputWidth);
          }); // Prevent search submit if empty input.

          $form.submit(function (e) {
            if ($input.val().length < 1) {
              e.preventDefault();
            }
          }); // Submit on click

          if ($input.length) {
            $input.autocomplete({
              select: function select(e, ui) {
                $(_this2).val(ui.item.value);

                if (ui.item.label.indexOf('_blank') >= 0) {
                  var link = jQuery.parseHTML(ui.item.label);
                  var win = window.open(link[0].href, '_blank');
                  win.focus();
                } else if (ui.item.label.indexOf('href="/') >= 0) {
                  var _link = jQuery.parseHTML(ui.item.label);

                  window.location.href = _link[0].href;
                  return false;
                }

                return $form.submit();
              }
            });
          } // Mobile behavior.


          var searchScroll = function searchScroll(mq) {
            if (mq.matches) {
              $input.on('focusin', function () {
                var $inputHeight = $input.outerHeight();
                $searchSubmit.css('max-height', $inputHeight);
                $('html, body').animate({
                  scrollTop: $input.offset().top - 100
                }, 500);
                $form.addClass('focused');
                $returnButton.addClass('displayed');
              });
              $input.on('focusout', function () {
                $form.removeClass('focused');
                $returnButton.removeClass('displayed');
              });
            }
          };

          var mq = window.matchMedia('(max-width: 767px)');
          mq.addListener(searchScroll);
          searchScroll(mq);
        }
      });
    }
  };
  /**
   * Change behavior of preloader spinner
   */

  Drupal.behaviors.loadSpinner = {
    attach: function attach() {
      var _this3 = this;

      var $link = $('button.personality-contents-block-load-more');
      var $container = $('.personality-content-wrapper div.personality-contents-block-load-more');
      var $newsContainer = $('.show-more-personality-content-wrapper');
      var $newsLink = $newsContainer.find('.show-more-personality-content');
      $link.click(function (event) {
        event.preventDefault();
        var $currentButton = $(_this3);
        $container.addClass('loading');
        $(document).ajaxComplete(function () {
          $container.removeClass('loading');
          $currentButton.remove();
        });
      });
      $newsLink.click(function (event) {
        event.preventDefault();
        var $currentButton = $(_this3);
        $newsContainer.addClass('loading');
        $(document).ajaxComplete(function () {
          $newsContainer.removeClass('loading');
          $currentButton.remove();
        });
      });
    }
  };
  /**
   * Change behavior of anchor links
   */

  Drupal.behaviors.anchorLinks = {
    attach: function attach() {
      var _this4 = this;

      var $anchorLinks = $('.article__main .column--flex--main a[href^="#"]');
      $anchorLinks.each(function () {
        $(_this4).click(function () {
          var id = $(_this4).attr('href');
          var $header = $('.header');
          var headerTop = parseInt($header.css('top'), 10) + $header.outerHeight();
          var elemTop = $(id).offset().top;
          $('html, body').animate({
            scrollTop: elemTop - headerTop
          }, 500);
        });
      });
    }
  };
  /**
   * Add behavior of facet show more button
   */

  Drupal.behaviors.facetShowMore = {
    attach: function attach() {
      if ($('.facets-widget-links').length) {
        $('.facets-widget-links').each(function (index, element) {
          var tagsCount = $(element).children('.js-facets-links').find('.facet-item').length;

          if (tagsCount > 7) {
            $(element).children('.js-facets-links').find('.facet-item:nth-child(7)').nextAll().hide();

            if (!$(element).find('.facet-item-show').length) {
              $(element).children('.js-facets-links').append("<li class=\"facet-item-show\"><button type=\"button\" class=\"btn btn-cta btn-light-blue show-all-tags\">".concat(Drupal.t('Show more thematics'), "</button></li>"));
            }

            $('.facet-item-show').show();
          }
        });
        $('.show-all-tags').off().on('click', function (e) {
          e.preventDefault();
          $(e.target).toggleClass('all-shown');

          if ($(e.target).hasClass('all-shown')) {
            $(e.target).text(Drupal.t('Hide thematics'));
            $(e.target).closest('.js-facets-links').find('.facet-item').show();
          } else {
            $(e.target).text(Drupal.t('Show more thematics'));
            $(e.target).closest('.js-facets-links').find('.facet-item:nth-child(7)').nextAll().hide();
          }

          $('.facet-item-show').show();
        });
      }
    }
  };
  /**
   * Add behavior to change bio header icon
   */

  Drupal.behaviors.changeBioHeader = {
    attach: function attach(context) {
      $('.header__related', context).once('changeBioHeader').each(function (index, element) {
        $(element).find('a').prepend('<span class="pseudo-content" aria-hidden="true"></span>');
      });
    }
  };
  /**
   * Add behavior to add class to colored block
   */

  Drupal.behaviors.changeColoredBlock = {
    attach: function attach(context) {
      $('.ckeditor-background-color', context).once('changeColoredBlock').each(function (index, element) {
        var color = $(element).css('background-color');
        var rgb = color.substr(4).split(")")[0].split(', ');

        if (parseInt(rgb[0]) < 230 || parseInt(rgb[1]) < 230 || parseInt(rgb[2]) < 230) {
          $(element).addClass('colored');
        }

        if (parseInt(rgb[0]) === 0 || parseInt(rgb[1]) === 0 || parseInt(rgb[2]) === 0) {
          $(element).addClass('colored-black');
        }
      });
    }
  };
  /**
   * Add behavior to add class to white CTA
   */

  Drupal.behaviors.changeColoredCta = {
    attach: function attach(context) {
      $('.ctalink', context).once('changeColoredCta').each(function (index, element) {
        var color = $(element).css('background-color');
        var rgb = color.substr(4).split(')')[0].split(', ');

        if (parseInt(rgb[0], 10) > 230 || parseInt(rgb[1], 10) > 230 || parseInt(rgb[2], 10) > 230) {
          $(element).addClass('ctalink-white');
        }
      });
    }
  };
  Drupal.behaviors.searchPageRadiosBehavior = {
    attach: function attach(context) {
      $('.edugouv-search-type', context).once('searchPageRadiosBehavior').each(function (index, element) {
        var elements = $(element).find('.form-item-radio');
        elements.each(function () {
          var label = $(this).find('label');
          label.on('keyup', function (e) {
            if (e.key === 'Enter') {
              label.siblings('input').trigger('click');
            }
          });
        });
      });
    }
  };
  Drupal.behaviors.scrollOnEspacePressChange = {
    attach: function attach(context) {
      $('.ep-srch-form-container__form', context).once('scrollOnEspacePressChange').each(function (index, element) {
        var $header = $('.header');
        var inputs = $(element).find('.js-form-type-checkbox input');
        var dateInputs = $(element).find('.ep-srch-form__dates .form-item input');
        var resetForm = $(element).find('.ep-srch-form__btn');

        var getNeededPosition = function getNeededPosition() {
          var elemTop = $(element).closest('.container--flex').find('.column--flex--main--wide').offset().top;
          var headerTop = parseInt($header.css('top'), 10) + $header.outerHeight();
          return elemTop - headerTop;
        };

        function applyScroll() {
          $('html, body').animate({
            scrollTop: getNeededPosition() - 10
          }, 500);
        }

        dateInputs.each(function () {
          $(this).on('change', function () {
            applyScroll();
          });
        });
        inputs.each(function () {
          $(this).on('change', function () {
            applyScroll();
          });
        });
        resetForm.on('click', function () {
          applyScroll();
        });
        $(document).ajaxComplete(function () {
          if (!$(element)) {
            return false;
          }

          applyScroll();
        });
      });
    }
  };
  Drupal.behaviors.aushaFrameTrackingClass = {
    attach: function attach(context) {
      $('body', context).once('aushaFrameTrackingClass').each(function (index, element) {
        var frames = $('iframe', element);
        frames.each(function (i, el) {
          var src = el.getAttribute('src');

          if (src.includes('ausha')) {
            el.closest('.embedded-entity').classList.add('tandem-media-wrapper-ausha');
          }
        });
      });
    }
  };
})(jQuery, Drupal, drupalSettings);
"use strict";

(function ($, Drupal) {
  function onPagerClick() {
    var $listContainer = $('article.espace_press .column--flex--main--wide');

    if ($listContainer.length) {
      $('html, body').animate({
        scrollTop: $listContainer.offset().top - 120
      }, 500);
    }
  }

  Drupal.behaviors.espacePressPager = {
    attach: function attach() {
      var $pagerItems = $('article.espace_press .pager a');
      $pagerItems.off('click.espacePressPager');
      $pagerItems.on('click.espacePressPager', onPagerClick);
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  Drupal.behaviors.etablissementSearch = {
    attach: function attach(context) {
      $('.js-establishment__search', context).once('etablissementSearch').each(function (index, element) {
        var $this = $(element);
        var $searchField = $('.js-form-type-textfield', $this);
        var $removeFilterButton = $('.etablissement--search__content__header_tags .btn');
        var checkedItems = "(".concat($('[type="checkbox"]:checked,[type="radio"]:checked').length, ")");
        var basePath = drupalSettings.path ? drupalSettings.path.baseUrl : '/';
        var pathname = window.location.pathname + window.location.search;
        $searchField.append("\n          <div class=\"form-actions\">\n            <button type=\"submit\">Search</button>\n          </div>\n        "); // Hide for now.
        // <div class="geolocation">
        // <a aria-label="${Drupal.t('Geolocation')}" href="javascript:void(0);"></a>
        // </div>
        // `);

        $('fieldset, .form-actions.js-form-wrapper').wrapAll('<div class="filters__content" id="filtersContent"></div>');
        $('.filters__content').prepend('<p>Affinez votre recherche</p>');
        $('.filters__content').wrap('<div class="filters"></div>');
        $('.filters').after("<button class=\"open-map\">".concat(Drupal.t('Search by map'), "</button>"));
        var openMap = $('.open-map');
        $('#edit-field-properties :input').each(function (item, inputElement) {
          if (!$(inputElement).prop('checked')) {
            $(".tag-".concat($(inputElement).prop('value'))).each(function (itemTag, tagElement) {
              $(tagElement).hide();
            });
          }
        });
        $removeFilterButton.on('click', function (e) {
          var removeID = $(e.target).attr('id');

          if (removeID === 'radio-field-status') {
            $('#edit-field-status').find('input[value="All"]').prop('checked', true);
            $this.find('form').submit();
          } else if (removeID === 'radio-field-type') {
            $('#edit-field-type-etablissement').find('input[value="All"]').prop('checked', true);
            $this.find('form').submit();
          } else if (removeID === 'radio-field-geo') {
            $('#edit-geo-point').val('');
            $this.find('form').submit();
          } else {
            var checkboxId = removeID.split('status-').pop();
            $("[name*=\"".concat(checkboxId, "\"]")).prop('checked', false);
            $this.find('form').submit();
          }
        });

        if ($('.js-map-search').length) {
          var map = L.map('map').setView([46, 2], 6);
          $.get("".concat(basePath, "map").concat(pathname)).done(function (responce) {
            $('.js-map-search').once('searchMap').each(function () {
              var mapCopyright = drupalSettings.osm_credit !== undefined ? jQuery.parseHTML(drupalSettings.osm_credit) : [''];
              map.attributionControl.setPrefix(false);

              if (mapCopyright.length) {
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  attribution: mapCopyright[0].innerHTML
                }).addTo(map);
              } else {
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
              }

              $.each(responce.academy, function (i, val) {
                var lat = val.latitude;
                var lon = val.longitude;
                var count = val.count;
                var mapIcon = L.divIcon({
                  html: "<div class=\"icon-map\">".concat(count, "</div>"),
                  iconSize: null
                });

                if (lat !== undefined && lon !== undefined) {
                  L.marker([lat, lon], {
                    icon: mapIcon
                  }).addTo(map);
                }
              });
              openMap.on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                $('.js-map-search').show();
                map.invalidateSize();
              });
              $('.close-map').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                $('.js-map-search').hide();
              });
            });
          });
        }

        $this.closest('body').find('.footer-nav').addClass('footer-nav--establishment__search');
        $this.closest('body').find('.footer-nav').addClass('footer-nav--establishment__search'); // Hide for now.
        // $('.geolocation a').on('click', (e) => {
        //   e.preventDefault();
        //   e.stopPropagation();
        //   navigator.geolocation.getCurrentPosition((position) => {
        //     const lat = position.coords.latitude;
        //     const lng = position.coords.longitude;
        //     const latLng = `${lat},${lng}`;
        //     $('#edit-geo-point').val(latLng);
        //     $this.find('form').submit();
        //   });
        // });
      });
    }
  };
  /**
  * Add behavior to scroll to search filters
  */

  Drupal.behaviors.scrollToSearchFilters = {
    attach: function attach(context) {
      $('[data-drupal-selector="edit-keywords"]', context).once('scrollToSearchFilters').each(function (index, element) {
        var scrollTop = 0;

        if ($('.js-establishment__search').length) {
          var _window = window,
              location = _window.location;

          if (location.search.length) {
            scrollTop = $('.establishment__search__header').offset().top + $('.establishment__search__header').innerHeight() - 100;
          } else {
            scrollTop = $('.establishment__search__header').offset().top - 100;
          }
        } else {
          scrollTop = $(element).offset().top + $(element).outerHeight() - 100;
        }

        if ($('#toolbar-administration').length) {
          scrollTop -= 170;
        }

        $('html, body').animate({
          scrollTop: scrollTop
        }, 500);
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
   * Create glossary filters.
   */
  Drupal.behaviors.edugouvGlossaryFilters = {
    attach: function attach(context) {
      $('.glossary__filters', context).once('edugouvGlossaryFilters').each(function (index, element) {
        var $this = $(element);
        var $filterTrigger = $('a', $this);
        var $glossaryLetter = $('.glossary__letter').not('#wrapper-letter-none');
        var noResultsBlock = $('#wrapper-letter-none');
        $filterTrigger.click(function (e) {
          e.preventDefault();
          e.stopPropagation();
          $filterTrigger.not(e.target).removeClass('is-active');
          $(e.target).toggleClass('is-active');

          if ($filterTrigger.hasClass('is-active')) {
            $glossaryLetter.each(function (i, el) {
              var parentFilter = $("a[href=\"#".concat($(el).attr('id'), "\"]"), $this);

              if (!parentFilter.hasClass('is-active')) {
                $(el).fadeOut().removeClass('visible');
              } else if (!$(el).hasClass('hide')) {
                $(el).fadeIn().addClass('visible');
              }
            });
          } else if (!$glossaryLetter.hasClass('hide')) {
            $glossaryLetter.fadeIn().addClass('visible');
          }

          if (!$('.glossary__letter.visible').length) {
            noResultsBlock.show().removeClass('hide');
          } else {
            noResultsBlock.hide().addClass('hide');
          }
        });
      });
    }
  };
  /**
   * Create glossary search.
   */

  Drupal.behaviors.edugouvSearch = {
    attach: function attach(context) {
      $('#glossarySearch', context).once('edugouvGlossaryFilters').each(function (index, element) {
        var $this = $(element);
        var glossaryItem = $('.glossary__item');
        var noResultsMessage = $('#wrapper-letter-none');
        noResultsMessage.hide().addClass('hide');
        $this.submit(function (e) {
          var counter = 0;
          e.preventDefault();
          var filter = $('input[type="text"]', $this).val().toUpperCase();
          glossaryItem.each(function (i, el) {
            var textValue = $(el).text();

            if (textValue.toUpperCase().indexOf(filter) > -1) {
              $(el).show().removeClass('hide');
              $(el).parent().show().removeClass('hide');
              counter += 1;
            } else {
              $(el).hide().addClass('hide');

              if ($(el).parent().find('.glossary__item').length === $(el).parent().find('.hide').length) {
                $(el).parent().hide().addClass('hide');
              } else {
                $(el).parent().show().removeClass('hide');
              }
            }
          });

          if (counter === 0) {
            noResultsMessage.show().removeClass('hide');
          } else {
            noResultsMessage.hide().addClass('hide');
          }
        });
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
  * Add behavior to scroll to search ival filters
  */
  Drupal.behaviors.scrollToIvalFilters = {
    attach: function attach(context) {
      $('.ival-search', context).once('scrollToIvalFilters').each(function (index, element) {
        var scrollTop = 0;

        if ($('.etablissement--search__content__wrapper').length) {
          scrollTop = $(element).find('.establishment__search__header__content').offset().top + jQuery('.establishment__search__header__content').innerHeight() - 250;
        } else {
          scrollTop = $(element).find('.establishment__search__header__content').offset().top - 150;
        }

        $('html, body').animate({
          scrollTop: scrollTop
        }, 500);
      });
    }
  };
})(jQuery, Drupal);
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable guard-for-in */

/* eslint-disable no-restricted-syntax */

/* eslint-disable max-len */

/* eslint-disable no-unused-vars */
(function ($, Drupal) {
  Drupal.behaviors.servicePage = {
    attach: function attach(context) {
      var _this = this;

      $('.js-block-services', context).once('servicePage').each(function (index, element) {
        var $element = $(element);

        var render = function render(elements) {
          var elementsNodes = Object.entries(elements.nodes).map(function (e) {
            return _defineProperty({}, e[0], e[1]);
          });
          var $tabContent1 = $('.tab-services-1', $element);
          var $tabContent2 = $('.tab-services-2', $element);
          var $tagsList1 = $('.tags-list1', $element);
          var $tagsList2 = $('.tags-list2', $element);
          var $highlighted1 = $('.highlighted', $tabContent1);
          var $list1 = $('.list', $tabContent1);
          var $highlighted2 = $('.highlighted', $tabContent2);
          var $list2 = $('.list', $tabContent2);
          var $searchFormTab1 = $('#search-form-tab-1');
          var $searchFormTab2 = $('#search-form-tab-2');
          var $searchInput1 = $('input', $searchFormTab1);
          var $searchInput2 = $('input', $searchFormTab2);
          var count1 = $('.count', $tabContent1);
          var count2 = $('.count', $tabContent2);
          var noData1 = $('.no-data', $tabContent1);
          var noData2 = $('.no-data', $tabContent2);
          var itemOfServices;
          var array1 = [];
          var array2 = [];
          var filtersTab1 = [];
          var filtersTab2 = [];
          var regEx = /[\.,:;+]/g;

          var checkLength = function checkLength(elem) {
            if (elem.children().length === 0 || elem.children().length === elem.children('.out').length) {
              elem.parent().css('display', 'none');
            } else {
              elem.parent().css('display', 'block');
            }
          };

          var selectedItems = drupalSettings.selected_services;
          var highlightedItems = drupalSettings.highlighted_services;
          var arrayOfIds = [];
          var arrayOfHighlighted = [];
          selectedItems.forEach(function (selectedItem) {
            arrayOfIds.push(selectedItem.target_id);
          });

          if (highlightedItems) {
            highlightedItems.forEach(function (highlightedItem) {
              arrayOfHighlighted.push(highlightedItem.target_id);
              arrayOfIds.push(highlightedItem.target_id);
            });
          }

          elementsNodes.forEach(function (item, i) {
            Object.keys(item).forEach(function (prop) {
              var tagsData = [];
              itemOfServices = {};
              itemOfServices.category = item[prop].category;
              itemOfServices.title = item[prop].name.trim();
              itemOfServices.tag = item[prop].sub_categories;
              itemOfServices.img = item[prop].picture;
              itemOfServices.description = item[prop].description;
              itemOfServices.highlighted = item[prop].highlighted;
              itemOfServices.link = item[prop].link;
              itemOfServices.id = item[prop].id;
              itemOfServices.share_block = item[prop].share_block;
              itemOfServices.external = item[prop].link.external;
              itemOfServices.tag.forEach(function (elem, inx) {
                tagsData.push(elem.replace(/\s/g, '-'));
              });
              itemOfServices.dataTags = tagsData;

              if (arrayOfIds.includes(itemOfServices.id) || arrayOfHighlighted.includes(itemOfServices.id)) {
                if (itemOfServices.category.includes('parents_and_students') && itemOfServices.category.includes('education_professionals')) {
                  array1.push(itemOfServices);
                  array2.push(itemOfServices);
                } else if (itemOfServices.category.includes('parents_and_students')) {
                  array1.push(itemOfServices);
                } else {
                  array2.push(itemOfServices);
                }
              }
            });
          });
          var sortedHighlightedItems = [];
          arrayOfHighlighted.forEach(function (itemId) {
            array1.forEach(function (arrItem) {
              if (itemId === arrItem.id) {
                sortedHighlightedItems.push(arrItem);
              }
            });
          });
          sortedHighlightedItems.forEach(function (item) {
            var descriptionClass = '';
            var itemDataDescription = item.description;
            var itemDataTitle = item.title;
            var itemDataTags = item.dataTags;

            if (itemDataDescription === '') {
              descriptionClass = 'no-description';
            }

            $("<article class=\"block-item ".concat(arrayOfIds.includes(item.id) ? 'not-hidden' : 'hidden', " ").concat(descriptionClass, "\" data-description=\"").concat(itemDataDescription, "\" data-title=\"").concat(itemDataTitle, "\" data-tag=\"").concat(itemDataTags.join(' '), "\">").concat(Drupal.theme('renderElements', item), "</article>")).appendTo($highlighted1);
          });
          array1.forEach(function (item, i) {
            var $item = item;
            var itemTag = $item.tag;
            var itemDataTags = $item.dataTags;
            var itemDataDescription = $item.description;
            var itemDataTitle = $item.title;
            var descriptionClass = '';
            filtersTab1.push(itemTag);

            if (itemDataDescription === '') {
              descriptionClass = 'no-description';
            } // $(`<article class="block-item ${ arrayOfIds.includes($item.id) ? 'not-hidden' : 'hidden'} ${descriptionClass}" data-description="${itemDataDescription}" data-title="${itemDataTitle}" data-tag="${itemDataTags.join(' ')}">${Drupal.theme('renderElements', $item)}</article>`).appendTo($list1);
            //
            // if ($item.highlighted === '1' && arrayOfIds.includes($item.id)) {
            //   $(`<article class="block-item ${ arrayOfIds.includes($item.id) ? 'not-hidden' : 'hidden'} ${descriptionClass}" data-description="${itemDataDescription}" data-title="${itemDataTitle}" data-tag="${itemDataTags.join(' ')}">${Drupal.theme('renderElements', $item)}</article>`).appendTo($highlighted1);
            // }


            $("<article class=\"block-item ".concat(arrayOfIds.includes($item.id) ? 'not-hidden' : 'hidden', " ").concat(descriptionClass, "\" data-description=\"").concat(itemDataDescription, "\" data-title=\"").concat(itemDataTitle, "\" data-tag=\"").concat(itemDataTags.join(' '), "\">").concat(Drupal.theme('renderElements', $item), "</article>")).appendTo($list1); //
            // if (arrayOfHighlighted.length) {
            //   if (arrayOfHighlighted.includes($item.id)) {
            //     $(`<article class="block-item ${ arrayOfIds.includes($item.id) ? 'not-hidden' : 'hidden'} ${descriptionClass}" data-description="${itemDataDescription}" data-title="${itemDataTitle}" data-tag="${itemDataTags.join(' ')}">${Drupal.theme('renderElements', $item)}</article>`).appendTo($highlighted1);
            //   }
            // }
          });
          var sortedHighlightedItems2 = [];
          arrayOfHighlighted.forEach(function (itemId) {
            array2.forEach(function (arrItem) {
              if (itemId === arrItem.id) {
                sortedHighlightedItems2.push(arrItem);
              }
            });
          });
          sortedHighlightedItems2.forEach(function (item) {
            var descriptionClass = '';
            var itemDataDescription = item.description;
            var itemDataTitle = item.title;
            var itemDataTags = item.dataTags;

            if (itemDataDescription === '') {
              descriptionClass = 'no-description';
            }

            $("<article class=\"block-item ".concat(arrayOfIds.includes(item.id) ? 'not-hidden' : 'hidden', " ").concat(descriptionClass, "\" data-description=\"").concat(itemDataDescription, "\" data-title=\"").concat(itemDataTitle, "\" data-tag=\"").concat(itemDataTags.join(' '), "\">").concat(Drupal.theme('renderElements', item), "</article>")).appendTo($highlighted2);
          });
          array2.forEach(function (item, i) {
            var $item = item;
            var itemTag = $item.tag;
            var itemDataTags = $item.dataTags;
            var itemDataDescription = $item.description;
            var itemDataTitle = $item.title;
            var descriptionClass = '';
            filtersTab2.push(itemTag);

            if (itemDataDescription === '') {
              descriptionClass = 'no-description';
            }

            $("<article class=\"block-item ".concat(arrayOfIds.includes($item.id) ? 'not-hidden' : 'hidden', " ").concat(descriptionClass, "\" data-description=\"").concat(itemDataDescription, "\" data-title=\"").concat(itemDataTitle, "\" data-tag=\"").concat(itemDataTags.join(' '), "\">").concat(Drupal.theme('renderElements', $item), "</article>")).appendTo($list2); //
            // if (arrayOfHighlighted.length) {
            //   if (arrayOfHighlighted.includes($item.id)) {
            //     $(`<article class="block-item ${arrayOfIds.includes($item.id) ? 'not-hidden' : 'hidden'} ${descriptionClass}" data-description="${itemDataDescription}" data-title="${itemDataTitle}" data-tag="${itemDataTags.join(' ')}">${Drupal.theme('renderElements', $item)}</article>`).appendTo($highlighted2);
            //   }
            // }
          });
          filtersTab1 = filtersTab1.reduce(function (a, b) {
            return a.concat(b);
          }, []);
          filtersTab1 = filtersTab1.filter(function (item, pos) {
            return filtersTab1.indexOf(item) === pos;
          });
          filtersTab2 = filtersTab2.reduce(function (a, b) {
            return a.concat(b);
          }, []);
          filtersTab2 = filtersTab2.filter(function (item, pos) {
            return filtersTab2.indexOf(item) === pos;
          });
          filtersTab1.forEach(function (item, i) {
            var itemFilters = item;
            $("<li class=\"form-item form-item-checkbox\">".concat(Drupal.theme('renderFilters', itemFilters), "</li>")).appendTo($tagsList1);
          });
          filtersTab2.forEach(function (item, i) {
            var itemFilters = item;
            $("<li class=\"form-item form-item-checkbox\">".concat(Drupal.theme('renderFilters', itemFilters), "</li>")).appendTo($tagsList2);
          }); // Filters

          var $filtersTab1 = $('input[type="checkbox"]', $tagsList1);
          var $filteredResults1 = $('.block-item', $tabContent1);
          var $filtersTab2 = $('input[type="checkbox"]', $tagsList2);
          var $filteredResults2 = $('.block-item', $tabContent2);

          var filterFunc = function filterFunc() {
            var selectedFiltersTab1 = [];
            var selectedFiltersTab2 = [];
            $filtersTab1.filter(':checked').each(function (i, item) {
              selectedFiltersTab1.push(item.value);
            });
            $filtersTab2.filter(':checked').each(function (i, item) {
              selectedFiltersTab2.push(item.value);
            });
            $filteredResults1.each(function (i, item) {
              var $item = $(item);
              var $itemData = $item.data('tag').split(' ');
              var filteredData = $itemData.filter(function (elem) {
                return selectedFiltersTab1.includes(elem);
              });
              $item.addClass('active');

              if (filteredData.length > 0) {
                $item.show();
                count1.show();
                $item.removeClass('out').addClass('active');
              } else {
                $item.removeClass('active').addClass('out');
                setTimeout(function () {
                  $item.hide();

                  if (selectedFiltersTab1.length === 0) {
                    $filteredResults1.removeClass('out').addClass('active').show();
                    count1.hide();
                    checkLength($list1);
                    checkLength($highlighted1);
                  }
                }, 300);
              }

              setTimeout(function () {
                var num1 = $list1.children('.active.not-hidden').length; // + $highlighted1.children('.active.not-hidden').length;

                if (num1 > '1') {
                  count1.html("<span>".concat(num1, "</span><span>").concat(Drupal.t(' Results'), "</span>"));
                } else {
                  count1.html("<span>".concat(num1, "</span><span>").concat(Drupal.t(' Result'), "</span>"));
                }

                if (num1 === 0) {
                  noData1.addClass('is-active');
                  count1.hide();
                  $list1.parents('.list-wrapper').find('.sub-title').css('display', 'none');
                } else {
                  noData1.removeClass('is-active');
                  count1.show();
                  $list1.parents('.list-wrapper').find('.sub-title').css('display', 'block');
                }
              }, 300);
            });
            $filteredResults2.each(function (i, item) {
              var $item = $(item);
              var $itemData = $item.data('tag').split(' ');
              var filteredData = $itemData.filter(function (elem) {
                return selectedFiltersTab2.includes(elem);
              });
              $item.addClass('active');

              if (filteredData.length > 0) {
                $item.show();
                count2.show();
                $item.removeClass('out').addClass('active');
              } else {
                $item.removeClass('active').addClass('out');
                setTimeout(function () {
                  $item.hide();

                  if (selectedFiltersTab2.length === 0) {
                    $filteredResults2.removeClass('out').addClass('active').show();
                    count2.hide();
                    checkLength($list2);
                    checkLength($highlighted2);
                  }
                }, 300);
              }

              setTimeout(function () {
                var num2 = $list2.children('.active.not-hidden').length; // + $highlighted2.children('.active.not-hidden').length;

                if (num2 > '1') {
                  count2.html("<span>".concat(num2, "</span><span>").concat(Drupal.t(' Results'), "</span>"));
                } else {
                  count2.html("<span>".concat(num2, "</span><span>").concat(Drupal.t(' Result'), "</span>"));
                }

                if (num2 === 0) {
                  noData2.addClass('is-active');
                  count2.hide();
                  $list2.parents('.list-wrapper').find('.sub-title').css('display', 'none');
                } else {
                  noData2.removeClass('is-active');
                  count2.show();
                  $list2.parents('.list-wrapper').find('.sub-title').css('display', 'block');
                }
              }, 300);
            });
            checkLength($list1);
            checkLength($highlighted1);
            checkLength($list2);
            checkLength($highlighted2);
          };

          $searchFormTab1.submit(function (e) {
            e.preventDefault();
            var $searchInput = $('input', $searchFormTab1);
            var query = $searchInput.val().replaceAll(regEx, '').toLowerCase(); // const str = "CrÃ¨me BrulÃ©e";
            // console.log(query.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));

            query.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript

            var queryArr = query.split(' ');

            if (query.length <= 0) {
              return;
            }

            $filteredResults1.each(function (i, item) {
              var $item = $(item);
              var $itemDataTag = '';
              var $itemDataTitle = '';
              var $itemDataDescription = '';
              var totalWordsArray = [];

              if ($('input[type="checkbox"]:checked', $tagsList1).length > 0) {
                $item = $(item).not('.out');
              }

              if ($item.length > 0) {
                $itemDataTag = $item.data('tag').toLowerCase().split(' ');
                $itemDataTitle = $item.data('title').toLowerCase().replaceAll(regEx, '').split(' ').filter(function (el) {
                  return el !== '';
                });
                $itemDataDescription = $item.data('description').toLowerCase().split(' ');
                totalWordsArray = $itemDataTag.concat($itemDataTitle, $itemDataDescription);
              }

              var checkIfContain = function checkIfContain(stringsArray, string) {
                var flag = false;
                stringsArray.forEach(function (arElement) {
                  if (arElement.normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(string.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))) {
                    flag = true;
                  }
                });
                return flag;
              }; // AND statement START


              $item.removeClass('out').addClass('active');
              $item.show();

              for (var _i = 0; _i < queryArr.length; _i++) {
                if (queryArr[_i] !== '' && !checkIfContain(totalWordsArray, queryArr[_i])) {
                  $item.removeClass('active').addClass('out');
                  $item.hide();
                }
              } // AND statement END
              // OR statement start
              // $item.hide();
              // $item.removeClass('active').addClass('out');
              //
              // for (let i = 0; i < queryArr.length; i++) {
              //   if (queryArr[i] !== '' && checkIfContain(totalWordsArray, queryArr[i])) {
              //     $item.removeClass('out').addClass('active');
              //     $item.show();
              //   }
              // }
              // OR statement END

            });
            setTimeout(function () {
              var num1 = $list1.children('.active').length; // + $highlighted1.children('.active').length;

              if (num1 > '1') {
                count1.html("<span>".concat(num1, "</span><span>").concat(Drupal.t(' Results'), "</span>"));
              } else {
                count1.html("<span>".concat(num1, "</span><span>").concat(Drupal.t(' Result'), "</span>"));
              }

              if (num1 === 0) {
                noData1.addClass('is-active');
                count1.hide();
              } else {
                noData1.removeClass('is-active');
                count1.show();

                if ($highlighted1.children('.active').length) {
                  $highlighted1.children('.active').addClass('out');
                }

                checkLength($highlighted1);
              }
            }, 300); // $filtersTab1.on('change', filterFunc);

            checkLength($list1);
            checkLength($highlighted1);
          });
          $searchFormTab2.submit(function (e) {
            e.preventDefault();
            var $searchInput = $('input', $searchFormTab2);
            var query = $searchInput.val().replaceAll(regEx, '').toLowerCase();
            var queryArr = query.split(' ');

            if (query.length <= 0) {
              return;
            }

            $filteredResults2.each(function (i, item) {
              var $item = $(item);
              var $itemDataTag = '';
              var $itemDataTitle = '';
              var $itemDataDescription = '';
              var totalWordsArray = [];

              if ($('input[type="checkbox"]:checked', $tagsList2).length > 0) {
                $item = $(item).not('.out');
              }

              if ($item.length > 0) {
                $itemDataTag = $item.data('tag').toLowerCase().split(' ');
                $itemDataTitle = $item.data('title').toLowerCase().replaceAll(regEx, '').split(' ').filter(function (el) {
                  return el !== '';
                });
                $itemDataDescription = $item.data('description').toLowerCase().split(' ');
                totalWordsArray = $itemDataTag.concat($itemDataTitle, $itemDataDescription);
              }

              var checkIfContain = function checkIfContain(stringsArray, string) {
                var flag = false;
                stringsArray.forEach(function (arElement) {
                  if (arElement.normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(string.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))) {
                    flag = true;
                  }
                });
                return flag;
              }; // AND statement START


              $item.removeClass('out').addClass('active');
              $item.show();

              for (var _i2 = 0; _i2 < queryArr.length; _i2++) {
                if (queryArr[_i2] !== '' && !checkIfContain(totalWordsArray, queryArr[_i2])) {
                  $item.removeClass('active').addClass('out');
                  $item.hide();
                }
              } // AND statement END
              // OR statement START
              // $item.hide();
              // $item.removeClass('active').addClass('out');
              //
              // for (let i = 0; i < queryArr.length; i++) {
              //   if (queryArr[i] !== '' && checkIfContain(totalWordsArray, queryArr[i])) {
              //     $item.removeClass('out').addClass('active');
              //     $item.show();
              //   }
              // }
              //  OR statement END

            });
            setTimeout(function () {
              var num2 = $list2.children('.active').length; // + $highlighted2.children('.active').length;

              if (num2 > '1') {
                count2.html("<span>".concat(num2, "</span><span>").concat(Drupal.t(' Results'), "</span>"));
              } else {
                count2.html("<span>".concat(num2, "</span><span>").concat(Drupal.t(' Result'), "</span>"));
              }

              if (num2 === 0) {
                noData2.addClass('is-active');
                count2.hide();
              } else {
                noData2.removeClass('is-active');
                count2.show();

                if ($highlighted2.children('.active').length) {
                  $highlighted2.children('.active').addClass('out');
                }

                checkLength($highlighted2);
              }
            }, 300);
            checkLength($list2);
            checkLength($highlighted2);
          });

          var clearInput = function clearInput(e) {
            if (e.target.value.length === 0) {
              filterFunc();
            }
          }; // Popup


          var $trigger = $('.trigger-popup');
          var $closePopup = $('.close-popup');
          $trigger.click(function (e) {
            var $target = $(e.target);
            var $btnClosePopup = $target.parent().find('.close-popup');
            $target.attr('aria-expanded', 'true');
            $target.parent().addClass('is-active');
            $btnClosePopup.focus();
          });
          $closePopup.click(function (e) {
            var $target = $(e.target);
            var $triggerPopup = $target.parents('.block-item').find('.trigger-popup');
            $target.parents('.block-item').removeClass('is-active');
            $triggerPopup.attr('aria-expanded', 'false');
            $triggerPopup.focus();
          }); // Generate share popup

          var $blockItem = $('.block-item', $element);
          $blockItem.each(function (i, item) {
            var $item = $(item);
            var $box = $('.addthis-box', $item);
            var mode = $('html').hasClass('no-touchevents') ? 'desktop' : 'mobile';
            var data = drupalSettings.tandem_addthis.services;
            var $head = $('.item-header', $item);
            var $link = $('.share-popup-trigger', $item);
            var $closeButton = $('.share__items__close', $item);
            var popupSubtitleText = $head.find('.title').text().trim();
            var popupSubTitle = "<p class=\"subtitle\">".concat(popupSubtitleText, "</p>");
            var $sharePopup = $('.share__items');

            if (data === null || mode === null) {
              return;
            }

            var services = data[mode];

            for (var service in services) {
              if (services[service].service_name === 'Email') {
                $box.append('<button class="add-this-custom__email-button js-email-share" title="' + services[service].service_name + ' - ' + Drupal.t('new window') + '"></button>');
              } else {
                $box.append("<a class=\"addthis_button_".concat(service, "\" href=\"\" title=\"").concat(services[service].service_name, " - ").concat(Drupal.t('new window'), "\"></a>"));
              }
            }

            $box.before(popupSubTitle);
            $sharePopup.attr('aria-describedby', popupSubtitleText);
            $sharePopup.each(function () {
              var $name = $(_this).find('h1').text();
              $(_this).attr('name', $name);
            });
            $link.click(function (e) {
              e.preventDefault();
              $(document).find('.js-share.show-popup').removeClass('show-popup');
              $item.addClass('show-popup');
            });
            $closeButton.click(function () {
              $item.removeClass('show-popup');
              $link.focus();
            });
            $('body').click(function (e) {
              var $target = $(e.target);

              if (!$target.closest('.js-share').length) {
                $item.removeClass('show-popup');
              }
            });
            $(document).keyup(function (e) {
              if (e.key === 'Escape') {
                $('.js-share.show-popup > button').first().focus();
                $item.removeClass('show-popup');
              }
            });
            $(document).on('keydown', '.share__items a, .share__items button', function (e) {
              var code = e.keyCode || e.which;
              var $tabButton = code === 9;
              var $shiftButton = e.shiftKey;
              var $popupWrapper = $(e.target).closest('.share__items');
              var $openPopup = $item.hasClass('show-popup');
              var $links = $popupWrapper.find('a, button');

              if ($tabButton && $openPopup) {
                if (!$shiftButton && $(e.target)[0] === $links.last()[0]) {
                  e.preventDefault();
                  $popupWrapper.find('.share__items__close').focus();
                }

                if ($shiftButton && $(e.target)[0] === $links.first()[0]) {
                  e.preventDefault();
                  $popupWrapper.find('a:last-child').focus();
                }
              }
            });
          });
          $searchInput1.on('input', clearInput);
          $searchInput2.on('input', clearInput);
          $filtersTab1.on('change', filterFunc);
          $filtersTab2.on('change', filterFunc);
          checkLength($list1);
          checkLength($highlighted1);
          checkLength($list2);
          checkLength($highlighted2);
        };

        $.get('/api/v1/services-list').done(function (response) {
          render(response);
        }).fail(function (error) {
          throw new Error(error);
        });

        Drupal.theme.renderElements = function (itemOfServices) {
          var id = Math.random().toString(36).slice(-8);
          var output = '';
          var externalLink = itemOfServices.external ? 'target="_blank"' : '';

          if (itemOfServices.link !== undefined) {
            output += '<div class="item-header js-share">';
            output += "<h3 class=\"title\"><a class=\"js-services-title\" href=\"".concat(itemOfServices.link.uri, "\" ").concat(externalLink, " title=\"").concat(itemOfServices.link.title, " ").concat(externalLink ? '- nouvelle fenÃªtre' : '', "\" aria-label=\"").concat(itemOfServices.title, "\">").concat(itemOfServices.title, "</a></h3>");
            output += "<button class=\"share-popup-trigger\" type=\"button\" aria-label=\"".concat(Drupal.t('Share service'), "\">");
            output += '<span class="share__popup__arrow"></span>';
            output += '</button>';
            output += "<div class=\"share__items\" role=\"dialog\" aria-labelledby=\"".concat(Drupal.t('Share this service'), "\">");
            output += "<button type=\"button\" role=\"button\" name=\"".concat(Drupal.t('Close popup'), "\" aria-label=\"").concat(Drupal.t('Close popup'), "\" class=\"share__items__close\"></button>");
            output += "".concat(itemOfServices.share_block);
            output += '</div>';
            output += '</div>';
          } else {
            output += "<h3 class=\"title\">".concat(itemOfServices.title, "</h3>");
          }

          output += '<div class="tags">';
          itemOfServices.tag.forEach(function (item, i) {
            output += "<span class=\"tag\">".concat(item, "</span>");
          });
          output += '</div>';

          if (itemOfServices.img !== undefined) {
            output += '<div class="image">';
            output += '<picture>';

            if (itemOfServices.link !== undefined) {
              output += "<a class=\"js-services-title\" href=\"".concat(itemOfServices.link.uri, "\" ").concat(externalLink, " title=\"").concat(itemOfServices.link.title, " ").concat(externalLink ? '- nouvelle fenÃªtre' : '', "\" aria-label=\"").concat(itemOfServices.title, "\"><img src=\"").concat(itemOfServices.img[0].url, "\" alt=\"").concat(itemOfServices.img[0].alt, "\" title=\"").concat(itemOfServices.img[0].title, "\"/></a>");
            } else {
              output += "<img src=\"".concat(itemOfServices.img[0].url, "\" alt=\"").concat(itemOfServices.img[0].alt, "\" title=\"").concat(itemOfServices.img[0].title, "\"/>");
            }

            output += '</picture>';
            output += '</div>';
          } else if (itemOfServices.link !== undefined) {
            output += '<div class="image no-image">';
            output += "<span class=\"js-services-title\"\n                        title=\"".concat(itemOfServices.link.title, "\"></span>");
            output += '</div>';
          }

          if (itemOfServices.description !== '') {
            output += "<p class=\"description\">".concat(itemOfServices.description, "</p>");
          }

          output += "<button class=\"trigger-popup\" aria-expanded=\"false\" aria-haspopup=\"true\" aria-control=\"".concat(id, "\">").concat(Drupal.t('Read more'), "</button>");
          output += "<div class=\"item-popup\" id=\"".concat(id, "\">");
          output += '<div class="item-popup-header">';
          output += "<button class=\"close-popup\">".concat(Drupal.t('Close'), "</button>");

          if (itemOfServices.link !== undefined) {
            output += "<h3 class=\"title\"><a class=\"js-services-title\" href=\"".concat(itemOfServices.link.uri, "\" ").concat(externalLink, " title=\"").concat(itemOfServices.link.title, " ").concat(externalLink ? '- nouvelle fenÃªtre' : '', "\" aria-label=\"").concat(itemOfServices.title, "\">").concat(itemOfServices.title, "</a></h3>");
          } else {
            output += "<h3 class=\"title\">".concat(itemOfServices.title, "</h3>");
          }

          output += '</div>';
          output += '<div class="tags">';
          itemOfServices.tag.forEach(function (item, i) {
            output += "<span class=\"tag\">".concat(item, "</span>");
          });
          output += '</div>';

          if (itemOfServices.description !== '') {
            output += "<p class=\"description\">".concat(itemOfServices.description, "</p>");
          }

          output += '</div>';
          output += '<div class="link-wrapper">';

          if (itemOfServices.link !== undefined) {
            output += "<a href=\"".concat(itemOfServices.link.uri, "\" title=\"").concat(itemOfServices.link.title, " ").concat(externalLink ? '- nouvelle fenÃªtre' : '', "\" class=\"link js-services-title\" ").concat(externalLink, " aria-label=\"").concat(itemOfServices.title, "\">").concat(itemOfServices.title, "</a>");
          }

          output += '</div>';
          return output;
        };

        Drupal.theme.renderFilters = function (itemFilters) {
          var output = '';
          var value = itemFilters.replace(/\s/g, '-');
          var valueClear = value.replace('<span>', '').replace('</span>', '');
          output += "<label><input type=\"checkbox\" aria-label=\"".concat(valueClear, "\" value=\"").concat(value, "\" name=\"").concat(value, "\"></input>");
          output += "".concat(itemFilters, "</label>");
          return output;
        };
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
   * Create styleguide accordeon.
   */
  Drupal.behaviors.edugouvStyleguideAccordeon = {
    attach: function attach(context) {
      $('.styleguide-accordeon-item', context).once('edugouvStyleguideAccordeon').each(function (index, element) {
        var $this = $(element);
        var $accordeonTrigger = $('.styleguide-title', $this);
        var $accordeonContent = $('.styleguide-content', $this);
        $accordeonTrigger.click(function (e) {
          e.preventDefault();
          $(e.target).toggleClass('active');

          if ($(e.target).hasClass('active')) {
            $accordeonContent.slideDown();
          } else {
            $accordeonContent.slideUp();
          }

          $('.js-vertical-masonry').isotope();
          $('.js-gallery').isotope();
          $('.js-publication-slider').slick('setPosition');
        });
        setTimeout(function () {
          $accordeonContent.slideUp();
        }, 1);
      });
    }
  };
})(jQuery, Drupal);
"use strict";

(function ($, Drupal) {
  /**
   * Create sticky header.
   */
  Drupal.behaviors.edugouvStickyHeader = {
    attach: function attach(context) {
      $('.js-header', context).once('edugouvStickyHeader').each(function (index, element) {
        var $this = $(element);
        var $headerOffset = $this.offset().top;
        var $window = $(window);
        var miniSiteMenuOuter = document.querySelector('.mini-site-menu-outer');
        var miniSiteMenu = document.querySelector('.mini-site-menu-wrapper');
        var crisisMessage = document.querySelector('.back-office-message-tab');
        var summaryBlock = document.querySelector('.js-edugouv-progress-bar');
        var totalHeight = 0;
        var gap = 5;
        var headerHeight = 100;
        var toolbarTop = document.querySelector('#toolbar-bar');
        var toolbarBot = document.querySelector('.toolbar-tray-horizontal.is-active');
        var toolbarBotHeight = toolbarBot ? toolbarBot.offsetHeight : 0;
        var crisisMessageHeight = crisisMessage ? crisisMessage.offsetHeight : 0;

        function getTotalHeight() {
          if (toolbarTop) {
            // eslint-disable-next-line max-len
            totalHeight = toolbarTop.offsetHeight + toolbarBotHeight + headerHeight + crisisMessageHeight;
          } else {
            totalHeight = headerHeight + crisisMessageHeight;
          }
        }

        var checkMiniMenuPosition = function checkMiniMenuPosition() {
          // eslint-disable-next-line max-len
          if ($window.scrollTop() > 0 && totalHeight >= miniSiteMenuOuter.getBoundingClientRect().top) {
            miniSiteMenuOuter.classList.add('fixed');
            miniSiteMenuOuter.style.height = "".concat(miniSiteMenu.offsetHeight + gap, "px");
            miniSiteMenu.style.top = "".concat(totalHeight, "px");
          } else {
            miniSiteMenuOuter.classList.remove('fixed');
            miniSiteMenuOuter.style.height = '';
          }
        };

        function checkSummaryPosition() {
          summaryBlock.style.top = "".concat(totalHeight + miniSiteMenuOuter.offsetHeight - gap, "px");
        }

        $window.scroll(function () {
          headerHeight = element.offsetHeight;
          getTotalHeight();

          if (summaryBlock && miniSiteMenuOuter) {
            checkSummaryPosition();
          }

          if ($window.scrollTop() > $headerOffset) {
            $this.addClass('fixed');
          } else {
            $this.removeClass('fixed');

            if ($(window).width() >= 1024) {
              if ($('.js-menu-toggle.is-mini-menu').hasClass('is-active')) {
                $('.page-wrapper').css('marginTop', '');
              } else if ($('.mini-site-menu').length) {
                $('.page-wrapper').css('marginTop', "-".concat(60, "px"));
              }
            }
          }

          if (miniSiteMenuOuter && $(element).hasClass('fixed')) {
            checkMiniMenuPosition();
          }
        });
        var sumBlockHeight = 0;

        if ($(window).width() >= 768) {
          sumBlockHeight = 0;
        } else {
          sumBlockHeight = summaryBlock ? summaryBlock.offsetHeight : 0;
        }

        $(document).ready(function () {
          setTimeout(function () {
            var urlHash = window.location.href.split('#')[1];
            var item = $("#".concat(urlHash));
            var miniMenuHeight = miniSiteMenuOuter ? miniSiteMenuOuter.offsetHeight : 0;

            if (urlHash && item.length) {
              $('html,body').animate({
                scrollTop: item.offset().top - (totalHeight + miniMenuHeight + sumBlockHeight + 20)
              }, 1000);
            }
          }, 500);
        });
        getTotalHeight();
        var richMedia = $('.rich-media.ckeditor-text');

        if (richMedia.parents('.container').length) {
          richMedia.addClass('no-margin');
        }
      });
    }
  };
  Drupal.behaviors.insertQuickLinksToMenu = {
    attach: function attach(context) {
      var _this = this;

      $('.js-header', context).once('insertQuickLinksToMenu').each(function (index, element) {
        var mainMenu = $(element).find('.main-menu');
        var quickMenuList = $(element).find('.quick-links__list');
        var closeButton = '<li class="quick-menu__back"><button  class="quick-menu__back-button" type="button"></button></li>';
        var closeButtonMain = "<li class=\"quick-menu__back\"><button  class=\"quick-menu__back-button\" type=\"button\">".concat(Drupal.t('Back to the portal'), "</button></li>");
        quickMenuList.prepend(closeButtonMain);
        $('.quick-links__list ul').prepend(closeButton);
        var miniSiteMenu = $('.mini-site-menu');
        var quickMenuEmpty = $('.header-quick-links');
        var quickLinksInside = $('.quick-links__inside');
        var quickLinksInsideItems = $('.quick-links__inside > li');
        quickLinksInsideItems.each(function (i, item) {
          if (!$(item).children('ul').length) {
            return;
          }

          $('<button class="quick-menu__link-button"></button>').insertAfter($(item).children('a'));
        });
        $('<button class="quick-menu__link-button"></button>').insertAfter(quickLinksInside.siblings('a'));
        quickLinksInside.parent().addClass('quick-menu__appended');
        $(document).on('click', '.js-menu-toggle', function () {
          mainMenu.find('li').removeClass('active');
        });
        $('.quick-menu__appended .quick-menu__back-button').each(function (btnIndex, btnElement) {
          var parentList = $(btnElement).closest('ul');
          var callLink = parentList.closest('li');
          $(btnElement).text(callLink.children('a').text());
        });

        if (miniSiteMenu.length) {
          $('.js-menu-toggle').addClass('is-mini-menu');
          var MENU_HEIGHT = 55;

          if (!$('.header-quick-links ul').length) {
            quickMenuEmpty.append("<ul>".concat(closeButton, "</ul>")).addClass('is-empty');
          }

          if ($(window).width() >= 1024) {
            $('.page-wrapper').css('marginTop', "-".concat(MENU_HEIGHT, "px"));
          } else {
            $('.page-wrapper').css('marginTop', '');
          }

          $(document).on('click', '.js-menu-toggle.is-mini-menu', function () {
            if ($(window).width() < 1024) {
              var pathName = window.location.pathname;
              var locationLink = $('.header-quick-links').find("a[href=\"".concat($.trim(pathName), "\"]"));
              locationLink.parents('li.quick-menu__appended').addClass('active');
              $('.header-quick-links').addClass('active');
            } else if ($('.js-header').hasClass('fixed')) {
              return;
            }

            if ($(_this).hasClass('is-active')) {
              $('.page-wrapper').css('marginTop', '');
            } else if ($(window).width() < 1024) {
              $('.page-wrapper').css('marginTop', '');
            } else {
              $('.page-wrapper').css('marginTop', "-".concat(MENU_HEIGHT, "px"));
            }
          });

          var checkUserLocation = function checkUserLocation() {
            var pathName = window.location.pathname;
            var locationLink = $('.mini-site-menu__list').find("a[href=\"".concat($.trim(pathName), "\"]"));

            if (locationLink.length) {
              locationLink.parents('li:last').addClass('link-highlighted');
            }
          };

          checkUserLocation();
        } else {
          if (!$('.header-quick-links ul').length) {
            quickMenuEmpty.addClass('is-empty is-empty--full');
          }

          $('.js-menu-toggle').addClass('no-mini-menu');

          if ($(window).width() >= 1024) {
            $('html').addClass('menu-open');
          }
        }

        $(document).on('keydown', '.js-menu-toggle.is-active', function (event) {
          var keyCode = event.keyCode || event.charCode;

          if (keyCode === 9) {
            $('.main-menu li:first span').focus();
          }
        });
        $(document).on('click', '.quick-menu__back-button', function (event) {
          var parentUl = event.target.closest('ul');
          parentUl.closest('li').classList.remove('active');
        });
        $(document).on('click', '.quick-menu__link, .quick-menu__link-button', function (event) {
          event.preventDefault();
          var link = event.target;
          var linkParent = link.closest('li');

          if (linkParent.classList.contains('active')) {
            linkParent.classList.remove('active');
            link.classList.remove('active');
          } else {
            linkParent.classList.add('active');
            link.classList.add('active');
          }

          $(document).on('click', function (ev) {
            if ($(window).width() < 1024) {
              return;
            }

            if (!ev.target.closest('.header-quick-links')) {
              linkParent.classList.remove('active');
              link.classList.remove('active');
            }
          });
        });
      });
    }
  };
  Drupal.behaviors.checkUserCurrentLocation = {
    attach: function attach(context) {
      $('.main-menu', context).once('checkUserCurrentLocation').each(function (index, element) {
        var pathName = window.location.pathname;
        var locationLink = $(element).find("a[href=\"".concat($.trim(pathName), "\"]"));
        locationLink.parents('li:last').children('span, a').addClass('is-active');
      });
    }
  };
  Drupal.behaviors.showMiniSiteMenuOnFocus = {
    attach: function attach(context) {
      $('.mini-site-menu', context).once('showMiniSiteMenuOnFocus').each(function (index, element) {
        var menuElements = $('.mini-site-menu__list > li', $(element));
        menuElements.each(function (i, el) {
          $(el).children('span').attr('tabindex', 0);
          $(el).on('keyup', function (e) {
            if ($(e.target).closest('.show-low-menu').length <= 0) {
              $(element).find('.mini-site-menu__list > li').removeClass('show-low-menu');
            }

            $(el).addClass('show-low-menu');
          });
          $(document).on('keyup', function (event) {
            var keyCode = event.keyCode || event.charCode;

            if (keyCode === 9 && $(event.target).closest('.show-low-menu').length <= 0) {
              $(element).find('.mini-site-menu__list > li').removeClass('show-low-menu');
            }
          });
        });
      });
    }
  };
  Drupal.behaviors.customEmailSharing = {
    attach: function attach(context) {
      $('.page-wrapper', context).once('customEmailSharing').each(function (index, element) {
        function closePopup(startLocation, form, popupBox) {
          startLocation.append(form);
          popupBox.remove();
        }

        function createEmailSharePopup(block) {
          var form = block.querySelector('form');
          var startLocation = block.querySelector('.forward');
          var popupBox = document.createElement('div');
          var popupBack = document.createElement('div');
          var popupContainer = document.createElement('div');
          var popupCloseButton = document.createElement('button');
          var shareButton = document.querySelector('.js-share');
          popupCloseButton.classList.add('add-this-custom__close');
          popupCloseButton.setAttribute('title', Drupal.t('Fermer le popup'));
          popupBox.classList.add('add-this-custom__pop-box');
          popupBack.classList.add('add-this-custom__pop-back');
          popupContainer.classList.add('add-this-custom__pop-container');
          popupBack.addEventListener('click', function () {
            return closePopup(startLocation, form, popupBox);
          });
          popupCloseButton.addEventListener('click', function () {
            closePopup(startLocation, form, popupBox);
            shareButton.querySelectorAll('button')[0].focus();
          });
          popupContainer.append(form);
          popupContainer.prepend(popupCloseButton);
          popupBox.append(popupContainer);
          popupBox.append(popupBack);
          document.querySelector('#main-content').prepend(popupBox);
          popupBox.querySelector('details').setAttribute('open', 'true');
          shareButton.classList.remove('show-popup');
          var formInputs = popupContainer.querySelectorAll('input');
          formInputs[0].focus();
          popupContainer.querySelector('.js-form-submit').addEventListener('keydown', function (event) {
            if (event.shiftKey && event.key === 'Tab') {
              formInputs[formInputs.length - 1].focus();
            } else if (event.key === 'Tab') {
              setTimeout(function () {
                popupCloseButton.focus();
              });
            }
          });
          popupCloseButton.addEventListener('keydown', function (event) {
            if (event.shiftKey && event.key === 'Tab') {
              setTimeout(function () {
                popupContainer.querySelector('.js-form-submit').focus();
              });
            }
          });
          popupBox.addEventListener('keyup', function (event) {
            var code = event.key;

            if (popupBox && code === 'Escape') {
              closePopup(startLocation, form, popupBox);
              shareButton.querySelectorAll('button')[0].focus();
            }
          });
        }

        $(document).ready(function () {
          setTimeout(function () {
            document.addEventListener('click', function (e) {
              if (e.target.classList.contains('js-email-share')) {
                createEmailSharePopup(e.target.closest('.share_addthis_actions'));
              }
            });
          }, 1000);
        });
      });
    }
  };
  Drupal.behaviors.isWindowNew = {
    attach: function attach(context) {
      $('[data-history-button]', context).once('isWindowNew').each(function (index, element) {
        if (window.history.length < 2) {
          element.classList.add('hidden');
        }
      });
    }
  };
  Drupal.behaviors.anchorScroll = {
    attach: function attach(context) {
      $('body', context).once('anchorScroll').each(function () {
        $('a[href^="#"]:not([href*="tarteaucitron"])').click(function (event) {
          event.preventDefault();
          var GAP = 20; // Get header height if it exists

          var headerHeight = function headerHeight() {
            var header = $('.js-header');
            return header.length ? header.outerHeight() : 0;
          }; // Get adminToolbar height if it exists


          var adminPanelHeight = function adminPanelHeight() {
            var adminToolbar = $('#toolbar-bar');
            var adminToolbarTray = $('[id^="toolbar-item"].is-active');

            if (adminToolbar.length && adminToolbarTray.length) {
              return adminToolbar.outerHeight() + adminToolbarTray.outerHeight();
            }

            if (adminToolbar.length && !adminToolbarTray.length) {
              return adminToolbar.outerHeight();
            }

            return 0;
          };

          var elem = event.target;

          if (event.target.tagName !== 'A') {
            elem = event.target.closest('a');
          }

          if (!elem) return;
          setTimeout(function () {
            $('html, body').animate({
              scrollTop: $(elem.getAttribute('href')).offset().top - (headerHeight() + adminPanelHeight() + GAP)
            }, 1000);
          }, 10);
        });
      });
    }
  };
})(jQuery, Drupal);

;
/*jslint browser: true, evil: true */

var scripts = document.getElementsByTagName('script'),
    path = scripts[scripts.length - 1].src.split('?')[0],
    tarteaucitronForceCDN = (tarteaucitronForceCDN === undefined) ? '' : tarteaucitronForceCDN,
    cdn = (tarteaucitronForceCDN === '') ? path.split('/').slice(0, -1).join('/') + '/' : tarteaucitronForceCDN,
    alreadyLaunch = (alreadyLaunch === undefined) ? 0 : alreadyLaunch,
    tarteaucitronForceLanguage = (tarteaucitronForceLanguage === undefined) ? '' : tarteaucitronForceLanguage,
    tarteaucitronForceExpire = (tarteaucitronForceExpire === undefined) ? '' : tarteaucitronForceExpire,
    tarteaucitronCustomText = (tarteaucitronCustomText === undefined) ? '' : tarteaucitronCustomText,
    // tarteaucitronExpireInDay: true for day(s) value - false for hour(s) value
    tarteaucitronExpireInDay = (tarteaucitronExpireInDay === undefined || typeof tarteaucitronExpireInDay !== "boolean") ? true : tarteaucitronExpireInDay,
    timeExpire = 31536000000,
    tarteaucitronProLoadServices,
    tarteaucitronNoAdBlocker = false;



var tarteaucitron = {
    "version": 20220322,
    "cdn": cdn,
    "user": {},
    "lang": {},
    "services": {},
    "added": [],
    "idprocessed": [],
    "state": [],
    "launch": [],
    "parameters": {},
    "isAjax": false,
    "reloadThePage": false,
    "events": {
        "init": function () {},
        "load": function () {},
    },
    "init": function (params) {
        "use strict";
        var origOpen;

        tarteaucitron.parameters = params;
        if (alreadyLaunch === 0) {
            alreadyLaunch = 1;
            if (window.addEventListener) {
                window.addEventListener("load", function () {
                    tarteaucitron.initEvents.loadEvent(false);
                }, false);
                window.addEventListener("scroll", function () {
                    tarteaucitron.initEvents.scrollEvent();
                }, false);

                window.addEventListener("keydown", function (evt) {
                    tarteaucitron.initEvents.keydownEvent(false, evt);
                }, false);
                window.addEventListener("hashchange", function () {
                    tarteaucitron.initEvents.hashchangeEvent();
                }, false);
                window.addEventListener("resize", function () {
                    tarteaucitron.initEvents.resizeEvent();
                }, false);
            } else {
                window.attachEvent("onload", function () {
                    tarteaucitron.initEvents.loadEvent(true);
                });
                window.attachEvent("onscroll", function () {
                    tarteaucitron.initEvents.scrollEvent();
                });
                window.attachEvent("onkeydown", function (evt) {
                    tarteaucitron.initEvents.keydownEvent(true, evt);

                });
                window.attachEvent("onhashchange", function () {
                    tarteaucitron.initEvents.hashchangeEvent();
                });
                window.attachEvent("onresize", function () {
                    tarteaucitron.initEvents.resizeEvent();
                });
            }

            if (typeof XMLHttpRequest !== 'undefined') {
                origOpen = XMLHttpRequest.prototype.open;
                XMLHttpRequest.prototype.open = function () {

                    if (window.addEventListener) {
                        this.addEventListener("load", function () {
                            if (typeof tarteaucitronProLoadServices === 'function') {
                                tarteaucitronProLoadServices();
                            }
                        }, false);
                    } else if (typeof this.attachEvent !== 'undefined') {
                        this.attachEvent("onload", function () {
                            if (typeof tarteaucitronProLoadServices === 'function') {
                                tarteaucitronProLoadServices();
                            }
                        });
                    } else {
                        if (typeof tarteaucitronProLoadServices === 'function') {
                            setTimeout(tarteaucitronProLoadServices, 1000);
                        }
                    }

                    try {
                        origOpen.apply(this, arguments);
                    } catch (err) {}
                };
            }
        }

        if(tarteaucitron.events.init) {
            tarteaucitron.events.init();
        }
    },
    "initEvents": {
        "loadEvent": function (isOldBrowser) {
            tarteaucitron.load();
            tarteaucitron.fallback(['tarteaucitronOpenPanel'], function (elem) {
                if (isOldBrowser) {
                    elem.attachEvent("onclick", function (event) {
                        tarteaucitron.userInterface.openPanel();
                        event.preventDefault();
                    });
                } else {
                    elem.addEventListener("click", function (event) {
                        tarteaucitron.userInterface.openPanel();
                        event.preventDefault();
                    }, false);
                }
            }, true);
        },
        "keydownEvent": function (isOldBrowser, evt) {
            if (evt.keyCode === 27) {
                tarteaucitron.userInterface.closePanel();
            }

            if (isOldBrowser) {
                if ( evt.keyCode === 9 && focusableEls.indexOf(evt.target) >= 0) {
                    if ( evt.shiftKey ) /* shift + tab */ {
                        if (document.activeElement === firstFocusableEl) {
                            lastFocusableEl.focus();
                            evt.preventDefault();
                        }
                    } else /* tab */ {
                        if (document.activeElement === lastFocusableEl) {
                            firstFocusableEl.focus();
                            evt.preventDefault();
                        }
                    }
                }
            }
        },
        "hashchangeEvent": function () {
            if (document.location.hash === tarteaucitron.hashtag && tarteaucitron.hashtag !== '') {
                tarteaucitron.userInterface.openPanel();
            }
        },
        "resizeEvent": function () {
            var tacElem = document.getElementById('tarteaucitron');
            var tacCookieContainer = document.getElementById('tarteaucitronCookiesListContainer');

            if (tacElem && tacElem.style.display === 'block') {
                tarteaucitron.userInterface.jsSizing('main');
            }

            if (tacCookieContainer && tacCookieContainer.style.display === 'block') {
                tarteaucitron.userInterface.jsSizing('cookie');
            }
        },
        "scrollEvent": function () {
            var scrollPos = window.pageYOffset || document.documentElement.scrollTop;
            var heightPosition;
            var tacPercentage = document.getElementById('tarteaucitronPercentage');
            var tacAlertBig = document.getElementById('tarteaucitronAlertBig');

            if (tacAlertBig && !tarteaucitron.highPrivacy) {
                if (tacAlertBig.style.display === 'block') {
                    heightPosition = tacAlertBig.offsetHeight + 'px';

                    if (scrollPos > (screen.height * 2)) {
                        tarteaucitron.userInterface.respondAll(true);
                    } else if (scrollPos > (screen.height / 2)) {
                        document.getElementById('tarteaucitronDisclaimerAlert').innerHTML = '<strong>' + tarteaucitron.lang.alertBigScroll + '</strong> ' + tarteaucitron.lang.alertBig;
                    }

                    if (tacPercentage) {
                        if (tarteaucitron.orientation === 'top') {
                            tacPercentage.style.top = heightPosition;
                        } else {
                            tacPercentage.style.bottom = heightPosition;
                        }
                        tacPercentage.style.width = ((100 / (screen.height * 2)) * scrollPos) + '%';
                    }
                }
            }
        },
    },
    "load": function () {
        "use strict";
        var cdn = tarteaucitron.cdn,
            language = tarteaucitron.getLanguage(),
            useJSDelivrMinifiedJS = (cdn.indexOf('cdn.jsdelivr.net') >= 0),
            pathToLang = cdn + 'lang/tarteaucitron.' + language + (useJSDelivrMinifiedJS ? '.min' : '') + '.js?v=' + tarteaucitron.version,
            pathToServices = cdn + 'tarteaucitron.services' + (useJSDelivrMinifiedJS ? '.min' : '') + '.js?v=' + tarteaucitron.version,
            linkElement = document.createElement('link'),
            defaults = {
                "adblocker": false,
                "hashtag": '#tarteaucitron',
                "cookieName": 'tarteaucitron',
                "highPrivacy": true,
                "orientation": "middle",
                "bodyPosition": "bottom",
                "removeCredit": false,
                "showAlertSmall": false,
                "showIcon": true,
                "iconPosition": "BottomRight",
                "cookieslist": false,
                "handleBrowserDNTRequest": false,
                "DenyAllCta": true,
                "AcceptAllCta" : true,
                "moreInfoLink": true,
                "privacyUrl": "",
                "useExternalCss": false,
                "useExternalJs": false,
                "mandatory": true,
                "mandatoryCta": true,
                "closePopup": false,
                "groupServices": false,
                "serviceDefaultState": 'wait',
            },
            params = tarteaucitron.parameters;

        // Don't show the middle bar if we are on the privacy policy or more page
        if (((tarteaucitron.parameters.readmoreLink !== undefined && window.location.href == tarteaucitron.parameters.readmoreLink) || window.location.href == tarteaucitron.parameters.privacyUrl) && tarteaucitron.parameters.orientation == "middle") {
            tarteaucitron.parameters.orientation = "bottom";
        }

        // Step -1
        if (typeof tarteaucitronCustomPremium !== 'undefined') {
            tarteaucitronCustomPremium();
        }

        // Step 0: get params
        if (params !== undefined) {

            for (var k in defaults) {
                if(!tarteaucitron.parameters.hasOwnProperty(k)) {
                    tarteaucitron.parameters[k] = defaults[k];
                }
            }
        }

        // global
        tarteaucitron.orientation = tarteaucitron.parameters.orientation;
        tarteaucitron.hashtag = tarteaucitron.parameters.hashtag;
        tarteaucitron.highPrivacy = tarteaucitron.parameters.highPrivacy;
        tarteaucitron.handleBrowserDNTRequest = tarteaucitron.parameters.handleBrowserDNTRequest;
        tarteaucitron.customCloserId = tarteaucitron.parameters.customCloserId;

        // Step 1: load css
        if ( !tarteaucitron.parameters.useExternalCss ) {
            linkElement.rel = 'stylesheet';
            linkElement.type = 'text/css';
            linkElement.href = cdn + 'css/tarteaucitron' + (useJSDelivrMinifiedJS ? '.min' : '') + '.css?v=' + tarteaucitron.version;
            document.getElementsByTagName('head')[0].appendChild(linkElement);
        }
        // Step 2: load language and services
        tarteaucitron.addInternalScript(pathToLang, '', function () {

          if(tarteaucitronCustomText !== ''){
            tarteaucitron.lang = tarteaucitron.AddOrUpdate(tarteaucitron.lang, tarteaucitronCustomText);
          }
            tarteaucitron.addInternalScript(pathToServices, '', function () {

                // css for the middle bar TODO: add it on the css file
                if (tarteaucitron.orientation === 'middle') {
                    var customThemeMiddle = document.createElement('style'),
                        cssRuleMiddle = 'div#tarteaucitronRoot.tarteaucitronBeforeVisible:before {content: \'\';position: fixed;width: 100%;height: 100%;background: white;top: 0;left: 0;z-index: 999;opacity: 0.5;}div#tarteaucitronAlertBig:before {content: \'' + tarteaucitron.lang.middleBarHead + '\';font-size: 35px;}body #tarteaucitronRoot div#tarteaucitronAlertBig {width: 60%;min-width: 285px;height: auto;margin: auto;left: 50%;top: 50%;transform: translate(-50%, -50%);box-shadow: 0 0 9000px #000;border-radius: 20px;padding: 35px 25px;}span#tarteaucitronDisclaimerAlert {padding: 0 30px;}#tarteaucitronRoot span#tarteaucitronDisclaimerAlert {margin: 10px 0 30px;display: block;text-align: center;font-size: 21px;}@media screen and (max-width: 900px) {div#tarteaucitronAlertBig button {margin: 0 auto 10px!important;display: block!important;}}';

                    customThemeMiddle.type = 'text/css';
                    if (customThemeMiddle.styleSheet) {
                        customThemeMiddle.styleSheet.cssText = cssRuleMiddle;
                    } else {
                        customThemeMiddle.appendChild(document.createTextNode(cssRuleMiddle));
                    }
                    document.getElementsByTagName('head')[0].appendChild(customThemeMiddle);
                }

                // css for the popup bar TODO: add it on the css file
                if (tarteaucitron.orientation === 'popup') {
                    var customThemePopup = document.createElement('style'),
                        cssRulePopup = 'div#tarteaucitronAlertBig:before {content: \'' + tarteaucitron.lang.middleBarHead + '\';font-size: 22px;}body #tarteaucitronRoot div#tarteaucitronAlertBig {bottom: 0;top: auto!important;left: 8px!important;right: auto!important;transform: initial!important;border-radius: 5px 5px 0 0!important;max-width: 250px!important;width: Calc(100% - 16px)!important;min-width: 0!important;padding: 25px 0;}span#tarteaucitronDisclaimerAlert {padding: 0 30px;font-size: 15px!important;}#tarteaucitronRoot span#tarteaucitronDisclaimerAlert {margin: 10px 0 30px;display: block;text-align: center;font-size: 21px;}div#tarteaucitronAlertBig button {margin: 0 auto 10px!important;display: block!important;width: Calc(100% - 60px);box-sizing: border-box;}';

                    customThemePopup.type = 'text/css';
                    if (customThemePopup.styleSheet) {
                        customThemePopup.styleSheet.cssText = cssRulePopup;
                    } else {
                        customThemePopup.appendChild(document.createTextNode(cssRulePopup));
                    }
                    document.getElementsByTagName('head')[0].appendChild(customThemePopup);
                }

                var body = document.body,
                    div = document.createElement('div'),
                    html = '',
                    index,
                    orientation = 'Top',
                    cat = ['ads', 'analytic', 'api', 'comment', 'social', 'support', 'video', 'other'],
                    i;

                cat = cat.sort(function (a, b) {
                    if (tarteaucitron.lang[a].title > tarteaucitron.lang[b].title) { return 1; }
                    if (tarteaucitron.lang[a].title < tarteaucitron.lang[b].title) { return -1; }
                    return 0;
                });

                // Step 3: prepare the html
                html += '<div role="heading" aria-level="1" id="tac_title" class="tac_visually-hidden">' + tarteaucitron.lang.title + '</div>';
                html += '<div id="tarteaucitronPremium"></div>';
                if (tarteaucitron.reloadThePage) {
                    html += '<button type="button" id="tarteaucitronBack" aria-label="' + tarteaucitron.lang.close + ' (' + tarteaucitron.lang.reload + ')" title="' + tarteaucitron.lang.close + ' (' + tarteaucitron.lang.reload + ')"></button>';
                } else {
                    html += '<button type="button" id="tarteaucitronBack" aria-label="' + tarteaucitron.lang.close + '" title="' + tarteaucitron.lang.close + '"></button>';
                }
                html += '<div id="tarteaucitron" role="dialog" aria-modal="true" aria-labelledby="dialogTitle" tabindex="-1">';
                if (tarteaucitron.reloadThePage) {
                    html += '   <button type="button" id="tarteaucitronClosePanel" aria-label="' + tarteaucitron.lang.close + ' (' + tarteaucitron.lang.reload + ')" title="' + tarteaucitron.lang.close + ' (' + tarteaucitron.lang.reload + ')">';
                } else {
                    html += '   <button type="button" id="tarteaucitronClosePanel">';
                }
                html += '       ' + tarteaucitron.lang.close;
                html += '   </button>';
                html += '   <div id="tarteaucitronServices">';
                html += '      <div class="tarteaucitronLine tarteaucitronMainLine" id="tarteaucitronMainLineOffset">';
                html += '         <span class="tarteaucitronH1" role="heading" aria-level="1" id="dialogTitle">'+ tarteaucitron.lang.title + '</span>';
                html += '         <div id="tarteaucitronInfo">';
                html += '         ' + tarteaucitron.lang.disclaimer;
                if (tarteaucitron.parameters.privacyUrl !== "") {
                    html += '   <br/><br/>';
                    html += '   <button type="button" id="tarteaucitronPrivacyUrlDialog" role="link">';
                    html += '       ' + tarteaucitron.lang.privacyUrl;
                    html += '   </button>';
                }
                html += '         </div>';
                html += '         <div class="tarteaucitronName">';
                html += '            <span class="tarteaucitronH2" role="heading" aria-level="2">' + tarteaucitron.lang.all + '</span>';
                html += '         </div>';
                html += '         <div class="tarteaucitronAsk" id="tarteaucitronScrollbarAdjust">';
                html += '            <button type="button" id="tarteaucitronAllAllowed" class="tarteaucitronAllow">';
                html += '               <span class="tarteaucitronCheck" aria-hidden="true"></span> ' + tarteaucitron.lang.allowAll;
                html += '            </button> ';
                html += '            <button type="button" id="tarteaucitronAllDenied" class="tarteaucitronDeny">';
                html += '               <span class="tarteaucitronCross" aria-hidden="true"></span> ' + tarteaucitron.lang.denyAll;
                html += '            </button>';
                html += '         </div>';
                html += '      </div>';
                html += '      <div class="tarteaucitronBorder">';
                html += '         <div class="clear"></div><ul>';


                if (tarteaucitron.parameters.mandatory == true) {
                   html += '<li id="tarteaucitronServicesTitle_mandatory">';
                   html += '<div class="tarteaucitronTitle">';
                   html += '   <button type="button" tabindex="-1"><span class="tarteaucitronPlus" aria-hidden="true"></span> ' + tarteaucitron.lang.mandatoryTitle + '</button>';
                   html += '</div>';
                   html += '<ul id="tarteaucitronServices_mandatory">';
                   html += '<li class="tarteaucitronLine">';
                   html += '   <div class="tarteaucitronName">';
                   html += '       <span class="tarteaucitronH3" role="heading" aria-level="3">' + tarteaucitron.lang.mandatoryText + '</span>';
                   html += '       <span class="tarteaucitronListCookies" aria-hidden="true"></span><br/>';
                   html += '   </div>';
                   if (tarteaucitron.parameters.mandatoryCta == true) {
                       html += '   <div class="tarteaucitronAsk">';
                       html += '       <button type="button" class="tarteaucitronAllow" tabindex="-1" disabled>';
                       html += '           <span class="tarteaucitronCheck" aria-hidden="true"></span> ' + tarteaucitron.lang.allow;
                       html += '       </button> ';
                       html += '       <button type="button" class="tarteaucitronDeny" style="visibility:hidden" tabindex="-1">';
                       html += '           <span class="tarteaucitronCross" aria-hidden="true"></span> ' + tarteaucitron.lang.deny;
                       html += '       </button> ';
                       html += '   </div>';
                   }
                   html += '</li>';
                   html += '</ul></li>';
                }

                for (i = 0; i < cat.length; i += 1) {
                    html += '         <li id="tarteaucitronServicesTitle_' + cat[i] + '" class="tarteaucitronHidden">';
                    html += '            <div class="tarteaucitronTitle" role="heading" aria-level="2">';
                    html += '               <button type="button" class="catToggleBtn" aria-expanded="false" data-cat="tarteaucitronDetails' + cat[i] + '"><span class="tarteaucitronPlus" aria-hidden="true"></span> ' + tarteaucitron.lang[cat[i]].title + '</button>';
                    html += '            </div>';
                    html += '            <div id="tarteaucitronDetails' + cat[i] + '" class="tarteaucitronDetails tarteaucitronInfoBox">';
                    html += '               ' + tarteaucitron.lang[cat[i]].details;
                    html += '            </div>';
                    html += '         <ul id="tarteaucitronServices_' + cat[i] + '"></ul></li>';
                }
                html += '             <li id="tarteaucitronNoServicesTitle" class="tarteaucitronLine">' + tarteaucitron.lang.noServices + '</li>';
                html += '         </ul>';
                html += '         <div class="tarteaucitronHidden tarteaucitron-spacer-20" id="tarteaucitronScrollbarChild"></div>';
                if (tarteaucitron.parameters.removeCredit === false) {
                    html += '     <a class="tarteaucitronSelfLink" href="https://tarteaucitron.io/" rel="nofollow noreferrer noopener" target="_blank" title="tarteaucitron ' + tarteaucitron.lang.newWindow + '"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAAeCAYAAAAWwoEYAAADl0lEQVRoge1Y0W3bQAx9CjKARlC+9GVUmqDJBHEmiDyB6wkcTxBngtgTxJ0gzgQW4C/9aYOmE6g4lTQo+k6y3Rb94QOERNQd+cjj8XiGwWAwGAwGg8FgMBgMBoPB8F8RNRXe+whEKe7c36ZCAeCRxC9Rig2PUd8kPgAsoxSfQ3YAzAA8D/HwYYCb05kBKKO0teFkmbC1jlKsAnq/Abjn+QBqAIsoRS30ttwG/HNz1wH/XIxWTicLdvtW7xTAGEAMtP685CNsBTe2d/BLydfXAG57SEnMAST0zgYZSUCPk02bCvkJduIzuJzDLfPolbY+tLKmar+/8+IRePy4qdpE03qHuH8fipFb4N2+XdA3AJ/0vaQxt7s9FvkIS2XvtqnwM0rxpOQfbnE5G2LhTCmUO2fHIngOmcv+KG3HafDchB6ntwjYqenR2PqC7sOZ3E7FXHB0vqxoFyUyLh7OEH7LOGouvhhN3eIBeKXv0n5MsufdHqXcwYR5U2EbpV35lSspVPJmQj4TcgRK7jTg5IzmPUhhwM5a2WHUFCx+NgiDucmgh7idikLovHFlL0pxQ9xzX+IIP9Y6FrJsqhjlQpZRAkFVDCjZfcCHt6bqJDmuh5ylCWx0RVnk3oumaknqTH5sqrY0fBWyULaHUIgAgxb46MxV3DbieAhxOxUxjSuljig9lMQ/Bcfoi9BTEv9aLORSndVxYOH525sUDC6u2gWxcNzBNRxPanyh3ktKinOgy3WoxPbtUM0t6RkbQnzBnFPgi9GCOEubY9UffIryz9iKRe8s/FUfEWosJJGxagp85bpUO3VywQ46lOtAWfNxKwa4JXQ+628+bpxYGXXMzp5rXH401VEyXwIdowXFaKWSMFHvMTVmGnc+P3oXV2QOiBCfgex8QtcQCbcQE/H+eoHzrkFo1KM7zVO4jVVj5s6lRiWF7zyXyfRMc97J3tzj87mYqZ7E2YjzUct9GUi4tjHLR8dVkBLjQcuHFleWvQfRNEhFR7uX7pkctOwvZXsft7sAtyldEUIN2UTeLxnEfxKYswzdi88BdbZ8hifUoSMftQvP+muRwN6+Q3DeqqRExP9QmTtcheiHh0Ot1x2i2km1bP9pbufw5zZdyWsOrh7vQae5OZWbsMv30pi7cd/CKj3coPEVaCP4Zhx4eQWhOZ1Y9MTXGyP8/iGjEyfa1T4fO/4Lea9vBoPBYDAYDAaDwWAwGAwGwz8GgF8siXCCbrSRhgAAAABJRU5ErkJggg==" alt="tarteaucitron.io" /></a>';
                }
                html += '       </div>';
                html += '   </div>';
                html += '</div>';

                if (tarteaucitron.parameters.orientation === 'bottom') {
                    orientation = 'Bottom';
                }

                if (tarteaucitron.parameters.highPrivacy && !tarteaucitron.parameters.AcceptAllCta) {
                    html += '<div tabindex="-1" id="tarteaucitronAlertBig" class="tarteaucitronAlertBig' + orientation + '">';
                    //html += '<div class="tarteaucitronAlertBigWrapper">';
                    html += '   <span id="tarteaucitronDisclaimerAlert">';
                    html += '       ' + tarteaucitron.lang.alertBigPrivacy;
                    html += '   </span>';
                    //html += '   <span class="tarteaucitronAlertBigBtnWrapper">';
                    html += '   <button type="button" id="tarteaucitronPersonalize" aria-label="' + tarteaucitron.lang.personalize + ' ' + tarteaucitron.lang.modalWindow + '" title="' + tarteaucitron.lang.personalize + ' ' + tarteaucitron.lang.modalWindow + '">';
                    html += '       ' + tarteaucitron.lang.personalize;
                    html += '   </button>';

                    if (tarteaucitron.parameters.privacyUrl !== "") {
                        html += '   <button role="link" type="button" id="tarteaucitronPrivacyUrl">';
                        html += '       ' + tarteaucitron.lang.privacyUrl;
                        html += '   </button>';
                    }

                    //html += '   </span>';
                    //html += '</div>';
                    html += '</div>';
                } else {
                    html += '<div tabindex="-1" id="tarteaucitronAlertBig" class="tarteaucitronAlertBig' + orientation + '">';
                    //html += '<div class="tarteaucitronAlertBigWrapper">';
                    html += '   <span id="tarteaucitronDisclaimerAlert">';

                    if (tarteaucitron.parameters.highPrivacy) {
                        html += '       ' + tarteaucitron.lang.alertBigPrivacy;
                    } else {
                        html += '       ' + tarteaucitron.lang.alertBigClick + ' ' + tarteaucitron.lang.alertBig;
                    }

                    html += '   </span>';
                    //html += '   <span class="tarteaucitronAlertBigBtnWrapper">';
                    html += '   <button type="button" class="tarteaucitronCTAButton tarteaucitronAllow" id="tarteaucitronPersonalize2">';
                    html += '       <span class="tarteaucitronCheck" aria-hidden="true"></span> ' + tarteaucitron.lang.acceptAll;
                    html += '   </button>';


                    if (tarteaucitron.parameters.DenyAllCta) {
                        if (tarteaucitron.reloadThePage) {
                                    html += '   <button type="button" class="tarteaucitronCTAButton tarteaucitronDeny" id="tarteaucitronAllDenied2" aria-label="' + tarteaucitron.lang.denyAll + ' (' + tarteaucitron.lang.reload + ')" title="' + tarteaucitron.lang.denyAll + ' (' + tarteaucitron.lang.reload + ')">';
                        } else {
                                    html += '   <button type="button" class="tarteaucitronCTAButton tarteaucitronDeny" id="tarteaucitronAllDenied2">';
                        }
                                    html += '       <span class="tarteaucitronCross" aria-hidden="true"></span> ' + tarteaucitron.lang.denyAll;
                                    html += '   </button>';
                                    //html += '   <br/><br/>';
                    }

                    html += '   <button type="button" id="tarteaucitronCloseAlert" aria-label="' + tarteaucitron.lang.personalize + ' ' + tarteaucitron.lang.modalWindow + '" title="' + tarteaucitron.lang.personalize + ' ' + tarteaucitron.lang.modalWindow + '">';
                    html += '       ' + tarteaucitron.lang.personalize;
                    html += '   </button>';

                    if (tarteaucitron.parameters.privacyUrl !== "") {
                        html += '   <button type="button" id="tarteaucitronPrivacyUrl" role="link">';
                        html += '       ' + tarteaucitron.lang.privacyUrl;
                        html += '   </button>';
                    }

                    //html += '   </span>';
                    //html += '</div>';
                    html += '</div>';
                    html += '<div id="tarteaucitronPercentage"></div>';
                }

                if (tarteaucitron.parameters.showIcon === true) {
                    html += '<div id="tarteaucitronIcon" class="tarteaucitronIcon' + tarteaucitron.parameters.iconPosition + '" style="display: block">';
                    html += '   <button type="button" id="tarteaucitronManager" aria-label="' + tarteaucitron.lang.icon + ' ' + tarteaucitron.lang.modalWindow + '" title="' + tarteaucitron.lang.icon + ' ' + tarteaucitron.lang.modalWindow + '">';
                    html += '       <img src="' + (tarteaucitron.parameters.iconSrc ? tarteaucitron.parameters.iconSrc : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAGA0lEQVRoge1a207bWBRdBtJwLYZhKDMVmlSK1LxNkPo+ZH6g8B6p5AuALwC+APoFoVLeoT8whPeRSt+CZKmZVu3AiIsRlEtCktGyjy8xzuXYhvahS0JJHJ/4rLP3XnuffcAPfGdQ7mM6jRLSAF4BxqsbewB2lRS2o35mpEQaJcwCyANIdLi1DGBNSWEzqmdHRqRRwjqAJclhtExOSUEP+/xIiDRKhhUWfL7ShTtBuJnqcw+/z4Ql0xNmMEwSSz4kuNIzSgpjSsqYJP/GeE185wYJroedRyiLNEpGLLzzrHSuk+83SgbxvOcyyRaDziWsRVZkSRDinpzPbwVGWIucuohsKynMS47fAQyls/BMSRmKJo3AFhG5wm2N1wF+Zs3zebbFfR0RxrXcJHQlgH+LMW616pR/WiIMEXfW3mtzXyeEGWsjKot8c4TOI98L+iKaR5PS6IUk88RLAO9F8UjrbYoYMOosNavpfmODIiwRXRR/G3ohaWVo1RU/c30jV8ab2mV8qVGzHWBOLyTLZiWs5Rolg/C3ySOi0tXP/k4aEwOwSBKPJs7Rp16ABJTe+p1xVX0It/owqqdDEMRoqd3RFxqDPh20Ig6VEPVC0i5RSCD+6wl6HlW7GksSlUMV11/GrUs5NasFLusDE9ELSVphXemtJwaT/8JyIRvxNNCfBmIiNdR04LII3DSrbe0yjqvyJF/ppptqVlt+MCLCEh/oOkPPP6N38Mb5cnQBGFsEqmXg5j3QMwoMzwGnr4HYbybBq13gZAOom/FO63zdf2qQArCsZrUN2TlJy69eSDKYV+6Q4MpP75ivHzPA53ngaBW4eGuSOt0A/lsGPmXMz0+3TFJcTfFbPfFbfnwlhON+iQhlWmA82CQ4ocQ7c6KcfL3DHuls0yT6Sx4YnLXJDCQOIRRv5yGIJBgP8Sdisj2qubpc5UGJmo+W49ifVmzL8HcpGhQPvZCUKiCliIhEN0tr2OCqHuSA8gwQ/92MkU7gxEmeVqGrTTgpxPXbUrtGWYus0I9thRIraagRQUIDf7Qn4yZhKRiFQIyhfMfUr3yblokVWSJ6k8xSnc7eNN/RjowfCYiFoDUFer1S3gW6JiJ8Nt30EMbEhU+vzSIztuRYjRLsR8IHLjlf7HZ+MrWWEXxNmbvapt4jGSqZRYSkGUetSNTPzHsui5YMQ2ajJUNks6mw4wT54Ok2ShnzzIPCUGshzawCRKy5FqvrTZe0RWzQGvw79m67XZjKmxJrLsICjtZa55gxXy+6F4sYsEtxTqhXdRTLC8ulSDaWoCLsolfN+8YUhOsJV709H7Cudr0LlVEtzqBcN+shEyThdR941OnAbF8pirKJqXyupTRTtQSReiVmXW1j7oBErB0d9xM2WEd5J9ZKYtuR4WKwwBSoORbpGrJ5ZI9lt71irJmGX1px0JYE26uNErawr2zfIcP4OHEKXm66PA3wjpCNEfpJunI4muifPjKvsFCkGjExTq63yxMJsZNMYF/J4HmDC5A3Yq36jy0ClePHVhwuu/b1HSFlEfHD5ZtD1bEK44Qu1mWys6tbWmZyPWckzlPTGiRw/XHCuk+q4Rek+mVrVL/UppwrdDEGNV2kpyuhccgc5Oxm9vWnn+19vJrVpLor0kTUrGacMplb1CfOFyTD4o9uNrHqr2Z+ZMSp1c2XcVSORnh9Q81q3k599ETgkNnjg0nGzi10K7rX+bZpHbrblPcY5A4Zxk2xcjzCvTpd9027Aa0QtouyyrKFRR6D/04DwkFGvHPXM3Qda/Jb4nPgI7hQLVM1q5HIBt2MzQNa57Z1DiiLAGa5Mi+O4Sz3Mpp6laPHO6InII3ITnX1QtI+EOX+m9ZxleOZ/j9PiuKoLi3aqXPuEoSye/Vhkm+LalbLtHhMS0R6zu7aZ3vP2jOjL7QVv4McxhcDnZIelAQibGIbULOapf3PuE1Vs9qeaOTdkVKr00gCQiw4NlBzDvf1Lxx+uP5r3Dgv5KQZRzWn+GRwz8jmDS8itUg7iB6vLuJCF5Uty4A9mVKkFR6MiJDachST/oHvHgD+B4SoUIitpF05AAAAAElFTkSuQmCC') + '" alt="' + tarteaucitron.lang.icon + ' ' + tarteaucitron.lang.modalWindow + '" title="' + tarteaucitron.lang.icon + ' ' + tarteaucitron.lang.modalWindow + '">';
                    html += '   </button>';
                    html += '</div>';
                }

                if (tarteaucitron.parameters.showAlertSmall === true) {
                    html += '<div id="tarteaucitronAlertSmall" class="tarteaucitronAlertSmall' + orientation + '">';
                    html += '   <button type="button" id="tarteaucitronManager" aria-label="' + tarteaucitron.lang.alertSmall + ' ' + tarteaucitron.lang.modalWindow + '" title="' + tarteaucitron.lang.alertSmall + ' ' + tarteaucitron.lang.modalWindow + '">';
                    html += '       ' + tarteaucitron.lang.alertSmall;
                    html += '       <span id="tarteaucitronDot">';
                    html += '           <span id="tarteaucitronDotGreen"></span>';
                    html += '           <span id="tarteaucitronDotYellow"></span>';
                    html += '           <span id="tarteaucitronDotRed"></span>';
                    html += '       </span>';
                    if (tarteaucitron.parameters.cookieslist === true) {
                        html += '   </button><!-- @whitespace';
                        html += '   --><button type="button" id="tarteaucitronCookiesNumber" aria-expanded="false" aria-controls="tarteaucitronCookiesListContainer">0</button>';
                        html += '   <div id="tarteaucitronCookiesListContainer">';
                        if (tarteaucitron.reloadThePage) {
                            html += '       <button type="button" id="tarteaucitronClosePanelCookie" aria-label="' + tarteaucitron.lang.close + ' (' + tarteaucitron.lang.reload + ')" title="' + tarteaucitron.lang.close + ' (' + tarteaucitron.lang.reload + ')">';
                        } else {
                            html += '       <button type="button" id="tarteaucitronClosePanelCookie">';
                        }
                        html += '           ' + tarteaucitron.lang.close;
                        html += '       </button>';
                        html += '       <div class="tarteaucitronCookiesListMain" id="tarteaucitronCookiesTitle">';
                        html += '            <span class="tarteaucitronH2" role="heading" aria-level="2" id="tarteaucitronCookiesNumberBis">0 cookie</span>';
                        html += '       </div>';
                        html += '       <div id="tarteaucitronCookiesList"></div>';
                        html += '    </div>';
                    } else {
                        html += '   </div>';
                    }
                    html += '</div>';
                }

                tarteaucitron.addInternalScript(tarteaucitron.cdn + 'advertising' + (useJSDelivrMinifiedJS ? '.min' : '') + '.js?v=' + tarteaucitron.version, '', function () {
                    if (tarteaucitronNoAdBlocker === true || tarteaucitron.parameters.adblocker === false) {

                        // create a wrapper container at the same level than tarteaucitron so we can add an aria-hidden when tarteaucitron is opened
                        /*var wrapper = document.createElement('div');
                        wrapper.id = "tarteaucitronContentWrapper";

                        while (document.body.firstChild)
                        {
                            wrapper.appendChild(document.body.firstChild);
                        }

                        // Append the wrapper to the body
                        document.body.appendChild(wrapper);*/

                        div.id = 'tarteaucitronRoot';
                        if (tarteaucitron.parameters.bodyPosition === 'top') {
                            // Prepend tarteaucitron: #tarteaucitronRoot first-child of the body for better accessibility
                            var bodyFirstChild = body.firstChild;
                            body.insertBefore(div, bodyFirstChild);
                        }
                        else {
                            // Append tarteaucitron: #tarteaucitronRoot last-child of the body
                            body.appendChild(div, body);
                        }

                        div.setAttribute('data-nosnippet', 'true');
                        div.setAttribute('lang', language);
                        div.setAttribute('role', 'region');
                        div.setAttribute('aria-labelledby', 'tac_title');

                        div.innerHTML = html;

                        //ie compatibility
                        var tacRootAvailableEvent;
                        if(typeof(Event) === 'function') {
                            tacRootAvailableEvent = new Event("tac.root_available");
                        }else if (typeof(document.createEvent) === 'function'){
                            tacRootAvailableEvent = document.createEvent('Event');
                            tacRootAvailableEvent.initEvent("tac.root_available", true, true);
                        }
                        //end ie compatibility

                        if (typeof(window.dispatchEvent) === 'function') {window.dispatchEvent(tacRootAvailableEvent);}

                        if (tarteaucitron.job !== undefined) {
                            tarteaucitron.job = tarteaucitron.cleanArray(tarteaucitron.job);
                            for (index = 0; index < tarteaucitron.job.length; index += 1) {
                                tarteaucitron.addService(tarteaucitron.job[index]);
                            }
                        } else {
                            tarteaucitron.job = [];
                        }

                        if (tarteaucitron.job.length === 0) {
                            tarteaucitron.userInterface.closeAlert();
                        }

                        tarteaucitron.isAjax = true;

                        tarteaucitron.job.push = function (id) {

                            // ie <9 hack
                            if (typeof tarteaucitron.job.indexOf === 'undefined') {
                                tarteaucitron.job.indexOf = function (obj, start) {
                                    var i,
                                        j = this.length;
                                    for (i = (start || 0); i < j; i += 1) {
                                        if (this[i] === obj) { return i; }
                                    }
                                    return -1;
                                };
                            }

                            if (tarteaucitron.job.indexOf(id) === -1) {
                                Array.prototype.push.call(this, id);
                            }
                            tarteaucitron.launch[id] = false;
                            tarteaucitron.addService(id);
                        };

                        if (document.location.hash === tarteaucitron.hashtag && tarteaucitron.hashtag !== '') {
                            tarteaucitron.userInterface.openPanel();
                        }

                        tarteaucitron.cookie.number();
                        setInterval(tarteaucitron.cookie.number, 60000);
                    }
                }, tarteaucitron.parameters.adblocker);

                if (tarteaucitron.parameters.adblocker === true) {
                    setTimeout(function () {
                        if (tarteaucitronNoAdBlocker === false) {
                            html = '<div id="tarteaucitronAlertBig" class="tarteaucitronAlertBig' + orientation + ' tarteaucitron-display-block" role="alert" aria-live="polite">';
                            html += '   <p id="tarteaucitronDisclaimerAlert">';
                            html += '       ' + tarteaucitron.lang.adblock + '<br/>';
                            html += '       <strong>' + tarteaucitron.lang.adblock_call + '</strong>';
                            html += '   </p>';
                            html += '   <button type="button" class="tarteaucitronCTAButton" id="tarteaucitronCTAButton">';
                            html += '       ' + tarteaucitron.lang.reload;
                            html += '   </button>';
                            html += '</div>';
                            html += '<div role="heading" aria-level="1" id="tac_title" class="tac_visually-hidden">' + tarteaucitron.lang.title + '</div>';
                            html += '<div id="tarteaucitronPremium"></div>';

                            div.id = 'tarteaucitronRoot';
                            if (tarteaucitron.parameters.bodyPosition === 'top') {
                                // Prepend tarteaucitron: #tarteaucitronRoot first-child of the body for better accessibility
                                var bodyFirstChild = body.firstChild;
                                body.insertBefore(div, bodyFirstChild);
                            }
                            else {
                                // Append tarteaucitron: #tarteaucitronRoot last-child of the body
                                body.appendChild(div, body);
                            }

                            div.setAttribute('data-nosnippet', 'true');
                            div.setAttribute('lang', language);
                            div.setAttribute('role', 'region');
                            div.setAttribute('aria-labelledby', 'tac_title');

                            div.innerHTML = html;
                        }
                    }, 1500);
                }
                if(tarteaucitron.parameters.closePopup === true){
                    setTimeout(function() {
                        var closeElement = document.getElementById('tarteaucitronAlertBig'),
                            closeSpan = document.createElement('span');
                        if (closeElement) {
                            closeSpan.textContent = 'X';
                            closeSpan.setAttribute('id', "tarteaucitronCloseCross");
                            closeElement.insertBefore(closeSpan, closeElement.firstElementChild);
                        }
                    }, 100);
                }


                if(tarteaucitron.parameters.groupServices === true) {
                    var tac_group_style = document.createElement('style');
                    tac_group_style.innerHTML = '.tarteaucitronTitle{display:none}';
                    document.head.appendChild(tac_group_style);
                    var cats = document.querySelectorAll('[id^="tarteaucitronServicesTitle_"]')
                    Array.prototype.forEach.call(cats, function(item) {
                        var cat = item.getAttribute('id').replace(/^(tarteaucitronServicesTitle_)/, "");
                        if (cat !== "mandatory") {
                            var html = '';
                            html += '<li  class="tarteaucitronLine">';
                            html += '   <div class="tarteaucitronName">';
                            html += '       <span class="tarteaucitronH3" role="heading" aria-level="2">'+tarteaucitron.lang[cat].title+'</span>';
                            html += '       <span>'+tarteaucitron.lang[cat].details+'</span>';
                            html += '   <button type="button" aria-expanded="false" class="tarteaucitron-toggle-group" id="tarteaucitron-toggle-group-'+cat+'">'+tarteaucitron.lang.alertSmall+' ('+document.getElementById("tarteaucitronServices_"+cat).childElementCount+')</button>';
                            html += '   </div>';
                            html += '   <div class="tarteaucitronAsk" id="tarteaucitron-group-'+cat+'">';
                            html += '       <button type="button" aria-label="' + tarteaucitron.lang.allow + ' ' + tarteaucitron.lang[cat].title + '" class="tarteaucitronAllow" id="tarteaucitron-accept-group-'+cat+'">';
                            html += '           <span class="tarteaucitronCheck" aria-hidden="true"></span> ' + tarteaucitron.lang.allow;
                            html += '       </button> ';
                            html += '       <button type="button" aria-label="' + tarteaucitron.lang.deny + ' ' + tarteaucitron.lang[cat].title + '" class="tarteaucitronDeny" id="tarteaucitron-reject-group-'+cat+'">';
                            html += '           <span class="tarteaucitronCross" aria-hidden="true"></span> ' + tarteaucitron.lang.deny;
                            html += '       </button>';
                            html += '   </div>';
                            html += '</li>';
                            var ul = document.createElement('ul');
                            ul.innerHTML = html;
                            item.insertBefore(ul, item.querySelector('#tarteaucitronServices_'+cat+''));
                            document.querySelector('#tarteaucitronServices_' + cat).style.display = 'none';
                            tarteaucitron.addClickEventToId("tarteaucitron-toggle-group-" + cat, function () {
                                tarteaucitron.userInterface.toggle('tarteaucitronServices_' + cat);
                               if (document.getElementById('tarteaucitronServices_' + cat).style.display == 'block') {
                                    tarteaucitron.userInterface.addClass('tarteaucitronServicesTitle_' + cat, 'tarteaucitronIsExpanded');
                                    document.getElementById('tarteaucitron-toggle-group-'+cat).setAttribute('aria-expanded', 'true');
                                } else {
                                    tarteaucitron.userInterface.removeClass('tarteaucitronServicesTitle_' + cat, 'tarteaucitronIsExpanded');
                                    document.getElementById('tarteaucitron-toggle-group-'+cat).setAttribute('aria-expanded', 'false');
                                }
                            });
                            tarteaucitron.addClickEventToId("tarteaucitron-accept-group-" + cat, function () {
                                tarteaucitron.userInterface.respondAll(true, cat);
                            });
                            tarteaucitron.addClickEventToId("tarteaucitron-reject-group-" + cat, function () {
                                tarteaucitron.userInterface.respondAll(false, cat);
                            });
                        }
                    });
                }
                tarteaucitron.userInterface.color("", true);

                // add a little timeout to be sure everything is accessible
                setTimeout(function () {

                    // Setup events
                    tarteaucitron.addClickEventToId("tarteaucitronCloseCross", function () {
                        tarteaucitron.userInterface.closeAlert();
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronPersonalize", function () {
                        tarteaucitron.userInterface.openPanel();
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronPersonalize2", function () {
                        tarteaucitron.userInterface.respondAll(true);
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronManager", function () {
                        tarteaucitron.userInterface.openPanel();
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronBack", function () {
                        tarteaucitron.userInterface.closePanel();
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronClosePanel", function () {
                        tarteaucitron.userInterface.closePanel();
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronClosePanelCookie", function () {
                        tarteaucitron.userInterface.closePanel();
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronPrivacyUrl", function () {
                        document.location = tarteaucitron.parameters.privacyUrl;
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronPrivacyUrlDialog", function () {
                        document.location = tarteaucitron.parameters.privacyUrl;
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronCookiesNumber", function () {
                        tarteaucitron.userInterface.toggleCookiesList();
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronAllAllowed", function () {
                        tarteaucitron.userInterface.respondAll(true);
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronAllDenied", function () {
                        tarteaucitron.userInterface.respondAll(false);
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronAllDenied2", function () {
                        tarteaucitron.userInterface.respondAll(false, '', true);
                        if (tarteaucitron.reloadThePage === true) {
                            window.location.reload();
                        }
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronCloseAlert", function () {
                        tarteaucitron.userInterface.openPanel();
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronCTAButton", function () {
                        location.reload();
                    });
                    var toggleBtns = document.getElementsByClassName("catToggleBtn"), i;
                    for (i = 0; i < toggleBtns.length; i++) {
                        toggleBtns[i].dataset.index = i;
                        tarteaucitron.addClickEventToElement(toggleBtns[i], function () {
                            tarteaucitron.userInterface.toggle('tarteaucitronDetails' + cat[this.dataset.index], 'tarteaucitronInfoBox');
                            if (document.getElementById('tarteaucitronDetails' + cat[this.dataset.index]).style.display === 'block') {
                                this.setAttribute('aria-expanded', 'true');
                            } else {
                                this.setAttribute('aria-expanded', 'false');
                            }
                            return false;
                        });
                    }

                    var allowBtns = document.getElementsByClassName("tarteaucitronAllow");
                    for (i = 0; i < allowBtns.length; i++) {
                        tarteaucitron.addClickEventToElement(allowBtns[i], function () {
                            tarteaucitron.userInterface.respond(this, true);
                        });
                    }
                    var denyBtns = document.getElementsByClassName("tarteaucitronDeny");
                    for (i = 0; i < denyBtns.length; i++) {
                        tarteaucitron.addClickEventToElement(denyBtns[i], function () {
                            tarteaucitron.userInterface.respond(this, false);
                        });
                    }
                    if(tarteaucitron.events.load) {
                        tarteaucitron.events.load();
                    }
                }, 500);

            });
        });
    },
    "addService": function (serviceId) {
        "use strict";
        var html = '',
            s = tarteaucitron.services,
            service = s[serviceId],
            cookie = tarteaucitron.cookie.read(),
            hostname = document.location.hostname,
            hostRef = document.referrer.split('/')[2],
            isNavigating = (hostRef === hostname && window.location.href !== tarteaucitron.parameters.privacyUrl),
            isAutostart = (!service.needConsent),
            isWaiting = (cookie.indexOf(service.key + '=wait') >= 0),
            isDenied = (cookie.indexOf(service.key + '=false') >= 0),
            isAllowed = ((cookie.indexOf(service.key + '=true') >= 0) || (!service.needConsent && cookie.indexOf(service.key + '=false') < 0)),
            isResponded = (cookie.indexOf(service.key + '=false') >= 0 || cookie.indexOf(service.key + '=true') >= 0),
            isDNTRequested = (navigator.doNotTrack === "1" || navigator.doNotTrack === "yes" || navigator.msDoNotTrack === "1" || window.doNotTrack === "1"),
            currentStatus = (isAllowed) ? tarteaucitron.lang.allowed : tarteaucitron.lang.disallowed,
            state = (undefined !== service.defaultState) ? service.defaultState :
                    (undefined !== tarteaucitron.parameters.serviceDefaultState ? tarteaucitron.parameters.serviceDefaultState : 'wait');


        if (tarteaucitron.added[service.key] !== true) {
            tarteaucitron.added[service.key] = true;

            html += '<li id="' + service.key + 'Line" class="tarteaucitronLine">';
            html += '   <div class="tarteaucitronName">';
            html += '       <span class="tarteaucitronH3" role="heading" aria-level="3">' + service.name + '</span>';
            html += '       <span class="tacCurrentStatus" id="tacCurrentStatus' + service.key + '">'+currentStatus+'</span>';
            html += '       <span class="tarteaucitronReadmoreSeparator"> - </span>';
            html += '       <span id="tacCL' + service.key + '" class="tarteaucitronListCookies"></span><br/>';
            if (tarteaucitron.parameters.moreInfoLink == true) {

                var link = 'https://tarteaucitron.io/service/' + service.key + '/';
                if (service.readmoreLink !== undefined && service.readmoreLink !== '') {
                    link = service.readmoreLink;
                }
                if (tarteaucitron.parameters.readmoreLink !== undefined && tarteaucitron.parameters.readmoreLink !== '') {
                    link = tarteaucitron.parameters.readmoreLink;
                }
                html += '       <a href="' + link + '" target="_blank" rel="noreferrer noopener nofollow" title="' + tarteaucitron.lang.more + ' : ' + tarteaucitron.lang.cookieDetail + ' ' + service.name + ' ' + tarteaucitron.lang.ourSite + ' ' + tarteaucitron.lang.newWindow +'" class="tarteaucitronReadmoreInfo">';
                html += '           ' + tarteaucitron.lang.more;
                html += '       </a>';
                html += '       <span class="tarteaucitronReadmoreSeparator"> - </span>';
                html += '       <a href="' + service.uri + '" target="_blank" rel="noreferrer noopener" title="' + tarteaucitron.lang.source + ' ' + service.name + ' ' + tarteaucitron.lang.newWindow + '" class="tarteaucitronReadmoreOfficial">';
                html += '           ' + tarteaucitron.lang.source;
                html += '       </a>';
            }

            html += '   </div>';
            html += '   <div class="tarteaucitronAsk">';
            html += '       <button type="button" aria-label="' + tarteaucitron.lang.allow + ' ' + service.name + '" id="' + service.key + 'Allowed" class="tarteaucitronAllow">';
            html += '           <span class="tarteaucitronCheck" aria-hidden="true"></span> ' + tarteaucitron.lang.allow;
            html += '       </button> ';
            html += '       <button type="button" aria-label="' + tarteaucitron.lang.deny + ' ' + service.name + '" id="' + service.key + 'Denied" class="tarteaucitronDeny">';
            html += '           <span class="tarteaucitronCross" aria-hidden="true"></span> ' + tarteaucitron.lang.deny;
            html += '       </button>';
            html += '   </div>';
            html += '</li>';

            tarteaucitron.userInterface.css('tarteaucitronServicesTitle_' + service.type, 'display', 'block');

            if (document.getElementById('tarteaucitronServices_' + service.type) !== null) {
                document.getElementById('tarteaucitronServices_' + service.type).innerHTML += html;
            }

            tarteaucitron.userInterface.css('tarteaucitronNoServicesTitle', 'display', 'none');

            tarteaucitron.userInterface.order(service.type);

            tarteaucitron.addClickEventToId(service.key + 'Allowed', function () {
                tarteaucitron.userInterface.respond(this, true);
            });

            tarteaucitron.addClickEventToId(service.key + 'Denied', function () {
                tarteaucitron.userInterface.respond(this, false);
            });
        }

        tarteaucitron.pro('!' + service.key + '=' + isAllowed);

        // allow by default for non EU
        if (isResponded === false && tarteaucitron.user.bypass === true) {
            isAllowed = true;
            tarteaucitron.cookie.create(service.key, true);
        }

        if ((!isResponded && (isAutostart || (isNavigating && isWaiting)) && !tarteaucitron.highPrivacy) || isAllowed) {
            if (!isAllowed || (!service.needConsent && cookie.indexOf(service.key + '=false') < 0)) {
                tarteaucitron.cookie.create(service.key, true);
            }
            if (tarteaucitron.launch[service.key] !== true) {
                tarteaucitron.launch[service.key] = true;
                if (typeof tarteaucitronMagic === 'undefined' || tarteaucitronMagic.indexOf("_" + service.key + "_") < 0) { service.js(); }
                tarteaucitron.sendEvent(service.key + '_loaded');
            }
            tarteaucitron.state[service.key] = true;
            tarteaucitron.userInterface.color(service.key, true);
        } else if (isDenied) {
            if (typeof service.fallback === 'function') {
                if (typeof tarteaucitronMagic === 'undefined' || tarteaucitronMagic.indexOf("_" + service.key + "_") < 0) { service.fallback(); }
            }
            tarteaucitron.state[service.key] = false;
            tarteaucitron.userInterface.color(service.key, false);
        } else if (!isResponded && isDNTRequested && tarteaucitron.handleBrowserDNTRequest) {
            tarteaucitron.cookie.create(service.key, 'false');
            if (typeof service.fallback === 'function') {
                if (typeof tarteaucitronMagic === 'undefined' || tarteaucitronMagic.indexOf("_" + service.key + "_") < 0) { service.fallback(); }
            }
            tarteaucitron.state[service.key] = false;
            tarteaucitron.userInterface.color(service.key, false);
        } else if (!isResponded) {
            tarteaucitron.cookie.create(service.key, state);
            if (typeof tarteaucitronMagic === 'undefined' || tarteaucitronMagic.indexOf("_" + service.key + "_") < 0) {
                if(true === state && typeof service.js === 'function') {
                    service.js();
                } else if (typeof service.fallback === 'function') {
                    service.fallback();
                }
            }

            tarteaucitron.userInterface.color(service.key, state);

            if( 'wait' === state ) {
                tarteaucitron.userInterface.openAlert();
            }
        }

        tarteaucitron.cookie.checkCount(service.key);
        tarteaucitron.sendEvent(service.key + '_added')
    },
    "sendEvent" : function(event_key) {
        if(event_key !== undefined) {
            //ie compatibility
            var send_event_item;
            if(typeof(Event) === 'function') {
                send_event_item = new Event(event_key);
            }else if (typeof(document.createEvent) === 'function'){
                send_event_item = document.createEvent('Event');
                send_event_item.initEvent(event_key, true, true);
            }
            //end ie compatibility

            document.dispatchEvent(send_event_item);
        }
    },
    "cleanArray": function cleanArray(arr) {
        "use strict";
        var i,
            len = arr.length,
            out = [],
            obj = {},
            s = tarteaucitron.services;

        for (i = 0; i < len; i += 1) {
            if (!obj[arr[i]]) {
                obj[arr[i]] = {};
                if (tarteaucitron.services[arr[i]] !== undefined) {
                    out.push(arr[i]);
                }
            }
        }

        out = out.sort(function (a, b) {
            if (s[a].type + s[a].key > s[b].type + s[b].key) { return 1; }
            if (s[a].type + s[a].key < s[b].type + s[b].key) { return -1; }
            return 0;
        });

        return out;
    },
    "userInterface": {
        "css": function (id, property, value) {
            "use strict";
            if (document.getElementById(id) !== null) {

                if (property == "display" && value == "none" && (id == "tarteaucitron" || id == "tarteaucitronBack" || id == "tarteaucitronAlertBig")) {
                    document.getElementById(id).style["opacity"] = "0";

                    setTimeout(function() {document.getElementById(id).style[property] = value;}, 200);
                } else {

                    document.getElementById(id).style[property] = value;

                    if (property == "display" && value == "block" && (id == "tarteaucitron" || id == "tarteaucitronAlertBig")) {
                        document.getElementById(id).style["opacity"] = "0";
                        setTimeout(function() {document.getElementById(id).style["opacity"] = "1";}, 1);
                    }

                    if (property == "display" && value == "block" && id == "tarteaucitronBack") {
                        document.getElementById(id).style["opacity"] = "0";
                        setTimeout(function() {document.getElementById(id).style["opacity"] = "0.7";}, 1);
                    }
                }
            }
        },
        "addClass": function (id, className) {
            "use strict";
            if (document.getElementById(id) !== null && document.getElementById(id).classList !== undefined) {
                document.getElementById(id).classList.add(className);
            }
        },
        "removeClass": function (id, className) {
            "use strict";
            if (document.getElementById(id) !== null && document.getElementById(id).classList !== undefined) {
                document.getElementById(id).classList.remove(className);
            }
        },
        "respondAll": function (status, type, allowSafeAnalytics) {
            "use strict";
            var s = tarteaucitron.services,
                service,
                key,
                index = 0;

            for (index = 0; index < tarteaucitron.job.length; index += 1) {

                if (typeof type !== 'undefined' && type !== '' && s[tarteaucitron.job[index]].type !== type) {
                    continue;
                }

                if (allowSafeAnalytics && typeof s[tarteaucitron.job[index]].safeanalytic !== "undefined" && s[tarteaucitron.job[index]].safeanalytic === true) {
                    continue;
                }

                service = s[tarteaucitron.job[index]];
                key = service.key;
                if (tarteaucitron.state[key] !== status) {
                    if (status === false && tarteaucitron.launch[key] === true) {
                        tarteaucitron.reloadThePage = true;
                        if (tarteaucitron.checkIfExist('tarteaucitronClosePanel')) {
                            var ariaCloseValue = document.getElementById('tarteaucitronClosePanel').textContent.trim() + ' (' + tarteaucitron.lang.reload + ')';
                            document.getElementById('tarteaucitronClosePanel').setAttribute("aria-label", ariaCloseValue);
                            document.getElementById('tarteaucitronClosePanel').setAttribute("title", ariaCloseValue);
                        }
                    }
                    if (tarteaucitron.launch[key] !== true && status === true) {

                        tarteaucitron.pro('!' + key + '=engage');

                        tarteaucitron.launch[key] = true;
                        if (typeof tarteaucitronMagic === 'undefined' || tarteaucitronMagic.indexOf("_" + key + "_") < 0) { tarteaucitron.services[key].js(); }
                        tarteaucitron.sendEvent(key + '_loaded');
                    }
                    var itemStatusElem = document.getElementById('tacCurrentStatus'+key);
                    if(status == true){
                        itemStatusElem.innerHTML = tarteaucitron.lang.allowed;
                        tarteaucitron.sendEvent(key + '_allowed');
                    }else{
                        itemStatusElem.innerHTML = tarteaucitron.lang.disallowed;
                        tarteaucitron.sendEvent(key + '_disallowed');
                    }
                    tarteaucitron.state[key] = status;
                    tarteaucitron.cookie.create(key, status);
                    tarteaucitron.userInterface.color(key, status);
                }
            }
        },
        "respond": function (el, status) {
            "use strict";
            if (el.id === '') {
                return;
            }
            var key = el.id.replace(new RegExp("(Eng[0-9]+|Allow|Deni)ed", "g"), '');

            if (key.substring(0, 13) === 'tarteaucitron' || key === '') {return;}

            // return if same state
            if (tarteaucitron.state[key] === status) {
                return;
            }

            if (status === false && tarteaucitron.launch[key] === true) {
                tarteaucitron.reloadThePage = true;
                if (tarteaucitron.checkIfExist('tarteaucitronClosePanel')) {
                    var ariaCloseValue = document.getElementById('tarteaucitronClosePanel').textContent.trim() + ' (' + tarteaucitron.lang.reload + ')';
                    document.getElementById('tarteaucitronClosePanel').setAttribute("aria-label", ariaCloseValue);
                    document.getElementById('tarteaucitronClosePanel').setAttribute("title", ariaCloseValue);
                }
            }

            // if not already launched... launch the service
            if (status === true) {
                if (tarteaucitron.launch[key] !== true) {

                    tarteaucitron.pro('!' + key + '=engage');

                    tarteaucitron.launch[key] = true;
                    if (typeof tarteaucitronMagic === 'undefined' || tarteaucitronMagic.indexOf("_" + key + "_") < 0) { tarteaucitron.services[key].js(); }
                    tarteaucitron.sendEvent(key + '_loaded');
                }
            }
            var itemStatusElem = document.getElementById('tacCurrentStatus'+key);
            if(status == true){
                itemStatusElem.innerHTML = tarteaucitron.lang.allowed;
                tarteaucitron.sendEvent(key + '_allowed');
            }else{
                itemStatusElem.innerHTML = tarteaucitron.lang.disallowed;
                tarteaucitron.sendEvent(key + '_disallowed');
            }
            tarteaucitron.state[key] = status;
            tarteaucitron.cookie.create(key, status);
            tarteaucitron.userInterface.color(key, status);
        },
        "color": function (key, status) {
            "use strict";
            var c = 'tarteaucitron',
                nbDenied = 0,
                nbPending = 0,
                nbAllowed = 0,
                sum = tarteaucitron.job.length,
                index,
                s = tarteaucitron.services;

            if (key !== "") {

            if (status === true) {
                tarteaucitron.userInterface.addClass(key + 'Line', 'tarteaucitronIsAllowed');
                tarteaucitron.userInterface.removeClass(key + 'Line', 'tarteaucitronIsDenied');
                document.getElementById(key + 'Allowed').setAttribute('aria-pressed', 'true');
                document.getElementById(key + 'Denied').setAttribute('aria-pressed', 'false');
            } else if (status === false) {
                tarteaucitron.userInterface.removeClass(key + 'Line', 'tarteaucitronIsAllowed');
                tarteaucitron.userInterface.addClass(key + 'Line', 'tarteaucitronIsDenied');
                document.getElementById(key + 'Allowed').setAttribute('aria-pressed', 'false');
                document.getElementById(key + 'Denied').setAttribute('aria-pressed', 'true');
            } else {
                document.getElementById(key + 'Allowed').setAttribute('aria-pressed', 'false');
                document.getElementById(key + 'Denied').setAttribute('aria-pressed', 'false');
            }

            // check if all services are allowed
            var sumToRemove = 0;
            for (index = 0; index < sum; index += 1) {

                if (typeof s[tarteaucitron.job[index]].safeanalytic !== "undefined" && s[tarteaucitron.job[index]].safeanalytic === true) {
                    sumToRemove += 1;
                    continue;
                }

                if (tarteaucitron.state[tarteaucitron.job[index]] === false) {
                    nbDenied += 1;
                } else if (tarteaucitron.state[tarteaucitron.job[index]] === undefined) {
                    nbPending += 1;
                } else if (tarteaucitron.state[tarteaucitron.job[index]] === true) {
                    nbAllowed += 1;
                }
            }
            sum -= sumToRemove;

            tarteaucitron.userInterface.css(c + 'DotGreen', 'width', ((100 / sum) * nbAllowed) + '%');
            tarteaucitron.userInterface.css(c + 'DotYellow', 'width', ((100 / sum) * nbPending) + '%');
            tarteaucitron.userInterface.css(c + 'DotRed', 'width', ((100 / sum) * nbDenied) + '%');

            if (nbDenied === 0 && nbPending === 0) {
                tarteaucitron.userInterface.removeClass(c + 'AllDenied', c + 'IsSelected');
                tarteaucitron.userInterface.addClass(c + 'AllAllowed', c + 'IsSelected');

                tarteaucitron.userInterface.addClass(c + 'MainLineOffset', c + 'IsAllowed');
                tarteaucitron.userInterface.removeClass(c + 'MainLineOffset', c + 'IsDenied');

                document.getElementById(c + 'AllDenied').setAttribute('aria-pressed', 'false');
                document.getElementById(c + 'AllAllowed').setAttribute('aria-pressed', 'true');

            } else if (nbAllowed === 0 && nbPending === 0) {
                tarteaucitron.userInterface.removeClass(c + 'AllAllowed', c + 'IsSelected');
                tarteaucitron.userInterface.addClass(c + 'AllDenied', c + 'IsSelected');

                tarteaucitron.userInterface.removeClass(c + 'MainLineOffset', c + 'IsAllowed');
                tarteaucitron.userInterface.addClass(c + 'MainLineOffset', c + 'IsDenied');

                document.getElementById(c + 'AllDenied').setAttribute('aria-pressed', 'true');
                document.getElementById(c + 'AllAllowed').setAttribute('aria-pressed', 'false');

            } else {
                tarteaucitron.userInterface.removeClass(c + 'AllAllowed', c + 'IsSelected');
                tarteaucitron.userInterface.removeClass(c + 'AllDenied', c + 'IsSelected');

                tarteaucitron.userInterface.removeClass(c + 'MainLineOffset', c + 'IsAllowed');
                tarteaucitron.userInterface.removeClass(c + 'MainLineOffset', c + 'IsDenied');

                document.getElementById(c + 'AllDenied').setAttribute('aria-pressed', 'false');
                document.getElementById(c + 'AllAllowed').setAttribute('aria-pressed', 'false');
            }

            // close the alert if all service have been reviewed
            if (nbPending === 0) {
                tarteaucitron.userInterface.closeAlert();
            }

            if (tarteaucitron.services[key].cookies.length > 0 && status === false) {
                tarteaucitron.cookie.purge(tarteaucitron.services[key].cookies);
            }

            if (status === true) {
                if (document.getElementById('tacCL' + key) !== null) {
                    document.getElementById('tacCL' + key).innerHTML = '...';
                }
                setTimeout(function () {
                    tarteaucitron.cookie.checkCount(key);
                }, 2500);
            } else {
                tarteaucitron.cookie.checkCount(key);
            }

            }

	    // groups
            var cats = document.querySelectorAll('[id^="tarteaucitronServicesTitle_"]')
            Array.prototype.forEach.call(cats, function(item) {
                var cat = item.getAttribute('id').replace(/^(tarteaucitronServicesTitle_)/, ""),
                    total = document.getElementById("tarteaucitronServices_"+cat).childElementCount;
                var doc = document.getElementById("tarteaucitronServices_"+cat),
                    groupdenied = 0,
                    groupallowed = 0;
                for (var ii = 0; ii < doc.children.length; ii++) {
                    if (doc.children[ii].className == "tarteaucitronLine tarteaucitronIsDenied") {
                        groupdenied++;
                    }
                    if (doc.children[ii].className == "tarteaucitronLine tarteaucitronIsAllowed") {
                        groupallowed++;
                    }
                }
                if (total === groupallowed) {
                    tarteaucitron.userInterface.removeClass('tarteaucitron-group-'+cat, 'tarteaucitronIsDenied');
                    tarteaucitron.userInterface.addClass('tarteaucitron-group-'+cat, 'tarteaucitronIsAllowed');

                    if (document.getElementById('tarteaucitron-reject-group-'+cat)) {
                        document.getElementById('tarteaucitron-reject-group-'+cat).setAttribute('aria-pressed', 'false');
                        document.getElementById('tarteaucitron-accept-group-'+cat).setAttribute('aria-pressed', 'true');
                    }
                }
                if (total === groupdenied) {
                    tarteaucitron.userInterface.addClass('tarteaucitron-group-'+cat, 'tarteaucitronIsDenied');
                    tarteaucitron.userInterface.removeClass('tarteaucitron-group-'+cat, 'tarteaucitronIsAllowed');

                    if (document.getElementById('tarteaucitron-reject-group-'+cat)) {
                        document.getElementById('tarteaucitron-reject-group-'+cat).setAttribute('aria-pressed', 'true');
                        document.getElementById('tarteaucitron-accept-group-'+cat).setAttribute('aria-pressed', 'false');
                    }
                }
                if (total !== groupdenied && total !== groupallowed) {
                    tarteaucitron.userInterface.removeClass('tarteaucitron-group-'+cat, 'tarteaucitronIsDenied');
                    tarteaucitron.userInterface.removeClass('tarteaucitron-group-'+cat, 'tarteaucitronIsAllowed');

                    if (document.getElementById('tarteaucitron-reject-group-'+cat)) {
                        document.getElementById('tarteaucitron-reject-group-'+cat).setAttribute('aria-pressed', 'false');
                        document.getElementById('tarteaucitron-accept-group-'+cat).setAttribute('aria-pressed', 'false');
                    }
                }
                groupdenied = 0;
                groupallowed = 0;
            });

        },
        "openPanel": function () {
            "use strict";

            tarteaucitron.userInterface.css('tarteaucitron', 'display', 'block');
            tarteaucitron.userInterface.css('tarteaucitronBack', 'display', 'block');
            tarteaucitron.userInterface.css('tarteaucitronCookiesListContainer', 'display', 'none');

            document.getElementById('tarteaucitronClosePanel').focus();
            if (document.getElementsByTagName('body')[0].classList !== undefined) {
                document.getElementsByTagName('body')[0].classList.add('tarteaucitron-modal-open');
            }
            tarteaucitron.userInterface.focusTrap();
            tarteaucitron.userInterface.jsSizing('main');

            //ie compatibility
            var tacOpenPanelEvent;
            if(typeof(Event) === 'function') {
                tacOpenPanelEvent = new Event("tac.open_panel");
            }else if (typeof(document.createEvent) === 'function'){
                tacOpenPanelEvent = document.createEvent('Event');
                tacOpenPanelEvent.initEvent("tac.open_panel", true, true);
            }
            //end ie compatibility

            if (typeof(window.dispatchEvent) === 'function') {window.dispatchEvent(tacOpenPanelEvent);}
        },
        "closePanel": function () {
            "use strict";

            if (document.location.hash === tarteaucitron.hashtag) {
                if (window.history) {
                    window.history.replaceState('', document.title, window.location.pathname + window.location.search);
                } else {
                    document.location.hash = '';
                }
            }
            if (tarteaucitron.checkIfExist('tarteaucitron')) {
                // accessibility: manage focus on close panel
                if (tarteaucitron.checkIfExist('tarteaucitronCloseAlert')) {
                    document.getElementById('tarteaucitronCloseAlert').focus();
                } else if (tarteaucitron.checkIfExist('tarteaucitronManager')) {
                    document.getElementById('tarteaucitronManager').focus();
                } else if (tarteaucitron.customCloserId && tarteaucitron.checkIfExist(tarteaucitron.customCloserId)) {
                    document.getElementById(tarteaucitron.customCloserId).focus();
                }
                tarteaucitron.userInterface.css('tarteaucitron', 'display', 'none');
            }

            if (tarteaucitron.checkIfExist('tarteaucitronCookiesListContainer') && tarteaucitron.checkIfExist('tarteaucitronCookiesNumber')) {
                // accessibility: manage focus on close cookies list
                document.getElementById('tarteaucitronCookiesNumber').focus();
                document.getElementById('tarteaucitronCookiesNumber').setAttribute("aria-expanded", "false");
                tarteaucitron.userInterface.css('tarteaucitronCookiesListContainer', 'display', 'none');
            }

            tarteaucitron.fallback(['tarteaucitronInfoBox'], function (elem) {
                elem.style.display = 'none';
            }, true);

            if (tarteaucitron.reloadThePage === true) {
                window.location.reload();
            } else {
                tarteaucitron.userInterface.css('tarteaucitronBack', 'display', 'none');
            }
            if (document.getElementsByTagName('body')[0].classList !== undefined) {
                document.getElementsByTagName('body')[0].classList.remove('tarteaucitron-modal-open');
            }

            //ie compatibility
            var tacClosePanelEvent;
            if(typeof(Event) === 'function') {
                tacClosePanelEvent = new Event("tac.close_panel");
            }else if (typeof(document.createEvent) === 'function'){
                tacClosePanelEvent = document.createEvent('Event');
                tacClosePanelEvent.initEvent("tac.close_panel", true, true);
            }
            //end ie compatibility

            if (typeof(window.dispatchEvent) === 'function') {window.dispatchEvent(tacClosePanelEvent);}
        },
        "focusTrap": function() {
            "use strict";

            var focusableEls,
                firstFocusableEl,
                lastFocusableEl,
                filtered;

            focusableEls = document.getElementById('tarteaucitron').querySelectorAll('a[href], button');
            filtered = [];

            // get only visible items
            for (var i = 0, max = focusableEls.length; i < max; i++) {
                if (focusableEls[i].offsetHeight > 0) {
                   filtered.push(focusableEls[i]);
                }
            }

            firstFocusableEl = filtered[0];
            lastFocusableEl = filtered[filtered.length - 1];

            //loop focus inside tarteaucitron
            document.getElementById('tarteaucitron').addEventListener("keydown", function (evt) {

                if ( evt.key === 'Tab' || evt.keyCode === 9 ) {

                    if ( evt.shiftKey ) /* shift + tab */ {
                        if (document.activeElement === firstFocusableEl) {
                            lastFocusableEl.focus();
                            evt.preventDefault();
                        }
                    } else /* tab */ {
                        if (document.activeElement === lastFocusableEl) {
                            firstFocusableEl.focus();
                            evt.preventDefault();
                        }
                    }
                }
            })
        },
        "openAlert": function () {
            "use strict";
            var c = 'tarteaucitron';
            tarteaucitron.userInterface.css(c + 'Percentage', 'display', 'block');
            tarteaucitron.userInterface.css(c + 'AlertSmall', 'display', 'none');
            tarteaucitron.userInterface.css(c + 'Icon', 'display', 'none');
            tarteaucitron.userInterface.css(c + 'AlertBig',   'display', 'block');
            tarteaucitron.userInterface.addClass(c + 'Root',   'tarteaucitronBeforeVisible');

            //ie compatibility
            var tacOpenAlertEvent;
            if(typeof(Event) === 'function') {
                tacOpenAlertEvent = new Event("tac.open_alert");
            }else if (typeof(document.createEvent) === 'function'){
                tacOpenAlertEvent = document.createEvent('Event');
                tacOpenAlertEvent.initEvent("tac.open_alert", true, true);
            }
            //end ie compatibility

            if (document.getElementById('tarteaucitronAlertBig') !== null) {
                document.getElementById('tarteaucitronAlertBig').focus();
            }

            if (typeof(window.dispatchEvent) === 'function') {window.dispatchEvent(tacOpenAlertEvent);}
        },
        "closeAlert": function () {
            "use strict";
            var c = 'tarteaucitron';
            tarteaucitron.userInterface.css(c + 'Percentage', 'display', 'none');
            tarteaucitron.userInterface.css(c + 'AlertSmall', 'display', 'block');
            tarteaucitron.userInterface.css(c + 'Icon', 'display', 'block');
            tarteaucitron.userInterface.css(c + 'AlertBig',   'display', 'none');
            tarteaucitron.userInterface.removeClass(c + 'Root',   'tarteaucitronBeforeVisible');
            tarteaucitron.userInterface.jsSizing('box');

            //ie compatibility
            var tacCloseAlertEvent;
            if(typeof(Event) === 'function') {
                tacCloseAlertEvent = new Event("tac.close_alert");
            }else if (typeof(document.createEvent) === 'function'){
                tacCloseAlertEvent = document.createEvent('Event');
                tacCloseAlertEvent.initEvent("tac.close_alert", true, true);
            }
            //end ie compatibility

            if (typeof(window.dispatchEvent) === 'function') {window.dispatchEvent(tacCloseAlertEvent);}
        },
        "toggleCookiesList": function () {
            "use strict";
            var div = document.getElementById('tarteaucitronCookiesListContainer'),
                togglediv = document.getElementById('tarteaucitronCookiesNumber');

            if (div === null) {
                return;
            }

            if (div.style.display !== 'block') {
                tarteaucitron.cookie.number();
                div.style.display = 'block';
                togglediv.setAttribute("aria-expanded", "true");
                tarteaucitron.userInterface.jsSizing('cookie');
                tarteaucitron.userInterface.css('tarteaucitron', 'display', 'none');
                tarteaucitron.userInterface.css('tarteaucitronBack', 'display', 'block');
                tarteaucitron.fallback(['tarteaucitronInfoBox'], function (elem) {
                    elem.style.display = 'none';
                }, true);
            } else {
                div.style.display = 'none';
                togglediv.setAttribute("aria-expanded", "false");
                tarteaucitron.userInterface.css('tarteaucitron', 'display', 'none');
                tarteaucitron.userInterface.css('tarteaucitronBack', 'display', 'none');
            }
        },
        "toggle": function (id, closeClass) {
            "use strict";
            var div = document.getElementById(id);

            if (div === null) {
                return;
            }

            if (closeClass !== undefined) {
                tarteaucitron.fallback([closeClass], function (elem) {
                    if (elem.id !== id) {
                        elem.style.display = 'none';
                    }
                }, true);
            }

            if (div.style.display !== 'block') {
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        },
        "order": function (id) {
            "use strict";
            var main = document.getElementById('tarteaucitronServices_' + id),
                allDivs,
                store = [],
                i;

            if (main === null) {
                return;
            }

            allDivs = main.childNodes;

            if (typeof Array.prototype.map === 'function' && typeof Enumerable === 'undefined') {
                Array.prototype.map.call(main.children, Object).sort(function (a, b) {
                //var mainChildren = Array.from(main.children);
                //mainChildren.sort(function (a, b) {
                    if (tarteaucitron.services[a.id.replace(/Line/g, '')].name > tarteaucitron.services[b.id.replace(/Line/g, '')].name) { return 1; }
                    if (tarteaucitron.services[a.id.replace(/Line/g, '')].name < tarteaucitron.services[b.id.replace(/Line/g, '')].name) { return -1; }
                    return 0;
                }).forEach(function (element) {
                    main.appendChild(element);
                });
            }
        },
        "jsSizing": function (type) {
            "use strict";
            var scrollbarMarginRight = 10,
                scrollbarWidthParent,
                scrollbarWidthChild,
                servicesHeight,
                e = window,
                a = 'inner',
                windowInnerHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
                mainTop,
                mainHeight,
                closeButtonHeight,
                headerHeight,
                cookiesListHeight,
                cookiesCloseHeight,
                cookiesTitleHeight,
                paddingBox,
                alertSmallHeight,
                cookiesNumberHeight;

            if (type === 'box') {
                if (document.getElementById('tarteaucitronAlertSmall') !== null && document.getElementById('tarteaucitronCookiesNumber') !== null) {

                    // reset
                    tarteaucitron.userInterface.css('tarteaucitronCookiesNumber', 'padding', '0px 10px');

                    // calculate
                    alertSmallHeight = document.getElementById('tarteaucitronAlertSmall').offsetHeight;
                    cookiesNumberHeight = document.getElementById('tarteaucitronCookiesNumber').offsetHeight;
                    paddingBox = (alertSmallHeight - cookiesNumberHeight) / 2;

                    // apply
                    tarteaucitron.userInterface.css('tarteaucitronCookiesNumber', 'padding', paddingBox + 'px 10px');
                }
            } else if (type === 'main') {

                // get the real window width for media query
                if (window.innerWidth === undefined) {
                    a = 'client';
                    e = document.documentElement || document.body;
                }

                // height of the services list container
                if (document.getElementById('tarteaucitron') !== null && document.getElementById('tarteaucitronClosePanel') !== null && document.getElementById('tarteaucitronMainLineOffset') !== null) {

                    // reset
                    tarteaucitron.userInterface.css('tarteaucitronServices', 'height', 'auto');

                    // calculate
                    mainHeight = document.getElementById('tarteaucitron').offsetHeight;
                    closeButtonHeight = document.getElementById('tarteaucitronClosePanel').offsetHeight;

                    // apply
                    servicesHeight = (mainHeight - closeButtonHeight + 2);
                    tarteaucitron.userInterface.css('tarteaucitronServices', 'height', servicesHeight + 'px');
                    tarteaucitron.userInterface.css('tarteaucitronServices', 'overflow-x', 'auto');
                }

                // align the main allow/deny button depending on scrollbar width
                if (document.getElementById('tarteaucitronServices') !== null && document.getElementById('tarteaucitronScrollbarChild') !== null) {

                    // media query
                    if (e[a + 'Width'] <= 479) {
                        //tarteaucitron.userInterface.css('tarteaucitronScrollbarAdjust', 'marginLeft', '11px');
                    } else if (e[a + 'Width'] <= 767) {
                        scrollbarMarginRight = 12;
                    }

                    scrollbarWidthParent = document.getElementById('tarteaucitronServices').offsetWidth;
                    scrollbarWidthChild = document.getElementById('tarteaucitronScrollbarChild').offsetWidth;
                    //tarteaucitron.userInterface.css('tarteaucitronScrollbarAdjust', 'marginRight', ((scrollbarWidthParent - scrollbarWidthChild) + scrollbarMarginRight) + 'px');
                }

                // center the main panel
                if (document.getElementById('tarteaucitron') !== null) {

                    // media query
                    if (e[a + 'Width'] <= 767) {
                        mainTop = 0;
                    } else {
                        mainTop = ((windowInnerHeight - document.getElementById('tarteaucitron').offsetHeight) / 2) - 21;
                    }

                    if (document.getElementById('tarteaucitronMainLineOffset') !== null) {
                        if (document.getElementById('tarteaucitron').offsetHeight < (windowInnerHeight / 2)) {
                            mainTop -= document.getElementById('tarteaucitronMainLineOffset').offsetHeight;
                        }
                    }

                    // correct
                    if (mainTop < 0) {
                        mainTop = 0;
                    }

                    // apply
                    tarteaucitron.userInterface.css('tarteaucitron', 'top', mainTop + 'px');
                }


            } else if (type === 'cookie') {

                // put cookies list at bottom
                if (document.getElementById('tarteaucitronAlertSmall') !== null) {
                    tarteaucitron.userInterface.css('tarteaucitronCookiesListContainer', 'bottom', (document.getElementById('tarteaucitronAlertSmall').offsetHeight) + 'px');
                }

                // height of cookies list
                if (document.getElementById('tarteaucitronCookiesListContainer') !== null) {

                    // reset
                    tarteaucitron.userInterface.css('tarteaucitronCookiesList', 'height', 'auto');

                    // calculate
                    cookiesListHeight = document.getElementById('tarteaucitronCookiesListContainer').offsetHeight;
                    cookiesCloseHeight = document.getElementById('tarteaucitronClosePanelCookie').offsetHeight;
                    cookiesTitleHeight = document.getElementById('tarteaucitronCookiesTitle').offsetHeight;

                    // apply
                    tarteaucitron.userInterface.css('tarteaucitronCookiesList', 'height', (cookiesListHeight - cookiesCloseHeight - cookiesTitleHeight - 2) + 'px');
                }
            }
        }
    },
    "cookie": {
        "owner": {},
        "create": function (key, status) {
            "use strict";

            if (tarteaucitronForceExpire !== '') {
                // The number of day(s)/hour(s) can't be higher than 1 year
                if ((tarteaucitronExpireInDay && tarteaucitronForceExpire < 365) || (!tarteaucitronExpireInDay && tarteaucitronForceExpire < 8760)) {
                    if (tarteaucitronExpireInDay) {
                        // Multiplication to tranform the number of days to milliseconds
                        timeExpire = tarteaucitronForceExpire * 86400000;
                    } else {
                        // Multiplication to tranform the number of hours to milliseconds
                        timeExpire = tarteaucitronForceExpire * 3600000;
                    }
                }
            }

            var d = new Date(),
                time = d.getTime(),
                expireTime = time + timeExpire, // 365 days
                regex = new RegExp("!" + key + "=(wait|true|false)", "g"),
                cookie = tarteaucitron.cookie.read().replace(regex, ""),
                value = tarteaucitron.parameters.cookieName + '=' + cookie + '!' + key + '=' + status,
                domain = (tarteaucitron.parameters.cookieDomain !== undefined && tarteaucitron.parameters.cookieDomain !== '') ? '; domain=' + tarteaucitron.parameters.cookieDomain : '',
                secure = location.protocol === 'https:' ? '; Secure' : '';

            d.setTime(expireTime);
            document.cookie = value + '; expires=' + d.toGMTString() + '; path=/' + domain + secure + '; samesite=lax';
        },
        "read": function () {
            "use strict";
            var nameEQ = tarteaucitron.parameters.cookieName + "=",
                ca = document.cookie.split(';'),
                i,
                c;

            for (i = 0; i < ca.length; i += 1) {
                c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
            return '';
        },
        "purge": function (arr) {
            "use strict";
            var i;

            for (i = 0; i < arr.length; i += 1) {

                var rgxpCookie = new RegExp("^(.*;)?\\s*" + arr[i] + "\\s*=\\s*[^;]+(.*)?$");
                if (document.cookie.match(rgxpCookie)) {
                    document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/;';
                    document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/; domain=.' + location.hostname + ';';
                    document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/; domain=.' + location.hostname.split('.').slice(-2).join('.') + ';';
                }
            }
        },
        "checkCount": function (key) {
            "use strict";
            var arr = tarteaucitron.services[key].cookies,
                nb = arr.length,
                nbCurrent = 0,
                html = '',
                i,
                status = document.cookie.indexOf(key + '=true');

            if (status >= 0 && nb === 0) {
                html += tarteaucitron.lang.useNoCookie;
            } else if (status >= 0) {
                for (i = 0; i < nb; i += 1) {
                    if (document.cookie.indexOf(arr[i] + '=') !== -1) {
                        nbCurrent += 1;
                        if (tarteaucitron.cookie.owner[arr[i]] === undefined) {
                            tarteaucitron.cookie.owner[arr[i]] = [];
                        }
                        if (tarteaucitron.cookie.crossIndexOf(tarteaucitron.cookie.owner[arr[i]], tarteaucitron.services[key].name) === false) {
                            tarteaucitron.cookie.owner[arr[i]].push(tarteaucitron.services[key].name);
                        }
                    }
                }

                if (nbCurrent > 0) {
                    html += tarteaucitron.lang.useCookieCurrent + ' ' + nbCurrent + ' cookie';
                    if (nbCurrent > 1) {
                        html += 's';
                    }
                    html += '.';
                } else {
                    html += tarteaucitron.lang.useNoCookie;
                }
            } else if (nb === 0) {
                html = tarteaucitron.lang.noCookie;
            } else {
                html += tarteaucitron.lang.useCookie + ' ' + nb + ' cookie';
                if (nb > 1) {
                    html += 's';
                }
                html += '.';
            }

            if (document.getElementById('tacCL' + key) !== null) {
                document.getElementById('tacCL' + key).innerHTML = html;
            }
        },
        "crossIndexOf": function (arr, match) {
            "use strict";
            var i;
            for (i = 0; i < arr.length; i += 1) {
                if (arr[i] === match) {
                    return true;
                }
            }
            return false;
        },
        "number": function () {
            "use strict";
            var cookies = document.cookie.split(';'),
                nb = (document.cookie !== '') ? cookies.length : 0,
                html = '',
                i,
                name,
                namea,
                nameb,
                c,
                d,
                s = (nb > 1) ? 's' : '',
                savedname,
                regex = /^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i,
                regexedDomain = (tarteaucitron.cdn.match(regex) !== null) ? tarteaucitron.cdn.match(regex)[1] : tarteaucitron.cdn,
                host = (tarteaucitron.domain !== undefined) ? tarteaucitron.domain : regexedDomain;

            cookies = cookies.sort(function (a, b) {
                namea = a.split('=', 1).toString().replace(/ /g, '');
                nameb = b.split('=', 1).toString().replace(/ /g, '');
                c = (tarteaucitron.cookie.owner[namea] !== undefined) ? tarteaucitron.cookie.owner[namea] : '0';
                d = (tarteaucitron.cookie.owner[nameb] !== undefined) ? tarteaucitron.cookie.owner[nameb] : '0';
                if (c + a > d + b) { return 1; }
                if (c + a < d + b) { return -1; }
                return 0;
            });

            if (document.cookie !== '') {
                for (i = 0; i < nb; i += 1) {
                    name = cookies[i].split('=', 1).toString().replace(/ /g, '');
                    if (tarteaucitron.cookie.owner[name] !== undefined && tarteaucitron.cookie.owner[name].join(' // ') !== savedname) {
                        savedname = tarteaucitron.cookie.owner[name].join(' // ');
                        html += '<div class="tarteaucitronHidden">';
                        html += '     <span class="tarteaucitronTitle tarteaucitronH3" role="heading" aria-level="3">';
                        html += '        ' + tarteaucitron.cookie.owner[name].join(' // ');
                        html += '    </span>';
                        html += '</div><ul class="cookie-list">';
                    } else if (tarteaucitron.cookie.owner[name] === undefined && host !== savedname) {
                        savedname = host;
                        html += '<div class="tarteaucitronHidden">';
                        html += '     <span class="tarteaucitronTitle tarteaucitronH3" role="heading" aria-level="3">';
                        html += '        ' + host;
                        html += '    </span>';
                        html += '</div><ul class="cookie-list">';
                    }
                    html += '<li class="tarteaucitronCookiesListMain">';
                    html += '    <div class="tarteaucitronCookiesListLeft"><button type="button" class="purgeBtn" data-cookie="' + tarteaucitron.fixSelfXSS(cookies[i].split('=', 1)) + '"><strong>&times;</strong></button> <strong>' + tarteaucitron.fixSelfXSS(name) + '</strong>';
                    html += '    </div>';
                    html += '    <div class="tarteaucitronCookiesListRight">' + tarteaucitron.fixSelfXSS(cookies[i].split('=').slice(1).join('=')) + '</div>';
                    html += '</li>';
                }
                html += '</ul>';
            } else {
                html += '<div class="tarteaucitronCookiesListMain">';
                html += '    <div class="tarteaucitronCookiesListLeft"><strong>-</strong></div>';
                html += '    <div class="tarteaucitronCookiesListRight"></div>';
                html += '</div>';
            }

            html += '<div class="tarteaucitronHidden tarteaucitron-spacer-20"></div>';

            if (document.getElementById('tarteaucitronCookiesList') !== null) {
                document.getElementById('tarteaucitronCookiesList').innerHTML = html;
            }

            if (document.getElementById('tarteaucitronCookiesNumber') !== null) {
                document.getElementById('tarteaucitronCookiesNumber').innerHTML = nb;
                document.getElementById('tarteaucitronCookiesNumber').setAttribute("aria-label", nb + ' cookie' + s + " - " + tarteaucitron.lang.toggleInfoBox);
                document.getElementById('tarteaucitronCookiesNumber').setAttribute("title", nb + ' cookie' + s + " - " + tarteaucitron.lang.toggleInfoBox);
            }

            if (document.getElementById('tarteaucitronCookiesNumberBis') !== null) {
                document.getElementById('tarteaucitronCookiesNumberBis').innerHTML = nb + ' cookie' + s;
            }

            var purgeBtns = document.getElementsByClassName("purgeBtn");
            for (i = 0; i < purgeBtns.length; i++) {
                tarteaucitron.addClickEventToElement(purgeBtns[i], function () {
                    tarteaucitron.cookie.purge([this.dataset.cookie]);
                    tarteaucitron.cookie.number();
                    tarteaucitron.userInterface.jsSizing('cookie');
                    return false;
                });
            }

            for (i = 0; i < tarteaucitron.job.length; i += 1) {
                tarteaucitron.cookie.checkCount(tarteaucitron.job[i]);
            }
        }
    },
    "fixSelfXSS": function(html) {
        return html.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    },
    "getLanguage": function () {
        "use strict";

        var availableLanguages = 'ar,bg,ca,cn,cs,da,de,et,el,en,es,fi,fr,hu,it,ja,lt,lv,nl,no,oc,pl,pt,ro,ru,se,sk,sv,tr,uk,vi,zh',
            defaultLanguage = 'en';

        if (tarteaucitronForceLanguage !== '') {
            if (availableLanguages.indexOf(tarteaucitronForceLanguage) !== -1) {
                return tarteaucitronForceLanguage;
            }
        }

        // get the html lang
        if (availableLanguages.indexOf(document.documentElement.getAttribute("lang")) !== -1) {
            return document.documentElement.getAttribute("lang");
        }

        if (!navigator) { return defaultLanguage; }

        var lang = navigator.language || navigator.browserLanguage ||
                navigator.systemLanguage || navigator.userLang || null,
            userLanguage = lang ? lang.substr(0, 2) : null;

        if (availableLanguages.indexOf(userLanguage) !== -1) {
            return userLanguage;
        }

        return defaultLanguage;
    },
    "getLocale": function () {
        "use strict";
        if (!navigator) { return 'en_US'; }

        var lang = navigator.language || navigator.browserLanguage ||
                navigator.systemLanguage || navigator.userLang || null,
            userLanguage = lang ? lang.substr(0, 2) : null;

        if (userLanguage === 'fr') {
            return 'fr_FR';
        } else if (userLanguage === 'en') {
            return 'en_US';
        } else if (userLanguage === 'de') {
            return 'de_DE';
        } else if (userLanguage === 'es') {
            return 'es_ES';
        } else if (userLanguage === 'it') {
            return 'it_IT';
        } else if (userLanguage === 'pt') {
            return 'pt_PT';
        } else if (userLanguage === 'nl') {
            return 'nl_NL';
        } else if (userLanguage === 'el') {
            return 'el_EL';
        } else {
            return 'en_US';
        }
    },
    "addScript": function (url, id, callback, execute, attrName, attrVal, internal) {
        "use strict";
        var script,
            done = false;

        if (execute === false) {
            if (typeof callback === 'function') {
                callback();
            }
        } else {
            script = document.createElement('script');
            script.id = (id !== undefined) ? id : '';
            script.async = true;
            script.src = url;

            if (attrName !== undefined && attrVal !== undefined) {
                script.setAttribute(attrName, attrVal);
            }

            if (typeof callback === 'function') {
                if ( !tarteaucitron.parameters.useExternalJs || !internal ) {
                    script.onreadystatechange = script.onload = function () {
                        var state = script.readyState;
                        if (!done && (!state || /loaded|complete/.test(state))) {
                            done = true;
                            callback();
                        }
                    };
                } else {
                    callback();
                }
            }

            if ( !tarteaucitron.parameters.useExternalJs || !internal ) {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        }
    },
    "addInternalScript": function (url, id, callback, execute, attrName, attrVal) {
        tarteaucitron.addScript(url, id, callback, execute, attrName, attrVal, true);
    },
    "checkIfExist": function (elemId) {
        "use strict";
        return document.getElementById(elemId) !== null && document.getElementById(elemId).offsetWidth !== 0 && document.getElementById(elemId).offsetHeight !== 0;
    },
    "makeAsync": {
        "antiGhost": 0,
        "buffer": '',
        "init": function (url, id) {
            "use strict";
            var savedWrite = document.write,
                savedWriteln = document.writeln;

            document.write = function (content) {
                tarteaucitron.makeAsync.buffer += content;
            };
            document.writeln = function (content) {
                tarteaucitron.makeAsync.buffer += content.concat("\n");
            };

            setTimeout(function () {
                document.write = savedWrite;
                document.writeln = savedWriteln;
            }, 20000);

            tarteaucitron.makeAsync.getAndParse(url, id);
        },
        "getAndParse": function (url, id) {
            "use strict";
            if (tarteaucitron.makeAsync.antiGhost > 9) {
                tarteaucitron.makeAsync.antiGhost = 0;
                return;
            }
            tarteaucitron.makeAsync.antiGhost += 1;
            tarteaucitron.addInternalScript(url, '', function () {
                if (document.getElementById(id) !== null) {
                    document.getElementById(id).innerHTML += "<span class='tarteaucitron-display-none'>&nbsp;</span>" + tarteaucitron.makeAsync.buffer;
                    tarteaucitron.makeAsync.buffer = '';
                    tarteaucitron.makeAsync.execJS(id);
                }
            });
        },
        "execJS": function (id) {
            /* not strict because third party scripts may have errors */
            var i,
                scripts,
                childId,
                type;

            if (document.getElementById(id) === null) {
                return;
            }

            scripts = document.getElementById(id).getElementsByTagName('script');
            for (i = 0; i < scripts.length; i += 1) {
                type = (scripts[i].getAttribute('type') !== null) ? scripts[i].getAttribute('type') : '';
                if (type === '') {
                    type = (scripts[i].getAttribute('language') !== null) ? scripts[i].getAttribute('language') : '';
                }
                if (scripts[i].getAttribute('src') !== null && scripts[i].getAttribute('src') !== '') {
                    childId = id + Math.floor(Math.random() * 99999999999);
                    document.getElementById(id).innerHTML += '<div id="' + childId + '"></div>';
                    tarteaucitron.makeAsync.getAndParse(scripts[i].getAttribute('src'), childId);
                } else if (type.indexOf('javascript') !== -1 || type === '') {
                    eval(scripts[i].innerHTML);
                }
            }
        }
    },
    "fallback": function (matchClass, content, noInner) {
        "use strict";
        var elems = document.getElementsByTagName('*'),
            i,
            index = 0;

        for (i in elems) {
            if (elems[i] !== undefined) {
                for (index = 0; index < matchClass.length; index += 1) {
                    if ((' ' + elems[i].className + ' ')
                            .indexOf(' ' + matchClass[index] + ' ') > -1) {
                        if (typeof content === 'function') {
                            if (noInner === true) {
                                content(elems[i]);
                            } else {
                                elems[i].innerHTML = content(elems[i]);
                            }
                        } else {
                            elems[i].innerHTML = content;
                        }
                    }
                }
            }
        }
    },
    "engage": function (id) {
        "use strict";
        var html = '',
            r = Math.floor(Math.random() * 100000),
            engage = tarteaucitron.services[id].name + ' ' + tarteaucitron.lang.fallback;

        if (tarteaucitron.lang['engage-' + id] !== undefined) {
            engage = tarteaucitron.lang['engage-' + id];
        }

        html += '<div class="tac_activate tac_activate_' + id + '">';
        html += '   <div class="tac_float">';
        html += '      ' + engage;
        html += '      <button type="button" class="tarteaucitronAllow" id="Eng' + r + 'ed' + id + '">';
        html += '          <span class="tarteaucitronCheck" aria-hidden="true"></span> ' + tarteaucitron.lang.allow;
        html += '       </button>';
        html += '   </div>';
        html += '</div>';

        return html;
    },
    "extend": function (a, b) {
        "use strict";
        var prop;
        for (prop in b) {
            if (b.hasOwnProperty(prop)) {
                a[prop] = b[prop];
            }
        }
    },
    "proTemp": '',
    "proTimer": function () {
        "use strict";
        setTimeout(tarteaucitron.proPing, 500);
    },
    "pro": function (list) {
        "use strict";
        tarteaucitron.proTemp += list;
        clearTimeout(tarteaucitron.proTimer);
        tarteaucitron.proTimer = setTimeout(tarteaucitron.proPing, 500);
    },
    "proPing": function () {
        "use strict";
        if (tarteaucitron.uuid !== '' && tarteaucitron.uuid !== undefined && tarteaucitron.proTemp !== '' && tarteaucitronStatsEnabled) {
            var div = document.getElementById('tarteaucitronPremium'),
                timestamp = new Date().getTime(),
                url = 'https://tarteaucitron.io/log/?';

            if (div === null) {
                return;
            }

            url += 'account=' + tarteaucitron.uuid + '&';
            url += 'domain=' + tarteaucitron.domain + '&';
            url += 'status=' + encodeURIComponent(tarteaucitron.proTemp) + '&';
            url += '_time=' + timestamp;

            div.innerHTML = '<img src="' + url + '" class="tarteaucitron-display-none" alt="" />';

            tarteaucitron.proTemp = '';
        }

        tarteaucitron.cookie.number();
    },
    "AddOrUpdate" : function(source, custom){
        /**
         Utility function to Add or update the fields of obj1 with the ones in obj2
         */
        for(var key in custom){
            if(custom[key] instanceof Object){
                source[key] = tarteaucitron.AddOrUpdate(source[key], custom[key]);
            }else{
                source[key] = custom[key];
            }
        }
        return source;
    },
    "getElemWidth": function(elem) {
        return elem.getAttribute('width') || elem.clientWidth;
    },
    "getElemHeight": function(elem) {
        return elem.getAttribute('height') || elem.clientHeight;
    },
    "getElemAttr": function (elem, attr) {
        return elem.getAttribute('data-' + attr) || elem.getAttribute(attr);
    },
    "addClickEventToId": function (elemId, func) {
        tarteaucitron.addClickEventToElement(document.getElementById(elemId), func);
    },
    "addClickEventToElement": function (e, func) {
        if (e) {
            if (e.addEventListener) {
                e.addEventListener("click", func);
            } else {
                e.attachEvent("onclick", func);
            }
        }
    },
    "triggerJobsAfterAjaxCall": function() {
        tarteaucitron.job.forEach(function(e) { tarteaucitron.job.push(e) });
        var i;
        var allowBtns = document.getElementsByClassName("tarteaucitronAllow");
        for (i = 0; i < allowBtns.length; i++) {
            tarteaucitron.addClickEventToElement(allowBtns[i], function () {
                tarteaucitron.userInterface.respond(this, true);
            });
        }
        var denyBtns = document.getElementsByClassName("tarteaucitronDeny");
        for (i = 0; i < denyBtns.length; i++) {
            tarteaucitron.addClickEventToElement(denyBtns[i], function () {
                tarteaucitron.userInterface.respond(this, false);
            });
        }
    }
};
;
/*global tarteaucitron, ga, Shareaholic, stLight, clicky, top, google, Typekit, FB, ferankReady, IN, stButtons, twttr, PCWidget*/
/*jslint regexp: true, nomen: true*/

// generic iframe
tarteaucitron.services.iframe = {
    "key": "iframe",
    "type": "other",
    "name": "Web content",
    "uri": "",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_iframe'], function (x) {
            var frame_title = (tarteaucitron.getElemAttr(x,"title")) ? tarteaucitron.fixSelfXSS(tarteaucitron.getElemAttr(x,"title")) : '',
                width = tarteaucitron.getElemAttr(x,"width"),
                height = tarteaucitron.getElemAttr(x,"height"),
                allowfullscreen = tarteaucitron.getElemAttr(x,"allowfullscreen"),
                url = tarteaucitron.getElemAttr(x,"url");

            return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="no" allowtransparency' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'iframe';
        tarteaucitron.fallback(['tac_iframe'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem,'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem,'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// kwanko
tarteaucitron.services.kwanko = {
    "key": "kwanko",
    "type": "ads",
    "name": "Kwanko",
    "uri": "https://www.kwanko.com/fr/rgpd/politique-gestion-donnees/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_kwanko'], function (x) {
            var mclic = x.getAttribute("data-mclic");

            return '<img src="https://action.metaffiliation.com/trk.php?mclic=' + mclic + '" width="1" height="1" border="0" />';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'kwanko';
        tarteaucitron.fallback(['tac_kwanko'], function (elem) {
            return tarteaucitron.engage(id);
        });
    }
};

// leadforensics
tarteaucitron.services.leadforensics = {
    "key": "leadforensics",
    "type": "ads",
    "name": "Lead Forensics",
    "uri": "https://www.leadforensics.com/cookie-policy/",
    "needConsent": true,
    "cookies": ['ifuuid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.leadforensicsId === undefined) {
            return;
        }

        tarteaucitron.addScript('https://secure.team8save.com/js/sc/'+ tarteaucitron.user.leadforensicsId +'.js');
    }
};

// ubib
tarteaucitron.services.ubib = {
    "key": "ubib",
    "type": "support",
    "name": "Ubib Chatbot",
    "uri": "https://ubib.libanswers.com/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.ubibId === undefined || tarteaucitron.user.ubibHash === undefined) {
            return;
        }

        tarteaucitron.addScript('https://' + tarteaucitron.user.ubibId + '.libanswers.com/load_chat.php?hash=' + tarteaucitron.user.ubibHash);
    }
};

// wysistathightrack
tarteaucitron.services.wysistathightrack = {
    "key": "wysistathightrack",
    "type": "analytic",
    "name": "Wysistat (privacy by design)",
    "uri": "https://www.wysistat.net/webanalytics/exemption-cnil/",
    "needConsent": false,
    "cookies": ['wysistat'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.wysistatNom === undefined) {
            return;
        }

        window._wsq = window._wsq || [];
        window._wsq.push(['_setNom', tarteaucitron.user.wysistatNom]);
        window._wsq.push(['_wysistat']);

        tarteaucitron.addScript('https://www.wysistat.com/ws.jsa');
    }
};

// robofabrica
tarteaucitron.services.robofabrica = {
    "key": "robofabrica",
    "type": "support",
    "name": "Robo Fabrica Chatbot",
    "uri": "https://robofabrica.tech/charte-vie-privee/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.robofabricaUuid === undefined) {
            return;
        }

        tarteaucitron.addScript('https://app.robofabrica.tech/widget/script', 'inceptive-cw-script', function() {

            document.getElementById('inceptive-cw-script').setAttribute('unique-url', tarteaucitron.user.robofabricaUuid);
            document.getElementById('inceptive-cw-script').setAttribute('label', 'start');
            document.getElementById('inceptive-cw-script').setAttribute('launch-btn-id', 'inceptive-cw-launch');
            document.getElementById('inceptive-cw-script').setAttribute('chat-server-url', 'https://app.robofabrica.tech:443');

        });
    }
};

// trustpilot
tarteaucitron.services.trustpilot = {
    "key": "trustpilot",
    "type": "other",
    "name": "Trustpilot",
    "uri": "https://fr.legal.trustpilot.com/for-reviewers/end-user-privacy-terms",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['trustpilot-widget'], '');
        tarteaucitron.addScript('https://widget.trustpilot.com/bootstrap/v5/tp.widget.sync.bootstrap.min.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'trustpilot';
        tarteaucitron.fallback(['trustpilot-widget'], function (elem) {
            elem.style.width = elem.getAttribute('data-style-width');
            elem.style.height = elem.getAttribute('data-style-height');
            return tarteaucitron.engage(id);
        });
    }
};

// snapchat
tarteaucitron.services.snapchat = {
    "key": "snapchat",
    "type": "analytic",
    "name": "Snapchat",
    "uri": "https://snap.com/fr-FR/privacy/privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.snapchatId === undefined || tarteaucitron.user.snapchatEmail === undefined) {
            return;
        }

	var a = window.snaptr = function() {
		a.handleRequest ? a.handleRequest.apply(a, arguments) : a.queue.push(arguments)
	};
	a.queue = [];
        window.snaptr('init', tarteaucitron.user.snapchatId, {
	    'user_email': tarteaucitron.user.snapchatEmail
        });
        window.snaptr('track', 'PAGE_VIEW');

        tarteaucitron.addScript('https://sc-static.net/scevent.min.js');
	    
	if (typeof tarteaucitron.user.snapchatMore === 'function') {
            tarteaucitron.user.snapchatMore();
        }
    }
};

// antvoice
tarteaucitron.services.antvoice = {
    "key": "antvoice",
    "type": "ads",
    "name": "antvoice",
    "uri": "https://www.antvoice.com/fr/privacy-policy/",
    "needConsent": true,
    "cookies": ['antvoice'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.antvoiceId === undefined) {
            return;
        }

        window.avDataLayer = window.avDataLayer || [];
        window.avtag = window.avtag || function(_cmd,_p) {
            window.avDataLayer.push({cmd:_cmd,p:_p});
        }
        window.avtag('setConsent', {consent:true});
        window.avtag('init', {id: tarteaucitron.user.antvoiceId});

        tarteaucitron.addScript('https://static.avads.net/avtag.min.js');
    }
};

// plausible
tarteaucitron.services.plausible = {
    "key": "plausible",
    "type": "analytic",
    "name": "Plausible",
    "uri": "https://plausible.io/privacy",
    "needConsent": false,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.plausibleDomain === undefined) {
            return;
        }

        tarteaucitron.addScript('https://plausible.io/js/script.js', '', '', '', 'data-domain', tarteaucitron.user.plausibleDomain);
    }
};

// videas
tarteaucitron.services.videas = {
    "key": "videas",
    "type": "video",
    "name": "Videas",
    "uri": "https://videas.fr/fr/legal",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_videas'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Videas iframe'),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                id = x.getAttribute("data-id"),
                allowfullscreen = x.getAttribute("allowfullscreen");

            return '<iframe title="' + frame_title + '" src="https://app.videas.fr/embed/' + id + '/" width="' + width + '" height="' + height + '" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'videas';
        tarteaucitron.fallback(['tac_videas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// myfeelback
tarteaucitron.services.myfeelback = {
    "key": "myfeelback",
    "type": "api",
    "name": "MyFeelBack (Skeepers)",
    "uri": "https://help.myfeelback.com/fr/quels-sont-les-cookies-d%C3%A9pos%C3%A9s-par-un-dispositif-de-collecte-myfeelback",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.myfeelbackId === undefined) {
            return;
        }

        window._Mfb_useCookie = true;
        window._Mfb_ud = {
            var1: undefined,
            var2: undefined,
            varN: undefined,
            _context: {
                lang: undefined,
                privacyMode: false,
                _page: {
                    url: location.pathname,
                    storageDuration: 30
                }
            }
        };
        tarteaucitron.addScript('https://actorssl-5637.kxcdn.com/actor/'+tarteaucitron.user.myfeelbackId+'/action', 'MFBActor');
    }
};

// arcio
tarteaucitron.services.arcio = {
    "key": "arcio",
    "type": "api",
    "name": "Arc.io",
    "uri": "https://arc.io/about",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.arcId === undefined) {
            return;
        }

        tarteaucitron.addScript('https://arc.io/widget.min.js#'+tarteaucitron.user.arcId);
    }
};

// doubleclick
tarteaucitron.services.doubleclick = {
    "key": "doubleclick",
    "type": "ads",
    "name": "DoubleClick",
    "uri": "https://support.google.com/admanager/answer/2839090",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['doubleclick_container'], function (x) {
            var id1 = tarteaucitron.getElemAttr(x, "data-id1"),
                id2 = tarteaucitron.getElemAttr(x, "data-id2"),
                type = tarteaucitron.getElemAttr(x, "data-type"),
                cat = tarteaucitron.getElemAttr(x, "data-cat"),
                item = tarteaucitron.getElemAttr(x, "data-item"),
                quantity = tarteaucitron.getElemAttr(x, "data-quantity"),
                price = tarteaucitron.getElemAttr(x, "data-price"),
                postage = tarteaucitron.getElemAttr(x, "data-postage"),
                seller = tarteaucitron.getElemAttr(x, "data-seller"),
                gdpr = tarteaucitron.getElemAttr(x, "data-gdpr"),
                gdpr_consent = tarteaucitron.getElemAttr(x, "data-gdpr-consent"),
                ord = tarteaucitron.getElemAttr(x, "data-ord"),
                num = tarteaucitron.getElemAttr(x, "data-num");

            return '<iframe src="https://'+id1+'.fls.doubleclick.net/activityi;src='+id2+';type='+type+';cat='+cat+';item='+item+';quantity='+quantity+';price='+price+';postage='+postage+';seller='+seller+';gdpr='+gdpr+';gdpr_consent='+gdpr_consent+';num='+num+';ord='+ord+'?" width="1" height="1" frameborder="0" style="display:none"></iframe>';
        });
    }
};

// userpilot
tarteaucitron.services.userpilot = {
    "key": "userpilot",
    "type": "analytic",
    "name": "UserPilot",
    "uri": "https://userpilot.com/privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.userpilotToken === undefined) {
            return;
        }

        window.userpilotSettings = {token: tarteaucitron.user.userpilotToken};
        tarteaucitron.addScript('https://js.userpilot.io/sdk/latest.js');
    }
};

tarteaucitron.services.piwikpro = {
    "key": "piwikpro",
    "type": "analytic",
    "name": "Piwik Pro",
    "uri": "https://piwik.pro/privacy-policy/",
    "needConsent": true,
    "cookies": ['_pk_ref', '_pk_cvar', '_pk_id', '_pk_ses', '_pk_hsr', 'piwik_ignore', '_pk_uid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.piwikProId === undefined) {
            return;
        }

        window['dataLayer'] = window['dataLayer'] || [], window['dataLayer'].push({
            start: (new Date).getTime(),
            event: "stg.start"
        });

        function stgCreateCookie(a, b, c) {
           var d = "";
           if (c) {
              var e = new Date;
              e.setTime(e.getTime() + 24 * c * 60 * 60 * 1e3), d = "; expires=" + e.toUTCString()
           }
           document.cookie = a + "=" + b + d + "; path=/"
        }

        var isStgDebug = (window.location.href.match("stg_debug") || document.cookie.match("stg_debug")) && !window.location.href.match("stg_disable_debug");
        stgCreateCookie("stg_debug", isStgDebug ? 1 : "", isStgDebug ? 14 : -1);
        var qP = [];

        var qPString = qP.length > 0 ? ("?" + qP.join("&")) : "";
        tarteaucitron.addScript('https://carsatse.containers.piwik.pro/'+tarteaucitron.user.piwikProId+'.js'+qPString);

        ! function(a, n, i) {
           a[n] = a[n] || {};
           for (var c = 0; c < i.length; c++) ! function(i) {
              a[n][i] = a[n][i] || {}, a[n][i].api = a[n][i].api || function() {
                 var a = [].slice.call(arguments, 0);
                 "string" == typeof a[0] && window['dataLayer'].push({
                    event: n + "." + i + ":" + a[0],
                    parameters: [].slice.call(arguments, 1)
                 })
              }
           }(i[c])
        }(window, "ppms", ["tm", "cm"]);
    }
};

// pinterestpixel
tarteaucitron.services.pinterestpixel = {
    "key": "pinterestpixel",
    "type": "ads",
    "name": "Pinterest Pixel",
    "uri": "https://help.pinterest.com/fr/business/article/track-conversions-with-pinterest-tag",
    "needConsent": true,
    "cookies": ['_pinterest_sess', '_pinterest_ct', '_pinterest_ct_mw', '_pinterest_ct_rt', '_epik', '_derived_epik', '_pin_unauth', '_pinterest_ct_ua'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.pinterestpixelId === undefined) {
            return;
        }

        if (!window.pintrk) {
            window.pintrk = function () {
                window.pintrk.queue.push(Array.prototype.slice.call(arguments));
            };

            var n = window.pintrk;
            n.queue = [];
            n.version = "3.0";

            tarteaucitron.addScript('https://s.pinimg.com/ct/core.js', '', function () {
                window.pintrk('load', tarteaucitron.user.pinterestpixelId);
                window.pintrk('page');
            });
        }
    }
};

// elfsight
tarteaucitron.services.elfsight = {
    "key": "elfsight",
    "type": "support",
    "name": "Elfsight",
    "uri": "https://elfsight.com/privacy-policy/",
    "needConsent": true,
    "cookies": ['__cfduid', '_p_hfp_client_id', 'session_id'],
    "js": function () {
        "use strict";

        tarteaucitron.addScript('https://apps.elfsight.com/p/platform.js');
    }
};

// plezi
tarteaucitron.services.plezi = {
    "key": "plezi",
    "type": "analytic",
    "name": "Plezi",
    "uri": "https://www.plezi.co/fr/mentions-legales/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.pleziTenant === undefined || tarteaucitron.user.pleziTw === undefined) {
            return;
        }

        tarteaucitron.addScript('https://app.plezi.co/scripts/ossleads_analytics.js?tenant=' + tarteaucitron.user.pleziTenant + '&tw=' + tarteaucitron.user.pleziTw);
    }
};


// smartsupp
tarteaucitron.services.smartsupp = {
    "key": "smartsupp",
    "type": "support",
    "name": "Smartsupp",
    "uri": "https://www.smartsupp.com/help/privacy/",
    "needConsent": true,
    "cookies": ['ssupp.vid', 'ssupp.visits', 'AWSALB', 'AWSALBCORS'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.smartsuppKey === undefined) {
            return;
        }

        window._smartsupp = window._smartsupp || {};
        window._smartsupp.key = tarteaucitron.user.smartsuppKey;
        window.smartsupp = function () {
            window.smartsupp._.push(arguments)
        };
        window.smartsupp._ = [];

        tarteaucitron.addScript('https://www.smartsuppchat.com/loader.js');
    }
};



// sharpspring
tarteaucitron.services.sharpspring = {
    "key": "sharpspring",
    "type": "analytic",
    "name": "SharpSpring",
    "uri": "https://sharpspring.com/legal/sharpspring-cookie-policy/",
    "needConsent": true,
    "cookies": ['koitk', '__ss', '__ss_tk', '__ss_referrer'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.ssId === undefined || tarteaucitron.user.ssAccount === undefined) {
            return;
        }

        window._ss = window._ss || [];
        window._ss.push(['_setDomain', 'https://' + tarteaucitron.user.ssId + '.marketingautomation.services/net']);
        window._ss.push(['_setAccount', tarteaucitron.user.ssAccount]);
        window._ss.push(['_trackPageView']);

        window._pa = window._pa || {};

        tarteaucitron.addScript('https://' + tarteaucitron.user.ssId + '.marketingautomation.services/client/ss.js');
    }
};

// pardot
tarteaucitron.services.pardot = {
    "key": "pardot",
    "type": "analytic",
    "name": "Pardot",
    "uri": "https://www.salesforce.com/company/privacy/full_privacy/",
    "needConsent": true,
    "cookies": ['visitor_id'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.piAId === undefined || tarteaucitron.user.piCId === undefined) {
            return;
        }

        window.piAId = tarteaucitron.user.piAId;
        window.piCId = tarteaucitron.user.piCId;
        window.piHostname = 'pi.pardot.com';

        tarteaucitron.addScript('https://pi.pardot.com/pd.js');
    }
};

// Open Web Analytics
tarteaucitron.services.openwebanalytics = {
    "key": "openwebanalytics",
    "type": "analytic",
    "name": "Open Web Analytics",
    "uri": "",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.openwebanalyticsId === undefined || tarteaucitron.user.openwebanalyticsHost === undefined) {
            return;
        }

        window.owa_baseUrl = tarteaucitron.user.openwebanalyticsHost;
        window.owa_cmds = window.owa_cmds || [];
        window.owa_cmds.push(['setSiteId', tarteaucitron.user.openwebanalyticsId]);
        window.owa_cmds.push(['trackPageView']);
        window.owa_cmds.push(['trackClicks']);

        tarteaucitron.addScript(window.owa_baseUrl + 'modules/base/js/owa.tracker-combined-min.js');
    }
};

// xandr universal pixel
// https://docs.xandr.com/bundle/invest_invest-standard/page/topics/universal-pixel-overview.html
tarteaucitron.services.xandr = {
    "key": "xandr",
    "type": "ads",
    "name": "Xandr (Universal)",
    "uri": "https://www.xandr.com/privacy/cookie-policy/",
    "needConsent": true,
    "cookies": ['uuid2', 'uids', 'sess', 'icu', 'anj', 'usersync'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.xandrId === undefined) {
            return;
        }

        if (!window.pixie) {
            var n = window.pixie = function (e, i, a) {
                n.actionQueue.push({
                    action: e,
                    actionValue: i,
                    params: a
                })
            };
            n.actionQueue = [];
        }

        tarteaucitron.addScript('https://acdn.adnxs.com/dmp/up/pixie.js', '', function () {
            window.pixie('init', tarteaucitron.user.xandrId);
            window.pixie('event', 'PageView');
        });
    }
};

// xandr segment
// https://docs.xandr.com/bundle/invest_invest-standard/page/topics/segment-pixels-advanced.html
tarteaucitron.services.xandrsegment = {
    "key": "xandrsegment",
    "type": "ads",
    "name": "Xandr (Segment)",
    "uri": "https://www.xandr.com/privacy/cookie-policy/",
    "needConsent": true,
    "cookies": ['uuid2', 'uids', 'sess', 'icu', 'anj', 'usersync'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['xandrsegment-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" xandrsegmentAdd="' + x.getAttribute('xandrsegmentAdd') + '" xandrsegmentAddCode="' + x.getAttribute('xandrsegmentAddCode') + '" xandrsegmentRemove="' + x.getAttribute('xandrsegmentRemove') + '" xandrsegmentRemoveCode="' + x.getAttribute('xandrsegmentRemoveCode') + '" xandrsegmentMember="' + x.getAttribute('xandrsegmentMember') + '" xandrsegmentRedir="' + x.getAttribute('xandrsegmentRedir') + '" xandrsegmentValue="' + x.getAttribute('xandrsegmentValue') + '" xandrsegmentOther="' + x.getAttribute('xandrsegmentOther') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//ib.adnxs.com/seg?t=2&';
            uri += 'add=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentAdd') + '&';
            uri += 'add_code=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentAddCode') + '&';
            uri += 'remove=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentRemove') + '&';
            uri += 'remove_code=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentRemoveCode') + '&';
            uri += 'member=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentMember') + '&';
            uri += 'redir=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentRedir') + '&';
            uri += 'value=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentValue') + '&';
            uri += 'other=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentOther');

            document.getElementById(uniqIds[i]).innerHTML = '<img src=\'' + uri + '\' width=\'1\' height=\'1\' />';
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'xandrsegment';
        tarteaucitron.fallback(['xandrsegment-canvas'], tarteaucitron.engage(id));
    }
};

// xandr conversion
// https://docs.xandr.com/bundle/invest_invest-standard/page/topics/working-with-conversion-pixels.html
tarteaucitron.services.xandrconversion = {
    "key": "xandrconversion",
    "type": "ads",
    "name": "Xandr (Conversion)",
    "uri": "https://www.xandr.com/privacy/cookie-policy/",
    "needConsent": true,
    "cookies": ['uuid2', 'uids', 'sess', 'icu', 'anj', 'usersync'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['xandrconversion-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" xandrconversionId="' + x.getAttribute('xandrconversionId') + '" xandrconversionSeg="' + x.getAttribute('xandrconversionSeg') + '" xandrconversionOrderId="' + x.getAttribute('xandrconversionOrderId') + '" xandrconversionValue="' + x.getAttribute('xandrconversionValue') + '" xandrconversionRedir="' + x.getAttribute('xandrconversionRedir') + '" xandrconversionOther="' + x.getAttribute('xandrconversionOther') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//ib.adnxs.com/px?t=2&';
            uri += 'id=' + document.getElementById(uniqIds[i]).getAttribute('xandrconversionId') + '&';
            uri += 'seg=' + document.getElementById(uniqIds[i]).getAttribute('xandrconversionSeg') + '&';
            uri += 'order_id=' + document.getElementById(uniqIds[i]).getAttribute('xandrconversionOrderId') + '&';
            uri += 'value=' + document.getElementById(uniqIds[i]).getAttribute('xandrconversionValue') + '&';
            uri += 'redir=' + document.getElementById(uniqIds[i]).getAttribute('xandrconversionRedir') + '&';
            uri += 'other=' + document.getElementById(uniqIds[i]).getAttribute('xandrconversionOther');

            document.getElementById(uniqIds[i]).innerHTML = '<img src=\'' + uri + '\' width=\'1\' height=\'1\' />';
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'xandrconversion';
        tarteaucitron.fallback(['xandrconversion-canvas'], tarteaucitron.engage(id));
    }
};

// helloasso
tarteaucitron.services.helloasso = {
    "key": "helloasso",
    "type": "api",
    "name": "HelloAsso",
    "uri": "https://www.helloasso.com/confidentialite",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_helloasso'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'HelloAsso iframe'),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = x.getAttribute("data-url"),
                allowfullscreen = x.getAttribute("allowfullscreen");

            return '<iframe title="' + frame_title + '" id="haWidget" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="auto" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'helloasso';
        tarteaucitron.fallback(['tac_helloasso'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// podcloud
tarteaucitron.services.podcloud = {
    "key": "podcloud",
    "type": "video",
    "name": "podCloud",
    "uri": "https://podcloud.fr/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_podcloud'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'podCloud iframe'),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = x.getAttribute("data-url"),
                allowfullscreen = x.getAttribute("allowfullscreen");

            return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="auto" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'podcloud';
        tarteaucitron.fallback(['tac_podcloud'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// facebookpost
tarteaucitron.services.facebookpost = {
    "key": "facebookpost",
    "type": "social",
    "name": "Facebook (post)",
    "uri": "https://www.facebook.com/policy.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_facebookpost'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Facebook iframe'),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = x.getAttribute("data-url"),
                appId = x.getAttribute("data-appid"),
                allowfullscreen = x.getAttribute("allowfullscreen"),
                showText = x.getAttribute("data-show-text");

            return '<iframe title="' + frame_title + '" src="https://www.facebook.com/plugins/post.php?href=' + encodeURIComponent(url) + '&amp;width=' + width + '&amp;show_text=false&amp;appId=' + appId + '&amp;show_text=' + showText + '&amp;height=' + height + '" width="' + width + '" height="' + height + '" scrolling="auto" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'facebookpost';
        tarteaucitron.fallback(['tac_facebookpost'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// amplitude
tarteaucitron.services.amplitude = {
    "key": "amplitude",
    "type": "analytic",
    "name": "Amplitude",
    "uri": "https://amplitude.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.amplitude === undefined) {
            return;
        }
        tarteaucitron.addScript('https://cdn.amplitude.com/libs/amplitude-5.8.0-min.gz.js', '', function () {

            window.amplitude = {
                _q: [],
                _iq: {}
            };
            function s(e, t) { e.prototype[t] = function () { this._q.push([t].concat(Array.prototype.slice.call(arguments, 0))); return this } }
            var o = function () { this._q = []; return this };
            var a = ["add", "append", "clearAll", "prepend", "set", "setOnce", "unset"];
            for (var u = 0; u < a.length; u++) { s(o, a[u]) }
            amplitude.Identify = o;
            var c = function () { this._q = []; return this };
            var l = ["setProductId", "setQuantity", "setPrice", "setRevenueType", "setEventProperties"];
            for (var p = 0; p < l.length; p++) { s(c, l[p]) }
            amplitude.Revenue = c;
            var d = ["init", "logEvent", "logRevenue", "setUserId", "setUserProperties", "setOptOut", "setVersionName", "setDomain", "setDeviceId", "enableTracking", "setGlobalUserProperties", "identify", "clearUserProperties", "setGroup", "logRevenueV2", "regenerateDeviceId", "groupIdentify", "onInit", "logEventWithTimestamp", "logEventWithGroups", "setSessionId", "resetSessionId"];
            function v(e) { function t(t) { e[t] = function () { e._q.push([t].concat(Array.prototype.slice.call(arguments, 0))) } } for (var n = 0; n < d.length; n++) { t(d[n]) } }
            v(amplitude);
            amplitude.getInstance = function (e) { e = (!e || e.length === 0 ? "$default_instance" : e).toLowerCase(); if (!amplitude._iq.hasOwnProperty(e)) { amplitude._iq[e] = { _q: [] }; v(amplitude._iq[e]) } return amplitude._iq[e] };

            amplitude.getInstance().init(tarteaucitron.user.amplitude);
        });
    }
};

// abtasty
tarteaucitron.services.abtasty = {
    "key": "abtasty",
    "type": "api",
    "name": "ABTasty",
    "uri": "https://www.abtasty.com/terms-of-use/",
    "needConsent": true,
    "cookies": ['ABTasty', 'ABTastySession'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.abtastyID === undefined) {
            return;
        }
        tarteaucitron.addScript('//try.abtasty.com/' + tarteaucitron.user.abtastyID + '.js');
    }
};


// yandex metrica
tarteaucitron.services.metrica = {
    "key": "metrica",
    "type": "analytic",
    "name": "Yandex Metrica",
    "uri": "https://yandex.com/legal/confidential/",
    "needConsent": true,
    "cookies": ['_ym_metrika_enabled', '_ym_isad', '_ym_uid', '_ym_d', 'yabs-sid', '_ym_debug', '_ym_mp2_substs', '_ym_hostIndex', '_ym_mp2_track', 'yandexuid', 'usst'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.yandexmetrica === undefined) {
            return;
        }
        tarteaucitron.addScript('https://mc.yandex.ru/metrika/tag.js', '', function () {

            (function (m, e, t, r, i, k, a) {
                m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
                m[i].l = 1 * new Date(); k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
            })
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(tarteaucitron.user.yandexmetrica, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true,
                ecommerce: "dataLayer"
            });
        });
    }
};

// addthis
tarteaucitron.services.addthis = {
    "key": "addthis",
    "type": "social",
    "name": "AddThis",
    "uri": "https://www.addthis.com/privacy/privacy-policy#publisher-visitors",
    "needConsent": true,
    "cookies": ['__atuvc', '__atuvs'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.addthisPubId === undefined) {
            return;
        }
        if (tarteaucitron.isAjax === true) {
            window.addthis = null;
            window._adr = null;
            window._atc = null;
            window._atd = null;
            window._ate = null;
            window._atr = null;
            window._atw = null;
        }
        tarteaucitron.fallback(['addthis_inline_share_toolbox'], '');
        tarteaucitron.addScript('//s7.addthis.com/js/300/addthis_widget.js#pubid=' + tarteaucitron.user.addthisPubId);
    },
    "fallback": function () {
        "use strict";
        var id = 'addthis';
        tarteaucitron.fallback(['addthis_inline_share_toolbox'], tarteaucitron.engage(id));
    }
};

// addtoanyfeed
tarteaucitron.services.addtoanyfeed = {
    "key": "addtoanyfeed",
    "type": "social",
    "name": "AddToAny (feed)",
    "uri": "https://www.addtoany.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.addtoanyfeedUri === undefined) {
            return;
        }
        tarteaucitron.user.addtoanyfeedSubscribeLink = 'https://www.addtoany.com/subscribe?linkurl=' + tarteaucitron.user.addtoanyfeedUri;
        window.a2a_config = window.a2a_config || {};
        window.a2a_config.linkurl = tarteaucitron.user.addtoanyfeedUri;
        tarteaucitron.addScript('//static.addtoany.com/menu/feed.js');
    },
    "fallback": function () {
        "use strict";
        tarteaucitron.user.addtoanyfeedSubscribeLink = 'https://www.addtoany.com/subscribe?linkurl=' + tarteaucitron.user.addtoanyfeedUri;
    }
};

// addtoanyshare
tarteaucitron.services.addtoanyshare = {
    "key": "addtoanyshare",
    "type": "social",
    "name": "AddToAny (share)",
    "uri": "https://www.addtoany.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_addtoanyshare'], function (elem) {
            elem.remove();
        }, true);
        tarteaucitron.addScript('//static.addtoany.com/menu/page.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'addtoanyshare';
        tarteaucitron.fallback(['tac_addtoanyshare'], tarteaucitron.engage(id));
    }
};

// aduptech ads
tarteaucitron.services.aduptech_ads = {
    "key": "aduptech_ads",
    "type": "ads",
    "name": "Ad Up Technology (ads)",
    "uri": "https://www.adup-tech.com/datenschutz",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        var IDENTIFIER = "aduptech_ads",
            API_URL = "https://s.d.adup-tech.com/jsapi";

        var elements = document.getElementsByClassName(IDENTIFIER);
        if (!elements || elements.length === 0) {
            return;
        }

        tarteaucitron.fallback([IDENTIFIER], "");

        tarteaucitron.addScript(API_URL, "", function () {
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];

                if (!element.getAttribute("id")) {
                    element.setAttribute("id", IDENTIFIER + Math.random().toString(36).substr(2, 9));
                }

                window.uAd.embed(element.getAttribute("id"), {
                    placementKey: element.getAttribute("placementKey"),
                    responsive: Boolean(element.getAttribute("responsive")),
                    lazy: Boolean(element.getAttribute("lazy")),
                    adtest: Boolean(element.getAttribute("test")),
                    query: element.getAttribute("query") || "",
                    minCpc: element.getAttribute("minCpc") || "",
                    pageUrl: element.getAttribute("pageUrl") || "",
                    skip: element.getAttribute("skip") || ""
                });
            }
        });

    },
    "fallback": function () {
        "use strict";
        tarteaucitron.fallback(["aduptech_ads"], tarteaucitron.engage("aduptech_ads"));
    }
};

// aduptech conversion
tarteaucitron.services.aduptech_conversion = {
    "key": "aduptech_conversion",
    "type": "ads",
    "name": "Ad Up Technology (conversion)",
    "uri": "https://www.adup-tech.com/datenschutz",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        var IDENTIFIER = "aduptech_conversion",
            CONVERSION_PIXEL_BASE_URL = "https://d.adup-tech.com/campaign/conversion";

        var elements = document.getElementsByClassName(IDENTIFIER);
        if (!elements || elements.length === 0) {
            return;
        }

        tarteaucitron.fallback([IDENTIFIER], "");

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            if (!element.getAttribute("advertiserId") || !element.getAttribute("conversionCode")) {
                continue;
            }

            var url = CONVERSION_PIXEL_BASE_URL +
                "/" + encodeURIComponent(element.getAttribute("advertiserId")) +
                "?t=" + encodeURIComponent(element.getAttribute("conversionCode"));

            if (element.getAttribute("price")) {
                url += "&price=" + encodeURIComponent(element.getAttribute("price"));
            }

            if (element.getAttribute("quantity")) {
                url += "&quantity=" + encodeURIComponent(element.getAttribute("quantity"));
            }

            if (element.getAttribute("total")) {
                url += "&total=" + encodeURIComponent(element.getAttribute("total"));
            }

            if (element.getAttribute("orderId")) {
                url += "&order_id=" + encodeURIComponent(element.getAttribute("orderId"));
            }

            if (element.getAttribute("itemNumber")) {
                url += "&item_number=" + encodeURIComponent(element.getAttribute("itemNumber"));
            }

            if (element.getAttribute("description")) {
                url += "&description=" + encodeURIComponent(element.getAttribute("description"));
            }

            (new Image()).src = url;
        }
    }
};

// aduptech retargeting
tarteaucitron.services.aduptech_retargeting = {
    "key": "aduptech_retargeting",
    "type": "ads",
    "name": "Ad Up Technology (retargeting)",
    "uri": "https://www.adup-tech.com/datenschutz",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        var IDENTIFIER = "aduptech_retargeting",
            API_URL = "https://s.d.adup-tech.com/services/retargeting.js";

        var elements = document.getElementsByClassName(IDENTIFIER);
        if (!elements || elements.length === 0) {
            return;
        }

        tarteaucitron.fallback([IDENTIFIER], "");

        window.AdUpRetargeting = function (api) {
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];

                api.init();

                api.setAccount(element.getAttribute("account"));

                if (element.getAttribute("email")) {
                    api.setEmail(element.getAttribute("email"));
                } else if (element.getAttribute("hashedEmail")) {
                    api.setHashedEmail(element.getAttribute("hashedEmail"));
                }

                if (element.getAttribute("product")) {
                    try {
                        api.setProduct(JSON.parse(element.getAttribute("product")));
                    } catch (e) {
                        api.setProduct(element.getAttribute("product"));
                    }
                }

                if (element.getAttribute("transaction")) {
                    try {
                        api.setTransaction(JSON.parse(element.getAttribute("transaction")));
                    } catch (e) {
                        api.setTransaction(element.getAttribute("transaction"));
                    }
                }

                if (element.getAttribute("demarkUser")) {
                    api.setDemarkUser();
                } else if (element.getAttribute("demarkProducts")) {
                    api.setDemarkProducts();
                }

                if (element.getAttribute("conversionCode")) {
                    api.setConversionCode(element.getAttribute("conversionCode"));
                }

                if (element.getAttribute("device")) {
                    var setter = "set" + element.getAttribute("device").charAt(0).toUpperCase() + element.getAttribute("device").slice(1);
                    if (typeof api[setter] === 'function') {
                        api[setter]();
                    }
                }

                if (element.getAttribute("track")) {
                    var tracker = "track" + element.getAttribute("track").charAt(0).toUpperCase() + element.getAttribute("track").slice(1);
                    if (typeof api[tracker] === "function") {
                        api[tracker]();
                    } else {
                        api.trackHomepage();
                    }
                }
            };
        };

        tarteaucitron.addScript(API_URL);
    }
};

// alexa
tarteaucitron.services.alexa = {
    "key": "alexa",
    "type": "analytic",
    "name": "Alexa",
    "uri": "https://www.alexa.com/help/privacy",
    "needConsent": true,
    "cookies": ['__asc', '__auc'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.alexaAccountID === undefined) {
            return;
        }
        window._atrk_opts = {
            atrk_acct: tarteaucitron.user.alexaAccountID,
            domain: window.location.hostname.match(/[^\.]*\.[^.]*$/)[0],
            dynamic: true
        };
        tarteaucitron.addScript('https://d31qbv1cthcecs.cloudfront.net/atrk.js');
    }
};

// amazon
tarteaucitron.services.amazon = {
    "key": "amazon",
    "type": "ads",
    "name": "Amazon",
    "uri": "https://www.amazon.com/gp/help/customer/display.html/ref=help_search_1-1?ie=UTF8&nodeId=201909010&qid=1544617177&sr=1-1",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['amazon_product'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Amazon iframe'),
                amazonId = x.getAttribute("amazonid"),
                productId = x.getAttribute("productid"),
                url = '//ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=' + tarteaucitron.getLanguage().toUpperCase() + '&source=ss&ref=ss_til&ad_type=product_link&tracking_id=' + amazonId + '&marketplace=amazon&region=' + tarteaucitron.getLanguage().toUpperCase() + '&placement=' + productId + '&asins=' + productId + '&show_border=true&link_opens_in_new_window=true',
                iframe = '<iframe title="' + frame_title + '" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" src="' + url + '"></iframe>';

            return iframe;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'amazon';
        tarteaucitron.fallback(['amazon_product'], tarteaucitron.engage(id));
    }
};

// calameo
tarteaucitron.services.calameo = {
    "key": "calameo",
    "type": "video",
    "name": "Calameo",
    "uri": "https://fr.calameo.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['calameo-canvas'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Calameo iframe'),
                id = x.getAttribute("data-id"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = '//v.calameo.com/?bkcode=' + id,
                allowfullscreen = x.getAttribute("allowfullscreen");

            return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="no" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'calameo';
        tarteaucitron.fallback(['calameo-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// clicky
tarteaucitron.services.clicky = {
    "key": "clicky",
    "type": "analytic",
    "name": "Clicky",
    "uri": "https://clicky.com/terms",
    "needConsent": true,
    "cookies": ['_jsuid', '_eventqueue', '_referrer_og', '_utm_og', '_first_pageview', 'clicky_olark', 'no_trackyy_' + tarteaucitron.user.clickyId, 'unpoco_' + tarteaucitron.user.clickyId, 'heatmaps_g2g_' + tarteaucitron.user.clickyId],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.clickyId === undefined) {
            return;
        }
        tarteaucitron.addScript('//static.getclicky.com/js', '', function () {
            if (typeof clicky.init === 'function') {
                clicky.init(tarteaucitron.user.clickyId);
            }
            if (typeof tarteaucitron.user.clickyMore === 'function') {
                tarteaucitron.user.clickyMore();
            }
        });
    }
};

// clicmanager
tarteaucitron.services.clicmanager = {
    "key": "clicmanager",
    "type": "ads",
    "name": "Clicmanager",
    "uri": "http://www.clicmanager.fr/infos_legales.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['clicmanager-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" c="' + x.getAttribute('c') + '" s="' + x.getAttribute('s') + '" t="' + x.getAttribute('t') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//ads.clicmanager.fr/exe.php?';
            uri += 'c=' + document.getElementById(uniqIds[i]).getAttribute('c') + '&';
            uri += 's=' + document.getElementById(uniqIds[i]).getAttribute('s') + '&';
            uri += 't=' + document.getElementById(uniqIds[i]).getAttribute('t');

            tarteaucitron.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'clicmanager';
        tarteaucitron.fallback(['clicmanager-canvas'], tarteaucitron.engage(id));
    }
};

// compteur
tarteaucitron.services.compteur = {
    "key": "compteur",
    "type": "analytic",
    "name": "Compteur.fr",
    "uri": "https://www.compteur.fr/help_privacy_policy.htm",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.compteurID === undefined) {
            return;
        }
        tarteaucitron.addScript('https://server2.compteur.fr/log7.js', '', function () { wtslog7(tarteaucitron.user.compteurID, 1); });
    }
};

// contentsquare
tarteaucitron.services.contentsquare = {
    "key": "contentsquare",
    "type": "api",
    "name": "ContentSquare",
    "uri": "https://docs.contentsquare.com/uxa-en/#collected-data",
    "needConsent": true,
    "cookies": ['_cs_id', '_cs_s', '_cs_vars', '_cs_ex', '_cs_c', '_cs_optout'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.contentsquareID === undefined) {
            return;
        }
        tarteaucitron.addScript('//t.contentsquare.net/uxa/' + tarteaucitron.user.contentsquareID + '.js');
    }
};

// crazyegg
tarteaucitron.services.crazyegg = {
    "key": "crazyegg",
    "type": "analytic",
    "name": "Crazy Egg",
    "uri": "https://www.crazyegg.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.crazyeggId === undefined) {
            return;
        }

        tarteaucitron.addScript('//script.crazyegg.com/pages/scripts/' + tarteaucitron.user.crazyeggId.substr(0, 4) + '/' + tarteaucitron.user.crazyeggId.substr(4, 4) + '.js');
    }
};

// clarity
tarteaucitron.services.clarity = {
    "key": "clarity",
    "type": "analytic",
    "name": "Clarity",
    "uri": "https://clarity.microsoft.com/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        window["clarity"] = window["clarity"] || function () { (window["clarity"].q = window["clarity"].q || []).push(arguments) };

        tarteaucitron.addScript('https://www.clarity.ms/tag/' + tarteaucitron.user.clarity);
    }
};

// criteo
tarteaucitron.services.criteo = {
    "key": "criteo",
    "type": "ads",
    "name": "Criteo",
    "uri": "http://www.criteo.com/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        document.MAX_ct0 = '';
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['criteo-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" zoneid="' + x.getAttribute('zoneid') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//cas.criteo.com/delivery/ajs.php?';
            uri += 'zoneid=' + document.getElementById(uniqIds[i]).getAttribute('zoneid');
            uri += '&nodis=1&cb=' + Math.floor(Math.random() * 99999999999);
            uri += '&loc=' + encodeURI(window.location);
            uri += (document.MAX_used !== ',') ? '&exclude=' + document.MAX_used : '';
            uri += (document.charset !== undefined ? '&charset=' + document.charset : '');
            uri += (document.characterSet !== undefined ? '&charset=' + document.characterSet : '');
            uri += (document.referrer !== undefined) ? '&referer=' + encodeURI(document.referrer) : '';
            uri += (document.context !== undefined) ? '&context=' + encodeURI(document.context) : '';
            uri += ((document.MAX_ct0 !== undefined) && (document.MAX_ct0.substring(0, 4) === 'http')) ? '&ct0=' + encodeURI(document.MAX_ct0) : '';
            uri += (document.mmm_fo !== undefined) ? '&mmm_fo=1' : '';

            tarteaucitron.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'criteo';
        tarteaucitron.fallback(['criteo-canvas'], tarteaucitron.engage(id));
    }
};

// criteo onetag
tarteaucitron.services.criteoonetag = {
    "key": "criteoonetag",
    "type": "ads",
    "name": "Criteo OneTag",
    "uri": "https://www.criteo.com/privacy/",
    "needConsent": true,
    "cookies": ['uid', 'tk', 'uid3pd'],
    "js": function() {
        "use strict";
        if (tarteaucitron.user.criteoonetagAccount === undefined) return;

        window.criteo_q = window.criteo_q || []; 
        window.criteo_q.push({
            event: "setAccount",
            account: tarteaucitron.user.criteoonetagAccount
        })

        tarteaucitron.addScript('//static.criteo.net/js/ld/ld.js', '', function() {
            if (typeof tarteaucitron.user.criteoonetagMore === 'function') {
                tarteaucitron.user.criteoonetagMore();
            }
        });
    }
};

// artetv
tarteaucitron.services.artetv = {
    "key": "artetv",
    "type": "video",
    "name": "Arte.tv",
    "uri": "https://www.arte.tv/sites/fr/corporate/donnees-personnelles/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['artetv_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Arte.tv iframe'),
                video_json = x.getAttribute("json"),
                video_width = x.getAttribute("width"),
                video_height = x.getAttribute("height"),
                video_frame,
                video_allowfullscreen = x.getAttribute("allowfullscreen");

            if (video_json === undefined) {
                return "";
            }

            video_frame = '<iframe title="' + frame_title + '" style="transition-duration: 0; transition-property: no; margin: 0 auto; position: relative; display: block; background-color: #000000;" src="https://www.arte.tv/player/v5/index.php?json_url=' + video_json + '" width="' + video_width + '" height="' + video_height + '" scrolling="no" ' + (video_allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'artetv';
        tarteaucitron.fallback(['artetv_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// dailymotion
tarteaucitron.services.dailymotion = {
    "key": "dailymotion",
    "type": "video",
    "name": "Dailymotion",
    "uri": "https://www.dailymotion.com/legal/privacy",
    "needConsent": true,
    "cookies": ['ts', 'dmvk', 'hist', 'v1st', 's_vi'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['dailymotion_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(tarteaucitron.getElemAttr(x, "title") || 'Dailymotion iframe'),
                video_id = tarteaucitron.getElemAttr(x, "videoID"),
                video_width = tarteaucitron.getElemAttr(x, "width"),
                frame_width = 'width=',
                video_height = tarteaucitron.getElemAttr(x, "height"),
                frame_height = 'height=',
                video_frame,
                embed_type = tarteaucitron.getElemAttr(x, "embedType"),
                allowfullscreen = tarteaucitron.getElemAttr(x, "allowfullscreen"),
                showinfo = tarteaucitron.getElemAttr(x, "showinfo"),
                autoplay = tarteaucitron.getElemAttr(x, "autoplay"),
                api = tarteaucitron.getElemAttr(x, "api"),
                params = 'info=' + showinfo + '&autoPlay=' + autoplay + '&api=' + api;

            if (video_id === undefined) {
                return "";
            }
            if (video_width !== undefined) {
                frame_width += '"' + video_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (video_height !== undefined) {
                frame_height += '"' + video_height + '" ';
            } else {
                frame_height += '"" ';
            }
            if (embed_type === undefined || !['video', 'playlist'].includes(embed_type)) {
                embed_type = "video";
            }
            video_frame = '<iframe title="' + frame_title + '" src="//www.dailymotion.com/embed/' + embed_type + '/' + video_id + '?' + params + '" ' + frame_width + frame_height + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'dailymotion';
        tarteaucitron.fallback(['dailymotion_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// dating affiliation
tarteaucitron.services.datingaffiliation = {
    "key": "datingaffiliation",
    "type": "ads",
    "name": "Dating Affiliation",
    "uri": "http://www.dating-affiliation.com/conditions-generales.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['datingaffiliation-canvas'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Dating Affiliation iframe'),
                comfrom = x.getAttribute("data-comfrom"),
                r = x.getAttribute("data-r"),
                p = x.getAttribute("data-p"),
                cf0 = x.getAttribute("data-cf0"),
                langue = x.getAttribute("data-langue"),
                forward_affiliate = x.getAttribute("data-forwardAffiliate"),
                cf2 = x.getAttribute("data-cf2"),
                cfsa2 = x.getAttribute("data-cfsa2"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = 'http://www.tools-affil2.com/rotaban/ban.php?' + comfrom;

            return '<iframe title="' + frame_title + '" src="' + url + '&r=' + r + '&p=' + p + '&cf0=' + cf0 + '&langue=' + langue + '&forward_affiliate=' + forward_affiliate + '&cf2=' + cf2 + '&cfsa2=' + cfsa2 + '" width="' + width + '" height="' + height + '" marginheight="0" marginwidth="0" scrolling="no"></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'datingaffiliation';
        tarteaucitron.fallback(['datingaffiliation-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// dating affiliation popup
tarteaucitron.services.datingaffiliationpopup = {
    "key": "datingaffiliationpopup",
    "type": "ads",
    "name": "Dating Affiliation (Pop Up)",
    "uri": "http://www.dating-affiliation.com/conditions-generales.php",
    "needConsent": true,
    "cookies": ['__utma', '__utmb', '__utmc', '__utmt_Tools', '__utmv', '__utmz', '_ga', '_gat', '_gat_UA-65072040-17', '__da-pu-xflirt-ID-pc-o169'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['datingaffiliationpopup-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" uri="' + x.getAttribute('uri') + '" comfrom="' + x.getAttribute('comfrom') + '" promo="' + x.getAttribute('promo') + '" productid="' + x.getAttribute('productid') + '" submitconfig="' + x.getAttribute('submitconfig') + '" ur="' + x.getAttribute('ur') + '" brand="' + x.getAttribute('brand') + '" lang="' + x.getAttribute('lang') + '" cf0="' + x.getAttribute('cf0') + '" cf2="' + x.getAttribute('cf2') + '" subid1="' + x.getAttribute('subid1') + '" cfsa2="' + x.getAttribute('cfsa2') + '" subid2="' + x.getAttribute('subid2') + '" nicheid="' + x.getAttribute('nicheid') + '" degreid="' + x.getAttribute('degreid') + '" bt="' + x.getAttribute('bt') + '" vis="' + x.getAttribute('vis') + '" hid="' + x.getAttribute('hid') + '" snd="' + x.getAttribute('snd') + '" aabd="' + x.getAttribute('aabd') + '" aabs="' + x.getAttribute('aabs') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = 'http://www.promotools.biz/da/popunder/script.php?';
            uri += 'comfrom=' + document.getElementById(uniqIds[i]).getAttribute('comfrom') + '&';
            uri += 'promo=' + document.getElementById(uniqIds[i]).getAttribute('promo') + '&';
            uri += 'product_id=' + document.getElementById(uniqIds[i]).getAttribute('productid') + '&';
            uri += 'submitconfig=' + document.getElementById(uniqIds[i]).getAttribute('submitconfig') + '&';
            uri += 'ur=' + document.getElementById(uniqIds[i]).getAttribute('ur') + '&';
            uri += 'brand=' + document.getElementById(uniqIds[i]).getAttribute('brand') + '&';
            uri += 'lang=' + document.getElementById(uniqIds[i]).getAttribute('lang') + '&';
            uri += 'cf0=' + document.getElementById(uniqIds[i]).getAttribute('cf0') + '&';
            uri += 'cf2=' + document.getElementById(uniqIds[i]).getAttribute('cf2') + '&';
            uri += 'subid1=' + document.getElementById(uniqIds[i]).getAttribute('subid1') + '&';
            uri += 'cfsa2=' + document.getElementById(uniqIds[i]).getAttribute('cfsa2') + '&';
            uri += 'subid2=' + document.getElementById(uniqIds[i]).getAttribute('subid2') + '&';
            uri += 'nicheId=' + document.getElementById(uniqIds[i]).getAttribute('nicheid') + '&';
            uri += 'degreId=' + document.getElementById(uniqIds[i]).getAttribute('degreid') + '&';
            uri += 'bt=' + document.getElementById(uniqIds[i]).getAttribute('bt') + '&';
            uri += 'vis=' + document.getElementById(uniqIds[i]).getAttribute('vis') + '&';
            uri += 'hid=' + document.getElementById(uniqIds[i]).getAttribute('hid') + '&';
            uri += 'snd=' + document.getElementById(uniqIds[i]).getAttribute('snd') + '&';
            uri += 'aabd=' + document.getElementById(uniqIds[i]).getAttribute('aabd') + '&';
            uri += 'aabs=' + document.getElementById(uniqIds[i]).getAttribute('aabs');

            tarteaucitron.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'datingaffiliationpopup';
        tarteaucitron.fallback(['datingaffiliationpopup-canvas'], tarteaucitron.engage(id));
    }
};

// deezer
tarteaucitron.services.deezer = {
    "key": "deezer",
    "type": "video",
    "name": "Deezer",
    "uri": "https://www.deezer.com/legal/personal-datas",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['deezer_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Deezer iframe'),
                deezer_id = x.getAttribute("deezerID"),
                deezer_width = x.getAttribute("width"),
                frame_width = 'width=',
                deezer_height = x.getAttribute("height"),
                frame_height = 'height=',
                deezer_frame,
                embed_theme = x.getAttribute("theme"),
                embed_type = x.getAttribute("embedType"),
                radius = x.getAttribute("radius"),
                tracklist = x.getAttribute("tracklist"),
                allowfullscreen = x.getAttribute("allowfullscreen"),
                params;

            if (deezer_id === undefined) {
                return "";
            }
            if (deezer_width !== undefined) {
                frame_width += '"' + deezer_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (deezer_height !== undefined) {
                frame_height += '"' + deezer_height + '" ';
            } else {
                frame_height += '"" ';
            }
            if (embed_theme === undefined || !['auto', 'light', 'dark'].includes(embed_theme)) {
                embed_theme = "auto";
            }
            if (embed_type === undefined || !['album', 'track', 'playlist'].includes(embed_type)) {
                embed_type = "album";
            }
            if (radius === undefined || !['true', 'false'].includes(radius)) {
                radius = "true";
            }
            if (tracklist === undefined || !['true', 'false'].includes(tracklist)) {
                tracklist = "true";
            }
            params = 'tracklist=' + tracklist + '&radius=' + radius;
            deezer_frame = '<iframe title="' + frame_title + '" src="//widget.deezer.com/widget/' + embed_theme + '/' + embed_type + '/' + deezer_id + '?' + params + '" ' + frame_width + frame_height + ' ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
            return deezer_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'deezer';
        tarteaucitron.fallback(['deezer_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// leadforensics
tarteaucitron.services.leadforensics = {
    "key": "leadforensics",
    "type": "analytic",
    "name": "LeadForensics",
    "uri": "https://www.leadforensics.com/privacy-policy/",
    "needConsent": true,
    "cookies": ['trackalyzer'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.leadforensicsSf14gv === undefined ||
            tarteaucitron.user.leadforensicsIidentifier === undefined) {
            return;
        }

        window.sf14gv = tarteaucitron.user.leadforensicsSf14gv;

        (function () {
            var sf14g = document.createElement('script'); sf14g.async = true;
            sf14g.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 't.sf14g.com/sf14g.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(sf14g, s);
        })();

        tarteaucitron.addScript('//secure.leadforensics.com/js/' + tarteaucitron.user.leadforensicsIidentifier + '.js');
    }
};

// disqus
tarteaucitron.services.disqus = {
    "key": "disqus",
    "type": "comment",
    "name": "Disqus",
    "uri": "https://help.disqus.com/customer/portal/articles/466259-privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.disqusShortname === undefined) {
            return;
        }
        tarteaucitron.addScript('//' + tarteaucitron.user.disqusShortname + '.disqus.com/embed.js');
        tarteaucitron.addScript('//' + tarteaucitron.user.disqusShortname + '.disqus.com/count.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'disqus';

        if (document.getElementById('disqus_thread')) {
            document.getElementById('disqus_thread').innerHTML = tarteaucitron.engage(id);
        }
    }
};

// ekomi
tarteaucitron.services.ekomi = {
    "key": "ekomi",
    "type": "social",
    "name": "eKomi",
    "uri": "http://www.ekomi-us.com/us/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.ekomiCertId === undefined) {
            return;
        }
        window.eKomiIntegrationConfig = [
            { certId: tarteaucitron.user.ekomiCertId }
        ];
        tarteaucitron.addScript('//connect.ekomi.de/integration_1410173009/' + tarteaucitron.user.ekomiCertId + '.js');
    }
};

// etracker
tarteaucitron.services.etracker = {
    "key": "etracker",
    "type": "analytic",
    "name": "eTracker",
    "uri": "https://www.etracker.com/en/data-protection.html",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.etracker === undefined) {
            return;
        }

        tarteaucitron.addScript('//static.etracker.com/code/e.js', '_etLoader', function () { }, true, "data-secure-code", tarteaucitron.user.etracker);
    }
};

// facebook
tarteaucitron.services.facebook = {
    "key": "facebook",
    "type": "social",
    "name": "Facebook",
    "uri": "https://www.facebook.com/policy.php",
    "needConsent": true,
    "cookies": ['xs', 'sb', 'fr', 'datr', 'dpr', 'c_user'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['fb-post', 'fb-follow', 'fb-activity', 'fb-send', 'fb-share-button', 'fb-like', 'fb-video'], '');
        tarteaucitron.addScript('//connect.facebook.net/' + tarteaucitron.getLocale() + '/sdk.js#xfbml=1&version=v2.0', 'facebook-jssdk');
        if (tarteaucitron.isAjax === true) {
            if (typeof FB !== "undefined") {
                FB.XFBML.parse();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'facebook';
        tarteaucitron.fallback(['fb-post', 'fb-follow', 'fb-activity', 'fb-send', 'fb-share-button', 'fb-like', 'fb-video'], tarteaucitron.engage(id));
    }
};

// facebooklikebox
tarteaucitron.services.facebooklikebox = {
    "key": "facebooklikebox",
    "type": "social",
    "name": "Facebook (like box)",
    "uri": "https://www.facebook.com/policy.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['fb-like-box', 'fb-page'], '');
        tarteaucitron.addScript('//connect.facebook.net/' + tarteaucitron.getLocale() + '/sdk.js#xfbml=1&version=v2.3', 'facebook-jssdk');
        if (tarteaucitron.isAjax === true) {
            if (typeof FB !== "undefined") {
                FB.XFBML.parse();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'facebooklikebox';
        tarteaucitron.fallback(['fb-like-box', 'fb-page'], tarteaucitron.engage(id));
    }
};

// facebookcomment
tarteaucitron.services.facebookcomment = {
    "key": "facebookcomment",
    "type": "comment",
    "name": "Facebook (commentaire)",
    "uri": "https://www.facebook.com/policy.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['fb-comments'], '');
        tarteaucitron.addScript('//connect.facebook.net/' + tarteaucitron.getLocale() + '/sdk.js#xfbml=1&version=v2.0', 'facebook-jssdk');
        if (tarteaucitron.isAjax === true) {
            if (typeof FB !== "undefined") {
                FB.XFBML.parse();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'facebookcomment';
        tarteaucitron.fallback(['fb-comments'], tarteaucitron.engage(id));
    }
};

// ferank
tarteaucitron.services.ferank = {
    "key": "ferank",
    "type": "analytic",
    "name": "FERank",
    "uri": "https://www.ferank.fr/respect-vie-privee/#mesureaudience",
    "needConsent": false,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('//static.ferank.fr/pixel.js', '', function () {
            if (typeof tarteaucitron.user.ferankMore === 'function') {
                tarteaucitron.user.ferankMore();
            }
        });
    }
};

// pingdom
tarteaucitron.services.pingdom = {
    "key": "pingdom",
    "type": "api",
    "name": "Pingdom",
    "uri": "https://www.solarwinds.com/general-data-protection-regulation-cloud",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.pingdomId === undefined) {
            return;
        }

        window._prum = [['id', tarteaucitron.user.pingdomId], ['mark', 'firstbyte', (new Date()).getTime()]];

        tarteaucitron.addScript('https://rum-static.pingdom.net/prum.min.js');
    }
};


// simpleanalytics
tarteaucitron.services.simpleanalytics = {
    "key": "simpleanalytics",
    "type": "analytic",
    "name": "Simple Analytics",
    "uri": "https://docs.simpleanalytics.com/what-we-collect",
    "needConsent": false,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://scripts.simpleanalyticscdn.com/latest.js');
    }
};

// stonly
tarteaucitron.services.stonly = {
    "key": "stonly",
    "type": "api",
    "name": "Stonly",
    "uri": "https://stonly.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.stonlyId === undefined) {
            return;
        }

        window.STONLY_WID = tarteaucitron.user.stonlyId;
        window.StonlyWidget || ((window.w = window.StonlyWidget = function () {
            window.w._api ? window.w._api.apply(window.w, arguments) : window.w.queue.push(arguments)
        }).queue = []);

        tarteaucitron.addScript('https://stonly.com/js/widget/v2/stonly-widget.js?v=' + Date.now());
    }
};

// stripe
/*tarteaucitron.services.stripe = {
    "key": "stripe",
    "type": "api",
    "name": "Stripe",
    "uri": "https://stripe.com/cookies-policy/legal",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://js.stripe.com/v3/');
    }
};*/

// ferank pub
tarteaucitron.services.ferankpub = {
    "key": "ferankpub",
    "type": "ads",
    "name": "FERank (pub)",
    "uri": "https://www.ferank.fr/respect-vie-privee/#regiepublicitaire",
    "needConsent": false,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('//static.ferank.fr/publicite.async.js');
        if (tarteaucitron.isAjax === true) {
            if (typeof ferankReady === 'function') {
                ferankReady();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'ferankpub';
        tarteaucitron.fallback(['ferank-publicite'], tarteaucitron.engage(id));
    }
};

// get+
tarteaucitron.services.getplus = {
    "key": "getplus",
    "type": "analytic",
    "name": "Get+",
    "uri": "http://www.getplus.fr/Conditions-generales-de-vente_a226.html",
    "needConsent": true,
    "cookies": ['_first_pageview', '_jsuid', 'no_trackyy_' + tarteaucitron.user.getplusId, '_eventqueue'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.getplusId === undefined) {
            return;
        }

        window.webleads_site_ids = window.webleads_site_ids || [];
        window.webleads_site_ids.push(tarteaucitron.user.getplusId);
        tarteaucitron.addScript('//stats.webleads-tracker.com/js');
    }
};

// google+
tarteaucitron.services.gplus = {
    "key": "gplus",
    "type": "social",
    "name": "Google+",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://apis.google.com/js/platform.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'gplus';
        tarteaucitron.fallback(['g-plus', 'g-plusone'], tarteaucitron.engage(id));
    }
};

// google+ badge
tarteaucitron.services.gplusbadge = {
    "key": "gplusbadge",
    "type": "social",
    "name": "Google+ (badge)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://apis.google.com/js/platform.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'gplusbadge';
        tarteaucitron.fallback(['g-page', 'g-person'], tarteaucitron.engage(id));
    }
};

// google adsense
tarteaucitron.services.adsense = {
    "key": "adsense",
    "type": "ads",
    "name": "Google Adsense",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "readmoreLink": "https://policies.google.com/technologies/partner-sites",
    "cookies": ['__gads'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['adsbygoogle'], '');
        tarteaucitron.addScript('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'adsense';
        tarteaucitron.fallback(['adsbygoogle'], tarteaucitron.engage(id));
    }
};


// google adsense automatic
tarteaucitron.services.adsenseauto = {
    "key": "adsenseauto",
    "type": "ads",
    "name": "Google Adsense Automatic",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "readmoreLink": "https://policies.google.com/technologies/partner-sites",
    "cookies": ['__gads'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.adsensecapub === undefined) {
            return;
        }
        tarteaucitron.addScript('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + tarteaucitron.user.adsensecapub, '', '', '', 'crossorigin', 'anonymous');
    }
};

// Google Adsense Search
tarteaucitron.services.adsensesearch = {
    "key": "adsensesearch",
    "type": "ads",
    "name": "Google Adsense Search",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "readmoreLink": "https://policies.google.com/technologies/partner-sites",
    "cookies": ['__gads'],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://www.google.com/adsense/search/ads.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'adsensesearch';
        tarteaucitron.fallback(['afscontainer1'], tarteaucitron.engage(id));
    }
};

// google partners badge
tarteaucitron.services.googlepartners = {
    "key": "googlepartners",
    "type": "ads",
    "name": "Google Partners Badge",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://apis.google.com/js/platform.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'googlepartners';
        tarteaucitron.fallback(['g-partnersbadge'], tarteaucitron.engage(id));
    }
};

// google adsense search (form)
tarteaucitron.services.adsensesearchform = {
    "key": "adsensesearchform",
    "type": "ads",
    "name": "Google Adsense Search (form)",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('//www.google.com/coop/cse/brand?form=cse-search-box&lang=' + tarteaucitron.getLanguage());
    }
};

// google adsense search (result)
tarteaucitron.services.adsensesearchresult = {
    "key": "adsensesearchresult",
    "type": "ads",
    "name": "Google Adsense Search (result)",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.adsensesearchresultCx === undefined) {
            return;
        }
        tarteaucitron.addScript('//www.google.com/cse/cse.js?cx=' + tarteaucitron.user.adsensesearchresultCx);
    },
    "fallback": function () {
        "use strict";
        var id = 'adsensesearchresult';

        if (document.getElementById('gcse_searchresults')) {
            document.getElementById('gcse_searchresults').innerHTML = tarteaucitron.engage(id);
        }
    }
};

// googleadwordsconversion
tarteaucitron.services.googleadwordsconversion = {
    "key": "googleadwordsconversion",
    "type": "ads",
    "name": "Google Adwords (conversion)",
    "uri": "https://www.google.com/settings/ads",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.adwordsconversionId === undefined) {
            return;
        }

        tarteaucitron.addScript('//www.googleadservices.com/pagead/conversion_async.js', '', function () {
            window.google_trackConversion({
                google_conversion_id: tarteaucitron.user.adwordsconversionId,
                google_conversion_label: tarteaucitron.user.adwordsconversionLabel,
                google_conversion_language: tarteaucitron.user.adwordsconversionLanguage,
                google_conversion_format: tarteaucitron.user.adwordsconversionFormat,
                google_conversion_color: tarteaucitron.user.adwordsconversionColor,
                google_conversion_value: tarteaucitron.user.adwordsconversionValue,
                google_conversion_currency: tarteaucitron.user.adwordsconversionCurrency,
                google_custom_params: {
                    parameter1: tarteaucitron.user.adwordsconversionCustom1,
                    parameter2: tarteaucitron.user.adwordsconversionCustom2
                }
            });
        });
    }
};

// googleadwordsremarketing
tarteaucitron.services.googleadwordsremarketing = {
    "key": "googleadwordsremarketing",
    "type": "ads",
    "name": "Google Adwords (remarketing)",
    "uri": "https://www.google.com/settings/ads",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.adwordsremarketingId === undefined) {
            return;
        }

        tarteaucitron.addScript('//www.googleadservices.com/pagead/conversion_async.js', '', function () {
            window.google_trackConversion({
                google_conversion_id: tarteaucitron.user.adwordsremarketingId,
                google_remarketing_only: true
            });
        });
    }
};

// google analytics (old)
tarteaucitron.services.gajs = {
    "key": "gajs",
    "type": "analytic",
    "name": "Google Analytics (ga.js)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": (function () {
        var googleIdentifier = tarteaucitron.user.gajsUa,
            tagUaCookie = '_gat_gtag_' + googleIdentifier,
            tagGCookie = '_ga_' + googleIdentifier;

        tagUaCookie = tagUaCookie.replace(/-/g, '_');
        tagGCookie = tagGCookie.replace(/G-/g, '');

        return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', tagUaCookie, tagGCookie, '_gcl_au'];
    })(),
    "js": function () {
        "use strict";
        window._gaq = window._gaq || [];
        window._gaq.push(['_setAccount', tarteaucitron.user.gajsUa]);
        if (timeExpire !== undefined) {
            _gaq.push(['_setVisitorCookieTimeout', timeExpire]);
        }

        if (tarteaucitron.user.gajsAnonymizeIp) {
            window._gaq.push(['_gat._anonymizeIp']);
        }

        if (tarteaucitron.user.gajsPageView) {
            window._gaq.push(['_trackPageview, ' + tarteaucitron.user.gajsPageView]);
        } else {
            window._gaq.push(['_trackPageview']);
        }

        tarteaucitron.addScript('//www.google-analytics.com/ga.js', '', function () {
            if (typeof tarteaucitron.user.gajsMore === 'function') {
                tarteaucitron.user.gajsMore();
            }
        });
    }
};

// google analytics
tarteaucitron.services.analytics = {
    "key": "analytics",
    "type": "analytic",
    "name": "Google Analytics (universal)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": (function () {
        var googleIdentifier = tarteaucitron.user.analyticsUa,
            tagUaCookie = '_gat_gtag_' + googleIdentifier,
            tagGCookie = '_ga_' + googleIdentifier;

        tagUaCookie = tagUaCookie.replace(/-/g, '_');
        tagGCookie = tagGCookie.replace(/G-/g, '');

        return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', tagUaCookie, tagGCookie, '_gcl_au'];
    })(),
    "js": function () {
        "use strict";
        window.GoogleAnalyticsObject = 'ga';
        window.ga = window.ga || function () {
            window.ga.q = window.ga.q || [];
            window.ga.q.push(arguments);
        };
        window.ga.l = new Date();
        tarteaucitron.addScript('https://www.google-analytics.com/analytics.js', '', function () {
            var uaCreate = { 'cookieExpires': (timeExpire !== undefined) ? timeExpire : 34128000 };
            tarteaucitron.extend(uaCreate, tarteaucitron.user.analyticsUaCreate || {});
            ga('create', tarteaucitron.user.analyticsUa, uaCreate);

            if (tarteaucitron.user.analyticsAnonymizeIp) {
                ga('set', 'anonymizeIp', true);
            }

            if (typeof tarteaucitron.user.analyticsPrepare === 'function') {
                tarteaucitron.user.analyticsPrepare();
            }

            if (tarteaucitron.user.analyticsPageView) {
                ga('send', 'pageview', tarteaucitron.user.analyticsPageView);
            } else {
                ga('send', 'pageview');
            }

            if (typeof tarteaucitron.user.analyticsMore === 'function') {
                tarteaucitron.user.analyticsMore();
            }
        });
    }
};

// google ads
tarteaucitron.services.googleads = {
    "key": "googleads",
    "type": "ads",
    "name": "Google Ads",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": (function () {
        var googleIdentifier = tarteaucitron.user.googleadsId,
            tagUaCookie = '_gat_gtag_' + googleIdentifier,
            tagGCookie = '_ga_' + googleIdentifier;

        tagUaCookie = tagUaCookie.replace(/-/g, '_');
        tagGCookie = tagGCookie.replace(/G-/g, '');

        return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', tagUaCookie, tagGCookie, '_gcl_au'];
    })(),
    "js": function () {
        "use strict";
        window.dataLayer = window.dataLayer || [];
        tarteaucitron.addScript('https://www.googletagmanager.com/gtag/js?id=' + tarteaucitron.user.googleadsId, '', function () {
            window.gtag = function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            var additional_config_info = (timeExpire !== undefined) ? {'anonymize_ip': true, 'cookie_expires': timeExpire / 1000} : {'anonymize_ip': true};

            gtag('config', tarteaucitron.user.googleadsId, additional_config_info);

            if (typeof tarteaucitron.user.googleadsMore === 'function') {
                tarteaucitron.user.googleadsMore();
            }
        });
    }
};

// google analytics
tarteaucitron.services.gtag = {
    "key": "gtag",
    "type": "analytic",
    "name": "Google Analytics (GA4)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": (function () {
        var googleIdentifier = tarteaucitron.user.gtagUa,
            tagUaCookie = '_gat_gtag_' + googleIdentifier,
            tagGCookie = '_ga_' + googleIdentifier;

        tagUaCookie = tagUaCookie.replace(/-/g, '_');
        tagGCookie = tagGCookie.replace(/G-/g, '');

        return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', tagUaCookie, tagGCookie, '_gcl_au'];
    })(),
    "js": function () {
        "use strict";
        window.dataLayer = window.dataLayer || [];
        tarteaucitron.addScript('https://www.googletagmanager.com/gtag/js?id=' + tarteaucitron.user.gtagUa, '', function () {
            window.gtag = function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            var additional_config_info = (timeExpire !== undefined) ? {'anonymize_ip': true, 'cookie_expires': timeExpire / 1000} : {'anonymize_ip': true};

            if (tarteaucitron.user.gtagCrossdomain) {
                /**
                 * https://support.google.com/analytics/answer/7476333?hl=en
                 * https://developers.google.com/analytics/devguides/collection/gtagjs/cross-domain
                 */
                gtag('config', tarteaucitron.user.gtagUa, additional_config_info, { linker: { domains: tarteaucitron.user.gtagCrossdomain, } });
            } else {
                gtag('config', tarteaucitron.user.gtagUa, additional_config_info);
            }

            if (typeof tarteaucitron.user.gtagMore === 'function') {
                tarteaucitron.user.gtagMore();
            }
        });
    }
};

tarteaucitron.services.firebase = {
    "key": "firebase",
    "type": "analytic",
    "name": "Firebase",
    "uri": "https://firebase.google.com/support/privacy",
    "needConsent": true,
    "cookies": (function () {
        var googleIdentifier = tarteaucitron.user.firebaseMeasurementId,
            tagGCookie = '_ga_' + googleIdentifier;

        tagGCookie = tagGCookie.replace(/G-/g, '');

        return ['_ga', tagGCookie];
    })(),
    "js": function () {
        "use strict";

        if (tarteaucitron.user.firebaseApiKey === undefined) {
            return;
        }

        tarteaucitron.addScript('https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js', '', function () {
            tarteaucitron.addScript('https://www.gstatic.com/firebasejs/8.6.2/firebase-analytics.js', '', function () {

                var firebaseConfig = {
                    apiKey: tarteaucitron.user.firebaseApiKey,
                    authDomain: tarteaucitron.user.firebaseAuthDomain,
                    databaseURL: tarteaucitron.user.firebaseDatabaseUrl,
                    projectId: tarteaucitron.user.firebaseProjectId,
                    storageBucket: tarteaucitron.user.firebaseStorageBucket,
                    appId: tarteaucitron.user.firebaseAppId,
                    measurementId: tarteaucitron.user.firebaseMeasurementId,
                };
                firebase.initializeApp(firebaseConfig);
                firebase.analytics();
            });
        });
    }
};

// genially
tarteaucitron.services.genially = {
    "key": "genially",
    "type": "api",
    "name": "genially",
    "uri": "https://www.genial.ly/cookies",
    "needConsent": true,
    "cookies": ['_gat', '_ga', '_gid'],
    "js": function () {
        "use strict";

        tarteaucitron.fallback(['tac_genially'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'genially iframe'),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                geniallyid = x.getAttribute("geniallyid"),
                allowfullscreen = x.getAttribute("allowfullscreen");

            return '<div style="position: relative; padding-bottom: 109.00%; padding-top: 0; height: 0;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" title="' + frame_title + '" src="https://view.genial.ly/' + geniallyid + '" width="' + width + '" height="' + height + '" scrolling="auto" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe></div>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'genially';
        tarteaucitron.fallback(['tac_genially'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// google maps
tarteaucitron.services.googlemaps = {
    "key": "googlemaps",
    "type": "api",
    "name": "Google Maps",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        var mapOptions,
            map,
            uniqIds = [],
            i;

        if (tarteaucitron.user.mapscallback === undefined) {
            tarteaucitron.user.mapscallback = 'tac_googlemaps_callback';
        }

        // Add Google Maps libraries if any (https://developers.google.com/maps/documentation/javascript/libraries)
        var googleMapsLibraries = '';
        if (tarteaucitron.user.googlemapsLibraries) {
            googleMapsLibraries = '&libraries=' + tarteaucitron.user.googlemapsLibraries;
        }

        tarteaucitron.addScript('//maps.googleapis.com/maps/api/js?v=3.exp&key=' + tarteaucitron.user.googlemapsKey + '&callback=' + tarteaucitron.user.mapscallback + googleMapsLibraries);

        window.tac_googlemaps_callback = function () {
            tarteaucitron.fallback(['googlemaps-canvas'], function (x) {
                var uniqId = '_' + Math.random().toString(36).substr(2, 9);
                uniqIds.push(uniqId);
                return '<div id="' + uniqId + '" zoom="' + x.getAttribute('zoom') + '" latitude="' + x.getAttribute('latitude') + '" longitude="' + x.getAttribute('longitude') + '" style="width:' + x.offsetWidth + 'px;height:' + x.offsetHeight + 'px"></div>';
            });

            var i;
            for (i = 0; i < uniqIds.length; i += 1) {
                mapOptions = {
                    zoom: parseInt(document.getElementById(uniqIds[i]).getAttribute('zoom'), 10),
                    center: new google.maps.LatLng(parseFloat(document.getElementById(uniqIds[i]).getAttribute('latitude'), 10), parseFloat(document.getElementById(uniqIds[i]).getAttribute('longitude'), 10))
                };
                map = new google.maps.Map(document.getElementById(uniqIds[i]), mapOptions);
                new google.maps.Marker({ position: { lat: parseFloat(document.getElementById(uniqIds[i]).getAttribute('latitude'), 10), lng: parseFloat(document.getElementById(uniqIds[i]).getAttribute('longitude'), 10) }, map: map });
            }
        };
    },
    "fallback": function () {
        "use strict";
        var id = 'googlemaps';
        tarteaucitron.fallback(['googlemaps-canvas'], tarteaucitron.engage(id));
    }
};

// googlemaps search
tarteaucitron.services.googlemapssearch = {
    "key": "googlemapssearch",
    "type": "api",
    "name": "Google Maps Search API",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['nid'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['googlemapssearch'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Google search iframe'),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                // url = x.getAttribute("data-url");
                query = escape(x.getAttribute("data-search")),
                key = x.getAttribute("data-api-key");

            return '<iframe title="' + frame_title + '" width="' + width + '" height="' + height + '" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=' + query + '&key=' + key + '" allowfullscreen></iframe> '
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'googlemapssearch';
        tarteaucitron.fallback(['googlemapssearch'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// googlemaps embed iframe
tarteaucitron.services.googlemapsembed = {
    "key": "googlemapsembed",
    "type": "api",
    "name": "Google Maps Embed",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['apisid', 'hsid', 'nid', 'sapisid', 'sid', 'sidcc', 'ssid', '1p_jar'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['googlemapsembed'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Google maps iframe'),
                width = tarteaucitron.getElemWidth(x),
                height = tarteaucitron.getElemHeight(x),
                url = x.getAttribute("data-url");

            return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="no" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'googlemapsembed';
        tarteaucitron.fallback(['googlemapsembed'], function (elem) {
            elem.style.width = tarteaucitron.getElemWidth(elem) + 'px';
            elem.style.height = tarteaucitron.getElemHeight(elem) + 'px';
            return tarteaucitron.engage(id);
        });
    }
};


// openstreetmap embed iframe
tarteaucitron.services.openstreetmap = {
    "key": "openstreetmap",
    "type": "api",
    "name": "Openstreetmap Embed",
    "uri": "https://wiki.osmfoundation.org/wiki/Privacy_Policy#Cookies",
    "needConsent": true,
    "cookies": ['apisid', 'hsid', 'nid', 'sapisid', 'sid', 'sidcc', 'ssid', '1p_jar'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['openstreetmap'], function (x) {
            var width = tarteaucitron.getElemWidth(x),
                height = tarteaucitron.getElemHeight(x),
                url = x.getAttribute("data-url");

            return '<iframe src="' + url + '" width="' + width + '" height="' + height + '" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'openstreetmap';
        tarteaucitron.fallback(['openstreetmap'], function (elem) {
            elem.style.width = tarteaucitron.getElemWidth(elem) + 'px';
            elem.style.height = tarteaucitron.getElemHeight(elem) + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// geoportail embed iframe
tarteaucitron.services.geoportail = {
    "key": "geoportail",
    "type": "api",
    "name": "Geoportail maps Embed",
    "uri": "https://www.ign.fr/institut/gestion-des-cookies",
    "needConsent": true,
    "cookies": ['apisid', 'hsid', 'nid', 'sapisid', 'sid', 'sidcc', 'ssid', '1p_jar'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['geoportail'], function (x) {
            var width = tarteaucitron.getElemWidth(x),
                height = tarteaucitron.getElemHeight(x),
                url = x.getAttribute("data-url");

            return '<iframe src="' + url + '" width="' + width + '" height="' + height + '" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" sandbox="allow-forms allow-scripts allow-same-origin" allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'geoportail';
        tarteaucitron.fallback(['geoportail'], function (elem) {
            elem.style.width = tarteaucitron.getElemWidth(elem) + 'px';
            elem.style.height = tarteaucitron.getElemHeight(elem) + 'px';
            return tarteaucitron.engage(id);
        });
    }
};


// google tag manager
tarteaucitron.services.googletagmanager = {
    "key": "googletagmanager",
    "type": "api",
    "name": "Google Tag Manager",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['_ga', '_gat', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', '__gads', '_drt_', 'FLC', 'exchange_uid', 'id', 'fc', 'rrs', 'rds', 'rv', 'uid', 'UIDR', 'UID', 'clid', 'ipinfo', 'acs'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.googletagmanagerId === undefined) {
            return;
        }
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });
        tarteaucitron.addScript('https://www.googletagmanager.com/gtm.js?id=' + tarteaucitron.user.googletagmanagerId);
    }
};

// google tag manager multiple
tarteaucitron.services.multiplegoogletagmanager = {
    "key": "multiplegoogletagmanager",
    "type": "api",
    "name": "Google Tag Manager",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['_ga', '_gat', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', '__gads', '_drt_', 'FLC', 'exchange_uid', 'id', 'fc', 'rrs', 'rds', 'rv', 'uid', 'UIDR', 'UID', 'clid', 'ipinfo', 'acs'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.multiplegoogletagmanagerId === undefined) {
            return;
        }
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });

        tarteaucitron.user.multiplegoogletagmanagerId.forEach(function (id) {
            tarteaucitron.addScript('https://www.googletagmanager.com/gtm.js?id=' + id);
        });

    }
};

// google webfonts
tarteaucitron.services.googlefonts = {
    "key": "googlefonts",
    "type": "api",
    "name": "Google Webfonts",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.googleFonts === undefined) {
            return;
        }
        tarteaucitron.addScript('//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js', '', function () {
            WebFont.load({
                google: {
                    families: tarteaucitron.user.googleFonts
                }
            });
        });
    }
};

// hubspot
tarteaucitron.services.hubspot = {
    "key": "hubspot",
    "type": "analytic",
    "name": "Hubspot",
    "uri": "https://legal.hubspot.com/privacy-policy",
    "needConsent": true,
    "cookies": ['hubspotutk', 'fr', '__hstc', '__hssrc', '__hssc', '__cfduid'],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('//js.hs-scripts.com/' + tarteaucitron.user.hubspotId + '.js', 'hs-script-loader');
    }
};

// instagram
tarteaucitron.services.instagram = {
    "key": "instagram",
    "type": "social",
    "name": "Instagram",
    "uri": "https://www.instagram.com/legal/privacy/",
    "needConsent": true,
    "cookies": ['shbts', 'sessionid', 'csrftoken', 'rur', 'shbid', 'mid', 'ds_usr_id', 'ig_did', 'ig_cb', 'datr'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['instagram_post'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Instagram iframe'),
                post_id = x.getAttribute('postId'),
                post_permalink = x.getAttribute('data-instgrm-permalink'),
                embed_width = x.getAttribute('width'),
                embed_height = x.getAttribute('height'),
                frame_width,
                frame_height,
                post_frame;

            if (post_permalink != null) {
                tarteaucitron.addScript('//www.instagram.com/embed.js', 'instagram-embed');

                return '';
            }

            if (post_id === undefined) {
                return "";
            }

            if (embed_width !== undefined) {
                frame_width = 'width="' + embed_width + '" ';
            } else {
                frame_width = '"" ';
            }
            if (embed_height !== undefined) {
                frame_height = 'height="' + embed_height + '" ';
            } else {
                frame_height = '"" ';
            }

            post_frame = '<iframe title="' + frame_title + '" src="//www.instagram.com/' + post_id + '/embed" ' + frame_width + frame_height + '></iframe>';

            return post_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'instagram';
        tarteaucitron.fallback(['instagram_post'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// jsapi
tarteaucitron.services.jsapi = {
    "key": "jsapi",
    "type": "api",
    "name": "Google jsapi",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('//www.google.com/jsapi');
    }
};

// twitterwidgetsapi
tarteaucitron.services.twitterwidgetsapi = {
    "key": "twitterwidgetsapi",
    "type": "api",
    "name": "Twitter Widgets API",
    "uri": "https://support.twitter.com/articles/20170514",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tacTwitterAPI'], '');
        tarteaucitron.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs');
    },
    "fallback": function () {
        "use strict";
        var id = 'twitterwidgetsapi';
        tarteaucitron.fallback(['tacTwitterAPI'], tarteaucitron.engage(id));
    }
};

// recaptcha
tarteaucitron.services.recaptcha = {
    "key": "recaptcha",
    "type": "api",
    "name": "reCAPTCHA",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['nid'],
    "js": function () {
        "use strict";
        window.tacRecaptchaOnLoad = tarteaucitron.user.recaptchaOnLoad || function () { };
        tarteaucitron.fallback(['g-recaptcha'], '');

        if (tarteaucitron.user.recaptchaapi === undefined) {
            tarteaucitron.addScript('https://www.google.com/recaptcha/api.js?onload=tacRecaptchaOnLoad');
        } else {
            tarteaucitron.addScript('https://www.google.com/recaptcha/api.js?onload=tacRecaptchaOnLoad&render=' + tarteaucitron.user.recaptchaapi);
        }

    },
    "fallback": function () {
        "use strict";
        var id = 'recaptcha';
        tarteaucitron.fallback(['g-recaptcha'], tarteaucitron.engage(id));
    }
};

// linkedin
tarteaucitron.services.linkedin = {
    "key": "linkedin",
    "type": "social",
    "name": "Linkedin",
    "uri": "https://www.linkedin.com/legal/cookie_policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tacLinkedin'], '');
        tarteaucitron.addScript('//platform.linkedin.com/in.js');
        if (tarteaucitron.isAjax === true) {
            if (typeof IN !== "undefined") {
                IN.parse();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'linkedin';
        tarteaucitron.fallback(['tacLinkedin'], tarteaucitron.engage(id));
    }
};

// mautic
tarteaucitron.services.mautic = {
    "key": "mautic",
    "type": "analytic",
    "name": "Mautic",
    "uri": "https://www.mautic.org/privacy-policy/",
    "needConsent": true,
    "cookies": ['mtc_id', 'mtc_sid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.mauticurl === undefined) {
            return;
        }

        window.MauticTrackingObject = 'mt';
        window.mt = window.mt || function () {
            window.mt.q = window.mt.q || [];
            window.mt.q.push(arguments);
        };

        tarteaucitron.addScript(tarteaucitron.user.mauticurl, '', function () {
            mt('send', 'pageview');
        });
    }
};

// microsoftcampaignanalytics
tarteaucitron.services.microsoftcampaignanalytics = {
    "key": "microsoftcampaignanalytics",
    "type": "analytic",
    "name": "Microsoft Campaign Analytics",
    "uri": "https://privacy.microsoft.com/privacystatement/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.microsoftcampaignanalyticsUUID === undefined) {
            return;
        }

        tarteaucitron.addScript('//flex.atdmt.com/mstag/site/' + tarteaucitron.user.microsoftcampaignanalyticsUUID + '/mstag.js', 'mstag_tops', function () {
            window.mstag = { loadTag: function () { }, time: (new Date()).getTime() };
            window.mstag.loadTag("analytics", { dedup: "1", domainId: tarteaucitron.user.microsoftcampaignanalyticsdomainId, type: "1", actionid: tarteaucitron.user.microsoftcampaignanalyticsactionId });
        });
    }
};

// onesignal
tarteaucitron.services.onesignal = {
    "key": "onesignal",
    "type": "api",
    "name": "OneSignal",
    "uri": "https://onesignal.com/privacy_policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.onesignalAppId === undefined) {
            return;
        }
        window.OneSignal = window.OneSignal || [];

        window.OneSignal.push(function () {
            window.OneSignal.init({
                appId: tarteaucitron.user.onesignalAppId,
            });
        });

        tarteaucitron.addScript('https://cdn.onesignal.com/sdks/OneSignalSDK.js');
    }
};

// pinterest
tarteaucitron.services.pinterest = {
    "key": "pinterest",
    "type": "social",
    "name": "Pinterest",
    "uri": "https://about.pinterest.com/privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tacPinterest'], '');
        tarteaucitron.addScript('//assets.pinterest.com/js/pinit.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'pinterest';
        tarteaucitron.fallback(['tacPinterest'], tarteaucitron.engage(id));
    }
};

// prelinker
tarteaucitron.services.prelinker = {
    "key": "prelinker",
    "type": "ads",
    "name": "Prelinker",
    "uri": "http://www.prelinker.com/index/index/cgu/",
    "needConsent": true,
    "cookies": ['_sp_id.32f5', '_sp_ses.32f5'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['prelinker-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" siteId="' + x.getAttribute('siteId') + '" bannerId="' + x.getAttribute('bannerId') + '" defaultLanguage="' + x.getAttribute('defaultLanguage') + '" tracker="' + x.getAttribute('tracker') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = 'http://promo.easy-dating.org/banner/index?';
            uri += 'site_id=' + document.getElementById(uniqIds[i]).getAttribute('siteId') + '&';
            uri += 'banner_id=' + document.getElementById(uniqIds[i]).getAttribute('bannerId') + '&';
            uri += 'default_language=' + document.getElementById(uniqIds[i]).getAttribute('defaultLanguage') + '&';
            uri += 'tr4ck=' + document.getElementById(uniqIds[i]).getAttribute('trackrt');

            tarteaucitron.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'prelinker';
        tarteaucitron.fallback(['prelinker-canvas'], tarteaucitron.engage(id));
    }
};

// prezi
tarteaucitron.services.prezi = {
    "key": "prezi",
    "type": "video",
    "name": "Prezi",
    "uri": "https://prezi.com/privacy-policy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['prezi-canvas'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Prezi iframe'),
                id = x.getAttribute("data-id"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = 'https://prezi.com/embed/' + id + '/?bgcolor=ffffff&amp;lock_to_path=0&amp;autoplay=0&amp;autohide_ctrls=0';

            return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="no" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'prezi';
        tarteaucitron.fallback(['prezi-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// pubdirecte
tarteaucitron.services.pubdirecte = {
    "key": "pubdirecte",
    "type": "ads",
    "name": "Pubdirecte",
    "uri": "http://pubdirecte.com/contact.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['pubdirecte-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" pid="' + x.getAttribute('pid') + '" ref="' + x.getAttribute('ref') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//www.pubdirecte.com/script/banniere.php?';
            uri += 'id=' + document.getElementById(uniqIds[i]).getAttribute('pid') + '&';
            uri += 'ref=' + document.getElementById(uniqIds[i]).getAttribute('ref');

            tarteaucitron.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'pubdirecte';
        tarteaucitron.fallback(['pubdirecte-canvas'], tarteaucitron.engage(id));
    }
};

// purechat
tarteaucitron.services.purechat = {
    "key": "purechat",
    "type": "support",
    "name": "PureChat",
    "uri": "https://www.purechat.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.purechatId === undefined) {
            return;
        }

        tarteaucitron.addScript('//app.purechat.com/VisitorWidget/WidgetScript', '', function () {
            try {
                window.w = new PCWidget({ c: tarteaucitron.user.purechatId, f: true });
            } catch (e) { }
        });
    }
};

// Intercom
tarteaucitron.services.intercomChat = {
    "key": "intercomChat",
    "type": "support",
    "name": "Intercom",
    "uri": "https://www.intercom.com/",
    "needConsent": true,
    "cookies": [
        "intercom-id-" + tarteaucitron.user.intercomKey,
        "intercom-session-" + tarteaucitron.user.intercomKey,
    ],
    "readmoreLink": "https://www.intercom.com/legal/privacy",
    "js": function () {
        window.intercomSettings = {
            app_id: tarteaucitron.user.intercomKey,
        };

        var w = window;
        var ic = w.Intercom;
        if (typeof ic === "function") {
            ic("reattach_activator");
            ic("update", w.intercomSettings);
        } else {
            var i = function () {
                i.c(arguments);
            };
            i.q = [];
            i.c = function (args) {
                i.q.push(args);
            };
            w.Intercom = i;
            tarteaucitron.addScript(
                "https://widget.intercom.io/widget/" + tarteaucitron.user.intercomKey,
                "",
                function () {
                    // Execute callback if function `intercomChatEnable`
                    // is defined
                    if (typeof intercomChatEnable === 'function') {
                        intercomChatEnable()
                    }
                }
            );
        }
    },
    "fallback": function () {
        "use strict";
        var id = "intercomChat";
        tarteaucitron.fallback(
            ["intercom-chat"],
            function () {
                // Execute callback if function `intercomChatDisable`
                // is defined
                if (typeof intercomChatDisable === 'function') {
                    intercomChatDisable()
                }
                return tarteaucitron.engage(id)
            }
        );
    },
};

// rumbletalk
tarteaucitron.services.rumbletalk = {
    "key": "rumbletalk",
    "type": "social",
    "name": "RumbleTalk",
    "needConsent": true,
    "cookies": ['AWSALB'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.rumbletalkid === undefined) {
            return;
        }

        tarteaucitron.addScript('https://rumbletalk.com/client/?' + tarteaucitron.user.rumbletalkid);

        tarteaucitron.fallback(['rumbletalk'], function (x) {
            var width = tarteaucitron.getElemWidth(x),
                height = tarteaucitron.getElemHeight(x),
                id = x.getAttribute("data-id");

            return '<div style="height: ' + height + 'px; width: ' + width + 'px;"><div id="' + id + '"></div></div>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'rumbletalk';
        tarteaucitron.fallback(['rumbletalk'], function (elem) {
            elem.style.width = tarteaucitron.getElemWidth(elem) + 'px';
            elem.style.height = tarteaucitron.getElemHeight(elem) + 'px';

            return tarteaucitron.engage(id);
        });
    }
};

// shareaholic
tarteaucitron.services.shareaholic = {
    "key": "shareaholic",
    "type": "social",
    "name": "Shareaholic",
    "uri": "https://shareaholic.com/privacy/choices",
    "needConsent": true,
    "cookies": ['__utma', '__utmb', '__utmc', '__utmz', '__utmt_Shareaholic%20Pageviews'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.shareaholicSiteId === undefined) {
            return;
        }

        tarteaucitron.fallback(['shareaholic-canvas'], '');
        tarteaucitron.addScript('//dsms0mj1bbhn4.cloudfront.net/assets/pub/shareaholic.js', '', function () {
            try {
                Shareaholic.init(tarteaucitron.user.shareaholicSiteId);
            } catch (e) { }
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'shareaholic';
        tarteaucitron.fallback(['shareaholic-canvas'], tarteaucitron.engage(id));
    }
};

// shareasale
tarteaucitron.services.shareasale = {
    "key": "shareasale",
    "type": "ads",
    "name": "ShareASale",
    "uri": "https://www.shareasale.com/PrivacyPolicy.pdf",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['shareasale-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" amount="' + x.getAttribute('amount') + '" tracking="' + x.getAttribute('tracking') + '" transtype="' + x.getAttribute('transtype') + '" persale="' + x.getAttribute('persale') + '" perlead="' + x.getAttribute('perlead') + '" perhit="' + x.getAttribute('perhit') + '" merchantID="' + x.getAttribute('merchantID') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = 'https://shareasale.com/sale.cfm?';
            uri += 'amount=' + document.getElementById(uniqIds[i]).getAttribute('amount') + '&';
            uri += 'tracking=' + document.getElementById(uniqIds[i]).getAttribute('tracking') + '&';
            uri += 'transtype=' + document.getElementById(uniqIds[i]).getAttribute('transtype') + '&';
            uri += 'persale=' + document.getElementById(uniqIds[i]).getAttribute('persale') + '&';
            uri += 'perlead=' + document.getElementById(uniqIds[i]).getAttribute('perlead') + '&';
            uri += 'perhit=' + document.getElementById(uniqIds[i]).getAttribute('perhit') + '&';
            uri += 'merchantID=' + document.getElementById(uniqIds[i]).getAttribute('merchantID');

            document.getElementById(uniqIds[i]).innerHTML = '<img src=\'' + uri + '\' width=\'1\' height=\'1\' />';
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'shareasale';
        tarteaucitron.fallback(['shareasale-canvas'], tarteaucitron.engage(id));
    }
};

// sharethis
tarteaucitron.services.sharethis = {
    "key": "sharethis",
    "type": "social",
    "name": "ShareThis",
    "uri": "http://www.sharethis.com/legal/privacy/",
    "needConsent": true,
    "cookies": ['__unam'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.sharethisPublisher === undefined) {
            return;
        }
        var switchTo5x = true,
            uri = ('https:' === document.location.protocol ? 'https://ws' : 'http://w') + '.sharethis.com/button/buttons.js';

        tarteaucitron.fallback(['tacSharethis'], '');
        tarteaucitron.addScript(uri, '', function () {
            stLight.options({ publisher: tarteaucitron.user.sharethisPublisher, doNotHash: false, doNotCopy: false, hashAddressBar: false });
        });

        if (tarteaucitron.isAjax === true) {
            if (typeof stButtons !== "undefined") {
                stButtons.locateElements();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'sharethis';
        tarteaucitron.fallback(['tacSharethis'], tarteaucitron.engage(id));
    }
};

// slideshare
tarteaucitron.services.slideshare = {
    "key": "slideshare",
    "type": "video",
    "name": "SlideShare",
    "uri": "https://www.linkedin.com/legal/privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['slideshare-canvas'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Slideshare iframe'),
                id = x.getAttribute("data-id"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = '//www.slideshare.net/slideshow/embed_code/' + id;

            return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="no" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'slideshare';
        tarteaucitron.fallback(['slideshare-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// soundcloud
tarteaucitron.services.soundcloud = {
    key: 'soundcloud',
    type: 'video',
    name: 'SoundCloud',
    needConsent: true,
    cookies: ['sc_anonymous_id', 'sclocale'],
    js: function () {
        "use strict";
        tarteaucitron.fallback(['soundcloud_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Soundcloud iframe'),
                player_height = x.getAttribute('data-height'),
                frame_height = 'height="' + player_height + '" ',
                playable_id = x.getAttribute('data-playable-id'),
                playable_type = x.getAttribute('data-playable-type'),
                playable_url = x.getAttribute('data-playable-url'),
                color = x.getAttribute('data-color'),
                autoplay = x.getAttribute('data-auto-play'),
                hideRelated = x.getAttribute('data-hide-related'),
                showComments = x.getAttribute('data-show-comments'),
                showUser = x.getAttribute('data-show-user'),
                showReposts = x.getAttribute('data-show-reposts'),
                showTeaser = x.getAttribute('data-show-teaser'),
                visual = x.getAttribute('data-visual'),
                artwork = x.getAttribute('data-artwork');

            var allowAutoplay = autoplay === 'true' ? 'allow="autoplay"' : '';

            if (playable_id === undefined && playable_url === undefined) {
                return "";
            }

            // Allow to embed from API results (playable_type + playable_id)
            var qs = '?url=https%3A//api.soundcloud.com/' + playable_type + '/' + playable_id;
            // Or from raw URL from Soundcloud website
            if (playable_url && playable_url.length > 0) qs = '?url=' + escape(playable_url);

            if (hideRelated && hideRelated.length > 0) qs += '&hide_related=' + hideRelated;
            if (color && color.length > 0) qs += '&color=' + color.replace('#', '%23');
            if (autoplay && autoplay.length > 0) qs += '&auto_play=' + autoplay;
            if (showComments && showComments.length > 0) qs += '&show_comments=' + showComments;
            if (hideRelated && hideRelated.length > 0) qs += '&hide_related=' + hideRelated;
            if (showUser && showUser.length > 0) qs += '&show_user=' + showUser;
            if (showReposts && showReposts.length > 0) qs += '&show_reposts=' + showReposts;
            if (showTeaser && showTeaser.length > 0) qs += '&show_teaser=' + showTeaser;
            if (visual && visual.length > 0) qs += '&visual=' + visual;
            if (artwork && artwork.length > 0) qs += '&show_artwork=' + artwork;

            return '<iframe title="' + frame_title + '" width="100%" ' + frame_height + ' scrolling="no" ' + allowAutoplay + ' src="https://w.soundcloud.com/player/' + qs + '"></iframe>';
        });
    },
    fallback: function () {
        "use strict";
        tarteaucitron.fallback(['soundcloud_player'], function (elem) {
            elem.style.height = elem.getAttribute('data-height') + 'px';
            return tarteaucitron.engage('soundcloud');
        });
    }
};

// spotify
tarteaucitron.services.spotify = {
    "key": "spotify",
    "type": "video",
    "name": "Spotify",
    "uri": "https://www.spotify.com/us/legal/privacy-policy/",
    "needConsent": true,
    "cookies": ['sp_landing', '_ga', 'sp_ab', 'sp_landingref', 'sp_t', 'sp_usid', 'OptanonConsent', 'sp_m', 'spot'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['spotify_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Spotify iframe'),
                spotify_id = x.getAttribute("spotifyID"),
                spotify_width = x.getAttribute("width"),
                frame_width = 'width=',
                spotify_height = x.getAttribute("height"),
                frame_height = 'height=',
                spotify_frame;

            if (spotify_id === undefined) {
                return "";
            }
            if (spotify_width !== undefined) {
                frame_width += '"' + spotify_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (spotify_height !== undefined) {
                frame_height += '"' + spotify_height + '" ';
            } else {
                frame_height += '"" ';
            }
            spotify_frame = '<iframe title="' + frame_title + '" src="//open.spotify.com/embed/' + spotify_id + '" ' + frame_width + frame_height + ' allowfullscreen></iframe>';
            return spotify_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'spotify';
        tarteaucitron.fallback(['spotify_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// statcounter
tarteaucitron.services.statcounter = {
    "key": "statcounter",
    "type": "analytic",
    "name": "StatCounter",
    "uri": "https://fr.statcounter.com/about/legal/#privacy",
    "needConsent": true,
    "cookies": ['sc_is_visitor_unique'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri = '//statcounter.com/counter/counter.js';

        tarteaucitron.fallback(['statcounter-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            tarteaucitron.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'statcounter';
        tarteaucitron.fallback(['statcounter-canvas'], tarteaucitron.engage(id));
    }
};

// timelinejs
tarteaucitron.services.timelinejs = {
    "key": "timelinejs",
    "type": "api",
    "name": "Timeline JS",
    "uri": "http://timeline.knightlab.com/#help",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['timelinejs-canvas'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Twitter iframe'),
                spreadsheet_id = x.getAttribute("spreadsheet_id"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                lang = x.getAttribute("lang_2_letter"),
                font = x.getAttribute("font"),
                map = x.getAttribute("map"),
                start_at_end = x.getAttribute("start_at_end"),
                hash_bookmark = x.getAttribute("hash_bookmark"),
                start_at_slide = x.getAttribute("start_at_slide"),
                start_zoom = x.getAttribute("start_zoom"),
                url = '//cdn.knightlab.com/libs/timeline/latest/embed/index.html?source=' + spreadsheet_id + '&font=' + font + '&maptype=' + map + '&lang=' + lang + '&start_at_end=' + start_at_end + '&hash_bookmark=' + hash_bookmark + '&start_at_slide=' + start_at_slide + '&start_zoom_adjust=' + start_zoom + '&height=' + height;

            return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'timelinejs';
        tarteaucitron.fallback(['timelinejs-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// tagcommander
tarteaucitron.services.tagcommander = {
    "key": "tagcommander",
    "type": "api",
    "name": "TagCommander",
    "uri": "https://www.commandersact.com/en/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.tagcommanderid === undefined) {
            return;
        }
        tarteaucitron.addScript('https://cdn.tagcommander.com/' + tarteaucitron.user.tagcommanderid + '.js');
    }
};

// typekit
tarteaucitron.services.typekit = {
    "key": "typekit",
    "type": "api",
    "name": "Typekit (adobe)",
    "uri": "https://www.adobe.com/privacy.html",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.typekitId === undefined) {
            return;
        }
        tarteaucitron.addScript('//use.typekit.net/' + tarteaucitron.user.typekitId + '.js', '', function () {
            try {
                Typekit.load();
            } catch (e) { }
        });
    }
};

// twenga
tarteaucitron.services.twenga = {
    "key": "twenga",
    "type": "ads",
    "name": "Twenga",
    "uri": "http://www.twenga.com/privacy.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.twengaId === undefined || tarteaucitron.user.twengaLocale === undefined) {
            return;
        }

        tarteaucitron.addScript('//tracker.twenga.' + tarteaucitron.user.twengaLocale + '/st/tracker_' + tarteaucitron.user.twengaId + '.js');
    }
};

// twitter
tarteaucitron.services.twitter = {
    "key": "twitter",
    "type": "social",
    "name": "Twitter",
    "uri": "https://support.twitter.com/articles/20170514",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tacTwitter'], '');
        tarteaucitron.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs');
    },
    "fallback": function () {
        "use strict";
        var id = 'twitter';
        tarteaucitron.fallback(['tacTwitter'], tarteaucitron.engage(id));
    }
};

// twitter embed
tarteaucitron.services.twitterembed = {
    "key": "twitterembed",
    "type": "social",
    "name": "Twitter (cards)",
    "uri": "https://support.twitter.com/articles/20170514",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            e,
            html;

        tarteaucitron.fallback(['twitterembed-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            html = '<div id="' + uniqId + '" ';
            html += 'tweetid="' + x.getAttribute('tweetid') + '" ';
            html += 'theme="' + x.getAttribute('theme') + '" ';
            html += 'cards="' + x.getAttribute('cards') + '" ';
            html += 'conversation="' + x.getAttribute('conversation') + '" ';
            html += 'data-width="' + x.getAttribute('data-width') + '" ';
            html += 'data-align="' + x.getAttribute('data-align') + '" ';
            html += '></div>';
            return html;
        });

        tarteaucitron.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs', function () {
            var i;
            for (i = 0; i < uniqIds.length; i += 1) {
                e = document.getElementById(uniqIds[i]);
                twttr.widgets.createTweet(
                    e.getAttribute('tweetid'),
                    e,
                    {
                        theme: e.getAttribute('theme'),
                        cards: e.getAttribute('cards'),
                        conversation: e.getAttribute('conversation'),
                        lang: tarteaucitron.getLanguage(),
                        dnt: true,
                        width: e.getAttribute('data-width'),
                        align: e.getAttribute('data-align')
                    }
                );
            }
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'twitterembed';
        tarteaucitron.fallback(['twitterembed-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('data-width') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// twitter timeline
tarteaucitron.services.twittertimeline = {
    "key": "twittertimeline",
    "type": "social",
    "name": "Twitter (timelines)",
    "uri": "https://support.twitter.com/articles/20170514",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tacTwitterTimelines'], '');
        tarteaucitron.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs');
    },
    "fallback": function () {
        "use strict";
        var id = 'twittertimeline';
        tarteaucitron.fallback(['tacTwitterTimelines'], tarteaucitron.engage(id));
    }
};

// twitter universal website tag
tarteaucitron.services.twitteruwt = {
    "key": "twitteruwt",
    "type": "analytic",
    "name": "Twitter Universal Website Tag",
    "uri": "https://business.twitter.com/en/help/campaign-measurement-and-analytics/conversion-tracking-for-websites.html",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        window.twq = function () {
            window.twq.exe ? window.twq.exe.apply(window.twq, arguments) : window.twq.queue.push(arguments);
        }
        window.twq.version = '1.1';
        window.twq.queue = [];

        tarteaucitron.addScript('https://static.ads-twitter.com/uwt.js', '', function () {
            window.twq('init', tarteaucitron.user.twitteruwtId);
            window.twq('track', 'PageView');
        });
    }
};

// user voice
tarteaucitron.services.uservoice = {
    "key": "uservoice",
    "type": "support",
    "name": "UserVoice",
    "uri": "https://www.uservoice.com/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.userVoiceApi === undefined) {
            return;
        }
        tarteaucitron.addScript('//widget.uservoice.com/' + tarteaucitron.user.userVoiceApi + '.js');
    }
};

// vimeo
tarteaucitron.services.vimeo = {
    "key": "vimeo",
    "type": "video",
    "name": "Vimeo",
    "uri": "https://vimeo.com/privacy",
    "needConsent": true,
    "cookies": ['__utmt_player', '__utma', '__utmb', '__utmc', '__utmv', 'vuid', '__utmz', 'player'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['vimeo_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(tarteaucitron.getElemAttr(x, "title") || 'Vimeo iframe'),
                video_width = tarteaucitron.getElemAttr(x, "width"),
                frame_width = 'width=',
                video_height = tarteaucitron.getElemAttr(x, "height"),
                frame_height = 'height=',

                video_id = tarteaucitron.getElemAttr(x, "videoID"),
                video_hash = tarteaucitron.getElemAttr(x, "data-hash") || '',
                video_allowfullscreen = tarteaucitron.getElemAttr(x, "data-allowfullscreen"),

                video_qs = "",
                attrs = ["title", "byline", "portrait", "loop", "autoplay", "autopause", "background", "color", "controls", "maxheight", "maxwidth", "muted", "playsinline", "speed", "transparent"],
                params = attrs.filter(function (a) {
                    return tarteaucitron.getElemAttr(x, a) !== null;
                }).map(function (a) {
                    return a + "=" + tarteaucitron.getElemAttr(x, a);
                }),

                video_frame;

            if (video_id === undefined) {
                return "";
            }

            // query params
            if (video_hash.length > 0) {
                params.push("h=" + video_hash);
            }
            if (params.length > 0) {
                video_qs = "?" + params.join("&");
            }

            // attributes
            if (video_width !== undefined) {
                frame_width += '"' + video_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (video_height !== undefined) {
                frame_height += '"' + video_height + '" ';
            } else {
                frame_height += '"" ';
            }

            video_frame = '<iframe title="' + frame_title + '" src="//player.vimeo.com/video/' + video_id + video_qs + '" ' + frame_width + frame_height + (video_allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';

            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'vimeo';
        tarteaucitron.fallback(['vimeo_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// visualrevenue
tarteaucitron.services.visualrevenue = {
    "key": "visualrevenue",
    "type": "analytic",
    "name": "VisualRevenue",
    "uri": "http://www.outbrain.com/legal/privacy-713/",
    "needConsent": true,
    "cookies": ['__vrf', '__vrm', '__vrl', '__vry', '__vru', '__vrid', '__vrz'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.visualrevenueId === undefined) {
            return;
        }
        window._vrq = window._vrq || [];
        window._vrq.push(['id', tarteaucitron.user.visualrevenueId]);
        window._vrq.push(['automate', true]);
        window._vrq.push(['track', function () { }]);
        tarteaucitron.addScript('http://a.visualrevenue.com/vrs.js');
    }
};

// verizon dot tag
tarteaucitron.services.verizondottag = {
    "key": "verizondottag",
    "type": "analytic",
    "name": "Verizon Dot Tag",
    "uri": "https://developer.verizonmedia.com/native/guide/audience-management/dottags/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        window.dotq = window.dotq || [];
        window.dotq.push({
            'projectId': tarteaucitron.user.verizondottagProjectId,
            'properties': { 'pixelId': tarteaucitron.user.verizondottagPixelId }
        });

        tarteaucitron.addScript('https://s.yimg.com/wi/ytc.js', '', function () {
            //const items = window.dotq;
            window.dotq = [];
            window.dotq.push = function (item) {
                YAHOO.ywa.I13N.fireBeacon([item])
            };
            YAHOO.ywa.I13N.fireBeacon(items)
        });
    }
};

// vshop
tarteaucitron.services.vshop = {
    "key": "vshop",
    "type": "ads",
    "name": "vShop",
    "uri": "http://vshop.fr/privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['vcashW'], '');
        tarteaucitron.addScript('//vshop.fr/js/w.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'vshop';
        tarteaucitron.fallback(['vcashW'], tarteaucitron.engage(id));
    }
};

// wysistat
tarteaucitron.services.wysistat = {
    "key": "wysistat",
    "type": "analytic",
    "name": "Wysistat",
    "uri": "http://wysistat.net/contact/",
    "needConsent": true,
    "cookies": ['Wysistat'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.wysistat === undefined) {
            return;
        }
        tarteaucitron.addScript('//www.wysistat.com/statistique.js', '', function () {
            window.stat(tarteaucitron.user.wysistat.cli, tarteaucitron.user.wysistat.frm, tarteaucitron.user.wysistat.prm, tarteaucitron.user.wysistat.ce, tarteaucitron.user.wysistat.page, tarteaucitron.user.wysistat.roi, tarteaucitron.user.wysistat.prof, tarteaucitron.user.wysistat.cpt);
        });
    }
};

// xiti
tarteaucitron.services.xiti = {
    "key": "xiti",
    "type": "analytic",
    "name": "Xiti",
    "uri": "https://www.atinternet.com/rgpd-et-vie-privee/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.xitiId === undefined) {
            return;
        }
        var Xt_param = 's=' + tarteaucitron.user.xitiId + '&p=',
            Xt_r,
            Xt_h,
            Xt_i,
            Xt_s,
            div = document.createElement('div');
        try {
            Xt_r = top.document.referrer;
        } catch (e) {
            Xt_r = document.referrer;
        }
        Xt_h = new Date();
        Xt_i = '<img style="display:none" border="0" alt="" ';
        Xt_i += 'src="http://logv3.xiti.com/hit.xiti?' + Xt_param;
        Xt_i += '&hl=' + Xt_h.getHours() + 'x' + Xt_h.getMinutes() + 'x' + Xt_h.getSeconds();
        if (parseFloat(navigator.appVersion) >= 4) {
            Xt_s = screen;
            Xt_i += '&r=' + Xt_s.width + 'x' + Xt_s.height + 'x' + Xt_s.pixelDepth + 'x' + Xt_s.colorDepth;
        }

        div.innerHTML = Xt_i + '&ref=' + Xt_r.replace(/[<>"]/g, '').replace(/&/g, '$') + '" title="Internet Audience">';
        document.getElementsByTagName('body')[0].appendChild(div.firstChild);

        if (typeof tarteaucitron.user.xitiMore === 'function') {
            tarteaucitron.user.xitiMore();
        }
    }
};

// AT Internet
tarteaucitron.services.atinternet = {
    "key": "atinternet",
    "type": "analytic",
    "name": "AT Internet (privacy by design)",
    "uri": "https://www.atinternet.com/rgpd-et-vie-privee/",
    "needConsent": true,
    "safeanalytic": false,
    "cookies": ['atidvisitor', 'atreman', 'atredir', 'atsession'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.atLibUrl === undefined) {
            return;
        }

        if (tarteaucitron.user.atinternetAlreadyLoaded !== undefined) {
            return;
        }

        tarteaucitron.addScript(tarteaucitron.user.atLibUrl, '', function () {

            window.tag = new ATInternet.Tracker.Tag();

            if (typeof window.tag.privacy !== 'undefined') {
                window.tag.privacy.setVisitorOptin();
            }

            if (typeof tarteaucitron.user.atMore === 'function') {
                tarteaucitron.user.atMore();
            }

            if (tarteaucitron.user.atinternetSendData !== false) {
                window.tag.page.send();
            }
        });
    },
    "fallback": function () {
        "use strict";
        if (tarteaucitron.user.atLibUrl === undefined) {
            return;
        }

        if (tarteaucitron.user.atNoFallback === true) {
            return;
        }

        tarteaucitron.user.atinternetAlreadyLoaded = true;

        tarteaucitron.addScript(tarteaucitron.user.atLibUrl, '', function () {

            window.tag = new ATInternet.Tracker.Tag();

            if (typeof window.tag.privacy !== 'undefined') {

                var visitorMode = window.tag.privacy.getVisitorMode();
                if (visitorMode !== null && visitorMode.name !== undefined && visitorMode.name == "optout") {
                    window.tag.privacy.setVisitorOptout();
                } else {
                    window.tag.privacy.setVisitorMode('cnil', 'exempt');
                }
            }

            if (typeof tarteaucitron.user.atMore === 'function') {
                tarteaucitron.user.atMore();
            }

            if (tarteaucitron.user.atinternetSendData !== false) {
                window.tag.page.send();
            }
        });
    }
};

// AT Internet
tarteaucitron.services.atinternethightrack = {
    "key": "atinternethightrack",
    "type": "analytic",
    "name": "AT Internet",
    "uri": "https://www.atinternet.com/rgpd-et-vie-privee/",
    "needConsent": true,
    "cookies": ['atidvisitor', 'atreman', 'atredir', 'atsession'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.atLibUrl === undefined) {
            return;
        }

        tarteaucitron.addScript(tarteaucitron.user.atLibUrl, '', function () {

            var tag = new ATInternet.Tracker.Tag();

            if (typeof tarteaucitron.user.atMore === 'function') {
                tarteaucitron.user.atMore();
            }
        })
    }
};

// youtube
tarteaucitron.services.youtube = {
    "key": "youtube",
    "type": "video",
    "name": "YouTube",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['VISITOR_INFO1_LIVE', 'YSC', 'PREF', 'GEUP'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['youtube_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(tarteaucitron.getElemAttr(x, "title") || 'Youtube iframe'),
                video_id = tarteaucitron.getElemAttr(x, "videoID"),
                srcdoc = tarteaucitron.getElemAttr(x, "srcdoc"),
                loading = tarteaucitron.getElemAttr(x, "loading"),
                video_width = tarteaucitron.getElemAttr(x, "width"),
                frame_width = 'width=',
                video_height = tarteaucitron.getElemAttr(x, "height"),
                frame_height = 'height=',
                video_frame,
                allowfullscreen = tarteaucitron.getElemAttr(x, "allowfullscreen"),
                attrs = ["theme", "rel", "controls", "showinfo", "autoplay", "mute", "start", "loop", "enablejsapi"],
                params = attrs.filter(function (a) {
                    return tarteaucitron.getElemAttr(x, a) !== null;
                }).map(function (a) {
                    return a + "=" + tarteaucitron.getElemAttr(x, a);
               }).join("&");

            if(tarteaucitron.getElemAttr(x, "loop") == 1) {
               params = params + "&playlist=" + video_id;
            }

            if (video_id === undefined) {
                return "";
            }
            if (video_width !== undefined) {
                frame_width += '"' + video_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (video_height !== undefined) {
                frame_height += '"' + video_height + '" ';
            } else {
                frame_height += '"" ';
            }

            if (srcdoc !== undefined && srcdoc !== null && srcdoc !== "") {
                srcdoc = 'srcdoc="' + srcdoc + '" ';
            } else {
                srcdoc = '';
            }

            if (loading !== undefined && loading !== null && loading !== "") {
                loading = 'loading ';
            } else {
                loading = '';
            }

            video_frame = '<iframe title="' + frame_title + '" type="text/html" ' + frame_width + frame_height + ' src="//www.youtube-nocookie.com/embed/' + video_id + '?' + params + '"' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + ' ' + srcdoc + ' ' + loading + '></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'youtube';
        tarteaucitron.fallback(['youtube_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// youtube playlist
tarteaucitron.services.youtubeplaylist = {
    "key": "youtubeplaylist",
    "type": "video",
    "name": "YouTube (playlist)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['VISITOR_INFO1_LIVE', 'YSC', 'PREF', 'GEUP'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['youtube_playlist_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(tarteaucitron.getElemAttr(x, "title") || 'Youtube iframe'),
                playlist_id = tarteaucitron.getElemAttr(x, "playlistID"),
                video_width = tarteaucitron.getElemAttr(x, "width"),
                frame_width = 'width=',
                video_height = tarteaucitron.getElemAttr(x, "height"),
                frame_height = 'height=',
                video_frame,
                allowfullscreen = tarteaucitron.getElemAttr(x, "allowfullscreen"),
                params = 'theme=' + tarteaucitron.getElemAttr(x, "theme") + '&rel=' + tarteaucitron.getElemAttr(x, "rel") + '&controls=' + tarteaucitron.getElemAttr(x, "controls") + '&showinfo=' + tarteaucitron.getElemAttr(x, "showinfo") + '&autoplay=' + tarteaucitron.getElemAttr(x, "autoplay") + '&mute=' + tarteaucitron.getElemAttr(x, "mute");

            if (playlist_id === undefined) {
                return "";
            }
            if (video_width !== undefined) {
                frame_width += '"' + video_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (video_height !== undefined) {
                frame_height += '"' + video_height + '" ';
            } else {
                frame_height += '"" ';
            }
            video_frame = '<iframe title="' + frame_title + '" type="text/html" ' + frame_width + frame_height + ' src="//www.youtube-nocookie.com/embed/videoseries?list=' + playlist_id + '&' + params + '"' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'youtubeplaylist';
        tarteaucitron.fallback(['youtube_playlist_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// zopim
tarteaucitron.services.zopim = {
    "key": "zopim",
    "type": "support",
    "name": "Zopim",
    "uri": "https://www.zopim.com/privacy",
    "needConsent": true,
    "cookies": ['__zlcid', '__zprivacy'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.zopimID === undefined) {
            return;
        }
        tarteaucitron.addScript('//v2.zopim.com/?' + tarteaucitron.user.zopimID);
    }
};

// kameleoon
tarteaucitron.services.kameleoon = {
    "key": "kameleoon",
    "type": "analytic",
    "name": "Kameleoon",
    "uri": "https://www.kameleoon.com/fr/compliance/rgpd",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.kameleoon !== undefined) {
            tarteaucitron.addScript("https://" + tarteaucitron.user.kameleoon + ".kameleoon.eu/kameleoon.js");
        }
    }
};

// linkedin insight
tarteaucitron.services.linkedininsighttag = {
    "key": "linkedininsighttag",
    "type": "ads",
    "name": "Linkedin Insight",
    "uri": "https://www.linkedin.com/legal/cookie_policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.linkedininsighttag !== undefined) {
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(tarteaucitron.user.linkedininsighttag);
        }

        tarteaucitron.addScript('https://snap.licdn.com/li.lms-analytics/insight.min.js');
    }
};

// xiti smartTag
tarteaucitron.services.xiti_smarttag = {
    "key": "xiti_smarttag",
    "type": "analytic",
    "name": "Xiti (SmartTag)",
    "uri": "https://www.atinternet.com/rgpd-et-vie-privee/",
    "needConsent": true,
    "cookies": ["atidvisitor", "atreman", "atredir", "atsession", "attvtreman", "attvtsession"],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.xiti_smarttagLocalPath !== undefined) {
            tarteaucitron.addScript(tarteaucitron.user.xiti_smarttagLocalPath, 'smarttag', null, null, "onload", "addTracker();");
        } else {
            var xitiSmarttagId = tarteaucitron.user.xiti_smarttagSiteId;
            if (xitiSmarttagId === undefined) {
                return;
            }

            tarteaucitron.addScript('//tag.aticdn.net/' + xitiSmarttagId + '/smarttag.js', 'smarttag', null, null, "onload", "addTracker();");
        }
    }
};

// facebook pixel
tarteaucitron.services.facebookpixel = {
    "key": "facebookpixel",
    "type": "ads",
    "name": "Facebook Pixel",
    "uri": "https://www.facebook.com/policy.php",
    "needConsent": true,
    "cookies": ['datr', 'fr', 'reg_ext_ref', 'reg_fb_gate', 'reg_fb_ref', 'sb', 'wd', 'x-src', '_fbp'],
    "js": function () {
        "use strict";
        var n;
        if (window.fbq) return;
        n = window.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
        if (!window._fbq) window._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        tarteaucitron.addScript('https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', tarteaucitron.user.facebookpixelId);
        fbq('track', 'PageView');

        if (typeof tarteaucitron.user.facebookpixelMore === 'function') {
            tarteaucitron.user.facebookpixelMore();
        }
    }
};

//Issuu
tarteaucitron.services.issuu = {
    "key": "issuu",
    "type": "other",
    "name": "Issuu",
    "uri": "https://issuu.com/legal/privacy",
    "needConsent": true,
    "cookies": ['__qca', 'iutk', 'mc'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['issuu_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Issuu iframe'),
                issuu_id = x.getAttribute("issuuID"),
                issuu_width = x.getAttribute("width"),
                frame_width = 'width=',
                issuu_height = x.getAttribute("height"),
                frame_height = 'height=',
                issuu_frame,
                issuu_embed;

            if (issuu_id === undefined) {
                return "";
            }
            if (issuu_width !== undefined) {
                frame_width += '"' + issuu_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (issuu_height !== undefined) {
                frame_height += '"' + issuu_height + '" ';
            } else {
                frame_height += '"" ';
            }


            if (issuu_id.match(/\d+\/\d+/)) { issuu_embed = '#' + issuu_id; } else if (issuu_id.match(/d=(.*)&u=(.*)/)) { issuu_embed = '?' + issuu_id; }


            issuu_frame = '<iframe title="' + frame_title + '" type="text/html" ' + frame_width + frame_height + ' src="//e.issuu.com/embed.html' + issuu_embed + '"></iframe>';

            return issuu_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'issuu';
        tarteaucitron.fallback(['issuu_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// webmecanik
tarteaucitron.services.webmecanik = {
    "key": "webmecanik",
    "type": "analytic",
    "name": "Webmecanik",
    "uri": "https://webmecanik.com/tos",
    "needConsent": true,
    "cookies": ['mtc_id', 'mtc_sid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.webmecanikurl === undefined) {
            return;
        }

        window.MauticTrackingObject = 'mt';
        window.mt = window.mt || function () {
            window.mt.q = window.mt.q || [];
            window.mt.q.push(arguments);
        };

        tarteaucitron.addScript(tarteaucitron.user.webmecanikurl, '', function () {
            mt('send', 'pageview');
        });
    }
};

// google analytics multiple
tarteaucitron.services.multiplegtag = {
    "key": "multiplegtag",
    "type": "analytic",
    "name": "Google Analytics (gtag.js)",
    "uri": "https://support.google.com/analytics/answer/6004245",
    "needConsent": true,
    "cookies": (function () {

        var cookies = ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', '_gcl_au'];

        if (tarteaucitron.user.multiplegtagUa !== undefined) {
            tarteaucitron.user.multiplegtagUa.forEach(function (ua) {
                cookies.push('_gat_gtag_' + ua.replace(/-/g, '_'));
                cookies.push('_ga_' + ua.replace(/G-/g, ''));
            });
        }

        return cookies;
    })(),
    "js": function () {
        "use strict";
        window.dataLayer = window.dataLayer || [];

        if (tarteaucitron.user.multiplegtagUa !== undefined) {
            tarteaucitron.user.multiplegtagUa.forEach(function (ua) {
                tarteaucitron.addScript('https://www.googletagmanager.com/gtag/js?id=' + ua, '', function () {
                    window.gtag = function gtag() { dataLayer.push(arguments); }
                    gtag('js', new Date());
                    var additional_config_info = (timeExpire !== undefined) ? {'anonymize_ip': true, 'cookie_expires': timeExpire / 1000} : {'anonymize_ip': true};
                    gtag('config', ua, additional_config_info);
                });
            });
        }
    }
};

// Koban
tarteaucitron.services.koban = {
    "key": "koban",
    "type": "analytic",
    "name": "Koban",
    "uri": "https://koban.cloud/tos",
    "needConsent": true,
    "cookies": ['kbntrk'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.kobanurl === undefined) {
            return;
        }
        if (tarteaucitron.user.kobanapi === undefined) {
            return;
        }
        window.KobanObject = 'kb';
        window.kb = window.kb || function () {
            window.kb.q = window.kb.q || [];
            window.kb.q.push(arguments);
        };
        window.kb.l = new Date();
        kb('reg', tarteaucitron.user.kobanapi);
        tarteaucitron.addScript(tarteaucitron.user.kobanurl, '', function () {
        });
    }
};

// matomo

/*
    1. Set the following variable before the initialization :

    tarteaucitron.user.matomoId = YOUR_SITE_ID_FROM_MATOMO;
    tarteaucitron.user.matomoHost = "YOUR_MATOMO_URL"; //eg: https://stat.mydomain.com/

    2. Push the service :

    (tarteaucitron.job = tarteaucitron.job || []).push('matomo');  // (or 'matomocloud' for cloud version)

    3. HTML
    You don't need to add any html code, if the service is authorized, the javascript is added. otherwise no.
 */
tarteaucitron.services.matomo = {
    "key": "matomo",
    "type": "analytic",
    "name": "Matomo (privacy by design)",
    "uri": "https://matomo.org/faq/general/faq_146/",
    "needConsent": false,
    "cookies": ['_pk_ref', '_pk_cvar', '_pk_id', '_pk_ses', '_pk_hsr', 'piwik_ignore', '_pk_uid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.matomoId === undefined) {
            return;
        }

        window._paq = window._paq || [];
        window._paq.push(["setSiteId", tarteaucitron.user.matomoId]);
        window._paq.push(["setTrackerUrl", tarteaucitron.user.matomoHost + "piwik.php"]);
        window._paq.push(["setDoNotTrack", 1]);
        window._paq.push(["trackPageView"]);
        window._paq.push(["setIgnoreClasses", ["no-tracking", "colorbox"]]);
        window._paq.push(["enableLinkTracking"]);
        window._paq.push([function () {
            var self = this;
            function getOriginalVisitorCookieTimeout() {
                var now = new Date(),
                    nowTs = Math.round(now.getTime() / 1000),
                    visitorInfo = self.getVisitorInfo();
                var createTs = parseInt(visitorInfo[2]);
                var cookieTimeout = 33696000; // 13 mois en secondes
                var originalTimeout = createTs + cookieTimeout - nowTs;
                return originalTimeout;
            }
            this.setVisitorCookieTimeout(getOriginalVisitorCookieTimeout());
        }]);

        tarteaucitron.addScript(tarteaucitron.user.matomoHost + 'piwik.js', '', '', true, 'defer', true);

        // waiting for piwik to be ready to check first party cookies
        var interval = setInterval(function () {
            if (typeof Piwik === 'undefined') return

            clearInterval(interval)

            // make piwik/matomo cookie accessible by getting tracker
            Piwik.getTracker();

            // looping throught cookies
            var theCookies = document.cookie.split(';');
            for (var i = 1; i <= theCookies.length; i++) {
                var cookie = theCookies[i - 1].split('=');
                var cookieName = cookie[0].trim();

                // if cookie starts like a piwik one, register it
                if (cookieName.indexOf('_pk_') === 0) {
                    tarteaucitron.services.matomo.cookies.push(cookieName);
                }
            }
        }, 100)
    }
};


tarteaucitron.services.matomohightrack = {
    "key": "matomohightrack",
    "type": "analytic",
    "name": "Matomo",
    "uri": "https://matomo.org/faq/general/faq_146/",
    "needConsent": false,
    "cookies": ['_pk_ref', '_pk_cvar', '_pk_id', '_pk_ses', '_pk_hsr', 'piwik_ignore', '_pk_uid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.matomoId === undefined) {
            return;
        }

        window._paq = window._paq || [];
        window._paq.push(["setSiteId", tarteaucitron.user.matomoId]);
        window._paq.push(["setTrackerUrl", tarteaucitron.user.matomoHost + "piwik.php"]);
        window._paq.push(["trackPageView"]);
        window._paq.push(["setIgnoreClasses", ["no-tracking", "colorbox"]]);
        window._paq.push(["enableLinkTracking"]);
        window._paq.push([function () {
            var self = this;
        }]);

        tarteaucitron.addScript(tarteaucitron.user.matomoHost + 'piwik.js', '', '', true, 'defer', true);

        // waiting for piwik to be ready to check first party cookies
        var interval = setInterval(function () {
            if (typeof Piwik === 'undefined') return

            clearInterval(interval)
            Piwik.getTracker();

            var theCookies = document.cookie.split(';');
            for (var i = 1; i <= theCookies.length; i++) {
                var cookie = theCookies[i - 1].split('=');
                var cookieName = cookie[0].trim();

                if (cookieName.indexOf('_pk_') === 0) {
                    tarteaucitron.services.matomo.cookies.push(cookieName);
                }
            }
        }, 100)
    }
};


tarteaucitron.services.matomocloud = {
    "key": "matomocloud",
    "type": "analytic",
    "name": "Matomo Cloud (privacy by design)",
    "uri": "https://matomo.org/faq/general/faq_146/",
    "needConsent": false,
    "cookies": ['_pk_ref', '_pk_cvar', '_pk_id', '_pk_ses', '_pk_hsr', 'mtm_consent', 'matomo_ignore', 'matomo_sessid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.matomoId === undefined) {
            return;
        }

        window._paq = window._paq || [];
        window._paq.push(["setSiteId", tarteaucitron.user.matomoId]);
        window._paq.push(["setTrackerUrl", tarteaucitron.user.matomoHost + "matomo.php"]);
        window._paq.push(["setDoNotTrack", 1]);
        window._paq.push(["trackPageView"]);
        window._paq.push(["setIgnoreClasses", ["no-tracking", "colorbox"]]);
        window._paq.push(["enableLinkTracking"]);
        window._paq.push([function () {
            var self = this;
            function getOriginalVisitorCookieTimeout() {
                var now = new Date(),
                    nowTs = Math.round(now.getTime() / 1000),
                    visitorInfo = self.getVisitorInfo();
                var createTs = parseInt(visitorInfo[2]);
                var cookieTimeout = 33696000; // 13 mois en secondes
                var originalTimeout = createTs + cookieTimeout - nowTs;
                return originalTimeout;
            }
            this.setVisitorCookieTimeout(getOriginalVisitorCookieTimeout());
        }]);

        if (tarteaucitron.user.matomoCustomJSPath === undefined) {
            tarteaucitron.addScript('https://cdn.matomo.cloud/matomo.js', '', '', true, 'defer', true);
        } else {
            tarteaucitron.addScript(tarteaucitron.user.matomoCustomJSPath, '', '', true, 'defer', true);
        }

        // waiting for Matomo to be ready to check first party cookies
        var interval = setInterval(function () {
            if (typeof Matomo === 'undefined') return

            clearInterval(interval)

            // make Matomo cookie accessible by getting tracker
            Matomo.getTracker();

            // looping through cookies
            var theCookies = document.cookie.split(';');
            for (var i = 1; i <= theCookies.length; i++) {
                var cookie = theCookies[i - 1].split('=');
                var cookieName = cookie[0].trim();

                // if cookie starts like a matomo one, register it
                if (cookieName.indexOf('_pk_') === 0) {
                    tarteaucitron.services.matomo.cookies.push(cookieName);
                }
            }
        }, 100)
    }
};

// matomotm
tarteaucitron.services.matomotm = {
    "key": "matomotm",
    "type": "api",
    "name": "Matomo Tag Manager",
    "uri": "https://matomo.org/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.matomotmUrl === undefined) {
            return;
        }

        var _mtm = window._mtm = window._mtm || [];
        _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});

        tarteaucitron.addScript(tarteaucitron.user.matomotmUrl);
    }
};


// Hotjar
/*
   1. Set the following variable before the initialization :
    tarteaucitron.user.hotjarId = YOUR_WEBSITE_ID;
   tarteaucitron.user.HotjarSv = XXXX; // Can be found in your website tracking code as "hjvs=XXXX"
    2. Push the service :
    (tarteaucitron.job = tarteaucitron.job || []).push('hotjar');
    3. HTML
   You don't need to add any html code, if the service is autorized, the javascript is added. otherwise no.
 */
tarteaucitron.services.hotjar = {
    "key": "hotjar",
    "type": "analytic",
    "name": "Hotjar",
    "uri": "https://help.hotjar.com/hc/en-us/categories/115001323967-About-Hotjar",
    "needConsent": true,
    "cookies": ["hjClosedSurveyInvites", "_hjDonePolls", "_hjMinimizedPolls", "_hjDoneTestersWidgets", "_hjMinimizedTestersWidgets", "_hjDoneSurveys", "_hjIncludedInSample", "_hjShownFeedbackMessage", "_hjAbsoluteSessionInProgress", "_hjIncludeInPageviewSample", "_hjid"],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.hotjarId === undefined || tarteaucitron.user.HotjarSv === undefined) {
            return;
        }
        window.hj = window.hj || function () {
            (window.hj.q = window.hj.q || []).push(arguments)
        };
        window._hjSettings = {
            hjid: tarteaucitron.user.hotjarId,
            hjsv: tarteaucitron.user.HotjarSv
        };
        var uri = 'https://static.hotjar.com/c/hotjar-';
        var extension = '.js?sv=';
        tarteaucitron.addScript(uri + window._hjSettings.hjid + extension + window._hjSettings.hjsv);
    }
};

// bing ads universal event tracking
tarteaucitron.services.bingads = {
    'key': 'bingads',
    'type': 'ads',
    'name': 'Bing Ads Universal Event Tracking',
    'uri': 'https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads',
    'needConsent': true,
    'cookies': ['_uetmsclkid', '_uetvid', '_uetsid'],
    'js': function () {
        'use strict';
        //var u = tarteaucitron.user.bingadsTag || 'uetq';
        window.uetq = window.uetq || [];

        tarteaucitron.addScript('https://bat.bing.com/bat.js', '', function () {
            var bingadsCreate = { ti: tarteaucitron.user.bingadsID };

            if ('bingadsStoreCookies' in tarteaucitron.user) {
                bingadsCreate['storeConvTrackCookies'] = tarteaucitron.user.bingadsStoreCookies;
            }

            bingadsCreate.q = window.uetq;
            window.uetq = new UET(bingadsCreate);
            window.uetq.push('pageLoad');

            if (typeof tarteaucitron.user.bingadsMore === 'function') {
                tarteaucitron.user.bingadsMore();
            }
        });
    }
};

//Matterport
tarteaucitron.services.matterport = {
    "key": "matterport",
    "type": "other",
    "name": "Matterport",
    "uri": "https://matterport.com/es/legal/privacy-policy/",
    "needConsent": true,
    "cookies": ['__cfduid', 'ajs_anonymous_id', 'ajs_group_id', 'ajs_user_id'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['matterport'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Matterport iframe'),
                matterport_id = x.getAttribute("matterportID"),
                matterport_width = x.getAttribute("width"),
                frame_width = 'width=',
                matterport_height = x.getAttribute("height"),
                frame_height = 'height=',
                matterport_parameters = x.getAttribute("parameters"),
                matterport_allowfullscreen = x.getAttribute('allowfullscreen'),
                matterport_frame;

            if (matterport_id === undefined) {
                return "";
            }
            if (matterport_width !== undefined) {
                frame_width += '"' + matterport_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (matterport_height !== undefined) {
                frame_height += '"' + matterport_height + '" ';
            } else {
                frame_height += '"" ';
            }
            if (matterport_parameters === undefined) {
                return "";
            }

            matterport_frame = '<iframe title="' + frame_title + '" type="text/html" ' + frame_width + frame_height + ' src="https://my.matterport.com/show/?m=' + matterport_id + '&utm_source=hit-content' + matterport_parameters + '"' + (matterport_allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
            return matterport_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'matterport';
        tarteaucitron.fallback(['matterport'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// Adform
tarteaucitron.services.adform = {
    "key": "adform",
    "type": "ads",
    "name": "Adform",
    "uri": "https://site.adform.com/privacy-center/overview/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.adformpm === undefined || tarteaucitron.user.adformpagename === undefined) {
            return;
        }

        window._adftrack = {
            pm: tarteaucitron.user.adformpm,
            divider: encodeURIComponent('|'),
            pagename: encodeURIComponent(tarteaucitron.user.adformpagename)
        };

        tarteaucitron.addScript("https://track.adform.net/serving/scripts/trackpoint/async/");
    }
};

// Active Campaign
tarteaucitron.services.activecampaign = {
    "key": "activecampaign",
    "type": "ads",
    "name": "Active Campaign",
    "uri": "https://www.activecampaign.com/privacy-policy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.actid === undefined) {
            return;
        }

        window.trackcmp_email = '';

        tarteaucitron.addScript('https://trackcmp.net/visit?actid=' + tarteaucitron.user.actid + '&e=' + encodeURIComponent(trackcmp_email) + '&r=' + encodeURIComponent(document.referrer) + '&u=' + encodeURIComponent(window.location.href));
    }
};

// tawk.to
tarteaucitron.services.tawkto = {
    "key": "tawkto",
    "type": "support",
    "name": "Tawk.to chat",
    "uri": "https://www.tawk.to/data-protection/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.tawktoId === undefined) {
            return;
        }

        tarteaucitron.user.tawktoWidgetId = tarteaucitron.user.tawktoWidgetId || 'default';

        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();

        tarteaucitron.addScript('https://embed.tawk.to/' + tarteaucitron.user.tawktoId + '/' + tarteaucitron.user.tawktoWidgetId);
    }

};

// getquanty
tarteaucitron.services.getquanty = {
    "key": "getquanty",
    "type": "analytic",
    "name": "GetQuanty",
    "uri": "https://www.getquanty.com/mentions-legales/",
    "needConsent": true,
    "cookies": ['_first_pageview', 'eqy_sessionid', 'eqy_siteid', 'cluid', 'eqy_company', 'cluid', 'gq_utm', '_jsuid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.getguanty === undefined) {
            return;
        }

        if (tarteaucitron.user.getquantyAlreadyLoaded !== undefined) {
            return;
        }

        tarteaucitron.addScript('https://get.smart-data-systems.com/gq?site_id=' + tarteaucitron.user.getguanty + '&consent=1');
    },
    "fallback": function () {
        "use strict";
        if (tarteaucitron.user.getguanty === undefined) {
            return;
        }

        tarteaucitron.user.getquantyAlreadyLoaded = true;

        tarteaucitron.addScript('https://get.smart-data-systems.com/gq?site_id=' + tarteaucitron.user.getguanty + '&notrack=1');
    }
};

// emolytics
tarteaucitron.services.emolytics = {
    "key": "emolytics",
    "type": "analytic",
    "name": "Emolytics",
    "uri": "https://www.emolytics.com/main/privacy-policy.php",
    "needConsent": true,
    "cookies": ['__hssc', '__hssrc', '__hstc', '_ga', '_gid', 'hubspotutk', 'lang', 'incap_ses_', 'nlbi_', 'visid_incap_'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.emolyticsID === undefined) {
            return;
        }
        var scriptEmolytics = document.createElement('script');
        scriptEmolytics.text = 'var getsmily_id="' + tarteaucitron.user.emolyticsID + '";';
        document.getElementsByTagName('body')[0].appendChild(scriptEmolytics);
        tarteaucitron.addScript('https://cdn.emolytics.com/script/emolytics-widget.js')
    }
};

// youtubeapi
tarteaucitron.services.youtubeapi = {
    "key": "youtubeapi",
    "type": "video",
    "name": "Youtube (Js API)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://www.youtube.com/player_api');
    }
};

// Facil'ITI
tarteaucitron.services.faciliti = {
    "key": "faciliti",
    "type": "other",
    "name": "Facil'ITI",
    "uri": "https://ws.facil-iti.com/mentions-legales.html",
    "needConsent": true,
    "cookies": ['FACIL_ITI_LS'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.facilitiID === undefined) {
            return;
        }

        (function (w, d, s, f) {
            w[f] = w[f] || { conf: function () { (w[f].data = w[f].data || []).push(arguments); } };
            var l = d.createElement(s), e = d.getElementsByTagName(s)[0];
            l.async = 1; l.src = 'https://ws.facil-iti.com/tag/faciliti-tag.min.js'; e.parentNode.insertBefore(l, e);
        }(window, document, 'script', 'FACIL_ITI'));
        FACIL_ITI.conf('userId', tarteaucitron.user.facilitiID);
    }
};

// userlike
tarteaucitron.services.userlike = {
    "key": "userlike",
    "type": "support",
    "name": "Userlike",
    "uri": "https://www.userlike.com/en/terms#privacy-policy",
    "needConsent": true,
    "cookies": ['uslk_s', 'uslk_e'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.userlikeKey === undefined) {
            return;
        }
        tarteaucitron.addScript('//userlike-cdn-widgets.s3-eu-west-1.amazonaws.com/' + tarteaucitron.user.userlikeKey);
    }
};

// adobeanalytics
tarteaucitron.services.adobeanalytics = {
    "key": "adobeanalytics",
    "type": "analytic",
    "name": "Adobe Analytics",
    "uri": "https://www.adobe.com/privacy/policy.html",
    "needConsent": true,
    "cookies": ['s_ecid', 's_cc', 's_sq', 's_vi', 's_fid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.adobeanalyticskey === undefined) {
            return;
        }
        tarteaucitron.addScript('//assets.adobedtm.com/launch-' + tarteaucitron.user.adobeanalyticskey + '.min.js');
    }
};

// woopra customer journey analytics
tarteaucitron.services.woopra = {
    'key': 'woopra',
    'type': 'analytic',
    'name': 'Woopra Customer Journey Analytics',
    'uri': 'https://www.woopra.com/privacy',
    'needConsent': true,
    'cookies': ['wooTracker', 'intercom-session-erbfalba', 'intercom-id-erbfalba'],
    'js': function () {
        'use strict';
        //var w = tarteaucitron.user.woopraDomain;
        //window[w] = window[w] || [];

        (function () {
            var t, i, e, n = window, o = document, a = arguments, s = "script", r = ["config", "track", "identify", "visit", "push", "call", "trackForm", "trackClick"], c = function () { var t, i = this; for (i._e = [], t = 0; r.length > t; t++)(function (t) { i[t] = function () { return i._e.push([t].concat(Array.prototype.slice.call(arguments, 0))), i } })(r[t]) }; for (n._w = n._w || {}, t = 0; a.length > t; t++)n._w[a[t]] = n[a[t]] = n[a[t]] || new c; i = o.createElement(s), i.async = 1, i.src = "//static.woopra.com/js/w.js", e = o.getElementsByTagName(s)[0], e.parentNode.insertBefore(i, e)
        })("woopra");

        woopra.config({
            domain: tarteaucitron.user.woopraDomain
        });
        woopra.track();
    }
};

// ausha
tarteaucitron.services.ausha = {
    key: "ausha",
    type: "video",
    name: "Ausha",
    uri: "https://www.ausha.co/protection-personal-data/",
    needConsent: true,
    cookies: [],
    js: function () {
        "use strict";
        tarteaucitron.fallback(['ausha_player'], function (x) {
            var player_height = x.getAttribute('data-height'),
                podcast_id = x.getAttribute('data-podcast-id'),
                player_id = x.getAttribute('data-player-id'),
                playlist = x.getAttribute('data-playlist'),
                useshowid = x.getAttribute('data-useshowid'),
                color = x.getAttribute('data-color');

            if (podcast_id === undefined) {
                return "";
            }

            var src = 'https://player.ausha.co/index.html?podcastId=' + podcast_id + '&v=3';

            if (useshowid == "1") {
                src = 'https://player.ausha.co/index.html?showId=' + podcast_id + '&v=3';
            }

            if (playlist && playlist.length > 0) src += '&playlist=' + playlist;
            if (color && color.length > 0) src += '&color=' + color.replace('#', '%23');
            if (player_id && player_id.length > 0) src += '&playerId=' + player_id;

            return '<iframe id="' + player_id + '" loading="lazy" width="100%" height="' + player_height + '" scrolling="no" frameborder="no" src="' + src + '"></iframe>';
        });

        tarteaucitron.addScript('//player.ausha.co/ausha-player.js', 'ausha-player');
    },
    fallback: function () {
        "use strict";
        tarteaucitron.fallback(['ausha_player'], function (elem) {
            elem.style.height = elem.getAttribute('data-height') + 'px';
            return tarteaucitron.engage('ausha');
        });
    }
};

// visiblee
tarteaucitron.services.visiblee = {
    key: "visiblee",
    type: "analytic",
    name: "Visiblee",
    uri: "http://confidentiality.visiblee.io/fr/confidentialite",
    needConsent: true,
    cookies: ["visitor_v2", tarteaucitron.user.visibleedomain, "check", "campaign_ref_" + tarteaucitron.user.visibleedomain, "reload_" + tarteaucitron.user.visibleedomain],
    js: function () {
        "use strict";

        if (tarteaucitron.user.visibleeclientid === undefined) {
            return;
        }
        tarteaucitron.addScript('//www.link-page.info/tracking_' + tarteaucitron.user.visibleeclientid + '.js', 'visiblee');
    }
};

// bandcamp
tarteaucitron.services.bandcamp = {
    key: "bandcamp",
    type: "video",
    name: "Bandcamp",
    uri: "https://bandcamp.com",
    readmoreLink: "https://bandcamp.com/privacy",
    needConsent: true,
    cookies: ['client_id', 'BACKENDID', '_comm_playlist'],
    js: function () {
        "use strict";
        tarteaucitron.fallback(['bandcamp_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Bandcamp iframe'),
                album_id = x.getAttribute("albumID"),
                bandcamp_width = x.getAttribute("width"),
                frame_width = 'width=',
                bandcamp_height = x.getAttribute("height"),
                frame_height = 'height=',
                attrs = ["size", "bgcol", "linkcol", "artwork", "minimal", "tracklist", "package", "transparent"],
                params = attrs.filter(function (a) {
                    return x.getAttribute(a) !== null;
                }).map(function (a) {
                    if (a && a.length > 0) return a + "=" + x.getAttribute(a);
                }).join("/");

            if (album_id === null) {
                return "";
            }

            if (bandcamp_width !== null || bandcamp_width !== "") {
                frame_width += '"' + bandcamp_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (bandcamp_height !== null || bandcamp_height !== "") {
                frame_height += '"' + bandcamp_height + '" ';
            } else {
                frame_height += '"" ';
            }

            var src = 'https://bandcamp.com/EmbeddedPlayer/album=' + album_id + '/' + params;

            return '<iframe title="' + frame_title + '"' + frame_width + frame_height + 'src="' + src + '" frameborder="0" allowfullscreen seamless></iframe>';
        });
    },
    fallback: function () {
        "use strict";
        tarteaucitron.fallback(['bandcamp_player'], function (elem) {
            elem.style.width = elem.getAttribute('width');
            elem.style.height = elem.getAttribute('height');
            return tarteaucitron.engage('bandcamp');
        });
    }
};

// Discord Widget
tarteaucitron.services.discord = {
    "key": "discord",
    "type": "social",
    "name": "Discord (Server Widget)",
    "needConsent": true,
    "cookies": ["__cfruid", "__dcfduid", "_ga", "_gcl_au", "OptanonConsent", "locale", "_gid"],
    "uri": "https://discord.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['discord_widget'], function (x) {
            var id = x.getAttribute("guildID"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height")
            var widgetURL = "https://discord.com/widget?id=" + id;
            return "<iframe width=\"" + width + "\" height=\"" + height + "\" src=\"" + widgetURL + "\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'discord';
        tarteaucitron.fallback(['discord_widget'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// Google Maps
tarteaucitron.services.maps_noapi = {
    "key": "maps_noapi",
    "type": "other",
    "name": "Google Maps",
    "needConsent": true,
    "cookies": ["NID", "OGPC", "1P_JAR", "CONSENT"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['googlemaps_embed'], function (x) {
            var id = x.getAttribute("id"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height")
            var widgetURL = "https://google.com/maps/embed?pb=" + id;
            return "<iframe width=\"" + width + "\" height=\"" + height + "\" src=\"" + widgetURL + "\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'maps_noapi';
        tarteaucitron.fallback(['googlemaps_embed'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// hCaptcha
tarteaucitron.services.hcaptcha = {
    "key": "hcaptcha",
    "type": "other",
    "name": "hCaptcha",
    "needConsent": true,
    "cookies": [],
    "uri": "https://www.hcaptcha.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(["h-captcha"], '');
        tarteaucitron.addScript("https://hcaptcha.com/1/api.js", "hcaptcha")
    },
    "fallback": function () {
        "use strict";
        var id = "hcaptcha";
        tarteaucitron.fallback(["h-captcha"], tarteaucitron.engage(id));
    }
};

// France Culture
tarteaucitron.services.fculture = {
    "key": "fculture",
    "type": "video",
    "name": "France Culture",
    "needConsent": true,
    "cookies": ["_gid", "didomi_token", "outbrain_cid_fetch", "xtvrn", "xtant", "YSC", "ABTasty", "xtan", "ABTastySession", "xtidc", "_ga", "VISITOR_INFO1_LIVE", "euconsent-v2", "v1st", "dmvk", "ts", "VISITOR_INFO1_LIVE", "YSC"],
    "uri": "https://www.radiofrance.com/politique-d-utilisation-des-cookies-sur-les-sites-internet-du-groupe-radio-france",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['fculture_embed'], function (x) {
            var id = x.getAttribute('id'),
                width = x.getAttribute('width'),
                height = x.getAttribute('height');
            return "<iframe src=\"https://www.franceculture.fr/player/export-reecouter?content=" + id + "\" height=\"" + height + "\" width=\"" + width + "\"></iframe>"
        });
    },
    "fallback": function () {
        "use strict";
        var id = "fculture";
        tarteaucitron.fallback(["fculture_embed"], tarteaucitron.engage(id));
    }
};

// Acast
tarteaucitron.services.acast = {
    "key": "acast",
    "type": "video",
    "name": "Acast",
    "needConsent": true,
    "cookies": ["intercom-id-ayi0335i", "intercom-session-ayi0335i"],
    "uri": "https://www.acast.com/en/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['acast_embed'], function (x) {
            var id = x.getAttribute('id1'),
                id2 = x.getAttribute('id2'),
                width = x.getAttribute('width'),
                height = x.getAttribute('height'),
                seek = x.getAttribute('seek');
            var widgetURL = "https://embed.acast.com/" + id + "/" + id2 + "?seek=" + seek;
            return "<iframe title=\"Embed Player\" width=\"" + width + "\" height=\"" + height + "\" src=\"" + widgetURL + "\" scrolling=\"no\" frameBorder=\"0\" style=\"border: none; overflow: hidden;\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "acast";
        tarteaucitron.fallback(["acast_embed"], tarteaucitron.engage(id));
    }
};

// Mixcloud
tarteaucitron.services.mixcloud = {
    "key": "mixcloud",
    "type": "video",
    "name": "Mixcloud",
    "needConsent": true,
    "cookies": ["UID", "_gat", "__stripe_mid", "_gid", "_ga", "c", "csrftoken", "__stripe_sid", "mx_t"],
    "uri": "https://www.mixcloud.com/privacy/",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['mixcloud_embed'], function (x) {
            var id = x.getAttribute('id'),
                hidecover = x.getAttribute('hidecover'),
                mini = x.getAttribute('mini'),
                light = x.getAttribute('light'),
                width = x.getAttribute('width'),
                height = x.getAttribute('height');
            return "<iframe width=\"" + width + "\" height=\"" + height + "\" src=\"https://www.mixcloud.com/widget/iframe/?hide_cover=" + hidecover + "&mini=" + mini + "&light=" + light + "&feed=" + id + "\" frameborder=\"0\" ></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "mixcloud";
        tarteaucitron.fallback(["mixcloud_embed"], tarteaucitron.engage(id));
    }
};

// Google Agenda
tarteaucitron.services.gagenda = {
    "key": "gagenda",
    "type": "other",
    "name": "Google Agenda",
    "needConsent": true,
    "cookies": ["CONSENT", "NID"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['gagenda_embed'], function (x) {
            var calendar_data = x.getAttribute('data'),
                width = x.getAttribute('width'),
                height = x.getAttribute('height');
            return "<iframe loarding=\"lazy\" width=\"" + width + "\" height=\"" + height + "\" src=\"https://www.google.com/calendar/embed?" + calendar_data + "\" frameborder=\"0\" scrolling=\"no\" style=\"border-width:0\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "gagenda";
        tarteaucitron.fallback(["gagenda_embed"], tarteaucitron.engage(id));
    }
};

// Google Docs
tarteaucitron.services.gdocs = {
    "key": "gdocs",
    "type": "other",
    "name": "Google Docs",
    "needConsent": true,
    "cookies": ["CONSENT", "NID"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['gdocs_embed'], function (x) {
            var id = x.getAttribute('id'),
                width = x.getAttribute('width'),
                height = x.getAttribute('height');
            return "<iframe width=\"" + width + "\" height=\"" + height + "\" src=\"https://docs.google.com/document/d/e/" + id + "/pub?embedded=true\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "gdocs";
        tarteaucitron.fallback(["gdocs_embed"], tarteaucitron.engage(id));
    }
};

// Google Sheets
tarteaucitron.services.gsheets = {
    "key": "gsheets",
    "type": "other",
    "name": "Google Sheets",
    "needConsent": true,
    "cookies": ["CONSENT", "NID"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['gsheets_embed'], function (x) {
            var id = x.getAttribute('id'),
                width = x.getAttribute('width'),
                height = x.getAttribute('height'),
                headers = x.getAttribute('headers');
            return "<iframe width=\"" + width + "\" height=\"" + height + "\" src=\"https://docs.google.com/spreadsheets/d/e/" + id + "/pubhtml?widget=true&amp;headers=" + headers + "\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "gsheets";
        tarteaucitron.fallback(["gsheets_embed"], tarteaucitron.engage(id));
    }
};

// Google Slides
tarteaucitron.services.gslides = {
    "key": "gslides",
    "type": "other",
    "name": "Google Slides",
    "needConsent": true,
    "cookies": ["CONSENT", "NID"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['gslides_embed'], function (x) {
            var id = x.getAttribute('id'),
                width = x.getAttribute('width'),
                height = x.getAttribute('height'),
                autostart = x.getAttribute('autostart'),
                loop = x.getAttribute('loop'),
                delay = x.getAttribute('delay');
            return "<iframe width=\"" + width + "\" height=\"" + height + "\" src=\"https://docs.google.com/presentation/d/e/" + id + "/embed?start=" + autostart + "&loop=" + loop + "&delayms=" + delay + "\" frameborder=\"0\" allowfullscreen=\"true\" mozallowfullscreen=\"true\" webkitallowfullscreen=\"true\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "gslides";
        tarteaucitron.fallback(["gslides_embed"], tarteaucitron.engage(id));
    }
};

// Google Forms
tarteaucitron.services.gforms = {
    "key": "gforms",
    "type": "other",
    "name": "Google Forms",
    "needConsent": true,
    "cookies": ["CONSENT", "NID"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['gforms_embed'], function (x) {
            var id = x.getAttribute('id'),
                width = x.getAttribute('width'),
                height = x.getAttribute('height');
            return "<iframe width=\"" + width + "\" height=\"" + height + "\" src=\"https://docs.google.com/forms/d/e/" + id + "/viewform?embedded=true\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "gforms";
        tarteaucitron.fallback(['gforms_embed'], tarteaucitron.engage(id));
    }
};

// Google Optimize
tarteaucitron.services.goptimize = {
    "key": "goptimize",
    "type": "other",
    "name": "Google Optimize",
    "needConsent": true,
    "cookies": ["CONSENT", "NID"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";

        if (tarteaucitron.user.goptimize === undefined) {
            return;
        }

        tarteaucitron.addScript('https://www.googleoptimize.com/optimize.js?id=' + tarteaucitron.user.goptimize);
    }
};

// Marketo munchkin
tarteaucitron.services.marketomunchkin = {
    "key": "marketomunchkin",
    "type": "api",
    "name": "Marketo munchkin",
    "uri": "https://documents.marketo.com/legal/cookies",
    "needConsent": true,
    "cookies": ['OptAnon', '_mkto_trk'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.marketomunchkinkey === undefined) {
            return;
        }
        var didInit = false;
        function initMunchkin() {
            if (didInit === false) {
                didInit = true;
                Munchkin.init(tarteaucitron.user.marketomunchkinkey);
            }
        }
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = '//munchkin.marketo.net/munchkin.js';
        s.onreadystatechange = function () {
            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                initMunchkin();
            }
        };
        s.onload = initMunchkin;
        document.getElementsByTagName('head')[0].appendChild(s);
    }
};

// outbrain
tarteaucitron.services.outbrain = {
    "key": "outbrain",
    "type": "ads",
    "name": "Outbrain",
    "uri": "https://www.outbrain.com/fr/advertisers/guidelines/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        tarteaucitron.addScript('https://widgets.outbrain.com/outbrain.js');
    }
};

// affilae
tarteaucitron.services.affilae = {
    "key": "affilae",
    "type": "ads",
    "name": "Affilae",
    "uri": "https://affilae.com/en/privacy-cookie-policy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.affilae === undefined) {
           return;
        }
        
        window._ae = { "pid": tarteaucitron.user.affilae };

        tarteaucitron.addScript('https://static.affilae.com/ae-v3.5.js');
    }
};

// Canal-U.tv
tarteaucitron.services.canalu = {
    "key": "canalu",
    "type": "video",
    "name": "Canal-U.tv",
    "uri": "https://www.canal-u.tv/conditions-generales-utilisations",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['canalu_player'], function (x) {
            var video_title = tarteaucitron.fixSelfXSS(x.getAttribute("videoTitle")),
                frame_url = 'https://www.canal-u.tv/embed/' + video_title;

            return '<div style="position:relative;padding-bottom:56.25%;padding-top:10px;height:0;overflow:hidden;">' +
                   '<iframe src="' + frame_url + '?width=100%&amp;height=100%" ' +
                        'style="position:absolute;top:0;left:0;width:100%;height: 100%;" ' +
                        'frameborder="0" ' +
                        'allowfullscreen ' +
                        'scrolling="no">' +
                   '</iframe>' +
                   '</div>';
        });
    },
    "fallback": function () {
        "use strict";
        tarteaucitron.fallback(['canalu_player'], function (elem) {
            return tarteaucitron.engage('canalu');
        });
    }
};

// WebTV Normandie UniversitÃ©
tarteaucitron.services.webtvnu = {
    "key": "webtvnu",
    "type": "video",
    "name": "WebTV Normandie UniversitÃ©",
    "uri": "https://docs.google.com/document/d/1tpVclj4QBoAq1meSZgYrpNECwp7dbmb_IhICY3sTl9c/edit",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['webtvnu_player'], function (x) {
            var frame_url = 'https://webtv.normandie-univ.fr/permalink/' + x.getAttribute("videoID") + '/iframe/',
                width = x.getAttribute("width"),
                height = x.getAttribute("height");

            return '<iframe width="' + width + '" height="' + height + '" src="' + frame_url + '" allowfullscreen="allowfullscreen" allow="autoplay"></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        tarteaucitron.fallback(['webtvnu_player'], function (elem) {
            return tarteaucitron.engage('webtvnu');
        });
    }
};

// studizz
tarteaucitron.services.studizz = {
    "key": "studizz",
    "type": "other",
    "name": "Studizz Chatbot",
    "uri": "https://group.studizz.fr/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.studizzToken === undefined) {
            return;
        }

        tarteaucitron.addScript('https://webchat.studizz.fr/webchat.js?token=' + tarteaucitron.user.studizzToken);
    }
};

// meteofrance
tarteaucitron.services.meteofrance = {
    "key": "meteofrance",
    "type": "api",
    "name": "MÃ©tÃ©o France",
    "uri": "https://meteofrance.com/politique-de-confidentialite",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_meteofrance'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'MÃ©tÃ©o France iframe'),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                insee = x.getAttribute("data-insee"),
                allowfullscreen = x.getAttribute("allowfullscreen");

            return '<iframe title="' + frame_title + '" src="https://meteofrance.com/widget/prevision/' + insee + '" width="' + width + '" height="' + height + '" scrolling="auto" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'meteofrance';
        tarteaucitron.fallback(['tac_meteofrance'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// m6meteo
tarteaucitron.services.m6meteo = {
    "key": "m6meteo",
    "type": "api",
    "name": "M6 MÃ©tÃ©o",
    "uri": "https://gdpr.m6tech.net/charte-confidentialite-m6-web-meteocity.pdf",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_m6meteo'], function (x) {
            var id = x.getAttribute("data-id");

            tarteaucitron.addScript('https://www.meteocity.com/widget/js/'+id);

            return '<div id="cont_'+id+'"><div id="spa_'+id+'"><a id="a_'+id+'" href="#"></a> Â©<a target="_top" href="https://www.meteocity.com">M6mÃ©tÃ©o</a></div></div>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'm6meteo';
        tarteaucitron.fallback(['tac_m6meteo'], function (elem) {

            return tarteaucitron.engage(id);
        });
    }
};

// mtcaptcha
tarteaucitron.services.mtcaptcha = {
    "key": "mtcaptcha",
    "type": "api",
    "name": "MTcaptcha",
    "uri": "https://www.mtcaptcha.com",
    "readmoreLink": "https://www.mtcaptcha.com/faq-cookie-declaration",
    "needConsent": true,
    "cookies": ['mtv1Pulse','mtv1ConfSum','mtv1Pong'],

    "js": function () {

        window.mtcaptchaConfig = {
            "sitekey": tarteaucitron.user.mtcaptchaSitekey
        };

        tarteaucitron.addScript('https://service.mtcaptcha.com/mtcv1/client/mtcaptcha.min.js');
        tarteaucitron.addScript('https://service2.mtcaptcha.com/mtcv1/client/mtcaptcha2.min.js');
    }
};

// Internet Archive / https://archive.org
tarteaucitron.services.archive = {
    "key": "archive",
    "type": "video",
    "name": "Internet Archive",
    "uri": "https://archive.org/about/terms.php",
    "needConsent": true,
    "cookies": ['abtest-identifier','donation-identifier'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['archive_player'], function (x) {
            var video_id = tarteaucitron.getElemAttr(x, "data-videoID"),
                video_width = tarteaucitron.getElemAttr(x, "data-width"),
                frame_width = 'width=',
                video_height = tarteaucitron.getElemAttr(x, "data-height"),
                frame_height = 'height=',
                video_frame;

            if (video_id === undefined) {
                return "";
            }
            if (video_width !== undefined) {
                frame_width += '"' + video_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (video_height !== undefined) {
                frame_height += '"' + video_height + '" ';
            } else {
                frame_height += '"" ';
            }
            video_frame = '<iframe src="https://archive.org/embed/' + video_id + '" ' + frame_width + frame_height + ' frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'archive';
        tarteaucitron.fallback(['archive_player'], function (elem) {
            elem.style.width = elem.getAttribute('data-width') + 'px';
            elem.style.height = elem.getAttribute('data-height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// Gallica
tarteaucitron.services.gallica = {
    "key": "gallica",
    "type": "other",
    "name": "Gallica",
    "uri": "https://gallica.bnf.fr/edit/und/conditions-dutilisation-des-contenus-de-gallica",
    "needConsent": true,
    "cookies": ['dtCookie', 'dtLatC', 'dtPC', 'dtSa', 'rxVisitor', 'rxvt', 'xtvrn'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['gallica_player'], function (x) {
            var src = tarteaucitron.getElemAttr(x, "data-src"),
                style = tarteaucitron.getElemAttr(x, "data-style"),
                frame;
            if (src === undefined) {
                return "";
            }
            frame = '<iframe style="'+ style + '" src="' + src + '"></iframe>';
            return frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'gallica';
        tarteaucitron.fallback(['gallica_player'], function (elem) {
            elem.style = elem.getAttribute('data-style');
            return tarteaucitron.engage(id);
        });
    }
};

// crisp
tarteaucitron.services.crisp = {
    "key": "crisp",
    "type": "other",
    "name": "Crisp Chat",
    "uri": "https://help.crisp.chat/en/article/crisp-chatbox-cookie-ip-policy-1147xor/",
    "needConsent": false,
    "cookies": ['crisp-client', '__cfduid'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.crispID === undefined) {
            return;
        }

        window.$crisp = [];
        window.CRISP_WEBSITE_ID = tarteaucitron.user.crispID;

        tarteaucitron.addScript('https://client.crisp.chat/l.js');
    }
};

// microanalytics
tarteaucitron.services.microanalytics = {
    "key": "microanalytics",
    "type": "analytic",
    "name": "MicroAnalytic",
    "uri": "https://microanalytics.io/page/privacy",
    "needConsent": false,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.microanalyticsID === undefined) {
            return;
        }

        tarteaucitron.addScript('https://microanalytics.io/js/script.js', tarteaucitron.user.microanalyticsID, undefined, true, "data-host", "https://microanalytics.io");
    }
};

// facebookcustomerchat
tarteaucitron.services.facebookcustomerchat = {
    "key": "facebookcustomerchat",
    "type": "social",
    "name": "Facebook (Customer Chat)",
    "uri": "https://www.facebook.com/policies/cookies/",
    "needConsent": true,
    "cookies": ['act','c_user','datr','dpr','presence','sb','wd','xs','/tr'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.facebookChatID === undefined) {
            return;
        }

        tarteaucitron.fallback(['fb-customerchat'], '');
	window.fbAsyncInit=function(){FB.init({appId:tarteaucitron.user.facebookChatID,autoLogAppEvents:!0,xfbml:!0,version:"v3.0"})};
	tarteaucitron.addScript('https://connect.facebook.net/' + tarteaucitron.getLocale() + '/sdk/xfbml.customerchat.js', 'facebook-jssdk');
    },
    "fallback": function () {
        "use strict";
        var id = 'facebookcustomerchat';
        tarteaucitron.fallback(['fb-customerchat'], tarteaucitron.engage(id));
    }
};

// weborama
tarteaucitron.services.weborama = {
    "key": "weborama",
    "type": "analytic",
    "name": "Weborama",
    "uri": "https://weborama.com/faq-cnil-avril-2021/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://cstatic.weborama.fr/js/advertiserv2/adperf_conversion.js');
    }
};

// tiktok
tarteaucitron.services.tiktok = {
    "key": "tiktok",
    "type": "analytic",
    "name": "Tiktok",
    "uri": "https://www.tiktok.com/legal/tiktok-website-cookies-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.tiktokId === undefined) {
            return;
        }

        tarteaucitron.addScript('https://analytics.tiktok.com/i18n/pixel/sdk.js?sdkid=' + tarteaucitron.user.tiktokId);

	if (typeof tarteaucitron.user.tiktokMore === 'function') {
            tarteaucitron.user.tiktokMore();
        }
    }
};

// Klaviyo
tarteaucitron.services.klaviyo = {
    "key": "klaviyo",
    "type": "ads",
    "name": "Klaviyo",
    "uri": "https://help.klaviyo.com/hc/en-us/articles/360034666712-About-Cookies-in-Klaviyo",
    "needConsent": true,
    "cookies": ['__kla_id'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.klaviyoCompanyId === undefined) {
            return;
        }
        tarteaucitron.addScript('//static.klaviyo.com/onsite/js/klaviyo.js?company_id=' + tarteaucitron.user.klaviyoCompanyId);
    }
};
;
tarteaucitronNoAdBlocker = true;;
/**
 * @file
 * Defines the gdpr behavior.
 */

"use strict";

(function ($, Drupal) {

  Drupal.behaviors.tandem_gdpr = {
    attach: function attach(context, settings) {

      let atInternetPromise = {};

      /**
       * Trim text.
       */
      function slugify(string) {
        "use strict";

        return string
          .toString()
          .trim()
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[-]/g,'_')
          .replace(/\s+/g, '_')
          .replace(/[^\w\-]+/g, "_")
          .replace(/^-+/, "")
          .replace(/-+$/, "");
      }

      /**
       * Override addService method to have possibility enable service by default.
       * Add allowedByDefault property.
       */
      tarteaucitron.addService = function (serviceId) {
        "use strict";
        var html = '',
          s = tarteaucitron.services,
          service = s[serviceId],
          cookie = tarteaucitron.cookie.read(),
          hostname = document.location.hostname,
          hostRef = document.referrer.split('/')[2],
          isNavigating = (hostRef === hostname && window.location.href !== tarteaucitron.parameters.privacyUrl),
          isAutostart = (!service.needConsent),
          isWaiting = (cookie.indexOf(service.key + '=wait') >= 0),
          isDenied = (cookie.indexOf(service.key + '=false') >= 0),
          isAllowed = ((cookie.indexOf(service.key + '=true') >= 0) || (!service.needConsent && cookie.indexOf(service.key + '=false') < 0)),
          isResponded = (cookie.indexOf(service.key + '=false') >= 0 || cookie.indexOf(service.key + '=true') >= 0),
          isDNTRequested = (navigator.doNotTrack === "1" || navigator.doNotTrack === "yes" || navigator.msDoNotTrack === "1" || window.doNotTrack === "1"),
          currentStatus = (isAllowed) ? tarteaucitron.lang.allowed : tarteaucitron.lang.disallowed,
          state = (undefined !== service.defaultState) ? service.defaultState :
            (undefined !== tarteaucitron.parameters.serviceDefaultState ? tarteaucitron.parameters.serviceDefaultState : 'wait');

        if (tarteaucitron.added[service.key] !== true) {
          tarteaucitron.added[service.key] = true;

          html += '<li id="' + service.key + 'Line" class="tarteaucitronLine">';
          html += '   <div class="tarteaucitronName">';
          html += '       <span class="tarteaucitronH3" role="heading" aria-level="3">' + service.name + '</span>';
          html += '       <span class="tacCurrentStatus" id="tacCurrentStatus' + service.key + '">'+currentStatus+'</span>';
          html += '       <span class="tarteaucitronReadmoreSeparator"> - </span>';
          html += '       <span id="tacCL' + service.key + '" class="tarteaucitronListCookies"></span><br/>';
          if (tarteaucitron.parameters.moreInfoLink == true) {

            var link = 'https://tarteaucitron.io/service/' + service.key + '/';
            if (service.readmoreLink !== undefined && service.readmoreLink !== '') {
              link = service.readmoreLink;
            }
            if (tarteaucitron.parameters.readmoreLink !== undefined && tarteaucitron.parameters.readmoreLink !== '') {
              link = tarteaucitron.parameters.readmoreLink;
            }
            html += '       <a href="' + link + '" target="_blank" rel="noreferrer noopener nofollow" title="' + tarteaucitron.lang.more + ' : ' + tarteaucitron.lang.cookieDetail + ' ' + service.name + ' ' + tarteaucitron.lang.ourSite + ' ' + tarteaucitron.lang.newWindow +'" class="tarteaucitronReadmoreInfo">';
            html += '           ' + tarteaucitron.lang.more;
            html += '       </a>';
            html += '       <span class="tarteaucitronReadmoreSeparator"> - </span>';
            html += '       <a href="' + service.uri + '" target="_blank" rel="noreferrer noopener" title="' + tarteaucitron.lang.source + ' ' + service.name + ' ' + tarteaucitron.lang.newWindow + '" class="tarteaucitronReadmoreOfficial">';
            html += '           ' + tarteaucitron.lang.source;
            html += '       </a>';
          }

          if (service.required) {
            html += '   </div>';
            html += '   <div class="tarteaucitronAsk" style="display: none">';
            html += '       <button type="button" aria-label="' + tarteaucitron.lang.allow + ' ' + service.name + '" id="' + service.key + 'Allowed" class="tarteaucitronAllow">';
            html += '           <span class="tarteaucitronCheck" aria-hidden="true"></span> ' + tarteaucitron.lang.allow;
            html += '       </button> ';
            html += '       <button type="button" aria-label="' + tarteaucitron.lang.deny + ' ' + service.name + '" id="' + service.key + 'Denied" class="tarteaucitronDeny">';
            html += '           <span class="tarteaucitronCross" aria-hidden="true"></span> ' + tarteaucitron.lang.deny;
            html += '       </button>';
            html += '   </div>';
            html += '   <div class="tarteaucitronAsk">';
            html += '       <span aria-hidden="true">ActivÃ©</span> ';
            html += '   </div>';
            html += '</li>';
            tarteaucitron.cookie.create(service.key, true);
          }
          else {
            html += '   </div>';
            html += '   <div class="tarteaucitronAsk">';
            html += '       <button type="button" aria-label="' + tarteaucitron.lang.allow + ' ' + service.name + '" id="' + service.key + 'Allowed" class="tarteaucitronAllow">';
            html += '           <span class="tarteaucitronCheck" aria-hidden="true"></span> ' + tarteaucitron.lang.allow;
            html += '       </button> ';
            html += '       <button type="button" aria-label="' + tarteaucitron.lang.deny + ' ' + service.name + '" id="' + service.key + 'Denied" class="tarteaucitronDeny">';
            html += '           <span class="tarteaucitronCross" aria-hidden="true"></span> ' + tarteaucitron.lang.deny;
            html += '       </button>';
            html += '   </div>';
            html += '</li>';
          }

          tarteaucitron.userInterface.css('tarteaucitronServicesTitle_' + service.type, 'display', 'block');

          if (document.getElementById('tarteaucitronServices_' + service.type) !== null) {
            document.getElementById('tarteaucitronServices_' + service.type).innerHTML += html;
          }

          tarteaucitron.userInterface.css('tarteaucitronNoServicesTitle', 'display', 'none');

          tarteaucitron.userInterface.order(service.type);

          tarteaucitron.addClickEventToId(service.key + 'Allowed', function () {
            tarteaucitron.userInterface.respond(this, true);
          });

          tarteaucitron.addClickEventToId(service.key + 'Denied', function () {
            tarteaucitron.userInterface.respond(this, false);
          });
        }

        tarteaucitron.pro('!' + service.key + '=' + isAllowed);

        // allow by default for non EU
        if (isResponded === false && tarteaucitron.user.bypass === true) {
          isAllowed = true;
          tarteaucitron.cookie.create(service.key, true);
        }

        if ((!isResponded && (isAutostart || (isNavigating && isWaiting)) && !tarteaucitron.highPrivacy) || isAllowed) {
          if (!isAllowed || (!service.needConsent && cookie.indexOf(service.key + '=false') < 0)) {
            tarteaucitron.cookie.create(service.key, true);
          }
          if (tarteaucitron.launch[service.key] !== true) {
            tarteaucitron.launch[service.key] = true;
            if (typeof tarteaucitronMagic === 'undefined' || tarteaucitronMagic.indexOf("_" + service.key + "_") < 0) { service.js(); }
            tarteaucitron.sendEvent(service.key + '_loaded');
          }
          tarteaucitron.state[service.key] = true;
          tarteaucitron.userInterface.color(service.key, true);
        } else if (isDenied) {
          if (typeof service.fallback === 'function') {
            if (typeof tarteaucitronMagic === 'undefined' || tarteaucitronMagic.indexOf("_" + service.key + "_") < 0) { service.fallback(); }
          }
          tarteaucitron.state[service.key] = false;
          tarteaucitron.userInterface.color(service.key, false);
        } else if (!isResponded && isDNTRequested && tarteaucitron.handleBrowserDNTRequest) {
          tarteaucitron.cookie.create(service.key, 'false');
          if (typeof service.fallback === 'function') {
            if (typeof tarteaucitronMagic === 'undefined' || tarteaucitronMagic.indexOf("_" + service.key + "_") < 0) { service.fallback(); }
          }
          tarteaucitron.state[service.key] = false;
          tarteaucitron.userInterface.color(service.key, false);
        } else if (!isResponded) {
          tarteaucitron.cookie.create(service.key, state);
          if (typeof tarteaucitronMagic === 'undefined' || tarteaucitronMagic.indexOf("_" + service.key + "_") < 0) {
            if(true === state && typeof service.js === 'function') {
              service.js();
            } else if (typeof service.fallback === 'function') {
              service.fallback();
            }
          }

          tarteaucitron.userInterface.color(service.key, state);

          if( 'wait' === state ) {
            tarteaucitron.userInterface.openAlert();
          }
        }

        tarteaucitron.cookie.checkCount(service.key);
        tarteaucitron.sendEvent(service.key + '_added')
      }

      /**
       * Override engage method.
       */
      tarteaucitron.engage = function (id) {
        "use strict";
        var html = '',
          r = Math.floor(Math.random() * 100000),
          engage = tarteaucitron.services[id].name + ' ' + tarteaucitron.lang.fallback;

        if (tarteaucitron.lang['engage-' + id] !== undefined) {
          engage = tarteaucitron.lang['engage-' + id];
        }

        html += '<div class="tac_activate tac_activate_' + id + '">';
        html += '   <div class="tac_float">';
        html += '      ' + engage;
        html += '      <button type="button" class="tarteaucitronAllow" id="Eng' + r + 'ed' + id + '" onclick="tarteaucitron.userInterface.respond(this, true);">';;
        html += '          <span class="tarteaucitronCheck" aria-hidden="true"></span> ' + tarteaucitron.lang.allow;
        html += '       </button>';
        html += '   </div>';
        html += '</div>';

        return html;
      }

      // Dailymotion (Custom).
      tarteaucitron.services.dailymotion_custom = {
        "key": "dailymotion_custom",
        "type": "video",
        "name": "Dailymotion",
        "uri": "https://www.dailymotion.com/legal/privacy",
        "needConsent": true,
        "cookies": ['ts', 'dmvk', 'hist', 'v1st', 's_vi'],
        "js": function () {
          let html;
          let fake_video_tag = $('.tandem-media-wrapper--dailymotion .video-source');
          if (fake_video_tag.length > 0) {
            tarteaucitron.fallback(['tandem-media-wrapper--dailymotion'], function (elem) {
              $(elem).removeAttr('style');

              let video_source = $(elem).find('.video-source');
              let src = video_source.attr('data-video-source');
              let media_title = video_source.attr('data-media-title');
              let media_id = video_source.attr('data-media-id');

              html = '<video width="640" height="360" controls="" preload="none" ';
              html += 'style="max-width: 100%; width: 100%; height: 100%;" ';
              html += 'class="dailymotion_player_custom tandem-mediaelement tandem-mediaelement--dailymotion" ';
              html += 'data-original-type="dailymotion">';
              html += '<source src="' + src + '" type="video/dailymotion" data-media-title="' + media_title + '" data-media-id="' + media_id + '">';
              html += '</video>';

              return html;
            });
          }

          // Attach video player.
          attachMediaPlayerWaitAtInternet($('.dailymotion_player_custom'));
        },
        "fallback": function () {
          var id = 'dailymotion_custom';
          tarteaucitron.fallback(['tandem-media-wrapper--dailymotion'], function (elem) {
            let video_elem = $(elem).find('video');
            let video_source = $(elem).find('source');
            let src = video_source.attr('src');
            let media_title = video_source.attr('data-media-title');
            let media_id = video_source.attr('data-media-id');
            let aditional_div = '<div class="video-source" data-video-source ="' + src + '" data-media-title="' + media_title + '" data-media-id="' + media_id + '"></div>';

            // Set element width and height.
            $(elem).height(video_elem.height());

            return aditional_div + tarteaucitron.engage(id);
          });
        }
      };

      // Vimeo (Custom).
      tarteaucitron.services.vimeo_custom = {
        "key": "vimeo_custom",
        "type": "video",
        "name": "Vimeo",
        "uri": "https://vimeo.com/privacy",
        "needConsent": true,
        "cookies": ['__utmt_player', '__utma', '__utmb', '__utmc', '__utmv', 'vuid', '__utmz', 'player'],
        "js": function () {
          let html;
          let fake_video_tag = $('.tandem-media-wrapper--vimeo .video-source');
          if (fake_video_tag.length > 0) {
            tarteaucitron.fallback(['tandem-media-wrapper--vimeo'], function (elem) {
              $(elem).removeAttr('style');

              let video_source = $(elem).find('.video-source');
              let src = video_source.attr('data-video-source');
              let media_title = video_source.attr('data-media-title');
              let media_id = video_source.attr('data-media-id');

              html = '<video width="640" height="360" controls="" preload="none" ';
              html += 'style="max-width: 100%; width: 100%; height: 100%;" ';
              html += 'class="vimeo_player_custom tandem-mediaelement tandem-mediaelement--vimeo" ';
              html += 'data-original-type="vimeo">';
              html += '<source src="' + src + '" type="video/vimeo" data-media-title="' + media_title + '" data-media-id="' + media_id + '">';
              html += '</video>';

              return html;
            });
          }

          let $vimeo_player_custom = $('.vimeo_player_custom');
          attachMediaPlayerWaitAtInternet($vimeo_player_custom);
        },
        "fallback": function () {
          var id = 'vimeo_custom';
          tarteaucitron.fallback(['tandem-media-wrapper--vimeo'], function (elem) {
            let video_elem = $(elem).find('video');
            let video_source = $(elem).find('source');
            let src = video_source.attr('src');
            let media_title = video_source.attr('data-media-title');
            let media_id = video_source.attr('data-media-id');
            let aditional_div = '<div class="video-source" data-video-source ="' + src + '" data-media-title="' + media_title + '" data-media-id="' + media_id + '"></div>';

            // Set element width and height.
            $(elem).height(video_elem.height());

            return aditional_div + tarteaucitron.engage(id);
          });
        }
      };

      // Youtube (Custom).
      tarteaucitron.services.youtube_custom = {
        "key": "youtube_custom",
        "type": "video",
        "name": "YouTube",
        "uri": "https://policies.google.com/privacy",
        "needConsent": true,
        "cookies": ['VISITOR_INFO1_LIVE', 'YSC', 'PREF', 'GEUP', 'GPS'],
        "js": function () {
          let html;
          let fake_video_tag = $('.tandem-media-wrapper--youtube .video-source');
          if (fake_video_tag.length > 0) {
            tarteaucitron.fallback(['tandem-media-wrapper--youtube'], function (elem) {
              $(elem).removeAttr('style');

              let video_source = $(elem).find('.video-source');
              let src = video_source.attr('data-video-source');
              let media_title = video_source.attr('data-media-title');
              let media_id = video_source.attr('data-media-id');

              html = '<video width="640" height="360" controls="" preload="none" ';
              html += 'style="max-width: 100%; width: 100%; height: 100%;" ';
              html += 'class="youtube_player_custom tandem-mediaelement tandem-mediaelement--youtube" ';
              html += 'data-original-type="youtube">';
              html += '<source src="' + src + '" type="video/youtube" data-media-title="' + media_title + '" data-media-id="' + media_id + '">';
              html += '</video>';

              return html;
            });
          }

          attachMediaPlayerWaitAtInternet($('.youtube_player_custom'));
        },
        "fallback": function () {
          var id = 'youtube_custom';

          tarteaucitron.fallback(['tandem-media-wrapper--youtube'], function (elem) {
            let video_elem = $(elem).find('video');
            let video_source = $(elem).find('source');
            let src = video_source.attr('src');
            let media_title = video_source.attr('data-media-title');
            let media_id = video_source.attr('data-media-id');
            let aditional_div = '<div class="video-source" data-video-source ="' + src + '" data-media-title="' + media_title + '" data-media-id="' + media_id + '"></div>';

            // Set element width and height.
            $(elem).height(video_elem.height());

            return aditional_div + tarteaucitron.engage(id);
          });
        }
      };

      // Youtube playlist (Custom).
      tarteaucitron.services.youtube_playlist_custom = {
        "key": "youtube_playlist_custom",
        "type": "video",
        "name": "YouTube playlist",
        "uri": "https://policies.google.com/privacy",
        "needConsent": true,
        "cookies": ['VISITOR_INFO1_LIVE', 'YSC', 'PREF', 'GEUP', 'GPS'],
        "js": function () {
          let html;
          tarteaucitron.fallback(['youtube_playlist_custom_wrapper'], function (elem) {
            $(elem).removeAttr('style');
            let src = elem.getAttribute("src");
            html = '<iframe class="youtube_playlist_custom" width="854px" height="480px" ';
            html += 'frameborder="0" allowfullscreen="allowfullscreen" src="' + src + '&enablejsapi=1' + '"> ';
            html += '</iframe>';

            return html;
          });
        },
        "fallback": function () {
          var id = 'youtube_playlist_custom';

          tarteaucitron.fallback(['youtube_playlist_custom_wrapper'], function (elem) {
            // Set element height.
            $(elem).height(elem.getAttribute("height"));
            return tarteaucitron.engage(id);
          });
        }
      };

      // AddThis (Custom).
      tarteaucitron.services.addthis_custom = {
        "key": "addthis_custom",
        "type": "social",
        "name": "AddThis",
        "uri": "https://www.addthis.com/privacy/privacy-policy#publisher-visitors",
        "needConsent": true,
        "cookies": ['__atuvc', '__atuvs'],
        "js": function () {
          var $disallow = $('.addthis-box .tac_activate');
          if ($disallow.length > 0) {
            $('.addthis-box').once().each(function () {
              $disallow.remove();
              var mode = $('html').hasClass('no-touchevents') ? 'desktop' : 'mobile';
              var data = settings.tandem_addthis.services;
              if (data === null || mode === null) {
                return;
              }
              var services = data[mode];
              for (var service in services) {
                if (service === 'email') {
                  $(this).append('<button class="add-this-custom__email-button js-email-share" title="' + services[service].service_name + ' - ' + Drupal.t('new window') + '"></button>');
                } else {
                  $(this).append(`<a class="addthis_button_${service}" href="" title="${services[service].service_name} - ${Drupal.t('new window')}"></a>`);
                }
              }
            });
          }
          tarteaucitron.addScript('//s7.addthis.com/js/300/addthis_widget.js');
        },
        "fallback": function () {
          "use strict";
          setTimeout(()=> {
            var id = 'addthis_custom';
            tarteaucitron.fallback(['addthis-box'], tarteaucitron.engage(id));
          }, 1000);
        }
      };

      // Twitter timeline (custom).
      tarteaucitron.services.twittertimeline_custom = {
        "key": "twittertimeline_custom",
        "type": "social",
        "name": "Twitter (timelines)",
        "uri": "https://support.twitter.com/articles/20170514",
        "needConsent": true,
        "cookies": ['ga', '_gat', '_gid', '_sl'],
        "js": function () {
          "use strict";
          tarteaucitron.fallback(['twitter-additional'], '');
          tarteaucitron.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs');

          let $twitter_iframe = $('.twitter-timeline');
          $twitter_iframe.once().each(function () {
            $(this).before('<div class="twitter-additional"></div>');
          });
          $twitter_iframe.css('display', 'block');
        },
        "fallback": function () {
          "use strict";

          let id = 'twittertimeline_custom';
          let $twitter_iframe = $('.twitter-timeline, .twitter-tweet');
          $twitter_iframe.once().each(function () {
            $(this).before('<div class="twitter-additional"></div>');
          });

          tarteaucitron.fallback(['twitter-additional'], function (elem) {
            $twitter_iframe.css('display', 'none');
            return tarteaucitron.engage(id);
          });
        },
      };

      // Instagram (custom).
      tarteaucitron.services.instagram_custom = {
        "key": "instagram_custom",
        "type": "social",
        "name": "Instagram",
        "uri": "https://help.instagram.com/155833707900388",
        "needConsent": true,
        "cookies": ['csrftoken', 'datr', 'ig_cb', 'mid', 'rur', 'urlgen'],
        "js": function () {
          "use strict";
          tarteaucitron.fallback(['instagram-additional'], '');
          let $instagram_iframe = $('.instagram-media');
          $instagram_iframe.once().each(function () {
            $(this).before('<div class="instagram-additional"></div>');
          });
          $instagram_iframe.css('display', 'block');

          tarteaucitron.addScript('//www.instagram.com/embed.js', 'instagram-wjs');
        },
        "fallback": function () {
          "use strict";

          let id = 'instagram_custom';
          let $instagram_iframe = $('.instagram-media');
          $instagram_iframe.once().each(function () {
            $(this).before('<div class="instagram-additional"></div>');
          });

          tarteaucitron.fallback(['instagram-additional'], function (elem) {
            $instagram_iframe.css('display', 'none');
            return tarteaucitron.engage(id);
          });
        },
      };

      // AT Internet.
      tarteaucitron.services.atinternet_custom = {
        "key": "atinternet_custom",
        "type": "analytic",
        "name": "AT Internet",
        "uri": "http://www.atinternet.com/politique-du-respect-de-la-vie-privee/",
        "needConsent": false,
        "allowedByDefault" : true,
        "alternativeText" : typeof settings.tandem_gdpr.user.atDescription === 'object' ? settings.tandem_gdpr.user.atDescription.value : '',
        "cookies": ['atidvisitor', 'atreman', 'atredir', 'atsession', 'atuserid'],
        "js": function () {
          "use strict";

          atInternetPromise = new Promise((resolve, reject) => {
            tarteaucitron.addScript(tarteaucitron.user.atJsLibUrl, 'smarttag', function () {
              var smarttag_conf = window.smarttag_config || {};
              var tag = window.tag = window.tag || new ATInternet.Tracker.Tag(smarttag_conf);
              $(document).trigger('atinternetGdprAllow');

              resolve("ok");
            });
          });
        },
        "fallback": function () {
          atInternetPromise = new Promise((resolve, reject) => {
            resolve("ok");
          });
        }
      };

      // Flickr (custom).
      tarteaucitron.services.flickr_custom = {
        "key": "flickr_custom",
        "type": "social",
        "name": "Flickr",
        "uri": "https://www.flickr.com/help/cookies",
        "needConsent": true,
        "cookies": [],
        "js": function () {
          "use strict";
          tarteaucitron.fallback(['flickr-additional'], '');
          let $flickr_iframe = $('a[data-flickr-embed=true]');

          $flickr_iframe.each(function () {
            $(this).before('<div class="flickr-additional"></div>');
            $(this).css('display', 'block');
            let src = $(this).attr('replace-href');
            if (src) {
              $(this).attr('href', src);
            }
          });
        },
        "fallback": function (elem) {
          "use strict";

          let id = 'flickr_custom';
          let $flickr_iframe = $('a[data-flickr-embed=true]');
          $flickr_iframe.each(function () {
            $(this).before('<div class="flickr-additional"></div>');
            $(this).css('display', 'none');
            let src = $(this).attr('href');
            $(this).attr('href', '');
            $(this).attr('replace-href', src);
          });

          tarteaucitron.fallback(['flickr-additional'], function () {
            return tarteaucitron.engage(id);
          });
        },
      };

      // Soundcloud (custom).
      tarteaucitron.services.soundcloud_custom = {
        "key": "soundcloud_custom",
        "type": "social",
        "name": "Soundcloud",
        "uri": "https://soundcloud.com/pages/cookies",
        "needConsent": true,
        "cookies": [],
        "js": function () {
          "use strict";
          let html;

          tarteaucitron.fallback(['media-soundcloud-content'], function (x) {
            html = '<iframe class="media-soundcloud-content" ';
            html += 'src="' + x.getAttribute('data-audio-source') + '" ';
            html += 'width="' + x.getAttribute('data-audio-width') + '" ';
            html += 'height="' + x.getAttribute('data-audio-height') + '" ';
            html += 'scrolling="no" ';
            html += 'frameborder="no"';
            html += '></iframe>';
            return html;
          });

        },
        "fallback": function () {
          "use strict";

          let id = 'soundcloud_custom';
          tarteaucitron.fallback(['media-soundcloud-content'], function (elem) {
            return tarteaucitron.engage(id);
          });
        },
      };

      // Eulerian CNIL exemption.
      tarteaucitron.services.euleriancnilexemption = {
        "key": "euleriancnilexemption",
        "type": "analytic",
        "name": "Eulerian (exemption CNIL)",
        "uri": "https://www.eulerian.com/rgpd",
        "needConsent": false,
        "allowedByDefault" : true,
        "required": true,
        "safeanalytic": true,
        "cookies": [],
        "js": function () {
          "use strict";

          if (tarteaucitron.user.eulerianHost === undefined) {
            return;
          }

          (function(e,a){var i=e.length,y=5381,k='script',s=window,v=document,o=v.createElement(k);for(;i;){i-=1;y=(y*33)^e.charCodeAt(i)}y='_EA_'+(y>>>=0);(function(e,a,s,y){s[a]=s[a]||function(){(s[y]=s[y]||[]).push(arguments);s[y].eah=e;};}(e,a,s,y));i=new Date/1E7|0;o.ea=y;y=i%26;o.async=1;o.src='//'+e+'/'+String.fromCharCode(97+y,122-y,65+y)+(i%1E3)+'.js?2';s=v.getElementsByTagName(k)[0];s.parentNode.insertBefore(o,s);})
          (tarteaucitron.user.eulerianHost,'EA_push');
          EA_push();
        }
      };

      // Eulerian Analytics Consent.
      tarteaucitron.services.eulerian = {
        "key": "eulerian",
        "type": "analytic",
        "name": "Eulerian Analytics",
        "needConsent": true,
        "cookies": ["etuix"],
        "uri" : "https://eulerian.com/vie-privee",
        "js": function () {
          "use strict";
          (function(x,w){ if (!x._ld){ x._ld = 1;
            let ff = function() { if(x._f){x._f('tac',tarteaucitron,1)} };
            w.__eaGenericCmpApi = function(f) { x._f = f; ff(); };
            w.addEventListener("tac.close_alert", ff);
            w.addEventListener("tac.close_panel", ff);
          }})(this,window);
        },
        "fallback": function () { this.js(); }
      };

      // contentsquare
      tarteaucitron.services.contentsquare_custom = {
        "key": "contentsquare_custom",
        "type": "api",
        "name": "Content Square",
        "uri": "https://docs.contentsquare.com/uxa-en/#collected-data",
        "needConsent": true,
        "cookies": ['_cs_id', '_cs_s', '_cs_vars', '_cs_ex', '_cs_c', '_cs_optout'],
        "js": function () {
          "use strict";
          if (tarteaucitron.user.contentsquareID === undefined) {
            return;
          }
          tarteaucitron.addScript('//t.contentsquare.net/uxa/' + tarteaucitron.user.contentsquareID + '.js');
        }
      };

      // genially
      tarteaucitron.services.genially_custom = {
        "key": "genially_custom",
        "type": "api",
        "name": "Genial.ly",
        "uri": "https://www.genial.ly/cookies",
        "needConsent": true,
        "cookies": ['_gat', '_ga', '_gid'],
        "js": function () {
          "use strict";

          tarteaucitron.fallback(['tac_genially'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'genially iframe'),
              width = x.getAttribute("width"),
              height = x.getAttribute("height"),
              geniallyid = x.getAttribute("geniallyid"),
              allowfullscreen = x.getAttribute("allowfullscreen");

            return '<div style="position: relative; padding-bottom: 109.00%; padding-top: 0; height: 0;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" title="' + frame_title + '" src="https://view.genial.ly/' + geniallyid + '" width="' + width + '" height="' + height + '" scrolling="auto" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe></div>';
          });
        },
        "fallback": function () {
          "use strict";
          var id = 'genially';
          tarteaucitron.fallback(['tac_genially'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
          });
        }
      };

      // ausha custom.
      tarteaucitron.services.ausha_custom = {
        key: "ausha_custom",
        type: "video",
        name: "Ausha",
        uri: "https://www.ausha.co/protection-personal-data/",
        needConsent: true,
        cookies: [],
        js: function () {
          "use strict";
          tarteaucitron.fallback(['ausha-additional'], '');
          let $ausha_iframe = $('.tandem-media-wrapper-ausha').find('iframe');
          $ausha_iframe.once().each(function () {
            $(this).before('<div class="ausha-additional"></div>');
          });
          $ausha_iframe.css('display', 'block');
        },
        fallback: function () {
          "use strict";

          let id = 'ausha_custom';
          let $ausha_iframe = $('.tandem-media-wrapper-ausha').find('iframe');
          $ausha_iframe.once().each(function () {
            $(this).before('<div class="ausha-additional"></div>');
          });

          tarteaucitron.fallback(['ausha-additional'], function (elem) {
            $ausha_iframe.css('display', 'none');
            return tarteaucitron.engage(id);
          });
        }

      };

      // Batch custom.
      tarteaucitron.services.batch_custom = {
        key: "batch_custom",
        type: "ads",
        name: "Batch",
        uri: "https://batch.com/about/",
        needConsent: true,
        cookies: [],
        js: function () {
          "use strict";

          // Empty service, will be managed on Eulerian TMS side.
        }
      };

      // Force tarteaucitron cdn.
      tarteaucitron.cdn = "/libraries/tarteaucitron.js/";

      // Load custom texts translation.
      tarteaucitronCustomText = {};
      Object.keys(settings.tandem_gdpr.texts)
        .filter(function (text) {
          return settings.tandem_gdpr.texts[text] !== "";
        })
        .map(function (text) {
          tarteaucitronCustomText[text] = Drupal.t(
            settings.tandem_gdpr.texts[text]
          );
        });

      // Load added services.
      Object.keys(settings.tandem_gdpr.services)
        .filter(function (service) {
          return settings.tandem_gdpr.services[service];
        })
        .map(function (service) {
          return (tarteaucitron.job = tarteaucitron.job || []).push(service);
        });

      // Load added users settings.
      Object.keys(settings.tandem_gdpr.user)
        .filter(function (id) {
          return settings.tandem_gdpr.user[id] !== "";
        })
        .map(function (id) {
          return (tarteaucitron.user[id] = settings.tandem_gdpr.user[id]);
        });

      // Load tarteaucitron.
      tarteaucitron.init({
        DenyAllCta : true,
        privacyUrl: settings.tandem_gdpr.dialog.privacyUrl,
        hashtag: "#".concat(settings.tandem_gdpr.dialog.hashtag),
        cookieName: settings.tandem_gdpr.dialog.cookieName,
        orientation: settings.tandem_gdpr.dialog.orientation,
        showAlertSmall: settings.tandem_gdpr.dialog.showAlertSmall === 1,
        cookieslist: settings.tandem_gdpr.dialog.cookieslist === 1,
        adblocker: settings.tandem_gdpr.dialog.adblocker === 1,
        AcceptAllCta: settings.tandem_gdpr.dialog.AcceptAllCta === 1,
        highPrivacy: settings.tandem_gdpr.dialog.highPrivacy === 1,
        handleBrowserDNTRequest: settings.tandem_gdpr.dialog.handleBrowserDNTRequest === 1,
        removeCredit: settings.tandem_gdpr.dialog.removeCredit === 1,
        moreInfoLink: settings.tandem_gdpr.dialog.moreInfoLink === 1,
        useExternalCss: settings.tandem_gdpr.dialog.useExternalCss === 1,
        cookieDomain: settings.tandem_gdpr.dialog.cookieDomain,
        readmoreLink: settings.tandem_gdpr.dialog.readmoreLink,
        showIcon: false
      });

      /**
       * Wrapper for attach media player when ATInternet tracker is loaded or wait it.
       *
       * @param $element
       */
      function attachMediaPlayerWaitAtInternet($element) {

        // Attach immediately.
        if (typeof atInternetPromise.then !== 'function') {
          tandemMediaElementPlayer($element);
        }

        // Wait ATInternet tracker load.
        else {
          atInternetPromise
            .then(
              result => {
                tandemMediaElementPlayer($element);
              },
              error => {
                console.log(error);
              }
            );
        }
      }

      /**
       * Trigger event atinternetMediaGdprAllow when user allow tracking.
       *
       * @param $element
       *   Element for attach mediaplayer.
       */
      function tandemMediaElementPlayer($element) {
        $element.each(function () {
          if ($(this).parents('[class^="media-data"]').length === 0 && !$(this).hasClass('initialized')) {
            $(this).addClass('initialized');

            $(this).once('at-media').each(function () {
              const mediaId = $('source', this).attr('data-media-id');
              const mediaName = slugify($('source', this).attr('data-media-title'));

              $(this).mediaelementplayer({
                success: function (media, originalNode, instance) {
                  let cookie = tarteaucitron.cookie.read();
                  let isAtinternetAllowed = (cookie.indexOf('atinternet_custom=true') >= 0);
                  const mediaTitle = $(media).find('source').data('media-title');
                  if (isAtinternetAllowed) {
                    $(document).trigger('atinternetMediaGdprAllow', {'media': media, 'mediaId': mediaId, 'mediaName' : mediaName});
                  }

                  media.addEventListener('canplay', () => {
                    $(media).find('iframe').attr('title', mediaTitle);
                  });
                }
              });

              // Hide unnecesary controls for vimeo.
              let $vimeo_player_custom = $('.vimeo_player_custom');
              $vimeo_player_custom.each(function () {
                $(this).closest('.mejs__container').find('.mejs__controls').addClass('hide-controls');
              });
            })
          }
        });
      }

    }
  };
})(jQuery, Drupal);
;
/*! tinyscrollbar - v2.5.0 - 2016-02-09
 * http://www.baijs.com/tinyscrollbar
 *
 * Copyright (c) 2016 Maarten Baijs <wieringen@gmail.com>;
 * Licensed under the MIT license */

!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";function b(b,e){function f(){return o.update(),h(),o}function g(){t.css(y,o.thumbPosition),q.css(y,-o.contentPosition),r.css(x,o.trackSize),s.css(x,o.trackSize),t.css(x,o.thumbSize)}function h(){u&&(p[0].ontouchstart=function(a){1===a.touches.length&&(a.stopPropagation(),k(a.touches[0]))}),t.bind("mousedown",function(a){a.stopPropagation(),k(a)}),s.bind("mousedown",function(a){k(a,!0)}),a(window).resize(function(){o.update("relative")}),o.options.wheel&&window.addEventListener?b[0].addEventListener(v,l,!1):o.options.wheel&&(b[0].onmousewheel=l)}function i(){return o.contentPosition>0}function j(){return o.contentPosition<=o.contentSize-o.viewportSize-5}function k(b,d){o.hasContentToSroll&&(a("body").addClass("noSelect"),z=d?t.offset()[y]:w?b.pageX:b.pageY,u&&(document.ontouchmove=function(a){(o.options.touchLock||i()&&j())&&a.preventDefault(),a.touches[0][c+"Touch"]=1,m(a.touches[0])},document.ontouchend=n),a(document).bind("mousemove",m),a(document).bind("mouseup",n),t.bind("mouseup",n),s.bind("mouseup",n),m(b))}function l(c){if(o.hasContentToSroll){var d=c||window.event,e=-(d.deltaY||d.detail||-1/3*d.wheelDelta)/40,f=1===d.deltaMode?o.options.wheelSpeed:1;o.contentPosition-=e*f*o.options.wheelSpeed,o.contentPosition=Math.min(o.contentSize-o.viewportSize,Math.max(0,o.contentPosition)),o.thumbPosition=o.contentPosition/o.trackRatio,b.trigger("move"),t.css(y,o.thumbPosition),q.css(y,-o.contentPosition),(o.options.wheelLock||i()&&j())&&(d=a.event.fix(d),d.preventDefault())}c.stopPropagation()}function m(a){if(o.hasContentToSroll){var d=w?a.pageX:a.pageY,e=a[c+"Touch"]?z-d:d-z,f=Math.min(o.trackSize-o.thumbSize,Math.max(0,o.thumbPosition+e));o.contentPosition=f*o.trackRatio,b.trigger("move"),t.css(y,f),q.css(y,-o.contentPosition)}}function n(){o.thumbPosition=parseInt(t.css(y),10)||0,a("body").removeClass("noSelect"),a(document).unbind("mousemove",m),a(document).unbind("mouseup",n),t.unbind("mouseup",n),s.unbind("mouseup",n),document.ontouchmove=document.ontouchend=null}this.options=a.extend({},d,e),this._defaults=d,this._name=c;var o=this,p=b.find(".viewport"),q=b.find(".overview"),r=b.find(".scrollbar"),s=r.find(".track"),t=r.find(".thumb"),u="ontouchstart"in document.documentElement,v="onwheel"in document.createElement("div")?"wheel":void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll",w="x"===this.options.axis,x=w?"width":"height",y=w?"left":"top",z=0;return this.contentPosition=0,this.viewportSize=0,this.contentSize=0,this.contentRatio=0,this.trackSize=0,this.trackRatio=0,this.thumbSize=0,this.thumbPosition=0,this.hasContentToSroll=!1,this.update=function(a){var b=x.charAt(0).toUpperCase()+x.slice(1).toLowerCase();switch(this.viewportSize=p[0]["offset"+b],this.contentSize=q[0]["scroll"+b],this.contentRatio=this.viewportSize/this.contentSize,this.trackSize=this.options.trackSize||this.viewportSize,this.thumbSize=Math.min(this.trackSize,Math.max(this.options.thumbSizeMin,this.options.thumbSize||this.trackSize*this.contentRatio)),this.trackRatio=(this.contentSize-this.viewportSize)/(this.trackSize-this.thumbSize),this.hasContentToSroll=this.contentRatio<1,r.toggleClass("disable",!this.hasContentToSroll),a){case"bottom":this.contentPosition=Math.max(this.contentSize-this.viewportSize,0);break;case"relative":this.contentPosition=Math.min(Math.max(this.contentSize-this.viewportSize,0),Math.max(0,this.contentPosition));break;default:this.contentPosition=parseInt(a,10)||0}return this.thumbPosition=this.contentPosition/this.trackRatio,g(),o},f()}var c="tinyscrollbar",d={axis:"y",wheel:!0,wheelSpeed:40,wheelLock:!0,touchLock:!0,trackSize:!1,thumbSize:!1,thumbSizeMin:20};a.fn[c]=function(d){return this.each(function(){a.data(this,"plugin_"+c)||a.data(this,"plugin_"+c,new b(a(this),d))})}});;
