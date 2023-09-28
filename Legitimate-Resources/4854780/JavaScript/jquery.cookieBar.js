 
(function( $ ){
  $.fn.cookieBar = function( options ) {  
	var settings = $.extend( {
      'closeButton' : 'none',
	  'secure' : false,
	  'path' : '/',
	  'domain' : ''
    }, options);
  
    return this.each(function() {       
		var cookiebar = $(this);
		
		// just in case they didnt hide it by default.
		cookiebar.hide();

		// if close button not defined. define it!
		if(settings.closeButton == 'none')
		{
			cookiebar.append('<a class="cookiebar-close">x</a>');
			settings = $.extend( {
				'closeButton' : '.cookiebar-close'
			}, options);
		}

		if ($.cookie('cookiebar') != 'hide') {
		  cookiebar.show();
		}

		cookiebar.find(settings.closeButton).click(function() {
			cookiebar.hide();
			$.cookie('cookiebar', 'hide', { path: settings.path, secure: settings.secure, domain: settings.domain, expires: 30 });
			return false;
		});
    });
  };

  // self injection init
  $.cookieBar = function( options ) {
	$('body').prepend('<div class="ui-widget"><div style="display: none;" class="cookie-message ui-widget-header blue"><p>We use cookies to personalise content provided by ad &amp; analytics partners to offer you a better browsing experience. <a target="blank" style="position:absolute;top:0;*top:-2px;left:675px;color:#f0991d" href="http://www.1freehosting.com/tos.html">More info</a></p></div></div>');
	$('.cookie-message').cookieBar(options);
  };
})( jQuery );


(function($) {
    $.cookie = function(key, value, options) {
        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
            if (decode(pair[0]) === key) return decode(pair[1] || '');
        }
        return null;
    };
})(jQuery);