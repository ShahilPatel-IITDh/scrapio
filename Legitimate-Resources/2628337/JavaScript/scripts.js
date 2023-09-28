jQuery( document ).ready(function($) {
	var shares = $('#content .share-links');
	// position of the share bar
	if(shares.length){
		$('#sticky-bar .share-links').css('margin-left', parseInt($('#content .share-links a').offset().left) + 'px');
	}

	$(window).on('scroll', function (e) {
		if(!shares.length) return;
		var documenttop = $(document).scrollTop();
		sharestop = parseInt(shares.offset().top + 60);
		if(documenttop >= sharestop){
			$('#sticky-bar').show();
		} else {
			$('#sticky-bar').hide();	
		}
	});
	
	/**
	* tracking newsletter signups with Google Analytics
	* seems currently broken
	**/
	/*$('.optin-monster input[type="submit"]').click(function(){
		var omformid = $('.optin-monster-overlay').attr('id');
		_gaq.push(['_trackEvent', 'Newsletter-Signup', omformid, window.location.pathname]);
	});*/
	/*$('#pty_form').submit(function(){
		_gaq.push(['_trackEvent', 'Newsletter-Signup', 'PopUp', window.location.pathname]);
	});
	$('.entry-content .mc4wp-form').submit(function(){
		_gaq.push(['_trackEvent', 'Newsletter-Signup', 'Intext', window.location.pathname]);
	});
	$('#subscribe .mc4wp-form').submit(function(){
		_gaq.push(['_trackEvent', 'Newsletter-Signup', 'Footer', window.location.pathname]);
	});	
	$('#sidebar .mc4wp-form').submit(function(){
		_gaq.push(['_trackEvent', 'Newsletter-Signup', 'Sidebar', window.location.pathname]);
	});	*/
});

/*!
 * jquery.unevent.js 0.2
 * https://github.com/yckart/jquery.unevent.js
 *
 * Copyright (c) 2013 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2013/07/26
 **/
;
(function ($) {
    var on = $.fn.on, timer;
    $.fn.on = function () {
        var args = Array.apply(null, arguments);
        var last = args[args.length - 1];
        if (isNaN(last) || (last === 1 && args.pop()))
            return on.apply(this, args);
        var delay = args.pop();
        var fn = args.pop();
        args.push(function () {
            var self = this, params = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(self, params);
            }, delay);
        });
        return on.apply(this, args);
    };
}(this.jQuery || this.Zepto));

