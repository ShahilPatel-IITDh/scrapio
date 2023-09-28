$(function() {
    "use strict";

    let OpenNavElement = $('.open');

    $(".faq-button").click(function() {

        if ($(this).parent().hasClass("open")) {
            $(this).parent().removeClass("open");
        } else {
            if (OpenNavElement != null) {
                OpenNavElement.removeClass("open");
            }
            $(this).parent().addClass("open");
            OpenNavElement = $(this).parent();
        }

    });

    $('.cookie-accept').fadeIn();

    $('.cookies-close').on('click', function() {

        $('.cookie-accept').fadeOut();

    });

    var t;
    function n(t) {
        t.next().hasClass("show") || t.parents(".dropdown-menu").first().find(".show").removeClass("show");
        var n = t.next(".dropdown-menu");
        n.toggleClass("show"),
        n.parent().toggleClass("show")
    }
    $('[data-toggle="offcanvas"]').on("click", function() {
        $(".offcanvas-collapse").toggleClass("open")
    }),
    $('.nav--has-sub-menu [data-toggle="dropdown"]').on("click", function() {
        return n($(this)),
        !1
    }),
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(t) {
        if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") && location.hostname === this.hostname) {
            var n = $(this.hash);
            (n = n.length ? n : $("[name=" + this.hash.slice(1) + "]")).length && (t.preventDefault(),
            $("html, body").animate({
                scrollTop: n.offset().top
            }, 1e3, function() {
                var t = $(n);
                if (t.focus(),
                t.is(":focus"))
                    return !1;
                t.attr("tabindex", "-1"),
                t.focus()
            }))
        }
    });
    var a = $(".btn-search-toggle")
      , o = $(".search-bar");
    a.click(function() {
        o.animate({
            width: "toggle"
        })
    })
});
