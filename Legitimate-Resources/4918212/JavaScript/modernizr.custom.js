/* Modernizr custom build of 1.7: applicationcache | canvas | canvastext | draganddrop | hashchange | history | audio | video | indexeddb | inputtypes | input | localstorage | postmessage | sessionstorage | webworkers | websockets | websqldatabase | geolocation */
window.Modernizr=function(a,b,c){function G(){e.input=function(a){for(var b=0,c=a.length;b<c;b++)t[a[b]]=!!(a[b]in l);return t}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)l.setAttribute("type",f=a[d]),e=l.type!=="text",e&&(l.value=m,l.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&l.style.WebkitAppearance!==c?(g.appendChild(l),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(l,null).WebkitAppearance!=="textfield"&&l.offsetHeight!==0,g.removeChild(l)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=l.checkValidity&&l.checkValidity()===!1:/^color$/.test(f)?(g.appendChild(l),g.offsetWidth,e=l.value!=m,g.removeChild(l)):e=l.value!=m)),s[a[d]]=!!e;return s}("search tel url email datetime date month week time datetime-local number range color".split(" "))}function F(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+p.join(c+" ")+c).split(" ");return!!E(d,b)}function E(a,b){for(var d in a)if(k[a[d]]!==c&&(!b||b(a[d],j)))return!0}function D(a,b){return(""+a).indexOf(b)!==-1}function C(a,b){return typeof a===b}function B(a,b){return A(o.join(a+";")+(b||""))}function A(a){k.cssText=a}var d="1.7",e={},f=!0,g=b.documentElement,h=b.head||b.getElementsByTagName("head")[0],i="modernizr",j=b.createElement(i),k=j.style,l=b.createElement("input"),m=":)",n=Object.prototype.toString,o=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),p="Webkit Moz O ms Khtml".split(" "),q={svg:"http://www.w3.org/2000/svg"},r={},s={},t={},u=[],v,w=function(a){var c=b.createElement("style"),d=b.createElement("div"),e;c.textContent=a+"{#modernizr{height:3px}}",h.appendChild(c),d.id="modernizr",g.appendChild(d),e=d.offsetHeight===3,c.parentNode.removeChild(c),d.parentNode.removeChild(d);return!!e},x=function(){function d(d,e){e=e||b.createElement(a[d]||"div");var f=(d="on"+d)in e;f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=C(e[d],"function"),C(e[d],c)||(e[d]=c),e.removeAttribute(d))),e=null;return f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),y=({}).hasOwnProperty,z;C(y,c)||C(y.call,c)?z=function(a,b){return b in a&&C(a.constructor.prototype[b],c)}:z=function(a,b){return y.call(a,b)},r.canvas=function(){var a=b.createElement("canvas");return a.getContext&&a.getContext("2d")},r.canvastext=function(){return e.canvas&&C(b.createElement("canvas").getContext("2d").fillText,"function")},r.geolocation=function(){return!!navigator.geolocation},r.postmessage=function(){return!!a.postMessage},r.websqldatabase=function(){var b=!!a.openDatabase;return b},r.indexedDB=function(){for(var b=-1,c=p.length;++b<c;){var d=p[b].toLowerCase();if(a[d+"_indexedDB"]||a[d+"IndexedDB"])return!0}return!1},r.hashchange=function(){return x("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},r.history=function(){return !!(a.history&&history.pushState)},r.draganddrop=function(){return x("dragstart")&&x("drop")},r.websockets=function(){return"WebSocket"in a},r.video=function(){var a=b.createElement("video"),c=!!a.canPlayType;if(c){c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"');var d='video/mp4; codecs="avc1.42E01E';c.h264=a.canPlayType(d+'"')||a.canPlayType(d+', mp4a.40.2"'),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"')}return c},r.audio=function(){var a=b.createElement("audio"),c=!!a.canPlayType;c&&(c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"'),c.mp3=a.canPlayType("audio/mpeg;"),c.wav=a.canPlayType('audio/wav; codecs="1"'),c.m4a=a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;"));return c},r.localstorage=function(){try{return!!localStorage.getItem}catch(a){return!1}},r.sessionstorage=function(){try{return!!sessionStorage.getItem}catch(a){return!1}},r.webWorkers=function(){return!!a.Worker},r.applicationcache=function(){return!!a.applicationCache};for(var H in r)z(r,H)&&(v=H.toLowerCase(),e[v]=r[H](),u.push((e[v]?"":"no-")+v));e.input||G(),e.crosswindowmessaging=e.postmessage,e.historymanagement=e.history,e.addTest=function(a,b){a=a.toLowerCase();if(!e[a]){b=!!b(),g.className+=" "+(b?"":"no-")+a,e[a]=b;return e}},A(""),j=l=null,e._enableHTML5=f,e._version=d,g.className=g.className.replace(/\bno-js\b/,"")+" js "+u.join(" ");return e}(this,this.document)

