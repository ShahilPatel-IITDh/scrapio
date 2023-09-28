
			(function() {
				var file     = ["https:\/\/kegofwisdom.com\/wp-content\/et-cache\/1945\/et-divi-dynamic-1945-late.css"];
				var handle   = document.getElementById('divi-style-inline-inline-css');
				var location = handle.parentNode;

				if (0===document.querySelectorAll('link[href="' + file + '"]').length) {
					var link  = document.createElement('link');
					link.rel  = 'stylesheet';
					link.id   = 'et-dynamic-late-css';
					link.href = file;

					location.insertBefore(link, handle.nextSibling);
				}
			})();
		