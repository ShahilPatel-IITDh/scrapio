!function(e, t, n) {
function r(e) {
return e.replace(/([a-z])-([a-z])/g, function(e, t, n) {
return t + n.toUpperCase();
}).replace(/^-/, "");
}
function o(e, t) {
return typeof e === t;
}
function i(e) {
var t = w.className, n = E._config.classPrefix || "";
if (b && (t = t.baseVal), E._config.enableJSClass) {
var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
t = t.replace(r, "$1" + n + "js$2");
}
E._config.enableClasses && (t += " " + n + e.join(" " + n), b ? w.className.baseVal = t :w.className = t);
}
function a() {
var e, t, n, r, i, a, s;
for (var l in x) if (x.hasOwnProperty(l)) {
if (e = [], t = x[l], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length)) for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());
for (r = o(t.fn, "function") ? t.fn() :t.fn, i = 0; i < e.length; i++) a = e[i], 
s = a.split("."), 1 === s.length ? E[s[0]] = r :(!E[s[0]] || E[s[0]] instanceof Boolean || (E[s[0]] = new Boolean(E[s[0]])), 
E[s[0]][s[1]] = r), C.push((r ? "" :"no-") + s.join("-"));
}
}
function s() {
return "function" != typeof t.createElement ? t.createElement(arguments[0]) :b ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) :t.createElement.apply(t, arguments);
}
function l(e, t) {
if ("object" == typeof e) for (var n in e) _(e, n) && l(n, e[n]); else {
e = e.toLowerCase();
var r = e.split("."), o = E[r[0]];
if (2 == r.length && (o = o[r[1]]), "undefined" != typeof o) return E;
t = "function" == typeof t ? t() :t, 1 == r.length ? E[r[0]] = t :(!E[r[0]] || E[r[0]] instanceof Boolean || (E[r[0]] = new Boolean(E[r[0]])), 
E[r[0]][r[1]] = t), i([ (t && 0 != t ? "" :"no-") + r.join("-") ]), E._trigger(e, t);
}
return E;
}
function u(e, t) {
return function() {
return e.apply(t, arguments);
};
}
function f(e, t, n) {
var r;
for (var i in e) if (e[i] in t) return n === !1 ? e[i] :(r = t[e[i]], o(r, "function") ? u(r, n || t) :r);
return !1;
}
function c(e, t) {
return !!~("" + e).indexOf(t);
}
function d(t, n, r) {
var o;
if ("getComputedStyle" in e) {
o = getComputedStyle.call(e, t, n);
var i = e.console;
if (null !== o) r && (o = o.getPropertyValue(r)); else if (i) {
var a = i.error ? "error" :"log";
i[a].call(i, "getComputedStyle returning null, its possible modernizr test results are inaccurate");
}
} else o = !n && t.currentStyle && t.currentStyle[r];
return o;
}
function p(e) {
return e.replace(/([A-Z])/g, function(e, t) {
return "-" + t.toLowerCase();
}).replace(/^ms-/, "-ms-");
}
function m() {
var e = t.body;
return e || (e = s(b ? "svg" :"body"), e.fake = !0), e;
}
function h(e, n, r, o) {
var i, a, l, u, f = "modernizr", c = s("div"), d = m();
if (parseInt(r, 10)) for (;r--; ) l = s("div"), l.id = o ? o[r] :f + (r + 1), c.appendChild(l);
return i = s("style"), i.type = "text/css", i.id = "s" + f, (d.fake ? d :c).appendChild(i), 
d.appendChild(c), i.styleSheet ? i.styleSheet.cssText = e :i.appendChild(t.createTextNode(e)), 
c.id = f, d.fake && (d.style.background = "", d.style.overflow = "hidden", u = w.style.overflow, 
w.style.overflow = "hidden", w.appendChild(d)), a = n(c, e), d.fake ? (d.parentNode.removeChild(d), 
w.style.overflow = u, w.offsetHeight) :c.parentNode.removeChild(c), !!a;
}
function g(t, r) {
var o = t.length;
if ("CSS" in e && "supports" in e.CSS) {
for (;o--; ) if (e.CSS.supports(p(t[o]), r)) return !0;
return !1;
}
if ("CSSSupportsRule" in e) {
for (var i = []; o--; ) i.push("(" + p(t[o]) + ":" + r + ")");
return i = i.join(" or "), h("@supports (" + i + ") { #modernizr { position: absolute; } }", function(e) {
return "absolute" == d(e, null, "position");
});
}
return n;
}
function v(e, t, i, a) {
function l() {
f && (delete F.style, delete F.modElem);
}
if (a = o(a, "undefined") ? !1 :a, !o(i, "undefined")) {
var u = g(e, i);
if (!o(u, "undefined")) return u;
}
for (var f, d, p, m, h, v = [ "modernizr", "tspan", "samp" ]; !F.style && v.length; ) f = !0, 
F.modElem = s(v.shift()), F.style = F.modElem.style;
for (p = e.length, d = 0; p > d; d++) if (m = e[d], h = F.style[m], c(m, "-") && (m = r(m)), 
F.style[m] !== n) {
if (a || o(i, "undefined")) return l(), "pfx" == t ? m :!0;
try {
F.style[m] = i;
} catch (y) {}
if (F.style[m] != h) return l(), "pfx" == t ? m :!0;
}
return l(), !1;
}
function y(e, t, n, r, i) {
var a = e.charAt(0).toUpperCase() + e.slice(1), s = (e + " " + O.join(a + " ") + a).split(" ");
return o(t, "string") || o(t, "undefined") ? v(s, t, r, i) :(s = (e + " " + N.join(a + " ") + a).split(" "), 
f(s, t, n));
}
function A(e, t, r) {
return y(e, n, n, t, r);
}
var C = [], w = t.documentElement, b = "svg" === w.nodeName.toLowerCase();
b || !function(e, t) {
function n(e, t) {
var n = e.createElement("p"), r = e.getElementsByTagName("head")[0] || e.documentElement;
return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild);
}
function r() {
var e = A.elements;
return "string" == typeof e ? e.split(" ") :e;
}
function o(e, t) {
var n = A.elements;
"string" != typeof n && (n = n.join(" ")), "string" != typeof e && (e = e.join(" ")), 
A.elements = n + " " + e, u(t);
}
function i(e) {
var t = y[e[g]];
return t || (t = {}, v++, e[g] = v, y[v] = t), t;
}
function a(e, n, r) {
if (n || (n = t), c) return n.createElement(e);
r || (r = i(n));
var o;
return o = r.cache[e] ? r.cache[e].cloneNode() :h.test(e) ? (r.cache[e] = r.createElem(e)).cloneNode() :r.createElem(e), 
!o.canHaveChildren || m.test(e) || o.tagUrn ? o :r.frag.appendChild(o);
}
function s(e, n) {
if (e || (e = t), c) return e.createDocumentFragment();
n = n || i(e);
for (var o = n.frag.cloneNode(), a = 0, s = r(), l = s.length; l > a; a++) o.createElement(s[a]);
return o;
}
function l(e, t) {
t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, 
t.frag = t.createFrag()), e.createElement = function(n) {
return A.shivMethods ? a(n, e, t) :t.createElem(n);
}, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + r().join().replace(/[\w\-:]+/g, function(e) {
return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")';
}) + ");return n}")(A, t.frag);
}
function u(e) {
e || (e = t);
var r = i(e);
return !A.shivCSS || f || r.hasCSS || (r.hasCSS = !!n(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), 
c || l(e, r), e;
}
var f, c, d = "3.7.3", p = e.html5 || {}, m = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, h = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, g = "_html5shiv", v = 0, y = {};
!function() {
try {
var e = t.createElement("a");
e.innerHTML = "<xyz></xyz>", f = "hidden" in e, c = 1 == e.childNodes.length || function() {
t.createElement("a");
var e = t.createDocumentFragment();
return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement;
}();
} catch (n) {
f = !0, c = !0;
}
}();
var A = {
elements:p.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
version:d,
shivCSS:p.shivCSS !== !1,
supportsUnknownElements:c,
shivMethods:p.shivMethods !== !1,
type:"default",
shivDocument:u,
createElement:a,
createDocumentFragment:s,
addElements:o
};
e.html5 = A, u(t), "object" == typeof module && module.exports && (module.exports = A);
}("undefined" != typeof e ? e :this, t);
var x = [], S = {
_version:"3.6.0",
_config:{
classPrefix:"",
enableClasses:!0,
enableJSClass:!0,
usePrefixes:!0
},
_q:[],
on:function(e, t) {
var n = this;
setTimeout(function() {
t(n[e]);
}, 0);
},
addTest:function(e, t, n) {
x.push({
name:e,
fn:t,
options:n
});
},
addAsyncTest:function(e) {
x.push({
name:null,
fn:e
});
}
}, E = function() {};
E.prototype = S, E = new E(), E.addTest("localstorage", function() {
var e = "modernizr";
try {
return localStorage.setItem(e, e), localStorage.removeItem(e), !0;
} catch (t) {
return !1;
}
}), E.addTest("history", function() {
var t = navigator.userAgent;
return -1 === t.indexOf("Android 2.") && -1 === t.indexOf("Android 4.0") || -1 === t.indexOf("Mobile Safari") || -1 !== t.indexOf("Chrome") || -1 !== t.indexOf("Windows Phone") || "file:" === location.protocol ? e.history && "pushState" in e.history :!1;
}), E.addTest("applicationcache", "applicationCache" in e), E.addTest("filereader", !!(e.File && e.FileList && e.FileReader)), 
E.addTest("webgl", function() {
var t = s("canvas"), n = "probablySupportsContext" in t ? "probablySupportsContext" :"supportsContext";
return n in t ? t[n]("webgl") || t[n]("experimental-webgl") :"WebGLRenderingContext" in e;
});
var _;
!function() {
var e = {}.hasOwnProperty;
_ = o(e, "undefined") || o(e.call, "undefined") ? function(e, t) {
return t in e && o(e.constructor.prototype[t], "undefined");
} :function(t, n) {
return e.call(t, n);
};
}(), S._l = {}, S.on = function(e, t) {
this._l[e] || (this._l[e] = []), this._l[e].push(t), E.hasOwnProperty(e) && setTimeout(function() {
E._trigger(e, E[e]);
}, 0);
}, S._trigger = function(e, t) {
if (this._l[e]) {
var n = this._l[e];
setTimeout(function() {
var e, r;
for (e = 0; e < n.length; e++) (r = n[e])(t);
}, 0), delete this._l[e];
}
}, E._q.push(function() {
S.addTest = l;
}), E.addAsyncTest(function() {
function e() {
var e = new Image();
e.onerror = function() {
l("datauri", !0), E.datauri = new Boolean(!0), E.datauri.over32kb = !1;
}, e.onload = function() {
l("datauri", !0), E.datauri = new Boolean(!0), E.datauri.over32kb = 1 == e.width && 1 == e.height;
};
for (var t = "R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="; t.length < 33e3; ) t = "\r\n" + t;
e.src = "data:image/gif;base64," + t;
}
-1 !== navigator.userAgent.indexOf("MSIE 7.") && setTimeout(function() {
l("datauri", !1);
}, 10);
var t = new Image();
t.onerror = function() {
l("datauri", !1);
}, t.onload = function() {
1 == t.width && 1 == t.height ? e() :l("datauri", !1);
}, t.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
});
var T = "Moz O ms Webkit", O = S._config.usePrefixes ? T.split(" ") :[];
S._cssomPrefixes = O;
var P = function(t) {
var r, o = prefixes.length, i = e.CSSRule;
if ("undefined" == typeof i) return n;
if (!t) return !1;
if (t = t.replace(/^@/, ""), r = t.replace(/-/g, "_").toUpperCase() + "_RULE", r in i) return "@" + t;
for (var a = 0; o > a; a++) {
var s = prefixes[a], l = s.toUpperCase() + "_" + r;
if (l in i) return "@-" + s.toLowerCase() + "-" + t;
}
return !1;
};
S.atRule = P;
var N = S._config.usePrefixes ? T.toLowerCase().split(" ") :[];
S._domPrefixes = N;
var j = {
elem:s("modernizr")
};
E._q.push(function() {
delete j.elem;
});
var F = {
style:j.elem.style
};
E._q.unshift(function() {
delete F.style;
}), S.testAllProps = y, S.prefixed = function(e, t, n) {
return 0 === e.indexOf("@") ? P(e) :(-1 != e.indexOf("-") && (e = r(e)), t ? y(e, t, n) :y(e, "pfx"));
}, S.testAllProps = A, E.addTest("csstransforms", function() {
return -1 === navigator.userAgent.indexOf("Android 2.") && A("transform", "scale(1)", !0);
}), a(), i(C), delete S.addTest, delete S.addAsyncTest;
for (var k = 0; k < E._q.length; k++) E._q[k]();
e.Modernizr = E;
}(window, document);
