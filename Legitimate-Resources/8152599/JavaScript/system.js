"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 * SystemJS v0.20.0-rc.8 Dev
 */
!function () {
  "use strict";
  function e(e) {
    return ot ? Symbol() : "@@" + e;
  }function t(e, t) {
    et || (t = t.replace(rt ? /file:\/\/\//g : /file:\/\//g, ""));var r,
        n = (e.message || e) + "\n  " + t;r = at && e.fileName ? new Error(n, e.fileName, e.lineNumber) : new Error(n);var o = e.originalErr ? e.originalErr.stack : e.stack;return tt ? r.stack = n + "\n  " + o : r.stack = o, r.originalErr = e.originalErr || e, r;
  }function r() {
    throw new RangeError('Unable to resolve "' + relUrl + '" to ' + parentUrl);
  }function n(e, t) {
    var n = t && t.substr(0, t.indexOf(":") + 1),
        o = e[0],
        i = e[1];if ("/" === o && "/" === i) return n || r(e, t), n + e;if ("." === o && ("/" === i || "." === i && ("/" === e[2] || 2 === e.length) || 1 === e.length) || "/" === o) {
      var a,
          s = !n || "/" !== t[n.length];if (s ? (void 0 === t && r(e, t), a = t) : "/" === t[n.length + 1] ? "file:" !== n ? (a = t.substr(n.length + 2), a = a.substr(a.indexOf("/") + 1)) : a = t.substr(8) : a = t.substr(n.length + 1), "/" === o) {
        if (!s) return t.substr(0, t.length - a.length - 1) + e;r(e, t);
      }for (var u = a.substr(0, a.lastIndexOf("/") + 1) + e, l = [], c = void 0, f = 0; f < u.length; f++) {
        if (void 0 === c) {
          if ("." !== u[f]) c = f;else {
            if ("." !== u[f + 1] || "/" !== u[f + 2] && f !== u.length - 2) {
              if ("/" !== u[f + 1] && f !== u.length - 1) {
                c = f;continue;
              }f += 1;
            } else l.pop(), f += 2;s && 0 === l.length && r(e, t), f === u.length && l.push("");
          }
        } else "/" === u[f] && (l.push(u.substr(c, f - c + 1)), c = void 0);
      }return void 0 !== c && l.push(u.substr(c, u.length - c)), t.substr(0, t.length - a.length) + l.join("");
    }var d = e.indexOf(":");return -1 !== d ? tt && ":" === e[1] && "\\" === e[2] && e[0].match(/[a-z]/i) ? "file:///" + e.replace(/\\/g, "/") : e : void 0;
  }function o(e) {
    if (e.values) return e.values();if ("undefined" == typeof Symbol || !Symbol.iterator) throw new Error("Symbol.iterator not supported in this browser");var t = {};return t[Symbol.iterator] = function () {
      var t = Object.keys(e),
          r = 0;return { next: function next() {
          return r < t.length ? { value: e[t[r++]], done: !1 } : { value: void 0, done: !0 };
        } };
    }, t;
  }function i() {
    this.registry = new u();
  }function a(e) {
    if (!(e instanceof l)) throw new TypeError("Module instantiation did not return a valid namespace object.");return e;
  }function s(e) {
    if (void 0 === e) throw new RangeError("No resolution found.");return e;
  }function u() {
    this[ft] = {}, this._registry = ft;
  }function l(e) {
    Object.defineProperty(this, dt, { value: e }), Object.keys(e).forEach(c, this);
  }function c(e) {
    Object.defineProperty(this, e, { enumerable: !0, get: function get() {
        return this[dt][e];
      } });
  }function f() {
    i.call(this), this[pt] = { lastRegister: void 0, records: {} }, this.trace = !1;
  }function d(e, t, r) {
    return e.records[t] = { key: t, registration: r, module: void 0, importerSetters: void 0, linkRecord: { instantiatePromise: void 0, dependencies: void 0, execute: void 0, executingRequire: !1, moduleObj: void 0, setters: void 0, depsInstantiatePromise: void 0, dependencyInstantiations: void 0, linked: !1, error: void 0 } };
  }function p(e, t, r, n, o) {
    var i = n[t];if (i) return Promise.resolve(i);var a = o.records[t];return a && !a.module ? h(e, a, a.linkRecord, n, o) : e.resolve(t, r).then(function (t) {
      if (i = n[t]) return i;a = o.records[t], (!a || a.module) && (a = d(o, t, a && a.registration));var r = a.linkRecord;return r ? h(e, a, r, n, o) : a;
    });
  }function g(e, t, r) {
    return function () {
      var e = r.lastRegister;return e ? (r.lastRegister = void 0, t.registration = e, !0) : !!t.registration;
    };
  }function h(e, r, n, o, i) {
    return n.instantiatePromise || (n.instantiatePromise = (r.registration ? Promise.resolve() : Promise.resolve().then(function () {
      return i.lastRegister = void 0, e[gt](r.key, e[gt].length > 1 && g(e, r, i));
    })).then(function (t) {
      if (void 0 !== t) {
        if (!(t instanceof l)) throw new TypeError("Instantiate did not return a valid Module object.");return delete i.records[r.key], e.trace && v(e, r, n), o[r.key] = t;
      }var a = r.registration;if (r.registration = void 0, !a) throw new TypeError("Module instantiation did not call an anonymous or correctly named System.register.");return n.dependencies = a[0], r.importerSetters = [], n.moduleObj = {}, a[2] ? (n.moduleObj.default = {}, n.moduleObj.__useDefault = !0, n.executingRequire = a[1], n.execute = a[2]) : y(e, r, n, a[1]), n.dependencies.length || (n.linked = !0, e.trace && v(e, r, n)), r;
    }).catch(function (e) {
      throw n.error = t(e, "Instantiating " + r.key);
    }));
  }function m(e, t, r, n, o, i) {
    return e.resolve(t, r).then(function (r) {
      i && (i[t] = t);var a = o.records[r],
          s = n[r];if (s && (!a || a.module && s !== a.module)) return s;(!a || !s && a.module) && (a = d(o, r, a && a.registration));var u = a.linkRecord;return u ? h(e, a, u, n, o) : a;
    });
  }function v(e, t, r) {
    e.loads = e.loads || {}, e.loads[t.key] = { key: t.key, deps: r.dependencies, depMap: r.depMap || {} };
  }function y(e, t, r, n) {
    var o = r.moduleObj,
        i = t.importerSetters,
        a = !1,
        s = n.call(nt, function (e, t) {
      if (!a) {
        if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) for (var r in e) {
          "__useDefault" !== r && (o[r] = e[r]);
        } else o[e] = t;a = !0;for (var n = 0; n < i.length; n++) {
          i[n](o);
        }return a = !1, t;
      }
    }, new k(e, t.key));r.setters = s.setters, r.execute = s.execute, s.exports && (r.moduleObj = o = s.exports);
  }function b(e, r, n, o, i, a) {
    return (n.depsInstantiatePromise || (n.depsInstantiatePromise = Promise.resolve().then(function () {
      for (var t = Array(n.dependencies.length), a = 0; a < n.dependencies.length; a++) {
        t[a] = m(e, n.dependencies[a], r.key, o, i, e.trace && (n.depMap = {}));
      }return Promise.all(t);
    }).then(function (e) {
      if (n.dependencyInstantiations = e, n.setters) for (var t = 0; t < e.length; t++) {
        var r = n.setters[t];if (r) {
          var o = e[t];o instanceof l ? r(o) : (r(o.module || o.linkRecord.moduleObj), o.importerSetters && o.importerSetters.push(r));
        }
      }
    }))).then(function () {
      for (var t = [], r = 0; r < n.dependencies.length; r++) {
        var s = n.dependencyInstantiations[r],
            u = s.linkRecord;u && !u.linked && -1 === a.indexOf(s) && (a.push(s), t.push(b(e, s, s.linkRecord, o, i, a)));
      }return Promise.all(t);
    }).then(function () {
      return n.linked = !0, e.trace && v(e, r, n), r;
    }).catch(function (e) {
      throw e = t(e, "Loading " + r.key), n.error = n.error || e, e;
    });
  }function w(e, t) {
    var r = e[pt];r.records[t.key] === t && delete r.records[t.key];var n = t.linkRecord;n && n.dependencyInstantiations && n.dependencyInstantiations.forEach(function (t, o) {
      if (t && !(t instanceof l) && t.linkRecord && (t.linkRecord.error && r.records[t.key] === t && w(e, t), n.setters && t.importerSetters)) {
        var i = t.importerSetters.indexOf(n.setters[o]);t.importerSetters.splice(i, 1);
      }
    });
  }function k(e, t) {
    this.loader = e, this.key = this.id = t;
  }function x(e, t, r, n, o, i) {
    if (t.module) return t.module;if (r.error) throw r.error;if (i && -1 !== i.indexOf(t)) return t.linkRecord.moduleObj;var a = O(e, t, r, n, o, r.setters ? [] : i || []);if (a) throw w(e, t), a;return t.module;
  }function S(e, t, r, n, o, i, a) {
    return function (s) {
      for (var u = 0; u < r.length; u++) {
        if (r[u] === s) {
          var c,
              f = n[u];return c = f instanceof l ? f : x(e, f, f.linkRecord, o, i, a), c.__useDefault ? c.default : c;
        }
      }throw new Error("Module " + s + " not declared as a System.registerDynamic dependency of " + t);
    };
  }function O(e, r, n, o, i, a) {
    a.push(r);var s;if (n.setters) for (var u, c, f = 0; f < n.dependencies.length; f++) {
      if (u = n.dependencyInstantiations[f], !(u instanceof l) && (c = u.linkRecord, c && -1 === a.indexOf(u) && (s = c.error ? c.error : O(e, u, c, o, i, c.setters ? a : [])), s)) return n.error = t(s, "Evaluating " + r.key);
    }if (n.execute) if (n.setters) s = E(n.execute);else {
      var d = { id: r.key },
          p = n.moduleObj;Object.defineProperty(d, "exports", { configurable: !0, set: function set(e) {
          p.default = e;
        }, get: function get() {
          return p.default;
        } });var g = S(e, r.key, n.dependencies, n.dependencyInstantiations, o, i, a);if (!n.executingRequire) for (var f = 0; f < n.dependencies.length; f++) {
        g(n.dependencies[f]);
      }if (s = j(n.execute, g, p.default, d), p.default && p.default.__esModule) for (var h in p.default) {
        p.default.hasOwnProperty(h) && "default" !== h && (p[h] = p.default[h]);
      }
    }if (s) return n.error = t(s, "Evaluating " + r.key);if (o[r.key] = r.module = new l(n.moduleObj), !n.setters) {
      if (r.importerSetters) for (var f = 0; f < r.importerSetters.length; f++) {
        r.importerSetters[f](r.module);
      }r.importerSetters = void 0;
    }r.linkRecord = void 0;
  }function E(e) {
    try {
      e.call(ht);
    } catch (e) {
      return e;
    }
  }function j(e, t, r, n) {
    try {
      var o = e.call(nt, t, r, n);void 0 !== o && (n.exports = o);
    } catch (e) {
      return e;
    }
  }function R() {}function P(e) {
    return e instanceof l ? e : new l(e && e.__esModule ? e : { default: e, __useDefault: !0 });
  }function C(e, t) {
    (t || this.warnings && "undefined" != typeof console && console.warn) && console.warn(e);
  }function _(e, t) {
    if ("." === e[0]) throw new Error("Node module " + e + " can't be loaded as it is not a package require.");if (!mt) {
      var r = this._nodeRequire("module"),
          n = t.substr(rt ? 8 : 7);mt = new r(n), mt.paths = r._nodeModulePaths(n);
    }return mt.require(e);
  }function M(e, t) {
    for (var r in t) {
      Object.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    }return e;
  }function L(e, t) {
    for (var r in t) {
      Object.hasOwnProperty.call(t, r) && void 0 === e[r] && (e[r] = t[r]);
    }return e;
  }function A(e, t, r) {
    for (var n in t) {
      if (Object.hasOwnProperty.call(t, n)) {
        var o = t[n];void 0 === e[n] ? e[n] = o : o instanceof Array && e[n] instanceof Array ? e[n] = [].concat(r ? o : e[n]).concat(r ? e[n] : o) : "object" == (typeof o === "undefined" ? "undefined" : _typeof(o)) && null !== o && "object" == _typeof(e[n]) ? e[n] = (r ? L : M)(M({}, e[n]), o) : r || (e[n] = o);
      }
    }
  }function I(e) {
    if (!xt && !St) {
      var t = new Image();return void (t.src = e);
    }var r = document.createElement("link");xt ? (r.rel = "preload", r.as = "script") : r.rel = "prefetch", r.href = e, document.head.appendChild(r), document.head.removeChild(r);
  }function F(e, t, r) {
    try {
      importScripts(e);
    } catch (e) {
      r(e);
    }t();
  }function K(e, t, r, n, o) {
    function i() {
      n(), s();
    }function a(t) {
      s(), o(new Error("Fetching " + e));
    }function s() {
      for (var e = 0; e < Ot.length; e++) {
        if (Ot[e].err === a) {
          Ot.splice(e, 1);break;
        }
      }u.removeEventListener("load", i, !1), u.removeEventListener("error", a, !1), document.head.removeChild(u);
    }if (e = e.replace(/#/g, "%23"), kt) return F(e, n, o);var u = document.createElement("script");u.type = "text/javascript", u.charset = "utf-8", u.async = !0, t && (u.crossOrigin = t), r && (u.integrity = r), u.addEventListener("load", i, !1), u.addEventListener("error", a, !1), u.src = e, document.head.appendChild(u);
  }function D(e, t) {
    for (var r = e.split("."); r.length;) {
      t = t[r.shift()];
    }return t;
  }function U(e, t, r) {
    var o = T(t, r);if (o) {
      var i = t[o] + r.substr(o.length),
          a = n(i, Ve);return void 0 !== a ? a : e + i;
    }return -1 !== r.indexOf(":") ? r : e + r;
  }function q(e) {
    var t = this.name;if (t.substr(0, e.length) === e && (t.length === e.length || "/" === t[e.length] || "/" === e[e.length - 1] || ":" === e[e.length - 1])) {
      var r = e.split("/").length;r > this.len && (this.match = e, this.len = r);
    }
  }function T(e, t) {
    if (Object.hasOwnProperty.call(e, t)) return t;var r = { name: t, match: void 0, len: 0 };return Object.keys(e).forEach(q, r), r.match;
  }function z(e, t, r, n) {
    if ("file:///" === e.substr(0, 8)) {
      if (Ct) return N(e, t, r, n);throw new Error("Unable to fetch file URLs in this environment.");
    }e = e.replace(/#/g, "%23");var o = { headers: { Accept: "application/x-es-module, */*" } };return r && (o.integrity = r), t && ("string" == typeof t && (o.headers.Authorization = t), o.credentials = "include"), fetch(e, o).then(function (e) {
      if (e.ok) return n ? e.arrayBuffer() : e.text();throw new Error("Fetch error: " + e.status + " " + e.statusText);
    });
  }function N(e, t, r, n) {
    return new Promise(function (r, o) {
      function i() {
        r(n ? s.response : s.responseText);
      }function a() {
        o(new Error("XHR error: " + (s.status ? " (" + s.status + (s.statusText ? " " + s.statusText : "") + ")" : "") + " loading " + e));
      }e = e.replace(/#/g, "%23");var s = new XMLHttpRequest();n && (s.responseType = "arraybuffer"), s.onreadystatechange = function () {
        4 === s.readyState && (0 == s.status ? s.response ? i() : (s.addEventListener("error", a), s.addEventListener("load", i)) : 200 === s.status ? i() : a());
      }, s.open("GET", e, !0), s.setRequestHeader && (s.setRequestHeader("Accept", "application/x-es-module, */*"), t && ("string" == typeof t && s.setRequestHeader("Authorization", t), s.withCredentials = !0)), s.send(null);
    });
  }function J(e, t, r, n) {
    return "file:///" != e.substr(0, 8) ? Promise.reject(new Error('Unable to fetch "' + e + '". Only file URLs of the form file:/// supported running in Node.')) : (jt = jt || require("fs"), e = rt ? e.replace(/\//g, "\\").substr(8) : e.substr(7), new Promise(function (t, r) {
      jt.readFile(e, function (e, o) {
        if (e) return r(e);if (n) t(o);else {
          var i = o + "";"\uFEFF" === i[0] && (i = i.substr(1)), t(i);
        }
      });
    }));
  }function $() {
    throw new Error("No fetch method is defined for this environment.");
  }function B() {
    return { pluginKey: void 0, pluginArgument: void 0, pluginModule: void 0, packageKey: void 0, packageConfig: void 0, load: void 0 };
  }function W(e, t, r) {
    var n = B();if (r) {
      var o;t.pluginFirst ? -1 !== (o = r.lastIndexOf("!")) && (n.pluginArgument = n.pluginKey = r.substr(0, o)) : -1 !== (o = r.indexOf("!")) && (n.pluginArgument = n.pluginKey = r.substr(o + 1)), n.packageKey = T(t.packages, r), n.packageKey && (n.packageConfig = t.packages[n.packageKey]);
    }return n;
  }function G(e, t) {
    var r = this[bt],
        n = B(),
        o = W(this, r, t),
        i = this;return Promise.resolve().then(function () {
      var r = e.lastIndexOf("#?");if (-1 === r) return Promise.resolve(e);var n = pe.call(i, e.substr(r + 2));return ge.call(i, n, t, !0).then(function (t) {
        return t ? e.substr(0, r) : "@empty";
      });
    }).then(function (e) {
      var a = te(r.pluginFirst, e);return a ? (n.pluginKey = a.plugin, Promise.all([Q.call(i, r, a.argument, o && o.pluginArgument || t, n, o, !0), i.resolve(a.plugin, t)]).then(function (e) {
        if (n.pluginArgument = e[0], n.pluginKey = e[1], n.pluginArgument === n.pluginKey) throw new Error("Plugin " + n.pluginArgument + " cannot load itself, make sure it is excluded from any wildcard meta configuration via a custom loader: false rule.");return re(r.pluginFirst, e[0], e[1]);
      })) : Q.call(i, r, e, o && o.pluginArgument || t, n, o, !1);
    }).then(function (e) {
      return he.call(i, e, t, o);
    }).then(function (e) {
      return ee.call(i, r, e, n), n.pluginKey || !n.load.loader ? e : i.resolve(n.load.loader, e).then(function (t) {
        return n.pluginKey = t, n.pluginArgument = e, e;
      });
    }).then(function (e) {
      return i[wt][e] = n, e;
    });
  }function H(e, t) {
    var r = te(e.pluginFirst, t);if (r) {
      var n = H.call(this, e, r.plugin);return re(e.pluginFirst, X.call(this, e, r.argument, void 0, !1), n);
    }return X.call(this, e, t, void 0, !1);
  }function Z(e, t) {
    var r = this[bt],
        n = B(),
        o = o || W(this, r, t),
        i = te(r.pluginFirst, e);return i ? (n.pluginKey = Z.call(this, i.plugin, t), re(r.pluginFirst, Y.call(this, r, i.argument, o.pluginArgument || t, n, o, !!n.pluginKey), n.pluginKey)) : Y.call(this, r, e, o.pluginArgument || t, n, o, !!n.pluginKey);
  }function X(e, t, r, o) {
    var i = n(t, r || Ve);if (i) return U(e.baseURL, e.paths, i);if (o) {
      var a = T(e.map, t);if (a && (t = e.map[a] + t.substr(a.length), i = n(t, Ve))) return U(e.baseURL, e.paths, i);
    }return this.registry.has(t) ? t : "@node/" === t.substr(0, 6) ? t : U(e.baseURL, e.paths, t);
  }function Y(e, t, r, n, o, i) {
    if (o && o.packageConfig && "." !== t[0]) {
      var a = o.packageConfig.map,
          s = a && T(a, t);if (s && "string" == typeof a[s]) {
        var u = ae(this, e, o.packageConfig, o.packageKey, s, t, n, i);if (u) return u;
      }
    }var l = X.call(this, e, t, r, !0),
        c = ce(e, l);if (n.packageKey = c && c.packageKey || T(e.packages, l), !n.packageKey) return l;if (-1 !== e.packageConfigKeys.indexOf(l)) return n.packageKey = void 0, l;n.packageConfig = e.packages[n.packageKey] || (e.packages[n.packageKey] = ke());var f = l.substr(n.packageKey.length + 1);return oe(this, e, n.packageConfig, n.packageKey, f, n, i);
  }function Q(e, t, r, n, o, i) {
    var a = this;return vt.then(function () {
      if (o && o.packageConfig && "./" !== t.substr(0, 2)) {
        var r = o.packageConfig.map,
            s = r && T(r, t);if (s) return ue(a, e, o.packageConfig, o.packageKey, s, t, n, i);
      }return vt;
    }).then(function (o) {
      if (o) return o;var s = X.call(a, e, t, r, !0),
          u = ce(e, s);if (n.packageKey = u && u.packageKey || T(e.packages, s), !n.packageKey) return Promise.resolve(s);if (-1 !== e.packageConfigKeys.indexOf(s)) return n.packageKey = void 0, n.load = V(), n.load.format = "json", Promise.resolve(s);n.packageConfig = e.packages[n.packageKey] || (e.packages[n.packageKey] = ke());var l = u && !n.packageConfig.configured;return (l ? fe(a, e, u.configPath, n) : vt).then(function () {
        var t = s.substr(n.packageKey.length + 1);return se(a, e, n.packageConfig, n.packageKey, t, n, i);
      });
    });
  }function V() {
    return { extension: "", deps: void 0, format: void 0, loader: void 0, scriptLoad: void 0, globals: void 0, nonce: void 0, integrity: void 0, sourceMap: void 0, exports: void 0, encapsulateGlobal: !1, crossOrigin: void 0, cjsRequireDetection: !0, cjsDeferDepsExecute: !1 };
  }function ee(e, t, r) {
    r.load = r.load || V();var n,
        o = 0;for (var i in e.meta) {
      if (n = i.indexOf("*"), -1 !== n && i.substr(0, n) === t.substr(0, n) && i.substr(n + 1) === t.substr(t.length - i.length + n + 1)) {
        var a = i.split("/").length;a > o && (o = a), A(r.load, e.meta[i], o !== a);
      }
    }if (e.meta[t] && A(r.load, e.meta[t], !1), r.packageKey) {
      var s = t.substr(r.packageKey.length + 1),
          u = {};if (r.packageConfig.meta) {
        var o = 0;de(r.packageConfig.meta, s, function (e, t, r) {
          r > o && (o = r), A(u, t, r && o > r);
        }), A(r.load, u, !1);
      }r.packageConfig.format && !r.pluginKey && (r.load.format = r.load.format || r.packageConfig.format);
    }
  }function te(e, t) {
    var r,
        n,
        o = e ? t.indexOf("!") : t.lastIndexOf("!");return -1 !== o ? (e ? (r = t.substr(o + 1), n = t.substr(0, o)) : (r = t.substr(0, o), n = t.substr(o + 1) || r.substr(r.lastIndexOf(".") + 1)), { argument: r, plugin: n }) : void 0;
  }function re(e, t, r) {
    return e ? r + "!" + t : t + "!" + r;
  }function ne(e, t, r, n, o) {
    if (!n || !t.defaultExtension || "/" === n[n.length - 1] || o) return n;var i = !1;if (t.meta && de(t.meta, n, function (e, t, r) {
      return 0 === r || e.lastIndexOf("*") !== e.length - 1 ? i = !0 : void 0;
    }), !i && e.meta && de(e.meta, r + "/" + n, function (e, t, r) {
      return 0 === r || e.lastIndexOf("*") !== e.length - 1 ? i = !0 : void 0;
    }), i) return n;var a = "." + t.defaultExtension;return n.substr(n.length - a.length) !== a ? n + a : n;
  }function oe(e, t, r, n, o, i, a) {
    if (!o) {
      if (!r.main) return n;o = "./" === r.main.substr(0, 2) ? r.main.substr(2) : r.main;
    }if (r.map) {
      var s = "./" + o,
          u = T(r.map, s);if (u || (s = "./" + ne(e, r, n, o, a), s !== "./" + o && (u = T(r.map, s))), u) {
        var l = ae(e, t, r, n, u, s, i, a);if (l) return l;
      }
    }return n + "/" + ne(e, r, n, o, a);
  }function ie(e, t, r) {
    return t.substr(0, e.length) === e && r.length > e.length ? !1 : !0;
  }function ae(e, t, r, n, o, i, a, s) {
    "/" === i[i.length - 1] && (i = i.substr(0, i.length - 1));var u = r.map[o];if ("object" == (typeof u === "undefined" ? "undefined" : _typeof(u))) throw new Error("Synchronous conditional normalization not supported sync normalizing " + o + " in " + n);if (ie(o, u, i) && "string" == typeof u) return Y.call(this, t, u + i.substr(o.length), n + "/", a, a, s);
  }function se(e, t, r, n, o, i, a) {
    if (!o) {
      if (!r.main) return Promise.resolve(n);o = "./" === r.main.substr(0, 2) ? r.main.substr(2) : r.main;
    }var s, u;return r.map && (s = "./" + o, u = T(r.map, s), u || (s = "./" + ne(e, r, n, o, a), s !== "./" + o && (u = T(r.map, s)))), (u ? ue(e, t, r, n, u, s, i, a) : vt).then(function (t) {
      return Promise.resolve(t ? t : n + "/" + ne(e, r, n, o, a));
    });
  }function ue(e, t, r, n, o, i, a, s) {
    "/" === i[i.length - 1] && (i = i.substr(0, i.length - 1));var u = r.map[o];if ("string" == typeof u) return ie(o, u, i) ? Q.call(e, t, u + i.substr(o.length), n + "/", a, a, s).then(function (t) {
      return he.call(e, t, n + "/", a);
    }) : vt;var l = [],
        c = [];for (var d in u) {
      var p = pe(d);c.push({ condition: p, map: u[d] }), l.push(f.prototype.import.call(e, p.module, n));
    }return Promise.all(l).then(function (e) {
      for (var t = 0; t < c.length; t++) {
        var r = c[t].condition,
            n = D(r.prop, e[t].__useDefault ? e[t].default : e[t]);if (!r.negate && n || r.negate && !n) return c[t].map;
      }
    }).then(function (r) {
      return r ? ie(o, r, i) ? Q.call(e, t, r + i.substr(o.length), n + "/", a, a, s).then(function (t) {
        return he.call(e, t, n + "/", a);
      }) : vt : void 0;
    });
  }function le(e) {
    var t = e.lastIndexOf("*"),
        r = Math.max(t + 1, e.lastIndexOf("/"));return { length: r, regEx: new RegExp("^(" + e.substr(0, r).replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, "[^\\/]+") + ")(\\/|$)"), wildcard: -1 !== t };
  }function ce(e, t) {
    for (var r, n, o = !1, i = 0; i < e.packageConfigPaths.length; i++) {
      var a = e.packageConfigPaths[i],
          s = Mt[a] || (Mt[a] = le(a));if (!(t.length < s.length)) {
        var u = t.match(s.regEx);!u || r && (o && s.wildcard || !(r.length < u[1].length)) || (r = u[1], o = !s.wildcard, n = r + a.substr(s.length));
      }
    }return r ? { packageKey: r, configPath: n } : void 0;
  }function fe(e, r, n, o, i) {
    var a = e.pluginLoader || e;return -1 === r.packageConfigKeys.indexOf(n) && r.packageConfigKeys.push(n), a.import(n).then(function (e) {
      xe(o.packageConfig, e, o.packageKey, !0, r), o.packageConfig.configured = !0;
    }).catch(function (e) {
      throw t(e, "Unable to fetch package configuration file " + n);
    });
  }function de(e, t, r) {
    var n;for (var o in e) {
      var i = "./" === o.substr(0, 2) ? "./" : "";if (i && (o = o.substr(2)), n = o.indexOf("*"), -1 !== n && o.substr(0, n) === t.substr(0, n) && o.substr(n + 1) === t.substr(t.length - o.length + n + 1) && r(o, e[i + o], o.split("/").length)) return;
    }var a = e[t] && Object.hasOwnProperty.call(e, t) ? e[t] : e["./" + t];a && r(a, a, 0);
  }function pe(e) {
    var t,
        r,
        n,
        n,
        o = e.lastIndexOf("|");return -1 !== o ? (t = e.substr(o + 1), r = e.substr(0, o), "~" === t[0] && (n = !0, t = t.substr(1))) : (n = "~" === e[0], t = "default", r = e.substr(n), -1 !== Lt.indexOf(r) && (t = r, r = null)), { module: r || "@system-env", prop: t, negate: n };
  }function ge(e, t, r) {
    return f.prototype.import.call(this, e.module, t).then(function (t) {
      var n = D(e.prop, t);if (r && "boolean" != typeof n) throw new TypeError("Condition did not resolve to a boolean.");return e.negate ? !n : n;
    });
  }function he(e, t, r) {
    var n = e.match(At);if (!n) return Promise.resolve(e);var o = pe.call(this, n[0].substr(2, n[0].length - 3));return ge.call(this, o, t, !1).then(function (r) {
      if ("string" != typeof r) throw new TypeError("The condition value for " + e + " doesn't resolve to a string.");if (-1 !== r.indexOf("/")) throw new TypeError("Unabled to interpolate conditional " + e + (t ? " in " + t : "") + "\n	The condition value " + r + ' cannot contain a "/" separator.');return e.replace(At, r);
    });
  }function me(e, t, r) {
    for (var n = 0; n < It.length; n++) {
      var o = It[n];t[o] && mr[o.substr(0, o.length - 6)] && r(t[o]);
    }
  }function ve(e, t) {
    var r = {};for (var n in e) {
      var o = e[n];t > 1 ? "object" == (typeof o === "undefined" ? "undefined" : _typeof(o)) ? r[n] = ve(o, t - 1) : "packageConfig" !== n && (r[n] = o) : r[n] = o;
    }return r;
  }function ye(e, t) {
    var r = e[t];return r instanceof Array ? e[t].concat([]) : "object" == (typeof r === "undefined" ? "undefined" : _typeof(r)) ? ve(r, 3) : e[t];
  }function be(e) {
    if (e) {
      if (-1 !== vr.indexOf(e)) return ye(this[bt], e);throw new Error('"' + e + '" is not a valid configuration name. Must be one of ' + vr.join(", ") + ".");
    }for (var t = {}, r = 0; r < vr.length; r++) {
      var n = vr[r],
          o = ye(this[bt], n);void 0 !== o && (t[n] = o);
    }return t;
  }function we(e, t) {
    var r = this,
        o = this[bt];if ("warnings" in e && (o.warnings = e.warnings), "wasm" in e && (o.wasm = "undefined" != typeof WebAssembly && e.wasm), ("production" in e || "build" in e) && Ye.call(r, !!e.production, !!(e.build || mr && mr.build)), !t) {
      var i;me(r, e, function (e) {
        i = i || e.baseURL;
      }), i = i || e.baseURL, i && (o.baseURL = n(i, Ve) || n("./" + i, Ve), "/" !== o.baseURL[o.baseURL.length - 1] && (o.baseURL += "/")), e.paths && M(o.paths, e.paths), me(r, e, function (e) {
        e.paths && M(o.paths, e.paths);
      });for (var a in o.paths) {
        -1 !== o.paths[a].indexOf("*") && (C.call(o, "Path config " + a + " -> " + o.paths[a] + " is no longer supported as wildcards are deprecated."), delete o.paths[a]);
      }
    }if (e.defaultJSExtensions && C.call(o, "The defaultJSExtensions configuration option is deprecated.\n  Use packages defaultExtension instead.", !0), "boolean" == typeof e.pluginFirst && (o.pluginFirst = e.pluginFirst), e.map) for (var a in e.map) {
      var s = e.map[a];if ("string" == typeof s) o.map[a] = X.call(r, o, s, void 0, !1);else {
        var u = X.call(r, o, a, void 0, !0),
            l = o.packages[u];l || (l = o.packages[u] = ke(), l.defaultExtension = ""), xe(l, { map: s }, u, !1, o);
      }
    }if (e.packageConfigPaths) {
      for (var c = [], f = 0; f < e.packageConfigPaths.length; f++) {
        var d = e.packageConfigPaths[f],
            p = Math.max(d.lastIndexOf("*") + 1, d.lastIndexOf("/")),
            g = X.call(r, o, d.substr(0, p), void 0, !1);c[f] = g + d.substr(p);
      }o.packageConfigPaths = c;
    }if (e.bundles) for (var a in e.bundles) {
      for (var h = [], f = 0; f < e.bundles[a].length; f++) {
        h.push(r.normalizeSync(e.bundles[a][f]));
      }o.bundles[a] = h;
    }if (e.packages) for (var a in e.packages) {
      if (a.match(/^([^\/]+:)?\/\/$/)) throw new TypeError('"' + a + '" is not a valid package name.');var u = X.call(r, o, a, void 0, !0);"/" === u[u.length - 1] && (u = u.substr(0, u.length - 1)), xe(o.packages[u] = o.packages[u] || ke(), e.packages[a], u, !1, o);
    }if (e.depCache) for (var a in e.depCache) {
      o.depCache[r.normalizeSync(a)] = [].concat(e.depCache[a]);
    }if (e.meta) for (var a in e.meta) {
      if ("*" === a[0]) M(o.meta[a] = o.meta[a] || {}, e.meta[a]);else {
        var m = X.call(r, o, a, void 0, !0);M(o.meta[m] = o.meta[m] || {}, e.meta[a]);
      }
    }"transpiler" in e && (o.transpiler = e.transpiler);for (var v in e) {
      -1 === vr.indexOf(v) && -1 === It.indexOf(v) && (o[v] = e[v]);
    }me(r, e, function (e) {
      r.config(e, !0);
    });
  }function ke() {
    return { defaultExtension: void 0, main: void 0, format: void 0, meta: void 0, map: void 0, packageConfig: void 0, configured: !1 };
  }function xe(e, t, r, n, o) {
    for (var i in t) {
      "main" === i || "format" === i || "defaultExtension" === i || "configured" === i ? n && void 0 !== e[i] || (e[i] = t[i]) : "map" === i ? (n ? L : M)(e.map = e.map || {}, t.map) : "meta" === i ? (n ? L : M)(e.meta = e.meta || {}, t.meta) : Object.hasOwnProperty.call(t, i) && C.call(o, '"' + i + '" is not a valid package configuration option in package ' + r);
    }return void 0 === e.defaultExtension && (e.defaultExtension = "js"), void 0 === e.main && e.map && e.map["."] ? (e.main = e.map["."], delete e.map["."]) : "object" == _typeof(e.main) && (e.map = e.map || {}, e.map["./@main"] = e.main, e.main.default = e.main.default || "./", e.main = "@main"), e;
  }function Se(e) {
    return Ft ? Tt + new Buffer(e).toString("base64") : "undefined" != typeof btoa ? Tt + btoa(unescape(encodeURIComponent(e))) : "";
  }function Oe(e, t, r, n) {
    var o = e.lastIndexOf("\n");if (t) {
      if ("object" != (typeof t === "undefined" ? "undefined" : _typeof(t))) throw new TypeError("load.metadata.sourceMap must be set to an object.");t = JSON.stringify(t);
    }return (n ? "(function(System, SystemJS) {" : "") + e + (n ? "\n})(System, System);" : "") + ("\n//# sourceURL=" != e.substr(o, 15) ? "\n//# sourceURL=" + r + (t ? "!transpiled" : "") : "") + (t && Se(t) || "");
  }function Ee(e, t, r, n, o) {
    Kt || (Kt = document.head || document.body || document.documentElement);var i = document.createElement("script");i.text = Oe(t, r, n, !1);var a,
        s = window.onerror;return window.onerror = function (e) {
      a = addToError(e, "Evaluating " + n), s && s.apply(this, arguments);
    }, je(e), o && i.setAttribute("nonce", o), Kt.appendChild(i), Kt.removeChild(i), Re(), window.onerror = s, a ? a : void 0;
  }function je(e) {
    0 == zt++ && (qt = nt.System), nt.System = nt.SystemJS = e;
  }function Re() {
    0 == --zt && (nt.System = nt.SystemJS = qt);
  }function Pe(e, t, r, n, o, i, a) {
    if (t) {
      if (i && Nt) return Ee(e, t, r, n, i);try {
        je(e), !Dt && e._nodeRequire && (Dt = e._nodeRequire("vm"), Ut = Dt.runInThisContext("typeof System !== 'undefined' && System") === e), Ut ? Dt.runInThisContext(Oe(t, r, n, !a), { filename: n + (r ? "!transpiled" : "") }) : (0, eval)(Oe(t, r, n, !a)), Re();
      } catch (e) {
        return Re(), e;
      }
    }
  }function Ce(e) {
    return "file:///" === e.substr(0, 8) ? e.substr(7 + !!rt) : Jt && e.substr(0, Jt.length) === Jt ? e.substr(Jt.length) : e;
  }function _e(e, t) {
    return Ce(this.normalizeSync(e, t));
  }function Me(e) {
    var t,
        r = e.lastIndexOf("!");t = -1 !== r ? e.substr(0, r) : e;var n = t.split("/");return n.pop(), n = n.join("/"), { filename: Ce(t), dirname: Ce(n) };
  }function Le(e) {
    function t(e, t) {
      for (var r = 0; r < e.length; r++) {
        if (e[r][0] < t.index && e[r][1] > t.index) return !0;
      }return !1;
    }Pt.lastIndex = Zt.lastIndex = Xt.lastIndex = 0;var r,
        n = [],
        o = [],
        i = [];if (e.length / e.split("\n").length < 200) {
      for (; r = Xt.exec(e);) {
        o.push([r.index, r.index + r[0].length]);
      }for (; r = Zt.exec(e);) {
        t(o, r) || i.push([r.index + r[1].length, r.index + r[0].length - 1]);
      }
    }for (; r = Pt.exec(e);) {
      if (!t(o, r) && !t(i, r)) {
        var a = r[1].substr(1, r[1].length - 2);if (a.match(/"|'/)) continue;n.push(a);
      }
    }return n;
  }function Ae(e) {
    if (-1 === Yt.indexOf(e)) {
      try {
        var t = nt[e];
      } catch (t) {
        Yt.push(e);
      }this(e, t);
    }
  }function Ie(e) {
    if ("string" == typeof e) return D(e, nt);if (!(e instanceof Array)) throw new Error("Global exports must be a string or array.");for (var t = {}, r = 0; r < e.length; r++) {
      t[e[r].split(".").pop()] = D(e[r], nt);
    }return t;
  }function Fe(e, t, r, n) {
    var o = nt.define;nt.define = void 0;var i;if (r) {
      i = {};for (var a in r) {
        i[a] = nt[a], nt[a] = r[a];
      }
    }return t || (Bt = {}, Object.keys(nt).forEach(Ae, function (e, t) {
      Bt[e] = t;
    })), function () {
      var e,
          r = t ? Ie(t) : {},
          a = !!t;if ((!t || n) && Object.keys(nt).forEach(Ae, function (o, i) {
        Bt[o] !== i && void 0 !== i && (n && (nt[o] = void 0), t || (r[o] = i, void 0 !== e ? a || e === i || (a = !0) : e = i));
      }), r = a ? r : e, i) for (var s in i) {
        nt[s] = i[s];
      }return nt.define = o, r;
    };
  }function Ke(e, t) {
    e = e.replace(Zt, "");var r = e.match(er),
        n = (r[1].split(",")[t] || "require").replace(tr, ""),
        o = rr[n] || (rr[n] = new RegExp(Qt + n + Vt, "g"));o.lastIndex = 0;for (var i, a = []; i = o.exec(e);) {
      a.push(i[2] || i[3]);
    }return a;
  }function De(e) {
    Gt = e, Wt = void 0, nr = !1;
  }function Ue(e) {
    Wt ? e.registerDynamic(Gt ? Wt[0].concat(Gt) : Wt[0], !1, Wt[1]) : nr && e.registerDynamic([], !1, R);
  }function qe(e, t) {
    var r = this,
        n = this[bt],
        o = this[wt][e];return (ze(n, this, e) || vt).then(function () {
      if (!t()) {
        if ("@node/" === e.substr(0, 6)) {
          if (!r._nodeRequire) throw new TypeError("Error loading " + e + ". Can only load node core modules in Node.");return r.registerDynamic([], !1, function () {
            return _.call(r, e.substr(6), r.baseURL);
          }), void t();
        }return o.load.scriptLoad ? (o.load.pluginKey || !or) && (o.load.scriptLoad = !1, C.call(n, 'scriptLoad not supported for "' + e + '"')) : o.load.scriptLoad !== !1 && or && (o.load.deps || o.load.globals || !("system" === o.load.format || "register" === o.load.format || "global" === o.load.format && o.load.exports) || (o.load.scriptLoad = !0)), o.load.scriptLoad ? new Promise(function (n, i) {
          if ("amd" === o.load.format && nt.define !== r.amdDefine) throw new Error("Loading AMD with scriptLoad requires setting the global `" + ar + ".define = SystemJS.amdDefine`");K(e, o.load.crossOrigin, o.load.integrity, function () {
            if (!t()) {
              o.load.format = "global";var e = Ie(o.load.exports);r.registerDynamic([], !1, function () {
                return e;
              }), t();
            }n();
          }, i);
        }) : Te(r, e, o).then(function () {
          return Ne(r, e, o, t, n.wasm);
        });
      }
    }).then(function (t) {
      return r[wt][e] = void 0, t;
    });
  }function Te(e, t, r) {
    return r.pluginKey ? e.import(r.pluginKey).then(function (e) {
      r.pluginModule = e, r.pluginLoad = { name: t, address: r.pluginArgument, source: void 0, metadata: r.load }, r.load.deps = r.load.deps || [];
    }) : vt;
  }function ze(e, t, r) {
    var n = e.depCache[r];if (n) for (var o = 0; o < n.length; o++) {
      t.normalize(n[o], r).then(I);
    } else {
      var i = !1;for (var a in e.bundles) {
        for (var o = 0; o < e.bundles[a].length; o++) {
          var s = e.bundles[a][o];if (s == r) {
            i = !0;break;
          }if (-1 != s.indexOf("*")) {
            var u = s.split("*");if (2 != u.length) {
              e.bundles[a].splice(o--, 1);continue;
            }if (r.substring(0, u[0].length) == u[0] && r.substr(r.length - u[1].length, u[1].length) == u[1]) {
              i = !0;break;
            }
          }
        }if (i) return t.import(a);
      }
    }
  }function Ne(e, t, r, n, o) {
    return r.load.exports && !r.load.format && (r.load.format = "global"), vt.then(function () {
      return r.pluginModule && r.pluginModule.locate ? r.pluginModule.locate.call(e, r.pluginLoad).then(function (e) {
        e && (r.pluginLoad.address = e);
      }) : void 0;
    }).then(function () {
      return r.pluginModule ? r.pluginModule.fetch ? (o = !1, r.pluginModule.fetch.call(e, r.pluginLoad, function (e) {
        return _t(e.address, r.load.authorization, r.load.integrity, !1);
      })) : _t(r.pluginArgument, r.load.authorization, r.load.integrity, o) : _t(t, r.load.authorization, r.load.integrity, o);
    }).then(function (i) {
      if (!o || "string" == typeof i) return Je(e, t, i, r, n);var a = new Uint8Array(i);if (0 === a[0] && 97 === a[1] && 115 === a[2]) return WebAssembly.compile(a).then(function (t) {
        var r = new WebAssembly.Instance(t, {});return e.newModule(r.exports);
      });var s = new TextDecoder("utf-8").decode(a);return Je(e, t, s, r, n);
    });
  }function Je(e, t, r, n, o) {
    return Promise.resolve(r).then(function (t) {
      return "detect" === n.load.format && (n.load.format = void 0), Ze(t, n), n.pluginModule && n.pluginModule.translate ? (n.pluginLoad.source = t, Promise.resolve(n.pluginModule.translate.call(e, n.pluginLoad, n.traceOpts)).then(function (e) {
        if (n.load.sourceMap) {
          if ("object" != _typeof(n.load.sourceMap)) throw new Error("metadata.load.sourceMap must be set to an object.");We(n.pluginLoad.address, n.load.sourceMap);
        }return "string" == typeof e ? e : n.pluginLoad.source;
      })) : t;
    }).then(function (r) {
      return "register" === n.load.format || !n.load.format && $e(r) ? (n.load.format = "register", r) : "esm" === n.load.format || !n.load.format && r.match(sr) ? (n.load.format = "esm", Ge(e, r, t, n, o)) : r;
    }).then(function (t) {
      if ("string" != typeof t || !n.pluginModule || !n.pluginModule.instantiate) return t;var r = !1;return n.pluginLoad.source = t, Promise.resolve(n.pluginModule.instantiate.call(e, n.pluginLoad, function (e) {
        if (t = e.source, n.load = e.metadata, r) throw new Error("Instantiate must only be called once.");r = !0;
      })).then(function (e) {
        return r ? t : P(e);
      });
    }).then(function (r) {
      if ("string" != typeof r) return r;n.load.format || (n.load.format = Be(r));var i = !1;switch (n.load.format) {case "esm":case "register":case "system":
          var a = Pe(e, r, n.load.sourceMap, t, n.load.integrity, n.load.nonce, !1);if (a) throw a;if (!o()) return yt;return;case "json":
          return e.newModule({ default: JSON.parse(r), __useDefault: !0 });case "amd":
          var s = nt.define;nt.define = e.amdDefine, De(n.load.deps);var a = Pe(e, r, n.load.sourceMap, t, n.load.integrity, n.load.nonce, !1);if (i = o(), i || (Ue(e), i = o()), nt.define = s, a) throw a;break;case "cjs":
          var u = n.load.deps,
              l = (n.load.deps || []).concat(n.load.cjsRequireDetection ? Le(r) : []);for (var c in n.load.globals) {
            n.load.globals[c] && l.push(n.load.globals[c]);
          }e.registerDynamic(l, !0, function (o, i, a) {
            if (o.resolve = function (t) {
              return _e.call(e, t, a.id);
            }, a.paths = [], a.require = o, !n.load.cjsDeferDepsExecute && u) for (var s = 0; s < u.length; s++) {
              o(u[s]);
            }var l = Me(a.id),
                c = { exports: i, args: [o, i, a, l.filename, l.dirname, nt, nt] },
                f = "(function (require, exports, module, __filename, __dirname, global, GLOBAL";if (n.load.globals) for (var d in n.load.globals) {
              c.args.push(o(n.load.globals[d])), f += ", " + d;
            }var p = nt.define;nt.define = void 0, nt.__cjsWrapper = c, r = f + ") {" + r.replace(fr, "") + "\n}).apply(__cjsWrapper.exports, __cjsWrapper.args);";var g = Pe(e, r, n.load.sourceMap, t, n.load.integrity, n.load.nonce, !1);if (g) throw g;nt.__cjsWrapper = void 0, nt.define = p;
          }), i = o();break;case "global":
          var l = n.load.deps || [];for (var c in n.load.globals) {
            var f = n.load.globals[c];f && l.push(f);
          }e.registerDynamic(l, !1, function (o, i, a) {
            var s;if (n.load.globals) {
              s = {};for (var u in n.load.globals) {
                n.load.globals[u] && (s[u] = o(n.load.globals[u]));
              }
            }var l = n.load.exports;l && (r += "\n" + ar + '["' + l + '"] = ' + l + ";");var c = Fe(a.id, l, s, n.load.encapsulateGlobal),
                f = Pe(e, r, n.load.sourceMap, t, n.load.integrity, n.load.nonce, !0);if (f) throw f;return c();
          }), i = o();break;default:
          throw new TypeError('Unknown module format "' + n.load.format + '" for "' + t + '".' + ("es6" === n.load.format ? ' Use "esm" instead here.' : ""));}if (!i) throw new Error("Module " + t + " detected as " + n.load.format + " but didn't execute correctly.");
    });
  }function $e(e) {
    var t = e.match(ur);return t && "System.register" === e.substr(t[0].length, 15);
  }function Be(e) {
    return e.match(lr) ? "amd" : (cr.lastIndex = 0, Pt.lastIndex = 0, Pt.exec(e) || cr.exec(e) ? "cjs" : "global");
  }function We(e, t) {
    var r = e.split("!")[0];t.file && t.file != e || (t.file = r + "!transpiled"), (!t.sources || t.sources.length <= 1 && (!t.sources[0] || t.sources[0] === e)) && (t.sources = [r]);
  }function Ge(e, r, n, o, i) {
    if (!e.transpiler) throw new TypeError("Unable to dynamically transpile ES module\n   A loader plugin needs to be configured via `SystemJS.config({ transpiler: 'transpiler-module' })`.");if (o.load.deps) {
      for (var a = "", s = 0; s < o.load.deps.length; s++) {
        a += 'import "' + o.load.deps[s] + '"; ';
      }r = a + r;
    }return e.import.call(e, e.transpiler).then(function (t) {
      if (t.__useDefault && (t = t.default), !t.translate) throw new Error(e.transpier + " is not a valid transpiler plugin.");return t === o.pluginModule ? load.source : ("string" == typeof o.load.sourceMap && (o.load.sourceMap = JSON.parse(o.load.sourceMap)), o.pluginLoad = o.pluginLoad || { name: n, address: n, source: r, metadata: o.load }, o.load.deps = o.load.deps || [], Promise.resolve(t.translate.call(e, o.pluginLoad, o.traceOpts)).then(function (e) {
        var t = o.load.sourceMap;return t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && We(n, t), "esm" === o.load.format && $e(e) && (o.load.format = "register"), e;
      }));
    }, function (e) {
      throw t(e, "Unable to load transpiler to transpile " + n);
    });
  }function He(e, t, r) {
    for (var n, o = t.split("."); o.length > 1;) {
      n = o.shift(), e = e[n] = e[n] || {};
    }n = o.shift(), void 0 === e[n] && (e[n] = r);
  }function Ze(e, t) {
    var r = e.match(dr);if (r) for (var n = r[0].match(pr), o = 0; o < n.length; o++) {
      var i = n[o],
          a = i.length,
          s = i.substr(0, 1);if (";" == i.substr(a - 1, 1) && a--, '"' == s || "'" == s) {
        var u = i.substr(1, i.length - 3),
            l = u.substr(0, u.indexOf(" "));if (l) {
          var c = u.substr(l.length + 1, u.length - l.length - 1);"deps" === l && (l = "deps[]"), "[]" === l.substr(l.length - 2, 2) ? (l = l.substr(0, l.length - 2), t.load[l] = t.load[l] || [], t.load[l].push(c)) : "use" !== l && He(t.load, l, c);
        } else t.load[u] = !0;
      }
    }
  }function Xe() {
    f.call(this), this._loader = {}, this[wt] = {}, this[bt] = { baseURL: Ve, paths: {}, packageConfigPaths: [], packageConfigKeys: [], map: {}, packages: {}, depCache: {}, meta: {}, bundles: {}, production: !1, transpiler: void 0, loadedBundles: {}, warnings: !1, pluginFirst: !1, wasm: !1 }, this.scriptSrc = ir, this._nodeRequire = Ht, this.registry.set("@empty", yt), Ye.call(this, !1, !1), $t(this);
  }function Ye(e, t) {
    this[bt].production = e, this.registry.set("@system-env", mr = this.newModule({ browser: et, node: !!this._nodeRequire, production: !t && e, dev: t || !e, build: t, default: !0 }));
  }function Qe(e, t) {
    C.call(e[bt], "SystemJS." + t + " is deprecated for SystemJS.registry." + t);
  }var Ve,
      et = "undefined" != typeof window && "undefined" != typeof document,
      tt = "undefined" != typeof process && process.versions && process.versions.node,
      rt = "undefined" != typeof process && "string" == typeof process.platform && process.platform.match(/^win/),
      nt = "undefined" != typeof self ? self : global,
      ot = "undefined" != typeof Symbol;if ("undefined" != typeof document && document.getElementsByTagName) {
    if (Ve = document.baseURI, !Ve) {
      var it = document.getElementsByTagName("base");Ve = it[0] && it[0].href || window.location.href;
    }
  } else "undefined" != typeof location && (Ve = location.href);if (Ve) Ve = Ve.split("#")[0].split("?")[0], Ve = Ve.substr(0, Ve.lastIndexOf("/") + 1);else {
    if ("undefined" == typeof process || !process.cwd) throw new TypeError("No environment baseURI");Ve = "file://" + (rt ? "/" : "") + process.cwd(), rt && (Ve = Ve.replace(/\\/g, "/"));
  }"/" !== Ve[Ve.length - 1] && (Ve += "/");var at = "_" == new Error(0, "_").fileName,
      st = Promise.resolve();i.prototype.constructor = i, i.prototype.import = function (e, r) {
    if ("string" != typeof e) throw new TypeError("Loader import method must be passed a module key string");var n = this;return st.then(function () {
      return n[lt](e, r);
    }).then(a).catch(function (n) {
      throw t(n, "Loading " + e + (r ? " from " + r : ""));
    });
  };var ut = i.resolve = e("resolve"),
      lt = i.resolveInstantiate = e("resolveInstantiate");i.prototype[lt] = function (e, t) {
    var r = this;return r.resolve(e, t).then(function (e) {
      return r.registry.get(e);
    });
  }, i.prototype.resolve = function (e, r) {
    var n = this;return st.then(function () {
      return n[ut](e, r);
    }).then(s).catch(function (n) {
      throw t(n, "Resolving " + e + (r ? " to " + r : ""));
    });
  };var ct = "undefined" != typeof Symbol && Symbol.iterator,
      ft = e("registry");ct && (u.prototype[Symbol.iterator] = function () {
    return this.entries()[Symbol.iterator]();
  }, u.prototype.entries = function () {
    var e = this[ft];return o(Object.keys(e).map(function (t) {
      return [t, e[t]];
    }));
  }), u.prototype.keys = function () {
    return o(Object.keys(this[ft]));
  }, u.prototype.values = function () {
    var e = this[ft];return o(Object.keys(e).map(function (t) {
      return e[t];
    }));
  }, u.prototype.get = function (e) {
    return this[ft][e];
  }, u.prototype.set = function (e, t) {
    if (!(t instanceof l)) throw new Error("Registry must be set with an instance of Module Namespace");return this[ft][e] = t, this;
  }, u.prototype.has = function (e) {
    return Object.hasOwnProperty.call(this[ft], e);
  }, u.prototype.delete = function (e) {
    return Object.hasOwnProperty.call(this[ft], e) ? (delete this[ft][e], !0) : !1;
  };var dt = e("baseObject");l.prototype = Object.create(null), "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(l.prototype, Symbol.toStringTag, { value: "Module" });var pt = e("register-internal");f.prototype = Object.create(i.prototype), f.prototype.constructor = f;var gt = f.instantiate = e("instantiate");f.prototype[f.resolve = i.resolve] = function (e, t) {
    return n(e, t || Ve);
  }, f.prototype[gt] = function (e, t) {}, f.prototype[i.resolveInstantiate] = function (e, t) {
    var r = this,
        n = this[pt],
        o = r.registry[r.registry._registry];return p(r, e, t, o, n).then(function (e) {
      return e instanceof l ? e : e.module ? e.module : e.linkRecord.linked ? x(r, e, e.linkRecord, o, n, void 0) : b(r, e, e.linkRecord, o, n, [e]).then(function () {
        return x(r, e, e.linkRecord, o, n, void 0);
      }).catch(function (t) {
        throw w(r, e), t;
      });
    });
  }, f.prototype.register = function (e, t, r) {
    var n = this[pt];if (void 0 === r) n.lastRegister = [e, t, void 0];else {
      var o = n.records[e] || d(n, e, void 0);o.registration = [t, r, void 0];
    }
  }, f.prototype.registerDynamic = function (e, t, r, n) {
    var o = this[pt];if ("string" != typeof e) o.lastRegister = [e, t, r];else {
      var i = o.records[e] || d(o, e, void 0);i.registration = [t, r, n];
    }
  }, k.prototype.constructor = function () {
    throw new TypeError("Cannot subclass the contextual loader only Reflect.Loader.");
  }, k.prototype.import = function (e) {
    return this.loader.import(e, this.key);
  }, k.prototype.resolve = function (e) {
    return this.loader.resolve(e, this.key);
  }, k.prototype.load = function (e) {
    return this.loader.load(e, this.key);
  };var ht = {};Object.freeze && Object.freeze(ht);var mt,
      vt = Promise.resolve(),
      yt = new l({}),
      bt = e("loader-config"),
      wt = e("metadata"),
      kt = "undefined" == typeof window && "undefined" != typeof self && "undefined" != typeof importScripts,
      xt = !1,
      St = !1;if (et && function () {
    var e = document.createElement("link").relList;if (e && e.supports) {
      St = !0;try {
        xt = e.supports("preload");
      } catch (e) {}
    }
  }(), et) {
    var Ot = [],
        Et = window.onerror;window.onerror = function (e, t) {
      for (var r = 0; r < Ot.length; r++) {
        if (Ot[r].src === t) return void Ot[r].err(e);
      }Et.apply(this, arguments);
    };
  }var jt,
      Rt,
      Pt = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF."'])require\s*\(\s*("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')\s*\)/g,
      Ct = "undefined" != typeof XMLHttpRequest;Rt = "undefined" != typeof self && "undefined" != typeof self.fetch ? z : Ct ? N : "undefined" != typeof require && "undefined" != typeof process ? J : $;var _t = Rt,
      Mt = {},
      Lt = ["browser", "node", "dev", "build", "production", "default"],
      At = /#\{[^\}]+\}/,
      It = ["browserConfig", "nodeConfig", "devConfig", "buildConfig", "productionConfig"],
      Ft = "undefined" != typeof Buffer;try {
    Ft && "YQ==" !== new Buffer("a").toString("base64") && (Ft = !1);
  } catch (e) {
    Ft = !1;
  }var Kt,
      Dt,
      Ut,
      qt,
      Tt = "\n\/\/# sourceMappingURL=data:application/json;base64,",
      zt = 0,
      Nt = !1;et && "undefined" != typeof document && document.getElementsByTagName && (window.chrome && window.chrome.extension || navigator.userAgent.match(/^Node\.js/) || (Nt = !0));var Jt,
      $t = function $t(e) {
    function t(r, n, o, i) {
      if ("object" == (typeof r === "undefined" ? "undefined" : _typeof(r)) && !(r instanceof Array)) return t.apply(null, Array.prototype.splice.call(arguments, 1, arguments.length - 1));if ("string" == typeof r && "function" == typeof n && (r = [r]), !(r instanceof Array)) {
        if ("string" == typeof r) {
          var a = e.decanonicalize(r, i),
              s = e.get(a);if (!s) throw new Error('Module not already loaded loading "' + r + '" as ' + a + (i ? ' from "' + i + '".' : "."));return s.__useDefault ? s.default : s;
        }throw new TypeError("Invalid require");
      }for (var u = [], l = 0; l < r.length; l++) {
        u.push(e.import(r[l], i));
      }Promise.all(u).then(function (e) {
        for (var t = 0; t < e.length; t++) {
          e[t] = e[t].__useDefault ? e[t].default : e[t];
        }n && n.apply(null, e);
      }, o);
    }function r(r, n, o) {
      function i(r, i, l) {
        for (var c = [], f = 0; f < n.length; f++) {
          c.push(r(n[f]));
        }if (l.uri = l.id, l.config = R, -1 !== u && c.splice(u, 0, l), -1 !== s && c.splice(s, 0, i), -1 !== a) {
          var d = function d(n, o, i) {
            return "string" == typeof n && "function" != typeof o ? r(n) : t.call(e, n, o, i, l.id);
          };d.toUrl = function (t) {
            return e.normalizeSync(t, l.id);
          }, c.splice(a, 0, d);
        }var p = nt.require;nt.require = t;var g = o.apply(-1 === s ? nt : i, c);nt.require = p, "undefined" != typeof g && (l.exports = g);
      }"string" != typeof r && (o = n, n = r, r = null, Gt && (n = n.concat(Gt), Gt = void 0)), n instanceof Array || (o = n, n = ["require", "exports", "module"].splice(0, o.length)), "function" != typeof o && (o = function (e) {
        return function () {
          return e;
        };
      }(o));var a, s, u;-1 !== (a = n.indexOf("require")) && (n.splice(a, 1), r || (n = n.concat(Ke(o.toString(), a)))), -1 !== (s = n.indexOf("exports")) && n.splice(s, 1), -1 !== (u = n.indexOf("module")) && n.splice(u, 1), r ? (e.registerDynamic(r, n, !1, i), Wt ? (Wt = void 0, nr = !0) : nr || (Wt = [n, i])) : e.registerDynamic(n, !1, i);
    }e.set("@@cjs-helpers", e.newModule({ requireResolve: _e.bind(e), getPathVars: Me })), e.set("@@global-helpers", e.newModule({ prepareGlobal: Fe })), r.amd = {}, e.amdDefine = r, e.amdRequire = t;
  };"undefined" != typeof window && "undefined" != typeof document && window.location && (Jt = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : ""));var Bt,
      Wt,
      Gt,
      Ht,
      Zt = /(^|[^\\])(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
      Xt = /("[^"\\\n\r]*(\\.[^"\\\n\r]*)*"|'[^'\\\n\r]*(\\.[^'\\\n\r]*)*')/g,
      Yt = ["_g", "sessionStorage", "localStorage", "clipboardData", "frames", "frameElement", "external", "mozAnimationStartTime", "webkitStorageInfo", "webkitIndexedDB", "mozInnerScreenY", "mozInnerScreenX"],
      Qt = "(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",
      Vt = "\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",
      er = /\(([^\)]*)\)/,
      tr = /^\s+|\s+$/g,
      rr = {},
      nr = !1,
      or = (et || kt) && "undefined" != typeof navigator && navigator.userAgent && !navigator.userAgent.match(/MSIE (9|10).0/);"undefined" == typeof require || "undefined" == typeof process || process.browser || (Ht = require);var ir,
      ar = "undefined" != typeof self ? "self" : "global",
      sr = /(^\s*|[}\);\n]\s*)(import\s*(['"]|(\*\s+as\s+)?[^"'\(\)\n;]+\s*from\s*['"]|\{)|export\s+\*\s+from\s+["']|export\s*(\{|default|function|class|var|const|let|async\s+function))/,
      ur = /^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)*\s*/,
      lr = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])define\s*\(\s*("[^"]+"\s*,\s*|'[^']+'\s*,\s*)?\s*(\[(\s*(("[^"]+"|'[^']+')\s*,|\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*(\s*("[^"]+"|'[^']+')\s*,?)?(\s*(\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*\s*\]|function\s*|{|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*\))/,
      cr = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])(exports\s*(\[['"]|\.)|module(\.exports|\['exports'\]|\["exports"\])\s*(\[['"]|[=,\.]))/,
      fr = /^\#\!.*/,
      dr = /^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)+/,
      pr = /\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\/\/[^\n]*|"[^"]+"\s*;?|'[^']+'\s*;?/g;if ("undefined" == typeof Promise) throw new Error("SystemJS needs a Promise polyfill.");if ("undefined" != typeof document) {
    var gr = document.getElementsByTagName("script"),
        hr = gr[gr.length - 1];document.currentScript && (hr.defer || hr.async) && (hr = document.currentScript), ir = hr && hr.src;
  } else if ("undefined" != typeof importScripts) try {
    throw new Error("_");
  } catch (e) {
    e.stack.replace(/(?:at|@).*(http.+):[\d]+:[\d]+/, function (e, t) {
      ir = t;
    });
  } else "undefined" != typeof __filename && (ir = __filename);var mr;Xe.prototype = Object.create(f.prototype), Xe.prototype.constructor = Xe, Xe.prototype[Xe.resolve = f.resolve] = Xe.prototype.normalize = G, Xe.prototype.load = function (e, t) {
    return C.call(this[bt], "System.load is deprecated."), this.import(e, t);
  }, Xe.prototype.decanonicalize = Xe.prototype.normalizeSync = Xe.prototype.resolveSync = Z, Xe.prototype[Xe.instantiate = f.instantiate] = qe, Xe.prototype.config = we, Xe.prototype.getConfig = be, Xe.prototype.global = nt, Xe.prototype.import = function () {
    return f.prototype.import.apply(this, arguments).then(function (e) {
      return e.__useDefault ? e.default : e;
    });
  };for (var vr = ["baseURL", "map", "paths", "packages", "packageConfigPaths", "depCache", "meta", "bundles", "transpiler", "warnings", "pluginFirst", "production", "wasm"], yr = "undefined" != typeof Proxy, br = 0; br < vr.length; br++) {
    (function (e) {
      Object.defineProperty(Xe.prototype, e, { get: function get() {
          var t = ye(this[bt], e);return yr && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && (t = new Proxy(t, { set: function set(t, r) {
              throw new Error("Cannot set SystemJS." + e + '["' + r + '"] directly. Use SystemJS.config({ ' + e + ': { "' + r + '": ... } }) rather.');
            } })), t;
        }, set: function set(t) {
          throw new Error("Setting `SystemJS." + e + "` directly is no longer supported. Use `SystemJS.config({ " + e + ": ... })`.");
        } });
    })(vr[br]);
  }Xe.prototype.delete = function (e) {
    Qe(this, "delete"), this.registry.delete(e);
  }, Xe.prototype.get = function (e) {
    return Qe(this, "get"), this.registry.get(e);
  }, Xe.prototype.has = function (e) {
    return Qe(this, "has"), this.registry.has(e);
  }, Xe.prototype.set = function (e, t) {
    return Qe(this, "set"), this.registry.set(e, t);
  }, Xe.prototype.newModule = function (e) {
    return new l(e);
  }, Xe.prototype.register = function (e, t, r) {
    return "string" == typeof e && (e = H.call(this, this[bt], e)), f.prototype.register.call(this, e, t, r);
  }, Xe.prototype.registerDynamic = function (e, t, r, n) {
    return "string" == typeof e && (e = H.call(this, this[bt], e)), f.prototype.registerDynamic.call(this, e, t, r, n);
  }, Xe.prototype.version = "0.20.0-rc.8 Dev";var wr = new Xe();if (et || kt) if (nt.SystemJS = wr, nt.System) {
    var kr = nt.System.register;nt.System.register = function () {
      kr && kr.apply(this, arguments), wr.register.apply(this, arguments);
    };
  } else nt.System = wr;"undefined" != typeof module && module.exports && (module.exports = wr);
}();
//# sourceMappingURL=system.js.map
//# sourceMappingURL=system.js.map
