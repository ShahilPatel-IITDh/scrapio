/**
 * Theme functions file
 */
(function ($) {
    'use strict';

    var $window = $(window);


    /**
    * Document ready (jQuery)
    */
    $(function () {

        var wpzoomLazyLoadImagesInitEvent = function () {

            var event = document.createEvent('Event');
            var bodyEl = document.querySelector('body');

            event.initEvent('jetpack-lazy-images-load', true, true);
            bodyEl.dispatchEvent(event);

        };

        /**
         * Activate superfish menu.
         */
        $('.sf-menu').superfish({
            'speed': 'fast',
            'delay' : 0,
            'animation': {
                'height': 'show'
            }
        });

       /**
        * SlickNav
        */

       $('#menu-main-slide').slicknav({
           prependTo:'.navbar-header-main',
           allowParentLinks: true,
           closedSymbol: "",
           openedSymbol: ""
           }
       );

       $('#menu-main-slide_compact').slicknav({
           prependTo:'.navbar-header-compact',
           label: '',
           allowParentLinks: true,
           closedSymbol: "",
           openedSymbol: "",
           }
       );


       var section_topbar = $('.top-navbar').outerHeight();
       var brand_wrap = $('.logo_wrapper_main').outerHeight();

       var viewableOffset = section_topbar + brand_wrap + 70;

       var viewableOffsetTop = section_topbar;


       /**
        * Activate Headroom.
        */

        var sticky_menu = zoomOptions.navbar_sticky_menu;

        if (sticky_menu) {

           $('.wpz_header_layout_compact .logo_wrapper_main').headroom({
              tolerance: {
                  up: 0,
                  down: 0
              },
              offset : viewableOffsetTop
           });


            $('.main-navbar').headroom({
              tolerance: {
                  up: 0,
                  down: 0
              },
              offset : viewableOffset
            });

        }

       /* Tag Cloud fix */
       $('.tag-cloud-link:has(.post_count)').addClass('has_sub');


        /**
         * FitVids - Responsive Videos in posts
         */
        $(".entry-content, .cover").fitVids();


        /**
         * Search form in header.
         */
        $(".sb-search").sbSearch();


        // tick toggle

        $(".shortcode-ingredients li").prepend('<span class="tick"></span>')


        $(".shortcode-ingredients li").on('click', function(){
            $(this).find("span").toggleClass("ticked");
            $(this).toggleClass("ticked");
        });

        /**
         * Retina-ready images in Slider.
         */
        $.fn.responsiveSliderImages();

        /**
         * Recipe Index infinite loading support.
         */
        var $folioitems = $('.foodica-index');
        if (typeof wpz_currPage != 'undefined' && wpz_currPage < wpz_maxPages) {
            $('.navigation').empty().append('<a class="btn btn-primary" id="load-more" href="#">' + zoomOptions.index_infinite_load_txt + '</a>');

            $('#load-more').on('click', function (e) {
                e.preventDefault();
                if (wpz_currPage < wpz_maxPages) {
                    $(this).text(zoomOptions.index_infinite_loading_txt);
                    wpz_currPage++;

                    $.get(wpz_pagingURL + wpz_currPage + '/', function (data) {
                        var $newItems = $('.foodica-index article', data);

                        $newItems.addClass('hidden').hide();
                        $folioitems.append($newItems);
                        $folioitems.find('article.hidden').fadeIn().removeClass('hidden');

                        if ((wpz_currPage + 1) <= wpz_maxPages) {
                            $('#load-more').text(zoomOptions.index_infinite_load_txt);
                        } else {
                            $('#load-more').animate({height: 'hide', opacity: 'hide'}, 'slow', function () {
                                $(this).remove();
                            });
                        }

                        //trigger jetpack lazy images event
                        $( 'body' ).trigger( 'jetpack-lazy-images-load');
                        wpzoomLazyLoadImagesInitEvent();
                    });
                }
            });
        }


        $.fn.TopMenuMargin();


    });

    $window.on('load', function() {
        // $window.ready(function() {

        /**
         * Activate main slider.
         */
        $('#slider').sllider();


    });


    $.fn.sllider = function() {
        return this.each(function () {
            var $this = $(this);

            var $slides = $this.find('.slide');

            if ($slides.length <= 1) {
                $slides.addClass('is-selected');

                return;
            }

            var flky = new Flickity('.slides', {
                autoPlay: (zoomOptions.slideshow_auto ? parseInt(zoomOptions.slideshow_speed, 10) : false),
                cellAlign: 'center',
                contain: true,
                percentPosition: false,
                //prevNextButtons: false,
                pageDots: true,
                wrapAround: true,
                accessibility: false
            });
        });
    };


    $.fn.sbSearch = function() {
       return this.each(function() {
           new UISearch( this );
       });
    };

    $.fn.responsiveSliderImages = function () {
        $(window).on('resize orientationchange', update);

        function update() {
            var windowWidth = $(window).width();

            if (windowWidth > 900) {
                retinajs();
            }
        }

        update();
    };

    $.fn.TopMenuMargin = function () {
        $(window).on('resize orientationchange', update);

        function update() {

            var $header = $('.wpz_header_layout_compact .navbar-header');
            var $btn_padding = $('.navbar-header-compact .slicknav_btn');

            $btn_padding.css('top', $header.outerHeight() / 2.5);
        }

        update();
    };

	$(window).on(
		'elementor/frontend/init',
		function () {
			elementorFrontend.hooks.addAction('frontend/element_ready/widget', function ($scope) {
				
				//Init the Foodica Slidshow widget
				if ( $scope.data('widget_type') == "wpzoom-elementor-addons-slider-foodica.default" ) {
					$('#slider').sllider();
					$.fn.responsiveSliderImages();
				}

			});
		}
	);

})(jQuery);