((function () {
	jQuery(function () {
		var $allow = jQuery('#age-allow');
		var $deny = jQuery('#age-deny');

		if (!$allow || !$deny) {
			return;
		}

		var cookieExpireDays = parseInt(window.centralAdultCheckboxConfig.cookieExpire);
		var now = new Date();
		now.setTime(now.getTime() + (cookieExpireDays * 24 * 60 * 60 * 1000));
		var expires = (cookieExpireDays > 0) ? 'expires=' + now.toUTCString() : '';
		var cookieString = window.centralAdultCheckboxConfig.cookieName + "={value}; domainn=" + window.location.hostname + ";path=/;" + expires;

		$allow.on('click', function () {
			document.cookie = cookieString.replace('{value}', 'true');
			window.location = window.centralAdultCheckboxConfig.destination;
		});

		$deny.on('click', function () {
			document.cookie = cookieString.replace('{value}', 'false');
			window.location = "/";
		});
	});
})());
