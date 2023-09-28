

			jQuery(document).ready(function() {
                let event = new Event('oxygenVSBInitToggleJs');
                document.dispatchEvent(event);
			});

            document.addEventListener("oxygenVSBInitToggleJs",function(){
                oxygenVSBInitToggleState();
            },false);

			oxygenVSBInitToggleState = function() {

				jQuery('.oxy-toggle').each(function() {
				
					var initial_state = jQuery(this).attr('data-oxy-toggle-initial-state'),
					   toggle_target = jQuery(this).attr('data-oxy-toggle-target'),
                       active_class = jQuery(this).attr('data-oxy-toggle-active-class');
				
					if (initial_state == 'closed') {
						if (!toggle_target) {
							jQuery(this).next().hide();
						} else {
							jQuery(toggle_target).hide();
						}
						jQuery(this).children('.oxy-expand-collapse-icon').addClass('oxy-eci-collapsed');
                        jQuery(this).removeClass(active_class)
					}
                    else {
                        jQuery(this).addClass(active_class)
                    }
				});
			}

            jQuery("body").on('click', '.oxy-toggle', function() {

                var toggle_target  = jQuery(this).attr('data-oxy-toggle-target'),
                    active_class   = jQuery(this).attr('data-oxy-toggle-active-class');

                jQuery(this).toggleClass(active_class)
                jQuery(this).children('.oxy-expand-collapse-icon').toggleClass('oxy-eci-collapsed');

                if (!toggle_target) {
                    jQuery(this).next().toggle();
                } else {
                    jQuery(toggle_target).toggle();
                }

                // force 3rd party plugins to rerender things inside the toggle
                jQuery(window).trigger('resize');
            });
		