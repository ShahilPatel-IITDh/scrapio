/*
 *@Title: DBS Design Language Custom Plugins
 *@Author: Redford Sumcad
 *@Modified by: Muhammad Adib RAMZALI
 *@Description: Custom javascript plugins created for specific usage of ALL DBS (Mobile banking, Public website, Vickers, Internet banking, RM Mobility).
 *Date Started: 4 Sept 2015
 */
$(function() {
        $.isDevice();
        $("#pwebHeader").length > 0 && $("#pwebHeader").load("../templates/pweb-header.html", function() { $.mobileMenuInit(), $.stickyMegaMenu(), $.desktopResizeAutoWidth(".main-navigation-content") }), $("#iWealthHeader").length > 0 && $("#iWealthHeader").load("../templates/iwealth-header.html", function() { $.stickyMegaMenu(), $(".menu-group-box").slimscroll({ height: "500", railOpacity: .5, color: "#9B9B9B" }), $(".menu-box-body>a").click(function(a) { $(this).find(".menu-expanded, .menu-collapsed").toggle(), a.preventDefault() }), $('.menu-tab[data-toggle="tab"]').on("show.bs.tab", function(a) { $(a.relatedTarget.hash).parents(".styled-select").css("height", "auto") }) }), $("#ibHeader").length > 0 && $("#ibHeader").load("../templates/headers.html", function() { $.stickyMegaMenu() }), $("#footer").load("../templates/footer.html", function() {}), $(".alert .close").on("click", function(a) { $(this).parent().hide(), a.preventDefault() }), $(".ico-information1").tooltip({ placement: "top", html: !0, animation: !0 }), $.radioCheckFirefoxInit()
    }),
    function(a) {
        $ipad = 768, a.searchAnimate = function() { var b = a(".search-boxslide"); if (b.length > 0) { b.find(".btn-search").on("click", function() { a(this).find(".icon").hasClass("ico-arrowright3") || a(this).closest(".search-boxslide").toggleClass("slide-animate"), a(document).one("click", function c(d) { 0 === a(".search-boxslide").has(d.target).length ? b.toggleClass("slide-animate") : a(document).one("click", c) }) }) } }, a.animateScrollTo = function(b, c) { a("html, body").animate({ scrollTop: b }, 500, c) }, a.adjustSlimScroll = function(b, c) {
            var d = a(b).siblings(".slimScrollBar"),
                e = d.css("top");
            e = e.substring(0, e.length - 2), d.css("top", e - e / c + "px")
        }, a.radioCheckFirefoxInit = function() {
            if (-1 != navigator.userAgent.indexOf("Firefox")) {
                var b = a("input[type=radio]").not($("#app input[type=radio]"));
                a(b).after("<label></label>")
            }
        }, a.ieFormsInit = function() {
            var b = 0,
                c = a(".custom-dropdown select");
            if ("Microsoft Internet Explorer" == navigator.appName) {
                ie = !0;
                var d = navigator.userAgent;
                null != new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(d) && (b = parseInt(RegExp.$1))
            } else ie = !1;
            if (ie && b >= 7) {
                var e = a('input[type="checkbox"]'),
                    f = a('input[type="radio"]');
                e.length > 0 && e.uniform(), f.length > 0 && f.uniform(), c.length > 0 && c.uniform(), c.each(function() { el = a(this), el.data("origWidth", el.outerWidth()), el.mouseenter(function() { a(this).css("width", "auto") }).on("blur change", function() { el = a(this), el.css("width", el.data("origWidth")) }) }), a.uniform.restore("select[multiple]"), a("select[multiple]").off()
            }
        }, a.heroBlockCarousel = function() {
            function b(d) { i.find(".item").each(function() { a(this).off("click touchstart", b) }), d.stopPropagation(), e(), h.find(".carousel-inner").is(":animated") || (a(this).parent().children(".active").removeClass("active"), a(this).addClass("active"), c(a(this).index(), d), f = setInterval(c, k)) }

            function c(c, d) {
                var e = h.find(".item");
                if (first = e.first(), last = e.last(), void 0 === c) {
                    first.parent().children(".active").removeClass("active");
                    var f = a(e.get(2));
                    f.addClass("active"), l = f.data("id")
                } else -1 == c ? (first.parent().children(".active").removeClass("active"), first.addClass("active"), l = a(first).data("id")) : l = a(e.get(c)).data("id");
                if (null != l)
                    if (void 0 != c)
                        if (0 == c) m.carousel("prev");
                        else {
                            if (1 == c) return !1;
                            if (2 == c) m.carousel("next");
                            else if (c > 2) {
                                var g = a(i).find(".carousel-inner"),
                                    k = g.children(".active").index(),
                                    n = a(i).find(".carousel-inner .item ").length - 1,
                                    o = a(i).find(".carousel-inner .item ").length - 2;
                                k == n ? m.carousel(1) : k == o ? m.carousel(0) : m.carousel(k + 2)
                            } else m.carousel(l)
                        }
                else m.carousel("next");
                var p, q, r = "left",
                    s = 500;
                if (void 0 === c ? p = first.outerWidth(!0) : 3 == c ? (p = 2 * first.outerWidth(!0), s *= 2) : 2 == c ? p = first.outerWidth(!0) : 1 == c ? (q = 0, r = "none") : 0 == c ? (q = first.outerWidth(!0), r = "right") : -1 == c && (q = first.outerWidth(!0), r = "right"), "none" === r);
                else if ("left" === r) h.find(".item").length <= j && h.find(".carousel-inner").append(a(first).clone(!0)), 3 == c && h.find(".carousel-inner").append(a(first).next().clone(!0)), h.find(".carousel-inner").is(":animated") || (h.find(".item").each(function() { a(this).off("click touchstart", b) }), h.find(".carousel-inner").stop().animate({ left: -p }, s, function() { h.find(".item").each(function() { a(this).on("click touchstart", b) }), a(this).css({ left: 0 }), a(h.find(".carousel-inner .active").prev()).prevAll().remove() }));
                else {
                    var t = a(last).clone(!0);
                    h.find(".carousel-inner").css({ left: -q }).prepend(t).stop().animate({ left: 0 }, s, function() { a(last).remove() })
                }
            }

            function d() { e(), c(), f = setInterval(c, k) }

            function e() { clearInterval(f), clearTimeout(g) }
            var f, g, h = a("#heroBlockNavCarousel"),
                i = a("#heroBlockCarousel"),
                j = h.find(".item").length,
                k = 5e3,
                l = 0,
                m = i.carousel({ interval: !1, wrap: !0 });
            h.find(".item").each(function() { a(this).show().data("id", l).on("dblclick", function(a) {}), a(this).show().data("id", l).on("click touchstart", b), l++ }), i.on("mouseover", function() { e() }).on("mouseout", function() { f = setInterval(c, k) }),
                function() { e(), g = setTimeout(d, k) }()
        }, a.carouselPlayPauseInit = function(b) {
            a(b).on("click", function(b) {
                var c = a(this);
                c.find(".ico-pause").length > 0 ? (c.find(".icon").removeClass("ico-pause").addClass("ico-play"), c.parents(".carousel").carousel("pause")) : (c.find(".icon").removeClass("ico-play").addClass("ico-pause"), c.parents(".carousel").carousel("cycle")), b.preventDefault()
            })
        }, a.mobileMenuInit = function() {
            function b() {
                a(".mobile-menu").on("click.mobileMenuClick", function() {
                	var b = a(this).attr("data-target");
                    setTimeout(function() { a(".mobile-navbar").not(b).removeClass("in").addClass("collapse") }, 100)
                })
            }
            var c = a(".mobile-menu");
            a.isDevice() ? b() : c.unbind(".mobileMenuClick"), a(window).on("resize", function() {
                var d = a.isDevice();
                c.unbind(".mobileMenuClick"), d && b()
            })
        }, a.modalMenuInit = function() {
            function b() {
                var b = a(".show-overlay"),
                    c = b.find(".subscription-box").outerHeight(),
                    d = b.find(".menu-box-header").outerHeight() + 16,
                    e = a(window).height() - (a(".mega-menu").outerHeight() + c + d);
                b.find(".menu-content").height(e)
            }

            function c() {
                var b = a(".header-navigation");
                a(document).off(".overlayMenuClick").on("click.overlayMenuClick", function(c) {
                    var d = a(".show-overlay");
                    0 === b.has(c.target).length && 0 === d.has(c.target).length && (f.removeClass("show-overlay"), e.removeClass("mdl-body"), a(".modal-backdrop").remove(), a(window).unbind(".resizeOverlay"), c.preventDefault())
                })
            }

            function d() { a(window).unbind(".resizeOverlay").on("resize.resizeOverlay", function() { b() }) }
            var e = a("body"),
                f = a(".overlay-menu");
            a("body").on("click", ".header-placeholder-two .menu-overlay", function(g) {
                var h = a(this),
                i = a(h.attr("data-target"));
                e.hasClass("mdl-body") || (e.addClass("mdl-body"), e.append('<div class="modal-backdrop  in"></div>')), i.hasClass("show-overlay") || (f.removeClass("show-overlay"), i.toggleClass("show-overlay"), b(), d(), c()), g.preventDefault()
            })
        }, a.stickyMegaMenu = function() {
            header = function() {
                return {
                    navInner: a(".navbar-inner"),
                    subnavcontent: a(".main-navigation ul li .small"),
                    headerTag: a(".header-navigation .button-wrapper"),
                    headerTagIcon: a(".header-navigation .button-wrapper.icon-menu"),
                    headerTop: a("header.navbar "),
                    headerMenu: a(".header-menu"),
                    border: a(".thicker.border-bottom"),
                    logoMin: a(".img-logo-min"),
                    logo: a(".img-logo"),
                    dropList: a(".pull-left.submenulist .styled-select"),
                    langNode: a(".header-navigation #langOption"),
                    anim: { menuAnimation: !0, recursiveMenuAnimation: !1, animateStickyHeader: !0, duration: 500 },
                    min: !1,
                    init: function(a) { a && "object" == typeof a && (this.anim = a), this.behavior(), this.animateDropdownList() },
                    animateDropdownList: function() {
                        var b = a(".submenulist"),
                            c = this,
                            d = this.anim.menuAnimation ? this.anim.duration : 0;
                        a(b).on({
                            mouseover: function() {
                                var b = a(this).find(".styled-select");
                                if (!a(b).hasClass("active")) {
                                    a(b).prop("style", "");
                                    var c = a(b).css("height");
                                    a(b).addClass("active").prop("style", "height: 0").stop(!1, !1).animate({ height: c }, d).show()
                                }
                            },
                            mousedown: function() {
                                var b = a(this),
                                    c = b.find(".styled-select");
                                if (!c.hasClass("form-box")) {
                                    if ("ontouchstart" in document.documentElement) return;
                                    a(c).hasClass("active") && (b.hasClass("searchbox") || b.trigger("mouseleave"))
                                }
                            },
                            mouseleave: function() {
                                var b = a(this).find(".styled-select");
                                a(b).hasClass("active") && (c.anim.recursiveMenuAnimation || a(b).prop("style", ""), a(b).removeClass("active").stop(!1, !1).animate({ height: 0 }, d, function() { a(this).prop("style", "").hide() }))
                            },
                            touchstart: function() {
                                var b = a(this),
                                    c = b.find(".styled-select");
                                a(c).hasClass("mobile") ? b.hasClass("searchbox") || (b.trigger("mouseleave"), b.removeClass("mobile")) : (b.trigger("mouseover"), b.addClass("mobile"))
                            }
                        })
                    },
                    behavior: function() {
                        function b() {
                            var b = a(".container");
                            if (!b.hasClass("dls-container")) {
                                c();
                                var d = a(".header-placeholder").outerHeight();
                                d >= 144 && (d = 145), b.css("margin-top", d)
                            }
                        }

                        function c() { a(window).on("scroll.stickyMegaMenu", function() { a(".styled-select").hide(), a(document).scrollTop() > 80 && !d.min ? (d.navInner.stop(!0, !1).animate({ height: "48px" }, e), d.headerTagIcon.length > 0 ? d.headerTag.stop(!0, !1).animate({ paddingTop: "18px", paddingBottom: "8px" }, e) : d.headerTag.stop(!0, !1).animate({ paddingTop: "18px", paddingBottom: "13px" }, e), d.headerMenu.stop(!0, !1).animate({ height: "48px" }, e), d.border.stop(!0, !1).animate({ height: "5px" }, e), d.subnavcontent.hide(), d.navInner.parents(".header-placeholder-two").length > 0 && (d.navInner.addClass("nav-collapse"), d.navInner.find(".navbar-links .active .up-caret").hide().fadeIn(1e3)), d.anim.animateStickyHeader ? d.logoMin.fadeIn() : d.logoMin.show(), d.logo.hide(), d.min = !0) : a(document).scrollTop() < 20 && d.min && (d.navInner.stop(!0, !1).animate({ height: "72px" }, e), d.headerTag.stop(!0, !1).animate({ paddingTop: "30px", paddingBottom: "20px" }, e), d.headerMenu.stop(!0, !1).animate({ height: "72px" }, e), d.border.stop(!0, !1).animate({ height: "10px" }, e), d.subnavcontent.show(), d.logoMin.hide(), d.navInner.parents(".header-placeholder-two").length > 0 && (d.navInner.removeClass("nav-collapse"), d.navInner.find(".navbar-links .active .up-caret").hide().fadeIn(1e3)), d.anim.animateStickyHeader ? d.logo.fadeIn() : d.logo.show(), d.min = !1) }) }
                        var d = this,
                            e = this.anim.animateStickyHeader ? this.anim.duration : 0;
                        a.isDevice() || b();
                        var f = !1;
                        a(window).on("resize", function() { a.isDevice() ? f || (a(".container").prop("style",""), a(window).unbind(".stickyMegaMenu"), d.navInner.prop("style",""), f = !0) : f && (b(), f = !1) })
                    }
                }
            }(), header.init({ menuAnimation: !0, recursiveMenuAnimation: !0, animateStickyHeader: !0, duration: 500 })
        }, a.enableSwipeCarousel = function() {
            var b = a(".carousel");
            b.on("touchstart", function(c) {
                var d = c.originalEvent.touches[0].pageX;
                a(this).one("touchmove", function(a) {
                    var c = a.originalEvent.touches[0].pageX;
                    Math.floor(d - c) > 5 ? b.carousel("next") : Math.floor(d - c) < -5 && b.carousel("prev"), b.carousel("pause")
                }), a(window).on("scroll.carouselScroll", function(c) { b.carousel("cycle"), a(window).off(".carouselScroll") }), b.on("touchend", function() { a(this).off("touchmove") })
            })
        }, a.toggleArrows = function(b) {
            b.on("shown.bs.collapse", function(b) {
                var c = b.currentTarget.id,
                    d = a(this),
                    e = a("#btn" + c),
                    f = e.find(".icon"),
                    g = e.attr("data-line"),
                    h = e.attr("data-label");
                defaultLabel = e.attr("data-label-default"), f.hasClass("ico-arrowdown1") && f.removeClass("ico-arrowdown1").addClass("ico-arrowup1"), void 0 === g && "false" === g || d.closest(".transaction-box").addClass("open"), void 0 === h && "" === h || e.find(".txt-label").text(h), b.preventDefault()
            }), b.on("hidden.bs.collapse", function(b) {
                var c = b.currentTarget.id,
                    d = a(this),
                    e = a("#btn" + c),
                    f = e.find(".icon"),
                    g = e.attr("data-line"),
                    h = e.attr("data-label");
                defaultLabel = e.attr("data-label-default"), f.hasClass("ico-arrowup1") && f.removeClass("ico-arrowup1").addClass("ico-arrowdown1"), void 0 === g && "" === g || d.closest(".transaction-box").removeClass("open"), void 0 === h && "" === h || e.find(".txt-label").text(defaultLabel), b.preventDefault()
            })
        }, a.desktopResizeAutoWidth = function(b) { a.isDevice() ? a(b).find("li:visible").prop("style","") : a.autoWidthElem(b), a(window).off(".autoWidthResize"), a(window).on("resize.autoWidthResize", function() { a.isDevice() ? a(b).find("li").prop("style","") : a.autoWidthElem(b) }) }, a.subMenuMobileInit = function() {
            function b() { a("#btn-sub-close").off(), a("#btn-sub-close").on("click", function(b) { a("#navTopSubMenu").find('li:not(".mob-preview")').toggle(), b.preventDefault() }) }
            a.isDevice() ? b() : a.autoWidthElem("#navTopSubMenu", ".btn-close-box"), a(window).on("resize", function() { a.isDevice() ? (a("#navTopSubMenu li").prop("style",""), b()) : (a.autoWidthElem("#navTopSubMenu", ".btn-close-box"), a("#btn-sub-close").off()) })
        }, a.autoWidthElem = function(b, c) {
            ! function() {
                var d = a(b),
                    e = d.find("li:visible"),
                    f = e.length;
                if (void 0 !== typeof c && (e = d.find('li:visible:not("' + c + '")'), f = e.length), f > 0) {
                    var g = d.width(),
                        h = g / f;
                    e.css({ width: h + "px", "max-width": h + "px" })
                }
            }()
        }, a.autoHeightElem = function(b) {
            var c = -1;
            a(b).each(function() { c = c > a(this).css("height") ? c : a(this).css("height") }), a(b).each(function() { a(this).css("height", c) })
        }, a.autoHeightWindow = function(b) {
            var c = a("body"),
                d = a(window),
                e = a(b),
                f = d.height() - c.height();
            f > 0 && e.css("height", e.height() + f)
        }, a.rightNavSwingInit = function(b) {
            function c(a) { a.animate({ width: 40 }, { duration: 500, queue: !1 }, "swing").find(".nav-title").animate({ opacity: 0, width: 0, paddingLeft: 0 }, { duration: 500, queue: !1 }) }
            c(a(b)), a(b).on("mouseover", function() { a(this).animate({ width: 292 }, { duration: 500, queue: !1 }, "swing").find(".nav-title").animate({ opacity: 1, width: 252, display: "block" }, { duration: 500, queue: !1 }).css("display", "block") }).on("mouseout", function() { c(a(this)) })
        }, a.getScrollbarWidth = function() { var b, c, d; return "visible" == a("body").css("overflow-y") ? void 0 === d && (b = a('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"), c = b.children(), d = c.innerWidth() - c.height(99).innerWidth(), b.remove()) : d = 0, d }, a.isDevice = function() {
            var b = !1;
            $window = a(window);
            var c = a.getScrollbarWidth();
            return $window.outerWidth() + c < $ipad && (b = !0), b
        }, a.swapImageInit = function(b) {
            a(b).on("click", function(b) {
                var c = a(this),
                    d = c.attr("img-src"),
                    e = c.attr("img-hover");
                c.toggleClass("active"), c.hasClass("active") ? c.prop("src", e) : c.prop("src", d), b.preventDefault()
            })
        }, a.loadImageInit = function() {
            function b(a) { a ? c(d, "mobile-src") : c(d, "desktop-src") }

            function c(b, c) {
                b.each(function(b) {
                    var d = a(this);
                    d.prop("src", d.prop(c)).addClass("img-opacity")
                })
            }
            var d = a(".img-src"),
                e = a.isDevice();
            d.length > 0 && (b(e), $window.on("resize.loadImageSrc", function() { e = a.isDevice(), b(e) }))
        }, a.searchInit = function(b) {
            function c(a) {
                var b = a.closest(e),
                    b = a.closest(e),
                    c = b.find(".btn-search .icon");
                b.find("input").val(""), c.prop("class", "icon").addClass("ico-search"), b.find(".btn-close").hide()
            }

            function d(a) {
                var b = a.closest(e);
                b.find(".btn-search .icon").prop("class", "icon").addClass("ico-arrowright3"), b.find(".btn-close").show()
            }
            var e = ".search-box";
            void 0 !== b && (e = b), a(e + " input").on("keyup", function() {
                var b = a(this);
                0 == b.val().length ? c(b) : d(b)
            }), a(e + " .btn-close").on("click", function(b) { c(a(this)), b.preventDefault() })
        }, a.cardCompareInit = function() {
            function b(b) { a(".cardsCount").html(b) }

            function c() {
                if (a.isDevice()) {
                    var b = a(".cards-result-box").width();
                    a(".cards-result-content .first-index .mob-cardlabels").css("width", b), a.autoHeightElem(".card-name"), a.autoHeightElem(".cards-bestfor"), a.autoHeightElem(".mob-cards-type"), a.autoHeightElem(".mob-minincome"), a.autoHeightElem(".mob-minincomeforeign")
                }
            }

            function d() {
                function b() { winTop = Math.floor(50 * a(window).height() / 100), s01_top = section01.offset().top, section02.length > 0 && (e = section02.offset().top - d.height()) }

                function c(a) { b(), a > s01_top ? 0 == s01_active && (d.addClass("fixed"), s01_active = 1, c(a)) : a <= s01_top && 1 == s01_active && (d.removeClass("fixed"), s01_active = 0, c(a)), section02.length > 0 && (a > e ? 0 == s02_active && (cardsName.show(), s02_active = 1, c(a)) : a <= e && 1 == s02_active && (cardsName.hide(), s02_active = 0, c(a))) }
                var d = a("#btnCardRecompareBox");
                if (cardsName = a("#cardNameFixedBox"), section01 = a("#recompareCardsSection"), s01_active = 0, section02 = a(".cards-result-box .card-name:first"), s02_active = 0, winTop = Math.floor(50 * a(window).height() / 100), s01_top = section01.offset().top, section02.length > 0) var e = section02.offset().top - d.height();
                a(window).resize(b), b(), a(window).on("scroll.recompareScroll", function() { c(a(this).scrollTop()) }), b()
            }
            var e = a("#recompareCardsSection"),
                f = a("#compareCardsSection"),
                g = a("#errorCreditcards"),
                h = a("#cardsCompareAction");
            a(".cards-box .layout-box.type4 > a").cardsSelection({ trigger: "click", fxCallBack: !1, onTicked: function(a) { b(a.tickCounter), 3 == a.tickCounter && b(a.tickCounter + " (Max)"), f.show(), h.show() }, errorCallback: function(a) { g.show() }, onUnTicked: function(a) { 0 == a.tickCounter ? h.hide() : b(a.tickCounter), g.is(":visible") && g.hide() } }), a("#btnCardCompare").on("click", function(b) {
                var g = f.offset().top;
                f.slideUp(), e.slideDown(500, function() { a("html, body").animate({ scrollTop: g }, 500, function() { c(), d() }) }), b.preventDefault()
            }), a("#btnCardRecompare").on("click", function(b) {
                var c = e.offset().top;
                e.slideUp(), f.slideDown(500, function() { a("html, body").animate({ scrollTop: c }, 500, function() { a(window).unbind(".recompareScroll") }) }), b.preventDefault()
            })
        }, a.enableBranchDropdown = function(b) { a(b).on("shown.bs.dropdown", function() { a(this).find(".btnArrow").removeClass("ico-arrowdown1").addClass("ico-arrowup1") }), a(b).on("hidden.bs.dropdown", function() { a(this).find(".btnArrow").removeClass("ico-arrowup1").addClass("ico-arrowdown1") }), a(b).find("#checkAll").change(function() { a(".branch-menu-content input:checkbox").prop("checked", a(this).prop("checked")) }) }, a.mapSliderInit = function(b) { a(b).on("click", function() { var c = a(".map-side-nav"); "300px" == c.css("width") ? (c.animate({ width: "-320", right: "0", paddingLeft: "0", borderLeftWidth: "0" }), a(b).css("left", "-22px")) : (c.animate({ width: "300", paddingLeft: "25px" }), a(b).css("left", "-20px")) }), a(window).on("resize.resizeMapWidth", function() { a.isDevice() && a(".map-side-nav").prop("style", "") }) }, a.manageSubscriptions = function() {
            a(".topics-content").on("click", function(b) {
                var c = a(this),
                    d = c.parents(".insights-topics-box");
                c.toggleClass("active"), d.find(".selection-count").html(d.find(".active").length), b.preventDefault()
            }), a(".img-swap").displaySelectionCount()
        }, a.dropdownListInit = function() {
            a(".drop-box>a").off().on("click", function() { a(this).closest(".drop-box").find(".dropdown-menu").toggle(), a(document).one("click", function b(c) { 0 === a(".drop-box").has(c.target).length ? a(".dropdown-menu").hide() : a(document).one("click", b) }) }), a(".drop-box .dropdown-menu li a").off().on("click", function(b) {
                var c = a(this),
                    d = c.text();
                c.closest(".drop-box").find(".dropdown-num").html(d), c.closest(".dropdown-menu").hide(), b.preventDefault()
            })
        }, a.tooltipAction = function(b, c) {
            function d() { a(".tbl-more-action").find("ul:visible").hide(), a(".tbl-more-action.active").removeClass("active") }

            function e(b) {
                a(b).on("mouseover", function() {
                    var b = a(".tbl-more-action");
                    b.find("ul:visible").hide(), b.removeClass("active")
                })
            }
            a(b).on({
                mouseover: function(c) {
                    var e = a(this),
                        f = e.parent(".tbl-more-action"),
                        g = f.find("ul");
                    f.hasClass("active") || (a(b).parent().find("ul").hide(), a(".tbl-more-action").removeClass("active"), f.addClass("active"), g.css({ top: e.offset().top - 8, left: e.offset().left - (f.find("ul").width() + 8) }).show(), f.find(".tbl-tip-arrow").css({ top: e.offset().top + 5, left: e.offset().left - 8 })), a("body").on("click", function() { d(), a(this).off() }), a(window).on("resize", function() { d(), a(this).off() })
                },
                click: function() { return !1 },
                mouseleave: function(a) {},
                touchstart: function(a) {}
            });
            var f = a(b).parent().find("ul"),
                g = a(b).parent().find(".tbl-tip-arrow");
            f.on("mouseleave", function() { a(this).hide(), a(".tbl-more-action").removeClass("active") });
            var h = a(b).parents("table").find("th");
            e(".action-group .hide-more"), e(h), f.find("li:first").on("mouseover", function() { g.addClass("hoverd") }).on("mouseleave", function() { g.removeClass("hoverd") })
        }, a.tableCollapsibleInit = function(b) {
            a.isEmptyObject(b) && (b = {});
            var c = { firstLevelArrowFirst: void 0 === b.firstLevelArrowFirst || "" === b.firstLevelArrowFirst ? "ico-play" : b.firstLevelArrowFirst, firstLevelArrowSecond: void 0 === b.firstLevelArrowSecond || "" === b.firstLevelArrowSecond ? "ico-arrowdown4" : b.firstLevelArrowSecond, secondLevelArrowFirst: void 0 === b.secondLevelArrowFirst || "" === b.secondLevelArrowFirst ? "ico-play" : b.secondLevelArrowFirst, secondLevelArrowSecond: void 0 === b.secondLevelArrowSecond || "" === b.secondLevelArrowSecond ? "ico-arrowdown4" : b.secondLevelArrowSecond, thirdLevelArrowFirst: void 0 === b.thirdLevelArrowFirst || "" === b.thirdLevelArrowFirst ? "ico-play" : b.thirdLevelArrowFirst, thirdLevelArrowSecond: void 0 === b.thirdLevelArrowSecond || "" === b.thirdLevelArrowSecond ? "ico-arrowdown4" : b.thirdLevelArrowSecond };
            a(".collapsibleElem").on("click", function(b) {
                var d = a(this),
                    e = d.closest("tr"),
                    f = e.next("tr"),
                    g = d.find(".icon"),
                    h = d.closest(".tr-collapse-child");
                f.length > 0 && f.hasClass("tr-collapse-child") && (f.is(":hidden") ? f.show().find(".tbl-collapse-box:first").slideDown() : f.find(".tbl-collapse-box:first").slideUp(function() { f.hide() }), g.hasClass(c.firstLevelArrowFirst) ? (g.removeClass(c.firstLevelArrowFirst).addClass(c.firstLevelArrowSecond), 0 == h.length && d.closest("tr").addClass("open")) : g.hasClass(c.firstLevelArrowSecond) ? (g.removeClass(c.firstLevelArrowSecond).addClass(c.firstLevelArrowFirst), 0 == h.length && d.closest("tr").removeClass("open")) : g.hasClass(c.secondLevelArrowFirst) ? (g.removeClass(c.secondLevelArrowFirst).addClass(c.secondLevelArrowSecond), 0 == h.length && d.closest("tr").addClass("open")) : g.hasClass(c.secondLevelArrowSecond) ? (g.removeClass(c.secondLevelArrowSecond).addClass(c.secondLevelArrowFirst), 0 == h.length && d.closest("tr").removeClass("open")) : g.hasClass(c.thirdLevelArrowFirst) ? (g.removeClass(c.thirdLevelArrowFirst).addClass(c.thirdLevelArrowSecond), 0 == h.length && d.closest("tr").addClass("open")) : g.hasClass(c.thirdLevelArrowSecond) && (g.removeClass(c.thirdLevelArrowSecond).addClass(c.thirdLevelArrowFirst), 0 == h.length && d.closest("tr").removeClass("open"))), b.preventDefault()
            })
        }, a.highlighterSlider = function() {
            var b = a(".navbar-menu li.active").outerWidth();
            a(".marker").css("width", b), a(".navbar-menu li").on({
                mouseover: function() {
                    var b = a(this).position().left,
                        c = a(this).outerWidth();
                    a(this).parents(".navbar-menu").find(".marker").stop().animate({ left: b }, 250), a(this).parents(".navbar-menu").find(".marker").css("width", c)
                },
                mouseout: function() {
                    var b = a(".navbar-menu li.active").outerWidth(),
                        c = a(this).parents(".navbar-menu").find("li.active").position().left;
                    a(this).parents(".navbar-menu").find(".marker").stop().animate({ left: c }, 250), a(this).parents(".navbar-menu").find(".marker").css("width", b)
                },
                touchstart: function() { _this.trigger("mouseover") },
                touchEnd: function() { _this.trigger("mouseout") }
            })
        }, a.dropdownListInit = function(b) {
            void 0 === b && (b = 300), a(".drop-box>a").off().on("click", function() { a(this).closest(".drop-box").find(".dropdown-menu").toggle(), a(document).one("click", function b(c) { 0 === a(".drop-box").has(c.target).length ? a(".dropdown-menu").hide() : a(document).one("click", b) }) }), a(".drop-box .dropdown-menu li a").off().on("click", function(b) {
                var c = a(this),
                    d = c.text();
                c.closest(".drop-box").find(".dropdown-num").html(d), c.closest(".dropdown-menu").hide(), b.preventDefault()
            }), a(".drop-box .dropdown-menu ul").slimScroll({ height: b, alwaysVisible: !0 })
        }, a.tabOverflow = function() {
            var b = a(".nav-bar-small");
            if (b.length > 0) {
                var c = (a(".navbar-menu-overflow").outerWidth(), a(".navbar-menu-overflow")),
                    d = a.isDevice();
                if (c.prop("style",""), d) {
                    var e = b.find("ul").outerWidth() + 1,
                        f = a(window).width();
                    e < f ? c.css({ width: f, "overflow-x": "auto" }) : c.css({ width: e, "overflow-x": "auto" }), a(window).on("resize", function() {
                        var d = b.find("ul").outerWidth() + 1,
                            e = a(window).width();
                        a.isDevice() && (d < e ? c.css({ width: e, "overflow-x": "auto" }) : c.css({ width: d, "overflow-x": "auto" }))
                    })
                }
            }
        }, a.menuOverflow = function(b) {
            var c = a(".navbar-overflow");
            if (c.length > 0) {
                var d = a(".navbar-overflow-content").outerWidth(),
                    e = c.find(".navbar-overflow-width"),
                    f = a.isDevice();
                if (e.prop("style",""), f) {
                    var g = c.find("ul").outerWidth() + 1,
                        h = a(window).width();
                    g < h ? (e.css({ width: h, "overflow-x": "auto" }), setTimeout(function() { a.autoWidthElem(e) }, 50)) : e.css({ width: g, "overflow-x": "auto" }), a(window).off(".secondNavResize"), a(window).on("resize.secondNavResize", function() {
                        var b = c.find("ul").outerWidth() + 1,
                            d = a(window).width();
                        a.isDevice() && (b < d ? (e.css({ width: d, "overflow-x": "auto" }), setTimeout(function() { a.autoWidthElem(e) }, 50)) : e.css({ width: b, "overflow-x": "auto" }))
                    })
                } else e.css({ width: d, "overflow-x": "auto" });
                a(window).off(".secondNavScroll"), a(window).on("resize.secondNavScroll", function() {
                    if (!a.isDevice()) {
                        var b = a(".navbar-overflow-content").outerWidth();
                        e.css({ width: b, "overflow-x": "auto" })
                    }
                })
            }
        }, a.collapseBoxInit = function(b, c) {
            a("#" + b).on("show.bs.collapse", function() {
                var b = a(this).closest(".collapse-box");
                c ? b.find(".icon").prop("class","").addClass("icon ico-minus-4-box-line") : b.find(".icon").prop("class","").addClass("icon ico-clearall-filled"), b.addClass("active");
                a.isDevice()
            }), a("#" + b).on("hidden.bs.collapse", function() {
                var b = a(this).closest(".collapse-box");
                b.find(".icon").prop("class","").addClass("icon ico-add-4-line"), b.removeClass("active")
            })
        }, a.radioGrayInit = function() {
            a(".radio-group.roundedgray input").on("change", function() {
                var b = a(this);
                b.closest(".roundedgray").find(".radio-column").removeClass("active");
                b.closest(".radio-column").addClass("active")
            })
        }, a.checkboxGrayInit = function() { a(".checkbox-group.roundedgray input").on("change", function() { a(this).closest(".checkbox").toggleClass("active") }) }, a.boxLoadAnimate = function(b) {
            var c = a(b),
                d = c.length,
                e = a(window);
            c.last().addClass("last-child"), c.each(function(b, c) {
                var d = a(c);
                d.isElemVisible(!0) ? d.addClass("box-visible") : d.addClass("box-hidden")
            }), /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? e.on("scroll.mobileBoxScroll", function(f) {
                var g = b.find(">.box-show").length;
                c.each(function(b, c) {
                    var d = a(c);
                    d.isElemVisible(!0) && (d.removeClass("box-hidden"), d.prevAll(".box-hidden").addClass("box-show").removeClass("box-hidden"), d.addClass("box-show"))
                }), d === g && e.unbind(".mobileBoxScroll")
            }) : e.on("scroll.deskTopboxScroll", function(e) {
                var f = b.find(">.box-show").length;
                c.each(function(b, c) {
                    var d = a(c);
                    if (d.isElemVisible(!0)) {
                        var e = 1200;
                        b % 2 == 0 && (e = 1e3), d.animate({ opacity: "1", top: "0px" }, e), d.removeClass("box-hidden"), d.prevAll(".box-hidden").addClass("box-show").removeClass("box-hidden"), d.addClass("box-show")
                    }
                }), d === f && a(window).unbind(".deskTopboxScroll")
            })
        }
    }(jQuery),
    function(a) {
        a.fn.rateStar = function(c) {
            var d = { onRate: !1, elemContainer: ".star-content" },
                e = a.extend(d, c);
            return this.each(function() {
                var c = a(this);
                b(c, e)
            })
        };
        var b = function(b, c) {
            b.on({
                click: function(b) {
                    var d = a(this);
                    d.closest(c.elemContainer).find("a").removeClass("active"), d.addClass("active"), d.prevAll().addClass("active"), a.isFunction(c.onRate) && c.onRate.call(null, this, c), b.preventDefault()
                }
            }).on({
                mouseover: function(b) {
                    var c = a(this);
                    c.addClass("hover-prev"), c.prevAll().addClass("hover-prev"), c.nextAll().addClass("hover-next"), b.preventDefault()
                }
            }).on({
                mouseout: function(b) {
                    var d = a(this),
                        e = d.closest(c.elemContainer).find("a");
                    d.removeClass("hover-prev"), e.removeClass("hover-prev"), e.removeClass("hover-next"), b.preventDefault()
                }
            })
        }
    }(jQuery),
    function(a) {
        a.fn.isElemVisible = function(b) {
            var c = a(this),
                d = a(window),
                e = d.scrollTop(),
                f = e + d.height(),
                g = c.offset().top,
                h = g + c.height(),
                i = !0 === b ? h : g;
            return (!0 === b ? g : h) <= f && i >= e
        }
    }(jQuery),
    function(a) {
        a.fn.bookmark = function(c) {
            var d = { onBookmark: !1, onremoveBookmark: !1, removeBookmarkLbl: "Remove to Bookmarks", bookmarkLbl: "Add to Bookmarks" },
                e = a.extend(d, c);
            return this.each(function() {
                var c = a(this);
                b(c, e)
            })
        };
        var b = function(b, c) {
            b.on({
                click: function(b) {
                    var d = a(this);
                    d.toggleClass("active"), d.hasClass("active") ? a.isFunction(c.onBookmark) && c.onBookmark.call(null, this, c) : a.isFunction(c.onremoveBookmark) && c.onremoveBookmark.call(null, this, c), b.preventDefault()
                }
            }).on({
                mouseover: function(b) {
                    var d = a(this);
                    d.hasClass("active") ? d.find("span").html(c.removeBookmarkLbl) : d.find("span").html(c.bookmarkLbl)
                }
            })
        }
    }(jQuery),
    function(a) {
        a.fn.tooltipRightMenu = function(c) {
            var d = { trigger: "hover", fxCallBack: !1, onTipShow: !1, onTipHide: !1, speed: "slow" },
                e = a.extend(d, c);
            return this.each(function() {
                var c = a(this),
                    d = a("#" + c.prop("rel"));
                void 0 !== c.prop("rel") && (b(d, c, e), a.isFunction(e.fxCallBack) && e.fxCallBack.call(this, e))
            })
        };
        var b = function(a, b, f) { "hover" == f.trigger ? (b.on({ mouseover: function(e) { c(a, b, f), d(a, b, f) } }), a.on({ mouseleave: function(c) { e(a, b, f) } })) : "click" == f.trigger && (b.on({ click: function(e) { c(a, b, f), d(a, b, f), e.preventDefault() } }), a.on({ mouseleave: function(c) { e(a, b, f) } })) },
            c = function(b, c, d) {
                e(b, c, d);
                var f = c.offset().top,
                    g = c.offset().left - c.width() / 2 - b.width(),
                    h = d.speed;
                b.is(":visible") || ("slow" != h ? setTimeout(function() { b.css({ top: f, left: g }).stop().show() }, h) : b.css({ top: f, left: g }).stop().show()), a.isFunction(d.onTipShow) && d.onTipShow.call(this, b, c, d)
            },
            d = function(b, c, d) { a("body").on("click.rightNavBodyEvent", function(f) { 0 == a(f.target).closest(".right-action").length && (e(b, c, d), a(this).unbind()) }) },
            e = function(b, c, d) { a(".right-nav").hide(), a.isFunction(d.onTipHide) && d.onTipHide.call(this, b, c, d) }
    }(jQuery),
    function(a) {
        a.fn.cardsSelection = function(c) {
            var d = { trigger: "click", fxCallBack: !1, onTicked: !1, onUnTicked: !1, errorCallback: !1, maxTick: 3, tickIcon: "<i class='icon ico-approve2'></i>", tickCounter: 0 },
                e = a.extend(d, c);
            return this.each(function() {
                var c = a(this);
                b(c, e), a.isFunction(e.fxCallBack) && e.fxCallBack.call(a(this))
            })
        };
        var b = function(b, d) {
                "click" == d.trigger && b.on({
                    click: function(e) {
                        var f = a(this),
                            g = f.parent();
                        g.hasClass("active") ? (f.find(".ico-approve2").remove(), g.removeClass("active"), d.tickCounter--, a.isFunction(d.onUnTicked) && d.onUnTicked.call(this, d)) : d.tickCounter < d.maxTick ? (f.append(d.tickIcon), g.addClass("active"), d.tickCounter++, a.isFunction(d.onTicked) && d.onTicked.call(this, d)) : c(b, d), e.preventDefault()
                    }
                })
            },
            c = function(b, c) { a.isFunction(c.errorCallback) && c.errorCallback.call(this, c) }
    }(jQuery),
    function(a) {
        a.fn.displaySelectionCount = function(c) {
            var d = { trigger: "click", fxCallBack: !1, onTicked: !1, onUnTicked: !1, msgContainer: ".selection-count" },
                e = a.extend(d, c);
            return this.each(function() {
                var c = a(this);
                b(c, e), a.isFunction(e.fxCallBack) && e.fxCallBack.call(a(this))
            })
        };
        var b = function(b, c) {
            "click" == c.trigger && b.on({
                click: function(b) {
                    var d = a(this),
                        e = d.attr("img-src"),
                        f = d.attr("img-hover"),
                        g = d.parents(".insights-img-box");
                    d.toggleClass("active"), d.hasClass("active") ? (d.prop("src", f), a.isFunction(c.onTicked) && c.onTicked.call(this, c)) : (d.prop("src", e), a.isFunction(c.onUnTicked) && c.onUnTicked.call(this, c)), g.find(c.msgContainer).html(g.find(".active").length), b.preventDefault()
                }
            })
        }
    }(jQuery),
    function(a) {
        a.fn.advanceSearchInit = function(c) {
            var d = { onSearch: !1, onCloseFilter: !1, keyValueTrigger: 3, filterContainer: ".filter-advsearch", filterSlideSpeed: 300 },
                e = a.extend(d, c);
            return this.each(function() {
                var c = a(this);
                b(c, e)
            })
        };
        var b = function(b, c) {
            function d(a) { 0 == a.val().length ? (j.hide(), f(i)) : b.keyup() }

            function e(a) { a.val().length >= g ? (f(i), j.show()) : j.hide() }

            function f(c) { c.is(":hidden") && c.show(10, function() { c.width(h.outerWidth() - (k.outerWidth() + 1)), a(document).one("click", function d(e) { 0 === h.has(e.target).length && m.is(":hidden") ? (c.hide(), b.hide(), l.hide(), k.find(".icon").removeClass().prop("class", "icon ico-search"), k.removeClass("active")) : a(document).one("click", d) }) }) }
            var g = c.keyValueTrigger,
                h = b.closest(".advsearch-box"),
                i = h.find(".search-box-list"),
                j = h.find(".search-box-body"),
                k = h.find(".btn-search"),
                l = h.find(".btn-close"),
                m = h.find(c.filterContainer);
            a(window).on("resize", function() { i.width(h.outerWidth() - (k.outerWidth() + 1)) }), k.on({
                click: function(d) {
                    var e = a(this);
                    b.is(":hidden") && b.removeClass().show().addClass("animated fadeInRight").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() { b.removeClass("animated fadeInRight").focus(), e.addClass("active") }), k.find(".ico-arrowright3").length > 0 && a.isFunction(c.onSearch) && c.onSearch.call(this, c), d.preventDefault()
                }
            }), b.on("keyup", function() { e(a(this)) }).on("focus", function() { d(a(this)) }), l.on("click", function(a) { i.hide(), a.preventDefault() }), h.find(".search-box-action a").on("click", function(a) { m.is(":hidden") && m.slideDown(c.filterSlideSpeed), i.hide(), a.preventDefault() }), m.find(".close-search").on("click", function() { m.is(":visible") && (m.slideUp(c.filterSlideSpeed), a.isFunction(c.onCloseFilter) && c.onCloseFilter.call(this, c)) })
        }
    }(jQuery);
/*Version: HC-Sticky 1.2.43*/
(function(e, t, n) {
    "use strict";
    var r = function(e) { console.log(e) };
    var i = e(t),
        s = t.document,
        o = e(s);
    var u = function() {
        var e, t = 3,
            n = s.createElement("div"),
            r = n.getElementsByTagName("i");
        while (n.innerHTML = "<!--[if gt IE " + ++t + "]><i></i><![endif]-->", r[0]) {}
        return t > 4 ? t : e
    }();
    var a = function() {
        var e = t.pageXOffset !== n ? t.pageXOffset : s.compatMode == "CSS1Compat" ? t.document.documentElement.scrollLeft : t.document.body.scrollLeft,
            r = t.pageYOffset !== n ? t.pageYOffset : s.compatMode == "CSS1Compat" ? t.document.documentElement.scrollTop : t.document.body.scrollTop;
        if (typeof a.x == "undefined") {
            a.x = e;
            a.y = r
        }
        if (typeof a.distanceX == "undefined") {
            a.distanceX = e;
            a.distanceY = r
        } else {
            a.distanceX = e - a.x;
            a.distanceY = r - a.y
        }
        var i = a.x - e,
            o = a.y - r;
        a.direction = i < 0 ? "right" : i > 0 ? "left" : o <= 0 ? "down" : o > 0 ? "up" : "first";
        a.x = e;
        a.y = r
    };
    i.on("scroll", a);
    e.fn.style = function(n) {
        if (!n) return null;
        var r = e(this),
            i;
        var o = r.clone().css("display", "none");
        o.find("input:radio").prop("name", "copy-" + Math.floor(Math.random() * 100 + 1));
        r.after(o);
        var u = function(e, n) {
            var i;
            if (e.currentStyle) { i = e.currentStyle[n.replace(/-\w/g, function(e) { return e.toUpperCase().replace("-", "") })] } else if (t.getComputedStyle) { i = s.defaultView.getComputedStyle(e, null).getPropertyValue(n) }
            i = /margin/g.test(n) ? parseInt(i) === r[0].offsetLeft ? i : "auto" : i;
            return i
        };
        if (typeof n == "string") { i = u(o[0], n) } else {
            i = {};
            e.each(n, function(e, t) { i[t] = u(o[0], t) })
        }
        o.remove();
        return i || null
    };
    e.fn.extend({
        hcSticky: function(r) {
            if (this.length == 0) return this;
            this.pluginOptions("hcSticky", { top: 0, bottom: 0, bottomEnd: 0, innerTop: 0, innerSticker: null, className: "sticky", wrapperClassName: "wrapper-sticky", stickTo: null, responsive: true, followScroll: true, offResolutions: null, onStart: e.noop, onStop: e.noop, on: true, fn: null }, r || {}, {
                reinit: function() { e(this).hcSticky() },
                stop: function() {
                    e(this).pluginOptions("hcSticky", { on: false }).each(function() {
                        var t = e(this),
                            n = t.pluginOptions("hcSticky"),
                            r = t.parent("." + n.wrapperClassName);
                        var i = t.offset().top - r.offset().top;
                        t.css({ position: "absolute", top: i, bottom: "auto", left: "auto", right: "auto" }).removeClass(n.className)
                    })
                },
                off: function() {
                    e(this).pluginOptions("hcSticky", { on: false }).each(function() {
                        var t = e(this),
                            n = t.pluginOptions("hcSticky"),
                            r = t.parent("." + n.wrapperClassName);
                        t.css({ position: "relative", top: "auto", bottom: "auto", left: "auto", right: "auto" }).removeClass(n.className);
                        r.css("height", "auto")
                    })
                },
                on: function() { e(this).each(function() { e(this).pluginOptions("hcSticky", { on: true, remember: { offsetTop: i.scrollTop() } }).hcSticky() }) },
                destroy: function() {
                    var t = e(this),
                        n = t.pluginOptions("hcSticky"),
                        r = t.parent("." + n.wrapperClassName);
                    t.removeData("hcStickyInit").css({ position: r.css("position"), top: r.css("top"), bottom: r.css("bottom"), left: r.css("left"), right: r.css("right") }).removeClass(n.className);
                    i.off("resize", n.fn.resize).off("scroll", n.fn.scroll);
                    t.unwrap()
                }
            });
            if (r && typeof r.on != "undefined") { if (r.on) { this.hcSticky("on") } else { this.hcSticky("off") } }
            if (typeof r == "string") return this;
            return this.each(function() {
                var r = e(this),
                    s = r.pluginOptions("hcSticky");
                var f = function() { var e = r.parent("." + s.wrapperClassName); if (e.length > 0) { e.css({ height: r.outerHeight(true), width: function() { var t = e.style("width"); if (t.indexOf("%") >= 0 || t == "auto") { if (r.css("box-sizing") == "border-box" || r.css("-moz-box-sizing") == "border-box") { r.css("width", e.width()) } else { r.css("width", e.width() - parseInt(r.css("padding-left") - parseInt(r.css("padding-right")))) } return t } else { return r.outerWidth(true) } }() }); return e } else { return false } }() || function() {
                    var t = r.style(["width", "margin-left", "left", "right", "top", "bottom", "float", "display"]);
                    var n = r.css("display");
                    var i = e("<div>", { "class": s.wrapperClassName }).css({ display: n, height: r.outerHeight(true), width: function() { if (t["width"].indexOf("%") >= 0 || t["width"] == "auto" && n != "inline-block" && n != "inline") { r.css("width", parseFloat(r.css("width"))); return t["width"] } else if (t["width"] == "auto" && (n == "inline-block" || n == "inline")) { return r.width() } else { return t["margin-left"] == "auto" ? r.outerWidth() : r.outerWidth(true) } }(), margin: t["margin-left"] ? "auto" : null, position: function() { var e = r.css("position"); return e == "static" ? "relative" : e }(), "float": t["float"] || null, left: t["left"], right: t["right"], top: t["top"], bottom: t["bottom"], "vertical-align": "top" });
                    r.wrap(i);
                    if (u === 7) { if (e("head").find("style#hcsticky-iefix").length === 0) { e('<style id="hcsticky-iefix">.' + s.wrapperClassName + " {zoom: 1;}</style>").appendTo("head") } }
                    return r.parent()
                }();
                if (r.data("hcStickyInit")) return;
                r.data("hcStickyInit", true);
                var l = s.stickTo && (s.stickTo == "document" || s.stickTo.nodeType && s.stickTo.nodeType == 9 || typeof s.stickTo == "object" && s.stickTo instanceof(typeof HTMLDocument != "undefined" ? HTMLDocument : Document)) ? true : false;
                var c = s.stickTo ? l ? o : typeof s.stickTo == "string" ? e(s.stickTo) : s.stickTo : f.parent();
                r.css({ top: "auto", bottom: "auto", left: "auto", right: "auto" });
                i.load(function() {
                    if (r.outerHeight(true) > c.height()) {
                        f.css("height", r.outerHeight(true));
                        r.hcSticky("reinit")
                    }
                });
                var h = function(e) {
                        if (r.hasClass(s.className)) return;
                        e = e || {};
                        r.css({ position: "fixed", top: e.top || 0, left: e.left || f.offset().left }).addClass(s.className);
                        s.onStart.apply(r[0]);
                        f.addClass("sticky-active")
                    },
                    p = function(e) {
                        e = e || {};
                        e.position = e.position || "absolute";
                        e.top = e.top || 0;
                        e.left = e.left || 0;
                        if (r.css("position") != "fixed" && parseInt(r.css("top")) == e.top) return;
                        r.css({ position: e.position, top: e.top, left: e.left }).removeClass(s.className);
                        s.onStop.apply(r[0]);
                        f.removeClass("sticky-active")
                    };
                var d = function(t) {
                    if (!s.on || !r.is(":visible")) return;
                    if (r.outerHeight(true) >= c.height()) { p(); return }
                    var n = s.innerSticker ? e(s.innerSticker).position().top : s.innerTop ? s.innerTop : 0,
                        o = f.offset().top,
                        u = c.height() - s.bottomEnd + (l ? 0 : o),
                        d = f.offset().top - s.top + n,
                        v = r.outerHeight(true) + s.bottom,
                        m = i.height(),
                        g = i.scrollTop(),
                        y = r.offset().top,
                        b = y - g,
                        w;
                    if (typeof s.remember != "undefined" && s.remember) {
                        var E = y - s.top - n;
                        if (v - n > m && s.followScroll) { if (E < g && g + m <= E + r.height()) { s.remember = false } } else {
                            if (s.remember.offsetTop > E) {
                                if (g <= E) {
                                    h({ top: s.top - n });
                                    s.remember = false
                                }
                            } else {
                                if (g >= E) {
                                    h({ top: s.top - n });
                                    s.remember = false
                                }
                            }
                        }
                        return
                    }
                    if (g > d) { if (u + s.bottom - (s.followScroll && m < v ? 0 : s.top) <= g + v - n - (v - n > m - (d - n) && s.followScroll ? (w = v - m - n) > 0 ? w : 0 : 0)) { p({ top: u - v + s.bottom - o }) } else if (v - n > m && s.followScroll) { if (b + v <= m) { if (a.direction == "down") { h({ top: m - v }) } else { if (b < 0 && r.css("position") == "fixed") { p({ top: y - (d + s.top - n) - a.distanceY }) } } } else { if (a.direction == "up" && y >= g + s.top - n) { h({ top: s.top - n }) } else if (a.direction == "down" && y + v > m && r.css("position") == "fixed") { p({ top: y - (d + s.top - n) - a.distanceY }) } } } else { h({ top: s.top - n }) } } else { p() }
                };
                var v = false,
                    m = false;
                var g = function() {
                    b();
                    y();
                    if (!s.on) return;
                    var e = function() { if (r.css("position") == "fixed") { r.css("left", f.offset().left) } else { r.css("left", 0) } };
                    if (s.responsive) {
                        if (!m) {
                            m = r.clone().prop("style", "").css({ visibility: "hidden", height: 0, overflow: "hidden", paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0 });
                            f.after(m)
                        }
                        var t = f.style("width");
                        var n = m.style("width");
                        if (n == "auto" && t != "auto") { n = parseInt(r.css("width")) }
                        if (n != t) { f.width(n) }
                        if (v) { clearTimeout(v) }
                        v = setTimeout(function() {
                            v = false;
                            m.remove();
                            m = false
                        }, 250)
                    }
                    e();
                    if (r.outerWidth(true) != f.width()) {
                        var i = r.css("box-sizing") == "border-box" || r.css("-moz-box-sizing") == "border-box" ? f.width() : f.width() - parseInt(r.css("padding-left")) - parseInt(r.css("padding-right"));
                        i = i - parseInt(r.css("margin-left")) - parseInt(r.css("margin-right"));
                        r.css("width", i)
                    }
                };
                r.pluginOptions("hcSticky", { fn: { scroll: d, resize: g } });
                var y = function() {
                    if (s.offResolutions) {
                        if (!e.isArray(s.offResolutions)) { s.offResolutions = [s.offResolutions] }
                        var t = true;
                        e.each(s.offResolutions, function(e, n) {
                            if (n < 0) {
                                if (i.width() < n * -1) {
                                    t = false;
                                    r.hcSticky("off")
                                }
                            } else {
                                if (i.width() > n) {
                                    t = false;
                                    r.hcSticky("off")
                                }
                            }
                        });
                        if (t && !s.on) { r.hcSticky("on") }
                    }
                };
                y();
                i.on("resize", g);
                var b = function() {
                    var r = false;
                    if (e._data(t, "events").scroll != n) { e.each(e._data(t, "events").scroll, function(e, t) { if (t.handler == s.fn.scroll) { r = true } }) }
                    if (!r) {
                        s.fn.scroll(true);
                        i.on("scroll", s.fn.scroll)
                    }
                };
                b()
            })
        }
    })
})(jQuery, this);
(function(e, t) {
    "use strict";
    e.fn.extend({
        pluginOptions: function(n, r, i, s) {
            if (!this.data(n)) this.data(n, {});
            if (n && typeof r == "undefined") return this.data(n).options;
            i = i || r || {};
            if (typeof i == "object" || i === t) { return this.each(function() { var t = e(this); if (!t.data(n).options) { t.data(n, { options: e.extend(r, i || {}) }); if (s) { t.data(n).commands = s } } else { t.data(n, e.extend(t.data(n), { options: e.extend(t.data(n).options, i || {}) })) } }) } else if (typeof i == "string") { return this.each(function() { e(this).data(n).commands[i].call(this) }) } else { return this }
        }
    })
})(jQuery)
/**
* Start of Slick JS
*/
! function(i) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery) }(function(i) {
"use strict";
var e = window.Slick || {};
(e = function() {
    var e = 0;
    return function(t, o) {
        var s, n = this;
        n.defaults = { accessibility: !0, adaptiveHeight: !1, appendArrows: i(t), appendDots: i(t), arrows: !0, asNavFor: null, prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>', nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>', autoplay: !1, autoplaySpeed: 3e3, centerMode: !1, centerPadding: "50px", cssEase: "ease", customPaging: function(e, t) { return i('<button type="button" />').text(t + 1) }, dots: !1, dotsClass: "slick-dots", draggable: !0, easing: "linear", edgeFriction: .35, fade: !1, focusOnSelect: !1, focusOnChange: !1, infinite: !0, initialSlide: 0, lazyLoad: "ondemand", mobileFirst: !1, pauseOnHover: !0, pauseOnFocus: !0, pauseOnDotsHover: !1, respondTo: "window", responsive: null, rows: 1, rtl: !1, slide: "", slidesPerRow: 1, slidesToShow: 1, slidesToScroll: 1, speed: 500, swipe: !0, swipeToSlide: !1, touchMove: !0, touchThreshold: 5, useCSS: !0, useTransform: !0, variableWidth: !1, vertical: !1, verticalSwiping: !1, waitForAnimate: !0, zIndex: 1e3 }, n.initials = { animating: !1, dragging: !1, autoPlayTimer: null, currentDirection: 0, currentLeft: null, currentSlide: 0, direction: 1, $dots: null, listWidth: null, listHeight: null, loadIndex: 0, $nextArrow: null, $prevArrow: null, scrolling: !1, slideCount: null, slideWidth: null, $slideTrack: null, $slides: null, sliding: !1, slideOffset: 0, swipeLeft: null, swiping: !1, $list: null, touchObject: {}, transformsEnabled: !1, unslicked: !1 }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
    }
}()).prototype.activateADA = function() { this.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" }) }, e.prototype.addSlide = e.prototype.slickAdd = function(e, t, o) {
    var s = this;
    if ("boolean" == typeof t) o = t, t = null;
    else if (t < 0 || t >= s.slideCount) return !1;
    s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function(e, t) { i(t).attr("data-slick-index", e) }), s.$slidesCache = s.$slides, s.reinit()
}, e.prototype.animateHeight = function() {
    var i = this;
    if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.animate({ height: e }, i.options.speed)
    }
}, e.prototype.animateSlide = function(e, t) {
    var o = {},
        s = this;
    s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({ left: e }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({ top: e }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), i({ animStart: s.currentLeft }).animate({ animStart: e }, { duration: s.options.speed, easing: s.options.easing, step: function(i) { i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o)) }, complete: function() { t && t.call() } })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function() { s.disableTransition(), t.call() }, s.options.speed))
}, e.prototype.getNavTarget = function() {
    var e = this,
        t = e.options.asNavFor;
    return t && null !== t && (t = i(t).not(e.$slider)), t
}, e.prototype.asNavFor = function(e) {
    var t = this.getNavTarget();
    null !== t && "object" == typeof t && t.each(function() {
        var t = i(this).slick("getSlick");
        t.unslicked || t.slideHandler(e, !0)
    })
}, e.prototype.applyTransition = function(i) {
    var e = this,
        t = {};
    !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
}, e.prototype.autoPlay = function() {
    var i = this;
    i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
}, e.prototype.autoPlayClear = function() {
    var i = this;
    i.autoPlayTimer && clearInterval(i.autoPlayTimer)
}, e.prototype.autoPlayIterator = function() {
    var i = this,
        e = i.currentSlide + i.options.slidesToScroll;
    i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e))
}, e.prototype.buildArrows = function() { var e = this;!0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").prop("aria-hidden", false).prop("tabindex", '-1'), e.$nextArrow.removeClass("slick-hidden").prop('aria-hidden', false).prop('tabindex', '-1'), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").prop("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").prop({ "aria-disabled": "true", tabindex: "-1" })) }, e.prototype.buildDots = function() {
    var e, t, o = this;
    if (!0 === o.options.dots) {
        for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
        o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active")
    }
}, e.prototype.buildOut = function() {
    var e = this;
    e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) { i(t).attr("data-slick-index", e).data("originalStyling", i(t).prop("style") || "") }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
}, e.prototype.buildRows = function() {
    var i, e, t, o, s, n, r, l = this;
    if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) {
        for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
            var d = document.createElement("div");
            for (e = 0; e < l.options.rows; e++) {
                var a = document.createElement("div");
                for (t = 0; t < l.options.slidesPerRow; t++) {
                    var c = i * r + (e * l.options.slidesPerRow + t);
                    n.get(c) && a.appendChild(n.get(c))
                }
                d.appendChild(a)
            }
            o.appendChild(d)
        }
        l.$slider.empty().append(o), l.$slider.children().children().children().css({ width: 100 / l.options.slidesPerRow + "%", display: "inline-block" })
    }
}, e.prototype.checkResponsive = function(e, t) {
    var o, s, n, r = this,
        l = !1,
        d = r.$slider.width(),
        a = window.innerWidth || i(window).width();
    if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
        s = null;
        for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
        null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [r, l])
    }
}, e.prototype.changeSlide = function(e, t) {
    var o, s, n, r = this,
        l = i(e.currentTarget);
    switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
        case "previous":
            s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
            break;
        case "next":
            s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
            break;
        case "index":
            var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
            r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
            break;
        default:
            return
    }
}, e.prototype.checkNavigable = function(i) {
    var e, t;
    if (e = this.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1];
    else
        for (var o in e) {
            if (i < e[o]) { i = t; break }
            t = e[o]
        }
    return i
}, e.prototype.cleanUpEvents = function() {
    var e = this;
    e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
}, e.prototype.cleanUpSlideEvents = function() {
    var e = this;
    e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
}, e.prototype.cleanUpRows = function() {
    var i, e = this;
    e.options.rows > 1 && ((i = e.$slides.children().children()).prop('style', ''), e.$slider.empty().append(i))
}, e.prototype.clickHandler = function(i) {!1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault()) }, e.prototype.destroy = function(e) {
    var t = this;
    t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").prop('tabindex', '-1').prop('aria-disabled', false).prop('aria-hidden', false).css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").prop('tabindex', '-1').prop('aria-disabled', false).prop('aria-hidden', false).css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").prop('aria-hidden', false).prop("data-slick-index", '').each(function() { i(this).prop("style", i(this).data("originalStyling")) }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
}, e.prototype.disableTransition = function(i) {
    var e = this,
        t = {};
    t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
}, e.prototype.fadeSlide = function(i, e) { var t = this;!1 === t.cssTransitions ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }), t.$slides.eq(i).animate({ opacity: 1 }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }), e && setTimeout(function() { t.disableTransition(i), e.call() }, t.options.speed)) }, e.prototype.fadeSlideOut = function(i) { var e = this;!1 === e.cssTransitions ? e.$slides.eq(i).animate({ opacity: 0, zIndex: e.options.zIndex - 2 }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({ opacity: 0, zIndex: e.options.zIndex - 2 })) }, e.prototype.filterSlides = e.prototype.slickFilter = function(i) {
    var e = this;
    null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit())
}, e.prototype.focusHandler = function() {
    var e = this;
    e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(t) {
        t.stopImmediatePropagation();
        var o = i(this);
        setTimeout(function() { e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay()) }, 0)
    })
}, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() { return this.currentSlide }, e.prototype.getDotCount = function() {
    var i = this,
        e = 0,
        t = 0,
        o = 0;
    if (!0 === i.options.infinite)
        if (i.slideCount <= i.options.slidesToShow) ++o;
        else
            for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
    else if (!0 === i.options.centerMode) o = i.slideCount;
    else if (i.options.asNavFor)
        for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
    else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
    return o - 1
}, e.prototype.getLeft = function(i) {
    var e, t, o, s, n = this,
        r = 0;
    return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e
}, e.prototype.getOption = e.prototype.slickGetOption = function(i) { return this.options[i] }, e.prototype.getNavigableIndexes = function() {
    var i, e = this,
        t = 0,
        o = 0,
        s = [];
    for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i;) s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
    return s
}, e.prototype.getSlick = function() { return this }, e.prototype.getSlideCount = function() { var e, t, o = this; return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function(s, n) { if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return e = n, !1 }), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll }, e.prototype.goTo = e.prototype.slickGoTo = function(i, e) { this.changeSlide({ data: { message: "index", index: parseInt(i) } }, e) }, e.prototype.init = function(e) {
    var t = this;
    i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
}, e.prototype.initADA = function() {
    var e = this,
        t = Math.ceil(e.slideCount / e.options.slidesToShow),
        o = e.getNavigableIndexes().filter(function(i) { return i >= 0 && i < e.slideCount });
    e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) {
        var s = o.indexOf(t);
        i(this).attr({ role: "tabpanel", id: "slick-slide" + e.instanceUid + t, tabindex: -1 }), -1 !== s && i(this).attr({ "aria-describedby": "slick-slide-control" + e.instanceUid + s })
    }), e.$dots.attr("role", "tablist").find("li").each(function(s) {
        var n = o[s];
        i(this).attr({ role: "presentation" }), i(this).find("button").first().attr({ role: "tab", id: "slick-slide-control" + e.instanceUid + s, "aria-controls": "slick-slide" + e.instanceUid + n, "aria-label": s + 1 + " of " + t, "aria-selected": null, tabindex: "-1" })
    }).eq(e.currentSlide).find("button").attr({ "aria-selected": "true", tabindex: "0" }).end());
    for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.$slides.eq(s).attr("tabindex", 0);
    e.activateADA()
}, e.prototype.initArrowEvents = function() { var i = this;!0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler))) }, e.prototype.initDotEvents = function() { var e = this;!0 === e.options.dots && (i("li", e.$dots).on("click.slick", { message: "index" }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1)) }, e.prototype.initSlideEvents = function() {
    var e = this;
    e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
}, e.prototype.initializeEvents = function() {
    var e = this;
    e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", { action: "start" }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", { action: "move" }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", { action: "end" }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition)
}, e.prototype.initUI = function() { var i = this;!0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show() }, e.prototype.keyHandler = function(i) {
    var e = this;
    i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({ data: { message: !0 === e.options.rtl ? "next" : "previous" } }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({ data: { message: !0 === e.options.rtl ? "previous" : "next" } }))
}, e.prototype.lazyLoad = function() {
    function e(e) {
        i("img[data-lazy]", e).each(function() {
            var e = i(this),
                t = i(this).attr("data-lazy"),
                o = i(this).attr("data-srcset"),
                s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
                r = document.createElement("img");
            r.onload = function() { e.animate({ opacity: 0 }, 100, function() { o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({ opacity: 1 }, 200, function() { e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading") }), n.$slider.trigger("lazyLoaded", [n, e, t]) }) }, r.onerror = function() { e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t]) }, r.src = t
        })
    }
    var t, o, s, n = this;
    if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, s = Math.ceil(o + n.options.slidesToShow), !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)), t = n.$slider.find(".slick-slide").slice(o, s), "anticipated" === n.options.lazyLoad)
        for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++) r < 0 && (r = n.slideCount - 1), t = (t = t.add(d.eq(r))).add(d.eq(l)), r--, l++;
    e(t), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
}, e.prototype.loadSlider = function() {
    var i = this;
    i.setPosition(), i.$slideTrack.css({ opacity: 1 }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
}, e.prototype.next = e.prototype.slickNext = function() { this.changeSlide({ data: { message: "next" } }) }, e.prototype.orientationChange = function() {
    var i = this;
    i.checkResponsive(), i.setPosition()
}, e.prototype.pause = e.prototype.slickPause = function() {
    var i = this;
    i.autoPlayClear(), i.paused = !0
}, e.prototype.play = e.prototype.slickPlay = function() {
    var i = this;
    i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1
}, e.prototype.postSlide = function(e) {
    var t = this;
    t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
}, e.prototype.prev = e.prototype.slickPrev = function() { this.changeSlide({ data: { message: "previous" } }) }, e.prototype.preventDefault = function(i) { i.preventDefault() }, e.prototype.progressiveLazyLoad = function(e) {
    e = e || 1;
    var t, o, s, n, r, l = this,
        d = i("img[data-lazy]", l.$slider);
    d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function() { s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad() }, r.onerror = function() { e < 3 ? setTimeout(function() { l.progressiveLazyLoad(e + 1) }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad()) }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
}, e.prototype.refresh = function(e) {
    var t, o, s = this;
    o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, { currentSlide: t }), s.init(), e || s.changeSlide({ data: { message: "index", index: t } }, !1)
}, e.prototype.registerBreakpoints = function() {
    var e, t, o, s = this,
        n = s.options.responsive || null;
    if ("array" === i.type(n) && n.length) {
        s.respondTo = s.options.respondTo || "window";
        for (e in n)
            if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
                for (t = n[e].breakpoint; o >= 0;) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings
            }
        s.breakpoints.sort(function(i, e) { return s.options.mobileFirst ? i - e : e - i })
    }
}, e.prototype.reinit = function() {
    var e = this;
    e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
}, e.prototype.resize = function() {
    var e = this;
    i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() { e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition() }, 50))
}, e.prototype.removeSlide = e.prototype.slickRemove = function(i, e, t) {
    var o = this;
    if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1;
    o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit()
}, e.prototype.setCSS = function(i) {
    var e, t, o = this,
        s = {};
    !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)))
}, e.prototype.setDimensions = function() { var i = this;!1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({ padding: "0px " + i.options.centerPadding }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({ padding: i.options.centerPadding + " 0px" })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length))); var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();!1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e) }, e.prototype.setFade = function() {
    var e, t = this;
    t.$slides.each(function(o, s) { e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({ position: "relative", right: e, top: 0, zIndex: t.options.zIndex - 2, opacity: 0 }) : i(s).css({ position: "relative", left: e, top: 0, zIndex: t.options.zIndex - 2, opacity: 0 }) }), t.$slides.eq(t.currentSlide).css({ zIndex: t.options.zIndex - 1, opacity: 1 })
}, e.prototype.setHeight = function() {
    var i = this;
    if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.css("height", e)
    }
}, e.prototype.setOption = e.prototype.slickSetOption = function() {
    var e, t, o, s, n, r = this,
        l = !1;
    if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[o] = s;
    else if ("multiple" === n) i.each(o, function(i, e) { r.options[i] = e });
    else if ("responsive" === n)
        for (t in s)
            if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];
            else {
                for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
                r.options.responsive.push(s[t])
            }
    l && (r.unload(), r.reinit())
}, e.prototype.setPosition = function() {
    var i = this;
    i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i])
}, e.prototype.setProps = function() {
    var i = this,
        e = document.body.style;
    i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType
}, e.prototype.setSlideClasses = function(i) {
    var e, t, o, s, n = this;
    if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode) {
        var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
        e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center")
    } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
    "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
}, e.prototype.setupInfinite = function() {
    var e, t, o, s = this;
    if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow)) {
        for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
        for (e = 0; e < o + s.slideCount; e += 1) t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
        s.$slideTrack.find(".slick-cloned").find("[id]").each(function() { i(this).attr("id", "") })
    }
}, e.prototype.interrupt = function(i) {
    var e = this;
    i || e.autoPlay(), e.interrupted = i
}, e.prototype.selectHandler = function(e) {
    var t = this,
        o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
        s = parseInt(o.attr("data-slick-index"));
    s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s)
}, e.prototype.slideHandler = function(i, e, t) {
    var o, s, n, r, l, d = null,
        a = this;
    if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i))
        if (!1 === e && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function() { a.postSlide(o) }) : a.postSlide(o));
        else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function() { a.postSlide(o) }) : a.postSlide(o));
    else { if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== t ? (a.fadeSlideOut(n), a.fadeSlide(s, function() { a.postSlide(s) })) : a.postSlide(s), void a.animateHeight();!0 !== t ? a.animateSlide(d, function() { a.postSlide(s) }) : a.postSlide(s) }
}, e.prototype.startLoad = function() { var i = this;!0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading") }, e.prototype.swipeDirection = function() { var i, e, t, o, s = this; return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical" }, e.prototype.swipeEnd = function(i) {
    var e, t, o = this;
    if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
    if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
    if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
        switch (t = o.swipeDirection()) {
            case "left":
            case "down":
                e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                break;
            case "right":
            case "up":
                e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
        }
        "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]))
    } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
}, e.prototype.swipeHandler = function(i) {
    var e = this;
    if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
        case "start":
            e.swipeStart(i);
            break;
        case "move":
            e.swipeMove(i);
            break;
        case "end":
            e.swipeEnd(i)
    }
}, e.prototype.swipeMove = function(i) { var e, t, o, s, n, r, l = this; return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft)))) }, e.prototype.swipeStart = function(i) {
    var e, t = this;
    if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1;
    void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0
}, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
    var i = this;
    null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit())
}, e.prototype.unload = function() {
    var e = this;
    i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").prop("aria-hidden", "true").css("width", "")
}, e.prototype.unslick = function(i) {
    var e = this;
    e.$slider.trigger("unslick", [e, i]), e.destroy()
}, e.prototype.updateArrows = function() {
    var i = this;
    Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
}, e.prototype.updateDots = function() {
    var i = this;
    null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
}, e.prototype.visibility = function() {
    var i = this;
    i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
}, i.fn.slick = function() {
    var i, t, o = this,
        s = arguments[0],
        n = Array.prototype.slice.call(arguments, 1),
        r = o.length;
    for (i = 0; i < r; i++)
        if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), void 0 !== t) return t;
    return o
}
});
/**
* End of Slick JS
*/

/*! js-cookie v2.2.0 | MIT */
! function(e) { var n = !1; if ("function" == typeof define && define.amd && (define(e), n = !0), "object" == typeof exports && (module.exports = e(), n = !0), !n) { var o = window.Cookies,
            t = window.Cookies = e();
        t.noConflict = function() { return window.Cookies = o, t } } }(function() {
    function e() { for (var e = 0, n = {}; e < arguments.length; e++) { var o = arguments[e]; for (var t in o) n[t] = o[t] } return n }

    function n(o) {
        function t(n, r, i) { var c; if ("undefined" != typeof document) { if (arguments.length > 1) { if ("number" == typeof(i = e({ path: "/" }, t.defaults, i)).expires) { var a = new Date;
                        a.setMilliseconds(a.getMilliseconds() + 864e5 * i.expires), i.expires = a }
                    i.expires = i.expires ? i.expires.toUTCString() : ""; try { c = JSON.stringify(r), /^[\{\[]/.test(c) && (r = c) } catch (e) {}
                    r = o.write ? o.write(r, n) : encodeURIComponent(r + "").replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), n = (n = (n = encodeURIComponent(n + "")).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape); var s = ""; for (var f in i) i[f] && (s += "; " + f, !0 !== i[f] && (s += "=" + i[f])); return document.cookie = n + "=" + r + s }
                n || (c = {}); for (var p = document.cookie ? document.cookie.split("; ") : [], d = /(%[0-9A-Z]{2})+/g, u = 0; u < p.length; u++) { var l = p[u].split("="),
                        C = l.slice(1).join("=");
                    this.json || '"' !== C.charAt(0) || (C = C.slice(1, -1)); try { var m = l[0].replace(d, decodeURIComponent); if (C = o.read ? o.read(C, m) : o(C, m) || C.replace(d, decodeURIComponent), this.json) try { C = JSON.parse(C) } catch (e) {}
                        if (n === m) { c = C; break }
                        n || (c[m] = C) } catch (e) {} } return c } } return t.set = t, t.get = function(e) { return t.call(t, e) }, t.getJSON = function() { return t.apply({ json: !0 }, [].slice.call(arguments)) }, t.defaults = {}, t.remove = function(n, o) { t(n, "", e(o, { expires: -1 })) }, t.withConverter = n, t } return n(function() {}) });
/*
 * jQuery Templating Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
! function(a, b) {
    function c(b, c, d, e) { var f = { data: e || (c ? c.data : {}), _wrap: c ? c._wrap : null, tmpl: null, parent: c || null, nodes: [], calls: k, nest: l, wrap: m, html: n, update: o }; return b && a.extend(f, b, { nodes: [], parent: c }), d && (f.tmpl = d, f._ctnt = f._ctnt || f.tmpl(a, f), f.key = ++w, (y.length ? u : t)[w] = f), f }

    function d(b, c, f) { var g, h = f ? a.map(f, function(a) { return "string" == typeof a ? b.key ? a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + r + '="' + b.key + '" $2') : a : d(a, b, a._ctnt) }) : b; return c ? h : (h = h.join(""), h.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function(b, c, d, f) { g = a(d).get(), j(g), c && (g = e(c).concat(g)), f && (g = g.concat(e(f))) }), g || e(h)) }

    function e(b) { var c = document.createElement("div"); return c.innerHTML = b, a.makeArray(c.childNodes) }

    function f(b) { return new Function("jQuery", "$item", "var $=jQuery,call,_=[],$data=$item.data;with($data){_.push('" + a.trim(b).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function(b, c, d, e, f, g, i) { var j, k, l, m = a.tmpl.tag[d]; if (!m) throw "Template command not found: " + d; return j = m._default || [], g && !/\w$/.test(f) && (f += g, g = ""), f ? (f = h(f), i = i ? "," + h(i) + ")" : g ? ")" : "", k = g ? f.indexOf(".") > -1 ? f + g : "(" + f + ").call($item" + i : f, l = g ? k : "(typeof(" + f + ")==='function'?(" + f + ").call($item):(" + f + "))") : l = k = j.$1 || "null", e = h(e), "');" + m[c ? "close" : "open"].split("$notnull_1").join(f ? "typeof(" + f + ")!=='undefined' && (" + f + ")!=null" : "true").split("$1a").join(l).split("$1").join(k).split("$2").join(e ? e.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g, function(a, b, c, d) { return d = d ? "," + d + ")" : c ? ")" : "", d ? "(" + b + ").call($item" + d : a }) : j.$2 || "") + "_.push('" }) + "');}return _;") }

    function g(b, c) { b._wrap = d(b, !0, a.isArray(c) ? c : [s.test(c) ? c : a(c).html()]).join("") }

    function h(a) { return a ? a.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null }

    function i(a) { var b = document.createElement("div"); return b.appendChild(a.cloneNode(!0)), b.innerHTML }

    function j(b) {
        function d(b) {
            function d(a) { a += j, g = k[a] = k[a] || c(g, t[g.parent.key + j] || g.parent, null, !0) }
            var e, f, g, h, i = b;
            if (h = b.getAttribute(r)) {
                for (; i.parentNode && 1 === (i = i.parentNode).nodeType && !(e = i.getAttribute(r)););
                e !== h && (i = i.parentNode ? 11 === i.nodeType ? 0 : i.getAttribute(r) || 0 : 0, (g = t[h]) || (g = u[h], g = c(g, t[i] || u[i], null, !0), g.key = ++w, t[w] = g), x && d(h)), b.removeAttribute(r)
            } else x && (g = a.data(b, "tmplItem")) && (d(g.key), t[g.key] = g, i = a.data(b.parentNode, "tmplItem"), i = i ? i.key : 0);
            if (g) {
                for (f = g; f && f.key != i;) f.nodes.push(b), f = f.parent;
                delete g._ctnt, delete g._wrap, a.data(b, "tmplItem", g)
            }
        }
        var e, f, g, h, i, j = "_" + x,
            k = {};
        for (g = 0, h = b.length; g < h; g++)
            if (1 === (e = b[g]).nodeType) {
                for (f = e.getElementsByTagName("*"), i = f.length - 1; i >= 0; i--) d(f[i]);
                d(e)
            }
    }

    function k(a, b, c, d) {
        if (!a) return y.pop();
        y.push({ _: a, tmpl: b, item: this, data: c, options: d })
    }

    function l(b, c, d) { return a.tmpl(a.template(b), c, d, this) }

    function m(b, c) { var d = b.options || {}; return d.wrapped = c, a.tmpl(a.template(b.tmpl), b.data, d, b.item) }

    function n(b, c) { var d = this._wrap; return a.map(a(a.isArray(d) ? d.join("") : d).filter(b || "*"), function(a) { return c ? a.innerText || a.textContent : a.outerHTML || i(a) }) }

    function o() {
        var b = this.nodes;
        a.tmpl(null, null, null, this).insertBefore(b[0]), a(b).remove()
    }
    var p, q = a.fn.domManip,
        r = "_tmplitem",
        s = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
        t = {},
        u = {},
        v = { key: 0, data: {} },
        w = 0,
        x = 0,
        y = [];
    a.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function(b, c) {
        a.fn[b] = function(d) {
            var e, f, g, h, i = [],
                j = a(d),
                k = 1 === this.length && this[0].parentNode;
            if (p = t || {}, k && 11 === k.nodeType && 1 === k.childNodes.length && 1 === j.length) j[c](this[0]), i = this;
            else {
                for (f = 0, g = j.length; f < g; f++) x = f, e = (f > 0 ? this.clone(!0) : this).get(), a.fn[c].apply(a(j[f]), e), i = i.concat(e);
                x = 0, i = this.pushStack(i, b, j.selector)
            }
            return h = p, p = null, a.tmpl.complete(h), i
        }
    }), a.fn.extend({
        tmpl: function(b, c, d) { return a.tmpl(this[0], b, c, d) },
        tmplItem: function() { return a.tmplItem(this[0]) },
        template: function(b) { return a.template(b, this[0]) },
        domManip: function(b, c, d, e) {
            if (b[0] && b[0].nodeType) {
                for (var f, g = a.makeArray(arguments), h = b.length, i = 0; i < h && !(f = a.data(b[i++], "tmplItem")););
                h > 1 && (g[0] = [a.makeArray(b)]), f && x && (g[2] = function(b) { a.tmpl.afterManip(this, b, d) }), q.apply(this, g)
            } else q.apply(this, arguments);
            return x = 0, p || a.tmpl.complete(t), this
        }
    }), a.extend({
        tmpl: function(b, e, f, h) {
            var i, j = !h;
            if (j) h = v, b = a.template[b] || a.template(null, b), u = {};
            else if (!b) return b = h.tmpl, t[h.key] = h, h.nodes = [], h.wrapped && g(h, h.wrapped), a(d(h, null, h.tmpl(a, h)));
            return b ? ("function" == typeof e && (e = e.call(h || {})), f && f.wrapped && g(f, f.wrapped), i = a.isArray(e) ? a.map(e, function(a) { return a ? c(f, h, b, a) : null }) : [c(f, h, b, e)], j ? a(d(h, null, i)) : i) : []
        },
        tmplItem: function(b) { var c; for (b instanceof a && (b = b[0]); b && 1 === b.nodeType && !(c = a.data(b, "tmplItem")) && (b = b.parentNode);); return c || v },
        template: function(b, c) { return c ? ("string" == typeof c ? c = f(c) : c instanceof a && (c = c[0] || {}), c.nodeType && (c = a.data(c, "tmpl") || a.data(c, "tmpl", f(c.innerHTML))), "string" == typeof b ? a.template[b] = c : c) : b ? "string" != typeof b ? a.template(null, b) : a.template[b] || a.template(null, s.test(b) ? b : a(b)) : null },
        encode: function(a) { return ("" + a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;") }
    }), a.extend(a.tmpl, {
        tag: { tmpl: { _default: { $2: "null" }, open: "if($notnull_1){_=_.concat($item.nest($1,$2));}" }, wrap: { _default: { $2: "null" }, open: "$item.calls(_,$1,$2);_=[];", close: "call=$item.calls();_=call._.concat($item.wrap(call,_));" }, each: { _default: { $2: "$index, $value" }, open: "if($notnull_1){$.each($1a,function($2){with(this){", close: "}});}" }, if: { open: "if(($notnull_1) && $1a){", close: "}" }, else: { _default: { $1: "true" }, open: "}else if(($notnull_1) && $1a){" }, html: { open: "if($notnull_1){_.push($1a);}" }, "=": { _default: { $1: "$data" }, open: "if($notnull_1){_.push($.encode($1a));}" }, "!": { open: "" } },
        complete: function(a) { t = {} },
        afterManip: function(b, c, d) {
            var e = 11 === c.nodeType ? a.makeArray(c.childNodes) : 1 === c.nodeType ? [c] : [];
            d.call(b, c), j(e), x++
        }
    })
}(jQuery);
/*
 *@Title:DBS FLP Custom Plugins
 *@Author: Redford Sumcad, Anil Kumar,Balesabu Godugu,Gilbert Wei Jei Tan,Lakshan
 *@Description: Custom javascript plugins created for specific usage of FLP (Public website)
 *@Start Date: 18 Oct 2016
 *@Updated Date:Tue Feb 20 2018 14:32:29 GMT+0530 (IST)
 */

$(function() {
    var e, t, r, a, s, o, i, n, l, h, c = $(".container.unit-trust"),
        u = $("#utListBody");
    $(".ut-fundsearch-table");
    $(".terms-content modal-body ul").on("scroll", function(e) { $(".terms-content.modal-body").height() <= $(".terms-content.modal-body ul").height() ? $(".border-shadow").show() : $(".border-shadow").hide() }), $(".terms-content").on("scroll", function(e) { $(".terms-content").scrollTop() >= 10 ? $(".border-shadow").show() : $(".border-shadow").hide() }), $("#lightboxContent").on("scroll", function(e) { $("#lightboxContent").scrollTop() >= 10 ? $(".border-shadow").show() : $(".border-shadow").hide() }), c.find('[data-toggle="tooltip"]').tooltip(), c.find("#chartDiv svg text").each(function() { 291 == $(this).attr("y") && $(this).attr("y", "290") }), $(window).on("orientationchange", function() { $(".highcharts-container .highcharts-data-labels text ").each(function() { $(this).find("tspan").attr("x", 6) }), setTimeout(function() { /Android/i.test(navigator.userAgent) && 601 == $(this).width() && $(".ut-listView")[0].click(), utSearchModule.isMobile() && $('.pagination.ut-list a[href="#"]').each(function() { $(this).find("mark").remove(), $(this).prepend("<mark>Page</mark>") }) }, 250) });
    var d = function() { $("#utFundSearch").html(""), $("#ut-service-errorbrb").show() };
    utSearchModule = {
        init: function() { this.cacheDom(), this.getData(), this.addOptions(), this.bindEvents(), this.showSearchResult(this.dataArr), this.isMobile() ? this.$searchSection.addClass("ut-m") : this.$searchSection.removeClass("ut-m"), $("#utFundSearch").tooltip({ selector: "[data-toggle=tooltip]" }) },
        isMobile: function() {
            var e = !1;
            $window = $(window);
            var t = $.getScrollbarWidth();
            return $window.outerWidth() + t < $ipad && (e = !0), e
        },
        adjustWidth: function() { setTimeout(function() { 962 == $(window).width() && window.innerHeight < window.innerWidth ? midVal = 10 : 601 == $(window).width() && window.innerHeight > window.innerWidth && ($(".unit-trust .utListBody li").css("width", "23.4%"), $(".ut-fundsearch-table").css("display", "none")) }, 500) },
        cacheDom: function() { this.$searchSection = $("#utFundSearch"), this.$table = $(".ut-fundsearch-table"), this.$list = $("#utListBody"), this.toggleViewId = $("#toggleView a.toggle.on").attr("data-target"), this.$elmHide = $("#toggleView a.toggle:not(.on)").attr("data-target"), this.isList = $("#" + this.$elmHide).parent().is("table"), this.$toggleView = $("#toggleView a.toggle"), this.$pager = $(".pagination"), this.$countLegend = $("#legend"), this.$mobileCountLegend = $("#legendMobile"), this.$toggleFilter = $(".filter-subCtrls"), this.$mToggleFilter = $(".filter-dropdown.m-toggle"), this.$toggleBtn = $(".toggle-filter a"), this.$textShowMore = this.$toggleBtn.attr("data-showmore"), this.$textShowLess = this.$toggleBtn.attr("data-showless"), this.$sortTable = $(".ut-fundsearch-table th.sort"), this.$sortList = $(".ut-fundsearch-table a.sort"), this.$selectBox = $(".ut-select"), this.$filterFocusFunds = $("#utFilterFocusFunds"), this.$mobileFilterFocusFunds = $("#mutFilterFocusFunds"), this.$lightboxOverlay = $(".ut-lightbox-overlay"), this.$lightBoxCloseBtn = $(".ut-lightbox-closebtn"), this.$buyClick = $(".ut-detail-btn.buy-now"), this.$watchListClick = $("#utViewWatchList"), this.$addWatchListClick = $("#utAddToWatchList"), this.dataArr = [], this.renderArr = this.dataArr, this.filterObj = {} },
        getData: function() {
            try { $.isPlainObject(utData) || JSON.parse(utData) } catch (e) { return void d() }
            $.isPlainObject(utData) || (utData = JSON.parse(utData));
            for (var e in utData.fundList) this.dataArr.push(utData.fundList[e]);
            this.dataArr.sort(function(e, t) { return e.fundName.localeCompare(t.fundName) })
        },
        addOptions: function() { this.$selectBox.find("select").each(function() { utSearchModule.bindSelectOptions($(this)) }) },
        bindSelectOptions: function(e) {
            var t = [],
                r = e.prop("id"),
                a = {},
                s = 0;
            if ("investMedium" == r) {
                for (var o = [], i = 0; i < this.dataArr.length; i++)
                    for (var n = this.dataArr[i].investMedium.split(","), l = 0; l < n.length; l++) "" != n[l] && o.push(n[l]);
                o.sort(function(e, t) { return e.localeCompare(t) }), o.forEach(function(e) { t.push(e) })
            } else {
                o = [];
                $.each(this.dataArr, function(e, t) { t.hasOwnProperty(r) && o.indexOf(-1 == t[r]) && o.push(t[r]) });
                for (var h = 0; h < o.length; h++) void 0 != o[h] && (o[h] = o[h].split('"').join("").trim());
                o.sort(function(e, t) { return e.localeCompare(t) }), o.forEach(function(e) { t.push(e) })
            }
            a = this.removeDupilcates(t);
            if ("riskProfile" == r)
                for (s; s < e.length; s++) {
                    e[s];
                    $.each(a, function(t, r) { var a = riskProfileKVStr.split("|"); "" == r && void 0 == r || "" === t || e.append($("<option >", { value: t }).text(a[t - 1].substr(2))) })
                } else
                    for (s; s < e.length; s++) {
                        e[s];
                        $.each(a, function(t, r) { "" == r && void 0 == r || "" === t || e.append($("<option >", { value: t }).text(t)) })
                    }
            a = {}, t.length = 0
        },
        removeDupilcates: function(e) {
            var t = {},
                r = [],
                a = 0;
            return $.each(e, function(e, r) { t[r] = a, a++ }), $.each(t, function(e, t) { r.push(e) }), t
        },
        bindEvents: function() {
            this.$toggleBtn.on("click", function(e) { e.preventDefault(), utSearchModule.$toggleFilter.is(":hidden") ? (utSearchModule.$toggleBtn.fadeOut(200, function() { $(this).text(utSearchModule.$textShowLess).fadeIn(200) }), utSearchModule.$toggleFilter.slideDown(400)) : (utSearchModule.$toggleBtn.fadeOut(200, function() { $(this).text(utSearchModule.$textShowMore).fadeIn(200) }), utSearchModule.$toggleFilter.slideUp(400)) }), this.$toggleView.on("click", function(e) {
                e.preventDefault();
                if ($(this).hasClass("on")) return !1;
                if (utSearchModule.$toggleView.removeClass("on"), $(this).addClass("on"), utSearchModule.$elmHide = $("#toggleView a.toggle:not(.on)").attr("data-target"), utSearchModule.isList = $("#" + utSearchModule.$elmHide).parent().is("table"), "utListBody" === utSearchModule.$elmHide ? $("#toggleView").addClass("showTable") : $("#toggleView").removeClass("showTable"), utSearchModule.$filterFocusFunds.is(":checked")) {
                    var t = utSearchModule.sortFocusFunds(utSearchModule.renderArr);
                    utSearchModule.showSearchResult(t)
                } else {
                    if ($(".ut-sortPrecent:visible").hasClass("sortAsce") || $("th[data-key=oneYr]").hasClass("sortAsce")) {
                        r = "oneYr";
                        utSearchModule.renderArr.sort(function(e, t) {
                            var a = parseFloat(e[r]),
                                s = parseFloat(t[r]);
                            return (isNaN(a) ? 0 : a) - (isNaN(s) ? 0 : s)
                        })
                    } else if ($(".ut-sortPrecent:visible").hasClass("sortDesc") || $("th[data-key=oneYr]").hasClass("sortDesc")) {
                        var r = "oneYr";
                        utSearchModule.renderArr.sort(function(e, t) {
                            var a = parseFloat(e[r]),
                                s = parseFloat(t[r]);
                            return (isNaN(s) ? 0 : s) - (isNaN(a) ? 0 : a)
                        })
                    }
                    utSearchModule.showSearchResult(utSearchModule.renderArr)
                }
                utSearchModule.printListCount(utSearchModule.renderArr), $(this).hasClass("ut-tableView") ? $(".focusFundDiv").hide() : $(".focusFundDiv").show()
            }), this.$searchSection.on("click", "th.sort, a.sort", function() {
                var e = $(this).attr("data-key"),
                    t = $(this).hasClass("sortAsce"),
                    r = $(this).hasClass("sortDesc"),
                    a = $(this).hasClass("alpha"),
                    s = $(this).hasClass("num"),
                    o = $(this).hasClass("percent"),
                    i = $(this).parent().is("tr");
                if (utSearchModule.$sortTable.removeClass("sortAsce sortDesc"), utSearchModule.$sortList.removeClass("sortAsce sortDesc"), a && (t ? (utSearchModule.renderArr.sort(function(t, r) { return t[e] < r[e] ? 1 : t[e] > r[e] ? -1 : 0 }), $(this).removeClass("sortAsce").addClass("sortDesc")) : (utSearchModule.renderArr.sort(function(t, r) { return t[e] < r[e] ? -1 : t[e] > r[e] ? 1 : t[e] < r[e] }), $(this).addClass("sortAsce").removeClass("sortDesc")), $(".ut-sortPrecent").removeClass("sortAsce sortDesc")), (s || o) && ($(".ut-sortAlpha").removeClass("sortAsce sortDesc"), r ? (utSearchModule.renderArr.sort(function(t, r) {
                        var a = parseFloat(t[e]),
                            s = parseFloat(r[e]);
                        return (isNaN(a) ? 0 : a) - (isNaN(s) ? 0 : s)
                    }), $(this).addClass("sortAsce").removeClass("sortDesc")) : (utSearchModule.renderArr.sort(function(t, r) {
                        var a = parseFloat(t[e]),
                            s = parseFloat(r[e]);
                        return (isNaN(s) ? 0 : s) - (isNaN(a) ? 0 : a)
                    }), $(this).addClass("sortDesc").removeClass("sortAsce"))), utSearchModule.$filterFocusFunds.is(":checked")) {
                    var n = utSearchModule.sortFocusFunds(utSearchModule.renderArr);
                    utSearchModule.showSearchResult(n, i)
                } else utSearchModule.showSearchResult(utSearchModule.renderArr, i);
                ($(this).hasClass("ut-sortAlpha") || $(".fund-name").hasClass("sortAsce")) && $(this).hasClass("sortAsce") && ($(".fund-name").addClass("sortAsce"), $(".ut-sortAlpha").addClass("sortAsce").removeClass("sortDesc"), $(".ut-sortPrecent").removeClass("sortDesc sortAsce")), ($(this).hasClass("ut-sortAlpha") || $(".fund-name").hasClass("sortDesc")) && $(this).hasClass("sortDesc") && ($(".fund-name").addClass("sortDesc"), $(".ut-sortAlpha").addClass("sortDesc").removeClass("sortAsce"), $(".ut-sortPrecent").removeClass("sortDesc sortAsce")), ($(this).hasClass("ut-sortPrecent") || $("th[data-key=oneYr]").hasClass("sortAsce")) && $(this).hasClass("sortAsce") && ($("th[data-key=oneYr]").addClass("sortAsce"), $(".ut-sortPrecent").addClass("sortAsce").removeClass("sortDesc"), $(".ut-sortAlpha").removeClass("sortAsce sortDesc")), ($(this).hasClass("ut-sortPrecent") || $("th[data-key=oneYr]").hasClass("sortDesc")) && $(this).hasClass("sortDesc") && ($("th[data-key=oneYr]").addClass("sortDesc"), $(".ut-sortPrecent").addClass("sortDesc").removeClass("sortAsce"), $(".ut-sortAlpha").removeClass("sortAsce sortDesc"))
            }), this.$selectBox.find("select").change(function() {
                var e = $(this).val(),
                    t = utSearchModule.isMobile();
                $(this).next().text(e), t || utSearchModule.fiterResults(this.id, $(this).val(), $(this).prop("selectedIndex"))
            }), this.$filterFocusFunds.on("change", function() {
                var e = utSearchModule.$filterFocusFunds.is(":checked");
                if (e) {
                    var t = utSearchModule.sortFocusFunds(utSearchModule.renderArr);
                    utSearchModule.showSearchResult(t)
                } else utSearchModule.showSearchResult(utSearchModule.renderArr);
                utSearchModule.$mobileFilterFocusFunds.prop("checked", e)
            });
            var c = "fundName";
            utSearchModule.renderArr.sort(function(e, t) { return e[c] < t[c] ? -1 : e[c] > t[c] ? 1 : e[c] < t[c] }), utSearchModule.showSearchResult(utSearchModule.renderArr, !1);
            var m = $(".fundHouse"),
                p = $(".investCategory"),
                f = $(".region"),
                g = $(".riskProfile");
            m.change(function() { m.val($(this).val()) }), p.change(function() { p.val($(this).val()) }), f.change(function() { f.val($(this).val()) }), g.change(function() { g.val($(this).val()) }), $(window).on("resize", function() {
                var e = utSearchModule.isMobile();
                e && !utSearchModule.$countLegend.hasClass("msg-error") && u.show(), !e && utSearchModule.$table.is(":visible") && u.hide()
            }), this.$mobileFilterFocusFunds.on("change", function() {
                var e = utSearchModule.$mobileFilterFocusFunds.is(":checked");
                if (utSearchModule.$filterFocusFunds.prop("checked", e), e) {
                    var t = utSearchModule.sortFocusFunds(utSearchModule.renderArr);
                    utSearchModule.showSearchResult(t), utSearchModule.printListCount(t)
                } else utSearchModule.showSearchResult(utSearchModule.renderArr), utSearchModule.printListCount(utSearchModule.renderArr)
            }), $(".m-filter-btn").on("click", ".apply-btn", function() {
                $(".mfilter-ctrls option:selected").each(function(e, t) {
                    $(this).index() > 0 ? utSearchModule.filterObj[$(this).parent().prop("id")] = $(this).val() : delete utSearchModule.filterObj[$(this).parent().prop("id")];
                    var r = utSearchModule.dataArr;
                    0 === Object.keys(utSearchModule.filterObj).length ? utSearchModule.renderArr = utSearchModule.dataArr : utSearchModule.renderArr = function(e, t) { return e.filter(function(e) { return Object.keys(t).every(function(r) { return e[r] == t[r] }) }) }(r, utSearchModule.filterObj)
                }), utSearchModule.renderArr.length > 0 && ($("#legendMobile").show(), $("#utInfo").hide());
                var e = utSearchModule.$mobileFilterFocusFunds.is(":checked");
                if (utSearchModule.$filterFocusFunds.prop("checked", e), e) {
                    var t = utSearchModule.sortFocusFunds(utSearchModule.renderArr);
                    utSearchModule.showSearchResult(t), utSearchModule.printListCount(t)
                } else utSearchModule.showSearchResult(utSearchModule.renderArr), utSearchModule.printListCount(utSearchModule.renderArr);
                $(".filter-menu").parent().removeClass("open"), $("#toggleView .ut-listView ").addClass("on"), $("#toggleView .ut-tableView ").removeClass("on")
            }).on("click", ".cancel-btn", function() {
                if ($("#utInfo").hide(), $("#legendMobile").show(), utSearchModule.renderArr = utSearchModule.dataArr, utSearchModule.$mobileFilterFocusFunds.is(":checked")) {
                    e = utSearchModule.sortFocusFunds(utSearchModule.renderArr);
                    utSearchModule.showSearchResult(e)
                } else utSearchModule.showSearchResult(utSearchModule.renderArr);
                if (utSearchModule.$filterFocusFunds.is(":checked")) {
                    var e = utSearchModule.sortFocusFunds(utSearchModule.renderArr);
                    utSearchModule.showSearchResult(e)
                } else utSearchModule.showSearchResult(utSearchModule.renderArr);
                $(".filter-menu").parent().removeClass("open"), utSearchModule.$selectBox.find("select").not(this).prop("selectedIndex", 0), utSearchModule.scrollToTop(), $("#toggleView .ut-listView ").addClass("on"), $("#toggleView .ut-tableView ").removeClass("on")
            }), $(this.$searchSection).on("click", "#utListBody li, #utTableBody tr", function(c) {
                $(this).attr("data-pid");
                var u, m, p = {},
                    f = {},
                    g = $("#ut-modalPopupTemplate").html(),
                    v = Handlebars.compile(g),
                    b = document.createDocumentFragment(),
                    C = document.createElement("div");
                utSearchModule.isMobile() ? (u = "59%", m = "40%") : (u = "78%", m = "49%"), c.preventDefault(), $("body").addClass("no-scroll"), $("html").addClass("no-scroll"), $(utSearchModule.$lightboxOverlay).fadeIn(200);
                var w = $(this).attr("data-url");
                $.get(w, function(c) {
                    try { JSON.parse(c) } catch (e) { return void d() }
                    var g = JSON.parse(c);
                    (p = g) && $(".ut-loader").hide(), e = p.agreeUrlSweb, t = "buyfund", r = "UnitTrust", a = p.about.isin, s = p.dbsIsin, o = p.distType, i = p.about.currency, n = p.annualPerformance, l = p.fundLongName, h = p.fundName, $("#utAddToWatchList").removeClass("added");
                    var w = '<form action="' + e + '" method="post" id="swebRedirectionForm" target="_blank"><input type="hidden" name="actionType" value="' + t + '"><input type="hidden" name="applicationType" value="' + r + '"><input type="hidden" name="watsonID" value="' + a + '"><input type="hidden" name="fundISINCode" value="' + s + '"><input type="hidden" name="distType" value="' + o + '"><input type="hidden" name="fundCurrency" value="' + i + '"><input type="hidden" name="annualPerformance" value="' + n + '"><input type="hidden" name="fundLongName" value="' + l + '"><input type="hidden" name="fundName" value="' + h + '"></form>';
                    $("#swebRedirectionForm").length > 0 && $("#swebRedirectionForm").remove(), $("body").append(w), p.fundISINCode = p.about.isin;
                    var M = "http://asialt.morningstar.com/ODSHelperWS/default.aspx?ClientId=sgplt&MarketId=CU$$$$$$$$$SGP&LanguageId=EN&Id=" + p.fundISINCode;
                    p.fundDocuments.prospectus = M + "&DocType=PR", p.fundDocuments.annualReport = M + "&DocType=AR", p.fundDocuments.factSheet = M + "&DocType=FS", p.fundDocuments.productHighlightSheet = M + "&DocType=PH";
                    var S = "https://gllt.morningstar.com/4uxt9mxw5v/custom/page1/default.aspx?width=700&height=300&chartType=Price&nolegend=true",
                        y = "https://gllt.morningstar.com/4uxt9mxw5v/custom/page1/default.aspx?width=700&height=300&chartType=Growth&nolegend=true&isin=" + p.fundISINCode;
                    if (S = S + "&isin=" + p.fundISINCode, void 0 === p.performance && (p.performance = {}, p.performance.priceMovementCharting = {}), void 0 === p.performance.priceMovementCharting && (p.performance.priceMovementCharting = { priceMovementChartUrl: "", priceMovementChartUrl6M: "", priceMovementChartUrl1Y: "", priceMovementChartUrl3Y: "" }), p.performance.priceMovementCharting.priceMovementChartUrl = S + "&timePeriod=3M", p.performance.priceMovementCharting.priceMovementChartUrl6M = S + "&timePeriod=6M", p.performance.priceMovementCharting.priceMovementChartUrl1Y = S + "&timePeriod=1Y", p.performance.priceMovementCharting.priceMovementChartUrl3Y = S + "&timePeriod=3Y", p.performance.priceMovementCharting.performanceChart1Y = y + "&timePeriod=1Y", void 0 !== p.performance.pastPerformance && (p.performance.pastPerformance.returnTitle = "retun title", p.performance.pastPerformance.benchmarkTitle = "retun title", void 0 !== p.performance.pastPerformance.tableData)) {
                        var F = p.performance.pastPerformance.tableData;
                        $.each(F, function(e, t) { t.time = pastPerfArr[t.time] })
                    }
                    C.innerHTML = v(p), C.innerHTML = C.innerHTML.replace("fundDocuments.prospectus.link", p.fundDocuments.prospectus).replace("fundDocuments.annualReport.link", p.fundDocuments.annualReport).replace("fundDocuments.factSheet.link", p.fundDocuments.factSheet).replace("fundDocuments.productHighlightSheet.link", p.fundDocuments.productHighlightSheet), setTimeout(function() {
                        var e = 447;
                        utSearchModule.isMobile() && (e = 447), $(".head-full-content").text().length > e ? $(".head-para-viewmore").show() : $(".head-para-viewmore").hide()
                    }, 100), setTimeout(function() {
                        $("#timelineChart").html("");
                        var e = p.performance.priceMovementCharting.priceMovementChartUrl;
                        e = "6mths" === performanceDefaultTimeline ? p.performance.priceMovementCharting.priceMovementChartUrl6M : "1yr" === performanceDefaultTimeline ? p.performance.priceMovementCharting.priceMovementChartUrl1Y : "3yrs" === performanceDefaultTimeline ? p.performance.priceMovementCharting.priceMovementChartUrl3Y : p.performance.priceMovementCharting.priceMovementChartUrl, utSearchModule.isMobile() || $(window).width() < "768" ? $('<iframe width="95%" height="310" scrolling="yes"  src="' + e + '" frameborder="0"></iframe>').appendTo("#timelineChart") : $('<iframe width="750" height="310" scrolling="no"  src="' + e + '" frameborder="0"></iframe>').appendTo("#timelineChart"), 0 == $("#timelineChart2").length && $("#timelineChart").after('<div id="timelineChart2"></div>').after('<h2 class="chart2title performancechart1year">' + $(".performancegraph.performancechart1year").text() + "</h2>"), $("#timelineChart2").html(""), $(window).width() < "768" ? $('<iframe width="95%" height="320" scrolling="yes"  src="' + p.performance.priceMovementCharting.performanceChart1Y + '" frameborder="0"></iframe>').appendTo("#timelineChart2") : $('<iframe width="95%" height="320" scrolling="no"  src="' + p.performance.priceMovementCharting.performanceChart1Y + '" frameborder="0"></iframe>').appendTo("#timelineChart2"), $("body").removeClass("no-scroll").css("-webkit-overflow-scrolling", "touch")
                    }, 1e3), setTimeout(function() { $(".psdate").each(function() {}) }, 10), setTimeout(function() { $("#MasterMainContent").css("overflow", "hidden") }, 2e3), $(".priceChart").unbind("click"), $(".peformancegraph").unbind("click"), $("body").on("click", ".priceChart", function() {
                        $(".priceChart").removeClass("active"), $(this).addClass("active"), $("#timelineChart").html("");
                        var e = $(this).prop("id"),
                            t = p.performance.priceMovementCharting.priceMovementChartUrl;
                        "sixMonthChart" == e ? t = p.performance.priceMovementCharting.priceMovementChartUrl6M : "oneYearChart" == e ? t = p.performance.priceMovementCharting.priceMovementChartUrl1Y : "threeYearChart" == e && (t = p.performance.priceMovementCharting.priceMovementChartUrl3Y), setTimeout(function() { $("#timelineChart").html(""), $(window).width() < 768 ? $('<iframe width="750" scrolling="yes" height="320"  src="' + t + '" frameborder="0" ></iframe>').appendTo("#timelineChart") : $('<iframe width="750" scrolling="no" height="320"  src="' + t + '" frameborder="0" ></iframe>').appendTo("#timelineChart") }, 100)
                    }), setTimeout(function() { $("#MasterMainContent").css("overflow", "hidden") }, 2e3), $("body").on("click", ".performancegraph", function() {
                        if ($(window).width() < 768) return !1;
                        if ($(".performancegraph").removeClass("active"), $(this).addClass("active"), $(this).hasClass("performancechart1year")) {
                            $("#timelineChart").html(""), $(".morningstar-tabs").hide();
                            var e = p.performance.priceMovementCharting.performanceChart1Y;
                            setTimeout(function() { $("#timelineChart").html(""), $(window).width() < 768 ? $('<iframe width="750" scrolling="yes" height="320"  src="' + e + '" frameborder="0" ></iframe>').appendTo("#timelineChart") : $('<iframe width="750" scrolling="no" height="320"  src="' + e + '" frameborder="0" ></iframe>').appendTo("#timelineChart") }, 100), setTimeout(function() { $("#MasterMainContent").css("overflow", "hidden") }, 2e3)
                        } else $(".morningstar-tabs").show(), $("#threeMonthChart").click(), $(".performancechart").addClass("active");
                        return !1
                    }), b.appendChild(C), $("#lightboxContent").html(""), $("#lightboxContent").append(b), p.assetAllocation.chartData && (f = p.assetAllocation.chartData, (utSearchModule.isMobile() || $(window).width() < "400") && (u = "50%", m = "30%"), utSearchModule.drawPieChart(f, u, m), $(".highcharts-container .highcharts-data-labels text").each(function() { $(this).find("tspan").attr("x", 6) }))
                }).fail(function(e, t, r) { d() })
            }), Handlebars.registerHelper("equal", function(e, t, r) { if (arguments.length < 3) throw new Error("Handlebars Helper equal needs 2 parameters"); return e != t ? r.inverse(this) : r.fn(this) }), Handlebars.registerHelper("trimString", function(e) {
                var t = 447;
                utSearchModule.isMobile() && (t = 447);
                var r = e;
                return e.length > t && (r = e.substring(0, t) + "..."), new Handlebars.SafeString(r)
            }), Handlebars.registerHelper("checkNull", function(e) { return void 0 === e ? "null" : e }), this.$lightBoxCloseBtn.on("click", function() { utSearchModule.$lightboxOverlay, $(utSearchModule.$lightboxOverlay).fadeOut(200), $("body").removeClass("no-scroll"), $("html").removeClass("no-scroll"), $("#lightboxContent").empty() }), $("body").on("click",".ut-tabs li",  function(e) {
                var t = $(this).attr("data-target"),
                    r = $(t).is(":visible"),
                    a = $(this).attr("data-targetId");
                r || ($(this).parent().children().removeClass("active"), $(this).addClass("active"), void 0 == t ? ($(a).parent().find(".tab-content").slideUp(400), $(a).slideDown(400)) : ($(t).parent().find(".tab-content").slideUp(400), $(t).slideDown(400)))
            }), $("body").on("mouseenter","#utFundSearch .help-ico-grey",  function(e) { utSearchModule.isMobile() || $(this).tooltip("show") }), $("body").on("click mouseenter","#utFundSearch .help-ico-grey",  function(e) { utSearchModule.isMobile() && $(this).tooltip("show") }), this.$buyClick.on("click", function() { utSearchModule.$lightboxOverlay, $(".hide-terms").hide(), $(".show-terms").show(), $(".lightbox-wrapper").addClass("show-terms-wrapper"), $("body").addClass("no-sroll"), $(".show-terms").css("margin-top", 0) }), this.$watchListClick.on("click", function() {
                t = "mywatchlist", r = "UnitTrust";
                var a = location.href;
                e = "https://sib3.dbs.com/DBSObWeb/processpweb.htm", (a.match("dbsweb-sg.sgp.dbs.com") || a.match("preview-sg.sgp.dbs.com") || a.match("www.dbs.com.sg") && !a.match("-www.dbs.com.sg")) && (e = "https://internet-banking.dbs.com.sg/DBSObWeb/processpweb.htm");
                var s = '<form action="' + e + '" method="post" id="swebRedirectionForm" target="_blank"><input type="hidden" name="actionType" value="' + t + '"><input type="hidden" name="applicationType" value="' + r + '"></form>';
                $("#swebRedirectionForm").length > 0 && $("#swebRedirectionForm").remove(), $("body").append(s), $("#swebRedirectionForm").submit()
            }), this.$addWatchListClick.on("click", function() {
                if (utSearchModule.$lightboxOverlay, !0) {
                    var s = '<form action="' + e + '" method="post" id="swebRedirectionForm" target="_blank"><input type="hidden" name="actionType" value="' + (t = "addwatchlist") + '"><input type="hidden" name="applicationType" value="' + r + '"><input type="hidden" name="watsonID" value="' + a + '"><input type="hidden" name="distType" value="' + o + '"><input type="hidden" name="fundCurrency" value="' + i + '"></form>';
                    $("#swebRedirectionForm").length > 0 && $("#swebRedirectionForm").remove(), $("body").append(s), $(".hide-terms").hide(), $(".show-terms").show(), $(".ut-lightbox").scrollTop("0"), $(".ut-lightbox .terms-content").scrollTop("0"), $("body").addClass("no-sroll");
                    var n = $(".ut-lightbox.ut-lightbox-overlay"),
                        l = n.find(".show-terms");
                    n.find(".lightbox-wrapper").css({ backgroundColor: "#464646", "box-shadow": "none" }), l.css({ backgroundColor: "#ffffff", width: "100%" }), l.css("margin-top", Math.max(0, ($(window).height() - l.height()) / 2)), n.css({ overflow: "hidden" })
                }
            }), $("body").on("click",".btn-collapse",  function(e) {
                var t;
                void 0 == (t = $(e.target).prop("name")) && (t = $(e.target).parent().prop("name")), $.collapseBoxInit(t, !0)
            }), $("body").on("click",".tnc",  function(e) { "addwatchlist" == t && $("#utAddToWatchList").addClass("added"), $("#swebRedirectionForm").submit() }), $("body").on("click", ".tnc-cancel",  function(e) { $(".lightbox-wrapper").removeClass("show-terms-wrapper"), $(".hide-terms").show(), $(".show-terms").hide(), $(".ut-lightbox.ut-lightbox-overlay").css({ overflow: "scroll" }), $(".ut-lightbox.ut-lightbox-overlay").find(".lightbox-wrapper").prop("style","") }), $("body").undelegate(".hpviewmore").on("click.hpviewmore",".head-para-viewmore",  function(e) {
                var t = $(this),
                    r = $(".head-full-content"),
                    a = $(".head-para");
                a.toggleClass("hide"), r.toggleClass("hide"), a.hasClass("hide") ? t.text(t.attr("data-label-show")) : t.text(t.attr("data-label-hide"))
            }), $("body").on("click",".morningstar-tabs li",  function() {
                $(".morningstar-tabs li").not(this).removeClass("active"), $(this).addClass("active");
                var e = "/iwov-resources/images/ut-fundsearch/timelineChart-" + $(this).text() + ".png";
                $("#timelineChart img").prop("src", e)
            })
        },
        drawPieChart: function(e, t, r) {
            var a = 500,
                s = $(window).width();
            utSearchModule.isMobile() && (a = s > 767 ? 450 : 335);
            var o = new Highcharts.Chart({
                chart: { renderTo: "pieChart", type: "pie", width: a, spacingBottom: 30, marginLeft: 15, spacingTop: 0, spacingLeft: -30, spacingRight: 25 },
                scrollbar: { enabled: !0 },
                title: { text: "", style: { display: "none" } },
                credits: { enabled: !1 },
                plotOptions: {
                    series: {
                        allowPointSelect: !0,
                        stickyTracking: !1,
                        point: {
                            events: {
                                mouseOver: function(e) {
                                    var t = this;
                                    this.points;
                                    utSearchModule.isMobile() ? (t.selected || (o.tooltip.shared = !0), timeout = setTimeout(function() { o.tooltip.shared = !1, o.tooltip.refresh(t) }, 500)) : t.selected || t.slice(!0)
                                }
                            }
                        },
                        events: {
                            mouseOut: function() {
                                var e = this;
                                this.points;
                                if (utSearchModule.isMobile()) setTimeout(function() { o.tooltip.shared = !1, o.tooltip.refresh(e) }, 500), clearTimeout(timeout);
                                else
                                    for (var t in this.points) this.points[t].sliced && this.points[t].slice(!1)
                            }
                        }
                    },
                    pie: { allowPointSelect: !0, cursor: "pointer", borderWidth: 0, dataLabels: { enabled: !0, color: "#000000", formatter: function() { return "<span style=\"font-family:'Frutiger',Arial,sans-serif;font-size:14px;float:left;color:#000;\">" + this.point.name + "<br/>" + Highcharts.numberFormat(this.percentage, 2) + "% </span>" } }, showInLegend: !1 }
                },
                tooltip: { backgroundColor: "none", borderWidth: 0, shadow: !1, useHTML: !0, padding: 0, valueDecimals: 2, valueSuffix: "%", formatter: function() { return this.point.name + "</br>" + this.y.toFixed(2) + "%" }, positioner: function() { return utSearchModule.isMobile() ? (chartPos = { x: 120, y: 110 }, s > 766 ? chartPos = { x: 180, y: 110 } : s > 300 && s < 400 ? chartPos = { x: 132, y: 110 } : s > 400 && s < 767 && (chartPos = { x: 124, y: 110 }), chartPos) : { x: 206, y: 135 } } },
                series: [{ size: t, innerSize: r, shadow: !1, name: "Count", data: e }]
            })
        },
        fiterResults: function(e, t, r) {
            utSearchModule.filterObj[e] = t;
            var a = this.dataArr;
            if (0 === r && delete this.filterObj[e], this.renderArr = function(e, t) { return e.filter(function(e) { return Object.keys(t).every(function(r) { return (e[r].indexOf(t[r])>=0) }) }) }(a, utSearchModule.filterObj), this.$filterFocusFunds.is(":checked")) {
                $(".checkbox").addClass("filtered");
                var s = this.sortFocusFunds(this.renderArr);
                this.showSearchResult(s)
            } else $(".checkbox").addClass("filtered"), this.showSearchResult(this.renderArr);
            this.printListCount(this.renderArr)
        },
        sortFocusFunds: function(e) {
            var t = $.grep(e, function(e, t) { return 1 == e.isFocusFund }, !1),
                r = $.grep(e, function(e, t) { return 1 == e.isFocusFund }, !0);
            return $.merge($.merge([], t), r)
        },
        showSearchResult: function(e, t) {
            this.sortFocusFunds(e);
            var r = [],
                a = e.length;
            if (0 === a) return this.$table.hide(), this.$list.hide(), this.$pager.hide(), void $("#toggleView").hide();
            a <= 24 ? (this.$pager.hide(), $("#toggleView").show()) : (this.$pager.show(), $("#toggleView").show()), this.toggleViewId = $("#toggleView a.on").attr("data-target"), $(window).width() < 768 && (this.isList = !0, this.toggleViewId = "utListBody"), this.isList ? (this.$table.hide(), this.$list.show(), $("#" + this.toggleViewId).html(""), this.$filterFocusFunds.is(":checked") && (e = this.sortFocusFunds(e)), $.each(e, function(e, t) {
                var a;
                a = 1 == t.isFocusFund ? "ut-focusfund" : "";
                var s = parseFloat(t.percentage);
                s = isNaN(s) ? 0 : s;
                var o = '<li class="' + a + '" data-pid="' + t.pid + '" data-url="' + t.fundDetailUrl + '"><a href="#"><label>' + t.fundName + '</label><p class="' + (s > 0 ? "" : 0 == s ? "cellHyphen" : "cellRed") + '">' + (0 == s ? "&mdash;" : t.percentage + "%") + "<span>" + fundTypeStr + "</span><p>";
                r.push(o), utSearchModule.$pager.addClass("ut-list")
            })) : (this.$table.show(), this.$list.hide(), $("#" + this.toggleViewId).html(""), $.each(e, function(e, t) {
                var a;
                a = 1 == t.isFocusFund ? '<span class="mLeft-16 ut-badge">FOCUS FUND</span>' : "";
                var s = '<tr data-pid="' + t.pid + '"data-url="' + t.fundDetailUrl + '"><td class="cellLeft">' + t.fundName + a + '</td><td class="cellLeft">' + t.currency + '</td><td class="text-right ' + utSearchModule.numCheck(t.threeMth) + '">' + (utSearchModule.isBlankString(t.threeMth) ? "<span class='greyColor'>&mdash;</span>" : t.threeMth) + '</td><td class="text-right ' + utSearchModule.numCheck(t.sixMth) + '">' + (utSearchModule.isBlankString(t.sixMth) ? "<span class='greyColor'>&mdash;</span>" : t.sixMth) + '</td><td class="text-right ' + utSearchModule.numCheck(t.oneYr) + '">' + (utSearchModule.isBlankString(t.oneYr) ? "<span class='greyColor'>&mdash;</span>" : t.oneYr) + '</td><td class="text-right ' + utSearchModule.numCheck(t.threeYr) + '">' + (utSearchModule.isBlankString(t.threeYr) ? "<span class='greyColor'>&mdash;</span>" : t.threeYr) + '</td><td class="text-right ' + utSearchModule.numCheck(t.threeYrsd) + '">' + (utSearchModule.isBlankString(t.threeYrsd) ? "<span class='greyColor'>&mdash;</span>" : t.threeYrsd) + "</td></tr>";
                r.push(s), utSearchModule.$pager.addClass("ut-table")
            })), $("#" + this.toggleViewId).append(r), this.pagination(this.toggleViewId, t)
        },
        numCheck: function(e) { if ("" == e || null == e || " " == e) return t = "cellRed"; var t = e > 0 ? "cellGreen" : "cellRed"; return t },
        isBlankString: function(e) { return "" == e || null == e || " " == e || "0.00" == e },
        pagination: function(e, t) {
            midVal = 10;
            var r = { containerID: e, perPage: "utTableBody" === e ? 20 : 24, midRange: midVal, startRange: 0, endRange: 0, first: !1, previous: "Prev", next: "Next", callback: function(e, t) { return utSearchModule.printListCount(utSearchModule.renderArr), !1 } };
            this.$pager.jPages(r), $(".pagination>a").on("click", function(e) { t || $(e.target).parent().hasClass("pagination") && utSearchModule.scrollToTop() }), $('.pagination.ut-list a[href="#"]').each(function() { $(this).find("mark").remove(), $(this).prepend("<mark class='pagelabel'>Page</mark>") })
        },
        printListCount: function(e) {
            if (0 == e.length || void 0 == e ? (this.$countLegend.html(searchResult), this.$mobileCountLegend.html(searchResult), this.$countLegend.addClass("msg-error"), this.$mobileCountLegend.addClass("msg-error"), $(".focusFundDiv").hide(), $(".notes").removeClass("mTop-32")) : (this.$countLegend.removeClass("msg-error"), this.$mobileCountLegend.removeClass("msg-error"), this.$countLegend.html(e.length + " Items"), this.$mobileCountLegend.html(e.length + " Items"), $(".ut-error-msg").hide(), $(".table-nine-colm").is(":visible") || $(".focusFundDiv").show(), $(".notes").addClass("mTop-32")), 0 == e.length) this.$countLegend.html(noFundAvailableStr), $(".focusFundDiv").addClass("legerr");
            else { this.isMobile() ? (0, this.$mobileCountLegend.html(e.length + " Items")) : this.$countLegend.html(e.length + " Items"), $(".focusFundDiv").removeClass("legerr") }
        },
        scrollToTop: function() {
            var e;
            if (this.isMobile) {
                var t = 122;
                $(".alert-main").length > 0 && $(".alert-main").is(":visible") && (t += $(".alert-main").outerHeight()), e = $(".unit-note").offset().top - t
            } else e = $("#utFundSearch .unit-note h2").offset().top - 122;
            $("html, body").animate({ scrollTop: e }, 500)
        }
    }, $(".container.unit-trust").length > 0 && $.ajax({ url: "/iw/fundsearch/fundlist.jsp", type: "GET", async: !1, complete: function(e) { utData = e.responseText, utSearchModule.init() } })
});
