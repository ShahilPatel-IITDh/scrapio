jQuery(document).ready(function() {
    jQuery("#ajax_events").on("click", "a.upcomingEvents", function(event) {
		jQuery('body').find('.listing-cont').html('<div id="loading-image" style="display: block;float: left;margin: 0px 400px;"><img src="" alt="Loading..." /></div>');
       var dateEvent = jQuery(this).attr('id');
		var termEvent = jQuery(this).attr('rel');
        //jQuery('.listing-cont').fadeOut('slow');
        jQuery.ajax({
            type: 'POST',
            url: urlajax.ajaxurl,
            data: {
                action: 'imic_event_grid',
                date: dateEvent,
				term: termEvent,
            },
            success: function(data) {
                jQuery('.listing-cont').fadeIn('slow');
                jQuery('#ajax_events').html('');
                jQuery('#ajax_events').append(data);
            },
            error: function(errorThrown) {
            }
        });
    });
 });