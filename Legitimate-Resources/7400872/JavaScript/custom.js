jQuery(function ($) {

	"use strict";


	var Core = {
		initialized: false,
		initialize: function () {
			if (this.initialized)
				return;
			this.initialized = true;
			this.build();
		},
		build: function () {
			// Owl carousel init
			this.initOwlCarousel();
			// Isotope init
			this.isotopeFilter();
			this.isotopeGallery();
			// Loader
			this.loaderInit();
			// Init fancybox
			this.initFancyBox();
			// Init fancybox video
			this.initFancyBoxVideo();
			// Slide Effect
			this.initSlideEffect();
			// Accordeon
			this.initTabs();
			//Init scrollreveral
			this.initSR();
			// Counters start
			this.waypointsStart();
		},
		waypointsStart: function () {
			var countersIteration = true;
			var skillsIteration = true;
			$(window).on('scroll', function () {
				if ($('.counters').length && $('.counters').offset().top < ($('body').scrollTop() + $(window).height()) && countersIteration) {
					$(".spincrement").spincrement({
						duration: 5000
					});
					countersIteration = false;
				}
			});
			$(window).on('scroll', function () {
				if ($('.skills').length && $('.skills').offset().top < ($('body').scrollTop() + $(window).height()) && skillsIteration) {
					$('.skill-item').each(function () {
						var persent = $(this).attr('data-percent');
						$(this).find('.skill-line span').animate({
							width: persent + '%'
						}, 800);
					});
					skillsIteration = false;
				}
			});
		},

		initSR: function () {
			window.sr = ScrollReveal({
				reset: true
			});
			sr.reveal('.scrollreveal');
		},

		initSlideEffect: function (options) {
			$(document).on('mouseenter', '.team.hover-eff > div > div', function () {
				$(this).find("span").slideDown(200);
			});
			$(document).on('mouseleave', '.team.hover-eff > div > div', function () {
				$(this).find("span").slideUp(200);
			});
		},

		initTabs: function () {
			function toggleActive(e) {
				$(e.target).prev('.panel-heading').toggleClass('active');
			}
			$('#accordion-one').on('hidden.bs.collapse shown.bs.collapse', toggleActive);
		},

		initFancyBox: function () {
			$('.fancybox').fancybox();

		},
		initFancyBoxVideo: function () {
			$(".fancybox-video").click(function () {
				$.fancybox({
					'padding': 0,
					'autoScale': false,
					'transitionIn': 'none',
					'transitionOut': 'none',
					'title': this.title,
					'width': 680,
					'height': 495,
					'href': this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
					'type': 'swf',
					'swf': {
						'wmode': 'transparent',
						'allowfullscreen': 'true'
					}
				});

				return false;
			});
		},


		isotopeFilter: function (options) {


			var $container = $('.isotope-filter');

			$container.imagesLoaded(function () {
				$container.isotope({
					// options
					filter: '*',
					itemSelector: '.isotope-item'
				});
			});
			// filter items when filter link is clicked
			$('#filter').on('click', 'a', function () {
				$('#filter  li').removeClass('active');
				$(this).parent('li').addClass('active');
				var selector = $(this).attr('data-filter');
				$container.isotope({
					filter: selector
				});
				return false;
			});

			$('#filter').on('click', 'a', function () {
				$('#filter  a').removeClass('active');
				$(this).addClass('active');
				var selector = $(this).attr('data-filter');
				$container.isotope({
					filter: selector
				});
				return false;
			});


			/****** ISOTOP STARTS */

			var blog_container = $('.blog-masonry-holder');

			blog_container.imagesLoaded(function () {
				blog_container.isotope({
					// options
					itemSelector: '.item',
					layoutMode: 'masonry',
				});
			});

			var portfolio_container = $('.portfolio-masonry-holder');

			portfolio_container.imagesLoaded(function () {
				portfolio_container.isotope({
					// options
					itemSelector: '.item',
					layoutMode: 'masonry',
				});
			});

			$('.folio-isotop-filter a').on('click', function () {

				var container = $('.portfolio-masonry-holder');
				var filterValue = $(this).attr('data-filter');

				//don't proceed if already selected
				if ($(this).hasClass('selected')) {
					return false;
				}
				var $portfolio_optionSet = $(this).parents('.folio-option-set');
				$portfolio_optionSet.find('.selected').removeClass('selected');
				$(this).addClass('selected');

				filterValue = filterValue === 'false' ? false : filterValue;
				portfolio_container.isotope({
					filter: filterValue
				});
				return false;
			});

			/****** ISOTOP ENDS */

		},


		isotopeGallery: function () {
			var $container = $('#gallery-items');

			$(window).load(function () {
				$container.isotope({
					//		    resizable: false, // disable normal resizing
					transitionDuration: '0.65s',
					masonry: {
						columnWidth: $container.find('.gallery-item:not(.wide)')[0]
					}
				});

				$(window).resize(function () {
					$container.isotope('layout');
				});
			});

			// filter items on button click
			$('#filters').on('click', 'a', function (e) {
				$(e.target).toggleClass('active').siblings().removeClass("active");
				var filterValue = $(this).attr('data-filter');
				$container.isotope({
					filter: filterValue
				});
			});
		},


		initOwlCarousel: function (options) {

			$(".enable-owl-carousel").each(function (i) {
				var $owl = $(this);
				var navigationData = $owl.data('navigation');
				var paginationData = $owl.data('pagination');
				var singleItemData = $owl.data('single-item');
				var autoPlayData = $owl.data('auto-play');
				var transitionStyleData = $owl.data('transition-style');
				var mainSliderData = $owl.data('main-text-animation');
				var afterInitDelay = $owl.data('after-init-delay');
				var stopOnHoverData = $owl.data('stop-on-hover');
				var min600 = $owl.data('min600');
				var min800 = $owl.data('min800');
				var itemsData = $owl.data('items');
				var animateOutData = $owl.data('animate-out');
				var animateInData = $owl.data('animate-in');
				var min1200 = $owl.data('min1200');
				var responsiveItems = $owl.data('responsive-items');
				var navTextData = $owl.data('nav-text') == null ? ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"] : $owl.data('nav-text');
				$owl.owlCarousel({
					nav: navigationData,
					dots: paginationData,
					singleItem: singleItemData,
					autoPlay: autoPlayData,
					transitionStyle: transitionStyleData,
					stopOnHover: stopOnHoverData,
					animateOut: animateOutData,
					animateIn: animateInData,
					items: itemsData,
					navText: navTextData,
					responsive: {
						0: {
							items: responsiveItems
						},
						767: {
							items: itemsData
						}

					},
					itemsCustom: [
						[0, 1],
						[600, min600],
						[800, min800],
						[1200, min1200]
					],
					afterInit: function (elem) {
						if (mainSliderData) {
							setTimeout(function () {
								$('.main-slider_zoomIn').css('visibility', 'visible').removeClass('zoomIn').addClass('zoomIn');
								$('.main-slider_fadeInLeft').css('visibility', 'visible').removeClass('fadeInLeft').addClass('fadeInLeft');
								$('.main-slider_fadeInLeftBig').css('visibility', 'visible').removeClass('fadeInLeftBig').addClass('fadeInLeftBig');
								$('.main-slider_fadeInRightBig').css('visibility', 'visible').removeClass('fadeInRightBig').addClass('fadeInRightBig');
							}, afterInitDelay);
						}
					},
					beforeMove: function (elem) {
						if (mainSliderData) {
							$('.main-slider_zoomIn').css('visibility', 'hidden').removeClass('zoomIn');
							$('.main-slider_slideInUp').css('visibility', 'hidden').removeClass('slideInUp');
							$('.main-slider_fadeInLeft').css('visibility', 'hidden').removeClass('fadeInLeft');
							$('.main-slider_fadeInRight').css('visibility', 'hidden').removeClass('fadeInRight');
							$('.main-slider_fadeInLeftBig').css('visibility', 'hidden').removeClass('fadeInLeftBig');
							$('.main-slider_fadeInRightBig').css('visibility', 'hidden').removeClass('fadeInRightBig');
						}
					},
					afterMove: sliderContentAnimate,
					afterUpdate: sliderContentAnimate,
				});
			});

			function sliderContentAnimate(elem) {
				var $elem = elem;
				var afterMoveDelay = $elem.data('after-move-delay');
				var mainSliderData = $elem.data('main-text-animation');
				if (mainSliderData) {
					setTimeout(function () {
						$('.main-slider_zoomIn').css('visibility', 'visible').addClass('zoomIn');
						$('.main-slider_slideInUp').css('visibility', 'visible').addClass('slideInUp');
						$('.main-slider_fadeInLeft').css('visibility', 'visible').addClass('fadeInLeft');
						$('.main-slider_fadeInRight').css('visibility', 'visible').addClass('fadeInRight');
						$('.main-slider_fadeInLeftBig').css('visibility', 'visible').addClass('fadeInLeftBig');
						$('.main-slider_fadeInRightBig').css('visibility', 'visible').addClass('fadeInRightBig');
					}, afterMoveDelay);
				}
			}
		},

		loaderInit: function () {
			$(window).on('load', function () {
				var $preloader = $('#page-preloader'),
					$spinner = $preloader.find('.spinner');
				$spinner.fadeOut();
				$preloader.delay(350).fadeOut(800);
			});
		}


	};
	Core.initialize();


	$(".vc_row").children().each(function (i) {

		var rowChecker = $(this);

		if (rowChecker.is(".jarallax")) {

			var rowPadTop = $(this).parent().css("padding-top");
			var rowPadBot = $(this).parent().css("padding-bottom");

			$(this).parent().addClass("jarallax-nopadding");

			$(this).css("padding-top", rowPadTop);
			$(this).css("padding-bottom", rowPadBot);

		}

	});


	$('.animated-css .animated:not(.animation-done)').waypoint(function () {

		var animation = $(this).data('animation');

		$(this).addClass('animation-done').addClass(animation);

	}, {
		triggerOnce: true,
		offset: '90%'
	});


	
	/****** LOAD MORE PORTFOLIO STARTS */

	function loadMore() {
		"use strict";

		$('.load-more a').on('click', function (e) {
			e.preventDefault();

			var current_page = $(this).parent().attr('data-current');
			var max_pages = $(this).parent().attr('data-max-pages');
			var wrapper_id = '#' + $(this).parents('.portfolio-list-section').attr('id');
			var link = $(this).attr('href');
			var $container = wrapper_id + ' .portfolio-masonry-holder';
			var container = $($container);
			var $anchor = wrapper_id + ' .portfolio-pagination .load-more a';
			var next_href = $(this).attr('href'); // Get URL for the next set of posts
			var btn = $(this);

			var load_more_holder = $(this).parents('.portfolio-pagination');
			var loading_holder = $(this).parents('.portfolio-pagination').next();

			load_more_holder.hide();
			loading_holder.show();

			$('.folio-isotop-filter li').find('.selected').removeClass('selected');
			$('.folio-isotop-filter ul li:first a').addClass('selected');

			container.isotope({
				filter: '*'
			});

			$.get(link + '', function (data) {

				console.log(wrapper_id);

				var new_content = $($container, data).wrapInner('').html(); // Grab just the content
				next_href = $($anchor, data).attr('href'); // Get the new href

				$(container, data).waitForImages(function () {

					container.append(new_content);
					// trigger isotope again after images have been loaded
					container.imagesLoaded(function () {
						container.isotope('reloadItems').isotope({
							sortBy: 'original-order'
						});
					});

					container.children().removeClass('wow');

					current_page++;

					if (max_pages > current_page) {
						btn.attr('href', next_href); // Change the next URL
					} else {
						btn.parent().remove();
					}

					container.children('.portfolio-pagination:last').remove(); // Remove the original navigation

					load_more_holder.show();
					loading_holder.hide();

					btn.parent().attr('data-current', current_page);
				});

			});
		});
	}
	loadMore();

	/****** LOAD MORE PORTFOLIO ENDS */


	$(".carousel-post").bxSlider({
		adaptiveHeight: true,
		auto: true,
		nextText: '',
		prevText: ''
	});


	$('.bx-next').html(' <i class="fa fa-long-arrow-right fa-lg"></i>');
	$('.bx-prev').html(' <i class="fa fa-long-arrow-left fa-lg"></i>');

	$('.flex-next').html(' <i class="fa fa-long-arrow-right fa-lg"></i>');
	$('.flex-prev').html(' <i class="fa fa-long-arrow-left fa-lg"></i>');


	/**
	 * This was built using the scrollie jQuery Plugin
	 */


	var wHeight = $(window).height();

	$('.scrollie')
		.height(wHeight)
		.scrollie({
			scrollOffset: -250,
			scrollingInView: function (elem) {
				var bgColor = elem.data('background');
				$('body').css('background-color', bgColor);

			}
		});


	$("#typed").typed({
		// strings: ["Typed.js is a <strong>jQuery</strong> plugin.", "It <em>types</em> out sentences.", "And then deletes them.", "Try it out!"],
		stringsElement: $('#typed-strings ul'),
		typeSpeed: 30,
		backDelay: 500,
		loop: false,
		contentType: 'html', // or text
		// defaults to false for infinite loop
		loopCount: false,
		callback: function () {
			foo();
		},
		resetCallback: function () {
			newTyped();
		}
	});


	function newTyped() { /* A new typed object */ }

	function foo() {
		console.log("Callback");
	}


	/**
	 * Customizer remove style row
	 */


	$(".global-customizer-color .vc_row-overlay").removeAttr('style');


	/**
	 * full Width Section 
	 */


	function fullWidthSection() {

		var windowWidth = $(window).width();
		var widthContainer = $('.home-template > .container, .portfolio-section  > .container').width() + 30;

		var fullWidth1 = windowWidth - widthContainer;
		var fullWidth2 = fullWidth1 / 2;

		$('.js_stretch_anchor').css("width", windowWidth);
		$('.js_stretch_anchor').css("margin-left", -fullWidth2);

		$(' .jarallax-full-width').css("min-width", windowWidth);
		$(' .jarallax-full-width').css("margin-left", -fullWidth2);


		var widthContainerFooter = $('.footer-wrap  >  .container').width();

		var fullWidthFoot = windowWidth - widthContainerFooter;
		var fullWidthFoot2 = fullWidthFoot / 2;

		$('.vertical-left').css("left", -fullWidth2);
		$('.vertical-right').css("right", -fullWidth2);

	}

	fullWidthSection();


	/**
	 * Portfolio sticky menu
	 */

	$(".sticky-bar").stick_in_parent();

});

new WOW().init();