(function (e) {
    "use strict";
    var n = window.MINIMAL_JS || {};
    var grid;
    /*Used for ajax loading posts*/
    var loadType, loadButton, loader, pageNo, loading, morePost, scrollHandling;

    function minimal_grid_is_on_scrn(elem) {
        // if the element doesn't exist, abort
        if (elem.length == 0) {
            return;
        }
        var tmtwindow = jQuery(window);
        var viewport_top = tmtwindow.scrollTop();
        var viewport_height = tmtwindow.height();
        var viewport_bottom = viewport_top + viewport_height;
        var tmtelem = jQuery(elem);
        var top = tmtelem.offset().top;
        var height = tmtelem.height();
        var bottom = top + height;
        return (top >= viewport_top && top < viewport_bottom) ||
            (bottom > viewport_top && bottom <= viewport_bottom) ||
            (height > viewport_height && top <= viewport_top && bottom >= viewport_bottom);
    }

    n.mobileMenu = {
        init: function () {
            this.toggleMenu();
            this.menuArrow();
        },
        toggleMenu: function () {
            e('.nav-toogle').on('click', function (event) {
                e('body').toggleClass('extended-menu');
            });
            e('.main-navigation').on('click', 'ul.menu a i', function (event) {
                event.preventDefault();
                var ethis = e(this),
                    eparent = ethis.closest('li'),
                    esub_menu = eparent.find('> .sub-menu');
                //console.log(esub_menu.css());
                // if (esub_menu.css('display') == 'none') {
                //     console.log('aye');
                //     esub_menu.slideDown('300');
                    
                // } 
                if(ethis.hasClass('active')) {
                    esub_menu.slideUp('300');
                    ethis.removeClass('active');
                } else {
                    esub_menu.slideDown('300');
                    ethis.addClass('active');
                }

                
                //else if (esub_menu.css('display') == 'block') {
                //     console.log('aye');
                //     esub_menu.slideUp('300');
                //     ethis.removeClass('active');
                // } 
                // else {
                //     //console.log('aye');
                //     esub_menu.slideDown('300');
                //     ethis.addClass('active');
                // }
                return false;
            });
            e('.main-navigation').on('focus', '.menu-item-has-children > a', function(event) {
                console.log('aye');
                var ethis = e(this),
                    eparent = ethis.parent('li'),
                    esub_menu = eparent.find('> .sub-menu');

                console.log(esub_menu);

                if(ethis.hasClass('active')) {
                    esub_menu.slideUp('300');
                    ethis.removeClass('active');
                } else {
                    esub_menu.slideDown('300');
                    ethis.addClass('active');
                }

                return false;
            });
        },
        menuArrow: function () {
            if (e('.main-navigation ul.menu').length) {
                e('.main-navigation ul.menu .sub-menu').parent('li').find('> a').append('<i class="icon-nav-down">');
            }
        }
    };
    n.ThemematticSearch = function () {
        e('.icon-search').on('click', function (event) {
            e('body').toggleClass('reveal-search');
        });
        e('.close-popup').on('click', function (event) {
            e('body').removeClass('reveal-search');
        });
    };
    n.ThemematticPreloader = function () {

            e("body").addClass("page-loaded");

    };
    n.ThemematticSlider = function () {
        e(".gallery-columns-1, ul.wp-block-gallery.columns-1, .wp-block-gallery.columns-1 .blocks-gallery-grid").each(function () {
            e(this).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: true,
                autoplay: true,
                autoplaySpeed: 8000,
                infinite: true,
                dots: false,
                nextArrow: '<i class="navcontrol-icon slide-next ion-ios-arrow-right"></i>',
                prevArrow: '<i class="navcontrol-icon slide-prev ion-ios-arrow-left"></i>'
            });
        });
    };
    n.SingleColGallery = function (gal_selector) {
        if (e.isArray(gal_selector)) {
            e.each(gal_selector, function (index, value) {
                e("#" + value).find('.gallery-columns-1, ul.wp-block-gallery.columns-1, .wp-block-gallery.columns-1 .blocks-gallery-grid').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    infinite: false,
                    nextArrow: '<i class="navcontrol-icon slide-next ion-ios-arrow-right"></i>',
                    prevArrow: '<i class="navcontrol-icon slide-prev ion-ios-arrow-left"></i>'
                });
            });
        } else {
            e("." + gal_selector).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                infinite: false,
                nextArrow: '<i class="navcontrol-icon slide-next ion-ios-arrow-right"></i>',
                prevArrow: '<i class="navcontrol-icon slide-prev ion-ios-arrow-left"></i>'
            });
        }
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
    n.DataBackground = function () {
        var pageSection = e(".data-bg");
        pageSection.each(function (indx) {
            if (e(this).attr("data-background")) {
                e(this).css("background-image", "url(" + e(this).data("background") + ")");
            }
        });
        e('.bg-image').each(function () {
            var src = e(this).children('img').attr('src');
            e(this).css('background-image', 'url(' + src + ')').children('img').hide();
        });
    };
    n.show_hide_scroll_top = function () {
        if (e(window).scrollTop() > e(window).height() / 2) {
            e("#scroll-up").fadeIn(300);
        } else {
            e("#scroll-up").fadeOut(300);
        }
    };
    n.scroll_up = function () {
        e("#scroll-up").on("click", function () {
            e("html, body").animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    };
    n.toogle_minicart = function () {
        e(".minicart-title-handle").on("click", function () {
            e(".minicart-content").slideToggle();
        });
    };
    n.ms_masonry = function () {
        if (e('.masonry-grid').length > 0) {
            /*Default masonry animation*/
            var hidden = 'scale(0.5)';
            var visible = 'scale(1)';
            /**/
            /*Get masonry animation*/
            if (minimalGridVal.masonry_animation === 'none') {
                hidden = 'translateY(0)';
                visible = 'translateY(0)';
            }
            if (minimalGridVal.masonry_animation === 'slide-up') {
                hidden = 'translateY(50px)';
                visible = 'translateY(0)';
            }
            if (minimalGridVal.masonry_animation === 'slide-down') {
                hidden = 'translateY(-50px)';
                visible = 'translateY(0)';
            }
            if (minimalGridVal.masonry_animation === 'zoom-out') {
                hidden = 'translateY(-20px) scale(1.25)';
                visible = 'translateY(0) scale(1)';
            }
            /**/
            grid = e('.masonry-grid').imagesLoaded(function () {
                //e('.masonry-grid article').fadeIn();
                grid.masonry({
                    itemSelector: 'article',
                    hiddenStyle: {
                        transform: hidden,
                        opacity: 0
                    },
                    visibleStyle: {
                        transform: visible,
                        opacity: 1
                    }
                });
            });
        }
    };
    n.thememattic_matchheight = function () {
        e('.widget-area').theiaStickySidebar({
            additionalMarginTop: 30
        });
    };
    n.thememattic_reveal = function () {
        e('#thememattic-reveal').on('click', function (event) {
            e('body').toggleClass('reveal-box');
        });
        e('.close-popup').on('click', function (event) {
            e('body').removeClass('reveal-box');
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
        e(window).scroll(function () {
            if ( !e('.load-more-posts').hasClass('tmt-no-post') && !e('.load-more-posts').hasClass('tmt-post-loding') && e('.load-more-posts').hasClass('scroll') && minimal_grid_is_on_scrn('.load-more-posts')) {

                e('.load-more-posts').addClass('tmt-post-loding');
                n.ShowPostsAjax();

            }
        });
    };
    n.fetchPostsOnClick = function () {
        if (e('.load-more-posts').length > 0 && 'click' === loadType) {
            e('.load-more-posts a').on('click', function (event) {
                event.preventDefault();
                n.ShowPostsAjax();
            });
        }
    };
    n.masonryOnClickUpdate = function () {
        setTimeout(function () {
            e('.masonry-grid').masonry();
        }, 100);
    };
    n.fetchPostsOnMenuClick = function () {
        e('.trigger-icon-wraper').on('click', function (event) {
            event.preventDefault();
            grid = e('.masonry-grid');
            n.masonryOnClickUpdate();
        });
    };
    n.ShowPostsAjax = function () {
        e.ajax({
            type: 'GET',
            url: minimalGridVal.ajaxurl,
            data: {
                action: 'minimal_grid_load_more',
                nonce: minimalGridVal.nonce,
                page: pageNo,
                post_type: minimalGridVal.post_type,
                search: minimalGridVal.search,
                cat: minimalGridVal.cat,
                taxonomy: minimalGridVal.taxonomy,
                author: minimalGridVal.author,
                year: minimalGridVal.year,
                month: minimalGridVal.month,
                day: minimalGridVal.day
            },
            dataType: 'json',
            beforeSend: function () {
                loader.addClass('ajax-loader-enabled');
            },
            success: function (response) {
                e('.load-more-posts').removeClass('tmt-post-loding');
                if (response.success) {
                    var gallery = true;
                    var gal_selectors = [];
                    var content_join = response.data.content.join('');
                    /*Push the post ids having galleries so that new gallery instance can be created*/
                    e(content_join).find('.entry-gallery').each(function () {
                        gal_selectors.push(e(this).closest('article').attr('id'));
                    });
                    if (e('.masonry-grid').length > 0) {

                        var content = e(content_join);
                        content.hide();
                        grid = e('.masonry-grid');
                        grid.append(content);
                        grid.imagesLoaded( function() {

                            content.show();
                            /*Init new Gallery*/
                            if (true === gallery) {
                                n.SingleColGallery(gal_selectors);
                            }
                            
                            var winwidth = e(window).width();
                            e(window).resize(function() {
                                winwidth = e(window).width();
                            });

                            if( winwidth > 990 ){
                                grid.masonry('appended', content).masonry();
                            }else{
                                grid.masonry('appended', content);
                            }
                           
                            loader.removeClass('ajax-loader-enabled');

                        } );

                    }else{

                        e('.minimal-grid-posts-lists').append(response.data.content);
                        /*Init new Gallery*/
                        if (true === gallery) {
                            n.SingleColGallery(gal_selectors);
                        }
                        loader.removeClass('ajax-loader-enabled');

                    }
                    pageNo++;
                    loading = false;
                    if (!response.data.more_post) {
                        morePost = false;
                        loadButton.fadeOut();
                    }
                    /*For audio and video to work properly after ajax load*/
                    e('video, audio').mediaelementplayer({alwaysShowControls: true});
                    /**/
                    /*For Gallery to work*/
                    n.MagnificPopup();
                    /**/
                    loader.removeClass('ajax-loader-enabled');
                } else {
                    e('.load-more-posts').addClass('tmt-no-post');
                    loadButton.fadeOut();
                }
            }
        });
    };
    e(document).ready(function () {
        n.mobileMenu.init();
        n.ThemematticSearch();
        n.ThemematticSlider();
        n.MagnificPopup();
        n.DataBackground();
        n.scroll_up();
        n.thememattic_reveal();
        n.thememattic_matchheight();
        n.toogle_minicart();
        n.ms_masonry();
        n.setLoadPostDefaults();
        n.fetchPostsOnClick();
        n.fetchPostsOnMenuClick();
    });
	
	 e(window).load(function () {
          n.ThemematticPreloader();
       });
		
    e(window).scroll(function () {
        n.show_hide_scroll_top();
        n.fetchPostsOnScroll();
    });
})(jQuery);