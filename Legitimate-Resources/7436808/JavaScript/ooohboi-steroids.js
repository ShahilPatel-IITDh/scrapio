/* Elementor hooks - editor - frontend */

'use strict';

( function ( $, w ) {
    
    var $window = $( w );

    $window.on( 'elementor/frontend/init', function() {

        var SectionExtends = elementorModules.frontend.handlers.Base.extend( {

            onInit: function onInit() {

                elementorModules.frontend.handlers.Base.prototype.onInit.apply( this, arguments );
                this.initSectionExtends();

            },
            isBreakingBad: function() {

                return this.$element.hasClass( 'ob-is-breaking-bad' );

            },
            /* needed for Inner Section stickyness */
            isInnerSection: function() {
                return this.$element.hasClass( 'elementor-inner-section' );
            }, 
            onElementChange: function( changedProp ) {

                // Breaking Bad
                if( changedProp === '_ob_bbad_use_it' ) {
                    if( 'yes' === this.getElementSettings( '_ob_bbad_use_it' ) ) {
                        this.$element.addClass( 'ob-is-breaking-bad' );
                        if( this.isInnerSection() ) this.$element.addClass( 'ob-bb-inner' );
                    }
                    else {
                        this.$element.removeClass( 'ob-is-breaking-bad' ); 
                        if( this.isInnerSection() ) this.$element.removeClass( 'ob-bb-inner' );
                    }
                }
                // Inner Section
                if( changedProp === '_ob_bbad_sssic_use' && this.isInnerSection() ) {
                    if( 'yes' === this.getElementSettings( '_ob_bbad_sssic_use' ) ) this.$element.addClass( 'ob-is-sticky-inner-section' );
                    else this.$element.removeClass( 'ob-is-sticky-inner-section' );
                }
                
            },

            initSectionExtends: function() {
            
                if( this.isEdit ) {
                    // Breaking Bad
                    if( 'yes' === this.getElementSettings( '_ob_bbad_use_it' ) && ! this.isBreakingBad() ) {
                        this.$element.addClass( 'ob-is-breaking-bad' ); 
                        if( this.isInnerSection() ) this.$element.addClass( 'ob-bb-inner' ); 
                    }
                }
                // Sticky Inner Section - identical for both front-and-back-end
                if( 'yes' === this.getElementSettings( '_ob_bbad_sssic_use' ) && this.isInnerSection() ) {
                    if( this.isEdit ) this.$element.addClass( 'ob-is-sticky-inner-section' );
                    // find first wrapping element; must match some class name(s)
                    var parent_wrapper = this.$element.closest( '.elementor-widget-wrap' );
                    if( parent_wrapper.length ) parent_wrapper.addClass( 'ob-sssic-wrapper' );
                }
            }, 

        } );

        var ColumnExtends = elementorModules.frontend.handlers.Base.extend( {

            onInit: function onInit() {

                elementorModules.frontend.handlers.Base.prototype.onInit.apply( this, arguments );
                // is E3.0 column?
                if( ! this.$element.find( '.elementor-column-wrap' ).first().length ) this.$element.addClass( 'ob-is-e3' );
                // Teleporter issue with Chrome
                var ua = navigator.userAgent.toLowerCase();
                if( ua.indexOf( 'chrome' ) > -1 ) this.teleporterChromeResize();
                // columns...
                this.initColumnExtends();

            },
            teleporterChromeResize: function() {

                if( ! this.isTeleporter() ) return;

                var dis = this;
                var myID = this.$element.attr( 'data-id' ); 
                $window.on( 'resize', function() { 
                    dis.$element.closest( '.ob-is-teleporter' ).addClass( 'ob-chrome-resize' );
                    clearTimeout( myID );   
                    myID = setTimeout( function() { 
                        var column_height = parseInt( dis.$element.closest( '.ob-is-teleporter' ).css( 'height' ) );
                        var col_wrap = dis.$element.find( '.elementor-column-wrap' ).first();
                        if( col_wrap.length ) col_wrap.css( { 'height': column_height } );
                        else {
                            dis.$element.find( '.elementor-widget-wrap' ).first().css( { 'height': column_height } );
                        }
                        dis.$element.closest( '.ob-is-teleporter' ).removeClass( 'ob-chrome-resize' ); 
                    }, 500 );
                } ); 
                $window.trigger( 'resize' );
                
            },
            /* Teleporter */
            isTeleporter: function() {
                return this.$element.hasClass( 'ob-is-teleporter' );
            }, 
            /* Widget Stalker */
            isWidgetStalkerCol: function() {
                return this.$element.hasClass( 'ob-is-stalker' );
            },
            initColumnExtends: function() {
                /* breaking bad */
                if( ! this.isEdit ) {
                    var bb_settings = {};
                    try {
                        bb_settings = JSON.parse( this.$element.attr( 'data-settings' ) );
                    } catch ( error ) {
                        return;
                    }
                    // handle links
                    if( undefined !== bb_settings._ob_bbad_link ) { 

                        var bb_link = bb_settings._ob_bbad_link;
                        if( '' === bb_link.url ) { 
                            this.$element.removeClass( 'bb-column-link' );
                            return;
                        } else {
                            this.$element.addClass( 'bb-column-link' );
                        }

                        this.$element.off( 'click.bb' );
                        this.$element.on( 'click.bb', function() {
                            if( bb_link.is_external ) window.open( bb_link.url ); 
                            else location.href = bb_link.url;
                        } );

                    }
                }
                /* Teleporter */
                if( this.isEdit && 'use-teleporter' === this.getElementSettings( '_ob_teleporter_use' ) ) { 
                    this.$element.addClass( 'ob-is-teleporter' ); 
                    this.$element.find( '.elementor-widget-wrap' ).first().addClass( 'ob-tele-midget' ); 
                    this.doTeleporterEditor(); 
                } 
                if( ! this.isEdit && this.isTeleporter() ) {
                    this.$element.find( '.elementor-widget-wrap' ).first().addClass( 'ob-tele-midget' ); 
                    this.doTeleporter(); 
                }
                /* Widget Stalker */
                if( this.isEdit && 'yes' === this.getElementSettings( '_ob_bbad_is_stalker' ) ) {
                    this.$element.addClass( 'ob-is-stalker' ); 
                }
            }, 
            onElementChange: function( changedProp ) {
                
                if( changedProp === '_ob_teleporter_overlay_color' ) {
                    this.$element.find( 'div[class*="ob-teleporter-"] > .ob-tele-overlay' ).css( 'background-color', this.getElementSettings( '_ob_teleporter_overlay_color' ) );
                } else if( changedProp === '_ob_teleporter_no_pass_tablet' ) {
                    if( 'no-tablet' === this.getElementSettings( '_ob_teleporter_no_pass_tablet' ) ) 
                        this.$element.addClass( 'ob-tele-no-tablet' );
                    else 
                        this.$element.removeClass( 'ob-tele-no-tablet' );
                } else if( changedProp === '_ob_teleporter_no_pass_mobile' ) {
                    if( 'no-mobile' === this.getElementSettings( '_ob_teleporter_no_pass_mobile' ) ) 
                        this.$element.addClass( 'ob-tele-no-mobile' ); 
                    else 
                        this.$element.removeClass( 'ob-tele-no-mobile' ); 
                }
                /* Widget Stalker */
                if( changedProp === '_ob_bbad_is_stalker' ) {
                    this.routeWidgetStalkerCol();
                }
            },
            /* Widget Stalker */
            routeWidgetStalkerCol: function() {
                if( ! this.isWidgetStalkerCol() && 'yes' === this.getElementSettings( '_ob_bbad_is_stalker' ) ) this.$element.addClass( 'ob-is-stalker' ); 
                else this.$element.removeClass( 'ob-is-stalker' );
            },
            /* Teleporter */
            doTeleporterEditor: function() {

                if( 'use-teleporter' !== this.getElementSettings( '_ob_teleporter_use' ) ) return; // bail

                // E3.0+ wrap the children of .elementor-widget-wrap for the animation purpose
                var widgets_wrapper = this.$element.find( '.elementor-widget-wrap' ).first();
                if( widgets_wrapper.length ) {
                    widgets_wrapper.wrapInner( '<div class="widget-wrap-children" />' );
                    if( widgets_wrapper.find( '.elementor-background-overlay' ).first().length ) {
                        widgets_wrapper.find( '.elementor-background-overlay' ).first().insertBefore( widgets_wrapper.find( '.elementor-background-overlay' ).first().parent() );
                    }
                }

                if( 'do-pass' !== this.getElementSettings( '_ob_teleporter_pass' ) ) return; // bail too    

                var this_ob = this;
                var myself  = this.$element;
                var my_id   = this.$element.attr( 'data-id' ); 

                // default classes
                if( 'no-tablet' === this.getElementSettings( '_ob_teleporter_no_pass_tablet' ) ) 
                    this.$element.addClass( 'ob-tele-no-tablet' );
                if( 'no-mobile' === this.getElementSettings( '_ob_teleporter_no_pass_mobile' ) ) 
                    this.$element.addClass( 'ob-tele-no-mobile' ); 

                // this column's parent section
                var parent_section = ( 'section' === this.getElementSettings( '_ob_teleporter_pass_element' ) ) ? this.$element.closest( '.elementor-section' ) : this.$element.closest( '.elementor-container' ); 
                if( ! parent_section.length ) return; // bail

                // parent overflow
                parent_section.css( 'overflow', 'hidden' ); 

                // new element & effect
                var hover_effect  = this.getElementSettings( '_ob_teleporter_pass_effect' );
                var hover_element = '<div class="ob-teleporter-' + my_id + ' ob-tele-eff-' + hover_effect + '" data-id-teleporter="' + my_id + '"><div class="ob-tele-overlay" style="background-color: ' + this.getElementSettings( '_ob_teleporter_overlay_color' ) + ';"></div></div>';

                if( ! $( '.ob-teleporter-' + my_id ).length ) this.$element.prepend( hover_element );

                this.$element.off( 'mouseenter mouseleave' );
                this.$element.on( 'mouseenter mouseleave', function( ev ) {

                    if( 'mouseenter' === ev.type ) {

                        if( 'no-tablet' === this_ob.getElementSettings( '_ob_teleporter_no_pass_tablet' ) && 
                        'tablet' === elementorFrontend.getCurrentDeviceMode() ) return; // bail
                        if( 'no-mobile' === this_ob.getElementSettings( '_ob_teleporter_no_pass_mobile' ) && 
                            'mobile' === elementorFrontend.getCurrentDeviceMode() ) return; // bail
                        if( 'do-pass' !== this_ob.getElementSettings( '_ob_teleporter_pass' ) ) return;

                        var tele_css = { 
                            'background-color': $( '.ob-teleporter-' + my_id ).css( 'background-color' ),
                            'background-image': $( '.ob-teleporter-' + my_id ).css( 'background-image' ),
                            'background-position': $( '.ob-teleporter-' + my_id ).css( 'background-position' ),
                            'background-size': $( '.ob-teleporter-' + my_id ).css( 'background-size' ),
                            'background-repeat': $( '.ob-teleporter-' + my_id ).css( 'background-repeat' )
                        };
                        
                        if( 'section' === this_ob.getElementSettings( '_ob_teleporter_pass_element' ) ) {
                            var all_children = parent_section.children().not( '.elementor-container' ).detach();
                            parent_section.addClass( 'ob-tele-mom-hover' ).prepend( $( '.ob-teleporter-' + my_id ) );
                            parent_section.prepend( all_children );
                        } else { 
                            parent_section.addClass( 'ob-tele-mom-hover' ).prepend( $( '.ob-teleporter-' + my_id ) );
                        }
                        
                        $( '.ob-teleporter-' + my_id ).css( tele_css ).hide();
                        $( '.ob-teleporter-' + my_id ).addClass(  'ob-teleporter-hover' ).show(); 

                    } else {

                        parent_section.removeClass( 'ob-tele-mom-hover' );
                        setTimeout( function() {
                            $( '.ob-teleporter-' + my_id ).removeAttr( 'style' ).removeClass( 'ob-teleporter-hover' );
                            myself.prepend( $( '.ob-teleporter-' + my_id ) ); 
                        }, 100 );

                    }

                } );
            
            }, 
            doTeleporter: function() {

                var teleporter_settings = {};
                try {
                    teleporter_settings = JSON.parse( this.$element.attr( 'data-settings' ) );
                } catch ( error ) {
                    return;
                }

                if( 'use-teleporter' !== teleporter_settings._ob_teleporter_use ) return; // bail

                // E3.0+ wrap the children of .elementor-widget-wrap for the animation purpose
                var widgets_wrapper = this.$element.find( '.elementor-widget-wrap' ).first();
                if( widgets_wrapper.length ) {
                    widgets_wrapper.wrapInner( '<div class="widget-wrap-children" />' );
                    if( widgets_wrapper.find( '.elementor-background-overlay' ).first().length ) {
                        widgets_wrapper.find( '.elementor-background-overlay' ).first().insertBefore( widgets_wrapper.find( '.elementor-background-overlay' ).first().parent() );
                    }
                }

                var myself = this.$element;
                var my_id  = this.$element.attr( 'data-id' ); 

                // default classes
                if( 'no-tablet' === teleporter_settings._ob_teleporter_no_pass_tablet ) 
                    this.$element.addClass( 'ob-tele-no-tablet' );
                if( 'no-mobile' === teleporter_settings._ob_teleporter_no_pass_mobile ) 
                    this.$element.addClass( 'ob-tele-no-mobile' ); 

                // handle links
                if( undefined !== teleporter_settings._ob_teleporter_link ) { 

                    var tele_link = teleporter_settings._ob_teleporter_link;
                    if( '' === tele_link.url ) return;

                    this.$element.off( 'click.obTeleporter' );
                    this.$element.on( 'click.obTeleporter', function() {
                        if( tele_link.is_external ) window.open( tele_link.url ); 
                        else location.href = tele_link.url;
                    } );

                }

                if( 'do-pass' !== teleporter_settings._ob_teleporter_pass ) return; // bail too

                // this column's parent section
                var parent_section = ( 'section' === teleporter_settings._ob_teleporter_pass_element ) ? this.$element.closest( '.elementor-section' ) : this.$element.closest( '.elementor-container' ); 
                if( ! parent_section.length ) return; // bail

                // parent overflow
                parent_section.css( 'overflow', 'hidden' );

                // new element
                var hover_effect  = teleporter_settings._ob_teleporter_pass_effect;
                var hover_element = '<div class="ob-teleporter-' + my_id + ' ob-tele-eff-' + hover_effect + '" data-id-teleporter="' + my_id + '"><div class="ob-tele-overlay" style="background-color: ' + teleporter_settings._ob_teleporter_overlay_color + ';"></div>';

                if( ! $( '.ob-teleporter-' + my_id ).length ) this.$element.prepend( hover_element );

                this.$element.off( 'mouseenter mouseleave' );
                this.$element.on( 'mouseenter', function() { 

                    if( 'no-tablet' === teleporter_settings._ob_teleporter_no_pass_tablet && 
                        'tablet' === elementorFrontend.getCurrentDeviceMode() ) return; // bail
                    if( 'no-mobile' === teleporter_settings._ob_teleporter_no_pass_mobile && 
                        'mobile' === elementorFrontend.getCurrentDeviceMode() ) return; // bail

                    var tele_css = { 
                        'background-color': $( '.ob-teleporter-' + my_id ).css( 'background-color' ),
                        'background-image': $( '.ob-teleporter-' + my_id ).css( 'background-image' ),
                        'background-position': $( '.ob-teleporter-' + my_id ).css( 'background-position' ),
                        'background-size': $( '.ob-teleporter-' + my_id ).css( 'background-size' ),
                        'background-repeat': $( '.ob-teleporter-' + my_id ).css( 'background-repeat' )
                    };
                    
                    if( 'section' === teleporter_settings._ob_teleporter_pass_element ) {
                        var all_children = parent_section.children().not( '.elementor-container' ).detach();
                        parent_section.addClass( 'ob-tele-mom-hover' ).prepend( $( '.ob-teleporter-' + my_id ) );
                        parent_section.prepend( all_children );
                    } else parent_section.addClass( 'ob-tele-mom-hover' ).prepend( $( '.ob-teleporter-' + my_id ) );
                    
                    $( '.ob-teleporter-' + my_id ).css( tele_css ).hide();
                    $( '.ob-teleporter-' + my_id ).show().addClass( 'ob-teleporter-hover' );
                    
                } );
                
                this.$element.on( 'mouseleave', function() {
                    
                    parent_section.removeClass( 'ob-tele-mom-hover' );
                    setTimeout( function() {
                        $( '.ob-teleporter-' + my_id ).removeAttr( 'style' ).removeClass( 'ob-teleporter-hover' );
                        myself.prepend( $( '.ob-teleporter-' + my_id ) );
                    }, 100 );

                } );
 
            }, 

        } );

        var handlersList = {

            'section': SectionExtends, 
            'column': ColumnExtends, 

        };

        $.each( handlersList, function( widgetName, handlerClass ) {

            elementorFrontend.hooks.addAction( 'frontend/element_ready/' + widgetName, function( $scope ) {
                
                elementorFrontend.elementsHandler.addHandler( handlerClass, { $element: $scope } );

            } );

        } );

    } ); 

} ( jQuery, window ) );