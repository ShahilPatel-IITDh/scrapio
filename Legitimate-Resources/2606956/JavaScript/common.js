// Array includes polyfill
if (!Array.prototype.includes) {
	Object.defineProperty(Array.prototype, 'includes', {
		value: function (searchElement, fromIndex) {

			if (this == null) {
				throw new TypeError('"this" is null or not defined');
			}

			// 1. Let O be ? ToObject(this value).
			var o = Object(this);

			// 2. Let len be ? ToLength(? Get(O, "length")).
			var len = o.length >>> 0;

			// 3. If len is 0, return false.
			if (len === 0) {
				return false;
			}

			// 4. Let n be ? ToInteger(fromIndex).
			//    (If fromIndex is undefined, this step produces the value 0.)
			var n = fromIndex | 0;

			// 5. If n â‰¥ 0, then
			//  a. Let k be n.
			// 6. Else n < 0,
			//  a. Let k be len + n.
			//  b. If k < 0, let k be 0.
			var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

			function sameValueZero(x, y) {
				return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
			}

			// 7. Repeat, while k < len
			while (k < len) {
				// a. Let elementK be the result of ? Get(O, ! ToString(k)).
				// b. If SameValueZero(searchElement, elementK) is true, return true.
				if (sameValueZero(o[k], searchElement)) {
					return true;
				}
				// c. Increase k by 1.
				k++;
			}

			// 8. Return false
			return false;
		}
	});
}

$(function () {
	// Currency
	$('#form-currency .currency-select').unbind().on('click', function (e) {
		e.preventDefault();

		$('#form-currency input[name=\'code\']').val($(this).data('name'));

		$('#form-currency').submit();
	});

	// Language
	$('#form-language .language-select').unbind().on('click', function (e) {
		e.preventDefault();

		$('#form-language input[name=\'code\']').val($(this).data('name'));

		$('#form-language').submit();
	});
});

window['cart'] = window['cart'] || {};

window['cart'].add = function (product_id, quantity, quick_buy) {
	quantity = quantity || 1;

	$.ajax({
		url: 'index.php?route=checkout/cart/add',
		type: 'post',
		data: 'product_id=' + product_id + '&quantity=' + quantity,
		dataType: 'json',
		beforeSend: function () {
			$('[data-toggle="tooltip"]').tooltip('hide');
			$('[onclick*="cart.add(\'' + product_id + '\'"]').button('loading');
		},
		complete: function () {
			$('[onclick*="cart.add(\'' + product_id + '\'"]').button('reset');
		},
		success: function (json) {
			$('.alert, .text-danger').remove();

			if (json['redirect']) {
				if (json['options_popup']) {
					if ($('html').hasClass('iphone') || $('html').hasClass('ipad')) {
						iNoBounce.enable();
					}

					var html = '';

					html += '<div class="popup-wrapper popup-options">';
					html += '	<div class="popup-container">';
					html += '		<button class="btn popup-close"></button>';
					html += '		<div class="popup-body">';
					html += '		<div class="popup-inner-body">';
					html += '			<div class="journal-loading"><i class="fa fa-spinner fa-spin"></i></div>';
					html += '			<iframe src="index.php?route=journal3/product&product_id=' + product_id + '&popup=options&product_quantity=' + quantity + '&' + (quick_buy ? 'quick_buy=true' : '') + '" width="100%" height="100%" frameborder="0" onload="this.height = this.contentWindow.document.body.offsetHeight; $(this).prev(\'.journal-loading\').fadeOut();"></iframe>';
					html += '		</div>';
					html += '		</div>';
					html += '	</div>';
					html += '	<div class="popup-bg popup-bg-closable"></div>';
					html += '</div>';

					// show modal
					$('.popup-wrapper').remove();

					$('body').append(html);

					setTimeout(function () {
						$('html').addClass('popup-open popup-center');
					}, 10);
				} else {
					location = json['redirect'];
				}
			}

			if (json['success']) {
				if (json['options_popup']) {
					if ($('html').hasClass('iphone') || $('html').hasClass('ipad')) {
						iNoBounce.enable();
					}

					var html = '';

					html += '<div class="popup-wrapper popup-options">';
					html += '	<div class="popup-container">';
					html += '		<button class="btn popup-close"></button>';
					html += '		<div class="popup-body">';
					html += '		<div class="popup-inner-body">';
					html += '			<div class="journal-loading"><i class="fa fa-spinner fa-spin"></i></div>';
					html += '			<iframe src="index.php?route=journal3/product&product_id=' + product_id + '&popup=options&' + (quick_buy ? 'quick_buy=true' : '') + '" width="100%" height="100%" frameborder="0" onload="this.height = this.contentWindow.document.body.offsetHeight; $(this).prev(\'.journal-loading\').fadeOut();"></iframe>';
					html += '		</div>';
					html += '		</div>';
					html += '	</div>';
					html += '	<div class="popup-bg popup-bg-closable"></div>';
					html += '</div>';

					// show modal
					$('.popup-wrapper').remove();

					$('body').append(html);

					setTimeout(function () {
						$('html').addClass('popup-open popup-center');
					}, 10);
				} else {
					if (json['notification']) {
						show_notification(json['notification']);

						if (quick_buy) {
							location = Journal['checkoutUrl'];
						}
					} else {
						$('header').after('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
					}
				}

				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
					$('#cart-total').html(json['total']);
					$('#cart-items,.cart-badge').html(json['items_count']);

					if (json['items_count']) {
						$('#cart-items,.cart-badge').removeClass('count-zero');
					} else {
						$('#cart-items,.cart-badge').addClass('count-zero');
					}
				}, 100);

				if (Journal['scrollToTop']) {
					$('html, body').animate({ scrollTop: 0 }, 'slow');
				}

				$('.cart-content ul').load('index.php?route=common/cart/info ul li');

				if (parent.window['_QuickCheckout']) {
					parent.window['_QuickCheckout'].save();
				} else if ($('html').hasClass('route-checkout-cart') || $('html').hasClass('route-checkout-checkout')) {
					parent.location.reload();
				}
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
		}
	});
};

window['cart'].remove = function (key) {
	$.ajax({
		url: 'index.php?route=checkout/cart/remove',
		type: 'post',
		data: 'key=' + key,
		dataType: 'json',
		beforeSend: function () {
			$('#cart > button').button('loading');
		},
		complete: function () {
			$('#cart > button').button('reset');
		},
		success: function (json) {
			// Need to set timeout otherwise it wont update the total
			setTimeout(function () {
				$('#cart-total').html(json['total']);
				$('#cart-items,.cart-badge').html(json['items_count']);

				if (json['items_count']) {
					$('#cart-items,.cart-badge').removeClass('count-zero');
				} else {
					$('#cart-items,.cart-badge').addClass('count-zero');
				}
			}, 100);

			if ($('html').hasClass('route-checkout-cart') || $('html').hasClass('route-checkout-checkout')) {
				location = 'index.php?route=checkout/cart';
			} else {
				$('.cart-content ul').load('index.php?route=common/cart/info ul li');
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
		}
	});
};

window['cart'].update = function (key, quantity) {
	$.ajax({
		url: 'index.php?route=checkout/cart/edit',
		type: 'post',
		data: 'key=' + key + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
		dataType: 'json',
		beforeSend: function () {
			$('#cart > button').button('loading');
		},
		complete: function () {
			$('#cart > button').button('reset');
		},
		success: function (json) {
			// Need to set timeout otherwise it wont update the total
			setTimeout(function () {
				$('#cart-total').html(json['total']);
				$('#cart-items,.cart-badge').html(json['items_count']);

				if (json['items_count']) {
					$('#cart-items,.cart-badge').removeClass('count-zero');
				} else {
					$('#cart-items,.cart-badge').addClass('count-zero');
				}
			}, 100);

			if ($('html').hasClass('route-checkout-cart') || $('html').hasClass('route-checkout-checkout')) {
				location = 'index.php?route=checkout/cart';
			} else {
				$('.cart-content ul').load('index.php?route=common/cart/info ul li');
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
		}
	});
};

window['wishlist'] = window['wishlist'] || {};

window['wishlist'].add = function (product_id) {
	$.ajax({
		url: 'index.php?route=account/wishlist/add',
		type: 'post',
		data: 'product_id=' + product_id,
		dataType: 'json',
		success: function (json) {
			$('.alert').remove();

			if (json['redirect']) {
				location = json['redirect'];
			}

			if (json['success']) {
				$('[data-toggle="tooltip"]').tooltip('hide');

				if (json['notification']) {
					show_notification(json['notification']);
				} else {
					$('header').after('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				}
			}

			$('#wishlist-total span').html(json['total']);
			$('#wishlist-total').attr('title', json['total']);
			$('.wishlist-badge').text(json['count']);

			if (json['count']) {
				$('.wishlist-badge').removeClass('count-zero');
			} else {
				$('.wishlist-badge').addClass('count-zero');
			}

			if (Journal['scrollToTop']) {
				$('html, body').animate({ scrollTop: 0 }, 'slow');
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
		}
	});
};

window['compare'] = window['compare'] || {};

window['compare'].add = function (product_id) {
	$.ajax({
		url: 'index.php?route=product/compare/add',
		type: 'post',
		data: 'product_id=' + product_id,
		dataType: 'json',
		success: function (json) {
			$('.alert').remove();

			if (json['success']) {
				$('[data-toggle="tooltip"]').tooltip('hide');

				if (json['notification']) {
					show_notification(json['notification']);
				} else {
					$('header').after('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				}

				$('#compare-total').html(json['total']);
				$('.compare-badge').text(json['count']);

				if (json['count']) {
					$('.compare-badge').removeClass('count-zero');
				} else {
					$('.compare-badge').addClass('count-zero');
				}

				if (Journal['scrollToTop']) {
					$('html, body').animate({ scrollTop: 0 }, 'slow');
				}
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
		}
	});
};

window['quickview'] = function (product_id) {
	product_id = parseInt(product_id, 10);

	// hide tooltip
	$('[data-toggle="tooltip"]').tooltip('hide');

	var html = '';

	html += '<div class="popup-wrapper popup-quickview">';
	html += '	<div class="popup-container">';
	html += '		<button class="btn popup-close"></button>';
	html += '		<div class="popup-body">';
	html += '			<div class="popup-inner-body">';
	html += '				<div class="journal-loading"><i class="fa fa-spinner fa-spin"></i></div>';
	html += '				<iframe src="index.php?route=journal3/product&product_id=' + product_id + '&popup=quickview" width="100%" height="100%" frameborder="0" onload="this.height = this.contentWindow.document.body.offsetHeight; $(this).prev(\'.journal-loading\').hide();"></iframe>';
	html += '			</div>';
	html += '		</div>';
	html += '	</div>';
	html += '	<div class="popup-bg popup-bg-closable"></div>';
	html += '</div>';

	// show modal
	$('.popup-wrapper').remove();

	$('body').append(html);

	setTimeout(function () {
		$('html').addClass('popup-open popup-center');
	}, 10);
};

window['open_popup'] = function (module_id) {
	if ($('html').hasClass('iphone') || $('html').hasClass('ipad')) {
		iNoBounce.enable();
	}

	module_id = parseInt(module_id, 10);

	var html = '';

	html += '<div class="popup-wrapper popup-module">';
	html += '	<div class="popup-container">';
	html += '		<button class="btn popup-close"></button>';
	html += '		<div class="popup-body">';
	html += '		<div class="popup-inner-body">';
	html += '		</div>';
	html += '		</div>';
	html += '	</div>';
	html += '	<div class="popup-bg popup-bg-closable"></div>';
	html += '</div>';

	// show modal
	$('.popup-wrapper').remove();

	$('body').append(html);

	setTimeout(function () {
		$('html').addClass('popup-open popup-center');
	}, 10);

	$('.popup-container').css('visibility', 'hidden');

	$.ajax({
		url: 'index.php?route=journal3/popup/get&module_id=' + module_id + '&popup=module',
		success: function (html) {
			var $html = $(html);
			var $popup = $html.siblings('.module-popup');
			var $style = $html.siblings('style');
			var $content = $popup.find('.popup-container');

			$('#popup-style-' + module_id).remove();
			$('head').append($style.attr('id', 'popup-style-' + module_id));
			$('.popup-wrapper').attr('class', $popup.attr('class'));
			$('.popup-container').html($content.html());

			$('.popup-container').css('visibility', 'visible');
		},
		error: function (xhr, ajaxOptions, thrownError) {
			alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
		}
	});
};

window['open_login_popup'] = function () {
	if ($('html').hasClass('iphone') || $('html').hasClass('ipad')) {
		iNoBounce.enable();
	}

	var html = '';

	html += '<div class="popup-wrapper popup-login">';
	html += '	<div class="popup-container">';
	html += '		<button class="btn popup-close"></button>';
	html += '		<div class="popup-body">';
	html += '		<div class="popup-inner-body">';
	html += '			<div class="journal-loading"><i class="fa fa-spinner fa-spin"></i></div>';
	html += '			<iframe src="index.php?route=account/login&popup=login" width="100%" height="100%" frameborder="0" onload="this.height = this.contentWindow.document.body.offsetHeight; $(this).prev(\'.journal-loading\').fadeOut();"></iframe>';
	html += '		</div>';
	html += '		</div>';
	html += '	</div>';
	html += '	<div class="popup-bg popup-bg-closable"></div>';
	html += '</div>';

	// show modal
	$('.popup-wrapper').remove();

	$('body').append(html);

	setTimeout(function () {
		$('html').addClass('popup-open popup-center');
	}, 10);
};

window['open_register_popup'] = function () {
	if ($('html').hasClass('iphone') || $('html').hasClass('ipad')) {
		iNoBounce.enable();
	}

	var html = '';

	html += '<div class="popup-wrapper popup-register">';
	html += '	<div class="popup-container">';
	html += '		<button class="btn popup-close"></button>';
	html += '		<div class="popup-body">';
	html += '		<div class="popup-inner-body">';
	html += '			<div class="journal-loading"><i class="fa fa-spinner fa-spin"></i></div>';
	html += '			<iframe src="index.php?route=account/register&popup=register" width="100%" height="100%" frameborder="0" onload="this.height = this.contentWindow.document.body.offsetHeight; $(this).prev(\'.journal-loading\').fadeOut();"></iframe>';
	html += '		</div>';
	html += '		</div>';
	html += '	</div>';
	html += '	<div class="popup-bg popup-bg-closable"></div>';
	html += '</div>';

	// show modal
	$('.popup-wrapper').remove();

	$('body').append(html);

	setTimeout(function () {
		$('html').addClass('popup-open popup-center');
	}, 10);
};

window['show_notification'] = function (opts) {
	opts = $.extend({
		position: 'center',
		className: '',
		title: '',
		image: '',
		message: '',
		buttons: [],
		timeout: Journal.notificationHideAfter
	}, opts);

	if ($('.notification-wrapper-' + opts.position).length === 0) {
		$('body').append('<div class="notification-wrapper notification-wrapper-' + opts.position + '"></div>');
	}

	var html = '';

	var buttons = $.map(opts.buttons, function (button) {
		return '<a class="' + button.className + '" href="' + button.href + '">' + button.name + '</a>';
	});

	html += '<div class="notification ' + opts.className + '">';
	html += '	<button class="btn notification-close"></button>';
	html += '	<div class="notification-content">';

	if (opts.image) {
		html += '		<img src="' + opts.image + '" srcset="' + opts.image + ' 1x, ' + opts.image2x + ' 2x">';
	}

	html += '		<div>';
	html += '			<div class="notification-title">' + opts.title + '</div>';
	html += '			<div class="notification-text">' + opts.message + '</div>';
	html += '		</div>';
	html += '	</div>';

	if (buttons && buttons.length) {
		html += '<div class="notification-buttons">' + buttons.join('\n') + '</div>';
	}

	html += '</div>';

	var $notification = $(html);

	$('.notification-wrapper-' + opts.position).append($notification);

	if (opts.timeout) {
		setTimeout(function () {
			$notification.find('.notification-close').trigger('click');
		}, opts.timeout);
	}

	return $notification;
};

window['loader'] = function (el, status) {
	var $el = $(el);

	if (status) {
		$el.attr('style', 'position: relative');
		$el.append('<div class="journal-loading-overlay"><div class="journal-loading"><i class="fa fa-spinner fa-spin"></i></div></div>');
	} else {
		$el.attr('style', '');
		$el.find('.journal-loading-overlay').remove();
	}
};

window['resize_iframe'] = function (module_id, height) {
	$('.module-popup-' + module_id + ' iframe').height(height);
};
