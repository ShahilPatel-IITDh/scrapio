(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * This file is used to hook into the invalid-form event
 * that is triggered by the jQuery validate method when an error occurs.
 *
 * We need to hook in here to apply custom css classes on parent containers
 * to allow styling of form field labels.
 *
 * The current userforms module does not allow an easy way to hook into the
 * jQuery validate init method to override with custom options.
 */

(function($) {
	$(document).ready(function() {

		$('#UserForm_Form').on('invalid-form.validate', function() {
			setTimeout(function() {
				$('.field__input').each(function() {
					var parentDiv = $(this).parents('.requiredField');

					if($(this).find('.error').length) {
						parentDiv.addClass('field--error');
					} else {
						parentDiv.removeClass('field--error');
					}

				});
			}, 0);
		});

	});
})(jQuery);

},{}]},{},[1]);
