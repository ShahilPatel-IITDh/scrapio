var $app = function() {
    "use strict";
    
    function partial( parameters ) {
        var meta = jQuery( "[ic-partial-load]" );
        meta.attr({
            "ic-get-from": parameters.url,
            "ic-src": parameters.url
        });
        if ( typeof parameters.target !== undefined ) {
            meta.attr({
                "ic-select-from-response": parameters.target,
                "ic-target": parameters.target
            });
        }
        meta.trigger( "jquery.partial" );
    }
    
    /// Loads via IntercoolerJS an URL, returning the HTML to specified CSS selector.
    /// @input: { url: "http://www.google.com", target: "#content" }
	
	

    $app.partial = function( parameters ) {
        var links = "a[href^='" + $globals.url + "']";
        jQuery( document ).off( "click", links ).on( "click", links, function( e ) {
            e.preventDefault();
            partial({
                url: jQuery( this ).attr( "href" )
            });
        });
    };
    
    /// Adds the Google Tag Manager script to the website ( Check theme options under WP for GTM code ).
    /// @input: -
    
    $app.gtm = function() {
        if ( $globals.google_tag_manager !== "" ) {
            /*
            if ( typeof dataLayer !== "undefined" ) {
                ga = gaData = gaGlobal = gaplugins = google_tag_manager = dataLayer = null;
            }
            */
            ( function( w, d, s, l, i ) {
                w[ l ] = w[ l ] || [];
                w[ l ].push({
                    "gtm.start": new Date().getTime(),
                    event: "gtm.js"
                });
                var f = d.getElementsByTagName( s )[ 0 ], j = d.createElement( s ), dl = l != "dataLayer" ? "&l=" + l : "";
                j.async = true;
                j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
                f.parentNode.insertBefore( j, f );
            })(
                window,
                document,
                "script",
                "dataLayer",
                $globals.google_tag_manager
            );
        }
    };
    
    /// Initializes the LazyLoad library.
    /// @input: -
    
    $app.lazyload = function() {
        require([ "lazyload" ], function( LazyLoad ) {
            var images = new LazyLoad({
                elements_selector: ".lazy"
            });
            var backgrounds = new LazyLoad({
                elements_selector: ".lazy-background"
            });
        });
    };
    
    /// Transforms the Banesco titles to have emphasized first letters.
    /// @input: -
    /// @status: Was replaced by a vanilla script added on footer.php
    
    /* Disabled: $app.emphasize = function( string ) {
        jQuery( ".emphasize" ).each( function() {
            jQuery( this ).html(
                jQuery( this ).html().replace( /([A-Z])/g, "<em>$1</em>" )
            );
        });
    }; */
    
    /// Coordinates the popup alerts.
    /// @input: -
    
    $app.alert = function( url, text, is_fancybox ) {
        var e = jQuery( "div#alert" ), clone = e.get( 0 ).cloneNode( true );
        e.replaceWith( clone );
        setTimeout( function() {
            var e = jQuery( "div#alert" );
            if ( is_fancybox === false ) {
                if ( e.hasClass( "visible" ) === false ) {
                    e.find( "p.message" ).html( text );
                    e.find( "a[data-action='ok']" ).removeClass( "as-popup-video" ).attr({
                        "href": url
                    });
                    e.addClass( "visible" );
                }
            }
            else {
                if ( e.hasClass( "visible" ) === false ) {
                    e.find( "p.message" ).html( text );
                    e.find( "a[data-action='ok']" ).addClass( "as-popup-video" ).attr({
                        "href": url
                    }).removeAttr( "target" ).prop( "target", null );
                    e.addClass( "visible" );
                    $app.fancybox();
                }
            }
        }, 100 );
    };
    
    function fix_external_links() {
        jQuery( "a" ).filter( "[href^='http'], [href^='//']" ).not( "[class*=ignore-external]" ).not( "[class*=as-popup]" ).not( "[href*='" + window.location.host + "']" ).each( function() {
            if ( ( jQuery( this ).hasClass( "external" ) === false || jQuery( this ).parents().hasClass( "external" ) ) && ( jQuery( this ).hasClass( "external-fancybox" ) === false || jQuery( this ).parents().hasClass( "external-fancybox" ) ) ) {
                jQuery( this ).attr({
                    "target": "_blank",
                    "rel": "noopener noreferrer",
                    "data-message": ( this.hostname || this.pathname )
                }).addClass( "external" );
            }
        });
    }
    
    function delete_accessibility_cookies() {
        var cookies = document.cookie.split( /=[^;]*(?:;\s*|$)/ );
        for ( var i = 0; i < cookies.length; i++ ) {
            if ( /^_FB_/.test( cookies[ i ] ) ) {
                document.cookie = cookies[ i ] + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            }
        }
    }
    
    function go_to_links() {
        var label = "go-to";
        
        jQuery( "a[class*=" + label + "]" ).each( function() {
            var classes = jQuery( this ).get( 0 ).className.split(/\s+/);
            for ( var i = 0; i < classes.length; i++ ) {
                if ( classes[ i ].startsWith( label + ":" ) === true ) {
                    jQuery( this ).attr({
                        "href": jQuery( this ).attr( "href" ) + classes[ i ].substring( label.length + 1 )
                    });
                }
            }
        });
    }
    
    function fix_fees_links() {
        jQuery( "a" ).filter( "[href*='" + $globals.en_fees + "'], [href*='" + $globals.es_fees + "']" ).each( function() {
            jQuery( this ).attr({
                "target": "_blank",
                "href": ( $globals.language === "es-ES" ) ? $globals.es_fees_pdf : $globals.en_fees_pdf
            });
        });
    }
    
    function smooth_scroll() {
        jQuery( document ).off( "click", "[data-scroll-to]" ).on( "click", "[data-scroll-to]", function( e ) {
            e.preventDefault();
            var element = jQuery( this ).attr( "data-scroll-to" );
            jQuery( "html, body" ).animate({
                scrollTop: jQuery( element ).offset().top
            }, 1000 );
        });
    }
    
    function scroll_to_hash() {
        if ( window.location.hash !== "" ) {
            var element = jQuery( ( window.location.hash ).replace( "#", "." ) );
            if ( element.length > 0 ) {
                jQuery( "html, body" ).animate({
                    scrollTop: jQuery( element ).offset().top
                }, 1000 );
            }
        }
    }
    
    function flip_slide() {
        var trigger = "[data-flip]";
        
        if ( jQuery( trigger ).length > 0 ) {
            jQuery( document ).off( "click", trigger ).on( "click", trigger, function( e ) {
                e.preventDefault();
                var p = jQuery( this ).closest( "div.responsive" );
                p[ ( p.hasClass( "is-flipped" ) === false ) ? "addClass" : "removeClass" ]( "is-flipped" );
            });
        }
    }
    
    /// Configures the popup alerts.
    
    var alerts = function() {
        var bank = [
            "https://banesco.com.do/",
            "http://www.banesco.com/",
            "https://banesco.com.co/",
            "https://banesco.com.pa/",
            "https://www.abanca.com/es/"
        ];
        
        function action( type ) {
            return "div#alert [data-action='" + type + "']";
        }
        
        jQuery( document ).off( "click", action( "ok" ) ).on( "click", action( "ok" ), function() {
            jQuery( "div#alert" ).removeClass( "visible" );
        });
        
        jQuery( document ).off( "click", action( "cancel" ) ).on( "click", action( "cancel" ), function( e ) {
            e.preventDefault();
            jQuery( "div#alert" ).removeClass( "visible" );
        });
        
        jQuery( document ).off( "click", ".external > a, .external" ).on( "click", ".external > a, .external", function( e ) {
            e.preventDefault();
            $app.alert(
                jQuery( this ).attr( "href" ),
                ( bank.indexOf( jQuery( this ).attr( "href" ) ) !== -1 ) ?
                    $globals.alert_without_message :
                    $globals.alert_with_message.replace( new RegExp( /\#\#\#\#\#/, "g" ), jQuery( this ).attr( "data-message" ) ),
                false
            );
        });
        
        jQuery( document ).off( "click", ".external-fancybox > a, .external-fancybox" ).on( "click", ".external-fancybox > a, .external-fancybox", function( e ) {
            e.preventDefault();
            $app.alert(
                jQuery( this ).attr( "href" ),
                $globals.alert_with_message.replace( new RegExp( /\#\#\#\#\#/, "g" ), jQuery( this ).attr( "data-message" ) ),
                true
            );
        });
        
        
        //new devv
        jQuery( document ).off( "click", ".alternative-external > a, .alternative-external" ).on( "click", ".alternative-external > a, .alternative-external", function( e ) {
            e.preventDefault();
            $app.alert(
                jQuery( this ).attr( "href" ),
                ( bank.indexOf( jQuery( this ).attr( "href" ) ) !== -1 ) ?
                    $globals.alert_without_message :
                    $globals.alternative_alert_with_message.replace( new RegExp( /\#\#\#\#\#/, "g" ), jQuery( this ).attr( "alternative-data-message" ) || "" ),
                false
            );
        });
        
        jQuery( document ).off( "click", ".alternative-external-fancybox > a, .alternative-external-fancybox" ).on( "click", ".alternative-external-fancybox > a, .alternative-external-fancybox", function( e ) {
            e.preventDefault();
            $app.alert(
                jQuery( this ).attr( "href" ),
                $globals.alternative_alert_with_message.replace( new RegExp( /\#\#\#\#\#/, "g" ), jQuery( this ).attr( "alternative-data-message" ) || "" ),
                true
            );
        });
        //new devv
        fix_external_links();
    };
    
    /// Initializes the fixed header on Banesco USA website.
    /// @input: -
    
    $app.header = function() {
        require([ "headroom" ], function( Headroom ) {
            if ( jQuery( "header" ).length > 0 ) {
                var h  = new Headroom( jQuery( "header" ).get( 0 ), {
                    offset: jQuery( "[data-type='top-bar']" ).outerHeight( true )
                });
                h.init();
            }
        });
    };
    
    $app.fancybox = function() {
        require([ "fancybox" ], function() {
            jQuery( "a.as-popup" ).fancybox({
                toolbar: false,
                smallBtn: true,
                type: "iframe",
                iframe: {
                    preload: true
                }
            });
            jQuery( "a.as-popup-video" ).fancybox({
                toolbar: false,
                smallBtn: true,
                width: 960,
                height: 540,
                youtube: {
                    controls: true,
                    showinfo: true
                }
            });
        });
    };
    
    $app.marquee = function() {
        require([ "marquee" ], function() {
            jQuery( ".marquee" ).marquee({
                duration: 10000,
                pauseOnHover: true,
                gap: 50,
                delayBeforeStart: 0,
                direction: "left",
                duplicated: false
            });
        });
    };
    
    $app.cookieNotice = function() {
        require([ "cookies" ], function() {
            var c = $cookies().get({
                name: "cookie-notice"
            });
            if ( c === "" ) {
                jQuery( "#cookie-notice" ).addClass( "visible" );
            }
            jQuery( "#cookie-notice a.accept" ).off( "click" ).on( "click", function() {
                $cookies().set({
                    name: "cookie-notice",
                    value: "accepted",
                    days: 365,
                    path: "/"
                });
                jQuery( this ).closest( "#cookie-notice" ).removeClass( "visible" );
            });
        });
    };
    
    /// Initializes all the functions required to start the application.
    /// @input: -
    
    $app.initialize = function() {
        $app.lazyload();
        $app.gtm();
        $app.header();
        $app.fancybox();
        $app.marquee();
        $app.cookieNotice();
        alerts();
        // fix_fees_links(); -> Disabled as per #tasks/17011805
        smooth_scroll();
        scroll_to_hash();
        flip_slide();
        go_to_links();
        $contact_form().run();
        // $app.emphasize();
        // Stops survey from appearing? delete_accessibility_cookies();
    };
    
    /// Reinitializes all the functions required to start the application.
    /// @input: -
    
    $app.reinitialize = function() {
        $app.lazyload();
        // $app.emphasize();
    };
    
    return $app;
    
};

jQuery.fn.size = function() {
    return jQuery( this[ 0 ] ).length;
};

/* Kickstart application - Check header.php for RequireJS defines and dependencies. */

require([ "jquery", "slick", "contact-form" ], function() {
    jQuery( document ).ready( function() {
        $app().initialize();
    });
});

/* 3D slider */

jQuery(document).ready(function(){
    jQuery('.show-closest-slider').on('click', function(){
       jQuery(this).closest('.slide-up-down').toggleClass('visible');
    });
    jQuery('.three-col-txt').each(function(){
        var after=385;
        var html = jQuery(this).html();
        html = html.substring(0, after) + "<span class='initial-text'>" + html.substring(after)+"</span>";
        jQuery(this).html(html);
    });
});
