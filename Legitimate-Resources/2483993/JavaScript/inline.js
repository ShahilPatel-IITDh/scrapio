jQuery(document).ready(function(){var djckm_button = jQuery("#djckm-confirm");var djckm_message = jQuery("#djckm");if (djckm_button) {djckm_button.on("click", function(event){event.preventDefault();var expires = new Date();expires.setTime(expires.getTime() + (315360000000));document.cookie = "plg_system_djcookiemonster_informed=1;expires=" + expires.toUTCString();djckm_message.remove();})}var djckm_message_ver = jQuery("#djckm");
					var cookieVal = document.cookie.match("(^|;) ?" + "plg_system_djcookiemonster_informed" + "=([^;]*)(;|$)");
					var chk = cookieVal ? cookieVal[2] : null;
					if (chk == 1 && djckm_message_ver) {
						djckm_message.remove();
					}
				var expires = new Date();expires.setTime(expires.getTime() + (315360000000));document.cookie = "plg_system_djcookiemonster_informed=1;expires=" + expires.toUTCString();})