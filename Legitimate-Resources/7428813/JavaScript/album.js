'use strict';

(function ($) {
    $(window).on('load', function () {
        $.ajax({
            url: stm_ajaxurl,
            dataType: 'json',
            context: this,
            data: {
                'action': 'pearl_load_splash_album',
                'security': pearl_load_splash_album
            },
            complete: function complete(data) {
                var dt = data.responseJSON;
                $('.stm-footer').after(dt);
                setTimeout(function () {
                    $('.stm_album__popup').addClass('active');
                }, 300);
            }
        });
    });
})(jQuery);