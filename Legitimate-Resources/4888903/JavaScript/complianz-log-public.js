(function( $ ) {
    'use strict';

    $(document).on('click', '.cc-btn.cc-save, .cmplz-accept, .cmplz-deny, .cc-btn.cc-accept-all, .cmplz-save-preferences, .cmplz-close', function () {
        console.log($(this).attr('class'));
        $.ajax({
            url: ajax_object.url,
            data: {
                action: 'complianz_log',
                nonce: ajax_object.nonce,
                attribute: $(this).attr('class')
            },
            type: 'GET'
        });
    });

})( jQuery );
