/**
    * isMobile 
    * responsiveMenu 
    * headerFixed
    * topSearch     
    * lastestTweets
    * ajaxSubscribe.eventLoad
    * ajaxContactForm
    * videoPopup
    * flatBlogCarousel
    * Podes_Isotope
    * googleMap 
    * counter
    * Countdown
    * countdown2
    * progressBar
    * flatTestimonials
    * flatClient
    * flat_Timeline_click
    * Blog_filter_carousel
    * Carousel_Filter
    * FlatGallery
    * Section_Slider
    * tfGallery
    * popupGallery
    * Blancediv
    * swClick
    * goTop          
    * retinaLogos 
    * parallax
    * flatTeam
    * flatAccordion
    * tabs
    * alertBox
    * detectViewport
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

                    $('.mega-menu .mega-menu-sub').hide();
                    $('.has-mega-menu .submenu.mega-menu').hide();

                    $('#header').after($mobileMenu);
                    hasChildMenu.children('ul').hide();
                    hasChildMenu.children('a').after('<span class="btn-submenu"></span>');
                    $('.btn-menu').removeClass('active');
                } else {
                    var $desktopMenu = $('#mainnav-mobi').attr('id', 'mainnav').removeAttr('style');

                    $desktopMenu.find('.submenu').removeAttr('style');
                    $('#header').find('.nav-wrap').append($desktopMenu);
                    $('.btn-submenu').remove();
                }
            }
        });

        $('.btn-menu').on('click', function() {         
            $('#mainnav-mobi').slideToggle(300);
            $(this).toggleClass('active');
        });

        // Mega menu click
        if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {
            $('.btn-mega').on('click', function() {      
                $(this).parent('.mega-title').siblings().slideToggle(300);   
                $(this).toggleClass('active');
            });

            $('.has-mega').on('click', function() {      
                $(this).siblings().slideToggle(300);  
                $(this).toggleClass('active');
            });
        }  
  

        $(document).on('click', '#mainnav-mobi li .btn-submenu', function(e) {
            $(this).toggleClass('active').next('ul').slideToggle(300);
            e.stopImmediatePropagation()
        });
    }

    var headerFixed = function() {
        if ( $('body').hasClass('header_sticky') ) {
            var nav = $('.header');

            if ( nav.size() !== 0 ) {
                var offsetTop = $('.header').offset().top,
                    headerHeight = $('.header').height(),
                    injectSpace = $('<div />', { height: 100 }).insertAfter(nav);   
                    injectSpace.hide();                 
                $(window).on('load scroll', function(){
                    if ( $(window).scrollTop() > offsetTop ) {
                        if ( $('.header').hasClass('header-classic') ) {
                            injectSpace.show();
                        }
                        $('.header').addClass('downscrolled');                         
                    } else {
                        $('.header').removeClass('header-small downscrolled');
                        injectSpace.hide();
                    }                    
                })

            }
        } 

        if ( $('body').hasClass('header_sticky2') ) {
            var nav = $('.header');

            if ( nav.size() !== 0 ) {
                var offsetTop = $('.header.scroll-head').offset().top,
                    headerHeight = $('.header.scroll-head').height(),
                    injectSpace = $('<div />', { height: headerHeight }).insertAfter(nav);   
                    injectSpace.hide();                 

                $(window).on('load scroll', function(){
                     if ( $(window).scrollTop() > offsetTop + 120 ) {
                         $('.header.scroll-head').addClass('downscrolled');
                     } else {
                         $('.header.scroll-head').removeClass('header-small downscrolled');
                     }

                     if ( $(window).scrollTop() > 500 ) {
                         $('.header.scroll-head').addClass('header-small upscrolled');
                     } else {
                         $('.header.scroll-head').removeClass('upscrolled');
                     }
                })
            }
        } 

        if ( $('body').hasClass('header-sticky') ) {
            var nav = $('.header');

            if ( nav.size() !== 0 ) {
                var offsetTop = $('.header').offset().top,
                    headerHeight = $('.header').height(),
                    injectSpace = $('<div />', { height: headerHeight }).insertAfter(nav);   
                    injectSpace.hide();              

                $(window).on('load scroll', function(){
                    if ( $(window).scrollTop() > offsetTop ) {
                        if ( $('.header').hasClass('header-classic') ) {
                            injectSpace.show();
                        }
                        $('.header').addClass('downscrolled');                        
                    } else {
                        $('.header').removeClass('header-small downscrolled');
                        injectSpace.hide();
                    }                    
                })
            }
        }
    };

    var ajaxContactForm = function() {  
        $('#contactform').each(function() {
            $(this).validate({
                submitHandler: function( form ) {
                    var $form = $(form),
                        str = $form.serialize(),
                        loading = $('<div />', { 'class': 'loading' });

                    $.ajax({
                        type: "POST",
                        url:  $form.attr('action'),
                        data: str,
                        beforeSend: function () {
                            $form.find('.form-submit').append(loading);
                        },
                        success: function( msg ) {
                            var result, cls;                            
                            if ( msg == 'Success' ) {                                
                                result == 'Message Sent Successfully To Email Administrator. ( You can change the email management a very easy way to get the message of customers in the user manual )';
                                cls == 'msg-success';
                            } else {
                                result == 'Error sending email.';
                                cls == 'msg-error';
                            }

                            $form.prepend(
                                $('<div />', {
                                    'class': 'flat-alert ' + cls,
                                    'text' : result
                                }).append(
                                    $('<a class="close" href="#"><i class="fa fa-close"></i></a>')
                                )
                            );

                            $form.find(':input').not('.submit').val('');
                        },
                        complete: function (xhr, status, error_thrown) {
                            $form.find('.loading').remove();
                        }
                    });
                }
            });
        }); // each contactform
    };    

    var topSearch = function () {
        $(document).on('click', function(e) {   
            var clickID = e.target.id;   
            if ( ( clickID !== 'ss' ) ) {
                $('.top-search').removeClass('show');                
            } 
        });

        $('.show-search').on('click', function(event){
            event.stopPropagation();
        });

        $('.search-form').on('click', function(event){
            event.stopPropagation();
        });        

        $('.show-search').on('click', function (event) {
            if(!$('.top-search').hasClass( "show" )) {
                $('.top-search').addClass('show');  
                event.preventDefault();                
            }
                
            else
                $('.top-search').removeClass('show');
                event.preventDefault();

            if( !$('.show-search' ).hasClass( "active" ) )
                $( '.show-search' ).addClass( 'active' );
            else
                $( '.show-search' ).removeClass( 'active' );
        });   
    }; 

    var alertBox = function() {
        $(document).on('click', '.close', function(e) {
            $(this).closest('.flat-alert').remove();
            e.preventDefault();
        })     
    }  

    var lastestTweets = function() {
        if ( $().tweet ) {
            $('.latest-tweets').each(function() {
                var $this = $(this);

                $this.tweet({
                    username: $this.data('username'),
                    join_text: "auto",
                    avatar_size: null,
                    count: $this.data('number'),
                    template: "{text}{time}",
                    loading_text: "loading tweets...",
                    modpath: $this.data('modpath')      
                }); // tweet
            }); // lastest-tweets each
        }
    };

    var ajaxSubscribe = {
        obj: {
            subscribeEmail    : $('#subscribe-email'),
            subscribeButton   : $('#subscribe-button'),
            subscribeMsg      : $('#subscribe-msg'),
            subscribeContent  : $("#subscribe-content"),
            dataMailchimp     : $('#subscribe-form').attr('data-mailchimp'),
            success_message   : '<div class="notification_ok">Thank you for joining our mailing list! Please check your email for a confirmation link.</div>',
            failure_message   : '<div class="notification_error">Error! <strong>There was a problem processing your submission.</strong></div>',
            noticeError       : '<div class="notification_error">{msg}</div>',
            noticeInfo        : '<div class="notification_error">{msg}</div>',
            basicAction       : 'mail/subscribe.php',
            mailChimpAction   : 'mail/subscribe-mailchimp.php'
        },

        eventLoad: function() {
            var objUse = ajaxSubscribe.obj;

            $(objUse.subscribeButton).on('click', function() {
                if ( window.ajaxCalling ) return;
                var isMailchimp = objUse.dataMailchimp === 'true';

                if ( isMailchimp ) {
                    ajaxSubscribe.ajaxCall(objUse.mailChimpAction);
                } else {
                    ajaxSubscribe.ajaxCall(objUse.basicAction);
                }
            });
        },

        ajaxCall: function (action) {
            window.ajaxCalling = true;
            var objUse = ajaxSubscribe.obj;
            var messageDiv = objUse.subscribeMsg.html('').hide();
            $.ajax({
                url: action,
                type: 'POST',
                dataType: 'json',
                data: {
                   subscribeEmail: objUse.subscribeEmail.val()
                },
                success: function (responseData, textStatus, jqXHR) {
                    if ( responseData.status ) {
                        objUse.subscribeContent.fadeOut(500, function () {
                            messageDiv.html(objUse.success_message).fadeIn(500);
                        });
                    } else {
                        switch (responseData.msg) {
                            case "email-required":
                                messageDiv.html(objUse.noticeError.replace('{msg}','Error! <strong>Email is required.</strong>'));
                                break;
                            case "email-err":
                                messageDiv.html(objUse.noticeError.replace('{msg}','Error! <strong>Email invalid.</strong>'));
                                break;
                            case "duplicate":
                                messageDiv.html(objUse.noticeError.replace('{msg}','Error! <strong>Email is duplicate.</strong>'));
                                break;
                            case "filewrite":
                                messageDiv.html(objUse.noticeInfo.replace('{msg}','Error! <strong>Mail list file is open.</strong>'));
                                break;
                            case "undefined":
                                messageDiv.html(objUse.noticeInfo.replace('{msg}','Error! <strong>undefined error.</strong>'));
                                break;
                            case "api-error":
                                objUse.subscribeContent.fadeOut(500, function () {
                                    messageDiv.html(objUse.failure_message);
                                });
                        }
                        messageDiv.fadeIn(500);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert('Connection error');
                },
                complete: function (data) {
                    window.ajaxCalling = false;
                }
            });
        }
    };

    var videoPopup =  function() {
        $(".fancybox").on("click", function(){
            $.fancybox({
              href: this.href,
              type: $(this).data("type")
            }); // fancybox
            return false   
        }); // on
    }

    var counter = function() {       
        $('.flat-counter').on('on-appear', function() {             
            $(this).find('.numb-count').each(function() { 
                var to = parseInt( ($(this).attr('data-to')),10 ), speed = parseInt( ($(this).attr('data-speed')),10 );
                if ( $().countTo ) {
                    $(this).countTo({
                        to: to,
                        speed: speed
                    });
                }
            });
       });
    }; 

    var Countdown = function() {
        var before = '<div class="square"><div class="numb">',
            text = '</div><div class="text">';
            if ($().countdown) {
                $(".countdown").countdown('2017/10/1', function(event) {
                  $(this).html(event.strftime(before + '%D' + text + 'DAYS</div></div>' + before + '%H' + text + 'HOURS</div></div>' + before + '%M' + text + 'MINUTES</div></div>' + before + '%S' + text + 'SECONDS</div>'));
                });
            }      
    };

    var countdown2 = function(){
        if ($().countdown) {
            $(".DateCountdown").TimeCircles({
                "animation": "smooth",
                "bg_width": 0.05,
                "fg_width": 0.1,
                "circle_bg_color": "#ebebeb",
                "time": {
                    "Days": {
                        "text": "Days",
                        "color": "#66bfd7",
                        "show": true
                    },
                    "Hours": {
                        "text": "Hours",
                        "color": "#66bfd7",
                        "show": true
                    },
                    "Minutes": {
                        "text": "Minutes",
                        "color": "#66bfd7",
                        "show": true
                    },
                    "Seconds": {
                        "text": "Seconds",
                        "color": "#66bfd7",
                        "show": true
                    }
                }
            });
            $(window).on('resize', function(){
                $('.DateCountdown').TimeCircles().rebuild();
            });
        }
    };

    var progressBar = function() {        
        $('.progress-bar').on('on-appear', function() {
            $(this).each(function() {
                $(this).css("overflow", "inherit");
                var percent = $(this).data('percent');                
                $(this).find('.progress-animate').animate({
                    "overflow":"inherit",
                    "width": percent + '%'
                }, $(this).find('.progress-animate').data('duration') );

                $(this).parent('.flat-progress').find('.perc').addClass('show').animate({
                    "overflow":"inherit",
                    "width": percent + '%'
                }, $(this).find('.progress-animate').data('duration') );
            });
        });
    };

    var detectViewport = function() {
        $('[data-waypoint-active="yes"]').waypoint(function() {
            $(this).trigger('on-appear');
            }, { offset: '90%', triggerOnce: true });

        $(window).on('load', function() {
            setTimeout(function() {
                $.waypoints('refresh');
            });
        });
    };  

    var flatTestimonials = function() {
        $('.wrap-testimonials').each(function() {            
            if ( $().owlCarousel ) {
                $(this).find('.flat-testimonials').owlCarousel({
                    loop: true,
                    margin: 0,
                    nav: $('.flat-testimonials').data('nav'),
                    dots: $('.flat-testimonials').data('dots'),                     
                    autoplay: $('.flat-testimonials').data('auto'),                    
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
                            items: $('.flat-testimonials').data('item')
                        }
                    }
                });
            }
            if ( $().owlCarousel ) {
                $(this).find('.flat-testimonials-item3').owlCarousel({
                    loop: true,
                    margin: 30,
                    nav: $('.flat-testimonials-item3').data('nav'),
                    dots: $('.flat-testimonials-item3').data('dots'),                     
                    autoplay: $('.flat-testimonials-item3').data('auto'),                    
                    responsive:{
                        0:{
                            items: 1
                        },
                        320:{
                            items: 1
                        },
                        480:{
                            items: 2
                        },
                        767:{
                            items: 2
                        },
                        991:{
                            items: 2
                        },
                        1200: {
                            items: $('.flat-testimonials-item3').data('item')
                        }
                    }
                });
            }
            if ( $().owlCarousel ) {
                $(this).find('.flat-testimonials-item2').owlCarousel({
                    loop: true,
                    margin: 30,
                    nav: $('.flat-testimonials-item2').data('nav'),
                    dots: $('.flat-testimonials-item2').data('dots'),                     
                    autoplay: $('.flat-testimonials-item2').data('auto'),                    
                    responsive:{
                        0:{
                            items: 1
                        },
                        320:{
                            items: 1
                        },
                        480:{
                            items: 2
                        },
                        767:{
                            items: 2
                        },
                        991:{
                            items: 2
                        },
                        1200: {
                            items: $('.flat-testimonials-item2').data('item')
                        }
                    }
                });
            }
        });
    };

    var Carousel_Filter = function() {
        $('.section-carousel-filter').each(function() {  
            if ( $().owlCarousel ) {
                var owl = $('.carousel-filter').owlCarousel({
                    loop    :true,
                    margin  :30,
                    nav     :false,
                    responsive:{
                        0:{
                            items: 1
                        },
                        480:{
                            items: 2
                        },
                        767:{
                            items: 2
                        },
                        991:{
                            items: 2
                        },
                        1200: {
                            items: 5
                        }
                    }
                })
                
                /* animate filter */
                var owlAnimateFilter = function(even) {
                    $(this)
                    .addClass('__loading')
                    .delay(70 * $(this).parent().index())
                    .queue(function() {
                        $(this).dequeue().removeClass('__loading')
                    })
                }

                $('.button-filter').on('click', '.btn-filter', function(e) {
                    var filter_data = $(this).data('filter');

                    /* return if current */
                    if($(this).hasClass('btn-active')) return;

                    /* active current */
                    $(this).addClass('btn-active').siblings().removeClass('btn-active');

                    /* Filter */
                    owl.owlFilter(filter_data, function(_owl) { 
                        $(_owl).find('.filter-item').each(owlAnimateFilter); 
                    });
                })
            };
        });
    };

    var Blog_filter_carousel = function() {
        $('.section-slider3').each(function() {  
            if ( $().owlCarousel ) {
            var owl = $('.section-slider3 .flat-blog-filter.owl-carousel').owlCarousel({
                loop    :true,
                margin  :30,
                nav     :true,
                dots     :true,
                responsive:{
                    0:{
                        items: 1
                    },
                    320:{
                        items: 1
                    },
                    480:{
                        items: 2
                    },
                    767:{
                        items: 2
                    },
                    991:{
                        items: 3
                    },
                    1200: {
                        items: 4
                    }
                }
            })
            
            /* animate filter */
            var owlAnimateFilter2 = function(even) {
                $(this)
                .addClass('__loading')
                .delay(70 * $(this).parent().index())
                .queue(function() {
                    $(this).dequeue().removeClass('__loading')
                })
            }

            $('.section-slider3 .btn-filter-wrap').on('click', '.btn-filter', function(e) {
                var filter_data = $(this).data('filter');

                /* return if current */
                if($(this).hasClass('btn-active')) return;

                /* active current */
                $(this).addClass('btn-active').siblings().removeClass('btn-active');

                /* Filter */
                owl.owlFilter(filter_data, function(_owl) { 
                    $(_owl).find('.section-slider3 .filter-item').each(owlAnimateFilter2); 
                });
            })
            };
        });
    };

    var flatTeam = function() {
        $('.wrap-teammember').each(function() {            
            if ( $().owlCarousel ) {
                $(this).find('.flat-teammember').owlCarousel({
                    loop: true,
                    margin: 30,
                    nav: $('.flat-teammember').data('nav'),
                    dots: $('.flat-teammember').data('dots'),                     
                    autoplay: $('.flat-teammember').data('auto'),                    
                    responsive:{
                        0:{
                            items: 1
                        },
                        320: {
                            items: 1
                        },
                        480: {
                            items: 2
                        },
                        767:{
                            items: 2
                        },
                        991:{
                            items: 3
                        },
                        1200: {
                            items: $('.flat-teammember').data('item')
                        }
                    }
                });
            }
            if ( $().owlCarousel ) {
                $(this).find('.flat-teammember-full').owlCarousel({
                    loop: true,
                    margin: 0,
                    nav: $('.flat-teammember-full').data('nav'),
                    dots: $('.flat-teammember-full').data('dots'),                     
                    autoplay: $('.flat-teammember-full').data('auto'),                    
                    responsive:{
                        0:{
                            items: 1
                        },
                        320: {
                            items: 1
                        },
                        480: {
                            items: 2
                        },
                        767:{
                            items: 2
                        },
                        991:{
                            items: 3
                        },
                        1200: {
                            items: $('.flat-teammember-full').data('item')
                        }
                    }
                });
            }
            if ( $().owlCarousel ) {
                $(this).find('.flat-teammember-circle').owlCarousel({
                    loop: true,
                    margin: 30,
                    nav: $('.flat-teammember-circle').data('nav'),
                    dots: $('.flat-teammember-circle').data('dots'),                     
                    autoplay: $('.flat-teammember-circle').data('auto'),                    
                    responsive:{
                        0:{
                            items: 1
                        },
                        320: {
                            items: 1
                        },
                        480: {
                            items: 2
                        },
                        767:{
                            items: 2
                        },
                        991:{
                            items: 3
                        },
                        1200: {
                            items: $('.flat-teammember-circle').data('item')
                        }
                    }
                });
            }
        });
    };

    var Section_Slider = function() {
        $(function() {
            if($().fullpage){
            $('#fullpage').fullpage({
               anchors: ['firstPage', 'secondPage', '3rdPage', '4rdPage','5rdPage', 'lastPage'],
               menu: '#menu-slider',
            });
        }
        });
    };

    var tfGallery = function() {
        $('.tf-gallery').each(function(){
            $(this).children('#tf-carousel').flexslider({
                animation: "slide",
                controlNav: true,
                controldot: false,
                animationLoop: false,
                slideshow: false,
                itemWidth: 270,
                itemMargin: 30,
                directionNav: true,
                asNavFor: $(this).children('#tf-slider'),
                prevText: '<i class="ti-angle-left"></i>',
                nextText: '<i class="ti-angle-right"></i>'
            });
            
            $(this).children('#tf-slider').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                directionNav: false,
                sync: $(this).children('#tf-carousel'),
                prevText: '<i class="ti-angle-left"></i>',
                nextText: '<i class="ti-angle-right"></i>'
            });
        });
    };

    var googleMap = function() {
            
        // Gmap Defaults
        if ( $().gmap3 ){
                var data = JSON.parse('[{"address":"São Paulo/SP","content":""}]');
                var data2 = JSON.parse('[{"address":"Av. Irai, 393 - Moema","content":""}]');
                var data3 = JSON.parse('[{"address":"Av. Irai, 393 - Moema","content":""}]');
            $('.maps').gmap3({
                map:{
                    options:{
                        center:[-23.610970, -46.662630],
                        mapTypeId: 'Podes',
                        mapTypeControlOptions: {
                                mapTypeIds: ['Podes', google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID]},
                        zoom: 17,
                    },
                    navigationControl: true,
                   scrollwheel: false,
                   streetViewControl: true
                }
            });

            $('.maps2').gmap3({
                map:{
                    options:{
                        center:[-23.610970, -46.662630],
                        mapTypeId: 'Podes',
                        mapTypeControlOptions: {
                                mapTypeIds: ['Podes', google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID]},
                        zoom: 11,
                    },
                    navigationControl: false,
                   scrollwheel: false,
                   streetViewControl: false
                }
            });

            $('.maps3').gmap3({
                map:{
                    options:{
                        center:[-23.610970, -46.662630],
                        mapTypeId: 'Podes',
                        mapTypeControlOptions: {
                                mapTypeIds: ['Podes', google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID]},
                        zoom: 11,
                    },
                    navigationControl: false,
                   scrollwheel: false,
                   streetViewControl: false
                }
            });
        }

        // Json Loop
        $.each(data, function(key, val) {
                $('.maps').gmap3({
                    marker:{
                        values:[{
                            address:val.address,
                            options:{icon: "images/maps/2.png"},
                            events: {
                                mouseover: function() {
                                    $(this).gmap3({
                                        overlay:{
                                            address:val.address,
                                            options:{
                                                content:  "<div class='infobox text-center'><ul class='list-address'><li>40 Baria Sreet 133/2 NewYork City, US</li><li>Email: info.contact@gmail.com</li><li>Phone: (00) 123 456 789</li></ul><div class='clearfix'></div></div>",
                                                offset:{
                                                    y:32,
                                                    x:-197

                                                }
                                            }
                                        }
                                    });
                                },
                                mouseout: function(){
                                $('.infobox').each(function() {
                                    $(this).remove();
                                });
                                }
                            }
                        }]
                    },
                    styledmaptype:{
                        id: "Podes",
                        options:{
                            name: "SipVoice"
                        },
                        styles:[
                             {
                            "featureType": "all",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "saturation": 36
                                },
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 40
                                }
                            ]
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.text.stroke",
                            "stylers": [
                                {
                                    "visibility": "on"
                                },
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 17
                                },
                                {
                                    "weight": 1.2
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 21
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 17
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 29
                                },
                                {
                                    "weight": 0.2
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 18
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 19
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 17
                                }
                            ]
                        }
                        ]
                    }
                });
        });

        // Json Loop
        $.each(data2, function(key, val) {
                $('.maps2').gmap3({
                    marker:{
                        values:[{
                            address:val.address,
                            options:{icon: "images/maps/2.png"},
                            events: {
                                mouseover: function() {
                                    $(this).gmap3({
                                        overlay:{
                                            address:val.address,
                                            options:{
                                                content:  "<div class='infobox style2 text-center'><ul class='list-address'><li>Av. Irai, 393 cjs 121 122 - Moema</li><li>Email: contato@sipvoice.com.br</li><li>Telefone: (11) 3199-0000</li></ul><div class='clearfix'></div></div>",
                                                offset:{
                                                    y:15,
                                                    x:-165
                                                }
                                            }
                                        }
                                    });
                                },
                                mouseout: function(){
                                $('.infobox').each(function() {
                                    $(this).remove();
                                });
                                }
                            }
                        }]
                    },
                    styledmaptype:{
                        id: "Podes",
                        options:{
                            name: "SipVoice"
                        },
                        styles:[
                        {
                            "featureType": "administrative",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#444444"
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "color": "#f2f2f2"
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "road",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "saturation": -100
                                },
                                {
                                    "lightness": 45
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "visibility": "simplified"
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "color": "#46bcec"
                                },
                                {
                                    "visibility": "on"
                                }
                            ]
                        }
                    ]
                    }
                });
        });

        // Json Loop
        $.each(data3, function(key, val) {
                $('.maps3').gmap3({
                    marker:{
                        values:[{
                            address:val.address,
                            options:{icon: "images/maps/2.png"},
                            events: {
                                mouseover: function() {
                                    $(this).gmap3({
                                        overlay:{
                                            address:val.address,
                                            options:{
                                                content:  "<div class='infobox style2 text-center'><ul class='list-address'><li>sân gôn gần Long Biên, Hà Nội</li><li>Email: info.contact@gmail.com</li><li>Phone: (00) 123 456 789</li></ul><div class='clearfix'></div></div>",
                                                offset:{
                                                    y:15,
                                                    x:-165
                                                }
                                            }
                                        }
                                    });
                                },
                                mouseout: function(){
                                $('.infobox').each(function() {
                                    $(this).remove();
                                });
                                }
                            }
                        }]
                    },
                    styledmaptype:{
                        id: "Podes",
                        options:{
                            name: "SipVoice"
                        },
                        styles:[
                        {
                            "featureType": "administrative",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "saturation": "-100"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative.province",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "saturation": -100
                                },
                                {
                                    "lightness": 65
                                },
                                {
                                    "visibility": "on"
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "saturation": -100
                                },
                                {
                                    "lightness": "50"
                                },
                                {
                                    "visibility": "simplified"
                                }
                            ]
                        },
                        {
                            "featureType": "road",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "saturation": "-100"
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "visibility": "simplified"
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "lightness": "30"
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "lightness": "40"
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "saturation": -100
                                },
                                {
                                    "visibility": "simplified"
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "hue": "#ffff00"
                                },
                                {
                                    "lightness": -25
                                },
                                {
                                    "saturation": -97
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "labels",
                            "stylers": [
                                {
                                    "lightness": -25
                                },
                                {
                                    "saturation": -100
                                }
                            ]
                        }
                    ]
                    }
                });
        });
            
        // Function Clear Markers
        function gmap_clear_markers() {
            $('.infobox').each(function() {
                var args = {duration: 600};
                $(this).slideToggle(args).remove();
            });
        }
    };

    var flatBlogCarousel = function() {
        $('.flat-row').each(function() {            
            if ( $().owlCarousel ) {
                $(this).find('.section-blog-carousel').owlCarousel({
                    loop: true,
                    margin: 0,
                    nav: $('.section-blog-carousel').data('nav'),
                    dots: $('.section-blog-carousel').data('dots'),                     
                    autoplay: $('.section-blog-carousel').data('auto'),                    
                    responsive:{
                        0:{
                            items: 1
                        },
                        320:{
                            items: 1
                        },
                        480:{
                            items: 2
                        },
                        767:{
                            items: 2
                        },
                        991:{
                            items: 3
                        },
                        1200: {
                            items: 4
                        }
                    }
                });
            }
            if ( $().owlCarousel ) {
                $(this).find('.blog_carousel_post').owlCarousel({
                    loop: true,
                    margin: 30,
                    nav: $('.blog_carousel_post').data('nav'),
                    dots: $('.blog_carousel_post').data('dots'),                     
                    autoplay: $('.blog_carousel_post').data('auto'),                    
                    responsive:{
                        0:{
                            items: 1
                        },
                        320:{
                            items: 1
                        },
                        480:{
                            items: 2
                        },
                        767:{
                            items: 2
                        },
                        991:{
                            items: 3
                        },
                        1200: {
                            items: 3
                        }
                    }
                });
            }
            if ( $().owlCarousel ) {
                $(this).find('.flat-group-carousel').owlCarousel({
                    loop: true,
                    margin: 10,
                    nav: $('.flat-group-carousel').data('nav'),
                    dots: $('.flat-group-carousel').data('dots'),                     
                    autoplay: $('.flat-group-carousel').data('auto'),
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
                        1200:{
                            items: $('.flat-group-carousel').data('item')
                        }               
                    }
                });
            } 
        });
    };

    var flat_Timeline_click= function(){          
        if ( $().slick ) {
            $('.wrap-timeline').slick({
              centerMode: true,
              centerPadding: '0px',
              slidesToShow: 3,
              responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        arrows: true,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1
                      }
                },
                {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1
                      }
                },
                {
                    breakpoint: 991,
                    settings: {
                        arrows: true,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1
                      }
                }
              ]
            });
        }
    };

    var Podes_Isotope = function() {         
        if ( $().isotope ) {           
            var $container = $('.isotope-podes');
            $container.imagesLoaded(function(){
                $container.isotope({
                    itemSelector: '.isotope-item',
                    transitionDuration: '1s'
                });
            });

            $('.portfolio-filter li').on('click',function() {                           
                var selector = $(this).find("a").attr('data-filter');
                $('.portfolio-filter li').removeClass('active');
                $(this).addClass('active');
                $container.isotope({ filter: selector });
                return false;
            });

            $('.isotope-item .load-more a').on('click', function(e) {
                e.preventDefault();

                var el = $(this),
                    url = el.attr('href'),
                    page = parseInt(el.attr('data-page'), 10);

                el.addClass('loading').text('Loading...');

                $.ajax({
                    type: "GET",
                    url: url,
                    dataType: "html",
                    async: false,   // wait result
                    data : { page : page }
                })
                .done(function (data) {
                    if ( data !== null ) {                      
                        var newitem = $(data);
                        $container.append(newitem).isotope('appended', newitem);
                        el.removeClass('loading').text('Load more');
                        page = page + 1;
                        el.attr({'data-page': page, 'href': './ajax/p' + page + '.html'});
                    }
                })
                .fail(function () {
                    el.text('No more portfolio to load.');
                })
            });
        };
    };

    var flatClient = function() {
        $('.flat-row').each(function() {            
            if ( $().owlCarousel ) {
                $(this).find('.flat-client').owlCarousel({
                    loop: true,
                    margin: 0,
                    nav: $('.flat-client').data('nav'),
                    dots: $('.flat-client').data('dots'),                     
                    autoplay: $('.flat-client').data('auto'),                    
                    responsive:{
                        0:{
                            items: 2
                        },
                        320: {
                            items: 2
                        },
                        480:{
                            items: 3
                        },
                        767:{
                            items: 4
                        },
                        991:{
                            items: 3
                        },
                        1200: {
                            items: $('.flat-client').data('item')
                        }
                    }
                });
            }
        });
    }; 

    var FlatGallery = function() {
        $('.section-gallery').each(function() {            
            if ( $().owlCarousel ) {
                $(this).find('.wrap-gallery').owlCarousel({
                    loop: true,
                    margin: 0,
                    nav: $('.wrap-gallery').data('nav'),
                    dots: $('.wrap-gallery').data('dots'),                     
                    autoplay: $('.wrap-gallery').data('auto'),                    
                    responsive:{
                        0:{
                            items: 1
                        },
                        320: {
                            items: 1
                        },
                        480:{
                            items: 3
                        },
                        767:{
                            items: 3
                        },
                        991:{
                            items: 4
                        },
                        1200: {
                            items: $('.wrap-gallery').data('item')
                        }
                    }
                });
            }
        });
    };

    var flatAccordion = function() {
        var args = {duration: 600};
        $('.flat-toggle .toggle-title.active').siblings('.toggle-content').show();

        $('.flat-toggle.enable .toggle-title').on('click', function() {
            $(this).closest('.flat-toggle').find('.toggle-content').slideToggle(args);
            $(this).toggleClass('active');
        }); // toggle 

        $('.flat-accordion .toggle-title').on('click', function () {
            if( !$(this).is('.active') ) {
                $(this).closest('.flat-accordion').find('.toggle-title.active').toggleClass('active').next().slideToggle(args);
                $(this).toggleClass('active');
                $(this).next().slideToggle(args);
            } else {
                $(this).toggleClass('active');
                $(this).next().slideToggle(args);
            }     
        }); // accordion
    }; 

    var tabs = function() {
        $('.flat-tabs').each(function() {
            $(this).children('.content-tab').children().hide();
            $(this).children('.content-tab').children().first().show();
            $(this).find('.menu-tab').children('li').on('click', function(e) {  
                var liActive = $(this).index(),
                    contentActive = $(this).siblings().removeClass('active').parents('.flat-tabs').children('.content-tab').children().eq(liActive);

                contentActive.addClass('active').fadeIn('slow');
                contentActive.siblings().removeClass('active');
                $(this).addClass('active').parents('.flat-tabs').children('.content-tab').children().eq(liActive).siblings().hide();
                e.preventDefault();
            });
        });
    };

    var Blancediv = function() {
        $(window).load(function() { 
            if ( $('section').hasClass('blancejqurey1') ) {
                $('.footer').each(function() {
                    var h = document.getElementById("footer-second1").offsetHeight;
                    document.getElementById("footer-second2").style.height = h + "px";
                });
            };
            if ( matchMedia( 'only screen and (min-width: 479px)' ).matches ) {
                if ( $('section').hasClass('blancejqurey2') ) {
                    $('.footer-style').each(function() {
                        var h = document.getElementById("footer-third2").offsetHeight;
                        document.getElementById("footer-third1").style.height = h + "px";
                    });
                };
            }
            if ( $('section').hasClass('blancejqurey3') ) {
                $('.footer-style').each(function() {
                    var h = document.getElementById("footer-five1").offsetHeight;
                    document.getElementById("footer-five2").style.height = h + "px";
                });
            };
            if ( matchMedia( 'only screen and (min-width: 479px)' ).matches ) {
                if ( $('section').hasClass('blancejqurey4') ) {
                    $('.footer-style').each(function() {
                        var h = document.getElementById("footer-seven1").offsetHeight;
                        document.getElementById("footer-seven2").style.height = h + "px";
                    });
                };
            }
            if ( $('section').hasClass('blancejqurey5') ) {
                $('.footer-style').each(function() {
                    var h = document.getElementById("footer-night2").offsetHeight;
                    document.getElementById("footer-night1").style.height = h + "px";
                });
            };

            if ( matchMedia( 'only screen and (min-width: 1280px)' ).matches ) {
                if ( $('section').hasClass('blancevideo1') ) {
                    $('.bance-videoicon').each(function() {
                        var h = document.getElementById("video-icon2").offsetHeight;
                        document.getElementById("video-icon1").style.height = h + "px";
                    });
                };
                if ( $('section').hasClass('blancevideo2') ) {
                    $('.bance-videoicon').each(function() {
                        var h = document.getElementById("video-image1").offsetHeight;
                        document.getElementById("video-image2").style.height = h + "px";
                    });
                };
            }
                
            if ( matchMedia( 'only screen and (min-width: 1280px)' ).matches ) {
                if ( $('section').hasClass('blancetestimonial') ) {
                    $('.bance-testimonial').each(function() {
                        var h = document.getElementById("blance-testimonial1").offsetHeight;
                        document.getElementById("blance-testimonial2").style.height = h + "px";
                    });
                };
            }

            if ( matchMedia( 'only screen and (min-width: 1280px)' ).matches ) {
                if ( $('section').hasClass('blancediv') ) {
                    $('.blance-section').each(function() {
                        var h = document.getElementById("blancediv2").offsetHeight;
                        document.getElementById("blancediv1").style.height = h + "px";
                    });
                };
            }
        });
    };

    var swClick = function () {
        function activeLayout () {
            $(".switcher-container" ).on( "click", "a.sw-light", function() {
                $(this).toggleClass( "active" );
                $('body').addClass('home-boxed');  
                $('body').css({'background': '#f6f6f6' });                
                $('.sw-pattern.pattern').css ({ "top": "100%", "opacity": 1, "z-index": "10"});
            }).on( "click", "a.sw-dark", function() {
                $('.sw-pattern.pattern').css ({ "top": "98%", "opacity": 0, "z-index": "-1"});
                $(this).removeClass('active').addClass('active');
                $('body').removeClass('home-boxed');
                $('body').css({'background': '#fff' });
                return false;
            })       
        }        

        function activePattern () {
            $('.sw-pattern').on('click', function () {
                $('.sw-pattern.pattern a').removeClass('current');
                $(this).addClass('current');
                $('body').css({'background': 'url("' + $(this).data('image') + '")', 'background-size' : '30px 30px', 'background-repeat': 'repeat' });
                return false
            })
        }

        activeLayout(); 
        activePattern();
    } 
    
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

        $('.go-top2').on('click', function() {            
            $("html, body").animate({ scrollTop: 0 }, 1000 , 'easeInOutExpo');
            return false;
        });

        $('.go-top3').on('click', function() {            
            $("html, body").animate({ scrollTop: 0 }, 1000 , 'easeInOutExpo');
            return false;
        });

        $('.arrow-bottom').on('click',function() {
            var anchor = $(this).attr('href').split('#')[1];

            $(this).parent()
                .addClass('current-menu-item')
                .siblings()
                    .removeClass('current-menu-item');

            if ( anchor ) {
                if ( $('#'+anchor).length > 0 ) {
                    var headerHeight = 0;

                    if ( $('body').hasClass('header_sticky')) 
                        headerHeight = $('#header').height();

                    var target = $('#' + anchor).offset().top - headerHeight + 48;

                    $('html,body').animate({scrollTop: target}, 1000, 'easeInOutExpo');
                    
               }
            }
            return false;
            })
    };  

    var retinaLogos = function() {
      var retina = window.devicePixelRatio > 1 ? true : false;

        if(retina) {
            if ( $('.header').hasClass('.logo-style2') ) {
                $('.header .logo').find('img').attr({src:'./images/logo2@2x.png',width:'88',height:'20'});   
            }else{
                $('.header .logo').find('img').attr({src:'./images/logo@2x.png',width:'88',height:'20'}); 
            }

            if ( $('.header-sidebar') ) {
                $('.logo').find('img').attr({src:'./images/logo@2x.png',width:'88',height:'20'}); 
            }

            if ( $('.footer').hasClass('.logo-style2') ) {
                $('.logo-footer').find('img').attr({src:'./images/logo@2x.png',width:'88',height:'20'});   
            }else{
                $('.logo-footer').find('img').attr({src:'./images/logo2@2x.png',width:'88',height:'20'});
            }   
        }
    };    
    
    var parallax = function() {
        if ( $().parallax && isMobile.any() == null ) {
            $('.parallax1').parallax("50%", 0);
            $('.parallax2').parallax("50%", 0);
            $('.parallax3').parallax("50%", 0);
            $('.parallax4').parallax("50%", 0);
            $('.parallax5').parallax("50%", 0);
            $('.parallax6').parallax("50%", 0);
        }
    };

    var popupGallery = function () {
        $(".popup-gallery").magnificPopup({
            type: "image",
            tLoading: "Loading image #%curr%...",
            removalDelay: 600,
            mainClass: "my-mfp-slide-bottom",
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [ 0, 1 ]
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
            }
        });
    }

    var onepage_nav = function () {
        $('.onepage .mainnav > ul > li > a').on('click',function() {           
            var anchor = $(this).attr('href').split('#')[1];
            var largeScreen = matchMedia('only screen and (min-width: 992px)').matches;
            var headerHeight = 0;
            headerHeight = $('#header').height();
            if ( anchor ) {
                if ( $('#'+anchor).length > 0 ) {
                   if ( $('.downscrolled').length > 0 && largeScreen ) {
                        headerHeight = headerHeight;
                   } else {
                        headerHeight = 0;
                   }                   
                   var target = $('#'+anchor).offset().top - headerHeight;
                   $('html,body').animate({scrollTop: target}, 1000, 'easeInOutExpo');
                }
            }
            return false;
        })

        $('.onepage .mainnav ul > li > a').on( 'click', function() {
            $( this ).addClass('active').parent().siblings().children().removeClass('active');
            $(this).parents('#mainnav-mobi').hide();                         
        });
    }  

    var removePreloader = function() {        
        $(window).load(function() { 
            $('.loading-overlay').css('opacity', 0);
            setTimeout(function() {
                $('.loading-overlay').hide(); }, 1000           
            ); 
        }); 

    };

   	// Dom Ready
	$(function() { 
        if ( matchMedia( 'only screen and (min-width: 991px)' ).matches ) {
            headerFixed();
        }  
        responsiveMenu(); 
        topSearch();     
        lastestTweets();
        ajaxSubscribe.eventLoad();
        ajaxContactForm();
        videoPopup();
        flatBlogCarousel();
        Podes_Isotope();
        googleMap(); 
        counter();
        Countdown();
        countdown2();
        progressBar();
        flatTestimonials();
        flatClient();
        flat_Timeline_click();
        Blog_filter_carousel();
        Carousel_Filter();
        FlatGallery();
        Section_Slider();
        tfGallery();
        popupGallery();
        Blancediv();
        swClick();
        goTop();          
        retinaLogos(); 
        parallax();
        flatTeam();
        flatAccordion();
        tabs();
        alertBox();
        onepage_nav();
        detectViewport();
        removePreloader();
   	});

})(jQuery);