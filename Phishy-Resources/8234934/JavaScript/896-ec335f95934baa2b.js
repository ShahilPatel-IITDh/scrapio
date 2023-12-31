"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [896], {
        87369: function(e, r, t) {
            t.d(r, {
                d: function() {
                    return l
                }
            });
            var n = t(62097),
                o = t(61225),
                i = t(30120),
                s = t(29630),
                a = t(91655),
                c = t(85893),
                l = function(e) {
                    var r = e.icon,
                        t = e.title,
                        l = e.titleIcon,
                        d = e.children,
                        p = e.hideIcon,
                        u = e.variant,
                        x = void 0 === u ? "dark" : u,
                        f = e.withLine,
                        h = e.loading,
                        b = e.withoutIconWrapper,
                        m = (0, n.Z)(),
                        j = (0, o.Z)(m.breakpoints.up("sm"));
                    return (0, c.jsxs)(i.Z, {
                        sx: {
                            display: "flex",
                            alignItems: "center",
                            width: {
                                xs: "calc(50% - 12px)",
                                xsm: "unset"
                            }
                        },
                        children: [f && (0, c.jsx)(i.Z, {
                            sx: {
                                mr: 8,
                                my: "auto",
                                width: "1px",
                                bgcolor: "#F2F3F729",
                                height: "37px"
                            }
                        }), !p && (b ? r && r : (0, c.jsx)(i.Z, {
                            sx: {
                                display: {
                                    xs: "none",
                                    md: "flex"
                                },
                                alignItems: "center",
                                justifyContent: "center",
                                border: "1px solid #EBEBED1F",
                                borderRadius: "12px",
                                bgcolor: "#383D51",
                                boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25)",
                                width: 42,
                                height: 42,
                                mr: 3
                            },
                            children: r && r
                        })), (0, c.jsxs)(i.Z, {
                            sx: {
                                display: "flex",
                                flexDirection: "column"
                            },
                            children: [(0, c.jsxs)(i.Z, {
                                sx: {
                                    display: "inline-flex",
                                    alignItems: "center"
                                },
                                children: [(0, c.jsx)(s.Z, {
                                    sx: {
                                        color: "dark" === x ? "#A5A8B6" : "#62677B"
                                    },
                                    variant: j ? "description" : "caption",
                                    component: "div",
                                    children: t
                                }), l && l]
                            }), h ? (0, c.jsx)(a.Z, {
                                height: j ? 28 : 24,
                                sx: {
                                    background: "#383D51"
                                }
                            }) : d]
                        })]
                    })
                }
        },
        41036: function(e, r, t) {
            t.d(r, {
                G: function() {
                    return s
                }
            });
            var n = t(49501),
                o = t(68861),
                i = t(85893),
                s = function() {
                    return (0, i.jsx)(n.cC, {
                        id: "This asset is planned to be offboarded due to an Aave Protocol Governance decision. <0>More details</0>",
                        components: {
                            0: (0, i.jsx)(o.rU, {
                                href: "https://governance.aave.com/t/arfc-busd-offboarding-plan/12170",
                                sx: {
                                    textDecoration: "underline"
                                }
                            })
                        }
                    })
                }
        },
        25002: function(e, r, t) {
            t.d(r, {
                l: function() {
                    return a
                }
            });
            var n = t(49501),
                o = t(25169),
                i = t(68861),
                s = t(85893),
                a = function(e) {
                    var r = e.symbol,
                        t = e.currentMarket;
                    return (0, s.jsx)(n.cC, {
                        id: "Borrowing is disabled due to an Aave community decision. <0>More details</0>",
                        components: {
                            0: (0, s.jsx)(i.rU, {
                                href: (0, o.E)(r, t),
                                sx: {
                                    textDecoration: "underline"
                                }
                            })
                        }
                    })
                }
        },
        52906: function(e, r, t) {
            t.d(r, {
                J: function() {
                    return c
                }
            });
            var n = t(30120),
                o = t(41024),
                i = t(14463),
                s = t(12349),
                a = t(85893),
                c = function(e) {
                    var r = e.symbol,
                        t = e.value,
                        c = e.incentives,
                        l = e.variant,
                        d = void 0 === l ? "secondary14" : l,
                        p = e.symbolsVariant,
                        u = e.align,
                        x = e.color;
                    return (0, a.jsxs)(n.Z, {
                        sx: {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: u || {
                                xs: "flex-end",
                                xsm: "center"
                            },
                            justifyContent: "center",
                            textAlign: "center"
                        },
                        children: ["-1" !== t.toString() ? (0, a.jsx)(o.B, {
                            value: t,
                            percent: !0,
                            variant: d,
                            symbolsVariant: p,
                            color: x,
                            symbolsColor: x
                        }) : (0, a.jsx)(i.J, {
                            variant: d,
                            color: x || "text.secondary"
                        }), (0, a.jsx)(s.M, {
                            incentives: c,
                            symbol: r
                        })]
                    })
                }
        },
        35161: function(e, r, t) {
            t.d(r, {
                $: function() {
                    return l
                }
            });
            var n = t(58771),
                o = t(30120),
                i = t(81645),
                s = t(97563),
                a = t(84734),
                c = t(85893),
                l = function() {
                    return (0, c.jsx)(s.a, {
                        tooltipContent: (0, c.jsx)(o.Z, {
                            children: (0, c.jsx)(a.v, {})
                        }),
                        children: (0, c.jsx)(i.Z, {
                            sx: {
                                fontSize: "20px",
                                color: "warning.main",
                                ml: 2
                            },
                            children: (0, c.jsx)(n.Z, {})
                        })
                    })
                }
        },
        39900: function(e, r, t) {
            t.d(r, {
                t: function() {
                    return l
                }
            });
            var n = t(58771),
                o = t(30120),
                i = t(81645),
                s = t(97563),
                a = t(41036),
                c = t(85893),
                l = function() {
                    return (0, c.jsx)(s.a, {
                        tooltipContent: (0, c.jsx)(o.Z, {
                            children: (0, c.jsx)(a.G, {})
                        }),
                        children: (0, c.jsx)(i.Z, {
                            sx: {
                                fontSize: "20px",
                                color: "error.main",
                                ml: 2
                            },
                            children: (0, c.jsx)(n.Z, {})
                        })
                    })
                }
        },
        69507: function(e, r, t) {
            t.d(r, {
                w: function() {
                    return l
                }
            });
            var n = t(58771),
                o = t(30120),
                i = t(81645),
                s = t(97563),
                a = t(25002),
                c = t(85893),
                l = function(e) {
                    var r = e.symbol,
                        t = e.currentMarket;
                    return (0, c.jsx)(s.a, {
                        tooltipContent: (0, c.jsx)(o.Z, {
                            children: (0, c.jsx)(a.l, {
                                symbol: r,
                                currentMarket: t
                            })
                        }),
                        children: (0, c.jsx)(i.Z, {
                            sx: {
                                fontSize: "20px",
                                color: "error.main",
                                ml: 2
                            },
                            children: (0, c.jsx)(n.Z, {})
                        })
                    })
                }
        },
        25169: function(e, r, t) {
            t.d(r, {
                E: function() {
                    return p
                },
                Q: function() {
                    return u
                }
            });
            var n = t(49501),
                o = t(58771),
                i = t(30120),
                s = t(81645),
                a = t(31520),
                c = t(97563),
                l = t(68861),
                d = t(85893),
                p = function(e, r) {
                    return r && "proto_harmony_v3" === r ? "https://snapshot.org/#/aave.eth/proposal/0x81a78109941e5e0ac6cb5ebf82597c839c20ad6821a8c3ff063dba39032533d4" : r && "proto_fantom_v3" === r ? "https://snapshot.org/#/aave.eth/proposal/0xeefcd76e523391a14cfd0a79b531ea0a3faf0eb4a058e255fac13a2d224cc647" : e && a.$e[e.toUpperCase() + r] ? a.$e[e.toUpperCase() + r] : "https://app.aave.com/governance"
                },
                u = function(e) {
                    var r = e.symbol,
                        t = e.currentMarket;
                    return (0, d.jsx)(c.a, {
                        tooltipContent: (0, d.jsx)(i.Z, {
                            children: (0, d.jsx)(n.cC, {
                                id: "This asset is frozen due to an Aave Protocol Governance decision. <0>More details</0>",
                                components: {
                                    0: (0, d.jsx)(l.rU, {
                                        href: p(r, t),
                                        sx: {
                                            textDecoration: "underline"
                                        }
                                    })
                                }
                            })
                        }),
                        children: (0, d.jsx)(s.Z, {
                            sx: {
                                fontSize: "20px",
                                color: "error.main",
                                ml: 2
                            },
                            children: (0, d.jsx)(o.Z, {})
                        })
                    })
                }
        },
        42115: function(e, r, t) {
            t.d(r, {
                F: function() {
                    return d
                }
            });
            var n = t(49501),
                o = t(58771),
                i = t(30120),
                s = t(81645),
                a = t(97563),
                c = t(68861),
                l = t(85893),
                d = function() {
                    return (0, l.jsx)(a.a, {
                        tooltipContent: (0, l.jsx)(i.Z, {
                            children: (0, l.jsx)(n.cC, {
                                id: "This asset is frozen due to an Aave Protocol Governance decision. On the 20th of December 2022, renFIL will no longer be supported and cannot be bridged back to its native network. It is recommended to withdraw supply positions and repay borrow positions so that renFIL can be bridged back to FIL before the deadline. After this date, it will no longer be possible to convert renFIL to FIL. <0>More details</0>",
                                components: {
                                    0: (0, l.jsx)(c.rU, {
                                        href: "https://medium.com/renproject/moving-on-from-alameda-da62a823ce93",
                                        sx: {
                                            textDecoration: "underline"
                                        }
                                    })
                                }
                            })
                        }),
                        children: (0, l.jsx)(s.Z, {
                            sx: {
                                fontSize: "20px",
                                color: "error.main",
                                ml: 2
                            },
                            children: (0, l.jsx)(o.Z, {})
                        })
                    })
                }
        },
        83793: function(e, r, t) {
            t.d(r, {
                n: function() {
                    return a
                }
            });
            var n = t(58771),
                o = t(58527),
                i = t(1252),
                s = t(85893),
                a = function() {
                    return (0, s.jsx)(o.G, {
                        wrapperProps: {
                            ml: 2
                        },
                        color: "warning.main",
                        iconSize: 20,
                        icon: (0, s.jsx)(n.Z, {}),
                        children: (0, s.jsx)(i.O, {})
                    })
                }
        },
        7775: function(e, r, t) {
            t.d(r, {
                s: function() {
                    return d
                }
            });
            var n = t(59499),
                o = t(36864),
                i = t(49501),
                s = t(58527),
                a = t(85893);

            function c(e, r) {
                var t = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    r && (n = n.filter((function(r) {
                        return Object.getOwnPropertyDescriptor(e, r).enumerable
                    }))), t.push.apply(t, n)
                }
                return t
            }

            function l(e) {
                for (var r = 1; r < arguments.length; r++) {
                    var t = null != arguments[r] ? arguments[r] : {};
                    r % 2 ? c(Object(t), !0).forEach((function(r) {
                        (0, n.Z)(e, r, t[r])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : c(Object(t)).forEach((function(r) {
                        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r))
                    }))
                }
                return e
            }
            var d = function(e) {
                var r = (0, o.Z)({}, e);
                return (0, a.jsx)(s.G, l(l({}, r), {}, {
                    children: (0, a.jsx)(i.cC, {
                        id: "Stable interest rate will <0>stay the same</0> for the duration of your loan. Recommended for long-term loan periods and for users who prefer predictability.",
                        components: {
                            0: (0, a.jsx)("b", {})
                        }
                    })
                }))
            }
        },
        14379: function(e, r, t) {
            t.d(r, {
                B: function() {
                    return d
                }
            });
            var n = t(59499),
                o = t(36864),
                i = t(49501),
                s = t(58527),
                a = t(85893);

            function c(e, r) {
                var t = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    r && (n = n.filter((function(r) {
                        return Object.getOwnPropertyDescriptor(e, r).enumerable
                    }))), t.push.apply(t, n)
                }
                return t
            }

            function l(e) {
                for (var r = 1; r < arguments.length; r++) {
                    var t = null != arguments[r] ? arguments[r] : {};
                    r % 2 ? c(Object(t), !0).forEach((function(r) {
                        (0, n.Z)(e, r, t[r])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : c(Object(t)).forEach((function(r) {
                        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r))
                    }))
                }
                return e
            }
            var d = function(e) {
                var r = (0, o.Z)({}, e);
                return (0, a.jsx)(s.G, l(l({}, r), {}, {
                    children: (0, a.jsx)(i.cC, {
                        id: "Variable interest rate will <0>fluctuate</0> based on the market conditions. Recommended for short-term positions.",
                        components: {
                            0: (0, a.jsx)("b", {})
                        }
                    })
                }))
            }
        },
        99435: function(e, r, t) {
            t.d(r, {
                M: function() {
                    return c
                }
            });
            var n = t(29630),
                o = t(30120),
                i = t(80570),
                s = t(57609),
                a = t(85893),
                c = function(e) {
                    var r = e.sortName,
                        t = e.sortDesc,
                        c = e.sortKey,
                        l = e.source,
                        d = e.setSortName,
                        p = e.setSortDesc,
                        u = e.onClick,
                        x = e.children,
                        f = (0, i.Yh)((function(e) {
                            return e.trackEvent
                        }));
                    return (0, a.jsxs)(n.Z, {
                        component: "div",
                        variant: "subheader2",
                        color: "text.secondary",
                        noWrap: !0,
                        onClick: function() {
                            return u ? u() : !!c && (e = c, f(s.uZ.SORT, {
                                sort_by: e,
                                tile: l
                            }), p && p(!1), d && d(e), void(r === e && p && p(!t)));
                            var e
                        },
                        sx: {
                            cursor: u || c ? "pointer" : "default",
                            display: "inline-flex",
                            alignItems: "center"
                        },
                        children: [x, !!c && (0, a.jsxs)(o.Z, {
                            sx: {
                                display: "inline-flex",
                                flexDirection: "column",
                                ml: 1
                            },
                            children: [(0, a.jsx)(o.Z, {
                                component: "span",
                                sx: function(e) {
                                    return {
                                        width: 0,
                                        height: 0,
                                        borderStyle: "solid",
                                        borderWidth: "0 4px 4px 4px",
                                        borderColor: "transparent transparent ".concat(r === c && t ? e.palette.text.secondary : e.palette.divider, " transparent"),
                                        mb: .5
                                    }
                                }
                            }), (0, a.jsx)(o.Z, {
                                component: "span",
                                sx: function(e) {
                                    return {
                                        width: 0,
                                        height: 0,
                                        borderStyle: "solid",
                                        borderWidth: "4px 4px 0 4px",
                                        borderColor: "".concat(r !== c || t ? e.palette.divider : e.palette.text.secondary, " transparent transparent transparent")
                                    }
                                }
                            })]
                        })]
                    })
                }
        },
        1475: function(e, r, t) {
            t.d(r, {
                u: function() {
                    return d
                }
            });
            var n = t(59499),
                o = t(4730),
                i = t(30120),
                s = t(85893),
                a = ["px", "children"];

            function c(e, r) {
                var t = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    r && (n = n.filter((function(r) {
                        return Object.getOwnPropertyDescriptor(e, r).enumerable
                    }))), t.push.apply(t, n)
                }
                return t
            }

            function l(e) {
                for (var r = 1; r < arguments.length; r++) {
                    var t = null != arguments[r] ? arguments[r] : {};
                    r % 2 ? c(Object(t), !0).forEach((function(r) {
                        (0, n.Z)(e, r, t[r])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : c(Object(t)).forEach((function(r) {
                        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r))
                    }))
                }
                return e
            }
            var d = function(e) {
                var r = e.px,
                    t = void 0 === r ? 4 : r,
                    n = e.children,
                    c = (0, o.Z)(e, a);
                return (0, s.jsx)(i.Z, l(l({}, c), {}, {
                    sx: l({
                        display: "flex",
                        alignItems: "flex-end",
                        px: t,
                        pt: 4,
                        pb: 1,
                        position: "sticky",
                        top: 0,
                        zIndex: 100,
                        bgcolor: "background.paper",
                        borderBottom: "1px solid",
                        borderColor: "divider"
                    }, c.sx),
                    children: n
                }))
            }
        },
        14463: function(e, r, t) {
            t.d(r, {
                J: function() {
                    return c
                }
            });
            var n = t(59499),
                o = t(29630),
                i = (t(67294), t(85893));

            function s(e, r) {
                var t = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    r && (n = n.filter((function(r) {
                        return Object.getOwnPropertyDescriptor(e, r).enumerable
                    }))), t.push.apply(t, n)
                }
                return t
            }

            function a(e) {
                for (var r = 1; r < arguments.length; r++) {
                    var t = null != arguments[r] ? arguments[r] : {};
                    r % 2 ? s(Object(t), !0).forEach((function(r) {
                        (0, n.Z)(e, r, t[r])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : s(Object(t)).forEach((function(r) {
                        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r))
                    }))
                }
                return e
            }
            var c = function(e) {
                return (0, i.jsx)(o.Z, a(a({}, e), {}, {
                    children: "\u2014"
                }))
            }
        },
        14795: function(e, r, t) {
            t.d(r, {
                C: function() {
                    return d
                }
            });
            var n = t(49501),
                o = t(29630),
                i = t(68346),
                s = t(19952),
                a = t(85893),
                c = function(e) {
                    var r = e.market;
                    return "Harmony" === r ? (0, a.jsx)(n.cC, {
                        id: "Due to the Horizon bridge exploit, certain assets on the Harmony network are not at parity with Ethereum, which affects the Aave V3 Harmony market."
                    }) : "Fantom" === r ? (0, a.jsx)(n.cC, {
                        id: "Per the community, the Fantom market has been frozen."
                    }) : "Ethereum AMM" === r ? (0, a.jsx)(n.cC, {
                        id: "Per the community, the V2 AMM market has been deprecated."
                    }) : null
                },
                l = function(e, r) {
                    return "Harmony" === e ? r ? "https://governance.aave.com/t/harmony-horizon-bridge-exploit-consequences-to-aave-v3-harmony/8614" : "https://snapshot.org/#/aave.eth/proposal/0x81a78109941e5e0ac6cb5ebf82597c839c20ad6821a8c3ff063dba39032533d4" : "Fantom" === e ? r ? "https://governance.aave.com/t/arc-aave-v3-fantom-freeze-reserves/9166" : "https://snapshot.org/#/aave.eth/proposal/0xeefcd76e523391a14cfd0a79b531ea0a3faf0eb4a058e255fac13a2d224cc647" : "Ethereum AMM" === e ? "https://app.aave.com/governance/proposal/?proposalId=239" : ""
                },
                d = function(e) {
                    var r = e.marketName,
                        t = e.forum;
                    return (0, a.jsx)(s.v, {
                        severity: "error",
                        children: (0, a.jsxs)(o.Z, {
                            variant: "caption",
                            children: [(0, a.jsx)(c, {
                                market: r
                            }), " ", (0, a.jsx)(i.Z, {
                                href: l(r, t),
                                target: "_blank",
                                children: t ? (0, a.jsx)(n.cC, {
                                    id: "Join the community discussion"
                                }) : (0, a.jsx)(n.cC, {
                                    id: "Learn more"
                                })
                            })]
                        })
                    })
                }
        },
        15880: function(e, r, t) {
            t.d(r, {
                o: function() {
                    return j
                }
            });
            var n = t(69507),
                o = t(39900),
                i = t(83793),
                s = t(35161),
                a = t(25169),
                c = t(42115),
                l = t(30120),
                d = t(44373),
                p = t(91655),
                u = t(29630),
                x = t(43629),
                f = t(68861),
                h = t(19480),
                b = t(85893),
                m = function(e) {
                    var r = e.children,
                        t = e.warningComponent,
                        n = e.symbol,
                        o = e.iconSymbol,
                        i = e.name,
                        s = e.underlyingAsset,
                        a = e.loading,
                        c = e.currentMarket,
                        m = e.showSupplyCapTooltips,
                        j = void 0 !== m && m,
                        v = e.showBorrowCapTooltips,
                        y = void 0 !== v && v,
                        g = e.showDebtCeilingTooltips,
                        w = void 0 !== g && g,
                        O = (0, x.ov)(),
                        Z = O.supplyCap,
                        C = O.borrowCap,
                        P = O.debtCeiling;
                    return (0, b.jsxs)(l.Z, {
                        children: [(0, b.jsx)(d.Z, {}), (0, b.jsxs)(l.Z, {
                            sx: {
                                px: 4,
                                pt: 4,
                                pb: 6
                            },
                            children: [(0, b.jsxs)(l.Z, {
                                sx: {
                                    mb: 4,
                                    display: "flex",
                                    alignItems: "center"
                                },
                                children: [a ? (0, b.jsxs)(l.Z, {
                                    sx: {
                                        display: "inline-flex",
                                        alignItems: "center"
                                    },
                                    children: [(0, b.jsx)(p.Z, {
                                        variant: "circular",
                                        width: 40,
                                        height: 40
                                    }), (0, b.jsx)(l.Z, {
                                        sx: {
                                            ml: 2
                                        },
                                        children: (0, b.jsx)(p.Z, {
                                            width: 100,
                                            height: 24
                                        })
                                    })]
                                }) : n && s && i && c && o && (0, b.jsxs)(f.rU, {
                                    href: f.Z6.reserveOverview(s, c),
                                    sx: {
                                        display: "inline-flex",
                                        alignItems: "center"
                                    },
                                    children: [(0, b.jsx)(h.T1, {
                                        symbol: o,
                                        sx: {
                                            fontSize: "40px"
                                        }
                                    }), (0, b.jsxs)(l.Z, {
                                        sx: {
                                            ml: 2
                                        },
                                        children: [(0, b.jsx)(u.Z, {
                                            variant: "h4",
                                            children: i
                                        }), (0, b.jsx)(u.Z, {
                                            variant: "subheader2",
                                            color: "text.muted",
                                            children: n
                                        })]
                                    }), j && Z.displayMaxedTooltip({
                                        supplyCap: Z
                                    }), y && C.displayMaxedTooltip({
                                        borrowCap: C
                                    }), w && P.displayMaxedTooltip({
                                        debtCeiling: P
                                    })]
                                }), t]
                            }), r]
                        })]
                    })
                },
                j = function(e) {
                    var r = e.symbol,
                        t = e.iconSymbol,
                        l = e.name,
                        d = e.children,
                        p = e.underlyingAsset,
                        u = e.loading,
                        x = e.currentMarket,
                        f = e.frozen,
                        h = e.borrowEnabled,
                        j = void 0 === h || h,
                        v = e.showSupplyCapTooltips,
                        y = void 0 !== v && v,
                        g = e.showBorrowCapTooltips,
                        w = void 0 !== g && g,
                        O = e.showDebtCeilingTooltips,
                        Z = void 0 !== O && O,
                        C = function() {
                            var e = f && "renFIL" !== r,
                                t = f && "renFIL" === r,
                                l = !f && "AMPL" === r,
                                d = "stETH" == r,
                                p = "BUSD" == r,
                                u = !f && !j;
                            return (0, b.jsxs)(b.Fragment, {
                                children: [e && (0, b.jsx)(a.Q, {
                                    symbol: r,
                                    currentMarket: x
                                }), t && (0, b.jsx)(c.F, {}), l && (0, b.jsx)(s.$, {}), d && (0, b.jsx)(i.n, {}), p && (0, b.jsx)(o.t, {}), u && r && x && (0, b.jsx)(n.w, {
                                    symbol: r,
                                    currentMarket: x
                                })]
                            })
                        };
                    return (0, b.jsx)(m, {
                        symbol: r,
                        iconSymbol: t,
                        name: l,
                        underlyingAsset: p,
                        warningComponent: (0, b.jsx)(C, {}),
                        loading: u,
                        currentMarket: x,
                        showSupplyCapTooltips: y,
                        showBorrowCapTooltips: w,
                        showDebtCeilingTooltips: Z,
                        children: d
                    })
                }
        }
    }
]);