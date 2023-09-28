! function(t, e) {
    "use strict";
    var i, o = e.event;
    o.special.smartresize = {
        setup: function() {
            e(this).on("resize", o.special.smartresize.handler)
        },
        teardown: function() {
            e(this).off("resize", o.special.smartresize.handler)
        },
        handler: function(t, o) {
            var n = this,
                s = arguments;
            t.type = "smartresize", i && clearTimeout(i), i = setTimeout(function() {
                e.event.dispatch.call(n, s)
            }, "execAsap" === o ? 0 : 100)
        }
    }, e.fn.smartresize = function(t) {
        return t ? this.on("smartresize", t) : this.trigger("smartresize", ["execAsap"])
    }, e.Mason = function(t, i) {
        this.element = e(i), this._create(t), this._init()
    }, e.Mason.settings = {
        isResizable: !0,
        isAnimated: !1,
        animationOptions: {
            queue: !1,
            duration: 500
        },
        gutterWidth: 0,
        hiddenClass: "tile-hidden",
        hiddenStyle: {
            opacity: 0
        },
        visibleStyle: {
            opacity: 1
        },
        isRTL: !1,
        isFitWidth: !1,
        containerStyle: {
            position: "relative"
        }
    }, e.Mason.prototype = {
        _filterFindBricks: function(t) {
            var e = this.options.itemSelector;
            return e ? t.filter(e).add(t.find(e)) : t
        },
        _getBricks: function(t) {
            var e = this._filterFindBricks(t).css({
                position: "absolute"
            }).addClass("tile");
            return e
        },
        _create: function(i) {
            this.options = e.extend(!0, {}, e.Mason.settings, i), this.styleQueue = [];
            var o = this.element[0].style;
            this.originalStyle = {
                height: o.height || ""
            };
            var n = this.options.containerStyle;
            for (var s in n) this.originalStyle[s] = o[s] || "";
            this.element.css(n), this.horizontalDirection = this.options.isRTL ? "right" : "left", this.offset = {
                x: parseInt(this.element.css("padding-" + this.horizontalDirection), 10),
                y: parseInt(this.element.css("padding-top"), 10)
            }, this.isFluid = this.options.columnWidth && "function" == typeof this.options.columnWidth;
            var a = this;
            setTimeout(function() {
                a.element.addClass("masonry")
            }, 0), this.options.isResizable && e(t).on("smartresize.masonry", function() {
                a.resize()
            }), this.reloadItems()
        },
        _init: function(t) {
            this.$filteredAtoms = this._filter(this.$bricks), this._getColumns(), this._reLayout(t)
        },
        option: function(t) {
            e.isPlainObject(t) && (this.options = e.extend(!0, this.options, t))
        },
        layout: function(t, e) {
            for (var i = 0, o = t.length; o > i; i++) this._placeBrick(t[i]);
            var n = {};
            if (n.height = Math.max.apply(Math, this.colYs), this.options.isFitWidth) {
                var s = 0;
                for (i = this.cols; --i && 0 === this.colYs[i];) s++;
                n.width = (this.cols - s) * this.columnWidth - this.options.gutterWidth
            }
            this.styleQueue.push({
                $el: this.element,
                style: n
            });
            var a, r = this.isLaidOut && this.options.isAnimated ? "animate" : "css",
                l = this.options.animationOptions;
            for (i = 0, o = this.styleQueue.length; o > i; i++) a = this.styleQueue[i], a.$el[r](a.style, l);
            this.styleQueue = [], e && e.call(t), this.isLaidOut = !0
        },
        _getColumns: function() {
            var t = this.options.isFitWidth ? this.element.parent() : this.element,
                e = t.width();
            this.columnWidth = this.isFluid ? this.options.columnWidth(e) : this.options.columnWidth || this.$bricks.outerWidth(!0) || e, this.columnWidth += this.options.gutterWidth, this.cols = Math.floor((e + this.options.gutterWidth) / this.columnWidth), this.cols = Math.max(this.cols, 1)
        },
        _placeBrick: function(t) {
            var i, o, n, s, a, r = e(t);
            if (i = Math.ceil(r.outerWidth(!0) / this.columnWidth), i = Math.min(i, this.cols), 1 === i) n = this.colYs;
            else
                for (o = this.cols + 1 - i, n = [], a = 0; o > a; a++) s = this.colYs.slice(a, a + i), n[a] = Math.max.apply(Math, s);
            for (var l = Math.min.apply(Math, n), d = 0, c = 0, h = n.length; h > c; c++)
                if (n[c] === l) {
                    d = c;
                    break
                }
            var f = {
                top: l + this.offset.y
            };
            f[this.horizontalDirection] = this.columnWidth * d + this.offset.x, this.styleQueue.push({
                $el: r,
                style: f
            });
            var u = l + r.outerHeight(!0),
                p = this.cols + 1 - h;
            for (c = 0; p > c; c++) this.colYs[d + c] = u
        },
        resize: function() {
            var t = this.cols;
            this._getColumns(), (this.isFluid || this.cols !== t) && this._reLayout()
        },
        _reLayout: function(t) {
            var e = this.cols;
            for (this.colYs = []; e--;) this.colYs.push(0);
            this.layout(this.$filteredAtoms, t)
        },
        reloadItems: function() {
            this.$bricks = this._getBricks(this.element.children())
        },
        reload: function(t) {
            this.reloadItems(), this._init(t)
        },
        _filter: function(t) {
            var e = "" === this.options.filter ? "*" : this.options.filter;
            if (!e) return t;
            var i = this.options.hiddenClass,
                o = "." + i,
                n = t.filter(o),
                s = n;
            if ("*" !== e) {
                s = n.filter(e); {
                    t.not(o).not(e).addClass(i)
                }
            }
            return s.removeClass(i), t.filter(e)
        },
        appended: function(t, e, i) {
            if (e) {
                this._filterFindBricks(t).css({
                    top: this.element.height()
                });
                var o = this;
                setTimeout(function() {
                    o._appended(t, i)
                }, 1)
            } else this._appended(t, i)
        },
        _appended: function(t, e) {
            var i = this._getBricks(t);
            this.$bricks = this.$bricks.add(i), this.layout(i, e)
        },
        insert: function(t, e) {
            this._insert(t, e)
        },
        _insert: function(t, e) {
            var i = this._getBricks(t);
            this.$bricks = this.$bricks.add(i), this.layout(i, e), this.$filteredAtoms = this._filter(this.$bricks), this._getColumns(), this._reLayout()
        },
        remove: function(t) {
            this.$bricks = this.$bricks.not(t), t.remove()
        },
        destroy: function() {
            this.$bricks.removeClass("tile").each(function() {
                this.style.position = "", this.style.top = "", this.style.left = ""
            });
            var i = this.element[0].style;
            for (var o in this.originalStyle) i[o] = this.originalStyle[o];
            this.element.off(".masonry").removeClass("masonry").removeData("masonry"), e(t).off(".masonry")
        }
    };
    var n = function(e) {
        t.console && t.console.error(e)
    };
    e.fn.masonry = function(t) {
        if ("string" == typeof t) {
            var i = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                var o = e.data(this, "masonry");
                return o ? e.isFunction(o[t]) && "_" !== t.charAt(0) ? void o[t].apply(o, i) : void n("no such method '" + t + "' for masonry instance") : void n("cannot call methods on masonry prior to initialization; attempted to call method '" + t + "'")
            })
        } else this.each(function() {
            var i = e.data(this, "masonry");
            i ? (i.option(t || {}), i._init()) : e.data(this, "masonry", new e.Mason(t, this))
        });
        return this
    }
}(window, jQuery), 0 < $(".js-masonry").length && $(".js-masonry").masonry({
        itemSelector: ".js-masonry-item"
    }), + function(t, e) {
        "use strict";

        function i(t, e) {
            var i = [2, 0, 1, 1, 1, 2];
            return e[t % 100 > 4 && 20 > t % 100 ? 2 : i[5 > t % 10 ? t % 10 : 5]]
        }
        var o = {
                get: function(t, e, i, n) {
                    o.request("GET", t, e, i, n)
                },
                post: function(t, e, i, n) {
                    o.request("POST", t, e, i, n)
                },
                request: function(i, o, n, s, a) {
                    e.ajax(o, {
                        type: i,
                        data: n
                    }).done(function(e, i) {
                        e instanceof Object && "redirect" in e && (t.location = e.redirect), s instanceof Function && s(e, i)
                    }).fail(a)
                }
            },
            n = {
                updateContainer: function(t, i) {
                    var o = e(i);
                    t.html(o), t.trigger("reinit");
                    e('[autofocus]').focus();
                },
                post: function(t, e, i) {
                    var n = this;
                    t.addClass("loading"), o.post(e, i, function(e) {
                        t.removeClass("loading"), n.updateContainer(t, e)
                    })
                },
                get: function(t, e, i) {
                    var n = this;
                    t.addClass("loading"), o.get(e, i, function(e) {
                        t.removeClass("loading"), n.updateContainer(t, e)
                    })
                },
                init: function() {
                    var i = this;
                    e(document).on("submit.joxi.navigation", "form.js-form-load-submit", function(t) {
                        var o = e(this),
                            n = o.closest(".js-load-target").length ? o.closest(".js-load-target") : o.parent(),
                            s = this.action,
                            a = o.serialize();
                        i.post(n, s, a), t.preventDefault()
                    }), e(t).on("load.joxi.navigation", function() {
                        e(".js-dropdown-load-deferred").each(function() {
                            var t = e(this),
                                o = t.children().attr("data-href") || t.children().attr("href"),
                                n = t.find(".js-load-deferred-target");
                            i.get(n, o)
                        })
                    }), e(document).on("click.joxi.navigation", ".js-load-link", function(t) {
                        var o = e(this),
                            n = o.closest(".js-load-target"),
                            s = o.attr("data-url") || o.attr("href");
                        i.get(n, s), t.preventDefault()
                    })
                }
            };
        n.init(), t.joxi = t.joxi || {}, t.joxi.core = o, t.joxi.navigation = n, t.declOfNum = i
    }(window, jQuery), + function(t, e) {
        "use strict";
        var i = {
            append: function(i, o) {
                if (o.closest(".box").length > 0) var n = form.closest(".box").data("slug"),
                    o = e("form", '.box[data-slug="' + n + '"]');
                o.siblings("ul").append(i), o.find("textarea").val("");
                var s = o.find("textarea").attr("data-height") || "auto";
                o.find("textarea").css({
                    height: s
                });
                var a = o.closest(".box").find(".comment-count");
                a.text(o.closest(".box").find(".comment-count").eq(0).text() - 0 + 1), e(".js-tile-items").masonry("reload"), t._gaq = t._gaq || [], t._gaq.push(["_trackEvent", "Comments", "Add", "Add comment to " + n])
            },
            add: function(t, e) {
                var i = this;
                t.addClass("locked"), joxi.core.post(e, t.serializeArray(), function(e) {
                    t.removeClass("locked"), i.append(e, t)
                }, function() {
                    t.removeClass("locked")
                })
            },
            remove: function(t) {
                joxi.core.get(t, {}, function(t) {
                    var i = e(t).children("form")[0];
                    joxi.core.post(i.action, e(i).serializeArray(), function(t) {
                        var i = e(t),
                            o = e(".joxi-comment-comment[data-id=" + i.data("id") + "]");
                        o.remove()
                    })
                })
            },
            init: function() {
                var t = this;
                e(document).on("submit", "form.js-comment-form", function(i) {
                    var o = e(this),
                        n = this.action;
                    o.hasClass("locked") || t.add(o, n), i.preventDefault()
                }), e(document).on("click", ".js-comment-remove", function(i) {
                    var o = e(this).attr("data-url");
                    t.remove(o), i.preventDefault()
                })
            }
        };
        e(function() {
            i.init()
        }), t.joxi = t.joxi || {}, t.joxi.comment = i
    }(window, jQuery), + function(t, e) {
        "use strict";
        var i = {
            check: function(t) {
                t.toggleClass("tile-checked"), e(".js-tile-items-control > [data-toggle=dropdown]")[e(".js-tile-item.tile-checked").length ? "removeClass" : "addClass"]("disabled")
            },
            count: function() {
                return {
                    all: e(".js-tile-item.tile-checked").length,
                    screen: e(".js-tile-item.tile-checked:not(.js-tile-item-file)").length,
                    file: e(".js-tile-item.js-tile-item-file.tile-checked").length
                }
            },
            init: function() {
                var t = this;
                e(document).on("click", ".tile-checkbox", function(i) {
                    i.preventDefault();
                    var o = e(this).closest(".js-tile-item");
                    t.check(o)
                }), e(".js-tile-items-control").on("shown.bs.dropdown", function() {
                    e(".js-tile-items-messages-group-chosen").text(declOfNum(t.count().all, messages.groupChosen)), e(".js-tile-items-messages-group-remove").text(declOfNum(t.count().all, messages.groupRemove)), e(".js-tile-items-messages-group-screen").text(t.count().screen > 0 ? t.count().screen + " " + declOfNum(t.count().screen, messages.groupScreen) : ""), e(".js-tile-items-messages-group-file").text(t.count().file > 0 ? t.count().file + " " + declOfNum(t.count().file, messages.groupFile) : "")
                })
            }
        };
        i.init();
        var o = {
            getLink: function(t) {
                var i = this,
                    o = [],
                    n = "";
                e(".js-tile-item.tile-checked").each(function() {
                    var t = e(this).attr("data-slug");
                    o.push(t)
                });
                var s = t.children(".btn").data("href");
                if (o.length > 1) joxi.core.post(s, {
                    slug: o
                }, function(e) {
                    "ok" == e.result ? (n = e.link, i.setLink(n, t)) : t.children("[data-toggle=dropdown]").dropdown("toggle")
                });
                else {
                    n = o[0];
                    var a = e(".js-tile-item.tile-checked[data-slug=" + o[0] + "] > .tile-preview > img").attr("src");
                    i.setLink(n, t, a)
                }
            },
            setLink: function(i, o, n) {
                if (i = "http://joxi.ru/" + i, n) {
                    var s = '<a href="' + i + '" target="_blank"><img src="' + n + '" border="0"></a>',
                        a = "[URL=" + i + "][IMG]" + n + "[/IMG][/URL]";
                    e(".js-tile-item-control-copy", o).show(), e("input[name=inputLinkAA]", o).val(s).next().find("[data-link]").attr("data-link", s), e("input[name=inputLinkBB]", o).val(a).next().find("[data-link]").attr("data-link", a)
                } else e(".js-tile-item-control-copy", o).hide();
                e(".dropdown-container", o).removeClass("loading"), e("input[name=inputLinkToScreenshot]", o).val(i).next().find("[data-link]").attr("data-link", i), e(".js-share-wrapper", o).html(e(".js-share-template").html()), e(".js-share-wrapper .js-pluso", o).addClass("pluso").attr("data-url", i), t.pluso && "function" == typeof t.pluso.start && pluso.start()
            },
            init: function() {
                var t = this;
                e(".js-tile-items-control-copy").on("shown.bs.dropdown", function() {
                    var i = e(this);
                    e(".dropdown-container", i).addClass("loading"), t.getLink(i)
                })
            }
        };
        o.init();
        var n = {
            remove: function(t, i) {
                var o = [];
                e(".js-tile-item.tile-checked").each(function() {
                    var t = e(this).attr("data-slug");
                    o.push(t)
                });
                var n = e(".form", i);
                joxi.core.post(n.attr("action"), {
                    slug: o
                }, function(o) {
                    "ok" == o.result ? (t.remove(), e(".js-tile-items").masonry("reload"), i.children("[data-toggle=dropdown]").dropdown("toggle"), e(".js-tile-items-control > [data-toggle=dropdown]").addClass("disabled")) : i.children("[data-toggle=dropdown]").dropdown("toggle")
                })
            },
            init: function() {
                var t = this;
                e(document).on("click", ".js-tile-items-control-remove", function(i) {
                    i.preventDefault();
                    var o = e(this).closest(".js-tile-items-control");
                    t.remove(e(".js-tile-item.tile-checked"), o)
                })
            }
        };
        n.init();
        var s = {
            tile: [],
            label: [],
            template: {
                item: function(t, e) {
                    return '<label onclick="ga(\'send\', \'event\', \'NewHistory\', \'self label\');" class="label" data-label="' + t + '" title="' + e + '">' + e + "</label>"
                },
                edit: function(t, e) {
                    return '<tr><td><input type="text" value="' + e + '" name="' + t + '" id="' + t + '" class="form-control form-control-link"></td><td><label for="' + t + '" class="btn btn-link btn-primary">' + messages.edit + '</label></td><td><button type="button" class="btn btn-link btn-primary js-tile-label-remove"><span class="disabled-text">' + messages.cancel + "</span><span>" + messages.remove + "</span></button></td></tr>"
                }
            },
            create: function(t, i) {
                var o = this;
                joxi.core.post("/labels", {
                    name: t
                }, function(t) {
                    t = e.parseJSON(t), t.id ? (e(".js-tile-label-items").append(o.template.item(t.id, t.name)), e(".js-tile-label-edit-items").append(o.template.edit(t.id, t.name)), o.toggle(t.id, !0)) : i.children("[data-toggle=dropdown]").dropdown("toggle")
                })
            },
            remove: function(t, e) {
                e.toggleClass("disabled")
            },
            process_remove: function() {
                e('.table.table-items.stick.js-tile-label-edit-items tr.disabled input').each(function(index, item){
                    item.closest('tr').remove();
                    joxi.core.post("/labels/" + item.id, {
                       kind: 'rm'
                    })
                });
            },
            edit: function(t) {
                var i = this;

                joxi.core.post("/labels?up=1", t, function(t) {
                    t = e.parseJSON(t), t = t.items, i.draw(t, !0)
                })
            },
            draw: function(t, i) {
                var o = this;
                e(".js-tile-label-items, .js-tile-label-edit-items").empty(), o.label = [];
                for (var n in t) "system" != t[n].type && (o.label.push(t[n]), e(".js-tile-label-items").append(o.template.item(t[n].id, t[n].name)), e(".js-tile-label-edit-items").append(o.template.edit(t[n].id, t[n].name)));
                i && (o.parse(), o.typeahead())
            },
            parse: function() {
                var t = this,
                    i = [];
                t.tile = [], e(".js-tile-label-control-items").children().removeClass("half-checked checked"), e(".js-tile-item.tile-checked").each(function() {
                    var o = e(this).attr("data-slug"),
                        n = e(this).attr("data-label") || "";
                    t.tile.push(o), i.push(n.split(","))
                });

                var tiles = t.tile,
                    labels = t.label;

                labels.forEach(function(item) {
                    var s = 0;
                    tiles.forEach(function (tile) {
                        if (('documents' in item) && (item.documents.indexOf(tile) != -1)) {
                            s++;
                        }
                    });
                    s > 0 && e('.js-tile-label-control-items > .label[data-label="' + item.id + '"]').addClass(s == tiles.length ? "checked" : "half-checked");
                });
            },
            typeahead: function(t) {
                var i = this;
                if (!t) {
                    t = [];
                    for (var o in i.label) t.push(i.label[o].name)
                }
                e(".js-typeahead-label").typeahead({
                    source: t
                })
            },
            toggle: function(t, i) {
                var ot = this;

                joxi.core.post("/labels/" + t, {
                    kind: i ? 'setfile' : 'resetfile',
                    fileId: ot.tile.join(',')
                }, function(o) {
                    o = e.parseJSON(o), "ok" == o.result && (e('.js-tile-label-control-items > .label[data-label="' + t + '"]').removeClass("half-checked")[i ? "addClass" : "removeClass"]("checked"), e(".js-tile-item.tile-checked").each(function() {
                        var o = e(this),
                            n = o.attr("data-labels") || "";
                        n = n.split(","), i ? -1 == e.inArray(t, n) && n.push(t) : n = e.grep(n, function(e) {
                            return e != t
                        }), o.attr("data-labels", n)
                    }))
                    joxi.core.get("/labels", null, function(i) {
                        i = e.parseJSON(i), i = i.items, ot.draw(i), ot.parse();
                    })
                })
            },
            init: function() {
                var t = this;
                e(".js-tile-items-control-label, .js-tile-item-control").one("reinit", function() {
                    joxi.core.get("/labels", null, function(i) {
                        i = e.parseJSON(i), i = i.items, t.draw(i)
                    })
                }), e(".js-tile-item-control").one("shown.bs.dropdown", function() {
                    t.parse(), t.typeahead()
                }), e(".js-tile-items-control-label").on("shown.bs.dropdown", function() {
                    t.parse(), t.typeahead()
                }), e(document).on("click", ".js-tile-label-control-items > .label", function(i) {
                    i.preventDefault();
                    var o = e(this),
                        n = o.attr("data-label"),
                        s = !o.hasClass("checked");
                    t.toggle(n, s)
                }), e(document).on("click", ".js-tile-label-remove", function(i) {
                    i.preventDefault();
                    var o = e(this),
                        n = o.closest("tr");
                    t.remove(o, n)
                }), e(document).on("click", ".js-tile-label-create", function(i) {
                    i.preventDefault();
                    var o = e(this).closest(".js-tile-nav"),
                        n = e(".js-tile-label-create-val", this).text();
                    t.create(n, o)
                }), e(document).on("submit", ".js-tile-label-edit-form", function(i) {
                    i.preventDefault();
                    t.process_remove();
                    var o = e(this).serialize();
                    t.edit(o)
                })
            }
        };
        s.init()
    }(window, jQuery), + function(t, e) {
        "use strict";
        e.filterRange = function(t, i) {
            this.element = e(i), this.range = [0, 10000], this._init()
        }, e.filterRange.prototype = {
            click: function(t) {
                t = parseInt(t);
                var e = this.range;
                e[0] !== e[1] ? (e[0] = t, e[1] = t) : t > e[1] ? (e[0] = e[1], e[1] = t) : e[0] = t, this.set(e)
            },
            set: function(t) {
                t = t ? t : this.range, this.element.find("[data-val]").each(function() {
                    var i = parseInt(e(this).attr("data-val"));
                    switch (e(this).removeClass("active active-first active-last"), !0) {
                        case i == t[0] && i == t[1]:
                            e(this).addClass("active active-first active-last");
                            break;
                        case i == t[0]:
                            e(this).addClass("active active-first");
                            break;
                        case i == t[1]:
                            e(this).addClass("active active-last");
                            break;
                        case i > t[0] && i < t[1]:
                            e(this).addClass("active")
                    }
                }), this.range = t, this.value(t), this.element.addClass("js-active").trigger("set.filter", [t])
            },
            value: function(t) {
                t = t ? t : this.range, this.element.siblings('input[data-range="from"]').val(t[0]), this.element.siblings('input[data-range="to"]').val(t[1])
            },
            reset: function() {
                this.range = [0, 10000], this.value(this.range), this.element.find("[data-val]").removeClass("active"), this.element.removeClass("js-active").trigger("reset.filter")
            },
            _init: function() {
                var t = this;
                this.element.find("[data-val]").on("click", function(i) {
                    i.preventDefault();
                    var o = e(this).attr("data-val");
                    t.click(o)
                })
            }
        }, e.fn.filterRange = function(t) {
            if ("string" != typeof t) return this.each(function() {
                var i = e.data(this, "filterRange");
                i ? (i.option(t || {}), i._init()) : e.data(this, "filterRange", new e.filterRange(t, this))
            }), this;
            var i = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                var o = e.data(this, "filterRange");
                o[t].apply(o, i)
            })
        }
    }(window, jQuery), + function(t, e) {
        "use strict";
        Date.prototype.addDays = function(days) {
            var dat = new Date(this.valueOf());
            dat.setDate(dat.getDate() + days);
            return dat;
        }
        var i, o = {
            $form: e(".js-searchbar"),
            length: 0,
            submit: function() {
                var now = new Date(),
                    t = this,
                    o = t.$form,
                    inbox_data = null,
                    search_data = e("input.js-searchbar-control", o).val(),
                    labels_data = [],
                    kind_data = [],
                    before_data = now.addDays(-e('input[data-range="from"]', o).val()),
                    later_data = now.addDays(-e('input[data-range="to"]', o).val() - 1),
                    r = {};
                e(".js-search-label-items.labels", o).children(".checked").each(function() {
                    kind_data.push(e(this).attr("data-label"))
                }),
                e(".label-items-check.js-tile-label-items.js-search-label-items", o).children(".checked").each(function() {
                    labels_data.push(e(this).attr("data-label"))
                }),
                e(".js-search-label-items.inbox", o).children(".checked").each(function() {
                    if (inbox_data == null) {
                        if (e(this).attr("data-label") == 'id_inbox'){
                            inbox_data = '1';
                        }
                        if (e(this).attr("data-label") == 'id_outbox'){
                            inbox_data = '0';
                        }
                    } else {
                        inbox_data = null;
                    }
                }), r = {
                    search: search_data,
                    inbox: inbox_data,
                    labels: labels_data.join(','),
                    later: later_data.toISOString(),
                    before: before_data.toISOString(),
                    kind: kind_data.join(','),
                }, i && i.abort(), i = function() {
                    joxi.tileLoad.load('/home?' + e.param(r), !0);
                } ()
            },
            reset: function() {
                var t = this;
                t.$form.removeClass("active"), t.length = 0, t.$form.find("input.js-searchbar-control").val(""), t.$form.find(".js-search-label-items").children().removeClass("checked"), t.$form.find(".js-search-searchbarbar-label-items").removeClass("active").empty(), t.$form.find(".js-search-range").filterRange("reset"), t.title(), t.submit()
            },
            title: function() {
                var t = this,
                    i = e(".js-search-title", t.$form);
                i.text(t.length > 0 ? t.length + " " + declOfNum(t.length, messages.groupChosen) : "Выбрать ярлык")
            },
            check: function(t, i) {
                var o = this,
                    n = o.$form;
                i ? (e('.js-search-searchbarbar-label-items > [data-label="' + t.id + '"]', n).remove(), e(".js-search-searchbarbar-label-items", n).append('<span class="label checked" data-label="' + t.id + '" title="' + t.name + '">' + t.name + "</span>")) : (e('.js-search-label-items > [data-label="' + t.id + '"]', n).removeClass("checked"), e('.js-search-searchbarbar-label-items > [data-label="' + t.id + '"]', n).remove()), o.length = e(".js-search-label-items", n).children(".checked").length + e(".js-search-range.js-active", n).length, o.$form[o.length + e(".js-searchbar-control", n).val().length > 0 ? "addClass" : "removeClass"]("active"), e(".js-search-searchbarbar-label-items", n)[o.length > 0 && o.length < 4 ? "addClass" : "removeClass"]("active"), o.title(), o.submit()
            }
        };
        e(function() {
            var t = o.$form;
            t.on("submit", function(t) {
                t.preventDefault(), o.submit()
            }).on("reset", function(t) {
                t.preventDefault(), o.reset()
            }).on("show.bs.dropdown", ".js-search-dropdown", function() {
                t.addClass("open")
            }).on("hide.bs.dropdown", ".js-search-dropdown", function() {
                t.removeClass("open")
            }).on("keyup", ".js-searchbar-control", function() {
                var i = o,
                    n = e(this).val().length;
                t[i.length + n > 0 ? "addClass" : "removeClass"]("active")
            }).on("click", ".js-search-label-items  > .label", function(t) {
                t.preventDefault();
                var i = e(this),
                    n = {
                        id: i.attr("data-label"),
                        name: i.attr("title")
                    },
                    s = i.toggleClass("checked").hasClass("checked");
                o.check(n, s)
            }).on("click", ".js-search-searchbarbar-label-items  > .label", function(i) {
                i.preventDefault();
                var n = e(this),
                    s = {
                        id: n.attr("data-label"),
                        name: n.attr("title")
                    };
                "search-range" == n.attr("data-label") && t.find(".js-search-range").filterRange("reset"), o.check(s, !1)
            }), t.find(".js-search-range").filterRange(), t.find(".js-search-range").on("set.filter", function(t, i) {
                var n = e('.js-search-range > [data-val="' + i[1] + '"]').attr("data-original-title");
                o.check({
                    id: "search-range",
                    name: n
                }, !0)
            }).on("reset.filter", function() {
                o.check({
                    id: "search-range"
                }, !1)
            })
        })
    }(window, jQuery), + function(t, e) {
        "use strict";
        var i = {
            open: function(t) {
                e("body").addClass("mode-fullscreen");
                var i = new Image;
                i.src = t, e("body").append('<div class="tile-fullscreen loading"><div class="middle"><img src="" alt="" /></div><div class="helper"></div></div>'), e(i).on("load", function() {
                    e(".tile-fullscreen").removeClass("loading"), e(".tile-fullscreen img").attr("src", i.src)
                }), e(document).on("keydown.zoom", function(t) {
                    27 == t.keyCode && instance.close()
                })
            },
            close: function() {
                e("body").hasClass("mode-fullscreen") && (e("body").removeClass("mode-fullscreen"), e(".js-tile-items").masonry("reload")), e("body").removeClass("mode-fullscreen"), e(".tile-fullscreen").remove(), e(document).off("keydown.zoom")
            },
            init: function() {
                var t = this;
                e(document).on("click", "a.js-tile-link-zoom", function(i) {
                    i.preventDefault(), e(i.target).closest(".tile-preview-file").length || t.open(e(this).attr("href"))
                }), e(document).on("click", ".tile-fullscreen", function(e) {
                    e.preventDefault(), t.close()
                })
            }
        };
        e(function() {
            i.init()
        }), t.joxi = t.joxi || {}, t.joxi.tileFullScreen = i
    }(window, jQuery), + function(t, e) {
        "use strict";
        var i = {
            $list: e(".js-tile-items"),
            load: function(i, o) {
                var n = this;
                i = i ? i : e(".js-tile-items-loader").find("a").attr("href"), e(".js-tile-items-loader").addClass("loading js-disable"), n.$list.stop(!0).removeClass("transition"), o && n.$list.addClass("loading"), e.ajax({
                    url: i,
                    cache: !1
                }).done(function(i) {
                    var s = e(i ? i : "");
                    o && n.$list.empty().css("height", "auto"), n.$list.append(s).masonry("insert", s), s.find("img.js-tile-lazyload").lazyload(), n.$list.removeClass("loading").delay(500).queue(function() {
                        e(this).addClass("transition"), e(this).dequeue()
                    }), n.$list.find(".js-tile-items-load-link").length ? (e(".js-tile-items-loader").removeClass("loading js-disable").find("a").attr("href", n.$list.find(".js-tile-items-load-link").attr("href")), n.$list.find(".js-tile-items-load-link").remove(), e("body > .main").height() <= e(t).height() + 600 && n.load()) : (e(document).off(".tileScrollLoad"), e(".js-tile-items-loader").removeClass("loading").addClass("js-disable").hide())
                })
            },
            init: function() {
                var i = this;
                e("img.js-tile-lazyload").lazyload(), i.$list.hasClass("masonry") || i.$list.masonry({
                    itemSelector: ".js-tile-item"
                }), e(t).on("load", function() {
                    i.$list.masonry("reload"), i.$list.addClass("transition")
                }).on("resize", function() {
                    i.$list.masonry("reload"), i.$list.not(".loading").addClass("transition")
                }), e(".js-tile-items-loader").show(), e(t).on("load", function() {
                    e(".js-tile-items-loader").on("click.tileScrollLoad", "a", function() {
                        return i.load(), !1
                    }), e("body > .main").height() <= e(t).height() + 600 && e(".js-tile-items-loader").not(".js-disable").length > 0 && i.load(), e(t).on("scroll.tileScrollLoad", function() {
                        e(t).scrollTop() >= e("body > .main").height() - e(t).height() - 1500 && e(".js-tile-items-loader").not(".js-disable").length > 0 && i.load()
                    })
                })
            }
        };
        t.joxi = t.joxi || {}, t.joxi.tileLoad = i, e(function() {
            e(".js-tile-items").length > 0 && i.init()
        })
    }(window, jQuery),
    function(t) {
        function e(e) {
            this.input = e, "password" == e.attr("type") && this.handlePassword(), t(e[0].form).submit(function() {
                e.hasClass("placeholder") && e[0].value == e.attr("placeholder") && (e[0].value = "")
            })
        }
        e.prototype = {
            show: function(t) {
                if ("" === this.input[0].value || t && this.valueIsPlaceholder()) {
                    if (this.isPassword) try {
                        this.input[0].setAttribute("type", "text")
                    } catch (e) {
                        this.input.before(this.fakePassword.show()).hide()
                    }
                    this.input.addClass("placeholder"), this.input[0].value = this.input.attr("placeholder")
                }
            },
            hide: function() {
                if (this.valueIsPlaceholder() && this.input.hasClass("placeholder") && (this.input.removeClass("placeholder"), this.input[0].value = "", this.isPassword)) {
                    try {
                        this.input[0].setAttribute("type", "password")
                    } catch (t) {}
                    this.input.show(), this.input[0].focus()
                }
            },
            valueIsPlaceholder: function() {
                return this.input[0].value == this.input.attr("placeholder")
            },
            handlePassword: function() {
                var e = this.input;
                if (e.attr("realType", "password"), this.isPassword = !0, t.browser.msie && e[0].outerHTML) {
                    var i = t(e[0].outerHTML.replace(/type=(['"])?password\1/gi, "type=$1text$1"));
                    this.fakePassword = i.val(e.attr("placeholder")).addClass("placeholder").focus(function() {
                        e.trigger("focus"), t(this).hide()
                    }), t(e[0].form).submit(function() {
                        i.remove(), e.show()
                    })
                }
            }
        };
        var i = !!("placeholder" in document.createElement("input"));
        t.fn.placeholder = function() {
            return i ? this : this.each(function() {
                var i = t(this),
                    o = new e(i);
                o.show(!0), i.focus(function() {
                    o.hide()
                }), i.blur(function() {
                    o.show(!1)
                }), t.browser.msie && (t(window).load(function() {
                    i.val() && i.removeClass("placeholder"), o.show(!0)
                }), i.focus(function() {
                    if ("" == this.value) {
                        var t = this.createTextRange();
                        t.collapse(!0), t.moveStart("character", 0), t.select()
                    }
                }))
            })
        }
    }(jQuery),
    function(t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : t(window.jQuery || window.$)
    }(function(t) {
        var e, i = {
                className: "autosizejs",
                append: "",
                callback: !1,
                resizeDelay: 10
            },
            o = '<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',
            n = ["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent"],
            s = t(o).data("autosize", !0)[0];
        s.style.lineHeight = "99px", "99px" === t(s).css("lineHeight") && n.push("lineHeight"), s.style.lineHeight = "", t.fn.autosize = function(o) {
            return o = t.extend({}, i, o || {}), s.parentNode !== document.body && t(document.body).append(s), this.each(function() {
                function i() {
                    var e, i;
                    "getComputedStyle" in window ? (e = window.getComputedStyle(f), i = f.getBoundingClientRect().width, t.each(["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"], function(t, o) {
                        i -= parseInt(e[o], 10)
                    }), s.style.width = i + "px") : s.style.width = Math.max(u.width(), 0) + "px"
                }

                function a() {
                    var a = {};
                    if (e = f, s.className = o.className, d = parseInt(u.css("maxHeight"), 10), t.each(n, function(t, e) {
                            a[e] = u.css(e)
                        }), t(s).css(a), i(), window.chrome && "setSelectionRange" in f) {
                        var r = f.selectionStart;
                        f.value += " ", f.value = f.value.slice(0, -1), f.setSelectionRange(r, r)
                    }
                }

                function r() {
                    var t, n;
                    e !== f ? a() : i(), s.value = f.value + o.append, s.style.overflowY = f.style.overflowY, n = parseInt(f.style.height, 10), s.scrollTop = 0, s.scrollTop = 9e4, t = s.scrollTop, d && t > d ? (f.style.overflowY = "scroll", t = d) : (f.style.overflowY = "hidden", c > t && (t = c)), t += p, n !== t && (f.style.height = t + "px", m && o.callback.call(f, f))
                }

                function l() {
                    clearTimeout(h), h = setTimeout(function() {
                        var t = u.width();
                        t !== g && (g = t, r())
                    }, parseInt(o.resizeDelay, 10))
                }
                var d, c, h, f = this,
                    u = t(f),
                    p = 0,
                    m = t.isFunction(o.callback),
                    v = {
                        height: f.style.height,
                        overflow: f.style.overflow,
                        overflowY: f.style.overflowY,
                        wordWrap: f.style.wordWrap,
                        resize: f.style.resize
                    },
                    g = u.width();
                if (!u.data("autosize")) {
                    u.data("autosize", !0), ("border-box" === u.css("box-sizing") || "border-box" === u.css("-moz-box-sizing") || "border-box" === u.css("-webkit-box-sizing")) && (p = u.outerHeight() - u.height());
                    var b = Math.min(parseInt(u.css("lineHeight"), 10), u.height());
                    u.attr("data-height", u.outerHeight()), c = Math.max(parseInt(u.css("minHeight"), 10) - p || 0, b), u.css({
                        overflow: "hidden",
                        overflowY: "hidden",
                        wordWrap: "break-word",
                        resize: "none" === u.css("resize") || "vertical" === u.css("resize") ? "none" : "horizontal"
                    }), "onpropertychange" in f ? "oninput" in f ? u.on("input.autosize keyup.autosize", r) : u.on("propertychange.autosize", function() {
                        "value" === event.propertyName && r()
                    }) : u.on("input.autosize", r), o.resizeDelay !== !1 && t(window).on("resize.autosize", l), u.on("autosize.resize", r), u.on("autosize.resizeIncludeStyle", function() {
                        e = null, r()
                    }), u.on("autosize.destroy", function() {
                        e = null, clearTimeout(h), t(window).off("resize", l), u.off("autosize").off(".autosize").css(v).removeData("autosize")
                    }), r()
                }
            })
        }
    }),
    function(t) {
        t.fn.zclip = function(e) {
            if ("object" == typeof e && !e.length) {
                var i = t.extend({
                    path: "ZeroClipboard.swf",
                    copy: null,
                    beforeCopy: null,
                    afterCopy: null,
                    clickAfter: !0,
                    setHandCursor: !0,
                    setCSSEffects: !0
                }, e);
                return this.each(function() {
                    var e = t(this);
                    if (e.is(":visible") && ("string" == typeof i.copy || t.isFunction(i.copy))) {
                        ZeroClipboard.setMoviePath(i.path);
                        var o = new ZeroClipboard.Client;
                        t.isFunction(i.copy) && e.on("zClip_copy", i.copy), t.isFunction(i.beforeCopy) && e.on("zClip_beforeCopy", i.beforeCopy), t.isFunction(i.afterCopy) && e.on("zClip_afterCopy", i.afterCopy), o.setHandCursor(i.setHandCursor), o.setCSSEffects(i.setCSSEffects), o.addEventListener("mouseOver", function() {
                            e.trigger("mouseenter")
                        }), o.addEventListener("mouseOut", function() {
                            e.trigger("mouseleave")
                        }), o.addEventListener("mouseDown", function() {
                            e.trigger("mousedown"), o.setText(t.isFunction(i.copy) ? e.triggerHandler("zClip_copy") : i.copy), t.isFunction(i.beforeCopy) && e.trigger("zClip_beforeCopy")
                        }), o.addEventListener("complete", function(o, n) {
                            t.isFunction(i.afterCopy) ? e.trigger("zClip_afterCopy") : (n.length > 500 && (n = n.substr(0, 500) + "...\n\n(" + (n.length - 500) + " characters not shown)"), e.removeClass("hover"), alert("Copied text to clipboard:\n\n " + n)), i.clickAfter && e.trigger("click")
                        }), o.glue(e[0], e.parent()[0]), t(window).on("load", function() {
                            o.reposition()
                        })
                    }
                })
            }
            return "string" == typeof e ? this.each(function() {
                var i = t(this);
                e = e.toLowerCase();
                var o = i.data("zclipId"),
                    n = t("#" + o + ".zclip");
                "remove" == e ? (n.remove(), i.removeClass("active hover")) : "hide" == e ? (n.hide(), i.removeClass("active hover")) : "show" == e && n.show()
            }) : void 0
        }
    }(jQuery);
var ZeroClipboard = {
    version: "1.0.7",
    clients: {},
    moviePath: "ZeroClipboard.swf",
    nextId: 1,
    $: function(t) {
        return "string" == typeof t && (t = document.getElementById(t)), t.addClass || (t.hide = function() {
            this.style.display = "none"
        }, t.show = function() {
            this.style.display = ""
        }, t.addClass = function(t) {
            this.removeClass(t), this.className += " " + t
        }, t.removeClass = function(t) {
            for (var e = this.className.split(/\s+/), i = -1, o = 0; o < e.length; o++) e[o] == t && (i = o, o = e.length);
            return i > -1 && (e.splice(i, 1), this.className = e.join(" ")), this
        }, t.hasClass = function(t) {
            return !!this.className.match(new RegExp("\\s*" + t + "\\s*"))
        }), t
    },
    setMoviePath: function(t) {
        this.moviePath = t
    },
    dispatch: function(t, e, i) {
        var o = this.clients[t];
        o && o.receiveEvent(e, i)
    },
    register: function(t, e) {
        this.clients[t] = e
    },
    getDOMObjectPosition: function(t, e) {
        t = $(t).parent()[0];
        var i = {
            left: 0,
            top: 0,
            width: t.width ? t.width : t.offsetWidth,
            height: t.height ? t.height : t.offsetHeight
        };
        return t && t != e && (i.left += t.offsetLeft, i.top += t.offsetTop), i
    },
    Client: function(t) {
        this.handlers = {}, this.id = ZeroClipboard.nextId++, this.movieId = "ZeroClipboardMovie_" + this.id, ZeroClipboard.register(this.id, this), t && this.glue(t)
    }
};
ZeroClipboard.Client.prototype = {
        id: 0,
        ready: !1,
        movie: null,
        clipText: "",
        handCursorEnabled: !0,
        cssEffects: !0,
        handlers: null,
        glue: function(t, e, i) {
            this.domElement = ZeroClipboard.$(t);
            var o = 99;
            this.domElement.style.zIndex && (o = parseInt(this.domElement.style.zIndex, 10) + 1), "string" == typeof e ? e = ZeroClipboard.$(e) : "undefined" == typeof e && (e = document.getElementsByTagName("body")[0]);
            var n = ZeroClipboard.getDOMObjectPosition(this.domElement, e);
            this.div = document.createElement("div"), this.div.className = "zclip", this.div.id = "zclip-" + this.movieId, $(this.domElement).data("zclipId", "zclip-" + this.movieId);
            var s = this.div.style;
            if (s.position = "absolute", s.left = "" + n.left + "px", s.top = "" + n.top + "px", s.width = "" + n.width + "px", s.height = "" + n.height + "px", s.zIndex = o, "object" == typeof i)
                for (addedStyle in i) s[addedStyle] = i[addedStyle];
            e.appendChild(this.div), this.div.innerHTML = this.getHTML(n.width, n.height)
        },
        getHTML: function(t, e) {
            var i = "",
                o = "id=" + this.id + "&width=" + t + "&height=" + e;
            if (navigator.userAgent.match(/MSIE/)) {
                var n = location.href.match(/^https/i) ? "https://" : "http://";
                i += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + n + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + t + '" height="' + e + '" id="' + this.movieId + '" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + ZeroClipboard.moviePath + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + o + '"/><param name="wmode" value="transparent"/></object>'
            } else i += '<embed id="' + this.movieId + '" src="' + ZeroClipboard.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + t + '" height="' + e + '" name="' + this.movieId + '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + o + '" wmode="transparent" />';
            return i
        },
        hide: function() {
            this.div && (this.div.style.left = "-2000px")
        },
        show: function() {
            this.reposition()
        },
        destroy: function() {
            if (this.domElement && this.div) {
                this.hide(), this.div.innerHTML = "";
                var t = document.getElementsByTagName("body")[0];
                try {
                    t.removeChild(this.div)
                } catch (e) {}
                this.domElement = null, this.div = null
            }
        },
        reposition: function(t) {
            if (t && (this.domElement = ZeroClipboard.$(t), this.domElement || this.hide()), this.domElement && this.div) {
                var e = ZeroClipboard.getDOMObjectPosition(this.domElement),
                    i = this.div.style;
                i.left = "" + e.left + "px", i.top = "" + e.top + "px"
            }
        },
        setText: function(t) {
            this.clipText = t, this.ready && this.movie.setText(t)
        },
        addEventListener: function(t, e) {
            t = t.toString().toLowerCase().replace(/^on/, ""), this.handlers[t] || (this.handlers[t] = []), this.handlers[t].push(e)
        },
        setHandCursor: function(t) {
            this.handCursorEnabled = t, this.ready && this.movie.setHandCursor(t)
        },
        setCSSEffects: function(t) {
            this.cssEffects = !!t
        },
        receiveEvent: function(t, e) {
            switch (t = t.toString().toLowerCase().replace(/^on/, "")) {
                case "load":
                    if (this.movie = document.getElementById(this.movieId), !this.movie) {
                        var i = this;
                        return void setTimeout(function() {
                            i.receiveEvent("load", null)
                        }, 1)
                    }
                    if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) {
                        var i = this;
                        return setTimeout(function() {
                            i.receiveEvent("load", null)
                        }, 100), void(this.ready = !0)
                    }
                    this.ready = !0;
                    try {
                        this.movie.setText(this.clipText)
                    } catch (o) {}
                    try {
                        this.movie.setHandCursor(this.handCursorEnabled)
                    } catch (o) {}
                    break;
                case "mouseover":
                    this.domElement && this.cssEffects && (this.domElement.addClass("hover"), this.recoverActive && this.domElement.addClass("active"));
                    break;
                case "mouseout":
                    this.domElement && this.cssEffects && (this.recoverActive = !1, this.domElement.hasClass("active") && (this.domElement.removeClass("active"), this.recoverActive = !0), this.domElement.removeClass("hover"));
                    break;
                case "mousedown":
                    this.domElement && this.cssEffects && this.domElement.addClass("active");
                    break;
                case "mouseup":
                    this.domElement && this.cssEffects && (this.domElement.removeClass("active"), this.recoverActive = !1)
            }
            if (this.handlers[t])
                for (var n = 0, s = this.handlers[t].length; s > n; n++) {
                    var a = this.handlers[t][n];
                    "function" == typeof a ? a(this, e) : "object" == typeof a && 2 == a.length ? a[0][a[1]](this, e) : "string" == typeof a && window[a](this, e)
                }
        }
    },
    function(t) {
        var e = {
            path: "http://joxi.ru/swf/zeroclipboard.swf",
            create: function(i) {
                t(i).zclip({
                    path: e.path,
                    copy: function() {
                        return t(this).attr("data-link")
                    },
                    afterCopy: function() {
                        if (!t(this).parent().hasClass("active")) {
                            var e = t(this),
                                i = t(this).html();
                            e.parent().addClass("active"), e.html(e.attr("data-copy")), setTimeout(function() {
                                e.parent().removeClass("active"), e.html(i)
                            }, 1200)
                        }
                    }
                }), t(i).siblings(".zclip").mouseenter(function() {
                    t(this).prev().addClass("hover")
                }), t(i).siblings(".zclip").mouseleave(function() {
                    t(this).prev().removeClass("hover")
                })
            },
            init: function() {
                t(document).on("mouseenter", "[data-zclip=hover]", function() {
                    t(this).parent().hasClass("zclipboard") || (t(this).addClass("hover"), t(this).parent().addClass("zclipboard"), e.create(t(this)))
                }), t("[data-zclip=init]").each(function() {
                    t(this).parent().hasClass("zclipboard") || (t(this).addClass("hover"), t(this).parent().addClass("zclipboard"), e.create(t(this)))
                })
            }
        };
        t(function() {
            e.init()
        })
    }(jQuery),
    function(t, e, i, o) {
        var n = t(e);
        t.fn.lazyload = function(i) {
            function s() {
                var e = 0;
                r.each(function() {
                    var i = t(this);
                    if (!(l.skip_invisible && !i.is(":visible") || t.abovethetop(this, l) || t.leftofbegin(this, l)))
                        if (t.belowthefold(this, l) || t.rightoffold(this, l)) {
                            if (++e > l.failure_limit) return !1
                        } else i.trigger("appear"), e = 0
                })
            }
            var a, r = this,
                l = {
                    threshold: 0,
                    failure_limit: 0,
                    event: "scroll",
                    effect: "show",
                    container: e,
                    data_attribute: "original",
                    skip_invisible: !0,
                    appear: null,
                    load: null
                };
            return i && (o !== i.failurelimit && (i.failure_limit = i.failurelimit, delete i.failurelimit), o !== i.effectspeed && (i.effect_speed = i.effectspeed, delete i.effectspeed), t.extend(l, i)), a = l.container === o || l.container === e ? n : t(l.container), 0 === l.event.indexOf("scroll") && a.bind(l.event, function() {
                return s()
            }), this.each(function() {
                var e = this,
                    i = t(e);
                e.loaded = !1, i.one("appear", function() {
                    if (!this.loaded) {
                        if (l.appear) {
                            var o = r.length;
                            l.appear.call(e, o, l)
                        }
                        t("<img />").bind("load", function() {
                            i.hide().attr("src", i.data(l.data_attribute))[l.effect](l.effect_speed), e.loaded = !0;
                            var o = t.grep(r, function(t) {
                                return !t.loaded
                            });
                            if (r = t(o), l.load) {
                                var n = r.length;
                                l.load.call(e, n, l)
                            }
                        }).attr("src", i.data(l.data_attribute))
                    }
                }), 0 !== l.event.indexOf("scroll") && i.bind(l.event, function() {
                    e.loaded || i.trigger("appear")
                })
            }), n.bind("resize", function() {
                s()
            }), /iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion) && n.bind("pageshow", function(e) {
                e.originalEvent.persisted && r.each(function() {
                    t(this).trigger("appear")
                })
            }), t(e).load(function() {
                s()
            }), this
        }, t.belowthefold = function(i, s) {
            var a;
            return a = s.container === o || s.container === e ? n.height() + n.scrollTop() : t(s.container).offset().top + t(s.container).height(), a <= t(i).offset().top - s.threshold
        }, t.rightoffold = function(i, s) {
            var a;
            return a = s.container === o || s.container === e ? n.width() + n.scrollLeft() : t(s.container).offset().left + t(s.container).width(), a <= t(i).offset().left - s.threshold
        }, t.abovethetop = function(i, s) {
            var a;
            return a = s.container === o || s.container === e ? n.scrollTop() : t(s.container).offset().top, a >= t(i).offset().top + s.threshold + t(i).height()
        }, t.leftofbegin = function(i, s) {
            var a;
            return a = s.container === o || s.container === e ? n.scrollLeft() : t(s.container).offset().left, a >= t(i).offset().left + s.threshold + t(i).width()
        }, t.inviewport = function(e, i) {
            return !(t.rightoffold(e, i) || t.leftofbegin(e, i) || t.belowthefold(e, i) || t.abovethetop(e, i))
        }, t.extend(t.expr[":"], {
            "below-the-fold": function(e) {
                return t.belowthefold(e, {
                    threshold: 0
                })
            },
            "above-the-top": function(e) {
                return !t.belowthefold(e, {
                    threshold: 0
                })
            },
            "right-of-screen": function(e) {
                return t.rightoffold(e, {
                    threshold: 0
                })
            },
            "left-of-screen": function(e) {
                return !t.rightoffold(e, {
                    threshold: 0
                })
            },
            "in-viewport": function(e) {
                return t.inviewport(e, {
                    threshold: 0
                })
            },
            "above-the-fold": function(e) {
                return !t.belowthefold(e, {
                    threshold: 0
                })
            },
            "right-of-fold": function(e) {
                return t.rightoffold(e, {
                    threshold: 0
                })
            },
            "left-of-fold": function(e) {
                return !t.rightoffold(e, {
                    threshold: 0
                })
            }
        })
    }(jQuery, window, document),
    function(t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
    }(function(t) {
        function e(t) {
            return t = n.json ? JSON.stringify(t) : String(t), n.raw ? t : encodeURIComponent(t)
        }

        function i(e, i) {
            var s;
            if (n.raw) s = e;
            else t: {
                var a = e;0 === a.indexOf('"') && (a = a.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
                try {
                    a = decodeURIComponent(a.replace(o, " ")), s = n.json ? JSON.parse(a) : a;
                    break t
                } catch (r) {}
                s = void 0
            }
            return t.isFunction(i) ? i(s) : s
        }
        var o = /\+/g,
            n = t.cookie = function(o, s, a) {
                if (1 < arguments.length && !t.isFunction(s)) {
                    if (a = t.extend({}, n.defaults, a), "number" == typeof a.expires) {
                        var r = a.expires,
                            l = a.expires = new Date;
                        l.setTime(+l + 864e5 * r)
                    }
                    return document.cookie = [n.raw ? o : encodeURIComponent(o), "=", e(s), a.expires ? "; expires=" + a.expires.toUTCString() : "", a.path ? "; path=" + a.path : "", a.domain ? "; domain=" + a.domain : "", a.secure ? "; secure" : ""].join("")
                }
                for (var r = o ? void 0 : {}, l = document.cookie ? document.cookie.split("; ") : [], d = 0, c = l.length; c > d; d++) {
                    var h, f = l[d].split("=");
                    if (h = f.shift(), h = n.raw ? h : decodeURIComponent(h), f = f.join("="), o && o === h) {
                        r = i(f, s);
                        break
                    }
                    o || void 0 === (f = i(f)) || (r[h] = f)
                }
                return r
            };
        n.defaults = {}, t.removeCookie = function(e, i) {
            return void 0 === t.cookie(e) ? !1 : (t.cookie(e, "", t.extend({}, i, {
                expires: -1
            })), !t.cookie(e))
        }
    }), + function(t) {
        "use strict";

        function e() {
            var t = document.createElement("bootstrap"),
                e = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
            for (var i in e)
                if (void 0 !== t.style[i]) return {
                    end: e[i]
                }
        }
        t.fn.emulateTransitionEnd = function(e) {
            var i = !1,
                o = this;
            t(this).one(t.support.transition.end, function() {
                i = !0
            });
            var n = function() {
                i || t(o).trigger(t.support.transition.end)
            };
            return setTimeout(n, e), this
        }, t(function() {
            t.support.transition = e()
        })
    }(window.jQuery), + function(t) {
        "use strict";
        var e = function(e) {
            this.element = t(e)
        };
        e.prototype.show = function() {
            var e = this.element,
                i = e.closest("ul:not(.dropdown-menu)"),
                o = e.attr("data-target");
            if (o || (o = e.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
                var n = i.find(".active:last a")[0],
                    s = t.Event("show.bs.tab", {
                        relatedTarget: n
                    });
                if (e.trigger(s), !s.isDefaultPrevented()) {
                    var a = t(o).length > 0 ? t(o) : e.closest(".tabbable").find("[data-tab=" + o + "]");
                    this.activate(e.parent("li"), i), this.activate(a, a.parent(), function() {
                        e.trigger({
                            type: "shown.bs.tab",
                            relatedTarget: n
                        })
                    })
                }
            }
        }, e.prototype.activate = function(e, i, o) {
            function n() {
                s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), e.addClass("active"), a ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu") && e.closest("li.dropdown").addClass("active"), o && o()
            }
            var s = i.find("> .active"),
                a = o && t.support.transition && s.hasClass("fade");
            a ? s.one(t.support.transition.end, n).emulateTransitionEnd(150) : n(), s.removeClass("in")
        };
        var i = t.fn.tab;
        t.fn.tab = function(i) {
            return this.each(function() {
                var o = t(this),
                    n = o.data("bs.tab");
                n || o.data("bs.tab", n = new e(this)), "string" == typeof i && n[i]()
            })
        }, t.fn.tab.Constructor = e, t.fn.tab.noConflict = function() {
            return t.fn.tab = i, this
        }, t(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(e) {
            e.preventDefault(), t(this).tab("show")
        }), t(document).on("click.bs.tab.data-api", '[data-toggle="tab-reset"]', function(e) {
            e.preventDefault(), t(this).closest(".tabbable").find(".tile-tabs > li:first-child > .item").tab("show")
        })
    }(window.jQuery), + function(t) {
        "use strict";

        function e() {
            t(o).remove(), t(n).each(function(e) {
                var o = i(t(this));
                o.hasClass("open") && (o.trigger(e = t.Event("hide.bs.dropdown")), e.isDefaultPrevented() || o.removeClass("open").trigger("hidden.bs.dropdown"))
            })
        }

        function i(e) {
            var i = e.attr("data-target");
            i || (i = e.attr("href"), i = i && /#/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
            var o = i && t(i);
            return e.hasClass("js-dropdown-toggle") && (o = e.closest(".dropdown")), o && o.length ? o : e.parent()
        }
        var o = ".dropdown-backdrop",
            n = "[data-toggle=dropdown]:not(.disabled)",
            s = function(e) {
                t(e).on("click.bs.dropdown", this.toggle)
            };
        s.prototype.toggle = function(o) {
            var n = t(this);
            if (!n.is(".disabled, :disabled")) {
                var s = i(n),
                    a = s.hasClass("open");
                if (e(), !a) {
                    if ("ontouchstart" in document.documentElement && !s.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", e), s.trigger(o = t.Event("show.bs.dropdown")), o.isDefaultPrevented()) return;
                    s.toggleClass("open").trigger("shown.bs.dropdown"), n.focus()
                }
                return !1
            }
        }, s.prototype.keydown = function(e) {
            if (/(38|40|27)/.test(e.keyCode)) {
                var o = t(this);
                if (e.preventDefault(), e.stopPropagation(), !o.is(".disabled, :disabled")) {
                    var s = i(o),
                        a = s.hasClass("open");
                    if (!a || a && 27 == e.keyCode) return 27 == e.which && s.find(n).focus(), o.click();
                    var r = t("[role=menu] li:not(.divider):visible a", s);
                    if (r.length) {
                        var l = r.index(r.filter(":focus"));
                        38 == e.keyCode && l > 0 && l--, 40 == e.keyCode && l < r.length - 1 && l++, ~l || (l = 0), r.eq(l).focus()
                    }
                }
            }
        };
        var a = t.fn.dropdown;
        t.fn.dropdown = function(e) {
            return this.each(function() {
                var i = t(this),
                    o = i.data("dropdown");
                o || i.data("dropdown", o = new s(this)), "string" == typeof e && o[e].call(i)
            })
        }, t.fn.dropdown.Constructor = s, t.fn.dropdown.noConflict = function() {
            return t.fn.dropdown = a, this
        }, t(document).on("click.bs.dropdown.data-api", e).on("click.bs.dropdown.data-api", ".dropdown .dropdown-container, .modal, .modal-backdrop", function(t) {
            t.stopPropagation()
        }).on("click.bs.dropdown.data-api", n, s.prototype.toggle).on("keydown.bs.dropdown.data-api", n + ", [role=menu]", s.prototype.keydown).on("click.bs.dropdown.data-api", ".dropdown .js-dropdown-toggle", s.prototype.toggle)
    }(window.jQuery), + function(t) {
        "use strict";
        var e = function(e, i) {
            this.options = i, this.$element = t(e), this.$backdrop = this.isShown = null, this.options.remote && this.$element.load(this.options.remote)
        };
        e.DEFAULTS = {
            backdrop: !0,
            keyboard: !0,
            show: !0
        }, e.prototype.toggle = function(t) {
            return this[this.isShown ? "hide" : "show"](t)
        }, e.prototype.show = function(e) {
            var i = this,
                o = t.Event("show.bs.modal", {
                    relatedTarget: e
                }),
                n = t.Event("draw.bs.modal", {
                    relatedTarget: e
                });
            this.$element.trigger(o), this.isShown || o.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.$element.on("click.dismiss.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.backdrop(function() {
                var o = t.support.transition && i.$element.hasClass("fade");
                i.$element.parent().length || i.$element.appendTo(document.body), i.$element.trigger(n), i.$element.show(), o && i.$element[0].offsetWidth, i.$element.addClass("in").attr("aria-hidden", !1), i.enforceFocus();
                var s = t.Event("shown.bs.modal", {
                    relatedTarget: e
                });
                o ? i.$element.find(".modal-dialog").one(t.support.transition.end, function() {
                    i.$element.focus().trigger(s)
                }).emulateTransitionEnd(300) : i.$element.focus().trigger(s)
            }))
        }, e.prototype.hide = function(e) {
            e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one(t.support.transition.end, t.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
        }, e.prototype.enforceFocus = function() {
            t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
                this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.focus()
            }, this))
        }, e.prototype.escape = function() {
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", t.proxy(function(t) {
                27 == t.which && this.hide()
            }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
        }, e.prototype.hideModal = function() {
            var t = this;
            this.$element.hide(), this.backdrop(function() {
                t.removeBackdrop(), t.$element.trigger("hidden.bs.modal")
            })
        }, e.prototype.removeBackdrop = function() {
            this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
        }, e.prototype.backdrop = function(e) {
            var i = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var o = t.support.transition && i;
                if (this.$backdrop = t('<div class="modal-backdrop ' + i + '" />').appendTo(document.body), this.$element.on("click.dismiss.modal", t.proxy(function(t) {
                        t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
                    }, this)), o && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
                o ? this.$backdrop.one(t.support.transition.end, e).emulateTransitionEnd(150) : e()
            } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(t.support.transition.end, e).emulateTransitionEnd(150) : e()) : e && e()
        };
        var i = t.fn.modal;
        t.fn.modal = function(i, o) {
            return this.each(function() {
                var n = t(this),
                    s = n.data("bs.modal"),
                    a = t.extend({}, e.DEFAULTS, n.data(), "object" == typeof i && i);
                s || n.data("bs.modal", s = new e(this, a)), "string" == typeof i ? s[i](o) : a.show && s.show(o)
            })
        }, t.fn.modal.Constructor = e, t.fn.modal.noConflict = function() {
            return t.fn.modal = i, this
        };
        t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
            var i = t(this),
                o = i.attr("href"),
                n = i.attr("data-target") || o,
                s = i.attr("data-modal-type");
            if (e.preventDefault(), 0 == n.indexOf("#")) {
                var a = t(i.attr("data-target") || o && o.replace(/.*(?=#[^\s]+$)/, "")),
                    r = a.data("modal") ? "toggle" : t.extend({
                        remote: !/#/.test(o) && o
                    }, a.data(), i.data());
                a.modal(r, this).one("hide", function() {
                    i.is(":visible") && i.focus()
                })
            } else t.ajax({
                url: n,
                cache: !1
            }).done(function(e) {
                t('<div class="modal fade modal-loaded" role="dialog"><div class="modal-dialog">' + e + '<button type="button" class="btn-close" data-dismiss="modal">&times;</button></div></div>').one("show.bs.modal", function() {
                    t("body").addClass("modal-open pseudo-scrollbar")
                }).one("draw.bs.modal", function() {
                    var e = t(this);
                    s && t(".modal-dialog", e).addClass("modal-type-" + s), e.removeClass("modal-loaded"), e.on("redraw", ".modal-content", function() {
                        t(".js-modal-delay-close", e).length && setTimeout(function() {
                            e.modal("hide")
                        }, 2e3)
                    })
                }).modal().one("hidden.bs.modal", function() {
                    t("body").removeClass("modal-open pseudo-scrollbar"), t(this).remove()
                })
            })
        })
    }(window.jQuery), + function(t) {
        "use strict";
        var e = function(i, o) {
            this.options = t.extend({}, e.DEFAULTS, o), this.$window = t(window).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(i), this.affixed = this.unpin = null, this.checkPosition()
        };
        e.RESET = "affix affix-top affix-bottom", e.DEFAULTS = {
            offset: 0
        }, e.prototype.checkPositionWithEventLoop = function() {
            setTimeout(t.proxy(this.checkPosition, this), 1)
        }, e.prototype.checkPosition = function() {
            if (this.$element.is(":visible")) {
                var i = t(document).height(),
                    o = this.$window.scrollTop(),
                    n = this.$element.offset(),
                    s = this.options.offset,
                    a = s.top,
                    r = s.bottom;
                "object" != typeof s && (r = a = s), "function" == typeof a && (a = s.top()), "function" == typeof r && (r = s.bottom());
                var l = null != this.unpin && o + this.unpin <= n.top ? !1 : null != r && n.top + this.$element.height() >= i - r ? "bottom" : null != a && a >= o ? "top" : !1;
                this.affixed !== l && (this.unpin && this.$element.css("top", ""), this.affixed = l, this.unpin = "bottom" == l ? n.top - o : null, this.$element.removeClass(e.RESET).addClass("affix" + (l ? "-" + l : "")), "bottom" == l && this.$element.offset({
                    top: document.body.offsetHeight - r - this.$element.height()
                }))
            }
        };
        var i = t.fn.affix;
        t.fn.affix = function(i) {
            return this.each(function() {
                var o = t(this),
                    n = o.data("bs.affix"),
                    s = "object" == typeof i && i;
                n || o.data("bs.affix", n = new e(this, s)), "string" == typeof i && n[i]()
            })
        }, t.fn.affix.Constructor = e, t.fn.affix.noConflict = function() {
            return t.fn.affix = i, this
        }, t(window).on("load", function() {
            t('[data-spy="affix"]').each(function() {
                var e = t(this),
                    i = e.data();
                i.offset = i.offset || {}, i.offsetBottom && (i.offset.bottom = i.offsetBottom), i.offsetTop && (i.offset.top = i.offsetTop), e.affix(i)
            })
        })
    }(window.jQuery), + function(t) {
        "use strict";
        var e = function(e, i) {
            this.$element = t(e), this.options = t.extend({}, t.fn.typeahead.defaults, i), this.matcher = this.options.matcher || this.matcher, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.source = this.options.source, this.$menu = t(e).next(".typeahead"), this.$list = this.$menu.children(".typeahead-list"), this.shown = !1, this.listen()
        };
        e.prototype = {
            constructor: e,
            select: function() {
                return this.$menu.find(".active").trigger("click"), this.$element.val(""), this.hide()
            },
            updater: function(t) {
                return t
            },
            show: function() {
                t.extend({}, this.$element.position(), {
                    height: this.$element[0].offsetHeight
                });
                return this.$menu.show(), this.shown = !0, this
            },
            hide: function() {
                return this.$menu.hide(), this.shown = !1, this
            },
            lookup: function() {
                var e;
                return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (e = t.isFunction(this.source) ? this.source(this.query, t.proxy(this.process, this)) : this.source, e ? this.process(e) : this)
            },
            process: function(e) {
                var i = this;
                return e = t.grep(e, function(t) {
                    return i.matcher(t)
                }), this.render(e).show()
            },
            matcher: function(t) {
                return ~t.toLowerCase().indexOf(this.query.toLowerCase())
            },
            highlighter: function(t) {
                var e = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
                return t.replace(new RegExp("(" + e + ")", "ig"), function(t, e) {
                    return "<strong>" + e + "</strong>"
                })
            },
            render: function(e) {
                var i = this;
                return i.$list.children().removeClass("visible").hide(), e = t(e).map(function(t, e) {
                    i.$list.children('[title="' + e + '"]').addClass("visible").html(i.highlighter(e)).show()
                }), i.$menu.find(".js-typeahead-val").html(i.query), i.$menu.find(".active").removeClass("active"), i.$menu.find(".visible").first().addClass("active"), this
            },
            next: function() {
                var e = this.$menu.find(".active").removeClass("active"),
                    i = e.next(".visible");
                i.length || (i = t(this.$list.children(".visible")[0])), i.addClass("active")
            },
            prev: function() {
                var t = this.$list.find(".active").removeClass("active"),
                    e = t.prev(".visible");
                e.length || (e = this.$list.children(".visible").last()), e.addClass("active")
            },
            listen: function() {
                this.$element.on("focus", t.proxy(this.focus, this)).on("blur", t.proxy(this.blur, this)).on("keypress", t.proxy(this.keypress, this)).on("keyup", t.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", t.proxy(this.keydown, this)), this.$menu.on("click", t.proxy(this.click, this)).on("mouseenter", ".visible", t.proxy(this.mouseenter, this)).on("mouseleave", ".visible", t.proxy(this.mouseleave, this))
            },
            eventSupported: function(t) {
                var e = t in this.$element;
                return e || (this.$element.setAttribute(t, "return;"), e = "function" == typeof this.$element[t]), e
            },
            move: function(t) {
                if (this.shown) {
                    switch (t.keyCode) {
                        case 9:
                        case 13:
                        case 27:
                            t.preventDefault();
                            break;
                        case 38:
                            t.preventDefault(), this.prev();
                            break;
                        case 40:
                            t.preventDefault(), this.next()
                    }
                    t.stopPropagation()
                }
            },
            keydown: function(e) {
                this.suppressKeyPressRepeat = ~t.inArray(e.keyCode, [40, 38, 9, 13, 27]), this.move(e)
            },
            keypress: function(t) {
                this.suppressKeyPressRepeat || this.move(t)
            },
            keyup: function(t) {
                switch (t.keyCode) {
                    case 40:
                    case 38:
                    case 16:
                    case 17:
                    case 18:
                        break;
                    case 9:
                    case 13:
                        if (!this.shown) return;
                        this.select();
                        break;
                    case 27:
                        if (!this.shown) return;
                        this.hide();
                        break;
                    default:
                        this.lookup()
                }
                t.stopPropagation(), t.preventDefault()
            },
            focus: function() {
                this.focused = !0
            },
            blur: function() {
                this.focused = !1, !this.mousedover && this.shown && this.hide()
            },
            click: function() {
                this.$element.val(""), this.hide()
            },
            mouseenter: function(e) {
                this.mousedover = !0, this.$menu.find(".active").removeClass("active"), t(e.currentTarget).addClass("active")
            },
            mouseleave: function() {
                this.$menu.find(".active").removeClass("active"), this.mousedover = !1, !this.focused && this.shown && this.hide()
            }
        };
        var i = t.fn.typeahead;
        t.fn.typeahead = function(i) {
            return this.each(function() {
                var o = t(this),
                    n = o.data("typeahead"),
                    s = "object" == typeof i && i;
                n || o.data("typeahead", n = new e(this, s)), "string" == typeof i && n[i]()
            })
        }, t.fn.typeahead.defaults = {
            source: [],
            items: 8,
            item: '<li><label class="item check"></label></li>',
            minLength: 1
        }, t.fn.typeahead.Constructor = e, t.fn.typeahead.noConflict = function() {
            return t.fn.typeahead = i, this
        }, t(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function() {
            var e = t(this);
            e.data("typeahead") || e.typeahead(e.data())
        })
    }(window.jQuery), + function(t) {
        "use strict";
        var e = function(t, e) {
            this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", t, e)
        };
        e.DEFAULTS = {
            animation: !0,
            placement: "top",
            selector: !1,
            template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            container: !1
        }, e.prototype.init = function(e, i, o) {
            this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(o);
            for (var n = this.options.trigger.split(" "), s = n.length; s--;) {
                var a = n[s];
                if ("click" == a) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
                else if ("manual" != a) {
                    var r = "hover" == a ? "mouseenter" : "focus",
                        l = "hover" == a ? "mouseleave" : "blur";
                    this.$element.on(r + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
                }
            }
            this.options.selector ? this._options = t.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        }, e.prototype.getDefaults = function() {
            return e.DEFAULTS
        }, e.prototype.getOptions = function(e) {
            return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
                show: e.delay,
                hide: e.delay
            }), e
        }, e.prototype.getDelegateOptions = function() {
            var e = {},
                i = this.getDefaults();
            return this._options && t.each(this._options, function(t, o) {
                i[t] != o && (e[t] = o)
            }), e
        }, e.prototype.enter = function(e) {
            var i = e instanceof this.constructor ? e : t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
            return clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function() {
                "in" == i.hoverState && i.show()
            }, i.options.delay.show)) : i.show()
        }, e.prototype.leave = function(e) {
            var i = e instanceof this.constructor ? e : t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
            return clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function() {
                "out" == i.hoverState && i.hide()
            }, i.options.delay.hide)) : i.hide()
        }, e.prototype.show = function() {
            var e = t.Event("show.bs." + this.type);
            if (this.hasContent() && this.enabled) {
                if (this.$element.trigger(e), e.isDefaultPrevented()) return;
                var i = this.tip();
                this.setContent(), this.options.animation && i.addClass("fade");
                var o = "function" == typeof this.options.placement ? this.options.placement.call(this, i[0], this.$element[0]) : this.options.placement,
                    n = /\s?auto?\s?/i,
                    s = n.test(o);
                s && (o = o.replace(n, "") || "top"), i.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).addClass(o), this.options.container ? i.appendTo(this.options.container) : i.insertAfter(this.$element);
                var a = this.getPosition(),
                    r = i[0].offsetWidth,
                    l = i[0].offsetHeight;
                if (s) {
                    var d = this.$element.parent(),
                        c = o,
                        h = document.documentElement.scrollTop || document.body.scrollTop,
                        f = "body" == this.options.container ? window.innerWidth : d.outerWidth(),
                        u = "body" == this.options.container ? window.innerHeight : d.outerHeight(),
                        p = "body" == this.options.container ? 0 : d.offset().left;
                    o = "bottom" == o && a.top + a.height + l - h > u ? "top" : "top" == o && a.top - h - l < 0 ? "bottom" : "right" == o && a.right + r > f ? "left" : "left" == o && a.left - r < p ? "right" : o, i.removeClass(c).addClass(o)
                }
                var m = this.getCalculatedOffset(o, a, r, l);
                this.applyPlacement(m, o), this.$element.trigger("shown.bs." + this.type)
            }
        }, e.prototype.applyPlacement = function(t, e) {
            var i, o = this.tip(),
                n = o[0].offsetWidth,
                s = o[0].offsetHeight,
                a = parseInt(o.css("margin-top"), 10),
                r = parseInt(o.css("margin-left"), 10);
            isNaN(a) && (a = 0), isNaN(r) && (r = 0), t.top = t.top + a, t.left = t.left + r, o.offset(t).addClass("in");
            var l = o[0].offsetWidth,
                d = o[0].offsetHeight;
            if ("top" == e && d != s && (i = !0, t.top = t.top + s - d), /bottom|top/.test(e)) {
                var c = 0;
                t.left < 0 && (c = -2 * t.left, t.left = 0, o.offset(t), l = o[0].offsetWidth, d = o[0].offsetHeight), this.replaceArrow(c - n + l, l, "left")
            } else this.replaceArrow(d - s, d, "top");
            i && o.offset(t)
        }, e.prototype.replaceArrow = function(t, e, i) {
            this.arrow().css(i, t ? 50 * (1 - t / e) + "%" : "")
        }, e.prototype.setContent = function() {
            var t = this.tip(),
                e = this.getTitle();
            t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
        }, e.prototype.hide = function() {
            function e() {
                "in" != i.hoverState && o.detach()
            }
            var i = this,
                o = this.tip(),
                n = t.Event("hide.bs." + this.type);
            return this.$element.trigger(n), n.isDefaultPrevented() ? void 0 : (o.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? o.one(t.support.transition.end, e).emulateTransitionEnd(150) : e(), this.$element.trigger("hidden.bs." + this.type), this)
        }, e.prototype.fixTitle = function() {
            var t = this.$element;
            (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
        }, e.prototype.hasContent = function() {
            return this.getTitle()
        }, e.prototype.getPosition = function() {
            var e = this.$element[0];
            return t.extend({}, "function" == typeof e.getBoundingClientRect ? e.getBoundingClientRect() : {
                width: e.offsetWidth,
                height: e.offsetHeight
            }, this.$element.offset())
        }, e.prototype.getCalculatedOffset = function(t, e, i, o) {
            return "bottom" == t ? {
                top: e.top + e.height,
                left: e.left + e.width / 2 - i / 2
            } : "top" == t ? {
                top: e.top - o,
                left: e.left + e.width / 2 - i / 2
            } : "left" == t ? {
                top: e.top + e.height / 2 - o / 2,
                left: e.left - i
            } : {
                top: e.top + e.height / 2 - o / 2,
                left: e.left + e.width
            }
        }, e.prototype.getTitle = function() {
            var t, e = this.$element,
                i = this.options;
            return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
        }, e.prototype.tip = function() {
            return this.$tip = this.$tip || t(this.options.template)
        }, e.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        }, e.prototype.validate = function() {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        }, e.prototype.enable = function() {
            this.enabled = !0
        }, e.prototype.disable = function() {
            this.enabled = !1
        }, e.prototype.toggleEnabled = function() {
            this.enabled = !this.enabled
        }, e.prototype.toggle = function(e) {
            var i = e ? t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
            i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
        }, e.prototype.destroy = function() {
            this.hide().$element.off("." + this.type).removeData("bs." + this.type)
        };
        var i = t.fn.tooltip;
        t.fn.tooltip = function(i) {
            return this.each(function() {
                var o = t(this),
                    n = o.data("bs.tooltip"),
                    s = "object" == typeof i && i;
                n || o.data("bs.tooltip", n = new e(this, s)), "string" == typeof i && n[i]()
            })
        }, t.fn.tooltip.Constructor = e, t.fn.tooltip.noConflict = function() {
            return t.fn.tooltip = i, this
        }
    }(window.jQuery),
    function(t) {
        t.isScrollToFixed = function(e) {
            return !!t(e).data("ScrollToFixed")
        }, t.ScrollToFixed = function(e, i) {
            function o() {
                k.trigger("preUnfixed.ScrollToFixed"), c(), k.trigger("unfixed.ScrollToFixed"), S = -1, j = k.offset().top, $ = k.offset().left, v.options.offsets && ($ += k.offset().left - k.position().left), -1 == T && (T = $), g = k.css("position"), C = !0, -1 != v.options.bottom && (k.trigger("preFixed.ScrollToFixed"), l(), k.trigger("fixed.ScrollToFixed"))
            }

            function n() {
                var t = v.options.limit;
                return t ? "function" == typeof t ? t.apply(k) : t : 0
            }

            function s() {
                return "fixed" === g
            }

            function a() {
                return "absolute" === g
            }

            function r() {
                return !(s() || a())
            }

            function l() {
                if (!s()) {
                    var t = k[0].getBoundingClientRect();
                    z.css({
                        display: k.css("display"),
                        width: t.width,
                        height: t.height,
                        "float": k.css("float")
                    }), cssOptions = {
                        "z-index": v.options.zIndex,
                        position: "fixed",
                        top: -1 == v.options.bottom ? f() : "",
                        bottom: -1 == v.options.bottom ? "" : v.options.bottom,
                        "margin-left": "0px"
                    }, v.options.dontSetWidth || (cssOptions.width = k.css("width")), k.css(cssOptions), k.addClass(v.options.baseClassName), v.options.className && k.addClass(v.options.className), g = "fixed"
                }
            }

            function d() {
                var t = n(),
                    e = $;
                v.options.removeOffsets && (e = "", t -= j), cssOptions = {
                    position: "absolute",
                    top: t,
                    left: e,
                    "margin-left": "0px",
                    bottom: ""
                }, v.options.dontSetWidth || (cssOptions.width = k.css("width")), k.css(cssOptions), g = "absolute"
            }

            function c() {
                r() || (S = -1, z.css("display", "none"), k.css({
                    "z-index": x,
                    width: "",
                    position: b,
                    left: "",
                    top: w,
                    "margin-left": ""
                }), k.removeClass("scroll-to-fixed-fixed"), v.options.className && k.removeClass(v.options.className), g = null)
            }

            function h(t) {
                t != S && (k.css("left", $ - t), S = t)
            }

            function f() {
                var t = v.options.marginTop;
                return t ? "function" == typeof t ? t.apply(k) : t : 0
            }

            function u() {
                if (t.isScrollToFixed(k) && !k.is(":hidden")) {
                    var e = C,
                        i = r();
                    C ? r() && (j = k.offset().top, $ = k.offset().left) : o();
                    var u = t(window).scrollLeft(),
                        g = t(window).scrollTop(),
                        y = n();
                    v.options.minWidth && t(window).width() < v.options.minWidth ? r() && e || (m(), k.trigger("preUnfixed.ScrollToFixed"), c(), k.trigger("unfixed.ScrollToFixed")) : v.options.maxWidth && t(window).width() > v.options.maxWidth ? r() && e || (m(), k.trigger("preUnfixed.ScrollToFixed"), c(), k.trigger("unfixed.ScrollToFixed")) : -1 == v.options.bottom ? y > 0 && g >= y - f() ? i || a() && e || (m(), k.trigger("preAbsolute.ScrollToFixed"), d(), k.trigger("unfixed.ScrollToFixed")) : g >= j - f() ? (s() && e || (m(), k.trigger("preFixed.ScrollToFixed"), l(), S = -1, k.trigger("fixed.ScrollToFixed")), h(u)) : r() && e || (m(), k.trigger("preUnfixed.ScrollToFixed"), c(), k.trigger("unfixed.ScrollToFixed")) : y > 0 ? g + t(window).height() - k.outerHeight(!0) >= y - (f() || -p()) ? s() && (m(), k.trigger("preUnfixed.ScrollToFixed"), "absolute" === b ? d() : c(), k.trigger("unfixed.ScrollToFixed")) : (s() || (m(), k.trigger("preFixed.ScrollToFixed"), l()), h(u), k.trigger("fixed.ScrollToFixed")) : h(u)
                }
            }

            function p() {
                return v.options.bottom ? v.options.bottom : 0
            }

            function m() {
                var t = k.css("position");
                k.trigger("absolute" == t ? "postAbsolute.ScrollToFixed" : "fixed" == t ? "postFixed.ScrollToFixed" : "postUnfixed.ScrollToFixed")
            }
            var v = this;
            v.$el = t(e), v.el = e, v.$el.data("ScrollToFixed", v);
            var g, b, y, w, x, C = !1,
                k = v.$el,
                j = 0,
                $ = 0,
                T = -1,
                S = -1,
                z = null,
                F = function() {
                    k.is(":visible") && (C = !1, u())
                },
                E = function() {
                    window.requestAnimationFrame ? requestAnimationFrame(u) : u()
                },
                _ = function(t) {
                    t = t || window.event, t.preventDefault && t.preventDefault(), t.returnValue = !1
                };
            v.init = function() {
                v.options = t.extend({}, t.ScrollToFixed.defaultOptions, i), x = k.css("z-index"), v.$el.css("z-index", v.options.zIndex), z = t("<div />"), g = k.css("position"), b = k.css("position"), y = k.css("float"), w = k.css("top"), r() && v.$el.after(z), t(window).bind("resize.ScrollToFixed", F), t(window).bind("scroll.ScrollToFixed", E), "ontouchmove" in window && t(window).bind("touchmove.ScrollToFixed", u), v.options.preFixed && k.bind("preFixed.ScrollToFixed", v.options.preFixed), v.options.postFixed && k.bind("postFixed.ScrollToFixed", v.options.postFixed), v.options.preUnfixed && k.bind("preUnfixed.ScrollToFixed", v.options.preUnfixed), v.options.postUnfixed && k.bind("postUnfixed.ScrollToFixed", v.options.postUnfixed), v.options.preAbsolute && k.bind("preAbsolute.ScrollToFixed", v.options.preAbsolute), v.options.postAbsolute && k.bind("postAbsolute.ScrollToFixed", v.options.postAbsolute), v.options.fixed && k.bind("fixed.ScrollToFixed", v.options.fixed), v.options.unfixed && k.bind("unfixed.ScrollToFixed", v.options.unfixed), v.options.spacerClass && z.addClass(v.options.spacerClass), k.bind("resize.ScrollToFixed", function() {
                    z.height(k.height())
                }), k.bind("scroll.ScrollToFixed", function() {
                    k.trigger("preUnfixed.ScrollToFixed"), c(), k.trigger("unfixed.ScrollToFixed"), u()
                }), k.bind("detach.ScrollToFixed", function(e) {
                    _(e), k.trigger("preUnfixed.ScrollToFixed"), c(), k.trigger("unfixed.ScrollToFixed"), t(window).unbind("resize.ScrollToFixed", F), t(window).unbind("scroll.ScrollToFixed", E), k.unbind(".ScrollToFixed"), z.remove(), v.$el.removeData("ScrollToFixed")
                }), F()
            }, v.init()
        }, t.ScrollToFixed.defaultOptions = {
            marginTop: 0,
            limit: 0,
            bottom: -1,
            zIndex: 1e3,
            baseClassName: "scroll-to-fixed-fixed"
        }, t.fn.scrollToFixed = function(e) {
            return this.each(function() {
                new t.ScrollToFixed(this, e)
            })
        }
    }(jQuery), $(function() {
        "use strict";
        $(".banner-left, .banner-right").scrollToFixed({
                marginTop: function() {
                    var t = $(window).height() - $(".banner-left, .banner-right").outerHeight(!0) - 50;
                    return t >= 0 ? 0 : t
                }
            }), $(".js-nav-lavalamp").on("mouseenter", ".item", function() {
                var t = $(this).position().left,
                    e = $(".item-link", this).width();
                $(".item-lavalamp").css({
                    left: t,
                    width: e
                })
            }), $(".item:not(.item-btn)").hover(function() {
                $(this).parent().addClass("show-white")
            }, function() {
                $(this).parent().removeClass("show-white")
            }), $(document).on("keydown", "textarea", function(t) {
                13 != t.keyCode && 10 != t.keyCode || 1 != t.ctrlKey && 1 != t.metaKey || $(this).closest("form").submit()
            }), $("body").tooltip({
                selector: "[data-tooltip=tooltip]",
                container: "body"
            }),

            $(document).on("click", ".video-js", function() {
                $(this).addClass("init");
                console.log($(this).find('video').duration);
            }),



            $("#scroll-up").click(function() {
                $("html, body").animate({
                    scrollTop: 0
                }, 500)
            }), $(document).on("reinit", function() {
                $("input[placeholder], textarea[placeholder]", this).placeholder(), $("textarea.js-autosize", this).removeClass("js-autosize").autosize()
            }), $("form").trigger("reinit"), $(".dropdown-tile").on("show.bs.dropdown", function() {
                $(".main").addClass("open-dropdown-tile")
            }), $(".dropdown-tile").on("hide.bs.dropdown", function() {
                $(".main").removeClass("open-dropdown-tile")
            }),
            $(document).on("click", ".js-input-copy", function() {
                this.select()
            })
    }), + function(t) {
        if (!(t("#scrollbar-width").length > 0)) {
            var e = t('<div class="test-scrollbar"/>').prependTo(t("body")),
                i = t('<div class="inner"/>').appendTo(e),
                o = e.width() - i.width();
            e.remove(), t("head").append('<style id="scrollbar-width">.pseudo-scrollbar, .pseudo-scrollbar .navbar-fixed-top {margin-right:' + o + "px;}</style>")
        }
    }(window.jQuery),
    function(t) {
        var e = document.createElement("div");
        e.setAttribute("class", "pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links"), e.setAttribute("style", "width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;"), document.body.appendChild(e), setTimeout(function() {
            var i = !1;
            (null === e.offsetParent || 0 == e.offsetHeight || 0 == e.offsetLeft || 0 == e.offsetTop || 0 == e.offsetWidth || 0 == e.clientHeight || 0 == e.clientWidth) && (i = !0), t.apply(e, [i])
        }, 500)
    }(function(t) {
        ga("set", "dimension1", t ? "Yes" : "No"), ga("send", "event", "system", "push", "adblock", {
            nonInteraction: 1
        })


    });

function initializationBrowser() {
    var _ua = window.navigator.userAgent;
    var browser = {
        version: (_ua.match(/.+(?:me|ox|on|rv|it|era|opr|ie)[\/: ]([\d.]+)/) || [0, '0'])[1],
        opera: (/opera/i.test(_ua) || /opr/i.test(_ua)),
        msie: (/msie/i.test(_ua) && !/opera/i.test(_ua) || /trident\//i.test(_ua)),
        msie6: (/msie 6/i.test(_ua) && !/opera/i.test(_ua)),
        msie7: (/msie 7/i.test(_ua) && !/opera/i.test(_ua)),
        msie8: (/msie 8/i.test(_ua) && !/opera/i.test(_ua)),
        msie9: (/msie 9/i.test(_ua) && !/opera/i.test(_ua)),
        mozilla: /firefox/i.test(_ua),
        yabrowser: /yabrowser/i.test(_ua),
        chrome: /chrome/i.test(_ua),
        safari: (!(/chrome/i.test(_ua)) && /webkit|safari|khtml/i.test(_ua)),
        iphone: /iphone/i.test(_ua),
        ipod: /ipod/i.test(_ua),
        iphone4: /iphone.*OS 4/i.test(_ua),
        ipod4: /ipod.*OS 4/i.test(_ua),
        ipad: /ipad/i.test(_ua),
        android: /android/i.test(_ua),
        bada: /bada/i.test(_ua),
        mobile: /iphone|ipod|ipad|opera mini|opera mobi|iemobile|android/i.test(_ua),
        msie_mobile: /iemobile/i.test(_ua),
        safari_mobile: /iphone|ipod|ipad/i.test(_ua),
        opera_mobile: /opera mini|opera mobi/i.test(_ua),
        opera_mini: /opera mini/i.test(_ua),
        mac: /mac/i.test(_ua),
        search_bot: /(yandex|google|stackrambler|aport|slurp|msnbot|bingbot|twitterbot|ia_archiver|facebookexternalhit)/i.test(_ua)
    };

    if (browser.opera) {
        $('.icons-md-browser').addClass('icon-md-opera');
        $('.icons-md-browser').removeClass('icon-md-chrome');
        $('.browser-name').html('Opera');
        $('.js-link-market-browsers').attr('href', 'https://addons.opera.com/ru/extensions/details/joxi-full-page-screen-capture/');
    } else if (browser.yabrowser) {
        $('.icons-md-browser').addClass('icon-md-ya');
        $('.icons-md-browser').removeClass('icon-md-chrome');
        $('.browser-name').html('Yandex Browser');
        $('.js-link-market-browsers').attr('href', 'https://addons.opera.com/ru/extensions/details/joxi-full-page-screen-capture/');
    } else {
        $('.icons-md-browser').addClass('icon-md-chrome');
        $('.browser-name').html('Chrome');
        $('.js-link-market-browsers').attr('href', 'https://chrome.google.com/webstore/detail/joxi-screenshot-capture/jhcdlkgjiehgpnpolkbnmpffjodigbkb');
    }
}
initializationBrowser();