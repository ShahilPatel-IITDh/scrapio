jQuery(document).ready(function($) {
  $(window).load(function(){
    "use strict";

    /* Hoverable Tabs animation */
    var hover_tabs_settings = {
          interval: 100,
          timeout: 200,
          over: mousein_triger,
          out: mouseout_triger
    };
    function mousein_triger(){
      $(this).addClass('active');
      $(this).find('.inner-content').css('visibility', 'visible');
    }
    function mouseout_triger() {
      $(this).removeClass('active');
      $(this).find('.inner-content').css('visibility', 'hidden');
    }
    if ( window.matchMedia("(min-width: 801px)").matches ) {
      $('.tz-hoverable-tabs ul.nav li').hoverIntent(hover_tabs_settings);
    } else {
      $('.tz-hoverable-tabs ul.nav li').on( 'click', function() {
        if ( $(this).hasClass('active') ) {
          $(this).removeClass('active').find('.inner-content').css('visibility', 'hidden');
        } else {
          $(this).parent().find('.active').removeClass('active').find('.inner-content').css('visibility', 'hidden');
          $(this).addClass('active').find('.inner-content').css('visibility', 'visible');
        }
      });
    }

    /* Transform tabs to dropdown on mobile */
    if ( (window.matchMedia("(max-width: 500px)").matches) ) {
      $('.tz-product-tabs a[data-toggle="tab"]').on( 'click', function() {
        $(this).closest("ul").toggleClass("open");
      });
    }

    /* Countdown Counters Init */
    var countdownContainer = $('[data-countdown="container"]');
    $(countdownContainer).each(function() {
      var countdownTarget = $(this).data('countdown-target');
      /* Transform string to array */
      var target = countdownTarget.split("-");
      var newDate = new Date( target[0], (target[1] - 1), target[2] );
      $(this).countdown({
        until: newDate,
        format: 'DHMS',
        labels: ['Years', 'Months', 'Weeks', 'Days', 'Hrs', 'Mins', 'Sec'],
        labels1: ['Year', 'Month', 'Week', 'Day', 'Hour', 'Min', 'Sec'],
      });
    });

		/* Helper functions for Carousels */
		function showOwl(event) {
			var carousel = event.target,
					carousel_container = $(carousel).parent().parent();
			carousel_container.find('.carousel-loader').fadeOut('200');
			$(carousel).css('opacity', '1').css('height', 'auto');
		}

		/* Owl Carousel Init */
		var owlContainer = $('[data-owl="container"]');
    /* Init owl carousel on newly clicked tab (for product tabs shortcode) */
  	$('.tz-product-tabs a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  		var activated_tab = e.target,
  				target_id = $(activated_tab).attr('href');
  		if ( !$(target_id).find('.owl-carousel').length ) {
        /* Recount width & height for hidden tab content */
        if ( $('body').hasClass('chromium-product-style-2') ) {
          $(target_id).find('ul.products').find('li.product').each( function() {
            $(this).css('height','auto').find('.inner-wrapper').css('position', 'relative');
            var height = $(this).css('height');
            $(this).css({
              height: height,
            }).find('.inner-wrapper').css({
              position : 'absolute',
              top : 0,
              left : 0,
            });
          } );
        }
  			var owl = $(target_id).find('ul.products').addClass('owl-carousel');
        var owlDomElement = $(target_id);
  			var owlSlidesQty = $(target_id).data('owl-slides');
        var owlCustomMargin = $(target_id).data('owl-margin');
        var owlCustomLoop = $(target_id).data('owl-loop');
        var owlMobileCols = ( $(target_id).data('owl-col-mobile') ? $(target_id).data('owl-col-mobile') : 1 );

        var owlMargin = 30;
        if ( owlCustomMargin==0 || owlCustomMargin ) {
          owlMargin = owlCustomMargin;
        }
        var owl2Rows = false;
				if ( $(target_id).data('owl-2rows')=='yes' ) { owl2Rows = true; }
  			owl.owlCarousel({
  				navText: ['',''],
  				onInitialized: showOwl,
                  loop: owlCustomLoop,
                  nav: false,
                  dots: false,
                  margin: owlMargin,
                        responsive:{
                    0:{
                        items: owlMobileCols,
                        dots: true,
                        loop: false,
                        margin: 0,
                        owl2row: false,
                    },
                    400:{
                        items: owlMobileCols,
                        dots: true,
                        loop: false,
                        owl2row: false,
                    },
                    768:{
                        items:2,
                        loop: true,
                        dots: false,
                        owl2row: owl2Rows,
                    },
                    992:{
                        items: owlSlidesQty,
                        loop: true,
                        dots: false,
                        owl2row: owl2Rows,
                    }
                        },
  			});
        if ( window.matchMedia("(min-width: 768px)").matches ) {
          owlDomElement.find('.slider-navi .next').click(function() {
            owl.trigger('next.owl.carousel');
          })
          owlDomElement.find('.slider-navi .prev').click(function() {
            owl.trigger('prev.owl.carousel');
          })
        }
  		}
  	});
		/* Loop through all owl carousels */
		$(owlContainer).each(function() {
				/* Variables */
				var owlDomElement = $(this);
				var owlSlidesQty = $(this).data('owl-slides');
				var owlType = $(this).data('owl-type');
				var owlCustomNav = $(this).data('owl-custom-nav');
            var owlCustomLoop = $(this).data('owl-loop');
        var owlCustomMargin = $(this).data('owl-margin');
				var owlAutoplay = false,
						owlArrows = false,
						owlDots = false;
        var owl2Rows = false;
        var owlMargin = 30;

        var owlMobileCols = ( $(this).data('owl-col-mobile') ? $(this).data('owl-col-mobile') : 1 );


        if ( owlCustomMargin==0 || owlCustomMargin ) {
          owlMargin = owlCustomMargin;
        }
        if ( $(this).data('owl-2rows')=='yes' ) { owl2Rows = true; }
				if ( $(this).data('owl-autoplay')=='yes' ) { owlAutoplay = true; }
				if ( $(this).data('owl-arrows')=='yes' ) { owlArrows = true; }
				if ( $(this).data('owl-dots')=='yes' ) { owlDots = true; }

        /* Init active tab carousel (for product tabs shortcode) */
  			if ( $(owlContainer).hasClass('tab-pane') ) {
  				if ($(this).hasClass('active')) {
  					var owl = $(this).find('ul.products').addClass('owl-carousel');
            owl.owlCarousel({
      				onInitialized: showOwl,
              loop: owlCustomLoop,
              nav: false,
              navText: ['',''],
              dots: false,
              margin: owlMargin,
      				responsive:{
                  0:{
      								items: owlMobileCols,
      								dots: true,
      								loop: owlCustomLoop,
                      margin: 10,
                      owl2row: false,
      						},
      						400:{
      								items: owlMobileCols,
      								dots: true,
      								loop: owlCustomLoop,
                      owl2row: false,
      						},
      						768:{
      								items: owlMobileCols + 1,
      								loop: owlCustomLoop,
      								dots: false,
                      owl2row: owl2Rows,
      						},
      						992:{
      								items: owlSlidesQty,
      								loop: owlCustomLoop,
      								dots: false,
                      owl2row: owl2Rows,
      						}
      				},
      			});
            if ( window.matchMedia("(min-width: 768px)").matches ) {
              owlDomElement.find('.slider-navi .next').click(function() {
                owl.trigger('next.owl.carousel');
              });
              owlDomElement.find('.slider-navi .prev').click(function() {
                owl.trigger('prev.owl.carousel');
              })
            }
  				}
  			}

				/* Content Carousels */
				if ( owlType=='content-carousel' ) {

					var owl = $(this).find('.carousel-container').addClass('owl-carousel');
					if (owlCustomNav=='yes') {
						owlArrows = false;
            if ( window.matchMedia("(min-width: 768px)").matches ) {
  						owlDomElement.find('.slider-next').click(function() {
  							owl.trigger('next.owl.carousel');
  						})
  						owlDomElement.find('.slider-prev').click(function() {
  							owl.trigger('prev.owl.carousel');
  						})
            }
					}
          var phone_slides_qty = 1;
          var big_phone_slides_qty = 2;
          var tablet_slides_qty = 2;
          if ( owlSlidesQty == 1 ) {
            phone_slides_qty = big_phone_slides_qty = tablet_slides_qty = owlSlidesQty;
          }

					owl.owlCarousel({
						items: owlSlidesQty,
						loop: owlCustomLoop,
						nav: owlArrows,
						navText: ['',''],
						dots: owlDots,
						onInitialized: showOwl,
						autoplay: owlAutoplay,
            autoHeight: true,
            margin: owlMargin,
						responsive:{
								0:{
										items: phone_slides_qty,
										loop: false,
                    dots: true,
                    nav: false,
								},
								400:{
										items: big_phone_slides_qty,
										loop: owlCustomLoop,
								},
								768:{
										items: tablet_slides_qty,
										loop: owlCustomLoop,
								},
								992:{
										items: owlSlidesQty,
										loop: owlCustomLoop,
								}
						},
					});
				} /* end of if(owlType=='content-carousel') */

        /* Product Carousels */
        if ( owlType=='product-carousel' ) {

          var owl = $(this).find('ul.products').addClass('owl-carousel');

          if ( window.matchMedia("(min-width: 768px)").matches ) {
            owlDomElement.find('.slider-navi .next').click(function() {
              owl.trigger('next.owl.carousel');
            })
            owlDomElement.find('.slider-navi .prev').click(function() {
              owl.trigger('prev.owl.carousel');
            })
          }

          owl.owlCarousel({
            items: owlSlidesQty,
            loop: owlCustomLoop,
            nav: false,
            navText: ['',''],
            dots: false,
            onInitialized: showOwl,
            autoplay: owlAutoplay,
            margin: owlMargin,
            responsive:{
              0:{
  								items: 1,
  								dots: true,
  								loop: owlCustomLoop,
                  margin: 0,
  						},
  						400:{
  								items: ( owlSlidesQty == 1 ? owlSlidesQty : 1 ),
  								dots: true,
  								loop: owlCustomLoop,
                  margin: 15,
  						},
							768:{
									items:( owlSlidesQty == 1 ? owlSlidesQty : 2 ),
									loop: owlCustomLoop,
							},
							992:{
									items: owlSlidesQty,
									loop: owlCustomLoop,
							}
            },
          });
        } /* end of if(owlType=='product-carousel') */

        /* Related Posts Carousel on mobile devices */
        if ( (owlType=='related') && (window.matchMedia("(max-width: 767px)").matches) ) {
          var owl = $(this).find('ul.post-list').addClass('owl-carousel');
          owl.owlCarousel({
            items: owlSlidesQty,
            loop: owlCustomLoop,
            nav: false,
            dots: true,
            onInitialized: showOwl,
            margin: 30,
            autoHeight: true,
          });
        } /* end of (owlType=='related') */

		});/* end of $(owlContainer).each */

  });
});
