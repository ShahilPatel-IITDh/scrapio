/* Minification failed. Returning unminified contents.
(102,13-14): run-time error JS1005: Expected '(': {
(103,9-15): run-time error JS1009: Expected '}': window
(103,9-15): run-time error JS1006: Expected ')': window
(103,9-15): run-time error JS1008: Expected '{': window
(103,15-16): run-time error JS1195: Expected expression: .
 */
var BREAKPOINTS = {
    DESKTOP: 1024,
    TABLET: 820,
    MOBILE: 576
};

window.setPortalHeroVideoHeight = function () {
    var facHeight = $("#fac-filters-wrapper").height();
    var hHeight = $("#trd-header").height();
    var iframeVideo = $("#hero-video");
    var iframeVideoDesktopUrl = $(".video-home").data("desktop-url");
    var iframeVideoMobileUrl = $(".video-home").data("mobile-url");
    var logoContainer = $(".site-logo-container");

    var isIframeVideo = iframeVideo && iframeVideo.length && iframeVideoDesktopUrl && iframeVideoDesktopUrl.length && iframeVideoMobileUrl && iframeVideoMobileUrl.length;

    var horizontalClass = 'video-home__video--horizontal';
    var verticalClass = 'video-home__video--vertical';

    var wHeight = $(window).outerHeight();
    var wWidth = window.innerWidth;

    if (wWidth >= BREAKPOINTS.DESKTOP && isIframeVideo) {
        iframeVideo.attr('src', iframeVideoDesktopUrl);
        iframeVideo.removeClass(verticalClass).addClass(horizontalClass);
    }

    if ((vrcIsPhone.any() || wWidth <= BREAKPOINTS.TABLET) && isIframeVideo) {
        facFiltersHeight = $(".fac-filters").height();
        facFilterHeight = $(".fac-filters li").outerHeight(true);
        facHeight = facHeight - facFiltersHeight + facFilterHeight;
        iframeVideo.attr('src', iframeVideoMobileUrl);
        iframeVideo.removeClass(horizontalClass).addClass(verticalClass);
    }

    var height = wHeight - hHeight - facHeight;

    // added for mobile landscape
    if (wHeight < BREAKPOINTS.MOBILE && wWidth > BREAKPOINTS.MOBILE && isIframeVideo) {
        height = wHeight - hHeight;
        logoContainer.hide();
        iframeVideo.attr('src', iframeVideoDesktopUrl);
        iframeVideo.removeClass(verticalClass).addClass(horizontalClass);
    }

    // set the height of the HTML5 video
    $("#trd-hero-video, #hero-video, .hero-fallback").css("height", height);
};

window.getPortalHeroVideoHeight = vcDebounce(
    function () {
        window.setPortalHeroVideoHeight();
    },
    200,
    false
);

window.wireupVideo = function () {
    var playVideoIcon = $("#trd-hero-play-video");
    var pauseVideoIcon = $("#trd-hero-pause-video");

    $(".hero-overlay, .hero-text").show();

    var vimeoIframeObj = $("#hero-video");

    if (vimeoIframeObj == null || vimeoIframeObj.size() == 0) {
        window.showFallbackImages();
        return;
    }

    try {
        var player = new Vimeo.Player(vimeoIframeObj[0]);

        if (!player) {
            return;
        }

        player.play();

        player.on("playing", function () {
            playVideoIcon.hide();
            pauseVideoIcon.show();
        });

        player.on("error", function () {
            window.showFallbackImages();
        });

        $("#trd-hero-pause-video, #trd-hero-play-video").on("click", function () {
            player.getPaused().then(function (paused) {
                if (paused) {
                    player.play();
                    playVideoIcon.hide().attr("aria-pressed", true);
                    pauseVideoIcon.show().attr("aria-pressed", false);
                } else {
                    player.pause();
                    playVideoIcon.show().attr("aria-pressed", false);
                    pauseVideoIcon.hide().attr("aria-pressed", true);
                }
            });
        });
    } catch {
        window.showFallbackImages();
    }
};

window.showFallbackImages = function () {
    $("#trd-hero-video .hero-fallback, #trd-hero-video .hero-overlay, #trd-hero-video .hero-text").show();
};

$(document).ready(function () {
    window.setPortalHeroVideoHeight();

    window.wireupVideo();
    // get the height of the HTML5 video onload

    // needed when changing orientation on phone or tablet
    var cachedWidth = $(window).width();
    $(window).resize(function () {
        var newWidth = $(window).width();
        if (newWidth !== cachedWidth) {
            $("#hero-video").attr('src', '');
            window.getPortalHeroVideoHeight();
            cachedWidth = newWidth;
        }
    });
});;
