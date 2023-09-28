jQuery(document).ready(function($) {

    /**
     * Expanded mode, special JS for animating the progress bar
     * @param  {[type]} $ [description]
     * @return {[type]}   [description]
     */

    if( $('.learndash-wrapper').hasClass('lds-template-expanded') ) {

        $('.ld-status-icon.ld-status-in-progress').each(function() {
            $(this).parents('.ld-lesson-item').addClass('learndash-in-progress');
        });

    }

    $('.wpProQuiz_incorrect').each(function(e) {
        $(this).parent().addClass('ldvc-strip-response');
    });

    if( typeof ldvc != "undefined" ) {

        if( typeof ldvc.template != "undefined" && !$('.learndash-wrapper').hasClass( 'lds-template-' + ldvc.template ) ) {

            $('.learndash-wrapper').each(function(e) {

                if( !$(this).find('#ld-profile').length ) {
                    $(this).addClass( 'lds-template-' + ldvc.template );
                }

            });

        }

    }

});
