jQuery(document).ready(function($) {
    window.dg_at_sticky = [];
    $('.dgat_advancedtab').each(function(index, ele){
        var _this = $(this);
        var container = _this.find('.dg_at_container');
        var nav_container = _this.find('.dg_at_nav_container');
        var navs = _this.find('.dg_at_nav');
        var settings = _this.find('.dg_at_container').data().settings;
        var sticky_selector = '.' + settings.module_class + ' .dg_at_nav_wrap';
        var sticky_container = '.' + settings.module_class + ' .dg_at_container';
        var Sticky = null;
        var space = dg_tab_distance(settings);

        if (settings.use_sticky_nav === 'on') {

            Sticky = new hcSticky(sticky_selector, {
                stickTo: sticky_container,
                top: space.desktop,
                responsive: {
                    980: {
                        top: space.tablet,
                        disable: settings.turn_off_sticky === 'tablet_phone' ? true : false
                    },
                    767: {
                        top: space.phone,
                        disable: settings.turn_off_sticky === 'phone' ||  settings.turn_off_sticky === 'tablet_phone' ? true : false
                    }
                }
            });
            Sticky.refresh();
            window.dg_at_sticky.push(Sticky);
        }

        _this.find('.dg_at_nav:first-child')
            .addClass('dg_at_nav_active');
        _this.find('.dgat_advancedtabitem:first-child')
            .addClass('dg_at_content_active');

        navs.on(settings.tab_event_type, function(e){
          
            if (!$(this).hasClass('dg_at_nav_active')){
                var active_class = e.currentTarget.classList[0];

                navs.removeClass('dg_at_nav_active');
                $(this).addClass('dg_at_nav_active');
    
                if(settings.use_sticky_nav === 'on') {
                    diat_nav_sticky_scroll(container, space);
                }
                if(settings.use_sticky_nav !== 'on' && settings.use_scroll_to_content === 'on') {
                    dg_scroll_to_content(_this.find('.dg_at_all_tabs_wrap'));
                }
                
                dg_tab_anime(
                    _this, 
                    `.${settings.module_class} .dg_at_all_tabs`, 
                    settings.tab_animation, 
                    parseInt(settings.animation_duration),
                    active_class
                );
            }
            
        });

    });

    onElementHeightChange(document.body, function(){
        if(window.dg_at_sticky.length > 0) {
            for (var i = 0; i < window.dg_at_sticky.length; i++) {
                window.dg_at_sticky[i].refresh()
            }
        }
    });

    function onElementHeightChange(elm, callback){
        var lastHeight = elm.clientHeight, newHeight;
        (function run(){
            newHeight = elm.clientHeight;
            if( lastHeight !== newHeight )
                callback();
            lastHeight = newHeight;

            if( elm.onElementHeightChangeTimer )
                clearTimeout(elm.onElementHeightChangeTimer);

            elm.onElementHeightChangeTimer = setTimeout(run, 200);
        })();
    }

    function dg_tab_distance(settings){
        var extra_space     = settings.extra_space === true ? 32 : 0;
        var space           = parseInt(settings.sticky_distance) + extra_space;
        var space_tablet    = settings.sticky_distance_tablet !== '' ? 
                            parseInt(settings.sticky_distance_tablet) + extra_space : space;
        var space_phone     = settings.sticky_distance_phone !== '' ? 
                            parseInt(settings.sticky_distance_phone) + extra_space : space_tablet;
        
        return {
            'desktop' : space,
            'tablet' : space_tablet,
            'phone' : space_phone
        };
    }

    function diat_nav_sticky_scroll(selector, space) {
        var position_top = selector.offset().top;

        if($(window).width() > 980) {
            position_top = position_top - space.desktop;
        }
        if($(window).width() < 981 && $(window).width() > 767) {
            position_top = position_top - space.tablet;
        }
        if($(window).width() < 768) {
            position_top = position_top - space.phone;
        }

        $([document.documentElement, document.body]).animate({
            scrollTop: position_top
        }, 700);

    }
    function dg_scroll_to_content(selector) {
        var position_top = selector.offset().top;
        if($(window).width() < 981) {
            $([document.documentElement, document.body]).animate({
                scrollTop: position_top
            }, 500);
        }
    }

    var animations = {
        slide_left : {
            opacity: ['1', '0'],
            translateX: ['0', '-100px']
        },
        slide_right : {
            opacity: ['1', '0'],
            translateX: ['0', '100px']
        },
        slide_up : {
            opacity: ['1', '0'],
            translateY: ['0', '-100px']
        },
        slide_down : {
            opacity: ['1', '0'],
            translateY: ['0', '100px']
        },
        fade_in : {
            opacity: ['1', '0'],
        },
        zoom_left : {
            opacity: ['1', '0'],
            scale: ['1', '.5'],
            transformOrigin: ['0% 50%', '0% 50%'],
            // duration: 200
        },
        zoom_center : {
            opacity: ['1', '0'],
            scale: ['1', '.5'],
            transformOrigin: ['50% 50%', '50% 50%'],
            // duration: 200
        },
        zoom_right : {
            opacity: ['1', '0'],
            scale: ['1', '.5'],
            transformOrigin: ['100% 50%', '100% 50%'],
            // duration: 200
        }
    }

    function dg_tab_anime(_this, selector, config = 'slide_left', duration, active_class) {
        var object = {
            targets: selector,
            direction: 'alternate',
            easing: 'linear',
            duration: duration,
            endDelay: 1,
            update: function(anim) {
                if(anim.progress === 100) {
                    _this.find('.dgat_advancedtabitem')
                        .removeClass('dg_at_content_active');
                    _this.find('.dg_at_all_tabs .' + active_class)
                        .addClass('dg_at_content_active');
                    var resizeEvent = window.document.createEvent('UIEvents');
                    resizeEvent.initUIEvent('resize', true, false, window, 0);
                    window.dispatchEvent(resizeEvent);
                }
            }
        };
        var anime_config = Object.assign(object, animations[config]);

        if( window.anime ) {
            window.anime(anime_config);
        }
    } 

})