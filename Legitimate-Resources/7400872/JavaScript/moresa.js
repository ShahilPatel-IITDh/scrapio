/*------------------------------------------------------------------
[Table of contents]

- Project:	moresa - Multipurpose  Template
- Version:	1.1
--*/

(function () {


	"use strict";

	/////////////////////////////////////////////////////////////////
	// Map/Form Switcher
	/////////////////////////////////////////////////////////////////

	$(".map-form-switcher .switcher-toggle").on('click', function (e) {
		e.preventDefault();
		$('.b-map-form-holder .b-contact-form').fadeToggle("300", "linear");
		$('.b-map-form-holder').toggleClass("map-active");
	});
    
    
    
    $(".animsition").animsition({
    inClass: 'fade-in-down',
    outClass: 'fade-out-up',
    inDuration: 900,
    outDuration: 900,
    linkElement: '.header-navibox-2 a:not([href^="#"]) , .header .navbar-brand , aside li a,.b-blog-caption .btn,.secondary-home-news a,.post-description a, .wrap-blog-post .post-description .author a , .post_read_more , html  .post-body > h4 a , .tmpl-portfolio-link , .controls a , .portfolio-image a:not(.fancybox),.service-item .btn , .img-hover-effect a , .sidebar-services li a , .our-services  a, .list-services-2__link, .list-services__link,.b-f-s-info .btn,.portfolio-item-body a',
    // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
    loading: true,
    loadingParentElement: 'body', //animsition wrapper element
    loadingClass: 'animsition-loading',
    loadingInner: '', // e.g '<img src="loading.svg" />'
    timeout: false,
    timeoutCountdown: 3000,
    onLoadEvent: true,
    browser: [ 'animation-duration', '-webkit-animation-duration'],
    // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    overlay : false,
    overlayClass : 'animsition-overlay-slide',
    overlayParentElement : 'body',
    transition: function(url){ window.location.href = url; }
  });
    
    
    
    /////////////////////////////////////
	//  doubleTapToGo
	/////////////////////////////////////
    
    
    
      var doubleTapToGo_windowWidth = $(window).width();
    
    
    if( doubleTapToGo_windowWidth < 658 ){
       
        $( '.yamm li:has(ul)' ).doubleTapToGo();
       
       }
    
    
      


	/////////////////////////////////////
	//  Scroll link
	/////////////////////////////////////


	$(".slide-btn .vc_btn3.vc_btn3-style-custom[href*='#']").on("click", function (event) {
		event.preventDefault();

		var id = $(this).attr('href'),

			top = $(id).offset().top;

		$('body,html').animate({
			scrollTop: top
		}, 1500);
	});


	var Core = {

		initialized: false,

		initialize: function () {

			if (this.initialized) return;
			this.initialized = true;

			this.build();

		},

		build: function () {

			//Setup WOW.js
			this.initScrollAnimations();

			//Placeholder for IE
			$('input, textarea').placeholder();

			// Page preloader
			this.initPagePreloader();

			// Menu Switcher
			this.mainMenuSwitcher();

			// hide Switcher
			this.hideMenuSwitcher();

			// Sticky Header
			this.stickyHeader();

			// Tooltip
			this.initTooltip();

			// Accordion
			this.initAccordion();

			//Isotope Filter
			this.isotopeFilter();

			// Main Slider
			this.initMainSlider();

			// bxSlider
			this.initBxSlider();

			//Tabs Custom
			this.initTabsCustom();

			// Ekko Light-Box Photo Gallery
			this.initLightBox();

			// Chars Start
			this.initCharsStart();

			// Hover on main navigation
			this.dropdownhover();

		},

		initPagePreloader: function (options) {
			var $preloader = $('#page-preloader'),
				$spinner = $preloader.find('.spinner-loader');
			$(window).on('load', function () {
				$spinner.fadeOut();
				$preloader.delay(500).fadeOut('slow');
				window.scrollTo(0, 0);
			});
		},

		mainMenuSwitcher: function (options) {
			$(document).on('click', '.hamburger', function () {
				$(this).toggleClass('is-active');
				$('body').toggleClass('open-menu');
			})
		},

		hideMenuSwitcher: function (options) {
			$(document).on('click', '.close-menu-nav', function () {
				$('.hamburger').toggleClass('is-active');
				$('body').removeClass('open-menu');
			});
		},

		stickyHeader: function (options) {
			$(window).on('scroll', function () {
				var fromTop = $(this).scrollTop();
				//console.log(fromTop);
				if (fromTop > 0) {
					$('body').addClass('fixed-menu');
				} else {
					$('body').removeClass('fixed-menu');
				}
			});
		},

		initScrollAnimations: function (options) {
			var scrollingAnimations = true; // Set false for turn off animation
			if (scrollingAnimations) {
				new WOW().init();
			}
		},

		initTooltip: function (options) {
			$('[data-toggle="tooltip"]').tooltip();
		},

		initAccordion: function (options) {
			var accordionBox = $('.enable-accordion');
			if (accordionBox && accordionBox.length) {
				accordionBox.each(function (i) {
					var $accordion = $(this);

					var heightStyleData = $accordion.data('height-style');
					var collapsibleData = $accordion.data('collapsible');
					var activeData = $accordion.data('active');

					$accordion.accordion({
						heightStyle: heightStyleData,
						collapsible: collapsibleData,
						active: activeData,
					});
				});
			}
		},

		isotopeFilter: function (options) {
			// init Isotope
			var $works = $('.b-works-holder').isotope();

			// layout Isotope after each image loads
			$works.imagesLoaded().progress(function () {
				$works.isotope('layout');
			});

			// filter series items on button click
			$('.b-items-sort').on('click', 'li', function () {
				var filterValue = $(this).attr('data-filter');
				$works.isotope({
					filter: filterValue
				});
			});

			// change is-checked class on buttons
			$('.b-items-sort').each(function (i, buttonGroup) {
				var $buttonGroup = $(buttonGroup);
				$buttonGroup.on('click', 'li', function () {
					$buttonGroup.find('.active-filt').removeClass('active-filt');
					$(this).addClass('active-filt');
				});
			});

		},

		initMainSlider: function (options) {
			var $mainSlider = $('.full-width-slider');
			if ($mainSlider && $mainSlider.length) {
				$mainSlider.each(function (i) {
					var $proSlider = $(this);

					var widthData = $proSlider.data('width');
					var heightData = $proSlider.data('height');
					var fadeData = $proSlider.data('fade');
					var buttonsData = $proSlider.data('buttons');
					var arrowsData = $proSlider.data('arrows');
					var waitForLayersData = $proSlider.data('wait-for-layers');
					var thumbnailPointerData = $proSlider.data('thumbnail-pointer');
					var touchSwipeData = $proSlider.data('touch-swipe');
					var autoplayData = $proSlider.data('autoplay');
					var autoScaleLayersData = $proSlider.data('auto-scale-layers');
					var visibleSizeData = $proSlider.data('visible-size');
					var forceSizeData = $proSlider.data('force-size');
					var autoplayDelayData = $proSlider.data('autoplay-delay');
					var proNext = $proSlider.data('next-slide');
					var proPrev = $proSlider.data('previous-slide');

					$proSlider.sliderPro({
						width: widthData,
						height: heightData,
						fade: fadeData,
						buttons: buttonsData,
						arrows: arrowsData,
						waitForLayers: waitForLayersData,
						thumbnailPointer: thumbnailPointerData,
						touchSwipe: touchSwipeData,
						autoplay: autoplayData,
						autoScaleLayers: autoScaleLayersData,
						visibleSize: visibleSizeData,
						forceSize: forceSizeData,
						autoplayDelay: autoplayDelayData
					});
					$(proNext).on('click', function () {
						$proSlider.sliderPro('nextSlide');
					});
					$(proPrev).on('click', function () {
						$proSlider.sliderPro('previousSlide');
					});

				});
			}
		},

		initBxSlider: function (options) {

			var bxSliderBox = $('.enable-bx-slider');
			if (bxSliderBox && bxSliderBox.length) {
				bxSliderBox.each(function (i) {
					var $bx = $(this);

					var pagerCustomData = $bx.data('pager-custom');
					var controlsData = $bx.data('controls');
					var minSlidesData = $bx.data('min-slides');
					var maxSlidesData = $bx.data('max-slides');
					var slideWidthData = $bx.data('slide-width');
					var slideMarginData = $bx.data('slide-margin');
					var pagerData = $bx.data('pager');
					var modeData = $bx.data('mode');
					var infiniteLoopData = $bx.data('infinite-loop');
					var autoData = $bx.data('auto');
					var pauseData = $bx.data('pause');
					var autoHoverData = $bx.data('auto-hover');
					var counterData = $bx.data('counter');

					$bx.bxSlider({
						pagerCustom: pagerCustomData,
						controls: controlsData,
						minSlides: minSlidesData,
						maxSlides: maxSlidesData,
						slideWidth: slideWidthData,
						slideMargin: slideMarginData,
						pager: pagerData,
						mode: modeData,
						infiniteLoop: infiniteLoopData,
						auto: autoData,
						pause: pauseData,
						autoHover: autoHoverData,
						nextSelector: '#bx-next',
						prevSelector: '#bx-prev',
						prevText: (modeData == 'vertical' ? '<i class="fa fa-long-arrow-up fa-lg"></i>' : '<i class="fa fa-long-arrow-left fa-lg"></i>'),
						nextText: (modeData == 'vertical' ? '<i class="fa fa-long-arrow-down fa-lg"></i>' : '<i class="fa fa-long-arrow-right fa-lg"></i>'),

						onSliderLoad: function (currentIndex) {
							if (counterData) {
								var qty = $bx.getSlideCount();
								$bx.parents('.bx-wrapper').next('.slide-counter').find('.current-index').html(currentIndex + 1);
								$bx.parents('.bx-wrapper').next('.slide-counter').find('.current-qty').html(qty);
							}
						},
						onSlideBefore: function ($slideElement, oldIndex, newIndex) {
							if (counterData) {
								$bx.parents('.bx-wrapper').next('.slide-counter').find('.current-index').html(newIndex + 1);
							}
						}
					});
				});
			}
		},

		initTabsCustom: function (options) {
			$('#tabs-custom li a').on('click', function (e) {
				e.preventDefault()
				$(this).tab('show')
			})
		},

		initLightBox: function (options) {
			$(document).delegate('*[data-toggle="lightbox"]:not([data-gallery="navigateTo"])', 'click', function (event) {
				event.preventDefault();
				$(this).ekkoLightbox({});
			});
		},

		initCharsStart: function (options) {
			if ($('body').length) {
				$(window).on('scroll', function () {
					var winH = $(window).scrollTop();

					$('.b-about-facts').waypoint(function () {
						$('.chart').each(function () {
							CharsStart();
						});
						$('.horizontal').horizBarChart({
							selector: '.bar',
							speed: 4500
						});
					}, {
						offset: '80%'
					});


				});
			}

			function CharsStart() {


				$('.chart').easyPieChart({

					barColor: false,
					trackColor: false,
					scaleColor: false,
					scaleLength: false,
					lineCap: false,
					lineWidth: false,
					size: false,
					animate: 4000,


					onStep: function (from, to, percent) {

						$(this.el).find('.percent').text(Math.round(percent));

					}
				});

			}

		},

		dropdownhover: function (options) {
			/** Extra script for smoother navigation effect **/
			if ($(window).width() > 767) {
				$('.menu-container, .yamm.main-menu').on('mouseenter', '.navbar-main > .dropdown', function () {
					"use strict";
					$(this).addClass('open');
				}).on('mouseleave', '.navbar-main > .dropdown', function () {
					"use strict";
					$(this).removeClass('open');
				});
			}
		}

	};

	Core.initialize();

})();