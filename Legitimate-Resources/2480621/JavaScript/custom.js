var $ = jQuery.noConflict();

//check for browser os
var isMobile = false;
var isiPhoneiPad = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
}

if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    isiPhoneiPad = true;
}

function ScrollStop() {
    return false;
}
function ScrollStart() {
    return true;
}

function image_preload(selector, parameters) {
	var params = {
		delay: 200,
		transition: 400,
		easing: 'linear'
	};
	jQuery.extend(params, parameters);
		
	jQuery(selector).each(function() {
		var image = $(this);
		image.css({visibility:'hidden', opacity: 0, display:'block'});
		image.wrap('<span class="preloader" />');
		image.one("load", function(evt) {
			$(this).delay(params.delay).css({visibility:'visible'}).animate({opacity: 1}, params.transition, params.easing, function() {
				$(this).unwrap('<span class="preloader" />');
			});
		}).each(function() {
			if(this.complete) $(this).trigger("load");
		});
	});
}

function imgFade(){
	$('.image_fade,#top-menu li.top-menu-em a').hover(function(){
		$(this).filter(':not(:animated)').animate({opacity: 0.6}, 400);
	}, function () {
		$(this).animate({opacity: 1}, 400);
	});
};


function tab_widget(tabid) {
    
    var $sidebarWidgets = $('.sidebar-widgets-wrap');
    var $footerWidgets = $('.footer-widgets-wrap');
    
    $( tabid + " .tab_content").hide();
    $( tabid + " ul.tabs li:first").addClass("active").show();
    $( tabid + " .tab_content:first").show();
    $( tabid + " ul.tabs li").click(function() {    
		
        $( tabid + " ul.tabs li").removeClass("active");
        $(this).addClass("active");		
        $( tabid + " .tab_content").hide();
        var activeTab = $(this).find("a").attr("data-href");
        var $selectTab = $(this);
        $(activeTab).fadeIn(600,function(){
            if( $selectTab.parent().parent().hasClass("side-tabs") ) {
                if( $(window).width() < 768 ) { if( $().scrollTo ) { jQuery.scrollTo( activeTab , 400, {offset:-20} ); } }
            }            
        });
        return false;
        
	});
    
}

function related_portfolio() {
	var items_show = 5;
	if( jQuery('.single-creativo_portfolio .sidebar').length > 0 ) {
		items_show = 4;
	}
	
	$('.related_portfolio').owlCarousel({			
		margin: 10,			
		nav: true,
		lazyLoad: true,
		navText: ['<div id="related-portfolio-prev" class="widget-scroll-prev"><i class="fa fa-chevron-left"></i></div>', '<div id="related-portfolio-next" class="widget-scroll-next"><i class="fa fa-chevron-right"></i></div>'],						
		
		dragEndSpeed: 400,
		dotsSpeed: 400,
		dots: false,
		navRewind: true,        	
		responsive:{
			0:{
	            items:1
	        },
	        600:{
	            items:3
	        },
	        1000:{
	            items: items_show
	        }
		}
	});
}

function infinitePostsLoad() {
	// Infinite Scroll v3
		var $container = $('#posts.infinite-posts').infiniteScroll({			
			scrollThreshold: false,
			path: '.pagination-next',		
			hideNav: '.pagination',
			button: '.view-more-button',			
		});

		$container.on( 'load.infiniteScroll', function( event, response, path ) {
			var $items = $( response ).find('.post');
			$items.imagesLoaded( function() {
				$container.append( $items );
				setTimeout( function(){
					imgHoverlay();
					magnific_popup_gallery();
					loadFlexSlider();
				}, 200);
			});  			
		});
}

function loadFlexSlider() {
	if ( jQuery().flexslider ) {
        
        jQuery('.fslider .flexslider').each(function() {
            
            var flexsAnimation = $(this).parent('.fslider').attr('data-animate');
            var flexsEasing = $(this).parent('.fslider').attr('data-easing');
            var flexsDirection = $(this).parent('.fslider').attr('data-direction');
			var flexsDirectionNav = $(this).parent('.fslider').attr('data-direction-nav');
            var flexsSlideshow = $(this).parent('.fslider').attr('data-slideshow');
            var flexsPause = $(this).parent('.fslider').attr('data-pause');
			var flexsPauseHover = $(this).parent('.fslider').attr('data-pause-hover');
            var flexsSpeed = $(this).parent('.fslider').attr('data-speed');
            var flexsVideo = $(this).parent('.fslider').attr('data-video');
            var flexsSheight = true;
            var flexsUseCSS = false;
            
            if( !flexsAnimation ) { flexsAnimation = 'slide'; }
            if( !flexsEasing || flexsEasing == 'swing' ) {
                flexsEasing = 'swing';
                flexsUseCSS = true;
            }
            if( !flexsDirection ) { flexsDirection = 'horizontal'; }
            if( !flexsSlideshow ) { flexsSlideshow = false; }
			if( !flexsDirectionNav ) { flexsDirectionNav = false; }
            if( !flexsPause ) { flexsPause = 5000; }
			if( !flexsPauseHover ) { flexsPauseHover = false; }
            if( !flexsSpeed ) { flexsSpeed = 600; }
            if( !flexsVideo ) { flexsVideo = false; }
            if( flexsDirection == 'vertical' ) { flexsSheight = false; }
            
            $(this).flexslider({
                
                selector: ".slider-wrap > .slide",
                animation: flexsAnimation,
                easing: flexsEasing,
                direction: flexsDirection,
                slideshow: flexsSlideshow,
                slideshowSpeed: Number(flexsPause),
                animationSpeed: Number(flexsSpeed),
                pauseOnHover: flexsPauseHover,
				prevText: "<i class=\"fa fa-angle-left\"></i>",
				nextText: "<i class=\"fa fa-angle-right\"></i>",
                video: flexsVideo,
                controlNav: false,
                directionNav: flexsDirectionNav,
                smoothHeight: flexsSheight,
                useCSS: flexsUseCSS,
                start: function(slider){
                    slider.parent('.fslider').removeClass('preloader2');
                    slider.parent('.fslider').parent('.port-gallery').removeClass('preloader');
                }
                
            });
        
        });
    
    }
}

function imgHoverlay(){
	$('.portfolio-overlay').each( function() { $(this).hoverdir({
		hoverDelay : 0
	}); } );
	$('.portfolio-image, .portfolio-image-round, .ipost-image, .entry_image_sh, .rpost-image, #portfolio-related-items .related_portfolio_items, .slide, .vertical_related_posts .entry_image').hover(function(){
		$(this).find('.portfolio-overlay,.portfolio-overlay-round').filter(':not(:animated)').animate({opacity: 'show'}, 400);
	}, function () {
		$(this).find('.portfolio-overlay,.portfolio-overlay-round').animate({opacity: 'hide'}, 200);
	});
	
};

function portfolioItemsFilter(){  
	/*$('.grid-container').each( function() {                      
		var $container = $('#portfolio').imagesLoaded( function() {
			$('#portfolio').isotope();
		});              
	                
	    $('.portfolio-filters a').click(function(){
	                    
	    	$('#portfolio-filter li').removeClass('activeFilter');
	        $(this).parent('li').addClass('activeFilter');
	        var selector = $(this).attr('data-filter');
	        $container.isotope({ filter: selector });
	        return false;
	                    
	    });
	                
	    $(window).resize(function() {
	    	$container.isotope('reLayout');
		});
	});*/

	// for each container
	  $('.grid-container').each( function( i, gridContainer ) {
	    var $gridContainer = $( gridContainer );
	    // init isotope for container
	    var $grid = $gridContainer.find('.portfolio_grid').imagesLoaded( function() {
			$grid.isotope({
				itemSelector: '.portfolio-item',
				//layoutMode: 'packery'
			})
			$(window).resize(function() {
				$grid.isotope('reLayout');
			});
	    });
	    // initi filters for container
	    $gridContainer.find('.portfolio-filters').on( 'click', 'li a', function(e) {
	    	e.preventDefault();
	    	var filterValue = $( this ).attr('data-filter');
	    	$grid.isotope({ filter: filterValue });
		});
		
	  });
	    
	  $('.portfolio-filters').each( function( i, buttonGroup ) {
	    var $buttonGroup = $( buttonGroup );
	    $buttonGroup.on( 'click', 'li a', function(e) {
	    	e.preventDefault();
	    	$buttonGroup.find('.active').removeClass('active');
	    	$( this ).addClass('active');
	    });
	  });
};

function recent_works() {
	$('.portfolio-wrapper').each(function() {	
		var portCols = $(this).attr('data-cols');
		var portColsMd = $(this).attr('data-cols-md');
		var portColsSm = $(this).attr('data-cols-sm');
		var nav = $(this).attr('data-nav'), 
			nav_bool = true, 
			dots_bool = false;
		if(nav =='dots') {
			nav_bool = false;
			dots_bool = true;
		}				

		/*var portSpeed = $(this).attr('data-speed');
        var portPause = $(this).attr('data-pause');
        var portAuto = $(this).attr('data-auto');
		var portFX = $(this).attr('data-effect');
        
        if( !portSpeed ) { portSpeed = 300; }
        if( !portPause ) { portPause = 8000; }
        if( portAuto == 'true' ) { portAuto = Number(portPause); } else { portAuto = false; }*/
        $(this).find('.scroll-portfolio').owlCarousel({
	    	items: portCols,
	    	margin: 15,			
			nav: nav_bool,
			dots: dots_bool,
			lazyLoad: true,
			//autoplay: play,		
			autoplayHoverPause: true,
			//autoplayTimeout: testimonialPause,
			navText: ['<div id="home-portfolio-prev" class="widget-scroll-prev"><i class="fa fa-chevron-left"></i></div>', '<div id="home-portfolio-next" class="widget-scroll-next"><i class="fa fa-chevron-right"></i></div>'],				
			dragEndSpeed: 600,
			autoplaySpeed: 800,
			navSpeed: 600,		
			loop: true,
			responsive:{
				0:{
					items: parseInt(portColsSm)
				},
				768:{
					items: parseInt(portColsMd)
				},
				1024: {
					items: parseInt(portCols)
				}	        
			} 		   	
	    });

        /*
        $(this).find('#portfolio-shortcode').carouFredSel({
        	width : "100%",
			height : "auto",
			circular : false,
			responsive : true,
			infinite : false,
			auto : portAuto,
			items : {
				width : 290,
				visible: {
					min: 1,
					max: 4
				}
			},
			scroll : {						
                fx : portFX,
                duration : Number(portSpeed),
				pauseOnHover: portPause,
                wipe : true
			},
			
			prev: jQuery(this).find('.widget-scroll-prev'),
			next: jQuery(this).find('.widget-scroll-next'),
			
			onCreate : function () {
				setTimeout (function() {
					$(window).on('resize', function(){
						$(this).parent().add($(this)).css('height', $(this).children().first().outerHeight() + 'px');
					}).trigger('resize');
				},100);
			}
        });*/
    
    });
}



// FAQs filtering
function faqItemsFilter(){	
	$('.faqs_wrap').each(function() {	
		var faqName = $(this).attr('data-name');		
		var $faqItems = $('#faqs' +faqName+ ' .toggle');              	
		$('#faq-filter'+faqName+' a').click(function(){			
			$('#faq-filter'+faqName+' li').removeClass('activeFilter');			
			$(this).parent('li').addClass('activeFilter');			
			var faqSelector = $(this).attr('data-filter');		
			$faqItems.css('display', 'none');			
			if( faqSelector != ('all'+faqName) ) {				
				$( faqSelector ).fadeIn(500);				
			} else {				
				$faqItems.fadeIn(500);
			}			
			return false;			
		}); 	
	});           
};

function toggles_function(){ 
	$(".togglec").hide();		
	$(".togglec.open").show();	
	$(".togglet").click(function(){		   
	   var $this = $(this);          
        if ( $this.hasClass('toggleta') ) {
        	$this.removeClass('toggleta').next().slideUp(500);
        } 
        else {
        	$this.addClass('toggleta').next().slideDown(500);
        }
	});
}

jQuery.fn.testimonials_carousel = function() {
	
	//var testimonialSpeed = $(this).attr('data-speed');
    var testimonialPause = $(this).attr('data-pause'), play, testimonialAutoPlay = $(this).attr('data-auto');    
   
    if( !testimonialPause ) { testimonialPause = 2000; }
    if( testimonialAutoPlay === 'true' ) { play = true; } else { play = false; }

    //console.log('Testimonial is'+play);

    $(this).find('.testimonials').owlCarousel({
    	items: 1,
    	margin: 0,			
		nav: true,
		/*lazyLoad: true,*/
		autoplay: play,		
		autoplayHoverPause: true,
		autoplayTimeout: testimonialPause,
		navText: ['<div id="widget-testimonial-2-prev" class="widget-scroll-prev"><i class="fa fa-chevron-left"></i></div>', '<div id="widget-testimonial-2-next" class="widget-scroll-next"><i class="fa fa-chevron-right"></i></div>'],				
		dragEndSpeed: 600,
		autoplaySpeed: 800,
		navSpeed: 600,		
		loop: true,
		dots:false       	
		
    });
}

jQuery.fn.clients_carousel = function() {
	
	//var clientsSpeed = $(this).attr('data-speed');
    var clientsPause = $(this).attr('data-pause');
    var clientsAutoPlay = $(this).attr('data-auto');
	var clientsCol = $(this).attr('data-columns');
	var clientsColMd = $(this).attr('data-columns-md');
	var clientsColXs = $(this).attr('data-columns-xs');
	//var clientsFX = $(this).attr('data-effect');	

	//console.log(clientsCol);    
   
    if( !clientsPause ) { clientsPause = 2000; }      

    if( clientsAutoPlay === 'true' ) { clientsAutoPlay = true; } else { clientsAutoPlay = false; } 

    $(this).find('.our-clients').owlCarousel({
    	items: parseInt(clientsCol),
    	margin: 0,			
		nav: true,
		lazyLoad: true,
		autoplay: clientsAutoPlay,
		autoplaySpeed: 600,
		autoplayHoverPause: true,
		autoplayTimeout: clientsPause,
		navText: ['<div class="widget-scroll-prev" id="widget-testimonial-2-prev"><i class="fa fa-chevron-left"></i></div>', '<div class="widget-scroll-next" id="widget-testimonial-2-next"><i class="fa fa-chevron-right"></i></div>'],				
		dragEndSpeed: 600,
		navSpeed: 600,		
		loop: true,
		dots:false,
		responsive:{
			0:{
	            items: parseInt(clientsColXs)
	        },
	        600:{
	            items: parseInt(clientsColMd)
	        },
	        1000: {
	        	items: parseInt(clientsCol)
	        }	        
		}      	
		
    });   
    
}

jQuery.fn.portfolio_widget_carousel = function() {

    $(this).find('.portfolio-widget-scroll').owlCarousel({
    	items: 1,
    	margin: 0,			
		nav: true,
		lazyLoad: true,
		autoplay: false,		
		navText: ['<div class="widget-scroll-prev" id="widget-portfolio-prev"><i class="fa fa-chevron-left"></i></div>', '<div class="widget-scroll-next" id="widget-portfolio-next"><i class="fa fa-chevron-right"></i></div>'],				
		dragEndSpeed: 600,
		navSpeed: 600,		
		loop: true,
		dots:false   	
    });   
    
}

function nv_counter(){
	var $counterElement = jQuery('.counter');
	if( $counterElement.length > 0 ){
		$counterElement.each(function(){
			var element = $(this);
			var counterWithComma = $(this).find('span').attr('data-comma');
			if( !counterWithComma ) { counterWithComma = false; } else { counterWithComma = true; }
				element.appear( function(){
					runCounter( element, counterWithComma );
				},{accX: 0, accY: -120},'easeInCubic');			
		});
	}
}	

function runCounter( counterElement,counterWithComma ){
	if( counterWithComma == true ) {
		counterElement.find('span').countTo({
			formatter: function (value, options) {
				value = value.toFixed(options.decimals);
				value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
				return value;
			}
		});
	} else {
		counterElement.find('span').countTo();
	}
}

function nv_countdown() {
	if (jQuery('.cr-countdown').length > 0) {
		jQuery('.cr-countdown').each(function () {
		  	var $this = $(this),
		    $date = $this.attr('data-date'),
		    $offset = $this.attr('data-offset'); 
		  	$this.downCount({
			    date: $date,
			    offset: $offset	       
		  	});
		});
	}
}

jQuery.fn.google_maps = function() {
	
	var geocoder;
	var map;
	var id = $(this).attr('data-id');
	var address = $(this).attr('address');	
	
	var map_design = $(this).attr('data-map');
	var zoomEl = $(this).attr('data-zoom');
	var titleEl = $(this).attr('data-title'); 
	var popupEl = ( $(this).attr('data-popup') === "true" );
	var scrollwheelEl = ( $(this).attr('data-scrollwheel') === "true" );
	var panEl = ( $(this).attr('data-pan') === "true" );
	var zoom_controlEl = ( $(this).attr('data-zoom_control') === "true" );
	var type_controlEl = ( $(this).attr('data-type_control') === "true" );
	var streetviewEl = ( $(this).attr('data-streetview') === "true" );	
	
	mapEl = 'terrain';

	if(titleEl) { 
		titleEl = '<h3>'+titleEl+'</h3>';
	}
	var messageEl = $(this).attr('data-message');
	if( messageEl ) {
		messageEl = '<p>'+messageEl+'</p>';
	}
	var phoneEl = $(this).attr('data-phone');
	if( phoneEl ) {
		phoneEl = '<p class="nobottommargin"><icon class="fa fa-phone"></icon>&nbsp;&nbsp;'+phoneEl+'</p>';
	}
	var emailEl = $(this).attr('data-email');
	if( emailEl ) {
		emailEl = '<p><icon class="fa fa-envelope"></icon>&nbsp;&nbsp;'+emailEl+'</p>';
	}

	//function initialize() {
	  	//var myLatlng = new google.maps.LatLng(lat,lng);
	  
	  	var mapOptions = {
			zoom: parseInt(zoomEl),							
			mapTypeId: google.maps.MapTypeId[map_design],				
			scrollwheel: scrollwheelEl,				
			panControl: panEl, //da
			zoomControl: zoom_controlEl, //da
			mapTypeControl: type_controlEl, //da
			overviewMapControl: false, //da
			streetViewControl: streetviewEl, //da
	  	}
	  	//var map = new google.maps.Map(document.getElementById(id), mapOptions);				
	
	  	//map.setMapTypeId(google.maps.MapTypeId[map_design]);	
	  
	  				
	
	  geocoder = new google.maps.Geocoder();
	  // var latlng = new google.maps.LatLng(-34.397, 150.644);
	  
		var contentString = '<div>'+titleEl+messageEl+'<p class="nobottommargin"><icon class="fa fa-home"></icon>&nbsp;&nbsp;'+address+'</p>'+phoneEl+emailEl+'</div>';
	
		var infowindow = new google.maps.InfoWindow({
	  		content: contentString,
			maxWidth: 300,					  
	    });

	  geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
		  map.setCenter(results[0].geometry.location);
		  
		  var marker = new google.maps.Marker({
			  map: map,
			  //title: 'New York',
			  position: results[0].geometry.location
		  });
		  
		  google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		  });
		  if( popupEl ) {
		  	google.maps.event.addListenerOnce(map, 'idle', function() {
			  setTimeout(function() {
				// wait some more (...)
				google.maps.event.trigger(marker, 'click'); //still doesn't work?
			  },400);
			});	
		  }
		  
		} else {
		  alert('Geocode was not successful for the following reason: ' + status);
		}
	  });
	 
	  map = new google.maps.Map(document.getElementById(id), mapOptions);

	//}
	
	//google.maps.event.addDomListener(window, 'load', initialize);
		
}

// php strstr alternative for jquery
function strstr(haystack, needle, bool) {
  //  discuss at: http://phpjs.org/functions/strstr/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // bugfixed by: Onno Marsman
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //   example 1: strstr('Kevin van Zonneveld', 'van');
  //   returns 1: 'van Zonneveld'
  //   example 2: strstr('Kevin van Zonneveld', 'van', true);
  //   returns 2: 'Kevin '
  //   example 3: strstr('name@example.com', '@');
  //   returns 3: '@example.com'
  //   example 4: strstr('name@example.com', '@', true);
  //   returns 4: 'name'

  var pos = 0;
  haystack += '';
  pos = haystack.indexOf(needle);
  if (pos == -1) {
    return false;
  } else {
    if (bool) {
      return haystack.substr(0, pos);
    } else {
      return haystack.slice(pos);
    }
  }
}

function magnific_popup_gallery() {

	$('.magnific_popup_gallery').magnificPopup({
		type: 'image',			
		fixedContentPos: false,
	    mainClass: 'mfp-zoom-in', 
	    removalDelay: 200,
		gallery:{
	    	enabled:true
	  	}
	});

	$('.individual_gallery').each( function() {
		$(this).magnificPopup({
			delegate: 'a', // the selector for gallery item
	        type: 'image',
	        fixedContentPos: false,
		    mainClass: 'mfp-zoom-in', 
		    removalDelay: 200,
	        gallery: {
	          enabled:true
	        }
		});
	});
}

function magnific_popup_video() {
	$('.magnific_video_popup').magnificPopup({
		type: 'iframe', 
		fixedContentPos: false,
	    mainClass: 'mfp-zoom-in', 
	    removalDelay: 400
	});
}

jQuery(document).ready(function($) {

	if($('body[data-loading-effect="true"]').length > 0 ) {
		
		$('html').addClass('page-trans-loaded');

		$('#page_loading_effect').transition({'opacity':0},500,function(){ 
			$(this).css({'display':'none'}); 
		}); 
		
		$('#page_loading_effect .load_symbol').transition({'opacity':0},500);				
			
	}

	else {	
		setTimeout(function(){
			jQuery('#wrapper').animate({opacity: 1});		
		}, 100);
		setTimeout(function(){
			jQuery('#footer_wrap').animate({opacity: 1});		
		}, 300);
	}

	if($('.wpcf7 .style1').length > 0) {
		var $i = 1;
		$('.wpcf7 .style1').each(function() {
			$('.wpcf7 br').remove();
			console.log('this is form ' + $i);
			$i++;
		});
	}

	if(jQuery('.single-creativo_portfolio').length > 0) {
		related_portfolio();
	}

	/* Run Counter */

	nv_counter();

	nv_countdown();
	
	/* Magnific Popup Gallery */
	magnific_popup_gallery();

	/* Magnific Popup Video */
	magnific_popup_video();

	/* Infinite Posts enable */
	if(jQuery('.infinite-posts').length > 0) {
		infinitePostsLoad();
	}

	/* WOW animations */
	wow = new WOW(
      {
      boxClass:     'wow',      // default
      animateClass: 'animated', // default
      offset:       0,          // default
      mobile:       false,       // default
      live:         true        // default
    }
    )
    wow.init();

			//smooth scrolling for One Page template
			
			$(function() {			  	
			  jQuery('#nav.one-page-template a').click(function() {
				if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				  var target = $(this.hash);
				  var id = $(this).attr('href');
				  console.log(id);
				  var header = $('header').attr('header-version');
				  var header_height = jQuery('header').outerHeight();
				  
				  if (header == 'v2' || header == 'v3') header_height = 142;				  
				  
				  //alert(header_height);
				  target = target.length ? target : $('[name="' + this.hash.slice(1) +']"');
				  if (target.length && (id != '#home')) {
				  	//console.log('navigate to section');
					$('html,body').animate({ scrollTop: target.offset().top - 71 }, 1000);
					return false;
				  }
				  else {
				  	if( id=='#home') {
					  	//console.log('du-te sus');
					  	$('html,body').animate({ scrollTop: 0}, 1000);
						return false;
					}
				  }
				}
			  });
			  jQuery('#mobile-menu.one-page-template a').click(function() {
				if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
					var target = $(this.hash);
					var id = $(this).attr('href'),
						$body = $('body'),
						mobileHeader = ( $('#header').outerHeight() || 0 );

				  	if ( $body.hasClass( 'opened-nav' ) ) {
						$body.removeClass( 'opened-nav' ).addClass( 'closed-nav' );
						$('#mobile-menu').stop(true,true).slideToggle(500);				
					}					
				  
					target = target.length ? target : $('[name="' + this.hash.slice(1) +']"');
					if (target.length && (id != '#home')) {
						$('html,body').animate({ scrollTop: target.offset().top - mobileHeader}, 1000);
					return false;
					}
					else if (id === '#home') {
						console.log('we are here');
						$('html,body').animate({ scrollTop: 0}, 1000);
					return false;
					}
				}
			  });
			});		
			
			// Scroll to Top
			//if($(window).width() > 979) {        
				$(window).scroll(function() {
					if($(this).scrollTop() > 450) {
						$('#gotoTop').fadeIn();
					} else {
						$('#gotoTop').fadeOut();
					}
				});				
				
				$('#gotoTop').click(function() {
					$('body,html').animate({scrollTop:0},400);
					return false;
				});
			//}
			
			//test if vc-editor is enabled or not
			if(!strstr(window.location.href, 'vceditor=true')) {
				jQuery(".player").mb_YTPlayer();
			}

			if(jQuery('.sticky-header').length >= 1) {			 

				 if(marginWrapper > 0 && topBarHeight > 0) {
					 topBarHeight = topBarHeight + marginWrapper;
				 }
				 
				 if(marginWrapper > 0 && !topBarHeight) {
					 topBarHeight = marginWrapper;
				 }
				
				 if(!topBarHeight) {
					topBarHeight = 0;
				 }
				/*
				 if(wrapperTop) {
				 	topBarHeight = topBarHeight + 3;
				 }*/
				 header_top_bar = topBarHeight + headerHeightOut;

				 /*console.log(currentPos);
				 console.log(topBarHeight);
				 console.log(headerHeightOut);*/

				/* if page loads on a different location, other than the top */

				if($(window).width() > 979) {
					var header_top_bar,
					logo = jQuery('#logo img').height(),
					logoResized = jQuery('#header').attr('data-logo-resize'),
				 	headerHeightOut = jQuery('#header').outerHeight(),
				 	transparentHeader = jQuery('#header').attr('data-transparent-header'),
				 	wrapperTop,
				 	adminBar = jQuery('body.admin-bar'),
					menuitem = jQuery('html:not(.js) #header nav > ul > li > a').height(),
				 	topBarHeight = ( jQuery('#top-bar').outerHeight()  || 0 ),
				 	currentPos = jQuery(document).scrollTop(),
				 	headerResize = jQuery('#header').attr('data-header-resize'),
				 	marginWrapper = parseInt(jQuery("#wrapper").css("margin-top"));

				 	header_top_bar = topBarHeight + headerHeightOut;

					if(currentPos >= topBarHeight) {

						jQuery('.sticky-header').addClass('sticky');
						if(transparentHeader != 'true') {
							jQuery('#content').css('padding-top',headerHeightOut);
						}
					}

					if(jQuery('body[data-layout="boxed"]'.length>=1)) {
						wrapperTop = parseInt(jQuery('#wrapper').css('margin-top'));
					}

					topBarHeight = topBarHeight + wrapperTop;

					//console.log(topBarHeight);

					if (currentPos>header_top_bar){
								
						$('.sticky #logo img').animate({ height: logoResized },80);
						$('html:not(.js) #header.sticky nav > ul > li > a, .header_extra_icons .main_menu_search a, .header_extra_icons .cart a').animate({ 'line-height': logoResized },80);
						
						//$('#header.sticky-header').addClass("reduced");
					}				
					
					jQuery(window).scroll(function() {
						var header = jQuery(document).scrollTop(),
							headerHeightOut = jQuery('#header').outerHeight();							
			
						if(header > topBarHeight) {
							//jQuery('.header-v1,.header-v2,.header-v3,.header-v4,.header-v5').hide();
							jQuery('.sticky-header').addClass('sticky');
							if(transparentHeader == 'true') {
								jQuery('#header').removeClass('transparent');
							}
							/*if ( $(window).width() < 979){							
								jQuery('#mobile-menu').addClass('sticky-mobile').css('top',spaceAbove);

							}*/
							
							if(transparentHeader != 'true') {
								jQuery('#content').css('padding-top',headerHeightOut);
							}
							//jQuery('.sticky').fadeIn();
							if (headerResize == 'true' && $(this).scrollTop() > header_top_bar){
								
								$('#header.sticky-header').addClass("reduced");
							}
							else{							
								$('#header.sticky-header.reduced').removeClass("reduced");
							}
							
						 } else {
							//jQuery('.header-v1,.header-v2,.header-v3,.header-v4,.header-v5').show();
							jQuery('.sticky-header').removeClass('sticky');
							jQuery('#content').css('padding-top','');
							jQuery('#mobile-menu').removeClass('sticky-mobile').css('top','');
							if(transparentHeader == 'true') {
								jQuery('#header').addClass('transparent');
							}
							currentPos = 0;
							//jQuery('.sticky-header').hide();
						 }
					});
				}
				else {
					setTimeout(function(){
						var headerHeight = ( jQuery('#header').outerHeight() || 0 ),
							topBarHeightMobile = ( jQuery('#top-bar').height() || 0 ),
							spaceAbove;

							console.log(topBarHeightMobile);
							
						if( jQuery('body').hasClass('admin-bar') ) { spaceAbove = headerHeight + 46; } else { spaceAbove = headerHeight; }
						
						if(topBarHeightMobile == 0) {
							jQuery('.sticky-header').addClass('sticky');
							jQuery('#content').css('padding-top',headerHeight);
							jQuery('#mobile-menu').addClass('sticky-mobile').css('top',spaceAbove);
						}
						else {
							jQuery(window).scroll(function() {
								var headerMobile = jQuery(document).scrollTop();
								if(headerMobile > topBarHeightMobile) {
									jQuery('.sticky-header').addClass('sticky');
									jQuery('#content').css('padding-top',headerHeight);
									jQuery('#mobile-menu').addClass('sticky-mobile').css('top',spaceAbove);
								}
								else {
									jQuery('.sticky-header').removeClass('sticky');
									jQuery('#mobile-menu').removeClass('sticky-mobile').css('top','');
									jQuery('#content').css('padding-top','');
								}
							});
						}
					},100);
				}
			}

		if(jQuery('.single-post #header[data-transparent-header="true"]').length > 0 && jQuery('.sp_featured_images_wrap').length > 0) {
			var headerHeight = ( jQuery('#header').outerHeight() || 0 ),
				spFeaturedImage;
				spFeaturedImage = parseInt(headerHeight) + 550;

			jQuery('.sp_featured_images_wrap').css('height',spFeaturedImage);
		}
		if(jQuery('.sp_featured_images_wrap').length > 0) {
			//var opacity = 1;
			jQuery(window).scroll(function() {
				var dt = jQuery(document).scrollTop(),				
					wh = $(window).height(),
					title = jQuery('.sp_title_meta'),
					titleOffset  =  (title.offset().top - dt),
					opacity = 1- (dt/320);


				if(titleOffset  > 0 && opacity > 0) {
					jQuery('.sp_title_meta').css('opacity', opacity);					
					
				}			
			});
		}
		// Tabs
		//When page loads...
		$('.tab_widget').each(function() {
			$(this).find(".tab_content").hide(); //Hide all content
			$(this).find("ul.tabs li:first").addClass("active").show(); //Activate first tab
			$(this).find(".tab_content:first").show(); //Show first tab content
		});
		
		//On Click Event
		$("ul.tabs li").click(function(e) {
			$(this).parents('.tab_widget').find("ul.tabs li").removeClass("active"); //Remove any "active" class
			$(this).addClass("active"); //Add "active" class to selected tab
			$(this).parents('.tab_widget').find(".tab_content").hide(); //Hide all tab content
	
			var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
			$(this).parents('.tab_widget').find(activeTab).fadeIn(); //Fade in the active ID content
			
			e.preventDefault();
		});
		
		$("ul.tabs li a").click(function(e) {
			e.preventDefault();
		})
		
		//Call to action auto padding
		
			$('.promo').each(function() {				
				var align = $(this).attr('data-style');			
				if(align != 'center') {
					var button_width = $(this).find('.promo-action').width();

					if($(window).width() > 767) {
						$(this).find('.promo-desc').css('padding-right', button_width);				
					}
				}
				
			});
				
			if($(window).width() > 767) {	
				var button_cta = $('#call_action .promo-action').width()+35;		
				$('#call_action .promo-text').css('padding-right', button_cta);				
			}
			
			$('.woocommerce_message').each(function() {
				$(this).find('.button.wc-forward').addClass('simple-button default_color small inverse').removeClass('button wc-forward');
			});
			
			$('.checkout_log').each(function() {
				$(this).find('.button').addClass('simple-button default_color small inverse').removeClass('button');
			});


		$(document).on('.btn-hamburger', function () {
	        $('.hamburger-menu').toggleClass('show-menu');
	        $('body').removeClass('show-menu');
	    });	
			
				
       /***************** PARALLAX SECTIONS ******************/


		var $window = $(window),
		windowHeight;

		$window.resize(function () {
			windowHeight = $(this).height();
		}).triggerHandler('resize');

		$.fn.parallax = function(xpos, ypos, speedFactor, outerHeight) {
			var $this = $(this),
				getHeight,
				firstTop;

			// setup defaults if arguments aren't specified
			xpos = xpos || "50%";
			ypos = ypos || 0;
			speedFactor = speedFactor || 0.5;

			if (typeof outerHeight === 'undefined')  {
				outerHeight = true;
			}

			if (outerHeight) {
				getHeight = function(jqo) {
					return jqo.outerHeight(true);
				};
			} else {
				getHeight = function(jqo) {
					return jqo.height();
				};
			}

			//get the starting position of each element to have parallax applied to it
			$window.bind('scroll resize', function (){
				var pos = $window.scrollTop();

				$this.each(function(){
					var $element = $(this),
						top = $element.offset().top,
						height = getHeight($element);

					firstTop = $this.offset().top;

					// Check if totally above or totally below viewport
					if (top + height < pos || top > pos + windowHeight) {
						return;
					}

					$this.css('backgroundPosition', xpos + " " + Math.round(ypos + (firstTop - pos) * speedFactor) + "px");
				});
			}).triggerHandler('scroll');
		};
		if(window.innerWidth > 1024 ){	
			$('.parallax_section').each(function(){
			   jQuery(this).parallax("50%", 0.4);
			});
		}
	   
	   
		function initSF(){

			$(".sf-menu").superfish({
				 delay: 900,
				 speed: 'fast',
				 speedOut:      'fast',             
				 animation:   {opacity:'show'}
			}); 
	
		}
		
		$('#header nav > ul > li').mouseleave(function(){
			if(!$(this).hasClass('megamenu')){
				$(this).find('> ul').stop(true,true).fadeOut();
			}
		});
		
		function addOrRemoveSF(){
			var $smoothActive = $('body').attr('data-responsive');
			if( window.innerWidth < 980 && $smoothActive == "true" ){
				$('body').addClass('mobile');
				$('#header nav').hide();
			}
			
			else {
				$('body').removeClass('mobile');
				$('#header nav').show();
				$('#mobile-menu').hide();
				
				//recalc height of dropdown arrow
				//$('.sf-sub-indicator').css('height',$('a.sf-with-ul').height());
			}
		}
		
		addOrRemoveSF();
		initSF();
		
		$(window).resize(addOrRemoveSF);
	
		function SFArrows(){
	
			//set height of dropdown arrow
			$('.sf-sub-indicator').css('height',$('a.sf-with-ul').height());
		}
		
		//SFArrows();
		
		//responsive nav
		$('#toggle-nav').click(function(){
			var $body = $('body');
			if ( $body.hasClass( 'opened-nav' ) ) {
				$body.removeClass( 'opened-nav' ).addClass( 'closed-nav' );				
			} else {
				$body.removeClass( 'closed-nav' ).addClass( 'opened-nav' );				
			}
			$('#mobile-menu').stop(true,true).slideToggle(500);
			return false;
		});
		
		////append dropdown indicators / give classes
		$('#mobile-menu .container ul li').each(function(){
			if($(this).find('> ul').length > 0) {
				 $(this).addClass('has-ul');
				 $(this).find('> a').append('<span class="sf-sub-indicator"><i class="fa fa-plus-square"></i><i class="fa fa-minus-square"></i></span>');
			}
		});
		
		////events
		$('#mobile-menu .container ul li:has(">ul") > a .sf-sub-indicator').click(function(){
			$(this).parent().parent().toggleClass('open');
			$(this).parent().parent().find('> ul').stop(true,true).slideToggle();
			return false;
		});
		
		jQuery('a.add_to_cart_button').click(function(e) {
			var link = this;
			jQuery(link).parents('.product').find('.cart-loading').find('i').removeClass('fa-check').addClass('fa-refresh');
			jQuery(this).parents('.product').find('.cart-loading').fadeIn();
			setTimeout(function(){
				jQuery(link).parents('.product').find('.cart-loading').find('i').hide().removeClass('fa-refresh').addClass('fa-check').fadeIn();
	
				setTimeout(function(){
					jQuery(link).parents('.product').find('.cart-loading').fadeOut().parents('.product').find('.product-images img').animate({opacity: 1});;
				}, 1500);
			}, 1500);
		});
	
		jQuery('li.product').mouseenter(function() {
			if(jQuery(this).find('.cart-loading').find('i').hasClass('fa fa-check')) {
				jQuery(this).find('.cart-loading').fadeIn();
			}
		}).mouseleave(function() {
			if(jQuery(this).find('.cart-loading').find('i').hasClass('fa fa-check')) {
				jQuery(this).find('.cart-loading').fadeOut();
			}		
		});
		
		jQuery('li.cart').mouseenter(function() {
			
				jQuery(this).find('.cart-contents').fadeIn();
			
		}).mouseleave(function() {
			
				jQuery(this).find('.cart-contents').fadeOut();
			/*
			if(jQuery(this).find('.cart-loading').find('i').hasClass('fa fa-check')) {
				jQuery(this).find('.cart-loading').fadeOut();
			}*/		
		});
        
        // ToolTips
        
        if ( $().tipsy ) { nTip=function(){ $('.ntip').tipsy({gravity: 's', fade:true}); }; nTip(); }
		if ( $().tipsy ) { sTip=function(){ $('.stip').tipsy({gravity: 'n', fade:true}); }; sTip(); }
		if ( $().tipsy ) { eTip=function(){ $('.etip').tipsy({gravity: 'w', fade:true}); }; eTip(); }
		if ( $().tipsy ) { wTip=function(){ $('.wtip').tipsy({gravity: 'e', fade:true}); }; wTip(); }
        
        
        $("#primary-menu ul li:has(ul)").addClass('sub-menu');

		// Portfolio Items Filter 			
			
		portfolioItemsFilter();
			
			 // Accordions
    		$('.accordion').each(function() {
				var id = $(this).attr('data-unique-id');
				$('.accordion-wrap-'+id+' .acc_content').hide(); //Hide/close all containers
				$('.accordion-wrap-'+id+' .acctitle:first').addClass('acctitlec').next().show(); //Add "active" class to first trigger, then show/open the immediate next container
		
				//On Click
				$('.accordion-wrap-'+id+' .acctitle').click(function(){
					if( $(this).next().is(':hidden') ) { //If immediate next container is closed...
						$('.accordion-wrap-'+id+' .acctitle').removeClass('acctitlec').next().slideUp("normal"); //Remove all "active" state and slide up the immediate next container
						$(this).toggleClass('acctitlec').next().slideDown("normal"); //Add "active" state to clicked trigger and slide down the immediate next container
					}
					return false; //Prevent the browser jump to the link anchor
				});
			});
			
			
			
			faqItemsFilter();

        // Top Socials
        
        topSocialExpander=function(){
            
            var windowWidth = $(window).width();
        
                
                $("#top-social li").show();
                
                $("#top-social li a").css({width: 40});
                
                $("#top-social li a").each(function() {
                    $(this).addClass('stip');
                    var topIconTitle = $(this).children('.ts-text').text();
                    $(this).attr('title', topIconTitle);
                });
                
                sTip();
                
                $("#top-social li a").hover(function() {
                    $(this).stop().animate({width: 40}, 1, 'jswing');
        		}, function() {
        			$(this).stop().animate({width: 40}, 1, 'jswing');
        		});
                /*
                if( windowWidth < 479 ) {
                    
                    $("#top-social li").hide();
                    $("#top-social li").slice(0, 8).show();
                    
                }*/
                
            
        
        };
		topSocialExpander();
        
        $(window).resize(function() {
            topSocialExpander();
        });
        
        
        // Siblings Fader
        
        siblingsFader=function(){
		$(".siblings_fade,.flickr_badge_image").hover(function() {
			$(this).siblings().stop().fadeTo(400,0.5);
		}, function() {
			$(this).siblings().stop().fadeTo(400,1);
		});
		};
		siblingsFader();
        
        
        // Images Preload
        
        //image_preload('.portfolio-image img, .portfolio-image-round img, .product-loop-thumb  img.product-loop-image, #kwicks-slider img,.rs-slider img, .ipost-image img');
        image_preload('.portfolio-shortcode:not(owl-carousel) .portfolio-image img, .portfolio-image-round img, .product-loop-thumb  img.product-loop-image, #kwicks-slider img,.rs-slider img');
        
        $('.port-gallery').each(function(){ $(this).addClass('preloader'); });
		//$('.portfolio-image').each(function(){ $(this).addClass('preloader'); });
        
        $('.fslider').each(function(){ $(this).addClass('preloader2'); });       
        
        // Image Fade	
		imgFade();        
        
        // Toggles
        /*
        $(".togglec").hide();
		
		$(".togglec.open").show();
    	
    	$(".togglet").click(function(){
    	
    	   $(this).toggleClass("toggleta").next(".togglec, .togglec.open").slideToggle("normal");
    	   return true;
        
    	});
		*/
    	//$('.faqs_wrap').each( function() {
    		toggles_function();
    	//});
        
        
        // Pricing Tables
        
        $('.pricing-defines').each( function(){
            
            var pricingDefinesTop = $(this).next().find('.pricing-features').position();
            
            var pricingDefinesParentHeight = $(this).next().outerHeight();
            
            $(this).find('.pricing-features').css( 'margin-top', (pricingDefinesTop.top - 1) + 'px' );
            
            $(this).find('.pricing-inner').css( 'height', (pricingDefinesParentHeight - 1) + 'px' );
            
        });

        // Portfolio Hoverlay		
        
		imgHoverlay();

		if( $('body[data-sticky-sidebar="true"]').length > 0 ) {
			var top_offset,
				header_height_area = ( jQuery('#header').outerHeight() || 0 ),
				header_height_admin = ( jQuery('#wpadminbar').outerHeight() || 0 );
				top_offset = header_height_area + header_height_admin + 20;			
			jQuery('.sidebar').theiaStickySidebar({
		      // Settings
		      additionalMarginTop: top_offset,
		      additionalMarginBottom :40	      
		    });		
		}
		if(jQuery('#portfolio-details-wrap.theiaStickySidebar').length > 0) {
			var top_offset,
				header_height_area = ( jQuery('#header').outerHeight() || 0 ),
				header_height_admin = ( jQuery('#wpadminbar').outerHeight() || 0 );
				top_offset = header_height_area + header_height_admin + 20;			
			jQuery('#portfolio-details-wrap').theiaStickySidebar({
		      // Settings
		      additionalMarginTop: top_offset,
		      additionalMarginBottom :40	      
		    });		
		}

		if( jQuery('.single-post #related-posts-scroller').length > 0 ) {

			var items_show = 5;
			if( jQuery('.single-post .sidebar').length > 0 ) {
				items_show = 4;
			}                    
                
            $(jQuery('#related-posts-scroller')).owlCarousel({
            	margin: 20,			
				nav: true,
				lazyLoad: true,
				navText: ['<div class="widget-scroll-prev" id="relatedposts_prev"><i class="fa fa-chevron-left"></i></div>', '<div class="widget-scroll-next" id="relatedposts_next"><i class="fa fa-chevron-right"></i></div>'],				
				dragEndSpeed: 400,
				dotsSpeed: 400,
				dots: false,
				navRewind: true,        	
				responsive:{
					0:{
			            items:1
			        },
			        600:{
			            items:3
			        },
			        1000:{
			            items: items_show
			        }
				}
            });
			
		}

        // FitVids
        
        if ( $().fitVids ) { $("#content,#footer,#slider:not(.layerslider-wrap),.landing-offer-media").fitVids( { customSelector: "iframe[src^='http://www.dailymotion.com/embed']"} ); }
        
        
        // prettyPhoto
        /*
        
        if ( $().prettyPhoto ) {
            
            initprettyPhoto=function(){
                
                $("a[rel^='prettyPhoto']").prettyPhoto({ theme: 'light_square' });
            
            };
            //initprettyPhoto();
        
        }
        */
        
        // Mobile Menu
        
        if( $().mobileMenu ) { $('#primary-menu > ul').mobileMenu(); }
              
        
        // Anchor Link Scroll
        
        $("a[data-scrollto]").click(function(){
    	
            var divScrollToAnchor = $(this).attr('data-scrollto');
            
            if( $().scrollTo ) { jQuery.scrollTo( $( divScrollToAnchor ) , 400, {offset:-20} ); }
            
            return false;
        
    	});    	

        jQuery('.googlemaps').each( function() {
			jQuery(this).google_maps();
		});		

        // Testimonials

        setTimeout(function () {
			$('.testimonial-scroller').each(function() {
				jQuery(this).testimonials_carousel();        
			});
		}, 200);
		

        // Clients

        $('.clients_wrapper').each(function() {
			jQuery(this).clients_carousel();   
        });

        // Portfolio Widget Carousel

        $('.portfolio-widget').each(function() {
        	jQuery(this).portfolio_widget_carousel();  
        });

        // Recent Works

        recent_works();
        
        // Flickr Feed
        
        if( $().jflickrfeed ) {
            
            $('.flickrfeed').each(function() {
                
                var flickrFeedID = $(this).attr('data-id');
                var flickrFeedCount = $(this).attr('data-count');
                var flickrFeedType = $(this).attr('data-type');
                var flickrFeedTypeGet = 'photos_public.gne';
                
                if( flickrFeedType == 'group' ) { flickrFeedTypeGet = 'groups_pool.gne'; }
                
                if( !flickrFeedCount ) { flickrFeedCount = 9; }
            
                $(this).jflickrfeed({
                    feedapi: flickrFeedTypeGet,
            		limit: Number(flickrFeedCount),
            		qstrings: {
            			id: flickrFeedID
            		},
            		itemTemplate: '<div class="flickr_badge_image">'+
            						'<a rel="prettyPhoto[galflickr]" href="{{image}}" title="{{title}}">' +
            							'<img src="{{image_s}}" alt="{{title}}" />' +
            						'</a>' +
            					  '</div>'
            	}, function(data) {
            		if ( $().prettyPhoto ) { initprettyPhoto(); }
            	});
            
            });
            
        }
   
   	/*==============================================================*/
    // Overlay Menu 
    /*==============================================================*/
    $(document).on('click', '.open_hamburger_navigation ', function (e) {    	
    	e.preventDefault();
        $('.hamburger_content_wrap').toggleClass('show_content');
        if (!isMobile && $('.hamburger_content_wrap').hasClass('show_content')) {
        	document.onmousewheel = ScrollStop;
        }
        else {
        	document.onmousewheel = ScrollStart;
        }
        //$('body').removeClass('show-menu');
    });
        
    /*==============================================================*/
    //magnificPopup Start for Search in Header
    /*==============================================================*/
    $('.main-menu-search-form').magnificPopup({
        mainClass: 'mfp-fade',
        closeOnBgClick: true,
        preloader: false,
        // for white backgriund
        fixedContentPos: false,
        closeBtnInside: false,
        callbacks: {
            open: function () {
                setTimeout(function () {
                    $('.search-input').focus();
                }, 500);
                $('#search-main-menu').parent().addClass('search-popup');
                if (!isMobile) {
                    $('body').addClass('overflow-hidden');
                    //$('body').addClass('position-fixed');
                    $('body').addClass('width-100');
                    document.onmousewheel = ScrollStop;
                } else {
                    $('body, html').on('touchmove', function (e) {
                        e.preventDefault();
                    });
                }
            },
            close: function () {
                if (!isMobile) {
                    $('body').removeClass('overflow-hidden');
                    //$('body').removeClass('position-fixed');
                    $('body').removeClass('width-100');
                    $('#search-main-menu input[type=text]').each(function (index) {
                        if (index == 0) {
                            $(this).val('');
                            $("#search-main-menu").find("input:eq(" + index + ")").css({"border": "none", "border-bottom": "2px solid rgba(255,255,255,0.5)"});
                        }
                    });
                    document.onmousewheel = ScrollStart;
                } else {
                    $('body, html').unbind('touchmove');
                }
            }
        }
    });

    /*==============================================================*/
    //magnificPopup End 
    /*==============================================================*/ 

    /*==============================================================*/
    //Sticky Footer
    /*==============================================================*/    

    if(jQuery('body[data-sticky-footer="true"]').length >= 1 && !isMobile) {
    	var footerHeight = jQuery('#footer_wrap').height();
    	jQuery('#wrapper').css('margin-bottom',footerHeight);
    }


});


$(window).load(function() {
    
    jQuery('#pageLoader').fadeOut(800, function(){
        $(this).remove();
    });

    // Flex Slider
	loadFlexSlider();
});