/**
 * Ajaxchimp JS Init
 *
 * @author We Both
 * @version 1.0
 * @requires
 *
 */
$(function () {
  'use strict';

  var $mailchimpURL = 'http://worksofwisnu.us6.list-manage.com/subscribe/post?u=b57b4e6ae38c92ac22d92a234&amp;id=17754c49aa'; // Replace the URL with your mailchimp URL (put your URL inside '').

  // callback function when the form submitted, show the notification box
	function mailchimpCallback(resp) {
      if (resp.result === 'success') {
          $('#subscribe-success-notification').addClass('show');
      }
      else if (resp.result === 'error') {
           $('#subscribe-error-notification').addClass('show');
      }
  }

  $('.subscribe-form').ajaxChimp({
		callback: mailchimpCallback,
	  url: $mailchimpURL
	});
});