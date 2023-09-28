/**

* testimonialCarousel

* portfolioIsotope

* portfolioMasory

* portfolioCarousel

* blogCarousel

* blogMasory

* slider

* logoClient

* googleMap

* themesflatCounter

* videothumbnail

* progressBar

* rowStyling

* spacer

*/



;(function($) {



    'use strict'





    var testimonialCarousel = function() {   

        $('.testimonial-sliders').each(function() {   

            var $this = $(this),datas = $this

                if ( $().owlCarousel ) {   

                    $this.find('.slide_nav .slides').owlCarousel({

                        autoWidth:true,

                        nav: false,

                        dots: false,

                    });

                   $this.find('.testimonial-slider').on('initialized.owl.carousel change.owl.carousel changed.owl.carousel', function(e) { 

                        if (!e.namespace || e.type != 'initialized' && e.property.name != 'position') return;

                        var current = e.relatedTarget.current()

                        var items = $(this).find('.owl-stage').children()

                        var add = e.type == 'changed' || e.type == 'initialized'

                        var owl = $(this);

                        $this.find('.slide_nav li').on("click",function(){

                            owl.trigger("to.owl.carousel", [$(this).parent().index(), 500, true]);

                        })

                        $this.find('.slide_nav li').eq(e.relatedTarget.normalize(current) - 2).toggleClass('current', add);

                    }).owlCarousel({

                        loop: true,

                        margin:datas.data('margin'),

                        nav: Boolean( datas.data('show_direction') )? true: false,

                        dots: Boolean( datas.data('show_control') )? true: false,                   

                        autoplay: Boolean( datas.data('autoplay') )? true: false,       

                        items: datas.data('items'),         

                        responsive:{

                            0:{

                                items: 1

                            },

                            767:{

                                items: next_item(datas.data('items') -1,$this.width())

                            },

                            991:{

                                items: next_item(datas.data('items'),$this.width())

                            },

                            1200: {

                                items: datas.data('items')

                            }

                        }

                    });

                   

                }

        });

    };    

   



    var portfolioIsotope = function() { 

        if ( $( '.portfolio-container' ).hasClass('show_filter_portfolio') ) {

            if ( $().isotope ) {           

                var $container = $('.portfolio-container');

                $container.imagesLoaded(function(){

                    $container.isotope({

                        itemSelector: '.item',

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

            };

        };        

    };



    var portfolioMasory = function() {         

        if ( $().isotope ) {           

            var $container = $('.portfolio-container.masonry');

            $container.imagesLoaded(function(){

                $container.masonry({

                    itemSelector: '.item',

                    transitionDuration: '0.5s',                    

                    layoutMode: 'masonry',                 

                    masonry: { columnWidth: $container.width() / 12 }

                }); // isotope

            });



            $(window).resize(function() {

                $container.masonry({

                   masonry: { columnWidth: $container.width() / 12 }

               });

            }); // relayout        

            

        };

    };   



    var portfolioCarousel = function() {

        if ( $( ".themesflat-portfolio" ).hasClass( "themesflat_enable_carousel" ) ) {            

            if ( $().owlCarousel ) { 

                $('.themesflat-portfolio.themesflat_enable_carousel').find('.portfolio-container').owlCarousel({

                    loop: true,

                    margin: 0,

                    nav: true,

                    dots: true,                   

                    autoplay: false,                

                    responsive:{

                        0:{

                            items: 1

                        },

                        480: {

                            items: 2

                        },

                        767:{

                            items: 2

                        },

                        991:{

                            items: 2

                        },

                        1200: {

                            items: 3

                        }

                    }

                });

            }

        }

    };    



    var blogCarousel = function() {



        if ( $().owlCarousel ) { 

            $(".blog-shortcode.has-carousel:not(.blog-masonry)").each(function() {

                var $this = $(this),_items = $this.data('items');

                $this.owlCarousel({

                    loop: true,

                    margin: 0,

                    nav: true,

                    dots: false,                   

                    autoplay: false,                

                    responsive:{

                        0:{

                            items: next_item(_items-2,$this.width())

                        },

                        767:{

                            items: next_item(_items-1,$this.width())

                        },

                        991:{

                            items: next_item(_items,$this.width())

                        },

                        1200: {

                            items: _items

                        }

                    }

                });

            });

        }

    };  



    var blogMasory = function() {         

        if ( $().isotope ) {           

            var $container = $('.blog-shortcode.blog-masonry');

            $container.imagesLoaded(function(){

                $container.masonry({

                    itemSelector: '.entry',

                    transitionDuration: '0.5s',                    

                    layoutMode: 'masonry',                 

                    masonry: { columnWidth: $container.width() / 12 }

                }); // isotope

            });



            $(window).resize(function() {

                $container.masonry({

                   masonry: { columnWidth: $container.width() / 12 }

               });

            }); // relayout        

            

        };

    };



    var slider = function() {

        if ($().owlCarousel){

            $('.themesflat_enable_slider').each(function() {

                var $this = $(this),

                    datas =  $this;

                    $this.owlCarousel({

                        loop: true,

                        margin:datas.data('margin'),

                        nav: Boolean( datas.data('show_direction') )? true: false,

                        dots: Boolean( datas.data('show_control') )? true: false,                   

                        autoplay: Boolean( datas.data('autoplay') )? true: false,       

                        items: datas.data('slides_per_view'),         

                        responsive:{

                            0:{

                                items: 1

                            },

                            767:{

                                items: next_item(datas.data('slides_per_view') -1,$this.width())

                            },

                            991:{

                                items: next_item(datas.data('slides_per_view'),$this.width())

                            },

                            1200: {

                                items: datas.data('slides_per_view')

                            }

                        }

                    })

            })

        }

    }



    var logoClient = function() {

        $('.themesflat_client_slider').each(function() {             

            if ( $().owlCarousel ) {   

                var data = $(this).find('.themesflat_client_slider_inner');

                $('.themesflat_client_slider_inner').owlCarousel({

                    loop: true,

                    margin: parseInt( data.data('margin') ),

                    nav: Boolean( data.data('hide_buttons') )? false: true, 

                    dots: Boolean( data.data('hide_control') )? false: true,                   

                    autoplay: Boolean( data.data('autoplay') )? true: false,                        

                    responsive:{

                        0:{

                            items: 2

                        },                                              

                        480:{

                            items: 3

                        }, 

                        767:{

                            items: 4

                        },

                        991:{

                            items: 5

                        },

                        1200: {

                            items: parseInt( data.data('slides_per_view') )

                        }

                    }

                });

            }

        });

    };  



    var googleMap = function() {            

        if ( $().gmap3 ) {  

            $("#map").gmap3({

                map:{

                    options:{

                        zoom: 14,

                        mapTypeId: 'themesflat_style',

                        mapTypeControlOptions: {

                            mapTypeIds: ['themesflat_style', google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID]

                        },

                        scrollwheel: false

                    }

                },

                getlatlng:{

                    address:  $('.themesflat-maps').data('address'),

                    callback: function(results) {

                        if ( !results ) return;

                        $(this).gmap3('get').setCenter(new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));

                        $(this).gmap3({

                            marker:{

                                latLng:results[0].geometry.location,

                                options:{

                                    icon: $('.themesflat-maps').data('images')

                                }

                            }

                        });

                    }

                },

                styledmaptype:{

                    id: "themesflat_style",

                    options:{

                        name: "Themesflat Map"

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

                },  

            });

}

$('#map').css( 'height', $('.themesflat-maps').data('height') );

};



var themesflatCounter = function() {

    $('.themesflat_counter').on('on-appear', function() { 

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



var videothumbnail = function() { 

    $(document).on('click',".themesflat_video_embed a",function(e){

        e.preventDefault();

        var iframe = $(this).parent().find('iframe');

        iframe[0].src += "&autoplay=1";

        iframe.show();

        $(this).hide();

    })

}



var progressBar = function() {        

    $('.progress-bar').on('on-appear', function() {

        $(this).each(function() {

            var percent = $(this).data('percent');                

            $(this).find('.progress-animate').animate({

                "width": percent + '%'

            }, $(this).find('.progress-animate').data('duration') );



            $(this).parent('.themesflat-progress').find('.perc').addClass('show').animate({

                "width": percent + '%'

            }, $(this).find('.progress-animate').data('duration') );

        });

    });

};



var rowStyling = function() {

    $(".vc_row").each(function( idx, el ) {

        if ($(this).hasClass('themesflat-overlay')) {

            var class_mask ='<div class="overlay"></div>';

            $(this).append(class_mask);

        }          



    });       

};



var spacer = function() {

    $(".themesflat-spacer").each(function() {



        var spacer_size = $(this).data( 'desktop' );

        if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {

            spacer_size = $(this).data( 'mobile' )

        }



        if ( matchMedia( 'only screen and (max-width: 479px)' ).matches ) {

            spacer_size = $(this).data( 'smobile' )

        }

        

        $(this).css( "height", spacer_size );

    });       

};    



function next_item($item,$width) {

    if (typeof $width =='undefined') {

        $width = 0;

    }

    var $int_item = parseInt($item);

    if ( $int_item -1 > 0) {

        if (($width/$int_item) > 250) {

            return $int_item 

        }

        return $int_item -1;

    }

    else {

        return 1;

    }

}   



    // Dom Ready

    $(function() {        

        testimonialCarousel();        

        portfolioIsotope();

        portfolioMasory();       

        portfolioCarousel();

        blogCarousel();             

        themesflatCounter();

        blogMasory();

        slider();

        logoClient();

        googleMap();

        videothumbnail();

        progressBar();

        rowStyling();   

        spacer();            

    });



})(jQuery);