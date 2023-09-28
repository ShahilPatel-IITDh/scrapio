
			(function() {
				var file     = ["https:\/\/canisna.nl\/wp-content\/et-cache\/7\/et-divi-dynamic-7-late.css"];
				var handle   = document.getElementById('divi-style-parent-inline-inline-css');
				var location = handle.parentNode;

				if (0===document.querySelectorAll('link[href="' + file + '"]').length) {
					var link  = document.createElement('link');
					link.rel  = 'stylesheet';
					link.id   = 'et-dynamic-late-css';
					link.href = file;

					location.insertBefore(link, handle.nextSibling);
				}
			})();
		