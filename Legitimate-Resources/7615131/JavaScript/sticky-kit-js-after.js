
		jQuery(function( $ ) {
			jQuery("#page_content_wrapper .sidebar_wrapper").stick_in_parent({ offset_top: 100, recalc_every: 1 });
			
			if(jQuery(window).width() < 768 || is_touch_device())
			{
				jQuery("#page_content_wrapper .sidebar_wrapper").trigger("sticky_kit:detach");
			}
		});
		
