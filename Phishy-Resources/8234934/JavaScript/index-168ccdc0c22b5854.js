(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [405], {
        35707: function(e, t, r) {
            "use strict";
            r.r(t), r.d(t, {
                default: function() {
                    return an
                }
            });
            var n = r(49501),
                o = r(30120),
                a = r(29630),
                s = r(67294),
                i = r(34637),
                l = r(59379),
                c = r(90452),
                d = r(80570),
                u = r(45745),
                p = r(15446),
                x = r(95793),
                h = r(77537),
                b = r(75331),
                m = r(62097),
                v = r(61225),
                j = r(59499),
                y = r(80854),
                f = r(1279),
                g = r(82403),
                w = r(7775),
                C = r(14379),
                O = r(45884),
                A = r(99435),
                Z = r(1475),
                P = r(19952),
                k = r(14795),
                S = r(43629),
                D = r(41551),
                B = r(57609),
                E = r(81902),
                T = r(25049),
                N = r(45556),
                I = r(68861),
                M = r(46839),
                R = r(46930),
                U = 110,
                _ = 160,
                L = 110,
                Y = function(e, t, r, n, o) {
                    return e ? V(t, r, n, o || !1) : F(t, r, n, o || !1)
                },
                V = function(e, t, r, n) {
                    return "symbol" === e ? W(!0, t, r) : "usageAsCollateralEnabledOnUser" === e || "debt" === e ? r.sort((function(t, r) {
                        return Number(t[e]) - Number(r[e])
                    })) : (n && r.sort((function(e, t) {
                        return "Variable" === e.borrowRateMode ? Number(t.reserve.variableBorrowAPY) - Number(e.reserve.variableBorrowAPY) : Number(t.reserve.stableBorrowAPY) - Number(e.reserve.stableBorrowAPY)
                    })), r.sort((function(t, r) {
                        return t[e] - r[e]
                    })))
                },
                F = function(e, t, r, n) {
                    return "symbol" === e ? W(!1, t, r) : "usageAsCollateralEnabledOnUser" === e || "debt" === e ? r.sort((function(t, r) {
                        return Number(r[e]) - Number(t[e])
                    })) : (n && r.sort((function(e, t) {
                        return "Variable" === e.borrowRateMode ? Number(e.reserve.variableBorrowAPY) - Number(t.reserve.variableBorrowAPY) : Number(e.reserve.stableBorrowAPY) - Number(t.reserve.stableBorrowAPY)
                    })), r.sort((function(t, r) {
                        return r[e] - t[e]
                    })))
                },
                W = function(e, t, r) {
                    return e ? "position" === t ? r.sort((function(e, t) {
                        return e.reserve.symbol.toUpperCase() < t.reserve.symbol.toUpperCase() ? -1 : 1
                    })) : r.sort((function(e, t) {
                        return e.symbol.toUpperCase() < t.symbol.toUpperCase() ? -1 : 1
                    })) : "position" === t ? r.sort((function(e, t) {
                        return t.reserve.symbol.toUpperCase() < e.reserve.symbol.toUpperCase() ? -1 : 1
                    })) : r.sort((function(e, t) {
                        return t.symbol.toUpperCase() < e.symbol.toUpperCase() ? -1 : 1
                    }))
                },
                H = r(59286),
                z = r(85893),
                K = function(e) {
                    var t = e.children;
                    e.isColumnHeader;
                    return (0, z.jsx)(o.Z, {
                        sx: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            maxWidth: _,
                            minWidth: _,
                            flex: 1,
                            ".MuiButton-root": {
                                ml: "6px"
                            }
                        },
                        children: t
                    })
                },
                q = function(e) {
                    var t = e.head;
                    return (0, z.jsxs)(Z.u, {
                        children: [t.map((function(e, t) {
                            return (0, z.jsx)(O.h, {
                                overFlow: "visible",
                                isRow: 0 === t,
                                children: (0, z.jsx)(A.M, {
                                    children: e
                                })
                            }, t)
                        })), (0, z.jsx)(K, {})]
                    })
                },
                X = r(91655),
                G = r(32383),
                J = function() {
                    return (0, z.jsxs)(G.H, {
                        children: [(0, z.jsx)(O.h, {
                            maxWidth: 160,
                            isRow: !0,
                            children: (0, z.jsxs)(o.Z, {
                                sx: {
                                    display: "inline-flex",
                                    alignItems: "center"
                                },
                                children: [(0, z.jsx)(X.Z, {
                                    variant: "circular",
                                    width: 32,
                                    height: 32
                                }), (0, z.jsx)(X.Z, {
                                    sx: {
                                        ml: 3
                                    },
                                    width: 39,
                                    height: 20
                                })]
                            })
                        }), (0, z.jsx)(O.h, {
                            children: (0, z.jsx)(X.Z, {
                                width: 70,
                                height: 20
                            })
                        }), (0, z.jsx)(O.h, {
                            children: (0, z.jsx)(X.Z, {
                                width: 70,
                                height: 20
                            })
                        }), (0, z.jsx)(O.h, {
                            children: (0, z.jsx)(X.Z, {
                                width: 70,
                                height: 20
                            })
                        }), (0, z.jsxs)(K, {
                            children: [(0, z.jsx)(X.Z, {
                                height: 38,
                                width: 74
                            }), (0, z.jsx)(X.Z, {
                                height: 38,
                                width: 74,
                                sx: {
                                    ml: "6px"
                                }
                            })]
                        })]
                    })
                },
                Q = r(92391),
                $ = r(15880),
                ee = function() {
                    return (0, z.jsxs)($.o, {
                        loading: !0,
                        children: [(0, z.jsx)(Q.X, {
                            caption: (0, z.jsx)(X.Z, {
                                width: 100,
                                height: 20
                            }),
                            align: "flex-start",
                            captionVariant: "description",
                            mb: 2,
                            children: (0, z.jsx)(X.Z, {
                                width: 70,
                                height: 20
                            })
                        }), (0, z.jsx)(Q.X, {
                            caption: (0, z.jsx)(X.Z, {
                                width: 100,
                                height: 20
                            }),
                            align: "flex-start",
                            captionVariant: "description",
                            mb: 2,
                            children: (0, z.jsx)(X.Z, {
                                width: 70,
                                height: 20
                            })
                        }), (0, z.jsx)(Q.X, {
                            caption: (0, z.jsx)(X.Z, {
                                width: 100,
                                height: 20
                            }),
                            align: "flex-start",
                            captionVariant: "description",
                            mb: 2,
                            children: (0, z.jsx)(X.Z, {
                                width: 70,
                                height: 20
                            })
                        }), (0, z.jsxs)(o.Z, {
                            sx: {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                mt: 5
                            },
                            children: [(0, z.jsx)(X.Z, {
                                width: "100%",
                                height: 36,
                                sx: {
                                    mr: 1.5
                                }
                            }), (0, z.jsx)(X.Z, {
                                width: "100%",
                                height: 36
                            })]
                        })]
                    })
                },
                te = function(e) {
                    var t = e.title,
                        r = e.withTopMargin,
                        n = e.head,
                        o = (0, m.Z)(),
                        s = (0, v.Z)(o.breakpoints.down("xsm"));
                    return (0, z.jsx)(N.l, {
                        titleComponent: (0, z.jsx)(a.Z, {
                            component: "div",
                            variant: "h3",
                            sx: {
                                mr: 4
                            },
                            children: t
                        }),
                        withTopMargin: r,
                        children: (0, z.jsxs)(z.Fragment, {
                            children: [!s && (0, z.jsx)(q, {
                                head: n
                            }), s ? (0, z.jsx)(ee, {}) : (0, z.jsxs)(z.Fragment, {
                                children: [(0, z.jsx)(J, {}), (0, z.jsx)(J, {})]
                            })]
                        })
                    })
                },
                re = r(75084),
                ne = r(8195),
                oe = r(41024),
                ae = r(58771),
                se = r(81645),
                ie = r(97563),
                le = function(e) {
                    var t = e.availableValue,
                        r = e.isUSD,
                        o = e.capType,
                        a = r ? "".concat(t, "$") : t,
                        s = void 0;
                    return t > 0 ? s = o === E.R.supplyCap ? (0, z.jsx)(n.cC, {
                        id: "This asset has almost reached its supply cap. There can only be {messageValue} supplied to this market.",
                        values: {
                            messageValue: a
                        }
                    }) : (0, z.jsx)(n.cC, {
                        id: "This asset has almost reached its borrow cap. There is only {messageValue} available to be borrowed from this market.",
                        values: {
                            messageValue: a
                        }
                    }) : t <= 0 && (s = o === E.R.supplyCap ? (0, z.jsx)(n.cC, {
                        id: "This asset has reached its supply cap. Nothing is available to be supplied from this market."
                    }) : (0, z.jsx)(n.cC, {
                        id: "This asset has reached its borrow cap. Nothing is available to be borrowed from this market."
                    })), (0, z.jsx)(ie.a, {
                        tooltipContent: (0, z.jsx)(z.Fragment, {
                            children: s || ""
                        }),
                        children: (0, z.jsx)(se.Z, {
                            sx: {
                                fontSize: "14px",
                                color: "error.main"
                            },
                            children: (0, z.jsx)(ae.Z, {})
                        })
                    })
                },
                ce = function(e) {
                    var t = e.capType,
                        r = e.capAmount,
                        s = e.totalAmount,
                        i = e.isUSD,
                        l = e.withoutText,
                        c = Number(r);
                    if (c <= 0) return null;
                    var d = (0, f.hE)(s).dividedBy(c).toNumber(),
                        u = (0, f.hE)(c).minus(s).multipliedBy("0.995").toNumber(),
                        p = t === E.R.supplyCap ? (0, z.jsx)(n.cC, {
                            id: "Available to supply"
                        }) : (0, z.jsx)(n.cC, {
                            id: "Available to borrow"
                        });
                    return d < .99 ? null : (0, z.jsxs)(o.Z, {
                        sx: {
                            display: "flex",
                            alignItems: "center",
                            ml: l ? 1 : 0
                        },
                        children: [(0, z.jsx)(le, {
                            availableValue: u,
                            isUSD: i,
                            capType: t
                        }), !l && (0, z.jsxs)(z.Fragment, {
                            children: [(0, z.jsx)(a.Z, {
                                variant: "tooltip",
                                color: "text.secondary",
                                children: p
                            }), (0, z.jsx)(oe.B, {
                                value: u >= 0 ? u : 0,
                                compact: !0,
                                symbol: i ? "USD" : void 0,
                                variant: "tooltip"
                            })]
                        })]
                    })
                },
                de = r(52906),
                ue = function(e) {
                    var t = e.value,
                        r = e.incentives,
                        n = e.symbol;
                    return (0, z.jsx)(O.h, {
                        children: (0, z.jsx)(de.J, {
                            value: t,
                            incentives: r,
                            symbol: n,
                            "data-cy": "apyType"
                        })
                    })
                },
                pe = r(4730),
                xe = r(72389),
                he = r(69507),
                be = r(39900),
                me = r(83793),
                ve = r(35161),
                je = r(25169),
                ye = r(42115),
                fe = r(19480),
                ge = ["symbol", "iconSymbol", "children", "name", "detailsAddress", "currentMarket", "frozen", "borrowEnabled", "showSupplyCapTooltips", "showBorrowCapTooltips", "showDebtCeilingTooltips"];

            function we(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function Ce(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? we(Object(r), !0).forEach((function(t) {
                        (0, j.Z)(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : we(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }
            var Oe = function(e) {
                    var t = e.symbol,
                        r = e.iconSymbol,
                        n = e.children,
                        o = e.name,
                        s = e.detailsAddress,
                        i = e.currentMarket,
                        l = e.frozen,
                        c = e.borrowEnabled,
                        u = void 0 === c || c,
                        p = e.showSupplyCapTooltips,
                        x = void 0 !== p && p,
                        h = e.showBorrowCapTooltips,
                        b = void 0 !== h && h,
                        m = e.showDebtCeilingTooltips,
                        v = void 0 !== m && m,
                        j = (0, pe.Z)(e, ge),
                        y = (0, S.ov)(),
                        f = y.supplyCap,
                        g = y.borrowCap,
                        w = y.debtCeiling,
                        C = l && "renFIL" !== t && "BUSD" !== t,
                        A = l && "renFIL" === t,
                        Z = !l && "AMPL" === t,
                        P = "stETH" == t,
                        k = "BUSD" == t,
                        D = !l && !u,
                        E = (0, d.Yh)((function(e) {
                            return e.trackEvent
                        }));
                    return (0, z.jsxs)(G.H, Ce(Ce({}, j), {}, {
                        children: [(0, z.jsxs)(O.h, {
                            maxWidth: L,
                            isRow: !0,
                            children: [(0, z.jsxs)(I.rU, {
                                onClick: function() {
                                    return E(B.h1.DETAILS_NAVIGATION, {
                                        type: "Row click",
                                        market: i,
                                        assetName: o,
                                        asset: s
                                    })
                                },
                                href: I.Z6.reserveOverview(s, i),
                                noWrap: !0,
                                sx: {
                                    display: "inline-flex",
                                    alignItems: "center"
                                },
                                children: [(0, z.jsx)(fe.T1, {
                                    symbol: r,
                                    fontSize: "large"
                                }), (0, z.jsx)(xe.Z, {
                                    title: "".concat(o, " (").concat(t, ")"),
                                    arrow: !0,
                                    placement: "top",
                                    children: (0, z.jsx)(a.Z, {
                                        variant: "subheader1",
                                        sx: {
                                            ml: 3
                                        },
                                        noWrap: !0,
                                        "data-cy": "assetName",
                                        children: t
                                    })
                                })]
                            }), C && (0, z.jsx)(je.Q, {
                                symbol: t,
                                currentMarket: i
                            }), A && (0, z.jsx)(ye.F, {}), Z && (0, z.jsx)(ve.$, {}), P && (0, z.jsx)(me.n, {}), k && (0, z.jsx)(be.t, {}), D && (0, z.jsx)(he.w, {
                                symbol: t,
                                currentMarket: i
                            }), x && f.displayMaxedTooltip({
                                supplyCap: f
                            }), b && g.displayMaxedTooltip({
                                borrowCap: g
                            }), v && w.displayMaxedTooltip({
                                debtCeiling: w
                            })]
                        }), n]
                    }))
                },
                Ae = function(e) {
                    var t = e.value,
                        r = e.withTooltip,
                        n = e.subValue,
                        a = e.disabled,
                        s = e.capsComponent;
                    return (0, z.jsxs)(z.Fragment, {
                        children: [(0, z.jsxs)(o.Z, {
                            sx: {
                                display: "flex",
                                alignItems: "center"
                            },
                            children: [(0, z.jsx)(oe.B, {
                                value: t,
                                variant: "secondary14",
                                sx: {
                                    mb: !r && n ? "2px" : 0
                                },
                                color: a ? "text.disabled" : "text.main",
                                "data-cy": "nativeAmount"
                            }), s]
                        }), !r && !!n && !a && (0, z.jsx)(oe.B, {
                            value: n,
                            symbol: "USD",
                            variant: "secondary12",
                            color: "text.secondary"
                        })]
                    })
                },
                Ze = function(e) {
                    var t = e.symbol,
                        r = e.value,
                        n = e.subValue,
                        a = e.withTooltip,
                        s = e.capsComponent,
                        i = e.disabled;
                    return (0, z.jsx)(O.h, {
                        children: a ? (0, z.jsx)(xe.Z, {
                            title: (0, z.jsxs)(o.Z, {
                                sx: {
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center"
                                },
                                children: [(0, z.jsx)(oe.B, {
                                    value: n || 0,
                                    symbol: "USD",
                                    variant: "secondary14",
                                    sx: {
                                        mb: "2px"
                                    },
                                    symbolsColor: "common.white",
                                    compact: !1
                                }), (0, z.jsx)(oe.B, {
                                    value: r,
                                    variant: "secondary12",
                                    symbol: t,
                                    symbolsColor: "common.white",
                                    compact: !1
                                })]
                            }),
                            arrow: !0,
                            placement: "top",
                            children: (0, z.jsx)(o.Z, {
                                sx: {
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center"
                                },
                                children: (0, z.jsx)(Ae, {
                                    symbol: t,
                                    value: r,
                                    subValue: n,
                                    capsComponent: s,
                                    disabled: i,
                                    withTooltip: a
                                })
                            })
                        }) : (0, z.jsx)(Ae, {
                            symbol: t,
                            value: r,
                            subValue: n,
                            capsComponent: s,
                            disabled: i,
                            withTooltip: a
                        })
                    })
                },
                Pe = function(e) {
                    var t = e.symbol,
                        r = e.iconSymbol,
                        o = e.name,
                        a = e.availableBorrows,
                        s = e.availableBorrowsInUSD,
                        i = e.borrowCap,
                        l = e.totalBorrows,
                        c = e.variableBorrowRate,
                        u = e.stableBorrowRate,
                        p = e.sIncentivesData,
                        x = e.vIncentivesData,
                        h = e.underlyingAsset,
                        b = e.isFreezed,
                        m = (0, ne.vR)().openBorrow,
                        v = (0, R.f)().currentMarket,
                        j = b || Number(a) <= 0,
                        y = (0, d.Yh)((function(e) {
                            return e.trackEvent
                        }));
                    return (0, z.jsxs)(Oe, {
                        symbol: t,
                        iconSymbol: r,
                        name: o,
                        detailsAddress: h,
                        "data-cy": "dashboardBorrowListItem_".concat(t.toUpperCase()),
                        currentMarket: v,
                        children: [(0, z.jsx)(Ze, {
                            symbol: t,
                            value: Number(a),
                            subValue: Number(s),
                            disabled: 0 === Number(a),
                            withTooltip: !0,
                            capsComponent: (0, z.jsx)(ce, {
                                capType: E.R.borrowCap,
                                capAmount: i,
                                totalAmount: l,
                                withoutText: !0
                            })
                        }), (0, z.jsx)(ue, {
                            value: Number(c),
                            incentives: x,
                            symbol: t
                        }), (0, z.jsx)(ue, {
                            value: Number(u),
                            incentives: p,
                            symbol: t
                        }), (0, z.jsxs)(K, {
                            children: [(0, z.jsx)(re.Z, {
                                disabled: j,
                                variant: "contained",
                                onClick: function() {
                                    m(h, v, o, "dashboard")
                                },
                                children: (0, z.jsx)(n.cC, {
                                    id: "Borrow"
                                })
                            }), (0, z.jsx)(re.Z, {
                                variant: "outlined",
                                component: I.rU,
                                href: I.Z6.reserveOverview(h, v),
                                onClick: function() {
                                    y(B.h1.DETAILS_NAVIGATION, {
                                        type: "Button",
                                        market: v,
                                        assetName: o,
                                        asset: h
                                    })
                                },
                                children: (0, z.jsx)(n.cC, {
                                    id: "Details"
                                })
                            })]
                        })]
                    })
                },
                ke = function(e) {
                    var t = e.title,
                        r = e.capsComponent,
                        n = e.value,
                        a = e.subValue,
                        s = e.disabled;
                    return (0, z.jsx)(Q.X, {
                        caption: t,
                        captionVariant: "description",
                        align: "flex-start",
                        mb: 2,
                        children: (0, z.jsxs)(o.Z, {
                            sx: {
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-end"
                            },
                            children: [(0, z.jsxs)(o.Z, {
                                sx: {
                                    display: "flex",
                                    alignItems: "center",
                                    mb: .5
                                },
                                children: [(0, z.jsx)(oe.B, {
                                    value: n,
                                    variant: "secondary14",
                                    color: s ? "text.disabled" : "text.primary"
                                }), r]
                            }), !s && (0, z.jsx)(oe.B, {
                                value: a,
                                variant: "secondary12",
                                color: "text.secondary",
                                symbol: "USD",
                                mb: .5
                            })]
                        })
                    })
                },
                Se = function(e) {
                    var t = e.symbol,
                        r = e.iconSymbol,
                        a = e.name,
                        s = e.availableBorrows,
                        i = e.availableBorrowsInUSD,
                        l = e.borrowCap,
                        c = e.totalBorrows,
                        d = e.variableBorrowRate,
                        u = e.stableBorrowRate,
                        p = e.sIncentivesData,
                        x = e.vIncentivesData,
                        h = e.underlyingAsset,
                        b = e.isFreezed,
                        m = (0, ne.vR)().openBorrow,
                        v = (0, R.f)().currentMarket,
                        j = b || Number(s) <= 0;
                    return (0, z.jsxs)($.o, {
                        symbol: t,
                        iconSymbol: r,
                        name: a,
                        underlyingAsset: h,
                        currentMarket: v,
                        children: [(0, z.jsx)(ke, {
                            title: (0, z.jsx)(n.cC, {
                                id: "Available to borrow"
                            }),
                            value: Number(s),
                            subValue: Number(i),
                            disabled: 0 === Number(s),
                            capsComponent: (0, z.jsx)(ce, {
                                capType: E.R.borrowCap,
                                capAmount: l,
                                totalAmount: c,
                                withoutText: !0
                            })
                        }), (0, z.jsx)(Q.X, {
                            caption: (0, z.jsx)(C.B, {
                                text: (0, z.jsx)(n.cC, {
                                    id: "APY, variable"
                                }),
                                variant: "description"
                            }, "APY_dash_mob_variable_ type"),
                            align: "flex-start",
                            captionVariant: "description",
                            mb: 2,
                            children: (0, z.jsx)(de.J, {
                                value: Number(d),
                                incentives: x,
                                symbol: t,
                                variant: "secondary14"
                            })
                        }), (0, z.jsx)(Q.X, {
                            caption: (0, z.jsx)(w.s, {
                                text: (0, z.jsx)(n.cC, {
                                    id: "APY, stable"
                                }),
                                variant: "description"
                            }, "APY_dash_mob_stable_ type"),
                            align: "flex-start",
                            captionVariant: "description",
                            mb: 2,
                            children: (0, z.jsx)(de.J, {
                                value: Number(u),
                                incentives: p,
                                symbol: t,
                                variant: "secondary14"
                            })
                        }), (0, z.jsxs)(o.Z, {
                            sx: {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                mt: 5
                            },
                            children: [(0, z.jsx)(re.Z, {
                                disabled: j,
                                variant: "contained",
                                onClick: function() {
                                    return m(h, v, a, "dashboard")
                                },
                                sx: {
                                    mr: 1.5
                                },
                                fullWidth: !0,
                                children: (0, z.jsx)(n.cC, {
                                    id: "Borrow"
                                })
                            }), (0, z.jsx)(re.Z, {
                                variant: "outlined",
                                component: I.rU,
                                href: I.Z6.reserveOverview(h, v),
                                fullWidth: !0,
                                children: (0, z.jsx)(n.cC, {
                                    id: "Details"
                                })
                            })]
                        })]
                    })
                };

            function De(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function Be(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? De(Object(r), !0).forEach((function(t) {
                        (0, j.Z)(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : De(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }
            var Ee = [{
                    title: (0, z.jsx)(n.cC, {
                        id: "Asset"
                    }),
                    sortKey: "symbol"
                }, {
                    title: (0, z.jsx)(T.Y, {
                        event: {
                            eventName: B.vh.TOOL_TIP,
                            eventParams: {
                                tooltip: "Available to borrow"
                            }
                        },
                        capType: E.R.borrowCap,
                        text: (0, z.jsx)(n.cC, {
                            id: "Available"
                        }),
                        variant: "subheader2"
                    }, "availableBorrows"),
                    sortKey: "availableBorrows"
                }, {
                    title: (0, z.jsx)(C.B, {
                        event: {
                            eventName: B.vh.TOOL_TIP,
                            eventParams: {
                                tooltip: "Variable Borrow APY"
                            }
                        },
                        text: (0, z.jsx)(n.cC, {
                            id: "APY, variable"
                        }),
                        variant: "subheader2"
                    }, "variableBorrowAPY"),
                    sortKey: "variableBorrowAPY"
                }, {
                    title: (0, z.jsx)(w.s, {
                        event: {
                            eventName: B.vh.TOOL_TIP,
                            eventParams: {
                                tooltip: "Stable Borrow APY"
                            }
                        },
                        text: (0, z.jsx)(n.cC, {
                            id: "APY, stable"
                        }),
                        variant: "subheader2"
                    }, "stableBorrowAPY"),
                    sortKey: "stableBorrowAPY"
                }],
                Te = function() {
                    var e = (0, R.f)(),
                        t = e.currentNetworkConfig,
                        r = e.currentMarketData,
                        i = (0, M.HT)(),
                        l = i.user,
                        c = i.reserves,
                        d = i.marketReferencePriceInUsd,
                        u = i.loading,
                        p = (0, m.Z)(),
                        x = (0, v.Z)(p.breakpoints.down("xsm")),
                        h = (0, s.useState)(""),
                        j = h[0],
                        w = h[1],
                        C = (0, s.useState)(!1),
                        B = C[0],
                        E = C[1],
                        T = t.baseAssetSymbol,
                        _ = c.filter((function(e) {
                            return (0, H.h)(e, l)
                        })).map((function(e) {
                            var t = l ? Number((0, H.n)(e, l, b.tk.Variable)) : 0,
                                r = (0, f.hE)(t).multipliedBy(e.formattedPriceInMarketReferenceCurrency).multipliedBy(d).shiftedBy(-g.$3).toFixed(2);
                            return Be(Be({}, e), {}, {
                                reserve: e,
                                totalBorrows: e.totalDebt,
                                availableBorrows: t,
                                availableBorrowsInUSD: r,
                                stableBorrowRate: e.stableBorrowRateEnabled && e.borrowingEnabled ? Number(e.stableBorrowAPY) : -1,
                                variableBorrowRate: e.borrowingEnabled ? Number(e.variableBorrowAPY) : -1,
                                iconSymbol: e.iconSymbol
                            }, e.isWrappedBaseAsset ? (0, D.QD)({
                                symbol: T,
                                underlyingAsset: y.hP.toLowerCase()
                            }) : {})
                        })),
                        L = (0, f.hE)((null === l || void 0 === l ? void 0 : l.totalBorrowsMarketReferenceCurrency) || "0").plus((null === l || void 0 === l ? void 0 : l.availableBorrowsMarketReferenceCurrency) || "0"),
                        V = L.eq(0) ? "0" : (0, f.hE)((null === l || void 0 === l ? void 0 : l.totalBorrowsMarketReferenceCurrency) || "0").div(L).toFixed(),
                        F = "0" === (null === l || void 0 === l ? void 0 : l.totalCollateralMarketReferenceCurrency) || +V >= .98 ? _ : _.filter((function(e) {
                            var t = e.availableBorrowsInUSD,
                                r = e.totalLiquidityUSD;
                            return "0.00" !== t && "0" !== r
                        })),
                        W = Y(B, j, "asset", F),
                        q = !W.length,
                        X = function() {
                            return (0, z.jsxs)(Z.u, {
                                children: [Ee.map((function(e) {
                                    return (0, z.jsx)(O.h, {
                                        isRow: "symbol" === e.sortKey,
                                        maxWidth: "symbol" === e.sortKey ? U : void 0,
                                        children: (0, z.jsx)(A.M, {
                                            sortName: j,
                                            sortDesc: B,
                                            setSortName: w,
                                            setSortDesc: E,
                                            sortKey: e.sortKey,
                                            source: "Borrow Dashboard",
                                            children: e.title
                                        })
                                    }, e.sortKey)
                                })), (0, z.jsx)(K, {
                                    isColumnHeader: !0
                                })]
                            })
                        };
                    return u ? (0, z.jsx)(te, {
                        title: (0, z.jsx)(n.cC, {
                            id: "Assets to borrow"
                        }),
                        head: Ee.map((function(e) {
                            return e.title
                        })),
                        withTopMargin: !0
                    }) : (0, z.jsx)(N.l, {
                        titleComponent: (0, z.jsx)(a.Z, {
                            component: "div",
                            variant: "h3",
                            sx: {
                                mr: 4
                            },
                            children: (0, z.jsx)(n.cC, {
                                id: "Assets to borrow"
                            })
                        }),
                        localStorageName: "borrowAssetsDashboardTableCollapse",
                        withTopMargin: !0,
                        noData: q,
                        subChildrenComponent: (0, z.jsxs)(o.Z, {
                            sx: {
                                px: 6,
                                mb: 4
                            },
                            children: [q && "Harmony" === t.name && (0, z.jsx)(k.C, {
                                marketName: "Harmony"
                            }), q && "Fantom" === t.name && (0, z.jsx)(k.C, {
                                marketName: "Fantom"
                            }), q && "Ethereum AMM" === r.marketTitle && (0, z.jsx)(k.C, {
                                marketName: "Ethereum AMM"
                            }), +V >= .98 && (0, z.jsx)(P.v, {
                                severity: "error",
                                children: (0, z.jsx)(n.cC, {
                                    id: "Be careful - You are very close to liquidation. Consider depositing more collateral or paying down some of your borrowed positions"
                                })
                            }), !q && (0, z.jsxs)(z.Fragment, {
                                children: [(null === l || void 0 === l ? void 0 : l.isInIsolationMode) && (0, z.jsxs)(P.v, {
                                    severity: "warning",
                                    children: [(0, z.jsx)(n.cC, {
                                        id: "Borrowing power and assets are limited due to Isolation mode."
                                    }), (0, z.jsx)(I.rU, {
                                        href: "https://docs.aave.com/faq/",
                                        target: "_blank",
                                        rel: "noopener",
                                        children: "Learn More"
                                    })]
                                }), (null === l || void 0 === l ? void 0 : l.isInEmode) && (0, z.jsx)(P.v, {
                                    severity: "warning",
                                    children: (0, z.jsx)(n.cC, {
                                        id: "In E-Mode some assets are not borrowable. Exit E-Mode to get access to all assets"
                                    })
                                }), "0" === (null === l || void 0 === l ? void 0 : l.totalCollateralMarketReferenceCurrency) && (0, z.jsx)(P.v, {
                                    severity: "info",
                                    children: (0, z.jsx)(n.cC, {
                                        id: "To borrow you need to supply any asset to be used as collateral."
                                    })
                                })]
                            })]
                        }),
                        children: (0, z.jsxs)(z.Fragment, {
                            children: [!x && !!W.length && (0, z.jsx)(X, {}), null === W || void 0 === W ? void 0 : W.map((function(e) {
                                return (0, z.jsx)(s.Fragment, {
                                    children: (0, z.jsx)(S.hv, {
                                        asset: e.reserve,
                                        children: x ? (0, z.jsx)(Se, Be({}, e)) : (0, z.jsx)(Pe, Be({}, e))
                                    })
                                }, e.underlyingAsset)
                            }))]
                        })
                    })
                },
                Ne = r(10766),
                Ie = r(36864),
                Me = r(58527);

            function Re(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function Ue(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? Re(Object(r), !0).forEach((function(t) {
                        (0, j.Z)(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Re(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }
            var _e = function(e) {
                var t = (0, Ie.Z)({}, e);
                return (0, z.jsx)(Me.G, Ue(Ue({}, t), {}, {
                    children: (0, z.jsx)(n.cC, {
                        id: "The % of your total borrowing power used. This is based on the amount of your collateral supplied and the total amount that you can borrow."
                    })
                }))
            };

            function Le(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function Ye(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? Le(Object(r), !0).forEach((function(t) {
                        (0, j.Z)(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Le(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }
            var Ve = function(e) {
                    var t = (0, Ie.Z)({}, e);
                    return (0, z.jsx)(Me.G, Ye(Ye({}, t), {}, {
                        children: (0, z.jsx)(n.cC, {
                            id: "The weighted average of APY for all borrowed assets, including incentives."
                        })
                    }))
                },
                Fe = r(26079);
            var We = s.forwardRef((function(e, t) {
                    return s.createElement("svg", Object.assign({
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 20 20",
                        fill: "currentColor",
                        "aria-hidden": "true",
                        ref: t
                    }, e), s.createElement("path", {
                        fillRule: "evenodd",
                        d: "M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z",
                        clipRule: "evenodd"
                    }))
                })),
                He = r(22659),
                ze = r(73812),
                Ke = r(60008),
                qe = r(76920);

            function Xe(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function Ge(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? Xe(Object(r), !0).forEach((function(t) {
                        (0, j.Z)(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Xe(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }
            var Je = function(e) {
                    var t = (0, Ie.Z)({}, e);
                    return (0, z.jsx)(a.Z, Ge(Ge({
                        sx: function(e) {
                            return {
                                color: "transparent",
                                backgroundClip: "text !important",
                                webkitTextFillColor: "transparent",
                                background: e.palette.gradients.aaveGradient
                            }
                        }
                    }, t), {}, {
                        children: t.children
                    }))
                },
                Qe = r(32667),
                $e = function(e) {
                    var t = e.userEmodeCategoryId,
                        r = (0, ne.vR)().openEmode,
                        i = (0, M.HT)().eModes,
                        l = (0, d.Yh)((function(e) {
                            return e.trackEvent
                        })),
                        c = (0, s.useState)(null),
                        u = c[0],
                        p = c[1],
                        x = Boolean(u),
                        h = function() {
                            p(null)
                        },
                        b = 0 === t,
                        m = function() {
                            return (0, z.jsx)(n.cC, {
                                id: "{0}",
                                values: {
                                    0: (0, Qe.U)(i[t].label)
                                }
                            })
                        },
                        v = Object.keys(i).length;
                    return (0, z.jsxs)(o.Z, {
                        sx: {
                            display: "inline-flex",
                            alignItems: "center"
                        },
                        onClick: function(e) {
                            e.stopPropagation()
                        },
                        children: [(0, z.jsx)(a.Z, {
                            mr: 1,
                            variant: "description",
                            color: "text.secondary",
                            children: (0, z.jsx)(n.cC, {
                                id: "E-Mode"
                            })
                        }), (0, z.jsx)(re.Z, {
                            onClick: function(e) {
                                var r;
                                e.stopPropagation(), r = e, l(B.h1.E_MODE_INFO_DASHBOARD, {
                                    userEmodeCategoryId: t
                                }), p(r.currentTarget)
                            },
                            "data-cy": "emode-open",
                            size: "small",
                            variant: "outlined",
                            sx: function(e) {
                                return {
                                    ml: 1,
                                    borderRadius: "4px",
                                    p: 0,
                                    "&:after": {
                                        content: "''",
                                        position: "absolute",
                                        left: -1,
                                        right: -1,
                                        bottom: -1,
                                        top: -1,
                                        background: b ? "transparent" : e.palette.gradients.aaveGradient,
                                        borderRadius: "4px"
                                    }
                                }
                            },
                            children: (0, z.jsxs)(o.Z, {
                                sx: function(e) {
                                    return {
                                        display: "inline-flex",
                                        alignItems: "center",
                                        position: "relative",
                                        zIndex: 1,
                                        bgcolor: b ? x ? e.palette.background.disabled : e.palette.background.surface : e.palette.background.paper,
                                        px: "4px",
                                        borderRadius: "4px"
                                    }
                                },
                                children: [(0, z.jsx)(se.Z, {
                                    sx: {
                                        fontSize: 12,
                                        mr: "4px",
                                        color: b ? "text.muted" : "text.primary"
                                    },
                                    children: b ? (0, z.jsx)(We, {}) : (0, z.jsx)(qe.Z, {})
                                }), b ? (0, z.jsx)(a.Z, {
                                    variant: "buttonS",
                                    color: "text.secondary",
                                    children: (0, z.jsx)(m, {})
                                }) : (0, z.jsx)(Je, {
                                    variant: "buttonS",
                                    children: (0, z.jsx)(m, {})
                                }), (0, z.jsx)(se.Z, {
                                    sx: {
                                        fontSize: 12,
                                        ml: "4px",
                                        color: "primary.light"
                                    },
                                    children: (0, z.jsx)(He.Z, {})
                                })]
                            })
                        }), (0, z.jsx)(ze.Z, {
                            open: x,
                            anchorEl: u,
                            sx: {
                                ".MuiMenu-paper": {
                                    maxWidth: "280px"
                                }
                            },
                            onClose: h,
                            keepMounted: !0,
                            children: (0, z.jsxs)(o.Z, {
                                sx: {
                                    px: 4,
                                    pt: 2,
                                    pb: 3
                                },
                                children: [(0, z.jsx)(a.Z, {
                                    variant: "subheader1",
                                    mb: b ? 1 : 3,
                                    children: (0, z.jsx)(n.cC, {
                                        id: "Efficiency mode (E-Mode)"
                                    })
                                }), !b && (0, z.jsxs)(o.Z, {
                                    children: [(0, z.jsx)(a.Z, {
                                        mb: 1,
                                        variant: "caption",
                                        color: "text.secondary",
                                        children: (0, z.jsx)(n.cC, {
                                            id: "Asset category"
                                        })
                                    }), (0, z.jsx)(o.Z, {
                                        sx: function(e) {
                                            return {
                                                p: 2,
                                                mb: 3,
                                                borderRadius: "6px",
                                                border: "1px solid ".concat(e.palette.divider)
                                            }
                                        },
                                        children: (0, z.jsx)(Q.X, {
                                            caption: (0, z.jsxs)(o.Z, {
                                                sx: {
                                                    display: "inline-flex",
                                                    alignItems: "center"
                                                },
                                                children: [(0, z.jsx)(se.Z, {
                                                    sx: {
                                                        fontSize: 12,
                                                        mr: 1
                                                    },
                                                    children: (0, z.jsx)(qe.Z, {})
                                                }), (0, z.jsx)(a.Z, {
                                                    variant: "subheader2",
                                                    color: "text.primary",
                                                    children: (0, z.jsx)(m, {})
                                                })]
                                            }),
                                            children: (0, z.jsxs)(o.Z, {
                                                sx: {
                                                    display: "inline-flex",
                                                    alignItems: "center"
                                                },
                                                children: [(0, z.jsx)(o.Z, {
                                                    sx: {
                                                        width: "6px",
                                                        height: "6px",
                                                        borderRadius: "50%",
                                                        bgcolor: "success.main",
                                                        boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25)",
                                                        mr: "5px"
                                                    }
                                                }), (0, z.jsx)(a.Z, {
                                                    variant: "subheader2",
                                                    color: "success.main",
                                                    children: (0, z.jsx)(n.cC, {
                                                        id: "Enabled"
                                                    })
                                                })]
                                            })
                                        })
                                    })]
                                }), (0, z.jsx)(a.Z, {
                                    variant: "caption",
                                    color: "text.secondary",
                                    mb: 4,
                                    children: (0, z.jsx)(n.cC, {
                                        id: "E-Mode increases your LTV for a selected category of assets up to 97%. <0>Learn more</0>",
                                        components: {
                                            0: (0, z.jsx)(I.rU, {
                                                href: "https://docs.aave.com/faq/aave-v3-features#high-efficiency-mode-e-mode",
                                                sx: {
                                                    textDecoration: "underline"
                                                },
                                                variant: "caption",
                                                color: "text.secondary"
                                            })
                                        }
                                    })
                                }), b ? (0, z.jsx)(re.Z, {
                                    fullWidth: !0,
                                    variant: "gradient",
                                    onClick: function() {
                                        l(B.vh.OPEN_MODAL, {
                                            type: "Enable E-Mode",
                                            data: t
                                        }), r(Ke._h.ENABLE), h()
                                    },
                                    "data-cy": "emode-enable",
                                    children: (0, z.jsx)(n.cC, {
                                        id: "Enable E-Mode"
                                    })
                                }) : (0, z.jsxs)(z.Fragment, {
                                    children: [v > 2 && (0, z.jsx)(re.Z, {
                                        fullWidth: !0,
                                        sx: {
                                            mb: "6px"
                                        },
                                        variant: "outlined",
                                        onClick: function() {
                                            l(B.vh.OPEN_MODAL, {
                                                modal: "Switch E-Mode",
                                                data: t
                                            }), r(Ke._h.SWITCH), h()
                                        },
                                        "data-cy": "emode-switch",
                                        children: (0, z.jsx)(n.cC, {
                                            id: "Switch E-Mode category"
                                        })
                                    }), (0, z.jsx)(re.Z, {
                                        fullWidth: !0,
                                        variant: "outlined",
                                        onClick: function() {
                                            l(B.h1.E_MODE, {
                                                type: "Disable E-Mode",
                                                data: t
                                            }), r(Ke._h.DISABLE), h()
                                        },
                                        "data-cy": "emode-disable",
                                        children: (0, z.jsx)(n.cC, {
                                            id: "Disable E-Mode"
                                        })
                                    })]
                                })]
                            })
                        })]
                    })
                },
                et = r(70918),
                tt = function(e) {
                    var t = e.title,
                        r = e.value,
                        n = e.percent,
                        o = e.tooltip;
                    return (0, z.jsxs)(et.Z, {
                        variant: "outlined",
                        sx: {
                            mr: 2,
                            p: "2px 4px",
                            display: "flex",
                            alignItems: "center",
                            boxShadow: "none",
                            bgcolor: "transparent"
                        },
                        children: [(0, z.jsx)(a.Z, {
                            color: "text.secondary",
                            sx: {
                                mr: 1
                            },
                            noWrap: !0,
                            children: t
                        }), (0, z.jsx)(oe.B, {
                            value: r,
                            percent: n,
                            variant: "secondary14",
                            symbol: "USD"
                        }), o]
                    })
                },
                rt = r(17674),
                nt = r(10822),
                ot = r(61782),
                at = r(64343),
                st = r(56365),
                it = r(31538),
                lt = r(29894),
                ct = r(61702),
                dt = r(44373),
                ut = function(e) {
                    var t = e.stableBorrowRateEnabled,
                        r = e.borrowRateMode,
                        i = e.disabled,
                        l = e.onClick,
                        c = e.stableBorrowAPY,
                        d = e.variableBorrowAPY,
                        u = e.underlyingAsset,
                        p = e.currentMarket,
                        x = s.useState(null),
                        h = (0, rt.Z)(x, 2),
                        m = h[0],
                        v = h[1],
                        j = Boolean(m),
                        y = function() {
                            v(null)
                        };
                    return (0, z.jsxs)(z.Fragment, {
                        children: [(0, z.jsx)(re.Z, {
                            variant: "outlined",
                            onClick: function(e) {
                                v(e.currentTarget)
                            },
                            size: "small",
                            endIcon: t && (0, z.jsx)(se.Z, {
                                sx: {
                                    fontSize: "14px !important"
                                },
                                children: j ? (0, z.jsx)(nt.Z, {}) : (0, z.jsx)(ot.Z, {})
                            }),
                            disabled: i,
                            "data-cy": "apyButton_".concat(r),
                            children: r
                        }), (0, z.jsxs)(ze.Z, {
                            anchorEl: m,
                            open: j,
                            onClose: y,
                            MenuListProps: {
                                "aria-labelledby": "basic-button"
                            },
                            keepMounted: !0,
                            "data-cy": "apyMenu_".concat(r),
                            children: [(0, z.jsx)(a.Z, {
                                variant: "subheader2",
                                sx: {
                                    px: 4,
                                    py: 3
                                },
                                children: (0, z.jsx)(n.cC, {
                                    id: "Select APY type to switch"
                                })
                            }), (0, z.jsxs)(it.Z, {
                                selected: r === b.tk.Variable,
                                value: b.tk.Variable,
                                onClick: function() {
                                    r === b.tk.Stable && l(), y()
                                },
                                children: [(0, z.jsx)(lt.Z, {
                                    children: (0, z.jsx)(se.Z, {
                                        children: r === b.tk.Variable && (0, z.jsx)(at.Z, {})
                                    })
                                }), (0, z.jsx)(ct.Z, {
                                    primaryTypographyProps: {
                                        variant: "description"
                                    },
                                    children: (0, z.jsx)(n.cC, {
                                        id: "APY, variable"
                                    })
                                }), (0, z.jsx)(oe.B, {
                                    value: Number(d),
                                    percent: !0,
                                    variant: "description"
                                })]
                            }), (0, z.jsxs)(it.Z, {
                                selected: r === b.tk.Stable,
                                value: b.tk.Stable,
                                onClick: function() {
                                    r === b.tk.Variable && l(), y()
                                },
                                children: [(0, z.jsx)(lt.Z, {
                                    children: (0, z.jsx)(se.Z, {
                                        children: r === b.tk.Stable && (0, z.jsx)(at.Z, {})
                                    })
                                }), (0, z.jsx)(ct.Z, {
                                    primaryTypographyProps: {
                                        variant: "description"
                                    },
                                    children: (0, z.jsx)(n.cC, {
                                        id: "APY, stable"
                                    })
                                }), (0, z.jsx)(oe.B, {
                                    value: Number(c),
                                    percent: !0,
                                    variant: "description"
                                })]
                            }), (0, z.jsx)(dt.Z, {}), (0, z.jsx)(o.Z, {
                                sx: {
                                    display: "flex",
                                    flexDirection: "row"
                                },
                                children: (0, z.jsx)(re.Z, {
                                    sx: {
                                        my: 2,
                                        ml: 4
                                    },
                                    size: "small",
                                    component: I.rU,
                                    target: "_blank",
                                    href: I.Z6.reserveOverview(u, p),
                                    endIcon: (0, z.jsx)(se.Z, {
                                        children: (0, z.jsx)(st.Z, {})
                                    }),
                                    children: (0, z.jsx)(n.cC, {
                                        id: "SEE CHARTS"
                                    })
                                })
                            })]
                        })]
                    })
                },
                pt = function(e) {
                    var t = e.reserve,
                        r = e.variableBorrows,
                        o = e.variableBorrowsUSD,
                        a = e.stableBorrows,
                        s = e.stableBorrowsUSD,
                        i = e.borrowRateMode,
                        l = e.stableBorrowAPY,
                        c = (0, ne.vR)(),
                        d = c.openBorrow,
                        u = c.openRepay,
                        p = c.openRateSwitch,
                        x = (0, R.f)().currentMarket,
                        h = (0, S.ov)().borrowCap,
                        m = t.isActive,
                        v = t.isFrozen,
                        j = t.borrowingEnabled,
                        y = t.stableBorrowRateEnabled,
                        f = t.sIncentivesData,
                        g = t.vIncentivesData,
                        w = t.variableBorrowAPY,
                        C = t.name,
                        A = !m || !j || v || h.isMaxed;
                    return (0, z.jsxs)(Oe, {
                        symbol: t.symbol,
                        iconSymbol: t.iconSymbol,
                        name: t.name,
                        detailsAddress: t.underlyingAsset,
                        currentMarket: x,
                        frozen: t.isFrozen,
                        borrowEnabled: t.borrowingEnabled,
                        "data-cy": "dashboardBorrowedListItem_".concat(t.symbol.toUpperCase(), "_").concat(i),
                        showBorrowCapTooltips: !0,
                        children: [(0, z.jsx)(Ze, {
                            symbol: t.symbol,
                            value: Number(i === b.tk.Variable ? r : a),
                            subValue: Number(i === b.tk.Variable ? o : s)
                        }), (0, z.jsx)(ue, {
                            value: Number(i === b.tk.Variable ? w : l),
                            incentives: i === b.tk.Variable ? g : f,
                            symbol: t.symbol
                        }), (0, z.jsx)(O.h, {
                            children: (0, z.jsx)(ut, {
                                stableBorrowRateEnabled: y,
                                borrowRateMode: i,
                                disabled: !y || v || !m,
                                onClick: function() {
                                    return p(t.underlyingAsset, i)
                                },
                                stableBorrowAPY: t.stableBorrowAPY,
                                variableBorrowAPY: t.variableBorrowAPY,
                                underlyingAsset: t.underlyingAsset,
                                currentMarket: x
                            })
                        }), (0, z.jsxs)(K, {
                            children: [(0, z.jsx)(re.Z, {
                                disabled: !m,
                                variant: "contained",
                                onClick: function() {
                                    u(t.underlyingAsset, i, v, x, C, "dashboard")
                                },
                                children: (0, z.jsx)(n.cC, {
                                    id: "Repay"
                                })
                            }), (0, z.jsx)(re.Z, {
                                disabled: A,
                                variant: "outlined",
                                onClick: function() {
                                    d(t.underlyingAsset, x, C, "dashboard")
                                },
                                children: (0, z.jsx)(n.cC, {
                                    id: "Borrow"
                                })
                            })]
                        })]
                    })
                },
                xt = function(e) {
                    var t = e.reserve,
                        r = e.variableBorrows,
                        a = e.variableBorrowsUSD,
                        s = e.stableBorrows,
                        i = e.stableBorrowsUSD,
                        l = e.borrowRateMode,
                        c = e.stableBorrowAPY,
                        d = (0, R.f)().currentMarket,
                        u = (0, ne.vR)(),
                        p = u.openBorrow,
                        x = u.openRepay,
                        h = u.openRateSwitch,
                        m = (0, S.ov)().borrowCap,
                        v = t.symbol,
                        j = t.iconSymbol,
                        y = t.name,
                        f = t.isActive,
                        g = t.isFrozen,
                        w = t.borrowingEnabled,
                        C = t.stableBorrowRateEnabled,
                        O = t.sIncentivesData,
                        A = t.vIncentivesData,
                        Z = t.variableBorrowAPY,
                        P = t.underlyingAsset,
                        k = Number(l === b.tk.Variable ? r : s),
                        D = Number(l === b.tk.Variable ? a : i),
                        B = Number(l === b.tk.Variable ? Z : c),
                        E = l === b.tk.Variable ? A : O,
                        T = !f || !w || g || m.isMaxed;
                    return (0, z.jsxs)($.o, {
                        symbol: v,
                        iconSymbol: j,
                        name: y,
                        underlyingAsset: t.underlyingAsset,
                        currentMarket: d,
                        frozen: t.isFrozen,
                        borrowEnabled: t.borrowingEnabled,
                        showBorrowCapTooltips: !0,
                        children: [(0, z.jsx)(ke, {
                            title: (0, z.jsx)(n.cC, {
                                id: "Debt"
                            }),
                            value: k,
                            subValue: D,
                            disabled: 0 === k
                        }), (0, z.jsx)(Q.X, {
                            caption: (0, z.jsx)(n.cC, {
                                id: "APY"
                            }),
                            align: "flex-start",
                            captionVariant: "description",
                            mb: 2,
                            children: (0, z.jsx)(de.J, {
                                value: B,
                                incentives: E,
                                symbol: v,
                                variant: "secondary14"
                            })
                        }), (0, z.jsx)(Q.X, {
                            caption: (0, z.jsx)(Ne.Z, {
                                text: (0, z.jsx)(n.cC, {
                                    id: "APY type"
                                }),
                                variant: "description"
                            }, "APY type"),
                            captionVariant: "description",
                            mb: 2,
                            children: (0, z.jsx)(ut, {
                                stableBorrowRateEnabled: C,
                                borrowRateMode: l,
                                disabled: !C || g || !f,
                                onClick: function() {
                                    return h(P, l)
                                },
                                stableBorrowAPY: c,
                                variableBorrowAPY: Z,
                                underlyingAsset: P,
                                currentMarket: d
                            })
                        }), (0, z.jsxs)(o.Z, {
                            sx: {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                mt: 5
                            },
                            children: [(0, z.jsx)(re.Z, {
                                disabled: !f,
                                variant: "contained",
                                onClick: function() {
                                    return x(P, l, g, d, y, "dashboard")
                                },
                                sx: {
                                    mr: 1.5
                                },
                                fullWidth: !0,
                                children: (0, z.jsx)(n.cC, {
                                    id: "Repay"
                                })
                            }), (0, z.jsx)(re.Z, {
                                disabled: T,
                                variant: "outlined",
                                onClick: function() {
                                    return p(P, d, y, "dashboard")
                                },
                                fullWidth: !0,
                                children: (0, z.jsx)(n.cC, {
                                    id: "Borrow"
                                })
                            })]
                        })]
                    })
                };

            function ht(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function bt(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? ht(Object(r), !0).forEach((function(t) {
                        (0, j.Z)(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ht(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }
            var mt = [{
                    title: (0, z.jsx)(n.cC, {
                        id: "Asset"
                    }),
                    sortKey: "symbol"
                }, {
                    title: (0, z.jsx)(n.cC, {
                        id: "Debt"
                    }, "Debt"),
                    sortKey: "variableBorrows"
                }, {
                    title: (0, z.jsx)(n.cC, {
                        id: "APY"
                    }, "APY"),
                    sortKey: "borrowAPY"
                }, {
                    title: (0, z.jsx)(Ne.Z, {
                        event: {
                            eventName: B.vh.TOOL_TIP,
                            eventParams: {
                                tooltip: "APY Type Borrow"
                            }
                        },
                        text: (0, z.jsx)(n.cC, {
                            id: "APY type"
                        }),
                        variant: "subheader2"
                    }, "APY type"),
                    sortKey: "typeAPY"
                }],
                vt = function() {
                    var e = (0, M.HT)(),
                        t = e.user,
                        r = e.loading,
                        o = (0, R.f)(),
                        i = o.currentMarketData,
                        l = o.currentNetworkConfig,
                        c = (0, m.Z)(),
                        d = (0, v.Z)(c.breakpoints.down("xsm")),
                        u = (0, s.useState)(""),
                        p = u[0],
                        x = u[1],
                        h = (0, s.useState)(!1),
                        j = h[0],
                        g = h[1],
                        w = (0, s.useState)(!1),
                        C = w[0],
                        P = w[1],
                        k = (null === t || void 0 === t ? void 0 : t.userReservesData.reduce((function(e, t) {
                            return "0" !== t.variableBorrows && e.push(bt(bt({}, t), {}, {
                                borrowRateMode: b.tk.Variable,
                                reserve: bt(bt({}, t.reserve), t.reserve.isWrappedBaseAsset ? (0, D.QD)({
                                    symbol: l.baseAssetSymbol,
                                    underlyingAsset: y.hP.toLowerCase()
                                }) : {})
                            })), "0" !== t.stableBorrows && e.push(bt(bt({}, t), {}, {
                                borrowRateMode: b.tk.Stable,
                                reserve: bt(bt({}, t.reserve), t.reserve.isWrappedBaseAsset ? (0, D.QD)({
                                    symbol: l.baseAssetSymbol,
                                    underlyingAsset: y.hP.toLowerCase()
                                }) : {})
                            })), e
                        }), [])) || [],
                        E = (0, f.hE)((null === t || void 0 === t ? void 0 : t.totalBorrowsMarketReferenceCurrency) || "0").plus((null === t || void 0 === t ? void 0 : t.availableBorrowsMarketReferenceCurrency) || "0"),
                        T = E.eq(0) ? "0" : (0, f.hE)((null === t || void 0 === t ? void 0 : t.totalBorrowsMarketReferenceCurrency) || "0").div(E).toFixed(),
                        I = Y(j, p, "position", k, !0),
                        _ = function() {
                            return (0, z.jsxs)(Z.u, {
                                children: [mt.map((function(e) {
                                    return (0, z.jsx)(O.h, {
                                        isRow: "symbol" === e.sortKey,
                                        maxWidth: "symbol" === e.sortKey ? U : void 0,
                                        children: (0, z.jsx)(A.M, {
                                            sortName: p,
                                            sortDesc: j,
                                            setSortName: x,
                                            setSortDesc: g,
                                            sortKey: e.sortKey,
                                            source: "Borrowed Positions Dashboard",
                                            children: e.title
                                        })
                                    }, e.sortKey)
                                })), (0, z.jsx)(K, {
                                    isColumnHeader: !0
                                })]
                            })
                        };
                    return r ? (0, z.jsx)(te, {
                        title: (0, z.jsx)(n.cC, {
                            id: "Your borrows"
                        }),
                        head: mt.map((function(e) {
                            return e.title
                        }))
                    }) : (0, z.jsx)(N.l, {
                        tooltipOpen: C,
                        titleComponent: (0, z.jsx)(a.Z, {
                            component: "div",
                            variant: "h3",
                            sx: {
                                mr: 4
                            },
                            children: (0, z.jsx)(n.cC, {
                                id: "Your borrows"
                            })
                        }),
                        localStorageName: "borrowedAssetsDashboardTableCollapse",
                        subTitleComponent: i.v3 ? (0, z.jsx)($e, {
                            userEmodeCategoryId: t.userEmodeCategoryId
                        }) : void 0,
                        noData: !I.length,
                        topInfo: (0, z.jsx)(z.Fragment, {
                            children: !!I.length && (0, z.jsxs)(z.Fragment, {
                                children: [(0, z.jsx)(tt, {
                                    title: (0, z.jsx)(n.cC, {
                                        id: "Balance"
                                    }),
                                    value: (null === t || void 0 === t ? void 0 : t.totalBorrowsUSD) || 0
                                }), (0, z.jsx)(tt, {
                                    title: (0, z.jsx)(n.cC, {
                                        id: "APY"
                                    }),
                                    value: (null === t || void 0 === t ? void 0 : t.debtAPY) || 0,
                                    percent: !0,
                                    tooltip: (0, z.jsx)(Ve, {
                                        setOpen: P,
                                        event: {
                                            eventName: B.vh.TOOL_TIP,
                                            eventParams: {
                                                tooltip: "Total Borrowed APY"
                                            }
                                        }
                                    })
                                }), (0, z.jsx)(tt, {
                                    title: (0, z.jsx)(n.cC, {
                                        id: "Borrow power used"
                                    }),
                                    value: T || 0,
                                    percent: !0,
                                    tooltip: (0, z.jsx)(_e, {
                                        setOpen: P,
                                        event: {
                                            eventName: B.vh.TOOL_TIP,
                                            eventParams: {
                                                tooltip: "Borrow power used"
                                            }
                                        }
                                    })
                                })]
                            })
                        }),
                        children: I.length ? (0, z.jsxs)(z.Fragment, {
                            children: [!d && (0, z.jsx)(_, {}), I.map((function(e) {
                                return (0, z.jsx)(s.Fragment, {
                                    children: (0, z.jsx)(S.hv, {
                                        asset: e.reserve,
                                        children: d ? (0, z.jsx)(xt, bt({}, e)) : (0, z.jsx)(pt, bt({}, e))
                                    })
                                }, e.underlyingAsset + e.borrowRateMode)
                            }))]
                        }) : (0, z.jsx)(Fe.N, {
                            text: (0, z.jsx)(n.cC, {
                                id: "Nothing borrowed yet"
                            })
                        })
                    })
                };

            function jt(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function yt(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? jt(Object(r), !0).forEach((function(t) {
                        (0, j.Z)(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : jt(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }
            var ft = function(e) {
                var t = (0, Ie.Z)({}, e);
                return (0, z.jsx)(Me.G, yt(yt({}, t), {}, {
                    children: (0, z.jsx)(n.cC, {
                        id: "Allows you to decide whether to use a supplied asset as collateral. An asset used as collateral will affect your borrowing power and health factor."
                    })
                }))
            };

            function gt(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function wt(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? gt(Object(r), !0).forEach((function(t) {
                        (0, j.Z)(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : gt(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }
            var Ct = function(e) {
                var t = (0, Ie.Z)({}, e);
                return (0, z.jsx)(Me.G, wt(wt({}, t), {}, {
                    children: (0, z.jsx)(n.cC, {
                        id: "The total amount of your assets denominated in USD that can be used as collateral for borrowing assets."
                    })
                }))
            };

            function Ot(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function At(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? Ot(Object(r), !0).forEach((function(t) {
                        (0, j.Z)(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ot(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }
            var Zt = function(e) {
                    var t = (0, Ie.Z)({}, e);
                    return (0, z.jsx)(Me.G, At(At({}, t), {}, {
                        children: (0, z.jsx)(n.cC, {
                            id: "The weighted average of APY for all supplied assets, including incentives."
                        })
                    }))
                },
                Pt = r(31520),
                kt = r(54181),
                St = r(44749),
                Dt = function(e) {
                    var t = e.children;
                    return (0, z.jsxs)(o.Z, {
                        sx: {
                            display: "flex",
                            alignItems: {
                                xs: "flex-end",
                                xsm: "center"
                            },
                            justifyContent: "center",
                            flexDirection: "column"
                        },
                        children: [t, (0, z.jsx)(St.Ch, {})]
                    })
                },
                Bt = function(e) {
                    var t = e.isIsolated,
                        r = e.usageAsCollateralEnabledOnUser,
                        n = e.canBeEnabledAsCollateral,
                        o = e.onToggleSwitch,
                        a = e.disabled,
                        s = r && n;
                    return (0, z.jsx)(z.Fragment, {
                        children: t ? (0, z.jsx)(Dt, {
                            children: (0, z.jsx)(kt.Z, {
                                onClick: o,
                                disableRipple: !0,
                                checked: s,
                                disabled: !n || a
                            })
                        }) : (0, z.jsx)(kt.Z, {
                            onClick: o,
                            disableRipple: !0,
                            checked: s,
                            disabled: !n || a
                        })
                    })
                },
                Et = function(e) {
                    var t, r = e.reserve,
                        o = e.underlyingBalance,
                        a = e.underlyingBalanceUSD,
                        s = e.usageAsCollateralEnabledOnUser,
                        i = e.underlyingAsset,
                        l = (0, M.HT)().user,
                        c = r.isIsolated,
                        u = r.aIncentivesData,
                        p = r.isFrozen,
                        x = r.isActive,
                        h = (0, R.f)(),
                        b = h.currentMarketData,
                        m = h.currentMarket,
                        v = (0, ne.vR)(),
                        j = v.openSupply,
                        y = v.openWithdraw,
                        f = v.openCollateralChange,
                        g = v.openSwap,
                        w = (0, S.ov)().debtCeiling,
                        C = Pt.cr.liquiditySwap(b),
                        A = (0, d.Yh)((function(e) {
                            return e.trackEvent
                        })),
                        Z = !w.isMaxed && "0" !== r.reserveLiquidationThreshold && (!r.isIsolated && !l.isInIsolationMode || (null === (t = l.isolatedReserve) || void 0 === t ? void 0 : t.underlyingAsset) === r.underlyingAsset || r.isIsolated && "0" === l.totalCollateralMarketReferenceCurrency),
                        P = !x || "stETH" == r.symbol,
                        k = !x,
                        D = !x || p;
                    return (0, z.jsxs)(Oe, {
                        symbol: r.symbol,
                        iconSymbol: r.iconSymbol,
                        name: r.name,
                        detailsAddress: i,
                        currentMarket: m,
                        frozen: r.isFrozen,
                        "data-cy": "dashboardSuppliedListItem_".concat(r.symbol.toUpperCase(), "_").concat(Z && s ? "Collateral" : "NoCollateral"),
                        showSupplyCapTooltips: !0,
                        showDebtCeilingTooltips: !0,
                        children: [(0, z.jsx)(Ze, {
                            symbol: r.iconSymbol,
                            value: Number(o),
                            subValue: Number(a),
                            disabled: 0 === Number(o)
                        }), (0, z.jsx)(ue, {
                            value: Number(r.supplyAPY),
                            incentives: u,
                            symbol: r.symbol
                        }), (0, z.jsx)(O.h, {
                            children: (0, z.jsx)(Bt, {
                                isIsolated: c,
                                usageAsCollateralEnabledOnUser: s,
                                canBeEnabledAsCollateral: Z,
                                onToggleSwitch: function() {
                                    f(i, m, r.name, "dashboard", s)
                                },
                                "data-cy": "collateralStatus"
                            })
                        }), (0, z.jsxs)(K, {
                            children: [(0, z.jsx)(re.Z, {
                                disabled: k,
                                variant: "contained",
                                onClick: function() {
                                    y(i, m, r.name, "dashboard")
                                },
                                children: (0, z.jsx)(n.cC, {
                                    id: "Withdraw"
                                })
                            }), C ? (0, z.jsx)(re.Z, {
                                disabled: P,
                                variant: "outlined",
                                onClick: function() {
                                    A(B.vh.OPEN_MODAL, {
                                        modal: "Swap Collateral",
                                        market: m,
                                        assetName: r.name,
                                        asset: i
                                    }), g(i)
                                },
                                "data-cy": "swapButton",
                                children: (0, z.jsx)(n.cC, {
                                    id: "Switch"
                                })
                            }) : (0, z.jsx)(re.Z, {
                                disabled: D,
                                variant: "outlined",
                                onClick: function() {
                                    return j(i, m, r.name, "dashboard")
                                },
                                children: (0, z.jsx)(n.cC, {
                                    id: "Supply"
                                })
                            })]
                        })]
                    })
                },
                Tt = function(e) {
                    var t, r = e.reserve,
                        a = e.underlyingBalance,
                        s = e.underlyingBalanceUSD,
                        i = e.usageAsCollateralEnabledOnUser,
                        l = e.underlyingAsset,
                        c = (0, M.HT)().user,
                        d = (0, R.f)(),
                        u = d.currentMarketData,
                        p = d.currentMarket,
                        x = (0, ne.vR)(),
                        h = x.openSupply,
                        b = x.openSwap,
                        m = x.openWithdraw,
                        v = x.openCollateralChange,
                        j = (0, S.ov)().debtCeiling,
                        y = Pt.cr.liquiditySwap(u),
                        f = r.symbol,
                        g = r.iconSymbol,
                        w = r.name,
                        C = r.supplyAPY,
                        O = r.isIsolated,
                        A = r.aIncentivesData,
                        Z = r.isFrozen,
                        P = r.isActive,
                        k = !j.isMaxed && "0" !== r.reserveLiquidationThreshold && (!r.isIsolated && !c.isInIsolationMode || (null === (t = c.isolatedReserve) || void 0 === t ? void 0 : t.underlyingAsset) === r.underlyingAsset || r.isIsolated && "0" === c.totalCollateralMarketReferenceCurrency),
                        D = !P || "stETH" == r.symbol,
                        B = !P,
                        E = !P || Z;
                    return (0, z.jsxs)($.o, {
                        symbol: f,
                        iconSymbol: g,
                        name: w,
                        underlyingAsset: l,
                        currentMarket: p,
                        frozen: r.isFrozen,
                        showSupplyCapTooltips: !0,
                        showDebtCeilingTooltips: !0,
                        children: [(0, z.jsx)(ke, {
                            title: (0, z.jsx)(n.cC, {
                                id: "Supply balance"
                            }),
                            value: Number(a),
                            subValue: Number(s),
                            disabled: 0 === Number(a)
                        }), (0, z.jsx)(Q.X, {
                            caption: (0, z.jsx)(n.cC, {
                                id: "Supply APY"
                            }),
                            align: "flex-start",
                            captionVariant: "description",
                            mb: 2,
                            children: (0, z.jsx)(de.J, {
                                value: Number(C),
                                incentives: A,
                                symbol: f,
                                variant: "secondary14"
                            })
                        }), (0, z.jsx)(Q.X, {
                            caption: (0, z.jsx)(n.cC, {
                                id: "Used as collateral"
                            }),
                            align: O ? "flex-start" : "center",
                            captionVariant: "description",
                            mb: 2,
                            children: (0, z.jsx)(Bt, {
                                isIsolated: O,
                                usageAsCollateralEnabledOnUser: i,
                                canBeEnabledAsCollateral: k,
                                onToggleSwitch: function() {
                                    return v(l, p, r.name, "dashboard", i)
                                }
                            })
                        }), (0, z.jsxs)(o.Z, {
                            sx: {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                mt: 5
                            },
                            children: [(0, z.jsx)(re.Z, {
                                disabled: B,
                                variant: "contained",
                                onClick: function() {
                                    return m(l, p, r.name, "dashboard")
                                },
                                sx: {
                                    mr: 1.5
                                },
                                fullWidth: !0,
                                children: (0, z.jsx)(n.cC, {
                                    id: "Withdraw"
                                })
                            }), y ? (0, z.jsx)(re.Z, {
                                disabled: D,
                                variant: "outlined",
                                onClick: function() {
                                    return b(l)
                                },
                                fullWidth: !0,
                                children: (0, z.jsx)(n.cC, {
                                    id: "Switch"
                                })
                            }) : (0, z.jsx)(re.Z, {
                                disabled: E,
                                variant: "outlined",
                                onClick: function() {
                                    return h(l, p, r.name, "dashboard")
                                },
                                fullWidth: !0,
                                children: (0, z.jsx)(n.cC, {
                                    id: "Supply"
                                })
                            })]
                        })]
                    })
                };

            function Nt(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function It(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? Nt(Object(r), !0).forEach((function(t) {
                        (0, j.Z)(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Nt(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }
            var Mt = [{
                    title: (0, z.jsx)(n.cC, {
                        id: "Asset"
                    }),
                    sortKey: "symbol"
                }, {
                    title: (0, z.jsx)(n.cC, {
                        id: "Balance"
                    }, "Balance"),
                    sortKey: "underlyingBalance"
                }, {
                    title: (0, z.jsx)(n.cC, {
                        id: "APY"
                    }, "APY"),
                    sortKey: "supplyAPY"
                }, {
                    title: (0, z.jsx)(ft, {
                        event: {
                            eventName: B.vh.TOOL_TIP,
                            eventParams: {
                                tooltip: "Collateral Switch"
                            }
                        },
                        text: (0, z.jsx)(n.cC, {
                            id: "Collateral"
                        }),
                        variant: "subheader2"
                    }, "Collateral"),
                    sortKey: "usageAsCollateralEnabledOnUser"
                }],
                Rt = function() {
                    var e = (0, M.HT)(),
                        t = e.user,
                        r = e.loading,
                        o = (0, R.f)().currentNetworkConfig,
                        i = (0, m.Z)(),
                        l = (0, v.Z)(i.breakpoints.down("xsm")),
                        c = (0, s.useState)(""),
                        d = c[0],
                        u = c[1],
                        p = (0, s.useState)(!1),
                        x = p[0],
                        h = p[1],
                        b = (0, s.useState)(!1),
                        j = b[0],
                        f = b[1],
                        g = (null === t || void 0 === t ? void 0 : t.userReservesData.filter((function(e) {
                            return "0" !== e.underlyingBalance
                        })).map((function(e) {
                            return It(It({}, e), {}, {
                                supplyAPY: e.reserve.supplyAPY,
                                reserve: It(It({}, e.reserve), e.reserve.isWrappedBaseAsset ? (0, D.QD)({
                                    symbol: o.baseAssetSymbol,
                                    underlyingAsset: y.hP.toLowerCase()
                                }) : {})
                            })
                        }))) || [],
                        w = Y(x, d, "position", g),
                        C = function() {
                            return (0, z.jsxs)(Z.u, {
                                children: [Mt.map((function(e) {
                                    return (0, z.jsx)(O.h, {
                                        isRow: "symbol" === e.sortKey,
                                        maxWidth: "symbol" === e.sortKey ? U : void 0,
                                        children: (0, z.jsx)(A.M, {
                                            sortName: d,
                                            sortDesc: x,
                                            setSortName: u,
                                            setSortDesc: h,
                                            sortKey: e.sortKey,
                                            source: "Supplied Positions Dashboard",
                                            children: e.title
                                        })
                                    }, e.sortKey)
                                })), (0, z.jsx)(K, {
                                    isColumnHeader: !0
                                })]
                            })
                        };
                    return r ? (0, z.jsx)(te, {
                        title: (0, z.jsx)(n.cC, {
                            id: "Your supplies"
                        }),
                        head: Mt.map((function(e) {
                            return e.title
                        }))
                    }) : (0, z.jsx)(N.l, {
                        tooltipOpen: j,
                        titleComponent: (0, z.jsx)(a.Z, {
                            component: "div",
                            variant: "h3",
                            sx: {
                                mr: 4
                            },
                            children: (0, z.jsx)(n.cC, {
                                id: "Your supplies"
                            })
                        }),
                        localStorageName: "suppliedAssetsDashboardTableCollapse",
                        noData: !w.length,
                        topInfo: (0, z.jsx)(z.Fragment, {
                            children: !!w.length && (0, z.jsxs)(z.Fragment, {
                                children: [(0, z.jsx)(tt, {
                                    title: (0, z.jsx)(n.cC, {
                                        id: "Balance"
                                    }),
                                    value: (null === t || void 0 === t ? void 0 : t.totalLiquidityUSD) || 0
                                }), (0, z.jsx)(tt, {
                                    title: (0, z.jsx)(n.cC, {
                                        id: "APY"
                                    }),
                                    value: (null === t || void 0 === t ? void 0 : t.earnedAPY) || 0,
                                    percent: !0,
                                    tooltip: (0, z.jsx)(Zt, {
                                        setOpen: f,
                                        event: {
                                            eventName: B.vh.TOOL_TIP,
                                            eventParams: {
                                                tooltip: "Total Supplied APY"
                                            }
                                        }
                                    })
                                }), (0, z.jsx)(tt, {
                                    title: (0, z.jsx)(n.cC, {
                                        id: "Collateral"
                                    }),
                                    value: (null === t || void 0 === t ? void 0 : t.totalCollateralUSD) || 0,
                                    tooltip: (0, z.jsx)(Ct, {
                                        setOpen: f,
                                        event: {
                                            eventName: B.vh.TOOL_TIP,
                                            eventParams: {
                                                tooltip: "Total Supplied Collateral"
                                            }
                                        }
                                    })
                                })]
                            })
                        }),
                        children: w.length ? (0, z.jsxs)(z.Fragment, {
                            children: [!l && (0, z.jsx)(C, {}), w.map((function(e) {
                                return (0, z.jsx)(s.Fragment, {
                                    children: (0, z.jsx)(S.hv, {
                                        asset: e.reserve,
                                        children: l ? (0, z.jsx)(Tt, It({}, e)) : (0, z.jsx)(Et, It({}, e))
                                    })
                                }, e.underlyingAsset)
                            }))]
                        }) : (0, z.jsx)(Fe.N, {
                            text: (0, z.jsx)(n.cC, {
                                id: "Nothing supplied yet"
                            })
                        })
                    })
                },
                Ut = r(44431),
                _t = r.n(Ut),
                Lt = r(82482),
                Yt = r(22841),
                Vt = r(75158),
                Ft = r(41528),
                Wt = function() {
                    var e = (0, R.f)().currentNetworkConfig;
                    return (0, z.jsx)(Ft.y, {
                        title: "Get free assets to test the Aave Protocol",
                        children: (0, z.jsx)(re.Z, {
                            startIcon: (0, z.jsx)("img", {
                                src: e.networkLogoPath,
                                alt: e.name,
                                style: {
                                    width: 14,
                                    height: 14
                                }
                            }),
                            endIcon: (0, z.jsx)(se.Z, {
                                sx: {
                                    width: 14,
                                    height: 14
                                },
                                children: (0, z.jsx)(st.Z, {})
                            }),
                            component: I.rU,
                            href: I.Z6.faucet,
                            variant: "outlined",
                            size: "small",
                            children: (0, z.jsx)(a.Z, {
                                variant: "buttonS",
                                children: (0, z.jsx)(n.cC, {
                                    id: "{0} Faucet",
                                    values: {
                                        0: e.name
                                    }
                                })
                            })
                        })
                    })
                },
                Ht = function(e) {
                    var t = e.bridge;
                    return t ? (0, z.jsx)(re.Z, {
                        startIcon: (0, z.jsx)("img", {
                            src: t.icon,
                            alt: t.name,
                            style: {
                                width: 14,
                                height: 14
                            }
                        }),
                        endIcon: (0, z.jsx)(se.Z, {
                            sx: {
                                width: 14,
                                height: 14
                            },
                            children: (0, z.jsx)(st.Z, {})
                        }),
                        component: I.rU,
                        size: "small",
                        variant: "outlined",
                        href: t.url || "",
                        children: (0, z.jsx)(a.Z, {
                            variant: "buttonS",
                            children: t.name
                        })
                    }) : null
                },
                zt = r(92381),
                Kt = function(e) {
                    var t = e.value,
                        r = e.onClick,
                        a = e.localStorageName,
                        s = e.bridge,
                        i = (0, d.Yh)((function(e) {
                            return e.trackEvent
                        }));
                    return (0, z.jsxs)(o.Z, {
                        sx: {
                            display: "flex",
                            alignItems: {
                                xs: "flex-start",
                                xsm: "center"
                            },
                            justifyContent: "space-between",
                            flexDirection: {
                                xs: "column-reverse",
                                xsm: "row"
                            },
                            px: {
                                xs: 4,
                                xsm: 6
                            },
                            py: 2,
                            pl: {
                                xs: "18px",
                                xsm: "27px"
                            }
                        },
                        children: [(0, z.jsx)(Yt.Z, {
                            sx: {
                                mt: {
                                    xs: s ? 2 : 0,
                                    xsm: 0
                                }
                            },
                            control: (0, z.jsx)(Vt.Z, {
                                sx: {
                                    p: "6px"
                                }
                            }),
                            checked: t,
                            onChange: function() {
                                i(B.h1.SHOW_ASSETS_0_BALANCE, {}), (0, zt.e)(t, r, a)
                            },
                            label: (0, z.jsx)(n.cC, {
                                id: "Show assets with 0 balance"
                            })
                        }), (Pt.aV || Pt.p8) && (0, z.jsx)(Wt, {}), !Pt.p8 && (0, z.jsx)(Ht, {
                            bridge: s
                        })]
                    })
                },
                qt = r(14463),
                Xt = r(13902),
                Gt = function(e) {
                    var t = e.isIsolated,
                        r = e.usageAsCollateralEnabled,
                        n = function() {
                            return r && !t ? (0, z.jsx)(se.Z, {
                                sx: {
                                    color: "success.main",
                                    fontSize: {
                                        xs: "20px",
                                        xsm: "24px"
                                    }
                                },
                                children: (0, z.jsx)(at.Z, {})
                            }) : r && t ? (0, z.jsx)(se.Z, {
                                sx: {
                                    color: "warning.main",
                                    fontSize: {
                                        xs: "20px",
                                        xsm: "24px"
                                    }
                                },
                                children: (0, z.jsx)(Xt.Z, {})
                            }) : (0, z.jsx)(qt.J, {
                                variant: "main14",
                                color: "text.secondary"
                            })
                        };
                    return (0, z.jsx)(o.Z, {
                        sx: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        },
                        children: t ? (0, z.jsx)(Dt, {
                            children: (0, z.jsx)(n, {})
                        }) : (0, z.jsx)(n, {})
                    })
                },
                Jt = function(e) {
                    var t = e.symbol,
                        r = e.iconSymbol,
                        o = e.name,
                        a = e.walletBalance,
                        s = e.walletBalanceUSD,
                        i = e.supplyCap,
                        l = e.totalLiquidity,
                        c = e.supplyAPY,
                        u = e.aIncentivesData,
                        p = e.underlyingAsset,
                        x = e.isActive,
                        h = e.isFreezed,
                        b = e.isIsolated,
                        m = e.usageAsCollateralEnabledOnUser,
                        v = e.detailsAddress,
                        j = (0, R.f)().currentMarket,
                        y = (0, ne.vR)().openSupply,
                        f = (0, S.ov)(),
                        g = f.supplyCap,
                        w = f.debtCeiling,
                        C = g.isMaxed,
                        A = (0, d.Yh)((function(e) {
                            return e.trackEvent
                        })),
                        Z = !x || h || Number(a) <= 0 || C;
                    return (0, z.jsxs)(Oe, {
                        symbol: t,
                        iconSymbol: r,
                        name: o,
                        detailsAddress: v,
                        "data-cy": "dashboardSupplyListItem_".concat(t.toUpperCase()),
                        currentMarket: j,
                        showDebtCeilingTooltips: !0,
                        children: [(0, z.jsx)(Ze, {
                            symbol: t,
                            value: Number(a),
                            subValue: s,
                            withTooltip: !0,
                            disabled: 0 === Number(a) || C,
                            capsComponent: (0, z.jsx)(ce, {
                                capType: E.R.supplyCap,
                                capAmount: i,
                                totalAmount: l,
                                withoutText: !0
                            })
                        }), (0, z.jsx)(ue, {
                            value: Number(c),
                            incentives: u,
                            symbol: t
                        }), (0, z.jsx)(O.h, {
                            children: w.isMaxed ? (0, z.jsx)(qt.J, {
                                variant: "main14",
                                color: "text.secondary"
                            }) : (0, z.jsx)(Gt, {
                                isIsolated: b,
                                usageAsCollateralEnabled: m
                            })
                        }), (0, z.jsxs)(K, {
                            children: [(0, z.jsx)(re.Z, {
                                disabled: Z,
                                variant: "contained",
                                onClick: function() {
                                    y(p, j, o, "dashboard")
                                },
                                children: (0, z.jsx)(n.cC, {
                                    id: "Supply"
                                })
                            }), (0, z.jsx)(re.Z, {
                                variant: "outlined",
                                component: I.rU,
                                href: I.Z6.reserveOverview(v, j),
                                onClick: function() {
                                    A(B.h1.DETAILS_NAVIGATION, {
                                        type: "Button",
                                        market: j,
                                        assetName: o,
                                        asset: p
                                    })
                                },
                                children: (0, z.jsx)(n.cC, {
                                    id: "Details"
                                })
                            })]
                        })]
                    })
                },
                Qt = function(e) {
                    var t = e.symbol,
                        r = e.iconSymbol,
                        a = e.name,
                        s = e.walletBalance,
                        i = e.walletBalanceUSD,
                        l = e.supplyCap,
                        c = e.totalLiquidity,
                        d = e.supplyAPY,
                        u = e.aIncentivesData,
                        p = e.isIsolated,
                        x = e.usageAsCollateralEnabledOnUser,
                        h = e.isActive,
                        b = e.isFreezed,
                        m = e.underlyingAsset,
                        v = e.detailsAddress,
                        j = (0, R.f)().currentMarket,
                        y = (0, ne.vR)().openSupply,
                        f = (0, S.ov)().supplyCap.isMaxed,
                        g = !h || b || Number(s) <= 0 || f;
                    return (0, z.jsxs)($.o, {
                        symbol: t,
                        iconSymbol: r,
                        name: a,
                        underlyingAsset: m,
                        currentMarket: j,
                        showDebtCeilingTooltips: !0,
                        children: [(0, z.jsx)(ke, {
                            title: (0, z.jsx)(n.cC, {
                                id: "Supply balance"
                            }),
                            value: Number(s),
                            subValue: i,
                            disabled: 0 === Number(s) || f,
                            capsComponent: (0, z.jsx)(ce, {
                                capType: E.R.supplyCap,
                                capAmount: l,
                                totalAmount: c,
                                withoutText: !0
                            })
                        }), (0, z.jsx)(Q.X, {
                            caption: (0, z.jsx)(n.cC, {
                                id: "Supply APY"
                            }),
                            align: "flex-start",
                            captionVariant: "description",
                            mb: 2,
                            children: (0, z.jsx)(de.J, {
                                value: Number(d),
                                incentives: u,
                                symbol: t,
                                variant: "secondary14"
                            })
                        }), (0, z.jsx)(Q.X, {
                            caption: (0, z.jsx)(n.cC, {
                                id: "Can be collateral"
                            }),
                            align: "flex-start",
                            captionVariant: "description",
                            mb: 2,
                            children: (0, z.jsx)(Gt, {
                                isIsolated: p,
                                usageAsCollateralEnabled: x
                            })
                        }), (0, z.jsxs)(o.Z, {
                            sx: {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                mt: 5
                            },
                            children: [(0, z.jsx)(re.Z, {
                                disabled: g,
                                variant: "contained",
                                onClick: function() {
                                    return y(m, j, a, "dashboard")
                                },
                                sx: {
                                    mr: 1.5
                                },
                                fullWidth: !0,
                                children: (0, z.jsx)(n.cC, {
                                    id: "Supply"
                                })
                            }), (0, z.jsx)(re.Z, {
                                variant: "outlined",
                                component: I.rU,
                                href: I.Z6.reserveOverview(v, j),
                                fullWidth: !0,
                                children: (0, z.jsx)(n.cC, {
                                    id: "Details"
                                })
                            })]
                        })]
                    })
                },
                $t = r(54373);

            function er(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function tr(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? er(Object(r), !0).forEach((function(t) {
                        (0, j.Z)(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : er(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }
            var rr = [{
                    title: (0, z.jsx)(n.cC, {
                        id: "Assets"
                    }, "assets"),
                    sortKey: "symbol"
                }, {
                    title: (0, z.jsx)(n.cC, {
                        id: "Wallet balance"
                    }, "Wallet balance"),
                    sortKey: "walletBalance"
                }, {
                    title: (0, z.jsx)(n.cC, {
                        id: "APY"
                    }, "APY"),
                    sortKey: "supplyAPY"
                }, {
                    title: (0, z.jsx)(n.cC, {
                        id: "Can be collateral"
                    }, "Can be collateral"),
                    sortKey: "usageAsCollateralEnabledOnUser"
                }],
                nr = function() {
                    var e = (0, R.f)(),
                        t = e.currentNetworkConfig,
                        r = e.currentChainId,
                        i = e.currentMarketData,
                        l = (0, M.HT)(),
                        c = l.user,
                        d = l.reserves,
                        u = l.marketReferencePriceInUsd,
                        p = l.loading,
                        x = (0, Lt.P)(),
                        h = x.walletBalances,
                        b = x.loading,
                        j = (0, m.Z)(),
                        w = (0, v.Z)(j.breakpoints.down("xsm")),
                        C = (0, s.useState)(""),
                        B = C[0],
                        E = C[1],
                        T = (0, s.useState)(!1),
                        _ = T[0],
                        L = T[1],
                        V = t.bridge,
                        F = t.isTestnet,
                        W = t.baseAssetSymbol,
                        H = t.name,
                        q = "showSupplyZeroAssets",
                        X = (0, s.useState)("true" === localStorage.getItem(q)),
                        G = X[0],
                        J = X[1],
                        Q = d.filter((function(e) {
                            return !(e.isFrozen || e.isPaused)
                        })).map((function(e) {
                            var t, r, n = null === (t = h[e.underlyingAsset]) || void 0 === t ? void 0 : t.amount,
                                o = null === (r = h[e.underlyingAsset]) || void 0 === r ? void 0 : r.amountUSD,
                                a = (0, f.hE)(n);
                            "0" !== e.supplyCap && (a = _t().min(a, new(_t())(e.supplyCap).minus(e.totalLiquidity).multipliedBy("0.995")));
                            var s = (0, f.hE)(a).multipliedBy(e.priceInMarketReferenceCurrency).multipliedBy(u).shiftedBy(-g.$3).toString(),
                                i = e.isIsolated,
                                l = null === c || void 0 === c ? void 0 : c.userReservesData.find((function(t) {
                                    return t.usageAsCollateralEnabledOnUser && t.reserve.id !== e.id
                                })),
                                d = null !== c && void 0 !== c && c.isInIsolationMode ? !!i && !l : "0" !== e.reserveLiquidationThreshold && (!i || i && !l);
                            if (e.isWrappedBaseAsset) {
                                var p, x, b, m = (0, f.hE)(null === (p = h[y.hP.toLowerCase()]) || void 0 === p ? void 0 : p.amount);
                                "0" !== e.supplyCap && (m = _t().min(m, new(_t())(e.supplyCap).minus(e.totalLiquidity).multipliedBy("0.995")));
                                var v = (0, f.hE)(m).multipliedBy(e.priceInMarketReferenceCurrency).multipliedBy(u).shiftedBy(-g.$3).toString();
                                return [tr(tr(tr({}, e), {}, {
                                    reserve: e,
                                    underlyingAsset: y.hP.toLowerCase()
                                }, (0, D.QD)({
                                    symbol: W,
                                    underlyingAsset: y.hP.toLowerCase()
                                })), {}, {
                                    walletBalance: null === (x = h[y.hP.toLowerCase()]) || void 0 === x ? void 0 : x.amount,
                                    walletBalanceUSD: null === (b = h[y.hP.toLowerCase()]) || void 0 === b ? void 0 : b.amountUSD,
                                    availableToDeposit: m.toString(),
                                    availableToDepositUSD: v,
                                    usageAsCollateralEnabledOnUser: d,
                                    detailsAddress: e.underlyingAsset,
                                    id: e.id + "base"
                                }), tr(tr({}, e), {}, {
                                    reserve: e,
                                    walletBalance: n,
                                    walletBalanceUSD: o,
                                    availableToDeposit: a.toNumber() <= 0 ? "0" : a.toString(),
                                    availableToDepositUSD: Number(s) <= 0 ? "0" : s.toString(),
                                    usageAsCollateralEnabledOnUser: d,
                                    detailsAddress: e.underlyingAsset
                                })]
                            }
                            return tr(tr({}, e), {}, {
                                reserve: e,
                                walletBalance: n,
                                walletBalanceUSD: o,
                                availableToDeposit: a.toNumber() <= 0 ? "0" : a.toString(),
                                availableToDepositUSD: Number(s) <= 0 ? "0" : s.toString(),
                                usageAsCollateralEnabledOnUser: d,
                                detailsAddress: e.underlyingAsset
                            })
                        })).flat(),
                        $ = Q.sort((function(e, t) {
                            return +e.walletBalanceUSD > +t.walletBalanceUSD ? -1 : 1
                        })),
                        ee = $.filter((function(e) {
                            return "0" !== e.availableToDepositUSD
                        })),
                        re = G ? $ : ee.length >= 1 ? ee : $,
                        ne = Y(_, B, "assets", re),
                        oe = function() {
                            return (0, z.jsxs)(Z.u, {
                                children: [rr.map((function(e) {
                                    return (0, z.jsx)(O.h, {
                                        isRow: "symbol" === e.sortKey,
                                        maxWidth: "symbol" === e.sortKey ? U : void 0,
                                        overFlow: "visible",
                                        children: (0, z.jsx)(A.M, {
                                            sortName: B,
                                            sortDesc: _,
                                            setSortName: E,
                                            setSortDesc: L,
                                            sortKey: e.sortKey,
                                            source: "Supplies Dashbaord",
                                            children: e.title
                                        })
                                    }, e.sortKey)
                                })), (0, z.jsx)(K, {
                                    isColumnHeader: !0
                                })]
                            })
                        };
                    if (p || b) return (0, z.jsx)(te, {
                        head: rr.map((function(e) {
                            return e.title
                        })),
                        title: (0, z.jsx)(n.cC, {
                            id: "Assets to supply"
                        }),
                        withTopMargin: !0
                    });
                    var ae = !Q.length;
                    return (0, z.jsx)(N.l, {
                        titleComponent: (0, z.jsx)(a.Z, {
                            component: "div",
                            variant: "h3",
                            sx: {
                                mr: 4
                            },
                            children: (0, z.jsx)(n.cC, {
                                id: "Assets to supply"
                            })
                        }),
                        localStorageName: "supplyAssetsDashboardTableCollapse",
                        withTopMargin: !0,
                        noData: ae,
                        subChildrenComponent: (0, z.jsxs)(z.Fragment, {
                            children: [(0, z.jsx)(o.Z, {
                                sx: {
                                    px: 6
                                },
                                children: ae && "Harmony" === t.name ? (0, z.jsx)(k.C, {
                                    marketName: "Harmony"
                                }) : ae && "Fantom" === t.name ? (0, z.jsx)(k.C, {
                                    marketName: "Fantom"
                                }) : ae && "Ethereum AMM" === i.marketTitle ? (0, z.jsx)(k.C, {
                                    marketName: "Ethereum AMM"
                                }) : null !== c && void 0 !== c && c.isInIsolationMode ? (0, z.jsx)(P.v, {
                                    severity: "warning",
                                    children: (0, z.jsx)(n.cC, {
                                        id: "Collateral usage is limited because of isolation mode. <0>Learn More</0>",
                                        components: {
                                            0: (0, z.jsx)(I.rU, {
                                                href: "https://docs.aave.com/faq/",
                                                target: "_blank",
                                                rel: "noopener"
                                            })
                                        }
                                    })
                                }) : 0 === ee.length && (F ? (0, z.jsxs)(P.v, {
                                    severity: "info",
                                    children: [(0, z.jsx)(n.cC, {
                                        id: "Your {networkName} wallet is empty. Get free test assets at",
                                        values: {
                                            networkName: H
                                        }
                                    }), " ", (0, z.jsx)(I.rU, {
                                        href: I.Z6.faucet,
                                        style: {
                                            fontWeight: 400
                                        },
                                        children: (0, z.jsx)(n.cC, {
                                            id: "{networkName} Faucet",
                                            values: {
                                                networkName: H
                                            }
                                        })
                                    })]
                                }) : (0, z.jsx)($t.K, {
                                    name: H,
                                    bridge: V,
                                    chainId: r
                                }))
                            }), ee.length >= 1 && (0, z.jsx)(Kt, {
                                value: G,
                                onClick: J,
                                localStorageName: q,
                                bridge: V
                            })]
                        }),
                        children: (0, z.jsxs)(z.Fragment, {
                            children: [!w && !!ne && !ae && (0, z.jsx)(oe, {}), ne.map((function(e) {
                                return (0, z.jsx)(s.Fragment, {
                                    children: (0, z.jsx)(S.hv, {
                                        asset: e.reserve,
                                        children: w ? (0, s.createElement)(Qt, tr(tr({}, e), {}, {
                                            key: e.id
                                        })) : (0, s.createElement)(Jt, tr(tr({}, e), {}, {
                                            key: e.id
                                        }))
                                    })
                                }, e.underlyingAsset)
                            }))]
                        })
                    })
                },
                or = function(e) {
                    var t = e.isBorrow,
                        r = (0, m.Z)().breakpoints,
                        n = (0, d.Yh)((function(e) {
                            return e.currentMarketData
                        })),
                        a = (0, v.Z)(r.up("lg")),
                        s = a ? "calc(50% - 8px)" : "100%";
                    return (0, z.jsxs)(o.Z, {
                        children: [n.chainId === b.a_.polygon && !n.v3, (0, z.jsxs)(o.Z, {
                            sx: {
                                display: a ? "flex" : "block",
                                justifyContent: "space-between",
                                alignItems: "flex-start"
                            },
                            children: [(0, z.jsxs)(o.Z, {
                                sx: {
                                    display: {
                                        xs: t ? "none" : "block",
                                        lg: "block"
                                    },
                                    width: s
                                },
                                children: [(0, z.jsx)(Rt, {}), (0, z.jsx)(nr, {})]
                            }), (0, z.jsxs)(o.Z, {
                                sx: {
                                    display: {
                                        xs: t ? "block" : "none",
                                        lg: "block"
                                    },
                                    width: s
                                },
                                children: [(0, z.jsx)(vt, {}), (0, z.jsx)(Te, {})]
                            })]
                        })]
                    })
                },
                ar = r(41664);

            function sr(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function ir(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? sr(Object(r), !0).forEach((function(t) {
                        (0, j.Z)(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : sr(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }
            var lr, cr = function(e) {
                    var t = (0, Ie.Z)({}, e);
                    return (0, z.jsx)(Me.G, ir(ir({}, t), {}, {
                        children: (0, z.jsx)(n.cC, {
                            id: "Net APY is the combined effect of all supply and borrow positions on net worth, including incentives. It is possible to have a negative net APY if debt APY is higher than supply APY."
                        })
                    }))
                },
                dr = r(25563),
                ur = r(40535),
                pr = r(67728);

            function xr() {
                return xr = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, xr.apply(this, arguments)
            }
            var hr, br = function(e) {
                return s.createElement("svg", xr({
                    width: 24,
                    height: 24,
                    viewBox: "0 0 24 24",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    role: "img"
                }, e), lr || (lr = s.createElement("path", {
                    d: "M4.222 12v7.778A2.222 2.222 0 0 0 6.444 22h11.112a2.222 2.222 0 0 0 2.222-2.222V12M12 7.556V22 7.556Zm0 0V5.333a2.222 2.222 0 1 1 2.222 2.223H12Zm0 0V4.778a2.778 2.778 0 1 0-2.778 2.778H12ZM4.222 12h15.556H4.222Zm0 0a2.222 2.222 0 1 1 0-4.444h15.556a2.222 2.222 0 0 1 0 4.444H4.222Z",
                    stroke: "#A5A8B6",
                    strokeWidth: 1.5,
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                })))
            };

            function mr() {
                return mr = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, mr.apply(this, arguments)
            }
            var vr, jr = function(e) {
                return s.createElement("svg", mr({
                    width: 22,
                    height: 19,
                    viewBox: "0 0 22 19",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    role: "img"
                }, e), hr || (hr = s.createElement("path", {
                    d: "M2.464 2.458A4.978 4.978 0 0 0 1 5.98 4.961 4.961 0 0 0 2.464 9.5L11 18l8.535-8.5a4.969 4.969 0 0 0 0-7.042 5.01 5.01 0 0 0-7.071 0L11 3.917 9.536 2.458A5.001 5.001 0 0 0 6 1a5.018 5.018 0 0 0-3.536 1.458v0Z",
                    stroke: "#A5A8B6",
                    strokeWidth: 1.5,
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                })))
            };

            function yr() {
                return yr = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, yr.apply(this, arguments)
            }
            var fr, gr, wr, Cr = function(e) {
                return s.createElement("svg", yr({
                    width: 24,
                    height: 24,
                    viewBox: "0 0 24 24",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    role: "img"
                }, e), vr || (vr = s.createElement("path", {
                    d: "M8.667 19.778V13.11a2.222 2.222 0 0 0-2.223-2.222H4.222A2.222 2.222 0 0 0 2 13.11v6.667A2.222 2.222 0 0 0 4.222 22h2.222a2.222 2.222 0 0 0 2.223-2.222Zm0 0V8.667a2.222 2.222 0 0 1 2.222-2.223h2.222a2.222 2.222 0 0 1 2.222 2.223v11.11m-6.666 0A2.222 2.222 0 0 0 10.889 22h2.222a2.222 2.222 0 0 0 2.222-2.222m0 0V4.222A2.222 2.222 0 0 1 17.556 2h2.222A2.222 2.222 0 0 1 22 4.222v15.556A2.222 2.222 0 0 1 19.778 22h-2.222a2.222 2.222 0 0 1-2.223-2.222Z",
                    stroke: "#A5A8B6",
                    strokeWidth: 1.5,
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                })))
            };

            function Or() {
                return Or = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, Or.apply(this, arguments)
            }
            var Ar, Zr, Pr, kr, Sr, Dr = function(e) {
                    return s.createElement("svg", Or({
                        width: 20,
                        height: 19,
                        viewBox: "0 0 20 19",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        role: "img"
                    }, e), fr || (fr = s.createElement("path", {
                        d: "M17 17.398H3a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2Z",
                        stroke: "#A5A8B6",
                        strokeWidth: 1.5
                    })), gr || (gr = s.createElement("path", {
                        d: "M14.5 11.398a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Z",
                        stroke: "#A5A8B6",
                        strokeWidth: 1.5,
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                    })), wr || (wr = s.createElement("path", {
                        d: "M16 4.398V3a2 2 0 0 0-2.515-1.932l-11 2.933A2 2 0 0 0 1 5.934v.464",
                        stroke: "#A5A8B6",
                        strokeWidth: 1.5
                    })))
                },
                Br = r(81719),
                Er = r(58402),
                Tr = r(20525),
                Nr = r(9144),
                Ir = r(68346);

            function Mr() {
                return Mr = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, Mr.apply(this, arguments)
            }
            var Rr, Ur, _r, Lr, Yr, Vr = function(e) {
                return s.createElement("svg", Mr({
                    viewBox: "0 0 16 16",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    role: "img"
                }, e), Ar || (Ar = s.createElement("path", {
                    d: "M8.05 6.283a1.21 1.21 0 1 0 0-2.42 1.21 1.21 0 0 0 0 2.42Z",
                    fill: "#A5A8B6"
                })), Zr || (Zr = s.createElement("path", {
                    d: "M0 3.258v3.644c0 .465.478.76.887.577l4.137-1.885A.634.634 0 0 0 5.01 4.44L.887 2.667a.64.64 0 0 0-.887.59Z",
                    fill: "url(#HAL_svg__a)"
                })), Pr || (Pr = s.createElement("path", {
                    d: "M16 6.902V3.258a.63.63 0 0 0-.887-.577l-4.137 1.885a.633.633 0 0 0 .014 1.154l4.137 1.773a.638.638 0 0 0 .873-.59Z",
                    fill: "url(#HAL_svg__b)"
                })), kr || (kr = s.createElement("path", {
                    d: "M9.935 2.582c.38 0 .619-.31.506-.675C10.131.837 9.175.063 8.035.063c-1.14 0-2.097.774-2.406 1.844-.113.366.126.675.506.675h3.8ZM5.263 8.225l-1.238 6.74a.818.818 0 0 0 .802.972h6.43a.812.812 0 0 0 .803-.971L10.78 8.21a.815.815 0 0 0-.803-.675l-3.926.014a.811.811 0 0 0-.788.675Z",
                    fill: "#A5A8B6"
                })), Sr || (Sr = s.createElement("defs", null, s.createElement("linearGradient", {
                    id: "HAL_svg__a",
                    x1: 0,
                    y1: 5.077,
                    x2: 5.403,
                    y2: 5.077,
                    gradientUnits: "userSpaceOnUse"
                }, s.createElement("stop", {
                    stopColor: "#A5A8B6",
                    stopOpacity: 0
                }), s.createElement("stop", {
                    offset: 1,
                    stopColor: "#A5A8B6"
                })), s.createElement("linearGradient", {
                    id: "HAL_svg__b",
                    x1: 16,
                    y1: 5.083,
                    x2: 10.597,
                    y2: 5.083,
                    gradientUnits: "userSpaceOnUse"
                }, s.createElement("stop", {
                    stopColor: "#A5A8B6",
                    stopOpacity: 0
                }), s.createElement("stop", {
                    offset: 1,
                    stopColor: "#A5A8B6"
                })))))
            };

            function Fr() {
                return Fr = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, Fr.apply(this, arguments)
            }
            var Wr = function(e) {
                return s.createElement("svg", Fr({
                    viewBox: "0 0 16 16",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    role: "img"
                }, e), Rr || (Rr = s.createElement("path", {
                    d: "M8.05 6.283a1.21 1.21 0 1 0 0-2.42 1.21 1.21 0 0 0 0 2.42Z",
                    fill: "#FFFEFF"
                })), Ur || (Ur = s.createElement("path", {
                    d: "M0 3.258v3.644c0 .465.478.76.887.577l4.137-1.885A.634.634 0 0 0 5.01 4.44L.887 2.667a.64.64 0 0 0-.887.59Z",
                    fill: "url(#HALHover_svg__a)"
                })), _r || (_r = s.createElement("path", {
                    d: "M16 6.902V3.258a.63.63 0 0 0-.887-.577l-4.137 1.885a.633.633 0 0 0 .014 1.154l4.137 1.773a.638.638 0 0 0 .873-.59Z",
                    fill: "url(#HALHover_svg__b)"
                })), Lr || (Lr = s.createElement("path", {
                    d: "M9.935 2.582c.38 0 .619-.31.506-.675C10.131.837 9.175.063 8.035.063c-1.14 0-2.097.774-2.406 1.844-.113.366.126.675.506.675h3.8ZM5.263 8.225l-1.238 6.74a.818.818 0 0 0 .802.972h6.43a.812.812 0 0 0 .803-.971L10.78 8.21a.814.814 0 0 0-.803-.675l-3.926.014a.811.811 0 0 0-.788.675Z",
                    fill: "#FEFF3D"
                })), Yr || (Yr = s.createElement("defs", null, s.createElement("linearGradient", {
                    id: "HALHover_svg__a",
                    x1: 0,
                    y1: 5.077,
                    x2: 5.403,
                    y2: 5.077,
                    gradientUnits: "userSpaceOnUse"
                }, s.createElement("stop", {
                    stopColor: "#fff",
                    stopOpacity: 0
                }), s.createElement("stop", {
                    offset: 1,
                    stopColor: "#fff"
                })), s.createElement("linearGradient", {
                    id: "HALHover_svg__b",
                    x1: 16,
                    y1: 5.083,
                    x2: 10.597,
                    y2: 5.083,
                    gradientUnits: "userSpaceOnUse"
                }, s.createElement("stop", {
                    stopColor: "#fff",
                    stopOpacity: 0
                }), s.createElement("stop", {
                    offset: 1,
                    stopColor: "#fff"
                })))))
            };

            function Hr(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function zr(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? Hr(Object(r), !0).forEach((function(t) {
                        (0, j.Z)(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Hr(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }
            var Kr = (0, Br.ZP)(Er.Z)((0, Tr.Z)({
                    ".MuiTooltip-tooltip": {
                        color: "text.primary",
                        backgroundColor: "background.paper",
                        p: 0,
                        borderRadius: "6px",
                        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)",
                        maxWidth: "300px"
                    },
                    ".MuiTooltip-arrow": {
                        color: "background.paper",
                        "&:before": {
                            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)"
                        }
                    }
                })),
                qr = {
                    fontSize: "14px",
                    zIndex: 2,
                    position: "absolute",
                    left: 5,
                    transition: "all 0.2s easy"
                };

            function Xr(e) {
                var t = e.healthFactor,
                    r = e.marketName,
                    o = e.integrationURL,
                    i = (0, h.Z)().currentAccount,
                    l = (0, d.Yh)((function(e) {
                        return e.trackEvent
                    })),
                    c = (0, s.useMemo)((function() {
                        var e = (0, f.hE)(t).toFixed(2, _t().ROUND_DOWN),
                            n = new URL(o);
                        return n.searchParams.set("user", i), n.searchParams.set("healthfactor", e), n.searchParams.set("chain", r), n.searchParams.set("aaveversion", r), n.searchParams.set("utm_source", "aave-integration"), n.toString()
                    }), [i, t, r, o]);
                return (0, z.jsx)(xe.Z, {
                    arrow: !0,
                    placement: "top",
                    PopperComponent: Kr,
                    title: (0, z.jsxs)(Nr.Z, {
                        sx: {
                            py: 4,
                            px: 6
                        },
                        spacing: 1,
                        children: [(0, z.jsx)(a.Z, {
                            variant: "tooltip",
                            color: "text.secondary",
                            fontWeight: 500,
                            children: (0, z.jsx)(n.cC, {
                                id: "Setup notifications about your Health Factor using the Hal app."
                            })
                        }), (0, z.jsx)(a.Z, {
                            variant: "tooltip",
                            color: "text.secondary",
                            fontWeight: 500,
                            children: (0, z.jsx)(n.cC, {
                                id: "This integration was<0>proposed and approved</0>by the community.",
                                components: {
                                    0: (0, z.jsx)(Ir.Z, {
                                        mx: 1,
                                        variant: "tooltip",
                                        color: "text.secondary",
                                        fontWeight: 500,
                                        target: "_blank",
                                        rel: "noopener",
                                        href: "https://snapshot.org/#/aave.eth/proposal/0xa730caeec3c28e014ff456b454186ef41c6c1f382cf0a7caa3d99c4ae16c8318"
                                    })
                                }
                            })
                        })]
                    }),
                    children: (0, z.jsxs)(re.Z, {
                        href: c,
                        variant: "surface",
                        size: "small",
                        target: "_blank",
                        rel: "noopener",
                        component: Ir.Z,
                        onClick: function() {
                            return l(B.h1.NOTIFY_DASHBOARD, {
                                market: r,
                                healthFactor: t
                            })
                        },
                        sx: {
                            pl: 6,
                            position: "relative",
                            "&:hover": {
                                ".HALTooltip__icon": {
                                    opacity: 0
                                },
                                ".HALTooltip__hoverIcon": {
                                    opacity: 1
                                }
                            }
                        },
                        children: [(0, z.jsx)(se.Z, {
                            sx: zr({
                                opacity: 1
                            }, qr),
                            className: "HALTooltip__icon",
                            children: (0, z.jsx)(Vr, {})
                        }), (0, z.jsx)(se.Z, {
                            sx: zr({
                                opacity: 0
                            }, qr),
                            className: "HALTooltip__hoverIcon",
                            children: (0, z.jsx)(Wr, {})
                        }), (0, z.jsx)(n.cC, {
                            id: "Notify"
                        })]
                    })
                })
            }
            var Gr = r(96875),
                Jr = r(74815),
                Qr = r(87369),
                $r = r(31959),
                en = function(e) {
                    var t = e.healthFactor,
                        r = Number((0, f.hE)(t).toFixed(2, _t().ROUND_DOWN)),
                        s = +t > 10 ? 100 : 10 * +t;
                    return (0, z.jsxs)(o.Z, {
                        sx: {
                            position: "relative",
                            mt: "33px",
                            mb: 4
                        },
                        children: [(0, z.jsx)(o.Z, {
                            sx: {
                                height: "4px",
                                background: "linear-gradient(90deg, #46BC4B 0%, #F89F1A 52.08%, #BC0000 100%)",
                                borderRadius: "1px",
                                transform: "matrix(-1, 0, 0, 1, 0, 0)"
                            }
                        }), (0, z.jsx)(o.Z, {
                            sx: {
                                position: "absolute",
                                bottom: "calc(100% + 6px)",
                                left: "".concat(s > 100 ? 100 : s, "%"),
                                zIndex: 3
                            },
                            children: (0, z.jsx)(o.Z, {
                                sx: function(e) {
                                    return {
                                        position: "relative",
                                        whiteSpace: "nowrap",
                                        "&:after": {
                                            width: 0,
                                            height: 0,
                                            borderStyle: "solid",
                                            borderWidth: "6px 4px 0 4px",
                                            borderColor: "".concat(e.palette.primary.main, " transparent transparent transparent"),
                                            content: "''",
                                            position: "absolute",
                                            left: s > 75 ? "auto" : "50%",
                                            right: s > 75 ? 0 : "auto",
                                            transform: s > 75 ? "translateX(0)" : "translateX(-50%)"
                                        }
                                    }
                                },
                                children: (0, z.jsx)(o.Z, {
                                    sx: {
                                        display: "flex",
                                        position: "absolute",
                                        left: s > 75 ? "auto" : s < 15 ? "0" : "50%",
                                        transform: s > 75 || s < 15 ? "translateX(0)" : "translateX(-50%)",
                                        right: s > 75 ? 0 : "auto",
                                        flexDirection: "column",
                                        alignItems: s > 75 ? "flex-end" : s < 15 ? "flex-start" : "center",
                                        textAlign: s > 75 ? "right" : s < 15 ? "left" : "center",
                                        bottom: "calc(100% + 2px)"
                                    },
                                    children: (0, z.jsx)(oe.B, {
                                        value: r,
                                        variant: "main12",
                                        visibleDecimals: 2
                                    })
                                })
                            })
                        }), (0, z.jsxs)(o.Z, {
                            sx: {
                                maxWidth: "20%",
                                textAlign: "center",
                                pt: 1.5,
                                "&:after": {
                                    content: "''",
                                    position: "absolute",
                                    bottom: "85%",
                                    left: "10%",
                                    transform: "translateX(-50%)",
                                    height: "10px",
                                    width: "2px",
                                    bgcolor: "error.main"
                                }
                            },
                            children: [(0, z.jsx)(oe.B, {
                                value: 1,
                                visibleDecimals: 2,
                                color: "error.main",
                                variant: "subheader2"
                            }), (0, z.jsx)(a.Z, {
                                sx: {
                                    display: "flex"
                                },
                                variant: "helperText",
                                lineHeight: "12px",
                                color: "error.main",
                                children: (0, z.jsx)(n.cC, {
                                    id: "Liquidation value"
                                })
                            })]
                        })]
                    })
                },
                tn = function(e) {
                    var t = e.topValue,
                        r = e.topTitle,
                        n = e.topDescription,
                        s = e.children,
                        i = e.bottomText,
                        l = e.color;
                    return (0, z.jsxs)(o.Z, {
                        sx: function(e) {
                            return {
                                border: "1px solid ".concat(e.palette.divider),
                                mb: 6,
                                borderRadius: "6px",
                                px: 4,
                                pt: 4,
                                pb: 6,
                                "&:last-of-type": {
                                    mb: 0
                                }
                            }
                        },
                        children: [(0, z.jsxs)(o.Z, {
                            sx: {
                                display: "flex",
                                justifyContent: "space-between"
                            },
                            children: [(0, z.jsxs)(o.Z, {
                                sx: {
                                    width: "calc(100% - 72px)"
                                },
                                children: [(0, z.jsx)(a.Z, {
                                    variant: "subheader1",
                                    mb: 1,
                                    children: r
                                }), (0, z.jsx)(a.Z, {
                                    variant: "caption",
                                    color: "text.secondary",
                                    children: n
                                })]
                            }), (0, z.jsx)(o.Z, {
                                sx: {
                                    width: "56px",
                                    height: "56px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bgcolor: "".concat(l, ".main")
                                },
                                children: t
                            })]
                        }), (0, z.jsx)(o.Z, {
                            children: s
                        }), (0, z.jsx)(a.Z, {
                            variant: "secondary12",
                            color: "text.secondary",
                            textAlign: "left",
                            children: i
                        })]
                    })
                },
                rn = function(e) {
                    var t = e.loanToValue,
                        r = e.currentLoanToValue,
                        s = e.currentLiquidationThreshold,
                        i = e.color,
                        l = (0, m.Z)().palette,
                        c = (0, f.hE)(t).multipliedBy(100).precision(20, _t().ROUND_UP).toNumber(),
                        d = (0, f.hE)(r).multipliedBy(100).precision(20, _t().ROUND_UP).toNumber(),
                        u = (0, f.hE)(s).multipliedBy(100).precision(20, _t().ROUND_UP).toNumber(),
                        p = 100 * Number(s);
                    return (0, z.jsxs)(o.Z, {
                        sx: {
                            position: "relative",
                            margin: "45px 0 55px"
                        },
                        children: [(0, z.jsx)(o.Z, {
                            sx: {
                                position: "absolute",
                                top: "calc(100% + 6px)",
                                left: "".concat(u > 100 ? 100 : u, "%"),
                                zIndex: 2
                            },
                            children: (0, z.jsx)(o.Z, {
                                sx: {
                                    position: "relative",
                                    whiteSpace: "nowrap",
                                    "&:after": {
                                        content: "''",
                                        position: "absolute",
                                        left: p > 75 ? "auto" : "50%",
                                        transform: p > 75 ? "translateX(0)" : "translateX(-50%)",
                                        right: p > 75 ? 0 : "auto",
                                        bottom: "100%",
                                        height: "10px",
                                        width: "2px",
                                        bgcolor: "error.main"
                                    }
                                },
                                children: (0, z.jsxs)(o.Z, {
                                    sx: {
                                        display: "flex",
                                        position: "absolute",
                                        left: p > 75 ? "auto" : "50%",
                                        transform: p > 75 ? "translateX(0)" : "translateX(-50%)",
                                        right: p > 75 ? 0 : "auto",
                                        flexDirection: "column",
                                        alignItems: p > 75 ? "flex-end" : "center",
                                        textAlign: p > 75 ? "right" : "center"
                                    },
                                    children: [(0, z.jsx)(oe.B, {
                                        value: s,
                                        visibleDecimals: 2,
                                        color: "error.main",
                                        variant: "subheader2",
                                        percent: !0,
                                        symbolsColor: "error.main"
                                    }), (0, z.jsx)(a.Z, {
                                        sx: {
                                            display: "flex"
                                        },
                                        variant: "helperText",
                                        lineHeight: "12px",
                                        color: "error.main",
                                        children: (0, z.jsx)(n.cC, {
                                            id: "Liquidation <0/> threshold",
                                            components: {
                                                0: (0, z.jsx)("br", {})
                                            }
                                        })
                                    })]
                                })
                            })
                        }), (0, z.jsx)(o.Z, {
                            sx: {
                                position: "absolute",
                                bottom: "calc(100% + 6px)",
                                left: "".concat(c > 100 ? 100 : c, "%"),
                                zIndex: 3
                            },
                            children: (0, z.jsx)(o.Z, {
                                sx: function(e) {
                                    return {
                                        position: "relative",
                                        whiteSpace: "nowrap",
                                        "&:after": {
                                            width: 0,
                                            height: 0,
                                            borderStyle: "solid",
                                            borderWidth: "6px 4px 0 4px",
                                            borderColor: "".concat(e.palette.primary.main, " transparent transparent transparent"),
                                            content: "''",
                                            position: "absolute",
                                            left: c > 75 ? "auto" : "50%",
                                            right: c > 75 ? 0 : "auto",
                                            transform: c > 75 ? "translateX(0)" : "translateX(-50%)"
                                        }
                                    }
                                },
                                children: (0, z.jsxs)(o.Z, {
                                    sx: {
                                        display: "flex",
                                        position: "absolute",
                                        left: c > 75 ? "auto" : c < 15 ? "0" : "50%",
                                        transform: c > 75 || c < 15 ? "translateX(0)" : "translateX(-50%)",
                                        right: c > 75 ? 0 : "auto",
                                        flexDirection: "column",
                                        alignItems: c > 75 ? "flex-end" : c < 15 ? "flex-start" : "center",
                                        textAlign: c > 75 ? "right" : c < 15 ? "left" : "center",
                                        bottom: "calc(100% + 2px)"
                                    },
                                    children: [(0, z.jsx)(oe.B, {
                                        value: t,
                                        percent: !0,
                                        visibleDecimals: 2,
                                        variant: "main12"
                                    }), (0, z.jsxs)(o.Z, {
                                        sx: {
                                            display: "inline-flex",
                                            alignItems: "center"
                                        },
                                        children: [(0, z.jsx)(a.Z, {
                                            variant: "helperText",
                                            color: "text.muted",
                                            mr: .5,
                                            children: (0, z.jsx)(n.cC, {
                                                id: "MAX"
                                            })
                                        }), (0, z.jsx)(oe.B, {
                                            value: r,
                                            percent: !0,
                                            visibleDecimals: 2,
                                            variant: "helperText",
                                            color: "text.muted",
                                            symbolsColor: "text.muted"
                                        })]
                                    })]
                                })
                            })
                        }), (0, z.jsxs)(o.Z, {
                            sx: {
                                height: "4px",
                                width: "100%",
                                borderRadius: "1px",
                                position: "relative",
                                bgcolor: "divider"
                            },
                            children: [(0, z.jsx)(o.Z, {
                                sx: {
                                    position: "absolute",
                                    left: 0,
                                    height: "4px",
                                    borderRadius: "1px",
                                    width: "".concat(c > 100 ? 100 : c, "%"),
                                    maxWidth: "100%",
                                    bgcolor: "".concat(i, ".main"),
                                    zIndex: 2
                                }
                            }), c < d && (0, z.jsx)(o.Z, {
                                sx: {
                                    position: "absolute",
                                    left: 0,
                                    height: "4px",
                                    borderRadius: "1px",
                                    width: "".concat(d > 100 ? 100 : d, "%"),
                                    maxWidth: "100%",
                                    background: "repeating-linear-gradient(-45deg, ".concat(l.divider, ", ").concat(l.divider, " 4px, ").concat(l[i].main, " 4px, ").concat(l[i].main, " 7px)")
                                }
                            })]
                        })]
                    })
                },
                nn = function(e) {
                    var t = e.open,
                        r = e.setOpen,
                        o = e.healthFactor,
                        s = e.loanToValue,
                        i = e.currentLoanToValue,
                        l = e.currentLiquidationThreshold,
                        c = "success",
                        u = Number(o);
                    u > 1.1 && u <= 3 ? c = "warning" : u <= 1.1 && (c = "error");
                    var p = (0, d.Yh)((function(e) {
                            return e.trackEvent
                        })),
                        x = "success",
                        h = 100 * Number(s),
                        b = 100 * Number(i),
                        m = 100 * Number(l);
                    return h >= Math.min(b, m) ? x = "error" : h > b / 2 && h < b && (x = "warning"), (0, z.jsxs)($r.P, {
                        open: t,
                        setOpen: r,
                        children: [(0, z.jsx)(a.Z, {
                            variant: "h2",
                            mb: 6,
                            children: (0, z.jsx)(n.cC, {
                                id: "Liquidation risk parameters"
                            })
                        }), (0, z.jsxs)(a.Z, {
                            mb: 6,
                            children: [(0, z.jsx)(n.cC, {
                                id: "Your health factor and loan to value determine the assurance of your collateral. To avoid liquidations you can supply more collateral or repay borrow positions."
                            }), " ", (0, z.jsx)(I.rU, {
                                onClick: function() {
                                    p(B.vh.EXTERNAL_LINK, {
                                        Link: "HF Risk Link"
                                    })
                                },
                                href: "https://docs.aave.com/faq/",
                                sx: {
                                    textDecoration: "underline"
                                },
                                color: "text.primary",
                                variant: "description",
                                children: (0, z.jsx)(n.cC, {
                                    id: "Learn more"
                                })
                            })]
                        }), (0, z.jsx)(tn, {
                            topTitle: (0, z.jsx)(n.cC, {
                                id: "Health factor"
                            }),
                            topDescription: (0, z.jsx)(n.cC, {
                                id: "Safety of your deposited collateral against the borrowed assets and its underlying value."
                            }),
                            topValue: (0, z.jsx)(Gr.o, {
                                value: o,
                                variant: "main12",
                                sx: {
                                    color: "common.white"
                                }
                            }),
                            bottomText: (0, z.jsx)(n.cC, {
                                id: "If the health factor goes below 1, the liquidation of your collateral might be triggered."
                            }),
                            color: c,
                            children: (0, z.jsx)(en, {
                                healthFactor: o
                            })
                        }), (0, z.jsx)(tn, {
                            topTitle: (0, z.jsx)(n.cC, {
                                id: "Current LTV"
                            }),
                            topDescription: (0, z.jsx)(n.cC, {
                                id: "Your current loan to value based on your collateral supplied."
                            }),
                            topValue: (0, z.jsx)(oe.B, {
                                value: s,
                                percent: !0,
                                variant: "main12",
                                color: "common.white",
                                symbolsColor: "common.white"
                            }),
                            bottomText: (0, z.jsx)(n.cC, {
                                id: "If your loan to value goes above the liquidation threshold your collateral supplied may be liquidated."
                            }),
                            color: x,
                            children: (0, z.jsx)(rn, {
                                loanToValue: s,
                                currentLoanToValue: i,
                                currentLiquidationThreshold: l,
                                color: x
                            })
                        })]
                    })
                },
                on = function() {
                    var e = (0, R.f)(),
                        t = e.currentNetworkConfig,
                        r = e.currentMarketData,
                        i = e.currentMarket,
                        l = (0, dr.hu)(i).market,
                        c = (0, M.HT)(),
                        u = c.user,
                        p = c.reserves,
                        x = c.loading,
                        j = (0, h.Z)().currentAccount,
                        y = (0, s.useState)(!1),
                        g = y[0],
                        w = y[1],
                        C = (0, ne.vR)().openClaimRewards,
                        O = (0, d.Yh)((function(e) {
                            return e.trackEvent
                        })),
                        A = (0, d.Yh)((function(e) {
                            return (0, pr.lY)(e)
                        })) && "" !== j && Number(u.totalLiquidityUSD) > 0,
                        Z = (0, m.Z)(),
                        P = (0, v.Z)(Z.breakpoints.down("sm")),
                        k = Object.keys(u.calculatedUserIncentives).reduce((function(e, n) {
                            var o = u.calculatedUserIncentives[n],
                                a = (0, f.Fv)(o.claimableRewards, o.rewardTokenDecimals),
                                s = 0;
                            if (!r.v3 && Number(a) > 0)
                                if (r.chainId === b.a_.mainnet) {
                                    var i = p.find((function(e) {
                                        return "AAVE" === e.symbol
                                    }));
                                    s = i ? Number(i.priceInUSD) : 0
                                } else p.forEach((function(e) {
                                    e.symbol === t.wrappedBaseAssetSymbol && (s = Number(e.priceInUSD))
                                }));
                            else s = Number(o.rewardPriceFeed);
                            var l = Number(a) * s;
                            return l > 0 && (-1 === e.assets.indexOf(o.rewardTokenSymbol) && e.assets.push(o.rewardTokenSymbol), e.claimableRewardsUsd += Number(l)), e
                        }), {
                            claimableRewardsUsd: 0,
                            assets: []
                        }).claimableRewardsUsd,
                        S = "0" === (null === u || void 0 === u ? void 0 : u.totalCollateralMarketReferenceCurrency) ? "0" : (0, f.hE)((null === u || void 0 === u ? void 0 : u.totalBorrowsMarketReferenceCurrency) || "0").dividedBy((null === u || void 0 === u ? void 0 : u.totalCollateralMarketReferenceCurrency) || "1").toFixed(),
                        D = P ? "main16" : "main21",
                        E = P ? "secondary16" : "secondary21";
                    return (0, z.jsxs)(z.Fragment, {
                        children: [A && P && (0, z.jsx)(o.Z, {
                            sx: {
                                width: "100%"
                            },
                            children: (0, z.jsx)(ar.default, {
                                href: I.Z6.migrationTool,
                                children: (0, z.jsx)(re.Z, {
                                    variant: "gradient",
                                    sx: {
                                        height: "40px",
                                        width: "100%"
                                    },
                                    children: (0, z.jsx)(a.Z, {
                                        variant: "buttonM",
                                        children: (0, z.jsx)(n.cC, {
                                            id: "Migrate to {0} v3 Market",
                                            values: {
                                                0: l.marketTitle
                                            }
                                        })
                                    })
                                })
                            })
                        }), (0, z.jsxs)(Jr.f, {
                            titleComponent: (0, z.jsxs)(o.Z, {
                                sx: {
                                    display: "flex",
                                    alignItems: "center"
                                },
                                children: [(0, z.jsx)(ur.V, {
                                    pageTitle: (0, z.jsx)(n.cC, {
                                        id: "Dashboard"
                                    }),
                                    withMarketSwitcher: !0,
                                    bridge: t.bridge
                                }), A && !P && (0, z.jsx)(o.Z, {
                                    sx: {
                                        alignSelf: "center",
                                        mb: 4,
                                        width: "100%"
                                    },
                                    children: (0, z.jsx)(ar.default, {
                                        href: I.Z6.migrationTool,
                                        children: (0, z.jsx)(re.Z, {
                                            variant: "gradient",
                                            sx: {
                                                height: "20px"
                                            },
                                            children: (0, z.jsx)(a.Z, {
                                                variant: "buttonS",
                                                "data-cy": "migration-button",
                                                children: (0, z.jsx)(n.cC, {
                                                    id: "Migrate to v3"
                                                })
                                            })
                                        })
                                    })
                                })]
                            }),
                            children: [(0, z.jsx)(Qr.d, {
                                icon: (0, z.jsx)(Dr, {}),
                                title: (0, z.jsx)(n.cC, {
                                    id: "Net worth"
                                }),
                                loading: x,
                                children: j ? (0, z.jsx)(oe.B, {
                                    value: Number((null === u || void 0 === u ? void 0 : u.netWorthUSD) || 0),
                                    symbol: "USD",
                                    variant: D,
                                    visibleDecimals: 2,
                                    compact: !0,
                                    symbolsColor: "#A5A8B6",
                                    symbolsVariant: E
                                }) : (0, z.jsx)(qt.J, {
                                    variant: E,
                                    sx: {
                                        opacity: "0.7"
                                    }
                                })
                            }), (0, z.jsx)(Qr.d, {
                                icon: (0, z.jsx)(Cr, {}),
                                title: (0, z.jsxs)("div", {
                                    style: {
                                        display: "flex"
                                    },
                                    children: [(0, z.jsx)(n.cC, {
                                        id: "Net APY"
                                    }), (0, z.jsx)(cr, {
                                        event: {
                                            eventName: B.vh.TOOL_TIP,
                                            eventParams: {
                                                tooltip: "NET APY: Dashboard Banner"
                                            }
                                        }
                                    })]
                                }),
                                loading: x,
                                children: j && Number(null === u || void 0 === u ? void 0 : u.netWorthUSD) > 0 ? (0, z.jsx)(oe.B, {
                                    value: u.netAPY,
                                    variant: D,
                                    visibleDecimals: 2,
                                    percent: !0,
                                    symbolsColor: "#A5A8B6",
                                    symbolsVariant: E
                                }) : (0, z.jsx)(qt.J, {
                                    variant: E,
                                    sx: {
                                        opacity: "0.7"
                                    }
                                })
                            }), j && "-1" !== (null === u || void 0 === u ? void 0 : u.healthFactor) && (0, z.jsx)(Qr.d, {
                                icon: (0, z.jsx)(jr, {}),
                                title: (0, z.jsx)(o.Z, {
                                    sx: {
                                        display: "inline-flex",
                                        alignItems: "center"
                                    },
                                    children: (0, z.jsx)(n.cC, {
                                        id: "Health factor"
                                    })
                                }),
                                loading: x,
                                children: (0, z.jsx)(Gr.o, {
                                    value: (null === u || void 0 === u ? void 0 : u.healthFactor) || "-1",
                                    variant: D,
                                    onInfoClick: function() {
                                        O(B.h1.VIEW_RISK_DETAILS), w(!0)
                                    },
                                    HALIntegrationComponent: r.halIntegration && (0, z.jsx)(Xr, {
                                        healthFactor: (null === u || void 0 === u ? void 0 : u.healthFactor) || "-1",
                                        marketName: r.halIntegration.marketName,
                                        integrationURL: r.halIntegration.URL
                                    })
                                })
                            }), j && k > 0 && (0, z.jsx)(Qr.d, {
                                title: (0, z.jsx)(n.cC, {
                                    id: "Available rewards"
                                }),
                                icon: (0, z.jsx)(br, {}),
                                loading: x,
                                children: (0, z.jsxs)(o.Z, {
                                    sx: {
                                        display: "flex",
                                        alignItems: {
                                            xs: "flex-start",
                                            xsm: "center"
                                        },
                                        flexDirection: {
                                            xs: "column",
                                            xsm: "row"
                                        }
                                    },
                                    children: [(0, z.jsx)(o.Z, {
                                        sx: {
                                            display: "inline-flex",
                                            alignItems: "center"
                                        },
                                        "data-cy": "Claim_Box",
                                        children: (0, z.jsx)(oe.B, {
                                            value: k,
                                            variant: D,
                                            visibleDecimals: 2,
                                            compact: !0,
                                            symbol: "USD",
                                            symbolsColor: "#A5A8B6",
                                            symbolsVariant: E,
                                            "data-cy": "Claim_Value"
                                        })
                                    }), (0, z.jsx)(re.Z, {
                                        variant: "gradient",
                                        size: "small",
                                        onClick: function() {
                                            return C()
                                        },
                                        sx: {
                                            minWidth: "unset",
                                            ml: {
                                                xs: 0,
                                                xsm: 2
                                            }
                                        },
                                        "data-cy": "Dashboard_Claim_Button",
                                        children: (0, z.jsx)(n.cC, {
                                            id: "Claim"
                                        })
                                    })]
                                })
                            })]
                        }), (0, z.jsx)(nn, {
                            open: g,
                            setOpen: w,
                            healthFactor: (null === u || void 0 === u ? void 0 : u.healthFactor) || "-1",
                            loanToValue: S,
                            currentLoanToValue: (null === u || void 0 === u ? void 0 : u.currentLoanToValue) || "0",
                            currentLiquidationThreshold: (null === u || void 0 === u ? void 0 : u.currentLiquidationThreshold) || "0"
                        })]
                    })
                };

            function an() {
                var e = (0, h.Z)(),
                    t = e.currentAccount,
                    r = e.loading,
                    x = (0, c.T)().isPermissionsLoading,
                    b = (0, d.Yh)((function(e) {
                        return e.trackEvent
                    })),
                    m = (0, s.useState)("supply"),
                    v = m[0],
                    j = m[1];
                return (0, s.useEffect)((function() {
                    b("Page Viewed", {
                        "Page Name": "Dashboard"
                    })
                }), [b]), (0, z.jsxs)(z.Fragment, {
                    children: [(0, z.jsx)(on, {}), (0, z.jsxs)(p.O, {
                        children: [t && !x && (0, z.jsx)(o.Z, {
                            sx: {
                                display: {
                                    xs: "flex",
                                    lg: "none"
                                },
                                justifyContent: {
                                    xs: "center",
                                    xsm: "flex-start"
                                },
                                mb: {
                                    xs: 3,
                                    xsm: 4
                                }
                            },
                            children: (0, z.jsxs)(l.Z, {
                                color: "primary",
                                value: v,
                                exclusive: !0,
                                onChange: function(e, t) {
                                    return j(t)
                                },
                                sx: {
                                    width: {
                                        xs: "100%",
                                        xsm: "359px"
                                    },
                                    height: "44px"
                                },
                                children: [(0, z.jsx)(i.Z, {
                                    value: "supply",
                                    disabled: "supply" === v,
                                    children: (0, z.jsx)(a.Z, {
                                        variant: "subheader1",
                                        children: (0, z.jsx)(n.cC, {
                                            id: "Supply"
                                        })
                                    })
                                }), (0, z.jsx)(i.Z, {
                                    value: "borrow",
                                    disabled: "borrow" === v,
                                    children: (0, z.jsx)(a.Z, {
                                        variant: "subheader1",
                                        children: (0, z.jsx)(n.cC, {
                                            id: "Borrow"
                                        })
                                    })
                                })]
                            })
                        }), t && !x ? (0, z.jsx)(or, {
                            isBorrow: "borrow" === v
                        }) : (0, z.jsx)(u.w, {
                            loading: r
                        })]
                    })]
                })
            }
            an.getLayout = function(e) {
                return (0, z.jsx)(x.Z, {
                    children: e
                })
            }
        },
        26079: function(e, t, r) {
            "use strict";
            r.d(t, {
                N: function() {
                    return s
                }
            });
            var n = r(30120),
                o = r(29630),
                a = r(85893),
                s = function(e) {
                    var t = e.text;
                    return (0, a.jsx)(n.Z, {
                        sx: {
                            px: {
                                xs: 4,
                                xsm: 6
                            },
                            pt: {
                                xs: 3.5,
                                xsm: 5.5
                            },
                            pb: {
                                xs: 6,
                                sxm: 7
                            }
                        },
                        children: (0, a.jsx)(o.Z, {
                            color: "text.secondary",
                            children: t
                        })
                    })
                }
        },
        54373: function(e, t, r) {
            "use strict";
            r.d(t, {
                K: function() {
                    return d
                }
            });
            var n = r(49501),
                o = r(75331),
                a = r(19952),
                s = r(80570),
                i = r(57609),
                l = r(68861),
                c = r(85893);

            function d(e) {
                var t = e.bridge,
                    r = e.name,
                    d = e.chainId,
                    u = e.icon,
                    p = e.sx,
                    x = [o.a_.avalanche].includes(d) ? "Ethereum & Bitcoin" : "Ethereum",
                    h = (0, s.Yh)((function(e) {
                        return e.trackEvent
                    }));
                return (0, c.jsx)(a.v, {
                    severity: "info",
                    icon: u,
                    sx: p,
                    children: t ? (0, c.jsx)(n.cC, {
                        id: "Your {name} wallet is empty. Purchase or transfer assets or use <0>{0}</0> to transfer your {network} assets.",
                        values: {
                            0: t.name,
                            name: r,
                            network: x
                        },
                        components: {
                            0: (0, c.jsx)(l.rU, {
                                onClick: function() {
                                    h(i.vh.EXTERNAL_LINK, {
                                        bridge: t.name,
                                        Link: "Bridge Link"
                                    })
                                },
                                href: t.url
                            })
                        }
                    }) : (0, c.jsx)(n.cC, {
                        id: "Your {name} wallet is empty. Purchase or transfer assets.",
                        values: {
                            name: r
                        }
                    })
                })
            }
        },
        86057: function(e, t, r) {
            (window.__NEXT_P = window.__NEXT_P || []).push(["/", function() {
                return r(35707)
            }])
        }
    },
    function(e) {
        e.O(0, [249, 231, 745, 896, 774, 888, 179], (function() {
            return t = 86057, e(e.s = t);
            var t
        }));
        var t = e.O();
        _N_E = t
    }
]);