function f(a) {
    var b = $(a).find(".lSPager.lSpg li").index($(a).find(".lSPager.lSpg li.active")),
        c = $(a).find(".lSPager.lSpg li").length - 1;
    768 > $(window).outerWidth() && $(a).find(".lSNext").parent().css("right", "60px");
    $(a).find(".lSPrev").css("cursor", 0 == b ? "not-allowed" : "pointer");
    $(a).find(".lSNext").css("cursor", b == c ? "not-allowed" : "pointer")
}

function a(a) {
    var b = $(a).find(".carousel-container-shared-item").length,
        c = g[b - 1];
    g[b - 1] ? $(a).addClass(c) :
        $(a).addClass(g[g.length - 1])
}

function d(a) {
    e($(a).find(".carousel-container-shared-item .card__body .caption__title"));
    e($(a).find(".carousel-container-shared-item .card__body .caption__sub"));
    e($(a).find(".carousel-container-shared-item .card__body"));
    if ($(a).hasClass("lightSlider")) {
        var b = e($(a).find(".carousel-container-shared-item .card-box-shared"));
        $(a).closest("section").hasClass("card-default") ? b += 6 : b;
        $(a).css("height", "initial");
        $(a).height(b + "px")
    }
}

function e(a) {
    var b = 0;
    $(a).each(function(a,
        c) {
        $(c).css("height", "initial");
        $(c).height() > b && (b = $(c).height())
    });
    $(a).each(function(a, c) {
        $(c).height(b + "px")
    });
    return b
}

function p(a) {
    var b = $(a).find(".carousel-container-shared-item").length;
    return $(a).find(".carousel-container-shared-item").eq(0).outerWidth() * b > $(a).find(".carousel-container-shared__list").outerWidth()
}

function q() {
    var a = document.getElementsByClassName("carousel-container-shared-item"),
        b = document.getElementsByClassName("lSPager lSpg");
    a = Object.entries(a);
    b = Object.entries(b);
    a.map(function(a) {
        return a[1].removeAttribute("aria-selected")
    });
    b.map(function(a) {
        var b = a[1].getElementsByTagName("li");
        b = Object.entries(b);
        b.map(function(a) {
            return a[1].removeAttribute("aria-selected")
        });
        return a
    })
}

function k() {
    $(".carousel-container-shared").each(function(c, b) {
        c = $(b).find(".carousel-container-shared-box").hasClass("edit-mode");
        a(b);
        if (!c && p(b)) var e = $($(b).find(".carousel-container-shared__list")).lightSlider({
                loop: !1,
                speed: 600,
                currentPagerPosition: "middle",
                enableDrag: !1,
                enableTouch: !1,
                autoWidth: !1,
                adaptiveHeight: !0,
                slideMove: 4,
                slideMargin: 30,
                responsive: [{
                    breakpoint: 8E3,
                    settings: {
                        item: 4,
                        slideMove: 4
                    }
                }, {
                    breakpoint: 993,
                    settings: {
                        item: 4,
                        slideMove: 4,
                        controls: !0
                    }
                }, {
                    breakpoint: 769,
                    settings: {
                        item: 2,
                        slideMove: 2,
                        controls: !0,
                        slideMargin: 15
                    }
                }, {
                    breakpoint: 732,
                    settings: {
                        item: 2,
                        slideMove: 2,
                        controls: !0,
                        slideMargin: 15
                    }
                }, {
                    breakpoint: 577,
                    settings: {
                        item: 1.62,
                        slideMove: 1,
                        controls: !0,
                        slideMargin: 20,
                        freeMove: !0,
                        enableTouch: !0
                    }
                }, {
                    breakpoint: 389,
                    settings: {
                        item: 1.5,
                        slideMove: 1,
                        controls: !0,
                        slideMargin: 15,
                        freeMove: !0,
                        enableTouch: !0
                    }
                }, {
                    breakpoint: 321,
                    settings: {
                        item: 1.3,
                        slideMove: 1,
                        controls: !0,
                        freeMove: !0,
                        enableTouch: !0
                    }
                }],
                onSliderLoad: function(a) {
                    g(a);
                    $(a).removeClass("cS-hidden");
                    d(a);
                    q();
                    f(b);
                    (320 < window.outerWidth || 386 > window.outerWidth) && $(a).css("width", $(a).innerWidth() + .4 * $(a).innerWidth() + "px");
                    carouselNavigation(h)
                },
                onAfterSlide: function(a) {
                    f(b);
                    carouselNavigation(h)
                }
            }),
            g = function(a) {
                a = a.parent().parent().find(".lSPager li");
                var b = a.length;
                a.each(function() {
                    var a = 100 * $(this).find("a").data("index") /
                        b;
                    $(this).find(".timeline-track").css("width", a + "%")
                });
                l.push(e)
            };
        else d($(b).find(".carousel-container-shared__list")), $(b).find(".carousel-container-shared__list").removeClass("cS-hidden")
    });
    m = !0
}

function n() {
    function a() {
        l.forEach(function(a) {
            a.destroy()
        });
        l = []
    }
    if (h) {
        var b = detectZoom.zoom();
        1 >= b && !m && (a(), k());
        1.1 <= b && (a(), k())
    }
}
var h = $(".carousel-container-shared"),
    l = [],
    m = !1,
    g = ["one-card", "two-cards", "three-cards", "four-cards", "more-than-four-cards"];
h && (k(), n());
$(window).on("resize", function() {
    h &&
        (m = !1, n())
});
(function() {
    $(document).delegate(".video-player .video-close", "click", function() {
        var a = $(this).parent().find("iframe").data("src"),
            b = $('.carousel-container-shared-item a[data-video\x3d"' + a + '"]').first().closest("ul"),
            d = b.innerWidth();
        b.css("width", "0");
        setTimeout(function() {
            b.css("width", d + "px")
        }, 1E3)
    })
})();
"use strict";
document.addEventListener("DOMContentLoaded", function() {
function f(a) {
    a = a.closest("section");
    return a.hasClass("image-with-text-outside") ? "Carousel Container Text Outside" : a.hasClass("image-with-text-inside") ? "Carousel Container Inside" : a.hasClass("image-with-text-center") ? "Carousel Container Rounded Image" : a.hasClass("card-default") ? "Carousel Container Default" : "Carousel Container Text Outside"
}
$(document).delegate(".carousel-container-shared-item .card__footer--click", "click", function(a) {
    a = $(this).text();
    var d = $(this).closest(".carousel-container-shared").find("h2").text(),
        e = $(this).closest(".carousel-container-shared-item").find("h3").first().text();
    a = "BTN:" + f($(this)) + ":" + d + ":" + e + ":" + a;
    a = PascalCase(a);
    setAnalyticsData(a)
});
$(document).delegate(".carousel-container-shared-item a.caption__link", "click", function(a) {
    a = $(this).text();
    var d = $(this).closest(".carousel-container-shared").find("h2").text();
    a = "LNK:" + f($(this)) + ":" + d + ":" + a;
    a = PascalCase(a);
    setAnalyticsData(a)
});
$(document).delegate(".carousel-container-shared-item a.video-transcription",
    "click",
    function(a) {
        a = $(this).text();
        var d = $(this).closest(".carousel-container-shared").find("h2").text(),
            e = $(this).closest(".carousel-container-shared-item").find("h3").first().text();
        a = "LNK:" + f($(this)) + ":" + d + ":" + e + ":" + a;
        a = PascalCase(a);
        setAnalyticsData(a)
    });
$(document).delegate(".carousel-container-shared-item a.open-youtube-modal", "click", function(a) {
    a = $(this).closest(".carousel-container-shared").find("h2").text();
    var d = $(this).closest(".carousel-container-shared-item").find("h3").first().text();
    a = "BTN:" + f($(this)) + ":" + a + ":" + d;
    a = PascalCase(a);
    setAnalyticsData(a)
});
$(document).delegate(".carousel-container-shared .shared-button-container a", "click", function(a) {
    itemLabel = $(this).text();
    a = $(this).parent().parent().find("h2").text();
    a = "BTN:" + f($(this)) + a + ":" + itemLabel;
    a = PascalCase(a);
    setAnalyticsData(a)
})
});