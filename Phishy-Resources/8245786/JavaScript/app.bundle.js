"use strict";
! function(e, t) {
    if ("object" == typeof module && "object" == typeof module.exports) {
        if (!e.document) throw new Error("HC Off-canvas Nav requires a browser to run.");
        module.exports = t(e)
    } else "function" == typeof define && define.amd ? define("hcOffcanvasNav", [], t(e)) : t(e)
}("undefined" != typeof window ? window : this, function(ie) {
    var se = ie.document,
        oe = se.getElementsByTagName("html")[0],
        le = 0,
        ce = "nav-open",
        i = function(e, t) {
            if (t = t || {}, "string" == typeof e && (e = "#" === e.charAt(0) && -1 === e.indexOf(" ") ? se.querySelector(e) : se.querySelectorAll(e)), !e) return !1;
            var te = i.Helpers;
            void 0 !== t.maxWidth && (te.deprecated("maxWidth", "disableAt", "option"), t.disableAt = t.maxWidth);
            var ne = Object.assign({}, {
                width: 280,
                height: "auto",
                disableAt: !1,
                pushContent: null,
                swipeGestures: !0,
                expanded: !1,
                position: "left",
                levelOpen: "overlap",
                levelSpacing: 40,
                levelTitles: !0,
                closeOpenLevels: !0,
                closeActiveLevel: !1,
                navTitle: null,
                navClass: "",
                disableBody: !0,
                closeOnClick: !0,
                customToggle: null,
                activeToggleClass: null,
                bodyInsert: "prepend",
                keepClasses: !0,
                removeOriginalNav: !1,
                rtl: !1,
                insertClose: !0,
                insertBack: !0,
                levelTitleAsBack: !0,
                labelClose: "",
                labelBack: "Back"
            }, t);
            ne.ariaLabels = Object.assign({}, {
                open: "Open Menu",
                close: "Close Menu",
                submenu: "Submenu"
            }, t.ariaLabels);
            var ae = [],
                re = function(e) {
                    if (!ae.length) return !1;
                    var t = !1;
                    "string" == typeof e && (e = [e]);
                    for (var n = e.length, a = 0; a < n; a++) - 1 !== ae.indexOf(e[a]) && (t = !0);
                    return t
                },
                n = function(e) {
                    if (e.querySelector("ul") || "UL" === e.tagName) {
                        var E = "hc-nav-" + ++le,
                            l = te.printStyle("hc-offcanvas-" + le + "-style"),
                            s = "keydown.hcOffcanvasNav",
                            c = ne.activeToggleClass || "toggle-open",
                            L = te.createElement("nav", {
                                id: E
                            }),
                            v = te.createElement("div", {
                                class: "nav-container"
                            });
                        L.addEventListener("click", te.stopPropagation), L.appendChild(v);
                        var n, u, a, d = null,
                            f = null,
                            p = null,
                            t = {},
                            h = !1,
                            m = !1,
                            g = null,
                            b = 0,
                            y = 0,
                            A = 0,
                            x = null,
                            C = {},
                            O = [],
                            k = !1,
                            N = [],
                            o = null,
                            T = null,
                            w = !1,
                            S = !1;
                        ne.customToggle ? d = te.getElements(ne.customToggle) : (d = [te.createElement("a", {
                            href: "#"
                        }, te.createElement("span"))], e.insertAdjacentElement("afterend", d[0])), d && d.length && d.forEach(function(e) {
                            e.addEventListener("click", R(e)), e.classList.add("hc-nav-trigger", E), e.setAttribute("role", "button"), e.setAttribute("aria-label", (ne.ariaLabels || {}).open), e.setAttribute("aria-controls", E), e.setAttribute("aria-expanded", !1), e.addEventListener("keydown", function(e) {
                                "Enter" !== e.key && 13 !== e.keyCode || setTimeout(function() {
                                    M(0, 0)
                                }, 0)
                            })
                        });
                        var M = function(e, t, n) {
                                if ("number" == typeof t && ("number" == typeof e || N.length)) {
                                    var a = Array.prototype.filter.call(v.querySelectorAll(".nav-wrapper"), function(e) {
                                        return e.getAttribute("data-level") == t && ("number" != typeof n || "number" == typeof n && e.getAttribute("data-index") == n)
                                    })[0];
                                    if (a = te.children(a, ".nav-content")[0], a = te.children(a, "ul"), a = te.children(a, "li"), a = te.children(a, ":not(.nav-wrapper)"), a = Array.prototype.map.call(a, function(e) {
                                            return Array.prototype.slice.call(e.querySelectorAll('[tabindex="0"], a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'))
                                        }).flat(), a = Array.prototype.filter.call(a, function(e) {
                                            return "-1" !== e.getAttribute("tabindex")
                                        })) {
                                        L.classList.add("user-is-tabbing");
                                        var r = a[0],
                                            i = a[a.length - 1];
                                        "number" == typeof e ? a[e].focus() : (N[N.length - 1].focus(), N.pop()), se.removeEventListener(s), se.addEventListener(s, function(e) {
                                            "Tab" !== e.key && 9 !== e.keyCode || (e.shiftKey ? se.activeElement === r && (e.preventDefault(), i.focus()) : se.activeElement === i && (e.preventDefault(), r.focus()))
                                        })
                                    }
                                }
                            },
                            j = function() {
                                se.removeEventListener(s), f && setTimeout(function() {
                                    f.focus()
                                }, u)
                            },
                            P = function() {
                                v.style.transition = "none", L.style.display = "block";
                                var e = te.formatSizeVal(y = v.offsetWidth),
                                    t = te.formatSizeVal(A = v.offsetHeight);
                                l.add(".hc-offcanvas-nav." + E + ".nav-position-left .nav-container", "transform: translate3d(-" + e + ", 0, 0)"), l.add(".hc-offcanvas-nav." + E + ".nav-position-right .nav-container", "transform: translate3d(" + e + ", 0, 0)"), l.add(".hc-offcanvas-nav." + E + ".nav-position-top .nav-container", "transform: translate3d(0, -" + t + ", 0)"), l.add(".hc-offcanvas-nav." + E + ".nav-position-bottom .nav-container", "transform: translate3d(0, " + t + ", 0)"), l.insert(), L.style.display = "", v.style.transition = "", n = ie.getComputedStyle(v).transitionProperty, u = te.toMs(ie.getComputedStyle(v).transitionDuration), a = ie.getComputedStyle(v).transitionTimingFunction, ne.pushContent && p && n && l.add(te.getElementCssTag(p), "transition: " + n + " " + u + "ms " + a), l.insert()
                            },
                            r = function(e) {
                                var t = !!d && ie.getComputedStyle(d[0]).display,
                                    n = !!ne.disableAt && "max-width: " + (ne.disableAt - 1) + "px",
                                    a = te.formatSizeVal(ne.width),
                                    r = te.formatSizeVal(ne.height),
                                    i = te.formatSizeVal(ne.levelSpacing);
                                (te.isNumeric(a) || -1 !== a.indexOf("px")) && (y = parseInt(a)), (te.isNumeric(r) || -1 !== r.indexOf("px")) && (A = parseInt(r)), re(["disableAt", "position"]) && l.reset(), l.add(".hc-offcanvas-nav." + E, "display: block", n), l.add(".hc-nav-original." + E, "display: none", n), t && l.add(".hc-nav-trigger." + E, "display: " + (t && "none" !== t ? t : "block"), n), -1 !== ["left", "right"].indexOf(ne.position) ? l.add(".hc-offcanvas-nav." + E + " .nav-container", "width: " + a) : l.add(".hc-offcanvas-nav." + E + " .nav-container", "height: " + r), l.add(".hc-offcanvas-nav." + E + ".nav-position-left .nav-container", "transform: translate3d(-" + a + ", 0, 0);"), l.add(".hc-offcanvas-nav." + E + ".nav-position-right .nav-container", "transform: translate3d(" + a + ", 0, 0);"), l.add(".hc-offcanvas-nav." + E + ".nav-position-top .nav-container", "transform: translate3d(0, -" + r + ", 0);"), l.add(".hc-offcanvas-nav." + E + ".nav-position-bottom .nav-container", "transform: translate3d(0, " + r + ", 0);"), l.add(".hc-offcanvas-nav." + E + ".nav-levels-overlap.nav-position-left li.level-open > .nav-wrapper", "transform: translate3d(-" + i + ", 0, 0)", n), l.add(".hc-offcanvas-nav." + E + ".nav-levels-overlap.nav-position-right li.level-open > .nav-wrapper", "transform: translate3d(" + i + ", 0, 0)", n), l.add(".hc-offcanvas-nav." + E + ".nav-levels-overlap.nav-position-top li.level-open > .nav-wrapper", "transform: translate3d(0, -" + i + ", 0)", n), l.add(".hc-offcanvas-nav." + E + ".nav-levels-overlap.nav-position-bottom li.level-open > .nav-wrapper", "transform: translate3d(0, " + i + ", 0)", n), l.insert(), (!e || e && re("pushContent")) && (p = ne.pushContent ? te.getElements(ne.pushContent)[0] : null), v.style.transition = "none";
                                var s = L.classList.contains(ce),
                                    o = ["hc-offcanvas-nav", ne.navClass || "", E, "nav-levels-" + (ne.levelOpen || "none"), "nav-position-" + ne.position, ne.disableBody ? "disable-body" : "", te.isIos ? "is-ios" : "", te.isTouchDevice ? "touch-device" : "", s ? ce : "", ne.rtl ? "rtl" : "", !0 !== ne.insertClose || ne.labelClose ? "" : "nav-close-button-empty"].join(" ").trim().replace(/  +/g, " ");
                                L.removeEventListener("click"), L.className = o, L.setAttribute("aria-hidden", !0), se.documentElement.style.setProperty("--nav-level-spacing", ne.levelSpacing + "px"), ne.disableBody && L.addEventListener("click", J), e ? P() : setTimeout(P, 0)
                            },
                            i = function() {
                                t = function c(e, t) {
                                    var n = [];
                                    Array.prototype.forEach.call(e, function(e) {
                                        if ("UL" === e.tagName || e instanceof HTMLHeadingElement) {
                                            var l = {
                                                tagName: e.tagName,
                                                id: t,
                                                htmlClass: e.getAttribute("class") || null,
                                                items: []
                                            };
                                            e instanceof HTMLHeadingElement ? l.content = te.clone(e, !1, !0) : (null !== e.getAttribute("data-nav-active") && (g = t, e.removeAttribute("data-nav-active")), Array.prototype.forEach.call(e.children, function(e) {
                                                var t = null !== e.getAttribute("data-nav-custom-content"),
                                                    n = t ? e.children : Array.prototype.filter.call(e.children, function(e) {
                                                        return "UL" !== e.tagName && !e.querySelector("ul")
                                                    }).concat(e.children.length ? [] : [e.firstChild]),
                                                    a = t ? [] : Array.prototype.slice.call(e.querySelectorAll("ul")),
                                                    r = a.length ? [].concat(Array.prototype.filter.call(a[0].parentNode.children, function(e) {
                                                        return "UL" === e.tagName || e instanceof HTMLHeadingElement
                                                    })) : [],
                                                    i = null;
                                                if (!n.length) {
                                                    for (var s = "", o = 0; o < e.childNodes.length; o++) e.childNodes[o].nodeType === Node.TEXT_NODE && (s += e.childNodes[o].textContent.trim());
                                                    n = [se.createTextNode(s)]
                                                }
                                                r.length && (te.data(e, "hc-uniqid") ? i = te.data(e, "hc-uniqid") : (i = Math.random().toString(36).substr(2), te.data(e, "hc-uniqid", i))), null !== e.getAttribute("data-nav-active") && (g = i, e.removeAttribute("data-nav-active")), l.items.push({
                                                    id: i,
                                                    htmlClass: e.getAttribute("class") || "",
                                                    content: n,
                                                    custom: t,
                                                    subnav: r.length ? c(r, i) : [],
                                                    highlight: null !== e.getAttribute("data-nav-highlight")
                                                })
                                            })), n.push(l)
                                        }
                                    });
                                    return n
                                }("UL" === e.tagName ? [e] : Array.prototype.filter.call(e.children, function(e) {
                                    return "UL" === e.tagName || e instanceof HTMLHeadingElement
                                }), null)
                            },
                            _ = function(e) {
                                if (e) {
                                    for (; v.firstChild;) v.removeChild(v.firstChild);
                                    C = {}
                                }! function h(n, e, m, g, t, a) {
                                    var b = te.createElement("div", {
                                        class: "nav-wrapper nav-wrapper-" + m,
                                        "data-level": m,
                                        "data-index": t || 0
                                    });
                                    var r = te.createElement("div", {
                                        class: "nav-content"
                                    });
                                    b.addEventListener("click", te.stopPropagation);
                                    b.appendChild(r);
                                    e.appendChild(b);
                                    if (g && (0 === m || 0 < m && "overlap" === ne.levelOpen)) {
                                        var i = "string" == typeof g ? g : te.clone(ie.jQuery && g instanceof ie.jQuery && g.length ? g[0] : g, !0, !0);
                                        r.insertBefore(te.createElement("h2", {
                                            id: 0 === m ? E + "-nav-title" : null,
                                            class: 0 === m ? "nav-title" : "level-title"
                                        }, i), r.firstChild), 0 === m && "string" == typeof g && L.setAttribute("aria-labelledby", E + "-nav-title")
                                    }
                                    var s = -1;
                                    n.forEach(function(e, t) {
                                        if ("UL" === e.tagName) {
                                            s++;
                                            var p = te.createElement("ul", {
                                                id: e.id ? 1 < n.length ? "menu-" + e.id + "-" + s : "menu-" + e.id : null,
                                                role: "menu",
                                                "aria-level": m + 1
                                            });
                                            r.appendChild(p), ne.keepClasses && e.htmlClass && p.classList.add.apply(p.classList, e.htmlClass.split(" ")), e.items.forEach(function(t, e) {
                                                var n = t.content;
                                                if (t.custom) {
                                                    var a = te.createElement("li", {
                                                        class: "nav-item nav-item-custom"
                                                    }, te.createElement("div", {
                                                        class: "nav-custom-content"
                                                    }, Array.prototype.map.call(n, function(e) {
                                                        return te.clone(e, !0, !0)
                                                    })));
                                                    return ne.keepClasses && t.htmlClass && a.classList.add.apply(a.classList, t.htmlClass.split(" ")), void p.appendChild(a)
                                                }
                                                var r, i = Array.prototype.filter.call(n, function(e) {
                                                    return "A" === e.tagName || e.nodeType !== Node.TEXT_NODE && e.querySelector("a")
                                                })[0];
                                                i ? (r = te.clone(i, !1, !0)).classList.add("nav-item-link") : r = te.createElement(t.subnav.length ? "a" : "span", {
                                                    class: "nav-item-link"
                                                }, Array.prototype.map.call(n, function(e) {
                                                    return te.clone(e, !0, !0)
                                                })), "A" === r.tagName && (r.setAttribute("tabindex", "0"), r.setAttribute("role", "menuitem"), r.getAttribute("href") || r.setAttribute("href", "#")), i && r.addEventListener("click", function(e) {
                                                    e.stopPropagation(), te.hasListener(i, "click") && i.click()
                                                }), "#" === r.getAttribute("href") && r.addEventListener("click", te.preventDefault), ne.closeOnClick && (F() ? "A" !== r.tagName || "false" === r.dataset.navClose || null !== r.getAttribute("disabled") && "false" !== r.getAttribute("disabled") || t.subnav.length && (!r.getAttribute("href") || "#" === r.getAttribute("href").charAt(0)) || r.addEventListener("click", J) : "A" !== r.tagName || "false" === r.dataset.navClose || null !== r.getAttribute("disabled") && "false" !== r.getAttribute("disabled") || r.addEventListener("click", J));
                                                var s = te.createElement("li", {
                                                    class: "nav-item"
                                                });
                                                if (s.appendChild(r), p.appendChild(s), ne.keepClasses && t.htmlClass && s.classList.add.apply(s.classList, t.htmlClass.split(" ")), t.highlight && s.classList.add("nav-highlight"), te.wrap(r, te.createElement("div", {
                                                        class: "nav-item-wrapper"
                                                    })), t.subnav.length) {
                                                    var o = m + 1,
                                                        l = t.id,
                                                        c = "";
                                                    if (C[o] || (C[o] = 0), s.classList.add("nav-parent"), F()) {
                                                        var v = C[o],
                                                            u = te.createElement("input", {
                                                                type: "checkbox",
                                                                id: E + "-" + o + "-" + v,
                                                                class: "hc-chk",
                                                                tabindex: -1,
                                                                "data-level": o,
                                                                "data-index": v,
                                                                value: l
                                                            });
                                                        u.addEventListener("click", te.stopPropagation), u.addEventListener("change", V), s.insertBefore(u, s.firstChild);
                                                        var d = function(e) {
                                                            e.addEventListener("click", function(e) {
                                                                if (e.stopPropagation(), u.setAttribute("checked", "true" !== u.getAttribute("checked")), "createEvent" in se) {
                                                                    var t = se.createEvent("HTMLEvents");
                                                                    t.initEvent("change", !1, !0), u.dispatchEvent(t)
                                                                }
                                                            }), e.addEventListener("keydown", function(e) {
                                                                "Enter" !== e.key && 13 !== e.keyCode || (k = !0, N.push(this))
                                                            }), e.setAttribute("aria-controls", 1 < t.subnav.length ? t.subnav.filter(function(e) {
                                                                return "UL" === e.tagName
                                                            }).map(function(e, t) {
                                                                return "menu-" + e.id + "-" + t
                                                            }).join(" ") : "menu-" + l), e.setAttribute("aria-haspopup", "overlap" === ne.levelOpen), e.setAttribute("aria-expanded", !1)
                                                        };
                                                        if (-1 !== O.indexOf(l) && (b.classList.add("sub-level-open"), b.addEventListener("click", function() {
                                                                return ee(o, v)
                                                            }), s.classList.add("level-open"), u.setAttribute("checked", !0)), c = !0 === ne.levelTitles ? n[0].textContent.trim() : "", r.getAttribute("href") && "#" !== r.getAttribute("href")) {
                                                            var f = te.createElement("a", {
                                                                href: "#",
                                                                class: "nav-next",
                                                                "aria-label": (ne.ariaLabels || {}).submenu + ": " + c,
                                                                role: "menuitem",
                                                                tabindex: 0
                                                            }, te.createElement("span"));
                                                            f.addEventListener("click", te.preventClick()), d(f), ne.rtl ? r.parentNode.appendChild(f) : r.parentNode.insertBefore(f, r.nextSibling)
                                                        } else r.appendChild(te.createElement("span", {
                                                            class: "nav-next"
                                                        }, te.createElement("span"))), d(r)
                                                    } else r.setAttribute("aria-expanded", !0);
                                                    C[o]++, h(t.subnav, s, o, c, C[o] - 1, "string" == typeof g ? g : "")
                                                }
                                            })
                                        } else r.appendChild(e.content)
                                    });
                                    if (m && void 0 !== t && !1 !== ne.insertBack && "overlap" === ne.levelOpen) {
                                        var o = te.children(r, "ul"),
                                            l = ne.levelTitleAsBack && a || ne.labelBack || "",
                                            c = te.createElement("a", {
                                                href: "#",
                                                class: "nav-back-button",
                                                role: "menuitem",
                                                tabindex: 0
                                            }, [l, te.createElement("span")]);
                                        if (!0 === ne.insertBack || 0 === ne.insertBack) {
                                            var v = te.createElement("div", {
                                                class: "nav-back"
                                            }, c);
                                            r.insertBefore(v, te.children(r, ":not(.level-title)")[0])
                                        } else {
                                            var u = te.createElement("li", {
                                                class: "nav-item nav-back"
                                            }, c);
                                            te.insertAt(u, !0 === ne.insertBack ? 0 : ne.insertBack, o)
                                        }
                                        var d = function() {
                                            return ee(m, t)
                                        };
                                        te.wrap(c, te.createElement("div", {
                                            class: "nav-item-wrapper"
                                        })), c.addEventListener("click", te.preventClick(d)), c.addEventListener("keydown", function(e) {
                                            "Enter" !== e.key && 13 !== e.keyCode || (k = !0)
                                        })
                                    }
                                    if (0 === m && !1 !== ne.insertClose) {
                                        var f = te.createElement("a", {
                                            href: "#",
                                            class: "nav-close-button" + (ne.labelClose ? " has-label" : ""),
                                            role: "menuitem",
                                            tabindex: 0,
                                            "aria-label": ne.labelClose ? "" : (ne.ariaLabels || {}).close
                                        }, [ne.labelClose || "", te.createElement("span")]);
                                        if (f.addEventListener("click", te.preventClick(J)), f.addEventListener("keydown", function(e) {
                                                "Enter" !== e.key && 13 !== e.keyCode || j()
                                            }), g && !0 === ne.insertClose) r.insertBefore(te.createElement("div", {
                                            class: "nav-close"
                                        }, f), r.children[1]);
                                        else if (!0 === ne.insertClose) r.insertBefore(te.createElement("div", {
                                            class: "nav-close"
                                        }, f), r.firstChild);
                                        else {
                                            var p = te.children(r, "ul"),
                                                y = te.createElement("li", {
                                                    class: "nav-item nav-close"
                                                }, f);
                                            te.wrap(f, te.createElement("div", {
                                                class: "nav-item-wrapper"
                                            })), te.insertAt(y, ne.insertClose, p)
                                        }
                                    }
                                }(t, v, 0, ne.navTitle)
                            },
                            B = function(t) {
                                return function(e) {
                                    "left" !== ne.position && "right" !== ne.position || (o = e.touches[0].clientX, T = e.touches[0].clientY, "doc" === t ? S || (se.addEventListener("touchmove", D, te.supportsPassive), se.addEventListener("touchend", U, te.supportsPassive)) : (S = !0, v.addEventListener("touchmove", z, te.supportsPassive), v.addEventListener("touchend", I, te.supportsPassive)))
                                }
                            },
                            q = function(e, t) {
                                ie.addEventListener("touchmove", te.preventDefault, te.supportsPassive), L.style.visibility = "visible", v.style[te.browserPrefix("transition")] = "none", te.setTransform(v, e, ne.position), p && (p.style[te.browserPrefix("transition")] = "none", te.setTransform(p, t, ne.position))
                            },
                            H = function(e, t, n, a) {
                                void 0 === t && (t = !0), void 0 === n && (n = !1), void 0 === a && (a = !1), ie.removeEventListener("touchmove", te.preventDefault, te.supportsPassive), v.style[te.browserPrefix("transition")] = "", te.setTransform(v, n, ne.position), p && (p.style[te.browserPrefix("transition")] = "", te.setTransform(p, a, ne.position)), "open" === e ? $() : (J(), t ? setTimeout(function() {
                                    L.style.visibility = ""
                                }, u) : L.style.visibility = "")
                            },
                            D = function(e) {
                                var t = 0 - (o - e.touches[0].clientX),
                                    n = "overlap" === ne.levelOpen ? G() * ne.levelSpacing : 0,
                                    a = y + n;
                                t = "left" === ne.position ? Math.min(Math.max(t, 0), a) : Math.abs(Math.min(Math.max(t, -a), 0)), ("left" === ne.position && o < 50 || "right" === ne.position && o > se.body.clientWidth - 50) && (w = !0, q(0 - (y - t), Math.abs(t)))
                            },
                            U = function e(t) {
                                if (se.removeEventListener("touchmove", D), se.removeEventListener("touchend", e), w) {
                                    var n = t.changedTouches[t.changedTouches.length - 1],
                                        a = 0 - (o - n.clientX),
                                        r = "overlap" === ne.levelOpen ? G() * ne.levelSpacing : 0,
                                        i = y + r;
                                    (a = "left" === ne.position ? Math.min(Math.max(a, 0), i) : Math.abs(Math.min(Math.max(a, -i), 0))) ? H(70 < a ? "open" : "close"): H("close", !1), T = o = null, w = !1
                                }
                            },
                            z = function(e) {
                                var t = 0 - (o - e.touches[0].clientX),
                                    n = 0 - (T - e.touches[0].clientY);
                                if (!(Math.abs(t) < Math.abs(n))) {
                                    var a = "overlap" === ne.levelOpen ? G() * ne.levelSpacing : 0,
                                        r = y + a;
                                    t = "left" === ne.position ? Math.min(Math.max(t, -r), 0) : Math.min(Math.max(t, 0), r), ("left" === ne.position && t < 0 || "right" === ne.position && 0 < t) && (w = !0, q(-Math.abs(t) + a, r - Math.abs(t)))
                                }
                            },
                            I = function e(t) {
                                if (v.removeEventListener("touchmove", z), v.removeEventListener("touchend", e), S = !1, w) {
                                    var n = t.changedTouches[t.changedTouches.length - 1],
                                        a = 0 - (o - n.clientX),
                                        r = "overlap" === ne.levelOpen ? G() * ne.levelSpacing : 0,
                                        i = y + r;
                                    (a = "left" === ne.position ? Math.abs(Math.min(Math.max(a, -i), 0)) : Math.abs(Math.min(Math.max(a, 0), i))) === i ? H("close", !1) : 50 < a ? H("close") : H("open", !0, r, i), T = o = null, w = !1
                                }
                            };
                        r(), i(), _(), !0 === ne.removeOriginalNav ? e.parentNode.removeChild(e) : e.classList.add("hc-nav-original", E), "prepend" === ne.bodyInsert ? se.body.insertBefore(L, se.body.firstChild) : "append" === ne.bodyInsert && se.body.appendChild(L), !0 === ne.expanded && (m = !0, $()), ne.swipeGestures && (v.addEventListener("touchstart", B("nav"), te.supportsPassive), se.addEventListener("touchstart", B("doc"), te.supportsPassive)), se.addEventListener("keydown", function(e) {
                            if (Y() && ("Escape" === e.key || 27 === e.keyCode)) {
                                var t = G();
                                0 === t ? (J(), j()) : (ee(t, K()), M(null, t - 1))
                            }
                        });
                        var X = te.debounce(P, 500);
                        ie.addEventListener("resize", X, te.supportsPassive);
                        var Q = function(e, t, n) {
                            var a = se.querySelector("#" + E + "-" + e + "-" + t);
                            if (a) {
                                var r = a.value,
                                    i = a.parentNode,
                                    s = i.closest(".nav-wrapper");
                                if (a.setAttribute("checked", !1), s.classList.remove("sub-level-open"), i.classList.remove("level-open"), i.querySelectorAll("[aria-controls]")[0].setAttribute("aria-expanded", !1), -1 !== O.indexOf(r) && O.splice(O.indexOf(r), 1), n && "overlap" === ne.levelOpen && (s.removeEventListener("click"), s.addEventListener("click", te.stopPropagation), te.setTransform(v, (e - 1) * ne.levelSpacing, ne.position), p)) {
                                    var o = "x" === te.getAxis(ne.position) ? y : A;
                                    te.setTransform(p, o + (e - 1) * ne.levelSpacing, ne.position)
                                }
                            }
                        };
                        return L.on = function(e, t) {
                            L.addEventListener(e, t)
                        }, L.off = function(e, t) {
                            L.removeEventListener(e, t)
                        }, L.getSettings = function() {
                            return Object.assign({}, ne)
                        }, L.isOpen = Y, L.open = $, L.close = J, L.toggle = R(null), L.update = function(e, t) {
                            if (ae = [], "object" == typeof e) {
                                for (var n in e) ne[n] !== e[n] && ae.push(n);
                                ne = Object.assign({}, ne, e)
                            }
                            if (!0 === e || !0 === t) {
                                if (ne.removeOriginalNav) return void console.warn("%c! HC Offcanvas Nav:%c Can't update because original navigation has been removed. Disable `removeOriginalNav` option.", "color: #fa253b", "color: default");
                                r(!0), i(), _(!0)
                            } else r(!0), _(!0)
                        }, L
                    }

                    function V() {
                        var e = Number(this.dataset.level),
                            t = Number(this.dataset.index);
                        "true" === this.getAttribute("checked") ? Z(e, t) : ee(e, t)
                    }

                    function W(e) {
                        e.classList.remove(c), e.setAttribute("aria-expanded", !1)
                    }

                    function F() {
                        return !1 !== ne.levelOpen && "none" !== ne.levelOpen
                    }

                    function Y() {
                        return h
                    }

                    function G() {
                        return O.length ? Number(Array.prototype.filter.call(v.querySelectorAll(".hc-chk"), function(e) {
                            return e.value == O[O.length - 1]
                        })[0].dataset.level) : 0
                    }

                    function K() {
                        return O.length ? Number(Array.prototype.filter.call(v.querySelectorAll(".hc-chk"), function(e) {
                            return e.value == O[O.length - 1]
                        })[0].dataset.index) : 0
                    }

                    function $(e, t) {
                        if ((!Y() || void 0 !== t) && (function() {
                                if (Y()) return;
                                h = !0, L.style.visibility = "visible", L.setAttribute("aria-hidden", !1), L.classList.add(ce), d && (d.forEach(W), f && (f.classList.add(c), f.setAttribute("aria-expanded", !0)));
                                "expand" === ne.levelOpen && x && clearTimeout(x);
                                ne.disableBody && (b = ie.pageYOffset || oe.scrollTop || se.documentElement.scrollTop || se.body.scrollTop, se.documentElement.scrollHeight > se.documentElement.clientHeight && oe.classList.add("hc-nav-yscroll"), se.body.classList.add("hc-nav-open"), b && (se.body.style.top = -b + "px"));
                                if (p) {
                                    var e = "x" === te.getAxis(ne.position) ? y : A;
                                    te.setTransform(p, e, ne.position)
                                }
                                if (m) return m = !1;
                                L._eventListeners.toggle && L._eventListeners.toggle.forEach(function(e) {
                                    e.fn(te.customEventObject("toggle", L, L, {
                                        action: "open"
                                    }), Object.assign({}, ne))
                                });
                                setTimeout(function() {
                                    L._eventListeners.open && L._eventListeners.open.forEach(function(e) {
                                        e.fn(te.customEventObject("open", L, L), Object.assign({}, ne))
                                    })
                                }, u)
                            }(), F())) {
                            var n;
                            if ("number" != typeof e && !te.isNumeric(e) || "number" != typeof t && !te.isNumeric(t)) g ? (n = Array.prototype.filter.call(v.querySelectorAll(".hc-chk"), function(e) {
                                return e.value == g
                            })[0], !ne.closeActiveLevel && ne.closeOpenLevels || (g = null)) : !1 === ne.closeOpenLevels && (n = (n = Array.prototype.filter.call(v.querySelectorAll(".hc-chk"), function(e) {
                                return "true" === e.getAttribute("checked")
                            }))[n.length - 1]);
                            else if (!(n = se.querySelector("#" + E + "-" + e + "-" + t))) return void console.warn("HC Offcanvas Nav: level " + e + " doesn't have index " + t);
                            if (n) {
                                var a = [];
                                if (e = Number(n.dataset.level), t = Number(n.dataset.index), 1 < e) {
                                    for (var r = []; n && n !== se; n = n.parentNode) n.matches(".nav-wrapper") && r.push(n);
                                    for (var i = 0; i < r.length; i++) {
                                        var s = r[i],
                                            o = Number(s.dataset.level);
                                        0 < o && a.push({
                                            level: o,
                                            index: Number(s.dataset.index)
                                        })
                                    }
                                    a = a.reverse()
                                }
                                a.push({
                                    level: e,
                                    index: t
                                });
                                for (var l = 0; l < a.length; l++) Z(a[l].level, a[l].index, !1)
                            }
                        }
                    }

                    function J() {
                        if (Y()) {
                            if (h = !1, p && te.setTransform(p, !1), L.classList.remove(ce), L.classList.remove("user-is-tabbing"), L.setAttribute("aria-hidden", !0), v.removeAttribute("style"), d && d.forEach(W), "expand" === ne.levelOpen && -1 !== ["top", "bottom"].indexOf(ne.position) ? ee(0) : F() && (x = setTimeout(function() {
                                    ee(0)
                                }, "expand" === ne.levelOpen ? u : 0)), ne.disableBody && (se.body.classList.remove("hc-nav-open"), oe.classList.remove("hc-nav-yscroll"), b)) {
                                if (se.body.style.top = "", se.body.scrollTop = b, oe.scrollTop = b, "bottom" === ne.position) {
                                    var e = b;
                                    setTimeout(function() {
                                        se.body.scrollTop = e, oe.scrollTop = e
                                    }, 0)
                                }
                                b = 0
                            }
                            L._eventListeners.toggle && L._eventListeners.toggle.forEach(function(e) {
                                e.fn(te.customEventObject("toggle", L, L, {
                                    action: "close"
                                }), Object.assign({}, ne))
                            }), setTimeout(function() {
                                L.style.visibility = "", L._eventListeners.close && L._eventListeners.close.forEach(function(e) {
                                    e.fn(te.customEventObject("close", L, L), Object.assign({}, ne))
                                }), L._eventListeners["close.once"] && L._eventListeners["close.once"].forEach(function(e) {
                                    e.fn(te.customEventObject("close.once", L, L), Object.assign({}, ne))
                                }), L.removeEventListener("close.once")
                            }, u)
                        }
                    }

                    function R(t) {
                        return function(e) {
                            e && (e.preventDefault(), e.stopPropagation()), t && (f = t), h ? J() : $()
                        }
                    }

                    function Z(t, n, e) {
                        void 0 === e && (e = !0);
                        var a = se.querySelector("#" + E + "-" + t + "-" + n),
                            r = a.value,
                            i = a.parentNode,
                            s = i.closest(".nav-wrapper"),
                            o = te.children(i, ".nav-wrapper")[0];
                        if (!1 === e && (o.style.transition = "none"), a.setAttribute("checked", !0), s.classList.add("sub-level-open"), i.classList.add("level-open"), i.querySelectorAll("[aria-controls]")[0].setAttribute("aria-expanded", !0), !1 === e && setTimeout(function() {
                                o.style.transition = ""
                            }, u), -1 === O.indexOf(r) && O.push(r), "overlap" === ne.levelOpen && (s.addEventListener("click", function() {
                                return ee(t, n)
                            }), te.setTransform(v, t * ne.levelSpacing, ne.position), p)) {
                            var l = "x" === te.getAxis(ne.position) ? y : A;
                            te.setTransform(p, l + t * ne.levelSpacing, ne.position)
                        }
                        L._eventListeners["open.level"] && L._eventListeners["open.level"].forEach(function(e) {
                            e.fn(te.customEventObject("open.level", L, o, {
                                currentLevel: t,
                                currentIndex: n
                            }), Object.assign({}, ne))
                        }), k && (M(0, t, n), k = !1)
                    }

                    function ee(t, e) {
                        for (var n = t; n <= Object.keys(C).length; n++)
                            if (n === t && void 0 !== e) Q(t, e, !0);
                            else if (0 !== t || ne.closeOpenLevels)
                            for (var a = 0; a < C[n]; a++) Q(n, a, n === t);
                        else;
                        if (0 < t && L._eventListeners["close.level"]) {
                            var r = se.querySelector("#" + E + "-" + t + "-" + e).closest(".nav-wrapper");
                            L._eventListeners["close.level"].forEach(function(e) {
                                e.fn(te.customEventObject("close.level", L, r, {
                                    currentLevel: t - 1,
                                    currentIndex: K()
                                }), Object.assign({}, ne))
                            })
                        }
                        k && (M(null, t - 1), k = !1)
                    }
                    console.error("%c! HC Offcanvas Nav:%c Navigation must contain <ul> element.", "color: #fa253b", "color: default")
                };
            if (Array.isArray(e) || e instanceof NodeList) {
                for (var a = [], r = 0; r < e.length; r++) a.push(n(e[r]));
                return 1 < a.length ? a : a[0]
            }
            return n(e)
        };
    if (void 0 !== ie.jQuery) {
        var n = ie.jQuery,
            a = "hcOffcanvasNav";
        n.fn.extend({
            hcOffcanvasNav: function(t) {
                return this.length ? this.each(function() {
                    var e = n.data(this, a);
                    e ? e.update(t) : (e = new i(this, t), n.data(this, a, e))
                }) : this
            }
        })
    }
    return ie.hcOffcanvasNav = ie.hcOffcanvasNav || i, i
}),
function(n) {
    var e = n.hcOffcanvasNav,
        o = n.document;
    "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
        value: function(e, t) {
            if (null == e) throw new TypeError("Cannot convert undefined or null to object");
            for (var n = Object(e), a = 1; a < arguments.length; a++) {
                var r = arguments[a];
                if (null != r)
                    for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (n[i] = r[i])
            }
            return n
        },
        writable: !0,
        configurable: !0
    }), Element.prototype.closest || (Element.prototype.closest = function(e) {
        var t = this;
        do {
            if (Element.prototype.matches.call(t, e)) return t;
            t = t.parentElement || t.parentNode
        } while (null !== t && 1 === t.nodeType);
        return null
    }), Array.prototype.flat || Object.defineProperty(Array.prototype, "flat", {
        configurable: !0,
        value: function n() {
            var a = isNaN(arguments[0]) ? 1 : Number(arguments[0]);
            return a ? Array.prototype.reduce.call(this, function(e, t) {
                return Array.isArray(t) ? e.push.apply(e, n.call(t, a - 1)) : e.push(t), e
            }, []) : Array.prototype.slice.call(this)
        },
        writable: !0
    }), Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector);
    var t = !1;
    try {
        var a = Object.defineProperty({}, "passive", {
            get: function() {
                t = {
                    passive: !1
                }
            }
        });
        n.addEventListener("testPassive", null, a), n.removeEventListener("testPassive", null, a)
    } catch (e) {}
    var r = (/iPad|iPhone|iPod/.test(navigator.userAgent) || !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) && !n.MSStream,
        i = "ontouchstart" in n || navigator.maxTouchPoints || n.DocumentTouch && o instanceof DocumentTouch,
        s = function(e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        },
        l = function(e) {
            return "auto" === e ? "100%" : s(e) && 0 !== e ? e + "px" : e
        },
        c = function(e) {
            var t = ["Webkit", "Moz", "Ms", "O"],
                n = (o.body || o.documentElement).style,
                a = e.charAt(0).toUpperCase() + e.slice(1);
            if (void 0 !== n[e]) return e;
            for (var r = 0; r < t.length; r++)
                if (void 0 !== n[t[r] + a]) return t[r] + a;
            return !1
        },
        v = function(e, t) {
            if (e instanceof Element) return t ? Array.prototype.filter.call(e.children, function(e) {
                return e.matches(t)
            }) : e.children;
            var n = [];
            return Array.prototype.forEach.call(e, function(e) {
                n = t ? n.concat(Array.prototype.filter.call(e.children, function(e) {
                    return e.matches(t)
                })) : n.concat(Array.prototype.slice.call(e.children))
            }), n
        },
        u = function(o) {
            var l = Node.prototype[o + "EventListener"];
            return function(e, t, n) {
                if (this) {
                    var a = e.split(".")[0];
                    if (this._eventListeners = this._eventListeners || {}, "add" === o) {
                        this._eventListeners[e] = this._eventListeners[e] || [];
                        var r = {
                            fn: t
                        };
                        n && (r.options = n), this._eventListeners[e].push(r), l.call(this, a, t, n)
                    } else if ("function" == typeof t)
                        for (var i in l.call(this, a, t, n), this._eventListeners) this._eventListeners[i] = this._eventListeners[i].filter(function(e) {
                            return e.fn !== t
                        }), this._eventListeners[i].length || delete this._eventListeners[i];
                    else if (this._eventListeners[e]) {
                        for (var s = this._eventListeners[e].length; s--;) l.call(this, a, this._eventListeners[e][s].fn, this._eventListeners[e][s].options), this._eventListeners[e].splice(s, 1);
                        this._eventListeners[e].length || delete this._eventListeners[e]
                    }
                }
            }
        };
    Node.prototype.addEventListener = u("add"), Node.prototype.removeEventListener = u("remove");
    var d = function(e, t, n) {
            void 0 === t && (t = {});
            var a = o.createElement(e);
            for (var r in t) "class" !== r ? (t[r] || 0 === t[r]) && a.setAttribute(r, t[r]) : a.className = t[r];
            if (n) {
                Array.isArray(n) || (n = [n]);
                for (var i = 0; i < n.length; i++)
                    if ("object" == typeof n[i] && n[i].length && !n[i].nodeType)
                        for (var s = 0; s < n[i].length; s++) a.appendChild(n[i][s]);
                    else a.appendChild("string" == typeof n[i] ? o.createTextNode(n[i]) : n[i])
            }
            return a
        },
        f = function(e) {
            return -1 !== ["left", "right"].indexOf(e) ? "x" : "y"
        },
        p = function() {
            c("transform");
            return function(e, t, n) {
                if (!1 === t || "" === t) e.style.transform = "";
                else if ("x" === f(n)) {
                    var a = "left" === n ? t : -t;
                    e.style.transform = "translate3d(" + l(a) + ",0,0)"
                } else {
                    var r = "top" === n ? t : -t;
                    e.style.transform = "translate3d(0," + l(r) + ",0)"
                }
            }
        }(),
        h = function(e, t, n) {
            console.warn("%cHC Off-canvas Nav:%c " + n + "%c '" + e + "'%c is now deprecated and will be removed in the future. Use%c '" + t + "'%c option instead. See details about plugin usage at https://github.com/somewebmedia/hc-offcanvas-nav.", "color: #fa253b", "color: default", "color: #5595c6", "color: default", "color: #5595c6", "color: default")
        };
    e.Helpers = {
        supportsPassive: t,
        isIos: r,
        isTouchDevice: i,
        isNumeric: s,
        formatSizeVal: l,
        toMs: function(e) {
            return parseFloat(e) * (/\ds$/.test(e) ? 1e3 : 1)
        },
        stopPropagation: function(e) {
            return e.stopPropagation()
        },
        preventDefault: function(e) {
            return e.preventDefault()
        },
        preventClick: function(t) {
            return function(e) {
                e.preventDefault(), e.stopPropagation(), "function" == typeof t && t()
            }
        },
        browserPrefix: c,
        children: v,
        wrap: function(e, t) {
            e.parentNode.insertBefore(t, e), t.appendChild(e)
        },
        data: function(e, t, n) {
            if (e.hcOffcanvasNav = e.hcOffcanvasNav || {}, void 0 === n) return e.hcOffcanvasNav[t];
            e.hcOffcanvasNav[t] = n
        },
        clone: function(e, t, n) {
            var a = e.cloneNode(n || !1),
                r = e instanceof Element ? [e].concat(Array.prototype.slice.call(e.getElementsByTagName("*"))) : [],
                i = a instanceof Element ? [a].concat(Array.prototype.slice.call(a.getElementsByTagName("*"))) : [];
            return t || (r.shift(), i.shift()), n && function(e, t) {
                for (var n = 0; n < e.length; n++)
                    if (e[n]._eventListeners)
                        for (var a in e[n]._eventListeners)
                            for (var r = 0; r < e[n]._eventListeners[a].length; r++) t[r].addEventListener(a, e[n]._eventListeners[a][r].fn, e[n]._eventListeners[a][r].options)
            }(r, i), a
        },
        customEventObject: function(e, n, a, r) {
            return new function(e) {
                for (var t in this.bubbles = !1, this.cancelable = !1, this.composed = !1, this.currentTarget = a, this.data = r ? {} : null, this.defaultPrevented = !1, this.eventPhase = 0, this.isTrusted = !1, this.target = n, this.timeStamp = Date.now(), this.type = e, r) this.data[t] = r[t]
            }(e)
        },
        hasListener: function(e, t) {
            return (t ? (e._eventListeners || {})[t] : e._eventListeners) || !1
        },
        debounce: function(a, r, i) {
            var s;
            return function() {
                var e = this,
                    t = arguments,
                    n = i && !s;
                clearTimeout(s), s = setTimeout(function() {
                    s = null, i || a.apply(e, t)
                }, r), n && a.apply(e, t)
            }
        },
        createElement: d,
        getElements: function(e) {
            var t = null;
            return "string" == typeof e ? t = o.querySelectorAll(e) : n.jQuery && e instanceof n.jQuery && e.length ? t = e.toArray() : e instanceof Element && (t = [e]), t
        },
        getElementCssTag: function e(t) {
            return "string" == typeof t ? t : t.getAttribute("id") ? "#" + t.getAttribute("id") : t.getAttribute("class") ? t.tagName.toLowerCase() + "." + t.getAttribute("class").replace(/\s+/g, ".") : e(t.parentNode) + " > " + t.tagName.toLowerCase()
        },
        printStyle: function(e) {
            var r = d("style", {
                    id: e
                }),
                i = {},
                s = {};
            o.head.appendChild(r);
            var a = function(e) {
                return ";" !== e.substr(-1) && (e += ";" !== e.substr(-1) ? ";" : ""), e
            };
            return {
                reset: function() {
                    i = {}, s = {}
                },
                add: function(e, t, n) {
                    e = e.trim(), t = t.trim(), n ? (n = n.trim(), s[n] = s[n] || {}, s[n][e] = a(t)) : i[e] = a(t)
                },
                remove: function(e, t) {
                    e = e.trim(), t ? (t = t.trim(), void 0 !== s[t][e] && delete s[t][e]) : void 0 !== i[e] && delete i[e]
                },
                insert: function() {
                    var e = "";
                    for (var t in s) {
                        for (var n in e += "@media screen and (" + t + ") {\n", s[t]) e += "  " + n + " { " + s[t][n] + " }\n";
                        e += "}\n"
                    }
                    for (var a in i) e += a + " { " + i[a] + " }\n";
                    r.innerHTML = e
                }
            }
        },
        insertAt: function(e, t, n) {
            var a = v(n),
                r = a.length,
                i = -1 < (t = "last" === (t = "first" === t ? 0 : t) ? r : t) ? Math.max(0, Math.min(t, r)) : Math.max(0, Math.min(r + t, r));
            0 === i ? n[0].insertBefore(e, n[0].firstChild) : a[i - 1].insertAdjacentElement("afterend", e)
        },
        getAxis: f,
        setTransform: p,
        deprecated: h
    }
}(window);
! function(t) {
    "use strict";
    t.fn.counterUp = function(e) {
        var a, n = t.extend({
            time: 400,
            delay: 10,
            formatter: !1,
            callback: function() {}
        }, e);
        return this.each(function() {
            var e = t(this),
                r = {
                    time: t(this).data("counterup-time") || n.time,
                    delay: t(this).data("counterup-delay") || n.delay
                },
                u = function() {
                    var t = [],
                        u = r.time / r.delay,
                        o = e.text(),
                        i = /[0-9]+,[0-9]+/.test(o);
                    o = o.replace(/,/g, "");
                    var c = (o.split(".")[1] || []).length,
                        s = /[0-9]+:[0-9]+:[0-9]+/.test(o);
                    if (s) {
                        var l = o.split(":"),
                            f = 1;
                        for (a = 0; l.length > 0;) a += f * parseInt(l.pop(), 10), f *= 60
                    }
                    for (var d = u; d >= 1; d--) {
                        var p = parseFloat(o / u * d).toFixed(c);
                        if (s) {
                            p = parseInt(a / u * d);
                            var m = parseInt(p / 3600) % 24,
                                h = parseInt(p / 60) % 60,
                                y = parseInt(p % 60, 10);
                            p = (10 > m ? "0" + m : m) + ":" + (10 > h ? "0" + h : h) + ":" + (10 > y ? "0" + y : y)
                        }
                        if (i)
                            for (;
                                /(\d+)(\d{3})/.test(p.toString());) p = p.toString().replace(/(\d+)(\d{3})/, "$1,$2");
                        n.formatter && (p = n.formatter.call(this, p)), t.unshift(p)
                    }
                    e.data("counterup-nums", t), e.text("0");
                    var v = function() {
                        e.html(e.data("counterup-nums").shift()), e.data("counterup-nums").length ? setTimeout(e.data("counterup-func"), r.delay) : (e.data("counterup-nums", null), e.data("counterup-func", null), n.callback.call(this))
                    };
                    e.data("counterup-func", v), setTimeout(e.data("counterup-func"), r.delay)
                };
            e.waypoint(function() {
                u(), this.destroy()
            }, {
                offset: "100%"
            })
        })
    }
}(jQuery);
! function(l, o, e) {
    "use strict";
    l.fn.scrollUp = function(o) {
        l.data(e.body, "scrollUp") || (l.data(e.body, "scrollUp", !0), l.fn.scrollUp.init(o))
    }, l.fn.scrollUp.init = function(r) {
        var s, t, c, i, n, a, d, p = l.fn.scrollUp.settings = l.extend({}, l.fn.scrollUp.defaults, r),
            f = !1;
        switch (d = p.scrollTrigger ? l(p.scrollTrigger) : l("<a/>", {
            id: p.scrollName,
            href: "#top"
        }), p.scrollTitle && d.attr("title", p.scrollTitle), d.appendTo("body"), p.scrollImg || p.scrollTrigger || d.html(p.scrollText), d.css({
            display: "none",
            position: "fixed",
            zIndex: p.zIndex
        }), p.activeOverlay && l("<div/>", {
            id: p.scrollName + "-active"
        }).css({
            position: "absolute",
            top: p.scrollDistance + "px",
            width: "100%",
            borderTop: "1px dotted" + p.activeOverlay,
            zIndex: p.zIndex
        }).appendTo("body"), p.animation) {
            case "fade":
                s = "fadeIn", t = "fadeOut", c = p.animationSpeed;
                break;
            case "slide":
                s = "slideDown", t = "slideUp", c = p.animationSpeed;
                break;
            default:
                s = "show", t = "hide", c = 0
        }
        i = "top" === p.scrollFrom ? p.scrollDistance : l(e).height() - l(o).height() - p.scrollDistance, n = l(o).scroll(function() {
            l(o).scrollTop() > i ? f || (d[s](c), f = !0) : f && (d[t](c), f = !1)
        }), p.scrollTarget ? "number" == typeof p.scrollTarget ? a = p.scrollTarget : "string" == typeof p.scrollTarget && (a = Math.floor(l(p.scrollTarget).offset().top)) : a = 0, d.click(function(o) {
            o.preventDefault(), l("html, body").animate({
                scrollTop: a
            }, p.scrollSpeed, p.easingType)
        })
    }, l.fn.scrollUp.defaults = {
        scrollName: "scrollUp",
        scrollDistance: 300,
        scrollFrom: "top",
        scrollSpeed: 300,
        easingType: "linear",
        animation: "fade",
        animationSpeed: 200,
        scrollTrigger: !1,
        scrollTarget: !1,
        scrollText: "Scroll to top",
        scrollTitle: !1,
        scrollImg: !1,
        activeOverlay: !1,
        zIndex: 2147483647
    }, l.fn.scrollUp.destroy = function(r) {
        l.removeData(e.body, "scrollUp"), l("#" + l.fn.scrollUp.settings.scrollName).remove(), l("#" + l.fn.scrollUp.settings.scrollName + "-active").remove(), l.fn.jquery.split(".")[1] >= 7 ? l(o).off("scroll", r) : l(o).unbind("scroll", r)
    }, l.scrollUp = l.fn.scrollUp
}(jQuery, window, document);
$.scrollUp({
    animation: 'fade',
    scrollImg: {
        active: true,
        type: 'background'
    }
});

function loadGoogleAnalytics() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = '';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
}
loadGoogleAnalytics();
window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', '');
! function(a, b, c, d) {
    function e(b, c) {
        this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {
                start: null,
                current: null
            },
            direction: null
        }, this._states = {
            current: {},
            tags: {
                initializing: ["busy"],
                animating: ["busy"],
                dragging: ["interacting"]
            }
        }, a.each(["onResize", "onThrottledResize"], a.proxy(function(b, c) {
            this._handlers[c] = a.proxy(this[c], this)
        }, this)), a.each(e.Plugins, a.proxy(function(a, b) {
            this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this)
        }, this)), a.each(e.Workers, a.proxy(function(b, c) {
            this._pipe.push({
                filter: c.filter,
                run: a.proxy(c.run, this)
            })
        }, this)), this.setup(), this.initialize()
    }
    e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        checkVisibility: !0,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        fallbackEasing: "swing",
        slideTransition: "",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab"
    }, e.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    }, e.Type = {
        Event: "event",
        State: "state"
    }, e.Plugins = {}, e.Workers = [{
        filter: ["width", "settings"],
        run: function() {
            this._width = this.$element.width()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            this.$stage.children(".cloned").remove()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = this.settings.margin || "",
                c = !this.settings.autoWidth,
                d = this.settings.rtl,
                e = {
                    width: "auto",
                    "margin-left": d ? b : "",
                    "margin-right": d ? "" : b
                };
            !c && this.$stage.children().css(e), a.css = e
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                c = null,
                d = this._items.length,
                e = !this.settings.autoWidth,
                f = [];
            for (a.items = {
                    merge: !1,
                    width: b
                }; d--;) c = this._mergers[d], c = this.settings.mergeFit && Math.min(c, this.settings.items) || c, a.items.merge = c > 1 || a.items.merge, f[d] = e ? b * c : this._items[d].width();
            this._widths = f
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var b = [],
                c = this._items,
                d = this.settings,
                e = Math.max(2 * d.items, 4),
                f = 2 * Math.ceil(c.length / 2),
                g = d.loop && c.length ? d.rewind ? e : Math.max(e, f) : 0,
                h = "",
                i = "";
            for (g /= 2; g > 0;) b.push(this.normalize(b.length / 2, !0)), h += c[b[b.length - 1]][0].outerHTML, b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)), i = c[b[b.length - 1]][0].outerHTML + i, g -= 1;
            this._clones = b, a(h).addClass("cloned").appendTo(this.$stage), a(i).addClass("cloned").prependTo(this.$stage)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b;) d = f[c - 1] || 0, e = this._widths[this.relative(c)] + this.settings.margin, f.push(d + e * a);
            this._coordinates = f
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var a = this.settings.stagePadding,
                b = this._coordinates,
                c = {
                    width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
                    "padding-left": a || "",
                    "padding-right": a || ""
                };
            this.$stage.css(c)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = this._coordinates.length,
                c = !this.settings.autoWidth,
                d = this.$stage.children();
            if (c && a.items.merge)
                for (; b--;) a.css.width = this._widths[this.relative(b)], d.eq(b).css(a.css);
            else c && (a.css.width = a.items.width, d.css(a.css))
        }
    }, {
        filter: ["items"],
        run: function() {
            this._coordinates.length < 1 && this.$stage.removeAttr("style")
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current = a.current ? this.$stage.children().index(a.current) : 0, a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)), this.reset(a.current)
        }
    }, {
        filter: ["position"],
        run: function() {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function() {
            var a, b, c, d, e = this.settings.rtl ? 1 : -1,
                f = 2 * this.settings.stagePadding,
                g = this.coordinates(this.current()) + f,
                h = g + this.width() * e,
                i = [];
            for (c = 0, d = this._coordinates.length; c < d; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
            this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"), this.$stage.children(".center").removeClass("center"), this.settings.center && this.$stage.children().eq(this.current()).addClass("center")
        }
    }], e.prototype.initializeStage = function() {
        this.$stage = this.$element.find("." + this.settings.stageClass), this.$stage.length || (this.$element.addClass(this.options.loadingClass), this.$stage = a("<" + this.settings.stageElement + ">", {
            class: this.settings.stageClass
        }).wrap(a("<div/>", {
            class: this.settings.stageOuterClass
        })), this.$element.append(this.$stage.parent()))
    }, e.prototype.initializeItems = function() {
        var b = this.$element.find(".owl-item");
        if (b.length) return this._items = b.get().map(function(b) {
            return a(b)
        }), this._mergers = this._items.map(function() {
            return 1
        }), void this.refresh();
        this.replace(this.$element.children().not(this.$stage.parent())), this.isVisible() ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)
    }, e.prototype.initialize = function() {
        if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
            var a, b, c;
            a = this.$element.find("img"), b = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, c = this.$element.children(b).width(), a.length && c <= 0 && this.preloadAutoWidthImages(a)
        }
        this.initializeStage(), this.initializeItems(), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
    }, e.prototype.isVisible = function() {
        return !this.settings.checkVisibility || this.$element.is(":visible")
    }, e.prototype.setup = function() {
        var b = this.viewport(),
            c = this.options.responsive,
            d = -1,
            e = null;
        c ? (a.each(c, function(a) {
            a <= b && a > d && (d = Number(a))
        }), e = a.extend({}, this.options, c[d]), "function" == typeof e.stagePadding && (e.stagePadding = e.stagePadding()), delete e.responsive, e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + d))) : e = a.extend({}, this.options), this.trigger("change", {
            property: {
                name: "settings",
                value: e
            }
        }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        })
    }, e.prototype.optionsLogic = function() {
        this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, e.prototype.prepare = function(b) {
        var c = this.trigger("prepare", {
            content: b
        });
        return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)), this.trigger("prepared", {
            content: c.data
        }), c.data
    }, e.prototype.update = function() {
        for (var b = 0, c = this._pipe.length, d = a.proxy(function(a) {
                return this[a]
            }, this._invalidated), e = {}; b < c;)(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
        this._invalidated = {}, !this.is("valid") && this.enter("valid")
    }, e.prototype.width = function(a) {
        switch (a = a || e.Width.Default) {
            case e.Width.Inner:
            case e.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, e.prototype.refresh = function() {
        this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
    }, e.prototype.onThrottledResize = function() {
        b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
    }, e.prototype.onResize = function() {
        return !!this._items.length && (this._width !== this.$element.width() && (!!this.isVisible() && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
    }, e.prototype.registerEventHandlers = function() {
        a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)), !1 !== this.settings.responsive && this.on(b, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
            return !1
        })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)))
    }, e.prototype.onDragStart = function(b) {
        var d = null;
        3 !== b.which && (a.support.transform ? (d = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), d = {
            x: d[16 === d.length ? 12 : 4],
            y: d[16 === d.length ? 13 : 5]
        }) : (d = this.$stage.position(), d = {
            x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left,
            y: d.top
        }), this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = a(b.target), this._drag.stage.start = d, this._drag.stage.current = d, this._drag.pointer = this.pointer(b), a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)), a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function(b) {
            var d = this.difference(this._drag.pointer, this.pointer(b));
            a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)), Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(), this.enter("dragging"), this.trigger("drag"))
        }, this)))
    }, e.prototype.onDragMove = function(a) {
        var b = null,
            c = null,
            d = null,
            e = this.difference(this._drag.pointer, this.pointer(a)),
            f = this.difference(this._drag.stage.start, e);
        this.is("dragging") && (a.preventDefault(), this.settings.loop ? (b = this.coordinates(this.minimum()), c = this.coordinates(this.maximum() + 1) - b, f.x = ((f.x - b) % c + c) % c + b) : (b = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), c = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), d = this.settings.pullDrag ? -1 * e.x / 5 : 0, f.x = Math.max(Math.min(f.x, b + d), c + d)), this._drag.stage.current = f, this.animate(f.x))
    }, e.prototype.onDragEnd = function(b) {
        var d = this.difference(this._drag.pointer, this.pointer(b)),
            e = this._drag.stage.current,
            f = d.x > 0 ^ this.settings.rtl ? "left" : "right";
        a(c).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = f, (Math.abs(d.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function() {
            return !1
        })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
    }, e.prototype.closest = function(b, c) {
        var e = -1,
            f = 30,
            g = this.width(),
            h = this.coordinates();
        return this.settings.freeDrag || a.each(h, a.proxy(function(a, i) {
            return "left" === c && b > i - f && b < i + f ? e = a : "right" === c && b > i - g - f && b < i - g + f ? e = a + 1 : this.op(b, "<", i) && this.op(b, ">", h[a + 1] !== d ? h[a + 1] : i - g) && (e = "left" === c ? a + 1 : a), -1 === e
        }, this)), this.settings.loop || (this.op(b, ">", h[this.minimum()]) ? e = b = this.minimum() : this.op(b, "<", h[this.maximum()]) && (e = b = this.maximum())), e
    }, e.prototype.animate = function(b) {
        var c = this.speed() > 0;
        this.is("animating") && this.onTransitionEnd(), c && (this.enter("animating"), this.trigger("translate")), a.support.transform3d && a.support.transition ? this.$stage.css({
            transform: "translate3d(" + b + "px,0px,0px)",
            transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "")
        }) : c ? this.$stage.animate({
            left: b + "px"
        }, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this)) : this.$stage.css({
            left: b + "px"
        })
    }, e.prototype.is = function(a) {
        return this._states.current[a] && this._states.current[a] > 0
    }, e.prototype.current = function(a) {
        if (a === d) return this._current;
        if (0 === this._items.length) return d;
        if (a = this.normalize(a), this._current !== a) {
            var b = this.trigger("change", {
                property: {
                    name: "position",
                    value: a
                }
            });
            b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }, e.prototype.invalidate = function(b) {
        return "string" === a.type(b) && (this._invalidated[b] = !0, this.is("valid") && this.leave("valid")), a.map(this._invalidated, function(a, b) {
            return b
        })
    }, e.prototype.reset = function(a) {
        (a = this.normalize(a)) !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]))
    }, e.prototype.normalize = function(a, b) {
        var c = this._items.length,
            e = b ? 0 : this._clones.length;
        return !this.isNumeric(a) || c < 1 ? a = d : (a < 0 || a >= c + e) && (a = ((a - e / 2) % c + c) % c + e / 2), a
    }, e.prototype.relative = function(a) {
        return a -= this._clones.length / 2, this.normalize(a, !0)
    }, e.prototype.maximum = function(a) {
        var b, c, d, e = this.settings,
            f = this._coordinates.length;
        if (e.loop) f = this._clones.length / 2 + this._items.length - 1;
        else if (e.autoWidth || e.merge) {
            if (b = this._items.length)
                for (c = this._items[--b].width(), d = this.$element.width(); b-- && !((c += this._items[b].width() + this.settings.margin) > d););
            f = b + 1
        } else f = e.center ? this._items.length - 1 : this._items.length - e.items;
        return a && (f -= this._clones.length / 2), Math.max(f, 0)
    }, e.prototype.minimum = function(a) {
        return a ? 0 : this._clones.length / 2
    }, e.prototype.items = function(a) {
        return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a])
    }, e.prototype.mergers = function(a) {
        return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a])
    }, e.prototype.clones = function(b) {
        var c = this._clones.length / 2,
            e = c + this._items.length,
            f = function(a) {
                return a % 2 == 0 ? e + a / 2 : c - (a + 1) / 2
            };
        return b === d ? a.map(this._clones, function(a, b) {
            return f(b)
        }) : a.map(this._clones, function(a, c) {
            return a === b ? f(c) : null
        })
    }, e.prototype.speed = function(a) {
        return a !== d && (this._speed = a), this._speed
    }, e.prototype.coordinates = function(b) {
        var c, e = 1,
            f = b - 1;
        return b === d ? a.map(this._coordinates, a.proxy(function(a, b) {
            return this.coordinates(b)
        }, this)) : (this.settings.center ? (this.settings.rtl && (e = -1, f = b + 1), c = this._coordinates[b], c += (this.width() - c + (this._coordinates[f] || 0)) / 2 * e) : c = this._coordinates[f] || 0, c = Math.ceil(c))
    }, e.prototype.duration = function(a, b, c) {
        return 0 === c ? 0 : Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
    }, e.prototype.to = function(a, b) {
        var c = this.current(),
            d = null,
            e = a - this.relative(c),
            f = (e > 0) - (e < 0),
            g = this._items.length,
            h = this.minimum(),
            i = this.maximum();
        this.settings.loop ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += -1 * f * g), a = c + e, (d = ((a - h) % g + g) % g + h) !== a && d - e <= i && d - e > 0 && (c = d - e, a = d, this.reset(c))) : this.settings.rewind ? (i += 1, a = (a % i + i) % i) : a = Math.max(h, Math.min(i, a)), this.speed(this.duration(c, a, b)), this.current(a), this.isVisible() && this.update()
    }, e.prototype.next = function(a) {
        a = a || !1, this.to(this.relative(this.current()) + 1, a)
    }, e.prototype.prev = function(a) {
        a = a || !1, this.to(this.relative(this.current()) - 1, a)
    }, e.prototype.onTransitionEnd = function(a) {
        if (a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))) return !1;
        this.leave("animating"), this.trigger("translated")
    }, e.prototype.viewport = function() {
        var d;
        return this.options.responsiveBaseElement !== b ? d = a(this.options.responsiveBaseElement).width() : b.innerWidth ? d = b.innerWidth : c.documentElement && c.documentElement.clientWidth ? d = c.documentElement.clientWidth : console.warn("Can not detect viewport width."), d
    }, e.prototype.replace = function(b) {
        this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function() {
            return 1 === this.nodeType
        }).each(a.proxy(function(a, b) {
            b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, e.prototype.add = function(b, c) {
        var e = this.relative(this._current);
        c = c === d ? this._items.length : this.normalize(c, !0), b = b instanceof jQuery ? b : a(b), this.trigger("add", {
            content: b,
            position: c
        }), b = this.prepare(b), 0 === this._items.length || c === this._items.length ? (0 === this._items.length && this.$stage.append(b), 0 !== this._items.length && this._items[c - 1].after(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b), this._items.splice(c, 0, b), this._mergers.splice(c, 0, 1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[e] && this.reset(this._items[e].index()), this.invalidate("items"), this.trigger("added", {
            content: b,
            position: c
        })
    }, e.prototype.remove = function(a) {
        (a = this.normalize(a, !0)) !== d && (this.trigger("remove", {
            content: this._items[a],
            position: a
        }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: a
        }))
    }, e.prototype.preloadAutoWidthImages = function(b) {
        b.each(a.proxy(function(b, c) {
            this.enter("pre-loading"), c = a(c), a(new Image).one("load", a.proxy(function(a) {
                c.attr("src", a.target.src), c.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
            }, this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"))
        }, this))
    }, e.prototype.destroy = function() {
        this.$element.off(".owl.core"), this.$stage.off(".owl.core"), a(c).off(".owl.core"), !1 !== this.settings.responsive && (b.clearTimeout(this.resizeTimer), this.off(b, "resize", this._handlers.onThrottledResize));
        for (var d in this._plugins) this._plugins[d].destroy();
        this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.remove(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
    }, e.prototype.op = function(a, b, c) {
        var d = this.settings.rtl;
        switch (b) {
            case "<":
                return d ? a > c : a < c;
            case ">":
                return d ? a < c : a > c;
            case ">=":
                return d ? a <= c : a >= c;
            case "<=":
                return d ? a >= c : a <= c
        }
    }, e.prototype.on = function(a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
    }, e.prototype.off = function(a, b, c, d) {
        a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
    }, e.prototype.trigger = function(b, c, d, f, g) {
        var h = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            },
            i = a.camelCase(a.grep(["on", b, d], function(a) {
                return a
            }).join("-").toLowerCase()),
            j = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
                relatedTarget: this
            }, h, c));
        return this._supress[b] || (a.each(this._plugins, function(a, b) {
            b.onTrigger && b.onTrigger(j)
        }), this.register({
            type: e.Type.Event,
            name: b
        }), this.$element.trigger(j), this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)), j
    }, e.prototype.enter = function(b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
            this._states.current[b] === d && (this._states.current[b] = 0), this._states.current[b]++
        }, this))
    }, e.prototype.leave = function(b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
            this._states.current[b]--
        }, this))
    }, e.prototype.register = function(b) {
        if (b.type === e.Type.Event) {
            if (a.event.special[b.name] || (a.event.special[b.name] = {}), !a.event.special[b.name].owl) {
                var c = a.event.special[b.name]._default;
                a.event.special[b.name]._default = function(a) {
                    return !c || !c.apply || a.namespace && -1 !== a.namespace.indexOf("owl") ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments)
                }, a.event.special[b.name].owl = !0
            }
        } else b.type === e.Type.State && (this._states.tags[b.name] ? this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags) : this._states.tags[b.name] = b.tags, this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function(c, d) {
            return a.inArray(c, this._states.tags[b.name]) === d
        }, this)))
    }, e.prototype.suppress = function(b) {
        a.each(b, a.proxy(function(a, b) {
            this._supress[b] = !0
        }, this))
    }, e.prototype.release = function(b) {
        a.each(b, a.proxy(function(a, b) {
            delete this._supress[b]
        }, this))
    }, e.prototype.pointer = function(a) {
        var c = {
            x: null,
            y: null
        };
        return a = a.originalEvent || a || b.event, a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a, a.pageX ? (c.x = a.pageX, c.y = a.pageY) : (c.x = a.clientX, c.y = a.clientY), c
    }, e.prototype.isNumeric = function(a) {
        return !isNaN(parseFloat(a))
    }, e.prototype.difference = function(a, b) {
        return {
            x: a.x - b.x,
            y: a.y - b.y
        }
    }, a.fn.owlCarousel = function(b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var d = a(this),
                f = d.data("owl.carousel");
            f || (f = new e(this, "object" == typeof b && b), d.data("owl.carousel", f), a.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function(b, c) {
                f.register({
                    type: e.Type.Event,
                    name: c
                }), f.$element.on(c + ".owl.carousel.core", a.proxy(function(a) {
                    a.namespace && a.relatedTarget !== this && (this.suppress([c]), f[c].apply(this, [].slice.call(arguments, 1)), this.release([c]))
                }, f))
            })), "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c)
        })
    }, a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._interval = null, this._visible = null, this._handlers = {
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoRefresh && this.watch()
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        autoRefresh: !0,
        autoRefreshInterval: 500
    }, e.prototype.watch = function() {
        this._interval || (this._visible = this._core.isVisible(), this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
    }, e.prototype.refresh = function() {
        this._core.isVisible() !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
    }, e.prototype.destroy = function() {
        var a, c;
        b.clearInterval(this._interval);
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function(b) {
                if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type)) {
                    var c = this._core.settings,
                        e = c.center && Math.ceil(c.items / 2) || c.items,
                        f = c.center && -1 * e || 0,
                        g = (b.property && b.property.value !== d ? b.property.value : this._core.current()) + f,
                        h = this._core.clones().length,
                        i = a.proxy(function(a, b) {
                            this.load(b)
                        }, this);
                    for (c.lazyLoadEager > 0 && (e += c.lazyLoadEager, c.loop && (g -= c.lazyLoadEager, e++)); f++ < e;) this.load(h / 2 + this._core.relative(g)), h && a.each(this._core.clones(this._core.relative(g)), i), g++
                }
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        lazyLoad: !1,
        lazyLoadEager: 0
    }, e.prototype.load = function(c) {
        var d = this._core.$stage.children().eq(c),
            e = d && d.find(".owl-lazy");
        !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function(c, d) {
            var e, f = a(d),
                g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src") || f.attr("data-srcset");
            this._core.trigger("load", {
                element: f,
                url: g
            }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function() {
                f.css("opacity", 1), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this)).attr("src", g) : f.is("source") ? f.one("load.owl.lazy", a.proxy(function() {
                this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this)).attr("srcset", g) : (e = new Image, e.onload = a.proxy(function() {
                f.css({
                    "background-image": 'url("' + g + '")',
                    opacity: "1"
                }), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this), e.src = g)
        }, this)), this._loaded.push(d.get(0)))
    }, e.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Lazy = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(c) {
        this._core = c, this._previousHeight = null, this._handlers = {
            "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && this.update()
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && "position" === a.property.name && this.update()
            }, this),
            "loaded.owl.lazy": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._intervalId = null;
        var d = this;
        a(b).on("load", function() {
            d._core.settings.autoHeight && d.update()
        }), a(b).resize(function() {
            d._core.settings.autoHeight && (null != d._intervalId && clearTimeout(d._intervalId), d._intervalId = setTimeout(function() {
                d.update()
            }, 250))
        })
    };
    e.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    }, e.prototype.update = function() {
        var b = this._core._current,
            c = b + this._core.settings.items,
            d = this._core.settings.lazyLoad,
            e = this._core.$stage.children().toArray().slice(b, c),
            f = [],
            g = 0;
        a.each(e, function(b, c) {
            f.push(a(c).height())
        }), g = Math.max.apply(null, f), g <= 1 && d && this._previousHeight && (g = this._previousHeight), this._previousHeight = g, this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass)
    }, e.prototype.destroy = function() {
        var a, b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._videos = {}, this._playing = null, this._handlers = {
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.register({
                    type: "state",
                    name: "playing",
                    tags: ["interacting"]
                })
            }, this),
            "resize.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault()
            }, this),
            "refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" === a.property.name && this._playing && this.stop()
            }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                if (b.namespace) {
                    var c = a(b.content).find(".owl-video");
                    c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
                }
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function(a) {
            this.play(a)
        }, this))
    };
    e.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    }, e.prototype.fetch = function(a, b) {
        var c = function() {
                return a.attr("data-vimeo-id") ? "vimeo" : a.attr("data-vzaar-id") ? "vzaar" : "youtube"
            }(),
            d = a.attr("data-vimeo-id") || a.attr("data-youtube-id") || a.attr("data-vzaar-id"),
            e = a.attr("data-width") || this._core.settings.videoWidth,
            f = a.attr("data-height") || this._core.settings.videoHeight,
            g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (d = g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";
        else if (d[3].indexOf("vimeo") > -1) c = "vimeo";
        else {
            if (!(d[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
            c = "vzaar"
        }
        d = d[6], this._videos[g] = {
            type: c,
            id: d,
            width: e,
            height: f
        }, b.attr("data-video", g), this.thumbnail(a, this._videos[g])
    }, e.prototype.thumbnail = function(b, c) {
        var d, e, f, g = c.width && c.height ? "width:" + c.width + "px;height:" + c.height + "px;" : "",
            h = b.find("img"),
            i = "src",
            j = "",
            k = this._core.settings,
            l = function(c) {
                e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? a("<div/>", {
                    class: "owl-video-tn " + j,
                    srcType: c
                }) : a("<div/>", {
                    class: "owl-video-tn",
                    style: "opacity:1;background-image:url(" + c + ")"
                }), b.after(d), b.after(e)
            };
        if (b.wrap(a("<div/>", {
                class: "owl-video-wrapper",
                style: g
            })), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length) return l(h.attr(i)), h.remove(), !1;
        "youtube" === c.type ? (f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type ? a.ajax({
            type: "GET",
            url: "//vimeo.com/api/v2/video/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(a) {
                f = a[0].thumbnail_large, l(f)
            }
        }) : "vzaar" === c.type && a.ajax({
            type: "GET",
            url: "//vzaar.com/api/videos/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(a) {
                f = a.framegrab_url, l(f)
            }
        })
    }, e.prototype.stop = function() {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
    }, e.prototype.play = function(b) {
        var c, d = a(b.target),
            e = d.closest("." + this._core.settings.itemClass),
            f = this._videos[e.attr("data-video")],
            g = f.width || "100%",
            h = f.height || this._core.$stage.height();
        this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), e = this._core.items(this._core.relative(e.index())), this._core.reset(e.index()), c = a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'), c.attr("height", h), c.attr("width", g), "youtube" === f.type ? c.attr("src", "//www.youtube.com/embed/" + f.id + "?autoplay=1&rel=0&v=" + f.id) : "vimeo" === f.type ? c.attr("src", "//player.vimeo.com/video/" + f.id + "?autoplay=1") : "vzaar" === f.type && c.attr("src", "//view.vzaar.com/" + f.id + "/player?autoplay=true"), a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")), this._playing = e.addClass("owl-video-playing"))
    }, e.prototype.isInFullScreen = function() {
        var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
        return b && a(b).parent().hasClass("owl-video-frame")
    }, e.prototype.destroy = function() {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Video = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
            "change.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function(a) {
                a.namespace && (this.swapping = "translated" == a.type)
            }, this),
            "translate.owl.carousel": a.proxy(function(a) {
                a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    e.Defaults = {
        animateOut: !1,
        animateIn: !1
    }, e.prototype.swap = function() {
        if (1 === this.core.settings.items && a.support.animation && a.support.transition) {
            this.core.speed(0);
            var b, c = a.proxy(this.clear, this),
                d = this.core.$stage.children().eq(this.previous),
                e = this.core.$stage.children().eq(this.next),
                f = this.core.settings.animateIn,
                g = this.core.settings.animateOut;
            this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.one(a.support.animation.end, c).css({
                left: b + "px"
            }).addClass("animated owl-animated-out").addClass(g)), f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f))
        }
    }, e.prototype.clear = function(b) {
        a(b.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
    }, e.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._call = null, this._time = 0, this._timeout = 0, this._paused = !0, this._handlers = {
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "settings" === a.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : a.namespace && "position" === a.property.name && this._paused && (this._time = 0)
            }, this),
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoplay && this.play()
            }, this),
            "play.owl.autoplay": a.proxy(function(a, b, c) {
                a.namespace && this.play(b, c)
            }, this),
            "stop.owl.autoplay": a.proxy(function(a) {
                a.namespace && this.stop()
            }, this),
            "mouseover.owl.autoplay": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "mouseleave.owl.autoplay": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
            }, this),
            "touchstart.owl.core": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "touchend.owl.core": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this.play()
            }, this)
        }, this._core.$element.on(this._handlers), this._core.options = a.extend({}, e.Defaults, this._core.options)
    };
    e.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, e.prototype._next = function(d) {
        this._call = b.setTimeout(a.proxy(this._next, this, d), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()), this._core.is("interacting") || c.hidden || this._core.next(d || this._core.settings.autoplaySpeed)
    }, e.prototype.read = function() {
        return (new Date).getTime() - this._time
    }, e.prototype.play = function(c, d) {
        var e;
        this._core.is("rotating") || this._core.enter("rotating"), c = c || this._core.settings.autoplayTimeout, e = Math.min(this._time % (this._timeout || c), c), this._paused ? (this._time = this.read(), this._paused = !1) : b.clearTimeout(this._call), this._time += this.read() % c - e, this._timeout = c, this._call = b.setTimeout(a.proxy(this._next, this, d), c - e)
    }, e.prototype.stop = function() {
        this._core.is("rotating") && (this._time = 0, this._paused = !0, b.clearTimeout(this._call), this._core.leave("rotating"))
    }, e.prototype.pause = function() {
        this._core.is("rotating") && !this._paused && (this._time = this.read(), this._paused = !0, b.clearTimeout(this._call))
    }, e.prototype.destroy = function() {
        var a, b;
        this.stop();
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.autoplay = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    "use strict";
    var e = function(b) {
        this._core = b, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": a.proxy(function(b) {
                b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
            }, this),
            "added.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop())
            }, this),
            "remove.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1)
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" == a.property.name && this.draw()
            }, this),
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
            }, this),
            "refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    e.Defaults = {
        nav: !1,
        navText: ['<span aria-label="Previous">&#x2039;</span>', '<span aria-label="Next">&#x203a;</span>'],
        navSpeed: !1,
        navElement: 'button type="button" role="presentation"',
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotsData: !1,
        dotsSpeed: !1,
        dotsContainer: !1
    }, e.prototype.initialize = function() {
        var b, c = this._core.settings;
        this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = a("<" + c.navElement + ">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click", a.proxy(function(a) {
            this.prev(c.navSpeed)
        }, this)), this._controls.$next = a("<" + c.navElement + ">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click", a.proxy(function(a) {
            this.next(c.navSpeed)
        }, this)), c.dotsData || (this._templates = [a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]), this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "button", a.proxy(function(b) {
            var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
            b.preventDefault(), this.to(d, c.dotsSpeed)
        }, this));
        for (b in this._overrides) this._core[b] = a.proxy(this[b], this)
    }, e.prototype.destroy = function() {
        var a, b, c, d, e;
        e = this._core.settings;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls) "$relative" === b && e.navContainer ? this._controls[b].html("") : this._controls[b].remove();
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, e.prototype.update = function() {
        var a, b, c, d = this._core.clones().length / 2,
            e = d + this._core.items().length,
            f = this._core.maximum(!0),
            g = this._core.settings,
            h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
        if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)), g.dots || "page" == g.slideBy)
            for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
                if (b >= h || 0 === b) {
                    if (this._pages.push({
                            start: Math.min(f, a - d),
                            end: a - d + h - 1
                        }), Math.min(f, a - d) === f) break;
                    b = 0, ++c
                }
                b += this._core.mergers(this._core.relative(a))
            }
    }, e.prototype.draw = function() {
        var b, c = this._core.settings,
            d = this._core.items().length <= c.items,
            e = this._core.relative(this._core.current()),
            f = c.loop || c.rewind;
        this._controls.$relative.toggleClass("disabled", !c.nav || d), c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !c.dots || d), c.dots && (b = this._pages.length - this._controls.$absolute.children().length, c.dotsData && 0 !== b ? this._controls.$absolute.html(this._templates.join("")) : b > 0 ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0])) : b < 0 && this._controls.$absolute.children().slice(b).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active"))
    }, e.prototype.onTrigger = function(b) {
        var c = this._core.settings;
        b.page = {
            index: a.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
        }
    }, e.prototype.current = function() {
        var b = this._core.relative(this._core.current());
        return a.grep(this._pages, a.proxy(function(a, c) {
            return a.start <= b && a.end >= b
        }, this)).pop()
    }, e.prototype.getPosition = function(b) {
        var c, d, e = this._core.settings;
        return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c
    }, e.prototype.next = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
    }, e.prototype.prev = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
    }, e.prototype.to = function(b, c, d) {
        var e;
        !d && this._pages.length ? (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c)) : a.proxy(this._overrides.to, this._core)(b, c)
    }, a.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    "use strict";
    var e = function(c) {
        this._core = c, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": a.proxy(function(c) {
                c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
            }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                if (b.namespace) {
                    var c = a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                    if (!c) return;
                    this._hashes[c] = b.content
                }
            }, this),
            "changed.owl.carousel": a.proxy(function(c) {
                if (c.namespace && "position" === c.property.name) {
                    var d = this._core.items(this._core.relative(this._core.current())),
                        e = a.map(this._hashes, function(a, b) {
                            return a === d ? b : null
                        }).join();
                    if (!e || b.location.hash.slice(1) === e) return;
                    b.location.hash = e
                }
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function(a) {
            var c = b.location.hash.substring(1),
                e = this._core.$stage.children(),
                f = this._hashes[c] && e.index(this._hashes[c]);
            f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0)
        }, this))
    };
    e.Defaults = {
        URLhashListener: !1
    }, e.prototype.destroy = function() {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Hash = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    function e(b, c) {
        var e = !1,
            f = b.charAt(0).toUpperCase() + b.slice(1);
        return a.each((b + " " + h.join(f + " ") + f).split(" "), function(a, b) {
            if (g[b] !== d) return e = !c || b, !1
        }), e
    }

    function f(a) {
        return e(a, !0)
    }
    var g = a("<support>").get(0).style,
        h = "Webkit Moz O ms".split(" "),
        i = {
            transition: {
                end: {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    transition: "transitionend"
                }
            },
            animation: {
                end: {
                    WebkitAnimation: "webkitAnimationEnd",
                    MozAnimation: "animationend",
                    OAnimation: "oAnimationEnd",
                    animation: "animationend"
                }
            }
        },
        j = {
            csstransforms: function() {
                return !!e("transform")
            },
            csstransforms3d: function() {
                return !!e("perspective")
            },
            csstransitions: function() {
                return !!e("transition")
            },
            cssanimations: function() {
                return !!e("animation")
            }
        };
    j.csstransitions() && (a.support.transition = new String(f("transition")), a.support.transition.end = i.transition.end[a.support.transition]), j.cssanimations() && (a.support.animation = new String(f("animation")), a.support.animation.end = i.animation.end[a.support.animation]), j.csstransforms() && (a.support.transform = new String(f("transform")), a.support.transform3d = j.csstransforms3d())
}(window.Zepto || window.jQuery, window, document);
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Swiper = t()
}(this, (function() {
    "use strict";

    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var i = t[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    function t() {
        return (t = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = arguments[t];
                for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i])
            }
            return e
        }).apply(this, arguments)
    }

    function a(e) {
        return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object
    }

    function i(e, t) {
        void 0 === e && (e = {}), void 0 === t && (t = {}), Object.keys(t).forEach((function(s) {
            void 0 === e[s] ? e[s] = t[s] : a(t[s]) && a(e[s]) && Object.keys(t[s]).length > 0 && i(e[s], t[s])
        }))
    }
    var s = {
        body: {},
        addEventListener: function() {},
        removeEventListener: function() {},
        activeElement: {
            blur: function() {},
            nodeName: ""
        },
        querySelector: function() {
            return null
        },
        querySelectorAll: function() {
            return []
        },
        getElementById: function() {
            return null
        },
        createEvent: function() {
            return {
                initEvent: function() {}
            }
        },
        createElement: function() {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute: function() {},
                getElementsByTagName: function() {
                    return []
                }
            }
        },
        createElementNS: function() {
            return {}
        },
        importNode: function() {
            return null
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        }
    };

    function r() {
        var e = "undefined" != typeof document ? document : {};
        return i(e, s), e
    }
    var n = {
        document: s,
        navigator: {
            userAgent: ""
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        },
        history: {
            replaceState: function() {},
            pushState: function() {},
            go: function() {},
            back: function() {}
        },
        CustomEvent: function() {
            return this
        },
        addEventListener: function() {},
        removeEventListener: function() {},
        getComputedStyle: function() {
            return {
                getPropertyValue: function() {
                    return ""
                }
            }
        },
        Image: function() {},
        Date: function() {},
        screen: {},
        setTimeout: function() {},
        clearTimeout: function() {},
        matchMedia: function() {
            return {}
        },
        requestAnimationFrame: function(e) {
            return "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0)
        },
        cancelAnimationFrame: function(e) {
            "undefined" != typeof setTimeout && clearTimeout(e)
        }
    };

    function l() {
        var e = "undefined" != typeof window ? window : {};
        return i(e, n), e
    }

    function o(e) {
        return (o = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function d(e, t) {
        return (d = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }

    function p() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), !0
        } catch (e) {
            return !1
        }
    }

    function u(e, t, a) {
        return (u = p() ? Reflect.construct : function(e, t, a) {
            var i = [null];
            i.push.apply(i, t);
            var s = new(Function.bind.apply(e, i));
            return a && d(s, a.prototype), s
        }).apply(null, arguments)
    }

    function c(e) {
        var t = "function" == typeof Map ? new Map : void 0;
        return (c = function(e) {
            if (null === e || (a = e, -1 === Function.toString.call(a).indexOf("[native code]"))) return e;
            var a;
            if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== t) {
                if (t.has(e)) return t.get(e);
                t.set(e, i)
            }

            function i() {
                return u(e, arguments, o(this).constructor)
            }
            return i.prototype = Object.create(e.prototype, {
                constructor: {
                    value: i,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), d(i, e)
        })(e)
    }
    var h = function(e) {
        var t, a;

        function i(t) {
            var a, i, s;
            return a = e.call.apply(e, [this].concat(t)) || this, i = function(e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(a), s = i.__proto__, Object.defineProperty(i, "__proto__", {
                get: function() {
                    return s
                },
                set: function(e) {
                    s.__proto__ = e
                }
            }), a
        }
        return a = e, (t = i).prototype = Object.create(a.prototype), t.prototype.constructor = t, t.__proto__ = a, i
    }(c(Array));

    function v(e) {
        void 0 === e && (e = []);
        var t = [];
        return e.forEach((function(e) {
            Array.isArray(e) ? t.push.apply(t, v(e)) : t.push(e)
        })), t
    }

    function f(e, t) {
        return Array.prototype.filter.call(e, t)
    }

    function m(e, t) {
        var a = l(),
            i = r(),
            s = [];
        if (!t && e instanceof h) return e;
        if (!e) return new h(s);
        if ("string" == typeof e) {
            var n = e.trim();
            if (n.indexOf("<") >= 0 && n.indexOf(">") >= 0) {
                var o = "div";
                0 === n.indexOf("<li") && (o = "ul"), 0 === n.indexOf("<tr") && (o = "tbody"), 0 !== n.indexOf("<td") && 0 !== n.indexOf("<th") || (o = "tr"), 0 === n.indexOf("<tbody") && (o = "table"), 0 === n.indexOf("<option") && (o = "select");
                var d = i.createElement(o);
                d.innerHTML = n;
                for (var p = 0; p < d.childNodes.length; p += 1) s.push(d.childNodes[p])
            } else s = function(e, t) {
                if ("string" != typeof e) return [e];
                for (var a = [], i = t.querySelectorAll(e), s = 0; s < i.length; s += 1) a.push(i[s]);
                return a
            }(e.trim(), t || i)
        } else if (e.nodeType || e === a || e === i) s.push(e);
        else if (Array.isArray(e)) {
            if (e instanceof h) return e;
            s = e
        }
        return new h(function(e) {
            for (var t = [], a = 0; a < e.length; a += 1) - 1 === t.indexOf(e[a]) && t.push(e[a]);
            return t
        }(s))
    }
    m.fn = h.prototype;
    var g, w, y, b = {
        addClass: function() {
            for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++) t[a] = arguments[a];
            var i = v(t.map((function(e) {
                return e.split(" ")
            })));
            return this.forEach((function(e) {
                var t;
                (t = e.classList).add.apply(t, i)
            })), this
        },
        removeClass: function() {
            for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++) t[a] = arguments[a];
            var i = v(t.map((function(e) {
                return e.split(" ")
            })));
            return this.forEach((function(e) {
                var t;
                (t = e.classList).remove.apply(t, i)
            })), this
        },
        hasClass: function() {
            for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++) t[a] = arguments[a];
            var i = v(t.map((function(e) {
                return e.split(" ")
            })));
            return f(this, (function(e) {
                return i.filter((function(t) {
                    return e.classList.contains(t)
                })).length > 0
            })).length > 0
        },
        toggleClass: function() {
            for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++) t[a] = arguments[a];
            var i = v(t.map((function(e) {
                return e.split(" ")
            })));
            this.forEach((function(e) {
                i.forEach((function(t) {
                    e.classList.toggle(t)
                }))
            }))
        },
        attr: function(e, t) {
            if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
            for (var a = 0; a < this.length; a += 1)
                if (2 === arguments.length) this[a].setAttribute(e, t);
                else
                    for (var i in e) this[a][i] = e[i], this[a].setAttribute(i, e[i]);
            return this
        },
        removeAttr: function(e) {
            for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
            return this
        },
        transform: function(e) {
            for (var t = 0; t < this.length; t += 1) this[t].style.transform = e;
            return this
        },
        transition: function(e) {
            for (var t = 0; t < this.length; t += 1) this[t].style.transitionDuration = "string" != typeof e ? e + "ms" : e;
            return this
        },
        on: function() {
            for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++) t[a] = arguments[a];
            var i = t[0],
                s = t[1],
                r = t[2],
                n = t[3];

            function l(e) {
                var t = e.target;
                if (t) {
                    var a = e.target.dom7EventData || [];
                    if (a.indexOf(e) < 0 && a.unshift(e), m(t).is(s)) r.apply(t, a);
                    else
                        for (var i = m(t).parents(), n = 0; n < i.length; n += 1) m(i[n]).is(s) && r.apply(i[n], a)
                }
            }

            function o(e) {
                var t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e), r.apply(this, t)
            }
            "function" == typeof t[1] && (i = t[0], r = t[1], n = t[2], s = void 0), n || (n = !1);
            for (var d, p = i.split(" "), u = 0; u < this.length; u += 1) {
                var c = this[u];
                if (s)
                    for (d = 0; d < p.length; d += 1) {
                        var h = p[d];
                        c.dom7LiveListeners || (c.dom7LiveListeners = {}), c.dom7LiveListeners[h] || (c.dom7LiveListeners[h] = []), c.dom7LiveListeners[h].push({
                            listener: r,
                            proxyListener: l
                        }), c.addEventListener(h, l, n)
                    } else
                        for (d = 0; d < p.length; d += 1) {
                            var v = p[d];
                            c.dom7Listeners || (c.dom7Listeners = {}), c.dom7Listeners[v] || (c.dom7Listeners[v] = []), c.dom7Listeners[v].push({
                                listener: r,
                                proxyListener: o
                            }), c.addEventListener(v, o, n)
                        }
            }
            return this
        },
        off: function() {
            for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++) t[a] = arguments[a];
            var i = t[0],
                s = t[1],
                r = t[2],
                n = t[3];
            "function" == typeof t[1] && (i = t[0], r = t[1], n = t[2], s = void 0), n || (n = !1);
            for (var l = i.split(" "), o = 0; o < l.length; o += 1)
                for (var d = l[o], p = 0; p < this.length; p += 1) {
                    var u = this[p],
                        c = void 0;
                    if (!s && u.dom7Listeners ? c = u.dom7Listeners[d] : s && u.dom7LiveListeners && (c = u.dom7LiveListeners[d]), c && c.length)
                        for (var h = c.length - 1; h >= 0; h -= 1) {
                            var v = c[h];
                            r && v.listener === r || r && v.listener && v.listener.dom7proxy && v.listener.dom7proxy === r ? (u.removeEventListener(d, v.proxyListener, n), c.splice(h, 1)) : r || (u.removeEventListener(d, v.proxyListener, n), c.splice(h, 1))
                        }
                }
            return this
        },
        trigger: function() {
            for (var e = l(), t = arguments.length, a = new Array(t), i = 0; i < t; i++) a[i] = arguments[i];
            for (var s = a[0].split(" "), r = a[1], n = 0; n < s.length; n += 1)
                for (var o = s[n], d = 0; d < this.length; d += 1) {
                    var p = this[d];
                    if (e.CustomEvent) {
                        var u = new e.CustomEvent(o, {
                            detail: r,
                            bubbles: !0,
                            cancelable: !0
                        });
                        p.dom7EventData = a.filter((function(e, t) {
                            return t > 0
                        })), p.dispatchEvent(u), p.dom7EventData = [], delete p.dom7EventData
                    }
                }
            return this
        },
        transitionEnd: function(e) {
            var t = this;
            return e && t.on("transitionend", (function a(i) {
                i.target === this && (e.call(this, i), t.off("transitionend", a))
            })), this
        },
        outerWidth: function(e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        },
        outerHeight: function(e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        },
        styles: function() {
            var e = l();
            return this[0] ? e.getComputedStyle(this[0], null) : {}
        },
        offset: function() {
            if (this.length > 0) {
                var e = l(),
                    t = r(),
                    a = this[0],
                    i = a.getBoundingClientRect(),
                    s = t.body,
                    n = a.clientTop || s.clientTop || 0,
                    o = a.clientLeft || s.clientLeft || 0,
                    d = a === e ? e.scrollY : a.scrollTop,
                    p = a === e ? e.scrollX : a.scrollLeft;
                return {
                    top: i.top + d - n,
                    left: i.left + p - o
                }
            }
            return null
        },
        css: function(e, t) {
            var a, i = l();
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (a = 0; a < this.length; a += 1)
                        for (var s in e) this[a].style[s] = e[s];
                    return this
                }
                if (this[0]) return i.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (a = 0; a < this.length; a += 1) this[a].style[e] = t;
                return this
            }
            return this
        },
        each: function(e) {
            return e ? (this.forEach((function(t, a) {
                e.apply(t, [t, a])
            })), this) : this
        },
        html: function(e) {
            if (void 0 === e) return this[0] ? this[0].innerHTML : null;
            for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
            return this
        },
        text: function(e) {
            if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
            for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
            return this
        },
        is: function(e) {
            var t, a, i = l(),
                s = r(),
                n = this[0];
            if (!n || void 0 === e) return !1;
            if ("string" == typeof e) {
                if (n.matches) return n.matches(e);
                if (n.webkitMatchesSelector) return n.webkitMatchesSelector(e);
                if (n.msMatchesSelector) return n.msMatchesSelector(e);
                for (t = m(e), a = 0; a < t.length; a += 1)
                    if (t[a] === n) return !0;
                return !1
            }
            if (e === s) return n === s;
            if (e === i) return n === i;
            if (e.nodeType || e instanceof h) {
                for (t = e.nodeType ? [e] : e, a = 0; a < t.length; a += 1)
                    if (t[a] === n) return !0;
                return !1
            }
            return !1
        },
        index: function() {
            var e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
                return e
            }
        },
        eq: function(e) {
            if (void 0 === e) return this;
            var t = this.length;
            if (e > t - 1) return m([]);
            if (e < 0) {
                var a = t + e;
                return m(a < 0 ? [] : [this[a]])
            }
            return m([this[e]])
        },
        append: function() {
            for (var e, t = r(), a = 0; a < arguments.length; a += 1) {
                e = a < 0 || arguments.length <= a ? void 0 : arguments[a];
                for (var i = 0; i < this.length; i += 1)
                    if ("string" == typeof e) {
                        var s = t.createElement("div");
                        for (s.innerHTML = e; s.firstChild;) this[i].appendChild(s.firstChild)
                    } else if (e instanceof h)
                    for (var n = 0; n < e.length; n += 1) this[i].appendChild(e[n]);
                else this[i].appendChild(e)
            }
            return this
        },
        prepend: function(e) {
            var t, a, i = r();
            for (t = 0; t < this.length; t += 1)
                if ("string" == typeof e) {
                    var s = i.createElement("div");
                    for (s.innerHTML = e, a = s.childNodes.length - 1; a >= 0; a -= 1) this[t].insertBefore(s.childNodes[a], this[t].childNodes[0])
                } else if (e instanceof h)
                for (a = 0; a < e.length; a += 1) this[t].insertBefore(e[a], this[t].childNodes[0]);
            else this[t].insertBefore(e, this[t].childNodes[0]);
            return this
        },
        next: function(e) {
            return this.length > 0 ? e ? this[0].nextElementSibling && m(this[0].nextElementSibling).is(e) ? m([this[0].nextElementSibling]) : m([]) : this[0].nextElementSibling ? m([this[0].nextElementSibling]) : m([]) : m([])
        },
        nextAll: function(e) {
            var t = [],
                a = this[0];
            if (!a) return m([]);
            for (; a.nextElementSibling;) {
                var i = a.nextElementSibling;
                e ? m(i).is(e) && t.push(i) : t.push(i), a = i
            }
            return m(t)
        },
        prev: function(e) {
            if (this.length > 0) {
                var t = this[0];
                return e ? t.previousElementSibling && m(t.previousElementSibling).is(e) ? m([t.previousElementSibling]) : m([]) : t.previousElementSibling ? m([t.previousElementSibling]) : m([])
            }
            return m([])
        },
        prevAll: function(e) {
            var t = [],
                a = this[0];
            if (!a) return m([]);
            for (; a.previousElementSibling;) {
                var i = a.previousElementSibling;
                e ? m(i).is(e) && t.push(i) : t.push(i), a = i
            }
            return m(t)
        },
        parent: function(e) {
            for (var t = [], a = 0; a < this.length; a += 1) null !== this[a].parentNode && (e ? m(this[a].parentNode).is(e) && t.push(this[a].parentNode) : t.push(this[a].parentNode));
            return m(t)
        },
        parents: function(e) {
            for (var t = [], a = 0; a < this.length; a += 1)
                for (var i = this[a].parentNode; i;) e ? m(i).is(e) && t.push(i) : t.push(i), i = i.parentNode;
            return m(t)
        },
        closest: function(e) {
            var t = this;
            return void 0 === e ? m([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
        },
        find: function(e) {
            for (var t = [], a = 0; a < this.length; a += 1)
                for (var i = this[a].querySelectorAll(e), s = 0; s < i.length; s += 1) t.push(i[s]);
            return m(t)
        },
        children: function(e) {
            for (var t = [], a = 0; a < this.length; a += 1)
                for (var i = this[a].children, s = 0; s < i.length; s += 1) e && !m(i[s]).is(e) || t.push(i[s]);
            return m(t)
        },
        filter: function(e) {
            return m(f(this, e))
        },
        remove: function() {
            for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        }
    };

    function E(e, t) {
        return void 0 === t && (t = 0), setTimeout(e, t)
    }

    function x() {
        return Date.now()
    }

    function T(e, t) {
        void 0 === t && (t = "x");
        var a, i, s, r = l(),
            n = r.getComputedStyle(e, null);
        return r.WebKitCSSMatrix ? ((i = n.transform || n.webkitTransform).split(",").length > 6 && (i = i.split(", ").map((function(e) {
            return e.replace(",", ".")
        })).join(", ")), s = new r.WebKitCSSMatrix("none" === i ? "" : i)) : a = (s = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === t && (i = r.WebKitCSSMatrix ? s.m41 : 16 === a.length ? parseFloat(a[12]) : parseFloat(a[4])), "y" === t && (i = r.WebKitCSSMatrix ? s.m42 : 16 === a.length ? parseFloat(a[13]) : parseFloat(a[5])), i || 0
    }

    function C(e) {
        return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
    }

    function S() {
        for (var e = Object(arguments.length <= 0 ? void 0 : arguments[0]), t = 1; t < arguments.length; t += 1) {
            var a = t < 0 || arguments.length <= t ? void 0 : arguments[t];
            if (null != a)
                for (var i = Object.keys(Object(a)), s = 0, r = i.length; s < r; s += 1) {
                    var n = i[s],
                        l = Object.getOwnPropertyDescriptor(a, n);
                    void 0 !== l && l.enumerable && (C(e[n]) && C(a[n]) ? S(e[n], a[n]) : !C(e[n]) && C(a[n]) ? (e[n] = {}, S(e[n], a[n])) : e[n] = a[n])
                }
        }
        return e
    }

    function M(e, t) {
        Object.keys(t).forEach((function(a) {
            C(t[a]) && Object.keys(t[a]).forEach((function(i) {
                "function" == typeof t[a][i] && (t[a][i] = t[a][i].bind(e))
            })), e[a] = t[a]
        }))
    }

    function z() {
        return g || (g = function() {
            var e = l(),
                t = r();
            return {
                touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch),
                pointerEvents: !!e.PointerEvent && "maxTouchPoints" in e.navigator && e.navigator.maxTouchPoints >= 0,
                observer: "MutationObserver" in e || "WebkitMutationObserver" in e,
                passiveListener: function() {
                    var t = !1;
                    try {
                        var a = Object.defineProperty({}, "passive", {
                            get: function() {
                                t = !0
                            }
                        });
                        e.addEventListener("testPassiveListener", null, a)
                    } catch (e) {}
                    return t
                }(),
                gestures: "ongesturestart" in e
            }
        }()), g
    }

    function P(e) {
        return void 0 === e && (e = {}), w || (w = function(e) {
            var t = (void 0 === e ? {} : e).userAgent,
                a = z(),
                i = l(),
                s = i.navigator.platform,
                r = t || i.navigator.userAgent,
                n = {
                    ios: !1,
                    android: !1
                },
                o = i.screen.width,
                d = i.screen.height,
                p = r.match(/(Android);?[\s\/]+([\d.]+)?/),
                u = r.match(/(iPad).*OS\s([\d_]+)/),
                c = r.match(/(iPod)(.*OS\s([\d_]+))?/),
                h = !u && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                v = "Win32" === s,
                f = "MacIntel" === s;
            return !u && f && a.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(o + "x" + d) >= 0 && ((u = r.match(/(Version)\/([\d.]+)/)) || (u = [0, 1, "13_0_0"]), f = !1), p && !v && (n.os = "android", n.android = !0), (u || h || c) && (n.os = "ios", n.ios = !0), n
        }(e)), w
    }

    function k() {
        return y || (y = function() {
            var e, t = l();
            return {
                isEdge: !!t.navigator.userAgent.match(/Edge/g),
                isSafari: (e = t.navigator.userAgent.toLowerCase(), e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0),
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent)
            }
        }()), y
    }
    Object.keys(b).forEach((function(e) {
        m.fn[e] = b[e]
    }));
    var L = {
            name: "resize",
            create: function() {
                var e = this;
                S(e, {
                    resize: {
                        resizeHandler: function() {
                            e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"))
                        },
                        orientationChangeHandler: function() {
                            e && !e.destroyed && e.initialized && e.emit("orientationchange")
                        }
                    }
                })
            },
            on: {
                init: function(e) {
                    var t = l();
                    t.addEventListener("resize", e.resize.resizeHandler), t.addEventListener("orientationchange", e.resize.orientationChangeHandler)
                },
                destroy: function(e) {
                    var t = l();
                    t.removeEventListener("resize", e.resize.resizeHandler), t.removeEventListener("orientationchange", e.resize.orientationChangeHandler)
                }
            }
        },
        $ = {
            attach: function(e, t) {
                void 0 === t && (t = {});
                var a = l(),
                    i = this,
                    s = new(a.MutationObserver || a.WebkitMutationObserver)((function(e) {
                        if (1 !== e.length) {
                            var t = function() {
                                i.emit("observerUpdate", e[0])
                            };
                            a.requestAnimationFrame ? a.requestAnimationFrame(t) : a.setTimeout(t, 0)
                        } else i.emit("observerUpdate", e[0])
                    }));
                s.observe(e, {
                    attributes: void 0 === t.attributes || t.attributes,
                    childList: void 0 === t.childList || t.childList,
                    characterData: void 0 === t.characterData || t.characterData
                }), i.observer.observers.push(s)
            },
            init: function() {
                var e = this;
                if (e.support.observer && e.params.observer) {
                    if (e.params.observeParents)
                        for (var t = e.$el.parents(), a = 0; a < t.length; a += 1) e.observer.attach(t[a]);
                    e.observer.attach(e.$el[0], {
                        childList: e.params.observeSlideChildren
                    }), e.observer.attach(e.$wrapperEl[0], {
                        attributes: !1
                    })
                }
            },
            destroy: function() {
                this.observer.observers.forEach((function(e) {
                    e.disconnect()
                })), this.observer.observers = []
            }
        },
        I = {
            name: "observer",
            params: {
                observer: !1,
                observeParents: !1,
                observeSlideChildren: !1
            },
            create: function() {
                M(this, {
                    observer: t({}, $, {
                        observers: []
                    })
                })
            },
            on: {
                init: function(e) {
                    e.observer.init()
                },
                destroy: function(e) {
                    e.observer.destroy()
                }
            }
        };

    function O(e) {
        var t = this,
            a = r(),
            i = l(),
            s = t.touchEventsData,
            n = t.params,
            o = t.touches;
        if (!t.animating || !n.preventInteractionOnTransition) {
            var d = e;
            d.originalEvent && (d = d.originalEvent);
            var p = m(d.target);
            if ("wrapper" !== n.touchEventsTarget || p.closest(t.wrapperEl).length)
                if (s.isTouchEvent = "touchstart" === d.type, s.isTouchEvent || !("which" in d) || 3 !== d.which)
                    if (!(!s.isTouchEvent && "button" in d && d.button > 0))
                        if (!s.isTouched || !s.isMoved)
                            if (!!n.noSwipingClass && "" !== n.noSwipingClass && d.target && d.target.shadowRoot && e.path && e.path[0] && (p = m(e.path[0])), n.noSwiping && p.closest(n.noSwipingSelector ? n.noSwipingSelector : "." + n.noSwipingClass)[0]) t.allowClick = !0;
                            else if (!n.swipeHandler || p.closest(n.swipeHandler)[0]) {
                o.currentX = "touchstart" === d.type ? d.targetTouches[0].pageX : d.pageX, o.currentY = "touchstart" === d.type ? d.targetTouches[0].pageY : d.pageY;
                var u = o.currentX,
                    c = o.currentY,
                    h = n.edgeSwipeDetection || n.iOSEdgeSwipeDetection,
                    v = n.edgeSwipeThreshold || n.iOSEdgeSwipeThreshold;
                if (h && (u <= v || u >= i.innerWidth - v)) {
                    if ("prevent" !== h) return;
                    e.preventDefault()
                }
                if (S(s, {
                        isTouched: !0,
                        isMoved: !1,
                        allowTouchCallbacks: !0,
                        isScrolling: void 0,
                        startMoving: void 0
                    }), o.startX = u, o.startY = c, s.touchStartTime = x(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, n.threshold > 0 && (s.allowThresholdMove = !1), "touchstart" !== d.type) {
                    var f = !0;
                    p.is(s.formElements) && (f = !1), a.activeElement && m(a.activeElement).is(s.formElements) && a.activeElement !== p[0] && a.activeElement.blur();
                    var g = f && t.allowTouchMove && n.touchStartPreventDefault;
                    !n.touchStartForcePreventDefault && !g || p[0].isContentEditable || d.preventDefault()
                }
                t.emit("touchStart", d)
            }
        }
    }

    function A(e) {
        var t = r(),
            a = this,
            i = a.touchEventsData,
            s = a.params,
            n = a.touches,
            l = a.rtlTranslate,
            o = e;
        if (o.originalEvent && (o = o.originalEvent), i.isTouched) {
            if (!i.isTouchEvent || "touchmove" === o.type) {
                var d = "touchmove" === o.type && o.targetTouches && (o.targetTouches[0] || o.changedTouches[0]),
                    p = "touchmove" === o.type ? d.pageX : o.pageX,
                    u = "touchmove" === o.type ? d.pageY : o.pageY;
                if (o.preventedByNestedSwiper) return n.startX = p, void(n.startY = u);
                if (!a.allowTouchMove) return a.allowClick = !1, void(i.isTouched && (S(n, {
                    startX: p,
                    startY: u,
                    currentX: p,
                    currentY: u
                }), i.touchStartTime = x()));
                if (i.isTouchEvent && s.touchReleaseOnEdges && !s.loop)
                    if (a.isVertical()) {
                        if (u < n.startY && a.translate <= a.maxTranslate() || u > n.startY && a.translate >= a.minTranslate()) return i.isTouched = !1, void(i.isMoved = !1)
                    } else if (p < n.startX && a.translate <= a.maxTranslate() || p > n.startX && a.translate >= a.minTranslate()) return;
                if (i.isTouchEvent && t.activeElement && o.target === t.activeElement && m(o.target).is(i.formElements)) return i.isMoved = !0, void(a.allowClick = !1);
                if (i.allowTouchCallbacks && a.emit("touchMove", o), !(o.targetTouches && o.targetTouches.length > 1)) {
                    n.currentX = p, n.currentY = u;
                    var c = n.currentX - n.startX,
                        h = n.currentY - n.startY;
                    if (!(a.params.threshold && Math.sqrt(Math.pow(c, 2) + Math.pow(h, 2)) < a.params.threshold)) {
                        var v;
                        if (void 0 === i.isScrolling) a.isHorizontal() && n.currentY === n.startY || a.isVertical() && n.currentX === n.startX ? i.isScrolling = !1 : c * c + h * h >= 25 && (v = 180 * Math.atan2(Math.abs(h), Math.abs(c)) / Math.PI, i.isScrolling = a.isHorizontal() ? v > s.touchAngle : 90 - v > s.touchAngle);
                        if (i.isScrolling && a.emit("touchMoveOpposite", o), void 0 === i.startMoving && (n.currentX === n.startX && n.currentY === n.startY || (i.startMoving = !0)), i.isScrolling) i.isTouched = !1;
                        else if (i.startMoving) {
                            a.allowClick = !1, !s.cssMode && o.cancelable && o.preventDefault(), s.touchMoveStopPropagation && !s.nested && o.stopPropagation(), i.isMoved || (s.loop && a.loopFix(), i.startTranslate = a.getTranslate(), a.setTransition(0), a.animating && a.$wrapperEl.trigger("webkitTransitionEnd transitionend"), i.allowMomentumBounce = !1, !s.grabCursor || !0 !== a.allowSlideNext && !0 !== a.allowSlidePrev || a.setGrabCursor(!0), a.emit("sliderFirstMove", o)), a.emit("sliderMove", o), i.isMoved = !0;
                            var f = a.isHorizontal() ? c : h;
                            n.diff = f, f *= s.touchRatio, l && (f = -f), a.swipeDirection = f > 0 ? "prev" : "next", i.currentTranslate = f + i.startTranslate;
                            var g = !0,
                                w = s.resistanceRatio;
                            if (s.touchReleaseOnEdges && (w = 0), f > 0 && i.currentTranslate > a.minTranslate() ? (g = !1, s.resistance && (i.currentTranslate = a.minTranslate() - 1 + Math.pow(-a.minTranslate() + i.startTranslate + f, w))) : f < 0 && i.currentTranslate < a.maxTranslate() && (g = !1, s.resistance && (i.currentTranslate = a.maxTranslate() + 1 - Math.pow(a.maxTranslate() - i.startTranslate - f, w))), g && (o.preventedByNestedSwiper = !0), !a.allowSlideNext && "next" === a.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !a.allowSlidePrev && "prev" === a.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), s.threshold > 0) {
                                if (!(Math.abs(f) > s.threshold || i.allowThresholdMove)) return void(i.currentTranslate = i.startTranslate);
                                if (!i.allowThresholdMove) return i.allowThresholdMove = !0, n.startX = n.currentX, n.startY = n.currentY, i.currentTranslate = i.startTranslate, void(n.diff = a.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY)
                            }
                            s.followFinger && !s.cssMode && ((s.freeMode || s.watchSlidesProgress || s.watchSlidesVisibility) && (a.updateActiveIndex(), a.updateSlidesClasses()), s.freeMode && (0 === i.velocities.length && i.velocities.push({
                                position: n[a.isHorizontal() ? "startX" : "startY"],
                                time: i.touchStartTime
                            }), i.velocities.push({
                                position: n[a.isHorizontal() ? "currentX" : "currentY"],
                                time: x()
                            })), a.updateProgress(i.currentTranslate), a.setTranslate(i.currentTranslate))
                        }
                    }
                }
            }
        } else i.startMoving && i.isScrolling && a.emit("touchMoveOpposite", o)
    }

    function D(e) {
        var t = this,
            a = t.touchEventsData,
            i = t.params,
            s = t.touches,
            r = t.rtlTranslate,
            n = t.$wrapperEl,
            l = t.slidesGrid,
            o = t.snapGrid,
            d = e;
        if (d.originalEvent && (d = d.originalEvent), a.allowTouchCallbacks && t.emit("touchEnd", d), a.allowTouchCallbacks = !1, !a.isTouched) return a.isMoved && i.grabCursor && t.setGrabCursor(!1), a.isMoved = !1, void(a.startMoving = !1);
        i.grabCursor && a.isMoved && a.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
        var p, u = x(),
            c = u - a.touchStartTime;
        if (t.allowClick && (t.updateClickedSlide(d), t.emit("tap click", d), c < 300 && u - a.lastClickTime < 300 && t.emit("doubleTap doubleClick", d)), a.lastClickTime = x(), E((function() {
                t.destroyed || (t.allowClick = !0)
            })), !a.isTouched || !a.isMoved || !t.swipeDirection || 0 === s.diff || a.currentTranslate === a.startTranslate) return a.isTouched = !1, a.isMoved = !1, void(a.startMoving = !1);
        if (a.isTouched = !1, a.isMoved = !1, a.startMoving = !1, p = i.followFinger ? r ? t.translate : -t.translate : -a.currentTranslate, !i.cssMode)
            if (i.freeMode) {
                if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex);
                if (p > -t.maxTranslate()) return void(t.slides.length < o.length ? t.slideTo(o.length - 1) : t.slideTo(t.slides.length - 1));
                if (i.freeModeMomentum) {
                    if (a.velocities.length > 1) {
                        var h = a.velocities.pop(),
                            v = a.velocities.pop(),
                            f = h.position - v.position,
                            m = h.time - v.time;
                        t.velocity = f / m, t.velocity /= 2, Math.abs(t.velocity) < i.freeModeMinimumVelocity && (t.velocity = 0), (m > 150 || x() - h.time > 300) && (t.velocity = 0)
                    } else t.velocity = 0;
                    t.velocity *= i.freeModeMomentumVelocityRatio, a.velocities.length = 0;
                    var g = 1e3 * i.freeModeMomentumRatio,
                        w = t.velocity * g,
                        y = t.translate + w;
                    r && (y = -y);
                    var b, T, C = !1,
                        S = 20 * Math.abs(t.velocity) * i.freeModeMomentumBounceRatio;
                    if (y < t.maxTranslate()) i.freeModeMomentumBounce ? (y + t.maxTranslate() < -S && (y = t.maxTranslate() - S), b = t.maxTranslate(), C = !0, a.allowMomentumBounce = !0) : y = t.maxTranslate(), i.loop && i.centeredSlides && (T = !0);
                    else if (y > t.minTranslate()) i.freeModeMomentumBounce ? (y - t.minTranslate() > S && (y = t.minTranslate() + S), b = t.minTranslate(), C = !0, a.allowMomentumBounce = !0) : y = t.minTranslate(), i.loop && i.centeredSlides && (T = !0);
                    else if (i.freeModeSticky) {
                        for (var M, z = 0; z < o.length; z += 1)
                            if (o[z] > -y) {
                                M = z;
                                break
                            }
                        y = -(y = Math.abs(o[M] - y) < Math.abs(o[M - 1] - y) || "next" === t.swipeDirection ? o[M] : o[M - 1])
                    }
                    if (T && t.once("transitionEnd", (function() {
                            t.loopFix()
                        })), 0 !== t.velocity) {
                        if (g = r ? Math.abs((-y - t.translate) / t.velocity) : Math.abs((y - t.translate) / t.velocity), i.freeModeSticky) {
                            var P = Math.abs((r ? -y : y) - t.translate),
                                k = t.slidesSizesGrid[t.activeIndex];
                            g = P < k ? i.speed : P < 2 * k ? 1.5 * i.speed : 2.5 * i.speed
                        }
                    } else if (i.freeModeSticky) return void t.slideToClosest();
                    i.freeModeMomentumBounce && C ? (t.updateProgress(b), t.setTransition(g), t.setTranslate(y), t.transitionStart(!0, t.swipeDirection), t.animating = !0, n.transitionEnd((function() {
                        t && !t.destroyed && a.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(i.speed), setTimeout((function() {
                            t.setTranslate(b), n.transitionEnd((function() {
                                t && !t.destroyed && t.transitionEnd()
                            }))
                        }), 0))
                    }))) : t.velocity ? (t.updateProgress(y), t.setTransition(g), t.setTranslate(y), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, n.transitionEnd((function() {
                        t && !t.destroyed && t.transitionEnd()
                    })))) : t.updateProgress(y), t.updateActiveIndex(), t.updateSlidesClasses()
                } else if (i.freeModeSticky) return void t.slideToClosest();
                (!i.freeModeMomentum || c >= i.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
            } else {
                for (var L = 0, $ = t.slidesSizesGrid[0], I = 0; I < l.length; I += I < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup) {
                    var O = I < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
                    void 0 !== l[I + O] ? p >= l[I] && p < l[I + O] && (L = I, $ = l[I + O] - l[I]) : p >= l[I] && (L = I, $ = l[l.length - 1] - l[l.length - 2])
                }
                var A = (p - l[L]) / $,
                    D = L < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
                if (c > i.longSwipesMs) {
                    if (!i.longSwipes) return void t.slideTo(t.activeIndex);
                    "next" === t.swipeDirection && (A >= i.longSwipesRatio ? t.slideTo(L + D) : t.slideTo(L)), "prev" === t.swipeDirection && (A > 1 - i.longSwipesRatio ? t.slideTo(L + D) : t.slideTo(L))
                } else {
                    if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
                    t.navigation && (d.target === t.navigation.nextEl || d.target === t.navigation.prevEl) ? d.target === t.navigation.nextEl ? t.slideTo(L + D) : t.slideTo(L) : ("next" === t.swipeDirection && t.slideTo(L + D), "prev" === t.swipeDirection && t.slideTo(L))
                }
            }
    }

    function G() {
        var e = this,
            t = e.params,
            a = e.el;
        if (!a || 0 !== a.offsetWidth) {
            t.breakpoints && e.setBreakpoint();
            var i = e.allowSlideNext,
                s = e.allowSlidePrev,
                r = e.snapGrid;
            e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses(), ("auto" === t.slidesPerView || t.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(), e.allowSlidePrev = s, e.allowSlideNext = i, e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
        }
    }

    function N(e) {
        var t = this;
        t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
    }

    function B() {
        var e = this,
            t = e.wrapperEl,
            a = e.rtlTranslate;
        e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = a ? t.scrollWidth - t.offsetWidth - t.scrollLeft : -t.scrollLeft : e.translate = -t.scrollTop, -0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
        var i = e.maxTranslate() - e.minTranslate();
        (0 === i ? 0 : (e.translate - e.minTranslate()) / i) !== e.progress && e.updateProgress(a ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1)
    }
    var H = !1;

    function X() {}
    var Y = {
            init: !0,
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            cssMode: !1,
            updateOnWindowResize: !0,
            nested: !1,
            width: null,
            height: null,
            preventInteractionOnTransition: !1,
            userAgent: null,
            url: null,
            edgeSwipeDetection: !1,
            edgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            slidesPerGroupSkip: 0,
            centeredSlides: !1,
            centeredSlidesBounds: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: !0,
            centerInsufficientSlides: !1,
            watchOverflow: !1,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            allowTouchMove: !0,
            threshold: 0,
            touchMoveStopPropagation: !1,
            touchStartPreventDefault: !0,
            touchStartForcePreventDefault: !1,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            resistance: !0,
            resistanceRatio: .85,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopFillGroupWithBlank: !1,
            loopPreventsSlide: !0,
            allowSlidePrev: !0,
            allowSlideNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: !0,
            containerModifierClass: "swiper-container-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: !0,
            _emitClasses: !1
        },
        R = {
            modular: {
                useParams: function(e) {
                    var t = this;
                    t.modules && Object.keys(t.modules).forEach((function(a) {
                        var i = t.modules[a];
                        i.params && S(e, i.params)
                    }))
                },
                useModules: function(e) {
                    void 0 === e && (e = {});
                    var t = this;
                    t.modules && Object.keys(t.modules).forEach((function(a) {
                        var i = t.modules[a],
                            s = e[a] || {};
                        i.on && t.on && Object.keys(i.on).forEach((function(e) {
                            t.on(e, i.on[e])
                        })), i.create && i.create.bind(t)(s)
                    }))
                }
            },
            eventsEmitter: {
                on: function(e, t, a) {
                    var i = this;
                    if ("function" != typeof t) return i;
                    var s = a ? "unshift" : "push";
                    return e.split(" ").forEach((function(e) {
                        i.eventsListeners[e] || (i.eventsListeners[e] = []), i.eventsListeners[e][s](t)
                    })), i
                },
                once: function(e, t, a) {
                    var i = this;
                    if ("function" != typeof t) return i;

                    function s() {
                        i.off(e, s), s.__emitterProxy && delete s.__emitterProxy;
                        for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++) r[n] = arguments[n];
                        t.apply(i, r)
                    }
                    return s.__emitterProxy = t, i.on(e, s, a)
                },
                onAny: function(e, t) {
                    var a = this;
                    if ("function" != typeof e) return a;
                    var i = t ? "unshift" : "push";
                    return a.eventsAnyListeners.indexOf(e) < 0 && a.eventsAnyListeners[i](e), a
                },
                offAny: function(e) {
                    var t = this;
                    if (!t.eventsAnyListeners) return t;
                    var a = t.eventsAnyListeners.indexOf(e);
                    return a >= 0 && t.eventsAnyListeners.splice(a, 1), t
                },
                off: function(e, t) {
                    var a = this;
                    return a.eventsListeners ? (e.split(" ").forEach((function(e) {
                        void 0 === t ? a.eventsListeners[e] = [] : a.eventsListeners[e] && a.eventsListeners[e].forEach((function(i, s) {
                            (i === t || i.__emitterProxy && i.__emitterProxy === t) && a.eventsListeners[e].splice(s, 1)
                        }))
                    })), a) : a
                },
                emit: function() {
                    var e, t, a, i = this;
                    if (!i.eventsListeners) return i;
                    for (var s = arguments.length, r = new Array(s), n = 0; n < s; n++) r[n] = arguments[n];
                    "string" == typeof r[0] || Array.isArray(r[0]) ? (e = r[0], t = r.slice(1, r.length), a = i) : (e = r[0].events, t = r[0].data, a = r[0].context || i), t.unshift(a);
                    var l = Array.isArray(e) ? e : e.split(" ");
                    return l.forEach((function(e) {
                        i.eventsAnyListeners && i.eventsAnyListeners.length && i.eventsAnyListeners.forEach((function(i) {
                            i.apply(a, [e].concat(t))
                        })), i.eventsListeners && i.eventsListeners[e] && i.eventsListeners[e].forEach((function(e) {
                            e.apply(a, t)
                        }))
                    })), i
                }
            },
            update: {
                updateSize: function() {
                    var e, t, a = this,
                        i = a.$el;
                    e = void 0 !== a.params.width && null !== a.params.width ? a.params.width : i[0].clientWidth, t = void 0 !== a.params.height && null !== a.params.height ? a.params.height : i[0].clientHeight, 0 === e && a.isHorizontal() || 0 === t && a.isVertical() || (e = e - parseInt(i.css("padding-left") || 0, 10) - parseInt(i.css("padding-right") || 0, 10), t = t - parseInt(i.css("padding-top") || 0, 10) - parseInt(i.css("padding-bottom") || 0, 10), Number.isNaN(e) && (e = 0), Number.isNaN(t) && (t = 0), S(a, {
                        width: e,
                        height: t,
                        size: a.isHorizontal() ? e : t
                    }))
                },
                updateSlides: function() {
                    var e = this,
                        t = function(t) {
                            return e.isHorizontal() ? t : {
                                width: "height",
                                "margin-top": "margin-left",
                                "margin-bottom ": "margin-right",
                                "margin-left": "margin-top",
                                "margin-right": "margin-bottom",
                                "padding-left": "padding-top",
                                "padding-right": "padding-bottom",
                                marginRight: "marginBottom"
                            }[t]
                        },
                        a = function(e, a) {
                            return parseFloat(e.getPropertyValue(t(a)) || 0)
                        },
                        i = l(),
                        s = e.params,
                        r = e.$wrapperEl,
                        n = e.size,
                        o = e.rtlTranslate,
                        d = e.wrongRTL,
                        p = e.virtual && s.virtual.enabled,
                        u = p ? e.virtual.slides.length : e.slides.length,
                        c = r.children("." + e.params.slideClass),
                        h = p ? e.virtual.slides.length : c.length,
                        v = [],
                        f = [],
                        m = [],
                        g = s.slidesOffsetBefore;
                    "function" == typeof g && (g = s.slidesOffsetBefore.call(e));
                    var w = s.slidesOffsetAfter;
                    "function" == typeof w && (w = s.slidesOffsetAfter.call(e));
                    var y = e.snapGrid.length,
                        b = e.slidesGrid.length,
                        E = s.spaceBetween,
                        x = -g,
                        T = 0,
                        C = 0;
                    if (void 0 !== n) {
                        var M, z;
                        "string" == typeof E && E.indexOf("%") >= 0 && (E = parseFloat(E.replace("%", "")) / 100 * n), e.virtualSize = -E, o ? c.css({
                            marginLeft: "",
                            marginTop: ""
                        }) : c.css({
                            marginRight: "",
                            marginBottom: ""
                        }), s.slidesPerColumn > 1 && (M = Math.floor(h / s.slidesPerColumn) === h / e.params.slidesPerColumn ? h : Math.ceil(h / s.slidesPerColumn) * s.slidesPerColumn, "auto" !== s.slidesPerView && "row" === s.slidesPerColumnFill && (M = Math.max(M, s.slidesPerView * s.slidesPerColumn)));
                        for (var P, k, L, $ = s.slidesPerColumn, I = M / $, O = Math.floor(h / s.slidesPerColumn), A = 0; A < h; A += 1) {
                            z = 0;
                            var D = c.eq(A);
                            if (s.slidesPerColumn > 1) {
                                var G = void 0,
                                    N = void 0,
                                    B = void 0;
                                if ("row" === s.slidesPerColumnFill && s.slidesPerGroup > 1) {
                                    var H = Math.floor(A / (s.slidesPerGroup * s.slidesPerColumn)),
                                        X = A - s.slidesPerColumn * s.slidesPerGroup * H,
                                        Y = 0 === H ? s.slidesPerGroup : Math.min(Math.ceil((h - H * $ * s.slidesPerGroup) / $), s.slidesPerGroup);
                                    G = (N = X - (B = Math.floor(X / Y)) * Y + H * s.slidesPerGroup) + B * M / $, D.css({
                                        "-webkit-box-ordinal-group": G,
                                        "-moz-box-ordinal-group": G,
                                        "-ms-flex-order": G,
                                        "-webkit-order": G,
                                        order: G
                                    })
                                } else "column" === s.slidesPerColumnFill ? (B = A - (N = Math.floor(A / $)) * $, (N > O || N === O && B === $ - 1) && (B += 1) >= $ && (B = 0, N += 1)) : N = A - (B = Math.floor(A / I)) * I;
                                D.css(t("margin-top"), 0 !== B && s.spaceBetween && s.spaceBetween + "px")
                            }
                            if ("none" !== D.css("display")) {
                                if ("auto" === s.slidesPerView) {
                                    var R = i.getComputedStyle(D[0], null),
                                        V = D[0].style.transform,
                                        W = D[0].style.webkitTransform;
                                    if (V && (D[0].style.transform = "none"), W && (D[0].style.webkitTransform = "none"), s.roundLengths) z = e.isHorizontal() ? D.outerWidth(!0) : D.outerHeight(!0);
                                    else {
                                        var F = a(R, "width"),
                                            q = a(R, "padding-left"),
                                            j = a(R, "padding-right"),
                                            _ = a(R, "margin-left"),
                                            U = a(R, "margin-right"),
                                            K = R.getPropertyValue(R, "box-sizing");
                                        if (K && "border-box" === K) z = F + _ + U;
                                        else {
                                            var Z = D[0],
                                                J = Z.clientWidth;
                                            z = F + q + j + _ + U + (Z.offsetWidth - J)
                                        }
                                    }
                                    V && (D[0].style.transform = V), W && (D[0].style.webkitTransform = W), s.roundLengths && (z = Math.floor(z))
                                } else z = (n - (s.slidesPerView - 1) * E) / s.slidesPerView, s.roundLengths && (z = Math.floor(z)), c[A] && (c[A].style[t("width")] = z + "px");
                                c[A] && (c[A].swiperSlideSize = z), m.push(z), s.centeredSlides ? (x = x + z / 2 + T / 2 + E, 0 === T && 0 !== A && (x = x - n / 2 - E), 0 === A && (x = x - n / 2 - E), Math.abs(x) < .001 && (x = 0), s.roundLengths && (x = Math.floor(x)), C % s.slidesPerGroup == 0 && v.push(x), f.push(x)) : (s.roundLengths && (x = Math.floor(x)), (C - Math.min(e.params.slidesPerGroupSkip, C)) % e.params.slidesPerGroup == 0 && v.push(x), f.push(x), x = x + z + E), e.virtualSize += z + E, T = z, C += 1
                            }
                        }
                        if (e.virtualSize = Math.max(e.virtualSize, n) + w, o && d && ("slide" === s.effect || "coverflow" === s.effect) && r.css({
                                width: e.virtualSize + s.spaceBetween + "px"
                            }), s.setWrapperSize) r.css(((k = {})[t("width")] = e.virtualSize + s.spaceBetween + "px", k));
                        if (s.slidesPerColumn > 1)
                            if (e.virtualSize = (z + s.spaceBetween) * M, e.virtualSize = Math.ceil(e.virtualSize / s.slidesPerColumn) - s.spaceBetween, r.css(((L = {})[t("width")] = e.virtualSize + s.spaceBetween + "px", L)), s.centeredSlides) {
                                P = [];
                                for (var Q = 0; Q < v.length; Q += 1) {
                                    var ee = v[Q];
                                    s.roundLengths && (ee = Math.floor(ee)), v[Q] < e.virtualSize + v[0] && P.push(ee)
                                }
                                v = P
                            }
                        if (!s.centeredSlides) {
                            P = [];
                            for (var te = 0; te < v.length; te += 1) {
                                var ae = v[te];
                                s.roundLengths && (ae = Math.floor(ae)), v[te] <= e.virtualSize - n && P.push(ae)
                            }
                            v = P, Math.floor(e.virtualSize - n) - Math.floor(v[v.length - 1]) > 1 && v.push(e.virtualSize - n)
                        }
                        if (0 === v.length && (v = [0]), 0 !== s.spaceBetween) {
                            var ie, se = e.isHorizontal() && o ? "marginLeft" : t("marginRight");
                            c.filter((function(e, t) {
                                return !s.cssMode || t !== c.length - 1
                            })).css(((ie = {})[se] = E + "px", ie))
                        }
                        if (s.centeredSlides && s.centeredSlidesBounds) {
                            var re = 0;
                            m.forEach((function(e) {
                                re += e + (s.spaceBetween ? s.spaceBetween : 0)
                            }));
                            var ne = (re -= s.spaceBetween) - n;
                            v = v.map((function(e) {
                                return e < 0 ? -g : e > ne ? ne + w : e
                            }))
                        }
                        if (s.centerInsufficientSlides) {
                            var le = 0;
                            if (m.forEach((function(e) {
                                    le += e + (s.spaceBetween ? s.spaceBetween : 0)
                                })), (le -= s.spaceBetween) < n) {
                                var oe = (n - le) / 2;
                                v.forEach((function(e, t) {
                                    v[t] = e - oe
                                })), f.forEach((function(e, t) {
                                    f[t] = e + oe
                                }))
                            }
                        }
                        S(e, {
                            slides: c,
                            snapGrid: v,
                            slidesGrid: f,
                            slidesSizesGrid: m
                        }), h !== u && e.emit("slidesLengthChange"), v.length !== y && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), f.length !== b && e.emit("slidesGridLengthChange"), (s.watchSlidesProgress || s.watchSlidesVisibility) && e.updateSlidesOffset()
                    }
                },
                updateAutoHeight: function(e) {
                    var t, a = this,
                        i = [],
                        s = 0;
                    if ("number" == typeof e ? a.setTransition(e) : !0 === e && a.setTransition(a.params.speed), "auto" !== a.params.slidesPerView && a.params.slidesPerView > 1)
                        if (a.params.centeredSlides) a.visibleSlides.each((function(e) {
                            i.push(e)
                        }));
                        else
                            for (t = 0; t < Math.ceil(a.params.slidesPerView); t += 1) {
                                var r = a.activeIndex + t;
                                if (r > a.slides.length) break;
                                i.push(a.slides.eq(r)[0])
                            } else i.push(a.slides.eq(a.activeIndex)[0]);
                    for (t = 0; t < i.length; t += 1)
                        if (void 0 !== i[t]) {
                            var n = i[t].offsetHeight;
                            s = n > s ? n : s
                        }
                    s && a.$wrapperEl.css("height", s + "px")
                },
                updateSlidesOffset: function() {
                    for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
                },
                updateSlidesProgress: function(e) {
                    void 0 === e && (e = this && this.translate || 0);
                    var t = this,
                        a = t.params,
                        i = t.slides,
                        s = t.rtlTranslate;
                    if (0 !== i.length) {
                        void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
                        var r = -e;
                        s && (r = e), i.removeClass(a.slideVisibleClass), t.visibleSlidesIndexes = [], t.visibleSlides = [];
                        for (var n = 0; n < i.length; n += 1) {
                            var l = i[n],
                                o = (r + (a.centeredSlides ? t.minTranslate() : 0) - l.swiperSlideOffset) / (l.swiperSlideSize + a.spaceBetween);
                            if (a.watchSlidesVisibility || a.centeredSlides && a.autoHeight) {
                                var d = -(r - l.swiperSlideOffset),
                                    p = d + t.slidesSizesGrid[n];
                                (d >= 0 && d < t.size - 1 || p > 1 && p <= t.size || d <= 0 && p >= t.size) && (t.visibleSlides.push(l), t.visibleSlidesIndexes.push(n), i.eq(n).addClass(a.slideVisibleClass))
                            }
                            l.progress = s ? -o : o
                        }
                        t.visibleSlides = m(t.visibleSlides)
                    }
                },
                updateProgress: function(e) {
                    var t = this;
                    if (void 0 === e) {
                        var a = t.rtlTranslate ? -1 : 1;
                        e = t && t.translate && t.translate * a || 0
                    }
                    var i = t.params,
                        s = t.maxTranslate() - t.minTranslate(),
                        r = t.progress,
                        n = t.isBeginning,
                        l = t.isEnd,
                        o = n,
                        d = l;
                    0 === s ? (r = 0, n = !0, l = !0) : (n = (r = (e - t.minTranslate()) / s) <= 0, l = r >= 1), S(t, {
                        progress: r,
                        isBeginning: n,
                        isEnd: l
                    }), (i.watchSlidesProgress || i.watchSlidesVisibility || i.centeredSlides && i.autoHeight) && t.updateSlidesProgress(e), n && !o && t.emit("reachBeginning toEdge"), l && !d && t.emit("reachEnd toEdge"), (o && !n || d && !l) && t.emit("fromEdge"), t.emit("progress", r)
                },
                updateSlidesClasses: function() {
                    var e, t = this,
                        a = t.slides,
                        i = t.params,
                        s = t.$wrapperEl,
                        r = t.activeIndex,
                        n = t.realIndex,
                        l = t.virtual && i.virtual.enabled;
                    a.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass), (e = l ? t.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + r + '"]') : a.eq(r)).addClass(i.slideActiveClass), i.loop && (e.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass));
                    var o = e.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
                    i.loop && 0 === o.length && (o = a.eq(0)).addClass(i.slideNextClass);
                    var d = e.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
                    i.loop && 0 === d.length && (d = a.eq(-1)).addClass(i.slidePrevClass), i.loop && (o.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass), d.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass)), t.emitSlidesClasses()
                },
                updateActiveIndex: function(e) {
                    var t, a = this,
                        i = a.rtlTranslate ? a.translate : -a.translate,
                        s = a.slidesGrid,
                        r = a.snapGrid,
                        n = a.params,
                        l = a.activeIndex,
                        o = a.realIndex,
                        d = a.snapIndex,
                        p = e;
                    if (void 0 === p) {
                        for (var u = 0; u < s.length; u += 1) void 0 !== s[u + 1] ? i >= s[u] && i < s[u + 1] - (s[u + 1] - s[u]) / 2 ? p = u : i >= s[u] && i < s[u + 1] && (p = u + 1) : i >= s[u] && (p = u);
                        n.normalizeSlideIndex && (p < 0 || void 0 === p) && (p = 0)
                    }
                    if (r.indexOf(i) >= 0) t = r.indexOf(i);
                    else {
                        var c = Math.min(n.slidesPerGroupSkip, p);
                        t = c + Math.floor((p - c) / n.slidesPerGroup)
                    }
                    if (t >= r.length && (t = r.length - 1), p !== l) {
                        var h = parseInt(a.slides.eq(p).attr("data-swiper-slide-index") || p, 10);
                        S(a, {
                            snapIndex: t,
                            realIndex: h,
                            previousIndex: l,
                            activeIndex: p
                        }), a.emit("activeIndexChange"), a.emit("snapIndexChange"), o !== h && a.emit("realIndexChange"), (a.initialized || a.params.runCallbacksOnInit) && a.emit("slideChange")
                    } else t !== d && (a.snapIndex = t, a.emit("snapIndexChange"))
                },
                updateClickedSlide: function(e) {
                    var t = this,
                        a = t.params,
                        i = m(e.target).closest("." + a.slideClass)[0],
                        s = !1;
                    if (i)
                        for (var r = 0; r < t.slides.length; r += 1) t.slides[r] === i && (s = !0);
                    if (!i || !s) return t.clickedSlide = void 0, void(t.clickedIndex = void 0);
                    t.clickedSlide = i, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(m(i).attr("data-swiper-slide-index"), 10) : t.clickedIndex = m(i).index(), a.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
                }
            },
            translate: {
                getTranslate: function(e) {
                    void 0 === e && (e = this.isHorizontal() ? "x" : "y");
                    var t = this,
                        a = t.params,
                        i = t.rtlTranslate,
                        s = t.translate,
                        r = t.$wrapperEl;
                    if (a.virtualTranslate) return i ? -s : s;
                    if (a.cssMode) return s;
                    var n = T(r[0], e);
                    return i && (n = -n), n || 0
                },
                setTranslate: function(e, t) {
                    var a = this,
                        i = a.rtlTranslate,
                        s = a.params,
                        r = a.$wrapperEl,
                        n = a.wrapperEl,
                        l = a.progress,
                        o = 0,
                        d = 0;
                    a.isHorizontal() ? o = i ? -e : e : d = e, s.roundLengths && (o = Math.floor(o), d = Math.floor(d)), s.cssMode ? n[a.isHorizontal() ? "scrollLeft" : "scrollTop"] = a.isHorizontal() ? -o : -d : s.virtualTranslate || r.transform("translate3d(" + o + "px, " + d + "px, 0px)"), a.previousTranslate = a.translate, a.translate = a.isHorizontal() ? o : d;
                    var p = a.maxTranslate() - a.minTranslate();
                    (0 === p ? 0 : (e - a.minTranslate()) / p) !== l && a.updateProgress(e), a.emit("setTranslate", a.translate, t)
                },
                minTranslate: function() {
                    return -this.snapGrid[0]
                },
                maxTranslate: function() {
                    return -this.snapGrid[this.snapGrid.length - 1]
                },
                translateTo: function(e, t, a, i, s) {
                    void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === a && (a = !0), void 0 === i && (i = !0);
                    var r = this,
                        n = r.params,
                        l = r.wrapperEl;
                    if (r.animating && n.preventInteractionOnTransition) return !1;
                    var o, d = r.minTranslate(),
                        p = r.maxTranslate();
                    if (o = i && e > d ? d : i && e < p ? p : e, r.updateProgress(o), n.cssMode) {
                        var u, c = r.isHorizontal();
                        if (0 === t) l[c ? "scrollLeft" : "scrollTop"] = -o;
                        else if (l.scrollTo) l.scrollTo(((u = {})[c ? "left" : "top"] = -o, u.behavior = "smooth", u));
                        else l[c ? "scrollLeft" : "scrollTop"] = -o;
                        return !0
                    }
                    return 0 === t ? (r.setTransition(0), r.setTranslate(o), a && (r.emit("beforeTransitionStart", t, s), r.emit("transitionEnd"))) : (r.setTransition(t), r.setTranslate(o), a && (r.emit("beforeTransitionStart", t, s), r.emit("transitionStart")), r.animating || (r.animating = !0, r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function(e) {
                        r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd), r.onTranslateToWrapperTransitionEnd = null, delete r.onTranslateToWrapperTransitionEnd, a && r.emit("transitionEnd"))
                    }), r.$wrapperEl[0].addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd))), !0
                }
            },
            transition: {
                setTransition: function(e, t) {
                    var a = this;
                    a.params.cssMode || a.$wrapperEl.transition(e), a.emit("setTransition", e, t)
                },
                transitionStart: function(e, t) {
                    void 0 === e && (e = !0);
                    var a = this,
                        i = a.activeIndex,
                        s = a.params,
                        r = a.previousIndex;
                    if (!s.cssMode) {
                        s.autoHeight && a.updateAutoHeight();
                        var n = t;
                        if (n || (n = i > r ? "next" : i < r ? "prev" : "reset"), a.emit("transitionStart"), e && i !== r) {
                            if ("reset" === n) return void a.emit("slideResetTransitionStart");
                            a.emit("slideChangeTransitionStart"), "next" === n ? a.emit("slideNextTransitionStart") : a.emit("slidePrevTransitionStart")
                        }
                    }
                },
                transitionEnd: function(e, t) {
                    void 0 === e && (e = !0);
                    var a = this,
                        i = a.activeIndex,
                        s = a.previousIndex,
                        r = a.params;
                    if (a.animating = !1, !r.cssMode) {
                        a.setTransition(0);
                        var n = t;
                        if (n || (n = i > s ? "next" : i < s ? "prev" : "reset"), a.emit("transitionEnd"), e && i !== s) {
                            if ("reset" === n) return void a.emit("slideResetTransitionEnd");
                            a.emit("slideChangeTransitionEnd"), "next" === n ? a.emit("slideNextTransitionEnd") : a.emit("slidePrevTransitionEnd")
                        }
                    }
                }
            },
            slide: {
                slideTo: function(e, t, a, i) {
                    if (void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === a && (a = !0), "number" != typeof e && "string" != typeof e) throw new Error("The 'index' argument cannot have type other than 'number' or 'string'. [" + typeof e + "] given.");
                    if ("string" == typeof e) {
                        var s = parseInt(e, 10);
                        if (!isFinite(s)) throw new Error("The passed-in 'index' (string) couldn't be converted to 'number'. [" + e + "] given.");
                        e = s
                    }
                    var r = this,
                        n = e;
                    n < 0 && (n = 0);
                    var l = r.params,
                        o = r.snapGrid,
                        d = r.slidesGrid,
                        p = r.previousIndex,
                        u = r.activeIndex,
                        c = r.rtlTranslate,
                        h = r.wrapperEl;
                    if (r.animating && l.preventInteractionOnTransition) return !1;
                    var v = Math.min(r.params.slidesPerGroupSkip, n),
                        f = v + Math.floor((n - v) / r.params.slidesPerGroup);
                    f >= o.length && (f = o.length - 1), (u || l.initialSlide || 0) === (p || 0) && a && r.emit("beforeSlideChangeStart");
                    var m, g = -o[f];
                    if (r.updateProgress(g), l.normalizeSlideIndex)
                        for (var w = 0; w < d.length; w += 1) {
                            var y = -Math.floor(100 * g),
                                b = Math.floor(100 * d[w]),
                                E = Math.floor(100 * d[w + 1]);
                            void 0 !== d[w + 1] ? y >= b && y < E - (E - b) / 2 ? n = w : y >= b && y < E && (n = w + 1) : y >= b && (n = w)
                        }
                    if (r.initialized && n !== u) {
                        if (!r.allowSlideNext && g < r.translate && g < r.minTranslate()) return !1;
                        if (!r.allowSlidePrev && g > r.translate && g > r.maxTranslate() && (u || 0) !== n) return !1
                    }
                    if (m = n > u ? "next" : n < u ? "prev" : "reset", c && -g === r.translate || !c && g === r.translate) return r.updateActiveIndex(n), l.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), "slide" !== l.effect && r.setTranslate(g), "reset" !== m && (r.transitionStart(a, m), r.transitionEnd(a, m)), !1;
                    if (l.cssMode) {
                        var x, T = r.isHorizontal(),
                            C = -g;
                        if (c && (C = h.scrollWidth - h.offsetWidth - C), 0 === t) h[T ? "scrollLeft" : "scrollTop"] = C;
                        else if (h.scrollTo) h.scrollTo(((x = {})[T ? "left" : "top"] = C, x.behavior = "smooth", x));
                        else h[T ? "scrollLeft" : "scrollTop"] = C;
                        return !0
                    }
                    return 0 === t ? (r.setTransition(0), r.setTranslate(g), r.updateActiveIndex(n), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, i), r.transitionStart(a, m), r.transitionEnd(a, m)) : (r.setTransition(t), r.setTranslate(g), r.updateActiveIndex(n), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, i), r.transitionStart(a, m), r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function(e) {
                        r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(a, m))
                    }), r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd))), !0
                },
                slideToLoop: function(e, t, a, i) {
                    void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === a && (a = !0);
                    var s = this,
                        r = e;
                    return s.params.loop && (r += s.loopedSlides), s.slideTo(r, t, a, i)
                },
                slideNext: function(e, t, a) {
                    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                    var i = this,
                        s = i.params,
                        r = i.animating,
                        n = i.activeIndex < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup;
                    if (s.loop) {
                        if (r && s.loopPreventsSlide) return !1;
                        i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft
                    }
                    return i.slideTo(i.activeIndex + n, e, t, a)
                },
                slidePrev: function(e, t, a) {
                    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                    var i = this,
                        s = i.params,
                        r = i.animating,
                        n = i.snapGrid,
                        l = i.slidesGrid,
                        o = i.rtlTranslate;
                    if (s.loop) {
                        if (r && s.loopPreventsSlide) return !1;
                        i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft
                    }

                    function d(e) {
                        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
                    }
                    var p = d(o ? i.translate : -i.translate),
                        u = n.map((function(e) {
                            return d(e)
                        }));
                    n[u.indexOf(p)];
                    var c, h = n[u.indexOf(p) - 1];
                    return void 0 === h && s.cssMode && n.forEach((function(e) {
                        !h && p >= e && (h = e)
                    })), void 0 !== h && (c = l.indexOf(h)) < 0 && (c = i.activeIndex - 1), i.slideTo(c, e, t, a)
                },
                slideReset: function(e, t, a) {
                    return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, a)
                },
                slideToClosest: function(e, t, a, i) {
                    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === i && (i = .5);
                    var s = this,
                        r = s.activeIndex,
                        n = Math.min(s.params.slidesPerGroupSkip, r),
                        l = n + Math.floor((r - n) / s.params.slidesPerGroup),
                        o = s.rtlTranslate ? s.translate : -s.translate;
                    if (o >= s.snapGrid[l]) {
                        var d = s.snapGrid[l];
                        o - d > (s.snapGrid[l + 1] - d) * i && (r += s.params.slidesPerGroup)
                    } else {
                        var p = s.snapGrid[l - 1];
                        o - p <= (s.snapGrid[l] - p) * i && (r -= s.params.slidesPerGroup)
                    }
                    return r = Math.max(r, 0), r = Math.min(r, s.slidesGrid.length - 1), s.slideTo(r, e, t, a)
                },
                slideToClickedSlide: function() {
                    var e, t = this,
                        a = t.params,
                        i = t.$wrapperEl,
                        s = "auto" === a.slidesPerView ? t.slidesPerViewDynamic() : a.slidesPerView,
                        r = t.clickedIndex;
                    if (a.loop) {
                        if (t.animating) return;
                        e = parseInt(m(t.clickedSlide).attr("data-swiper-slide-index"), 10), a.centeredSlides ? r < t.loopedSlides - s / 2 || r > t.slides.length - t.loopedSlides + s / 2 ? (t.loopFix(), r = i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ")").eq(0).index(), E((function() {
                            t.slideTo(r)
                        }))) : t.slideTo(r) : r > t.slides.length - s ? (t.loopFix(), r = i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ")").eq(0).index(), E((function() {
                            t.slideTo(r)
                        }))) : t.slideTo(r)
                    } else t.slideTo(r)
                }
            },
            loop: {
                loopCreate: function() {
                    var e = this,
                        t = r(),
                        a = e.params,
                        i = e.$wrapperEl;
                    i.children("." + a.slideClass + "." + a.slideDuplicateClass).remove();
                    var s = i.children("." + a.slideClass);
                    if (a.loopFillGroupWithBlank) {
                        var n = a.slidesPerGroup - s.length % a.slidesPerGroup;
                        if (n !== a.slidesPerGroup) {
                            for (var l = 0; l < n; l += 1) {
                                var o = m(t.createElement("div")).addClass(a.slideClass + " " + a.slideBlankClass);
                                i.append(o)
                            }
                            s = i.children("." + a.slideClass)
                        }
                    }
                    "auto" !== a.slidesPerView || a.loopedSlides || (a.loopedSlides = s.length), e.loopedSlides = Math.ceil(parseFloat(a.loopedSlides || a.slidesPerView, 10)), e.loopedSlides += a.loopAdditionalSlides, e.loopedSlides > s.length && (e.loopedSlides = s.length);
                    var d = [],
                        p = [];
                    s.each((function(t, a) {
                        var i = m(t);
                        a < e.loopedSlides && p.push(t), a < s.length && a >= s.length - e.loopedSlides && d.push(t), i.attr("data-swiper-slide-index", a)
                    }));
                    for (var u = 0; u < p.length; u += 1) i.append(m(p[u].cloneNode(!0)).addClass(a.slideDuplicateClass));
                    for (var c = d.length - 1; c >= 0; c -= 1) i.prepend(m(d[c].cloneNode(!0)).addClass(a.slideDuplicateClass))
                },
                loopFix: function() {
                    var e = this;
                    e.emit("beforeLoopFix");
                    var t, a = e.activeIndex,
                        i = e.slides,
                        s = e.loopedSlides,
                        r = e.allowSlidePrev,
                        n = e.allowSlideNext,
                        l = e.snapGrid,
                        o = e.rtlTranslate;
                    e.allowSlidePrev = !0, e.allowSlideNext = !0;
                    var d = -l[a] - e.getTranslate();
                    if (a < s) t = i.length - 3 * s + a, t += s, e.slideTo(t, 0, !1, !0) && 0 !== d && e.setTranslate((o ? -e.translate : e.translate) - d);
                    else if (a >= i.length - s) {
                        t = -i.length + a + s, t += s, e.slideTo(t, 0, !1, !0) && 0 !== d && e.setTranslate((o ? -e.translate : e.translate) - d)
                    }
                    e.allowSlidePrev = r, e.allowSlideNext = n, e.emit("loopFix")
                },
                loopDestroy: function() {
                    var e = this,
                        t = e.$wrapperEl,
                        a = e.params,
                        i = e.slides;
                    t.children("." + a.slideClass + "." + a.slideDuplicateClass + ",." + a.slideClass + "." + a.slideBlankClass).remove(), i.removeAttr("data-swiper-slide-index")
                }
            },
            grabCursor: {
                setGrabCursor: function(e) {
                    var t = this;
                    if (!(t.support.touch || !t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode)) {
                        var a = t.el;
                        a.style.cursor = "move", a.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", a.style.cursor = e ? "-moz-grabbin" : "-moz-grab", a.style.cursor = e ? "grabbing" : "grab"
                    }
                },
                unsetGrabCursor: function() {
                    var e = this;
                    e.support.touch || e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.el.style.cursor = "")
                }
            },
            manipulation: {
                appendSlide: function(e) {
                    var t = this,
                        a = t.$wrapperEl,
                        i = t.params;
                    if (i.loop && t.loopDestroy(), "object" == typeof e && "length" in e)
                        for (var s = 0; s < e.length; s += 1) e[s] && a.append(e[s]);
                    else a.append(e);
                    i.loop && t.loopCreate(), i.observer && t.support.observer || t.update()
                },
                prependSlide: function(e) {
                    var t = this,
                        a = t.params,
                        i = t.$wrapperEl,
                        s = t.activeIndex;
                    a.loop && t.loopDestroy();
                    var r = s + 1;
                    if ("object" == typeof e && "length" in e) {
                        for (var n = 0; n < e.length; n += 1) e[n] && i.prepend(e[n]);
                        r = s + e.length
                    } else i.prepend(e);
                    a.loop && t.loopCreate(), a.observer && t.support.observer || t.update(), t.slideTo(r, 0, !1)
                },
                addSlide: function(e, t) {
                    var a = this,
                        i = a.$wrapperEl,
                        s = a.params,
                        r = a.activeIndex;
                    s.loop && (r -= a.loopedSlides, a.loopDestroy(), a.slides = i.children("." + s.slideClass));
                    var n = a.slides.length;
                    if (e <= 0) a.prependSlide(t);
                    else if (e >= n) a.appendSlide(t);
                    else {
                        for (var l = r > e ? r + 1 : r, o = [], d = n - 1; d >= e; d -= 1) {
                            var p = a.slides.eq(d);
                            p.remove(), o.unshift(p)
                        }
                        if ("object" == typeof t && "length" in t) {
                            for (var u = 0; u < t.length; u += 1) t[u] && i.append(t[u]);
                            l = r > e ? r + t.length : r
                        } else i.append(t);
                        for (var c = 0; c < o.length; c += 1) i.append(o[c]);
                        s.loop && a.loopCreate(), s.observer && a.support.observer || a.update(), s.loop ? a.slideTo(l + a.loopedSlides, 0, !1) : a.slideTo(l, 0, !1)
                    }
                },
                removeSlide: function(e) {
                    var t = this,
                        a = t.params,
                        i = t.$wrapperEl,
                        s = t.activeIndex;
                    a.loop && (s -= t.loopedSlides, t.loopDestroy(), t.slides = i.children("." + a.slideClass));
                    var r, n = s;
                    if ("object" == typeof e && "length" in e) {
                        for (var l = 0; l < e.length; l += 1) r = e[l], t.slides[r] && t.slides.eq(r).remove(), r < n && (n -= 1);
                        n = Math.max(n, 0)
                    } else r = e, t.slides[r] && t.slides.eq(r).remove(), r < n && (n -= 1), n = Math.max(n, 0);
                    a.loop && t.loopCreate(), a.observer && t.support.observer || t.update(), a.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1)
                },
                removeAllSlides: function() {
                    for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
                    this.removeSlide(e)
                }
            },
            events: {
                attachEvents: function() {
                    var e = this,
                        t = r(),
                        a = e.params,
                        i = e.touchEvents,
                        s = e.el,
                        n = e.wrapperEl,
                        l = e.device,
                        o = e.support;
                    e.onTouchStart = O.bind(e), e.onTouchMove = A.bind(e), e.onTouchEnd = D.bind(e), a.cssMode && (e.onScroll = B.bind(e)), e.onClick = N.bind(e);
                    var d = !!a.nested;
                    if (!o.touch && o.pointerEvents) s.addEventListener(i.start, e.onTouchStart, !1), t.addEventListener(i.move, e.onTouchMove, d), t.addEventListener(i.end, e.onTouchEnd, !1);
                    else {
                        if (o.touch) {
                            var p = !("touchstart" !== i.start || !o.passiveListener || !a.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                            s.addEventListener(i.start, e.onTouchStart, p), s.addEventListener(i.move, e.onTouchMove, o.passiveListener ? {
                                passive: !1,
                                capture: d
                            } : d), s.addEventListener(i.end, e.onTouchEnd, p), i.cancel && s.addEventListener(i.cancel, e.onTouchEnd, p), H || (t.addEventListener("touchstart", X), H = !0)
                        }(a.simulateTouch && !l.ios && !l.android || a.simulateTouch && !o.touch && l.ios) && (s.addEventListener("mousedown", e.onTouchStart, !1), t.addEventListener("mousemove", e.onTouchMove, d), t.addEventListener("mouseup", e.onTouchEnd, !1))
                    }(a.preventClicks || a.preventClicksPropagation) && s.addEventListener("click", e.onClick, !0), a.cssMode && n.addEventListener("scroll", e.onScroll), a.updateOnWindowResize ? e.on(l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", G, !0) : e.on("observerUpdate", G, !0)
                },
                detachEvents: function() {
                    var e = this,
                        t = r(),
                        a = e.params,
                        i = e.touchEvents,
                        s = e.el,
                        n = e.wrapperEl,
                        l = e.device,
                        o = e.support,
                        d = !!a.nested;
                    if (!o.touch && o.pointerEvents) s.removeEventListener(i.start, e.onTouchStart, !1), t.removeEventListener(i.move, e.onTouchMove, d), t.removeEventListener(i.end, e.onTouchEnd, !1);
                    else {
                        if (o.touch) {
                            var p = !("onTouchStart" !== i.start || !o.passiveListener || !a.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                            s.removeEventListener(i.start, e.onTouchStart, p), s.removeEventListener(i.move, e.onTouchMove, d), s.removeEventListener(i.end, e.onTouchEnd, p), i.cancel && s.removeEventListener(i.cancel, e.onTouchEnd, p)
                        }(a.simulateTouch && !l.ios && !l.android || a.simulateTouch && !o.touch && l.ios) && (s.removeEventListener("mousedown", e.onTouchStart, !1), t.removeEventListener("mousemove", e.onTouchMove, d), t.removeEventListener("mouseup", e.onTouchEnd, !1))
                    }(a.preventClicks || a.preventClicksPropagation) && s.removeEventListener("click", e.onClick, !0), a.cssMode && n.removeEventListener("scroll", e.onScroll), e.off(l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", G)
                }
            },
            breakpoints: {
                setBreakpoint: function() {
                    var e = this,
                        t = e.activeIndex,
                        a = e.initialized,
                        i = e.loopedSlides,
                        s = void 0 === i ? 0 : i,
                        r = e.params,
                        n = e.$el,
                        l = r.breakpoints;
                    if (l && (!l || 0 !== Object.keys(l).length)) {
                        var o = e.getBreakpoint(l);
                        if (o && e.currentBreakpoint !== o) {
                            var d = o in l ? l[o] : void 0;
                            d && ["slidesPerView", "spaceBetween", "slidesPerGroup", "slidesPerGroupSkip", "slidesPerColumn"].forEach((function(e) {
                                var t = d[e];
                                void 0 !== t && (d[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto")
                            }));
                            var p = d || e.originalParams,
                                u = r.slidesPerColumn > 1,
                                c = p.slidesPerColumn > 1;
                            u && !c ? (n.removeClass(r.containerModifierClass + "multirow " + r.containerModifierClass + "multirow-column"), e.emitContainerClasses()) : !u && c && (n.addClass(r.containerModifierClass + "multirow"), "column" === p.slidesPerColumnFill && n.addClass(r.containerModifierClass + "multirow-column"), e.emitContainerClasses());
                            var h = p.direction && p.direction !== r.direction,
                                v = r.loop && (p.slidesPerView !== r.slidesPerView || h);
                            h && a && e.changeDirection(), S(e.params, p), S(e, {
                                allowTouchMove: e.params.allowTouchMove,
                                allowSlideNext: e.params.allowSlideNext,
                                allowSlidePrev: e.params.allowSlidePrev
                            }), e.currentBreakpoint = o, e.emit("_beforeBreakpoint", p), v && a && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - s + e.loopedSlides, 0, !1)), e.emit("breakpoint", p)
                        }
                    }
                },
                getBreakpoint: function(e) {
                    var t = l();
                    if (e) {
                        var a = !1,
                            i = Object.keys(e).map((function(e) {
                                if ("string" == typeof e && 0 === e.indexOf("@")) {
                                    var a = parseFloat(e.substr(1));
                                    return {
                                        value: t.innerHeight * a,
                                        point: e
                                    }
                                }
                                return {
                                    value: e,
                                    point: e
                                }
                            }));
                        i.sort((function(e, t) {
                            return parseInt(e.value, 10) - parseInt(t.value, 10)
                        }));
                        for (var s = 0; s < i.length; s += 1) {
                            var r = i[s],
                                n = r.point;
                            r.value <= t.innerWidth && (a = n)
                        }
                        return a || "max"
                    }
                }
            },
            checkOverflow: {
                checkOverflow: function() {
                    var e = this,
                        t = e.params,
                        a = e.isLocked,
                        i = e.slides.length > 0 && t.slidesOffsetBefore + t.spaceBetween * (e.slides.length - 1) + e.slides[0].offsetWidth * e.slides.length;
                    t.slidesOffsetBefore && t.slidesOffsetAfter && i ? e.isLocked = i <= e.size : e.isLocked = 1 === e.snapGrid.length, e.allowSlideNext = !e.isLocked, e.allowSlidePrev = !e.isLocked, a !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"), a && a !== e.isLocked && (e.isEnd = !1, e.navigation && e.navigation.update())
                }
            },
            classes: {
                addClasses: function() {
                    var e, t, a, i = this,
                        s = i.classNames,
                        r = i.params,
                        n = i.rtl,
                        l = i.$el,
                        o = i.device,
                        d = i.support,
                        p = (e = ["initialized", r.direction, {
                            "pointer-events": d.pointerEvents && !d.touch
                        }, {
                            "free-mode": r.freeMode
                        }, {
                            autoheight: r.autoHeight
                        }, {
                            rtl: n
                        }, {
                            multirow: r.slidesPerColumn > 1
                        }, {
                            "multirow-column": r.slidesPerColumn > 1 && "column" === r.slidesPerColumnFill
                        }, {
                            android: o.android
                        }, {
                            ios: o.ios
                        }, {
                            "css-mode": r.cssMode
                        }], t = r.containerModifierClass, a = [], e.forEach((function(e) {
                            "object" == typeof e ? Object.entries(e).forEach((function(e) {
                                var i = e[0];
                                e[1] && a.push(t + i)
                            })) : "string" == typeof e && a.push(t + e)
                        })), a);
                    s.push.apply(s, p), l.addClass([].concat(s).join(" ")), i.emitContainerClasses()
                },
                removeClasses: function() {
                    var e = this,
                        t = e.$el,
                        a = e.classNames;
                    t.removeClass(a.join(" ")), e.emitContainerClasses()
                }
            },
            images: {
                loadImage: function(e, t, a, i, s, r) {
                    var n, o = l();

                    function d() {
                        r && r()
                    }
                    m(e).parent("picture")[0] || e.complete && s ? d() : t ? ((n = new o.Image).onload = d, n.onerror = d, i && (n.sizes = i), a && (n.srcset = a), t && (n.src = t)) : d()
                },
                preloadImages: function() {
                    var e = this;

                    function t() {
                        null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
                    }
                    e.imagesToLoad = e.$el.find("img");
                    for (var a = 0; a < e.imagesToLoad.length; a += 1) {
                        var i = e.imagesToLoad[a];
                        e.loadImage(i, i.currentSrc || i.getAttribute("src"), i.srcset || i.getAttribute("srcset"), i.sizes || i.getAttribute("sizes"), !0, t)
                    }
                }
            }
        },
        V = {},
        W = function() {
            function t() {
                for (var e, a, i = arguments.length, s = new Array(i), r = 0; r < i; r++) s[r] = arguments[r];
                if (1 === s.length && s[0].constructor && s[0].constructor === Object ? a = s[0] : (e = s[0], a = s[1]), a || (a = {}), a = S({}, a), e && !a.el && (a.el = e), a.el && m(a.el).length > 1) {
                    var n = [];
                    return m(a.el).each((function(e) {
                        var i = S({}, a, {
                            el: e
                        });
                        n.push(new t(i))
                    })), n
                }
                var l = this;
                l.support = z(), l.device = P({
                    userAgent: a.userAgent
                }), l.browser = k(), l.eventsListeners = {}, l.eventsAnyListeners = [], void 0 === l.modules && (l.modules = {}), Object.keys(l.modules).forEach((function(e) {
                    var t = l.modules[e];
                    if (t.params) {
                        var i = Object.keys(t.params)[0],
                            s = t.params[i];
                        if ("object" != typeof s || null === s) return;
                        if (!(i in a) || !("enabled" in s)) return;
                        !0 === a[i] && (a[i] = {
                            enabled: !0
                        }), "object" != typeof a[i] || "enabled" in a[i] || (a[i].enabled = !0), a[i] || (a[i] = {
                            enabled: !1
                        })
                    }
                }));
                var o, d, p = S({}, Y);
                return l.useParams(p), l.params = S({}, p, V, a), l.originalParams = S({}, l.params), l.passedParams = S({}, a), l.params && l.params.on && Object.keys(l.params.on).forEach((function(e) {
                    l.on(e, l.params.on[e])
                })), l.params && l.params.onAny && l.onAny(l.params.onAny), l.$ = m, S(l, {
                    el: e,
                    classNames: [],
                    slides: m(),
                    slidesGrid: [],
                    snapGrid: [],
                    slidesSizesGrid: [],
                    isHorizontal: function() {
                        return "horizontal" === l.params.direction
                    },
                    isVertical: function() {
                        return "vertical" === l.params.direction
                    },
                    activeIndex: 0,
                    realIndex: 0,
                    isBeginning: !0,
                    isEnd: !1,
                    translate: 0,
                    previousTranslate: 0,
                    progress: 0,
                    velocity: 0,
                    animating: !1,
                    allowSlideNext: l.params.allowSlideNext,
                    allowSlidePrev: l.params.allowSlidePrev,
                    touchEvents: (o = ["touchstart", "touchmove", "touchend", "touchcancel"], d = ["mousedown", "mousemove", "mouseup"], l.support.pointerEvents && (d = ["pointerdown", "pointermove", "pointerup"]), l.touchEventsTouch = {
                        start: o[0],
                        move: o[1],
                        end: o[2],
                        cancel: o[3]
                    }, l.touchEventsDesktop = {
                        start: d[0],
                        move: d[1],
                        end: d[2]
                    }, l.support.touch || !l.params.simulateTouch ? l.touchEventsTouch : l.touchEventsDesktop),
                    touchEventsData: {
                        isTouched: void 0,
                        isMoved: void 0,
                        allowTouchCallbacks: void 0,
                        touchStartTime: void 0,
                        isScrolling: void 0,
                        currentTranslate: void 0,
                        startTranslate: void 0,
                        allowThresholdMove: void 0,
                        formElements: "input, select, option, textarea, button, video, label",
                        lastClickTime: x(),
                        clickTimeout: void 0,
                        velocities: [],
                        allowMomentumBounce: void 0,
                        isTouchEvent: void 0,
                        startMoving: void 0
                    },
                    allowClick: !0,
                    allowTouchMove: l.params.allowTouchMove,
                    touches: {
                        startX: 0,
                        startY: 0,
                        currentX: 0,
                        currentY: 0,
                        diff: 0
                    },
                    imagesToLoad: [],
                    imagesLoaded: 0
                }), l.useModules(), l.emit("_swiper"), l.params.init && l.init(), l
            }
            var a, i, s, r = t.prototype;
            return r.emitContainerClasses = function() {
                var e = this;
                if (e.params._emitClasses && e.el) {
                    var t = e.el.className.split(" ").filter((function(t) {
                        return 0 === t.indexOf("swiper-container") || 0 === t.indexOf(e.params.containerModifierClass)
                    }));
                    e.emit("_containerClasses", t.join(" "))
                }
            }, r.getSlideClasses = function(e) {
                var t = this;
                return e.className.split(" ").filter((function(e) {
                    return 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass)
                })).join(" ")
            }, r.emitSlidesClasses = function() {
                var e = this;
                if (e.params._emitClasses && e.el) {
                    var t = [];
                    e.slides.each((function(a) {
                        var i = e.getSlideClasses(a);
                        t.push({
                            slideEl: a,
                            classNames: i
                        }), e.emit("_slideClass", a, i)
                    })), e.emit("_slideClasses", t)
                }
            }, r.slidesPerViewDynamic = function() {
                var e = this,
                    t = e.params,
                    a = e.slides,
                    i = e.slidesGrid,
                    s = e.size,
                    r = e.activeIndex,
                    n = 1;
                if (t.centeredSlides) {
                    for (var l, o = a[r].swiperSlideSize, d = r + 1; d < a.length; d += 1) a[d] && !l && (n += 1, (o += a[d].swiperSlideSize) > s && (l = !0));
                    for (var p = r - 1; p >= 0; p -= 1) a[p] && !l && (n += 1, (o += a[p].swiperSlideSize) > s && (l = !0))
                } else
                    for (var u = r + 1; u < a.length; u += 1) i[u] - i[r] < s && (n += 1);
                return n
            }, r.update = function() {
                var e = this;
                if (e && !e.destroyed) {
                    var t = e.snapGrid,
                        a = e.params;
                    a.breakpoints && e.setBreakpoint(), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode ? (i(), e.params.autoHeight && e.updateAutoHeight()) : (("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0)) || i(), a.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update")
                }

                function i() {
                    var t = e.rtlTranslate ? -1 * e.translate : e.translate,
                        a = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                    e.setTranslate(a), e.updateActiveIndex(), e.updateSlidesClasses()
                }
            }, r.changeDirection = function(e, t) {
                void 0 === t && (t = !0);
                var a = this,
                    i = a.params.direction;
                return e || (e = "horizontal" === i ? "vertical" : "horizontal"), e === i || "horizontal" !== e && "vertical" !== e || (a.$el.removeClass("" + a.params.containerModifierClass + i).addClass("" + a.params.containerModifierClass + e), a.emitContainerClasses(), a.params.direction = e, a.slides.each((function(t) {
                    "vertical" === e ? t.style.width = "" : t.style.height = ""
                })), a.emit("changeDirection"), t && a.update()), a
            }, r.mount = function(e) {
                var t = this;
                if (t.mounted) return !0;
                var a, i = m(e || t.params.el);
                return !!(e = i[0]) && (e.swiper = t, e && e.shadowRoot && e.shadowRoot.querySelector ? (a = m(e.shadowRoot.querySelector("." + t.params.wrapperClass))).children = function(e) {
                    return i.children(e)
                } : a = i.children("." + t.params.wrapperClass), S(t, {
                    $el: i,
                    el: e,
                    $wrapperEl: a,
                    wrapperEl: a[0],
                    mounted: !0,
                    rtl: "rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction"),
                    rtlTranslate: "horizontal" === t.params.direction && ("rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction")),
                    wrongRTL: "-webkit-box" === a.css("display")
                }), !0)
            }, r.init = function(e) {
                var t = this;
                return t.initialized || !1 === t.mount(e) || (t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.params.loop && t.loopCreate(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.setGrabCursor(), t.params.preloadImages && t.preloadImages(), t.params.loop ? t.slideTo(t.params.initialSlide + t.loopedSlides, 0, t.params.runCallbacksOnInit) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit), t.attachEvents(), t.initialized = !0, t.emit("init"), t.emit("afterInit")), t
            }, r.destroy = function(e, t) {
                void 0 === e && (e = !0), void 0 === t && (t = !0);
                var a, i = this,
                    s = i.params,
                    r = i.$el,
                    n = i.$wrapperEl,
                    l = i.slides;
                return void 0 === i.params || i.destroyed || (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), s.loop && i.loopDestroy(), t && (i.removeClasses(), r.removeAttr("style"), n.removeAttr("style"), l && l.length && l.removeClass([s.slideVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")), i.emit("destroy"), Object.keys(i.eventsListeners).forEach((function(e) {
                    i.off(e)
                })), !1 !== e && (i.$el[0].swiper = null, a = i, Object.keys(a).forEach((function(e) {
                    try {
                        a[e] = null
                    } catch (e) {}
                    try {
                        delete a[e]
                    } catch (e) {}
                }))), i.destroyed = !0), null
            }, t.extendDefaults = function(e) {
                S(V, e)
            }, t.installModule = function(e) {
                t.prototype.modules || (t.prototype.modules = {});
                var a = e.name || Object.keys(t.prototype.modules).length + "_" + x();
                t.prototype.modules[a] = e
            }, t.use = function(e) {
                return Array.isArray(e) ? (e.forEach((function(e) {
                    return t.installModule(e)
                })), t) : (t.installModule(e), t)
            }, a = t, s = [{
                key: "extendedDefaults",
                get: function() {
                    return V
                }
            }, {
                key: "defaults",
                get: function() {
                    return Y
                }
            }], (i = null) && e(a.prototype, i), s && e(a, s), t
        }();
    Object.keys(R).forEach((function(e) {
        Object.keys(R[e]).forEach((function(t) {
            W.prototype[t] = R[e][t]
        }))
    })), W.use([L, I]);
    var F = {
            update: function(e) {
                var t = this,
                    a = t.params,
                    i = a.slidesPerView,
                    s = a.slidesPerGroup,
                    r = a.centeredSlides,
                    n = t.params.virtual,
                    l = n.addSlidesBefore,
                    o = n.addSlidesAfter,
                    d = t.virtual,
                    p = d.from,
                    u = d.to,
                    c = d.slides,
                    h = d.slidesGrid,
                    v = d.renderSlide,
                    f = d.offset;
                t.updateActiveIndex();
                var m, g, w, y = t.activeIndex || 0;
                m = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top", r ? (g = Math.floor(i / 2) + s + o, w = Math.floor(i / 2) + s + l) : (g = i + (s - 1) + o, w = s + l);
                var b = Math.max((y || 0) - w, 0),
                    E = Math.min((y || 0) + g, c.length - 1),
                    x = (t.slidesGrid[b] || 0) - (t.slidesGrid[0] || 0);

                function T() {
                    t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load()
                }
                if (S(t.virtual, {
                        from: b,
                        to: E,
                        offset: x,
                        slidesGrid: t.slidesGrid
                    }), p === b && u === E && !e) return t.slidesGrid !== h && x !== f && t.slides.css(m, x + "px"), void t.updateProgress();
                if (t.params.virtual.renderExternal) return t.params.virtual.renderExternal.call(t, {
                    offset: x,
                    from: b,
                    to: E,
                    slides: function() {
                        for (var e = [], t = b; t <= E; t += 1) e.push(c[t]);
                        return e
                    }()
                }), void(t.params.virtual.renderExternalUpdate && T());
                var C = [],
                    M = [];
                if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
                else
                    for (var z = p; z <= u; z += 1)(z < b || z > E) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + z + '"]').remove();
                for (var P = 0; P < c.length; P += 1) P >= b && P <= E && (void 0 === u || e ? M.push(P) : (P > u && M.push(P), P < p && C.push(P)));
                M.forEach((function(e) {
                    t.$wrapperEl.append(v(c[e], e))
                })), C.sort((function(e, t) {
                    return t - e
                })).forEach((function(e) {
                    t.$wrapperEl.prepend(v(c[e], e))
                })), t.$wrapperEl.children(".swiper-slide").css(m, x + "px"), T()
            },
            renderSlide: function(e, t) {
                var a = this,
                    i = a.params.virtual;
                if (i.cache && a.virtual.cache[t]) return a.virtual.cache[t];
                var s = i.renderSlide ? m(i.renderSlide.call(a, e, t)) : m('<div class="' + a.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
                return s.attr("data-swiper-slide-index") || s.attr("data-swiper-slide-index", t), i.cache && (a.virtual.cache[t] = s), s
            },
            appendSlide: function(e) {
                var t = this;
                if ("object" == typeof e && "length" in e)
                    for (var a = 0; a < e.length; a += 1) e[a] && t.virtual.slides.push(e[a]);
                else t.virtual.slides.push(e);
                t.virtual.update(!0)
            },
            prependSlide: function(e) {
                var t = this,
                    a = t.activeIndex,
                    i = a + 1,
                    s = 1;
                if (Array.isArray(e)) {
                    for (var r = 0; r < e.length; r += 1) e[r] && t.virtual.slides.unshift(e[r]);
                    i = a + e.length, s = e.length
                } else t.virtual.slides.unshift(e);
                if (t.params.virtual.cache) {
                    var n = t.virtual.cache,
                        l = {};
                    Object.keys(n).forEach((function(e) {
                        var t = n[e],
                            a = t.attr("data-swiper-slide-index");
                        a && t.attr("data-swiper-slide-index", parseInt(a, 10) + 1), l[parseInt(e, 10) + s] = t
                    })), t.virtual.cache = l
                }
                t.virtual.update(!0), t.slideTo(i, 0)
            },
            removeSlide: function(e) {
                var t = this;
                if (null != e) {
                    var a = t.activeIndex;
                    if (Array.isArray(e))
                        for (var i = e.length - 1; i >= 0; i -= 1) t.virtual.slides.splice(e[i], 1), t.params.virtual.cache && delete t.virtual.cache[e[i]], e[i] < a && (a -= 1), a = Math.max(a, 0);
                    else t.virtual.slides.splice(e, 1), t.params.virtual.cache && delete t.virtual.cache[e], e < a && (a -= 1), a = Math.max(a, 0);
                    t.virtual.update(!0), t.slideTo(a, 0)
                }
            },
            removeAllSlides: function() {
                var e = this;
                e.virtual.slides = [], e.params.virtual.cache && (e.virtual.cache = {}), e.virtual.update(!0), e.slideTo(0, 0)
            }
        },
        q = {
            name: "virtual",
            params: {
                virtual: {
                    enabled: !1,
                    slides: [],
                    cache: !0,
                    renderSlide: null,
                    renderExternal: null,
                    renderExternalUpdate: !0,
                    addSlidesBefore: 0,
                    addSlidesAfter: 0
                }
            },
            create: function() {
                M(this, {
                    virtual: t({}, F, {
                        slides: this.params.virtual.slides,
                        cache: {}
                    })
                })
            },
            on: {
                beforeInit: function(e) {
                    if (e.params.virtual.enabled) {
                        e.classNames.push(e.params.containerModifierClass + "virtual");
                        var t = {
                            watchSlidesProgress: !0
                        };
                        S(e.params, t), S(e.originalParams, t), e.params.initialSlide || e.virtual.update()
                    }
                },
                setTranslate: function(e) {
                    e.params.virtual.enabled && e.virtual.update()
                }
            }
        },
        j = {
            handle: function(e) {
                var t = this,
                    a = l(),
                    i = r(),
                    s = t.rtlTranslate,
                    n = e;
                n.originalEvent && (n = n.originalEvent);
                var o = n.keyCode || n.charCode,
                    d = t.params.keyboard.pageUpDown,
                    p = d && 33 === o,
                    u = d && 34 === o,
                    c = 37 === o,
                    h = 39 === o,
                    v = 38 === o,
                    f = 40 === o;
                if (!t.allowSlideNext && (t.isHorizontal() && h || t.isVertical() && f || u)) return !1;
                if (!t.allowSlidePrev && (t.isHorizontal() && c || t.isVertical() && v || p)) return !1;
                if (!(n.shiftKey || n.altKey || n.ctrlKey || n.metaKey || i.activeElement && i.activeElement.nodeName && ("input" === i.activeElement.nodeName.toLowerCase() || "textarea" === i.activeElement.nodeName.toLowerCase()))) {
                    if (t.params.keyboard.onlyInViewport && (p || u || c || h || v || f)) {
                        var m = !1;
                        if (t.$el.parents("." + t.params.slideClass).length > 0 && 0 === t.$el.parents("." + t.params.slideActiveClass).length) return;
                        var g = a.innerWidth,
                            w = a.innerHeight,
                            y = t.$el.offset();
                        s && (y.left -= t.$el[0].scrollLeft);
                        for (var b = [
                                [y.left, y.top],
                                [y.left + t.width, y.top],
                                [y.left, y.top + t.height],
                                [y.left + t.width, y.top + t.height]
                            ], E = 0; E < b.length; E += 1) {
                            var x = b[E];
                            if (x[0] >= 0 && x[0] <= g && x[1] >= 0 && x[1] <= w) {
                                if (0 === x[0] && 0 === x[1]) continue;
                                m = !0
                            }
                        }
                        if (!m) return
                    }
                    t.isHorizontal() ? ((p || u || c || h) && (n.preventDefault ? n.preventDefault() : n.returnValue = !1), ((u || h) && !s || (p || c) && s) && t.slideNext(), ((p || c) && !s || (u || h) && s) && t.slidePrev()) : ((p || u || v || f) && (n.preventDefault ? n.preventDefault() : n.returnValue = !1), (u || f) && t.slideNext(), (p || v) && t.slidePrev()), t.emit("keyPress", o)
                }
            },
            enable: function() {
                var e = this,
                    t = r();
                e.keyboard.enabled || (m(t).on("keydown", e.keyboard.handle), e.keyboard.enabled = !0)
            },
            disable: function() {
                var e = this,
                    t = r();
                e.keyboard.enabled && (m(t).off("keydown", e.keyboard.handle), e.keyboard.enabled = !1)
            }
        },
        _ = {
            name: "keyboard",
            params: {
                keyboard: {
                    enabled: !1,
                    onlyInViewport: !0,
                    pageUpDown: !0
                }
            },
            create: function() {
                M(this, {
                    keyboard: t({
                        enabled: !1
                    }, j)
                })
            },
            on: {
                init: function(e) {
                    e.params.keyboard.enabled && e.keyboard.enable()
                },
                destroy: function(e) {
                    e.keyboard.enabled && e.keyboard.disable()
                }
            }
        };
    var U = {
            lastScrollTime: x(),
            lastEventBeforeSnap: void 0,
            recentWheelEvents: [],
            event: function() {
                return l().navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function() {
                    var e = r(),
                        t = "onwheel",
                        a = t in e;
                    if (!a) {
                        var i = e.createElement("div");
                        i.setAttribute(t, "return;"), a = "function" == typeof i.onwheel
                    }
                    return !a && e.implementation && e.implementation.hasFeature && !0 !== e.implementation.hasFeature("", "") && (a = e.implementation.hasFeature("Events.wheel", "3.0")), a
                }() ? "wheel" : "mousewheel"
            },
            normalize: function(e) {
                var t = 0,
                    a = 0,
                    i = 0,
                    s = 0;
                return "detail" in e && (a = e.detail), "wheelDelta" in e && (a = -e.wheelDelta / 120), "wheelDeltaY" in e && (a = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = a, a = 0), i = 10 * t, s = 10 * a, "deltaY" in e && (s = e.deltaY), "deltaX" in e && (i = e.deltaX), e.shiftKey && !i && (i = s, s = 0), (i || s) && e.deltaMode && (1 === e.deltaMode ? (i *= 40, s *= 40) : (i *= 800, s *= 800)), i && !t && (t = i < 1 ? -1 : 1), s && !a && (a = s < 1 ? -1 : 1), {
                    spinX: t,
                    spinY: a,
                    pixelX: i,
                    pixelY: s
                }
            },
            handleMouseEnter: function() {
                this.mouseEntered = !0
            },
            handleMouseLeave: function() {
                this.mouseEntered = !1
            },
            handle: function(e) {
                var t = e,
                    a = this,
                    i = a.params.mousewheel;
                a.params.cssMode && t.preventDefault();
                var s = a.$el;
                if ("container" !== a.params.mousewheel.eventsTarget && (s = m(a.params.mousewheel.eventsTarget)), !a.mouseEntered && !s[0].contains(t.target) && !i.releaseOnEdges) return !0;
                t.originalEvent && (t = t.originalEvent);
                var r = 0,
                    n = a.rtlTranslate ? -1 : 1,
                    l = U.normalize(t);
                if (i.forceToAxis)
                    if (a.isHorizontal()) {
                        if (!(Math.abs(l.pixelX) > Math.abs(l.pixelY))) return !0;
                        r = -l.pixelX * n
                    } else {
                        if (!(Math.abs(l.pixelY) > Math.abs(l.pixelX))) return !0;
                        r = -l.pixelY
                    }
                else r = Math.abs(l.pixelX) > Math.abs(l.pixelY) ? -l.pixelX * n : -l.pixelY;
                if (0 === r) return !0;
                i.invert && (r = -r);
                var o = a.getTranslate() + r * i.sensitivity;
                if (o >= a.minTranslate() && (o = a.minTranslate()), o <= a.maxTranslate() && (o = a.maxTranslate()), (!!a.params.loop || !(o === a.minTranslate() || o === a.maxTranslate())) && a.params.nested && t.stopPropagation(), a.params.freeMode) {
                    var d = {
                            time: x(),
                            delta: Math.abs(r),
                            direction: Math.sign(r)
                        },
                        p = a.mousewheel.lastEventBeforeSnap,
                        u = p && d.time < p.time + 500 && d.delta <= p.delta && d.direction === p.direction;
                    if (!u) {
                        a.mousewheel.lastEventBeforeSnap = void 0, a.params.loop && a.loopFix();
                        var c = a.getTranslate() + r * i.sensitivity,
                            h = a.isBeginning,
                            v = a.isEnd;
                        if (c >= a.minTranslate() && (c = a.minTranslate()), c <= a.maxTranslate() && (c = a.maxTranslate()), a.setTransition(0), a.setTranslate(c), a.updateProgress(), a.updateActiveIndex(), a.updateSlidesClasses(), (!h && a.isBeginning || !v && a.isEnd) && a.updateSlidesClasses(), a.params.freeModeSticky) {
                            clearTimeout(a.mousewheel.timeout), a.mousewheel.timeout = void 0;
                            var f = a.mousewheel.recentWheelEvents;
                            f.length >= 15 && f.shift();
                            var g = f.length ? f[f.length - 1] : void 0,
                                w = f[0];
                            if (f.push(d), g && (d.delta > g.delta || d.direction !== g.direction)) f.splice(0);
                            else if (f.length >= 15 && d.time - w.time < 500 && w.delta - d.delta >= 1 && d.delta <= 6) {
                                var y = r > 0 ? .8 : .2;
                                a.mousewheel.lastEventBeforeSnap = d, f.splice(0), a.mousewheel.timeout = E((function() {
                                    a.slideToClosest(a.params.speed, !0, void 0, y)
                                }), 0)
                            }
                            a.mousewheel.timeout || (a.mousewheel.timeout = E((function() {
                                a.mousewheel.lastEventBeforeSnap = d, f.splice(0), a.slideToClosest(a.params.speed, !0, void 0, .5)
                            }), 500))
                        }
                        if (u || a.emit("scroll", t), a.params.autoplay && a.params.autoplayDisableOnInteraction && a.autoplay.stop(), c === a.minTranslate() || c === a.maxTranslate()) return !0
                    }
                } else {
                    var b = {
                            time: x(),
                            delta: Math.abs(r),
                            direction: Math.sign(r),
                            raw: e
                        },
                        T = a.mousewheel.recentWheelEvents;
                    T.length >= 2 && T.shift();
                    var C = T.length ? T[T.length - 1] : void 0;
                    if (T.push(b), C ? (b.direction !== C.direction || b.delta > C.delta || b.time > C.time + 150) && a.mousewheel.animateSlider(b) : a.mousewheel.animateSlider(b), a.mousewheel.releaseScroll(b)) return !0
                }
                return t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1
            },
            animateSlider: function(e) {
                var t = this,
                    a = l();
                return !(this.params.mousewheel.thresholdDelta && e.delta < this.params.mousewheel.thresholdDelta) && (!(this.params.mousewheel.thresholdTime && x() - t.mousewheel.lastScrollTime < this.params.mousewheel.thresholdTime) && (e.delta >= 6 && x() - t.mousewheel.lastScrollTime < 60 || (e.direction < 0 ? t.isEnd && !t.params.loop || t.animating || (t.slideNext(), t.emit("scroll", e.raw)) : t.isBeginning && !t.params.loop || t.animating || (t.slidePrev(), t.emit("scroll", e.raw)), t.mousewheel.lastScrollTime = (new a.Date).getTime(), !1)))
            },
            releaseScroll: function(e) {
                var t = this,
                    a = t.params.mousewheel;
                if (e.direction < 0) {
                    if (t.isEnd && !t.params.loop && a.releaseOnEdges) return !0
                } else if (t.isBeginning && !t.params.loop && a.releaseOnEdges) return !0;
                return !1
            },
            enable: function() {
                var e = this,
                    t = U.event();
                if (e.params.cssMode) return e.wrapperEl.removeEventListener(t, e.mousewheel.handle), !0;
                if (!t) return !1;
                if (e.mousewheel.enabled) return !1;
                var a = e.$el;
                return "container" !== e.params.mousewheel.eventsTarget && (a = m(e.params.mousewheel.eventsTarget)), a.on("mouseenter", e.mousewheel.handleMouseEnter), a.on("mouseleave", e.mousewheel.handleMouseLeave), a.on(t, e.mousewheel.handle), e.mousewheel.enabled = !0, !0
            },
            disable: function() {
                var e = this,
                    t = U.event();
                if (e.params.cssMode) return e.wrapperEl.addEventListener(t, e.mousewheel.handle), !0;
                if (!t) return !1;
                if (!e.mousewheel.enabled) return !1;
                var a = e.$el;
                return "container" !== e.params.mousewheel.eventsTarget && (a = m(e.params.mousewheel.eventsTarget)), a.off(t, e.mousewheel.handle), e.mousewheel.enabled = !1, !0
            }
        },
        K = {
            update: function() {
                var e = this,
                    t = e.params.navigation;
                if (!e.params.loop) {
                    var a = e.navigation,
                        i = a.$nextEl,
                        s = a.$prevEl;
                    s && s.length > 0 && (e.isBeginning ? s.addClass(t.disabledClass) : s.removeClass(t.disabledClass), s[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass)), i && i.length > 0 && (e.isEnd ? i.addClass(t.disabledClass) : i.removeClass(t.disabledClass), i[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass))
                }
            },
            onPrevClick: function(e) {
                var t = this;
                e.preventDefault(), t.isBeginning && !t.params.loop || t.slidePrev()
            },
            onNextClick: function(e) {
                var t = this;
                e.preventDefault(), t.isEnd && !t.params.loop || t.slideNext()
            },
            init: function() {
                var e, t, a = this,
                    i = a.params.navigation;
                (i.nextEl || i.prevEl) && (i.nextEl && (e = m(i.nextEl), a.params.uniqueNavElements && "string" == typeof i.nextEl && e.length > 1 && 1 === a.$el.find(i.nextEl).length && (e = a.$el.find(i.nextEl))), i.prevEl && (t = m(i.prevEl), a.params.uniqueNavElements && "string" == typeof i.prevEl && t.length > 1 && 1 === a.$el.find(i.prevEl).length && (t = a.$el.find(i.prevEl))), e && e.length > 0 && e.on("click", a.navigation.onNextClick), t && t.length > 0 && t.on("click", a.navigation.onPrevClick), S(a.navigation, {
                    $nextEl: e,
                    nextEl: e && e[0],
                    $prevEl: t,
                    prevEl: t && t[0]
                }))
            },
            destroy: function() {
                var e = this,
                    t = e.navigation,
                    a = t.$nextEl,
                    i = t.$prevEl;
                a && a.length && (a.off("click", e.navigation.onNextClick), a.removeClass(e.params.navigation.disabledClass)), i && i.length && (i.off("click", e.navigation.onPrevClick), i.removeClass(e.params.navigation.disabledClass))
            }
        },
        Z = {
            update: function() {
                var e = this,
                    t = e.rtl,
                    a = e.params.pagination;
                if (a.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var i, s = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                        r = e.pagination.$el,
                        n = e.params.loop ? Math.ceil((s - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                    if (e.params.loop ? ((i = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup)) > s - 1 - 2 * e.loopedSlides && (i -= s - 2 * e.loopedSlides), i > n - 1 && (i -= n), i < 0 && "bullets" !== e.params.paginationType && (i = n + i)) : i = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0, "bullets" === a.type && e.pagination.bullets && e.pagination.bullets.length > 0) {
                        var l, o, d, p = e.pagination.bullets;
                        if (a.dynamicBullets && (e.pagination.bulletSize = p.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0), r.css(e.isHorizontal() ? "width" : "height", e.pagination.bulletSize * (a.dynamicMainBullets + 4) + "px"), a.dynamicMainBullets > 1 && void 0 !== e.previousIndex && (e.pagination.dynamicBulletIndex += i - e.previousIndex, e.pagination.dynamicBulletIndex > a.dynamicMainBullets - 1 ? e.pagination.dynamicBulletIndex = a.dynamicMainBullets - 1 : e.pagination.dynamicBulletIndex < 0 && (e.pagination.dynamicBulletIndex = 0)), l = i - e.pagination.dynamicBulletIndex, d = ((o = l + (Math.min(p.length, a.dynamicMainBullets) - 1)) + l) / 2), p.removeClass(a.bulletActiveClass + " " + a.bulletActiveClass + "-next " + a.bulletActiveClass + "-next-next " + a.bulletActiveClass + "-prev " + a.bulletActiveClass + "-prev-prev " + a.bulletActiveClass + "-main"), r.length > 1) p.each((function(e) {
                            var t = m(e),
                                s = t.index();
                            s === i && t.addClass(a.bulletActiveClass), a.dynamicBullets && (s >= l && s <= o && t.addClass(a.bulletActiveClass + "-main"), s === l && t.prev().addClass(a.bulletActiveClass + "-prev").prev().addClass(a.bulletActiveClass + "-prev-prev"), s === o && t.next().addClass(a.bulletActiveClass + "-next").next().addClass(a.bulletActiveClass + "-next-next"))
                        }));
                        else {
                            var u = p.eq(i),
                                c = u.index();
                            if (u.addClass(a.bulletActiveClass), a.dynamicBullets) {
                                for (var h = p.eq(l), v = p.eq(o), f = l; f <= o; f += 1) p.eq(f).addClass(a.bulletActiveClass + "-main");
                                if (e.params.loop)
                                    if (c >= p.length - a.dynamicMainBullets) {
                                        for (var g = a.dynamicMainBullets; g >= 0; g -= 1) p.eq(p.length - g).addClass(a.bulletActiveClass + "-main");
                                        p.eq(p.length - a.dynamicMainBullets - 1).addClass(a.bulletActiveClass + "-prev")
                                    } else h.prev().addClass(a.bulletActiveClass + "-prev").prev().addClass(a.bulletActiveClass + "-prev-prev"), v.next().addClass(a.bulletActiveClass + "-next").next().addClass(a.bulletActiveClass + "-next-next");
                                else h.prev().addClass(a.bulletActiveClass + "-prev").prev().addClass(a.bulletActiveClass + "-prev-prev"), v.next().addClass(a.bulletActiveClass + "-next").next().addClass(a.bulletActiveClass + "-next-next")
                            }
                        }
                        if (a.dynamicBullets) {
                            var w = Math.min(p.length, a.dynamicMainBullets + 4),
                                y = (e.pagination.bulletSize * w - e.pagination.bulletSize) / 2 - d * e.pagination.bulletSize,
                                b = t ? "right" : "left";
                            p.css(e.isHorizontal() ? b : "top", y + "px")
                        }
                    }
                    if ("fraction" === a.type && (r.find("." + a.currentClass).text(a.formatFractionCurrent(i + 1)), r.find("." + a.totalClass).text(a.formatFractionTotal(n))), "progressbar" === a.type) {
                        var E;
                        E = a.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
                        var x = (i + 1) / n,
                            T = 1,
                            C = 1;
                        "horizontal" === E ? T = x : C = x, r.find("." + a.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + T + ") scaleY(" + C + ")").transition(e.params.speed)
                    }
                    "custom" === a.type && a.renderCustom ? (r.html(a.renderCustom(e, i + 1, n)), e.emit("paginationRender", r[0])) : e.emit("paginationUpdate", r[0]), r[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](a.lockClass)
                }
            },
            render: function() {
                var e = this,
                    t = e.params.pagination;
                if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var a = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                        i = e.pagination.$el,
                        s = "";
                    if ("bullets" === t.type) {
                        var r = e.params.loop ? Math.ceil((a - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                        e.params.freeMode && !e.params.loop && r > a && (r = a);
                        for (var n = 0; n < r; n += 1) t.renderBullet ? s += t.renderBullet.call(e, n, t.bulletClass) : s += "<" + t.bulletElement + ' class="' + t.bulletClass + '"></' + t.bulletElement + ">";
                        i.html(s), e.pagination.bullets = i.find("." + t.bulletClass.replace(/ /g, "."))
                    }
                    "fraction" === t.type && (s = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : '<span class="' + t.currentClass + '"></span> / <span class="' + t.totalClass + '"></span>', i.html(s)), "progressbar" === t.type && (s = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : '<span class="' + t.progressbarFillClass + '"></span>', i.html(s)), "custom" !== t.type && e.emit("paginationRender", e.pagination.$el[0])
                }
            },
            init: function() {
                var e = this,
                    t = e.params.pagination;
                if (t.el) {
                    var a = m(t.el);
                    0 !== a.length && (e.params.uniqueNavElements && "string" == typeof t.el && a.length > 1 && (a = e.$el.find(t.el)), "bullets" === t.type && t.clickable && a.addClass(t.clickableClass), a.addClass(t.modifierClass + t.type), "bullets" === t.type && t.dynamicBullets && (a.addClass("" + t.modifierClass + t.type + "-dynamic"), e.pagination.dynamicBulletIndex = 0, t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)), "progressbar" === t.type && t.progressbarOpposite && a.addClass(t.progressbarOppositeClass), t.clickable && a.on("click", "." + t.bulletClass.replace(/ /g, "."), (function(t) {
                        t.preventDefault();
                        var a = m(this).index() * e.params.slidesPerGroup;
                        e.params.loop && (a += e.loopedSlides), e.slideTo(a)
                    })), S(e.pagination, {
                        $el: a,
                        el: a[0]
                    }))
                }
            },
            destroy: function() {
                var e = this,
                    t = e.params.pagination;
                if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var a = e.pagination.$el;
                    a.removeClass(t.hiddenClass), a.removeClass(t.modifierClass + t.type), e.pagination.bullets && e.pagination.bullets.removeClass(t.bulletActiveClass), t.clickable && a.off("click", "." + t.bulletClass.replace(/ /g, "."))
                }
            }
        },
        J = {
            setTranslate: function() {
                var e = this;
                if (e.params.scrollbar.el && e.scrollbar.el) {
                    var t = e.scrollbar,
                        a = e.rtlTranslate,
                        i = e.progress,
                        s = t.dragSize,
                        r = t.trackSize,
                        n = t.$dragEl,
                        l = t.$el,
                        o = e.params.scrollbar,
                        d = s,
                        p = (r - s) * i;
                    a ? (p = -p) > 0 ? (d = s - p, p = 0) : -p + s > r && (d = r + p) : p < 0 ? (d = s + p, p = 0) : p + s > r && (d = r - p), e.isHorizontal() ? (n.transform("translate3d(" + p + "px, 0, 0)"), n[0].style.width = d + "px") : (n.transform("translate3d(0px, " + p + "px, 0)"), n[0].style.height = d + "px"), o.hide && (clearTimeout(e.scrollbar.timeout), l[0].style.opacity = 1, e.scrollbar.timeout = setTimeout((function() {
                        l[0].style.opacity = 0, l.transition(400)
                    }), 1e3))
                }
            },
            setTransition: function(e) {
                var t = this;
                t.params.scrollbar.el && t.scrollbar.el && t.scrollbar.$dragEl.transition(e)
            },
            updateSize: function() {
                var e = this;
                if (e.params.scrollbar.el && e.scrollbar.el) {
                    var t = e.scrollbar,
                        a = t.$dragEl,
                        i = t.$el;
                    a[0].style.width = "", a[0].style.height = "";
                    var s, r = e.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight,
                        n = e.size / e.virtualSize,
                        l = n * (r / e.size);
                    s = "auto" === e.params.scrollbar.dragSize ? r * n : parseInt(e.params.scrollbar.dragSize, 10), e.isHorizontal() ? a[0].style.width = s + "px" : a[0].style.height = s + "px", i[0].style.display = n >= 1 ? "none" : "", e.params.scrollbar.hide && (i[0].style.opacity = 0), S(t, {
                        trackSize: r,
                        divider: n,
                        moveDivider: l,
                        dragSize: s
                    }), t.$el[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](e.params.scrollbar.lockClass)
                }
            },
            getPointerPosition: function(e) {
                return this.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientX : e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientY : e.clientY
            },
            setDragPosition: function(e) {
                var t, a = this,
                    i = a.scrollbar,
                    s = a.rtlTranslate,
                    r = i.$el,
                    n = i.dragSize,
                    l = i.trackSize,
                    o = i.dragStartPos;
                t = (i.getPointerPosition(e) - r.offset()[a.isHorizontal() ? "left" : "top"] - (null !== o ? o : n / 2)) / (l - n), t = Math.max(Math.min(t, 1), 0), s && (t = 1 - t);
                var d = a.minTranslate() + (a.maxTranslate() - a.minTranslate()) * t;
                a.updateProgress(d), a.setTranslate(d), a.updateActiveIndex(), a.updateSlidesClasses()
            },
            onDragStart: function(e) {
                var t = this,
                    a = t.params.scrollbar,
                    i = t.scrollbar,
                    s = t.$wrapperEl,
                    r = i.$el,
                    n = i.$dragEl;
                t.scrollbar.isTouched = !0, t.scrollbar.dragStartPos = e.target === n[0] || e.target === n ? i.getPointerPosition(e) - e.target.getBoundingClientRect()[t.isHorizontal() ? "left" : "top"] : null, e.preventDefault(), e.stopPropagation(), s.transition(100), n.transition(100), i.setDragPosition(e), clearTimeout(t.scrollbar.dragTimeout), r.transition(0), a.hide && r.css("opacity", 1), t.params.cssMode && t.$wrapperEl.css("scroll-snap-type", "none"), t.emit("scrollbarDragStart", e)
            },
            onDragMove: function(e) {
                var t = this,
                    a = t.scrollbar,
                    i = t.$wrapperEl,
                    s = a.$el,
                    r = a.$dragEl;
                t.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a.setDragPosition(e), i.transition(0), s.transition(0), r.transition(0), t.emit("scrollbarDragMove", e))
            },
            onDragEnd: function(e) {
                var t = this,
                    a = t.params.scrollbar,
                    i = t.scrollbar,
                    s = t.$wrapperEl,
                    r = i.$el;
                t.scrollbar.isTouched && (t.scrollbar.isTouched = !1, t.params.cssMode && (t.$wrapperEl.css("scroll-snap-type", ""), s.transition("")), a.hide && (clearTimeout(t.scrollbar.dragTimeout), t.scrollbar.dragTimeout = E((function() {
                    r.css("opacity", 0), r.transition(400)
                }), 1e3)), t.emit("scrollbarDragEnd", e), a.snapOnRelease && t.slideToClosest())
            },
            enableDraggable: function() {
                var e = this;
                if (e.params.scrollbar.el) {
                    var t = r(),
                        a = e.scrollbar,
                        i = e.touchEventsTouch,
                        s = e.touchEventsDesktop,
                        n = e.params,
                        l = e.support,
                        o = a.$el[0],
                        d = !(!l.passiveListener || !n.passiveListeners) && {
                            passive: !1,
                            capture: !1
                        },
                        p = !(!l.passiveListener || !n.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                    o && (l.touch ? (o.addEventListener(i.start, e.scrollbar.onDragStart, d), o.addEventListener(i.move, e.scrollbar.onDragMove, d), o.addEventListener(i.end, e.scrollbar.onDragEnd, p)) : (o.addEventListener(s.start, e.scrollbar.onDragStart, d), t.addEventListener(s.move, e.scrollbar.onDragMove, d), t.addEventListener(s.end, e.scrollbar.onDragEnd, p)))
                }
            },
            disableDraggable: function() {
                var e = this;
                if (e.params.scrollbar.el) {
                    var t = r(),
                        a = e.scrollbar,
                        i = e.touchEventsTouch,
                        s = e.touchEventsDesktop,
                        n = e.params,
                        l = e.support,
                        o = a.$el[0],
                        d = !(!l.passiveListener || !n.passiveListeners) && {
                            passive: !1,
                            capture: !1
                        },
                        p = !(!l.passiveListener || !n.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                    o && (l.touch ? (o.removeEventListener(i.start, e.scrollbar.onDragStart, d), o.removeEventListener(i.move, e.scrollbar.onDragMove, d), o.removeEventListener(i.end, e.scrollbar.onDragEnd, p)) : (o.removeEventListener(s.start, e.scrollbar.onDragStart, d), t.removeEventListener(s.move, e.scrollbar.onDragMove, d), t.removeEventListener(s.end, e.scrollbar.onDragEnd, p)))
                }
            },
            init: function() {
                var e = this;
                if (e.params.scrollbar.el) {
                    var t = e.scrollbar,
                        a = e.$el,
                        i = e.params.scrollbar,
                        s = m(i.el);
                    e.params.uniqueNavElements && "string" == typeof i.el && s.length > 1 && 1 === a.find(i.el).length && (s = a.find(i.el));
                    var r = s.find("." + e.params.scrollbar.dragClass);
                    0 === r.length && (r = m('<div class="' + e.params.scrollbar.dragClass + '"></div>'), s.append(r)), S(t, {
                        $el: s,
                        el: s[0],
                        $dragEl: r,
                        dragEl: r[0]
                    }), i.draggable && t.enableDraggable()
                }
            },
            destroy: function() {
                this.scrollbar.disableDraggable()
            }
        },
        Q = {
            setTransform: function(e, t) {
                var a = this.rtl,
                    i = m(e),
                    s = a ? -1 : 1,
                    r = i.attr("data-swiper-parallax") || "0",
                    n = i.attr("data-swiper-parallax-x"),
                    l = i.attr("data-swiper-parallax-y"),
                    o = i.attr("data-swiper-parallax-scale"),
                    d = i.attr("data-swiper-parallax-opacity");
                if (n || l ? (n = n || "0", l = l || "0") : this.isHorizontal() ? (n = r, l = "0") : (l = r, n = "0"), n = n.indexOf("%") >= 0 ? parseInt(n, 10) * t * s + "%" : n * t * s + "px", l = l.indexOf("%") >= 0 ? parseInt(l, 10) * t + "%" : l * t + "px", null != d) {
                    var p = d - (d - 1) * (1 - Math.abs(t));
                    i[0].style.opacity = p
                }
                if (null == o) i.transform("translate3d(" + n + ", " + l + ", 0px)");
                else {
                    var u = o - (o - 1) * (1 - Math.abs(t));
                    i.transform("translate3d(" + n + ", " + l + ", 0px) scale(" + u + ")")
                }
            },
            setTranslate: function() {
                var e = this,
                    t = e.$el,
                    a = e.slides,
                    i = e.progress,
                    s = e.snapGrid;
                t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t) {
                    e.parallax.setTransform(t, i)
                })), a.each((function(t, a) {
                    var r = t.progress;
                    e.params.slidesPerGroup > 1 && "auto" !== e.params.slidesPerView && (r += Math.ceil(a / 2) - i * (s.length - 1)), r = Math.min(Math.max(r, -1), 1), m(t).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t) {
                        e.parallax.setTransform(t, r)
                    }))
                }))
            },
            setTransition: function(e) {
                void 0 === e && (e = this.params.speed);
                this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t) {
                    var a = m(t),
                        i = parseInt(a.attr("data-swiper-parallax-duration"), 10) || e;
                    0 === e && (i = 0), a.transition(i)
                }))
            }
        },
        ee = {
            getDistanceBetweenTouches: function(e) {
                if (e.targetTouches.length < 2) return 1;
                var t = e.targetTouches[0].pageX,
                    a = e.targetTouches[0].pageY,
                    i = e.targetTouches[1].pageX,
                    s = e.targetTouches[1].pageY;
                return Math.sqrt(Math.pow(i - t, 2) + Math.pow(s - a, 2))
            },
            onGestureStart: function(e) {
                var t = this,
                    a = t.support,
                    i = t.params.zoom,
                    s = t.zoom,
                    r = s.gesture;
                if (s.fakeGestureTouched = !1, s.fakeGestureMoved = !1, !a.gestures) {
                    if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                    s.fakeGestureTouched = !0, r.scaleStart = ee.getDistanceBetweenTouches(e)
                }
                r.$slideEl && r.$slideEl.length || (r.$slideEl = m(e.target).closest("." + t.params.slideClass), 0 === r.$slideEl.length && (r.$slideEl = t.slides.eq(t.activeIndex)), r.$imageEl = r.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), r.$imageWrapEl = r.$imageEl.parent("." + i.containerClass), r.maxRatio = r.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio, 0 !== r.$imageWrapEl.length) ? (r.$imageEl && r.$imageEl.transition(0), t.zoom.isScaling = !0) : r.$imageEl = void 0
            },
            onGestureChange: function(e) {
                var t = this,
                    a = t.support,
                    i = t.params.zoom,
                    s = t.zoom,
                    r = s.gesture;
                if (!a.gestures) {
                    if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                    s.fakeGestureMoved = !0, r.scaleMove = ee.getDistanceBetweenTouches(e)
                }
                r.$imageEl && 0 !== r.$imageEl.length ? (a.gestures ? s.scale = e.scale * s.currentScale : s.scale = r.scaleMove / r.scaleStart * s.currentScale, s.scale > r.maxRatio && (s.scale = r.maxRatio - 1 + Math.pow(s.scale - r.maxRatio + 1, .5)), s.scale < i.minRatio && (s.scale = i.minRatio + 1 - Math.pow(i.minRatio - s.scale + 1, .5)), r.$imageEl.transform("translate3d(0,0,0) scale(" + s.scale + ")")) : "gesturechange" === e.type && s.onGestureStart(e)
            },
            onGestureEnd: function(e) {
                var t = this,
                    a = t.device,
                    i = t.support,
                    s = t.params.zoom,
                    r = t.zoom,
                    n = r.gesture;
                if (!i.gestures) {
                    if (!r.fakeGestureTouched || !r.fakeGestureMoved) return;
                    if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !a.android) return;
                    r.fakeGestureTouched = !1, r.fakeGestureMoved = !1
                }
                n.$imageEl && 0 !== n.$imageEl.length && (r.scale = Math.max(Math.min(r.scale, n.maxRatio), s.minRatio), n.$imageEl.transition(t.params.speed).transform("translate3d(0,0,0) scale(" + r.scale + ")"), r.currentScale = r.scale, r.isScaling = !1, 1 === r.scale && (n.$slideEl = void 0))
            },
            onTouchStart: function(e) {
                var t = this.device,
                    a = this.zoom,
                    i = a.gesture,
                    s = a.image;
                i.$imageEl && 0 !== i.$imageEl.length && (s.isTouched || (t.android && e.cancelable && e.preventDefault(), s.isTouched = !0, s.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
            },
            onTouchMove: function(e) {
                var t = this,
                    a = t.zoom,
                    i = a.gesture,
                    s = a.image,
                    r = a.velocity;
                if (i.$imageEl && 0 !== i.$imageEl.length && (t.allowClick = !1, s.isTouched && i.$slideEl)) {
                    s.isMoved || (s.width = i.$imageEl[0].offsetWidth, s.height = i.$imageEl[0].offsetHeight, s.startX = T(i.$imageWrapEl[0], "x") || 0, s.startY = T(i.$imageWrapEl[0], "y") || 0, i.slideWidth = i.$slideEl[0].offsetWidth, i.slideHeight = i.$slideEl[0].offsetHeight, i.$imageWrapEl.transition(0), t.rtl && (s.startX = -s.startX, s.startY = -s.startY));
                    var n = s.width * a.scale,
                        l = s.height * a.scale;
                    if (!(n < i.slideWidth && l < i.slideHeight)) {
                        if (s.minX = Math.min(i.slideWidth / 2 - n / 2, 0), s.maxX = -s.minX, s.minY = Math.min(i.slideHeight / 2 - l / 2, 0), s.maxY = -s.minY, s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !s.isMoved && !a.isScaling) {
                            if (t.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x)) return void(s.isTouched = !1);
                            if (!t.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y)) return void(s.isTouched = !1)
                        }
                        e.cancelable && e.preventDefault(), e.stopPropagation(), s.isMoved = !0, s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX, s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY, s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)), s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)), s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)), s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)), r.prevPositionX || (r.prevPositionX = s.touchesCurrent.x), r.prevPositionY || (r.prevPositionY = s.touchesCurrent.y), r.prevTime || (r.prevTime = Date.now()), r.x = (s.touchesCurrent.x - r.prevPositionX) / (Date.now() - r.prevTime) / 2, r.y = (s.touchesCurrent.y - r.prevPositionY) / (Date.now() - r.prevTime) / 2, Math.abs(s.touchesCurrent.x - r.prevPositionX) < 2 && (r.x = 0), Math.abs(s.touchesCurrent.y - r.prevPositionY) < 2 && (r.y = 0), r.prevPositionX = s.touchesCurrent.x, r.prevPositionY = s.touchesCurrent.y, r.prevTime = Date.now(), i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)")
                    }
                }
            },
            onTouchEnd: function() {
                var e = this.zoom,
                    t = e.gesture,
                    a = e.image,
                    i = e.velocity;
                if (t.$imageEl && 0 !== t.$imageEl.length) {
                    if (!a.isTouched || !a.isMoved) return a.isTouched = !1, void(a.isMoved = !1);
                    a.isTouched = !1, a.isMoved = !1;
                    var s = 300,
                        r = 300,
                        n = i.x * s,
                        l = a.currentX + n,
                        o = i.y * r,
                        d = a.currentY + o;
                    0 !== i.x && (s = Math.abs((l - a.currentX) / i.x)), 0 !== i.y && (r = Math.abs((d - a.currentY) / i.y));
                    var p = Math.max(s, r);
                    a.currentX = l, a.currentY = d;
                    var u = a.width * e.scale,
                        c = a.height * e.scale;
                    a.minX = Math.min(t.slideWidth / 2 - u / 2, 0), a.maxX = -a.minX, a.minY = Math.min(t.slideHeight / 2 - c / 2, 0), a.maxY = -a.minY, a.currentX = Math.max(Math.min(a.currentX, a.maxX), a.minX), a.currentY = Math.max(Math.min(a.currentY, a.maxY), a.minY), t.$imageWrapEl.transition(p).transform("translate3d(" + a.currentX + "px, " + a.currentY + "px,0)")
                }
            },
            onTransitionEnd: function() {
                var e = this,
                    t = e.zoom,
                    a = t.gesture;
                a.$slideEl && e.previousIndex !== e.activeIndex && (a.$imageEl && a.$imageEl.transform("translate3d(0,0,0) scale(1)"), a.$imageWrapEl && a.$imageWrapEl.transform("translate3d(0,0,0)"), t.scale = 1, t.currentScale = 1, a.$slideEl = void 0, a.$imageEl = void 0, a.$imageWrapEl = void 0)
            },
            toggle: function(e) {
                var t = this.zoom;
                t.scale && 1 !== t.scale ? t.out() : t.in(e)
            },
            in: function(e) {
                var t, a, i, s, r, n, o, d, p, u, c, h, v, f, m, g, w = this,
                    y = l(),
                    b = w.zoom,
                    E = w.params.zoom,
                    x = b.gesture,
                    T = b.image;
                (x.$slideEl || (w.params.virtual && w.params.virtual.enabled && w.virtual ? x.$slideEl = w.$wrapperEl.children("." + w.params.slideActiveClass) : x.$slideEl = w.slides.eq(w.activeIndex), x.$imageEl = x.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), x.$imageWrapEl = x.$imageEl.parent("." + E.containerClass)), x.$imageEl && 0 !== x.$imageEl.length) && (x.$slideEl.addClass("" + E.zoomedSlideClass), void 0 === T.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, a = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = T.touchesStart.x, a = T.touchesStart.y), b.scale = x.$imageWrapEl.attr("data-swiper-zoom") || E.maxRatio, b.currentScale = x.$imageWrapEl.attr("data-swiper-zoom") || E.maxRatio, e ? (m = x.$slideEl[0].offsetWidth, g = x.$slideEl[0].offsetHeight, i = x.$slideEl.offset().left + y.scrollX + m / 2 - t, s = x.$slideEl.offset().top + y.scrollY + g / 2 - a, o = x.$imageEl[0].offsetWidth, d = x.$imageEl[0].offsetHeight, p = o * b.scale, u = d * b.scale, v = -(c = Math.min(m / 2 - p / 2, 0)), f = -(h = Math.min(g / 2 - u / 2, 0)), (r = i * b.scale) < c && (r = c), r > v && (r = v), (n = s * b.scale) < h && (n = h), n > f && (n = f)) : (r = 0, n = 0), x.$imageWrapEl.transition(300).transform("translate3d(" + r + "px, " + n + "px,0)"), x.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + b.scale + ")"))
            },
            out: function() {
                var e = this,
                    t = e.zoom,
                    a = e.params.zoom,
                    i = t.gesture;
                i.$slideEl || (e.params.virtual && e.params.virtual.enabled && e.virtual ? i.$slideEl = e.$wrapperEl.children("." + e.params.slideActiveClass) : i.$slideEl = e.slides.eq(e.activeIndex), i.$imageEl = i.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), i.$imageWrapEl = i.$imageEl.parent("." + a.containerClass)), i.$imageEl && 0 !== i.$imageEl.length && (t.scale = 1, t.currentScale = 1, i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), i.$slideEl.removeClass("" + a.zoomedSlideClass), i.$slideEl = void 0)
            },
            toggleGestures: function(e) {
                var t = this,
                    a = t.zoom,
                    i = a.slideSelector,
                    s = a.passiveListener;
                t.$wrapperEl[e]("gesturestart", i, a.onGestureStart, s), t.$wrapperEl[e]("gesturechange", i, a.onGestureChange, s), t.$wrapperEl[e]("gestureend", i, a.onGestureEnd, s)
            },
            enableGestures: function() {
                this.zoom.gesturesEnabled || (this.zoom.gesturesEnabled = !0, this.zoom.toggleGestures("on"))
            },
            disableGestures: function() {
                this.zoom.gesturesEnabled && (this.zoom.gesturesEnabled = !1, this.zoom.toggleGestures("off"))
            },
            enable: function() {
                var e = this,
                    t = e.support,
                    a = e.zoom;
                if (!a.enabled) {
                    a.enabled = !0;
                    var i = !("touchstart" !== e.touchEvents.start || !t.passiveListener || !e.params.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        },
                        s = !t.passiveListener || {
                            passive: !1,
                            capture: !0
                        },
                        r = "." + e.params.slideClass;
                    e.zoom.passiveListener = i, e.zoom.slideSelector = r, t.gestures ? (e.$wrapperEl.on(e.touchEvents.start, e.zoom.enableGestures, i), e.$wrapperEl.on(e.touchEvents.end, e.zoom.disableGestures, i)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.on(e.touchEvents.start, r, a.onGestureStart, i), e.$wrapperEl.on(e.touchEvents.move, r, a.onGestureChange, s), e.$wrapperEl.on(e.touchEvents.end, r, a.onGestureEnd, i), e.touchEvents.cancel && e.$wrapperEl.on(e.touchEvents.cancel, r, a.onGestureEnd, i)), e.$wrapperEl.on(e.touchEvents.move, "." + e.params.zoom.containerClass, a.onTouchMove, s)
                }
            },
            disable: function() {
                var e = this,
                    t = e.zoom;
                if (t.enabled) {
                    var a = e.support;
                    e.zoom.enabled = !1;
                    var i = !("touchstart" !== e.touchEvents.start || !a.passiveListener || !e.params.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        },
                        s = !a.passiveListener || {
                            passive: !1,
                            capture: !0
                        },
                        r = "." + e.params.slideClass;
                    a.gestures ? (e.$wrapperEl.off(e.touchEvents.start, e.zoom.enableGestures, i), e.$wrapperEl.off(e.touchEvents.end, e.zoom.disableGestures, i)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.off(e.touchEvents.start, r, t.onGestureStart, i), e.$wrapperEl.off(e.touchEvents.move, r, t.onGestureChange, s), e.$wrapperEl.off(e.touchEvents.end, r, t.onGestureEnd, i), e.touchEvents.cancel && e.$wrapperEl.off(e.touchEvents.cancel, r, t.onGestureEnd, i)), e.$wrapperEl.off(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove, s)
                }
            }
        },
        te = {
            loadInSlide: function(e, t) {
                void 0 === t && (t = !0);
                var a = this,
                    i = a.params.lazy;
                if (void 0 !== e && 0 !== a.slides.length) {
                    var s = a.virtual && a.params.virtual.enabled ? a.$wrapperEl.children("." + a.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : a.slides.eq(e),
                        r = s.find("." + i.elementClass + ":not(." + i.loadedClass + "):not(." + i.loadingClass + ")");
                    !s.hasClass(i.elementClass) || s.hasClass(i.loadedClass) || s.hasClass(i.loadingClass) || r.push(s[0]), 0 !== r.length && r.each((function(e) {
                        var r = m(e);
                        r.addClass(i.loadingClass);
                        var n = r.attr("data-background"),
                            l = r.attr("data-src"),
                            o = r.attr("data-srcset"),
                            d = r.attr("data-sizes"),
                            p = r.parent("picture");
                        a.loadImage(r[0], l || n, o, d, !1, (function() {
                            if (null != a && a && (!a || a.params) && !a.destroyed) {
                                if (n ? (r.css("background-image", 'url("' + n + '")'), r.removeAttr("data-background")) : (o && (r.attr("srcset", o), r.removeAttr("data-srcset")), d && (r.attr("sizes", d), r.removeAttr("data-sizes")), p.length && p.children("source").each((function(e) {
                                        var t = m(e);
                                        t.attr("data-srcset") && (t.attr("srcset", t.attr("data-srcset")), t.removeAttr("data-srcset"))
                                    })), l && (r.attr("src", l), r.removeAttr("data-src"))), r.addClass(i.loadedClass).removeClass(i.loadingClass), s.find("." + i.preloaderClass).remove(), a.params.loop && t) {
                                    var e = s.attr("data-swiper-slide-index");
                                    if (s.hasClass(a.params.slideDuplicateClass)) {
                                        var u = a.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + a.params.slideDuplicateClass + ")");
                                        a.lazy.loadInSlide(u.index(), !1)
                                    } else {
                                        var c = a.$wrapperEl.children("." + a.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                        a.lazy.loadInSlide(c.index(), !1)
                                    }
                                }
                                a.emit("lazyImageReady", s[0], r[0]), a.params.autoHeight && a.updateAutoHeight()
                            }
                        })), a.emit("lazyImageLoad", s[0], r[0])
                    }))
                }
            },
            load: function() {
                var e = this,
                    t = e.$wrapperEl,
                    a = e.params,
                    i = e.slides,
                    s = e.activeIndex,
                    r = e.virtual && a.virtual.enabled,
                    n = a.lazy,
                    l = a.slidesPerView;

                function o(e) {
                    if (r) {
                        if (t.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0
                    } else if (i[e]) return !0;
                    return !1
                }

                function d(e) {
                    return r ? m(e).attr("data-swiper-slide-index") : m(e).index()
                }
                if ("auto" === l && (l = 0), e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0), e.params.watchSlidesVisibility) t.children("." + a.slideVisibleClass).each((function(t) {
                    var a = r ? m(t).attr("data-swiper-slide-index") : m(t).index();
                    e.lazy.loadInSlide(a)
                }));
                else if (l > 1)
                    for (var p = s; p < s + l; p += 1) o(p) && e.lazy.loadInSlide(p);
                else e.lazy.loadInSlide(s);
                if (n.loadPrevNext)
                    if (l > 1 || n.loadPrevNextAmount && n.loadPrevNextAmount > 1) {
                        for (var u = n.loadPrevNextAmount, c = l, h = Math.min(s + c + Math.max(u, c), i.length), v = Math.max(s - Math.max(c, u), 0), f = s + l; f < h; f += 1) o(f) && e.lazy.loadInSlide(f);
                        for (var g = v; g < s; g += 1) o(g) && e.lazy.loadInSlide(g)
                    } else {
                        var w = t.children("." + a.slideNextClass);
                        w.length > 0 && e.lazy.loadInSlide(d(w));
                        var y = t.children("." + a.slidePrevClass);
                        y.length > 0 && e.lazy.loadInSlide(d(y))
                    }
            },
            checkInViewOnLoad: function() {
                var e = l(),
                    t = this;
                if (t && !t.destroyed) {
                    var a = t.params.lazy.scrollingElement ? m(t.params.lazy.scrollingElement) : m(e),
                        i = a[0] === e,
                        s = i ? e.innerWidth : a[0].offsetWidth,
                        r = i ? e.innerHeight : a[0].offsetHeight,
                        n = t.$el.offset(),
                        o = !1;
                    t.rtlTranslate && (n.left -= t.$el[0].scrollLeft);
                    for (var d = [
                            [n.left, n.top],
                            [n.left + t.width, n.top],
                            [n.left, n.top + t.height],
                            [n.left + t.width, n.top + t.height]
                        ], p = 0; p < d.length; p += 1) {
                        var u = d[p];
                        if (u[0] >= 0 && u[0] <= s && u[1] >= 0 && u[1] <= r) {
                            if (0 === u[0] && 0 === u[1]) continue;
                            o = !0
                        }
                    }
                    o ? (t.lazy.load(), a.off("scroll", t.lazy.checkInViewOnLoad)) : t.lazy.scrollHandlerAttached || (t.lazy.scrollHandlerAttached = !0, a.on("scroll", t.lazy.checkInViewOnLoad))
                }
            }
        },
        ae = {
            LinearSpline: function(e, t) {
                var a, i, s, r, n, l = function(e, t) {
                    for (i = -1, a = e.length; a - i > 1;) e[s = a + i >> 1] <= t ? i = s : a = s;
                    return a
                };
                return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function(e) {
                    return e ? (n = l(this.x, e), r = n - 1, (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0
                }, this
            },
            getInterpolateFunction: function(e) {
                var t = this;
                t.controller.spline || (t.controller.spline = t.params.loop ? new ae.LinearSpline(t.slidesGrid, e.slidesGrid) : new ae.LinearSpline(t.snapGrid, e.snapGrid))
            },
            setTranslate: function(e, t) {
                var a, i, s = this,
                    r = s.controller.control,
                    n = s.constructor;

                function l(e) {
                    var t = s.rtlTranslate ? -s.translate : s.translate;
                    "slide" === s.params.controller.by && (s.controller.getInterpolateFunction(e), i = -s.controller.spline.interpolate(-t)), i && "container" !== s.params.controller.by || (a = (e.maxTranslate() - e.minTranslate()) / (s.maxTranslate() - s.minTranslate()), i = (t - s.minTranslate()) * a + e.minTranslate()), s.params.controller.inverse && (i = e.maxTranslate() - i), e.updateProgress(i), e.setTranslate(i, s), e.updateActiveIndex(), e.updateSlidesClasses()
                }
                if (Array.isArray(r))
                    for (var o = 0; o < r.length; o += 1) r[o] !== t && r[o] instanceof n && l(r[o]);
                else r instanceof n && t !== r && l(r)
            },
            setTransition: function(e, t) {
                var a, i = this,
                    s = i.constructor,
                    r = i.controller.control;

                function n(t) {
                    t.setTransition(e, i), 0 !== e && (t.transitionStart(), t.params.autoHeight && E((function() {
                        t.updateAutoHeight()
                    })), t.$wrapperEl.transitionEnd((function() {
                        r && (t.params.loop && "slide" === i.params.controller.by && t.loopFix(), t.transitionEnd())
                    })))
                }
                if (Array.isArray(r))
                    for (a = 0; a < r.length; a += 1) r[a] !== t && r[a] instanceof s && n(r[a]);
                else r instanceof s && t !== r && n(r)
            }
        },
        ie = {
            getRandomNumber: function(e) {
                void 0 === e && (e = 16);
                return "x".repeat(e).replace(/x/g, (function() {
                    return Math.round(16 * Math.random()).toString(16)
                }))
            },
            makeElFocusable: function(e) {
                return e.attr("tabIndex", "0"), e
            },
            makeElNotFocusable: function(e) {
                return e.attr("tabIndex", "-1"), e
            },
            addElRole: function(e, t) {
                return e.attr("role", t), e
            },
            addElRoleDescription: function(e, t) {
                return e.attr("aria-role-description", t), e
            },
            addElControls: function(e, t) {
                return e.attr("aria-controls", t), e
            },
            addElLabel: function(e, t) {
                return e.attr("aria-label", t), e
            },
            addElId: function(e, t) {
                return e.attr("id", t), e
            },
            addElLive: function(e, t) {
                return e.attr("aria-live", t), e
            },
            disableEl: function(e) {
                return e.attr("aria-disabled", !0), e
            },
            enableEl: function(e) {
                return e.attr("aria-disabled", !1), e
            },
            onEnterKey: function(e) {
                var t = this,
                    a = t.params.a11y;
                if (13 === e.keyCode) {
                    var i = m(e.target);
                    t.navigation && t.navigation.$nextEl && i.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(), t.isEnd ? t.a11y.notify(a.lastSlideMessage) : t.a11y.notify(a.nextSlideMessage)), t.navigation && t.navigation.$prevEl && i.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(), t.isBeginning ? t.a11y.notify(a.firstSlideMessage) : t.a11y.notify(a.prevSlideMessage)), t.pagination && i.is("." + t.params.pagination.bulletClass.replace(/ /g, ".")) && i[0].click()
                }
            },
            notify: function(e) {
                var t = this.a11y.liveRegion;
                0 !== t.length && (t.html(""), t.html(e))
            },
            updateNavigation: function() {
                var e = this;
                if (!e.params.loop && e.navigation) {
                    var t = e.navigation,
                        a = t.$nextEl,
                        i = t.$prevEl;
                    i && i.length > 0 && (e.isBeginning ? (e.a11y.disableEl(i), e.a11y.makeElNotFocusable(i)) : (e.a11y.enableEl(i), e.a11y.makeElFocusable(i))), a && a.length > 0 && (e.isEnd ? (e.a11y.disableEl(a), e.a11y.makeElNotFocusable(a)) : (e.a11y.enableEl(a), e.a11y.makeElFocusable(a)))
                }
            },
            updatePagination: function() {
                var e = this,
                    t = e.params.a11y;
                e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.bullets.each((function(a) {
                    var i = m(a);
                    e.a11y.makeElFocusable(i), e.params.pagination.renderBullet || (e.a11y.addElRole(i, "button"), e.a11y.addElLabel(i, t.paginationBulletMessage.replace(/\{\{index\}\}/, i.index() + 1)))
                }))
            },
            init: function() {
                var e = this,
                    t = e.params.a11y;
                e.$el.append(e.a11y.liveRegion);
                var a = e.$el;
                t.containerRoleDescriptionMessage && e.a11y.addElRoleDescription(a, t.containerRoleDescriptionMessage), t.containerMessage && e.a11y.addElLabel(a, t.containerMessage);
                var i, s, r, n = e.$wrapperEl,
                    l = n.attr("id") || "swiper-wrapper-" + e.a11y.getRandomNumber(16);
                e.a11y.addElId(n, l), i = e.params.autoplay && e.params.autoplay.enabled ? "off" : "polite", e.a11y.addElLive(n, i), t.itemRoleDescriptionMessage && e.a11y.addElRoleDescription(m(e.slides), t.itemRoleDescriptionMessage), e.a11y.addElRole(m(e.slides), "group"), e.slides.each((function(t) {
                    var a = m(t);
                    e.a11y.addElLabel(a, a.index() + 1 + " / " + e.slides.length)
                })), e.navigation && e.navigation.$nextEl && (s = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (r = e.navigation.$prevEl), s && s.length && (e.a11y.makeElFocusable(s), "BUTTON" !== s[0].tagName && (e.a11y.addElRole(s, "button"), s.on("keydown", e.a11y.onEnterKey)), e.a11y.addElLabel(s, t.nextSlideMessage), e.a11y.addElControls(s, l)), r && r.length && (e.a11y.makeElFocusable(r), "BUTTON" !== r[0].tagName && (e.a11y.addElRole(r, "button"), r.on("keydown", e.a11y.onEnterKey)), e.a11y.addElLabel(r, t.prevSlideMessage), e.a11y.addElControls(r, l)), e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.$el.on("keydown", "." + e.params.pagination.bulletClass.replace(/ /g, "."), e.a11y.onEnterKey)
            },
            destroy: function() {
                var e, t, a = this;
                a.a11y.liveRegion && a.a11y.liveRegion.length > 0 && a.a11y.liveRegion.remove(), a.navigation && a.navigation.$nextEl && (e = a.navigation.$nextEl), a.navigation && a.navigation.$prevEl && (t = a.navigation.$prevEl), e && e.off("keydown", a.a11y.onEnterKey), t && t.off("keydown", a.a11y.onEnterKey), a.pagination && a.params.pagination.clickable && a.pagination.bullets && a.pagination.bullets.length && a.pagination.$el.off("keydown", "." + a.params.pagination.bulletClass.replace(/ /g, "."), a.a11y.onEnterKey)
            }
        },
        se = {
            init: function() {
                var e = this,
                    t = l();
                if (e.params.history) {
                    if (!t.history || !t.history.pushState) return e.params.history.enabled = !1, void(e.params.hashNavigation.enabled = !0);
                    var a = e.history;
                    a.initialized = !0, a.paths = se.getPathValues(e.params.url), (a.paths.key || a.paths.value) && (a.scrollToSlide(0, a.paths.value, e.params.runCallbacksOnInit), e.params.history.replaceState || t.addEventListener("popstate", e.history.setHistoryPopState))
                }
            },
            destroy: function() {
                var e = l();
                this.params.history.replaceState || e.removeEventListener("popstate", this.history.setHistoryPopState)
            },
            setHistoryPopState: function() {
                var e = this;
                e.history.paths = se.getPathValues(e.params.url), e.history.scrollToSlide(e.params.speed, e.history.paths.value, !1)
            },
            getPathValues: function(e) {
                var t = l(),
                    a = (e ? new URL(e) : t.location).pathname.slice(1).split("/").filter((function(e) {
                        return "" !== e
                    })),
                    i = a.length;
                return {
                    key: a[i - 2],
                    value: a[i - 1]
                }
            },
            setHistory: function(e, t) {
                var a = this,
                    i = l();
                if (a.history.initialized && a.params.history.enabled) {
                    var s;
                    s = a.params.url ? new URL(a.params.url) : i.location;
                    var r = a.slides.eq(t),
                        n = se.slugify(r.attr("data-history"));
                    s.pathname.includes(e) || (n = e + "/" + n);
                    var o = i.history.state;
                    o && o.value === n || (a.params.history.replaceState ? i.history.replaceState({
                        value: n
                    }, null, n) : i.history.pushState({
                        value: n
                    }, null, n))
                }
            },
            slugify: function(e) {
                return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
            },
            scrollToSlide: function(e, t, a) {
                var i = this;
                if (t)
                    for (var s = 0, r = i.slides.length; s < r; s += 1) {
                        var n = i.slides.eq(s);
                        if (se.slugify(n.attr("data-history")) === t && !n.hasClass(i.params.slideDuplicateClass)) {
                            var l = n.index();
                            i.slideTo(l, e, a)
                        }
                    } else i.slideTo(0, e, a)
            }
        },
        re = {
            onHashCange: function() {
                var e = this,
                    t = r();
                e.emit("hashChange");
                var a = t.location.hash.replace("#", "");
                if (a !== e.slides.eq(e.activeIndex).attr("data-hash")) {
                    var i = e.$wrapperEl.children("." + e.params.slideClass + '[data-hash="' + a + '"]').index();
                    if (void 0 === i) return;
                    e.slideTo(i)
                }
            },
            setHash: function() {
                var e = this,
                    t = l(),
                    a = r();
                if (e.hashNavigation.initialized && e.params.hashNavigation.enabled)
                    if (e.params.hashNavigation.replaceState && t.history && t.history.replaceState) t.history.replaceState(null, null, "#" + e.slides.eq(e.activeIndex).attr("data-hash") || ""), e.emit("hashSet");
                    else {
                        var i = e.slides.eq(e.activeIndex),
                            s = i.attr("data-hash") || i.attr("data-history");
                        a.location.hash = s || "", e.emit("hashSet")
                    }
            },
            init: function() {
                var e = this,
                    t = r(),
                    a = l();
                if (!(!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled)) {
                    e.hashNavigation.initialized = !0;
                    var i = t.location.hash.replace("#", "");
                    if (i)
                        for (var s = 0, n = e.slides.length; s < n; s += 1) {
                            var o = e.slides.eq(s);
                            if ((o.attr("data-hash") || o.attr("data-history")) === i && !o.hasClass(e.params.slideDuplicateClass)) {
                                var d = o.index();
                                e.slideTo(d, 0, e.params.runCallbacksOnInit, !0)
                            }
                        }
                    e.params.hashNavigation.watchState && m(a).on("hashchange", e.hashNavigation.onHashCange)
                }
            },
            destroy: function() {
                var e = l();
                this.params.hashNavigation.watchState && m(e).off("hashchange", this.hashNavigation.onHashCange)
            }
        },
        ne = {
            run: function() {
                var e = this,
                    t = e.slides.eq(e.activeIndex),
                    a = e.params.autoplay.delay;
                t.attr("data-swiper-autoplay") && (a = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), clearTimeout(e.autoplay.timeout), e.autoplay.timeout = E((function() {
                    var t;
                    e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), t = e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (t = e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (t = e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), t = e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (t = e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (t = e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")), (e.params.cssMode && e.autoplay.running || !1 === t) && e.autoplay.run()
                }), a)
            },
            start: function() {
                var e = this;
                return void 0 === e.autoplay.timeout && (!e.autoplay.running && (e.autoplay.running = !0, e.emit("autoplayStart"), e.autoplay.run(), !0))
            },
            stop: function() {
                var e = this;
                return !!e.autoplay.running && (void 0 !== e.autoplay.timeout && (e.autoplay.timeout && (clearTimeout(e.autoplay.timeout), e.autoplay.timeout = void 0), e.autoplay.running = !1, e.emit("autoplayStop"), !0))
            },
            pause: function(e) {
                var t = this;
                t.autoplay.running && (t.autoplay.paused || (t.autoplay.timeout && clearTimeout(t.autoplay.timeout), t.autoplay.paused = !0, 0 !== e && t.params.autoplay.waitForTransition ? (t.$wrapperEl[0].addEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].addEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd)) : (t.autoplay.paused = !1, t.autoplay.run())))
            },
            onVisibilityChange: function() {
                var e = this,
                    t = r();
                "hidden" === t.visibilityState && e.autoplay.running && e.autoplay.pause(), "visible" === t.visibilityState && e.autoplay.paused && (e.autoplay.run(), e.autoplay.paused = !1)
            },
            onTransitionEnd: function(e) {
                var t = this;
                t && !t.destroyed && t.$wrapperEl && e.target === t.$wrapperEl[0] && (t.$wrapperEl[0].removeEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].removeEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd), t.autoplay.paused = !1, t.autoplay.running ? t.autoplay.run() : t.autoplay.stop())
            }
        },
        le = {
            setTranslate: function() {
                for (var e = this, t = e.slides, a = 0; a < t.length; a += 1) {
                    var i = e.slides.eq(a),
                        s = -i[0].swiperSlideOffset;
                    e.params.virtualTranslate || (s -= e.translate);
                    var r = 0;
                    e.isHorizontal() || (r = s, s = 0);
                    var n = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
                    i.css({
                        opacity: n
                    }).transform("translate3d(" + s + "px, " + r + "px, 0px)")
                }
            },
            setTransition: function(e) {
                var t = this,
                    a = t.slides,
                    i = t.$wrapperEl;
                if (a.transition(e), t.params.virtualTranslate && 0 !== e) {
                    var s = !1;
                    a.transitionEnd((function() {
                        if (!s && t && !t.destroyed) {
                            s = !0, t.animating = !1;
                            for (var e = ["webkitTransitionEnd", "transitionend"], a = 0; a < e.length; a += 1) i.trigger(e[a])
                        }
                    }))
                }
            }
        },
        oe = {
            setTranslate: function() {
                var e, t = this,
                    a = t.$el,
                    i = t.$wrapperEl,
                    s = t.slides,
                    r = t.width,
                    n = t.height,
                    l = t.rtlTranslate,
                    o = t.size,
                    d = t.browser,
                    p = t.params.cubeEffect,
                    u = t.isHorizontal(),
                    c = t.virtual && t.params.virtual.enabled,
                    h = 0;
                p.shadow && (u ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = m('<div class="swiper-cube-shadow"></div>'), i.append(e)), e.css({
                    height: r + "px"
                })) : 0 === (e = a.find(".swiper-cube-shadow")).length && (e = m('<div class="swiper-cube-shadow"></div>'), a.append(e)));
                for (var v = 0; v < s.length; v += 1) {
                    var f = s.eq(v),
                        g = v;
                    c && (g = parseInt(f.attr("data-swiper-slide-index"), 10));
                    var w = 90 * g,
                        y = Math.floor(w / 360);
                    l && (w = -w, y = Math.floor(-w / 360));
                    var b = Math.max(Math.min(f[0].progress, 1), -1),
                        E = 0,
                        x = 0,
                        T = 0;
                    g % 4 == 0 ? (E = 4 * -y * o, T = 0) : (g - 1) % 4 == 0 ? (E = 0, T = 4 * -y * o) : (g - 2) % 4 == 0 ? (E = o + 4 * y * o, T = o) : (g - 3) % 4 == 0 && (E = -o, T = 3 * o + 4 * o * y), l && (E = -E), u || (x = E, E = 0);
                    var C = "rotateX(" + (u ? 0 : -w) + "deg) rotateY(" + (u ? w : 0) + "deg) translate3d(" + E + "px, " + x + "px, " + T + "px)";
                    if (b <= 1 && b > -1 && (h = 90 * g + 90 * b, l && (h = 90 * -g - 90 * b)), f.transform(C), p.slideShadows) {
                        var S = u ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top"),
                            M = u ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom");
                        0 === S.length && (S = m('<div class="swiper-slide-shadow-' + (u ? "left" : "top") + '"></div>'), f.append(S)), 0 === M.length && (M = m('<div class="swiper-slide-shadow-' + (u ? "right" : "bottom") + '"></div>'), f.append(M)), S.length && (S[0].style.opacity = Math.max(-b, 0)), M.length && (M[0].style.opacity = Math.max(b, 0))
                    }
                }
                if (i.css({
                        "-webkit-transform-origin": "50% 50% -" + o / 2 + "px",
                        "-moz-transform-origin": "50% 50% -" + o / 2 + "px",
                        "-ms-transform-origin": "50% 50% -" + o / 2 + "px",
                        "transform-origin": "50% 50% -" + o / 2 + "px"
                    }), p.shadow)
                    if (u) e.transform("translate3d(0px, " + (r / 2 + p.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + p.shadowScale + ")");
                    else {
                        var z = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90),
                            P = 1.5 - (Math.sin(2 * z * Math.PI / 360) / 2 + Math.cos(2 * z * Math.PI / 360) / 2),
                            k = p.shadowScale,
                            L = p.shadowScale / P,
                            $ = p.shadowOffset;
                        e.transform("scale3d(" + k + ", 1, " + L + ") translate3d(0px, " + (n / 2 + $) + "px, " + -n / 2 / L + "px) rotateX(-90deg)")
                    }
                var I = d.isSafari || d.isWebView ? -o / 2 : 0;
                i.transform("translate3d(0px,0," + I + "px) rotateX(" + (t.isHorizontal() ? 0 : h) + "deg) rotateY(" + (t.isHorizontal() ? -h : 0) + "deg)")
            },
            setTransition: function(e) {
                var t = this,
                    a = t.$el;
                t.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.cubeEffect.shadow && !t.isHorizontal() && a.find(".swiper-cube-shadow").transition(e)
            }
        },
        de = {
            setTranslate: function() {
                for (var e = this, t = e.slides, a = e.rtlTranslate, i = 0; i < t.length; i += 1) {
                    var s = t.eq(i),
                        r = s[0].progress;
                    e.params.flipEffect.limitRotation && (r = Math.max(Math.min(s[0].progress, 1), -1));
                    var n = -180 * r,
                        l = 0,
                        o = -s[0].swiperSlideOffset,
                        d = 0;
                    if (e.isHorizontal() ? a && (n = -n) : (d = o, o = 0, l = -n, n = 0), s[0].style.zIndex = -Math.abs(Math.round(r)) + t.length, e.params.flipEffect.slideShadows) {
                        var p = e.isHorizontal() ? s.find(".swiper-slide-shadow-left") : s.find(".swiper-slide-shadow-top"),
                            u = e.isHorizontal() ? s.find(".swiper-slide-shadow-right") : s.find(".swiper-slide-shadow-bottom");
                        0 === p.length && (p = m('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "left" : "top") + '"></div>'), s.append(p)), 0 === u.length && (u = m('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "right" : "bottom") + '"></div>'), s.append(u)), p.length && (p[0].style.opacity = Math.max(-r, 0)), u.length && (u[0].style.opacity = Math.max(r, 0))
                    }
                    s.transform("translate3d(" + o + "px, " + d + "px, 0px) rotateX(" + l + "deg) rotateY(" + n + "deg)")
                }
            },
            setTransition: function(e) {
                var t = this,
                    a = t.slides,
                    i = t.activeIndex,
                    s = t.$wrapperEl;
                if (a.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.virtualTranslate && 0 !== e) {
                    var r = !1;
                    a.eq(i).transitionEnd((function() {
                        if (!r && t && !t.destroyed) {
                            r = !0, t.animating = !1;
                            for (var e = ["webkitTransitionEnd", "transitionend"], a = 0; a < e.length; a += 1) s.trigger(e[a])
                        }
                    }))
                }
            }
        },
        pe = {
            setTranslate: function() {
                for (var e = this, t = e.width, a = e.height, i = e.slides, s = e.slidesSizesGrid, r = e.params.coverflowEffect, n = e.isHorizontal(), l = e.translate, o = n ? t / 2 - l : a / 2 - l, d = n ? r.rotate : -r.rotate, p = r.depth, u = 0, c = i.length; u < c; u += 1) {
                    var h = i.eq(u),
                        v = s[u],
                        f = (o - h[0].swiperSlideOffset - v / 2) / v * r.modifier,
                        g = n ? d * f : 0,
                        w = n ? 0 : d * f,
                        y = -p * Math.abs(f),
                        b = r.stretch;
                    "string" == typeof b && -1 !== b.indexOf("%") && (b = parseFloat(r.stretch) / 100 * v);
                    var E = n ? 0 : b * f,
                        x = n ? b * f : 0,
                        T = 1 - (1 - r.scale) * Math.abs(f);
                    Math.abs(x) < .001 && (x = 0), Math.abs(E) < .001 && (E = 0), Math.abs(y) < .001 && (y = 0), Math.abs(g) < .001 && (g = 0), Math.abs(w) < .001 && (w = 0), Math.abs(T) < .001 && (T = 0);
                    var C = "translate3d(" + x + "px," + E + "px," + y + "px)  rotateX(" + w + "deg) rotateY(" + g + "deg) scale(" + T + ")";
                    if (h.transform(C), h[0].style.zIndex = 1 - Math.abs(Math.round(f)), r.slideShadows) {
                        var S = n ? h.find(".swiper-slide-shadow-left") : h.find(".swiper-slide-shadow-top"),
                            M = n ? h.find(".swiper-slide-shadow-right") : h.find(".swiper-slide-shadow-bottom");
                        0 === S.length && (S = m('<div class="swiper-slide-shadow-' + (n ? "left" : "top") + '"></div>'), h.append(S)), 0 === M.length && (M = m('<div class="swiper-slide-shadow-' + (n ? "right" : "bottom") + '"></div>'), h.append(M)), S.length && (S[0].style.opacity = f > 0 ? f : 0), M.length && (M[0].style.opacity = -f > 0 ? -f : 0)
                    }
                }
            },
            setTransition: function(e) {
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
            }
        },
        ue = {
            init: function() {
                var e = this,
                    t = e.params.thumbs;
                if (e.thumbs.initialized) return !1;
                e.thumbs.initialized = !0;
                var a = e.constructor;
                return t.swiper instanceof a ? (e.thumbs.swiper = t.swiper, S(e.thumbs.swiper.originalParams, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                }), S(e.thumbs.swiper.params, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                })) : C(t.swiper) && (e.thumbs.swiper = new a(S({}, t.swiper, {
                    watchSlidesVisibility: !0,
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                })), e.thumbs.swiperCreated = !0), e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass), e.thumbs.swiper.on("tap", e.thumbs.onThumbClick), !0
            },
            onThumbClick: function() {
                var e = this,
                    t = e.thumbs.swiper;
                if (t) {
                    var a = t.clickedIndex,
                        i = t.clickedSlide;
                    if (!(i && m(i).hasClass(e.params.thumbs.slideThumbActiveClass) || null == a)) {
                        var s;
                        if (s = t.params.loop ? parseInt(m(t.clickedSlide).attr("data-swiper-slide-index"), 10) : a, e.params.loop) {
                            var r = e.activeIndex;
                            e.slides.eq(r).hasClass(e.params.slideDuplicateClass) && (e.loopFix(), e._clientLeft = e.$wrapperEl[0].clientLeft, r = e.activeIndex);
                            var n = e.slides.eq(r).prevAll('[data-swiper-slide-index="' + s + '"]').eq(0).index(),
                                l = e.slides.eq(r).nextAll('[data-swiper-slide-index="' + s + '"]').eq(0).index();
                            s = void 0 === n ? l : void 0 === l ? n : l - r < r - n ? l : n
                        }
                        e.slideTo(s)
                    }
                }
            },
            update: function(e) {
                var t = this,
                    a = t.thumbs.swiper;
                if (a) {
                    var i = "auto" === a.params.slidesPerView ? a.slidesPerViewDynamic() : a.params.slidesPerView,
                        s = t.params.thumbs.autoScrollOffset,
                        r = s && !a.params.loop;
                    if (t.realIndex !== a.realIndex || r) {
                        var n, l, o = a.activeIndex;
                        if (a.params.loop) {
                            a.slides.eq(o).hasClass(a.params.slideDuplicateClass) && (a.loopFix(), a._clientLeft = a.$wrapperEl[0].clientLeft, o = a.activeIndex);
                            var d = a.slides.eq(o).prevAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index(),
                                p = a.slides.eq(o).nextAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index();
                            n = void 0 === d ? p : void 0 === p ? d : p - o == o - d ? o : p - o < o - d ? p : d, l = t.activeIndex > t.previousIndex ? "next" : "prev"
                        } else l = (n = t.realIndex) > t.previousIndex ? "next" : "prev";
                        r && (n += "next" === l ? s : -1 * s), a.visibleSlidesIndexes && a.visibleSlidesIndexes.indexOf(n) < 0 && (a.params.centeredSlides ? n = n > o ? n - Math.floor(i / 2) + 1 : n + Math.floor(i / 2) - 1 : n > o && (n = n - i + 1), a.slideTo(n, e ? 0 : void 0))
                    }
                    var u = 1,
                        c = t.params.thumbs.slideThumbActiveClass;
                    if (t.params.slidesPerView > 1 && !t.params.centeredSlides && (u = t.params.slidesPerView), t.params.thumbs.multipleActiveThumbs || (u = 1), u = Math.floor(u), a.slides.removeClass(c), a.params.loop || a.params.virtual && a.params.virtual.enabled)
                        for (var h = 0; h < u; h += 1) a.$wrapperEl.children('[data-swiper-slide-index="' + (t.realIndex + h) + '"]').addClass(c);
                    else
                        for (var v = 0; v < u; v += 1) a.slides.eq(t.realIndex + v).addClass(c)
                }
            }
        },
        ce = [q, _, {
            name: "mousewheel",
            params: {
                mousewheel: {
                    enabled: !1,
                    releaseOnEdges: !1,
                    invert: !1,
                    forceToAxis: !1,
                    sensitivity: 1,
                    eventsTarget: "container",
                    thresholdDelta: null,
                    thresholdTime: null
                }
            },
            create: function() {
                M(this, {
                    mousewheel: {
                        enabled: !1,
                        lastScrollTime: x(),
                        lastEventBeforeSnap: void 0,
                        recentWheelEvents: [],
                        enable: U.enable,
                        disable: U.disable,
                        handle: U.handle,
                        handleMouseEnter: U.handleMouseEnter,
                        handleMouseLeave: U.handleMouseLeave,
                        animateSlider: U.animateSlider,
                        releaseScroll: U.releaseScroll
                    }
                })
            },
            on: {
                init: function(e) {
                    !e.params.mousewheel.enabled && e.params.cssMode && e.mousewheel.disable(), e.params.mousewheel.enabled && e.mousewheel.enable()
                },
                destroy: function(e) {
                    e.params.cssMode && e.mousewheel.enable(), e.mousewheel.enabled && e.mousewheel.disable()
                }
            }
        }, {
            name: "navigation",
            params: {
                navigation: {
                    nextEl: null,
                    prevEl: null,
                    hideOnClick: !1,
                    disabledClass: "swiper-button-disabled",
                    hiddenClass: "swiper-button-hidden",
                    lockClass: "swiper-button-lock"
                }
            },
            create: function() {
                M(this, {
                    navigation: t({}, K)
                })
            },
            on: {
                init: function(e) {
                    e.navigation.init(), e.navigation.update()
                },
                toEdge: function(e) {
                    e.navigation.update()
                },
                fromEdge: function(e) {
                    e.navigation.update()
                },
                destroy: function(e) {
                    e.navigation.destroy()
                },
                click: function(e, t) {
                    var a, i = e.navigation,
                        s = i.$nextEl,
                        r = i.$prevEl;
                    !e.params.navigation.hideOnClick || m(t.target).is(r) || m(t.target).is(s) || (s ? a = s.hasClass(e.params.navigation.hiddenClass) : r && (a = r.hasClass(e.params.navigation.hiddenClass)), !0 === a ? e.emit("navigationShow") : e.emit("navigationHide"), s && s.toggleClass(e.params.navigation.hiddenClass), r && r.toggleClass(e.params.navigation.hiddenClass))
                }
            }
        }, {
            name: "pagination",
            params: {
                pagination: {
                    el: null,
                    bulletElement: "span",
                    clickable: !1,
                    hideOnClick: !1,
                    renderBullet: null,
                    renderProgressbar: null,
                    renderFraction: null,
                    renderCustom: null,
                    progressbarOpposite: !1,
                    type: "bullets",
                    dynamicBullets: !1,
                    dynamicMainBullets: 1,
                    formatFractionCurrent: function(e) {
                        return e
                    },
                    formatFractionTotal: function(e) {
                        return e
                    },
                    bulletClass: "swiper-pagination-bullet",
                    bulletActiveClass: "swiper-pagination-bullet-active",
                    modifierClass: "swiper-pagination-",
                    currentClass: "swiper-pagination-current",
                    totalClass: "swiper-pagination-total",
                    hiddenClass: "swiper-pagination-hidden",
                    progressbarFillClass: "swiper-pagination-progressbar-fill",
                    progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
                    clickableClass: "swiper-pagination-clickable",
                    lockClass: "swiper-pagination-lock"
                }
            },
            create: function() {
                M(this, {
                    pagination: t({
                        dynamicBulletIndex: 0
                    }, Z)
                })
            },
            on: {
                init: function(e) {
                    e.pagination.init(), e.pagination.render(), e.pagination.update()
                },
                activeIndexChange: function(e) {
                    (e.params.loop || void 0 === e.snapIndex) && e.pagination.update()
                },
                snapIndexChange: function(e) {
                    e.params.loop || e.pagination.update()
                },
                slidesLengthChange: function(e) {
                    e.params.loop && (e.pagination.render(), e.pagination.update())
                },
                snapGridLengthChange: function(e) {
                    e.params.loop || (e.pagination.render(), e.pagination.update())
                },
                destroy: function(e) {
                    e.pagination.destroy()
                },
                click: function(e, t) {
                    e.params.pagination.el && e.params.pagination.hideOnClick && e.pagination.$el.length > 0 && !m(t.target).hasClass(e.params.pagination.bulletClass) && (!0 === e.pagination.$el.hasClass(e.params.pagination.hiddenClass) ? e.emit("paginationShow") : e.emit("paginationHide"), e.pagination.$el.toggleClass(e.params.pagination.hiddenClass))
                }
            }
        }, {
            name: "scrollbar",
            params: {
                scrollbar: {
                    el: null,
                    dragSize: "auto",
                    hide: !1,
                    draggable: !1,
                    snapOnRelease: !0,
                    lockClass: "swiper-scrollbar-lock",
                    dragClass: "swiper-scrollbar-drag"
                }
            },
            create: function() {
                M(this, {
                    scrollbar: t({
                        isTouched: !1,
                        timeout: null,
                        dragTimeout: null
                    }, J)
                })
            },
            on: {
                init: function(e) {
                    e.scrollbar.init(), e.scrollbar.updateSize(), e.scrollbar.setTranslate()
                },
                update: function(e) {
                    e.scrollbar.updateSize()
                },
                resize: function(e) {
                    e.scrollbar.updateSize()
                },
                observerUpdate: function(e) {
                    e.scrollbar.updateSize()
                },
                setTranslate: function(e) {
                    e.scrollbar.setTranslate()
                },
                setTransition: function(e, t) {
                    e.scrollbar.setTransition(t)
                },
                destroy: function(e) {
                    e.scrollbar.destroy()
                }
            }
        }, {
            name: "parallax",
            params: {
                parallax: {
                    enabled: !1
                }
            },
            create: function() {
                M(this, {
                    parallax: t({}, Q)
                })
            },
            on: {
                beforeInit: function(e) {
                    e.params.parallax.enabled && (e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0)
                },
                init: function(e) {
                    e.params.parallax.enabled && e.parallax.setTranslate()
                },
                setTranslate: function(e) {
                    e.params.parallax.enabled && e.parallax.setTranslate()
                },
                setTransition: function(e, t) {
                    e.params.parallax.enabled && e.parallax.setTransition(t)
                }
            }
        }, {
            name: "zoom",
            params: {
                zoom: {
                    enabled: !1,
                    maxRatio: 3,
                    minRatio: 1,
                    toggle: !0,
                    containerClass: "swiper-zoom-container",
                    zoomedSlideClass: "swiper-slide-zoomed"
                }
            },
            create: function() {
                var e = this;
                M(e, {
                    zoom: t({
                        enabled: !1,
                        scale: 1,
                        currentScale: 1,
                        isScaling: !1,
                        gesture: {
                            $slideEl: void 0,
                            slideWidth: void 0,
                            slideHeight: void 0,
                            $imageEl: void 0,
                            $imageWrapEl: void 0,
                            maxRatio: 3
                        },
                        image: {
                            isTouched: void 0,
                            isMoved: void 0,
                            currentX: void 0,
                            currentY: void 0,
                            minX: void 0,
                            minY: void 0,
                            maxX: void 0,
                            maxY: void 0,
                            width: void 0,
                            height: void 0,
                            startX: void 0,
                            startY: void 0,
                            touchesStart: {},
                            touchesCurrent: {}
                        },
                        velocity: {
                            x: void 0,
                            y: void 0,
                            prevPositionX: void 0,
                            prevPositionY: void 0,
                            prevTime: void 0
                        }
                    }, ee)
                });
                var a = 1;
                Object.defineProperty(e.zoom, "scale", {
                    get: function() {
                        return a
                    },
                    set: function(t) {
                        if (a !== t) {
                            var i = e.zoom.gesture.$imageEl ? e.zoom.gesture.$imageEl[0] : void 0,
                                s = e.zoom.gesture.$slideEl ? e.zoom.gesture.$slideEl[0] : void 0;
                            e.emit("zoomChange", t, i, s)
                        }
                        a = t
                    }
                })
            },
            on: {
                init: function(e) {
                    e.params.zoom.enabled && e.zoom.enable()
                },
                destroy: function(e) {
                    e.zoom.disable()
                },
                touchStart: function(e, t) {
                    e.zoom.enabled && e.zoom.onTouchStart(t)
                },
                touchEnd: function(e, t) {
                    e.zoom.enabled && e.zoom.onTouchEnd(t)
                },
                doubleTap: function(e, t) {
                    e.params.zoom.enabled && e.zoom.enabled && e.params.zoom.toggle && e.zoom.toggle(t)
                },
                transitionEnd: function(e) {
                    e.zoom.enabled && e.params.zoom.enabled && e.zoom.onTransitionEnd()
                },
                slideChange: function(e) {
                    e.zoom.enabled && e.params.zoom.enabled && e.params.cssMode && e.zoom.onTransitionEnd()
                }
            }
        }, {
            name: "lazy",
            params: {
                lazy: {
                    checkInView: !1,
                    enabled: !1,
                    loadPrevNext: !1,
                    loadPrevNextAmount: 1,
                    loadOnTransitionStart: !1,
                    scrollingElement: "",
                    elementClass: "swiper-lazy",
                    loadingClass: "swiper-lazy-loading",
                    loadedClass: "swiper-lazy-loaded",
                    preloaderClass: "swiper-lazy-preloader"
                }
            },
            create: function() {
                M(this, {
                    lazy: t({
                        initialImageLoaded: !1
                    }, te)
                })
            },
            on: {
                beforeInit: function(e) {
                    e.params.lazy.enabled && e.params.preloadImages && (e.params.preloadImages = !1)
                },
                init: function(e) {
                    e.params.lazy.enabled && !e.params.loop && 0 === e.params.initialSlide && (e.params.lazy.checkInView ? e.lazy.checkInViewOnLoad() : e.lazy.load())
                },
                scroll: function(e) {
                    e.params.freeMode && !e.params.freeModeSticky && e.lazy.load()
                },
                resize: function(e) {
                    e.params.lazy.enabled && e.lazy.load()
                },
                scrollbarDragMove: function(e) {
                    e.params.lazy.enabled && e.lazy.load()
                },
                transitionStart: function(e) {
                    e.params.lazy.enabled && (e.params.lazy.loadOnTransitionStart || !e.params.lazy.loadOnTransitionStart && !e.lazy.initialImageLoaded) && e.lazy.load()
                },
                transitionEnd: function(e) {
                    e.params.lazy.enabled && !e.params.lazy.loadOnTransitionStart && e.lazy.load()
                },
                slideChange: function(e) {
                    e.params.lazy.enabled && e.params.cssMode && e.lazy.load()
                }
            }
        }, {
            name: "controller",
            params: {
                controller: {
                    control: void 0,
                    inverse: !1,
                    by: "slide"
                }
            },
            create: function() {
                M(this, {
                    controller: t({
                        control: this.params.controller.control
                    }, ae)
                })
            },
            on: {
                update: function(e) {
                    e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
                },
                resize: function(e) {
                    e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
                },
                observerUpdate: function(e) {
                    e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
                },
                setTranslate: function(e, t, a) {
                    e.controller.control && e.controller.setTranslate(t, a)
                },
                setTransition: function(e, t, a) {
                    e.controller.control && e.controller.setTransition(t, a)
                }
            }
        }, {
            name: "a11y",
            params: {
                a11y: {
                    enabled: !0,
                    notificationClass: "swiper-notification",
                    prevSlideMessage: "Previous slide",
                    nextSlideMessage: "Next slide",
                    firstSlideMessage: "This is the first slide",
                    lastSlideMessage: "This is the last slide",
                    paginationBulletMessage: "Go to slide {{index}}",
                    containerMessage: null,
                    containerRoleDescriptionMessage: null,
                    itemRoleDescriptionMessage: null
                }
            },
            create: function() {
                M(this, {
                    a11y: t({}, ie, {
                        liveRegion: m('<span class="' + this.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
                    })
                })
            },
            on: {
                afterInit: function(e) {
                    e.params.a11y.enabled && (e.a11y.init(), e.a11y.updateNavigation())
                },
                toEdge: function(e) {
                    e.params.a11y.enabled && e.a11y.updateNavigation()
                },
                fromEdge: function(e) {
                    e.params.a11y.enabled && e.a11y.updateNavigation()
                },
                paginationUpdate: function(e) {
                    e.params.a11y.enabled && e.a11y.updatePagination()
                },
                destroy: function(e) {
                    e.params.a11y.enabled && e.a11y.destroy()
                }
            }
        }, {
            name: "history",
            params: {
                history: {
                    enabled: !1,
                    replaceState: !1,
                    key: "slides"
                }
            },
            create: function() {
                M(this, {
                    history: t({}, se)
                })
            },
            on: {
                init: function(e) {
                    e.params.history.enabled && e.history.init()
                },
                destroy: function(e) {
                    e.params.history.enabled && e.history.destroy()
                },
                transitionEnd: function(e) {
                    e.history.initialized && e.history.setHistory(e.params.history.key, e.activeIndex)
                },
                slideChange: function(e) {
                    e.history.initialized && e.params.cssMode && e.history.setHistory(e.params.history.key, e.activeIndex)
                }
            }
        }, {
            name: "hash-navigation",
            params: {
                hashNavigation: {
                    enabled: !1,
                    replaceState: !1,
                    watchState: !1
                }
            },
            create: function() {
                M(this, {
                    hashNavigation: t({
                        initialized: !1
                    }, re)
                })
            },
            on: {
                init: function(e) {
                    e.params.hashNavigation.enabled && e.hashNavigation.init()
                },
                destroy: function(e) {
                    e.params.hashNavigation.enabled && e.hashNavigation.destroy()
                },
                transitionEnd: function(e) {
                    e.hashNavigation.initialized && e.hashNavigation.setHash()
                },
                slideChange: function(e) {
                    e.hashNavigation.initialized && e.params.cssMode && e.hashNavigation.setHash()
                }
            }
        }, {
            name: "autoplay",
            params: {
                autoplay: {
                    enabled: !1,
                    delay: 3e3,
                    waitForTransition: !0,
                    disableOnInteraction: !0,
                    stopOnLastSlide: !1,
                    reverseDirection: !1
                }
            },
            create: function() {
                M(this, {
                    autoplay: t({}, ne, {
                        running: !1,
                        paused: !1
                    })
                })
            },
            on: {
                init: function(e) {
                    e.params.autoplay.enabled && (e.autoplay.start(), r().addEventListener("visibilitychange", e.autoplay.onVisibilityChange))
                },
                beforeTransitionStart: function(e, t, a) {
                    e.autoplay.running && (a || !e.params.autoplay.disableOnInteraction ? e.autoplay.pause(t) : e.autoplay.stop())
                },
                sliderFirstMove: function(e) {
                    e.autoplay.running && (e.params.autoplay.disableOnInteraction ? e.autoplay.stop() : e.autoplay.pause())
                },
                touchEnd: function(e) {
                    e.params.cssMode && e.autoplay.paused && !e.params.autoplay.disableOnInteraction && e.autoplay.run()
                },
                destroy: function(e) {
                    e.autoplay.running && e.autoplay.stop(), r().removeEventListener("visibilitychange", e.autoplay.onVisibilityChange)
                }
            }
        }, {
            name: "effect-fade",
            params: {
                fadeEffect: {
                    crossFade: !1
                }
            },
            create: function() {
                M(this, {
                    fadeEffect: t({}, le)
                })
            },
            on: {
                beforeInit: function(e) {
                    if ("fade" === e.params.effect) {
                        e.classNames.push(e.params.containerModifierClass + "fade");
                        var t = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            spaceBetween: 0,
                            virtualTranslate: !0
                        };
                        S(e.params, t), S(e.originalParams, t)
                    }
                },
                setTranslate: function(e) {
                    "fade" === e.params.effect && e.fadeEffect.setTranslate()
                },
                setTransition: function(e, t) {
                    "fade" === e.params.effect && e.fadeEffect.setTransition(t)
                }
            }
        }, {
            name: "effect-cube",
            params: {
                cubeEffect: {
                    slideShadows: !0,
                    shadow: !0,
                    shadowOffset: 20,
                    shadowScale: .94
                }
            },
            create: function() {
                M(this, {
                    cubeEffect: t({}, oe)
                })
            },
            on: {
                beforeInit: function(e) {
                    if ("cube" === e.params.effect) {
                        e.classNames.push(e.params.containerModifierClass + "cube"), e.classNames.push(e.params.containerModifierClass + "3d");
                        var t = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            resistanceRatio: 0,
                            spaceBetween: 0,
                            centeredSlides: !1,
                            virtualTranslate: !0
                        };
                        S(e.params, t), S(e.originalParams, t)
                    }
                },
                setTranslate: function(e) {
                    "cube" === e.params.effect && e.cubeEffect.setTranslate()
                },
                setTransition: function(e, t) {
                    "cube" === e.params.effect && e.cubeEffect.setTransition(t)
                }
            }
        }, {
            name: "effect-flip",
            params: {
                flipEffect: {
                    slideShadows: !0,
                    limitRotation: !0
                }
            },
            create: function() {
                M(this, {
                    flipEffect: t({}, de)
                })
            },
            on: {
                beforeInit: function(e) {
                    if ("flip" === e.params.effect) {
                        e.classNames.push(e.params.containerModifierClass + "flip"), e.classNames.push(e.params.containerModifierClass + "3d");
                        var t = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            spaceBetween: 0,
                            virtualTranslate: !0
                        };
                        S(e.params, t), S(e.originalParams, t)
                    }
                },
                setTranslate: function(e) {
                    "flip" === e.params.effect && e.flipEffect.setTranslate()
                },
                setTransition: function(e, t) {
                    "flip" === e.params.effect && e.flipEffect.setTransition(t)
                }
            }
        }, {
            name: "effect-coverflow",
            params: {
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    scale: 1,
                    modifier: 1,
                    slideShadows: !0
                }
            },
            create: function() {
                M(this, {
                    coverflowEffect: t({}, pe)
                })
            },
            on: {
                beforeInit: function(e) {
                    "coverflow" === e.params.effect && (e.classNames.push(e.params.containerModifierClass + "coverflow"), e.classNames.push(e.params.containerModifierClass + "3d"), e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0)
                },
                setTranslate: function(e) {
                    "coverflow" === e.params.effect && e.coverflowEffect.setTranslate()
                },
                setTransition: function(e, t) {
                    "coverflow" === e.params.effect && e.coverflowEffect.setTransition(t)
                }
            }
        }, {
            name: "thumbs",
            params: {
                thumbs: {
                    swiper: null,
                    multipleActiveThumbs: !0,
                    autoScrollOffset: 0,
                    slideThumbActiveClass: "swiper-slide-thumb-active",
                    thumbsContainerClass: "swiper-container-thumbs"
                }
            },
            create: function() {
                M(this, {
                    thumbs: t({
                        swiper: null,
                        initialized: !1
                    }, ue)
                })
            },
            on: {
                beforeInit: function(e) {
                    var t = e.params.thumbs;
                    t && t.swiper && (e.thumbs.init(), e.thumbs.update(!0))
                },
                slideChange: function(e) {
                    e.thumbs.swiper && e.thumbs.update()
                },
                update: function(e) {
                    e.thumbs.swiper && e.thumbs.update()
                },
                resize: function(e) {
                    e.thumbs.swiper && e.thumbs.update()
                },
                observerUpdate: function(e) {
                    e.thumbs.swiper && e.thumbs.update()
                },
                setTransition: function(e, t) {
                    var a = e.thumbs.swiper;
                    a && a.setTransition(t)
                },
                beforeDestroy: function(e) {
                    var t = e.thumbs.swiper;
                    t && e.thumbs.swiperCreated && t && t.destroy()
                }
            }
        }];
    return W.use(ce), W
}));
! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.AOS = t() : e.AOS = t()
}(this, function() {
    return function(e) {
        function t(o) {
            if (n[o]) return n[o].exports;
            var i = n[o] = {
                exports: {},
                id: o,
                loaded: !1
            };
            return e[o].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
        }
        var n = {};
        return t.m = e, t.c = n, t.p = "dist/", t(0)
    }([function(e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var i = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
                }
                return e
            },
            r = n(1),
            a = (o(r), n(6)),
            u = o(a),
            c = n(7),
            s = o(c),
            f = n(8),
            d = o(f),
            l = n(9),
            p = o(l),
            m = n(10),
            b = o(m),
            v = n(11),
            y = o(v),
            g = n(14),
            h = o(g),
            w = [],
            k = !1,
            x = {
                offset: 120,
                delay: 0,
                easing: "ease",
                duration: 400,
                disable: !1,
                once: !1,
                startEvent: "DOMContentLoaded",
                throttleDelay: 99,
                debounceDelay: 50,
                disableMutationObserver: !1
            },
            j = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                if (e && (k = !0), k) return w = (0, y.default)(w, x), (0, b.default)(w, x.once), w
            },
            O = function() {
                w = (0, h.default)(), j()
            },
            M = function() {
                w.forEach(function(e, t) {
                    e.node.removeAttribute("data-aos"), e.node.removeAttribute("data-aos-easing"), e.node.removeAttribute("data-aos-duration"), e.node.removeAttribute("data-aos-delay")
                })
            },
            S = function(e) {
                return e === !0 || "mobile" === e && p.default.mobile() || "phone" === e && p.default.phone() || "tablet" === e && p.default.tablet() || "function" == typeof e && e() === !0
            },
            _ = function(e) {
                x = i(x, e), w = (0, h.default)();
                var t = document.all && !window.atob;
                return S(x.disable) || t ? M() : (x.disableMutationObserver || d.default.isSupported() || (console.info('\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '), x.disableMutationObserver = !0), document.querySelector("body").setAttribute("data-aos-easing", x.easing), document.querySelector("body").setAttribute("data-aos-duration", x.duration), document.querySelector("body").setAttribute("data-aos-delay", x.delay), "DOMContentLoaded" === x.startEvent && ["complete", "interactive"].indexOf(document.readyState) > -1 ? j(!0) : "load" === x.startEvent ? window.addEventListener(x.startEvent, function() {
                    j(!0)
                }) : document.addEventListener(x.startEvent, function() {
                    j(!0)
                }), window.addEventListener("resize", (0, s.default)(j, x.debounceDelay, !0)), window.addEventListener("orientationchange", (0, s.default)(j, x.debounceDelay, !0)), window.addEventListener("scroll", (0, u.default)(function() {
                    (0, b.default)(w, x.once)
                }, x.throttleDelay)), x.disableMutationObserver || d.default.ready("[data-aos]", O), w)
            };
        e.exports = {
            init: _,
            refresh: j,
            refreshHard: O
        }
    }, function(e, t) {}, , , , , function(e, t) {
        (function(t) {
            "use strict";

            function n(e, t, n) {
                function o(t) {
                    var n = b,
                        o = v;
                    return b = v = void 0, k = t, g = e.apply(o, n)
                }

                function r(e) {
                    return k = e, h = setTimeout(f, t), M ? o(e) : g
                }

                function a(e) {
                    var n = e - w,
                        o = e - k,
                        i = t - n;
                    return S ? j(i, y - o) : i
                }

                function c(e) {
                    var n = e - w,
                        o = e - k;
                    return void 0 === w || n >= t || n < 0 || S && o >= y
                }

                function f() {
                    var e = O();
                    return c(e) ? d(e) : void(h = setTimeout(f, a(e)))
                }

                function d(e) {
                    return h = void 0, _ && b ? o(e) : (b = v = void 0, g)
                }

                function l() {
                    void 0 !== h && clearTimeout(h), k = 0, b = w = v = h = void 0
                }

                function p() {
                    return void 0 === h ? g : d(O())
                }

                function m() {
                    var e = O(),
                        n = c(e);
                    if (b = arguments, v = this, w = e, n) {
                        if (void 0 === h) return r(w);
                        if (S) return h = setTimeout(f, t), o(w)
                    }
                    return void 0 === h && (h = setTimeout(f, t)), g
                }
                var b, v, y, g, h, w, k = 0,
                    M = !1,
                    S = !1,
                    _ = !0;
                if ("function" != typeof e) throw new TypeError(s);
                return t = u(t) || 0, i(n) && (M = !!n.leading, S = "maxWait" in n, y = S ? x(u(n.maxWait) || 0, t) : y, _ = "trailing" in n ? !!n.trailing : _), m.cancel = l, m.flush = p, m
            }

            function o(e, t, o) {
                var r = !0,
                    a = !0;
                if ("function" != typeof e) throw new TypeError(s);
                return i(o) && (r = "leading" in o ? !!o.leading : r, a = "trailing" in o ? !!o.trailing : a), n(e, t, {
                    leading: r,
                    maxWait: t,
                    trailing: a
                })
            }

            function i(e) {
                var t = "undefined" == typeof e ? "undefined" : c(e);
                return !!e && ("object" == t || "function" == t)
            }

            function r(e) {
                return !!e && "object" == ("undefined" == typeof e ? "undefined" : c(e))
            }

            function a(e) {
                return "symbol" == ("undefined" == typeof e ? "undefined" : c(e)) || r(e) && k.call(e) == d
            }

            function u(e) {
                if ("number" == typeof e) return e;
                if (a(e)) return f;
                if (i(e)) {
                    var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                    e = i(t) ? t + "" : t
                }
                if ("string" != typeof e) return 0 === e ? e : +e;
                e = e.replace(l, "");
                var n = m.test(e);
                return n || b.test(e) ? v(e.slice(2), n ? 2 : 8) : p.test(e) ? f : +e
            }
            var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                s = "Expected a function",
                f = NaN,
                d = "[object Symbol]",
                l = /^\s+|\s+$/g,
                p = /^[-+]0x[0-9a-f]+$/i,
                m = /^0b[01]+$/i,
                b = /^0o[0-7]+$/i,
                v = parseInt,
                y = "object" == ("undefined" == typeof t ? "undefined" : c(t)) && t && t.Object === Object && t,
                g = "object" == ("undefined" == typeof self ? "undefined" : c(self)) && self && self.Object === Object && self,
                h = y || g || Function("return this")(),
                w = Object.prototype,
                k = w.toString,
                x = Math.max,
                j = Math.min,
                O = function() {
                    return h.Date.now()
                };
            e.exports = o
        }).call(t, function() {
            return this
        }())
    }, function(e, t) {
        (function(t) {
            "use strict";

            function n(e, t, n) {
                function i(t) {
                    var n = b,
                        o = v;
                    return b = v = void 0, O = t, g = e.apply(o, n)
                }

                function r(e) {
                    return O = e, h = setTimeout(f, t), M ? i(e) : g
                }

                function u(e) {
                    var n = e - w,
                        o = e - O,
                        i = t - n;
                    return S ? x(i, y - o) : i
                }

                function s(e) {
                    var n = e - w,
                        o = e - O;
                    return void 0 === w || n >= t || n < 0 || S && o >= y
                }

                function f() {
                    var e = j();
                    return s(e) ? d(e) : void(h = setTimeout(f, u(e)))
                }

                function d(e) {
                    return h = void 0, _ && b ? i(e) : (b = v = void 0, g)
                }

                function l() {
                    void 0 !== h && clearTimeout(h), O = 0, b = w = v = h = void 0
                }

                function p() {
                    return void 0 === h ? g : d(j())
                }

                function m() {
                    var e = j(),
                        n = s(e);
                    if (b = arguments, v = this, w = e, n) {
                        if (void 0 === h) return r(w);
                        if (S) return h = setTimeout(f, t), i(w)
                    }
                    return void 0 === h && (h = setTimeout(f, t)), g
                }
                var b, v, y, g, h, w, O = 0,
                    M = !1,
                    S = !1,
                    _ = !0;
                if ("function" != typeof e) throw new TypeError(c);
                return t = a(t) || 0, o(n) && (M = !!n.leading, S = "maxWait" in n, y = S ? k(a(n.maxWait) || 0, t) : y, _ = "trailing" in n ? !!n.trailing : _), m.cancel = l, m.flush = p, m
            }

            function o(e) {
                var t = "undefined" == typeof e ? "undefined" : u(e);
                return !!e && ("object" == t || "function" == t)
            }

            function i(e) {
                return !!e && "object" == ("undefined" == typeof e ? "undefined" : u(e))
            }

            function r(e) {
                return "symbol" == ("undefined" == typeof e ? "undefined" : u(e)) || i(e) && w.call(e) == f
            }

            function a(e) {
                if ("number" == typeof e) return e;
                if (r(e)) return s;
                if (o(e)) {
                    var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                    e = o(t) ? t + "" : t
                }
                if ("string" != typeof e) return 0 === e ? e : +e;
                e = e.replace(d, "");
                var n = p.test(e);
                return n || m.test(e) ? b(e.slice(2), n ? 2 : 8) : l.test(e) ? s : +e
            }
            var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                c = "Expected a function",
                s = NaN,
                f = "[object Symbol]",
                d = /^\s+|\s+$/g,
                l = /^[-+]0x[0-9a-f]+$/i,
                p = /^0b[01]+$/i,
                m = /^0o[0-7]+$/i,
                b = parseInt,
                v = "object" == ("undefined" == typeof t ? "undefined" : u(t)) && t && t.Object === Object && t,
                y = "object" == ("undefined" == typeof self ? "undefined" : u(self)) && self && self.Object === Object && self,
                g = v || y || Function("return this")(),
                h = Object.prototype,
                w = h.toString,
                k = Math.max,
                x = Math.min,
                j = function() {
                    return g.Date.now()
                };
            e.exports = n
        }).call(t, function() {
            return this
        }())
    }, function(e, t) {
        "use strict";

        function n(e) {
            var t = void 0,
                o = void 0,
                i = void 0;
            for (t = 0; t < e.length; t += 1) {
                if (o = e[t], o.dataset && o.dataset.aos) return !0;
                if (i = o.children && n(o.children)) return !0
            }
            return !1
        }

        function o() {
            return window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
        }

        function i() {
            return !!o()
        }

        function r(e, t) {
            var n = window.document,
                i = o(),
                r = new i(a);
            u = t, r.observe(n.documentElement, {
                childList: !0,
                subtree: !0,
                removedNodes: !0
            })
        }

        function a(e) {
            e && e.forEach(function(e) {
                var t = Array.prototype.slice.call(e.addedNodes),
                    o = Array.prototype.slice.call(e.removedNodes),
                    i = t.concat(o);
                if (n(i)) return u()
            })
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var u = function() {};
        t.default = {
            isSupported: i,
            ready: r
        }
    }, function(e, t) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function o() {
            return navigator.userAgent || navigator.vendor || window.opera || ""
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var o = t[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                    }
                }
                return function(t, n, o) {
                    return n && e(t.prototype, n), o && e(t, o), t
                }
            }(),
            r = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
            a = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
            u = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
            c = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
            s = function() {
                function e() {
                    n(this, e)
                }
                return i(e, [{
                    key: "phone",
                    value: function() {
                        var e = o();
                        return !(!r.test(e) && !a.test(e.substr(0, 4)))
                    }
                }, {
                    key: "mobile",
                    value: function() {
                        var e = o();
                        return !(!u.test(e) && !c.test(e.substr(0, 4)))
                    }
                }, {
                    key: "tablet",
                    value: function() {
                        return this.mobile() && !this.phone()
                    }
                }]), e
            }();
        t.default = new s
    }, function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function(e, t, n) {
                var o = e.node.getAttribute("data-aos-once");
                t > e.position ? e.node.classList.add("aos-animate") : "undefined" != typeof o && ("false" === o || !n && "true" !== o) && e.node.classList.remove("aos-animate")
            },
            o = function(e, t) {
                var o = window.pageYOffset,
                    i = window.innerHeight;
                e.forEach(function(e, r) {
                    n(e, i + o, t)
                })
            };
        t.default = o
    }, function(e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(12),
            r = o(i),
            a = function(e, t) {
                return e.forEach(function(e, n) {
                    e.node.classList.add("aos-init"), e.position = (0, r.default)(e.node, t.offset)
                }), e
            };
        t.default = a
    }, function(e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(13),
            r = o(i),
            a = function(e, t) {
                var n = 0,
                    o = 0,
                    i = window.innerHeight,
                    a = {
                        offset: e.getAttribute("data-aos-offset"),
                        anchor: e.getAttribute("data-aos-anchor"),
                        anchorPlacement: e.getAttribute("data-aos-anchor-placement")
                    };
                switch (a.offset && !isNaN(a.offset) && (o = parseInt(a.offset)), a.anchor && document.querySelectorAll(a.anchor) && (e = document.querySelectorAll(a.anchor)[0]), n = (0, r.default)(e).top, a.anchorPlacement) {
                    case "top-bottom":
                        break;
                    case "center-bottom":
                        n += e.offsetHeight / 2;
                        break;
                    case "bottom-bottom":
                        n += e.offsetHeight;
                        break;
                    case "top-center":
                        n += i / 2;
                        break;
                    case "bottom-center":
                        n += i / 2 + e.offsetHeight;
                        break;
                    case "center-center":
                        n += i / 2 + e.offsetHeight / 2;
                        break;
                    case "top-top":
                        n += i;
                        break;
                    case "bottom-top":
                        n += e.offsetHeight + i;
                        break;
                    case "center-top":
                        n += e.offsetHeight / 2 + i
                }
                return a.anchorPlacement || a.offset || isNaN(t) || (o = t), n + o
            };
        t.default = a
    }, function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function(e) {
            for (var t = 0, n = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);) t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0), n += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0), e = e.offsetParent;
            return {
                top: n,
                left: t
            }
        };
        t.default = n
    }, function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function(e) {
            return e = e || document.querySelectorAll("[data-aos]"), Array.prototype.map.call(e, function(e) {
                return {
                    node: e
                }
            })
        };
        t.default = n
    }])
});
! function() {
    var s, i, c, a, o = {
            frameRate: 150,
            animationTime: 400,
            stepSize: 100,
            pulseAlgorithm: !0,
            pulseScale: 4,
            pulseNormalize: 1,
            accelerationDelta: 50,
            accelerationMax: 3,
            keyboardSupport: !0,
            arrowScroll: 50,
            fixedBackground: !0,
            excluded: ""
        },
        p = o,
        u = !1,
        d = !1,
        n = {
            x: 0,
            y: 0
        },
        f = !1,
        m = document.documentElement,
        l = [],
        h = /^Mac/.test(navigator.platform),
        w = {
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            spacebar: 32,
            pageup: 33,
            pagedown: 34,
            end: 35,
            home: 36
        },
        v = {
            37: 1,
            38: 1,
            39: 1,
            40: 1
        };

    function y() {
        if (!f && document.body) {
            f = !0;
            var e = document.body,
                t = document.documentElement,
                o = window.innerHeight,
                n = e.scrollHeight;
            if (m = 0 <= document.compatMode.indexOf("CSS") ? t : e, s = e, p.keyboardSupport && Y("keydown", x), top != self) d = !0;
            else if (Q && o < n && (e.offsetHeight <= o || t.offsetHeight <= o)) {
                var r, a = document.createElement("div");
                a.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + m.scrollHeight + "px", document.body.appendChild(a), c = function() {
                    r = r || setTimeout(function() {
                        u || (a.style.height = "0", a.style.height = m.scrollHeight + "px", r = null)
                    }, 500)
                }, setTimeout(c, 10), Y("resize", c);
                if ((i = new R(c)).observe(e, {
                        attributes: !0,
                        childList: !0,
                        characterData: !1
                    }), m.offsetHeight <= o) {
                    var l = document.createElement("div");
                    l.style.clear = "both", e.appendChild(l)
                }
            }
            p.fixedBackground || u || (e.style.backgroundAttachment = "scroll", t.style.backgroundAttachment = "scroll")
        }
    }
    var b = [],
        g = !1,
        r = Date.now();

    function S(d, f, m) {
        if (function(e, t) {
                e = 0 < e ? 1 : -1, t = 0 < t ? 1 : -1, n.x === e && n.y === t || (n.x = e, n.y = t, b = [], r = 0)
            }(f, m), 1 != p.accelerationMax) {
            var e = Date.now() - r;
            if (e < p.accelerationDelta) {
                var t = (1 + 50 / e) / 2;
                1 < t && (t = Math.min(t, p.accelerationMax), f *= t, m *= t)
            }
            r = Date.now()
        }
        if (b.push({
                x: f,
                y: m,
                lastX: f < 0 ? .99 : -.99,
                lastY: m < 0 ? .99 : -.99,
                start: Date.now()
            }), !g) {
            var o = q(),
                h = d === o || d === document.body;
            null == d.$scrollBehavior && function(e) {
                var t = M(e);
                if (null == B[t]) {
                    var o = getComputedStyle(e, "")["scroll-behavior"];
                    B[t] = "smooth" == o
                }
                return B[t]
            }(d) && (d.$scrollBehavior = d.style.scrollBehavior, d.style.scrollBehavior = "auto");
            var w = function(e) {
                for (var t = Date.now(), o = 0, n = 0, r = 0; r < b.length; r++) {
                    var a = b[r],
                        l = t - a.start,
                        i = l >= p.animationTime,
                        c = i ? 1 : l / p.animationTime;
                    p.pulseAlgorithm && (c = F(c));
                    var s = a.x * c - a.lastX >> 0,
                        u = a.y * c - a.lastY >> 0;
                    o += s, n += u, a.lastX += s, a.lastY += u, i && (b.splice(r, 1), r--)
                }
                h ? window.scrollBy(o, n) : (o && (d.scrollLeft += o), n && (d.scrollTop += n)), f || m || (b = []), b.length ? j(w, d, 1e3 / p.frameRate + 1) : (g = !1, null != d.$scrollBehavior && (d.style.scrollBehavior = d.$scrollBehavior, d.$scrollBehavior = null))
            };
            j(w, d, 0), g = !0
        }
    }

    function e(e) {
        f || y();
        var t = e.target;
        if (e.defaultPrevented || e.ctrlKey) return !0;
        if (N(s, "embed") || N(t, "embed") && /\.pdf/i.test(t.src) || N(s, "object") || t.shadowRoot) return !0;
        var o = -e.wheelDeltaX || e.deltaX || 0,
            n = -e.wheelDeltaY || e.deltaY || 0;
        h && (e.wheelDeltaX && K(e.wheelDeltaX, 120) && (o = e.wheelDeltaX / Math.abs(e.wheelDeltaX) * -120), e.wheelDeltaY && K(e.wheelDeltaY, 120) && (n = e.wheelDeltaY / Math.abs(e.wheelDeltaY) * -120)), o || n || (n = -e.wheelDelta || 0), 1 === e.deltaMode && (o *= 40, n *= 40);
        var r = z(t);
        return r ? !! function(e) {
            if (!e) return;
            l.length || (l = [e, e, e]);
            e = Math.abs(e), l.push(e), l.shift(), clearTimeout(a), a = setTimeout(function() {
                try {
                    localStorage.SS_deltaBuffer = l.join(",")
                } catch (e) {}
            }, 1e3);
            var t = 120 < e && P(e),
                o = !P(120) && !P(100) && !t;
            return e < 50 || o
        }(n) || (1.2 < Math.abs(o) && (o *= p.stepSize / 120), 1.2 < Math.abs(n) && (n *= p.stepSize / 120), S(r, o, n), e.preventDefault(), void C()) : !d || !W || (Object.defineProperty(e, "target", {
            value: window.frameElement
        }), parent.wheel(e))
    }

    function x(e) {
        var t = e.target,
            o = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== w.spacebar;
        document.body.contains(s) || (s = document.activeElement);
        var n = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if (e.defaultPrevented || /^(textarea|select|embed|object)$/i.test(t.nodeName) || N(t, "input") && !n.test(t.type) || N(s, "video") || function(e) {
                var t = e.target,
                    o = !1;
                if (-1 != document.URL.indexOf("www.youtube.com/watch"))
                    do {
                        if (o = t.classList && t.classList.contains("html5-video-controls")) break
                    } while (t = t.parentNode);
                return o
            }(e) || t.isContentEditable || o) return !0;
        if ((N(t, "button") || N(t, "input") && n.test(t.type)) && e.keyCode === w.spacebar) return !0;
        if (N(t, "input") && "radio" == t.type && v[e.keyCode]) return !0;
        var r = 0,
            a = 0,
            l = z(s);
        if (!l) return !d || !W || parent.keydown(e);
        var i = l.clientHeight;
        switch (l == document.body && (i = window.innerHeight), e.keyCode) {
            case w.up:
                a = -p.arrowScroll;
                break;
            case w.down:
                a = p.arrowScroll;
                break;
            case w.spacebar:
                a = -(e.shiftKey ? 1 : -1) * i * .9;
                break;
            case w.pageup:
                a = .9 * -i;
                break;
            case w.pagedown:
                a = .9 * i;
                break;
            case w.home:
                l == document.body && document.scrollingElement && (l = document.scrollingElement), a = -l.scrollTop;
                break;
            case w.end:
                var c = l.scrollHeight - l.scrollTop - i;
                a = 0 < c ? 10 + c : 0;
                break;
            case w.left:
                r = -p.arrowScroll;
                break;
            case w.right:
                r = p.arrowScroll;
                break;
            default:
                return !0
        }
        S(l, r, a), e.preventDefault(), C()
    }

    function t(e) {
        s = e.target
    }
    var k, D, M = (k = 0, function(e) {
            return e.uniqueID || (e.uniqueID = k++)
        }),
        E = {},
        T = {},
        B = {};

    function C() {
        clearTimeout(D), D = setInterval(function() {
            E = T = B = {}
        }, 1e3)
    }

    function H(e, t, o) {
        for (var n = o ? E : T, r = e.length; r--;) n[M(e[r])] = t;
        return t
    }

    function z(e) {
        var t = [],
            o = document.body,
            n = m.scrollHeight;
        do {
            var r = (!1 ? E : T)[M(e)];
            if (r) return H(t, r);
            if (t.push(e), n === e.scrollHeight) {
                var a = O(m) && O(o) || X(m);
                if (d && L(m) || !d && a) return H(t, q())
            } else if (L(e) && X(e)) return H(t, e)
        } while (e = e.parentElement)
    }

    function L(e) {
        return e.clientHeight + 10 < e.scrollHeight
    }

    function O(e) {
        return "hidden" !== getComputedStyle(e, "").getPropertyValue("overflow-y")
    }

    function X(e) {
        var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
        return "scroll" === t || "auto" === t
    }

    function Y(e, t, o) {
        window.addEventListener(e, t, o || !1)
    }

    function A(e, t, o) {
        window.removeEventListener(e, t, o || !1)
    }

    function N(e, t) {
        return e && (e.nodeName || "").toLowerCase() === t.toLowerCase()
    }
    if (window.localStorage && localStorage.SS_deltaBuffer) try {
        l = localStorage.SS_deltaBuffer.split(",")
    } catch (e) {}

    function K(e, t) {
        return Math.floor(e / t) == e / t
    }

    function P(e) {
        return K(l[0], e) && K(l[1], e) && K(l[2], e)
    }
    var $, j = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e, t, o) {
            window.setTimeout(e, o || 1e3 / 60)
        },
        R = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
        q = ($ = document.scrollingElement, function() {
            if (!$) {
                var e = document.createElement("div");
                e.style.cssText = "height:10000px;width:1px;", document.body.appendChild(e);
                var t = document.body.scrollTop;
                document.documentElement.scrollTop, window.scrollBy(0, 3), $ = document.body.scrollTop != t ? document.body : document.documentElement, window.scrollBy(0, -3), document.body.removeChild(e)
            }
            return $
        });

    function V(e) {
        var t;
        return ((e *= p.pulseScale) < 1 ? e - (1 - Math.exp(-e)) : (e -= 1, (t = Math.exp(-1)) + (1 - Math.exp(-e)) * (1 - t))) * p.pulseNormalize
    }

    function F(e) {
        return 1 <= e ? 1 : e <= 0 ? 0 : (1 == p.pulseNormalize && (p.pulseNormalize /= V(1)), V(e))
    }
    var I = window.navigator.userAgent,
        _ = /Edge/.test(I),
        W = /chrome/i.test(I) && !_,
        U = /safari/i.test(I) && !_,
        G = /mobile/i.test(I),
        J = /Windows NT 6.1/i.test(I) && /rv:11/i.test(I),
        Q = U && (/Version\/8/i.test(I) || /Version\/9/i.test(I)),
        Z = (W || U || J) && !G,
        ee = !1;
    try {
        window.addEventListener("test", null, Object.defineProperty({}, "passive", {
            get: function() {
                ee = !0
            }
        }))
    } catch (e) {}
    var te = !!ee && {
            passive: !1
        },
        oe = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

    function ne(e) {
        for (var t in e) o.hasOwnProperty(t) && (p[t] = e[t])
    }
    oe && Z && (Y(oe, e, te), Y("mousedown", t), Y("load", y)), ne.destroy = function() {
        i && i.disconnect(), A(oe, e), A("mousedown", t), A("keydown", x), A("resize", c), A("load", y)
    }, window.SmoothScrollOptions && ne(window.SmoothScrollOptions), "function" == typeof define && define.amd ? define(function() {
        return ne
    }) : "object" == typeof exports ? module.exports = ne : window.SmoothScroll = ne
}();
! function() {
    "use strict";

    function t(o) {
        if (!o) throw new Error("No options passed to Waypoint constructor");
        if (!o.element) throw new Error("No element option passed to Waypoint constructor");
        if (!o.handler) throw new Error("No handler option passed to Waypoint constructor");
        this.key = "waypoint-" + e, this.options = t.Adapter.extend({}, t.defaults, o), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = o.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
        }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), i[this.key] = this, e += 1
    }
    var e = 0,
        i = {};
    t.prototype.queueTrigger = function(t) {
        this.group.queueTrigger(this, t)
    }, t.prototype.trigger = function(t) {
        this.enabled && this.callback && this.callback.apply(this, t)
    }, t.prototype.destroy = function() {
        this.context.remove(this), this.group.remove(this), delete i[this.key]
    }, t.prototype.disable = function() {
        return this.enabled = !1, this
    }, t.prototype.enable = function() {
        return this.context.refresh(), this.enabled = !0, this
    }, t.prototype.next = function() {
        return this.group.next(this)
    }, t.prototype.previous = function() {
        return this.group.previous(this)
    }, t.invokeAll = function(t) {
        var e = [];
        for (var o in i) e.push(i[o]);
        for (var n = 0, r = e.length; r > n; n++) e[n][t]()
    }, t.destroyAll = function() {
        t.invokeAll("destroy")
    }, t.disableAll = function() {
        t.invokeAll("disable")
    }, t.enableAll = function() {
        t.invokeAll("enable")
    }, t.refreshAll = function() {
        t.Context.refreshAll()
    }, t.viewportHeight = function() {
        return window.innerHeight || document.documentElement.clientHeight
    }, t.viewportWidth = function() {
        return document.documentElement.clientWidth
    }, t.adapters = [], t.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: "default",
        horizontal: !1,
        offset: 0
    }, t.offsetAliases = {
        "bottom-in-view": function() {
            return this.context.innerHeight() - this.adapter.outerHeight()
        },
        "right-in-view": function() {
            return this.context.innerWidth() - this.adapter.outerWidth()
        }
    }, window.Waypoint = t
}(),
function() {
    "use strict";

    function t(t) {
        window.setTimeout(t, 1e3 / 60)
    }

    function e(t) {
        this.element = t, this.Adapter = n.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + i, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
            x: this.adapter.scrollLeft(),
            y: this.adapter.scrollTop()
        }, this.waypoints = {
            vertical: {},
            horizontal: {}
        }, t.waypointContextKey = this.key, o[t.waypointContextKey] = this, i += 1, this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
    }
    var i = 0,
        o = {},
        n = window.Waypoint,
        r = window.onload;
    e.prototype.add = function(t) {
        var e = t.options.horizontal ? "horizontal" : "vertical";
        this.waypoints[e][t.key] = t, this.refresh()
    }, e.prototype.checkEmpty = function() {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
            e = this.Adapter.isEmptyObject(this.waypoints.vertical);
        t && e && (this.adapter.off(".waypoints"), delete o[this.key])
    }, e.prototype.createThrottledResizeHandler = function() {
        function t() {
            e.handleResize(), e.didResize = !1
        }
        var e = this;
        this.adapter.on("resize.waypoints", function() {
            e.didResize || (e.didResize = !0, n.requestAnimationFrame(t))
        })
    }, e.prototype.createThrottledScrollHandler = function() {
        function t() {
            e.handleScroll(), e.didScroll = !1
        }
        var e = this;
        this.adapter.on("scroll.waypoints", function() {
            (!e.didScroll || n.isTouch) && (e.didScroll = !0, n.requestAnimationFrame(t))
        })
    }, e.prototype.handleResize = function() {
        n.Context.refreshAll()
    }, e.prototype.handleScroll = function() {
        var t = {},
            e = {
                horizontal: {
                    newScroll: this.adapter.scrollLeft(),
                    oldScroll: this.oldScroll.x,
                    forward: "right",
                    backward: "left"
                },
                vertical: {
                    newScroll: this.adapter.scrollTop(),
                    oldScroll: this.oldScroll.y,
                    forward: "down",
                    backward: "up"
                }
            };
        for (var i in e) {
            var o = e[i],
                n = o.newScroll > o.oldScroll,
                r = n ? o.forward : o.backward;
            for (var s in this.waypoints[i]) {
                var a = this.waypoints[i][s],
                    l = o.oldScroll < a.triggerPoint,
                    h = o.newScroll >= a.triggerPoint,
                    p = l && h,
                    u = !l && !h;
                (p || u) && (a.queueTrigger(r), t[a.group.id] = a.group)
            }
        }
        for (var c in t) t[c].flushTriggers();
        this.oldScroll = {
            x: e.horizontal.newScroll,
            y: e.vertical.newScroll
        }
    }, e.prototype.innerHeight = function() {
        return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight()
    }, e.prototype.remove = function(t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty()
    }, e.prototype.innerWidth = function() {
        return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth()
    }, e.prototype.destroy = function() {
        var t = [];
        for (var e in this.waypoints)
            for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
        for (var o = 0, n = t.length; n > o; o++) t[o].destroy()
    }, e.prototype.refresh = function() {
        var t, e = this.element == this.element.window,
            i = e ? void 0 : this.adapter.offset(),
            o = {};
        this.handleScroll(), t = {
            horizontal: {
                contextOffset: e ? 0 : i.left,
                contextScroll: e ? 0 : this.oldScroll.x,
                contextDimension: this.innerWidth(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left",
                offsetProp: "left"
            },
            vertical: {
                contextOffset: e ? 0 : i.top,
                contextScroll: e ? 0 : this.oldScroll.y,
                contextDimension: this.innerHeight(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up",
                offsetProp: "top"
            }
        };
        for (var r in t) {
            var s = t[r];
            for (var a in this.waypoints[r]) {
                var l, h, p, u, c, d = this.waypoints[r][a],
                    f = d.options.offset,
                    w = d.triggerPoint,
                    y = 0,
                    g = null == w;
                d.element !== d.element.window && (y = d.adapter.offset()[s.offsetProp]), "function" == typeof f ? f = f.apply(d) : "string" == typeof f && (f = parseFloat(f), d.options.offset.indexOf("%") > -1 && (f = Math.ceil(s.contextDimension * f / 100))), l = s.contextScroll - s.contextOffset, d.triggerPoint = y + l - f, h = w < s.oldScroll, p = d.triggerPoint >= s.oldScroll, u = h && p, c = !h && !p, !g && u ? (d.queueTrigger(s.backward), o[d.group.id] = d.group) : !g && c ? (d.queueTrigger(s.forward), o[d.group.id] = d.group) : g && s.oldScroll >= d.triggerPoint && (d.queueTrigger(s.forward), o[d.group.id] = d.group)
            }
        }
        return n.requestAnimationFrame(function() {
            for (var t in o) o[t].flushTriggers()
        }), this
    }, e.findOrCreateByElement = function(t) {
        return e.findByElement(t) || new e(t)
    }, e.refreshAll = function() {
        for (var t in o) o[t].refresh()
    }, e.findByElement = function(t) {
        return o[t.waypointContextKey]
    }, window.onload = function() {
        r && r(), e.refreshAll()
    }, n.requestAnimationFrame = function(e) {
        var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t;
        i.call(window, e)
    }, n.Context = e
}(),
function() {
    "use strict";

    function t(t, e) {
        return t.triggerPoint - e.triggerPoint
    }

    function e(t, e) {
        return e.triggerPoint - t.triggerPoint
    }

    function i(t) {
        this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), o[this.axis][this.name] = this
    }
    var o = {
            vertical: {},
            horizontal: {}
        },
        n = window.Waypoint;
    i.prototype.add = function(t) {
        this.waypoints.push(t)
    }, i.prototype.clearTriggerQueues = function() {
        this.triggerQueues = {
            up: [],
            down: [],
            left: [],
            right: []
        }
    }, i.prototype.flushTriggers = function() {
        for (var i in this.triggerQueues) {
            var o = this.triggerQueues[i],
                n = "up" === i || "left" === i;
            o.sort(n ? e : t);
            for (var r = 0, s = o.length; s > r; r += 1) {
                var a = o[r];
                (a.options.continuous || r === o.length - 1) && a.trigger([i])
            }
        }
        this.clearTriggerQueues()
    }, i.prototype.next = function(e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints),
            o = i === this.waypoints.length - 1;
        return o ? null : this.waypoints[i + 1]
    }, i.prototype.previous = function(e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints);
        return i ? this.waypoints[i - 1] : null
    }, i.prototype.queueTrigger = function(t, e) {
        this.triggerQueues[e].push(t)
    }, i.prototype.remove = function(t) {
        var e = n.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1)
    }, i.prototype.first = function() {
        return this.waypoints[0]
    }, i.prototype.last = function() {
        return this.waypoints[this.waypoints.length - 1]
    }, i.findOrCreate = function(t) {
        return o[t.axis][t.name] || new i(t)
    }, n.Group = i
}(),
function() {
    "use strict";

    function t(t) {
        this.$element = e(t)
    }
    var e = window.jQuery,
        i = window.Waypoint;
    e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(e, i) {
        t.prototype[i] = function() {
            var t = Array.prototype.slice.call(arguments);
            return this.$element[i].apply(this.$element, t)
        }
    }), e.each(["extend", "inArray", "isEmptyObject"], function(i, o) {
        t[o] = e[o]
    }), i.adapters.push({
        name: "jquery",
        Adapter: t
    }), i.Adapter = t
}(),
function() {
    "use strict";

    function t(t) {
        return function() {
            var i = [],
                o = arguments[0];
            return t.isFunction(arguments[0]) && (o = t.extend({}, arguments[1]), o.handler = arguments[0]), this.each(function() {
                var n = t.extend({}, o, {
                    element: this
                });
                "string" == typeof n.context && (n.context = t(this).closest(n.context)[0]), i.push(new e(n))
            }), i
        }
    }
    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
}();
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(a) {
    var b, c, d, e, f, g, h = "Close",
        i = "BeforeClose",
        j = "AfterClose",
        k = "BeforeAppend",
        l = "MarkupParse",
        m = "Open",
        n = "Change",
        o = "mfp",
        p = "." + o,
        q = "mfp-ready",
        r = "mfp-removing",
        s = "mfp-prevent-close",
        t = function() {},
        u = !!window.jQuery,
        v = a(window),
        w = function(a, c) {
            b.ev.on(o + a + p, c)
        },
        x = function(b, c, d, e) {
            var f = document.createElement("div");
            return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f
        },
        y = function(c, d) {
            b.ev.triggerHandler(o + c, d), b.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1), b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]))
        },
        z = function(c) {
            return c === g && b.currTemplate.closeBtn || (b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose)), g = c), b.currTemplate.closeBtn
        },
        A = function() {
            a.magnificPopup.instance || (b = new t, b.init(), a.magnificPopup.instance = b)
        },
        B = function() {
            var a = document.createElement("p").style,
                b = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== a.transition) return !0;
            for (; b.length;)
                if (b.pop() + "Transition" in a) return !0;
            return !1
        };
    t.prototype = {
        constructor: t,
        init: function() {
            var c = navigator.appVersion;
            b.isLowIE = b.isIE8 = document.all && !document.addEventListener, b.isAndroid = /android/gi.test(c), b.isIOS = /iphone|ipad|ipod/gi.test(c), b.supportsTransition = B(), b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), d = a(document), b.popupsCache = {}
        },
        open: function(c) {
            var e;
            if (c.isObj === !1) {
                b.items = c.items.toArray(), b.index = 0;
                var g, h = c.items;
                for (e = 0; e < h.length; e++)
                    if (g = h[e], g.parsed && (g = g.el[0]), g === c.el[0]) {
                        b.index = e;
                        break
                    }
            } else b.items = a.isArray(c.items) ? c.items : [c.items], b.index = c.index || 0;
            if (b.isOpen) return void b.updateItemHTML();
            b.types = [], f = "", c.mainEl && c.mainEl.length ? b.ev = c.mainEl.eq(0) : b.ev = d, c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}), b.currTemplate = b.popupsCache[c.key]) : b.currTemplate = {}, b.st = a.extend(!0, {}, a.magnificPopup.defaults, c), b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos, b.st.modal && (b.st.closeOnContentClick = !1, b.st.closeOnBgClick = !1, b.st.showCloseBtn = !1, b.st.enableEscapeKey = !1), b.bgOverlay || (b.bgOverlay = x("bg").on("click" + p, function() {
                b.close()
            }), b.wrap = x("wrap").attr("tabindex", -1).on("click" + p, function(a) {
                b._checkIfClose(a.target) && b.close()
            }), b.container = x("container", b.wrap)), b.contentContainer = x("content"), b.st.preloader && (b.preloader = x("preloader", b.container, b.st.tLoading));
            var i = a.magnificPopup.modules;
            for (e = 0; e < i.length; e++) {
                var j = i[e];
                j = j.charAt(0).toUpperCase() + j.slice(1), b["init" + j].call(b)
            }
            y("BeforeOpen"), b.st.showCloseBtn && (b.st.closeBtnInside ? (w(l, function(a, b, c, d) {
                c.close_replaceWith = z(d.type)
            }), f += " mfp-close-btn-in") : b.wrap.append(z())), b.st.alignTop && (f += " mfp-align-top"), b.fixedContentPos ? b.wrap.css({
                overflow: b.st.overflowY,
                overflowX: "hidden",
                overflowY: b.st.overflowY
            }) : b.wrap.css({
                top: v.scrollTop(),
                position: "absolute"
            }), (b.st.fixedBgPos === !1 || "auto" === b.st.fixedBgPos && !b.fixedContentPos) && b.bgOverlay.css({
                height: d.height(),
                position: "absolute"
            }), b.st.enableEscapeKey && d.on("keyup" + p, function(a) {
                27 === a.keyCode && b.close()
            }), v.on("resize" + p, function() {
                b.updateSize()
            }), b.st.closeOnContentClick || (f += " mfp-auto-cursor"), f && b.wrap.addClass(f);
            var k = b.wH = v.height(),
                n = {};
            if (b.fixedContentPos && b._hasScrollBar(k)) {
                var o = b._getScrollbarSize();
                o && (n.marginRight = o)
            }
            b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : n.overflow = "hidden");
            var r = b.st.mainClass;
            return b.isIE7 && (r += " mfp-ie7"), r && b._addClassToMFP(r), b.updateItemHTML(), y("BuildControls"), a("html").css(n), b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)), b._lastFocusedEl = document.activeElement, setTimeout(function() {
                b.content ? (b._addClassToMFP(q), b._setFocus()) : b.bgOverlay.addClass(q), d.on("focusin" + p, b._onFocusIn)
            }, 16), b.isOpen = !0, b.updateSize(k), y(m), c
        },
        close: function() {
            b.isOpen && (y(i), b.isOpen = !1, b.st.removalDelay && !b.isLowIE && b.supportsTransition ? (b._addClassToMFP(r), setTimeout(function() {
                b._close()
            }, b.st.removalDelay)) : b._close())
        },
        _close: function() {
            y(h);
            var c = r + " " + q + " ";
            if (b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && (c += b.st.mainClass + " "), b._removeClassFromMFP(c), b.fixedContentPos) {
                var e = {
                    marginRight: ""
                };
                b.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e)
            }
            d.off("keyup" + p + " focusin" + p), b.ev.off(p), b.wrap.attr("class", "mfp-wrap").removeAttr("style"), b.bgOverlay.attr("class", "mfp-bg"), b.container.attr("class", "mfp-container"), !b.st.showCloseBtn || b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(), b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(), b.currItem = null, b.content = null, b.currTemplate = null, b.prevHeight = 0, y(j)
        },
        updateSize: function(a) {
            if (b.isIOS) {
                var c = document.documentElement.clientWidth / window.innerWidth,
                    d = window.innerHeight * c;
                b.wrap.css("height", d), b.wH = d
            } else b.wH = a || v.height();
            b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize")
        },
        updateItemHTML: function() {
            var c = b.items[b.index];
            b.contentContainer.detach(), b.content && b.content.detach(), c.parsed || (c = b.parseEl(b.index));
            var d = c.type;
            if (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]), b.currItem = c, !b.currTemplate[d]) {
                var f = b.st[d] ? b.st[d].markup : !1;
                y("FirstMarkupParse", f), f ? b.currTemplate[d] = a(f) : b.currTemplate[d] = !0
            }
            e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
            var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
            b.appendContent(g, d), c.preloaded = !0, y(n, c), e = c.type, b.container.prepend(b.contentContainer), y("AfterChange")
        },
        appendContent: function(a, c) {
            b.content = a, a ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(z()) : b.content = a : b.content = "", y(k), b.container.addClass("mfp-" + c + "-holder"), b.contentContainer.append(b.content)
        },
        parseEl: function(c) {
            var d, e = b.items[c];
            if (e.tagName ? e = {
                    el: a(e)
                } : (d = e.type, e = {
                    data: e,
                    src: e.src
                }), e.el) {
                for (var f = b.types, g = 0; g < f.length; g++)
                    if (e.el.hasClass("mfp-" + f[g])) {
                        d = f[g];
                        break
                    }
                e.src = e.el.attr("data-mfp-src"), e.src || (e.src = e.el.attr("href"))
            }
            return e.type = d || b.st.type || "inline", e.index = c, e.parsed = !0, b.items[c] = e, y("ElementParse", e), b.items[c]
        },
        addGroup: function(a, c) {
            var d = function(d) {
                d.mfpEl = this, b._openClick(d, a, c)
            };
            c || (c = {});
            var e = "click.magnificPopup";
            c.mainEl = a, c.items ? (c.isObj = !0, a.off(e).on(e, d)) : (c.isObj = !1, c.delegate ? a.off(e).on(e, c.delegate, d) : (c.items = a, a.off(e).on(e, d)))
        },
        _openClick: function(c, d, e) {
            var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
            if (f || !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)) {
                var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
                if (g)
                    if (a.isFunction(g)) {
                        if (!g.call(b)) return !0
                    } else if (v.width() < g) return !0;
                c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()), e.el = a(c.mfpEl), e.delegate && (e.items = d.find(e.delegate)), b.open(e)
            }
        },
        updateStatus: function(a, d) {
            if (b.preloader) {
                c !== a && b.container.removeClass("mfp-s-" + c), d || "loading" !== a || (d = b.st.tLoading);
                var e = {
                    status: a,
                    text: d
                };
                y("UpdateStatus", e), a = e.status, d = e.text, b.preloader.html(d), b.preloader.find("a").on("click", function(a) {
                    a.stopImmediatePropagation()
                }), b.container.addClass("mfp-s-" + a), c = a
            }
        },
        _checkIfClose: function(c) {
            if (!a(c).hasClass(s)) {
                var d = b.st.closeOnContentClick,
                    e = b.st.closeOnBgClick;
                if (d && e) return !0;
                if (!b.content || a(c).hasClass("mfp-close") || b.preloader && c === b.preloader[0]) return !0;
                if (c === b.content[0] || a.contains(b.content[0], c)) {
                    if (d) return !0
                } else if (e && a.contains(document, c)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(a) {
            b.bgOverlay.addClass(a), b.wrap.addClass(a)
        },
        _removeClassFromMFP: function(a) {
            this.bgOverlay.removeClass(a), b.wrap.removeClass(a)
        },
        _hasScrollBar: function(a) {
            return (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height())
        },
        _setFocus: function() {
            (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus()
        },
        _onFocusIn: function(c) {
            return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target) ? void 0 : (b._setFocus(), !1)
        },
        _parseMarkup: function(b, c, d) {
            var e;
            d.data && (c = a.extend(d.data, c)), y(l, [b, c, d]), a.each(c, function(c, d) {
                if (void 0 === d || d === !1) return !0;
                if (e = c.split("_"), e.length > 1) {
                    var f = b.find(p + "-" + e[0]);
                    if (f.length > 0) {
                        var g = e[1];
                        "replaceWith" === g ? f[0] !== d[0] && f.replaceWith(d) : "img" === g ? f.is("img") ? f.attr("src", d) : f.replaceWith(a("<img>").attr("src", d).attr("class", f.attr("class"))) : f.attr(e[1], d)
                    }
                } else b.find(p + "-" + c).html(d)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === b.scrollbarSize) {
                var a = document.createElement("div");
                a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), b.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a)
            }
            return b.scrollbarSize
        }
    }, a.magnificPopup = {
        instance: null,
        proto: t.prototype,
        modules: [],
        open: function(b, c) {
            return A(), b = b ? a.extend(!0, {}, b) : {}, b.isObj = !0, b.index = c || 0, this.instance.open(b)
        },
        close: function() {
            return a.magnificPopup.instance && a.magnificPopup.instance.close()
        },
        registerModule: function(b, c) {
            c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, a.fn.magnificPopup = function(c) {
        A();
        var d = a(this);
        if ("string" == typeof c)
            if ("open" === c) {
                var e, f = u ? d.data("magnificPopup") : d[0].magnificPopup,
                    g = parseInt(arguments[1], 10) || 0;
                f.items ? e = f.items[g] : (e = d, f.delegate && (e = e.find(f.delegate)), e = e.eq(g)), b._openClick({
                    mfpEl: e
                }, d, f)
            } else b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
        else c = a.extend(!0, {}, c), u ? d.data("magnificPopup", c) : d[0].magnificPopup = c, b.addGroup(d, c);
        return d
    };
    var C, D, E, F = "inline",
        G = function() {
            E && (D.after(E.addClass(C)).detach(), E = null)
        };
    a.magnificPopup.registerModule(F, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                b.types.push(F), w(h + "." + F, function() {
                    G()
                })
            },
            getInline: function(c, d) {
                if (G(), c.src) {
                    var e = b.st.inline,
                        f = a(c.src);
                    if (f.length) {
                        var g = f[0].parentNode;
                        g && g.tagName && (D || (C = e.hiddenClass, D = x(C), C = "mfp-" + C), E = f.after(D).detach().removeClass(C)), b.updateStatus("ready")
                    } else b.updateStatus("error", e.tNotFound), f = a("<div>");
                    return c.inlineElement = f, f
                }
                return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d
            }
        }
    });
    var H, I = "ajax",
        J = function() {
            H && a(document.body).removeClass(H)
        },
        K = function() {
            J(), b.req && b.req.abort()
        };
    a.magnificPopup.registerModule(I, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                b.types.push(I), H = b.st.ajax.cursor, w(h + "." + I, K), w("BeforeChange." + I, K)
            },
            getAjax: function(c) {
                H && a(document.body).addClass(H), b.updateStatus("loading");
                var d = a.extend({
                    url: c.src,
                    success: function(d, e, f) {
                        var g = {
                            data: d,
                            xhr: f
                        };
                        y("ParseAjax", g), b.appendContent(a(g.data), I), c.finished = !0, J(), b._setFocus(), setTimeout(function() {
                            b.wrap.addClass(q)
                        }, 16), b.updateStatus("ready"), y("AjaxContentAdded")
                    },
                    error: function() {
                        J(), c.finished = c.loadError = !0, b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src))
                    }
                }, b.st.ajax.settings);
                return b.req = a.ajax(d), ""
            }
        }
    });
    var L, M = function(c) {
        if (c.data && void 0 !== c.data.title) return c.data.title;
        var d = b.st.image.titleSrc;
        if (d) {
            if (a.isFunction(d)) return d.call(b, c);
            if (c.el) return c.el.attr(d) || ""
        }
        return ""
    };
    a.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var c = b.st.image,
                    d = ".image";
                b.types.push("image"), w(m + d, function() {
                    "image" === b.currItem.type && c.cursor && a(document.body).addClass(c.cursor)
                }), w(h + d, function() {
                    c.cursor && a(document.body).removeClass(c.cursor), v.off("resize" + p)
                }), w("Resize" + d, b.resizeImage), b.isLowIE && w("AfterChange", b.resizeImage)
            },
            resizeImage: function() {
                var a = b.currItem;
                if (a && a.img && b.st.image.verticalFit) {
                    var c = 0;
                    b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", b.wH - c)
                }
            },
            _onImageHasSize: function(a) {
                a.img && (a.hasSize = !0, L && clearInterval(L), a.isCheckingImgSize = !1, y("ImageHasSize", a), a.imgHidden && (b.content && b.content.removeClass("mfp-loading"), a.imgHidden = !1))
            },
            findImageSize: function(a) {
                var c = 0,
                    d = a.img[0],
                    e = function(f) {
                        L && clearInterval(L), L = setInterval(function() {
                            return d.naturalWidth > 0 ? void b._onImageHasSize(a) : (c > 200 && clearInterval(L), c++, void(3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500)))
                        }, f)
                    };
                e(1)
            },
            getImage: function(c, d) {
                var e = 0,
                    f = function() {
                        c && (c.img[0].complete ? (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("ready")), c.hasSize = !0, c.loaded = !0, y("ImageLoadComplete")) : (e++, 200 > e ? setTimeout(f, 100) : g()))
                    },
                    g = function() {
                        c && (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))), c.hasSize = !0, c.loaded = !0, c.loadError = !0)
                    },
                    h = b.st.image,
                    i = d.find(".mfp-img");
                if (i.length) {
                    var j = document.createElement("img");
                    j.className = "mfp-img", c.el && c.el.find("img").length && (j.alt = c.el.find("img").attr("alt")), c.img = a(j).on("load.mfploader", f).on("error.mfploader", g), j.src = c.src, i.is("img") && (c.img = c.img.clone()), j = c.img[0], j.naturalWidth > 0 ? c.hasSize = !0 : j.width || (c.hasSize = !1)
                }
                return b._parseMarkup(d, {
                    title: M(c),
                    img_replaceWith: c.img
                }, c), b.resizeImage(), c.hasSize ? (L && clearInterval(L), c.loadError ? (d.addClass("mfp-loading"), b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"), b.updateStatus("ready")), d) : (b.updateStatus("loading"), c.loading = !0, c.hasSize || (c.imgHidden = !0, d.addClass("mfp-loading"), b.findImageSize(c)), d)
            }
        }
    });
    var N, O = function() {
        return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform), N
    };
    a.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(a) {
                return a.is("img") ? a : a.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var a, c = b.st.zoom,
                    d = ".zoom";
                if (c.enabled && b.supportsTransition) {
                    var e, f, g = c.duration,
                        j = function(a) {
                            var b = a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                d = "all " + c.duration / 1e3 + "s " + c.easing,
                                e = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                f = "transition";
                            return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, b.css(e), b
                        },
                        k = function() {
                            b.content.css("visibility", "visible")
                        };
                    w("BuildControls" + d, function() {
                        if (b._allowZoom()) {
                            if (clearTimeout(e), b.content.css("visibility", "hidden"), a = b._getItemToZoom(), !a) return void k();
                            f = j(a), f.css(b._getOffset()), b.wrap.append(f), e = setTimeout(function() {
                                f.css(b._getOffset(!0)), e = setTimeout(function() {
                                    k(), setTimeout(function() {
                                        f.remove(), a = f = null, y("ZoomAnimationEnded")
                                    }, 16)
                                }, g)
                            }, 16)
                        }
                    }), w(i + d, function() {
                        if (b._allowZoom()) {
                            if (clearTimeout(e), b.st.removalDelay = g, !a) {
                                if (a = b._getItemToZoom(), !a) return;
                                f = j(a)
                            }
                            f.css(b._getOffset(!0)), b.wrap.append(f), b.content.css("visibility", "hidden"), setTimeout(function() {
                                f.css(b._getOffset())
                            }, 16)
                        }
                    }), w(h + d, function() {
                        b._allowZoom() && (k(), f && f.remove(), a = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === b.currItem.type
            },
            _getItemToZoom: function() {
                return b.currItem.hasSize ? b.currItem.img : !1
            },
            _getOffset: function(c) {
                var d;
                d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
                var e = d.offset(),
                    f = parseInt(d.css("padding-top"), 10),
                    g = parseInt(d.css("padding-bottom"), 10);
                e.top -= a(window).scrollTop() - f;
                var h = {
                    width: d.width(),
                    height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f
                };
                return O() ? h["-moz-transform"] = h.transform = "translate(" + e.left + "px," + e.top + "px)" : (h.left = e.left, h.top = e.top), h
            }
        }
    });
    var P = "iframe",
        Q = "//about:blank",
        R = function(a) {
            if (b.currTemplate[P]) {
                var c = b.currTemplate[P].find("iframe");
                c.length && (a || (c[0].src = Q), b.isIE8 && c.css("display", a ? "block" : "none"))
            }
        };
    a.magnificPopup.registerModule(P, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                b.types.push(P), w("BeforeChange", function(a, b, c) {
                    b !== c && (b === P ? R() : c === P && R(!0))
                }), w(h + "." + P, function() {
                    R()
                })
            },
            getIframe: function(c, d) {
                var e = c.src,
                    f = b.st.iframe;
                a.each(f.patterns, function() {
                    return e.indexOf(this.index) > -1 ? (this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)), e = this.src.replace("%id%", e), !1) : void 0
                });
                var g = {};
                return f.srcAction && (g[f.srcAction] = e), b._parseMarkup(d, g, c), b.updateStatus("ready"), d
            }
        }
    });
    var S = function(a) {
            var c = b.items.length;
            return a > c - 1 ? a - c : 0 > a ? c + a : a
        },
        T = function(a, b, c) {
            return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c)
        };
    a.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var c = b.st.gallery,
                    e = ".mfp-gallery";
                return b.direction = !0, c && c.enabled ? (f += " mfp-gallery", w(m + e, function() {
                    c.navigateByImgClick && b.wrap.on("click" + e, ".mfp-img", function() {
                        return b.items.length > 1 ? (b.next(), !1) : void 0
                    }), d.on("keydown" + e, function(a) {
                        37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next()
                    })
                }), w("UpdateStatus" + e, function(a, c) {
                    c.text && (c.text = T(c.text, b.currItem.index, b.items.length))
                }), w(l + e, function(a, d, e, f) {
                    var g = b.items.length;
                    e.counter = g > 1 ? T(c.tCounter, f.index, g) : ""
                }), w("BuildControls" + e, function() {
                    if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                        var d = c.arrowMarkup,
                            e = b.arrowLeft = a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(s),
                            f = b.arrowRight = a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(s);
                        e.click(function() {
                            b.prev()
                        }), f.click(function() {
                            b.next()
                        }), b.container.append(e.add(f))
                    }
                }), w(n + e, function() {
                    b._preloadTimeout && clearTimeout(b._preloadTimeout), b._preloadTimeout = setTimeout(function() {
                        b.preloadNearbyImages(), b._preloadTimeout = null
                    }, 16)
                }), void w(h + e, function() {
                    d.off(e), b.wrap.off("click" + e), b.arrowRight = b.arrowLeft = null
                })) : !1
            },
            next: function() {
                b.direction = !0, b.index = S(b.index + 1), b.updateItemHTML()
            },
            prev: function() {
                b.direction = !1, b.index = S(b.index - 1), b.updateItemHTML()
            },
            goTo: function(a) {
                b.direction = a >= b.index, b.index = a, b.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var a, c = b.st.gallery.preload,
                    d = Math.min(c[0], b.items.length),
                    e = Math.min(c[1], b.items.length);
                for (a = 1; a <= (b.direction ? e : d); a++) b._preloadItem(b.index + a);
                for (a = 1; a <= (b.direction ? d : e); a++) b._preloadItem(b.index - a)
            },
            _preloadItem: function(c) {
                if (c = S(c), !b.items[c].preloaded) {
                    var d = b.items[c];
                    d.parsed || (d = b.parseEl(c)), y("LazyLoad", d), "image" === d.type && (d.img = a('<img class="mfp-img" />').on("load.mfploader", function() {
                        d.hasSize = !0
                    }).on("error.mfploader", function() {
                        d.hasSize = !0, d.loadError = !0, y("LazyLoadError", d)
                    }).attr("src", d.src)), d.preloaded = !0
                }
            }
        }
    });
    var U = "retina";
    a.magnificPopup.registerModule(U, {
        options: {
            replaceSrc: function(a) {
                return a.src.replace(/\.\w+$/, function(a) {
                    return "@2x" + a
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var a = b.st.retina,
                        c = a.ratio;
                    c = isNaN(c) ? c() : c, c > 1 && (w("ImageHasSize." + U, function(a, b) {
                        b.img.css({
                            "max-width": b.img[0].naturalWidth / c,
                            width: "100%"
                        })
                    }), w("ElementParse." + U, function(b, d) {
                        d.src = a.replaceSrc(d, c)
                    }))
                }
            }
        }
    }), A()
});