function scrollWaypointInit(items, trigger) {
    items.each(function () {
        var element = jQuery(this),
            osAnimationClass = element.data("animation"),
            osAnimationDelay = element.attr('data-animation-delay');

        element.css({
            '-webkit-animation-delay': osAnimationDelay,
            '-moz-animation-delay': osAnimationDelay,
            'animation-delay': osAnimationDelay
        });

        var trigger = (trigger) ? trigger : element;

        trigger.waypoint(function () {
            element.addClass('animated').addClass(osAnimationClass);
        }, {
            triggerOnce: true,
            offset: '90%'
        });
    });
} 

jQuery(document).ready(function() {

    // Header Scroll
    var scrolled = false;
    // Checks to see if site banner is enabled, then adds to scroll threshold if so
    var threshold = 100;
    if ($(".site-banner").length) threshold = 75;

    $(window).scroll(function() {
        if (!scrolled && $(this).scrollTop() >= threshold) {
            $("#header-section").addClass("scrolled");
            scrolled = true;
        } else if (scrolled && $(this).scrollTop() <= (threshold - 75)) {
            $("#header-section").removeClass("scrolled");
            scrolled = false;
        }
    });

    // Header Dropdown
    if ($(window).width() > 991) {
        $(".menu-item-has-children").mouseenter(function() {
            $(this).children(".sub-menu").addClass("expanded");
        }).mouseleave(function() {
            $(this).children(".sub-menu.expanded").removeClass("expanded");
        });
    } else {
        $(".header__dropdown-toggle").click(function() {
            $(this).siblings(".sub-menu").toggleClass("expanded");
            $(this).toggleClass("expanded");
        });
    }

    // Header Mobile
    $(".navbar-toggler").click(function() {
        $(".menu-header-menu-container").toggleClass("expanded");
        $(".navbar-toggler").toggleClass("expanded");
    });


    // Accordion
    $(".accordion-item__title").click(function() {
        if ($(this).hasClass("selected")) {
            $(this).siblings(".accordion-item__content").slideUp(300);
            $(this).removeClass("selected");
        } else {
            $(".accordion-item__title.selected + .accordion-item__content").slideUp(300);
            $(".accordion-item__title.selected").removeClass("selected");
            $(this).siblings(".accordion-item__content").slideDown(300);
            $(this).addClass("selected");
        }
    });

    // Image Map
    var map_selected = false;
    $(".image-map__item").hover(
        function() {
            if (!map_selected) {
                var item_id = $(this).attr("id").split("--")[1];
                $("#coordinate--" + item_id).addClass("hover");
            }
        }, function() {
            if (!map_selected) {
                $(".coordinate.hover").removeClass("hover");
            }
        }
    );
    $(".image-map__item").click(function() {
        if (!$(this).hasClass("image-map__item--linked")) {
            var item_id = $(this).attr("id").split("--")[1];
            $(this).addClass("selected");
            $(this).siblings(".image-map__item").hide();
            $("#coordinate--" + item_id).addClass("selected");
            $(".image-map__block-content").hide();
            $("#image-map__close").show();
            map_selected = true;
        }
    });
    $(".coordinate").hover(
        function() {
            if (!map_selected) {
                var item_id = $(this).attr("id").split("--")[1];
                $("#image-map__item--" + item_id + " .image-map__item-title").addClass("hover");
            }
        }, function() {
            if (!map_selected) {
                $(".image-map__item-title.hover").removeClass("hover");
            }
        }
    );
    $(".coordinate").click(function() {
        if (!$(this).hasClass("coordinate--linked")) {
            if (map_selected) {
                $(".image-map__close").click();
            }
            var item_id = $(this).attr("id").split("--")[1];
            $(this).addClass("selected");
            $("#image-map__item--" + item_id).addClass("selected");
            $("#image-map__item--" + item_id).siblings(".image-map__item").hide();
            $(".image-map__block-content").hide();
            $("#image-map__close").show();
            map_selected = true;
        }
    });
    $(".image-map__close").click(function() {
        $(".image-map .selected").removeClass("selected");
        $(".image-map__item").show();
        $(".image-map__block-content").show();
        $("#image-map__close").hide();
        map_selected = false;
    });

    // Leadership
    $(".leadership-item__name").hover(function() {
        $(this).parent().siblings(".leadership-item__image-container").addClass("zoom");
    }, function() {
        $(this).parent().siblings(".leadership-item__image-container").removeClass("zoom");
    });
    $(".leadership-item__image-container").click(function() {
        $("body").addClass("locked");
        $(this).siblings(".leadership-modal").addClass("selected");
    });
    $(".leadership-item__name").click(function() {
        $("body").addClass("locked");
        $(this).parent().siblings(".leadership-modal").addClass("selected");
    });
    $(".leadership-modal__close").click(function() {
        $("body").removeClass("locked");
        $(".leadership-modal.selected").removeClass("selected");
    });
    $(".leadership-modal__mask").click(function() {
        $("body").removeClass("locked");
        $(".leadership-modal.selected").removeClass("selected");
    });

    // Related News Slick Slider
    $('.related-news__main--slick').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
        infinite: false,
        touchThreshold: 1000,
        prevArrow: '<button type="button" class="slick-prev">Previous<svg id="right-arrow-LG" xmlns="http://www.w3.org/2000/svg" width="12.106" height="19.456" viewBox="0 0 12.106 19.456"><g id="Group_163" data-name="Group 163"><path id="Union_1" data-name="Union 1" d="M1.107,18.933l-.581-.584a1.794,1.794,0,0,1,0-2.536L6.612,9.724.532,3.647a1.8,1.8,0,0,1,0-2.539L1.116.523a1.8,1.8,0,0,1,2.536,0l7.932,7.931a1.808,1.808,0,0,1,0,2.543L3.647,18.933a1.8,1.8,0,0,1-2.54,0Z" fill="#212840"/></g></svg></button>',
        nextArrow: '<button type="button" class="slick-next">Next<svg id="right-arrow-LG" xmlns="http://www.w3.org/2000/svg" width="12.106" height="19.456" viewBox="0 0 12.106 19.456"><g id="Group_163" data-name="Group 163"><path id="Union_1" data-name="Union 1" d="M1.107,18.933l-.581-.584a1.794,1.794,0,0,1,0-2.536L6.612,9.724.532,3.647a1.8,1.8,0,0,1,0-2.539L1.116.523a1.8,1.8,0,0,1,2.536,0l7.932,7.931a1.808,1.808,0,0,1,0,2.543L3.647,18.933a1.8,1.8,0,0,1-2.54,0Z" fill="#212840"/></g></svg></button>',
    });

    // Related News Hover
    $(".news-post__title").hover(function() {
        $(this).siblings(".news-post__image").addClass("hover");
    }, function() {
        $(this).siblings(".news-post__image.hover").removeClass("hover");
    });

    // Contact Page
    if (window.location.pathname == "/contact/" && window.location.search.split("topic=")[1]) {
		$(".contact-form #input_1_1 option[value='" + window.location.search.split("topic=")[1] + "']").prop("selected", true);
    }

    scrollWaypointInit( jQuery('.animateMe') );
	
	// Counting Up JS
    if($(".counter__value").length > 0) {
        var a = 0;
        function tickEvent(val){
            if (a == 0 && jQuery(window).scrollTop() > val) {
                jQuery('.counter__value').each(function() {
                    var jQuerythis = jQuery(this);
                    countTo = jQuerythis.attr('data-count');
                    jQuery({
                        countNum: jQuerythis.text()
                    }).animate({
                        countNum: countTo
                    },
                    {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            jQuerythis.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            jQuerythis.text(this.countNum);
                        }
                    });
                });
                a = 1;
            }
        }
        
        jQuery(window).scroll(function() {
            var oTop = jQuery('.counter').offset().top - window.innerHeight;
            tickEvent(oTop);
        });
    }
    // Counting Up JS
    if($(".countup_value").length > 0) {
        var a = 0;
        function tickEvent(val){
            if (a == 0 && jQuery(window).scrollTop() > val) {
                jQuery('.countup_value').each(function() {
                    var jQuerythis = jQuery(this);
                    countTo = jQuerythis.attr('data-count');
                    jQuery({
                        countNum: jQuerythis.text("")
                    }).animate({
                        countNum: countTo
                    },
                    {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            jQuerythis.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            jQuerythis.text(this.countNum);
                        }
                    });
                });
                a = 1;
            }
        }
        
        jQuery(window).scroll(function() {
            var oTop = jQuery('.countup_value').offset().top - window.innerHeight;
            tickEvent(oTop);
        });
    }


// map 
if (window.location.pathname == "/contact/") {
    window.marker = null;
    function initialize() {
      var map;
      var latlng = new google.maps.LatLng(38.7753494,-76.0789517);
  
      var style = [
          
          {
          "featureType": "all",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#f0f0f0"
              }
          ]
      },
      {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#969696"
              }
          ]
      },
      {
          "featureType": "administrative.neighborhood",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#919191"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#6e6e6e"
              }
          ]
      },
      {
          "featureType": "poi.attraction",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#6e6e6e"
              }
          ]
      },
      {
          "featureType": "poi.attraction",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "color": "#6e6e6e"
              }
          ]
      },
      {
          "featureType": "poi.business",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#a4a4a4"
              }
          ]
      },
      {
          "featureType": "poi.business",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "color": "#a4a4a4"
              }
          ]
      },
      {
          "featureType": "poi.government",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#6e6e6e"
              }
          ]
      },
      {
          "featureType": "poi.government",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "color": "#6e6e6e"
              }
          ]
      },
      {
          "featureType": "poi.medical",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#919191"
              }
          ]
      },
      {
          "featureType": "poi.medical",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "color": "#919191"
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#d4d4d4"
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#6e6e6e"
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "color": "#6e6e6e"
              }
          ]
      },
      {
          "featureType": "poi.place_of_worship",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#6e6e6e"
              }
          ]
      },
      {
          "featureType": "poi.place_of_worship",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "color": "#6e6e6e"
              }
          ]
      },
      {
          "featureType": "poi.school",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#6e6e6e"
              }
          ]
      },
      {
          "featureType": "poi.school",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "color": "#6e6e6e"
              }
          ]
      },
      {
          "featureType": "poi.sports_complex",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#6e6e6e"
              }
          ]
      },
      {
          "featureType": "poi.sports_complex",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "color": "#6e6e6e"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#d4d4d4"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#727272"
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
          "featureType": "road.local",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit.station",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#818181"
              }
          ]
      },
      {
          "featureType": "transit.station",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "color": "#818181"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#6e6e6e"
              }
          ]
      }
    ]
  
      var mapOptions = {
          center: new google.maps.LatLng(38.7753494,-76.0789517),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          zoom: 15.18,
          backgroundColor: "#eeeeee",
          panControl: false,
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          overviewMapControl: false,
           fullscreenControl: false,
          zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL
        }  
      };
      
  
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        
        // SET THE MAP TYPE
        var mapType = new google.maps.StyledMapType(style, {name: "Grayscale"});
        map.mapTypes.set('grey', mapType);
        map.setMapTypeId('grey');
      
  
        //CREATE A CUSTOM PIN ICON
        var marker_image = '/wp-content/uploads/location-pin.png';
        var pinIcon = new google.maps.MarkerImage(marker_image, null, null, null, new google.maps.Size(49, 69));
        marker = new google.maps.Marker({
          position: latlng,
          map: map,
          icon: pinIcon,
          title: 'Golland',
        });
        
     
        }
    
    google.maps.event.addDomListener(window, 'load', initialize);  
    }   
  
});