jQuery( document ).ready( function( $ ) {

	'use strict';

	// Set some vars
	var doc = $(document),
		win = $(window),
		body = $('body'),
		header = $('.site-header'),
		headerHeight = header.outerHeight(true),
		menuState = true, // 'true' means 'closed'
		isNavAnimating = false, // check if menu animation is running
		fakeScrollDiv = $( '<div class="scrollbar-measure"></div>' ).appendTo( body )[0], // Create fake div, same scrollbar wdth
	    scrollBarWidth = fakeScrollDiv.offsetWidth - fakeScrollDiv.clientWidth, // Measure scrollbar width
		menuBtn = $('.menu-toggle'),
		openMenuClass = ('is-nav-open'),
		mainNav = $('.main-navigation'),
		navMenu = mainNav.find('.menu'),
		hero = $('.hero'),
		guestPosts = $('.guest-posts'),
		preloader = $('.preloader');

	// Function from David Walsh: http://davidwalsh.name/css-animation-callback
	function whichTransitionEvent(){
		var t,
		el = document.createElement("fakeelement");

		var transitions = {
			"transition"      : "transitionend",
			"OTransition"     : "oTransitionEnd",
			"MozTransition"   : "transitionend",
			"WebkitTransition": "webkitTransitionEnd"
		}

		for (t in transitions){
			if (el.style[t] !== undefined){
				return transitions[t];
			}
		}
	}
	var transitionEvent = whichTransitionEvent();


	// Menu behaviour
	// Inspired to Full-Screen Pushing Navigation by CodyHouse
	// URL: https://codyhouse.co/gem/full-screen-pushing-navigation/
	
	function openMenu() {
		if( !isNavAnimating ) {

			isNavAnimating = true;

			body.addClass( openMenuClass );
			menuBtn.attr( 'aria-expanded', 'true' );
			navMenu.attr( 'aria-expanded', 'true' );
			if ( win.height() < doc.height() ) { // If the page has scrollbar
				body.css( 'margin-right', scrollBarWidth + 'px' );
				header.css( 'right', scrollBarWidth + 'px' );
				mainNav.css( 'padding-right', scrollBarWidth + 'px' );
			}
			mainNav.css( 'overflow', 'hidden' );
			menuState = false;

			mainNav.one( 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
				//animation is over
				isNavAnimating = false;
				mainNav.css( 'overflow', '' );
			});
		}
	}

	function closeMenu() {
		if( !isNavAnimating ) {

			isNavAnimating = true;

			body.removeClass( openMenuClass );
			menuBtn.attr( 'aria-expanded', 'false' );
			navMenu.attr( 'aria-expanded', 'false' );
			body.css( 'margin-right', '' );
			header.css( 'right', '' );
			mainNav.css( 'padding-right', '' );
			mainNav.css( 'overflow', 'hidden' );
			menuState = true;

			mainNav.one( 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
				//animation is over
				isNavAnimating = false;
				mainNav.css( 'overflow', '' );
			});
		}
	}

	function onResizeMenu() {
		if ( 1020 > win.width() ) {
			menuBtn.attr( 'aria-expanded', 'false' );
			navMenu.attr( 'aria-expanded', 'false' );
			menuBtn.attr( 'aria-controls', 'primary-menu' );
		} else {
			menuBtn.removeAttr( 'aria-expanded' );
			navMenu.removeAttr( 'aria-expanded' );
			menuBtn.removeAttr( 'aria-controls' );
			body.removeClass(openMenuClass);
			menuState = true;
		}
	}

	onResizeMenu();
	win.resize(onResizeMenu);

	menuBtn.on( 'click', function( e ) {
		e.stopPropagation();

		if ( menuState ) { // closed -> open
			openMenu();
		} else { // open -> closed
			closeMenu();
		}
	});

	// Close menu clicking anywhere in the page but the side menu
	body.click(function(event) { 
	    if( !$(event.target).closest(navMenu.find('li')).length ) {
	        if( !menuState ) {
	            closeMenu();
	        }
	    }
	});

	// Header behaviour
	function hidingHeader() {

		var heroHeight = hero.outerHeight(true),
			headerHeight = header.outerHeight(true),
			fixedClass = ( 'is-header-fixed' ),
			hiddenClass = ( 'is-header-hidden' ),
			visibleClass = ( 'is-header-visible' ),
			isHeaderStatic = ( 'is-header-static' ),
			isHero = ( 'is-hero' ),
			heroOnClass = ( 'is-hero-on' ),
			transitioningClass = ( 'is-header-transitioning' );

		if( body.hasClass( isHero ) && !body.hasClass( isHeaderStatic ) ) {
			var headerOffset = heroHeight;
			header.addClass( heroOnClass )
		} else {
			var headerOffset = headerHeight;
		}

		doc.advScroll({
		    onUp: function(evt, px, top) {
		    	header.removeClass( hiddenClass ).addClass( visibleClass );
		    	if( body.hasClass( isHero ) && !body.hasClass( isHeaderStatic ) ) {
		    		if( top < headerOffset ) {
		    			header.removeClass( fixedClass );
		    			header.addClass( heroOnClass );
		    		} else {
		    			header.removeClass( heroOnClass );
		    		}
		    	}
		    },
		    onDown: function(evt, px, top) {
		    	header.removeClass( visibleClass );
		    	if( top > headerOffset ) {
		    		if( !header.hasClass( fixedClass ) ) {
		    			header.addClass( hiddenClass );
		    		}
		    		header.addClass( fixedClass );
		    	} else {
		    		header.removeClass( visibleClass );
		    	}
		    	if( body.hasClass( isHero ) && !body.hasClass( isHeaderStatic ) ) {
		    		if( top < headerOffset ) {
		    			header.addClass( heroOnClass );
		    		} else {
		    			header.removeClass( heroOnClass );
		    		}
		    	}
		    },
	        onTop: function(evt, px, top) {
	        	header.removeClass( fixedClass );
	        },
		    upBy: 15, // change to 15
		    downBy: 0,
		    oncePerDirection: false,
		    directionChangeDelayMillis: 0
		});

		doc.advScroll({
		    onUp: function(evt, px, top) {
		    	header.addClass( transitioningClass );
		    	header.one( transitionEvent, function( e ) {
		    		$( this ).removeClass( transitioningClass );
		    	});
		    },
		    onDown: function(evt, px, top) {
		    	if( header.hasClass( fixedClass ) ) {
			    	header.addClass( transitioningClass );
			    	header.one( transitionEvent, function( e ) {
			    		$( this ).removeClass( transitioningClass ).addClass( hiddenClass );
			    	});
			    }
		    },
		    onTop: function(evt, px, top) {

		    },
		    upBy: 15,
		    downBy: 0,
		    oncePerDirection: true,
		    directionChangeDelayMillis: 0
		});
	}

	hidingHeader();

	function initGuestbookCarousel() {

	    guestPosts.each(function () {

	        var $this = $(this);

	        var guestPostsCarousel = new Swiper ($this, {
	        	autoplay: 5000,
	            touchAngle: 30,
	            speed: 700,
	            simulateTouch: false,
	            pagination: '.swiper-pagination',
	            paginationClickable: true
	        });

	    });

	}

	if ( guestPosts.length && guestPosts.is('.is-carousel') && guestPosts.find('.guest-post').length > 1 ) {

	    initGuestbookCarousel();

	}

	// Init Photoswipe
	var PhotoSwipe = window.PhotoSwipe,
		PhotoSwipeUI_Default = window.PhotoSwipeUI_Default;

	if ( $('body').is('.is-lightbox-enabled') ) {

		$('body').on('click', 'a[data-size]', function(e) {

			// Don't init if it's not an image
			if ( !$(this).is('[href$=".jpg"], [href$=".jpeg"], [href$=".png"], [href$=".gif"], [href$=".bmp"]') ) {
				return;
			}

			if( !PhotoSwipe || !PhotoSwipeUI_Default ) {
				return;
			}

			e.preventDefault();
			openPhotoSwipe( this );
		});

	}

	var parseThumbnailElements = function(gallery, el) {
		var elements = $(gallery).find('a[data-size]').has('img'),
			galleryItems = [],
			index;

		elements.each(function(i) {
			var $el = $(this),
				size = $el.data('size').split('x'),
				caption;

			if( $el.next().is('.wp-caption-text') ) {
				// image with caption
				caption = $el.next().text();
			} else if( $el.parent().next().is('.wp-caption-text') ) {
				// gallery icon with caption
				caption = $el.parent().next().text();
			} else {
				caption = $el.attr('title');
			}

			galleryItems.push({
				src: $el.attr('href'),
				w: parseInt(size[0], 10),
				h: parseInt(size[1], 10),
				title: caption,
				// Uncomment this to enable animation
				// http://photoswipe.com/documentation/faq.html#different-thumbnail-dimensions
				// msrc: $el.find('img').attr('src'),
				el: $el
			});
			if( el === $el.get(0) ) {
				index = i;
			}
		});

		return [galleryItems, parseInt(index, 10)];
	};

	var openPhotoSwipe = function( element, disableAnimation ) {
		var pswpElement = $('.pswp').get(0),
			galleryElement = $(element).parents('.gallery, .wp-content-image, .wp-caption, .hentry, .site-main, body').first(),
			gallery,
			options,
			items, index;

		items = parseThumbnailElements(galleryElement, element);
		index = items[1];
		items = items[0];

		options = {
			index: index,
			getThumbBoundsFn: function(index) {
				var image = items[index].el.find('img'),
					offset = image.offset();

				return {x:offset.left, y:offset.top, w:image.width()};
			},
			showHideOpacity: true,
			history: false
		};

		if(disableAnimation) {
			options.showAnimationDuration = 0;
		}

		// Pass data to PhotoSwipe and initialize it
		gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
		gallery.init();
	};

    // Google Maps
    function googleMap() {

        $('.map').each(function (i, e) {

            var $map = $(e),
                $map_lat = $map.attr('data-maplat'),
                $map_lon = $map.attr('data-maplon'),
                $map_zoom = parseInt($map.attr('data-mapzoom')),
                $map_color = $map.attr('data-color'),
                $map_height = $map.attr('data-height');

            var latlng = new google.maps.LatLng($map_lat, $map_lon);
            var options = {
                scrollwheel: false,
                //draggable: true,
                draggable: !('ontouchend' in document), // draggable is false on touch devices, true on all the other ones
                zoomControl: true,
                disableDoubleClickZoom: true,
                disableDefaultUI: true,
                zoom: $map_zoom,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            /* Map's style */
            if ($map_color == 'light') {

                var styles = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}];

            }

            if ($map_color == 'dark') {

                var styles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}];

            }

            var styledMap = new google.maps.StyledMapType(styles, {
                name: "Styled Map"
            });

            var map = new google.maps.Map($map[0], options);

            var marker = new MarkerWithLabel({
				position: latlng,
				icon: {
				path: google.maps.SymbolPath.CIRCLE,
				scale: 0,
				},
				map: map,
				draggable: false,
				labelAnchor: new google.maps.Point(50, 50),
				labelClass: 'custom-marker', // the CSS class for the label
            });

            map.mapTypes.set('map_style', styledMap);
            map.setMapTypeId('map_style');

            // adapt map
            function adaptMapH() {

                var sectionH = $map.parent('#intro').height();
                $map.css({
                    'height': sectionH
                });

            }

            // map height
            function mapHeight() {

                if (!$map.parent('div').is('#intro')) {

                    // user defined size
                    $map.css({
                        'height': $map_height + 'px'
                    });

                } else {

                    adaptMapH();
                    $(window).resize(adaptMapH);

                }

            }

            mapHeight();

            // center map on resize
            google.maps.event.addDomListener(window, "resize", function () {
                var center = map.getCenter();
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);
            });

        });

    }

    if ($('.map').length) {
        googleMap();
    }

    // Preloader
    function initPreloader() {
    	var timeout1;
    	var loading;

    	var myArray = new Array(
    		Array(
    			Array(1,100),
    			Array(3,160),
    			Array(7,340),
    			Array(10,750),
    			Array(13,900),
    			Array(19,1100),
    			Array(43,1400),
    			Array(69,1650),
    			Array(74,2200),
    			Array(83,2500),
    			Array(91,2900),
    			Array(98,3600)
    		),
    		Array(
    			Array(7,100),
    			Array(11,160),
    			Array(13,340),
    			Array(19,750),
    			Array(22,900),
    			Array(26,1100),
    			Array(34,1400),
    			Array(41,1650),
    			Array(49,2200),
    			Array(55,2500),
    			Array(62,2900),
    			Array(74,3600)
    		),
    		Array(
    			Array(2,100),
    			Array(9,160),
    			Array(10,340),
    			Array(14,750),
    			Array(20,900),
    			Array(27,1100),
    			Array(33,1400),
    			Array(35,1650),
    			Array(47,2200),
    			Array(52,2500),
    			Array(67,2900),
    			Array(81,3600)
    		),
    		Array(
    			Array(4,100),
    			Array(11,160),
    			Array(19,340),
    			Array(22,750),
    			Array(34,900),
    			Array(40,1100),
    			Array(41,1400),
    			Array(48,1650),
    			Array(58,2200),
    			Array(67,2500),
    			Array(79,2900),
    			Array(91,3600)
    		),
    		Array(
    			Array(9,100),
    			Array(10,160),
    			Array(17,340),
    			Array(26,750),
    			Array(35,900),
    			Array(48,1100),
    			Array(53,1400),
    			Array(55,1650),
    			Array(62,2200),
    			Array(66,2500),
    			Array(69,3600),
    			Array(71,4600)
    		)
    	);

    	var percentage = myArray[Math.floor(Math.random() * myArray.length)];
    		
    	$(document).ready(function(e) {
    		loading = true;
    		start_loading_handler();
    	});

    	$(window).load(function(e){
    		loading = false;
    		set_loaded(100);
    		end_loading_handler();
    	});

    	function start_loading_handler(){	
    		$.each( percentage, function( index, value ) {
    			timeout1 = setTimeout(
    				function(){
    					if( loading == true ){
    						set_loaded( value[0] );
    					}
    				},value[1]
    			);
    		});
    		
    	}

    	function end_loading_handler() {
    		preloader.find( '.loading' ).fadeOut();
    	    preloader.delay( 350 ).fadeOut( 600 );
    	    setTimeout(function() {
    	           body.removeClass( 'is-loader' );
    	       }, 350);
    	}

    	function set_loaded(percent){
    		preloader.find( '.preloader-subtitle' ).show();
    		preloader.find( '.preloader-counter' ).html( percent + '%' );
    		preloader.find( '.preloader-percentage' ).css( 'width', percent + '%' );
    	}
    }

    if ( body.is( '.is-loader' ) ) {
    	initPreloader();
	}

	// Fitvids init
	$( '.video-wrapper' ).fitVids();

	// Waypoints init
	function scrollAnimations() {
		var waypoints = $( '.block' ).waypoint({
			handler: function() {
				$( this.element ).addClass( 'is-in-view' );
				this.destroy(); // trigger once
			},
			offset: '100%'
		});
	}

	if ( body.is( '.is-block-animation' ) ) {
		scrollAnimations();
	}

	// Mouse scroll icon
	$( '.scroll-icon' ).on( 'click', function() {
		var scrollOffset = $( '.hero' ).height() + ( ( $( '.hero' ).outerHeight( true ) - $( '.hero' ).height() ) / 2 );
		$( 'html, body' ).animate({
	        scrollTop: scrollOffset
	    }, 300 );
	});

});