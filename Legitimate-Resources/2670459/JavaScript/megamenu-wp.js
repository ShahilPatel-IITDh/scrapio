/*!
 * hoverIntent v1.8.1 // 2014.08.11 // jQuery v1.9.1+
 * http://briancherne.github.io/jquery-hoverIntent/
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2014 Brian Cherne
 */

/* hoverIntent is similar to jQuery's built-in "hover" method except that
 * instead of firing the handlerIn function immediately, hoverIntent checks
 * to see if the user's mouse has slowed down (beneath the sensitivity
 * threshold) before firing the event. The handlerOut function is only
 * called after a matching handlerIn.
 *
 * // basic usage ... just like .hover()
 * .hoverIntent( handlerIn, handlerOut )
 * .hoverIntent( handlerInOut )
 *
 * // basic usage ... with event delegation!
 * .hoverIntent( handlerIn, handlerOut, selector )
 * .hoverIntent( handlerInOut, selector )
 *
 * // using a basic configuration object
 * .hoverIntent( config )
 *
 * @param  handlerIn   function OR configuration object
 * @param  handlerOut  function OR selector for delegation OR undefined
 * @param  selector    selector OR undefined
 * @author Brian Cherne <brian(at)cherne(dot)net>
 */

;(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (jQuery && !jQuery.fn.hoverIntent) {
        factory(jQuery);
    }
})(function($) {
    'use strict';

    // default configuration values
    var _cfg = {
        interval: 100,
        sensitivity: 6,
        timeout: 0
    };

    // counter used to generate an ID for each instance
    var INSTANCE_COUNT = 0;

    // current X and Y position of mouse, updated during mousemove tracking (shared across instances)
    var cX, cY;

    // saves the current pointer position coordinates based on the given mousemove event
    var track = function(ev) {
        cX = ev.pageX;
        cY = ev.pageY;
    };

    // compares current and previous mouse positions
    var compare = function(ev,$el,s,cfg) {
        // compare mouse positions to see if pointer has slowed enough to trigger `over` function
        if ( Math.sqrt( (s.pX-cX)*(s.pX-cX) + (s.pY-cY)*(s.pY-cY) ) < cfg.sensitivity ) {
            $el.off(s.event,track);
            delete s.timeoutId;
            // set hoverIntent state as active for this element (permits `out` handler to trigger)
            s.isActive = true;
            // overwrite old mouseenter event coordinates with most recent pointer position
            ev.pageX = cX; ev.pageY = cY;
            // clear coordinate data from state object
            delete s.pX; delete s.pY;
            return cfg.over.apply($el[0],[ev]);
        } else {
            // set previous coordinates for next comparison
            s.pX = cX; s.pY = cY;
            // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
            s.timeoutId = setTimeout( function(){compare(ev, $el, s, cfg);} , cfg.interval );
        }
    };

    // triggers given `out` function at configured `timeout` after a mouseleave and clears state
    var delay = function(ev,$el,s,out) {
        delete $el.data('hoverIntent')[s.id];
        return out.apply($el[0],[ev]);
    };

    $.fn.hoverIntent = function(handlerIn,handlerOut,selector) {
        // instance ID, used as a key to store and retrieve state information on an element
        var instanceId = INSTANCE_COUNT++;

        // extend the default configuration and parse parameters
        var cfg = $.extend({}, _cfg);
        if ( $.isPlainObject(handlerIn) ) {
            cfg = $.extend(cfg, handlerIn);
            if ( !$.isFunction(cfg.out) ) {
                cfg.out = cfg.over;
            }
        } else if ( $.isFunction(handlerOut) ) {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerOut, selector: selector } );
        } else {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerIn, selector: handlerOut } );
        }

        // A private function for handling mouse 'hovering'
        var handleHover = function(e) {
            // cloned event to pass to handlers (copy required for event object to be passed in IE)
            var ev = $.extend({},e);

            // the current target of the mouse event, wrapped in a jQuery object
            var $el = $(this);

            // read hoverIntent data from element (or initialize if not present)
            var hoverIntentData = $el.data('hoverIntent');
            if (!hoverIntentData) { $el.data('hoverIntent', (hoverIntentData = {})); }

            // read per-instance state from element (or initialize if not present)
            var state = hoverIntentData[instanceId];
            if (!state) { hoverIntentData[instanceId] = state = { id: instanceId }; }

            // state properties:
            // id = instance ID, used to clean up data
            // timeoutId = timeout ID, reused for tracking mouse position and delaying "out" handler
            // isActive = plugin state, true after `over` is called just until `out` is called
            // pX, pY = previously-measured pointer coordinates, updated at each polling interval
            // event = string representing the namespaced event used for mouse tracking

            // clear any existing timeout
            if (state.timeoutId) { state.timeoutId = clearTimeout(state.timeoutId); }

            // namespaced event used to register and unregister mousemove tracking
            var mousemove = state.event = 'mousemove.hoverIntent.hoverIntent'+instanceId;

            // handle the event, based on its type
            if (e.type === 'mouseenter') {
                // do nothing if already active
                if (state.isActive) { return; }
                // set "previous" X and Y position based on initial entry point
                state.pX = ev.pageX; state.pY = ev.pageY;
                // update "current" X and Y position based on mousemove
                $el.off(mousemove,track).on(mousemove,track);
                // start polling interval (self-calling timeout) to compare mouse coordinates over time
                state.timeoutId = setTimeout( function(){compare(ev,$el,state,cfg);} , cfg.interval );
            } else { // "mouseleave"
                // do nothing if not already active
                if (!state.isActive) { return; }
                // unbind expensive mousemove event
                $el.off(mousemove,track);
                // if hoverIntent state is true, then call the mouseOut function after the specified delay
                state.timeoutId = setTimeout( function(){delay(ev,$el,state,cfg.out);} , cfg.timeout );
            }
        };

        // listen for mouseenter and mouseleave
        return this.on({'mouseenter.hoverIntent':handleHover,'mouseleave.hoverIntent':handleHover}, cfg.selector);
    };
});




jQuery( document ).ready( function( $ ){

   function is_preview_menu_item( id ){
       var c = false;
       if ( self !== top ) {
           try {
               if ( top.wp.customize ) {
                    if ( top.megamenu_live_previewing == id ) {
                        c = true;
                    }
               }
           } catch ( e ) {

           }
       }
       return c;
   }

    var $window = $( window );
    $( 'body > *').wrapAll( '<div id="megamenu-wp-page"></div>' );


    var mobileWidth = 0;
    var isMegaMenuMobile = false;
    if (  MegamenuWp.theme_support ) {
        if ( MegamenuWp.theme_support.mobile_mod ) {
            mobileWidth = parseInt( MegamenuWp.theme_support.mobile_mod );
        }
    }

    if (  0 >= mobileWidth ) {
        mobileWidth = 720;
    }

    function viewPortInit(){
        $( '.mega-tab-posts').removeAttr( 'style' );
        if ( mobileWidth >= $window.width() ) {
            $( 'body').addClass( 'megamenu-wp-mobile').removeClass( 'megamenu-wp-desktop') ;
            isMegaMenuMobile = true;
        } else {
            $( 'body').removeClass( 'megamenu-wp-mobile').addClass( 'megamenu-wp-desktop' ) ;
            isMegaMenuMobile = false;
        }
    }

    $window.resize( function(){
        viewPortInit();
    } );
    viewPortInit();


    function guid() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    function setupMegaLayout( $m ){
        var megaLayout = this;
        this.margin = 0;
        this.position = 'left';
        this.left = 0;
        this.contentWidth = 0;
        this.offset = null;
        this.rightPos = 0;

        // Test
        var parentLevel =  parseInt( MegamenuWp.mega_parent_level );
        var $megaMenu = $m;

        if ( parentLevel > 0 ) {
            var _d = 0;
            while( parentLevel > 0 ) {
                $megaMenu = $megaMenu.parent();
                parentLevel -- ;
                _d ++;
            }
        }

        var id =  $megaMenu.attr( 'id' ) || '';
        if ( ! id ) {
            id = '_mg-'+(  new Date().getTime() );
            $megaMenu.attr( 'id', id );
        } else {

        }

        $megaMenu.addClass( 'megamenu-nav-parent' );
        this.cssId = id;

        if ( $( '#megamenu-css-mega-nav-'+this.cssId).length <= 0 ) {
            $( 'head').append(  '<style id="megamenu-css-mega-nav-'+this.cssId+'" type="text/css"></style>' );
        } else {
            $( '#megamenu-css-mega-nav-'+this.cssId).html( '' );
        }

        this.setupData = function(){
            this._getNavMenuPost();
            var w =  $window.width();
            var megaWidth = 0;

            if ( isNaN( megaWidth ) ) {
                megaWidth = 0;
            }

            if ( megaWidth > w - this.margin * 2 ) {
                megaWidth = w - this.margin * 2;
            } else {
                if ( megaWidth == 0 )
                {
                    megaWidth = w - this.margin * 2;
                }
            }

            if ( megaWidth > w ) {
                megaWidth = w;
            }
            this.contentWidth = megaWidth;
            if ( this.position == 'right' ) {
                this.rightPos = this.navWidth + this.offset.left;
            } else {
                this.rightPos = this.contentWidth + this.offset.left;
            }

            return this.contentWidth ;
        };

        /**
         * Get menu position left, right or full width
         */
        this._getNavMenuPost = function(){
            var w =  $window.width();
            // take a test
            $megaMenu.css( { 'display': 'block', opacity: 0 } );
            this.offset = $megaMenu.offset();
            this.navWidth = $megaMenu.outerWidth();
            var l = Math.round( this.offset.left ) ;
            this.left = this.offset.left;
            var mw = $megaMenu.outerWidth();
            var r = Math.round( w - ( l + mw ) ) ;

            $megaMenu.css( { 'display' : '', opacity: '' } );

            if ( l > r ) {
                this.position = 'right'; //
                this.margin = r;

            } else {
                this.position = 'left';
                this.margin = l;
            }

            return this.position;
        };

        this.setupContentPos = function (){
            this.setupData();

            var cssCode = '';
            $( '#megamenu-css-mega-nav-'+this.cssId ).html( '' );

            if ( $window.width() <= mobileWidth ) {
                return false;
            }

            $megaMenu.find( 'li.mega-item').each( function( index ){
                var li = $( this );
                var liOf = li.offset();
                var l = 0;
                li.css( 'position', '' );
                var pos = li.css( 'position' );
                var tr = 0;
                var itemid = li.attr( 'id' ) || '';
                var ul = $( 'ul.mega-content', li );
                var ulWidth = ul.data( 'width' ) || 0;
                if ( ! itemid ) {
                    itemid = '_item_mg-'+ ( new Date().getTime() ) + guid();
                    li.attr( 'id', itemid );
                }

                if ( is_preview_menu_item( itemid ) ) {
                    li.addClass( 'mega-live-view-item mega-hover mega-animation' );
                }

                var w, ulpos;

                if ( ulWidth > 0 ) {
                    w = ulWidth;
                    if ( w >  megaLayout.contentWidth ) {
                        w = megaLayout.contentWidth;
                    }
                    ulpos = ul.data( 'position' ) || 'left';
                    cssCode += '#megamenu-wp-page #' + id + ' #' + itemid + '{';
                        cssCode += ' position: relative;';
                    cssCode += '}';

                    cssCode += '#megamenu-wp-page #' + id + ' #' + itemid + ' .mega-content {';
                        cssCode += ' width: ' + w + 'px; ';
                    cssCode += '}';
                    cssCode += ' #megamenu-wp-page #' + id + ' #' + itemid + '.mega-hover .mega-content, #megamenu-wp-page #' + id + ' #' + itemid + ':hover .mega-content, #megamenu-wp-page #' + id + ' #' + itemid + '.focus .mega-content, #megamenu-wp-page #' + id + ' #' + itemid + '.mega-hover .mega-content{';

                    if ( ulpos == 'left' ) {
                        l = 0;
                        if ( w + liOf.left > megaLayout.rightPos ) {
                            l = ( w + liOf.left ) - megaLayout.rightPos;
                            l = - l;
                        }
                        cssCode += ' left: '+l+'px !important; ';
                        cssCode += ' right: auto !important; ';
                    } else if ( ulpos == 'right' ) {
                        cssCode += ' right: 0px !important; ';
                        cssCode += ' left: auto !important; ';
                    } else { // center
                        var liw = li.outerWidth();
                        var t;
                        t = l = ( w/2 - liw / 2 );

                        if ( ( liOf.left + w ) - t > megaLayout.rightPos ) {
                            t = ( ( liOf.left + w ) - t ) -  megaLayout.rightPos;
                            l += Math.abs( t );
                        }
                        cssCode += ' right: 0px !important; ';
                        cssCode += ' left: -'+l+'px !important; ';
                    }

                    cssCode += ' display: block !important; ';
                    cssCode += '}'; // end hover

                } else { // end custom width
                    // Start Auto width

                    w = megaLayout.contentWidth;

                    if (megaLayout.position == 'right') {
                        if ('relative' !== pos) {
                            li.css('position', 'relative');
                        }
                        tr = megaLayout.navWidth + megaLayout.left;
                        l = tr - megaLayout.contentWidth - liOf.left;
                        if (l > 0) {
                            l = -l;
                        }

                    } else {
                        if ('relative' !== pos) {
                            l = 0;
                        } else {

                            var testLeft = liOf.left;
                            while (megaLayout.rightPos < ( testLeft + megaLayout.contentWidth )) {
                            //while (megaLayout.rightPos < ( megaLayout.offset.left + megaLayout.contentWidth )) {
                                testLeft--;
                                l--;
                            }
                        }

                        console.log( 'l - '+pos, l );
                    }


                    var ul_left = ul.css( 'left' ) || 0;
                    ul_left  = parseFloat( ul_left );
                    if ( isNaN( ul_left ) ) {
                        ul_left = 0;
                    }

                    console.log( 'ul_left', ul_left );

                    cssCode += '#megamenu-wp-page #' + id + ' #' + itemid + ':hover .mega-content, #megamenu-wp-page #' + id + ' #' + itemid + '.focus .mega-content, #megamenu-wp-page #' + id + ' #' + itemid + '.mega-hover .mega-content {';
                        cssCode += ' width: ' + w + 'px; ';
                        if( ul_left < -1600 ) {
                            cssCode += ' left: ' + l + 'px; ';
                        }
                    cssCode += '}';

                    cssCode += '#megamenu-wp-page #' + id + ' #' + itemid + ' .mega-content, #megamenu-wp-page #' + id + ' #' + itemid + ' .mega-content {';
                        cssCode += ' width: ' + w + 'px; ';
                        if( ul_left >= -1600 ) {
                            cssCode += ' left: ' + l + 'px !important; ';
                        }
                    cssCode += '}';

                    //  cssCode += ' width: ' + w + 'px !important';
                }

            } ); // end loop mega items

            //cssCode += '.megamenu-wp-desktop #megamenu-wp-page #'+id+' li:hover .mega-content, #megamenu-wp-page '+id+' li.mega-hover .mega-content { margin-left: 0px !important; margin-right: 0px !important; max-width: '+( $window.width() )+'px !important; min-width: 0px!important; right: auto !important; }';
            cssCode += '.megamenu-wp-desktop #megamenu-wp-page #'+id+' li .mega-content { margin-left: 0px !important; margin-right: 0px !important; max-width: '+( $window.width() )+'px !important; min-width: 0px!important; right: auto !important; }';
            cssCode += '.megamenu-wp-desktop #megamenu-wp-page #'+id+' { position: relative; } ';
            cssCode += '.megamenu-wp-desktop #megamenu-wp-page #'+id+' .mega-content { z-index: -1; max-width: 99999999px; } ';
            cssCode += '.megamenu-wp-desktop #megamenu-wp-page #'+id+':hover .mega-content,.megamenu-wp-desktop #megamenu-wp-page #'+id+'.focus .mega-content,  .megamenu-wp-desktop #megamenu-wp-page #'+id+'.mega-hover .mega-content  { z-index: 999; } ';
            // mega-content-full
            if ( this.contentWidth < $window.width() ) {
                var md = $window.width() - this.contentWidth;
                md = md / 2;
                //cssCode += '#megamenu-wp-page .mega-content-full .mega-builder-container, #megamenu-wp-page .mega-content-full .mega-posts-wrapper, #megamenu-wp-page .mega-content-full .mega-inner{ margin-left: -'+md+'px; margin-right: -'+md+'px; } ';
                cssCode += '.megamenu-wp-desktop #megamenu-wp-page .mega-content-full .mega-inner { margin-left: -'+md+'px; margin-right: -'+md+'px; } ';
            }

            $( '#megamenu-css-mega-nav-'+this.cssId ).html( cssCode );
            $( document).trigger( 'wp_mega_menu_css_changed', [ cssCode, $megaMenu, this.cssId ] );

        };


        this.init = function(){
            var custom_css = '';
            $('.mega-item .mega-content').each( function () {
                var item = $( this ).closest('.mega-item');
                var css = $( this ).data( 'style' ) || '';
                var id = item.attr( 'id' ) || '';
                if ( css ) {
                    css = css.replace(/__id__/g, id );
                    custom_css += css;
                }
            } );

            if ( custom_css ) {
                if ( $( '#megamenu-wp-custom-css' ).length <= 0 ) {
                    $( 'head' ).append( '<style id="megamenu-wp-custom-css" type="text/css">'+custom_css+'</style>' );
                } else {
                    $( '#megamenu-wp-custom-css' ).html( custom_css );
                }
            } else {
                $( '#megamenu-wp-custom-css' ).remove( );
            }

            if ( MegamenuWp.theme_support.disable_auto_css ) {
                return ;
            }

            this.timeout = null;
            $window.resize( function(){
                $( '#megamenu-css-mega-nav-'+megaLayout.cssId ).html( '' );
                megaLayout.setupContentPos();
            } );
            megaLayout.setupContentPos();

        };

        this.init();
    }

    $('.mega-item').parent().addClass('megamenu-wp');

    $('.megamenu-wp').each(function () {
        new setupMegaLayout( $(this) );
    });





    var tabs_layout = function(){
        $( '.mega-tab-posts').each( function(){
            // $( this).closest( '.menu-item' ).addClass( 'mega-item' );
            var tabs = $( this );

            var nav = $( '.mega-tab-post-nav', tabs );
            var loading = $(  MegamenuWp.loading_icon );
            var showWhen = tabs.data( 'show-when' ) || 'hover';
            if ( showWhen != 'click' ) {
                showWhen = 'hover';
            }

			var jsEvents = showWhen;
			if ( 'hover' == showWhen ) {
				jsEvents = 'mouseover';
			}


            tabs.css( { 'min-height': tabs.height() } );

            if ( $( '.li.active', nav ).length == 0 ) {
                $( '.li', nav ).eq( 0 ).addClass( 'active' );
                var data = $( '.li.active', nav).eq( 0 ).data( 'query' );
                tabs.data( 'last-query', data );

                $( '.mega-tab-post-cont .nav-posts-tab', tabs ).eq( 0 ).addClass( 'active animation' );
            }

            $( '.mega-tab-post-cont', tabs ).append( loading );

            $( '.li', nav ).on( jsEvents, function( e ) {
                // e.preventDefault();
                if ( showWhen != 'hover' ) {
                    e.preventDefault();
                }
                var li = $( this );
                if ( isMegaMenuMobile && showWhen != 'hover' ) {
                    var url = $( 'a', li).attr( 'href' ) || '';
                    if ( url ) {
                        window.location = url;
                        return;
                    }

                }

                $( '.li', nav ).removeClass( 'active' );
                li.addClass( 'active' );
                var id = li.attr( 'data-id' ) || '';
                if ( id ) {

                    $( '.mega-tab-post-cont .nav-posts-tab', tabs ).removeClass( 'animation' );
                    $( '.mega-tab-post-cont .nav-posts-tab', tabs ).removeClass( 'active' );
                    $( '.mega-tab-post-cont .nav-posts-tab[data-id="'+id+'"]', tabs ).addClass( 'active' );
                    setTimeout( function(){
                        $( '.mega-tab-post-cont .nav-posts-tab[data-id="'+id+'"]', tabs ).addClass( 'animation' );
                    }, 10 );

                }

            } );

            tabs.on( 'click', '.tab-paging', function( e ) {
                e.preventDefault();
                var a = $( this );
                if ( a.hasClass( 'active' ) ) {
                    //var data = tabs.data('last-query') || null;
                    var data = null;
                    var li;

                    if ( $('.li.active', nav).eq(0).length > 0 ) {
                        if (!data) {
                            data = $('.li.active', nav).eq(0).data('query');
                        }
                        li = $('.li.active', nav);
                    }

                    if ( ! data ) {
                        data = a.closest( '.mega-tab-post-cont').data( 'query' ) || null;
                    }

                    var paged = a.attr('data-paged') || 0;
                    paged = parseInt( paged );
                    var current_tab  = a.closest( '.nav-posts-tab' );
                    if ( paged > 0 ) {
                        data.paged = paged;
                        data.action = 'megamneu_wp_load_posts';

                        tabs.addClass( 'loading' );
                        if ( tabs._xhr ) {
                            tabs._xhr.abort();
                        }
                        tabs._xhr = $.ajax( {
                            url:  MegamenuWp.ajax_url,
                            data: data,
                            success: function( res ) {
                                tabs.css( { height: 'auto' } );
                                //tabs.css( { height: tabs.height() } );
                                tabs.css( { height: 'auto' } );
                                current_tab.removeClass( 'animation' );
                                if (  res.data  ) {
                                    current_tab.html ( res.data );
                                } else {
                                    a.removeClass( 'active' ).addClass( 'disable' );
                                }

                                setTimeout( function(){
                                    tabs.removeClass( 'loading' );
                                    current_tab.addClass( 'animation' );
                                }, 20 );

                                tabs._xhr = null;
                            }
                        }).fail( function(){
                            tabs.removeClass( 'loading' );
                            tabs._xhr = null;
                        } );
                    }
                }

            } );
        } );
    };

    tabs_layout();


    // Selective refresh
    if ( 'undefined' !== typeof wp && wp.customize && wp.customize.selectiveRefresh ) {
        wp.customize.selectiveRefresh.bind( 'partial-content-rendered', function( placement ) {

            $( '.megamenu-wp').each( function(){
                $( this ).find( 'li' ).removeClass( 'mega-live-view-item mega-hover mega-animation' );
                new setupMegaLayout( $( this ) );
            } );

            tabs_layout();

        } );
    }


} );
