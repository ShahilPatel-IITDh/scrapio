jQuery(function ($) {
	'use strict';

	var $window = $(window);
	var $body = $('body');


	/* -----------------------------------------
	 Listing controls submit
	 ----------------------------------------- */
	var $filtersForm = $( '#package-search-filters' );
	var $listingControls = $( '.listing-controls' );

	if ( $listingControls.length ) {
		$( 'input[name="listing-view"], select[name="listing-orderby"]', $listingControls ).change( function () {

			if ( $filtersForm.length ) {
				$( '#hidden-listing-view' ).val( $( '.listing-controls input[name="listing-view"]:checked' ).val() );
				$( '#hidden-listing-orderby' ).val( $( '.listing-controls select[name="listing-orderby"]' ).val() );
				$filtersForm.submit();
			} else {
				this.form.submit();
			}

		} );
	}


	/* -----------------------------------------
	 Responsive Menus Init with mmenu
	 ----------------------------------------- */
	var $navWrap = $('.nav');
	var $navSubmenus = $navWrap.find('ul');
	var $mainNav = $('.navigation-main');
	var $mobileNav = $('#mobilemenu');

	$mainNav.each(function () {
		var $this = $(this);
		$this.clone()
			.removeAttr('id')
			.removeClass()
			.appendTo($mobileNav.find('ul'));
	});
	$mobileNav.find('li').removeAttr('id');

	$mobileNav.mmenu({
		offCanvas: {
			position: 'top',
			zposition: 'front'
		},
		autoHeight: true,
		navbars: [
			{
				position: 'top',
				content: [
					'prev',
					'title',
					'close'
				]
			}
		]
	});

	/* -----------------------------------------
	Menu classes based on available free space
	----------------------------------------- */
	function setMenuClasses() {
		if (!$navWrap.is(':visible')) {
			return;
		}

		var windowWidth = $window.width();

		$navSubmenus.each(function () {
			var $this = $(this);
			var $parent = $this.parent();
			$parent.removeClass('nav-open-left');
			var leftOffset = $this.offset().left + $this.outerWidth();

			if (leftOffset > windowWidth) {
				$parent.addClass('nav-open-left');
			}
		});
	}

	setMenuClasses();

	var resizeTimer;

	$window.on('resize', function () {
	  clearTimeout(resizeTimer);
	  resizeTimer = setTimeout(function () {
			setMenuClasses();
	  }, 350);
	});

	/* -----------------------------------------
	 Sticky Header
	 ----------------------------------------- */
	var $headSticky =  $('.head-sticky');
	$headSticky.stick_in_parent({
		parent: 'body',
		sticky_class: 'is-stuck',
	});

	/* -----------------------------------------
	 Header Search Toggle
	 ----------------------------------------- */
	var $searchTrigger = $('.head-search-trigger');
	var $headSearchForm = $('.head-search-form');

	function dismissHeadSearch(e) {
		if (e) {
			e.preventDefault();
		}

		$headSearchForm.removeClass('head-search-expanded');
		$body.focus();
	}

	function displayHeadSearch(e) {
		if (e) {
			e.preventDefault();
		}

		$headSearchForm
			.addClass('head-search-expanded')
			.find('input')
			.focus();
	}

	function isHeadSearchVisible() {
		return $headSearchForm.hasClass('head-search-expanded')
	}

	$searchTrigger.on('click', displayHeadSearch);

	/* Event propagations */
	$(document).on('keydown', function (e) {
		e = e || window.e;
		if (e.keyCode === 27 && isHeadSearchVisible()) {
			dismissHeadSearch(e);
		}
	});

	$body
		.on('click', function (e) {
			if (isHeadSearchVisible()) {
				dismissHeadSearch();
			}
		})
		.find('.head-search-form, .head-search-trigger')
		.on('click', function (e) {
			e.stopPropagation();
		});

	/* -----------------------------------------
	 Responsive Videos with fitVids
	 ----------------------------------------- */
	$body.fitVids();

	/* -----------------------------------------
	 Grid Animations Init
	 ----------------------------------------- */
	var $itemEffectLists = $('.row-effect');

	if ($itemEffectLists.length && window.AnimOnScroll) {
		$itemEffectLists.each(function () {
			var el = $(this).get(0);

			new AnimOnScroll(el, {
				minDuration: 0.4,
				maxDuration: 0.7,
				viewportFactor: 0.2
			});
		});
	}

	/* -----------------------------------------
	 Expandable Content
	 ----------------------------------------- */
	var $expandButton = $('.btn-content-expand');

	$expandButton.on('click', function (event) {
		event.preventDefault();

		var $this = $(this);
		var $label = $this.find('.btn-text');
		var $icon = $this.find('.fas');
		var $expandable = $this.siblings('.entry-content-collapsible');

		if ($expandable.hasClass('expanded')) {
			$expandable.removeClass('expanded');
			$label.text($this.data('more-text'));
			$icon.removeClass('fa-angle-up');
		} else {
			$expandable.addClass('expanded');
			$label.text($this.data('less-text'));
			$icon.addClass('fa-angle-up');
		}
	});

	/* -----------------------------------------
	 Smooth scrolling navigation
	 ----------------------------------------- */
	var $titleNav = $('.entry-title-navigation');
	var $entryContent = $('.entry-content');
	var $titles = $entryContent.find('.anchor-title');

	(function createPostContentNavigation() {
		var $linkTemplate = $titleNav.children().first();

		if (!$titles.length) {
			$titleNav.hide();
			return;
		}

		$titles.each(function () {
			var $this = $(this);
			var id = $this.attr('id');

			if (!id) {
				id = $this.text().replace(/\s/g,'');
				$this.attr('id', id);
			}
			var $link = $linkTemplate.clone();
			$link
				.attr('href', '#' + id)
				.find('.entry-title-navigation-link-label')
				.text($this.text());
			$titleNav.append($link);
		});

		$titleNav.addClass('visible');
		var $navLinks = $('.entry-title-navigation-link');
		$navLinks.on('click', function (event) {
			event.preventDefault();
			var $this = $(this);
			var $target = $($this.attr('href'));
			var offset = ($headSticky.outerHeight() || 0) + 25;

			$('html, body').animate({
				scrollTop: $target.offset().top - offset,
			}, 250);
		});
	})();

	var navIds = $titleNav
		.find('.entry-title-navigation-link')
		.map(function () {
			return $(this).attr('href');
		})
		.get();
	var $contentSections = $(navIds.join(','));

	var scrollTimer;

	$window.on('scroll', (function () {
		clearTimeout(scrollTimer);

		scrollTimer = setTimeout(function () {
			var scrollDistance = $window.scrollTop();

			// Assign active class to nav links while scolling
			$contentSections.each(function (i) {
				var $this = $(this);
				if ($this.position().top + 150 <= scrollDistance) {
					$titleNav.find('.active').removeClass('active');
					$titleNav.find('.entry-title-navigation-link').eq(i).addClass('active');
				}
			});
		}, 100);
	})).scroll();

	/* -----------------------------------------
	 jQuery Chosen
	 ----------------------------------------- */
	var $selects = $('.chosen-select, .theme-form select');
	$selects.each(function () {
		var $this = $(this);

		$this.chosen({
			width: '100%',
			inherit_select_classes: true,
			disable_search: !$this.data('enable-search'),
		});
	});

	/* -----------------------------------------
	 Range sliders
	 ----------------------------------------- */
	$('.range-slider').each(function () {
		var $this = $(this);
		var $values = $this.find('+ .range-slider-values');
		var slider = $this.get(0);
		var rangeStart = $this.data('range-start');
		var rangeEnd = $this.data('range-end');
		var start = $this.data('start') || rangeStart;
		var end = $this.data('end') || rangeEnd;
		var step = $this.data('step');
		var $inputMin = $this.find('.range-min');
		var $inputMax = $this.find('.range-max');

		noUiSlider.create(slider, {
			connect: true,
			behaviour: 'tap',
			start: [start, end],
			step: step,
			range: {
				min: [rangeStart],
				max: [rangeEnd],
			},
		});

		slider.noUiSlider.on('update', function(values, handle) {
			$values.find('.value').eq(handle).text(
				parseFloat(values[handle]).toLocaleString()
			);
			$inputMin.val(values[0]);
			$inputMax.val(values[1]);
		});
	});

	/* -----------------------------------------
	 Footer extra padding requirements
	 ----------------------------------------- */
	var $footer = $('.footer');
	var $footerWidgets = $('.footer-widgets');
	var $footerWigetSections = $('.footer-widget-sections');
	var $footerFilterForm = $footerWigetSections.find(
		'.widget_ci-filter-form:last-child,' +
		'.widget_ci-home-filter-form:last-child'
	);

	if ($footerFilterForm.length) {
		$footer.addClass('footer-extra-pad');

		if (!$footerWidgets.length) {
			$footer.addClass('footer-extra-pad-2');
		}
	}

	/* -----------------------------------------
	 WooCommerce plus minus
	 ----------------------------------------- */
	var $qtyBtn = $( '.qty-btn' );

	$qtyBtn.on( 'click', function () {
		var $this        = $( this );
		var $input       = $this.parent().find( 'input[type="number"]' );
		var placeholder  = parseInt( $input.attr('placeholder') ) || 0;
		var min          = parseInt( $input.attr( 'min' ) || 0, 10 );
		var max          = parseInt( $input.attr( 'max' ) || 99999, 10 );
		var currentVal   = parseInt($input.val(), 10) ? parseInt($input.val(), 10) : placeholder;
		var isMinus      = $this.hasClass( 'qty-minus' );

		if ( isMinus ) {
			$input.val( Math.max( currentVal - 1, min ) );
		} else {
			$input.val( Math.min( currentVal + 1, max ) );
		}
	} );

	/* -----------------------------------------
	 Video Backgrounds
	 ----------------------------------------- */
	var $videoBg = $('.cousteau-pro-video-background');

	// YouTube videos
	function onYouTubeAPIReady($videoBg) {
		if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
			return setTimeout(onYouTubeAPIReady.bind(null, $videoBg), 333);
		}

		var $videoWrap = $videoBg.parents('.cousteau-pro-video-wrap');
		var $video = $videoBg.find('div').get(0);
		var ytPlayer = new YT.Player($video, {
			videoId: $videoBg.data('video-id'),
			playerVars: {
				autoplay: 1,
				controls: 0,
				showinfo: 0,
				modestbranding: 1,
				loop: 1,
				playlist: $videoBg.data('video-id'),
				fs: 0,
				cc_load_policy: 0,
				iv_load_policy: 3,
				autohide: 0
			},
			events: {
				onReady: function (event) {
					event.target.mute();
				},
				onStateChange: function (event) {
					if (event.data === YT.PlayerState.PLAYING) {
						$videoWrap.addClass('visible');
					}
				}
			}
		});
	}

	function onVimeoAPIReady($videoBg) {
		if (typeof Vimeo === 'undefined' || typeof Vimeo.Player === 'undefined') {
			return setTimeout(onVimeoAPIReady.bind(null, $videoBg), 333);
		}

		var $videoWrap = $videoBg.parents('.cousteau-pro-video-wrap');
		var player = new Vimeo.Player($videoBg, {
			id: $videoBg.data('video-id'),
			loop: true,
			autoplay: true,
			byline: false,
			title: false,
			autopause: false,
			muted: true,
		});

		player.setVolume(0);

		// Cuepoints seem to be the best way to determine
		// if the video is actually playing or not
		player.addCuePoint(.1).catch(function () {
			$videoWrap.addClass('visible');
		});

		player.on('cuepoint', function () {
			$videoWrap.addClass('visible');
		});
	}

	if ($videoBg.length && window.innerWidth > 1080) {
		$videoBg.each(function () {
			var $this = $(this);
			var firstScript = $('script');
			var videoType = $this.data('video-type');

			if (videoType === 'youtube') {
				if (!$('#youtube-api-script').length) {
					var tag = $('<script />', { id: 'youtube-api-script' });
					tag.attr('src', 'https://www.youtube.com/player_api');
					firstScript.parent().prepend(tag);
				}
				onYouTubeAPIReady($this);
			} else if (videoType === 'vimeo') {
				if (!$('#vimeo-api-script').length) {
					var tag = $('<script />', { id: 'vimeo-api-script' });
					tag.attr('src', 'https://player.vimeo.com/api/player.js');
					firstScript.parent().prepend(tag);
				}
				onVimeoAPIReady($this);
			}
		});
	}

	/* -----------------------------------------
	 Datepicker on search box
	 ----------------------------------------- */
	$( "#package-starting-date" ).datepicker({
		dateFormat: 'yy-mm-dd'
	});

	$window.on('load', function () {
		/* -----------------------------------------
		 Hero Slideshow
		 ----------------------------------------- */
		var $heroSlideshow = $('.page-hero-slideshow');
		var navigation = $heroSlideshow.data('navigation');
		var effect = $heroSlideshow.data('effect');
		var speed = $heroSlideshow.data('slide-speed');
		var auto = $heroSlideshow.data('autoslide');

		if ($heroSlideshow.length) {
			$heroSlideshow.slick({
				arrows: navigation === 'arrows' || navigation === 'all',
				dots: navigation === 'dots' || navigation === 'all',
				fade: effect === 'fade',
				autoplaySpeed: speed,
				autoplay: auto === true,
				prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-angle-left"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fas fa-angle-right"></i></button>'
			});
		}

		/* -----------------------------------------
		 Sticky side navigation (tour page)
		 ----------------------------------------- */
		$('.content-sticky').stick_in_parent({
			parent: '.content-sticky-parent',
			sticky_class: 'is-stuck',
			offset_top: $headSticky.outerHeight() + 25 || 25,
			inner_scrolling: false,
		});

		/* -----------------------------------------
		 Masonry
		 ----------------------------------------- */
		$('.row-isotope').isotope();
	});
});
