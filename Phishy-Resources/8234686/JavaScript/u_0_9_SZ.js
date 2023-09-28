
            "use strict";
            window.MPageLoadClientMetrics = (function () {
                var a = +new Date(),
                    b = {
                        prelude_onload: ["jewels_visible", "first_paint", "visibility_change", "tti"],
                        nav_started: ["first_paint", "visibility_change", "prelude_onload"],
                        first_paint: ["jewels_visible", "visibility_change", "prelude_onload"],
                        jewels_visible: ["tti", "visibility_change", "navigation", "prelude_onload"],
                        tti: ["e2e", "visibility_change", "navigation"],
                    },
                    c = 3,
                    d = 3,
                    e = "nav_started",
                    f = !0,
                    g = "",
                    h = "",
                    i = 1,
                    j = "",
                    k = "",
                    l = "",
                    m = "",
                    n = function () {},
                    o = !0,
                    p = !1,
                    q = !1,
                    r = [],
                    s = window.performance || window.msPerformance || window.webkitPerformance || {},
                    t = (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || window.setTimeout).bind(window),
                    u = window.location.origin || window.location.protocol + "//" + window.location.hostname + (window.location.port && ":" + window.location.port);
                function v(b, c, d, e, f, i, n) {
                    s.timing && s.timing.navigationStart && (a = s.timing.navigationStart), (j = b), (k = c), (l = d), (m = e), (g = f), (h = i), (o = n), y();
                }
                function w(a) {
                    var c = b[e];
                    return c && c.indexOf(a) !== -1;
                }
                function x(a) {
                    return !b[a];
                }
                function y() {
                    var a, b;
                    document.hidden !== void 0
                        ? ((a = "hidden"), (b = "visibilitychange"))
                        : document.mozHidden !== void 0
                        ? ((a = "mozHidden"), (b = "mozvisibilitychange"))
                        : document.msHidden !== void 0
                        ? ((a = "msHidden"), (b = "msvisibilitychange"))
                        : document.webkitHidden !== void 0 && ((a = "webkitHidden"), (b = "webkitvisibilitychange"));
                    var c = function () {
                        K("visibility_change", A()), document.removeEventListener(b, c), window.removeEventListener("beforeunload", c);
                    };
                    b && a && !window[a] ? (document.addEventListener(b, c), window.addEventListener("beforeunload", c)) : c();
                }
                function z(b) {
                    return b - a;
                }
                function A() {
                    return s.now ? s.now() : z(+new Date());
                }
                function B() {
                    f && ((f = !1), n());
                }
                function C() {
                    return f;
                }
                function D(a) {
                    n = a;
                }
                function E() {
                    var a = i;
                    ++i;
                    return a;
                }
                function F(a) {
                    if (!window.navigator) return;
                    window.navigator.hardwareConcurrency !== void 0 && (a.num_cores = window.navigator.hardwareConcurrency);
                    window.navigator.deviceMemory && (a.ram_gb = window.navigator.deviceMemory);
                    window.navigator.connection &&
                        (typeof window.navigator.connection.downlink === "number" && (a.downlink_mb = window.navigator.connection.downlink),
                        typeof window.navigator.connection.effectiveType === "string" && (a.effective_connection_type = window.navigator.connection.effectiveType),
                        typeof window.navigator.connection.rtt === "number" && (a.rtt_ms = window.navigator.connection.rtt));
                }
                function G(b, c, d) {
                    if (!f) return;
                    var g = !w(b),
                        i = (c + a) / 1e3;
                    c = ((i = { lid: h, seq_num: E(), event: g ? "illegal_transition" : b, client_event_time: i, time_from_nav_start_ms: Math.floor(c) }), (i[l] = m), (i.previous_event = e), (i.log_to_scuba = o), i);
                    e = b;
                    j !== "" && (c.fb_dtsg = j);
                    k !== "" && (c.lsd = k);
                    g && (c.illegal_transition_event = b);
                    i = d || "";
                    i !== "" && (c.navigation_endpoint = i);
                    F(c);
                    I(c) || J(c);
                    (x(b) || g) && B();
                }
                function H(a) {
                    var b = [];
                    for (var c in a) b.push(c + "=" + encodeURIComponent(a[c]));
                    a = u + g;
                    b = b.join("&");
                    return a + "?" + b;
                }
                function I(a) {
                    a.transmission_method = "beacon";
                    if (window.navigator && window.navigator.sendBeacon)
                        if (window.navigator.sendBeacon(H(a))) return !0;
                        else a.is_retransmit = !0;
                    return !1;
                }
                function J(a, b) {
                    b === void 0 && (b = d);
                    a.transmission_method = "img";
                    var c = new Image();
                    b < d && (a.is_retransmit = !0);
                    b &&
                        (c.onerror = function (c) {
                            J(a, b - 1);
                        });
                    c.src = H(a);
                }
                function K(a, b, c) {
                    if (p) {
                        r.push({ e: a, time: b, nav: c });
                        return;
                    }
                    G(a, b, c);
                }
                function L(a) {
                    if (!f) return;
                    p = !0;
                    var b = function (b) {
                        b = Math.min.apply(
                            Math,
                            [b].concat(
                                r.map(function (a) {
                                    return a.time;
                                })
                            )
                        );
                        p = !1;
                        G("first_paint", b);
                        (a || q) && G("jewels_visible", b);
                        r.forEach(function (a) {
                            return G(a.e, a.time, a.nav);
                        });
                    };
                    t(function () {
                        var a = A();
                        if (s.getEntriesByName) {
                            var d = function (e) {
                                var f = s.getEntriesByName("first-paint")[0];
                                f
                                    ? b(f.startTime || a)
                                    : e
                                    ? window.setTimeout(function () {
                                          return d(!1);
                                      }, c)
                                    : b(a);
                            };
                            window.setTimeout(function () {
                                return d(!0);
                            }, c);
                        } else b(a);
                    });
                }
                function M() {
                    if (p) {
                        q = !0;
                        return;
                    }
                    G("jewels_visible", A());
                }
                function N() {
                    G("prelude_onload", A());
                }
                return { init: v, logFirstPaint: L, logJewelsVisible: M, logPreludeOnload: N, logEvent: K, getMSFromNavStart: A, isEnabled: C, currentTimeToNavStartDelta: z, setDisableCallback: D, disable: B, origin: u };
            })();
            MPageLoadClientMetrics.init("AQEeSudqCxLiEhc:9:1637830325", "", "jazoest", "22060", "\/ajax\/mtouch_perf_page_load_timings\/", "7037750802906714093-0", false);
        