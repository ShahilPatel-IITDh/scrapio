
		
			document.addEventListener("cmplz_enable_category", function(consentData) {
				var category = consentData.detail.category;
				var services = consentData.detail.services;
				var blockedContentContainers = [];
				let selectorVideo = '.cmplz-elementor-widget-video-playlist[data-category="'+category+'"],.elementor-widget-video[data-category="'+category+'"]';
				let selectorGeneric = '[data-cmplz-elementor-href][data-category="'+category+'"]';
				for (var skey in services) {
					if (services.hasOwnProperty(skey)) {
						let service = skey;
						selectorVideo +=',.cmplz-elementor-widget-video-playlist[data-service="'+service+'"],.elementor-widget-video[data-service="'+service+'"]';
						selectorGeneric +=',[data-cmplz-elementor-href][data-service="'+service+'"]';
					}
				}
				document.querySelectorAll(selectorVideo).forEach(obj => {
					let elementService = obj.getAttribute('data-service');
					if ( cmplz_is_service_denied(elementService) ) {
						return;
					}
					if (obj.classList.contains('cmplz-elementor-activated')) return;
					obj.classList.add('cmplz-elementor-activated');

					if ( obj.hasAttribute('data-cmplz_elementor_widget_type') ){
						let attr = obj.getAttribute('data-cmplz_elementor_widget_type');
						obj.classList.removeAttribute('data-cmplz_elementor_widget_type');
						obj.classList.setAttribute('data-widget_type', attr);
					}
					if (obj.classList.contains('cmplz-elementor-widget-video-playlist')) {
						obj.classList.remove('cmplz-elementor-widget-video-playlist');
						obj.classList.add('elementor-widget-video-playlist');
					}
					obj.setAttribute('data-settings', obj.getAttribute('data-cmplz-elementor-settings'));
					blockedContentContainers.push(obj);
				});

				document.querySelectorAll(selectorGeneric).forEach(obj => {
					let elementService = obj.getAttribute('data-service');
					if ( cmplz_is_service_denied(elementService) ) {
						return;
					}
					if (obj.classList.contains('cmplz-elementor-activated')) return;

					if (obj.classList.contains('cmplz-fb-video')) {
						obj.classList.remove('cmplz-fb-video');
						obj.classList.add('fb-video');
					}

					obj.classList.add('cmplz-elementor-activated');
					obj.setAttribute('data-href', obj.getAttribute('data-cmplz-elementor-href'));
					blockedContentContainers.push(obj.closest('.elementor-widget'));
				});

				/**
				 * Trigger the widgets in Elementor
				 */
				for (var key in blockedContentContainers) {
					if (blockedContentContainers.hasOwnProperty(key) && blockedContentContainers[key] !== undefined) {
						let blockedContentContainer = blockedContentContainers[key];
						if (elementorFrontend.elementsHandler) {
							elementorFrontend.elementsHandler.runReadyTrigger(blockedContentContainer)
						}
						var cssIndex = blockedContentContainer.getAttribute('data-placeholder_class_index');
						blockedContentContainer.classList.remove('cmplz-blocked-content-container');
						blockedContentContainer.classList.remove('cmplz-placeholder-' + cssIndex);
					}
				}

			});
		
		
