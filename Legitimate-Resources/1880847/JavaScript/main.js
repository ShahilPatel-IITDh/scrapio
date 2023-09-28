/**
* isMobile
* themesflatSearch
* responsiveMenu
* detectViewport
* blog_slider
* portfolioLoadMore
* portfolioSingle
* blogLoadMore
* goTop
* removePreloader
*/

;(function($) {

    'use strict'

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    }; 

    var headerFixed = function() { 
        if ( $('body').hasClass('header_sticky') ) {
            var top_height = $('.themesflat-top').height(),
            hd_height = $('#header').height(),             
            injectSpace = $('<div />', { height: hd_height }).insertAfter($('#header'));   
            injectSpace.hide(); 
            $(window).on('load scroll resize', function() { 
                var header = $("#header");
                var offset = 0;
                if (typeof(header.data('offset')) != 'undefined') {
                    offset = header.data('offset');
                }
                var $top = $(window).scrollTop() + header.height() + header.position().top + offset;
                if (typeof($('#wpadminbar')) != 'undefined' && matchMedia( 'only screen and (min-width: 601px)' ).matches) {
                        $('.header.header-sticky').css('top',$('#wpadminbar').height());
                }
                else {
                        $('.header.header-sticky').css('top',0);
                }
                if ( $(window).scrollTop() >= top_height + hd_height + 20 ) { 
                    header.addClass('header-sticky');
                    injectSpace.show();
                } else {  
                    header.removeClass('header-sticky'); 
                    injectSpace.hide();
                } 
            })

        }      
    }   

    var themesflatSearch = function () {
       $(document).on('click', function(e) {   
            var clickID = e.target.id;   
            if ( ( clickID != 's' ) ) {
                $('.top-search').removeClass('show');   
                $('.show-search').removeClass('active');             
            } 
        });

        $('.show-search').on('click', function(event){
            event.stopPropagation();
        });

        $('.search-form').on('click', function(event){
            event.stopPropagation();
        });        

        $('.show-search').on('click', function (e) {           
            if( !$( this ).hasClass( "active" ) )
                $( this ).addClass( 'active' );
            else
                $( this ).removeClass( 'active' );
             e.preventDefault();

            if( !$('.top-search' ).hasClass( "show" ) )
                $( '.top-search' ).addClass( 'show' );
            else
                $( '.top-search' ).removeClass( 'show' );
        });
    }  

    var responsiveMenu = function() {
        var menuType = 'desktop';

        $(window).on('load resize', function() {
            var currMenuType = 'desktop';

            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {
                currMenuType = 'mobile';
            }

            if ( currMenuType !== menuType ) {
                menuType = currMenuType;

                if ( currMenuType === 'mobile' ) {
                    var $mobileMenu = $('#mainnav').attr('id', 'mainnav-mobi').hide();
                    var hasChildMenu = $('#mainnav-mobi').find('li:has(ul)');

                    $('#header .nav').after($mobileMenu);
                    hasChildMenu.children('ul').hide();
                    if (hasChildMenu.find(">span").length == 0) {
                        hasChildMenu.children('a').after('<span class="btn-submenu"></span>');
                    }
                    $('.btn-menu').removeClass('active');
                } else {
                    var $desktopMenu = $('#mainnav-mobi').attr('id', 'mainnav').removeAttr('style');
                    $desktopMenu.find('.sub-menu').removeAttr('style');
                    $('#header').find('.nav-wrap').append($desktopMenu);
              
                }
            }
        });

        $('.btn-menu').on('click', function() {  
            var header = $("#header");
            var offset = 0;
            if (typeof(header.data('offset')) != 'undefined') {
                offset = header.data('offset');
            }
        
            var $top = $(window).scrollTop() + header.height() + header.position().top + offset;
            $('#mainnav-mobi').slideToggle(300);
            $(this).toggleClass('active');
        });

        $(document).on('click', '#mainnav-mobi li .btn-submenu', function(e) {
            $(this).toggleClass('active').next('ul').slideToggle(300);
            e.stopImmediatePropagation()
        });
    }  

    var detectViewport = function() {
        $('[data-waypoint-active="yes"]').waypoint(function() {
            $(this).trigger('on-appear');
        }, { offset: '90%', triggerOnce: true });
    };   

    var blog_slider = function() { 
        if ( $().flexslider ) { 
            $('.featured-post.blog-slider').flexslider({
                animation      :  "slide",
                direction      :  "horizontal", // vertical
                pauseOnHover   :  true,
                useCSS         :  false,
                animationLoop  :  false,
                easing         :  "swing",
                animationSpeed :  500,
                slideshowSpeed :  5000,
                controlNav     :  false,
                directionNav   :  true,
                slideshow      :  true,
                prevText       :  '<i class="fa fa-angle-left"></i>',
                nextText       :  '<i class="fa fa-angle-right"></i>',
                smoothHeight   :  true
                }); // flexslider            
        }
    };     

    var portfolioLoadMore = function() {       
        var $container = $('.portfolio-container') 
        var $nav = ".navigation.portfolio.loadmore a";
        $($nav).on('click', function(e) {
            e.preventDefault();  
            $('<span/>', {
                class: 'infscr-loading',
                text: 'Loading...',
            }).appendTo($container);

            $.ajax({
                type: "GET",
                url: $(this).attr('href'),
                dataType: "html",
                success: function( out ) {
                    var result = $(out).find('.portfolio-container .item');                        
                    var nextlink = $(out).find($nav).attr('href');
                    result.css({ opacity: 0 });                        
                    $container.append(result).imagesLoaded(function () {
                        result.css({ opacity: 1 });
                        $container.isotope('appended', result);
                    });
                    if ( nextlink != undefined && result != undefined) {
                        $($nav).attr('href', nextlink);
                        $container.find('.infscr-loading').remove();
                    } else {
                        $container.find('.infscr-loading').addClass('no-ajax').text('All posts loaded.').delay(2000).queue(function() {$(this).remove();});
                        $($nav).remove();
                    }
                },
                error: function() {
                   $container.find('.infscr-loading').addClass('no-ajax').text('All posts loaded.').delay(2000).queue(function() {$(this).remove();});
                   $($nav).remove();
               }
           })
        })        
    }

    var portfolioSingle = function() {
        $('.themesflat-portfolio-single-slider').each(function(){
            $(this).children('#themesflat-portfolio-carousel').flexslider({
                   animation: "slide",
                controlNav: false,
                directionNav: true,
                animationLoop: false,
                slideshow: true,
                itemWidth: 277,                
                itemMargin: 30,
                asNavFor: $(this).children('#themesflat-portfolio-flexslider'),
                prevText: '<i class="fa fa-angle-left"></i>',
                nextText: '<i class="fa fa-angle-right"></i>'
            });
            $(this).children('#themesflat-portfolio-flexslider').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: true,
                slideshow: true,                
                sync: $(this).children('#themesflat-portfolio-carousel'),
                prevText: '<i class="fa fa-angle-left"></i>',
                nextText: '<i class="fa fa-angle-right"></i>'
            });
        });
    }; 

    var blogLoadMore = function() { 
        var $container = $('.post-wrap'),
        $container_faq = $('.themesflat-faq-shortcodes');
        if ( $('body').hasClass('page-template') ) {
            var $container = $('.blog-shortcode');
        }   

        $('.navigation.loadmore a').on('click', function(e) {
            e.preventDefault(); 
            var $item = 'article';
            if ($(this).parents('nav').hasClass("faq")) {
                $container = $container_faq;
                $item = '.item';
            }

            $('<span/>', {
                class: 'infscr-loading',
                text: 'Loading...',
            }).appendTo($container);

            $.ajax({
                type: "GET",
                url: $(this).attr('href'),
                dataType: "html",
                success: function( out ) {
                    var result = $(out).find($item);  
                    var nextlink = $(out).find('.navigation.loadmore a').attr('href');

                    result.css({ opacity: 0 });
                    if ($container.hasClass('masonry')) {
                        $container.append(result).imagesLoaded(function () {
                            result.css({ opacity: 1 });
                            $container.isotope('appended', result);
                        });
                    }
                    else {
                        result.css({ opacity: 1 });
                        $container.append(result);
                    }

                    if ( nextlink != undefined ) {
                        $('.navigation.loadmore a').attr('href', nextlink);
                        $container.find('.infscr-loading').remove();
                    } else {
                        $container.find('.infscr-loading').addClass('no-ajax').text('All posts loaded.').delay(2000).queue(function() {$(this).remove();});
                        $('.navigation.loadmore a').remove();
                    }
                }
            })
        })       
    }  

    var testimonialsServices = function() {
        $('.testimonials-sidebar').each(function() {             
            if ( $().owlCarousel ) {                
                $('.testimonial03').owlCarousel({
                    loop: true,
                    margin: 0,
                    nav: false, 
                    dots: true,                   
                    autoplay: false,                        
                    responsive:{
                        0:{
                            items: 1
                        },                                              
                        480:{
                            items: 1
                        }, 
                        767:{
                            items: 1
                        },
                        991:{
                            items: 1
                        },
                        1200: {
                            items: 1
                        }
                    }
                });
            }
        });
    };  

    var goTop = function() {
        $(window).scroll(function() {
            if ( $(this).scrollTop() > 800 ) {
                $('.go-top').addClass('show');
            } else {
                $('.go-top').removeClass('show');
            }
        }); 

        $('.go-top').on('click', function() {            
            $("html, body").animate({ scrollTop: 0 }, 1000 , 'easeInOutExpo');
            return false;
        });
    };

    var logo = function() {
        // Elements to inject
        var mySVGsToInject = document.querySelectorAll('img.logo_svg');

        // Trigger the injection
        SVGInjector(mySVGsToInject, {
            pngFallback: 'assets/png'
        });
    }

// Retina Logos
var retinaLogos = function() {
    var retina = window.devicePixelRatio > 1 ? true : false;
    var img_retina = $('.logo .site-logo').data('retina');       
    if( retina ) {
        $('#logo').find('img').attr({src:img_retina,width:'175',height:'50'});           
    }
};

var removePreloader = function() {        
    $('.preloader').css('opacity', 0);
    setTimeout(function() {
        $('.preloader').hide(); }, 1000           
        );   
};


// Dom Ready
$(function() {
    responsiveMenu(); 
    headerFixed();
    blog_slider();    
    goTop(); 
    logo();  
    blogLoadMore();
    portfolioLoadMore();
    portfolioSingle();  
    themesflatSearch();  
    detectViewport(); 
    testimonialsServices(); 
    retinaLogos();
    removePreloader(); 
});
})(jQuery);