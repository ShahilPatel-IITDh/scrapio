(function($) {
    window.COWIDGETS_Global = {
        _loadedDependencies: [],
        _inQueue: {}
    };

    COWIDGETS_Global.animation = function(el, force, callback) {
        if (!window.ce_waypoint_animation) {
            window.ce_waypoint_animation = function(el, force, callback) {

                var notEl = (el == null) ? true : false;

                if (el == null)
                    el = $('.ce-animation:not(.ce-animation-start)');
                else
                    el = el.find('.ce-animation:not(.ce-animation-start)').andSelf();

           
                $.each(el, function(index, val) {
                    var run = true;

                    if ($(val).hasClass('ce-animation-manual'))
                        run = false;

                    if (force)
                        run = true;
                    if (run) {


                        new Waypoint({
                            element: val,
                            handler: function() {
                                var element = $(this.element),
                                    index = element.index(),
                                    delayAttr = element.attr('data-delay');

                                if (delayAttr == undefined) delayAttr = 0;
                                setTimeout(function() {
                                    element.addClass('ce-animation-start');

                                    if (typeof callback == 'function')
                                        callback();

                                }, delayAttr);
                                this.destroy();
                            },
                            offset: '90%'
                        });


                    }
                });
            }
        }
        setTimeout(function() {
            window.ce_waypoint_animation(el, force, callback);
        }, 1);
    };

    COWIDGETS_Global.loadDependencies = function( dependencies, callback ) {
        "use strict";

        var _callback = callback || function() {};
        if ( !dependencies )
            return void _callback();

        var newDeps = dependencies.map( function( dep ) {
            return -1 === COWIDGETS_Global._loadedDependencies.indexOf( dep ) ? "undefined" == typeof COWIDGETS_Global._inQueue[ dep ] ? dep : ( COWIDGETS_Global._inQueue[ dep ].push( _callback ), !0 ) : !1
        } );

        if ( newDeps[ 0 ] !== !0 ) {
            if ( newDeps[ 0 ] === !1 )
                return void _callback();
            var queue = newDeps.map( function( script ) {
                COWIDGETS_Global._inQueue[ script ] = [ _callback ];
                return $.getCachedScript( script );
            } );

            var onLoad = function() {
                newDeps.map( function( loaded ) {
                    COWIDGETS_Global._inQueue[ loaded ].forEach( function( callback ) {
                        callback()
                    } );
                    delete COWIDGETS_Global._inQueue[ loaded ];
                    COWIDGETS_Global._loadedDependencies.push( loaded )
                } );
            };

            $.when.apply( null, queue ).done( onLoad )
        }
    };

    $.getCachedScript = function( url, callback ) {
        "use strict";

        url = url.replace( /.*?:\/\//g, "" );

        if ( location.protocol === 'https:' )
            url = 'https://' + url;
        else
            url = 'http://' + url;

        var options = {
            dataType: "script",
            cache: false,
            url: url
        };

        return $.ajax( options ).done( callback );
    };

    COWIDGETS_Global.horizontalScroll = function(){
        const elementor_page = document.querySelector( '.elementor[data-elementor-type="wp-page"]' );
        
        if( (elementor_page && elementor_page.classList.contains( 'elementor-edit-area' )) || !elementor_page )
            return;

        let container = elementor_page.parentElement;
        if( container )
            container.classList.add('swiper-container');
        else
            return;

        let wrapper = elementor_page;
        wrapper.classList.add('swiper-wrapper');
        
        for (let i = 0; i < wrapper.children.length; i++) {
            wrapper.children[i].classList.add('swiper-slide');
        }
      
        var mySwiper = new Swiper(container, {
            speed: 400,
            freeMode: true,
            mousewheel: true,
            loop:false,
            
            on:{
                slideChange: function(){
                    if( 1 == 1 ){
                        const active = this.activeIndex;
                        const active_link = document.querySelector('header#masthead .ce-menu-item[href="#'+wrapper.children[active].id +'"]');
                        if(active_link)
                            active_link.focus();
                    }
                }
            }
        });



        if( 1 == 1){
            document.querySelectorAll('header#masthead .ce-menu-item').forEach(function(item){
                item.addEventListener( 'click', function(){
                    var sect = document.getElementById(item.href.split('#')[1]);
                    mySwiper.slideTo(Array.from(wrapper.children).indexOf(sect));
                } );

                
            });
            const active = document.querySelector('header#masthead .ce-menu-item[href="#'+wrapper.children[0].id +'"]');
            if(active)
                active.focus();
        }

        const scroll_text = document.createElement( 'DIV' );
        scroll_text.classList.add( 'ce-horizontal-scroll-text' );
        scroll_text.innerHTML = '<span>SCROLL OR DRAG</span><svg width="43" height="44" viewBox="0 0 43 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.625 19.375V24.625H32.625L18 39.375L21.75 43.125L42.875 22L21.75 0.875L18 4.625L32.625 19.375H0.625Z" fill="black"/></svg>';
        elementor_page.appendChild(scroll_text);
        
    }

    $(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction( 'frontend/element_ready/global', function( $scope, $ ){
            COWIDGETS_Global.animation( $scope );
            
        } );
        if( document.body.classList.contains( 'ce-horizontal-scroll-page' ) ){
            if( window.matchMedia( "( min-width: 992px )" ).matches )
                COWIDGETS_Global.horizontalScroll();
        }
            
    });

})(jQuery);