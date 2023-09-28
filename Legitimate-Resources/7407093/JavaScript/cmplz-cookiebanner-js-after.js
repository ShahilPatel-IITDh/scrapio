
		
			function ensure_complianz_is_loaded() {
				let timeout = 30000000; // 30 seconds
				let start = Date.now();
				return new Promise(wait_for_complianz);

				function wait_for_complianz(resolve, reject) {
					if (window.cmplz_get_cookie) // if complianz is loaded, resolve the promise
						resolve(window.cmplz_get_cookie);
					else if (timeout && (Date.now() - start) >= timeout)
						reject(new Error("timeout"));
					else
						setTimeout(wait_for_complianz.bind(this, resolve, reject), 30);
				}
			}

			// This runs the promise code
			ensure_complianz_is_loaded().then(function(){

							  		// cookieless tracking is disabled
					document.addEventListener("cmplz_cookie_warning_loaded", function(consentData) {
						let region = consentData.detail;
						if (region !== 'uk') {
							let scriptElements = document.querySelectorAll('script[data-service="burst"]');
							scriptElements.forEach(obj => {
								if (obj.classList.contains('cmplz-activated') || obj.getAttribute('type') === 'text/javascript') {
									return;
								}
								obj.classList.add('cmplz-activated');
								let src = obj.getAttribute('src');
								if (src) {
									obj.setAttribute('type', 'text/javascript');
									cmplz_run_script(src, 'statistics', 'src');
									obj.parentNode.removeChild(obj);
								}
							});
						}
					});
					document.addEventListener("cmplz_run_after_all_scripts", cmplz_burst_fire_domContentLoadedEvent);

					function cmplz_burst_fire_domContentLoadedEvent() {
						let event = new CustomEvent('burst_fire_hit');
						document.dispatchEvent(event);
					}
							});
		
		
