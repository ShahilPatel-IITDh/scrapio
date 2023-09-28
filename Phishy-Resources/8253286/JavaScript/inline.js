
	(function(jQuery) {
		try {
			function forceShowCcLinks() {
				var ccLinks = document.querySelector('.cc_links');
				if (!ccLinks) {
					return;
				}

				var ccLinksVisible = jQuery(ccLinks).is(':visible');
				if (ccLinksVisible) {
					return;
				}


				ccLinks.style.display = 'block';

				var ccParent = ccLinks.parentElement;

				var ccParentVisible = jQuery(ccParent).is(':visible');
				if (ccParentVisible) {
					return;
				}

				ccParent.style.display = 'block';

				var ccGrandparent = ccParent.parentElement;
				var ccGrandparentVisible = jQuery(ccGrandparent).is(':visible');
				if (ccGrandparentVisible) {
					return;
				}
				ccGrandparent.style.display = 'block';

			}

			function forceShowCcLinksForever() {
				var tenSeconds = 10000;
				forceShowCcLinks();
				setTimeout(forceShowCcLinksForever, tenSeconds);
			}

			jQuery(document).ready(forceShowCcLinksForever);
		}
		catch(ex) {}
	})(window._W && _W.jQuery);
