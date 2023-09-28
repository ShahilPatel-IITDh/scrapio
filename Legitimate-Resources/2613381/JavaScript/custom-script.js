/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
(function () {
    var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
        isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
        isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1;

    if (( isWebkit || isOpera || isIe ) && document.getElementById && window.addEventListener) {
        window.addEventListener('hashchange', function () {
            var id = location.hash.substring(1),
                element;

            if (!( /^[A-z0-9_-]+$/.test(id) )) {
                return;
            }

            element = document.getElementById(id);

            if (element) {
                if (!( /^(?:a|select|input|button|textarea)$/i.test(element.tagName) )) {
                    element.tabIndex = -1;
                }

                element.focus();
            }
        }, false);
    }
})();

window.addEventListener("load", function(){

    jQuery(document).ready(function($){
        "use strict";

        $("body").addClass("page-loaded");

    });

});

(function (e) {
    "use strict";
    var n = window.TWP_JS || {};
    var iScrollPos = 0;
    var loadType, loadButton, loader, pageNo, loading, morePost, scrollHandling;
    n.mobileMenu = {
        init: function () {
            this.toggleMenu();
            this.menuMobile();
            this.menuArrow();
        },
        toggleMenu: function () {
            e('#masthead').on('click', '.toggle-menu', function (event) {
                var ethis = e('.main-navigation .menu .menu-mobile');
                if (ethis.css('display') == 'block') {
                    ethis.slideUp('300');
                    e("#masthead").removeClass('menu-active');
                } else {
                    ethis.slideDown('300');
                    e("#masthead").addClass('menu-active');
                }
                e('.ham').toggleClass('exit');
            });
            e('#masthead .main-navigation ').on('click', '.menu-mobile a i', function (event) {
                event.preventDefault();
                var ethis = e(this),
                    eparent = ethis.closest('li'),
                    esub_menu = eparent.find('> .sub-menu');
                if (esub_menu.css('display') == 'none') {
                    esub_menu.slideDown('300');
                    ethis.addClass('active');
                } else {
                    esub_menu.slideUp('300');
                    ethis.removeClass('active');
                }
                return false;
            });

            e('.skip-link-menu-end').focus(function(){
                if( e('.ham').hasClass('exit') ){
                    e('.toggle-menu').focus();
                }
            });

            // Action On Esc Button
            e(document).keyup(function(j) {
                if (j.key === "Escape") { // escape key maps to keycode `27`
                    if( e('.ham').hasClass('exit') ){

                        var ethis = e('.main-navigation .menu .menu-mobile');
                        if (ethis.css('display') == 'block') {
                            ethis.slideUp('300');
                            e("#masthead").removeClass('menu-active');
                        } else {
                            ethis.slideDown('300');
                            e("#masthead").addClass('menu-active');
                        }
                        e('.ham').toggleClass('exit');
                        e('.toggle-menu').focus();
                    }

                }
            });

            e('.skip-link-menu-start-1').focus(function(){
                e('.toggle-menu').focus();
            });
            e('.skip-link-menu-start-2').focus(function(){
                e('#primary-menu li:last-child a').focus();
            });

        },
        menuMobile: function () {
            if (e('.main-navigation .menu > ul').length) {
                var ethis = e('.main-navigation .menu > ul'),
                    eparent = ethis.closest('.main-navigation'),
                    pointbreak = eparent.data('epointbreak'),
                    window_width = window.innerWidth;
                if (typeof pointbreak == 'undefined') {
                    pointbreak = 991;
                }
                if (pointbreak >= window_width) {
                    ethis.addClass('menu-mobile').removeClass('menu-desktop');
                    e('.main-navigation .toggle-menu').css('display', 'block');
                } else {
                    ethis.addClass('menu-desktop').removeClass('menu-mobile').css('display', '');
                    e('.main-navigation .toggle-menu').css('display', '');
                }
            }
        },
        menuArrow: function () {
            if (e('#masthead .main-navigation div.menu > ul').length) {
                e('#masthead .main-navigation div.menu > ul .sub-menu').parent('li').find('> a').append('<i class="ion-ios-arrow-down">');
            }
        }
    };
    n.TwpReveal = function () {
        e('.icon-search').on('click', function (event) {
            e('body').toggleClass('reveal-search');

            setTimeout(function(){ 

                e('a.close-popup').focus();

             }, 300);
            
        });

        e('.skip-link-search-start').focus(function(){
            e('.popup-search .search-submit').focus();
        });

        e('.close-popup').on('click', function (event) {
            e('body').removeClass('reveal-search');

            setTimeout(function(){

                e('.icon-search').focus();

             }, 300);

        });

        e( 'input, a, button' ).on( 'focus', function() {
            if ( e( 'body' ).hasClass( 'reveal-search' ) ) {

                if ( ! e( this ).parents( '.popup-search' ).length ) {
                    e('a.close-popup').focus();
                }
            }
        } );

        // Action On Esc Button
        e(document).keyup(function(j) {
            if (j.key === "Escape") { // escape key maps to keycode `27`

                if( e('body').hasClass('reveal-search') ){

                    e('body').removeClass('reveal-search');

                    setTimeout(function(){

                        e('.icon-search').focus();

                    }, 300);

                }

            }
        });
    };
    n.TwpHeadroom = function () {
        e("#nav-affix").headroom({
            "tolerance": 0,
            "offset": 164,
            "classes": {
                "initial": "animated",
                "pinned": "slideDown",
                "unpinned": "slideUp",
                "top": "headroom--top",
                "notTop": "headroom--not-top"
            }
        });
    };
    n.TwpTabwidget = function () {
        e('.twp-nav-tabs .infinity-blog-tab ').on('click', function (event) {
            var tabid = e(this).attr('tab-data');
            e(this).closest('.tabbed-container').find('.infinity-blog-tab').removeClass('active');
            e(this).addClass('active');
            e(this).closest('.tabbed-container').find('.tab-content .tab-pane').removeClass('active');
            e(this).closest('.tabbed-container').find('.content-' + tabid).addClass('active');
        });
    };
    n.DataBackground = function () {
        e('.bg-image').each(function () {
            var src = e(this).children('img').attr('src');
            if( src ){
                e(this).css('background-image', 'url(' + src + ')').children('img').hide();
            }
        });
    };
    n.InnerBanner = function () {
        var pageSection = e(".data-bg");
        pageSection.each(function (indx) {
            if (e(this).attr("data-background")) {
                e(this).css("background-image", "url(" + e(this).data("background") + ")");
            }
        });
    };
    n.TwpSlider = function () {
        e(".twp-slider").each(function () {
            e(this).owlCarousel({
                loop: (e('.twp-slider').children().length) == 1 ? false : true,
                autoplay: 5000,
                nav: true,
                navText: ["<i class='ion-ios-arrow-left'></i>", "<i class='ion-ios-arrow-right'></i>"],
                items: 1
            });
        });
        e(".gallery-columns-1, ul.wp-block-gallery.columns-1, .wp-block-gallery.columns-1 .blocks-gallery-grid").each(function () {
            e(this).owlCarousel({
                loop: (e(this).children().length) == 1 ? false : true,
                margin: 3,
                autoplay: 5000,
                nav: true,
                navText: ["<i class='ion-ios-arrow-left'></i>", "<i class='ion-ios-arrow-right'></i>"],
                items: 1,
                dots: false
            });
        });
    };
    n.MagnificPopup = function () {
        e('.gallery, .wp-block-gallery').each(function () {
            e(this).magnificPopup({
                delegate: 'a',
                type: 'image',
                gallery: {
                    enabled: true
                },
                zoom: {
                    enabled: true,
                    duration: 300,
                    opener: function (element) {
                        return element.find('img');
                    }
                }
            });
        });
    };
    n.show_hide_scroll_top = function () {
        if (e(window).scrollTop() > e(window).height() / 2) {
            e(".scroll-up").fadeIn(300);
        } else {
            e(".scroll-up").fadeOut(300);
        }
    };
    n.scroll_up = function () {
        e(".scroll-up").on("click", function () {
            e("html, body").animate({
                scrollTop: 0
            }, 700);
            return false;
        });
    };
    n.setLoadPostDefaults = function () {
        if (e('.load-more-posts').length > 0) {
            loadButton = e('.load-more-posts');
            loader = e('.load-more-posts .ajax-loader');
            loadType = loadButton.attr('data-load-type');
            pageNo = 2;
            loading = false;
            morePost = true;
            scrollHandling = {
                allow: true,
                reallow: function () {
                    scrollHandling.allow = true;
                },
                delay: 400
            };
        }
    };
    n.fetchPostsOnScroll = function () {
        if (e('.load-more-posts').length > 0 && 'scroll' === loadType) {
            var iCurScrollPos = e(window).scrollTop();
            if (iCurScrollPos > iScrollPos) {
                if (!loading && scrollHandling.allow && morePost) {
                    scrollHandling.allow = false;
                    setTimeout(scrollHandling.reallow, scrollHandling.delay);
                    var offset = e(loadButton).offset().top - e(window).scrollTop();
                    if (2000 > offset) {
                        loading = true;
                        n.ShowPostsAjax(loadType);
                    }
                }
            }
            iScrollPos = iCurScrollPos;
        }
    };
    n.fetchPostsOnClick = function () {
        if (e('.load-more-posts').length > 0 && 'click' === loadType) {
            e('.load-more-posts a').on('click', function (event) {
                event.preventDefault();
                n.ShowPostsAjax(loadType);
            });
        }
    };
    n.ShowPostsAjax = function (loadType) {
        e.ajax({
            type: 'GET',
            url: infinityVal.ajaxurl,
            data: {
                action: 'infinity_blog_load_more',
                nonce: infinityVal.nonce,
                page: pageNo,
                post_type: infinityVal.post_type,
                search: infinityVal.search,
                cat: infinityVal.cat,
                taxonomy: infinityVal.taxonomy,
                author: infinityVal.author,
                year: infinityVal.year,
                month: infinityVal.month,
                day: infinityVal.day
            },
            dataType: 'json',
            beforeSend: function () {
                loader.addClass('ajax-loader-enabled');
            },
            success: function (response) {
                loader.removeClass('ajax-loader-enabled');
                if (response.success) {
                    e('.infinity-posts-lists').append(response.data.content);
                    pageNo++;
                    loading = false;
                    if (!response.data.more_post) {
                        morePost = false;
                        loadButton.fadeOut();
                    }
                    /*For audio and video to work properly after ajax load*/
                    e('video, audio').mediaelementplayer({alwaysShowControls: true});
                    /**/
                    e(".gallery-columns-1").owlCarousel({
                        loop: (e('.gallery-columns-1').children().length) == 1 ? false : true,
                        margin: 3,
                        autoplay: 5000,
                        nav: true,
                        navText: ["<i class='ion-ios-arrow-left'></i>", "<i class='ion-ios-arrow-right'></i>"],
                        items: 1
                    });
                } else {
                    loadButton.fadeOut();
                }
            }
        });
    };
    n.twp_stickysidebar = function () {
        jQuery('.widget-area').theiaStickySidebar({
            additionalMarginTop: 30
        });
    };
    e(document).ready(function () {
        n.mobileMenu.init();
        n.TwpSlider();
        n.TwpReveal();
        n.TwpHeadroom();
        n.TwpTabwidget();
        n.DataBackground();
        n.InnerBanner();
        n.MagnificPopup();
        n.scroll_up();
        n.setLoadPostDefaults();
        n.fetchPostsOnClick();
        n.twp_stickysidebar();
    });
    e(window).scroll(function () {
        n.show_hide_scroll_top();
        n.fetchPostsOnScroll();
    });
    e(window).resize(function () {
        n.mobileMenu.menuMobile();
    });
})(jQuery);