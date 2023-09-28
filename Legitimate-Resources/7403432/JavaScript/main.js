/*
 
 Template Name: Geobin
 Author: Themewinter
 Author URI: https://themeforest.net/user/themewinter
 Description: Geobin
 Version: 1.3
 
 1. Menu Active link
 2. Drop down Menu
 3. Main Slideshow
 4. Testimonial Slider
 5. Testimonial Slider
 6. Testimonial Box Carousel
 7. Counter Up
 8. Clients Carousel
 9. Back to top
 10. video Popup
 11. Our Mission Carousel
 12. Map
 13. Contact Form
 14. Service List Box Slider
 15. On Hover Timeline Active Changed
 16. On Click search bar
 17. Onclick off canvas menu visible
 18. Accordion
 
 
 */

jQuery( document ).ready( function ( $ ) {
    "use strict";

    //Window Load Function
    $( window ).on( 'load', function () {
        // checkScreenSize();
        menuFixed();

        if ( $( '.menu-indicator' ).length === 0 ) {
            menuIcon();
        }
    } );

    if ( $( '.mega-menu .sub-menu' ).hasClass( 'dropdown-menu' ) ) {
        $( '.mega-menu .sub-menu' ).removeClass( 'dropdown-menu' );
    }

    /* ----------------------------------------------------------- */
    /*  Mobile Menu
     /* ----------------------------------------------------------- */

    $( ".xs-dopdown-item a" ).on( "click", function () {
        $( this ).parent( "li" ).find( ".dropdown-menu" ).slideToggle();
        // $(this).find("i").toggleClass("fa-angle-down fa-angle-up");
    } );


    $( window ).on( 'load', function () {
        $( '.xs_mobile_menu_class .menu-item-has-children .dropdown-menu .menu-item-has-children .dropdown-menu' ).css( 'display', 'block' );
    } );
    $( window ).on( 'load', function () {
        $( '.xs_menu_class .menu-item-has-children .dropdown-menu .menu-item-has-children .dropdown-menu' ).css( 'display', 'block' );
    } );

    /* Testimonial Slider */
    if ( $( ".testimonial-slider" ).length > 0 ) {
        $( ".testimonial-slider" ).owlCarousel( {
            items: 1,
            loop: true,
            autoplay: true,
            nav: false,
            dots: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            mouseDrag: true,
            smartSpeed: 900,
            responsive: {
                0: {
                    mouseDrag: false,
                },
                600: {
                    mouseDrag: false,
                },
                1000: {
                    mouseDrag: false,
                },
            },
        } );
    }
    ;

    /* Counter UP */
    if ( $( '.counter' ).length > 0 ) {
        $( ".counter" ).counterUp( {
            delay: 10,
            time: 2000
        } );
    }

    $( window ).on( 'load', function () {
        var menu = $( '#navbarSupportedContent.xs_menu_class #main-menu .menu-item-has-children .sub-menu,#navbarSupportedContent.xs_mobile_menu_class #main-menu .menu-item-has-children .sub-menu' );
        var wWidth = $( window ).width();
        if ( wWidth < 991 ) {
            if ( !menu.hasClass( 'dropdown-menu' ) ) {
            menu.addClass('dropdown-menu')
            }
        }
        if ( !menu.hasClass( 'xs-dopdown-item dropdown' ) ) {
            menu.addClass( 'xs-dopdown-item dropdown' )
        }
    } );

    /* Back to top */
    $( window ).scroll( function () {
        if ( $( this ).scrollTop() ) {
            $( '.back-to-top button' ).fadeIn();
        } else {
            $( '.back-to-top button' ).fadeOut();
        }
    } );
    $( ".back-to-top button" ).on( 'click', function () {
        $( "html, body" ).animate( {
            scrollTop: 0
        }, 1000 );
    } );

    /* Video Popup */
    if ( $( '.video-popup' ).length > 0 ) {
        $( '.video-popup' ).magnificPopup( {
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        } );
    }
    

    /* On Hover Timeline Active Changed */
    $( ".timeline-wrapper .row" ).on( 'hover', function () {
        $( ".timeline-item" ).find( ".timeline-badge" ).removeClass( "active" );
        $( this ).find( ".timeline-badge" ).addClass( "active" );
    } );
    $( ".timeline-wrapper .row" ).on( 'hover', function () {
        $( ".timeline-item" ).find( ".timeline-date" ).removeClass( "active" );
        $( this ).find( ".timeline-date" ).addClass( "active" );
    } );

    /* On Click search bar */
    $( ".tw-search i, .tw-offcanvas-menu i" ).on( 'click', function () {
        $( ".search-bar" ).addClass( 'active' );
    } );
    $( ".search-bar i.icon-cross" ).on( 'click', function () {
        $( ".search-bar" ).removeClass( 'active' );
    } );

    /* Onclick offcanvas menu visible */
    $( ".tw-menu-bar" ).on( "click", function () {
        $( ".offcanvas-wrapper" ).addClass( 'active' );
        $( ".offcanvas-menu-overlay" ).addClass( 'menu-show' );
    } );
    $( ".menu-close-btn, .offcanvas-menu-overlay" ).on( "click", function () {
        $( ".offcanvas-wrapper" ).removeClass( 'active' );
        $( ".offcanvas-menu-overlay" ).removeClass( 'menu-show' );
    } );

    /* Accordion */
    function toggleIcon( e ) {
        $( e.target )
            .prev( '.card-header' )
            .find( ".faq-indicator" )
            .toggleClass( 'fa-minus fa-plus' );
    }
    $( '#accordion' ).on( 'hidden.bs.collapse', toggleIcon );
    $( '#accordion' ).on( 'shown.bs.collapse', toggleIcon );

    /* Navbar fixed */

    function menuFixed() {
        var wWidth = $( window ).width();
        if ( wWidth > 974 ) {
            $( window ).on( 'scroll', function () {
                if ( $( window ).scrollTop() > 400 ) {
                    $( '.tw-head, .tw-header' ).addClass( 'navbar-fixed' );
                } else {
                    $( '.tw-head, .tw-header' ).removeClass( 'navbar-fixed' );
                }
                if ( $( window ).scrollTop() < 400 ) {
                    setTimeout( () => {
                        $( 'header' ).removeClass( 'off-canvas' );
                    }, 0 );
                } else {
                    setTimeout( () => {
                        $( 'header' ).addClass( 'off-canvas' );
                    }, 0 );
                }
            } );
        }
    }
    function menuIcon() {
        if ( $( window ).width() < 991 ) {
            $( '.main-menu .menu-item-has-children > a' ).after( '<span class="fa fa-angle-down menu-indicator"></span>' )
        } else {
            $( '.menu-indicator' ).remove();
        }
        $( '.xs_mobile_menu_class .menu-item-has-children .menu-indicator' ).on( 'click', function () {
            $( this ).parent().children().next().closest( '.dropdown-menu' ).slideToggle();
        } );
        $( '.xs_menu_class #main-menu .menu-item-has-children .menu-indicator' ).on( 'click', function () {
            $( this ).parent().children().next().closest( '.dropdown-menu' ).slideToggle();
        } );
    }
    $( document ).on( 'scroll', function () {
        menuFixed();
    } );

    $( window ).on( 'resize', function () {
        if ( $( '.menu-indicator' ).length === 0 ) {
            menuIcon();
        }
    } );

    // hero area animation
    // $('.hero-banner-animation').mousemove(function(event){
    //     var moveX = (($(window).width() / 20) - event.pageX) * 0.03;
    //     var moveY = (($(window).height() / 10) - event.pageY) * 0.01;
       
    //     $('.hero-banner-animation .elementor-background-overlay').css('left', -moveX + 'px');
    //     $('.hero-banner-animation .elementor-background-overlay').css('top', -moveY + 'px');
    //    });

} );