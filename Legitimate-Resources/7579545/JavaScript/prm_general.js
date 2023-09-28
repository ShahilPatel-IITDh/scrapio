function hourCounter() {
    var e = new Date,
        t = e.getTime(),
        o = new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59),
        n = e.getDate() % 3,
        a = 3 - n;
    if (0 == n) var i = o.getTime();
    else i = o.getTime() + 864e5 * a;
    var s = i - t;
    startTimer(s = parseInt(s / 1e3))
}
var timeInSecs, ticker;

function startTimer(e) {
    timeInSecs = parseInt(e), ticker = setInterval("tick()", 1e3), tick()
}

function tick() {
    var e = timeInSecs;
    e > 0 ? timeInSecs-- : clearInterval(ticker), window.hours = Math.floor(e / 3600), e %= 3600, window.minutes = Math.floor(e / 60), e %= 60, window.seconds = e, $(".taimer").length
}

function activeClass() {
    var e = window.location.pathname;
    e = e.replace(/\/$/, ""), e = decodeURIComponent(e), $(".main-menu a").each((function() {
        var t = $(this).attr("href");
        t = t.split(".aspx")[0], (e = e.split(".aspx")[0]) === t && $(this).closest("li.main-menu-item").addClass("active")
    }))
}

function cs_get_price_per_month(e) {
    $.getJSON("https://bgsfprodshopip.bullguard.com/api/configurepurchase/getwithprice/pid/43/purchaseType/NewPurchase?countryIso=" + e + "&coupon=vpnsite350", (function(t) {
        $.each(t, (function(t, o) {
            if ("15647" == o.productId) {
                if ("AU" == e) var n = "$";
                else if ("NO" == e || "SE" == e) n = "kr";
                else n = o.currencySymbol;
                var a = a = o.discountedPrice ? o.discountedPrice : o.price;
                $(".VPNtopPricePerMonth").text(n + cs_toFixed(a / 3 / 12, 2))
            }
        }))
    }))
}

function cs_toFixed(e, t) {
    var o = new RegExp("^-?\\d+(?:.\\d{0," + (t || -1) + "})?");
    return e.toString().match(o)[0]
}
$(document).ready((function() {
        $("body").hasClass("home") || ($(".wrapper").css("paddingTop", 0), $(".top-bar").css("position", "relative")), null == $.cookie("award_promo_cookie") ? $(".iPromo").css("display", "block") : $(".iPromo").css("display", "none"), $(".close-promo").click((function() {
            return null == $.cookie("award_promo_cookie") && $.cookie("award_promo_cookie", "1", {
                expires: 5,
                path: "/"
            }), $(this).parent().addClass("hidden"), !1
        }))
    })),
    function(e) {
        e.fn.showclock = function() {
            0 != days && e(".days").html(days), e(".seconds").html(seconds), e(".minutes").html(minutes), e(".hours").html(hours)
        }, e.fn.countdown = function() {
            var t = e(this);
            t.showclock(), setInterval((function() {
                t.showclock()
            }), 1e3)
        }
    }(jQuery), $.fn.countdown = function() {
        var e = $(this);
        e.showclock(), setInterval((function() {
            e.showclock()
        }), 1e3)
    }, $(document).ready((function() {
        $.fn.showclock = function() {
            $(".taimer").length && ($(".hours").html(window.hours), $(".minutes").html(window.minutes), $(".seconds").html(window.seconds))
        }, $(".taimer").countdown()
    })), $(document).ready((function() {
        (activeClass(), $("[data-media]").on("click", (function(e) {
            e.preventDefault();
            var t = $(this),
                o = t.attr("data-media"),
                n = $(".owl-stage .owl-item:not(.cloned) .popupY");
            $(n).find("iframe").attr("src", o), t.closest(".clipY").addClass("show-popup")
        })), $(".product-header").on("touchstart mousedown", (function(e) {
            e.stopPropagation()
        })), $(".popupY").on("click", (function(e) {
            e.preventDefault(), e.stopPropagation(), $(".clipY").removeClass("show-popup")
        })), $(".clY, .popupY").on("click", (function(e) {
            e.preventDefault(), e.stopPropagation(), $(".clipY").removeClass("show-popup"), $(".popupY iframe").attr("src", "")
        })), $(".popupY > iframe").on("click", (function(e) {
            e.stopPropagation()
        })), $(".wasHelpful .yes").on("click", (function(e) {
            e.preventDefault(), $(".wasHelpful p span").removeClass("active"), $(".wasHelpful .responseYesContent").css("display", "inline-block"), $(".wasHelpful .responseNoContent").hide(), $(this).addClass("active")
        })), $(".wasHelpful .no").on("click", (function(e) {
            e.preventDefault(), $(".wasHelpful p span").removeClass("active"), $(".wasHelpful .responseYesContent").hide(), $(".wasHelpful .responseNoContent").css("display", "inline-block"), $(this).addClass("active")
        })), $(".bpp div.malware p").text("AV-Comparatives Jan 2018"), $(".is div.malware p").text("AV-Comparatives Jan 2018"), $(".av div.malware p").text("AV-Comparatives Jan 2018"), $(".home #section_game_booster .top_label").attr("data-title2", $(".product_new_feature li:nth-of-type(2) .right_label").attr("data-title2")), $(".home").length > 0) 
    }));