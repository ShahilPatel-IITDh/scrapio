function journal_enable_countdown() {
	$('.countdown').each(function () {

		var $this = $(this);

		if ($this.data('_isEnabled')) {
			return;
		}

		$this.data('_isEnabled', true);

		$this.countdown({
			date: $this.data('date'),
			render: function (data) {
				return $(this.el).html(
					'<div>' + this.leadingZeros(data.days, 2) + ' <span>' + Journal['countdownDay'] + '</span></div>' +
					'<div>' + this.leadingZeros(data.hours, 2) + ' <span>' + Journal['countdownHour'] + '</span></div>' +
					'<div>' + this.leadingZeros(data.min, 2) + ' <span>' + Journal['countdownMin'] + '</span></div>' +
					'<div>' + this.leadingZeros(data.sec, 2) + ' <span>' + Journal['countdownSec'] + '</span></div>');
			}
		});
	});
}

function journal_enable_stepper() {
	$('.stepper').each(function () {
		var $this = $(this);

		if ($this.data('_isEnabled')) {
			return;
		}

		$this.data('_isEnabled', true);

		var $input = $this.find('input[name^="quantity"]');
		var value = $input.val();
		var minimum = parseInt($input.data('minimum')) || 1;

		$this.find('.fa-angle-up').on('click', function () {
			$input.val(parseInt($input.val()) + 1);
			$input.trigger('change');
		});

		$this.find('.fa-angle-down').on('click', function () {
			if (parseInt($input.val()) > minimum) {
				$input.val(parseInt($input.val()) - 1);
				$input.trigger('change');
			}
		});

		$input.on('keypress', function (e) {
			if ((e.which < 48 || e.which > 57) && [8].indexOf(e.which) === -1) {
				e.preventDefault();
			}
		});

		$input.on('keydown', function (e) {
			if (e.which === 38) {
				e.preventDefault();
				$input.val(parseInt($input.val()) + 1);
				$input.trigger('change');
			}

			if (e.which === 40) {
				e.preventDefault();
				if (parseInt($input.val()) > minimum) {
					$input.val(parseInt($input.val()) - 1);
					$input.trigger('change');
				}
			}
		});

		$input.on('blur', function () {
			if ($('html').hasClass('firefox')) {
				// window.getSelection().removeAllRanges();
			}

			if ((parseInt($input.val()) || 0) < minimum) {
				$input.val(value);
				$input.trigger('change');
			}
		});
	});
}

jQuery(function ($) {
	var $html = $('html');
	var $body = $('body');
	var $content = $('#content');
	var $column_left = $('#column-left');
	var $column_right = $('#column-right');
	var $panel_group = $('.panel-group');
	var $main_products = $('.main-products');

	// lazyload
	Journal.lazyLoadInstance = new LazyLoad({
		elements_selector: '.lazyload',
		class_loading: 'lazyloading',
		class_loaded: 'lazyloaded'
	});

	// Tooltip class
	$(document).on('show.bs.tooltip', function (e) {
		if ($html.hasClass('touchevents')) {
			e.preventDefault();
		}

		var $target = $(e.target);
		var cls = $target.data('tooltipClass');

		if (cls) {
			$target.data('bs.tooltip').$tip.addClass(cls);
		}
	});

	// Popover class
	$(document).on('show.bs.popover', function (e) {
		if ($html.hasClass('touchevents')) {
			e.preventDefault();
		}

		var $target = $(e.target);
		var cls = $target.data('popoverClass');

		if (cls) {
			$target.data('bs.popover').$tip.addClass(cls);
		}
	});

	// Datepicker class
	$(document).on('dp.show', function (e) {
		var $target = $(e.target);
		var cls = $target.data('pickerClass');

		if (cls) {
			$target.data('DateTimePicker').widget.addClass(cls);
		}
	});

	// Dropdowns animation
	$(document).on('shown.bs.dropdown', function (e) {
		var $target = $(e.target);
		var $toggle = $target.find('> .dropdown-toggle');

		$toggle.addClass('disabled');

		// reflow
		$target.outerWidth();

		$target.addClass('animating');
	});

	$(document).on('hide.bs.dropdown', function (e) {
		var $target = $(e.target);
		var $toggle = $target.find('> .dropdown-toggle');

		$target.removeClass('animating');

		$toggle.removeClass('disabled');

		$('html.search-page').removeClass('search-page-open');
	});

	// Dropdowns
	if ('ontouchstart' in document) {
		$('.main-menu .dropdown .dropdown > .dropdown-toggle, .flyout-menu .dropdown .dropdown > .dropdown-toggle, .mini-search .search-categories-button').on('click', function (e) {
			var $this = $(this);
			var $parent = $this.parent();
			var isOpen = $parent.hasClass('open');
			var isLink = false;

			// close other dropdowns
			$parent.parent().find('.open').removeClass('open');

			// toggle current dropdown
			if (isOpen) {
				if ($this.attr('href')) {
					isLink = true;
				} else {
					$parent.removeClass('open').trigger('hide.bs.dropdown');
				}
			} else {
				$parent.addClass('open').trigger('shown.bs.dropdown');
			}

			if (!isLink) {
				return false;
			}
		});
	} else {
		// Dropdowns on hover
		function mouseOver() {
			var $this = $(this);
			var $trigger = $('> .dropdown-toggle', this);

			clearTimeout(this.__timeout);

			$trigger.attr('aria-expanded', 'true').attr('data-toggle', '');

			$this.addClass('open');

			// reflow
			$this.outerWidth();

			$this.addClass('animating');
		}

		function mouseOut() {
			var $this = $(this);
			var $trigger = $('> .dropdown-toggle', this);

			$this.removeClass('animating');

			clearTimeout(this.__timeout);

			this.__timeout = setTimeout(function () {
				$this.removeClass('open');

				$trigger.attr('aria-expanded', 'false');
			}, 300);
		}

		$('.dropdown').each(function () {
			var $this = $(this);

			if ($this.is($('.search-page #search'))) {
				$('> .dropdown-toggle', this).on('click', function () {
					$('html.search-page').addClass('search-page-open');

					var $this = $(this);
					var $parent = $this.parent();
					var isOpen = $parent.hasClass('open');
					var isLink = false;

					// close other dropdowns
					$parent.parent().find('.open').removeClass('open');

					// toggle current dropdown
					if (isOpen) {
						if ($this.attr('href')) {
							isLink = true;
						} else {
							$parent.removeClass('open').trigger('hide.bs.dropdown');
						}
					} else {
						$parent.addClass('open').trigger('shown.bs.dropdown');
					}

					if (!isLink) {
						return false;
					}
				});
			} else if ($this.hasClass('main-menu-item')) {
				$this.hoverIntent(mouseOver, mouseOut);
			} else {
				$this.hover(mouseOver, mouseOut);
			}
		});
	}

	// Collapse .panel-active toggle
	$panel_group.on('show.bs.collapse', function (e) {
		$(e.target).parent().addClass('panel-active');
		$(e.target).parent().removeClass('panel-collapsed');
	});

	$panel_group.on('hide.bs.collapse', function (e) {
		$(e.target).parent().removeClass('panel-active');
		$(e.target).parent().addClass('panel-collapsing');
	});

	$panel_group.on('hidden.bs.collapse', function (e) {
		$(e.target).parent().removeClass('panel-collapsing');
		$(e.target).parent().addClass('panel-collapsed');
	});

	// Accordion Menu Collapse .open toggle
	$(document).delegate('.accordion-menu span[data-toggle="collapse"]', 'click', function (e) {
		e.preventDefault();

		$(this).closest('.menu-item').toggleClass('open');
	});

	$(document).delegate('.mobile .accordion-menu li > a', 'click', function (e) {
		var $this = $(this);
		var $trigger = $this.find('.open-menu');

		if (!$trigger.length) {
			return;
		}

		if ($trigger.attr('aria-expanded') === 'true' && $this.attr('href')) {
			return;
		}

		e.preventDefault();

		$($trigger.data('target')).collapse('toggle');
	});

	// Infinite Scroll
	if (Journal['infiniteScrollStatus'] && $.ias && $main_products.length) {
		Journal.infiniteScrollInstance = $.ias({
			container: '.main-products',
			item: '.product-layout',
			pagination: '.pagination-results',
			next: '.pagination a.next'
		});

		Journal.infiniteScrollInstance.extension(new IASTriggerExtension({
			offset: parseInt(Journal['infiniteScrollOffset'], 10) || Infinity,
			text: Journal['infiniteScrollLoadNext'],
			textPrev: Journal['infiniteScrollLoadPrev'],
			htmlPrev: '<div class="ias-trigger ias-trigger-prev"><a class="btn">{text}</a></div>',
			html: '<div class="ias-trigger ias-trigger-next"><a class="btn">{text}</a></div>'
		}));

		Journal.infiniteScrollInstance.extension(new IASSpinnerExtension({
			html: '<div class="ias-spinner"><i class="fa fa-spinner fa-spin"></i></div>'
		}));

		Journal.infiniteScrollInstance.extension(new IASNoneLeftExtension({
			text: Journal['infiniteScrollNoneLeft']
		}));

		Journal.infiniteScrollInstance.extension(new IASPagingExtension());

		Journal.infiniteScrollInstance.extension(new IASHistoryExtension({
			prev: '.pagination a.prev'
		}));

		Journal.infiniteScrollInstance.on('load', function (event) {
			try {
				var u = new URL(event.url);

				u.host = window.location.host;
				u.hostname = window.location.hostname;
				u.protocol = window.location.protocol;

				event.url = u.toString();
			} catch (e) {
			}
		});

		Journal.infiniteScrollInstance.on('loaded', function (data) {
			$('.pagination-results').html($(data).find('.pagination-results'));
		});

		Journal.infiniteScrollInstance.on('rendered', function (data) {
			Journal.lazyLoadInstance && Journal.lazyLoadInstance.update();

			journal_enable_countdown();

			journal_enable_stepper();
		});
	}

	// Revolution Slider
	$('.revolution').each(function () {
		var $this = $(this);
		var $img = $('>img', this);

		$this.css('height', $img.height());

		var options = $.extend(true, {
			spinner: 'off',
			sliderType: 'standard',
			sliderLayout: 'auto',
			autoHeight: 'on',
			navigation: {
				arrows: { enable: true }
			}
		}, $this.data('options'));

		var $slider = $('.rev_slider', this).revolution(options);

		$slider.on('revolution.slide.onloaded', function () {
			$img.remove();
			$this.removeClass('rev_hide_navigation');

			$this.find('.tp-caption-hotspot').popover({
				container: 'body',
				trigger: 'hover',
				html: true,
				template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>'
			});
		});

		$slider.on('revolution.slide.onchange', function () {
			$this.removeAttr('style');
		});

		$this.data('slider', $slider);
	});

	// Layer Slider
	$('.layerslider').each(function () {
		var $this = $(this);

		var $img = $('>img', this);

		$this.css({
			width: $this.width(),
			height: $this.height()
		});

		// var props = [
		// 	'border-top-width',
		// 	'border-bottom-width',
		// 	'border-left-width',
		// 	'border-right-width'
		// ];
		//
		// $this.find('.ls-layer').each(function () {
		// 	var $this = $(this);
		// 	var css = {};
		//
		// 	props.forEach(function (prop) {
		// 		css[prop] = $this.css(prop);
		// 	});
		//
		// 	$this.css(css);
		// });

		var options = $.extend(true, {
			sliderVersion: '6.1.0',
			skin: 'v6',
			maxRatio: 1,
			navStartStop: false,
			showCircleTimer: false,
			tnContainerWidth: '100%',
			skinsPath: 'catalog/view/theme/journal3/lib/layerslider/skins/'
		}, $this.data('options'));

		$this.on('sliderDidLoad', function () {
			$img.remove();
		});

		var $slider = $this.layerSlider(options);

		$slider.on('slideTimelineDidCreate', function () {
			$this.find('.ls-layer-hotspot').each(function () {
				var $this = $(this);

				if (!$this.data('bs.popover')) {
					$this.popover({
						container: 'body',
						trigger: 'hover',
						html: true,
						template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>'
					});
				}
			});
		});
	});

	// Master Slider
	$('.master-slider').each(function () {
		var $this = $(this);

		var options = $.extend(true, {
			loop: true,
			mobileBGVideo: true
		}, $this.data('options'));

		var $slider = $this.masterslider(options);

		var $img = $('>img', $(this).parent());

		$slider.masterslider('slider').api.addEventListener(MSSliderEvent.INIT, function () {

			$slider.parent().find('.journal-loading').remove();

			$img.css({
				position: 'absolute',
				'z-index': -1
			});

			setTimeout(function () {
				$img.remove();
				$this.parent().css('background-image', 'none');
			}, 1500);
		});

		$slider.masterslider('slider').api.addEventListener(MSSliderEvent.CHANGE_START, function () {
			$this.find('video').each(function () {
				$(this)[0].pause();
			});
		});

		// var $current = null;

		// $slider.masterslider('slider').api.addEventListener(MSSliderEvent.CHANGE_START, function (e) {
		// 	$('.no-animation').removeClass('no-animation');
		// 	$('.ms-prev').removeClass('ms-prev');
		// 	$('.ms-next').removeClass('ms-next').addClass('ms-prev');
		// 	$(e.target.currentSlide.$element).addClass('ms-next');
		// 	$('.ms-slide').not($(e.target.currentSlide.$element)).not($current).each(function () {
		// 		$(this).addClass('no-animation');
		// 	});
		// });
		//
		// $slider.masterslider('slider').api.addEventListener(MSSliderEvent.CHANGE_END, function (e) {
		// 	$('.no-animation').removeClass('no-animation');
		// 	$current = $(e.target.currentSlide.$element);
		// });

		if ($this.data('parallax')) {
			MSScrollParallax.setup($slider.masterslider('slider'), 0, $this.data('parallax'), false);
		}
	});

	// Isotope
	$('.isotope').each(function () {
		var $this = $(this);
		var filter = $this.find('ul .active a').attr('data-filter') || null;

		var $isotope = $this.find('.isotope-grid').isotope({
			itemSelector: '.isotope-item',
			filter: filter
		});

		$this.find('ul a').on('click', function () {
			var $this2 = $(this);

			$this.find('ul li').removeClass('active');
			$this2.closest('li').addClass('active');

			$isotope.isotope({
				filter: $this2.attr('data-filter')
			});
		});
	});

	// Swiper
	$('.swiper').each(function () {
		var $this = $(this);
		var c = 'c0';

		if ($content.has($this).length) {
			c = 'c' + window['Journal']['columnsCount'];
		} else if ($column_left.has($this).length || $column_right.has($this).length) {
			c = 'sc';
		}

		var itemsPerRow = $this.data('items-per-row') ? $this.data('items-per-row')[c] : { 0: { items: 1, spacing: 0 } };
		var breakpoints = {};

		$.each(itemsPerRow, function (v, k) {
			breakpoints[v] = {
				slidesPerView: parseInt(k.items, 10),
				slidesPerGroup: parseInt(k.items, 10),
				spaceBetween: parseInt(k.spacing, 10)
			}
		});

		var options = $.extend({
			init: false,
			slidesPerView: parseInt(itemsPerRow[0].items, 10),
			slidesPerGroup: parseInt(itemsPerRow[0].items, 10),
			spaceBetween: parseInt(itemsPerRow[0].spacing, 10),
			breakpoints: breakpoints,
			observer: true,
			observeParents: true,
			paginationClickable: true,
			preventClicks: false,
			preventClicksPropagation: false,
			simulateTouch: true,
			watchSlidesProgress: true,
			watchSlidesVisibility: true,
			navigation: {
				nextEl: $this.find('.swiper-button-next'),
				prevEl: $this.find('.swiper-button-prev')
			},
			pagination: {
				el: $this.find('.swiper-pagination'),
				type: 'bullets',
				clickable: true
			},
			scrollbar: $this.find('.swiper-scrollbar'),
			scrollbarHide: false,
			scrollbarDraggable: true
		}, $this.data('options'));

		if (options.loop && ($(this).find('.swiper-slide').length < 2)) {
			options.loop = false;
		}

		if (!Journal.isDesktop) {
			options.a11y = false;
		}

		var swiper = new Swiper($('.swiper-container', this), options);

		function checkPages() {
			if ($('.product-image').hasClass('direction-vertical') && $this.hasClass('additional-images')) {
				var height = Journal['isPopup'] ? Journal['quickviewPageStyleAdditionalImagesHeightAdjustment'] : Journal['productPageStyleAdditionalImagesHeightAdjustment'];

				var interval = setInterval(function () {
					var imageHeight = $('.main-image .swiper-slide-visible img').outerHeight();

					if (imageHeight) {
						$this.css('height', imageHeight + (parseInt(height, 10) || 0));

						swiper.update();

						clearInterval(interval);

						$('.product-image').addClass('additional-images-loaded');
					}
				}, 1000);
			}

			if (swiper.isBeginning && swiper.isEnd) {
				$this.removeClass('swiper-has-pages');
			} else {
				$this.addClass('swiper-has-pages');
			}
		}

		swiper.on('init', checkPages);

		swiper.on('resize', checkPages);

		swiper.init();

		if (options.autoplay) {
			// pause on hover
			if (options.pauseOnHover) {
				$('.swiper-container', this).hover(function () {
					swiper.autoplay.stop();
				}, function () {
					swiper.autoplay.start();
				});
			}

			// stop autoplay for elements not in viewport
			swiper.on('observerUpdate', function () {
				var visible = $(swiper.$el).is(':visible');
				var running = swiper.autoplay.running;

				if (visible && !running) {
					swiper.autoplay.start();
				}

				if (!visible && running) {
					swiper.autoplay.stop();
				}
			});
		}

		swiper.on('observerUpdate', function () {
			Journal.lazyLoadInstance && Journal.lazyLoadInstance.update();
		});

		$this.data('swiper', swiper);
	});

	// Gallery
	$(document).delegate('[data-gallery]', 'click', function () {
		var $this = $(this);
		var $gallery = $($this.data('gallery'));
		var index = parseInt($this.data('index'), 10) || 0;

		if ($gallery.data('lightGallery')) {
			$gallery.data('lightGallery').s.index = index;
		}

		$gallery.lightGallery($.extend({
			dynamic: true,
			dynamicEl: $gallery.data('images'),
			index: index,
			download: false,
			loadYoutubeThumbnail: false,
			loadVimeoThumbnail: false,
			share: false,
			pager: false,
			fullScreen: false,
			autoplay: false,
			autoplayControls: false,
			thumbWidth: 100,
			thumbContHeight: 100,
			thumbMargin: 0,
			showThumbByDefault: true,
			hash: false
		}, $gallery.data('options')));

		$gallery.on('onAfterOpen.lg', function () {
			$('.lg-backdrop').addClass($gallery.data('lightGallery').s.addClass);
		});

		return false;
	});

	// Catalog
	$('.module-catalog.image-on-hover .subitem').hover(function () {
		var $this = $(this);
		var $img = $this.closest('.item-content').find('.catalog-image img');

		if ($img.length) {
			$img[0]._src = $img.attr('src');
			$img[0]._srcSet = $img.attr('srcset');

			$img.attr('src', $this.data('image'));
			$img.attr('srcset', $this.data('image2x'));
		}
	}, function () {
		var $this = $(this);
		var $img = $this.closest('.item-content').find('.catalog-image img');

		if ($img.length) {
			$img.attr('src', $img[0]._src);
			$img.attr('srcset', $img[0]._srcSet);
		}
	});

	// Module Blocks Tab Expand
	$('.block-expand').on('click', function () {
		$(this).closest('.expand-block').find('.expand-content').toggleClass('block-expanded');
	});

	//Search focus
	$('.search-input').focus(
		function () {
			$(this).closest('.header-search').addClass('focused');
		}).blur(
		function () {
			$(this).closest('.header-search').removeClass('focused');
		});

	// Stepper
	journal_enable_stepper();

	// Countdown
	journal_enable_countdown();

	// Blog Search
	$('.module-blog_search').each(function () {
		var $this = $(this);
		var $input = $this.find('input');
		var $button = $this.find('button');

		$button.on('click', function () {
			var search = $input.val().trim();

			if (search) {
				parent.window.location = $this.data('url') + encodeURIComponent(search);
			}
		});

		$input.on('keydown', function (e) {
			if (e.keyCode === 13) {
				var search = $input.val().trim();

				if (search) {
					parent.window.location = $this.data('url') + encodeURIComponent(search);
				}
			}
		});
	});

	// Newsletter Module
	$(document).delegate('.module-newsletter .btn-primary', 'click', function (e) {
		e.preventDefault();

		var $this = $(this);
		var $form = $this.closest('form');

		function ajax(unsubscribe) {
			$.ajax({
				url: $form.attr('action') + (unsubscribe ? '&unsubscribe=1' : ''),
				type: 'post',
				dataType: 'json',
				data: $form.serialize(),
				beforeSend: function () {
					$this.button('loading');
				},
				complete: function () {
					$this.button('reset');
				},
				success: function (json) {
					if (json.status === 'success') {
						if (json.response.unsubscribe) {
							if (confirm(json.response.message)) {
								ajax(true);
							}
						} else {
							alert(json.response.message);
						}
					} else {
						alert(json.response);
					}
				},
				error: function (xhr, ajaxOptions, thrownError) {
					alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
				}
			})
		}

		ajax();
	});

	// Header Notice
	$('.module-header_notice').each(function () {
		var $this = $(this);
		var options = $this.data('options');
		var cookie = 'hn-' + options['cookie'];

		if (!Cookies.get(cookie)) {
			$this.slideDown();
		}

		$this.find('.header-notice-close-button button').on('click', function () {
			anime({
				targets: $this[0],
				height: 0,
				duration: parseInt(options['duration']),
				easing: options['ease'],
				complete: function () {
					$this.remove();
				}
			});

			Cookies.set(cookie, '1', { expires: 365 });
		});
	});

	// Layout Notice
	$('.module-layout_notice').each(function () {
		var $this = $(this);
		var options = $this.data('options');
		var cookie = 'ln-' + options['cookie'];

		if (!Cookies.get(cookie)) {
			$this.slideDown();
		}

		$this.find('.layout-notice-close-button button').on('click', function () {
			anime({
				targets: $this[0],
				height: 0,
				duration: parseInt(options['duration']),
				easing: options['ease'],
				complete: function () {
					$this.remove();
				}
			});

			Cookies.set(cookie, '1', { expires: 365 });
		});
	});

	// Notification Module
	$('.module-notification').each(function () {
		var $this = $(this);
		var options = $this.data('options');
		var cookie = 'n-' + options['cookie'];

		if (!Cookies.get(cookie)) {
			$this.find('.notification-close').on('click', function () {
				Cookies.set(cookie, '1', { expires: 365 });
			});
		}
	});

	$(document).delegate('.notification-close', 'click', function () {
		var $this = $(this);
		var height = $this.parent().outerHeight();

		$this.parent().next('div').css('margin-top', -height);

		$('.removed').removeClass('removed');

		$this.parent().addClass('fade-out').on('transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd', function () {
			$(this).next('div').addClass('removed').css('margin-top', '');
			$(this).remove();
		});
	});

	// Popup Module
	$('.module-popup').each(function () {
		var $this = $(this);
		var options = $.extend({
			message: $this.html(),
			timeout: 0
		}, $this.data('options'));
		var cookie = 'p-' + options['cookie'];

		if (!Cookies.get(cookie)) {
			setTimeout(function () {
				$('html').addClass('popup-open popup-center');

				var $checkbox = $this.find('.popup-dont-show input[type="checkbox"]');

				$checkbox.on('change', function () {
					if ($(this).is(':checked')) {
						Cookies.set(cookie, '1', { expires: 365 });
					} else {
						Cookies.remove(cookie);
					}
				});

				if ($checkbox.is(':checked')) {
					Cookies.set(cookie, '1', { expires: 365 });
				}
			}, parseInt(options['showAfter'], 10) || 1);
		}

		var hideAfter = parseInt(options['hideAfter'], 10) || 0;

		if (hideAfter) {
			setTimeout(function () {
				$html.removeClass('popup-open popup-center');

				if ($html.hasClass('iphone') || $html.hasClass('ipad')) {
					iNoBounce.disable();
				}

				$('.popup-wrapper').attr('removing', true);

				setTimeout(function () {
					if ($('.popup-wrapper').attr('removing')) {
						$('.popup-wrapper').remove();
					}
				}, 5000);
			}, hideAfter);
		}
	});

	$(document).delegate('.popup-close, .popup-bg-closable, .btn-popup:not([href])', 'click', function () {
		$html.removeClass('popup-open popup-center');

		if ($html.hasClass('iphone') || $html.hasClass('ipad')) {
			iNoBounce.disable();
		}

		$('.popup-wrapper').attr('removing', true);

		setTimeout(function () {
			if ($('.popup-wrapper').attr('removing')) {
				$('.popup-wrapper').remove();
			}
		}, 5000);
	});

	$(document).on('keydown', function (e) {
		if (e.keyCode === 27) {
			parent.$('.popup-bg-closable').trigger('click');
		}
	});

	// Login / Register Popup
	$(document).delegate('html.popup-login .login-form button, html.popup-register .register-form .buttons button', 'click', function (e) {
		e.preventDefault();

		var $this = $(this);
		var $form = $this.closest('form');

		$form.find('.has-error').removeClass('has-error');
		$form.find('.text-danger').remove();
		$this.button('loading');

		$.ajax({
			url: $form.attr('action').replace('https:', location.protocol),
			type: 'post',
			data: $form.serialize(),
			dataType: 'json',
			error: function () {
				$this.button('reset');
			},
			success: function (json) {
				if (json.status === 'success') {
					if ($form.hasClass('login-form')) {
						if (parent.$('html').hasClass('route-account-logout')) {
							parent.window.location = $('base').attr('href');
						} else {
							parent.window.location.reload();
						}
					} else {
						if (json.customer) {
							parent.window.location = $('base').attr('href');
						} else {
							parent.window.location = 'index.php?route=account/success';
						}
					}
				} else {
					$this.button('reset');

					$.each(json.response, function (field, value) {
						if (field === 'custom_field') {
							$.each(value, function (key, val) {
								$('#custom-field' + key).addClass('has-error').find('input').after('<div class="text-danger">' + val + '</div>');
							});
						} else {
							$form.find('[name="' + field + '"]').closest('.form-group').addClass('has-error').after('<div class="text-danger">' + value + '</div>');
						}
					});

					if (json.response.warning) {
						var $span = $('<span style="display: none !important;"></span>').html(json.response.warning);

						$span.appendTo($('body'));

						var msg = $span.html();

						$span.remove();

						alert(msg);
					}
				}
			}
		});
	});

	// Contact Form
	$('.module-form').each(function () {
		if ($.fn.datetimepicker) {
			var language = $('form', this).data('language');

			$('.date', this).datetimepicker({
				language: language,
				pickTime: false
			});

			$('.datetime', this).datetimepicker({
				language: language,
				pickDate: true,
				pickTime: true
			});

			$('.time', this).datetimepicker({
				language: language,
				pickDate: false
			});
		}

		$('.upload-btn', this).on('click', function () {
			var node = this;

			$('#form-upload').remove();

			$('body').prepend('<form enctype="multipart/form-data" id="form-upload" style="display: none;"><input type="file" name="file" /></form>');

			$('#form-upload input[name=\'file\']').trigger('click');

			if (typeof timer != 'undefined') {
				clearInterval(timer);
			}

			timer = setInterval(function () {
				if ($('#form-upload input[name=\'file\']').val() != '') {
					clearInterval(timer);

					$.ajax({
						url: 'index.php?route=tool/upload',
						type: 'post',
						dataType: 'json',
						data: new FormData($('#form-upload')[0]),
						cache: false,
						contentType: false,
						processData: false,
						beforeSend: function () {
							$(node).button('loading');
						},
						complete: function () {
							$(node).button('reset');
						},
						success: function (json) {
							$('.text-danger').remove();

							if (json['error']) {
								$(node).parent().find('input').after('<div class="text-danger">' + json['error'] + '</div>');
							}

							if (json['success']) {
								alert(json['success']);

								$(node).parent().find('input').val(json['code']);
							}
						},
						error: function (xhr, ajaxOptions, thrownError) {
							alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
						}
					});
				}
			}, 500);
		});
	});

	$(document).delegate('.btn-extra', 'click', function () {
		parent.window.__popup_url = $(this).data('product_url') || '';
	});

	$(document).delegate('.module-form .btn-primary', 'click', function (e) {
		e.preventDefault();

		var $this = $(this);
		var $form = $this.closest('.module-form').find('form');
		$form.find('.has-error').removeClass('has-error');
		$form.find('.text-danger').remove();

		var data = $form.serializeArray();

		data.push({
			name: 'url',
			value: parent.window.__popup_url || parent.window.location.toString()
		});

		$.ajax({
			url: $form.attr('action'),
			type: 'post',
			data: data,
			dataType: 'json',
			beforeSend: function () {
				$this.button('loading');
			},
			complete: function () {
				$this.button('reset');
			},
			success: function (response) {
				if (response.status === 'success') {
					alert(response.response.message);
					$form[0].reset();
					parent.window.__popup_url = undefined;
					parent.$('.module-popup-' + Journal['modulePopupId'] + ' .popup-close').trigger('click');
				}

				if (response.status === 'error') {
					$.each(response.response.errors, function (field, error) {
						if (field === 'agree') {
							alert(error);
						} else if (field === 'captcha') {
							$form.find('.captcha').addClass('has-error');
						} else {
							$form.find('[name^="' + field + '"]').closest('.form-group').addClass('has-error').after('<div class="text-danger">' + error + '</div>');
						}
					});
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
			}
		});
	});

	// Grid / List toggle
	$(document).delegate('.grid-list .view-btn', 'click', function () {
		var $this = $(this);
		var $products = $('.main-products');
		var view = $this.data('view');
		var current = $products.hasClass('product-grid') ? 'grid' : 'list';

		$this.tooltip('hide');

		if (view !== current) {
			$products.addClass('no-transitions').removeClass('product-' + current).addClass('product-' + view);
			setTimeout(function () {
				$products.removeClass('no-transitions');
			}, 1);
			Cookies.set('view', view, { expires: 365 });
		}

		$('.grid-list .view-btn').removeClass('active');
		$this.addClass('active');
	});

	// Main Menu Hover Site Overlay
	$('.desktop-main-menu-wrapper #main-menu > .j-menu > .main-menu-item').first().addClass('first-dropdown');

	var $desktop_main_menu_wrapper = $('.desktop-main-menu-wrapper');

	$desktop_main_menu_wrapper.delegate('.main-menu > .j-menu > .menu-item:not(.dropdown)', 'mouseover', function () {
		$body.addClass('menu-hover');
	});

	$desktop_main_menu_wrapper.delegate('.main-menu > .j-menu > .menu-item:not(.dropdown)', 'mouseleave', function () {
		$body.removeClass('menu-hover');
	});

	$desktop_main_menu_wrapper.delegate('.main-menu > .j-menu > .dropdown', 'mouseover', function () {
		$body.addClass('menu-open');
	});

	$desktop_main_menu_wrapper.delegate('.main-menu', 'mouseleave', function () {
		$body.removeClass('menu-open');
	});

	// $desktop_main_menu_wrapper.delegate('.main-menu > .j-menu > .mega-menu', 'mouseover', function () {
	// 	$(this).addClass('animation-delay');
	// });
	//
	// $desktop_main_menu_wrapper.delegate('.main-menu > .j-menu > .mega-menu', 'mouseleave', function () {
	// 	var $this = $(this);
	// 	setTimeout(function () {
	// 		$this.removeClass('animation-delay');
	// 	}, 250);
	// });

	//$('head').append('<style>.desktop-main-menu-wrapper .menu-item.dropdown::before {height: ' + ($body.height() - $('header').height()) + 'px} </style>');

	if (($html.hasClass('iphone') || $html.hasClass('ipad')) && !$html.hasClass('popup-open')) {
		iNoBounce.disable();
	}

	// Mobile Menu Wrapper
	$(document).delegate('.menu-trigger', 'click', function (e) {
		e.stopPropagation();

		$html.addClass('mobile-overlay mobile-main-menu-container-open');

		if ($html.hasClass('mobile-menu-active')) {
			$('[data-is-open]').each(function () {
				$('> a > .open-menu', this).trigger('click');
				$(this).removeAttr('data-is-open');
			});
		}

		var $container = $('.mobile-main-menu-container');

		$container.outerWidth();

		$container.addClass('animating');

		if ($html.hasClass('iphone') || $html.hasClass('ipad')) {
			iNoBounce.enable();
		}
	});

	// Mobile Cart Wrapper
	if ($html.hasClass('mobile-header-active')) {
		$('.cart-content > ul').appendTo('.mobile-cart-content-wrapper');
	}

	$(document).delegate('.mobile-header-active .cart-heading', 'click', function (e) {
		e.stopPropagation();

		$html.addClass('mobile-overlay mobile-cart-content-container-open');

		var $totals = $('.cart-totals').outerHeight();

		$('.cart-products').css('padding-bottom', $totals - 1);

		var $container = $('.mobile-cart-content-container');

		$container.outerWidth();

		$container.addClass('animating');

		if ($html.hasClass('iphone') || $html.hasClass('ipad')) {
			iNoBounce.enable();
		}
		return false;
	});

	// Mobile Filter Wrapper
	if (Journal['isPhone'] || (Journal['isTablet'] && (!Journal['globalPageColumnLeftTabletStatus'] || !Journal['globalPageColumnRightTabletStatus']))) {
		if ($('.module-filter').length) {
			$('.module-filter h3 > *').prependTo('.mobile-filter-container .mobile-wrapper-header');
			$('.module-filter').appendTo('.mobile-filter-wrapper');

			$('<a class="mobile-filter-trigger btn">' + Journal['mobileFilterButtonText'] + '</a>').appendTo('body');
		}
	}

	$(document).delegate('.mobile-header-active .mobile-filter-trigger', 'click', function (e) {
		e.stopPropagation();

		$html.addClass('mobile-overlay mobile-filter-container-open');

		var $container = $('.mobile-filter-container');

		$container.outerWidth();

		$container.addClass('animating');

		if ($html.hasClass('iphone') || $html.hasClass('ipad')) {
			iNoBounce.enable();
		}

		return false;
	});

	// Close Mobile Wrapper
	$(document).delegate('.x, .site-wrapper, .close-filter', 'click', function () {
		$('.mobile-container.animating').removeClass('animating');

		$html.removeClass('mobile-overlay');

		setTimeout(function () {
			$html.removeClass('mobile-main-menu-container-open mobile-cart-content-container-open mobile-filter-container-open');
		}, 300);

		if ($html.hasClass('iphone') || $html.hasClass('ipad')) {
			iNoBounce.disable();
		}
	});

	// Product Page
	if ($html.hasClass('route-product-product')) {
		// sync image carousels
		$(document).delegate('.additional-image', 'click', function () {
			$('.additional-image').removeClass('swiper-slide-active');
			$(this).addClass('swiper-slide-active');

			var $s = $('.main-image').data('swiper');

			if ($s.params.loop) {
				$s.slideToLoop($(this).data('index'), 0);
			} else {
				$s.slideTo($(this).data('index'), 0);
			}
		});

		// image zoom
		if (!('ontouchstart' in document)) {
			if (Journal['isPopup'] ? Journal['quickviewPageStyleCloudZoomStatus'] : Journal['productPageStyleCloudZoomStatus']) {
				$('.main-image img').each(function () {
					var $this = $(this);

					$this.ImageZoom({
						type: Journal['isPopup'] ? Journal['quickviewPageStyleCloudZoomPosition'] : Journal['productPageStyleCloudZoomPosition'],
						showDescription: false,
						offset: [0, 0],
						zoomSize: [$this.width(), $this.height()],
						bigImageSrc: $this.data('largeimg')
					});
				});

				// delay mouseover
				$('.product-image').mouseover(function () {
					$('.zm-viewer').delay(200).queue(function (next) {
						$(this).css('opacity', '1');
						next();
					});
				}).mouseleave(function () {
					$('.zm-viewer').css('opacity', '0');
				});
			}
		}

		// Select first option
		if ((Journal['isPopup'] ? Journal['quickviewPageStyleOptionsSelect'] : Journal['productPageStyleOptionsSelect']) === 'all') {
			$('.product-options .form-group .radio:first-child input, .product-options .form-group .checkbox:first-child input').prop('checked', true);
			$('.product-options .form-group select').each(function () {
				$(this).find('option').eq(1).prop('selected', true);
			});
		}

		if ((Journal['isPopup'] ? Journal['quickviewPageStyleOptionsSelect'] : Journal['productPageStyleOptionsSelect']) === 'required') {
			$('.product-options .form-group.required .radio:first-child input, .product-options .form-group.required .checkbox:first-child input').prop('checked', true);
			$('.product-options .form-group.required select').each(function () {
				$(this).find('option').eq(1).prop('selected', true);
			});
		}

		// Auto Update Price
		if (Journal['isPopup'] ? Journal['quickviewPageStylePriceUpdate'] : Journal['productPageStylePriceUpdate']) {
			function autoUpdatePrice() {
				$.ajax({
					url: 'index.php?route=journal3/price&popup=' + (Journal['isPopup'] ? 1 : 0),
					type: 'post',
					data: $('#product-id, #product-quantity, #product input[type="radio"]:checked, #product input[type="checkbox"]:checked, #product select'),
					dataType: 'json',
					beforeSend: function () {
						// $('#button-cart').button('loading');
					},
					complete: function () {
						// $('#button-cart').button('reset');
					},
					success: function (json) {
						if (json['response']['status'] === 'error') {
							alert(json['response']['message']);
						} else {
							if (Journal['isPopup'] ? Journal['quickviewPageStyleProductStockUpdate'] : Journal['productPageStyleProductStockUpdate']) {
								if (json['response']['stock']) {
									$('.product-stock span').html(json['response']['stock']);
								}

								if (json['response']['in_stock']) {
									$('.product-stock').removeClass('out-of-stock').addClass('in-stock');
								} else {
									$('.product-stock').removeClass('in-stock').addClass('out-of-stock');
								}
							}

							if (json['response']['tax']) {
								$('.product-tax').html(json['response']['tax']);
							}

							if (json['response']['price']) {
								if (json['response']['special']) {
									$('.product-price-group .product-price-old').html(json['response']['price']);
									$('.product-price-group .product-price-new').html(json['response']['special']);
								} else {
									$('.product-price-group .product-price').html(json['response']['price']);
								}
							}

							if (json['response']['discounts']) {
								$('.product-discount').each(function (index) {
									$(this).html(json['response']['discounts'][index]);
								});
							}

							if (json['response']['weight']) {
								$('.product-stats .product-weight span').html(json['response']['weight']);
							}
						}
					}
				});
			}

			$('.product-options input[type="radio"], .product-options input[type="checkbox"], .product-options select, #product-quantity').on('change', autoUpdatePrice);

			autoUpdatePrice();
		}

		// Push Option Radio
		// $('.push-option.product-option-radio').each(function () {
		// 	var $this = $(this);
		// 	var hasImages = $this.find('img').length > 0;
		// 	var options = $this.find('.radio').map(function (index) {
		// 		var text = $(this).text().trim();
		//
		// 		if (hasImages) {
		// 			$this.addClass('push-image');
		// 			var src = $(this).find('img').attr('src') || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
		// 			return '<li class="' + ($(this).find('input').is(':checked') ? 'checked' : '') + '" data-index="' + index + '"><img src="' + src + '" alt="' + text + '" title="' + text + '" data-tooltip-class="push-image-tooltip" /></li>';
		// 		}
		//
		// 		return '<li class="' + ($(this).find('input').is(':checked') ? 'checked' : '') + '" data-index="' + index + '">' + text + '</li>';
		// 	});
		//
		// 	$this.append('<ul>' + options.toArray().join('') + '</ul>');
		//
		// 	$this.find('li').on('click', function () {
		// 		$this.find('.radio').eq($(this).data('index')).find('input').trigger('click');
		// 		$this.find('li').not($(this)).removeClass('checked');
		// 		$(this).addClass('checked');
		// 	});
		//
		// 	$this.find('li img').tooltip({ container: 'body' });
		// });

		// Push Option Checkbox
		// $('.push-option.product-option-checkbox').each(function () {
		// 	var $this = $(this);
		// 	var hasImages = $this.find('img').length;
		// 	var options = $this.find('.checkbox').map(function (index) {
		// 		var text = $(this).text().trim();
		//
		// 		if (hasImages) {
		// 			$this.addClass('push-image');
		// 			var src = $(this).find('img').attr('src') || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
		// 			return '<li class="' + ($(this).find('input').is(':checked') ? 'checked' : '') + '" data-index="' + index + '"><img src="' + src + '" alt="' + text + '" title="' + text + '" data-tooltip-class="push-image-tooltip" /></li>';
		// 		}
		//
		// 		return '<li class="' + ($(this).find('input').is(':checked') ? 'checked' : '') + '" data-index="' + index + '">' + text + '</li>';
		// 	});
		//
		// 	$this.append('<ul>' + options.toArray().join('') + '</ul>');
		//
		// 	$this.find('li').on('click', function () {
		// 		$this.find('.checkbox').eq($(this).data('index')).find('input').trigger('click');
		// 		$(this).toggleClass('checked');
		// 	});
		//
		// 	$this.find('li img').tooltip({ container: 'body' });
		// });

		// Push Option Select
		// $('.push-option.product-option-select').each(function () {
		// 	var $this = $(this);
		// 	var options = $this.find('option').slice(1).map(function (index) {
		// 		return '<li class="' + ($(this).is(':checked') ? 'checked' : '') + '" data-index="' + index + '">' + $(this).text() + '</li>';
		// 	});
		//
		// 	$this.append('<ul>' + options.toArray().join('') + '</ul>');
		//
		// 	$this.find('li').on('click', function () {
		// 		$this.find('option').eq($(this).data('index') + 1).prop('selected', true);
		// 		$this.find('select').trigger('change');
		// 		$this.find('li').not($(this)).removeClass('checked');
		// 		$(this).addClass('checked');
		// 	});
		// });
	}

	// Iframe height
	if ($html.hasClass('route-journal3-popup-page')) {
		$(document).on('click', function () {
			parent.resize_iframe(Journal['popupModuleId'], $('.popup-content').height());
		});
	}

	//Footer Links module collapse
	$('.links-menu .module-title').addClass('closed');

	$('.links-menu .module-title').click(function () {
		$(this).toggleClass('closed');
	});

	// Open popup links in new tab
	if (Journal.isPopup) {
		$('a[href]').each(function () {
			var $this = $(this);

			if (!$this.attr('target')) {
				$this.attr('target', '_blank');
			}

			if (Journal.isPhone || Journal.isTablet) {
				$this.removeClass('agree');
			}
		});
	}
});

$(window).on('load', function () {
	var $html = $('html');
	var $body = $('body');

	// Search
	var $search = $('#search').find('input[name=\'search\']');

	$('.search-button').on('click', function () {
		var url = $(this).data('search-url');
		var value = $search.val().trim();

		if (!value) {
			return false;
		}

		var category_id = parseInt($search.attr('data-category_id'));

		if (value) {
			url += encodeURIComponent(value);
		}

		if (Journal['searchStyleSearchAutoSuggestDescription']) {
			url += '&description=true';
		}

		if (category_id) {
			url += '&category_id=' + category_id;

			if (Journal['searchStyleSearchAutoSuggestSubCategories']) {
				url += '&sub_category=true';
			}
		}

		location = url;
	});

	$search.on('keydown', function (e) {
		if (e.keyCode === 13) {
			$('.search-button').trigger('click');
		}
	});

	$('.search-categories li').on('click', function (e) {
		e.stopPropagation();

		var $this = $(this);
		$('.search-categories-button').html($this.html());
		$search.attr('data-category_id', $this.attr('data-category_id'))
	});

	// Autosuggest
	if (Journal['searchStyleSearchAutoSuggestStatus']) {
		$search.typeahead({
			hint: true,
			minLength: 1,
			autoSelect: true
		}, {
			async: true,
			display: 'name',
			limit: Infinity,
			source: function (query, processSync, processAsync) {
				var data = {
					search: query
				};

				var category_id = parseInt($search.attr('data-category_id'));

				if (category_id) {
					data.category_id = category_id;

					if (Journal['searchStyleSearchAutoSuggestSubCategories']) {
						data.sub_category = true;
					}
				}

				return $.ajax({
					url: 'index.php?route=journal3/search',
					data: data,
					dataType: 'json',
					success: function (json) {
						return processAsync(json['response']);
					}
				});
			},
			templates: {
				suggestion: function (data) {
					if (data['view_more']) {
						return '<div class="search-result view-more"><a href="' + data['href'] + '">' + data['name'] + '</a></div>';
					}

					if (data['no_results']) {
						return '<div class="search-result no-results"><a>' + data['name'] + '</a></div>';
					}

					var html = '';

					html += '<div class="search-result"><a href="' + data['href'] + '">';

					if (data['thumb']) {
						html += '<img src="' + data['thumb'] + '" srcset="' + data['thumb'] + ' 1x, ' + data['thumb2'] + ' 2x" />';
					}

					var classes = [];

					if (data['quantity'] <= 0) {
						classes.push('out-of-stock');
					}

					if (!data['price_value']) {
						classes.push('has-zero-price');
					}

					html += '<span class="' + classes.join(' ') + '">';

					html += '<span class="product-name">' + data['name'] + '</span>';

					if (data['price']) {
						if (data['special']) {
							html += '<span><span class="price-old">' + data['price'] + '</span><span class="price-new">' + data['special'] + '</span></span>';
						} else {
							html += '<span class="price">' + data['price'] + '</span>';
						}
					}

					html += '</span>';

					html += '</a></div>';

					return html;
				}
			}

		});

		$('.header-search > span > div').addClass('.tt-empty');

		// mobile page zoom fix
		$('.mobile .tt-menu').on('click', function (e) {
			e.stopPropagation();
		});
	}

	// Sticky Desktop
	if (!Journal.isPopup && Journal['isDesktop'] && Journal['stickyStatus'] && (['classic', 'mega', 'default'].includes(Journal['headerType']))) {
		var holder = document.body;
		var headerHeightOffset = $('.desktop-main-menu-wrapper').offset().top + (parseInt(Journal['stickyAt'], 10) || 100);
		var menuHeight = $('.desktop-main-menu-wrapper').outerHeight();

		function enableSticky() {
			if (Journal['headerType'] === 'classic' || Journal['headerType'] === 'mega') {
				$body.css('padding-top', menuHeight);
			}
		}

		function disableSticky() {
			if (Journal['headerType'] === 'classic' || Journal['headerType'] === 'mega') {
				$body.css('padding-top', '');
			}
		}

		function checkStickyOffset() {
			return headerHeightOffset <= window.scrollY;
		}

		function checkSticky() {
			var old = holder.classList.contains('is-sticky');

			holder.classList.toggle('is-sticky', checkStickyOffset());

			var current = holder.classList.contains('is-sticky');

			if (current !== old) {
				if (current) {
					enableSticky();
				} else {
					disableSticky();
				}
			}
		}

		function checkStickyListener() {
			requestAnimationFrame(checkSticky)
		}

		window.addEventListener('scroll', checkStickyListener, false);
	}

	//Compact Sticky top bar
	if (!Journal.isPopup && Journal['isDesktop'] && Journal['stickyStatus'] && Journal['topBarStatus'] && (['compact', 'slim'].includes(Journal['headerType']))) {
		var compact = $('.mid-bar');
		if (compact.length) {
			$(window).on('scroll', function () {
				var compactOffset = compact.offset().top;
				var scroll = $(this)[0].scrollY
				if (scroll >= compactOffset) {
					$('body').addClass('sticky-compact');
				} else {
					$('body').removeClass('sticky-compact');
				}
			});
		}
	}

	//Compact Sticky no top bar
	if (!Journal.isPopup && Journal['isDesktop'] && Journal['stickyStatus'] && !Journal['topBarStatus'] && !Journal['stickyFullHomePadding'] && (['compact', 'slim'].includes(Journal['headerType']))) {
		var site = $('.site-wrapper');
		var header = $('.mid-bar').outerHeight();
		if (site.length) {
			$(window).on('scroll', function () {
				var siteOffset = site.offset().top - header + 1;
				var scroll = $(this)[0].scrollY
				if (scroll >= siteOffset) {
					$('body').addClass('sticky-compact');
				} else {
					$('body').removeClass('sticky-compact');
				}
			});
		}
	}

	//Compact Sticky no top bar over hover
	if (!Journal.isPopup && Journal['isDesktop'] && Journal['stickyStatus'] && !Journal['topBarStatus'] && Journal['stickyFullHomePadding'] && (['compact', 'slim'].includes(Journal['headerType']))) {
		var site = $('.site-wrapper');
		var header = $('html:not(.route-common-home) .mid-bar').outerHeight();
		if (site.length) {
			$(window).on('scroll', function () {
				var siteOffset = site.offset().top - header + 1;
				var scroll = $(this)[0].scrollY
				if (scroll >= siteOffset) {
					$('body').addClass('sticky-compact');
				} else {
					$('body').removeClass('sticky-compact');
				}
			});
		}
	}


	// Sticky Mobile
	if (!Journal['isDesktop'] && Journal['headerMobileStickyStatus'] && $html.hasClass('mobile-header-active')) {
		var mobileBar = $('.mobile-header .sticky-bar');
		if (mobileBar.length) {
			var mobileBarSticky = mobileBar.offset().top;
			var mobileBarHeight = mobileBar.outerHeight();
			$(window).on('scroll', function () {
				var scroll = $(this)[0].scrollY
				if (scroll >= mobileBarSticky) {
					mobileBar.addClass('mobile-bar-sticky');
					$body.css('padding-top', mobileBarHeight);
				} else {
					mobileBar.removeClass('mobile-bar-sticky');
					$body.css('padding-top', '');
				}
			});
		}
	}

	//Focus mini search on click
	if (Journal['isDesktop'] && (Journal['headerMiniSearchDisplay'] === 'page')) {
		$('.search-trigger, .desktop .search-categories .j-menu > li > a').click(function () {
			$('.header-search input').focus();
		});
	}

	// Scroll Top
	if (Journal['scrollTop']) {
		var scrollTopTimeout;

		$(window).on('scroll', function () {
			clearTimeout(scrollTopTimeout);
			var scroll = $(this)[0].scrollY
			if (scroll > 500) {
				$('.scroll-top').addClass('scroll-top-active');

				scrollTopTimeout = setTimeout(function () {
					$('.scroll-top').removeClass('scroll-top-active');
				}, 3000);
			} else {
				$('.scroll-top').removeClass('scroll-top-active');
			}
		});

		$('.scroll-top').click(function () {
			anime({
				targets: 'html, body',
				scrollTop: 0,
				duration: 750,
				easing: 'easeInOutQuad'
			});
		});
	}

	if ($html.hasClass('footer-reveal')) {
		var footerHeight = $('.desktop.footer-reveal footer').outerHeight();
		$('.desktop body').css('padding-bottom', footerHeight);
	}
});

$('.block-map iframe').on('load', function () {
	$('.block-map .journal-loading').hide();
});
