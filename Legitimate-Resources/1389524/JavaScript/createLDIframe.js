!(function (t, n) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = n())
    : 'function' == typeof define && define.amd
    ? define([], n)
    : 'object' == typeof exports
    ? (exports.launchDarklyIframe = n())
    : (t.launchDarklyIframe = n())
})(window, function () {
  return (function (t) {
    var n = {}
    function e(r) {
      if (n[r]) return n[r].exports
      var o = (n[r] = { i: r, l: !1, exports: {} })
      return t[r].call(o.exports, o, o.exports, e), (o.l = !0), o.exports
    }
    return (
      (e.m = t),
      (e.c = n),
      (e.d = function (t, n, r) {
        e.o(t, n) || Object.defineProperty(t, n, { enumerable: !0, get: r })
      }),
      (e.r = function (t) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 })
      }),
      (e.t = function (t, n) {
        if ((1 & n && (t = e(t)), 8 & n)) return t
        if (4 & n && 'object' == typeof t && t && t.__esModule) return t
        var r = Object.create(null)
        if (
          (e.r(r),
          Object.defineProperty(r, 'default', { enumerable: !0, value: t }),
          2 & n && 'string' != typeof t)
        )
          for (var o in t)
            e.d(
              r,
              o,
              function (n) {
                return t[n]
              }.bind(null, o),
            )
        return r
      }),
      (e.n = function (t) {
        var n =
          t && t.__esModule
            ? function () {
                return t.default
              }
            : function () {
                return t
              }
        return e.d(n, 'a', n), n
      }),
      (e.o = function (t, n) {
        return Object.prototype.hasOwnProperty.call(t, n)
      }),
      (e.p = ''),
      e((e.s = 16))
    )
  })([
    function (t, n, e) {
      'use strict'
      var r
      e.d(n, 'a', function () {
        return r
      }),
        (function (t) {
          ;(t[(t.error = 0)] = 'error'),
            (t[(t.warn = 1)] = 'warn'),
            (t[(t.info = 2)] = 'info'),
            (t[(t.debug = 3)] = 'debug'),
            (t[(t.trace = 4)] = 'trace')
        })(r || (r = {}))
    },
    function (t, n, e) {
      'use strict'
      var r = function () {
          for (var t = 0, n = 0, e = arguments.length; n < e; n++)
            t += arguments[n].length
          var r = Array(t),
            o = 0
          for (n = 0; n < e; n++)
            for (var i = arguments[n], u = 0, a = i.length; u < a; u++, o++)
              r[o] = i[u]
          return r
        },
        o = function (t) {
          return Array.isArray(t)
        }
      function i(t, n) {
        return (
          void 0 === n && (n = !1),
          o(t) && !n
            ? t.map(function (t) {
                return i(t, !0)
              })
            : 'object' == typeof t
            ? JSON.stringify(t, null, 2)
            : t
        )
      }
      var u = function (t) {
          var n = t.level,
            e = t.nameSpace,
            r = t.label
          return r ? e + '-' + r + ': ' : e + '-' + n + ': '
        },
        a = function (t) {
          var n = t.message,
            e = t.color,
            a = i(n),
            s = '' + e + u(t)
          return o(a) ? r(['' + s + a[0]], a.slice(1), ['[0m']) : '' + s + a + '[0m'
        },
        s = function (t) {
          var n = t.message,
            e = t.color,
            a = t.meta,
            s = i(n),
            f = '%c' + u(t),
            c = o(s),
            l = (a && a.styles && ';' + a.styles) || ''
          return c
            ? r(['' + f + s[0], 'color: ' + e + l], s.slice(1))
            : ['' + f + s, 'color: ' + e + l]
        },
        f = e(5),
        c = function () {
          return (c =
            Object.assign ||
            function (t) {
              for (var n, e = 1, r = arguments.length; e < r; e++)
                for (var o in (n = arguments[e]))
                  Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o])
              return t
            }).apply(this, arguments)
        },
        l = function (t) {
          var n,
            e,
            r = (function (t) {
              var n = 'undefined' === t ? 'node' : 'web'
              return { environment: n, defaultFormatter: 'node' === n ? a : s }
            })(typeof window),
            o = r.environment,
            i = r.defaultFormatter,
            u = t.formatter,
            d = c({ environment: o, formatter: void 0 === u ? i : u }, t),
            h = Object(f.a)(d)
          return {
            log: h,
            error: function (n) {
              return h(
                c(c({}, n), {
                  level: 'error',
                  output: t.output || console.error,
                }),
              )
            },
            warn: function (n) {
              return h(
                c(c({}, n), {
                  level: 'warn',
                  output: t.output || console.warn,
                }),
              )
            },
            info: function (n) {
              return h(
                c(c({}, n), {
                  level: 'info',
                  output: t.output || console.info,
                }),
              )
            },
            debug: function (n) {
              return h(
                c(c({}, n), {
                  level: 'debug',
                  output: t.output || console.debug,
                }),
              )
            },
            trace: function (n) {
              return h(
                c(c({}, n), {
                  level: 'trace',
                  output: t.output || console.trace,
                }),
              )
            },
            child:
              ((n = l),
              (e = d),
              function (t) {
                return n(c(c({}, e), t))
              }),
          }
        },
        d = l
      n.a = d
    },
    function (t, n, e) {
      'use strict'
      var r = e(1)
      n.a = Object(r.a)({ silent: !1, nameSpace: 'launch-darkly-iframe' })
    },
    function (t, n, e) {
      ;(t.exports = e(7)), (t.exports.default = t.exports)
    },
    function (t, n, e) {
      'use strict'
      var r =
          (this && this.__read) ||
          function (t, n) {
            var e = 'function' == typeof Symbol && t[Symbol.iterator]
            if (!e) return t
            var r,
              o,
              i = e.call(t),
              u = []
            try {
              for (; (void 0 === n || n-- > 0) && !(r = i.next()).done; )
                u.push(r.value)
            } catch (t) {
              o = { error: t }
            } finally {
              try {
                r && !r.done && (e = i.return) && e.call(i)
              } finally {
                if (o) throw o.error
              }
            }
            return u
          },
        o =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t }
          }
      Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.getProdSides = n.ProdDirectURL = n.ProdSideKey = void 0)
      var i,
        u = o(e(13))
      !(function (t) {
        ;(t.C = 'd9a29f8298f222ecef48a9c5577605a1'),
          (t.D = '764492102925c8411e685ca637ba4fcd')
      })((i = n.ProdSideKey || (n.ProdSideKey = {}))),
        (function (t) {
          ;(t.C = 'secure-prodc.int.ally.com'),
            (t.D = 'secure-prodd.int.ally.com')
        })(n.ProdDirectURL || (n.ProdDirectURL = {}))
      var a = [
        ['dev', /.*-dev/],
        ['cap', /.*-cap/],
        ['fix', /.*-fix/],
        ['qa1', /.*-qa1/],
        ['qa2', /.*-qa2/],
        ['qa3', /.*-qa3/],
        ['psp', /.*-(psp(?:c|d)|prodsupt)/],
        ['local', /^(localhost|0\.0\.0\.0|127\.0\.0\.1)/],
        ['prod', /.*/],
      ]
      function s(t) {
        var n = u.default.get('pr_session')
        return n
          ? (function (t) {
              return { C: t.includes(i.C), D: t.includes(i.D) }
            })(n)
          : (function (t) {
              return {
                C: /-(prod|psp)c.int.ally.com$/.test(t),
                D: /-(prod|psp)d.int.ally.com$/.test(t),
              }
            })(t)
      }
      ;(n.getProdSides = s),
        (n.default = function (t, n) {
          void 0 === t && (t = window.location.href), void 0 === n && (n = a)
          var e,
            o,
            i = new URL(t).hostname,
            u = (n.find(function (t) {
              return r(t, 2)[1].test(i)
            }) || ['prod'])[0],
            f = 'dev' === u,
            c = 'local' === u,
            l = f || c,
            d =
              ((e = !!document.querySelector('script[src="/apparition.js"]')),
              (o = !!window.mirageEnabled),
              e && o),
            h = !!u.startsWith('qa') || 'fix' === u,
            p = !h && !f && !c,
            w = s(i)
          return {
            isDev: f,
            isDevLike: l,
            isEmulator: d,
            isLocal: c,
            isProd: p,
            isQA: h,
            name: u,
            pick: function (t) {
              if (d) {
                var n = p ? 'emulatorProd' : 'emulatorLLE'
                if (n in t) return t[n]
              }
              return u in t ? t[u] : t.prod
            },
            prod: w,
          }
        })
    },
    function (t, n, e) {
      'use strict'
      ;(function (t) {
        var r = e(6),
          o = e(0),
          i = function () {
            return (i =
              Object.assign ||
              function (t) {
                for (var n, e = 1, r = arguments.length; e < r; e++)
                  for (var o in (n = arguments[e]))
                    Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o])
                return t
              }).apply(this, arguments)
          },
          u = function (t, n) {
            var e = {}
            for (var r in t)
              Object.prototype.hasOwnProperty.call(t, r) &&
                n.indexOf(r) < 0 &&
                (e[r] = t[r])
            if (
              null != t &&
              'function' == typeof Object.getOwnPropertySymbols
            ) {
              var o = 0
              for (r = Object.getOwnPropertySymbols(t); o < r.length; o++)
                n.indexOf(r[o]) < 0 &&
                  Object.prototype.propertyIsEnumerable.call(t, r[o]) &&
                  (e[r[o]] = t[r[o]])
            }
            return e
          },
          a = t.env && t.env.WHISPER_LOG_SILENT,
          s = (t.env && t.env.WHISPER_LOG_NAMESPACES) || '',
          f = function () {},
          c = function (t) {
            return Object.prototype.hasOwnProperty.call(o.a, t)
          },
          l = function (t) {
            return void 0 === t && (t = ''), t && c(t) ? o.a[t] : o.a.info
          },
          d = 'TRUE' === a,
          h = s.split(',').filter(Boolean),
          p = function (t) {
            return t.level + '-' + t.message
          }
        n.a = function (n) {
          var e = (function (t, n) {
              return (
                void 0 === n && (n = typeof window),
                i(
                  'undefined' !== n
                    ? {
                        output: function () {
                          for (var t, n = [], e = 0; e < arguments.length; e++)
                            n[e] = arguments[e]
                          return (t = window.console).log.apply(t, n)
                        },
                      }
                    : { output: (console && console.log) || f },
                  t,
                )
              )
            })(n),
            a = e.output,
            s = e.level,
            w = e.environment,
            v = e.formatter,
            y = e.nameSpace,
            g = (function (t) {
              if (
                (void 0 === t && (t = typeof window),
                'undefined' !== t && window.localStorage)
              ) {
                var n = window.localStorage.getItem('WHISPER_LOG_LEVEL')
                return n && c(n) ? o.a[n] : null
              }
              return null
            })(),
            m = []
          return function (e) {
            if (!d && !n.silent) {
              var f = e.level,
                c = e.color,
                _ = e.message,
                b = e.once,
                E = e.output,
                S = void 0 === E ? a : E,
                A = u(e, ['level', 'color', 'message', 'once', 'output'])
              if (!b || !m.includes(p(e))) {
                var P = !(h.length > 0) || h.includes(y)
                if (
                  (function (n) {
                    var e = n.level,
                      r = n.desiredLevel,
                      i = n.localStorageLogLevel,
                      u = l(e),
                      a = r && o.a[r],
                      s = l(t.env.WHISPER_LOG_LEVEL)
                    return null !== i ? u <= i : u <= (a || s || 'info')
                  })({ level: f, desiredLevel: s, localStorageLogLevel: g }) &&
                  P
                ) {
                  var x = c || r.a[l(f)][w],
                    O = v(
                      i(i(i({ nameSpace: y, message: _, color: x }, n), A), {
                        level: f,
                      }),
                    )
                  if ((b && m.push(p(e)), Array.isArray(O)))
                    return void S.apply(void 0, O)
                  S(O)
                }
              }
            }
          }
        }
      }.call(this, e(14)))
    },
    function (t, n, e) {
      'use strict'
      var r,
        o = e(0),
        i =
          (((r = {})[o.a.error] = { web: '#ff0000', node: '[31m' }),
          (r[o.a.warn] = { web: '#d7af00', node: '[33m' }),
          (r[o.a.info] = { web: '#0000ff', node: '[34m' }),
          (r[o.a.debug] = { web: '#5faf5f', node: '[32m' }),
          (r[o.a.trace] = { web: '#FF00FF', node: '[35m' }),
          r)
      n.a = i
    },
    function (t, n, e) {
      ;(function (n) {
        'undefined' != typeof self && self,
          (t.exports = (function (t) {
            var n = {}
            function e(r) {
              if (n[r]) return n[r].exports
              var o = (n[r] = { i: r, l: !1, exports: {} })
              return (
                t[r].call(o.exports, o, o.exports, e), (o.l = !0), o.exports
              )
            }
            return (
              (e.m = t),
              (e.c = n),
              (e.d = function (t, n, r) {
                e.o(t, n) ||
                  Object.defineProperty(t, n, { enumerable: !0, get: r })
              }),
              (e.r = function (t) {
                'undefined' != typeof Symbol &&
                  Symbol.toStringTag &&
                  Object.defineProperty(t, Symbol.toStringTag, {
                    value: 'Module',
                  }),
                  Object.defineProperty(t, '__esModule', { value: !0 })
              }),
              (e.t = function (t, n) {
                if ((1 & n && (t = e(t)), 8 & n)) return t
                if (4 & n && 'object' == typeof t && t && t.__esModule) return t
                var r = Object.create(null)
                if (
                  (e.r(r),
                  Object.defineProperty(r, 'default', {
                    enumerable: !0,
                    value: t,
                  }),
                  2 & n && 'string' != typeof t)
                )
                  for (var o in t)
                    e.d(
                      r,
                      o,
                      function (n) {
                        return t[n]
                      }.bind(null, o),
                    )
                return r
              }),
              (e.n = function (t) {
                var n =
                  t && t.__esModule
                    ? function () {
                        return t.default
                      }
                    : function () {
                        return t
                      }
                return e.d(n, 'a', n), n
              }),
              (e.o = function (t, n) {
                return {}.hasOwnProperty.call(t, n)
              }),
              (e.p = ''),
              e((e.s = 0))
            )
          })([
            function (t, e, r) {
              'use strict'
              function o(t) {
                return '[object RegExp]' === {}.toString.call(t)
              }
              r.r(e),
                r.d(e, 'Promise', function () {
                  return W
                }),
                r.d(e, 'TYPES', function () {
                  return Vt
                }),
                r.d(e, 'ProxyWindow', function () {
                  return Et
                }),
                r.d(e, 'setup', function () {
                  return Jt
                }),
                r.d(e, 'destroy', function () {
                  return Ht
                }),
                r.d(e, 'serializeMessage', function () {
                  return zt
                }),
                r.d(e, 'deserializeMessage', function () {
                  return Yt
                }),
                r.d(e, 'createProxyWindow', function () {
                  return qt
                }),
                r.d(e, 'toProxyWindow', function () {
                  return Ft
                }),
                r.d(e, 'on', function () {
                  return Ut
                }),
                r.d(e, 'once', function () {
                  return Mt
                }),
                r.d(e, 'send', function () {
                  return Nt
                }),
                r.d(e, 'markWindowKnown', function () {
                  return lt
                }),
                r.d(e, 'cleanUpWindow', function () {
                  return Gt
                }),
                r.d(e, 'bridge', function () {})
              var i = 'Call was rejected by callee.\r\n'
              function u(t) {
                return (
                  void 0 === t && (t = window), 'about:' === t.location.protocol
                )
              }
              function a(t) {
                if ((void 0 === t && (t = window), t))
                  try {
                    if (t.parent && t.parent !== t) return t.parent
                  } catch (t) {}
              }
              function s(t) {
                if ((void 0 === t && (t = window), t && !a(t)))
                  try {
                    return t.opener
                  } catch (t) {}
              }
              function f(t) {
                try {
                  return !0
                } catch (t) {}
                return !1
              }
              function c(t) {
                void 0 === t && (t = window)
                var n = t.location
                if (!n) throw new Error('Can not read window location')
                var e = n.protocol
                if (!e) throw new Error('Can not read window protocol')
                if ('file:' === e) return 'file://'
                if ('about:' === e) {
                  var r = a(t)
                  return r && f() ? c(r) : 'about://'
                }
                var o = n.host
                if (!o) throw new Error('Can not read window host')
                return e + '//' + o
              }
              function l(t) {
                void 0 === t && (t = window)
                var n = c(t)
                return n && t.mockDomain && 0 === t.mockDomain.indexOf('mock:')
                  ? t.mockDomain
                  : n
              }
              function d(t) {
                if (
                  !(function (t) {
                    try {
                      if (t === window) return !0
                    } catch (t) {}
                    try {
                      var n = Object.getOwnPropertyDescriptor(t, 'location')
                      if (n && !1 === n.enumerable) return !1
                    } catch (t) {}
                    try {
                      if (u(t) && f()) return !0
                    } catch (t) {}
                    try {
                      if (c(t) === c(window)) return !0
                    } catch (t) {}
                    return !1
                  })(t)
                )
                  return !1
                try {
                  if (t === window) return !0
                  if (u(t) && f()) return !0
                  if (l(window) === l(t)) return !0
                } catch (t) {}
                return !1
              }
              function h(t) {
                if (!d(t)) throw new Error('Expected window to be same domain')
                return t
              }
              function p(t, n) {
                if (!t || !n) return !1
                var e = a(n)
                return e
                  ? e === t
                  : -1 !==
                      (function (t) {
                        var n = []
                        try {
                          for (; t.parent !== t; )
                            n.push(t.parent), (t = t.parent)
                        } catch (t) {}
                        return n
                      })(n).indexOf(t)
              }
              function w(t) {
                var n,
                  e,
                  r = []
                try {
                  n = t.frames
                } catch (e) {
                  n = t
                }
                try {
                  e = n.length
                } catch (t) {}
                if (0 === e) return r
                if (e) {
                  for (var o = 0; o < e; o++) {
                    var i = void 0
                    try {
                      i = n[o]
                    } catch (t) {
                      continue
                    }
                    r.push(i)
                  }
                  return r
                }
                for (var u = 0; u < 100; u++) {
                  var a = void 0
                  try {
                    a = n[u]
                  } catch (t) {
                    return r
                  }
                  if (!a) return r
                  r.push(a)
                }
                return r
              }
              var v = [],
                y = []
              function g(t, n) {
                void 0 === n && (n = !0)
                try {
                  if (t === window) return !1
                } catch (t) {
                  return !0
                }
                try {
                  if (!t) return !0
                } catch (t) {
                  return !0
                }
                try {
                  if (t.closed) return !0
                } catch (t) {
                  return !t || t.message !== i
                }
                if (n && d(t))
                  try {
                    if (t.mockclosed) return !0
                  } catch (t) {}
                try {
                  if (!t.parent || !t.top) return !0
                } catch (t) {}
                var e = (function (t, n) {
                  for (var e = 0; e < t.length; e++)
                    try {
                      if (t[e] === n) return e
                    } catch (t) {}
                  return -1
                })(v, t)
                if (-1 !== e) {
                  var r = y[e]
                  if (
                    r &&
                    (function (t) {
                      if (!t.contentWindow) return !0
                      if (!t.parentNode) return !0
                      var n = t.ownerDocument
                      if (
                        n &&
                        n.documentElement &&
                        !n.documentElement.contains(t)
                      ) {
                        for (var e = t; e.parentNode && e.parentNode !== e; )
                          e = e.parentNode
                        if (!e.host || !n.documentElement.contains(e.host))
                          return !0
                      }
                      return !1
                    })(r)
                  )
                    return !0
                }
                return !1
              }
              function m(t) {
                return (
                  void 0 === t && (t = window),
                  s((t = t || window)) || a(t) || void 0
                )
              }
              function _(t, n) {
                if ('string' == typeof t) {
                  if ('string' == typeof n) return '*' === t || n === t
                  if (o(n)) return !1
                  if (Array.isArray(n)) return !1
                }
                return o(t)
                  ? o(n)
                    ? t.toString() === n.toString()
                    : !Array.isArray(n) && Boolean(n.match(t))
                  : !!Array.isArray(t) &&
                      (Array.isArray(n)
                        ? JSON.stringify(t) === JSON.stringify(n)
                        : !o(n) &&
                          t.some(function (t) {
                            return _(t, n)
                          }))
              }
              function b(t) {
                try {
                  if (t === window) return !0
                } catch (t) {
                  if (t && t.message === i) return !0
                }
                try {
                  if ('[object Window]' === {}.toString.call(t)) return !0
                } catch (t) {
                  if (t && t.message === i) return !0
                }
                try {
                  if (window.Window && t instanceof window.Window) return !0
                } catch (t) {
                  if (t && t.message === i) return !0
                }
                try {
                  if (t && t.self === t) return !0
                } catch (t) {
                  if (t && t.message === i) return !0
                }
                try {
                  if (t && t.parent === t) return !0
                } catch (t) {
                  if (t && t.message === i) return !0
                }
                try {
                  if (t && t.top === t) return !0
                } catch (t) {
                  if (t && t.message === i) return !0
                }
                try {
                  if (
                    t &&
                    '__unlikely_value__' ===
                      t.__cross_domain_utils_window_check__
                  )
                    return !1
                } catch (t) {
                  return !0
                }
                try {
                  if ('postMessage' in t && 'self' in t && 'location' in t)
                    return !0
                } catch (t) {}
                return !1
              }
              function E(t) {
                try {
                  t.close()
                } catch (t) {}
              }
              function S(t) {
                try {
                  if (!t) return !1
                  if ('undefined' != typeof Promise && t instanceof Promise)
                    return !0
                  if (
                    'undefined' != typeof window &&
                    'function' == typeof window.Window &&
                    t instanceof window.Window
                  )
                    return !1
                  if (
                    'undefined' != typeof window &&
                    'function' == typeof window.constructor &&
                    t instanceof window.constructor
                  )
                    return !1
                  var n = {}.toString
                  if (n) {
                    var e = n.call(t)
                    if (
                      '[object Window]' === e ||
                      '[object global]' === e ||
                      '[object DOMWindow]' === e
                    )
                      return !1
                  }
                  if ('function' == typeof t.then) return !0
                } catch (t) {
                  return !1
                }
                return !1
              }
              var A,
                P = [],
                x = [],
                O = 0
              function R() {
                if (!O && A) {
                  var t = A
                  ;(A = null), t.resolve()
                }
              }
              function T() {
                O += 1
              }
              function k() {
                ;(O -= 1), R()
              }
              var W = (function () {
                function t(t) {
                  var n = this
                  if (
                    ((this.resolved = void 0),
                    (this.rejected = void 0),
                    (this.errorHandled = void 0),
                    (this.value = void 0),
                    (this.error = void 0),
                    (this.handlers = void 0),
                    (this.dispatching = void 0),
                    (this.stack = void 0),
                    (this.resolved = !1),
                    (this.rejected = !1),
                    (this.errorHandled = !1),
                    (this.handlers = []),
                    t)
                  ) {
                    var e,
                      r,
                      o = !1,
                      i = !1,
                      u = !1
                    T()
                    try {
                      t(
                        function (t) {
                          u ? n.resolve(t) : ((o = !0), (e = t))
                        },
                        function (t) {
                          u ? n.reject(t) : ((i = !0), (r = t))
                        },
                      )
                    } catch (t) {
                      return k(), void this.reject(t)
                    }
                    k(), (u = !0), o ? this.resolve(e) : i && this.reject(r)
                  }
                }
                var n = t.prototype
                return (
                  (n.resolve = function (t) {
                    if (this.resolved || this.rejected) return this
                    if (S(t))
                      throw new Error(
                        'Can not resolve promise with another promise',
                      )
                    return (
                      (this.resolved = !0),
                      (this.value = t),
                      this.dispatch(),
                      this
                    )
                  }),
                  (n.reject = function (t) {
                    var n = this
                    if (this.resolved || this.rejected) return this
                    if (S(t))
                      throw new Error(
                        'Can not reject promise with another promise',
                      )
                    if (!t) {
                      var e =
                        t && 'function' == typeof t.toString
                          ? t.toString()
                          : {}.toString.call(t)
                      t = new Error(
                        'Expected reject to be called with Error, got ' + e,
                      )
                    }
                    return (
                      (this.rejected = !0),
                      (this.error = t),
                      this.errorHandled ||
                        setTimeout(function () {
                          n.errorHandled ||
                            (function (t, n) {
                              if (-1 === P.indexOf(t)) {
                                P.push(t),
                                  setTimeout(function () {
                                    throw t
                                  }, 1)
                                for (var e = 0; e < x.length; e++) x[e](t, n)
                              }
                            })(t, n)
                        }, 1),
                      this.dispatch(),
                      this
                    )
                  }),
                  (n.asyncReject = function (t) {
                    return (this.errorHandled = !0), this.reject(t), this
                  }),
                  (n.dispatch = function () {
                    var n = this.resolved,
                      e = this.rejected,
                      r = this.handlers
                    if (!this.dispatching && (n || e)) {
                      ;(this.dispatching = !0), T()
                      for (
                        var o = function (t, n) {
                            return t.then(
                              function (t) {
                                n.resolve(t)
                              },
                              function (t) {
                                n.reject(t)
                              },
                            )
                          },
                          i = 0;
                        i < r.length;
                        i++
                      ) {
                        var u = r[i],
                          a = u.onSuccess,
                          s = u.onError,
                          f = u.promise,
                          c = void 0
                        if (n)
                          try {
                            c = a ? a(this.value) : this.value
                          } catch (t) {
                            f.reject(t)
                            continue
                          }
                        else if (e) {
                          if (!s) {
                            f.reject(this.error)
                            continue
                          }
                          try {
                            c = s(this.error)
                          } catch (t) {
                            f.reject(t)
                            continue
                          }
                        }
                        c instanceof t && (c.resolved || c.rejected)
                          ? (c.resolved
                              ? f.resolve(c.value)
                              : f.reject(c.error),
                            (c.errorHandled = !0))
                          : S(c)
                          ? c instanceof t && (c.resolved || c.rejected)
                            ? c.resolved
                              ? f.resolve(c.value)
                              : f.reject(c.error)
                            : o(c, f)
                          : f.resolve(c)
                      }
                      ;(r.length = 0), (this.dispatching = !1), k()
                    }
                  }),
                  (n.then = function (n, e) {
                    if (n && 'function' != typeof n && !n.call)
                      throw new Error(
                        'Promise.then expected a function for success handler',
                      )
                    if (e && 'function' != typeof e && !e.call)
                      throw new Error(
                        'Promise.then expected a function for error handler',
                      )
                    var r = new t()
                    return (
                      this.handlers.push({
                        promise: r,
                        onSuccess: n,
                        onError: e,
                      }),
                      (this.errorHandled = !0),
                      this.dispatch(),
                      r
                    )
                  }),
                  (n.catch = function (t) {
                    return this.then(void 0, t)
                  }),
                  (n.finally = function (n) {
                    if (n && 'function' != typeof n && !n.call)
                      throw new Error('Promise.finally expected a function')
                    return this.then(
                      function (e) {
                        return t.try(n).then(function () {
                          return e
                        })
                      },
                      function (e) {
                        return t.try(n).then(function () {
                          throw e
                        })
                      },
                    )
                  }),
                  (n.timeout = function (t, n) {
                    var e = this
                    if (this.resolved || this.rejected) return this
                    var r = setTimeout(function () {
                      e.resolved ||
                        e.rejected ||
                        e.reject(
                          n || new Error('Promise timed out after ' + t + 'ms'),
                        )
                    }, t)
                    return this.then(function (t) {
                      return clearTimeout(r), t
                    })
                  }),
                  (n.toPromise = function () {
                    if ('undefined' == typeof Promise)
                      throw new TypeError('Could not find Promise')
                    return Promise.resolve(this)
                  }),
                  (t.resolve = function (n) {
                    return n instanceof t
                      ? n
                      : S(n)
                      ? new t(function (t, e) {
                          return n.then(t, e)
                        })
                      : new t().resolve(n)
                  }),
                  (t.reject = function (n) {
                    return new t().reject(n)
                  }),
                  (t.asyncReject = function (n) {
                    return new t().asyncReject(n)
                  }),
                  (t.all = function (n) {
                    var e = new t(),
                      r = n.length,
                      o = []
                    if (!r) return e.resolve(o), e
                    for (
                      var i = function (t, n, i) {
                          return n.then(
                            function (n) {
                              ;(o[t] = n), 0 == (r -= 1) && e.resolve(o)
                            },
                            function (t) {
                              i.reject(t)
                            },
                          )
                        },
                        u = 0;
                      u < n.length;
                      u++
                    ) {
                      var a = n[u]
                      if (a instanceof t) {
                        if (a.resolved) {
                          ;(o[u] = a.value), (r -= 1)
                          continue
                        }
                      } else if (!S(a)) {
                        ;(o[u] = a), (r -= 1)
                        continue
                      }
                      i(u, t.resolve(a), e)
                    }
                    return 0 === r && e.resolve(o), e
                  }),
                  (t.hash = function (n) {
                    var e = {},
                      r = [],
                      o = function (t) {
                        if (n.hasOwnProperty(t)) {
                          var o = n[t]
                          S(o)
                            ? r.push(
                                o.then(function (n) {
                                  e[t] = n
                                }),
                              )
                            : (e[t] = o)
                        }
                      }
                    for (var i in n) o(i)
                    return t.all(r).then(function () {
                      return e
                    })
                  }),
                  (t.map = function (n, e) {
                    return t.all(n.map(e))
                  }),
                  (t.onPossiblyUnhandledException = function (t) {
                    return (function (t) {
                      return (
                        x.push(t),
                        {
                          cancel: function () {
                            x.splice(x.indexOf(t), 1)
                          },
                        }
                      )
                    })(t)
                  }),
                  (t.try = function (n, e, r) {
                    if (n && 'function' != typeof n && !n.call)
                      throw new Error('Promise.try expected a function')
                    var o
                    T()
                    try {
                      o = n.apply(e, r || [])
                    } catch (n) {
                      return k(), t.reject(n)
                    }
                    return k(), t.resolve(o)
                  }),
                  (t.delay = function (n) {
                    return new t(function (t) {
                      setTimeout(t, n)
                    })
                  }),
                  (t.isPromise = function (n) {
                    return !!(n && n instanceof t) || S(n)
                  }),
                  (t.flush = function () {
                    return (n = t), (e = A = A || new n()), R(), e
                    var n, e
                  }),
                  t
                )
              })()
              function j(t, n) {
                for (var e = 0; e < t.length; e++)
                  try {
                    if (t[e] === n) return e
                  } catch (t) {}
                return -1
              }
              var I,
                C = (function () {
                  function t() {
                    if (
                      ((this.name = void 0),
                      (this.weakmap = void 0),
                      (this.keys = void 0),
                      (this.values = void 0),
                      (this.name =
                        '__weakmap_' + ((1e9 * Math.random()) >>> 0) + '__'),
                      (function () {
                        if ('undefined' == typeof WeakMap) return !1
                        if (void 0 === Object.freeze) return !1
                        try {
                          var t = new WeakMap(),
                            n = {}
                          return (
                            Object.freeze(n),
                            t.set(n, '__testvalue__'),
                            '__testvalue__' === t.get(n)
                          )
                        } catch (t) {
                          return !1
                        }
                      })())
                    )
                      try {
                        this.weakmap = new WeakMap()
                      } catch (t) {}
                    ;(this.keys = []), (this.values = [])
                  }
                  var n = t.prototype
                  return (
                    (n._cleanupClosedWindows = function () {
                      for (
                        var t = this.weakmap, n = this.keys, e = 0;
                        e < n.length;
                        e++
                      ) {
                        var r = n[e]
                        if (b(r) && g(r)) {
                          if (t)
                            try {
                              t.delete(r)
                            } catch (t) {}
                          n.splice(e, 1), this.values.splice(e, 1), (e -= 1)
                        }
                      }
                    }),
                    (n.isSafeToReadWrite = function (t) {
                      return !b(t)
                    }),
                    (n.set = function (t, n) {
                      if (!t) throw new Error('WeakMap expected key')
                      var e = this.weakmap
                      if (e)
                        try {
                          e.set(t, n)
                        } catch (t) {
                          delete this.weakmap
                        }
                      if (this.isSafeToReadWrite(t))
                        try {
                          var r = this.name,
                            o = t[r]
                          return void (o && o[0] === t
                            ? (o[1] = n)
                            : Object.defineProperty(t, r, {
                                value: [t, n],
                                writable: !0,
                              }))
                        } catch (t) {}
                      this._cleanupClosedWindows()
                      var i = this.keys,
                        u = this.values,
                        a = j(i, t)
                      ;-1 === a ? (i.push(t), u.push(n)) : (u[a] = n)
                    }),
                    (n.get = function (t) {
                      if (!t) throw new Error('WeakMap expected key')
                      var n = this.weakmap
                      if (n)
                        try {
                          if (n.has(t)) return n.get(t)
                        } catch (t) {
                          delete this.weakmap
                        }
                      if (this.isSafeToReadWrite(t))
                        try {
                          var e = t[this.name]
                          return e && e[0] === t ? e[1] : void 0
                        } catch (t) {}
                      this._cleanupClosedWindows()
                      var r = j(this.keys, t)
                      if (-1 !== r) return this.values[r]
                    }),
                    (n.delete = function (t) {
                      if (!t) throw new Error('WeakMap expected key')
                      var n = this.weakmap
                      if (n)
                        try {
                          n.delete(t)
                        } catch (t) {
                          delete this.weakmap
                        }
                      if (this.isSafeToReadWrite(t))
                        try {
                          var e = t[this.name]
                          e && e[0] === t && (e[0] = e[1] = void 0)
                        } catch (t) {}
                      this._cleanupClosedWindows()
                      var r = this.keys,
                        o = j(r, t)
                      ;-1 !== o && (r.splice(o, 1), this.values.splice(o, 1))
                    }),
                    (n.has = function (t) {
                      if (!t) throw new Error('WeakMap expected key')
                      var n = this.weakmap
                      if (n)
                        try {
                          if (n.has(t)) return !0
                        } catch (t) {
                          delete this.weakmap
                        }
                      if (this.isSafeToReadWrite(t))
                        try {
                          var e = t[this.name]
                          return !(!e || e[0] !== t)
                        } catch (t) {}
                      return (
                        this._cleanupClosedWindows(), -1 !== j(this.keys, t)
                      )
                    }),
                    (n.getOrSet = function (t, n) {
                      if (this.has(t)) return this.get(t)
                      var e = n()
                      return this.set(t, e), e
                    }),
                    t
                  )
                })()
              function D(t) {
                return t.name || t.__name__ || t.displayName || 'anonymous'
              }
              function L(t, n) {
                try {
                  delete t.name, (t.name = n)
                } catch (t) {}
                return (t.__name__ = t.displayName = n), t
              }
              function B() {
                var t = '0123456789abcdef'
                return (
                  'xxxxxxxxxx'.replace(/./g, function () {
                    return t.charAt(Math.floor(Math.random() * t.length))
                  }) +
                  '_' +
                  (function (t) {
                    if ('function' == typeof btoa)
                      return btoa(
                        encodeURIComponent(t).replace(
                          /%([0-9A-F]{2})/g,
                          function (t, n) {
                            return String.fromCharCode(parseInt(n, 16))
                          },
                        ),
                      )
                    if (void 0 !== n)
                      return n.from(t, 'utf8').toString('base64')
                    throw new Error('Can not find window.btoa or Buffer')
                  })(new Date().toISOString().slice(11, 19).replace('T', '.'))
                    .replace(/[^a-zA-Z0-9]/g, '')
                    .toLowerCase()
                )
              }
              function U(t) {
                try {
                  return JSON.stringify([].slice.call(t), function (t, n) {
                    return 'function' == typeof n
                      ? 'memoize[' +
                          (function (t) {
                            if (
                              ((I = I || new C()),
                              null == t ||
                                ('object' != typeof t &&
                                  'function' != typeof t))
                            )
                              throw new Error('Invalid object')
                            var n = I.get(t)
                            return (
                              n || ((n = typeof t + ':' + B()), I.set(t, n)), n
                            )
                          })(n) +
                          ']'
                      : n
                  })
                } catch (t) {
                  throw new Error(
                    'Arguments not serializable -- can not be used to memoize',
                  )
                }
              }
              function M() {
                return {}
              }
              var N = 0,
                z = 0
              function Y(t, n) {
                void 0 === n && (n = {})
                var e,
                  r,
                  o = n.thisNamespace,
                  i = void 0 !== o && o,
                  u = n.time,
                  a = N
                N += 1
                var s = function () {
                  for (
                    var n = arguments.length, o = new Array(n), s = 0;
                    s < n;
                    s++
                  )
                    o[s] = arguments[s]
                  var f
                  a < z && ((e = null), (r = null), (a = N), (N += 1)),
                    (f = i
                      ? (r = r || new C()).getOrSet(this, M)
                      : (e = e || {}))
                  var c = U(o),
                    l = f[c]
                  if (
                    (l &&
                      u &&
                      Date.now() - l.time < u &&
                      (delete f[c], (l = null)),
                    l)
                  )
                    return l.value
                  var d = Date.now(),
                    h = t.apply(this, arguments)
                  return (f[c] = { time: d, value: h }), h
                }
                return (
                  (s.reset = function () {
                    ;(e = null), (r = null)
                  }),
                  L(s, (n.name || D(t)) + '::memoized')
                )
              }
              function q(t) {
                var n = {}
                function e() {
                  for (
                    var e = arguments,
                      r = this,
                      o = arguments.length,
                      i = new Array(o),
                      u = 0;
                    u < o;
                    u++
                  )
                    i[u] = arguments[u]
                  var a = U(i)
                  return (
                    n.hasOwnProperty(a) ||
                      (n[a] = W.try(function () {
                        return t.apply(r, e)
                      }).finally(function () {
                        delete n[a]
                      })),
                    n[a]
                  )
                }
                return (
                  (e.reset = function () {
                    n = {}
                  }),
                  L(e, D(t) + '::promiseMemoized')
                )
              }
              function F() {}
              function J(t, n) {
                if ((void 0 === n && (n = 1), n >= 3))
                  return 'stringifyError stack overflow'
                try {
                  if (!t) return '<unknown error: ' + {}.toString.call(t) + '>'
                  if ('string' == typeof t) return t
                  if (t instanceof Error) {
                    var e = t && t.stack,
                      r = t && t.message
                    if (e && r) return -1 !== e.indexOf(r) ? e : r + '\n' + e
                    if (e) return e
                    if (r) return r
                  }
                  return t && t.toString && 'function' == typeof t.toString
                    ? t.toString()
                    : {}.toString.call(t)
                } catch (t) {
                  return 'Error while stringifying error: ' + J(t, n + 1)
                }
              }
              function H(t) {
                return 'string' == typeof t
                  ? t
                  : t && t.toString && 'function' == typeof t.toString
                  ? t.toString()
                  : {}.toString.call(t)
              }
              function V(t) {
                return '[object RegExp]' === {}.toString.call(t)
              }
              function G(t, n, e) {
                if (t.hasOwnProperty(n)) return t[n]
                var r = e()
                return (t[n] = r), r
              }
              function K() {
                return (
                  Boolean(document.body) && 'complete' === document.readyState
                )
              }
              function $() {
                return (
                  Boolean(document.body) &&
                  'interactive' === document.readyState
                )
              }
              ;(Y.clear = function () {
                z = N
              }),
                Y(function (t) {
                  if (Object.values) return Object.values(t)
                  var n = []
                  for (var e in t) t.hasOwnProperty(e) && n.push(t[e])
                  return n
                }),
                Error,
                Y(function () {
                  return new W(function (t) {
                    if (K() || $()) return t()
                    var n = setInterval(function () {
                      if (K() || $()) return clearInterval(n), t()
                    }, 10)
                  })
                })
              var Z =
                  'undefined' != typeof document
                    ? document.currentScript
                    : null,
                X = Y(function () {
                  if (Z) return Z
                  if (
                    (Z = (function () {
                      try {
                        var t = (function () {
                            try {
                              throw new Error('_')
                            } catch (t) {
                              return t.stack || ''
                            }
                          })(),
                          n = /.*at [^(]*\((.*):(.+):(.+)\)$/gi.exec(t),
                          e = n && n[1]
                        if (!e) return
                        for (
                          var r = 0,
                            o = [].slice
                              .call(document.getElementsByTagName('script'))
                              .reverse();
                          r < o.length;
                          r++
                        ) {
                          var i = o[r]
                          if (i.src && i.src === e) return i
                        }
                      } catch (t) {}
                    })())
                  )
                    return Z
                  throw new Error('Can not determine current script')
                }),
                Q = B()
              function tt(t) {
                void 0 === t && (t = window)
                var n = '__post_robot_10_0_42__'
                return t !== window ? t[n] : (t[n] = t[n] || {})
              }
              Y(function () {
                var t
                try {
                  t = X()
                } catch (t) {
                  return Q
                }
                var n = t.getAttribute('data-uid')
                return (
                  (n && 'string' == typeof n) ||
                    ((n = t.getAttribute('data-uid-auto')) &&
                      'string' == typeof n) ||
                    ((n = B()), t.setAttribute('data-uid-auto', n)),
                  n
                )
              })
              var nt = function () {
                return {}
              }
              function et(t, n) {
                return (
                  void 0 === t && (t = 'store'),
                  void 0 === n && (n = nt),
                  G(tt(), t, function () {
                    var t = n()
                    return {
                      has: function (n) {
                        return t.hasOwnProperty(n)
                      },
                      get: function (n, e) {
                        return t.hasOwnProperty(n) ? t[n] : e
                      },
                      set: function (n, e) {
                        return (t[n] = e), e
                      },
                      del: function (n) {
                        delete t[n]
                      },
                      getOrSet: function (n, e) {
                        return G(t, n, e)
                      },
                      reset: function () {
                        t = n()
                      },
                      keys: function () {
                        return Object.keys(t)
                      },
                    }
                  })
                )
              }
              var rt,
                ot = function () {}
              function it() {
                var t = tt()
                return (
                  (t.WINDOW_WILDCARD = t.WINDOW_WILDCARD || new ot()),
                  t.WINDOW_WILDCARD
                )
              }
              function ut(t, n) {
                return (
                  void 0 === t && (t = 'store'),
                  void 0 === n && (n = nt),
                  et('windowStore').getOrSet(t, function () {
                    var e = new C(),
                      r = function (t) {
                        return e.getOrSet(t, n)
                      }
                    return {
                      has: function (n) {
                        return r(n).hasOwnProperty(t)
                      },
                      get: function (n, e) {
                        var o = r(n)
                        return o.hasOwnProperty(t) ? o[t] : e
                      },
                      set: function (n, e) {
                        return (r(n)[t] = e), e
                      },
                      del: function (n) {
                        delete r(n)[t]
                      },
                      getOrSet: function (n, e) {
                        return G(r(n), t, e)
                      },
                    }
                  })
                )
              }
              function at() {
                return et('instance').getOrSet('instanceID', B)
              }
              function st(t, n) {
                var e = n.domain,
                  r = ut('helloPromises'),
                  o = r.get(t)
                o && o.resolve({ domain: e })
                var i = W.resolve({ domain: e })
                return r.set(t, i), i
              }
              function ft(t, n) {
                return (0, n.send)(
                  t,
                  'postrobot_hello',
                  { instanceID: at() },
                  { domain: '*', timeout: -1 },
                ).then(function (n) {
                  var e = n.origin,
                    r = n.data.instanceID
                  return (
                    st(t, { domain: e }), { win: t, domain: e, instanceID: r }
                  )
                })
              }
              function ct(t, n) {
                var e = n.send
                return ut('windowInstanceIDPromises').getOrSet(t, function () {
                  return ft(t, { send: e }).then(function (t) {
                    return t.instanceID
                  })
                })
              }
              function lt(t) {
                ut('knownWindows').set(t, !0)
              }
              function dt(t) {
                return (
                  'object' == typeof t &&
                  null !== t &&
                  'string' == typeof t.__type__
                )
              }
              function ht(t) {
                return void 0 === t
                  ? 'undefined'
                  : null === t
                  ? 'null'
                  : Array.isArray(t)
                  ? 'array'
                  : 'function' == typeof t
                  ? 'function'
                  : 'object' == typeof t
                  ? t instanceof Error
                    ? 'error'
                    : 'function' == typeof t.then
                    ? 'promise'
                    : '[object RegExp]' === {}.toString.call(t)
                    ? 'regex'
                    : '[object Date]' === {}.toString.call(t)
                    ? 'date'
                    : 'object'
                  : 'string' == typeof t
                  ? 'string'
                  : 'number' == typeof t
                  ? 'number'
                  : 'boolean' == typeof t
                  ? 'boolean'
                  : void 0
              }
              function pt(t, n) {
                return { __type__: t, __val__: n }
              }
              var wt,
                vt =
                  (((rt = {}).function = function () {}),
                  (rt.error = function (t) {
                    return pt('error', {
                      message: t.message,
                      stack: t.stack,
                      code: t.code,
                      data: t.data,
                    })
                  }),
                  (rt.promise = function () {}),
                  (rt.regex = function (t) {
                    return pt('regex', t.source)
                  }),
                  (rt.date = function (t) {
                    return pt('date', t.toJSON())
                  }),
                  (rt.array = function (t) {
                    return t
                  }),
                  (rt.object = function (t) {
                    return t
                  }),
                  (rt.string = function (t) {
                    return t
                  }),
                  (rt.number = function (t) {
                    return t
                  }),
                  (rt.boolean = function (t) {
                    return t
                  }),
                  (rt.null = function (t) {
                    return t
                  }),
                  rt),
                yt = {},
                gt =
                  (((wt = {}).function = function () {
                    throw new Error(
                      'Function serialization is not implemented; nothing to deserialize',
                    )
                  }),
                  (wt.error = function (t) {
                    var n = t.stack,
                      e = t.code,
                      r = t.data,
                      o = new Error(t.message)
                    return (
                      (o.code = e),
                      r && (o.data = r),
                      (o.stack = n + '\n\n' + o.stack),
                      o
                    )
                  }),
                  (wt.promise = function () {
                    throw new Error(
                      'Promise serialization is not implemented; nothing to deserialize',
                    )
                  }),
                  (wt.regex = function (t) {
                    return new RegExp(t)
                  }),
                  (wt.date = function (t) {
                    return new Date(t)
                  }),
                  (wt.array = function (t) {
                    return t
                  }),
                  (wt.object = function (t) {
                    return t
                  }),
                  (wt.string = function (t) {
                    return t
                  }),
                  (wt.number = function (t) {
                    return t
                  }),
                  (wt.boolean = function (t) {
                    return t
                  }),
                  (wt.null = function (t) {
                    return t
                  }),
                  wt),
                mt = {}
              function _t() {
                for (
                  var t = et('idToProxyWindow'), n = 0, e = t.keys();
                  n < e.length;
                  n++
                ) {
                  var r = e[n]
                  t.get(r).shouldClean() && t.del(r)
                }
              }
              function bt(t, n) {
                var e = n.send,
                  r = n.id,
                  o = void 0 === r ? B() : r,
                  i = t.then(function (t) {
                    if (d(t)) return h(t).name
                  }),
                  u = t.then(function (t) {
                    if (g(t))
                      throw new Error(
                        'Window is closed, can not determine type',
                      )
                    return s(t) ? 'popup' : 'iframe'
                  })
                return (
                  i.catch(F),
                  u.catch(F),
                  {
                    id: o,
                    getType: function () {
                      return u
                    },
                    getInstanceID: q(function () {
                      return t.then(function (t) {
                        return ct(t, { send: e })
                      })
                    }),
                    close: function () {
                      return t.then(E)
                    },
                    getName: function () {
                      return t.then(function (t) {
                        if (!g(t)) return d(t) ? h(t).name : i
                      })
                    },
                    focus: function () {
                      return t.then(function (t) {
                        t.focus()
                      })
                    },
                    isClosed: function () {
                      return t.then(function (t) {
                        return g(t)
                      })
                    },
                    setLocation: function (n) {
                      return t.then(function (t) {
                        var e =
                          window.location.protocol + '//' + window.location.host
                        if (0 === n.indexOf('/')) n = '' + e + n
                        else if (!n.match(/^https?:\/\//) && 0 !== n.indexOf(e))
                          throw new Error(
                            'Expected url to be http or https url, or absolute path, got ' +
                              JSON.stringify(n),
                          )
                        if (d(t))
                          try {
                            if (
                              t.location &&
                              'function' == typeof t.location.replace
                            )
                              return void t.location.replace(n)
                          } catch (t) {}
                        t.location = n
                      })
                    },
                    setName: function (n) {
                      return t.then(function (t) {
                        var e = d(t),
                          r = (function (t) {
                            if (d(t)) return h(t).frameElement
                            for (
                              var n = 0,
                                e = document.querySelectorAll('iframe');
                              n < e.length;
                              n++
                            ) {
                              var r = e[n]
                              if (r && r.contentWindow && r.contentWindow === t)
                                return r
                            }
                          })(t)
                        if (!e)
                          throw new Error(
                            'Can not set name for cross-domain window: ' + n,
                          )
                        ;(h(t).name = n),
                          r && r.setAttribute('name', n),
                          (i = W.resolve(n))
                      })
                    },
                  }
                )
              }
              new W(function (t) {
                if (window.document && window.document.body)
                  return t(window.document.body)
                var n = setInterval(function () {
                  if (window.document && window.document.body)
                    return clearInterval(n), t(window.document.body)
                }, 10)
              })
              var Et = (function () {
                function t(t) {
                  var n = t.send,
                    e = t.win,
                    r = t.serializedWindow
                  ;(this.id = void 0),
                    (this.isProxyWindow = !0),
                    (this.serializedWindow = void 0),
                    (this.actualWindow = void 0),
                    (this.actualWindowPromise = void 0),
                    (this.send = void 0),
                    (this.name = void 0),
                    (this.actualWindowPromise = new W()),
                    (this.serializedWindow =
                      r || bt(this.actualWindowPromise, { send: n })),
                    et('idToProxyWindow').set(this.getID(), this),
                    e && this.setWindow(e, { send: n })
                }
                var n = t.prototype
                return (
                  (n.getID = function () {
                    return this.serializedWindow.id
                  }),
                  (n.getType = function () {
                    return this.serializedWindow.getType()
                  }),
                  (n.isPopup = function () {
                    return this.getType().then(function (t) {
                      return 'popup' === t
                    })
                  }),
                  (n.setLocation = function (t) {
                    var n = this
                    return this.serializedWindow
                      .setLocation(t)
                      .then(function () {
                        return n
                      })
                  }),
                  (n.getName = function () {
                    return this.serializedWindow.getName()
                  }),
                  (n.setName = function (t) {
                    var n = this
                    return this.serializedWindow.setName(t).then(function () {
                      return n
                    })
                  }),
                  (n.close = function () {
                    var t = this
                    return this.serializedWindow.close().then(function () {
                      return t
                    })
                  }),
                  (n.focus = function () {
                    var t = this,
                      n = this.isPopup(),
                      e = this.getName(),
                      r = W.hash({ isPopup: n, name: e }).then(function (t) {
                        var n = t.name
                        t.isPopup && n && window.open('', n)
                      }),
                      o = this.serializedWindow.focus()
                    return W.all([r, o]).then(function () {
                      return t
                    })
                  }),
                  (n.isClosed = function () {
                    return this.serializedWindow.isClosed()
                  }),
                  (n.getWindow = function () {
                    return this.actualWindow
                  }),
                  (n.setWindow = function (t, n) {
                    var e = n.send
                    ;(this.actualWindow = t),
                      this.actualWindowPromise.resolve(this.actualWindow),
                      (this.serializedWindow = bt(this.actualWindowPromise, {
                        send: e,
                        id: this.getID(),
                      })),
                      ut('winToProxyWindow').set(t, this)
                  }),
                  (n.awaitWindow = function () {
                    return this.actualWindowPromise
                  }),
                  (n.matchWindow = function (t, n) {
                    var e = this,
                      r = n.send
                    return W.try(function () {
                      return e.actualWindow
                        ? t === e.actualWindow
                        : W.hash({
                            proxyInstanceID: e.getInstanceID(),
                            knownWindowInstanceID: ct(t, { send: r }),
                          }).then(function (n) {
                            var o =
                              n.proxyInstanceID === n.knownWindowInstanceID
                            return o && e.setWindow(t, { send: r }), o
                          })
                    })
                  }),
                  (n.unwrap = function () {
                    return this.actualWindow || this
                  }),
                  (n.getInstanceID = function () {
                    return this.serializedWindow.getInstanceID()
                  }),
                  (n.shouldClean = function () {
                    return Boolean(this.actualWindow && g(this.actualWindow))
                  }),
                  (n.serialize = function () {
                    return this.serializedWindow
                  }),
                  (t.unwrap = function (n) {
                    return t.isProxyWindow(n) ? n.unwrap() : n
                  }),
                  (t.serialize = function (n, e) {
                    var r = e.send
                    return _t(), t.toProxyWindow(n, { send: r }).serialize()
                  }),
                  (t.deserialize = function (n, e) {
                    var r = e.send
                    return (
                      _t(),
                      et('idToProxyWindow').get(n.id) ||
                        new t({ serializedWindow: n, send: r })
                    )
                  }),
                  (t.isProxyWindow = function (t) {
                    return Boolean(t && !b(t) && t.isProxyWindow)
                  }),
                  (t.toProxyWindow = function (n, e) {
                    var r = e.send
                    if ((_t(), t.isProxyWindow(n))) return n
                    var o = n
                    return (
                      ut('winToProxyWindow').get(o) ||
                      new t({ win: o, send: r })
                    )
                  }),
                  t
                )
              })()
              function St(t, n, e, r, o) {
                var i = ut('methodStore'),
                  u = et('proxyWindowMethods')
                Et.isProxyWindow(r)
                  ? u.set(t, { val: n, name: e, domain: o, source: r })
                  : (u.del(t),
                    (i.getOrSet(r, function () {
                      return {}
                    })[t] = { domain: o, name: e, val: n, source: r }))
              }
              function At(t, n) {
                var e = ut('methodStore'),
                  r = et('proxyWindowMethods')
                return (
                  e.getOrSet(t, function () {
                    return {}
                  })[n] || r.get(n)
                )
              }
              function Pt(t, n, e, r, o) {
                var i, u, a
                ;(u = (i = { on: o.on, send: o.send }).on),
                  (a = i.send),
                  et('builtinListeners').getOrSet('functionCalls', function () {
                    return u('postrobot_method', { domain: '*' }, function (t) {
                      var n = t.source,
                        e = t.origin,
                        r = t.data,
                        o = r.id,
                        i = r.name,
                        u = At(n, o)
                      if (!u)
                        throw new Error(
                          "Could not find method '" +
                            i +
                            "' with id: " +
                            r.id +
                            ' in ' +
                            l(window),
                        )
                      var s = u.source,
                        f = u.domain,
                        c = u.val
                      return W.try(function () {
                        if (!_(f, e))
                          throw new Error(
                            "Method '" +
                              r.name +
                              "' domain " +
                              JSON.stringify(
                                V(u.domain) ? u.domain.source : u.domain,
                              ) +
                              ' does not match origin ' +
                              e +
                              ' in ' +
                              l(window),
                          )
                        if (Et.isProxyWindow(s))
                          return s
                            .matchWindow(n, { send: a })
                            .then(function (t) {
                              if (!t)
                                throw new Error(
                                  "Method call '" +
                                    r.name +
                                    "' failed - proxy window does not match source in " +
                                    l(window),
                                )
                            })
                      })
                        .then(
                          function () {
                            return c.apply({ source: n, origin: e }, r.args)
                          },
                          function (t) {
                            return W.try(function () {
                              if (c.onError) return c.onError(t)
                            }).then(function () {
                              var n, e
                              throw (
                                (t.stack &&
                                  (t.stack =
                                    'Remote call to ' +
                                    i +
                                    '(' +
                                    (void 0 === (n = r.args) && (n = []),
                                    ((e = n), [].slice.call(e))
                                      .map(function (t) {
                                        return 'string' == typeof t
                                          ? "'" + t + "'"
                                          : void 0 === t
                                          ? 'undefined'
                                          : null === t
                                          ? 'null'
                                          : 'boolean' == typeof t
                                          ? t.toString()
                                          : Array.isArray(t)
                                          ? '[ ... ]'
                                          : 'object' == typeof t
                                          ? '{ ... }'
                                          : 'function' == typeof t
                                          ? '() => { ... }'
                                          : '<' + typeof t + '>'
                                      })
                                      .join(', ') + ') failed\n\n') +
                                    t.stack),
                                t)
                              )
                            })
                          },
                        )
                        .then(function (t) {
                          return { result: t, id: o, name: i }
                        })
                    })
                  })
                var s = e.__id__ || B()
                t = Et.unwrap(t)
                var f = e.__name__ || e.name || r
                return (
                  'string' == typeof f &&
                    'function' == typeof f.indexOf &&
                    0 === f.indexOf('anonymous::') &&
                    (f = f.replace('anonymous::', r + '::')),
                  Et.isProxyWindow(t)
                    ? (St(s, e, f, t, n),
                      t.awaitWindow().then(function (t) {
                        St(s, e, f, t, n)
                      }))
                    : St(s, e, f, t, n),
                  pt('cross_domain_function', { id: s, name: f })
                )
              }
              function xt(t, n, e, r) {
                var o,
                  i = r.on,
                  u = r.send
                return (function (t, n) {
                  void 0 === n && (n = yt)
                  var e = JSON.stringify(t, function (t) {
                    var e = this[t]
                    if (dt(this)) return e
                    var r = ht(e)
                    if (!r) return e
                    var o = n[r] || vt[r]
                    return o ? o(e, t) : e
                  })
                  return void 0 === e ? 'undefined' : e
                })(
                  e,
                  (((o = {}).promise = function (e, r) {
                    return (function (t, n, e, r, o) {
                      return pt('cross_domain_zalgo_promise', {
                        then: Pt(
                          t,
                          n,
                          function (t, n) {
                            return e.then(t, n)
                          },
                          r,
                          { on: o.on, send: o.send },
                        ),
                      })
                    })(t, n, e, r, { on: i, send: u })
                  }),
                  (o.function = function (e, r) {
                    return Pt(t, n, e, r, { on: i, send: u })
                  }),
                  (o.object = function (t) {
                    return b(t) || Et.isProxyWindow(t)
                      ? pt('cross_domain_window', Et.serialize(t, { send: u }))
                      : t
                  }),
                  o),
                )
              }
              function Ot(t, n, e, r) {
                var o,
                  i = r.send
                return (function (t, n) {
                  if ((void 0 === n && (n = mt), 'undefined' !== t))
                    return JSON.parse(t, function (t, e) {
                      if (dt(this)) return e
                      var r, o
                      if (
                        (dt(e)
                          ? ((r = e.__type__), (o = e.__val__))
                          : ((r = ht(e)), (o = e)),
                        !r)
                      )
                        return o
                      var i = n[r] || gt[r]
                      return i ? i(o, t) : o
                    })
                })(
                  e,
                  (((o = {}).cross_domain_zalgo_promise = function (t) {
                    return (function (t, n, e) {
                      return new W(e.then)
                    })(0, 0, t)
                  }),
                  (o.cross_domain_function = function (e) {
                    return (function (t, n, e, r) {
                      var o = e.id,
                        i = e.name,
                        u = r.send,
                        a = function (e) {
                          function r() {
                            var a = arguments
                            return Et.toProxyWindow(t, { send: u })
                              .awaitWindow()
                              .then(function (t) {
                                var s = At(t, o)
                                if (s && s.val !== r)
                                  return s.val.apply(
                                    { source: window, origin: l() },
                                    a,
                                  )
                                var f = [].slice.call(a)
                                return e.fireAndForget
                                  ? u(
                                      t,
                                      'postrobot_method',
                                      { id: o, name: i, args: f },
                                      { domain: n, fireAndForget: !0 },
                                    )
                                  : u(
                                      t,
                                      'postrobot_method',
                                      { id: o, name: i, args: f },
                                      { domain: n, fireAndForget: !1 },
                                    ).then(function (t) {
                                      return t.data.result
                                    })
                              })
                              .catch(function (t) {
                                throw t
                              })
                          }
                          return (
                            void 0 === e && (e = {}),
                            (r.__name__ = i),
                            (r.__origin__ = n),
                            (r.__source__ = t),
                            (r.__id__ = o),
                            (r.origin = n),
                            r
                          )
                        },
                        s = a()
                      return (s.fireAndForget = a({ fireAndForget: !0 })), s
                    })(t, n, e, { send: i })
                  }),
                  (o.cross_domain_window = function (t) {
                    return Et.deserialize(t, { send: i })
                  }),
                  o),
                )
              }
              var Rt = {}
              function Tt(t, n, e, r) {
                var o = r.on,
                  i = r.send
                return W.try(function () {
                  var r = ut().getOrSet(t, function () {
                    return {}
                  })
                  return (
                    (r.buffer = r.buffer || []),
                    r.buffer.push(e),
                    (r.flush =
                      r.flush ||
                      W.flush().then(function () {
                        if (g(t)) throw new Error('Window is closed')
                        var e,
                          u = xt(
                            t,
                            n,
                            (((e = {}).__post_robot_10_0_42__ = r.buffer || []),
                            e),
                            { on: o, send: i },
                          )
                        delete r.buffer
                        for (
                          var a = Object.keys(Rt), s = [], f = 0;
                          f < a.length;
                          f++
                        ) {
                          var c = a[f]
                          try {
                            Rt[c](t, u, n)
                          } catch (t) {
                            s.push(t)
                          }
                        }
                        if (s.length === a.length)
                          throw new Error(
                            'All post-robot messaging strategies failed:\n\n' +
                              s
                                .map(function (t, n) {
                                  return n + '. ' + J(t)
                                })
                                .join('\n\n'),
                          )
                      })),
                    r.flush.then(function () {
                      delete r.flush
                    })
                  )
                }).then(F)
              }
              function kt(t) {
                return et('responseListeners').get(t)
              }
              function Wt(t) {
                et('responseListeners').del(t)
              }
              function jt(t) {
                return et('erroredResponseListeners').has(t)
              }
              function It(t) {
                var n = t.name,
                  e = t.win,
                  r = t.domain,
                  o = ut('requestListeners')
                if (('*' === e && (e = null), '*' === r && (r = null), !n))
                  throw new Error('Name required to get request listener')
                for (var i = 0, u = [e, it()]; i < u.length; i++) {
                  var a = u[i]
                  if (a) {
                    var s = o.get(a)
                    if (s) {
                      var f = s[n]
                      if (f) {
                        if (r && 'string' == typeof r) {
                          if (f[r]) return f[r]
                          if (f.__domain_regex__)
                            for (
                              var c = 0, l = f.__domain_regex__;
                              c < l.length;
                              c++
                            ) {
                              var d = l[c],
                                h = d.listener
                              if (_(d.regex, r)) return h
                            }
                        }
                        if (f['*']) return f['*']
                      }
                    }
                  }
                }
              }
              function Ct(t, n, e, r) {
                var o = r.on,
                  i = r.send,
                  u = It({ name: e.name, win: t, domain: n }),
                  a =
                    'postrobot_method' === e.name &&
                    e.data &&
                    'string' == typeof e.data.name
                      ? e.data.name + '()'
                      : e.name
                function s(r, u, s) {
                  return W.flush().then(function () {
                    if (!e.fireAndForget && !g(t))
                      try {
                        return Tt(
                          t,
                          n,
                          {
                            id: B(),
                            origin: l(window),
                            type: 'postrobot_message_response',
                            hash: e.hash,
                            name: e.name,
                            ack: r,
                            data: u,
                            error: s,
                          },
                          { on: o, send: i },
                        )
                      } catch (t) {
                        throw new Error(
                          'Send response message failed for ' +
                            a +
                            ' in ' +
                            l() +
                            '\n\n' +
                            J(t),
                        )
                      }
                  })
                }
                return W.all([
                  W.flush().then(function () {
                    if (!e.fireAndForget && !g(t))
                      try {
                        return Tt(
                          t,
                          n,
                          {
                            id: B(),
                            origin: l(window),
                            type: 'postrobot_message_ack',
                            hash: e.hash,
                            name: e.name,
                          },
                          { on: o, send: i },
                        )
                      } catch (t) {
                        throw new Error(
                          'Send ack message failed for ' +
                            a +
                            ' in ' +
                            l() +
                            '\n\n' +
                            J(t),
                        )
                      }
                  }),
                  W.try(function () {
                    if (!u)
                      throw new Error(
                        'No handler found for post message: ' +
                          e.name +
                          ' from ' +
                          n +
                          ' in ' +
                          window.location.protocol +
                          '//' +
                          window.location.host +
                          window.location.pathname,
                      )
                    if (!_(u.domain, n))
                      throw new Error(
                        'Request origin ' +
                          n +
                          ' does not match domain ' +
                          u.domain.toString(),
                      )
                    return u.handler({ source: t, origin: n, data: e.data })
                  }).then(
                    function (t) {
                      return s('success', t)
                    },
                    function (t) {
                      return s('error', null, t)
                    },
                  ),
                ])
                  .then(F)
                  .catch(function (t) {
                    if (u && u.handleError) return u.handleError(t)
                    throw t
                  })
              }
              function Dt(t, n, e) {
                if (!jt(e.hash)) {
                  var r = kt(e.hash)
                  if (!r)
                    throw new Error(
                      'No handler found for post message ack for message: ' +
                        e.name +
                        ' from ' +
                        n +
                        ' in ' +
                        window.location.protocol +
                        '//' +
                        window.location.host +
                        window.location.pathname,
                    )
                  try {
                    if (!_(r.domain, n))
                      throw new Error(
                        'Ack origin ' +
                          n +
                          ' does not match domain ' +
                          r.domain.toString(),
                      )
                    if (t !== r.win)
                      throw new Error(
                        'Ack source does not match registered window',
                      )
                  } catch (t) {
                    r.promise.reject(t)
                  }
                  r.ack = !0
                }
              }
              function Lt(t, n, e) {
                if (!jt(e.hash)) {
                  var r,
                    i = kt(e.hash)
                  if (!i)
                    throw new Error(
                      'No handler found for post message response for message: ' +
                        e.name +
                        ' from ' +
                        n +
                        ' in ' +
                        window.location.protocol +
                        '//' +
                        window.location.host +
                        window.location.pathname,
                    )
                  if (!_(i.domain, n))
                    throw new Error(
                      'Response origin ' +
                        n +
                        ' does not match domain ' +
                        ((r = i.domain),
                        Array.isArray(r)
                          ? '(' + r.join(' | ') + ')'
                          : o(r)
                          ? 'RegExp(' + r.toString()
                          : r.toString()),
                    )
                  if (t !== i.win)
                    throw new Error(
                      'Response source does not match registered window',
                    )
                  Wt(e.hash),
                    'error' === e.ack
                      ? i.promise.reject(e.error)
                      : 'success' === e.ack &&
                        i.promise.resolve({
                          source: t,
                          origin: n,
                          data: e.data,
                        })
                }
              }
              function Bt(t, n) {
                var e = n.on,
                  r = n.send,
                  o = et('receivedMessages')
                try {
                  if (!window || window.closed || !t.source) return
                } catch (t) {
                  return
                }
                var i = t.source,
                  u = t.origin,
                  a = (function (t, n, e, r) {
                    var o,
                      i = r.on,
                      u = r.send
                    try {
                      o = Ot(n, e, t, { on: i, send: u })
                    } catch (t) {
                      return
                    }
                    if (o && 'object' == typeof o && null !== o) {
                      var a = o.__post_robot_10_0_42__
                      if (Array.isArray(a)) return a
                    }
                  })(t.data, i, u, { on: e, send: r })
                if (a) {
                  lt(i)
                  for (var s = 0; s < a.length; s++) {
                    var f = a[s]
                    if (o.has(f.id)) return
                    if ((o.set(f.id, !0), g(i) && !f.fireAndForget)) return
                    0 === f.origin.indexOf('file:') && (u = 'file://')
                    try {
                      'postrobot_message_request' === f.type
                        ? Ct(i, u, f, { on: e, send: r })
                        : 'postrobot_message_response' === f.type
                        ? Lt(i, u, f)
                        : 'postrobot_message_ack' === f.type && Dt(i, u, f)
                    } catch (t) {
                      setTimeout(function () {
                        throw t
                      }, 0)
                    }
                  }
                }
              }
              function Ut(t, n, e) {
                if (!t) throw new Error('Expected name')
                if (
                  ('function' == typeof (n = n || {}) && ((e = n), (n = {})),
                  !e)
                )
                  throw new Error('Expected handler')
                ;((n = n || {}).name = t), (n.handler = e || n.handler)
                var r = n.window,
                  o = n.domain,
                  i = (function t(n, e) {
                    var r = n.name,
                      o = n.win,
                      i = n.domain,
                      u = ut('requestListeners')
                    if (!r || 'string' != typeof r)
                      throw new Error('Name required to add request listener')
                    if (Array.isArray(o)) {
                      for (var a = [], s = 0, f = o; s < f.length; s++)
                        a.push(t({ name: r, domain: i, win: f[s] }, e))
                      return {
                        cancel: function () {
                          for (var t = 0; t < a.length; t++) a[t].cancel()
                        },
                      }
                    }
                    if (Array.isArray(i)) {
                      for (var c = [], l = 0, d = i; l < d.length; l++)
                        c.push(t({ name: r, win: o, domain: d[l] }, e))
                      return {
                        cancel: function () {
                          for (var t = 0; t < c.length; t++) c[t].cancel()
                        },
                      }
                    }
                    var h = It({ name: r, win: o, domain: i })
                    if (((o && '*' !== o) || (o = it()), (i = i || '*'), h))
                      throw o && i
                        ? new Error(
                            'Request listener already exists for ' +
                              r +
                              ' on domain ' +
                              i.toString() +
                              ' for ' +
                              (o === it() ? 'wildcard' : 'specified') +
                              ' window',
                          )
                        : o
                        ? new Error(
                            'Request listener already exists for ' +
                              r +
                              ' for ' +
                              (o === it() ? 'wildcard' : 'specified') +
                              ' window',
                          )
                        : i
                        ? new Error(
                            'Request listener already exists for ' +
                              r +
                              ' on domain ' +
                              i.toString(),
                          )
                        : new Error('Request listener already exists for ' + r)
                    var p,
                      w,
                      v = u.getOrSet(o, function () {
                        return {}
                      }),
                      y = G(v, r, function () {
                        return {}
                      }),
                      g = i.toString()
                    return (
                      V(i)
                        ? (p = G(y, '__domain_regex__', function () {
                            return []
                          })).push((w = { regex: i, listener: e }))
                        : (y[g] = e),
                      {
                        cancel: function () {
                          delete y[g],
                            w &&
                              (p.splice(p.indexOf(w, 1)),
                              p.length || delete y.__domain_regex__),
                            Object.keys(y).length || delete v[r],
                            o && !Object.keys(v).length && u.del(o)
                        },
                      }
                    )
                  })(
                    { name: t, win: r, domain: o },
                    {
                      handler: n.handler,
                      handleError:
                        n.errorHandler ||
                        function (t) {
                          throw t
                        },
                      window: r,
                      domain: o || '*',
                      name: t,
                    },
                  )
                return {
                  cancel: function () {
                    i.cancel()
                  },
                }
              }
              function Mt(t, n, e) {
                'function' == typeof (n = n || {}) && ((e = n), (n = {}))
                var r,
                  o = new W()
                return (
                  (n.errorHandler = function (t) {
                    r.cancel(), o.reject(t)
                  }),
                  (r = Ut(t, n, function (t) {
                    if ((r.cancel(), o.resolve(t), e)) return e(t)
                  })),
                  (o.cancel = r.cancel),
                  o
                )
              }
              Rt.postrobot_post_message = function (t, n, e) {
                0 === e.indexOf('file:') && (e = '*'), t.postMessage(n, e)
              }
              var Nt = function t(n, e, r, o) {
                var i = (o = o || {}).domain || '*',
                  u = o.timeout || -1,
                  s = o.timeout || 5e3,
                  f = o.fireAndForget || !1
                return W.try(function () {
                  if (
                    ((function (t, n, e) {
                      if (!t) throw new Error('Expected name')
                      if (
                        e &&
                        'string' != typeof e &&
                        !Array.isArray(e) &&
                        !V(e)
                      )
                        throw new TypeError(
                          'Can not send ' +
                            t +
                            '. Expected domain ' +
                            JSON.stringify(e) +
                            ' to be a string, array, or regex',
                        )
                      if (g(n))
                        throw new Error(
                          'Can not send ' + t + '. Target window is closed',
                        )
                    })(e, n, i),
                    (function (t, n) {
                      var e = m(n)
                      if (e) return e === t
                      if (n === t) return !1
                      if (
                        (function (t) {
                          void 0 === t && (t = window)
                          try {
                            if (t.top) return t.top
                          } catch (t) {}
                          if (a(t) === t) return t
                          try {
                            if (p(window, t) && window.top) return window.top
                          } catch (t) {}
                          try {
                            if (p(t, window) && window.top) return window.top
                          } catch (t) {}
                          for (
                            var n = 0,
                              e = (function t(n) {
                                for (
                                  var e = [], r = 0, o = w(n);
                                  r < o.length;
                                  r++
                                ) {
                                  var i = o[r]
                                  e.push(i)
                                  for (var u = 0, a = t(i); u < a.length; u++)
                                    e.push(a[u])
                                }
                                return e
                              })(t);
                            n < e.length;
                            n++
                          ) {
                            var r = e[n]
                            try {
                              if (r.top) return r.top
                            } catch (t) {}
                            if (a(r) === r) return r
                          }
                        })(n) === n
                      )
                        return !1
                      for (var r = 0, o = w(t); r < o.length; r++)
                        if (o[r] === n) return !0
                      return !1
                    })(window, n))
                  )
                    return (function (t, n, e) {
                      void 0 === n && (n = 5e3), void 0 === e && (e = 'Window')
                      var r = (function (t) {
                        return ut('helloPromises').getOrSet(t, function () {
                          return new W()
                        })
                      })(t)
                      return (
                        -1 !== n &&
                          (r = r.timeout(
                            n,
                            new Error(e + ' did not load after ' + n + 'ms'),
                          )),
                        r
                      )
                    })(n, s)
                })
                  .then(function (e) {
                    return (function (t, n, e, r) {
                      var o = r.send
                      return W.try(function () {
                        return 'string' == typeof n
                          ? n
                          : W.try(function () {
                              return (
                                e ||
                                ft(t, { send: o }).then(function (t) {
                                  return t.domain
                                })
                              )
                            }).then(function (t) {
                              if (!_(n, n))
                                throw new Error(
                                  'Domain ' + H(n) + ' does not match ' + H(n),
                                )
                              return t
                            })
                      })
                    })(n, i, (void 0 === e ? {} : e).domain, { send: t })
                  })
                  .then(function (o) {
                    var i,
                      a = o,
                      s =
                        'postrobot_method' === e &&
                        r &&
                        'string' == typeof r.name
                          ? r.name + '()'
                          : e,
                      c = new W(),
                      d = e + '_' + B()
                    if (!f) {
                      var h = { name: e, win: n, domain: a, promise: c }
                      !(function (t, n) {
                        et('responseListeners').set(t, n)
                      })(d, h)
                      var p = ut('requestPromises').getOrSet(n, function () {
                        return []
                      })
                      p.push(c),
                        c.catch(function () {
                          !(function (t) {
                            et('erroredResponseListeners').set(t, !0)
                          })(d),
                            Wt(d)
                        })
                      var w = (function (t) {
                          return ut('knownWindows').get(t, !1)
                        })(n)
                          ? 1e4
                          : 2e3,
                        v = u,
                        y = w,
                        m = v,
                        _ =
                          ((function t() {
                            i = setTimeout(function () {
                              g(n)
                                ? c.reject(
                                    new Error(
                                      'Window closed for ' +
                                        e +
                                        ' before ' +
                                        (h.ack ? 'response' : 'ack'),
                                    ),
                                  )
                                : h.cancelled
                                ? c.reject(
                                    new Error(
                                      'Response listener was cancelled for ' +
                                        e,
                                    ),
                                  )
                                : ((y = Math.max(y - 500, 0)),
                                  -1 !== m && (m = Math.max(m - 500, 0)),
                                  h.ack || 0 !== y
                                    ? 0 === m &&
                                      c.reject(
                                        new Error(
                                          'No response for postMessage ' +
                                            s +
                                            ' in ' +
                                            l() +
                                            ' in ' +
                                            v +
                                            'ms',
                                        ),
                                      )
                                    : c.reject(
                                        new Error(
                                          'No ack for postMessage ' +
                                            s +
                                            ' in ' +
                                            l() +
                                            ' in ' +
                                            w +
                                            'ms',
                                        ),
                                      )),
                                t()
                            }, 500)
                          })(),
                          {
                            cancel: function () {
                              clearTimeout(i)
                            },
                          })
                      c.finally(function () {
                        _.cancel(), p.splice(p.indexOf(c, 1))
                      }).catch(F)
                    }
                    return Tt(
                      n,
                      a,
                      {
                        id: B(),
                        origin: l(window),
                        type: 'postrobot_message_request',
                        hash: d,
                        name: e,
                        data: r,
                        fireAndForget: f,
                      },
                      { on: Ut, send: t },
                    ).then(
                      function () {
                        return f ? c.resolve() : c
                      },
                      function (t) {
                        throw new Error(
                          'Send request message failed for ' +
                            s +
                            ' in ' +
                            l() +
                            '\n\n' +
                            J(t),
                        )
                      },
                    )
                  })
              }
              function zt(t, n, e) {
                return xt(t, n, e, { on: Ut, send: Nt })
              }
              function Yt(t, n, e) {
                return Ot(t, n, e, { on: Ut, send: Nt })
              }
              function qt(t) {
                return new Et({ send: Nt, win: t })
              }
              function Ft(t) {
                return Et.toProxyWindow(t, { send: Nt })
              }
              function Jt() {
                var t, n, e, r
                tt().initialized ||
                  ((tt().initialized = !0),
                  (n = (t = { on: Ut, send: Nt }).on),
                  (e = t.send),
                  ((r = tt()).receiveMessage =
                    r.receiveMessage ||
                    function (t) {
                      return Bt(t, { on: n, send: e })
                    }),
                  (function (t) {
                    var n = t.on,
                      e = t.send
                    et().getOrSet('postMessageListener', function () {
                      return (
                        (t = window),
                        (r = function (t) {
                          !(function (t, n) {
                            var e = n.on,
                              r = n.send
                            W.try(function () {
                              var n = t.source || t.sourceElement,
                                o =
                                  t.origin ||
                                  (t.originalEvent && t.originalEvent.origin),
                                i = t.data
                              if (('null' === o && (o = 'file://'), n)) {
                                if (!o)
                                  throw new Error(
                                    'Post message did not have origin domain',
                                  )
                                Bt(
                                  { source: n, origin: o, data: i },
                                  { on: e, send: r },
                                )
                              }
                            })
                          })(t, { on: n, send: e })
                        }),
                        t.addEventListener('message', r),
                        {
                          cancel: function () {
                            t.removeEventListener('message', r)
                          },
                        }
                      )
                      var t, r
                    })
                  })({ on: Ut, send: Nt }),
                  (function (t) {
                    var n = t.on,
                      e = t.send
                    et('builtinListeners').getOrSet(
                      'helloListener',
                      function () {
                        var t = n(
                            'postrobot_hello',
                            { domain: '*' },
                            function (t) {
                              return (
                                st(t.source, { domain: t.origin }),
                                { instanceID: at() }
                              )
                            },
                          ),
                          r = m()
                        return r && ft(r, { send: e }).catch(function (t) {}), t
                      },
                    )
                  })({ on: Ut, send: Nt }))
              }
              function Ht() {
                var t
                !(function () {
                  for (
                    var t = et('responseListeners'), n = 0, e = t.keys();
                    n < e.length;
                    n++
                  ) {
                    var r = e[n],
                      o = t.get(r)
                    o && (o.cancelled = !0), t.del(r)
                  }
                })(),
                  (t = et().get('postMessageListener')) && t.cancel(),
                  delete window.__post_robot_10_0_42__
              }
              var Vt = !0
              function Gt(t) {
                for (
                  var n = 0, e = ut('requestPromises').get(t, []);
                  n < e.length;
                  n++
                )
                  e[n]
                    .reject(
                      new Error(
                        'Window ' +
                          (g(t) ? 'closed' : 'cleaned up') +
                          ' before response',
                      ),
                    )
                    .catch(F)
              }
              Jt()
            },
          ]))
      }.call(this, e(8).Buffer))
    },
    function (t, n, e) {
      'use strict'
      ;(function (t) {
        /*!
         * The buffer module from node.js, for the browser.
         *
         * @author   Feross Aboukhadijeh <http://feross.org>
         * @license  MIT
         */
        var r = e(10),
          o = e(11),
          i = e(12)
        function u() {
          return s.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
        }
        function a(t, n) {
          if (u() < n) throw new RangeError('Invalid typed array length')
          return (
            s.TYPED_ARRAY_SUPPORT
              ? ((t = new Uint8Array(n)).__proto__ = s.prototype)
              : (null === t && (t = new s(n)), (t.length = n)),
            t
          )
        }
        function s(t, n, e) {
          if (!(s.TYPED_ARRAY_SUPPORT || this instanceof s))
            return new s(t, n, e)
          if ('number' == typeof t) {
            if ('string' == typeof n)
              throw new Error(
                'If encoding is specified then the first argument must be a string',
              )
            return l(this, t)
          }
          return f(this, t, n, e)
        }
        function f(t, n, e, r) {
          if ('number' == typeof n)
            throw new TypeError('"value" argument must not be a number')
          return 'undefined' != typeof ArrayBuffer && n instanceof ArrayBuffer
            ? (function (t, n, e, r) {
                if ((n.byteLength, e < 0 || n.byteLength < e))
                  throw new RangeError("'offset' is out of bounds")
                if (n.byteLength < e + (r || 0))
                  throw new RangeError("'length' is out of bounds")
                n =
                  void 0 === e && void 0 === r
                    ? new Uint8Array(n)
                    : void 0 === r
                    ? new Uint8Array(n, e)
                    : new Uint8Array(n, e, r)
                s.TYPED_ARRAY_SUPPORT
                  ? ((t = n).__proto__ = s.prototype)
                  : (t = d(t, n))
                return t
              })(t, n, e, r)
            : 'string' == typeof n
            ? (function (t, n, e) {
                ;('string' == typeof e && '' !== e) || (e = 'utf8')
                if (!s.isEncoding(e))
                  throw new TypeError(
                    '"encoding" must be a valid string encoding',
                  )
                var r = 0 | p(n, e),
                  o = (t = a(t, r)).write(n, e)
                o !== r && (t = t.slice(0, o))
                return t
              })(t, n, e)
            : (function (t, n) {
                if (s.isBuffer(n)) {
                  var e = 0 | h(n.length)
                  return 0 === (t = a(t, e)).length || n.copy(t, 0, 0, e), t
                }
                if (n) {
                  if (
                    ('undefined' != typeof ArrayBuffer &&
                      n.buffer instanceof ArrayBuffer) ||
                    'length' in n
                  )
                    return 'number' != typeof n.length || (r = n.length) != r
                      ? a(t, 0)
                      : d(t, n)
                  if ('Buffer' === n.type && i(n.data)) return d(t, n.data)
                }
                var r
                throw new TypeError(
                  'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.',
                )
              })(t, n)
        }
        function c(t) {
          if ('number' != typeof t)
            throw new TypeError('"size" argument must be a number')
          if (t < 0)
            throw new RangeError('"size" argument must not be negative')
        }
        function l(t, n) {
          if ((c(n), (t = a(t, n < 0 ? 0 : 0 | h(n))), !s.TYPED_ARRAY_SUPPORT))
            for (var e = 0; e < n; ++e) t[e] = 0
          return t
        }
        function d(t, n) {
          var e = n.length < 0 ? 0 : 0 | h(n.length)
          t = a(t, e)
          for (var r = 0; r < e; r += 1) t[r] = 255 & n[r]
          return t
        }
        function h(t) {
          if (t >= u())
            throw new RangeError(
              'Attempt to allocate Buffer larger than maximum size: 0x' +
                u().toString(16) +
                ' bytes',
            )
          return 0 | t
        }
        function p(t, n) {
          if (s.isBuffer(t)) return t.length
          if (
            'undefined' != typeof ArrayBuffer &&
            'function' == typeof ArrayBuffer.isView &&
            (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
          )
            return t.byteLength
          'string' != typeof t && (t = '' + t)
          var e = t.length
          if (0 === e) return 0
          for (var r = !1; ; )
            switch (n) {
              case 'ascii':
              case 'latin1':
              case 'binary':
                return e
              case 'utf8':
              case 'utf-8':
              case void 0:
                return N(t).length
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return 2 * e
              case 'hex':
                return e >>> 1
              case 'base64':
                return z(t).length
              default:
                if (r) return N(t).length
                ;(n = ('' + n).toLowerCase()), (r = !0)
            }
        }
        function w(t, n, e) {
          var r = !1
          if (((void 0 === n || n < 0) && (n = 0), n > this.length)) return ''
          if (((void 0 === e || e > this.length) && (e = this.length), e <= 0))
            return ''
          if ((e >>>= 0) <= (n >>>= 0)) return ''
          for (t || (t = 'utf8'); ; )
            switch (t) {
              case 'hex':
                return T(this, n, e)
              case 'utf8':
              case 'utf-8':
                return x(this, n, e)
              case 'ascii':
                return O(this, n, e)
              case 'latin1':
              case 'binary':
                return R(this, n, e)
              case 'base64':
                return P(this, n, e)
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return k(this, n, e)
              default:
                if (r) throw new TypeError('Unknown encoding: ' + t)
                ;(t = (t + '').toLowerCase()), (r = !0)
            }
        }
        function v(t, n, e) {
          var r = t[n]
          ;(t[n] = t[e]), (t[e] = r)
        }
        function y(t, n, e, r, o) {
          if (0 === t.length) return -1
          if (
            ('string' == typeof e
              ? ((r = e), (e = 0))
              : e > 2147483647
              ? (e = 2147483647)
              : e < -2147483648 && (e = -2147483648),
            (e = +e),
            isNaN(e) && (e = o ? 0 : t.length - 1),
            e < 0 && (e = t.length + e),
            e >= t.length)
          ) {
            if (o) return -1
            e = t.length - 1
          } else if (e < 0) {
            if (!o) return -1
            e = 0
          }
          if (('string' == typeof n && (n = s.from(n, r)), s.isBuffer(n)))
            return 0 === n.length ? -1 : g(t, n, e, r, o)
          if ('number' == typeof n)
            return (
              (n &= 255),
              s.TYPED_ARRAY_SUPPORT &&
              'function' == typeof Uint8Array.prototype.indexOf
                ? o
                  ? Uint8Array.prototype.indexOf.call(t, n, e)
                  : Uint8Array.prototype.lastIndexOf.call(t, n, e)
                : g(t, [n], e, r, o)
            )
          throw new TypeError('val must be string, number or Buffer')
        }
        function g(t, n, e, r, o) {
          var i,
            u = 1,
            a = t.length,
            s = n.length
          if (
            void 0 !== r &&
            ('ucs2' === (r = String(r).toLowerCase()) ||
              'ucs-2' === r ||
              'utf16le' === r ||
              'utf-16le' === r)
          ) {
            if (t.length < 2 || n.length < 2) return -1
            ;(u = 2), (a /= 2), (s /= 2), (e /= 2)
          }
          function f(t, n) {
            return 1 === u ? t[n] : t.readUInt16BE(n * u)
          }
          if (o) {
            var c = -1
            for (i = e; i < a; i++)
              if (f(t, i) === f(n, -1 === c ? 0 : i - c)) {
                if ((-1 === c && (c = i), i - c + 1 === s)) return c * u
              } else -1 !== c && (i -= i - c), (c = -1)
          } else
            for (e + s > a && (e = a - s), i = e; i >= 0; i--) {
              for (var l = !0, d = 0; d < s; d++)
                if (f(t, i + d) !== f(n, d)) {
                  l = !1
                  break
                }
              if (l) return i
            }
          return -1
        }
        function m(t, n, e, r) {
          e = Number(e) || 0
          var o = t.length - e
          r ? (r = Number(r)) > o && (r = o) : (r = o)
          var i = n.length
          if (i % 2 != 0) throw new TypeError('Invalid hex string')
          r > i / 2 && (r = i / 2)
          for (var u = 0; u < r; ++u) {
            var a = parseInt(n.substr(2 * u, 2), 16)
            if (isNaN(a)) return u
            t[e + u] = a
          }
          return u
        }
        function _(t, n, e, r) {
          return Y(N(n, t.length - e), t, e, r)
        }
        function b(t, n, e, r) {
          return Y(
            (function (t) {
              for (var n = [], e = 0; e < t.length; ++e)
                n.push(255 & t.charCodeAt(e))
              return n
            })(n),
            t,
            e,
            r,
          )
        }
        function E(t, n, e, r) {
          return b(t, n, e, r)
        }
        function S(t, n, e, r) {
          return Y(z(n), t, e, r)
        }
        function A(t, n, e, r) {
          return Y(
            (function (t, n) {
              for (
                var e, r, o, i = [], u = 0;
                u < t.length && !((n -= 2) < 0);
                ++u
              )
                (e = t.charCodeAt(u)),
                  (r = e >> 8),
                  (o = e % 256),
                  i.push(o),
                  i.push(r)
              return i
            })(n, t.length - e),
            t,
            e,
            r,
          )
        }
        function P(t, n, e) {
          return 0 === n && e === t.length
            ? r.fromByteArray(t)
            : r.fromByteArray(t.slice(n, e))
        }
        function x(t, n, e) {
          e = Math.min(t.length, e)
          for (var r = [], o = n; o < e; ) {
            var i,
              u,
              a,
              s,
              f = t[o],
              c = null,
              l = f > 239 ? 4 : f > 223 ? 3 : f > 191 ? 2 : 1
            if (o + l <= e)
              switch (l) {
                case 1:
                  f < 128 && (c = f)
                  break
                case 2:
                  128 == (192 & (i = t[o + 1])) &&
                    (s = ((31 & f) << 6) | (63 & i)) > 127 &&
                    (c = s)
                  break
                case 3:
                  ;(i = t[o + 1]),
                    (u = t[o + 2]),
                    128 == (192 & i) &&
                      128 == (192 & u) &&
                      (s = ((15 & f) << 12) | ((63 & i) << 6) | (63 & u)) >
                        2047 &&
                      (s < 55296 || s > 57343) &&
                      (c = s)
                  break
                case 4:
                  ;(i = t[o + 1]),
                    (u = t[o + 2]),
                    (a = t[o + 3]),
                    128 == (192 & i) &&
                      128 == (192 & u) &&
                      128 == (192 & a) &&
                      (s =
                        ((15 & f) << 18) |
                        ((63 & i) << 12) |
                        ((63 & u) << 6) |
                        (63 & a)) > 65535 &&
                      s < 1114112 &&
                      (c = s)
              }
            null === c
              ? ((c = 65533), (l = 1))
              : c > 65535 &&
                ((c -= 65536),
                r.push(((c >>> 10) & 1023) | 55296),
                (c = 56320 | (1023 & c))),
              r.push(c),
              (o += l)
          }
          return (function (t) {
            var n = t.length
            if (n <= 4096) return String.fromCharCode.apply(String, t)
            var e = '',
              r = 0
            for (; r < n; )
              e += String.fromCharCode.apply(String, t.slice(r, (r += 4096)))
            return e
          })(r)
        }
        ;(n.Buffer = s),
          (n.SlowBuffer = function (t) {
            ;+t != t && (t = 0)
            return s.alloc(+t)
          }),
          (n.INSPECT_MAX_BYTES = 50),
          (s.TYPED_ARRAY_SUPPORT =
            void 0 !== t.TYPED_ARRAY_SUPPORT
              ? t.TYPED_ARRAY_SUPPORT
              : (function () {
                  try {
                    var t = new Uint8Array(1)
                    return (
                      (t.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function () {
                          return 42
                        },
                      }),
                      42 === t.foo() &&
                        'function' == typeof t.subarray &&
                        0 === t.subarray(1, 1).byteLength
                    )
                  } catch (t) {
                    return !1
                  }
                })()),
          (n.kMaxLength = u()),
          (s.poolSize = 8192),
          (s._augment = function (t) {
            return (t.__proto__ = s.prototype), t
          }),
          (s.from = function (t, n, e) {
            return f(null, t, n, e)
          }),
          s.TYPED_ARRAY_SUPPORT &&
            ((s.prototype.__proto__ = Uint8Array.prototype),
            (s.__proto__ = Uint8Array),
            'undefined' != typeof Symbol &&
              Symbol.species &&
              s[Symbol.species] === s &&
              Object.defineProperty(s, Symbol.species, {
                value: null,
                configurable: !0,
              })),
          (s.alloc = function (t, n, e) {
            return (function (t, n, e, r) {
              return (
                c(n),
                n <= 0
                  ? a(t, n)
                  : void 0 !== e
                  ? 'string' == typeof r
                    ? a(t, n).fill(e, r)
                    : a(t, n).fill(e)
                  : a(t, n)
              )
            })(null, t, n, e)
          }),
          (s.allocUnsafe = function (t) {
            return l(null, t)
          }),
          (s.allocUnsafeSlow = function (t) {
            return l(null, t)
          }),
          (s.isBuffer = function (t) {
            return !(null == t || !t._isBuffer)
          }),
          (s.compare = function (t, n) {
            if (!s.isBuffer(t) || !s.isBuffer(n))
              throw new TypeError('Arguments must be Buffers')
            if (t === n) return 0
            for (
              var e = t.length, r = n.length, o = 0, i = Math.min(e, r);
              o < i;
              ++o
            )
              if (t[o] !== n[o]) {
                ;(e = t[o]), (r = n[o])
                break
              }
            return e < r ? -1 : r < e ? 1 : 0
          }),
          (s.isEncoding = function (t) {
            switch (String(t).toLowerCase()) {
              case 'hex':
              case 'utf8':
              case 'utf-8':
              case 'ascii':
              case 'latin1':
              case 'binary':
              case 'base64':
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return !0
              default:
                return !1
            }
          }),
          (s.concat = function (t, n) {
            if (!i(t))
              throw new TypeError('"list" argument must be an Array of Buffers')
            if (0 === t.length) return s.alloc(0)
            var e
            if (void 0 === n)
              for (n = 0, e = 0; e < t.length; ++e) n += t[e].length
            var r = s.allocUnsafe(n),
              o = 0
            for (e = 0; e < t.length; ++e) {
              var u = t[e]
              if (!s.isBuffer(u))
                throw new TypeError(
                  '"list" argument must be an Array of Buffers',
                )
              u.copy(r, o), (o += u.length)
            }
            return r
          }),
          (s.byteLength = p),
          (s.prototype._isBuffer = !0),
          (s.prototype.swap16 = function () {
            var t = this.length
            if (t % 2 != 0)
              throw new RangeError('Buffer size must be a multiple of 16-bits')
            for (var n = 0; n < t; n += 2) v(this, n, n + 1)
            return this
          }),
          (s.prototype.swap32 = function () {
            var t = this.length
            if (t % 4 != 0)
              throw new RangeError('Buffer size must be a multiple of 32-bits')
            for (var n = 0; n < t; n += 4)
              v(this, n, n + 3), v(this, n + 1, n + 2)
            return this
          }),
          (s.prototype.swap64 = function () {
            var t = this.length
            if (t % 8 != 0)
              throw new RangeError('Buffer size must be a multiple of 64-bits')
            for (var n = 0; n < t; n += 8)
              v(this, n, n + 7),
                v(this, n + 1, n + 6),
                v(this, n + 2, n + 5),
                v(this, n + 3, n + 4)
            return this
          }),
          (s.prototype.toString = function () {
            var t = 0 | this.length
            return 0 === t
              ? ''
              : 0 === arguments.length
              ? x(this, 0, t)
              : w.apply(this, arguments)
          }),
          (s.prototype.equals = function (t) {
            if (!s.isBuffer(t)) throw new TypeError('Argument must be a Buffer')
            return this === t || 0 === s.compare(this, t)
          }),
          (s.prototype.inspect = function () {
            var t = '',
              e = n.INSPECT_MAX_BYTES
            return (
              this.length > 0 &&
                ((t = this.toString('hex', 0, e).match(/.{2}/g).join(' ')),
                this.length > e && (t += ' ... ')),
              '<Buffer ' + t + '>'
            )
          }),
          (s.prototype.compare = function (t, n, e, r, o) {
            if (!s.isBuffer(t)) throw new TypeError('Argument must be a Buffer')
            if (
              (void 0 === n && (n = 0),
              void 0 === e && (e = t ? t.length : 0),
              void 0 === r && (r = 0),
              void 0 === o && (o = this.length),
              n < 0 || e > t.length || r < 0 || o > this.length)
            )
              throw new RangeError('out of range index')
            if (r >= o && n >= e) return 0
            if (r >= o) return -1
            if (n >= e) return 1
            if (this === t) return 0
            for (
              var i = (o >>>= 0) - (r >>>= 0),
                u = (e >>>= 0) - (n >>>= 0),
                a = Math.min(i, u),
                f = this.slice(r, o),
                c = t.slice(n, e),
                l = 0;
              l < a;
              ++l
            )
              if (f[l] !== c[l]) {
                ;(i = f[l]), (u = c[l])
                break
              }
            return i < u ? -1 : u < i ? 1 : 0
          }),
          (s.prototype.includes = function (t, n, e) {
            return -1 !== this.indexOf(t, n, e)
          }),
          (s.prototype.indexOf = function (t, n, e) {
            return y(this, t, n, e, !0)
          }),
          (s.prototype.lastIndexOf = function (t, n, e) {
            return y(this, t, n, e, !1)
          }),
          (s.prototype.write = function (t, n, e, r) {
            if (void 0 === n) (r = 'utf8'), (e = this.length), (n = 0)
            else if (void 0 === e && 'string' == typeof n)
              (r = n), (e = this.length), (n = 0)
            else {
              if (!isFinite(n))
                throw new Error(
                  'Buffer.write(string, encoding, offset[, length]) is no longer supported',
                )
              ;(n |= 0),
                isFinite(e)
                  ? ((e |= 0), void 0 === r && (r = 'utf8'))
                  : ((r = e), (e = void 0))
            }
            var o = this.length - n
            if (
              ((void 0 === e || e > o) && (e = o),
              (t.length > 0 && (e < 0 || n < 0)) || n > this.length)
            )
              throw new RangeError('Attempt to write outside buffer bounds')
            r || (r = 'utf8')
            for (var i = !1; ; )
              switch (r) {
                case 'hex':
                  return m(this, t, n, e)
                case 'utf8':
                case 'utf-8':
                  return _(this, t, n, e)
                case 'ascii':
                  return b(this, t, n, e)
                case 'latin1':
                case 'binary':
                  return E(this, t, n, e)
                case 'base64':
                  return S(this, t, n, e)
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return A(this, t, n, e)
                default:
                  if (i) throw new TypeError('Unknown encoding: ' + r)
                  ;(r = ('' + r).toLowerCase()), (i = !0)
              }
          }),
          (s.prototype.toJSON = function () {
            return {
              type: 'Buffer',
              data: Array.prototype.slice.call(this._arr || this, 0),
            }
          })
        function O(t, n, e) {
          var r = ''
          e = Math.min(t.length, e)
          for (var o = n; o < e; ++o) r += String.fromCharCode(127 & t[o])
          return r
        }
        function R(t, n, e) {
          var r = ''
          e = Math.min(t.length, e)
          for (var o = n; o < e; ++o) r += String.fromCharCode(t[o])
          return r
        }
        function T(t, n, e) {
          var r = t.length
          ;(!n || n < 0) && (n = 0), (!e || e < 0 || e > r) && (e = r)
          for (var o = '', i = n; i < e; ++i) o += M(t[i])
          return o
        }
        function k(t, n, e) {
          for (var r = t.slice(n, e), o = '', i = 0; i < r.length; i += 2)
            o += String.fromCharCode(r[i] + 256 * r[i + 1])
          return o
        }
        function W(t, n, e) {
          if (t % 1 != 0 || t < 0) throw new RangeError('offset is not uint')
          if (t + n > e)
            throw new RangeError('Trying to access beyond buffer length')
        }
        function j(t, n, e, r, o, i) {
          if (!s.isBuffer(t))
            throw new TypeError('"buffer" argument must be a Buffer instance')
          if (n > o || n < i)
            throw new RangeError('"value" argument is out of bounds')
          if (e + r > t.length) throw new RangeError('Index out of range')
        }
        function I(t, n, e, r) {
          n < 0 && (n = 65535 + n + 1)
          for (var o = 0, i = Math.min(t.length - e, 2); o < i; ++o)
            t[e + o] =
              (n & (255 << (8 * (r ? o : 1 - o)))) >>> (8 * (r ? o : 1 - o))
        }
        function C(t, n, e, r) {
          n < 0 && (n = 4294967295 + n + 1)
          for (var o = 0, i = Math.min(t.length - e, 4); o < i; ++o)
            t[e + o] = (n >>> (8 * (r ? o : 3 - o))) & 255
        }
        function D(t, n, e, r, o, i) {
          if (e + r > t.length) throw new RangeError('Index out of range')
          if (e < 0) throw new RangeError('Index out of range')
        }
        function L(t, n, e, r, i) {
          return i || D(t, 0, e, 4), o.write(t, n, e, r, 23, 4), e + 4
        }
        function B(t, n, e, r, i) {
          return i || D(t, 0, e, 8), o.write(t, n, e, r, 52, 8), e + 8
        }
        ;(s.prototype.slice = function (t, n) {
          var e,
            r = this.length
          if (
            ((t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
            (n = void 0 === n ? r : ~~n) < 0
              ? (n += r) < 0 && (n = 0)
              : n > r && (n = r),
            n < t && (n = t),
            s.TYPED_ARRAY_SUPPORT)
          )
            (e = this.subarray(t, n)).__proto__ = s.prototype
          else {
            var o = n - t
            e = new s(o, void 0)
            for (var i = 0; i < o; ++i) e[i] = this[i + t]
          }
          return e
        }),
          (s.prototype.readUIntLE = function (t, n, e) {
            ;(t |= 0), (n |= 0), e || W(t, n, this.length)
            for (var r = this[t], o = 1, i = 0; ++i < n && (o *= 256); )
              r += this[t + i] * o
            return r
          }),
          (s.prototype.readUIntBE = function (t, n, e) {
            ;(t |= 0), (n |= 0), e || W(t, n, this.length)
            for (var r = this[t + --n], o = 1; n > 0 && (o *= 256); )
              r += this[t + --n] * o
            return r
          }),
          (s.prototype.readUInt8 = function (t, n) {
            return n || W(t, 1, this.length), this[t]
          }),
          (s.prototype.readUInt16LE = function (t, n) {
            return n || W(t, 2, this.length), this[t] | (this[t + 1] << 8)
          }),
          (s.prototype.readUInt16BE = function (t, n) {
            return n || W(t, 2, this.length), (this[t] << 8) | this[t + 1]
          }),
          (s.prototype.readUInt32LE = function (t, n) {
            return (
              n || W(t, 4, this.length),
              (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
                16777216 * this[t + 3]
            )
          }),
          (s.prototype.readUInt32BE = function (t, n) {
            return (
              n || W(t, 4, this.length),
              16777216 * this[t] +
                ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
            )
          }),
          (s.prototype.readIntLE = function (t, n, e) {
            ;(t |= 0), (n |= 0), e || W(t, n, this.length)
            for (var r = this[t], o = 1, i = 0; ++i < n && (o *= 256); )
              r += this[t + i] * o
            return r >= (o *= 128) && (r -= Math.pow(2, 8 * n)), r
          }),
          (s.prototype.readIntBE = function (t, n, e) {
            ;(t |= 0), (n |= 0), e || W(t, n, this.length)
            for (var r = n, o = 1, i = this[t + --r]; r > 0 && (o *= 256); )
              i += this[t + --r] * o
            return i >= (o *= 128) && (i -= Math.pow(2, 8 * n)), i
          }),
          (s.prototype.readInt8 = function (t, n) {
            return (
              n || W(t, 1, this.length),
              128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
            )
          }),
          (s.prototype.readInt16LE = function (t, n) {
            n || W(t, 2, this.length)
            var e = this[t] | (this[t + 1] << 8)
            return 32768 & e ? 4294901760 | e : e
          }),
          (s.prototype.readInt16BE = function (t, n) {
            n || W(t, 2, this.length)
            var e = this[t + 1] | (this[t] << 8)
            return 32768 & e ? 4294901760 | e : e
          }),
          (s.prototype.readInt32LE = function (t, n) {
            return (
              n || W(t, 4, this.length),
              this[t] |
                (this[t + 1] << 8) |
                (this[t + 2] << 16) |
                (this[t + 3] << 24)
            )
          }),
          (s.prototype.readInt32BE = function (t, n) {
            return (
              n || W(t, 4, this.length),
              (this[t] << 24) |
                (this[t + 1] << 16) |
                (this[t + 2] << 8) |
                this[t + 3]
            )
          }),
          (s.prototype.readFloatLE = function (t, n) {
            return n || W(t, 4, this.length), o.read(this, t, !0, 23, 4)
          }),
          (s.prototype.readFloatBE = function (t, n) {
            return n || W(t, 4, this.length), o.read(this, t, !1, 23, 4)
          }),
          (s.prototype.readDoubleLE = function (t, n) {
            return n || W(t, 8, this.length), o.read(this, t, !0, 52, 8)
          }),
          (s.prototype.readDoubleBE = function (t, n) {
            return n || W(t, 8, this.length), o.read(this, t, !1, 52, 8)
          }),
          (s.prototype.writeUIntLE = function (t, n, e, r) {
            ;((t = +t), (n |= 0), (e |= 0), r) ||
              j(this, t, n, e, Math.pow(2, 8 * e) - 1, 0)
            var o = 1,
              i = 0
            for (this[n] = 255 & t; ++i < e && (o *= 256); )
              this[n + i] = (t / o) & 255
            return n + e
          }),
          (s.prototype.writeUIntBE = function (t, n, e, r) {
            ;((t = +t), (n |= 0), (e |= 0), r) ||
              j(this, t, n, e, Math.pow(2, 8 * e) - 1, 0)
            var o = e - 1,
              i = 1
            for (this[n + o] = 255 & t; --o >= 0 && (i *= 256); )
              this[n + o] = (t / i) & 255
            return n + e
          }),
          (s.prototype.writeUInt8 = function (t, n, e) {
            return (
              (t = +t),
              (n |= 0),
              e || j(this, t, n, 1, 255, 0),
              s.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
              (this[n] = 255 & t),
              n + 1
            )
          }),
          (s.prototype.writeUInt16LE = function (t, n, e) {
            return (
              (t = +t),
              (n |= 0),
              e || j(this, t, n, 2, 65535, 0),
              s.TYPED_ARRAY_SUPPORT
                ? ((this[n] = 255 & t), (this[n + 1] = t >>> 8))
                : I(this, t, n, !0),
              n + 2
            )
          }),
          (s.prototype.writeUInt16BE = function (t, n, e) {
            return (
              (t = +t),
              (n |= 0),
              e || j(this, t, n, 2, 65535, 0),
              s.TYPED_ARRAY_SUPPORT
                ? ((this[n] = t >>> 8), (this[n + 1] = 255 & t))
                : I(this, t, n, !1),
              n + 2
            )
          }),
          (s.prototype.writeUInt32LE = function (t, n, e) {
            return (
              (t = +t),
              (n |= 0),
              e || j(this, t, n, 4, 4294967295, 0),
              s.TYPED_ARRAY_SUPPORT
                ? ((this[n + 3] = t >>> 24),
                  (this[n + 2] = t >>> 16),
                  (this[n + 1] = t >>> 8),
                  (this[n] = 255 & t))
                : C(this, t, n, !0),
              n + 4
            )
          }),
          (s.prototype.writeUInt32BE = function (t, n, e) {
            return (
              (t = +t),
              (n |= 0),
              e || j(this, t, n, 4, 4294967295, 0),
              s.TYPED_ARRAY_SUPPORT
                ? ((this[n] = t >>> 24),
                  (this[n + 1] = t >>> 16),
                  (this[n + 2] = t >>> 8),
                  (this[n + 3] = 255 & t))
                : C(this, t, n, !1),
              n + 4
            )
          }),
          (s.prototype.writeIntLE = function (t, n, e, r) {
            if (((t = +t), (n |= 0), !r)) {
              var o = Math.pow(2, 8 * e - 1)
              j(this, t, n, e, o - 1, -o)
            }
            var i = 0,
              u = 1,
              a = 0
            for (this[n] = 255 & t; ++i < e && (u *= 256); )
              t < 0 && 0 === a && 0 !== this[n + i - 1] && (a = 1),
                (this[n + i] = (((t / u) >> 0) - a) & 255)
            return n + e
          }),
          (s.prototype.writeIntBE = function (t, n, e, r) {
            if (((t = +t), (n |= 0), !r)) {
              var o = Math.pow(2, 8 * e - 1)
              j(this, t, n, e, o - 1, -o)
            }
            var i = e - 1,
              u = 1,
              a = 0
            for (this[n + i] = 255 & t; --i >= 0 && (u *= 256); )
              t < 0 && 0 === a && 0 !== this[n + i + 1] && (a = 1),
                (this[n + i] = (((t / u) >> 0) - a) & 255)
            return n + e
          }),
          (s.prototype.writeInt8 = function (t, n, e) {
            return (
              (t = +t),
              (n |= 0),
              e || j(this, t, n, 1, 127, -128),
              s.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
              t < 0 && (t = 255 + t + 1),
              (this[n] = 255 & t),
              n + 1
            )
          }),
          (s.prototype.writeInt16LE = function (t, n, e) {
            return (
              (t = +t),
              (n |= 0),
              e || j(this, t, n, 2, 32767, -32768),
              s.TYPED_ARRAY_SUPPORT
                ? ((this[n] = 255 & t), (this[n + 1] = t >>> 8))
                : I(this, t, n, !0),
              n + 2
            )
          }),
          (s.prototype.writeInt16BE = function (t, n, e) {
            return (
              (t = +t),
              (n |= 0),
              e || j(this, t, n, 2, 32767, -32768),
              s.TYPED_ARRAY_SUPPORT
                ? ((this[n] = t >>> 8), (this[n + 1] = 255 & t))
                : I(this, t, n, !1),
              n + 2
            )
          }),
          (s.prototype.writeInt32LE = function (t, n, e) {
            return (
              (t = +t),
              (n |= 0),
              e || j(this, t, n, 4, 2147483647, -2147483648),
              s.TYPED_ARRAY_SUPPORT
                ? ((this[n] = 255 & t),
                  (this[n + 1] = t >>> 8),
                  (this[n + 2] = t >>> 16),
                  (this[n + 3] = t >>> 24))
                : C(this, t, n, !0),
              n + 4
            )
          }),
          (s.prototype.writeInt32BE = function (t, n, e) {
            return (
              (t = +t),
              (n |= 0),
              e || j(this, t, n, 4, 2147483647, -2147483648),
              t < 0 && (t = 4294967295 + t + 1),
              s.TYPED_ARRAY_SUPPORT
                ? ((this[n] = t >>> 24),
                  (this[n + 1] = t >>> 16),
                  (this[n + 2] = t >>> 8),
                  (this[n + 3] = 255 & t))
                : C(this, t, n, !1),
              n + 4
            )
          }),
          (s.prototype.writeFloatLE = function (t, n, e) {
            return L(this, t, n, !0, e)
          }),
          (s.prototype.writeFloatBE = function (t, n, e) {
            return L(this, t, n, !1, e)
          }),
          (s.prototype.writeDoubleLE = function (t, n, e) {
            return B(this, t, n, !0, e)
          }),
          (s.prototype.writeDoubleBE = function (t, n, e) {
            return B(this, t, n, !1, e)
          }),
          (s.prototype.copy = function (t, n, e, r) {
            if (
              (e || (e = 0),
              r || 0 === r || (r = this.length),
              n >= t.length && (n = t.length),
              n || (n = 0),
              r > 0 && r < e && (r = e),
              r === e)
            )
              return 0
            if (0 === t.length || 0 === this.length) return 0
            if (n < 0) throw new RangeError('targetStart out of bounds')
            if (e < 0 || e >= this.length)
              throw new RangeError('sourceStart out of bounds')
            if (r < 0) throw new RangeError('sourceEnd out of bounds')
            r > this.length && (r = this.length),
              t.length - n < r - e && (r = t.length - n + e)
            var o,
              i = r - e
            if (this === t && e < n && n < r)
              for (o = i - 1; o >= 0; --o) t[o + n] = this[o + e]
            else if (i < 1e3 || !s.TYPED_ARRAY_SUPPORT)
              for (o = 0; o < i; ++o) t[o + n] = this[o + e]
            else Uint8Array.prototype.set.call(t, this.subarray(e, e + i), n)
            return i
          }),
          (s.prototype.fill = function (t, n, e, r) {
            if ('string' == typeof t) {
              if (
                ('string' == typeof n
                  ? ((r = n), (n = 0), (e = this.length))
                  : 'string' == typeof e && ((r = e), (e = this.length)),
                1 === t.length)
              ) {
                var o = t.charCodeAt(0)
                o < 256 && (t = o)
              }
              if (void 0 !== r && 'string' != typeof r)
                throw new TypeError('encoding must be a string')
              if ('string' == typeof r && !s.isEncoding(r))
                throw new TypeError('Unknown encoding: ' + r)
            } else 'number' == typeof t && (t &= 255)
            if (n < 0 || this.length < n || this.length < e)
              throw new RangeError('Out of range index')
            if (e <= n) return this
            var i
            if (
              ((n >>>= 0),
              (e = void 0 === e ? this.length : e >>> 0),
              t || (t = 0),
              'number' == typeof t)
            )
              for (i = n; i < e; ++i) this[i] = t
            else {
              var u = s.isBuffer(t) ? t : N(new s(t, r).toString()),
                a = u.length
              for (i = 0; i < e - n; ++i) this[i + n] = u[i % a]
            }
            return this
          })
        var U = /[^+\/0-9A-Za-z-_]/g
        function M(t) {
          return t < 16 ? '0' + t.toString(16) : t.toString(16)
        }
        function N(t, n) {
          var e
          n = n || 1 / 0
          for (var r = t.length, o = null, i = [], u = 0; u < r; ++u) {
            if ((e = t.charCodeAt(u)) > 55295 && e < 57344) {
              if (!o) {
                if (e > 56319) {
                  ;(n -= 3) > -1 && i.push(239, 191, 189)
                  continue
                }
                if (u + 1 === r) {
                  ;(n -= 3) > -1 && i.push(239, 191, 189)
                  continue
                }
                o = e
                continue
              }
              if (e < 56320) {
                ;(n -= 3) > -1 && i.push(239, 191, 189), (o = e)
                continue
              }
              e = 65536 + (((o - 55296) << 10) | (e - 56320))
            } else o && (n -= 3) > -1 && i.push(239, 191, 189)
            if (((o = null), e < 128)) {
              if ((n -= 1) < 0) break
              i.push(e)
            } else if (e < 2048) {
              if ((n -= 2) < 0) break
              i.push((e >> 6) | 192, (63 & e) | 128)
            } else if (e < 65536) {
              if ((n -= 3) < 0) break
              i.push((e >> 12) | 224, ((e >> 6) & 63) | 128, (63 & e) | 128)
            } else {
              if (!(e < 1114112)) throw new Error('Invalid code point')
              if ((n -= 4) < 0) break
              i.push(
                (e >> 18) | 240,
                ((e >> 12) & 63) | 128,
                ((e >> 6) & 63) | 128,
                (63 & e) | 128,
              )
            }
          }
          return i
        }
        function z(t) {
          return r.toByteArray(
            (function (t) {
              if (
                (t = (function (t) {
                  return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, '')
                })(t).replace(U, '')).length < 2
              )
                return ''
              for (; t.length % 4 != 0; ) t += '='
              return t
            })(t),
          )
        }
        function Y(t, n, e, r) {
          for (var o = 0; o < r && !(o + e >= n.length || o >= t.length); ++o)
            n[o + e] = t[o]
          return o
        }
      }.call(this, e(9)))
    },
    function (t, n) {
      var e
      e = (function () {
        return this
      })()
      try {
        e = e || new Function('return this')()
      } catch (t) {
        'object' == typeof window && (e = window)
      }
      t.exports = e
    },
    function (t, n, e) {
      'use strict'
      ;(n.byteLength = function (t) {
        var n = f(t),
          e = n[0],
          r = n[1]
        return (3 * (e + r)) / 4 - r
      }),
        (n.toByteArray = function (t) {
          var n,
            e,
            r = f(t),
            u = r[0],
            a = r[1],
            s = new i(
              (function (t, n, e) {
                return (3 * (n + e)) / 4 - e
              })(0, u, a),
            ),
            c = 0,
            l = a > 0 ? u - 4 : u
          for (e = 0; e < l; e += 4)
            (n =
              (o[t.charCodeAt(e)] << 18) |
              (o[t.charCodeAt(e + 1)] << 12) |
              (o[t.charCodeAt(e + 2)] << 6) |
              o[t.charCodeAt(e + 3)]),
              (s[c++] = (n >> 16) & 255),
              (s[c++] = (n >> 8) & 255),
              (s[c++] = 255 & n)
          2 === a &&
            ((n = (o[t.charCodeAt(e)] << 2) | (o[t.charCodeAt(e + 1)] >> 4)),
            (s[c++] = 255 & n))
          1 === a &&
            ((n =
              (o[t.charCodeAt(e)] << 10) |
              (o[t.charCodeAt(e + 1)] << 4) |
              (o[t.charCodeAt(e + 2)] >> 2)),
            (s[c++] = (n >> 8) & 255),
            (s[c++] = 255 & n))
          return s
        }),
        (n.fromByteArray = function (t) {
          for (
            var n, e = t.length, o = e % 3, i = [], u = 0, a = e - o;
            u < a;
            u += 16383
          )
            i.push(c(t, u, u + 16383 > a ? a : u + 16383))
          1 === o
            ? ((n = t[e - 1]), i.push(r[n >> 2] + r[(n << 4) & 63] + '=='))
            : 2 === o &&
              ((n = (t[e - 2] << 8) + t[e - 1]),
              i.push(r[n >> 10] + r[(n >> 4) & 63] + r[(n << 2) & 63] + '='))
          return i.join('')
        })
      for (
        var r = [],
          o = [],
          i = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
          u =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
          a = 0,
          s = u.length;
        a < s;
        ++a
      )
        (r[a] = u[a]), (o[u.charCodeAt(a)] = a)
      function f(t) {
        var n = t.length
        if (n % 4 > 0)
          throw new Error('Invalid string. Length must be a multiple of 4')
        var e = t.indexOf('=')
        return -1 === e && (e = n), [e, e === n ? 0 : 4 - (e % 4)]
      }
      function c(t, n, e) {
        for (var o, i, u = [], a = n; a < e; a += 3)
          (o =
            ((t[a] << 16) & 16711680) +
            ((t[a + 1] << 8) & 65280) +
            (255 & t[a + 2])),
            u.push(
              r[((i = o) >> 18) & 63] +
                r[(i >> 12) & 63] +
                r[(i >> 6) & 63] +
                r[63 & i],
            )
        return u.join('')
      }
      ;(o['-'.charCodeAt(0)] = 62), (o['_'.charCodeAt(0)] = 63)
    },
    function (t, n) {
      /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
      ;(n.read = function (t, n, e, r, o) {
        var i,
          u,
          a = 8 * o - r - 1,
          s = (1 << a) - 1,
          f = s >> 1,
          c = -7,
          l = e ? o - 1 : 0,
          d = e ? -1 : 1,
          h = t[n + l]
        for (
          l += d, i = h & ((1 << -c) - 1), h >>= -c, c += a;
          c > 0;
          i = 256 * i + t[n + l], l += d, c -= 8
        );
        for (
          u = i & ((1 << -c) - 1), i >>= -c, c += r;
          c > 0;
          u = 256 * u + t[n + l], l += d, c -= 8
        );
        if (0 === i) i = 1 - f
        else {
          if (i === s) return u ? NaN : (1 / 0) * (h ? -1 : 1)
          ;(u += Math.pow(2, r)), (i -= f)
        }
        return (h ? -1 : 1) * u * Math.pow(2, i - r)
      }),
        (n.write = function (t, n, e, r, o, i) {
          var u,
            a,
            s,
            f = 8 * i - o - 1,
            c = (1 << f) - 1,
            l = c >> 1,
            d = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            h = r ? 0 : i - 1,
            p = r ? 1 : -1,
            w = n < 0 || (0 === n && 1 / n < 0) ? 1 : 0
          for (
            n = Math.abs(n),
              isNaN(n) || n === 1 / 0
                ? ((a = isNaN(n) ? 1 : 0), (u = c))
                : ((u = Math.floor(Math.log(n) / Math.LN2)),
                  n * (s = Math.pow(2, -u)) < 1 && (u--, (s *= 2)),
                  (n += u + l >= 1 ? d / s : d * Math.pow(2, 1 - l)) * s >= 2 &&
                    (u++, (s /= 2)),
                  u + l >= c
                    ? ((a = 0), (u = c))
                    : u + l >= 1
                    ? ((a = (n * s - 1) * Math.pow(2, o)), (u += l))
                    : ((a = n * Math.pow(2, l - 1) * Math.pow(2, o)), (u = 0)));
            o >= 8;
            t[e + h] = 255 & a, h += p, a /= 256, o -= 8
          );
          for (
            u = (u << o) | a, f += o;
            f > 0;
            t[e + h] = 255 & u, h += p, u /= 256, f -= 8
          );
          t[e + h - p] |= 128 * w
        })
    },
    function (t, n) {
      var e = {}.toString
      t.exports =
        Array.isArray ||
        function (t) {
          return '[object Array]' == e.call(t)
        }
    },
    function (t, n, e) {
      var r, o
      /*!
       * JavaScript Cookie v2.2.1
       * https://github.com/js-cookie/js-cookie
       *
       * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
       * Released under the MIT license
       */ !(function (i) {
        if (
          (void 0 ===
            (o = 'function' == typeof (r = i) ? r.call(n, e, n, t) : r) ||
            (t.exports = o),
          !0,
          (t.exports = i()),
          !!0)
        ) {
          var u = window.Cookies,
            a = (window.Cookies = i())
          a.noConflict = function () {
            return (window.Cookies = u), a
          }
        }
      })(function () {
        function t() {
          for (var t = 0, n = {}; t < arguments.length; t++) {
            var e = arguments[t]
            for (var r in e) n[r] = e[r]
          }
          return n
        }
        function n(t) {
          return t.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent)
        }
        return (function e(r) {
          function o() {}
          function i(n, e, i) {
            if ('undefined' != typeof document) {
              'number' ==
                typeof (i = t({ path: '/' }, o.defaults, i)).expires &&
                (i.expires = new Date(1 * new Date() + 864e5 * i.expires)),
                (i.expires = i.expires ? i.expires.toUTCString() : '')
              try {
                var u = JSON.stringify(e)
                ;/^[\{\[]/.test(u) && (e = u)
              } catch (t) {}
              ;(e = r.write
                ? r.write(e, n)
                : encodeURIComponent(String(e)).replace(
                    /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
                    decodeURIComponent,
                  )),
                (n = encodeURIComponent(String(n))
                  .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
                  .replace(/[\(\)]/g, escape))
              var a = ''
              for (var s in i)
                i[s] &&
                  ((a += '; ' + s),
                  !0 !== i[s] && (a += '=' + i[s].split(';')[0]))
              return (document.cookie = n + '=' + e + a)
            }
          }
          function u(t, e) {
            if ('undefined' != typeof document) {
              for (
                var o = {},
                  i = document.cookie ? document.cookie.split('; ') : [],
                  u = 0;
                u < i.length;
                u++
              ) {
                var a = i[u].split('='),
                  s = a.slice(1).join('=')
                e || '"' !== s.charAt(0) || (s = s.slice(1, -1))
                try {
                  var f = n(a[0])
                  if (((s = (r.read || r)(s, f) || n(s)), e))
                    try {
                      s = JSON.parse(s)
                    } catch (t) {}
                  if (((o[f] = s), t === f)) break
                } catch (t) {}
              }
              return t ? o[t] : o
            }
          }
          return (
            (o.set = i),
            (o.get = function (t) {
              return u(t, !1)
            }),
            (o.getJSON = function (t) {
              return u(t, !0)
            }),
            (o.remove = function (n, e) {
              i(n, '', t(e, { expires: -1 }))
            }),
            (o.defaults = {}),
            (o.withConverter = e),
            o
          )
        })(function () {})
      })
    },
    function (t, n) {
      var e,
        r,
        o = (t.exports = {})
      function i() {
        throw new Error('setTimeout has not been defined')
      }
      function u() {
        throw new Error('clearTimeout has not been defined')
      }
      function a(t) {
        if (e === setTimeout) return setTimeout(t, 0)
        if ((e === i || !e) && setTimeout)
          return (e = setTimeout), setTimeout(t, 0)
        try {
          return e(t, 0)
        } catch (n) {
          try {
            return e.call(null, t, 0)
          } catch (n) {
            return e.call(this, t, 0)
          }
        }
      }
      !(function () {
        try {
          e = 'function' == typeof setTimeout ? setTimeout : i
        } catch (t) {
          e = i
        }
        try {
          r = 'function' == typeof clearTimeout ? clearTimeout : u
        } catch (t) {
          r = u
        }
      })()
      var s,
        f = [],
        c = !1,
        l = -1
      function d() {
        c &&
          s &&
          ((c = !1), s.length ? (f = s.concat(f)) : (l = -1), f.length && h())
      }
      function h() {
        if (!c) {
          var t = a(d)
          c = !0
          for (var n = f.length; n; ) {
            for (s = f, f = []; ++l < n; ) s && s[l].run()
            ;(l = -1), (n = f.length)
          }
          ;(s = null),
            (c = !1),
            (function (t) {
              if (r === clearTimeout) return clearTimeout(t)
              if ((r === u || !r) && clearTimeout)
                return (r = clearTimeout), clearTimeout(t)
              try {
                r(t)
              } catch (n) {
                try {
                  return r.call(null, t)
                } catch (n) {
                  return r.call(this, t)
                }
              }
            })(t)
        }
      }
      function p(t, n) {
        ;(this.fun = t), (this.array = n)
      }
      function w() {}
      ;(o.nextTick = function (t) {
        var n = new Array(arguments.length - 1)
        if (arguments.length > 1)
          for (var e = 1; e < arguments.length; e++) n[e - 1] = arguments[e]
        f.push(new p(t, n)), 1 !== f.length || c || a(h)
      }),
        (p.prototype.run = function () {
          this.fun.apply(null, this.array)
        }),
        (o.title = 'browser'),
        (o.browser = !0),
        (o.env = {}),
        (o.argv = []),
        (o.version = ''),
        (o.versions = {}),
        (o.on = w),
        (o.addListener = w),
        (o.once = w),
        (o.off = w),
        (o.removeListener = w),
        (o.removeAllListeners = w),
        (o.emit = w),
        (o.prependListener = w),
        (o.prependOnceListener = w),
        (o.listeners = function (t) {
          return []
        }),
        (o.binding = function (t) {
          throw new Error('process.binding is not supported')
        }),
        (o.cwd = function () {
          return '/'
        }),
        (o.chdir = function (t) {
          throw new Error('process.chdir is not supported')
        }),
        (o.umask = function () {
          return 0
        })
    },
    ,
    function (t, n, e) {
      'use strict'
      e.r(n),
        e.d(n, 'getSecureUrl', function () {
          return d
        }),
        e.d(n, 'createIframe', function () {
          return h
        }),
        e.d(n, 'getFlagVariation', function () {
          return w
        })
      var r = e(3),
        o = e.n(r),
        i = e(4),
        u = e.n(i),
        a = e(2),
        s = function (t, n, e, r) {
          return new (e || (e = Promise))(function (o, i) {
            function u(t) {
              try {
                s(r.next(t))
              } catch (t) {
                i(t)
              }
            }
            function a(t) {
              try {
                s(r.throw(t))
              } catch (t) {
                i(t)
              }
            }
            function s(t) {
              var n
              t.done
                ? o(t.value)
                : ((n = t.value),
                  n instanceof e
                    ? n
                    : new e(function (t) {
                        t(n)
                      })).then(u, a)
            }
            s((r = r.apply(t, n || [])).next())
          })
        },
        f = function (t, n) {
          var e,
            r,
            o,
            i,
            u = {
              label: 0,
              sent: function () {
                if (1 & o[0]) throw o[1]
                return o[1]
              },
              trys: [],
              ops: [],
            }
          return (
            (i = { next: a(0), throw: a(1), return: a(2) }),
            'function' == typeof Symbol &&
              (i[Symbol.iterator] = function () {
                return this
              }),
            i
          )
          function a(i) {
            return function (a) {
              return (function (i) {
                if (e) throw new TypeError('Generator is already executing.')
                for (; u; )
                  try {
                    if (
                      ((e = 1),
                      r &&
                        (o =
                          2 & i[0]
                            ? r.return
                            : i[0]
                            ? r.throw || ((o = r.return) && o.call(r), 0)
                            : r.next) &&
                        !(o = o.call(r, i[1])).done)
                    )
                      return o
                    switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                      case 0:
                      case 1:
                        o = i
                        break
                      case 4:
                        return u.label++, { value: i[1], done: !1 }
                      case 5:
                        u.label++, (r = i[1]), (i = [0])
                        continue
                      case 7:
                        ;(i = u.ops.pop()), u.trys.pop()
                        continue
                      default:
                        if (
                          !((o = u.trys),
                          (o = o.length > 0 && o[o.length - 1]) ||
                            (6 !== i[0] && 2 !== i[0]))
                        ) {
                          u = 0
                          continue
                        }
                        if (
                          3 === i[0] &&
                          (!o || (i[1] > o[0] && i[1] < o[3]))
                        ) {
                          u.label = i[1]
                          break
                        }
                        if (6 === i[0] && u.label < o[1]) {
                          ;(u.label = o[1]), (o = i)
                          break
                        }
                        if (o && u.label < o[2]) {
                          ;(u.label = o[2]), u.ops.push(i)
                          break
                        }
                        o[2] && u.ops.pop(), u.trys.pop()
                        continue
                    }
                    i = n.call(t, u)
                  } catch (t) {
                    ;(i = [6, t]), (r = 0)
                  } finally {
                    e = o = 0
                  }
                if (5 & i[0]) throw i[1]
                return { value: i[0] ? i[1] : void 0, done: !0 }
              })([i, a])
            }
          }
        },
        c = { domain: /ally\.com$|localhost/gm, timeout: 3e3 },
        l = [
          ['dev', /.*-dev/],
          ['stage', /.*-stage|staging|prodsupt/],
          ['cit1', /.*-cit1/],
          ['cit2', /.*-cit2/],
          ['cit3', /.*-cit3/],
          ['local', /^(localhost|0\.0\.0\.0|127\.0\.0\.1)/],
          ['prod', /.*/],
        ]
      function d(t) {
        return (
          void 0 === t && (t = window.location.href),
          u()(t, l).pick({
            dev: 'https://secure-dev.ally.com',
            cit1: 'https://secure-qa1.ally.com',
            cit2: 'https://secure-qa2.ally.com',
            cit3: 'https://secure-qa3.ally.com',
            stage: 'https://secure-qa3.ally.com',
            local: 'http://localhost:1337',
            prod: 'https://secure.ally.com',
          }) + '/static-assets/launch-darkly-iframe/1.1.0/ld-iframe.html'
        )
      }
      function h() {
        var t = document.createElement('iframe'),
          n = d()
        return (
          t.setAttribute('src', n),
          t.setAttribute('title', 'Launch Darkly Iframe (hidden)'),
          t.setAttribute(
            'style',
            'width: 0; height: 0; border: 0; border: none; position: absolute; left: -5000px; bottom: -5000px;',
          ),
          document.body.appendChild(t),
          a.a.info({ message: ['Added LD iframe:', n] }),
          t
        )
      }
      var p = h()
      function w(t) {
        var n = t.flagName,
          e = t.fallback,
          r = t.windowRef,
          i = void 0 === r ? p.contentWindow : r,
          u = t.eventName,
          l = void 0 === u ? 'getFlagVariation' : u
        return s(this, void 0, void 0, function () {
          return f(this, function (t) {
            return [
              2,
              o.a
                .send(i, l, { flagName: n, fallback: e }, c)
                .then(function (t) {
                  return t.data
                })
                .catch(function (t) {
                  return (
                    a.a.error({
                      message: ['Returning default variation:', t.stack],
                    }),
                    { flagName: n, value: e }
                  )
                }),
            ]
          })
        })
      }
    },
  ])
})
