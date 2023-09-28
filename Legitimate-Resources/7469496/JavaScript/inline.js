

	(function($) {

			/*	check if google analytics tracking is disabled by user setting via cookie - or user must opt in.	*/

			var analytics_code = "\n<!-- Global site tag (gtag.js) - Google Analytics -->\n<script id='google_analytics_script' class='google_analytics_scripts' async src='https:\/\/www.googletagmanager.com\/gtag\/js?id=G-RCEB36010E'><\/script>\n<script class='google_analytics_scripts' type='text\/javascript'>\nwindow.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-RCEB36010E', { 'anonymize_ip': true });\n<\/script>\n".replace(/\"/g, '"' );
			var html = document.getElementsByTagName('html')[0];

			$('html').on( 'avia-cookie-settings-changed', function(e)
			{
					var cookie_check = html.className.indexOf('av-cookies-needs-opt-in') >= 0 || html.className.indexOf('av-cookies-can-opt-out') >= 0;
					var allow_continue = true;
					var silent_accept_cookie = html.className.indexOf('av-cookies-user-silent-accept') >= 0;
					var script_loaded = $( 'script.google_analytics_scripts' );

					if( cookie_check && ! silent_accept_cookie )
					{
						if( ! document.cookie.match(/aviaCookieConsent/) || html.className.indexOf('av-cookies-session-refused') >= 0 )
						{
							allow_continue = false;
						}
						else
						{
							if( ! document.cookie.match(/aviaPrivacyRefuseCookiesHideBar/) )
							{
								allow_continue = false;
							}
							else if( ! document.cookie.match(/aviaPrivacyEssentialCookiesEnabled/) )
							{
								allow_continue = false;
							}
							else if( document.cookie.match(/aviaPrivacyGoogleTrackingDisabled/) )
							{
								allow_continue = false;
							}
						}
					}

					if( ! allow_continue )
					{
//						window['ga-disable-G-RCEB36010E'] = true;
						if( script_loaded.length > 0 )
						{
							script_loaded.remove();
						}
					}
					else
					{
						if( script_loaded.length == 0 )
						{
							$('head').append( analytics_code );
						}
					}
			});

			$('html').trigger( 'avia-cookie-settings-changed' );

	})( jQuery );

