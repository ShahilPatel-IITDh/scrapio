
	/* Progress bar */
	//Source: https://alligator.io/js/progress-bar-javascript-css-variables/
	var h = document.documentElement,
		b = document.body,
		st = 'scrollTop',
		sh = 'scrollHeight',
		progress = document.querySelector('#progress'),
		sidebar = document.getElementById('sidebar'),
		scroll;
	var scrollpos = window.scrollY;
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	document.addEventListener('scroll', function() {
		/*Refresh scroll % width*/
		scroll = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
		progress.style.setProperty('--scroll', scroll + '%');
		if (!isMobile.any()) {
			if (scroll > 5) {
				sidebar.style.setProperty('position', 'sticky');
			} else {
				sidebar.style.setProperty('position', 'relative');
			}
		}
	});
