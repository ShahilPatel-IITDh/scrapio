/**
 * @var object stm_gdpr_vars
 */
jQuery(document).ready(function ($) {

    $('#stm_gdpr_popup_accept').bind('click', acceptAction);
    
    function acceptAction(e) {
        e.preventDefault();
        jQuery.post(stm_gdpr_vars.AjaxUrl, {"action": "stm_gdpr_cookie_accept"});
        jQuery('#stm_gdpr_popup-main').fadeOut();
    }

    $('#stm-gpdr-form').on('submit', function(event) {
        event.preventDefault();
                    
        var	data = {
                'action': 'stm_gpdr_data_request',
                'stm_gpdr_data_type' : $( 'input[name=stm_gpdr_data_type]:checked', '#stm-gpdr-form').val(),
                'stm_gpdr_data_email': $( '#stm_gpdr_data_email' ).val(),
            };

        $( '.stm-gdpr-errors' ).remove();
        $( '.stm-gdpr-success' ).remove();

        $.ajax({
            url: stm_gdpr_vars.AjaxUrl,
            type: 'post',
            data: data,
            success: function( response ) {
                if ( 'success' !== response.data ) {
                    $('#stm-gpdr-form').append( '<div class="stm-gdpr-errors" style="display:none;">' + stm_gdpr_vars.error_prefix + '<br />' + response.data + '</div>' );
                    $('.stm-gdpr-errors').slideDown();
                } else {
                    $('#stm-gpdr-form').append( '<div class="stm-gdpr-success" style="display:none;">' + stm_gdpr_vars.success + '</div>' );
                    $('.stm-gdpr-success').slideDown();
                }
            }
        });
    });

});