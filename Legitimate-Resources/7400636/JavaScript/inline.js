
	(function($) {
		window.cookie_location = '';
		// this cookie_content should already be pre-encoded from CookieSettingView.js
		window.cookie_content = '' || _W.stl('templates.publish.virtual-includes.footerCode_1');
		window.cookie_policy_key = '214920449237072003_cookie_policy';
		window.cookie_content_hash = '';

		if (!_W.getCookie(window.cookie_policy_key) || _W.getCookie(window.cookie_policy_key) !== window.cookie_content_hash){
			if (window.cookie_location === 'top' || window.cookie_location === 'bottom'){
				$('#eu-cookie-content').text(decodeURIComponent(window.cookie_content));
				(window.cookie_location === 'top') ? animateFromTop() : animateFromBottom();
				$('#eu-cookie').show();
			}
		}

		$('#eu-cookie-close').click(function(){
			_W.setCookie(window.cookie_policy_key, window.cookie_content_hash, 100000);
			$('#eu-cookie').hide();
		});

		function animateFromTop(){
			$('#eu-cookie').css({
				'top': '0px',
				'animation': 'reveal-top 1 2s'
			});
		}

		function animateFromBottom(){
			$('#eu-cookie').css({
				'bottom': '0px',
				'animation': 'reveal-bottom 1 2s'
			});
		}
	})(window._W && _W.jQuery);
